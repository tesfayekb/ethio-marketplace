import { CALL_DEADLINES_MS, routeClassOf, watchUpload } from "@/lib/call-deadline";
import { reportEndedSignIn, reportNoSession } from "@/lib/ended-sign-in";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import { saveBlobAs } from "@/lib/save-file";
import { currentSession } from "@/lib/supabase-door";

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
  /** The call's own deadline; absent, the call's class gives it (DEC-477: src/lib/call-deadline.ts). */
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

// INC-864 — reader-failure stays off the first download: it loads only when a read failed.
const readerModule = loadOnce(() => import("@/lib/reader-failure"));

/**
 * ONE TYPED FAILURE FROM A ROUTE (INC-1296, cursor bundle 7b). An answer that is not a success
 * (the caller's own `ok` check has run)
 * becomes the failure the reader types (`readFailed`, src/lib/reader-failure.ts) — its status and
 * its code — so no consumer builds an `Error` from `answer.status` by hand and the failure notice
 * (`failureKind`) reads it as it reads a door's: an unreachable call is the network kind, a
 * signed-out call is 401, an answer is its code at its status (a code-less answer is read by the
 * status). A refusal's detail rides after the code only when it is a short code (the reader's own
 * `REFUSAL_DETAIL`), never a sentence; the detail itself rides whole beside the code, as data
 * (`failureDetail`, cursor-bundle-8a). The reader downloads on demand; a download that fails is
 * reported to the shell's one notice and reads as `network`. RCG-5 (scripts/conformance/
 * route-client.test.ts) fails a hand-built one.
 */
export async function routeFailure(answer: RouteAnswer): Promise<Error> {
  try {
    const mod = await readerModule.load();
    if (answer.kind === "unreachable") return mod.readFailed(new TypeError(answer.reason));
    if (answer.kind === "signedOut") return mod.readFailed("signedOut", 401);
    const code = answer.error;
    if (code === null) return mod.readFailed(`route ${answer.status}`, answer.status);
    const detail = answer.detail?.trim();
    const tail = detail !== undefined && mod.REFUSAL_DETAIL.test(detail) ? `:${detail}` : "";
    return mod.readFailed(`${code}${tail}`, answer.status, answer.detail ?? undefined);
  } catch (error) {
    reportOnDemandFailure("reader-failure", error);
    return new TypeError("reader-failure");
  }
}
/**
 * The session's bearer, read once per call; null when there is no session. DEC-261:
 * through the client's door — an anonymous call fetches no client.
 */
async function sessionToken(): Promise<{ token: string | null; failed: boolean }> {
  const { session, failed } = await currentSession();
  if (failed) return { token: null, failed: true };
  return { token: session?.access_token ?? null, failed: false };
}

/** One session read, one controller, one envelope reader for browser routes. */
async function requestRoute(
  path: RoutePath,
  init: RouteInit,
  filename?: string,
): Promise<RouteAnswer> {
  const controller = new AbortController();
  let reason: "network" | "timeout" | "aborted" = "network";
  const abort = () => {
    if (controller.signal.aborted) return;
    reason = "aborted";
    controller.abort();
  };
  init.signal?.addEventListener("abort", abort, { once: true });
  if (init.signal?.aborted) abort();
  // DEC-477 — every call ends within its class's deadline: a read or a write by its method, a download
  // by its name; a caller's own `timeoutMs` still wins.
  const method =
    init.method ?? (init.json !== undefined || init.form !== undefined ? "POST" : "GET");
  const timeoutMs =
    init.timeoutMs ?? CALL_DEADLINES_MS[filename === undefined ? routeClassOf(method) : "download"];
  const timer = setTimeout(() => {
    if (controller.signal.aborted) return;
    reason = "timeout";
    controller.abort();
  }, timeoutMs);
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
      method,
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
      saveBlobAs(await response.blob(), filename);
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

/**
 * INC-1274 — AN ENDED SIGN-IN IS REPORTED HERE, WHERE IT IS FIRST READ, ONCE PER ANSWER. The answer
 * that says the caller's sign-in has ended — the signed-out answer (the call never left: the
 * browser holds no session) and a 401 — goes to the one listener the shell registered
 * (src/lib/ended-sign-in.ts), so no consumer has to remember; each consumer still maps the answer
 * to its own signed-out state. The answer is returned as it was.
 */
function reported(answer: RouteAnswer): RouteAnswer {
  if (answer.kind === "signedOut") reportNoSession();
  else if (answer.kind === "answered" && answer.status === 401) reportEndedSignIn({ status: 401 });
  return answer;
}

export async function callRoute(path: RoutePath, init: RouteInit = {}): Promise<RouteAnswer> {
  return reported(await requestRoute(path, init));
}

export async function downloadRoute(
  path: RoutePath,
  filename: string,
  init: Pick<RouteInit, "auth" | "timeoutMs" | "signal"> = {},
): Promise<RouteAnswer> {
  return reported(await requestRoute(path, init, filename));
}

/**
 * THE UPLOAD TRANSPORT (XMLHttpRequest Level 2 — the one transport that
 * reports upload progress). The bearer is exactly the one `callRoute` sets;
 * the answer is parsed by the same envelope reader. Status 0 / `onerror` is
 * unreachable network, `ontimeout` or the deadline is timeout, the caller's
 * abort is aborted.
 */
export async function uploadRoute(
  path: RoutePath,
  form: FormData,
  init: {
    auth?: RouteAuth;
    timeoutMs?: number;
    signal?: AbortSignal;
    onProgress?: (loaded: number, total: number) => void;
  } = {},
): Promise<RouteAnswer> {
  return reported(await sendUpload(path, form, init));
}

function sendUpload(
  path: RoutePath,
  form: FormData,
  init: {
    auth?: RouteAuth;
    timeoutMs?: number;
    signal?: AbortSignal;
    onProgress?: (loaded: number, total: number) => void;
  },
): Promise<RouteAnswer> {
  return new Promise<RouteAnswer>((resolve) => {
    const request = new XMLHttpRequest();
    let settled = false;
    let reason: "network" | "timeout" | "aborted" = "network";
    // DEC-477 — an upload fails on a stall (no progress for UPLOAD_STALL_MS) inside a cap (the caller's
    // `timeoutMs`, or the class's): a slow phone that keeps moving is not cut.
    const watch = watchUpload(() => {
      reason = "timeout";
      request.abort();
      settle({ kind: "unreachable", reason: "timeout" });
    }, init.timeoutMs ?? CALL_DEADLINES_MS.upload);
    const settle = (answer: RouteAnswer) => {
      if (settled) return;
      settled = true;
      watch.stop();
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
        watch.touch();
        if (event.lengthComputable) init.onProgress?.(event.loaded, event.total);
      };
      request.onerror = () => settle({ kind: "unreachable", reason: "network" });
      request.ontimeout = () => settle({ kind: "unreachable", reason: "timeout" });
      request.onabort = () => settle({ kind: "unreachable", reason });
      request.onload = () => {
        if (request.status === 0) return settle({ kind: "unreachable", reason: "network" });
        const contentType = request.getResponseHeader("content-type") ?? "";
        const headers = new Headers();
        for (const line of request
          .getAllResponseHeaders()
          .trim()
          .split(/[\r\n]+/)) {
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
      request.send(form);
    })();
  });
}
