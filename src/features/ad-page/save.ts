import { levelsOf, parseCard, type FeedListing } from "@/features/feed/feed-page";
import { seedLevelRows, type LevelRow } from "@/features/levels/levels-store";
import { rpc } from "@/lib/supabase-door";
import type { Json } from "@/integrations/supabase/types";
import { rateUntilOf, saveRefusal, type SaveRefusal } from "./ad-page-refusals";

export type SaveAnswer =
  | { ok: true; saved: boolean; count: number }
  | { ok: false; reason: SaveRefusal; until?: string };

/** L22c — a refused answer; the reset instant rides along only when the dial named one. */
function refusedAnswer(reason: SaveRefusal, until: string | undefined): SaveAnswer {
  return reason === "rateLimited" && until !== undefined
    ? { ok: false, reason, until }
    : { ok: false, reason };
}

async function toggle(
  publicId: string,
  door: "save_listing" | "unsave_listing",
): Promise<SaveAnswer> {
  try {
    const { data, error } = await rpc(door, { p_public_id: publicId });
    if (error) {
      console.error(`[save-error] ${door}`, error.message);
      // F1-5b — the shell's refusal is a code (`ownListing`, `rateLimited`, ...), read by the one reader.
      return refusedAnswer(saveRefusal(error), rateUntilOf(error));
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

/** INC-1191 — what a signed-in viewer is to one ad: has saved it, and is its seller. */
export type ViewerState = { saved: boolean; owner: boolean };

/** The viewer's state answer's shape guard: exactly two booleans, nothing narrowed by a cast. */
function viewerStateOf(data: unknown): ViewerState | null {
  if (data === null || typeof data !== "object" || Array.isArray(data)) return null;
  const { saved, owner } = data as Record<string, unknown>;
  return typeof saved === "boolean" && typeof owner === "boolean" ? { saved, owner } : null;
}

/**
 * INC-1191 (F1-7a) — THE VIEWER'S STATE, ONE SIGNED-IN READ. `listing_viewer_state` (a reader on
 * the gate) answers `{ saved, owner }` for an ad by its public id; the anonymous public read
 * cannot know the viewer, so the ad page asks this once a person is signed in. `null` is
 * unknown (a refusal, a malformed answer, a transport failure — logged), never "not the owner".
 */
export async function listingViewerState(publicId: string): Promise<ViewerState | null> {
  try {
    const { data, error } = await rpc("listing_viewer_state", { p_public_id: publicId });
    if (error) {
      console.error("[save-error] listing_viewer_state", error.message);
      return null;
    }
    const state = viewerStateOf(data);
    if (state === null) {
      console.error("[save-error] listing_viewer_state: malformed answer");
      return null;
    }
    return state;
  } catch (error) {
    console.error("[save-error] listing_viewer_state", error);
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
