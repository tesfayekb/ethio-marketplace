import { describe, expect, it } from "vitest";

import { creditOf, type TileLayerSpec, type TilePlan } from "./leaflet";

function plan(...attributions: string[]): TilePlan {
  const layers: TileLayerSpec[] = attributions.map((attribution, index) => ({
    url: `https://tiles.example/${index}/{z}/{x}/{y}.png`,
    attribution,
    tileSize: 256,
    zoomOffset: 0,
    maxZoom: 19,
  }));
  return { provider: "esri", street: layers, satellite: layers };
}

describe("creditOf (Part H2) — the credit is text, never markup", () => {
  it("a link tag and the three entities read as plain words", () => {
    expect(
      creditOf(plan('<a href="https://x.example">Esri</a> &copy; A&amp;B&nbsp;Maps'), "street"),
    ).toBe("Esri \u00a9 A&B Maps");
  });
  it("a tag written inside another tag leaves no tag behind", () => {
    const text = creditOf(plan("<scr<script>ipt>Maps</script> credit"), "street");
    // The parser takes "<scr<script>" as one tag; what is left is plain text.
    expect(text).not.toContain("<");
    expect(text).toBe("ipt>Maps credit");
  });
  it("two layers with the same credit print it once", () => {
    expect(creditOf(plan("<b>Esri</b>", "Esri"), "street")).toBe("Esri");
  });
});
