import { afterEach, describe, expect, it } from "vitest";

import {
  DEACTIVATED_MARK,
  isDeactivatedRefusal,
  markDeactivatedSignOut,
  takeDeactivatedSignOut,
} from "./deactivated";

/** Bundle 16 turn S3 (D189) — the one-shot hand-off from the sign-out to the sign-in page's reason. */
describe("deactivated sign-out mark", () => {
  afterEach(() => {
    window.sessionStorage.removeItem(DEACTIVATED_MARK);
  });

  it("DA-1 nothing marked: nothing taken", () => {
    expect(takeDeactivatedSignOut()).toBe(false);
  });

  it("DA-2 a mark is taken once, then gone", () => {
    markDeactivatedSignOut();
    expect(window.sessionStorage.getItem(DEACTIVATED_MARK)).toBe("1");
    expect(takeDeactivatedSignOut()).toBe(true);
    expect(window.sessionStorage.getItem(DEACTIVATED_MARK)).toBeNull();
    expect(takeDeactivatedSignOut()).toBe(false);
  });

  it("DA-3 the doors' sentence is recognised; anything else is not", () => {
    expect(isDeactivatedRefusal("account is deactivated")).toBe(true);
    expect(isDeactivatedRefusal("P0001: account is deactivated")).toBe(true);
    expect(isDeactivatedRefusal("not authenticated")).toBe(false);
    expect(isDeactivatedRefusal(null)).toBe(false);
    expect(isDeactivatedRefusal(undefined)).toBe(false);
  });
});
