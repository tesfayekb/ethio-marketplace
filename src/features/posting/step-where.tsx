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

import {
  clearPin,
  readLastListingPlaces,
  readPlaceText,
  savePlaceText,
  savePin,
  type LastPlaces,
} from "./posting-service";
import { RequiredMark } from "./field";
import { looksLikeContact } from "./contact-like";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { PinPlace, PinValue } from "./map/map-pin-dropper";
import { DETAILS_MAX, sanitizeDetails } from "./map/location-details";
import type { Refusal } from "./types";

/**
 * U6-C1-R3b-4 — THE MAP IS A LAZY CHUNK. Leaflet, its stylesheet and the dropper
 * are fetched by the tap that opens the section, so the marketplace's first paint
 * never carries a mapping library (the weight and budget guards prove it), and a
 * seller who never asks for a pin never downloads one.
 */
const MapPreview = lazy(() => import("./map/map-preview"));
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
 *   1 (W6b-1 R4, a NEW post only) the seller's most recent OTHER listing's
 *     places, its item place ticked (`readLastListingPlaces`, seller-filtered);
 *   2 the SAVED AREA cookie — a place the seller actually picked;
 *   3 the EDGE's guess (`/api/geo`, DEC-068), resolved by `resolveGuess`.
 * A prefilled city counts as chosen (W6 R3, as corrected 2026-09-29).
 *
 * W6 R1/R2 (INC-337) — EVERY PLACE IS A CITY. The item's location, and every
 * other place it shows in, is a city or a sub-city; a market or a region alone
 * is only the way to reach one. Until the item's city is chosen its heading
 * carries the required mark and its box the soft red border (D71).
 *
 * W6b-1 R1–R3 — THIS STEP IS WHERE THE AD IS SHOWN. Every city box carries one
 * tick of ONE radio group, "Item or service is here"; the ticked box's place
 * (its sub-city when chosen, else its city) is sent FIRST, because the door's
 * item place is `p_coverage[1]`. A city box appears only once its region is
 * chosen. Remove shows on every city box while the step holds more than one;
 * removing the ticked one moves the tick to the first remaining box and says so
 * through a polite live region.
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

/**
 * The soft/destructive border every box wears (the D71 three states).
 * W6b-2 B4 — PER BOX: a country box is red until its country is chosen, a region
 * box until its region is, a city box until its city is; each clears the moment
 * it is filled. The heading's required mark still waits for a city (W6 R1).
 */
function boxClass(empty: boolean, refused: boolean, step = ""): string {
  const border = refused
    ? "border-destructive ring-1 ring-destructive"
    : empty
      ? "border-destructive"
      : "border-input";
  if (step === "") return `space-y-3 rounded-md border px-1.5 py-2 sm:p-3 ${border}`;
  // PW-99 ruling (2026-09-30) — below 768 px a nested level is a LEFT RULE only:
  // no side borders, no side padding beyond the rule's gap, so every select
  // keeps ≥ 200 px and the page never scrolls sideways. From 768 px it is a box.
  // Bundle 2 P3 — the rule's gap matches the country box's own padding, so every
  // level steps in by the same amount at 360 too.
  return (
    `space-y-3 rounded-none border-0 border-s-2 py-1 ps-1.5 md:rounded-md md:border md:p-3 ` +
    `${step} ${border}`
  );
}

/**
 * Bundle 2 P3 — the indent steps evenly: a region box sits one step inside its
 * country box and a city box one step inside its region box, the same step each.
 */
