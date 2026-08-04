import { Link } from "@tanstack/react-router";
import { LogOut, Menu, Search, Settings as SettingsIcon, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PanelSwitcher } from "@/components/shell/panel-switcher";
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
import { useShell } from "@/components/app-shell";

const ICON_BUTTON =
  "inline-flex min-h-11 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Search as an ICON that expands into an inline field, collapsing again on
 * blur or Escape. This is what buys the top bar its space at 360px.
 *
 * TODO(search): still visual only. There is no /search route yet — submitting
 * is a deliberate no-op until the search feature lands.
 */
function SearchControl() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        aria-label={t("shell.searchLabel")}
        aria-expanded={false}
        data-testid="search-toggle"
        className={ICON_BUTTON}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  return (
    <form
      role="search"
      className="min-w-0 flex-1"
      onSubmit={(event) => event.preventDefault()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <label className="relative block">
        <span className="sr-only">{t("shell.searchLabel")}</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute inset-inline-start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="search"
          data-testid="search-input"
          placeholder={t("shell.searchPlaceholder")}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="button"
          aria-label={t("shell.searchClose")}
          onClick={() => setOpen(false)}
          className="absolute inset-inline-end-1 top-1/2 inline-flex h-9 w-8 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </label>
    </form>
  );
}

/**
 * The MINIMAL top bar. Every item is icon-sized or compact so the row fits at
 * 360px with headroom to add more later. Breadcrumbs deliberately live on the
 * content's top line, not here.
 *
 * Right-hand order, consistently: search · language · theme · account/sign-in.
 */
export function AppHeader() {
  const { t } = useI18n();
  const { auth, user, signOut, setNavOpen } = useShell();

  return (
    <header className="flex h-14 w-full items-center gap-1 border-b border-border bg-card px-3 lg:h-full lg:gap-2 lg:px-4">
      {/* Mobile-only: hamburger + the lockup (desktop shows it in the corner cell). */}
      <button
        type="button"
        aria-label={t("shell.openMenu")}
        className={`${ICON_BUTTON} lg:hidden`}
        onClick={() => setNavOpen(true)}
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link
        to="/"
        aria-label={t("app.name")}
        className="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
      >
        {/* 360px has no room for the two-line lockup beside five controls —
            below sm the mark carries the brand alone. */}
        <Logo variant="full" className="hidden sm:inline-flex" />
        <Logo variant="mark" className="sm:hidden" />
      </Link>


      <div className="hidden min-w-0 flex-1 lg:block">
        <PanelSwitcher />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-1 lg:gap-2">
        <SearchControl />
        <LanguageSwitcher compact />
        <ThemeToggle />
        {auth.isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label={t("shell.accountMenu")} className={ICON_BUTTON}>
                <Avatar className="h-7 w-7">
                  <AvatarFallback>
                    <User className="h-4 w-4" aria-hidden="true" />
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName ?? t("auth.signedInAs")}</DropdownMenuLabel>
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
            className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("auth.signIn")}
          </Link>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
