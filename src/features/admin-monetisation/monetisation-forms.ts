import type { MessageKey } from "@/i18n";

import {
  PLACEMENTS,
  PRODUCT_KEY_PATTERN,
  PRODUCT_NAME_MAX,
  type MarketRow,
  type OverrideRow,
  type ProductKind,
  type ProductRow,
  type SaveMarketInput,
  type SaveOverrideInput,
  type SaveProductInput,
} from "./monetisation-service";

/**
 * P-1b — the monetisation forms' judges: the doors' own rules mirrored so a
 * surface refuses before the round trip (the door remains the authority, F3),
 * every number read through the typed parse (ruling 1 answer 10: a blank or
 * non-numeric field is a refusal, never 0). The price and the caps judges live
 * beside them in price-forms.ts and caps-forms.ts.
 */

/** The placement words, one per stored value (a null placement is a blank cell). */
export const PLACEMENT_LABEL: Readonly<Record<(typeof PLACEMENTS)[number], MessageKey>> = {
  standard: "admin.monetisation.placement.standard",
  boost: "admin.monetisation.placement.boost",
  top: "admin.monetisation.placement.top",
};

/**
 * A typed number parse: a whole number, or null when the field is blank or not
 * a number. Never a sentinel 0.
 */
export function wholeNumber(raw: string): number | null {
  const text = raw.trim();
  if (!/^-?\d+$/.test(text)) return null;
  return Number(text);
}

function isPlacement(value: string): value is (typeof PLACEMENTS)[number] {
  return (PLACEMENTS as readonly string[]).includes(value);
}

/* ------------------------------- the product ------------------------------ */

export interface ProductFormValues {
  key: string;
  nameEn: string;
  nameAm: string;
  days: string;
  /** A level's perks; ignored for a reach product. */
  maxPhotos: string;
  placement: string;
  badge: boolean;
  enabled: boolean;
  selfServe: boolean;
  extendsLifetime: boolean;
  /** Digits only (the field filters its input); blank keeps the stored order. */
  sort: string;
}

export const NEW_PRODUCT_FORM: ProductFormValues = {
  key: "",
  nameEn: "",
  nameAm: "",
  days: "",
  maxPhotos: "",
  placement: "standard",
  badge: false,
  enabled: true,
  selfServe: true,
  extendsLifetime: true,
  sort: "",
};

/** The form as a stored row shows it (the editor's opening values). */
export function productFormOf(row: ProductRow): ProductFormValues {
  return {
    key: row.key,
    nameEn: row.nameEn,
    nameAm: row.nameAm ?? "",
    days: String(row.days),
    maxPhotos: row.maxPhotos === null ? "" : String(row.maxPhotos),
    placement: row.placement ?? "standard",
    badge: row.badge,
    enabled: row.enabled,
    selfServe: row.selfServe,
    extendsLifetime: row.extendsLifetime,
    sort: String(row.sort),
  };
}

export type ProductFormOutcome =
  | { ok: true; input: SaveProductInput }
  | { ok: false; key: MessageKey };

export function productFormInput(kind: ProductKind, values: ProductFormValues): ProductFormOutcome {
  const key = values.key.trim();
  if (!PRODUCT_KEY_PATTERN.test(key)) return { ok: false, key: "admin.packages.error.badKey" };
  const nameEn = values.nameEn.trim();
  const nameAm = values.nameAm.trim();
  if (nameEn === "" || nameEn.length > PRODUCT_NAME_MAX || nameAm.length > PRODUCT_NAME_MAX) {
    return { ok: false, key: "admin.monetisation.error.badName" };
  }
  const days = wholeNumber(values.days);
  if (days === null || days < 1) return { ok: false, key: "admin.packages.error.badDays" };
  let maxPhotos: number | null = null;
  let placement: string | null = null;
  let badge: boolean | null = null;
  if (kind === "level") {
    maxPhotos = wholeNumber(values.maxPhotos);
    if (maxPhotos === null || maxPhotos < 0 || maxPhotos > 30) {
      return { ok: false, key: "admin.monetisation.error.badPhotos" };
    }
    if (!isPlacement(values.placement)) {
      return { ok: false, key: "admin.monetisation.error.unknownPlacement" };
    }
    placement = values.placement;
    badge = values.badge;
  }
  // The field admits digits only, so a non-blank sort is always a whole number.
  const sort = values.sort.trim() === "" ? null : wholeNumber(values.sort);
  return {
    ok: true,
    input: {
      key,
      kind,
      nameEn,
      // A blank Amharic name is sent as a blank so the door clears a stored one (INC-188).
      nameAm,
      days,
      enabled: values.enabled,
      selfServe: values.selfServe,
      extendsLifetime: values.extendsLifetime,
      maxPhotos,
      placement,
      badge,
      sort,
    },
  };
}

/* ------------------------------ the override ------------------------------ */

