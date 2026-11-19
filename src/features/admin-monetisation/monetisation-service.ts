import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { rpc } from "@/lib/supabase-door";

import {
  readMarket,
  readOverride,
  readPrice,
  readProduct,
  readRows,
  rowOf,
  type MarketRow,
  type OverrideRow,
  type PriceRow,
  type ProductRow,
} from "./monetisation-rows";

/**
 * P-1b (D290, D295, D303, D311, D312) — ADMIN › MONETISATION: THE CLIENT SEAM.
 *
 * ONE READ for the four product tables: the staff reader
 * `admin_list_monetisation()` (M-c) answers `{markets, products, overrides,
 * prices}` in one round trip, each row with its author's and editor's display
 * names and never their ids. It is the ONE admin reader of `package_prices`
 * (CF-PRICE-1) and of `listing_packages` / `level_overrides` (CF-LEVEL-1): the
 * rows are shown as data; an ad's price is only ever the SQL resolver
 * `product_price_for`, its perks only ever `level_perks_for`.
 *
 * Seven WRITES, each a SECURITY DEFINER door that re-checks the permission, the
 * second factor and the `staff_config` dial before any side effect:
 * `admin_save_listing_package`, `admin_save_level_override`,
 * `admin_clear_level_override`, `admin_save_package_price`,
 * `admin_edit_package_price`, `admin_end_package_price` and
 * `admin_save_market_settings`.
 *
 * Law F4 — no phantom success: every door error is thrown; a failed read is a
 * typed `ReaderError`; `useMonetisationError` reads the door's refusal code
 * through `readRefusal` over `MONETISATION_DOOR_REFUSALS` (F1-6b). Every call goes through the Supabase door
 * (DEC-261).
 */

export type { MarketRow, OverrideRow, PriceRow, ProductRow } from "./monetisation-rows";
export { PLACEMENTS, PRODUCT_KINDS } from "./monetisation-rows";
export type { Placement, ProductKind } from "./monetisation-rows";

/* --------------------------------- reads --------------------------------- */

export interface MonetisationConsole {
  markets: MarketRow[];
  products: ProductRow[];
  overrides: OverrideRow[];
  prices: PriceRow[];
}

/** The ONE read: the four tables in one round trip, as the console shows them. */
export async function listMonetisation(): Promise<MonetisationConsole> {
  const { data, error } = await rpc("admin_list_monetisation");
  if (error) throw new ReaderError(readerFailure(error));
  const answer = rowOf(data, "admin_list_monetisation");
  return {
    markets: readRows(answer, "markets", readMarket),
    products: readRows(answer, "products", readProduct),
    overrides: readRows(answer, "overrides", readOverride),
    prices: readRows(answer, "prices", readPrice),
  };
}

/* --------------------------------- doors --------------------------------- */

/** A thrown door refusal keeps the message AND the SQLSTATE (P0009 is the step-up gate). */
export class MonetisationDoorError extends Error {
  readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = "MonetisationDoorError";
    this.code = code;
  }
}

function refused(error: { message: string; code: string } | null): void {
  if (error) throw new MonetisationDoorError(error.message, error.code);
}

export interface SaveProductInput {
  key: string;
  kind: "level" | "reach";
  nameEn: string;
  /** null = no Amharic name yet (the English stands in). */
  nameAm: string | null;
  days: number;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  /** The level's own perks; a reach product sends none (the door refuses them). */
  maxPhotos: number | null;
  placement: string | null;
  badge: boolean | null;
  /** A reach product's place limits (a null cap = no limit), always set for a reach; null for a level. */
  caps: ReachCaps | null;
  /** null = the door keeps the stored order (0 for a new product). */
  sort: number | null;
}

/** A reach row's three place limits, each null for no limit (DEC-356). */
export interface ReachCaps {
  maxCities: number | null;
  maxRegions: number | null;
  maxCountries: number | null;
}

export async function saveProduct(input: SaveProductInput): Promise<void> {
  const { error } = await rpc("admin_save_listing_package", {
    p_key: input.key,
    p_kind: input.kind,
    p_name_en: input.nameEn,
    p_days: input.days,
    p_enabled: input.enabled,
    p_self_serve: input.selfServe,
    p_extends_lifetime: input.extendsLifetime,
    // INC-188 — the editor round-trips every stored field it shows.
    ...(input.nameAm === null ? {} : { p_name_am: input.nameAm }),
    ...(input.maxPhotos === null ? {} : { p_max_photos: input.maxPhotos }),
    ...(input.placement === null ? {} : { p_placement: input.placement }),
    ...(input.badge === null ? {} : { p_badge: input.badge }),
    // DEC-356 — a reach row always states its three caps (a JSON null = no limit); a level never.
    ...(input.kind === "reach" && input.caps !== null
      ? {
          p_caps: {
            max_cities: input.caps.maxCities,
            max_regions: input.caps.maxRegions,
            max_countries: input.caps.maxCountries,
          },
        }
      : {}),
    ...(input.sort === null ? {} : { p_sort: input.sort }),
  });
  refused(error);
}

