import { readFileSync } from "node:fs";
import { join } from "node:path";

import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

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
  leaseSeller,
  bearerOf,
  destroyListingsOf,
  destroyPostableCategory,
  draftsOf,
  postRoute,
  seedPostableCategory,
  stopPageBeforePurge,
} from "./helpers/posting";
import { signInAsSuperAdmin } from "./helpers/categories";
import { gotoReady, isMobile, signInViaSession } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";

/**
 * U6-B1 — THE PHOTO PIPELINE (PP-1..PP-9), REQ-036's acceptance; the photo step's
 * tiles (PP-10..PP-12, PP-14..PP-18) and the photo links (PP-13).
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

  test.afterEach(async ({ page }) => {
    // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
    // blank it, so no autosave lands after the purge (about:blank alone left a
    // save already sent to land as "listing not found").
    await stopPageBeforePurge(page);
    // J3 — an afterEach survives a body timeout; a `finally` in the body does not.
    for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
    for (const sellerId of sellers.splice(0)) {
      await clearUploadCounter(sellerId);
      await destroyListingsOf(sellerId);
    }
    for (const slug of categories.splice(0)) await destroyPostableCategory(slug);
  });

  async function seller(page: import("@playwright/test").Page) {
    const user = await leaseSeller();
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
    // D39 — photos follow specifications in the walk; the scratch draft is
    // recorded as past specifications (service client, this scratch row only)
    // so a visit to its address still opens on the photos step.
    const { error } = await adminClient()
      .from("listings")
      .update({ draft_step: 3 })
      .eq("id", listingId)
      .eq("seller_id", userId);
    if (error) throw new Error(`[e2e:pp] seeding draft_step failed: ${error.message}`);
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

    // The thumb's dial is 30 KB (D157) and `gps.jpg` is far over it. (A >1 MB fixture
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
      const intruder = await leaseUser();
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
    expect(await photoRowsOf(listingId), "PP-10: a refused photo is not registered").toHaveLength(
      0,
    );
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

  /**
   * PP-11 — INC-585 (the operator's walk, 2026-10-13): a photo the site did not
   * add holds Next until the seller removes it, and the step says why under
   * Next; removed, Next opens again and no photo stands for it. D148: the step
   * says that everything in a photo is public.
   */
  test("PP-11 a refused photo holds Next until it is removed; the step says photos are public", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

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
    await expect(page.getByTestId("post-photos-public"), "PP-11: D148's notice").toBeVisible();
    await expect(
      page.getByTestId("post-next"),
      "PP-11: Next is open before any photo",
    ).toBeEnabled();
    await expect(page.getByTestId("post-next-photos-held")).toHaveCount(0);

    await page.getByTestId("post-photos-input").setInputFiles(FIXTURE);
    const tile = page.getByTestId("post-photo-tile");
    await expect(tile).toHaveAttribute("data-state", "refused", { timeout: 45_000 });
    await expect(page.getByTestId("post-next"), "PP-11: a refused photo holds Next").toBeDisabled();
    await expect(
      page.getByTestId("post-next-photos-held"),
      "PP-11: the hold says why",
    ).toBeVisible();

    await tile.getByTestId("post-photo-remove").click();
    await expect(tile).toHaveCount(0);
    await expect(page.getByTestId("post-next"), "PP-11: removed, Next opens").toBeEnabled();
    await expect(page.getByTestId("post-next-photos-held")).toHaveCount(0);
    expect(await photoRowsOf(listingId), "PP-11: nothing was registered").toHaveLength(0);
    await page.unroute("**/api/upload/photo");
  });

  /**
   * INC-588 / D151 — a stored photo is drawn through a link that expires. The
   * photo bucket is private and the row stores `{ partition, key }`, never an
   * address: the stored tile's image is the signed link the photo-links route
   * gave this seller, and it draws.
   *
   * INC-591 — D39: a draft that holds a registered photo has passed the photo
   * step (`isStepFinished`, types.ts), so it resumes on the price page; the
   * seller's way back to the photos is Back.
   */
  test("PP-12 a stored photo is drawn on the photo step through a link that expires", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
    expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);

    await gotoReady(page, `/post/${listingId}`);
    await expect(
      page.getByTestId("post-step-4"),
      "PP-12: a draft holding a photo resumes past the photo step (D39)",
    ).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const image = page.getByTestId("post-photo-stored").locator("img");
    await expect(image, "PP-12: the stored photo has no signed link").toHaveAttribute(
      "src",
      /^https:\/\/.+\/storage\/v1\/object\/sign\/listing-photos\/.+token=/,
      { timeout: 20_000 },
    );
    // The image loads lazily: bring it into view, then it must draw.
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(async () => image.evaluate((element) => (element as HTMLImageElement).naturalWidth), {
        message: "PP-12: the signed link did not draw",
        timeout: 20_000,
      })
      .toBeGreaterThan(0);
  });

  /**
   * INC-588 / D151 — WHO GETS A LINK. The rows are read as the caller, so the
   * owner and staff who may view listings get links; another seller gets none
   * (the same answer as a photo that does not exist); no session is a 401. The
   * owner's link serves the image itself.
   */
  test("PP-13 photo links: the owner and staff get them; another seller and no session do not", async ({
    page,
    browser,
  }) => {
    const LINKS = "/api/media/photo-links";
    const owner = await seller(page);
    const listingId = await draft(page, owner.token, owner.user.id);
    const uploaded = await uploadPhoto(page, {
      listingId,
      token: owner.token,
      cover: { name: "gps.jpg" },
    });
    expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-13: the door registered no photo row").toHaveLength(1);
    const photoId = rows[0]!.id;

    const own = await postRoute(page, LINKS, { photoIds: [photoId] }, { token: owner.token });
    expect(own.status, JSON.stringify(own.payload)).toBe(200);
    expect(own.payload["expiresIn"], "PP-13: links last one hour").toBe(3600);
    const ownLinks = (own.payload["links"] ?? {}) as Record<string, Record<string, string>>;
    for (const variant of ["card", "thumb", "cover"]) {
      expect(ownLinks[photoId]?.[variant] ?? "", `PP-13: no ${variant} link for the owner`).toMatch(
        /\/storage\/v1\/object\/sign\/listing-photos\//,
      );
    }
    const served = await page.request.get(ownLinks[photoId]?.["card"] ?? "");
    expect(served.status(), "PP-13: the owner's link does not serve").toBe(200);
    expect(served.headers()["content-type"] ?? "", "PP-13: the link serves no image").toMatch(
      /^image\//,
    );

    const anonymous = await postRoute(page, LINKS, { photoIds: [photoId] });
    expect(anonymous.status, "PP-13: no session must be refused").toBe(401);

    // A second person: another seller, in a context of their own.
    const otherContext = await browser.newContext();
    try {
      const other = await otherContext.newPage();
      const intruder = await leaseUser();
      sellers.push(intruder.id);
      await signInViaSession(other, intruder.email, intruder.password);
      await gotoReady(other, "/");
      const foreign = await postRoute(
        other,
        LINKS,
        { photoIds: [photoId] },
        { token: await bearerOf(other) },
      );
      expect(foreign.status, JSON.stringify(foreign.payload)).toBe(200);
      expect(foreign.payload["links"], "PP-13: another seller got a link").toEqual({});
    } finally {
      await otherContext.close();
    }

    // A third person: staff who may view listings (the job super admin).
    const staffContext = await browser.newContext();
    try {
      const staff = await staffContext.newPage();
      await signInAsSuperAdmin(staff);
      const viewed = await postRoute(
        staff,
        LINKS,
        { photoIds: [photoId] },
        { token: await bearerOf(staff) },
      );
      expect(viewed.status, JSON.stringify(viewed.payload)).toBe(200);
      const staffLinks = (viewed.payload["links"] ?? {}) as Record<string, Record<string, string>>;
      expect(staffLinks[photoId]?.["card"] ?? "", "PP-13: staff got no link").toMatch(
        /\/storage\/v1\/object\/sign\/listing-photos\//,
      );
    } finally {
      await staffContext.close();
    }
  });

  /**
   * PP-14 — INC-596 (the operator's walk, 2026-10-13: "i remove the uploaded, but
   * it will still be there"). Remove stops a photo that is not stored yet: one
   * waiting its turn is never sent, and one already on its way is deleted the
   * moment the server names it. Neither comes back, a reload included.
   */
  test("PP-14 a photo removed while it uploads, or while it waits its turn, never comes back", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    let release: () => void = () => undefined;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    let sends = 0;
    await page.route("**/api/upload/photo", async (route) => {
      sends += 1;
      await held;
      await route.continue();
    });
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await page.getByTestId("post-photos-input").setInputFiles([FIXTURE, FIXTURE]);
    const tiles = page.getByTestId("post-photo-tile");
    await expect(tiles).toHaveCount(2);
    // The first is on its way, held at the door; the second waits its turn.
    await expect(tiles.nth(0)).toHaveAttribute("data-state", "uploading", { timeout: 45_000 });
    await expect.poll(() => sends, { message: "PP-14: the first photo was not sent" }).toBe(1);

    await tiles.nth(1).getByTestId("post-photo-remove").click();
    await tiles.nth(0).getByTestId("post-photo-remove").click();
    await expect(tiles, "PP-14: a removed tile stayed on the step").toHaveCount(0);

    // The held send now reaches the server, which stores the photo …
    const answer = page.waitForResponse("**/api/upload/photo");
    release();
    const stored = (await (await answer).json()) as Record<string, unknown>;
    expect(stored["ok"], `PP-14: the held send was not stored: ${JSON.stringify(stored)}`).toBe(
      true,
    );
    // … and the step deletes it at once.
    await expect
      .poll(async () => (await photoRowsOf(listingId)).length, {
        message: "PP-14: the photo removed on its way was left on the listing",
        timeout: 20_000,
      })
      .toBe(0);
    // The batch is over: the photo that waited its turn was never sent.
    await expect(page.getByTestId("post-photos-add")).toBeEnabled();
    expect(sends, "PP-14: the photo removed while it waited was sent").toBe(1);
    await page.unroute("**/api/upload/photo");

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-photos-empty")).toBeVisible();
    await expect(
      page.getByTestId("post-photo-stored"),
      "PP-14: a removed photo came back",
    ).toHaveCount(0);
    expect(await photoRowsOf(listingId), "PP-14: a removed photo is on the listing").toHaveLength(
      0,
    );
  });

  /**
   * PP-15 — INC-595 (the operator's walk, 2026-10-13: "once a photo is added, is
   * there anyway to remove it, no remove or edit button"). A photo stored in an
   * earlier visit carries the same buttons as one added now: Remove on every
   * photo, Make cover on every photo but the cover. INC-597 / D154: the cover is
   * the first photo, and Make cover moves the photo to the front — on the
   * listing (DB truth) and on the step.
   */
  test("PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
    }
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-15: two photos were uploaded").toHaveLength(2);
    const [first, second] = [rows[0]!.id, rows[1]!.id];
    const order = async () => (await photoRowsOf(listingId)).map((row) => row.id);

    // D39 — a draft holding a photo resumes on the price page; Back is the way to the photos.
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const stored = page.getByTestId("post-photo-stored");
    await expect(stored).toHaveCount(2);
    await expect(stored.nth(0)).toHaveAttribute("data-photo-id", first);
    await expect(
      stored.getByTestId("post-photo-remove"),
      "PP-15: a stored photo has no Remove",
    ).toHaveCount(2);
    await expect(
      stored.getByTestId("post-photo-makecover"),
      "PP-15: Make cover is offered on every photo but the cover",
    ).toHaveCount(1);
    await expect(stored.nth(0).getByTestId("post-photo-cover")).toBeVisible();

    // Make cover moves the second photo to the front.
    await stored.nth(1).getByTestId("post-photo-makecover").click();
    await expect
      .poll(order, { message: "PP-15: Make cover did not move the photo first" })
      .toEqual([second, first]);
    await expect(
      stored.nth(0),
      "PP-15: the step does not show the new cover first",
    ).toHaveAttribute("data-photo-id", second);
    await expect(stored.nth(0).getByTestId("post-photo-cover")).toBeVisible();
    await expect(stored.nth(0).getByTestId("post-photo-makecover")).toHaveCount(0);
    await expect(stored.nth(1).getByTestId("post-photo-makecover")).toHaveCount(1);

    // Remove deletes the other one.
    await stored.nth(1).getByTestId("post-photo-remove").click();
    await expect
      .poll(order, { message: "PP-15: Remove on a stored photo did not delete it" })
      .toEqual([second]);
    await expect(stored).toHaveCount(1);
    await expect(stored.getByTestId("post-photo-remove")).toHaveCount(1);
    await expect(stored.getByTestId("post-photo-makecover")).toHaveCount(0);
  });

  /**
   * PP-16 — D154: on a computer, photos dropped on the step take the picker's
   * way — the same queue, the same cap and the same screen.
   */
  test("PP-16 a photo dropped on the step is added like a picked one", async ({ page }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();

    const bytes = readFileSync(FIXTURE).toString("base64");
    const transfer = await page.evaluateHandle((data) => {
      const raw = atob(data);
      const array = new Uint8Array(raw.length);
      for (let index = 0; index < raw.length; index += 1) array[index] = raw.charCodeAt(index);
      const files = new DataTransfer();
      files.items.add(new File([array], "dropped.jpg", { type: "image/jpeg" }));
      return files;
    }, bytes);
    const zone = page.getByTestId("post-photos-drop");
    await zone.dispatchEvent("dragover", { dataTransfer: transfer });
    await expect(zone, "PP-16: the drop area is not outlined").toHaveAttribute(
      "data-dragging",
      "1",
    );
    await zone.dispatchEvent("drop", { dataTransfer: transfer });
    await expect(zone).toHaveAttribute("data-dragging", "0");
    await expect(
      page.getByTestId("post-photo-tile"),
      "PP-16: the dropped photo was not stored",
    ).toHaveAttribute("data-state", "stored", { timeout: 45_000 });
    await expect
      .poll(async () => (await photoRowsOf(listingId)).length, {
        message: "PP-16: the dropped photo was not registered",
      })
      .toBe(1);
  });

  /**
   * PP-17 — D154 (the operator, 2026-10-13): every photo has Move earlier and
   * Move later, and the first photo is the cover. One door puts a photo at a
   * place (`move_listing_photo` through the photo route's `move` action); the
   * order is DB truth, and the step draws it. The route refuses a place that is
   * not a whole number from 0, and another seller's photo.
   */
  test("PP-17 Move earlier and Move later put a photo at its place, and the first is the cover", async ({
    page,
    browser,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp", "gps.jpg"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
    }
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-17: three photos were uploaded").toHaveLength(3);
    const [a, b, c] = [rows[0]!.id, rows[1]!.id, rows[2]!.id];
    const order = async () => (await photoRowsOf(listingId)).map((row) => row.id);

    // D39 — a draft holding a photo resumes on the price page; Back is the way to the photos.
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const stored = page.getByTestId("post-photo-stored");
    await expect(stored).toHaveCount(3);
    // The ends cannot move past themselves.
    await expect(stored.nth(0).getByTestId("post-photo-earlier")).toBeDisabled();
    await expect(stored.nth(2).getByTestId("post-photo-later")).toBeDisabled();

    // Move later on the first: [b, a, c], and b is the cover.
    await stored.nth(0).getByTestId("post-photo-later").click();
    await expect
      .poll(order, { message: "PP-17: Move later did not move the photo" })
      .toEqual([b, a, c]);
    await expect(stored.nth(0)).toHaveAttribute("data-photo-id", b);
    await expect(stored.nth(0).getByTestId("post-photo-cover")).toBeVisible();
    // Move earlier on the last: [b, c, a].
    await stored.nth(2).getByTestId("post-photo-earlier").click();
    await expect
      .poll(order, { message: "PP-17: Move earlier did not move the photo" })
      .toEqual([b, c, a]);
    await expect(stored.nth(1)).toHaveAttribute("data-photo-id", c);

    // The route: a place that is not a whole number from 0 is refused by name (a refusal
    // answers 200 with `ok: false`, as every refusal of this route does), and nothing moves.
    for (const bad of [-1, 1.5, "1", null]) {
      const answer = await photoAction(page, a, "move", token, bad);
      expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
      expect(reasons(answer.payload), `PP-17: position ${String(bad)}`).toEqual([
        { field: "position", reason: "badValue" },
      ]);
    }
    expect(await order(), "PP-17: a refused place moved a photo").toEqual([b, c, a]);
    // A place past the end means last.
    const last = await photoAction(page, b, "move", token, 99);
    expect(last.status, JSON.stringify(last.payload)).toBe(200);
    expect(await order(), "PP-17: a place past the end is the last").toEqual([c, a, b]);

    // Another seller cannot move this seller's photo.
    const otherContext = await browser.newContext();
    try {
      const other = await otherContext.newPage();
      const stranger = await seller(other);
      const foreign = await photoAction(other, a, "move", stranger.token, 0);
      expect(foreign.status, JSON.stringify(foreign.payload)).toBe(403);
      expect(await order(), "PP-17: another seller moved a photo").toEqual([c, a, b]);
    } finally {
      await otherContext.close();
    }
  });

  /**
   * PP-18 — D154: on a computer a photo is dragged to another place. The drag
   * carries the photo's id; the drop on another photo puts it at that place.
   */
  test("PP-18 a photo dragged onto another photo takes its place (computer)", async ({ page }) => {
    test.skip(
      isMobile(page),
      "D154 — a drag is a computer's gesture; a phone has the buttons (PP-17)",
    );
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp", "gps.jpg"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
    }
    const rows = await photoRowsOf(listingId);
    const [a, b, c] = [rows[0]!.id, rows[1]!.id, rows[2]!.id];
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const stored = page.getByTestId("post-photo-stored");
    await expect(stored).toHaveCount(3);
    await expect(stored.nth(2), "PP-18: a photo cannot be dragged").toHaveAttribute(
      "draggable",
      "true",
    );

    // The last photo dropped on the first takes the first place, and is the cover.
    const transfer = await page.evaluateHandle(() => new DataTransfer());
    await stored.nth(2).dispatchEvent("dragstart", { dataTransfer: transfer });
    await stored.nth(0).dispatchEvent("dragover", { dataTransfer: transfer });
    await stored.nth(0).dispatchEvent("drop", { dataTransfer: transfer });
    await expect
      .poll(async () => (await photoRowsOf(listingId)).map((row) => row.id), {
        message: "PP-18: the drop did not move the photo",
      })
      .toEqual([c, a, b]);
    await expect(stored.nth(0)).toHaveAttribute("data-photo-id", c);
    await expect(stored.nth(0).getByTestId("post-photo-cover")).toBeVisible();
  });

  /**
   * PP-19 — INC-605 and D160 (the operator's walk, 2026-10-13: "when a photo is
   * uploading add photo is grayed out, so should next button and back buttons";
   * "a red ribbon saying cover photo"). While a photo is on its way, Next and
   * Back wait and say why; once it is stored they work again, and the cover
   * carries the ribbon "Cover photo".
   */
  test("PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    let release: () => void = () => undefined;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route("**/api/upload/photo", async (route) => {
      await held;
      await route.continue();
    });
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-next")).toBeEnabled();
    await expect(page.getByTestId("post-back")).toBeEnabled();

    await page.getByTestId("post-photos-input").setInputFiles([FIXTURE]);
    const tile = page.getByTestId("post-photo-tile");
    await expect(tile).toHaveAttribute("data-state", "uploading", { timeout: 45_000 });
    await expect(page.getByTestId("post-next"), "PP-19: Next while a photo is sent").toBeDisabled();
    await expect(page.getByTestId("post-back"), "PP-19: Back while a photo is sent").toBeDisabled();
    await expect(page.getByTestId("post-nav-photos-sending")).toHaveText(
      en["post.photos.waitSending"],
    );

    release();
    await expect(tile).toHaveAttribute("data-state", "stored", { timeout: 45_000 });
    await page.unroute("**/api/upload/photo");
    await expect(page.getByTestId("post-next")).toBeEnabled();
    await expect(page.getByTestId("post-back")).toBeEnabled();
    await expect(page.getByTestId("post-nav-photos-sending")).toHaveCount(0);
    // D160 — the cover's ribbon.
    await expect(tile.getByTestId("post-photo-cover")).toHaveText(en["post.photos.coverRibbon"]);
  });

  /**
   * PP-20 — INC-604 (the operator's walk, 2026-10-13: "reload by refreshing takes
   * back to first step selecting category and none is saved"). A draft begun on
   * /post takes its own address the moment it exists, so a reload opens the same
   * draft, its photo with it, and no second draft is made.
   */
  test("PP-20 a draft begun on /post takes its own address, and a reload opens it again", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    // DEC-068 — the residency fact arrives as the edge sends it.
    for (const path of ["**/api/listings/**", "**/api/geo"]) {
      await page.route(path, async (route) => {
        await route.fallback({ headers: { ...route.request().headers(), "cf-ipcountry": "ET" } });
      });
    }
    const { user, token } = await seller(page);
    const leaf = await seedPostableCategory();
    categories.push(leaf.slug);

    await gotoReady(page, "/post");
    await expect(page.getByTestId("post-step-1")).toBeVisible();
    await page.getByTestId("post-category-search").fill(leaf.slug);
    await page.locator(`[data-testid="post-category-hit"][data-category="${leaf.id}"]`).click();
    await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    await expect(page, "PP-20: the draft did not take its address").toHaveURL(
      /\/post\/[0-9a-f-]{36}$/,
    );
    const listingId = new URL(page.url()).pathname.split("/").pop() ?? "";
    objects.push({ userId: user.id, listingId });
    expect(
      (await draftsOf(user.id)).map((row) => row.id),
      "PP-20: one draft",
    ).toEqual([listingId]);
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);

    await page.reload();
    const shown = async () => {
      for (const step of [2, 3, 4, 5]) {
        if (await page.getByTestId(`post-step-${step}`).isVisible()) return step;
      }
      return 0;
    };
    await expect
      .poll(shown, { message: "PP-20: the reload did not open the draft", timeout: 20_000 })
      .toBeGreaterThan(0);
    expect(new URL(page.url()).pathname, "PP-20: the reload left the address").toBe(
      `/post/${listingId}`,
    );
    await expect(page.getByTestId("post-step-1"), "PP-20: the reload began again").toHaveCount(0);
    // D39 — the draft resumes at its first unfinished step; Back reaches the photos.
    for (let tries = 0; tries < 3; tries += 1) {
      if (await page.getByTestId("post-step-2").isVisible()) break;
      await page.getByTestId("post-back").click();
    }
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    await expect(page.getByTestId("post-photo-stored")).toHaveCount(1);
    expect(
      (await draftsOf(user.id)).map((row) => row.id),
      "PP-20: a second draft",
    ).toEqual([listingId]);
  });
});
