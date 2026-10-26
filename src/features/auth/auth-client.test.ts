import { readFileSync } from "node:fs";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-915 (Foundations turn 34, ruling 2) — A FAILED DOWNLOAD OF THE SUPABASE CLIENT IS A
 * FAILED ACTION, NEVER A REJECTION. Every exported action of auth-service.ts is enumerated
 * from the module's own exports, so a new action is covered by itself: with the door's
 * `getSupabase()` rejecting, each resolves to its failure answer. A function that needs no
 * client is listed by name.
 */
const door = vi.hoisted(() => ({
  getSupabase: vi.fn(),
  currentSession: vi.fn(),
  forgetStoredSession: vi.fn(),
}));

vi.mock("@/lib/supabase-door", () => ({
  getSupabase: () => door.getSupabase(),
  // A signed-in device, so the account-carry calls go on to ask for the client.
  currentSession: () => door.currentSession(),
  storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
  forgetStoredSession: () => door.forgetStoredSession(),
}));

const service = await import("./auth-service");

const LOAD_FAILED = { ok: false, errorKey: "common.loadFailed" };

/** Each action's answer when the client did not load. */
const ANSWERS: Record<string, unknown> = {
  signUp: LOAD_FAILED,
  signInWithPassword: LOAD_FAILED,
  signInWithGoogle: LOAD_FAILED,
  resendConfirmation: LOAD_FAILED,
  signOut: LOAD_FAILED,
  signOutOtherDevices: LOAD_FAILED,
  getIdentities: LOAD_FAILED,
  linkGoogleIdentity: LOAD_FAILED,
  unlinkProviderIdentity: LOAD_FAILED,
  changePassword: LOAD_FAILED,
  changeEmail: LOAD_FAILED,
  hasSessionRehydrating: false,
  sessionRehydration: "unavailable",
  completeEmailVerification: { ok: false, unavailable: true },
  hasPassword: LOAD_FAILED,
  removeOwnPassword: LOAD_FAILED,
  requestPasswordReset: LOAD_FAILED,
  completePasswordReset: LOAD_FAILED,
  fetchPreferredLanguage: { code: null, reason: "the client did not load" },
  savePreferredLanguage: { ok: false, reason: "the client did not load" },
};

/** Exports that never reach the client. */
const NEEDS_NO_CLIENT = [
  "emailRedirectUrl",
  "oauthRedirectUrl",
  "getCaptchaToken",
  "resetRedirectUrl",
];

/** Arguments for the actions that take some (any value the action accepts). */
const ARGS: Record<string, unknown[]> = {
  signUp: [{ email: "nobody@example.test", password: "not-a-real-password-1" }],
  signInWithPassword: [{ email: "nobody@example.test", password: "not-a-real-password-1" }],
  signInWithGoogle: ["/"],
  resendConfirmation: ["nobody@example.test"],
  unlinkProviderIdentity: ["identity-1"],
  changePassword: ["old-password-1", "new-password-1"],
  changeEmail: ["nobody@example.test"],
  removeOwnPassword: ["old-password-1"],
  requestPasswordReset: ["nobody@example.test"],
  completePasswordReset: ["new-password-1"],
  savePreferredLanguage: [null],
};

/** Every function the module exports, by name. */
const exported: Array<[string, unknown]> = Object.entries(service).filter(
  ([, value]) => typeof value === "function",
);

let errors: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  door.getSupabase
    .mockReset()
    .mockRejectedValue(new TypeError("Failed to fetch dynamically imported module"));
  door.forgetStoredSession.mockReset().mockReturnValue(true);
  door.currentSession
    .mockReset()
    .mockResolvedValue({ session: { user: { id: "user-1" }, access_token: "t" }, failed: false });
  errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  errors.mockRestore();
});

