import { ownValue } from "@/lib/own-key";
import { FACT_KEYS, type FactKey } from "./legal-service";
export const FACT_BOUNDS: Partial<Record<FactKey, readonly [number, number]>> = {
  liability_limit_usd: [0, 1_000_000],
  notice_days: [0, 365],
  response_days: [1, 90],
  response_extra_days: [0, 90],
  deleted_ad_keep_months: [1, 120],
  dispute_keep_years: [0, 20],
};
export type FactError = {
  type: "required" | "badEmail" | "range" | "tooLong";
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
    } else if (key !== "copyright_agent" && !value.trim()) errors[key] = { type: "required" };
    else if (
      (key === "legal_email" || key === "privacy_email") &&
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
    )
      errors[key] = { type: "badEmail" };
    else if (value.length > 2000 && key !== "legal_email" && key !== "privacy_email")
      errors[key] = { type: "tooLong", max: 2000 };
  }
  return errors;
}
