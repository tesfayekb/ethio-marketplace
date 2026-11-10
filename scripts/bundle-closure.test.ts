import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  carriedViolation,
  chunkBaseName,
  closureListViolations,
  entryChunks,
  judgeRouteBudgets,
  moduleCensus,
  mustStayLazyViolation,
  pageRouteIds,
  parseChunkModules,
  PUBLIC_MUST_STAY_LAZY,
  readRouteManifest,
  routePreloads,
  staticClosure,
  staticImportsOf,
} from "./bundle-closure.mjs";
import { ENTRY_CLOSURE, SHARED_SHELL_MODULES } from "./route-budgets.mjs";

/**
 * Bundle 11 turn C8 (INC-556, DEC-176) — the first-paint budget follows the
 * entry chunk's static imports. Proven on planted chunks.
 */
function planted(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), "closure-"));
  for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text);
  return dir;
}

describe("the entry's static import closure (DEC-176)", () => {
  it("BC-1 static imports and re-exports count; a dynamic import does not", () => {
    const source =
      'import{a as b}from"./client-x.js";import"./side-y.js";export{c}from"./re-z.js";' +
      'const p=()=>import("./lazy-q.js");__vitePreload(()=>import("./lazy-r.js"),["assets/lazy-r.js"]);';
    expect(staticImportsOf(source).sort()).toEqual(["client-x.js", "re-z.js", "side-y.js"]);
  });

  it("BC-2 the closure follows imports through any depth, once each, and leaves lazy chunks out", () => {
    const dir = planted({
      "index-a.js": 'import"./client-b.js";const l=()=>import("./route-c.js");',
      "client-b.js": 'import{x}from"./shared-d.js";import"./index-a.js";',
      "shared-d.js": "export const x=1;",
      "route-c.js": 'import"./heavy-e.js";',
      "heavy-e.js": "",
    });
    expect(staticClosure(dir, ["index-a.js"])).toEqual([
      "client-b.js",
      "index-a.js",
      "shared-d.js",
    ]);
  });

  it("BC-3 an import of a chunk that is not there fails the guard", () => {
    const dir = planted({ "index-a.js": 'import"./gone-b.js";' });
    expect(() => staticClosure(dir, ["index-a.js"])).toThrow("gone-b.js is imported but not in");
  });

  it("BC-4 the entries are the index, entry or main chunks, never a shared chunk named client", () => {
    expect(
      entryChunks(["index-C1.js", "client-by2.js", "main.abc.js", "styles-x.css", "provider-q.js"]),
    ).toEqual(["index-C1.js", "main.abc.js"]);
  });

  it("BC-5 a must-stay-lazy chunk in the closure is refused, by name (INC-864)", () => {
    expect(mustStayLazyViolation(["index-a.js", "reader-failure-x.js", "shared-d.js"])).toBe(
      "reader-failure-x.js",
    );
    expect(mustStayLazyViolation(["legal-page-data-b.js"])).toBe("legal-page-data-b.js");
    expect(mustStayLazyViolation(["zod-c.js"])).toBe("zod-c.js");
    expect(mustStayLazyViolation(["posting-service-e.js"])).toBe("posting-service-e.js");
    expect(mustStayLazyViolation(["index-a.js", "shared-d.js"])).toBeNull();
  });
});

/**
 * D234 speed turn S1 — every page's first download, from the build's route
 * manifest, judged against scripts/route-budgets.mjs. Proven on planted manifests.
 */
