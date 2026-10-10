/**
 * D20 / INC-530 — THE RETURN PATH'S RULE: same-origin relative paths only, a
 * query string kept as given, and every other form answered with "/".
 */
import { describe, expect, it } from "vitest";

import { safeReturnPath } from "./return-path";

const CATEGORY = "0b0c5f4e-6a1d-4c2b-9e8f-1a2b3c4d5e6f";
const PLACE = "1a2b3c4d-5e6f-4a1b-8c2d-3e4f5a6b7c8d";

describe("safeReturnPath", () => {
  it("RP-13 a same-origin path is kept as given, with its query string", () => {
    for (const path of [
      "/post",
      `/post?category=${CATEGORY}&place=${PLACE}`,
      "/account",
      "/post/123",
    ]) {
      expect(safeReturnPath(path)).toBe(path);
    }
  });

  it("RP-14 an empty, foreign or malformed value is /", () => {
    for (const value of [
      "",
      undefined,
      42,
      "post",
      "https://evil.example",
      "//evil.example",
      "/\\evil.example",
      "/x://y",
      "\\\\evil",
    ]) {
      expect(safeReturnPath(value)).toBe("/");
    }
  });

  it("RP-15 a path holding a control character is /", () => {
    for (const value of ["/\t/evil.example", "/\n/evil.example", "/post\u0000", "/post\u007f"]) {
      expect(safeReturnPath(value)).toBe("/");
    }
  });
});
