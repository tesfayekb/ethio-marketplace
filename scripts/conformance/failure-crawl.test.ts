import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { readAllowlist } from "./kit";
import { CRAWL_ALLOWLIST, crawlCensus, pageRoutes, unroutedFooterItems } from "./failure-crawl";

/**
 * DEC-459 (c), INC-1278 (CF-CRAWL-1) — every page route is crawled or named; every footer item
 * with no route is owed by a `| DEC-463` line; a designed default names a function that still
 * lives in its file; a line that names nothing is stale. Lines read `key | reason | until`
 * (scripts/conformance/failure-crawl-allowlist.txt).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, CRAWL_ALLOWLIST);

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

function tempFile(text: string): string {
  const dir = mkdtempSync(join(tmpdir(), "failure-crawl-"));
  temps.push(dir);
  const path = join(dir, "allowlist.txt");
  writeFileSync(path, text);
  return path;
}

/** The owed keys no allowlist line names. */
function unnamed(pages?: string[]): string[] {
  const text = readFileSync(ALLOWLIST, "utf8");
  const { owed, found } = crawlCensus(ROOT, text, pages);
  const allowed = readAllowlist(ALLOWLIST, found, { permanent: true });
  return owed.filter((key) => !allowed.has(key));
}

describe("the failure crawl's page coverage (CF-CRAWL-1)", () => {
  it("CFC-1 every page route is crawled or named, every row crawls a page, and no line is stale", () => {
    const { findings } = crawlCensus(ROOT, readFileSync(ALLOWLIST, "utf8"));
    expect(findings).toEqual([]);
    expect(unnamed()).toEqual([]);
  });

  it("CFC-2 planted: a page route nobody crawls or names fails", () => {
    expect(unnamed([...pageRoutes(ROOT), "/planted"])).toEqual(["page /planted"]);
  });

  it("CFC-3 planted: a row that crawls no page route fails", () => {
    const { findings } = crawlCensus(ROOT, "", pageRoutes(ROOT), [
      { id: "FCR-999", route: "/api/feed", audience: "visitor", area: "public" },
    ]);
    expect(findings).toEqual([{ what: "FCR-999 crawls /api/feed, which is no page route" }]);
  });

  it("CFC-4 a line that names nothing is stale: a crawled page, a read of no crawled route, a default whose function left", () => {
    const text = readFileSync(ALLOWLIST, "utf8");
    const { found } = crawlCensus(
      ROOT,
      [
        text,
        "page / | crawled | permanent",
        "read /nowhere api /api/feed | a route the crawl does not open | permanent",
        "default src/features/ad-page/similar.ts goneFunction | it left | permanent",
      ].join("\n"),
    );
    for (const line of [
      "page / | crawled | permanent",
      "read /nowhere api /api/feed | a route the crawl does not open | permanent",
      "default src/features/ad-page/similar.ts goneFunction | it left | permanent",
    ])
      expect(() => readAllowlist(tempFile(`${line}\n`), found, { permanent: true })).toThrow(
        /stale allowance/,
      );
    expect(() =>
      readAllowlist(
        tempFile("default src/features/ad-page/similar.ts similarListings | kept | permanent\n"),
        crawlCensus(
          ROOT,
          "default src/features/ad-page/similar.ts similarListings | kept | permanent",
        ).found,
        { permanent: true },
      ),
    ).not.toThrow();
  });

  it("CFC-5 a footer item with no route is a page owed; a routed one is not", () => {
    const root = mkdtempSync(join(tmpdir(), "failure-crawl-footer-"));
    temps.push(root);
    const footer = join(root, "src", "components", "shell", "app-footer.tsx");
    mkdirSync(dirname(footer), { recursive: true });
    writeFileSync(
      footer,
      [
        'const ROUTED: Partial<Record<MessageKey, { to: "/terms" }>> = {',
        '  "footer.terms": { to: "/terms", testid: "footer-terms" },',
        "};",
        "const COLUMNS: FooterColumn[] = [",
        '  { headingKey: "footer.a", items: ["footer.about", "footer.terms"] },',
        "];",
      ].join("\n"),
    );
    expect(unroutedFooterItems(root)).toEqual(["footer.about"]);
    for (const key of unroutedFooterItems(ROOT))
      expect(readFileSync(ALLOWLIST, "utf8")).toMatch(
        new RegExp(`^footer ${key.replace(/\./g, "\\.")} \\|.*\\| DEC-463$`, "m"),
      );
  });
});
