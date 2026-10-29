# Foundations turn CI-1 — report (Part A built; Part B planned)

## 1. CI line

The newest completed run on ci-evidence is `3b572f22`, FAILURE. Four jobs failed:

- component tests (CF-LANG-1);
- the string scan;
- the first-paint budget;
- lanes 4 and 12 (`e2e/i18n-coverage.spec.ts`). 2,412 passed and 4 failed.

The run on `a7c3639c` had not landed when this turn was built. I found no red beyond A2–A4. This turn did find one red that CI had not shown yet: D239 had put `reader-failure` on every page's first download (INC-864). See A4.

## 2. Part A

### A1: CI first. Done

`3b572f22`'s reds were covered in this order: CF-LANG-1 was already fixed at `a7c3639c`, then A2, A3 and A4 below.

### A2: INC-996. Done

**Setup fix.** The two signed-in tests ("the admin shell renders no English fallback" and "the roles permission matrix renders no raw English vocabulary") now call `setAmharicAccount(page, staff.id)`. It sets the leased account's own `preferred_language` to `am` through the service client (a J5 fixture write), then sets the device. An afterEach puts NULL back (the fresh-user baseline, INC-173b). No assertion changed.

**Census (by definition):** every spec and helper that sets a language record or `preferred_language`, or asserts `html lang`, and signs in.

| Hit | Verdict |
|---|---|
| `i18n-coverage.spec.ts` :227, :248 | **fixed** (above) |
| `i18n-coverage.spec.ts` :194, :212, :303, :355, :418 (`useAmharic`) | safe: signed out. The device decides; no account rule runs. |
| `ui.ts` :967–:990 `resetLanguageBaseline` | safe: puts the account to NULL before an injected session. D239 then saves the device language, the same language the test is already showing. |
| `ui.ts` :1224–:1243 `switchLanguage` | safe: the menu pick writes the device and the account (D237), so the account and the device agree. |
| `users.ts` :332 (pool reset, `preferred_language: null`) | safe: the fresh-user baseline at each lease. |
| `shell.spec.ts` TR-27, TR-37, `seedStar` | already D239-shaped (D239-1); passed there in both projects. |
| `admin-translations-governance.spec.ts` :105, :675 | safe: `?lang=` is a view, and the rule waits on it (the accepted departure); :675 is a menu pick. |
| the `switchLanguage` callers (smoke-auth-i18n, post-wizard-*, admin-roles, admin-translations-console, legal-*, ad-page, admin-attributes-library) | safe: the menu pick writes both. |
| `i18n-bundle.spec.ts`, `i18n-layers.spec.ts` | safe: no sign-in. |

**Authoring law.** One line added to `docs/features/e2e-harness.md`, after the authoring laws: after a change to a shared contract, the owed-test census greps for the contract's observable effects.

**E2E.** `i18n-coverage.spec.ts`, `admin-screening.spec.ts` and `name-check-queue.spec.ts`, each whole, both projects, 0 retries: **68 passed, 0 failed, 4 skipped**.
- The four skips are the files' existing per-project skips: NCQ-E2E-3 on mobile (J6), and three phone-only tests on desktop.
- The two INC-996 tests passed in both projects.
- After that run, `useAmharicAccount` was renamed `setAmharicAccount` for a lint rule (react-hooks). That is a rename only; I did not re-run the spec.

### A3: INC-994. Done

**The payload.** `name-checks.test.tsx` now uses `<img src=x onerror=alert(1)>`. NCQ-U4 asserts the literal text is shown and that no `img` element exists in the section. The scan finds 0 locally.

**The evidence.** `scripts/check-hardcoded-strings.sh` now prints each finding as `FAIL finding: <file:line> …`. The reporter's EVIDENCE filter matches `FAIL\b`, so each finding reaches `guards-last-failure.md`.

**The proof** is `scripts/string-scan-evidence.test.ts`:
- **SCAN-EV-1** reads the EVIDENCE filter out of `ci-status-report.yml` itself (never copied), runs the scan on its bad fixture, and asserts that every finding line matches. With the old bare output it failed; with the change it passes.
- **SCAN-EV-2:** the good fixture prints no finding line.

There is no separate reporter fixture: the reporter's filter lives inline in the workflow, so the test reads it from there.

### A4: First-paint budget. Done, with one new cause

**The four ruled lines:** /admin/screening 379, /admin/roles_/$roleId 307, /admin/translations 410, /my-listings_/$listingId 317. Each has its cause in its comment.

**A red CI had not shown yet (INC-864).** The local build refused: `reader-failure` must stay lazy, but sat in the first-paint closure. The cause was D239's R5: `auth-service.ts` imported `ReaderError` by value, and the language provider is on every page.
- **Fix:** `auth-service.ts` now loads `reader-failure` on demand (`loadOnce`), only when a read failed.
- A failed download of that piece goes to `reportOnDemandFailure`, so the shell's one notice offers Refresh.
- The provider's account rule now has a `.catch` that keeps the device's choice, with one named line.
- The type stays `ReaderError`. LANG-D239-U1…U8, ASC-1 and the on-demand-failure census pass: 25 of 25.

