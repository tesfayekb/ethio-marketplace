import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { grantRole } from "./helpers/categories";
import { passwordGrant } from "./helpers/session";
import { gotoReady, useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser, switchUser } from "./helpers/users";

// J1: each kind includes run, worker, project and test axes; no real legal document is written.
const RUN_TAG = `e2e-al-${(process.env["E2E_SHARD"] ?? "local").replace(/[^a-z0-9]/gi, "x").slice(0, 8)}-${Math.random().toString(36).slice(2, 7)}`;
const kinds = new Set<string>();
function scratch(tag: string) {
  const info = test.info();
  const project = info.project.name.startsWith("mobile") ? "m" : "d";
  const kind = `${RUN_TAG}-${info.workerIndex}-${project}-${tag}`;
  kinds.add(kind);
  return kind;
}
function fail(error: { message: string } | null, phase: string) {
  if (error) throw new Error(`[e2e:legal-admin] ${phase}: ${error.message}`);
}
async function facts() {
  const result = await adminClient().from("legal_settings").select("*").eq("id", true).single();
  fail(result.error, "facts read");
  if (!result.data) throw new Error("[e2e:legal-admin] no facts");
  return result.data;
}
async function destroy(kind: string) {
  const client = adminClient();
  const docs = await client.from("legal_documents").select("id").eq("kind", kind);
  fail(docs.error, "cleanup documents read");
  for (const doc of docs.data ?? []) {
    const versions = await client.from("legal_versions").select("id").eq("document_id", doc.id);
    fail(versions.error, "cleanup versions read");
    const ids = (versions.data ?? []).map((v) => v.id);
    if (ids.length) {
      fail(
        (await client.from("legal_acceptances").delete().in("version_id", ids)).error,
        "cleanup acceptances",
      );
      fail(
        (await client.from("legal_notices").delete().in("version_id", ids)).error,
        "cleanup notices",
      );
      fail((await client.from("legal_versions").delete().in("id", ids)).error, "cleanup versions");
    }
    fail(
      (await client.from("legal_documents").delete().eq("id", doc.id)).error,
      "cleanup document",
    );
  }
  kinds.delete(kind);
}
test.afterEach(async () => {
  for (const kind of [...kinds]) await destroy(kind);
});
async function version(kind: string) {
  const doc = await adminClient().from("legal_documents").select("id").eq("kind", kind).single();
  fail(doc.error, "document read");
  if (!doc.data) throw new Error("[e2e:legal-admin] missing document");
  const row = await adminClient()
    .from("legal_versions")
    .select("*")
    .eq("document_id", doc.data.id)
    .order("version", { ascending: false })
    .limit(1)
    .single();
  fail(row.error, "version read");
  if (!row.data) throw new Error("[e2e:legal-admin] missing version");
  return row.data;
}
async function seed(
  kind: string,
  input: {
    body_en?: string;
    body_am?: string;
    changelog?: string;
    snapshot?: Record<string, string>;
  } = {},
) {
  const client = adminClient();
  const doc = await client
    .from("legal_documents")
    .insert({ kind, country_code: null })
    .select("id")
    .single();
  fail(doc.error, "seed document");
  if (!doc.data) throw new Error("[e2e:legal-admin] document not seeded");
  const result = await client
    .from("legal_versions")
    .insert({
      document_id: doc.data.id,
      version: 1,
      status: "published",
      label: "first",
      body_en: input.body_en ?? "## First\nOriginal English",
      body_am: input.body_am ?? "Original Amharic",
      changelog: input.changelog ?? "First change",
      material: false,
      effective_at: new Date(Date.now() - 60000).toISOString(),
      published_at: new Date(Date.now() - 60000).toISOString(),
      settings_snapshot: input.snapshot ?? { seed: "true" },
    })
    .select("id")
    .single();
  fail(result.error, "seed version");
  if (!result.data) throw new Error("[e2e:legal-admin] version not seeded");
  return result.data.id;
}
async function fillDraft(page: Page, label: string, en: string, am: string, changelog: string) {
  await expect(page.getByTestId("legal-editor")).toBeVisible();
  await page.getByTestId("legal-field-label").fill(label);
  await page.getByTestId("legal-field-body-en").fill(en);
  await page.getByTestId("legal-tab-am").click();
  await page.getByTestId("legal-field-body-am").fill(am);
  await page.getByTestId("legal-field-changelog").fill(changelog);
  await page.getByTestId("legal-save-draft").click();
  await expect(page.getByTestId("legal-publish")).toBeEnabled();
}
async function accept(person: { email: string; password: string }, id: string) {
  const session = await passwordGrant(person.email, person.password);
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("[e2e:legal-admin] missing staging config");
  const response = await fetch(`${url}/rest/v1/rpc/accept_legal`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_version_ids: [id], p_language: "en", p_adult: true }),
  });
  if (!response.ok) throw new Error(`[e2e:legal-admin] accept refused: ${await response.text()}`);
}

