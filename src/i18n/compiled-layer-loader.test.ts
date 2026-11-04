import { describe, expect, it } from "vitest";

import {
  STRINGS_LAYERS,
  compiledLayerLoader,
  isStringsLayer,
  shippedCatalogues,
} from "./compiled-catalog";
import { am } from "./locales/am";
import { en } from "./locales/en";

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

  it("CLL-2 the layers are admin, member then guide (D313); only their names are layers", () => {
    expect(STRINGS_LAYERS).toEqual(["admin", "member", "guide"]);
    expect(isStringsLayer("member")).toBe(true);
    expect(isStringsLayer("admin")).toBe(true);
    expect(isStringsLayer("guide")).toBe(true);
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

  // P-1c turn (d) (roadmap line 7's debt) — the whole shipped catalogues on demand, once.
  it("CLL-4 shippedCatalogues answers both joins, whole, and the same object on a second ask (loadOnce)", async () => {
    const first = await shippedCatalogues();
    expect(Object.keys(first.en).length).toBe(Object.keys(en).length);
    expect(Object.keys(first.am).length).toBe(Object.keys(am).length);
    expect(first.en).toEqual(en);
    expect(first.am).toEqual(am);
    const second = await shippedCatalogues();
    expect(second).toBe(first);
  });
});
