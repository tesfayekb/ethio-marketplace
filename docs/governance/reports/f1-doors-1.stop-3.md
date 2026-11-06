STOP — f1-doors-1 ruling 5 §1: the entry closure is clean and 46 pages fall 1.6–1.7 KiB; the four pages that USE the auth service (`/auth`, `/auth_/callback`, `/auth_/reset`, `/settings`) rise 1.1 KiB, `/auth` over its ceiling — the ruling said "no ceiling rises", rule 10 says raise now every page left inside the band: a ruling-against-rule conflict, so a question, not a guess
DONE (see also the browser check and the early checks below): ruling 5 saved (`docs/governance/briefs/f1-doors-ruling-5.md`); §1 built (part J `5f7723042`: `sign-out.ts` — DEC-268's body unchanged — and `auth-result.ts` (`CLIENT_FAILED`, `failure()`), the service re-exports `signOut`, `use-auth.ts` imports the leaf and returns `signOut` only, `routes/auth.tsx` imports `signInWithPassword`, `signUp`, `resendConfirmation` from the service beside its two; ASC-2 and ASC-5 follow the moves; PRL-3 judges the entry closure); §2 (i) read, (ii) built (part A `f46d29151`: the bar at 1 ms, schema text proven byte-identical, `db:proof PASS — applied 415/415, CLI 2.120.0, cold, 49 s`); CI's reds on 5bec35586 read and the two of mine fixed (part K `8a5662d61` INC-1072 below; the i18n usage map `3638600f3`).
LEFT: the ruling on the four ceilings (below; the browser check is done — its table below) → THE CHECKS whole → the self-review → the report with its Records → the pull request ready and its CI.
CI: run 42200467397 on 5bec35586 — FAILURE: `First-paint bundle budget` (expected, stop 2), `i18n used-on map is fresh` (mine: scanned 674 → 676, the two leaf files; regenerated, now 678), `E2E lanes / Lane smoke` (mine: the door guard's live mode — INC-1072 below; the live query ITSELF ran: psql produced the TSV, so INC-1070's fix held), `E2E (Playwright, ethio-staging)` (lanes=failure from the smoke lane; `e2e-last-failure.md`: Passed 2583 · Failed 0 · Flaky 1 — `choice-lists.spec.ts` CL-E4 at 1440 dark on shard 11, not a path this turn touched; **no `rateLimited` / `user_set_preferred_language` line in any lane's client errors** — INC-1071's fix held). Every lane's start `applied 415/415`; the preflight green (staging holds the marks).
FILES: `git diff --name-only 596345a4c..HEAD` = 78 files: the 72 of stop 2 plus
docs/governance/briefs/f1-doors-ruling-5.md
docs/governance/reports/f1-doors-1.stop-2.md
src/features/auth/auth-result.ts
src/features/auth/sign-out.ts
src/routes/auth.tsx
src/features/auth/use-auth.ts
(and changed again: `scripts/doors/check-doors.ts`, `check-doors.test.ts`, `scripts/conformance/wired.test.ts`, `docs/features/doors.md`, `src/features/auth/auth-service.ts`, `auth-client.test.ts`, `preferred-language.test.ts`, the migration part 2, the two i18n maps)

## §1 — the measurement

Entry closure after part J (`rg -n "auth-service|door-codes" src/routes/__root.tsx src/components/app-shell.tsx src/features/auth/use-auth.ts src/i18n src/lib --glob '!*.test.*'`): two comments (`app-shell.tsx:672/702`, `supabase-door.ts:153`, `place-carry-service.ts:37`) and no import. `dist/client/assets/auth-service-*.js` is its own chunk, 2.8 KiB gzipped, loaded by the four routes that import the service; `lastSignInMethod` (door-codes) appears in that chunk only. The entry chunk: 129.6 → 127.5 KiB; the provider chunk 16.4 (unchanged from stop 2); `JS: 211.9 KiB / 215 KiB`.

Per page, local build against CI's reading of 596345a4c (a local build reads about 0.1 KiB under CI):

| page | base (CI) | stop 2 | now | ceiling | Δ vs base |
|---|---|---|---|---|---|
| `/` and 45 other pages | 233.8 … | +0.4…+0.5 | 232.1 … | — | **−1.6 … −1.7** |
| `/admin/legal_/edit` | 290.8 | 286.1 | 284.0 | 292 | −6.8 |
| `/auth` | 228.3 | 228.7 | **229.4** | 229 | +1.1 |
| `/auth_/callback` | 214.7 | 215.1 | 215.8 | 216 | +1.1 |
| `/auth_/reset` | 216.7 | 217.1 | 217.8 | 218 | +1.1 |
| `/settings` | 281.8 | 282.2 | 282.9 | 283 | +1.1 |

(the whole table: `/tmp/f1-pages3.txt` on this computer). `node scripts/check-bundle-size.mjs` FAILS on `/auth: 229.5 KiB, over its ceiling of 229 KiB` (229.4 + the 0.1 local allowance), and the three others sit inside the 0.3 KiB NEAR band.

Why the four rise: before, every page paid for the service in the entry (≈ 2.8 KiB spread over all); now only the pages that import it pay, as a route chunk — they lose the entry's 2.1 KiB and gain the 2.8 KiB chunk plus its edges (+1.1 net). That is the ruling's design working as described; the "every page at or under its base" expectation did not count the service's own consumers.

The conflict: ruling 5 §1 "no ceiling rises" against rule 10 (Speed and SEO) "a ceiling moves only by DEC-296's form, with its cause written on its line … raise now every page your change leaves inside the 0.3 KiB band", and the task's tolerance (a page growing > 0.1 KiB → STOP). Rule 00 §1: a task that conflicts with a rule is a STOP, the rule quoted. Nothing is changed in `scripts/route-budgets.mjs`.

The lines DEC-296's form gives, if the ruling is to raise them (`ceilingForLocal(size)`), each with the cause `DEC-348 (F1-1 ruling 5): the auth service left the entry for a route chunk; the four pages that import it now carry its 2.8 KiB themselves, every other page −1.7`:
- `/auth`: 229 → 230 = ceilingForLocal(229.4)
- `/auth_/callback`: 216 → 217 = ceilingForLocal(215.8)
- `/auth_/reset`: 218 → 219 = ceilingForLocal(217.8)
- `/settings`: 283 → 284 = ceilingForLocal(282.9)

The alternative the ruling might prefer: lower the 46 pages' ceilings by the saving (a saving lowers a line — DEC-296's own words in the check's hint) — a 46-line edit of `route-budgets.mjs` the task did not name; I have not done it. Both can be one commit on `continue`.

## §2 — the cost reading

(i) The smoke lane's job log of run 42200467397 (`gh run view --log`, grepped for `door_context cost`) holds no such line, and no `NOTICE` line at all — CI's CLI prints no server notices either; the local `apply.log` (grepped for the same line only, ruling 4 §4) holds none. (ii) The bar: part 2's proof (d) `IF v_median > 10` → `IF v_median > 1` (and its two comment lines, and the exception's text names the bar). `diff <(sed '/^DO \$proof\$/,/^\$proof\$;/d; /^--/d' old) <(… new)` is empty — schema statements, grants and the mark byte-identical (DEC-345). New sha256 of the file: `89f077067654d2482139392a893a03215049f14f2f564cd3325d8ab815943423`. `db:proof PASS — applied 415/415, CLI 2.120.0, cold, 49 s` at the 1 ms bar: the four classes' medians are under 1 ms on this computer — the record of the cost until a measurement channel exists.

