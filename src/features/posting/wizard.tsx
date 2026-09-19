import { useCallback, useEffect, useMemo, useState } from "react";

import { FormLayout } from "@/components/layout/form-layout";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { SplitLayout } from "@/components/layout/split-layout";
import { readAreaCookie } from "@/components/shell/location-data";
import { PageCard } from "@/components/shell/page-card";
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
import { ListingPreview } from "./listing-preview";
import { readPostingSchema, type PlanCaps } from "./posting-service";
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
  /** D22 — the seller's plan caps, as the posting document reports them. */
  const [planCaps, setPlanCaps] = useState<PlanCaps | null>(null);
  /** Set when the seller left the review page to edit one step (U6-C1-R2). */
  const [returnToReview, setReturnToReview] = useState(false);
  /**
   * U6-C1-R3b-1 STEP 2b — WHAT A CATEGORY CHANGE COST.
   *
   * Every category asks its own questions, so moving a half-written draft to
   * another category leaves answers that the new schema has no field for. Those
   * answers are DROPPED — keeping them would mean publishing facts under labels
   * the category never offered — and the seller is told WHICH ones, by label,
   * instead of discovering the gap at the publish door. The photos are not
   * touched: a picture can still be right. They are only FLAGGED, because the fit
   * rule runs again at publish (D21) and a seller warned once is not ambushed.
   */
  const [droppedFields, setDroppedFields] = useState<string[]>([]);
  const [photosNeedRecheck, setPhotosNeedRecheck] = useState(false);
  const categoryId = draft.values.categoryId;
  /** U6-C1-R3a-2 — step 1's only answer: a leaf. No leaf, nothing to send. */
  const needsLeaf = draft.step === 1 && categoryId === null;
  const [triedWithoutLeaf, setTriedWithoutLeaf] = useState(false);

  useEffect(() => {
    if (categoryId === null) {
      setFacts(null);
      return;
    }
    let cancelled = false;
    void readPostingSchema(categoryId).then((schema) => {
      if (cancelled) return;
      setFacts(schema?.category ?? null);
      // D22 — the plan travels with the same document; the caps the wizard holds
      // are never read from a second place.
      setPlanCaps(schema?.plan ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const current = STEPS[draft.step - 1] ?? STEPS[0];
  const chosenCategory =
    draft.values.categoryId === null ? null : (tree.byId.get(draft.values.categoryId) ?? null);

  /**
   * U6-C1-R2 — THE STAND-IN PICTURE INHERITS. Most leaves carry no illustration
   * of their own — the curated images sit on the branches — so the stand-in is
   * the NEAREST ANCESTOR's picture, found by walking the chosen leaf's own path
   * upwards. Nothing is fetched for this: `pathOf` reads the shared tree the
   * step-1 control already loaded.
   */
  const illustrationUrl = useMemo(() => {
    if (chosenCategory === null) return null;
    const chain = pathOf(tree, chosenCategory.id);
    for (let index = chain.length - 1; index >= 0; index -= 1) {
      const url = chain[index]?.imageUrl ?? null;
      if (typeof url === "string" && url !== "") return url;
    }
    return null;
  }, [tree, chosenCategory]);

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
      <PageShell as="main" width="narrow">
        <PageCard>
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        </PageCard>
      </PageShell>
    );
  }

  if (draft.loadError !== null) {
    return (
      <PageShell as="main" width="narrow">
        <PageCard>
          <p className="text-sm text-destructive" data-testid="post-load-error">
            {draft.loadError === "notFound" ? t("post.error.notYours") : t("post.error.load")}
          </p>
        </PageCard>
      </PageShell>
    );
  }

  const categoryRefusal = refusalFor(draft.refusals, "category_id");

  /**
   * U6-C1-R2 — WHAT THE WRITING HELPER IS ALLOWED TO SEE (DEC-072): the chosen
   * category's full path in the seller's own language, and the first three
   * STORED photos' card images. Nothing is fetched for either — the path comes
   * from the tree the step-1 control already loaded, the images from the rows
   * the photo step registered.
   */
  const categoryPath =
    chosenCategory === null
      ? ""
      : pathOf(tree, chosenCategory.id)
          .map((node) => entityName("category", node, entities))
          .join(" › ");
  const assistPhotoUrls = draft.photos
    .map((row) => {
      const paths = row.paths ?? {};
      const card = paths["card"] ?? paths["cover"] ?? paths["thumb"];
      return typeof card === "string" ? card : null;
    })
    .filter((url): url is string => url !== null)
    .slice(0, 3);

  return (
    <PageShell as="main" width="full" data-testid="post-page-shell">
      <SplitLayout
        asideCollapsible
        aside={
          <div className="space-y-4" data-testid="post-desktop-aside">
            <Section>
              <ol className="space-y-2" aria-label={t("post.progress.label")}>
                {STEPS.map((entry) => (
                  <li
                    key={entry.step}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-sm"
                    aria-current={entry.step === draft.step ? "step" : undefined}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-full border text-xs ${
                        entry.step <= draft.step
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {entry.step < draft.step ? "✓" : entry.step}
                    </span>
                    <span className="truncate text-foreground">{t(entry.nameKey)}</span>
                  </li>
                ))}
              </ol>
              {draft.step > 1 && categoryPath !== "" ? (
                <p className="mt-4 text-xs text-muted-foreground">{categoryPath}</p>
              ) : null}
            </Section>
            {draft.step >= 4 && draft.step < 8 ? (
              <ListingPreview
                title={draft.values.title}
                description={draft.values.description}
                priceMode={draft.values.priceMode}
                priceAmount={draft.values.priceAmount}
                priceCurrency={draft.values.priceCurrency}
                pricePeriod={draft.values.pricePeriod}
                attributes={draft.values.attributes}
                definitions={[]}
                photos={draft.photos}
                coverage={draft.values.coverage}
                country={readAreaCookie()?.country ?? null}
                contactPref={draft.values.contactPref}
              />
            ) : null}
          </div>
        }
        main={
          <div className="mx-auto min-w-0 max-w-3xl">
            <Section className="space-y-4">
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
                {/*
                 * U6-C1-R3b-1 STEP 4 — THE MOBILE STEP STRIP. The desktop rail
                 * (the aside) tells a seller where they are and lets them jump
                 * back; below `lg` there was no rail and no way back except Back,
                 * Back, Back. The strip is that rail, laid on its side: eight
                 * numbers, a tick for the ones behind, the current one LABELLED
                 * (a lone highlighted digit is not an answer to "where am I"),
                 * horizontally scrollable at 360.
                 *
                 * ONLY WHAT IS DONE IS TAPPABLE. A step the seller has not reached
                 * has nothing to show and no answers to edit, so it is a plain
                 * number and not a button — an affordance that leads nowhere is a
                 * lie about the wizard's shape.
                 */}
                <ol
                  aria-label={t("post.progress.stripLabel")}
                  data-testid="post-step-strip"
                  className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden"
                >
                  {STEPS.map((entry) => {
                    const done = entry.step < draft.step;
                    const reachable = entry.step <= Math.max(draft.draftStep + 1, draft.step);
                    const current = entry.step === draft.step;
                    const face = (
                      <>
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs ${
                            entry.step <= draft.step
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {done ? "✓" : entry.step}
                        </span>
                        {current ? (
                          <span className="truncate text-xs font-medium text-foreground">
                            {t(entry.nameKey)}
                          </span>
                        ) : (
                          <span className="sr-only">{t(entry.nameKey)}</span>
                        )}
                      </>
                    );
                    return (
                      <li
                        key={entry.step}
                        aria-current={current ? "step" : undefined}
                        data-testid="post-step-strip-item"
                        data-step={entry.step}
                        data-state={current ? "current" : reachable ? "reachable" : "later"}
                      >
                        {reachable && !current ? (
                          <button
                            type="button"
                            data-testid={`post-step-strip-go-${entry.step}`}
                            className="flex min-h-11 items-center gap-2 rounded-md px-1"
                            aria-label={fill(t("post.progress.stepNumber"), { step: entry.step })}
                            onClick={() => draft.goTo(entry.step)}
                          >
                            {face}
                          </button>
                        ) : (
                          <span className="flex min-h-11 items-center gap-2 px-1">{face}</span>
                        )}
                      </li>
                    );
                  })}
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

              {(droppedFields.length > 0 || photosNeedRecheck) && (
                <div
                  className="space-y-1 rounded-md border border-border bg-muted p-3"
                  data-testid="post-category-changed"
                >
                  <p className="text-sm font-medium text-foreground">
                    {t("post.category.changedTitle")}
                  </p>
                  {droppedFields.length > 0 && (
                    <p className="text-sm text-foreground" data-testid="post-category-dropped">
                      {fill(t("post.category.changedDropped"), {
                        fields: droppedFields.join(", "),
                      })}
                    </p>
                  )}
                  {photosNeedRecheck && (
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid="post-category-photos-recheck"
                    >
                      {t("post.category.changedPhotos")}
                    </p>
                  )}
                </div>
              )}

              <FormLayout
                footer={
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        data-testid="post-back"
                        /* U6-C1-R3b-1 STEP 3 — SECONDARY TOKENS, not a bare
                           outline: on the card the old transparent Back read as
                           disabled next to the filled Next. */
                        className={`${navButtonClass} border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80`}
                        disabled={draft.step === 1}
                        onClick={() => draft.goTo(draft.step - 1)}
                      >
                        {t("post.action.back")}
                      </button>
                      {/*
                       * U6-C1-R3b-1 STEP 2a — THE WAY BACK FROM AN EDIT. `Next`
                       * already returns to review, but a seller who decides the
                       * field was fine after all had to press Next (and be judged)
                       * to get back. This returns without claiming anything.
                       * Secondary-button tokens, not a bare link: it sits on the
                       * card beside Next and has to be readable there.
                       */}
                      {returnToReview && draft.step < TOTAL_STEPS ? (
                        <button
                          type="button"
                          data-testid="post-back-to-review"
                          className={`${navButtonClass} border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80`}
                          onClick={() => {
                            setReturnToReview(false);
                            draft.goTo(TOTAL_STEPS);
                          }}
                        >
                          {t("post.action.backToReview")}
                        </button>
                      ) : null}
                      {draft.step < TOTAL_STEPS ? (
                        <button
                          type="button"
                          data-testid="post-next"
                          className={`${navButtonClass} bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60`}
                          /* U6-C1-R3a-2 — STEP 1 HAS ONE ANSWER and it is a leaf:
                             with none chosen there is nothing to send, so Next is
                             closed and says why underneath. Every later step keeps
                             sending (the door is the judge, F3). */
                          disabled={needsLeaf}
                          onClick={() => {
                            void (async () => {
                              const saved = await draft.saveAt(draft.step);
                              if (!saved) return;
                              if (returnToReview) {
                                setReturnToReview(false);
                                draft.goTo(TOTAL_STEPS);
                                return;
                              }
                              draft.goTo(draft.step + 1);
                            })();
                          }}
                        >
                          {t("post.action.next")}
                        </button>
                      ) : null}
                    </div>
                    {needsLeaf && (
                      <p className="text-xs text-muted-foreground" data-testid="post-next-blocked">
                        {t("post.category.nextBlocked")}
                      </p>
                    )}
                  </div>
                }
              >
                <div data-span="full" className="min-w-0 space-y-4">
                  {draft.loading ? (
                    <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
                  ) : (
                    <section
                      data-testid={`post-step-${draft.step}`}
                      /* A KEYBOARD SELLER PRESSING ENTER on step 1 with no leaf gets
                         the same answer as a tap on a closed Next: the choice group
                         outlined, and the reason said (F4). */
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" || !needsLeaf) return;
                        setTriedWithoutLeaf(true);
                      }}
                    >
                      {draft.step === 1 && (
                        <StepCategory
                          tree={tree}
                          isLoading={treeLoading}
                          treeError={treeError}
                          invalid={triedWithoutLeaf && categoryId === null}
                          onChoose={(nextCategoryId) => {
                            // ONE CONTROL, AUTO-ADVANCE: choosing a postable leaf IS the
                            // answer to step 1, so the wizard saves it and moves on. No
                            // confirmation screen — the chip above every later step is the
                            // confirmation, and it carries the way back.
                            setTriedWithoutLeaf(false);
                            const previous = draft.values.categoryId;
                            const answered = Object.keys(draft.values.attributes).length > 0;
                            if (previous === null || previous === nextCategoryId || !answered) {
                              setDroppedFields([]);
                              setPhotosNeedRecheck(false);
                              draft.change({ categoryId: nextCategoryId }, true);
                              void draft.saveAt(1).then((saved) => {
                                if (saved) draft.goTo(2);
                              });
                              return;
                            }
                            // A REAL CHANGE ON A WRITTEN DRAFT: the two schemas are
                            // read (the old one only to LABEL what is leaving), the
                            // orphans are dropped, and the specifications step is
                            // reopened on the answers that remain.
                            void (async () => {
                              const [before, after] = await Promise.all([
                                readPostingSchema(previous),
                                readPostingSchema(nextCategoryId),
                              ]);
                              const allowed = new Set(
                                (after?.attributes ?? []).map((entry) => entry.attrKey),
                              );
                              const kept: Record<string, unknown> = {};
                              const lost: string[] = [];
                              for (const [key, value] of Object.entries(draft.values.attributes)) {
                                if (allowed.has(key)) {
                                  kept[key] = value;
                                  continue;
                                }
                                const definition = (before?.attributes ?? []).find(
                                  (entry) => entry.attrKey === key,
                                );
                                lost.push(definition?.nameEn ?? key);
                              }
                              setDroppedFields(lost);
                              setPhotosNeedRecheck(draft.photos.length > 0);
                              draft.change({ categoryId: nextCategoryId, attributes: kept }, false);
                              // REWIND, not `saveAt`: the claim must come DOWN to
                              // step 1, or the save is judged at step 3 against a
                              // schema the remaining answers cannot satisfy and the
                              // orphans are never dropped (see `rewindTo`).
                              const saved = await draft.rewindTo(1);
                              if (saved) draft.goTo(lost.length > 0 ? 3 : 2);
                            })();
                          }}
                        />
                      )}

                      {draft.step === 2 && (
                        <StepPhotos
                          listingId={draft.listingId}
                          photos={draft.photos}
                          onChanged={draft.reloadPhotos}
                          illustrationUrl={illustrationUrl}
                          videoUrl={draft.values.videoUrl}
                          videoRefusal={
                            refusalFor(draft.refusals, "video_url") ??
                            refusalFor(draft.refusals, "videoUrl")
                          }
                          onChangeVideo={(videoUrl) => draft.change({ videoUrl }, false)}
                          maxPhotos={planCaps?.maxPhotos ?? null}
                        />
                      )}
                      {draft.step === 3 && (
                        <StepSpecifications
                          categoryId={draft.values.categoryId}
                          values={draft.values.attributes}
                          refusals={draft.refusals}
                          onChange={(attributes, immediate) =>
                            draft.change({ attributes }, immediate)
                          }
                          onFields={onSpecFields}
                        />
                      )}
                      {draft.step === 4 && (
                        <StepDetails
                          listingId={draft.listingId}
                          categoryId={draft.values.categoryId}
                          categoryPath={categoryPath}
                          photoUrls={assistPhotoUrls}
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
                          onChange={(contactPref, immediate) =>
                            draft.change({ contactPref }, immediate)
                          }
                        />
                      )}
                      {draft.step === 8 && (
                        <StepReview
                          listingId={draft.listingId}
                          categoryPath={categoryPath}
                          values={draft.values}
                          photos={draft.photos}
                          illustrationUrl={illustrationUrl}
                          expiryDays={facts?.expiryDays ?? 60}
                          refusals={draft.refusals}
                          maxPhotos={planCaps?.maxPhotos ?? null}
                          onChangeExpiry={(posterExpiresAt) =>
                            draft.change({ posterExpiresAt }, true)
                          }
                          onGoTo={(step) => {
                            // U6-C1-R2 — EDIT COMES BACK. A seller who left review to fix
                            // one field returns to review on Next, not into the rest of
                            // the wizard.
                            setReturnToReview(true);
                            draft.goTo(step);
                          }}
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
                      (refusal) =>
                        !(draft.step === 2 && ["video_url", "videoUrl"].includes(refusal.field)),
                    )
                    .filter(
                      (refusal) =>
                        !(draft.step === 4 && ["title", "description"].includes(refusal.field)),
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
                    .filter(
                      (refusal) => !(draft.step === 8 && refusal.field === "poster_expires_at"),
                    )
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
                  <RefusalSummary
                    refusals={draft.refusals}
                    step={draft.step}
                    specFields={specFields}
                    onGoTo={draft.goTo}
                  />
                </div>
              </FormLayout>
            </Section>
          </div>
        }
      />
    </PageShell>
  );
}

export default PostingWizard;
