import { useEffect, useRef, useState } from "react";

/** The contact step's own hold on Next (Rulings 3): still reading, refusing, or open. */
export type WhoGate = "pending" | "blocked" | "open";

/**
 * INC-449 — A NEXT PRESSED WHILE THE CONTACT STEP IS STILL READING WAITS FOR IT,
 * AND IS NEVER LOST.
 *
 * Rulings 4 item 4 queued such a Next and judged it inside the step's gate
 * callback. That callback could run with a closure from before the press (the
 * identity's answer committed just before the press, and its effect ran just
 * after it), saw no queue, and the press was dropped: Next did nothing and the
 * step stayed open (PW-57, PW-137, PW-144). Here the queue is judged in an
 * effect over BOTH the queue and the gate, so whichever arrives last decides,
 * exactly once.
 *
 * The gate also belongs to one visit of the contact step: it is set back to
 * pending whenever the wizard is on another step, so a Next pressed as the step
 * opens again waits for that visit's identity read instead of judging a form
 * whose names have not loaded yet (a stale "open" ran the step's claim with
 * empty names and refused).
 */
export function useQueuedNext({
  step,
  whoStep,
  onGo,
  onRefuse,
}: {
  /** The wizard's current step. */
  step: number;
  /** The contact step's number. */
  whoStep: number;
  /** Leaves the contact step (the claim, the save, the move). */
  onGo: () => void;
  /** Counts a refused Next, so the step shows what it needs. */
  onRefuse: () => void;
}) {
  const [gate, setGate] = useState<WhoGate>("pending");
  const [queued, setQueued] = useState(false);
  const go = useRef(onGo);
  go.current = onGo;
  const refuse = useRef(onRefuse);
  refuse.current = onRefuse;

  /* One visit, one gate: away from the contact step it is pending again. */
  useEffect(() => {
    if (step === whoStep) return;
    setGate("pending");
    setQueued(false);
  }, [step, whoStep]);

  /* The queue is judged once both are known, whichever came last. */
  useEffect(() => {
    if (!queued || gate === "pending") return;
    setQueued(false);
    if (step !== whoStep) return;
    if (gate === "blocked") refuse.current();
    else go.current();
  }, [queued, gate, step, whoStep]);

  return {
    gate,
    /** The contact step reports its gate here. */
    setGate,
    /** A Next pressed while the gate is pending. */
    queue: () => setQueued(true),
  };
}
