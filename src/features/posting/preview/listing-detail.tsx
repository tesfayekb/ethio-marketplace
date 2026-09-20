import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { useCountryTree, type TreeNode } from "@/components/shell/location-data";

import { fill } from "../refusal-text";
import { attributeDisplayValue } from "../attribute-display";
import type { AttrOption } from "../attribute-options";
import type { AttrDef, DraftPhotoRow } from "../posting-service";
import type { PricePeriod } from "../types";
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

/** A stored photo's best available rendering, in the server's own order. */
function urlOf(row: DraftPhotoRow): string | null {
  const paths = row.paths ?? {};
  const url = paths["card"] ?? paths["cover"] ?? paths["thumb"];
  return typeof url === "string" && url !== "" ? url : null;
}

export interface ListingDetailView {
  title: string;
  description: string;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  pricePeriod: string | null;
  attributes: Record<string, unknown>;
  definitions: AttrDef[];
  attributeOptions: Record<string, AttrOption[]>;
  photos: DraftPhotoRow[];
  /** The nearest ancestor category's picture, shown when there is no photo. */
  illustrationUrl: string | null;
  coverage: string[];
  country: string | null;
  contactPref: Record<string, unknown>;
  /** The public seller name, and the business name when there is one. */
  sellerAlias: string | null;
  sellerBusinessName: string | null;
}

export function ListingDetail(view: ListingDetailView) {
  const { t, entities, language } = useI18n();
  const tree = useCountryTree(view.country);
  const nodes: TreeNode[] = tree.loadedCountry === view.country ? tree.nodes : [];

  const images = view.photos.map(urlOf).filter((url): url is string => url !== null);

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

  const priceLine =
    view.priceMode === "free"
      ? t("price.free")
      : view.priceMode === "contact"
        ? t("price.contact")
        : view.priceAmount === null
          ? t("post.review.noPrice")
          : fill(t("post.review.priceLine"), {
              amount: view.priceAmount.toLocaleString(),
              currency: view.priceCurrency ?? "",
              period: isPeriod(view.pricePeriod) ? t(PERIOD_KEYS[view.pricePeriod]) : "",
            }).trim();

  const channels = (["phone", "telegram", "whatsapp"] as const).filter((channel) => {
    const entry = view.contactPref[channel];
    return (
      entry !== null && typeof entry === "object" && (entry as { show?: unknown }).show === true
    );
  });

  const facts = view.definitions.filter((definition) => {
    const value = view.attributes[definition.attrKey];
    return value !== undefined && value !== null && value !== "";
  });

  return (
    <article className="space-y-4" data-testid="listing-detail">
      {/* ------------------------------ the gallery ------------------------- */}
      {images.length > 0 ? (
        <div className="space-y-2" data-testid="listing-detail-gallery">
          {images.map((url, index) => (
            <figure
              key={url}
              className="mx-auto flex aspect-[4/3] w-full max-w-80 items-center justify-center overflow-hidden rounded-md bg-muted"
            >
              <img
                src={url}
                alt=""
                width={320}
                height={240}
                loading="lazy"
                className="h-full w-full object-contain"
              />
              <figcaption className="sr-only">
                {fill(t("post.preview.photoCount"), {
                  index: index + 1,
                  total: images.length,
                })}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : view.illustrationUrl !== null ? (
        <div
          className="mx-auto flex aspect-[4/3] w-full max-w-80 items-center justify-center overflow-hidden rounded-md bg-muted"
          data-testid="listing-detail-illustration"
        >
          <img
            src={view.illustrationUrl}
            alt=""
            width={320}
            height={240}
            loading="lazy"
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground" data-testid="listing-detail-nophoto">
          {t("feed.noPhoto")}
        </p>
      )}

      {/* ---------------------------- title and price ----------------------- */}
      <h2 className="text-lg font-semibold text-foreground" data-testid="listing-detail-title">
        {view.title === "" ? t("post.review.noTitle") : view.title}
      </h2>
      <p className="text-base font-medium text-foreground" data-testid="listing-detail-price">
        {priceLine}
      </p>
      {places.length > 0 && (
        <p className="text-sm text-muted-foreground" data-testid="listing-detail-places">
          {places.join(", ")}
        </p>
      )}

      {/* ------------------------------ the facts --------------------------- */}
      {facts.length > 0 && (
        <section className="space-y-2" data-testid="listing-detail-specs">
          <h3 className="text-sm font-medium text-foreground">{t("post.preview.detailsLabel")}</h3>
          <dl className="divide-y divide-border rounded-md border border-border text-sm">
            {facts.map((definition) => (
              <div key={definition.attrKey} className="flex justify-between gap-3 p-2">
                <dt className="text-muted-foreground">
                  {entityName(
                    "attribute",
                    { id: definition.attributeId, nameEn: definition.nameEn, nameAm: null },
                    entities,
                  )}
                </dt>
                <dd
                  className="text-end text-foreground"
                  data-testid="listing-detail-spec"
                  data-key={definition.attrKey}
                >
                  {attributeDisplayValue(
                    definition,
                    view.attributes[definition.attrKey],
                    view.attributeOptions[definition.attrKey] ?? [],
                    language,
                    t("post.review.yes"),
                    t("post.review.no"),
                  )}
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
      <section
        className="space-y-1 rounded-md border border-border p-3"
        data-testid="listing-detail-seller"
      >
        <h3 className="text-sm font-medium text-foreground">{t("post.preview.sellerLabel")}</h3>
        <p className="text-sm text-foreground" data-testid="listing-detail-seller-name">
          {view.sellerBusinessName !== null && view.sellerBusinessName !== ""
            ? view.sellerBusinessName
            : (view.sellerAlias ?? t("post.review.notGiven"))}
        </p>
        {view.sellerAlias !== null &&
          view.sellerBusinessName !== null &&
          view.sellerBusinessName !== "" && (
            <p className="text-xs text-muted-foreground" data-testid="listing-detail-seller-alias">
              {view.sellerAlias}
            </p>
          )}
        <ul className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <li data-testid="listing-detail-channel" data-channel="messages">
            {t("post.who.channel.messages")}
          </li>
          {channels.map((channel) => (
            <li key={channel} data-testid="listing-detail-channel" data-channel={channel}>
              {channel === "phone"
                ? t("post.who.channel.phone")
                : channel === "telegram"
                  ? t("post.who.channel.telegram")
                  : t("post.who.channel.whatsapp")}
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------- the map ---------------------------- */}
      <div
        className="grid min-h-24 place-items-center rounded-md border border-dashed border-border p-3"
        data-testid="listing-detail-map"
      >
        <p className="text-xs text-muted-foreground">{t("post.preview.mapPlaceholder")}</p>
      </div>
    </article>
  );
}

export default ListingDetail;
