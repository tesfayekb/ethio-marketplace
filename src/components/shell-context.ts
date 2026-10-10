import { createContext, useContext } from "react";

import type { PanelAuthContext, PanelId } from "@/config/panels.types";
import type { AuthUser } from "@/features/auth/types";
import type { MessageKey } from "@/i18n";

/** One node of the chosen geographic path (country -> region -> city -> …). */
export type LocationNode = {
  id: string;
  name_en: string;
  name_am: string | null;
  level: string;
  parent_id: string | null;
};

export type ShellValue = {
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
  /** E3b (INC-504) — how the URL's slug resolved against the whole category tree. */
  categoryLookup: "none" | "pending" | "found" | "missing" | "failed";
  /** INC-282 (product) — true once the feed's category and area inputs settled. */
  feedInputsReady: boolean;
  /** The cascading area selection. SEAM: set here, not yet applied to the feed. */
  locationPath: LocationNode[];
  /** Writes the selection AND the saved-area cookie (L4b, law 12). */
  setLocationPath: (path: LocationNode[]) => void;
  /** The market whose tree the picker reads, or null when nothing is chosen. */
  locationCountry: string | null;
  /** Picks (or clears) the market; clearing forgets the saved area. */
  selectLocationCountry: (code: string | null) => void;
  /** True while the shown area comes from the edge guess, not from a pick. */
  guessInUse: boolean;
  /** L4b-2 — the node the guess resolved to, so the caption can name it. */
  guessNode: LocationNode | null;
  /**
   * D106 — the sign-in carry of the account's place: "off" while signed out,
   * "pending" while it runs, "done" once the newest pick has been applied or saved.
   */
  accountPlace: "off" | "pending" | "done";
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  /** U0l-2 (SO-2): true while the hard-reset sign-out sequence is running. */
  signingOut: boolean;
};

export const ShellContext = createContext<ShellValue | null>(null);

export function useShell(): ShellValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within <AppShell>");
  return ctx;
}
