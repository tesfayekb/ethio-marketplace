import { CutText } from "@/components/ui/cut-text";
import { BAR_GAP, BAR_HEADER_INSET } from "@/components/shell/bar-spacing";
import { Link } from "@tanstack/react-router";
import { LogOut, Menu, Search, Settings as SettingsIcon, User, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useShell } from "@/components/shell-context";

/**
 * Sage §1 (turn SAGE-S1) — ONE CONTROL LOOK for the top bar's controls (the language and
 * theme controls, the phone search button, the account trigger): the card surface, a
 * hairline edge, the control lift, 12 px corners. 44 px for a coarse pointer (C2); 36 px
 * for a fine one.
 */
const CONTROL_LOOK =
  "min-h-11 md:pointer-fine:min-h-9 rounded-md border border-hairline bg-card text-foreground shadow-control hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const ICON_BUTTON = `inline-flex w-9 shrink-0 items-center justify-center ${CONTROL_LOOK}`;
/** Sage §1 — the search pill: the field fill and its pressed-in lift, no border. */
const SEARCH_FIELD =
  "min-h-11 w-full rounded-full bg-field shadow-field ps-10 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const SEARCH_ICON =
  "pointer-events-none absolute start-3.5 top-1/2 size-4.5 -translate-y-1/2 text-leaf-ink";

/**
 * Search field. On mobile it is NOT squeezed into the bar: the icon opens a
 * FULL-WIDTH first row of the sticky sub-band, so long queries have room.
 * It pushes the breadcrumb and page down and covers nothing.
 *
 * TODO(search): still visual only. There is no /search route yet — submitting
 * is a deliberate no-op until the search feature lands.
 */
export function SearchRow({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      role="search"
      data-testid="search-row"
      className="border-b border-border bg-card px-2 py-2 md:hidden"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="relative block">
        <span className="sr-only">{t("shell.searchLabel")}</span>
        <Search aria-hidden="true" strokeWidth={2.25} className={SEARCH_ICON} />
        <input
          ref={inputRef}
          type="search"
          data-testid="search-input"
          placeholder={t("shell.searchPlaceholder")}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
          }}
          className={cn(SEARCH_FIELD, "pe-10 text-sm")}
        />
        <button
          type="button"
          aria-label={t("shell.searchClose")}
          onClick={onClose}
          className="absolute end-1 top-1/2 inline-flex h-10 w-9 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </label>
    </form>
  );
}

/**
 * The top bar — band 1.
 *
 * TWO presentations, one markup, split at `md` (768px):
 *   - BELOW md (phones only): minimized — hamburger · wordmark · search icon ·
 *     language · theme · avatar/sign-in, with search opening the full-width row
 *     below the bar. This is the ONLY size that minimizes.
 *   - md AND UP (tablets, desktops): the rail is persistent and the logo lives
 *     in the corner cell, so the bar carries FULL controls — a real search
 *     FIELD with its placeholder, the language control showing the language
 *     NAME, and a labelled account/sign-in control. No bare icons to decode.
 *
 * Height: the bar fills grid row 1 (3.5rem) from md up (`md:h-full`), so its top
 * and bottom edges are the logo cell's by construction. On phones there is no
 * grid row to fill and the bar is its own compact 3.25rem.
 */
