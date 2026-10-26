import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR. A signed-out visitor's page
 * never fetches the Supabase client: auth events, the session and database
 * functions answer without it, exactly as the client answered a signed-out
 * caller. Each test loads the door afresh (vi.resetModules) and sets its own
 * environment (INC-880).
 */
const state = vi.hoisted(() => ({
  imported: 0,
  listeners: new Array<(event: string, session: unknown) => void>(),
  rpc: vi.fn(),
  getSession: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => {
  state.imported += 1;
  return {
    supabase: {
      rpc: state.rpc,
      auth: {
        getSession: state.getSession,
        onAuthStateChange: (listener: (event: string, session: unknown) => void) => {
          state.listeners.push(listener);
          return { data: { subscription: { unsubscribe: () => undefined } } };
        },
      },
    },
  };
});

const URL_ = "https://abcdefghijklmnop.supabase.co";
const KEY = "sb_publishable_test_key";
const STORED = "sb-abcdefghijklmnop-auth-token";
const fetchMock = vi.fn();
const json = (body: unknown, status = 200) =>
  new Response(body === undefined ? "" : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function door() {
  return import("./supabase-door");
}

beforeEach(() => {
  vi.resetModules();
  state.imported = 0;
  state.listeners = [];
  state.rpc.mockReset().mockResolvedValue({ data: "from-client", error: null });
  state.getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
  window.localStorage.clear();
  vi.stubEnv("VITE_SUPABASE_URL", URL_);
  vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", KEY);
  fetchMock.mockReset().mockResolvedValue(json(["ok"]));
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("the client's door (DEC-261)", () => {
  it("SBD-1 signed out: the listener hears INITIAL_SESSION null on the next task, and the client is never fetched", async () => {
    const { onAuthChange } = await door();
    const heard: Array<[string, unknown]> = [];
    onAuthChange((event, session) => heard.push([event, session]));
    expect(heard).toEqual([]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(heard).toEqual([["INITIAL_SESSION", null]]);
    expect(state.imported).toBe(0);
  });

  it("SBD-2 signed out: the session is null and the client is never fetched", async () => {
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: false });
    expect(state.imported).toBe(0);
  });

  it("SBD-3 signed out: a database function is the client's own anonymous call — POST, the key as apikey, no bearer for a new key", async () => {
    const { rpc } = await door();
    const answer = await rpc("get_ui_bundle", { p_lang: "am" });
    expect(answer).toEqual({ data: ["ok"], error: null });
    expect(state.imported).toBe(0);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(`${URL_}/rest/v1/rpc/get_ui_bundle`);
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ p_lang: "am" }));
    expect(init.headers.get("apikey")).toBe(KEY);
    expect(init.headers.get("Content-Type")).toBe("application/json");
    expect(init.headers.get("Content-Profile")).toBe("public");
    expect(init.headers.has("Authorization")).toBe(false);
  });

  it("SBD-4 an old anon JWT key is also sent as the bearer, as the client's fetch sends it", async () => {
    const { anonymousHeaders } = await door();
    expect(anonymousHeaders("eyJhbGciOiJIUzI1NiJ9.e30.sig").get("Authorization")).toBe(
      "Bearer eyJhbGciOiJIUzI1NiJ9.e30.sig",
    );
    expect(anonymousHeaders("sb_secret_x").has("Authorization")).toBe(false);
  });

  it("SBD-5 a refusal answers supabase-js's error shape from PostgREST's body", async () => {
    fetchMock.mockResolvedValue(
      json({ code: "42501", message: "permission denied", details: "d", hint: "h" }, 403),
    );
    const { rpc } = await door();
    expect(await rpc("price_unit_labels")).toEqual({
      data: null,
      error: { code: "42501", message: "permission denied", details: "d", hint: "h" },
    });
  });

  it("SBD-6 a network failure answers an error, never a throw", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    const { rpc } = await door();
    const answer = await rpc("price_unit_labels");
    expect(answer.data).toBeNull();
    expect(answer.error?.message).toBe("TypeError: Failed to fetch");
  });

  it("SBD-7 an empty 2xx body is data null", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));
    const { rpc } = await door();
    expect(await rpc("price_unit_labels")).toEqual({ data: null, error: null });
  });

  it("SBD-8 signed in: the client starts when the door loads, and a database function is the client's rpc", async () => {
    window.localStorage.setItem(STORED, JSON.stringify({ access_token: "t", refresh_token: "r" }));
    const { rpc } = await door();
    await vi.waitFor(() => expect(state.imported).toBe(1));
    expect(await rpc("get_my_permissions")).toEqual({ data: "from-client", error: null });
    expect(state.rpc).toHaveBeenCalledWith("get_my_permissions", undefined);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("SBD-9 a sign-in in another tab fetches the client, and a waiting listener is attached to it", async () => {
    const { onAuthChange } = await door();
    const heard: string[] = [];
    onAuthChange((event) => heard.push(event));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(state.imported).toBe(0);
    window.dispatchEvent(new StorageEvent("storage", { key: STORED, newValue: "{}" }));
    // Earlier tests' doors hear the same event; this door's listener is the last attached.
    await vi.waitFor(() => expect(state.listeners.length).toBeGreaterThan(0));
    state.listeners.at(-1)?.("SIGNED_IN", { user: { id: "u" } });
    expect(heard).toEqual(["INITIAL_SESSION", "SIGNED_IN"]);
  });

  it("SBD-10 the storage key is supabase-js's default for the project's URL", async () => {
    const { authStorageKey, storedSessionKey } = await door();
    expect(authStorageKey(URL_)).toBe(STORED);
    expect(storedSessionKey()).toBe(STORED);
    expect(authStorageKey("not a url")).toBeNull();
  });

  it("SBD-11 a session read that throws leaves the session unread, never a rejection", async () => {
    window.localStorage.setItem(STORED, "{}");
    state.getSession.mockRejectedValue(new Error("offline"));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true });
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("SBD-13 a framed page (a Lovable preview's broker) starts the client at once, with nothing stored", async () => {
    // The client module's mock is evaluated once per file (SBD-8 first): the proof is the call's path.
    const parent = vi.spyOn(window, "parent", "get").mockReturnValue(Object.create(window));
    const { hasStoredSession, rpc } = await door();
    expect(hasStoredSession()).toBe(true);
    expect(await rpc("price_unit_labels")).toEqual({ data: "from-client", error: null });
    expect(fetchMock).not.toHaveBeenCalled();
    parent.mockRestore();
  });

  it("SBD-12 without the browser pair (VITE_), the server pair is read, as the client module reads it", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_URL", URL_);
    vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", KEY);
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "");
    const { rpc } = await door();
    await rpc("price_unit_labels");
    expect(fetchMock.mock.calls[0][0]).toBe(`${URL_}/rest/v1/rpc/price_unit_labels`);
  });
});
