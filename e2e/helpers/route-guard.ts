import type { Route } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
 * or reads the real answer can still be running when its page goes away (the app's one reload for
 * a failed chunk, a navigation, the test's end); Playwright then throws from `route.fetch()`,
 * `response.text()` or `route.fulfill()`. That page has no one left to answer, so the request ends
 * there. Any other error is the test's own and throws.
 *
 * Turn 34c-4 (turn 34d's reviewer) — the request ends quietly only when its page is in fact closed:
 * "Response has been disposed" on a page that is still open is the test's own failure and throws.
 * The error's words are read through `errorText` (src/lib/error-text.ts, INC-937's rule).
 */

/** The two errors Playwright gives a handler whose page has gone. */
export function pageWentAway(error: unknown): boolean {
  return /Target page, context or browser has been closed|Response has been disposed/.test(
    errorText(error),
  );
}

/** Whether the page that made the route's request is closed. */
export function routePageClosed(route: Route): boolean {
  return route.request().frame().page().isClosed();
}

/**
 * A route handler that ends when its page has gone (INC-934): one of the two errors, on a page that
 * is closed. Every other error throws.
 */
export function whilePageLives(
  handler: (route: Route) => Promise<void>,
): (route: Route) => Promise<void> {
  return async (route) => {
    try {
      await handler(route);
    } catch (error) {
      if (pageWentAway(error) && routePageClosed(route)) return;
      throw error;
    }
  };
}
