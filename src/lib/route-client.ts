import { supabase } from "@/integrations/supabase/client";

export type RoutePath = `/api/${string}`;
export type RouteAuth = "required" | "optional" | "none";
export type RouteAnswer =
  | {
      kind: "answered";
      status: number;
      ok: boolean;
      payload: Record<string, unknown> | null;
      error: string | null;
      detail: string | null;
      headers: Headers;
      bytes: Blob | null;
    }
  | { kind: "signedOut" }
  | { kind: "unreachable"; reason: "network" | "timeout" | "aborted" };
export type RouteInit = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  json?: unknown;
  /** Exclusive with `json`; the browser sets the multipart boundary itself. */
  form?: FormData;
  auth?: RouteAuth;
  timeoutMs?: number;
  signal?: AbortSignal;
  cache?: RequestCache;
  keepalive?: boolean;
  /** "bytes" keeps a non-JSON body as a Blob; a JSON refusal still parses. */
  expect?: "json" | "bytes";
};

type Envelope = {
  payload: Record<string, unknown> | null;
  error: string | null;
  detail: string | null;
  bytes: Blob | null;
};

/**
 * THE ONE ENVELOPE READER, shared by both transports. A JSON content type is
 * parsed from text; a body that does not parse is still an ANSWER (payload
 * null) — only a transport failure is unreachable. A non-JSON body is bytes
 * when the caller asked for them, otherwise unread.
 */
function readEnvelope(contentType: string, text: string | null, blob: Blob | null): Envelope {
  if (contentType.includes("application/json")) {
    let payload: Record<string, unknown> | null = null;
    if (text !== null) {
      try {
        const value: unknown = JSON.parse(text);
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          payload = value as Record<string, unknown>;
        }
      } catch {
        payload = null;
      }
    }
    return {
      payload,
      error: typeof payload?.error === "string" ? payload.error : null,
      detail: typeof payload?.detail === "string" ? payload.detail : null,
      bytes: null,
    };
  }
  return { payload: null, error: null, detail: null, bytes: blob };
}

/** The session's bearer, read once per call; null when there is no session. */
async function sessionToken(): Promise<{ token: string | null; failed: boolean }> {
  const { data, error } = await supabase.auth.getSession();
  if (error) return { token: null, failed: true };
  return { token: data.session?.access_token ?? null, failed: false };
}

