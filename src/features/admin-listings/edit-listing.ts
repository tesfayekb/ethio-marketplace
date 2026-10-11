import type { MessageKey } from "@/i18n";
import type { PricingValues } from "@/features/posting/step-pricing";

import { moveErrorKey, moveProblem } from "./move-reasons";
import type { AdminListingDetail } from "./use-admin-listing";

/**
 * Bundle 11, the Listings console, turn L4a (D136, D140, DEC-173) — what an
 * admin's edit of the title, the description and the price sends, and how the
 * door's answers read.
 *
 * The door `admin_edit_listing(listing, changes, reason, note)` (turn L1, as
 * amended by DEC-173) is the authority: listings:enforce with a fresh second
 * factor, never a removed listing or the admin's own, and the seller's content
 * rules for what an admin can change. Only the changed fields travel; a price
 * travels whole (its six keys) so the door never mixes the old amount with a
 * new type.
 */

/**
 * The reasons this edit offers: the door's list without "Wrong category" (the
 * category is turn L4b) and "A photo" (removing a photo waits for photo
 * display, D140).
 */
export const EDIT_REASONS = ["misleading", "contact_in_text", "rules", "other"] as const;

export interface EditValues {
  title: string;
  description: string;
  price: PricingValues;
}

/** The fields the form draws itself; a refusal naming any other is listed above Save. */
export const FORM_FIELDS: readonly string[] = [
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

/** What the edit sends: only what changed, the price whole; null when nothing did. */
export function editChanges(
  listing: AdminListingDetail["listing"],
  values: EditValues,
): Record<string, unknown> | null {
  const out: Record<string, unknown> = {};
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
