import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useQueuedNext, type WhoGate } from "./queued-next";

type Props = { step: number; onGo: () => void; onRefuse: () => void };

function setup(step = 7) {
  const onGo = vi.fn();
  const onRefuse = vi.fn();
  const hook = renderHook((props: Props) => useQueuedNext({ whoStep: 7, ...props }), {
    initialProps: { step, onGo, onRefuse },
  });
  return { ...hook, onGo, onRefuse };
}

/**
 * INC-449 — the contact step's queued Next (PW-57, PW-137, PW-144): judged over
 * the queue and the gate together, whichever arrives last, exactly once; the
 * gate belongs to one visit of the step.
 */
describe("useQueuedNext", () => {
  it("QN-1 a Next queued while the gate is pending goes once the gate opens, once", () => {
    const { result, onGo, onRefuse } = setup();
    act(() => result.current.queue());
    expect(onGo).not.toHaveBeenCalled();
    act(() => result.current.setGate("open"));
    expect(onGo).toHaveBeenCalledTimes(1);
    act(() => result.current.setGate("open"));
    expect(onGo).toHaveBeenCalledTimes(1);
    expect(onRefuse).not.toHaveBeenCalled();
  });

  it("QN-2 the press and the gate's answer in the same moment: the Next still goes, once", () => {
    const { result, onGo } = setup();
    act(() => {
      result.current.setGate("open");
      result.current.queue();
    });
    expect(onGo).toHaveBeenCalledTimes(1);
    const second = setup();
    act(() => {
      second.result.current.queue();
      second.result.current.setGate("open");
    });
    expect(second.onGo).toHaveBeenCalledTimes(1);
  });

  it("QN-3 a blocked gate refuses the queued Next, and a pending one keeps it waiting", () => {
    const { result, onGo, onRefuse } = setup();
    act(() => result.current.queue());
    act(() => result.current.setGate("pending" as WhoGate));
    expect(onGo).not.toHaveBeenCalled();
    expect(onRefuse).not.toHaveBeenCalled();
    act(() => result.current.setGate("blocked"));
    expect(onRefuse).toHaveBeenCalledTimes(1);
    expect(onGo).not.toHaveBeenCalled();
  });

  it("QN-4 the gate belongs to one visit: away from the step it is pending again, and a queued Next is dropped", () => {
    const { result, rerender, onGo, onRefuse } = setup();
    act(() => result.current.setGate("open"));
    expect(result.current.gate).toBe("open");
    rerender({ step: 8, onGo, onRefuse });
    expect(result.current.gate).toBe("pending");
    rerender({ step: 7, onGo, onRefuse });
    expect(result.current.gate).toBe("pending");
    act(() => result.current.queue());
    rerender({ step: 6, onGo, onRefuse });
    act(() => result.current.setGate("open"));
    expect(onGo).not.toHaveBeenCalled();
  });
});
