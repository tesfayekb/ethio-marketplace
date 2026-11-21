/**
 * INC-1153 (cursor bundle 1) — THE ONE GENERIC DOOR REFUSAL KEY, as a leaf. The shell's
 * impersonation notice draws it on every page, so it must not drag the closed list of door
 * codes (door-codes.ts) into the entry: the list is read only where a refusal is read
 * (src/lib/refusal.ts), and arrives with the reader's chunk. door-codes.ts re-exports it, so
 * its other importers are unchanged.
 */

/** The one key a screen renders for a refusal it has no words of its own for. */
export const DOOR_REFUSED_KEY = "door.refused" as const;
