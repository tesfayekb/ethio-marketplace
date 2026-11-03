import {
  childrenOf,
  rootsOf,
  type CategoryNode,
  type CategoryTree,
} from "@/features/categories/category-tree";
import type { MessageKey } from "@/i18n";

import { wholeNumber } from "./monetisation-forms";
import type { PriceRow, SavePriceInput } from "./monetisation-service";

/**
 * P-1b — the price form's judge (Add and Edit share it), the day boundaries
 * the door reads, and the category tree flattened for a select. The amount
 * is typed and sent as data: nothing here computes a price (CF-PRICE-1).
 */

export interface PriceFormValues {
  /** The product, picked first; "" until picked. */
  packageKey: string;
  /** "" = every market. */
  countryCode: string;
  /** "" = every category. */
  categoryId: string;
  amount: string;
  currency: string;
  creditCost: string;
  /** A day (YYYY-MM-DD) or "" = now. */
  validFrom: string;
  /** A day (YYYY-MM-DD) or "" = open-ended. */
  validTo: string;
}

export const NEW_PRICE_FORM: PriceFormValues = {
  packageKey: "",
  countryCode: "",
  categoryId: "",
  amount: "0",
  currency: "",
  creditCost: "0",
  validFrom: "",
  validTo: "",
};

/** A day as the local clock spells an instant (the editor's opening values). */
function dayOf(iso: string): string {
  const date = new Date(iso);
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * The form as a stored row shows it. The end instant is the start of the day
 * after the last day (`dayEnd`), so the field shows that last day.
 */
export function priceFormOf(row: PriceRow): PriceFormValues {
  let validTo = "";
  if (row.validTo !== null) {
    const lastDay = new Date(row.validTo);
    lastDay.setDate(lastDay.getDate() - 1);
    validTo = dayOf(lastDay.toISOString());
  }
  return {
    packageKey: row.packageKey,
    countryCode: row.countryCode ?? "",
    categoryId: row.categoryId ?? "",
    amount: String(row.amount),
    currency: row.currency,
    creditCost: String(row.creditCost),
    validFrom: dayOf(row.validFrom),
    validTo,
  };
}

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

/**
 * The judge. On an edit the stored start may lie in the past: `keptFromDay` is
 * the row's own opening day; left on it, the start is not sent and the door
 * keeps the stored instant (`coalesce(p_valid_from, old.valid_from)`).
 */
export function priceFormInput(
  values: PriceFormValues,
  today: string,
  keptFromDay: string | null = null,
): PriceFormOutcome {
  if (values.packageKey === "") return { ok: false, key: "admin.packages.error.unknownPackage" };
  const amount = values.amount.trim();
  if (!AMOUNT_PATTERN.test(amount)) return { ok: false, key: "admin.packages.error.badAmount" };
  const creditCost = wholeNumber(values.creditCost);
  if (creditCost === null || creditCost < 0) {
    return { ok: false, key: "admin.monetisation.error.badCreditCost" };
  }
  if (values.currency.trim() === "") {
    return { ok: false, key: "admin.packages.error.unknownCurrency" };
  }
  const kept = keptFromDay !== null && values.validFrom === keptFromDay;
  const from = kept ? null : dayStart(values.validFrom, today);
  const to = values.validTo === "" ? null : dayEnd(values.validTo);
  if (values.validTo !== "" && to === null)
    return { ok: false, key: "admin.packages.error.badWindow" };
  // A kept start may lie in the past; the door judges that window against it.
  if (!kept && to !== null && to <= (from ?? new Date().toISOString())) {
    return { ok: false, key: "admin.packages.error.badWindow" };
  }
  return {
    ok: true,
    input: {
      packageKey: values.packageKey,
      countryCode: values.countryCode === "" ? null : values.countryCode,
      categoryId: values.categoryId === "" ? null : values.categoryId,
      amount: Number(amount),
      currency: values.currency,
      creditCost,
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
