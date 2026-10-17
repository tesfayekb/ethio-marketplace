import { Heart, Expand } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ListingPicture } from "@/components/marketplace/listing-picture";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import {
  telHref,
  telegramHref,
  whatsappHref,
  type ContactChannel,
  type ContactState,
} from "@/features/ad-page/contact";
import { dealLines } from "../deal-lines";
import { galleryPhotos } from "../photo-links";
import { usePhotoLinks } from "../use-photo-links";
import { PhotoGallery } from "./photo-gallery";
import { SafetyBox } from "./safety-box";
import { keyFacts } from "../key-facts";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { SellerLine } from "../seller-line";
import { fill } from "../refusal-text";
import { ownValue } from "@/lib/own-key";

/**
 * U6-C1-R3b-4 — the still map is its own lazy chunk, shared with U7: a listing
 * with no pin never downloads Leaflet, and neither does the first paint.
 */
const MapPreview = lazy(() =>
  import("../map/map-preview").then((mod) => ({ default: mod.MapPreview })),
);

const MapLarge = lazy(() => import("../map/map-large").then((mod) => ({ default: mod.MapLarge })));

import { NegotiableBadge } from "@/components/marketplace/listing-card";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { drawCatalog } from "@/i18n";
import { useCatalogScope } from "../catalog-scope";

import { useCountryTree, type TreeNode } from "@/components/shell/location-data";

import { formatCommission } from "../price-basis";
import { priceLine as sharedPriceLine } from "../price-line";
import {
  attributeDisplayValue,
  choiceHeldKnown,
  rangeDisplayValue,
  settledRanges,
} from "../attribute-display";
import type { AttrOption } from "../attribute-options";
import type { AttrDef, DraftPhotoRow } from "../posting-service";
import type { DealLists, PricePeriod } from "../types";
import type { MessageKey } from "@/i18n";

/**
 * U6-C1-R3b-1 STEP 2c — THE LISTING DETAIL, AS A BUYER SEES IT.
 *
 * THIS IS THE COMPONENT U7 REUSES. The public listing page does not exist yet,
 * so a seller reviewing a draft has had nothing but a summary to judge: a
 * summary tells them what they answered, not what a buyer will read. This
 * component renders the DETAIL — the gallery, the price, the place, the facts
 * table, the description, the seller — and U7 will mount the very same file with
 * a published listing's values instead of a draft's. One rendering, one truth: a
 * preview that could disagree with the page it promises is worse than none (F4).
 *
 * WHAT IT NEVER DOES: fetch. Every value arrives as a prop — the draft the wizard
 * already holds, or (in U7) the row the page already read. The ONE exception is
 * the place tree, which the shared `useCountryTree` cache already serves to the
 * coverage step, so naming a place costs no new request (G2).
 *
 * THE MAP IS A PLACEHOLDER, and says so. The pin columns exist (M-MAINT-2 A) but
 * no map is drawn anywhere yet, so the area names what will open there rather
 * than promising a picture that is not coming (F4).
 */

