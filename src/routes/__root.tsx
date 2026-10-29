import { pageHead } from "@/lib/page-head";
import { installInputModality } from "@/lib/input-modality";
import { reloadOnStaleChunk } from "@/lib/stale-chunk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequest, getRequestUrl } from "@tanstack/react-start/server";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "../components/app-shell";
import { StringsLayerGate } from "../components/shell/strings-layer-gate";
import { declaredLayers } from "../components/shell/strings-layers";
import { BASE_LANGUAGE, I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { warmStringsLayers } from "../i18n/compiled-catalog";
import { serverShellLanguage } from "../i18n/server-shell-language";
import { ThemeProvider, THEME_INIT_SCRIPT } from "../providers/theme-provider";
// TYPE ONLY — the judge itself is a server module (import protection keeps
// `src/server/**` out of the client graph); the handler imports it dynamically.
import type { GeoAnswer } from "../server/geo/guess";
import { errorText } from "@/lib/error-text";
import { refreshPage } from "@/lib/on-demand-failure";
import { projectEnv } from "@/lib/supabase-door";
import { Button } from "@/components/ui/button";
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
import type { FirstFeedPage } from "@/features/feed/feed-page";
import { HeldFirstPage } from "@/features/feed/held-first-page";
import {
  CategoryTreeSeedContext,
  type CategoryTreeSeed,
} from "@/features/categories/category-tree";
import { NoInputSchema } from "@/lib/schemas/server-fns";

/**
 * U4h — HEAD-COMPOSITION CENSUS (stated, per the task).
 *
 * `<html lang|dir>` is composed in exactly ONE place: `RootShell` below. Every
 * `<meta>`/`<link>` in the app is composed by a route's `head()` and printed by
 * `<HeadContent />` inside that same shell; there is no other head surface (no
 * react-helmet, no manual document writes). Per-page titles/descriptions stay
 * in their own leaf routes (`index`, `c.$slug`, `settings`, `auth`, `admin`,
 * `dev.*`); the ROOT owns only the app-wide tags and — new here — the hreflang
 * alternates, because they are derived from the publication gate, which is a
 * root-level concern rather than a per-page one.
 */

/** A well-formed language code. Shape only; the client reconciles per gate. */
const CODE_SHAPE = /^[a-z]{2,8}(-[a-z]{2,8})?$/i;

/**
 * The "no guess" answer, restated here because `GEO_NONE` is a VALUE of the
 * server-only judge module and this file is client-reachable. It is the shape
 * `geoGuess` itself returns when the edge said nothing (law 10 — no default).
 */
const NO_GEO: GeoAnswer = {
  country: null,
  regionCode: null,
  city: null,
  lat: null,
  lng: null,
  source: "none",
};

type SsrLangContext = {
  /** The device ★ as the SSR request saw it, or null. */
  star: string | null;
  /** The anon publication gate list, used for hreflang alternates. */
  languages: Array<{ code: string; rtl: boolean }>;
  /** Absolute origin for G1 (absolute canonical/alternate URLs). */
  origin: string;
  /** The request path, so the alternates point at THIS page. */
  path: string;
  /**
   * L4b — THE SAVED AREA as the SSR request saw it: the `ethio_area` cookie,
   * shaped "<CC>:<node id>", or null. Shape only; the shell resolves it against
   * the market's own tree.
   */
  areaCookie: string | null;
  /**
   * L4b-2 — the WHOLE edge answer (DEC-063 amended: country, region code, city
   * and coordinates when the edge provides them; country only until the
   * ethio.com cutover). A GUESS, never a default, and never persisted (law 10).
   */
  geo: GeoAnswer;
  /**
   * D234 S4 — the reads every page makes, preloaded from the page's <head>
   * (src/lib/first-reads.ts). Named by the server for its own document only;
   * a client navigation carries none.
   */
  firstReads: FirstReadLink[];
};

/** The saved-area cookie: "<CC>:<uuid>", or "<CC>:<uuid>:<ms>" since D106, or "everywhere:<ms>" (D219). */
const AREA_COOKIE = "ethio_area";
const AREA_SHAPE =
  /^(?:[A-Za-z]{2}:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(?::\d{1,15})?|everywhere:\d{1,15})$/;

/**
 * Reads the star cookie and the anon publication gate on the server. The gate
 * read is the same anon REST read the client provider performs (INC-110): no
 * session, no auth lock, publishable key only.
 *
 * Law F4 — a failure logs one named line and degrades to "base language only";
 * it never blocks the document.
 */
const LANGUAGE_GATE_TIMEOUT_MS = 1500;
/**
 * D234 S5 — the feed's first page for a listings page, read by the server
 * (src/server/first-screen.ts); null for any other page and on any failure.
 */
const getFirstFeedPage = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async (): Promise<FirstFeedPage | null> => {
    const rawArea = getCookie(AREA_COOKIE) ?? null;
    const { readFirstFeedPage } = await import("../server/first-screen");
    return readFirstFeedPage(getRequest(), rawArea && AREA_SHAPE.test(rawArea) ? rawArea : null);
  });

