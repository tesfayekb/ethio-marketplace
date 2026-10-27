import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { MapFrame } from "./map-frame";
import { STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
import { MapPreview } from "./map-preview";

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
// The map's library and tile plan never arrive: the component is read as it stands before them.
vi.mock("./leaflet", async (original) => ({
  ...(await original<typeof import("./leaflet")>()),
  loadLeaflet: () => new Promise(() => undefined),
  loadTilePlan: () => new Promise(() => undefined),
}));

const CASES = [
  { audience: "buyer", precision: "exact" },
  { audience: "buyer", precision: "approx" },
  { audience: "seller", precision: "exact" },
  { audience: "seller", precision: "approx" },
] as const;

/**
 * The still map's shape in the page's flow: its box's classes inside the wrapper the credit is
 * drawn on, the caption's words, and how many blocks it stacks.
 */
function shapeOf(root: Element) {
  const [wrapper, caption] = Array.from(root.children);
  const box = wrapper?.firstElementChild;
  return {
    wrapper: wrapper?.getAttribute("class"),
    box: box
      ?.getAttribute("class")
      ?.split(" ")
      .filter((name) => STILL_MAP_BOX.split(" ").includes(name)),
    caption: caption?.textContent ?? null,
    blocks: root.children.length,
  };
}

describe("the still map holds its box from the first paint (INC-940)", () => {
  it("MFR-1 the frame draws the still map's box and the caption its audience reads, and no credit in the flow", () => {
    for (const { audience, precision } of CASES) {
      const { unmount } = render(
        <MapFrame precision={precision} audience={audience}>
          word
        </MapFrame>,
      );
      const frame = screen.getByTestId("map-frame");
      const shape = shapeOf(frame);
      expect(shape.box).toEqual(STILL_MAP_BOX.split(" "));
      expect(shape.wrapper).toBe("relative");
      const key = stillMapCaptionKey(audience, precision === "approx");
      expect(shape.caption).toBe(key === null ? null : ownValue(en, key));
      expect(frame.firstElementChild).toHaveTextContent("word");
      expect(within(frame).queryByTestId("listing-map-credit")).toBeNull();
      unmount();
    }
    expect(stillMapCaptionKey("buyer", false)).toBeNull();
    // The credit is drawn on the box, out of the flow, whatever its length.
    expect(STILL_MAP_CREDIT.split(" ")).toEqual(expect.arrayContaining(["absolute", "bottom-px"]));
  });

  it("MFR-2 the map itself, before its library arrives, draws the same box and caption as its frame, its credit not yet drawn", () => {
    for (const { audience, precision } of CASES) {
      const framed = render(<MapFrame precision={precision} audience={audience} />);
      const want = shapeOf(screen.getByTestId("map-frame"));
      framed.unmount();
      const drawn = render(
        <MapPreview lat={9.0054} lng={38.7636} precision={precision} audience={audience} />,
      );
      const root = drawn.container.firstElementChild;
      if (root === null) throw new Error("MFR-2: the map drew nothing");
      const got = shapeOf(root);
      expect(got).toEqual(want);
      expect(screen.queryByTestId("listing-map-credit")).toBeNull();
      drawn.unmount();
    }
  });
});
