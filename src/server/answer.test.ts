import { describe, expect, it, vi } from "vitest";

import { clientError, ok, serverError, verdict } from "@/server/answer";

/**
 * Foundations turn 2 (DEC-237) — the two envelopes (ANS-1…ANS-4).
 */
describe("the route answers (B2)", () => {
  it("ANS-1 ok carries no-store unless a cache is declared", async () => {
    const plain = ok({ a: 1 });
    expect(plain.status).toBe(200);
    expect(plain.headers.get("Cache-Control")).toBe("no-store");
    expect(await plain.json()).toEqual({ a: 1 });
    const cached = ok({ a: 1 }, { cache: "public, max-age=300" });
    expect(cached.headers.get("Cache-Control")).toBe("public, max-age=300");
  });

  it("ANS-2 verdict's shape: ok false and the refusals, at 200 by default", async () => {
    const response = verdict([{ field: "listingId", reason: "badShape", detail: "invalid_type" }]);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "listingId", reason: "badShape", detail: "invalid_type" }],
    });
  });

  it("ANS-3 clientError's shape and status", async () => {
    const response = clientError("payloadTooLarge", 413, { ceiling: 1024 });
    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ error: "payloadTooLarge", ceiling: 1024 });
  });

  it("ANS-4 serverError carries an incident id and never the error's message; the log carries the same id", async () => {
    const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const response = serverError("/api/test", new Error("secret postgres detail"));
    expect(response.status).toBe(500);
    const body = (await response.json()) as { error: string; incident: string };
    expect(body.error).toBe("server error");
    expect(body.incident).toMatch(/^[0-9a-f-]{36}$/);
    expect(JSON.stringify(body)).not.toContain("secret postgres detail");
    const line = logged.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(line).toContain(body.incident);
    expect(line).toContain("secret postgres detail");
    logged.mockRestore();
  });
});
