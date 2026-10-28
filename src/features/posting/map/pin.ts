/**
 * INC-958 (Foundations turn C1) — A PIN IS WHOLE OR ABSENT, AND ITS PRECISION IS KNOWN.
 *
 * A listing's map pin is three columns — `pin_lat`, `pin_lng`, `pin_precision` — that the door
 * (`set_listing_pin`) writes together and the table's check (listings_pin_precision_check,
 * 20260919054044 :59–:61) keeps together: no pin, or a pin whose precision is 'exact' or
 * 'approx'. The app read them as three loose fields, and five readers filled a missing
 * precision with "exact" — the LESS private side (the ad page's still map, large map and Maps
 * link; the draft's and the edit's prefill), while the maps themselves drew anything but
 * "approx" as an exact point. One type now carries the three together (`Pin`), its precision
 * is the closed union the table allows (`PinPrecision`), and every read of the columns goes
 * through `readPin`: all three present and valid, or `null` (typed absence — no map, no link).
 * A value the table should never hold is logged as a `[client-error]` (F4), never guessed.
 * scripts/conformance/pin.test.ts refuses the loose fields and any guessed precision.
 */

/** The precisions the table allows, in the order a seller is offered them. */
export const PIN_PRECISIONS = ["exact", "approx"] as const;
export type PinPrecision = (typeof PIN_PRECISIONS)[number];

/** A saved pin: its point and how precisely buyers may see it. */
export interface Pin {
  lat: number;
  lng: number;
  precision: PinPrecision;
}

/**
 * The precision a NEW pin starts at in the pin map, before the seller chooses (the pin map shows
 * the choice beside the map; unchanged from the pin map's first version, U6-C1-R3b-4). Never a
 * default for a SAVED pin: a saved pin's precision is read, or the pin is absent.
 */
export const NEW_PIN_PRECISION: PinPrecision = "exact";

export function isPinPrecision(value: unknown): value is PinPrecision {
  return value === "exact" || value === "approx";
}

/** A finite coordinate, from a number or a numeric string (PostgREST sends numerics as either). */
function coordinate(value: unknown): number | null {
  const number =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return value !== null && value !== "" && Number.isFinite(number) ? number : null;
}

/**
 * The pin a row's three columns hold: all three present and valid → the pin; all three absent →
 * `null`; anything else (a half-written pin, a precision the table does not allow) → `null`, and
 * one `[client-error]` line naming `where`, because the table's check should have made it impossible.
 */
export function readPin(lat: unknown, lng: unknown, precision: unknown, where: string): Pin | null {
  const latitude = coordinate(lat);
  const longitude = coordinate(lng);
  if (latitude !== null && longitude !== null && isPinPrecision(precision))
    return { lat: latitude, lng: longitude, precision };
  const absent = (value: unknown) => value === null || value === undefined;
  if (!(absent(lat) && absent(lng) && absent(precision)))
    console.error(
      `[client-error] ${where}: a pin without a known precision or point is not drawn (lat ${String(latitude !== null)}, lng ${String(longitude !== null)}, precision ${isPinPrecision(precision) ? "known" : "unknown"})`,
    );
  return null;
}
