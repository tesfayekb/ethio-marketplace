import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { AppFooter } from "@/components/shell/app-footer";
import { AppHeader } from "@/components/shell/app-header";
import { AppRail } from "@/components/shell/app-rail";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
import type { PanelAuthContext, PanelId } from "@/config/panels.types";
import { useAuth } from "@/features/auth/use-auth";
import type { AuthUser } from "@/features/auth/types";
import { useI18n } from "@/i18n";

type ShellValue = {
  auth: PanelAuthContext;
  user: AuthUser | null;
  signOut: () => Promise<unknown>;
  activePanel: PanelId;
  setActivePanel: (panel: PanelId) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
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
 * THE CORNER-BLOCK GRID.
 *
 * From lg up the shell is a two-column CSS grid whose first column is the rail
 * width (16rem) and whose first row is the top-bar height (4rem):
 *
 *   ┌──────────┬─────────────────────────┐
 *   │ LOGO     │ top bar                 │  row 1 = 4rem
 *   ├──────────┼─────────────────────────┤
 *   │ rail     │ body                    │  row 2 = 1fr
 *   ├──────────┴─────────────────────────┤
 *   │ footer (spans both columns)        │  row 3 = auto
 *   └────────────────────────────────────┘
 *
 * Alignment is EXACT, not approximate, because the logo cell and the rail are
 * the SAME grid column (so identical width by construction) and the logo cell
 * and the top bar are the SAME grid row (so identical height by construction).
 * Both column-1 cells carry `border-e`, which makes the sidebar's edge ONE
 * continuous vertical hairline running from the very top of the logo cell
 * straight down past the rail — the logo sits ABOVE the sidebar, not inside
 * the top bar.
 *
 * Below lg the grid collapses to a single column: the logo cell is dropped
 * (the mobile header row carries hamburger + logo + actions) and the rail
 * becomes a drawer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { user, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<PanelId>("marketplace");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
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
      navOpen,
      setNavOpen,
    };
  }, [user, signOut, activePanel, selectedCategoryId, navOpen]);

  return (
    <ShellContext.Provider value={value}>
      <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] bg-background lg:grid-cols-[16rem_minmax(0,1fr)] lg:grid-rows-[4rem_1fr_auto]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          {t("shell.skipToContent")}
        </a>

        {/* Corner block: rail width × top-bar height, above the sidebar. */}
        <div
          data-testid="shell-logo-cell"
          className="hidden border-b border-e border-border bg-card px-4 lg:col-start-1 lg:row-start-1 lg:flex lg:items-center"
        >
          <Link
            to="/"
            aria-label={t("app.name")}
            className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo variant="full" />
          </Link>
        </div>

        <div data-testid="shell-topbar" className="col-start-1 row-start-1 lg:col-start-2">
          <AppHeader />
        </div>

        {/* Rail places itself into column 1 / row 2; the drawer is fixed. */}
        <AppRail />

        <main
          id="main"
          className="col-start-1 row-start-2 min-w-0 px-4 py-6 lg:col-start-2 lg:px-6"
        >
          <Breadcrumbs />
          {activePanel === "marketplace" ? children : <PanelPlaceholder />}
        </main>

        <div className="col-start-1 row-start-3 lg:col-span-2 lg:col-start-1">
          <AppFooter />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
