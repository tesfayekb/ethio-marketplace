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
 * U6-A2-C / U6-C1-R2 — THE WRITING ASSISTANT (DEC-072, in full).
 *
 *   POST /api/listings/assist
 *     { listingId?, categoryId, categoryPath?, attrs, locale,
 *       photoUrls?, title?, description?, previous? }
 *       →  { ok, title, description, triesLeft }
 *
 * THE ASSISTANT WRITES TO SELL, AND STILL NEVER INVENTS. The prompt carries the
 * FACTS the seller already gave — the category path, the attribute values, their
 * own draft title and description, and the first three photos — and forbids
 * anything else: no condition, measurement, age, history, price, delivery term,
 * guarantee or contact detail that is not in those facts or visible in those
 * photos. THE SELLER'S WORDS WIN: a phrase they wrote is kept, not paraphrased
 * away.
 *
 * EACH RETRY IS A DIFFERENT ANGLE, NOT A REROLL: the previous suggestions travel
 * with the request and the model is told to avoid repeating them.
 *
 * THE BUDGET IS PER LISTING, NOT PER HOUR (F3): five tries, counted by
 * `consume_rate_limit` under the action `assist:listing` keyed by the listing id
 * over a ten-year window — a ledger, not a throttle. A spent budget is the
 * refusal `assistBudgetSpent`; the remaining count travels back so the screen can
 * say it in words.
 *
 * THE PROVIDER: the same Gemini text model and the same server-side key name the
 * category-images pipeline uses (`GEMINI_API_KEY`, `GEMINI_TEXT_MODEL`), read
 * INSIDE the handler and never echoed into a body (F1).
 *
 * FAKE MODE (`E2E_FAKE_ASSIST=1`, or the harness-wide `E2E_FAKE_TRANSLATE=1`): a
 * DISTINCT deterministic pair per try, numbered by how many suggestions came
 * before it, and always echoing the seller's own words — no provider call, no
 * spend, no network.
 *
 * A PROVIDER FAILURE IS A REFUSAL, NOT A DRAFT (F4): a 5xx or an unusable answer
 * comes back as `{ ok:false, refusals:[{ field:'assist', reason:
 * 'providerUnavailable' }] }`, so nothing is ever written from a guess.
 */

const PATH = "/api/listings/assist";
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1200;
/** U6-C1-R2 — the per-listing writing budget. */
const ASSIST_TRIES = 5;
const ASSIST_WINDOW = "10 years";
const MAX_PHOTOS_SENT = 3;

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

/** The first three photo URLs, as given — https only, nothing constructed here. */
function photoUrls(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((entry): entry is string => typeof entry === "string" && entry.startsWith("https://"))
    .slice(0, MAX_PHOTOS_SENT);
}

/** The suggestions already shown, so the next one takes a different angle. */
function previousPairs(raw: unknown): { title: string; description: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, ASSIST_TRIES)
    .map((entry) => {
      const record = (entry ?? {}) as Record<string, unknown>;
      return {
        title: clamp(record["title"], TITLE_MAX),
        description: clamp(record["description"], DESCRIPTION_MAX),
      };
    })
    .filter((pair) => pair.title !== "" || pair.description !== "");
}

/**
 * FAKE MODE: one distinct, numbered pair per try, built from the category slug,
 * the seller's own draft words and the facts — so a test can prove that two
 * tries differ AND that the seller's phrase survived.
 */
function fakeAssist(
  slug: string,
  facts: string[],
  attempt: number,
  sellerTitle: string,
  sellerDescription: string,
): { title: string; description: string } {
  const values = facts.map((line) => line.split(": ").slice(1).join(": ")).filter((v) => v !== "");
  const own = [sellerTitle, sellerDescription].filter((entry) => entry !== "").join(" ");
  const title = clamp(
    `${slug} ${sellerTitle === "" ? values.slice(0, 2).join(" ") : sellerTitle} (${attempt})`,
    TITLE_MAX,
  );
  const body =
    `Version ${attempt}. ${slug}` +
    (own === "" ? "" : ` — ${own}`) +
    (values.length === 0 ? "" : ` · ${values.join(" · ")}`) +
    ". Nothing beyond these facts is claimed.";
  return { title, description: clamp(body, DESCRIPTION_MAX) };
}

