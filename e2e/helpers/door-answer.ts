/**
 * P-2 (a) ruling 14 item 2 (INC-1062) — A DOOR'S ANSWER, READ WHOLE. An envelope
 * door (a function whose body answers `{ ok: false, … }`) refuses in its answer,
 * not in the transport: a refusal comes back with `error` null, so a test that
 * reads only `error` passes a refusal as success. A test reads an envelope door's
 * answer through one of these two helpers:
 *
 * - `doorAnswer(result, what)` — the payload, only when `error` is null AND the
 *   payload's `ok` is true; otherwise it fails naming the transport error or the
 *   refusals' reasons;
 * - `doorRefusal(result, reason, what)` — the payload, only when `error` is null,
 *   `ok` is false and `reason` is among the refusals (a top-level `reason`, or a
 *   `refusals[].reason`); otherwise it fails naming what came back.
 *
 * A raised refusal (the door's RAISE, a permission denial) is the transport's
 * error, asserted as such by the spec. CF-DOOR-1
 * (scripts/conformance/door-answers.test.ts) derives the envelope doors from the
 * migrations and judges every e2e call of one.
 */

type Row = Record<string, unknown>;

/** A door call's result: the data API's `{ data, error }`, or an in-browser wrapper's copy of it. */
export type DoorResult = { data: unknown; error: unknown };

function isRow(value: unknown): value is Row {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function errorWords(error: unknown): string {
  if (typeof error === "string") return error;
  if (isRow(error) && typeof error["message"] === "string") return error["message"];
  return JSON.stringify(error);
}

/** Every reason the answer names: its own `reason` and each `refusals[].reason`. */
export function refusalReasons(answer: Row): string[] {
  const reasons: string[] = [];
  if (typeof answer["reason"] === "string") reasons.push(answer["reason"]);
  const refusals = answer["refusals"];
  if (Array.isArray(refusals)) {
    for (const refusal of refusals) {
      if (isRow(refusal) && typeof refusal["reason"] === "string") reasons.push(refusal["reason"]);
    }
  }
  return reasons;
}

function answerOf(result: DoorResult, what: string): Row {
  if (result.error !== null && result.error !== undefined)
    throw new Error(`[e2e:door] ${what}: the call failed: ${errorWords(result.error)}`);
  if (!isRow(result.data))
    throw new Error(`[e2e:door] ${what}: no answer object: ${JSON.stringify(result.data)}`);
  return result.data;
}

/** The door's answer when it said yes; any refusal fails here, by its reasons. */
export function doorAnswer(result: DoorResult, what: string): Row {
  const answer = answerOf(result, what);
  if (answer["ok"] !== true) {
    const reasons = refusalReasons(answer);
    throw new Error(
      `[e2e:door] ${what}: refused (${reasons.join(", ") || "no reason"}): ${JSON.stringify(answer)}`,
    );
  }
  return answer;
}

/** The door's answer when it refused with `reason`; a yes or another refusal fails here. */
export function doorRefusal(result: DoorResult, reason: string, what: string): Row {
  const answer = answerOf(result, what);
  if (answer["ok"] !== false)
    throw new Error(
      `[e2e:door] ${what}: expected the refusal ${reason}: ${JSON.stringify(answer)}`,
    );
  const reasons = refusalReasons(answer);
  if (!reasons.includes(reason))
    throw new Error(
      `[e2e:door] ${what}: expected the refusal ${reason}, got ${reasons.join(", ") || "no reason"}`,
    );
  return answer;
}
