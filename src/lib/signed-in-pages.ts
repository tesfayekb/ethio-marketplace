/**
 * INC-925 (Foundations turn 34w) — THE PAGES WHOSE DOOR-STEP IS requireSignedIn
 * (src/lib/signed-in-route.ts), as address prefixes: every route whose beforeLoad calls it, and
 * nothing else (scripts/conformance/signed-in-routes.test.ts CF-SIR-4 proves it both ways). The
 * shell's live guard (src/components/app-shell.tsx) reads this list: on these pages a signed-out
 * visitor is left to the door-step (sign in, then back), and only a session this tab held is
 * evacuated. A page that gains the door-step joins here, so the two can never disagree again —
 * /settings gained it (INC-923) while the guard's own list still evacuated it to "/".
 */
export const SIGNED_IN_PAGES: readonly string[] = [
  "/account",
  "/legal/accept",
  "/legal/publishing",
  "/my-listings",
  "/post",
  "/settings",
];

/** True when `pathname` is one of SIGNED_IN_PAGES or a page below one. */
export function sendsToSignIn(pathname: string): boolean {
  return SIGNED_IN_PAGES.some((page) => pathname === page || pathname.startsWith(`${page}/`));
}
