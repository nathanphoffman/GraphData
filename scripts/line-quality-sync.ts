// Line counts (tokei) and quality score (codequality) per project.
// Run: node scripts/line-quality-sync.ts [--json] [--lang] [--no-score] [--write-db]   (node 24+ runs .ts directly; `bun` also works)
// --write-db saves each project's lines and quality into the local Project Priority ranking (then run `just sync-prod`)
//
// Count = every line (code + comments + blanks), in programming/markup languages.
// - tokei already skips anything in .gitignore (node_modules, target, dist, .venv ...)
// - data/config/docs languages are dropped (JSON, YAML, TOML, Markdown, ...) so lock files
//   and datasets don't inflate a project
// - per-project excludes below remove generated or copied code that git doesn't ignore

import { execFile, execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
import { fileURLToPath } from "node:url";

// projects live two levels up from this script (the Code folder)
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(dirname(SCRIPT_DIR));
// the checker lives in ROOT/CodeQuality no matter which folder this script is copied into
const CHECKER_DIR = join(ROOT, "CodeQuality");
const PYTHON = join(CHECKER_DIR, ".venv", "bin", "python");

type Project = { name: string; folder: string; exclude?: string[] };

const PROJECTS: Project[] = [
  { name: "Deor Lang", folder: "DeorLang", exclude: ["setup/out.rs"] },
  { name: "Code Quality Script", folder: "CodeQuality" },
  { name: "GraphData", folder: "GraphData" },
  { name: "Food Comparison", folder: "FoodComparisonMicroServices" },
  { name: "3d Space Game (Descent)", folder: "3dSpaceGameWT/3dSpaceGame" },
  { name: "Deor Pico", folder: "DeorPico" },
  { name: "DeorPi", folder: "DeorPi" },
  { name: "Weather", folder: "WeatherSite" },
  { name: "Fairy Tale: An Adventure", folder: "FairyTaleAnAdventure" },
  { name: "Tzaar Net (AI)", folder: "TzaarNet" },
  { name: "Space Game (Ogame)", folder: "SpaceGame" },
  { name: "Tiny Mighty", folder: "TinyMightyRPG" },
  {
    name: "New Web",
    folder: "NewWeb",
    // synced copies of engine/ plus the vendored TinyGo runtime
    exclude: ["setup/engine", "site/engine", "site/engine.js", "wasm_exec_tiny.js"],
  },
  { name: "Coding Astronomer", folder: "CodingAstronomer" },
  { name: "BGG Scraper", folder: "BGGScraper" },
  { name: "Proton Drive Sync", folder: "ProtonDriveSync" },
  { name: "ValOutcast", folder: "ValOutcast" },
];

const GLOBAL_EXCLUDE = ["vendor", "third_party", "*.min.js", "*.min.css", "*-lock.json", "*.lock"];

// tokei languages that are data/config/docs, not code someone wrote
const NOT_CODE = new Set([
  "JSON", "YAML", "TOML", "XML", "Markdown", "Plain Text", "SVG", "CSV", "INI",
  "Dockerfile", "Ignore", "Autoconf", "Just", "Makefile", "MSBuild", "Org", "ReStructuredText",
]);

type TokeiReport = { stats: { code: number } };
type TokeiLang = { code: number; comments: number; blanks: number; reports: TokeiReport[] };

type Quality = { score: number; grade: string } | null;

// Runs this repo's own checker (python -m codequality) on a project and reads its JSON result
async function qualityOf(dir: string): Promise<Quality> {
  try {
    const { stdout } = await execFileAsync(PYTHON, ["-m", "codequality", dir, "--json"], {
      cwd: CHECKER_DIR,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
    const { score, grade } = JSON.parse(stdout) as { score: number; grade: string };
    return { score, grade };
  } catch {
    return null;
  }
}

// Runs fn over items with at most `limit` running at once, keeping the input order
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function repoOf(dir: string): string {
  try {
    return execFileSync("git", ["-C", dir, "remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .replace(/\.git$/, "");
  } catch {
    return "(no remote)";
  }
}

function count(p: Project): { total: number; langs: Record<string, number> } {
  const dir = join(ROOT, p.folder);
  const args = [dir, "-o", "json"];
  for (const e of [...GLOBAL_EXCLUDE, ...(p.exclude ?? [])]) args.push("-e", e);

  const out = execFileSync("tokei", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  const json = JSON.parse(out) as Record<string, TokeiLang>;

  const langs: Record<string, number> = {};
  let total = 0;
  for (const [lang, data] of Object.entries(json)) {
    const lines = data.code + data.comments + data.blanks;
    if (lang === "Total" || NOT_CODE.has(lang) || lines === 0) continue;
    langs[lang] = lines;
    total += lines;
  }
  return { total, langs };
}

// Saves lines and quality into the local Project Priority ranking, marking the items changed now so the next sync pushes them
async function writeToDb(rows: { name: string; lines: number; quality: Quality }[]) {
  const { db } = await import("../server/db.js");
  await import("../server/rankings.js"); // creates the tables and applies any column changes

  const RANKING = "project-priority";
  const labels = db.prepare("SELECT label FROM ranking_columns WHERE ranking_id = ? ORDER BY position").all(RANKING) as { label: string }[];
  const linesAt = labels.findIndex((c) => c.label === "Completed Lines");
  const qualityAt = labels.findIndex((c) => c.label === "Computed Quality");
  const familiarityAt = labels.findIndex((c) => c.label === "Familiarity");
  const finalAt = labels.findIndex((c) => c.label === "Quality"); // the average of familiarity and computed quality
  if (linesAt < 0 || qualityAt < 0) throw new Error("project-priority is missing its Completed Lines or Computed Quality column");

  const find = db.prepare("SELECT values_json FROM ranking_items WHERE ranking_id = ? AND name = ?");
  const save = db.prepare("UPDATE ranking_items SET values_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?");
  for (const r of rows) {
    const item = find.get(RANKING, r.name) as { values_json: string } | undefined;
    if (!item) {
      console.warn(`Not in the ranking, skipped: ${r.name}`);
      continue;
    }
    const values = JSON.parse(item.values_json) as (string | number | null)[];
    values[linesAt] = r.lines;
    // keep the old quality when the checker failed
    if (r.quality) values[qualityAt] = Math.round(r.quality.score * 10) / 10;
    // the page works this out itself; storing it keeps the saved copy from going stale
    const [fam, computed] = [values[familiarityAt], values[qualityAt]].filter((v) => typeof v === "number");
    if (finalAt >= 0 && fam !== undefined) values[finalAt] = Math.round(((fam + (computed ?? fam)) / 2) * 10) / 10;
    save.run(JSON.stringify(values), Date.now(), RANKING, r.name);
  }
  console.log(`Saved lines and quality for ${rows.length} projects to the local database`);
}

const asJson = process.argv.includes("--json");
const showLangs = process.argv.includes("--lang");
const toDb = process.argv.includes("--write-db");
const withScore = !process.argv.includes("--no-score");

const unsorted = await mapLimit(PROJECTS, availableParallelism(), async (p) => {
  if (!existsSync(join(ROOT, p.folder))) throw new Error(`Missing folder: ${p.folder}`);
  const dir = join(ROOT, p.folder);
  const { total, langs } = count(p);
  const quality = withScore ? await qualityOf(dir) : null;
  return { name: p.name, folder: p.folder, repo: repoOf(dir), lines: total, quality, langs };
});
const rows = unsorted.sort((a, b) => b.lines - a.lines);

if (toDb) {
  await writeToDb(rows);
  process.exit(0);
}

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  const w = (k: "name" | "folder") => Math.max(...rows.map((r) => r[k].length), k.length);
  const nw = w("name");
  const fw = w("folder");
  const fmt = (n: number) => n.toLocaleString("en-US");
  const lw = Math.max(...rows.map((r) => fmt(r.lines).length), 5);
  const qual = (r: (typeof rows)[number]) =>
    (r.quality ? `${r.quality.score.toFixed(1)} ${r.quality.grade}` : "n/a").padEnd(8);

  console.log(`${"Project".padEnd(nw)}  ${"Lines".padStart(lw)}  ${"Quality".padEnd(8)}  ${"Folder".padEnd(fw)}  Repo`);
  for (const r of rows) {
    console.log(`${r.name.padEnd(nw)}  ${fmt(r.lines).padStart(lw)}  ${qual(r)}  ${r.folder.padEnd(fw)}  ${r.repo}`);
    if (showLangs) {
      const top = Object.entries(r.langs).sort((a, b) => b[1] - a[1]).map(([l, n]) => `${l} ${fmt(n)}`);
      console.log(`${" ".repeat(nw + 2)}${top.join(", ")}`);
    }
  }
  // average score weighted by line count, so a project with 2x the lines counts 2x as much
  const scored = rows.filter((r) => r.quality);
  const scoredLines = scored.reduce((sum, r) => sum + r.lines, 0);
  const weighted = scored.reduce((sum, r) => sum + r.quality!.score * r.lines, 0) / scoredLines;
  const totalQual = (scored.length ? weighted.toFixed(1) : "n/a").padEnd(8);
  const totalLines = fmt(rows.reduce((sum, r) => sum + r.lines, 0)).padStart(lw);
  console.log(`${"TOTAL".padEnd(nw)}  ${totalLines}  ${totalQual}`);
}
