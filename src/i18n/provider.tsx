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
import { isE2E } from "@/lib/env-flags";

import { loadOnce } from "@/lib/load-once";

const pageHeadClient = loadOnce(() => import("@/lib/page-head-client"));

import { errorText } from "@/lib/error-text";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { onAuthChange, projectEnv } from "@/lib/supabase-door";

import { fetchEntityBundle, fetchUiBundle } from "./bundle";
import { EMPTY_ENTITY_BUNDLE, type EntityBundle } from "./entity";
import { enBase } from "./locales/en-base";
import {
  STRINGS_LAYERS,
  compiledCatalogLoader,
  compiledLayerLoader,
  isStringsLayer,
  layerOutcome,
  type StringsLayer,
} from "./compiled-catalog";
import { type Language, type MessageKey, type Messages } from "./types";

/**
 * DEC-231 — the English FIRST-PAINT part, typed as the full catalog so the
 * provider's state and fallback chain keep their shape. A layer's keys
 * (DEC-258: admin, member) are undefined until the layer loads; the shell's
 * gate waits for them before a route that declares the layer draws.
 */
const enFirstPaint = enBase as unknown as Messages;

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

// INC-107 — the compiled-catalog registry and its own-key lookup live in
// ./compiled-catalog (Part H1).

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
  // Turn 34c-2 — the project's address and key through the door (CF-PROJECT-1).
  const project = projectEnv();
  if (project === null) return null;
  const { url, key } = project;
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
  if (!response) {
    // INC-202 — a THROWN attempt (offline blip, aborted socket) used to fall
    // straight through to the base-language fallback while an error RESPONSE
    // got a retry. Both failure shapes now get exactly one retry.
    console.error("[client-error] gate fetch threw");
    response = await attemptOnce();
  }
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
  t: (key: MessageKey) => string;
  /** U4d — approved entity names for the active language (overlay, never a replacement). */
  entities: EntityBundle;
  /** U4f — the publication gate's own list; the switcher renders exactly this. */
  publicLanguages: PublicLanguage[];
  /** U4h — the DEVICE ★: the one favourite, or null when the device never chose. */
  star: string | null;
  /** U4h — star a language: it becomes the device default AND the active language. */
  setStar: (code: Language) => void;
  /** DEC-258 — each strings layer's state: idle until a route that shows it asks. */
  layerStates: Record<StringsLayer, LayerState>;
  /** DEC-258 — ask for a strings layer (a failed one is asked again by the next screen that needs it). */
  requestStringsLayer: (layer: StringsLayer) => void;
};

/** DEC-258 — where a strings layer's load stands. */
export type LayerState = "idle" | "loading" | "ready" | "failed";

