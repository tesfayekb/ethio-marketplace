import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";

/**
 * U6-C2a — STEP 6: WHERE IT IS, AND WHERE IT SHOWS (DEC-064, D19).
 *
 * THE EDITOR READS THE SHELL'S OWN GEOGRAPHY SEAM — `useOpenMarkets` and
 * `useCountryTree` (B1/B2: the cached public routes, one reader, no second copy
 * and no browser read of `public.locations`). Names resolve through
 * `entityName('location', …)` exactly as the picker's do, so an approved Amharic
 * place name appears here too (D3).
 *
 * THE PREFILL, in the spec's order, and NEVER persisted (law 10):
 *   1 the SAVED AREA cookie — a place the seller actually picked;
 *   2 the EDGE's guess (`/api/geo`, DEC-068), resolved over the cached tree by
 *     the shared pure `resolveGuess`.
 * A prefill is announced in words ("filled in from your area — change it"), so it
 * is never mistaken for the seller's own answer.
 *
 * D19 — A CITY WITH SUB-CITIES OFFERS "All of <city>" BESIDE THEM. Whole-city
 * coverage is the CITY NODE itself, not the list of its children: a seller who
 * means "anywhere in Addis" must not have to tick eleven boxes, and the door
 * counts one city either way.
 *
 * THE PLAN IS A MIRROR, NOT THE AUTHORITY (F3). The caption says what the free
 * plan covers and the editor refuses a second place client-side, but the verdict
 * that counts is `coverageExceedsPlan:<level>` from `submit_listing`, which
 * renders beneath the list when it comes.
 *
 * NAMED DEFERRAL — THE MAP PIN. No category carries the `map_pin` capability yet,
 * so no pin control is rendered: the screen says a pin will be offered for
 * categories that use one, and the control lands with the capability (docs).
 */

const LEVEL_KEYS: Record<string, MessageKey> = {
  region: "post.where.level.region",
  city: "post.where.level.city",
  sub_city: "post.where.level.sub_city",
};

/** The free plan, from `coverage_plans`: one city, one region, one country. */
const PLAN_CITIES = 1;

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

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

