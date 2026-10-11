import type { Locator } from "@playwright/test";

import { expect } from "../fixtures";

/**
 * Bundle 11 B3 (INC-542) — the row's action buttons sit inside their own
 * region: in the table twin, the actions cell; in the card twin, the card's
 * actions row. None spills over the column before it (the cell's box is read,
 * never a width constant).
 */
export async function expectActionsInsideCell(region: Locator): Promise<void> {
  const reading = await region.evaluate((node) => {
    const box = node.getBoundingClientRect();
    return {
      left: Math.round(box.left),
      right: Math.round(box.right),
      buttons: Array.from(node.querySelectorAll("button")).map((button) => {
        const rect = button.getBoundingClientRect();
        return { left: Math.round(rect.left), right: Math.round(rect.right) };
      }),
    };
  });
  expect(reading.buttons.length, "INC-542: the row has no action button").toBeGreaterThan(0);
  for (const button of reading.buttons) {
    expect(
      button.left,
      `INC-542: an action starts before its cell: ${JSON.stringify(reading)}`,
    ).toBeGreaterThanOrEqual(reading.left - 1);
    expect(
      button.right,
      `INC-542: an action ends after its cell: ${JSON.stringify(reading)}`,
    ).toBeLessThanOrEqual(reading.right + 1);
  }
}
