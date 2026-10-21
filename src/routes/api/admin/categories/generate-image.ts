/**
 * C5a PART C.1 — POST /api/admin/categories/generate-image
 * and the A7 operator walk surface GET ?probe=1&categoryId=...
 *
 * DEC-082 (INC-308) — THE WORKER DOES I/O ONLY. The route gates, validates,
 * reads the category, builds the house prompt and calls the provider (fake mode
 * → the captured fixture bytes), then answers the generated image as base64.
 * It no longer decodes, cuts variants, uploads, persists or prunes: the admin's
 * browser cuts card/thumb/og and writes them under the admin's own session
 * (`src/features/admin-categories/category-images-service.ts`). No image
 * library is loaded on the Worker.
 *
 * Gate: censused U4c pattern (bearer -> caller-context client -> has_permission),
 * checking `categories:assets`. Provider key is server-env only. Every 5xx is
 * logged as `[ssr-error] <path> <message>` first (I4). Provider 429/402 are
 * surfaced with their own status (F4) — never disguised as success.
 *
 * Server-only modules are loaded with dynamic `import()` INSIDE the handlers so
 * nothing from `src/server/**` can enter the client graph.
 *
 * D158 — THE SWITCH AND THE METER: the model call (POST and the probe alike) is
 * asked for only while `category_images` is switched on; off is a 409 with the
 * stage `switched-off` (503 when the switch could not be read), and every image
 * the provider (or fake mode) returns is metered.
 */
import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { errorText } from "@/lib/error-text";

const PATH = "/api/admin/categories/generate-image";

interface Body {
  categoryId?: string;
  customPrompt?: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The single server stage left: the model call (category read included). */
class ModelCallError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ModelCallError";
    this.status = status;
  }
}

/** D158 — the feature is switched off (409), or its switch could not be read (503). */
class FeatureOffError extends Error {
  readonly status: number;
  constructor(reason: string) {
    super(`AI feature category_images is off (${reason})`);
    this.name = "FeatureOffError";
    this.status = reason === "unavailable" ? 503 : 409;
  }
}

/** Thrown when the category does not exist, or RLS hides it (PART D). */
class CategoryNotFoundError extends Error {
  constructor() {
    super("category not found");
    this.name = "CategoryNotFoundError";
  }
}

interface Generated {
  prompt: string;
  genMs: number;
  bytes: Uint8Array;
}

async function generate(
  supabase: SupabaseClient<Database>,
  categoryId: string,
  customPrompt: string | undefined,
): Promise<Generated> {
  const { buildPrompt } = await import("@/server/category-images/prompt");
  const { fakeGeneratedPng } = await import("@/server/category-images/fixture");
  const { generateImageBytes, isFakeMode } = await import("@/server/category-images/gemini");

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name_en")
    .eq("id", categoryId)
    .maybeSingle();
  if (categoryError) throw new ModelCallError(categoryError.message, 500);
  // PART D — unknown OR RLS-hidden is the SAME honest answer: 404.
  if (!category) throw new CategoryNotFoundError();

  // INC-310 — the home parent (DEC-080: the is_primary pointer) supplies the
  // prompt context; display_order only breaks a tie.
  const { data: pointer } = await supabase
    .from("category_tree_pointers")
    .select("parent_id, display_order")
    .eq("child_id", categoryId)
    .not("parent_id", "is", null)
    .order("is_primary", { ascending: false })
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  let parentName: string | null = null;
  if (pointer?.parent_id) {
    const { data: parent } = await supabase
      .from("categories")
      .select("name_en")
      .eq("id", pointer.parent_id)
      .maybeSingle();
    parentName = parent?.name_en ?? null;
  }

  const prompt = buildPrompt({ nameEn: category.name_en, parentName, customPrompt });

  const { aiGate, recordAiSpend } = await import("@/server/ai/meter");
  const log = (message: string) => console.error(`[ssr-error] ${PATH} ${message}`);
  const gate = await aiGate("category_images", log);
  if (!gate.on) throw new FeatureOffError(gate.reason);

  const genStart = performance.now();
  let bytes: Uint8Array;
  try {
    bytes = isFakeMode() ? fakeGeneratedPng() : (await generateImageBytes(prompt)).bytes;
  } catch (error) {
    const message = errorText(error); // INC-625
    const status =
      typeof (error as { status?: unknown })?.status === "number"
        ? (error as { status: number }).status
        : 500;
    throw new ModelCallError(message, status);
  }
  await recordAiSpend("category_images", 1, log);
  return { prompt, genMs: Math.round(performance.now() - genStart), bytes };
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/** Magic-byte label for the probe's raw answer — a header read, not a decode. */
function sniffMime(bytes: Uint8Array): string {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return "image/webp";
  }
  return "application/octet-stream";
}

