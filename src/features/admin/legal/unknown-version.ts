import { errorText } from "@/lib/error-text";
import { splitRefusal } from "@/lib/refusal";

/** INC-1189 — the reader's `unknownVersion`, read by its code through the one reader's cut. */
export function isUnknownVersion(error: unknown): boolean {
  return error != null && splitRefusal(errorText(error).trim()).key === "unknownVersion";
}
