import { createElement, type ReactNode } from "react";
import { ShellContext, type ShellValue } from "@/components/shell-context";

/** Tests supply the existing account holder, never a second account store. */
export function tableViewTestShell(account: string | null | undefined) {
  const noop = () => {};
  const value: ShellValue = {
    auth: { isAuthenticated: typeof account === "string", isAdmin: false, permissions: [] },
    user: typeof account === "string" ? { id: account, email: null, displayName: null } : null,
    authLoading: account === undefined,
    requestSignOut: noop,
    activePanel: "marketplace",
    panelChoice: "marketplace",
    setActivePanel: noop,
    selectedCategorySlug: null,
    selectedCategoryId: null,
    categoryLookup: "none",
    feedInputsReady: false,
    locationPath: [],
    setLocationPath: noop,
    locationCountry: null,
    selectLocationCountry: noop,
    guessInUse: false,
    guessNode: null,
    placeNotice: null,
    accountPlace: "off",
    searchOpen: false,
    setSearchOpen: noop,
    navOpen: false,
    setNavOpen: noop,
    signingOut: false,
  };
  return ({ children }: { children: ReactNode }) =>
    createElement(ShellContext.Provider, { value }, children);
}