/** INC-974 — the rail's categories for the first paint (awaited, deadline-bound), or null. */
const getFirstCategoryTree = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async (): Promise<CategoryTreeSeed | null> => {
    // Server-only: the read, its deadline and its log lines never ship to the browser (ruling 2b).
    try {
      const { readFirstCategoryTree } = await import("../server/first-screen");
      return await readFirstCategoryTree(getRequest());
    } catch (error: unknown) {
      console.warn("[first-screen] the rail's categories were not handed over:", errorText(error));
      return null;
    }
  });

/** The root's loader data: the request's language and area facts, and the feed's first page. */
type RootData = SsrLangContext & {
  /** INC-974 — the server's own document only; a client navigation carries none. */
  firstTree: CategoryTreeSeed | null;
  /** D234 S5 — the server's own document only; a client navigation carries none. */
  firstFeed: HeldFirstPage | null;
};

/** Never a rejection: a failed hand-over is one [first-screen] line and the browser reads the feed. */
function startFirstFeedPage(): HeldFirstPage {
  return new HeldFirstPage(
    getFirstFeedPage().catch((error: unknown) => {
      console.warn("[first-screen] the first page was not handed over:", errorText(error));
      return null;
    }),
  );
}

const getSsrLangContext = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async (): Promise<SsrLangContext> => {
    const url = getRequestUrl();
    const raw = getCookie(LANGUAGE_STAR_COOKIE) ?? null;
    const star = raw && CODE_SHAPE.test(raw) ? raw : null;

    // L4b — two more request facts, NO database call added to the root: the
    // saved area (shape-validated cookie) and the edge's country guess. The
    // judge is the shared server helper; it is imported inside the handler so
    // the server-only module never enters the client graph.
    const rawArea = getCookie(AREA_COOKIE) ?? null;
    const areaCookie = rawArea && AREA_SHAPE.test(rawArea) ? rawArea : null;
    let geo: GeoAnswer = NO_GEO;
    try {
      const { geoGuess } = await import("../server/geo/guess");
      geo = geoGuess(getRequest());
    } catch (error) {
      console.error("[ssr-error] /__root geo guess threw", errorText(error));
    }

    // Turn 34c-2 — the project's address and key through the door (CF-PROJECT-1): the same
    // resolution order as the generated client (dev serves VITE_*; the deployed Worker serves the
    // unprefixed pair).
    const project = projectEnv();
    let languages: Array<{ code: string; rtl: boolean }> = [];
    if (project !== null) {
      try {
        const { upstream } = await import("../server/upstream");
        const response = await upstream(
          `${project.url}/rest/v1/languages?select=code,rtl&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc`,
          { headers: { apikey: project.key, accept: "application/json" }, cache: "no-store" },
          { timeoutMs: LANGUAGE_GATE_TIMEOUT_MS, label: "ssr language gate" },
        );
        if (response.ok) {
          const rows = (await response.json()) as Array<{ code: string; rtl: boolean }>;
          if (Array.isArray(rows)) languages = rows;
        } else {
          console.error("[ssr-error] /__root gate fetch failed", response.status);
        }
      } catch (error) {
        console.error("[ssr-error] /__root gate fetch threw", errorText(error));
      }
    }

    const firstReads = firstReadLinks({
      areaCookie,
      star,
      requested: url.searchParams.get("lang"),
      languages,
      base: BASE_LANGUAGE,
    });
    return { star, languages, origin: url.origin, path: url.pathname, areaCookie, geo, firstReads };
  });