const SYSTEM_PROMPT = [
  "You write marketplace listing copy for a classifieds app.",
  "Write to sell: a natural, specific title and a persuasive but truthful description.",
  "You are given a category path, the facts the seller entered, the seller's own draft",
  "title and description, and up to three photos of the item.",
  "KEEP EVERY FACT AND PHRASE THE SELLER GAVE — their words win over your phrasing.",
  "Add nothing that is not visible in the photos or stated in the facts: never invent a",
  "condition, measurement, age, brand, history, price, delivery term, guarantee or contact detail.",
  "If a fact is missing, leave it out rather than guessing.",
  "If earlier suggestions are listed, take a clearly different angle from all of them.",
  `Return JSON only: {"title": string (max ${TITLE_MAX} characters), "description": string (max ${DESCRIPTION_MAX} characters)}.`,
  "Write both fields in the requested language.",
].join(" ");

/** A photo the model may look at, fetched server-side and passed inline. */
async function inlinePhoto(url: string): Promise<{ mimeType: string; data: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const mimeType = response.headers.get("content-type") ?? "image/jpeg";
    if (!mimeType.startsWith("image/")) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > 4_000_000) return null;
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { mimeType, data: btoa(binary) };
  } catch (error) {
    logRouteError(PATH, `photo unreadable: ${error instanceof Error ? error.message : ""}`);
    return null;
  }
}

async function callProvider(
  prompt: string,
  urls: string[],
): Promise<{ title: string; description: string } | null> {
  const key = serverEnv("GEMINI_API_KEY");
  if (key.trim() === "") return null;

  const images = (await Promise.all(urls.map((url) => inlinePhoto(url)))).filter(
    (entry): entry is { mimeType: string; data: string } => entry !== null,
  );

  const response = await fetch(`${BASE}/${encodeURIComponent(textModel())}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            ...images.map((image) => ({
              inlineData: { mimeType: image.mimeType, data: image.data },
            })),
          ],
        },
      ],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
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
  const listingId = typeof body["listingId"] === "string" ? body["listingId"] : "";

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

  // THE PER-LISTING BUDGET, spent before any provider call is made (F5: gate first).
  let triesLeft: number | null = null;
  if (listingId !== "") {
    const budget = await consumeRate(
      supabase,
      "assist:listing",
      listingId,
      ASSIST_TRIES,
      ASSIST_WINDOW,
    );
    if (!budget.allowed) return refusal("assist", "assistBudgetSpent");
    const { data: spent } = await supabase
      .from("rate_limits")
      .select("count")
      .eq("action", "assist:listing")
      .eq("key", listingId)
      .maybeSingle();
    const used = typeof spent?.count === "number" ? spent.count : null;
    triesLeft = used === null ? null : Math.max(0, ASSIST_TRIES - used);
  }

  const facts = factLines(body["attrs"], body["photoFacts"]);
  const urls = photoUrls(body["photoUrls"]);
  const previous = previousPairs(body["previous"]);
  const sellerTitle = clamp(body["title"], TITLE_MAX);
  const sellerDescription = clamp(body["description"], DESCRIPTION_MAX);
  const categoryPath =
    typeof body["categoryPath"] === "string" && body["categoryPath"].trim() !== ""
      ? body["categoryPath"].slice(0, 300)
      : `${category.name_en} (${category.slug})`;

  // FAKE MODE: `E2E_FAKE_ASSIST=1`, or the harness's standing `E2E_FAKE_TRANSLATE=1`
  // (the flag every e2e job already exports — the translate route's own switch),
  // so a test run never spends provider credit and never reaches the network.
  if (serverEnv("E2E_FAKE_ASSIST") === "1" || serverEnv("E2E_FAKE_TRANSLATE") === "1") {
    const fake = fakeAssist(
      category.slug,
      facts,
      previous.length + 1,
      sellerTitle,
      sellerDescription,
    );
    return routeJson({ ok: true, ...fake, triesLeft }, 200);
  }

  const prompt = [
    `Language: ${locale}`,
    `Category: ${categoryPath}`,
    "Facts:",
    ...(facts.length === 0 ? ["(none)"] : facts.map((line) => `- ${line}`)),
    sellerTitle === "" ? "Seller's draft title: (none)" : `Seller's draft title: ${sellerTitle}`,
    sellerDescription === ""
      ? "Seller's draft description: (none)"
      : `Seller's draft description: ${sellerDescription}`,
    urls.length === 0 ? "Photos: (none)" : `Photos attached: ${urls.length}`,
    ...(previous.length === 0
      ? []
      : [
          "Earlier suggestions to differ from:",
          ...previous.map((pair, index) => `- ${index + 1}: ${pair.title} — ${pair.description}`),
        ]),
  ].join("\n");

  const answer = await callProvider(prompt, urls);
  if (answer === null) return refusal("assist", "providerUnavailable");
  return routeJson({ ok: true, ...answer, triesLeft }, 200);
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
