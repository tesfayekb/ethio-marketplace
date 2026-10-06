import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { readDraft, saveDraft, type DraftBody, type DraftPhotoRow } from "./posting-service";
import {
  IMPLEMENTED_THROUGH,
  firstUnfinished,
  prevOf,
  type Refusal,
  type SaveState,
} from "./types";

/**
 * U6-C1a — THE DRAFT: AUTOSAVE, RESUME, AND NEVER LOSING A SELLER'S WORK.
 *
 * The contract this hook keeps, in order of importance:
 *
 *  1 NOTHING IS LOST. A save that cannot reach the server leaves the answers in
 *    memory, says so in words ("not saved yet"), and retries. It never clears a
 *    field, never rolls back the screen, and never claims success (F4).
 *  2 ONE SAVE AT A TIME. Typing fires every 2 seconds and `Next` fires at once;
 *    both funnel through a single in-flight request with the LATEST payload
 *    coalesced, so the door can never apply an older answer after a newer one.
 *  3 THE SERVER OWNS `draft_step`. The wizard proposes a step; the door's
 *    `draft_step` is what comes back and what a resume trusts.
 *  4 A REFUSAL IS NOT A FAILURE. Refusals surface under their fields and are not
 *    retried — the same payload would be refused again. Only unreachability is.
 */

const DEBOUNCE_MS = 2000;
const RETRY_MS = 4000;

export interface DraftValues {
  categoryId: string | null;
  /** Step 3's answers, keyed by `attr_key` exactly as the door validates them. */
  attributes: Record<string, unknown>;
  title: string;
  description: string;
  videoUrl: string;
  /** U6-C2a price step (4) — the door's own vocabulary (DEC-067, D13). */
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** DEC-079 — a commission in basis points; null for every money/free/contact price. */
  priceBp: number | null;
  /** DEC-081 — "Price is negotiable"; a flag on a fixed or commission price. */
  priceNegotiable: boolean;
  /** `YYYY-MM-DD`, or empty for "use the category's normal window". */
  posterExpiresAt: string;
  /** U6-C2a step 6 — the coverage rows; the FIRST is the item's own place. */
  coverage: string[];
  /**
   * U6-C2b step 7 — THIS LISTING's contact channels, `listing_contact_refusals`
   * shape: `{ messages: true, phone: { show, value }, … }`. Messages is always
   * true, because the door refuses a listing nobody can be reached about.
   */
  contactPref: Record<string, unknown>;
}

const EMPTY_VALUES: DraftValues = {
  categoryId: null,
  attributes: {},
  title: "",
  description: "",
  videoUrl: "",
  // `fixed` is the door's own column default, so the screen starts where the
  // server already stands rather than inventing a fifth state.
  priceMode: "fixed",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: null,
  priceBp: null,
  priceNegotiable: false,
  posterExpiresAt: "",
  coverage: [],
  contactPref: { messages: true },
};

/**
 * U6-C1-R3b-4 — THE PIN IS NOT A DRAFT FIELD.
 *
 * It is deliberately OUTSIDE `DraftValues`: the pin has its own door
 * (`set_listing_pin`), so autosave must never carry it and the draft door must
 * never be asked to judge it. The hook still HOLDS it, because a resume and the
 * buyer preview must read one source — the row the door wrote.
 */
export interface DraftPin {
  lat: number;
  lng: number;
  precision: string;
  street: string | null;
  /** Part L — the zoom the seller left the dropper at; null when unknown. */
  zoom?: number | null;
}

