import { useState } from "react";

import type { Pin } from "./pin";

/**
 * Turn C1-2's MINOR-4 (Foundations turn C2) — the pin as ONE value (pin.ts) that keeps its
 * identity while its point and precision stay the same, so an effect keyed on it runs when the
 * pin changes, not when a render hands an equal copy. The held value is replaced in the render
 * that sees a different pin (React's "value from the previous render"), equality-guarded.
 */
export function useSteadyPin(pin: Pin | null): Pin | null {
  const [steady, setSteady] = useState(pin);
  const same =
    steady === pin ||
    (steady !== null &&
      pin !== null &&
      steady.lat === pin.lat &&
      steady.lng === pin.lng &&
      steady.precision === pin.precision);
  if (!same) setSteady(pin);
  return same ? steady : pin;
}
