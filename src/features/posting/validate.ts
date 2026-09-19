import type { Refusal } from "./types";

/**
 * U6-C1-R3a / STEP 8 — THE CLIENT MIRROR OF THE DOORS' RULES.
 *
 * ONE LAW GOVERNS THIS FILE: the door is the authority (F3). Nothing here
 * accepts anything — every function can only produce a REFUSAL, in the doors'
 * OWN vocabulary (`badHandle`, `tooLong`, `outOfBounds`, …), so a message shown
 * on blur reads exactly like the message the server would send for the same
 * answer. A field that passes these checks is still judged by the door on Next.
 *
 * The expressions are copied from the SQL they mirror:
 *   phone / whatsapp  `^\+[0-9]{7,15}$`                (listing_contact_refusals)
 *   telegram          `^@?[A-Za-z0-9_]{5,32}$`          (same, after stripping @)
 * A mirror that drifted from its original would be worse than no mirror, so
 * these three constants are the only place the shapes are written.
 */

export const PHONE_RE = /^\+[0-9]{7,15}$/;
export const TELEGRAM_RE = /^[A-Za-z0-9_]{5,32}$/;
/** A YouTube watch/short/embed link, the shape the draft door accepts. */
export const YOUTUBE_RE =
  /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)[\w-]{6,}|youtu\.be\/[\w-]{6,})/;

export type Channel = "phone" | "telegram" | "whatsapp";

/** A refusal in the doors' words, or `null` when this screen sees nothing wrong. */
function refusal(field: string, reason: string, detail?: string): Refusal {
  return detail === undefined ? { field, reason } : { field, reason, detail };
}

/** One contact channel: a value that is shown must be a value the door accepts. */
export function checkChannel(
  channel: Channel,
  value: string,
  show: boolean,
  field: string = channel,
): Refusal | null {
  const trimmed = value.trim();
  if (trimmed === "") return show ? refusal(field, "showNeedsValue") : null;
  const ok =
    channel === "telegram" ? TELEGRAM_RE.test(trimmed.replace(/^@/, "")) : PHONE_RE.test(trimmed);
  return ok ? null : refusal(field, "badHandle", trimmed);
}

/**
 * The whole `contact_pref` object, mirroring `listing_contact_refusals` field
 * for field — including the names it uses (`contact_pref.phone`), so a refusal
 * raised here and one raised by the door land on the same control.
 */
export function checkContactPref(pref: Record<string, unknown>): Refusal[] {
  const out: Refusal[] = [];
  if (pref["messages"] !== true) out.push(refusal("contact_pref.messages", "messagesRequired"));
  for (const key of Object.keys(pref)) {
    if (!["messages", "phone", "telegram", "whatsapp"].includes(key)) {
      out.push(refusal(`contact_pref.${key}`, "unknownKey"));
    }
  }
  for (const channel of ["phone", "telegram", "whatsapp"] as const) {
    const entry = pref[channel];
    if (entry === undefined) continue;
    if (entry === null || typeof entry !== "object") {
      out.push(refusal(`contact_pref.${channel}`, "badShape"));
      continue;
    }
    const row = entry as Record<string, unknown>;
    const extra = Object.keys(row).some((key) => !["show", "value"].includes(key));
    if (typeof row["show"] !== "boolean" || extra) {
      out.push(refusal(`contact_pref.${channel}`, "badShape"));
      continue;
    }
    const found = checkChannel(
      channel,
      typeof row["value"] === "string" ? row["value"] : "",
      row["show"] === true,
      `contact_pref.${channel}`,
    );
    if (found !== null) out.push(found);
  }
  return out;
}

/** A written answer: present when required, within its length. */
export function checkText(
  field: string,
  value: string,
  { required = false, max = null }: { required?: boolean; max?: number | null } = {},
): Refusal | null {
  const trimmed = value.trim();
  if (trimmed === "") return required ? refusal(field, "required") : null;
  if (max !== null && trimmed.length > max) return refusal(field, "tooLong", String(max));
  return null;
}

/** A number: positive, inside DEC-050 bounds, within the declared decimals. */
export function checkNumber(
  field: string,
  value: number | null,
  {
    required = false,
    min = null,
    max = null,
    decimals = null,
    positive = false,
  }: {
    required?: boolean;
    min?: number | null;
    max?: number | null;
    decimals?: number | null;
    positive?: boolean;
  } = {},
): Refusal | null {
  if (value === null) return required ? refusal(field, "required") : null;
  if (!Number.isFinite(value)) return refusal(field, "badValue");
  if (positive && value <= 0) return refusal(field, "notPositive");
  if (min !== null && value < min) return refusal(field, "outOfBounds", String(min));
  if (max !== null && value > max) return refusal(field, "outOfBounds", String(max));
  if (decimals !== null) {
    const places = String(value).split(".")[1]?.length ?? 0;
    if (places > decimals) return refusal(field, "badDecimals", String(decimals));
  }
  return null;
}

/** A YouTube link, or nothing at all. */
export function checkVideoUrl(field: string, value: string): Refusal | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  return YOUTUBE_RE.test(trimmed) ? null : refusal(field, "badValue");
}

/**
 * A take-down date inside the poster window: a date already gone is too soon,
 * one past the category's own day count is too late — the door's two reasons.
 */
export function checkExpiry(
  field: string,
  value: string,
  maxDays: number,
  now = new Date(),
): Refusal | null {
  if (value.trim() === "") return null;
  const when = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(when.getTime())) return refusal(field, "badValue");
  const days = Math.floor((when.getTime() - now.getTime()) / 86_400_000);
  if (days < 0) return refusal(field, "posterExpiryTooSoon");
  if (days > maxDays) return refusal(field, "posterExpiryTooLate", String(maxDays));
  return null;
}

/** A date answer to a generated detail: a real date, nothing more. */
export function checkDate(field: string, value: string, required = false): Refusal | null {
  if (value.trim() === "") return required ? refusal(field, "required") : null;
  return Number.isNaN(new Date(`${value}T00:00:00Z`).getTime()) ? refusal(field, "badValue") : null;
}

/** Merge what this screen saw with what the door said — the door always wins. */
export function mergeRefusals(door: Refusal[], local: Refusal[]): Refusal[] {
  const named = new Set(door.map((entry) => entry.field));
  return [...door, ...local.filter((entry) => !named.has(entry.field))];
}
