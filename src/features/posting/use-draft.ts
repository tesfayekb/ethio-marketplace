import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { readDraft, saveDraft, type DraftBody, type DraftPhotoRow } from "./posting-service";
import { IMPLEMENTED_THROUGH, type Refusal, type SaveState } from "./types";

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
}

const EMPTY_VALUES: DraftValues = {
  categoryId: null,
  attributes: {},
  title: "",
  description: "",
  videoUrl: "",
};

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
  /** Retry by hand what the automatic retry has not yet managed. */
  retry: () => void;
  photos: DraftPhotoRow[];
  reloadPhotos: () => void;
  loading: boolean;
  /** A resume that cannot be honoured says why, in words. */
  loadError: "notFound" | "failed" | null;
}

export function useDraft(initialListingId: string | null): UseDraft {
  const [listingId, setListingId] = useState<string | null>(initialListingId);
  const [step, setStep] = useState(1);
  const [draftStep, setDraftStep] = useState(1);
  const [values, setValues] = useState<DraftValues>({ categoryId: null });
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [photos, setPhotos] = useState<DraftPhotoRow[]>([]);
  const [loading, setLoading] = useState(initialListingId !== null);
  const [loadError, setLoadError] = useState<"notFound" | "failed" | null>(null);
  const [photoNonce, setPhotoNonce] = useState(0);

  // Refs, not state: the save machinery must not re-run an effect to work, and
  // the latest values must be readable from inside a timer (I3).
  const listingRef = useRef<string | null>(initialListingId);
  const valuesRef = useRef<DraftValues>(values);
  const pendingStepRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
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
    };
  }, []);

  /** One pass at the server with whatever is pending. Answers "did it take?". */
  const flush = useCallback(async (): Promise<boolean> => {
    const forStep = pendingStepRef.current;
    if (forStep === null) return true;
    if (inFlightRef.current) return false;
    inFlightRef.current = true;
    setSaveState("saving");

    const answer = await saveDraft(bodyFor(forStep));

    inFlightRef.current = false;
    if (!aliveRef.current) return answer.ok;

    if (answer.ok) {
      pendingStepRef.current = null;
      const id = answer.payload["listing_id"];
      if (typeof id === "string") {
        listingRef.current = id;
        setListingId(id);
      }
      const served = answer.payload["draft_step"];
      if (typeof served === "number") setDraftStep(served);
      setRefusals([]);
      setSaveState("saved");
      return true;
    }

    if (answer.unreachable || answer.refusals.length === 0) {
      // Not a verdict: keep the answers, say so, and try again shortly.
      setSaveState("unsaved");
      if (retryRef.current) clearTimeout(retryRef.current);
      retryRef.current = setTimeout(() => {
        void flush();
      }, RETRY_MS);
      return false;
    }

    setRefusals(answer.refusals);
    setSaveState("unsaved");
    return false;
  }, [bodyFor]);

  const change = useCallback(
    (patch: Partial<DraftValues>, immediate: boolean) => {
      setValues((prev) => {
        const next = { ...prev, ...patch };
        valuesRef.current = next;
        return next;
      });
      // The step the change belongs to is the step on screen; a later Next
      // raises it. Coalescing keeps the HIGHEST pending step.
      pendingStepRef.current = Math.max(pendingStepRef.current ?? 0, step);
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
    [flush, step],
  );

  const saveAt = useCallback(
    async (forStep: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      pendingStepRef.current = Math.max(pendingStepRef.current ?? 0, forStep);
      return flush();
    },
    [flush],
  );

  const retry = useCallback(() => {
    if (retryRef.current) clearTimeout(retryRef.current);
    void flush();
  }, [flush]);

  const goTo = useCallback((next: number) => {
    setStep(next);
    setRefusals([]);
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
        const next = { categoryId: found.draft.categoryId };
        valuesRef.current = next;
        setValues(next);
        setListingId(found.draft.id);
        setDraftStep(found.draft.draftStep);
        setPhotos(found.photos);
        // Open where the seller left off: the step AFTER the one the SERVER
        // recorded, never past what this landing can honestly render.
        setStep(Math.min(Math.max(found.draft.draftStep, 1) + 1, IMPLEMENTED_THROUGH));
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
      retry,
      photos,
      reloadPhotos,
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
      retry,
      photos,
      reloadPhotos,
      loading,
      loadError,
    ],
  );
}
