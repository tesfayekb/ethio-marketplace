import { describe, expect, it } from "vitest";

import { countedLabel } from "./counted-label";

describe("countedLabel (INC-1144)", () => {
  it("CNT-U3 an answered read draws its count; a read that loads or failed draws the name alone", () => {
    expect(countedLabel("Approved", 3, true)).toBe("Approved · 3");
    expect(countedLabel("Approved", undefined, true)).toBe("Approved · 0");
    expect(countedLabel("Approved", 3, false)).toBe("Approved");
    expect(countedLabel("Approved", undefined, false)).toBe("Approved");
  });
});
