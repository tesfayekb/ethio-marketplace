import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  entryChunks,
  mustStayLazyViolation,
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
