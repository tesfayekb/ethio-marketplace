import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_ICON_NAMES } from "@/lib/category-icon-names";
import { errorText } from "@/lib/error-text";
import { callRoute, type RoutePath } from "@/lib/route-client";

/**
 * C5b — the client seam for the two FROZEN C5a routes.
 *
 * ROUTE CONTRACT CENSUS (verbatim success shapes, C5a-3 as landed):
 *   POST /api/admin/categories/generate-image (DEC-082 — provider call only)
 *     { stage: "generated", prompt, genMs, image: <base64 PNG> }
 *   generateCategoryImage() below still resolves the C5a GeneratedAssets shape
 *     { stage: "done", imageUrl, thumbUrl, ogUrl, prompt, timings }.
 *   POST /api/admin/categories/suggest-icon
 *     { icon: "<allowlisted name>", fallback: boolean, fake: boolean }
 *
 * Both routes gate on `categories:assets` server-side (F3) and expect a bearer
 * token, so every call attaches the live session's access token. F4 — no
 * phantom success: a non-2xx answer throws, carrying the route's `stage` when
 * the (admin-gated) body supplies one.
 */

export interface GeneratedAssets {
  stage: string;
  imageUrl: string;
  thumbUrl: string;
  ogUrl: string;
  prompt: string;
  timings: { genMs: number; processMs: number; totalMs: number };
}

/** Thrown for every refused/failed route call; `stage` is present when known. */
export class CategoryImageError extends Error {
  readonly stage: string | null;
  readonly status: number;
  constructor(message: string, status: number, stage: string | null) {
    super(message);
    this.name = "CategoryImageError";
    this.status = status;
    this.stage = stage;
  }
}

async function post(path: RoutePath, body: unknown, timeoutMs?: number): Promise<Record<string, unknown> | null> {
  const answer = await callRoute(path, { method: "POST", json: body, auth: "required", timeoutMs });
  if (answer.kind === "signedOut") throw new CategoryImageError("not signed in", 401, "model-call");
  if (answer.kind === "unreachable") {
    if (answer.reason === "timeout") throw new CategoryImageError("client-timeout", 0, "client-timeout");
    throw new CategoryImageError("network error", 0, "model-call");
  }
  if (!answer.ok) throw new CategoryImageError(
    typeof answer.payload?.error === "string" ? answer.payload.error : `HTTP ${answer.status}`,
    answer.status,
    typeof answer.payload?.stage === "string" ? answer.payload.stage : "model-call",
  );
  return answer.payload;
}

function generatedPayload(value: Record<string, unknown> | null): value is Record<string, unknown> & { image: string; prompt: string; genMs: number } {
  return value !== null && typeof value.image === "string" && value.image !== "" && typeof value.prompt === "string" && typeof value.genMs === "number" && Number.isFinite(value.genMs);
}

const BUCKET = "category-assets";

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * DEC-082 (INC-308) — THE DIVISION OF LABOUR. The route only calls the
 * provider and answers the image; this browser cuts the variants and writes
 * them under the admin's OWN session (storage policies + the gated definer
 * RPC decide, never a service role):
 *   model-call (route) → process (canvas) → upload (3 objects) → persist (RPC)
 *   → prune (best effort, logged, never fatal).
 * Every failure is a CategoryImageError carrying its stage (F4).
 */
