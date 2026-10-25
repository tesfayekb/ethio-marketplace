import { describe, expect, it } from "vitest";

import {
  anchorOf,
  asLocationNode,
  autoExtendPath,
  deriveInitialArea,
  initialCountries,
  pathToNode,
  resolveGuess,
  type GuessFacts,
  type OpenMarket,
  type SavedArea,
  type ShellLocationNode,
  type TreeNode,
} from "./location-data";

/**
 * D234 speed turn S5 — DIA-1…DIA-6. The first place the shell shows, derived
 * by one pure function for the shell and the server's first page: the saved
 * area, else the guess, else the anchor, the auto-select law applied at once.
 * DIA-6 proves the shell's former steps (its effect, then its auto-select walk)
 * land on the same place for every case.
 */
function node(
  id: string,
  parentId: string | null,
  level: string,
  extra: Partial<TreeNode> = {},
): TreeNode {
  return {
    id,
    parentId,
    level,
    slug: id,
    nameEn: id,
    centerLat: null,
    centerLng: null,
    isoCode: null,
    ...extra,
  };
}

const ID = {
  et: "11111111-1111-4111-8111-111111111111",
  oromia: "22222222-2222-4222-8222-222222222222",
  amhara: "33333333-3333-4333-8333-333333333333",
  adama: "44444444-4444-4444-8444-444444444444",
  bahirdar: "55555555-5555-4555-8555-555555555555",
  lone: "66666666-6666-4666-8666-666666666666",
  only: "77777777-7777-4777-8777-777777777777",
  gone: "88888888-8888-4888-8888-888888888888",
};

/** Two regions; Oromia holds Adama; Amhara holds one city, which holds one sub-city (auto-select). */
const TREE: TreeNode[] = [
  node(ID.et, null, "country"),
  node(ID.oromia, ID.et, "region", { isoCode: "ET-OR" }),
  node(ID.amhara, ID.et, "region", { isoCode: "ET-AM" }),
  node(ID.adama, ID.oromia, "city", { slug: "adama", centerLat: 8.54, centerLng: 39.27 }),
  node(ID.bahirdar, ID.amhara, "city", { slug: "bahir-dar" }),
  node(ID.only, ID.bahirdar, "sub_city", { slug: "only" }),
];
const MARKETS: OpenMarket[] = [
  { code: "ET", nameEn: "Ethiopia", anchorSlug: null, anchorId: ID.et, displayOrder: 0 },
];
const NO_GEO: GuessFacts = { country: null, regionCode: null, city: null, lat: null, lng: null };
const saved = (id: string, country = "ET"): SavedArea => ({ country, id, at: null });
const ids = (path: ShellLocationNode[]) => path.map((entry) => entry.id);

