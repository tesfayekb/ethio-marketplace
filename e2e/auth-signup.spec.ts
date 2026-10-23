import { type Page, type Response } from "@playwright/test";
import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { authErrorText, testEmail } from "./global-setup";
import { signUpThroughForm } from "./helpers/auth-form";
import { fillUntilStable, waitForHydration } from "./helpers/ui";
import { adminClient } from "./helpers/users";

const RUN_ID = process.env["GITHUB_RUN_ID"] ?? "local";

/**
 * INC-082 — the Auth email/signup rate limit is a PROJECT-WIDE, PER-HOUR quota.
 * Every send here consumes it, so this file runs in ONE process only (the
 * `email-serial` Playwright project + its own CI job), never sharded.
 */
test.describe.configure({ mode: "serial" });

/** Raw Auth rate-limit codes. The UI maps all of them to one generic string. */
const RATE_LIMIT_CODES = ["over_email_send_rate_limit", "over_request_rate_limit"];

/**
 * Watches the Auth API and records the RAW error code of any 429 — the UI shows
 * a translated generic message, which is exactly what masked INC-082.
 *
 * SCOPED (INC-082 addendum): a 429 on RESEND is the feature (P1-c resend
 * hardening); a 429 on SIGN-UP is exhausted staging quota. The watcher is armed
 * for the sign-up phase only and is DISARMED by the caller the moment the
 * check-email view is proven — mechanism: explicit phase disarm (the sign-up
 * and resend phases both hit POST /auth/v1/signup plus /auth/v1/resend, so URL
 * filtering alone cannot separate them).
 */
