import { describe, expect, it } from "vitest";

import { STRINGS_LAYERS, compiledLayerLoader, isStringsLayer } from "./compiled-catalog";

/**
 * DEC-258 (DEC-231's admin loader, generalised) — each strings layer's loader
 * answers under the same own-key law as compiledCatalogLoader (Part H1): a
 * listed code gives its loader; an unlisted code, and a code naming an
 * inherited member, give undefined.
 */
describe("compiledLayerLoader (DEC-258)", () => {
  it("CLL-1 every layer gives a loader for en and am, undefined for om and constructor", () => {
    for (const layer of STRINGS_LAYERS) {
      expect(typeof compiledLayerLoader(layer, "en")).toBe("function");
      expect(typeof compiledLayerLoader(layer, "am")).toBe("function");
      expect(compiledLayerLoader(layer, "om")).toBeUndefined();
      expect(compiledLayerLoader(layer, "constructor")).toBeUndefined();
    }
  });

  it("CLL-2 the layers are admin then member; only their names are layers", () => {
    expect(STRINGS_LAYERS).toEqual(["admin", "member"]);
    expect(isStringsLayer("member")).toBe(true);
    expect(isStringsLayer("admin")).toBe(true);
    expect(isStringsLayer("base")).toBe(false);
    expect(isStringsLayer("")).toBe(false);
  });

  it("CLL-3 each layer's English and Amharic parts load, with the same keys", async () => {
    for (const layer of STRINGS_LAYERS) {
      const en = await compiledLayerLoader(layer, "en")?.();
      const am = await compiledLayerLoader(layer, "am")?.();
      expect(Object.keys(en ?? {}).length).toBeGreaterThan(0);
      expect(Object.keys(am ?? {}).sort()).toEqual(Object.keys(en ?? {}).sort());
    }
  });
});
