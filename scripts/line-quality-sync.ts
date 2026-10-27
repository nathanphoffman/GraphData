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

// text encoding for everything the child processes print
const ENCODING = "utf8";

// every child process may print this much before node gives up on it
const MAX_BUFFER_BYTES = 256 * 1024 * 1024;

// one decimal place: multiply by this, round, divide by it
const TENTH = 10;

// column widths in the table: the quality column, and the least the lines column is wide
const QUALITY_WIDTH = 8;
const MIN_LINES_WIDTH = 5;

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
  { name: "Contact App", folder: "ContactApp" },
  { name: "Survive Game", folder: "SurviveGame" },
  { name: "Solar Bit Infrastructure", folder: "SolarBitInfrastructure" },
  { name: "Tiny Mighty", folder: "TinyMightyRPG" },
  {
    name: "New Web",
    folder: "NewWeb",
    // synced copies of engine/ plus the vendored TinyGo runtime
    exclude: ["setup/engine", "site/engine", "site/engine.js", "wasm_exec_tiny.js"],
  },
  {
    name: "NH Blog",
    folder: "NHBlog",
    // static/ is the generated site and engine/ is a copy of the NewWeb engine
    exclude: ["static", "engine"],
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
async function qualityOf(projectDir: string): Promise<Quality> {
  try {
    const { stdout } = await execFileAsync(PYTHON, ["-m", "codequality", projectDir, "--json"], {
      cwd: CHECKER_DIR,
      encoding: ENCODING,
      maxBuffer: MAX_BUFFER_BYTES,
    });

    const { score, grade } = JSON.parse(stdout) as { score: number; grade: string };

    return { score, grade };
  } catch (error) {
    // one broken project should not stop the table, but say which one failed
    console.warn(`Quality check failed for ${projectDir}: ${(error as Error).message}`);

    return null;
  }
}

// Runs fn over items with at most `limit` running at once, keeping the input order
async function mapLimit<T, R>(items: T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await work(items[index]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));

  return results;
}

