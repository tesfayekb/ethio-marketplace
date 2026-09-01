#!/usr/bin/env bun
/**
 * U4i ② — BUILD-TIME "USED ON" MAP.
 *
 * Scans `src/` for literal `t("key")` call sites and records WHERE each key is
 * rendered, so a translator can see the surface a string lands on before
 * choosing a wording.
 *
 * OUTPUTS (both tracked, both machine-generated → prettier-ignored, Knowledge E5):
 *   * docs/generated/i18n-usage.json — the reviewable artifact.
 *   * public/i18n-usage.json         — the byte-identical copy the console
 *     fetches. RULING (law A3, stated up front): the spec asked for "a small
 *     gated RPC-free route/asset". `docs/` is outside every serving root and a
 *     server route cannot read the repo from the Worker bundle, so the SERVED
 *     copy is a static asset under `public/`. One generator writes both in one
 *     pass, so the CI freshness check (`git diff --exit-code`) covers both and
 *     they can never drift.
 *
 * HONESTY (law F4): only LITERAL keys can be attributed. A `t(someVariable)`
 * call is counted into `dynamicCallSites` and the console renders "dynamic"
 * rather than pretending the key is unused.
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const OUTPUTS = [
  join(ROOT, "docs", "generated", "i18n-usage.json"),
  join(ROOT, "public", "i18n-usage.json"),
];

const LITERAL_T = /\bt\(\s*"([^"\\]+)"/g;
const DYNAMIC_T = /\bt\(\s*[^"')\s]/g;
const SKIP_DIRS = new Set(["node_modules", "generated"]);
const EXTENSIONS = [".ts", ".tsx"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
      continue;
    }
    if (!EXTENSIONS.some((ext) => entry.endsWith(ext))) continue;
    if (entry.endsWith(".test.ts") || entry.endsWith(".test.tsx")) continue;
    out.push(full);
  }
  return out;
}

/**
 * A surface is the URL a route file serves, or the feature/component module a
 * shared piece lives in. TanStack's flat routing maps dots to slashes, `_`
 * layout segments vanish from the URL, and `index` is the leaf.
 */
function surfaceFor(file: string): string {
  const rel = relative(SRC, file).split(sep).join("/");
  if (rel === "routes/__root.tsx") return "(every page)";
  if (rel.startsWith("routes/api/")) return `/${rel.slice("routes/".length).replace(/\.tsx?$/, "")}`;
  if (rel.startsWith("routes/")) {
    const name = rel.slice("routes/".length).replace(/\.tsx?$/, "");
    const path = name
      .split(".")
      .filter((segment) => segment !== "index")
      .map((segment) => segment.replace(/_$/, ""))
      .filter((segment) => segment !== "" && !segment.startsWith("_"))
      .join("/");
    return `/${path}`;
  }
  const parts = rel.split("/");
  if (parts[0] === "features") return `features/${parts[1] ?? ""}`;
  if (parts[0] === "components") return `components/${(parts[1] ?? "").replace(/\.tsx?$/, "")}`;
  return parts.slice(0, -1).join("/") || rel;
}

function main(): void {
  const files = walk(SRC);
  const byKey = new Map<string, Set<string>>();
  let dynamicCallSites = 0;

  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const surface = surfaceFor(file);
    for (const match of text.matchAll(LITERAL_T)) {
      const key = match[1];
      if (key === undefined || !key.includes(".")) continue;
      const set = byKey.get(key) ?? new Set<string>();
      set.add(surface);
      byKey.set(key, set);
    }
    dynamicCallSites += [...text.matchAll(DYNAMIC_T)].length;
  }

  const keys: Record<string, string[]> = {};
  for (const key of [...byKey.keys()].sort()) {
    keys[key] = [...(byKey.get(key) ?? [])].sort();
  }

  const payload = {
    // No timestamp: a generated artifact must be a pure function of the source,
    // or the freshness check would fail on every run.
    generator: "scripts/i18n-usage-map.ts",
    scanned: files.length,
    dynamicCallSites,
    keys,
  };
  const json = `${JSON.stringify(payload, null, 2)}\n`;

  for (const output of OUTPUTS) {
    mkdirSync(join(output, ".."), { recursive: true });
    writeFileSync(output, json, "utf8");
  }

  console.log(
    `i18n usage map: ${Object.keys(keys).length} keys across ${files.length} files ` +
      `(${dynamicCallSites} dynamic call sites)`,
  );
}

main();
