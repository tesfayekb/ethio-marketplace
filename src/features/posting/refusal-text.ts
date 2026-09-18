import type { MessageKey } from "@/i18n";

import type { Refusal } from "./types";

/**
 * U6-C1a — THE DOORS' VOCABULARY, IN WORDS (D1 + F4).
 *
 * The routes and doors answer in a fixed machine vocabulary (`required`,
 * `coverageExceedsPlan:city`, `not_a_photo`, …). Nothing user-visible may be a
 * literal string, and nothing may be a raw reason code shown to a seller, so
 * every reason is mapped to a `post.refusal.*` / `post.photo.refusal.*` key
 * here — in ONE place, so a new reason is a one-line addition and an unmapped
 * reason degrades to a translated fallback rather than leaking the code.
 */

/** `coverageExceedsPlan:city` and `tooLong:120` carry a detail after the colon. */
function base(reason: string): string {
  const colon = reason.indexOf(":");
  return colon === -1 ? reason : reason.slice(0, colon);
}

const DRAFT_REASONS: Record<string, MessageKey> = {
  required: "post.refusal.required",
  badValue: "post.refusal.badValue",
  badShape: "post.refusal.badShape",
  tooLong: "post.refusal.tooLong",
  mustBeEmpty: "post.refusal.mustBeEmpty",
  unknownKey: "post.refusal.unknownKey",
  unknownCurrency: "post.refusal.unknownCurrency",
  unknownPlace: "post.refusal.unknownPlace",
  periodLocked: "post.refusal.periodLocked",
  categoryNotPostable: "post.refusal.categoryNotPostable",
  residencyUnknown: "post.refusal.residencyUnknown",
  coverageExceedsPlan: "post.refusal.coverageExceedsPlan",
  rateLimited: "post.refusal.rateLimited",
  messagesRequired: "post.refusal.messagesRequired",
  notYourListing: "post.refusal.notYourListing",
  // U6-C1b — the attribute validator's own vocabulary (`validate_listing_attributes`).
  badType: "post.refusal.badType",
  badPreset: "post.refusal.badPreset",
  badDecimals: "post.refusal.badDecimals",
  outOfBounds: "post.refusal.outOfBounds",
  badMulti: "post.refusal.badMulti",
  dependentMissing: "post.refusal.dependentMissing",
  inactiveOption: "post.refusal.inactiveOption",
  otherNeedsText: "post.refusal.otherNeedsText",
  unknownOption: "post.refusal.unknownOption",
  unknownAttribute: "post.refusal.unknownAttribute",
  notPositive: "post.refusal.notPositive",
  // U6-C2a — step 5 and step 6's own vocabulary.
  priceNotAllowed: "post.refusal.priceNotAllowed",
  posterExpiryTooSoon: "post.refusal.posterExpiryTooSoon",
  posterExpiryTooLate: "post.refusal.posterExpiryTooLate",
  multipleMarkets: "post.refusal.multipleMarkets",
  providerUnavailable: "post.refusal.providerUnavailable",
};

const PHOTO_REASONS: Record<string, MessageKey> = {
  nudity: "post.photo.refusal.nudity",
  violence: "post.photo.refusal.violence",
  weapon: "post.photo.refusal.weapon",
  drugs: "post.photo.refusal.drugs",
  hate_symbol: "post.photo.refusal.hate_symbol",
  personal_document: "post.photo.refusal.personal_document",
  contact_in_image: "post.photo.refusal.contact_in_image",
  stock_watermark: "post.photo.refusal.stock_watermark",
  not_a_photo: "post.photo.refusal.not_a_photo",
  providerUnavailable: "post.photo.refusal.providerUnavailable",
  unsupportedFormat: "post.photo.refusal.unsupportedFormat",
  corruptImage: "post.photo.refusal.corruptImage",
  tooLarge: "post.photo.refusal.tooLarge",
  stripFailed: "post.photo.refusal.stripFailed",
  tooManyPhotos: "post.photo.refusal.tooManyPhotos",
  rateLimited: "post.photo.refusal.rateLimited",
  notYourListing: "post.photo.refusal.notYourListing",
  listingNotOpenForPhotos: "post.photo.refusal.listingNotOpenForPhotos",
};

/** A draft-route refusal, in the seller's language. */
export function draftRefusalKey(reason: string): MessageKey {
  return DRAFT_REASONS[base(reason)] ?? "post.refusal.unknown";
}

/** An upload-route refusal, in the seller's language. */
export function photoRefusalKey(reason: string): MessageKey {
  return PHOTO_REASONS[base(reason)] ?? "post.photo.refusal.unknown";
}

/** The first refusal naming a field, so a message can sit under its control. */
export function refusalFor(refusals: Refusal[], field: string): Refusal | null {
  return refusals.find((entry) => entry.field === field) ?? null;
}

/**
 * `{name}`-style interpolation, the same shape every other surface uses
 * (`t(key).replace("{x}", v)`), gathered into one call so a message with three
 * placeholders does not become three chained replaces at the call site.
 */
export function fill(template: string, values: Record<string, string | number>): string {
  let out = template;
  for (const [name, value] of Object.entries(values)) {
    out = out.replace(`{${name}}`, String(value));
  }
  return out;
}
