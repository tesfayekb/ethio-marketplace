import { CURRENT_PILL } from "@/components/shell/band-row";
import { CutText } from "@/components/ui/cut-text";
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
import { isCurrentAt, useMenuAt } from "@/components/shell/menu-current";
import { PRESSED } from "@/components/shell/menu-row";
import { useSwitchPanel } from "@/components/shell/use-switch-panel";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";

const ITEM = `${PRESSED.bar} flex min-h-15 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`;

/**
 * D271 (turn C2, DEC-317 item 4) — each item is current by the one rule (isCurrentAt) on the
 * chosen page (useMenuAt), signed in or out: Home on the feed ("/" and every category), Sign in
 * on its page, My listings, Account and Admin on theirs. The panel (the frame) is not read.
 */
export const BAR_PATHS = {
  home: ["/", "/c"],
  myListings: ["/my-listings"],
  account: ["/account", "/settings"],
  signIn: ["/auth"],
  admin: ["/admin"],
} as const;

function ItemBody({
  icon: Icon,
  label,
  emphasised = false,
  current = false,
}: {
  icon: LucideIcon;
  label: string;
  emphasised?: boolean;
  /** C2h.1 — the current item: its icon sits in the shared P-S3 current-item pill. */
  current?: boolean;
}): ReactNode {
  return (
    <>
      {emphasised ? (
        // Sage §11 (R6): a 40 px disc raised `--bar-rise` above the bar's top edge (+1 px, its resting inset), its ring the bar's surface.
        <span
          data-testid="bottom-bar-disc"
          className="inline-flex size-10 -translate-y-[calc(var(--bar-rise)+1px)] items-center justify-center rounded-full bg-primary text-primary-foreground shadow-disc"
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      ) : current ? (
        <span
          data-testid="bottom-bar-pill"
          className={cn("inline-flex h-8 w-14 items-center justify-center", CURRENT_PILL)}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      ) : (
        <span
          className={cn(
            "inline-flex h-8 w-14 items-center justify-center rounded-full",
            PRESSED.barIcon,
          )}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      )}
      <CutText className={cn(current && "font-bold text-nav-ink")} text={label} />
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
  const { auth, authLoading, signingOut } = useShell();
  const switchPanel = useSwitchPanel();
  const at = useMenuAt();

  // While the session is read, nothing — never the signed-out set flashing.
  if (authLoading) return null;

  const signedIn = auth.isAuthenticated && !signingOut;
  const on = (paths: readonly string[]) => paths.some((path) => isCurrentAt({ path }, at));
  const home = on(BAR_PATHS.home);
  const myListings = on(BAR_PATHS.myListings);
  const account = on(BAR_PATHS.account);
  const signInPage = on(BAR_PATHS.signIn);
  const admin = on(BAR_PATHS.admin);
  const tone = (current: boolean) =>
    current ? "text-primary" : "text-muted-foreground hover:text-foreground";
  const label = (key: MessageKey) => t(key);

  return (
    <nav
      data-testid="bottom-bar"
      data-chrome="bottom"
      aria-label={t("shell.panelLabel")}
      className="fixed inset-x-0 bottom-0 z-30 flex rounded-t-bar bg-card pb-[env(safe-area-inset-bottom)] shadow-bar-up md:hidden"
    >
      <Link
        to="/"
        data-testid="bottom-bar-home"
        data-tick=""
        // Home is the Marketplace panel: on "/" itself the route owns no
        // panel, so the choice is set too (the tab's own call).
        onClick={() => switchPanel("marketplace")}
        aria-label={label("nav.home")}
        aria-current={home ? "page" : undefined}
        className={cn(ITEM, tone(home))}
      >
        <ItemBody icon={House} label={label("nav.home")} current={home} />
      </Link>
      {signedIn ? (
        // Bundle 16 turn R1 (D182 1) — the item opens the seller's panel, so it carries the panel's name
        // (Seller Centre), as Account does; "My listings" is the panel's list.
        <button
          type="button"
          data-testid="bottom-bar-my-listings"
          data-tick=""
          aria-label={label("panel.myListings")}
          aria-current={myListings ? "page" : undefined}
          onClick={() => switchPanel("my-listings")}
          className={cn(ITEM, tone(myListings))}
        >
          <ItemBody icon={ClipboardList} label={label("panel.myListings")} current={myListings} />
        </button>
      ) : null}
      <Link
        to="/post"
        data-testid="bottom-bar-post"
        data-tick=""
        aria-label={label("nav.postShort")}
        className={cn(ITEM, tone(false))}
      >
        <ItemBody icon={Plus} label={label("nav.postShort")} emphasised />
      </Link>
      {signedIn ? (
        <Link
          to="/account"
          data-testid="bottom-bar-account"
          data-tick=""
          aria-label={label("panel.account")}
          aria-current={account ? "page" : undefined}
          className={cn(ITEM, tone(account))}
        >
          <ItemBody icon={CircleUser} label={label("panel.account")} current={account} />
        </Link>
      ) : (
        <Link
          to="/auth"
          data-testid="bottom-bar-sign-in"
          data-tick=""
          aria-label={label("auth.signIn")}
          aria-current={signInPage ? "page" : undefined}
          className={cn(ITEM, tone(signInPage))}
        >
          <ItemBody icon={LogIn} label={label("auth.signIn")} current={signInPage} />
        </Link>
      )}
      {signedIn && auth.isAdmin ? (
        <Link
          to="/admin"
          data-testid="bottom-bar-admin"
          data-tick=""
          aria-label={label("panel.admin")}
          aria-current={admin ? "page" : undefined}
          className={cn(ITEM, tone(admin))}
        >
          <ItemBody icon={Shield} label={label("panel.admin")} current={admin} />
        </Link>
      ) : null}
    </nav>
  );
}

export default BottomBar;