/** One session read, one controller, one envelope reader for browser routes. */
async function requestRoute(
  path: RoutePath,
  init: RouteInit,
  filename?: string,
): Promise<RouteAnswer> {
  const controller = new AbortController();
  let reason: "network" | "timeout" | "aborted" = "network";
  let timer: ReturnType<typeof setTimeout> | undefined;
  const abort = () => {
    if (controller.signal.aborted) return;
    reason = "aborted";
    controller.abort();
  };
  init.signal?.addEventListener("abort", abort, { once: true });
  if (init.signal?.aborted) abort();
  if (init.timeoutMs !== undefined) {
    timer = setTimeout(() => {
      if (controller.signal.aborted) return;
      reason = "timeout";
      controller.abort();
    }, init.timeoutMs);
  }
  try {
    const auth = init.auth ?? "required";
    const headers = new Headers({ Accept: "application/json" });
    if (auth !== "none") {
      const { token, failed } = await sessionToken();
      if (failed) return { kind: "unreachable", reason: "network" };
      if (!token && auth === "required") return { kind: "signedOut" };
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    if (controller.signal.aborted) return { kind: "unreachable", reason };
    const hasJson = init.json !== undefined;
    const hasForm = init.form !== undefined;
    if (hasJson) headers.set("Content-Type", "application/json");
    const response = await fetch(path, {
      method: init.method ?? (hasJson || hasForm ? "POST" : "GET"),
      headers,
      ...(hasJson ? { body: JSON.stringify(init.json) } : {}),
      ...(hasForm ? { body: init.form } : {}),
      ...(init.cache !== undefined ? { cache: init.cache } : {}),
      ...(init.keepalive !== undefined ? { keepalive: init.keepalive } : {}),
      signal: controller.signal,
    });
    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    let text: string | null = null;
    let blob: Blob | null = null;
    if (filename !== undefined && response.ok) {
      const download = await response.blob();
      const href = URL.createObjectURL(download);
      const anchor = document.createElement("a");
      try {
        anchor.href = href;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
      } finally {
        anchor.remove();
        URL.revokeObjectURL(href);
      }
    } else if (isJson) {
      text = await response.text();
    } else if (init.expect === "bytes") {
      blob = await response.blob();
    }
    return {
      kind: "answered",
      status: response.status,
      ok: response.ok,
      headers: response.headers,
      ...readEnvelope(contentType, text, blob),
    };
  } catch (failure) {
    if (!controller.signal.aborted && failure instanceof DOMException) {
      if (failure.name === "TimeoutError") reason = "timeout";
      else if (failure.name === "AbortError") reason = "aborted";
    }
    return { kind: "unreachable", reason };
  } finally {
    clearTimeout(timer);
    init.signal?.removeEventListener("abort", abort);
  }
}

export function callRoute(path: RoutePath, init: RouteInit = {}): Promise<RouteAnswer> {
  return requestRoute(path, init);
}

export function downloadRoute(
  path: RoutePath,
  filename: string,
  init: Pick<RouteInit, "auth" | "timeoutMs" | "signal"> = {},
): Promise<RouteAnswer> {
  return requestRoute(path, init, filename);
}

/**
 * THE UPLOAD TRANSPORT (XMLHttpRequest Level 2 — the one transport that
 * reports upload progress). The bearer is exactly the one `callRoute` sets;
 * the answer is parsed by the same envelope reader. Status 0 / `onerror` is
 * unreachable network, `ontimeout` or the deadline is timeout, the caller's
 * abort is aborted.
 */
export function uploadRoute(
  path: RoutePath,
  form: FormData,
  init: {
    auth?: RouteAuth;
    timeoutMs?: number;
    signal?: AbortSignal;
    onProgress?: (loaded: number, total: number) => void;
  } = {},
): Promise<RouteAnswer> {
  return new Promise<RouteAnswer>((resolve) => {
    const request = new XMLHttpRequest();
    let settled = false;
    let reason: "network" | "timeout" | "aborted" = "network";
    let timer: ReturnType<typeof setTimeout> | undefined;
    const settle = (answer: RouteAnswer) => {
      if (settled) return;
      settled = true;
      if (timer !== undefined) clearTimeout(timer);
      init.signal?.removeEventListener("abort", onCallerAbort);
      resolve(answer);
    };
    const onCallerAbort = () => {
      reason = "aborted";
      request.abort();
      settle({ kind: "unreachable", reason: "aborted" });
    };
    void (async () => {
      const auth = init.auth ?? "required";
      let token: string | null = null;
      if (auth !== "none") {
        const session = await sessionToken();
        if (session.failed) return settle({ kind: "unreachable", reason: "network" });
        if (session.token === null && auth === "required") return settle({ kind: "signedOut" });
        token = session.token;
      }
      if (init.signal?.aborted) return settle({ kind: "unreachable", reason: "aborted" });
      request.open("POST", path);
      request.setRequestHeader("Accept", "application/json");
      if (token !== null) request.setRequestHeader("Authorization", `Bearer ${token}`);
      request.upload.onprogress = (event) => {
        if (event.lengthComputable) init.onProgress?.(event.loaded, event.total);
      };
      request.onerror = () => settle({ kind: "unreachable", reason: "network" });
      request.ontimeout = () => settle({ kind: "unreachable", reason: "timeout" });
      request.onabort = () => settle({ kind: "unreachable", reason });
      request.onload = () => {
        if (request.status === 0) return settle({ kind: "unreachable", reason: "network" });
        const contentType = request.getResponseHeader("content-type") ?? "";
        const headers = new Headers();
        for (const line of request.getAllResponseHeaders().trim().split(/[\r\n]+/)) {
          const at = line.indexOf(":");
          if (at > 0) headers.append(line.slice(0, at).trim(), line.slice(at + 1).trim());
        }
        const isJson = contentType.includes("application/json");
        settle({
          kind: "answered",
          status: request.status,
          ok: request.status >= 200 && request.status < 300,
          headers,
          ...readEnvelope(contentType, isJson ? request.responseText : null, null),
        });
      };
      init.signal?.addEventListener("abort", onCallerAbort, { once: true });
      if (init.timeoutMs !== undefined) {
        timer = setTimeout(() => {
          reason = "timeout";
          request.abort();
          settle({ kind: "unreachable", reason: "timeout" });
        }, init.timeoutMs);
      }
      request.send(form);
    })();
  });
}
