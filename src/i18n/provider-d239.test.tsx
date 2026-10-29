import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/**
 * D239 — the account rule at session start, and every open tab follows the
 * star. The auth event, the account read and the account save are mocked; the
 * publication gate's list is answered by a stubbed fetch.
 */

type Listener = (event: string, session: { user: { id: string } } | null) => void;

const auth = vi.hoisted(() => ({
  listeners: new Set<(event: string, session: { user: { id: string } } | null) => void>(),
  fetchPreferredLanguage: vi.fn(),
  savePreferredLanguage: vi.fn(),
}));

vi.mock("@/lib/supabase-door", () => ({
  onAuthChange: (listener: Listener) => {
    auth.listeners.add(listener);
    return { unsubscribe: () => auth.listeners.delete(listener) };
  },
  projectEnv: () => ({ url: "https://abcdefghijklmnop.supabase.co", key: "publishable" }),
}));
vi.mock("@/features/auth/auth-service", () => ({
  fetchPreferredLanguage: () => auth.fetchPreferredLanguage(),
  savePreferredLanguage: (code: string | null) => auth.savePreferredLanguage(code),
}));
vi.mock("./bundle", () => ({
  fetchUiBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
  fetchEntityBundle: () => Promise.resolve({ bundle: null, reason: "test" }),
}));

const { I18nProvider, useI18n, LANGUAGE_STAR_STORAGE_KEY, LANGUAGE_STORAGE_KEY } =
  await import("./provider");

const GATE = [
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
  { code: "am", name_en: "Amharic", name_native: "አማርኛ", rtl: false, sort: 1 },
];

function Probe() {
  const { language, setStar } = useI18n();
  return (
    <div>
      <p data-testid="language">{language}</p>
      <button type="button" onClick={() => setStar("am")}>
        am
      </button>
    </div>
  );
}

function emit(session: { user: { id: string } } | null, event = "SIGNED_IN") {
  act(() => {
    for (const listener of auth.listeners) listener(event, session);
  });
}

async function mount() {
  render(
    <I18nProvider>
      <Probe />
    </I18nProvider>,
  );
  // The gate answers; the language list is the publication gate's.
  await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
}

function setDevice(code: string) {
  window.localStorage.setItem(LANGUAGE_STAR_STORAGE_KEY, code);
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
}

function languageShown() {
  return screen.getByTestId("language").textContent;
}

const flush = () => act(() => new Promise((resolve) => setTimeout(resolve, 20)));

