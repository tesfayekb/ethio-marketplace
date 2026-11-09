import { levelsOf, parseCard, type FeedListing } from "@/features/feed/feed-page";
import { seedLevelRows, type LevelRow } from "@/features/levels/levels-store";
import { rpc } from "@/lib/supabase-door";
import type { Json } from "@/integrations/supabase/types";

export type SaveAnswer =
  | { ok: true; saved: boolean; count: number }
  | { ok: false; reason: "rateLimited" | "ownListing" | "listingNotAvailable" | "failed" };

async function toggle(
  publicId: string,
  door: "save_listing" | "unsave_listing",
): Promise<SaveAnswer> {
  try {
    const { data, error } = await rpc(door, { p_public_id: publicId });
    if (error) {
      console.error(`[save-error] ${door}`, error.message);
      return {
        ok: false,
        reason: error.message.includes("listingNotAvailable") ? "listingNotAvailable" : "failed",
      };
    }
    if (data !== null && typeof data === "object" && !Array.isArray(data)) {
      if (
        data.ok === true &&
        typeof data.saved === "boolean" &&
        typeof data.count === "number" &&
        Number.isInteger(data.count) &&
        data.count >= 0
      )
        return { ok: true, saved: data.saved, count: data.count };
      if (data.ok === false && (data.reason === "rateLimited" || data.reason === "ownListing"))
        return { ok: false, reason: data.reason };
    }
    console.error(`[save-error] ${door}: malformed answer`);
    return { ok: false, reason: "failed" };
  } catch (error) {
    console.error(`[save-error] ${door}`, error);
    return { ok: false, reason: "failed" };
  }
}

export const saveListing = (publicId: string): Promise<SaveAnswer> =>
  toggle(publicId, "save_listing");
export const unsaveListing = (publicId: string): Promise<SaveAnswer> =>
  toggle(publicId, "unsave_listing");

export async function listingSaved(publicId: string): Promise<boolean | null> {
  try {
    const { data, error } = await rpc("listing_saved", { p_public_id: publicId });
    if (error) {
      console.error("[save-error] listing_saved", error.message);
      return null;
    }
    if (typeof data !== "boolean") {
      console.error("[save-error] listing_saved: malformed answer");
      return null;
    }
    return data;
  } catch (error) {
    console.error("[save-error] listing_saved", error);
    return null;
  }
}

export type SavedCard =
  | (FeedListing & { savedAt: string; available: true })
  | { id: string; publicId: string | null; savedAt: string; available: false };

/**
 * One saved card, or null on a mismatch: an available one by the feed's own card
 * parser (its step is 1), an unavailable one by its id, address and save time.
 */
function savedCardOf(value: unknown, levels: readonly LevelRow[]): SavedCard | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const { id, publicId, savedAt, available } = value as Record<string, unknown>;
  if (typeof savedAt !== "string" || typeof available !== "boolean") return null;
  if (!available) {
    if (typeof id !== "string") return null;
    if (publicId !== null && typeof publicId !== "string") return null;
    return { id, publicId, savedAt, available: false };
  }
  const card = parseCard(value, 1, levels);
  return card === null ? null : { ...card, savedAt, available: true };
}

export async function mySaved(
  after: unknown | null,
  size: number,
): Promise<{ cards: SavedCard[]; next: unknown | null }> {
  const { data, error } = await rpc("my_saved_listings", {
    p_after: after as Json,
    p_size: size,
  });
  if (error) throw new Error(error.message);
  if (
    data === null ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    !Array.isArray(data.cards) ||
    data.next === undefined
  )
    throw new Error("my_saved_listings: malformed answer");
  const levels = levelsOf(data.levels);
  if (levels === null) throw new Error("my_saved_listings: malformed levels");
  const cards: SavedCard[] = [];
  for (const item of data.cards) {
    const card = savedCardOf(item, levels);
    if (card === null) throw new Error("my_saved_listings: malformed card");
    cards.push(card);
  }
  // P-2 (c) c2a — the browser's level rows come from the answer that arrived (DEC-351 §8).
  seedLevelRows(levels);
  return { cards, next: data.next };
}
