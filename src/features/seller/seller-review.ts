import { readerFailure, ReaderError } from "@/lib/reader-failure";
import { rpc } from "@/lib/supabase-door";

/**
 * N1b-2c (INC-977) — whether the signed-in owner's seller name is held for review,
 * from `my_seller_line()`'s `under_review` (M3a). Through the door (DEC-261), so a
 * public page (the owner's own ad page) carries no client on its first download.
 * A failed or malformed read throws a typed ReaderError: unknown is never "not held".
 */
export async function readSellerReview(): Promise<boolean> {
  const { data, error } = await rpc("my_seller_line");
  if (error) throw new ReaderError(readerFailure(error));
  const row =
    data !== null && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;
  if (row === null || typeof row.under_review !== "boolean")
    throw new ReaderError({ class: "malformed", message: "my_seller_line: under_review" });
  return row.under_review;
}
