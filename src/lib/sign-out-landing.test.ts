import { afterEach, describe, expect, it, vi } from "vitest";

import { createHomeAhead, type HomeAheadState } from "./sign-out-landing";

afterEach(() => vi.restoreAllMocks());

describe("the page a sign-out lands on is fetched ahead of time (DEC-279, INC-930)", () => {
  it("HA-1 a signed-in visitor online fetches the Home page's code once, whatever the shell reads after", async () => {
    const load = vi.fn(() => Promise.resolve());
    const states: HomeAheadState[] = [];
    const ahead = createHomeAhead(load, (state) => states.push(state));
    ahead.consider(true, true);
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("ready"));
    ahead.consider(true, true);
    expect(load).toHaveBeenCalledTimes(1);
    expect(states).toEqual(["loading", "ready"]);
  });

  it("HA-2 a signed-out visitor, or one offline, fetches nothing until both hold", async () => {
    const load = vi.fn(() => Promise.resolve());
    const ahead = createHomeAhead(load);
    ahead.consider(false, true);
    ahead.consider(true, false);
    expect(load).not.toHaveBeenCalled();
    expect(ahead.state()).toBe("idle");
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("ready"));
    expect(load).toHaveBeenCalledTimes(1);
  });

  it("HA-3 a failed fetch is logged once, not retried, and says what failed", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const load = vi.fn(() =>
      Promise.reject(new Error("Failed to fetch dynamically imported module")),
    );
    const ahead = createHomeAhead(load);
    ahead.consider(true, true);
    await vi.waitFor(() => expect(ahead.state()).toBe("failed"));
    ahead.consider(true, true);
    expect(load).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toBe(
      "[home-ahead] the Home page's code did not download: Failed to fetch dynamically imported module",
    );
  });

  it("HA-4 a fetch that throws at once, or that has nothing to fetch, settles all the same", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const throwing = createHomeAhead(() => {
      throw new Error("no route");
    });
    throwing.consider(true, true);
    await vi.waitFor(() => expect(throwing.state()).toBe("failed"));
    const nothing = createHomeAhead(() => undefined);
    nothing.consider(true, true);
    await vi.waitFor(() => expect(nothing.state()).toBe("ready"));
  });
});