function noStore(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/** Maps a failure to its JSON answer; every one carries a stage (F4). */
function failure(error: unknown, probe: boolean): Response {
  if (error instanceof CategoryNotFoundError) {
    return noStore({ error: "category not found" }, 404);
  }
  if (error instanceof FeatureOffError) {
    return noStore({ error: error.message, stage: "switched-off" }, error.status);
  }
  const message = errorText(error); // INC-625
  const status = error instanceof ModelCallError ? error.status : 500;
  console.error(`[ssr-error] ${PATH} image_generate_failed stage=model-call ${message}`);
  if (status >= 400 && status < 500) {
    // INC-803 — the POST's reply carries a fixed code by the provider's
    // status; the full upstream text stays in the log line above.
    const code =
      status === 400 || status === 422
        ? "modelRefused"
        : status === 401 || status === 403
          ? "modelKeyRefused"
          : status === 429
            ? "modelRateLimited"
            : "modelCallFailed";
    return noStore({ error: code, stage: "model-call" }, status);
  }
  // INC-803 — THE ONE REVIEWED SITE where an upstream text reaches a reply:
  // the staff-gated probe (GET ?probe=1) keeps the true message, by design;
  // POST keeps the generic body.
  return noStore({ error: probe ? message : "server error", stage: "model-call" }, 502);
}

export const Route = createFileRoute("/api/admin/categories/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { gateCategoriesAssets, json } = await import("@/server/category-images/gate");
        const gate = await gateCategoriesAssets(request, PATH);
        if (!gate.ok) return gate.response;

        let body: Body;
        try {
          body = (await request.json()) as Body;
        } catch {
          return json({ error: "invalid json body" }, 400);
        }
        const categoryId = (body.categoryId ?? "").trim();
        if (!UUID_RE.test(categoryId)) return json({ error: "invalid categoryId" }, 400);
        if (body.customPrompt !== undefined && typeof body.customPrompt !== "string") {
          return json({ error: "customPrompt must be a string" }, 400);
        }
        if ((body.customPrompt ?? "").length > 500) {
          return json({ error: "customPrompt too long (max 500)" }, 400);
        }

        try {
          const result = await generate(gate.supabase, categoryId, body.customPrompt);
          return noStore(
            {
              stage: "generated",
              prompt: result.prompt,
              genMs: result.genMs,
              image: toBase64(result.bytes),
            },
            200,
          );
        } catch (error) {
          return failure(error, false);
        }
      },

      // A7 WALK SURFACE: the raw generated image, exactly as the browser gets it.
      GET: async ({ request }) => {
        const { gateCategoriesAssets, json } = await import("@/server/category-images/gate");
        const url = new URL(request.url);
        if (url.searchParams.get("probe") !== "1") {
          return json({ error: "probe=1 required" }, 400);
        }
        const gate = await gateCategoriesAssets(request, PATH);
        if (!gate.ok) return gate.response;

        const categoryId = (url.searchParams.get("categoryId") ?? "").trim();
        if (!UUID_RE.test(categoryId)) return json({ error: "invalid categoryId" }, 400);

        try {
          const result = await generate(gate.supabase, categoryId, undefined);
          return new Response(result.bytes as BodyInit, {
            headers: {
              "Content-Type": sniffMime(result.bytes),
              "Cache-Control": "no-store",
              "X-Gen-Ms": String(result.genMs),
            },
          });
        } catch (error) {
          return failure(error, true);
        }
      },
    },
  },
});
