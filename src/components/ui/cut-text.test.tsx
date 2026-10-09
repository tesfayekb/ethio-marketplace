import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { am } from "@/i18n/locales/am";
import { CutText } from "./cut-text";

describe("CutText", () => {
  const ethiopic = Array.from(am["location.rowLabel"]).filter((char) => /[\u1200-\u137f]/u.test(char)).slice(0, 5).join("");
  it.each([
    ["Car", "Car", ""],
    ["Cooked food", "Cooke", "d food"],
    [`${ethiopic} extra`, ethiopic, " extra"],
    ["👍🏽abcd tail", "👍🏽abcd", " tail"],
  ])("keeps the first five graphemes of %s", (text, head, tail) => {
    const { container } = render(<CutText text={text} />);
    const outer = container.firstElementChild;
    expect(outer?.textContent).toBe(text);
    expect(outer?.children[0]?.textContent).toBe(head);
    expect(outer?.children.length).toBe(tail === "" ? 1 : 2);
    if (tail !== "") expect(outer?.children[1]?.textContent).toBe(tail);
  });
  it("uses Array.from when Segmenter is unavailable", () => {
    const original = Object.getOwnPropertyDescriptor(Intl, "Segmenter");
    Object.defineProperty(Intl, "Segmenter", { configurable: true, value: undefined });
    try {
      const { container } = render(<CutText text="Cooked food" />);
      expect(container.firstElementChild?.children[0]?.textContent).toBe("Cooke");
      expect(container.textContent).toBe("Cooked food");
    } finally {
      if (original) Object.defineProperty(Intl, "Segmenter", original);
    }
  });
  it("honours a caller's keep count", () => {
    const { container } = render(<CutText text="Cooked food" keep={3} />);
    expect(container.firstElementChild?.children[0]?.textContent).toBe("Coo");
    expect(container.textContent).toBe("Cooked food");
  });
});
