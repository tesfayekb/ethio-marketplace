import type { MessageKey } from "@/i18n";

/**
 * Bundle 11, the Listings console, turn L2b (D136 4, D137) — what an admin's
 * move asks for and how the door's refusals read.
 *
 * The door `admin_move_listing(listing, to, reason, note)` (turn L1) is the
 * authority: it checks listings:enforce, the second factor, the move, the
 * reason for that move, the note (required for "other", at most 500
 * characters) and, for Restore, the severe flag. The lists below mirror its
 * reason lists so the dialog offers only what the door accepts.
 */

export type MoveKind = "remove" | "restore" | "send_back";

/** Where each move takes the listing (the door's `p_to`). */
export const MOVE_TARGET: Record<MoveKind, "removed" | "screening"> = {
  remove: "removed",
  restore: "screening",
  send_back: "screening",
};

export const MOVE_REASONS: Record<MoveKind, readonly string[]> = {
  remove: ["prohibited", "misleading", "duplicate", "contact_in_text", "photo", "rules", "other"],
  restore: ["removed_in_error", "appeal_accepted", "other"],
  send_back: ["wrong_category", "misleading", "contact_in_text", "photo", "rules", "other"],
};

export const NOTE_MAX = 500;

/** The move's own word: the menu item, the selection bar's button and the dialog's button. */
export const MOVE_LABEL: Record<MoveKind, MessageKey> = {
  remove: "admin.listings.action.remove",
  restore: "admin.listings.action.restore",
  send_back: "admin.listings.action.sendBack",
};

/** Which move a listing in this state can take (the door's legal moves). */
export function movesFor(status: string): MoveKind[] {
  const moves: MoveKind[] = [];
  if (status === "active" || status === "reduced") moves.push("send_back");
  if (status !== "removed" && status !== "draft") moves.push("remove");
  if (status === "removed") moves.push("restore");
  return moves;
}

/** What is still missing before the move can be sent; null when nothing is. */
export function moveProblem(reason: string, note: string): MessageKey | null {
  if (reason === "") return "admin.listings.move.pickReason";
  if (reason === "other" && note.trim() === "") return "admin.listings.move.noteRequired";
  if (note.trim().length > NOTE_MAX) return "admin.listings.move.noteTooLong";
  return null;
}

/** The door's refusal, as the person reads it. */
export function moveErrorKey(message: string): MessageKey {
  if (message === "listing not found") return "admin.listings.move.error.notFound";
  if (message.startsWith("your own listing")) return "admin.listings.move.error.own";
  if (message.startsWith("illegal move")) return "admin.listings.move.error.illegal";
  if (message.startsWith("a listing removed for a severe reason"))
    return "admin.listings.move.error.severe";
  if (message === "rateLimited") return "admin.listings.move.error.rateLimited";
  if (message === "permission denied") return "admin.listings.move.error.denied";
  if (message === "a note is required") return "admin.listings.move.noteRequired";
  if (message === "the note is too long") return "admin.listings.move.noteTooLong";
  return "common.error";
}
