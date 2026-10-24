#!/usr/bin/env node
/**
 * First-paint BUNDLE BUDGET guard.
 *
 * The weight guard (check-marketplace-imports.mjs) answers "did a forbidden
 * library reach the first-paint graph?". It cannot answer "did the first-paint
 * graph quietly get twice as heavy?" — a hundred small additions cost the same
 * as one banned chart library to a user on expensive mobile data.
 *
 * So this measures the built client bundle and fails when the eagerly loaded
 * JS or CSS crosses a declared ceiling. The budget is a RATCHET: when a real
 * feature needs more room, the number is raised deliberately, in a commit that
 * says why — it never drifts silently.
 *
 * Measured GZIPPED, because that is what the phone actually downloads.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { basename, dirname, join, extname } from "node:path";
import { gzipSync } from "node:zlib";

import { entryChunks, mustStayLazyViolation, staticClosure } from "./bundle-closure.mjs";

/** Ceilings in KiB, gzipped, for everything the browser loads before paint. */
const BUDGET_KIB = {
  // DEC-231 (2026-10-21): the admin strings left the first paint (320.0 → 296.8 KiB in the supervisor's build of the split); the ceiling follows to 305.
  // 2026-10-24: the agreement sentences carry link tokens (D235) and the publishing page its sections; 305.x measured
  js: 306,
  css: 40,
};

const CANDIDATE_DIRS = [
  ".output/public/_build",
  "dist/client/_build",
  ".output/public",
  "dist/client",
];

function findBuildDir() {
  for (const dir of CANDIDATE_DIRS) {
    if (existsSync(dir) && statSync(dir).isDirectory()) return dir;
  }
  return null;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const buildDir = findBuildDir();
if (!buildDir) {
  console.error(
    "Bundle budget: no client build output found. Run the app build before this guard.",
  );
  process.exit(1);
}

const files = walk(buildDir);

/**
 * Eager = what the entry pulls in without a user interaction. Vite emits
 * lazily imported route/feature chunks as separate files that the entry only
 * fetches on demand, so the budget covers the ENTRY chunks: the assets the
 * generated HTML references directly.
 */
const html = files.filter((f) => extname(f) === ".html");
const referenced = new Set();
for (const file of html) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)) {
    referenced.add(match[1].split("/").pop());
  }
}
// No prerendered HTML (SSR-only output): fall back to the entry-named chunks.
const isEntry = (f) => {
  const base = f.split("/").pop();
  return referenced.size > 0
    ? referenced.has(base)
    : /^(client|entry|index|main|styles)[.-]/.test(base);
};

/**
 * INC-556 (DEC-176, bundle 11 turn C8) — JS is the entry chunk's STATIC IMPORT
 * CLOSURE (scripts/bundle-closure.mjs): every chunk the browser must fetch
 * before the entry runs, whatever its file name. The name rule above stays for
 * CSS only. With prerendered HTML, its script tags name the entries.
 */
const jsEntries = files.filter(
  (f) =>
    extname(f) === ".js" &&
    (referenced.size > 0 ? referenced.has(basename(f)) : entryChunks([basename(f)]).length === 1),
);
const eager = new Set();
for (const entry of jsEntries) {
  const closure = staticClosure(dirname(entry), [basename(entry)]);
  // INC-864: a must-stay-lazy chunk in the first-paint closure fails here,
  // with its name, whatever the total weight — the same exit path as the ceiling.
  const lazy = mustStayLazyViolation(closure);
  if (lazy) {
    console.error(
      `Bundle budget: ${lazy} must stay lazy (INC-864) but sits in the first-paint closure of ${basename(entry)}.`,
    );
    process.exit(1);
  }
  for (const name of closure) eager.add(join(dirname(entry), name));
}
for (const file of files) {
  if (extname(file) === ".css" && isEntry(file)) eager.add(file);
}

const totals = { js: 0, css: 0 };
const counted = [];
for (const file of eager) {
  const ext = extname(file).slice(1);
  const size = gzipSync(readFileSync(file)).length;
  totals[ext] += size;
  counted.push({ file, size });
}
if (jsEntries.length === 0) {
  console.error(
    "Bundle budget: found no entry chunk (index-, entry- or main-) — failing instead of passing vacuously.",
  );
  process.exit(1);
}

if (counted.length === 0) {
  console.error(
    "Bundle budget: matched no entry assets — the guard would pass vacuously. Failing instead.",
  );
  process.exit(1);
}

const kib = (bytes) => (bytes / 1024).toFixed(1);
console.log(`Bundle budget — the entry's static import closure under ${buildDir} (gzipped):`);
for (const { file, size } of counted.sort((a, b) => b.size - a.size)) {
  console.log(`  ${kib(size).padStart(8)} KiB  ${file}`);
}

let failed = false;
for (const kind of ["js", "css"]) {
  const used = totals[kind] / 1024;
  const budget = BUDGET_KIB[kind];
  const verdict = used > budget ? "OVER BUDGET" : "ok";
  console.log(`${kind.toUpperCase()}: ${used.toFixed(1)} KiB / ${budget} KiB — ${verdict}`);
  if (used > budget) failed = true;
}

if (failed) {
  console.error(
    "\nFirst-paint budget exceeded. Either code-split the addition behind a dynamic import,\n" +
      "or raise the ceiling in scripts/check-bundle-size.mjs in a commit that states why.",
  );
  process.exit(1);
}
console.log("Bundle budget OK.");