describe("deriveInitialArea (D234 S5)", () => {
  it("DIA-1 a saved place the tree holds is the path to it, extended through single-option levels", () => {
    const area = deriveInitialArea({
      initialCountry: "ET",
      savedArea: saved(ID.amhara),
      guessCountry: null,
      geo: NO_GEO,
      tree: TREE,
    });
    expect(area).toMatchObject({ kind: "place", country: "ET", guess: false });
    expect(area.kind === "place" ? ids(area.path) : []).toEqual([
      ID.et,
      ID.amhara,
      ID.bahirdar,
      ID.only,
    ]);
  });

  it("DIA-2 a saved place the tree no longer holds falls to the market's anchor, never the guess", () => {
    const area = deriveInitialArea({
      initialCountry: "ET",
      savedArea: saved(ID.gone),
      guessCountry: null,
      geo: { ...NO_GEO, country: "ET", regionCode: "OR" },
      tree: TREE,
    });
    expect(area).toMatchObject({ kind: "place", country: "ET", guess: false });
    expect(area.kind === "place" ? ids(area.path) : []).toEqual([ID.et]);
  });

  it("DIA-3 the guess resolves by geometry, then the region's code; nothing matching gives the anchor", () => {
    const at = (geo: GuessFacts) =>
      deriveInitialArea({
        initialCountry: "ET",
        savedArea: null,
        guessCountry: "ET",
        geo,
        tree: TREE,
      });
    const near = at({ ...NO_GEO, country: "ET", lat: 8.55, lng: 39.28 });
    expect(near).toMatchObject({ kind: "place", guess: true });
    expect(near.kind === "place" ? ids(near.path) : []).toEqual([ID.et, ID.oromia, ID.adama]);
    const region = at({ ...NO_GEO, country: "ET", regionCode: "AM" });
    expect(region.kind === "place" ? ids(region.path) : []).toEqual([
      ID.et,
      ID.amhara,
      ID.bahirdar,
      ID.only,
    ]);
    const nothing = at({ ...NO_GEO, country: "ET", city: "Nowhere" });
    expect(nothing.kind === "place" ? ids(nothing.path) : []).toEqual([ID.et]);
  });

  it("DIA-4 no market, a failed tree, an empty tree or no anchor: no place", () => {
    const base = { savedArea: null, guessCountry: null, geo: NO_GEO };
    expect(deriveInitialArea({ ...base, initialCountry: null, tree: TREE })).toEqual({
      kind: "none",
    });
    expect(deriveInitialArea({ ...base, initialCountry: "ET", tree: null })).toEqual({
      kind: "none",
    });
    expect(deriveInitialArea({ ...base, initialCountry: "ET", tree: [] })).toEqual({
      kind: "none",
    });
    expect(
      deriveInitialArea({ ...base, initialCountry: "ET", tree: [node(ID.lone, ID.et, "region")] }),
    ).toEqual({ kind: "none" });
  });

  it("DIA-5 the market: the saved one; else the guessed one only when open and not every area", () => {
    const geoCountry = "ET";
    expect(
      initialCountries({
        savedArea: saved(ID.adama, "KE"),
        everywhere: null,
        geoCountry,
        markets: MARKETS,
      }),
    ).toEqual({ initialCountry: "KE", guessCountry: null });
    expect(
      initialCountries({ savedArea: null, everywhere: null, geoCountry, markets: MARKETS }),
    ).toEqual({ initialCountry: "ET", guessCountry: "ET" });
    expect(
      initialCountries({ savedArea: null, everywhere: { at: 1 }, geoCountry, markets: MARKETS }),
    ).toEqual({ initialCountry: null, guessCountry: null });
    expect(
      initialCountries({ savedArea: null, everywhere: null, geoCountry: "SE", markets: MARKETS }),
    ).toEqual({ initialCountry: null, guessCountry: null });
  });

  it("DIA-6 every case lands where the shell's former steps (its effect, then its auto-select walk) landed", () => {
    /** The shell's derivation before S5, step for step, then its auto-select effect. */
    function former(
      initialCountry: string | null,
      savedArea: SavedArea | null,
      guessCountry: string | null,
      geo: GuessFacts,
      tree: TreeNode[] | null,
    ) {
      if (initialCountry === null || tree === null || tree.length === 0) return null;
      const anchor = anchorOf(tree);
      if (anchor === null) return null;
      let path: ShellLocationNode[];
      let guess = false;
      if (savedArea !== null && pathToNode(tree, savedArea.id).length > 0) {
        path = pathToNode(tree, savedArea.id).map(asLocationNode);
      } else if (savedArea === null && guessCountry !== null) {
        const guessed = resolveGuess(tree, geo);
        const found = guessed === null ? [] : pathToNode(tree, guessed.id);
        path = (found.length > 0 ? found : [anchor]).map(asLocationNode);
        guess = true;
      } else {
        path = [asLocationNode(anchor)];
      }
      return { path: ids(autoExtendPath(tree, path)), guess };
    }
    const geos: GuessFacts[] = [
      NO_GEO,
      { ...NO_GEO, country: "ET", lat: 8.55, lng: 39.28 },
      { ...NO_GEO, country: "ET", regionCode: "AM" },
      { ...NO_GEO, country: "ET", city: "Adama" },
    ];
    const saves = [null, ...Object.values(ID).map((id) => saved(id))];
    for (const tree of [TREE, null, [], TREE.slice(1)]) {
      for (const savedArea of saves) {
        for (const guessCountry of [null, "ET"]) {
          for (const geo of geos) {
            const initialCountry = savedArea?.country ?? guessCountry;
            const area = deriveInitialArea({ initialCountry, savedArea, guessCountry, geo, tree });
            const expected = former(initialCountry, savedArea, guessCountry, geo, tree);
            expect(
              area.kind === "place" ? { path: ids(area.path), guess: area.guess } : null,
            ).toEqual(expected);
          }
        }
      }
    }
  });
});
