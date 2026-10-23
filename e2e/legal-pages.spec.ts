import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";

import { gotoReady, switchLanguage } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * Bundle 22 (Stage 1), turn 3 — THE PUBLIC LEGAL PAGES (LGP-1..LGP-3); turn 32 — /legal/publishing (LGP-4).
 *
 * /terms and /privacy show the version in force (nothing of a real kind is
 * published on ethio-staging, so both show their "soon" state); a scratch
 * kind's page /legal/<kind> exists only in the E2E build and proves the meta
 * line, the contents list, the frozen facts, the language switch, Print and
 * the version ahead of its date.
 *
 * Fixtures (J1, J3): scratch documents whose kinds start `e2e-`, namespaced
 * run × shard × worker × project × test, inserted by the service client and
 * removed in an afterEach that survives a timeout (versions, then documents).
 */

const RUN_TAG = `e2e-lgp${Math.random()
  .toString(36)
  .slice(2, 7)
  .replace(/[^a-z0-9]/g, "x")}${(process.env["E2E_SHARD"] ?? "")
  .replace(/[^a-z0-9]/gi, "x")
  .toLowerCase()
  .slice(0, 4)}`;
const kinds = new Set<string>();
function scratch(tag: string): string {
  const info = test.info();
  const project = info.project.name.startsWith("mobile") ? "m" : "d";
  const kind = `${RUN_TAG}-${info.workerIndex}-${project}-${tag}`;
  kinds.add(kind);
  return kind;
}
function fail(error: { message: string } | null, phase: string) {
  if (error) throw new Error(`[e2e:legal-pages] ${phase}: ${error.message}`);
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

type VersionSeed = {
  version: number;
  label: string;
  body_en: string;
  body_am: string;
  material: boolean;
  effective_at: string;
  snapshot: Record<string, string>;
};
async function seedDocument(kind: string): Promise<string> {
  const doc = await adminClient()
    .from("legal_documents")
    .insert({ kind, country_code: null })
    .select("id")
    .single();
  fail(doc.error, "seed document");
  if (!doc.data) throw new Error("[e2e:legal-pages] document not seeded");
  return doc.data.id;
}
async function seedVersion(documentId: string, input: VersionSeed): Promise<string> {
  const row = await adminClient()
    .from("legal_versions")
    .insert({
      document_id: documentId,
      version: input.version,
      status: "published",
      label: input.label,
      body_en: input.body_en,
      body_am: input.body_am,
      changelog: "scratch change",
      material: input.material,
      effective_at: input.effective_at,
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: input.snapshot,
    })
    .select("id")
    .single();
  fail(row.error, "seed version");
  if (!row.data) throw new Error("[e2e:legal-pages] version not seeded");
  return row.data.id;
}

test.describe("Legal public pages", () => {
  test("LGP-1 /terms and /privacy show their soon state; the footer links lead there", async ({
    page,
  }) => {
    for (const [path, title] of [
      ["/terms", "Terms of Service"],
      ["/privacy", "Privacy Policy"],
    ] as const) {
      await gotoReady(page, path);
      const shown = page.getByTestId("legal-public-page");
      await expect(shown).toBeVisible();
      await expect(shown.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page.getByTestId("legal-public-none")).toBeVisible();
    }
    await gotoReady(page, "/");
    await page.getByTestId("footer-terms").click();
    await expect(page).toHaveURL(/\/terms$/);
    await expect(page.getByTestId("legal-public-page")).toBeVisible();
    await gotoReady(page, "/");
    await page.getByTestId("footer-privacy").click();
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page.getByTestId("legal-public-page")).toBeVisible();
  });

  test("LGP-4 /legal/publishing with no statement in force shows its soon state and carries the publishing title (DEC-236)", async ({
    page,
  }) => {
    // Real kinds are never published on ethio-staging (as LGP-1 holds for /terms and /privacy).
    await gotoReady(page, "/legal/publishing");
    const shown = page.getByTestId("legal-public-page");
    await expect(shown).toBeVisible();
    await expect(shown.getByRole("heading", { level: 1 })).toHaveText("Publishing statement");
    await expect(page.getByTestId("legal-public-none")).toHaveText(
      en["legal.page.none"].replace("{document}", en["legal.kind.publishing"]),
    );
    await expect(page).toHaveTitle("Publishing statement — ethio.com");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });

  test("LGP-2 a scratch document's page: meta, contents, frozen facts, the site's language, then the version ahead of its date", async ({
    page,
  }) => {
    const kind = scratch("b");
    const documentId = await seedDocument(kind);
    await seedVersion(documentId, {
      version: 1,
      label: "first",
      body_en: "## One\nWrite to {{legal_email}}\n\n## Two\nCurrent English text",
      body_am: "Amharic current text",
      material: false,
      effective_at: new Date(Date.now() - 60_000).toISOString(),
      snapshot: { legal_email: "frozen@example.invalid" },
    });
    await gotoReady(page, `/legal/${kind}`);
    await expect(page.getByTestId("legal-public-page")).toBeVisible();
    await expect(page.getByTestId("legal-public-meta")).toContainText("Version 1 · first");
    await expect(page.getByTestId("legal-toc").getByRole("link")).toHaveCount(2);
    await expect(page.getByTestId("legal-text")).toContainText("frozen@example.invalid");
    await switchLanguage(page, "am");
    await expect(page.getByTestId("legal-text")).toContainText("Amharic current text");
    await expect(page.getByTestId("legal-public-print")).toHaveCount(0);
    await expect(page.getByTestId("legal-public-lang-am")).toHaveCount(0);
    // Back to English before the next page load, whose date line is read in English; the
    // language menu closes before it is opened again (a click while it closes is lost).
    await expect(page.getByRole("menu")).toHaveCount(0);
    await switchLanguage(page, "en");

    const effective = new Date(Date.now() + 30 * 86_400_000);
    await seedVersion(documentId, {
      version: 2,
      label: "second",
      body_en: "## Next\nUpcoming English text",
      body_am: "Amharic upcoming text",
      material: true,
      effective_at: effective.toISOString(),
      snapshot: { legal_email: "frozen@example.invalid" },
    });
    await gotoReady(page, `/legal/${kind}`);
    const date = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(effective);
    await expect(page.getByTestId("legal-public-upcoming")).toContainText(date);
    await page.getByTestId("legal-public-show-upcoming").click();
    await expect(page.getByTestId("legal-text")).toContainText("Upcoming English text");
    await page.getByTestId("legal-public-show-current").click();
    await expect(page.getByTestId("legal-text")).toContainText("Current English text");
  });

  test("LGP-3 /legal/terms lands on /terms; /legal/not-a-kind is not found", async ({ page }) => {
    await gotoReady(page, "/legal/terms");
    await expect(page).toHaveURL(/\/terms$/);
    await expect(page.getByTestId("legal-public-page")).toBeVisible();
    const response = await page.goto("/legal/not-a-kind");
    expect(response?.status(), "an unknown kind is not found").toBe(404);
    await expect(page.getByTestId("legal-public-page")).toHaveCount(0);
  });
});