export interface SaveOverrideInput {
  levelKey: string;
  /** null = every category. */
  categoryId: string | null;
  /** null = every country. */
  countryCode: string | null;
  /** Each null = the level's own value; the door refuses all four null. */
  days: number | null;
  maxPhotos: number | null;
  placement: string | null;
  badge: boolean | null;
}

export async function saveOverride(input: SaveOverrideInput): Promise<void> {
  const { error } = await rpc("admin_save_level_override", {
    p_level_key: input.levelKey,
    ...(input.categoryId === null ? {} : { p_category_id: input.categoryId }),
    ...(input.countryCode === null ? {} : { p_country_code: input.countryCode }),
    ...(input.days === null ? {} : { p_days: input.days }),
    ...(input.maxPhotos === null ? {} : { p_max_photos: input.maxPhotos }),
    ...(input.placement === null ? {} : { p_placement: input.placement }),
    ...(input.badge === null ? {} : { p_badge: input.badge }),
  });
  refused(error);
}

export async function clearOverride(id: string): Promise<void> {
  const { error } = await rpc("admin_clear_level_override", { p_id: id });
  refused(error);
}

export interface SavePriceInput {
  packageKey: string;
  /** null = every market. */
  countryCode: string | null;
  /** null = every category. */
  categoryId: string | null;
  amount: number;
  currency: string;
  creditCost: number;
  /** ISO; the door defaults to now() when null. */
  validFrom: string | null;
  /** ISO; null = open-ended. */
  validTo: string | null;
}

function priceArgs(input: SavePriceInput) {
  return {
    p_amount: input.amount,
    p_currency: input.currency,
    p_credit_cost: input.creditCost,
    ...(input.countryCode === null ? {} : { p_country_code: input.countryCode }),
    ...(input.categoryId === null ? {} : { p_category_id: input.categoryId }),
    ...(input.validFrom === null ? {} : { p_valid_from: input.validFrom }),
    ...(input.validTo === null ? {} : { p_valid_to: input.validTo }),
  };
}

export async function savePrice(input: SavePriceInput): Promise<void> {
  const { error } = await rpc("admin_save_package_price", {
    p_package_key: input.packageKey,
    ...priceArgs(input),
  });
  refused(error);
}

/** Edit while unused (`used_count = 0`) and live; the door refuses otherwise. */
export async function editPrice(id: string, input: SavePriceInput): Promise<void> {
  const { error } = await rpc("admin_edit_package_price", { p_id: id, ...priceArgs(input) });
  refused(error);
}

export async function endPrice(id: string, validTo: string | null): Promise<void> {
  const { error } = await rpc("admin_end_package_price", {
    p_id: id,
    ...(validTo === null ? {} : { p_valid_to: validTo }),
  });
  refused(error);
}

export interface SaveMarketInput {
  /** null = the default row ("any other country"). */
  countryCode: string | null;
  freeRegularAds: number;
  includedReach: string;
  paidLevels: boolean;
  /** Both required while paid levels are on; a null is stored as a blank (the door keeps nothing). */
  launchCredits: number | null;
  launchDays: number | null;
}

export async function saveMarket(input: SaveMarketInput): Promise<void> {
  const { error } = await rpc("admin_save_market_settings", {
    p_free_regular_ads: input.freeRegularAds,
    p_included_reach: input.includedReach,
    p_paid_levels: input.paidLevels,
    ...(input.countryCode === null ? {} : { p_country_code: input.countryCode }),
    ...(input.launchCredits === null ? {} : { p_launch_credits: input.launchCredits }),
    ...(input.launchDays === null ? {} : { p_launch_days: input.launchDays }),
  });
  refused(error);
}

/* ------------------------------- the shapes ------------------------------- */

/** The door's key shape (`listing_packages_key_check`), so the form refuses before the round trip. */
export const PRODUCT_KEY_PATTERN = /^[a-z][a-z0-9_]{1,31}$/;
/** The door's name bound (`badName`): required English, 80 characters at most. */
export const PRODUCT_NAME_MAX = 80;
