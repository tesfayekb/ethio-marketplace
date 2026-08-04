import { Link } from "@tanstack/react-router";
import { LogOut, Menu, Search, Settings as SettingsIcon, User } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PanelSwitcher } from "@/components/shell/panel-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

export function AppHeader() {
  const { t } = useI18n();
  const { auth, user, signOut, setNavOpen } = useShell();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 py-2">
        <div className="flex min-w-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("shell.openMenu")}
            className="min-h-11 min-w-11 lg:hidden"
            onClick={() => setNavOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            to="/"
            aria-label={t("app.name")}
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo variant="full" className="hidden sm:inline-flex" />
            <Logo variant="mark" className="sm:hidden" />
          </Link>
        </div>

        {/* TODO(search): visual only. There is no /search route yet — submitting
            is a deliberate no-op until the search feature lands. */}
        <form
          role="search"
          className="min-w-0"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label className="relative block">
            <span className="sr-only">{t("shell.searchLabel")}</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute inset-inline-start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder={t("shell.searchPlaceholder")}
              className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <PanelSwitcher />
          </div>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          {auth.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={t("shell.accountMenu")}
                  className="min-h-11 min-w-11"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
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
                    {t("nav.settings")}
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
              className="inline-flex min-h-11 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("auth.signIn")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
