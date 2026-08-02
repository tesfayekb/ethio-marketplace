import { expect, type Locator, type Page } from "@playwright/test";

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c). */
export async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
}

/** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
  await expect(input, `${fieldName} field is not editable`).toBeEditable();

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    await input.fill("");
    await input.fill(value);

    try {
      await expect(input, `${fieldName} fill attempt ${attempt} did not stick`).toHaveValue(value, {
        timeout: 500,
      });
      await input.page().waitForTimeout(150);
      await expect(input, `${fieldName} was cleared after fill attempt ${attempt}`).toHaveValue(
        value,
        { timeout: 500 },
      );
      return;
    } catch (error) {
      if (attempt === 5) throw error;
      await input.page().waitForTimeout(150);
    }
  }
}

/**
 * Cold-start SSR can expose editable inputs before React hydrates them.
 * Lifted verbatim from the smoke spec's inline waitForFunction.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(
    () => {
      const input = document.querySelector('input[type="email"]');
      return input && Object.keys(input).some((key) => key.startsWith("__reactProps$"));
    },
    undefined,
    { timeout: 15000 },
  );
}

/** Drives the real sign-in form. Asserts nothing about the outcome. */
export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth");
  await waitForHydration(page);

  const emailInput = page.getByRole("textbox", { name: /email/i });
  const passwordInput = page.locator("#auth-password");

  await fillUntilStable(emailInput, email, "email");
  await fillUntilStable(passwordInput, password, "password");

  await expect(emailInput).toHaveValue(email);
  await expect(passwordInput).toHaveValue(password);

  // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  await page.getByRole("button", { name: /^sign in$/i }).click();
}

export async function expectSignedIn(page: Page, displayName: string) {
  const signOutButton = page.getByRole("button", { name: /sign out/i });
  await signOutButton.waitFor({ state: "visible", timeout: 15000 });
  await expect(signOutButton).toBeVisible();
  await expect(page.getByText(displayName, { exact: false })).toBeVisible();
}

export async function expectSignedOut(page: Page) {
  await expect(page.getByRole("button", { name: /sign out/i })).toHaveCount(0);
}
