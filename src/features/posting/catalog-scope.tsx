import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { CatalogTokens } from "@/i18n";
import { useI18n } from "@/i18n";

/**
 * Bundle 4 steps 28–29 — WHAT THE POSTING SCREENS DRAW CATALOGUE TOKENS WITH.
 *
 * The wizard resolves the country and the category paths once and provides them
 * here; every seller and buyer screen under it reads this scope and hands it to
 * the one renderer (`@/i18n/catalog-tokens`). `moveTo` is the {category:…}
 * button's action — null where no move is possible (a pointer then reads as
 * plain words).
 */
export interface CatalogScope extends CatalogTokens {
  moveTo: ((slug: string) => void) | null;
}

const ScopeContext = createContext<CatalogScope | null>(null);

export function CatalogScopeProvider({
  value,
  children,
}: {
  value: CatalogScope;
  children: ReactNode;
}) {
  return <ScopeContext.Provider value={value}>{children}</ScopeContext.Provider>;
}

const NO_PATH = () => null;

/** The scope in force; outside a provider: the fallback country words, no pointers. */
export function useCatalogScope(): CatalogScope {
  const scope = useContext(ScopeContext);
  const { t } = useI18n();
  const fallback = t("post.catalog.yourCountry");
  return useMemo(
    () => scope ?? { country: fallback, categoryPath: NO_PATH, moveTo: null },
    [scope, fallback],
  );
}

/**
 * DEC-094 — WHICH COUNTRY {country} NAMES: the ad's first place when it has
 * one; else the market the seller is browsing (the area cookie); else the
 * seller's CONFIRMED home country; else none (the screen prints the fallback).
 */
export function tokenCountryCode(input: {
  placeCountry: string | null;
  areaCountry: string | null;
  homeCountry: string | null;
  homeConfirmed: boolean;
}): string | null {
  if (input.placeCountry !== null && input.placeCountry !== "") return input.placeCountry;
  if (input.areaCountry !== null && input.areaCountry !== "") return input.areaCountry;
  if (input.homeConfirmed && input.homeCountry !== null && input.homeCountry !== "") {
    return input.homeCountry;
  }
  return null;
}