function watchAuthRateLimit(page: Page) {
  const seen: string[] = [];
  let armed = true;
  const onResponse = (response: Response) => {
    if (!armed) return;
    if (!/\/auth\/v1\//.test(response.url())) return;
    if (response.status() !== 429) return;
    void response
      .json()
      .then((body: { error_code?: string; code?: string; msg?: string; message?: string }) => {
        seen.push(
          `429 ${body.error_code ?? body.code ?? "unknown"}: ${body.msg ?? body.message ?? ""}`.trim(),
        );
      })
      .catch(() => seen.push("429 unknown (unparseable body)"));
  };
  page.on("response", onResponse);
  return {
    /** Stop recording — everything after this point is the resend phase. */
    disarm: () => {
      armed = false;
      page.off("response", onResponse);
    },
    hit: () => seen.length > 0,
    /** Human-readable, self-naming reason for the report. */
    reason: () =>
      `AUTH RATE LIMIT hit during SIGN-UP — staging email quota exhausted; retry after the window. Raw: ${
        seen.join(" | ") || RATE_LIMIT_CODES.join("/")
      }`,
  };
}

/** Drives the real sign-up form to the check-email view. Returns the address used. */
async function signUpFresh(page: Page, n: number) {
  const email = testEmail(RUN_ID, n);
  await signUpThroughForm(page, { email, password: `Pw-${n}-aX9!qmzT` });
  return email;
}

/**
 * Diagnostic: if sign-up failed, surface the app's own error text instead of a
 * bare "heading not found". Waits for whichever surface appears first, so a
 * collision ("already registered") reads as that text in the failure report.
 *
 * INC-082: when the raw 429 was observed, the failure NAMES the quota instead
 * of quoting the generic UI string. No retry loop — the limit is per-hour.
 */
async function assertNoSignUpError(page: Page, limit: ReturnType<typeof watchAuthRateLimit>) {
  const alertRegion = page.getByRole("alert");
  const heading = page.getByRole("heading", { name: en["auth.checkEmail"] });
  const outcome = await expect
    .poll(
      async () => {
        if (await heading.count()) return "ok";
        if (limit.hit()) return limit.reason();
        // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
        if (await alertRegion.count()) return (await alertRegion.first().innerText()).trim();
        return "pending";
      },
      { timeout: 15000, message: "sign-up surfaced an error instead of check-email" },
    )
    .toBe("ok")
    .then(() => "ok" as const);
  return outcome;
}

const EMAIL_SINK = process.env["E2E_EMAIL_SINK"] === "1";

const acceptanceKinds = new Set<string>();
let acceptanceEmail: string | undefined;
async function signupUser(email: string) {
  for (let pageNo = 1; pageNo <= 20; pageNo += 1) {
    const result = await adminClient().auth.admin.listUsers({ page: pageNo, perPage: 1000 });
    if (result.error) throw new Error(`[e2e:su3] users read: ${authErrorText(result.error)}`);
    const user = result.data.users.find(
      (user) => user.email?.toLowerCase() === email.toLowerCase(),
    );
    if (user) return user;
    if (result.data.users.length < 1000) return undefined;
  }
  throw new Error("[e2e:su3] user lookup exceeded the catalogue bound");
}
test.afterEach(async () => {
  const client = adminClient();
  const failures: string[] = [];
  const fail = (error: { message: string } | null, phase: string) => {
    if (error) failures.push(`${phase}: ${error.message}`);
  };
  if (acceptanceEmail) {
    const user = await signupUser(acceptanceEmail);
    if (user) {
      const removed = await client.auth.admin.deleteUser(user.id);
      fail(removed.error ? { message: authErrorText(removed.error) } : null, "account");
      fail(
        (await client.from("legal_acceptances").delete().eq("user_id", user.id)).error,
        "acceptances",
      );
    }
    acceptanceEmail = undefined;
  }
  for (const kind of acceptanceKinds) {
    const docs = await client.from("legal_documents").select("id").eq("kind", kind);
    fail(docs.error, "documents read");
    for (const doc of docs.data ?? []) {
      const versions = await client.from("legal_versions").select("id").eq("document_id", doc.id);
      fail(versions.error, "versions read");
      const ids = (versions.data ?? []).map((version) => version.id);
      if (ids.length) {
        fail(
          (await client.from("legal_acceptances").delete().in("version_id", ids)).error,
          "version acceptances",
        );
        fail((await client.from("legal_notices").delete().in("version_id", ids)).error, "notices");
        fail((await client.from("legal_versions").delete().in("id", ids)).error, "versions");
      }
      fail((await client.from("legal_documents").delete().eq("id", doc.id)).error, "document");
    }
    acceptanceKinds.delete(kind);
  }
  if (failures.length) throw new Error(`[e2e:su3] cleanup failed: ${failures.join("; ")}`);
});

test.describe("A: sign-up + resend (needs a recipient-agnostic mail sink)", () => {
  test.skip(
    !EMAIL_SINK,
    "INC-013: ethio-staging SMTP (Resend test domain) rejects non-owner recipients, so real sign-up cannot complete. Set E2E_EMAIL_SINK=1 once staging points at a mail sink.",
  );

  /**
   * A-1 + A-2 MERGED (P1-g Step T). They were two sign-ups, and every sign-up
   * costs a real send against the staging sink — the INC-018 pacing that made
   * them slow was itself the evidence that the second send was the problem.
   * One sign-up now carries both assertions: the check-email view (A-1) and the
   * resend throttle on the very next click (A-2). No assertion was dropped.
   */
  test("A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle", async ({
    page,
  }) => {
    const limit = watchAuthRateLimit(page);
    const email = await signUpFresh(page, 101);
    await assertNoSignUpError(page, limit);

    // A-1 — the check-email view, echoing the exact address used.
    await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible({
      timeout: 15000,
    });
    const sentTo = en["auth.checkEmailSentTo"].replace("{email}", email);
    await expect(page.getByText(sentTo, { exact: false })).toBeVisible();

    // Sign-up phase is PROVEN — a 429 from here on is the throttle under test.
    // A 429 on resend is the feature; a 429 on sign-up is exhausted staging
    // quota (INC-082).
    expect(limit.hit(), limit.reason()).toBe(false);
    limit.disarm();

    const resend = page.getByRole("button", { name: en["auth.resend"] });
    await expect(resend).toBeVisible();

    // A-2 — the cooldown engages on the first click (INC-017: on initiation).
    await resend.click();
    const cooldownPrefix = en["auth.resendCooldown"].split("{s}")[0]!.trim();
    const throttled = page.getByRole("button", { name: new RegExp(cooldownPrefix, "i") });
    await expect(throttled).toBeVisible({ timeout: 15000 });
    await expect(throttled).toBeDisabled();
  });
  /** Turn 32 F4 — the scratch document seed SU-3 and SU-4 share (J1 namespaced kinds). */
  async function seedAcceptanceKinds(kinds: string[]) {
    const versions: string[] = [];
    for (const kind of kinds) {
      acceptanceKinds.add(kind);
      const doc = await adminClient()
        .from("legal_documents")
        .insert({ kind, country_code: null })
        .select("id")
        .single();
      if (doc.error || !doc.data)
        throw new Error(`[e2e:su3] document seed: ${doc.error?.message}`);
      const version = await adminClient()
        .from("legal_versions")
        .insert({
          document_id: doc.data.id,
          version: 1,
          status: "published",
          label: "v1",
          body_en: "## Scratch\nScratch English text 1",
          body_am: "Scratch Amharic text 1",
          changelog: "scratch change",
          material: false,
          effective_at: new Date(Date.now() - 60_000).toISOString(),
          published_at: new Date(Date.now() - 60_000).toISOString(),
          settings_snapshot: { seed: "true" },
        })
        .select("id")
        .single();
      if (version.error || !version.data)
        throw new Error(`[e2e:su3] version seed: ${version.error?.message}`);
      versions.push(version.data.id);
    }
    return versions;
  }

  test(
    "SU-3 a document published after the form's tick and before the first sign-in meets the acceptance before any page",
    { tag: "@private-identity" },
    async ({ page }) => {
      const info = test.info();
      const tag =
        `e2e-su3-${RUN_ID.replace(/[^a-z0-9]/gi, "").slice(-8)}-${(process.env["E2E_SHARD"] ?? "local").replace(/[^a-z0-9]/gi, "").slice(0, 5)}-${info.workerIndex}-email-${Math.random().toString(36).slice(2, 7)}`.toLowerCase();
      const kinds = [`${tag}-terms`, `${tag}-privacy`];
      const email = testEmail(RUN_ID, 193);
      acceptanceEmail = email;
      const password = "Pw-193-aX9!qmzT";
      const limit = watchAuthRateLimit(page);
      // The form finds nothing to record: the scratch versions are seeded ONLY
      // after the sign-up succeeds, so the gate owes them at the first sign-in.
      await signUpThroughForm(page, { email, password, agree: true });
      await assertNoSignUpError(page, limit);
      await expect(page.getByRole("heading", { name: en["auth.checkEmail"] })).toBeVisible();
      await expect(
        page.getByText(en["auth.checkEmailSentTo"].replace("{email}", email), { exact: false }),
      ).toBeVisible();
      expect(limit.hit(), limit.reason()).toBe(false);
      limit.disarm();
      const versions = await seedAcceptanceKinds(kinds);
      await page.addInitScript((list) => {
        (window as unknown as { __ethioLegalKinds?: string[] }).__ethioLegalKinds = list;
      }, kinds);
      const user = await signupUser(email);
      if (!user) throw new Error("[e2e:su3] signup account missing");
      // Only the mail-link step is done for the person; signup and sign-in use the real forms.
      const confirmed = await adminClient().auth.admin.updateUserById(user.id, {
        email_confirm: true,
      });
      if (confirmed.error)
        throw new Error(`[e2e:su3] email confirmation: ${authErrorText(confirmed.error)}`);
      await page.goto("/auth");
      await waitForHydration(page);
      await fillUntilStable(page.getByRole("textbox", { name: /email/i }), email, "email");
      await fillUntilStable(page.locator("#auth-password"), password, "password");
      await page
        .getByRole("button", { name: new RegExp(`^${en["auth.signInButton"]}$`, "i") })
        .click();
      await expect(page).toHaveURL(/\/legal\/accept(?:\?|$)/);
      await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
      await expect(page.getByTestId("legal-accept-doc")).toHaveCount(2);
      for (const path of ["/", "/post", "/account"]) {
        await page.goto(path);
        await expect(page, `${path} meets acceptance first`).toHaveURL(/\/legal\/accept(?:\?|$)/);
        await expect(page.getByTestId("legal-accept-screen")).toBeVisible();
      }
      await page.getByTestId("legal-accept-tick").click();
      await page.getByTestId("legal-accept-submit").click();
      await expect(page).toHaveURL(/\/account$/);
      const rows = await adminClient()
        .from("legal_acceptances")
        .select("version_id, adult_confirmed")
        .eq("user_id", user.id)
        .in("version_id", versions);
      if (rows.error) throw new Error(`[e2e:su3] acceptance read: ${rows.error.message}`);
      expect(rows.data).toHaveLength(2);
      for (const versionId of versions)
        expect(rows.data?.filter((row) => row.version_id === versionId)).toHaveLength(1);
      expect(rows.data?.every((row) => row.adult_confirmed)).toBe(true);
      await page.goto("/");
      await expect(page).toHaveURL(/\/$/);
      await expect(page.getByTestId("legal-accept-screen")).toHaveCount(0);
    },
  );
});

/**
 * Bundle 11 C4 (D143, the operator) — sign-up asks for the password twice; two
 * passwords that differ are refused on the form and no sign-up request leaves.
 * Needs no mail sink: nothing is sent.
 */
test("SU-1 sign-up asks for the password twice, and a mismatch sends nothing", async ({ page }) => {
  const signups: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/auth/v1/signup")) signups.push(request.url());
  });
  await page.goto("/auth");
  await waitForHydration(page);
  await expect(page.locator("#auth-password-confirm")).toHaveCount(0);
  await page.getByTestId("auth-toggle-view").click();
  await expect(page.locator("#auth-password-confirm")).toBeVisible();

  await fillUntilStable(
    page.getByRole("textbox", { name: /email/i }),
    testEmail(RUN_ID, 191),
    "email",
  );
  await fillUntilStable(page.locator("#auth-password"), "Pw-191-aX9!qmzT", "password");
  await fillUntilStable(
    page.locator("#auth-password-confirm"),
    "Pw-191-aX9!qmzt",
    "password confirmation",
  );
  await page.getByRole("button", { name: new RegExp(`^${en["auth.signUpButton"]}$`, "i") }).click();
  await expect(page.getByRole("alert")).toHaveText(en["auth.errorPasswordMismatch"]);
  expect(signups, "SU-1 a mismatch sent a sign-up request").toEqual([]);
});

