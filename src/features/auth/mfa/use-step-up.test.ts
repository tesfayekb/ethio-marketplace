import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cursor bundle 7a (INC-1299) — THE TWO WAYS THE STEP-UP GATE FINDS NO FACTOR TO ASK. A read that
 * answered with no factor (user-case 1: the factor is gone) releases the guarded action at once as
 * StepUpUnavailable and the dialog explains. A read that FAILED (user-case 2) is not "no factor": the
 * gate holds the action parked in its own failure mode, a Retry reads again, and Cancel settles the
 * action as StepUpCancelled. The action never runs without a verified code.
 */
const mfa = vi.hoisted(() => ({ isStepUpFresh: vi.fn(), listFactors: vi.fn() }));
vi.mock("./mfa-service", async () => {
  const real = await vi.importActual<typeof import("./mfa-service")>("./mfa-service");
  return { ...real, isStepUpFresh: mfa.isStepUpFresh, listFactors: mfa.listFactors };
});

const { useStepUp } = await import("./use-step-up");
const { StepUpCancelled, StepUpUnavailable } = await import("./mfa-service");

const FAILED = {
  ok: false,
  errorKey: "mfa.errorGeneric",
  refusal: { field: "code", reason: "unknown" },
} as const;
const ONE_FACTOR = { ok: true, factors: [{ id: "f1" }], pending: [] } as const;
const NO_FACTOR = { ok: true, factors: [], pending: [] } as const;

/** Starts a guarded action and records how its promise settled. */
function start(guard: ReturnType<typeof useStepUp>["guard"], action: () => Promise<string>) {
  const settled: { value: unknown } = { value: "pending" };
  void guard(action).then(
    (value) => {
      settled.value = value;
    },
    (error: unknown) => {
      settled.value = error;
    },
  );
  return settled;
}

describe("useStepUp when it cannot find a factor to ask (INC-1299)", () => {
  beforeEach(() => {
    mfa.isStepUpFresh.mockReset().mockResolvedValue(false);
    mfa.listFactors.mockReset();
  });

  it("SUH-1 a failed factor read opens the failure mode and parks the action; Retry reads again", async () => {
    mfa.listFactors.mockResolvedValueOnce(FAILED).mockResolvedValueOnce(ONE_FACTOR);
    const action = vi.fn(async () => "done");
    const { result } = renderHook(() => useStepUp());
    let settled: { value: unknown } = { value: "pending" };
    await act(async () => {
      settled = start(result.current.guard, action);
    });
    expect(result.current.mode).toBe("read-failed");
    expect(settled.value).toBe("pending");
    expect(action).not.toHaveBeenCalled();
    await act(async () => {
      await result.current.retry();
    });
    expect(mfa.listFactors).toHaveBeenCalledTimes(2);
    expect(result.current.mode).toBe("code");
    expect(result.current.busy).toBe(false);
    expect(settled.value).toBe("pending");
    expect(action).not.toHaveBeenCalled();
  });

  it("SUH-2 a Retry whose read fails again stays in the failure mode; Cancel settles as StepUpCancelled", async () => {
    mfa.listFactors.mockResolvedValue(FAILED);
    const action = vi.fn(async () => "done");
    const { result } = renderHook(() => useStepUp());
    let settled: { value: unknown } = { value: "pending" };
    await act(async () => {
      settled = start(result.current.guard, action);
    });
    await act(async () => {
      await result.current.retry();
    });
    expect(result.current.mode).toBe("read-failed");
    expect(settled.value).toBe("pending");
    await act(async () => {
      result.current.close();
    });
    expect(result.current.mode).toBe("closed");
    expect(settled.value).toBeInstanceOf(StepUpCancelled);
    expect(action).not.toHaveBeenCalled();
  });

  it("SUH-3 a read that answers with no factor (the factor is gone) draws no-factor and releases the action as StepUpUnavailable", async () => {
    mfa.listFactors.mockResolvedValue(NO_FACTOR);
    const action = vi.fn(async () => "done");
    const { result } = renderHook(() => useStepUp());
    let settled: { value: unknown } = { value: "pending" };
    await act(async () => {
      settled = start(result.current.guard, action);
    });
    expect(result.current.mode).toBe("no-factor");
    expect(settled.value).toBeInstanceOf(StepUpUnavailable);
    expect(action).not.toHaveBeenCalled();
  });
});
