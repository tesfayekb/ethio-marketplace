import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { leaseUser } from "./helpers/users";

/**
 * INC-1286 (cursor bundle 7b) — THE SHELL SAYS OFFLINE ONCE. While the device is offline and a read
 * waits for it, the notice dock carries one line (`shell.offline`); when the device is back the
 * waiting read resumes by itself and the line leaves, with no reload and no tap. The waiting read
 * is the saved page's own (a signed-in visit; a stale read refetches when the tab shows again, which
 * the browser says with `visibilitychange`). Read-only: no rows are written.
 */
test.describe("OFFLINE — a waiting read says so (INC-1286)", () => {
  test("OFF-1 offline with a read waiting shows the shell's line once; back online it leaves by itself", async ({
    page,
    context,
  }) => {
    const buyer = await leaseUser();
    await signInViaSession(page, buyer.email, buyer.password);
    await gotoReady(page, "/account/saved");
    await expect(page.getByTestId("saved-empty")).toBeVisible();
    const line = page.getByTestId("shell-offline");
    await expect(line).toHaveCount(0);

    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event("visibilitychange")));
    await expect(line).toHaveText(en["shell.offline"]);
    await expect(line).toHaveCount(1);

    await context.setOffline(false);
    await expect(line).toHaveCount(0);
    await expect(page.getByTestId("saved-empty")).toBeVisible();
    await expect(page.getByTestId("on-demand-failed")).toHaveCount(0);
  });
});
