import { expect, test } from "./fixtures";

import { passwordGrant } from "./helpers/session";
import { gotoReady, signInViaSession, switchLanguage } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 22 (Stage 1), turn 3 — THE PERSON'S LEGAL DOCUMENTS (LGH-1..LGH-3).
 *
 * /account/legal lists what a person accepted and the legal e-mails sent to
 * him; /account/legal/<id> shows one version with its frozen facts. Fixtures:
 * scratch kinds (the service client), accepted through the door, removed in an
 * afterEach that survives a timeout. Identity: leased people (J9). The scratch
 * kinds are accepted before the visit and are not gate kinds, so the gate
 * stays quiet (no real kind is in force on ethio-staging).
 */

const RUN_TAG = `e2e-lgh${Math.random()
  .toString(36)
  .slice(2, 7)
  .replace(/[^a-z0-9]/g, "x")}${(process.env["E2E_SHARD"] ?? "")
  .replace(/[^a-z0-9]/gi, "x")
  .toLowerCase()
  .slice(0, 4)}`;
const kinds = new Set<string>();
function tagOf(name: string): string {
  const info = test.info();
  const project = info.project.name.startsWith("mobile") ? "m" : "d";
  return `${RUN_TAG}-${info.workerIndex}-${project}-${name}`;
}
function fail(error: { message: string } | null, phase: string) {
  if (error) throw new Error(`[e2e:legal-history] ${phase}: ${error.message}`);
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

async function seed(kind: string, effective = Date.now() - 60_000): Promise<string> {
  kinds.add(kind);
  const client = adminClient();
  const doc = await client
    .from("legal_documents")
    .insert({ kind, country_code: null })
    .select("id")
    .single();
  fail(doc.error, "seed document");
  if (!doc.data) throw new Error("[e2e:legal-history] document not seeded");
  const row = await client
    .from("legal_versions")
    .insert({
      document_id: doc.data.id,
      version: 1,
      status: "published",
      label: "first",
      body_en: "## Contact\nWrite to {{legal_email}}",
      body_am: "Amharic history text",
      changelog: "scratch change",
      material: false,
      effective_at: new Date(effective).toISOString(),
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: { legal_email: "frozen-history@example.invalid" },
    })
    .select("id")
    .single();
  fail(row.error, "seed version");
  if (!row.data) throw new Error("[e2e:legal-history] version not seeded");
  return row.data.id;
}
async function accept(
  person: { email: string; password: string },
  ids: string[],
  consent: boolean,
) {
  const session = await passwordGrant(person.email, person.password);
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("[e2e:legal-history] missing staging config");
  const response = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/accept_legal`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_version_ids: ids,
      p_language: "en",
      p_adult: true,
      p_data_consent: consent,
    }),
  });
  if (!response.ok) throw new Error(`[e2e:legal-history] accept refused: ${await response.text()}`);
}

test.describe("My legal documents", () => {
  test("LGH-1 the account card and the list: acceptances with consent and a sent notice", async ({
    page,
  }) => {
    const tag = tagOf("a");
    const termsId = await seed(`${tag}-terms`);
    const privacyId = await seed(`${tag}-privacy`);
    const person = await leaseUser();
    await accept(person, [termsId, privacyId], true);
    const notice = await adminClient().rpc("record_legal_notice", {
      p_user_id: person.id,
      p_version_id: termsId,
      p_channel: "email",
      p_status: "sent",
      p_provider_ref: `${tag}-ref`,
    });
    fail(notice.error, "record notice");

    await signInViaSession(page, person.email, person.password);
    await gotoReady(page, "/account");
    await expect(page.getByTestId("account-legal-card")).toBeVisible();
    await page.getByTestId("account-open-legal").click();
    await expect(page).toHaveURL(/\/account\/legal$/);
    await expect(page.getByTestId("my-legal-page")).toBeVisible();
    await expect(page.getByTestId("my-legal-acceptance")).toHaveCount(2);
    const privacyRow = page.locator(
      `[data-testid="my-legal-acceptance"][data-version-id="${privacyId}"]`,
    );
    const termsRow = page.locator(
      `[data-testid="my-legal-acceptance"][data-version-id="${termsId}"]`,
    );
    await expect(privacyRow.getByTestId("my-legal-consent")).toHaveCount(1);
    await expect(termsRow.getByTestId("my-legal-consent")).toHaveCount(0);
    const notices = page.getByTestId("my-legal-notice");
    await expect(notices).toHaveCount(1);
    await expect(notices).toContainText("first");
    await expect(notices).toContainText("sent");
  });

  test("LGH-2 one version: frozen facts, the site's language, Back; a version not his is not found", async ({
    page,
  }) => {
    const tag = tagOf("b");
    const termsId = await seed(`${tag}-terms`);
    const aheadId = await seed(`${tag}-x`, Date.now() + 30 * 86_400_000);
    const person = await leaseUser();
    await accept(person, [termsId], false);
    await signInViaSession(page, person.email, person.password);
    await gotoReady(page, "/account/legal");
    const row = page.locator(`[data-testid="my-legal-acceptance"][data-version-id="${termsId}"]`);
    await row.getByTestId("my-legal-open").click();
    await expect(page).toHaveURL(new RegExp(`/account/legal/${termsId}$`));
    await expect(page.getByTestId("my-legal-version")).toBeVisible();
    await expect(page.getByTestId("legal-text")).toContainText("frozen-history@example.invalid");
    await switchLanguage(page, "am");
    await expect(page.getByTestId("legal-text")).toContainText("Amharic history text");
    // The language menu closes before it is opened again (a click while it closes is lost).
    await expect(page.getByRole("menu")).toHaveCount(0);
    await switchLanguage(page, "en");
    await expect(page.getByTestId("my-legal-print")).toHaveCount(0);
    await expect(page.getByTestId("my-legal-lang-am")).toHaveCount(0);
    await page.getByTestId("my-legal-back").click();
    await expect(page).toHaveURL(/\/account\/legal$/);
    await expect(page.getByTestId("my-legal-page")).toBeVisible();
    await gotoReady(page, `/account/legal/${aheadId}`);
    await expect(page.getByTestId("my-legal-not-found")).toBeVisible();
  });

  test("LGH-3 a person with nothing sees both empty states", async ({ page }) => {
    const person = await leaseUser();
    await signInViaSession(page, person.email, person.password);
    await gotoReady(page, "/account/legal");
    await expect(page.getByTestId("my-legal-no-acceptances")).toBeVisible();
    await expect(page.getByTestId("my-legal-no-notices")).toBeVisible();
  });
});
