import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { readAreaCookie } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";

import { ListingPreview } from "./listing-preview";
import { draftRefusalKey, fill } from "./refusal-text";
import {
  publishListing,
  readPostingSchema,
  type AttrDef,
  type DraftPhotoRow,
} from "./posting-service";
import type { DraftValues } from "./use-draft";
import type { Refusal } from "./types";

/**
 * U6-C2b — STEP 8: REVIEW & PUBLISH (spec §4 B2 step 8).
 *
 * THREE DECISIONS.
 *
 *  1 PUBLISH IS NOT LIVE. `publish_listing` moves the listing to SCREENING, and
 *    only the D1 gateway can move it to live. So the button says Publish and the
 *    screen that follows says "In review" — never "published", never a number of
 *    minutes we cannot honour (F4). A seller who is told the truth once does not
 *    come back angry.
 *  2 A REFUSAL AT THE LAST STEP NAMES ITS STEP. `publish_listing` re-validates
 *    every step, so a refusal here can belong to step 2 or step 5. Each refusal is
 *    shown with the way back to the step that owns the field, because "required"
 *    with no destination is a dead end on a 360-pixel screen.
 *  3 THE PREVIEW IS THE DRAFT. Nothing is fetched to render it beyond the
 *    attribute DEFINITIONS (to label the facts) — see `listing-preview.tsx`.
 */

const FIELD_STEPS: Record<string, number> = {
  category_id: 1,
  photos: 2,
  attributes: 3,
  title: 4,
  description: 4,
  video_url: 4,
  price_mode: 5,
  price_amount: 5,
  price_currency: 5,
  price_period: 5,
  poster_expires_at: 5,
  coverage: 6,
  contact_pref: 7,
  messages: 7,
  phone: 7,
  telegram: 7,
  whatsapp: 7,
  alias: 7,
};

export function StepReview({
  listingId,
  values,
  photos,
  onGoTo,
}: {
  listingId: string | null;
  values: DraftValues;
  photos: DraftPhotoRow[];
  onGoTo: (step: number) => void;
}) {
  const { t } = useI18n();
  const [definitions, setDefinitions] = useState<AttrDef[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [failed, setFailed] = useState(false);
  const [inReview, setInReview] = useState(false);

  const categoryId = values.categoryId;
  useEffect(() => {
    if (categoryId === null) {
      setDefinitions([]);
      return;
    }
    let cancelled = false;
    void readPostingSchema(categoryId).then((schema) => {
      if (!cancelled) setDefinitions(schema?.attributes ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  if (inReview) {
    return (
      <div className="space-y-3" data-testid="post-in-review">
        <h2 className="text-base font-semibold text-foreground">{t("post.review.reviewTitle")}</h2>
        <p className="text-sm text-muted-foreground">{t("post.review.reviewBody")}</p>
        {/*
         * MY LISTINGS HAS NO PAGE YET (E1 owns it, `homePath: null`). A button
         * that goes nowhere is worse than none, so the way onward is the one
         * page that exists: the feed. The wording stays the panel's own, so when
         * E1 lands only the destination changes.
         */}
        <Link
          to="/"
          data-testid="post-review-mylistings"
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {t("post.review.myListings")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="post-review">
      <p className="text-sm text-muted-foreground">{t("post.review.why")}</p>

      <ListingPreview
        title={values.title}
        description={values.description}
        priceMode={values.priceMode}
        priceAmount={values.priceAmount}
        priceCurrency={values.priceCurrency}
        pricePeriod={values.pricePeriod}
        attributes={values.attributes}
        definitions={definitions}
        photos={photos}
        coverage={values.coverage}
        country={readAreaCookie()?.country ?? null}
        contactPref={values.contactPref}
      />

      {failed && (
        <p className="text-sm text-destructive" data-testid="post-review-failed">
          {t("post.save.unsaved")}
        </p>
      )}

      {refusals.map((refusal) => {
        const step = FIELD_STEPS[refusal.field] ?? null;
        return (
          <div key={`${refusal.field}:${refusal.reason}`} className="space-y-1">
            <p
              className="text-sm text-destructive"
              data-testid="post-review-refusal"
              data-field={refusal.field}
            >
              {t(draftRefusalKey(refusal.reason))}
            </p>
            {step !== null && (
              <button
                type="button"
                data-testid="post-review-fix"
                data-step={step}
                className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground"
                onClick={() => onGoTo(step)}
              >
                {fill(t("post.review.fixStep"), { step })}
              </button>
            )}
          </div>
        );
      })}

      <button
        type="button"
        data-testid="post-publish"
        disabled={publishing || listingId === null}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
        onClick={() => {
          if (listingId === null) return;
          setPublishing(true);
          setFailed(false);
          setRefusals([]);
          void publishListing(listingId).then((answer) => {
            setPublishing(false);
            if (answer.ok) {
              setInReview(true);
              return;
            }
            // A refusal is the door's judgement and is shown; unreachability is
            // the network's and says so — never a silent nothing (F4).
            if (answer.unreachable) setFailed(true);
            else setRefusals(answer.refusals);
          });
        }}
      >
        {publishing ? t("post.review.publishing") : t("post.review.publish")}
      </button>
    </div>
  );
}

export default StepReview;
