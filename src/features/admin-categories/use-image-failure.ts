import { useState } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, splitRefusal } from "@/lib/refusal";

import { CATEGORY_REFUSALS } from "./category-refusals";
import { CategoryImageError } from "./category-images-service";

/** A door's code, `code[:detail]`: never drawn as the step's own words. */
const CODE_HEAD = /^[a-z][A-Za-z]*$/;
const codeShaped = (message: string) => CODE_HEAD.test(splitRefusal(message).key);

/**
 * The picture surface's failure line. A route or storage step's failure names the step and its
 * own words; a door's refusal (the persist step, the accept) reads the categories family's words
 * through the one reader (F1-4a), and a code without words names the step alone.
 */
export function useImageFailure() {
  const { t, has } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const failed = t("admin.categories.error.imageFailed");
    const stageOf = (stage: string | null) =>
      stage === null ? "" : ` (${t("admin.categories.image.stageLabel")} ${stage})`;
    if (error instanceof CategoryImageError && error.stage !== "persist") {
      setMessage(`${failed}${stageOf(error.stage)}: ${error.message}`);
      return;
    }
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
      const own = codeShaped(error.message) ? "" : `: ${error.message}`;
      setMessage(`${failed}${stageOf(error.stage)}${own}`);
      return;
    }
    setMessage(failed);
  };
  return { message, setMessage, fail };
}
