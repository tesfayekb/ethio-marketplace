/**
 * DEC-333 (Foundations 1) — THE DOOR CODES: the closed list of refusal codes a
 * door answers through `door_refuse(code, detail)` (SQLSTATE P0D01, message
 * `code[:detail]`), and the client's ONE reader of them, `doorCode`.
 *
 * A refusal reaches the client in one of two shapes and `doorCode` reads both:
 * - a RAISE (a reader, or a door before the shell): the PostgREST error whose
 *   `message` is `code[:detail]`;
 * - the shell's returned envelope (`door_refused`): `{ ok:false, code:'P0D01',
 *   message:'code[:detail]', refusals:[{ reason, detail }] }`, which the
 *   browser client surfaces as an error with that `message` (the 4xx status is
 *   the shell's `response.status`), and a server route reads as data.
 *
 * `stepUpRequired` stays P0009 on the wire (the 428 path); it is listed here so
 * a screen names one word for it. An unknown or sentence-shaped message is
 * `null`: the screen renders the one generic key `door.refused`, never the raw
 * text. The list grows only by a family turn that folds a door's sentences to
 * codes (plan §5), or by a family's screens turn ahead of its shell turn
 * (DEC-349); the shared gate codes come first.
 */

export const DOOR_CODES = [
  // the gates (door_context), in the law's order
  "notSignedIn",
  "accountDeactivated",
  "permissionDenied",
  "stepUpRequired",
  "rateLimited",
  // the doors' own codes, by the family that folded them (F1-1: the account doors)
  "lastSignInMethod",
  "languageNotPublished",
  "noProfile",
  // P-2's family (levels and the pause), added by its screens turn ahead of its shell turn F1-5a (DEC-349)
  "listingNotFound",
  "notLive",
  "notPaused",
  "unknownLevel",
  "sameLevel",
  "lowerLevel",
  "listingNotPlaced",
  "levelNotAvailable",
  "seasonEnded",
  "notOffered",
  "marketNotSet",
  "creditsNotAvailable",
  "noFreeSlot",
  // P-2 (c)'s reach (set_listing_reach), added by its screens turn c3 ahead of its shell turn (DEC-349)
  "unknownReach",
  "sameReach",
  "lowerReach",
  "includedReach",
  // F1-2: the roles, users and impersonation doors (codes shared with other forms' words included)
  "roleReserved",
  "unknownRole",
  "systemRole",
  "unknownPermission",
  "permissionReserved",
  "corePermission",
  "hasDependents",
  "duplicateKey",
  "nameRequired",
  "badSlug",
  "badValue",
  "required",
  "unknownUser",
  "unknownCountry",
  "aliasShape",
  "aliasTaken",
  "aliasReserved",
  "badLength",
  "impersonateSelf",
  "impersonateSuperAdmin",
  "sessionActive",
  "noActiveSession",
] as const;

export type DoorCode = (typeof DOOR_CODES)[number];

/** The one key a screen renders for a refusal it has no words of its own for. */
export const DOOR_REFUSED_KEY = "door.refused" as const;

const CODE_SHAPE = /^([a-z][A-Za-z]*)(?::(.*))?$/s;

export type DoorRefusalRead = {
  /** The code when it is on the list; null for an unknown or sentence-shaped message. */
  code: DoorCode | null;
  /** The `:detail` tail when the message carried one. */
  detail: string | null;
};

function messageOf(input: unknown): string | null {
  if (typeof input === "string") return input;
  if (typeof input !== "object" || input === null) return null;
  const record = input as Record<string, unknown>;
  if (typeof record["message"] === "string") return record["message"];
  const refusals = record["refusals"];
  if (Array.isArray(refusals)) {
    const first = refusals[0] as Record<string, unknown> | undefined;
    if (first !== undefined && typeof first["reason"] === "string") {
      const detail = typeof first["detail"] === "string" ? `:${first["detail"]}` : "";
      return `${first["reason"]}${detail}`;
    }
  }
  return null;
}

function isDoorCode(code: string): code is DoorCode {
  return (DOOR_CODES as readonly string[]).includes(code);
}

/** The door code of an error, a message or the shell's envelope. */
export function doorCode(input: unknown): DoorRefusalRead {
  const message = messageOf(input);
  if (message === null) return { code: null, detail: null };
  const match = CODE_SHAPE.exec(message.trim());
  if (match === null) return { code: null, detail: null };
  const [, head, tail] = match;
  const code = head !== undefined && isDoorCode(head) ? head : null;
  const detail = tail === undefined || tail === "" ? null : tail;
  return { code, detail: code === null ? null : detail };
}
