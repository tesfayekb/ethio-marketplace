import { pattern } from "../../scripts/lib/pattern";

/**
 * INC-1104 (housekeeping turn 3b, ruling 1 item 2) — EVERY SCRATCH PREFIX, ONE LIST. A scratch
 * row's slug, key, name or e-mail starts with one of these; its maker builds the name from this
 * list, and the reaper (e2e/global-setup.ts, e2e/helpers/locations.ts) sweeps each by its LIKE
 * form (`likePrefix`, `likeAnywhere`). A prefix the reaper does not read is a graveyard: the
 * roles named `e2e_scratch_role_…` under a sweep of `e2e-%` were one (INC-1104). LIKE reads `_`
 * as any one character and `%` as any run, so the LIKE form escapes both (and `\`); `-`, `.`
 * and `+` are literal.
 * scripts/conformance/e2e-helpers.test.ts CF-HELPERS-6 holds every sweep and every helper's
 * scratch name to this list. Imports nothing but the pattern helper, so scripts read it too
 * (scripts/en-baseline-heal.ts).
 *
 * Never swept, and kept out of the list: the pool identities (`e2e-pool-<lane>-<seat>` e-mails
 * and the pool's TOTP factor name, e2e/helpers/users.ts and e2e/global-setup.ts) and the pool's
 * `ended_reason` value (`e2e_pool_reset`) — the pool is leased again, never reaped.
 */
export const SCRATCH_PREFIXES = {
  /** What every scratch name but the fence codes and the country names begins with: the real-row filters' complement. */
  stem: "e2e",
  /** Slugs, keys and names of scratch rows (`e2e-…`). */
  dash: "e2e-",
  /** Attribute keys and option stems, public names and reach rows (`e2e_…`). */
  underscore: "e2e_",
  /** Scratch roles (`grantScratchRole`, INC-1049, INC-1104). */
  role: "e2e_scratch_role_",
  /** Scratch locations' slugs. */
  location: "e2e-loc-",
  /** Scratch categories' slugs. */
  category: "e2e-cat-",
  /** The listings a scratch category holds: their titles. */
  categoryListing: "e2e-cat-listing-",
  /** The posting wizard's scratch categories' slugs. */
  post: "e2e-post-",
  /** Scratch countries' English names. */
  countryName: "E2E-Scratch-",
  /** The strings console's scratch keys (INC-095e, INC-289). */
  translationKey: "e2e.scratch.",
  /** Scratch users: the e-mail's local part and the display name. */
  user: "e2e+",
  /** The bulk-machine language fence's codes (DEC-148). */
  fenceBulk: "zxx",
  /** The approve-all language fence's codes (DEC-148). */
  fenceApprove: "zxy",
} as const;

export type ScratchKind = keyof typeof SCRATCH_PREFIXES;
export type ScratchPrefix = (typeof SCRATCH_PREFIXES)[ScratchKind];

/** The domain every harness e-mail ends with (the scratch users' and the pool's). */
export const SCRATCH_USER_DOMAIN = "@ethio-e2e.invalid";

/** The two language fences, by kind (DEC-148). */
export const FENCE_PREFIXES = {
  bulk: SCRATCH_PREFIXES.fenceBulk,
  approve: SCRATCH_PREFIXES.fenceApprove,
} as const;

/** `prefix` as LIKE text: `\`, `_` and `%` escaped (the backslash is LIKE's escape). */
function likeLiteral(prefix: string): string {
  return prefix.replace(/[\\_%]/g, "\\$&");
}

/** The LIKE pattern of every name that starts with `prefix`. */
export function likePrefix(prefix: ScratchPrefix): string {
  return `${likeLiteral(prefix)}%`;
}

/** The LIKE pattern of every name that holds `prefix` anywhere (a scratch segment inside a key). */
export function likeAnywhere(prefix: ScratchPrefix): string {
  return `%${likeLiteral(prefix)}%`;
}

/** A name holding a scratch stem, `e2e-` or `e2e_`, anywhere (J1; the export comparison). */
export const SCRATCH_STEM = pattern`(?:${SCRATCH_PREFIXES.dash}|${SCRATCH_PREFIXES.underscore})`;

/** A key that starts with a scratch stem, or carries one directly after a hyphen (INC-463). */
export const SCRATCH_KEY = pattern`(?:^|-)(?:${SCRATCH_PREFIXES.dash}|${SCRATCH_PREFIXES.underscore})`;
