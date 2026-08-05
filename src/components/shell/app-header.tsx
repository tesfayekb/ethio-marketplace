import { Link } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
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
import { useShell } from "@/components/app-shell";
import { useRailCollapsed } from "@/providers/rail-state";

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
      className="w-full border-b border-border bg-card px-3 py-2 md:px-4"
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
 * Height: the bar fills grid row 1 (4rem) from md up (`md:h-full`), so its top
 * and bottom edges are the logo cell's by construction. On phones there is no
 * grid row to fill and the bar is its own compact 3.5rem.
 */
export function AppHeader() {
  const { t } = useI18n();
  const { auth, user, signOut, setNavOpen } = useShell();
  const { collapsed, toggle } = useRailCollapsed();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full min-w-0 md:h-full">
      <header className="flex h-14 w-full min-w-0 items-center gap-1 border-b border-border bg-card px-2 md:h-full md:gap-2 md:px-4">
        <button
          type="button"
          aria-label={t("shell.openMenu")}
          className={cn(ICON_BUTTON, "md:hidden")}
          onClick={() => setNavOpen(true)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        {/* The wordmark — never icon-only in the bar; the icon-only variant is
            reserved for the collapsed rail. md+ shows it in the corner cell. */}
        <Link
          to="/"
          aria-label={t("app.name")}
          className="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        >
          <Logo variant="wordmark" />
        </Link>

        {/* md+ ONLY: the rail collapse control, top-left of the bar and BEFORE
            the search field (INC-040 — it used to sit at the rail's bottom,
            out of reach on long pages). Below md the drawer/hamburger owns
            this job, so the toggle does not exist there — exactly ONE sidebar
            affordance per breakpoint (INC-046). */}
        <button
          type="button"
          data-testid="rail-collapse-toggle"
          aria-pressed={collapsed === true}
          aria-label={collapsed ? t("shell.expandRail") : t("shell.collapseRail")}
          onClick={toggle}
          // INC-055: ICON_BUTTON sets `inline-flex`, so a raw
          // `${ICON_BUTTON} hidden md:inline-flex` left TWO base display
          // utilities on the element and the cascade — not the attribute order
          // — decided the winner, leaking the toggle onto phones. cn()/twMerge
          // drops the earlier display class, so `hidden` genuinely wins below md.
          className={cn(ICON_BUTTON, "hidden md:inline-flex")}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        {/* md+ AND collapsed rail ONLY (INC-045/INC-048): the corner cell shows
            the icon-only mark when the rail is collapsed, so the LOCKUP —
            "ethio.com" with its MARKETPLACE line — moves into the bar, after
            the toggle and before search. The bar carries the lockup WITHOUT
            the mark (the corner already shows it), so the brand appears in
            exactly ONE place per state and is never duplicated. Layout keys
            off the attribute, not React state, so there is no first-frame
            flash. */}
        <Link
          to="/"
          aria-label={t("app.name")}
          data-testid="topbar-wordmark"
          className="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex"
        >
          <Logo variant="lockup" />
        </Link>

        {/* md+ : the real search field, in the bar. INC-049: its width is
            CAPPED per breakpoint so it can never grow into the right-side
            controls (language, theme, account) at tablet width. */}
        <form
          role="search"
          data-testid="search-inline"
          className="hidden min-w-0 flex-1 md:block md:max-w-[13rem] lg:max-w-xs xl:max-w-sm"
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

        <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5 md:flex-none md:shrink-0 md:gap-2">
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
          {auth.isAuthenticated ? (
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
                  <span className="hidden max-w-[10rem] truncate md:inline">
                    {user?.displayName ?? t("shell.accountMenu")}
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
                <DropdownMenuItem onSelect={() => void signOut()}>
                  <LogOut className="me-2 h-4 w-4" aria-hidden="true" />
                  {t("auth.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-primary px-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:px-4"
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
