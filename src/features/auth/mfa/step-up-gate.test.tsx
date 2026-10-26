import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "./use-step-up";

/**
 * INC-911 — the step-up gate whose dialog code fails to download settles the guarded action as
 * StepUpUnavailable (it could not be asked), never as StepUpCancelled (the person cancelled):
 * the dialog's root hears the failure through `onUnavailable` (overlay-facade.tsx ModalRoot).
 * The overlay loader is replaced so the download fails; the session needs a step-up and has a
 * factor, so the gate opens its code dialog.
 */
vi.mock("@/components/ui/overlay-loader", () => ({
  loadOverlays: () => Promise.reject(new Error("offline")),
  useOverlays: () => null,
  warmOverlaysWhenIdle: () => undefined,
}));
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: () => undefined }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("./mfa-service", async () => {
  const real = await vi.importActual<typeof import("./mfa-service")>("./mfa-service");
  return {
    ...real,
    isStepUpFresh: async () => false,
    listFactors: async () => ({ ok: true, factors: [{ id: "f1" }] }),
  };
});
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: unknown }) => children,
}));

const { StepUpGate } = await import("./step-up-gate");
const { StepUpCancelled, StepUpUnavailable } = await import("./mfa-service");

describe("the step-up gate when its dialog cannot download (INC-911)", () => {
  it("SUG-1 the guarded action settles as StepUpUnavailable and never runs", async () => {
    const captured: { guard?: GuardFn } = {};
    const action = vi.fn(async () => "done");
    render(
      <StepUpGate>
        {(given) => {
          captured.guard = given;
          return <p data-testid="child" />;
        }}
      </StepUpGate>,
    );
    expect(screen.getByTestId("child")).toBeTruthy();
    const guard = captured.guard;
    if (guard === undefined) throw new Error("the gate handed its children no guard");
    let outcome: unknown = "pending";
    act(() => {
      void guard(action).then(
        () => {
          outcome = "resolved";
        },
        (error: unknown) => {
          outcome = error;
        },
      );
    });
    await vi.waitFor(() => {
      expect(outcome).not.toBe("pending");
    });
    expect(action).not.toHaveBeenCalled();
    expect(outcome).toBeInstanceOf(StepUpUnavailable);
    expect(outcome).not.toBeInstanceOf(StepUpCancelled);
    expect(screen.queryByTestId("step-up-modal")).toBeNull();
  });
});
