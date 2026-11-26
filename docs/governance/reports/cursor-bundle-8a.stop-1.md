STOP — cursor-bundle-8a STEP 1 (the census): a premise of the GO is wrong — `PROVIDER_ERRORS` holds no server-error body
DONE: STEP 0 (commit 0e0bbf556: the brief saved, sha256 d652e014b41a288a66dbb7acf49453346dab6b526441dbf0c95111c17c6f6f2a, equal to the carrier's; roadmap line 3; the briefs allowlist held no line to remove; `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8a.md --root .` answered `[check-go] no finding`); STEP 1 in part (the premises below)
LEFT: STEP 1's remaining items, parts 1, 2 and 3, STEPS 5–8
CI: root ci-status.md (dev) — `Commit: e482f930e47b4671bbfe98b3f6ff257a21ad4a60 (short e482f93)` · `Conclusion: SUCCESS` · `Completed (UTC): 2026-11-26T16:37:40Z` · run 45859462412. The base 70df93185 (origin/dev, equal to the brief's base) has no completed run yet: run 45859549094 was in progress when read (STALE for the base, rule 40).
FILES:
docs/governance/briefs/cursor-bundle-8a.md
roadmap.md

## The wrong premise (the STOP)

THE SYSTEM, fix 1, MECHANISM: "The server errors it forces are the provider's real bodies from
`src/test/provider-errors.ts` (`PROVIDER_ERRORS`, CF-PROVERR-1), never invented text."

`PROVIDER_ERRORS` holds no server error. Its 26 entries are the client library's `TypeError`
(no status), the auth server's and auth-js's refusals at 400, 403, 422 and 429, and `disposableEmail`
at 403 (`rg -n "status" src/test/provider-errors.ts`: every status is 400, 403, 422 or 429). The
crawl fails the page's reads on four backends — the data API and its remote procedure calls
(PostgREST), the sign-in server, storage, and our own `/api/*` routes — and none of them has a 5xx
body in the fixture. A 4xx entry sent at 500, or a body written here, would be invented text, which
the brief and rule 20 ("fixtures are captured from real tool output, never authored") forbid.
`src/test/provider-errors.ts` and its test are outside SCOPE, so adding the missing bodies there is a
STOP too.

Real 5xx bodies the repository already holds, for the ruling to choose from:
- the sign-in server: `{"code":500,"error_code":"unexpected_failure","msg":"Unexpected failure,
  please check server logs for more information"}`, captured by CI (flake ledger, run 45673729426 and
  later: `[e2e:setup] POST /factors/[account id]/challenge failed (500)`);
- our own routes: `serverError` answers `{ error: "server error", incident }` at 500
  (`src/server/answer.ts:173–181`);
- PostgREST and storage: none found in the repository (`rg -n "unexpected_failure|PGRST000|XX000"
  src/test`: none). An entry would cite the vendor's source at the version the backend runs, as the
  fixture's other entries do.

Proposed: the ruling widens SCOPE to `src/test/provider-errors.ts` and
`src/test/provider-errors.test.ts`, to add one server-error entry per backend the crawl fails (each
with its vendor source line or its captured run), and the crawl reads them from there.

## The other questions the census raised (answered by the same ruling, so the turn needs one)

Q2 — where the crawl helper's planted unit case lives. Vitest reads `src/**/*.test.{ts,tsx}` and
`scripts/**/*.test.ts` only, and excludes `e2e/**` (vitest.config.ts:31–32); every e2e helper's unit
test is under `src/test/` (`e2e-route-guard.test.ts`, `one-line-judge.test.ts`,
`e2e-net-retry.test.ts`), which is outside SCOPE. Proposed: the planted case sits in the page-coverage
census's test under `scripts/conformance/` (in SCOPE), importing the helper's pure judge; or the
ruling adds `src/test/failure-crawl.test.ts` to SCOPE, as the precedent places it.

Q3 — the footer pages. About, Contact and Safety have no route: `src/components/shell/app-footer.tsx`
:9–27 draws them as plain text (`ROUTED` names only Terms and Privacy), and `src/routeTree.gen.ts` has no path for them. A page-coverage
census that reads `routeTree.gen.ts` finds no page for a `| DEC-463` line, and its stale-line rule
(kit.ts) fails such a line. Proposed: the census also reads the footer's items that have no route
(`COLUMNS` items not in `ROUTED`, app-footer.tsx) as pages owed, so the three `| DEC-463` lines are
live until their routes land and the census then requires them crawled.

Q4 — INC-1305's list. The brief names `similar.ts`, `pricing-data.ts` (two reads), `step-where.tsx`,
`attribute-options.ts`, `map/leaflet.ts` and `map/geocode.ts`. The record
(`docs/governance/reports/cursor-bundle-7b.report.md:199` and `:292`) names `pricing-data.ts:217` and
`:276`, `similar.ts:28`, `step-photos.tsx:262`, `posting-service.ts:963` and `:1120`, `geocode.ts:39`
and `settings.tsx` as a candidate; it does not name `step-where.tsx`, `attribute-options.ts` or
`leaflet.ts`. Read at the base: `step-photos.tsx:262` reads an upload's answer (a write, not a read
on load); `posting-service.ts:959–965` (`peekAssist`, `GET /api/listings/assist`) is a read that
answers null on any failure ("the screen then keeps its own count"); `posting-service.ts:1111–1122`
(`suggestAliases`) answers `[]` on any failure. Asked: are `peekAssist` and `suggestAliases` INC-1305
reads this lane fixes (their file is under `src/features/posting/`), or `| INC-1278` lines when the
crawl meets them?

Q5 — "a key whose sentence has a `{detail}` slot fills it from that data". The one refusal reader
reads a failure's tail from its message (`hear`, `src/lib/refusal.ts:199–205`; `readRefusal`
:243–245), and `src/lib/refusal.ts` is not among SCOPE's `src/lib/` files. Proposed: the typed
failure carries the route's detail as data (`ReaderFailure.detail`, reader-failure.ts), the reason
line keeps the short-code tail in the message as today, and `reasonOf` (import-dialog.tsx) fills its
`{detail}` from the typed failure — refusal.ts unchanged. Or the ruling adds `src/lib/refusal.ts` with
its test, so every reader fills `{detail}` from the typed failure.