export function AppHeader() {
  const { t } = useI18n();
  const {
    auth,
    authLoading,
    user,
    requestSignOut,
    navOpen,
    setNavOpen,
    signingOut,
    searchOpen,
    setSearchOpen,
  } = useShell();

  return (
    <div className="w-full min-w-0 md:h-full">
      <header
        className={cn(
          "flex h-13 w-full min-w-0 items-center gap-1 bg-card pe-2 md:h-full",
          BAR_GAP,
          BAR_HEADER_INSET,
        )}
      >
        {/* One ☰: below 768 it opens the phone menu; from 768 the corner folds the rail. */}
        <button
          type="button"
          aria-label={t(navOpen ? "shell.closeMenu" : "shell.openMenu")}
          aria-expanded={navOpen}
          aria-controls="rail-menu"
          className="inline-flex h-11 w-12 shrink-0 items-center justify-center text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* The wordmark — never icon-only in the bar; the icon-only variant is
            reserved for the collapsed rail. md+ shows it in the corner cell. */}
        <Link
          to="/"
          aria-label={t("app.name")}
          className="ms-1 inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          <Logo variant="wordmark" />
        </Link>

        {/* Folded from 768: the full logo moves from the corner into the bar. */}
        <Link
          to="/"
          aria-label={t("app.name")}
          data-testid="topbar-wordmark"
          className="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:inline-flex"
        >
          <Logo variant="full" />
        </Link>

        <div
          aria-hidden="true"
          data-testid="search-spacer"
          className="hidden min-w-0 md:block md:flex-1"
        />

        {/* Bundle 21 turn 9 (the operator, 2026-10-18): the field takes three
            quarters of the band's free space (6 : 1 : 1 with the spacers), up to
            42rem; the controls are a non-shrinking sibling, so it can never grow
            into them (INC-049). */}
        <form
          role="search"
          data-testid="search-inline"
          className="hidden min-w-0 md:block md:flex-[6] md:max-w-2xl"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="relative block">
            <span className="sr-only">{t("shell.searchLabel")}</span>
            <Search aria-hidden="true" strokeWidth={2.25} className={SEARCH_ICON} />
            <input
              type="search"
              data-testid="search-inline-input"
              placeholder={t("shell.searchPlaceholder")}
              className={cn(SEARCH_FIELD, "pe-3 text-[15px]")}
            />
          </label>
        </form>

        <div
          aria-hidden="true"
          data-testid="search-spacer"
          className="hidden min-w-0 md:block md:flex-1"
        />
        {/* Equal spacers centre search between the logo and flush-right controls. */}
        <div
          data-testid="topbar-controls"
          className={cn(
            "flex min-w-0 flex-1 items-center justify-end gap-0.5 md:flex-none md:shrink-0",
            BAR_GAP,
          )}
        >
          {/* Phones only: the icon that opens the full-width row below. */}
          <button
            type="button"
            aria-label={t("shell.searchLabel")}
            aria-expanded={searchOpen}
            data-testid="search-toggle"
            className={cn(ICON_BUTTON, "md:hidden")}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <LanguageSwitcher className={CONTROL_LOOK} />
          <ThemeToggle className={ICON_BUTTON} />
          {/*
            INC-667 — WHILE THE SESSION IS READ, NOTHING: never the signed-out
            "Sign in" flashing for a session the tab holds (the bottom bar's rule,
            bottom-bar.tsx). The INC-661 status read keeps `user` empty until the
            account's status is known, and in that window this slot used to show
            the sign-in link — a signed-in user saw it on every load, and the E2E
            user switch read it as "signed out", skipped the sign-out and sent the
            next sign-in to /auth with a session, which sends it home.
          */}
          {auth.isAuthenticated && !signingOut ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={t("shell.accountMenu")}
                  data-testid="account-menu"
                  className={cn(
                    "inline-flex min-w-0 shrink-0 items-center gap-2 px-1.5 text-sm",
                    CONTROL_LOOK,
                  )}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>
                      <User className="h-4 w-4" aria-hidden="true" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[10rem] md:inline">
                    <CutText text={user?.displayName ?? t("shell.accountMenu")} />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel data-testid="account-menu-identity">
                  {user?.displayName ?? t("auth.signedInAs")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <User className="me-2 h-4 w-4" aria-hidden="true" />
                    {t("nav.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <SettingsIcon className="me-2 h-4 w-4" aria-hidden="true" />
                    {t("settings.navLabel")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-testid="account-menu-sign-out"
                  onSelect={() => requestSignOut()}
                >
                  <LogOut className="me-2 h-4 w-4" aria-hidden="true" />
                  {t("auth.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : authLoading ? null : (
            <Link
              to="/auth"
              className="hidden min-h-11 shrink-0 items-center rounded-md bg-primary px-2 md:inline-flex text-sm font-semibold text-primary-foreground shadow-button hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-4"
            >
              {t("auth.signIn")}
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default AppHeader;
