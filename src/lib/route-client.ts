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
    }
  | { kind: "signedOut" }
  | { kind: "unreachable"; reason: "network" | "timeout" | "aborted" };
export type RouteInit = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  json?: unknown;
  auth?: RouteAuth;
  timeoutMs?: number;
  signal?: AbortSignal;
};

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
      const { data, error } = await supabase.auth.getSession();
      if (error) return { kind: "unreachable", reason: "network" };
      const token = data.session?.access_token;
      if (!token && auth === "required") return { kind: "signedOut" };
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    if (controller.signal.aborted) return { kind: "unreachable", reason };
    const hasJson = init.json !== undefined;
    if (hasJson) headers.set("Content-Type", "application/json");
    const response = await fetch(path, {
      method: init.method ?? (hasJson ? "POST" : "GET"),
      headers,
      ...(hasJson ? { body: JSON.stringify(init.json) } : {}),
      signal: controller.signal,
    });
    let payload: Record<string, unknown> | null = null;
    if (filename !== undefined && response.ok) {
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
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
    } else if (response.headers.get("content-type")?.includes("application/json")) {
      const value: unknown = await response.json();
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        payload = value as Record<string, unknown>;
      }
    }
    return {
      kind: "answered",
      status: response.status,
      ok: response.ok,
      payload,
      error: typeof payload?.error === "string" ? payload.error : null,
      detail: typeof payload?.detail === "string" ? payload.detail : null,
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