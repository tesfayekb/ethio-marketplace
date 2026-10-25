/**
 * Foundations turn 2 (DEC-237) — THE ONE OUTSIDE CALL (B3). Every fetch a
 * server route makes goes through `upstream`, so every call carries a
 * deadline and its log line carries the label and never the URL (a key may
 * sit in a query string — INC-829's class).
 */

/** The deadline passed: the caller maps it to a 503 with the label. */
export class UpstreamTimeout extends Error {
  readonly label: string;
  readonly timeoutMs: number;

  constructor(label: string, timeoutMs: number) {
    super(`upstream ${label} timed out after ${timeoutMs}ms`);
    this.name = "UpstreamTimeout";
    this.label = label;
    this.timeoutMs = timeoutMs;
  }
}

export async function upstream(
  url: string,
  init: RequestInit,
  opts: { timeoutMs: number; label: string },
): Promise<Response> {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(opts.timeoutMs),
    });
    const line = `[upstream] ${opts.label} ${response.status} ${Date.now() - started}ms`;
    // INC-892: an answer below 400 is information, a 4xx or 5xx an error; a timeout stays an error.
    if (response.status < 400) console.info(line);
    else console.error(line);
    return response;
  } catch (error) {
    // Foundations turn 3 — AbortSignal.timeout rejects with a DOMException named
    // "TimeoutError" (an "AbortError" from an older runtime); both are the deadline.
    const name =
      typeof error === "object" && error !== null ? (error as { name?: unknown }).name : null;
    if (name === "TimeoutError" || name === "AbortError") {
      console.error(`[upstream] ${opts.label} timeout ${Date.now() - started}ms`);
      throw new UpstreamTimeout(opts.label, opts.timeoutMs);
    }
    throw error;
  }
}
