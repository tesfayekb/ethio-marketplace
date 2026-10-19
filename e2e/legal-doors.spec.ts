import { readFileSync } from "node:fs";

import { expect, test } from "./fixtures";

import { grantRole } from "./helpers/categories";
import { passwordGrant, storageKey } from "./helpers/session";
import { useJobSuperAdmin } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * Bundle 22 (Stage 1), turn 1 — THE LEGAL DOORS (LG-1..LG-8).
 *
 * Proves the legal documents' database (docs/features/legal.md): the version
 * in force (LG-1), the publish door's refusals (LG-2), the finality rules
 * (LG-3), acceptance (LG-4), the caller's standing (LG-5), the settings doors
 * (LG-6), the staff history (LG-7) and the caller's own history and texts
 * (LG-8).
 *
 * Identity (J9): the pooled job super admin for the permitted staff path
 * (`useJobSuperAdmin`), a leased user granted the "admin" role for the refused
 * staff path — no role holds a legal permission, so an admin by role is the
 * strongest refused caller. Fixtures: scratch documents whose kinds start
 * `e2e-` (D2), inserted by the service client, removed in `finally`
 * (acceptances, then versions, then documents). Truth: the service client,
 * never a rendered summary (J4).
 *
 * STEP-UP NOTE: turn 1 ships no screens. The "without fresh second factor"
 * refusals are proven at the server with an aal1 token of the pooled super
 * admin — the same token class a stale client window presents
 * (`staleStepUpOnClient` has no client to shorten until turn 2's screens).
 */

type Row = Record<string, unknown>;

function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error("[e2e:legal] E2E_SUPABASE_URL and E2E_SUPABASE_PUBLISHABLE_KEY must be set.");
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

/** An RPC caller for one person (the my-listings-page pattern). */
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
    userId: String((session.user as Row)["id"]),
  };
}

/** An anonymous RPC caller (the in-force texts are public). */
async function asAnon() {
  const { url, key } = restBase();
  return {
    rpc: async (fn: string, args: Record<string, unknown> = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers: { apikey: key, "Content-Type": "application/json" },
          body: JSON.stringify(args),
        }),
      ),
  };
}

/** The aal2 token `useJobSuperAdmin` just injected, for node-side RPC calls. */
async function superAdminToken(page: Parameters<typeof useJobSuperAdmin>[0]): Promise<string> {
  const raw = await page.evaluate((key) => window.localStorage.getItem(key), storageKey());
  if (!raw) throw new Error("[e2e:legal] no injected session in storage.");
  const parsed = JSON.parse(raw) as Row;
  const token = parsed["access_token"];
  if (typeof token !== "string") throw new Error("[e2e:legal] injected session carries no token.");
  return token;
}

async function asToken(token: string) {
  const { url, key } = restBase();
  return {
    rpc: async (fn: string, args: Record<string, unknown> = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(args),
        }),
      ),
  };
}

/** The pooled super admin's credentials (its aal1 grant = a stale second factor at the server). */
function pooledSuperAdminCredentials(): { email: string; password: string } {
  const state = JSON.parse(readFileSync("e2e/.state/test-user.json", "utf8")) as {
    superAdmins: { email: string; password: string }[];
  };
  const pool = state.superAdmins ?? [];
  if (pool.length === 0) {
    throw new Error(
      "[e2e:legal] the state file carries no pooled super admin — setup did not run.",
    );
  }
  return pool[0]!;
}

const RUN_TAG = `e2e-lg${Math.random()
  .toString(36)
  .slice(2, 8)
  .replace(/[^a-z0-9]/g, "x")}`;

type Fixture = {
  documentId: string;
  draftId: string | null;
  publishedId: string;
  countryDocumentId: string | null;
  countryPublishedId: string | null;
};

/** Seeds a scratch document with one published version (the service client's direct write, J3). */
async function seedFixture(kind: string, country: string | null): Promise<Fixture> {
  const supabase = adminClient();
  const doc = await supabase
    .from("legal_documents")
    .insert({ kind, country_code: country })
    .select("id")
    .single();
  if (doc.error || !doc.data) throw new Error(`[e2e:legal] document seed: ${doc.error?.message}`);
  const published = await supabase
    .from("legal_versions")
    .insert({
      document_id: doc.data.id,
      version: 1,
      status: "published",
      label: "v1",
      body_en: "English body",
      body_am: "Amharic body",
      changelog: "first version",
      material: false,
      effective_at: new Date(Date.now() - 60_000).toISOString(),
      published_at: new Date(Date.now() - 60_000).toISOString(),
      settings_snapshot: { seed: true },
    })
    .select("id")
    .single();
  if (published.error || !published.data)
    throw new Error(`[e2e:legal] version seed: ${published.error?.message}`);
  return {
    documentId: doc.data.id as string,
    draftId: null,
    publishedId: published.data.id as string,
    countryDocumentId: null,
    countryPublishedId: null,
  };
}

