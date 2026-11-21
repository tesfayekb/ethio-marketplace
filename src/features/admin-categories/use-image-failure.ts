import { useState } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, splitRefusal } from "@/lib/refusal";

import { CATEGORY_REFUSALS } from "./category-refusals";
import { CategoryImageError } from "./category-images-service";

/** A door's code, `code[:detail]`: never drawn as the step's own words. */
const CODE_HEAD = /^[a-z][A-Za-z]*$/;
const codeShaped = (message: string) => CODE_HEAD.test(splitRefusal(message).key);

/**
 * The picture surface's failure line. Every failure reads through the one reader first: a code
 * with words (the route's `rateLimited`, a door's refusal at the persist step or the accept) reads
 * the categories family's words (F1-4a). Otherwise the line names the step alone — a route or
 * storage step's raw text is never drawn (bundle 1 part C); a persist sentence keeps its words.
 */
export function useImageFailure() {
  const { t, has } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const failed = t("admin.categories.error.imageFailed");
    const stageOf = (stage: string | null) =>
      stage === null ? "" : ` (${t("admin.categories.image.stageLabel")} ${stage})`;
    const read = readRefusal(error, CATEGORY_REFUSALS, has);
    if (read.silent) {
      setMessage(null);
      return;
    }
    if (read.branch !== "generic" && read.branch !== "doorCode") {
      setMessage(refusalText(read, t));
      return;
    }
    if (error instanceof CategoryImageError) {
      // Bundle 1 part C — a route or storage step's own text is the machine's, never the
      // person's: the step is named alone. A door's sentence at the persist step keeps its words.
      const own =
        error.stage !== "persist" || codeShaped(error.message) ? "" : `: ${error.message}`;
      // The dropped text is kept for whoever debugs it, once, as a failed schema read is.
      if (own === "")
        console.error("[categories] picture step failed:", error.stage, error.message);
      setMessage(`${failed}${stageOf(error.stage)}${own}`);
      return;
    }
    setMessage(failed);
  };
  return { message, setMessage, fail };
}
