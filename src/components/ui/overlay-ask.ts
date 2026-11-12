import { reportOnDemandFailure } from "@/lib/on-demand-failure";

import { loadOverlays } from "./overlay-loader";

/**
 * DEC-288 (turn R1b) — the sub-menu trigger's way to the overlay module: the same loader
 * and the same notice as every facade here, so the rail adds no second path (and no
 * chunk of its own). `asked`: a person's press or key, whose failure the notice reports.
 */
export function askOverlays(asked: boolean, onFail?: () => void): void {
  loadOverlays().catch((error: unknown) => {
    onFail?.();
    if (asked) reportOnDemandFailure("a menu's code", error);
  });
}
