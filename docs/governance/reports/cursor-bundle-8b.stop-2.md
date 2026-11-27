QUESTION — cursor-bundle-8b part 1: INC-1312's premise is wrong on the pinned auth library
DONE: steps 0, 1, 2; STEP 3 in part (the server half: the cleaner, the report's shape, the dial, the write route and its server module, the server's report trigger in serverError, INC-1312's code)
LEFT: STEP 3's browser half (the sender, the notice's report, the crash boundary, the two listeners), the staff readers and their door-words family, the reporter census, the e2e spec; parts 2 and 3; steps 6–9
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `6a5c19f81e48e2bc54dcd2c75119d305f662c915` (short `6a5c19f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-27T00:28:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45913849134
FILES:
docs/governance/briefs/cursor-bundle-8b-ruling-1.md
docs/governance/briefs/cursor-bundle-8b-types.patch
docs/governance/briefs/cursor-bundle-8b-words.json
docs/governance/briefs/cursor-bundle-8b.md
docs/governance/reports/cursor-bundle-8b.stop-1.md
docs/governance/reports/cursor-bundle-8b.stop-2.md
roadmap.md
scripts/conformance/door-args-allowlist.txt
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
src/features/permissions/door-permissions.generated.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/en-admin.ts
src/integrations/supabase/types.ts
src/lib/dials.ts
src/lib/door-codes.generated.ts
src/lib/error-clean.test.ts
src/lib/error-clean.ts
src/lib/schemas/error-report.test.ts
src/lib/schemas/error-report.ts
src/routeTree.gen.ts
src/routes/api/error-reports.test.ts
src/routes/api/error-reports.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/error-reports.test.ts
src/server/error-reports.ts
src/server/supabase/upstream.test.ts
src/server/supabase/user-client.ts
supabase/migrations/20261126233000_3b6b710a-070f-4171-a588-0a8a66cff7e4.sql
supabase/migrations/20261126233100_8c6761c8-6a1f-4bcc-bb13-84119eaa1097.sql

The list above is the lane's own files: `git diff --name-only origin/dev HEAD` (31 lines) plus this stop.
`git diff --name-only 8f6c3f2fc HEAD` gives 85 lines: these, and dev's own files that the fast-forward of
ruling 1's merge (`86c8840a9`, dev `07162fd7a`) brought in. Dev has not moved since: `origin/dev` =
`07162fd7aace57e76618952ac4a3bd016bbad01e`, an ancestor of this branch. Dev's CI on it: SUCCESS, run 45915411185.

## The premise and what the census found

The brief's CONSUMERS line says: "INC-1312: `user-client.ts` answers an auth 500 with `reason: "notSignedIn"`, so
our server never answers it as a failure and no report could see it". INC-1312's record (Cursor bundle 8a's report,
lines 575 and 596) gives the class as "an `AuthApiError`, not retryable" at 500.

On this tree that is not so. The lock pins `@supabase/auth-js` 2.110.9 (`bun.lock:534`, the installed copy the same).
Its `handleError` (`node_modules/@supabase/auth-js/dist/main/lib/fetch.js:32–43`) throws `AuthRetryableFetchError` for
the statuses 500, 501, 502, 503, 504 and 520–530, before it reads the body. `user-client.ts:94` (at the base) already
answers a retryable error `reason: "upstream"`, and `refuseUserClient` answers 503.

Measured, red-first: UP-8 (`src/server/supabase/upstream.test.ts`) sends the captured auth 500 body
(`PROVIDER_ERRORS.unexpected_failure`, `src/test/provider-errors.ts:211–217`, status 500) to the base `user-client.ts`
(written from `git show HEAD:…` into place, then put back from a copy). The base answers `reason: "upstream"`, message
`auth upstream unavailable (500)`, 503. The test fails only on the report: "expected "vi.fn()" to be called 1 times,
but got 0 times". So the half of INC-1312 that is true is "no report could see it". The half that is wrong is "reads
as signed out".

What the pinned library still turns into an `AuthApiError` (so the base still reads as signed out): a 5xx outside its
list, 505–519 and 531–599. No captured fixture or log in the repository shows one of those from the auth server.

## What the code does now (commit `8e8e9118a`)

- `src/server/supabase/user-client.ts:101`: `if (error && (isAuthRetryableFetchError(error) || (error.status ?? 0) >= 500))`
  answers `upstream`. This covers every 5xx, so the library's list no longer decides the answer. A 4xx (a refused or
  expired bearer) still answers `notSignedIn`, 401 (UP-3, and UP-8's second half with a captured-shape 403).
- `refuseUserClient`'s upstream branch triggers one server report (kind `upstream`, code `503`) through
  `reportFailureLater` in `src/server/answer.ts` (a dynamic import, because answer.ts already imports user-client).
- UP-8 passes on the new code. Red-first against the base, it fails on the report only (above).

## The question

INC-1312's fix as the brief words it ("an auth server failure answers as the upstream failure it is … and is
reported") holds on the new code either way. What no clause decides is whether the explicit `>= 500` clause stays:

1. Keep it. Every 5xx the auth server answers is `upstream` by our own rule, whatever list a later library version
   keeps, and each is reported. §14 records INC-1312 as: the library already read 500–504 and 520–530 as upstream;
   this lane makes every 5xx upstream by our rule and adds the report. (My recommendation: it is one clause, it
   holds the answer still across library versions, and UP-8 proves it.)
2. Drop it. `user-client.ts` keeps the library's list; the lane adds only the report. §14 records INC-1312's
   misread class as not reproduced on 2.110.9.

Either way, INC-1312's evidence (the capture of `GET /auth/v1/user` at 500, Cursor bundle 8a ruling 1 Q1) disagrees
with the pinned library. Whether that capture came from another library version is not something this tree can show.

## Other things this stop names

- This stop is a third push. The brief said two (the migration stop's and the final). The brief's own stop clause
  for a wrong premise is what makes this one.
- The partial STEP 3 commit is green: typecheck, lint, the six touched files' tests (53 passed), and the laws
  (`bunx vitest run scripts --maxWorkers=2`: 147 files, 824 passed, 1 skipped). `bun run checks` and the browser
  check were not run; they belong to STEP 7.
- On the way, three laws taught the code. CF-RT-2 refused a second Authorization reader in
  `src/server/error-reports.ts`, so `user-client.ts` now exports `carriesBearer`, which `userClientFromRequest` uses
  too. PROVERR-1 refused an invented mocked message, so the two tests take the fixture's `PGRST000`. DARGS-2 refused
  a stale line-keyed allowance (`door-args-allowlist.txt:5`, `user-client.ts:336` moved to `:349`), which is INC-1293's
  class and moves to a symbol key in Part 2.