beforeEach(() => {
  window.localStorage.clear();
  document.cookie = "ethio_lang_star=; Path=/; Max-Age=0";
  auth.listeners.clear();
  auth.fetchPreferredLanguage.mockReset();
  auth.savePreferredLanguage.mockReset().mockResolvedValue({ ok: true });
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string) =>
      String(url).includes("/rest/v1/languages")
        ? Promise.resolve(new Response(JSON.stringify(GATE), { status: 200 }))
        : new Promise(() => undefined),
    ),
  );
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("D239 — the account rule at session start", () => {
  it("LANG-D239-U1 a published account language replaces the device's star, cookie and current choice, with no account write", async () => {
    setDevice("am");
    auth.fetchPreferredLanguage.mockResolvedValue({ ok: true, code: "en" });
    await mount();
    await waitFor(() => expect(languageShown()).toBe("am"));
    emit({ user: { id: "user-1" } });
    await waitFor(() => expect(languageShown()).toBe("en"));
    expect(window.localStorage.getItem(LANGUAGE_STAR_STORAGE_KEY)).toBe("en");
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en");
    expect(document.cookie).toContain("ethio_lang_star=en");
    expect(auth.savePreferredLanguage).not.toHaveBeenCalled();
  });

  it("LANG-D239-U2 an account with no language receives the device's current language once", async () => {
    setDevice("am");
    auth.fetchPreferredLanguage.mockResolvedValue({ ok: true, code: null });
    await mount();
    emit({ user: { id: "user-1" } });
    await waitFor(() => expect(auth.savePreferredLanguage).toHaveBeenCalledTimes(1));
    expect(auth.savePreferredLanguage).toHaveBeenCalledWith("am");
    expect(languageShown()).toBe("am");
  });

  it("LANG-D239-U3 an unpublished account language is ignored: the device keeps its choice and the account is not written", async () => {
    setDevice("am");
    auth.fetchPreferredLanguage.mockResolvedValue({ ok: true, code: "ti" });
    await mount();
    emit({ user: { id: "user-1" } });
    await waitFor(() => expect(auth.fetchPreferredLanguage).toHaveBeenCalledTimes(1));
    await flush();
    expect(languageShown()).toBe("am");
    expect(window.localStorage.getItem(LANGUAGE_STAR_STORAGE_KEY)).toBe("am");
    expect(auth.savePreferredLanguage).not.toHaveBeenCalled();
  });

  it("LANG-D239-U4 a failed account read keeps the device's choice, logs one named line and writes nothing", async () => {
    setDevice("am");
    auth.fetchPreferredLanguage.mockResolvedValue({
      ok: false,
      signedOut: false,
      error: new ReaderError({ class: "network", message: "Failed to fetch" }),
    });
    await mount();
    emit({ user: { id: "user-1" } });
    await waitFor(() =>
      expect(console.warn).toHaveBeenCalledWith(
        "[i18n] account language read failed: Failed to fetch",
      ),
    );
    expect(languageShown()).toBe("am");
    expect(auth.savePreferredLanguage).not.toHaveBeenCalled();
  });

  it("LANG-D239-U5 a token refresh (same user) never re-runs the rule", async () => {
    auth.fetchPreferredLanguage.mockResolvedValue({ ok: true, code: "en" });
    await mount();
    emit({ user: { id: "user-1" } });
    await waitFor(() => expect(auth.fetchPreferredLanguage).toHaveBeenCalledTimes(1));
    emit({ user: { id: "user-1" } }, "TOKEN_REFRESHED");
    await flush();
    expect(auth.fetchPreferredLanguage).toHaveBeenCalledTimes(1);
  });

  it("LANG-D239-U6 sign-out keeps the current language and the star", async () => {
    setDevice("am");
    auth.fetchPreferredLanguage.mockResolvedValue({ ok: true, code: "am" });
    await mount();
    emit({ user: { id: "user-1" } });
    await waitFor(() => expect(auth.fetchPreferredLanguage).toHaveBeenCalledTimes(1));
    emit(null, "SIGNED_OUT");
    await flush();
    expect(languageShown()).toBe("am");
    expect(window.localStorage.getItem(LANGUAGE_STAR_STORAGE_KEY)).toBe("am");
  });
});

describe("D239 R4 — every open tab follows the star", () => {
  it("LANG-D239-U7 another tab's star switches this tab, with no account write", async () => {
    await mount();
    await waitFor(() => expect(languageShown()).toBe("en"));
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", { key: LANGUAGE_STAR_STORAGE_KEY, newValue: "am" }),
      );
    });
    await waitFor(() => expect(languageShown()).toBe("am"));
    expect(auth.savePreferredLanguage).not.toHaveBeenCalled();
    expect(auth.fetchPreferredLanguage).not.toHaveBeenCalled();
  });

  it("LANG-D239-U8 a signed-out pick never reaches the account: no read, and the save answers no session", async () => {
    auth.savePreferredLanguage.mockResolvedValue({ ok: false, reason: "no session" });
    await mount();
    emit(null, "INITIAL_SESSION");
    act(() => screen.getByRole("button", { name: "am" }).click());
    await waitFor(() => expect(languageShown()).toBe("am"));
    // The pick hands the code to the seam, whose own session check refuses it
    // (auth-service: no session → no RPC); the rule never reads the account.
    expect(auth.fetchPreferredLanguage).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalledWith(
      expect.stringContaining("account language sync failed"),
    );
  });
});
