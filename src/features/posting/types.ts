import type { MessageKey } from "@/i18n";

/**
 * U6-C1a — THE WIZARD'S VOCABULARY.
 *
 * The eight steps are the SPEC's steps (§4 B2), not the UI's convenience: the
 * server's `draft_step` counts in exactly these numbers, so the wizard and the
 * door never disagree about where a seller is.
 */
export const STEPS = [
  { step: 1, nameKey: "post.step.category" },
  { step: 2, nameKey: "post.step.photos" },
  { step: 3, nameKey: "post.step.specifications" },
  { step: 4, nameKey: "post.step.details" },
  { step: 5, nameKey: "post.step.price" },
  { step: 6, nameKey: "post.step.place" },
  { step: 7, nameKey: "post.step.contact" },
  { step: 8, nameKey: "post.step.review" },
] as const satisfies readonly { step: number; nameKey: MessageKey }[];

export const TOTAL_STEPS = STEPS.length;

/** The steps this landing implements; the rest render "opens later" honestly. */
export const IMPLEMENTED_THROUGH = 6;

/**
 * U6-C2a — THE PRICE VOCABULARY, the door's own words (DEC-067, D13).
 *
 * These four modes and six periods are `listings_price_mode_check` and
 * `listings_price_period_check` verbatim. They are declared ONCE here because the
 * screen, the save body and the tests must all use the same spellings — a fifth
 * mode invented in a component would be refused by the door, not by a type.
 */
export const PRICE_MODES = ["fixed", "negotiable", "free", "contact"] as const;
export const PRICE_PERIODS = ["once", "hour", "day", "week", "month", "year"] as const;

export type PriceMode = (typeof PRICE_MODES)[number];
export type PricePeriod = (typeof PRICE_PERIODS)[number];

/**
 * The `category` block of `get_posting_schema` — what the CATEGORY decides about
 * a listing's price, its poster window and its capabilities (DEC-052/067).
 */
export interface CategoryFacts {
  id: string;
  slug: string;
  nameEn: string;
  priceEnabled: boolean;
  defaultPricePeriod: string;
  pricePeriodLocked: boolean;
  /** How many days a poster may run; the door falls back to 60 when unset. */
  expiryDays: number | null;
  /** DEC-052 — `bookable` / `map_pin`; the pin is a named deferral (see docs). */
  capabilities: string[];
}

/** One refusal, exactly as a door or route worded it. Never translated here. */
export interface Refusal {
  field: string;
  reason: string;
  detail?: string;
}

/** What every route answer looks like once parsed (F4: a refusal is an answer). */
export interface DoorAnswer {
  status: number;
  ok: boolean;
  refusals: Refusal[];
  /** The door's own payload, for `listing_id` / `draft_step` and friends. */
  payload: Record<string, unknown>;
  /** True when the request never reached the server (offline, blocked, 5xx). */
  unreachable: boolean;
}

/** The autosave's visible state (C4 — every screen says where it stands). */
export type SaveState = "idle" | "saving" | "saved" | "unsaved";

/** One photo in the grid, from the moment the device picks it. */
export interface PhotoItem {
  /** A client id, stable across the upload so progress belongs to one tile. */
  localId: string;
  /** The server's photo id once registered. */
  photoId: string | null;
  /** The on-device blob URL — the preview until the server confirms. */
  previewUrl: string;
  state: "preparing" | "uploading" | "stored" | "failed";
  percent: number;
  /** A refused photo names its reason in words and can be replaced. */
  refusalKey: MessageKey | null;
  isCover: boolean;
  /** Kept so a failed upload can be retried without re-picking the file. */
  file: File | null;
}
