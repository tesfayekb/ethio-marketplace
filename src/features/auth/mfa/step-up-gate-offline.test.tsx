import { act, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "./use-step-up";

/**
 * Turn S6-3 (row 48, INC-911) — the step-up gate's dialog is fetched on the first step-up
 * (step-up-dialog.tsx through resilientLazy). When that download fails, the shell's one notice
 * is raised and the guarded action settles as StepUpUnavailable (it could not be asked), never
 * as StepUpCancelled, and never runs. The session needs a step-up and has a factor.
 */
vi.mock("./step-up-dialog", () => {
  throw new Error("Failed to fetch dynamically imported module");
});
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: reported,
}));
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

const { StepUpGate } = await import("./step-up-gate");
const { StepUpCancelled, StepUpUnavailable } = await import("./mfa-service");

describe("the step-up gate's dialog arrives on demand (turn S6-3)", () => {
  it("SUG-2 a dialog that cannot download raises the notice and settles the action as StepUpUnavailable", async () => {
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
    expect(reported).toHaveBeenCalledTimes(1);
    expect(reported.mock.calls[0]?.[0]).toBe("the step-up dialog");
    expect(screen.queryByTestId("step-up-modal")).toBeNull();
    expect(screen.getByTestId("child")).toBeTruthy();
  });

  it("SUG-3 the gate's own file reaches the dialog only through the on-demand import", () => {
    const gate = readFileSync("src/features/auth/mfa/step-up-gate.tsx", "utf8");
    const values = [...gate.matchAll(/^import (?!type )[^;]*? from "([^"]+)";$/gms)].map(
      (match) => match[1],
    );
    expect(values).toEqual(["react", "@/lib/resilient-lazy", "./use-step-up"]);
    expect(gate).toContain('import("./step-up-dialog")');
  });
});
