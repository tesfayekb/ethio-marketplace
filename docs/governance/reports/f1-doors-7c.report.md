# Foundations 1, turn F1-7c — readers' status, one refusal reader, the session's end — report
Base: dev 7e7040c99 · Final commit: 10d519b76 (last code commit) · Brief: docs/governance/briefs/f1-doors-7c.md (sha256 bd717fe748e609b67dca70d8d9eb8fde96170205aabee2e17d39540c5f058204, computed on the saved file; the carrier's stated value is not in this chat) · Rulings: f1-doors-7c-ruling-1.md, f1-doors-7c-ruling-2.md (sha256 eb42e662dee80e6b9df2678dd6452513371d03ea7c3b5375ea49de03830ee4b3, equal to the value the carrier stated)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 10d519b

This report covers the whole lane as it stands after ruling 1's cut. F1-7c is the database half and the status; the one refusal reader (INC-1189), the reset-time words and the session's end (INC-1218) are F1-7d; the typed `Result` is ACT-027. STEPS 0–2 ran in an earlier chat (stop reports 1 and 2); STEPS 3–7 ran here on ruling 2.

## 1. Done / not done, by part and step

- STEP 0 (the task saved, 7f976b478), STEP 1 (the census, 50b98d211), stop 1 (3ae7c28ac): done in the earlier chat.
- Ruling 1 saved (d45b468f9); STEP 2 (check-doors judges a gate body's dial against its shell, fcbfd89cf; the migration, 5fbf4a5ef; stop 2, b769978d9): done in the earlier chat. This chat wrote no migration file.
- Ruling 2 saved by scripted copy, sha256 compared (4f407d69e). The types patch's sha256 (19cedc9875a81a7fe5295f55ed6586ef58b128241617408d17953a652cc52608) compared equal, then `git apply`'d as STEP 3's first act.
- STEP 3 (df48d2817): `src/lib/reader-failure.ts` reads a refusal at its code's status (`refusalStatus`, the table's client side); the status must agree with the code, and a 500 classes `server`. `src/server/door.ts` logs only a `doorError` (INC-1214). `src/server/answer.ts` `serverError` writes the error's text through `errorText` (INC-1215). `isDeactivatedRefusal` and DA-3 removed; the rest of `deactivated.ts` stays (INC-1188).
- STEP 4 (10d519b76): CG-2 loses the three dropped listing doors; LGC-6's assertion (`legal-certify.spec.ts:1343`) expects 401; the census found no other spec reading a reader's 500; `check-doors` static green, DOORS-15 included; `docs/features/doors.md` gains F1-7c's paragraph.
- STEP 5 (the gate): typecheck, lint, the laws, the touched unit tests, the build and the budget, `bun run checks`, the browser ids by `--grep` in both Chromium projects, `check-go --at 7e7040c99`: all in §5. The self-review: the Review line above.
- STEP 6 (the push): pushed once to `cursor/f1-doors-7c` at 10d519b76; pull request #81 marked ready (it was the draft the migration stop opened). `origin/dev` at the push is 70533e559 (Lovable's L19), as at the ruling; no merge of dev was needed or made.
- STEP 7: this report.
- Not done, by the cuts: INC-1189 (the one refusal reader and `CF-REFUSAL-1`), the reset-time words, INC-1218 (the session's end, its polls, SO-14, `client.test.ts`), the typed `Result` (ACT-027). They are F1-7d / ACT-027 by ruling 1's decision 1, not omissions.

## 2. Files changed  (`git diff --name-only 7e7040c99`)

```
docs/features/doors.md
docs/governance/briefs/f1-doors-7c-ruling-1.md
docs/governance/briefs/f1-doors-7c-ruling-2.md
docs/governance/briefs/f1-doors-7c.md
docs/governance/reports/f1-doors-7c.census.md
docs/governance/reports/f1-doors-7c.stop-1.md
docs/governance/reports/f1-doors-7c.stop-2.md
e2e/auth-caller-gates.spec.ts
e2e/legal-certify.spec.ts
roadmap.md
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/public-surface-allowlist.txt
src/features/auth/deactivated.test.ts
src/features/auth/deactivated.ts
src/integrations/supabase/types.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/lib/supabase-door.test.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/door.test.ts
src/server/door.ts
supabase/migrations/20261120100000_909988ad-e5cb-4942-9f99-4ec49d32a179.sql
supabase/migrations/20261120100100_c4559f10-ecd5-41c4-9ace-35e4b37973f9.sql
supabase/migrations/20261120100200_9dbc0091-9f5c-4eab-89dd-ed34e5f1abdd.sql
supabase/migrations/20261120100300_819eeda3-bead-426b-b48e-7d9878ffcd2d.sql
```

New files, by `git ls-files --error-unmatch` / `git ls-files`: the four migrations, `docs/governance/briefs/f1-doors-7c.md`, `-ruling-1.md`, `-ruling-2.md`, and `docs/governance/reports/f1-doors-7c.census.md`, `.stop-1.md`, `.stop-2.md` are tracked. This report (`f1-doors-7c.report.md`) joins at its own commit. `src/integrations/supabase/types.ts` changed by the supervisor's patch only (1 insertion, 73 deletions). `src/lib/supabase-door.test.ts` is outside the ruling's list: see §10.

## 3. Behaviour contract — answer tables before → after

The database half's tables (the status table, the reader's mark, `door_refused`, `assign_role`) are in `f1-doors-7c.stop-2.md` and unchanged here. The clients and the server:

| Function | Input | Before (7e7040c99) | After |
| --- | --- | --- | --- |
| `readerFailure` | `notSignedIn`, status 500 | `auth` | `server` (the status must agree: 401) |
| `readerFailure` | `notSignedIn`, status 401, or no status | `auth` | `auth` |
| `readerFailure` | `accountDeactivated`, status 403, or no status | `auth` | `auth` |
| `readerFailure` | `permissionDenied[:scope]`, status 403 | `auth` (status 403 first) | `refused` (the code first, the status agrees) |
| `readerFailure` | `stepUpRequired` 428, `rateLimited[:instant]` 429 | `refused` | `refused` |
| `readerFailure` | `notYourListing`, `notYours`, `badValue:*`, `badSize`, `acceptancePending`, `legalAcceptancePending`, `notInForce`, status 400 or none | `refused` | `refused` |
| `readerFailure` | any gate code at 500 | the code decided (`auth` / `refused`) for the six gate codes; `server` for the rest | `server` |
| `readerFailure` | a gate code at a status its code does not carry, not 500 (`notSignedIn` 400; `rateLimited` 403) | the code decided | the status's own reading (`malformed`; `auth`) |
| `readerFailure` | no status, a ReaderError, a 401/403 of no code, a 5xx, a fetch failure, `P0001` | as before | as before |
| `doorCall` | `rateLimited:<instant>` (a code with a detail) | answered `rateLimited` + detail; LOGGED `[ssr-error]` | same answer; NOT logged |
| `doorCall` | a sentence, or a constraint name | `doorError`, logged whole | same |
| `doorCall` | a bare code, with or without a plain-token detail | answered, not logged | same |
| `serverError` | an Error | the stack in the log, `server error` + incident in the body | same |
| `serverError` | a database error object, a string, `{}` | `[incident …] [object Object]` for an object | the object's `message` / `code …` / `no message (object)`; a string as itself; the body unchanged |
| `isDeactivatedRefusal` | a message | `true` on `account is deactivated` | removed (no caller; INC-1188) |

HTTP, from a browser through PostgREST (proved on ethio-staging by LGC-6, both projects): `legal_in_force` / `legal_scheduled` for a visitor 500 → 401, body `{code:"P0D01", message:"notSignedIn"}` unchanged.

## 4. Censuses  (every grep, with its result)

- `rg -n "isDeactivatedRefusal|isDeactivated" --glob '!docs/**'` (before the edit): `deactivated.ts:37`, `deactivated.test.ts:5,29–33` and two roadmap lines; no caller in `src/`. After: none outside the roadmap lines (Records).
- `rg -n "DA-3|\bDA-"`: the file's own DA-1, DA-2 only after the edit.
- `rg -n "toBe\(500\)|status.*500|500.*status|\b500\b" e2e --glob '*.ts'` (the noise filtered by `rg -v`), each hit read by its call: `legal-certify.spec.ts:1343` (the only reader's 500; changed); `photo-pipeline.spec.ts:506` and `admin-attributes-safety.spec.ts:256` are routes the test itself stubs to answer 500 (unchanged by the status); `fixtures.ts:66,242` read page documents and 5xx responses (a reader's refusal is now a 4xx, which `armRefusalCapture` already names); the rest are timeouts, byte counts, prices and intervals.
- `rg -n "anonRpc|\.status\b.*(toBe|toEqual)"` across `e2e`: `anonRpc` is called only by `legal-certify.spec.ts`; the other status reads are the app's own routes.
- `rg -n "error-class|post-who-error|identity-error-class" e2e src --glob '*.spec.ts' --glob '*.test.*'`: none (the `…-error-class` test ids are display only; no test reads them).
- `rg -n "readerFailure|reader-failure" src --glob '*.test.*' -l`: eight test files; `bunx vitest run src/lib src/server src/features/auth src/features/admin-monetisation src/features/seller src/features/admin-screening src/features/my-listings src/i18n`: 130 files, 886 tests passed.
- `rg -n "edit_listing\b|relist_listing|set_listing_price|get_browse_tree|get_category_attributes|package_price_for" src --glob '!*types.ts'` after the types patch: only `admin_edit_listing` / `edit_my_listing` comments and calls (different functions). `get_ui_bundle`: `supabase-door.test.ts:120,124` named it; it no longer typechecks, so the test names `get_ui_bundle_parts` (§10). `i18n.lang.test.ts:111` asserts it is not called (unchanged).
- `rg -n "(^|[^A-Z])RF-[0-9]+|DC-4|ANS-9|ANS-1[1-9]" src e2e scripts` before adding ids (TI-1): RF-4, RF-5, DC-4 and ANS-12 were free; `scripts/test-ids.test.ts` passes after.
- `rg -n "permissionDenied" src --glob '!**/*.test.*'`: the only client status table is `src/server/imports/route.ts:99` (`CODE_STATUS`); the reader's path had none before `refusalStatus`.

## 5. Tests

Ids added: RF-4 (every gate code at 500 classes `server`; a status the code does not carry), RF-5 (the client table equals `door_refusal_status`, read from the last migration that declares it), DC-4 (only a `doorError` is logged; a rate-limited call writes no line), ANS-12 (`serverError` writes an object's, a string's and an empty object's text, never `[object Object]`). Re-pointed: RF-1 (was "the gate's code at HTTP 500 is auth/refused, not server"; now every code the table names, with the status it arrives at, each also read with no status), RF-2 (status 500 → 400: the code's own status), LGC-6 (`:1343` 500 → 401, its comment restated), CG-2 (title "six" → "three"; the three dropped doors leave the list, `priceOf` leaves with them). Removed: DA-3 (with `isDeactivatedRefusal`). `src/lib/supabase-door.test.ts` SBD-3 names `get_ui_bundle_parts` where it named `get_ui_bundle`.

Red-first (the defect fixes), against `git show HEAD:` of the previous `door.ts` and `answer.ts` (scratch copies under `/tmp/ethio-scratch/f1-doors-7c/redfirst/`, restored after): `bunx vitest run src/server/door.test.ts src/server/answer.test.ts` → DC-4 FAILED and ANS-12 FAILED (2 failed, 17 passed); with the new code: 50 passed across the four touched files. RF-4 and the new RF-1 rows test new behaviour and need no red run.

Unit totals: `bunx vitest run src/lib/reader-failure.test.ts src/server/door.test.ts src/server/answer.test.ts src/features/auth/deactivated.test.ts` 4 files, 50 tests passed. `bunx vitest run scripts --maxWorkers=2`: 124 files, 669 passed, 1 skipped (after STEP 4). `bun run typecheck`: exit 0 (it first failed on `supabase-door.test.ts(120,30)` after the types patch; fixed in df48d2817). `bun run lint` (`eslint . --max-warnings 0`): exit 0. `bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 13 finding kinds fired on their planted fixtures, the clean pair fired nothing` / `check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue`.

`bun run checks` on the final code tree (10d519b76), fast line and last line:

```
checks (fast): 26 PASS · 0 FAIL · 445s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 35 PASS · 0 FAIL · 26 NOT RUN · 504s
```

NOT RUN, each by its own reason in the log: the Lovable branch guard, "Decide whether the lanes run" and "Index the code tree" (they read GitHub's artifact API); Workflow lint (actionlint's pinned binary is linux/x64, this machine darwin/arm64); the three "Install dependencies" steps (installed already; a package change is its own turn); gitleaks (pinned linux/x64 binary; CI's secrets-scan judges); dependency-audit's install and audit (the advisory service is not reachable from the sandbox); e2e-preflight's four steps (it compares migrations with ethio-staging through credentials the script never holds); the e2e job's six artifact steps (GitHub's artifacts); promote's token and fast-forward steps (only CI promotes); semgrep's SARIF upload and its warning step (GitHub's code-scanning upload).

Browser, by test id, from a terminal outside the sandbox, `bun run e2e:local -- e2e/legal-certify.spec.ts e2e/auth-caller-gates.spec.ts --grep "LGC-6|CG-2"`, ethio-staging (all four marks applied, per ruling 2): `4 passed (18.8s)` — CG-2 and LGC-6 in `mobile-360` and in `desktop-1280`. `[ssr-error]` lines in that log: 0 (`rg -c` finds none). Retries 0. Teardown line: `transport retries this run: 0`. No spec ran whole. What CI proves instead: every other spec and the repeat lane (DEC-283).

J-audit (e2e/** changed): CG-2's edit removes three calls and a constant; LGC-6's edit changes one expected status and a comment. No fixture, locator, wait, identity or dial changed (J1–J9 unaffected).

`bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-7c.md --at 7e7040c99`: `[check-go] no finding`.

First download (`bun run build && node scripts/check-bundle-size.mjs`, the tree and a base build of `git archive 7e7040c99` under `/tmp/ethio-scratch/f1-doors-7c/base/` — the operator's to remove). Entry: JS 200.8 / 205 KiB, CSS 22.5 / 40 KiB, both unchanged. Pages that changed (KiB, base → tree, ceiling, room): `/account` 264.1 → 264.2 / 268 (3.8); `/account_/legal_/$versionId` 204.0 → 204.1 / 209 (4.9); `/admin/ai` 299.3 → 299.5 / 303 (3.5); `/admin/legal_/edit` 279.8 → 279.9 / 284 (4.1); `/admin/listings` 324.8 → 324.9 / 329 (4.1); `/admin/listings_/$listingId` 325.3 → 325.4 / 330 (4.6); `/admin/listings_/$listingId_/edit` 406.4 → 406.5 / 412 (5.5); `/admin/monetisation` 310.1 → 310.2 / 313 (2.8); `/admin/screening` 341.4 → 341.5 / 348 (6.5); `/admin/users` 288.7 → 288.8 / 293 (4.2); `/l/$slug` 247.0 → 247.2 / 250 (2.8); `/legal/publishing` 207.5 → 207.6 / 211 (3.4); `/my-listings` 307.8 → 307.9 / 315 (7.1); `/my-listings_/$listingId` 317.8 → 317.9 / 323 (5.1); `/my-listings_/$listingId/edit` 398.6 → 398.7 / 404 (5.3); `/post` 398.5 → 398.7 / 404 (5.3); `/post_/$listingId` 398.5 → 398.6 / 404 (5.4). The other 33 pages are equal to the 0.1 KiB. No page is inside the 0.3 KiB band, so no ceiling line moved. The named cause, by chunk (gzip bytes, from the two builds' `dist/client/assets`): `reader-failure.js` 699 → 792 (+93: the status table, `refusalStatus`, the `ownValue` import and the agreement rule), carried by every page above. Changes of ±1 to ±12 bytes in other chunks (for example `wizard.js` +7, `admin.screening.js` +12, `index.js` +13) are the one chunk's changed file name inside the import specifiers of the chunks that import it; I did not isolate each byte, and the pages' deltas (0.1 to 0.2 KiB) sit beside the +93 bytes and the importers' specifier text.

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "permissionDenied" src` (non-test), `rg -n "CODE_SHAPE|splitRefusal|indexOf\(\":\"\)|split\(\":\"\)" src`, the census's consumers table.
- `src/server/imports/route.ts:99–101` (`CODE_STATUS`): a second status table beside `door_refusal_status`, now also beside `refusalStatus` (F1-7d, ruling 1 decision 6, third bullet).
- `src/lib/reader-failure.ts` `REFUSAL_STATUS`: the client's side of `door_refusal_status`, not a fork the database cannot see: RF-5 reads the migration and fails when they differ. It is a mirror the ruling asked for (a status checked to agree with its code); the fold of `imports/route.ts` onto it is F1-7d's.
- `src/lib/door-codes.ts:57` (`CODE_SHAPE`) and the parsers the census lists (`door-error.ts`, `translate.ts:64-76`, `feed.ts`, `seller.ts`, `seller-page.ts:28`, `attributes.$id.options.ts:44-45`, the verb dialogs, `posting-service.ts:1149`, `use-image-failure.ts:10`, `refusal-text.ts:17`, `my-listing.ts:595`, `legal-reader.ts:101`, `import-dialog.tsx:203`): INC-1189, F1-7d, untouched here.
- `src/server/answer.ts` `readFailure`: a typed refusal at 4xx (now what a reader's refusal arrives as) reaches `serverError` and is logged as a server error with a 500 answer, as a refusal at 500 did. A route that calls a reader through `readFailure` and expects its refusal answered gets a 500 and an `[ssr-error]` line. No route in the census does; named for F1-7d.
- `src/lib/supabase-door.ts` `rpc()` drops the HTTP status from its answer, so the browser's readers mostly read a refusal by its code alone; the status check in `readerFailure` applies where a status arrives (the `callRoute` and server paths). Typed `Result` (ACT-027).

## 7. Allowlists and guards

- `scripts/public-surface-allowlist.txt`: 26 RETIRED lines before → 19 after (seven leave; the nineteen restated their `until`): done in the migration step (stop 2), unchanged here.
- `scripts/conformance/briefs-allowlist.txt`: empty at base and after.
- Guards run on the final tree: `scripts/doors/check-doors.ts` (self-test 13 kinds; static 220 lines); `bash scripts/check-migrations.sh` as in stop 2 and again inside `bun run checks` (migration-lint PASS); `bunx vitest run scripts --maxWorkers=2` (124 files); the laws inside `checks` (laws-first PASS).
- No new guard this chat. RF-5 is a unit test that reads the migration by its declaration (the last file declaring `door_refusal_status`), not a conformance census; it is not wired in `wired.test.ts` (see the findings, §13).

## 8. Strings

None. No `t(` key was added or changed; `bun run checks` ran `i18n-usage-map` (PASS), so no usage map moved.

## 9. Migrations  (for ethio-prod, in file order, after the merge and before the Publish)

All four files were applied on ethio-staging by the supervisor (read back at ruling 2: four marks, newest `20261120120300`). No file was written or edited in this chat.

```
apply 909988ad → expect mark 20261120120000
apply c4559f10 → expect mark 20261120120100
apply 9dbc0091 → expect mark 20261120120200
apply 819eeda3 → expect mark 20261120120300
```

sha256: `909988ad…` `bb1777d089b2fcee4d16f230f1f5989c8688379576cfc6dc7a4cea4de7ab09e1`; `c4559f10…` `715e0185f642d5c5e12796d5a95d22e0c9dc2a088e5563917a1683f9cfcfaa8f`; `9dbc0091…` `7c52aafd1d745ff177cd7bd453c51cc4501fef2556ca3ba00bde3b0ea3cb7a1a`; `819eeda3…` `3307e58990ca501a3d319e2cca3f1487d28eb26d02f2b01e35d1b9b5bba1525c` (`sha256sum` of the files on this tree).

`bun run db:proof --fresh` on the final tree, last line: `db:proof PASS — applied 544/544, CLI 2.120.0, cold, 56 s`.

PREVENTION (5), the production order: between the apply and the Publish the published client reads a reader's refusal at its new status (401, 403, 428, 429 or 400, never 500). The published `src/lib/reader-failure.ts` reads the code first since F1-7a (`gateCodeOf`, `GATE_AUTH_CODES`, `GATE_REFUSED_CODES`, `src/lib/reader-failure.ts` lines 25–38 at the base), so the gate codes it knew (`notSignedIn`, `accountDeactivated`, `notYourListing`, `notYours`, `badValue`, `badSize`) classify as before whatever the status. The one difference a published screen can show is a signed-in reader's `permissionDenied` at 403: the published file reads status 403 before the message, so it classes `auth` where this tree classes `refused`; the class is a diagnostic read (the screens' error lines print `failure.class` and `status`, and one logs it), and no published screen branches on it (`rg -n "\.class\b" src`, non-test files, finds display and one log line only). The seven dropped functions are called by no published client (the census's `git grep -nw` over `origin/main`). The four files are applied before the merge's Publish, as ruling 2 orders.

## 10. Departures

- `src/lib/supabase-door.test.ts:120,124` (SBD-3) names `get_ui_bundle_parts` instead of `get_ui_bundle`. The ruling's STEP 4 does not list it, and the census recorded the test as unaffected (it builds a URL against a mocked fetch); the types patch removes `get_ui_bundle` from `FunctionName`, so `tsc` refuses the old name (`supabase-door.test.ts(120,30): error TS2345`). `src/lib/` is in the brief's SCOPE; the assertion's shape is the same (POST, the key, no bearer).
- `readerFailure`'s agreement rule is applied per code: a code on the gate lists decides the class only when no status arrived or the status equals `refusalStatus(code)`; otherwise the old chain runs (a 500 → `server`; a 401/403 → `auth`; and so on). The ruling says "the status is checked to agree with the code, and a 500 classes `server`"; it does not say what a status that disagrees and is not 500 classes. I kept the old reading for it (the rows in §3), not a new class.
- The gate list gained `permissionDenied`, `stepUpRequired`, `rateLimited`, `acceptancePending`, `legalAcceptancePending`, `notInForce`, so those codes are read by their code first as the other gate codes are (the stop-2 report expected a 403 `permissionDenied` to class `auth` otherwise). The regex of leading codes stays as the fallback for an answer with a status the code does not carry.
- `serverError` keeps an Error's stack in the log (INC-815) and reads every other value through `errorText`; the ruling says "through the existing `errorText` helper". The existing `// eslint-disable-next-line no-restricted-syntax` on `error instanceof Error` stays, its reason restated.
- The GO's STEP 3 commit title (`the clients — one reader, the session's end`) claims what ruling 1 moved to F1-7d; the commit is titled `f1-doors-7c: the clients — reader status, two log lines, types patch`.
- The GO's INC-1188 record says `deactivated.ts` is removed with its test; ruling 1's premise 1 and ruling decision 6 keep the file and remove `isDeactivatedRefusal` with its test; §14's INC-1188 line says that.
- STOPs and rulings in the turn: stop 1 (the cut, the session's cause, SCOPE) → ruling 1; stop 2 (the migration) → ruling 2. No STOP in this chat.

## 11. CI

Base, `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` at the start of this chat (it reports dev's newest completed run, which is 70533e5, not the base 7e7040c; the census read 7e7040c's run before):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `70533e5594192767dfd4aefc18ef82fde388c20d` (short `70533e5`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T09:59:19Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44714564220
```

Two-step check: SUCCESS, and the commit is dev's tip (70533e5), the L19 merge; the base 7e7040c is its ancestor, proven by the census (CI SUCCESS, run 44706314775, 2026-11-20T09:02:58Z). No red of an earlier turn was open.

The lane's evidence at the migration stop (`branches/cursor/f1-doors-7c/ci-status.md`, commit 3ae7c28, SUCCESS, lanes skipped as that code tree was proven by run 44703584986). For this push's run: the pull request's check list on 10d519b76 (`gh pr checks 81`: 43 pass, 1 skipping — "Promote to main", which runs only on `dev`; 0 fail), and the first six lines of `branches/cursor/f1-doors-7c/ci-status.md`, the two-step check (the reported commit is the one judged):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `10d519b76f20b3311fef45e7a1243d172319313a` (short `10d519b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T10:51:26Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44720812130
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-c14e2b16ca2a… (0 read)
```

`e2e-last-failure.md` for the lane: "last E2E run 44720812130 passed". The E2E preflight (migration parity, staging) passed: ethio-staging holds every mark of this turn. All sixteen numbered lanes, smoke, email, webkit and repeat passed on their temporary backends. No red in this run; no re-run; no earlier-turn red was open.

## 12. Limits

- Logs read: this chat's own command output (the `checks`, build, `db:proof`, `e2e:local` logs under `/tmp/ethio-scratch/f1-doors-7c/`), the three evidence files for the base. Not read: ethio-prod's logs and auth audit (the supervisor's); the session's cause is F1-7d's.
- The browser ids ran on ethio-staging, not on CI's temporary backend; the other specs the status touches (none read a reader's 500; the census and my grep) are CI's to prove.
- `bun run checks` NOT RUN steps (§5): CI runs them.
- The per-chunk bytes (§5) come from my gzip of each built file, matched by name without its hash; a name whose hash length differs matched as two entries (`admin.categories` and its hashed twin) and is not a change. I report only the `reader-failure` chunk as a cause; the ±1–13 byte deltas are not isolated.
- I did not run the posting, my-listings or admin specs whole locally (rule 20); a changed status could in principle reach a screen test I did not run.
- A local edit by script: the CG-2 block was changed by a short script (anchored on the block's own text) rather than by the editing tool; the diff above is the whole change.

## 13. Findings

- `src/server/imports/route.ts:99–101`: a second status table (F1-7d, in the census). `src/lib/door-codes.ts:57`: a second parser (F1-7d). `src/lib/supabase-door.ts` `rpc()` drops the status (ACT-027).
- `src/lib/door-error.ts:21–46` (`doorRefusal`): a message of the form `lowercaseword: any sentence` (one lowercase word, a colon, text) reads as a code with that text as its detail, so with INC-1214's fix `doorCall` no longer logs it, where the old whole-message compare logged it. A Postgres or provider message of that shape would reach the client as a reason and write no `[ssr-error]` line. I found no such message in the repository; the class belongs to the one refusal reader (F1-7d).
- `src/server/answer.ts` `readFailure`: a refusal at 4xx is answered 500 and logged as a server error (§6). Not reached today.
- `src/lib/reader-failure.ts`: the client's `REFUSAL_STATUS` is a mirror of `door_refusal_status`, guarded by RF-5 only, not by a `scripts/conformance` census wired in `wired.test.ts` (K3 asks a new mechanism for one). The status table's full fold (`imports/route.ts`, the client mirror, the database) is F1-7d's.
- `docs/features/doors.md` line 255 named CG-2's six doors; restated here to three.
- No security hole found in the files this chat changed (read: `reader-failure.ts`, `door.ts`, `answer.ts`, `deactivated.ts` and their tests).

## 14. Records  (word for word, unnumbered)

The GO's RECORDS with the bracketed parts filled, then ruling 1's RECORDS (copied from the file by script, lines 33–35, unchanged).

DEC — status line: turn F1-7c BUILT — a reader's refusal answers its code's status by `door_refusal_status` (one table, read by `door_refused` and `door_refuse`) and `door_context`'s transaction-local mark of the outermost call, which makes `door_refuse` raise SQLSTATE `PGRST` with the unchanged `P0D01` body under a reader and `P0D01` under a door's shell; the client's `reader-failure.ts` reads the code first and checks the status agrees (`refusalStatus`); `door.ts` logs only a `doorError`; `serverError` writes the error's text; seven retired functions dropped (`edit_listing`, `relist_listing`, `set_listing_price`, `get_browse_tree`, `get_category_attributes`, `get_ui_bundle`, `package_price_for`); `assign_role` folds its scope; the marks `20261120120000`, `20261120120100`, `20261120120200`, `20261120120300`. The one refusal reader, the reset-time words and the session's end are F1-7d; the typed `Result` is ACT-027. F1-7 is NOT yet done: F1-7d remains.
INC — INC-1213 status line: CLOSED — a reader's refusal answers its code's status because `door_context` marks the outermost call and `door_refuse` raises `PGRST` with the table's status under a reader, proved in the migration by the raised SQLSTATE and detail and over HTTP by LGC-6 (401, both projects, on ethio-staging).
INC — INC-1188 status line: CLOSED — `isDeactivatedRefusal` removed with its test; the rest of `src/features/auth/deactivated.ts` stays.
INC — INC-1189 status line: NOT closed here — the one refusal reader and `scripts/conformance/refusal-readers.test.ts` are F1-7d (ruling 1, decision 1).
INC — INC-1214 status line: CLOSED — `src/server/door.ts` logs only a `doorError`; a rate-limited call writes no `[ssr-error]` line (DC-4, red on the previous code).
INC — INC-1215 status line: CLOSED — `serverError` writes the error's text through `errorText` (ANS-12, red on the previous code).
INC — INC-1217 status line: CLOSED — `assign_role` stores its scope upper-cased.
INC — INC-1218 status line: NOT closed here — F1-7d.
register row — the doors' row gains "a reader's refusal answers its code's status (F1-7c)"; the clients' row's "one reader of a refusal; one session-end state" is F1-7d's.
changelog — 2026-11-2x turn F1-7c: a refused request from a reading function now says what it is (not "server error"); an ended-session screen and the one reading of every refusal follow in F1-7d.
roadmap — the Foundations 1 line gains "F1-7c DONE (pull request #81, marks 20261120120000 → 20261120120300); F1-7d remains".
slip — two scratch files under `/tmp/ethio-scratch/f1-doors-7c/` were written by a shell heredoc in the earlier chat (named in stop 2); in this chat the CG-2 edit and one reader-failure test block were applied by a short script and the base build was extracted by `git archive` into the scratch directory.

Ruling 1's RECORDS:

INC-1218 — the cause, read by the supervisor from ethio-prod's edge log (2026-11-20): two browser auth clients with separate state. One kept a signed-out session's refresh token, was refused at 07:01:22Z, and its calls went out as anon (401), while the other client's calls carried the new session (200). Owner: F1-7d.
ACT-027 — the typed `Result` for every browser `rpc()` call (INC-849, INC-942): the raw `.rpc(` sites F1-7c's census counted in browser files. Its own turn after F1-7d.
roadmap — under Foundations 1: "F1-7d — the one refusal reader (INC-1189), the reset-time words, the session's end (INC-1218); a new lane after F1-7c." and "ACT-027 — the typed Result, after F1-7d."
