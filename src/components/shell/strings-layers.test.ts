import { describe, expect, it } from "vitest";

import { declaredLayers } from "./strings-layers";

/** DEC-258 — the layers matched routes declare, in STRINGS_LAYERS order, each once. */
describe("declaredLayers (DEC-258)", () => {
  it("SLD-1 no declaration declares nothing", () => {
    expect(declaredLayers([{}, {}])).toEqual([]);
    expect(declaredLayers([])).toEqual([]);
  });

  it("SLD-2 a layout's and a page's declarations join, in the layers' order, each once", () => {
    expect(declaredLayers([{}, { strings: ["member", "admin"] }, { strings: ["member"] }])).toEqual(
      ["admin", "member"],
    );
  });

  it("SLD-3 a page alone declares its own layer", () => {
    expect(declaredLayers([{}, { strings: ["member"] }])).toEqual(["member"]);
  });
});
