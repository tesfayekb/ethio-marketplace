import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";

import { MonetisationDoorError } from "./monetisation-service";
import { useMonetisationError } from "./use-monetisation-error";
import { refusalText } from "@/lib/refusal";

function failWith(error: unknown) {
  const view = renderHook(() => useMonetisationError());
  act(() => view.result.current.fail(error));
  return view.result.current.refusal;
}

describe("useMonetisationError (F1-6b — the codes read through the one reader)", () => {
  it("MNS-8 a door's code draws its console words, its detail changing none", () => {
    expect(failWith(new MonetisationDoorError("priceInUse", "P0D01"))).toEqual({
      key: "admin.monetisation.error.priceInUse",
      raw: null,
    });
    expect(failWith(new MonetisationDoorError("permissionDenied:scope", "P0D01"))).toEqual({
      key: "admin.packages.error.denied",
      raw: null,
    });
    expect(failWith({ message: "launchRequired", code: "P0D01", details: "", hint: "" })).toEqual({
      key: "admin.monetisation.error.launchRequired",
      raw: null,
    });
  });

  it("MNS-9 the step-up gate keeps its own line, a cancelled step-up says nothing", () => {
    expect(
      failWith(new MonetisationDoorError("step-up required: no verified factor", "P0009")),
    ).toEqual({
      key: "admin.packages.error.stepUp",
      raw: null,
    });
    expect(failWith(new StepUpCancelled())).toBeNull();
    expect(failWith(new StepUpUnavailable())).toEqual({
      key: "mfa.stepUpUnavailableHint",
      raw: null,
    });
  });

  it("MNS-10 a code with no words draws the generic line with the code beneath it", () => {
    expect(failWith(new MonetisationDoorError("somethingNew", "P0D01"))).toEqual({
      key: "admin.packages.error.unknown",
      raw: "somethingNew",
    });
    expect(failWith(undefined)).toEqual({ key: "admin.packages.error.unknown", raw: null });
    expect(failWith(null)).toEqual({ key: "admin.packages.error.unknown", raw: null });
  });
});

describe("L22b RTW-11", () => {
  it("RTW-11 monetisation: a reset still to come says when; no instant keeps the plain words", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-21T04:00:00Z"));
    try {
      const words = (key: string) => (key.endsWith("When") ? "{when}" : "plain");
      const timed = failWith("rateLimited:2026-11-21T05:00:00Z");
      expect(timed?.key).toBe("admin.packages.error.rateLimited");
      expect(timed?.read?.when).toBe("admin.packages.error.rateLimitedWhen");
      expect(timed?.read && refusalText(timed.read, words, undefined, "en")).toBe("in 1 hour");
      const plain = failWith("rateLimited");
      expect(plain?.read).toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });
});