export interface UseDraft {
  listingId: string | null;
  /** The step on screen (1-based), which the seller drives with Back/Next. */
  step: number;
  goTo: (step: number) => void;
  /** The furthest step the server has recorded for this draft. */
  draftStep: number;
  values: DraftValues;
  saveState: SaveState;
  refusals: Refusal[];
  /** Queue a change: `immediate` for a tap or Next, else the 2-second debounce. */
  change: (patch: Partial<DraftValues>, immediate: boolean) => void;
  /** Save the current answers at a given step and answer whether it took. */
  saveAt: (step: number) => Promise<boolean>;
  /**
   * U6-C1-R3b-1 — A CATEGORY CHANGE REWINDS THE CLAIM. `saveAt` only ever
   * RAISES the step a save claims (INC-228: a Next queued on top of an
   * autosave must survive). When the seller changes the category, the later
   * answers are no longer the ones being judged, so the claim must come DOWN
   * to step 1 — otherwise the save goes out as step 3, is judged against the
   * NEW schema it cannot satisfy, and the orphan answers are never dropped.
   */
  rewindTo: (step: number) => Promise<boolean>;
  /** Retry by hand what the automatic retry has not yet managed. */
  retry: () => void;
  /** D58 — a Next whose save ended unreachable; cleared by a later save or an edit. */
  nextBlockedByTransport: boolean;
  /** INC-227 — seconds until autosave may resume; 0 when it is not paused. */
  pauseSeconds: number;
  photos: DraftPhotoRow[];
  reloadPhotos: () => void;
  /** The saved pin, or `null` when this listing has none. */
  pin: DraftPin | null;
  /** What the pin's own door just wrote, so the screen and the row agree. */
  setPin: (pin: DraftPin | null) => void;
  /** Bundle 2 step 10 — the directions line the door holds (pin or no pin). */
  directions: string | null;
  setDirections: (directions: string | null) => void;
  /** Bundle 4 step 15 — "Photos coming soon" as the door holds it. */
  photosSoon: boolean;
  setPhotosSoon: (on: boolean) => void;
  loading: boolean;
  /** A resume that cannot be honoured says why, in words. */
  loadError: "notFound" | "failed" | null;
}

