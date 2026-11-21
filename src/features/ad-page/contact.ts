import { safeHref, type SafeHref } from "@/lib/safe-href";
import { rpc } from "@/lib/supabase-door";
import { contactRefusal, rateUntilOf, type ContactRefusal } from "./ad-page-refusals";

/**
 * Bundle 19 turn 11 (D201 §6) — THE BUYER'S CONTACT REVEAL. The values never
 * sit in the served HTML: they exist only after the tap on "Show contact",
 * answered by the `reveal_listing_contact` door (M5), which owns the day row,
 * the sellers cap, the new-account five and the 30-a-day gate.
 */

export type ContactChannel = "phone" | "phone2" | "telegram" | "whatsapp";

/** The contact block's state on the buyer's page: idle → loading → revealed or refused. */
export type ContactState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "revealed"; channels: Partial<Record<ContactChannel, string>> }
  | {
      kind: "refused";
      reason: Exclude<ContactRefusal, "acceptanceRequired">;
      /** L22c — the dial's reset instant, only when it named one. */
      until?: string;
    };

export type RevealAnswer =
  | { ok: true; channels: Partial<Record<ContactChannel, string>> }
  | { ok: false; reason: ContactRefusal; until?: string };

const CHANNELS: readonly ContactChannel[] = ["phone", "phone2", "telegram", "whatsapp"];

/** L22c — a refused reveal; the reset instant rides along only when the dial named one. */
function refusedContact(failure: unknown): RevealAnswer {
  const reason = contactRefusal(failure);
  const until = reason === "rateLimited" ? rateUntilOf(failure) : undefined;
  return until === undefined ? { ok: false, reason } : { ok: false, reason, until };
}

export async function revealContact(publicId: string): Promise<RevealAnswer> {
  const { data, error } = await rpc("reveal_listing_contact", {
    p_public_id: publicId,
  } as never);
  // F1-5b — the shell's refusals (`listingNotAvailable`, `acceptanceRequired`, the gate's
  // `rateLimited`) arrive as an error whose message is the code; the body's own two ceilings
  // (`sellersCapReached`, the new-account `rateLimited`) stay a returned answer (D3).
  if (error) return refusedContact(error);
  if (data === null || typeof data !== "object") return { ok: false, reason: "failed" };
  const answer = data as Record<string, unknown>;
  if (answer["ok"] !== true) return refusedContact(answer);
  const source = answer["channels"];
  const channels: Partial<Record<ContactChannel, string>> = {};
  if (source !== null && typeof source === "object") {
    const record = source as Record<string, unknown>;
    for (const channel of CHANNELS) {
      const entry = record[channel];
      if (entry === null || typeof entry !== "object") continue;
      const row = entry as Record<string, unknown>;
      if (row["show"] === true && typeof row["value"] === "string" && row["value"].trim() !== "") {
        channels[channel] = row["value"];
      }
    }
  }
  return { ok: true, channels };
}

/** https://t.me/<handle> — the handle without a leading @, only [A-Za-z0-9_]; null when nothing is left. */
export function telegramHref(handle: string): SafeHref | null {
  const clean = handle.replace(/^@+/, "").replace(/[^A-Za-z0-9_]/g, "");
  return clean === "" ? null : safeHref(`https://t.me/${clean}`);
}

/** https://wa.me/<digits>?text=... — the leading + dropped; null under 8 digits. */
export function whatsappHref(number: string, text: string): SafeHref | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return safeHref(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`);
}

/** tel:<number> — the stored value's digits and one leading +; null under three digits. */
export function telHref(number: string): SafeHref | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 3) return null;
  return safeHref(`tel:${number.trim().startsWith("+") ? "+" : ""}${digits}`);
}
