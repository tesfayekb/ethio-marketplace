import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { editErrorKey } from "@/features/admin-listings/edit-listing";
import { editAdminListing, readAdminListing } from "@/features/admin-listings/use-admin-listing";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { editMyListing } from "@/features/my-listings/my-listing";
import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

import {
  applyToBaseline,
  lockedSteps,
  stepChanges,
  type EditActor,
  type EditBaseline,
} from "./edit-step-changes";
import { PHOTO_ROW_SELECT, photoRowOf, readDraft, type DraftPhotoRow } from "./posting-service";
import { TOTAL_STEPS, type Refusal, type SaveState } from "./types";
import type { DraftPin, DraftValues, UseDraft } from "./use-draft";

/**
 * Bundle 17 turn 2 (D194) — THE EDIT IS THE WIZARD. This hook stands where
 * `useDraft` stands, with the same shape, so every step screen renders unchanged;
 * what differs is where a step's Next goes and what it carries:
 *
 *  - the ad is loaded as it stands (the seller through the draft read, which is
 *    the owner's read of any own ad; staff through their listings read);
 *  - nothing autosaves — `change` updates the screen only; the ad changes on a
 *    step's Next, which sends THAT step's changed fields through the edit door
 *    (`edit_my_listing` / `admin_edit_listing`), the door deciding what applies at
 *    once and what goes to review (D177);
 *  - the Category step is locked (`goTo(1)` is refused; staff's Photos, Place and
 *    Contact as well — their door takes words, answers and the price only);
 *  - the hook opens on the Review (step 8) and reports each save's outcome
 *    (`outcome`) for the toast (D192);
 *  - a refusal under a field clears the moment that field changes (INC-660).
 */
export type EditOutcome = { kind: "saved" | "review"; nonce: number } | null;

export interface UseEditDraft extends UseDraft {
  mode: "edit";
  actor: EditActor;
  /** The steps whose section has no Edit link and which `goTo` refuses. */
  locked: readonly number[];
  /** The last accepted save: applied at once, or sent for review (D177). */
  outcome: EditOutcome;
  /** A door answer that is neither a success nor a field refusal, in words. */
  problem: MessageKey | null;
  /** Bundle 2 step 10 / E2b — the place lines the edit door reviews (never the pin door here). */
  placeText: { streetAddress: string | null; directions: string | null };
  setPlaceText: (text: { street: string | null; directions: string | null }) => void;
  /** Staff only (DEC-173): the reason sent with every step's save, asked once on the Review. */
  reason: { reason: string; note: string };
  setReason: (reason: { reason: string; note: string }) => void;
  /** The ad's status as the door last reported it. */
  status: string | null;
  /**
   * Bundle 17 turn 4 (C15) — BACK DISCARDS: a step left by Back drops what was
   * typed on it, so the Review always shows the ad as the door holds it and a step
   * opened again starts from the saved answers; the step's refusals go with it.
   */
  discard: (step: number) => void;
}

/** The door fields each step draws, for INC-660's clearing. */
function fieldsOfStep(step: number): (field: string) => boolean {
  switch (step) {
    case 4:
      return (field) => field.startsWith("price_");
    case 2:
      return (field) => field === "video_url" || field === "videoUrl";
    case 5:
      return (field) => field === "title" || field === "description";
    case 6:
      return (field) =>
        field === "coverage" || field === "street_address" || field === "directions";
    case 7:
      return (field) => field.startsWith("contact_pref");
    case 3:
      // Every other field name is an attribute key (the authority's own vocabulary).
      return (field) =>
        !field.startsWith("price_") &&
        !field.startsWith("contact_pref") &&
        ![
          "title",
          "description",
          "video_url",
          "coverage",
          "street_address",
          "directions",
          "category_id",
        ].includes(field);
    default:
      return () => false;
  }
}

