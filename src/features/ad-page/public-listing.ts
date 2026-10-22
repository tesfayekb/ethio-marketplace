import { shapeAttrOption } from "@/features/posting/attribute-options";
import { shapeDeal, shapePostingSchema } from "@/features/posting/posting-service";
import type { ListingDetailView } from "@/features/posting/preview/listing-detail";
import { ribbonOf, type FeedSoldWord } from "@/features/feed/feed-page";
import { catalogText } from "@/i18n/entity";

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

/** ONE mapping onto the same detail used by seller and staff previews. Ribbon is a key until the caller translates it. */
export function adPageView(doc: PublicListingDoc, language: string): ListingDetailView {
  const label = doc.price.unit_label;
  const basisLabel =
    doc.price.unit === "other"
      ? doc.price.unit_text
      : catalogText(label?.en, label?.am, language) || null;
  return {
    actor: "buyer",
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
    country: doc.country,
    contactPref: Object.fromEntries(doc.contact_channels.map((name) => [name, { show: true }])),
    sellerAlias: doc.seller.alias,
    sellerBusinessName: doc.seller.business_name,
    sellerPreviousAlias: doc.seller.previous_alias,
    sellerMemberSince: doc.seller.member_since,
    pinLat: doc.places.pin?.lat ?? null,
    pinLng: doc.places.pin?.lng ?? null,
    pinPrecision: doc.places.pin?.precision ?? null,
    pinZoom: doc.places.pin?.zoom ?? null,
    directions: doc.places.directions,
    streetAddress: doc.places.street_address,
  };
}
