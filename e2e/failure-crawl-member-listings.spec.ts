import { test } from "./fixtures";
import { crawlArea } from "./helpers/failure-crawl-tests";

/** DEC-459 (c) — the failure crawl: the member's ads and the wizard (e2e/helpers/crawl-pages.ts, area `member-listings`). */
const crawl = crawlArea("member-listings");

test.describe("FAILURE CRAWL — the member's ads and the wizard (DEC-459 c)", () => {
  test.afterEach(() => crawl.cleanup());
  for (const row of crawl.rows)
    test(crawl.title(row), ({ page }, testInfo) => crawl.run(page, testInfo, row));
});
