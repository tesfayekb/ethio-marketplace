import { afterEach, describe, expect, it, vi } from "vitest";

import { DIALS, type Dial } from "@/lib/dials";

/**
 * Foundations turn 8 — THE ONE SPEND (DIAL-6…8). consumeRate/peekRate are
 * mocked; envDial is user-client's own (its floor-of-1 rule is under test).
 */
const mocks = vi.hoisted(() => ({
  consume: vi.fn(async () => ({ allowed: true, resetsAt: null, remaining: 4 })),
  peek: vi.fn(async () => ({ resetsAt: null, remaining: 3 })),
}));

vi.mock("@/server/supabase/user-client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/supabase/user-client")>()),
  consumeRate: mocks.consume,
  peekRate: mocks.peek,
}));

const { dialLimit, peek, spend } = await import("./dials");

const ENV = "E2E_DIALS_TEST_LIMIT";
const TEST_DIAL: Dial = { action: "e2e-dial", limit: { fallback: 7, env: ENV }, windowSeconds: 90 };

afterEach(() => {
  delete process.env[ENV];
  mocks.consume.mockClear();
  mocks.peek.mockClear();
});

describe("src/server/dials.ts — spend and peek", () => {
  it('DIAL-6 spend passes the action, the limit and "<n> seconds" to consumeRate', async () => {
    const verdict = await spend(TEST_DIAL, "key-1");
    expect(mocks.consume).toHaveBeenCalledWith("e2e-dial", "key-1", 7, "90 seconds");
    expect(verdict).toEqual({ allowed: true, resetsAt: null, remaining: 4 });
    await peek(DIALS.assistListing, "listing-1");
    expect(mocks.peek).toHaveBeenCalledWith("assist:listing", "listing-1", 5, "315576000 seconds");
  });

  it("DIAL-7 an env override wins over the fallback; a bad env value falls back", () => {
    process.env[ENV] = "12";
    expect(dialLimit(TEST_DIAL)).toBe(12);
    process.env[ENV] = "0";
    expect(dialLimit(TEST_DIAL)).toBe(7);
    process.env[ENV] = "many";
    expect(dialLimit(TEST_DIAL)).toBe(7);
    process.env[ENV] = "2.9";
    expect(dialLimit(TEST_DIAL)).toBe(2);
    expect(dialLimit(DIALS.geocode)).toBe(60);
  });

  it("DIAL-8 the windows keep the replaced text's epochs", () => {
    expect(DIALS.assistListing.windowSeconds).toBe(315576000);
    expect(DIALS.backgroundListing.windowSeconds).toBe(315576000);
    expect(DIALS.uploadDraftWeek.windowSeconds).toBe(604800);
    expect(DIALS.listingViewSession.windowSeconds).toBe(86400);
    expect(DIALS.identityImitation.windowSeconds).toBe(86400);
  });
});
