import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCategoryGlyphs } from "./use-category-glyphs";

/**
 * D234 speed turn S1 — the category glyph map arrives after the first paint; the
 * rail keeps its skeleton until it has settled (app-rail.tsx).
 */
function Probe({ name }: { name: string }) {
  const { glyphOf, settled } = useCategoryGlyphs();
  return (
    <div
      data-testid={`probe-${name}`}
      data-settled={String(settled)}
      data-glyph={String(glyphOf(name) !== null)}
    />
  );
}

describe("useCategoryGlyphs (D234)", () => {
  it("GLY-1 a first reader starts unsettled with no glyph, then settles with the map", async () => {
    render(<Probe name="Car" />);
    const probe = screen.getByTestId("probe-Car");
    expect(probe.getAttribute("data-settled")).toBe("false");
    expect(probe.getAttribute("data-glyph")).toBe("false");
    await waitFor(() => expect(probe.getAttribute("data-settled")).toBe("true"));
    expect(probe.getAttribute("data-glyph")).toBe("true");
  });

  it("GLY-2 a later reader reads the map at once; an unknown name draws no glyph", () => {
    render(<Probe name="NoSuchIcon" />);
    const probe = screen.getByTestId("probe-NoSuchIcon");
    expect(probe.getAttribute("data-settled")).toBe("true");
    expect(probe.getAttribute("data-glyph")).toBe("false");
  });
});
