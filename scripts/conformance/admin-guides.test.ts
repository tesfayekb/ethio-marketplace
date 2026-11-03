import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { guideCensus, neededKeys, type GuideKind } from "./admin-guides";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";

/**
 * P-1c (D313) — CF-GUIDE-1: every admin block carries its Guide (DataTable's
 * `guide`), every visible column its line in the guide layer, no guide key
 * astray or unclaimed; proven on planted trees, then run on the tree.
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "admin-guides-allowlist.txt");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "admin-guides-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

function catalogue(name: string, keys: string[]): string {
  return `export const ${name} = {\n${keys.map((key) => `  "${key}": "x",`).join("\n")}\n} as const;\n`;
}

const SHARED = `
import type { DataTableColumn } from "@/components/shell/data-table";
export function attributionColumns<T>(): DataTableColumn<T>[] {
  return [
    { key: "updatedBy", header: "u", priority: "detail", cell: () => null },
    { key: "updated", header: "w", priority: "detail", cell: () => null },
  ];
}
`;

const GOOD_PAGE = `
import { attributionColumns } from "./shared-columns";
export function Page({ isLevel }: { isLevel: boolean }) {
  const columns = [
    { key: "name", header: "n", priority: "primary", card: "title", cell: () => null },
    ...attributionColumns(),
  ];
  return (
    <DataTable
      columns={columns}
      guide={{
        prefix: isLevel ? "admin.x.level" : "admin.x.reach",
        next: { section: "monetisation", block: ANCHORS.markets },
      }}
    />
  );
}
`;

const GOOD_KEYS = [
  ...neededKeys("admin.x.level", ["name", "updatedBy", "updated"]),
  ...neededKeys("admin.x.reach", ["name", "updatedBy", "updated"]),
];

function plant(page: string, guideKeys: string[], extra: Record<string, string> = {}): string {
  return tree({
    "src/features/admin-x/x-page.tsx": page,
    "src/features/admin-x/shared-columns.tsx": SHARED,
    "src/features/my-listings/my-page.tsx": "export const P = () => <DataTable columns={[]} />;\n",
    "src/i18n/locales/en-base.ts": catalogue("enBase", ["common.close"]),
    "src/i18n/locales/en-admin.ts": catalogue("enAdmin", ["admin.x.title"]),
    "src/i18n/locales/en-member.ts": catalogue("enMember", ["prim.guide.open"]),
    "src/i18n/locales/en-guide.ts": catalogue("enGuide", guideKeys),
    ...extra,
  });
}

const kinds = (root: string): GuideKind[] =>
  guideCensus(root)
    .findings.map((finding) => finding.kind)
    .sort();

describe("CF-GUIDE-1 — every admin block explains itself (D313)", () => {
  it("CFG-1 a guided table with every key passes; a table without its Guide is found; a user's table is not asked", () => {
    const census = guideCensus(plant(GOOD_PAGE, GOOD_KEYS));
    expect(census.findings).toEqual([]);
    expect(census.tables.map((table) => table.prefixes)).toEqual([
      ["admin.x.level", "admin.x.reach"],
    ]);
    expect(census.tables[0]?.columns.sort()).toEqual(["name", "updated", "updatedBy"]);
    expect(census.files).toEqual(["src/features/admin-x/x-page.tsx"]);

    const bare = guideCensus(plant(GOOD_PAGE.replace(/guide=\{\{[\s\S]*?\}\}\n/, ""), []));
    expect(bare.findings.map((finding) => finding.kind)).toEqual(["no guide"]);
  });

  it("CFG-2 a column without its line, a non-literal key, a foreign section, an astray key and an unclaimed key are each found", () => {
    // The spread's columns come from another file: their lines are needed too.
    expect(
      kinds(
        plant(
          GOOD_PAGE,
          GOOD_KEYS.filter((k) => !k.endsWith(".col.updated")),
        ),
      ),
    ).toEqual(["missing", "missing"]);
    expect(kinds(plant(GOOD_PAGE.replace('key: "name"', "key: nameKey"), GOOD_KEYS))).toContain(
      "key",
    );
    expect(
      kinds(plant(GOOD_PAGE.replace('section: "monetisation"', 'section: "nowhere"'), GOOD_KEYS)),
    ).toEqual(["shape"]);
    expect(
      kinds(
        plant(
          GOOD_PAGE.replace(
            'prefix: isLevel ? "admin.x.level" : "admin.x.reach"',
            "prefix: prefixOf(kind)",
          ),
          GOOD_KEYS,
        ),
      ),
    ).toEqual(
      ["shape", "unclaimed"]
        .concat(Array<GuideKind>(GOOD_KEYS.length - 1).fill("unclaimed"))
        .sort(),
    );
    expect(
      kinds(
        plant(GOOD_PAGE, GOOD_KEYS, {
          "src/i18n/locales/en-admin.ts": catalogue("enAdmin", ["admin.y.guide.what"]),
        }),
      ),
    ).toEqual(["astray"]);
    expect(kinds(plant(GOOD_PAGE, [...GOOD_KEYS, "admin.z.guide.how"]))).toEqual(["unclaimed"]);
  });

  it(
    "CFG-3 the tree: every admin table carries its Guide or its allowance; every guided table has every key; the layer holds nothing astray or unclaimed",
    () => {
      const census = guideCensus(ROOT);
      const guideless = census.findings
        .filter((finding) => finding.kind === "no guide")
        .map((finding) => finding.file);
      const allowances = readAllowlist(ALLOWLIST, guideless);
      const open = census.findings.filter(
        (finding) => !(finding.kind === "no guide" && allowances.has(finding.file)),
      );
      console.log(
        `[admin-guides] tables: ${census.files.length}, guided: ${census.tables.length}, allowed: ${allowances.size}`,
      );
      expect(report(open)).toBe("");
      // Turn (a): Monetisation's six guides (two prefixes share the products file).
      expect(census.tables.flatMap((table) => table.prefixes).sort()).toEqual([
        "admin.monetisation.caps",
        "admin.monetisation.level",
        "admin.monetisation.levelOverrides",
        "admin.monetisation.markets",
        "admin.monetisation.productPrices",
        "admin.monetisation.reach",
      ]);
      for (const key of allowances.keys()) expect(key.startsWith("src/features/admin")).toBe(true);
    },
    TREE_SCAN_MS,
  );
});
