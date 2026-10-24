import { photoRowsOf, reasons, uploadPhoto } from "./helpers/photos";
import { type Page } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";

import {
  activeCityOf,
  bearerOf,
  completeDraft,
  destroyListingsOf,
  destroyPostableCategory,
  leaseSeller,
  postRoute,
  rand,
  seedPostableCategory,
  statusOf,
} from "./helpers/posting";
import { passwordGrant } from "./helpers/session";
import { gotoReady, signInViaSession, useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 22 (Stage 1), turn 4 — THE PUBLISHING STATEMENT AND ITS CERTIFICATION (LG-15..LG-18, LGC-1..LGC-3).
 *
 * A statement for a listing is a scratch document of kind e2e-pub-<the listing id without dashes>; an owed
 * acceptance is a scratch document of kind e2e-acc-<the listing id without dashes>. Neither exists on
 * production, and no test creates a document of a real kind (G27). Every row is found by its own id (G28);
 * cleanup in afterEach: certifications, acceptances, versions, documents, then the seller's listings and the
 * scratch category (J3). At most two leased accounts a test (DEC-174).
 */

type Row = Record<string, unknown>;
const DRAFT = "/api/listings/draft";
const PUBLISH = "/api/listings/publish";

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:certify] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
  }
  return { url: url.replace(/\/+$/, ""), key };
}

async function answerOf(response: Response) {
  const text = await response.text();
  const body: unknown = text === "" ? null : JSON.parse(text);
  if (!response.ok) {
    const message =
      body !== null && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : `HTTP ${response.status}`;
    return { data: null as unknown, error: message as string | null };
  }
  return { data: body, error: null as string | null };
}

/** An RPC caller for one person (the legal-doors pattern). */
async function asPerson(person: { email: string; password: string }) {
  const { url, key } = restBase();
  const session = await passwordGrant(person.email, person.password);
  const headers = {
    apikey: key,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
  return {
    rpc: async (fn: string, args: Record<string, unknown> = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers,
          body: JSON.stringify(args),
        }),
      ),
  };
}

const hex = (listingId: string) => listingId.replaceAll("-", "");

/** The rows a test made, removed in afterEach in the brief's order (J3). */
type Scratch = {
  sellers: string[];
  categories: string[];
  listings: string[];
  documents: string[];
  versions: string[];
  reveals: { viewerId: string; listingId: string }[];
  photoListings: { sellerId: string; listingId: string }[];
};
function scratch(): Scratch {
  return {
    sellers: [],
    categories: [],
    listings: [],
    documents: [],
    versions: [],
    reveals: [],
    photoListings: [],
  };
}
async function destroy(s: Scratch) {
  const supabase = adminClient();
  for (const reveal of s.reveals) {
    const { error } = await supabase
      .from("contact_reveals")
      .delete()
      .eq("viewer_id", reveal.viewerId)
      .eq("listing_id", reveal.listingId);
    await assertRevealCleanup(error);
  }
  const failures: string[] = [];
  const step = (label: string, error: { message: string } | null) => {
    if (error) failures.push(`${label}: ${error.message}`);
  };
  for (const photo of s.photoListings) {
    const bucket = supabase.storage.from("listing-photos");
    const prefix = `default/${photo.sellerId}/${photo.listingId}`;
    const dirs = await bucket.list(prefix, { limit: 100 });
    step("photo directories", dirs.error);
    const keys: string[] = [];
    for (const dir of dirs.data ?? []) {
      const files = await bucket.list(`${prefix}/${dir.name}`, { limit: 100 });
      step("photo objects", files.error);
      for (const file of files.data ?? []) keys.push(`${prefix}/${dir.name}/${file.name}`);
    }
    if (keys.length) step("photo objects removed", (await bucket.remove(keys)).error);
  }
  if (s.listings.length > 0)
    step(
      "certifications",
      (await supabase.from("listing_certifications").delete().in("listing_id", s.listings)).error,
    );
  if (s.versions.length > 0) {
    step(
      "acceptances",
      (await supabase.from("legal_acceptances").delete().in("version_id", s.versions)).error,
    );
    step("versions", (await supabase.from("legal_versions").delete().in("id", s.versions)).error);
  }
  if (s.documents.length > 0)
    step(
      "documents",
      (await supabase.from("legal_documents").delete().in("id", s.documents)).error,
    );
  for (const seller of s.sellers) await destroyListingsOf(seller);
  for (const slug of s.categories) await destroyPostableCategory(slug);
  if (failures.length > 0) throw new Error(`[e2e:certify] cleanup failed: ${failures.join("; ")}`);
}

/** A scratch document of `kind` with its v1 in force (the service client's direct write, J3). */
async function seedDocument(s: Scratch, kind: string, country: string | null, body: string) {
  const supabase = adminClient();
  const doc = await supabase
    .from("legal_documents")
    .insert({ kind, country_code: country })
    .select("id")
    .single();
  if (doc.error || !doc.data) throw new Error(`[e2e:certify] document seed: ${doc.error?.message}`);
  s.documents.push(doc.data.id as string);
  const version = await supabase
    .from("legal_versions")
    .insert({
      document_id: doc.data.id,
      version: 1,
      status: "published",
      label: `e2e ${rand()}`,
      body_en: body,
      body_am: body,
      changelog: "first version",
      material: false,
      effective_at: new Date(Date.now() - 60_000).toISOString(),
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: {},
    })
    .select("id, label")
    .single();
  if (version.error || !version.data)
    throw new Error(`[e2e:certify] version seed: ${version.error?.message}`);
  s.versions.push(version.data.id as string);
  return { id: version.data.id as string, label: version.data.label as string };
}

async function assertRevealCleanup(error: { message: string } | null) {
  if (error) throw new Error(`[e2e:certify] reveal cleanup: ${error.message}`);
}

