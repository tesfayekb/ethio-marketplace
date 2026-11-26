import { test } from "./fixtures";
import { crawlArea } from "./helpers/failure-crawl-tests";

/** DEC-459 (c) — the failure crawl: public pages, signed in (e2e/helpers/crawl-pages.ts, area `member-public`). */
const crawl = crawlArea("member-public");

test.describe("FAILURE CRAWL — public pages, signed in (DEC-459 c)", () => {
  test.afterEach(() => crawl.cleanup());
  for (const row of crawl.rows)
    test(crawl.title(row), ({ page }, testInfo) => crawl.run(page, testInfo, row));
});
