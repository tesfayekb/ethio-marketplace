import { answerTokens } from "./answer-tokens";

/** The link condition a definition carries (D24): shown when `key` holds one of `in`. */
export interface VisibleWhen {
  key: string;
  in: string[];
}

function pickedValue(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (raw !== null && typeof raw === "object" && !Array.isArray(raw)) {
    const value = (raw as Record<string, unknown>)["value"];
    return typeof value === "string" ? value : "";
  }
  return "";
}

/**
 * D24 — IS THIS DETAIL ASKED FOR AT ALL? A link with no condition always is. A
 * condition is met when the sibling it names holds one of its listed answers —
 * a single answer, an `other` pick, or one of a multi-select's answers. The
 * door (`attr_visible_when_met`) decides the same way and DROPS a value sent
 * for an unmet link, so this is the mirror and never the authority (F3).
 * One reader for the specifications form and the price page's basis (DEC-109).
 */
export function conditionMet(
  def: { visibleWhen: VisibleWhen | null },
  values: Record<string, unknown>,
): boolean {
  const condition = def.visibleWhen;
  if (condition === null) return true;
  const held = values[condition.key];
  const picked = pickedValue(held);
  if (picked !== "") return condition.in.includes(picked);
  return Array.isArray(held) && answerTokens(held).some((entry) => condition.in.includes(entry));
}
