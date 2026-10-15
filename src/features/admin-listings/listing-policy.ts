import type { MessageKey } from "@/i18n";
import { authKey } from "@/lib/query-keys";

/**
 * Bundle 16 turn R2 (D174 3, D175 2) — THE RENEW SETTINGS as `listing_policy` holds
 * them (one row): whether a seller may renew an expired ad, and the days a renewal
 * gives. The reader, the days box's rule and the door's refusal in words, for the
 * Settings dialog (`ListingSettings`).
 */

export interface ListingPolicy {
  renewAllowed: boolean;
  renewDays: number;
}

export const POLICY_KEY = authKey("listing-policy");

/** The row as the door holds it, or null on any mismatch (F4). */
export function parsePolicy(value: unknown): ListingPolicy | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const row = value as Record<string, unknown>;
  const days = row["renew_days"];
  if (typeof row["renew_allowed"] !== "boolean") return null;
  if (typeof days !== "number" || !Number.isInteger(days) || days < 1 || days > 365) return null;
  return { renewAllowed: row["renew_allowed"], renewDays: days };
}

/** The days the box holds: a whole number from 1 to 365, or null. */
export function daysOf(text: string): number | null {
  const trimmed = text.trim();
  if (!/^\d{1,3}$/.test(trimmed)) return null;
  const days = Number(trimmed);
  return days >= 1 && days <= 365 ? days : null;
}

/** The door's refusal, in the admin's words. */
export function settingsErrorKey(message: string): MessageKey {
  if (message.includes("renew days are 1 to 365")) return "admin.listings.settings.daysHelp";
  return "admin.listings.settings.failed";
}