## INC-1072 (new, mine) — the live door guard never judged the tree census

The smoke lane's first live run (5bec35586) died in `allow()`: `check-doors-allowlist.txt:4 stale allowance: grant-without-caller attr_option_norm_v2(jsonb)`. `liveFindings` called `judge(liveRows(tsv), manifest)` with no `callers`, so `grant-without-caller` never fired in live mode and the kit read every census line as stale — a finding kind the static mode judges and the live mode did not, under one allowlist. Fix (part K): the live judgement reads the same tree census (`treeCallers(root, rows)` on the live rows — the tree is checked out on the lane), so both modes fire the same kinds; DOORS-6 spells the repository's own catalogue as a live TSV and proves it reconciles under the one allowlist, that the census allowances fire in both modes alike, and that a planted uncalled browser grant fires live; proven red on the old `liveFindings`. Class: a guard with two modes must judge the same finding kinds in both, or the one allowlist is stale in one of them. The lane proves it on the next push.

## The browser check (ruling 5 §4, run while this question waits — it does not depend on the answer)

`bun run e2e:local -- e2e/<spec>.spec.ts`, each spec alone, both projects, `E2E_RETRIES=0`, against ethio-staging (the E2E names set; the local build served; `applied` marks present). The ten touched specs and the seven that exercise the auth route, sign-out and settings (`rg` for `/auth`, `/settings`, `signOut` over `e2e/*.spec.ts`):

| spec | result |
|---|---|
| door-refusals | 2 failed 10 passed → fixed below → **12 passed** |
| auth-caller-gates | 8 passed |
| posting-routes-dials | 14 passed |
| my-listings-doors | 28 passed |
| my-listings-page | 2 failed (MLP-6 × 2) 14 passed — local artifact, below |
| admin-listings | 6 failed (AL-20, AL-23, AL-30 × 2) 70 passed — local artifact, below |
| legal-certify | 1 skipped 43 passed |
| legal-admin | 1 failed (LGA-21 mobile) 43 passed — pre-existing class, below |
| auth-signin-errors | 5 passed |
| auth-signup | 3 skipped 3 passed |
| auth-reset | 6 passed |
| auth-callback | 4 passed |
| auth-google | 2 passed |
| auth-signout | 1 skipped 35 passed |
| settings | 9 passed |
| smoke-auth-i18n | 2 passed |
| i18n-sign-in-language | 12 passed |

(logs `/tmp/f1-e2e-<spec>.log`, summary `/tmp/f1-e2e-summary.txt`.)

