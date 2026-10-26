import { describe, expect, it } from "vitest";

import { reloadOnStaleChunk, STALE_CHUNK_KEY, STALE_CHUNK_WINDOW_MS } from "./stale-chunk";

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
  const fire = () => {
    const event = new Event("vite:preloadError", { cancelable: true });
    for (const listener of listeners.get("vite:preloadError") ?? []) listener(event);
    return event;
  };
  return { win, fire, reloads: () => reloads, listeners };
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
