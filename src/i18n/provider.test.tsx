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
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
  },
}));
vi.mock("@/features/auth/auth-service", () => ({
  fetchPreferredLanguage: () => new Promise(() => undefined),
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

const { I18nProvider, useI18n } = await import("./provider");

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
});
