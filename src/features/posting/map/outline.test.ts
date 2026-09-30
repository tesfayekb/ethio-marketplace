import { describe, expect, it } from "vitest";

import { scaleAmount } from "../step-pricing";
import { sanitizeDetails } from "./location-details";
import { insideOutline } from "./outline";

describe("W6b-2 pure helpers", () => {
  it("A2 — scales by a decimal shift, never a float product", () => {
    expect(scaleAmount("5.25", 6)).toBe(5_250_000);
    expect(scaleAmount("1.5", 3)).toBe(1500);
    expect(scaleAmount("0.1234", 3)).toBe(123.4);
    expect(scaleAmount("25000", 0)).toBe(25000);
    expect(scaleAmount("", 3)).toBeNull();
    expect(scaleAmount("1.2.3", 3)).toBeNull();
  });

  it("C4 — a point is inside or outside a polygon, holes honoured", () => {
    const square = {
      type: "Polygon",
      coordinates: [
        [
          [38, 9],
          [39, 9],
          [39, 10],
          [38, 10],
          [38, 9],
        ],
        [
          [38.4, 9.4],
          [38.6, 9.4],
          [38.6, 9.6],
          [38.4, 9.6],
          [38.4, 9.4],
        ],
      ],
    };
    expect(insideOutline(square, 9.2, 38.2)).toBe(true);
    expect(insideOutline(square, 9.5, 38.5)).toBe(false);
    expect(insideOutline(square, 11, 38.5)).toBe(false);
    expect(insideOutline(null, 11, 38.5)).toBe(true);
  });

  it("B3 — the location details are sanitised like the door does", () => {
    expect(sanitizeDetails("  a<b>\n\t  c  ")).toBe("a b c");
    expect(sanitizeDetails("3rd floor, Suite 5")).toBe("3rd floor, Suite 5");
  });
});
