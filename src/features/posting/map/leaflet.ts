import type * as Leaflet from "leaflet";

/**
 * U6-C1-R3b-4 — LOADING LEAFLET, ONCE, IN THE BROWSER ONLY (A7 first-of-kind).
 *
 * THE CENSUS (the installed package, not its documentation): leaflet@1.9.4 ships
 * `main: dist/leaflet-src.js` and NO `module` entry, so the specifier resolves to
 * the UMD bundle — which touches `window` at evaluation time. A static import
 * from any SSR-rendered module therefore breaks the server render, and every
 * import here is DYNAMIC and guarded by a browser check. The UMD interop puts the
 * `L` object on `default`, with the named exports (`map`, `tileLayer`, `marker`,
 * `circle`, `divIcon`, `latLng`, …) beside it, so both spellings are honoured.
 *
 * THE CSS COMES FROM THE PACKAGE (`leaflet/dist/leaflet.css`), never a CDN: a map
 * on expensive mobile data must not wait on a third-party stylesheet, and the
 * bundler puts it in THIS lazily loaded chunk — off the first paint entirely.
 *
 * THE MARKER IS A `divIcon`, not Leaflet's default image pair: the default icon
 * resolves two PNGs by relative URL at runtime, which a bundled app serves from
 * the wrong path. A styled div needs no asset and inherits the design tokens.
 */

export type LeafletModule = typeof Leaflet;

let loaded: Promise<LeafletModule> | null = null;

export function loadLeaflet(): Promise<LeafletModule> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("leaflet is browser-only"));
  }
  loaded ??= (async () => {
    await import("leaflet/dist/leaflet.css");
    const mod = (await import("leaflet")) as unknown as {
      default?: LeafletModule;
    } & LeafletModule;
    return mod.default ?? mod;
  })();
  return loaded;
}

/** The two tile layers, with the attribution each provider requires kept intact. */
export const TILES = {
  street: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
    maxZoom: 19,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
    maxZoom: 19,
  },
} as const;

export type TileKind = keyof typeof TILES;

/** The pin itself: a token-coloured teardrop that needs no image asset. */
export function pinIcon(L: LeafletModule): Leaflet.DivIcon {
  return L.divIcon({
    className: "",
    html:
      '<span style="display:block;width:22px;height:22px;border-radius:9999px;' +
      "border:3px solid hsl(var(--background));background:hsl(var(--primary));" +
      'box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}
