import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestUrl } from "@tanstack/react-start/server";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppShell } from "../components/app-shell";
import { I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { ThemeProvider, THEME_INIT_SCRIPT } from "../providers/theme-provider";

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

type SsrLangContext = {
  /** The device ★ as the SSR request saw it, or null. */
  star: string | null;
  /** The anon publication gate list, used for hreflang alternates. */
  languages: Array<{ code: string; rtl: boolean }>;
  /** Absolute origin for G1 (absolute canonical/alternate URLs). */
  origin: string;
  /** The request path, so the alternates point at THIS page. */
  path: string;
};

/**
 * Reads the star cookie and the anon publication gate on the server. The gate
 * read is the same anon REST read the client provider performs (INC-110): no
 * session, no auth lock, publishable key only.
 *
 * Law F4 — a failure logs one named line and degrades to "base language only";
 * it never blocks the document.
 */
const getSsrLangContext = createServerFn({ method: "GET" }).handler(
  async (): Promise<SsrLangContext> => {
    const url = getRequestUrl();
    const raw = getCookie(LANGUAGE_STAR_COOKIE) ?? null;
    const star = raw && CODE_SHAPE.test(raw) ? raw : null;

    // Same resolution order as the generated client (dev serves VITE_*; the
    // deployed Worker serves the unprefixed pair).
    const base = import.meta.env.VITE_SUPABASE_URL || process.env["SUPABASE_URL"];
    const key =
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env["SUPABASE_PUBLISHABLE_KEY"];
    let languages: Array<{ code: string; rtl: boolean }> = [];
    if (base && key) {
      try {
        const response = await fetch(
          `${base}/rest/v1/languages?select=code,rtl&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc`,
          { headers: { apikey: key, accept: "application/json" }, cache: "no-store" },
        );
        if (response.ok) {
          const rows = (await response.json()) as Array<{ code: string; rtl: boolean }>;
          if (Array.isArray(rows)) languages = rows;
        } else {
          console.error("[ssr-error] /__root gate fetch failed", response.status);
        }
      } catch (error) {
        console.error("[ssr-error] /__root gate fetch threw", (error as Error).message);
      }
    }

    return { star, languages, origin: url.origin, path: url.pathname };
  },
);

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

function ErrorContent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("error.pageFailed")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("error.pageFailedBody")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("common.tryAgain")}
          </button>
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <I18nProvider>
      <ErrorContent error={error} reset={reset} />
    </I18nProvider>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // The origin/path are re-read on the client so a client-side navigation's
  // alternates point at the page the visitor is actually on, not at the
  // server-function URL the RPC was issued against.
  loader: async (): Promise<SsrLangContext> => {
    const data = await getSsrLangContext();
    if (typeof window === "undefined") return data;
    return { ...data, origin: window.location.origin, path: window.location.pathname };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ethio.com" },
      { name: "description", content: "Ethiopia's marketplace — coming soon." },
      { name: "author", content: "ethio-marketplace" },
      { property: "og:title", content: "ethio.com" },
      { property: "og:description", content: "Ethiopia's marketplace — coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ethio_market" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Fonts: Inter (Latin body), Bricolage Grotesque (display), Noto Sans
      // Ethiopic (Ge'ez). Loaded as <link> — Lightning CSS cannot resolve a
      // remote @import from src/styles.css.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600&display=swap&subset=ethiopic",
      },
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
  // U4h — the FIRST byte already carries the device's language and direction:
  // the star cookie is the only channel SSR can read, and it is validated by
  // SHAPE alone here (the client reconciles it against the publication gate).
  const data = useRouterState({
    select: (state) => state.matches[0]?.loaderData as SsrLangContext | undefined,
  });
  const star = data?.star ?? null;
  const dir = star && data?.languages.find((row) => row.code === star)?.rtl ? "rtl" : "ltr";

  return (
    <html lang={star ?? "en"} dir={dir} suppressHydrationWarning>
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

  useEffect(() => {
    // INC-085f — the E2E hydration contract: set only after React has
    // successfully hydrated; a client crash before this leaves it unset.
    document.documentElement.dataset["appReady"] = "1";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <AppShell>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </AppShell>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
