import { join } from "node:path";

import { expect, test } from "./fixtures";

import {
  clearUploadCounter,
  downloadObject,
  fillUploadCounter,
  keyOf,
  objectExists,
  objectsUnder,
  photoAction,
  photoRowsOf,
  purgeListingObjects,
  reasons,
  scanForMetadata,
  uploadPhoto,
} from "./helpers/photos";
import {
  bearerOf,
  destroyListingsOf,
  destroyPostableCategory,
  postRoute,
  seedPostableCategory,
} from "./helpers/posting";
import { gotoReady, signInViaSession } from "./helpers/ui";
import { createUser } from "./helpers/users";

/**
 * U6-B1 — THE PHOTO PIPELINE (PP-1..PP-9), REQ-036's acceptance.
 *
 * PP-1 and PP-2 ARE THE DENY-PROOF: a real camera-shaped JPEG, PNG and WebP go
 * in carrying GPS, XMP and ICC containers; what comes BACK OUT OF STORAGE is
 * scanned twice — once by the strip module's own self-check and once by this
 * file's independent scan, written from the format specifications — and must
 * carry none of them, with `exif_stripped = true` on the row.
 *
 * J-laws: the seller is pool-minted (their own identity), the category is
 * namespaced scratch, every assertion reads DB truth or the stored object through
 * the service client, and cleanup runs in an `afterEach` that survives a timeout.
 */

const DRAFT = "/api/listings/draft";

/** The tile tests (PP-10) pick a real file from the device, as a seller does. */
const FIXTURE = join(
  import.meta.dirname ?? new URL(".", import.meta.url).pathname,
  "../scripts/fixtures/photos/gps.jpg",
);

