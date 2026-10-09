import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { am } from "@/i18n/locales/am";
import { CutText } from "./cut-text";

const graphemes = (text: string) =>
  Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    ({ segment }) => segment,
  );

function parts(text: string) {
  const { container } = render(<CutText text={text} />);
  const outer = container.querySelector("[data-cut]");
  const visible = outer?.querySelector("[data-cut-text]");
  const floor = outer?.querySelector("[data-floor]");
  const full = outer?.querySelector("[data-full]");
  return { outer, visible, floor, full };
}

describe("CutText", () => {
  it("keeps a short name whole", () => {
    const { outer, floor } = parts("Car");
    expect(outer?.textContent).toBe("Car");
    expect(floor?.getAttribute("data-floor")).toBe("Car");
  });

  it("floors a long name at five characters and an ellipsis", () => {
    const { outer, floor } = parts("Cooked food");
    expect(outer?.textContent).toBe("Cooked food");
    expect(floor?.getAttribute("data-floor")).toBe("Cooke\u2026");
  });

  it("floors an Ethiopic name at five graphemes", () => {
    const name = am["location.rowLabel"];
    const { floor } = parts(name);
    const all = graphemes(name);
    expect(all.length).toBeGreaterThan(5);
    expect(floor?.getAttribute("data-floor")).toBe(`${all.slice(0, 5).join("")}\u2026`);
  });

  it("counts an emoji with a skin-tone modifier as one grapheme", () => {
    const { floor } = parts("👍🏽abcd tail");
    expect(floor?.getAttribute("data-floor")).toBe("👍🏽abcd\u2026");
  });

  it("hides both size-setters from screen readers", () => {
    const { floor, full } = parts("Cooked food");
    expect(floor?.getAttribute("aria-hidden")).toBe("true");
    expect(full?.getAttribute("aria-hidden")).toBe("true");
    expect(floor?.textContent).toBe("");
    expect(full?.textContent).toBe("");
  });

  it("shows the whole input in the visible element", () => {
    const { visible } = parts("Cooked food");
    expect(visible?.textContent).toBe("Cooked food");
  });
});
