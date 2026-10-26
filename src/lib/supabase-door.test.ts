import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-261 (Foundations turn 34) — THE CLIENT'S DOOR. A signed-out visitor's page
 * never fetches the Supabase client: auth events, the session and database
 * functions answer without it, exactly as the client answered a signed-out
 * caller. Each test loads the door afresh (vi.resetModules) and the client's mock
 * afresh (vi.doMock), so `imported` counts that case's import only (ruling 2, R2-4),
 * and sets its own environment (INC-880).
 */
const state = vi.hoisted(() => {
  const state = {
    imported: 0,
    listeners: new Array<(event: string, session: unknown) => void>(),
    rpc: vi.fn(),
    getSession: vi.fn(),
    /** The client's chunk fails to download (a dropped connection on a phone). */
    downloadFails: false,
    module: () => {
      if (state.downloadFails) throw new TypeError("Failed to fetch dynamically imported module");
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
    },
  };
  return state;
});

vi.mock("@/integrations/supabase/client", () => state.module());

/**
 * The client's chunk fails to download. One flag on the one factory: a second vi.doMock of
 * the same path races the first (vitest resolves queued mocks concurrently).
 */
function failClientDownload() {
  state.downloadFails = true;
}

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

/**
 * Ruling 3 (R3-4) — each case's door import registers its own window `storage` listener: kept
 * here, read by the case that registered it, and removed after the case, so no earlier case's
 * door hears a later case's event.
 */
const storageListeners: unknown[] = [];
const addWindowListener = window.addEventListener;

beforeEach(() => {
  Reflect.set(window, "addEventListener", (type: unknown, listener: unknown, options: unknown) => {
    if (type === "storage") storageListeners.push(listener);
    Reflect.apply(addWindowListener, window, [type, listener, options]);
  });
  vi.resetModules();
  vi.doMock("@/integrations/supabase/client", () => state.module());
  state.imported = 0;
  state.downloadFails = false;
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
  for (const listener of storageListeners.splice(0))
    Reflect.apply(window.removeEventListener, window, ["storage", listener]);
  Reflect.set(window, "addEventListener", addWindowListener);
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
    // This case's import registered the one storage listener on the window (R3-4).
    expect(storageListeners).toHaveLength(1);
    const heard: string[] = [];
    onAuthChange((event) => heard.push(event));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(state.imported).toBe(0);
    window.dispatchEvent(new StorageEvent("storage", { key: STORED, newValue: "{}" }));
    // Only this door hears it; its waiting listener is the one attached to the client.
    await vi.waitFor(() => expect(state.listeners).toHaveLength(1));
    state.listeners[0]?.("SIGNED_IN", { user: { id: "u" } });
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
    expect(warn).toHaveBeenCalledWith("[supabase-door] the session read failed: offline");
    warn.mockRestore();
  });

  it("SBD-13 a framed page (a Lovable preview's broker) starts the client at once, with nothing stored", async () => {
    // With nothing stored, only the frame can start the client: the proof is the call's path.
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

  it("SBD-14 a database function for a signed-in caller whose client fails to download answers an error, never a rejection (INC-915)", async () => {
    window.localStorage.setItem(STORED, "{}");
    failClientDownload();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { rpc } = await door();
    const answer = await rpc("get_my_permissions");
    expect(answer.data).toBeNull();
    expect(answer.error?.message).toMatch(/^the client did not load: /);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/^\[supabase-door\] the client did not load: /),
    );
    warn.mockRestore();
  });

  it("SBD-15 the session of a signed-in caller whose client fails to download is a failed read (INC-915)", async () => {
    window.localStorage.setItem(STORED, "{}");
    failClientDownload();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const { currentSession } = await door();
    expect(await currentSession()).toEqual({ session: null, failed: true });
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/^\[supabase-door\] the client did not load: /),
    );
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining("the session read failed"));
    warn.mockRestore();
  });

  it("SBD-16 a listener unsubscribed before the client arrives never hears an event", async () => {
    // Signed out: the next task's INITIAL_SESSION null is dropped.
    const signedOut = await door();
    const heardOut: string[] = [];
    signedOut.onAuthChange((event) => heardOut.push(event)).unsubscribe();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(heardOut).toEqual([]);
    // Signed in: the client arrives after the unsubscribe and is never handed the listener.
    vi.resetModules();
    window.localStorage.setItem(STORED, "{}");
    const signedIn = await door();
    const heardIn: string[] = [];
    signedIn.onAuthChange((event) => heardIn.push(event)).unsubscribe();
    expect(await signedIn.getSupabase()).toBeDefined();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(state.listeners).toEqual([]);
    expect(heardIn).toEqual([]);
  });

  it("SBD-17 a storage event that removes the key starts no download", async () => {
    await door();
    // Only this case's door listens (R3-4), so `imported` judges its listener alone.
    expect(storageListeners).toHaveLength(1);
    window.dispatchEvent(new StorageEvent("storage", { key: STORED, newValue: null }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(state.imported).toBe(0);
  });
});
