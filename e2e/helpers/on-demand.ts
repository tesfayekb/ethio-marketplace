import type { Page } from "@playwright/test";

import { expect } from "../fixtures";
import { STALE_CHUNK_KEY } from "../../src/lib/stale-chunk";
import { whilePageLives } from "./route-guard";
import { waitForHydration } from "./ui";

/**
 * INC-911, INC-915 (Foundations turns 34, 34b-2) — A DOWNLOAD THAT FAILS, AS ON A PHONE. The app
 * fetches some of its code only when it is needed; these helpers refuse such a script and open a
 * page past the app's one reload for a failed chunk (src/lib/stale-chunk.ts, INC-640), so a test
 * sees what a visitor whose download keeps failing sees.
 */

/**
 * Every script `refuse` names (by its address and its text) is refused, as a dropped download.
 * INC-934 — the refused chunk makes the app reload once, so a script fetched for the page being
 * left can still be in this handler when that page goes: it ends there (whilePageLives).
 */
export async function refuseScripts(
  page: Page,
  refuse: (url: string, text: string) => boolean,
): Promise<void> {
  await page.route(
    "**/*.js",
    whilePageLives(async (route) => {
      const response = await route.fetch();
      if (refuse(route.request().url(), await response.text())) await route.abort("failed");
      else await route.fulfill({ response });
    }),
  );
}

/**
 * Opens `path` with a download refused and waits for the app's one reload for a failed chunk and
 * for the page it lands on to be ready, so a test acts on the page that stays. Returns the page's
 * load count, which a test checks stays at two (or rises when it refreshes on purpose).
 */
export async function openAfterTheOneReload(page: Page, path: string): Promise<() => number> {
  let loads = 0;
  page.on("load", () => {
    loads += 1;
  });
  // Not gotoReady: the reload can land while it waits, and a destroyed page is not this test's subject.
  await page.goto(path);
  await expect
    .poll(() => loads, { message: "the app reloaded once for the failed chunk (INC-640)" })
    .toBe(2);
  await waitForHydration(page);
  expect(
    await page.evaluate((key) => window.sessionStorage.getItem(key), STALE_CHUNK_KEY),
    "the reload was the stale-chunk rule's",
  ).not.toBeNull();
  return () => loads;
}
