import { Link } from "@tanstack/react-router";
import {
  CircleUser,
  ClipboardList,
  House,
  LogIn,
  Plus,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { useShell } from "@/components/shell-context";
import { useSwitchPanel } from "@/components/shell/use-switch-panel";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";

const ITEM =
  "flex min-h-15 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";

function ItemBody({
  icon: Icon,
  label,
  emphasised = false,
}: {
  icon: LucideIcon;
  label: string;
  emphasised?: boolean;
}): ReactNode {
  return (
    <>
      {emphasised ? (
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="max-w-full truncate">{label}</span>
    </>
  );
}

/**
 * C2b — the phone bottom bar (below md only). The most-used destinations, at
 * most five, Post emphasised; it replaces the panel tabs and the top bar's
 * account picture / Sign in link, so nothing appears twice on a phone.
 * AppShell does not render it on the posting wizard.
 */
export function BottomBar() {
  const { t } = useI18n();
  const { auth, authLoading, activePanel, signingOut } = useShell();
  const switchPanel = useSwitchPanel();

  // While the session is read, nothing — never the signed-out set flashing.
  if (authLoading) return null;

  const signedIn = auth.isAuthenticated && !signingOut;
  const tone = (current: boolean) =>
    current ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground";
  const label = (key: MessageKey) => t(key);

  return (
    <nav
      data-testid="bottom-bar"
      aria-label={t("shell.panelLabel")}
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-bar-up md:hidden"
    >
      <Link
        to="/"
        data-testid="bottom-bar-home"
        // Home is the Marketplace panel: on "/" itself the route owns no
        // panel, so the choice is set too (the tab's own call).
        onClick={() => switchPanel("marketplace")}
        aria-label={label("nav.home")}
        aria-current={signedIn && activePanel === "marketplace" ? "page" : undefined}
        className={cn(ITEM, tone(signedIn && activePanel === "marketplace"))}
      >
        <ItemBody icon={House} label={label("nav.home")} />
      </Link>
      {signedIn ? (
        <button
          type="button"
          data-testid="bottom-bar-my-listings"
          aria-label={label("nav.myListings")}
          aria-current={activePanel === "my-listings" ? "page" : undefined}
          onClick={() => switchPanel("my-listings")}
          className={cn(ITEM, tone(activePanel === "my-listings"))}
        >
          <ItemBody icon={ClipboardList} label={label("nav.myListings")} />
        </button>
      ) : null}
      <Link
        to="/post"
        data-testid="bottom-bar-post"
        aria-label={label("nav.postListing")}
        className={cn(ITEM, tone(false))}
      >
        <ItemBody icon={Plus} label={label("nav.postListing")} emphasised />
      </Link>
      {signedIn ? (
        <Link
          to="/account"
          data-testid="bottom-bar-account"
          aria-label={label("panel.account")}
          aria-current={activePanel === "account" ? "page" : undefined}
          className={cn(ITEM, tone(activePanel === "account"))}
        >
          <ItemBody icon={CircleUser} label={label("panel.account")} />
        </Link>
      ) : (
        <Link
          to="/auth"
          data-testid="bottom-bar-sign-in"
          aria-label={label("auth.signIn")}
          className={cn(ITEM, tone(false))}
        >
          <ItemBody icon={LogIn} label={label("auth.signIn")} />
        </Link>
      )}
      {signedIn && auth.isAdmin ? (
        <Link
          to="/admin"
          data-testid="bottom-bar-admin"
          aria-label={label("panel.admin")}
          aria-current={activePanel === "admin" ? "page" : undefined}
          className={cn(ITEM, tone(activePanel === "admin"))}
        >
          <ItemBody icon={Shield} label={label("panel.admin")} />
        </Link>
      ) : null}
    </nav>
  );
}

export default BottomBar;
