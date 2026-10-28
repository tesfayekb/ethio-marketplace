/**
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws. Turn 34c-4:
 * "gone" is read from the page itself — the same words on a page still open throw.
 */
import type { Route } from "@playwright/test";
import { describe, expect, it } from "vitest";

import { pageWentAway, routePageClosed, whilePageLives } from "../../e2e/helpers/route-guard";

/** A route whose request's page is closed, or not. */
function routeOn(closed: boolean): Route {
  return {
    request: () => ({ frame: () => ({ page: () => ({ isClosed: () => closed }) }) }),
  } as unknown as Route;
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
    expect(routePageClosed(open)).toBe(false);
    expect(routePageClosed(routeOn(true))).toBe(true);
    await expect(
      whilePageLives(async () => {
        throw new Error("apiResponse.text: Response has been disposed");
      })(open),
    ).rejects.toThrow("Response has been disposed");
  });
});