function everyLayer<T>(value: T): Record<StringsLayer, T> {
  return Object.fromEntries(STRINGS_LAYERS.map((layer) => [layer, value])) as Record<
    StringsLayer,
    T
  >;
}

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
    // DEC-261 — through the client's door: a signed-out visitor settles without the client.
    const subscription = onAuthChange((_event, session) => {
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
      subscription.unsubscribe();
    };
  }, []);

  return { settled, userId };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(BASE_LANGUAGE);
  const [messages, setMessages] = useState<Messages>(enFirstPaint);
  // INC-872 — the language whose compiled layer `messages` holds: the ONE source
  // of `<html lang|dir>`. `language` is the selection; this follows it only when
  // its catalog is applied, so the page never declares text it does not carry.
  const [appliedLanguage, setAppliedLanguage] = useState<Language>(BASE_LANGUAGE);
  // DEC-258 — a strings layer loads only when a route that shows it asks
  // (useStringsLayers, through the shell's gate). Each layer's request count is
  // its retry counter: each request, first or repeated, re-runs the load effect.
  const [layerStates, setLayerStates] = useState<Record<StringsLayer, LayerState>>(() =>
    everyLayer<LayerState>("idle"),
  );
  const [layerRequests, setLayerRequests] = useState<Record<StringsLayer, number>>(() =>
    everyLayer(0),
  );
  // A layer already in is not asked again: a screen that mounts later finds it ready.
  const layerStatesRef = useRef(layerStates);
  useEffect(() => {
    layerStatesRef.current = layerStates;
  }, [layerStates]);
  const requestStringsLayer = useCallback((layer: StringsLayer) => {
    if (layerStatesRef.current[layer] === "ready") return;
    setLayerRequests((current) => ({ ...current, [layer]: current[layer] + 1 }));
    setLayerStates((current) =>
      current[layer] === "ready" ? current : { ...current, [layer]: "loading" },
    );
  }, []);
  // U4d — entity names for the active language. Identity is stable while the
  // language is unchanged and the fetch is pending (INC-090 identity law).
  const [entities, setEntities] = useState<EntityBundle>(EMPTY_ENTITY_BUNDLE);
  // U4f/U4f-2 (INC-098b) — the publication gate's list. The seed answers the
  // FIRST frame; the real list arrives asynchronously. The root provider never
  // waits on the network: nothing here gates the tree.
  const [publicLanguages, setPublicLanguages] = useState<PublicLanguage[]>(SEED_PUBLIC_LANGUAGES);
  const [gateReady, setGateReady] = useState(false);
  /** INC-202 — true only when the gate never answered and the base-only fallback ran. */
  const [gateDegraded, setGateDegraded] = useState(false);
  /** U4h — the device ★ (null until the boot read runs; SSR never reads storage). */
  const [star, setStarState] = useState<string | null>(null);
  /** U4h — the boot read has run, so "no star" now MEANS no star. */
  const [bootRead, setBootRead] = useState(false);
  /** Loop guard (INC-098b): the gate revokes an unpublished language AT MOST once. */
  const reconciledRef = useRef(false);
  /**
   * U4h/INC-121 (a) — the account carry is applied AT MOST once PER SIGNED-IN
   * IDENTITY, not once per mount: the provider mounts on /auth while signed
   * out, and a once-per-mount latch consumed the attempt before any session
   * existed, so the carry never ran for the user who then signed in.
   */
  const carriedForRef = useRef<string | null>(null);
  /** INC-107 — one warning per DB-only language, never one per effect run. */
  const warnedMissingRef = useRef<Set<string>>(new Set());
  /** INC-816 — each layer's English part, once loaded, is kept for later runs. */
  const enLayersRef = useRef<Partial<Record<StringsLayer, Partial<Messages>>>>({});
  const { settled: authSettled, userId } = useAuthIdentity();

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
        // INC-202 — the fallback is NAMED in the mirror, so a dump can tell
        // "the gate says base only" from "the gate never answered" (F4).
        setGateDegraded(true);
        setGateReady(true);
        return;
      }
      setPublicLanguages(rows);
      setGateDegraded(false);
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

  // Restore the requested choice after hydration. DEVICE PRECEDENCE (U4h, amended by D239):
  //   URL override  ▸  device ★  ▸  last used language  ▸  base
  // D239: this is the device's chain at boot; at session start the ACCOUNT
  // RULE below decides over it (a published account language replaces the
  // device's choice).
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
   * D239 — THE ACCOUNT RULE (the one place; it replaces U4h's carry).
   *
   * At SESSION START — each new sign-in and each page load that finds a
   * session — the account decides, once the publication gate has answered:
   *  - a published `preferred_language` replaces the device's choice: the star
   *    (localStorage + cookie) and the current choice follow, and the account
   *    is not written;
   *  - an account with none receives the device's current language, only when
   *    that language is on the gate's list;
   *  - an unpublished account code changes nothing: the device keeps its
   *    choice and the account keeps its code, which applies once published;
   *  - a failed read keeps the device's choice, logs one named line and writes
   *    nothing.
   * A `?lang=` URL view is a view, not a choice: on such a page load the rule
   * waits for the next session start rather than overriding the link.
   * Every sign-in door reaches this effect through the auth event and the
   * user-id latch; no door carries its own language code.
   *
   * INC-121 (a) LAW — A ONCE-PER-MOUNT LATCH MUST NOT GUARD A SESSION-DEPENDENT
   * READ. Signing in is an in-page transition (no remount), so the latch is
   * keyed by the signed-in user id and released on sign-out. A token refresh
   * keeps the id, so it never re-runs the rule.
   */
  const languageRef = useRef(language);
  useEffect(() => {
    languageRef.current = language;
  }, [language]);
  useEffect(() => {
    if (!bootRead || !authSettled || !gateReady) return;
    if (userId === null) {
      // Signed out: nothing to decide; the next sign-in gets its own attempt.
      carriedForRef.current = null;
      return;
    }
    if (carriedForRef.current === userId) return;
    carriedForRef.current = userId;
    if (requestedFromUrl() !== null) return;
    void fetchPreferredLanguage()
      .then((read) => {
        if (!read.ok) {
          if (!read.signedOut) {
            console.warn(`[i18n] account language read failed: ${read.error.failure.message}`);
          }
          return;
        }
        const code = read.code;
        if (code === null) {
          const current = languageRef.current;
          if (!isPublic(current)) return;
          void savePreferredLanguage(current).then((result) => {
            if (!result.ok && result.reason !== "no session") {
              console.warn(`[i18n] account language save failed for ${current}: ${result.reason}`);
            }
          });
          return;
        }
        if (!isLanguageCode(code) || !isPublic(code)) return;
        setStarState(code);
        writeDeviceStar(code);
        setLanguageState(code);
        try {
          window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
        } catch {
          // Storage unavailable; the star cookie still carries the choice.
        }
      })
      .catch((error: unknown) => {
        // The read's own code did not download (reported to the shell's notice): the
        // device keeps its choice and nothing is written.
        console.warn(`[i18n] account language read failed: ${errorText(error)}`);
      });
  }, [bootRead, authSettled, gateReady, userId, isPublic]);

  /**
   * D239 R4 (closes D237's gap) — EVERY OPEN TAB FOLLOWS THE STAR. Another
   * tab's pick or account switch writes the star; this tab takes it after the
   * same shape and gate checks, and never writes the account.
   */
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STAR_STORAGE_KEY) return;
      const code = event.newValue;
      if (!isLanguageCode(code)) return;
      if (gateReady && !isPublic(code)) return;
      setStarState((current) => (current === code ? current : code));
      setLanguageState((current) => (current === code ? current : code));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [gateReady, isPublic]);

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

  // Load the active locale only; a strings layer joins it once a route asks.
  useEffect(() => {
    let cancelled = false;
    const wanted = STRINGS_LAYERS.filter((layer) => layerRequests[layer] > 0);

    /**
     * D3 runtime flip (U4b), corrected by INC-095: the DB bundle is an OVERLAY
     * on the compiled ACTIVE catalog, never a replacement. The chain is
     * additive and applied lowest-first:
     *
     *   en-base  ▸  en-<layers>  ▸  compiled[lang]  ▸  compiled[lang]-<layers>  ▸  DB[lang]
     *
     * (DEC-231, DEC-258: a strings layer's two parts enter the chain only once
     * a route asked for it, in STRINGS_LAYERS order; until then the first
     * paint is en-base ▸ compiled[lang] ▸ DB[lang]) so an empty, partial or
     * failing bundle is INVISIBLE: the compiled active catalog still answers
     * every key, and compiled English is the last resort.
     */
    const applyWithBundle = (
      compiled: Partial<Messages>,
      parts: { en: Partial<Messages> | null; lang: Partial<Messages> | null }[],
    ) => {
      if (cancelled) return;
      const merge = (pick: (part: (typeof parts)[number]) => Partial<Messages> | null) =>
        parts.reduce<Partial<Messages>>((all, part) => ({ ...all, ...(pick(part) ?? {}) }), {});
      const base = {
        ...enFirstPaint,
        ...merge((part) => part.en),
        ...compiled,
        ...merge((part) => part.lang),
      } as Messages;
      setMessages(base);
      setAppliedLanguage(language);
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

    const run = async () => {
      // The compiled base layer for the active language (English is en-base).
      let compiled: Partial<Messages> = {};
      if (language !== BASE_LANGUAGE) {
        // INC-107 — a missing compiled layer is empty, not fatal: a published,
        // DB-only language loads the English first-paint part underneath and
        // DB[lang] on top.
        const loader = compiledCatalogLoader(language);
        if (!loader) {
          if (!warnedMissingRef.current.has(language)) {
            warnedMissingRef.current.add(language);
            console.warn(`[i18n] no compiled catalog for ${language}; DB-only`);
          }
        } else {
          // INC-919 — a failed download of the language's compiled base was an unhandled
          // rejection: nothing applied and nothing said so. It now leaves the base empty (the
          // English first-paint part underneath and the database's rows on top, as for a
          // DB-only language) and is reported to the shell's one notice (INC-911), which offers
          // to refresh the page — the browser keeps a failed download for the page's life.
          try {
            compiled = await loader();
          } catch (reason) {
            reportOnDemandFailure(`the ${language} strings`, reason);
          }
        }
      }
      if (cancelled) return;
      // INC-816 — per layer, two separate tries: the English part (kept once
      // loaded) and the language's own part; a failed language part never
      // blanks the layer's text.
      const loaded = await Promise.all(
        wanted.map(async (layer) => {
          let en: Partial<Messages> | null = enLayersRef.current[layer] ?? null;
          try {
            const enLoader = compiledLayerLoader(layer, BASE_LANGUAGE);
            const part = enLoader ? await enLoader() : {};
            enLayersRef.current[layer] = part;
            en = part;
          } catch (reason) {
            // F4 — never silent: the kept part, if any, still applies.
            console.error(
              `[i18n] ${layer} strings for ${BASE_LANGUAGE} failed: ${errorText(reason)}`,
            );
          }
          let lang: Partial<Messages> | null = null;
          if (language !== BASE_LANGUAGE) {
            try {
              const langLoader = compiledLayerLoader(layer, language);
              lang = langLoader ? await langLoader() : null;
            } catch (reason) {
              // F4 — never silent, never blank: the English part still applies, and (INC-911)
              // the shell's one notice says part of the page did not load and offers a refresh.
              reportOnDemandFailure(`the ${layer} strings for ${language}`, reason);
            }
          }
          return { layer, en, lang };
        }),
      );
      if (cancelled) return;
      applyWithBundle(
        compiled,
        loaded.map(({ en, lang }) => layerOutcome({ en, lang, wasReady: false })),
      );
      if (loaded.length === 0 || cancelled) return;
      setLayerStates((current) => {
        const next = { ...current };
        for (const { layer, en, lang } of loaded) {
          next[layer] = layerOutcome({ en, lang, wasReady: current[layer] === "ready" }).state;
        }
        return next;
      });
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [language, authSettled, layerRequests]);

  // INC-872 — `lang` AND `dir` follow the APPLIED catalog, never the selection:
  // they change in the same commit as the text. Direction comes from the gate
  // row, so a future RTL language needs no code change here. The server
  // declared the base language it renders; this is the switch.
  useEffect(() => {
    const rtl = publicLanguages.find((row) => row.code === appliedLanguage)?.rtl ?? false;
    document.documentElement.lang = appliedLanguage;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    if (appliedLanguage === BASE_LANGUAGE && pageHeadClient.ready() === null) return;
    let cancelled = false;
    void pageHeadClient.load().then(
      (head) => {
        if (!cancelled) head.applyPageHead((key) => messages[key] ?? enFirstPaint[key]);
      },
      (reason: unknown) => reportOnDemandFailure("page head", reason),
    );
    return () => {
      cancelled = true;
    };
  }, [appliedLanguage, publicLanguages, messages]);

  // U4g-21 (INC-113) — the gate snapshot an E2E failure dump reads. Mirrored
  // state only: nothing in the app reads it, and it is written, never watched.
  // INC-621 — a test instrument, so gated on `isE2E` (DEC-018): a production
  // build never writes it.
  useEffect(() => {
    if (!isE2E) return;
    (window as unknown as Record<string, unknown>)["__ethioPublicLanguages"] = {
      gateReady,
      degraded: gateDegraded,
      active: language,
      star,
      codes: publicLanguages.map((row) => row.code),
    };
  }, [gateReady, gateDegraded, language, publicLanguages, star]);

  const value = useMemo<I18nValue>(
    () => ({
      language,
      t: (key: MessageKey) => messages[key] ?? enFirstPaint[key],
      entities,
      publicLanguages,
      star,
      setStar,
      layerStates,
      requestStringsLayer,
    }),
    [
      language,
      messages,
      entities,
      publicLanguages,
      star,
      setStar,
      layerStates,
      requestStringsLayer,
    ],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

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
