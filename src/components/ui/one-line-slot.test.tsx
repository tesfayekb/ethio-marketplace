import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { OneLineSlot, splitAtSlot } from "./one-line-slot";

describe("OneLineSlot (§5, turn B2)", () => {
  it("OLS-U1: splits a sentence at its one slot", () => {
    expect(splitAtSlot("Listings in {location}", "{location}")).toEqual(["Listings in ", ""]);
    expect(splitAtSlot("የ{location} ማስታወቂያዎች", "{location}")).toEqual(["የ", " ማስታወቂያዎች"]);
    expect(splitAtSlot("All listings", "{location}")).toBeNull();
  });

  it("OLS-U2: the fixed words are their own unshrinking parts; the place cuts through CutText", () => {
    const { container } = render(
      <OneLineSlot sentence="የ{location} ማስታወቂያዎች" slot="{location}" text="Addis Ababa" />,
    );
    const fixed = container.querySelectorAll("[data-one-line-fixed]");
    expect(Array.from(fixed, (n) => n.textContent)).toEqual(["የ", " ማስታወቂያዎች"]);
    fixed.forEach((n) => expect(n.className).toContain("shrink-0"));
    expect(container.querySelector("[data-one-line-slot] [data-cut]")).not.toBeNull();
    expect(container.textContent).toBe("የAddis Ababa ማስታወቂያዎች");
  });
});