describe("a failed client download is a failed action (INC-915)", () => {
  it("ASC-1 every exported action resolves to its failure answer, never a rejection", async () => {
    const names = exported.map(([name]) => name).sort();
    expect(names).toEqual([...Object.keys(ANSWERS), ...NEEDS_NO_CLIENT].sort());
    for (const [name, action] of exported) {
      if (NEEDS_NO_CLIENT.includes(name)) continue;
      errors.mockClear();
      if (typeof action !== "function") throw new Error(`${name} is not a function`);
      const answer = await Promise.resolve(Reflect.apply(action, undefined, ARGS[name] ?? [])).then(
        (value) => ({ resolved: value }),
        (error: unknown) => ({ rejected: String(error) }),
      );
      expect(answer, name).toEqual({ resolved: ANSWERS[name] });
      expect(errors, name).toHaveBeenCalledWith(
        "[client-error] the sign-in code did not load:",
        "Failed to fetch dynamically imported module",
      );
    }
  });

  it('ASC-6 a session read that throws is unavailable to the reset screen, never "no session" (INC-914)', async () => {
    const getSession = vi.fn().mockRejectedValue(new Error("the lock timed out"));
    door.getSupabase.mockReset().mockResolvedValue({ auth: { getSession } });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    try {
      expect(await service.sessionRehydration()).toBe("unavailable");
      expect(await service.hasSessionRehydrating()).toBe(false);
      expect(warn).toHaveBeenCalledWith("[auth] the session could not be read: the lock timed out");
    } finally {
      warn.mockRestore();
    }
  });

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
    const text = readFileSync("src/features/auth/auth-service.ts", "utf8");
    expect(text.match(/getSupabase\(\)/g) ?? []).toHaveLength(1);
  });
});

describe("a sign-out ends the session on this device whatever the server answers (DEC-268)", () => {
  it("ASC-3 a sign-out that cannot finish still ends the session on this device", async () => {
    // The client did not load: the stored session is removed, and the answer says it failed.
    const unloaded = await service.signOut();
    expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    expect(unloaded).toEqual(LOAD_FAILED);
    // The server could not be reached (supabase-js answers an error and keeps the session).
    door.forgetStoredSession.mockClear();
    const signOut = vi.fn().mockResolvedValue({
      error: { name: "AuthRetryableFetchError", message: "Failed to fetch", status: 0 },
    });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { signOut } });
    const failed = await service.signOut();
    expect(failed.ok).toBe(false);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    // A sign-out the server confirmed leaves the stored session to supabase-js, which removed it.
    door.forgetStoredSession.mockClear();
    signOut.mockResolvedValue({ error: null });
    expect(await service.signOut()).toEqual({ ok: true });
    expect(door.forgetStoredSession).not.toHaveBeenCalled();
  });

  it("ASC-4 a sign-in that drops an expired prior session drops it from this device when the library keeps it", async () => {
    const key = "sb-abcdefghijklmnop-auth-token";
    const expiredAt = Math.floor(Date.now() / 1000) - 3600;
    window.localStorage.setItem(
      key,
      JSON.stringify({ access_token: "a", refresh_token: "r", expires_at: expiredAt }),
    );
    const unreachable = { name: "AuthRetryableFetchError", message: "Failed to fetch", status: 0 };
    const signOut = vi.fn().mockResolvedValue({ error: unreachable });
    const signInWithPassword = vi
      .fn()
      .mockResolvedValue({ data: { session: null, user: null }, error: unreachable });
    door.getSupabase.mockReset().mockResolvedValue({ auth: { signOut, signInWithPassword } });
    try {
      await service.signInWithPassword({
        email: "nobody@example.test",
        password: "not-a-real-password-1",
      });
      expect(signOut).toHaveBeenCalledWith({ scope: "local" });
      expect(door.forgetStoredSession).toHaveBeenCalledTimes(1);
    } finally {
      window.localStorage.removeItem(key);
    }
  });

  it("ASC-5 every call that ends this device's session forgets the stored session when the library keeps it", () => {
    const text = readFileSync("src/features/auth/auth-service.ts", "utf8");
    // Each top-level function's text, from its declaration to the next one.
    const functions = text.split(/\n(?=(?:export )?(?:async )?function )/);
    // A sign-out of "others" ends no session on this device; every other one does.
    const ending = functions.filter((body) =>
      /\.auth\.signOut\((?!\{ scope: "others" \})/.test(body),
    );
    const names = ending.map((body) => /function (\w+)/.exec(body)?.[1] ?? "?");
    expect(names).toEqual(["evictExpiredSession", "signOut", "currentPasswordProof"]);
    // The one exception: the password check's second client keeps no session on this device
    // (no storage, persistSession false) — its sign-out ends the check, not the person's session.
    const NO_STORED_SESSION = ["currentPasswordProof"];
    for (const [index, body] of ending.entries()) {
      if (NO_STORED_SESSION.includes(names[index] ?? "")) {
        expect(body).toMatch(/persistSession: false/);
        continue;
      }
      expect(body, names[index]).toMatch(/forgetStoredSession\(\)/);
    }
  });
});
