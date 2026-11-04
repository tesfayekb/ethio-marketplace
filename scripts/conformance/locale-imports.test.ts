import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { localeImportFindings } from "./locale-imports";

/**
 * CF-LOC-1 (P-1c turn (d)) — no file outside src/i18n/ imports a locale module (see
 * locale-imports.ts). CFLI-1 reads the tree; CFLI-2 and CFLI-3 plant a static and a dynamic import
 * and watch each fail; CFLI-4 plants the forms the rule lets through — `en-base` by name, a
 * type-only import, a file inside src/i18n/, a relative path that lands elsewhere — and watches them
 * pass. Every plant lives under node_modules/.cache/ and is removed by its test (PPF-1).
 */
const ROOT = process.cwd();
const ALLOWLIST = "scripts/conformance/locale-imports-allowlist.txt";
const RULE =
  "(CF-LOC-1: a screen asks useI18n's has() or shippedCatalogues(), never a locale module)";
/** The locale modules a plant imports — the same names as the tree's, so paths resolve. */
const LOCALE_STUBS: Record<string, string> = {
  "src/i18n/locales/en.ts": "export const en = {};\n",
  "src/i18n/locales/en-base.ts": "export const enBase = {};\n",
  "src/i18n/locales/am-admin.ts": "export const amAdmin = {};\n",
};

function censusOf(dir: string): string {
  const files = walkFiles([join(dir, "src")], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
    relative(dir, file),
  );
  return report(localeImportFindings(files, dir));
}

describe("CF-LOC-1 — a screen never imports a locale module (P-1c turn (d))", () => {
  it(
    "CFLI-1 the tree: no file under src/ outside src/i18n/ (tests excepted) imports src/i18n/locales/*",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).map((file) =>
        relative(ROOT, join(ROOT, file)),
      );
      expect(files.length).toBeGreaterThanOrEqual(500);
      const findings = localeImportFindings(files, ROOT);
      const allowed = readAllowlist(
        ALLOWLIST,
        findings.map((hit) => `${hit.file}:${hit.line}`),
      );
      console.log(
        `[CF-LOC-1] files read: ${files.length}; findings: ${findings.length}; allowlist: ${allowed.size}`,
      );
      expect(allowed.size).toBe(0);
      expect(report(findings.filter((hit) => !allowed.has(`${hit.file}:${hit.line}`)))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFLI-2 planted: a static import and a re-export of a locale module, by alias and by relative path, each fail", () => {
    const dir = join(ROOT, "node_modules/.cache/locale-imports-static");
    mkdirSync(join(dir, "src/features/x"), { recursive: true });
    mkdirSync(join(dir, "src/i18n/locales"), { recursive: true });
    try {
      for (const [file, text] of Object.entries(LOCALE_STUBS)) writeFileSync(join(dir, file), text);
      writeFileSync(
        join(dir, "src/features/x/bad.tsx"),
        [
          'import { en } from "@/i18n/locales/en";',
          'import { amAdmin } from "../../i18n/locales/am-admin";',
          'export { en as whole } from "@/i18n/locales/en";',
          "export const n = Object.keys({ ...en, ...amAdmin }).length;",
          "",
        ].join("\n"),
      );
      expect(censusOf(dir)).toBe(
        [
          `src/features/x/bad.tsx:1 imports src/i18n/locales/en ${RULE}`,
          `src/features/x/bad.tsx:2 imports src/i18n/locales/am-admin ${RULE}`,
          `src/features/x/bad.tsx:3 imports src/i18n/locales/en ${RULE}`,
        ].join("\n"),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CFLI-3 planted: a dynamic import of a locale module fails too — on demand is the mechanism's, not the screen's", () => {
    const dir = join(ROOT, "node_modules/.cache/locale-imports-dynamic");
    mkdirSync(join(dir, "src/features/x"), { recursive: true });
    mkdirSync(join(dir, "src/i18n/locales"), { recursive: true });
    try {
      for (const [file, text] of Object.entries(LOCALE_STUBS)) writeFileSync(join(dir, file), text);
      writeFileSync(
        join(dir, "src/features/x/sync.ts"),
        [
          "export async function sync() {",
          '  const { en } = await import("@/i18n/locales/en");',
          "  return Object.keys(en).length;",
          "}",
          "",
        ].join("\n"),
      );
      expect(censusOf(dir)).toBe(`src/features/x/sync.ts:2 imports src/i18n/locales/en ${RULE}`);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("CFLI-4 planted: en-base by name, a type-only import, a file inside src/i18n/ and a path landing elsewhere pass", () => {
    const dir = join(ROOT, "node_modules/.cache/locale-imports-allowed");
    mkdirSync(join(dir, "src/features/x"), { recursive: true });
    mkdirSync(join(dir, "src/i18n/locales"), { recursive: true });
    mkdirSync(join(dir, "src/lib/locales"), { recursive: true });
    try {
      for (const [file, text] of Object.entries(LOCALE_STUBS)) writeFileSync(join(dir, file), text);
      writeFileSync(
        join(dir, "src/features/x/good.ts"),
        [
          'import { enBase } from "@/i18n/locales/en-base";',
          'import type { en } from "@/i18n/locales/en";',
          'import { other } from "../../lib/locales/en";',
          "export const keys: Array<keyof typeof en> = [];",
          "export const n = Object.keys(enBase).length + other;",
          "",
        ].join("\n"),
      );
      writeFileSync(join(dir, "src/i18n/join.ts"), 'export { en } from "./locales/en";\n');
      writeFileSync(join(dir, "src/lib/locales/en.ts"), "export const other = 1;\n");
      expect(censusOf(dir)).toBe("");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
