import { readFile } from "node:fs/promises";
import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { authErrorText } from "./global-setup";
import { grantRole } from "./helpers/categories";
import { passwordGrant } from "./helpers/session";
import { ensureFenceLanguage } from "./helpers/translations";
import { gotoReady, openRailScope, useJobSuperAdmin, switchUser } from "./helpers/ui";
import { adminClient, createUser, leaseUser } from "./helpers/users";
import { PSEUDO_LANG } from "../src/features/admin/translations/pseudo";
import { errorText } from "../src/lib/error-text";

// J1: each kind includes run, worker, project and test axes; no real legal document is written.
const RUN_TAG = `e2e-al-${(process.env["E2E_SHARD"] ?? "local").replace(/[^a-z0-9]/gi, "x").slice(0, 8)}-${Math.random().toString(36).slice(2, 7)}`;
const kinds = new Set<string>();
const languages = new Set<string>();
const roles = new Set<string>();
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
  test.setTimeout(60_000);
  const failures: string[] = [];
  for (const kind of [...kinds]) {
    try {
      await destroy(kind);
    } catch (error) {
      failures.push(errorText(error));
    }
  }
  for (const code of [...languages]) {
    const result = await adminClient().from("languages").delete().eq("code", code);
    if (result.error) failures.push(`language ${code}: ${result.error.message}`);
    else languages.delete(code);
  }
  for (const id of [...roles]) {
    for (const table of ["role_permissions", "user_roles", "roles"] as const) {
      const result = await adminClient()
        .from(table)
        .delete()
        .eq(table === "roles" ? "id" : "role_id", id);
      if (result.error) failures.push(`${table} ${id}: ${result.error.message}`);
    }
    if (!failures.length) roles.delete(id);
  }
  if (failures.length) throw new Error(failures.join("; "));
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
async function seedNext(
  documentId: string,
  input: {
    body_en?: string;
    body_am?: string;
    changelog?: string;
    snapshot?: Record<string, string>;
  } = {},
) {
  const result = await adminClient()
    .from("legal_versions")
    .insert({
      document_id: documentId,
      version: 2,
      status: "published",
      label: "second",
      body_en: input.body_en ?? "## First\nOriginal English",
      body_am: input.body_am ?? "Original Amharic",
      changelog: input.changelog ?? "Second change",
      material: false,
      effective_at: new Date(Date.now() - 60000).toISOString(),
      published_at: new Date(Date.now() - 60000).toISOString(),
      settings_snapshot: input.snapshot ?? { seed: "true" },
    })
    .select("id")
    .single();
  fail(result.error, "seed next version");
  if (!result.data) throw new Error("[e2e:legal-admin] next version not seeded");
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
async function accept(
  person: { email: string; password: string },
  id: string,
  options: { consent?: boolean; adult?: boolean } = {},
) {
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
    body: JSON.stringify({
      p_version_ids: [id],
      p_language: "en",
      p_adult: options.adult ?? true,
      p_data_consent: options.consent ?? false,
    }),
  });
  if (!response.ok) throw new Error(`[e2e:legal-admin] accept refused: ${await response.text()}`);
}
/** Turn 20 — a door called as this person (accept()'s fetch shape); the status and the parsed body. */
async function rpcAs(
  person: { email: string; password: string },
  fn: string,
  args: Record<string, unknown> = {},
): Promise<{ status: number; body: unknown }> {
  const session = await passwordGrant(person.email, person.password);
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("[e2e:legal-admin] missing staging config");
  const response = await fetch(`${url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  const text = await response.text();
  return { status: response.status, body: text ? (JSON.parse(text) as unknown) : null };
}
async function documentId(kind: string): Promise<string> {
  const doc = await adminClient().from("legal_documents").select("id").eq("kind", kind).single();
  fail(doc.error, "document id read");
  if (!doc.data) throw new Error("[e2e:legal-admin] missing document");
  return doc.data.id;
}
async function dueAt(id: string): Promise<string> {
  const result = await adminClient().rpc("legal_review_due", { p_document_id: id });
  fail(result.error, "review due read");
  if (typeof result.data !== "string") throw new Error("[e2e:legal-admin] no review due date");
  return result.data;
}
async function reviewRows(id: string) {
  const result = await adminClient().from("legal_reviews").select("*").eq("document_id", id);
  fail(result.error, "reviews read");
  return result.data ?? [];
}

test.describe("Admin Legal", () => {
  test("LGA-1 Legal cards, facts and the permission-gated admin menu", async ({ page }) => {
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
      "operator_details",
      "operator_address",
      "legal_email",
      "privacy_email",
      "security_email",
      "legal_phone",
      "governing_law",
      "copyright_agent",
      "liability_limit_usd",
      "notice_days",
      "response_days",
      "response_extra_days",
      "listed_ad_keep_months",
      "deleted_ad_keep_months",
      "dispute_keep_years",
      "account_keep_months",
      "technical_keep_months",
      "sold_visible_days",
      "appeal_months",
      "claims_limit_months",
      "talk_first_days",
      "complaint_ack_days",
      "review_months",
    ] as const;
    expect(keys.length, "the facts card shows the 24 facts").toBe(24);
    const row = truth as unknown as Record<string, unknown>;
    for (const key of keys) {
      const value = row[key];
      await expect(page.getByTestId(`legal-fact-${key}`)).toHaveText(
        value === "" || value === null || value === undefined ? "Not set" : String(value),
      );
    }
    await expect(page.getByTestId("legal-fact-providers")).toHaveCount(0);
    // The shared admin rail has viewport twins; inspect their href census, not a prefix .first().
    expect(await page.locator('a[href="/admin/legal"]').count()).toBeGreaterThan(0);
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    await switchUser(page, admin.email, admin.password);
    await gotoReady(page, "/admin/legal");
    await expect(page.getByTestId("admin-access-notice")).toBeVisible();
    await expect(page.locator('a[href="/admin/legal"]')).toHaveCount(0);
  });
  test("LGA-2 bilingual draft round trip, preview and first-version publishing", async ({
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
      // Publishing refuses the token that is not a fact (M3b), and the row stays a draft.
      await page.getByTestId("legal-publish").click();
      await expect(page.getByTestId("legal-publish-first-note")).toBeVisible();
      await expect(page.getByTestId("legal-publish-material")).toHaveCount(0);
      await page.getByTestId("legal-publish-confirm").click();
      await expect(page.getByTestId("legal-publish-dialog").getByRole("alert")).toHaveText(
        "The text uses nope, which is not a legal fact. Correct or remove it.",
      );
      expect((await version(kind)).status, "a refused publish leaves a draft").toBe("draft");
      await page.keyboard.press("Escape");
      await expect(page.getByTestId("legal-publish-dialog")).toHaveCount(0);
      // The English text is saved without {{nope}}; the publish then goes through.
      const fixed = "## 1. First\n\n- an item\n\n{{legal_email}}";
      await page.getByTestId("legal-mode-write").click();
      await page.getByTestId("legal-tab-en").click();
      await page.getByTestId("legal-field-body-en").fill(fixed);
      await page.getByTestId("legal-save-draft").click();
      await expect(page.getByTestId("legal-publish")).toBeEnabled();
      expect((await version(kind)).body_en).toBe(fixed);
      await page.getByTestId("legal-publish").click();
      await expect(page.getByTestId("legal-publish-first-note")).toBeVisible();
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
  test("LGA-3 material version prefill, earliest UTC date and scheduled block", async ({
    page,
  }) => {
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
  test("LGA-4 invalid facts refuse before any request; Cancel restores values", async ({
    page,
  }) => {
    await useJobSuperAdmin(page);
    const before = await facts();
    await gotoReady(page, "/admin/legal");
    await page.getByTestId("legal-facts-edit").click();
    await page.getByTestId("legal-fact-input-legal_email").fill("not-an-email");
    await page.getByTestId("legal-fact-input-notice_days").fill("400");
    await page.getByTestId("legal-fact-input-legal_phone").fill("abc");
    await page.getByTestId("legal-fact-input-listed_ad_keep_months").fill("0");
    await page.getByTestId("legal-fact-input-appeal_months").fill("0");
    await page.getByTestId("legal-fact-input-review_months").fill("25");
    await page.getByTestId("legal-facts-save").click();
    await expect(page.getByTestId("legal-fact-error-legal_email")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-notice_days")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-legal_phone")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-listed_ad_keep_months")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-appeal_months")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-review_months")).toBeVisible();
    expect((await facts()).updated_at).toBe(before.updated_at);
    await page.getByTestId("legal-facts-cancel").click();
    await expect(page.getByTestId("legal-fact-review_months")).toHaveText(
      String(before.review_months),
    );
    await expect(page.getByTestId("legal-fact-legal_email")).toHaveText(before.legal_email);
    await expect(page.getByTestId("legal-fact-notice_days")).toHaveText(String(before.notice_days));
    await page.getByTestId("legal-facts-edit").click();
    await page.getByTestId("legal-fact-input-claims_limit_months").fill("24");
    await page.getByTestId("legal-fact-input-account_keep_months").fill("12");
    await page.getByTestId("legal-facts-save").click();
    await expect(page.getByTestId("legal-fact-error-account_keep_months")).toHaveText(
      "At least the claims limit: 24 months.",
    );
    expect((await facts()).updated_at).toBe(before.updated_at);
    await page.getByTestId("legal-facts-cancel").click();
    await expect(page.getByTestId("legal-fact-account_keep_months")).toHaveText(
      String(before.account_keep_months),
    );
    await expect(page.getByTestId("legal-fact-claims_limit_months")).toHaveText(
      String(before.claims_limit_months),
    );
  });
  test("LGA-5 version view uses frozen facts, both languages and no editing actions", async ({
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
  test("LGA-6 saved draft discard returns to Legal and removes the draft", async ({ page }) => {
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
  test("LGA-7 user Legal card shows acceptance and sent notice, then both empty states", async ({
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
      await expect(
        page.getByTestId("user-legal-acceptance").getByTestId("user-legal-adult"),
      ).toHaveCount(1);
      await expect(page.getByTestId("user-legal-notice")).toHaveCount(1);
      await expect(page.getByTestId("user-legal-notice")).toContainText("Sent");
      await gotoReady(page, `/admin/users/${empty.id}`);
      await expect(page.getByTestId("user-legal-no-acceptances")).toBeVisible();
      await expect(page.getByTestId("user-legal-no-notices")).toBeVisible();
    } finally {
      await destroy(kind);
    }
  });
  test("LGA-8 the user page shows the storage consent", async ({ page }) => {
    const kind = scratch("h-privacy");
    const person = await leaseUser();
    try {
      const id = await seed(kind);
      await accept(person, id, { consent: true });
      await useJobSuperAdmin(page);
      await gotoReady(page, `/admin/users/${person.id}`);
      const acceptance = page.getByTestId("user-legal-acceptance");
      await expect(acceptance).toHaveCount(1);
      await expect(acceptance.getByTestId("user-legal-consent")).toHaveCount(1);
    } finally {
      await destroy(kind);
    }
  });
  test("LGA-9 the user Legal card: 18 or older confirmed only on the acceptance that confirmed it, each time with seconds", async ({
    page,
  }) => {
    const firstKind = scratch("i");
    const secondKind = scratch("j");
    const firstId = await seed(firstKind);
    const secondId = await seed(secondKind);
    const person = await leaseUser();
    await accept(person, firstId);
    await accept(person, secondId, { adult: false });
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/users/${person.id}`);
    const rows = page.getByTestId("user-legal-acceptance");
    await expect(rows).toHaveCount(2);
    const first = rows.filter({ hasText: firstKind });
    const second = rows.filter({ hasText: secondKind });
    await expect(first).toHaveCount(1);
    await expect(second).toHaveCount(1);
    await expect(first.getByTestId("user-legal-adult")).toHaveCount(1);
    await expect(first.getByTestId("user-legal-adult")).toHaveText("18 or older confirmed");
    await expect(second.getByTestId("user-legal-adult")).toHaveCount(0);
    await expect(first).toContainText(/\d{2}:\d{2}:\d{2}/);
  });
  test("LGA-10 every version is listed under its document, and the text in force reads in place", async ({
    page,
  }) => {
    const kind = scratch("k");
    await seed(kind);
    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/legal");
    const own = page.getByTestId(`legal-doc-${kind}-global`);
    await expect(own.getByTestId("legal-history-row")).toHaveCount(1);
    await own.getByTestId("legal-read").click();
    await expect(own.getByTestId("legal-read-text")).toContainText("Original English");
    await own.getByTestId("legal-read").click();
    await expect(own.getByTestId("legal-read-text")).toHaveCount(0);
  });
  test("LGA-11 Compare with previous marks the removed and added lines; nothing to compare on the first version", async ({
    page,
  }) => {
    const kind = scratch("l");
    const firstId = await seed(kind, {
      body_en: "## First\nOriginal English",
      body_am: "Same Amharic",
    });
    const doc = await adminClient().from("legal_documents").select("id").eq("kind", kind).single();
    fail(doc.error, "document read");
    if (!doc.data) throw new Error("[e2e:legal-admin] missing document");
    const secondId = await seedNext(doc.data.id, {
      body_en: "## First\nChanged English",
      body_am: "Same Amharic",
    });
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/${secondId}`);
    await page.getByTestId("legal-compare").click();
    await expect(page.getByTestId("legal-diff")).toBeVisible();
    await expect(page.getByTestId("legal-diff-removed")).toContainText("Original English");
    await expect(page.getByTestId("legal-diff-added")).toContainText("Changed English");
    await page.getByTestId("legal-view-tab-am").click();
    await expect(page.getByTestId("legal-diff-none")).toBeVisible();
    await gotoReady(page, `/admin/legal/${firstId}`);
    await expect(page.getByTestId("legal-compare")).toHaveCount(0);
  });
  test("LGA-12 Download saves the shown language with the frozen facts; Print is offered", async ({
    page,
  }) => {
    const kind = scratch("m");
    const id = await seed(kind, {
      body_en: "Write to {{legal_email}}",
      snapshot: { legal_email: "snapshot@example.invalid" },
    });
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/${id}`);
    const waited = page.waitForEvent("download");
    await page.getByTestId("legal-download").click();
    const download = await waited;
    expect(download.suggestedFilename()).toBe(`ethio-${kind}-all-v1-en.md`);
    const path = await download.path();
    if (!path) throw new Error("[e2e:legal-admin] download has no path");
    expect(await readFile(path, "utf8")).toBe("Write to snapshot@example.invalid");
    await expect(page.getByTestId("legal-print")).toBeVisible();
  });
  test("LGA-13 Export acceptances saves a CSV of who accepted, never a name or e-mail", async ({
    page,
  }) => {
    const kind = scratch("n");
    const id = await seed(kind);
    const first = await leaseUser();
    const second = await leaseUser();
    await accept(first, id);
    await accept(second, id);
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/${id}`);
    const waited = page.waitForEvent("download");
    await page.getByTestId("legal-export").click();
    const download = await waited;
    expect(download.suggestedFilename()).toBe(`ethio-${kind}-all-v1-acceptances.csv`);
    const path = await download.path();
    if (!path) throw new Error("[e2e:legal-admin] download has no path");
    const csv = await readFile(path, "utf8");
    expect(csv.endsWith("\r\n")).toBe(true);
    expect(csv.replace(/\r\n/g, "").includes("\n")).toBe(false);
    const lines = csv.split("\r\n").filter((line) => line !== "");
    expect(lines[0]).toBe(
      "account_id,accepted_at,language,method,home_country,adult_confirmed,data_consent",
    );
    expect(lines.length).toBe(3);
    expect(lines.some((line) => line.includes(first.id))).toBe(true);
    expect(lines.some((line) => line.includes(second.id))).toBe(true);
    expect(csv).not.toContain(first.email);
    expect(csv).not.toContain(second.email);
    await expect(page.getByTestId("legal-export-done")).toHaveText("Exported 2 acceptances.");
    const audit = await adminClient()
      .from("audit_log")
      .select("id")
      .eq("action", "legal.acceptances_exported")
      .eq("entity_id", id);
    fail(audit.error, "audit read");
    expect(audit.data?.length).toBe(1);
  });
  test("LGA-14 a draft's text is filled from a file", async ({ page }) => {
    const kind = scratch("o");
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/edit?kind=${kind}`);
    await page.getByTestId("legal-import-en").setInputFiles({
      name: "terms.md",
      mimeType: "text/markdown",
      buffer: Buffer.from("## Imported\nFrom a file"),
    });
    await expect(page.getByTestId("legal-field-body-en")).toHaveValue("## Imported\nFrom a file");
    await expect(page.getByTestId("legal-import-done")).toContainText("terms.md");
    const docs = await adminClient().from("legal_documents").select("id").eq("kind", kind);
    fail(docs.error, "unsaved document read");
    expect(docs.data).toEqual([]);
  });
  test("LGA-15 Admin › Legal counts, for a version in force, the people who signed in after it took effect without accepting it (D227)", async ({
    page,
  }) => {
    const person = await leaseUser();
    const kind = `e2e-acc-u${person.id.replace(/-/g, "")}`;
    kinds.add(kind);
    const id = await seed(kind);
    const url = process.env["E2E_SUPABASE_URL"];
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("[e2e:legal-admin] missing staging config");
    // A fresh grant, never passwordGrant's cache: last_sign_in_at must follow the seed.
    const signedIn = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ email: person.email, password: person.password }),
    });
    expect(signedIn.ok, "fresh password sign-in succeeds").toBe(true);
    const readBack = await adminClient().auth.admin.getUserById(person.id);
    fail(
      readBack.error ? { message: authErrorText(readBack.error) } : null,
      "fresh sign-in read-back",
    );
    const effective = (await version(kind)).effective_at;
    const lastSignIn = readBack.data.user?.last_sign_in_at;
    if (!effective || !lastSignIn)
      throw new Error("[e2e:legal-admin] missing effective time or last sign-in");
    expect(Date.parse(lastSignIn)).toBeGreaterThanOrEqual(Date.parse(effective));

    await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/legal");
    const inForce = page.getByTestId(`legal-doc-${kind}-global`).getByTestId("legal-in-force");
    await expect(inForce).toContainText("Accepted by 0");
    await expect(inForce.getByTestId("legal-signed-in-unaccepted")).toHaveText(
      "Signed in since it took effect, not accepted: 1",
    );

    await accept(person, id);
    await gotoReady(page, "/admin/legal");
    await expect(inForce).toContainText("Accepted by 1");
    await expect(inForce.getByTestId("legal-signed-in-unaccepted")).toHaveText(
      "Signed in since it took effect, not accepted: 0",
    );

    const kind2 = scratch("p");
    await seed(kind2);
    await gotoReady(page, "/admin/legal");
    const other = page.getByTestId(`legal-doc-${kind2}-global`).getByTestId("legal-in-force");
    await expect(other).toContainText("Accepted by 0");
    await expect(other.getByTestId("legal-signed-in-unaccepted")).toHaveCount(0);
  });
  test("LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit", async ({
    page,
  }) => {
    const kind = scratch("rev");
    await seed(kind);
    const id = await documentId(kind);
    const months = (await facts()).review_months;
    const published = (await version(kind)).published_at;
    if (!published) throw new Error("[e2e:legal-admin] seeded version has no publish time");
    const firstDue = await dueAt(id);
    const day = 86_400_000;
    expect(Date.parse(firstDue) - Date.parse(published)).toBeGreaterThanOrEqual(28 * months * day);
    expect(Date.parse(firstDue) - Date.parse(published)).toBeLessThanOrEqual(
      (31 * months + 1) * day,
    );
    const { user: staff } = await useJobSuperAdmin(page);
    await gotoReady(page, "/admin/legal");
    const block = page.getByTestId(`legal-doc-${kind}-global`).getByTestId("legal-review");
    await expect(block).toHaveAttribute("data-state", "due");
    expect(Date.parse((await block.getAttribute("data-due-at")) ?? "")).toBe(Date.parse(firstDue));
    await block.getByTestId("legal-review-mark").click();
    await page.getByTestId("legal-review-save").click();
    await expect(page.getByTestId("legal-review-error")).toBeVisible();
    expect(await reviewRows(id)).toHaveLength(0);
    await page.getByTestId("legal-review-note").fill("LGA-16 read, no change");
    await page.getByTestId("legal-review-save").click();
    await expect(page.getByTestId("legal-review-saved")).toBeVisible();
    const rows = await reviewRows(id);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.note).toBe("LGA-16 read, no change");
    expect(rows[0]?.reviewed_by).toBe(staff.id);
    const audit = await adminClient()
      .from("audit_log")
      .select("id")
      .eq("action", "legal.reviewed")
      .eq("entity_id", id);
    fail(audit.error, "audit read");
    expect(audit.data ?? []).toHaveLength(1);
    const secondDue = await dueAt(id);
    expect(Date.parse(secondDue)).toBeGreaterThan(Date.parse(firstDue));
    await expect(block).toContainText("LGA-16 read, no change");
    await expect
      .poll(async () => Date.parse((await block.getAttribute("data-due-at")) ?? ""))
      .toBe(Date.parse(secondDue));
    const person = await leaseUser();
    const refused = await rpcAs(person, "admin_mark_legal_reviewed", {
      p_document_id: id,
      p_note: "not allowed",
    });
    expect(refused.status).toBeGreaterThanOrEqual(400);
    expect(JSON.stringify(refused.body)).toContain("permission denied");
    expect(await reviewRows(id)).toHaveLength(1);
  });
  test("LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false", async ({
    page,
  }) => {
    const { user: staff } = await useJobSuperAdmin(page);
    const kind = `e2e-rev-u${staff.id.replace(/-/g, "")}`;
    await destroy(kind);
    kinds.add(kind);
    const real = await adminClient()
      .from("legal_documents")
      .select("id, kind")
      .in("kind", ["terms", "privacy", "publishing"]);
    fail(real.error, "real documents read");
    for (const doc of real.data ?? []) {
      const due = await adminClient().rpc("legal_review_due", { p_document_id: doc.id });
      fail(due.error, "real review due read");
      if (typeof due.data === "string" && Date.parse(due.data) <= Date.now())
        throw new Error(
          "[e2e:legal-admin] a real legal document is due on this backend; LGA-17 cannot judge the admin menu's mark",
        );
    }
    const doc = await adminClient()
      .from("legal_documents")
      .insert({ kind, country_code: null })
      .select("id")
      .single();
    fail(doc.error, "overdue document");
    if (!doc.data) throw new Error("[e2e:legal-admin] overdue document not seeded");
    const longAgo = new Date(Date.now() - 25 * 31 * 86_400_000).toISOString();
    fail(
      (
        await adminClient()
          .from("legal_versions")
          .insert({
            document_id: doc.data.id,
            version: 1,
            status: "published",
            label: "first",
            body_en: "## First\nOverdue English",
            body_am: "Overdue Amharic",
            changelog: "First change",
            material: false,
            effective_at: longAgo,
            published_at: longAgo,
            settings_snapshot: { seed: "true" },
          })
      ).error,
      "overdue version",
    );
    const marked = '[data-testid="rail-item-ad-legal"][data-alert="true"]';
    await gotoReady(page, "/admin/legal");
    const block = page.getByTestId(`legal-doc-${kind}-global`).getByTestId("legal-review");
    await expect(block).toHaveAttribute("data-state", "overdue");
    await expect(block.getByTestId("legal-review-overdue")).toBeVisible();
    let scope = await openRailScope(page);
    await expect.poll(() => scope.locator(marked).count()).toBeGreaterThan(0);
    const rows = scope.locator(marked);
    for (let i = 0; i < (await rows.count()); i++)
      await expect(rows.nth(i).getByTestId("rail-alert")).toHaveCount(1);
    await page.keyboard.press("Escape");
    expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(true);
    await block.getByTestId("legal-review-mark").click();
    await page.getByTestId("legal-review-note").fill("LGA-17 read, no change");
    await page.getByTestId("legal-review-save").click();
    await expect(page.getByTestId("legal-review-saved")).toBeVisible();
    await expect(block).toHaveAttribute("data-state", "due");
    scope = await openRailScope(page);
    await expect
      .poll(() => scope.locator('[data-testid="rail-item-ad-legal"]').count())
      .toBeGreaterThan(0);
    await expect(page.locator(marked)).toHaveCount(0);
    await page.keyboard.press("Escape");
    expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(false);
    const person = await leaseUser();
    expect((await rpcAs(person, "legal_review_overdue")).body).toBe(false);
  });
  test("LGA-18 INC-812: the account of someone who published a legal version can be deleted; the version keeps its text and loses only the name", async () => {
    const person = await createUser({ confirmed: true });
    const kind = scratch("del");
    const client = adminClient();
    const doc = await client
      .from("legal_documents")
      .insert({ kind, country_code: null })
      .select("id")
      .single();
    fail(doc.error, "publisher document");
    if (!doc.data) throw new Error("[e2e:legal-admin] publisher document not seeded");
    const at = new Date(Date.now() - 60000).toISOString();
    const inserted = await client
      .from("legal_versions")
      .insert({
        document_id: doc.data.id,
        version: 1,
        status: "published",
        label: "first",
        body_en: "LGA-18 English",
        body_am: "LGA-18 Amharic",
        changelog: "First change",
        material: false,
        effective_at: at,
        published_at: at,
        published_by: person.id,
        created_by: person.id,
        settings_snapshot: { seed: "true" },
      })
      .select("id")
      .single();
    fail(inserted.error, "publisher version");
    if (!inserted.data) throw new Error("[e2e:legal-admin] publisher version not seeded");
    const deleted = await client.auth.admin.deleteUser(person.id);
    if (deleted.error)
      throw new Error(`[e2e:legal-admin] deleteUser: ${authErrorText(deleted.error)}`);
    const after = await client
      .from("legal_versions")
      .select("published_by, created_by, status, body_en")
      .eq("id", inserted.data.id)
      .single();
    fail(after.error, "publisher version read-back");
    expect(after.data).toEqual({
      published_by: null,
      created_by: null,
      status: "published",
      body_en: "LGA-18 English",
    });
  });
  test("LGA-19 extra-language draft round trip and unknownFact publish refusal", async ({
    page,
  }) => {
    const kind = scratch("texts");
    const code = `${kind}-lang`;
    languages.add(code); // Register before the first write: afterEach also runs on timeout.
    await ensureFenceLanguage(code);
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/edit?kind=${kind}`);
    await fillDraft(page, "translated", "Scratch English", "Scratch Amharic", "Scratch change");
    await page.getByTestId(`legal-tab-${code}`).click();
    const body = "Fence text {{nope}}";
    await page.getByTestId(`legal-field-body-${code}`).fill(body);
    await page.getByTestId("legal-save-draft").click();
    await expect(page.getByTestId("legal-publish")).toBeEnabled();
    const saved = await version(kind);
    const texts = await adminClient()
      .from("legal_version_texts")
      .select("language, body")
      .eq("version_id", saved.id);
    fail(texts.error, "draft texts read");
    expect(texts.data).toEqual([{ language: code, body }]);
    await page.getByTestId("legal-publish").click();
    const response = page.waitForResponse(
      (r) =>
        r.url().endsWith("/rpc/admin_publish_legal_version") && r.request().method() === "POST",
    );
    await page.getByTestId("legal-publish-confirm").click();
    expect(await (await response).text()).toContain("unknownFact");
    await expect(page.getByTestId("legal-publish-dialog").getByRole("alert")).toHaveText(
      "The text uses nope, which is not a legal fact. Correct or remove it.",
    );
    expect((await version(kind)).status).toBe("draft");
    await gotoReady(page, `/admin/legal/${saved.id}`);
    await page.getByTestId(`legal-view-tab-${code}`).click();
    await expect(page.getByTestId("legal-text")).toContainText("Fence text");
    // A corrected third-language draft follows the same save and publish path successfully.
    await page.getByTestId("legal-edit-draft").click();
    await page.getByTestId(`legal-tab-${code}`).click();
    await page.getByTestId(`legal-field-body-${code}`).fill("Corrected fence text");
    await page.getByTestId("legal-save-draft").click();
    await expect(page.getByTestId("legal-publish")).toBeEnabled();
    await page.getByTestId("legal-publish").click();
    await page.getByTestId("legal-publish-confirm").click();
    await expect(page.getByTestId("legal-page")).toBeVisible();
    expect((await version(kind)).status).toBe("published");
    await gotoReady(page, `/admin/legal/${saved.id}`);
    await page.getByTestId(`legal-view-tab-${code}`).click();
    await expect(page.getByTestId("legal-text")).toHaveText("Corrected fence text");
  });

  test("LGA-20 published translation saves once; a stale second panel shows translationExists", async ({
    page,
    context,
  }) => {
    const kind = scratch("add-text");
    const code = `${kind}-lang`;
    languages.add(code);
    await ensureFenceLanguage(code);
    const id = await seed(kind);
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/legal/${id}`);
    // Both panels predate the insert: the normal refreshed select excludes existing texts.
    const stale = await context.newPage();
    await gotoReady(stale, `/admin/legal/${id}`);
    for (const reader of [page, stale]) {
      await reader.getByTestId("legal-translation-add").click();
      await expect(reader.getByTestId("legal-translation-panel")).toBeVisible();
      await reader.getByTestId("legal-translation-language").selectOption(code);
      await reader.getByTestId("legal-translation-body").fill("Published fence text");
    }
    await page.getByTestId("legal-translation-save").click();
    await expect(page.getByRole("status").filter({ hasText: "Translation added." })).toBeVisible();
    await page.getByTestId(`legal-view-tab-${code}`).click();
    await expect(page.getByTestId("legal-text")).toHaveText("Published fence text");
    const response = stale.waitForResponse(
      (r) =>
        r.url().endsWith("/rpc/admin_add_legal_translation") && r.request().method() === "POST",
    );
    await stale.getByTestId("legal-translation-save").click();
    expect(await (await response).text()).toContain("translationExists");
    await expect(stale.getByTestId("legal-translation-panel").getByRole("alert")).toHaveText(
      "This version already has a text in that language.",
    );
    const texts = await adminClient()
      .from("legal_version_texts")
      .select("language, body")
      .eq("version_id", id);
    fail(texts.error, "published texts read");
    expect(texts.data).toEqual([{ language: code, body: "Published fence text" }]);
    await stale.close();
  });

  /** Turn 32 F5 (INC-825) — the in-force card's actions follow legal:publish. */
  test("LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish", async ({
    page,
  }) => {
    const kind = scratch("card");
    const code = `${kind}-lang`;
    languages.add(code);
    await ensureFenceLanguage(code);
    await seed(kind);
    const versionId = (await version(kind)).id;
    const supabase = adminClient();
    const { data: perms, error: permsError } = await supabase
      .from("permissions")
      .select("id, action, resources!inner(name)")
      .in("resources.name", ["admin_panel", "legal"]);
    fail(permsError, "permissions read");
    const picked = (names: string[]) =>
      (perms ?? []).filter((p) =>
        names.includes(
          `${(p as unknown as { resources: { name: string } }).resources.name}:${p.action}`,
        ),
      );
    const makeRole = async (tag: string, names: string[]) => {
      const roleName = `${RUN_TAG}-role-${tag}`;
      const { data: role, error: roleError } = await supabase
        .from("roles")
        .insert({ name: roleName, display_name: roleName, priority: 1 })
        .select("id")
        .single();
      if (roleError || !role)
        throw new Error(`[e2e:legal-admin] scratch role: ${roleError?.message}`);
      roles.add(role.id);
      const rows = picked(names);
      expect(rows.length, `LGA-21 expected ${names.join(" + ")}`).toBe(names.length);
      const granted = await supabase
        .from("role_permissions")
        .insert(rows.map((p) => ({ role_id: role.id, permission_id: p.id })));
      fail(granted.error, "role permissions grant");
      return role.id;
    };
    const publisherRole = await makeRole("pub", [
      "admin_panel:access",
      "legal:view",
      "legal:publish",
    ]);
    const viewerRole = await makeRole("view", ["admin_panel:access", "legal:view"]);
    const publisher = await leaseUser();
    const viewer = await leaseUser();
    try {
      fail(
        (
          await supabase
            .from("user_roles")
            .insert({ user_id: publisher.id, role_id: publisherRole, scope_type: "global" })
        ).error,
        "publisher role grant",
      );
      fail(
        (
          await supabase
            .from("user_roles")
            .insert({ user_id: viewer.id, role_id: viewerRole, scope_type: "global" })
        ).error,
        "viewer role grant",
      );
      await useJobSuperAdmin(page);
      await switchUser(page, publisher.email, publisher.password);
      await gotoReady(page, "/admin/legal");
      const card = page.getByTestId(`legal-doc-${kind}-global`);
      await expect(card.getByTestId("legal-view-inforce")).toBeVisible();
      const languageRow = await supabase
        .from("languages")
        .select("name_en")
        .eq("code", code)
        .single();
      fail(languageRow.error, "scratch language name");
      if (!languageRow.data) throw new Error("[e2e:legal-admin] scratch language missing");
      await expect(card.getByTestId("legal-translate-inforce")).toContainText(
        languageRow.data.name_en,
      );
      await card.getByTestId("legal-translate-inforce").click();
      await expect(page).toHaveURL(new RegExp(`/admin/legal/${versionId}\\?translate=`));
      await expect(page.getByTestId("legal-translation-panel")).toBeInViewport();
      await expect(page.getByTestId("legal-translation-language")).toBeFocused();
      await expect(
        page.getByTestId("legal-translation-language").locator(`option[value="${code}"]`),
      ).toHaveText(languageRow.data.name_en);
      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/legal");
      const viewerCard = page.getByTestId(`legal-doc-${kind}-global`);
      await expect(viewerCard.getByTestId("legal-view-inforce")).toBeVisible();
      await expect(viewerCard.getByTestId("legal-translate-inforce")).toHaveCount(0);
      // Only this test's version is written: cover every enabled language, never alter a real text.
      const enabled = await supabase.from("languages").select("code").eq("enabled_admin", true);
      fail(enabled.error, "enabled languages");
      const extra = (enabled.data ?? []).filter((l) => !["en", "am", PSEUDO_LANG].includes(l.code));
      fail(
        (
          await supabase.from("legal_version_texts").insert(
            extra.map((l) => ({
              version_id: versionId,
              language: l.code,
              body: "Scratch translated statement",
            })),
          )
        ).error,
        "scratch version translations",
      );
      await switchUser(page, publisher.email, publisher.password);
      await gotoReady(page, "/admin/legal");
      const translatedCard = page.getByTestId(`legal-doc-${kind}-global`);
      await expect(translatedCard.getByTestId("legal-view-inforce")).toBeVisible();
      await expect(translatedCard.getByTestId("legal-translate-inforce")).toHaveCount(0);
    } finally {
      for (const roleId of [publisherRole, viewerRole]) {
        fail(
          (await supabase.from("role_permissions").delete().eq("role_id", roleId)).error,
          "cleanup role permissions",
        );
        fail(
          (await supabase.from("user_roles").delete().eq("role_id", roleId)).error,
          "cleanup user roles",
        );
        fail((await supabase.from("roles").delete().eq("id", roleId)).error, "cleanup role");
        roles.delete(roleId);
      }
    }
  });
});
