import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { callRoute, downloadRoute } from "./route-client";

const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: { getSession } } }));
const fetchMock = vi.fn();
const jsonAnswer = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
  fetchMock.mockReset().mockResolvedValue(jsonAnswer({}));
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("browser route client", () => {
  it("RCL-1 required without a session sends nothing", async () => {
    expect(await callRoute("/api/x")).toEqual({ kind: "signedOut" });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(getSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-2 attaches the exact session bearer once", async () => {
    getSession.mockResolvedValue({ data: { session: { access_token: "test-token" } } });
    await callRoute("/api/x");
    const [path, init] = fetchMock.mock.calls[0];
    expect(path).toBe("/api/x");
    expect(init.headers.get("Authorization")).toBe("Bearer test-token");
    expect(init.headers.get("Accept")).toBe("application/json");
    expect(init.headers.has("Content-Type")).toBe(false);
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(getSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-3 optional without a session still sends without a bearer", async () => {
    expect((await callRoute("/api/x", { auth: "optional" })).kind).toBe("answered");
    expect(fetchMock.mock.calls[0][1].headers.has("Authorization")).toBe(false);
  });
  it("RCL-4 none does not read a session", async () => {
    await callRoute("/api/x", { auth: "none" });
    expect(getSession).not.toHaveBeenCalled();
  });
  it("RCL-5 JSON alone selects POST and preserves its body", async () => {
    await callRoute("/api/x", { auth: "none", json: { mode: "commit" } });
    const init = fetchMock.mock.calls[0][1];
    expect(init.method).toBe("POST");
    expect(init.headers.get("Content-Type")).toBe("application/json");
    expect(init.body).toBe('{"mode":"commit"}');
  });
  it("RCL-6 reads the 409 envelope without phantom success", async () => {
    fetchMock.mockResolvedValue(jsonAnswer({ error: "fileChanged", detail: "x" }, 409));
    expect(await callRoute("/api/x", { auth: "none" })).toEqual({
      kind: "answered",
      status: 409,
      ok: false,
      payload: { error: "fileChanged", detail: "x" },
      error: "fileChanged",
      detail: "x",
    });
  });
  it("RCL-7 a non-JSON 502 preserves its status", async () => {
    fetchMock.mockResolvedValue(new Response("unavailable", { status: 502 }));
    expect(await callRoute("/api/x", { auth: "none" })).toEqual({
      kind: "answered",
      status: 502,
      ok: false,
      payload: null,
      error: null,
      detail: null,
    });
  });
  it("RCL-8 a thrown fetch is unreachable network", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await callRoute("/api/x", { auth: "none" })).toEqual({
      kind: "unreachable",
      reason: "network",
    });
  });
  it("RCL-9 deadline and caller abort remain distinct", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(
      (_path, init) =>
        new Promise((_resolve, reject) => {
          init.signal.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    );
    const deadline = callRoute("/api/x", { auth: "none", timeoutMs: 30 });
    await vi.advanceTimersByTimeAsync(30);
    expect(await deadline).toEqual({ kind: "unreachable", reason: "timeout" });
    const caller = new AbortController();
    const aborted = callRoute("/api/x", { auth: "none", signal: caller.signal });
    caller.abort();
    expect(await aborted).toEqual({ kind: "unreachable", reason: "aborted" });
    expect(vi.getTimerCount()).toBe(0);
  });
  it("RCL-10 download saves exact bytes and filename once; refusal saves nothing", async () => {
    const create = vi.fn().mockReturnValue("blob:test");
    const revoke = vi.fn();
    vi.stubGlobal("URL", Object.assign(URL, { createObjectURL: create, revokeObjectURL: revoke }));
    const names: string[] = [];
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      names.push(this.download);
    });
    fetchMock.mockResolvedValue(new Response("\ufeffkey\r\nvalue\r\n"));
    expect(await downloadRoute("/api/x", "scope-definitions.csv", { auth: "none" })).toMatchObject({
      kind: "answered",
      ok: true,
      payload: null,
    });
    expect(names).toEqual(["scope-definitions.csv"]);
    expect(create).toHaveBeenCalledTimes(1);
    expect(Array.from(new Uint8Array(await create.mock.calls[0][0].arrayBuffer()))).toEqual(
      Array.from(new TextEncoder().encode("\ufeffkey\r\nvalue\r\n")),
    );
    expect(revoke).toHaveBeenCalledExactlyOnceWith("blob:test");
    expect(document.querySelector('a[href="blob:test"]')).toBeNull();
    fetchMock.mockResolvedValue(jsonAnswer({ error: "forbidden" }, 403));
    expect(await downloadRoute("/api/x", "no.csv", { auth: "none" })).toMatchObject({
      kind: "answered",
      ok: false,
      status: 403,
      error: "forbidden",
    });
    expect(create).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
  });
});
