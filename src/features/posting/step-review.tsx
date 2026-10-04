import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { readAreaCookie } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field } from "./field";
import { ListingPreview } from "./listing-preview";
import { attributeDisplayValue } from "./attribute-display";
import { loadAttributeOptions, type AttrOption } from "./attribute-options";
import { entityName } from "@/i18n/entity";
import { formatCommission } from "./price-basis";
import { NegotiableBadge } from "@/components/marketplace/listing-card";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import {
  publishListing,
  readPostingSchema,
  readSellerIdentity,
  readSellerLine,
  type SellerLineFacts,
  type AttrDef,
  type DraftPhotoRow,
  type SellerIdentity,
} from "./posting-service";
import { PreviewSheet } from "./preview/preview-sheet";
import { SellerLine } from "./seller-line";
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
  home_country_code: 7,
};

/** The price modes that ARE the answer, with no figure behind them (DEC-067). */
const PRICE_MODE_KEYS: Record<string, MessageKey> = {
  free: "post.price.mode.free",
  contact: "post.price.mode.contact",
};

/** The channels a listing may show, for the review line. */
const CHANNEL_KEYS: { key: string; nameKey: MessageKey }[] = [
  { key: "phone", nameKey: "post.who.channel.phone" },
  { key: "phone2", nameKey: "post.who.channel.phone2" },
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
  illustrationUrl,
  expiryDays,
  refusals: doorRefusals,
  onChangeExpiry,
  onGoTo,
  maxPhotos,
  pin = null,
  directions = null,
  basisLabel = null,
  basisKey = null,
}: {
  listingId: string | null;
  /** The chosen category's full path, in the seller's language. */
  categoryPath: string;
  values: DraftValues;
  photos: DraftPhotoRow[];
  /** The nearest ancestor category's picture, the stand-in when there is no photo. */
  illustrationUrl: string | null;
  /** The category's poster window; the door falls back to 60 days when unset. */
  expiryDays: number;
  /** The draft door's own refusals, so `posterExpiry*` lands on this field. */
  refusals: Refusal[];
  onChangeExpiry: (value: string) => void;
  onGoTo: (step: number) => void;
  /** D22 — the plan's photo cap from the posting document; `null` = not read. */
  maxPhotos: number | null;
  /** U6-C1-R3b-4 — the saved pin, so the buyer's-eye preview draws what the door holds. */
  pin?: {
    lat: number;
    lng: number;
    precision: string;
    street: string | null;
    zoom?: number | null;
  } | null;
  /** Bundle 2 step 10 — the directions line, shown above the location details. */
  directions?: string | null;
  /** DEC-079 — the basis option's label in the UI language, or null (no basis). */
  basisLabel?: string | null;
  /** D62-2 — the leaf's pricing-basis key: its answer reads under Price, not Specifications. */
  basisKey?: string | null;
}) {
  const { t, entities, language } = useI18n();
  const [definitions, setDefinitions] = useState<AttrDef[]>([]);
  const [attributeOptions, setAttributeOptions] = useState<Record<string, AttrOption[]>>({});
  /** U6-C1-R3b-1 — the seller block the buyer's-eye preview and the summary show. */
  const [identity, setIdentity] = useState<SellerIdentity | null>(null);
  /** Bundle 3 step 20 — "previously" and member since, from `my_seller_line()`. */
  const [line, setLine] = useState<SellerLineFacts | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [failed, setFailed] = useState(false);
  const [inReview, setInReview] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void readSellerIdentity().then((found) => {
      if (!cancelled) setIdentity(found);
    });
    readSellerLine().then(
      (found) => {
        if (!cancelled) setLine(found);
      },
      (error: unknown) => {
        // F4 — logged; the line then shows the name alone.
        console.error("[seller-line] read failed", error);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

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

  useEffect(() => {
    let cancelled = false;
    void Promise.all(
      definitions
        .filter((definition) => ["single_select", "multi_select"].includes(definition.attrType))
        .map(
          async (definition) =>
            [definition.attrKey, await loadAttributeOptions(definition.attributeId)] as const,
        ),
    ).then((entries) => {
      if (cancelled) return;
      setAttributeOptions(
        Object.fromEntries(entries.map(([key, options]) => [key, options ?? []])),
      );
    });
    return () => {
      cancelled = true;
    };
  }, [definitions]);

  /**
   * THE SECTIONS: one per step, each rendering the SAVED value in the seller's
   * language. Nothing is fetched for them — the draft and the attribute
   * definitions already on this screen are the whole source.
   */
  const describe = ([key, value]: [string, unknown]): string => {
    const def = definitions.find((entry) => entry.attrKey === key);
    if (def === undefined) return `${key}: ${String(value)}`;
    const name = entityName(
      "attribute",
      { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
      entities,
    );
    return `${name}: ${attributeDisplayValue(
      def,
      value,
      attributeOptions[key] ?? [],
      language,
      t("post.review.yes"),
      t("post.review.no"),
      t("post.specs.yearEcSuffix"),
    )}`;
  };
  const attrLine = Object.entries(values.attributes)
    .filter(([key]) => key !== basisKey)
    .map(describe)
    .join(" · ");
  /** D62-2 — the basis answer, said under Price (the step that now asks it). */
  const basisLine =
    basisKey === null || values.attributes[basisKey] === undefined
      ? ""
      : describe([basisKey, values.attributes[basisKey]]);
  const priceLine =
    values.priceMode === "commission"
      ? values.priceBp === null
        ? ""
        : fill(t("price.commission"), { percent: formatCommission(values.priceBp, language) })
      : values.priceMode === "free" || values.priceMode === "contact"
        ? t(PRICE_MODE_KEYS[values.priceMode] ?? "post.price.modeLabel")
        : basisLabel !== null && values.priceAmount !== null
          ? fill(t("post.review.pricePer"), {
              amount: String(values.priceAmount),
              currency: values.priceCurrency ?? "",
              basis: basisLabel,
            })
          : [
              values.priceCurrency ?? "",
              values.priceAmount === null ? "" : String(values.priceAmount),
            ]
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

  const sections: {
    step: number;
    nameKey: MessageKey;
    value: string;
    sub?: string;
    negotiable?: boolean;
    /** Step 20 — the shared seller line is drawn under this section. */
    seller?: boolean;
  }[] = [
    { step: 1, nameKey: "post.step.category", value: categoryPath },
    {
      step: 2,
      nameKey: "post.step.photos",
      // D22 — the summary counts against the PLAN's cap; with no plan document
      // read yet the line stays empty rather than quoting a cap nobody set (F4).
      value:
        maxPhotos === null
          ? ""
          : fill(t("post.photos.count"), { count: photos.length, max: maxPhotos }),
    },
    { step: 3, nameKey: "post.step.specifications", value: attrLine },
    { step: 4, nameKey: "post.step.details", value: values.title },
    {
      step: 5,
      nameKey: "post.step.price",
      value: priceLine,
      sub: basisLine,
      negotiable: values.priceNegotiable,
    },
    {
      step: 6,
      nameKey: "post.step.place",
      value:
        values.coverage.length === 0
          ? ""
          : fill(t("post.review.placesCount"), { count: values.coverage.length }),
    },
    {
      step: 7,
      nameKey: "post.step.contact",
      // D17 — the seller block names WHO is selling (the shared seller line,
      // step 20) and then HOW to reach them.
      value: channelLine,
      seller: true,
    },
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
        {/* W3 — a fresh post at step 1; a full load so no draft state is carried. */}
        <Link
          to="/post"
          reloadDocument
          data-testid="post-review-another"
          className="ms-2 inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground"
        >
          {t("post.review.postAnother")}
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
                {section.seller === true && identity !== null && (
                  <dd data-testid="post-review-seller">
                    <SellerLine
                      alias={identity.alias}
                      businessName={
                        identity.sellerType === "business" ? (identity.businessName ?? null) : null
                      }
                      previousAlias={line?.previousAlias ?? null}
                      memberSince={line?.memberSince ?? null}
                      testId="post-review-seller"
                    />
                  </dd>
                )}
                {section.negotiable === true && (
                  <dd>
                    <NegotiableBadge />
                  </dd>
                )}
                {section.sub !== undefined && section.sub !== "" && (
                  <dd
                    className="break-words text-xs text-muted-foreground"
                    data-testid="post-review-basis"
                  >
                    {section.sub}
                  </dd>
                )}
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
        priceBp={values.priceBp}
        basisLabel={basisLabel}
        priceNegotiable={values.priceNegotiable}
        attributes={values.attributes}
        definitions={definitions}
        attributeOptions={attributeOptions}
        photos={photos}
        coverage={values.coverage}
        country={readAreaCookie()?.country ?? null}
        contactPref={values.contactPref}
      />

      {/*
       * U6-C1-R3b-1 STEP 2c — THE ONE WAY TO SEE THE LISTING AS A BUYER WILL.
       * The panel above is a check-list; this opens the DETAIL, rendered by the
       * very components U7 will mount on the public page.
       */}
      <button
        type="button"
        data-testid="post-preview-open"
        className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground hover:bg-accent"
        onClick={() => setPreviewOpen(true)}
      >
        {t("post.review.previewAsBuyer")}
      </button>

      {previewOpen && (
        <PreviewSheet
          onClose={() => setPreviewOpen(false)}
          view={{
            title: values.title,
            description: values.description,
            priceMode: values.priceMode,
            priceAmount: values.priceAmount,
            priceCurrency: values.priceCurrency,
            pricePeriod: values.pricePeriod,
            priceBp: values.priceBp,
            basisLabel,
            priceNegotiable: values.priceNegotiable,
            attributes: values.attributes,
            definitions,
            attributeOptions,
            photos,
            illustrationUrl,
            coverage: values.coverage,
            country: readAreaCookie()?.country ?? null,
            contactPref: values.contactPref,
            sellerAlias: identity?.alias ?? null,
            sellerBusinessName:
              identity?.sellerType === "business" ? (identity?.businessName ?? null) : null,
            sellerPreviousAlias: line?.previousAlias ?? null,
            sellerMemberSince: line?.memberSince ?? null,
            pinLat: pin?.lat ?? null,
            pinLng: pin?.lng ?? null,
            pinPrecision: pin?.precision ?? null,
            pinZoom: pin?.zoom ?? null,
            directions,
            streetAddress: pin?.street ?? null,
          }}
        />
      )}

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