export function StepWhere({
  coverage,
  refusals,
  onChange,
}: {
  /** The chosen place ids; the FIRST one is the item's own place (spec §4 C2). */
  coverage: string[];
  refusals: Refusal[];
  onChange: (coverage: string[], immediate: boolean) => void;
}) {
  const { t, entities } = useI18n();
  const markets = useOpenMarkets();

  const [country, setCountry] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [subCity, setSubCity] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState(false);
  const [planBlocked, setPlanBlocked] = useState(false);
  const [guess, setGuess] = useState<GuessFacts | null>(null);

  const tree = useCountryTree(country);
  /**
   * INC-211 — rows are read ONLY when they belong to the market on screen. The
   * memo keeps that guard from producing a fresh array on every render, which
   * would re-run every effect and memo downstream (I3).
   */
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

  /**
   * THE MARKET PREFILL: the saved area's country, else the edge's country, else
   * the first open market. Runs once, and only while the seller has not picked.
   */
  const marketSeeded = useRef(false);
  useEffect(() => {
    if (marketSeeded.current || markets.markets.length === 0) return;
    const saved = readAreaCookie();
    const wanted = saved?.country ?? guess?.country?.toUpperCase() ?? null;
    const found = markets.markets.find((market) => market.code === wanted) ?? markets.markets[0];
    if (found === undefined) return;
    marketSeeded.current = true;
    setCountry(found.code);
  }, [markets.markets, guess]);

  /**
   * THE PLACE PREFILL, over the market's cached tree: the saved node when it
   * belongs to this market, else the resolved guess. It fills the cascade only —
   * nothing is added to the coverage list without the seller's own tap.
   */
  const placeSeeded = useRef<string | null>(null);
  useEffect(() => {
    if (country === null || nodes.length === 0 || placeSeeded.current === country) return;
    placeSeeded.current = country;
    const saved = readAreaCookie();
    const savedNode =
      saved !== null && saved.country === country
        ? (nodes.find((node) => node.id === saved.id) ?? null)
        : null;
    const target =
      savedNode ??
      (guess === null
        ? null
        : resolveGuess(nodes, { ...guess, country: guess.country ?? country }));
    if (target === null) return;

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
    setRegion(at("region"));
    setCity(at("city"));
    setSubCity(at("sub_city"));
    if (at("region") !== null || at("city") !== null) setPrefilled(true);
  }, [country, nodes, guess]);

  const childrenOf = useCallback(
    (parentId: string | null, level: string) =>
      nodes.filter(
        (node) => node.level === level && (parentId === null || node.parentId === parentId),
      ),
    [nodes],
  );

  const nameOf = (node: TreeNode) =>
    entityName(
      "location",
      { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
      entities,
    );

  const regions = useMemo(
    () => childrenOf(anchorOf(nodes)?.id ?? null, "region"),
    [childrenOf, nodes],
  );
  const cities = useMemo(() => childrenOf(region, "city"), [childrenOf, region]);
  const subCities = useMemo(() => childrenOf(city, "sub_city"), [childrenOf, city]);

  /** The deepest place the cascade currently names — what "Add" would add. */
  const candidateId = subCity ?? city ?? region;
  const candidate = candidateId === null ? null : (nodes.find((n) => n.id === candidateId) ?? null);

  const chosen = coverage
    .map((id) => nodes.find((node) => node.id === id) ?? null)
    .filter((node): node is TreeNode => node !== null);
  const cityCount = coverage.length;

  const add = (id: string) => {
    if (coverage.includes(id)) return;
    if (coverage.length >= PLAN_CITIES) {
      // The plan's own limit, said in words before a round trip is spent. The
      // door repeats the verdict if a client ever gets past this (F3).
      setPlanBlocked(true);
      return;
    }
    setPlanBlocked(false);
    onChange([...coverage, id], true);
  };

  const remove = (id: string) => {
    setPlanBlocked(false);
    onChange(
      coverage.filter((entry) => entry !== id),
      true,
    );
  };

  const coverageRefusal = refusalFor(refusals, "coverage");

  return (
    <div className="space-y-5" data-testid="post-where">
      <p className="text-sm text-muted-foreground">{t("post.where.why")}</p>

      {/* ------------------------------ the market ---------------------------- */}
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
              setCountry(code);
              // A new market invalidates the whole cascade AND the chosen places:
              // the door refuses coverage spanning two markets (`multipleMarkets`).
              setRegion(null);
              setCity(null);
              setSubCity(null);
              setPrefilled(false);
              setPlanBlocked(false);
              placeSeeded.current = code;
              if (coverage.length > 0) onChange([], true);
            }}
          >
            {markets.markets.map((market) => (
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
      </div>

      {/* ------------------------------ the cascade --------------------------- */}
      {tree.isLoading && (
        <p className="text-sm text-muted-foreground">{t("post.where.treeLoading")}</p>
      )}
      {tree.failed && (
        <p className="text-sm text-destructive" data-testid="post-where-tree-error">
          {t("post.where.treeFailed")}
        </p>
      )}

      {regions.length > 0 && (
        <div className="space-y-1">
          <label htmlFor="post-where-region" className="text-sm font-medium text-foreground">
            {t(LEVEL_KEYS["region"] ?? "post.where.level.region")}
          </label>
          <select
            id="post-where-region"
            data-testid="post-where-region"
            className={fieldClass}
            value={region ?? ""}
            onChange={(event) => {
              setRegion(event.target.value || null);
              setCity(null);
              setSubCity(null);
              setPrefilled(false);
            }}
          >
            <option value="">{t("post.where.levelNone")}</option>
            {regions.map((node) => (
              <option key={node.id} value={node.id}>
                {nameOf(node)}
              </option>
            ))}
          </select>
        </div>
      )}

      {cities.length > 0 && (
        <div className="space-y-1">
          <label htmlFor="post-where-city" className="text-sm font-medium text-foreground">
            {t(LEVEL_KEYS["city"] ?? "post.where.level.city")}
          </label>
          <select
            id="post-where-city"
            data-testid="post-where-city"
            className={fieldClass}
            value={city ?? ""}
            onChange={(event) => {
              setCity(event.target.value || null);
              setSubCity(null);
              setPrefilled(false);
            }}
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

      {/*
        D19 — the sub-city level. "All of <city>" is the CITY node offered beside
        its children, so whole-city coverage is one place, not eleven.
      */}
      {city !== null && subCities.length > 0 && (
        <div className="space-y-1">
          <label htmlFor="post-where-subcity" className="text-sm font-medium text-foreground">
            {t(LEVEL_KEYS["sub_city"] ?? "post.where.level.sub_city")}
          </label>
          <select
            id="post-where-subcity"
            data-testid="post-where-subcity"
            className={fieldClass}
            value={subCity ?? ""}
            onChange={(event) => setSubCity(event.target.value || null)}
          >
            <option value="" data-testid="post-where-allof">
              {fill(t("post.where.allOf"), {
                name: nameOf(nodes.find((node) => node.id === city) ?? subCities[0]!),
              })}
            </option>
            {subCities.map((node) => (
              <option key={node.id} value={node.id}>
                {nameOf(node)}
              </option>
            ))}
          </select>
        </div>
      )}

      {prefilled && (
        <p className="text-xs text-muted-foreground" data-testid="post-where-prefilled">
          {t("post.where.prefilled")}
        </p>
      )}

      {/* --------------------------- the chosen places ------------------------ */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{t("post.where.chosenLabel")}</p>
        <p className="text-xs text-muted-foreground" data-testid="post-where-plan">
          {fill(t("post.where.planCaption"), { cities: PLAN_CITIES })}
        </p>
        <ul className="space-y-1" data-testid="post-where-chosen" data-count={cityCount}>
          {chosen.map((node) => (
            <li key={node.id} className="flex items-center justify-between gap-2 text-sm">
              <span data-testid="post-where-chosen-row" data-id={node.id}>
                {nameOf(node)}
              </span>
              <button
                type="button"
                data-testid="post-where-remove"
                className="min-h-11 rounded-md border border-input px-3 text-xs font-medium text-foreground"
                onClick={() => remove(node.id)}
              >
                {t("post.where.removePlace")}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-testid="post-where-add"
          disabled={candidate === null}
          className={
            "inline-flex min-h-11 items-center rounded-md border border-input px-4 text-sm " +
            "font-medium text-foreground hover:bg-muted disabled:opacity-60"
          }
          onClick={() => {
            if (candidate !== null) add(candidate.id);
          }}
        >
          {t("post.where.addPlace")}
        </button>
        {planBlocked && (
          <p className="text-sm text-destructive" data-testid="post-where-plan-full">
            {t("post.where.planFull")}
          </p>
        )}
        {coverageRefusal !== null && (
          <p className="text-sm text-destructive" data-testid="post-where-refusal">
            {t(draftRefusalKey(coverageRefusal.reason))}
          </p>
        )}
        <p className="text-xs text-muted-foreground" data-testid="post-where-pin-later">
          {t("post.where.pinLater")}
        </p>
      </div>
    </div>
  );
}

export default StepWhere;
