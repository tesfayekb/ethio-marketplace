import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { enBase } from "./locales/en-base";
import type { Language, MessageKey, Messages } from "./types";

/**
 * INC-872 — `<html lang>` follows the APPLIED catalog (`appliedLanguage`),
 * never the selection. The compiled loaders are mocked with promises resolved
 * by hand, so the moment between "language chosen" and "catalog applied" is
 * observable.
 */

const KEY = Object.keys(enBase)[0] as MessageKey;
const EN_TEXT = (enBase as unknown as Messages)[KEY];
const AM_TEXT = "ILA-amharic-text";

const loaders = vi.hoisted(() => ({
  pending: new Map<string, { resolve: (value: Record<string, string>) => void }>(),
  accountReads: [] as string[],
}));

// INC-1268 — the provider subscribes to no auth event (the shell writes who is signed in): the door's
// mock holds none, so a subscription would throw.
vi.mock("@/lib/supabase-door", () => ({
  // Turn 34c-2 — the language list reads the project through the door (its fetch never answers here).
  projectEnv: () => ({ url: "https://abcdefghijklmnop.supabase.co", key: "publishable" }),
}));
vi.mock("@/features/auth/preferred-language", () => ({
  fetchPreferredLanguage: () => {
    loaders.accountReads.push("read");
    return new Promise(() => undefined);
  },
  savePreferredLanguage: () => Promise.resolve({ ok: true }),
}));
vi.mock("./bundle", () => ({
  fetchUiBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
  fetchEntityBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
}));
vi.mock("./compiled-catalog", async (importOriginal) => {
  const real = await importOriginal<typeof import("./compiled-catalog")>();
  return {
    ...real,
    compiledCatalogLoader: (code: string) =>
      code === "am"
        ? () =>
            new Promise<Record<string, string>>((resolve) => {
              loaders.pending.set(code, { resolve });
            })
        : undefined,
  };
});

const { I18nProvider } = await import("./provider");
const { useI18n, useAuthIdentityWriter } = await import("./i18n-context");

function Probe() {
  const { t, setStar } = useI18n();
  return (
    <div>
      <p data-testid="text">{t(KEY)}</p>
      <button type="button" onClick={() => setStar("am" as Language)}>
        am
      </button>
      <button type="button" onClick={() => setStar("en" as Language)}>
        en
      </button>
      <button type="button" onClick={() => setStar("ti" as Language)}>
        ti
      </button>
    </div>
  );
}

beforeEach(() => {
  loaders.pending.clear();
  loaders.accountReads.length = 0;
  window.localStorage.clear();
  document.documentElement.lang = "";
  vi.stubGlobal(
    "fetch",
    vi.fn(() => new Promise(() => undefined)),
  );
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function mount() {
  render(
    <I18nProvider>
      <Probe />
    </I18nProvider>,
  );
}

describe("declared page language (INC-872)", () => {
  it("ILA-1 the language is am but its catalog has not resolved: lang is still en over English", async () => {
    mount();
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));
    act(() => screen.getByRole("button", { name: "am" }).click());
    await waitFor(() => expect(loaders.pending.has("am")).toBe(true));
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByTestId("text").textContent).toBe(EN_TEXT);
  });

  it("ILA-2 once the am catalog resolves, lang and text change together", async () => {
    mount();
    act(() => screen.getByRole("button", { name: "am" }).click());
    await waitFor(() => expect(loaders.pending.has("am")).toBe(true));
    await act(async () => loaders.pending.get("am")?.resolve({ [KEY]: AM_TEXT }));
    await waitFor(() => {
      expect(document.documentElement.lang).toBe("am");
      expect(screen.getByTestId("text").textContent).toBe(AM_TEXT);
    });
  });

  it("ILA-3 a language with no compiled catalog (DB-only) is declared only when its base layer applies", async () => {
    const seen: string[] = [];
    mount();
    await waitFor(() => expect(document.documentElement.lang).toBe("en"));
    const observer = new MutationObserver(() => seen.push(document.documentElement.lang));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    act(() => screen.getByRole("button", { name: "ti" }).click());
    await waitFor(() => expect(document.documentElement.lang).toBe("ti"));
    observer.disconnect();
    // The base layer is what applied: English text, declared as the applied language.
    expect(screen.getByTestId("text").textContent).toBe(EN_TEXT);
    expect(seen).toEqual(["ti"]);
  });

  it("ILA-4 switching back to en declares en with the English messages", async () => {
    mount();
    act(() => screen.getByRole("button", { name: "am" }).click());
    await waitFor(() => expect(loaders.pending.has("am")).toBe(true));
    await act(async () => loaders.pending.get("am")?.resolve({ [KEY]: AM_TEXT }));
    await waitFor(() => expect(document.documentElement.lang).toBe("am"));
    act(() => screen.getByRole("button", { name: "en" }).click());
    await waitFor(() => {
      expect(document.documentElement.lang).toBe("en");
      expect(screen.getByTestId("text").textContent).toBe(EN_TEXT);
    });
  });

  /**
   * INC-1268 (ILA-6) — the provider follows the identity the shell writes and subscribes to no auth event:
   * the account's language read starts only for a settled, signed-in write (loading included), once.
   */
  it("ILA-6 the provider follows the identity the shell writes: nothing is read while the session is unknown, the settled write reads once", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve(
          new Response(
            JSON.stringify([
              { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
            ]),
            { status: 200 },
          ),
        ),
      ),
    );
    let write: ReturnType<typeof useAuthIdentityWriter> | null = null;
    function Shell() {
      write = useAuthIdentityWriter();
      return null;
    }
    render(
      <I18nProvider>
        <Shell />
        <Probe />
      </I18nProvider>,
    );
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    // The shell has written nothing, then a user while the session is still loading: no read.
    act(() => write?.({ settled: false, userId: "user-1" }));
    await act(() => new Promise((resolve) => setTimeout(resolve, 30)));
    expect(loaders.accountReads).toEqual([]);
    act(() => write?.({ settled: true, userId: "user-1" }));
    await waitFor(() => expect(loaders.accountReads).toEqual(["read"]));
    // The same identity written again (a token refresh) reads nothing more.
    act(() => write?.({ settled: true, userId: "user-1" }));
    await act(() => new Promise((resolve) => setTimeout(resolve, 30)));
    expect(loaders.accountReads).toEqual(["read"]);
  });
});
