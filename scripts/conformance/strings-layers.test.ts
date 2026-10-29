import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { STRINGS_LAYERS } from "../../src/i18n/compiled-catalog";
import { en } from "../../src/i18n/locales/en";
import { TREE_SCAN_MS } from "./kit";
import { LAYERS, catalogueFile, catalogueKeys, misplaced, stringsCensus } from "./strings-layers";

/**
 * DEC-258 (Foundations turn 30; DEC-231's admin-layer judge, generalised) —
 * every catalogue key sits where the strings-layers census puts it: a key only
 * pages that load a layer can show lives in that layer, never in every page's
 * first download; a key any other page shows stays in the base part.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of files under a temporary root. */
function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "strings-layers-"));
  temps.push(root);
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

const PLANTED = {
  "src/routes/__root.tsx": 'import "../features/shell";\nexport const Route = {};\n',
  "src/routes/index.tsx":
    'import { shared } from "../features/shared";\nimport type { Form } from "../features/form";\nexport const Route = { component: shared };\nexport type F = Form;\n',
  "src/routes/post.tsx":
    'import { form } from "../features/form";\nexport const Route = { staticData: { strings: ["member"] }, component: form };\n',
  "src/routes/admin.tsx":
    'export const Route = { staticData: { strings: ["admin", "member"] } };\nexport const t = "a.both";\n',
  "src/routes/admin.users.tsx": 'export const Route = {};\nexport const t = "a.admin";\n',
  "src/features/shell.tsx": 'export const shell = "a.shell";\n',
  "src/features/shared.tsx": 'export const shared = () => "a.shared";\n',
  "src/features/form.tsx":
    'export type Form = string;\nexport const form = (code: string) => ["a.form", `a.err.${code}`, "a.both"];\n',
  "src/i18n/locales/en-base.ts":
    'export const enBase = {\n  "a.shell": "x",\n  "a.shared": "x",\n  "a.form": "x",\n  "a.err.one": "x",\n  "a.both": "x",\n  "a.admin": "x",\n  "a.dead": "x",\n} as const;\n',
  "src/i18n/locales/en-admin.ts": "export const enAdmin = {} as const;\n",
  "src/i18n/locales/en-member.ts": "export const enMember = {} as const;\n",
};

describe("the strings layers (DEC-258)", () => {
  it(
    "CF-SL-1 every catalogue key sits in the file the census names",
    () => {
      const census = stringsCensus(ROOT);
      console.log(
        `[strings-layers] scanned: ${census.scanned}, pages: ${census.pages.size}, keys: ${census.home.size}`,
      );
      expect(misplaced(census, ROOT)).toEqual([]);
    },
    TREE_SCAN_MS,
  );

  it("CF-SL-2 Amharic mirrors English file by file, and the parts join to the whole catalogue", () => {
    const parts = (["base", ...LAYERS] as const).map((home) => ({
      en: catalogueKeys(ROOT, catalogueFile(home, "en")),
      am: catalogueKeys(ROOT, catalogueFile(home, "am")),
    }));
    for (const part of parts) expect(part.am.slice().sort()).toEqual(part.en.slice().sort());
    const all = parts.flatMap((part) => part.en);
    expect(new Set(all).size).toBe(all.length);
    expect(all.slice().sort()).toEqual(Object.keys(en).sort());
  });

  it(
    "CF-SL-3 the routes' declarations: posting and my listings load member, admin screens both, the listings pages none",
    () => {
      const { pages } = stringsCensus(ROOT);
    expect(LAYERS).toEqual(STRINGS_LAYERS);
    expect([...(pages.get("post") ?? [])]).toEqual(["member"]);
    expect([...(pages.get("my-listings_.$listingId_.edit") ?? [])]).toEqual(["member"]);
    expect([...(pages.get("admin.users") ?? [])].sort()).toEqual(["admin", "member"]);
    expect([...(pages.get("admin.listings_.$listingId_.edit") ?? [])].sort()).toEqual([
      "admin",
      "member",
    ]);
    expect([...(pages.get("index") ?? [])]).toEqual([]);
    expect([...(pages.get("c.$slug") ?? [])]).toEqual([]);
    expect([...(pages.get("__root") ?? [])]).toEqual([]);
      for (const layers of pages.values()) {
        for (const layer of layers) expect(STRINGS_LAYERS as readonly string[]).toContain(layer);
      }
    },
    TREE_SCAN_MS,
  );

  it("CF-SL-4 planted: a key only a member page shows belongs in the member part; a public page's, the root's and a type-only import's do not move it", () => {
    const root = tree(PLANTED);
    const census = stringsCensus(root);
    expect(Object.fromEntries(census.home)).toEqual({
      "a.shell": "base",
      "a.shared": "base",
      "a.form": "member",
      "a.err.one": "member",
      "a.both": "member",
      "a.admin": "admin",
      "a.dead": null,
    });
    expect(misplaced(census, root)).toEqual([
      "a.admin — in en-base.ts, belongs in en-admin.ts (shown on: admin.users)",
      "a.both — in en-base.ts, belongs in en-member.ts (shown on: admin, post)",
      "a.err.one — in en-base.ts, belongs in en-member.ts (shown on: post)",
      "a.form — in en-base.ts, belongs in en-member.ts (shown on: post)",
    ]);
  });

  it("CF-SL-5 planted: a public page that imports the member page's file keeps its keys in the base part", () => {
    const root = tree({
      ...PLANTED,
      "src/routes/index.tsx":
        'import { form } from "../features/form";\nexport const Route = { component: form };\n',
    });
    const census = stringsCensus(root);
    expect(census.home.get("a.form")).toBe("base");
    expect(census.home.get("a.err.one")).toBe("base");
    expect(census.shownOn.get("a.form")).toEqual(["index", "post"]);
  });

  it(
    "CF-SL-6 the census reads the whole tree",
    () => {
      const census = stringsCensus(ROOT);
      expect(census.scanned).toBeGreaterThanOrEqual(500);
      expect(census.pages.size).toBeGreaterThanOrEqual(45);
      expect(census.home.size).toBe(Object.keys(en).length);
    },
    TREE_SCAN_MS,
  );
});
