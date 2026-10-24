import { doorRefusal } from "@/features/posting/door-error";
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
 *                                      INC-368), else logged and the door's
 *                                      own code (doorRefusal)
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
    logRouteError(path, error.message);
    return verdict([doorRefusal(error.message)]);
  }
  return ok(opts?.raw === true ? data : doorAnswer(data));
}
