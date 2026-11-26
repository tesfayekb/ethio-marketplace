import { test } from "./fixtures";
import { crawlArea } from "./helpers/failure-crawl-tests";

/** DEC-459 (c) — the failure crawl: public pages, signed out (e2e/helpers/crawl-pages.ts, area `public`). */
const crawl = crawlArea("public");

test.describe("FAILURE CRAWL — public pages, signed out (DEC-459 c)", () => {
  test.afterEach(() => crawl.cleanup());
  for (const row of crawl.rows)
    test(crawl.title(row), ({ page }, testInfo) => crawl.run(page, testInfo, row));
});
