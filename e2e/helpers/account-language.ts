import { type Page } from "@playwright/test";

import { LANGUAGE_STORAGE_KEY } from "../../src/i18n/provider";

/**
 * Housekeeping turn 2 (INC-1049, ruling 1 Q5 and Q7) — THE LANGUAGE A TEST RUNS IN, one
 * module. The device half: `setDeviceAmharic` writes the device's current-language
 * record before the first paint, so no English frame is ever measured. A signed-in
 * page shows the ACCOUNT's published language at session start (D239), so a
 * signed-in test sets the account as well.
 */

/** Amharic on the device before the first paint (the page's next navigation reads it). */
export async function setDeviceAmharic(page: Page): Promise<void> {
  await page.addInitScript(
    ([storageKey, lang]) => {
      try {
        window.localStorage.setItem(storageKey, lang);
      } catch {
        /* private mode: the test's own assertion catches it */
      }
    },
    [LANGUAGE_STORAGE_KEY, "am"] as const,
  );
}
