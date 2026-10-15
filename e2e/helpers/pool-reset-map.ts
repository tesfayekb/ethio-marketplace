/**
 * DEC-099 / INC-380 — THE POOL RESET MAP (pure data, no imports).
 *
 * Every place per-account state can live is declared here exactly once:
 * RESET  — reapPoolAccount() returns it to what handle_new_user() leaves;
 * EXEMPT — attribution or history; it never changes what the next lease sees.
 *
 * The census rule for tables (src/test/pool-reset-map.test.ts applies it to
 * src/integrations/supabase/types.ts): a public table whose Row has a column
 * named user_id, seller_id, viewer_id, actor_id, target_id, actor, reviewer
 * or *_by.
 * A new table matching that rule fails the guard until it is placed here.
 */

export const POOL_RESET_TABLES = {
  listings: "seller_id rows deleted; photos, places, revisions, verdicts cascade",
  listing_revisions: "seller_id rows deleted (also cascade with listings)",
  seller_notices: "seller_id rows deleted (also cascade with listings) — L1b",
  profiles: "returned to handle_new_user() defaults",
  user_directory: "returned to handle_new_user() defaults",
  user_roles: "every role except the base user role removed; base role ensured",
  translator_languages: "every language assignment removed (INC-380)",
  impersonation_sessions: "open sessions naming the account as actor or target are ended",
  rate_limits: "rows keyed by the user id and by its listing ids deleted",
  rate_overrides: "user_id rows deleted (a test's lowered dial never outlives it)",
  contact_reveals: "viewer_id rows deleted; rows on the account's listings cascade",
  alias_history: "user_id rows deleted (a pooled account's past names never block a later test)",
  seller_places: "user_id row deleted (a saved shop place never carries into a later lease)",
} as const;

export const POOL_EXEMPT_TABLES = {
  ai_features: "updated_by is attribution on a global switch row (D158)",
  attribute_import_revisions: "created_by is attribution on import history",
  audit_log: "actor_id is append-only audit history",
  category_country_exclusions: "created_by is attribution on a catalogue row",
  category_import_revisions: "created_by is attribution on import history",
  country_root_order: "created_by is attribution on a catalogue row",
  coverage_plans: "updated_by is attribution on a global plan row",
  entity_translations: "updated_by / approved_by are attribution",
  location_import_revisions: "created_by is attribution on import history",
  listing_photo_changes:
    "reviewed_by is attribution on a review; the account's own changes cascade with its listings (bundle 13 turn 10)",
  listing_photo_reviews:
    "decided_by is attribution on a photo's review; the account's own reviews cascade with its photos and listings (bundle 16 turn 4a)",
  listing_policy: "updated_by is attribution on the global renew setting row (bundle 16)",
  screening_verdicts: "reviewer is attribution; the account's own verdicts cascade with listings",
  ui_translation_revisions: "changed_by is attribution on revision history",
  ui_translations: "updated_by / approved_by are attribution",
} as const;

/** Auth-side and storage state (not discoverable from types.ts). */
export const POOL_RESET_AUTH = {
  factors: "every MFA factor deleted",
  sessions: "every session revoked (global logout)",
  metadata: "user_metadata and app_metadata replaced with the fresh-account values",
  password: "fresh random password per lease, kept in memory",
  email: "email re-set to the pool address and confirmed, clearing a pending change",
  ban: "ban_duration none",
} as const;

export const POOL_EXEMPT_AUTH = {
  identities: "pool accounts only hold the email identity; door/linking tests mint fresh",
  phone: "no auth phone door exists; contact phone lives in profiles (RESET)",
  storage_objects:
    "photo objects under <partition>/<user>/<listing>/ become unreachable once listing_photos cascade; no reader lists by prefix",
} as const;
