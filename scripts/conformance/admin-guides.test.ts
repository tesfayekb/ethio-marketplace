import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import {
  guideCensus,
  neededKeys,
  neededPageKeys,
  ROUTES_WITHOUT_GUIDE,
  routePathOf,
  type GuideKind,
} from "./admin-guides";
import { reachableFrom } from "./admin-guides-read";
import { readAllowlist, report, TREE_SCAN_MS } from "./kit";

/**
 * P-1c (D313) — CF-GUIDE-1: every admin block carries its Guide (DataTable's
 * `guide`), every visible column its line in the guide layer, no guide key
 * astray or unclaimed; proven on planted trees, then run on the tree.
 * P-1c turn (b) (D315) — and every page route people use reaches a Guide
 * (PageGuide, or guide= on its table), its parts named, its next a route.
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
    "src/i18n/locales/en-member.ts": catalogue("enMember", ["prim.table.actions"]),
    "src/i18n/locales/en-guide.ts": catalogue("enGuide", guideKeys),
    ...extra,
  });
}

/** A page tree: three covered routes, two excluded ones, the wizard's conditional spec. */
const PAGE_GUIDE = `
import { PageGuide } from "@/components/shell/page-guide";
import { POST_GUIDE, EDIT_GUIDE, WIZARD_PARTS } from "./wizard-guide";
const GUIDE = { prefix: "feed", next: { to: "/post" } };
const PARTS = [{ key: "heading" }, { key: "card" }] as const;
export function FeedPage({ edit }: { edit: boolean }) {
  return (
    <>
      <PageGuide spec={GUIDE} title="x" parts={PARTS} />
      <PageGuide spec={edit ? EDIT_GUIDE : POST_GUIDE} title="y" parts={WIZARD_PARTS} />
    </>
  );
}
`;
const WIZARD_GUIDE = `
export const POST_GUIDE = { prefix: "post", next: { to: "/my-listings" } };
export const EDIT_GUIDE = { prefix: "post.edit", partsPrefix: "post", next: { to: "/my-listings" } };
export const WIZARD_PARTS = [{ key: "category", labelKey: "post.step.category" }, { key: "photos" }];
`;
const PAGE_KEYS = [
  ...neededPageKeys("feed", "feed", ["heading", "card"]),
  ...neededPageKeys("post", "post", ["category", "photos"]),
  ...neededPageKeys("post.edit", "post", ["category", "photos"]),
];
function plantPages(feedPage: string, guideKeys: string[], extra: Record<string, string> = {}) {
  return tree({
    "src/routes/index.tsx":
      'import { FeedPage } from "@/features/feed/feed-page";\nexport const Route = FeedPage;\n',
    "src/routes/my-listings.tsx":
      'import { Page } from "@/features/my-listings/my-page";\nexport const Route = Page;\n',
    "src/routes/post.tsx": "export const Route = 1;\n",
    "src/routes/admin.users.tsx": "export const Route = 1;\n",
    "src/routes/privacy.tsx": "export const Route = 1;\n",
    "src/routes/__root.tsx": "export const Route = 1;\n",
    "src/features/feed/feed-page.tsx": feedPage,
    "src/features/feed/wizard-guide.ts": WIZARD_GUIDE,
    "src/features/my-listings/my-page.tsx":
      'export const Page = () => <DataTable columns={[{ key: "photo", header: "p", cell: () => null }]} guide={{ prefix: "myListings", next: { to: "/post" } }} />;\n',
    "src/i18n/locales/en-base.ts": catalogue("enBase", ["prim.guide.open", "prim.guide.parts"]),
    "src/i18n/locales/en-guide.ts": catalogue("enGuide", guideKeys),
    ...extra,
  });
}
const TABLE_KEYS = neededKeys("myListings", ["photo"]);

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

  it("CFG-4 pages: a covered route reaching a PageGuide (a constant, an inline or a conditional spec; parts inline, a constant or imported) passes; an excluded route is not asked; a route reaching none is found", () => {
    const census = guideCensus(plantPages(PAGE_GUIDE, [...PAGE_KEYS, ...TABLE_KEYS]));
    expect(census.routes).toEqual([
      "src/routes/index.tsx",
      "src/routes/my-listings.tsx",
      "src/routes/post.tsx",
    ]);
    expect(census.pages.map((page) => [page.prefix, page.partsPrefix, page.parts])).toEqual([
      ["feed", "feed", ["heading", "card"]],
      ["post.edit", "post", ["category", "photos"]],
      ["post", "post", ["category", "photos"]],
    ]);
    expect(census.tables.map((table) => table.prefixes)).toEqual([["myListings"]]);
    // post.tsx reaches no Guide: the one finding.
    expect(census.findings).toEqual([
      expect.objectContaining({ file: "src/routes/post.tsx", kind: "no guide" }),
    ]);
  });

  it("CFG-5 pages: a next.to outside the route register, a non-literal spec, non-literal parts and a missing part line are each found", () => {
    const keys = [...PAGE_KEYS, ...TABLE_KEYS];
    const only = (root: string) =>
      guideCensus(root).findings.filter((finding) => finding.file !== "src/routes/post.tsx");
    expect(only(plantPages(PAGE_GUIDE.replace('to: "/post"', 'to: "/nowhere"'), keys))).toEqual([
      expect.objectContaining({ kind: "shape", what: expect.stringContaining('"/nowhere"') }),
    ]);
    expect(
      only(plantPages(PAGE_GUIDE.replace("spec={GUIDE}", "spec={specOf(kind)}"), keys)).map(
        (finding) => finding.kind,
      ),
    ).toEqual(["shape", "unclaimed", "unclaimed", "unclaimed", "unclaimed", "unclaimed"]);
    expect(
      only(plantPages(PAGE_GUIDE.replace("parts={PARTS}", "parts={partsOf()}"), keys)).map(
        (finding) => finding.kind,
      ),
    ).toEqual(["key", "unclaimed", "unclaimed", "unclaimed", "unclaimed", "unclaimed"]);
    expect(
      only(
        plantPages(
          PAGE_GUIDE,
          keys.filter((key) => key !== "post.guide.part.photos"),
        ),
      ),
    ).toEqual([
      expect.objectContaining({
        kind: "missing",
        what: 'en-guide.ts lacks "post.guide.part.photos"',
      }),
    ]);
  });

  it("CFG-7 a route reaches files through value imports only: a type-only import is not followed", () => {
    const root = tree({
      "src/routes/index.tsx":
        'import type { T } from "@/features/x/types";\nimport { P } from "@/features/x/page";\nexport const Route = P;\n',
      "src/features/x/types.ts": "export type T = 1;\n",
      "src/features/x/page.tsx": 'import "./style";\nexport const P = 1;\n',
      "src/features/x/style.ts": "export const S = 1;\n",
    });
    const reached = reachableFrom(root, join(root, "src/routes/index.tsx")).map((file) =>
      relative(root, file),
    );
    expect(reached.sort()).toEqual([
      "src/features/x/page.tsx",
      "src/features/x/style.ts",
      "src/routes/index.tsx",
    ]);
  });

  it("CFG-6 the exclusions name the structural screens only, each with its reason; route paths read from stems", () => {
    const stems = [
      "admin",
      "admin.users",
      "dev.style",
      "auth_.callback",
      "auth_.reset",
      "account_.legal",
      "account_.legal_.$versionId",
      "legal.$kind",
      "legal.accept",
      "privacy",
      "terms",
    ];
    for (const stem of stems)
      expect(ROUTES_WITHOUT_GUIDE.some((rule) => rule.stem.test(stem))).toBe(true);
    for (const stem of [
      "index",
      "auth",
      "account",
      "account_.saved",
      "l.$slug",
      "my-listings_.$listingId_.edit",
      "post_.$listingId",
      "$name",
    ])
      expect(ROUTES_WITHOUT_GUIDE.some((rule) => rule.stem.test(stem))).toBe(false);
    for (const rule of ROUTES_WITHOUT_GUIDE) expect(rule.reason.length).toBeGreaterThan(10);
    expect(routePathOf("index")).toBe("/");
    expect(routePathOf("account_.saved")).toBe("/account/saved");
    expect(routePathOf("my-listings")).toBe("/my-listings");
  });

  it(
    "CFG-3 the tree: every admin table carries its Guide or its allowance, every covered route reaches one; every Guide has every key; the layer holds nothing astray or unclaimed",
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
      // Turn (a): Monetisation's six guides (two prefixes share the products file); turn (b):
      // My listings' table and the ten page Guides (the wizard's two share one draw).
      expect(census.tables.flatMap((table) => table.prefixes).sort()).toEqual([
        "admin.monetisation.caps",
        "admin.monetisation.level",
        "admin.monetisation.levelOverrides",
        "admin.monetisation.markets",
        "admin.monetisation.productPrices",
        "admin.monetisation.reach",
        "myListings",
      ]);
      expect(census.pages.map((page) => page.prefix).sort()).toEqual([
        "account",
        "adPage",
        "auth",
        "feed",
        "myListing",
        "post",
        "post.edit",
        "saved",
        "sellerPage",
        "settings",
      ]);
      expect(census.routes.length).toBe(13);
      for (const key of allowances.keys()) expect(key.startsWith("src/features/admin")).toBe(true);
    },
    TREE_SCAN_MS,
  );
});
