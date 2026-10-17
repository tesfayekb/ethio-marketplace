import type { FeedListing } from "@/features/feed/feed-page";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type SaveAnswer =
  | { ok: true; saved: boolean; count: number }
  | { ok: false; reason: "rateLimited" | "ownListing" | "listingNotAvailable" | "failed" };

async function toggle(
  publicId: string,
  door: "save_listing" | "unsave_listing",
): Promise<SaveAnswer> {
  try {
    const { data, error } = await supabase.rpc(door, { p_public_id: publicId });
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
    const { data, error } = await supabase.rpc("listing_saved", { p_public_id: publicId });
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

export async function mySaved(
  after: unknown | null,
  size: number,
): Promise<{ cards: SavedCard[]; next: unknown | null }> {
  const { data, error } = await supabase.rpc("my_saved_listings", {
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
  return { cards: data.cards as unknown as SavedCard[], next: data.next };
}
