import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { AppFooter } from "@/components/shell/app-footer";
import { AppHeader } from "@/components/shell/app-header";
import { AppRail } from "@/components/shell/app-rail";
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
 * The ONE shell: header (top) / rail (start) / body / footer (bottom).
 * Same skeleton at every breakpoint; below lg the rail becomes a drawer.
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
      <div className="flex min-h-screen flex-col bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          {t("shell.skipToContent")}
        </a>
        <AppHeader />
        <div className="mx-auto flex w-full max-w-7xl flex-1 gap-6 px-4 py-6">
          <AppRail />
          <main id="main" className="min-w-0 flex-1">
            {activePanel === "marketplace" ? children : <PanelPlaceholder />}
          </main>
        </div>
        <AppFooter />
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
