import type { MessageKey } from "@/i18n";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { ownValue } from "@/lib/own-key";
import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { getSupabase, rpc } from "@/lib/supabase-door";

/**
 * P-1 (D280, D283) — ADMIN › PACKAGES: THE CLIENT SEAM.
 *
 * Two READS, both plain SELECTs as the caller: `listing_packages` (every row for
 * a `packages:view` holder through `listing_packages_staff_read`; the public
 * policy shows enabled rows only) and `package_prices` by package (the staff
 * policy shows ended and future windows too). This file is the ONE admin reader
 * of `package_prices` (CF-PRICE-1): it lists the rows a package holds and never
 * computes a price — an ad's price is only ever the SQL resolver
 * `package_price_for(listing, package)`.
 *
 * Three WRITES, each a SECURITY DEFINER door that re-checks
 * `has_permission(uid,'packages','update')`, the second factor and the
 * `staff_config` dial before any side effect: `admin_save_listing_package`
 * (create or edit by key), `admin_save_package_price` (insert only) and
 * `admin_end_package_price` (sets `valid_to`; a price is never deleted).
 *
 * Law F4 — no phantom success: every door error is thrown; a failed read is a
 * typed `ReaderError`; `packagesErrorKey` turns the door's own RAISE message
 * into a translated key. The client arrives through the Supabase door (DEC-261);
 * a failed download of it is reported to the shell's one notice (INC-911) and
 * read as a typed failure, never a blank table.
 */

/** The one place this file asks the door for the client (INC-915's shape). */
async function readerClient(): Promise<Awaited<ReturnType<typeof getSupabase>>> {
  try {
    return await getSupabase();
  } catch (error) {
    reportOnDemandFailure("the packages console's code", error);
    throw new ReaderError({
      class: "network",
      message: "the packages console's code did not load",
    });
  }
}

/* --------------------------------- rows ---------------------------------- */

export const PACKAGE_TIERS = ["featured", "premium"] as const;
export type PackageTier = (typeof PACKAGE_TIERS)[number];

export function isPackageTier(value: string): value is PackageTier {
  return (PACKAGE_TIERS as readonly string[]).includes(value);
}

export interface PackageRow {
  key: string;
  tier: PackageTier;
  days: number;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  labelKey: string | null;
  sort: number;
  updatedAt: string;
}

export interface PriceRow {
  id: string;
  packageKey: string;
  /** null = every market. */
  countryCode: string | null;
  /** null = every category. */
  categoryId: string | null;
  /** The stored amount, shown as data; 0 is free. Never computed here (CF-PRICE-1). */
  amount: number;
  currency: string;
  validFrom: string;
  /** null = open-ended. */
  validTo: string | null;
}

/** A row whose tier the database refused to name is a malformed read, never a guess. */
function tierOf(key: string, value: string): PackageTier {
  if (isPackageTier(value)) return value;
  throw new ReaderError({
    class: "malformed",
    message: `listing_packages: the package ${key} carries an unknown tier`,
  });
}

export async function listPackages(): Promise<PackageRow[]> {
  const client = await readerClient();
  const { data, error } = await client
    .from("listing_packages")
    .select("key, tier, days, enabled, self_serve, extends_lifetime, label_key, sort, updated_at")
    .order("sort")
    .order("key");
  if (error) throw new ReaderError(readerFailure(error));
  return (data ?? []).map((row) => ({
    key: row.key,
    tier: tierOf(row.key, row.tier),
    days: row.days,
    enabled: row.enabled,
    selfServe: row.self_serve,
    extendsLifetime: row.extends_lifetime,
    labelKey: row.label_key,
    sort: row.sort,
    updatedAt: row.updated_at,
  }));
}

/** The one admin reader of a package's price rows (CF-PRICE-1), newest window first. */
export async function listPackagePrices(packageKey: string): Promise<PriceRow[]> {
  const client = await readerClient();
  const { data, error } = await client
    .from("package_prices")
    .select("id, package_key, country_code, category_id, amount, currency, valid_from, valid_to")
    .eq("package_key", packageKey)
    .order("valid_from", { ascending: false })
    .order("id");
  if (error) throw new ReaderError(readerFailure(error));
  return (data ?? []).map((row) => ({
    id: row.id,
    packageKey: row.package_key,
    countryCode: row.country_code,
    categoryId: row.category_id,
    amount: row.amount,
    currency: row.currency,
    validFrom: row.valid_from,
    validTo: row.valid_to,
  }));
}

/* --------------------------------- doors --------------------------------- */

export interface SavePackageInput {
  key: string;
  tier: PackageTier;
  days: number;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  labelKey: string;
  /** null = the door keeps the stored order (0 for a new package). */
  sort: number | null;
}

/** A thrown door refusal keeps the message AND the SQLSTATE (P0009 is the step-up gate). */
export class PackagesDoorError extends Error {
  readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = "PackagesDoorError";
    this.code = code;
  }
}

