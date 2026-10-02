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
  // DEC-079 / D31 — the basis law's own vocabulary.
  periodFollowsBasis: "post.refusal.periodFollowsBasis",
  modeFollowsBasis: "post.refusal.modeFollowsBasis",
  commissionNotOffered: "post.refusal.commissionNotOffered",
  priceBasisAmbiguous: "post.refusal.priceBasisAmbiguous",
  // INC-301 — a commission outside 0.01–100 %, and an empty one.
  commissionRange: "post.refusal.commissionRange",
  commissionRequired: "post.refusal.commissionRequired",
  // INC-309 — an unmapped door exception, in words; never the raw field name.
  doorError: "post.refusal.doorError",
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
  // Part D — phone-like runs in free text and in the location details.
  contactInText: "post.refusal.contactInText",
  contactInNote: "post.refusal.contactInNote",
  unknownOption: "post.refusal.unknownOption",
  unknownAttribute: "post.refusal.unknownAttribute",
  notPositive: "post.refusal.notPositive",
  // U6-C2a — step 5 and step 6's own vocabulary.
  priceNotAllowed: "post.refusal.priceNotAllowed",
  posterExpiryTooSoon: "post.refusal.posterExpiryTooSoon",
  posterExpiryTooLate: "post.refusal.posterExpiryTooLate",
  // W6 — multipleMarkets retired 2026-09-29; every place is a city (INC-337).
  cityRequired: "post.refusal.cityRequired",
  providerUnavailable: "post.refusal.providerUnavailable",
  // U6-C2b — step 7's own vocabulary (`save_posting_identity`,
  // `listing_contact_refusals`): the identity door answers here.
  aliasReserved: "post.refusal.aliasReserved",
  aliasTaken: "post.refusal.aliasTaken",
  badLength: "post.refusal.badLength",
  badHandle: "post.refusal.badHandle",
  showNeedsValue: "post.refusal.showNeedsValue",
  unknownCountry: "post.refusal.unknownCountry",
  countryAlreadyConfirmed: "post.refusal.countryAlreadyConfirmed",
  // U6-C1-R2 — the writing budget and the alias imitation check.
  assistBudgetSpent: "post.refusal.assistBudgetSpent",
  aliasImitatesBrand: "post.refusal.aliasImitatesBrand",
  // U6-C1-R3a-2 — D18 fact BOUNDS, mirrored client-side only: the chosen model
  // says the year cannot be below its floor. The door answers `outOfBounds`.
  belowModelYear: "post.refusal.belowModelYear",
  aboveModelYear: "post.refusal.aboveModelYear",
  optionNotAllowed: "post.refusal.optionNotAllowed",
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

/**
 * INC-301 — THE ONE FIELD-AWARE PAIR: an empty commission (`price_bp` ·
 * `required`) reads "Enter your commission percentage", not the generic line.
 * Every other field keeps the generic `required`.
 */
export function fieldAwareRefusal(refusal: Refusal | null): Refusal | null {
  if (refusal !== null && refusal.field === "price_bp" && base(refusal.reason) === "required") {
    return { ...refusal, reason: "commissionRequired" };
  }
  return refusal;
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
