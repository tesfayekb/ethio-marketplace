import { describe, expect, it, vi } from "vitest";

/**
 * INC-1023 (turn D2) — overlayBundle, the one merge, and the reader's shape law:
 * a written row always wins; a copied row applies only where the build ships no
 * text; a language the build does not ship shows its copied rows; a flat or
 * malformed answer keeps the compiled text (D3).
 */

const door = vi.hoisted(() => ({ data: null as unknown }));
vi.mock("@/lib/supabase-door", () => ({
  rpc: async () => ({ data: door.data, error: null }),
}));

import { overlayBundle, shapeBundle, fetchUiBundle, uiBundleEtag } from "./bundle";

describe("overlayBundle (INC-1023)", () => {
  const base = { "a.k": "build a", "b.k": "build b", "c.k": "english c" };

  it("OVB-1 a written row wins over the build's own text", () => {
    const out = overlayBundle(base, { written: { "a.k": "written a" }, copied: {} }, base);
    expect(out["a.k"]).toBe("written a");
  });

  it("OVB-2 a copied row yields to the build's own text", () => {
    const out = overlayBundle(base, { written: {}, copied: { "b.k": "stale copy" } }, base);
    expect(out["b.k"]).toBe("build b");
  });

  it("OVB-3 a copied row fills a key the build ships no text for", () => {
    const shipped = { "a.k": "build a" };
    const out = overlayBundle(base, { written: {}, copied: { "c.k": "copied c" } }, shipped);
    expect(out["c.k"]).toBe("copied c");
  });

  it("OVB-4 a language the build does not ship shows its copied rows", () => {
    const out = overlayBundle(base, { written: {}, copied: { "a.k": "x", "b.k": "y" } }, {});
    expect(out).toEqual({ "a.k": "x", "b.k": "y", "c.k": "english c" });
  });

  it("OVB-5 written beats copied for one key, and the base is not mutated", () => {
    const parts = { written: { "a.k": "w" }, copied: { "a.k": "c" } };
    const out = overlayBundle(base, parts, {});
    expect(out["a.k"]).toBe("w");
    expect(base["a.k"]).toBe("build a");
  });

  it("OVB-6 an inherited member name in shipped is not the build's text", () => {
    const out = overlayBundle({}, { written: {}, copied: { toString: "copied" } }, {});
    expect(out["toString"]).toBe("copied");
  });
});

describe("the bundle's shape (INC-1023)", () => {
  it("OVB-7 a flat (pre-parts) answer is refused, so the compiled text stays", () => {
    expect(shapeBundle({ "a.k": "flat" })).toEqual({
      bundle: null,
      reason: "bundle is not the written/copied shape",
    });
  });

  it("OVB-8 a malformed or empty answer is refused; blank values are dropped", () => {
    expect(shapeBundle([]).bundle).toBeNull();
    expect(shapeBundle({ written: {}, copied: {} }).bundle).toBeNull();
    expect(shapeBundle({ written: { a: "", b: "B" }, copied: { c: 3 } }).bundle).toEqual({
      written: { b: "B" },
      copied: {},
    });
  });

  it("OVB-9 a cached flat answer from the route keeps the compiled text", async () => {
    const fetchMock = vi.fn(
      async () => new Response(JSON.stringify({ lang: "am", bundle: { "a.k": "flat" } })),
    );
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchUiBundle("am");
    expect(result.bundle).toBeNull();
    expect(overlayBundle({ "a.k": "build" }, { written: {}, copied: {} }, {})["a.k"]).toBe("build");
    vi.unstubAllGlobals();
  });

  it("OVB-10 the rpc fallback reads the parts", async () => {
    vi.stubGlobal("fetch", async () => new Response("", { status: 503 }));
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    door.data = { written: { a: "W" }, copied: { b: "C" } };
    expect((await fetchUiBundle("am")).bundle).toEqual({ written: { a: "W" }, copied: { b: "C" } });
    vi.unstubAllGlobals();
  });

  it("OVB-11 the validator names the parts shape, so a flat answer's tag never matches", () => {
    expect(uiBundleEtag("am", "h1")).toBe('"parts1.am.h1"');
    expect(uiBundleEtag("am", "h1")).not.toBe('"am.h1"');
  });
});