/** Which step a `change` patch belongs to, by its keys. */
function stepOfPatch(patch: Partial<DraftValues>): number | null {
  const keys = Object.keys(patch);
  if (keys.includes("videoUrl")) return 2;
  if (keys.includes("attributes")) return 3;
  if (keys.some((key) => key.startsWith("price"))) return 4;
  if (keys.includes("title") || keys.includes("description")) return 5;
  if (keys.includes("coverage")) return 6;
  if (keys.includes("contactPref")) return 7;
  return null;
}

/**
 * Staff read the ad through the console's own door (`admin_listing_detail`,
 * listings:view — use-admin-listing.ts) and the photos under their listings
 * policy; the door's refusal is thrown as it came and the hook says "failed".
 */
async function readForStaff(listingId: string) {
  const detail = await readAdminListing(listingId);
  const { data: photos, error: photoError } = await supabase
    .from("listing_photos")
    .select(PHOTO_ROW_SELECT)
    .eq("listing_id", listingId)
    .order("display_order", { ascending: true });
  if (photoError) throw new Error(photoError.message);
  return {
    listing: detail.listing,
    channels: detail.channels,
    photos: (photos ?? []).map(photoRowOf),
  };
}

export function useEditDraft(
  listingId: string | null,
  options: { actor: EditActor; guard?: GuardFn },
): UseEditDraft {
  const { actor, guard } = options;
  const locked = useMemo(() => lockedSteps(actor), [actor]);
  const [step, setStep] = useState<number>(TOTAL_STEPS);
  const [values, setValues] = useState<DraftValues>({
    categoryId: null,
    attributes: {},
    title: "",
    description: "",
    videoUrl: "",
    priceMode: "fixed",
    priceAmount: null,
    priceCurrency: null,
    pricePeriod: null,
    priceBp: null,
    priceNegotiable: false,
    posterExpiresAt: "",
    coverage: [],
    contactPref: { messages: true },
  });
  const valuesRef = useRef(values);
  const [baseline, setBaseline] = useState<EditBaseline | null>(null);
  const baselineRef = useRef<EditBaseline | null>(null);
  const [placeText, setPlaceTextState] = useState<{
    streetAddress: string | null;
    directions: string | null;
  }>({
    streetAddress: null,
    directions: null,
  });
  const placeTextRef = useRef(placeText);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [outcome, setOutcome] = useState<EditOutcome>(null);
  const [problem, setProblem] = useState<MessageKey | null>(null);
  const [photos, setPhotos] = useState<DraftPhotoRow[]>([]);
  const [photoNonce, setPhotoNonce] = useState(0);
  const [pin, setPin] = useState<DraftPin | null>(null);
  const [photosSoon, setPhotosSoon] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [reason, setReasonState] = useState({ reason: "", note: "" });
  const reasonRef = useRef(reason);
  const [loading, setLoading] = useState(listingId !== null);
  const [loadError, setLoadError] = useState<"notFound" | "failed" | null>(null);
  const lastStepRef = useRef<number | null>(null);

  useEffect(() => {
    if (listingId === null) return;
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        let next: DraftValues;
        let text: { streetAddress: string | null; directions: string | null };
        if (actor === "seller") {
          const found = await readDraft(listingId);
          if (cancelled) return;
          if (found === null) {
            setLoadError("notFound");
            return;
          }
          next = {
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
          text = { streetAddress: found.draft.streetAddress, directions: found.draft.directions };
          setPhotos(found.photos);
          setPhotosSoon(found.draft.photosSoon);
          setStatus(found.draft.status);
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
        } else {
          const found = await readForStaff(listingId);
          if (cancelled) return;
          if (found === null) {
            setLoadError("notFound");
            return;
          }
          const row = found.listing;
          // Staff's steps are the answers, the price and the words (lockedSteps): the
          // places, the pin, the contact and the two place lines are not loaded or sent.
          next = {
            categoryId: row.categoryId,
            attributes: row.attributes,
            title: row.title,
            description: row.description,
            videoUrl: "",
            priceMode: row.priceMode,
            priceAmount: row.priceAmount,
            priceCurrency: row.priceCurrency,
            pricePeriod: row.pricePeriod,
            priceBp: row.priceBp,
            priceNegotiable: row.priceNegotiable,
            posterExpiresAt: row.posterExpiresAt === null ? "" : row.posterExpiresAt.slice(0, 10),
            // The Review's Place and Contact lines read the ad's place and the channels the
            // seller shows (the detail door's `channels`), never a made-up answer.
            coverage: row.locationId === null ? [] : [row.locationId],
            contactPref: {
              messages: true,
              ...Object.fromEntries(
                Object.entries(found.channels).map(([channel, show]) => [channel, { show }]),
              ),
            },
          };
          text = { streetAddress: null, directions: null };
          setPhotos(found.photos);
          setPhotosSoon(row.photosSoon);
          setStatus(row.status);
          setPin(null);
        }
        const base: EditBaseline = { ...next, ...text };
        valuesRef.current = next;
        baselineRef.current = base;
        placeTextRef.current = text;
        setValues(next);
        setBaseline(base);
        setPlaceTextState(text);
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
  }, [listingId, actor]);

  useEffect(() => {
    if (listingId === null || photoNonce === 0) return;
    let cancelled = false;
    void (async () => {
      try {
        const { data, error } = await supabase
          .from("listing_photos")
          .select(PHOTO_ROW_SELECT)
          .eq("listing_id", listingId)
          .order("display_order", { ascending: true });
        if (!cancelled && !error) setPhotos((data ?? []).map(photoRowOf));
      } catch {
        // The grid keeps its rows; the next action refetches again.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [listingId, photoNonce]);

  const goTo = useCallback(
    (next: number) => {
      if (locked.includes(next)) return;
      setStep(Math.max(2, Math.min(TOTAL_STEPS, next)));
    },
    [locked],
  );

  const change = useCallback((patch: Partial<DraftValues>) => {
    valuesRef.current = { ...valuesRef.current, ...patch };
    setValues(valuesRef.current);
    const of = stepOfPatch(patch);
    if (of !== null) {
      const same = fieldsOfStep(of);
      setRefusals((current) => current.filter((refusal) => !same(refusal.field)));
    }
    setSaveState((current) => (current === "saved" ? "idle" : current));
  }, []);

  const setPlaceText = useCallback((text: { street: string | null; directions: string | null }) => {
    placeTextRef.current = { streetAddress: text.street, directions: text.directions };
    setPlaceTextState(placeTextRef.current);
    const same = fieldsOfStep(6);
    setRefusals((current) => current.filter((refusal) => !same(refusal.field)));
  }, []);

  /** C15 — the step's fields back to the baseline (the ad as saved); its refusals cleared. */
  const discard = useCallback((forStep: number) => {
    const base = baselineRef.current;
    if (base === null) return;
    const next: DraftValues = { ...valuesRef.current };
    switch (forStep) {
      case 2:
        next.videoUrl = base.videoUrl;
        break;
      case 3:
        next.attributes = base.attributes;
        break;
      case 4:
        next.priceMode = base.priceMode;
        next.priceAmount = base.priceAmount;
        next.priceCurrency = base.priceCurrency;
        next.pricePeriod = base.pricePeriod;
        next.priceBp = base.priceBp;
        next.priceNegotiable = base.priceNegotiable;
        break;
      case 5:
        next.title = base.title;
        next.description = base.description;
        break;
      case 6:
        next.coverage = base.coverage;
        placeTextRef.current = { streetAddress: base.streetAddress, directions: base.directions };
        setPlaceTextState(placeTextRef.current);
        break;
      case 7:
        next.contactPref = base.contactPref;
        break;
      default:
        return;
    }
    valuesRef.current = next;
    setValues(next);
    const same = fieldsOfStep(forStep);
    setRefusals((current) => current.filter((refusal) => !same(refusal.field)));
    setProblem(null);
    setSaveState("idle");
  }, []);

  const setReason = useCallback((next: { reason: string; note: string }) => {
    reasonRef.current = next;
    setReasonState(next);
  }, []);

  const saveAt = useCallback(
    async (forStep: number) => {
      const base = baselineRef.current;
      if (listingId === null || base === null) return false;
      lastStepRef.current = forStep;
      const changes = stepChanges(forStep, base, valuesRef.current, placeTextRef.current, actor);
      if (Object.keys(changes).length === 0) {
        setRefusals([]);
        setProblem(null);
        return true;
      }
      setSaveState("saving");
      setProblem(null);
      try {
        if (actor === "admin") {
          const run = () =>
            editAdminListing(listingId, changes, reasonRef.current.reason, reasonRef.current.note);
          const answer = await (guard === undefined ? run() : guard(run));
          if (!answer.ok) {
            setRefusals(answer.refusals);
            setSaveState("unsaved");
            return false;
          }
          baselineRef.current = applyToBaseline(
            base,
            valuesRef.current,
            placeTextRef.current,
            changes,
          );
          setBaseline(baselineRef.current);
          setStatus(answer.status);
          setRefusals([]);
          setSaveState("saved");
          setOutcome((current) => ({ kind: "saved", nonce: (current?.nonce ?? 0) + 1 }));
          return true;
        }
        const answer = await editMyListing(listingId, changes);
        if (!answer.ok) {
          if ("refusals" in answer) {
            setRefusals(answer.refusals);
          } else {
            setProblem(answer.key);
          }
          setSaveState("unsaved");
          return false;
        }
        baselineRef.current = applyToBaseline(
          base,
          valuesRef.current,
          placeTextRef.current,
          changes,
        );
        setBaseline(baselineRef.current);
        setStatus(answer.status);
        setRefusals([]);
        setSaveState("saved");
        setOutcome((current) => ({
          kind: answer.review ? "review" : "saved",
          nonce: (current?.nonce ?? 0) + 1,
        }));
        return true;
      } catch (error) {
        if (actor === "admin") {
          // The gate's verdicts (mfa-service): cancelled says nothing; no factor says
          // the hint; everything else is the door's own refusal, in the console's words.
          const abort = stepUpAbortKey(error);
          if (abort === null) {
            setSaveState("idle");
            return false;
          }
          const message =
            error !== null && typeof error === "object" && "message" in error
              ? String((error as { message: unknown }).message)
              : "";
          setProblem(abort ?? editErrorKey(message));
        } else setProblem("myListings.error.failed");
        setSaveState("unsaved");
        return false;
      }
    },
    [listingId, actor, guard],
  );

  const retry = useCallback(() => {
    if (lastStepRef.current !== null) void saveAt(lastStepRef.current);
  }, [saveAt]);

  const reloadPhotos = useCallback(() => setPhotoNonce((n) => n + 1), []);
  const setDirections = useCallback(
    (directions: string | null) =>
      setPlaceText({ street: placeTextRef.current.streetAddress, directions }),
    [setPlaceText],
  );

  return useMemo(
    () => ({
      mode: "edit" as const,
      actor,
      locked,
      listingId,
      step,
      goTo,
      draftStep: TOTAL_STEPS,
      values,
      saveState,
      refusals,
      change,
      saveAt,
      rewindTo: async () => true,
      retry,
      nextBlockedByTransport: false,
      pauseSeconds: 0,
      photos,
      reloadPhotos,
      pin,
      setPin,
      directions: placeText.directions,
      setDirections,
      photosSoon,
      setPhotosSoon,
      loading,
      loadError,
      outcome,
      problem,
      placeText,
      setPlaceText,
      reason,
      setReason,
      status,
      baseline,
      discard,
    }),
    [
      actor,
      locked,
      listingId,
      step,
      goTo,
      values,
      saveState,
      refusals,
      change,
      saveAt,
      retry,
      photos,
      reloadPhotos,
      pin,
      placeText,
      setDirections,
      photosSoon,
      loading,
      loadError,
      outcome,
      problem,
      setPlaceText,
      reason,
      setReason,
      status,
      baseline,
      discard,
    ],
  );
}
