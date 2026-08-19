import { expect, test, type Page, type Response } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { testEmail } from "./global-setup";
import { fillUntilStable, waitForHydration } from "./helpers/ui";

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
  const password = `Pw-${n}-aX9!qmzT`;

  await page.goto("/auth");
  await waitForHydration(page);
  await page.getByRole("button", { name: en["auth.toggleToSignUp"] }).click();

  await fillUntilStable(page.getByRole("textbox", { name: /email/i }), email, "email");
  await fillUntilStable(page.locator("#auth-password"), password, "password");
  await page.getByRole("button", { name: new RegExp(`^${en["auth.signUpButton"]}$`, "i") }).click();

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

});