## The census so far (STEP 1; the rest follows the ruling)

- Premises that hold: `REFUSAL_DETAIL` at `src/lib/reader-failure.ts:205`; `COMPARISON_FLOOR` at
  `scripts/conformance/door-permissions.test.ts:28` (70) over `permissionComparisons`, which skips
  `src/features/permissions/use-may-call.ts` (door-permissions.ts:26–28, :159); the allowlist holds
  56 lines `| INC-1281` and 24 `| permanent` (80 comparisons), so moving the 56 onto `useMayCall`
  leaves 24 and fails DPM-1 (INC-1308 confirmed; `mayCall(` calls in src today: 0); the component job
  is `component-tests` ("Component tests", `.github/workflows/ci.yml:209–224`), one `bun run
  test:unit` step; the translations service builds failures by hand at
  `translations-service.ts:611–617`, `:682–685` and `importFailure` `:1104–1108`; `use-translations.ts:396`
  fetches `/i18n-usage.json` with no deadline (call-deadline-allowlist line `| INC-1304`, and a
  route-client-allowlist line `| 2027-04-24`); `use-translations.test.ts` does not exist.
- Readers of `REFUSAL_DETAIL`: `src/lib/route-client.ts:97`, `src/lib/reader-failure.ts:223`, and a
  server reader the brief did not name, `src/server/imports/route.ts:125` (the import relay answers a
  coded refusal's detail only when it is a short code); no reader of a typed failure's `.detail` in
  src/ or e2e/.
- OPEN (a), the pages whose first read comes from the server: `/` and `/c/$slug`
  (`readFirstFeedPage`, `src/routes/__root.tsx:126`); `/$name`, `/l/$slug`, `/legal/$kind`, `/terms`
  and `/privacy` (their loaders call server functions). On a client navigation those server functions
  are browser requests, so the crawl would reach them by navigating to the page from another page;
  to be confirmed from a recorded load once the crawl exists.
- OPEN (b), the crawl's CI time: not measured — it needs the crawl.
- OPEN (c), how the component job learns a push's changed test files: `github.event.pull_request.base.sha`
  on a pull request, `github.event.before` on a push to dev; one `git fetch --no-tags --depth=1 origin
  <sha>`; `git diff --name-only --diff-filter=d <base> HEAD`, keeping `src/**/*.test.{ts,tsx}` and
  `scripts/**/*.test.ts`; an all-zero or unreadable base fails the step loudly.
