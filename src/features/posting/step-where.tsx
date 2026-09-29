import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  anchorOf,
  readAreaCookie,
  resolveGuess,
  useCountryTree,
  useOpenMarkets,
  type GuessFacts,
  type TreeNode,
} from "@/components/shell/location-data";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";

import { clearPin, savePin } from "./posting-service";
import { RequiredMark } from "./field";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { PinValue } from "./map/map-pin-dropper";
import type { Refusal } from "./types";

/**
 * U6-C1-R3b-4 — THE MAP IS A LAZY CHUNK. Leaflet, its stylesheet and the dropper
 * are fetched by the tap that opens the section, so the marketplace's first paint
 * never carries a mapping library (the weight and budget guards prove it), and a
 * seller who never asks for a pin never downloads one.
 */
const MapPinDropper = lazy(() =>
  import("./map/map-pin-dropper").then((mod) => ({ default: mod.MapPinDropper })),
);

/**
 * U6-C2a — STEP 6: WHERE IT IS, AND WHERE IT SHOWS (DEC-064 as amended, D19).
 *
 * THE EDITOR READS THE SHELL'S OWN GEOGRAPHY SEAM — `useOpenMarkets` and
 * `useCountryTree` (B1/B2: the cached public routes, one reader, no second copy
 * and no browser read of `public.locations`). Names resolve through
 * `entityName('location', …)` exactly as the picker's do (D3).
 *
 * THE PREFILL, and NEVER persisted (law 10):
 *   0 the draft's OWN saved places (after Back) — the seller's answer outranks
 *     any guess;
 *   1 the SAVED AREA cookie — a place the seller actually picked;
 *   2 the EDGE's guess (`/api/geo`, DEC-068), resolved by `resolveGuess`.
 * A prefilled city counts as chosen (W6 R3, as corrected 2026-09-29).
 *
 * W6 R1/R2 (INC-337) — EVERY PLACE IS A CITY. The item's location, and every
 * other place it shows in, is a city or a sub-city; a market or a region alone
 * is only the way to reach one. Until the item's city is chosen its heading
 * carries the required mark and its box the soft red border (D71).
 *
 * W6 R4 — THE NESTED LAYOUT. A country box holds region boxes; a region box
 * holds its city rows. "Add a city" sits inside a region box, "Add a region"
 * inside a country box, "Add a country" below them. A box with no city keeps the
 * soft border; removing a region's last city removes its box.
 *
 * W6 R5 / INC-338 — THE PLAN DECIDES. The limits come from the schema's own plan
 * block (`maxCities`, `maxRegions`, `maxCountries`); an add button shows only
 * while its level has room, and nothing shows when the plan is not known. The
 * door (`coverageExceedsPlan:<level>`) stays the authority (F3).
 *
 * D19 — A CITY WITH SUB-CITIES OFFERS "All of <city>" BESIDE THEM: whole-city
 * coverage is the CITY node itself.
 *
 * U6-C1-R3b-4 — THE MAP PIN, OPTIONAL, saved by its OWN door (`set_listing_pin`).
 */

const LEVEL_KEYS: Record<string, MessageKey> = {
  region: "post.where.level.region",
  city: "post.where.level.city",
  sub_city: "post.where.level.sub_city",
};

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const addClass =
  "inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm " +
  "font-medium text-foreground hover:bg-muted";

/** One city row: where it sits (country → region) and the place it names. */
interface Row {
  key: string;
  country: string | null;
  region: string | null;
  city: string | null;
  subCity: string | null;
}

const PRIMARY = "primary";

/** The place a row names — a city or a sub-city, never a region (R2). */
function placeOf(row: Row): string | null {
  return row.subCity ?? row.city;
}

/** The soft/destructive border every box wears (the D71 three states). */
function boxClass(empty: boolean, refused: boolean): string {
  const border = refused
    ? "border-destructive ring-1 ring-destructive"
    : empty
      ? "border-destructive/40"
      : "border-input";
  return `space-y-3 rounded-md border p-3 ${border}`;
}

