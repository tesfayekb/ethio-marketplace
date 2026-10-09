import { CutText } from "@/components/ui/cut-text";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FormLayout } from "@/components/layout/form-layout";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { SplitLayout } from "@/components/layout/split-layout";
import { readAreaCookie, useOpenMarkets } from "@/components/shell/location-data";
import { PageCard } from "@/components/shell/page-card";
import {
  isPostable,
  nearestCategoryPicture,
  pathOf,
  useCategoryTree,
} from "@/features/categories/category-tree";
import { entityName } from "@/i18n/entity";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";

import { RefusalSummary, focusFirstRefusal } from "./field";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import { prefillFromMatches } from "./catalog-finder";
import { StepCategory } from "./step-category";
import { StepDetails } from "./step-details";
import { StepPhotos } from "./step-photos";
import { StepPricing } from "./step-pricing";
import { StepWhere } from "./step-where";
import { StepWho } from "./step-who";
import { StepReview } from "./step-review";
import { StepSpecifications, type DealGroup } from "./step-specifications";
import { ListingPreview } from "./listing-preview";
import { MobileStepStrip } from "./mobile-step-strip";
import { CatalogScopeProvider } from "./catalog-scope-provider";
import { tokenCountryCode, type CatalogScope } from "./catalog-scope";
import { CategoryMoveDialog } from "./category-move-dialog";
import {
  findHeldOption,
  loadAttributeOptions,
  optionLabel,
  type AttrOption,
  retiredAttributeOptions,
} from "./attribute-options";
import { answerOtherText } from "./answer-tokens";
import { basisInForce, basisNoun, basisToken } from "./price-basis";
import {
  clearPin,
  readPlaceCountry,
  readPostingSchema,
  readPostingSchemaAnswer,
  readSellerIdentity,
  type AttrDef,
  type PlanCaps,
  savePhotosSoon,
} from "./posting-service";
import { prefillCursor } from "./post-prefill";
import { useDraft, type DraftValues } from "./use-draft";
import { keepListedAnswers, type QuestionListRead } from "./catalog-held-answers";

/** D59 — the fields a category change resets, and Undo restores. */
type CategoryResetSnapshot = Pick<
  DraftValues,
  | "categoryId"
  | "attributes"
  | "title"
  | "description"
  | "videoUrl"
  | "priceMode"
  | "priceAmount"
  | "priceCurrency"
  | "pricePeriod"
  | "priceBp"
  | "priceNegotiable"
>;
const RESET_UNDO_MS = 10_000;
import {
  IMPLEMENTED_THROUGH,
  SEQUENCE,
  STEPS,
  TOTAL_STEPS,
  isStepFinished,
  nextOf,
  positionOf,
  prevOf,
  type CategoryFacts,
} from "./types";

/** D39 — the rails walk the seller's order; each entry keeps its door number. */
const WALK = SEQUENCE.map((step) => STEPS[step - 1]);

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

