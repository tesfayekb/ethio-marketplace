import { describe, expect, it } from "vitest";

import { functionRefusalCode } from "./function-refusal";

/**
 * F1-7d (INC-1224) — `feed_page` and `seller_feed_page` raise `<function>: <code>`; the code is
 * read through the one reader twice, never by a text match.
 */
describe("a function's refusal code", () => {
  it("FNR-1 the code is the inner key of the tail of that function's refusal, and nothing else", () => {
    expect(functionRefusalCode("feed_page: unknownCategory", "feed_page")).toBe("unknownCategory");
    expect(functionRefusalCode(" seller_feed_page:badCursor ", "seller_feed_page")).toBe(
      "badCursor",
    );
    expect(functionRefusalCode("feed_page: badSize: 51", "feed_page")).toBe("badSize");
    // Another function's refusal, a sentence that only names one, a bare name: no code.
    expect(functionRefusalCode("seller_feed_page: badCursor", "feed_page")).toBeNull();
    expect(functionRefusalCode("error in feed_page: unknownCategory", "feed_page")).toBeNull();
    expect(functionRefusalCode("feed_page", "feed_page")).toBeNull();
    expect(functionRefusalCode("feed_page: ", "feed_page")).toBeNull();
  });
});
