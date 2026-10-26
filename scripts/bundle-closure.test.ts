import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  entryChunks,
  judgeRouteBudgets,
  mustStayLazyViolation,
  pageRouteIds,
  PUBLIC_MUST_STAY_LAZY,
  readRouteManifest,
  routePreloads,
  staticClosure,
  staticImportsOf,
} from "./bundle-closure.mjs";

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
});
