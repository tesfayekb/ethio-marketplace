import { createHash } from "node:crypto";
import type { Page, TestInfo } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { SIGN_OUT_LANDING } from "../src/lib/sign-out-landing";
import { expect, test } from "./fixtures";
import { TWIN_BOUNDARY } from "./helpers/admin-attributes";
import { isCardTwin } from "./helpers/layout";
import { RUN, stopPageBeforePurge } from "./helpers/posting";
import { SCRATCH_PREFIXES } from "./helpers/scratch";
import { signInStaff } from "./helpers/staff-factor";
import { gotoReady, waitForHydration } from "./helpers/ui";
import { adminClient, grantRole, leaseUser } from "./helpers/users";

/**
 * CURSOR BUNDLE 8c-1, PART C (INC-1331) — THE STAFF ERRORS PAGES, AS A PERSON MEETS THEM (ERB-1, ERB-2).
 * The reports are service-client table rows (error_reports is closed to the browser roles), each message
 * starting `e2e-` and carrying the test's tag: run × shard × worker × project × letters (J1). Both rows
 * of a test are of the kind `upstream`, which the server alone writes and the other specs never
 * seed, so the kind filter keeps the staff table to this test's rows beside whatever the staging
 * project holds (J6: found by their group key, never by position).
 *   ERB-1 a staff member with errors:view sees the seeded group; a 1-day window leaves out a report seeded
 *         three days earlier; the group opens to its report; Back returns with the window and kind kept.
 *   ERB-2 signed out, and a staff member without errors:view, draw no report.
 * DB truth via the service client (J4); every row a test seeded is removed by id in afterEach by a destroy
 * that throws (J3). The page is stopped first (`stopPageBeforePurge`, INC-323) so no read of the table
 * runs while the rows go. A run that dies before its afterEach leaves its rows behind, and the
 * shard-1 setup's sweep (e2e/global-setup.ts, INC-1334) removes them once they are older than three
 * hours: found by this tag in the message and by `created_at`, never by `seen_at` (ERB-1 dates its
 * rows three days back).
 */

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const KIND = "upstream";

type Seeded = { id: string; group: string; message: string };

function letters(count: number): string {
  return Array.from({ length: count }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  ).join("");
}

function tagOf(info: TestInfo): string {
  return [
    `${SCRATCH_PREFIXES.dash}erb`,
    RUN,
    String(info.workerIndex),
    info.project.name,
    letters(8),
  ].join(".");
}

/** One report of the kind `upstream`, seen `ageMs` ago, in a group of its own (the key is md5 of its tag). */
async function seedReport(tag: string, label: string, ageMs: number): Promise<Seeded> {
  const message = `${tag}.${label}`;
  const group = createHash("md5").update(message).digest("hex");
  const { data, error } = await adminClient()
    .from("error_reports")
    .insert({
      kind: KIND,
      message,
      shape: message,
      path: "/e2e-erb",
      signed_in: false,
      group_key: group,
      seen_at: new Date(Date.now() - ageMs).toISOString(),
    })
    .select("id")
    .single();
  if (error) throw new Error(`[e2e:erb] seeding ${message} failed: ${error.message}`);
  return { id: data.id, group, message };
}

/** The search part the staff pages carry. */
function searchOf(page: Page): { days: string | null; kind: string | null } {
  const url = new URL(page.url());
  return { days: url.searchParams.get("days"), kind: url.searchParams.get("kind") };
}

/** A row's test id on this viewport: the table's row, or its card twin through `lg`. */
function twinId(page: Page, id: string): string {
  return isCardTwin(page, TWIN_BOUNDARY) ? `${id}-card` : id;
}

