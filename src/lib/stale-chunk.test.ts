import { describe, expect, it } from "vitest";

import {
  hearLeaving,
  reloadOnStaleChunk,
  STALE_CHUNK_KEY,
  STALE_CHUNK_WINDOW_MS,
} from "./stale-chunk";

/** A window stand-in: listeners, a reload counter and a storage that can refuse. */
function fakeWindow(storage: Map<string, string> | null = new Map()) {
  const listeners = new Map<string, EventListener[]>();
  let reloads = 0;
  const win = {
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.set(type, [...(listeners.get(type) ?? []), listener as EventListener]);
    },
    removeEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
      listeners.set(
        type,
        (listeners.get(type) ?? []).filter((entry) => entry !== listener),
      );
    },
    location: {
      reload: () => {
        reloads += 1;
      },
    },
    sessionStorage:
      storage === null
        ? {
            getItem: () => {
              throw new Error("storage refused");
            },
            setItem: () => {
              throw new Error("storage refused");
            },
          }
        : {
            getItem: (key: string) => storage.get(key) ?? null,
            setItem: (key: string, value: string) => {
              storage.set(key, value);
            },
          },
  };
  const dispatch = (event: Event) => {
    for (const listener of listeners.get(event.type) ?? []) listener(event);
    return event;
  };
  const fire = () => dispatch(new Event("vite:preloadError", { cancelable: true }));
  /** A page event by type; `pageshow` takes `persisted` as the back-forward cache sets it. */
  const send = (type: string, persisted = false) =>
    dispatch(Object.assign(new Event(type), type === "pageshow" ? { persisted } : {}));
  return { win, fire, send, reloads: () => reloads, listeners };
}

