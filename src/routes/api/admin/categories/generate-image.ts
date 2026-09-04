/**
 * C5a PART C.1 — POST /api/admin/categories/generate-image
 * and the A7 operator walk surface GET ?probe=1&categoryId=...
 *
 * Gate: censused U4c pattern (bearer -> caller-context client -> has_permission),
 * checking `categories:assets`. Provider key is server-env only. Every 5xx is
 * logged as `[ssr-error] <path> <message>` first (I4). Provider 429/402 are
 * surfaced with their own status (F4) — never disguised as success.
 *
 * Server-only modules are loaded with dynamic `import()` INSIDE the handlers so
 * nothing from `src/server/**` can enter the client graph.
 */
import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

const PATH = "/api/admin/categories/generate-image";

interface Body {
  categoryId?: string;
  customPrompt?: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface RunResult {
  stage: "done";
  imageUrl: string;
  thumbUrl: string;
  ogUrl: string;
  prompt: string;
  timings: { genMs: number; processMs: number; totalMs: number };
  bytes: { card: Uint8Array; thumb: Uint8Array; og: Uint8Array };
}

/** Thrown when the category does not exist, or RLS hides it (PART D). */
export class CategoryNotFoundError extends Error {
  constructor() {
    super("category not found");
    this.name = "CategoryNotFoundError";
  }
}

async function run(
  supabase: SupabaseClient<Database>,
  categoryId: string,
  customPrompt: string | undefined,
): Promise<RunResult> {
  const { buildPrompt } = await import("@/server/category-images/prompt");
  const { processGeneratedPng, atStageAsync, StageError } =
    await import("@/server/category-images/pipeline");
  const { fakeGeneratedPng } = await import("@/server/category-images/fixture");
  const { generateImageBytes, isFakeMode } = await import("@/server/category-images/gemini");

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name_en")
    .eq("id", categoryId)
    .maybeSingle();
  if (categoryError) throw new StageError("persist", categoryError.message, 500);
  // PART D — unknown OR RLS-hidden is the SAME honest answer: 404.
  if (!category) throw new CategoryNotFoundError();

  // Primary browse parent (lowest display_order edge) supplies the prompt context.
  const { data: pointer } = await supabase
    .from("category_tree_pointers")
    .select("parent_id, display_order")
    .eq("child_id", categoryId)
    .not("parent_id", "is", null)
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

  const genStart = performance.now();
  const source = await atStageAsync("model-call", async () =>
    isFakeMode() ? fakeGeneratedPng() : (await generateImageBytes(prompt)).bytes,
  );
  const genMs = performance.now() - genStart;

  const output = processGeneratedPng(source, genMs);

  /**
   * C5e PART B — VERSIONED ASSETS. The object name carries the generation
   * timestamp (`card-<genTs>.png`), so a regenerate can never be served stale
   * from a CDN or browser cache: the URL itself changes. Older objects under
   * the id prefix are removed best-effort AFTER the row points at the new set.
   */
  const base = `${categoryId}`;
  const genTs = Date.now();
  const names = {
    card: `card-${genTs}.png`,
    thumb: `thumb-${genTs}.png`,
    og: `og-${genTs}.png`,
  };
  const uploads: [string, Uint8Array][] = [
    [`${base}/${names.card}`, output.card],
    [`${base}/${names.thumb}`, output.thumb],
    [`${base}/${names.og}`, output.og],
  ];
  await atStageAsync("upload", async () => {
    for (const [path, bytes] of uploads) {
      const { error } = await supabase.storage
        .from("category-assets")
        .upload(path, bytes, { contentType: "image/png", upsert: true });
      if (error) throw new StageError("upload", `storage upload failed: ${error.message}`, 500);
    }
  });

  const publicBase = `${process.env["SUPABASE_URL"] ?? ""}/storage/v1/object/public/category-assets`;
  const imageUrl = `${publicBase}/${base}/${names.card}`;
  const thumbUrl = `${publicBase}/${base}/${names.thumb}`;
  const ogUrl = `${publicBase}/${base}/${names.og}`;

  await atStageAsync("persist", async () => {
    const { error } = await supabase.rpc("admin_set_category_images", {
      p_id: categoryId,
      p_image_url: imageUrl,
      p_image_thumb_url: thumbUrl,
      p_og_image_url: ogUrl,
      // C5c PART C.2 — the column records a CUSTOM prompt only; the uniform
      // house prompt is code truth, not row truth, so it persists as NULL.
      p_generation_prompt:
        (customPrompt ?? "").trim() === "" ? (null as unknown as string) : prompt,
    });
    if (error) throw new StageError("persist", error.message, 500);
  });

  // C5e PART B — PRUNE. Best effort only: the row already points at the new
  // set, so a failed cleanup is logged (never silent, F4) and never fails the
  // generation the operator just paid for.
  try {
    const { data: existing } = await supabase.storage.from("category-assets").list(base);
    const stale = (existing ?? [])
      .map((entry) => entry.name)
      .filter((name) => name !== names.card && name !== names.thumb && name !== names.og)
      .map((name) => `${base}/${name}`);
    if (stale.length > 0) await supabase.storage.from("category-assets").remove(stale);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error(`[ssr-error] ${PATH} image_prune_failed ${message}`);
  }

  return {
    stage: "done",
    imageUrl,
    thumbUrl,
    ogUrl,
    prompt,
    timings: output.timings,
    bytes: { card: output.card, thumb: output.thumb, og: output.og },
  };
}

function toDataUrl(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
  return `data:image/png;base64,${btoa(binary)}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
          const result = await run(gate.supabase, categoryId, body.customPrompt);
          return json(
            {
              stage: result.stage,
              imageUrl: result.imageUrl,
              thumbUrl: result.thumbUrl,
              ogUrl: result.ogUrl,
              prompt: result.prompt,
              timings: result.timings,
            },
            200,
          );
        } catch (error) {
          // PART D — honest 404 before any 5xx wrapping.
          if (error instanceof CategoryNotFoundError) {
            return json({ error: "category not found" }, 404);
          }
          const { StageError } = await import("@/server/category-images/pipeline");
          const message = error instanceof Error ? error.message : "unknown error";
          const stage = error instanceof StageError ? error.stage : "unknown";
          // PART B (F4): stage + true cause reach the log before the generic body.
          console.error(`[ssr-error] ${PATH} image_generate_failed stage=${stage} ${message}`);
          if (error instanceof StageError && error.status < 500 && error.status >= 400) {
            return json({ error: message, stage }, error.status);
          }
          // Non-probe POST keeps the GENERIC body.
          return json({ error: "server error" }, 502);
        }
      },

      // A7 WALK SURFACE: the full flow, rendered inline with its timings.
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
          const result = await run(gate.supabase, categoryId, undefined);
          const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>category image probe</title>
<style>body{font:14px system-ui;margin:24px;background:#fafafa}img{background:#fff;border:1px solid #ddd;max-width:100%}pre{background:#fff;border:1px solid #ddd;padding:12px;overflow:auto}</style>
</head><body>
<h1>category-assets probe</h1>
<pre>${escapeHtml(JSON.stringify(result.timings, null, 2))}</pre>
<pre>${escapeHtml(result.prompt)}</pre>
<h2>card 512</h2><img alt="card" width="512" src="${toDataUrl(result.bytes.card)}">
<h2>thumb 128</h2><img alt="thumb" width="128" src="${toDataUrl(result.bytes.thumb)}">
<h2>og 1200x630</h2><img alt="og" width="600" src="${toDataUrl(result.bytes.og)}">
</body></html>`;
          return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
        } catch (error) {
          if (error instanceof CategoryNotFoundError) {
            return json({ error: "category not found" }, 404);
          }
          const { StageError } = await import("@/server/category-images/pipeline");
          const message = error instanceof Error ? error.message : "unknown error";
          const stage = error instanceof StageError ? error.stage : "unknown";
          console.error(`[ssr-error] ${PATH} image_generate_failed stage=${stage} ${message}`);
          // ADMIN-GATED PROBE ONLY: the gate above proved `categories:assets`,
          // so the true stage and message are admin-eyes-only detail (F4).
          const status = error instanceof StageError && error.status >= 400 ? error.status : 502;
          return json({ error: message, stage }, status >= 500 ? 502 : status);
        }
      },
    },
  },
});