export function PostingWizard({
  listingId,
  prefill = null,
}: {
  listingId: string | null;
  /** D119 — the invite card's category and place (/post only). */
  prefill?: { categoryId: string | null; placeId: string | null } | null;
}) {
  const { t, entities, language } = useI18n();
  const { user, loading: authLoading } = useAuth();
  const draft = useDraft(listingId);
  const { tree, isLoading: treeLoading, error: treeError } = useCategoryTree();

  // Which detail keys step 3 renders: refusals naming one of them are shown
  // under that control, and every other refusal still reaches the seller (F4).
  const [specFields, setSpecFields] = useState<string[]>([]);
  // DEC-109 — the price page's rows, reported by its one copy of the form.
  const [priceFields, setPriceFields] = useState<string[]>([]);
  // INC-455 — each reported key's drawn name, so the red summary names a
  // question by its name, never by its key.
  const [fieldNames, setFieldNames] = useState<Readonly<Record<string, string>>>({});
  const mergeNames = useCallback((names: Readonly<Record<string, string>>) => {
    // I3 — equality-guarded: an unchanged name leaves the state untouched.
    setFieldNames((prev) =>
      Object.entries(names).every(([key, name]) => prev[key] === name)
        ? prev
        : { ...prev, ...names },
    );
  }, []);
  const onPriceFields = useCallback(
    (keys: string[], names: Readonly<Record<string, string>>) => {
      setPriceFields((prev) =>
        prev.length === keys.length && prev.every((key, index) => key === keys[index])
          ? prev
          : keys,
      );
      mergeNames(names);
    },
    [mergeNames],
  );
  const onSpecFields = useCallback(
    (keys: string[], names: Readonly<Record<string, string>>) => {
      // I3 — an equality-guarded write: a re-render must not feed a fresh array
      // back into the state it derives from.
      setSpecFields((prev) =>
        prev.length === keys.length && prev.every((key, index) => key === keys[index])
          ? prev
          : keys,
      );
      mergeNames(names);
    },
    [mergeNames],
  );

  /**
   * U6-C2a — WHAT THE CATEGORY DECIDES, read once per category from the same
   * public posting read step 1 and step 3 already use. Step 4 mirrors it; the
   * door remains the authority (F3).
   */
  const [facts, setFacts] = useState<CategoryFacts | null>(null);
  /** Bundle 2 Q4 — the draft's pin came from the last post (cleared for an own_place leaf). */
  const [pinCarried, setPinCarried] = useState(false);
  /** B3 — the item place's country, for the contact step's empty phone boxes. */
  const itemPlaceId = draft.values.coverage[0] ?? null;
  const [itemCountry, setItemCountry] = useState<string | null>(null);
  /** The place id whose country lookup has answered (null = no place, settled at once). */
  const [itemCountryFor, setItemCountryFor] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (itemPlaceId === null) {
      setItemCountry(null);
      setItemCountryFor(null);
      return;
    }
    let cancelled = false;
    void readPlaceCountry(itemPlaceId).then((code) => {
      if (cancelled) return;
      setItemCountry(code);
      setItemCountryFor(itemPlaceId);
    });
    return () => {
      cancelled = true;
    };
  }, [itemPlaceId]);

  /**
   * Bundle 4 steps 28–29 — WHAT {country} AND {category:…} DRAW AS, resolved once
   * for every seller and buyer screen under this wizard (catalog-scope.tsx).
   * The seller's identity is read only when neither the place nor the browsed
   * market names a country.
   */
  const openMarkets = useOpenMarkets();
  const areaCountry = readAreaCookie()?.country ?? null;
  /**
   * PW-129/PW-134 — the home read waits until the draft has loaded and its
   * place's country has answered, so a draft whose place names a country makes
   * no identity read of its own (the contact step's read stays the only one).
   */
  const placeSettled = !draft.loading && itemCountryFor === itemPlaceId;
  const needHome = placeSettled && itemCountry === null && areaCountry === null;
  const [home, setHome] = useState<{ code: string | null; confirmed: boolean } | null>(null);
  useEffect(() => {
    if (!needHome || home !== null) return;
    let cancelled = false;
    void readSellerIdentity().then((identity) => {
      if (cancelled) return;
      setHome({
        code: identity?.homeCountryCode ?? null,
        confirmed: identity?.homeCountryConfirmed ?? false,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [needHome, home]);
  const tokenCountry = tokenCountryCode({
    placeCountry: itemCountry,
    areaCountry,
    homeCountry: home?.code ?? null,
    homeConfirmed: home?.confirmed ?? false,
  });
  const fallbackCountry = t("post.catalog.yourCountry");
  const countryWords = useMemo(() => {
    if (tokenCountry === null) return fallbackCountry;
    const market = openMarkets.markets.find((entry) => entry.code === tokenCountry);
    if (market !== undefined && market.anchorId !== null) {
      return entityName(
        "location",
        { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
        entities,
      );
    }
    try {
      const name = new Intl.DisplayNames([language], { type: "region" }).of(tokenCountry);
      if (name !== undefined && name !== tokenCountry) return name;
    } catch {
      // An unknown code falls through to the market's own name or the fallback words.
    }
    return market?.nameEn ?? fallbackCountry;
  }, [tokenCountry, openMarkets.markets, entities, language, fallbackCountry]);
  /** The {category:…} pointer the seller tapped, awaiting the move question. */
  const [pointerSlug, setPointerSlug] = useState<string | null>(null);
  const catalogScope = useMemo<CatalogScope>(
    () => ({
      country: countryWords,
      categoryPath: (slug: string) => {
        const node = tree.nodes.find((entry) => entry.slug === slug);
        if (node === undefined || !isPostable(tree, node)) return null;
        return pathOf(tree, node.id)
          .map((step) => entityName("category", step, entities))
          .join(" › ");
      },
      moveTo: setPointerSlug,
    }),
    [countryWords, tree, entities],
  );
  useEffect(() => {
    if (!pinCarried || draft.listingId === null) return;
    if (facts === null || !facts.capabilities.includes("own_place")) return;
    const listingId = draft.listingId;
    void clearPin(listingId, { street: null, directions: null }).then((ok) => {
      if (!ok) return; // logged by the service (F4); the step shows the pin to remove
      draft.setPin(null);
      draft.setDirections(null);
      setPinCarried(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCarried, facts, draft.listingId]);
  /** D22 — the seller's plan caps, as the posting document reports them. */
  const [planCaps, setPlanCaps] = useState<PlanCaps | null>(null);
  /** DEC-109 — the leaf's definitions, from the same read: the basis in force is judged on them. */
  const [definitions, setDefinitions] = useState<AttrDef[]>([]);
  const [basisOptions, setBasisOptions] = useState<AttrOption[] | null>(null);
  /** Set when the seller left the review page to edit one step (U6-C1-R2). */
  const [returnToReview, setReturnToReview] = useState(false);
  /** Rulings 3 — the contact step's own hold on Next, and how often it refused. */
  const [whoGate, setWhoGate] = useState<"pending" | "blocked" | "open">("pending");
  /** Rulings 4 item 4 — a Next pressed while the identity is still being read waits for it. */
  const [whoQueued, setWhoQueued] = useState(false);
  /** Bundle 3 step 19 — the contact step's claim, run before Next leaves it. */
  const [whoSaveRef] = useState<{ current: (() => Promise<boolean>) | null }>(() => ({
    current: null,
  }));
  const [whoTried, setWhoTried] = useState(0);
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
  /**
   * D59 — A CATEGORY CHANGE RESETS EVERYTHING THE CATEGORY SHAPES, WITH UNDO.
   * The snapshot is the draft as it stood before the change; the offer lives for
   * ten seconds and is shown on the specifications step only.
   */
  const [resetOffer, setResetOffer] = useState<CategoryResetSnapshot | null>(null);
  const [photosNeedRecheck, setPhotosNeedRecheck] = useState(false);
  useEffect(() => {
    if (resetOffer === null) return;
    const timer = window.setTimeout(() => setResetOffer(null), RESET_UNDO_MS);
    return () => window.clearTimeout(timer);
  }, [resetOffer]);
  /** D70 — a strict refusal moves the seller to the first refused control here. */
  useEffect(() => {
    if (draft.refusals.length === 0) return;
    focusFirstRefusal(draft.refusals, draft.step, specFields, priceFields);
    // Keyed on the refusals alone: a new door answer, not a step or field change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.refusals]);
  /** R-YEAR STEP 5 — the notice is read once and can be put away. */
  const [noticeDismissed, setNoticeDismissed] = useState(false);
  const categoryId = draft.values.categoryId;
  /** U6-C1-R3a-2 — step 1's only answer: a leaf. No leaf, nothing to send. */
  const needsLeaf = draft.step === 1 && categoryId === null;
  const [triedWithoutLeaf, setTriedWithoutLeaf] = useState(false);
  /**
   * U6-C1-R3b-3d STEP 5 — WHICH LEVEL OF THE TREE STEP 1 STANDS ON. It lives here,
   * not inside the step, because BACK leaves a level while there is one to leave
   * and only then leaves the step.
   */
  const [categoryCursor, setCategoryCursor] = useState<string | null>(null);
  /** INC-277 — the filter term lives beside the cursor so Back can clear it. */
  const [categoryTerm, setCategoryTerm] = useState("");

  const [questionRead, setQuestionRead] = useState<QuestionListRead>({ state: "pending" });
  useEffect(() => {
    if (categoryId === null) {
      setFacts(null);
      setDefinitions([]);
      return;
    }
    let cancelled = false;
    setQuestionRead({ state: "pending" });
    void readPostingSchemaAnswer(categoryId).then(({ schema }) => {
      if (cancelled) return;
      // D5 rule 1 — a failed read is NOT an empty list: it never drops an answer.
      setQuestionRead(
        schema === null
          ? { state: "failed" }
          : { state: "ok", categoryId, definitions: schema.attributes },
      );
      setFacts(schema?.category ?? null);
      // D22 — the plan travels with the same document; the caps the wizard holds
      // are never read from a second place.
      setPlanCaps(schema?.plan ?? null);
      setDefinitions(schema?.attributes ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  /**
   * Bundle 7 D5 rule 1 (INC-479) — WHAT THE LIST NO LONGER HAS, THE FORM NO
   * LONGER HOLDS. Only from the draft's OWN category's list read that succeeded;
   * each choice question is judged against its options (offered and switched-off)
   * from a read that succeeded, and a failed option read leaves that answer
   * alone. The drop is an ordinary, non-immediate change: the next autosave
   * stores it; no notice, no refusal.
   */
  const heldAttributes = draft.values.attributes;
  const draftLoading = draft.loading;
  const changeDraft = draft.change;
  useEffect(() => {
    if (draftLoading || questionRead.state !== "ok") return;
    if (questionRead.categoryId !== categoryId) return;
    const answers = heldAttributes;
    if (Object.keys(answers).length === 0) return;
    let cancelled = false;
    void (async () => {
      const optionsByKey: Record<string, string[] | null> = {};
      for (const def of questionRead.definitions) {
        if (def.attrType !== "single_select" && def.attrType !== "multi_select") continue;
        if (answers[def.attrKey] === undefined) continue;
        const offered = await loadAttributeOptions(def.attributeId, { freshOnly: true });
        optionsByKey[def.attrKey] =
          offered === null
            ? null
            : [...offered, ...retiredAttributeOptions(def.attributeId)].map((o) => o.value);
      }
      if (cancelled) return;
      const kept = keepListedAnswers({ answers, categoryId, read: questionRead, optionsByKey });
      if (kept !== answers) changeDraft({ attributes: kept }, false);
    })();
    return () => {
      cancelled = true;
    };
  }, [draftLoading, questionRead, categoryId, heldAttributes, changeDraft]);

  /**
   * DEC-109 step 7 — THE BASIS IN FORCE, judged from the answers by the client
   * mirror of `price_basis_in_force`; the door decides (F3).
   */
  const dealBasis = facts?.deal.basis;
  const basisKey = useMemo(
    () => basisInForce(definitions, draft.values.attributes, dealBasis ?? []).key,
    [definitions, draft.values.attributes, dealBasis],
  );
  const basisDef = useMemo(
    () =>
      basisKey === null ? null : (definitions.find((def) => def.attrKey === basisKey) ?? null),
    [basisKey, definitions],
  );
  /** DEC-079 — the basis option list, loaded ONCE per definition. */
  useEffect(() => {
    setBasisOptions(null);
    if (basisDef === null) return;
    let cancelled = false;
    void loadAttributeOptions(basisDef.attributeId).then((options) => {
      if (!cancelled) setBasisOptions(options);
    });
    return () => {
      cancelled = true;
    };
  }, [basisDef]);

  const basisValue = basisKey !== null ? basisToken(draft.values.attributes[basisKey]) : null;
  /** The answer's label in the UI language; the token itself while loading. */
  const basisLabel =
    basisValue === null
      ? null
      : (() => {
          // INC-371 — an Other unit is named by the seller's own written unit.
          if (basisValue === "other") {
            const written = answerOtherText(
              basisKey !== null ? draft.values.attributes[basisKey] : null,
            ).trim();
            return written === "" ? null : written;
          }
          // INC-466 — offered first, then retired (the attribute's own).
          const found =
            basisOptions === null || basisDef === null
              ? undefined
              : findHeldOption(basisValue, basisOptions, basisDef.attributeId);
          // INC-297 — the NOUN, derived once here: templates keep their own "per".
          return found === undefined
            ? basisValue
            : basisNoun(optionLabel(found, language, catalogScope));
        })();

  /**
   * DEC-109 — THE DEAL ROWS LIVE ON THE PRICE PAGE. The door's four lists say
   * which rows they are; the specifications page excludes them all, the price
   * page draws them in its groups. Stable arrays (I3), keyed by their contents.
   */
  const dealSignature = facts === null ? "" : JSON.stringify(facts.deal);
  const deal = useMemo(
    () => (facts === null ? null : facts.deal),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dealSignature],
  );
  const dealExclude = useMemo(() => {
    if (deal === null) return null;
    const all = [...deal.basis, ...deal.size, ...deal.quantity, ...deal.terms];
    return all.length === 0 ? null : all;
  }, [deal]);
  const soldGroups = useMemo<DealGroup[]>(
    () =>
      deal === null
        ? []
        : [
            {
              id: "sold",
              headingKey: "post.price.group.sold",
              keys: [...deal.basis, ...deal.size],
            },
          ],
    [deal],
  );
  const restGroups = useMemo<DealGroup[]>(
    () =>
      deal === null
        ? []
        : [
            { id: "quantity", headingKey: "post.price.group.quantity", keys: deal.quantity },
            { id: "terms", headingKey: "post.price.group.terms", keys: deal.terms },
          ],
    [deal],
  );
  const dealGroups = useMemo(() => [...soldGroups, ...restGroups], [soldGroups, restGroups]);
  const dealKeys = useMemo(() => dealGroups.flatMap((group) => group.keys), [dealGroups]);
  /** W6b-2 B1 — the map pin is offered only where the category allows it. */

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
  const illustrationUrl = useMemo(
    () => nearestCategoryPicture(tree, chosenCategory?.id ?? null),
    [tree, chosenCategory],
  );

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

  /** Step 1's answer: the leaf, plus any finder prefill that fitted (D37-2). */
  const chooseLeaf = (nextCategoryId: string, prefill: Record<string, unknown>) => {
    // ONE CONTROL, AUTO-ADVANCE: choosing a postable leaf IS the
    // answer to step 1, so the wizard saves it and moves on. No
    // confirmation screen — the chip above every later step is the
    // confirmation, and it carries the way back.
    setTriedWithoutLeaf(false);
    setNoticeDismissed(false);
    const previous = draft.values.categoryId;
    if (previous === null || previous === nextCategoryId) {
      setResetOffer(null);
      setPhotosNeedRecheck(false);
      draft.change(
        {
          categoryId: nextCategoryId,
          attributes: { ...prefill, ...draft.values.attributes },
        },
        true,
      );
      void draft.saveAt(1).then((saved) => {
        if (saved) draft.goTo(3);
      });
      return;
    }
    // D59 — A REAL CHANGE: every answer the category shapes is
    // reset in ONE change (INC-248's chosen-option drop is
    // subsumed), photos, place and contact are left alone, and
    // the old values are held for Undo.
    const v = draft.values;
    setResetOffer({
      categoryId: v.categoryId,
      attributes: v.attributes,
      title: v.title,
      description: v.description,
      videoUrl: v.videoUrl,
      priceMode: v.priceMode,
      priceAmount: v.priceAmount,
      priceCurrency: v.priceCurrency,
      pricePeriod: v.pricePeriod,
      priceBp: v.priceBp,
      priceNegotiable: v.priceNegotiable,
    });
    setPhotosNeedRecheck(draft.photos.length > 0);
    draft.change(
      {
        categoryId: nextCategoryId,
        attributes: prefill,
        title: "",
        description: "",
        videoUrl: "",
        priceMode: "fixed",
        priceAmount: null,
        priceCurrency: null,
        pricePeriod: null,
        priceBp: null,
        priceNegotiable: false,
      },
      false,
    );
    void (async () => {
      // REWIND, not `saveAt`: the claim must come DOWN to
      // step 1 (see `rewindTo`).
      const saved = await draft.rewindTo(1);
      // D39 — specifications come next in every branch.
      if (saved) draft.goTo(3);
    })();
  };

  /**
   * D119 — the invite's category, once, on a new post that has no category yet.
   * A postable leaf is CHOSEN, exactly as a tap chooses it (the operator,
   * 2026-10-09: a subcategory's page fills the subcategory) — the draft is made
   * and the wizard goes on. A folder opens step 1 inside itself; any other leaf
   * opens on its parent's level.
   */
  const prefillTried = useRef(false);
  useEffect(() => {
    if (prefillTried.current) return;
    const id = prefill?.categoryId ?? null;
    if (id === null || treeLoading || tree.nodes.length === 0) return;
    if (authLoading || user === null) return;
    prefillTried.current = true;
    if (listingId !== null || draft.values.categoryId !== null) return;
    const node = tree.byId.get(id);
    if (node !== undefined && isPostable(tree, node)) {
      chooseLeaf(id, {});
      return;
    }
    const cursor = prefillCursor(tree, id);
    if (cursor !== undefined) setCategoryCursor(cursor);
    // `chooseLeaf` is this render's own and is made anew on every render; the
    // body runs once, held by `prefillTried`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill, tree, treeLoading, authLoading, user, listingId, draft.values.categoryId]);

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

  function goNext() {
    void (async () => {
      if (draft.step === 7 && whoSaveRef.current !== null && !(await whoSaveRef.current())) return;
      const saved = await draft.saveAt(draft.step);
      if (!saved) return;
      if (returnToReview) {
        setReturnToReview(false);
        draft.goTo(TOTAL_STEPS);
        return;
      }
      draft.goTo(nextOf(draft.step));
    })();
  }

  /* Rulings 4 item 4 — a queued Next is judged once the identity read answers. */
  function onWhoGate(gate: "pending" | "blocked" | "open") {
    setWhoGate(gate);
    if (!whoQueued || gate === "pending") return;
    setWhoQueued(false);
    if (draft.step !== 7) return;
    if (gate === "blocked") setWhoTried((n) => n + 1);
    else goNext();
  }

  /**
   * Step 29 — the pointer's "yes": exactly step 1's choice (chooseLeaf, with its
   * reset offer), carrying every answer whose key the target category also asks
   * with the same type; the door judges what it receives (F3).
   */
  const pointerNode =
    pointerSlug === null ? null : (tree.nodes.find((node) => node.slug === pointerSlug) ?? null);
  const pointerPath = pointerSlug === null ? null : catalogScope.categoryPath(pointerSlug);
  const confirmPointer = () => {
    const target = pointerNode;
    setPointerSlug(null);
    if (target === null) return;
    const held = draft.values.attributes;
    void readPostingSchema(target.id).then((schema) => {
      const kept: Record<string, unknown> = {};
      for (const def of schema?.attributes ?? []) {
        const mine = definitions.find((entry) => entry.attrKey === def.attrKey);
        if (mine === undefined || mine.attrType !== def.attrType) continue;
        if (held[def.attrKey] !== undefined) kept[def.attrKey] = held[def.attrKey];
      }
      chooseLeaf(target.id, kept);
    });
  };

  return (
    <CatalogScopeProvider value={catalogScope}>
      <CategoryMoveDialog
        path={pointerPath}
        onCancel={() => setPointerSlug(null)}
        onConfirm={confirmPointer}
      />
      <PageShell as="main" width="full" data-testid="post-page-shell">
        <SplitLayout
          asideCollapsible
          aside={
            <div className="space-y-4" data-testid="post-desktop-aside">
              <Section>
                <ol className="space-y-2" aria-label={t("post.progress.label")}>
                  {WALK.map((entry) => {
                    const current = entry.step === draft.step;
                    /*
                     * DEC-113 — THE LIST OPENS WHAT IS DONE. A finished step and the
                     * current one are buttons, by the strip's own rule (isStepFinished,
                     * draft.goTo); a step not reached yet stays plain text.
                     */
                    const reachable =
                      current ||
                      isStepFinished(entry.step, {
                        draftStep: draft.draftStep,
                        photosCount: draft.photos.length,
                      });
                    const badge = (
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs ${
                          positionOf(entry.step) <= positionOf(draft.step)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {positionOf(entry.step) < positionOf(draft.step)
                          ? "✓"
                          : positionOf(entry.step)}
                      </span>
                    );
                    return (
                      <li
                        key={entry.step}
                        className="text-sm"
                        aria-current={current ? "step" : undefined}
                        data-testid="post-step-list-item"
                        data-step={entry.step}
                      >
                        {reachable ? (
                          <button
                            type="button"
                            data-testid={`post-step-list-go-${entry.step}`}
                            className="grid min-h-11 w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-md px-1 text-start hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => {
                              if (!current) draft.goTo(entry.step);
                            }}
                          >
                            {badge}
                            <CutText className="text-foreground" text={t(entry.nameKey)} />
                          </button>
                        ) : (
                          <span className="grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 px-1">
                            {badge}
                            <CutText className="text-muted-foreground" text={t(entry.nameKey)} />
                          </span>
                        )}
                      </li>
                    );
                  })}
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
                  priceBp={draft.values.priceBp}
                  basisLabel={basisLabel}
                  deal={deal}
                  dealDefinitions={definitions}
                  illustrationUrl={illustrationUrl}
                  photosSoon={draft.photosSoon}
                  priceNegotiable={draft.values.priceNegotiable}
                  attributes={draft.values.attributes}
                  definitions={[]}
                  attributeOptions={{}}
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
              <Section className="space-y-4 p-3 md:p-6">
                <header className="space-y-2">
                  <h1 className="text-lg font-semibold text-foreground">{t("post.title")}</h1>
                  <p className="text-sm text-muted-foreground" data-testid="post-step-header">
                    {fill(t("post.stepOf"), {
                      step: positionOf(draft.step),
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
                    {WALK.map((entry) => (
                      <li
                        key={entry.step}
                        aria-current={entry.step === draft.step ? "step" : undefined}
                        className={`h-1 grow rounded-full ${
                          positionOf(entry.step) <= positionOf(draft.step)
                            ? "bg-primary"
                            : "bg-muted"
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
                  <MobileStepStrip
                    step={draft.step}
                    draftStep={draft.draftStep}
                    photosCount={draft.photos.length}
                    onGoTo={draft.goTo}
                  />
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

                {/*
                 * R-YEAR STEP 5 — ONE LINE, IN THE SELLER'S WORDS, AND DISMISSIBLE.
                 * The old notice was a heading plus a sentence; a seller who has just
                 * changed category needs one plain line naming the new category and
                 * the answers that did not travel with them (F4: nothing vanishes in
                 * silence), and a way to put it away once read.
                 */}
                {((resetOffer !== null && draft.step === 3) ||
                  (photosNeedRecheck && draft.step === 2)) &&
                  !noticeDismissed && (
                    <div
                      className="space-y-1 rounded-md border border-border bg-muted p-3"
                      data-testid="post-category-changed"
                    >
                      {resetOffer !== null && draft.step === 3 && (
                        <p
                          className="flex flex-wrap items-center gap-2 text-sm text-foreground"
                          data-testid="post-category-dropped"
                        >
                          <span>
                            {fill(t("post.category.changedReset"), {
                              category:
                                chosenCategory === null
                                  ? ""
                                  : entityName("category", chosenCategory, entities),
                            })}
                          </span>
                          <button
                            type="button"
                            className="min-h-11 font-medium text-primary underline"
                            data-testid="post-category-reset-undo"
                            onClick={() => {
                              const snapshot = resetOffer;
                              setResetOffer(null);
                              setPhotosNeedRecheck(false);
                              draft.change(snapshot, false);
                              void draft.rewindTo(1).then((saved) => {
                                if (saved) draft.goTo(3);
                              });
                            }}
                          >
                            {t("post.specs.resetUndo")}
                          </button>
                          <button
                            type="button"
                            className="min-h-11 font-medium text-primary underline"
                            data-testid="post-category-changed-dismiss"
                            onClick={() => setNoticeDismissed(true)}
                          >
                            {t("post.category.changedDismiss")}
                          </button>
                        </p>
                      )}
                      {photosNeedRecheck && draft.step === 2 && (
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
                    <div
                      className="space-y-1"
                      /* INC-332 — A TAP ON NEXT OR BACK IS NEVER LOST. Pressing a
                       button used to blur the field first; its on-blur judgement
                       then rendered a message that moved the button out from
                       under the finger, and the click landed elsewhere. The press
                       no longer moves focus, so nothing shifts before the click;
                       the click itself then blurs the field (its judgement still
                       shows) AFTER it has registered. One rule for every step's
                       on-blur field and every layout of this bar. */
                      data-testid="post-actions"
                      onMouseDown={(event) => {
                        if ((event.target as HTMLElement).closest("button") !== null) {
                          event.preventDefault();
                        }
                      }}
                      onClickCapture={(event) => {
                        if ((event.target as HTMLElement).closest("button") === null) return;
                        const active = document.activeElement;
                        if (
                          active instanceof HTMLElement &&
                          !event.currentTarget.contains(active)
                        ) {
                          active.blur();
                        }
                      }}
                    >
                      <div className="flex gap-2">
                        <button
                          type="button"
                          data-testid="post-back"
                          /* U6-C1-R3b-1 STEP 3 — SECONDARY TOKENS, not a bare
                           outline: on the card the old transparent Back read as
                           disabled next to the filled Next. */
                          className={`${navButtonClass} border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80`}
                          disabled={
                            draft.step === 1 &&
                            categoryCursor === null &&
                            categoryTerm.trim() === ""
                          }
                          onClick={() => {
                            // INC-277 — while the filter holds a term the tree shows hits,
                            // not the level: Back first clears the filter (visibly),
                            // instead of moving a cursor nobody can see or doing nothing.
                            if (draft.step === 1 && categoryTerm.trim() !== "") {
                              setCategoryTerm("");
                              return;
                            }
                            // STEP 5 — inside the tree, Back climbs one level; at the
                            // roots it leaves the step, as it always did.
                            if (draft.step === 1 && categoryCursor !== null) {
                              setCategoryCursor(tree.parentOf.get(categoryCursor) ?? null);
                              return;
                            }
                            draft.goTo(prevOf(draft.step));
                          }}
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
                              // Rulings 3 — the contact step refuses at its own controls.
                              if (draft.step === 7 && whoGate === "pending") {
                                setWhoQueued(true);
                                return;
                              }
                              if (draft.step === 7 && whoGate === "blocked") {
                                setWhoTried((n) => n + 1);
                                return;
                              }
                              goNext();
                            }}
                          >
                            {t("post.action.next")}
                          </button>
                        ) : null}
                      </div>
                      {/* D58 — a Next whose save never reached the door says so HERE. */}
                      {draft.nextBlockedByTransport && (
                        <p data-testid="post-next-unreachable" className="text-sm text-destructive">
                          {t("post.save.unsaved")}
                        </p>
                      )}
                      {needsLeaf && (
                        <p
                          className="text-xs text-muted-foreground"
                          data-testid="post-next-blocked"
                        >
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
                            cursor={categoryCursor}
                            onCursor={setCategoryCursor}
                            term={categoryTerm}
                            onTerm={setCategoryTerm}
                            selectedId={categoryId}
                            invalid={triedWithoutLeaf && categoryId === null}
                            onChoose={(nextCategoryId, matches) => {
                              // D37-2 — a finder hit carries proposed answers; they are
                              // revalidated against the leaf's schema and options first
                              // (the finder is a hint), then land as editable prefills.
                              if (matches !== undefined && matches.length > 0) {
                                void prefillFromMatches(
                                  nextCategoryId,
                                  matches,
                                  entities.lang,
                                ).then((prefill) => chooseLeaf(nextCategoryId, prefill));
                                return;
                              }
                              chooseLeaf(nextCategoryId, {});
                            }}
                          />
                        )}

                        {draft.step === 2 && (
                          <StepPhotos
                            listingId={draft.listingId}
                            photos={draft.photos}
                            onChanged={draft.reloadPhotos}
                            illustrationUrl={illustrationUrl}
                            photosSoon={draft.photosSoon}
                            onPhotosSoon={async (on) => {
                              if (draft.listingId === null) return false;
                              // The tick follows the finger; a refusal puts it back (F4).
                              draft.setPhotosSoon(on);
                              const ok = await savePhotosSoon(draft.listingId, on);
                              if (!ok) draft.setPhotosSoon(!on);
                              return ok;
                            }}
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
                            // DEC-109 — the deal rows are asked on the price page.
                            exclude={dealExclude}
                          />
                        )}
                        {draft.step === 4 &&
                          (dealKeys.length === 0 ? (
                            <StepPricing
                              facts={facts}
                              values={{
                                priceMode: draft.values.priceMode,
                                priceAmount: draft.values.priceAmount,
                                priceCurrency: draft.values.priceCurrency,
                                pricePeriod: draft.values.pricePeriod,
                                priceBp: draft.values.priceBp,
                                priceNegotiable: draft.values.priceNegotiable,
                                posterExpiresAt: draft.values.posterExpiresAt,
                              }}
                              basisKey={basisKey}
                              basisValue={basisValue}
                              basisLabel={basisLabel}
                              refusals={draft.refusals}
                              onChange={(patch, immediate) => draft.change(patch, immediate)}
                            />
                          ) : (
                            // DEC-109 — ONE copy of the form draws the price page's rows:
                            // one schema read, one option load per list, one fields
                            // report, with the price controls drawn after "How it is sold".
                            <StepSpecifications
                              categoryId={draft.values.categoryId}
                              values={draft.values.attributes}
                              refusals={draft.refusals}
                              onChange={(attributes, immediate) =>
                                draft.change({ attributes }, immediate)
                              }
                              onFields={onPriceFields}
                              only={dealKeys}
                              groups={dealGroups}
                              around={{
                                after: "sold",
                                node: (
                                  <StepPricing
                                    facts={facts}
                                    values={{
                                      priceMode: draft.values.priceMode,
                                      priceAmount: draft.values.priceAmount,
                                      priceCurrency: draft.values.priceCurrency,
                                      pricePeriod: draft.values.pricePeriod,
                                      priceBp: draft.values.priceBp,
                                      priceNegotiable: draft.values.priceNegotiable,
                                      posterExpiresAt: draft.values.posterExpiresAt,
                                    }}
                                    basisKey={basisKey}
                                    basisValue={basisValue}
                                    basisLabel={basisLabel}
                                    refusals={draft.refusals}
                                    onChange={(patch, immediate) => draft.change(patch, immediate)}
                                  />
                                ),
                              }}
                            />
                          ))}
                        {draft.step === 5 && (
                          <StepDetails
                            listingId={draft.listingId}
                            categoryId={draft.values.categoryId}
                            categoryPath={categoryPath}
                            photoUrls={assistPhotoUrls}
                            attributes={draft.values.attributes}
                            definitions={definitions}
                            dealKeys={dealExclude}
                            negotiable={draft.values.priceNegotiable}
                            period={draft.values.pricePeriod}
                            title={draft.values.title}
                            description={draft.values.description}
                            refusals={draft.refusals}
                            onChange={(patch, immediate) => draft.change(patch, immediate)}
                          />
                        )}
                        {draft.step === 6 && (
                          <StepWhere
                            coverage={draft.values.coverage}
                            refusals={draft.refusals}
                            onChange={(coverage, immediate) =>
                              draft.change({ coverage }, immediate)
                            }
                            listingId={draft.listingId}
                            pin={draft.pin}
                            onPinSaved={(pin) => draft.setPin(pin)}
                            onDirectionsSaved={(directions) => draft.setDirections(directions)}
                            ownPlace={
                              facts === null ? null : facts.capabilities.includes("own_place")
                            }
                            pinCarried={pinCarried}
                            onPinCarried={setPinCarried}
                            maxCities={planCaps?.maxCities ?? null}
                            maxRegions={planCaps?.maxRegions ?? null}
                            maxCountries={planCaps?.maxCountries ?? null}
                            invitePlaceId={prefill?.placeId ?? null}
                          />
                        )}
                        {draft.step === 7 && (
                          <StepWho
                            listingId={draft.listingId}
                            contactPref={draft.values.contactPref}
                            refusals={draft.refusals}
                            itemCountry={itemCountry}
                            onChange={(contactPref, immediate) =>
                              draft.change({ contactPref }, immediate)
                            }
                            nextTried={whoTried}
                            onBlocked={onWhoGate}
                            saveRef={whoSaveRef}
                            categoryId={draft.values.categoryId}
                          />
                        )}
                        {draft.step === 8 && (
                          <StepReview
                            listingId={draft.listingId}
                            categoryPath={categoryPath}
                            values={draft.values}
                            photos={draft.photos}
                            illustrationUrl={illustrationUrl}
                            photosSoon={draft.photosSoon}
                            expiryDays={facts?.expiryDays ?? null}
                            refusals={draft.refusals}
                            maxPhotos={planCaps?.maxPhotos ?? null}
                            pin={draft.pin}
                            directions={draft.directions}
                            basisLabel={basisLabel}
                            basisKey={basisKey}
                            deal={deal}
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
                          <p
                            className="text-sm text-muted-foreground"
                            data-testid="post-step-later"
                          >
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
                      .filter(
                        (refusal) => !(draft.step === 3 && specFields.includes(refusal.field)),
                      )
                      // The YouTube link moved to step 2 (U6-C1-R1), so its refusal is shown
                      // there, beside the field that owns it.
                      .filter(
                        (refusal) =>
                          !(draft.step === 2 && ["video_url", "videoUrl"].includes(refusal.field)),
                      )
                      .filter(
                        (refusal) =>
                          !(draft.step === 5 && ["title", "description"].includes(refusal.field)),
                      )
                      .filter(
                        (refusal) =>
                          !(
                            draft.step === 4 &&
                            [
                              "price_mode",
                              "price_amount",
                              "price_currency",
                              "price_period",
                              "poster_expires_at",
                              // DEC-109 — a deal row's refusal lands under its own control here.
                              ...(dealExclude ?? []),
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
                            [
                              "contact_pref",
                              "messages",
                              "phone",
                              "phone2",
                              "telegram",
                              "whatsapp",
                            ].includes(refusal.field)
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
                      priceFields={priceFields}
                      fieldNames={fieldNames}
                      onGoTo={draft.goTo}
                    />
                  </div>
                </FormLayout>
              </Section>
            </div>
          }
        />
      </PageShell>
    </CatalogScopeProvider>
  );
}

export default PostingWizard;
