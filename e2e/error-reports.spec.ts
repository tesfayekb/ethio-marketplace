import { createHash } from "node:crypto";
import type { Page, TestInfo } from "@playwright/test";

import { en } from "../src/i18n/locales/en";
import { expect, test } from "./fixtures";
import { RUN, stopPageBeforePurge } from "./helpers/posting";
import { SCRATCH_PREFIXES } from "./helpers/scratch";
import { gotoReady } from "./helpers/ui";
import { adminClient } from "./helpers/users";

/**
 * DEC-474 Part F (cursor-bundle-8b) — OUR OWN ERROR REPORTS (ER-1, ER-2). The listings page's own
 * feed read fails (the server's first page is off, so the browser reads /api/feed itself):
 *   ER-1 as a server failure — the notice shows, and exactly one report row holds the test's tag;
 *   ER-2 as a refusal — the notice shows, no report is sent and no row holds the tag.
 * The tag rides in the forced answer's error, a value the test controls (J1), and so in the
 * report's message (its code is the status: the notice keeps only a code it knows); it is short,
 * dot-joined, with a letters-only draw and none of LIKE's wildcards, so the one cleaner
 * (src/lib/error-clean.ts) keeps it whole and the read matches it literally.
 * Each test's report is counted on its own address meter (`x-e2e-catalog-find-key`), so the
 * lanes' shared address never refuses it. DB truth via the service client (J4); every row the tag
 * names and the meter's row are removed by id in afterEach by a destroy that throws (J3). The page
 * lives until after afterEach and its sender downloads on demand, so a report can still be posted
 * while the hook reads: the hook stops the page first (`stopPageBeforePurge`, INC-323).
 * A run that dies before its afterEach leaves its rows behind, and the shard-1 setup's sweep
 * (e2e/global-setup.ts, INC-1334) removes the rows carrying this tag once they are older than three
 * hours.
 */

const REPORTS = "/api/error-reports";
const METER_ACTION = "error-report:address";

function letters(count: number): string {
  return Array.from({ length: count }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  ).join("");
}

function tagOf(info: TestInfo): string {
  return [
    `${SCRATCH_PREFIXES.dash}erep`,
    RUN,
    String(info.workerIndex),
    info.project.name,
    letters(8),
  ].join(".");
}

function meterKey(tag: string): string {
  return createHash("sha256").update(`e2e:${tag}`).digest("hex");
}

async function reportRows(tag: string) {
  const { data, error } = await adminClient()
    .from("error_reports")
    .select("id, kind, code, message, path, signed_in")
    .like("message", `%${tag}%`);
  if (error) throw new Error(`[e2e:er] reading the reports of ${tag} failed: ${error.message}`);
  return data;
}

/** Fails every feed read with `status` and the tag as its code; meters the report on its own key. */
async function failFeed(page: Page, tag: string, status: number): Promise<string[]> {
  const sent: string[] = [];
  await page.route("**/api/feed*", (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify({ error: tag }),
    }),
  );
  await page.route(`**${REPORTS}`, (route) => {
    sent.push(route.request().method());
    return route.continue({
      headers: { ...route.request().headers(), "x-e2e-catalog-find-key": tag },
    });
  });
  return sent;
}

test.describe("our own error reports (DEC-474 Part F)", () => {
  const tags: string[] = [];

  test.afterEach(async ({ page }) => {
    await stopPageBeforePurge(page);
    const supabase = adminClient();
    for (const tag of tags.splice(0)) {
      const ids = (await reportRows(tag)).map((row) => row.id);
      if (ids.length > 0) {
        const removed = await supabase.from("error_reports").delete().in("id", ids).select("id");
        if (removed.error)
          throw new Error(
            `[e2e:er] removing the reports of ${tag} failed: ${removed.error.message}`,
          );
        if (removed.data.length !== ids.length)
          throw new Error(
            `[e2e:er] removed ${removed.data.length} of ${ids.length} reports of ${tag}`,
          );
      }
      const meter = await supabase
        .from("rate_limits")
        .delete()
        .eq("action", METER_ACTION)
        .eq("key", meterKey(tag));
      if (meter.error)
        throw new Error(`[e2e:er] removing the meter of ${tag} failed: ${meter.error.message}`);
    }
  });

  test("ER-1 a server failure on a page is reported once", async ({ page, baseURL }, info) => {
    const tag = tagOf(info);
    tags.push(tag);
    await page.context().addCookies([{ name: "e2e_first_screen", value: "off", url: baseURL }]);
    const sent = await failFeed(page, tag, 500);

    const answered = page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === REPORTS && response.request().method() === "POST",
      { timeout: 45_000 },
    );
    await gotoReady(page, "/");
    await expect(page.getByTestId("feed-error")).toBeVisible({ timeout: 30_000 });
    expect((await answered).status(), "ER-1: the report's answer").toBe(200);
    await expect
      .poll(async () => (await reportRows(tag)).length, {
        timeout: 20_000,
        message: `ER-1: no report row holds ${tag}`,
      })
      .toBe(1);
    const rows = await reportRows(tag);
    expect(rows, `ER-1: the rows that hold ${tag}`).toHaveLength(1);
    const [row] = rows;
    expect(row?.kind).toBe("notice");
    expect(row?.code).toBe("500");
    expect(row?.path).toBe("/");
    expect(row?.signed_in).toBe(false);
    expect(row?.message).toContain(tag);
    expect(sent).toEqual(["POST"]);
  });

  test("ER-2 a refusal on a page is never reported", async ({ page, baseURL }, info) => {
    const tag = tagOf(info);
    tags.push(tag);
    await page.context().addCookies([{ name: "e2e_first_screen", value: "off", url: baseURL }]);
    const sent = await failFeed(page, tag, 403);

    await gotoReady(page, "/");
    // The refusal's own words and step are drawn only once the reader has read it; a report, had
    // one been made, would download its sender and post before the network goes quiet.
    const notice = page.getByTestId("feed-error");
    await expect(notice).toContainText(en["failure.noAccess"], { timeout: 30_000 });
    await expect(page.getByTestId("feed-error-back")).toBeVisible();
    await page.waitForLoadState("networkidle");
    expect(sent, "ER-2: the refusal sent a report").toEqual([]);
    expect(await reportRows(tag), `ER-2: a row holds ${tag}`).toEqual([]);
  });
});
