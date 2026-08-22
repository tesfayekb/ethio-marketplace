import { expect, test } from "./fixtures";
import { readFileSync } from "node:fs";

import { en } from "../src/i18n/locales/en";
import { STATE_FILE, type E2EUser } from "./global-setup";
import { expectSignedIn, expectSignedOut, signIn } from "./helpers/ui";
import { createUser, mintConfirmationLink } from "./helpers/users";

test("C-1: a fresh confirmation link signs the user in", async ({ page }) => {
  const user = await createUser({ confirmed: false });
  const link = await mintConfirmationLink(user);

  await page.goto(link);
  await expectSignedIn(page, user.displayName);
});

test("C-2: a replayed confirmation link fails honestly", async ({ browser }) => {
  const user = await createUser({ confirmed: false });
  const link = await mintConfirmationLink(user);

  const first = await browser.newContext();
  await (await first.newPage()).goto(link);
  await first.close();

  // Fresh context: no session to mask the replay.
  const second = await browser.newContext();
  const page = await second.newPage();
  await page.goto(link);

  await expect(
    page
      .getByRole("heading", { name: en["auth.linkInvalid"] })
      .or(page.getByRole("heading", { name: en["auth.noSessionTitle"] })),
  ).toBeVisible({ timeout: 15000 });
  await expectSignedOut(page);
  await second.close();
});

test("C-3: an already-confirmed user gets the honest already-confirmed surface", async ({
  page,
}) => {
  const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
  await signIn(page, user.email, user.password);
  await expectSignedIn(page, user.displayName);

  await page.goto("/auth?view=check-email");
  await expect(
    page
      .getByText(en["auth.confirmedInline"])
      .or(page.getByRole("button", { name: en["auth.alreadyConfirmedSignIn"] })),
  ).toBeVisible({ timeout: 15000 });
});

test("C-4: INC-010a guard — the callback exposes no arbitrary-recipient resend", async ({
  page,
}) => {
  await page.goto("/auth/callback");
  await expect(page.getByText(en["auth.checking"])).toHaveCount(0, { timeout: 15000 });

  // No free-text address capture of any kind on this surface.
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
  await expect(page.locator('input[type="text"]')).toHaveCount(0);
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await expect(page.getByRole("button", { name: new RegExp(en["auth.resend"], "i") })).toHaveCount(
    0,
  );
});