const NEST_STEP = "ms-1 md:ms-6";
const REGION_STEP = NEST_STEP;
const CITY_STEP = NEST_STEP;

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
  itemKey,
  canRemove,
  onTick,
  onRegion,
  onRow,
  onCity,
  onRemove,
  onAddCity,
  onAddSubCity,
  onAddRegion,
}: {
  primary: boolean;
  code: string | null;
  nodes: TreeNode[];
  rows: Row[];
  room: Room;
  refused: boolean;
  market: ReactNode;
  /** W6b-1 R3 — the key of the ticked city box (one radio group across boxes). */
  itemKey: string;
  /** W6b-1 R3 — Remove shows on every city box while the step holds more than one. */
  canRemove: boolean;
  onTick: (key: string) => void;
  onRegion: (keys: string[], region: string | null) => void;
  onRow: (key: string, patch: Partial<Row>) => void;
  /** W1 — a city box's city changes for its whole group; its extra sub-city rows go. */
  onCity: (keys: string[], city: string | null) => void;
  onRemove: (key: string) => void;
  onAddCity: (country: string | null, region: string | null) => void;
  /** Bundle 2 P5 — another sub-city under the same city (counts as that one city). */
  onAddSubCity: (from: Row) => void;
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
  // W2 — a picker never offers what another box at its level already holds.
  const takenRegions = groups.map((group) => group.region).filter((id) => id !== null);
  const pendingRegions = groups.filter((group) => group.region === null).length;
  const regionsLeft =
    regions.filter((node) => !takenRegions.includes(node.id)).length > pendingRegions;
  const empty = !rows.some((row) => placeOf(row) !== null);
  const addRegionButton = room.region && code !== null && nodes.length > 0 && regionsLeft && (
    <button
      type="button"
      data-testid="post-where-add-region"
      data-country={code}
      className={addClass}
      onClick={() => onAddRegion(code)}
    >
      {t("post.where.addRegion")}
    </button>
  );

  const tickLine = (row: Row, onRemoveRow: (() => void) | null) => (
    <div
      className="flex flex-wrap items-center justify-between gap-2"
      data-testid="post-where-item-line"
      data-key={row.key}
    >
      {/* W6b-1 R3 — the one tick, a radio group across every box. */}
      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <input
          type="radio"
          name="post-where-item"
          data-testid="post-where-item-tick"
          data-key={row.key}
          className="h-5 w-5 shrink-0 accent-primary"
          checked={row.key === itemKey}
          onChange={() => onTick(row.key)}
        />
        <span>{t("post.where.itemHere")}</span>
      </label>
      {onRemoveRow !== null && (
        <button
          type="button"
          data-testid="post-where-remove"
          data-id={placeOf(row) ?? ""}
          className="ms-auto min-h-11 rounded-md border border-input px-3 text-xs font-medium text-foreground"
          onClick={onRemoveRow}
        >
          {t("post.where.removePlace")}
        </button>
      )}
    </div>
  );

  return (
    <div
      data-testid="post-where-country-box"
      data-primary={primary ? "1" : "0"}
      data-country={code ?? ""}
      data-empty={empty ? "1" : "0"}
      data-red={code === null ? "1" : "0"}
      className={boxClass(code === null, primary && refused)}
    >
      {market}
      {nodes.length > 0 &&
        groups.map((group) => {
          const hasPrimary = group.rows.some((row) => row.key === PRIMARY);
          const cities = childrenOf(nodes, group.region, "city");
          const groupEmpty = !group.rows.some((row) => placeOf(row) !== null);
          const regionOptions = regions.filter(
            (node) => node.id === group.region || !takenRegions.includes(node.id),
          );
          // W1 — one city box per city: rows sharing a city are drawn together.
          const cityGroups: { key: string; city: string | null; rows: Row[] }[] = [];
          for (const row of group.rows) {
            const key = row.city ?? `pending:${row.key}`;
            const found = cityGroups.find((entry) => entry.key === key);
            if (found === undefined) cityGroups.push({ key, city: row.city, rows: [row] });
            else found.rows.push(row);
          }
          const takenCities = cityGroups.map((entry) => entry.city).filter((id) => id !== null);
          const pendingCities = cityGroups.filter((entry) => entry.city === null).length;
          const citiesLeft =
            cities.filter((node) => !takenCities.includes(node.id)).length > pendingCities;
          return (
            <div
              key={group.key}
              data-testid="post-where-region-box"
              data-region={group.region ?? ""}
              data-empty={groupEmpty ? "1" : "0"}
              data-red={group.region === null ? "1" : "0"}
              className={boxClass(group.region === null, false, REGION_STEP)}
            >
              <div className="space-y-1">
                <label
                  htmlFor={hasPrimary ? "post-where-region" : `post-where-region-${group.key}`}
                  className="text-sm font-medium text-foreground"
                >
                  {t(LEVEL_KEYS["region"] ?? "post.where.level.region")}
                  {group.region === null && <RequiredMark />}
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
                  {regionOptions.map((node) => (
                    <option key={node.id} value={node.id}>
                      {nameOf(node)}
                    </option>
                  ))}
                </select>
                {regions.length === 0 && (
                  <p
                    className="text-xs text-muted-foreground"
                    data-testid="post-where-region-empty"
                  >
                    {t("post.where.noRegions")}
                  </p>
                )}
              </div>

              {/* W6b-1 R2 — a pending region box can be taken back out whole. */}
              {group.region === null && regions.length > 0 && canRemove && !hasPrimary && (
                <button
                  type="button"
                  data-testid="post-where-remove"
                  data-id=""
                  className="min-h-11 rounded-md border border-input px-3 text-xs font-medium text-foreground"
                  onClick={() => group.rows.forEach((row) => onRemove(row.key))}
                >
                  {t("post.where.removePlace")}
                </button>
              )}

              {/* W6b-1 R2 — a city box appears only after its region is chosen. */}
              {(group.region !== null || regions.length === 0) &&
                cityGroups.map((cityGroup) => {
                  const head = cityGroup.rows[0]!;
                  const keys = cityGroup.rows.map((row) => row.key);
                  const isPrimary = keys.includes(PRIMARY);
                  const subCities = childrenOf(nodes, cityGroup.city, "sub_city");
                  const cityNode = nodes.find((node) => node.id === cityGroup.city) ?? null;
                  const cityId = isPrimary ? "post-where-city" : `post-where-city-${head.key}`;
                  const cityOptions = cities.filter(
                    (node) => node.id === cityGroup.city || !takenCities.includes(node.id),
                  );
                  // W1 — sub-city boxes once a sub-city is chosen; "All of" stays on the city box.
                  const subMode =
                    cityNode !== null &&
                    subCities.length > 0 &&
                    (cityGroup.rows.length > 1 || head.subCity !== null);
                  const subLeft = subCities.some(
                    (node) => !cityGroup.rows.some((row) => row.subCity === node.id),
                  );
                  return (
                    <div
                      key={cityGroup.key}
                      data-testid="post-where-row"
                      data-key={head.key}
                      data-item={keys.includes(itemKey) ? "1" : "0"}
                      data-red={placeOf(head) === null ? "1" : "0"}
                      className={boxClass(placeOf(head) === null, false, CITY_STEP)}
                    >
                      {/* Bundle 2 P3 — the city line holds the city alone. */}
                      <div className="space-y-2">
                        {cities.length > 0 && (
                          <div className="space-y-1">
                            <label htmlFor={cityId} className="text-sm font-medium text-foreground">
                              {t(LEVEL_KEYS["city"] ?? "post.where.level.city")}
                              {placeOf(head) === null && <RequiredMark />}
                            </label>
                            <select
                              id={cityId}
                              data-testid={isPrimary ? "post-where-city" : "post-where-row-city"}
                              className={fieldClass}
                              value={cityGroup.city ?? ""}
                              onChange={(event) => onCity(keys, event.target.value || null)}
                            >
                              <option value="">{t("post.where.levelNone")}</option>
                              {cityOptions.map((node) => (
                                <option key={node.id} value={node.id}>
                                  {nameOf(node)}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                      {/* D19 — "All of <city>" is the CITY node offered beside its children.
                          At 360 the step is a left rule only, so its select keeps 200 px. */}
                      {cityNode !== null && subCities.length > 0 && !subMode && (
                        <div
                          className="space-y-1 border-s-2 border-border ps-0.5 sm:ms-4 sm:border-s-0 sm:ps-0"
                          data-testid="post-where-subcity-box"
                          data-key={head.key}
                        >
                          <label
                            htmlFor={
                              isPrimary ? "post-where-subcity" : `post-where-subcity-${head.key}`
                            }
                            className="text-sm font-medium text-foreground"
                          >
                            {t(LEVEL_KEYS["sub_city"] ?? "post.where.level.sub_city")}
                          </label>
                          <select
                            id={isPrimary ? "post-where-subcity" : `post-where-subcity-${head.key}`}
                            data-testid={
                              isPrimary ? "post-where-subcity" : "post-where-row-subcity"
                            }
                            className={fieldClass}
                            value=""
                            onChange={(event) =>
                              onRow(head.key, { subCity: event.target.value || null })
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
                      {subMode &&
                        cityNode !== null &&
                        cityGroup.rows.map((row) => {
                          const rowPrimary = row.key === PRIMARY;
                          const single = cityGroup.rows.length === 1;
                          const subId = rowPrimary
                            ? "post-where-subcity"
                            : `post-where-subcity-${row.key}`;
                          const options = subCities.filter(
                            (node) =>
                              node.id === row.subCity ||
                              !cityGroup.rows.some(
                                (other) => other.key !== row.key && other.subCity === node.id,
                              ),
                          );
                          return (
                            <div
                              key={row.key}
                              className="space-y-1 rounded-md border border-border p-2 sm:ms-4"
                              data-testid="post-where-subcity-box"
                              data-key={row.key}
                              data-item={row.key === itemKey ? "1" : "0"}
                            >
                              <label
                                htmlFor={subId}
                                className="text-sm font-medium text-foreground"
                              >
                                {t(LEVEL_KEYS["sub_city"] ?? "post.where.level.sub_city")}
                              </label>
                              <select
                                id={subId}
                                data-testid={
                                  rowPrimary ? "post-where-subcity" : "post-where-row-subcity"
                                }
                                className={fieldClass}
                                value={row.subCity ?? ""}
                                onChange={(event) =>
                                  onRow(row.key, { subCity: event.target.value || null })
                                }
                              >
                                {single ? (
                                  <option value="" data-testid="post-where-allof">
                                    {fill(t("post.where.allOf"), { name: nameOf(cityNode) })}
                                  </option>
                                ) : (
                                  <option value="">{t("post.where.levelNone")}</option>
                                )}
                                {options.map((node) => (
                                  <option key={node.id} value={node.id}>
                                    {nameOf(node)}
                                  </option>
                                ))}
                              </select>
                              {tickLine(
                                row,
                                single
                                  ? () => onRow(row.key, { subCity: null })
                                  : () => onRemove(row.key),
                              )}
                            </div>
                          );
                        })}
                      {subMode &&
                        subLeft &&
                        cityGroup.rows.every((row) => row.subCity !== null) && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              data-testid="post-where-add-subcity"
                              data-city={cityGroup.city ?? ""}
                              className={addClass}
                              onClick={() => onAddSubCity(head)}
                            >
                              {t("post.where.addSubCity")}
                            </button>
                          </div>
                        )}
                      {/* Bundle 2 P3 — the marker on its own lower line, Remove at its end. */}
                      {!subMode && tickLine(head, canRemove ? () => onRemove(head.key) : null)}
                    </div>
                  );
                })}

              {/* J — "+ Add city" at the right end, under the last city line. */}
              {room.city && (group.region !== null || regions.length === 0) && citiesLeft && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    data-testid="post-where-add-city"
                    data-region={group.region ?? ""}
                    className={addClass}
                    onClick={() => onAddCity(code, group.region)}
                  >
                    {t("post.where.addCity")}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      {/* Bundle 2 P2 — "+ Add region" inside the country box, below its region boxes. */}
      {addRegionButton}
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
        {code === null && <RequiredMark />}
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
  return (
    <CountryBox primary={false} code={code} nodes={nodes} rows={rows} market={market} {...rest} />
  );
}

export function StepWhere({
  coverage,
  refusals,
  onChange,
  listingId = null,
  pin = null,
  onPinSaved,
  ownPlace = null,
  pinCarried = false,
  onPinCarried,
  onDirectionsSaved,
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
  /**
   * Bundle 2 Q4 — whether the leaf holds `own_place` (null while unknown: no
   * carry until it is known), and whether the pin on the draft was carried.
   */
  ownPlace?: boolean | null;
  pinCarried?: boolean;
  onPinCarried?: (carried: boolean) => void;
  /** Step 10 — the directions line the door holds, for the buyer preview. */
  onDirectionsSaved?: (directions: string | null) => void;
  /** INC-338 — the plan's own limits, from the posting schema; null = unknown. */
  maxCities?: number | null;
  maxRegions?: number | null;
  maxCountries?: number | null;
}) {
  const { t, entities } = useI18n();
  const markets = useOpenMarkets();
  const [pinOpen, setPinOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  /**
   * W6b-2 B3 — THE LOCATION DETAILS: one value, `listings.street_address`, for
   * every category, pin or no pin. Read once from the draft's own row; saved on
   * blur through the pin's own door (`set_listing_pin`), which keeps the pin
   * columns as they are. The door caps it at 200 and is the authority (F3).
   */
  const [note, setNote] = useState<string>(pin?.street ?? "");
  const [noteState, setNoteState] = useState<
    "idle" | "busy" | "saved" | "failed" | "long" | "contact"
  >("idle");
  const [pinState, setPinState] = useState<"idle" | "saved" | "removed" | "failed">("idle");
  /**
   * Bundle 2 step 10 (P4) — THE DIRECTIONS LINE (`listings.directions`): optional,
   * capped and sanitised as the note is, refused with contactInNote. It rides the
   * pin's own door like the note, and every call of that door restates it — a
   * call that left it out would clear it.
   */
  const [directions, setDirections] = useState<string>("");
  const [dirState, setDirState] = useState<
    "idle" | "busy" | "saved" | "failed" | "long" | "contact"
  >("idle");
  /** The values the door last held, so a save of one line never clears the other. */
  const savedText = useRef<{ street: string | null; directions: string | null }>({
    street: pin?.street ?? null,
    directions: null,
  });
  const noteRead = useRef(false);
  /** Bundle 2 Q4 — the draft's own text lines are known (a carry never overwrites them). */
  const [textKnown, setTextKnown] = useState(false);
  useEffect(() => {
    if (listingId === null || noteRead.current) return;
    noteRead.current = true;
    let cancelled = false;
    readPlaceText(listingId).then(
      (found) => {
        if (cancelled) return;
        savedText.current = found;
        if (found.street !== null)
          setNote((current) => (current === "" ? (found.street ?? "") : current));
        if (found.directions !== null)
          setDirections((current) => (current === "" ? (found.directions ?? "") : current));
        onDirectionsSaved?.(found.directions);
        // Only a successful read lets a carry run: unknown text is never overwritten.
        setTextKnown(true);
      },
      () => {
        // Logged by the reader (F4); the lines stay empty and editable.
        if (!cancelled) setNoteState("failed");
      },
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

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
  /** W6b-1 R3 — the ticked city box; it starts on the first. */
  const [itemKey, setItemKey] = useState<string>(PRIMARY);
  /** W6b-1 R3 — what the polite live region last announced. */
  const [announce, setAnnounce] = useState("");
  /**
   * W6b-1 R4 — the last post's places: `undefined` while read, `null` for none.
   * Read only for a NEW post; after Back the draft's own places come first (W6).
   */
  const [last, setLast] = useState<LastPlaces | null | undefined>(() =>
    coverage.length > 0 ? null : undefined,
  );
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

  /** W6b-1 R4 — the last post's places are read ONCE, before any prefill settles. */
  useEffect(() => {
    if (last !== undefined) return;
    let cancelled = false;
    void readLastListingPlaces(listingId).then((found) => {
      if (!cancelled) setLast(found);
    });
    return () => {
      cancelled = true;
    };
    // Read once per mount: the draft id arriving later never re-reads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * THE MARKET PREFILL (INC-237): the last post's market (W6b-1 R4), else the
   * saved area's country, else the edge's — nothing else.
   */
  const marketSeeded = useRef(false);
  useEffect(() => {
    if (
      marketSeeded.current ||
      markets.markets.length === 0 ||
      guess === null ||
      last === undefined
    )
      return;
    const saved = readAreaCookie();
    const wanted = last?.country ?? saved?.country ?? guess.country?.toUpperCase() ?? null;
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
  }, [markets.markets, guess, country, last]);

  /**
   * THE PLACE PREFILL, over the market's cached tree: the draft's own saved
   * places first (so Back shows the seller's answer, R1), else the saved node,
   * else the resolved guess.
   */
  const placeSeeded = useRef<string | null>(null);
  useEffect(() => {
    if (country === null || nodes.length === 0 || placeSeeded.current === country) return;
    if (last === undefined) return;
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
      setItemKey(PRIMARY);
      return;
    }
    // W6b-1 R4 — the last post's places, its item place first and ticked.
    if (last !== null && last.country === country) {
      const found = last.placeIds
        .map((id) => byId.get(id) ?? null)
        .filter((node): node is TreeNode => node !== null)
        .slice(0, maxCities ?? 1);
      if (found.length > 0 && found[0]!.id === last.itemId) {
        setRows(
          found.map((node, index) => ({
            key: index === 0 ? PRIMARY : newKey(),
            country,
            ...chainOf(nodes, node),
          })),
        );
        setItemKey(PRIMARY);
        setPrefilled(true);
        return;
      }
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
  }, [country, nodes, guess, last]);

  /** W6b-1 R3 — the ticked box; a tick whose box is gone falls to the first. */
  const itemRow = rows.find((row) => row.key === itemKey) ?? rows[0]!;
  const tickKey = itemRow.key;
  const itemPlace = placeOf(itemRow);

  /**
   * Bundle 2 Q4 — THE PIN CARRIES OVER, PER CATEGORY. Once the last post's places
   * are prefilled, a draft with no pin and no text lines of its own takes the
   * last post's pin, zoom, directions and details — never for an own_place leaf,
   * never over the draft's own, and only while the item place is the last one's.
   */
  const carryTried = useRef(false);
  useEffect(() => {
    if (carryTried.current || listingId === null || !textKnown || ownPlace !== false) return;
    if (last === undefined || placeSeeded.current !== country) return;
    // The prefill lands in the render after seeding; decide only once it shows.
    if (last !== null && !prefilled) return;
    carryTried.current = true;
    const from = last?.pin ?? null;
    if (from === null || !prefilled || itemPlace !== last?.itemId) return;
    if (pin !== null || savedText.current.street !== null || savedText.current.directions !== null)
      return;
    const text = { street: from.street, directions: from.directions };
    void savePin(listingId, from.lat, from.lng, from.precision, text, from.zoom).then((ok) => {
      if (!ok) {
        setPinState("failed");
        return;
      }
      savedText.current = text;
      setNote(from.street ?? "");
      setDirections(from.directions ?? "");
      onDirectionsSaved?.(from.directions);
      onPinSaved?.({
        lat: from.lat,
        lng: from.lng,
        precision: from.precision,
        street: from.street,
        zoom: from.zoom,
      });
      onPinCarried?.(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId, textKnown, ownPlace, last, country, prefilled, itemPlace, pin]);

  /** Bundle 2 Q4 — a carried pin is cleared when the item place or the leaf no longer fits. */
  const dropCarried = () => {
    if (listingId === null) return;
    void clearPin(listingId, { street: null, directions: null }).then((ok) => {
      if (!ok) {
        setPinState("failed");
        return;
      }
      savedText.current = { street: null, directions: null };
      setNote("");
      setDirections("");
      onDirectionsSaved?.(null);
      onPinSaved?.(null);
      onPinCarried?.(false);
    });
  };
  useEffect(() => {
    if (!pinCarried || last === undefined) return;
    if (ownPlace === true || itemPlace !== (last?.itemId ?? null)) dropCarried();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCarried, ownPlace, itemPlace, last]);

  /** The places the rows name; the TICKED place first (the door's p_coverage[1]). */
  const desired = useMemo(() => {
    const out: string[] = [];
    const ordered = [itemRow, ...rows.filter((row) => row !== itemRow)];
    for (const row of ordered) {
      const id = placeOf(row);
      if (id !== null && !out.includes(id)) out.push(id);
    }
    return out;
  }, [rows, itemRow]);

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
    setRows((current) =>
      current.map((row) => (keys.includes(row.key) ? { ...row, ...patch } : row)),
    );
  }, []);

  const hasCity = placeOf(itemRow) !== null;

  // ---- R5: room at each level, counted over the rows (a pending box counts) ----
  const countryKeyOf = (row: Row) =>
    row.key === PRIMARY ? (country ?? "pending:primary") : (row.country ?? `pending:${row.key}`);
  const regionsUsed = new Set(
    rows.map((row) => `${countryKeyOf(row)}/${row.region ?? `pending:${row.key}`}`),
  ).size;
  const countriesUsed = new Set(rows.map(countryKeyOf)).size;
  // Bundle 2 P5 — several sub-cities of one city count as that one city (the door's
  // count(DISTINCT coalesce(city_id, id)), 13cb1b22:321).
  const citiesUsed = new Set(rows.map((row) => row.city ?? `pending:${row.key}`)).size;
  const cityRoom = maxCities !== null && citiesUsed < maxCities;
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
  const onCity = (keys: string[], city: string | null) => {
    if (keys.includes(PRIMARY)) setPrefilled(false);
    touched.current = true;
    const keep = keys.includes(PRIMARY) ? PRIMARY : keys[0]!;
    setRows((current) =>
      current
        .filter((row) => row.key === keep || !keys.includes(row.key))
        .map((row) => (row.key === keep ? { ...row, city, subCity: null } : row)),
    );
    if (keys.includes(itemKey) && itemKey !== keep) setItemKey(keep);
  };
  const onTick = (key: string) => {
    act();
    setItemKey(key);
  };
  /**
   * W6b-1 R3 — ANY city box can go while more than one remains. The first box
   * anchors the item's market box, so when it goes the next box takes its key
   * (and its market becomes the step's); a removed tick moves to the first
   * remaining box, announced through the live region.
   */
  const onRemove = (key: string) => {
    if (rows.length <= 1) return;
    act();
    const rest = rows.filter((row) => row.key !== key);
    const head = rest[0]!;
    let next = rest;
    let nextTick = itemKey;
    if (key === PRIMARY) {
      const code = head.country ?? country;
      next = [{ ...head, key: PRIMARY, country: code }, ...rest.slice(1)];
      if (nextTick === head.key) nextTick = PRIMARY;
      if (code !== country) {
        placeSeeded.current = code;
        setCountry(code);
      }
    }
    if (key === tickKey) {
      nextTick = next[0]!.key;
      const id = placeOf(next[0]!);
      const node = nodes.find((entry) => entry.id === id) ?? null;
      setAnnounce(fill(t("post.where.itemMoved"), { name: node === null ? "" : nameOf(node) }));
    }
    setItemKey(nextTick);
    setRows(next);
  };
  const onAddCity = (code: string | null, region: string | null) => {
    act();
    setRows((current) => [
      ...current,
      { key: newKey(), country: code, region, city: null, subCity: null },
    ]);
  };
  const onAddSubCity = (from: Row) => {
    act();
    setRows((current) => [...current, { ...from, key: newKey(), subCity: null }]);
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
  // W2 — "Add country" is not drawn when every open market is already a box.
  const countriesLeft =
    markets.markets.filter((market) => !takenCountries.includes(market.code)).length >
    otherGroups.filter((group) => group.code === null).length;

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

  /**
   * W6b-2 C3 — WHERE THE MAP OPENS: the TICKED place (its sub-city when chosen),
   * its level deciding the zoom, and a query naming it for the outline route.
   */
  const itemNode = useMemo(() => {
    const id = placeOf(itemRow);
    return id === null ? null : (nodes.find((node) => node.id === id) ?? null);
  }, [itemRow, nodes]);
  const pinPlace = useMemo<PinPlace>(() => {
    const market = nodes.find((node) => node.level === "country") ?? null;
    const centre =
      itemNode !== null && itemNode.centerLat !== null && itemNode.centerLng !== null
        ? itemNode
        : (chosen.find((node) => node.centerLat !== null && node.centerLng !== null) ?? market);
    const parent =
      itemNode !== null && itemNode.level === "sub_city" && itemRow.city !== null
        ? (nodes.find((node) => node.id === itemRow.city) ?? null)
        : null;
    const words = [itemNode, parent, market]
      .filter((node): node is TreeNode => node !== null)
      .map((node) => node.nameEn ?? node.slug);
    return {
      lat: centre?.centerLat ?? null,
      lng: centre?.centerLng ?? null,
      level:
        itemNode?.level === "sub_city" ? "sub_city" : itemNode?.level === "city" ? "city" : null,
      query: itemNode === null ? null : words.join(", "),
    };
  }, [itemNode, itemRow, chosen, nodes]);

  const primaryMarket = (
    <div className="space-y-1">
      <label htmlFor="post-where-market" className="text-sm font-medium text-foreground">
        {t("post.where.marketLabel")}
        {country === null && <RequiredMark />}
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
                market.code === country || !otherGroups.some((group) => group.code === market.code),
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
      {/* W6b-2 B1 — Box 1: where this ad is shown. */}
      <section
        className="space-y-4 rounded-lg border-2 border-primary/60 p-3"
        data-testid="post-where-shown-box"
        aria-labelledby="post-where-shown-title"
      >
        <h3 id="post-where-shown-title" className="text-sm font-semibold text-foreground">
          {t("post.where.shownBoxTitle")}
        </h3>
        <p className="text-sm text-muted-foreground" data-testid="post-where-intro">
          {t("post.where.showIntro")}
        </p>
        <p className="sr-only" aria-live="polite" data-testid="post-where-announce">
          {announce}
        </p>

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
            <span>{t("post.where.showHeading")}</span>
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
            itemKey={tickKey}
            canRemove={rows.length > 1}
            onTick={onTick}
            onRegion={onRegion}
            onRow={onRow}
            onCity={onCity}
            onRemove={onRemove}
            onAddCity={onAddCity}
            onAddSubCity={onAddSubCity}
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
              itemKey={tickKey}
              canRemove={rows.length > 1}
              onTick={onTick}
              onCountry={onCountry}
              onRegion={onRegion}
              onRow={onRow}
              onCity={onCity}
              onRemove={onRemove}
              onAddCity={onAddCity}
              onAddSubCity={onAddSubCity}
              onAddRegion={onAddRegion}
            />
          ))}

          {countryRoom && countriesLeft && (
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

        {/* ----------------- W6b-2 B2 — the plan, in ONE line ------------------ */}
        <ul className="space-y-1" data-testid="post-where-chosen" data-count={desired.length}>
          {chosen.map((node) => (
            <li key={node.id} className="text-sm">
              <span data-testid="post-where-chosen-row" data-id={node.id}>
                {nameOf(node)}
              </span>
            </li>
          ))}
        </ul>
        <div className="space-y-1">
          <p
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            data-testid="post-where-plan-line"
          >
            {maxCities === null ? (
              <span>{fill(t("post.where.planLineUnknown"), { regions: regionsNamed })}</span>
            ) : (
              <span
                data-testid="post-where-plan-count"
                data-used={desired.length}
                data-max={maxCities}
              >
                {fill(t("post.where.planLine"), {
                  used: desired.length,
                  max: maxCities,
                  regions: regionsNamed,
                })}
              </span>
            )}
            <button
              type="button"
              className="min-h-11 px-1 text-xs font-medium text-foreground underline underline-offset-2"
              aria-expanded={planOpen}
              onClick={() => setPlanOpen(!planOpen)}
              data-testid="post-where-plan-toggle"
            >
              {t(planOpen ? "post.where.planHide" : "post.where.planDetails")}
            </button>
          </p>
          {planOpen && (
            <div className="space-y-1" data-testid="post-where-plan-details">
              {maxCities !== null && (
                <p className="text-xs text-muted-foreground" data-testid="post-where-plan">
                  {fill(t("post.where.planCaption"), { cities: maxCities })}
                </p>
              )}
              <p className="text-xs text-muted-foreground" data-testid="post-where-plan-levels">
                {fill(t("post.where.planLevels"), {
                  regions: regionsNamed,
                  cities: levelCounts.city,
                  subCities: levelCounts.sub_city,
                })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ------------- W6b-2 B1 — Box 2: the item / service location ---------- */}
      <section
        className="space-y-3 rounded-lg border-2 border-primary/60 p-3"
        data-testid="post-where-item-box"
        aria-labelledby="post-where-item-title"
      >
        <h3 id="post-where-item-title" className="text-sm font-semibold text-foreground">
          {t("post.where.itemBoxTitleOptional")}
        </h3>
        <p className="text-sm text-foreground" data-testid="post-where-item-name">
          {itemNode === null ? t("post.where.itemNone") : nameOf(itemNode)}
        </p>

        {/* K — one explanation line; the map is offered in EVERY category. */}
        <p className="text-xs text-muted-foreground" data-testid="post-where-item-help">
          {t("post.where.itemHelp")}
        </p>

        {listingId === null ? (
          <p className="text-xs text-muted-foreground" data-testid="post-where-pin-later">
            {t("post.where.pinLater")}
          </p>
        ) : (
          <div className="space-y-2">
            {!pinOpen && (
              <p
                className="text-sm text-foreground"
                data-testid="post-pin-position"
                data-lat={pin === null ? "" : pin.lat.toFixed(5)}
                data-lng={pin === null ? "" : pin.lng.toFixed(5)}
              >
                {pin === null
                  ? t("post.pin.none")
                  : fill(t("post.pin.at"), {
                      lat: pin.lat.toFixed(5),
                      lng: pin.lng.toFixed(5),
                    })}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {pinCarried && pin !== null && (
                <p
                  className="w-full text-xs text-muted-foreground"
                  data-testid="post-where-pin-carried"
                >
                  {t("post.pin.fromLastPost")}
                </p>
              )}
              <button
                type="button"
                className="min-h-11 rounded-md border border-input px-3 py-2 text-sm text-foreground"
                aria-haspopup="dialog"
                onClick={() => {
                  setPinState("idle");
                  setPinOpen(true);
                }}
                data-testid="post-where-pin-open"
              >
                {t(pin === null ? "post.pin.open" : "post.pin.change")}
              </button>
              {pin !== null && (
                <button
                  type="button"
                  className="min-h-11 rounded-md border border-input px-3 py-2 text-sm text-foreground"
                  onClick={() => {
                    if (pinCarried) {
                      dropCarried();
                      setPinState("removed");
                      return;
                    }
                    // PW-40 — Remove clears the details with the pin; the
                    // directions line is restated so it is kept (step 10).
                    const kept = savedText.current.directions;
                    void clearPin(listingId, { street: null, directions: kept }).then((ok) => {
                      if (ok) {
                        savedText.current = { street: null, directions: kept };
                        onPinSaved?.(null);
                        setNote("");
                      }
                      setPinState(ok ? "removed" : "failed");
                    });
                  }}
                  data-testid="post-pin-remove"
                >
                  {t("post.pin.remove")}
                </button>
              )}
            </div>
            {/* K — after Save, the small map exactly as buyers see it. */}
            {pin !== null && !pinOpen && (
              <div data-testid="post-where-pin-preview">
                <Suspense fallback={null}>
                  <MapPreview
                    lat={pin.lat}
                    lng={pin.lng}
                    precision={pin.precision ?? null}
                    zoom={pin.zoom ?? null}
                  />
                </Suspense>
              </div>
            )}
            {pinState === "saved" && (
              <p className="text-sm text-foreground" data-testid="post-pin-saved">
                {t("post.pin.saved")}
              </p>
            )}
            {pinState === "removed" && (
              <p className="text-sm text-foreground" data-testid="post-pin-removed">
                {t("post.pin.removed")}
              </p>
            )}
            {pinState === "failed" && (
              <p className="text-sm text-destructive" data-testid="post-pin-error">
                {t("post.pin.saveFailed")}
              </p>
            )}
            {pinOpen && (
              <Suspense
                fallback={
                  <p className="text-xs text-muted-foreground">{t("post.pin.searching")}</p>
                }
              >
                <MapPinDropper
                  saved={pin}
                  place={pinPlace}
                  note={note}
                  onNote={setNote}
                  onClose={() => setPinOpen(false)}
                  onSave={async (value) => {
                    const street = sanitizeDetails(note);
                    const text = {
                      street: street === "" ? null : street,
                      directions: savedText.current.directions,
                    };
                    const ok = await savePin(
                      listingId,
                      value.lat,
                      value.lng,
                      value.precision,
                      text,
                      value.zoom,
                    );
                    if (ok) {
                      savedText.current = text;
                      // A pin the seller sets is the draft's own (Q4).
                      onPinCarried?.(false);
                      onPinSaved?.({ ...value, street: street === "" ? null : street });
                      setPinState("saved");
                      setPinOpen(false);
                    }
                    return ok;
                  }}
                />
              </Suspense>
            )}
          </div>
        )}

        {/* Bundle 2 step 10 (P4) — the directions line, above the details. */}
        <div className="space-y-1">
          <label htmlFor="post-where-directions" className="text-sm font-medium text-foreground">
            {t("post.where.directionsLabel")}
          </label>
          <input
            id="post-where-directions"
            data-testid="post-where-directions"
            className={fieldClass}
            aria-invalid={dirState === "contact" || dirState === "long" ? true : undefined}
            value={directions}
            disabled={listingId === null}
            onChange={(event) => {
              setDirections(event.target.value);
              // Flagged as typed; the door stays the authority (F3).
              setDirState(looksLikeContact(event.target.value) ? "contact" : "idle");
            }}
            onBlur={() => {
              if (listingId === null) return;
              const clean = sanitizeDetails(directions);
              if (clean.length > DETAILS_MAX) {
                setDirState("long");
                return;
              }
              if (looksLikeContact(clean)) {
                setDirState("contact");
                return;
              }
              const text = {
                street: savedText.current.street,
                directions: clean === "" ? null : clean,
              };
              setDirState("busy");
              void savePlaceText(listingId, text, pin).then((answer) => {
                if (answer === "saved") {
                  savedText.current = text;
                  onDirectionsSaved?.(text.directions);
                }
                setDirState(answer === "contactInNote" ? "contact" : answer);
              });
            }}
          />
          <p className="text-xs text-muted-foreground">{t("post.where.directionsHelp")}</p>
          {dirState === "saved" && (
            <p className="text-xs text-muted-foreground" data-testid="post-where-directions-saved">
              {t("post.where.directionsSaved")}
            </p>
          )}
          {dirState === "long" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-directions-long"
            >
              {fill(t("post.where.directionsTooLong"), { max: DETAILS_MAX })}
            </p>
          )}
          {dirState === "contact" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-directions-contact"
            >
              {t("post.refusal.contactInNote")}
            </p>
          )}
          {dirState === "failed" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-directions-failed"
            >
              {t("post.where.directionsFailed")}
            </p>
          )}
        </div>

        {/* W6b-2 B3 — the location details, for every category. */}
        <div className="space-y-1">
          <label htmlFor="post-where-details" className="text-sm font-medium text-foreground">
            {t("post.where.detailsLabel")}
          </label>
          <input
            id="post-where-details"
            data-testid="post-where-details"
            className={fieldClass}
            aria-invalid={noteState === "contact" || noteState === "long" ? true : undefined}
            value={note}
            disabled={listingId === null}
            onChange={(event) => {
              setNote(event.target.value);
              // Part D — flagged as typed; the door stays the authority (F3).
              setNoteState(looksLikeContact(event.target.value) ? "contact" : "idle");
            }}
            onBlur={() => {
              if (listingId === null) return;
              const clean = sanitizeDetails(note);
              if (clean.length > DETAILS_MAX) {
                setNoteState("long");
                return;
              }
              if (looksLikeContact(clean)) {
                setNoteState("contact");
                return;
              }
              const text = {
                street: clean === "" ? null : clean,
                directions: savedText.current.directions,
              };
              setNoteState("busy");
              void savePlaceText(listingId, text, pin).then((answer) => {
                const ok = answer === "saved";
                if (ok) savedText.current = text;
                setNoteState(answer === "contactInNote" ? "contact" : answer);
                if (ok && pin !== null)
                  onPinSaved?.({ ...pin, street: clean === "" ? null : clean });
              });
            }}
          />
          <p className="text-xs text-muted-foreground">{t("post.where.detailsHelp")}</p>
          {noteState === "saved" && (
            <p className="text-xs text-muted-foreground" data-testid="post-where-details-saved">
              {t("post.where.detailsSaved")}
            </p>
          )}
          {noteState === "long" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-details-long"
            >
              {fill(t("post.where.detailsTooLong"), { max: DETAILS_MAX })}
            </p>
          )}
          {noteState === "contact" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-details-contact"
            >
              {t("post.refusal.contactInNote")}
            </p>
          )}
          {noteState === "failed" && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-where-details-failed"
            >
              {t("post.where.detailsFailed")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StepWhere;
