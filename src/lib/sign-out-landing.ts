import { errorText } from "@/lib/error-text";

/**
 * DEC-279 (INC-930, the operator's choice (b), 2026-10-27; Foundations turn 34c-4) — THE PAGE A
 * SIGN-OUT LANDS ON IS ON THE DEVICE BEFORE IT IS NEEDED. Every sign-out ends on "/" (app-shell's
 * hardReset, U0j). A tab opened on another page (/settings, /post) never downloaded the Home
 * page's code, so a sign-out made offline had nothing to draw there: the root's "This page didn't
 * load" view stayed until the connection returned (DEC-271's fresh load). For a signed-in visitor,
 * while the device is online, the Home route's code is fetched once per page life — about
 * 13.5 KB compressed, measured 2026-10-26: the Home page's own code beyond what every page already
 * loads. Signed-out visitors never fetch it: their sign-out cannot happen.
 *
 * A failed fetch changes nothing the person sees and is not retried — the browser answers a failed
 * download from its memory of the failure until the page reloads (INC-918), so a second try could
 * not help; it is logged, and an offline sign-out then shows the root's view as before INC-930's
 * fix. A stale page's failure is answered by stale-chunk.ts's one reload, as any download's is.
 */

/** DEC-279 — the page every sign-out lands on (app-shell's hard reset, U0j); named once (turn C2). */
export const SIGN_OUT_LANDING = "/" as const;

export type HomeAheadState = "idle" | "loading" | "ready" | "failed";

export interface HomeAhead {
  /** Where the one fetch stands. */
  state(): HomeAheadState;
  /** The shell's reading: starts the one fetch for a signed-in visitor while online. */
  consider(signedIn: boolean, online: boolean): void;
}

/**
 * `load` fetches the Home route's code (the router's `loadRouteChunk` for "/"); `report` hears
 * every change of state (the E2E build shows it to the tests, SO-13).
 */
export function createHomeAhead(
  load: () => Promise<void> | undefined,
  report: (state: HomeAheadState) => void = () => undefined,
): HomeAhead {
  let state: HomeAheadState = "idle";
  const set = (next: HomeAheadState) => {
    state = next;
    report(next);
  };
  return {
    state: () => state,
    consider(signedIn, online) {
      if (state !== "idle" || !signedIn || !online) return;
      set("loading");
      Promise.resolve()
        .then(load)
        .then(
          () => set("ready"),
          (error: unknown) => {
            console.warn(`[home-ahead] the Home page's code did not download: ${errorText(error)}`);
            set("failed");
          },
        );
    },
  };
}
