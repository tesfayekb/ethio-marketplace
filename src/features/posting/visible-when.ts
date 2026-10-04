import { answerTokens } from "./answer-tokens";

/** One pair of a condition: shown when `key` holds one of `in`. */
export interface ConditionPair {
  key: string;
  in: string[];
}

/**
 * The link condition a definition carries (D24, INC-381): one pair, and at most
 * one `and` pair beside it. The inner pair holds key and in only, and its key
 * differs from the outer one — the door (`attr_visible_when_ok`) refuses
 * anything else, so this shape is its mirror.
 */
export interface VisibleWhen extends ConditionPair {
  and?: ConditionPair;
}

function shapePair(raw: unknown): ConditionPair | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const key = typeof row["key"] === "string" ? row["key"] : "";
  const values = Array.isArray(row["in"])
    ? (row["in"] as unknown[]).filter((entry): entry is string => typeof entry === "string")
    : [];
  if (key === "" || values.length === 0) return null;
  return { key, in: values };
}

/**
 * THE ONE READER of a stored condition (posting schema and admin roster alike).
 * A condition is used ONLY when every pair carries both halves; anything else is
 * "always asked", so a malformed row can never hide a question silently. An
 * `and` member that is present but malformed makes the whole condition unusable.
 */
export function shapeCondition(raw: unknown): VisibleWhen | null {
  const outer = shapePair(raw);
  if (outer === null) return null;
  const inner = (raw as Record<string, unknown>)["and"];
  if (inner === undefined || inner === null) return outer;
  const second = shapePair(inner);
  if (second === null || second.key === outer.key) return null;
  return { ...outer, and: second };
}

function pickedValue(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (raw !== null && typeof raw === "object" && !Array.isArray(raw)) {
    const value = (raw as Record<string, unknown>)["value"];
    return typeof value === "string" ? value : "";
  }
  return "";
}

function pairMet(pair: ConditionPair, values: Record<string, unknown>): boolean {
  const held = values[pair.key];
  const picked = pickedValue(held);
  if (picked !== "") return pair.in.includes(picked);
  return Array.isArray(held) && answerTokens(held).some((entry) => pair.in.includes(entry));
}

/**
 * D24 — IS THIS DETAIL ASKED FOR AT ALL? A link with no condition always is. A
 * pair is met when the sibling it names holds one of its listed answers — a
 * single answer, an `other` pick, or one of a multi-select's answers; with an
 * `and` pair, both must be met. The door (`attr_visible_when_met`) decides the
 * same way and DROPS a value sent for an unmet link, so this is the mirror and
 * never the authority (F3). One reader for the form, the title and the price page.
 */
export function conditionMet(
  def: { visibleWhen: VisibleWhen | null },
  values: Record<string, unknown>,
): boolean {
  const condition = def.visibleWhen;
  if (condition === null) return true;
  if (!pairMet(condition, values)) return false;
  return condition.and === undefined || pairMet(condition.and, values);
}
