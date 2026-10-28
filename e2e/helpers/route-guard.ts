import type { Page, Route } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
 * or reads the real answer can still be running when its page goes away (the app's one reload for
 * a failed chunk, a navigation, the test's end); Playwright then throws from `route.fetch()`,
 * `response.text()` or `route.fulfill()`. That page has no one left to answer, so the request ends
 * there. Any other error is the test's own and throws.
 *
 * Turn 34c-4 (turn 34d's reviewer) — "gone" is read from the page, not from the error's words:
 * "Response has been disposed" on a page whose document is still the one that asked is the test's
 * own failure and throws. INC-961 (Foundations turn C1) — and "gone" is the DOCUMENT, not only the
 * Page object: a reload or a navigation (the app's one reload for a failed chunk, a test's own
 * Refresh — ODE-1, run 40615073357) disposes the old document's responses while the Page stays
 * open, and turn 34c-4's rule threw there. So a request ends quietly when one of the two errors
 * comes AND its page has closed or its main frame has navigated since the handler began — waiting
 * up to GONE_WAIT_MS for that navigation, because Playwright can report the disposed response a
 * moment before the navigation event. The error's words are read through `errorText`
 * (src/lib/error-text.ts, INC-937's rule).
 */

/** How long a "gone" error waits for the navigation that explains it. */
export const GONE_WAIT_MS = 2_000;

/** The two errors Playwright gives a handler whose page has gone. */
export function pageWentAway(error: unknown): boolean {
  return /Target page, context or browser has been closed|Response has been disposed/.test(
    errorText(error),
  );
}

/** Each page's main-frame navigations, counted from the first handler that watches it. */
const navigations = new WeakMap<Page, { count: number }>();

/** The page's navigation counter (one listener per page, attached on first use). */
function navigationsOf(page: Page): { count: number } {
  const known = navigations.get(page);
  if (known !== undefined) return known;
  const counter = { count: 0 };
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) counter.count += 1;
  });
  navigations.set(page, counter);
  return counter;
}

/**
 * Whether the document that made the route's request is gone: its page has closed, or its main
 * frame has navigated since `since` — now, or within GONE_WAIT_MS.
 */
export async function routeDocumentGone(
  page: Page,
  since: number,
  waitMs: number = GONE_WAIT_MS,
): Promise<boolean> {
  const counter = navigationsOf(page);
  if (page.isClosed() || counter.count !== since) return true;
  await page.waitForEvent("framenavigated", { timeout: waitMs }).then(
    () => undefined,
    () => undefined,
  );
  return page.isClosed() || counter.count !== since;
}

/**
 * A route handler that ends when its page's document has gone (INC-934, INC-961): one of the two
 * errors, on a page that has closed or navigated since the handler began. Every other error throws.
 */
export function whilePageLives(
  handler: (route: Route) => Promise<void>,
): (route: Route) => Promise<void> {
  return async (route) => {
    const page = route.request().frame().page();
    const since = navigationsOf(page).count;
    try {
      await handler(route);
    } catch (error) {
      if (pageWentAway(error) && (await routeDocumentGone(page, since))) return;
      throw error;
    }
  };
}