/**
 * D185 — a sign-up at a throwaway mail service is refused by the server's
 * Before User Created hook, shown in words, and no account is made.
 */
test("SU-2 a throwaway mail address is refused at sign-up, in words, and no account is made (D185)", async ({
  page,
}) => {
  const email = `e2e-su2-${RUN_ID}-${Date.now().toString(36)}@mailinator.com`;
  const password = "Pw-192-aX9!qmzT";
  await page.goto("/auth");
  await waitForHydration(page);
  await page.getByTestId("auth-toggle-view").click();
  await fillUntilStable(page.getByRole("textbox", { name: /email/i }), email, "email");
  await fillUntilStable(page.locator("#auth-password"), password, "password");
  await fillUntilStable(page.locator("#auth-password-confirm"), password, "password confirmation");
  await page.getByRole("button", { name: new RegExp(`^${en["auth.signUpButton"]}$`, "i") }).click();

  const heading = page.getByRole("heading", { name: en["auth.checkEmail"] });
  const outcome = await expect
    .poll(
      async () => {
        if (await heading.count()) {
          return "SU-2: the Before User Created hook is not switched on in ethio-staging";
        }
        if (await page.getByText(en["auth.errorDisposableEmail"]).count()) return "refused";
        return "pending";
      },
      { timeout: 15000, message: "SU-2: the sign-up showed neither the refusal nor check-email" },
    )
    .not.toBe("pending")
    .then(async () =>
      (await heading.count())
        ? "SU-2: the Before User Created hook is not switched on in ethio-staging"
        : "refused",
    );
  expect(outcome, outcome).toBe("refused");
  await expect(page.getByText(en["auth.errorDisposableEmail"])).toBeVisible();

  const found: string[] = [];
  for (let pageNo = 1; pageNo <= 20; pageNo += 1) {
    const { data, error } = await adminClient().auth.admin.listUsers({
      page: pageNo,
      perPage: 1000,
    });
    if (error) throw new Error(`[e2e:su2] listing users failed: ${authErrorText(error)}`);
    found.push(...data.users.filter((u) => u.email?.toLowerCase() === email).map((u) => u.id));
    if (data.users.length < 1000) break;
  }
  expect(found, "SU-2: an account was made for a throwaway address").toEqual([]);
});