test.describe("ERB — the staff Errors pages (INC-1331)", () => {
  const seeded: Seeded[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    const ids = seeded.splice(0).map((row) => row.id);
    if (ids.length === 0) return;
    const removed = await adminClient().from("error_reports").delete().in("id", ids).select("id");
    if (removed.error)
      throw new Error(`[e2e:erb] removing the seeded reports failed: ${removed.error.message}`);
    if (removed.data.length !== ids.length)
      throw new Error(`[e2e:erb] removed ${removed.data.length} of ${ids.length} seeded reports`);
  });

  test("ERB-1 a staff member sees the seeded group, a 1-day window leaves out a three-day-old report, the group opens, and Back keeps the window and kind", async ({
    page,
  }, info) => {
    const tag = tagOf(info);
    const recent = await seedReport(tag, "recent", HOUR);
    seeded.push(recent);
    const older = await seedReport(tag, "older", 3 * DAY);
    seeded.push(older);

    const staff = await leaseUser();
    await grantRole(staff.id, "admin");
    await signInStaff(page, staff);
    await waitForHydration(page);

    await gotoReady(page, `/admin/errors?days=7&kind=${KIND}`);
    const groupOf = (row: Seeded) => page.getByTestId(twinId(page, `errors-group-${row.group}`));
    await expect(page.getByTestId("admin-section-errors")).toBeVisible({ timeout: 30_000 });
    await expect(groupOf(recent)).toBeVisible({ timeout: 30_000 });
    await expect(groupOf(older)).toBeVisible();

    // A 1-day window keeps the report seen an hour ago and leaves out the one seen three days ago.
    await page.getByTestId("errors-window").selectOption("1");
    await expect.poll(() => searchOf(page).days, { timeout: 15_000 }).toBe("1");
    await expect(groupOf(recent)).toBeVisible({ timeout: 30_000 });
    await expect(groupOf(older)).toHaveCount(0);

    // The group opens to its reports, on its own address, carrying the window and the kind.
    await groupOf(recent).click();
    await expect(page.getByTestId("errors-reports-header")).toBeVisible({ timeout: 30_000 });
    expect(new URL(page.url()).pathname).toBe(`/admin/errors/${recent.group}`);
    expect(searchOf(page)).toEqual({ days: "1", kind: KIND });
    await expect(page.getByTestId(twinId(page, `errors-report-${recent.id}`))).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.getByTestId(twinId(page, `errors-report-${older.id}`))).toHaveCount(0);

    // Back returns to the list with the window and the kind as they were.
    await page.getByTestId("errors-back").click();
    await expect(page.getByTestId("errors-window")).toBeVisible({ timeout: 30_000 });
    expect(new URL(page.url()).pathname).toBe("/admin/errors");
    expect(searchOf(page)).toEqual({ days: "1", kind: KIND });
    await expect(page.getByTestId("errors-window")).toHaveValue("1");
    await expect(page.getByTestId("errors-kind")).toHaveValue(KIND);
    await expect(groupOf(recent)).toBeVisible({ timeout: 30_000 });
    await expect(groupOf(older)).toHaveCount(0);
  });

  test("ERB-2 signed out, and a staff member without errors:view, are shown no report", async ({
    page,
  }, info) => {
    const tag = tagOf(info);
    const report = await seedReport(tag, "recent", HOUR);
    seeded.push(report);
    const address = `/admin/errors?days=7&kind=${KIND}`;
    const drawn = (row: Seeded) => page.locator(`[data-testid^="errors-group-${row.group}"]`);

    // Signed out: the staff layout sends the visitor to the shared landing (DEC-279) at once; nothing
    // of the screen opens.
    await gotoReady(page, address);
    await expect
      .poll(() => new URL(page.url()).pathname, { timeout: 20_000 })
      .toBe(SIGN_OUT_LANDING);
    await expect(page.getByTestId("admin-section-errors")).toHaveCount(0);
    await expect(drawn(report)).toHaveCount(0);

    // A moderator holds the staff panel but not errors:view: the layout refuses the section and
    // shows the notice on the panel's landing.
    const moderator = await leaseUser();
    await grantRole(moderator.id, "moderator");
    await signInStaff(page, moderator);
    await waitForHydration(page);
    await page.goto(address);
    await waitForHydration(page);
    await expect(page).toHaveURL(/\/admin$/, { timeout: 20_000 });
    await expect(page.getByText(en["admin.accessDenied"])).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("admin-section-errors")).toHaveCount(0);
    await expect(drawn(report)).toHaveCount(0);
  });
});
