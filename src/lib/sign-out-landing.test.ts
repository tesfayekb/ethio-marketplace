import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createHomeAhead, type HomeAheadState } from "./sign-out-landing";

// The shell's notice is raised through reportOnDemandFailure: SAH-2 watches it for the whole file.
const raised = vi.hoisted(() => ({ report: vi.fn() }));
vi.mock("./on-demand-failure", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./on-demand-failure")>()),
  reportOnDemandFailure: raised.report,
}));

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

/**
 * INC-960 (Foundations turn C2, ruling 3) — the phone's account menu, the only Sign out on a phone,
 * draws from the overlays module that warmOverlaysWhenIdle (src/components/ui/overlay-loader.ts)
 * fetches at idle for every visitor; the E2E build hears its arrival as `__ethioMenuAhead` (SO-13).
 * Each test reads a fresh loader (its warm-up is once per page life) with the idle callback held
 * and the overlay primitives' module mocked to arrive or to fail. The tests set the build
 * themselves: DEV off, so the E2E flag alone decides (as in `bun run build:e2e`).
 */
describe("the account menu's code is warmed ahead and its arrival reported (INC-960)", () => {
  let idle: Array<() => void> = [];
  let fetched = false;
  const shown = () => window.__ethioMenuAhead;
  const warm = async (arrives: boolean) => {
    vi.resetModules();
    vi.doMock("@/components/ui/overlays-impl", () => {
      fetched = true;
      if (!arrives) throw new Error("Failed to fetch dynamically imported module");
      return {};
    });
    const { warmOverlaysWhenIdle } = await import("@/components/ui/overlay-loader");
    warmOverlaysWhenIdle();
    return idle;
  };

  beforeEach(() => {
    idle = [];
    fetched = false;
    raised.report.mockClear();
    delete window.__ethioMenuAhead;
    vi.stubEnv("DEV", false);
    vi.stubEnv("VITE_E2E", "1");
    vi.stubGlobal("requestIdleCallback", (ask: () => void) => {
      idle.push(ask);
      return idle.length;
    });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.doUnmock("@/components/ui/overlays-impl");
  });

  it("SAH-1 the warm-up asks at idle and reports loading, then ready, to the E2E build", async () => {
    const pending = await warm(true);
    expect(shown(), "nothing is asked before idle").toBeUndefined();
    expect(pending).toHaveLength(1);
    pending.splice(0).forEach((ask) => ask());
    expect(shown()).toBe("loading");
    await vi.waitFor(() => expect(shown()).toBe("ready"));
  });

  it("SAH-2 a failed warm-up reports failed, logs once and raises no notice", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const pending = await warm(false);
    pending.splice(0).forEach((ask) => ask());
    await vi.waitFor(() => expect(shown()).toBe("failed"));
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toMatch(
      /^\[overlays\] loading the overlay primitives failed: /,
    );
    expect(raised.report, "the person asked for nothing: no notice").not.toHaveBeenCalled();
  });

  it("SAH-3 a production build fetches the same way and writes no E2E name", async () => {
    vi.stubEnv("VITE_E2E", "");
    const pending = await warm(true);
    pending.splice(0).forEach((ask) => ask());
    await vi.waitFor(() => expect(fetched, "the overlays' code is still fetched").toBe(true));
    expect(shown()).toBeUndefined();
  });
});
