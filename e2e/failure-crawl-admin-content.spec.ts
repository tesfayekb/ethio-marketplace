import { test } from "./fixtures";
import { crawlArea } from "./helpers/failure-crawl-tests";

/** DEC-459 (c) — the failure crawl: the staff console's content pages (e2e/helpers/crawl-pages.ts, area `admin-content`). */
const crawl = crawlArea("admin-content");

test.describe("FAILURE CRAWL — the staff console's content pages (DEC-459 c)", () => {
  test.afterEach(() => crawl.cleanup());
  for (const row of crawl.rows)
    test(crawl.title(row), ({ page }, testInfo) => crawl.run(page, testInfo, row));
});
