// Counts the source lines behind each page (its component plus everything it imports from src/) and saves them to src/charts/pageSizes.json.
// The front page sorts by this. Run: node scripts/page-sizes.mjs   (the build runs it too)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src");
const REGISTRY = join(SRC, "charts", "registry.ts");
const OUTPUT = join(SRC, "charts", "pageSizes.json");
const EXTENSIONS = ["", ".ts", ".tsx", ".css", "/index.ts", "/index.tsx"];

const IMPORT = /(?:from|import)\s+["'](\.[^"']*)["']/g;

/** The file a relative import points at, or undefined when it is not one of ours (for example a data file). */
function resolveImport(from, specifier) {
  const base = resolve(dirname(from), specifier);
  return EXTENSIONS.map((extension) => base + extension).find((path) => existsSync(path) && /\.(tsx?|css)$/.test(path));
}

/** Every file the entry file pulls in, itself included. */
function reachable(entry) {
  const seen = new Set();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    const text = readFileSync(file, "utf8");
    for (const [, specifier] of text.matchAll(IMPORT)) {
      const next = resolveImport(file, specifier);
      if (next) queue.push(next);
    }
  }
  return seen;
}

const lineCount = (file) => readFileSync(file, "utf8").split("\n").length;

const registry = readFileSync(REGISTRY, "utf8");
const componentFiles = new Map([...registry.matchAll(/import (\w+) from "(\.[^"]+)"/g)].map(([, name, path]) => [name, resolveImport(REGISTRY, path)]));

const sizes = {};
for (const [, id, component] of registry.matchAll(/id: "([^"]+)"[\s\S]*?component: (\w+)/g)) {
  const entry = componentFiles.get(component);
  if (entry) sizes[id] = [...reachable(entry)].reduce((total, file) => total + lineCount(file), 0);
}

writeFileSync(OUTPUT, `${JSON.stringify(sizes, null, 2)}\n`);
console.log(sizes);
