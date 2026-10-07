import { describe, expect, it } from "vitest";

import { RAIL_INIT_SCRIPT, RAIL_STORAGE_KEY } from "./rail-state";
import { THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from "./theme-provider";

/** Part H3 — the key is written text in the script; it may never drift from the constant. */
function occurrences(text: string, needle: string): number {
  return text.split(needle).length - 1;
}

describe("pre-paint scripts carry their storage key as written text", () => {
  it("the theme script holds exactly the JSON form of THEME_STORAGE_KEY", () => {
    expect(occurrences(THEME_INIT_SCRIPT, `var k=${JSON.stringify(THEME_STORAGE_KEY)};`)).toBe(1);
  });
  it("the rail script holds exactly the JSON form of RAIL_STORAGE_KEY", () => {
    expect(occurrences(RAIL_INIT_SCRIPT, `var k=${JSON.stringify(RAIL_STORAGE_KEY)};`)).toBe(1);
  });
});