export interface OverrideFormValues {
  levelKey: string;
  /** "" = every category. */
  categoryId: string;
  /** "" = every country. */
  countryCode: string;
  /** Each "" = the level's own value. */
  days: string;
  maxPhotos: string;
  placement: string;
  badge: "" | "yes" | "no";
}

export const NEW_OVERRIDE_FORM: OverrideFormValues = {
  levelKey: "",
  categoryId: "",
  countryCode: "",
  days: "",
  maxPhotos: "",
  placement: "",
  badge: "",
};

export function overrideFormOf(row: OverrideRow): OverrideFormValues {
  return {
    levelKey: row.levelKey,
    categoryId: row.categoryId ?? "",
    countryCode: row.countryCode ?? "",
    days: row.days === null ? "" : String(row.days),
    maxPhotos: row.maxPhotos === null ? "" : String(row.maxPhotos),
    placement: row.placement ?? "",
    badge: row.badge === null ? "" : row.badge ? "yes" : "no",
  };
}

export type OverrideFormOutcome =
  | { ok: true; input: SaveOverrideInput }
  | { ok: false; key: MessageKey };

export function overrideFormInput(values: OverrideFormValues): OverrideFormOutcome {
  if (values.levelKey === "") return { ok: false, key: "admin.monetisation.error.unknownLevel" };
  let days: number | null = null;
  if (values.days.trim() !== "") {
    days = wholeNumber(values.days);
    if (days === null || days < 1) return { ok: false, key: "admin.packages.error.badDays" };
  }
  let maxPhotos: number | null = null;
  if (values.maxPhotos.trim() !== "") {
    maxPhotos = wholeNumber(values.maxPhotos);
    if (maxPhotos === null || maxPhotos < 0 || maxPhotos > 30) {
      return { ok: false, key: "admin.monetisation.error.badPhotos" };
    }
  }
  let placement: string | null = null;
  if (values.placement !== "") {
    if (!isPlacement(values.placement)) {
      return { ok: false, key: "admin.monetisation.error.unknownPlacement" };
    }
    placement = values.placement;
  }
  const badge = values.badge === "" ? null : values.badge === "yes";
  if (days === null && maxPhotos === null && placement === null && badge === null) {
    return { ok: false, key: "admin.monetisation.error.emptyOverride" };
  }
  return {
    ok: true,
    input: {
      levelKey: values.levelKey,
      categoryId: values.categoryId === "" ? null : values.categoryId,
      countryCode: values.countryCode === "" ? null : values.countryCode,
      days,
      maxPhotos,
      placement,
      badge,
    },
  };
}

/* ------------------------------- the market ------------------------------- */

export interface MarketFormValues {
  /** "" = the default row ("any other country"). */
  countryCode: string;
  freeRegularAds: string;
  includedReach: string;
  paidLevels: boolean;
  launchCredits: string;
  launchDays: string;
}

export const NEW_MARKET_FORM: MarketFormValues = {
  countryCode: "",
  freeRegularAds: "",
  includedReach: "",
  paidLevels: false,
  launchCredits: "",
  launchDays: "",
};

export function marketFormOf(row: MarketRow): MarketFormValues {
  return {
    countryCode: row.countryCode ?? "",
    freeRegularAds: String(row.freeRegularAds),
    includedReach: row.includedReach,
    paidLevels: row.paidLevels,
    launchCredits: row.launchCredits === null ? "" : String(row.launchCredits),
    launchDays: row.launchDays === null ? "" : String(row.launchDays),
  };
}

export type MarketFormOutcome =
  | { ok: true; input: SaveMarketInput }
  | { ok: false; key: MessageKey };

export function marketFormInput(values: MarketFormValues): MarketFormOutcome {
  const freeRegularAds = wholeNumber(values.freeRegularAds);
  if (freeRegularAds === null || freeRegularAds < 0) {
    return { ok: false, key: "admin.monetisation.error.badFreeAds" };
  }
  if (values.includedReach === "")
    return { ok: false, key: "admin.monetisation.error.unknownReach" };
  const bundle = (raw: string): number | null | false => {
    if (raw.trim() === "") return null;
    const parsed = wholeNumber(raw);
    return parsed === null || parsed < 1 ? false : parsed;
  };
  const launchCredits = bundle(values.launchCredits);
  const launchDays = bundle(values.launchDays);
  if (launchCredits === false || launchDays === false) {
    return { ok: false, key: "admin.monetisation.error.badLaunch" };
  }
  if (values.paidLevels && (launchCredits === null || launchDays === null)) {
    return { ok: false, key: "admin.monetisation.error.launchRequired" };
  }
  return {
    ok: true,
    input: {
      countryCode: values.countryCode === "" ? null : values.countryCode,
      freeRegularAds,
      includedReach: values.includedReach,
      paidLevels: values.paidLevels,
      launchCredits,
      launchDays,
    },
  };
}
