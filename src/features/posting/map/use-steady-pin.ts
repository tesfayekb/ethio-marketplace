import { useState } from "react";

import { samePin, type Pin } from "./pin";

/**
 * Turn C1-2's MINOR-4 (Foundations turn C2) — the pin as ONE value (pin.ts) that keeps its
 * identity while its point and precision stay the same (`samePin`), so an effect keyed on it runs
 * when the pin changes, not when a render hands an equal copy. The held value is replaced in the
 * render that sees a different pin (React's "value from the previous render"), equality-guarded.
 */
export function useSteadyPin(pin: Pin | null): Pin | null {
  const [steady, setSteady] = useState(pin);
  const same = samePin(steady, pin);
  if (!same) setSteady(pin);
  return same ? steady : pin;
}
