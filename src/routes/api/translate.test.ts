import { afterEach, expect, it, vi } from "vitest";

import { providerLanguages, translateBatch } from "@/server/ai/providers/google-translate";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

// Foundations turn 19 — re-pointed at the adapter that now makes both calls
// (src/server/ai/providers/google-translate.ts); the assertion is unchanged.
it("INC-829 translation request URLs contain no key=; both calls carry the key in a header", async () => {
  const testKey = "test-only-provider-key";
  vi.stubEnv("GOOGLE_TRANSLATE_API_KEY", testKey);
  const requests: Request[] = [];
  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    requests.push(request);
    return Response.json(
      request.method === "GET"
        ? { data: { languages: [{ language: "am", name: "Amharic" }] } }
        : { data: { translations: [{ translatedText: "translated fixture" }] } },
    );
  });
  const languages = await providerLanguages({ timeoutMs: 1_000 });
  expect(languages).toEqual({ kind: "languages", languages: [{ code: "am", name: "Amharic" }] });
  const answer = await translateBatch({
    target: "am",
    texts: ["fixture"],
    timeoutMs: 1_000,
    label: "google-translate translation",
  });
  expect(answer).toEqual({ kind: "texts", status: 200, texts: ["translated fixture"] });
  expect(requests.map((request) => request.method)).toEqual(["GET", "POST"]);
  for (const request of requests) {
    expect(request.url).not.toContain("key=");
    expect(request.url).not.toContain(testKey);
    expect(request.headers.get("x-goog-api-key")).toBe(testKey);
  }
});