**Then six pages were over by 0.0–0.5 KiB**, all for one named cause: D239's account rule, the tab-follow listener and the on-demand loader, in the root language provider on every page. Each was raised to its next whole KiB with that cause in the comment:

| Page | Measured | New line |
|---|---|---|
| /admin/ai | 334.1 | 335 |
| /admin/countries | 337.1 | 338 |
| /admin/translations | 410.5 | 411 |
| /admin/translations_/$lang | 320.1 | 321 |
| /auth | 219.0 | 220 |
| /my-listings | 327.0 | 328 |

The local budget check now passes: 0 pages over.

**NEAR (within 0.2 KiB of the line, not raised):** / 219.9/220, /c/$slug 219.9/220, /admin/impersonation_/$sessionId 307.9/308, /admin/legal 277.0/277, /admin/roles_/$roleId 306.8/307, /admin/screening 378.8/379, /admin/users 303.8/304, /legal/accept 218.0/218.

CI can measure about 0.1 KiB above a local build, so any of these may go red on this push. Under Part B's NEAR rule (not yet in force), the pages that grew this turn would be raised now; the ruling on Part B decides.

### A5: INC-995. Done

**The fix:**
- PhotoReviews, NameChecks and PhotoChanges each host their own `ActionMessage`: `admin-photo-reviews-notice`, `admin-name-checks-notice` and `admin-photo-changes-notice`.
- None of them takes an `onNotice` prop any more.
- The job line moved into the NameChecks section, above its table, and reports into that section's message. NameChecks now takes `mayViewJob` and `mayResumeJob`, and draws its table only with `listings:view`.
- The page-level `admin-screening-notice` keeps the listings table's outcomes only: approve, reject, and a held photo removed from a listing row.

**Tests changed to follow the move, none weakened:**
- PCH-4 now reads the section's own message.
- SC-24 now reads `admin-photo-reviews-notice`.

**Census:** every `ActionMessage` in src/.

| File:line | Verdict |
|---|---|
| `screening-page.tsx` :474 | now the listings table's outcomes only |
| `photo-reviews.tsx` :95 | its own section |
| `name-checks.tsx` :194 | its own section and the job line inside it |
| `photo-changes.tsx` :84 | its own section |
| `settings.tsx` :264, `admin-listings/listings-page.tsx` :560, `my-listings-page.tsx` :656 | one control area each; no `onNotice` handed in |

Remaining `onNotice=` in src/: only `name-checks.tsx` :192, the job line inside its own section.

**Guard:** `scripts/conformance/section-notices.test.ts`, no allowlist.
- **SNC-1:** a section (an exported component whose file draws `<DataTable` or `<PageCard`) is never handed `onNotice`. Green on src/.
- **SNC-2:** the planted pre-CI-1 shape (a page with an ActionMessage handing a card section `onNotice`, plus a piece with no card) is caught at exactly the section line, and the piece is let through.

### Unit count

Whole suite: **2,201 passed, 8 failed, 1 skipped** (2,210 tests in 367 files).
- **NH-1, NH-2, NH-3:** the sandbox's time zone, as in every turn.
- **EXH-4, EXH-5, EXH-7, EXH-21 and LL-1:** 5-second timeouts under the full suite's load. Re-run alone: 27 of 27 passed.
- The new tests, all green: SNC-1/2 and SCAN-EV-1/2 (ids grep-checked free), NCQ-U4 with its new payload, PCH-4 rewritten.

### i18n maps

The moved `t()` calls changed both maps (the map guard regenerated them): `docs/generated/i18n-usage.json` and `public/i18n-usage.json` are in this landing.

## 3. Part B: the plan for `bun run checks` (nothing built)

### 1. Every CI step, covered or allowlisted

| ci.yml job › step | In the script | Reason if not |
|---|---|---|
| build-and-check › the shell-pipes guard (the `run: \|` steps at :59–:71) | yes, 1st | |
| › acceptance-doors / caller-gates / outbound-calls self-tests (:82–:86) | yes | |
| › actionlint (:99) | yes, pinned download | NOT RUN when it cannot be fetched |
| › install (:117) | no | allowlist: the sandbox's dependencies are already installed |
| › typecheck, format:check, lint (:119–:123) | yes, in that order | |
| › e2e selector self-test (:127) | yes | |
| › build (:134), its bundle report (:136) | yes | |
| component-tests › test:unit (:164) | yes | |
| secrets-scan › gitleaks (:192) | yes, pinned, over `origin/main..HEAD` | NOT RUN when it cannot be fetched |
| migration-lint › self-test and linter (:226, :228) | yes | |
| i18n-usage-map › i18n:usage, then the diff check (:247, :249) | yes | |
| string-scan (:259) | yes | |
| import-gate, listing-write-seam, browse-path-guard, marketplace-weight (:273–:332) | yes, with each self-test | |
| bundle-budget › build plus `check-bundle-size.mjs` (:349–:352) | yes, sharing the build above | |
| semgrep (:376–:403) | yes, if the pinned version installs | NOT RUN otherwise |
| semgrep › SARIF upload, its Warn step (:435) | no | allowlist: GitHub-only upload |
| dependency-audit (:455) | no | allowlist: its advisory service is unreachable from the sandbox (§9) |
| e2e-preflight, e2e-lanes, the merged report, promote | no | allowlist: they need the temporary backend, staging, browsers or a push |

