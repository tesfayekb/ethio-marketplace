import { expect, test } from "./fixtures";
import { adPageFixtures, token } from "./helpers/ad-page";
import { passwordGrant } from "./helpers/session";
import { adminClient } from "./helpers/users";
import { listingPath } from "../src/features/ad-page/address";
import en from "../src/i18n/locales/en";

/**
 * N1b-2c (INC-977) — A SELLER NAME THE RE-CHECK FINDS TO IMITATE IS HIDDEN FROM
 * BUYERS UNTIL STAFF DECIDE. The scratch seller (J9 pool, J1 e2e names) saves its own
 * name through the door (an 'unchecked' check row, the door's own write), and the
 * name is held only through name_check_mark with the service client (R7) — nothing is
 * written to name_checks by hand. afterEach marks the name 'clean' again before the
 * scratch reap, so a held name never outlives its test (J3), a timeout included.
 */
function restBase(): { url: string; key: string } {
  const url = process.env["E2E_SUPABASE_URL"];
  const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key)
    throw new Error("[e2e:snh] E2E_SUPABASE_URL and the publishable key must be set.");
  return { url: url.replace(/\/+$/, ""), key };
}

/** The seller's own door call, signed in from node. */
async function saveOwnAlias(person: { email: string; password: string }, alias: string) {
  const { url, key } = restBase();
  const session = await passwordGrant(person.email, person.password);
  const response = await fetch(`${url}/rest/v1/rpc/save_posting_identity`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_alias: alias }),
  });
  const body = (await response.json()) as { ok?: boolean };
  if (!response.ok || body.ok !== true)
    throw new Error(`[e2e:snh] saving the scratch name failed: HTTP ${response.status}`);
}

async function mark(profileId: string, text: string, state: "clean" | "imitates") {
  const { data, error } = await adminClient().rpc("name_check_mark", {
    p_profile: profileId,
    p_subject: "alias",
    p_text: text,
    p_state: state,
  });
  if (error || data !== true)
    throw new Error(`[e2e:snh] name_check_mark ${state} failed: ${error?.message ?? "no row"}`);
}

test.describe("SELLER NAME — an imitating name is hidden from buyers (N1b-2, INC-977)", () => {
  const { scratchSeller, seed, publicIdOf, cleanup } = adPageFixtures();
  const held: Array<{ id: string; alias: string }> = [];
  test.afterEach(async () => {
    try {
      for (const entry of held.splice(0)) await mark(entry.id, entry.alias, "clean");
    } finally {
      await cleanup();
    }
  });

  test("SPA-E2E-1 a held name: the ad shows the neutral label with no link, and /<name> is not found", async ({
    page,
  }) => {
    const seller = await scratchSeller();
    const alias = `ehold_${token()}`;
    await saveOwnAlias(seller, alias);
    const ad = await seed(seller);
    const canonical = listingPath(ad.title, await publicIdOf(ad.id));

    // Before the hold: the name and its link show (the control).
    await page.goto(canonical);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await expect(page.getByTestId("listing-detail-seller-name")).toHaveText(alias);
    await expect(page.getByTestId("listing-seller-all-ads")).toHaveAttribute("href", `/${alias}`);

    await mark(seller.id, alias, "imitates");
    held.push({ id: seller.id, alias });

    // A visitor: the neutral label, no link to the seller's page, the name nowhere in the bytes.
    const response = await page.goto(canonical);
    expect(response?.status()).toBe(200);
    await expect(page.getByTestId("listing-detail-title")).toHaveText(ad.title);
    await expect(page.getByTestId("listing-detail-seller-name")).toHaveText(
      en["post.seller.neutral"],
    );
    await expect(page.getByTestId("listing-seller-all-ads")).toHaveCount(0);
    expect(await page.content()).not.toContain(alias);

    // /<name>: not found, exactly as an unknown name — the same status and the same page.
    const gone = await page.request.get(`/${alias}`);
    expect(gone.status()).toBe(404);
    const unknown = await page.request.get(`/nobody_${token()}`);
    expect(unknown.status()).toBe(404);
    await page.goto(`/${alias}`);
    await expect(page.getByTestId("seller-page-gone")).toBeVisible();
    await expect(page.getByTestId("seller-page-title")).toHaveCount(0);
  });
});
