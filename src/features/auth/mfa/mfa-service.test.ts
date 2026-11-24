import { beforeEach, describe, expect, it, vi } from "vitest";

import { readRefusal } from "@/lib/refusal";
import { providerError } from "@/test/provider-errors";

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
      "unexpected_failure",
    ]) {
      const answer = await verifyRefused({ message: "Something else happened", code });
      expect(answer.errorKey, code).toBe("mfa.errorGeneric");
      expect(answer.refusal, code).toEqual({ field: "code", reason: "unknown" });
    }
  });

  it("MSV-10 a call made with no session, or against one the server no longer knows, says the sign-in ended and tells the shell (INC-1274)", async () => {
    const { onUnauthorised } = await import("../session-end");
    const heard: Array<string | null> = [];
    const off = onUnauthorised((code) => heard.push(code));
    const ended = {
      ok: false,
      errorKey: "session.expired",
      refusal: { field: "code", reason: "sessionEnded" },
    };
    try {
      for (const name of [
        "AuthSessionMissingError",
        "session_not_found",
        "session_expired",
        "refresh_token_not_found",
      ] as const) {
        auth.mfa.verify.mockResolvedValue({ data: null, error: providerError(name) });
        expect(await service.verifyFactor("factor-1", "123456"), name).toEqual(ended);
      }
      auth.mfa.listFactors.mockResolvedValue({
        data: null,
        error: providerError("AuthSessionMissingError"),
      });
      expect(await service.listFactors()).toEqual(ended);
      auth.mfa.unenroll.mockResolvedValue({ error: providerError("session_not_found") });
      expect(await service.unenrollFactor("factor-1")).toEqual(ended);
      expect(heard).toEqual([
        "session_missing",
        "session_not_found",
        "session_expired",
        "refresh_token_not_found",
        "session_missing",
        "session_not_found",
      ]);
    } finally {
      off();
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
    // A start reads the account's unfinished setups first (INC-1147 class 2): none here.
    auth.mfa.listFactors.mockResolvedValue({ data: { all: [], totp: [] }, error: null });
    auth.mfa.enroll.mockResolvedValue({
      data: null,
      error: providerError("mfa_factor_name_conflict"),
    });
    const enrolled = await service.enrollTotp("Authenticator app");
    expect(enrolled).toEqual({
      ok: false,
      errorKey: "mfa.errorSetupPending",
      refusal: { field: "code", reason: "mfa_factor_name_conflict" },
    });

    auth.mfa.challenge.mockResolvedValue({
      data: null,
      error: providerError("mfa_totp_verify_not_enabled"),
    });
    const challenge = await service.verifyFactor("factor-1", "123456");
    expect(challenge).toEqual({
      ok: false,
      errorKey: "mfa.errorMethodOff",
      refusal: { field: "code", reason: "mfa_totp_verify_not_enabled" },
    });

    auth.mfa.unenroll.mockResolvedValue({
      error: providerError("insufficient_aal"),
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

describe("a setup the provider holds half-done (cursor bundle 4, INC-1147 class 2)", () => {
  /** A factor as the provider lists it. */
  const factor = (id: string, status: "verified" | "unverified", factor_type = "totp") => ({
    id,
    friendly_name: `name-${id}`,
    factor_type,
    status,
    created_at: "2026-11-23T00:00:00Z",
    updated_at: "2026-11-23T00:00:00Z",
  });
  const listed = (...all: ReturnType<typeof factor>[]) => ({
    data: { all, totp: all.filter((f) => f.factor_type === "totp" && f.status === "verified") },
    error: null,
  });
  const enrolled = {
    data: { id: "new-1", totp: { qr_code: "qr", secret: "secret", uri: "uri" } },
    error: null,
  };

  it("MSV-6 the list gives the verified factors and the unfinished ones apart, and a read that failed is a failure, never an empty list", async () => {
    auth.mfa.listFactors.mockResolvedValue(
      listed(
        factor("v-1", "verified"),
        factor("p-1", "unverified"),
        factor("ph-1", "unverified", "phone"),
      ),
    );
    const read = await service.listFactors();
    if (!read.ok) throw new Error("the read was expected to answer");
    expect(read.factors.map((f) => f.id)).toEqual(["v-1"]);
    expect(read.pending.map((f) => f.id)).toEqual(["p-1"]);
    auth.mfa.listFactors.mockResolvedValue({ data: null, error: { message: "down" } });
    expect(await service.listFactors()).toEqual({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
  });

  it("MSV-7 a start clears the unfinished setups first, only those the same read gave as unverified and of the TOTP kind, then enrols", async () => {
    auth.mfa.listFactors.mockResolvedValue(
      listed(
        factor("v-1", "verified"),
        factor("p-1", "unverified"),
        factor("p-2", "unverified"),
        factor("ph-1", "unverified", "phone"),
      ),
    );
    auth.mfa.unenroll.mockResolvedValue({ data: {}, error: null });
    auth.mfa.enroll.mockResolvedValue(enrolled);
    const answer = await service.enrollTotp("Authenticator app");
    expect(answer).toEqual({
      ok: true,
      factorId: "new-1",
      qrCode: "qr",
      secret: "secret",
      uri: "uri",
    });
    expect(auth.mfa.unenroll.mock.calls).toEqual([[{ factorId: "p-1" }], [{ factorId: "p-2" }]]);
    expect(auth.mfa.enroll).toHaveBeenCalledTimes(1);
    expect(auth.mfa.unenroll.mock.invocationCallOrder.at(-1) ?? 0).toBeLessThan(
      auth.mfa.enroll.mock.invocationCallOrder[0] ?? 0,
    );
    // Nothing unfinished: nothing cleared, the setup begins.
    auth.mfa.unenroll.mockClear();
    auth.mfa.listFactors.mockResolvedValue(listed(factor("v-1", "verified")));
    expect((await service.enrollTotp("Authenticator app")).ok).toBe(true);
    expect(auth.mfa.unenroll).not.toHaveBeenCalled();
  });

  it("MSV-8 a clear that fails shows its own words and makes no enrolment; a factor list that fails makes none either", async () => {
    auth.mfa.listFactors.mockResolvedValue(
      listed(factor("p-1", "unverified"), factor("p-2", "unverified")),
    );
    auth.mfa.unenroll.mockResolvedValue({
      data: null,
      error: { message: "gone wrong", code: "x" },
    });
    expect(await service.enrollTotp("Authenticator app")).toEqual({
      ok: false,
      errorKey: "mfa.errorClearFailed",
      refusal: { field: "code", reason: "clearFailed" },
    });
    // The first failure ends the clear: the second setup is not asked either.
    expect(auth.mfa.unenroll).toHaveBeenCalledTimes(1);
    expect(auth.mfa.enroll).not.toHaveBeenCalled();
    auth.mfa.unenroll.mockClear();
    auth.mfa.listFactors.mockResolvedValue({ data: null, error: { message: "down" } });
    expect(await service.enrollTotp("Authenticator app")).toEqual({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
    expect(auth.mfa.unenroll).not.toHaveBeenCalled();
    expect(auth.mfa.enroll).not.toHaveBeenCalled();
  });

  it("MSV-9 the confirmation of a setup that a newer start replaced says so in its own words; any other step meeting a missing factor keeps the generic line", async () => {
    auth.mfa.challenge.mockResolvedValue({
      data: null,
      error: providerError("mfa_factor_not_found"),
    });
    const confirmed = await service.verifyFactor("p-1", "123456", service.MFA_ENROLL_REFUSALS);
    expect(confirmed).toEqual({
      ok: false,
      errorKey: "mfa.errorSetupReplaced",
      refusal: { field: "code", reason: "mfa_factor_not_found" },
    });
    const stepUp = await service.verifyFactor("p-1", "123456");
    expect(stepUp).toEqual({
      ok: false,
      errorKey: "mfa.errorGeneric",
      refusal: { field: "code", reason: "unknown" },
    });
    expect(auth.mfa.verify).not.toHaveBeenCalled();
  });
});