const PERIOD_KEYS: Record<PricePeriod, MessageKey> = {
  once: "post.price.period.once",
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

function isPeriod(value: string | null): value is PricePeriod {
  return value !== null && value in PERIOD_KEYS;
}

export type ListingActor = "buyer" | "owner" | "staff";

export interface ListingDetailView {
  /** D201 §5 — who is looking: the buyer's page, the owner's previews (the seller's ad page, the wizard's Review), staff's previews (Admin › Listings, Screening). The component draws the same ad for all three and differs only where this brief says. */
  actor: ListingActor;
  /** D201 §0 rule 10 — the owner's counts, passed only by the seller's ad page: undefined = not asked (the wizard), null = asked and not answered, a number = the count. Only what is counted is passed — views now; shares when the share sheet lands; contacts when the contact block lands; Saves at M3 — never a count nothing writes. */
  counts?: { views: number; shares?: number; contacts?: number; saves?: number } | null;
  /** D201 rule 11 — the sold word (sold / rented / filled, translated by the caller) drawn as a red badge after the price; present on a sold ad only. */
  soldBadge?: string | null;
  title: string;
  description: string;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** DEC-079 — a commission in basis points; judged before any amount (L6). */
  priceBp?: number | null;
  /** DEC-079 — the basis option's label for "per <basis>". */
  basisLabel?: string | null;
  /** Bundle 4 step 10 — the door's deal lists: the size and terms lines under the price. */
  deal?: DealLists | null;
  /** DEC-081 — "Price is negotiable", shown as a badge beside the price. */
  priceNegotiable?: boolean;
  attributes: Record<string, unknown>;
  definitions: AttrDef[];
  attributeOptions: Record<string, AttrOption[]>;
  photos: DraftPhotoRow[];
  /** The nearest ancestor category's picture, shown when there is no photo. */
  illustrationUrl: string | null;
  /** Step 15 — the seller ticked "Photos coming soon". */
  photosSoon?: boolean;
  /** D158 — staff's preview (Admin › Screening) marks a photo held while photo screening was off. */
  markUnscreened?: boolean;
  /** D180 — the ad's status word as the gold ribbon on its picture (the seller's ad page); absent elsewhere. */
  ribbon?: string | null;
  coverage: string[];
  country: string | null;
  contactPref: Record<string, unknown>;
  /** The public seller name, and the business name when there is one. */
  sellerAlias: string | null;
  sellerBusinessName: string | null;
  /** Bundle 3 step 20 — "previously" (365 days) and member since; absent = unknown. */
  sellerPreviousAlias?: string | null;
  sellerMemberSince?: string | null;
  /**
   * U6-C1-R3b-4 — the saved pin, exactly as the door holds it. `approx` is drawn
   * as a 500-metre circle whose centre is snapped inside `MapPreview`, so this
   * component can carry the true coordinates without revealing them.
   */
  pinLat?: number | null;
  pinLng?: number | null;
  pinPrecision?: string | null;
  /** Part L — the saved zoom; an approximate pin ignores it. */
  pinZoom?: number | null;
  /** Bundle 2 step 10 — the directions line, then the location details. */
  directions?: string | null;
  streetAddress?: string | null;
  /**
   * Bundle 11 A2 (D120) — a control drawn at the end of a shown channel's row
   * (the reviewer's "Show number", the number, or why it was not shown — an
   * element with `basis-full` takes its own line under the row). The seller's
   * own preview passes nothing.
   */
  channelAction?: (channel: "phone" | "phone2" | "telegram" | "whatsapp") => ReactNode;
  /**
   * Bundle 19 turn 11 (D201 §6) — the buyer's contact block, passed by the
   * public ad page only: who is looking, the reveal state, and the tap. The
   * owner's and staff's previews pass nothing and keep today's rows.
   */
  save?: {
    viewer: "unknown" | "signedOut" | "signedIn";
    saved: boolean | null;
    count: number;
    busy: boolean;
    refusal: "rateLimited" | "failed" | null;
    signInTo: { to: "/auth"; search: { return: string } };
    onToggle: () => void;
  };
  contact?: {
    viewer: "unknown" | "signedOut" | "signedIn";
    signInTo: { to: "/auth"; search: { return: string } };
    state: ContactState;
    onReveal: () => void;
    whatsappText: string;
  };
  // Bundle 19 turn 13b (D201 §11) — the buyer's Report link, passed by the public ad page only
  report?: ReactNode;
  // Bundle 19 turn 14 (D201 §10) — the share control, passed by the public ad page only
  share?: ReactNode;
  publicCounts?: { views: number; shares: number };
  // Bundle 19 turn 16 (D201 §12) — the public seller key, passed by the public ad page only
  sellerAdsKey?: string | null;
}

export function ListingDetail(view: ListingDetailView) {
  const { t, entities, language } = useI18n();
  const saveSignInLabel = t("adPage.save.signIn");
  const scope = useCatalogScope();
  const tree = useCountryTree(view.country);
  const nodes: TreeNode[] = tree.loadedCountry === view.country ? tree.nodes : [];

  // INC-588 / D151 — every stored photo, through links that expire; D161 — each
  // with its card size for the page, its cover for the viewer and its thumb.
  const links = usePhotoLinks(view.photos);
  const images = galleryPhotos(view.photos, links);

  const places = view.coverage
    .map((id) => nodes.find((node) => node.id === id) ?? null)
    .filter((node): node is TreeNode => node !== null)
    .map((node) =>
      entityName(
        "location",
        { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
        entities,
      ),
    );

  const dealText = dealLines({
    deal: view.deal ?? null,
    attributes: view.attributes,
    definitions: view.definitions,
    attributeOptions: view.attributeOptions,
    unit: view.basisLabel ?? null,
    language,
    entities,
    t,
    tokens: scope,
  });
  // Bundle 4 step 10 — the one shared price line.
  const priceLine = sharedPriceLine(
    {
      mode: view.priceMode,
      amount: view.priceAmount,
      currency: view.priceCurrency,
      period: view.pricePeriod,
      bp: view.priceBp ?? null,
      unit: view.basisLabel ?? null,
    },
    t,
    t("post.review.noPrice"),
  );

  const channels = (["phone", "phone2", "telegram", "whatsapp"] as const).filter((channel) => {
    const entry = view.contactPref[channel];
    return (
      entry !== null && typeof entry === "object" && (entry as { show?: unknown }).show === true
    );
  });

  // INC-374 — a number the chosen model settles is shown as its range.
  const ranges = settledRanges(
    view.definitions,
    view.attributes,
    (definition) => view.attributeOptions[definition.attrKey] ?? [],
  );
  const facts = view.definitions.filter((definition) => {
    const value = view.attributes[definition.attrKey];
    // INC-587 — a choice whose option has no words left is not printed raw.
    return (
      (value !== undefined &&
        value !== null &&
        value !== "" &&
        choiceHeldKnown(definition, value, view.attributeOptions[definition.attrKey] ?? [])) ||
      definition.attrKey in ranges
    );
  });

  const factLabel = (definition: AttrDef) =>
    drawCatalog(
      entityName(
        "attribute",
        {
          id: definition.attributeId,
          nameEn: definition.nameEn,
          nameAm: definition.nameAm,
        },
        entities,
      ),
      scope,
    );
  const factValue = (definition: AttrDef) => {
    const range = ownValue(ranges, definition.attrKey);
    return range !== undefined
      ? rangeDisplayValue(definition, range, language, scope)
      : attributeDisplayValue(
          definition,
          view.attributes[definition.attrKey],
          view.attributeOptions[definition.attrKey] ?? [],
          language,
          t("post.review.yes"),
          t("post.review.no"),
          t("post.specs.yearEcSuffix"),
          scope,
        );
  };
  const highlighted = keyFacts(facts).filter(
    (definition) =>
      definition.attrType !== "boolean" || view.attributes[definition.attrKey] !== false,
  );

  const sold = typeof view.soldBadge === "string" && view.soldBadge.length > 0;
  const showSections = view.actor === "buyer" && !sold;
  const showContactBar = view.actor === "buyer" && !sold && view.contact !== undefined;
  const hasPin = typeof view.pinLat === "number" && typeof view.pinLng === "number";
  const [mapOpen, setMapOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("details");
  const articleRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const sections: { target: string; id: string; label: MessageKey }[] = [
    ...(facts.length > 0
      ? [{ target: "details", id: "ad-details", label: "post.preview.detailsLabel" as const }]
      : []),
    ...(view.description !== ""
      ? [
          {
            target: "description",
            id: "ad-description",
            label: "post.preview.descriptionLabel" as const,
          },
        ]
      : []),
    { target: "location", id: "ad-location", label: "adPage.section.location" },
    { target: "seller", id: "contact", label: "post.preview.sellerLabel" },
  ];
  const sectionIds = sections.map((section) => section.id).join(",");
  useEffect(() => {
    if (!showSections) return;
    const nav = navRef.current;
    const article = articleRef.current;
    if (!nav || !article) return;
    const subband = document.querySelector<HTMLElement>('[data-testid="shell-subband"]');
    const align = () => {
      if (!subband) return;
      const top =
        Number.parseFloat(getComputedStyle(subband).top) + subband.getBoundingClientRect().height;
      nav.style.setProperty("--listing-nav-top", `${top}px`);
    };
    align();
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(align);
    if (subband) resize?.observe(subband);
    const visible = new Map<string, number>();
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting)
                  visible.set(entry.target.id, entry.boundingClientRect.top);
                else visible.delete(entry.target.id);
              }
              const first = [...visible].sort((a, b) => a[1] - b[1])[0]?.[0];
              if (first)
                setCurrentSection(first === "contact" ? "seller" : first.replace("ad-", ""));
            },
            { rootMargin: "-180px 0px -45% 0px", threshold: 0 },
          );
    for (const id of sectionIds.split(",")) {
      const section = article.querySelector(`#${id}`);
      if (section) observer?.observe(section);
    }
    return () => {
      observer?.disconnect();
      resize?.disconnect();
    };
  }, [showSections, sectionIds]);
  const scrollSection = (id: string) => {
    articleRef.current?.querySelector(`#${id}`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  };

  return (
    <article
      ref={articleRef}
      className={`@container min-w-0 ${showContactBar ? "pb-20 md:pb-0" : ""}`}
      data-testid="listing-detail"
      data-actor={view.actor}
    >
      {view.actor === "owner" && view.counts !== undefined && (
        <p
          data-testid="listing-detail-counts"
          data-state={view.counts === null ? "unavailable" : "ready"}
          className="text-sm text-muted-foreground"
        >
          {view.counts === null ? (
            t("adPage.counts.unavailable")
          ) : (
            <>
              <span data-testid="listing-detail-count" data-count="views">
                {fill(t("feed.views"), { count: view.counts.views })}
              </span>
              {view.counts.shares !== undefined && (
                <>
                  {" · "}
                  <span data-testid="listing-detail-count" data-count="shares">
                    {fill(t("adPage.counts.shares"), { count: view.counts.shares })}
                  </span>
                </>
              )}
              {view.counts.saves !== undefined && (
                <>
                  {" · "}
                  <span data-testid="listing-detail-count" data-count="saves">
                    {fill(t("adPage.counts.saves"), { count: view.counts.saves })}
                  </span>
                </>
              )}
              {view.counts.contacts !== undefined && (
                <>
                  {" · "}
                  <span data-testid="listing-detail-count" data-count="contacts">
                    {fill(t("adPage.counts.contacts"), { count: view.counts.contacts })}
                  </span>
                </>
              )}
            </>
          )}
        </p>
      )}
      <div className="grid min-w-0 grid-cols-1 gap-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @2xl:gap-6 @4xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* ------------------------------ the gallery ------------------------- */}
        <div className="relative order-1 min-w-0 @2xl:col-span-2 @4xl:col-span-1">
          {images.length > 0 ? (
            <PhotoGallery
              photos={images}
              markUnscreened={view.markUnscreened === true}
              ribbon={view.ribbon ?? null}
            />
          ) : (
            <ListingPicture
              photoUrl={null}
              categoryUrl={view.illustrationUrl}
              photosSoon={view.photosSoon === true}
              ribbon={view.ribbon ?? null}
              boxTestId={
                view.illustrationUrl !== null
                  ? "listing-detail-illustration"
                  : "listing-detail-nophoto"
              }
            />
          )}

          {(view.share !== undefined || view.save !== undefined) && (
            <div className="absolute end-2 top-2 z-10 flex max-w-[calc(100%-1rem)] items-start gap-2">
              {view.share}
              {view.save !== undefined && (
                <Button
                  asChild={view.save.viewer === "signedOut"}
                  variant="ghost"
                  className="h-11 min-w-11 gap-2 rounded-full bg-background/90 px-3 text-foreground shadow-sm"
                  {...(view.save.viewer === "signedOut"
                    ? {}
                    : {
                        type: "button" as const,
                        "data-testid": "listing-save",
                        "data-state":
                          view.save.viewer === "unknown"
                            ? "unknown"
                            : view.save.saved
                              ? "saved"
                              : "unsaved",
                        "aria-pressed": view.save.saved === true,
                        "aria-label": t(view.save.saved ? "adPage.save.remove" : "adPage.save.add"),
                        disabled:
                          view.save.viewer === "unknown" ||
                          view.save.busy ||
                          view.save.saved === null,
                        onClick: view.save.onToggle,
                      })}
                >
                  {view.save.viewer === "signedOut" ? (
                    <Link
                      to={view.save.signInTo.to}
                      search={view.save.signInTo.search}
                      data-testid="listing-save"
                      data-state="signedOut"
                      aria-label={saveSignInLabel}
                    >
                      <Heart aria-hidden="true" className="size-5 shrink-0" />
                      {view.save.count > 0 && (
                        <span
                          className="whitespace-normal text-start"
                          data-testid="listing-save-count"
                        >
                          {fill(t("adPage.save.count"), { count: view.save.count })}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <>
                      <Heart
                        aria-hidden="true"
                        className={
                          view.save.saved ? "size-5 shrink-0 text-destructive" : "size-5 shrink-0"
                        }
                        fill={view.save.saved ? "currentColor" : "none"}
                      />
                      {view.save.count > 0 && (
                        <span
                          className="whitespace-normal text-start"
                          data-testid="listing-save-count"
                        >
                          {fill(t("adPage.save.count"), { count: view.save.count })}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        <aside
          data-testid="listing-detail-aside"
          className="contents @2xl:sticky @2xl:top-[8.5rem] @2xl:col-start-2 @2xl:row-start-2 @2xl:block @2xl:min-w-0 @2xl:self-start @2xl:space-y-4 @4xl:row-start-1 @4xl:row-span-2"
        >
          <section
            data-testid="listing-detail-headline"
            className="order-2 min-w-0 space-y-3 rounded-md border border-border bg-card p-4 @2xl:p-5"
          >
            {/* ---------------------------- title and price ----------------------- */}
            <h2
              className="font-display text-xl font-semibold leading-tight text-foreground @4xl:text-2xl"
              data-testid="listing-detail-title"
            >
              {view.title === "" ? t("post.review.noTitle") : view.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-2xl font-bold text-primary" data-testid="listing-detail-price">
                {priceLine}
              </p>
              {view.priceNegotiable === true && <NegotiableBadge />}
              {typeof view.soldBadge === "string" && view.soldBadge.length > 0 && (
                <span
                  data-testid="listing-detail-sold-badge"
                  className="inline-flex shrink-0 items-center rounded-full bg-destructive px-2 py-0.5 text-xs font-semibold uppercase text-destructive-foreground"
                >
                  {view.soldBadge}
                </span>
              )}
            </div>
            {view.save?.refusal && (
              <p
                role="status"
                data-testid="listing-save-refusal"
                className="text-sm text-destructive"
              >
                {t(
                  view.save.refusal === "rateLimited"
                    ? "adPage.save.rateLimited"
                    : "adPage.save.failed",
                )}
              </p>
            )}
            {highlighted.length > 0 && (
              <ul data-testid="listing-key-facts" className="flex flex-wrap gap-2">
                {highlighted.map((definition) => (
                  <li
                    key={definition.attrKey}
                    data-testid="listing-key-fact"
                    data-fact-key={definition.attrKey}
                    className="rounded-md border border-border px-2 py-1 text-xs"
                  >
                    <span className="text-muted-foreground">{factLabel(definition)}</span>
                    {definition.attrType !== "boolean" && (
                      <span className="ms-1 font-semibold text-foreground">
                        {factValue(definition)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {dealText.size !== null && (
              <p className="text-sm text-muted-foreground" data-testid="listing-detail-deal-size">
                {dealText.size}
              </p>
            )}
            {dealText.terms.map((line) => (
              <p
                key={line}
                className="text-sm text-muted-foreground"
                data-testid="listing-detail-deal-term"
              >
                {line}
              </p>
            ))}
            {places.length > 0 && (
              <p className="text-sm text-muted-foreground" data-testid="listing-detail-places">
                {places.join(", ")}
              </p>
            )}

            {view.actor === "buyer" &&
              view.publicCounts !== undefined &&
              (view.publicCounts.views >= 1 || view.publicCounts.shares >= 1) && (
                <p
                  data-testid="listing-detail-public-counts"
                  className="text-xs text-muted-foreground"
                >
                  {view.publicCounts.views >= 1 && (
                    <span data-count="seen">
                      {fill(t("adPage.counts.seen"), { count: view.publicCounts.views })}
                    </span>
                  )}
                  {view.publicCounts.views >= 1 && view.publicCounts.shares >= 1 && " · "}
                  {view.publicCounts.shares >= 1 && (
                    <span data-count="shared">
                      {fill(t("adPage.counts.shared"), { count: view.publicCounts.shares })}
                    </span>
                  )}
                </p>
              )}
          </section>
          {/* ----------------------------- the seller --------------------------- */}
          {/* Bundle 11 A3 (D130) — one box, in order: who sells, then how to reach
          them, one method per row with its control at the row's end. */}
          <section
            id="contact"
            className="order-8 scroll-mt-14 space-y-3 rounded-md border border-border bg-card p-4 @2xl:p-5"
            data-testid="listing-detail-seller"
          >
            <div className="space-y-1">
              <h3 className="font-display text-base font-semibold text-foreground">
                {t("post.preview.sellerLabel")}
              </h3>
              <SellerLine
                alias={view.sellerAlias}
                businessName={view.sellerBusinessName}
                previousAlias={view.sellerPreviousAlias ?? null}
                memberSince={view.sellerMemberSince ?? null}
                testId="listing-detail-seller"
              />
            </div>
            {!(typeof view.soldBadge === "string" && view.soldBadge.length > 0) && (
              <div className="border-t border-border pt-3" data-testid="listing-detail-contact">
                {!(view.actor === "buyer" && view.contact?.viewer === "signedOut") && (
                  <h4 className="text-xs font-medium text-muted-foreground">
                    {t("post.preview.contactLabel")}
                  </h4>
                )}
                {view.actor === "buyer" && view.contact !== undefined ? (
                  <BuyerContact contact={view.contact} channels={channels} />
                ) : (
                  <ul className="divide-y divide-border text-sm">
                    {channels.map((channel) => {
                      const entry = ownValue(view.contactPref, channel);
                      const value =
                        entry !== null && typeof entry === "object"
                          ? ownValue(entry as Record<string, unknown>, "value")
                          : undefined;
                      const label =
                        channel === "phone"
                          ? t("post.who.channel.phone")
                          : channel === "phone2"
                            ? t("post.who.channel.phone2")
                            : channel === "telegram"
                              ? t("post.who.channel.telegram")
                              : t("post.who.channel.whatsapp");
                      return (
                        <li
                          key={channel}
                          data-testid="listing-detail-channel"
                          data-channel={channel}
                          className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 py-2"
                        >
                          <span
                            className="me-auto text-foreground"
                            data-testid="listing-detail-channel-label"
                          >
                            {label}
                          </span>
                          {view.actor === "owner" &&
                            typeof value === "string" &&
                            value.trim() !== "" && (
                              <span
                                data-testid="listing-detail-channel-value"
                                data-channel={channel}
                                className="text-foreground"
                              >
                                {value}
                              </span>
                            )}
                          {view.channelAction?.(channel) ?? null}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
            {/* Bundle 19 turn 16 (D201 §12) — All ads by this seller; a seller
              with no alias (a business named by its business name alone) gets
              no link. The owner's and staff's previews pass no key. */}
            {typeof view.sellerAdsKey === "string" && view.sellerAdsKey !== "" && (
              <Link
                data-testid="listing-seller-all-ads"
                to="/$name"
                params={{ name: view.sellerAdsKey }}
                className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
              >
                {t("adPage.seller.allAds")}
              </Link>
            )}
          </section>

          {view.report !== undefined && (
            <div id="report" data-testid="listing-detail-report" className="order-9">
              {view.report}
            </div>
          )}
        </aside>
        <div
          data-testid="listing-detail-main"
          className="contents @2xl:col-start-1 @2xl:row-start-2 @2xl:flex @2xl:min-w-0 @2xl:flex-col @2xl:gap-6"
        >
          {showSections && (
            <nav
              ref={navRef}
              data-testid="listing-section-nav"
              aria-label={t("adPage.sections.label")}
              className="sticky top-[var(--listing-nav-top,8.5rem)] z-10 order-3 flex min-w-0 overflow-x-auto border-b border-border bg-card @2xl:hidden @4xl:flex"
            >
              {sections.map((section) => (
                <Button
                  key={section.target}
                  variant="ghost"
                  type="button"
                  data-testid="listing-section-nav-item"
                  data-target={section.target}
                  aria-current={currentSection === section.target ? "true" : undefined}
                  className={`min-h-11 shrink-0 rounded-none border-b-2 px-3 ${currentSection === section.target ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                  onClick={() => {
                    setCurrentSection(section.target);
                    scrollSection(section.id);
                  }}
                >
                  {t(section.label)}
                </Button>
              ))}
            </nav>
          )}
          <div className="contents @4xl:order-4 @4xl:grid @4xl:grid-cols-2 @4xl:gap-4">
            {!sold && <SafetyBox />}

            {/* ------------------------------ the facts --------------------------- */}
            {facts.length > 0 && (
              <section
                id="ad-details"
                className="order-5 min-w-0 scroll-mt-14 space-y-3 rounded-md border border-border bg-card p-4 @2xl:p-5"
                data-testid="listing-detail-specs"
              >
                <h3 className="font-display text-base font-semibold text-foreground">
                  {t("post.preview.detailsLabel")}
                </h3>
                <dl className="space-y-2 text-sm">
                  {facts.map((definition) => (
                    <div key={definition.attrKey} className="grid grid-cols-2 gap-3">
                      <dt className="text-muted-foreground">{factLabel(definition)}</dt>
                      <dd
                        className="text-start text-foreground"
                        data-testid="listing-detail-spec"
                        data-key={definition.attrKey}
                      >
                        {factValue(definition)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
          {/* --------------------------- the description ------------------------ */}
          {view.description !== "" && (
            <section
              id="ad-description"
              className="order-6 min-w-0 scroll-mt-14 space-y-3 rounded-md border border-border bg-card p-4 @2xl:p-5"
            >
              <h3 className="font-display text-base font-semibold text-foreground">
                {t("post.preview.descriptionLabel")}
              </h3>
              <p
                className="whitespace-pre-line text-sm leading-relaxed text-foreground"
                data-testid="listing-detail-description"
              >
                {view.description}
              </p>
            </section>
          )}

          <section
            id="ad-location"
            data-testid="listing-detail-location"
            className="order-7 min-w-0 scroll-mt-14 space-y-3 rounded-md border border-border bg-card p-4 @2xl:p-5"
          >
            <h3 className="font-display text-base font-semibold">{t("adPage.section.location")}</h3>
            {places.length > 0 && (
              <p className="text-sm text-muted-foreground">{places.join(", ")}</p>
            )}
            {/* Step 10 (P4) — directions above the location details, as text (F2). */}
            {(view.directions || view.streetAddress) && (
              <dl className="space-y-1 text-sm" data-testid="listing-detail-place-text">
                {view.directions ? (
                  <div data-testid="listing-detail-directions">
                    <dt className="text-xs text-muted-foreground">
                      {t("post.where.directionsLabel")}
                    </dt>
                    <dd className="text-foreground">{view.directions}</dd>
                  </div>
                ) : null}
                {view.streetAddress ? (
                  <div data-testid="listing-detail-details">
                    <dt className="text-xs text-muted-foreground">
                      {t("post.where.detailsLabel")}
                    </dt>
                    <dd className="text-foreground">{view.streetAddress}</dd>
                  </div>
                ) : null}
              </dl>
            )}

            {hasPin && typeof view.pinLat === "number" && typeof view.pinLng === "number" && (
              <div className="relative" data-testid="listing-detail-map">
                <Suspense
                  fallback={<p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>}
                >
                  <MapPreview
                    lat={view.pinLat}
                    lng={view.pinLng}
                    precision={view.pinPrecision ?? "exact"}
                    zoom={view.pinZoom ?? null}
                  />
                </Suspense>
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid="listing-map-enlarge"
                  className="absolute end-2 top-2 z-10 gap-2 bg-card"
                  onClick={() => setMapOpen(true)}
                >
                  <Expand className="size-4" aria-hidden="true" />
                  {t("adPage.map.enlarge")}
                </Button>
                <Dialog open={mapOpen} onOpenChange={setMapOpen}>
                  {mapOpen && (
                    <DialogContent
                      data-testid="listing-map-dialog"
                      aria-describedby={undefined}
                      className="flex h-[90dvh] w-[calc(100%-1rem)] flex-col p-4 md:h-[70vh] md:max-w-4xl"
                    >
                      <div className="flex items-center justify-between gap-2 pe-8">
                        <DialogTitle>{t("adPage.section.location")}</DialogTitle>
                        <DialogClose asChild>
                          <Button variant="outline" size="touch" data-testid="listing-map-close">
                            {t("common.close")}
                          </Button>
                        </DialogClose>
                      </div>
                      <Suspense
                        fallback={
                          <p className="text-sm text-muted-foreground">{t("post.pin.title")}</p>
                        }
                      >
                        <MapLarge
                          lat={view.pinLat}
                          lng={view.pinLng}
                          precision={view.pinPrecision ?? "exact"}
                          zoom={view.pinZoom ?? null}
                        />
                      </Suspense>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            )}
          </section>
        </div>
      </div>
      {showContactBar && view.contact && (
        <div
          data-testid="listing-contact-bar"
          className="fixed inset-x-0 bottom-[var(--bottom-bar)] z-20 border-t border-border bg-card p-2 md:hidden"
        >
          <Button
            variant="default"
            size="touch"
            asChild={view.contact.viewer === "signedOut"}
            data-testid={
              view.contact.viewer === "signedOut" ? undefined : "listing-contact-bar-action"
            }
            className="w-full"
            disabled={view.contact.viewer === "unknown" || view.contact.state.kind === "loading"}
            onClick={
              view.contact.viewer === "signedOut"
                ? undefined
                : () => {
                    scrollSection("contact");
                    if (
                      view.contact?.state.kind !== "revealed" &&
                      view.contact?.state.kind !== "loading"
                    )
                      view.contact?.onReveal();
                  }
            }
          >
            {view.contact.viewer === "signedOut" ? (
              <Link
                to={view.contact.signInTo.to}
                search={view.contact.signInTo.search}
                data-testid="listing-contact-bar-action"
              >
                {t("adPage.contact.link")}
              </Link>
            ) : (
              t("adPage.contact.link")
            )}
          </Button>
        </div>
      )}
    </article>
  );
}

/** Bundle 19 turn 11 (D201 §6) — the buyer's contact block: a sign-in sentence, Show contact, or the revealed links. */
function BuyerContact({
  contact,
  channels,
}: {
  contact: NonNullable<ListingDetailView["contact"]>;
  channels: readonly ContactChannel[];
}) {
  const { t } = useI18n();

  // Blink-free first paint: until the sign-in state is known, the heading alone.
  if (contact.viewer === "unknown") return null;

  if (contact.viewer === "signedOut") {
    return (
      <Button asChild variant="outline" size="touch" className="w-full">
        <Link
          to={contact.signInTo.to}
          search={contact.signInTo.search}
          data-testid="listing-contact-sign-in"
        >
          {t("adPage.contact.link")}
        </Link>
      </Button>
    );
  }

  const state = contact.state;
  const revealed = state.kind === "revealed" ? state.channels : null;
  const channelLabel = (channel: ContactChannel) =>
    channel === "phone"
      ? t("post.who.channel.phone")
      : channel === "phone2"
        ? t("post.who.channel.phone2")
        : channel === "telegram"
          ? t("post.who.channel.telegram")
          : t("post.who.channel.whatsapp");

  return (
    <div className="space-y-2">
      <ul className="divide-y divide-border text-sm">
        {channels.map((channel) => {
          const value = revealed?.[channel];
          const shown = typeof value === "string" && value !== "" ? value : null;
          const href =
            shown === null
              ? null
              : channel === "telegram"
                ? telegramHref(shown)
                : channel === "whatsapp"
                  ? whatsappHref(shown, contact.whatsappText)
                  : telHref(shown);
          return (
            <li
              key={channel}
              data-testid="listing-detail-channel"
              data-channel={channel}
              className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-1 py-2"
            >
              <span className="me-auto text-foreground" data-testid="listing-detail-channel-label">
                {channelLabel(channel)}
              </span>
              {shown !== null ? (
                href !== null ? (
                  <a
                    data-testid={`listing-contact-${channel}`}
                    href={href}
                    {...(channel === "telegram" || channel === "whatsapp"
                      ? { target: "_blank", rel: "noopener" }
                      : {})}
                    className="text-primary underline underline-offset-4"
                  >
                    {shown}
                  </a>
                ) : (
                  <span data-testid={`listing-contact-${channel}`} className="text-foreground">
                    {shown}
                  </span>
                )
              ) : null}
            </li>
          );
        })}
      </ul>
      {state.kind === "refused" && (
        <p role="status" data-testid="listing-contact-refusal" className="text-sm text-destructive">
          {state.reason === "sellersCapReached"
            ? t("adPage.contact.sellersCap")
            : state.reason === "rateLimited"
              ? t("adPage.contact.rateLimited")
              : t("adPage.contact.failed")}
        </p>
      )}
      {state.kind !== "revealed" && (
        <Button
          type="button"
          variant="default"
          size="touch"
          data-testid="listing-contact-show"
          disabled={state.kind === "loading"}
          onClick={contact.onReveal}
        >
          {t("adPage.contact.show")}
        </Button>
      )}
    </div>
  );
}

export default ListingDetail;
