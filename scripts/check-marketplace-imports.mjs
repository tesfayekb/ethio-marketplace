#!/usr/bin/env node
/**
 * Marketplace weight guard.
 *
 * The marketplace path (/ -> AppShell -> feed) is the page every visitor on an
 * expensive mobile connection loads first. Charting, mapping and 3D libraries
 * belong to admin and detail surfaces that are built later and code-split; if
 * one ever reaches the marketplace module graph, this fails the run.
 *
 * DEC-231 (bundle 22 turn 22): the walk also starts at the root route and
 * follows `export … from "…"` lines (type-only statements are skipped — types
 * are erased from the build). The full string catalogues and the admin-string
 * files (FORBIDDEN_FILES below) never ride in a visitor's first paint: a walk
 * that reaches one of them is a finding naming the file that imports it.
 *
 * Cheap by design: a BFS over static local imports from the entry files. It
 * does not resolve dynamic import() — deliberately, since a dynamic import is
 * the very code-splitting we want to permit.
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRIES = ["src/routes/index.tsx", "src/components/app-shell.tsx", "src/routes/__root.tsx"];
const FORBIDDEN_FILES = [
  "src/i18n/locales/en.ts",
  "src/i18n/locales/am.ts",
  "src/i18n/locales/en-admin.ts",
  "src/i18n/locales/am-admin.ts",
  "src/i18n/locales/am-base.ts",
];
const FORBIDDEN = [
  "recharts",
  "mapbox-gl",
  "react-map-gl",
  "leaflet",
  "react-leaflet",
  "three",
  "d3",
  // Bundle 3 step 11 — the phone reader loads by dynamic import on the contact step only.
  "libphonenumber-js",
  // Bundle 19 turn 1 (DEC-187) — the QR encoder is server-only; it never enters the first-paint path.
  "qrcode-generator",
];
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];

function resolveLocal(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = resolve("src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;

  for (const ext of EXTENSIONS) {
    const candidate = `${base}${ext}`;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const seen = new Set();
const queue = ENTRIES.map((entry) => [resolve(entry), null]);
const violations = [];

const IMPORT_FROM = /^\s*import\s(?!type\b)[^;]*?from\s+["']([^"']+)["']/gm;
const EXPORT_FROM = /^\s*export\s(?!type\b)[^;]*?from\s+["']([^"']+)["']/gm;

while (queue.length > 0) {
  const [file, importer] = queue.pop();
  if (seen.has(file) || !existsSync(file)) continue;
  seen.add(file);

  const relative = file.replace(`${process.cwd()}/`, "");
  if (FORBIDDEN_FILES.includes(relative)) {
    violations.push(
      `${importer ? importer.replace(`${process.cwd()}/`, "") : relative} reaches ${relative} (DEC-231: the full catalogues and the admin strings stay off the first paint)`,
    );
    continue;
  }

  const source = readFileSync(file, "utf8");
  const specs = [...source.matchAll(IMPORT_FROM), ...source.matchAll(EXPORT_FROM)].map((m) => m[1]);

  for (const spec of specs) {
    const bare = spec.split("/")[0].startsWith("@")
      ? spec.split("/").slice(0, 2).join("/")
      : spec.split("/")[0];
    if (FORBIDDEN.includes(bare) || FORBIDDEN.includes(spec)) {
      violations.push(`${relative} imports ${spec}`);
    }
    const local = resolveLocal(spec, file);
    if (local) queue.push([local, file]);
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