describe("reloadOnStaleChunk (INC-640)", () => {
  it("reloads once on the first failed chunk load and marks the time", () => {
    const storage = new Map<string, string>();
    const { win, fire, reloads } = fakeWindow(storage);
    reloadOnStaleChunk(win, () => 1_000);
    const event = fire();
    expect(reloads()).toBe(1);
    expect(event.defaultPrevented).toBe(true);
    expect(storage.get(STALE_CHUNK_KEY)).toBe("1000");
  });

  it("does not reload again within the window, in the same page or a fresh one", () => {
    const storage = new Map<string, string>();
    const first = fakeWindow(storage);
    reloadOnStaleChunk(first.win, () => 1_000);
    first.fire();
    first.fire();
    expect(first.reloads()).toBe(1);
    // The page that came back from the reload: the mark holds it to one.
    const second = fakeWindow(storage);
    reloadOnStaleChunk(second.win, () => 1_000 + STALE_CHUNK_WINDOW_MS - 1);
    const event = second.fire();
    expect(second.reloads()).toBe(0);
    expect(event.defaultPrevented).toBe(false);
  });

  it("reloads again once the window has passed (a later Publish gets its own reload)", () => {
    const storage = new Map<string, string>([[STALE_CHUNK_KEY, "1000"]]);
    const { win, fire, reloads } = fakeWindow(storage);
    reloadOnStaleChunk(win, () => 1_000 + STALE_CHUNK_WINDOW_MS);
    fire();
    expect(reloads()).toBe(1);
    expect(storage.get(STALE_CHUNK_KEY)).toBe(String(1_000 + STALE_CHUNK_WINDOW_MS));
  });

  it("STC-1 a page whose first failure came within the window is never reloaded by a later one (INC-922)", () => {
    const storage = new Map<string, string>([[STALE_CHUNK_KEY, "1000"]]);
    let clock = 1_000 + 2_000;
    const { win, fire, reloads } = fakeWindow(storage);
    reloadOnStaleChunk(win, () => clock);
    // The page that came back from the reload fails at once: left to surface.
    expect(fire().defaultPrevented).toBe(false);
    // More than a minute later, a submit's download fails again: the form is not thrown away.
    clock = 1_000 + STALE_CHUNK_WINDOW_MS + 10_000;
    const later = fire();
    expect(reloads()).toBe(0);
    expect(later.defaultPrevented).toBe(false);
  });

  it("STC-2 a download that fails offline is no stale chunk: no reload, then or later (DEC-271)", () => {
    const net = { onLine: false };
    const { win, fire, reloads } = fakeWindow();
    reloadOnStaleChunk({ ...win, navigator: net }, () => 1_000);
    expect(fire().defaultPrevented).toBe(false);
    net.onLine = true;
    expect(fire().defaultPrevented).toBe(false);
    expect(reloads()).toBe(0);
  });

  it("STC-3 a download the leaving page abandons never reloads it, after beforeunload or pagehide (INC-1127)", () => {
    for (const leave of ["beforeunload", "pagehide"]) {
      const storage = new Map<string, string>();
      const { win, fire, send, reloads } = fakeWindow(storage);
      reloadOnStaleChunk(win, () => 1_000);
      send(leave);
      expect(fire().defaultPrevented, leave).toBe(false);
      expect(fire().defaultPrevented, leave).toBe(false);
      expect(reloads(), leave).toBe(0);
      expect(storage.has(STALE_CHUNK_KEY), leave).toBe(false);
    }
  });

  it("STC-4 a leave that did not happen ends at the next press or key, and a page back from the back-forward cache is staying: a stale chunk reloads once (INC-1127)", () => {
    for (const stay of ["pointerdown", "keydown"]) {
      const { win, fire, send, reloads } = fakeWindow();
      reloadOnStaleChunk(win, () => 1_000);
      send("beforeunload");
      send(stay);
      expect(fire().defaultPrevented, stay).toBe(true);
      expect(reloads(), stay).toBe(1);
    }
    const kept = fakeWindow();
    reloadOnStaleChunk(kept.win, () => 1_000);
    kept.send("pagehide");
    kept.send("pageshow", false);
    kept.fire();
    expect(kept.reloads()).toBe(0);
    kept.send("pageshow", true);
    kept.fire();
    expect(kept.reloads()).toBe(1);
  });

  it("STC-5 an abandoned download is not the page's first failure: the page's own first failure keeps its one reload, a second gets none (INC-640, INC-922)", () => {
    const { win, fire, send, reloads } = fakeWindow();
    reloadOnStaleChunk(win, () => 1_000);
    send("beforeunload");
    fire();
    expect(reloads()).toBe(0);
    send("pointerdown");
    expect(fire().defaultPrevented).toBe(true);
    expect(fire().defaultPrevented).toBe(false);
    expect(reloads()).toBe(1);
  });

  it("STC-6 a leave heard before the handler was mounted (a first load left before hydration ends) still keeps the reload away; the window is heard once for its life (INC-1127)", () => {
    const { win, fire, send, reloads, listeners } = fakeWindow();
    hearLeaving(win);
    send("beforeunload");
    const off = reloadOnStaleChunk(win, () => 1_000);
    expect(fire().defaultPrevented).toBe(false);
    expect(reloads()).toBe(0);
    off();
    reloadOnStaleChunk(win, () => 1_000);
    for (const type of ["beforeunload", "pagehide", "pageshow", "pointerdown", "keydown"])
      expect(listeners.get(type), type).toHaveLength(1);
  });

  it("still reloads once per page when storage is refused", () => {
    const { win, fire, reloads } = fakeWindow(null);
    reloadOnStaleChunk(win, () => 1_000);
    fire();
    fire();
    expect(reloads()).toBe(1);
  });

  it("uninstalls", () => {
    const { win, fire, reloads, listeners } = fakeWindow();
    const off = reloadOnStaleChunk(win, () => 1_000);
    off();
    fire();
    expect(reloads()).toBe(0);
    expect(listeners.get("vite:preloadError")).toEqual([]);
  });
});