/** Cleanup order (J3): acceptances and notices, then versions, then documents. */
async function destroyFixture(fixture: Fixture) {
  const supabase = adminClient();
  const versionIds = [fixture.publishedId, fixture.draftId, fixture.countryPublishedId].filter(
    (id): id is string => id !== null,
  );
  await supabase.from("legal_acceptances").delete().in("version_id", versionIds);
  await supabase.from("legal_notices").delete().in("version_id", versionIds);
  await supabase.from("legal_versions").delete().in("id", versionIds);
  const documentIds = [fixture.documentId, fixture.countryDocumentId].filter(
    (id): id is string => id !== null,
  );
  await supabase.from("legal_documents").delete().in("id", documentIds);
}

test.describe("Legal doors", () => {
  test("LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log", async () => {
    const kind = `${RUN_TAG}-a`;
    const fixture = await seedFixture(kind, null);
    try {
      // A newer draft and a future-dated published version never outrank the version in force.
      const supabase = adminClient();
      const future = await supabase
        .from("legal_versions")
        .insert({
          document_id: fixture.documentId,
          version: 2,
          status: "published",
          label: "v2",
          body_en: "New English",
          body_am: "New Amharic",
          changelog: "secret change note",
          material: true,
          effective_at: new Date(Date.now() + 86_400_000).toISOString(),
          published_at: new Date().toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (future.error || !future.data)
        throw new Error(`[e2e:legal] future version seed: ${future.error?.message}`);
      fixture.draftId = future.data.id as string;

      const anon = await asAnon();
      const globalAnswer = await anon.rpc("legal_in_force", { p_kind: kind });
      expect(globalAnswer.error, "global in-force read").toBeNull();
      const body = globalAnswer.data as Row;
      expect(
        body["version_id"],
        "the version in force is the published one whose time has come",
      ).toBe(fixture.publishedId);
      expect(body["version"]).toBe(1);
      expect("changelog" in body, "the change log is never returned").toBe(false);

      // A country the document does not belong to answers nothing.
      const wrongCountry = await anon.rpc("legal_in_force", { p_kind: kind, p_country: "US" });
      expect(wrongCountry.error).toBeNull();
      expect(wrongCountry.data, "a global document is not a country document").toBeNull();

      // A country document answers only its country (seeded by service client, J3).
      const countryDoc = await seedFixture(kind, "ET");
      fixture.countryDocumentId = countryDoc.documentId;
      fixture.countryPublishedId = countryDoc.publishedId;
      const countryAnswer = await anon.rpc("legal_in_force", { p_kind: kind, p_country: "ET" });
      expect(countryAnswer.error).toBeNull();
      expect((countryAnswer.data as Row)["version_id"]).toBe(countryDoc.publishedId);
    } finally {
      await destroyFixture(fixture);
    }
  });

  test("LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule", async ({
    page,
  }) => {
    const kind = `${RUN_TAG}-b`;
    const fixture = await seedFixture(kind, null);
    const plain = await leaseUser();
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    try {
      const asPlain = await asPerson(plain);
      const asAdmin = await asPerson(admin);
      const save = {
        p_kind: kind,
        p_country: null,
        p_label: "v2",
        p_body_en: "x",
        p_body_am: "x",
        p_changelog: "c",
      };

      for (const [who, caller] of [
        ["plain user", asPlain],
        ["admin by role", asAdmin],
      ] as const) {
        const refused = await caller.rpc("admin_save_legal_draft", save);
        expect(refused.error, `${who} is refused the draft door`).toContain("permission denied");
        const publishRefused = await caller.rpc("admin_publish_legal_version", {
          p_version_id: fixture.publishedId,
          p_material: false,
        });
        expect(publishRefused.error, `${who} is refused the publish door`).toContain(
          "permission denied",
        );
      }

      // The permitted caller with a stale second factor (an aal1 token) gets the step-up refusal.
      const stale = await asPerson(pooledSuperAdminCredentials());
      const staleRefused = await stale.rpc("admin_save_legal_draft", save);
      expect(
        staleRefused.error,
        "the super admin without a fresh second factor gets the step-up refusal",
      ).not.toBeNull();
      expect(staleRefused.error).not.toContain("permission denied");

      // The permitted caller: pooled super admin with a fresh second factor (useJobSuperAdmin).
      await useJobSuperAdmin(page);
      const staff = await asToken(await superAdminToken(page));

      // Content refusals, each named by its code (D5).
      const noAmharic = await staff.rpc("admin_save_legal_draft", { ...save, p_body_am: null });
      expect(
        noAmharic.error,
        "a draft saves without Amharic; the publish door refuses it",
      ).toBeNull();
      fixture.draftId = (noAmharic.data as Row)["version_id"] as string;
      const publishNoAm = await staff.rpc("admin_publish_legal_version", {
        p_version_id: fixture.draftId,
        p_material: false,
      });
      expect(publishNoAm.error).toContain("bothLanguages");

      const blankName = await staff.rpc("admin_save_legal_draft", { ...save, p_label: "   " });
      expect(blankName.error).toContain("labelRequired");

      const blankLog = await staff.rpc("admin_save_legal_draft", { ...save, p_changelog: "  " });
      expect(blankLog.error).toBeNull(); // a blank change log saves as a draft…
      const publishBlankLog = await staff.rpc("admin_publish_legal_version", {
        p_version_id: (blankLog.data as Row)["version_id"],
        p_material: false,
      });
      expect(publishBlankLog.error, "…but cannot publish").toContain("changelogRequired");

      const taken = await staff.rpc("admin_save_legal_draft", { ...save, p_label: "v1" });
      expect(taken.error, "a label another version holds").toContain("labelTaken");

      // Material earlier than the notice period is refused; the seeded row holds 30 days.
      const goodDraft = await staff.rpc("admin_save_legal_draft", save);
      expect(goodDraft.error).toBeNull();
      fixture.draftId = (goodDraft.data as Row)["version_id"] as string;
      const tooShort = await staff.rpc("admin_publish_legal_version", {
        p_version_id: fixture.draftId,
        p_material: true,
        p_effective_at: new Date(Date.now() + 86_400_000).toISOString(),
      });
      expect(tooShort.error).toContain("noticeTooShort");

      // Publish with the rules kept: version 1 takes effect now.
      const published = await staff.rpc("admin_publish_legal_version", {
        p_version_id: fixture.draftId,
        p_material: false,
      });
      expect(published.error, "the permitted caller publishes").toBeNull();

      const again = await staff.rpc("admin_publish_legal_version", {
        p_version_id: fixture.draftId,
        p_material: false,
      });
      expect(again.error, "already published").toContain("notDraft");
    } finally {
      await destroyFixture(fixture);
    }
  });

  test("LG-3 finality: a published scratch row refuses updates, deletes only for the service role's cleanup; the draft doors behave", async ({
    page,
  }) => {
    const kind = `${RUN_TAG}-c`;
    const fixture = await seedFixture(kind, null);
    const supabase = adminClient();
    try {
      const updated = await supabase
        .from("legal_versions")
        .update({ label: "moved" })
        .eq("id", fixture.publishedId);
      expect(updated.error?.message, "a published version is final").toContain("publishedIsFinal");

      const changedKind = await supabase
        .from("legal_documents")
        .update({ kind: `${kind}-moved` })
        .eq("id", fixture.documentId);
      expect(changedKind.error?.message).toContain("kindIsFinal");
      const keptKind = await supabase
        .from("legal_documents")
        .select("kind")
        .eq("id", fixture.documentId)
        .single();
      expect(keptKind.error).toBeNull();
      expect(keptKind.data?.kind).toBe(kind);

      // The service role's cleanup DELETE of a published SCRATCH row is the one allowed path
      // (destroyFixture proves it in finally; here it is proven against a throwaway row).
      const extra = await seedFixture(kind, "DE");
      fixture.countryDocumentId = extra.documentId;
      fixture.countryPublishedId = extra.publishedId;
      const deleted = await supabase.from("legal_versions").delete().eq("id", extra.publishedId);
      expect(deleted.error, "service-role cleanup of a scratch published row").toBeNull();
      fixture.countryPublishedId = null;

      // The save door updates the one draft; discard removes it and refuses a published row.
      await useJobSuperAdmin(page);
      const staff = await asToken(await superAdminToken(page));
      const made = await staff.rpc("admin_save_legal_draft", {
        p_kind: kind,
        p_country: null,
        p_label: "draft",
        p_body_en: "e",
        p_body_am: "a",
        p_changelog: "c",
      });
      expect(made.error).toBeNull();
      fixture.draftId = (made.data as Row)["version_id"] as string;
      const edited = await staff.rpc("admin_save_legal_draft", {
        p_kind: kind,
        p_country: null,
        p_label: "draft-2",
        p_body_en: "e2",
        p_body_am: "a2",
        p_changelog: "c2",
      });
      expect(edited.error).toBeNull();
      expect((edited.data as Row)["version_id"], "the one draft is updated, not forked").toBe(
        fixture.draftId,
      );
      const discarded = await staff.rpc("admin_discard_legal_draft", {
        p_version_id: fixture.draftId,
      });
      expect(discarded.error).toBeNull();
      fixture.draftId = null;
      const refusePublished = await staff.rpc("admin_discard_legal_draft", {
        p_version_id: fixture.publishedId,
      });
      expect(refusePublished.error, "a published version cannot be discarded").toContain(
        "notDraft",
      );
    } finally {
      await destroyFixture(fixture);
    }
  });

  test("LG-4 accept_legal writes the caller's own row with language, adult statement and session method; every refusal named", async () => {
    const kind = `${RUN_TAG}-d`;
    const fixture = await seedFixture(kind, null);
    const person = await leaseUser();
    try {
      const caller = await asPerson(person);
      const empty = await caller.rpc("accept_legal", {
        p_version_ids: [],
        p_language: "en",
        p_adult: true,
      });
      expect(empty.error).toContain("emptyList");

      const minor = await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "en",
        p_adult: false,
      });
      expect(minor.error).toContain("adultRequired");

      const badLang = await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "zz",
        p_adult: true,
      });
      expect(badLang.error).toContain("badLanguage");

      const accepted = await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "en",
        p_adult: true,
      });
      expect(accepted.error, "the caller accepts").toBeNull();

      // DB truth (J4): one row, with the language, the adult statement, the session's method
      // and the profile's home country.
      const supabase = adminClient();
      const rows = await supabase
        .from("legal_acceptances")
        .select("*")
        .eq("user_id", person.id)
        .eq("version_id", fixture.publishedId);
      expect(rows.error).toBeNull();
      expect(rows.data?.length, "exactly one acceptance row").toBe(1);
      const row = rows.data![0] as Row;
      expect(row["language"]).toBe("en");
      expect(row["adult_confirmed"]).toBe(true);
      expect(typeof row["method"]).toBe("string");
      expect((row["method"] as string).length).toBeGreaterThan(0);

      const again = await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "am",
        p_adult: true,
      });
      expect(again.error).toBeNull();
      const after = await supabase
        .from("legal_acceptances")
        .select("id")
        .eq("user_id", person.id)
        .eq("version_id", fixture.publishedId);
      expect(after.data?.length, "a second call writes nothing").toBe(1);

      const acceptanceId = row["id"];
      if (typeof acceptanceId !== "string") throw new Error("[e2e:legal] missing acceptance id");
      const changedAcceptance = await supabase
        .from("legal_acceptances")
        .update({ language: "am" })
        .eq("id", acceptanceId);
      expect(changedAcceptance.error?.message).toContain("acceptanceIsFinal");
      const keptAcceptance = await supabase
        .from("legal_acceptances")
        .select("language")
        .eq("id", acceptanceId)
        .single();
      expect(keptAcceptance.error).toBeNull();
      expect(keptAcceptance.data?.language).toBe("en");

      // A draft is refused.
      const draft = await supabase
        .from("legal_versions")
        .insert({ document_id: fixture.documentId, version: 2, label: "draft", body_en: "x" })
        .select("id")
        .single();
      if (draft.error || !draft.data)
        throw new Error(`[e2e:legal] draft seed: ${draft.error?.message}`);
      fixture.draftId = draft.data.id as string;
      const notInForce = await caller.rpc("accept_legal", {
        p_version_ids: [fixture.draftId],
        p_language: "en",
        p_adult: true,
      });
      expect(notInForce.error).toContain("notInForce");

      // A country document for another home country is refused.
      const country = await seedFixture(kind, "DE");
      fixture.countryDocumentId = country.documentId;
      fixture.countryPublishedId = country.publishedId;
      const notApplicable = await caller.rpc("accept_legal", {
        p_version_ids: [country.publishedId],
        p_language: "en",
        p_adult: true,
      });
      expect(notApplicable.error).toContain("notApplicable");

      // Direct INSERT is refused by RLS — for the caller's own id and for another's.
      const { url, key } = restBase();
      const session = await passwordGrant(person.email, person.password);
      for (const target of [person.id, fixture.documentId]) {
        const insert = await fetch(`${url}/rest/v1/legal_acceptances`, {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: target,
            version_id: fixture.publishedId,
            language: "en",
            method: "email",
            adult_confirmed: true,
          }),
        });
        expect(insert.ok, `a direct insert as ${target === person.id ? "self" : "another"}`).toBe(
          false,
        );
      }
    } finally {
      await destroyFixture(fixture);
    }
  });

  test("LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country", async () => {
    const kind = `${RUN_TAG}-e`;
    const fixture = await seedFixture(kind, null);
    const person = await leaseUser();
    const supabase = adminClient();
    const extraVersionIds: string[] = [];
    try {
      const caller = await asPerson(person);
      const before = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      expect(before.error).toBeNull();
      const beforeRows = before.data as Row[];
      expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);

      // Two published versions in force yield one row: the newer version.
      const correction = await supabase
        .from("legal_versions")
        .insert({
          document_id: fixture.documentId,
          version: 2,
          status: "published",
          label: "v2",
          body_en: "Corrected English",
          body_am: "Corrected Amharic",
          changelog: "correction",
          material: false,
          effective_at: new Date(Date.now() - 30_000).toISOString(),
          published_at: new Date(Date.now() - 30_000).toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (correction.error || !correction.data)
        throw new Error(`[e2e:legal] correction seed: ${correction.error?.message}`);
      extraVersionIds.push(correction.data.id);
      const newest = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      expect(newest.error).toBeNull();
      const newestRows = newest.data as Row[];
      expect(
        newestRows,
        "one row for the scratch document, not every published version",
      ).toHaveLength(1);
      expect(newestRows[0]?.["version_id"]).toBe(correction.data.id);
      expect(newestRows[0]?.["version"]).toBe(2);

      const accepted = await caller.rpc("accept_legal", {
        p_version_ids: [correction.data.id],
        p_language: "en",
        p_adult: true,
      });
      expect(accepted.error).toBeNull();
      const after = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      expect(after.error).toBeNull();
      expect((after.data as Row[]).length, "accepted: the kind is no longer listed").toBe(0);

      // A published material version still ahead must not ask the person again.
      const future = await supabase
        .from("legal_versions")
        .insert({
          document_id: fixture.documentId,
          version: 4,
          status: "published",
          label: "v4",
          body_en: "Future English",
          body_am: "Future Amharic",
          changelog: "future material change",
          material: true,
          effective_at: new Date(Date.now() + 86_400_000).toISOString(),
          published_at: new Date().toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (future.error || !future.data)
        throw new Error(`[e2e:legal] future material seed: ${future.error?.message}`);
      extraVersionIds.push(future.data.id);
      const ahead = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      expect(ahead.error).toBeNull();
      expect(
        ahead.data,
        "accepted version stays accepted while the material version is ahead",
      ).toEqual([]);

      // A material version whose time has passed lists the kind again.
      const material = await supabase
        .from("legal_versions")
        .insert({
          document_id: fixture.documentId,
          version: 3,
          status: "published",
          label: "v3",
          body_en: "New English",
          body_am: "New Amharic",
          changelog: "material change",
          material: true,
          effective_at: new Date(Date.now() - 60_000).toISOString(),
          published_at: new Date(Date.now() - 60_000).toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (material.error || !material.data)
        throw new Error(`[e2e:legal] material seed: ${material.error?.message}`);
      fixture.draftId = material.data.id as string;
      const relisted = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      expect(relisted.error).toBeNull();
      expect((relisted.data as Row[]).map((r) => r["version_id"])).toContain(fixture.draftId);
      expect(relisted.data, "only the material version already in force is returned").toHaveLength(
        1,
      );

      // A country document applies only to a matching home country.
      const country = await seedFixture(kind, "DE");
      fixture.countryDocumentId = country.documentId;
      fixture.countryPublishedId = country.publishedId;
      const notMine = await caller.rpc("my_legal_status", { p_kinds: [`${RUN_TAG}-none`] });
      expect(notMine.error).toBeNull();
      const home = await supabase
        .from("profiles")
        .update({ home_country_code: "DE" })
        .eq("user_id", person.id);
      expect(home.error).toBeNull();
      const mine = await caller.rpc("my_legal_status", { p_kinds: [kind] });
      const mineIds = (mine.data as Row[]).map((r) => r["version_id"]);
      expect(mineIds).toContain(country.publishedId);
    } finally {
      await adminClient()
        .from("profiles")
        .update({ home_country_code: null })
        .eq("user_id", person.id);
      await (async () => {
        if (extraVersionIds.length === 0) return;
        const acceptances = await supabase
          .from("legal_acceptances")
          .delete()
          .in("version_id", extraVersionIds);
        if (acceptances.error) throw acceptances.error;
        const notices = await supabase
          .from("legal_notices")
          .delete()
          .in("version_id", extraVersionIds);
        if (notices.error) throw notices.error;
        const versions = await supabase.from("legal_versions").delete().in("id", extraVersionIds);
        if (versions.error) throw versions.error;
      })();
      await destroyFixture(fixture);
    }
  });

  test("LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written", async ({
    page,
  }) => {
    const plain = await leaseUser();
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    const supabase = adminClient();
    const before = await supabase.from("legal_settings").select("*").eq("id", true).single();
    if (before.error || !before.data)
      throw new Error(`[e2e:legal] settings read: ${before.error?.message}`);

    await useJobSuperAdmin(page);
    const staff = await asToken(await superAdminToken(page));
    const read = await staff.rpc("admin_legal_settings");
    expect(read.error).toBeNull();
    expect((read.data as Row)["operator_name"], "the seeded row").toBe("Ethio.com LLC");
    expect((read.data as Row)["notice_days"]).toBe(30);

    const asPlain = await asPerson(plain);
    const asAdmin = await asPerson(admin);
    for (const [who, caller] of [
      ["plain user", asPlain],
      ["admin by role", asAdmin],
    ] as const) {
      const refused = await caller.rpc("admin_legal_settings");
      expect(refused.error, `${who} is refused the settings read`).toContain("permission denied");
      const writeRefused = await caller.rpc("admin_set_legal_settings", {
        p_settings: { notice_days: 14 },
      });
      expect(writeRefused.error, `${who} is refused the settings write`).toContain(
        "permission denied",
      );
    }

    // A stale second factor (aal1 token of the pooled super admin) is refused the write.
    const stale = await asPerson(pooledSuperAdminCredentials());
    const staleRefused = await stale.rpc("admin_set_legal_settings", {
      p_settings: { notice_days: 14 },
    });
    expect(staleRefused.error, "stale second factor").not.toBeNull();
    expect(staleRefused.error).not.toContain("permission denied");

    // Bad values, each named (D5): a bad e-mail, an out-of-range number, an unknown key.
    const badEmail = await staff.rpc("admin_set_legal_settings", {
      p_settings: { legal_email: "not-an-email" },
    });
    expect(badEmail.error).toContain("badValue");
    const badRange = await staff.rpc("admin_set_legal_settings", {
      p_settings: { notice_days: 400 },
    });
    expect(badRange.error).toContain("badValue");
    const badKey = await staff.rpc("admin_set_legal_settings", { p_settings: { bogus: 1 } });
    expect(badKey.error).toContain("badValue");

    // The row was never written by this test (LG-6's rule).
    const after = await supabase.from("legal_settings").select("*").eq("id", true).single();
    expect(after.data).toEqual(before.data);
  });

  test("LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only", async ({
    page,
  }) => {
    const kind = `${RUN_TAG}-f`;
    const fixture = await seedFixture(kind, null);
    const person = await leaseUser();
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    try {
      const caller = await asPerson(person);
      await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "en",
        p_adult: true,
      });
      // A legal e-mail recorded by the service client (the sender's door, D4).
      const recorded = await adminClient().rpc("record_legal_notice", {
        p_user_id: person.id,
        p_version_id: fixture.publishedId,
        p_channel: "email",
        p_status: "sent",
        p_provider_ref: "e2e-ref",
      });
      expect(recorded.error, "the service role records a notice").toBeNull();

      const supabase = adminClient();
      const notice = await supabase
        .from("legal_notices")
        .select("id, status")
        .eq("user_id", person.id)
        .eq("version_id", fixture.publishedId)
        .single();
      if (notice.error || !notice.data)
        throw new Error(`[e2e:legal] notice read: ${notice.error?.message}`);
      const changedNotice = await supabase
        .from("legal_notices")
        .update({ status: "failed" })
        .eq("id", notice.data.id);
      expect(changedNotice.error?.message).toContain("noticeIsFinal");
      const keptNotice = await supabase
        .from("legal_notices")
        .select("status")
        .eq("id", notice.data.id)
        .single();
      expect(keptNotice.error).toBeNull();
      expect(keptNotice.data?.status).toBe(notice.data.status);

      // The same door refuses a signed-in user.
      const refused = await caller.rpc("record_legal_notice", {
        p_user_id: person.id,
        p_version_id: fixture.publishedId,
        p_channel: "email",
        p_status: "sent",
      });
      expect(refused.error, "record_legal_notice is service-only").toContain("permission denied");

      await useJobSuperAdmin(page);
      const staff = await asToken(await superAdminToken(page));
      const history = await staff.rpc("admin_user_legal_history", { p_user_id: person.id });
      expect(history.error).toBeNull();
      const h = history.data as Row;
      const acceptances = h["acceptances"] as Row[];
      const notices = h["notices"] as Row[];
      expect(acceptances.length).toBe(1);
      expect(acceptances[0]!["version_id"]).toBe(fixture.publishedId);
      expect(acceptances[0]!["language"]).toBe("en");
      expect(notices.length).toBe(1);
      expect(notices[0]!["channel"]).toBe("email");
      expect(notices[0]!["status"]).toBe("sent");

      const plainRefused = await caller.rpc("admin_user_legal_history", { p_user_id: person.id });
      expect(plainRefused.error, "a plain user is refused the staff history").toContain(
        "permission denied",
      );
      const asAdmin = await asPerson(admin);
      const adminHistory = await asAdmin.rpc("admin_user_legal_history", { p_user_id: person.id });
      // The admin role holds profiles:view, so it sees the history (the door's own permission, D5).
      expect(adminHistory.error).toBeNull();
    } finally {
      await destroyFixture(fixture);
    }
  });

  test("LG-8 my_legal_history and my_legal_version: the caller's own rows only; an accepted version stays readable after it is replaced", async () => {
    const kind = `${RUN_TAG}-g`;
    const fixture = await seedFixture(kind, null);
    const other = await seedFixture(`${RUN_TAG}-h`, null);
    const person = await leaseUser();
    const bystander = await leaseUser();
    try {
      const caller = await asPerson(person);
      await caller.rpc("accept_legal", {
        p_version_ids: [fixture.publishedId],
        p_language: "en",
        p_adult: true,
      });

      const history = await caller.rpc("my_legal_history");
      expect(history.error).toBeNull();
      const h = history.data as Row;
      expect((h["acceptances"] as Row[]).map((r) => r["version_id"])).toEqual([
        fixture.publishedId,
      ]);

      const otherCaller = await asPerson(bystander);
      const otherHistory = await otherCaller.rpc("my_legal_history");
      expect((otherHistory.data as Row)["acceptances"], "nobody else's rows").toEqual([]);

      // The accepted version's whole text, before and after a newer version replaces it.
      const supabase = adminClient();
      const before = await caller.rpc("my_legal_version", { p_version_id: fixture.publishedId });
      expect(before.error).toBeNull();
      expect((before.data as Row)["body_en"]).toBe("English body");
      const newer = await supabase
        .from("legal_versions")
        .insert({
          document_id: fixture.documentId,
          version: 2,
          status: "published",
          label: "v2",
          body_en: "Replacement English",
          body_am: "Replacement Amharic",
          changelog: "replaced",
          material: false,
          effective_at: new Date(Date.now() - 60_000).toISOString(),
          published_at: new Date(Date.now() - 60_000).toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (newer.error || !newer.data)
        throw new Error(`[e2e:legal] newer seed: ${newer.error?.message}`);
      fixture.draftId = newer.data.id as string;
      const still = await caller.rpc("my_legal_version", { p_version_id: fixture.publishedId });
      expect(still.error, "an accepted version stays readable").toBeNull();
      expect((still.data as Row)["body_en"]).toBe("English body");

      // The version in force is readable without acceptance.
      const inForce = await otherCaller.rpc("my_legal_version", {
        p_version_id: fixture.draftId,
      });
      expect(inForce.error).toBeNull();

      // Another document's version, neither accepted nor in force for him, is notYours —
      // proven with a FUTURE effective date so it is not in force for anyone.
      const future = await supabase
        .from("legal_versions")
        .insert({
          document_id: other.documentId,
          version: 2,
          status: "published",
          label: "v2",
          body_en: "Other English",
          body_am: "Other Amharic",
          changelog: "future",
          material: true,
          effective_at: new Date(Date.now() + 86_400_000).toISOString(),
          published_at: new Date().toISOString(),
          settings_snapshot: { seed: true },
        })
        .select("id")
        .single();
      if (future.error || !future.data)
        throw new Error(`[e2e:legal] future seed: ${future.error?.message}`);
      other.draftId = future.data.id as string;
      const notYours = await otherCaller.rpc("my_legal_version", { p_version_id: other.draftId });
      expect(notYours.error).toContain("notYours");
    } finally {
      await destroyFixture(fixture);
      await destroyFixture(other);
    }
  });

  test("LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included", async ({
    page,
  }) => {
    const fixture = await seedFixture(`${RUN_TAG}-i`, null);
    const plain = await leaseUser();
    const admin = await leaseUser();
    await grantRole(admin.id, "admin");
    try {
      // Service execution has no person's JWT: exercise the missing-caller gate,
      // without granting anonymous callers access to either staff function.
      const missingList = await adminClient().rpc("admin_legal_documents");
      expect(missingList.error?.message, "missing caller: staff list").toContain(
        "not authenticated",
      );
      const missingVersion = await adminClient().rpc("admin_legal_version", {
        p_version_id: fixture.publishedId,
      });
      expect(missingVersion.error?.message, "missing caller: staff version").toContain(
        "not authenticated",
      );

      const asPlain = await asPerson(plain);
      const asAdmin = await asPerson(admin);
      for (const [who, caller] of [
        ["plain user", asPlain],
        ["admin by role", asAdmin],
      ] as const) {
        const list = await caller.rpc("admin_legal_documents");
        expect(list.error, `${who}: staff list`).toContain("permission denied");
        const version = await caller.rpc("admin_legal_version", {
          p_version_id: fixture.publishedId,
        });
        expect(version.error, `${who}: staff version`).toContain("permission denied");
      }

      await useJobSuperAdmin(page);
      const staff = await asToken(await superAdminToken(page));
      const version = await staff.rpc("admin_legal_version", {
        p_version_id: fixture.publishedId,
      });
      expect(version.error).toBeNull();
      const body = version.data as Row;
      expect(body["label"]).toBe("v1");
      expect(body["body_en"]).toBe("English body");
      expect(body["body_am"]).toBe("Amharic body");
      expect(body["changelog"]).toBe("first version");
      expect(body["status"]).toBe("published");
      const unknown = await staff.rpc("admin_legal_version", {
        p_version_id: crypto.randomUUID(),
      });
      expect(unknown.error).toContain("unknownVersion");
      const list = await staff.rpc("admin_legal_documents");
      expect(list.error).toBeNull();
      expect(Array.isArray(list.data)).toBe(true);
    } finally {
      await destroyFixture(fixture);
    }
  });
  test("LG-10 admin_legal_documents lists a scratch document with each version's publisher and acceptance count, newest version first, after the real kinds", async ({
    page,
  }) => {
    const kind = `${RUN_TAG}-j`;
    const fixture = await seedFixture(kind, null);
    const person = await leaseUser();
    try {
      const job = await useJobSuperAdmin(page);
      const staff = await asToken(await superAdminToken(page));
      const saved = await staff.rpc("admin_save_legal_draft", {
        p_kind: kind,
        p_country: null,
        p_label: "v2",
        p_body_en: "English two",
        p_body_am: "Amharic two",
        p_changelog: "Second version",
      });
      expect(saved.error).toBeNull();
      const id = String((saved.data as Row)["version_id"]);
      fixture.draftId = id;
      const published = await staff.rpc("admin_publish_legal_version", {
        p_version_id: id,
        p_material: false,
      });
      expect(published.error).toBeNull();
      const caller = await asPerson(person);
      const accepted = await caller.rpc("accept_legal", {
        p_version_ids: [id],
        p_language: "en",
        p_adult: true,
      });
      expect(accepted.error).toBeNull();
      const profile = await adminClient()
        .from("profiles")
        .select("display_name")
        .eq("user_id", job.user.id)
        .single();
      expect(profile.error).toBeNull();
      const answer = await staff.rpc("admin_legal_documents");
      expect(answer.error).toBeNull();
      const documents = answer.data as Row[];
      const own = documents.find((d) => d["kind"] === kind);
      expect(own, "scratch document returned").toBeDefined();
      const versions = own?.["versions"] as Row[];
      expect(versions.map((v) => v["version"])).toEqual([2, 1]);
      expect(versions[0]?.["published_by_name"]).toBe(profile.data?.display_name);
      expect(versions[0]?.["acceptances"]).toBe(1);
      let scratchSeen = false;
      for (const doc of documents) {
        const docKind = String(doc["kind"]);
        if (docKind.startsWith("e2e-")) scratchSeen = true;
        if (["terms", "privacy", "publishing"].includes(docKind))
          expect(scratchSeen, "real kind before scratch kinds").toBe(false);
      }
    } finally {
      await destroyFixture(fixture);
    }
  });
});