test.describe("PHOTO PIPELINE", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const objects: { userId: string; listingId: string }[] = [];

  test.afterEach(async () => {
    // J3 — an afterEach survives a body timeout; a `finally` in the body does not.
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) {
      await clearUploadCounter(sellerId);
      await destroyListingsOf(sellerId);
    }
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seller(page: import("@playwright/test").Page) {
    const user = await createUser({ confirmed: true });
    sellers.push(user.id);
    await signInViaSession(page, user.email, user.password);
    await gotoReady(page, "/");
    return { user, token: await bearerOf(page) };
  }

  /** A step-1 scratch draft, which is a status that may gain photos. */
  async function draft(
    page: import("@playwright/test").Page,
    token: string,
    userId: string,
  ): Promise<string> {
    const row = await seedPostableCategory();
    categories.push(row.slug);
    const answer = await postRoute(
      page,
      DRAFT,
      { step: 1, categoryId: row.id },
      { token, country: "ET" },
    );
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    const listingId = String(answer.payload["listing_id"] ?? "");
    expect(
      listingId,
      `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
    ).not.toBe("");
    objects.push({ userId, listingId });
    return listingId;
  }

  test("PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    const answer = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);

    // DB truth (J4): the row, and the DEC-009 gate it carries.
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-1: the door registered no photo row").toHaveLength(1);
    const row = rows[0]!;
    expect(row.exif_stripped, "PP-1: exif_stripped is the DEC-009 gate").toBe(true);
    expect(row.width).toBe(800);
    expect(row.height).toBe(600);

    // THE DENY-PROOF: the object as stored, scanned twice.
    const stored = await downloadObject(keyOf(row, "cover"));
    const scan = scanForMetadata(stored);
    expect(
      scan.found,
      `PP-1: metadata survived the strip (searched ${scan.searched.join(", ")})`,
    ).toEqual([]);

    const { assertStripped } = await import("../src/server/media/strip");
    const audit = assertStripped(stored);
    expect(audit.found, "PP-1: the strip module's own self-check failed").toEqual([]);

    // And the fixture really did carry them, so the proof is not vacuous.
    const { fixture } = await import("./helpers/photos");
    const before = scanForMetadata(new Uint8Array(fixture("gps.jpg")));
    expect(before.found.length, "PP-1: the fixture carried no metadata to remove").toBeGreaterThan(
      0,
    );
  });

  test("PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only", async ({
    page,
  }) => {
    const { user, token } = await seller(page);

    for (const name of ["meta.png", "meta.webp"] as const) {
      const listingId = await draft(page, token, user.id);
      const answer = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(answer.status, `${name}: ${JSON.stringify(answer.payload)}`).toBe(200);
      expect(answer.payload["ok"], `${name}: ${JSON.stringify(answer.payload)}`).toBe(true);

      const rows = await photoRowsOf(listingId);
      expect(rows, `PP-2 ${name}: no row was registered`).toHaveLength(1);
      expect(rows[0]!.exif_stripped, `PP-2 ${name}: the DEC-009 gate`).toBe(true);

      const stored = await downloadObject(keyOf(rows[0]!, "cover"));
      const scan = scanForMetadata(stored);
      expect(
        scan.found,
        `PP-2 ${name}: metadata survived (searched ${scan.searched.join(", ")})`,
      ).toEqual([]);
      const { assertStripped } = await import("../src/server/media/strip");
      expect(assertStripped(stored).found, `PP-2 ${name}: the self-check failed`).toEqual([]);
    }
  });

  test("PP-3 a PDF renamed .jpg is refused unsupportedFormat", async ({ page }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    const answer = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "notimage.pdf", as: "photo.jpg" },
    });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(reasons(answer.payload)).toEqual([{ field: "cover", reason: "unsupportedFormat" }]);
    expect(await photoRowsOf(listingId), "PP-3: nothing may be registered").toHaveLength(0);
  });

  test("PP-4 a variant over its size dial is refused by name", async ({ page }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    // The thumb's dial is 120 KB and `gps.jpg` is far over it. (A >6 MB fixture
    // for the cover's own dial would exercise the same line of the same loop, so
    // the smallest dial is the one proved — the refusal is named per variant.)
    const answer = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "meta.png" },
      thumb: { name: "gps.jpg" },
    });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(reasons(answer.payload)).toEqual([{ field: "thumb", reason: "tooLarge" }]);
    expect(await photoRowsOf(listingId), "PP-4: nothing may be registered").toHaveLength(0);
    expect(await objectsUnder(user.id, listingId), "PP-4: no object may be left").toEqual([]);
  });

  test("PP-5 the policy pass refuses the cover and stores nothing", async ({ page }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    // The fixture marker: 13 px wide, which the deterministic fake refuses.
    const answer = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "marker-13px.jpg" },
    });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(reasons(answer.payload)).toEqual([{ field: "cover", reason: "not_a_photo" }]);
    expect(await photoRowsOf(listingId), "PP-5: nothing may be registered").toHaveLength(0);
    expect(await objectsUnder(user.id, listingId), "PP-5: nothing may be stored").toEqual([]);
  });

  test("PP-6 another seller's listing is a 403", async ({ page, browser }) => {
    const owner = await seller(page);
    const listingId = await draft(page, owner.token, owner.user.id);

    const context = await browser.newContext();
    const other = await context.newPage();
    try {
      const intruder = await createUser({ confirmed: true });
      sellers.push(intruder.id);
      await signInViaSession(other, intruder.email, intruder.password);
      await gotoReady(other, "/");
      const answer = await uploadPhoto(other, {
        listingId,
        token: await bearerOf(other),
        cover: { name: "meta.png" },
      });
      expect(answer.status, JSON.stringify(answer.payload)).toBe(403);
      expect(reasons(answer.payload)).toEqual([{ field: "listingId", reason: "notYourListing" }]);
      expect(await photoRowsOf(listingId), "PP-6: nothing may be registered").toHaveLength(0);
    } finally {
      await context.close();
    }
  });

  test("PP-7 the eleventh photo is refused tooManyPhotos", async ({ page }) => {
    test.setTimeout(180_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    for (let index = 0; index < 10; index += 1) {
      const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
      expect(answer.status, `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(200);
      expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
        true,
      );
    }
    expect(await photoRowsOf(listingId), "PP-7: the cap is counted from DB truth").toHaveLength(10);

    const eleventh = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(eleventh.status, JSON.stringify(eleventh.payload)).toBe(200);
    expect(reasons(eleventh.payload)).toEqual([{ field: "photos", reason: "tooManyPhotos" }]);
    expect(await photoRowsOf(listingId), "PP-7: the cap held").toHaveLength(10);
  });

  test("PP-8 DELETE removes the row and the objects; POST makes a photo the cover", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    const first = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(first.status, JSON.stringify(first.payload)).toBe(200);
    const second = await uploadPhoto(page, { listingId, token, cover: { name: "meta.webp" } });
    expect(second.status, JSON.stringify(second.payload)).toBe(200);

    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-8: two photos were uploaded").toHaveLength(2);
    const keys = ["cover", "card", "thumb"].map((variant) =>
      keyOf(rows[1]!, variant as "cover" | "card" | "thumb"),
    );
    for (const key of keys) expect(await objectExists(key), `PP-8: ${key} was stored`).toBe(true);

    const cover = await photoAction(page, rows[1]!.id, "cover", token);
    expect(cover.status, JSON.stringify(cover.payload)).toBe(200);
    expect(cover.payload["ok"], JSON.stringify(cover.payload)).toBe(true);

    const removed = await photoAction(page, rows[1]!.id, "delete", token);
    expect(removed.status, JSON.stringify(removed.payload)).toBe(200);
    expect(removed.payload["ok"], JSON.stringify(removed.payload)).toBe(true);

    const after = await photoRowsOf(listingId);
    expect(
      after.map((row) => row.id),
      "PP-8: the row is gone",
    ).toEqual([rows[0]!.id]);
    for (const key of keys) {
      expect(await objectExists(key), `PP-8: ${key} must be gone from storage`).toBe(false);
    }
  });

  test("PP-9 the upload dial refuses once the seller's hourly ceiling is reached", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    await fillUploadCounter(user.id);
    const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(reasons(answer.payload)).toEqual([{ field: "rate", reason: "rateLimited" }]);
    const refusals = answer.payload["refusals"] as { detail?: unknown }[];
    expect(String(refusals[0]?.detail ?? ""), "PP-9: the refusal names when it resets").not.toBe(
      "",
    );
    expect(await photoRowsOf(listingId), "PP-9: nothing may be registered").toHaveLength(0);
  });

  /**
   * PP-10 — THE RETRY LAW, on the tile. A verdict is FINAL: it is said once,
   * with its reason, and the tile offers no retry. A failure to REACH a verdict
   * is not a verdict: it is tried once more on its own, then handed to the
   * seller with a manual retry (F4 — nothing is silent, nothing is a phantom).
   *
   * The refusal arm rides the door's own fake-mode verdict shape; the 5xx arm
   * counts the route's calls, which is the only way to observe "once more".
   */
  test("PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    // ---- a verdict: refused once, with its reason, and no retry offered ----
    await page.route("**/api/upload/photo", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          refusals: [{ field: "photo", reason: "not_a_photo", detail: "fake mode" }],
        }),
      });
    });
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    const refused = page.getByTestId("post-photo-tile");
    await expect(refused, "PP-10: a verdict must land the tile in refused").toHaveAttribute(
      "data-state",
      "refused",
      { timeout: 45_000 },
    );
    await expect(page.getByTestId("post-photo-refused")).toBeVisible();
    await expect(
      page.getByTestId("post-photo-state"),
      "PP-10: the refusal must carry its own reason",
    ).not.toHaveText("");
    await expect(
      page.getByTestId("post-photo-retry"),
      "PP-10: a refusal is final — no retry may be offered",
    ).toHaveCount(0);
    expect(await photoRowsOf(listingId), "PP-10: a refused photo is not registered").toHaveLength(0);
    await page.unroute("**/api/upload/photo");

    // ---- a 5xx: one automatic second try, then the seller's own retry ----
    let calls = 0;
    await page.route("**/api/upload/photo", async (route) => {
      calls += 1;
      await route.fulfill({ status: 500, contentType: "application/json", body: '{"error":"x"}' });
    });
    const second = await draft(page, token, user.id);
    await gotoReady(page, `/post/${second}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    const failed = page.getByTestId("post-photo-tile");
    await expect(failed, "PP-10: an unreachable verdict lands in failed").toHaveAttribute(
      "data-state",
      "failed",
      { timeout: 45_000 },
    );
    expect(calls, "PP-10: a 5xx is tried exactly twice — once more, not forever").toBe(2);
    const manual = page.getByTestId("post-photo-retry");
    await expect(manual, "PP-10: the seller keeps a manual retry").toBeVisible();
    await manual.click();
    await expect
      .poll(() => calls, { message: "PP-10: the manual retry never reached the door" })
      .toBe(3);
    expect(await photoRowsOf(listingId), "PP-10: nothing was registered").toHaveLength(0);
    await page.unroute("**/api/upload/photo");
  });
});
