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
 */

export const STALE_CHUNK_KEY = "ethio:stale-chunk-reloaded-at";
/** Within this window a second failed load is not answered with another reload. */
export const STALE_CHUNK_WINDOW_MS = 60_000;

export interface StaleChunkWindow {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
  location: { reload: () => void };
  sessionStorage?: Pick<Storage, "getItem" | "setItem">;
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
 * Installs the handler; returns the uninstaller. `reloadedInPage` guards the
 * case where storage is refused: one reload per page life, never a loop.
 */
export function reloadOnStaleChunk(
  win: StaleChunkWindow,
  now: () => number = () => Date.now(),
): () => void {
  let reloadedInPage = false;
  const onPreloadError = (event: Event) => {
    const at = now();
    if (reloadedInPage || reloadedRecently(win, at)) return;
    reloadedInPage = true;
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
