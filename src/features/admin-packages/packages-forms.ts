import { wholeNumber } from "@/features/admin-coverage/coverage-forms";
import {
  childrenOf,
  rootsOf,
  type CategoryNode,
  type CategoryTree,
} from "@/features/categories/category-tree";
import type { MessageKey } from "@/i18n";

import {
  PACKAGE_KEY_PATTERN,
  PACKAGE_LABEL_KEY_PATTERN,
  isPackageTier,
  type PackageRow,
  type SavePackageInput,
  type SavePriceInput,
} from "./packages-service";

/**
 * P-1 — the packages forms' judges: the doors' own rules mirrored so a surface
 * refuses before the round trip (the door remains the authority, F3), every
 * number read through the plans console's typed parse (ruling 1 answer 10: a
 * blank or non-numeric field is a refusal, never 0).
 */

/* ------------------------------- the package ------------------------------ */

export interface PackageFormValues {
  key: string;
  tier: string;
  days: string;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  labelKey: string;
  /** Digits only (the field filters its input); blank keeps the stored order. */
  sort: string;
}

export const NEW_PACKAGE_FORM: PackageFormValues = {
  key: "",
  tier: "featured",
  days: "",
  enabled: true,
  selfServe: true,
  extendsLifetime: true,
  labelKey: "",
  sort: "",
};

/** The form as a stored row shows it (the editor's opening values). */
export function packageFormOf(row: PackageRow): PackageFormValues {
  return {
    key: row.key,
    tier: row.tier,
    days: String(row.days),
    enabled: row.enabled,
    selfServe: row.selfServe,
    extendsLifetime: row.extendsLifetime,
    labelKey: row.labelKey ?? "",
    sort: String(row.sort),
  };
}

/** Ruling 1 (6) — the label key proposed for a new package until it is typed. */
export function defaultPackageLabelKey(key: string): string {
  return `package.${key.trim()}`;
}

export type PackageFormOutcome =
  | { ok: true; input: SavePackageInput }
  | { ok: false; key: MessageKey };

export function packageFormInput(values: PackageFormValues): PackageFormOutcome {
  const key = values.key.trim();
  if (!PACKAGE_KEY_PATTERN.test(key)) return { ok: false, key: "admin.packages.error.badKey" };
  if (!isPackageTier(values.tier)) return { ok: false, key: "admin.packages.error.unknownTier" };
  const days = wholeNumber(values.days);
  if (days === null || days < 1) return { ok: false, key: "admin.packages.error.badDays" };
  const label = values.labelKey.trim();
  if (!PACKAGE_LABEL_KEY_PATTERN.test(label)) {
    return { ok: false, key: "admin.packages.error.badLabelKey" };
  }
  // The field admits digits only, so a non-blank sort is always a whole number.
  const sort = values.sort.trim() === "" ? null : wholeNumber(values.sort);
  return {
    ok: true,
    input: {
      key,
      tier: values.tier,
      days,
      enabled: values.enabled,
      selfServe: values.selfServe,
      extendsLifetime: values.extendsLifetime,
      labelKey: label,
      sort,
    },
  };
}

/* -------------------------------- the price ------------------------------- */

export interface PriceFormValues {
  /** "" = every market. */
  countryCode: string;
  /** "" = every category. */
  categoryId: string;
  amount: string;
  currency: string;
  /** A day (YYYY-MM-DD) or "" = now. */
  validFrom: string;
  /** A day (YYYY-MM-DD) or "" = open-ended. */
  validTo: string;
}

export const NEW_PRICE_FORM: PriceFormValues = {
  countryCode: "",
  categoryId: "",
  amount: "0",
  currency: "",
  validFrom: "",
  validTo: "",
};

/** A money amount as typed: digits with up to two decimals; nothing else. */
export const AMOUNT_PATTERN = /^\d{1,10}(\.\d{1,2})?$/;

/**
 * A day as the door's instants: "Valid from" is the start of that day (today
 * = now, so the window never opens before the save), "Valid until" is the end
 * of that day — the start of the next one, exclusive, as the door reads it.
 */
export function dayStart(day: string, today: string): string | null {
  if (day === "" || day === today) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (match === null) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).toISOString();
}

export function dayEnd(day: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (match === null) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + 1).toISOString();
}

export type PriceFormOutcome = { ok: true; input: SavePriceInput } | { ok: false; key: MessageKey };

export function priceFormInput(
  packageKey: string,
  values: PriceFormValues,
  today: string,
): PriceFormOutcome {
  const amount = values.amount.trim();
  if (!AMOUNT_PATTERN.test(amount)) return { ok: false, key: "admin.packages.error.badAmount" };
  if (values.currency.trim() === "") {
    return { ok: false, key: "admin.packages.error.unknownCurrency" };
  }
  const from = dayStart(values.validFrom, today);
  const to = values.validTo === "" ? null : dayEnd(values.validTo);
  if (values.validTo !== "" && to === null)
    return { ok: false, key: "admin.packages.error.badWindow" };
  if (to !== null && to <= (from ?? new Date().toISOString())) {
    return { ok: false, key: "admin.packages.error.badWindow" };
  }
  return {
    ok: true,
    input: {
      packageKey,
      countryCode: values.countryCode === "" ? null : values.countryCode,
      categoryId: values.categoryId === "" ? null : values.categoryId,
      amount: Number(amount),
      currency: values.currency,
      validFrom: from,
      validTo: to,
    },
  };
}

/* ------------------------------ the category ------------------------------ */

/** The tree, depth first, each node with its depth for the select's indent. */
export function flattenTree(tree: CategoryTree): Array<{ node: CategoryNode; depth: number }> {
  const out: Array<{ node: CategoryNode; depth: number }> = [];
  const walk = (nodes: CategoryNode[], depth: number) => {
    for (const node of nodes) {
      out.push({ node, depth });
      walk(childrenOf(tree, node.id), depth + 1);
    }
  };
  walk(rootsOf(tree), 0);
  return out;
}
