# The failure crawl (DEC-459 (c), INC-1278 in part — cursor bundle 8a)

**Concern.** Every page a person can open meets each failure of each read it makes on load — a
dropped network, a server error, an answer of the wrong shape — and shows the one failure notice
with its next step, or a default the design names; never a blank, a raw error or a silent
default. Every page fits 360, 768 and 1280 px with no sideways scrolling and no control cut by the
viewport.

**Mechanism.** The crawl, `e2e/helpers/failure-crawl.ts` (`crawlPage`), with its pure judge
`e2e/helpers/failure-crawl-judge.ts` and its table `e2e/helpers/crawl-pages.ts`. Seven spec files,
one per area, each declaring its own tests from `crawlArea` (`e2e/helpers/failure-crawl-tests.ts`:
the rows, the titles, the body, the cleanup) — a test belongs to the file that calls `test(`,
which the lanes and the e2e areas read: `failure-crawl-public`, `-member-public`,
`-member-account`, `-member-listings`, `-admin-catalog`, `-admin-content`, `-admin-people`
(the e2e area `failure-crawl`). Each runs in a phone's project only (the crawl sets its own
widths).

## What one page's crawl does

1. Signs in as its audience — a visitor, a member from the pool (`leaseUser()`), staff through
   `e2e/helpers/staff-factor.ts` — and opens its start page (`/dev/tall` for visitors and
   members, `/admin/` for staff) and lets it settle; a page's own reads are the ones its start
   page did not make.
2. Opens the page at 1280, 768 and 360 px: no page error, no `[client-error]` line, no sideways
   scroll, no control cut by the viewport (`judgeNormal`). The reads of the 360 load are
   recorded, each under its key (`readOf`: `rpc <name>`, `rest <table> <method>`, `api <path>`
   with a row's id as `:id` and a market's code as `:country`, `auth <path>`, `storage …`,
   `serverFn <hash>`), and the alerts it shows are the baseline.
3. For each recorded read, loads again at 360 with that read alone failed: a dropped network,
   and the provider's real server error (`src/test/provider-errors.ts`, `PROVIDER_ERRORS`,
   captured from the tools — CF-PROVERR-1); the page's first read once more answers a body of
   the wrong shape. A page whose first read comes from the server's stream is reached by a
   client navigation (`via: "client"`), where the loader's read is the browser's.
4. Waits until the screen says so, or the page has been quiet for 4.5 s, or 45 s passed — the
   cap covers a data read tried four times by the query client and four times by the data
   client on each (`@supabase/postgrest-js`, a GET). "Says so" is the failure notice
   (`data-failure-reason`), the on-demand notice, the in-place one, the router's page-failed
   answer (`route-error-refresh`), or a screen's own words in an alert the ordinary load did not
   show. `judgeForced` then fails a page error, a blank page, a raw failure's words (the forced
   body, the provider's message) on screen, and a read that failed with nothing said.

## The allowlist — `scripts/conformance/failure-crawl-allowlist.txt`

Grammar `key | reason | until` (`until`: a date, an INC or DEC number, or `permanent` for a
designed default):

- `page <route>` — a page route the crawl does not open (the staff shell's layout route; the
  impersonation page, which no crawl can hold a session for, `| INC-1278`);
- `footer <key>` — a footer item with no page yet (`| DEC-463`): its route's landing makes the
  line stale, and the page is owed;
- `read <route> <read key>` — a read whose failure the page meets by design with no notice; with
  ` (<forced>)` one forced failure of it only; `read <route> as <audience> …` for one audience;
  `read * <read key>` a shell-wide read on every page (asked on some loads only, so no one page
  calls it stale);
- `default <file> <function>` — a designed default the crawl does not meet on a page's load
  (INC-1305's reads that wait for a person's step).

A `permanent` `read` line excuses the silence only. A line whose `until` names a reported defect
(`| INC-1278`, with its file and line) excuses every problem of that forced failure — those
defaults are not fixed in the crawl's lane; each is a finding of its report, fixed by its own
turn, which retires the line.

## Guards

- **CF-CRAWL-1** (`scripts/conformance/failure-crawl.ts`, `failure-crawl.test.ts` CFC-1…5): every
  page route of `src/routeTree.gen.ts` (a route whose file is a `.tsx` page) is a row of the
  table or a `page` line; every footer item with no route is a `footer` line; a `default` line's
  function still lives in its file; a `read` line belongs to a crawled route (or `*`); a planted
  route fails, a row on no page route fails, a stale line fails. Named in `wired.test.ts`.
- **FCJ-1…12** (`src/test/failure-crawl.test.ts`): the judge's readings, with a planted page
  answer that swallows a failure (FCJ-3), the per-failure, per-audience and shell-wide lines,
  and a reported defect's line against a designed one.
- The crawl itself: FCR-1…78 (58 rows), one test a page and audience
  (`e2e/helpers/crawl-pages.ts`).

## It misses

A failure a read meets after the load (a press, a later step); a page drawn by a route the
generated tree does not list; a read the server makes for the page (its stream's first feed page,
`readFirstFeedPage`, is crawled through its client re-read only).
