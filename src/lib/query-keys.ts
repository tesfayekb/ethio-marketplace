/**
 * U1g-3 (A) — NEUTRAL QUERY-KEY MODULE.
 *
 * The purge root used to live in `src/features/permissions`, which put every
 * consumer (the shell, the admin hooks) in breach of the browse-path guard:
 * the marketplace must never import the RBAC seam. The root is a plain string
 * with no behaviour, so it belongs here — this module imports NOTHING from
 * `features/*` and must stay that way.
 *
 * INC-078 (second facet) — THE PURGE ROOT. Every query whose data is derived
 * from the signed-in session starts with this segment, so the hard reset can
 * cancel-then-remove ALL of them with ONE call. A new auth-context query that
 * forgets this root re-introduces the leak; the root IS the law.
 */
export const AUTH_DERIVED_ROOT = "auth-derived" as const;

/** Build an auth-derived query key. */
export function authKey(...parts: readonly (string | object)[]) {
  return [AUTH_DERIVED_ROOT, ...parts];
}
