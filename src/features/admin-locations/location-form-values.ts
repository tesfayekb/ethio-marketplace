import type { FormGate } from "@/components/forms/use-form-gate";
import { parseNumber, type ParsedNumber } from "@/lib/parse-input";
import type { Refusal } from "@/lib/refusal";

import type { LocationFormValues } from "./location-form-fields";

export function emptyLocationForm(): LocationFormValues {
  return {
    nameEn: "",
    slug: "",
    iso: "",
    aliases: [],
    displayOrder: "0",
    centerLng: "",
    centerLat: "",
  };
}

/** Both coordinates are required at city and sub-city level. */
export function coordinatesRequired(level: string): boolean {
  return level === "city" || level === "sub_city";
}

/** Each answer's refusal (the gate's mark or the parser's), by the door's field name. */
export type LocationFormRefusals = Partial<Record<keyof LocationFormValues, Refusal>>;

const answered = (parsed: ParsedNumber) => (parsed.kind === "number" ? parsed.value : null);

/**
 * DEC-339 — the form's typed numbers, read by the one parser (src/lib/parse-input.ts): a
 * coordinate is a number within its range or blank (null; the gate has already stopped a blank
 * one the level requires), the order a whole number. An unreadable answer is a `badType`
 * refusal under its own field, never a guessed value.
 */
export function readLocationNumbers(
  values: LocationFormValues,
):
  | { ok: true; centerLat: number | null; centerLng: number | null; displayOrder: number }
  | { ok: false; refusals: LocationFormRefusals } {
  const lat = parseNumber(values.centerLat, { min: -90, max: 90 });
  const lng = parseNumber(values.centerLng, { min: -180, max: 180 });
  const order = parseNumber(values.displayOrder, { integer: true });
  const refusals: LocationFormRefusals = {};
  if (lat.kind === "invalid") refusals.centerLat = { field: "centerLat", reason: "badType" };
  if (lng.kind === "invalid") refusals.centerLng = { field: "centerLng", reason: "badType" };
  if (order.kind !== "number") {
    refusals.displayOrder = { field: "displayOrder", reason: "badType" };
  }
  if (order.kind !== "number" || Object.keys(refusals).length > 0) return { ok: false, refusals };
  return {
    ok: true,
    centerLat: answered(lat),
    centerLng: answered(lng),
    displayOrder: order.value,
  };
}

/** The gate's marks and the parser's refusals, one per field (the parser's wins once tried). */
export function locationRefusals(
  gate: FormGate,
  parsed: LocationFormRefusals,
): LocationFormRefusals {
  const marked: LocationFormRefusals = {};
  for (const mark of gate.marks) {
    if (mark.field in EMPTY_VALUES) marked[mark.field as keyof LocationFormValues] = mark;
  }
  return { ...marked, ...parsed };
}

const EMPTY_VALUES: Record<keyof LocationFormValues, true> = {
  nameEn: true,
  slug: true,
  iso: true,
  aliases: true,
  displayOrder: true,
  centerLat: true,
  centerLng: true,
};
