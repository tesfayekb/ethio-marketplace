import { Sparkles } from "lucide-react";
import { useState } from "react";

import { useI18n } from "@/i18n";

import { Field, controlClass } from "./field";
import { requestAssist } from "./posting-service";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { ASSIST_TRIES, type Refusal } from "./types";
import { checkText, mergeRefusals } from "./validate";

/**
 * U6-C1b / U6-C1-R2 — STEP 4: TITLE, DESCRIPTION AND THE WRITING HELP (DEC-072).
 *
 * THE ASSIST IS A SUGGESTION, NEVER AN AUTHOR. It is grounded in what the seller
 * already gave — the category path, the step-3 answers, their own draft words and
 * the first three photos — and the answer arrives as a SUGGESTION beside the
 * fields, not into them: the seller reads it, then presses "Use this one". Their
 * own text stays editable throughout, so authorship never leaves them.
 *
 * EVERY TRY IS KEPT. Up to five suggestions build a short history, each one
 * offered for use, each one told to take a different angle from the ones before.
 * The budget belongs to the DOOR (five per listing) and the remaining count is
 * said in words — never a button that silently stops working.
 *
 * A provider that cannot answer says so in words (F4); it never writes a
 * placeholder.
 */

const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1200;

interface Suggestion {
  title: string;
  description: string;
}

