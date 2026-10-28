/**
 * Foundations turn 8 (DEC-237) — THE DIAL REGISTRY. Every rate dial is defined
 * here once: its action (the counter's name), its limit (a fallback and, where
 * the deploy may override it, the env name) and its window in SECONDS. Sites
 * spend a dial through `spend`/`peek` (src/server/dials.ts) or declare it on the
 * route's `rate`; each site keeps its own answer. Pure data, no imports: the
 * client may read it (the writing helper's tries). A new dial is one line here.
 *
 * Windows: consume_rate_limit buckets by the window's epoch, so "3600 seconds"
 * counts in the same bucket as "1 hour" — an entry's seconds equal the text it
 * replaced (10 years = 315576000, 7 days = 604800, a day = 86400, an hour = 3600).
 */
export type Dial = {
  action: string;
  limit: { fallback: number; env?: string };
  windowSeconds: number;
  countedBy?: "door";
};

export const DIALS = {
  /** src/routes/api/upload/photo.ts — declared, beforeParse, per seller. */
  uploadHour: {
    action: "upload",
    limit: { fallback: 60, env: "RATE_LIMIT_UPLOAD_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/routes/api/upload/photo.ts — declared, D158's daily limit. */
  uploadDay: {
    action: "upload:day",
    limit: { fallback: 200, env: "RATE_LIMIT_UPLOAD_PER_DAY" },
    windowSeconds: 86400,
  },
  /** src/routes/api/listings/photos.$id.ts — declared, per seller. */
  photoRemoveHour: {
    action: "photo-remove",
    limit: { fallback: 30, env: "RATE_LIMIT_PHOTO_REMOVE_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/routes/api/listings/photos.$id.ts — declared, per seller. */
  photoRemoveDay: {
    action: "photo-remove:day",
    limit: { fallback: 100, env: "RATE_LIMIT_PHOTO_REMOVE_PER_DAY" },
    windowSeconds: 86400,
  },
  /** src/routes/api/listings/assist.ts — declared, beforeParse. */
  assistHour: {
    action: "assist",
    limit: { fallback: 30, env: "RATE_LIMIT_ASSIST_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/routes/api/listings/assist.ts — declared, beforeParse. */
  assistDay: {
    action: "assist:day",
    limit: { fallback: 60, env: "RATE_LIMIT_ASSIST_PER_DAY" },
    windowSeconds: 86400,
  },
  /** src/routes/api/listings/assist.ts (peek + spend, per listing) and the screen's tries. */
  assistListing: { action: "assist:listing", limit: { fallback: 5 }, windowSeconds: 315576000 },
  /** src/server/ad-view.ts — per raw address. */
  listingViewAddress: {
    action: "listing-view:address",
    limit: { fallback: 600, env: "RATE_LIMIT_LISTING_VIEW_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/server/ad-view.ts — one counted view per session and ad. */
  listingViewSession: {
    action: "listing-view:session",
    limit: { fallback: 1 },
    windowSeconds: 86400,
  },
  /** src/server/ad-view.ts — per address and ad (turn 23 estimate). */
  listingViewAddressAd: {
    action: "listing-view:address-ad",
    limit: { fallback: 30, env: "RATE_LIMIT_LISTING_VIEW_PER_ADDRESS_AD" },
    windowSeconds: 3600,
  },
  /** src/server/ad-share.ts — per raw address. */
  listingShareAddress: {
    action: "listing-share:address",
    limit: { fallback: 120, env: "RATE_LIMIT_LISTING_SHARE_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/server/ad-photo.ts — per raw address. */
  listingPhotoAddress: {
    action: "listing-photo:address",
    limit: { fallback: 600, env: "RATE_LIMIT_LISTING_PHOTO_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/server/ad-page.ts — per raw address. */
  listingReadAddress: {
    action: "listing-read:address",
    limit: { fallback: 600, env: "RATE_LIMIT_LISTING_READ_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/routes/api/media/photo-links.ts — anonymous callers, hashed address. */
  photoLinksAddress: {
    action: "photo-links:address",
    limit: { fallback: 600, env: "RATE_LIMIT_PHOTO_LINKS_PER_HOUR" },
    windowSeconds: 3600,
  },
  /** src/routes/api/geo/{reverse,search,outline}.ts — per signed-in seller. */
  geocode: { action: "geocode", limit: { fallback: 60 }, windowSeconds: 3600 },
  /** src/routes/api/upload/photo.ts — drafts only, per seller. */
  uploadDraftWeek: {
    action: "upload:draft-week",
    limit: { fallback: 50, env: "DRAFT_UPLOADS_PER_WEEK_WITHOUT_AD" },
    windowSeconds: 604800,
  },
  /** src/routes/api/upload/photo.ts — the site's paid screens, key "site". */
  uploadScreen: {
    action: "upload:screen",
    limit: { fallback: 2000, env: "PHOTO_SCREENS_PER_DAY_SITE" },
    windowSeconds: 86400,
  },
  /** src/routes/api/map/tiles.ts — fallback lines, hashed address. */
  mapFallback: { action: "map:fallback", limit: { fallback: 60 }, windowSeconds: 3600 },
  /** src/routes/api/listings/background.ts — per seller. */
  backgroundDay: {
    action: "background:day",
    limit: { fallback: 10, env: "RATE_LIMIT_BACKGROUND_PER_DAY" },
    windowSeconds: 86400,
  },
  /** src/routes/api/listings/background.ts — per listing, a ledger (D159). */
  backgroundListing: {
    action: "background:listing",
    limit: { fallback: 2 },
    windowSeconds: 315576000,
  },
  /** src/routes/api/listings/identity.ts — equal to the live rate_dials row (INC-442). */
  identityImitation: {
    action: "identity:imitation",
    limit: { fallback: 20 },
    windowSeconds: 86400,
  },
  /** src/server/catalog-find.server.ts — the limit handed to catalog_search; the door
      counts it under its own action and window (consume_catalog_find_rate, 1 hour). */
  catalogFind: {
    action: "catalog_find",
    limit: { fallback: 120 },
    windowSeconds: 3600,
    countedBy: "door",
  },
  /** The staff file doors (src/server/imports/route.ts): budgetModes per family, user id. */
  importCategories: { action: "import:categories", limit: { fallback: 30 }, windowSeconds: 60 },
  importAttributes: { action: "import:attributes", limit: { fallback: 30 }, windowSeconds: 60 },
  importLocations: { action: "import:locations", limit: { fallback: 30 }, windowSeconds: 60 },
  importTranslations: {
    action: "import:translations",
    limit: { fallback: 30 },
    windowSeconds: 60,
  },
  /** INC-951 3b (D1 M5a) — src/routes/api/translate.ts: one per machine-translate press, before the AI call. */
  machineTranslatePress: {
    action: "machine_translate_press",
    limit: { fallback: 20 },
    windowSeconds: 3600,
  },
  /** INC-951 3b (D1 M5a) — counted by the doors (rate_gate), equal to their rate_dials rows. */
  /** listing photo allow/review, admin edit and move — one decision every 6 seconds for an hour. */
  staffModeration: {
    action: "staff_moderation",
    limit: { fallback: 600 },
    windowSeconds: 3600,
    countedBy: "door",
  },
  /** admin_save_translation, admin_save_entity_translation — per-key saves. */
  staffTranslation: {
    action: "staff_translation",
    limit: { fallback: 2000 },
    windowSeconds: 3600,
    countedBy: "door",
  },
  /** the machine writers, per key: TRANSLATE_MAX_ITEMS (600) × machineTranslatePress (20). */
  staffMachineTranslation: {
    action: "staff_machine_translation",
    limit: { fallback: 12000 },
    windowSeconds: 3600,
    countedBy: "door",
  },
  /** INC-951 3a (D1 M4) — counted by the doors (rate_gate), equal to their rate_dials rows. */
  /** accept_legal — a person accepts the few documents in force, once each. */
  legalAccept: {
    action: "legal_accept",
    limit: { fallback: 60 },
    windowSeconds: 3600,
    countedBy: "door",
  },
  /** remove_listing_photo — equal to photoRemoveDay; the door is the last line. */
  photoRemoveDoor: {
    action: "photo_remove",
    limit: { fallback: 100 },
    windowSeconds: 86400,
    countedBy: "door",
  },
  /** begin_impersonation — 15-minute sessions, one at a time; far beyond a support shift. */
  impersonation: {
    action: "impersonation",
    limit: { fallback: 30 },
    windowSeconds: 86400,
    countedBy: "door",
  },
  /** admin_export_legal_acceptances — first pages only (the audited write). */
  legalExport: {
    action: "legal_export",
    limit: { fallback: 60 },
    windowSeconds: 3600,
    countedBy: "door",
  },
} as const satisfies Record<string, Dial>;
