/**
 * INC-934 — a test's interception ends with its page (e2e/helpers/route-guard.ts): a route handler
 * whose page has gone ends quietly; every other error is the test's own and throws.
 */
import type { Route } from "@playwright/test";
import { describe, expect, it } from "vitest";

import { pageWentAway, whilePageLives } from "../../e2e/helpers/route-guard";

const route = {} as unknown as Route;

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
  });

  it("RG-2 a handler whose page has gone ends; any other failure throws; a handler that answers is untouched", async () => {
    const calls: string[] = [];
    await expect(
      whilePageLives(async () => {
        calls.push("gone");
        throw new Error("apiResponse.text: Response has been disposed");
      })(route),
    ).resolves.toBeUndefined();
    await expect(
      whilePageLives(async () => {
        throw new Error("the test's own failure");
      })(route),
    ).rejects.toThrow("the test's own failure");
    await whilePageLives(async (given) => {
      calls.push(given === route ? "answered" : "another route");
    })(route);
    expect(calls).toEqual(["gone", "answered"]);
  });
});