test.describe("Admin Legal", () => {
  test("AL-1 Legal cards, facts and the permission-gated admin menu", async ({ page }) => {
    await useJobSuperAdmin(page);
    const truth = await facts();
    await gotoReady(page, "/admin/legal");
    await expect(page.getByTestId("legal-page")).toBeVisible();
    const realCards = page.locator(
      '[data-testid="legal-kind-terms"], [data-testid="legal-kind-privacy"], [data-testid="legal-kind-publishing"]',
    );
    await expect(realCards).toHaveCount(3);
    expect(
      await realCards.evaluateAll((cards) => cards.map((card) => card.getAttribute("data-testid"))),
    ).toEqual(["legal-kind-terms", "legal-kind-privacy", "legal-kind-publishing"]);
    const keys = [
      "operator_name",
      "operator_address",
      "legal_email",
      "privacy_email",
      "governing_law",
      "providers",
      "copyright_agent",
      "liability_limit_usd",
      "notice_days",
      "response_days",
      "response_extra_days",
      "deleted_ad_keep_months",
      "dispute_keep_years",
    ] as const;
    for (const key of keys) {
      const value = truth[key];
      await expect(page.getByTestId(`legal-fact-${key}`)).toHaveText(
        value === "" || value === null ? "Not set" : String(value),
      );
    }
    // The shared admin rail has viewport twins; inspect their href census, not a prefix .first().
    expect(await page.locator('a[href="/admin/legal"]').count()).toBeGreaterThan(0);
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/legal");
    await expect(page.getByTestId("admin-access-denied")).toBeVisible();
    await expect(page.locator('a[href="/admin/legal"]')).toHaveCount(0);
  });
  test("AL-2 bilingual draft round trip, preview and first-version publishing", async ({
    page,
  }) => {
    const kind = scratch("b");
    try {
      const job = await useJobSuperAdmin(page);
      const settings = await facts();
      await gotoReady(page, `/admin/legal/edit?kind=${kind}`);
      const en = "## 1. First\n\n- an item\n\n{{legal_email}} {{nope}}";
      const am = "Amharic scratch text";
      const change = "First scratch change";
      await fillDraft(page, "first", en, am, change);
      const saved = await version(kind);
      expect(saved.status).toBe("draft");
      expect(saved.label).toBe("first");
      expect(saved.body_en).toBe(en);
      expect(saved.body_am).toBe(am);
      expect(saved.changelog).toBe(change);
      await page.getByTestId("legal-tab-en").click();
      await page.getByTestId("legal-mode-preview").click();
      await expect(
        page.getByTestId("legal-preview").getByRole("heading", { name: "1. First" }),
      ).toBeVisible();
      await expect(page.getByTestId("legal-preview")).toContainText(settings.legal_email);
      await expect(page.getByTestId("legal-unknown-tokens")).toContainText("nope");
      await page.getByTestId("legal-publish").click();
      await expect(page.getByTestId("legal-publish-first-note")).toBeVisible();
      await expect(page.getByTestId("legal-publish-material")).toHaveCount(0);
      await page.getByTestId("legal-publish-confirm").click();
      await expect(page.getByTestId("legal-page")).toBeVisible();
      const published = await version(kind);
      expect(published.status).toBe("published");
      expect(published.material).toBe(false);
      expect(Math.abs(new Date(published.effective_at ?? "").getTime() - Date.now())).toBeLessThan(
        120000,
      );
      const own = page.getByTestId(`legal-doc-${kind}-global`);
      await expect(own).toBeVisible();
      await expect(own.getByTestId("legal-in-force")).toContainText("In force");
      await expect(own).toContainText("Accepted by 0");
      const profile = await adminClient()
        .from("profiles")
        .select("display_name")
        .eq("user_id", job.user.id)
        .single();
      fail(profile.error, "publisher read");
      await expect(own).toContainText(profile.data?.display_name ?? "");
    } finally {
      await destroy(kind);
    }
  });
  test("AL-3 material version prefill, earliest UTC date and scheduled block", async ({ page }) => {
    const kind = scratch("c");
    try {
      await seed(kind);
      await useJobSuperAdmin(page);
      const settings = await facts();
      await gotoReady(page, "/admin/legal");
      const own = page.getByTestId(`legal-doc-${kind}-global`);
      await expect(own).toBeVisible();
      await own.getByTestId("legal-new-version").click();
      await expect(page.getByTestId("legal-field-body-en")).toHaveValue(
        "## First\nOriginal English",
      );
      await expect(page.getByTestId("legal-prefilled-note")).toContainText("version 1");
      await fillDraft(
        page,
        "second",
        "Second English",
        "Second Amharic",
        "Material scratch change",
      );
      await page.getByTestId("legal-publish").click();
      await expect(page.getByTestId("legal-publish-confirm")).toBeDisabled();
      await page.getByTestId("legal-publish-material").check();
      const earliest = new Date(Date.now() + settings.notice_days * 86400000)
        .toISOString()
        .slice(0, 10);
      await expect(page.getByTestId("legal-publish-date")).toHaveAttribute("min", earliest);
      await expect(page.getByTestId("legal-publish-date")).toHaveValue(earliest);
      await page.getByTestId("legal-publish-confirm").click();
      await expect(page.getByTestId("legal-page")).toBeVisible();
      const row = await version(kind);
      expect(row.status).toBe("published");
      expect(row.material).toBe(true);
      expect(
        Math.abs(
          new Date(row.effective_at ?? "").getTime() -
            new Date(row.published_at ?? "").getTime() -
            settings.notice_days * 86400000,
        ),
      ).toBeLessThan(120000);
      await expect(own.getByTestId("legal-in-force")).toContainText("Version 1");
      await expect(own.getByTestId("legal-scheduled")).toContainText("Takes effect");
    } finally {
      await destroy(kind);
    }
  });
  test("AL-4 invalid facts refuse before any request; Cancel restores values", async ({ page }) => {
    await useJobSuperAdmin(page);
    const before = await facts();
    await gotoReady(page, "/admin/legal");
    await page.getByTestId("legal-facts-edit").click();
    await page.getByTestId("legal-fact-input-legal_email").fill("not-an-email");
    await page.getByTestId("legal-fact-input-notice_days").fill("400");
    await page.getByTestId("legal-facts-save").click();
    await expect(page.getByTestId("legal-fact-error-legal_email")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-notice_days")).toBeVisible();
    expect((await facts()).updated_at).toBe(before.updated_at);
    await page.getByTestId("legal-facts-cancel").click();
    await expect(page.getByTestId("legal-fact-legal_email")).toHaveText(before.legal_email);
    await expect(page.getByTestId("legal-fact-notice_days")).toHaveText(String(before.notice_days));
  });
  test("AL-5 version view uses frozen facts, both languages and no editing actions", async ({
    page,
  }) => {
    const kind = scratch("e");
    try {
      const id = await seed(kind, {
        body_en: "## First\n{{legal_email}}",
        body_am: "Amharic view body",
        changelog: "Frozen scratch change",
        snapshot: { legal_email: "snapshot@example.invalid" },
      });
      await useJobSuperAdmin(page);
      await gotoReady(page, `/admin/legal/${id}`);
      await expect(page.getByTestId("legal-view-changelog")).toHaveText("Frozen scratch change");
      await expect(page.getByTestId("legal-text")).toContainText("snapshot@example.invalid");
      await page.getByTestId("legal-view-tab-am").click();
      await expect(page.getByTestId("legal-text")).toHaveText("Amharic view body");
      await expect(page.getByTestId("legal-edit-draft")).toHaveCount(0);
      await expect(page.getByTestId("legal-discard-draft")).toHaveCount(0);
    } finally {
      await destroy(kind);
    }
  });
  test("AL-6 saved draft discard returns to Legal and removes the draft", async ({ page }) => {
    const kind = scratch("f");
    try {
      await useJobSuperAdmin(page);
      await gotoReady(page, `/admin/legal/edit?kind=${kind}`);
      await fillDraft(page, "discard", "Scratch English", "Scratch Amharic", "Discard change");
      const saved = await version(kind);
      await page.getByTestId("legal-discard-draft").click();
      await page.getByTestId("legal-discard-confirm").click();
      await expect(page.getByTestId("legal-page")).toBeVisible();
      const remaining = await adminClient()
        .from("legal_versions")
        .select("id")
        .eq("document_id", saved.document_id)
        .eq("status", "draft");
      fail(remaining.error, "discard read-back");
      expect(remaining.data).toEqual([]);
    } finally {
      await destroy(kind);
    }
  });
  test("AL-7 user Legal card shows acceptance and sent notice, then both empty states", async ({
    page,
  }) => {
    const kind = scratch("g");
    const person = await leaseUser();
    const empty = await leaseUser();
    try {
      const id = await seed(kind);
      await accept(person, id);
      const notice = await adminClient().rpc("record_legal_notice", {
        p_user_id: person.id,
        p_version_id: id,
        p_channel: "email",
        p_status: "sent",
        p_provider_ref: `${kind}-notice`,
      });
      fail(notice.error, "record notice");
      await useJobSuperAdmin(page);
      await gotoReady(page, `/admin/users/${person.id}`);
      await expect(page.getByTestId("user-legal-acceptance")).toHaveCount(1);
      await expect(page.getByTestId("user-legal-acceptance")).toContainText(kind);
      await expect(page.getByTestId("user-legal-acceptance")).toContainText("first");
      await expect(page.getByTestId("user-legal-notice")).toHaveCount(1);
      await expect(page.getByTestId("user-legal-notice")).toContainText("Sent");
      await gotoReady(page, `/admin/users/${empty.id}`);
      await expect(page.getByTestId("user-legal-no-acceptances")).toBeVisible();
      await expect(page.getByTestId("user-legal-no-notices")).toBeVisible();
    } finally {
      await destroy(kind);
    }
  });
});
