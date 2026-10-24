import { afterEach, describe, expect, it, vi } from "vitest";

import { upstream, UpstreamTimeout } from "@/server/upstream";

/**
 * Foundations turn 2 (DEC-237) — the one outside call (UP-1…UP-3).
 * (src/server/supabase/upstream.test.ts is INC-574's test of a different
 * concern: judging the AUTH server's answers inside userClientFromRequest.)
 */
describe("upstream (B3)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("UP-1 a fetch that resolves answers through", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}", { status: 200 })),
    );
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const response = await upstream(
      "https://provider.example/call?key=secret",
      { method: "POST" },
      { timeoutMs: 1000, label: "provider" },
    );
    expect(response.status).toBe(200);
  });

  it("UP-2 a fetch that never resolves times out with the label", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: string, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              const error = new Error("aborted");
              error.name = "AbortError";
              reject(error);
            });
          }),
      ),
    );
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const failure = await upstream(
      "https://provider.example/slow",
      {},
      { timeoutMs: 20, label: "slow-provider" },
    ).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(UpstreamTimeout);
    expect((failure as UpstreamTimeout).label).toBe("slow-provider");
    expect((failure as UpstreamTimeout).timeoutMs).toBe(20);
  });

  it("UP-3 the log line carries the label and never the URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}", { status: 502 })),
    );
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await upstream(
      "https://provider.example/call?key=secret-key",
      {},
      { timeoutMs: 1000, label: "provider" },
    );
    const line = logged.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(line).toContain("[upstream] provider 502");
    expect(line).not.toContain("provider.example");
    expect(line).not.toContain("secret-key");
  });
});
