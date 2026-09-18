import { useCallback, useEffect, useState } from "react";

import { PageCard, PAGE_MAIN_CLASS } from "@/components/shell/page-card";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { entityName } from "@/i18n/entity";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";

import { RefusalSummary } from "./field";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { StepCategory } from "./step-category";
import { StepDetails } from "./step-details";
import { StepPhotos } from "./step-photos";
import { StepPricing } from "./step-pricing";
import { StepWhere } from "./step-where";
import { StepWho } from "./step-who";
import { StepReview } from "./step-review";
import { StepSpecifications } from "./step-specifications";
import { readPostingSchema } from "./posting-service";
import { useDraft } from "./use-draft";
import { IMPLEMENTED_THROUGH, STEPS, TOTAL_STEPS, type CategoryFacts } from "./types";

/**
 * U6-C1a — THE WIZARD SHELL: ONE SCREEN AT A TIME, AT 360 PIXELS.
 *
 * The shape is dictated by the audience, not by taste. A seller on a 360-pixel
 * Android with a data bill sees ONE question per screen, knows where they are
 * ("Step 2 of 8"), can always go Back for free, and never loses an answer to a
 * dropped connection. Hence:
 *
 *  - `Next` is disabled until the step's own answers are present — a mirror of
 *    the door's rule, never a replacement for it: the server is the authority and
 *    its refusals land under the named fields below.
 *  - The draft is created at step 1 the moment a category is chosen, so the work
 *    is recoverable from that instant onwards; `/post/<id>` resumes it.
 *  - The save caption is always visible and always honest (saving / saved / not
 *    saved yet — retrying).
 *
 * This landing implements steps 1–2 (C1a). Steps 3–8 render an honest "opens
 * later" note rather than a fake control; C1b fills them in.
 */

const navButtonClass =
  "inline-flex min-h-11 grow items-center justify-center rounded-md px-4 text-sm font-medium " +
  "transition-colors disabled:opacity-60";

