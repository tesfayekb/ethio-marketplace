# FOUNDATIONS 1, TURN F1-7d — the end of a session as one state (INC-1218), the server's readers of a refusal onto the one reader and the one status table (INC-1189's server half, INC-1221, INC-1223), and the census that guards the reader (CF-REFUSAL-1) — report

Base: dev 8df5d28db (the re-land, ruling 2; the brief's own base dev a21c95595) · Final commit: a3dc6b542 · Brief: docs/governance/briefs/f1-doors-7d.md (sha256 74067c7c2c71546a52d186174dc1daba9e9baceca14703842895a136aae41269)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 6275e87 (the CI fix a3dc6b542 read again against the same headings: no new item)

CI at the base: dev `8df5d28db` — SUCCESS (run 44756753510, §11). Pull requests: [#85](https://github.com/tesfayekb/ethio-marketplace/pull/85) (this lane, `cursor/f1-doors-7d-2`) replaces [#83](https://github.com/tesfayekb/ethio-marketplace/pull/83) (`cursor/f1-doors-7d`, closed unmerged by the operator, ruling 2).

## 1. Done / not done, by part and step

- STEP 0 — done on the first lane (`643c9fb26`, `f1-doors-7d: task saved`); check-go then: no finding.
- STEP 1 — done: `docs/governance/reports/f1-doors-7d.census.md`; stop 1 (`docs/governance/reports/f1-doors-7d.stop-1.md`). Ruling 1 (`docs/governance/briefs/f1-doors-7d-ruling-1.md`, sha256 0890eca2…6609579, matched).
- STEP 2 — done (`8e70f9a4f` on #83): SO-16 built red-first and found GREEN on the unchanged code; the one end of a session; sign-out on this device only (DEC-411); the query client's retry rule; the impersonation poll's stop; the `[session] ended` line; unit tests.
- STEP 3 — done (`ef58d8bce` on #83): the server's readers onto `splitRefusal`; `CODE_STATUS` gone; `readFailure` answers a refusal at its code's status (INC-1221); unit tests.
- STEP 4 — done (`bddc1ae94` on #83): CF-REFUSAL-1 and CF-REFUSAL-2 with planted cases; the browser tests SO-14/15/16 (landed with STEP 2's commit, §10).
- STEP 5 — the first-download check failed DEC-362's closure law on `141c75fa6` → stop 2 (`docs/governance/reports/f1-doors-7d.stop-2.md`). Ruling 2 (`docs/governance/briefs/f1-doors-7d-ruling-2.md`, sha256 50dda308bbf7280607b5430f3eb20f9eccf3e6949b77fb469af25c9b7d343b58, matched): re-landed on dev with L21 (`7513a6c67`), `refusal-split.ts` on the shared shell and the census after L21 (`7b1d7adc5`), then the rest of STEP 5 on the new lane — all green (§5).
- STEP 6 — L21 check: `git cat-file -e origin/dev:src/lib/refusal-split.ts` → present (dev `8df5d28db`), so no line `until L21` is written (ruling 1, 3(b): the first case held). Pushed (`6275e8712`), `gh pr ready 85`, CI watched: SO-9 red in lane 9 and the repeat lane (§11), fixed at its root in `a3dc6b542` (§10) and pushed.
- STEP 7 — this report; the feature docs (`6275e8712`); the scratch folder cleaned (§12).

## 2. Files changed

`git diff --name-only 8df5d28db` (the re-land's base):

```
docs/features/admin-shell.md
docs/features/doors.md
docs/features/routes.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-7d-ruling-1.md
docs/governance/briefs/f1-doors-7d-ruling-2.md
docs/governance/briefs/f1-doors-7d.md
docs/governance/reports/f1-doors-7d.census.md
docs/governance/reports/f1-doors-7d.stop-1.md
docs/governance/reports/f1-doors-7d.stop-2.md
e2e/auth-signout.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/briefs-allowlist.txt
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/refusal-readers.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/features/admin/impersonation/use-impersonation.test.tsx
src/features/admin/impersonation/use-impersonation.ts
src/features/auth/auth-client.test.ts
src/features/auth/session-end.test.ts
src/features/auth/session-end.ts
src/features/auth/session-query-client.ts
src/features/auth/sign-out.ts
src/features/auth/use-auth.ts
src/features/legal/legal-reader.test.ts
src/features/legal/legal-reader.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/router.test.ts
src/router.tsx
src/routes/api/attributes.$id.options.ts
src/routes/api/attributes.options.test.ts
src/routes/api/feed.test.ts
src/routes/api/feed.ts
src/routes/api/public/jobs.test.ts
src/routes/api/seller.test.ts
src/routes/api/seller.ts
src/routes/api/translate.route.test.ts
src/routes/api/translate.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/function-refusal.test.ts
src/server/function-refusal.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
src/server/jobs/route.ts
src/server/seller-page.ts
```

New files (`git ls-files` holds each): `src/features/auth/session-end.ts`, `session-end.test.ts`, `session-query-client.ts`, `src/router.test.ts`, `src/features/admin/impersonation/use-impersonation.test.tsx`, `src/server/function-refusal.ts`, `function-refusal.test.ts`, `scripts/conformance/refusal-readers.ts`, `refusal-readers.test.ts`, `refusal-readers-allowlist.txt`, the briefs, rulings, census and stop reports. Scope: the brief's SCOPE, ruling 1 decision 5 (`sign-out.ts` with its test, `src/server/jobs/`), ruling 2 decision 2 (`src/features/legal/legal-reader.ts` with its test, `scripts/route-budgets.mjs` `SHARED_SHELL_MODULES` lines only), the standing allowance (docs, briefs, reports, the maps, roadmap line 3).

## 3. Behaviour contract — answer tables before → after

| Touched | Before (base) | After |
| --- | --- | --- |
| Sign-out (`sign-out.ts`) | `signOut()` — scope global, every device | `signOut({ scope: "local" })` — this device (DEC-411, ASC-10); `signOutOtherDevices` (`scope: "others"`) unchanged |
| The end of a session (`app-shell.tsx`) | sign-out, policy expiry and the live guard each reset on their own; a 401 from a reader showed "could not be loaded" and the user stayed | one end: `hardReset(notice, event, code)`, once (`endSession`), one console line `[session] ended: <event> <code or none> <seconds or none> <visibility>`; a reader's 401 / `notSignedIn` is read against the stored session (a failed read waits; none ends; a stored one re-reads its failed queries once) |
| Query client (`router.tsx`) | `new QueryClient()` — every 401 retried 3 times | `sessionQueryClient()` — an answer that ended the session is never retried; every other query keeps its own rule, a watched query three and a `fetchQuery` with no rule of its own none, as before (RTR-1…4); failed queries and mutations reach the shell |
| Impersonation poll | polls every 30 s whatever the answer | stops on an answer that ended the session (IMH-1, IMH-2) |
| `rpc()` (`supabase-door.ts`) | an error with no HTTP status | the error carries `status` when the answer had one (SBD-22) |
| `readFailure` (`answer.ts`) | a reader's 4xx refusal answered 500 `serverError` (INC-1221) | 428 → `stepUpRequired()`; any other gate code → `clientError(code, status)` at `door_refusal_status`'s status, with a short code-like detail (ANS-13); every other failure unchanged |
| `/api/feed`, `/api/seller` | the function's refusal read by `message.includes` | read by code through `splitRefusal` twice (`functionRefusalCode`, INC-1224); same statuses and keys (FD-6, SLR-6) |
| `/api/attributes/$id/options` | `message.includes` | `splitRefusal(...).key`; same answers (ATO-8) |
| `/api/translate` | an exact-message map | `splitRefusal` key and detail; same reasons (TRR-11) |
| jobs claim (`jobs/route.ts`) | the claim's refusal by prefix | `refused:<why>` read by `splitRefusal` (JRF-7) |
| import route | `CODE_STATUS` (`notSignedIn` 401, `accountDeactivated` 403, `permissionDenied` 403, `rateLimited` 429) and its own split | `refusalStatus` — the same four statuses — and `splitRefusal` (IMR-17) |
| `legalRefusal` (`legal-reader.ts`) | `split(":")[0]` | `splitRefusal(...).key`; same answers (LGRD-1) |

No status, word, body key, header or signature differs beyond these.

## 4. Censuses

- STEP 1's census: `docs/governance/reports/f1-doors-7d.census.md` (every item by key).
- Polls: `rg refetchInterval|setInterval` under `src/`, tests excluded — five timers, ONE `refetchInterval` poll (`use-impersonation.ts:33`); the others are the check-email recheck (`auth.tsx:256`, a signed-out view), the posting review's bounded read (`step-review.tsx:270`, stops on any error) and two clocks with no network (`session-policy.ts:324`, `use-impersonation.ts:93`). By the brief, no poll census (census §Session readers, listeners and polls).
- CF-REFUSAL-1 on the re-landed tree: 2 findings, both held (§7): `src/features/admin/legal/legal-version-view.tsx:160`, `src/lib/door-error.ts:22`. Outside its definition, as its comment (`scripts/conformance/refusal-readers.ts:15-21`) names them: a provider's error words (`mfa-service.ts`, ruling 1 3(f)), a Postgres constraint's snake_case name (`draft.ts`), a compare with a literal that is no code (the server's `HTTPError`), a structured answer's `reason` field, a permission slug, an event-stream line, an option token, a stored place key and a cookie shape.
- CF-REFUSAL-2: `door_refusal_status`'s last declaration against `refusalStatus`, both directions — no drift.
- The closure (ruling 2): `refusal` and `door-codes` do not join the entry's closure; no `SHARED_SHELL_MODULES` line beyond `refusal-split.ts` was needed.

## 5. Tests

Added or changed:
- SEN-1…7 (`session-end.test.ts`), RTR-1…4 (`router.test.ts`; RTR-3 holds the fetch's no-retry rule since `a3dc6b542`), IMH-1/2 (`use-impersonation.test.tsx`), SBD-5 renamed ("…, at its status") and SBD-22 (`supabase-door.test.ts`), ASC-10 (`auth-client.test.ts`, the scope).
- ANS-13, RF-6 (and RF-5 re-pointed to `refusalStatus`'s behaviour; its migration read moved into CFRR-3), FNR-1, FD-6, SLR-6, ATO-8, JRF-7, TRR-11, IMR-17, LGRD-1.
- CFRR-1…4 (`scripts/conformance/refusal-readers.test.ts`; `CFR-` and `RFR-` were taken).
- E2E: SO-14, SO-15, SO-16 (`e2e/auth-signout.spec.ts`, describe "F1-7d the end of a session").

Red-first: SO-14 and SO-15 on the unchanged code — `4 failed` (`toContainText` on the session's-end notice, both tests, both Chromium projects); on the fix — `6 passed (1.1m)`. SO-9 (a defect of this lane, §10): on `6275e8712` — `2 failed` (`toHaveURL` `/\/auth\?.*reason=deactivated/` received `/`, both Chromium projects), RTR-3's new expectation `expected "vi.fn()" to be called 1 times, but got 4 times`; on `a3dc6b542` — `2 passed (12.6s)` and RTR-3 green. SO-16 on the unchanged code: GREEN in Chromium (`2 passed (17.7s)`) and WebKit (`2 passed (25.7s)`) after its first draft's own premise read was fixed (it read storage before the sign-out had cleared it); the cause stays unproven (§10, ruling 2 decision 5).

Local runs on the final code tree:
- `bun run typecheck`, `bun run lint` — clean.
- The 15 touched unit-test files, on `a3dc6b542`: `Test Files  15 passed (15)`, `Tests  197 passed (197)`.
- `bunx vitest run scripts --maxWorkers=2`, on `a3dc6b542`: `Test Files  125 passed (125)`, `Tests  673 passed | 1 skipped (674)`.
- L21's ids beside the copied changes (ruling 2 decision 4): `RRD-1`…`RRD-4`, `RRD-6`…`RRD-8` — `Tests  7 passed | 54 skipped (61)`, their seven files whole `61 passed (61)`. `RRD-5` exists nowhere in the repository (`rg -n "RRD-5"`: no hit; §13).
- `bun run checks` (on `6275e8712`'s tree; the CI fix ran typecheck, lint, its unit tests, the laws, the build with the first-download check and its ids, rule 00 step 8) — fast line `checks (fast): 26 PASS · 0 FAIL · 483s`; last line `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 544s`. NOT RUN, by job, with the runner's reason (26 steps): scope ×3 (the Actions API's artifacts and index exist only on GitHub, DEC-375 a); actionlint and gitleaks (pinned linux/x64 binaries, this machine darwin/arm64 — CI runs both); Install dependencies ×3 in build-and-check, component-tests and bundle-budget (already installed; a package change is its own turn); dependency-audit ×2 (the advisory service is not reachable from the sandbox); e2e-preflight ×4 (staging credentials, never held by the script); e2e merge ×6 (the browser lanes' artifacts, GitHub only); promote ×4 (only CI promotes, DEC-020); semgrep upload ×2 (GitHub's code-scanning upload).
- Browser, by id, 0 retries: `--grep "SO-1[456] "` in mobile-360 and desktop-1280 — `6 passed (1.1m)`, `[ssr-error]` 0; after the fix, `--grep "SO-(8|9|14|15|16) "` in both — `10 passed (1.7m)`, `[ssr-error]` 0; `--grep "SO-16 "` in webkit-1280 and webkit-390 — `2 passed (21.0s)`, `[ssr-error]` 0. No spec file ran whole.
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-7d.md --at 643c9fb26` — `[check-go] no finding`.

J-audit (e2e/** changed): scratch accounts only (the harness's users), no real row; the three waits carry DEC-027's disable line with the elapsed time as the subject (§10); no `.first()`, no `test.only`; the console line is asserted to hold no token (SO-14).

CI on the pull request proves every test in its lanes and the repeat lane's repetition of the changed spec.

## 6. K2 — siblings that bypass the mechanism

Greps: CF-REFUSAL-1's four readings across `src/`; `rg -n "refetchInterval|setInterval" src`; `rg -n "signOut\(" src`.
- `src/features/admin/legal/legal-version-view.tsx:160` — a whole-message compare; Lovable's L22 (allowlisted).
- `src/lib/door-error.ts:22` — `REASON_CODE`'s plain-token branch (allowlisted, §10).
- `src/features/admin/nav-alerts.ts:22-31` and `src/features/legal/use-legal-gate.ts:59` (census) repeat on focus; they inherit the query client's rule (no retry after an ended session) and are not polls.

## 7. Allowlists and guards

- `scripts/conformance/refusal-readers-allowlist.txt` (new): 0 → 2 lines. On #83 it held 14; on dev with L21, 11 were stale (L21 folded `use-image-failure.ts`, `country-verb-dialogs.tsx` ×2, `location-verb-dialogs.tsx`, `impersonation-service.ts` ×2, `my-listing.ts`, `posting-service.ts` ×2, `refusal-text.ts`, `door-codes.ts`) and left; `legal-reader.ts:101` was folded here (ACT-028); `door-error.ts:21` moved to `:22`. `src/features/admin/legal/legal-version-view.tsx:160 | … Lovable's L22 folds it | INC-1189`; `src/lib/door-error.ts:22 | REASON_CODE keeps a plain-token detail joined … | INC-1189`.
- `scripts/conformance/briefs-allowlist.txt`: 0 → 1: `docs/governance/briefs/f1-doors-7d.md:76 INC-1189 (RECORDS) is named by scripts/route-budgets.mjs, outside SCOPE | ruling 2 … widens SCOPE by scripts/route-budgets.mjs … | INC-1189`.
- `scripts/route-budgets.mjs` `SHARED_SHELL_MODULES`: +1 — `src/lib/refusal-split.ts`, "the one reader's cut of a refusal (INC-1189): the session's end and the legal reader on every page, and the lazy screens". `ENTRY_CLOSURE` unchanged.
- Guards: CF-REFUSAL-1's planted case (CFRR-2: seven readings named, the mechanism file, `splitRefusal`, a structured reason, `typeof`, a non-code literal, a constraint name and a cookie shape passed); CF-REFUSAL-2's planted drift (CFRR-4: a status, a row each way and the fallback). Wired: `wired.test.ts` passes with the stem named by its test.

## 8. Strings

none — FLAGS no-new-string; `git diff --name-only 8df5d28db -- src/i18n` is empty. The session's end uses the existing `session.expired`.

## 9. Migrations

none (FLAGS no-migration; `git diff --name-only 8df5d28db -- supabase` is empty).

## 10. Departures

- Stop 1 → ruling 1; stop 2 → ruling 2 (re-land on dev with L21; `refusal-split.ts` on the shared shell).
- The cause of the 07:01:22 refresh is unproven (ruling 1 decision 1; ruling 2 decision 5): SO-16 is green on the unchanged code in Chromium and WebKit and stays as a guard. It rules out a second tab of the same context plus a sign-out and fresh sign-in in one tab as the cause. INC-1218's status line below says so instead of naming a cause.
- The re-land copied files with `git show <branch>:<path>` redirected, not `git checkout … -- <path>` as ruling 2 worded it: rule 00 forbids `checkout` and names this form for a re-land; the copy is proven identical (`git diff --cached --stat origin/cursor/f1-doors-7d` over every copied path: empty).
- The re-land commit `7513a6c67` is red on CFRR-1 (the 11 stale lines of files L21 folded), as ruling 2's ordered pure copy left it; `7b1d7adc5` fixed it. Decisions 2 and 3 share one commit: either alone leaves CFRR-1 red.
- `until INC-1189` for the lines a later turn removes (ruling 2 decision B), the reason naming the turn.
- `door-error.ts:22` not folded (ruling 2 decision 3): `splitRefusal` plus `CODE_HEAD` cannot give `door-error.test.ts`'s answers — `tooManyPhotos:10` stays one joined reason while `deleteHasDependents:a, b` is cut; telling them apart needs a tail pattern.
- `mfa-service.ts:100` is excluded from CF-REFUSAL-1 by definition (ruling 1 3(f)), said in the guard's comment.
- The query client lives in its own module `src/features/auth/session-query-client.ts`, imported only by the router: built inside `session-end.ts` (which a lazy poll imports), query-core's classes left the shared query chunk for chunks of their own on every page (measured on `141c75fa6`'s parent). The caches are heard by subscription.
- DECIDE-AND-NAME: the status mirror stays in `src/lib/reader-failure.ts` (ruling 1 3(a)); the allowlist lines above; the browser test fails the refresh by revoking the scratch session (`auth.admin.signOut(jwt, "global")`) and marking the stored session expired (SO-14), or by forgetting it (SO-15), scratch accounts only; the files split as the commits in §1.
- SO-14/15/16 live in `e2e/auth-signout.spec.ts`, not a new spec file: a new file needs a weight in `scripts/ci/lane-weights.json` (CF-LANES-2), outside scope (§13).
- RF-5 now tests `refusalStatus`'s own answers; its migration read became CFRR-3 (both directions).
- `app-shell.test.tsx` (named "new" in SCOPE) was not written: the shell's decisions live in `session-end.ts` (SEN-1…7: `unauthorisedVerdict`, `endSession`) and its wiring is proven in the browser (SO-14, SO-15). Review MINOR.
- CI found a defect of this lane (SO-9, INC-661's deactivated sign-in, landed on `/`): `SessionQueryClient` always set `retry`, so `fetchQuery` lost TanStack's rule that a fetch with no `retry` of its own is not retried (`node_modules/@tanstack/query-core/build/modern/queryClient.js:183-185`, 5.101.1). The legal landing after a sign-in (`src/features/legal/use-legal-gate.ts:110-125`) read `my_legal_status` again after the deactivated account's local sign-out and landed on `/`, over the shell's `/auth?reason=deactivated`. Fixed at its root in `a3dc6b542`: `fetchQuery` restores the rule (`session-query-client.ts`), RTR-3 holds it. One code commit after the push, as the brief allows.
- The three waits in SO-14/15/16 (`page.waitForTimeout`, 6 s, 32 s, 6 s) carry DEC-027's disable line: the elapsed time after a sign-in (ruling 1: at least 5 s) and the poll's 30 s interval are the subjects. Review MINOR.
- First download (DEC-355), dev `8df5d28db` → this lane, local builds (scratch copy of dev under `/tmp/ethio-scratch/f1-doors-7d/dev-8df5d28db`), gzipped KiB. Entry JS 200.8 → 201.7 of 205. Chunk by chunk, the entry's closure: `index.js` 141.7 → 142.5 (+0.8: `session-end.ts`, the shell's 401 listener, `session-query-client.ts`, `rpc()`'s status), `shared-shell.js` 29.2 → 29.2 (`refusal-split.ts` joins it, under 0.1), every other chunk unchanged (`useQuery` 7.7, `bundle-mjs` 8.1, `link` 2.9, `react` 2.8, `useSelector` 2.2, `react-dom` 1.3, `dist` 1.0 and 0.4, `createLucideIcon` 0.7, `preload-helper` 0.7, `rolldown-runtime` 0.4, `useMatch` 0.4, `utils` 0.3, `jsx-runtime` 0.3, `ClientOnly` 0.3, `useRouter` 0.2, `x` 0.1, `not-found` 0.1, `root` 0.1; CSS 22.5). Every page grows by the entry's +0.8 to +1.1 (rounding); the least room is `/admin/monetisation` 311.5 of 313 (1.5); no page crosses its ceiling or sits in the 0.3 KiB band; no ceiling moves. The table is `a3dc6b542`'s build (the fix moved 23 pages by 0.1, `index.js` unchanged at 142.5).

Every page, dev `8df5d28db` → this lane (gzipped KiB):

| Page | dev 8df5d28db | this lane | change | ceiling | room |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 221.6 | 222.6 | +1.0 | 227 | 4.4 |
| `/$name` | 219.7 | 220.6 | +0.9 | 225 | 4.4 |
| `/account` | 263.1 | 264.1 | +1.0 | 268 | 3.9 |
| `/account_/legal` | 203.4 | 204.3 | +0.9 | 208 | 3.7 |
| `/account_/legal_/$versionId` | 204.1 | 205.0 | +0.9 | 209 | 4.0 |
| `/account_/saved` | 220.4 | 221.3 | +0.9 | 225 | 3.7 |
| `/admin` | 205.2 | 206.1 | +0.9 | 210 | 3.9 |
| `/admin/` | 206.0 | 206.9 | +0.9 | 211 | 4.1 |
| `/admin/ai` | 299.5 | 300.6 | +1.1 | 303 | 2.4 |
| `/admin/attributes` | 313.6 | 314.5 | +0.9 | 318 | 3.5 |
| `/admin/audit` | 290.7 | 291.7 | +1.0 | 295 | 3.3 |
| `/admin/categories` | 344.3 | 345.2 | +0.9 | 348 | 2.8 |
| `/admin/countries` | 302.9 | 303.9 | +1.0 | 309 | 5.1 |
| `/admin/images` | 205.9 | 206.8 | +0.9 | 210 | 3.2 |
| `/admin/impersonation_/$sessionId` | 288.7 | 289.6 | +0.9 | 293 | 3.4 |
| `/admin/legal` | 281.1 | 282.0 | +0.9 | 285 | 3.0 |
| `/admin/legal_/$versionId` | 277.8 | 278.7 | +0.9 | 282 | 3.3 |
| `/admin/legal_/edit` | 279.8 | 280.7 | +0.9 | 284 | 3.3 |
| `/admin/listings` | 325.0 | 326.1 | +1.1 | 329 | 2.9 |
| `/admin/listings_/$listingId` | 325.4 | 326.5 | +1.1 | 330 | 3.5 |
| `/admin/listings_/$listingId_/edit` | 406.5 | 407.5 | +1.0 | 412 | 4.5 |
| `/admin/locations` | 266.4 | 267.3 | +0.9 | 271 | 3.7 |
| `/admin/monetisation` | 310.4 | 311.5 | +1.1 | 313 | 1.5 |
| `/admin/places` | 303.5 | 304.3 | +0.8 | 310 | 5.7 |
| `/admin/roles` | 291.5 | 292.4 | +0.9 | 295 | 2.6 |
| `/admin/roles_/$roleId` | 271.5 | 272.4 | +0.9 | 275 | 2.6 |
| `/admin/screening` | 341.6 | 342.7 | +1.1 | 348 | 5.3 |
| `/admin/translations` | 302.8 | 303.7 | +0.9 | 307 | 3.3 |
| `/admin/translations_/$lang` | 305.4 | 306.3 | +0.9 | 309 | 2.7 |
| `/admin/users` | 288.8 | 289.7 | +0.9 | 293 | 3.3 |
| `/admin/users_/$userId` | 288.7 | 289.6 | +0.9 | 293 | 3.4 |
| `/auth` | 217.2 | 218.2 | +1.0 | 223 | 4.8 |
| `/auth_/callback` | 204.3 | 205.2 | +0.9 | 209 | 3.8 |
| `/auth_/reset` | 210.3 | 211.3 | +1.0 | 214 | 2.7 |
| `/c/$slug` | 221.6 | 222.6 | +1.0 | 227 | 4.4 |
| `/dev/primitives` | 224.5 | 225.4 | +0.9 | 228 | 2.6 |
| `/dev/style` | 244.0 | 245.0 | +1.0 | 248 | 3.0 |
| `/dev/tall` | 201.1 | 202.0 | +0.9 | 206 | 4.0 |
| `/l/$slug` | 247.1 | 248.2 | +1.1 | 250 | 1.8 |
| `/legal/$kind` | 205.5 | 206.4 | +0.9 | 210 | 3.6 |
| `/legal/accept` | 211.8 | 212.7 | +0.9 | 217 | 4.3 |
| `/legal/publishing` | 206.5 | 207.5 | +1.0 | 211 | 3.5 |
| `/my-listings` | 308.0 | 309.1 | +1.1 | 315 | 5.9 |
| `/my-listings_/$listingId` | 317.9 | 319.0 | +1.1 | 323 | 4.0 |
| `/my-listings_/$listingId_/edit` | 398.7 | 399.7 | +1.0 | 404 | 4.3 |
| `/post` | 398.7 | 399.7 | +1.0 | 404 | 4.3 |
| `/post_/$listingId` | 398.6 | 399.7 | +1.1 | 404 | 4.3 |
| `/privacy` | 205.5 | 206.4 | +0.9 | 210 | 3.6 |
| `/settings` | 275.3 | 276.3 | +1.0 | 279 | 2.7 |
| `/terms` | 205.5 | 206.4 | +0.9 | 210 | 3.6 |

## 11. CI

Base: `docs/tracking/ci-status.md` on ci-evidence (read through `gh api`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `8df5d28dbb1b25badeb18b3cec218a2180cfa608` (short `8df5d28`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T15:13:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44756753510
```

Two-step SHA check: `git rev-parse origin/dev` = `8df5d28db` = the run's commit. No red of an earlier turn.
This pull request ([#85](https://github.com/tesfayekb/ethio-marketplace/pull/85)):

Runs on `cursor/f1-doors-7d-2` (`gh run list --branch cursor/f1-doors-7d-2`):
- `7513a6c67` (the re-land, pushed with the draft): failure — CFRR-1, the 11 stale allowlist lines (§10).
- `6275e8712` (run 44762889388): failure — SO-9 in lane 9 (both Chromium projects) and the repeat lane (5 runs), the E2E verdict after them; rule 40 (e), this lane's defect, fixed in `a3dc6b542` (§10). Nothing re-run.
- `a3dc6b542` (run 44767885988): SUCCESS.

`branches/cursor/f1-doors-7d-2/ci-status.md` on ci-evidence:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a3dc6b542d0dfe4e000be38061425e4ff21865a2` (short `a3dc6b5`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T16:19:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44767885988
```

Two-step SHA check: the reported commit `a3dc6b542` = the pull request's head (`gh pr view 85 --json headRefOid`). E2E evidence for the run: "last E2E run 44767885988 passed"; flaky 0; the repeat lane repeated 22 of 22 tests of the changed spec and stopped at its time cap ("the time cap left 17 test runs", "Timed out waiting 763s for the test suite to run" outside any test; its job passed). Flake ledger, seven days: AP-26 holds three lines (2026-11-18), owned by INC-1203 (closed by L13) — no finding.

`gh pr checks 85` on `a3dc6b542` — 43 pass, 1 skipping (promote runs on `dev` only):

```
Analyze (actions) — pass
Analyze (javascript-typescript) — pass
Analyze (python) — pass
Browse-path guard (no RBAC seam on the marketplace path, with self-test) — pass
Build, typecheck, lint — pass
CodeQL — pass
Component tests — pass
Dependency vulnerability audit (enforcing on high/critical) — pass
E2E (Playwright, ethio-staging) — pass
E2E lanes / Backend images (DEC-309) — pass
E2E lanes / Lane 1 on temporary Supabase — pass
E2E lanes / Lane 10 on temporary Supabase — pass
E2E lanes / Lane 11 on temporary Supabase — pass
E2E lanes / Lane 12 on temporary Supabase — pass
E2E lanes / Lane 13 on temporary Supabase — pass
E2E lanes / Lane 14 on temporary Supabase — pass
E2E lanes / Lane 15 on temporary Supabase — pass
E2E lanes / Lane 16 on temporary Supabase — pass
E2E lanes / Lane 2 on temporary Supabase — pass
E2E lanes / Lane 3 on temporary Supabase — pass
E2E lanes / Lane 4 on temporary Supabase — pass
E2E lanes / Lane 5 on temporary Supabase — pass
E2E lanes / Lane 6 on temporary Supabase — pass
E2E lanes / Lane 7 on temporary Supabase — pass
E2E lanes / Lane 8 on temporary Supabase — pass
E2E lanes / Lane 9 on temporary Supabase — pass
E2E lanes / Lane email on temporary Supabase — pass
E2E lanes / Lane repeat on temporary Supabase — pass
E2E lanes / Lane smoke on temporary Supabase — pass
E2E lanes / Lane webkit on temporary Supabase — pass
E2E lanes / Summarize temporary backend lanes — pass
E2E preflight (migration parity, staging) — pass
First-paint bundle budget (gzipped ceiling) — pass
Gitleaks secrets scan — pass
Hardcoded string scan (enforcing) — pass
Import gate guard (with self-test) — pass
Listing-write seam guard (with self-test) — pass
Marketplace weight guard (no heavy deps on the first-paint path) — pass
Migration linter (with self-test) — pass
Promote to main (fast-forward on green) — skipping
Scope (docs-only push, DEC-365) — pass
Semgrep (enforcing on ERROR) — pass
Semgrep OSS — pass
i18n used-on map is fresh (U4i ②) — pass
```

## 12. Limits

- The cause of INC-1218's refresh is not proven (§10).
- The local first-download numbers are local builds (a CI build reads about 0.1 KiB more).
- `bun run checks`' 26 NOT RUN steps (§5) are CI's to judge.
- The re-land commit `7513a6c67` was pushed red on CFRR-1 by the ruling's order; CI ran on the push's last commit (the push carried both).
- The SO-9 fix's repeatability is CI's repeat lane's to prove (DEC-283); locally it ran once per project.
- Scratch: `/tmp/ethio-scratch/f1-doors-7d/` deleted file by file at the end (ruling 1 decision 6), its copies' files included.

## 13. Findings

- CF-LANES-2 (`scripts/ci/lane-weights.json`): a real new spec file with no weight fails the lane plan's own planted assertion, so a lane cannot add a spec file without a file outside most scopes; this turn put its tests in an existing spec (§10). Owner: the CI turn.
- `RRD-5` is missing from L21's ids (`rg -n "RRD-5"`: no hit); L21 numbered `RRD-1`…`RRD-4` and `RRD-6`…`RRD-8`.
- `src/features/legal/use-legal-gate.ts:120-125`: `landAfterSignIn` lands even when the session ended during its read; with a deactivated account it races the shell's `/auth?reason=deactivated` (`app-shell.tsx:877-879`). Its margin was the global sign-out's round trip, which DEC-411's local sign-out removed; with the fetch no longer retried (§10) it lands before the shell's redirect. Owner: the legal or auth lane.
- `src/features/legal/legal-reader.ts:99-101` reads `error.message` through a cast (`(error as { message?: string } | null)`), not `errorText`; left (the ruling scoped line 101's cut only).

## 14. Records

DEC — DEC-411 — Sign-out ends the session on this device only (`scope: "local"`), the operator's answer of 2026-11-20. "Sign out other devices" and a credential change still end the other sessions. Supersedes U0j's (INC-072) "global, kept deliberately".

INC — INC-1218 — correction to F1-7c's record (ruling 1 and the F1-7c report's §14): the cause written there, "two browser auth clients with separate state", rests on two CORS preflights read as requests and is withdrawn. The facts (ethio-prod, 2026-11-20): a global sign-out at 07:00:56Z; a password sign-in at 07:01:20Z (session `cfe7a770…`); ONE refresh at 07:01:22.102Z answered 400 `refresh_token_not_found`; the browser's calls went anon (401) from 07:01:22.174Z. Status line: CLOSED — the cause is unproven from the code (SO-16, two tabs with a sign-out and a fresh sign-in, is green on the unchanged code in Chromium and WebKit and stays as a guard); the fix: sign-out on this device only (DEC-411) and one end of a session (`src/features/auth/session-end.ts`, `src/components/app-shell.tsx` `hardReset`), the query client never retrying an ended session (`src/features/auth/session-query-client.ts`); the browser tests SO-14, SO-15, SO-16.

INC — INC-1189 — status line: the server's readers now read through `splitRefusal` (`src/routes/api/feed.ts`, `src/routes/api/seller.ts`, `src/server/seller-page.ts`, `src/server/function-refusal.ts`, `src/routes/api/attributes.$id.options.ts`, `src/routes/api/translate.ts`, `src/server/jobs/route.ts`, `src/server/imports/route.ts`, `src/lib/reader-failure.ts`); CF-REFUSAL-1 (`scripts/conformance/refusal-readers.test.ts`, built here) guards it; the client's parsers are Lovable's L21 (no line `until L21` left: L21 merged first; two lines left, `src/features/admin/legal/legal-version-view.tsx:160` until INC-1189 for Lovable's L22, and `src/lib/door-error.ts:22` until INC-1189).

INC — INC-1221 — status line: CLOSED — `readFailure` answers a refusal at its code's status.

INC — INC-1223 — the client mirror `REFUSAL_STATUS` (`src/lib/reader-failure.ts`) of `door_refusal_status` was guarded only by its own unit test (F1-7c's §13). Class: a mirror of a database table without a census. Status line: CLOSED — CF-REFUSAL-2 (`scripts/conformance/refusal-readers.test.ts` CFRR-3, both directions, and CFRR-4's planted drift); `CODE_STATUS` in `src/server/imports/route.ts` removed.

INC — INC-1224 — `feed_page` and `seller_feed_page` raise `<function>: <code>`, not `code:detail` (F1-7d's census). The servers read them through `splitRefusal` twice. Class: a refusal shape outside the door law. Owner: the before-launch list (G71).

ACT — ACT-028 — CLOSED in F1-7d: `src/lib/refusal-split.ts` joins `SHARED_SHELL_MODULES`; `legal-reader.ts` and the session's end read `splitRefusal` from it; the entry's closure unchanged (entry JS 200.8 → 201.7 KiB; `index.js` 141.7 → 142.5, `shared-shell.js` 29.2 → 29.2, no chunk joins or leaves).

register row — the clients' row gains "one end-of-session state (F1-7d)".

register row — the doors' row gains "one status table, guarded against its mirror (F1-7d)".

changelog — 2026-11-2x turn F1-7d: when a session ends the app says so once and offers sign-in, and a fresh sign-in is no longer undone; the server reads every refusal one way.

roadmap — the Foundations 1 line gains "F1-7d DONE ([#85](https://github.com/tesfayekb/ethio-marketplace/pull/85)) with Lovable's L21; F1-7 DONE".
