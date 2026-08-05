import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

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
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<PanelId>("marketplace");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [locationPath, setLocationPath] = useState<LocationNode[]>([]);
  const [navOpen, setNavOpen] = useState(false);

  const value = useMemo<ShellValue>(() => {
    const auth: PanelAuthContext = {
      isAuthenticated: user !== null,
      // TODO(rbac): stubbed false. The roles/permissions tables are a later
      // feature; when they land, read them here. Law F3 still holds — the
      // server is the only authorization authority; this only hides UI.
      isAdmin: false,
      permissions: [],
    };
    return {
      auth,
      user,
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
  }, [user, signOut, activePanel, selectedCategoryId, locationPath, navOpen]);

  return (
    <ShellContext.Provider value={value}>
      {/* Pre-paint: the persisted rail choice lands on <html> before the first
          frame, so the rail never renders expanded and then snaps narrow. */}
      <script dangerouslySetInnerHTML={{ __html: RAIL_INIT_SCRIPT }} />
      <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] bg-background md:grid-cols-[16rem_minmax(0,1fr)] md:grid-rows-[4rem_1fr_auto] md:[html[data-rail=collapsed]_&]:grid-cols-[4rem_minmax(0,1fr)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          {t("shell.skipToContent")}
        </a>

        {/* Corner block: rail width × top-bar height, above the sidebar. */}
        <div
          data-testid="shell-logo-cell"
          className="hidden min-w-0 border-b border-e border-border bg-card px-4 md:col-start-1 md:row-start-1 md:flex md:items-center md:[html[data-rail=collapsed]_&]:justify-center md:[html[data-rail=collapsed]_&]:px-0"
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
          className="col-start-1 row-start-1 min-w-0 bg-card md:col-start-2 md:h-16"
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
              Listings / Account / Admin (INC-052). */}
          {activePanel === "marketplace" ? <LocationSelector /> : null}
          {/* Band 4 + 5 */}
          <main id="main" className="min-w-0 flex-1 px-3 py-4 md:px-4">
            <Breadcrumbs />
            {activePanel === "marketplace" ? children : <PanelPlaceholder />}
          </main>
        </div>

        <div className="col-start-1 row-start-3 md:col-span-2 md:col-start-1">
          <AppFooter />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
