import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import { z } from "zod";

import { ok, verdict } from "@/server/answer";
import { ownListing } from "@/server/listings/own-listing";
import { DIALS } from "@/lib/dials";
import { peek, spend } from "@/server/dials";
import { defineRoute } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";
import { upstream, UpstreamTimeout } from "@/server/upstream";
import { assistDealLines, assistFactLines, composeAssistPrompt } from "@/lib/assist-prompt";
import { withUntrustedRule } from "@/lib/untrusted-text";
import { aiFakeMode, aiGate, recordAiSpend } from "@/server/ai/meter";
import { signPhotoRows } from "@/server/media/links";
import { errorText } from "@/lib/error-text";

/**
 * U6-A2-C / U6-C1-R2 — THE WRITING ASSISTANT (DEC-072, in full).
 *
 *   POST /api/listings/assist
 *     { listingId?, categoryId, categoryPath?, attrs, locale, negotiable?, period?,
 *       photoIds?, title?, description?, previous? }
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
 *
 * THE SWITCH AND THE METER (D158): the helper is asked first whether it is
 * switched on — off is the refusal `featureOff`, asked before any dial so a
 * switched-off helper spends none of the seller's tries — and every answer it
 * gives (fake mode's too) is metered. Over the hourly dial sits a daily one
 * (`assist:day`, RATE_LIMIT_ASSIST_PER_DAY, 60).
 *
 * THE PEEK (bundle 18 turn 1, INC-669):
 *
 *   GET /api/listings/assist?listingId=<id>   →  { ok, triesLeft }
 *
 * answers the budget's true remaining for the caller's own listing WITHOUT
 * spending a try, so a screen opened on an ad that already spent some (the Edit;
 * a draft reopened) says the right number before any call. The same gates as a
 * try short of the spend and the switch: a session; the listing is the caller's
 * own, read as the caller; then `peek_rate_limit` under the same action, key,
 * limit and window the spend counts in. No dial of its own: one row read by
 * its key, like the options route.
 *
 * Foundations turn 3: on defineRoute. The hourly and daily dials are declared
 * in the spec (beforeParse, refuseAs the `rate` verdict), so they are spent
 * before the switch's read; the per-listing budget stays in the handler.
 */

const PATH = "/api/listings/assist";
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 1200;
const MAX_PHOTOS_SENT = 3;

function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

function textModel(): string {
  const value = serverEnv("GEMINI_TEXT_MODEL").trim();
  return value === "" ? "gemini-3.5-flash-lite" : value;
}

function clamp(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

/**
 * INC-588 / D151 — the first three photos the model may look at. The browser
 * names them by id; their rows are read as the CALLER (the listing_photos
 * policies decide which come back) and their card images are signed by the
 * service client for this one request (src/server/media/links.ts). The server
 * fetches only links it signed itself — never an address from the request.
 */
async function photoLinks(supabase: SupabaseClient<Database>, raw: unknown): Promise<string[]> {
  const ids = Array.isArray(raw)
    ? raw
        .filter((id): id is string => typeof id === "string" && id !== "")
        .slice(0, MAX_PHOTOS_SENT)
    : [];
  if (ids.length === 0) return [];
  const { data: rows, error } = await supabase
    .from("listing_photos")
    .select("id, paths, exif_stripped")
    .in("id", ids);
  if (error) {
    logRouteError(PATH, `photo rows: ${error.message}`);
    return [];
  }
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  let links: Record<string, Record<string, string>>;
  try {
    links = await signPhotoRows(supabaseAdmin, rows ?? []);
  } catch (error) {
    // The helper writes without the photos rather than not at all.
    logRouteError(PATH, error);
    return [];
  }
  return ids
    .map((id) => links[id]?.["card"] ?? links[id]?.["cover"] ?? links[id]?.["thumb"] ?? null)
    .filter((link): link is string => link !== null);
}

/** The suggestions already shown, so the next one takes a different angle. */
function previousPairs(raw: unknown): { title: string; description: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, DIALS.assistListing.limit.fallback)
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

/** D166 — the shared rule about a person's words and text inside a photo closes it. */
const SYSTEM_PROMPT = withUntrustedRule(
  [
    "You write marketplace listing copy for a classifieds app.",
    "Write to sell: a natural, specific title and a persuasive but truthful description.",
    "You are given a category path, the facts the seller entered, the seller's own draft",
    "title and description, and up to three photos of the item.",
    "KEEP EVERY FACT AND PHRASE THE SELLER GAVE — their words win over your phrasing.",
    "Add nothing that is not visible in the photos or stated in the facts: never invent a",
    "condition, measurement, age, brand, history, price, delivery term, guarantee or contact detail.",
    "If a fact is missing, leave it out rather than guessing.",
    "Never state a price, an amount or a currency. You may say what the item is sold per, and that the price is negotiable, when the facts say so.",
    "If earlier suggestions are listed, take a clearly different angle from all of them.",
    `Return JSON only: {"title": string (max ${TITLE_MAX} characters), "description": string (max ${DESCRIPTION_MAX} characters)}.`,
    "Write both fields in the requested language.",
  ].join(" "),
);

/** A photo the model may look at, fetched server-side and passed inline. */
async function inlinePhoto(url: string): Promise<{ mimeType: string; data: string } | null> {
  try {
    const response = await upstream(url, {}, { timeoutMs: 10_000, label: "assist photo" });
    if (!response.ok) return null;
    const mimeType = response.headers.get("content-type") ?? "image/jpeg";
    if (!mimeType.startsWith("image/")) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > 4_000_000) return null;
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { mimeType, data: btoa(binary) };
  } catch (error) {
    logRouteError(PATH, `photo unreadable: ${errorText(error)}`);
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

  let response: Response;
  try {
    response = await upstream(
      `${BASE}/${encodeURIComponent(textModel())}:generateContent`,
      {
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
      },
      { timeoutMs: 20_000, label: "gemini assist" },
    );
  } catch (error) {
    // Foundations turn 3 — a deadline passed is a provider that could not answer.
    if (error instanceof UpstreamTimeout) return null;
    throw error;
  }
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
    logRouteError(PATH, `unusable provider answer: ${errorText(error)}`);
    return null;
  }
}