describe("every page's first download (D234)", () => {
  const routes = {
    __root__: {
      children: ["/", "/l/$slug", "/post", "/api/feed"],
      preloads: ["/assets/index-a.js"],
    },
    "/": { preloads: ["/assets/home-b.js"] },
    "/l/$slug": { preloads: ["/assets/ad-c.js", "/assets/index-a.js"] },
    "/post": { preloads: ["/assets/wizard-d.js"] },
    "/api/feed": {},
  };

  it("BC-6 a page preloads its own chunks and every ancestor's, once each; an unknown page throws", () => {
    expect(routePreloads(routes, "/l/$slug")).toEqual(["ad-c.js", "index-a.js"]);
    expect(routePreloads(routes, "/")).toEqual(["home-b.js", "index-a.js"]);
    expect(() => routePreloads(routes, "/gone")).toThrow("no route /gone");
  });

  it("BC-7 the pages are every route but the root and the server routes under /api/", () => {
    expect(pageRouteIds(routes)).toEqual(["/", "/l/$slug", "/post"]);
  });

  it("BC-8 the manifest module is read from the server build; a build without one fails", async () => {
    // Planted inside the project (node_modules/.cache): the test runner imports only from there.
    const cache = join(process.cwd(), "node_modules", ".cache");
    mkdirSync(cache, { recursive: true });
    const dir = mkdtempSync(join(cache, "route-manifest-"));
    writeFileSync(
      join(dir, "_tanstack-start-manifest_v-x.mjs"),
      'var tsrStartManifest = () => ({ routes: { __root__: { children: ["/"] }, "/": { preloads: ["/assets/h.js"] } } });\nexport { tsrStartManifest };\n',
    );
    try {
      const read = await readRouteManifest(dir);
      expect(routePreloads(read, "/")).toEqual(["h.js"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    await expect(readRouteManifest(planted({ "other.mjs": "" }))).rejects.toThrow(
      "no _tanstack-start-manifest",
    );
  });

  const sizes: Record<string, { kib: number; closure: string[] }> = {
    "/": { kib: 300, closure: ["index-a.js", "home-b.js"] },
    "/l/$slug": { kib: 320, closure: ["index-a.js", "ad-c.js"] },
    "/post": { kib: 420, closure: ["index-a.js", "wizard-d.js", "posting-service-e.js"] },
  };
  const judge = (budgets: Record<string, { ceiling: number; public: boolean }>, measured = sizes) =>
    judgeRouteBudgets({
      routeIds: ["/", "/l/$slug", "/post"],
      budgets,
      slack: 8,
      publicLazy: PUBLIC_MUST_STAY_LAZY,
      measure: (id: string) => {
        const size = new Map(Object.entries(measured)).get(id);
        if (size === undefined) throw new Error(`no size planted for ${id}`);
        return size;
      },
    }).failures;
  const fair = {
    "/": { ceiling: 303, public: true },
    "/l/$slug": { ceiling: 323, public: true },
    "/post": { ceiling: 423, public: false },
  };

  it("BC-9 pages within their ceilings pass; a private page may hold the posting doors", () => {
    expect(judge(fair)).toEqual([]);
  });

  it("BC-10 a page over its ceiling fails, and so does one 8 KiB or more under it (the ratchet)", () => {
    expect(judge({ ...fair, "/": { ceiling: 299, public: true } })).toEqual([
      "/: 300.0 KiB, over its ceiling of 299 KiB",
    ]);
    expect(judge({ ...fair, "/post": { ceiling: 428, public: false } })).toEqual([
      "/post: 420.0 KiB, 8 KiB or more under its ceiling of 428 KiB (ratchet: lower the ceiling to 423)",
    ]);
  });

  it("BC-11 a page with no ceiling fails, and so does a ceiling for a page the build lacks", () => {
    const { "/post": _post, ...withoutPost } = fair;
    expect(judge(withoutPost)).toEqual([
      "/post: no ceiling in scripts/route-budgets.mjs (every page declares its first download)",
    ]);
    expect(judge({ ...fair, "/gone": { ceiling: 300, public: false } })).toEqual([
      "/gone: a ceiling for a page the build does not have",
    ]);
  });

  it("BC-12 a public page holding a must-stay-lazy chunk fails, by name", () => {
    const planted = {
      ...sizes,
      "/l/$slug": { kib: 320, closure: ["index-a.js", "ad-c.js", "posting-service-e.js"] },
    };
    expect(judge(fair, planted)).toEqual([
      "/l/$slug: posting-service-e.js must stay lazy on a public page (D234)",
    ]);
    for (const prefix of ["category-glyphs", "date-calendar", "leaflet", "zod", "overlays-impl"]) {
      expect(PUBLIC_MUST_STAY_LAZY).toContain(prefix);
    }
  });

  it("BC-13 a chunk that carries the Supabase client fails by its text, whatever its name — the entry and a public page (DEC-261)", () => {
    const texts = new Map([
      ["index-a.js", "export const shell = 1;"],
      ["dist-b.js", "class GoTrueClient {}"],
    ]);
    const textOf = (name: string) => texts.get(name) ?? "";
    expect(carriedViolation(["index-a.js"], textOf)).toBeNull();
    expect(carriedViolation(["index-a.js", "dist-b.js"], textOf)).toEqual({
      name: "dist-b.js",
      marker: "GoTrueClient",
    });
    const carries = (closure: string[]) => carriedViolation(closure, textOf);
    const planted = {
      ...sizes,
      "/l/$slug": { kib: 320, closure: ["index-a.js", "dist-b.js"] },
    };
    expect(
      judgeRouteBudgets({
        routeIds: Object.keys(planted),
        budgets: fair,
        measure: (id) => planted[id as keyof typeof planted],
        slack: 8,
        publicLazy: PUBLIC_MUST_STAY_LAZY,
        carries,
      }).failures,
    ).toEqual(["/l/$slug: dist-b.js carries GoTrueClient on a public page (DEC-261)"]);
  });
});

/**
 * DEC-362 (housekeeping turn 1b) — the entry's closure is a law, and the shared-shell
 * group's module list is checked against the build both ways. Proven on planted
 * closures and records; the budget step (scripts/check-bundle-size.mjs) is the caller.
 */
describe("the first-paint closure is chunked by a rule (DEC-362)", () => {
  const listed = {
    index: ["the client entry"],
    dist: ["Radix's shared modules", "the variant recipes"],
    "shared-shell": ["the group"],
  };
  const closure = [
    "index-aaaaaaaa.js",
    "dist-bbbbbbbb.js",
    "dist-cccccccc.js",
    "shared-shell-dddddddd.js",
  ];

  it("BC-14 the closure equals ENTRY_CLOSURE by name, hashes stripped: a planted extra or missing name fails by name; a repeated name counts", () => {
    expect(closureListViolations(closure, listed)).toEqual([]);
    // hashes with hyphens and underscores strip to the same base name
    expect(
      [
        "useMatch-i8-xg83V.js",
        "root-DLTE-HSj.js",
        "on-demand-notice-BC3xzsKv.js",
        "dist-Cg_Z-iXv.js",
      ].map(chunkBaseName),
    ).toEqual(["useMatch", "root", "on-demand-notice", "dist"]);
    // an extra chunk joins the first download
    expect(closureListViolations([...closure, "provider-eeeeeeee.js"], listed)).toEqual([
      "provider: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (a chunk joined the first download, DEC-362)",
    ]);
    // a listed chunk leaves it
    expect(
      closureListViolations(["index-aaaaaaaa.js", "dist-bbbbbbbb.js", "dist-cccccccc.js"], listed),
    ).toEqual([
      "shared-shell: ENTRY_CLOSURE lists 1, the entry's closure holds 0 (a chunk left the first download, DEC-362)",
    ]);
    // the multiplicity: a third `dist` joins, one `dist` leaves
    expect(closureListViolations([...closure, "dist-ffffffff.js"], listed)).toEqual([
      "dist: 3 in the entry's closure, ENTRY_CLOSURE lists 2 (a chunk joined the first download, DEC-362)",
    ]);
    expect(
      closureListViolations(
        ["index-aaaaaaaa.js", "dist-bbbbbbbb.js", "shared-shell-dddddddd.js"],
        listed,
      ),
    ).toEqual([
      "dist: ENTRY_CLOSURE lists 2, the entry's closure holds 1 (a chunk left the first download, DEC-362)",
    ]);
    // the real list: a reason per occurrence, none empty
    for (const [name, reasons] of Object.entries(ENTRY_CLOSURE)) {
      expect(reasons.length, name).toBeGreaterThan(0);
      for (const reason of reasons) expect(reason.trim().length, name).toBeGreaterThan(0);
    }
    expect(Object.keys(ENTRY_CLOSURE)).toContain("shared-shell");
  });

  const record = {
    "shared-shell-AAAAAAAA.js": ["src/a.ts", "src/b.ts"],
    "index-BBBBBBBB.js": ["src/c.ts", "node_modules/react/index.js"],
  };
  const exists = (path: string) => path !== "src/gone.ts";

  it("BC-15 the module census: a stale path fails by path, a stray module by name; the real list is in the tree, once each, with a reason", () => {
    expect(moduleCensus({ record, listed: ["src/a.ts", "src/b.ts"], exists })).toEqual([]);
    // a listed path the tree no longer has
    expect(
      moduleCensus({ record, listed: ["src/a.ts", "src/b.ts", "src/gone.ts"], exists }),
    ).toEqual(["src/gone.ts: listed in SHARED_SHELL_MODULES but not in the tree"]);
    // a listed module another chunk holds
    expect(moduleCensus({ record, listed: ["src/a.ts", "src/b.ts", "src/c.ts"], exists })).toEqual([
      "src/c.ts: listed in SHARED_SHELL_MODULES but not in shared-shell-AAAAAAAA.js (it is in index-BBBBBBBB.js)",
    ]);
    // a module the group's chunk holds that the list does not name
    expect(moduleCensus({ record, listed: ["src/a.ts"], exists })).toEqual([
      "src/b.ts: in shared-shell-AAAAAAAA.js but SHARED_SHELL_MODULES does not name it",
    ]);
    // a path listed twice; a build with no group chunk
    expect(moduleCensus({ record, listed: ["src/a.ts", "src/b.ts", "src/a.ts"], exists })).toEqual([
      "src/a.ts: listed twice in SHARED_SHELL_MODULES",
    ]);
    expect(
      moduleCensus({ record: { "index-BBBBBBBB.js": ["src/c.ts"] }, listed: ["src/c.ts"], exists }),
    ).toEqual(["shared-shell: the build has 0 chunks of that name, one is expected (DEC-362)"]);
    // the record is read as its own shape
    expect(parseChunkModules('{"a-AAAAAAAA.js":["src/a.ts"]}')).toEqual({
      "a-AAAAAAAA.js": ["src/a.ts"],
    });
    expect(() => parseChunkModules('{"a-AAAAAAAA.js":"src/a.ts"}')).toThrow("not an object");
    expect(() => parseChunkModules("[]")).toThrow("not an object");
    // the real list, against the tree
    const paths = SHARED_SHELL_MODULES.map(([path]) => path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const [path, reason] of SHARED_SHELL_MODULES) {
      expect(existsSync(path), path).toBe(true);
      expect(reason.trim().length, path).toBeGreaterThan(0);
    }
  });
});
