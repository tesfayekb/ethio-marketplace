import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { codeOf, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-I18N-OVERLAY (INC-1023, turn D2) — the database bundle reaches the catalog only
 * through overlayBundle (src/i18n/bundle.ts): a written row wins; a copied row yields to
 * the build's own text. A reader of the UI bundle that spreads it (`...bundle`, or a
 * part's `...x.written` / `...x.copied`) instead is refused. No allowlist: the one merge
 * has no exception. Proven on a planted spread.
 */

const HOME = "src/i18n/bundle.ts";
const READS = /\bfetchUiBundle\b/;
const PART_SPREAD = /\.\.\.\s*[\w$.?]*\.(?:written|copied)\b/;
const BUNDLE_SPREAD = /\.\.\.\s*\(?\s*bundle\b/;

export function overlayFindings(file: string, text: string): string[] {
  if (file === HOME) return [];
  const code = codeOf(text);
  const out: string[] = [];
  code.split("\n").forEach((line, index) => {
    if (PART_SPREAD.test(line)) out.push(`${file}:${index + 1} spreads a bundle part`);
  });
  if (READS.test(code) && !/from\s+["']@\/lib\/route-client["']/.test(code)) {
    code.split("\n").forEach((line, index) => {
      if (BUNDLE_SPREAD.test(line)) out.push(`${file}:${index + 1} spreads the bundle`);
    });
    if (file.startsWith("src/i18n/") && !/\boverlayBundle\(/.test(code))
      out.push(`${file} reads the UI bundle without overlayBundle`);
  }
  return out;
}

describe("CF-I18N-OVERLAY — the bundle reaches the catalog only through overlayBundle", () => {
  it(
    "no source file spreads the bundle",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true });
      const findings = files.flatMap((file) => overlayFindings(file, readFileSync(file, "utf8")));
      console.log(`[cf-i18n-overlay] ${files.length} files, ${findings.length} findings`);
      expect(findings).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("the provider reads the bundle through overlayBundle", () => {
    const text = codeOf(readFileSync("src/i18n/provider.tsx", "utf8"));
    expect(text).toMatch(/overlayBundle\(base, bundle, shipped\)/);
  });

  it("refuses a planted spread", () => {
    const planted =
      'import { fetchUiBundle } from "./bundle";\n' +
      "void fetchUiBundle(l).then(({ bundle }) => setMessages({ ...base, ...bundle }));\n";
    expect(overlayFindings("src/i18n/provider.tsx", planted)).toEqual([
      "src/i18n/provider.tsx:2 spreads the bundle",
      "src/i18n/provider.tsx reads the UI bundle without overlayBundle",
    ]);
    expect(overlayFindings("src/x.ts", "const m = { ...a, ...parts.written };\n")).toEqual([
      "src/x.ts:1 spreads a bundle part",
    ]);
  });
});