**DRF-4 (mine, fixed — `586971226`).** `door_refusals` has no person column (one row per door, code and day — DEC-333's design); the spec asserted the row moved by exactly 2, but the other project's worker runs the same test at the same time and moves the same row (Received 4). CI's lanes passed it by timing. Now: moved by at least the two (the row only grows); the exact once-per-refusal count stays on the per-user dial (`password_remove` 1 → 2). Re-run alone: 12 passed.

**MLP-6, AL-20, AL-23, AL-30 — a macOS-only artifact, not a path this turn changed.** Each clears a field with `page.keyboard.press("Control+A")` then types; on macOS Chromium Control+A is line-start, not select-all, so the typed text is prepended (`Corrected listing ftltuhtg` + `E2E admin listing local esyfcytf`; AL-30's `0` becomes `030`, a valid number, so the save goes to the door and the pooled staff caller's step-up answers). CI runs on Linux, where every one passed on 5bec35586. Siblings (K2, reported, untouched): 11 `"Control+A"` presses in `e2e/` (`rg -n '"Control\+A"' e2e`) against 3 `ControlOrMeta+A` (`post-wizard-place`, `post-wizard-bundle2`, `my-listings-ad`). A tracked item for the harness: `ControlOrMeta+A` everywhere, or a `clearField` helper.

**LGA-21 (pre-existing, cross-worker class, not a path this turn changed).** Its afterEach could not delete the worker's scratch language: `legal_version_texts_language_fkey`. The test inserts a text for EVERY `enabled_admin` language into its own version — including the OTHER project's scratch language (`ensureFenceLanguage` enables it), which that worker then cannot delete while this version holds a text in it. Passed in CI by timing (the lanes run the two projects on 2 workers too). A tracked item: exclude the harness's scratch codes from `extra`.

## An early `bun run checks` (provisional — it runs again WHOLE on the final tree)

`bun run typecheck` green. `bun run checks` on `586971226`: `checks (fast): 17 PASS · 4 FAIL · 261s`, `checks: 22 PASS · 6 FAIL · 30 NOT RUN · 318s`. The six FAILs, read:
- `bundle-budget › Check the first-paint budget` and `the NEAR band (R4)` — the four pages of §1 (the question).
- `laws-first › scripts/ tests first` and `component-tests` — three tests: **AAN-1** (mine: `auth-answers-allowlist.txt:2 stale allowance: use-auth.ts:signOut` — the census read the service's `export async function`s only, so a re-exported `signOut` vanished from its actions and the hook's aliased `endSession()` call was invisible to it: part J had taken the sign-out action out of the guard's sight); **VS-1** (mine: `sign-out.ts` carries DEC-268's `supabase.auth.signOut()` call, which the service's allowance line covered in its old place); **NH-6** (pre-existing, red on the base too on this computer — `nightly-hour.test.ts`'s unresolvable-zone case; CI green). Fixed in `4016d2ffc`: the census reads actions from `auth-service.ts` AND `sign-out.ts` (both excluded from the scanned callers, as the service was) and asserts `signOut` is among them; the hook imports the leaf as a namespace and calls `session.signOut()` so the call keeps the action's name under the one allowance; `vendor-seams-allowlist.txt` gains `src/features/auth/sign-out.ts | … moved verbatim … | INC-877`. After it: `bunx vitest run scripts` 490 passed, 1 failed (NH-6 only); the auth folder's tests 42 passed; lint 0 errors (46 pre-existing react-refresh warnings); the per-page table re-measured identical to §1's on all 50 pages.
- `secrets-scan › gitleaks` and `build-and-check › Workflow lint (actionlint)` — the runner's pinned Linux binaries (`gitleaks_8.24.3_linux_x64`, `actionlint_1.7.7_linux_amd64`) cannot run on this arm64 Mac (the self-test "failed for another reason"); no finding was produced. CI's jobs are the judges of both, as at stops 1 and 2.
NOT RUN (30): dependency-audit (the advisory service), e2e-preflight (staging credentials the script never holds), e2e (the lanes' artifacts), promote (CI only), the Install steps, semgrep's SARIF upload, and the build-and-check steps the runner skips after its actionlint FAIL. Because actionlint cannot run on this computer, those steps stay NOT RUN in the final run too, so each was run by hand on `4016d2ffc`: Typecheck green; `bun run format:check` "All matched files use Prettier code style!"; Lint 0 errors; `e2e-select.ts --self-test` OK; `check-root-routes.ts --self-test` (12 allowed, 5 refused) and the check (61 entries, every root segment safe). The report will say the same.

## Also since stop 2

- The i18n usage map's `scanned` count follows the file count, not only `t(` keys (the job's drift was the two leaf files); regenerated after the four new auth modules (678). Rule 10's "after touching any `t(` key" is the narrower reading — a process note for the report.
- `src/features/auth/auth-service.ts`'s `auth-client.test.ts` ASC-5 now reads both `auth-service.ts` and `sign-out.ts` (the order of the three ending calls follows the files' order).
- Test ids added: DOORS-6, PRL-3. None retired. DRF-4 amended (above).
