import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { callRoute, downloadRoute, uploadRoute } from "./route-client";

// DEC-261 — the session reaches route calls through the client's door (src/lib/supabase-door.ts).
const { currentSession } = vi.hoisted(() => ({ currentSession: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ currentSession }));
const fetchMock = vi.fn();
const jsonAnswer = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  currentSession.mockReset().mockResolvedValue({ session: null, failed: false });
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
    expect(currentSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-2 attaches the exact session bearer once", async () => {
    currentSession.mockResolvedValue({ session: { access_token: "test-token" }, failed: false });
    await callRoute("/api/x");
    const [path, init] = fetchMock.mock.calls[0];
    expect(path).toBe("/api/x");
    expect(init.headers.get("Authorization")).toBe("Bearer test-token");
    expect(init.headers.get("Accept")).toBe("application/json");
    expect(init.headers.has("Content-Type")).toBe(false);
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(currentSession).toHaveBeenCalledTimes(1);
  });
  it("RCL-3 optional without a session still sends without a bearer", async () => {
    expect((await callRoute("/api/x", { auth: "optional" })).kind).toBe("answered");
    expect(fetchMock.mock.calls[0][1].headers.has("Authorization")).toBe(false);
  });
  it("RCL-4 none does not read a session", async () => {
    await callRoute("/api/x", { auth: "none" });
    expect(currentSession).not.toHaveBeenCalled();
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
      headers: expect.any(Headers),
      bytes: null,
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
      headers: expect.any(Headers),
      bytes: null,
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
      bytes: null,
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
  it("RCL-11 a JSON content type with an unparsable body is still answered", async () => {
    fetchMock.mockResolvedValue(
      new Response("not json at all", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    expect(await callRoute("/api/x", { auth: "none" })).toEqual({
      kind: "answered",
      status: 200,
      ok: true,
      payload: null,
      error: null,
      detail: null,
      headers: expect.any(Headers),
      bytes: null,
    });
    fetchMock.mockResolvedValue(
      new Response("{broken", {
        status: 409,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }),
    );
    expect(await callRoute("/api/x", { auth: "none" })).toEqual({
      kind: "answered",
      status: 409,
      ok: false,
      payload: null,
      error: null,
      detail: null,
      headers: expect.any(Headers),
      bytes: null,
    });
  });
  it("RCL-12 a form body sets no Content-Type and posts by default", async () => {
    const form = new FormData();
    form.set("listingId", "l-1");
    await callRoute("/api/x", { auth: "none", form });
    const init = fetchMock.mock.calls[0][1];
    expect(init.method).toBe("POST");
    expect(init.headers.has("Content-Type")).toBe(false);
    expect(init.headers.get("Accept")).toBe("application/json");
    expect(init.body).toBe(form);
  });
  it("RCL-13 expect bytes keeps an image body and headers; a JSON refusal still parses", async () => {
    const imageBytes = new Uint8Array([137, 80, 78, 71]);
    fetchMock.mockResolvedValue(
      new Response(imageBytes, {
        status: 200,
        headers: { "Content-Type": "image/png", "x-tries-left": "2" },
      }),
    );
    const answer = await callRoute("/api/x", { auth: "none", expect: "bytes" });
    expect(answer.kind).toBe("answered");
    if (answer.kind !== "answered") return;
    expect(answer.headers.get("x-tries-left")).toBe("2");
    expect(answer.payload).toBeNull();
    expect(answer.bytes).not.toBeNull();
    expect(Array.from(new Uint8Array(await answer.bytes!.arrayBuffer()))).toEqual(
      Array.from(imageBytes),
    );
    fetchMock.mockResolvedValue(jsonAnswer({ error: "rateLimited", detail: "60" }, 429));
    const refused = await callRoute("/api/x", { auth: "none", expect: "bytes" });
    expect(refused).toEqual({
      kind: "answered",
      status: 429,
      ok: false,
      payload: { error: "rateLimited", detail: "60" },
      error: "rateLimited",
      detail: "60",
      headers: expect.any(Headers),
      bytes: null,
    });
  });
  it("RCL-14 cache and keepalive reach fetch", async () => {
    await callRoute("/api/x", { auth: "none", cache: "no-cache", keepalive: true });
    const init = fetchMock.mock.calls[0][1];
    expect(init.cache).toBe("no-cache");
    expect(init.keepalive).toBe(true);
    await callRoute("/api/x", { auth: "none" });
    const plain = fetchMock.mock.calls[1][1];
    expect("cache" in plain).toBe(false);
    expect("keepalive" in plain).toBe(false);
  });
});

describe("uploadRoute — the XHR transport", () => {
  type Handler = (() => void) | null;
  class XhrDouble {
    static instances: XhrDouble[] = [];
    upload: { onprogress: ((event: ProgressEvent) => void) | null } = { onprogress: null };
    status = 200;
    responseText = '{"ok":true}';
    responseHeaders = "content-type: application/json\r\n";
    onload: Handler = null;
    onerror: Handler = null;
    ontimeout: Handler = null;
    onabort: Handler = null;
    opened: { method: string; path: string } | null = null;
    headers = new Map<string, string>();
    sent: FormData | null = null;
    aborted = false;
    constructor() {
      XhrDouble.instances.push(this);
    }
    open(method: string, path: string) {
      this.opened = { method, path };
    }
    setRequestHeader(name: string, value: string) {
      this.headers.set(name, value);
    }
    getResponseHeader(name: string) {
      const line = this.responseHeaders
        .split("\r\n")
        .find((row) => row.toLowerCase().startsWith(`${name.toLowerCase()}:`));
      return line ? line.slice(line.indexOf(":") + 1).trim() : null;
    }
    getAllResponseHeaders() {
      return this.responseHeaders;
    }
    abort() {
      this.aborted = true;
    }
    send(form: FormData) {
      this.sent = form;
    }
  }

  beforeEach(() => {
    XhrDouble.instances = [];
    vi.stubGlobal("XMLHttpRequest", XhrDouble);
  });

  const last = () => XhrDouble.instances[XhrDouble.instances.length - 1];

  it("RCL-15 bearer once, progress as (loaded, total), a 200 JSON answer answered", async () => {
    currentSession.mockResolvedValue({ session: { access_token: "test-token" }, failed: false });
    const progress: [number, number][] = [];
    const form = new FormData();
    form.set("photo", new Blob(["x"]), "x.jpg");
    const pending = uploadRoute("/api/upload/photo", form, {
      onProgress: (loaded, total) => progress.push([loaded, total]),
    });
    // The bearer read is async; let it settle so the request is open.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const request = last();
    expect(request.opened).toEqual({ method: "POST", path: "/api/upload/photo" });
    expect(request.headers.get("Authorization")).toBe("Bearer test-token");
    expect(request.headers.get("Accept")).toBe("application/json");
    expect([...request.headers.keys()].filter((k) => k === "Authorization")).toHaveLength(1);
    expect(request.sent).toBe(form);
    request.upload.onprogress?.({
      lengthComputable: true,
      loaded: 50,
      total: 100,
    } as ProgressEvent);
    request.upload.onprogress?.({ lengthComputable: false, loaded: 0, total: 0 } as ProgressEvent);
    request.onload?.();
    expect(progress).toEqual([[50, 100]]);
    const answer = await pending;
    expect(answer).toEqual({
      kind: "answered",
      status: 200,
      ok: true,
      payload: { ok: true },
      error: null,
      detail: null,
      headers: expect.any(Headers),
      bytes: null,
    });
  });
  it("RCL-15b status 0 is unreachable network", async () => {
    const pending = uploadRoute("/api/upload/photo", new FormData(), { auth: "none" });
    const request = last();
    request.status = 0;
    request.onload?.();
    expect(await pending).toEqual({ kind: "unreachable", reason: "network" });
    const failed = uploadRoute("/api/upload/photo", new FormData(), { auth: "none" });
    last().onerror?.();
    expect(await failed).toEqual({ kind: "unreachable", reason: "network" });
  });
  it("RCL-15c timeout and the deadline are unreachable timeout", async () => {
    const timedOut = uploadRoute("/api/upload/photo", new FormData(), { auth: "none" });
    last().ontimeout?.();
    expect(await timedOut).toEqual({ kind: "unreachable", reason: "timeout" });
    vi.useFakeTimers();
    const deadline = uploadRoute("/api/upload/photo", new FormData(), {
      auth: "none",
      timeoutMs: 30,
    });
    await vi.advanceTimersByTimeAsync(30);
    expect(await deadline).toEqual({ kind: "unreachable", reason: "timeout" });
    expect(last().aborted).toBe(true);
  });
  it("RCL-15d the caller's abort is unreachable aborted", async () => {
    const caller = new AbortController();
    const pending = uploadRoute("/api/upload/photo", new FormData(), {
      auth: "none",
      signal: caller.signal,
    });
    caller.abort();
    expect(await pending).toEqual({ kind: "unreachable", reason: "aborted" });
    expect(last().aborted).toBe(true);
  });
  it("RCL-15e required without a session is signedOut and nothing opens", async () => {
    expect(await uploadRoute("/api/upload/photo", new FormData())).toEqual({ kind: "signedOut" });
    expect(XhrDouble.instances[0].opened).toBeNull();
    expect(XhrDouble.instances[0].sent).toBeNull();
  });
});
