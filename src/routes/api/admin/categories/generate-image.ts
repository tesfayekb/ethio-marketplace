/** Category images: one staff boundary, one audited task; variants remain in the browser. */
import { createFileRoute } from "@tanstack/react-router";
import { GenerateImageBody, GenerateImageProbeQuery } from "@/lib/schemas/category-image";
import { aiCall, renderTask, type AiAnswer } from "@/server/ai/gateway";
import type { OutputOf } from "@/server/ai/tasks";
import { bytes, ok } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";

const PATH = "/api/admin/categories/generate-image";
const AUTH = { staff: { resource: "categories", action: "assets" } } as const;

function failure(answer: Exclude<AiAnswer<OutputOf<"category_image">>, { ok: true }>): Response {
  if (answer.reason === "featureOff" || answer.reason === "budget" || answer.reason === "unavailable") {
    const reason = answer.reason === "featureOff" ? "staff" : answer.reason;
    return ok({ error: `AI feature category_images is off (${reason})`, stage: "switched-off" }, { status: reason === "unavailable" ? 503 : 409, cache: "no-store" });
  }
  const status = "status" in answer ? answer.status : undefined;
  logRouteError(PATH, `image_generate_failed stage=model-call ${answer.reason}`);
  if (answer.reason === "providerError" && status !== undefined && status >= 400 && status < 500) {
    const code = status === 400 || status === 422 ? "modelRefused" : status === 401 || status === 403 ? "modelKeyRefused" : status === 429 ? "modelRateLimited" : "modelCallFailed";
    return ok({ error: code, stage: "model-call" }, { status, cache: "no-store" });
  }
  return ok({ error: "server error", stage: "model-call" }, { status: 502, cache: "no-store" });
}

async function generate(ctx: RouteContext, categoryId: string, probe: boolean): Promise<Response> {
  const { supabase, userId } = ctx;
  if (supabase === null) throw new Error("staff client missing");
  const { data: category, error } = await supabase.from("categories").select("id, name_en").eq("id", categoryId).maybeSingle();
  if (error) {
    logRouteError(PATH, error.message);
    return ok({ error: "server error", stage: "model-call" }, { status: 502, cache: "no-store" });
  }
  if (category === null) return ok({ error: "category not found" }, { status: 404, cache: "no-store" });
  const { data: pointer } = await supabase.from("category_tree_pointers").select("parent_id, display_order").eq("child_id", categoryId).not("parent_id", "is", null).order("is_primary", { ascending: false }).order("display_order", { ascending: true }).limit(1).maybeSingle();
  let parentName = "";
  if (pointer?.parent_id) {
    const { data: parent } = await supabase.from("categories").select("name_en").eq("id", pointer.parent_id).maybeSingle();
    parentName = parent?.name_en ?? "";
  }
  const material = { name: category.name_en, parent: parentName };
  const answer = await aiCall("category_image", material, { actorId: userId, path: PATH });
  if (!answer.ok) return failure(answer);
  if (probe) return bytes(answer.value.bytes, answer.value.mime, { headers: { "X-Gen-Ms": String(answer.latencyMs), "Cache-Control": "no-store" } });
  let binary = "";
  for (let offset = 0; offset < answer.value.bytes.length; offset += 32768) binary += String.fromCharCode(...answer.value.bytes.subarray(offset, offset + 32768));
  return ok({ stage: "generated", prompt: renderTask("category_image", material), genMs: answer.latencyMs, image: btoa(binary) }, { cache: "no-store" });
}

export const Route = createFileRoute("/api/admin/categories/generate-image")({
  server: { handlers: {
    POST: defineRoute({ path: PATH, auth: AUTH, body: GenerateImageBody,
      badShape: ({ code }) => ok({ error: code === "invalid_json" ? "invalid json body" : "invalid categoryId" }, { status: 400 }),
      handler: async (ctx) => generate(ctx, ctx.body.categoryId, false),
    }),
    GET: defineRoute({ path: PATH, auth: AUTH, query: GenerateImageProbeQuery,
      badShape: ({ path }) => ok({ error: path === "probe" ? "probe=1 required" : "invalid categoryId" }, { status: 400 }),
      handler: async (ctx) => generate(ctx, ctx.query.categoryId, true),
    }),
  } },
});