export function PostingWizard({ listingId }: { listingId: string | null }) {
  const { t, entities } = useI18n();
  const { user, loading: authLoading } = useAuth();
  const draft = useDraft(listingId);
  const { tree, isLoading: treeLoading, error: treeError } = useCategoryTree();

  // Which detail keys step 3 renders: refusals naming one of them are shown
  // under that control, and every other refusal still reaches the seller (F4).
  const [specFields, setSpecFields] = useState<string[]>([]);
  const onSpecFields = useCallback((keys: string[]) => {
    // I3 — an equality-guarded write: a re-render must not feed a fresh array
    // back into the state it derives from.
    setSpecFields((prev) =>
      prev.length === keys.length && prev.every((key, index) => key === keys[index]) ? prev : keys,
    );
  }, []);

  /**
   * U6-C2a — WHAT THE CATEGORY DECIDES, read once per category from the same
   * public posting read step 1 and step 3 already use. Step 5 mirrors it; the
   * door remains the authority (F3).
   */
  const [facts, setFacts] = useState<CategoryFacts | null>(null);
  const categoryId = draft.values.categoryId;
  useEffect(() => {
    if (categoryId === null) {
      setFacts(null);
      return;
    }
    let cancelled = false;
    void readPostingSchema(categoryId).then((schema) => {
      if (!cancelled) setFacts(schema?.category ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const current = STEPS[draft.step - 1] ?? STEPS[0];
  const chosenCategory =
    draft.values.categoryId === null ? null : (tree.byId.get(draft.values.categoryId) ?? null);

  /**
   * U6-C1-R1 — NO CLIENT GATE. `Next` is always pressable (only a publish in
   * flight stops it). The reason is the operator walk: a greyed button with no
   * explanation is a dead end, and a client mirror of the validator's rules is
   * a second authority that will eventually disagree with the door (F3).
   *
   * So `Next` SENDS, the door judges, and the refusals it returns are rendered
   * twice: under each named field, and as one red summary above `Next` listing
   * the fields still to complete. The seller always knows what is missing and
   * always has a way to ask.
   */

  // D20 (U6-C2a) — a signed-out visitor never reaches this screen: the route's own
  // `beforeLoad` sends them to `/auth?return=…` and brings them back. What is left
  // here is the honest in-between: the session is still being read, or the
  // redirect is in flight.
  if (authLoading || user === null) {
    return (
      <main className={PAGE_MAIN_CLASS}>
        <PageCard>
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        </PageCard>
      </main>
    );
  }

  if (draft.loadError !== null) {
    return (
      <main className={PAGE_MAIN_CLASS}>
        <PageCard>
          <p className="text-sm text-destructive" data-testid="post-load-error">
            {draft.loadError === "notFound" ? t("post.error.notYours") : t("post.error.load")}
          </p>
        </PageCard>
      </main>
    );
  }

  const categoryRefusal = refusalFor(draft.refusals, "category_id");

  return (
    <main className={PAGE_MAIN_CLASS}>
      <PageCard className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-lg font-semibold text-foreground">{t("post.title")}</h1>
          <p className="text-sm text-muted-foreground" data-testid="post-step-header">
            {fill(t("post.stepOf"), {
              step: draft.step,
              total: TOTAL_STEPS,
              name: t(current.nameKey),
            })}
          </p>
          {/* The progress rail: eight segments, the passed ones filled. */}
          <ol
            aria-label={t("post.progress.label")}
            data-testid="post-progress"
            className="flex gap-1"
          >
            {STEPS.map((entry) => (
              <li
                key={entry.step}
                aria-current={entry.step === draft.step ? "step" : undefined}
                className={`h-1 grow rounded-full ${
                  entry.step <= draft.step ? "bg-primary" : "bg-muted"
                }`}
              >
                <span className="sr-only">{t(entry.nameKey)}</span>
              </li>
            ))}
          </ol>
          <p
            className="text-xs text-muted-foreground"
            data-testid="post-save-state"
            data-state={draft.saveState}
          >
            {draft.saveState === "saving" && t("post.save.saving")}
            {draft.saveState === "saved" && t("post.save.saved")}
            {draft.saveState === "unsaved" && t("post.save.unsaved")}
          </p>
          {/* INC-227 — a rate refusal is a WAIT, never a wall: the caption counts
              it down and `Next` keeps working. */}
          {draft.pauseSeconds > 0 && (
            <p className="text-xs text-muted-foreground" data-testid="post-save-paused">
              {fill(t("post.save.paused"), { seconds: draft.pauseSeconds })}
            </p>
          )}
          {draft.saveState === "unsaved" && (
            <button
              type="button"
              data-testid="post-save-retry"
              className="min-h-11 rounded-md border border-input px-3 text-xs font-medium text-foreground"
              onClick={draft.retry}
            >
              {t("post.action.retry")}
            </button>
          )}
        </header>

        {/* THE CHIP: the chosen category, on every step after the first, with the
            way back to change it. The walk asked for the path, not the leaf. */}
        {draft.step > 1 && chosenCategory !== null && (
          <div
            className="flex flex-wrap items-center gap-2 rounded-md bg-muted px-3 py-2"
            data-testid="post-category-chip"
          >
            <span className="text-xs text-foreground" data-testid="post-category-chip-path">
              {pathOf(tree, chosenCategory.id)
                .map((node) => entityName("category", node, entities))
                .join(" › ")}
            </span>
            <button
              type="button"
              data-testid="post-category-chip-change"
              className="text-xs font-medium text-primary underline"
              onClick={() => draft.goTo(1)}
            >
              {t("post.category.change")}
            </button>
          </div>
        )}

        {draft.loading ? (
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        ) : (
          <section data-testid={`post-step-${draft.step}`}>
            {draft.step === 1 && (
              <StepCategory
                tree={tree}
                isLoading={treeLoading}
                treeError={treeError}
                onChoose={(categoryId) => {
                  // ONE CONTROL, AUTO-ADVANCE: choosing a postable leaf IS the
                  // answer to step 1, so the wizard saves it and moves on. No
                  // confirmation screen — the chip above every later step is the
                  // confirmation, and it carries the way back.
                  draft.change({ categoryId }, true);
                  void draft.saveAt(1).then((saved) => {
                    if (saved) draft.goTo(2);
                  });
                }}
              />
            )}
            {draft.step === 2 && (
              <StepPhotos
                listingId={draft.listingId}
                photos={draft.photos}
                onChanged={draft.reloadPhotos}
                illustrationUrl={chosenCategory?.imageUrl ?? null}
                videoUrl={draft.values.videoUrl}
                videoRefusal={
                  refusalFor(draft.refusals, "video_url") ?? refusalFor(draft.refusals, "videoUrl")
                }
                onChangeVideo={(videoUrl) => draft.change({ videoUrl }, false)}
                onSkip={() => {
                  void draft.saveAt(2).then((saved) => {
                    if (saved) draft.goTo(3);
                  });
                }}
              />
            )}
            {draft.step === 3 && (
              <StepSpecifications
                categoryId={draft.values.categoryId}
                values={draft.values.attributes}
                refusals={draft.refusals}
                onChange={(attributes, immediate) => draft.change({ attributes }, immediate)}
                onFields={onSpecFields}
              />
            )}
            {draft.step === 4 && (
              <StepDetails
                categoryId={draft.values.categoryId}
                attributes={draft.values.attributes}
                title={draft.values.title}
                description={draft.values.description}
                refusals={draft.refusals}
                onChange={(patch, immediate) => draft.change(patch, immediate)}
              />
            )}
            {draft.step === 5 && (
              <StepPricing
                facts={facts}
                values={{
                  priceMode: draft.values.priceMode,
                  priceAmount: draft.values.priceAmount,
                  priceCurrency: draft.values.priceCurrency,
                  pricePeriod: draft.values.pricePeriod,
                  posterExpiresAt: draft.values.posterExpiresAt,
                }}
                refusals={draft.refusals}
                onChange={(patch, immediate) => draft.change(patch, immediate)}
              />
            )}
            {draft.step === 6 && (
              <StepWhere
                coverage={draft.values.coverage}
                refusals={draft.refusals}
                onChange={(coverage, immediate) => draft.change({ coverage }, immediate)}
              />
            )}
            {draft.step === 7 && (
              <StepWho
                contactPref={draft.values.contactPref}
                refusals={draft.refusals}
                onChange={(contactPref, immediate) => draft.change({ contactPref }, immediate)}
              />
            )}
            {draft.step === 8 && (
              <StepReview
                listingId={draft.listingId}
                values={draft.values}
                photos={draft.photos}
                expiryDays={facts?.expiryDays ?? 60}
                refusals={draft.refusals}
                onChangeExpiry={(posterExpiresAt) => draft.change({ posterExpiresAt }, true)}
                onGoTo={draft.goTo}
              />
            )}
            {draft.step > IMPLEMENTED_THROUGH && (
              <p className="text-sm text-muted-foreground" data-testid="post-step-later">
                {t("post.stepLater")}
              </p>
            )}
          </section>
        )}

        {categoryRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-refusal-category">
            {t(draftRefusalKey(categoryRefusal.reason))}
          </p>
        )}
        {draft.refusals
          // A refusal is shown ONCE. Steps 3 and 4 render every refusal that
          // names one of their own controls beneath that control, which is where
          // a seller can act on it; only refusals with no field of their own on
          // screen fall through to this list (F4 — never swallowed).
          .filter((refusal) => refusal.field !== "category_id")
          .filter((refusal) => !(draft.step === 3 && specFields.includes(refusal.field)))
          // The YouTube link moved to step 2 (U6-C1-R1), so its refusal is shown
          // there, beside the field that owns it.
          .filter(
            (refusal) => !(draft.step === 2 && ["video_url", "videoUrl"].includes(refusal.field)),
          )
          .filter(
            (refusal) => !(draft.step === 4 && ["title", "description"].includes(refusal.field)),
          )
          .filter(
            (refusal) =>
              !(
                draft.step === 5 &&
                [
                  "price_mode",
                  "price_amount",
                  "price_currency",
                  "price_period",
                  "poster_expires_at",
                ].includes(refusal.field)
              ),
          )
          .filter((refusal) => !(draft.step === 6 && refusal.field === "coverage"))
          // Step 8 owns the active window, so `posterExpiry*` renders on it.
          .filter((refusal) => !(draft.step === 8 && refusal.field === "poster_expires_at"))
          .filter(
            (refusal) =>
              !(
                draft.step === 7 &&
                ["contact_pref", "messages", "phone", "telegram", "whatsapp"].includes(
                  refusal.field,
                )
              ),
          )
          .map((refusal) => (
            <p
              key={`${refusal.field}:${refusal.reason}`}
              className="text-sm text-destructive"
              data-testid="post-refusal"
              data-field={refusal.field}
            >
              {t(draftRefusalKey(refusal.reason))}
            </p>
          ))}

        {/* U6-C1-R1 — ONE SUMMARY above the actions, naming by label what is
            still missing; each entry focuses its own control. */}
        <RefusalSummary refusals={draft.refusals} />

        {/* Primary actions sit at the BOTTOM, within thumb reach (C2). */}
        <footer className="flex gap-2 pt-2">
          <button
            type="button"
            data-testid="post-back"
            className={`${navButtonClass} border border-input text-foreground hover:bg-accent`}
            disabled={draft.step === 1}
            onClick={() => draft.goTo(draft.step - 1)}
          >
            {t("post.action.back")}
          </button>
          {/* The last step has no Next: Publish is its only forward action. */}
          {draft.step < TOTAL_STEPS && (
            <button
              type="button"
              data-testid="post-next"
              className={`${navButtonClass} bg-primary text-primary-foreground hover:bg-primary/90`}
              onClick={() => {
                void (async () => {
                  // Autosave on Next: the step advances only once the door has the
                  // answers, so a resume can never land past what was recorded.
                  const saved = await draft.saveAt(draft.step);
                  if (saved) draft.goTo(draft.step + 1);
                })();
              }}
            >
              {t("post.action.next")}
            </button>
          )}
        </footer>
      </PageCard>
    </main>
  );
}

export default PostingWizard;
