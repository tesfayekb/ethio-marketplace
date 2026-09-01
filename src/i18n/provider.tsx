import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { fetchPreferredLanguage, savePreferredLanguage } from "@/features/auth/auth-service";
import { supabase } from "@/integrations/supabase/client";

import { fetchEntityBundle, fetchUiBundle } from "./bundle";
import { EMPTY_ENTITY_BUNDLE, type EntityBundle } from "./entity";
import { en } from "./locales/en";
import { type Language, type MessageKey, type Messages } from "./types";

export const LANGUAGE_STORAGE_KEY = "ethio.lang";

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
const STAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** The base language: the last-resort catalog and the refusal fallback (U4f). */
export const BASE_LANGUAGE: Language = "en";

/**
 * INC-107 — A MISSING COMPILED LAYER IS EMPTY, NOT FATAL.
 *
 * The compiled catalogs are a SEED, not the language registry: a language the
 * operator publishes in the console may legitimately exist in the DATABASE
 * only, with no file here. The registry is therefore a partial map keyed by
 * code, and a lookup miss means "the compiled layer for this language is `{}`"
 * — the chain becomes compiled.en ▸ {} ▸ DB[lang], never a throw.
 */
const loaders: Partial<Record<string, () => Promise<Messages>>> = {
  am: () => import("./locales/am").then((m) => m.am),
};

/**
 * A well-formed BCP-47-ish code. Shape only: whether a code may ACTIVATE is
 * the publication gate's call (`isPublic`), never this function's.
 */
function isLanguageCode(value: string | null): value is Language {
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

/** Writes (or clears) the device ★ in BOTH stores. Never throws. */
function writeDeviceStar(code: string | null): void {
  try {
    if (code === null) window.localStorage.removeItem(LANGUAGE_STAR_STORAGE_KEY);
    else window.localStorage.setItem(LANGUAGE_STAR_STORAGE_KEY, code);
  } catch {
    /* private mode: the cookie below still carries the star */
  }
  try {
    const value = code === null ? "" : encodeURIComponent(code);
    const age = code === null ? 0 : STAR_COOKIE_MAX_AGE;
    document.cookie = `${LANGUAGE_STAR_COOKIE}=${value}; Path=/; Max-Age=${age}; SameSite=Lax`;
  } catch {
    /* no cookie access; the localStorage record still answers on this device */
  }
}

/**
 * U4f (INC-098) — a PUBLIC language row, as the publication gate defines it.
 * The `languages` table's public RLS SELECT exposes exactly `enabled_public OR
 * is_base`, so this list IS the gate's source; every consumer of the gated list
 * (the switcher, the runtime activation check) reads it rather than a static
 * copy.
 */
export type PublicLanguage = {
  code: string;
  name_en: string;
  name_native: string;
  rtl: boolean;
  sort: number;
};

/** Compiled seed used until the gate answers; `en` is the base row by law. */
const SEED_PUBLIC_LANGUAGES: PublicLanguage[] = [
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
];

/**
 * INC-110 — THE REDIRECT PATH AWAITS NOTHING i18n-RELATED.
 *
 * This read used to go through the shared supabase-js client, so it competed
 * for the SAME exclusive auth lock / session-token path that the route guard's
 * permission RPC needs. With the languages response artificially delayed, the
 * regular-user redirect off /admin inherited that delay (TR-18: 7181 ms
 * against a 5000 ms law) even though no guard depends on i18n state.
 *
 * The public language list is anon-readable reference data (`enabled_public OR
 * is_base` RLS), so it needs no session at all: a plain `fetch` with the
 * publishable key touches neither the auth lock nor the session refresh, and
 * the URL is unchanged so the delay harness still targets exactly this read.
 */
async function fetchPublicLanguages(): Promise<PublicLanguage[] | null> {
  const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;
  if (!url || !key) return null;
  const query =
    "select=code,name_en,name_native,rtl,sort" +
    "&or=(enabled_public.eq.true,is_base.eq.true)" +
    "&order=sort.asc";
  // U4g-21 (INC-113) — INVARIANT: A GATE LIST IS NEVER CACHED ACROSS LOADS.
  // Publication is an operator decision that must be visible on the NEXT page
  // load. `cache: "no-store"` plus `cache-control: no-cache` defeat the HTTP
  // cache and any intermediary. NO query-string busting is used here: PostgREST
  // treats unknown query params as column filters, so a `_ts` parameter returns
  // 400 instead of busting (INC-113b). (Census 2026-09-01: this project
  // registers NO service worker — no VitePWA plugin, no src/sw*, no
  // public/sw.js — so nothing caches /rest/v1/* today; the invariant is enforced
  // here, at the request, so it survives REQ-039 landing a worker later.)
  const init: RequestInit = {
    cache: "no-store",
    headers: {
      apikey: key,
      accept: "application/json",
      "cache-control": "no-cache",
    },
  };

  async function attemptOnce(): Promise<Response | null> {
    try {
      return await fetch(`${url}/rest/v1/languages?${query}`, init);
    } catch {
      return null;
    }
  }

  let response = await attemptOnce();
  if (response && !response.ok) {
    const preview = await response
      .clone()
      .text()
      .then((t) => t.slice(0, 200))
      .catch(() => "<body unreadable>");
    console.error("[client-error] gate fetch failed", response.status, preview);
    // F4 — retry once before falling back; the fallback is never silent.
    response = await attemptOnce();
    if (response && !response.ok) {
      const secondPreview = await response
        .clone()
        .text()
        .then((t) => t.slice(0, 200))
        .catch(() => "<body unreadable>");
      console.error("[client-error] gate fetch retry failed", response.status, secondPreview);
    }
  }

  if (!response || !response.ok) return null;
  const rows = (await response.json()) as PublicLanguage[];
  return Array.isArray(rows) ? rows : null;
}

type I18nValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: MessageKey) => string;
  /** U4d — approved entity names for the active language (overlay, never a replacement). */
  entities: EntityBundle;
  /** U4f — the publication gate's own list; the switcher renders exactly this. */
  publicLanguages: PublicLanguage[];
  /** U4h — the DEVICE ★: the one favourite, or null when the device never chose. */
  star: string | null;
  /** U4h — star a language: it becomes the device default AND the active language. */
  setStar: (code: Language) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