async function readGuess(): Promise<GuessFacts> {
  try {
    const response = await fetch("/api/geo", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(String(response.status));
    const payload = (await response.json()) as Record<string, unknown>;
    const num = (key: string) =>
      typeof payload[key] === "number" && Number.isFinite(payload[key])
        ? Number(payload[key])
        : null;
    return {
      country: typeof payload["country"] === "string" ? payload["country"] : null,
      regionCode: typeof payload["regionCode"] === "string" ? payload["regionCode"] : null,
      city: typeof payload["city"] === "string" ? payload["city"] : null,
      lat: num("lat"),
      lng: num("lng"),
    };
  } catch {
    // A guess that cannot be read is simply no guess: the seller picks.
    return { country: null, regionCode: null, city: null, lat: null, lng: null };
  }
}

/** The chain from the anchor down to a node, as region / city / sub-city ids. */
function chainOf(nodes: TreeNode[], target: TreeNode) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const chain: TreeNode[] = [];
  let cursor: TreeNode | null = target;
  let hops = 0;
  while (cursor !== null && hops < 6) {
    chain.unshift(cursor);
    cursor = cursor.parentId === null ? null : (byId.get(cursor.parentId) ?? null);
    hops += 1;
  }
  const at = (level: string) => chain.find((node) => node.level === level)?.id ?? null;
  return { region: at("region"), city: at("city"), subCity: at("sub_city") };
}

/** The cascade's option lists over one market's tree. */
function childrenOf(nodes: TreeNode[], parentId: string | null, level: string): TreeNode[] {
  return nodes.filter(
    (node) => node.level === level && (parentId === null || node.parentId === parentId),
  );
}

let rowSeq = 0;
function newKey(): string {
  rowSeq += 1;
  return `row-${rowSeq}`;
}

interface Room {
  city: boolean;
  region: boolean;
}

/**
 * ONE COUNTRY BOX: its region boxes, their city rows, and "Add a region".
 * The item's own box receives its market control through `market`.
 */
