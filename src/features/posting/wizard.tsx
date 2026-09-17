import { Link } from "@tanstack/react-router";

import { PageCard, PAGE_MAIN_CLASS } from "@/components/shell/page-card";
import { useCategoryTree } from "@/features/categories/category-tree";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";

import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { StepCategory } from "./step-category";
import { StepDetails } from "./step-details";
import { StepPhotos } from "./step-photos";
import { StepSpecifications } from "./step-specifications";
import { useDraft } from "./use-draft";
import { IMPLEMENTED_THROUGH, STEPS, TOTAL_STEPS } from "./types";

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
  const { t } = useI18n();
  const { user, loading: authLoading } = useAuth();
  const draft = useDraft(listingId);
  const { tree, isLoading: treeLoading, error: treeError } = useCategoryTree();

  const current = STEPS[draft.step - 1] ?? STEPS[0];
  const chosenCategory =
    draft.values.categoryId === null ? null : (tree.byId.get(draft.values.categoryId) ?? null);

  /**
   * The step's own client-side completeness — the door decides for real.
   *
   * STEP 3 IS DELIBERATELY ALWAYS READY: which details a category REQUIRES is the
   * validator's judgement (it knows dependencies, presets and bounds), so mirroring
   * it here would risk a form that blocks what the door would accept, or worse,
   * lets through what it refuses. `Next` sends, and a missing answer comes back as
   * a refusal under its own control.
   */
  const stepReady =
    draft.step === 1
      ? draft.values.categoryId !== null
      : draft.step === 2
        ? draft.photos.length > 0
        : draft.step === 3
          ? true
          : draft.step === 4
            ? draft.values.title.trim() !== "" && draft.values.description.trim() !== ""
            : false;

  // A signed-out visitor is TOLD to sign in rather than redirected: `/post` is a
  // public route, and an auth gate here would both lose the intent and put a
  // localStorage-dependent guard on a server-rendered path.
  if (authLoading) {
    return (
      <main className={PAGE_MAIN_CLASS}>
        <PageCard>
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        </PageCard>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className={PAGE_MAIN_CLASS}>
        <PageCard>
          <h1 className="text-lg font-semibold text-foreground">{t("post.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground" data-testid="post-signin-required">
            {t("post.signIn.required")}
          </p>
          <Link
            to="/auth"
            data-testid="post-signin-link"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            {t("post.signIn.action")}
          </Link>
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

        {draft.loading ? (
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        ) : (
          <section data-testid={`post-step-${draft.step}`}>
            {draft.step === 1 && (
              <StepCategory
                tree={tree}
                isLoading={treeLoading}
                treeError={treeError}
                chosenId={draft.values.categoryId}
                onChoose={(categoryId) => {
                  // An empty id is the "change" affordance clearing the choice;
                  // it is a local edit, not a save (the door has no such move).
                  if (categoryId === "") {
                    draft.change({ categoryId: null }, false);
                    return;
                  }
                  draft.change({ categoryId }, true);
                }}
              />
            )}
            {draft.step === 2 && (
              <StepPhotos
                listingId={draft.listingId}
                photos={draft.photos}
                onChanged={draft.reloadPhotos}
                illustrationUrl={chosenCategory?.imageUrl ?? null}
              />
            )}
            {draft.step === 2 && draft.photos.length === 0 && (
              <p className="mt-3 text-xs text-muted-foreground" data-testid="post-photos-needone">
                {t("post.photos.needOne")}
              </p>
            )}
            {draft.step === 3 && (
              <StepSpecifications
                categoryId={draft.values.categoryId}
                values={draft.values.attributes}
                refusals={draft.refusals}
                onChange={(attributes, immediate) => draft.change({ attributes }, immediate)}
              />
            )}
            {draft.step === 4 && (
              <StepDetails
                categoryId={draft.values.categoryId}
                attributes={draft.values.attributes}
                title={draft.values.title}
                description={draft.values.description}
                videoUrl={draft.values.videoUrl}
                refusals={draft.refusals}
                onChange={(patch, immediate) => draft.change(patch, immediate)}
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
          .filter((refusal) => !(draft.step === 3 && refusal.field !== ""))
          .filter(
            (refusal) =>
              !(
                draft.step === 4 &&
                ["title", "description", "video_url", "videoUrl"].includes(refusal.field)
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
          <button
            type="button"
            data-testid="post-next"
            className={`${navButtonClass} bg-primary text-primary-foreground hover:bg-primary/90`}
            disabled={!stepReady || draft.step >= TOTAL_STEPS}
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
        </footer>
      </PageCard>
    </main>
  );
}

export default PostingWizard;
