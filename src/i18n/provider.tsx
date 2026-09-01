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

import { supabase } from "@/integrations/supabase/client";

import { fetchEntityBundle, fetchUiBundle } from "./bundle";
import { EMPTY_ENTITY_BUNDLE, type EntityBundle } from "./entity";
import { en } from "./locales/en";
import { type Language, type MessageKey, type Messages } from "./types";

export const LANGUAGE_STORAGE_KEY = "ethio.lang";

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
    "&order=sort.asc" +
    // U4g-21 (INC-113) — INVARIANT: A GATE LIST IS NEVER CACHED ACROSS LOADS.
    // Publication is an operator decision that must be visible on the NEXT page
    // load, so this read is uncacheable by construction: `cache: "no-store"`
    // plus a per-request busting parameter defeats the HTTP cache, any
    // intermediary, and any future service worker that might match the URL.
    // (Census 2026-09-01: this project registers NO service worker — no
    // VitePWA plugin, no src/sw*, no public/sw.js — so nothing caches
    // /rest/v1/* today; the invariant is enforced here, at the request, so it
    // survives REQ-039 landing a worker later.)
    `&_ts=${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    const response = await fetch(`${url}/rest/v1/languages?${query}`, {
      cache: "no-store",
      headers: {
        apikey: key,
        accept: "application/json",
        "cache-control": "no-cache",
      },
    });
    if (!response.ok) return null;
    const rows = (await response.json()) as PublicLanguage[];
    return Array.isArray(rows) ? rows : null;
  } catch {
    return null;
  }
}


type I18nValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: MessageKey) => string;
  /** U4d — approved entity names for the active language (overlay, never a replacement). */
  entities: EntityBundle;
  /** U4f — the publication gate's own list; the switcher renders exactly this. */
  publicLanguages: PublicLanguage[];
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
function useAuthSettled(): boolean {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const raise = () => {
      if (!cancelled) setSettled(true);
    };
    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      // No Supabase call here: only a deferred flag flip.
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

  return settled;
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
  /** Loop guard (INC-098b): the gate revokes an unpublished language AT MOST once. */
  const reconciledRef = useRef(false);
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

  // Restore the requested choice after hydration: URL override first, then the
  // persisted preference. INC-107: neither source is validated against the
  // COMPILED registry — a DB-only language is a legitimate preference — only
  // against the code SHAPE here and against the publication gate below.
  useEffect(() => {
    const fromUrl = requestedFromUrl();
    if (fromUrl !== null) {
      if (isLanguageCode(fromUrl)) setLanguageState(fromUrl);
      else console.warn(`[i18n] language "${fromUrl}" is not published — falling back to base`);
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

  // Whatever the source (switcher, storage, URL), an active language that the
  // gate does not bless is revoked ONCE, as soon as the gate answers
  // (INC-098b): equality-guarded, persisted, and ref-latched so the effect
  // cannot re-fire into a loop. Rendering never waited on this.
  useEffect(() => {
    if (!gateReady || reconciledRef.current) return;
    reconciledRef.current = true;
    if (language === BASE_LANGUAGE || isPublic(language)) return;
    console.warn(`[i18n] language "${language}" is not published — falling back to base`);
    setLanguageState(BASE_LANGUAGE);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, BASE_LANGUAGE);
    } catch {
      // Storage unavailable; the revocation still applies for this session.
    }
  }, [gateReady, isPublic, language]);

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

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // U4g-21 (INC-113) — the gate snapshot an E2E failure dump reads. Mirrored
  // state only: nothing in the app reads it, and it is written, never watched.
  useEffect(() => {
    (window as unknown as Record<string, unknown>)["__ethioPublicLanguages"] = {
      gateReady,
      active: language,
      codes: publicLanguages.map((row) => row.code),
    };
  }, [gateReady, language, publicLanguages]);


  const value = useMemo<I18nValue>(
    () => ({
      language,
      setLanguage,
      t: (key: MessageKey) => messages[key] ?? en[key],
      entities,
      publicLanguages,
    }),
    [language, setLanguage, messages, entities, publicLanguages],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
