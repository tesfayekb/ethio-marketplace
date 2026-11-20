import { randomBytes } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/**
 * F1-7d (INC-1218) — THE END OF A SESSION IS ONE STATE. What ends a session (a 401, a stale token,
 * `notSignedIn`), the one console line told once per end, and the shell's ear for a 401. Each case
 * loads the module afresh: its once-guard and its sign-in moment are the tab's own state.
 */
async function sessionEnd() {
  vi.resetModules();
  return import("./session-end");
}

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
});
afterEach(() => {
  warn.mockRestore();
});

describe("what ends a session", () => {
  it("SEN-1 a 401, a stale token's code and a notSignedIn refusal end it; other failures do not", async () => {
    const { endsSession } = await sessionEnd();
    expect(endsSession({ message: "permission denied", code: "42501", status: 401 })).toBe(true);
    expect(endsSession({ message: "JWT expired", code: "PGRST301" })).toBe(true);
    expect(endsSession({ message: "notSignedIn", code: "P0D01", status: 401 })).toBe(true);
    expect(endsSession(new Error("notSignedIn"))).toBe(true);
    expect(endsSession({ message: "notSignedIn:", code: "" })).toBe(true);
    expect(endsSession(new ReaderError({ class: "auth", status: 401, message: "x" }))).toBe(true);
    // A refusal that is not about the session, a server failure and no answer at all go on.
    expect(endsSession({ message: "permissionDenied", code: "P0D01", status: 403 })).toBe(false);
    expect(endsSession({ message: "rateLimited:60", status: 429 })).toBe(false);
    expect(endsSession({ message: "boom", status: 500 })).toBe(false);
    expect(endsSession(new TypeError("Failed to fetch"))).toBe(false);
    expect(endsSession(null)).toBe(false);
    expect(endsSession(undefined)).toBe(false);
  });

  it("SEN-2 the code the line names is a short code, a refusal key or the status, never a sentence", async () => {
    const { sessionEndCode } = await sessionEnd();
    expect(sessionEndCode({ message: "JWT expired", code: "PGRST301", status: 401 })).toBe(
      "PGRST301",
    );
    expect(sessionEndCode(new Error("notSignedIn"))).toBe("notSignedIn");
    expect(sessionEndCode({ message: "notSignedIn", code: "P0D01", status: 401 })).toBe(
      "notSignedIn",
    );
    expect(sessionEndCode({ message: "no", code: "a sentence, not a code", status: 401 })).toBe(
      "401",
    );
    expect(sessionEndCode({ message: "boom" })).toBeNull();
  });
});

describe("the one console line", () => {
  it("SEN-3 the first end writes one line in its shape; a second report of the same end writes nothing", async () => {
    const { endSession, noteSignIn } = await sessionEnd();
    noteSignIn(1_000);
    expect(endSession("unauthorised", "PGRST301", 8_400)).toBe(true);
    expect(endSession("signedOut", null, 9_000)).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      `[session] ended: unauthorised PGRST301 7 ${document.visibilityState}`,
    );
  });

  it("SEN-4 with no sign-in seen and no code the line says none; a new session may end again", async () => {
    const { endSession, sessionStarted } = await sessionEnd();
    expect(endSession("signOut", null)).toBe(true);
    expect(warn).toHaveBeenLastCalledWith(
      `[session] ended: signOut none none ${document.visibilityState}`,
    );
    sessionStarted();
    expect(endSession("idle", null)).toBe(true);
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("SEN-5 a code that is not code-shaped is never written (no token, no id, no sentence)", async () => {
    const { endSession } = await sessionEnd();
    const token = [randomBytes(12), randomBytes(24), randomBytes(32)]
      .map((part) => part.toString("base64url"))
      .join(".");
    endSession("unauthorised", token);
    const line = String(warn.mock.calls[0]?.[0]);
    expect(line).not.toContain(token);
    expect(line).toMatch(/^\[session\] ended: unauthorised none none \w+$/);
  });
});

describe("the shell's verdict on a 401", () => {
  it("SEN-7 no session left ends it; a failed read waits; a stored session is read again once, then waits", async () => {
    const { unauthorisedVerdict } = await sessionEnd();
    expect(unauthorisedVerdict({ failed: false, session: null }, null)).toEqual({ kind: "end" });
    expect(unauthorisedVerdict({ failed: true, session: null }, null)).toEqual({ kind: "wait" });
    const session = { user: { id: "u-1" }, expires_at: 1_700_000_000 };
    const first = unauthorisedVerdict({ failed: false, session }, null);
    expect(first).toEqual({ kind: "recover", held: "u-1:1700000000" });
    expect(unauthorisedVerdict({ failed: false, session }, "u-1:1700000000")).toEqual({
      kind: "wait",
    });
    // A refreshed session is a new one: its failed reads are read again once more.
    const refreshed = { ...session, expires_at: 1_700_003_600 };
    expect(unauthorisedVerdict({ failed: false, session: refreshed }, "u-1:1700000000")).toEqual({
      kind: "recover",
      held: "u-1:1700003600",
    });
  });
});

describe("the shell's ear for a 401", () => {
  it("SEN-6 a failure that ended the session reaches every listener with its code; other failures reach none", async () => {
    const { onUnauthorised, reportUnauthorised } = await sessionEnd();
    const heard: Array<string | null> = [];
    const off = onUnauthorised((code) => heard.push(code));
    reportUnauthorised({ message: "boom", status: 500 });
    reportUnauthorised({ message: "notSignedIn", code: "P0D01", status: 401 });
    expect(heard).toEqual(["notSignedIn"]);
    off();
    reportUnauthorised({ message: "JWT expired", code: "PGRST301", status: 401 });
    expect(heard).toEqual(["notSignedIn"]);
  });
});
