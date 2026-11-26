import type { Page, TestInfo } from "@playwright/test";
import { expect } from "../fixtures";
import { pagesOf, type CrawlArea, type CrawlPage } from "./crawl-pages";
import { crawlFixtures } from "./crawl-fixtures";
import { crawlPage } from "./failure-crawl";
import { projectLayoutOf } from "./layout";
import { signInStaff } from "./staff-factor";
import { pooledSuperAdmin, signInViaSession } from "./ui";

/** A page's whole crawl: three widths, then two or three forced loads a read. */
const CRAWL_TIMEOUT_MS = 900_000;

/**
 * DEC-459 (c) — one area's crawl, one test a page and audience (crawl-pages.ts). The area's spec
 * file declares each test itself (a test belongs to the file that calls `test(`, which is what the
 * lanes and the e2e areas read): its rows, its titles, the body each runs and the fixtures'
 * cleanup come from here. The body signs in as the row's audience, fills the route's params from
 * its own scratch rows (crawl-fixtures.ts) and asserts the crawl found no problem.
 */
export function crawlArea(area: CrawlArea) {
  const fixtures = crawlFixtures();
  return {
    rows: pagesOf(area),
    title: (row: CrawlPage) =>
      `${row.id} ${row.route} as ${row.audience}: loads clean and says every failed read`,
    cleanup: () => fixtures.cleanup(),
    async run(page: Page, testInfo: TestInfo, row: CrawlPage): Promise<void> {
      testInfo.skip(
        projectLayoutOf(testInfo) !== "mobile",
        "the crawl sets its own widths (360, 768, 1280): it runs once, in a phone's project",
      );
      testInfo.setTimeout(CRAWL_TIMEOUT_MS);
      if (row.audience === "member") {
        const member = await fixtures.scratchSeller();
        await signInViaSession(page, member.email, member.password);
      }
      if (row.audience === "staff") await signInStaff(page, pooledSuperAdmin());
      const path = await fixtures.pathOf(row.route);
      const result = await crawlPage(page, row, path);
      await testInfo.attach("failure-crawl", {
        body: JSON.stringify(result, null, 2),
        contentType: "application/json",
      });
      expect(result.problems, result.problems.join("\n")).toEqual([]);
    },
  };
}
