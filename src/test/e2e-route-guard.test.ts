/**
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws. Turn 34c-4:
 * "gone" is read from the page itself — the same words on a page still open throw. INC-961
 * (Foundations turn C1): "gone" is the document — a page that reloaded or navigated while the
 * handler ran ends quietly too (ODE-1's Refresh and the app's one reload).
 */
import type { Route } from "@playwright/test";
import { describe, expect, it } from "vitest";

import { pageWentAway, whilePageLives } from "../../e2e/helpers/route-guard";

/**
 * A route whose request's page is closed or open; `navigate()` fires the page's main-frame
 * navigation (a reload), and `navigateOnWait` makes the page navigate while the guard waits for it.
 */
function pageAndRoute(closed: boolean, navigateOnWait = false) {
  let listener: ((frame: unknown) => void) | null = null;
  const main = { name: "main" };
  const page = {
    isClosed: () => closed,
    mainFrame: () => main,
    on: (_event: string, handler: (frame: unknown) => void) => {
      listener = handler;
    },
    waitForEvent: async () => {
      if (!navigateOnWait) throw new Error("Timeout 2000ms exceeded while waiting for event");
      listener?.(main);
    },
  };
  const route = { request: () => ({ frame: () => ({ page: () => page }) }) } as unknown as Route;
  return { route, navigate: () => listener?.(main), navigateChild: () => listener?.({}) };
}
function routeOn(closed: boolean): Route {
  return pageAndRoute(closed).route;
}

describe("a test's interception ends with its page (INC-934)", () => {
  it("RG-1 the two errors Playwright gives a handler whose page has gone are named, and no other", () => {
    expect(
      pageWentAway(
        new Error(
          "route.fetch: Target page, context or browser has been closed while running route callback.",
        ),
      ),
    ).toBe(true);
    expect(pageWentAway(new Error("apiResponse.text: Response has been disposed"))).toBe(true);
    expect(pageWentAway(new Error("route.fulfill: Route is already handled!"))).toBe(false);
    expect(pageWentAway(new Error("expect(received).toBe(expected)"))).toBe(false);
    expect(pageWentAway("Target page, context or browser has been closed")).toBe(true);
    // INC-937 — the words come through errorText: an error with no message is never "undefined".
    expect(pageWentAway(new Error(""))).toBe(false);
    expect(pageWentAway({ message: "Response has been disposed" })).toBe(true);
  });

  it("RG-2 a handler whose page has gone ends; any other failure throws; a handler that answers is untouched", async () => {
    const closed = routeOn(true);
    const calls: string[] = [];
    await expect(
      whilePageLives(async () => {
        calls.push("gone");
        throw new Error("apiResponse.text: Response has been disposed");
      })(closed),
    ).resolves.toBeUndefined();
    await expect(
      whilePageLives(async () => {
        throw new Error("the test's own failure");
      })(closed),
    ).rejects.toThrow("the test's own failure");
    await whilePageLives(async (given) => {
      calls.push(given === closed ? "answered" : "another route");
    })(closed);
    expect(calls).toEqual(["gone", "answered"]);
  });

  it("RG-3 the same words on a page that is still open are the test's own failure and throw", async () => {
    const open = routeOn(false);
    await expect(
      whilePageLives(async () => {
        throw new Error("apiResponse.text: Response has been disposed");
      })(open),
    ).rejects.toThrow("Response has been disposed");
  });

  it("RG-4 a page that reloaded while the handler ran (its document gone, the page still open) ends quietly (INC-961)", async () => {
    const reloaded = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        reloaded.navigate();
        throw new Error("apiResponse.text: Response has been disposed");
      })(reloaded.route),
    ).resolves.toBeUndefined();
    const late = pageAndRoute(false, true);
    await expect(
      whilePageLives(async () => {
        throw new Error("route.fetch: Target page, context or browser has been closed");
      })(late.route),
      "the navigation that explains the error may come a moment after it",
    ).resolves.toBeUndefined();
  });

  it("RG-5 a child frame's navigation is not the page's, and a reload never excuses the test's own failure", async () => {
    const child = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        child.navigateChild();
        throw new Error("apiResponse.text: Response has been disposed");
      })(child.route),
    ).rejects.toThrow("Response has been disposed");
    const reloaded = pageAndRoute(false);
    await expect(
      whilePageLives(async () => {
        reloaded.navigate();
        throw new Error("the test's own failure");
      })(reloaded.route),
    ).rejects.toThrow("the test's own failure");
  });
});