export function useDraft(initialListingId: string | null): UseDraft {
  const [listingId, setListingId] = useState<string | null>(initialListingId);
  const [step, setStep] = useState(1);
  /**
   * INC-317 — a write that lands after its step has closed is queued at the
   * step ON SCREEN, so it can never claim a later step.
   */
  const stepRef = useRef(1);
  const [draftStep, setDraftStep] = useState(1);
  const [values, setValues] = useState<DraftValues>(EMPTY_VALUES);
  const [nextBlockedByTransport, setNextBlockedByTransport] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [photos, setPhotos] = useState<DraftPhotoRow[]>([]);
  const [loading, setLoading] = useState(initialListingId !== null);
  const [loadError, setLoadError] = useState<"notFound" | "failed" | null>(null);
  const [photoNonce, setPhotoNonce] = useState(0);
  const [pin, setPin] = useState<DraftPin | null>(null);
  const [directions, setDirections] = useState<string | null>(null);
  const [photosSoon, setPhotosSoon] = useState(false);

  // Refs, not state: the save machinery must not re-run an effect to work, and
  // the latest values must be readable from inside a timer (I3).
  const listingRef = useRef<string | null>(initialListingId);
  const valuesRef = useRef<DraftValues>(values);
  const pendingStepRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  /**
   * THE ANSWER'S VERSION, bumped by every change and every raised step.
   *
   * A save carries the version it was built from. When it returns, the pending
   * work is cleared ONLY if nothing changed while it was in the air; otherwise
   * the newer answers are still pending and another pass runs at once. Without
   * this, a `Next` that lands on top of an in-flight autosave was dropped on the
   * floor — the seller's last edit never reached the door and the step never
   * advanced, which is exactly the lost work this hook exists to prevent.
   */
  const versionRef = useRef(0);
  const followUpRef = useRef(false);
  /**
   * INC-228 — WHOSE SAVE IS IT? An AUTOSAVE is a backup of work in progress and
   * is sent at the LAST COMPLETED step, so a half-filled step is never judged
   * while the seller is still typing. `Next` is the only STRICT save: it names
   * the step on screen and its refusals are what the seller sees.
   */
  /**
   * INC-228 — WHICH STEP THE SELLER CLAIMED IS FINISHED (`null` while they are
   * only typing). It is a STEP, not a boolean, on purpose: a `Next` that arrives
   * on top of an in-flight autosave used to have its "strict" flag consumed by
   * that earlier pass, so the step the seller asked about was never judged and
   * the wizard advanced on an autosave's verdict.
   */
  const strictRef = useRef<number | null>(null);
  /** The server's own `draft_step`, readable from inside a timer (I3). */
  const draftStepRef = useRef(1);
  /** INC-227 — when the draft dial is spent, the moment autosave may resume. */
  const pausedUntilRef = useRef<number | null>(null);
  const [pauseSeconds, setPauseSeconds] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, []);

  const bodyFor = useCallback((forStep: number): DraftBody => {
    return {
      listingId: listingRef.current,
      step: forStep,
      categoryId: valuesRef.current.categoryId,
      // Steps 3 and 4 travel on every save: the door validates a step's OWN
      // fields strictly and tolerates the later ones empty (D12), so sending the
      // whole set is what makes a Back-then-Next round trip lossless.
      attributes: valuesRef.current.attributes,
      title: valuesRef.current.title,
      description: valuesRef.current.description,
      videoUrl: valuesRef.current.videoUrl === "" ? null : valuesRef.current.videoUrl,
      // Steps 5 and 6 travel on every save for the same reason steps 3 and 4 do:
      // the door validates a step's OWN fields strictly (D12) and tolerates the
      // later ones empty, so a Back-then-Next round trip loses nothing.
      priceMode: valuesRef.current.priceMode,
      priceAmount: valuesRef.current.priceAmount,
      // A CURRENCY WITHOUT AN AMOUNT IS NOT A PRICE. The control carries a
      // preselected currency from the seller's market before any amount is typed;
      // storing that alone breaks the listings price pair (amount NULL ⇔ currency
      // NULL), so the pair travels together or not at all.
      priceCurrency:
        valuesRef.current.priceAmount === null ? null : valuesRef.current.priceCurrency,
      pricePeriod: valuesRef.current.pricePeriod,
      // DEC-079 — the bp travels only with a commission; the door refuses it elsewhere.
      priceBp: valuesRef.current.priceMode === "commission" ? valuesRef.current.priceBp : null,
      // DEC-081 — the flag travels only with a price that has a figure.
      priceNegotiable:
        (valuesRef.current.priceMode === "fixed" || valuesRef.current.priceMode === "commission") &&
        valuesRef.current.priceNegotiable,
      posterExpiresAt:
        valuesRef.current.posterExpiresAt === "" ? null : valuesRef.current.posterExpiresAt,
      coverage: valuesRef.current.coverage.length === 0 ? null : valuesRef.current.coverage,
      contactPref: valuesRef.current.contactPref,
    };
  }, []);

  /** The queue's entry point, held in a ref so the retry timer can reach it. */
  const flushRef = useRef<(() => Promise<boolean>) | null>(null);

  /**
   * INC-227 — WHAT WAS LAST ACCEPTED, so autosave only ever sends a CHANGE. The
   * body is serialised without its step: the step is the intent, not the answer.
   */
  const serialOf = useCallback((): string => {
    const { step: _step, ...rest } = bodyFor(0) as DraftBody & { step: number };
    return JSON.stringify(rest);
  }, [bodyFor]);
  const lastSentSerialRef = useRef<string | null>(null);
  /**
   * INC-366/INC-367 — every strict claim (Next, rewind) carries its own token. A
   * pass records the token it carried; a refusal is charged to THAT token only,
   * so a late answer to an earlier claim can never block — or clear — a newer one.
   */
  const claimSeqRef = useRef(0);
  const claimTokenRef = useRef(0);
  const refusedClaimRef = useRef<number | null>(null);

  /** ONE pass at the server with whatever is pending. Answers "did it take?". */
  const pass = useCallback(async (): Promise<boolean> => {
    const queued = pendingStepRef.current;
    if (queued === null) return true;
    // INC-465 — THE DOOR'S FLOOR IS STEP 1: it refuses a step below 1 ('unknown
    // step'). A save queued below 1 goes as step 1 once a category is chosen (the
    // door judges the category and stores the rest); with no category it is not
    // sent and stays queued for the next claim. The floor sits here, at the one
    // sender, so no writer of the queue can send below it.
    if (queued < 1 && valuesRef.current.categoryId === null) return false;
    const forStep = Math.max(1, queued);
    const claimed = strictRef.current;
    const strict = claimed !== null && forStep >= claimed;
    const token = strict ? claimTokenRef.current : 0;
    /** True while the claim this pass carries is still the newest claim. */
    const current = () => token !== 0 && claimTokenRef.current === token;
    const serial = serialOf();

    // INC-227 — an autosave with nothing new to say says nothing at all.
    if (!strict && serial === lastSentSerialRef.current) {
      pendingStepRef.current = null;
      setSaveState("saved");
      return true;
    }
    // INC-227 — while the dial is spent, autosave WAITS. `Next` still goes (the
    // door answers it), so the seller is never in a dead end.
    if (!strict && pausedUntilRef.current !== null && Date.now() < pausedUntilRef.current) {
      return false;
    }

    inFlightRef.current = true;
    const sent = versionRef.current;
    setSaveState("saving");

    const answer = await saveDraft(bodyFor(forStep));

    inFlightRef.current = false;
    if (!aliveRef.current) return answer.ok;

    if (answer.ok) {
      setNextBlockedByTransport(false);
      lastSentSerialRef.current = serial;
      if (current()) strictRef.current = null;
      pausedUntilRef.current = null;
      setPauseSeconds(0);
      // Only what was actually SENT is settled. The step is cleared only while it
      // is still the step that went out: a `Next` that queued a HIGHER step while
      // this pass was in the air must survive, or the step the seller claimed is
      // never judged and the wizard advances on an autosave's verdict instead.
      if (pendingStepRef.current !== null && pendingStepRef.current <= forStep) {
        pendingStepRef.current = null;
      }
      // Anything the seller changed while the request was in the air stays
      // pending, and the follow-up flag makes the queue run again for it.
      if (versionRef.current !== sent) followUpRef.current = true;
      const id = answer.payload["listing_id"];
      if (typeof id === "string") {
        listingRef.current = id;
        setListingId(id);
      }
      const served = answer.payload["draft_step"];
      if (typeof served === "number") {
        draftStepRef.current = served;
        setDraftStep(served);
      }
      // INC-321 — the door names the currency it stored (its own home fill
      // included). A mirror of what the door stored is never a new answer: no
      // version bump, no pending step, no save-state change, no flush.
      // Only an empty wizard copy is filled; a seller's own choice stands.
      const stored = answer.payload["price_currency"];
      if (typeof stored === "string" && valuesRef.current.priceCurrency === null) {
        const mirrored = { ...valuesRef.current, priceCurrency: stored };
        valuesRef.current = mirrored;
        setValues(mirrored);
      }
      setRefusals([]);
      // "Saved" unless the seller has typed something newer than what went out —
      // and when they have, ANOTHER PASS IS ARMED HERE. Relying on the debounce
      // timer alone left the caption stuck on "Not saved yet" when the newer
      // answer arrived while this request was in the air.
      if (versionRef.current === sent) {
        setSaveState("saved");
      } else {
        // The seller typed while this request was in the air: THE STEP IS QUEUED
        // AGAIN and another pass armed here. Leaving it to the debounce timer left
        // the caption stuck on "Not saved yet" with nothing on its way.
        setSaveState("unsaved");
        pendingStepRef.current = Math.max(pendingStepRef.current ?? 0, forStep);
        if (retryRef.current) clearTimeout(retryRef.current);
        retryRef.current = setTimeout(() => {
          void flushRef.current?.();
        }, 0);
      }
      return true;
    }

    if (answer.unreachable || answer.refusals.length === 0) {
      // INC-228 — "Not saved yet" belongs to TRANSPORT alone: the answers are
      // still here, nothing was judged, and another pass runs shortly.
      setSaveState("unsaved");
      if (strict) setNextBlockedByTransport(true);
      if (retryRef.current) clearTimeout(retryRef.current);
      retryRef.current = setTimeout(() => {
        void flushRef.current?.();
      }, RETRY_MS);
      return false;
    }

    // INC-227 — the dial, not a verdict about the answers: wait it out in words.
    const limited = answer.refusals.find((refusal) => refusal.reason === "rateLimited");
    if (limited !== undefined) {
      const at = limited.detail === undefined ? Number.NaN : Date.parse(limited.detail);
      pausedUntilRef.current = Number.isFinite(at) ? at : Date.now() + 60_000;
      setPauseSeconds(Math.max(1, Math.ceil((pausedUntilRef.current - Date.now()) / 1000)));
      setSaveState("idle");
      return false;
    }

    // INC-228 — a REFUSAL IS NOT A FAILED SAVE. Only a strict save (Next) shows
    // refusals; an autosave at the last completed step keeps them to itself,
    // because the seller has not claimed the step is finished yet.
    if (strict) {
      refusedClaimRef.current = token;
      // INC-367 — a superseded claim's refusal is history: the newer claim keeps
      // its queue, its strict flag and its own (later) verdict on screen.
      if (current()) {
        setRefusals(answer.refusals);
        strictRef.current = null;
        // INC-315 — a judged-and-refused claim is answered; nothing stays
        // queued, so the next Next names its own step.
        pendingStepRef.current = null;
      }
    }
    setSaveState("idle");
    return false;
  }, [bodyFor, serialOf]);

  /** The pause counts DOWN in words, and clears itself when it expires. */
  useEffect(() => {
    if (pauseSeconds <= 0) return;
    const timer = setTimeout(() => {
      const left =
        pausedUntilRef.current === null
          ? 0
          : Math.ceil((pausedUntilRef.current - Date.now()) / 1000);
      if (left <= 0) {
        pausedUntilRef.current = null;
        setPauseSeconds(0);
        void flushRef.current?.();
        return;
      }
      setPauseSeconds(left);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pauseSeconds]);

  /**
   * THE SAVE QUEUE. Every save — the debounce, a tap, `Next` — joins one chain,
   * so a `Next` that arrives on top of an in-flight autosave WAITS for it and
   * then sends the latest answers, instead of being dropped (which lost the
   * seller's last edit and left the step behind).
   */
  const chainRef = useRef<Promise<boolean>>(Promise.resolve(true));
  const flush = useCallback((): Promise<boolean> => {
    const run = chainRef.current.then(async () => {
      const took = await pass();
      if (followUpRef.current) {
        followUpRef.current = false;
        return pass();
      }
      return took;
    });
    chainRef.current = run.then(
      () => true,
      () => false,
    );
    return run;
  }, [pass]);

  useEffect(() => {
    flushRef.current = flush;
  }, [flush]);

  const change = useCallback(
    (patch: Partial<DraftValues>, immediate: boolean) => {
      /*
       * THE REF IS WRITTEN HERE, NOT IN THE UPDATER. React runs a state updater
       * when it renders, not when it is queued, so a save fired in the same turn
       * as the change read the PREVIOUS answers out of the ref and sent them
       * (PW-26: a dropped detail travelled back to the door). The ref is the
       * save's source of truth, so it is advanced synchronously and the state is
       * set from the same object.
       */
      const next = { ...valuesRef.current, ...patch };
      valuesRef.current = next;
      setNextBlockedByTransport(false);
      setValues(next);
      // INC-228 — AN AUTOSAVE IS SENT AT THE LAST COMPLETED STEP, never at the
      // step being edited: a half-filled step must not be judged while the
      // seller is still typing. The server's `draft_step` is that truth, capped
      // at the step below the one on screen.
      // D39: "below" is the previous step of the walk, not `step - 1`.
      const onScreen = stepRef.current;
      const backupStep = Math.max(
        0,
        onScreen === 1 ? 0 : Math.min(draftStepRef.current, prevOf(onScreen)),
      );
      pendingStepRef.current = Math.max(pendingStepRef.current ?? 0, backupStep);
      versionRef.current += 1;
      setSaveState("unsaved");
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (immediate) {
        void flush();
        return;
      }
      debounceRef.current = setTimeout(() => {
        void flush();
      }, DEBOUNCE_MS);
    },
    [flush],
  );

  const saveAt = useCallback(
    async (forStep: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // INC-228 — the STRICT save: `Next` names the step on screen and its
      // refusals are the ones the seller is shown.
      strictRef.current = forStep;
      claimSeqRef.current += 1;
      const mine = claimSeqRef.current;
      claimTokenRef.current = mine;
      // INC-455 (DEC-139 R1) — a Next on step S is sent and judged at S: a step
      // left queued by an autosave, a transport retry or a dial pause never
      // raises it.
      pendingStepRef.current = forStep;
      // INC-366 — THE CLAIM'S OWN VERDICT DECIDES. When an autosave was in the
      // air, ITS follow-up pass carried this claim and was refused; this run
      // then found nothing queued and answered "took", so Next advanced past
      // the refusal. A refused claim is a refusal, whichever pass carried it.
      // INC-367 — only a refusal charged to THIS claim's token counts; an
      // earlier claim answered late (still in the air) cannot block this one.
      const took = await flush();
      return took && refusedClaimRef.current !== mine;
    },
    [flush],
  );

  const rewindTo = useCallback(
    async (forStep: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      strictRef.current = forStep;
      claimSeqRef.current += 1;
      claimTokenRef.current = claimSeqRef.current;
      pendingStepRef.current = forStep;
      draftStepRef.current = Math.min(draftStepRef.current, forStep);
      return flush();
    },
    [flush],
  );

  const retry = useCallback(() => {
    if (retryRef.current) clearTimeout(retryRef.current);
    void flush();
  }, [flush]);

  const goTo = useCallback((next: number) => {
    stepRef.current = next;
    setStep(next);
    setRefusals([]);
    // INC-455 (DEC-139 R1) — LEAVING A STEP ENDS ITS CLAIM. An unanswered strict
    // claim stops being strict (a new token, so its late answer shows nothing on
    // this screen), and anything still queued is lowered to this screen's backup
    // step, so it is saved, never judged above the step on screen.
    if (strictRef.current !== null) {
      strictRef.current = null;
      claimSeqRef.current += 1;
      claimTokenRef.current = claimSeqRef.current;
    }
    if (pendingStepRef.current !== null) {
      const backupStep = Math.max(0, next === 1 ? 0 : Math.min(draftStepRef.current, prevOf(next)));
      pendingStepRef.current = Math.min(pendingStepRef.current, backupStep);
    }
  }, []);

  /** RESUME: the owner's draft, opened at the step after the one it reached. */
  useEffect(() => {
    if (initialListingId === null) return;
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const found = await readDraft(initialListingId);
        if (cancelled) return;
        if (found === null) {
          setLoadError("notFound");
          setLoading(false);
          return;
        }
        listingRef.current = found.draft.id;
        const next: DraftValues = {
          categoryId: found.draft.categoryId,
          attributes: found.draft.attributes,
          title: found.draft.title ?? "",
          description: found.draft.description ?? "",
          videoUrl: found.draft.videoUrl ?? "",
          priceMode: found.draft.priceMode ?? "fixed",
          priceAmount: found.draft.priceAmount,
          priceCurrency: found.draft.priceCurrency,
          pricePeriod: found.draft.pricePeriod,
          priceBp: found.draft.priceBp,
          priceNegotiable: found.draft.priceNegotiable,
          posterExpiresAt: found.draft.posterExpiresAt ?? "",
          coverage: found.coverage,
          contactPref: found.draft.contactPref,
        };
        valuesRef.current = next;
        setValues(next);
        setListingId(found.draft.id);
        draftStepRef.current = found.draft.draftStep;
        setDraftStep(found.draft.draftStep);
        setPhotos(found.photos);
        setDirections(found.draft.directions);
        setPhotosSoon(found.draft.photosSoon);
        setPin(
          found.draft.pinLat === null || found.draft.pinLng === null
            ? null
            : {
                lat: found.draft.pinLat,
                lng: found.draft.pinLng,
                precision: found.draft.pinPrecision ?? "exact",
                street: found.draft.streetAddress,
                zoom: found.draft.pinZoom,
              },
        );
        // D39 — open at the first UNFINISHED step of the walk (photos count as
        // passed once one is registered or the draft reached details), never
        // past what this landing can honestly render.
        const opened = Math.min(
          firstUnfinished({
            draftStep: found.draft.draftStep,
            photosCount: found.photos.length,
          }),
          IMPLEMENTED_THROUGH,
        );
        stepRef.current = opened;
        setStep(opened);
        setLoadError(null);
      } catch {
        if (!cancelled) setLoadError("failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialListingId]);

  /** The photo grid is server truth; a nonce refetches after upload or delete. */
  useEffect(() => {
    const id = listingId;
    if (id === null || photoNonce === 0) return;
    let cancelled = false;
    void (async () => {
      try {
        const found = await readDraft(id);
        if (!cancelled && found !== null) setPhotos(found.photos);
      } catch {
        // The grid already shows the device previews; a failed refetch is not
        // worth blanking them over. The next action refetches again.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [listingId, photoNonce]);

  const reloadPhotos = useCallback(() => {
    setPhotoNonce((n) => n + 1);
  }, []);

  return useMemo(
    () => ({
      listingId,
      step,
      goTo,
      draftStep,
      values,
      saveState,
      refusals,
      change,
      saveAt,
      rewindTo,
      retry,
      nextBlockedByTransport,
      pauseSeconds,
      photos,
      reloadPhotos,
      pin,
      setPin,
      directions,
      setDirections,
      photosSoon,
      setPhotosSoon,
      loading,
      loadError,
    }),
    [
      listingId,
      step,
      goTo,
      draftStep,
      values,
      saveState,
      refusals,
      change,
      saveAt,
      rewindTo,
      retry,
      nextBlockedByTransport,
      pauseSeconds,
      photos,
      reloadPhotos,
      pin,
      directions,
      photosSoon,
      loading,
      loadError,
    ],
  );
}
