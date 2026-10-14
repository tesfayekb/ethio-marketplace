import { afterEach, describe, expect, it, vi } from "vitest";

import { replaceAddressQuietly } from "./quiet-address";

/**
 * INC-610 — the router replaces `window.history.replaceState` with a function
 * that treats every call as a navigation. The draft's address must change
 * without it.
 */
describe("replaceAddressQuietly (INC-610)", () => {
  afterEach(() => {
    // The spy below is an own property, as the router's is; removing it restores the browser's method.
    delete (window.history as unknown as Record<string, unknown>)["replaceState"];
    History.prototype.replaceState.call(window.history, null, "", "/");
  });

  it("QA-1 changes the address and keeps the entry's state, without calling the router's replaceState", () => {
    History.prototype.replaceState.call(window.history, { __TSR_key: "k1" }, "", "/post");
    const router = vi.fn();
    Object.defineProperty(window.history, "replaceState", {
      value: router,
      configurable: true,
      writable: true,
    });

    replaceAddressQuietly("/post/0d6c1f3e-5b8a-4c39-9b55-2f3f0b8e7a10");

    expect(window.location.pathname).toBe("/post/0d6c1f3e-5b8a-4c39-9b55-2f3f0b8e7a10");
    expect(window.history.state).toEqual({ __TSR_key: "k1" });
    expect(router).not.toHaveBeenCalled();
  });
});
