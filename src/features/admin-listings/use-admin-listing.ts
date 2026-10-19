import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { Refusal } from "@/features/posting/types";

import { ADMIN_LISTINGS_KEY } from "./use-admin-listings";

/**
 * Bundle 11, the Listings console, turn L3 (D134, D138, D139) — one listing for
 * its console page, through the one door `admin_listing_detail` (listings:view;
 * a draft answers "listing not found"). The door decides what this person may
 * read (F3): the seller's e-mail only for profiles:view, a staff member's name in
 * the history only for audit_logs:view, never a number, a pin or an address.
 */

export type HistoryActor = "seller" | "staff" | "system";

export interface AdminListingHistoryEntry {
  at: string;
  kind: string;
  by: HistoryActor;
  byName: string | null;
  fields: string[];
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  reason: string | null;
  note: string | null;
}

export interface AdminListingDetail {
  listing: {
    id: string;
    title: string;
    description: string;
    status: string;
    tier: string;
    severe: boolean;
    categoryId: string | null;
    categoryNameEn: string | null;
    categoryNameAm: string | null;
    locationId: string | null;
    placeNameEn: string | null;
    placeNameAm: string | null;
    countryCode: string | null;
    priceMode: string;
    priceAmount: number | null;
    priceCurrency: string | null;
    pricePeriod: string | null;
    priceBp: number | null;
    priceNegotiable: boolean;
    /** INC-553 — the price's unit (a token, or `other` with the seller's own word). */
    priceUnit: string | null;
    priceUnitText: string | null;
    attributes: Record<string, unknown>;
    photosSoon: boolean;
    photoCount: number;
    createdAt: string;
    publishedFirstAt: string | null;
    publishedAt: string | null;
    expiresAt: string | null;
    posterExpiresAt: string | null;
    renewedCount: number;
    updatedAt: string;
  };
  seller: {
    id: string;
    alias: string | null;
    businessName: string | null;
    email: string | null;
    memberSince: string | null;
    accountStatus: string | null;
  };
  channels: Record<"phone" | "phone2" | "telegram" | "whatsapp", boolean>;
  history: AdminListingHistoryEntry[];
  historyTotal: number;
}

type Raw = Record<string, unknown>;

const text = (value: unknown): string | null =>
  typeof value === "string" && value !== "" ? value : null;
const number = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;
const object = (value: unknown): Raw =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Raw) : {};

function entryOf(raw: Raw): AdminListingHistoryEntry {
  const by = raw["by"];
  return {
    at: String(raw["at"]),
    kind: String(raw["kind"] ?? ""),
    by: by === "seller" || by === "staff" ? by : "system",
    byName: text(raw["by_name"]),
    fields: Array.isArray(raw["fields"]) ? raw["fields"].map(String) : [],
    before: object(raw["before"]),
    after: object(raw["after"]),
    reason: text(raw["reason"]),
    note: text(raw["note"]),
  };
}

/** The door's answer, mapped; an absent listing is the door's own refusal, thrown. */
export function detailOf(data: unknown): AdminListingDetail {
  const root = object(data);
  const l = object(root["listing"]);
  const s = object(root["seller"]);
  const c = object(root["channels"]);
  return {
    listing: {
      id: String(l["id"]),
      title: String(l["title"] ?? ""),
      description: String(l["description"] ?? ""),
      status: String(l["status"] ?? ""),
      tier: String(l["tier"] ?? "regular"),
      severe: l["severe"] === true,
      categoryId: text(l["category_id"]),
      categoryNameEn: text(l["category_name_en"]),
      categoryNameAm: text(l["category_name_am"]),
      locationId: text(l["location_id"]),
      placeNameEn: text(l["place_name_en"]),
      placeNameAm: text(l["place_name_am"]),
      countryCode: text(l["country_code"]),
      priceMode: String(l["price_mode"] ?? "fixed"),
      priceAmount: number(l["price_amount"]),
      priceCurrency: text(l["price_currency"]),
      pricePeriod: text(l["price_period"]),
      priceBp: number(l["price_bp"]),
      priceNegotiable: l["price_negotiable"] === true,
      priceUnit: text(l["price_unit"]),
      priceUnitText: text(l["price_unit_text"]),
      attributes: object(l["attributes"]),
      photosSoon: l["photos_soon"] === true,
      photoCount: number(l["photo_count"]) ?? 0,
      createdAt: String(l["created_at"]),
      publishedFirstAt: text(l["published_first_at"]),
      publishedAt: text(l["published_at"]),
      expiresAt: text(l["expires_at"]),
      posterExpiresAt: text(l["poster_expires_at"]),
      renewedCount: number(l["renewed_count"]) ?? 0,
      updatedAt: String(l["updated_at"]),
    },
    seller: {
      id: String(s["id"]),
      alias: text(s["alias"]),
      businessName: text(s["business_name"]),
      email: text(s["email"]),
      memberSince: text(s["member_since"]),
      accountStatus: text(s["account_status"]),
    },
    channels: {
      phone: c["phone"] === true,
      phone2: c["phone2"] === true,
      telegram: c["telegram"] === true,
      whatsapp: c["whatsapp"] === true,
    },
    history: Array.isArray(root["history"])
      ? (root["history"] as unknown[]).map((entry) => entryOf(object(entry)))
      : [],
    historyTotal: number(root["history_total"]) ?? 0,
  };
}

