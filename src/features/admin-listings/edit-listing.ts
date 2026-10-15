import type { MessageKey } from "@/i18n";
import type { PricingValues } from "@/features/posting/step-pricing";
import { sameChannels } from "@/features/posting/step-who";

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
 * The reasons this edit offers: the door's list without "Inappropriate photo"
 * (code `photo`; a photo is removed with its own Remove, D154 B4). Turn L4b added
 * "Wrong category"; D172 (the operator, 2026-10-14) takes it out again — an edit
 * never changes the category, and an ad in the wrong category is sent back to
 * review with that reason.
 */
export const EDIT_REASONS = ["misleading", "contact_in_text", "rules", "other"] as const;

/**
 * Bundle 16 turn R2 (D172) — the fields an edit reads from the ad: the admin's
 * detail and the seller's own ad alike (the seller's form is this form, with its
 * photos box and without a reason). `videoUrl` is the seller's own box; an
 * admin's edit never sends it.
 */
export type EditableListing = Pick<
  AdminListingDetail["listing"],
  | "categoryId"
  | "attributes"
  | "title"
  | "description"
  | "priceMode"
  | "priceAmount"
  | "priceCurrency"
  | "pricePeriod"
  | "priceBp"
  | "priceNegotiable"
  | "priceUnit"
  | "priceUnitText"
  | "countryCode"
> & {
  videoUrl?: string | null;
  /**
   * Bundle 16 turn E2b (D187) — the seller's places, contact and place text,
   * as the ad holds them (the seller's form only; an admin's edit never sends
   * them): the place ids in order (the first is the ad's own), the channels in
   * `listing_contact_refusals` shape, the street line and the directions line.
   */
  coverage?: string[];
  contactPref?: Record<string, unknown>;
  streetAddress?: string | null;
  directions?: string | null;
};

export interface EditValues {
  /** Turn L4b — the leaf; null only for a listing that has none (never past a draft). */
  categoryId: string | null;
  /** Turn L4b — the specifications, keyed by `attr_key` as the door validates them. */
  attributes: Record<string, unknown>;
  title: string;
  description: string;
  price: PricingValues;
  /** Turn R2 — the video link, beside the photos (the seller's box only). */
  videoUrl: string;
  /** Turn E2b (D187) — the places in order, the channels, the two text lines (the seller's boxes only). */
  coverage: string[];
  contactPref: Record<string, unknown>;
  streetAddress: string;
  directions: string;
}

/** Turn E2b — what the seller worked in, so a box only looked at never sends its own tidying. */
export interface EditedBoxes {
  /** The seller tapped or typed inside the Place box. */
  place?: boolean;
  /** The seller tapped or typed inside the Contact box. */
  contact?: boolean;
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
  // Turn E2b — the Place box's own fields (the contact's land under `contact_pref.<channel>`).
  "coverage",
  "street_address",
  "directions",
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
export function valuesOf(listing: EditableListing, currency: string | null): EditValues {
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
    videoUrl: listing.videoUrl ?? "",
    coverage: listing.coverage ?? [],
    contactPref: listing.contactPref ?? {},
    streetAddress: listing.streetAddress ?? "",
    directions: listing.directions ?? "",
  };
}

/** True when two place lists name the same places in the same order. */
export function samePlaces(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, index) => id === b[index]);
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
 *
 * Bundle 16 turn E2b (D187) — the seller's places travel when the list differs
 * AND the seller worked in the Place box (`edited.place`: the place step settles
 * its rows on its own); the channels when they differ (`sameChannels`) AND the
 * seller worked in the Contact box (`edited.contact`: the contact step carries
 * the profile's channels into an ad that has none); the street line and the
 * directions line whenever they differ (typed text, so the door reviews them).
 * The door applies places and channels at once and sends a changed line to
 * review (edit_my_listing, turn E2a).
 */
export function editChanges(
  listing: EditableListing,
  values: EditValues,
  specsEdited = false,
  edited: EditedBoxes = {},
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
  // Turn R2 — the seller's video link travels when it changed (an empty box removes it).
  const video = values.videoUrl.trim();
  if (video !== (listing.videoUrl ?? "")) out["video_url"] = video === "" ? null : video;
  // Turn E2b — the places and the channels, only when the seller worked in their box.
  if (edited.place === true && !samePlaces(values.coverage, listing.coverage ?? [])) {
    out["coverage"] = values.coverage;
  }
  if (edited.contact === true && !sameChannels(values.contactPref, listing.contactPref ?? {})) {
    out["contact_pref"] = values.contactPref;
  }
  const street = values.streetAddress.trim();
  if (street !== (listing.streetAddress ?? ""))
    out["street_address"] = street === "" ? null : street;
  const directions = values.directions.trim();
  if (directions !== (listing.directions ?? "")) {
    out["directions"] = directions === "" ? null : directions;
  }
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
