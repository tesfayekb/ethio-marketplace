import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Turn 34c-2 — THE SESSION CLOCKS SIT BESIDE THE SESSION'S OWN KEY. Their names come from the
 * door (besideStoredSession), read from the project's address as the client reads it: a local
 * backend's address gives the client's own prefix, and another project's session in the same
 * browser is never read as this one's.
 */
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { clearSessionClocks, liveSessionRef, sessionPolicyKeys, startSessionClocks } =
  await import("./session-policy");

/** A token whose payload carries the session's id, as the auth server writes it. */
const token = (sessionId: string) =>
  `header.${btoa(JSON.stringify({ session_id: sessionId })).replace(/=+$/, "")}.signature`;

beforeEach(() => {
  vi.stubEnv("VITE_SUPABASE_URL", "https://abcdefghijklmnop.supabase.co");
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test_key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  window.localStorage.clear();
});

describe("the session clocks' keys (turn 34c-2)", () => {
  it("SPK-1 the clocks are named beside the client's own key, a local backend's address included", () => {
    expect(sessionPolicyKeys()).toEqual({
      lastActivityAt: "sb-abcdefghijklmnop-last-activity-at",
      sessionStartedAt: "sb-abcdefghijklmnop-session-started-at",
      sessionRef: "sb-abcdefghijklmnop-session-ref",
    });
    // The old reading (a pattern on "http(s)://<label>.") named a local backend's clocks
    // "sb-local-…"; the client keeps that session under "sb-localhost-auth-token".
    vi.stubEnv("VITE_SUPABASE_URL", "http://localhost:31321");
    expect(sessionPolicyKeys()?.sessionRef).toBe("sb-localhost-session-ref");
  });

  it("SPK-2 only this project's session is read: another project's token beside it is not", () => {
    window.localStorage.setItem(
      "sb-otherprojectabcd-auth-token",
      JSON.stringify({ access_token: token("theirs") }),
    );
    expect(liveSessionRef()).toBeNull();
    window.localStorage.setItem(
      "sb-abcdefghijklmnop-auth-token",
      JSON.stringify({ access_token: token("mine") }),
    );
    expect(liveSessionRef()).toBe("mine");
    startSessionClocks(1_000);
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-ref")).toBe("mine");
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-started-at")).toBe("1000");
    clearSessionClocks();
    expect(window.localStorage.getItem("sb-abcdefghijklmnop-session-ref")).toBeNull();
  });

  it("SPK-3 without a project there is no session to clock: nothing is written, nothing throws", () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_URL", "");
    expect(sessionPolicyKeys()).toBeNull();
    expect(liveSessionRef()).toBeNull();
    startSessionClocks();
    clearSessionClocks();
    expect(window.localStorage.length).toBe(0);
  });
});