/**
 * Bundle 16 turn S1 — the listing is the caller's own, read AS THE CALLER
 * through ownListing (the id and the seller): another seller's budget is never
 * spent or read, and an id that is not the caller's is a refusal. Written once
 * for the try and the peek (bundle 18 turn 1, INC-669). Null when it is his.
 */
async function ownListingRefusal(
  supabase: SupabaseClient<Database>,
  userId: string,
  listingId: string,
): Promise<Response | null> {
  const own = await ownListing(supabase, userId, listingId, "id, seller_id, status");
  if ("error" in own) {
    logRouteError(PATH, `listing read: ${own.error.message}`);
    return verdict([{ field: "assist", reason: "providerUnavailable" }]);
  }
  if (own.row === null) return verdict([{ field: "listingId", reason: "notYourListing" }]);
  return null;
}

/** The body requestAssist sends (posting-service.ts; step-details.tsx). */
export const AssistBody = z
  .object({
    categoryId: z.string().max(64).optional(),
    locale: z.string().max(8).optional(),
    // requestAssist sends null for a listing not yet saved.
    listingId: z.string().max(64).nullable().optional(),
    attrs: z.unknown().optional(),
    photoFacts: z.unknown().optional(),
    negotiable: z.boolean().optional(),
    // The price period as the wizard holds it ("once" among them); assistDealLines
    // keeps only the per-period words and ignores the rest, as it always has.
    period: z.string().max(16).nullable().optional(),
    previous: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .max(5)
      .optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    categoryPath: z.string().optional(),
    photoIds: z.array(z.string()).optional(),
  })
  .strict();

export const AssistQuery = z.object({ listingId: z.string().optional() });

/** INC-669 — the peek: the budget's remaining for the caller's own listing, nothing spent. */
async function handleGet(
  supabase: SupabaseClient<Database>,
  userId: string,
  query: z.infer<typeof AssistQuery>,
): Promise<Response> {
  const listingId = (query.listingId ?? "").trim();
  if (listingId === "") return verdict([{ field: "listingId", reason: "required" }]);
  const notOwn = await ownListingRefusal(supabase, userId, listingId);
  if (notOwn !== null) return notOwn;
  const budget = await peek(DIALS.assistListing, listingId);
  return ok({ ok: true, triesLeft: budget.remaining });
}

