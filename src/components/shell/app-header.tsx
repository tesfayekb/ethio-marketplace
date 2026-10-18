import { CutText } from "@/components/ui/cut-text";
import { Link } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  Search,
  Settings as SettingsIcon,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const ICON_BUTTON =
  "inline-flex min-h-11 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Search field. On mobile it is NOT squeezed into the bar: the icon opens a
 * FULL-WIDTH row directly BELOW the top bar, so long queries have room. On
 * desktop the same row simply sits under the bar too, spanning the content
 * column — one implementation, no duplicated markup.
 *
 * TODO(search): still visual only. There is no /search route yet — submitting
 * is a deliberate no-op until the search feature lands.
 */
function SearchRow({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      role="search"
      data-testid="search-row"
      className="w-full border-b border-border bg-card px-2 py-2 md:px-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="relative block">
        <span className="sr-only">{t("shell.searchLabel")}</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="search"
          data-testid="search-input"
          placeholder={t("shell.searchPlaceholder")}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
          }}
          className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
  const { auth, authLoading, user, requestSignOut, navOpen, setNavOpen, signingOut } = useShell();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full min-w-0 md:h-full">
      <header
        className="flex h-13 w-full min-w-0 items-center gap-1 bg-card pe-2 md:h-full md:gap-2 md:px-4"
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

        <div aria-hidden="true" className="hidden min-w-0 md:block md:flex-1" />

        {/* md+ : the real search field, in the bar. INC-049: its width is
            CAPPED per breakpoint so it can never grow into the right-side
            controls (language, theme, account) at tablet width. */}
        <form
          role="search"
          data-testid="search-inline"
          className="hidden min-w-0 flex-1 md:block md:max-w-xs lg:max-w-md xl:max-w-[28rem]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="relative block">
            <span className="sr-only">{t("shell.searchLabel")}</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              data-testid="search-inline-input"
              placeholder={t("shell.searchPlaceholder")}
              className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </form>

        <div aria-hidden="true" className="hidden min-w-0 md:block md:flex-1" />
        {/* Equal spacers centre search between the logo and flush-right controls. */}
        <div
          data-testid="topbar-controls"
          className="flex min-w-0 flex-1 items-center justify-end gap-0.5 md:flex-none md:shrink-0 md:gap-2"
        >
          {/* Phones only: the icon that opens the full-width row below. */}
          <button
            type="button"
            aria-label={t("shell.searchLabel")}
            aria-expanded={searchOpen}
            data-testid="search-toggle"
            className={cn(ICON_BUTTON, "md:hidden")}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
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
                  className="inline-flex min-h-11 min-w-0 shrink-0 items-center gap-2 rounded-md px-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="hidden min-h-11 shrink-0 items-center rounded-md bg-primary px-2 md:inline-flex text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-4"
            >
              {t("auth.signIn")}
            </Link>
          )}
        </div>
      </header>

      {searchOpen ? <SearchRow onClose={() => setSearchOpen(false)} /> : null}
    </div>
  );
}

export default AppHeader;
