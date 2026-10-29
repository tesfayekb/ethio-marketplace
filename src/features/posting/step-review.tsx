import { priceLine as sharedPriceLine } from "./price-line";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/brand/spinner";
import { listingPath } from "@/features/ad-page/address";
import { ShareAd, sharePriceText } from "@/features/ad-page/share-ad";
import { readMyListing, type MyListing } from "@/features/my-listings/my-listing";
import { storedUnitNoun } from "./price-line";
import { usePriceUnitLabels } from "./use-price-unit-labels";
import { Link, useNavigate } from "@tanstack/react-router";
import { CertifyBlock } from "@/features/legal/certify-block";
import {
  CERTIFY_LOADING,
  certifyAllows,
  type CertifyState,
  certifyRefusal,
} from "@/features/legal/certify-refusal";

import { isoDay } from "@/components/shell/date-day";
import { DateField } from "@/components/shell/date-field";
import { readAreaCookie } from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { Switch } from "@/components/ui/switch";

import { controlClass, Field } from "./field";
import { ListingPreview } from "./listing-preview";
import {
  attributeDisplayValue,
  choiceHeldKnown,
  rangeDisplayValue,
  settledRanges,
} from "./attribute-display";
import { loadAttributeOptions, type AttrOption } from "./attribute-options";
import { entityName } from "@/i18n/entity";
import { drawCatalog } from "@/i18n";
import { useCatalogScope } from "./catalog-scope";
import { EDIT_REASONS } from "@/features/admin-listings/edit-listing";
import { ReasonNote } from "@/features/admin-listings/reason-note";
import type { EditActor } from "./edit-step-changes";

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
import { SellerReviewNotice } from "@/features/seller/seller-review-notice";
import type { DraftValues } from "./use-draft";
import type { PinPrecision } from "./map/pin";
import type { DealLists, Refusal } from "./types";
import { ownValue } from "@/lib/own-key";
import { readerFailure, type ReaderFailure } from "@/lib/reader-failure";

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
  title: 5,
  description: 5,
  video_url: 2,
  price_mode: 4,
  price_amount: 4,
  price_currency: 4,
  price_period: 4,
  poster_expires_at: 8,
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

/**
 * `YYYY-MM-DD` for the day `days` from today in the seller's own calendar, which
 * bounds the active window (L1b, INC-549: the calendar's days, never a UTC day).
 */
function dayFromToday(days: number): string {
  const day = new Date();
  day.setDate(day.getDate() + days);
  return isoDay(day);
}

