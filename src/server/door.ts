import { doorRefusal } from "@/lib/door-error";
import {
  doorAnswer,
  ok,
  upstreamFailed,
  upstreamUnavailable,
  verdict,
  type Refusal,
} from "@/server/answer";
import { logRouteError } from "@/server/supabase/user-client";

/**
 * Foundations turn 3 (DEC-237) — THE DOOR-CALL ENVELOPE, copied once from
 * publish.ts as turn 2 landed it:
 *
 *   the door never reached (INC-574) → 503 upstream unavailable
 *   a door error                     → the verdict at 200: `translate`'s
 *                                      refusal when it answers (not logged —
 *                                      INC-368), else the door's own code
 *                                      (doorRefusal; a code is not logged,
 *                                      a sentence is and answers doorError)
 *   ok                               → doorAnswer(data), or the raw data
 *
 * The seed of the door mechanism (DEC-237's door turn), extended there; its
 * callers do not change.
 */
export type DoorResult = {
  data: unknown;
  error: { message: string } | null;
  status: number;
};

export async function doorCall(
  path: string,
  call: () => PromiseLike<DoorResult>,
  opts?: { translate?: (message: string) => Refusal | null; raw?: boolean },
): Promise<Response> {
  const { data, error, status } = await call();
  if (upstreamFailed(error, status)) {
    return upstreamUnavailable(path, "door", status);
  }
  if (error) {
    // INC-368 — an expected refusal is not a server error: a translated one is not logged.
    const translated = opts?.translate?.(error.message) ?? null;
    if (translated !== null) return verdict([translated]);
    const refusal = doorRefusal(error.message);
    // Ruling 4 (F1-5a) — a door's own machine code (`notYourListing`, `rateLimited`,
    // `illegalTransition:closed-reduced`) is a known refusal, not a server error: it reaches the
    // client as its reason and writes no log line (INC-368). `doorRefusal` keeps a code whole as
    // the reason, so a reason equal to the message is a code; a sentence no `translate` mapped
    // becomes `doorError` and is still logged, the message whole.
    if (refusal.reason === error.message.trim()) return verdict([refusal]);
    logRouteError(path, error.message);
    return verdict([refusal]);
  }
  return ok(opts?.raw === true ? data : doorAnswer(data));
}
