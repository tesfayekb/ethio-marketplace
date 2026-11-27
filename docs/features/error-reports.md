# Feature: Our own error reports (DEC-474 Part F)

Every failure in the field that is ours is recorded once, cleaned, grouped and readable by staff
holding `errors:view`. Built by cursor bundle 8b (`docs/governance/briefs/cursor-bundle-8b.md`,
rulings 1–3). Before it, a failed read in a seller's browser left a `[client-error]` line in that
browser's console and nowhere else, and a server's 500 left one `[ssr-error]` line the operator
could not read without the platform's logs (G70).

## What is reported, and by whom

- **The browser, by one trigger** — `reportBrowserFailure` (`src/lib/error-report.ts`). Three
  callers, each on a mechanism that already decides what a failure is:
  - the drawn failure notice (`FailureNotice`, through `useNoticeReport` in
    `src/components/shell/failure-reason.ts`): a present failure whose drawn reading is `server`
    is reported as kind `notice` once the reader has read it, with the typed failure's code or
    status (`noticeReport`); a refusal (`network`, `gone`, `changed`, `noAccess`, `signedOut`,
    `stepUp`, `rateLimited`, `refused`), an offline reading and a notice with no error (`null` or
    `undefined`, a given reading included) are never reported (INC-1319). Reading a failure
    (`useFailureKind`) sends nothing;
  - the crash boundary (`src/routes/__root.tsx` `ErrorComponent`), kind `crash`;
  - the page's unhandled errors and rejections (`listenForFailures`, registered by the client entry
    `src/client.tsx`), kind `unhandled`.
- **The server** — `serverError` (`src/server/answer.ts`) reports every 500 it answers as kind
  `route` (code `"500"`), and an auth server failure (INC-1312, `src/server/supabase/user-client.ts`)
  as kind `upstream` (code `"503"`), through `reportFailureLater`: not awaited, a 3-second write
  deadline (`WRITE_DEADLINE_MS`), and a failed write logged once as `[error-report] write failed`,
  never retried and never reported. Per server instance: the same failure once a minute and at
  most 30 a minute (`SERVER_REPORTS_PER_MINUTE`).
- The kinds are one list, `public.error_report_kinds()` (`notice`, `crash`, `unhandled`, `route`,
  `upstream`, `render`), mirrored by `ERROR_KINDS` in `src/lib/error-clean.ts`; the browser sends
  only its three (`BROWSER_KINDS`). `render` is in the list, but nothing sends it yet: the server
  render's error line (`[ssr-error] render`, `src/lib/error-capture.ts`) and `src/server.ts` lay
  outside this lane's scope.

## What a report holds

When; the page path without its query or fragment; the kind; the code (a typed failure's code or
status); the cleaned message and place (the first frame of our own code, file and line, no
query); browser, engine and version; device type (phone, tablet, desktop); the page language; the
app version (always null today: the build exposes no commit to the browser or the server — ruling
1); signed in or not. Never an account id, a name, an e-mail, a phone number, a network address, a
token, a query string, a request body or a cookie.

**The one cleaner** (`src/lib/error-clean.ts`) is pure. The browser runs it before it sends, and
the server runs it again before it writes (the server is the authority). It replaces an e-mail
(`<email>`), a bearer, a JWT or any run of 32 or more `[A-Za-z0-9_-]` characters (`<token>`), an
IPv4 or IPv6 address (`<address>`) and a phone-shaped digit run (`<phone>`), and drops a query
string and a fragment. Each output fits its column; the table's
CHECKs refuse anything longer or shaped otherwise.

## The write

`POST /api/error-reports` (`src/routes/api/error-reports.ts`, shape `src/lib/schemas/error-report.ts`)
is a public write (OWASP ASVS V11), in this order: the byte ceiling (4096 bytes,
`ERROR_REPORT_MAX_BYTES`) by header and then by the counting reader; the caller (optional: a bearer
is verified, none is anonymous); the address dial `errorReportAddress` (`src/lib/dials.ts`: 60 an
hour per hashed address, `RATE_LIMIT_ERROR_REPORT_PER_HOUR`) spent before the body is read; then
the strict shape. A refused report writes nothing. The cleaning and the write
(`src/server/error-reports.ts`) load on demand. A failure of this route is never itself reported.

