import { beforeEach, describe, expect, it, vi } from "vitest";

import { readRefusal } from "@/lib/refusal";

/**
 * DEC-339 wave 2 (INC-1147 class 1) — THE TWO-FACTOR SERVICE READS ITS REFUSALS THROUGH THE ONE
 * READER. A refusal the provider names by `code` reads words of its own; one it does not name reads
 * the generic line; the step-up gate's two typed errors keep their three answers. The client is
 * replaced by a scripted `supabase.auth.mfa`, so every answer below is the service's own.
 */
const auth = vi.hoisted(() => ({
  mfa: {
    enroll: vi.fn(),
    challenge: vi.fn(),
    verify: vi.fn(),
    unenroll: vi.fn(),
    listFactors: vi.fn(),
  },
  refreshSession: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { mfa: auth.mfa, refreshSession: () => auth.refreshSession() } },
}));
vi.mock("@/lib/supabase-door", () => ({ currentSession: vi.fn() }));
vi.mock("@/lib/env-flags", () => ({ isE2E: false }));

const service = await import("./mfa-service");

const challenged = { data: { id: "challenge-1" }, error: null };

beforeEach(() => {
  for (const fn of Object.values(auth.mfa)) fn.mockReset();
  auth.refreshSession.mockReset();
  auth.mfa.challenge.mockResolvedValue(challenged);
});

/** The key and the refusal's reason a failed verify answers for a provider error. */
async function verifyRefused(error: { message: string; code?: string }) {
  auth.mfa.verify.mockResolvedValue({ data: null, error });
  const answer = await service.verifyFactor("factor-1", "123456");
  if (answer.ok) throw new Error("the verify was expected to fail");
  return answer;
}

describe("the two-factor service's refusals (INC-1147 class 1)", () => {
  it("MSV-1 each provider code reads its own words, and a code the family does not name the generic", async () => {
    const words: Array<[string, string]> = [
      ["mfa_verification_failed", "mfa.errorInvalidCode"],
      ["mfa_challenge_expired", "mfa.errorInvalidCode"],
      ["over_request_rate_limit", "auth.errorRateLimited"],
      ["mfa_factor_name_conflict", "mfa.errorSetupPending"],
      ["too_many_enrolled_mfa_factors", "mfa.errorFactorExists"],
      ["mfa_verified_factor_exists", "mfa.errorFactorExists"],
      ["mfa_totp_enroll_not_enabled", "mfa.errorMethodOff"],
      ["mfa_totp_verify_not_enabled", "mfa.errorMethodOff"],
    ];
    for (const [code, key] of words) {
      // A message that holds "code" never outranks the code the family names.
      const answer = await verifyRefused({ message: "the code could not be used", code });
      expect(answer.errorKey, code).toBe(key);
      expect(answer.refusal, code).toEqual({ field: "code", reason: code });
      expect(readRefusal(answer.refusal, service.MFA_REFUSALS).key, code).toBe(key);
    }
    for (const code of [
      "mfa_factor_not_found",
      "mfa_ip_address_mismatch",
      "insufficient_aal",
      "session_expired",
      "unexpected_failure",
    ]) {
      const answer = await verifyRefused({ message: "Something else happened", code });
      expect(answer.errorKey, code).toBe("mfa.errorGeneric");
      expect(answer.refusal, code).toEqual({ field: "code", reason: "unknown" });
    }
  });

  it("MSV-2 a provider that words the refusal without a code keeps the old words test: invalid, expired or code", async () => {
    for (const message of ["Invalid TOTP code entered", "challenge expired", "wrong code"]) {
      const answer = await verifyRefused({ message });
      expect(answer.errorKey, message).toBe("mfa.errorInvalidCode");
      expect(answer.refusal, message).toEqual({ field: "code", reason: "invalidCode" });
      expect(readRefusal(answer.refusal, service.MFA_REFUSALS).key, message).toBe(
        "mfa.errorInvalidCode",
      );
    }
    const other = await verifyRefused({ message: "Database error" });
    expect(other.errorKey).toBe("mfa.errorGeneric");
  });

  it("MSV-3 every callee's refusal carries the code: enroll, challenge, verify and unenroll", async () => {
    auth.mfa.enroll.mockResolvedValue({
      data: null,
      error: { message: "A factor with this name exists", code: "mfa_factor_name_conflict" },
    });
    const enrolled = await service.enrollTotp("Authenticator app");
    expect(enrolled).toEqual({
      ok: false,
      errorKey: "mfa.errorSetupPending",
      refusal: { field: "code", reason: "mfa_factor_name_conflict" },
    });

    auth.mfa.challenge.mockResolvedValue({
      data: null,
      error: { message: "TOTP is off", code: "mfa_totp_verify_not_enabled" },
    });
    const challenge = await service.verifyFactor("factor-1", "123456");
    expect(challenge).toEqual({
      ok: false,
      errorKey: "mfa.errorMethodOff",
      refusal: { field: "code", reason: "mfa_totp_verify_not_enabled" },
    });

    auth.mfa.unenroll.mockResolvedValue({
      error: { message: "AAL2 required", code: "insufficient_aal" },
    });
    const removed = await service.unenrollFactor("factor-1");
    expect(removed).toEqual({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
    expect(auth.refreshSession).not.toHaveBeenCalled();
  });

  it("MSV-4 a step-up with no factor, and a factor list that failed, answer their own words", async () => {
    auth.mfa.listFactors.mockResolvedValue({ data: { totp: [] }, error: null });
    expect(await service.stepUpWithCode("123456")).toEqual({
      ok: false,
      errorKey: "mfa.errorNoFactor",
      refusal: { field: "code", reason: "noFactor" },
    });
    auth.mfa.listFactors.mockResolvedValue({ data: null, error: { message: "down" } });
    expect(await service.stepUpWithCode("123456")).toEqual({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
  });

  it("MSV-5 the step-up gate's typed errors keep their three answers through the reader's own branch", () => {
    expect(service.stepUpAbortKey(new service.StepUpCancelled())).toBeNull();
    expect(service.stepUpAbortKey(new service.StepUpUnavailable())).toBe(
      "mfa.stepUpUnavailableHint",
    );
    for (const other of [new Error("boom"), "notSignedIn", { message: "x" }, null, undefined]) {
      expect(service.stepUpAbortKey(other)).toBeUndefined();
    }
  });
});
