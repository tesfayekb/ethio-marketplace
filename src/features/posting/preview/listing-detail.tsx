import { CARD_SURFACE } from "@/components/layout/surface";
import { loadOnce } from "@/lib/load-once";
import { resilientLazy } from "@/lib/resilient-lazy";
import { cn } from "@/lib/utils";
import {
  mapsPlaceQuery,
  webPlaceUrl,
  webPinUrl,
  appPlaceUrl,
  appPinUrl,
  isIosHomeScreen,
} from "@/features/ad-page/maps-links";
import { postedWhen } from "@/features/ad-page/posted";
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
import { galleryPhotos, type PhotoLinks } from "../photo-links";
import { usePhotoLinks } from "../use-photo-links";
import { PhotoGallery } from "./photo-gallery";
import { SafetyBox } from "./safety-box";
import { boxLayout } from "./box-layout";
import { keyFacts } from "../key-facts";
import { Suspense, useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { SellerLine } from "../seller-line";
import { fill } from "../refusal-text";
import { ownValue } from "@/lib/own-key";

/**
 * U6-C1-R3b-4 — the still map is its own lazy chunk, shared with U7: a listing
 * with no pin never downloads Leaflet, and neither does the first paint. D234 S3
 * (INC-897) — the still map's module is fetched once per visit (its component and
 * the pin snap share the one download, src/lib/load-once.ts), and both maps are
 * resilientLazy: a map that cannot download shows its word, never the route's
 * error screen.
 */
const MAP_PREVIEW = loadOnce(() => import("../map/map-preview"));
const MapPreview = resilientLazy(
  () => MAP_PREVIEW.load().then((mod) => mod.MapPreview),
  "the map",
  MapUnavailable,
);
const MapLarge = resilientLazy(
  () => import("../map/map-large").then((mod) => mod.MapLarge),
  "the large map",
  MapUnavailable,
);

/** What a map's place shows while it loads, or in its place: the map's own word. */
function MapUnavailable() {
  const { t } = useI18n();
  return <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>;
}

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

/** DEC-192 candidates, with INC-753's page-end exception. */
export function currentListingSection(
  items: readonly { target: string; shown: boolean; top: number; inBand: boolean }[],
  current: string,
  viewportHeight: number,
  atEnd: boolean,
): string {
  // INC-753 — at the end of the page the last section on screen is current: a section near the end can never reach the band.
  if (atEnd) {
    const last = items
      .filter((item) => item.shown && item.top >= 0 && item.top < viewportHeight)
      .at(-1);
    if (last) return last.target;
  }
  const visible = items.filter((item) => item.inBand);
  if (visible.length === 0) return current;
  const minTop = Math.min(...visible.map((item) => item.top));
  const candidates = visible.filter((item) => item.shown && item.top - minTop <= 8);
  if (candidates.some((item) => item.target === current)) return current;
  return candidates[0]?.target ?? current;
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
  postedAt?: string | null;
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
  /**
   * D234 S2 — the photos' links signed with the page's own server read (the buyer's
   * ad page), so the first photo is in the HTML and asks no second request after
   * hydration; absent or null = the links are read in the browser as before.
   */
  photoLinks?: PhotoLinks | null;
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
    onSignInTap: () => void;
    // DEC-196 — set once by the public ad page when the tab's sign-in return intent was taken.
    focusOnReturn?: boolean;
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
  const links = usePhotoLinks(view.photos, view.photoLinks ?? null);
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

  // DEC-196 — the sign-in return scrolls the seller card into view, highlights
  // it for three seconds and focuses Show contact; it never reveals. The flag
  // is used once, so a later re-render never moves the page again.
  const showContactRef = useRef<HTMLButtonElement | null>(null);
  const focusOnReturnDone = useRef(false);
  const [contactHighlight, setContactHighlight] = useState(false);
  useEffect(() => {
    if (focusOnReturnDone.current) return;
    if (view.contact?.focusOnReturn !== true || view.contact.viewer !== "signedIn") return;
    const button = showContactRef.current;
    const card = typeof document === "undefined" ? null : document.getElementById("contact");
    if (button === null || card === null) return;
    focusOnReturnDone.current = true;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof card.scrollIntoView === "function") {
      card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
    button.focus({ preventScroll: true });
    setContactHighlight(true);
    window.setTimeout(() => setContactHighlight(false), 3000);
  });

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
          entities,
        );
  };
  const highlighted = keyFacts(facts).filter(
    (definition) =>
      definition.attrType !== "boolean" || view.attributes[definition.attrKey] !== false,
  );

  const sold = typeof view.soldBadge === "string" && view.soldBadge.length > 0;
  const showSections = view.actor === "buyer";
  const hasPin = typeof view.pinLat === "number" && typeof view.pinLng === "number";
  // Turn 23 — the Location box and its tab exist only for a place of the
  // seller's own: a pin, directions or location details. An ad with only its
  // city keeps the city in the title box (listing-detail-places).
  const showLocation = hasPin || Boolean(view.directions) || Boolean(view.streetAddress);
  const query = mapsPlaceQuery(nodes, view.coverage) || places.join(", ");
  const placesMaps = webPlaceUrl(query);
  const placesApp = appPlaceUrl(query);
  const [mapMaps, setMapMaps] = useState<{ web: string; app: string } | null>(null);
  const [mapsChoice, setMapsChoice] = useState<{ web: string; app: string } | null>(null);
  useEffect(() => {
    let active = true;
    setMapMaps(null);
    const lat = view.pinLat;
    const lng = view.pinLng;
    if (typeof lat !== "number" || typeof lng !== "number") return;
    if (view.pinPrecision !== "approx") {
      // Google's Maps URLs require the comma between lat and lng as %2C.
      setMapMaps({ web: webPinUrl(lat, lng), app: appPinUrl(lat, lng, 15) });
      return;
    }
    // Keep the still-map module off the marketplace's first-paint graph.
    MAP_PREVIEW.load()
      .then(({ snap }) => {
        if (active) {
          const snappedLat = snap(lat).toFixed(2);
          const snappedLng = snap(lng).toFixed(2);
          setMapMaps({
            web: webPinUrl(snappedLat, snappedLng),
            app: appPinUrl(snappedLat, snappedLng, 13),
          });
        }
      })
      .catch((error: unknown) => console.error("[listing-maps]", error));
    return () => {
      active = false;
    };
  }, [view.pinLat, view.pinLng, view.pinPrecision]);
  const Title = view.actor === "buyer" ? "h1" : "h2";
  const [posted, setPosted] = useState<string | null>(null);
  useEffect(() => {
    setPosted(view.actor === "buyer" && view.postedAt ? postedWhen(view.postedAt, language) : null);
  }, [view.actor, view.postedAt, language]);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  useEffect(() => {
    setExpanded(false);
  }, [view.description, view.actor]);
  useEffect(() => {
    const text = descriptionRef.current;
    if (!text || view.actor !== "buyer") {
      setOverflows(false);
      return;
    }
    const measure = () => {
      if (expanded) return;
      const overflow = text.scrollHeight > text.clientHeight + 1;
      setOverflows((current) => (current === overflow ? current : overflow));
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(text);
    return () => observer?.disconnect();
  }, [view.actor, view.description, expanded]);
  const [mapOpen, setMapOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("details");
  const articleRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const pinnedRef = useRef<string | null>(null);
  const pinTimerRef = useRef<number | null>(null);
  // INC-779 — where the tap's own scroll stopped: the tapped tab stays current until the page moves from here.
  const heldYRef = useRef<number | null>(null);
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
    { target: "seller", id: "contact", label: "post.preview.sellerLabel" as const },
    ...(showLocation
      ? [{ target: "location", id: "ad-location", label: "adPage.section.location" as const }]
      : []),
  ];
  const sectionIds = sections.map((section) => section.id).join(",");
  const currentSectionRef = useRef(currentSection);
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const subband = document.querySelector<HTMLElement>('[data-testid="shell-subband"]');
    const align = () => {
      if (!subband) return;
      const top =
        Number.parseFloat(getComputedStyle(subband).top) + subband.getBoundingClientRect().height;
      article.style.setProperty("--listing-nav-top", `${top}px`);
    };
    align();
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(align);
    if (subband) resize?.observe(subband);
    window.addEventListener("resize", align);
    return () => {
      resize?.disconnect();
      window.removeEventListener("resize", align);
    };
  }, []);
  // INC-727 — a tap is the visitor's choice; the observer's view during
  // the tab's own scroll is not. Hold that choice until scrolling ends, and
  // read the sections' tops fresh when the next observer change decides.
  useEffect(() => {
    const article = articleRef.current;
    // DEC-197 — a page with fewer than two sections has no bar and no watcher.
    // DEC-200 — in the medium range the bar shows with ONE other section
    // (the Seller tab is always there), so the watcher runs from one.
    if (!article || !showSections || sectionIds === "") return;
    const endPin = () => {
      pinnedRef.current = null;
      heldYRef.current = null;
      if (pinTimerRef.current !== null) window.clearTimeout(pinTimerRef.current);
      pinTimerRef.current = null;
    };
    const visible = new Set<string>();
    const decide = () => {
      if (pinnedRef.current !== null) return;
      if (heldYRef.current !== null) {
        if (Math.abs(window.scrollY - heldYRef.current) < 2) return;
        heldYRef.current = null;
      }
      const items = sectionIds.split(",").flatMap((id) => {
        const section = article.querySelector(`#${id}`);
        if (!section) return [];
        const target = id === "contact" ? "seller" : id.replace("ad-", "");
        const item = navRef.current?.querySelector(`[data-target="${target}"]`);
        return [
          {
            target,
            shown: item != null && item.getClientRects().length > 0,
            top: section.getBoundingClientRect().top,
            inBand: visible.has(id),
          },
        ];
      });
      /* DEC-192 — tops within 8 px of the smallest are candidates;
         a current candidate stays, otherwise the first in bar order wins. */
      const next = currentListingSection(
        items,
        currentSectionRef.current,
        window.innerHeight,
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
      );
      if (next !== currentSectionRef.current) {
        currentSectionRef.current = next;
        setCurrentSection(next);
      }
    };
    // An early scrollend may belong to the scroll preceding this tap; it never releases the pin.
    window.addEventListener("scrollend", decide);
    window.addEventListener("scroll", decide, { passive: true });
    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
              }
              decide();
            },
            { rootMargin: "-180px 0px -45% 0px", threshold: 0 },
          );
    for (const id of sectionIds.split(",")) {
      const section = article.querySelector(`#${id}`);
      if (section) observer?.observe(section);
    }
    return () => {
      observer?.disconnect();
      window.removeEventListener("scrollend", decide);
      window.removeEventListener("scroll", decide);
      endPin();
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

  const layout = boxLayout({
    details: facts.length > 0,
    description: view.description !== "",
    safety: !sold,
    location: showLocation,
  });

  return (
    <article
      ref={articleRef}
      className="@container flex min-w-0 flex-col gap-4 wrap-anywhere"
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
      {/* DEC-201 (the operator's walk of turn 29, 2026-10-18) — below
          57.5rem the seller card follows Details and Description and the Seller
          tab shows; from 57.5rem it sits under the title box beside the photo.
          Below 57.5rem the top row, right column and boxes grid become
          `display: contents` inside this ONE FLEX wrapper: a column on phones,
          wrapping rows in the medium range. CSS `order` puts the seller card
          after Description. A flex wrapper, not a grid, lets the sticky bar
          stick beyond its own grid row. Why 57.5rem: from there the photo grows
          with its column, so the seller card may sit beside it; below it the
          card goes back into the boxes. The recorded keyboard order below
          57.5rem reaches Contact seller before the bar (the DOM order), while
          the eye sees it after Description. */}
      <div
        data-testid="listing-detail-layout"
        className="flex min-w-0 flex-col gap-4 @2xl:@max-[57.5rem]:flex-row @2xl:@max-[57.5rem]:flex-wrap"
      >
        <div
          data-testid="listing-detail-top"
          className="grid min-w-0 grid-cols-1 gap-4 @2xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @max-[57.5rem]:contents"
        >
          {/* ------------------------------ the gallery ------------------------- */}
          <div
            data-testid="listing-detail-media"
            className={cn(
              CARD_SURFACE,
              "relative isolate min-w-0 p-2 @2xl:flex @2xl:flex-col @2xl:p-3 @2xl:@max-[57.5rem]:shrink-0 @2xl:@max-[57.5rem]:basis-[calc(60%-0.6rem)]",
            )}
          >
            {images.length > 0 ? (
              <PhotoGallery
                photos={images}
                markUnscreened={view.markUnscreened === true}
                ribbon={view.ribbon ?? null}
                fill
              />
            ) : (
              <ListingPicture
                photoUrl={null}
                categoryUrl={view.illustrationUrl}
                priority
                photosSoon={view.photosSoon === true}
                ribbon={view.ribbon ?? null}
                boxTestId={
                  view.illustrationUrl !== null
                    ? "listing-detail-illustration"
                    : "listing-detail-nophoto"
                }
              />
            )}
          </div>

          {/* DEC-197 (bundle 19 turn 27) — the right column: the title box, then
            the seller card under it; together they are the photo's height. */}
          <div className="flex min-w-0 flex-col gap-4 @max-[57.5rem]:contents">
            <section
              data-testid="listing-detail-headline"
              className={cn(
                CARD_SURFACE,
                "isolate min-w-0 flex flex-col gap-3 p-4 @2xl:p-5 @2xl:@max-[57.5rem]:flex-1",
              )}
            >
              {/* ---------------------------- title and price ----------------------- */}
              <Title
                className="font-display text-xl font-semibold leading-tight text-foreground @4xl:text-2xl"
                data-testid="listing-detail-title"
              >
                {view.title === "" ? t("post.review.noTitle") : view.title}
              </Title>
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
              <div className="flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
                {places.length > 0 && (
                  <a
                    data-testid="listing-places-maps"
                    href={placesMaps}
                    onClick={(event) => {
                      if (!isIosHomeScreen()) return;
                      event.preventDefault();
                      setMapsChoice({ web: placesMaps, app: placesApp });
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
                  >
                    <span data-testid="listing-detail-places">{places.join(", ")}</span>
                  </a>
                )}
                {posted !== null && (
                  <p data-testid="listing-detail-posted">
                    {places.length > 0 && <span aria-hidden="true">{" · "}</span>}
                    {fill(t("adPage.posted"), { when: posted })}
                  </p>
                )}
              </div>

              {view.actor === "buyer" &&
                view.publicCounts !== undefined &&
                (view.publicCounts.views >= 10 || view.publicCounts.shares >= 1) && (
                  <p
                    data-testid="listing-detail-public-counts"
                    className="text-xs text-muted-foreground"
                  >
                    {/* INC-712 (D201 §19 Q-B) — "Seen" shows from ten views. */}
                    {view.publicCounts.views >= 10 && (
                      <span data-count="seen">
                        {fill(t("adPage.counts.seen"), { count: view.publicCounts.views })}
                      </span>
                    )}
                    {view.publicCounts.views >= 10 && view.publicCounts.shares >= 1 && " · "}
                    {view.publicCounts.shares >= 1 && (
                      <span data-count="shared">
                        {fill(t("adPage.counts.shared"), { count: view.publicCounts.shares })}
                      </span>
                    )}
                  </p>
                )}
              {/* DEC-192 (bundle 19 turn 22) — Save and Share are text links at the
            title box's foot, at every width; the count sits at the row's end. */}
              {(view.save !== undefined || view.share !== undefined) && (
                <div
                  data-testid="listing-detail-actions"
                  className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-2"
                >
                  {view.save !== undefined && (
                    <Button
                      asChild={view.save.viewer === "signedOut"}
                      variant="ghost"
                      className="h-auto min-h-11 gap-2 px-0 font-semibold text-primary hover:bg-transparent"
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
                            "aria-label": t(
                              view.save.saved ? "adPage.save.remove" : "adPage.save.add",
                            ),
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
                          {t("adPage.save.add")}
                        </Link>
                      ) : (
                        <>
                          <Heart
                            aria-hidden="true"
                            className="size-5 shrink-0"
                            fill={view.save.saved ? "currentColor" : "none"}
                          />
                          {t(view.save.saved ? "adPage.save.saved" : "adPage.save.add")}
                        </>
                      )}
                    </Button>
                  )}
                  {view.share}
                  {view.save !== undefined && view.save.count > 0 && (
                    <span
                      className="ms-auto text-sm text-muted-foreground"
                      data-testid="listing-save-count"
                    >
                      {fill(t("adPage.save.count"), { count: view.save.count })}
                    </span>
                  )}
                </div>
              )}
            </section>

            {/* ----------------------------- the seller --------------------------- */}
            {/* Bundle 11 A3 (D130) — one box, in order: who sells, then how to reach
            them, one method per row with its control at the row's end. DEC-197 —
            the seller card sits in the right column under the title box, filling
            the column's height. */}
            <section
              id="contact"
              aria-label={t("post.preview.sellerLabel")}
              className={cn(
                CARD_SURFACE,
                `isolate flex min-w-0 flex-1 scroll-mt-14 flex-col gap-3 p-4 @2xl:p-5 ${layout.seller} ${contactHighlight ? "ring-2 ring-primary ring-offset-2" : ""}`,
              )}
              data-testid="listing-detail-seller"
              data-highlight={contactHighlight ? "true" : undefined}
            >
              <div className="space-y-1">
                <SellerLine
                  alias={view.sellerAlias}
                  businessName={view.sellerBusinessName}
                  previousAlias={view.sellerPreviousAlias ?? null}
                  memberSince={view.sellerMemberSince ?? null}
                  testId="listing-detail-seller"
                />
              </div>
              {!sold &&
                (view.actor === "buyer"
                  ? view.contact?.viewer !== "unknown"
                  : channels.length > 0) && (
                  <div className="border-t border-border pt-3" data-testid="listing-detail-contact">
                    {view.actor === "buyer" && view.contact !== undefined ? (
                      <BuyerContact
                        contact={view.contact}
                        channels={channels}
                        showRef={showContactRef}
                      />
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
              no link. The owner's and staff's previews pass no key. DEC-197 —
              it sits at the card's foot when the card is taller than its
              content. */}
              {typeof view.sellerAdsKey === "string" && view.sellerAdsKey !== "" && (
                <Link
                  data-testid="listing-seller-all-ads"
                  to="/$name"
                  params={{ name: view.sellerAdsKey }}
                  className="mt-auto inline-flex min-h-11 items-center self-start text-sm text-primary underline underline-offset-4"
                >
                  {t("adPage.seller.allAds")}
                </Link>
              )}
            </section>
          </div>
        </div>

        {showSections && sections.length >= 2 && (
          <nav
            ref={navRef}
            data-testid="listing-section-nav"
            aria-label={t("adPage.sections.label")}
            className={cn(
              CARD_SURFACE,
              `scrollbar-none sticky top-[var(--listing-nav-top,8.5rem)] z-10 flex min-w-0 overflow-x-auto @2xl:@max-[57.5rem]:basis-full ${
                // DEC-201 — below 57.5rem Seller and one other section show
                // the bar; large screens keep DEC-197's "two or more".
                sections.length < 3 ? "@min-[57.5rem]:hidden" : ""
              }`,
            )}
          >
            {sections.map((section) => (
              <Button
                key={section.target}
                variant="ghost"
                type="button"
                data-testid="listing-section-nav-item"
                data-target={section.target}
                aria-current={currentSection === section.target ? "true" : undefined}
                className={`min-h-11 flex-1 justify-center rounded-none border-b-2 px-2 whitespace-nowrap @2xl:flex-none @2xl:justify-start @2xl:px-3 ${
                  // DEC-201 — the Seller tab shows below 57.5rem.
                  section.target === "seller" ? "@min-[57.5rem]:hidden" : ""
                } ${currentSection === section.target ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                onClick={() => {
                  // INC-753 — the tap's choice holds until its own scroll has stopped (200 ms still, 3 s at most): a fixed 1 s pin, or the first scrollend, handed 'current' to another tab while a slow smooth scroll was still moving. INC-779 — then it stays current until the reader moves the page.
                  pinnedRef.current = section.target;
                  heldYRef.current = null;
                  if (pinTimerRef.current !== null) window.clearTimeout(pinTimerRef.current);
                  currentSectionRef.current = section.target;
                  setCurrentSection(section.target);
                  const started = Date.now();
                  let stillSince = started;
                  let previousY = window.scrollY;
                  const checkStopped = () => {
                    const now = Date.now();
                    if (window.scrollY !== previousY) {
                      previousY = window.scrollY;
                      stillSince = now;
                    }
                    if (now - stillSince >= 200 || now - started >= 3000) {
                      heldYRef.current = window.scrollY;
                      pinnedRef.current = null;
                      pinTimerRef.current = null;
                      return;
                    }
                    pinTimerRef.current = window.setTimeout(checkStopped, 50);
                  };
                  scrollSection(section.id);
                  pinTimerRef.current = window.setTimeout(checkStopped, 50);
                }}
              >
                {t(section.label)}
              </Button>
            ))}
          </nav>
        )}

        <div
          data-testid="listing-detail-boxes"
          className="grid min-w-0 grid-cols-1 gap-4 @2xl:grid-cols-6 @max-[57.5rem]:contents"
        >
          {/* ------------------------------ the facts --------------------------- */}
          {facts.length > 0 && (
            <section
              id="ad-details"
              className={cn(
                CARD_SURFACE,
                `isolate min-w-0 scroll-mt-14 space-y-3 p-4 @2xl:p-5 ${layout.details}`,
              )}
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
          {/* --------------------------- the description ------------------------ */}
          {view.description !== "" && (
            <section
              id="ad-description"
              className={cn(
                CARD_SURFACE,
                `isolate flex min-w-0 scroll-mt-14 flex-col gap-3 p-4 @2xl:p-5 ${layout.description}`,
              )}
            >
              <h3 className="font-display text-base font-semibold text-foreground">
                {t("post.preview.descriptionLabel")}
              </h3>
              <p
                ref={descriptionRef}
                className={`whitespace-pre-line text-sm leading-relaxed text-foreground ${view.actor === "buyer" && !expanded ? "line-clamp-8" : ""}`}
                data-testid="listing-detail-description"
              >
                {view.description}
              </p>
              {view.actor === "buyer" && overflows && (
                <Button
                  variant="ghost"
                  className="mt-auto min-h-11 self-start text-primary"
                  data-testid="listing-description-toggle"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((current) => !current)}
                >
                  {t(expanded ? "adPage.description.less" : "adPage.description.more")}
                </Button>
              )}
            </section>
          )}

          {showLocation && (
            <section
              id="ad-location"
              data-testid="listing-detail-location"
              className={cn(
                CARD_SURFACE,
                `isolate min-w-0 scroll-mt-14 space-y-3 p-4 @2xl:p-5 ${layout.location}`,
              )}
            >
              <h3 className="font-display text-base font-semibold">
                {t("adPage.section.location")}
              </h3>
              {places.length > 0 && (
                <p className="text-sm text-muted-foreground">{places.join(", ")}</p>
              )}
              {/* Step 10 (P4) — directions above the location details, as text (F2). */}
              {(view.directions || view.streetAddress) && (
                <dl className="space-y-1 text-sm" data-testid="listing-detail-place-text">
                  {view.directions ? (
                    <div data-testid="listing-detail-directions">
                      <dt className="text-xs text-muted-foreground">{t("adPage.directions")}</dt>
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
                <div className="relative isolate" data-testid="listing-detail-map">
                  <Suspense
                    fallback={
                      <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>
                    }
                  >
                    <MapPreview
                      lat={view.pinLat}
                      lng={view.pinLng}
                      precision={view.pinPrecision ?? "exact"}
                      zoom={view.pinZoom ?? null}
                      {...(view.actor === "buyer" ? { audience: "buyer" as const } : {})}
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
                            {...(view.actor === "buyer" ? { audience: "buyer" as const } : {})}
                          />
                        </Suspense>
                      </DialogContent>
                    )}
                  </Dialog>
                  {mapMaps !== null && (
                    <a
                      data-testid="listing-map-google"
                      href={mapMaps.web}
                      onClick={(event) => {
                        if (!isIosHomeScreen()) return;
                        event.preventDefault();
                        setMapsChoice(mapMaps);
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
                    >
                      {t("adPage.map.google")}
                    </a>
                  )}
                </div>
              )}
            </section>
          )}
          {!sold && <SafetyBox className={layout.safety} />}
          {view.report !== undefined && (
            <div
              id="report"
              data-testid="listing-detail-report"
              className={`isolate min-w-0 ${layout.report}`}
            >
              {view.report}
            </div>
          )}
        </div>
      </div>
      {/* INC-731: an iPhone home-screen app opens outside links in an in-app window
          where Google's web link cannot open the Google Maps app. A web page cannot
          test whether the app is installed, so it offers both. */}
      <Dialog
        open={mapsChoice !== null}
        onOpenChange={(open) => {
          if (!open) setMapsChoice(null);
        }}
      >
        {mapsChoice !== null && (
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>{t("adPage.map.google")}</DialogTitle>
            <Button asChild variant="outline" className="min-h-11">
              <a
                data-testid="listing-maps-app"
                href={mapsChoice.app}
                onClick={() => setMapsChoice(null)}
              >
                {t("adPage.map.app")}
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <a
                data-testid="listing-maps-web"
                href={mapsChoice.web}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMapsChoice(null)}
              >
                {t("adPage.map.web")}
              </a>
            </Button>
            <DialogClose asChild>
              <Button data-testid="listing-maps-cancel" variant="outline" className="min-h-11">
                {t("common.cancel")}
              </Button>
            </DialogClose>
          </DialogContent>
        )}
      </Dialog>
    </article>
  );
}

/** Bundle 19 turn 11 (D201 §6) — the buyer's contact block: a sign-in sentence, Show contact, or the revealed links. */
function BuyerContact({
  contact,
  channels,
  showRef,
}: {
  contact: NonNullable<ListingDetailView["contact"]>;
  channels: readonly ContactChannel[];
  // DEC-196 — the sign-in return's one-time focus target.
  showRef?: Ref<HTMLButtonElement>;
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
          onClick={contact.onSignInTap}
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
      {state.kind !== "revealed" && (
        <Button
          ref={showRef}
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
    </div>
  );
}

export default ListingDetail;
