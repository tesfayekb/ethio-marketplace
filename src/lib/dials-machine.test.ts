import { describe, expect, it } from "vitest";

import { DIALS } from "./dials";
import { TRANSLATE_MAX_ITEMS } from "./schemas/translate";

/**
 * D1 M5a (INC-951 3b) — the machine writers' per-key dial is sized from the
 * press: one press writes at most TRANSLATE_MAX_ITEMS keys, so the writers'
 * hourly ceiling is that batch times the presses an hour allows.
 */
describe("the machine-translate dials", () => {
  it("DMT-1 staff_machine_translation = TRANSLATE_MAX_ITEMS × machineTranslatePress, in the same window", () => {
    expect(DIALS.staffMachineTranslation.limit.fallback).toBe(
      TRANSLATE_MAX_ITEMS * DIALS.machineTranslatePress.limit.fallback,
    );
    expect(DIALS.staffMachineTranslation.windowSeconds).toBe(
      DIALS.machineTranslatePress.windowSeconds,
    );
  });

  it("DMT-2 the staff dials hold the ruled sizes", () => {
    expect(DIALS.staffModeration.limit.fallback).toBe(600);
    expect(DIALS.staffTranslation.limit.fallback).toBe(2000);
    expect(DIALS.staffModeration.windowSeconds).toBe(3600);
    expect(DIALS.staffTranslation.windowSeconds).toBe(3600);
  });
});
