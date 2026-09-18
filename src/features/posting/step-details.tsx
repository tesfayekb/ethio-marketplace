import { useState } from "react";

import { useI18n } from "@/i18n";

import { requestAssist } from "./posting-service";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";

/**
 * U6-C1b — STEP 4: TITLE, DESCRIPTION, AND THE WRITING HELP (DEC-072).
 *
 * THE ASSIST IS A SUGGESTION, NEVER AN AUTHOR. It is grounded only in the details
 * the seller already entered — the category and the step-3 answers — and it lands
 * in the two fields as ordinary editable text, so the seller keeps authorship and
 * nothing is ever published that they did not read. A provider that cannot answer
 * says so in words (F4); it never writes a placeholder.
 */

const TITLE_MAX = 120;
const DESCRIPTION_MAX = 4000;

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function StepDetails({
  categoryId,
  attributes,
  title,
  description,
  onChange,
  refusals,
}: {
  categoryId: string | null;
  attributes: Record<string, unknown>;
  title: string;
  description: string;
  onChange: (
    patch: { title?: string; description?: string; videoUrl?: string },
    immediate: boolean,
  ) => void;
  refusals: Refusal[];
}) {
  const { t, language } = useI18n();
  const [assisting, setAssisting] = useState(false);
  const [assisted, setAssisted] = useState(false);
  const [assistRefusal, setAssistRefusal] = useState<string | null>(null);

  const titleRefusal = refusalFor(refusals, "title");
  const descriptionRefusal = refusalFor(refusals, "description");

  const assist = async () => {
    if (categoryId === null || assisting) return;
    setAssisting(true);
    setAssistRefusal(null);
    const answer = await requestAssist({ categoryId, attrs: attributes, locale: language });
    setAssisting(false);

    const suggestedTitle = answer.payload["title"];
    const suggestedDescription = answer.payload["description"];
    if (
      answer.ok &&
      typeof suggestedTitle === "string" &&
      typeof suggestedDescription === "string"
    ) {
      // Both fields at once, saved immediately: the seller sees the suggestion in
      // the same fields they can edit, and the draft holds it even if they leave.
      onChange({ title: suggestedTitle, description: suggestedDescription }, true);
      setAssisted(true);
      return;
    }
    setAssistRefusal(answer.refusals[0]?.reason ?? "providerUnavailable");
  };

  return (
    <div className="space-y-5" data-testid="post-details">
      <p className="text-sm text-muted-foreground">{t("post.details.why")}</p>

      <div className="space-y-1">
        <label htmlFor="post-title" className="text-sm font-medium text-foreground">
          {t("post.details.titleLabel")}
        </label>
        <input
          id="post-title"
          data-testid="post-title"
          className={fieldClass}
          value={title}
          maxLength={TITLE_MAX}
          placeholder={t("post.details.titlePlaceholder")}
          onChange={(event) => onChange({ title: event.target.value }, false)}
        />
        <p className="text-xs text-muted-foreground">
          {fill(t("post.details.count"), { count: title.length, max: TITLE_MAX })}
        </p>
        {titleRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-title-refusal">
            {t(draftRefusalKey(titleRefusal.reason))}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="post-description" className="text-sm font-medium text-foreground">
          {t("post.details.descriptionLabel")}
        </label>
        <textarea
          id="post-description"
          data-testid="post-description"
          rows={6}
          className={fieldClass}
          value={description}
          maxLength={DESCRIPTION_MAX}
          placeholder={t("post.details.descriptionPlaceholder")}
          onChange={(event) => onChange({ description: event.target.value }, false)}
        />
        <p className="text-xs text-muted-foreground">
          {fill(t("post.details.count"), { count: description.length, max: DESCRIPTION_MAX })}
        </p>
        {descriptionRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-description-refusal">
            {t(draftRefusalKey(descriptionRefusal.reason))}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <button
          type="button"
          data-testid="post-assist"
          data-state={assisting ? "working" : assisted ? "done" : "idle"}
          disabled={assisting || categoryId === null}
          className={
            "inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm " +
            "font-medium text-foreground hover:bg-muted disabled:opacity-60"
          }
          onClick={() => void assist()}
        >
          {assisting ? t("post.assist.working") : t("post.assist.action")}
        </button>
        <p className="text-xs text-muted-foreground">{t("post.assist.hint")}</p>
        {assisted && assistRefusal === null && (
          <p className="text-xs text-muted-foreground" data-testid="post-assist-done">
            {t("post.assist.done")}
          </p>
        )}
        {assistRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-assist-refusal">
            {t(draftRefusalKey(assistRefusal))}
          </p>
        )}
      </div>

    </div>
  );
}

export default StepDetails;
