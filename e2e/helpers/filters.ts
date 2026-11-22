import { type Page } from "@playwright/test";

import { expect } from "../fixtures";

/**
 * cursor-bundle-2 item 4 (INC-1237) — THE ONE STEP THAT CHOOSES A FILTER VALUE.
 *
 * A table's filters live in the Filters panel (`src/components/shell/filter-chips.tsx`
 * `FiltersButton`: the button is `<panel>`, its panel `<panel>-panel`) and each filter is a group
 * of choices (`filter-choices.tsx` `FilterChoices`: the group carries `<filter>`, each choice
 * `<filter>-<value>`, `""` being `<filter>-all`). A filter with one choice and no value (a
 * toggle such as `category-missing-filter`) is the choice itself: pass no `value`.
 *
 * The step, in order:
 * 1. when `<panel>-panel` is not open, press `<panel>` and wait for it (a test that opened the
 *    panel to look at it first may leave it open: the step then does not press the button);
 * 2. when the choice is not in view inside the panel, press the filter's own control
 *    (`<filter>`, inside the panel) first — today's pills are always in view, so this is the way
 *    a collapsed filter will pass through unchanged;
 * 3. press the choice, then press Escape while `<panel>-panel` is visible, at most twice, and
 *    expect the panel gone. Named cause: a row that opens a list inside the panel closes that
 *    list first on Escape (WAI-ARIA, the innermost layer first); with today's pills the first
 *    press closes the panel and a second press is never made.
 *
 * Every spec that chooses a filter value calls this one function; a spec's own copy fails
 * CF-HELPERS-1 (`scripts/conformance/e2e-helpers.test.ts`).
 */
export async function chooseFilter(
  page: Page,
  panel: string,
  filter: string,
  value?: string,
): Promise<void> {
  const open = page.getByTestId(`${panel}-panel`);
  if (!(await open.isVisible())) {
    await page.getByTestId(panel).click();
    await expect(open, `chooseFilter: ${panel} did not open its panel`).toBeVisible();
  }
  const choiceId = value === undefined ? filter : `${filter}-${value === "" ? "all" : value}`;
  const choice = open.getByTestId(choiceId);
  if (value !== undefined && !(await choice.isVisible())) {
    await open.getByTestId(filter).click();
  }
  await choice.click();
  for (let press = 0; press < 2 && (await open.isVisible()); press += 1) {
    await page.keyboard.press("Escape");
  }
  await expect(open, `chooseFilter: ${panel} did not close its panel`).toHaveCount(0);
}
