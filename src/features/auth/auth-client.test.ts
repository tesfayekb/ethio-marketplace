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
}));

vi.mock("@/lib/supabase-door", () => ({
  getSupabase: () => door.getSupabase(),
  // A signed-in device, so the account-carry calls go on to ask for the client.
  currentSession: () => door.currentSession(),
  storedSessionKey: () => "sb-abcdefghijklmnop-auth-token",
}));

const service = await import("./auth-service");

const GENERIC = { ok: false, errorKey: "auth.errorGeneric" };

/** Each action's answer when the client did not load. */
const ANSWERS: Record<string, unknown> = {
  signUp: GENERIC,
  signInWithPassword: GENERIC,
  signInWithGoogle: GENERIC,
  resendConfirmation: GENERIC,
  signOut: GENERIC,
  signOutOtherDevices: GENERIC,
  getIdentities: GENERIC,
  linkGoogleIdentity: GENERIC,
  unlinkProviderIdentity: GENERIC,
  changePassword: GENERIC,
  changeEmail: GENERIC,
  hasSessionRehydrating: false,
  completeEmailVerification: { ok: false, hadError: true },
  hasPassword: GENERIC,
  removeOwnPassword: GENERIC,
  requestPasswordReset: GENERIC,
  completePasswordReset: GENERIC,
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

  it("ASC-2 auth-service.ts asks the door for the client in one place", () => {
    const text = readFileSync("src/features/auth/auth-service.ts", "utf8");
    expect(text.match(/getSupabase\(\)/g) ?? []).toHaveLength(1);
  });
});
