import { createClient } from "@supabase/supabase-js";
import { expect, test } from "./fixtures";

import type { Database } from "../src/integrations/supabase/types";

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

/** A caller-context client carrying a real bearer token (RLS + gates apply). */
function callerClient(token: string) {
  const url = process.env["VITE_SUPABASE_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const key =
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
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

  test("CI-2 fake generate returns a PNG payload and writes no storage object", async ({
    request,
  }) => {
    const token = await assetsToken();
    const category = await seedCategory();
    try {
      const response = await request.post(GENERATE, {
        headers: { Authorization: `Bearer ${token}` },
        data: { categoryId: category.id },
      });
      expect(response.status(), await response.text()).toBe(200);
      expect(response.headers()["cache-control"]).toBe("no-store");
      const body = (await response.json()) as {
        stage: string;
        prompt: string;
        genMs: number;
        image: string;
      };
      expect(body.stage).toBe("generated");
      expect(body.prompt).toContain("#1E5A43");
      expect(typeof body.genMs).toBe("number");
      // DEC-082 — the payload is a real PNG (signature 89 50 4E 47 0D 0A 1A 0A).
      const bytes = Buffer.from(body.image, "base64");
      expect([...bytes.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

      // DB/STORAGE TRUTH (J4) — the route wrote nothing: no object, no row change.
      const { data: objects } = await adminClient()
        .storage.from("category-assets")
        .list(category.id);
      expect(objects ?? []).toHaveLength(0);
      const { data: row } = await adminClient()
        .from("categories")
        .select("image_url, image_thumb_url, og_image_url")
        .eq("id", category.id)
        .single();
      expect(row).toEqual({ image_url: null, image_thumb_url: null, og_image_url: null });
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

  /**
   * C5h PART D — STORED TRUTH re-anchor. The UI CI-4 (admin-categories.spec.ts)
   * proves the dialog; this HTTP-surface twin proves the contract underneath it:
   * generate -> accept -> the gated reader answers the stored URLs AND the
   * acceptance stamp, which is what a REOPENED dialog renders.
   */
  test("CI-4b stored truth: generate, accept, and the reader returns assets + stamp", async ({
    request,
  }) => {
    const token = await assetsToken();
    const category = await seedCategory();
    try {
      const gen = await request.post(GENERATE, {
        headers: { Authorization: `Bearer ${token}` },
        data: { categoryId: category.id },
      });
      expect(gen.status(), await gen.text()).toBe(200);
      const png = Buffer.from(((await gen.json()) as { image: string }).image, "base64");

      // DEC-082 — the SERVICE path, run as the admin (no service role): three
      // versioned uploads under the admin's session, then the gated persist.
      const caller = callerClient(token);
      const ts = Date.now();
      const storage = caller.storage.from("category-assets");
      const urls: string[] = [];
      for (const part of ["card", "thumb", "og"]) {
        const path = `${category.id}/${part}-${ts}.png`;
        const { error: upError } = await storage.upload(path, png, {
          contentType: "image/png",
          upsert: true,
        });
        expect(upError, JSON.stringify(upError)).toBeNull();
        urls.push(storage.getPublicUrl(path).data.publicUrl);
      }
      const assets = { imageUrl: urls[0]!, thumbUrl: urls[1]!, ogUrl: urls[2]! };
      const { error: setError } = await caller.rpc("admin_set_category_images", {
        p_id: category.id,
        p_image_url: assets.imageUrl,
        p_image_thumb_url: assets.thumbUrl,
        p_og_image_url: assets.ogUrl,
        p_generation_prompt: null as unknown as string,
      });
      expect(setError, JSON.stringify(setError)).toBeNull();
      const { data: objects } = await adminClient()
        .storage.from("category-assets")
        .list(category.id);
      expect((objects ?? []).map((o) => o.name).sort()).toEqual([
        `card-${ts}.png`,
        `og-${ts}.png`,
        `thumb-${ts}.png`,
      ]);

      const { data: accepted, error: acceptError } = await caller.rpc(
        "admin_accept_category_image",
        { p_id: category.id },
      );
      expect(acceptError, JSON.stringify(acceptError)).toBeNull();
      expect(accepted).not.toBeNull();

      // The reader is the dialog's source on reopen.
      const { data: rows, error: readError } = await caller.rpc("admin_get_category_images", {
        p_id: category.id,
      });
      expect(readError, JSON.stringify(readError)).toBeNull();
      const row = (rows ?? [])[0];
      expect(row?.image_url).toBe(assets.imageUrl);
      expect(row?.image_thumb_url).toBe(assets.thumbUrl);
      expect(row?.og_image_url).toBe(assets.ogUrl);
      expect(row?.image_accepted_at).toBe(accepted);

      // DB TRUTH (J4) — the service client agrees with the gated reader.
      const { data: truth } = await adminClient()
        .from("categories")
        .select("image_accepted_at")
        .eq("id", category.id)
        .single();
      expect(truth?.image_accepted_at).toBe(accepted);
    } finally {
      await cleanup(category.id);
    }
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
