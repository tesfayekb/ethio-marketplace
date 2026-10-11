import type { MessageKey } from "@/i18n";
import type { PricingValues } from "@/features/posting/step-pricing";

import { moveErrorKey, moveProblem } from "./move-reasons";
import type { AdminListingDetail } from "./use-admin-listing";

/**
 * Bundle 11, the Listings console, turns L4a and L4b (D136, D140, DEC-173) —
 * what an admin's edit of the category, the specifications, the price, the
 * title and the description sends, and how the door's answers read.
 *
 * The door `admin_edit_listing(listing, changes, reason, note)` (turn L1, as
 * amended by DEC-173) is the authority: listings:enforce with a fresh second
 * factor, never a removed listing or the admin's own, and the seller's content
 * rules for what an admin can change. Only the changed fields travel; a price
 * travels whole (its six keys) so the door never mixes the old amount with a
 * new type.
 */

/**
 * The reasons this edit offers: the door's list without "A photo" (removing a
 * photo waits for photo display, D140). Turn L4b adds "Wrong category".
 */
export const EDIT_REASONS = [
  "wrong_category",
  "misleading",
  "contact_in_text",
  "rules",
  "other",
] as const;

export interface EditValues {
  /** Turn L4b — the leaf; null only for a listing that has none (never past a draft). */
  categoryId: string | null;
  /** Turn L4b — the specifications, keyed by `attr_key` as the door validates them. */
  attributes: Record<string, unknown>;
  title: string;
  description: string;
  price: PricingValues;
}

/**
 * The fields the form draws itself (the specifications' keys are added by the
 * form as it draws them); a refusal naming any other is listed above Save.
 */
export const FORM_FIELDS: readonly string[] = [
  "category_id",
  "title",
  "description",
  "price_mode",
  "price_amount",
  "price_currency",
  "price_period",
  "price_bp",
];

const PRICE_KEYS = [
  "price_mode",
  "price_amount",
  "price_currency",
  "price_period",
  "price_bp",
  "price_negotiable",
] as const;

/**
 * The form's starting values: the listing as it stands. `currency` fills a
 * price that has none (a free or contact price), so a switch to a fixed price
 * opens on the listing's own market money, never on the admin's.
 */
export function valuesOf(
  listing: AdminListingDetail["listing"],
  currency: string | null,
): EditValues {
  return {
    categoryId: listing.categoryId,
    attributes: listing.attributes,
    title: listing.title,
    description: listing.description,
    price: {
      priceMode: listing.priceMode,
      priceAmount: listing.priceAmount,
      priceCurrency: listing.priceCurrency ?? currency,
      pricePeriod: listing.pricePeriod,
      priceBp: listing.priceBp,
      priceNegotiable: listing.priceNegotiable,
      posterExpiresAt: "",
    },
  };
}

/**
 * The price as the door stores it: an amount and a currency only for a fixed
 * price, a commission only for a commission, the negotiable flag only on a
 * price with a figure (the door's own rules).
 */
export function priceSent(price: PricingValues): Record<(typeof PRICE_KEYS)[number], unknown> {
  const fixed = price.priceMode === "fixed";
  const commission = price.priceMode === "commission";
  return {
    price_mode: price.priceMode,
    price_amount: fixed ? price.priceAmount : null,
    price_currency: fixed ? price.priceCurrency : null,
    price_period: price.pricePeriod,
    price_bp: commission ? price.priceBp : null,
    price_negotiable: fixed || commission ? price.priceNegotiable : false,
  };
}

/** One answer set as text with its keys in order, so two equal sets compare equal. */
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const row = value as Record<string, unknown>;
    return `{${Object.keys(row)
      .filter((key) => row[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(row[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** True when two answer sets hold the same answers, whatever their keys' order. */
export function sameAnswers(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  return canonical(a) === canonical(b);
}

/**
 * What the edit sends: only what changed, the price whole; null when nothing did.
 *
 * Turn L4b — the category travels when another leaf was chosen; the
 * specifications travel when they differ from the listing's AND the admin
 * changed the category or worked in the specifications (`specsEdited`): the
 * seller's form fills a question's default and tidies hidden answers on its
 * own, and an admin who only opened the form must not send that tidying as an
 * edit.
 */
export function editChanges(
  listing: AdminListingDetail["listing"],
  values: EditValues,
  specsEdited = false,
): Record<string, unknown> | null {
  const out: Record<string, unknown> = {};
  const moved = values.categoryId !== null && values.categoryId !== listing.categoryId;
  if (moved) out["category_id"] = values.categoryId;
  if ((moved || specsEdited) && !sameAnswers(values.attributes, listing.attributes)) {
    out["attributes"] = values.attributes;
  }
  const title = values.title.trim();
  if (title !== listing.title) out["title"] = title;
  if (values.description !== listing.description) out["description"] = values.description;
  const before = priceSent(valuesOf(listing, null).price);
  const after = priceSent(values.price);
  if (PRICE_KEYS.some((key) => before[key] !== after[key])) Object.assign(out, after);
  return Object.keys(out).length === 0 ? null : out;
}

/** What is still missing before the edit can be sent; null when nothing is. */
export function editProblem(
  changes: Record<string, unknown> | null,
  reason: string,
  note: string,
): MessageKey | null {
  if (changes === null) return "admin.listings.edit.nothing";
  return moveProblem(reason, note);
}

/** The door's refusal, as the person reads it. */
export function editErrorKey(message: string): MessageKey {
  if (message === "nothing changed" || message === "nothing to change") {
    return "admin.listings.edit.nothing";
  }
  if (message === "a removed listing is not edited") return "admin.listings.edit.error.removed";
  if (message === "unknown reason") return "admin.listings.move.pickReason";
  return moveErrorKey(message);
}
