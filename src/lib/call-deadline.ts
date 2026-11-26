/**
 * DEC-477 / INC-1285 — THE ONE DEADLINE OF EVERY CALL THE BROWSER MAKES to the database or to our
 * routes. A call ends within its class's deadline, or it fails as the NETWORK kind (a `TypeError`,
 * which the reader classes as `network`, src/lib/reader-failure.ts); nothing spins forever. A
 * caller's own abort stays an abort. The classes and their values live here and nowhere else;
 * a new class is a row of CALL_DEADLINES_MS.
 *
 * The class is read from the request: `/auth/v1/` is auth; `/storage/v1/` is an upload or a
 * download by its method; a `/rest/v1/` GET is a read and any other `/rest/v1/` call is a write;
 * a call elsewhere (our own routes) is a read or a write by its method. A route's download and a
 * model tool take their class by name.
 *
 * The values, each with its reason (cursor bundle 7b, ruling 1 Q14):
 * - read 15 s — a page of rows (20–60 KB) at 2G's ~8 KB/s takes about 8 s; 15 s leaves twice that.
 * - write 30 s — the value in force for draft saves since DEC-135 / INC-439.
 * - auth 20 s — a sign-in hashes a password and a token refresh blocks every call behind it.
 * - upload — a 30 s stall with no progress, inside a 300 s cap: the photo form's ceiling is 2 MiB,
 *   about 260 s at 8 KB/s, so a fixed total would fail a slow but working phone. A `fetch` upload
 *   reports no progress, so it takes the cap alone.
 * - download 60 s (the staff CSV); model 60 s (the background tool).
 *
 * This file is on every page's first download: it holds numbers and two small functions, imports
 * nothing, and runs on the server render as well (client.ts runs there).
 */
export const CALL_DEADLINES_MS = {
  read: 15_000,
  write: 30_000,
  auth: 20_000,
  upload: 300_000,
  download: 60_000,
  model: 60_000,
} as const;

export type CallClass = keyof typeof CALL_DEADLINES_MS;

/** An upload's stall deadline: no progress event within this long fails it. */
export const UPLOAD_STALL_MS = 30_000;

const READING = new Set(["GET", "HEAD"]);

/** The class of a call, from its method and address. */
export function classOfCall(method: string, url: string): CallClass {
  const reading = READING.has(method.toUpperCase());
  if (url.includes("/auth/v1/")) return "auth";
  if (url.includes("/storage/v1/")) return reading ? "download" : "upload";
  return reading ? "read" : "write";
}

/** The deadline of a route call by its method (the route client's default). */
export function routeClassOf(method: string): CallClass {
  return READING.has(method.toUpperCase()) ? "read" : "write";
}

/**
 * The signals together: aborted when any is. `AbortSignal.any` where the browser has it, a
 * controller wired to each where it does not. The first abort's reason is the combined reason.
 */
export function anySignal(signals: readonly AbortSignal[]): AbortSignal {
  if (typeof AbortSignal.any === "function") return AbortSignal.any([...signals]);
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}

function methodOf(input: RequestInfo | URL, init: RequestInit | undefined): string {
  if (init?.method !== undefined) return init.method;
  return typeof Request !== "undefined" && input instanceof Request ? input.method : "GET";
}

function addressOf(input: RequestInfo | URL): string {
  if (typeof input === "string") return input;
  return input instanceof URL ? input.href : input.url;
}

/**
 * `call` (the platform's fetch) within the call's deadline. A deadline that runs out aborts the
 * call with a `TypeError` — the network kind, also for a body still being read when it fires; the
 * caller's own signal, when it aborts first, gives the caller its own abort back. The timer is left
 * to run once the answer's headers are in, so a body that stalls is cut as well.
 */
export async function fetchWithDeadline(
  call: typeof fetch,
  input: RequestInfo | URL,
  init?: RequestInit,
  callClass?: CallClass,
): Promise<Response> {
  const ms = CALL_DEADLINES_MS[callClass ?? classOfCall(methodOf(input, init), addressOf(input))];
  const own =
    init?.signal ??
    (typeof Request !== "undefined" && input instanceof Request ? input.signal : null);
  const deadline = new AbortController();
  let expired = false;
  const timer = setTimeout(() => {
    expired = true;
    deadline.abort(new TypeError("Failed to fetch: the call ran past its deadline"));
  }, ms);
  // Node's timer is an object that can be let go of; a browser's is a number (nothing to do).
  if (typeof timer === "object" && timer !== null) {
    const unref: unknown = Reflect.get(timer, "unref");
    if (typeof unref === "function") Reflect.apply(unref, timer, []);
  }
  try {
    return await call(input, {
      ...init,
      signal: own ? anySignal([own, deadline.signal]) : deadline.signal,
    });
  } catch (failure) {
    clearTimeout(timer);
    if (expired && own?.aborted !== true) {
      throw new TypeError("Failed to fetch: the call ran past its deadline");
    }
    throw failure;
  }
}

/** A fetch that gives every call its class's deadline: for a client that takes a `fetch` option. */
export function deadlineFetch(call: typeof fetch): typeof fetch {
  return (input, init) => fetchWithDeadline(call, input, init);
}

/**
 * An upload's watch: `touch()` on every progress event restarts the stall deadline; the cap runs
 * from the start whatever happens. `expire` is called once, with why. `stop()` ends both.
 */
export function watchUpload(
  expire: () => void,
  capMs: number = CALL_DEADLINES_MS.upload,
  stallMs: number = UPLOAD_STALL_MS,
): { touch: () => void; stop: () => void } {
  let done = false;
  const cap = setTimeout(() => fire(), capMs);
  let stall: ReturnType<typeof setTimeout> | undefined;
  const stop = () => {
    done = true;
    clearTimeout(stall);
    clearTimeout(cap);
  };
  const fire = () => {
    if (done) return;
    stop();
    expire();
  };
  const touch = () => {
    if (done) return;
    clearTimeout(stall);
    stall = setTimeout(fire, stallMs);
  };
  touch();
  return { touch, stop };
}
