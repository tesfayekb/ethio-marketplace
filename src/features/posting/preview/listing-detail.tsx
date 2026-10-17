import { Link } from "@tanstack/react-router";

import { ListingPicture } from "@/components/marketplace/listing-picture";
import { Button } from "@/components/ui/button";
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
import { lazy, Suspense, type ReactNode } from "react";
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
  counts?: { views: number; contacts?: number } | null;
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
  contact?: {
    viewer: "unknown" | "signedOut" | "signedIn";
    signInTo: { to: "/auth"; search: { return: string } };
    state: ContactState;
    onReveal: () => void;
    whatsappText: string;
  };
}

export function ListingDetail(view: ListingDetailView) {
  const { t, entities, language } = useI18n();
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

  return (
    <article className="space-y-4" data-testid="listing-detail" data-actor={view.actor}>
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
      {/* ------------------------------ the gallery ------------------------- */}
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
            view.illustrationUrl !== null ? "listing-detail-illustration" : "listing-detail-nophoto"
          }
        />
      )}

      {/* ---------------------------- title and price ----------------------- */}
      <h2 className="text-lg font-semibold text-foreground" data-testid="listing-detail-title">
        {view.title === "" ? t("post.review.noTitle") : view.title}
      </h2>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-base font-medium text-foreground" data-testid="listing-detail-price">
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
      {highlighted.length > 0 && (
        <ul data-testid="listing-key-facts" className="flex flex-wrap gap-2">
          {highlighted.map((definition) => (
            <li
              key={definition.attrKey}
              data-testid="listing-key-fact"
              data-key={definition.attrKey}
              className="rounded-md border border-border px-2 py-1 text-xs"
            >
              <span className="text-muted-foreground">{factLabel(definition)}</span>
              {definition.attrType !== "boolean" && (
                <span className="ms-1 font-semibold text-foreground">{factValue(definition)}</span>
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

      {!(typeof view.soldBadge === "string" && view.soldBadge.length > 0) && <SafetyBox />}

      {/* ------------------------------ the facts --------------------------- */}
      {facts.length > 0 && (
        <section className="space-y-2" data-testid="listing-detail-specs">
          <h3 className="text-sm font-medium text-foreground">{t("post.preview.detailsLabel")}</h3>
          <dl className="divide-y divide-border rounded-md border border-border text-sm">
            {facts.map((definition) => (
              <div key={definition.attrKey} className="flex justify-between gap-3 p-2">
                <dt className="text-muted-foreground">{factLabel(definition)}</dt>
                <dd
                  className="text-end text-foreground"
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
        <section className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">
            {t("post.preview.descriptionLabel")}
          </h3>
          <p
            className="whitespace-pre-line text-sm text-muted-foreground"
            data-testid="listing-detail-description"
          >
            {view.description}
          </p>
        </section>
      )}

      {/* ----------------------------- the seller --------------------------- */}
      {/* Bundle 11 A3 (D130) — one box, in order: who sells, then how to reach
          them, one method per row with its control at the row's end. */}
      <section
        id="contact"
        className="space-y-3 rounded-md border border-border p-3"
        data-testid="listing-detail-seller"
      >
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{t("post.preview.sellerLabel")}</h3>
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
            <h4 className="text-xs font-medium text-muted-foreground">
              {t("post.preview.contactLabel")}
            </h4>
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
                    {view.actor === "owner" && typeof value === "string" && value.trim() !== "" && (
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
      </section>

      {/* Step 10 (P4) — directions above the location details, as text (F2). */}
      {(view.directions || view.streetAddress) && (
        <dl className="space-y-1 text-sm" data-testid="listing-detail-place-text">
          {view.directions ? (
            <div data-testid="listing-detail-directions">
              <dt className="text-xs text-muted-foreground">{t("post.where.directionsLabel")}</dt>
              <dd className="text-foreground">{view.directions}</dd>
            </div>
          ) : null}
          {view.streetAddress ? (
            <div data-testid="listing-detail-details">
              <dt className="text-xs text-muted-foreground">{t("post.where.detailsLabel")}</dt>
              <dd className="text-foreground">{view.streetAddress}</dd>
            </div>
          ) : null}
        </dl>
      )}

      {/* ------------------------------- the map ---------------------------- */}
      <div data-testid="listing-detail-map">
        {typeof view.pinLat === "number" && typeof view.pinLng === "number" ? (
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
        ) : (
          <div className="grid min-h-24 place-items-center rounded-md border border-dashed border-border p-3">
            <p className="text-xs text-muted-foreground">{t("post.preview.mapPlaceholder")}</p>
          </div>
        )}
      </div>
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
      <Link
        to="/auth"
        search={contact.signInTo.search}
        data-testid="listing-contact-sign-in"
        className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
      >
        {t("adPage.contact.signIn")}
      </Link>
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
