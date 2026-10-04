import type { PricePeriod } from "./types";
import { conditionMet, type VisibleWhen } from "./visible-when";

/**
 * DEC-079 / D31 — THE PRICING BASIS DECIDES THE PRICE'S SHAPE.
 *
 * A leaf that carries ONE pricing-basis attribute (`pricing_type…` or
 * `unit_of_sale…`) lets the seller's answer to it decide two things: whether
 * the price type is forced (a quote is "contact", a commission is a percentage)
 * and which period the price runs per. This table is the client MIRROR of
 * `public.price_shape_for_basis` (migration e91792f9) — `price-basis.test.ts`
 * parses that SQL and fails if the two ever disagree. The door is the authority
 * (F3): it refuses `modeFollowsBasis` / `periodFollowsBasis` by itself.
 *
 * A token not listed is a unit (per_quintal, per_kg, fixed, …): no forced type,
 * period `once`.
 */

export type ForcedMode = "contact" | "commission";

export interface PriceShape {
  forcedMode: ForcedMode | null;
  /** `null` = the category's own default period (the SQL's NULL arm: quote). */
  period: PricePeriod | null;
  /** DEC-081 — this basis switches the "Price is negotiable" toggle on (the seller may undo it). */
  negotiable?: true;
}

export const PRICE_BASIS_SHAPE: Readonly<Record<string, PriceShape>> = {
  hourly: { forcedMode: null, period: "hour" },
  per_hour: { forcedMode: null, period: "hour" },
  per_day: { forcedMode: null, period: "day" },
  per_night: { forcedMode: null, period: "day" },
  per_week: { forcedMode: null, period: "week" },
  per_month: { forcedMode: null, period: "month" },
  per_year: { forcedMode: null, period: "year" },
  quote: { forcedMode: "contact", period: null },
  negotiable: { forcedMode: null, period: "once", negotiable: true },
  commission: { forcedMode: "commission", period: "once" },
};

const UNIT: PriceShape = { forcedMode: null, period: "once" };

export function priceShapeFor(token: string): PriceShape {
  return Object.prototype.hasOwnProperty.call(PRICE_BASIS_SHAPE, token)
    ? PRICE_BASIS_SHAPE[token]
    : UNIT;
}

/**
 * The basis answer as the draft stores it: a plain token, or `{ value }` when
 * the `other` canonicalisation wrapped it — the door reads the same two shapes.
 */
export function basisToken(answer: unknown): string | null {
  const raw =
    typeof answer === "string"
      ? answer
      : answer !== null && typeof answer === "object" && !Array.isArray(answer)
        ? (answer as Record<string, unknown>)["value"]
        : null;
  return typeof raw === "string" && raw.trim() !== "" ? raw : null;
}

/**
 * A commission in basis points as a percentage: at most two decimals, trailing
 * zeros dropped (1250 → "12.5", 1000 → "10", 1234 → "12.34"). Digits stay
 * Western in every language — the same digits the seller typed.
 */
export function formatCommission(bp: number, _lang?: string): string {
  const whole = Math.trunc(bp / 100);
  const cents = Math.abs(bp % 100);
  if (cents === 0) return String(whole);
  const frac = String(cents).padStart(2, "0").replace(/0+$/, "");
  return `${bp < 0 && whole === 0 ? "-" : ""}${whole}.${frac}`;
}

/** A typed percentage → basis points; `null` for anything not a number. */
export function percentToBp(percent: number | null): number | null {
  if (percent === null || !Number.isFinite(percent)) return null;
  return Math.round(percent * 100);
}

/**
 * INC-297 — THE BASIS LABEL ALREADY SAYS "PER". An option label such as
 * "Per Kg" / "በኪሎ" carries its own preposition, and every template adds one
 * ("Price per {basis}", "ዋጋ በ{basis}"). The noun is the label with ONE leading
 * "Per " (any case, any whitespace) or ONE leading "በ" removed; a label with
 * neither ("Fixed Price (per job)", "Commission (%)") has no noun: `null`.
 */
export function basisNoun(label: string): string | null {
  const trimmed = label.trim();
  const en = /^per\s+/i.exec(trimmed);
  if (en !== null) {
    const noun = trimmed.slice(en[0].length).trim();
    return noun === "" ? null : noun;
  }
  if (trimmed.startsWith("በ")) {
    const noun = trimmed.slice(1).trim();
    return noun === "" ? null : noun;
  }
  return null;
}

/**
 * N2 — GOODS DETECTION, the server's own rule: `public.price_basis_keys`
 * matches `^(pricing_type|unit_of_sale)(-|$)` (migration e91792f9:58). A goods
 * basis is the `unit_of_sale` arm, bare key included.
 */
export const UNIT_OF_SALE_KEY = /^unit_of_sale(-|$)/;

export function isUnitOfSaleKey(key: string | null): boolean {
  return key !== null && UNIT_OF_SALE_KEY.test(key);
}

/** The `pricing_type` family: a rent or hire period (DEC-109). */
const PRICING_TYPE_KEY = /^pricing_type(-|$)/;

/**
 * DEC-109 step 7 — THE BASIS IN FORCE, the client mirror of
 * `public.price_basis_in_force` (M5). Candidates are the category's basis keys
 * (the door's `deal.basis` list) whose link condition is met under the answers;
 * a link with no condition is always a candidate. One candidate: that key.
 * Several: the one `pricing_type` key when exactly one exists (a rent period
 * outranks a unit of sale), otherwise ambiguous. None: null. The door judges
 * `priceBasisAmbiguous` itself (F3).
 */
export function basisInForce(
  definitions: readonly { attrKey: string; visibleWhen: VisibleWhen | null }[],
  answers: Record<string, unknown>,
  basisKeys: readonly string[],
): { key: string | null; ambiguous: boolean } {
  const candidates = basisKeys.filter((key) => {
    const def = definitions.find((entry) => entry.attrKey === key);
    return def !== undefined && conditionMet(def, answers);
  });
  if (candidates.length === 0) return { key: null, ambiguous: false };
  if (candidates.length === 1) return { key: candidates[0], ambiguous: false };
  const periods = candidates.filter((key) => PRICING_TYPE_KEY.test(key));
  if (periods.length === 1) return { key: periods[0], ambiguous: false };
  return { key: null, ambiguous: true };
}
