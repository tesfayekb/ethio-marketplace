import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createClient } from "@supabase/supabase-js";
import jpeg from "jpeg-js";

import { expect, test } from "./fixtures";

import { en } from "../src/i18n/locales/en";

import { fillOf, isGoldFill, isRedFill } from "./helpers/colors";

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
import { destroyLocation, rand, RUN, seedScratchChain } from "./helpers/locations";
import { gotoReady, isMobile, signInViaSession } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { inOneWindow } from "./helpers/rate-window";

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
/** Bundle 13 turn 12 (D155b / D159) — the cover's background removal. */
const BACKGROUND = "/api/listings/background";

/**
 * D162 / INC-613 — a WIDE photo (16:9), made in memory by the fixture
 * generator's own encoder (`jpeg-js`, I1) from a smooth gradient: the committed
 * fixtures are all 4:3, which a 4:3 frame draws edge to edge, so none of them
 * can show where a wider photo sits.
 */
function wideJpeg(width: number, height: number): Buffer {
  const data = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      data[at] = Math.round((x / width) * 255);
      data[at + 1] = Math.round((y / height) * 255);
      data[at + 2] = 128;
      data[at + 3] = 255;
    }
  }
  return Buffer.from(jpeg.encode({ data, width, height }, 85).data);
}

/** The tile tests (PP-10) pick a real file from the device, as a seller does. */
const FIXTURE = join(
  import.meta.dirname ?? new URL(".", import.meta.url).pathname,
  "../scripts/fixtures/photos/gps.jpg",
);

