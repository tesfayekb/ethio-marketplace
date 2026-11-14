import { describe, expect, it } from "vitest";

import { isExpiredSessionError, startedSession } from "./impersonation-service";

it("reads an expired-session database refusal object", () => {
  expect(isExpiredSessionError({ message: "impersonation session expired", code: "P0001" })).toBe(
    true,
  );
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
