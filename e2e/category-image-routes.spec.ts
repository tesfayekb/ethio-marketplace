import { createClient } from "@supabase/supabase-js";
import { expect, test } from "./fixtures";

import { adminClient, createUser } from "./helpers/users";

/**
 * C5a PART E — the AI foundation routes, proved in FAKE MODE (GEMINI_FAKE=1);
 * CI never holds a provider key and never spends a credit.
 *
 * J-LAWS: every fixture is namespaced run x worker (J1); the scratch category
 * and every bucket object it creates are deleted in `finally` (J3); DB truth is
 * read back with the service client, never inferred from the UI (J4); the spec
 * seeds before it calls (J7). These are HTTP-surface tests: they use the
 * Playwright `request` context with a real bearer token, so no viewport twin,
 * no locator, and no page is involved.
 */

const RUN = process.env["E2E_SHARD"] ?? "local";
const GENERATE = "/api/admin/categories/generate-image";
const SUGGEST = "/api/admin/categories/suggest-icon";

function scratchSlug() {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  const rand = Math.random().toString(36).slice(2, 8);
  return `e2e-cat-${RUN}-${worker}-${rand}`.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

function anonClient() {
  const url = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const key =
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (url === "" || key === "") throw new Error("[e2e:c5a] supabase env missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role, error: roleError } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .maybeSingle();
  if (roleError || !role) {
    throw new Error(`[e2e:c5a] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
  }
  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id, scope_type: "global" });
  if (error) throw new Error(`[e2e:c5a] granting ${roleName} failed: ${error.message}`);
}

/** A signed-in bearer token for a principal holding `categories:assets`. */
async function assetsToken(): Promise<string> {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");
  const { data, error } = await anonClient().auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  const token = data.session?.access_token;
  if (error || !token) {
    throw new Error(`[e2e:c5a] sign-in failed: ${error?.message ?? "no session"}`);
  }
  return token;
}

/** Seeds a scratch leaf category (J7 — before any call). */
async function seedCategory(): Promise<{ id: string; slug: string }> {
  const slug = scratchSlug();
  const supabase = adminClient();
  const { data, error } = await supabase
    .from("categories")
    .insert({
      slug,
      name_en: "E2E Scratch Basket",
      allow_listings: true,
      is_active: true,
      // Publicly invisible by the visibility law; the admin surface is unaffected.
      visible_until: new Date(0).toISOString(),
    })
    .select("id, slug")
    .single();
  if (error || !data) throw new Error(`[e2e:c5a] seeding category failed: ${error?.message}`);
  return { id: data.id, slug: data.slug };
}

async function cleanup(categoryId: string) {
  const supabase = adminClient();
  // C5e PART B — object names are VERSIONED (`card-<genTs>.png`), so cleanup
  // lists the prefix instead of guessing three fixed names.
  const { data: objects } = await supabase.storage.from("category-assets").list(categoryId);
  const paths = (objects ?? []).map((entry) => `${categoryId}/${entry.name}`);
  if (paths.length > 0) await supabase.storage.from("category-assets").remove(paths);
  await supabase.from("categories").delete().eq("id", categoryId);
}

test.describe("C5a — category AI foundation routes", () => {
  test("CI-1 unauthenticated callers are refused by both routes", async ({ request }) => {
    const gen = await request.post(GENERATE, { data: { categoryId: crypto.randomUUID() } });
    expect([401, 403]).toContain(gen.status());

    const suggest = await request.post(SUGGEST, { data: { name: "Cars" } });
    expect([401, 403]).toContain(suggest.status());
  });

  test("CI-2 fake generate produces three assets and updates the row", async ({ request }) => {
    const token = await assetsToken();
    const category = await seedCategory();
    try {
      const response = await request.post(GENERATE, {
        headers: { Authorization: `Bearer ${token}` },
        data: { categoryId: category.id },
      });
      expect(response.status(), await response.text()).toBe(200);
      const body = (await response.json()) as {
        stage: string;
        imageUrl: string;
        thumbUrl: string;
        ogUrl: string;
        prompt: string;
        timings: { genMs: number; processMs: number; totalMs: number };
      };

      expect(body.stage).toBe("done");
      // C5e PART B — VERSIONED object names: `<id>/card-<genTs>.png`.
      expect(body.imageUrl).toMatch(new RegExp(`category-assets/${category.id}/card-\\d+\\.png$`));
      expect(body.thumbUrl).toMatch(new RegExp(`category-assets/${category.id}/thumb-\\d+\\.png$`));
      expect(body.ogUrl).toMatch(new RegExp(`category-assets/${category.id}/og-\\d+\\.png$`));
      expect(body.prompt).toContain("#1E5A43");
      // C5e PART A — the pipeline demonstrably processed, fake mode included.
      expect(body.timings.processMs).toBeGreaterThan(0);

      // DB TRUTH (J4) — read the row back with the service client.
      const { data: row, error } = await adminClient()
        .from("categories")
        .select("image_url, image_thumb_url, og_image_url, image_generation_prompt")
        .eq("id", category.id)
        .single();
      expect(error).toBeNull();
      expect(row?.image_url).toBe(body.imageUrl);
      expect(row?.image_thumb_url).toBe(body.thumbUrl);
      expect(row?.og_image_url).toBe(body.ogUrl);
      // C5e PART C — the uniform house prompt is CODE truth: the column is NULL.
      expect(row?.image_generation_prompt).toBeNull();
    } finally {
      await cleanup(category.id);
    }
  });

  test("CI-2b unknown categoryId is an honest 404, never a 502", async ({ request }) => {
    const token = await assetsToken();
    const response = await request.post(GENERATE, {
      headers: { Authorization: `Bearer ${token}` },
      data: { categoryId: crypto.randomUUID() },
    });
    expect(response.status(), await response.text()).toBe(404);
    expect((await response.json()) as { error: string }).toEqual({ error: "category not found" });
  });

  test("CI-3 suggest-icon returns an allowlisted value", async ({ request }) => {
    const token = await assetsToken();
    const response = await request.post(SUGGEST, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "Sedans", parentName: "Cars" },
    });
    expect(response.status(), await response.text()).toBe(200);
    const body = (await response.json()) as { icon: string };
    const { ICON_ALLOWLIST } = await import("../src/server/category-images/icons");
    expect(ICON_ALLOWLIST as readonly string[]).toContain(body.icon);
  });
});
