import { createContext, useContext, useEffect } from "react";

import { isStringsLayer, type StringsLayer } from "./compiled-catalog";
import type { I18nValue, LayerState } from "./provider";
import { type Language } from "./types";

/**
 * U4h — THE DEVICE ★.
 *
 * The star is a DEVICE choice, not a session one: it must survive sign-out and
 * session expiry, and it must be visible to the SERVER on the first byte so
 * `<html lang|dir>` is right before React attaches. That needs BOTH stores:
 *  - `localStorage` — the durable client record (survives cookie clearing of
 *    session cookies, and is the one the client reads first);
 *  - a plain cookie — the only channel SSR can read. It carries a language
 *    CODE and nothing else: no secrets, `SameSite=Lax`, one year, path `/`.
 */
export const LANGUAGE_STAR_STORAGE_KEY = "ethio.lang.star";
export const LANGUAGE_STAR_COOKIE = "ethio_lang_star";

/**
 * A well-formed BCP-47-ish code. Shape only: whether a code may ACTIVATE is
 * the publication gate's call (`isPublic`), never this function's.
 */
export function isLanguageCode(value: string | null): value is Language {
  return value !== null && /^[a-z]{2,8}(-[a-z]{2,8})?$/i.test(value);
}

/**
 * The device ★, read from the durable client record first and from the SSR
 * cookie second (a browser that lost `localStorage` still keeps its star).
 * SHAPE validation only — the publication gate reconciles afterwards, exactly
 * as it does for every other language source.
 */
export function readDeviceStar(): string | null {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(LANGUAGE_STAR_STORAGE_KEY);
  } catch {
    stored = null;
  }
  if (isLanguageCode(stored)) return stored;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LANGUAGE_STAR_COOKIE}=([^;]*)`));
    const fromCookie = match ? decodeURIComponent(match[1] ?? "") : null;
    if (isLanguageCode(fromCookie)) return fromCookie;
  } catch {
    /* no document/cookie access (SSR, or a locked-down embed) */
  }
  return null;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

/**
 * DEC-258 (DEC-231's admin gate, generalised) — a screen's ask for the strings
 * layers it shows: requests each once on mount (and whenever the list
 * changes) and reports where the load stands — ready only when every layer is
 * in, failed when any failed. Turn 34c-3 (INC-918): no retry — the browser keeps
 * a failed download for the page's life, so the one cure is a refresh (the
 * shell's gate draws LoadFailedHere).
 */
export function useStringsLayers(layers: readonly StringsLayer[]): { state: LayerState } {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useStringsLayers must be used within <I18nProvider>");
  const { layerStates, requestStringsLayer } = ctx;
  // One string for the list, so a new array of the same layers asks nothing again.
  const asked = layers.join(",");
  useEffect(() => {
    for (const layer of asked.split(",")) {
      if (isStringsLayer(layer)) requestStringsLayer(layer);
    }
  }, [asked, requestStringsLayer]);
  const states = layers.map((layer) => layerStates[layer]);
  const state: LayerState = states.includes("failed")
    ? "failed"
    : states.every((one) => one === "ready")
      ? "ready"
      : "loading";
  return { state };
}
