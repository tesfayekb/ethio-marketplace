import { createFileRoute } from "@tanstack/react-router";

import {
  consumeRate,
  envDial,
  logRouteError,
  readJsonBody,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * U6-A2-C — THE WRITING ASSISTANT (DEC-072).
 *
 *   POST /api/listings/assist
 *     { categoryId, attrs, locale, photoFacts? }  →  { ok, title, description }
 *
 * THE ASSISTANT IS A WRITER, NEVER A SOURCE. The prompt carries the FACTS the
 * seller already gave — the category, the attribute values, and whatever the
 * photo pipeline observed — and forbids anything else: no invented condition, no
 * invented measurement, no price, no contact detail, no guarantee. A model that
 * has no fact for something must leave it out.
 *
 * THE PROVIDER: the same Gemini text model and the same server-side key name the
 * category-images pipeline uses (`GEMINI_API_KEY`, `GEMINI_TEXT_MODEL`), read
 * INSIDE the handler and never echoed into a body (F1).
 *
 * FAKE MODE (`E2E_FAKE_ASSIST=1`, or the harness-wide `E2E_FAKE_TRANSLATE=1`): a deterministic
 * pair built from the category slug and the attribute values — no provider call,
 * no spend, no network.
 *
 * A PROVIDER FAILURE IS A REFUSAL, NOT A DRAFT (F4): a 5xx or an unusable answer
 * comes back as `{ ok:false, refusals:[{ field:'assist', reason:
 * 'providerUnavailable' }] }`, so nothing is ever written from a guess.
 */

const PATH = "/api/listings/assist";
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1200;

function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

function textModel(): string {
  const value = serverEnv("GEMINI_TEXT_MODEL").trim();
  return value === "" ? "gemini-3.5-flash-lite" : value;
}

/** The facts, flattened to `key: value` lines — nothing else reaches the model. */
function factLines(attrs: unknown, photoFacts: unknown): string[] {
  const lines: string[] = [];
  const push = (source: unknown) => {
    if (source === null || typeof source !== "object" || Array.isArray(source)) return;
    for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
      if (value === null || value === undefined || value === "") continue;
      const rendered = Array.isArray(value)
        ? value.map((entry) => String(entry)).join(", ")
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
      lines.push(`${key}: ${rendered.slice(0, 200)}`);
    }
  };
  push(attrs);
  push(photoFacts);
  return lines.slice(0, 40);
}

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

/** The deterministic pair: the category slug plus the facts, in fixed order. */
function fakeAssist(slug: string, facts: string[]): { title: string; description: string } {
  const values = facts.map((line) => line.split(": ").slice(1).join(": ")).filter((v) => v !== "");
  const title = clamp(`${slug} ${values.slice(0, 3).join(" ")}`.trim(), TITLE_MAX);
  const body =
    values.length === 0
      ? `${slug} — no attributes were given, so nothing else is claimed.`
      : `${slug} — ${values.join(" · ")}. Nothing beyond these facts is claimed.`;
  return { title, description: clamp(body, DESCRIPTION_MAX) };
}

const SYSTEM_PROMPT = [
  "You write marketplace listing copy for a classifieds app.",
  "You are given a category and a list of facts the seller entered.",
  "Use ONLY those facts. Never invent a condition, measurement, age, brand,",
  "history, price, delivery term, guarantee or contact detail that is not listed.",
  "If a fact is missing, leave it out rather than guessing.",
  `Return JSON only: {"title": string (max ${TITLE_MAX} characters), "description": string (max ${DESCRIPTION_MAX} characters)}.`,
  "Write both fields in the requested language.",
].join(" ");

async function callProvider(
  prompt: string,
): Promise<{ title: string; description: string } | null> {
  const key = serverEnv("GEMINI_API_KEY");
  if (key.trim() === "") return null;

  const response = await fetch(`${BASE}/${encodeURIComponent(textModel())}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
    }),
  });
  const raw = await response.text();
  if (!response.ok) {
    logRouteError(PATH, `provider ${response.status}: ${raw.slice(0, 200)}`);
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const answer = JSON.parse(text) as { title?: unknown; description?: unknown };
    const title = clamp(answer.title, TITLE_MAX);
    const description = clamp(answer.description, DESCRIPTION_MAX);
    return title === "" || description === "" ? null : { title, description };
  } catch (error) {
    logRouteError(PATH, `unusable provider answer: ${error instanceof Error ? error.message : ""}`);
    return null;
  }
}

async function handlePost(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;
  const supabase = caller.supabase!;
  const userId = caller.userId!;

  const rate = await consumeRate(
    supabase,
    "assist",
    userId,
    envDial("RATE_LIMIT_ASSIST_PER_HOUR", 30),
    "1 hour",
  );
  if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);

  const body = await readJsonBody(request);
  const categoryId = typeof body["categoryId"] === "string" ? body["categoryId"] : "";
  if (categoryId === "") return refusal("categoryId", "required");
  const locale = typeof body["locale"] === "string" ? body["locale"].slice(0, 8) : "en";

  // The category is read as the CALLER (RLS: active categories are public), so
  // an inactive or unknown id is a refusal rather than a leak.
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("slug, name_en")
    .eq("id", categoryId)
    .maybeSingle();
  if (categoryError) {
    logRouteError(PATH, categoryError.message);
    return refusal("assist", "providerUnavailable");
  }
  if (!category) return refusal("categoryId", "categoryNotPostable");

  const facts = factLines(body["attrs"], body["photoFacts"]);

  // FAKE MODE: `E2E_FAKE_ASSIST=1`, or the harness's standing `E2E_FAKE_TRANSLATE=1`
  // (the flag every e2e job already exports — the translate route's own switch),
  // so a test run never spends provider credit and never reaches the network.
  if (serverEnv("E2E_FAKE_ASSIST") === "1" || serverEnv("E2E_FAKE_TRANSLATE") === "1") {
    const fake = fakeAssist(category.slug, facts);
    return routeJson({ ok: true, ...fake }, 200);
  }

  const prompt = [
    `Language: ${locale}`,
    `Category: ${category.name_en} (${category.slug})`,
    "Facts:",
    ...(facts.length === 0 ? ["(none)"] : facts.map((line) => `- ${line}`)),
  ].join("\n");

  const answer = await callProvider(prompt);
  if (answer === null) return refusal("assist", "providerUnavailable");
  return routeJson({ ok: true, ...answer }, 200);
}

export const Route = createFileRoute("/api/listings/assist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          return await handlePost(request);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
