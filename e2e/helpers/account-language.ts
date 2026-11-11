import { expect, type Page } from "@playwright/test";

import { LANGUAGE_STORAGE_KEY } from "../../src/i18n/provider";
import { switchLanguage, waitForHydration, watchAccountLanguage } from "./ui";
import { adminClient } from "./users";

/**
 * Housekeeping turn 2 (INC-1049, INC-1100; ruling 1 Q5 and Q7) — THE LANGUAGE A TEST RUNS
 * IN, one module, and the one spec-side writer of `profiles.preferred_language`
 * (CF-HELPERS-3). A signed-in page shows the ACCOUNT's published language at session
 * start (D239: published = `enabled_public OR is_base`), and a NULL account saves the
 * device's language through the door as the session starts.
 * - `setDeviceAmharic(page)` — the device half, before the first paint.
 * - `setAccountLanguage(page, userId, code)` — a signed-in page's account, set as the
 *   product sets it and proved on a reload.
 * - `seedAccountLanguage(userId, code)` — the J5 fixture write BEFORE a session, any code
 *   (NULL, unpublished), for a test whose subject is the D239 rule itself.
 * - `restoreAccountLanguages()` — every account the two above touched goes back to the
 *   pool's baseline, NULL (the lease writes NULL too; D324 (c)). Call it in afterEach.
 */

const touched = new Set<string>();
const SETTLE_MS = 15_000;

async function storedLanguage(userId: string): Promise<string | null> {
  const { data, error } = await adminClient()
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`[e2e:lang] reading the account language failed: ${error.message}`);
  if (!data) throw new Error(`[e2e:lang] no profile row for ${userId}`);
  const value: unknown = data.preferred_language;
  return typeof value === "string" ? value : null;
}

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

/** A signed-in reload whose own account read (D239) has answered and been applied. */
async function reloadSettled(page: Page): Promise<void> {
  const account = watchAccountLanguage(page);
  await page.reload();
  await waitForHydration(page);
  await account;
}

/**
 * The signed-in `page`'s account takes `code` (a public language) the way a person sets
 * it. Nothing races the pick (INC-1100): the session-start save has landed (the column is
 * non-NULL) and the page's own account read has answered (a reload with it awaited) — a
 * pick that read answers after is replaced. Then the switcher picks `code`, which saves
 * the account through `user_set_preferred_language`; the column reads `code`; and a
 * settled reload shows `code` in `<html lang>` and on the language control.
 */
export async function setAccountLanguage(page: Page, userId: string, code: string): Promise<void> {
  touched.add(userId);
  await expect
    .poll(() => storedLanguage(userId), {
      timeout: SETTLE_MS,
      message: `[e2e:lang] the session-start save of the account language never landed (D239)`,
    })
    .not.toBeNull();
  await reloadSettled(page);
  await switchLanguage(page, code);
  await expect
    .poll(() => storedLanguage(userId), {
      timeout: SETTLE_MS,
      message: `[e2e:lang] the account language never reached ${code}`,
    })
    .toBe(code);
  await reloadSettled(page);
  await expect(page.locator("html")).toHaveAttribute("lang", code);
  await expect
    .poll(
      async () => [
        ...new Set(
          await page
            .locator('[data-testid="language-switcher"] [lang]')
            .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("lang"))),
        ),
      ],
      { message: `[e2e:lang] the language control does not show ${code}` },
    )
    .toEqual([code]);
}

/** J5 — the account's stored language before a session starts (any code, NULL included). */
export async function seedAccountLanguage(userId: string, code: string | null): Promise<void> {
  touched.add(userId);
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: code })
    .eq("user_id", userId);
  if (error) throw new Error(`[e2e:lang] seeding the account language failed: ${error.message}`);
}

/** Every account this worker's tests touched back to the pool's baseline, NULL. */
export async function restoreAccountLanguages(): Promise<void> {
  const ids = [...touched];
  touched.clear();
  if (ids.length === 0) return;
  const { error } = await adminClient()
    .from("profiles")
    .update({ preferred_language: null })
    .in("user_id", ids);
  if (error) throw new Error(`[e2e:lang] restoring the account language failed: ${error.message}`);
}
