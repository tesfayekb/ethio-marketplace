import { afterEach, expect, it, vi } from "vitest";

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: "translator" } }, error: null }) },
    rpc: async (name: string) => ({
      data: name === "has_permission" ? true : name === "admin_list_translations" ? [] : null,
      error: null,
    }),
  }),
  isAuthRetryableFetchError: () => false,
}));
vi.mock("@/server/ai/meter", () => ({
  aiFakeMode: () => false,
  aiGate: async () => ({ on: true }),
  recordAiSpend: async () => undefined,
}));

import { Route } from "./translate";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("INC-829 translation request URLs contain no key=; both calls carry the key in a header", async () => {
  vi.stubEnv("SUPABASE_URL", "https://staging.example");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "test-publishable");
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
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  const response = await handlers.POST({
    request: new Request("https://staging.example/api/translate", {
      method: "POST",
      headers: { Authorization: "Bearer test-only-session" },
      body: JSON.stringify({ target_lang: "am", items: [{ key: "fixture", source: "fixture" }] }),
    }),
  });
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ done: 1, flagged: 0, failed: [] });
  expect(requests.map((request) => request.method)).toEqual(["GET", "POST"]);
  for (const request of requests) {
    expect(request.url).not.toContain("key=");
    expect(request.url).not.toContain(testKey);
    expect(request.headers.get("x-goog-api-key")).toBe(testKey);
  }
});
