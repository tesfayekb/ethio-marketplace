import { supabase } from "@/integrations/supabase/client";

/**
 * C5b — the client seam for the two FROZEN C5a routes.
 *
 * ROUTE CONTRACT CENSUS (verbatim success shapes, C5a-3 as landed):
 *   POST /api/admin/categories/generate-image
 *     { stage: "done", imageUrl, thumbUrl, ogUrl, prompt,
 *       timings: { genMs, processMs, totalMs } }
 *   POST /api/admin/categories/suggest-icon
 *     { icon: "<allowlisted name>", fake: boolean }
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

async function post(path: string, body: unknown): Promise<unknown> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? "";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token === "" ? {} : { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let parsed: { error?: string; stage?: string } = {};
  try {
    parsed = JSON.parse(text) as { error?: string; stage?: string };
  } catch {
    /* a non-JSON body still carries its status */
  }
  if (!response.ok) {
    throw new CategoryImageError(
      parsed.error ?? `HTTP ${response.status}`,
      response.status,
      parsed.stage ?? null,
    );
  }
  return parsed;
}

export async function generateCategoryImage(input: {
  categoryId: string;
  customPrompt?: string;
}): Promise<GeneratedAssets> {
  const payload = await post("/api/admin/categories/generate-image", {
    categoryId: input.categoryId,
    ...(input.customPrompt && input.customPrompt.trim() !== ""
      ? { customPrompt: input.customPrompt.trim() }
      : {}),
  });
  return payload as GeneratedAssets;
}

export async function suggestCategoryIcon(input: {
  name: string;
  parentName?: string | null;
}): Promise<string> {
  const payload = (await post("/api/admin/categories/suggest-icon", {
    name: input.name,
    ...(input.parentName ? { parentName: input.parentName } : {}),
  })) as { icon?: string };
  return payload.icon ?? "Package";
}

/**
 * The three asset paths are DETERMINISTIC (`<id>/card-512.png` etc. in the
 * public `category-assets` bucket), so an already-generated category renders
 * without a second read. The roster's `has_image` decides whether they exist.
 */
export function categoryAssetUrls(categoryId: string): {
  imageUrl: string;
  thumbUrl: string;
  ogUrl: string;
} {
  const base = `${import.meta.env.VITE_SUPABASE_URL ?? ""}/storage/v1/object/public/category-assets/${categoryId}`;
  return {
    imageUrl: `${base}/card-512.png`,
    thumbUrl: `${base}/thumb-128.png`,
    ogUrl: `${base}/og-1200x630.png`,
  };
}

/**
 * C5b PART B — the manual fallback picker's options.
 *
 * B1 note: `src/server/category-images/icons.ts` remains the ONLY authority —
 * it validates whatever the model or the operator proposes. That module lives
 * under `src/server/**`, which the import guards keep out of every client
 * bundle, so the picker carries this display mirror instead of importing it.
 */
export const ICON_CHOICES = [
  "Car",
  "Bike",
  "Truck",
  "Bus",
  "Plane",
  "Ship",
  "Smartphone",
  "Laptop",
  "Monitor",
  "Headphones",
  "Camera",
  "Tv",
  "Gamepad2",
  "Watch",
  "Shirt",
  "Footprints",
  "Gem",
  "Glasses",
  "Sparkles",
  "Scissors",
  "Home",
  "Building2",
  "Sofa",
  "Bed",
  "Lamp",
  "UtensilsCrossed",
  "Refrigerator",
  "WashingMachine",
  "Hammer",
  "Wrench",
  "PaintRoller",
  "Drill",
  "HardHat",
  "Briefcase",
  "GraduationCap",
  "Stethoscope",
  "Scale",
  "Calculator",
  "Music",
  "Dumbbell",
  "Trophy",
  "Tent",
  "Mountain",
  "TreePine",
  "Sprout",
  "Tractor",
  "Wheat",
  "Beef",
  "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Baby",
  "ToyBrick",
  "BookOpen",
  "Store",
  "Package",
  "Forklift",
  "Factory",
  "Wallet",
  "MapPin",
  "Heart",
  "Palette",
] as const;
