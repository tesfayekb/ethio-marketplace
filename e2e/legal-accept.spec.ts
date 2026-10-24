import { type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";

import { passwordGrant, storageKey } from "./helpers/session";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { adminClient, createUser, leaseUser } from "./helpers/users";

/**
 * Bundle 22 (Stage 1), turn 3 — THE ACCEPTANCE AT SIGN-IN (LAC-1..LAC-4); turn 32 — the landing after a
 * sign-in through the form (LAC-5, LAC-6: fresh createUser identities, J9 — the form's own password).
 *
 * The gate sends a signed-in person with a document to accept to
 * /legal/accept. Real kinds are never published on ethio-staging, so each test
 * seeds its own scratch kinds (`<tag>-terms`, `<tag>-privacy`) and, AFTER the
 * sign-in, sets `window.__ethioLegalKinds` (read only in the E2E build).
 *
 * Identity (J9): leased people (`leaseUser`), at most two per test. Fixtures:
 * the service client; acceptances, then versions, then documents removed in an
 * afterEach that survives a timeout. Truth: the service client (J4).
 */

const RUN_TAG = `e2e-lac${Math.random()
  .toString(36)
  .slice(2, 7)
  .replace(/[^a-z0-9]/g, "x")}${(process.env["E2E_SHARD"] ?? "")
  .replace(/[^a-z0-9]/gi, "x")
  .toLowerCase()
  .slice(0, 4)}`;
const kinds = new Set<string>();
function tagOf(test_: string): string {
  const info = test.info();
  const project = info.project.name.startsWith("mobile") ? "m" : "d";
  return `${RUN_TAG}-${info.workerIndex}-${project}-${test_}`;
}
function fail(error: { message: string } | null, phase: string) {
  if (error) throw new Error(`[e2e:legal-accept] ${phase}: ${error.message}`);
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

/** A scratch document with v1 in force; answers the document and version ids. */
async function seed(kind: string): Promise<{ documentId: string; versionId: string }> {
  kinds.add(kind);
  const doc = await adminClient()
    .from("legal_documents")
    .insert({ kind, country_code: null })
    .select("id")
    .single();
  fail(doc.error, "seed document");
  if (!doc.data) throw new Error("[e2e:legal-accept] document not seeded");
  const versionId = await seedVersion(doc.data.id, 1, false, Date.now() - 60_000);
  return { documentId: doc.data.id, versionId };
}
async function seedVersion(
  documentId: string,
  version: number,
  material: boolean,
  effective: number,
): Promise<string> {
  const row = await adminClient()
    .from("legal_versions")
    .insert({
      document_id: documentId,
      version,
      status: "published",
      label: `v${version}`,
      body_en: `## Scratch\nScratch English text ${version}`,
      body_am: `Scratch Amharic text ${version}`,
      changelog: "scratch change",
      material,
      effective_at: new Date(effective).toISOString(),
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: { seed: "true" },
    })
    .select("id")
    .single();
  fail(row.error, "seed version");
  if (!row.data) throw new Error("[e2e:legal-accept] version not seeded");
  return row.data.id;
}
async function signIn(page: Page, person: { email: string; password: string }, extra: string[]) {
  await signInViaSession(page, person.email, person.password);
  await page.addInitScript((list) => {
    (window as unknown as { __ethioLegalKinds?: string[] }).__ethioLegalKinds = list;
  }, extra);
}
async function acceptanceRows(userId: string, versionIds: string[]) {
  const rows = await adminClient()
    .from("legal_acceptances")
    .select("*")
    .eq("user_id", userId)
    .in("version_id", versionIds);
  fail(rows.error, "acceptances read");
  return (rows.data ?? []) as unknown as Record<string, unknown>[];
}

test.describe("Legal acceptance", () => {
  test("LAC-1 the hard stop and the one tick, with the 18+ statement the first time", async ({
    page,
  }) => {
    const tag = tagOf("a");
    const terms = await seed(`${tag}-terms`);
    const privacy = await seed(`${tag}-privacy`);
    const person = await leaseUser();
    await signIn(page, person, [`${tag}-terms`, `${tag}-privacy`]);
    await page.goto("/account");
    await expect(page).toHaveURL(/\/legal\/accept\?/);
    expect(new URL(page.url()).searchParams.get("next"), "next keeps the asked page").toBe(
      "/account",
    );
    await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
    await expect(page.getByTestId("legal-accept-liability")).toHaveText(
      "The Terms limit our liability, set a time limit for claims, and make you responsible for your ads and deals, including claims they cause against us. The main points are at the top of the Terms.",
    );
    await expect(page.getByTestId("legal-accept-doc")).toHaveCount(2);
    const submit = page.getByTestId("legal-accept-submit");
    await expect(page.getByTestId("legal-accept-screen")).toContainText(
      "I am 18 or older. I have read and agree to the Terms of Service and the Privacy Policy.",
    );
    // Turn 32 (D230, D231): one link per document under the sentence; Submit drawn closed, never disabled.
    const links = page.getByTestId("agree-link");
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute("href", "/terms");
    await expect(links.nth(1)).toHaveAttribute("href", "/privacy");
    await expect(submit).toHaveAttribute("data-closed", "1");
    await submit.click();
    const tick = page.getByTestId("legal-accept-tick");
    await expect(tick).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByTestId("agree-message")).toHaveText(en["legal.agree.required"]);
    await expect(page.getByTestId("agree-to-document")).toHaveAttribute("data-refused", "1");
    expect(
      await acceptanceRows(person.id, [terms.versionId, privacy.versionId]),
      "LAC-1: a tap on the closed Submit recorded an acceptance",
    ).toEqual([]);
    await tick.click();
    await expect(submit).not.toHaveAttribute("data-closed", "1");
    const privacyRow = page.locator(`[data-testid="legal-accept-doc"][data-kind="${tag}-privacy"]`);
    await privacyRow.getByTestId("legal-accept-read").click();
    await expect(page.getByTestId("legal-accept-text")).toContainText("Scratch English text 1");
    await expect(page.getByTestId("legal-accept-tick")).toBeChecked();
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page).toHaveURL(/\/account$/);

    const rows = await acceptanceRows(person.id, [terms.versionId, privacy.versionId]);
    expect(rows.length, "two acceptance rows").toBe(2);
    for (const row of rows) {
      expect(row["adult_confirmed"]).toBe(true);
      expect(row["language"]).toBe("en");
      expect(row["data_consent"], "no separate storage consent").toBe(false);
    }
    await gotoReady(page, "/my-listings");
    await expect(page).toHaveURL(/\/my-listings$/);
  });

  test("LAC-2 only a terms document: the Terms-only tick", async ({ page }) => {
    const tag = tagOf("b");
    const terms = await seed(`${tag}-terms`);
    const person = await leaseUser();
    await signIn(page, person, [`${tag}-terms`]);
    await page.goto("/account");
    await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
    await expect(page.getByTestId("legal-accept-screen")).toContainText(
      "I am 18 or older. I have read and agree to the Terms of Service.",
    );
    await page.getByTestId("legal-accept-tick").click();
    await page.getByTestId("legal-accept-submit").click();
    await expect(page).toHaveURL(/\/account$/);
    const rows = await acceptanceRows(person.id, [terms.versionId]);
    expect(rows.length).toBe(1);
    expect(rows[0]!["data_consent"]).toBe(false);
  });

  test("LAC-3 the exempt pages stay; other pages redirect; Decline, sign out records nothing", async ({
    page,
  }) => {
    const tag = tagOf("c");
    const terms = await seed(`${tag}-terms`);
    const person = await leaseUser();
    await signIn(page, person, [`${tag}-terms`]);
    for (const path of ["/terms", "/privacy"]) {
      await gotoReady(page, path);
      await expect(page.getByTestId("legal-public-page")).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
    for (const path of ["/settings", "/post"]) {
      await page.goto(path);
      await expect(page, `${path} redirects`).toHaveURL(/\/legal\/accept\?next=/);
      await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
    }
    await expect(page.getByTestId("legal-accept-signout")).toHaveText("Decline, sign out");
    await page.getByTestId("legal-accept-signout").click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId("legal-accept-screen")).toHaveCount(0);
    const stored = await page.evaluate((key) => window.localStorage.getItem(key), storageKey());
    expect(stored, "signed out").toBeNull();
    expect(await acceptanceRows(person.id, [terms.versionId])).toEqual([]);
  });

  test("LAC-4 a material change brings the screen back with version 2, asking no 18+ statement again", async ({
    page,
  }) => {
    const tag = tagOf("d");
    const terms = await seed(`${tag}-terms`);
    const person = await leaseUser();
    const session = await passwordGrant(person.email, person.password);
    const url = process.env["E2E_SUPABASE_URL"];
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("[e2e:legal-accept] missing staging config");
    const accepted = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/accept_legal`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_version_ids: [terms.versionId],
        p_language: "en",
        p_adult: true,
        p_data_consent: false,
      }),
    });
    if (!accepted.ok)
      throw new Error(`[e2e:legal-accept] v1 accept refused: ${await accepted.text()}`);
    const v2 = await seedVersion(terms.documentId, 2, true, Date.now() - 30_000);
    await signIn(page, person, [`${tag}-terms`]);
    await page.goto("/account");
    await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
    const row = page.getByTestId("legal-accept-doc");
    await expect(row).toHaveCount(1);
    await expect(row).toHaveAttribute("data-kind", `${tag}-terms`);
    await expect(row).toContainText("Version 2");
    await expect(page.getByTestId("legal-accept-screen")).toContainText(
      "I have read and agree to the updated Terms of Service.",
    );
    await expect(page.getByTestId("legal-accept-screen")).not.toContainText("18 or older");
    await page.getByTestId("legal-accept-tick").click();
    await page.getByTestId("legal-accept-submit").click();
    await expect(page).toHaveURL(/\/account$/);
    const rows = await acceptanceRows(person.id, [terms.versionId, v2]);
    expect(rows).toHaveLength(2);
    expect(
      rows.find((accepted) => accepted["version_id"] === terms.versionId)?.["adult_confirmed"],
    ).toBe(true);
    expect(rows.find((accepted) => accepted["version_id"] === v2)?.["adult_confirmed"]).toBe(false);
  });

  /** Turn 32 (INC-823) — every main-frame path after the sign-in click, in order. */
  async function signInThroughForm(page: Page, person: { email: string; password: string }) {
    await gotoReady(page, "/auth?return=%2Faccount");
    await page.locator("#auth-email").fill(person.email);
    await page.locator("#auth-password").fill(person.password);
    const seen: string[] = [];
    page.on("framenavigated", (frame) => {
      if (frame === page.mainFrame()) seen.push(new URL(frame.url()).pathname);
    });
    await page.locator('form button[type="submit"]').click();
    return seen;
  }

  test("LAC-5 a sign-in through the form with an acceptance owed lands on the screen first, no page between (INC-823)", async ({
    page,
  }) => {
    const tag = tagOf("e");
    await seed(`${tag}-terms`);
    const person = await createUser({ confirmed: true });
    await page.addInitScript(
      (list) => {
        (window as unknown as { __ethioLegalKinds?: string[] }).__ethioLegalKinds = list;
      },
      [`${tag}-terms`],
    );
    const seen = await signInThroughForm(page, person);
    await expect(page.getByTestId("legal-accept-screen")).toBeVisible({ timeout: 20_000 });
    const after = seen.filter((path) => path !== "/auth");
    expect(after[0], `LAC-5: the landings were ${JSON.stringify(seen)}`).toBe("/legal/accept");
    expect(new URL(page.url()).searchParams.get("next")).toBe("/account");
  });

  test("LAC-6 with nothing owed the same sign-in lands on the return path directly", async ({
    page,
  }) => {
    const tag = tagOf("f");
    const terms = await seed(`${tag}-terms`);
    const person = await createUser({ confirmed: true });
    const accepted = await adminClient().from("legal_acceptances").insert({
      user_id: person.id,
      version_id: terms.versionId,
      language: "en",
      method: "email",
      adult_confirmed: true,
      data_consent: false,
    });
    fail(accepted.error, "LAC-6 seed acceptance");
    await page.addInitScript(
      (list) => {
        (window as unknown as { __ethioLegalKinds?: string[] }).__ethioLegalKinds = list;
      },
      [`${tag}-terms`],
    );
    const seen = await signInThroughForm(page, person);
    await expect(page).toHaveURL(/\/account$/, { timeout: 20_000 });
    expect(seen, "LAC-6: an acceptance screen appeared").not.toContain("/legal/accept");
  });
});