/** URL override (`?lang=xx`) — validated against the gate like every other source. */
function requestedFromUrl(): string | null {
  try {
    return new URLSearchParams(window.location.search).get("lang");
  } catch {
    return null;
  }
}

/**
 * U4g-8 (INC-101b) — INVARIANT: THE AUTH CALLBACK OWNS THE AUTH LOCK ON THE
 * FIRST FRAMES; EVERY OTHER PROVIDER'S SUPABASE READ STARTS AFTER AUTH SETTLES.
 *
 * supabase-js serialises session access through one exclusive auth lock, and
 * `onAuthStateChange` callbacks run while it is held. A read issued from this
 * provider on the first frames contends with the auth flow's own profile read
 * and can starve it. The cheapest settle signal available at the provider's
 * position (above the shell, no auth context in scope) is a subscription that
 * makes NO Supabase call inside its callback: the first auth event — always
 * emitted, `INITIAL_SESSION` included — means the bootstrap has run. The flag
 * is raised on a macrotask hop so the lock is released first. A watchdog keeps
 * i18n from stalling forever if no event ever arrives.
 */
function useAuthIdentity(): { settled: boolean; userId: string | null } {
  const [settled, setSettled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const raise = () => {
      if (!cancelled) setSettled(true);
    };
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      // No Supabase CALL here (law I5): the session is the event's own argument.
      // INC-121 (a): the signed-in identity is what re-arms the account carry,
      // so it is mirrored — equality-guarded, never a fresh object per event.
      const next = session?.user?.id ?? null;
      setUserId((current) => (current === next ? current : next));
      setTimeout(raise, 0);
    });
    // Watchdog (law F4: never a silent stall) — i18n proceeds regardless.
    const watchdog = setTimeout(raise, 3000);
    return () => {
      cancelled = true;
      clearTimeout(watchdog);
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { settled, userId };
}


