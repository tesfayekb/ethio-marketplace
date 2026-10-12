/**
 * INC-526 (bundle 11 turn C9) — ONE DOOR CALL AT A TIME.
 *
 * The place step's pin door (`set_listing_pin`) restates every line it does not
 * change: a directions save restates the street and the pin, a pin save restates
 * the street and the directions. Two calls in flight could each restate the
 * other's older value, and the one that landed second won. A queue runs the
 * step's door calls one after another, and each job builds what it restates when
 * it runs — after the job before it has answered and recorded its result — never
 * when it was queued.
 *
 * A job that throws rejects its own caller only; the next job still runs.
 */
export type DoorQueue = <T>(job: () => Promise<T>) => Promise<T>;

export function createDoorQueue(): DoorQueue {
  let tail: Promise<void> = Promise.resolve();
  return <T>(job: () => Promise<T>): Promise<T> => {
    const run = tail.then(job);
    tail = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  };
}
