/**
 * DEC-099 / INC-380 — THE POOL RESET MAP (pure data, no imports).
 *
 * Every place per-account state can live is declared here exactly once:
 * RESET  — reapPoolAccount() returns it to what handle_new_user() leaves;
 * EXEMPT — attribution or history; it never changes what the next lease sees.
 *
 * The census rule for tables (src/test/pool-reset-map.test.ts applies it to
 * src/integrations/supabase/types.ts): a public table whose Row has a column
 * named user_id, seller_id, actor_id, target_id, actor, reviewer or *_by.
 * A new table matching that rule fails the guard until it is placed here.
 */

export const POOL_RESET_TABLES = {
  listings: "seller_id rows deleted; photos, places, revisions, verdicts cascade",
  listing_revisions: "seller_id rows deleted (also cascade with listings)",
  profiles: "returned to handle_new_user() defaults",
  user_directory: "returned to handle_new_user() defaults",
  user_roles: "every role except the base user role removed; base role ensured",
  translator_languages: "every language assignment removed (INC-380)",
  impersonation_sessions: "open sessions naming the account as actor or target are ended",
  rate_limits: "rows keyed by the user id and by its listing ids deleted",
} as const;

export const POOL_EXEMPT_TABLES = {
  attribute_import_revisions: "created_by is attribution on import history",
  audit_log: "actor_id is append-only audit history",
  category_country_exclusions: "created_by is attribution on a catalogue row",
  category_import_revisions: "created_by is attribution on import history",
  country_root_order: "created_by is attribution on a catalogue row",
  coverage_plans: "updated_by is attribution on a global plan row",
  entity_translations: "updated_by / approved_by are attribution",
  location_import_revisions: "created_by is attribution on import history",
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
