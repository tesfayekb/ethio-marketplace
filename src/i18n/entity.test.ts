import { describe, expect, it } from "vitest";
import { catalogText } from "./entity";

describe("catalogText (INC-819)", () => {
  it("missing English keeps the Amharic reader's label", () => {
    expect(catalogText(null, "ኪሎ", "am")).toBe("ኪሎ");
    expect(catalogText(undefined, "ኪሎ", "am")).toBe("ኪሎ");
  });
  it("missing English gives an English reader no label", () => {
    expect(catalogText(null, "ኪሎ", "en")).toBe("");
    expect(catalogText("  ", "ኪሎ", "en")).toBe("");
  });
});