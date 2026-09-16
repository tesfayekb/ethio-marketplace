/**
 * LOCATIONS ERA L4b-2 — THE ONE CLIENT-SIDE DISTANCE UTILITY (B2).
 *
 * The twin of the SQL `geo_distance_km`: a haversine great-circle distance on
 * the SAME mean earth radius, so a comparison made in the browser and one made
 * in the database can not disagree. Pure, no dependency, no state.
 */

/** The IUGG mean earth radius, in kilometres — the SQL twin's own constant. */
const EARTH_RADIUS_KM = 6371.0088;

const RAD = Math.PI / 180;

/** Great-circle distance in kilometres between two decimal-degree points. */
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = (lat2 - lat1) * RAD;
  const dLng = (lng2 - lng1) * RAD;
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}
