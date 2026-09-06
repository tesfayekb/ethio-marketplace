import { expect, test } from "./fixtures";

import { adminClient } from "./helpers/users";

/**
 * STAB-I18N (INC-164) — THE CACHEABLE UI BUNDLE, PROVED AT THE HTTP SURFACE.
 *
 * No page, no viewport twin, no provider key: these are request-context tests
 * against `/api/i18n/:lang`, so nothing here depends on fake mode.
 *
 * J-LAWS: the scratch language is namespaced run x shard x worker x project
 * (J1) and deleted in `finally` together with its rows (J3); DB truth is read
 * back with the service client (J4); every row is seeded BEFORE the first GET
 * (J7); every poll is bounded well inside the test budget and dumps the values
 * it saw when it gives up (J4 dump law).
 */

const RUN = process.env["E2E_SHARD"] ?? "local";
/** The route validates `^[a-z]{2,8}(-[a-z0-9]{2,8})?$` — the code must fit it. */
function scratchLang(): string {
  const worker = process.env["TEST_WORKER_INDEX"] ?? "0";
  const project = test.info().project.name.slice(0, 2).toLowerCase();
  const run = RUN.replace(/[^a-z0-9]/gi, "").slice(0, 2) || "lo";
  return `zxb-${run}${worker}${project}`.toLowerCase().slice(0, 12);
}

/** The route's in-process version TTL is 15s; this poll outlives it. */
const VERSION_POLL_MS = 60_000;

interface BundlePayload {
  lang: string;
  bundle: Record<string, string>;
}

async function ensureLanguage(code: string, published: boolean) {
  const { error } = await adminClient()
    .from("languages")
    .upsert(
      {
        code,
        name_en: `E2E Bundle ${code}`,
        name_native: "E2E",
        enabled_admin: true,
        enabled_public: published,
      },
      { onConflict: "code" },
    );
  if (error) throw new Error(`[e2e:stab-i18n] language ${code} upsert failed: ${error.message}`);
}

async function seedApproved(code: string, key: string, value: string) {
  const { error } = await adminClient()
    .from("ui_translations")
    .upsert(
      [
        { key, lang_code: "en", value: `en ${value}`, status: "approved", machine: false },
        { key, lang_code: code, value, status: "approved", machine: false },
      ],
      { onConflict: "key,lang_code" },
    );
  if (error) throw new Error(`[e2e:stab-i18n] seeding ${key} failed: ${error.message}`);
}

async function cleanup(code: string, key: string) {
  const supabase = adminClient();
  await supabase.from("ui_translations").delete().eq("key", key);
  await supabase.from("ui_translations").delete().eq("lang_code", code);
  await supabase.from("languages").delete().eq("code", code);
}

test.describe("STAB-I18N · cached translation bundle", () => {
  test("IB-1 repeated GETs are identical, validated, and 304 on If-None-Match", async ({
    request,
  }) => {
    const code = scratchLang();
    const key = `e2e.bundle.${code}`;
    await ensureLanguage(code, true);
    await seedApproved(code, key, "seeded value");
    try {
      const first = await request.get(`/api/i18n/${code}`);
      expect(first.status(), "first GET").toBe(200);
      const firstEtag = first.headers()["etag"];
      expect(firstEtag, "first response carries a strong validator").toBeTruthy();
      expect(firstEtag?.startsWith("W/")).toBe(false);
      const firstBody = (await first.json()) as BundlePayload;
      expect(firstBody.lang).toBe(code);
      expect(firstBody.bundle[key]).toBe("seeded value");

      const second = await request.get(`/api/i18n/${code}`);
      expect(second.status(), "second GET").toBe(200);
      expect(second.headers()["etag"], "ETag is stable across identical data").toBe(firstEtag);
      const secondBody = (await second.json()) as BundlePayload;
      expect(secondBody, "the cached body is byte-equal").toEqual(firstBody);

      const conditional = await request.get(`/api/i18n/${code}`, {
        headers: { "If-None-Match": firstEtag ?? "" },
      });
      expect(conditional.status(), "If-None-Match is honoured").toBe(304);
    } finally {
      await cleanup(code, key);
    }
  });

  test("IB-2 publishing a fence language moves the version and the bundle", async ({ request }) => {
    test.setTimeout(150_000); // two bounded TTL windows (15s each) + seeding.
    const code = scratchLang();
    const key = `e2e.bundle.pub.${code}`;
    await ensureLanguage(code, false);
    await seedApproved(code, key, "published value");
    try {
      const unpublished = await request.get(`/api/i18n/${code}`);
      expect(unpublished.status()).toBe(200);
      const beforeEtag = unpublished.headers()["etag"];
      const beforeBody = (await unpublished.json()) as BundlePayload;
      expect(beforeBody.bundle[key], "an unpublished language serves no rows").toBeUndefined();

      await ensureLanguage(code, true);
      const { data: published, error } = await adminClient()
        .from("languages")
        .select("enabled_public")
        .eq("code", code)
        .maybeSingle();
      if (error) throw new Error(`[e2e:stab-i18n] publish read-back failed: ${error.message}`);
      expect(published?.enabled_public, "DB truth: the language is published").toBe(true);

      const deadline = Date.now() + VERSION_POLL_MS;
      let lastEtag = beforeEtag;
      let lastBody: BundlePayload | null = null;
      while (Date.now() < deadline) {
        const response = await request.get(`/api/i18n/${code}`);
        expect(response.status()).toBe(200);
        lastEtag = response.headers()["etag"];
        lastBody = (await response.json()) as BundlePayload;
        if (lastBody.bundle[key] === "published value") break;
        await new Promise((resolve) => setTimeout(resolve, 2_000));
      }
      expect(
        lastBody?.bundle[key],
        `bundle after publish (etag before=${beforeEtag} after=${lastEtag}, ` +
          `payload=${JSON.stringify(lastBody)})`,
      ).toBe("published value");
      expect(lastEtag, "the validator moved with the publication version").not.toBe(beforeEtag);
    } finally {
      await cleanup(code, key);
    }
  });
});
