/**
 * W6b-2 C4 — IS A POINT INSIDE A PLACE'S OUTLINE? A plain even-odd ray cast over
 * a GeoJSON Polygon or MultiPolygon (holes honoured by the even-odd rule). Pure,
 * so the soft "outside the place" notice is unit-testable without a map.
 */

type Ring = [number, number][];

function inRing(ring: Ring, lat: number, lng: number): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i] ?? [0, 0];
    const [xj, yj] = ring[j] ?? [0, 0];
    const crosses = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function inPolygon(rings: Ring[], lat: number, lng: number): boolean {
  let inside = false;
  for (const ring of rings) if (inRing(ring, lat, lng)) inside = !inside;
  return inside;
}

export function insideOutline(outline: unknown, lat: number, lng: number): boolean {
  const geo = (outline ?? {}) as { type?: unknown; coordinates?: unknown };
  if (geo.type === "Polygon" && Array.isArray(geo.coordinates)) {
    return inPolygon(geo.coordinates as Ring[], lat, lng);
  }
  if (geo.type === "MultiPolygon" && Array.isArray(geo.coordinates)) {
    return (geo.coordinates as Ring[][]).some((rings) => inPolygon(rings, lat, lng));
  }
  // An unreadable outline never claims the pin is outside.
  return true;
}