function CountryBox({
  primary,
  code,
  nodes,
  rows,
  room,
  refused,
  market,
  onRegion,
  onRow,
  onRemove,
  onAddCity,
  onAddRegion,
}: {
  primary: boolean;
  code: string | null;
  nodes: TreeNode[];
  rows: Row[];
  room: Room;
  refused: boolean;
  market: ReactNode;
  onRegion: (keys: string[], region: string | null) => void;
  onRow: (key: string, patch: Partial<Row>) => void;
  onRemove: (key: string) => void;
  onAddCity: (country: string | null, region: string | null) => void;
  onAddRegion: (country: string | null) => void;
}) {
  const { t, entities } = useI18n();
  const nameOf = (node: TreeNode) =>
    entityName(
      "location",
      { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
      entities,
    );
  const regions = childrenOf(nodes, anchorOf(nodes)?.id ?? null, "region");

  /** Region boxes in order of first appearance; a region not yet chosen is its own box. */
  const groups: { key: string; region: string | null; rows: Row[] }[] = [];
  for (const row of rows) {
    const key = row.region ?? `pending:${row.key}`;
    const found = groups.find((group) => group.key === key);
    if (found === undefined) groups.push({ key, region: row.region, rows: [row] });
    else found.rows.push(row);
  }
  const empty = !rows.some((row) => placeOf(row) !== null);

  return (
    <div
      data-testid="post-where-country-box"
      data-primary={primary ? "1" : "0"}
      data-country={code ?? ""}
      data-empty={empty ? "1" : "0"}
      className={boxClass(empty, primary && refused)}
    >
      {market}
      {nodes.length > 0 &&
        groups.map((group) => {
          const hasPrimary = group.rows.some((row) => row.key === PRIMARY);
          const cities = childrenOf(nodes, group.region, "city");
          const groupEmpty = !group.rows.some((row) => placeOf(row) !== null);
          return (
            <div
              key={group.key}
              data-testid="post-where-region-box"
              data-region={group.region ?? ""}
              data-empty={groupEmpty ? "1" : "0"}
              className={boxClass(groupEmpty, false)}
            >
              <div className="space-y-1">
                <label
                  htmlFor={hasPrimary ? "post-where-region" : `post-where-region-${group.key}`}
                  className="text-sm font-medium text-foreground"
                >
                  {t(LEVEL_KEYS["region"] ?? "post.where.level.region")}
                </label>
                <select
                  id={hasPrimary ? "post-where-region" : `post-where-region-${group.key}`}
                  data-testid={hasPrimary ? "post-where-region" : "post-where-row-region"}
                  className={fieldClass}
                  value={group.region ?? ""}
                  onChange={(event) =>
                    onRegion(
                      group.rows.map((row) => row.key),
                      event.target.value || null,
                    )
                  }
                >
                  <option value="">{t("post.where.levelNone")}</option>
                  {regions.map((node) => (
                    <option key={node.id} value={node.id}>
                      {nameOf(node)}
                    </option>
                  ))}
                </select>
                {regions.length === 0 && (
                  <p className="text-xs text-muted-foreground" data-testid="post-where-region-empty">
                    {t("post.where.noRegions")}
                  </p>
                )}
              </div>

              {group.rows.map((row) => {
                const isPrimary = row.key === PRIMARY;
                const subCities = childrenOf(nodes, row.city, "sub_city");
                const cityNode = nodes.find((node) => node.id === row.city) ?? null;
                const cityId = isPrimary ? "post-where-city" : `post-where-city-${row.key}`;
                return (
                  <div
                    key={row.key}
                    data-testid="post-where-row"
                    data-key={row.key}
                    className="space-y-2"
                  >
                    {cities.length > 0 && (
                      <div className="space-y-1">
                        <label htmlFor={cityId} className="text-sm font-medium text-foreground">
                          {t(isPrimary ? "post.where.itemLocation" : "post.where.alsoShownIn")}
                        </label>
                        <select
                          id={cityId}
                          data-testid={isPrimary ? "post-where-city" : "post-where-row-city"}
                          aria-label={t(LEVEL_KEYS["city"] ?? "post.where.level.city")}
                          className={fieldClass}
                          value={row.city ?? ""}
                          onChange={(event) =>
                            onRow(row.key, { city: event.target.value || null, subCity: null })
                          }
                        >
                          <option value="">{t("post.where.levelNone")}</option>
                          {cities.map((node) => (
                            <option key={node.id} value={node.id}>
                              {nameOf(node)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {/* D19 — "All of <city>" is the CITY node offered beside its children. */}
                    {cityNode !== null && subCities.length > 0 && (
                      <div className="space-y-1">
                        <label
                          htmlFor={isPrimary ? "post-where-subcity" : `post-where-subcity-${row.key}`}
                          className="text-sm font-medium text-foreground"
                        >
                          {t(LEVEL_KEYS["sub_city"] ?? "post.where.level.sub_city")}
                        </label>
                        <select
                          id={isPrimary ? "post-where-subcity" : `post-where-subcity-${row.key}`}
                          data-testid={isPrimary ? "post-where-subcity" : "post-where-row-subcity"}
                          className={fieldClass}
                          value={row.subCity ?? ""}
                          onChange={(event) =>
                            onRow(row.key, { subCity: event.target.value || null })
                          }
                        >
                          <option value="" data-testid="post-where-allof">
                            {fill(t("post.where.allOf"), { name: nameOf(cityNode) })}
                          </option>
                          {subCities.map((node) => (
                            <option key={node.id} value={node.id}>
                              {nameOf(node)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {!isPrimary && (
                      <button
                        type="button"
                        data-testid="post-where-remove"
                        data-id={placeOf(row) ?? ""}
                        className="min-h-11 rounded-md border border-input px-3 text-xs font-medium text-foreground"
                        onClick={() => onRemove(row.key)}
                      >
                        {t("post.where.removePlace")}
                      </button>
                    )}
                  </div>
                );
              })}

              {room.city && (group.region !== null || regions.length === 0) && (
                <button
                  type="button"
                  data-testid="post-where-add-city"
                  data-region={group.region ?? ""}
                  className={addClass}
                  onClick={() => onAddCity(code, group.region)}
                >
                  {t("post.where.addCity")}
                </button>
              )}
            </div>
          );
        })}
      {room.region && code !== null && nodes.length > 0 && regions.length > 0 && (
        <button
          type="button"
          data-testid="post-where-add-region"
          data-country={code}
          className={addClass}
          onClick={() => onAddRegion(code)}
        >
          {t("post.where.addRegion")}
        </button>
      )}
    </div>
  );
}

/** A further country's box: its own market control and its own cached tree. */
function OtherCountryBox({
  code,
  rows,
  taken,
  onCountry,
  ...rest
}: {
  code: string | null;
  rows: Row[];
  taken: string[];
  onCountry: (keys: string[], code: string | null) => void;
} & Omit<Parameters<typeof CountryBox>[0], "primary" | "code" | "nodes" | "rows" | "market">) {
  const { t, entities } = useI18n();
  const markets = useOpenMarkets();
  const tree = useCountryTree(code);
  const nodes = useMemo(
    () => (tree.loadedCountry === code ? tree.nodes : []),
    [tree.loadedCountry, tree.nodes, code],
  );
  const id = `post-where-market-${rows[0]?.key ?? "x"}`;
  const market = (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {t("post.where.marketLabel")}
      </label>
      <select
        id={id}
        data-testid="post-where-row-market"
        className={fieldClass}
        value={code ?? ""}
        onChange={(event) =>
          onCountry(
            rows.map((row) => row.key),
            event.target.value || null,
          )
        }
      >
        <option value="">{t("post.where.marketChoose")}</option>
        {markets.markets
          .filter((entry) => entry.code === code || !taken.includes(entry.code))
          .map((entry) => (
            <option key={entry.code} value={entry.code}>
              {entry.anchorId === null
                ? entry.nameEn
                : entityName(
                    "location",
                    { id: entry.anchorId, nameEn: entry.nameEn, nameAm: null },
                    entities,
                  )}
            </option>
          ))}
      </select>
    </div>
  );
  return <CountryBox primary={false} code={code} nodes={nodes} rows={rows} market={market} {...rest} />;
}

export function StepWhere({
  coverage,
  refusals,
  onChange,
  listingId = null,
  pin = null,
  onPinSaved,
  maxCities = null,
  maxRegions = null,
  maxCountries = null,
}: {
  /** The chosen place ids; the FIRST one is the item's own place (spec §4 C2). */
  coverage: string[];
  refusals: Refusal[];
  onChange: (coverage: string[], immediate: boolean) => void;
  /** The draft the pin belongs to; with none there is nothing to pin yet. */
  listingId?: string | null;
  /** The saved pin, so reopening the section shows the seller's own answer. */
  pin?: PinValue | null;
  /** What the door wrote, so the wizard and the buyer preview read one source. */
  onPinSaved?: (pin: PinValue | null) => void;
  /** INC-338 — the plan's own limits, from the posting schema; null = unknown. */
  maxCities?: number | null;
  maxRegions?: number | null;
  maxCountries?: number | null;
}) {
  const { t, entities } = useI18n();
  const markets = useOpenMarkets();
  const [pinOpen, setPinOpen] = useState(false);

  /**
   * U6-C1-R3a / INC-237 — the saved area's market is known synchronously; until
   * the chain resolves nothing is chosen, and the first open market is never a
   * silent fallback.
   */
  const [country, setCountry] = useState<string | null>(() => readAreaCookie()?.country ?? null);
  const [rows, setRows] = useState<Row[]>([
    { key: PRIMARY, country: null, region: null, city: null, subCity: null },
  ]);
  const [prefilled, setPrefilled] = useState(false);
  const [marketUnresolved, setMarketUnresolved] = useState(false);
  const [guess, setGuess] = useState<GuessFacts | null>(null);
  /** The seller has acted on this step; before that, nothing on screen overwrites a saved answer. */
  const touched = useRef(false);

  const tree = useCountryTree(country);
  /** INC-211 — rows are read ONLY when they belong to the market on screen (I3: memoised). */
  const nodes = useMemo(
    () => (tree.loadedCountry === country ? tree.nodes : []),
    [tree.loadedCountry, tree.nodes, country],
  );

  /** The guess is read ONCE per visit; it never writes the saved-area cookie. */
  useEffect(() => {
    let cancelled = false;
    void readGuess().then((found) => {
      if (!cancelled) setGuess(found);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** THE MARKET PREFILL (INC-237): the saved area's country, else the edge's — nothing else. */
  const marketSeeded = useRef(false);
  useEffect(() => {
    if (marketSeeded.current || markets.markets.length === 0 || guess === null) return;
    const saved = readAreaCookie();
    const wanted = saved?.country ?? guess.country?.toUpperCase() ?? null;
    const found =
      wanted === null ? undefined : markets.markets.find((market) => market.code === wanted);
    marketSeeded.current = true;
    if (found === undefined) {
      setMarketUnresolved(true);
      if (country !== null) {
        setCountry(null);
        setRows([{ key: PRIMARY, country: null, region: null, city: null, subCity: null }]);
        setPrefilled(false);
      }
      return;
    }
    setMarketUnresolved(false);
    if (found.code !== country) setCountry(found.code);
  }, [markets.markets, guess, country]);

  /**
   * THE PLACE PREFILL, over the market's cached tree: the draft's own saved
   * places first (so Back shows the seller's answer, R1), else the saved node,
   * else the resolved guess.
   */
  const placeSeeded = useRef<string | null>(null);
  useEffect(() => {
    if (country === null || nodes.length === 0 || placeSeeded.current === country) return;
    placeSeeded.current = country;
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const own = coverage.length > 0 ? (byId.get(coverage[0]!) ?? null) : null;
    if (own !== null) {
      const extras = coverage
        .slice(1)
        .map((id) => byId.get(id) ?? null)
        .filter((node): node is TreeNode => node !== null)
        .map((node) => ({ key: newKey(), country, ...chainOf(nodes, node) }));
      setRows([{ key: PRIMARY, country, ...chainOf(nodes, own) }, ...extras]);
      return;
    }
    const saved = readAreaCookie();
    const savedNode =
      saved !== null && saved.country === country ? (byId.get(saved.id) ?? null) : null;
    const target =
      savedNode ??
      (guess === null
        ? null
        : resolveGuess(nodes, { ...guess, country: guess.country ?? country }));
    if (target === null) return;
    const chain = chainOf(nodes, target);
    setRows((current) => [{ key: PRIMARY, country, ...chain }, ...current.slice(1)]);
    if (chain.region !== null || chain.city !== null) setPrefilled(true);
    // `coverage` is read once, at seeding, on purpose: later edits are the seller's.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, nodes, guess]);

  /** The places the rows name, in order; the first is the item's own place. */
  const desired = useMemo(() => {
    const out: string[] = [];
    for (const row of rows) {
      const id = placeOf(row);
      if (id !== null && !out.includes(id)) out.push(id);
    }
    return out;
  }, [rows]);

  /**
   * U6-C1-R2 / D19 — THE ITEM'S PLACE IS ALSO WHERE IT SHOWS: the list is what
   * the rows name, written by itself. Before the seller acts, a saved answer the
   * screen could not place is never overwritten.
   */
  useEffect(() => {
    const settled = placeSeeded.current === country && country !== null;
    if (!touched.current && !settled) return;
    if (!touched.current && coverage.some((id) => !desired.includes(id))) {
      const known = new Set(nodes.map((node) => node.id));
      if (coverage.some((id) => !known.has(id))) return;
    }
    if (desired.length === coverage.length && desired.every((id, i) => coverage[i] === id)) return;
    // NOT an immediate save: the cascade settles through several levels; the
    // autosave sends the settled answer once, and Next saves it under the door.
    onChange(desired, false);
  }, [desired, coverage, country, nodes, onChange]);

  const act = () => {
    touched.current = true;
  };
  const patchRows = useCallback((keys: string[], patch: Partial<Row>) => {
    touched.current = true;
    setRows((current) => current.map((row) => (keys.includes(row.key) ? { ...row, ...patch } : row)));
  }, []);

  const primaryRow = rows[0]!;
  const hasCity = placeOf(primaryRow) !== null;

  // ---- R5: room at each level, counted over the rows (a pending box counts) ----
  const countryKeyOf = (row: Row) =>
    row.key === PRIMARY ? (country ?? "pending:primary") : (row.country ?? `pending:${row.key}`);
  const regionsUsed = new Set(
    rows.map((row) => `${countryKeyOf(row)}/${row.region ?? `pending:${row.key}`}`),
  ).size;
  const countriesUsed = new Set(rows.map(countryKeyOf)).size;
  const cityRoom = maxCities !== null && rows.length < maxCities;
  const regionRoom = cityRoom && maxRegions !== null && regionsUsed < maxRegions;
  const countryRoom = regionRoom && maxCountries !== null && countriesUsed < maxCountries;
  const room: Room = { city: cityRoom, region: regionRoom };

  const onRegion = (keys: string[], region: string | null) => {
    if (keys.includes(PRIMARY)) setPrefilled(false);
    patchRows(keys, { region, city: null, subCity: null });
  };
  const onRow = (key: string, patch: Partial<Row>) => {
    if (key === PRIMARY) setPrefilled(false);
    patchRows([key], patch);
  };
  const onRemove = (key: string) => {
    act();
    setRows((current) => current.filter((row) => row.key !== key || row.key === PRIMARY));
  };
  const onAddCity = (code: string | null, region: string | null) => {
    act();
    setRows((current) => [
      ...current,
      { key: newKey(), country: code, region, city: null, subCity: null },
    ]);
  };
  const onAddRegion = (code: string | null) => {
    act();
    setRows((current) => [
      ...current,
      { key: newKey(), country: code, region: null, city: null, subCity: null },
    ]);
  };
  const onAddCountry = () => {
    act();
    setRows((current) => [
      ...current,
      { key: newKey(), country: null, region: null, city: null, subCity: null },
    ]);
  };
  const onCountry = (keys: string[], code: string | null) =>
    patchRows(keys, { country: code, region: null, city: null, subCity: null });

  // ---- the boxes: the item's country first, then every further country ----
  const primaryRows = rows.filter(
    (row) => row.key === PRIMARY || (row.country !== null && row.country === country),
  );
  const otherGroups: { key: string; code: string | null; rows: Row[] }[] = [];
  for (const row of rows) {
    if (primaryRows.includes(row)) continue;
    const key = row.country ?? `pending:${row.key}`;
    const found = otherGroups.find((group) => group.key === key);
    if (found === undefined) otherGroups.push({ key, code: row.country, rows: [row] });
    else found.rows.push(row);
  }
  const takenCountries = [country, ...otherGroups.map((group) => group.code)].filter(
    (code): code is string => code !== null,
  );

  const nameOf = (node: TreeNode) =>
    entityName(
      "location",
      { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
      entities,
    );
  const chosen = desired
    .map((id) => nodes.find((node) => node.id === id) ?? null)
    .filter((node): node is TreeNode => node !== null);
  const regionsNamed = new Set(
    rows.filter((row) => placeOf(row) !== null).map((row) => `${countryKeyOf(row)}/${row.region}`),
  ).size;
  const levelCounts = {
    city: rows.filter((row) => row.city !== null && row.subCity === null).length,
    sub_city: rows.filter((row) => row.subCity !== null).length,
  };

  const coverageRefusal = refusalFor(refusals, "coverage");
  const chooseCity =
    coverageRefusal !== null &&
    (coverageRefusal.reason === "required" || coverageRefusal.reason === "cityRequired");

  /** WHERE THE MAP OPENS: the seller's own place's centre, else the market's, else nothing. */
  const pinCentre = useMemo(() => {
    const first = chosen.find((node) => node.centerLat !== null && node.centerLng !== null);
    if (first !== undefined) return { lat: first.centerLat, lng: first.centerLng };
    const market = nodes.find(
      (node) => node.level === "country" && node.centerLat !== null && node.centerLng !== null,
    );
    return { lat: market?.centerLat ?? null, lng: market?.centerLng ?? null };
  }, [chosen, nodes]);

  const primaryMarket = (
    <div className="space-y-1">
      <label htmlFor="post-where-market" className="text-sm font-medium text-foreground">
        {t("post.where.marketLabel")}
      </label>
      {markets.isLoading ? (
        <p className="text-sm text-muted-foreground">{t("post.where.marketLoading")}</p>
      ) : markets.failed ? (
        <p className="text-sm text-destructive" data-testid="post-where-market-error">
          {t("post.where.marketFailed")}
        </p>
      ) : (
        <select
          id="post-where-market"
          data-testid="post-where-market"
          className={fieldClass}
          value={country ?? ""}
          onChange={(event) => {
            const code = event.target.value || null;
            act();
            // A new market invalidates the item's cascade and every place chosen
            // in the old market; other countries' boxes keep their answers.
            const old = country;
            setCountry(code);
            setPrefilled(false);
            placeSeeded.current = code;
            setRows((current) => [
              { key: PRIMARY, country: code, region: null, city: null, subCity: null },
              ...current.slice(1).filter((row) => row.country === null || row.country !== old),
            ]);
          }}
        >
          {/* INC-237 — the empty choice exists whenever nothing is chosen. */}
          {country === null && <option value="">{t("post.where.marketChoose")}</option>}
          {markets.markets
            .filter(
              (market) =>
                market.code === country ||
                !otherGroups.some((group) => group.code === market.code),
            )
            .map((market) => (
              <option key={market.code} value={market.code}>
                {market.anchorId === null
                  ? market.nameEn
                  : entityName(
                      "location",
                      { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
                      entities,
                    )}
              </option>
            ))}
        </select>
      )}
      {marketUnresolved && country === null && (
        <p className="text-xs text-muted-foreground" data-testid="post-where-market-unresolved">
          {t("post.where.marketUnresolved")}
        </p>
      )}
      {tree.isLoading && (
        <p className="text-sm text-muted-foreground">{t("post.where.treeLoading")}</p>
      )}
      {tree.failed && (
        <p className="text-sm text-destructive" data-testid="post-where-tree-error">
          {t("post.where.treeFailed")}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-5" data-testid="post-where">
      <p className="text-sm text-muted-foreground">{t("post.where.why")}</p>

      {/* R1 — the place, heading included, is the refusal's scroll target (D70/D2). */}
      <div
        id="post-coverage"
        tabIndex={-1}
        data-testid="post-where-place"
        className="scroll-mt-20 space-y-3 focus-visible:outline-none"
      >
        <p
          className="flex items-center gap-1 text-sm font-medium text-foreground"
          data-testid="post-where-heading"
        >
          <span>{t("post.where.defaultPlaceLabel")}</span>
          {!hasCity && <RequiredMark />}
        </p>

        <CountryBox
          primary
          code={country}
          nodes={nodes}
          rows={primaryRows}
          room={room}
          refused={coverageRefusal !== null}
          market={primaryMarket}
          onRegion={onRegion}
          onRow={onRow}
          onRemove={onRemove}
          onAddCity={onAddCity}
          onAddRegion={onAddRegion}
        />

        {otherGroups.map((group) => (
          <OtherCountryBox
            key={group.key}
            code={group.code}
            rows={group.rows}
            taken={takenCountries}
            room={room}
            refused={false}
            onCountry={onCountry}
            onRegion={onRegion}
            onRow={onRow}
            onRemove={onRemove}
            onAddCity={onAddCity}
            onAddRegion={onAddRegion}
          />
        ))}

        {countryRoom && (
          <button
            type="button"
            data-testid="post-where-add-country"
            className={addClass}
            onClick={onAddCountry}
          >
            {t("post.where.addCountry")}
          </button>
        )}

        {coverageRefusal !== null && (
          <p
            className="text-sm text-destructive"
            data-testid="post-where-refusal"
            data-choose-city={chooseCity ? "1" : "0"}
            role="alert"
          >
            {chooseCity
              ? t("post.refusal.cityRequired")
              : t(draftRefusalKey(coverageRefusal.reason))}
          </p>
        )}
      </div>

      {prefilled && (
        <p className="text-xs text-muted-foreground" data-testid="post-where-prefilled">
          {t("post.where.prefilled")}
        </p>
      )}

      {/* --------------------------- the chosen places ------------------------ */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{t("post.where.chosenLabel")}</p>
        {maxCities !== null && (
          <>
            <p className="text-xs text-muted-foreground" data-testid="post-where-plan">
              {fill(t("post.where.planCaption"), { cities: maxCities })}
            </p>
            <p
              className="text-xs text-muted-foreground"
              data-testid="post-where-plan-count"
              data-used={desired.length}
              data-max={maxCities}
            >
              {fill(t("post.where.planCount"), { used: desired.length, max: maxCities })}
            </p>
          </>
        )}
        <p className="text-xs text-muted-foreground" data-testid="post-where-plan-levels">
          {fill(t("post.where.planLevels"), {
            regions: regionsNamed,
            cities: levelCounts.city,
            subCities: levelCounts.sub_city,
          })}
        </p>
        <ul className="space-y-1" data-testid="post-where-chosen" data-count={desired.length}>
          {chosen.map((node) => (
            <li key={node.id} className="text-sm">
              <span data-testid="post-where-chosen-row" data-id={node.id}>
                {nameOf(node)}
              </span>
            </li>
          ))}
        </ul>

        {/* ------------------------------ the map pin --------------------------- */}
        {listingId === null ? (
          <p className="text-xs text-muted-foreground" data-testid="post-where-pin-later">
            {t("post.where.pinLater")}
          </p>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              className="min-h-11 rounded-md border border-input px-3 py-2 text-sm text-foreground"
              aria-expanded={pinOpen}
              onClick={() => setPinOpen(!pinOpen)}
              data-testid="post-where-pin-open"
            >
              {t(pinOpen ? "post.pin.close" : "post.pin.open")}
            </button>
            {pinOpen && (
              <Suspense
                fallback={
                  <p className="text-xs text-muted-foreground">{t("post.pin.searching")}</p>
                }
              >
                <MapPinDropper
                  saved={pin}
                  centreLat={pinCentre.lat}
                  centreLng={pinCentre.lng}
                  onSave={async (value) => {
                    const ok = await savePin(
                      listingId,
                      value.lat,
                      value.lng,
                      value.precision,
                      value.street,
                    );
                    if (ok) onPinSaved?.(value);
                    return ok;
                  }}
                  onRemove={async () => {
                    const ok = await clearPin(listingId);
                    if (ok) onPinSaved?.(null);
                    return ok;
                  }}
                />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StepWhere;