export async function readAdminListing(listingId: string): Promise<AdminListingDetail> {
  const { data, error } = await supabase.rpc("admin_listing_detail", { p_listing_id: listingId });
  // F4 — a refusal is an error the page names, never an empty listing.
  if (error) throw new Error(error.message);
  return detailOf(data);
}

/**
 * Turn L4a (D140) — an admin's edit through the one door `admin_edit_listing`
 * (listings:enforce with a fresh second factor; the seller's content rules for
 * what an admin can change — DEC-173). The door answers a refusal list as an
 * answer (F4: shown under its field), and raises everything else, which is
 * thrown as it came so the step-up guard can read it.
 */
export type AdminEditAnswer =
  | { ok: true; status: string; fields: string[] }
  | { ok: false; refusals: Refusal[] };

/**
 * The door's refusals as the form reads them. A specification's refusal names
 * its `attr_key` (the attribute authority's own word), which is exactly the key
 * its control is drawn under — the seller's routes read it the same way
 * (posting-service.ts `refusalsOf`), so it lands under its control (turn L4b).
 */
export function refusalsOf(value: unknown): Refusal[] {
  if (!Array.isArray(value)) return [];
  return value.map((entry) => {
    const row = object(entry);
    const field = text(row["field"]) ?? text(row["attr_key"]) ?? "door";
    const detail = text(row["detail"]);
    return {
      field,
      reason: String(row["reason"] ?? ""),
      ...(detail !== null ? { detail } : {}),
    };
  });
}

export function editAnswerOf(data: unknown): AdminEditAnswer {
  const root = object(data);
  if (root["ok"] === true) {
    return {
      ok: true,
      status: String(root["status"] ?? ""),
      fields: Array.isArray(root["fields"]) ? root["fields"].map(String) : [],
    };
  }
  return { ok: false, refusals: refusalsOf(root["refusals"]) };
}

export async function editAdminListing(
  listingId: string,
  changes: Record<string, unknown>,
  reason: string,
  note: string,
): Promise<AdminEditAnswer> {
  const { data, error } = await supabase.rpc("admin_edit_listing", {
    p_listing_id: listingId,
    p_changes: changes as Json,
    p_reason: reason,
    ...(note.trim() === "" ? {} : { p_note: note.trim() }),
  });
  if (error) throw error;
  return editAnswerOf(data);
}

/**
 * Turn L4d (D141) — undo an admin's edit through the one door
 * `admin_undo_listing_edit` (listings:enforce with a fresh second factor): the
 * History line's own moment names the edit. The answer is the edit door's
 * (done, or a refusal list); every other error is thrown as it came, so the
 * step-up guard can read it.
 */
export async function undoAdminListingEdit(
  listingId: string,
  at: string,
  note: string,
): Promise<AdminEditAnswer> {
  const { data, error } = await supabase.rpc("admin_undo_listing_edit", {
    p_listing_id: listingId,
    p_at: at,
    ...(note.trim() === "" ? {} : { p_note: note.trim() }),
  });
  if (error) throw error;
  return editAnswerOf(data);
}

export function useAdminListing(listingId: string) {
  return useQuery({
    queryKey: [...ADMIN_LISTINGS_KEY, "detail", listingId],
    queryFn: () => readAdminListing(listingId),
    retry: false,
  });
}

/** Bundle 22 turn 4 — one certification of an ad (admin_listing_certifications; listings:view). */
export interface AdminListingCertification {
  id: string;
  action: "publish" | "edit" | "renew";
  certifiedAt: string;
  language: string;
  countries: string[];
  versions: {
    versionId: string;
    kind: string;
    countryCode: string | null;
    version: number;
    label: string;
  }[];
}

export function certificationsOf(value: unknown): AdminListingCertification[] {
  if (!Array.isArray(value)) throw new Error("admin_listing_certifications: invalid answer");
  return value.map((entry) => {
    const row = object(entry);
    const action = text(row["action"]);
    if (action !== "publish" && action !== "edit" && action !== "renew")
      throw new Error("admin_listing_certifications: invalid action");
    const versions = Array.isArray(row["versions"]) ? row["versions"] : [];
    return {
      id: String(row["id"] ?? ""),
      action,
      certifiedAt: String(row["certified_at"] ?? ""),
      language: String(row["language"] ?? ""),
      countries: Array.isArray(row["countries"])
        ? row["countries"].map((c) => String(c).trim())
        : [],
      versions: versions.map((raw) => {
        const v = object(raw);
        return {
          versionId: String(v["version_id"] ?? ""),
          kind: String(v["kind"] ?? ""),
          countryCode: text(v["country_code"]),
          version: number(v["version"]) ?? 0,
          label: String(v["label"] ?? ""),
        };
      }),
    };
  });
}

export async function readAdminListingCertifications(
  listingId: string,
): Promise<AdminListingCertification[]> {
  const { data, error } = await supabase.rpc("admin_listing_certifications", {
    p_listing_id: listingId,
  });
  // F4 — a refusal is an error the page names, never an empty record.
  if (error) throw new Error(error.message);
  return certificationsOf(data);
}

export function useAdminListingCertifications(listingId: string) {
  return useQuery({
    queryKey: [...ADMIN_LISTINGS_KEY, "certifications", listingId],
    queryFn: () => readAdminListingCertifications(listingId),
    retry: false,
  });
}
