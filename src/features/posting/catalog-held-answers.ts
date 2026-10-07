/**
 * Bundle 7 D5 (INC-479) — WHAT THE CATALOGUE NO LONGER HAS, THE FORM NO LONGER HOLDS.
 *
 * The door lets go of an answer whose question (or option) was removed only
 * while the stored row still holds it; the form sends its whole answer set on
 * every save, so a stale answer it keeps would be refused on the NEXT save.
 * Two pure rules, one concern:
 *
 *  - `keepListedAnswers` (rule 1) — given the draft's OWN category's question
 *    list from a read that SUCCEEDED, the answers to keep: a key the list no
 *    longer has is dropped (a); a single choice whose value the question's
 *    options (offered and switched-off together) no longer hold is dropped (b);
 *    an entry of a multiple choice likewise (c). An "other" write-in is never
 *    dropped. A failed read, a list read for another category, or a read still
 *    in the air returns the answers unchanged.
 *  - `dropRefusedAnswers` (rule 2) — the door's own word: drop exactly what an
 *    `unknownAttribute` / `unknownOption` refusal named, when the form holds it.
 */

import type { AttrDef } from "./posting-service";

export type QuestionListRead =
  | { state: "pending" }
  | { state: "failed" }
  | {
      state: "ok";
      categoryId: string;
      definitions: readonly Pick<AttrDef, "attributeId" | "attrKey" | "attrType">[];
    };

type Answers = Record<string, unknown>;

/** An "other" write-in: the bare value or its `{ value: "other", text }` object. */
function isOther(entry: unknown): boolean {
  if (entry === "other") return true;
  return (
    entry !== null &&
    typeof entry === "object" &&
    !Array.isArray(entry) &&
    (entry as Record<string, unknown>)["value"] === "other"
  );
}

/**
 * Rule 1. `optionsByKey` holds, per choice question, every value its list has
 * (offered and switched-off) from a read that succeeded; a question absent from
 * it (or `null`) was not read successfully, so its answer is left alone.
 * Returns the SAME object when nothing is dropped.
 */
export function keepListedAnswers(input: {
  answers: Answers;
  categoryId: string | null;
  read: QuestionListRead;
  optionsByKey: Readonly<Record<string, readonly string[] | null | undefined>>;
}): Answers {
  const { answers, categoryId, read, optionsByKey } = input;
  if (read.state !== "ok" || categoryId === null || read.categoryId !== categoryId) {
    return answers;
  }
  const byKey = new Map(read.definitions.map((def) => [def.attrKey, def]));
  let changed = false;
  const out: Answers = {};
  for (const [key, value] of Object.entries(answers)) {
    const def = byKey.get(key);
    if (def === undefined) {
      changed = true; // (a)
      continue;
    }
    const listed = optionsByKey[key];
    if (listed === null || listed === undefined) {
      out[key] = value;
      continue;
    }
    const has = new Set(listed);
    if (def.attrType === "single_select" && typeof value === "string" && !isOther(value)) {
      if (!has.has(value)) {
        changed = true; // (b)
        continue;
      }
    }
    if (def.attrType === "multi_select" && Array.isArray(value)) {
      const kept = value.filter(
        (entry) => isOther(entry) || typeof entry !== "string" || has.has(entry),
      );
      if (kept.length !== value.length) {
        changed = true; // (c)
        if (kept.length > 0) out[key] = kept;
        continue;
      }
    }
    out[key] = value;
  }
  return changed ? out : answers;
}

export interface NamedRefusal {
  field: string;
  reason: string;
  detail?: string;
}

/**
 * Rule 2. Drops what an `unknownAttribute` (the key) or `unknownOption` (the
 * value in `detail`: a single choice whole, one entry of a list) refusal named,
 * when the form holds it. `null` when no refusal names anything held.
 */
export function dropRefusedAnswers(
  answers: Answers,
  refusals: readonly NamedRefusal[],
): Answers | null {
  let out: Answers | null = null;
  for (const refusal of refusals) {
    const current: Answers = out ?? answers;
    const held = current[refusal.field];
    if (held === undefined) continue;
    if (refusal.reason === "unknownAttribute") {
      const { [refusal.field]: _gone, ...rest } = current;
      out = rest;
      continue;
    }
    if (refusal.reason !== "unknownOption" || refusal.detail === undefined) continue;
    if (typeof held === "string" && held === refusal.detail) {
      const { [refusal.field]: _gone, ...rest } = current;
      out = rest;
    } else if (Array.isArray(held) && held.includes(refusal.detail)) {
      const kept = held.filter((entry) => entry !== refusal.detail);
      const { [refusal.field]: _gone, ...rest } = current;
      out = kept.length > 0 ? { ...rest, [refusal.field]: kept } : rest;
    }
  }
  return out;
}
