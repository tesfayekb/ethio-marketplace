#!/usr/bin/env node
/**
 * Marketplace weight guard.
 *
 * The marketplace path (/ -> AppShell -> feed) is the page every visitor on an
 * expensive mobile connection loads first. Charting, mapping and 3D libraries
 * belong to admin and detail surfaces that are built later and code-split; if
 * one ever reaches the marketplace module graph, this fails the run.
 *
 * Cheap by design: a BFS over static local imports from the entry files. It
 * does not resolve dynamic import() — deliberately, since a dynamic import is
 * the very code-splitting we want to permit.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRIES = ["src/routes/index.tsx", "src/components/app-shell.tsx"];
const FORBIDDEN = ["recharts", "mapbox-gl", "react-map-gl", "leaflet", "react-leaflet", "three", "d3"];
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

function resolveLocal(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = resolve("src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;

  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && !candidate.endsWith("/")) return candidate;
  }
  return null;
}

const seen = new Set();
const queue = ENTRIES.map((entry) => resolve(entry));
const violations = [];

while (queue.length > 0) {
  const file = queue.pop();
  if (seen.has(file) || !existsSync(file)) continue;
  seen.add(file);

  const source = readFileSync(file, "utf8");
  const specs = [...source.matchAll(/^\s*import\s[^;]*?from\s+["']([^"']+)["']/gm)].map((m) => m[1]);

  for (const spec of specs) {
    const bare = spec.split("/")[0].startsWith("@")
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0];
    if (FORBIDDEN.includes(bare) || FORBIDDEN.includes(spec)) {
      violations.push(`${file.replace(`${process.cwd()}/`, "")} imports ${spec}`);
    }
    const local = resolveLocal(spec, file);
    if (local) queue.push(local);
  }
}

console.log("================================================================");
console.log(" ENFORCING: marketplace weight guard — heavy deps FAIL the run");
console.log("================================================================");
console.log(`modules walked: ${seen.size}`);
console.log(`findings: ${violations.length}`);

if (violations.length > 0) {
  for (const violation of violations) console.error(`  ${violation}`);
  process.exit(1);
}