test.describe("PHOTO PIPELINE", () => {
  const categories: string[] = [];
  const sellers: string[] = [];
  const regions: string[] = [];
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
    // After the listings: a scratch place is removed once nothing points at it.
    for (const slug of regions.splice(0)) await destroyLocation(slug);
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

    // A cover made 11 px wide, which the deterministic fake refuses as nudity (D183).
    const answer = await uploadPhoto(page, {
      listingId,
      token,
      cover: { made: [11, 11] },
    });
    expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
    expect(reasons(answer.payload)).toEqual([{ field: "cover", reason: "nudity" }]);
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

    // INC-617 — the counter is written into this clock hour's window; the upload
    // must reach the door in the same window.
    await inOneWindow(3600, 30_000, "PP-9");
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
   * (the same answer as a photo that does not exist); no session gets none for a
   * draft's photo (INC-606: a visitor is read as the anonymous role, which reads
   * an active listing's photos only). The owner's link serves the image itself.
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

    // INC-606 — no session is read as the anonymous role: a draft's photo gets no link.
    const anonymous = await postRoute(page, LINKS, { photoIds: [photoId] });
    expect(anonymous.status, JSON.stringify(anonymous.payload)).toBe(200);
    expect(anonymous.payload["links"], "PP-13: no session got a draft's link").toEqual({});

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
    // D163 — the ribbon and the tile's outline in the system's gold, as a person
    // sees them; Remove keeps the destructive red.
    await expect
      .poll(async () => isGoldFill(await fillOf(tile.getByTestId("post-photo-cover"))), {
        message: "PP-19: the cover's ribbon is not gold",
      })
      .toBe(true);
    await expect
      .poll(
        async () => isGoldFill(await tile.evaluate((e) => getComputedStyle(e).borderTopColor)),
        {
          message: "PP-19: the cover's outline is not gold",
        },
      )
      .toBe(true);
    await expect
      .poll(
        async () =>
          isRedFill(
            await tile.getByTestId("post-photo-remove").evaluate((e) => getComputedStyle(e).color),
          ),
        { message: "PP-19: Remove is no longer red" },
      )
      .toBe(true);
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
    // D39 — the draft (past its category only) resumes at its first unfinished
    // step, the specifications; the photos come next in the walk (INC-611: Back
    // from there is the category, never the photos).
    await expect(page.getByTestId("post-step-3")).toBeVisible();
    await page.getByTestId("post-next").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("post-photo-stored")).toHaveCount(1);
    expect(
      (await draftsOf(user.id)).map((row) => row.id),
      "PP-20: a second draft",
    ).toEqual([listingId]);
  });

  /**
   * PP-21 — INC-606 (the operator, 2026-10-13: "after publishing I dont see the
   * photo in listing page after approval of the advert. It only has default
   * category image"). The feed names each card's cover photo, the links route
   * signs an active listing's photo for a visitor without a session (the card
   * and thumb sizes it asks for, nothing else, and never a draft's photo), and
   * the listing card draws it.
   */
  test("PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const { user, token } = await seller(page);
    const leaf = await seedPostableCategory();
    categories.push(leaf.slug);
    // INC-611 — an ACTIVE listing as the feed holds one: a publish time (the
    // feed indexes an active listing only with one, feed_index_refresh) and a
    // scratch city in Ethiopia (as the feed-screen specs seed theirs).
    const chain = await seedScratchChain("ET");
    regions.push(chain.region.slug);
    const { data: seeded, error: seedError } = await adminClient()
      .from("listings")
      .insert({
        category_id: leaf.id,
        seller_id: user.id,
        location_id: chain.city.id,
        home_country_code: "ET",
        title: `e2e-feed-pp21-${RUN}-${rand()}`,
        description: "e2e scratch listing for PP-21",
        status: "active",
        published_at: new Date(Date.now() - 60_000).toISOString(),
      })
      .select("id")
      .single();
    if (seedError || !seeded) {
      throw new Error(
        `[e2e:pp] seeding the active listing failed: ${seedError?.message ?? "no row"}`,
      );
    }
    const listingId = String(seeded.id);
    objects.push({ userId: user.id, listingId });
    const shown = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(shown.status, JSON.stringify(shown.payload)).toBe(200);
    const coverId = String(shown.payload["photoId"] ?? "");
    const draftId = await draft(page, token, user.id);
    const hidden = await uploadPhoto(page, {
      listingId: draftId,
      token,
      cover: { name: "meta.webp" },
    });
    expect(hidden.status, JSON.stringify(hidden.payload)).toBe(200);
    const draftPhotoId = String(hidden.payload["photoId"] ?? "");

    // The feed's card names its cover.
    await expect
      .poll(
        async () => {
          const response = await page.request.get(`/api/feed?category=${leaf.id}`);
          const body = (await response.json()) as {
            cards?: { id: string; coverPhotoId?: unknown }[];
          };
          return body.cards?.find((card) => card.id === listingId)?.coverPhotoId ?? "absent";
        },
        { message: "PP-21: the feed did not name the card's cover", timeout: 20_000 },
      )
      .toBe(coverId);

    // A visitor without a session gets the sizes asked for, and nothing of a draft.
    const asked = await page.request.post("/api/media/photo-links", {
      data: { photoIds: [coverId, draftPhotoId], variants: ["card", "thumb"] },
    });
    expect(asked.status()).toBe(200);
    const answer = (await asked.json()) as { links?: Record<string, Record<string, string>> };
    expect(Object.keys(answer.links ?? {}), "PP-21: a draft's photo was signed").toEqual([coverId]);
    expect(Object.keys(answer.links?.[coverId] ?? {}).sort()).toEqual(["card", "thumb"]);
    const bad = await page.request.post("/api/media/photo-links", {
      data: { photoIds: [coverId], variants: ["original"] },
    });
    expect(reasons((await bad.json()) as Record<string, unknown>)).toEqual([
      { field: "variants", reason: "badShape" },
    ]);

    // The listing card draws it.
    await gotoReady(page, `/c/${leaf.slug}`);
    const card = page.locator(`[data-testid="listing-card"][data-listing="${listingId}"]`);
    await expect(card.getByTestId("listing-card-picture").locator("img")).toHaveAttribute(
      "src",
      /\/object\/sign\/listing-photos\//,
      { timeout: 20_000 },
    );
  });

  /**
   * PP-22 — D161 (the operator, 2026-10-13: "the main photo in regular size and
   * on the side small of the rest just like in amazon"): the buyer's preview
   * shows the photos as a gallery. The cover is drawn large at its card size,
   * with a counter; every photo has a thumbnail at its thumb size, beside the
   * photo on a computer and under it on a phone; a thumbnail, the arrows and a
   * swipe move the photo shown; a tap opens a full-screen viewer at the cover
   * size, whose Escape closes the viewer and leaves the preview open.
   */
  test("PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["gps.jpg", "meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
    }
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-22: three photos were uploaded").toHaveLength(3);
    /** A signed link carries the stored key of the size it serves. */
    const inLink = (key: string) => new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    // Recorded as past contact (service client, this scratch row only), so the
    // draft opens on review, where the preview is.
    const { error } = await adminClient()
      .from("listings")
      .update({ draft_step: 7 })
      .eq("id", listingId)
      .eq("seller_id", user.id);
    if (error) throw new Error(`[e2e:pp] seeding draft_step failed: ${error.message}`);

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-preview-open").click();
    const sheet = page.getByTestId("post-preview-sheet");
    const gallery = sheet.getByTestId("listing-detail-gallery");
    const main = gallery.getByTestId("gallery-main");
    const count = gallery.getByTestId("gallery-count");
    const thumbs = gallery.getByTestId("gallery-thumb");

    // The cover first, at its card size; every photo a thumbnail at its thumb size.
    await expect(count, "PP-22: no counter on the photo").toHaveText("1 / 3", { timeout: 20_000 });
    await expect(main.locator("img")).toHaveAttribute("src", inLink(keyOf(rows[0]!, "card")));
    await expect(main.locator("img")).toHaveAttribute("srcset", inLink(keyOf(rows[0]!, "cover")));
    await expect(thumbs).toHaveCount(3);
    for (const [index, row] of rows.entries()) {
      await expect(thumbs.nth(index).locator("img")).toHaveAttribute(
        "src",
        inLink(keyOf(row, "thumb")),
      );
    }
    await expect(thumbs.nth(0)).toHaveAttribute("aria-current", "true");

    // Beside the photo on a computer, under it on a phone.
    const mainBox = await main.boundingBox();
    const thumbsBox = await gallery.getByTestId("gallery-thumbs").boundingBox();
    expect(mainBox, "PP-22: the photo is not drawn").not.toBeNull();
    expect(thumbsBox, "PP-22: the thumbnails are not drawn").not.toBeNull();
    if (isMobile(page)) {
      expect(
        thumbsBox!.y,
        "PP-22: on a phone the thumbnails are not under the photo",
      ).toBeGreaterThanOrEqual(mainBox!.y + mainBox!.height - 1);
    } else {
      expect(
        thumbsBox!.x + thumbsBox!.width,
        "PP-22: on a computer the thumbnails are not beside the photo",
      ).toBeLessThanOrEqual(mainBox!.x + 1);
    }

    // A thumbnail shows its photo; the arrows step and stop at the ends.
    await thumbs.nth(2).click();
    await expect(count).toHaveText("3 / 3");
    await expect(main.locator("img")).toHaveAttribute("src", inLink(keyOf(rows[2]!, "card")));
    await expect(thumbs.nth(2)).toHaveAttribute("aria-current", "true");
    await expect(gallery.getByTestId("gallery-next")).toBeDisabled();
    await gallery.getByTestId("gallery-previous").click();
    await expect(count).toHaveText("2 / 3");

    // A swipe to the left shows the next photo and opens nothing.
    const box = (await main.boundingBox())!;
    // A quarter down the photo, clear of the arrows at its middle.
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.25);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.25, { steps: 6 });
    await page.mouse.up();
    await expect(count, "PP-22: a swipe did not move to the next photo").toHaveText("3 / 3");
    await expect(page.getByTestId("gallery-viewer")).toHaveCount(0);

    // A tap opens the viewer at the cover size; its arrows step; Escape closes it only.
    await main.click();
    const viewer = page.getByTestId("gallery-viewer");
    await expect(viewer).toBeVisible();
    await expect(viewer.getByTestId("gallery-viewer-count")).toHaveText("3 / 3");
    await expect(viewer.getByTestId("gallery-viewer-image")).toHaveAttribute(
      "src",
      inLink(keyOf(rows[2]!, "cover")),
    );
    await viewer.getByTestId("gallery-viewer-previous").click();
    await expect(viewer.getByTestId("gallery-viewer-count")).toHaveText("2 / 3");
    await page.keyboard.press("Escape");
    await expect(viewer).toHaveCount(0);
    await expect(sheet, "PP-22: Escape in the viewer closed the preview too").toBeVisible();
    await expect(count, "PP-22: the gallery does not show the viewer's photo").toHaveText("2 / 3");
    await page.keyboard.press("Escape");
    await expect(sheet).toHaveCount(0);
  });

  /**
   * PP-23 — D162 (the operator, 2026-10-13: "Add a middle size") and INC-613 (his
   * walk the same evening: the thumbnails sat "above the top border of the top of
   * the main image"). Two wide photos picked on the photo step, as a seller picks
   * them: the device stores four sizes, the middle one 960 px; the buyer's
   * preview draws the page's photo from the card and the middle size, never the
   * cover, which only the full-screen viewer draws; and on a computer the wide
   * photo's top meets the first thumbnail's top.
   */
  test("PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)", async ({
    page,
  }) => {
    test.setTimeout(150_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const buffer = wideJpeg(1600, 900);
    await page.getByTestId("post-photos-input").setInputFiles([
      { name: "wide-1.jpg", mimeType: "image/jpeg", buffer },
      { name: "wide-2.jpg", mimeType: "image/jpeg", buffer },
    ]);
    const tiles = page.getByTestId("post-photo-tile");
    await expect(tiles).toHaveCount(2, { timeout: 45_000 });
    for (const tile of await tiles.all()) {
      await expect(tile).toHaveAttribute("data-state", "stored", { timeout: 60_000 });
    }
    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-23: two photos were stored").toHaveLength(2);
    const midKeys = rows.map((row) => {
      const mid = row.paths["mid"] as { key?: unknown } | undefined;
      expect(typeof mid?.key, "PP-23: a photo was stored without its middle size").toBe("string");
      return String(mid!.key);
    });
    expect([rows[0]!.width, rows[0]!.height], "PP-23: the cover is not the wide photo").toEqual([
      1600, 900,
    ]);
    /** A signed link carries the stored key of the size it serves. */
    const inLink = (key: string) => new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    // Recorded as past contact (service client, this scratch row only), so the
    // draft opens on review, where the preview is.
    const { error } = await adminClient()
      .from("listings")
      .update({ draft_step: 7 })
      .eq("id", listingId)
      .eq("seller_id", user.id);
    if (error) throw new Error(`[e2e:pp] seeding draft_step failed: ${error.message}`);

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-8")).toBeVisible({ timeout: 20_000 });
    await page.getByTestId("post-preview-open").click();
    const gallery = page.getByTestId("post-preview-sheet").getByTestId("listing-detail-gallery");
    const main = gallery.getByTestId("gallery-main");
    const image = main.locator("img");
    await expect(image, "PP-23: the page does not offer the middle size").toHaveAttribute(
      "srcset",
      inLink(midKeys[0]!),
      { timeout: 20_000 },
    );
    await expect(image, "PP-23: the page offers the full size").not.toHaveAttribute(
      "srcset",
      inLink(keyOf(rows[0]!, "cover")),
    );

    if (!isMobile(page)) {
      // What a person sees: the top edge of the photo as drawn in its frame
      // (object-fit contain, at its object-position), against the first thumbnail.
      const first = gallery.getByTestId("gallery-thumb").nth(0);
      await expect
        .poll(
          async () => {
            const drawnTop = await image.evaluate((element: HTMLImageElement) => {
              if (!element.complete || element.naturalWidth === 0) return null;
              const box = element.getBoundingClientRect();
              const scale = Math.min(
                box.width / element.naturalWidth,
                box.height / element.naturalHeight,
              );
              const drawn = element.naturalHeight * scale;
              const along = parseFloat(
                getComputedStyle(element).objectPosition.split(" ")[1] ?? "",
              );
              return box.top + (box.height - drawn) * (Number.isFinite(along) ? along / 100 : 0.5);
            });
            const thumb = await first.boundingBox();
            return drawnTop === null || thumb === null ? null : Math.abs(drawnTop - thumb.y);
          },
          {
            message:
              "PP-23: on a computer the wide photo's top does not meet the first thumbnail's",
            timeout: 20_000,
          },
        )
        .toBeLessThanOrEqual(1);
    }

    // The full-screen viewer draws the cover.
    await main.click();
    await expect(page.getByTestId("gallery-viewer-image")).toHaveAttribute(
      "src",
      inLink(keyOf(rows[0]!, "cover")),
    );
  });

  /** PP-24 — D162: a middle size over its own cap (1,200 px) is refused by name, and nothing is stored. */
  test("PP-24 a middle size over its cap is refused by name and nothing is stored (D162)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    const response = await page.request.post("/api/upload/photo", {
      headers: { Authorization: `Bearer ${token}` },
      multipart: {
        listingId,
        cover: { name: "cover.jpg", mimeType: "image/jpeg", buffer: wideJpeg(1600, 900) },
        mid: { name: "mid.jpg", mimeType: "image/jpeg", buffer: wideJpeg(1300, 731) },
        card: { name: "card.jpg", mimeType: "image/jpeg", buffer: wideJpeg(480, 270) },
        thumb: { name: "thumb.jpg", mimeType: "image/jpeg", buffer: wideJpeg(160, 90) },
      },
    });
    const payload = (await response.json()) as Record<string, unknown>;
    expect(reasons(payload), JSON.stringify(payload)).toEqual([
      { field: "mid", reason: "tooLarge" },
    ]);
    expect(await photoRowsOf(listingId), "PP-24: a refused upload stored a row").toHaveLength(0);
  });

  /** D154 B2 — the cover photo the listing row names, read through the service client. */
  async function coverOf(listingId: string): Promise<string | null> {
    const { data, error } = await adminClient()
      .from("listings")
      .select("cover_photo_id")
      .eq("id", listingId)
      .maybeSingle();
    if (error) throw new Error(`[e2e:pp] reading the cover failed: ${error.message}`);
    return (data?.cover_photo_id as string | null | undefined) ?? null;
  }

  /**
   * PP-25 — D154 B2: an upload that `replaces` a stored photo takes its place in
   * the order, the old row and its objects go, and the cover follows the order;
   * at the plan's cap an edit is still taken, because it adds no photo.
   */
  test("PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2)", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    }
    const before = await photoRowsOf(listingId);
    expect(before, "PP-25: two photos were uploaded").toHaveLength(2);
    const [first, second] = [before[0]!, before[1]!];
    const oldKeys = ["cover", "card", "thumb"].map((variant) =>
      keyOf(second, variant as "cover" | "card" | "thumb"),
    );

    // The second photo, edited: it keeps the second place; the cover stays first.
    const edited = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "gps.jpg" },
      replaces: second.id,
    });
    expect(edited.status, JSON.stringify(edited.payload)).toBe(200);
    expect(edited.payload["ok"], JSON.stringify(edited.payload)).toBe(true);
    expect(edited.payload["replaced"]).toBe(second.id);
    const newId = String(edited.payload["photoId"]);
    const after = await photoRowsOf(listingId);
    expect(
      after.map((row) => row.id),
      "PP-25: the edit is not in the old photo's place",
    ).toEqual([first.id, newId]);
    expect(after[1]!.width, "PP-25: the edit's cover is not the uploaded picture").toBe(800);
    expect(after[1]!.exif_stripped).toBe(true);
    expect(await coverOf(listingId), "PP-25: the cover moved").toBe(first.id);
    for (const key of oldKeys) {
      expect(await objectExists(key), `PP-25: the old photo's ${key} is still stored`).toBe(false);
    }

    // The cover, edited: the new photo is first, and it is the cover.
    const cover = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "meta.webp" },
      replaces: first.id,
    });
    expect(cover.payload["ok"], JSON.stringify(cover.payload)).toBe(true);
    const coverId = String(cover.payload["photoId"]);
    expect((await photoRowsOf(listingId)).map((row) => row.id)).toEqual([coverId, newId]);
    expect(await coverOf(listingId), "PP-25: the edited cover is not the cover").toBe(coverId);

    // At the cap: a new photo is refused, an edit is taken.
    for (let index = 2; index < 10; index += 1) {
      const answer = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
      expect(answer.payload["ok"], `upload ${index + 1}: ${JSON.stringify(answer.payload)}`).toBe(
        true,
      );
    }
    const full = await photoRowsOf(listingId);
    expect(full, "PP-25: the listing is at its cap").toHaveLength(10);
    const eleventh = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(reasons(eleventh.payload)).toEqual([{ field: "photos", reason: "tooManyPhotos" }]);
    const atCap = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "meta.png" },
      replaces: full[9]!.id,
    });
    expect(atCap.payload["ok"], JSON.stringify(atCap.payload)).toBe(true);
    const last = await photoRowsOf(listingId);
    expect(last, "PP-25: an edit at the cap changed the count").toHaveLength(10);
    expect(last[9]!.id).toBe(String(atCap.payload["photoId"]));
  });

  /**
   * PP-26 — D154 B2: an edit is refused, and the old photo stays as it was,
   * when the photo it names is not on the listing, when the name is not an id,
   * and when the AI screen refuses the edited picture.
   */
  test("PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    const otherId = await draft(page, token, user.id);
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    const [photo] = await photoRowsOf(listingId);
    const keys = ["cover", "card", "thumb"].map((variant) =>
      keyOf(photo!, variant as "cover" | "card" | "thumb"),
    );
    const unchanged = async (label: string) => {
      const rows = await photoRowsOf(listingId);
      expect(
        rows.map((row) => row.id),
        `PP-26 (${label}): the photo changed`,
      ).toEqual([photo!.id]);
      for (const key of keys) {
        expect(await objectExists(key), `PP-26 (${label}): ${key} was deleted`).toBe(true);
      }
    };

    // A photo of another listing (the seller's own): not on this one, so gone.
    const elsewhere = await uploadPhoto(page, {
      listingId: otherId,
      token,
      cover: { name: "meta.webp" },
      replaces: photo!.id,
    });
    expect(elsewhere.status, JSON.stringify(elsewhere.payload)).toBe(409);
    expect(reasons(elsewhere.payload)).toEqual([{ field: "replaces", reason: "photoGone" }]);
    expect(await photoRowsOf(otherId), "PP-26: the refused edit stored a row").toHaveLength(0);
    await unchanged("another listing");

    // Not an id.
    const notAnId = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "meta.webp" },
      replaces: "photo-1",
    });
    expect(reasons(notAnId.payload)).toEqual([{ field: "replaces", reason: "badValue" }]);
    await unchanged("not an id");

    // The AI screen refuses the edited picture (fake mode's 11-px width: nudity, D183).
    const refused = await uploadPhoto(page, {
      listingId,
      token,
      cover: { made: [11, 11] },
      replaces: photo!.id,
    });
    expect(reasons(refused.payload)).toEqual([{ field: "cover", reason: "nudity" }]);
    await unchanged("refused by the screen");
  });

  /**
   * PP-27 — D154 B2, the seller's way: Edit on a stored photo opens the editor on
   * its stored cover; a turn to the right is saved as a new photo in the same
   * place; the keyboard's crop of the cover is saved as the new cover.
   */
  test("PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    }
    const [first, second] = await photoRowsOf(listingId);
    expect([first!.width, second!.width], "PP-27: the fixtures are 320 px wide").toEqual([
      320, 320,
    ]);

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const tiles = page.getByTestId("post-photo-stored");
    await expect(tiles).toHaveCount(2);

    // The second photo, turned right: 320 x 240 becomes 240 x 320 in the same place.
    await tiles.nth(1).getByTestId("post-photo-edit").click();
    const editor = page.getByTestId("post-photo-editor");
    await expect(editor.getByTestId("post-photo-editor-preview")).toBeVisible();
    await expect(editor.getByTestId("post-photo-editor-save")).toBeDisabled();
    await editor.getByTestId("post-photo-editor-right").click();
    await expect(editor.getByTestId("post-photo-editor-frame")).toHaveAttribute("data-turns", "1");
    await editor.getByTestId("post-photo-editor-save").click();
    await expect(editor, "PP-27: the editor did not close after Save").toHaveCount(0);
    await expect
      .poll(async () => (await photoRowsOf(listingId)).map((row) => [row.width, row.height]), {
        message: "PP-27: the turned photo is not stored in the second place",
      })
      .toEqual([
        [320, 240],
        [240, 320],
      ]);
    const turned = await photoRowsOf(listingId);
    expect(turned[0]!.id).toBe(first!.id);
    expect(turned[1]!.id, "PP-27: the turned photo kept the old id").not.toBe(second!.id);
    await expect(tiles.nth(1)).toHaveAttribute("data-photo-id", turned[1]!.id);

    // The cover, cropped with the keyboard: Shift and the left arrow ten times
    // take a fifth off its width (320 -> 256); it stays the cover.
    await tiles.nth(0).getByTestId("post-photo-edit").click();
    await expect(editor.getByTestId("post-photo-editor-preview")).toBeVisible();
    const box = editor.getByTestId("post-photo-editor-box");
    await box.focus();
    for (let press = 0; press < 10; press += 1) await page.keyboard.press("Shift+ArrowLeft");
    await expect(box).toHaveAttribute("data-box", "0.0000,0.0000,0.8000,1.0000");
    await editor.getByTestId("post-photo-editor-save").click();
    await expect(editor).toHaveCount(0);
    await expect
      .poll(async () => (await photoRowsOf(listingId))[0]?.width, {
        message: "PP-27: the cropped cover is not stored first",
      })
      .toBe(256);
    const cropped = await photoRowsOf(listingId);
    expect(cropped).toHaveLength(2);
    expect(cropped[0]!.id).not.toBe(first!.id);
    expect(await coverOf(listingId), "PP-27: the cropped photo is not the cover").toBe(
      cropped[0]!.id,
    );
    await expect(tiles.nth(0).getByTestId("post-photo-cover")).toBeVisible();
  });

  /**
   * PP-28 — D154 B2: a refused edit keeps the editor open with the reason, and
   * the photo stays as it was; on a computer the crop box's corner is dragged.
   */
  test("PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    const uploaded = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    const [photo] = await photoRowsOf(listingId);

    // The edit's upload answers a refusal: what the AI screen would say of it.
    let edits = 0;
    await page.route("**/api/upload/photo", async (route) => {
      const body = route.request().postDataBuffer()?.toString("latin1") ?? "";
      if (!body.includes('name="replaces"')) return route.continue();
      edits += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, refusals: [{ field: "cover", reason: "not_a_photo" }] }),
      });
    });

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const tile = page.getByTestId("post-photo-stored");
    await expect(tile).toHaveCount(1);
    await tile.getByTestId("post-photo-edit").click();
    const editor = page.getByTestId("post-photo-editor");
    await expect(editor.getByTestId("post-photo-editor-preview")).toBeVisible();

    if (!isMobile(page)) {
      // A computer: the bottom-right corner dragged inwards makes the box smaller.
      const corner = editor.getByTestId("post-photo-editor-corner-se");
      const frame = await editor.getByTestId("post-photo-editor-frame").boundingBox();
      const handle = await corner.boundingBox();
      expect(frame, "PP-28: the editor's frame has no box").not.toBeNull();
      expect(handle, "PP-28: the corner has no box").not.toBeNull();
      const startX = handle!.x + handle!.width - 2;
      const startY = handle!.y + handle!.height - 2;
      await page.mouse.move(startX, startY);
      await page.mouse.down();
      await page.mouse.move(startX - frame!.width / 4, startY - frame!.height / 4, { steps: 5 });
      await page.mouse.up();
      const box = await editor.getByTestId("post-photo-editor-box").getAttribute("data-box");
      const [, , w, h] = (box ?? "").split(",").map(Number);
      expect(w, "PP-28: the drag did not narrow the box").toBeLessThan(0.9);
      expect(h, "PP-28: the drag did not shorten the box").toBeLessThan(0.9);
    } else {
      await editor.getByTestId("post-photo-editor-left").click();
    }
    await editor.getByTestId("post-photo-editor-save").click();

    const refusal = editor.getByTestId("post-photo-editor-refusal");
    await expect(refusal).toContainText(en["post.photo.refusal.not_a_photo"]);
    await expect(refusal).toContainText(en["post.photos.editor.kept"]);
    expect(edits, "PP-28: the edit was not sent").toBe(1);
    await expect(editor.getByTestId("post-photo-editor-save")).toBeEnabled();
    expect((await photoRowsOf(listingId)).map((row) => row.id)).toEqual([photo!.id]);

    await editor.getByTestId("post-photo-editor-cancel").click();
    await expect(editor).toHaveCount(0);
    await expect(tile).toHaveAttribute("data-photo-id", photo!.id);
  });

  /**
   * PP-29 — D154 B3: a photo the screen warns `not_relevant` about (fake mode: a
   * cover exactly 17 px wide) is stored, with its warning in its own table; the
   * seller's tile says so, a plain photo's does not; no visitor reads a warning or
   * a change; a draft's photo is not a change on a live ad (B5).
   */
  test("PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    const warned = await uploadPhoto(page, { listingId, token, cover: { made: [17, 17] } });
    expect(warned.status, JSON.stringify(warned.payload)).toBe(200);
    expect(warned.payload["ok"], JSON.stringify(warned.payload)).toBe(true);
    expect(warned.payload["warnings"]).toEqual(["not_relevant"]);
    expect(warned.payload["unscreened"]).toBe(true);
    expect(warned.payload["review"]).toEqual({ label: "not_right" });
    const plain = await uploadPhoto(page, { listingId, token, cover: { name: "meta.png" } });
    expect(plain.payload["ok"], JSON.stringify(plain.payload)).toBe(true);
    expect(plain.payload["warnings"]).toEqual([]);
    expect(plain.payload["unscreened"]).toBe(false);
    expect("review" in plain.payload, "PP-29: a plain upload carried a review").toBe(false);
    const [first, second] = await photoRowsOf(listingId);

    const { data: reviews, error: reviewError } = await adminClient()
      .from("listing_photo_reviews")
      .select("photo_id, label, code")
      .eq("listing_id", listingId);
    if (reviewError) throw new Error(`[e2e:pp] reading the reviews failed: ${reviewError.message}`);
    expect(reviews).toEqual([{ photo_id: first!.id, label: "not_right", code: null }]);
    const { data: hidden, error: hiddenError } = await adminClient()
      .from("listing_photos")
      .select("unscreened")
      .eq("id", first!.id)
      .single();
    if (hiddenError) throw new Error(`[e2e:pp] reading the photo failed: ${hiddenError.message}`);
    expect(hidden?.unscreened, "PP-29: the warned photo is shown").toBe(true);

    const { data: warnings, error } = await adminClient()
      .from("listing_photo_warnings")
      .select("photo_id, listing_id, codes")
      .eq("listing_id", listingId);
    if (error) throw new Error(`[e2e:pp] reading the warnings failed: ${error.message}`);
    expect(warnings).toEqual([
      { photo_id: first!.id, listing_id: listingId, codes: ["not_relevant"] },
    ]);
    const { count: changes } = await adminClient()
      .from("listing_photo_changes")
      .select("id", { count: "exact", head: true })
      .eq("listing_id", listingId);
    expect(changes, "PP-29: a draft's photo was listed as a change on a live ad").toBe(0);

    // No visitor reads a warning or a change: the anonymous role has no grant.
    const visitor = createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    );
    for (const table of [
      "listing_photo_warnings",
      "listing_photo_changes",
      "listing_photo_reviews",
    ] as const) {
      const read = await visitor.from(table).select("*").limit(1);
      expect(read.error, `PP-29: a visitor read ${table}`).not.toBeNull();
    }

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const tiles = page.getByTestId("post-photo-stored");
    await expect(tiles).toHaveCount(2);
    await expect(tiles.nth(0)).toHaveAttribute("data-photo-id", first!.id);
    await expect(tiles.nth(0).getByTestId("post-photo-warning")).toHaveText(
      en["post.photos.notRelevant"],
    );
    await expect(tiles.nth(1)).toHaveAttribute("data-photo-id", second!.id);
    await expect(tiles.nth(1).getByTestId("post-photo-warning")).toHaveCount(0);
  });

  /** An RGBA pixel within two steps of another, channel by channel (the canvas may round). */
  function near(actual: number[], expected: number[]): boolean {
    return (
      actual.length === expected.length && actual.every((v, i) => Math.abs(v - expected[i]!) <= 2)
    );
  }

  /**
   * PP-30 — D155b / D159: Remove background is offered on the cover only; the
   * dialog asks nothing until Start; the preview is the cut-out (fake mode: 400 x
   * 300, a green block on a transparent ground) laid on the house background
   * (#F3F5F8); Keep stores it through the whole pipeline in the cover's place.
   */
  test("PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    }
    const [first, second] = await photoRowsOf(listingId);

    await gotoReady(page, `/post/${listingId}`);
    await expect(page.getByTestId("post-step-4")).toBeVisible();
    await page.getByTestId("post-back").click();
    await expect(page.getByTestId("post-step-2")).toBeVisible();
    const tiles = page.getByTestId("post-photo-stored");
    await expect(tiles).toHaveCount(2);
    await expect(tiles.nth(0).getByTestId("post-photo-background")).toBeVisible();
    await expect(
      tiles.nth(1).getByTestId("post-photo-background"),
      "PP-30: a photo that is not the cover offers the tool",
    ).toHaveCount(0);
    // D168 — each tool says its word under its icon, and the step says the tool is
    // the cover's.
    await expect(tiles.nth(0).getByTestId("post-photo-background")).toHaveText(
      en["post.photos.backgroundShort"],
    );
    await expect(tiles.nth(1).getByTestId("post-photo-earlier")).toHaveText(
      en["post.photos.earlierShort"],
    );
    await expect(tiles.nth(0).getByTestId("post-photo-later")).toHaveText(
      en["post.photos.laterShort"],
    );
    await expect(tiles.nth(1).getByTestId("post-photo-edit")).toHaveText(
      en["post.photos.editShort"],
    );
    await expect(page.getByTestId("post-photos-background-hint")).toHaveText(
      en["post.photos.backgroundCoverOnly"],
    );

    await tiles.nth(0).getByTestId("post-photo-background").click();
    const dialog = page.getByTestId("post-photo-background-dialog");
    await expect(dialog.getByTestId("post-photo-background-start")).toBeVisible();
    await expect(dialog.getByTestId("post-photo-background-preview")).toHaveCount(0);
    await dialog.getByTestId("post-photo-background-start").click();
    const preview = dialog.getByTestId("post-photo-background-preview");
    await expect(preview).toHaveAttribute("data-width", "400", { timeout: 20_000 });
    await expect(preview).toHaveAttribute("data-height", "300");
    await expect(dialog.getByTestId("post-photo-background-tries")).toHaveText(
      en["post.photos.background.triesLeft"].replace("{count}", "1"),
    );
    // The corner is the house background; the middle is the item.
    const pixels = await preview.evaluate((canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d")!;
      const at = (x: number, y: number) => Array.from(context.getImageData(x, y, 1, 1).data);
      return {
        corner: at(2, 2),
        middle: at(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)),
      };
    });
    expect(
      near(pixels.corner, [0xf3, 0xf5, 0xf8, 255]),
      `PP-30: the corner is ${pixels.corner.join(",")}, not the house background`,
    ).toBe(true);
    expect(
      near(pixels.middle, [0x1e, 0x5a, 0x43, 255]),
      `PP-30: the middle is ${pixels.middle.join(",")}, not the item`,
    ).toBe(true);

    await dialog.getByTestId("post-photo-background-keep").click();
    await expect(dialog, "PP-30: the dialog did not close after Keep").toHaveCount(0);
    await expect
      .poll(async () => (await photoRowsOf(listingId)).map((row) => row.width), {
        message: "PP-30: the cut-out is not stored first",
      })
      .toEqual([400, second!.width]);
    const kept = await photoRowsOf(listingId);
    expect(kept[0]!.id, "PP-30: the kept photo kept the old id").not.toBe(first!.id);
    expect(kept[1]!.id).toBe(second!.id);
    expect(await coverOf(listingId), "PP-30: the kept photo is not the cover").toBe(kept[0]!.id);
    await expect(tiles.nth(0)).toHaveAttribute("data-photo-id", kept[0]!.id);
    await expect(tiles.nth(0).getByTestId("post-photo-cover")).toBeVisible();
  });

  /**
   * PP-31 — D159 at the route: a signed-in seller only; two ids; an ad that is
   * not the caller's; the cover only (no try spent on a refusal); two tries an
   * ad, each answered as the image itself, then `backgroundSpent`; the route
   * stores nothing.
   */
  test("PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);
    for (const name of ["meta.png", "meta.webp"] as const) {
      const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
      expect(uploaded.payload["ok"], JSON.stringify(uploaded.payload)).toBe(true);
    }
    const [first, second] = await photoRowsOf(listingId);
    const call = (body: Record<string, unknown>, bearer: string | null = token) =>
      page.request.post(BACKGROUND, {
        headers: {
          "Content-Type": "application/json",
          ...(bearer === null ? {} : { Authorization: `Bearer ${bearer}` }),
        },
        data: body,
      });
    const refusalOf = async (response: Awaited<ReturnType<typeof call>>) =>
      reasons((await response.json()) as Record<string, unknown>);

    expect((await call({ listingId, photoId: first!.id }, null)).status()).toBe(401);
    expect(await refusalOf(await call({ listingId: "not-an-id", photoId: first!.id }))).toEqual([
      { field: "listingId", reason: "badValue" },
    ]);
    const notMine = await call({ listingId: randomUUID(), photoId: first!.id });
    expect(notMine.status()).toBe(403);
    expect(await refusalOf(notMine)).toEqual([{ field: "listingId", reason: "notYourListing" }]);
    const notCover = await call({ listingId, photoId: second!.id });
    expect(notCover.status()).toBe(409);
    expect(await refusalOf(notCover)).toEqual([{ field: "photoId", reason: "notCover" }]);

    for (const left of ["1", "0"]) {
      const answer = await call({ listingId, photoId: first!.id });
      expect(answer.status(), `PP-31: try ${left === "1" ? 1 : 2} was refused`).toBe(200);
      const headers = answer.headers();
      expect(headers["content-type"]).toBe("image/png");
      expect(headers["cache-control"]).toBe("no-store");
      expect(headers["x-tries-left"]).toBe(left);
      expect([...(await answer.body()).subarray(0, 8)]).toEqual([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      ]);
    }
    expect(await refusalOf(await call({ listingId, photoId: first!.id }))).toEqual([
      { field: "background", reason: "backgroundSpent" },
    ]);
    expect(
      (await photoRowsOf(listingId)).map((row) => row.id),
      "PP-31: the route stored or moved a photo",
    ).toEqual([first!.id, second!.id]);
  });

  test("PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183)", async ({
    page,
  }) => {
    const { user, token } = await seller(page);
    const listingId = await draft(page, token, user.id);

    const failed = await uploadPhoto(page, {
      listingId,
      token,
      cover: { name: "marker-13px.jpg" },
    });
    expect(failed.status, JSON.stringify(failed.payload)).toBe(200);
    expect(failed.payload["ok"], JSON.stringify(failed.payload)).toBe(true);
    expect(failed.payload["unscreened"]).toBe(true);
    expect(failed.payload["review"]).toEqual({ label: "fail", code: "not_a_photo" });

    const unsure = await uploadPhoto(page, { listingId, token, cover: { made: [19, 19] } });
    expect(unsure.payload["ok"], JSON.stringify(unsure.payload)).toBe(true);
    expect(unsure.payload["unscreened"]).toBe(true);
    expect(unsure.payload["review"]).toEqual({ label: "unsure" });

    // Fake mode's 11-px width: nudity, refused and never stored (D183).
    const nude = await uploadPhoto(page, { listingId, token, cover: { made: [11, 11] } });
    expect(reasons(nude.payload)).toEqual([{ field: "cover", reason: "nudity" }]);

    const rows = await photoRowsOf(listingId);
    expect(rows, "PP-32: the stored photos").toHaveLength(2);
    const { data: hidden, error: hiddenError } = await adminClient()
      .from("listing_photos")
      .select("id, unscreened")
      .eq("listing_id", listingId);
    if (hiddenError) throw new Error(`[e2e:pp] reading the photos failed: ${hiddenError.message}`);
    expect(
      (hidden ?? []).map((row) => row.unscreened),
      "PP-32: a judged photo is shown",
    ).toEqual([true, true]);

    const { data: reviews, error } = await adminClient()
      .from("listing_photo_reviews")
      .select("label, code, evidence, decided_at")
      .eq("listing_id", listingId)
      .order("created_at");
    if (error) throw new Error(`[e2e:pp] reading the reviews failed: ${error.message}`);
    expect(
      (reviews ?? []).map((row) => [row.label, row.code, row.evidence, row.decided_at]),
    ).toEqual([
      ["fail", "not_a_photo", "fake mode: fixture marker width", null],
      ["unsure", null, "fake mode: fixture marker width", null],
    ]);

    const clientAs = (bearer: string) =>
      createClient(process.env["E2E_SUPABASE_URL"]!, process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!, {
        auth: { persistSession: false },
        global: { headers: { Authorization: `Bearer ${bearer}` } },
      });
    const own = await clientAs(token!)
      .from("listing_photo_reviews")
      .select("photo_id")
      .eq("listing_id", listingId);
    expect(own.error, JSON.stringify(own.error)).toBeNull();
    expect(own.data, "PP-32: the seller reads his own reviews").toHaveLength(2);

    const other = await leaseUser();
    sellers.push(other.id);
    const signedIn = await createClient(
      process.env["E2E_SUPABASE_URL"]!,
      process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!,
      { auth: { persistSession: false } },
    ).auth.signInWithPassword({ email: other.email, password: other.password });
    if (signedIn.error || !signedIn.data.session) {
      throw new Error(`[e2e:pp] signing in seller B failed: ${signedIn.error?.message}`);
    }
    const theirs = await clientAs(signedIn.data.session.access_token)
      .from("listing_photo_reviews")
      .select("photo_id")
      .eq("listing_id", listingId);
    expect(theirs.error, JSON.stringify(theirs.error)).toBeNull();
    expect(theirs.data, "PP-32: another seller read the reviews").toHaveLength(0);

    const ids = rows.map((row) => row.id);
    const keys = await objectsUnder(user.id, listingId);
    expect(keys.length, "PP-32: the stored photos have objects").toBeGreaterThan(0);
    for (const key of keys) {
      expect(
        ids.some((id) => key.includes(id)),
        `PP-32: ${key} names no stored photo`,
      ).toBe(true);
    }
  });
});