export async function generateCategoryImage(input: { categoryId: string }): Promise<GeneratedAssets> {
  const payload = await post("/api/admin/categories/generate-image", { categoryId: input.categoryId }, 30_000);
  if (!generatedPayload(payload)) throw new CategoryImageError("route returned no image", 502, "model-call");

  const { makeVariants } = await import("./category-image-variants");
  const processStart = performance.now();
  let variants: Awaited<ReturnType<typeof makeVariants>>;
  try {
    const bytes = fromBase64(payload.image);
    variants = await makeVariants(new Blob([bytes as BlobPart]));
  } catch (error) {
    throw new CategoryImageError(
      error === null || error === undefined ? "image processing failed" : errorText(error),
      0,
      "process",
    );
  }
  const processMs = Math.max(1, Math.round(performance.now() - processStart));

  // C5e PART B — VERSIONED names, so a regenerate can never be served stale.
  const base = input.categoryId;
  const genTs = Date.now();
  const names = { card: `card-${genTs}.png`, thumb: `thumb-${genTs}.png`, og: `og-${genTs}.png` };
  const storage = supabase.storage.from(BUCKET);
  const uploads: [string, Blob][] = [
    [`${base}/${names.card}`, variants.card],
    [`${base}/${names.thumb}`, variants.thumb],
    [`${base}/${names.og}`, variants.og],
  ];
  for (const [path, blob] of uploads) {
    const { error } = await storage.upload(path, blob, { contentType: "image/png", upsert: true });
    if (error) {
      throw new CategoryImageError(`storage upload failed: ${error.message}`, 0, "upload");
    }
  }
  const imageUrl = storage.getPublicUrl(`${base}/${names.card}`).data.publicUrl;
  const thumbUrl = storage.getPublicUrl(`${base}/${names.thumb}`).data.publicUrl;
  const ogUrl = storage.getPublicUrl(`${base}/${names.og}`).data.publicUrl;

  const prompt = payload.prompt ?? "";
  const { error: persistError } = await supabase.rpc("admin_set_category_images", {
    p_id: input.categoryId,
    p_image_url: imageUrl,
    p_image_thumb_url: thumbUrl,
    p_og_image_url: ogUrl,
    // C5c PART C.2 — the column records a CUSTOM prompt only (NULL otherwise).
    p_generation_prompt: null as unknown as string,
  });
  if (persistError) throw new CategoryImageError(persistError.message, 0, "persist");

  // C5e PART B — PRUNE. Best effort: the row already points at the new set.
  try {
    const { data: existing, error: listError } = await storage.list(base);
    if (listError) throw new Error(listError.message);
    const keep = new Set([names.card, names.thumb, names.og]);
    const stale = (existing ?? [])
      .map((entry) => entry.name)
      .filter((name) => !keep.has(name))
      .map((name) => `${base}/${name}`);
    if (stale.length > 0) {
      const { error: removeError } = await storage.remove(stale);
      if (removeError) throw new Error(removeError.message);
    }
  } catch (error) {
    console.error(
      `[category-images] image_prune_failed ${error === null || error === undefined ? "unknown" : errorText(error)}`,
    );
  }

  const genMs = Math.round(payload.genMs ?? 0);
  return {
    stage: "done",
    imageUrl,
    thumbUrl,
    ogUrl,
    prompt,
    timings: { genMs, processMs, totalMs: genMs + processMs },
  };
}

export async function suggestCategoryIcon(input: {
  name: string;
  parentName?: string | null;
}): Promise<{ icon: string; fallback: boolean }> {
  const payload = (await post("/api/admin/categories/suggest-icon", {
    name: input.name,
    ...(input.parentName ? { parentName: input.parentName } : {}),
  }));
  // Bundle 2 step 18 — a missing icon is a fallback too, never silent.
  if (typeof payload?.icon !== "string") return { icon: "Package", fallback: true };
  return { icon: payload.icon, fallback: payload.fallback === true };
}

/**
 * C5g PART C — ACCEPT. The gated definer RPC stamps `image_accepted_at` and
 * returns it; every later persist clears it again, so an accepted badge always
 * refers to the generation the operator actually looked at. Refusals raise the
 * RPC's message (a translation key for the domain refusals) — F4, never a
 * silent no-op.
 */
export async function acceptCategoryImage(categoryId: string): Promise<string> {
  const { data, error } = await supabase.rpc("admin_accept_category_image", { p_id: categoryId });
  if (error) throw new Error(error.message);
  return data as string;
}

/**
 * C5h PART B — STORED TRUTH. Asset object names are VERSIONED (C5e PART B), so
 * there is no URL to guess: the surface asks the row what it holds. The gated
 * definer reader answers the three URLs plus the acceptance stamp, or `null`
 * when the id is unknown (the RPC's empty set — E6, explicit).
 */
export interface StoredAssets {
  imageUrl: string | null;
  thumbUrl: string | null;
  ogUrl: string | null;
  acceptedAt: string | null;
}

export async function loadCategoryImages(categoryId: string): Promise<StoredAssets | null> {
  const { data, error } = await supabase.rpc("admin_get_category_images", { p_id: categoryId });
  if (error) throw new Error(error.message);
  const row = (data ?? [])[0];
  if (!row) return null;
  return {
    imageUrl: row.image_url,
    thumbUrl: row.image_thumb_url,
    ogUrl: row.og_image_url,
    acceptedAt: row.image_accepted_at,
  };
}

/**
 * C5b PART B — the manual fallback picker's options.
 *
 * FIX-SCAN-1 ISSUE 4 — the picker no longer carries a hand-kept mirror: it
 * reads the ONE allowlist in `src/lib/category-icon-names.ts`, which the
 * server validator and the glyph map both read too.
 */
export const ICON_CHOICES = CATEGORY_ICON_NAMES;
