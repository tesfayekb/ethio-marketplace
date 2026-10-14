/**
 * INC-610 — CHANGE THE ADDRESS BAR WITHOUT A NAVIGATION.
 *
 * The router's history (@tanstack/history, `createBrowserHistory`) replaces
 * `window.history.replaceState` with its own function, which tells the router
 * of every call as a navigation. INC-604 called it to give a new draft its own
 * address (/post → /post/<id>), so the router mounted the resume route and the
 * wizard was mounted again: its save state went back to idle, an invite's
 * prefill was lost, and the posting tests failed together (CI run 38460460625).
 *
 * The browser's own method, on `History.prototype`, changes the address and the
 * entry only. The router keeps the page it rendered; it reads the new address on
 * the next Back, Forward or reload — which is what INC-604 needs.
 */
export function replaceAddressQuietly(path: string): void {
  if (typeof window === "undefined") return;
  History.prototype.replaceState.call(window.history, window.history.state, "", path);
}
