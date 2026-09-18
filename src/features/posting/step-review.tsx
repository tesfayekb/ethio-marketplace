import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { readAreaCookie } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field } from "./field";
import { ListingPreview } from "./listing-preview";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import {
  publishListing,
  readPostingSchema,
  type AttrDef,
  type DraftPhotoRow,
} from "./posting-service";
import type { DraftValues } from "./use-draft";
import { MAX_PHOTOS_PER_LISTING, type Refusal } from "./types";

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

/** The price modes that ARE the answer, with no figure behind them (DEC-067). */
const PRICE_MODE_KEYS: Record<string, MessageKey> = {
  free: "post.price.mode.free",
  contact: "post.price.mode.contact",
};

/** The channels a listing may show, for the review line. */
const CHANNEL_KEYS: { key: string; nameKey: MessageKey }[] = [
  { key: "phone", nameKey: "post.who.channel.phone" },
  { key: "telegram", nameKey: "post.who.channel.telegram" },
  { key: "whatsapp", nameKey: "post.who.channel.whatsapp" },
];

/** `YYYY-MM-DD` for a date `days` from today, which bounds the active window. */
function isoDay(days: number): string {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

export function StepReview({
  listingId,
  categoryPath,
  values,
  photos,
  expiryDays,
  refusals: doorRefusals,
  onChangeExpiry,
  onGoTo,
}: {
  listingId: string | null;
  /** The chosen category's full path, in the seller's language. */
  categoryPath: string;
  values: DraftValues;
  photos: DraftPhotoRow[];
  /** The category's poster window; the door falls back to 60 days when unset. */
  expiryDays: number;
  /** The draft door's own refusals, so `posterExpiry*` lands on this field. */
  refusals: Refusal[];
  onChangeExpiry: (value: string) => void;
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

  /**
   * THE SECTIONS: one per step, each rendering the SAVED value in the seller's
   * language. Nothing is fetched for them — the draft and the attribute
   * definitions already on this screen are the whole source.
   */
  const attrLine = Object.entries(values.attributes)
    .map(([key, value]) => {
      const def = definitions.find((entry) => entry.attrKey === key);
      const rendered = Array.isArray(value) ? value.join(", ") : String(value);
      return `${def?.nameEn ?? key}: ${rendered}`;
    })
    .join(" · ");
  const priceLine =
    values.priceMode === "free" || values.priceMode === "contact"
      ? t(PRICE_MODE_KEYS[values.priceMode] ?? "post.price.modeLabel")
      : [values.priceCurrency ?? "", values.priceAmount === null ? "" : String(values.priceAmount)]
          .join(" ")
          .trim();
  const channelLine = CHANNEL_KEYS.filter((entry) => {
    const row = values.contactPref[entry.key];
    return (
      row !== null && typeof row === "object" && (row as Record<string, unknown>)["show"] === true
    );
  })
    .map((entry) => t(entry.nameKey))
    .concat(t("post.who.channel.messages"))
    .join(" · ");

  const sections: { step: number; nameKey: MessageKey; value: string }[] = [
    { step: 1, nameKey: "post.step.category", value: categoryPath },
    {
      step: 2,
      nameKey: "post.step.photos",
      value: fill(t("post.photos.count"), {
        count: photos.length,
        max: MAX_PHOTOS_PER_LISTING,
      }),
    },
    { step: 3, nameKey: "post.step.specifications", value: attrLine },
    { step: 4, nameKey: "post.step.details", value: values.title },
    { step: 5, nameKey: "post.step.price", value: priceLine },
    {
      step: 6,
      nameKey: "post.step.place",
      value:
        values.coverage.length === 0
          ? ""
          : fill(t("post.review.placesCount"), { count: values.coverage.length }),
    },
    { step: 7, nameKey: "post.step.contact", value: channelLine },
  ];

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

      {/*
       * U6-C1-R2 — A REAL REVIEW PAGE: one section per step, the SAVED value in
       * words, and an Edit link that goes to that step and brings the seller back
       * here on Next. A seller must be able to check the whole listing without
       * walking the wizard again.
       */}
      <div className="space-y-2" data-testid="post-review-summary">
        <p className="text-sm font-medium text-foreground">{t("post.review.summaryLabel")}</p>
        <dl className="divide-y divide-border rounded-md border border-border">
          {sections.map((section) => (
            <div
              key={section.step}
              className="flex items-start justify-between gap-3 p-3"
              data-testid="post-review-section"
              data-step={section.step}
            >
              <div className="min-w-0 space-y-1">
                <dt className="text-xs font-medium text-muted-foreground">{t(section.nameKey)}</dt>
                <dd className="break-words text-sm text-foreground" data-testid="post-review-value">
                  {section.value === "" ? t("post.review.notGiven") : section.value}
                </dd>
              </div>
              <button
                type="button"
                data-testid="post-review-edit"
                data-step={section.step}
                className="min-h-11 shrink-0 text-xs font-medium text-primary underline"
                onClick={() => onGoTo(section.step)}
              >
                {t("post.review.edit")}
              </button>
            </div>
          ))}
        </dl>
      </div>

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

      {/*
       * U6-C1-R1 — THE ACTIVE WINDOW, MOVED HERE FROM STEP 5. A seller thinks
       * about how long the listing runs when they are looking at the finished
       * listing, not while naming a price. "From" is a FACT, not a field: the
       * door has no start date — a listing goes live the moment screening passes
       * — so offering to edit it would be a promise nothing keeps (F4). "Until"
       * is the category's window end by default and is editable within it.
       */}
      <div
        className="space-y-2 rounded-md border border-border p-3"
        data-testid="post-active-window"
      >
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{t("post.review.activeFromLabel")}</p>
          <p className="text-sm text-muted-foreground" data-testid="post-active-from">
            {t("post.review.activeFromFact")}
          </p>
        </div>
        <Field
          id="post-active-until"
          label={t("post.review.activeUntilLabel")}
          required={false}
          refusal={
            refusalFor(doorRefusals, "poster_expires_at") ??
            refusalFor(refusals, "poster_expires_at")
          }
          hint={
            <p className="text-xs text-muted-foreground">
              {fill(t("post.review.activeWindowHint"), { days: expiryDays })}
            </p>
          }
        >
          <input
            id="post-active-until"
            data-testid="post-active-until"
            type="date"
            className={controlClass(false)}
            value={values.posterExpiresAt === "" ? isoDay(expiryDays) : values.posterExpiresAt}
            min={isoDay(1)}
            max={isoDay(expiryDays)}
            onChange={(event) => onChangeExpiry(event.target.value)}
          />
        </Field>
      </div>

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
