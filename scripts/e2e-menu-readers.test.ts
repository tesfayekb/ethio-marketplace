import { describe, expect, it } from "vitest";

import { check, HELPER, readE2e, readersIn } from "./e2e-menu-readers";

/**
 * Bundle 11 turn C3 — INC-170's class: the public category menu's rows are read
 * through one helper. Proven on planted files, then run on the tree.
 */
const F = "e2e/planted.spec.ts";

describe("the menu readers' check", () => {
  it("CMR-1 a hand-built row selector, slug pattern or replace is refused; an exact testid is not", () => {
    expect(readersIn(F, `menu.locator('[data-testid^="rail-category-"]').first()`)).toEqual([
      `${F}:1 a prefix selector on rail-category-`,
    ]);
    expect(readersIn(F, `scope.locator("[data-testid^='rail-category-']")`)).toEqual([
      `${F}:1 a prefix selector on rail-category-`,
    ]);
    expect(readersIn(F, `const slug = testid.replace(/^rail-category-/, "");`)).toEqual([
      `${F}:1 a pattern that strips rail-category-`,
    ]);
    expect(readersIn(F, `const slug = testid.replace("rail-category-", "");`)).toEqual([
      `${F}:1 a replace of rail-category-`,
    ]);
    expect(readersIn(F, "scope.getByTestId(`rail-category-${slug}`)")).toEqual([]);
    expect(readersIn(F, `menu.getByTestId("rail-category-all")`)).toEqual([]);
    // A comment that names a selector is not one.
    expect(
      readersIn(F, `/** read like :not([data-testid^="rail-category-e2e-"]) */\nx();`),
    ).toEqual([]);
    expect(readersIn(F, `x(); // [data-testid^="rail-category-"]`)).toEqual([]);
  });

  it("CMR-2 the helper itself may build the selectors", () => {
    expect(readersIn(HELPER, `export const ANY = '[data-testid^="rail-category-"]';`)).toEqual([]);
  });

  it("CMR-3 no e2e file reads the menu's rows by hand", () => {
    const sources = readE2e();
    expect(sources.some((source) => source.file === HELPER)).toBe(true);
    expect(check(sources)).toEqual([]);
  });
});
