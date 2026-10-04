import { useI18n } from "@/i18n";
import { NegotiableBadge } from "@/components/marketplace/listing-card";
import { entityName } from "@/i18n/entity";
import { useCountryTree, type TreeNode } from "@/components/shell/location-data";

import { formatCommission } from "./price-basis";
import { priceLine as sharedPriceLine } from "./price-line";
import { fill } from "./refusal-text";
import { attributeDisplayValue } from "./attribute-display";
import type { AttrOption } from "./attribute-options";
import type { AttrDef, DraftPhotoRow } from "./posting-service";
import type { DealLists, PricePeriod } from "./types";
import { dealLines } from "./deal-lines";
import type { MessageKey } from "@/i18n";

/**
 * U6-C2b — WHAT THE BUYER WILL SEE (spec §4 B2 step 8).
 *
 * THE PREVIEW IS BUILT FROM THE DRAFT, NOT FROM A SECOND SOURCE. Every line here
 * is a value the seller already answered and the door already holds: no feed
 * component exists yet (E1), so this is the listing's first rendering — and it is
 * deliberately the plainest one, because its job is to let a seller catch their
 * own mistake, not to flatter the listing.
 *
 * THE COVER IS THE SERVER'S FIRST PHOTO, in the server's own order — the same rule
 * the grid in step 2 states, so the preview cannot disagree with the tile marked
 * "cover".
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

function coverUrlOf(photos: DraftPhotoRow[]): string | null {
  const paths = photos[0]?.paths ?? null;
  if (paths === null) return null;
  const url = paths["card"] ?? paths["cover"] ?? paths["thumb"];
  return typeof url === "string" ? url : null;
}

export function ListingPreview({
  title,
  description,
  priceMode,
  priceAmount,
  priceCurrency,
  pricePeriod,
  priceBp = null,
  basisLabel = null,
  deal = null,
  dealDefinitions,
  priceNegotiable = false,
  attributes,
  definitions,
  attributeOptions = {},
  photos,
  coverage,
  country,
  contactPref,
}: {
  title: string;
  description: string;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  /** DEC-079 — a commission in basis points; judged before any amount (L6). */
  priceBp?: number | null;
  /** DEC-079 — the basis option's label, so a money price reads "per <basis>". */
  basisLabel?: string | null;
  /** Bundle 4 step 10 — the door's deal lists: the size and terms lines under the price. */
  deal?: DealLists | null;
  /** Turn 5 item 2 — definitions for the size and terms lines only (defaults to `definitions`). */
  dealDefinitions?: AttrDef[];
  /** DEC-081 — "Price is negotiable", shown as a badge beside the price. */
  priceNegotiable?: boolean;
  attributes: Record<string, unknown>;
  definitions: AttrDef[];
  attributeOptions?: Record<string, AttrOption[]>;
  photos: DraftPhotoRow[];
  coverage: string[];
  /** The market the coverage belongs to, so place names can be resolved. */
  country: string | null;
  contactPref: Record<string, unknown>;
}) {
  const { t, entities, language } = useI18n();
  const tree = useCountryTree(country);
  const nodes: TreeNode[] = tree.loadedCountry === country ? tree.nodes : [];
  const cover = coverUrlOf(photos);

  const places = coverage
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
    deal,
    attributes,
    definitions: dealDefinitions ?? definitions,
    attributeOptions,
    unit: basisLabel,
    language,
    entities,
    t,
  });
  // Bundle 4 step 10 — the one shared price line.
  const priceLine = sharedPriceLine(
    {
      mode: priceMode,
      amount: priceAmount,
      currency: priceCurrency,
      period: pricePeriod,
      bp: priceBp,
      unit: basisLabel,
    },
    t,
    t("post.review.noPrice"),
    language,
  );

  const shown = (["phone", "phone2", "telegram", "whatsapp"] as const).filter((channel) => {
    const entry = contactPref[channel];
    return (
      entry !== null && typeof entry === "object" && (entry as { show?: unknown }).show === true
    );
  });

  return (
    <div
      className="space-y-3 rounded-md border border-border p-3"
      data-testid="post-review-preview"
    >
      {cover !== null ? (
        <div
          className="mx-auto flex aspect-[4/3] w-full max-w-80 items-center justify-center overflow-hidden rounded-sm"
          data-testid="post-review-cover-box"
        >
          <img
            src={cover}
            alt=""
            width={320}
            height={240}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground" data-testid="post-review-nophoto">
          {t("feed.noPhoto")}
        </p>
      )}

      <h3 className="text-base font-semibold text-foreground" data-testid="post-review-title">
        {title === "" ? t("post.review.noTitle") : title}
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-foreground" data-testid="post-review-price">
          {priceLine}
        </p>
        {priceNegotiable && <NegotiableBadge />}
      </div>
      {dealText.size !== null && (
        <p className="text-sm text-muted-foreground" data-testid="post-review-deal-size">
          {dealText.size}
        </p>
      )}
      {dealText.terms.map((line) => (
        <p key={line} className="text-sm text-muted-foreground" data-testid="post-review-deal-term">
          {line}
        </p>
      ))}
      {places.length > 0 && (
        <p className="text-sm text-muted-foreground" data-testid="post-review-places">
          {places.join(", ")}
        </p>
      )}
      {description !== "" && (
        <p
          className="whitespace-pre-line text-sm text-muted-foreground"
          data-testid="post-review-description"
        >
          {description}
        </p>
      )}

      {definitions.length > 0 && (
        <dl className="space-y-1 text-sm" data-testid="post-review-specs">
          {definitions
            .filter((definition) => {
              const value = attributes[definition.attrKey];
              return value !== undefined && value !== null && value !== "";
            })
            .map((definition) => (
              <div key={definition.attrKey} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">
                  {entityName(
                    "attribute",
                    {
                      id: definition.attributeId,
                      nameEn: definition.nameEn,
                      nameAm: definition.nameAm,
                    },
                    entities,
                  )}
                </dt>
                <dd
                  className="text-foreground"
                  data-testid="post-review-spec"
                  data-key={definition.attrKey}
                >
                  {attributeDisplayValue(
                    definition,
                    attributes[definition.attrKey],
                    attributeOptions[definition.attrKey] ?? [],
                    language,
                    t("post.review.yes"),
                    t("post.review.no"),
                    t("post.specs.yearEcSuffix"),
                  )}
                </dd>
              </div>
            ))}
        </dl>
      )}

      <p className="text-xs text-muted-foreground" data-testid="post-review-channels">
        {fill(t("post.review.channels"), { count: shown.length + 1 })}
      </p>
    </div>
  );
}

export default ListingPreview;