function repoOf(projectDir: string): string {
  try {
    return execFileSync("git", ["-C", projectDir, "remote", "get-url", "origin"], {
      encoding: ENCODING,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      // Drop a trailing ".git" so the link opens the repo page.
      .replace(/\.git$/, "");
  } catch (error) {
    // git exits with an error when the folder has no origin remote, which is normal; a missing git is not
    if ((error as NodeJS.ErrnoException).code === "ENOENT") throw error;

    return "(no remote)";
  }
}

// Counts every line of the project's code, skipping data files and generated folders so lock files and datasets do not inflate it.
function count(project: Project): { total: number; langs: Record<string, number> } {
  const projectDir = join(ROOT, project.folder);
  const args = [projectDir, "-o", "json"];

  for (const excluded of [...GLOBAL_EXCLUDE, ...(project.exclude ?? [])]) args.push("-e", excluded);

  const tokeiOutput = execFileSync("tokei", args, { encoding: ENCODING, maxBuffer: MAX_BUFFER_BYTES });
  const json = JSON.parse(tokeiOutput) as Record<string, TokeiLang>;

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
  const linesAt = labels.findIndex((column) => column.label === "Completed Lines");
  const qualityAt = labels.findIndex((column) => column.label === "Computed Quality");
  const familiarityAt = labels.findIndex((column) => column.label === "Familiarity");
  const finalAt = labels.findIndex((column) => column.label === "Quality"); // the average of familiarity and computed quality

  if (linesAt < 0 || qualityAt < 0) throw new Error("project-priority is missing its Completed Lines or Computed Quality column");

  const find = db.prepare("SELECT values_json FROM ranking_items WHERE ranking_id = ? AND name = ?");
  const save = db.prepare("UPDATE ranking_items SET values_json = ?, updated_at = ? WHERE ranking_id = ? AND name = ?");

  for (const projectRow of rows) {
    const item = find.get(RANKING, projectRow.name) as { values_json: string } | undefined;

    if (!item) {
      console.warn(`Not in the ranking, skipped: ${projectRow.name}`);

      continue;
    }

    const values = JSON.parse(item.values_json) as (string | number | null)[];
    values[linesAt] = projectRow.lines;

    // keep the old quality when the checker failed
    if (projectRow.quality) values[qualityAt] = Math.round(projectRow.quality.score * TENTH) / TENTH;

    // the page works this out itself; storing it keeps the saved copy from going stale
    const [rating, computed] = [values[familiarityAt], values[qualityAt]];
    const fam = typeof rating === "number" ? ((rating - 1) / 4) * 100 : undefined; // familiarity is out of 5, 1 being 0% and 5 being 100%

    if (finalAt >= 0 && fam !== undefined) values[finalAt] = Math.round(((fam + (typeof computed === "number" ? computed : fam)) / 2) * TENTH) / TENTH;
    save.run(JSON.stringify(values), Date.now(), RANKING, projectRow.name);
  }

  console.log(`Saved lines and quality for ${rows.length} projects to the local database`);
}

const asJson = process.argv.includes("--json");
const showLangs = process.argv.includes("--lang");
const toDb = process.argv.includes("--write-db");
const withScore = !process.argv.includes("--no-score");

const unsorted = await mapLimit(PROJECTS, availableParallelism(), async (project) => {
  if (!existsSync(join(ROOT, project.folder))) throw new Error(`Missing folder: ${project.folder}`);
  const projectDir = join(ROOT, project.folder);
  const { total, langs } = count(project);
  const quality = withScore ? await qualityOf(projectDir) : null;

  return { name: project.name, folder: project.folder, repo: repoOf(projectDir), lines: total, quality, langs };
});

const rows = unsorted.sort((first, second) => second.lines - first.lines);

if (toDb) {
  await writeToDb(rows);
  process.exit(0);
}

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  // widthOf gives the longest value in one column, so the table can line up.
  const widthOf = (field: "name" | "folder") => Math.max(...rows.map((projectRow) => projectRow[field].length), field.length);
  const nameWidth = widthOf("name");
  const folderWidth = widthOf("folder");

  const formatNumber = (amount: number) => amount.toLocaleString("en-US");
  const linesWidth = Math.max(...rows.map((projectRow) => formatNumber(projectRow.lines).length), MIN_LINES_WIDTH);
  const qual = (projectRow: (typeof rows)[number]) =>
    (projectRow.quality ? `${projectRow.quality.score.toFixed(1)} ${projectRow.quality.grade}` : "n/a").padEnd(QUALITY_WIDTH);

  console.log(`${"Project".padEnd(nameWidth)}  ${"Lines".padStart(linesWidth)}  ${"Quality".padEnd(QUALITY_WIDTH)}  ${"Folder".padEnd(folderWidth)}  Repo`);

  for (const projectRow of rows) {
    console.log(`${projectRow.name.padEnd(nameWidth)}  ${formatNumber(projectRow.lines).padStart(linesWidth)}  ${qual(projectRow)}  ${projectRow.folder.padEnd(folderWidth)}  ${projectRow.repo}`);

    if (showLangs) {
      const topLanguages = Object.entries(projectRow.langs).sort((first, second) => second[1] - first[1]).map(([language, lineTotal]) => `${language} ${formatNumber(lineTotal)}`);
      console.log(`${" ".repeat(nameWidth + 2)}${topLanguages.join(", ")}`);
    }
  }

  // average score weighted by line count, so a project with 2x the lines counts 2x as much
  const scored = rows.filter((projectRow) => projectRow.quality);

  // Add up the lines of every project that has a score.
  const scoredLines = scored.reduce((runningTotal, projectRow) => runningTotal + projectRow.lines, 0);

  // Add up each score times its project's lines, then divide by the lines to weight it.
  const weighted = scored.reduce((runningTotal, projectRow) => runningTotal + projectRow.quality!.score * projectRow.lines, 0) / scoredLines;
  const totalQual = (scored.length ? weighted.toFixed(1) : "n/a").padEnd(QUALITY_WIDTH);

  // Add up the lines of every project for the TOTAL row.
  const totalLines = formatNumber(rows.reduce((runningTotal, projectRow) => runningTotal + projectRow.lines, 0)).padStart(linesWidth);
  console.log(`${"TOTAL".padEnd(nameWidth)}  ${totalLines}  ${totalQual}`);
}