### 2. Sandbox can and cannot run

- **Can, measured today:**
  - the three self-tests (under 1 s);
  - the selector self-test (1 s);
  - the migration linter with self-test (35 s);
  - the import gate (2 s), the listing-write seam (2 s), the browse-path guard (39 s), the weight guard (under 1 s);
  - the string scan (1 s);
  - i18n:usage (about 5 s);
  - the build plus budget (about 4 min);
  - the whole unit suite (about 6 min).
- **Not installed here:** actionlint, gitleaks and semgrep. Each needs a pinned fetch (`nix run nixpkgs#…`, or the release tarball by hash). Until that is proven, each says NOT RUN with its reason.
- **Platform constraint:** this project's agent rules say not to run builds or typechecks by hand (the harness does). The script runs them as CI does. That needs your ruling (see 5).

### 3. Time

ESTIMATE: about 12–14 minutes in this sandbox. The whole unit suite (~6 min) and the build (~4 min) dominate; everything else sums to about 1.5 min plus typecheck and lint, which I have not measured. It becomes a measured number at build.

### 4. Tests (ids grep-checked free at build)

- **TCK-1:** every no-backend step in ci.yml has its line in the script, or an allowlist line (`step | reason | until`). Proven red on a planted ci.yml step.
- **TCK-2:** a stale or expired allowlist line fails.
- **TCK-3:** a check that cannot run prints NOT RUN with its reason, never PASS (a planted missing binary).
- **TCK-4:** the last line's counts equal the lines printed.
- **TCK-5:** the NEAR band lists each page within 0.3 KiB with its growth against the base commit's build.

### 5. Conflicts

- **Platform and agent rules:** "Do not run the project's builds or typechecks manually". `bun run checks` runs both. That needs a ruling, or the script reads the harness's typecheck verdict from `/tmp/observability/build-errors.log` instead of re-running it.
- **AGENTS.md:** the checks-before-a-turn-ends lines become one line, as the brief says.
- **Knowledge v3.11 A6:** "run eslint and prettier format:check on every touched file … format:check LAST". The script's CI order puts format:check before lint. Either the script keeps CI's order and Knowledge is amended, or format:check is repeated last.
- **Downloads:** fetching pinned binaries in the sandbox is a network fetch. It needs to be allowed by the operator's rules for this sandbox.

### 6. Sizing

One turn: the script, the mirror guard with its allowlist, TCK-1…5, the AGENTS.md line, the docs. No migration. ESTIMATE 1, band 1–2. It becomes 2 if the pinned binaries cannot be fetched and need a second approach.

## 4. K2

1. **The eight NEAR pages** in A4: a possible budget red in CI on this push.
2. **The `onNotice` message pattern is now repeated three times** (state, setter, ActionMessage in each section). A small shared `useSectionNotice` would be the one mechanism; not built.
3. **The INC-864 near-miss.** Nothing caught `reader-failure` reaching the first paint before a local build. Part B's script would.
4. **actionlint, gitleaks and semgrep did not run here.** This push is judged on them by CI only.

## 5. Files (`git diff --name-only a7c3639c`)

- docs/\_changelog.md
- docs/features/e2e-harness.md
- docs/generated/i18n-usage.json
- docs/governance/briefs/foundations-turn-ci-1.md
- docs/governance/reports/foundations-turn-ci-1.report.md
- e2e/admin-screening.spec.ts
- e2e/i18n-coverage.spec.ts
- public/i18n-usage.json
- roadmap.md
- scripts/check-hardcoded-strings.sh
- scripts/conformance/section-notices.test.ts
- scripts/route-budgets.mjs
- scripts/string-scan-evidence.test.ts
- src/features/admin-screening/name-checks.test.tsx
- src/features/admin-screening/name-checks.tsx
- src/features/admin-screening/photo-changes.test.tsx
- src/features/admin-screening/photo-changes.tsx
- src/features/admin-screening/photo-reviews.tsx
- src/features/admin-screening/screening-page.tsx
- src/features/auth/auth-service.ts
- src/i18n/provider.tsx