export function StepReview({
  listingId,
  categoryPath,
  placeCountry,
  values,
  photos,
  illustrationUrl,
  photosSoon = false,
  expiryDays,
  refusals: doorRefusals,
  onChangeExpiry,
  onGoTo,
  maxPhotos,
  pin = null,
  directions = null,
  basisLabel = null,
  basisKey = null,
  deal = null,
  lockedSteps = [],
  edit = null,
  onPublished,
}: {
  listingId: string | null;
  /** The chosen category's full path, in the seller's language. */
  categoryPath: string;
  /** INC-724 — the country of the draft's own place, before the visitor's area. */
  placeCountry?: string | null;
  values: DraftValues;
  photos: DraftPhotoRow[];
  /** The nearest ancestor category's picture, the stand-in when there is no photo. */
  illustrationUrl: string | null;
  /** Bundle 4 step 15 — "Photos coming soon" as the door holds it. */
  photosSoon?: boolean;
  /** The category's listing lifetime in days; `null` = no limit, the ad has no end (DEC-117). */
  expiryDays: number | null;
  /** The draft door's own refusals, so `posterExpiry*` lands on this field. */
  refusals: Refusal[];
  onChangeExpiry: (value: string) => void;
  onGoTo: (step: number) => void;
  /** D22 — the plan's photo cap from the posting document; `null` = not read. */
  maxPhotos: number | null;
  onPublished?: () => void;
  /** U6-C1-R3b-4 — the saved pin, so the buyer's-eye preview draws what the door holds. */
  pin?: {
    lat: number;
    lng: number;
    precision: PinPrecision;
    street: string | null;
    zoom?: number | null;
  } | null;
  /** Bundle 2 step 10 — the directions line, shown above the location details. */
  directions?: string | null;
  /** DEC-079 — the basis option's label in the UI language, or null (no basis). */
  basisLabel?: string | null;
  /** D62-2 — the leaf's pricing-basis key: its answer reads under Price, not Specifications. */
  basisKey?: string | null;
  /** Bundle 4 step 10 — the door's deal lists; their answers read under Price. */
  deal?: DealLists | null;
  /** D194 — the sections with no Edit link (the Category always; staff's photos, place and contact). */
  lockedSteps?: readonly number[];
  /**
   * D194 — the Review as the Edit's gateway over a live ad: no publish, no active
   * window; Done instead; staff give their reason here, once (DEC-173).
   */
  edit?: {
    actor: EditActor;
    reason: { reason: string; note: string };
    onReason: (reason: { reason: string; note: string }) => void;
    onDone: () => void;
    /** Bundle 17 turn 3 (D188) — from Screening: Approve and Reject beside Done. */
    onDecide?: ((next: "active" | "rejected") => void) | null;
  } | null;
}) {
  const { t, entities, language } = useI18n();
  const scope = useCatalogScope();
  const [definitions, setDefinitions] = useState<AttrDef[]>([]);
  const [attributeOptions, setAttributeOptions] = useState<Record<string, AttrOption[]>>({});
  /** U6-C1-R3b-1 — the seller block the buyer's-eye preview and the summary show. */
  const [identity, setIdentity] = useState<SellerIdentity | null>(null);
  const [identityFailure, setIdentityFailure] = useState<ReaderFailure | null>(null);
  /** Bundle 3 step 20 — "previously" and member since, from `my_seller_line()`. */
  const [line, setLine] = useState<SellerLineFacts | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [refusals, setRefusals] = useState<Refusal[]>([]);
  const [certify, setCertify] = useState<CertifyState>(CERTIFY_LOADING);
  const [certifyTried, setCertifyTried] = useState(0);
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  // Step 16 — the date box shows while the switch is on; a saved date opens it.
  const [dateOn, setDateOn] = useState(values.posterExpiresAt !== "");
  const [inReview, setInReview] = useState(false);
  const [shareListing, setShareListing] = useState<MyListing | null>(null);
  // D223 — true while the bounded reads below are still running.
  const [shareWaiting, setShareWaiting] = useState(false);
  const shareRow = shareListing?.listing;
  const unitLabels = usePriceUnitLabels(shareRow !== undefined && shareRow.priceUnit !== null);

  /** D194 — staff editing another seller's ad: their own identity is nobody's seller block. */
  const staffEdit = edit !== null && edit.actor === "admin";
  // D218 — seller-only, bounded reads; a refusal or failure never enables Share.
  useEffect(() => {
    if (!inReview || staffEdit || listingId === null) return;
    setShareWaiting(true);
    let cancelled = false;
    let stopped = false;
    let reading = false;
    let reads = 0;
    const stop = () => {
      stopped = true;
      clearInterval(interval);
      if (!cancelled) setShareWaiting(false);
    };
    const read = async () => {
      if (cancelled || stopped || reading) return;
      reading = true;
      reads += 1;
      if (reads === 12) stop();
      try {
        const found = await readMyListing(listingId);
        if (cancelled) return;
        if (found === "notYours") {
          stop();
          return;
        }
        if (found.listing.status === "active" && typeof found.listing.publicId === "string") {
          setShareListing(found);
          stop();
        }
      } catch (error: unknown) {
        if (!cancelled) console.warn("[post-review-share] read failed", error);
        stop();
      } finally {
        reading = false;
      }
    };
    const interval = setInterval(() => void read(), 10_000);
    void read();
    return () => {
      cancelled = true;
      stop();
    };
  }, [inReview, staffEdit, listingId]);
  useEffect(() => {
    if (staffEdit) return;
    let cancelled = false;
    void readSellerIdentity()
      .then((found) => {
        if (!cancelled) setIdentity(found);
      })
      .catch((error: unknown) => {
        console.error("[post-review] identity read failed", error);
        if (cancelled) return;
        setIdentityFailure(readerFailure(error));
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
  }, [staffEdit]);

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
    const name = drawCatalog(
      entityName(
        "attribute",
        { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
        entities,
      ),
      scope,
    );
    return `${name}: ${attributeDisplayValue(
      def,
      value,
      attributeOptions[key] ?? [],
      language,
      t("post.review.yes"),
      t("post.review.no"),
      t("post.specs.yearEcSuffix"),
      scope,
      entities,
    )}`;
  };
  const attrLine = Object.entries(values.attributes)
    // Bundle 4 step 10 — the deal rows read under Price, not Specifications.
    .filter(
      ([key]) =>
        key !== basisKey &&
        !(
          deal !== null &&
          [...deal.basis, ...deal.size, ...deal.quantity, ...deal.terms].includes(key)
        ),
    )
    // INC-587 — no raw key or raw value: a held answer whose question or option
    // has no words left is not described.
    .filter(([key, value]) => {
      const def = definitions.find((entry) => entry.attrKey === key);
      return def !== undefined && choiceHeldKnown(def, value, attributeOptions[key] ?? []);
    })
    .map(describe)
    // INC-374 — a number the chosen model settles reads as its range.
    .concat(
      Object.entries(
        settledRanges(
          definitions,
          values.attributes,
          (definition) => attributeOptions[definition.attrKey] ?? [],
        ),
      ).map(([key, range]) => {
        const def = definitions.find((entry) => entry.attrKey === key)!;
        const name = drawCatalog(
          entityName(
            "attribute",
            { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
            entities,
          ),
          scope,
        );
        return `${name}: ${rangeDisplayValue(def, range, language, scope)}`;
      }),
    )
    .join(" · ");
  /** D62-2 — the basis answer, said under Price (the step that now asks it). */
  const basisLine =
    basisKey === null || values.attributes[basisKey] === undefined
      ? ""
      : describe([basisKey, values.attributes[basisKey]]);
  // Bundle 4 step 10 — the one shared price line.
  const priceLine = sharedPriceLine(
    {
      mode: values.priceMode,
      amount: values.priceAmount,
      currency: values.priceCurrency,
      period: values.pricePeriod,
      bp: values.priceBp,
      unit: basisLabel,
    },
    t,
    "",
    language,
  );
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
    // DEC-109 — the price is step 4 and the title and description step 5.
    {
      step: 4,
      nameKey: "post.step.price",
      value: priceLine,
      sub: basisLine,
      negotiable: values.priceNegotiable,
    },
    { step: 5, nameKey: "post.step.details", value: values.title },
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
        <h2 className="text-base font-semibold text-foreground">
          {t(shareRow === undefined ? "post.review.reviewTitle" : "post.review.liveTitle")}
        </h2>
        {shareRow === undefined && (
          <p className="text-sm text-muted-foreground">{t("post.review.reviewBody")}</p>
        )}
        {!staffEdit && (
          <div className="space-y-2" data-testid="post-review-share">
            {shareRow?.status === "active" && typeof shareRow.publicId === "string" ? (
              <ShareAd
                prominent
                publicId={shareRow.publicId}
                canonicalPath={listingPath(shareRow.title ?? "", shareRow.publicId)}
                title={shareRow.title ?? ""}
                priceText={sharePriceText(
                  {
                    mode: values.priceMode ?? "contact",
                    amount: values.priceAmount,
                    currency: values.priceCurrency,
                    period: values.pricePeriod,
                    bp: values.priceBp,
                    unit: storedUnitNoun(
                      shareRow.priceUnit,
                      shareRow.priceUnitText,
                      unitLabels,
                      language,
                    ),
                  },
                  t,
                  language,
                )}
              />
            ) : shareWaiting ? (
              // D223 — the operator, 2026-10-19: while the ad is checked the
              // drawing diamond says it is waiting for approval; then Share, or
              // a note that points to My listings — never a grey button left
              // standing.
              <div data-testid="post-review-share-checking">
                <Spinner label={t("post.review.shareChecking")} />
              </div>
            ) : (
              <p data-testid="post-review-share-note" className="text-sm text-muted-foreground">
                {t("post.review.shareWait")}
              </p>
            )}
          </div>
        )}
        {/*
         * INC-641 — "Go to My listings" goes to My listings. The button pointed
         * at the feed from before My listings had a page (bundle 16 turn 1 gave
         * it one, D138); the walk of 2026-10-15 found it still did.
         */}
        <Link
          to="/my-listings"
          data-testid="post-review-mylistings"
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          {t("nav.myListings")}
        </Link>
        {/* W3 — a fresh post at step 1; a full load so no draft state is carried. */}
        <Link
          to="/"
          data-testid="post-review-home"
          className="ms-2 inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm font-medium text-foreground"
        >
          {t("nav.home")}
        </Link>
      </div>
    );
  }

  /** Staff's sections stay shut until the reason is chosen (DEC-173; spec v1 C2). */
  const reasonMissing = edit !== null && edit.actor === "admin" && edit.reason.reason === "";

  return (
    <div className="space-y-4" data-testid="post-review">
      <p className="text-sm text-muted-foreground">
        {edit === null ? t("post.review.why") : t("post.edit.why")}
      </p>

      {edit !== null && edit.actor === "admin" && (
        /* D194 / DEC-173 — staff give the reason once, here, above the sections; it travels
           with every step's save, and no section opens until a reason is chosen. */
        <div
          className="space-y-2 rounded-md border border-border p-3"
          data-testid="post-edit-reason-box"
        >
          <ReasonNote
            testid="post-edit"
            reasons={EDIT_REASONS}
            reason={edit.reason.reason}
            note={edit.reason.note}
            onReason={(value) => edit.onReason({ reason: value, note: edit.reason.note })}
            onNote={(value) => edit.onReason({ reason: edit.reason.reason, note: value })}
          />
          {reasonMissing && (
            <p className="text-xs text-muted-foreground" data-testid="post-edit-reason-needed">
              {t("admin.listings.move.pickReason")}
            </p>
          )}
        </div>
      )}

      {/*
       * U6-C1-R2 — A REAL REVIEW PAGE: one section per step, the SAVED value in
       * words, and an Edit link that goes to that step and brings the seller back
       * here on Next. A seller must be able to check the whole listing without
       * walking the wizard again.
       */}
      <div className="space-y-2" data-testid="post-review-summary">
        {identityFailure ? (
          <p role="alert" className="text-destructive">
            {t("post.who.readFailed")}
            <span data-testid="post-review-identity-error-class">
              {` (${identityFailure.class}${identityFailure.status ? " " + identityFailure.status : ""})`}
            </span>
          </p>
        ) : null}
        <p className="text-sm font-medium text-foreground">
          {edit === null ? t("post.review.summaryLabel") : t("post.edit.summaryLabel")}
        </p>
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
                    <SellerReviewNotice
                      underReview={line?.underReview === true}
                      testId="post-review-seller-review"
                    />
                  </dd>
                )}
                <dd className="break-words text-sm text-foreground" data-testid="post-review-value">
                  {section.value === "" ? t("post.review.notGiven") : section.value}
                </dd>
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
              {lockedSteps.includes(section.step) ? null : (
                <button
                  type="button"
                  data-testid="post-review-edit"
                  data-step={section.step}
                  className="min-h-11 shrink-0 text-xs font-medium text-primary underline disabled:opacity-60"
                  disabled={reasonMissing}
                  onClick={() => onGoTo(section.step)}
                >
                  {t("post.review.edit")}
                </button>
              )}
            </div>
          ))}
        </dl>
      </div>

      <ListingPreview
        illustrationUrl={illustrationUrl}
        photosSoon={photosSoon}
        title={values.title}
        description={values.description}
        priceMode={values.priceMode}
        priceAmount={values.priceAmount}
        priceCurrency={values.priceCurrency}
        pricePeriod={values.pricePeriod}
        priceBp={values.priceBp}
        basisLabel={basisLabel}
        deal={deal}
        priceNegotiable={values.priceNegotiable}
        attributes={values.attributes}
        definitions={definitions}
        attributeOptions={attributeOptions}
        photos={photos}
        coverage={values.coverage}
        country={placeCountry ?? readAreaCookie()?.country ?? null}
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
            actor: "owner",
            title: values.title,
            description: values.description,
            priceMode: values.priceMode,
            priceAmount: values.priceAmount,
            priceCurrency: values.priceCurrency,
            pricePeriod: values.pricePeriod,
            priceBp: values.priceBp,
            basisLabel,
            deal,
            priceNegotiable: values.priceNegotiable,
            attributes: values.attributes,
            definitions,
            attributeOptions,
            photos,
            illustrationUrl,
            photosSoon,
            coverage: values.coverage,
            country: placeCountry ?? readAreaCookie()?.country ?? null,
            contactPref: values.contactPref,
            sellerAlias: identity?.alias ?? null,
            sellerBusinessName:
              identity?.sellerType === "business" ? (identity?.businessName ?? null) : null,
            sellerPreviousAlias: line?.previousAlias ?? null,
            sellerMemberSince: line?.memberSince ?? null,
            // INC-958 — the held pin itself (one value, the same object while it is unchanged).
            pin: pin ?? null,
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
       * — so offering to edit it would be a promise nothing keeps (F4). The end
       * is open unless the seller sets a date or the category holds a limit
       * (DEC-117); the door keeps the earlier of the two.
       */}
      {edit === null && (
        <div
          className="space-y-2 rounded-md border border-border p-3"
          data-testid="post-active-window"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {t("post.review.activeFromLabel")}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="post-active-from">
              {t("post.review.activeFromFact")}
            </p>
          </div>
          {/* Bundle 4 step 16 / DEC-117 — an ad has no end unless the seller sets
            a date or its category holds a limit; the door takes the earlier. */}
          <p className="text-sm text-muted-foreground" data-testid="post-active-until-line">
            {expiryDays === null
              ? t("post.review.staysUp")
              : fill(t("post.review.staysUpDays"), { days: expiryDays })}
          </p>
          <div className="flex min-h-11 items-center justify-between gap-3">
            <label htmlFor="post-take-down-switch" className="text-sm font-medium text-foreground">
              {t("post.review.takeDownSwitch")}
            </label>
            <Switch
              id="post-take-down-switch"
              data-testid="post-take-down-switch"
              checked={dateOn}
              onCheckedChange={(on) => {
                setDateOn(on);
                if (!on) onChangeExpiry("");
              }}
            />
          </div>
          {dateOn && (
            <Field
              id="post-active-until"
              label={t("post.review.takeDownOn")}
              required={false}
              refusal={
                refusalFor(doorRefusals, "poster_expires_at") ??
                refusalFor(refusals, "poster_expires_at")
              }
              hint={
                expiryDays === null ? undefined : (
                  <p className="text-xs text-muted-foreground">
                    {fill(t("post.review.lifetimeCapHint"), { days: expiryDays })}
                  </p>
                )
              }
            >
              {/* INC-549 — the app's own calendar: a day before tomorrow or after the
                category's limit is greyed and cannot be chosen, on every device. */}
              <DateField
                id="post-active-until"
                testid="post-active-until"
                value={values.posterExpiresAt}
                min={dayFromToday(1)}
                max={expiryDays === null ? undefined : dayFromToday(expiryDays)}
                onChange={onChangeExpiry}
                clearable={false}
              />
            </Field>
          )}
        </div>
      )}

      {failed && (
        <p className="text-sm text-destructive" data-testid="post-review-failed">
          {t("post.save.unsaved")}
        </p>
      )}

      {refusals.map((refusal) => {
        const step = ownValue(FIELD_STEPS, refusal.field) ?? null;
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

      {edit !== null && (
        <div className="flex flex-col gap-2 sm:flex-row" data-testid="post-edit-actions">
          <button
            type="button"
            data-testid="post-edit-done"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
            onClick={edit.onDone}
          >
            {t("post.edit.done")}
          </button>
          {/* Bundle 17 turn 3 (D188: "after the edit we can approve or reject") — from
              Screening the decision is at hand here, as in the preview; each asks first. */}
          {edit.onDecide !== undefined && edit.onDecide !== null && (
            <>
              <button
                type="button"
                data-testid="post-edit-approve"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium text-foreground"
                onClick={() => edit.onDecide?.("active")}
              >
                {t("admin.screening.approve")}
              </button>
              <button
                type="button"
                data-testid="post-edit-reject"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground"
                onClick={() => edit.onDecide?.("rejected")}
              >
                {t("admin.screening.reject")}
              </button>
            </>
          )}
        </div>
      )}
      {edit === null && (
        <>
          {/* Bundle 22 turn 4 — the publishing statements that apply, with one tick (L1 v2 item 4). */}
          {listingId !== null ? (
            <CertifyBlock listingId={listingId} onChange={setCertify} tried={certifyTried} />
          ) : null}
          {/* Bundle 4 step 19 — the seller's statement; shown while no publishing statement applies.
          publish_listing stamps attested_at on every successful publish. */}
          {certify.state === "none" ? (
            <p className="text-xs text-muted-foreground" data-testid="post-publish-statement">
              {t("post.review.statement")}
            </p>
          ) : null}
          <button
            type="button"
            data-testid="post-publish"
            /* Bundle 22 turn 32 (D231, DEC-236) — drawn closed while the certification is unticked, never
            disabled for it: a tap marks the tick refused and sends nothing. */
            disabled={
              publishing ||
              listingId === null ||
              certify.state === "loading" ||
              certify.state === "error"
            }
            data-closed={certify.state === "ready" && !certify.ticked ? "1" : undefined}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60 data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80"
            onClick={() => {
              if (listingId === null) return;
              if (!certifyAllows(certify)) {
                if (certify.state === "ready") setCertifyTried((n) => n + 1);
                return;
              }
              setPublishing(true);
              setFailed(false);
              setRefusals([]);
              void publishListing(
                listingId,
                certify.state === "ready" ? { certified: certify.versionIds, language } : undefined,
              ).then((answer) => {
                setPublishing(false);
                if (answer.ok) {
                  setInReview(true);
                  onPublished?.();
                  return;
                }
                // A refusal is the door's judgement and is shown; unreachability is
                // the network's and says so — never a silent nothing (F4).
                if (answer.unreachable) setFailed(true);
                else {
                  const legal = answer.refusals.find((r) => certifyRefusal(r.reason, navigate));
                  if (legal === undefined) setRefusals(answer.refusals);
                }
              });
            }}
          >
            {publishing ? t("post.review.publishing") : t("post.review.publish")}
          </button>
        </>
      )}
    </div>
  );
}

export default StepReview;
