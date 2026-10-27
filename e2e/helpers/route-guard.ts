import type { Route } from "@playwright/test";

/**
 * INC-934 (Foundations turn 34d) — A REQUEST THAT OUTLIVES ITS PAGE. A route handler that fetches
 * or reads the real answer can still be running when its page goes away (the app's one reload for
 * a failed chunk, a navigation, the test's end); Playwright then throws from `route.fetch()`,
 * `response.text()` or `route.fulfill()`. That page has no one left to answer, so the request ends
 * there. Any other error is the test's own and throws.
 */

/** The two errors Playwright gives a handler whose page has gone. */
export function pageWentAway(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Target page, context or browser has been closed|Response has been disposed/.test(message);
}

/** A route handler that ends when its page has gone (INC-934); every other error throws. */
export function whilePageLives(
  handler: (route: Route) => Promise<void>,
): (route: Route) => Promise<void> {
  return async (route) => {
    try {
      await handler(route);
    } catch (error) {
      if (pageWentAway(error)) return;
      throw error;
    }
  };
}
