import { ReaderError } from "@/lib/reader-failure";

/**
 * P-1b — the console's rows as `admin_list_monetisation()` answers them (jsonb),
 * narrowed field by field. A field of the wrong shape is a malformed read
 * (a typed `ReaderError`), never a sentinel default: the console shows what the
 * database said or says it could not read it (F4).
 */

export const PRODUCT_KINDS = ["level", "reach"] as const;
export type ProductKind = (typeof PRODUCT_KINDS)[number];

export const PLACEMENTS = ["standard", "boost", "top"] as const;
export type Placement = (typeof PLACEMENTS)[number];

/** Who wrote and last changed a row — display names from the reader, never ids. */
export interface Attribution {
  createdByName: string | null;
  updatedByName: string | null;
  updatedAt: string;
}

export interface MarketRow extends Attribution {
  id: string;
  /** null = the default row, "any other country". */
  countryCode: string | null;
  freeRegularAds: number;
  includedReach: string;
  paidLevels: boolean;
  launchCredits: number | null;
  launchDays: number | null;
  paidLevelsSince: string | null;
}

export interface ProductRow extends Attribution {
  key: string;
  kind: ProductKind;
  nameEn: string;
  nameAm: string | null;
  days: number;
  /** A level's own perks; a reach product carries none. */
  maxPhotos: number | null;
  placement: Placement | null;
  badge: boolean;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  sort: number;
}

export interface OverrideRow extends Attribution {
  id: string;
  levelKey: string;
  /** null = every category. */
  categoryId: string | null;
  /** null = every country. */
  countryCode: string | null;
  /** Each null = the level's own value. */
  days: number | null;
  maxPhotos: number | null;
  placement: Placement | null;
  badge: boolean | null;
}

export interface PriceRow extends Attribution {
  id: string;
  packageKey: string;
  /** null = every market. */
  countryCode: string | null;
  /** null = every category. */
  categoryId: string | null;
  /** The stored amount, shown as data; 0 is free. Never computed here (CF-PRICE-1). */
  amount: number;
  currency: string;
  creditCost: number;
  validFrom: string;
  /** null = open-ended. */
  validTo: string | null;
  usedCount: number;
}

/* ------------------------------ the narrowing ------------------------------ */

function malformed(what: string): ReaderError {
  return new ReaderError({ class: "malformed", message: `monetisation console: ${what}` });
}

/** A jsonb object, or a malformed read. */
export function rowOf(value: unknown, what: string): object {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw malformed(`${what} is not an object`);
  }
  return value;
}

function field(row: object, name: string): unknown {
  const value: unknown = Reflect.get(row, name);
  return value;
}

function text(row: object, name: string): string {
  const value = field(row, name);
  if (typeof value !== "string") throw malformed(`${name} is not text`);
  return value;
}

function textOrNull(row: object, name: string): string | null {
  const value = field(row, name);
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") throw malformed(`${name} is not text`);
  return value;
}

function count(row: object, name: string): number {
  const value = field(row, name);
  // jsonb carries a numeric column as a number; a `numeric` may arrive as text.
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Number(value);
  }
  throw malformed(`${name} is not a number`);
}

function countOrNull(row: object, name: string): number | null {
  const value = field(row, name);
  if (value === null || value === undefined) return null;
  return count(row, name);
}

function flag(row: object, name: string): boolean {
  const value = field(row, name);
  if (typeof value !== "boolean") throw malformed(`${name} is not a boolean`);
  return value;
}

function flagOrNull(row: object, name: string): boolean | null {
  const value = field(row, name);
  if (value === null || value === undefined) return null;
  return flag(row, name);
}

function kindOf(row: object): ProductKind {
  const value = text(row, "kind");
  const found = PRODUCT_KINDS.find((kind) => kind === value);
  if (found === undefined) throw malformed(`kind ${value} is unknown`);
  return found;
}

function placementOrNull(row: object): Placement | null {
  const value = textOrNull(row, "placement");
  if (value === null) return null;
  const found = PLACEMENTS.find((placement) => placement === value);
  if (found === undefined) throw malformed(`placement ${value} is unknown`);
  return found;
}

function attribution(row: object): Attribution {
  return {
    createdByName: textOrNull(row, "created_by_name"),
    updatedByName: textOrNull(row, "updated_by_name"),
    updatedAt: text(row, "updated_at"),
  };
}

export function readMarket(value: unknown): MarketRow {
  const row = rowOf(value, "a market row");
  return {
    ...attribution(row),
    id: text(row, "id"),
    countryCode: textOrNull(row, "country_code"),
    freeRegularAds: count(row, "free_regular_ads"),
    includedReach: text(row, "included_reach"),
    paidLevels: flag(row, "paid_levels"),
    launchCredits: countOrNull(row, "launch_credits"),
    launchDays: countOrNull(row, "launch_days"),
    paidLevelsSince: textOrNull(row, "paid_levels_since"),
  };
}

export function readProduct(value: unknown): ProductRow {
  const row = rowOf(value, "a product row");
  return {
    ...attribution(row),
    key: text(row, "key"),
    kind: kindOf(row),
    nameEn: text(row, "name_en"),
    nameAm: textOrNull(row, "name_am"),
    days: count(row, "days"),
    maxPhotos: countOrNull(row, "max_photos"),
    placement: placementOrNull(row),
    badge: flag(row, "badge"),
    enabled: flag(row, "enabled"),
    selfServe: flag(row, "self_serve"),
    extendsLifetime: flag(row, "extends_lifetime"),
    sort: count(row, "sort"),
  };
}

export function readOverride(value: unknown): OverrideRow {
  const row = rowOf(value, "an override row");
  return {
    ...attribution(row),
    id: text(row, "id"),
    levelKey: text(row, "level_key"),
    categoryId: textOrNull(row, "category_id"),
    countryCode: textOrNull(row, "country_code"),
    days: countOrNull(row, "days"),
    maxPhotos: countOrNull(row, "max_photos"),
    placement: placementOrNull(row),
    badge: flagOrNull(row, "badge"),
  };
}

export function readPrice(value: unknown): PriceRow {
  const row = rowOf(value, "a price row");
  return {
    ...attribution(row),
    id: text(row, "id"),
    packageKey: text(row, "package_key"),
    countryCode: textOrNull(row, "country_code"),
    categoryId: textOrNull(row, "category_id"),
    amount: count(row, "amount"),
    currency: text(row, "currency"),
    creditCost: count(row, "credit_cost"),
    validFrom: text(row, "valid_from"),
    validTo: textOrNull(row, "valid_to"),
    usedCount: count(row, "used_count"),
  };
}

/** One of the reader's four arrays, each entry narrowed by its reader. */
export function readRows<T>(answer: object, name: string, read: (value: unknown) => T): T[] {
  const value = field(answer, name);
  if (!Array.isArray(value)) throw malformed(`${name} is not a list`);
  return value.map((entry: unknown) => read(entry));
}
