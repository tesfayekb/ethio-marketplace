import { appendFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * DEC-104 — THE TEST SERVICE CLIENT RETRIES A DROPPED CALL (fixes INC-385).
 *
 * Only a THROWN fetch (no response at all: a closed socket, a reset) is
 * retried: at most 3 retries, after 300 ms, 1,500 ms and 5,000 ms. Any Response
 * is returned as it is, whatever its status — a 4xx/5xx is the server's answer.
 * Every method is retried; a replayed insert whose first copy landed surfaces
 * as the database's own duplicate error, never swallowed.
 *
 * Each retry appends one ledger line `retry <METHOD> <path> <code> <attempt>`;
 * an exhausted call appends `exhausted <METHOD> <path> <code> <attempts>`.
 * Never a header, a key, a query string or a body.
 */

export const RETRY_WAITS_MS: readonly number[] = [300, 1500, 5000];

const HERE = dirname(fileURLToPath(import.meta.url));

export function netRetryLedgerFile(): string {
  return join(HERE, "..", ".state", "net-retries.log");
}

function appendLedger(line: string): void {
  try {
    const file = netRetryLedgerFile();
    mkdirSync(dirname(file), { recursive: true });
    appendFileSync(file, `${line}\n`, "utf8");
  } catch (error) {
    console.warn(
      `[e2e:net] WARNING could not record a retry: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

export function causeCode(error: unknown): string {
  const seen = new Set<unknown>();
  let current: unknown = error;
  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const code = (current as { code?: unknown }).code;
    if (typeof code === "string" && code !== "") return code;
    current = (current as { cause?: unknown }).cause;
  }
  return "UNKNOWN";
}

function describe(input: RequestInfo | URL, init?: RequestInit): { method: string; path: string } {
  const raw =
    typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const method = (
    init?.method ??
    (typeof Request !== "undefined" && input instanceof Request ? input.method : "GET")
  ).toUpperCase();
  let path = raw.split("?")[0] ?? raw;
  try {
    path = new URL(raw).pathname;
  } catch {
    // relative or unparsable: the query-stripped text stands
  }
  return { method, path };
}

export interface RetryOptions {
  fetchImpl?: typeof fetch;
  waits?: readonly number[];
  sleep?: (ms: number) => Promise<void>;
  ledger?: (line: string) => void;
}

export function createRetryingFetch(options: RetryOptions = {}): typeof fetch {
  const waits = options.waits ?? RETRY_WAITS_MS;
  const sleep = options.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const ledger = options.ledger ?? appendLedger;
  return async (input, init) => {
    const doFetch = options.fetchImpl ?? fetch;
    const { method, path } = describe(input, init);
    let lastError: unknown;
    for (let attempt = 1; attempt <= waits.length + 1; attempt += 1) {
      try {
        return await doFetch(input, init);
      } catch (error) {
        lastError = error;
        const code = causeCode(error);
        if (attempt > waits.length) {
          ledger(`exhausted ${method} ${path} ${code} ${attempt}`);
          throw new TypeError(`fetch failed (${code}) after ${attempt} attempts`, {
            cause: error,
          });
        }
        ledger(`retry ${method} ${path} ${code} ${attempt}`);
        await sleep(waits[attempt - 1]!);
      }
    }
    throw lastError;
  };
}

export const retryingFetch: typeof fetch = createRetryingFetch();
