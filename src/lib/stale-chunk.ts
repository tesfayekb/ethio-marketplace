/**
 * INC-640 — A TAB OPENED BEFORE A PUBLISH HOLDS THE OLD CHUNK NAMES. The build
 * names every lazily loaded piece (the phone library, the map, the photo
 * editor, a route) by a content hash; a Publish replaces them all, and a page
 * that was open before it still asks for the old names, which are gone. The
 * first such import then fails — on 2026-10-15 the contact step said "The phone
 * box could not be loaded" and Try again could not help, because the page
 * itself was stale. Vite announces a failed chunk load as `vite:preloadError`
 * on the window; this reloads the page ONCE, so the browser fetches the new
 * names. A second failure within a minute is left to surface (a real network
 * failure must not loop the page); after that minute a later Publish gets its
 * own one reload. The mark lives in sessionStorage (this tab only) and is
 * best-effort: a browser that refuses storage still reloads once per page life.
 * INC-922 (Foundations turn 34b-1; turn 34's reviewer, MAJOR 3) — only a page's
 * FIRST failed download may reload it: a page whose first failure was left to
 * surface (it came within the minute) is never reloaded by a later one, so a
 * form the person has been filling for more than a minute is not thrown away;
 * that failure is left to the piece that asked for the download to answer.
 * DEC-271 (Foundations turn 34w) — a download that fails while the device is offline is no stale
 * chunk: a reload would only show the browser's own "cannot open" page. It is left to the piece
 * that asked (the on-demand notice, src/lib/on-demand-failure.ts), and it counts as the page's
 * first failure, so no later one reloads the page either.
 */

export const STALE_CHUNK_KEY = "ethio:stale-chunk-reloaded-at";
/** Within this window a second failed load is not answered with another reload. */
export const STALE_CHUNK_WINDOW_MS = 60_000;

export interface StaleChunkWindow {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
  location: { reload: () => void };
  sessionStorage?: Pick<Storage, "getItem" | "setItem">;
  navigator?: { onLine: boolean };
}

/** True when the tab reloaded for a stale chunk less than a minute ago. */
function reloadedRecently(win: StaleChunkWindow, now: number): boolean {
  try {
    const at = Number(win.sessionStorage?.getItem(STALE_CHUNK_KEY) ?? "");
    return Number.isFinite(at) && at > 0 && now - at < STALE_CHUNK_WINDOW_MS;
  } catch {
    return false;
  }
}

/**
 * Installs the handler; returns the uninstaller. `failedInPage` lets only the
 * page's first failure reload it — one reload per page life, never a loop, also
 * where storage is refused.
 */
export function reloadOnStaleChunk(
  win: StaleChunkWindow,
  now: () => number = () => Date.now(),
): () => void {
  let failedInPage = false;
  const onPreloadError = (event: Event) => {
    const at = now();
    const first = !failedInPage;
    failedInPage = true;
    if (!first || win.navigator?.onLine === false || reloadedRecently(win, at)) return;
    try {
      win.sessionStorage?.setItem(STALE_CHUNK_KEY, String(at));
    } catch {
      // Storage refused: the in-page guard alone holds.
    }
    // Vite throws the error after this event unless it is prevented; the reload answers it.
    event.preventDefault();
    win.location.reload();
  };
  win.addEventListener("vite:preloadError", onPreloadError);
  return () => win.removeEventListener("vite:preloadError", onPreloadError);
}
