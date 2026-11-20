import { describe, expect, it } from "vitest";

import { isExpiredSessionError, startedSession } from "./impersonation-service";

it("reads an expired-session database refusal object", () => {
  expect(isExpiredSessionError({ message: "noActiveSession", code: "P0D01" })).toBe(true);
});

describe("isExpiredSessionError reads the code first (F1-7b)", () => {
  it("reads the code with or without a detail, in a raise, an envelope or an Error", () => {
    expect(
      isExpiredSessionError({ message: "noActiveSession", code: "P0D01", details: null }),
    ).toBe(true);
    expect(isExpiredSessionError({ message: "noActiveSession:abc", code: "P0D01" })).toBe(true);
    expect(isExpiredSessionError({ message: " noActiveSession ", code: "P0D01" })).toBe(true);
    expect(isExpiredSessionError(new Error("noActiveSession"))).toBe(true);
    expect(isExpiredSessionError("noActiveSession")).toBe(true);
  });

  it("still reads the old sentence until the next Publish", () => {
    expect(isExpiredSessionError({ message: "impersonation session expired", code: "P0001" })).toBe(
      true,
    );
  });

  it.each([
    ["another door code", { message: "sessionActive", code: "P0D01" }],
    ["the gate's code", { message: "permissionDenied", code: "P0D01" }],
    ["a longer word", { message: "noActiveSessionAtAll", code: "P0D01" }],
    ["the code inside other words", { message: "error: noActiveSession", code: "P0001" }],
    ["a network error", new TypeError("Failed to fetch")],
    ["nothing", null],
    ["undefined", undefined],
  ])("is false for %s", (_label, error) => {
    expect(isExpiredSessionError(error)).toBe(false);
  });
});

describe("begin_impersonation's answer (F1-2, the door shell)", () => {
  it("reads the session from { ok: true, session_id, expires_at }", () => {
    expect(
      startedSession({ ok: true, session_id: "s-1", expires_at: "2026-11-14T09:15:00+00:00" }),
    ).toEqual({ sessionId: "s-1", expiresAt: "2026-11-14T09:15:00+00:00" });
  });

  it.each([
    ["a refusal envelope", { ok: false, code: "P0D01", message: "sessionActive" }],
    ["no session id", { ok: true, expires_at: "2026-11-14T09:15:00+00:00" }],
    ["a non-text expiry", { ok: true, session_id: "s-1", expires_at: 0 }],
    ["the old table shape", [{ session_id: "s-1", expires_at: "2026-11-14T09:15:00+00:00" }]],
    ["nothing", null],
  ])("answers no session for %s", (_label, data) => {
    expect(startedSession(data)).toBeNull();
  });
});
