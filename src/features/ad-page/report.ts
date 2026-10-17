import { supabase } from "@/integrations/supabase/client";
import { ownValue } from "@/lib/own-key";

export const REPORT_REASONS = [
  "spam",
  "scam",
  "prohibited",
  "wrongCategory",
  "duplicate",
  "alreadySold",
  "under18",
  "copyright",
  "other",
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];
export type ReportAnswer =
  | { ok: true }
  | { ok: false; reason: "alreadyReported" | "rateLimited" | "ownListing" | "failed" };

export async function reportListing(
  publicId: string,
  reason: ReportReason,
  note: string,
): Promise<ReportAnswer> {
  try {
    const { data, error } = await supabase.rpc("report_listing", {
      p_public_id: publicId,
      p_reason: reason,
      p_note: note.trim() === "" ? null : note.trim(),
    } as never); // The generated optional text type omits SQL NULL; the door accepts it.
    if (error) {
      console.error("[report-listing]", error.message);
      return { ok: false, reason: "failed" };
    }
    if (data === null || typeof data !== "object" || Array.isArray(data))
      return { ok: false, reason: "failed" };
    const answer = data as Record<string, unknown>;
    if (ownValue(answer, "ok") === true) return { ok: true };
    const refused = ownValue(answer, "reason");
    if (
      ownValue(answer, "ok") === false &&
      (refused === "alreadyReported" || refused === "rateLimited" || refused === "ownListing")
    )
      return { ok: false, reason: refused };
    return { ok: false, reason: "failed" };
  } catch (error) {
    console.error("[report-listing]", error);
    return { ok: false, reason: "failed" };
  }
}