/** LG-21 — a new in-force version of this test's own document. */
async function seedSecondVersion(s: Scratch, documentId: string, body: string) {
  const version = await adminClient()
    .from("legal_versions")
    .insert({
      document_id: documentId,
      version: 2,
      status: "published",
      label: `e2e ${rand()}`,
      body_en: body,
      body_am: body,
      changelog: "second version",
      material: false,
      effective_at: new Date(Date.now() - 60_000).toISOString(),
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: {},
    })
    .select("id")
    .single();
  if (version.error || !version.data)
    throw new Error(`[e2e:certify] version two seed: ${version.error?.message}`);
  const id = String((version.data as Row)["id"]);
  s.versions.push(id);
  return id;
}

/** A named, ET-confirmed seller signed in on the page, with a scratch category. */
async function sellerOnPage(page: Page, s: Scratch) {
  const seller = await leaseSeller({ named: true, alias: true });
  s.sellers.push(seller.id);
  for (const glob of ["**/api/listings/**", "**/api/geo"]) {
    await page.route(glob, async (route) => {
      await route.continue({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
    });
  }
  await signInViaSession(page, seller.email, seller.password);
  await gotoReady(page, "/");
  const category = await seedPostableCategory();
  s.categories.push(category.slug);
  const city = await activeCityOf("ET");
  return { seller, categoryId: category.id as string, cityId: city.id as string };
}

/** A complete step-8 draft of the seller, through the draft route. */
async function draftOf(page: Page, s: Scratch, categoryId: string, cityId: string) {
  const token = await bearerOf(page);
  const draft = await postRoute(
    page,
    DRAFT,
    completeDraft({ categoryId, cityId, title: `e2e certify ${rand()}` }),
    { token, country: "ET" },
  );
  expect(draft.payload["ok"], `draft refused: ${JSON.stringify(draft.payload)}`).toBe(true);
  const listingId = String(draft.payload["listing_id"] ?? "");
  expect(listingId, "no draft id").not.toBe("");
  s.listings.push(listingId);
  return listingId;
}

async function certificationsOf(listingId: string): Promise<Row[]> {
  const { data, error } = await adminClient()
    .from("listing_certifications")
    .select("action, version_ids, countries, language, home_country_code, user_id")
    .eq("listing_id", listingId)
    .order("certified_at", { ascending: true });
  if (error) throw new Error(`[e2e:certify] reading certifications: ${error.message}`);
  return (data ?? []) as Row[];
}

/** The service client moves a listing to a state the seller doors start from (J3: its own rows only). */
async function makeState(listingId: string, status: "active" | "expired") {
  const day = 24 * 60 * 60 * 1000;
  const { error } = await adminClient()
    .from("listings")
    .update(
      status === "active"
        ? {
            status,
            published_at: new Date(Date.now() - day).toISOString(),
            expires_at: new Date(Date.now() + 10 * day).toISOString(),
          }
        : {
            status,
            published_at: new Date(Date.now() - 40 * day).toISOString(),
            expires_at: new Date(Date.now() - day).toISOString(),
          },
    )
    .eq("id", listingId);
  if (error) throw new Error(`[e2e:certify] making ${status}: ${error.message}`);
}

async function renewAllowed(): Promise<void> {
  const { data, error } = await adminClient()
    .from("listing_policy")
    .select("renew_allowed")
    .maybeSingle();
  if (error) throw new Error(`[e2e:certify] reading the renew setting: ${error.message}`);
  if ((data as Row | null)?.["renew_allowed"] !== true)
    throw new Error("staging's renew setting is off — this test never writes it");
}

const sorted = (ids: unknown) => [...((ids as string[]) ?? [])].sort();

/** Complete row truth, including order/stamps and revisions, not a displayed summary. */
async function guardedTruth(listingId: string) {
  const client = adminClient();
  const listing = await client.from("listings").select("*").eq("id", listingId).single();
  const photos = await client
    .from("listing_photos")
    .select("*")
    .eq("listing_id", listingId)
    .order("id");
  const revisions = await client
    .from("listing_revisions")
    .select("*")
    .eq("listing_id", listingId)
    .order("id");
  if (listing.error || photos.error || revisions.error || !listing.data)
    throw new Error(
      `[e2e:certify] guarded truth: ${listing.error?.message ?? photos.error?.message ?? revisions.error?.message}`,
    );
  return { listing: listing.data, photos: photos.data ?? [], revisions: revisions.data ?? [] };
}

/** Photos are uploaded while draft; all storage objects remain tracked after a row is removed. */
async function twoPhotos(page: Page, s: Scratch, sellerId: string, listingId: string) {
  s.photoListings.push({ sellerId, listingId });
  const token = await bearerOf(page);
  for (let i = 0; i < 2; i++) {
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
    expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
  }
  const photos = await photoRowsOf(listingId);
  expect(photos).toHaveLength(2);
  const first = photos[0];
  const second = photos[1];
  if (!first || !second) throw new Error("[e2e:certify] two photos missing");
  return { first: first.id, second: second.id };
}

const priceArgs = (listingId: string, amount: number) => ({
  p_listing_id: listingId,
  p_price_mode: "fixed",
  p_price_amount: amount,
  p_price_currency: "ETB",
  p_price_period: "once",
});
const pinArgs = (listingId: string) => ({
  p_listing_id: listingId,
  p_lat: 9.012345,
  p_lng: 38.765432,
  p_precision: "exact",
  p_street: "e2e scratch street",
  p_zoom: 15,
  p_directions: "e2e scratch gate",
});

test.describe("Legal certification", () => {
  let s: Scratch;
  test.beforeEach(() => {
    s = scratch();
  });
  test.afterEach(async () => {
    await destroy(s);
  });

  test("LG-15 my_listing_certification lists the statements for all countries and the ad's countries, never another country's; another seller is refused", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const kind = `e2e-pub-${hex(listingId)}`;
    const global = await seedDocument(s, kind, null, "Global statement");
    const et = await seedDocument(s, kind, "ET", "Ethiopia statement");
    await seedDocument(s, kind, "KE", "Kenya statement");

    const me = await asPerson(seller);
    const answer = await me.rpc("my_listing_certification", { p_listing_id: listingId });
    expect(answer.error).toBeNull();
    const body = answer.data as { statements: Row[]; acceptance_pending: boolean };
    expect(body.statements.map((row) => row["version_id"])).toEqual([global.id, et.id]);
    expect(body.statements.map((row) => row["country_code"])).toEqual([null, "ET"]);
    expect(body.acceptance_pending).toBe(false);

    const other = await leaseSeller();
    s.sellers.push(other.id);
    const refused = await (
      await asPerson(other)
    ).rpc("my_listing_certification", {
      p_listing_id: listingId,
    });
    expect(refused.error).toContain("not your listing");
  });

  test("LG-16 publish_listing refuses without the exact certified set and records the certification; a draft with no statement publishes as today", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const kind = `e2e-pub-${hex(listingId)}`;
    const global = await seedDocument(s, kind, null, "Global statement");
    const et = await seedDocument(s, kind, "ET", "Ethiopia statement");
    const me = await asPerson(seller);

    const bare = await me.rpc("publish_listing", { p_listing_id: listingId });
    expect(bare.error).toContain("certificationRequired");
    expect(await statusOf(listingId)).toBe("draft");

    const missing = await me.rpc("publish_listing", {
      p_listing_id: listingId,
      p_certified: [global.id],
      p_language: "en",
    });
    expect(missing.error).toContain("certificationRequired");
    expect(await statusOf(listingId)).toBe("draft");

    const ok = await me.rpc("publish_listing", {
      p_listing_id: listingId,
      p_certified: [et.id, global.id],
      p_language: "en",
    });
    expect(ok.error, JSON.stringify(ok)).toBeNull();
    expect((ok.data as Row)["status"]).toBe("screening");
    const rows = await certificationsOf(listingId);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.["action"]).toBe("publish");
    expect(sorted(rows[0]?.["version_ids"])).toEqual([global.id, et.id].sort());
    expect(rows[0]?.["countries"]).toEqual(["ET"]);
    expect(rows[0]?.["language"]).toBe("en");
    expect(rows[0]?.["home_country_code"]).toBe("ET");
    expect(rows[0]?.["user_id"]).toBe(seller.id);

    const plain = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(
      page,
      PUBLISH,
      { listingId: plain },
      { token, country: "ET" },
    );
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    expect(await certificationsOf(plain)).toHaveLength(0);
  });

  test("LG-17 an owed acceptance refuses a certified publish until it is accepted", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const statement = await seedDocument(s, `e2e-pub-${hex(listingId)}`, null, "Statement");
    const owed = await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
    const me = await asPerson(seller);
    const args = { p_listing_id: listingId, p_certified: [statement.id], p_language: "en" };

    const refused = await me.rpc("publish_listing", args);
    expect(refused.error).toContain("acceptanceRequired");
    expect(await statusOf(listingId)).toBe("draft");

    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const ok = await me.rpc("publish_listing", args);
    expect(ok.error, JSON.stringify(ok)).toBeNull();
    expect(await statusOf(listingId)).toBe("screening");
  });

  test("LG-18 edit_my_listing and renew_listing refuse without the certification and record it with it", async ({
    page,
  }) => {
    await renewAllowed();
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const me = await asPerson(seller);

    const live = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const first = await postRoute(page, PUBLISH, { listingId: live }, { token, country: "ET" });
    expect(first.payload["status"], JSON.stringify(first.payload)).toBe("screening");
    await makeState(live, "active");
    const liveStatement = await seedDocument(s, `e2e-pub-${hex(live)}`, null, "Statement");
    const changes = { title: `e2e certify edited ${rand()}` };
    const bareEdit = await me.rpc("edit_my_listing", { p_listing_id: live, p_changes: changes });
    expect(bareEdit.error).toContain("certificationRequired");
    const edited = await me.rpc("edit_my_listing", {
      p_listing_id: live,
      p_changes: changes,
      p_certified: [liveStatement.id],
      p_language: "en",
    });
    expect(edited.error, JSON.stringify(edited)).toBeNull();
    expect((edited.data as Row)["ok"]).toBe(true);
    expect((await certificationsOf(live)).map((row) => row["action"])).toEqual(["edit"]);

    const old = await draftOf(page, s, categoryId, cityId);
    const second = await postRoute(page, PUBLISH, { listingId: old }, { token, country: "ET" });
    expect(second.payload["status"], JSON.stringify(second.payload)).toBe("screening");
    await makeState(old, "expired");
    const oldStatement = await seedDocument(s, `e2e-pub-${hex(old)}`, null, "Statement");
    const bareRenew = await me.rpc("renew_listing", { p_listing_id: old });
    expect(bareRenew.error).toContain("certificationRequired");
    expect(await statusOf(old)).toBe("expired");
    const renewed = await me.rpc("renew_listing", {
      p_listing_id: old,
      p_certified: [oldStatement.id],
      p_language: "en",
    });
    expect(renewed.error, JSON.stringify(renewed)).toBeNull();
    expect((renewed.data as Row)["ok"]).toBe(true);
    expect((await certificationsOf(old)).map((row) => row["action"])).toEqual(["renew"]);
  });

  test("LGC-1 the review step shows the statement as a link with one tick, Publish is closed until it; a draft with no statement shows today's line", async ({
    page,
  }) => {
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const statementText = `Statement ${rand()}`;
    const global = await seedDocument(s, `e2e-pub-${hex(listingId)}`, null, statementText);

    await gotoReady(page, `/post/${listingId}`);
    const block = page.getByTestId("certify-block");
    await expect(block).toBeVisible({ timeout: 20_000 });
    // D235: one inline link carries every applying statement, not a link per statement.
    await expect(block).not.toContainText(statementText);
    const links = block.getByTestId("agree-link");
    await expect(links).toHaveCount(1);
    await expect(links.nth(0)).toHaveAttribute("href", "/legal/publishing");
    await expect(links.nth(0)).toHaveAttribute("data-role", "publishing");
    await expect(links.nth(0)).toHaveText("publishing statement");
    // Add a country statement before the certification: the same single link now carries both.
    const country = await seedDocument(
      s,
      `e2e-pub-${hex(listingId)}`,
      "ET",
      `Country ${statementText}`,
    );
    await gotoReady(page, `/post/${listingId}`);
    await expect(links).toHaveCount(1);
    await expect(links.nth(0)).toHaveAttribute("href", "/legal/publishing?country=ET");
    await expect(page.getByTestId("post-publish-statement")).toHaveCount(0);
    const publish = page.getByTestId("post-publish");
    // D231: drawn closed, never disabled; a tap refuses at the tick and sends nothing.
    await expect(publish).toBeEnabled();
    await expect(publish).toHaveAttribute("data-closed", "1");
    await publish.click();
    await expect(page.getByTestId("certify-tick")).toHaveAttribute("aria-invalid", "true");
    await expect(block.getByTestId("agree-message")).toHaveText(en["legal.agree.required"]);
    await expect(block.getByTestId("agree-to-document")).toHaveAttribute("data-refused", "1");
    expect(await statusOf(listingId), "LGC-1: a closed Publish published").toBe("draft");
    expect(await certificationsOf(listingId), "LGC-1: a closed Publish certified").toEqual([]);
    await page.getByTestId("certify-tick").click();
    await expect(publish).not.toHaveAttribute("data-closed", "1");
    await publish.click();
    await expect(page.getByTestId("post-in-review")).toBeVisible({ timeout: 20_000 });
    await expect.poll(async () => (await certificationsOf(listingId)).length).toBe(1);
    const certified = await certificationsOf(listingId);
    expect(certified[0]?.version_ids).toEqual(expect.arrayContaining([global.id, country.id]));
    expect(certified[0]?.version_ids).toHaveLength(2);

    const plain = await draftOf(page, s, categoryId, cityId);
    await gotoReady(page, `/post/${plain}`);
    await expect(page.getByTestId("post-publish-statement")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-publish")).toBeEnabled();
    await expect(page.getByTestId("certify-block")).toHaveCount(0);
  });

  test("LGC-2 Renew in My listings shows the statement; confirm waits for the tick and records the renewal", async ({
    page,
  }) => {
    await renewAllowed();
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "expired");
    await seedDocument(s, `e2e-pub-${hex(listingId)}`, null, `Statement ${rand()}`);

    await gotoReady(page, `/my-listings/${listingId}`);
    await page.getByTestId("my-listing-action-renew").click();
    const dialog = page.getByTestId("certify-confirm");
    await expect(dialog).toBeVisible({ timeout: 20_000 });
    await expect(dialog.getByTestId("certify-block")).toBeVisible();
    const yes = dialog.getByTestId("certify-confirm-yes");
    // Turn 32 (D231): Yes is drawn closed; a tap refuses at the tick and renews nothing.
    await expect(yes).toBeEnabled();
    await expect(yes).toHaveAttribute("data-closed", "1");
    await yes.click();
    await expect(dialog.getByTestId("certify-tick")).toHaveAttribute("aria-invalid", "true");
    await expect(dialog.getByTestId("agree-message")).toHaveText(en["legal.agree.required"]);
    expect(await statusOf(listingId), "LGC-2: a closed Yes renewed").toBe("expired");
    await dialog.getByTestId("certify-tick").click();
    await expect(yes).not.toHaveAttribute("data-closed", "1");
    await yes.click();
    await expect.poll(() => statusOf(listingId), { timeout: 20_000 }).toBe("active");
    expect((await certificationsOf(listingId)).map((row) => row["action"])).toEqual(["renew"]);
  });

  test("LGC-3 the staff card lists an ad's certification with the statement's name; an ad with none says so", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const certified = await draftOf(page, s, categoryId, cityId);
    const statement = await seedDocument(s, `e2e-pub-${hex(certified)}`, null, "Statement");
    const plain = await draftOf(page, s, categoryId, cityId);
    const me = await asPerson(seller);
    const ok = await me.rpc("publish_listing", {
      p_listing_id: certified,
      p_certified: [statement.id],
      p_language: "en",
    });
    expect(ok.error, JSON.stringify(ok)).toBeNull();
    const token = await bearerOf(page);
    const second = await postRoute(page, PUBLISH, { listingId: plain }, { token, country: "ET" });
    expect(second.payload["status"], JSON.stringify(second.payload)).toBe("screening");

    await page.context().clearCookies();
    await useJobSuperAdmin(page);
    await gotoReady(page, `/admin/listings/${certified}`);
    await expect(page.getByTestId("listing-certification")).toHaveCount(1, { timeout: 20_000 });
    const row = page.locator('[data-testid="listing-certification"][data-action="publish"]');
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(statement.label);

    await gotoReady(page, `/admin/listings/${plain}`);
    await expect(page.getByTestId("listing-certifications-none")).toBeVisible({
      timeout: 20_000,
    });
  });

  test("LGC-4 bulk Renew renews the ads no statement applies to and names the one that needs it; nothing is certified", async ({
    page,
  }) => {
    const width = page.viewportSize()?.width ?? 0;
    test.skip(width < 768, "ticks exist from 768 only (D128)");
    await renewAllowed();
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const a = await draftOf(page, s, categoryId, cityId);
    const b = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    for (const listingId of [a, b]) {
      const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
      expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
      await makeState(listingId, "expired");
    }
    const { data: stored, error } = await adminClient()
      .from("listings")
      .select("title")
      .eq("id", a)
      .single();
    if (error || !stored) throw new Error(`[e2e:certify] reading A's title: ${error?.message}`);
    const titleA = String((stored as Row)["title"]);
    await seedDocument(s, `e2e-pub-${hex(a)}`, null, `Statement ${rand()}`);

    await gotoReady(page, "/my-listings");
    await page.getByTestId("my-listings-group-closed").click();
    for (const id of [a, b]) {
      const tick = page.getByTestId(
        width >= 1280 ? `my-listing-${id}-select-cell` : `my-listing-${id}-select`,
      );
      await expect(tick).toBeVisible({ timeout: 15_000 });
      await tick.click();
    }
    await page.getByTestId("data-table-selection").getByTestId("my-listings-bulk-renew").click();
    await page.getByTestId("my-listings-confirm-yes").click();
    const expected = `${en["myListings.bulk.done"].replace("{count}", "1")} ${en[
      "myListings.bulk.needsStatement"
    ].replace("{titles}", titleA)}`;
    await expect(page.getByTestId("my-listings-notice")).toHaveText(expected, {
      timeout: 20_000,
    });
    await expect.poll(() => statusOf(b), { timeout: 20_000 }).toBe("active");
    await expect.poll(() => statusOf(a), { timeout: 20_000 }).toBe("expired");
    expect(await certificationsOf(a)).toHaveLength(0);
    expect(await certificationsOf(b)).toHaveLength(0);
  });
  test("LG-19 a photo added to a published ad needs the certification; a draft's photo does not", async ({
    page,
  }) => {
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const a = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId: a }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(a, "active");
    const statement = await seedDocument(s, `e2e-pub-${hex(a)}`, null, "Statement");
    const bare = await uploadPhoto(page, { listingId: a, token, cover: { name: "gps.jpg" } });
    expect(bare.status).toBe(409);
    expect(reasons(bare.payload)).toEqual([{ field: "legal", reason: "certificationRequired" }]);
    expect(await photoRowsOf(a)).toHaveLength(0);
    const accepted = await uploadPhoto(page, {
      listingId: a,
      token,
      cover: { name: "gps.jpg" },
      certified: [statement.id],
      language: "en",
    });
    expect(accepted.payload["ok"], JSON.stringify(accepted.payload)).toBe(true);
    expect(await photoRowsOf(a)).toHaveLength(1);
    expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["edit"]);
    const b = await draftOf(page, s, categoryId, cityId);
    await seedDocument(s, `e2e-pub-${hex(b)}`, null, "Draft statement");
    const draftPhoto = await uploadPhoto(page, {
      listingId: b,
      token,
      cover: { name: "gps.jpg" },
    });
    expect(draftPhoto.payload["ok"], JSON.stringify(draftPhoto.payload)).toBe(true);
    expect(await photoRowsOf(b)).toHaveLength(1);
    expect(await certificationsOf(b)).toHaveLength(0);
  });

  test("LG-20 the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "active");
    const stored = await adminClient()
      .from("listings")
      .update({ contact_pref: { phone: { show: true, value: "+251911000001" } } })
      .eq("id", listingId)
      .select("public_id")
      .single();
    if (stored.error || !stored.data)
      throw new Error(`[e2e:certify] contact seed: ${stored.error?.message}`);
    const args = { p_public_id: String((stored.data as Row)["public_id"]) };
    const buyerPerson = await leaseUser();
    s.reveals.push({ viewerId: buyerPerson.id, listingId });
    const buyer = await asPerson(buyerPerson);
    const first = await buyer.rpc("reveal_listing_contact", args);
    expect(first.error).toBeNull();
    expect((first.data as Row)["ok"]).toBe(true);
    await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
    const refused = await buyer.rpc("reveal_listing_contact", args);
    expect(refused.error).toBeNull();
    expect(refused.data).toEqual({ ok: false, reason: "acceptanceRequired" });
    const owner = await (await asPerson(seller)).rpc("reveal_listing_contact", args);
    expect(owner.error).toBeNull();
    expect((owner.data as Row)["ok"]).toBe(true);
  });

  test("LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const a = await draftOf(page, s, categoryId, cityId);
    const v1 = await seedDocument(s, `e2e-pub-${hex(a)}`, null, "Statement one");
    const documentId = s.documents.at(-1);
    if (!documentId) throw new Error("[e2e:certify] missing scratch document");
    const token = await bearerOf(page);
    const published = await postRoute(
      page,
      PUBLISH,
      { listingId: a, certified: [v1.id], language: "en" },
      { token, country: "ET" },
    );
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["publish"]);
    await makeState(a, "active");
    const me = await asPerson(seller);
    const read = await me.rpc("my_listing_certification", { p_listing_id: a });
    expect(read.error).toBeNull();
    expect((read.data as { statements: Row[] }).statements).toEqual([]);
    const edited = await me.rpc("edit_my_listing", {
      p_listing_id: a,
      p_changes: { title: `e2e once ${rand()}` },
    });
    expect(edited.error, JSON.stringify(edited)).toBeNull();
    expect((edited.data as Row)["ok"]).toBe(true);
    expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["publish"]);
    await makeState(a, "active");
    const v2 = await seedSecondVersion(s, documentId, "Statement two");
    const changed = await me.rpc("my_listing_certification", { p_listing_id: a });
    expect(changed.error).toBeNull();
    expect(
      (changed.data as { statements: Row[] }).statements.map((row) => row["version_id"]),
    ).toEqual([v2]);
    const changes = { title: `e2e once changed ${rand()}` };
    const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
    expect(bare.error).toContain("certificationRequired");
    const certified = await me.rpc("edit_my_listing", {
      p_listing_id: a,
      p_changes: changes,
      p_certified: [v2],
      p_language: "en",
    });
    expect(certified.error, JSON.stringify(certified)).toBeNull();
    expect((certified.data as Row)["ok"]).toBe(true);
    expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["publish", "edit"]);
  });

  test("LG-22 the sold ad's shown days are the legal setting: the public read follows sold_cutoff()", async ({
    page,
  }) => {
    const settings = await adminClient()
      .from("legal_settings")
      .select("sold_visible_days")
      .eq("id", true)
      .single();
    if (settings.error || !settings.data)
      throw new Error(`[e2e:certify] sold setting read: ${settings.error?.message}`);
    const days = settings.data.sold_visible_days;
    expect(Number.isInteger(days) && days >= 1 && days <= 365).toBe(true);
    const { url, key } = restBase();
    const anonRead = async (fn: string, args: Record<string, unknown> = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers: { apikey: key, "Content-Type": "application/json" },
          body: JSON.stringify(args),
        }),
      );
    const settingAnswer = await anonRead("sold_visible_days");
    expect(settingAnswer.error).toBeNull();
    expect(settingAnswer.data).toBe(days);
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "active");
    const sold = await adminClient()
      .from("listings")
      .update({
        status: "sold",
        sold_at: new Date(Date.now() - (days - 1) * 86_400_000).toISOString(),
      })
      .eq("id", listingId)
      .select("public_id")
      .single();
    if (sold.error || !sold.data)
      throw new Error(`[e2e:certify] sold row seed: ${sold.error?.message}`);
    const args = { p_public_id: sold.data.public_id };
    const visible = await anonRead("public_listing", args);
    expect(visible.error).toBeNull();
    expect(visible.data).not.toBeNull();
    expect((visible.data as Row)["public_id"]).toBe(sold.data.public_id);
    const older = await adminClient()
      .from("listings")
      .update({ sold_at: new Date(Date.now() - (days + 1) * 86_400_000).toISOString() })
      .eq("id", listingId);
    if (older.error) throw new Error(`[e2e:certify] older sold row: ${older.error.message}`);
    const hidden = await anonRead("public_listing", args);
    expect(hidden.error).toBeNull();
    expect(hidden.data).toBeNull();
  });

  test("LG-25 an owed acceptance refuses edit_my_listing until it is accepted; nothing is written while refused", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "active");
    const owed = await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
    const me = await asPerson(seller);
    const read = async () => {
      const listing = await adminClient().from("listings").select("*").eq("id", listingId).single();
      const revisions = await adminClient()
        .from("listing_revisions")
        .select("*")
        .eq("listing_id", listingId)
        .order("id");
      if (listing.error || revisions.error)
        throw new Error(
          `[e2e:certify] edit truth: ${listing.error?.message ?? revisions.error?.message}`,
        );
      return { listing: listing.data, revisions: revisions.data };
    };
    const before = await read();
    const title = `e2e acceptance edited ${rand()}`;
    const args = { p_listing_id: listingId, p_changes: { title } };
    const refused = await me.rpc("edit_my_listing", args);
    expect(refused.error).toContain("acceptanceRequired");
    expect(await read()).toEqual(before);
    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const edited = await me.rpc("edit_my_listing", args);
    expect(edited.error, JSON.stringify(edited)).toBeNull();
    expect((edited.data as Row)["ok"]).toBe(true);
    expect((await read()).listing?.title).toBe(title);
  });

  test("LG-26 an owed acceptance refuses renew_listing until it is accepted", async ({ page }) => {
    await renewAllowed();
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "expired");
    const owed = await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
    const me = await asPerson(seller);
    const read = async () => {
      const result = await adminClient()
        .from("listings")
        .select("status, expires_at")
        .eq("id", listingId)
        .single();
      if (result.error || !result.data)
        throw new Error(`[e2e:certify] renew truth: ${result.error?.message}`);
      return result.data;
    };
    const before = await read();
    const refused = await me.rpc("renew_listing", { p_listing_id: listingId });
    expect(refused.error).toContain("acceptanceRequired");
    expect(await read()).toEqual(before);
    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const renewed = await me.rpc("renew_listing", { p_listing_id: listingId });
    expect(renewed.error, JSON.stringify(renewed)).toBeNull();
    expect((renewed.data as Row)["ok"]).toBe(true);
    const after = await read();
    expect(after.status).toBe("active");
    expect(Date.parse(after.expires_at ?? "")).toBeGreaterThan(Date.now());
  });

  test("LG-27 an owed acceptance refuses a photo added to a published ad; no photo row is written", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const listingId = await draftOf(page, s, categoryId, cityId);
    s.photoListings.push({ sellerId: seller.id, listingId });
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(listingId, "active");
    const owed = await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
    const me = await asPerson(seller);
    const before = await photoRowsOf(listingId);
    const refused = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
    expect(refused.status).toBe(409);
    expect(reasons(refused.payload)).toEqual([{ field: "legal", reason: "acceptanceRequired" }]);
    expect(await photoRowsOf(listingId)).toEqual(before);
    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
    expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    expect(await photoRowsOf(listingId)).toHaveLength(before.length + 1);
  });

  test("LG-28 while an acceptance is owed, the table guard refuses the seller's own changes to a live ad and nothing is written", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const me = await asPerson(seller);
    const live = await draftOf(page, s, categoryId, cityId);
    const photos = await twoPhotos(page, s, seller.id, live);
    const publish = await me.rpc("publish_listing", { p_listing_id: live });
    expect(publish.error, JSON.stringify(publish)).toBeNull();
    await makeState(live, "active");
    const owed = await seedDocument(s, `e2e-acc-${hex(live)}`, null, "Terms to accept");
    const before = await guardedTruth(live);
    const calls: { fn: string; args: Record<string, unknown> }[] = [
      { fn: "set_listing_price", args: priceArgs(live, 90) },
      { fn: "set_listing_pin", args: pinArgs(live) },
      { fn: "set_listing_reserved", args: { p_listing_id: live, p_reserved: true } },
      {
        fn: "set_listing_photos_soon",
        args: { p_listing_id: live, p_on: !before.listing.photos_soon },
      },
      { fn: "set_cover_photo", args: { p_listing_id: live, p_photo_id: photos.second } },
      {
        fn: "move_listing_photo",
        args: { p_listing_id: live, p_photo_id: photos.second, p_position: 0 },
      },
      {
        fn: "edit_listing",
        args: {
          p_listing_id: live,
          p_category_id: categoryId,
          p_title: `E2E edited listing ${rand().replace(/[0-9]/g, "q")}`,
          p_description: "e2e scratch listing for the seller's doors",
          p_video_url: null,
          p_attributes: {},
          p_price_mode: "fixed",
          p_price_amount: 100,
          p_price_currency: "ETB",
          p_price_period: "once",
          p_poster_expires_at: null,
          p_coverage: [cityId],
          p_contact_pref: { messages: true },
        },
      },
    ];
    for (const call of calls) {
      const refused = await me.rpc(call.fn, call.args);
      expect(refused.error, `${call.fn}: ${JSON.stringify(refused)}`).toContain(
        "acceptanceRequired",
      );
      expect(await guardedTruth(live), call.fn).toEqual(before);
    }
    const sold = await draftOf(page, s, categoryId, cityId);
    const soldPublish = await me.rpc("publish_listing", { p_listing_id: sold });
    expect(soldPublish.error, JSON.stringify(soldPublish)).toBeNull();
    await makeState(sold, "active");
    const soldSeed = await adminClient()
      .from("listings")
      .update({ status: "sold", sold_at: new Date().toISOString() })
      .eq("id", sold);
    if (soldSeed.error) throw new Error(`[e2e:certify] sold seed: ${soldSeed.error.message}`);
    await seedDocument(s, `e2e-acc-${hex(sold)}`, null, "Terms to accept");
    const soldBefore = await guardedTruth(sold);
    const relist = await me.rpc("relist_listing", { p_listing_id: sold });
    expect(relist.error, JSON.stringify(relist)).toContain("acceptanceRequired");
    expect(await guardedTruth(sold)).toEqual(soldBefore);
    expect(await statusOf(sold)).toBe("sold");

    const closed = await draftOf(page, s, categoryId, cityId);
    const closedPublish = await me.rpc("publish_listing", { p_listing_id: closed });
    expect(closedPublish.error, JSON.stringify(closedPublish)).toBeNull();
    await makeState(closed, "active");
    const close = await me.rpc("transition_listing", {
      p_listing_id: closed,
      p_new_status: "closed",
    });
    expect(close.error, JSON.stringify(close)).toBeNull();
    await seedDocument(s, `e2e-acc-${hex(closed)}`, null, "Terms to accept");
    const closedBefore = await guardedTruth(closed);
    const reopen = await me.rpc("transition_listing", {
      p_listing_id: closed,
      p_new_status: "active",
    });
    expect(reopen.error, JSON.stringify(reopen)).toContain("acceptanceRequired");
    expect(await guardedTruth(closed)).toEqual(closedBefore);
    expect(await statusOf(closed)).toBe("closed");

    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const changed = await me.rpc("set_listing_price", priceArgs(live, 90));
    expect(changed.error, JSON.stringify(changed)).toBeNull();
    expect((await guardedTruth(live)).listing.price_amount).toBe(90);
  });

  test("LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const me = await asPerson(seller);
    const ads: { id: string; version: string }[] = [];
    let photoPair: { first: string; second: string } | undefined;
    for (let i = 0; i < 4; i++) {
      const id = await draftOf(page, s, categoryId, cityId);
      if (i === 2 || i === 3) {
        const pair = await twoPhotos(page, s, seller.id, id);
        if (i === 3) photoPair = pair;
      }
      const published = await me.rpc("publish_listing", { p_listing_id: id });
      expect(published.error, JSON.stringify(published)).toBeNull();
      await makeState(id, "active");
      const owed = await seedDocument(s, `e2e-acc-${hex(id)}`, null, "Terms to accept");
      ads.push({ id, version: owed.id });
    }
    const [sold, closed, removed, photoAd] = ads;
    if (!sold || !closed || !removed || !photoAd || !photoPair)
      throw new Error("[e2e:certify] takedown fixtures missing");
    const calls = [
      { fn: "mark_sold", args: { p_listing_id: sold.id }, id: sold.id, status: "sold" },
      {
        fn: "transition_listing",
        args: { p_listing_id: closed.id, p_new_status: "closed" },
        id: closed.id,
        status: "closed",
      },
      {
        fn: "transition_listing",
        args: { p_listing_id: removed.id, p_new_status: "removed" },
        id: removed.id,
        status: "removed",
      },
    ];
    for (const call of calls) {
      const answer = await me.rpc(call.fn, call.args);
      expect(answer.error, JSON.stringify(answer)).toBeNull();
      expect(await statusOf(call.id)).toBe(call.status);
    }
    const removedPhoto = await me.rpc("remove_listing_photo", {
      p_listing_id: photoAd.id,
      p_photo_id: photoPair.first,
    });
    expect(removedPhoto.error, JSON.stringify(removedPhoto)).toBeNull();
    const truth = await guardedTruth(photoAd.id);
    expect(truth.photos.map((row) => row.id)).toEqual([photoPair.second]);
    expect(truth.listing.cover_photo_id).toBe(photoPair.second);
    for (const ad of ads) {
      const accepted = await adminClient()
        .from("legal_acceptances")
        .select("id")
        .eq("version_id", ad.version)
        .eq("user_id", seller.id);
      if (accepted.error)
        throw new Error(`[e2e:certify] takedown acceptance truth: ${accepted.error.message}`);
      expect(accepted.data).toEqual([]);
    }
  });

  test("LG-30 a draft stays the seller's own while an acceptance is owed: its pin, photos-soon, cover and a draft save change", async ({
    page,
  }) => {
    const { seller, categoryId, cityId } = await sellerOnPage(page, s);
    const id = await draftOf(page, s, categoryId, cityId);
    const photos = await twoPhotos(page, s, seller.id, id);
    await seedDocument(s, `e2e-acc-${hex(id)}`, null, "Terms to accept");
    const me = await asPerson(seller);
    const pin = await me.rpc("set_listing_pin", pinArgs(id));
    expect(pin.error, JSON.stringify(pin)).toBeNull();
    expect((pin.data as Row)["ok"]).toBe(true);
    const pinned = await guardedTruth(id);
    expect(pinned.listing.status).toBe("draft");
    expect(Number(pinned.listing.pin_lat)).toBe(9.012345);
    expect(Number(pinned.listing.pin_lng)).toBe(38.765432);
    expect(pinned.listing.pin_zoom).toBe(15);

    const photosSoon = !pinned.listing.photos_soon;
    const promise = await me.rpc("set_listing_photos_soon", {
      p_listing_id: id,
      p_on: photosSoon,
    });
    expect(promise.error, JSON.stringify(promise)).toBeNull();
    expect((promise.data as Row)["ok"]).toBe(true);
    const promised = await guardedTruth(id);
    expect(promised.listing.status).toBe("draft");
    expect(promised.listing.photos_soon).toBe(photosSoon);

    const cover = await me.rpc("set_cover_photo", {
      p_listing_id: id,
      p_photo_id: photos.second,
    });
    expect(cover.error, JSON.stringify(cover)).toBeNull();
    expect((cover.data as Row)["ok"]).toBe(true);
    const truth = await guardedTruth(id);
    expect(truth.listing.status).toBe("draft");
    expect(truth.listing.cover_photo_id).toBe(photos.second);
    expect(truth.photos.find((row) => row.id === photos.second)?.display_order).toBe(0);
    expect(truth.photos.find((row) => row.id === photos.first)?.display_order).toBe(1);

    const title = `e2e draft save ${rand()}`;
    // S353: the draft-save door, using AU-5's argument names, not the live-price door.
    const saved = await me.rpc("submit_listing", {
      p_listing_id: id,
      p_step: 8,
      p_category_id: categoryId,
      p_title: title,
      p_description: truth.listing.description,
      p_video_url: truth.listing.video_url,
      p_attributes: truth.listing.attributes,
      p_price_mode: truth.listing.price_mode,
      p_price_amount: truth.listing.price_amount,
      p_price_currency: truth.listing.price_currency,
      p_price_period: truth.listing.price_period,
      p_poster_expires_at: truth.listing.poster_expires_at,
      p_coverage: [cityId],
      p_contact_pref: truth.listing.contact_pref,
    });
    expect(saved.error, JSON.stringify(saved)).toBeNull();
    expect((saved.data as Row)["ok"]).toBe(true);
    const savedTruth = await guardedTruth(id);
    expect(savedTruth.listing.id).toBe(id);
    expect(savedTruth.listing.status).toBe("draft");
    expect(savedTruth.listing.title).toBe(title);
    const pending = await me.rpc("my_listing_certification", { p_listing_id: id });
    expect(pending.error, JSON.stringify(pending)).toBeNull();
    expect((pending.data as Row)["acceptance_pending"]).toBe(true);
  });

  test("LG-31 the seller's public name waits for the acceptance", async ({ page }) => {
    const { seller } = await sellerOnPage(page, s);
    const me = await asPerson(seller);
    const read = async () => {
      const result = await adminClient()
        .from("profiles")
        .select("seller_alias, seller_type")
        .eq("user_id", seller.id)
        .single();
      if (result.error || !result.data)
        throw new Error(`[e2e:certify] seller name truth: ${result.error?.message}`);
      return result.data;
    };
    const before = await read();
    const owed = await seedDocument(s, `e2e-acc-u${hex(seller.id)}`, null, "Terms to accept");
    const alias = `e2eacc${hex(seller.id).replace(/[0-9]/g, "q").slice(0, 16)}${rand().replace(/[0-9]/g, "q")}`;
    const refused = await me.rpc("save_posting_identity", {
      p_alias: alias,
      p_seller_type: "person",
    });
    expect(refused.error, JSON.stringify(refused)).toContain("acceptanceRequired");
    expect(await read()).toEqual(before);
    const unchanged = await me.rpc("save_posting_identity", {
      p_alias: before.seller_alias,
      p_seller_type: before.seller_type,
    });
    expect(unchanged.error, JSON.stringify(unchanged)).toBeNull();
    expect((unchanged.data as Row)["ok"]).toBe(true);
    expect(await read()).toEqual(before);
    const accepted = await me.rpc("accept_legal", {
      p_version_ids: [owed.id],
      p_language: "en",
      p_adult: true,
    });
    expect(accepted.error, JSON.stringify(accepted)).toBeNull();
    const changed = await me.rpc("save_posting_identity", {
      p_alias: alias,
      p_seller_type: "person",
    });
    expect(changed.error, JSON.stringify(changed)).toBeNull();
    expect((changed.data as Row)["ok"]).toBe(true);
    expect((await read()).seller_alias).toBe(alias);
  });

  test("LGC-5 the photos step of a seller's edit waits for the statement", async ({ page }) => {
    const { categoryId, cityId } = await sellerOnPage(page, s);
    const a = await draftOf(page, s, categoryId, cityId);
    const token = await bearerOf(page);
    const published = await postRoute(page, PUBLISH, { listingId: a }, { token, country: "ET" });
    expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    await makeState(a, "active");
    await seedDocument(s, `e2e-pub-${hex(a)}`, null, "Statement");
    await gotoReady(page, `/my-listings/${a}/edit`);
    await expect(page.getByTestId("post-review")).toBeVisible();
    await page.locator('[data-testid="post-review-edit"][data-step="2"]').click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-photos-add")).toBeDisabled();
    await expect(page.getByTestId("post-photos-certify-wait")).toBeVisible();
    await page.getByTestId("certify-tick").click();
    await expect(page.getByTestId("post-photos-add")).toBeEnabled();
    await expect(page.getByTestId("post-photos-certify-wait")).toHaveCount(0);
  });

  test("LGC-6 a statement's public page shows the global statement, and the country's with its country line; anyone may read it (DEC-236)", async ({
    page,
  }) => {
    // Scratch statements only (G27): the test's own e2e-pub- kind is read by the same loader path as
    // /legal/publishing, with and without ?country=.
    const kind = `e2e-pub-lgc6${rand()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}`.slice(0, 44);
    const globalText = `Global statement ${rand()}`;
    const countryText = `Country statement ${rand()}`;
    await seedDocument(s, kind, null, globalText);
    await seedDocument(s, kind, "ET", countryText);

    await gotoReady(page, `/legal/${kind}`);
    await expect(page.getByTestId("legal-public-meta")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("legal-public-page")).toContainText(globalText);
    await expect(page.getByTestId("legal-fallback-note")).toHaveCount(0);
    await expect(page.getByTestId("legal-public-country")).toHaveCount(0);

    await gotoReady(page, `/legal/${kind}?country=ET`);
    await expect(page.getByTestId("legal-public-page")).toContainText(globalText);
    await expect(page.getByTestId("legal-public-page")).toContainText(countryText);
    await expect(page.getByTestId("legal-public-country")).toHaveText(
      en["legal.certify.forCountry"].replace("{country}", "Ethiopia"),
    );

    await gotoReady(page, `/legal/${kind}?country=zz`);
    await expect(page.getByTestId("legal-public-page")).toContainText(globalText);
    await expect(page.getByTestId("legal-public-country")).toHaveCount(0);
    await expect(page.getByTestId("legal-public-page")).not.toContainText(countryText);

    await gotoReady(page, "/legal/publishing");
    await expect(page.getByTestId("legal-public-page")).toBeVisible();
    await expect(page).toHaveTitle("Publishing statement — ethio.com");
  });
});