export async function savePackage(input: SavePackageInput): Promise<void> {
  const { error } = await rpc("admin_save_listing_package", {
    p_key: input.key,
    p_tier: input.tier,
    p_days: input.days,
    p_enabled: input.enabled,
    p_self_serve: input.selfServe,
    p_extends_lifetime: input.extendsLifetime,
    // INC-188 — the editor round-trips every stored field it shows.
    p_label_key: input.labelKey,
    ...(input.sort === null ? {} : { p_sort: input.sort }),
  });
  if (error) throw new PackagesDoorError(error.message, error.code);
}

export interface SavePriceInput {
  packageKey: string;
  /** null = every market. */
  countryCode: string | null;
  /** null = every category. */
  categoryId: string | null;
  amount: number;
  currency: string;
  /** ISO; the door defaults to now() when null. */
  validFrom: string | null;
  /** ISO; null = open-ended. */
  validTo: string | null;
}

export async function savePrice(input: SavePriceInput): Promise<void> {
  const { error } = await rpc("admin_save_package_price", {
    p_package_key: input.packageKey,
    p_amount: input.amount,
    p_currency: input.currency,
    ...(input.countryCode === null ? {} : { p_country_code: input.countryCode }),
    ...(input.categoryId === null ? {} : { p_category_id: input.categoryId }),
    ...(input.validFrom === null ? {} : { p_valid_from: input.validFrom }),
    ...(input.validTo === null ? {} : { p_valid_to: input.validTo }),
  });
  if (error) throw new PackagesDoorError(error.message, error.code);
}

export async function endPrice(id: string, validTo: string | null): Promise<void> {
  const { error } = await rpc("admin_end_package_price", {
    p_id: id,
    ...(validTo === null ? {} : { p_valid_to: validTo }),
  });
  if (error) throw new PackagesDoorError(error.message, error.code);
}

/* ------------------------------- refusals -------------------------------- */

/**
 * Ruling 4 (3) — every message the three doors RAISE, by name, plus the step-up
 * state (SQLSTATE P0009) and the fallback. `packages-service.test.ts` reads the
 * migration and proves no message falls to the fallback (TIR-5's shape).
 */
const DOOR_MESSAGE_KEYS: Readonly<Record<string, MessageKey>> = {
  "permission denied": "admin.packages.error.denied",
  rateLimited: "admin.packages.error.rateLimited",
  "bad key": "admin.packages.error.badKey",
  "unknown tier": "admin.packages.error.unknownTier",
  "bad days": "admin.packages.error.badDays",
  "bad label key": "admin.packages.error.badLabelKey",
  "unknown package": "admin.packages.error.unknownPackage",
  "unknown country": "admin.packages.error.unknownCountry",
  "unknown category": "admin.packages.error.unknownCategory",
  "unknown currency": "admin.packages.error.unknownCurrency",
  "bad amount": "admin.packages.error.badAmount",
  "bad window": "admin.packages.error.badWindow",
  "overlapping window": "admin.packages.error.overlap",
  "price not found": "admin.packages.error.notFound",
  "price already ended": "admin.packages.error.alreadyEnded",
};

export interface PackagesRefusal {
  key: MessageKey;
  /** The door's own words when no key names them (shown as a reason line). */
  raw: string | null;
}

export function packagesErrorKey(message: string, code: string | null = null): PackagesRefusal {
  const raw = (message ?? "").trim();
  if (code === "P0009" || /step-up required/i.test(raw)) {
    return { key: "admin.packages.error.stepUp", raw: null };
  }
  const head = raw.includes(":") ? raw.slice(0, raw.indexOf(":")).trim() : raw;
  // The head comes from the database's message: an own-key read (H1), never map[key].
  const known = ownValue(DOOR_MESSAGE_KEYS, head);
  if (known !== undefined) return { key: known, raw: null };
  return { key: "admin.packages.error.unknown", raw: raw === "" ? null : raw };
}

/* ------------------------------- the shapes ------------------------------- */

/** The door's key shape (`listing_packages_key_check`), so the form refuses before the round trip. */
export const PACKAGE_KEY_PATTERN = /^[a-z][a-z0-9_]{1,31}$/;
/** The door's label-key shape, the plan's (`coverage_plans_label_key_check`). */
export const PACKAGE_LABEL_KEY_PATTERN = /^[a-z][a-z0-9_.]{1,79}$/;

export const PACKAGE_COLUMN_PRIORITIES = {
  key: "primary",
  tier: "primary",
  days: "primary",
  enabled: "primary",
  selfServe: "secondary",
  extends: "secondary",
  sort: "detail",
  updated: "detail",
} as const;

export const PRICE_COLUMN_PRIORITIES = {
  market: "primary",
  category: "primary",
  amount: "primary",
  from: "secondary",
  to: "secondary",
} as const;
