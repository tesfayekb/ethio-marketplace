import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";

import { MonetisationDoorError } from "./monetisation-service";
import { useMonetisationError } from "./use-monetisation-error";

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
