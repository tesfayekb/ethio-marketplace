import { readFile } from "node:fs/promises";
import { type Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { authErrorText } from "./global-setup";
import { grantRole } from "./helpers/categories";
import { passwordGrant } from "./helpers/session";
import { gotoReady, useJobSuperAdmin, switchUser } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

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
    ] as const;
    expect(keys.length, "the facts card shows the 18 facts").toBe(18);
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
    await page.getByTestId("legal-facts-save").click();
    await expect(page.getByTestId("legal-fact-error-legal_email")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-notice_days")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-legal_phone")).toBeVisible();
    await expect(page.getByTestId("legal-fact-error-listed_ad_keep_months")).toBeVisible();
    expect((await facts()).updated_at).toBe(before.updated_at);
    await page.getByTestId("legal-facts-cancel").click();
    await expect(page.getByTestId("legal-fact-legal_email")).toHaveText(before.legal_email);
    await expect(page.getByTestId("legal-fact-notice_days")).toHaveText(String(before.notice_days));
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
});
