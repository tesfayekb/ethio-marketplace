import { rpc } from "@/lib/supabase-door";
import { ownValue } from "@/lib/own-key";
import { rateUntilOf } from "@/lib/refusal";
import { reportRefusal, type ReportRefusal } from "./ad-page-refusals";

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
export type ReportAnswer = { ok: true } | { ok: false; reason: ReportRefusal; until?: string };

export async function reportListing(
  publicId: string,
  reason: ReportReason,
  note: string,
): Promise<ReportAnswer> {
  try {
    const { data, error } = await rpc("report_listing", {
      p_public_id: publicId,
      p_reason: reason,
      p_note: note.trim() === "" ? null : note.trim(),
    } as never); // The generated optional text type omits SQL NULL; the door accepts it.
    if (error) {
      console.error("[report-listing]", error.message);
      // F1-5b — the shell's refusal is a code (`alreadyReported`, `ownListing`, `rateLimited`, ...).
      const refused = reportRefusal(error);
      const until = refused === "rateLimited" ? rateUntilOf(error) : undefined;
      // L22c — the reset instant rides along only when the dial named one.
      return until === undefined
        ? { ok: false, reason: refused }
        : { ok: false, reason: refused, until };
    }
    if (data === null || typeof data !== "object" || Array.isArray(data))
      return { ok: false, reason: "failed" };
    if (ownValue(data, "ok") === true) return { ok: true };
    return { ok: false, reason: "failed" };
  } catch (error) {
    console.error("[report-listing]", error);
    return { ok: false, reason: "failed" };
  }
}
