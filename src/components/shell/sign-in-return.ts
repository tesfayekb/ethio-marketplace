/**
 * D11 (DEC-464) — the search a Sign in link carries: the page the person is on, so sign-in brings
 * them back there (the sign-in page checks it with `safeReturnPath`). The sign-in page itself
 * carries nothing.
 */
export function signInReturn(href: string): { return?: string } {
  return href.startsWith("/auth") ? {} : { return: href };
}
