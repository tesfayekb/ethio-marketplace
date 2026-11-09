import { shapeAttrOption } from "@/features/posting/attribute-options";
import { shapeDeal, shapePostingSchema } from "@/features/posting/schema-shape";
import { readPin } from "@/features/posting/map/pin";
import type { ListingDetailView } from "@/features/posting/preview/listing-detail";
import { ribbonOf, type FeedSoldWord } from "@/features/feed/feed-page";
import { catalogText } from "@/i18n/entity";
import { tierOf } from "@/components/marketplace/card-tier";
import { levelNameOf, parseDocumentLevel } from "@/features/levels/level-fields";

type PublicValue =
  | string
  | number
  | boolean
  | null
  | PublicValue[]
  | { [key: string]: PublicValue };
type PublicRecord = Record<string, PublicValue>;

/** The public_listing document: public facts only, never a contact value or seller id. */
export interface PublicListingDoc {
  public_id: string;
  title: string;
  description: string;
  status: string;
  is_sold: boolean;
  sold_at: string | null;
  sold_word: FeedSoldWord | null;
  reserved: boolean;
  published_at: string | null;
  expires_at: string | null;
  renewed_at: string | null;
  tier: string;
  /**
   * P-2 (c) c2a (DEC-351 §8) — the ad's level look, resolved by `level_perks_for`, and its
   * level row's names (NULL when the row is gone); absent in an answer cached before them.
   */
  level?: {
    key: string;
    placement: string | null;
    badge: boolean | null;
    name_en?: string | null;
    name_am?: string | null;
  };
  photos_soon: boolean;
  video_url: string | null;
  country: string | null;
  price: {
    mode: string;
    amount: number | null;
    currency: string | null;
    period: string | null;
    bp: number | null;
    negotiable: boolean;
    unit: string | null;
    unit_text: string | null;
    unit_label: { en: string; am: string | null } | null;
    was: number | null;
    drop_at: string | null;
  };
  category: {
    id: string;
    slug: string;
    name_en: string;
    name_am: string | null;
    capabilities: string[];
    illustration_url: string | null;
    deal: { basis: string[]; size: string[]; quantity: string[]; terms: string[] };
    path: Array<{ id: string; slug: string; name_en: string; name_am: string | null }>;
  } | null;
  attributes: PublicRecord;
  definitions: Array<PublicRecord & { options?: PublicRecord[] }>;
  photos: Array<{
    id: string;
    display_order: number;
    paths: PublicRecord | null;
    width: number | null;
    height: number | null;
  }>;
  cover_photo_id: string | null;
  places: {
    location_id: string | null;
    coverage: string[];
    list: Array<{
      id: string;
      name_en: string;
      name_am: string | null;
      level: string;
      slug: string;
      country_code: string;
      position: number;
      map_visible: boolean;
      /** INC-949 (D1 M3) — the place's ancestors, country first; absent before M3 is applied. */
      path?: Array<{
        id: string;
        name_en: string;
        name_am: string | null;
        level: string;
        slug: string;
      }>;
    }>;
    pin: { lat: number; lng: number; precision: string | null; zoom: number | null } | null;
    directions: string | null;
    street_address: string | null;
  };
  seller: {
    alias: string | null;
    business_name: string | null;
    previous_alias: string | null;
    member_since: string | null;
  };
  contact_channels: Array<"phone" | "phone2" | "telegram" | "whatsapp">;
  counts: { views: number; shares: number; saves: number };
  viewer: { owner: boolean; saved: boolean };
}

/**
 * P-2 (c) c2a (ruling 6 §3) — the flag's word on the ad page: the document's own level
 * names, in the reader's language, through the one name chooser; null (no word, so no
 * flag) when the document's level is not the ad's or carries no name.
 */
export function adPageLevelName(doc: PublicListingDoc, language: string): string | null {
  const level = parseDocumentLevel(doc.level);
  if (level === null || level.key !== tierOf(doc.tier)) return null;
  return levelNameOf(level.names, language);
}

/** ONE mapping onto the same detail used by seller and staff previews. Ribbon is a key until the caller translates it. */
export function adPageView(doc: PublicListingDoc, language: string): ListingDetailView {
  const label = doc.price.unit_label;
  const basisLabel =
    doc.price.unit === "other"
      ? doc.price.unit_text
      : catalogText(label?.en, label?.am, language) || null;
  const tier = tierOf(doc.tier);
  const level = parseDocumentLevel(doc.level);
  return {
    actor: "buyer",
    tier,
    look: level !== null && level.key === tier ? level.look : null,
    title: doc.title,
    postedAt: doc.published_at,
    description: doc.description,
    priceMode: doc.price.mode,
    priceAmount: doc.price.amount,
    priceCurrency: doc.price.currency,
    pricePeriod: doc.price.period,
    priceBp: doc.price.bp,
    priceNegotiable: doc.price.negotiable,
    basisLabel,
    deal: shapeDeal(doc.category?.deal),
    attributes: doc.attributes,
    definitions: shapePostingSchema({ attributes: doc.definitions })?.attributes ?? [],
    attributeOptions: Object.fromEntries(
      doc.definitions.map((definition) => [
        String(definition["attr_key"]),
        (definition.options ?? []).map(shapeAttrOption),
      ]),
    ),
    photos: doc.photos.map((photo) => ({
      id: photo.id,
      displayOrder: photo.display_order,
      paths: photo.paths,
      storagePath: null,
    })),
    illustrationUrl: doc.category?.illustration_url ?? null,
    photosSoon: doc.photos_soon,
    ribbon:
      ribbonOf({
        soldWord: doc.sold_word,
        closed: false,
        reserved: doc.reserved,
        priceReduced: doc.price.was !== null,
      })[0] ?? null,
    coverage: doc.places.coverage,
    // INC-940 — the place lines come with the page, never after the country tree.
    placeList: doc.places.list.map((place) => ({
      id: place.id,
      nameEn: place.name_en,
      // INC-949 — the ancestors, country first, for the Maps address.
      ...(place.path
        ? { path: place.path.map((step) => ({ id: step.id, nameEn: step.name_en })) }
        : {}),
    })),
    country: doc.country,
    contactPref: Object.fromEntries(doc.contact_channels.map((name) => [name, { show: true }])),
    sellerAlias: doc.seller.alias,
    sellerBusinessName: doc.seller.business_name,
    sellerPreviousAlias: doc.seller.previous_alias,
    sellerMemberSince: doc.seller.member_since,
    // INC-958 — the document's pin whole or absent; a precision it does not carry is no pin.
    pin: readPin(
      doc.places.pin?.lat,
      doc.places.pin?.lng,
      doc.places.pin?.precision,
      "the ad page's pin",
    ),
    pinZoom: doc.places.pin?.zoom ?? null,
    directions: doc.places.directions,
    streetAddress: doc.places.street_address,
  };
}
