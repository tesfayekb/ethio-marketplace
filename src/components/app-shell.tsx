import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { AppFooter } from "@/components/shell/app-footer";
import { AppHeader } from "@/components/shell/app-header";
import { AppRail } from "@/components/shell/app-rail";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
import { LocationSelector } from "@/components/shell/location-selector";
import { PanelTabs } from "@/components/shell/panel-tabs";
import type { PanelAuthContext, PanelId } from "@/config/panels.types";
import { useAuth } from "@/features/auth/use-auth";
import { useCategories } from "@/features/feed/use-feed";
import type { AuthUser } from "@/features/auth/types";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { AUTH_DERIVED_ROOT, usePermissions } from "@/features/permissions/usePermissions";
import {
  clearSessionClocks,
  startSessionClocks,
  useSessionPolicy,
  type SessionExpiryReason,
} from "@/features/session/session-policy";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { RAIL_INIT_SCRIPT } from "@/providers/rail-state";

/** One node of the chosen geographic path (country -> region -> city -> …). */
export type LocationNode = {
  id: string;
  name_en: string;
  name_am: string | null;
  level: string;
  parent_id: string | null;
};

type ShellValue = {
  auth: PanelAuthContext;
  user: AuthUser | null;
  /** True while the session is still unknown (SSR / first load). */
  authLoading: boolean;
  /**
   * U0k (INC-072 addendum) — ONE-CLICK sign-out. Every affordance calls this
   * directly and it performs the whole hard reset; there is no confirmation
   * step (a confirm dialog reintroduces the walk-away exposure it pretends to
   * prevent, and sign-out is non-destructive and instantly reversible).
   */
  requestSignOut: () => void;
  activePanel: PanelId;
  setActivePanel: (panel: PanelId) => void;
  /**
   * U0l (INC-073) — DERIVED FROM THE URL, never settable state. The rail
   * navigates to /c/<slug>; body, breadcrumb and highlight all read this.
   */
  selectedCategorySlug: string | null;
  selectedCategoryId: string | null;
  /** The cascading area selection. SEAM: set here, not yet applied to the feed. */
  locationPath: LocationNode[];
  setLocationPath: (path: LocationNode[]) => void;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  /** U0l-2 (SO-2): true while the hard-reset sign-out sequence is running. */
  signingOut: boolean;
};

const ShellContext = createContext<ShellValue | null>(null);

export function useShell(): ShellValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within <AppShell>");
  return ctx;
}

/** Body shown for panels whose real pages are later features. */
function PanelPlaceholder() {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h1 className="text-lg font-semibold text-foreground">{t("shell.placeholderTitle")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("shell.placeholderBody")}</p>
    </div>
  );
}

