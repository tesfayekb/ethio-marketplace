import { ownValue } from "@/lib/own-key";
import { FACT_KEYS, type FactKey } from "./legal-service";
export const FACT_BOUNDS: Partial<Record<FactKey, readonly [number, number]>> = {
  liability_limit_usd: [0, 1_000_000],
  notice_days: [0, 365],
  response_days: [1, 90],
  response_extra_days: [0, 90],
  listed_ad_keep_months: [1, 120],
  deleted_ad_keep_months: [1, 120],
  dispute_keep_years: [0, 20],
  account_keep_months: [1, 120],
  technical_keep_months: [1, 120],
  sold_visible_days: [1, 365],
  appeal_months: [1, 24],
  claims_limit_months: [1, 60],
  talk_first_days: [1, 90],
  complaint_ack_days: [1, 90],
};
/** Facts that may be empty (sent as "", stored as nothing). */
export const OPTIONAL_FACTS: readonly FactKey[] = [
  "operator_details",
  "legal_phone",
  "copyright_agent",
];
const EMAIL_FACTS: readonly FactKey[] = ["legal_email", "privacy_email", "security_email"];
const PHONE = /^\+?[0-9][0-9 ()-]{4,37}[0-9]$/;
export type FactError = {
  type: "required" | "badEmail" | "badPhone" | "range" | "tooLong" | "shorterThanClaims";
  min?: number;
  max?: number;
};
export function validateLegalFacts(
  values: Record<string, string>,
): Partial<Record<FactKey, FactError>> {
  const errors: Partial<Record<FactKey, FactError>> = {};
  for (const key of FACT_KEYS) {
    const value = ownValue(values, key) ?? "";
    const bounds = ownValue(FACT_BOUNDS, key);
    if (bounds) {
      const [min, max] = bounds;
      if (
        !/^\d+$/.test(value) ||
        !Number.isSafeInteger(Number(value)) ||
        Number(value) < min ||
        Number(value) > max
      )
        errors[key] = { type: "range", min, max };
    } else if (!OPTIONAL_FACTS.includes(key) && !value.trim()) errors[key] = { type: "required" };
    else if (EMAIL_FACTS.includes(key) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value))
      errors[key] = { type: "badEmail" };
    else if (key === "legal_phone" && value.trim() !== "" && !PHONE.test(value))
      errors[key] = { type: "badPhone" };
    else if (value.length > 2000 && !EMAIL_FACTS.includes(key))
      errors[key] = { type: "tooLong", max: 2000 };
  }
  const accountMonths = Number(ownValue(values, "account_keep_months"));
  const claimsMonths = Number(ownValue(values, "claims_limit_months"));
  if (!errors.account_keep_months && !errors.claims_limit_months && accountMonths < claimsMonths)
    errors.account_keep_months = { type: "shorterThanClaims", min: claimsMonths };
  return errors;
}
