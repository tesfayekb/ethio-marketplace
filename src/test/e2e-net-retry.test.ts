/**
 * DEC-104 — the e2e service client's retrying fetch (e2e/helpers/net-retry.ts).
 */
import { describe, expect, it } from "vitest";

import { createRetryingFetch } from "../../e2e/helpers/net-retry";

function dropped(code = "UND_ERR_SOCKET"): TypeError {
  return new TypeError("fetch failed", {
    cause: Object.assign(new Error("other side closed"), { code }),
  });
}

function harness(script: Array<Error | Response>) {
  const lines: string[] = [];
  let calls = 0;
  const fetchImpl = (async () => {
    const next = script[Math.min(calls, script.length - 1)]!;
    calls += 1;
    if (next instanceof Error) throw next;
    return next;
  }) as typeof fetch;
  const f = createRetryingFetch({
    fetchImpl,
    waits: [0, 0, 0],
    sleep: async () => {},
    ledger: (line) => lines.push(line),
  });
  return { f, lines, calls: () => calls };
}

const URL_ = "https://staging.example/rest/v1/listings?select=id&apikey=secret";

describe("DEC-104 retryingFetch", () => {
  it("a call that throws once and then answers returns the answer, 1 retry", async () => {
    const h = harness([dropped(), new Response("ok", { status: 200 })]);
    const res = await h.f(URL_, { method: "POST", body: "{}" });
    expect(await res.text()).toBe("ok");
    expect(h.lines.filter((l) => l.startsWith("retry "))).toHaveLength(1);
  });

  it("an HTTP 500 is returned with 0 retries", async () => {
    const h = harness([new Response("boom", { status: 500 })]);
    const res = await h.f(URL_);
    expect(res.status).toBe(500);
    expect(h.calls()).toBe(1);
    expect(h.lines).toHaveLength(0);
  });

  it("4 throws give up after 3 retries with the cause code", async () => {
    const h = harness([dropped(), dropped(), dropped(), dropped()]);
    await expect(h.f(URL_, { method: "DELETE" })).rejects.toThrow(
      "fetch failed (UND_ERR_SOCKET) after 4 attempts",
    );
    expect(h.calls()).toBe(4);
    expect(h.lines.filter((l) => l.startsWith("retry "))).toHaveLength(3);
  });

  it("the ledger line holds method, path and code and nothing else", async () => {
    const h = harness([dropped("ECONNRESET"), new Response("ok")]);
    await h.f(URL_, { method: "POST", headers: { apikey: "secret" }, body: '{"a":1}' });
    expect(h.lines[0]).toBe("retry POST /rest/v1/listings ECONNRESET 1");
    expect(h.lines[0]).not.toContain("secret");
  });
});