async function handlePost(
  supabase: SupabaseClient<Database>,
  userId: string,
  body: z.infer<typeof AssistBody>,
): Promise<Response> {
  const log = (message: string) => logRouteError(PATH, message);

  // D158 — the switch: a switched-off helper spends none of the seller's tries.
  const gate = await aiGate("writing_helper", log);
  if (!gate.on) {
    return verdict([
      {
        field: "assist",
        reason: gate.reason === "unavailable" ? "providerUnavailable" : "featureOff",
      },
    ]);
  }

  const categoryId = body.categoryId ?? "";
  if (categoryId === "") return verdict([{ field: "categoryId", reason: "required" }]);
  const locale = (body.locale ?? "en").slice(0, 8);
  const listingId = body.listingId ?? "";
  // The category is read as the CALLER (RLS: active categories are public), so
  // an inactive or unknown id is a refusal rather than a leak.
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("slug, name_en")
    .eq("id", categoryId)
    .maybeSingle();
  if (categoryError) {
    logRouteError(PATH, categoryError.message);
    return verdict([{ field: "assist", reason: "providerUnavailable" }]);
  }
  if (!category) return verdict([{ field: "categoryId", reason: "categoryNotPostable" }]);

  // Bundle 16 turn S1 — the listing named for the per-listing budget is the caller's
  // own, read AS THE CALLER (the owner reads his own rows): another seller's tries
  // are never spent, and an id that is not the caller's is a refusal.
  if (listingId !== "") {
    const notOwn = await ownListingRefusal(supabase, userId, listingId);
    if (notOwn !== null) return notOwn;
  }

  // THE PER-LISTING BUDGET, spent before any provider call is made (F5: gate first).
  let triesLeft: number | null = null;
  if (listingId !== "") {
    // dial in the handler: conditional, keyed by the listing, read for its remaining count — INC-859
    const budget = await spend(DIALS.assistListing, listingId);
    if (!budget.allowed) return verdict([{ field: "assist", reason: "assistBudgetSpent" }]);
    // INC-299 — the count comes from the rate-limit answer, never a table read.
    triesLeft = budget.remaining;
  }

  const facts = [
    ...assistFactLines(body.attrs, body.photoFacts),
    ...assistDealLines(body.negotiable, body.period),
  ];
  const previous = previousPairs(body.previous);
  const sellerTitle = clamp(body.title, TITLE_MAX);
  const sellerDescription = clamp(body.description, DESCRIPTION_MAX);
  const categoryPath =
    body.categoryPath !== undefined && body.categoryPath.trim() !== ""
      ? body.categoryPath.slice(0, 300)
      : `${category.name_en} (${category.slug})`;

  // FAKE MODE: `E2E_FAKE_ASSIST=1`, or the harness's standing `E2E_FAKE_TRANSLATE=1`
  // (the flag every e2e job already exports — the translate route's own switch),
  // so a test run never spends provider credit and never reaches the network.
  if (aiFakeMode("E2E_FAKE_ASSIST")) {
    const fake = fakeAssist(
      category.slug,
      facts,
      previous.length + 1,
      sellerTitle,
      sellerDescription,
    );
    await recordAiSpend("writing_helper", 1, log);
    return ok({ ok: true, ...fake, triesLeft });
  }

  const urls = await photoLinks(supabase, body.photoIds);
  const prompt = composeAssistPrompt({
    locale,
    categoryPath,
    facts,
    sellerTitle,
    sellerDescription,
    photoCount: urls.length,
    previous,
  });

  const answer = await callProvider(prompt, urls);
  if (answer === null) return verdict([{ field: "assist", reason: "providerUnavailable" }]);
  await recordAiSpend("writing_helper", 1, log);
  return ok({ ok: true, ...answer, triesLeft });
}

const ASSIST_DIALS = [
  {
    dial: DIALS.assistHour,
    key: "user" as const,
    when: "beforeParse" as const,
    refuseAs: { verdict: { field: "rate" } },
  },
  {
    dial: DIALS.assistDay,
    key: "user" as const,
    when: "beforeParse" as const,
    refuseAs: { verdict: { field: "rate" } },
  },
];

export const Route = createFileRoute("/api/listings/assist")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "user",
        query: AssistQuery,
        handler: async ({ supabase, userId, query }) =>
          handleGet(supabase!, userId!, query as z.infer<typeof AssistQuery>),
      }),
      POST: defineRoute({
        path: PATH,
        auth: "user",
        body: AssistBody,
        rate: ASSIST_DIALS,
        handler: async ({ supabase, userId, body }) => handlePost(supabase!, userId!, body),
      }),
    },
  },
});