The browser's sender (`src/lib/error-report-send.ts`) and the cleaner download only when a failure
happens (`loadOnce`); nothing joins any page's first download. The sender carries no zod: its
payload is typed by the shape (a type-only import) and kept inside it by the cleaner and its own
bounds, and the server's strict shape judges it. The sender sends at most five reports per page
visit (`REPORTS_PER_VISIT`) and the same failure once, sends nothing while the device is offline,
and never throws: a failed download or send is logged once as `[error-report] send failed` (a
report the route refuses as a warning, since it is no failure of the page) and dropped.

The failure crawl (`e2e/helpers/failure-crawl.ts`) answers its pages' reports itself with the
route's success answer, so the failures it forces spend no dial and write no row; its read
recorder leaves the route out. The route itself is proven by `e2e/error-reports.spec.ts`.

## The table and its doors

`public.error_reports` (`supabase/migrations/20261126233000_…sql`) is born closed: four deny
policies, no browser grant. The one write is `record_error_report(…)`, service role only. It
computes the message's shape (a uuid, a quoted value, a long hex id and each run of digits
replaced) and the group key, `md5(kind, code, shape, place)`. Two indexes: `(seen_at, id)` for a
window and the erase, and `(group_key, seen_at, id)` for one group's reports.

The three staff doors (`supabase/migrations/20261126233100_…sql`) gate through
`door_context('staff-reader', 'errors', 'view', …)` and refuse through `door_refuse`, each with its
manifest line. The `errors:view` permission is granted to the `admin` role:

- `admin_error_groups(p_days = 7, p_kind)`: the groups of a window, with count, first seen and
  last seen;
- `admin_error_occurrences(p_group, p_before_at, p_before_id, p_limit = 50)`: one group's reports,
  a keyset page;
- `admin_error_stats(p_days = 7)`: counts per day by kind, and the top pages, browsers and
  versions.

Their client readers are `src/features/admin-errors/errors-service.ts`, over `rpc` from
`src/lib/supabase-door.ts`. A door's refusal is thrown as the typed failure (`readFailed`), and
an answer out of its promised shape is refused. The door-words family is
`src/features/admin-errors/errors-refusals.ts`. The Errors page (Lovable) draws only these three
doors.

**Retention.** Reports are erased after 12 months (DEC-130) by `error_reports_prune()`, the
house's prune form (`error_reports_prune_core(p_only uuid[])` and its wrapper), scheduled daily as
`error-reports-prune` (`29 4 * * *`). It keeps a heartbeat in `error_reports_prune_runs`, which
keeps 14 days.

## The guard

The reporter census (`scripts/conformance/error-reports.ts`, ERCE-1…5, allowlist
`error-reports-allowlist.txt`; `docs/features/ci-guards.md`) checks five things:

- a module that builds a `server` reading by hand reaches the reporter;
- every crash boundary reports;
- a notice report is made only by the notice's one reading, and never for a refusal kind;
- no 500 is built outside `serverError`;
- every notice drawn without its failure — `error={null}` or `error={undefined}`, or a given
  reading that is neither `goneReading()` / `rateReading()` nor an object the file builds — is
  named (`unseen`, keyed by the element's testid), because the reporter never sees it.

The browser proof is `e2e/error-reports.spec.ts`:

- ER-1: a 500 on the feed's read records exactly one `notice` row, with code `"500"`, path `/`
  and signed out, read back by database truth;
- ER-2: a 403 draws the refusal and sends nothing.

Each test's rows carry an `e2e-` tag in the message. They are removed by id in `afterEach`, along
with the test's own address-meter row.
