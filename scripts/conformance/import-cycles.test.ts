import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cycleFindings, importGraph, isCensusSource } from "./import-cycles";
import { readAllowlist, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * CF-CYCLE (the tests and CI turn 2, INC-1193) — no import cycle through src/i18n/ or a module
 * importing one (scripts/conformance/import-cycles.ts). CF-CYCLE-1 reads the tree; CF-CYCLE-2
 * proves the census on planted trees: a cycle through the catalogue is refused by file:line, one
 * through an importer is refused, a cycle elsewhere and a type-only or dynamic return are not.
 */
const ROOT = process.cwd();

const temps: string[] = [];
afterEach(() => {
  for (const root of temps.splice(0)) rmSync(root, { recursive: true, force: true });
});

function plantedFindings(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), "import-cycles-"));
  temps.push(root);
  const texts = new Map<string, string>();
  for (const [path, text] of Object.entries(files)) {
    const full = join(root, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, text);
    texts.set(full, text);
  }
  return cycleFindings(root, importGraph(root, [...texts.keys()], texts));
}

describe("no import cycle through the strings (INC-1193)", () => {
  it(
    "CF-CYCLE-1 src/ holds no import cycle through src/i18n/ or a module importing one",
    () => {
      const files = walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"], skipTests: true }).filter(
        isCensusSource,
      );
      expect(files.length).toBeGreaterThan(500);
      const findings = cycleFindings(ROOT, importGraph(ROOT, files));
      const allowed = readAllowlist(
        join(ROOT, "scripts/conformance/import-cycles-allowlist.txt"),
        findings.map(({ key }) => key),
      );
      expect(findings.filter(({ key }) => !allowed.has(key))).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CF-CYCLE-2 planted cycles: the catalogue's and an importer's refuse by file:line; elsewhere, type-only and dynamic do not", () => {
    // The INC-1193 shape: the catalogue's reader imports the provider that reads the catalogue.
    expect(
      plantedFindings({
        "src/i18n/locales/en-base.ts":
          'import { t } from "@/i18n/provider";\nexport const enBase = { t };\n',
        "src/i18n/provider.tsx":
          'import { enBase } from "./locales/en-base";\nexport const t = enBase;\n',
      }),
    ).toEqual([
      {
        key: "src/i18n/locales/en-base.ts",
        what: "a cycle of 2 module(s): src/i18n/locales/en-base.ts:1 → src/i18n/provider.tsx; src/i18n/provider.tsx:1 → src/i18n/locales/en-base.ts",
      },
    ]);
    // A cycle between two importers of the catalogue, outside src/i18n/, through a re-export.
    expect(
      plantedFindings({
        "src/i18n/locales/en-base.ts": "export const enBase = {};\n",
        "src/lib/page-head.ts":
          'import { enBase } from "../i18n/locales/en-base";\nexport { shell } from "./shell";\nexport const head = enBase;\n',
        "src/lib/shell.ts": 'import { head } from "./page-head";\nexport const shell = head;\n',
      }).map(({ key }) => key),
    ).toEqual(["src/lib/page-head.ts"]);
    // A module importing itself is a cycle of one.
    expect(
      plantedFindings({
        "src/i18n/self.ts":
          'import { a } from "./self";\nexport const a = 1;\nexport const b = a;\n',
      }).map(({ what }) => what),
    ).toEqual(["a cycle of 1 module(s): src/i18n/self.ts:1 → src/i18n/self.ts"]);
    // Not refused: a cycle that touches no string module, a type-only return, a dynamic return.
    expect(
      plantedFindings({
        "src/i18n/locales/en-base.ts": "export const enBase = {};\n",
        "src/lib/a.ts": 'import { b } from "./b";\nexport const a = b;\n',
        "src/lib/b.ts": 'import { a } from "./a";\nexport const b = a;\n',
        "src/i18n/provider.tsx":
          'import { enBase } from "./locales/en-base";\nimport { s } from "../lib/s";\nexport const t = enBase;\nexport type T = typeof s;\n',
        "src/lib/s.ts":
          'import type { T } from "../i18n/provider";\nimport { type T as U } from "../i18n/provider";\nexport const s = 1;\nexport const later = () => import("../i18n/provider");\nexport type V = T | U;\n',
      }),
    ).toEqual([]);
  });
});
