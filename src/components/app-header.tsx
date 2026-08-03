import { Link, useNavigate } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";

export function AppHeader() {
  const { t } = useI18n();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    void navigate({ to: "/" });
  }

  return (
    <header className="w-full border-b border-border bg-background">
      <nav
        aria-label={t("nav.home")}
        className="mx-auto flex min-h-14 w-full max-w-5xl flex-wrap items-center justify-between gap-2 ps-4 pe-4 py-2"
      >
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("app.name")}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <LanguageSwitcher />
          {loading ? null : user ? (
            <>
              {/* At 360px the name yields width first: it truncates harder and
                  the existing flex-wrap row lets Settings and Sign out drop to a
                  second line rather than shrink below their 44px targets. */}
              <span className="max-w-[6rem] truncate text-sm text-muted-foreground sm:max-w-[10rem]">
                {user.displayName ?? t("auth.signedInAs")}
              </span>
              <Link
                to="/settings"
                className="inline-flex min-h-11 items-center rounded-md border border-input px-3 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("settings.navLabel")}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t("auth.signOut")}
              </button>
            </>

          ) : (
            <Link
              to="/auth"
              className="inline-flex min-h-11 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t("auth.signIn")}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
