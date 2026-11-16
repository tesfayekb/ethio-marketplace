import type { FormGate } from "@/components/forms/use-form-gate";
import { parseNumber } from "@/lib/parse-input";
import type { Refusal } from "@/lib/refusal";

import type { CategoryFormValues } from "./category-form-fields";

export function emptyCategoryForm(): CategoryFormValues {
  return {
    nameEn: "",
    icon: "",
    parentId: "",
    allowListings: true,
    priceEnabled: true,
    expiryDays: "",
    visibleFrom: "",
    visibleUntil: "",
    excludedCodes: [],
    positionBefore: "",
  };
}

/** Each answer's refusal (the gate's mark or the parser's), by the door's field name. */
export type CategoryFormRefusals = Partial<Record<keyof CategoryFormValues, Refusal>>;

/**
 * DEC-339 (INC-1180) — the form's one typed number, read by the one parser (src/lib/parse-input.ts):
 * the expiry is a whole number of days of at least 1 (the table's `expiry_days IS NULL OR
 * expiry_days > 0`, read by `cat_int`), or blank — no expiry (null, INC-143). An unreadable
 * answer is a `badType` refusal under its own field, never a guessed value.
 */
export function readCategoryNumbers(
  values: CategoryFormValues,
): { ok: true; expiryDays: number | null } | { ok: false; refusals: CategoryFormRefusals } {
  const expiry = parseNumber(values.expiryDays, { integer: true, min: 1 });
  if (expiry.kind === "invalid") {
    return { ok: false, refusals: { expiryDays: { field: "expiryDays", reason: "badType" } } };
  }
  return { ok: true, expiryDays: expiry.kind === "number" ? expiry.value : null };
}

/** The gate's marks and the parser's refusals, one per field (the parser's wins once tried). */
export function categoryRefusals(
  gate: FormGate,
  parsed: CategoryFormRefusals,
): CategoryFormRefusals {
  const marked: CategoryFormRefusals = {};
  for (const mark of gate.marks) {
    if (mark.field in EMPTY_VALUES) marked[mark.field as keyof CategoryFormValues] = mark;
  }
  return { ...marked, ...parsed };
}

const EMPTY_VALUES: Record<keyof CategoryFormValues, true> = {
  nameEn: true,
  icon: true,
  parentId: true,
  allowListings: true,
  priceEnabled: true,
  expiryDays: true,
  visibleFrom: true,
  visibleUntil: true,
  excludedCodes: true,
  positionBefore: true,
};