/** Surfaces that are not indexed and therefore carry no hreflang set. */
function isPublicPath(path: string): boolean {
  return !/^\/(admin|settings|auth|dev)(\/|$)/.test(path);
}

function NotFoundContent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("error.pageNotFound")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("error.pageNotFoundBody")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("common.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <I18nProvider>
      <NotFoundContent />
    </I18nProvider>
  );
}

function ErrorContent({ error }: ErrorComponentProps) {
  const { t } = useI18n();
  useEffect(() => {
    // The router hands `unknown`; narrow before reading the message.
    // eslint-disable-next-line no-restricted-syntax -- the report takes an Error instance
    reportLovableError(error instanceof Error ? error : new Error(errorText(error)), {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("error.pageFailed")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("error.pageFailedBody")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {/* INC-918 (Foundations turn 34c) — the one cure that always works: a fresh load. "Try
              again" re-ran the loaders in this page, and a download that failed (the page's code,
              the session's client) fails again until the page reloads. */}
          <Button type="button" data-testid="route-error-refresh" onClick={refreshPage}>
            {t("common.refreshPage")}
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("common.goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  return (
    <I18nProvider>
      <ErrorContent error={error} reset={reset} />
    </I18nProvider>
  );
}

/** DEC-195 — the photo server's origin: the public Supabase address's origin, or null when unset or unparsable. */
const PHOTO_ORIGIN = (() => {
  try {
    // Turn 34c-2 — the project's address through the door (CF-PROJECT-1), as the loader reads it.
    // Never a hard-coded URL.
    const project = projectEnv();
    return project === null ? null : new URL(project.url).origin;
  } catch {
    return null;
  }
})();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // DEC-258 — a navigation (or a link's preload) to a route that declares
  // strings layers starts their download here, before the route's own code and
  // data arrive, so the shell's gate seldom waits.
  beforeLoad: ({ matches }) => {
    if (typeof window === "undefined") return;
    const layers = declaredLayers(matches.map((match) => match.staticData));
    if (layers.length > 0) {
      warmStringsLayers(layers, [BASE_LANGUAGE, document.documentElement.lang]);
    }
  },
  // The origin/path are re-read on the client so a client-side navigation's
  // alternates point at the page the visitor is actually on, not at the
  // server-function URL the RPC was issued against.
  loader: async (): Promise<RootData> => {
    // D234 S5 — the server starts the feed's first page at once and hands it over
    // unawaited: the page's shell is sent without waiting, the page streams in.
    const firstFeed = typeof window === "undefined" ? startFirstFeedPage() : null;
    // INC-974 — the rail's categories are awaited (the names belong in the first HTML),
    // beside the language facts, never on a client navigation.
    const [data, firstTree] =
      typeof window === "undefined"
        ? await Promise.all([getSsrLangContext(), getFirstCategoryTree()])
        : [await getSsrLangContext(), null];
    if (typeof window === "undefined") return { ...data, firstFeed, firstTree };
    return {
      ...data,
      origin: window.location.origin,
      path: window.location.pathname,
      firstReads: [],
      firstFeed: null,
      firstTree,
    };
  },
  // DEC-272 (Foundations turn 34w-2, INC-927) — the root's facts (the published languages, the
  // language star, the saved area, the edge's guess) are read once per page load. The router read
  // them again from the server on a navigation to the page already shown (it reloads every
  // loader of a same-href navigation): a round trip for nothing online, and offline a failed read
  // whose error view replaced the whole app — the offline sign-out's move to "/" from "/" (SO-12).
  // A navigation elsewhere never re-read them; a fresh load reads them again (the error view's
  // Refresh, turn 34c).
  shouldReload: false,
  head: ({ loaderData }) => ({
    meta: [
      ...pageHead("app.name", "head.site.description").meta,
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "ethio-marketplace" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ethio_market" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // D234 S4 — the reads every page makes start with the page (src/lib/first-reads.ts).
      ...(loaderData?.firstReads ?? []),
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // DEC-262 — no web font: the page draws with the device's own fonts
      // (src/styles.css --font-sans), so nothing waits on a font server.
      // DEC-195 — an early connection to the photo server's origin (the
      // project's own Supabase address, read from the public env, never
      // hard-coded), so the first cards' photos start sooner.
      ...(PHOTO_ORIGIN === null
        ? []
        : [
            { rel: "preconnect", href: PHOTO_ORIGIN },
            { rel: "dns-prefetch", href: PHOTO_ORIGIN },
          ]),
    ],
    // NO FLASH OF WRONG THEME: this runs in <head>, before the body paints, so
    // data-mode + the .dark class are already correct on the first frame.
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * U4h (G1) — DYNAMIC hreflang: one alternate per PUBLISHED language plus
 * x-default, read from the anon publication gate rather than a hardcoded list,
 * so publishing a language in the console changes the emitted set with no code
 * change. Absolute URLs; public pages only. Rendered in the shell's <head>
 * rather than through `head()` because it is derived from the ROOT loader's
 * data, which the root's own `head()` is composed too early to see.
 */
function alternateLinks(data: SsrLangContext | undefined) {
  if (!data || !isPublicPath(data.path) || data.languages.length === 0) return [];
  const url = (code?: string) =>
    `${data.origin}${data.path}${code ? `?lang=${encodeURIComponent(code)}` : ""}`;
  return [
    ...data.languages.map((row) => ({
      rel: "alternate",
      hrefLang: row.code,
      href: url(row.code),
    })),
    { rel: "alternate", hrefLang: "x-default", href: url() },
  ];
}

function RootShell({ children }: { children: ReactNode }) {
  // INC-872 — the first byte declares the text it carries: the server renders
  // the base catalog, so `<html lang|dir>` are the base language's. The client
  // switches them once the star language's catalog is applied (provider.tsx).
  const data = useRouterState({
    select: (state) => state.matches[0]?.loaderData as SsrLangContext | undefined,
  });
  const { lang, dir } = serverShellLanguage(data?.languages ?? []);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <HeadContent />
        {alternateLinks(data).map((link) => (
          <link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // INC-974 — the rail's first-paint seed, from this request's loader data (never module state).
  const firstTree = Route.useLoaderData({ select: (data) => data.firstTree });

  useEffect(() => {
    // INC-085f — the E2E hydration contract: set only after React has
    // successfully hydrated; a client crash before this leaves it unset.
    document.documentElement.dataset["appReady"] = "1";
    const uninstallModality = installInputModality();
    // INC-640 — a tab opened before a Publish reloads once when a chunk it asks for is gone.
    const uninstallStaleChunk = reloadOnStaleChunk(window);
    return () => {
      uninstallModality();
      uninstallStaleChunk();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <CategoryTreeSeedContext.Provider value={firstTree}>
            <AppShell>
              {/* DEC-258 — a route that declares strings layers draws once they are in. */}
              <StringsLayerGate>
                {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
                <Outlet />
              </StringsLayerGate>
            </AppShell>
          </CategoryTreeSeedContext.Provider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
