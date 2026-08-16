import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
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
import type { AuthUser } from "@/features/auth/types";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { usePermissions } from "@/features/permissions/usePermissions";
import { useI18n } from "@/i18n";
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
  signOut: () => Promise<unknown>;
  activePanel: PanelId;
  setActivePanel: (panel: PanelId) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  /** The cascading area selection. SEAM: set here, not yet applied to the feed. */
  locationPath: LocationNode[];
  setLocationPath: (path: LocationNode[]) => void;
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [locationPath, setLocationPath] = useState<LocationNode[]>([]);
  const [navOpen, setNavOpen] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

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
  /** Only "/" is the marketplace feed; every other route renders its own page. */
  const isFeedRoute = pathname === "/";
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
  const { permissions } = usePermissions({ enabled: user !== null });

  const value = useMemo<ShellValue>(() => {
    const auth: PanelAuthContext = {
      isAuthenticated: user !== null,
      isAdmin: permissions.includes(ADMIN_PANEL_PERMISSION),
      permissions,
    };
    return {
      auth,
      user,
      authLoading,
      signOut,
      activePanel,
      setActivePanel,
      selectedCategoryId,
      setSelectedCategoryId,
      locationPath,
      setLocationPath,
      navOpen,
      setNavOpen,
    };
  }, [
    user,
    authLoading,
    permissions,
    signOut,
    activePanel,
    setActivePanel,
    selectedCategoryId,
    locationPath,
    navOpen,
  ]);

  return (
    <ShellContext.Provider value={value}>
      {/* Pre-paint: the persisted rail choice lands on <html> before the first
          frame, so the rail never renders expanded and then snaps narrow. */}
      <script dangerouslySetInnerHTML={{ __html: RAIL_INIT_SCRIPT }} />
      {/* U0g/L3 — the footer is a SIBLING BELOW the grid, not a third grid row.
          A sticky grid item's clamp rectangle is the GRID CONTAINER, so with
          the footer inside the grid the rail could overhang it; ending the
          grid at the content row makes the rail's bottom stop exactly at the
          footer's top. Visually identical on mobile (stacked, full width). */}
      <div className="flex min-h-screen flex-col bg-background">
        <div className="grid flex-1 grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[16rem_minmax(0,1fr)] md:grid-rows-[4rem_1fr] md:[html[data-rail=collapsed]_&]:grid-cols-[4rem_minmax(0,1fr)]">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            {t("shell.skipToContent")}
          </a>

          {/* Corner block: rail width × top-bar height, above the sidebar.
            U0g/L1 — the whole row-1 band is STICKY on md+. A sticky grid item
            is constrained by its grid AREA, so a row-1-only cell would scroll
            away; the cell therefore spans rows 1..-1 with `self-start` and an
            explicit h-16, which keeps the painted geometry identical (same x,
            width, y and height as before) while giving sticky a tall
            containing block. z-30 puts the band above the rail and content. */}
          <div
            data-testid="shell-logo-cell"
            className="hidden min-w-0 border-b border-e border-border bg-card px-4 md:col-start-1 md:row-start-1 md:[grid-row-end:-1] md:flex md:h-16 md:items-center md:self-start md:sticky md:top-0 md:z-30 md:[html[data-rail=collapsed]_&]:justify-center md:[html[data-rail=collapsed]_&]:px-0"
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
          grid item sizes to the search input's intrinsic minimum and the page
          overflows horizontally at 360px (INC-032).
        */}
          <div
            data-testid="shell-topbar"
            className="col-start-1 row-start-1 min-w-0 bg-card md:col-start-2 md:[grid-row-end:-1] md:h-16 md:self-start md:sticky md:top-0 md:z-30"
          >
            <AppHeader />
          </div>

          {/* Rail places itself into column 1 / row 2; the drawer is fixed. */}
          <AppRail />

          <div
            data-testid="shell-stack"
            className="col-start-1 row-start-2 flex min-w-0 flex-col md:col-start-2"
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

        {/* Full-width footer, beneath the rail's column as well as the content's. */}
        <div className="w-full">
          <AppFooter />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