export function StepDetails({
  listingId,
  categoryId,
  categoryPath,
  attributes,
  photoUrls,
  title,
  description,
  onChange,
  refusals,
}: {
  listingId: string | null;
  categoryId: string | null;
  /** The chosen category's full path, already in the seller's language. */
  categoryPath: string;
  attributes: Record<string, unknown>;
  /** The first three stored photos (card variant), passed to the assistant. */
  photoUrls: string[];
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
  const [history, setHistory] = useState<Suggestion[]>([]);
  const [assistRefusal, setAssistRefusal] = useState<string | null>(null);
  const [triesLeft, setTriesLeft] = useState<number | null>(null);

  /**
   * U6-C1-R3a / STEP 8 — THE SAME RULES, ON BLUR. What the seller has written is
   * judged when they leave the field, in the door's own words (`required`,
   * `tooLong`), so nothing waits until Next to be told. The door still decides
   * (F3): a refusal it sends replaces whatever this screen saw.
   */
  const [local, setLocal] = useState<Refusal[]>([]);
  const seen = mergeRefusals(refusals, local);
  const note = (field: string, found: Refusal | null) =>
    setLocal((prev) => [
      ...prev.filter((entry) => entry.field !== field),
      ...(found ? [found] : []),
    ]);

  const titleRefusal = refusalFor(seen, "title");
  const descriptionRefusal = refusalFor(seen, "description");

  /** The door's own count when it gave one; otherwise what this screen has spent. */
  const left = triesLeft ?? Math.max(0, ASSIST_TRIES - history.length);
  const spent = left === 0;

  const assist = async () => {
    if (categoryId === null || assisting || spent) return;
    setAssisting(true);
    setAssistRefusal(null);
    const answer = await requestAssist({
      listingId,
      categoryId,
      categoryPath,
      attrs: attributes,
      locale: language,
      photoUrls: photoUrls.slice(0, 3),
      title,
      description,
      previous: history,
    });
    setAssisting(false);

    const suggestedTitle = answer.payload["title"];
    const suggestedDescription = answer.payload["description"];
    const reportedLeft = answer.payload["triesLeft"];
    if (typeof reportedLeft === "number") setTriesLeft(reportedLeft);
    if (
      answer.ok &&
      typeof suggestedTitle === "string" &&
      typeof suggestedDescription === "string"
    ) {
      setHistory((prev) =>
        [...prev, { title: suggestedTitle, description: suggestedDescription }].slice(
          -ASSIST_TRIES,
        ),
      );
      if (typeof reportedLeft !== "number") setTriesLeft(null);
      return;
    }
    setAssistRefusal(answer.refusals[0]?.reason ?? "providerUnavailable");
  };

  return (
    <div className="space-y-5" data-testid="post-details">
      <p className="text-sm text-muted-foreground">{t("post.details.why")}</p>

      <Field
        id="post-title"
        label={t("post.details.titleLabel")}
        required
        refusal={titleRefusal}
        hint={
          <p className="text-xs text-muted-foreground">
            {fill(t("post.details.count"), { count: title.length, max: TITLE_MAX })}
          </p>
        }
      >
        <input
          id="post-title"
          data-testid="post-title"
          className={controlClass(titleRefusal !== null, title.trim() === "")}
          value={title}
          maxLength={TITLE_MAX}
          placeholder={t("post.details.titlePlaceholder")}
          onBlur={(event) =>
            note(
              "title",
              checkText("title", event.target.value, { required: true, max: TITLE_MAX }),
            )
          }
          onChange={(event) => onChange({ title: event.target.value }, false)}
        />
      </Field>

      <Field
        id="post-description"
        label={t("post.details.descriptionLabel")}
        required
        refusal={descriptionRefusal}
        hint={
          <p className="text-xs text-muted-foreground">
            {fill(t("post.details.count"), { count: description.length, max: DESCRIPTION_MAX })}
          </p>
        }
      >
        <textarea
          id="post-description"
          data-testid="post-description"
          rows={6}
          className={controlClass(descriptionRefusal !== null, description.trim() === "")}
          value={description}
          maxLength={DESCRIPTION_MAX}
          placeholder={t("post.details.descriptionPlaceholder")}
          onBlur={(event) =>
            note(
              "description",
              checkText("description", event.target.value, {
                required: true,
                max: DESCRIPTION_MAX,
              }),
            )
          }
          onChange={(event) => onChange({ description: event.target.value }, false)}
        />
      </Field>

      {/* U6-C1-R3a / STEP 7 — THE SUGGESTIONS COME FIRST. They belong beside the
          words they are about, between the description and the button that asks
          for another one: the seller reads, uses or ignores, and only then asks
          again. The button below them carries the sparkle that marks machine help
          everywhere else in the product. */}
      {history.length > 0 && (
        <div className="space-y-3" data-testid="post-assist-history">
          <p className="text-sm font-medium text-foreground">{t("post.assist.historyLabel")}</p>
          {history.map((entry, index) => (
            <div
              key={`${index}-${entry.title}`}
              className="space-y-2 rounded-md border border-input p-3"
              data-testid="post-assist-suggestion"
              data-index={index}
            >
              <p className="text-xs text-muted-foreground">
                {fill(t("post.assist.suggestionNumber"), { number: index + 1 })}
              </p>
              <p
                className="text-sm font-medium text-foreground"
                data-testid="post-assist-suggestion-title"
              >
                {entry.title}
              </p>
              <p
                className="text-sm text-muted-foreground"
                data-testid="post-assist-suggestion-description"
              >
                {entry.description}
              </p>
              <button
                type="button"
                data-testid="post-assist-use"
                data-index={index}
                className={
                  "inline-flex min-h-11 items-center rounded-md border border-input px-4 " +
                  "text-sm font-medium text-foreground hover:bg-muted"
                }
                onClick={() =>
                  onChange({ title: entry.title, description: entry.description }, true)
                }
              >
                {t("post.assist.use")}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <button
          type="button"
          data-testid="post-assist"
          data-state={assisting ? "working" : history.length > 0 ? "done" : "idle"}
          disabled={assisting || categoryId === null || spent}
          className={
            "inline-flex min-h-11 items-center gap-2 rounded-md border border-input px-4 text-sm " +
            "font-medium text-foreground hover:bg-muted disabled:opacity-60"
          }
          onClick={() => void assist()}
        >
          <Sparkles
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
            data-testid="post-assist-icon"
          />
          <span>
            {assisting
              ? t("post.assist.working")
              : history.length === 0
                ? t("post.assist.action")
                : t("post.assist.again")}
          </span>
        </button>
        <p className="text-xs text-muted-foreground">{t("post.assist.hint")}</p>
        {history.length > 0 && (
          <p className="text-xs text-foreground" data-testid="post-assist-done">
            {t("post.assist.done")}
          </p>
        )}
        <p
          className="text-xs text-muted-foreground"
          data-testid="post-assist-tries"
          data-left={left}
        >
          {spent
            ? fill(t("post.assist.exhausted"), { max: ASSIST_TRIES })
            : fill(t("post.assist.triesLeft"), { left, max: ASSIST_TRIES })}
        </p>
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
