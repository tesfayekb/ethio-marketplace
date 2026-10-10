import type { SavedArea } from "./location-data";

/**
 * D106 (the operator, 2026-10-10) — THE PLACE ON THE ACCOUNT.
 *
 * The place picked in the location row is kept on the account for signed-in
 * people, so it follows them to every device. Visitors keep this browser's
 * save (`ethio_area`). The guess is never saved. When this browser and the
 * account disagree at sign-in, the NEWEST pick wins.
 *
 * Pure functions only; the doors are called by place-carry-service.ts —
 * `user_set_viewing_location` (the only writer) and `my_viewing_location` (the
 * owner's read), docs/features/location-scoping.md.
 */

/** The account's place as `my_viewing_location` answers it, or null when none is saved. */
export interface AccountPlace {
  id: string;
  country: string;
  /** When it was picked, in milliseconds since the epoch. */
  at: number;
  /** False once the place is no longer shown in an open market. */
  usable: boolean;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CODE_RE = /^[A-Za-z]{2}$/;

type Rec = Record<string, unknown>;

function isRec(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * The read's answer: an AccountPlace, null for "no place saved", or undefined
 * for an answer of the wrong shape (F4: a malformed answer is a failure, never
 * "no place").
 */
export function parseAccountPlace(value: unknown): AccountPlace | null | undefined {
  if (!isRec(value)) return undefined;
  if (value["id"] === null) return null;
  const { id, country, at, usable } = value;
  if (typeof id !== "string" || !UUID_RE.test(id)) return undefined;
  if (typeof country !== "string" || !CODE_RE.test(country)) return undefined;
  if (typeof at !== "string" || Number.isNaN(Date.parse(at))) return undefined;
  if (typeof usable !== "boolean") return undefined;
  return { id, country: country.toUpperCase(), at: Date.parse(at), usable };
}

/** What the sign-in carry does with this browser's pick and the account's place. */
export type Carry =
  /** The account's place is newer (or this browser has none): show it here and save it here. */
  | { kind: "apply"; country: string; id: string; at: number }
  /** The same place on both: this browser's copy takes the account's time. */
  | { kind: "align"; country: string; id: string; at: number }
  /** This browser's pick is newer (or the account has none usable): save it to the account. */
  | { kind: "upload"; id: string }
  | { kind: "none" };

/**
 * THE NEWEST PICK WINS. A browser pick saved before D106 carries no time and
 * counts as older than any account pick (typed absence, never a made-up time).
 * An account place that is no longer shown counts as none.
 */
export function chooseCarry(device: SavedArea | null, account: AccountPlace | null): Carry {
  const usable = account !== null && account.usable ? account : null;
  if (usable !== null) {
    const fromAccount = { country: usable.country, id: usable.id, at: usable.at };
    if (device === null) return { kind: "apply", ...fromAccount };
    if (device.id === usable.id) {
      return device.at === usable.at ? { kind: "none" } : { kind: "align", ...fromAccount };
    }
    if (device.at === null || usable.at >= device.at) return { kind: "apply", ...fromAccount };
    return { kind: "upload", id: device.id };
  }
  return device === null ? { kind: "none" } : { kind: "upload", id: device.id };
}
