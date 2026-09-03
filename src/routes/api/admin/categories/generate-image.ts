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

const PATH = "/api/admin/categories/generate-image";

interface Body {
  categoryId?: string;
  customPrompt?: string;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface RunResult {
  imageUrl: string;
  thumbUrl: string;
  ogUrl: string;
  prompt: string;
  timings: { genMs: number; processMs: number; totalMs: number };
  bytes: { card: Uint8Array; thumb: Uint8Array; og: Uint8Array };
}

async function run(categoryId: string, customPrompt: string | undefined): Promise<RunResult> {
  const { buildPrompt } = await import("@/server/category-images/prompt");
  const { processGeneratedPng } = await import("@/server/category-images/pipeline");
  const { fakeGeneratedPng } = await import("@/server/category-images/fixture");
  const { generateImageBytes, isFakeMode, GeminiError } = await import(
    "@/server/category-images/gemini"
  );
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: category, error: categoryError } = await supabaseAdmin
    .from("categories")
    .select("id, name_en")
    .eq("id", categoryId)
    .maybeSingle();
  if (categoryError) throw new GeminiError(categoryError.message, 500);
  if (!category) throw new GeminiError("category not found", 404);

  // Primary browse parent (lowest display_order edge) supplies the prompt context.
  const { data: pointer } = await supabaseAdmin
    .from("category_tree_pointers")
    .select("parent_id, display_order")
    .eq("child_id", categoryId)
    .not("parent_id", "is", null)
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  let parentName: string | null = null;
  if (pointer?.parent_id) {
    const { data: parent } = await supabaseAdmin
      .from("categories")
      .select("name_en")
      .eq("id", pointer.parent_id)
      .maybeSingle();
    parentName = parent?.name_en ?? null;
  }

  const prompt = buildPrompt({ nameEn: category.name_en, parentName, customPrompt });

  const genStart = performance.now();
  const source = isFakeMode() ? fakeGeneratedPng() : await generateImageBytes(prompt);
  const genMs = performance.now() - genStart;

  const output = processGeneratedPng(source, genMs);

  const base = `${categoryId}`;
  const uploads: [string, Uint8Array][] = [
    [`${base}/card-512.png`, output.card],
    [`${base}/thumb-128.png`, output.thumb],
    [`${base}/og-1200x630.png`, output.og],
  ];
  for (const [path, bytes] of uploads) {
    const { error } = await supabaseAdmin.storage
      .from("category-assets")
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (error) throw new GeminiError(`storage upload failed: ${error.message}`, 500);
  }

  const publicBase = `${process.env["SUPABASE_URL"] ?? ""}/storage/v1/object/public/category-assets`;
  const imageUrl = `${publicBase}/${base}/card-512.png`;
  const thumbUrl = `${publicBase}/${base}/thumb-128.png`;
  const ogUrl = `${publicBase}/${base}/og-1200x630.png`;

  const { error: updateError } = await supabaseAdmin
    .from("categories")
    .update({
      image_url: imageUrl,
      image_thumb_url: thumbUrl,
      og_image_url: ogUrl,
      image_generation_prompt: prompt,
    })
    .eq("id", categoryId);
  if (updateError) throw new GeminiError(updateError.message, 500);

  return {
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
        const { gateCategoriesAssets, json, fail5xx } = await import("@/server/category-images/gate");
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
          const result = await run(categoryId, body.customPrompt);
          return json(
            {
              imageUrl: result.imageUrl,
              thumbUrl: result.thumbUrl,
              ogUrl: result.ogUrl,
              prompt: result.prompt,
              timings: result.timings,
            },
            200,
          );
        } catch (error) {
          const { GeminiError } = await import("@/server/category-images/gemini");
          if (error instanceof GeminiError) {
            if (error.status >= 500) return fail5xx(PATH, error.message, 502);
            return json({ error: error.message }, error.status);
          }
          return fail5xx(PATH, error instanceof Error ? error.message : "unknown error");
        }
      },

      // A7 WALK SURFACE: the full flow, rendered inline with its timings.
      GET: async ({ request }) => {
        const { gateCategoriesAssets, json, fail5xx } = await import("@/server/category-images/gate");
        const url = new URL(request.url);
        if (url.searchParams.get("probe") !== "1") {
          return json({ error: "probe=1 required" }, 400);
        }
        const gate = await gateCategoriesAssets(request, PATH);
        if (!gate.ok) return gate.response;

        const categoryId = (url.searchParams.get("categoryId") ?? "").trim();
        if (!UUID_RE.test(categoryId)) return json({ error: "invalid categoryId" }, 400);

        try {
          const result = await run(categoryId, undefined);
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
          const { GeminiError } = await import("@/server/category-images/gemini");
          if (error instanceof GeminiError && error.status < 500) {
            return json({ error: error.message }, error.status);
          }
          return fail5xx(PATH, error instanceof Error ? error.message : "unknown error", 502);
        }
      },
    },
  },
});
