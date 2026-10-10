import { supabase } from "@/integrations/supabase/client";

import { parseAccountPlace, type AccountPlace } from "./place-carry";

/**
 * D106 — the account place's two doors (the data seam; place-carry.ts holds
 * the pure rules). `user_set_viewing_location` is the only writer;
 * `my_viewing_location` is the owner's read.
 */

type Rec = Record<string, unknown>;

function isRec(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export type ReadResult =
  | { place: AccountPlace | null; reason: null }
  | { place: null; reason: string };

/** The owner's read. A failure names its reason (F4); it is never "no place". */
export async function readAccountPlace(): Promise<ReadResult> {
  const { data, error } = await supabase.rpc("my_viewing_location");
  if (error) return { place: null, reason: error.message };
  const place = parseAccountPlace(data);
  if (place === undefined) return { place: null, reason: "malformed answer" };
  return { place, reason: null };
}

export type SaveResult =
  | { ok: true; id: string | null; country: string | null; at: number | null }
  | { ok: false; reason: string };

/** The only writer. NULL clears the account's place. */
export async function saveAccountPlace(id: string | null): Promise<SaveResult> {
  // The generated argument type is not nullable; the door takes NULL to clear
  // (the cast the language door's caller uses, auth-service.ts).
  const { data, error } = await supabase.rpc("user_set_viewing_location", {
    p_location: id as string,
  });
  if (error) return { ok: false, reason: error.message };
  if (!isRec(data)) return { ok: false, reason: "malformed answer" };
  if (data["ok"] !== true) {
    return { ok: false, reason: typeof data["reason"] === "string" ? data["reason"] : "refused" };
  }
  const at = typeof data["at"] === "string" ? Date.parse(data["at"]) : null;
  return {
    ok: true,
    id: typeof data["id"] === "string" ? data["id"] : null,
    country: typeof data["country"] === "string" ? data["country"].toUpperCase() : null,
    at: at === null || Number.isNaN(at) ? null : at,
  };
}
