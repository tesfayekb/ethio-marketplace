import type { Dial } from "@/lib/dials";
import { consumeRate, envDial, peekRate, type RateVerdict } from "@/server/supabase/user-client";

/**
 * Foundations turn 8 (DEC-237) — THE ONE SPEND. A registry dial (src/lib/dials.ts)
 * is spent or read here and nowhere else (scripts/conformance/dials.test.ts):
 * the limit is the env override when the entry names one (envDial's floor-of-1
 * rule), else the fallback; the window is passed as "<seconds> seconds", the
 * same epoch the replaced text had. Errors are consumeRate's own; each site
 * keeps its own answer.
 */
export function dialLimit(dial: Dial): number {
  return dial.limit.env !== undefined
    ? envDial(dial.limit.env, dial.limit.fallback)
    : dial.limit.fallback;
}

export function spend(dial: Dial, key: string): Promise<RateVerdict> {
  return consumeRate(dial.action, key, dialLimit(dial), `${dial.windowSeconds} seconds`);
}

export function peek(
  dial: Dial,
  key: string,
): Promise<Pick<RateVerdict, "remaining" | "resetsAt">> {
  return peekRate(dial.action, key, dialLimit(dial), `${dial.windowSeconds} seconds`);
}