export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(BASE_LANGUAGE);
  const [messages, setMessages] = useState<Messages>(en);
  // U4d — entity names for the active language. Identity is stable while the
  // language is unchanged and the fetch is pending (INC-090 identity law).
  const [entities, setEntities] = useState<EntityBundle>(EMPTY_ENTITY_BUNDLE);
  // U4f/U4f-2 (INC-098b) — the publication gate's list. The seed answers the
  // FIRST frame; the real list arrives asynchronously. The root provider never
  // waits on the network: nothing here gates the tree.
  const [publicLanguages, setPublicLanguages] = useState<PublicLanguage[]>(SEED_PUBLIC_LANGUAGES);
  const [gateReady, setGateReady] = useState(false);
  /** U4h — the device ★ (null until the boot read runs; SSR never reads storage). */
  const [star, setStarState] = useState<string | null>(null);
  /** U4h — the boot read has run, so "no star" now MEANS no star. */
  const [bootRead, setBootRead] = useState(false);
  /** Loop guard (INC-098b): the gate revokes an unpublished language AT MOST once. */
  const reconciledRef = useRef(false);
  /** U4h — the account carry is applied AT MOST once per mount. */
  const accountSyncedRef = useRef(false);
  /** INC-107 — one warning per DB-only language, never one per effect run. */
  const warnedMissingRef = useRef<Set<string>>(new Set());
  const authSettled = useAuthSettled();

  // Read the gate's own source (law F4: a failure logs, never silently widens).
  // INC-110: the read no longer waits for the auth settle signal, because it
  // no longer touches the auth lock — it is a keyed anon fetch, off the
  // critical path of every route guard.
  useEffect(() => {
    let cancelled = false;
    void fetchPublicLanguages().then((rows) => {
      if (cancelled) return;
      if (!rows || rows.length === 0) {
        console.warn("[i18n] public language list unavailable — base language only");
        setGateReady(true);
        return;
      }
      setPublicLanguages(rows);
      setGateReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isPublic = useCallback(
    (code: string) => publicLanguages.some((row) => row.code === code),
    [publicLanguages],
  );

  // The entity bundle follows the SAME overlay law as the UI bundle: a failure
  // logs one line and leaves the column/base name answering (law F4, not silent).
  // Like the gate read, it starts only once auth has settled.
  useEffect(() => {
    let cancelled = false;
    setEntities({ lang: language, map: {} });
    if (!authSettled) {
      return () => {
        cancelled = true;
      };
    }
    void fetchEntityBundle(language).then(({ bundle, reason }) => {
      if (cancelled) return;
      if (!bundle) {
        console.warn(`[i18n] entity bundle fallback for ${language}: ${reason}`);
        return;
      }
      setEntities({ lang: language, map: bundle });
    });
    return () => {
      cancelled = true;
    };
  }, [language, authSettled]);

  const setLanguage = useCallback(
    (next: Language) => {
      // U4f — activation is gated: a non-public code falls back to the base
      // language with exactly one warning, never a silent unblessed render.
      if (gateReady && !isPublic(next)) {
        console.warn(`[i18n] language "${next}" is not published — falling back to base`);
        setLanguageState(BASE_LANGUAGE);
        return;
      }
      setLanguageState(next);
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // Storage unavailable (private mode); language still applies for this session.
      }
    },
    [gateReady, isPublic],
  );

  /**
   * U4h — STAR A LANGUAGE. One favourite: the setter REPLACES, never appends,
   * so the one-favourite invariant is structural rather than policed.
   *
   * Starring also SELECTS (the operator's spec: the star is the default, and a
   * default you cannot see is not a default), and syncs UP to the account
   * fire-and-forget when a session exists. The DB is the authority on whether
   * the code may be stored at all; the client only pre-checks the same gate it
   * already renders, so an unpublished code never reaches the RPC.
   */
  const setStar = useCallback(
    (code: Language) => {
      if (gateReady && !isPublic(code)) {
        console.warn(`[i18n] language "${code}" is not published — star refused`);
        return;
      }
      setStarState(code);
      writeDeviceStar(code);
      setLanguage(code);
      void savePreferredLanguage(code).then((result) => {
        // Signed out is the ORDINARY case for a device star, not a failure.
        if (!result.ok && result.reason !== "no session") {
          console.warn(`[i18n] account language sync failed for ${code}: ${result.reason}`);
        }
      });
    },
    [gateReady, isPublic, setLanguage],
  );

  // Restore the requested choice after hydration. PRECEDENCE (U4h):
  //   URL override  ▸  device ★  ▸  last used language  ▸  base
  // The account preference is NOT in this chain: it is a carry applied by the
  // effect below, and only onto a device that never starred anything.
  // INC-107: no source is validated against the COMPILED registry — a DB-only
  // language is a legitimate preference — only against the code SHAPE here and
  // against the publication gate below.
  useEffect(() => {
    const fromUrl = requestedFromUrl();
    const deviceStar = readDeviceStar();
    if (deviceStar !== null) setStarState(deviceStar);
    setBootRead(true);

    if (fromUrl !== null) {
      if (isLanguageCode(fromUrl)) setLanguageState(fromUrl);
      else console.warn(`[i18n] language "${fromUrl}" is not published — falling back to base`);
      return;
    }
    if (deviceStar !== null) {
      setLanguageState(deviceStar as Language);
      return;
    }
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (isLanguageCode(stored) && stored !== BASE_LANGUAGE) setLanguageState(stored);
  }, []);

  /**
   * U4h — THE ACCOUNT CARRY (secondary, applied at most once).
   *
   * Runs only on a device with NO star. The account's language is applied AND
   * immediately written as the device star, which is what makes it survive the
   * next sign-out and session expiry: after this, the device owns the choice.
   * A device that already starred something is never overwritten by an account.
   */
  useEffect(() => {
    if (!bootRead || !authSettled || accountSyncedRef.current) return;
    if (star !== null) return;
    accountSyncedRef.current = true;
    void fetchPreferredLanguage().then(({ code, reason }) => {
      if (reason !== null) {
        if (reason !== "no session") console.warn(`[i18n] account language read failed: ${reason}`);
        return;
      }
      if (!isLanguageCode(code)) return;
      setStarState(code);
      writeDeviceStar(code);
      setLanguageState(code);
    });
  }, [bootRead, authSettled, star]);

  // Whatever the source (switcher, storage, URL, account carry), an active
  // language that the gate does not bless is revoked ONCE, as soon as the gate
  // answers (INC-098b): equality-guarded, persisted, and ref-latched so the
  // effect cannot re-fire into a loop. Rendering never waited on this.
  // U4h: a revoked language that was ALSO the device star clears the star, so
  // the next load does not resurrect it.
  useEffect(() => {
    if (!gateReady || !bootRead || reconciledRef.current) return;
    reconciledRef.current = true;
    if (star !== null && star !== BASE_LANGUAGE && !isPublic(star)) {
      setStarState(null);
      writeDeviceStar(null);
    }
    if (language === BASE_LANGUAGE || isPublic(language)) return;
    console.warn(`[i18n] language "${language}" is not published — falling back to base`);
    setLanguageState(BASE_LANGUAGE);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, BASE_LANGUAGE);
    } catch {
      // Storage unavailable; the revocation still applies for this session.
    }
  }, [gateReady, bootRead, isPublic, language, star]);

  // Load the active locale only.
  useEffect(() => {
    let cancelled = false;

    /**
     * D3 runtime flip (U4b), corrected by INC-095: the DB bundle is an OVERLAY
     * on the compiled ACTIVE catalog, never a replacement. The chain is
     * additive and applied lowest-first:
     *
     *   compiled.en  ▸  compiled[lang]  ▸  DB[lang]
     *
     * so an empty, partial or failing bundle is INVISIBLE: the compiled active
     * catalog still answers every key, and compiled English is the last resort.
     */
    const applyWithBundle = (compiled: Messages) => {
      if (cancelled) return;
      const base = { ...en, ...compiled } as Messages;
      setMessages(base);
      // Same settle rule as the gate/entity reads (INC-101b): the compiled
      // catalog answers every key meanwhile, so the wait is invisible.
      if (!authSettled) return;
      void fetchUiBundle(language).then(({ bundle, reason }) => {
        if (cancelled) return;
        if (!bundle) {
          console.warn(`[i18n] bundle fallback for ${language}: ${reason}`);
          return;
        }
        setMessages({ ...base, ...bundle } as Messages);
      });
    };

    if (language === BASE_LANGUAGE) {
      applyWithBundle(en);
      return () => {
        cancelled = true;
      };
    }
    // INC-107 — a missing compiled layer is empty, not fatal: a published,
    // DB-only language loads compiled.en underneath and DB[lang] on top.
    const loader = loaders[language];
    if (!loader) {
      if (!warnedMissingRef.current.has(language)) {
        warnedMissingRef.current.add(language);
        console.warn(`[i18n] no compiled catalog for ${language}; DB-only`);
      }
      applyWithBundle(en);
      return () => {
        cancelled = true;
      };
    }
    void loader().then(applyWithBundle);
    return () => {
      cancelled = true;
    };
  }, [language, authSettled]);

  // U4h — `lang` AND `dir` follow the active language; direction comes from the
  // gate row, so a future RTL language needs no code change here. The server
  // already emitted both from the star cookie; this is the reconciliation.
  useEffect(() => {
    const rtl = publicLanguages.find((row) => row.code === language)?.rtl ?? false;
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [language, publicLanguages]);

  // U4g-21 (INC-113) — the gate snapshot an E2E failure dump reads. Mirrored
  // state only: nothing in the app reads it, and it is written, never watched.
  useEffect(() => {
    (window as unknown as Record<string, unknown>)["__ethioPublicLanguages"] = {
      gateReady,
      active: language,
      star,
      codes: publicLanguages.map((row) => row.code),
    };
  }, [gateReady, language, publicLanguages, star]);

  const value = useMemo<I18nValue>(
    () => ({
      language,
      setLanguage,
      t: (key: MessageKey) => messages[key] ?? en[key],
      entities,
      publicLanguages,
      star,
      setStar,
    }),
    [language, setLanguage, messages, entities, publicLanguages, star, setStar],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
