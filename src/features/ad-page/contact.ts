import { supabase } from "@/integrations/supabase/client";

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
      reason: "sellersCapReached" | "rateLimited" | "listingNotAvailable" | "failed";
    };

export type RevealAnswer =
  | { ok: true; channels: Partial<Record<ContactChannel, string>> }
  | {
      ok: false;
      reason:
        | "sellersCapReached"
        | "rateLimited"
        | "listingNotAvailable"
        | "acceptanceRequired"
        | "failed";
    };

const CHANNELS: readonly ContactChannel[] = ["phone", "phone2", "telegram", "whatsapp"];

export async function revealContact(publicId: string): Promise<RevealAnswer> {
  const { data, error } = await supabase.rpc("reveal_listing_contact", {
    p_public_id: publicId,
  } as never);
  if (error) {
    return {
      ok: false,
      reason: error.message.includes("listingNotAvailable") ? "listingNotAvailable" : "failed",
    };
  }
  if (data === null || typeof data !== "object") return { ok: false, reason: "failed" };
  const answer = data as Record<string, unknown>;
  if (answer["ok"] !== true) {
    const reason = answer["reason"];
    return {
      ok: false,
      reason:
        reason === "sellersCapReached" ||
        reason === "rateLimited" ||
        reason === "acceptanceRequired"
          ? reason
          : "failed",
    };
  }
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
export function telegramHref(handle: string): string | null {
  const clean = handle.replace(/^@+/, "").replace(/[^A-Za-z0-9_]/g, "");
  return clean === "" ? null : `https://t.me/${clean}`;
}

/** https://wa.me/<digits>?text=... — the leading + dropped; null under 8 digits. */
export function whatsappHref(number: string, text: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** tel:<number> — spaces removed. */
export function telHref(number: string): string {
  return `tel:${number.replace(/\s+/g, "")}`;
}