/**
 * THE CORNER-BLOCK GRID + THE VERTICAL STACK.
 *
 * From md up the shell is a two-column CSS grid whose first column is the rail
 * width (16rem) and whose first row is the top-bar height (4rem):
 *
 *   ┌──────────┬─────────────────────────┐
 *   │ LOGO     │ top bar                 │  row 1 = 4rem
 *   ├──────────┼─────────────────────────┤
 *   │ rail     │ panel tabs              │  row 2 = 1fr
 *   │          │ location row            │
 *   │          │ breadcrumbs             │
 *   │          │ body                    │
 *   ├──────────┴─────────────────────────┤
 *   │ footer (spans both columns)        │  row 3 = auto
 *   └────────────────────────────────────┘
 *
 * Alignment is EXACT, not approximate, because the logo cell and the rail are
 * the SAME grid column (so identical width by construction) and the logo cell
 * and the top bar are the SAME grid row (so identical height by construction).
 * Both column-1 cells carry `border-e`, which makes the sidebar's edge ONE
 * continuous vertical hairline running from the very top of the logo cell
 * straight down past the rail.
 *
 * THE STACK (bands 2-4) lives in the content column, right of the rail, and
 * stacks full-width below the bar on mobile. Their spacing is SYMMETRIC and
 * tight: each band is a flat full-width strip separated only by its own
 * hairline `border-b`, so the panel-tab row's gap above (to the bar) equals its
 * gap below (to the location row) by construction — there is no gap to tune.
 * Bands that render nothing (panel tabs when logged out) collapse completely.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { user, loading: authLoading, signOut } = useAuth();
  const [panelChoice, setPanelChoice] = useState<PanelId>("marketplace");
  const [locationPath, setLocationPath] = useState<LocationNode[]>([]);
  const [navOpen, setNavOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /**
   * INC-058 — PANEL/ROUTE DESYNC. `activePanel` used to be pure client state
   * defaulting to "marketplace", so a real route such as /settings rendered its
   * page beside the MARKETPLACE category rail. The panel is now DERIVED: a
   * route that belongs to a panel owns the panel while it is open.
   */
  const routePanel: PanelId | null = pathname.startsWith("/settings")
    ? "account"
    : pathname.startsWith("/admin")
      ? "admin"
      : null;
  /** The marketplace feed is "/" and every category route /c/<slug>. */
  const isFeedRoute = pathname === "/" || pathname.startsWith("/c/");

  /**
   * U0l (INC-073) — the ONE source of truth for the selected category is the
   * URL. `/c/<slug>` selects; anything else (including "/") selects nothing.
   */
  const selectedCategorySlug = pathname.startsWith("/c/")
    ? decodeURIComponent(pathname.slice(3).split("/")[0] ?? "")
    : null;
  const { categories } = useCategories();
  const selectedCategoryId = selectedCategorySlug
    ? (categories.find((c) => c.slug === selectedCategorySlug)?.id ?? null)
    : null;
  const activePanel: PanelId = routePanel ?? panelChoice;

  /** Choosing a panel from a route-owned page returns to the feed shell. */
  const setActivePanel = useCallback(
    (panel: PanelId) => {
      setPanelChoice(panel);
      if (!isFeedRoute) void navigate({ to: "/" });
    },
    [isFeedRoute, navigate],
  );

  /**
   * RBAC seam (Phase R3). Signed-out visitors issue NO request: `enabled` is
   * false, so the marketplace first paint costs nothing in RBAC terms. A
   * signed-in user pays exactly one cached RPC per session.
   *
   * Law F3: this only decides whether the Admin TAB renders. Every admin
   * action is enforced by RLS / has_permission on the server.
   */
  const { permissions, loading: permissionsLoading } = usePermissions({ enabled: user !== null });

  /**
   * U0j (INC-072) — SIGN-OUT IS A HARD RESET, in this exact order:
   *   (a) supabase.auth.signOut() — the repo's existing default scope
   *       ("global": every session for this user) is kept deliberately, and it
   *       is awaited;
   *   (b) the permission cache is REMOVED (not merely invalidated) so no
   *       stale admin grant can paint anything;
   *   (c) the session-policy clocks are cleared (U0k) so the next sign-in
   *       starts a fresh idle/absolute window;
   *   (d) auth-derived client state resets (panel, category, location, drawer);
   *   (e) replace-navigate to "/" so Back cannot re-enter a gated page.
   *
   * U0k: no confirmation dialog — one click IS the contract.
   */
  const [signingOut, setSigningOut] = useState(false);
  const [sessionNotice, setSessionNotice] = useState<MessageKey | null>(null);

  const hardReset = useCallback(
    async (notice: MessageKey | null) => {
      setSigningOut(true);
      try {
        await signOut();
        /**
         * INC-078 LAW (U1f; made STRUCTURAL by U1g-2) — THE HARD RESET PURGES
         * EVERY AUTH-DERIVED READ. Mechanism: every auth-context query key
         * starts with AUTH_DERIVED_ROOT, so ONE cancel-then-remove pair covers
         * all of them — permissions, admin users, admin countries and anything
         * added later. CANCEL FIRST: an in-flight fetch must never resolve into
         * a signed-out shell. Legacy ["me"] prefix kept for any older reader.
         */
        await queryClient.cancelQueries({ queryKey: [AUTH_DERIVED_ROOT] });
        queryClient.removeQueries({ queryKey: [AUTH_DERIVED_ROOT] });
        queryClient.removeQueries({ queryKey: ["me"] });
        clearSessionClocks();
        setPanelChoice("marketplace");
        setLocationPath([]);
        setNavOpen(false);
        setSessionNotice(notice);
        await navigate({ to: "/", replace: true });
      } finally {
        setSigningOut(false);
      }
    },
    [signOut, queryClient, navigate],
  );

  const requestSignOut = useCallback(() => {
    if (signingOut) return;
    void hardReset(null);
  }, [hardReset, signingOut]);

  /**
   * U0k — SESSION POLICY. FAIL-SAFE tiering: until permissions resolve we
   * assume "staff", i.e. the STRICT limits, never the lenient ones.
   */
  const tier =
    permissionsLoading || permissions.includes(ADMIN_PANEL_PERMISSION)
      ? ("staff" as const)
      : ("regular" as const);

  const onExpire = useCallback(
    (reason: SessionExpiryReason) => {
      void hardReset(reason === "idle" ? "session.signedOutIdle" : "session.expired");
    },
    [hardReset],
  );

  const { warningSecondsLeft, extend } = useSessionPolicy({
    active: user !== null,
    tier,
    onExpire,
  });

  /** (b) A fresh sign-in starts fresh clocks. */
  useEffect(() => {
    if (user === null) return;
    startSessionClocks();
    setSessionNotice(null);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * THE LIVE GUARD (the security fix). `user` comes from the shell's
   * onAuthStateChange subscription, so ANY signed-out transition — this tab,
   * another tab, or token expiry — lands here, not just a mount check. A gated
   * route standing open is replaced by the marketplace immediately, so no
   * gated UI survives a sign-out on any screen size.
   */
  const gatedRoute = pathname.startsWith("/admin") || pathname.startsWith("/settings");
  useEffect(() => {
    if (authLoading || user !== null) return;
    void queryClient.cancelQueries({ queryKey: [AUTH_DERIVED_ROOT] });
    queryClient.removeQueries({ queryKey: [AUTH_DERIVED_ROOT] });
    setPanelChoice("marketplace");
    setNavOpen(false);
    if (gatedRoute) void navigate({ to: "/", replace: true });
  }, [authLoading, user, gatedRoute, navigate, queryClient]);

  /**
   * U0j-2 — TEST HOOK, dev-only. The E2E live-guard proof must fire a REAL
   * same-tab SIGNED_OUT through onAuthStateChange (synthetic storage events are
   * ignored by supabase-js in the tab that dispatches them). `import.meta.env.DEV`
   * is false in every production build, so this never ships.
   */
  useEffect(() => {
    if (!import.meta.env.DEV || typeof window === "undefined") return;
    (window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase = supabase;
    // U1g-2 — SO-4 proof reads the cache directly to assert the purge.
    (window as unknown as { __ethioQueryClient?: unknown }).__ethioQueryClient = queryClient;
  }, [queryClient]);

  const value = useMemo<ShellValue>(() => {
    const auth: PanelAuthContext = {
      // U0l PART 4 — SO-2 RACE: the moment a sign-out starts, the shell is
      // signed out for UI purposes, so no stale account menu can survive the
      // replace-navigate. Authorization is still server-side only (law F3).
      isAuthenticated: user !== null && !signingOut,
      isAdmin: permissions.includes(ADMIN_PANEL_PERMISSION),
      permissions,
    };
    return {
      auth,
      user,
      authLoading,
      requestSignOut,
      activePanel,
      setActivePanel,
      selectedCategorySlug,
      selectedCategoryId,
      locationPath,
      setLocationPath,
      navOpen,
      setNavOpen,
      signingOut,
    };
  }, [
    user,
    authLoading,
    permissions,
    requestSignOut,
    activePanel,
    setActivePanel,
    selectedCategorySlug,
    selectedCategoryId,
    locationPath,
    navOpen,
    signingOut,
  ]);

  return (
    <ShellContext.Provider value={value}>
      {/* Pre-paint: the persisted rail choice lands on <html> before the first
          frame, so the rail never renders expanded and then snaps narrow. */}
      <script dangerouslySetInnerHTML={{ __html: RAIL_INIT_SCRIPT }} />
      {/* U0k — non-modal idle warning. It never traps focus and never blocks
          the page: any real interaction resets the idle clock anyway. */}
      {warningSecondsLeft !== null ? (
        <div
          data-testid="session-idle-warning"
          role="status"
          aria-live="polite"
          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-foreground">
            {t("session.idleWarning").replace("{s}", String(warningSecondsLeft))}
          </p>
          <button
            type="button"
            data-testid="session-stay-signed-in"
            onClick={extend}
            className="min-h-11 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("session.staySignedIn")}
          </button>
        </div>
      ) : null}
      {/* U0k — the post-expiry notice, shown on the marketplace after the reset. */}
      {sessionNotice !== null ? (
        <div
          data-testid="session-notice"
          role="status"
          aria-live="polite"
          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-lg border border-border bg-card p-3 shadow-lg"
        >
          <p className="text-sm text-foreground">{t(sessionNotice)}</p>
          <button
            type="button"
            data-testid="session-notice-dismiss"
            onClick={() => setSessionNotice(null)}
            className="min-h-11 rounded-md px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("common.dismiss")}
          </button>
        </div>
      ) : null}
      {/* U0g/L3 — the footer is a SIBLING BELOW the grid, not a third grid row.
          A sticky grid item's clamp rectangle is the GRID CONTAINER, so with
          the footer inside the grid the rail could overhang it; ending the
          grid at the content row makes the rail's bottom stop exactly at the
          footer's top. Visually identical on mobile (stacked, full width). */}
      <div className="flex min-h-screen flex-col bg-background">
        {/* Mobile keeps the one-column grid. From md up the layout is FIXED
            geometry (U0g-2): the band and the rail are position:fixed and the
            content column offsets itself with padding/margin. */}
        <div className="grid flex-1 grid-cols-1 grid-rows-[auto_1fr] md:block">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            {t("shell.skipToContent")}
          </a>

          {/* U0g-2 — THE FIXED TOP BAND. On mobile the wrapper is `contents`,
              so the top bar remains grid row 1 exactly as before. On md+ the
              wrapper becomes a fixed 4rem-tall strip spanning the viewport,
              and the corner block lives INSIDE it: logo cell 16rem × 4rem at
              x=0 (4rem when the rail is collapsed), top bar filling the rest.
              Painted geometry is identical to the old sticky band. */}
          <div
            data-testid="shell-band"
            className="contents md:fixed md:inset-x-0 md:top-0 md:z-30 md:flex md:h-16"
          >
            <div
              data-testid="shell-logo-cell"
              className="hidden min-w-0 border-b border-e border-border bg-card px-4 md:flex md:h-16 md:w-64 md:shrink-0 md:items-center md:[html[data-rail=collapsed]_&]:w-16 md:[html[data-rail=collapsed]_&]:justify-center md:[html[data-rail=collapsed]_&]:px-0"
            >
              <Link
                to="/"
                aria-label={t("app.name")}
                className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {/* Collapsed rail = icon-only logo; the two swap by attribute, so
                the swap is already correct on the first painted frame. */}
                <span className="inline-flex md:[html[data-rail=collapsed]_&]:hidden">
                  <Logo variant="full" />
                </span>
                <span className="hidden md:[html[data-rail=collapsed]_&]:inline-flex">
                  <Logo variant="icon" />
                </span>
              </Link>
            </div>

            {/*
            ONE uniform band: the cell itself carries bg-card and the row height,
            and the header fills it, so there is no two-tone split between the
            bar and the strip under it. min-w-0 is load-bearing — without it this
            item sizes to the search input's intrinsic minimum and the page
            overflows horizontally at 360px (INC-032).
          */}
            <div
              data-testid="shell-topbar"
              className="col-start-1 row-start-1 min-w-0 bg-card md:h-16 md:flex-1"
            >
              <AppHeader />
            </div>
          </div>

          {/* Rail: mobile drawer; md+ fixed beneath the band. */}
          <AppRail />

          {/* U0g-3 LAW — the DOCUMENT is the only page scroller at md+. This
              stack and every ancestor up to <html> stay unbounded: no
              overflow-y, no h-screen/max-h cap (the wrapper is min-h-screen),
              and the band and rail are position:fixed, so they impose no
              height bound on the flow. Adding overflow + a bounded height here
              would turn the content stack into an internal scroller and break
              L1/L2. */}
          <div
            data-testid="shell-stack"
            className="col-start-1 row-start-2 flex min-w-0 flex-col md:ms-64 md:pt-16 md:[html[data-rail=collapsed]_&]:ms-16"
          >
            {/* Band 2 — absent entirely for a logged-out, Marketplace-only user. */}
            <PanelTabs />
            {/* Band 3 — location scoping is a MARKETPLACE concept, so the row is
              gated by the SAME condition as the body: no location band on My
              Listings / Account / Admin (INC-052), and none on a route-owned
              page such as /settings (INC-058). */}
            {isFeedRoute && activePanel === "marketplace" ? <LocationSelector /> : null}
            {/* Band 4 + 5 */}
            <main id="main" className="min-w-0 flex-1 px-3 py-4 md:px-4">
              <Breadcrumbs />
              {/* A route-owned page always renders itself. The placeholder is
                ONLY for a panel with no route at all (My Listings). U0e /
                INC-071 deleted the state-path Admin body: /admin is the one
                and only admin rendering. */}
              {!isFeedRoute || activePanel !== "my-listings" ? children : <PanelPlaceholder />}
            </main>
          </div>
        </div>

        {/* U0h — the footer PAINTS OVER the fixed rail. Its BOX spans the whole
            viewport and, because the wrapper is a stacking context above the
            rail (z-40 > the rail's z-20), the rail visually ENDS at the
            footer's top edge instead of running beside or under its text. The
            surface is opaque in both themes: the <footer> itself carries
            bg-card (census), and the wrapper repeats it so no rail pixel can
            show through the wrapper box. INNER blocks keep the U0g-2 start
            inset equal to the rail width at md+, so the links and copyright
            stay in the readable content column. Mobile: unchanged (no fixed
            rail exists there). */}
        <div
          data-testid="shell-footer-wrapper"
          className="relative z-40 w-full bg-card md:[&>footer>*]:ps-64 md:[html[data-rail=collapsed]_&>footer>*]:ps-16"
        >
          <AppFooter />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
