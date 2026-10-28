# Turn C2 — the cleanup turn: one landing page for a sign-out; the menu's warm-up reported (INC-960); errorText everywhere (INC-937, partly); one log line for a failure said in place; the allowlist reader's keys (INC-950); turn C1-2's review

Base: a05e5c9594b077ec41fb3ffecc129ea98195eb70 · Final commit: 59fda63 · Brief: docs/governance/briefs/foundations-turn-c2.md (sha256 23474983b700e1af1a4286356bc54c18805e8ea4e93ecfbf6068f86e3c697a7a), with ruling 1 docs/governance/briefs/foundations-turn-c2-r1.md (sha256 ef01bd2c25bc0e37d57861a845cf35ff23279c11ebf996eb45e3baf41b8ff779), ruling 2 docs/governance/briefs/foundations-turn-c2-r2.md (sha256 087c60afac1f3b60acc9a46c095d8863928157bd651ba318fd46fc5f91790334), ruling 3 (given in the session, not a file) and ruling 4 docs/governance/briefs/foundations-turn-c2-r4.md (sha256 2de9f041762c4dd585b616a1aadace3b8766832e211aaeeb2b8e11f2bc93935e)
Review: READY · 0 BLOCKER · 1 MAJOR · 6 MINOR · on 59fda63

## 1. Done / not done, by part and step

- Part A — done: `git rev-parse HEAD origin/dev` → a05e5c9594b077ec41fb3ffecc129ea98195eb70 (equal); ci-status.md then named ebd91c10 (SUCCESS, run 40684645197 — STALE for a05e5c95, whose run 40689208427 was pending; it completed SUCCESS 13:01Z); local-backend-proof.md for a05e5c95: `| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |`, "Repeat lane (DEC-283): Repeat: nothing to repeat" (ruling 1, R3: G1's condition met).
- STEP 0 — done (`2980ef4`): the brief saved as docs/governance/briefs/foundations-turn-c2.md, `23474983b700e1af1a4286356bc54c18805e8ea4e93ecfbf6068f86e3c697a7a`, 18208 bytes (equal to the carrying message's); roadmap.md line 3 named it (later the rulings' files, as each ruling's HOW said).
- Part B — done (`d7129b2`; ruling 1 R2 `ebbaaca`): B1 `SIGN_OUT_LANDING`; B2 every consumer of concern 1 on it (app-shell.tsx :136, :681, :688, :705, :807; by ruling 1, settings.tsx :143 and admin.tsx :69); CF-SOL-1/2; B3 `sessionsIn` for SO-11/12/13, `routePageClosed` and its two test lines removed, e2e-harness.md's route-guard sentence and the session helpers' list, admin-shell.md's DEC-279 sentence; B4 tests and bundle (§5).
- Part C — done in ruling 3's form (`71a9db3`), after stops 1–3: the overlays' warm-up reports its state to the E2E build (`__ethioMenuAhead`), SO-13's phone leg opens the menu first offline; createHomeAhead as at BASE. C1's census is stop 1's (docs/governance/reports/foundations-turn-c2.stop-1.md).
- Part D — done (`50005bd`; ruling 4 R15 `9432bac`), partly fixing INC-937 (§4).
- Part E — done (`c0f7bed`, after stop 4; ruling 4 R13): E1 logOnDemandFailure + ODC-7/8; E2 MAP_FAILED_IDS in still-map.ts, MapFailedHere in map-failed-here.tsx; E3 the texts; E4 the links keyed on the pin's values (useSteadyPin); E5 SWN-1; E6 tests and bundle.
- Part F — done (`acb87fe`): F1 HB-1 + CF-KIT-7/8; F2 CF-RLF-3.
- Part G — done (`bbffeab`): G1 AGENTS.md :34; G2 register rows 65–68 and row 15 (row 62 not widened — ruling 3, R12); G3 later words under INC-937, INC-950, INC-960, INC-966 registered, numbering → INC-967; G4 the roadmap ticks; G5 the changelog line; G6 nightly-e2e.md's zone check (NH-6). The i18n maps (`c8b9975`).
- Between: the CI red of stop 2's landing (run 40697185212, ODE-1) fixed at its root (`a60d003`).
- THE CHECKS, THE END-TO-END CHECK, THE INDEPENDENT REVIEW — done (§5, §7); the reviewer ran four times (c8b9975: NOT READY · 1 BLOCKER · 1 MAJOR · 10 MINOR; f26fdf7: READY · 0 BLOCKER · 0 MAJOR · 6 MINOR; 9fc4138: READY · 0 BLOCKER · 1 MAJOR · 9 MINOR; 59fda63: the line above), its findings answered in `f26fdf7`, `9fc4138` and `59fda63` or under §10; this report; the landing.

## 2. Files changed

`git diff --name-only a05e5c9594b077ec41fb3ffecc129ea98195eb70` (86 paths) and this report:

```
AGENTS.md
docs/_changelog.md
docs/features/admin-shell.md
docs/features/e2e-harness.md
docs/features/listings.md
docs/features/nightly-e2e.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-c2-r1.md
docs/governance/briefs/foundations-turn-c2-r2.md
docs/governance/briefs/foundations-turn-c2-r4.md
docs/governance/briefs/foundations-turn-c2.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-c2-r1.stop-2.md
docs/governance/reports/foundations-turn-c2-r2.stop-3.md
docs/governance/reports/foundations-turn-c2-r2.stop-4.md
docs/governance/reports/foundations-turn-c2.stop-1.md
docs/tracking/incidental-findings.md
e2e/ad-page-doors.spec.ts
e2e/ad-page.spec.ts
e2e/admin-categories-images.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-translations-console.spec.ts
e2e/admin-translations-governance.spec.ts
e2e/admin-users.spec.ts
e2e/auth-signout.spec.ts
e2e/global-setup.ts
e2e/global-teardown.ts
e2e/helpers/categories.ts
e2e/helpers/countries.ts
e2e/helpers/locations.ts
e2e/helpers/net-retry.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
e2e/helpers/ui.ts
e2e/helpers/users.ts
e2e/legal-admin.spec.ts
e2e/legal-certify.spec.ts
e2e/legal-doors.spec.ts
e2e/my-listings-ad.spec.ts
e2e/my-listings-doors.spec.ts
e2e/my-listings-page.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/allowlist-keys-allowlist.txt
scripts/conformance/error-text-allowlist.txt
scripts/conformance/holds-its-box.test.ts
scripts/conformance/kit.test.ts
scripts/conformance/on-demand-failure.test.ts
scripts/conformance/resilient-fallbacks.test.ts
scripts/conformance/sign-out-landing-allowlist.txt
scripts/conformance/sign-out-landing.test.ts
scripts/deny-tests/p1f-identity-unlink.ts
scripts/e2e-failure-report.ts
scripts/e2e-migration-preflight.ts
scripts/feed-bench.ts
scripts/security-lints.ts
scripts/staging-gate.ts
src/components/app-shell.tsx
src/components/shell/date-field-offline.test.tsx
src/components/shell/date-field.tsx
src/components/ui/overlay-loader.ts
src/features/posting/map/map-failed-here.tsx
src/features/posting/map/map-frame.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-offline.test.tsx
src/features/posting/map/map-pin-dropper-offline.test.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/still-map.ts
src/features/posting/map/use-steady-pin.test.ts
src/features/posting/map/use-steady-pin.ts
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where-no-map.test.tsx
src/features/posting/step-where.tsx
src/features/posting/step-who.tsx
src/lib/env-flags.test.ts
src/lib/error-text.test.ts
src/lib/on-demand-failure.ts
src/lib/resilient-lazy.test.tsx
src/lib/resilient-lazy.ts
src/lib/sign-out-landing.test.ts
src/lib/sign-out-landing.ts
src/routes/admin.tsx
src/routes/settings.tsx
src/test/e2e-route-guard.test.ts
docs/governance/reports/foundations-turn-c2-r4.report.md
```

New files, `git ls-files` (16 of 16 tracked): docs/governance/briefs/foundations-turn-c2-r1.md, docs/governance/briefs/foundations-turn-c2-r2.md, docs/governance/briefs/foundations-turn-c2-r4.md, docs/governance/briefs/foundations-turn-c2.md, docs/governance/reports/foundations-turn-c2-r1.stop-2.md, docs/governance/reports/foundations-turn-c2-r2.stop-3.md, docs/governance/reports/foundations-turn-c2-r2.stop-4.md, docs/governance/reports/foundations-turn-c2.stop-1.md, scripts/conformance/allowlist-keys-allowlist.txt, scripts/conformance/error-text-allowlist.txt, scripts/conformance/sign-out-landing-allowlist.txt, scripts/conformance/sign-out-landing.test.ts, src/features/posting/map/map-failed-here.tsx, src/features/posting/map/use-steady-pin.test.ts, src/features/posting/map/use-steady-pin.ts, src/features/posting/step-where-no-map.test.tsx. Deleted: none.

## 3. Behaviour contract — answer tables before → after

| Touched | At BASE | Now |
| --- | --- | --- |
| app-shell sign-out: full load online (:681), the offline wait (:688), after the purge (:705), a gated page's kick (:807); the page fetched ahead (:136) | `"/"` literals | `SIGN_OUT_LANDING` (`"/"`) — the same page, the same calls, the same order |
| settings.tsx live guard; admin.tsx console gate (signed out or no admin permission) | `navigate({ to: "/", replace: true })` | `navigate({ to: SIGN_OUT_LANDING, replace: true })` — the same page; admin's comment says the landing is shared by design |
| `warmOverlaysWhenIdle` (overlay-loader.ts) | after load + idle: `loadOverlays().catch(() => undefined)` | production: the same line (the built warm-up carries no `__ethio` name; at Part C the entry's closure was 211255 bytes, BASE's); E2E build only: sets `window.__ethioMenuAhead` (typed on `Window`) to "loading", then "ready" or "failed" |
| `reportOnDemandFailure` | logs `[client-error] <label> failed to load: <errorText>`, raises the notice | the same line through `logOnDemandFailure`, then the notice |
| the calendar's failed download (date-field.tsx) | `console.error("[client-error] the calendar failed to load", error)` | `[client-error] the calendar failed to load: <errorText>` (one string) |
| resilientLazy, `inPlace` | `console.error("[client-error] <label> failed to load", error)` | `[client-error] <label> failed to load: <errorText>` (one string); otherwise unchanged (`reportOnDemandFailure`) |
| map-preview, map-large, map-pin-dropper, the map's links, the phone library | `[client-error] <label> failed to load: <errorText>` written in place | the same words, written by `logOnDemandFailure` |
| MapFailedHere | map-frame.tsx; ids as literals | map-failed-here.tsx; the same DOM and test ids, from `MAP_FAILED_IDS` (still-map.ts) |
| the ad page's map links (listing-detail.tsx) | the effect re-ran (links cleared, the module asked again) whenever the pin object changed | it re-runs when the pin's point or precision changes (`useSteadyPin`: the same point and precision keep the held pin); the links themselves unchanged |
| e2e `pageWentAway` | "Target page, context or browser has been closed" \| "Response has been disposed" | also "Fetch response has been disposed" (route.fulfill's words) |
| e2e `routePageClosed` | exported, called only by RG-3 | removed, with RG-3's two lines on it |
| e2e/scripts hand reads (§4) | `x instanceof Error ? x.message : String(x)`, `(x as Error).message`, `String(x)`, `String((body as { message }).message)` | `errorText(x)`: the same text for an Error with a message and for a string; an Error without a message gives its name, an object its message/code/status — never `[object Object]` or `undefined` |
| every page's first download | BASE | Part B, Part C: equal, every line; Part E: +30 bytes gzipped in the entry's closure (211255 → 211285) — 7 page lines +0.1 KiB, /admin/listings −0.1 KiB (ruling 4, R14); the final build (`59fda63`): every chunk name equal to Part E's build (`c8b9975`), so every page byte for byte Part E's; against BASE (exact gzip bytes per page, the budget script's own closure reader over BASE's build and this one) the largest growth is +65 B (/my-listings_/$listingId; /l/$slug +63, /admin/listings_/$listingId +49, /admin/screening +37) — logOnDemandFailure's own code and the chunk names it moves (R11, R14). A first answer to the review (`samePin` in pin.ts, `f26fdf7`) took four pages to +114…+119 B over BASE, past R11's 0.1 KiB; it was taken back in `9fc4138` (§10) |
| the seven door specs' `answerOf` (ad-page-doors :46, admin-listings :102, legal-certify :53, legal-doors :51, my-listings-ad :57, my-listings-doors :83, my-listings-page :57) | `String(body.message)` | `errorText(body)`: the same value for every refusal with a non-empty string message; for an empty or non-string message it reads `code X` or `no message (object)` instead of `""` / `undefined` (a test-side value only) |

No route, door, migration, string or permission changed.

## 4. Censuses

- Concern 1 (BASE): `grep -rn 'replace("/")\|to: "/", replace' src --include=*.ts --include=*.tsx` → app-shell.tsx :681, :688, :705, :807, settings.tsx :143, admin.tsx :69; `routesById["/"]` app-shell.tsx :136. Now: none (CF-SOL-1: `[sign-out-landing] files read: 519; literal landings: 0; allowed: 0` at R2).
- Concern 2 (C1, at BASE): stop 1's report — the menu is a DropdownMenu facade (app-header.tsx :204–:249; its Sign out :241–:247); its code (overlays-impl via `loadOverlays`, overlay-loader.ts :27) arrives on the first hover/focus/press (overlay-facade.tsx :125–:143) or by `warmOverlaysWhenIdle` (overlay-loader.ts :63–:76, called on mount, overlay-facade.tsx :117 and :445) after load and idle, its failure swallowed and nothing reporting its arrival — so SO-13 opened the menu once online.
- Concern 3 (BASE): `git grep -n "instanceof Error ? [a-zA-Z]*\.message" a05e5c95 -- e2e scripts src` → 40 lines: 29 in 12 e2e files, 10 in 6 scripts files, src/lib/error-text.test.ts's pattern (the roadmap's 30/13 counted the route guard's line, moved in turn 34c-4). ERRT-6 widened to the four forms over src/, e2e/ and scripts/ (tests included): red on BASE's tree — at Part D `[error-text] files read: 1093; hand reads: 113` (line by line; 112 once src/lib/error-text.ts, the rule itself, left the census); after the review's BLOCKER each form is matched over the whole file, so a read split across lines counts: BASE's tree 114 (the scratch census of the same patterns over `git archive a05e5c95`, the rule's file and its test outside). Moved onto errorText: every read in 21 e2e files (e2e/global-setup.ts's split read after the review) and 6 scripts files (relative imports — e2e/ and the scripts run under bun; `bun build` resolves all six scripts; the failure reporter's and the preflight's self-tests pass). Now `[error-text] files read: 1096; hand reads: 17; allowed files: 13` (the 17th: src/lib/lovable-error-reporting.ts :49, a split read in an allowlisted file).
- Concern 4 (BASE): `[client-error] … failed to load` written outside on-demand-failure.ts — ODC-7 red with exactly the seven the brief named (`[ODC-7] files read: 522; own failure lines: 7`); now 0.
- Concern 5 (BASE): `grep -rn "readAllowlist(" scripts src e2e --include=*.ts` → 21 lines with this turn's two (sign-out-landing.test.ts, error-text.test.ts): kit.test.ts's own 2 and scripts/list-action-labels.test.ts (a reader of its own, scripts/list-action-labels.ts) aside, 18 callers of the kit's reader. Read one by one: HB-1 handed `consumers`; the AI gateway census hands its findings under the name `rows`; the other 16 hand their findings' keys. CF-KIT-7: `[allowlist-keys] readAllowlist callers: 18; not named findings: 2; allowed: 0` red → `… not named findings: 1; allowed: 1` (HB-1 fixed; the gateway's line).
- Proof of CF-KIT-7 (how): the census follows each call's second argument through the file's plain `const` declarations and requires the text it reaches to name the census's findings (`findings`, `found`, `census`, `keys`, `sites`, `breaches`, `hits` — the names every census in the tree uses); a destructured binding counts by its own name only, so `consumers` from a census fails; CF-KIT-8 plants a caller of each kind. It is a naming law, not a data-flow proof: a caller that names a non-finding `keys` would pass — the reviewer's read stays the backstop.

## 5. Tests

- Added: CF-SOL-1/2 (scripts/conformance/sign-out-landing.test.ts); SAH-1/2/3 (src/lib/sign-out-landing.test.ts — the warm-up's report with DEV off and the E2E flag on; a failed warm-up logs once, no notice; SAH-3 a production build still fetches and writes no name); ERRT-8 (ERRT-7 was taken — ruling 4, R4); ODC-7/8; SWN-1 (src/features/posting/step-where-no-map.test.tsx); CF-KIT-7/8; CF-RLF-3; USP-1/2 (src/features/posting/map/use-steady-pin.test.ts — the review's MINOR: an equal copy keeps the held pin; two absences are the same). CF-KIT-7 takes the kit's `TREE_SCAN_MS` (the review's MAJOR: a whole-tree parse ran 3898 ms alone and timed out at 5000 ms in a 20-file run; its assertions unchanged, its body re-indented by the formatter). Widened: ERRT-6 (src/, e2e/, scripts/), RG-1 (one more wording). Changed: SO-11/12/13's "no session" checks (`sessionsIn(page)` → `[]`); SO-13's phone leg (no online opening; it waits for `__ethioMenuAhead` "ready"); RG-3 (its two `routePageClosed` lines gone with the function); HOOK-1's list (src/components/ui/overlay-loader.ts: __ethioMenuAhead); HB-1 (hands its findings); RLZ-3, DF-6 (ruling 4, R13: partial mock, the one log line); MOF-1/2 (src/features/posting/map/map-offline.test.tsx :23) and PMD-1 (map-pin-dropper-offline.test.tsx :21): full mocks of on-demand-failure become partial so the real `logOnDemandFailure` runs (their consumers now log through it); their assertions unchanged; HA-1…4 unchanged.
- Red first (each on the code before its fix, none committed): CF-SOL-1 on BASE's app-shell — five findings (:136, :681, :688, :705, :807); RG-1 — `Tests  1 failed | 4 passed (5)` (`expected false to be true` :50); SAH-1/2 on HEAD's warm-up — `Tests  2 failed | 4 passed (6)`; SAH-3 against a warm-up with its `isE2E` gate removed (a local edit, restored) — `× SAH-3 …`, `AssertionError: expected 'ready' to be undefined`, then `Tests  7 passed (7)`; ERRT-6 — 113 hand reads line by line, 114 matched over the whole file; ODC-7 — seven lines; CF-KIT-7 — two callers; HB-1 — a planted stale line `src/features/posting/step-where.tsx#MapPreview`: accepted by the old reader (`[HB-1] … allowlist: 12`, failing only on HB-1's own check), refused after (`holds-its-box-allowlist.txt:13 stale allowance`); CF-RLF-3 — the one-level reader missed `far → deep/loader → deep/deeper` (`Tests  1 failed | 2 passed (3)`).
- Unit totals: on c8b9975 `bunx vitest run` → `Test Files  344 passed (344)` · `Tests  2070 passed (2070)`; on the final code commit (`59fda63`) `Test Files  345 passed (345)` · `Tests  2073 passed (2073)`. Per part: B `474 passed (474)`; C `471 passed`; D `462 passed (462)` (src/lib scripts src/test); E `937 passed (937)`; F `244 passed (244)` (scripts).
- THE END-TO-END CHECK (`bun run e2e:local`, both projects, 0 retries, fake mode, ethio-staging):
  - `e2e/auth-signout.spec.ts e2e/ad-page.spec.ts`: `1 failed` · `5 skipped` · `106 passed (10.8m)` — the red: SO-9 [desktop-1280], `expect(page).toHaveURL(/\/auth\?.*reason=deactivated/)` received `http://127.0.0.1:4173/` (call log: 4 × `/auth`, then 15 × `/`); client log: `[client-error] legal landing read failed`, `HTTP 403 POST /auth/v1/logout (session_not_found)`. `[ssr-error]` lines: 0. SO-9 alone on desktop: on BASE's src/ and e2e/ files `1 passed (16.3s)`; on this turn's `1 passed (14.5s)` (§12).
  - `e2e/admin-translations-console.spec.ts e2e/admin-translations-governance.spec.ts e2e/admin-categories-lifecycle.spec.ts` (`Running 118 tests using 2 workers`): `2 failed` · `4 skipped` · `112 passed (15.6m)` — the reds: TR-7b [desktop-1280] (`getByTestId('step-up-modal')` expected hidden, received visible, 20000 ms) and TR-30 [desktop-1280] `@global-state` (`getByTestId('strings-pseudo-summary')` not found in 240000 ms) (§12). `[ssr-error]` lines: 4, all `/api/admin/categories/import categories` badHeader ×2 and wrongFile ×2 (the import refusals the lifecycle spec provokes, on the server-error allowlist).
  - After the review's fixes (SO-13 and e2e/global-setup.ts changed), `e2e/auth-signout.spec.ts` alone (on f26fdf7; no e2e/ file changed after it — `git diff --name-only f26fdf7 59fda63`): `34 passed (3.1m)`, `[ssr-error]` lines: 0 (`grep -c`).
- ODE-1 alone (stop 3): `2 passed (26.9s)`, `[ssr-error]` 0.
- J-audit (e2e/** changed): J1–J9 — no fixture, row, lease or namespace changed; the reads moved onto errorText change only failure messages; sessionsIn reads storage (no DB row); SO-13 waits on the E2E instrument by Playwright's own polling (J7, no waitForTimeout); no real row touched (J3); no assertion loosened — SO-11…13's check is wider (every project's session, not one).

## 6. K2 — siblings that bypass the mechanism

Greps: `grep -rn 'replace("/")\|to: "/", replace' src` (none); `grep -rn "\[client-error\].*load" src` (one); `grep -rnE "String\(\s*\w*([Ee]rror|[Ff]ailure|[Cc]ause)\s*\)" src e2e scripts` (five); `grep -rn "readAllowlist" scripts`; `grep -rn "holdsStoredSession(" e2e src`.
- Concern 1: src/routes/auth.tsx :489 `navigate({ to: "/" })` — a "back to the marketplace" link, not a landing (no `replace`); left.
- Concern 2: e2e/auth-signout.spec.ts SO-12's phone leg still opens the menu once online (the brief named SO-13 only); e2e/helpers/session.ts :88 `holdsStoredSession` has no caller left (`grep -rn holdsStoredSession e2e src scripts`: its definition only) and docs/features/e2e-harness.md still lists it — kept, because B3 places `sessionsIn` "beside `holdsStoredSession`"; its retirement is the supervisor's to rule.
- Concern 3: the 12 src files of error-text-allowlist.txt (until INC-937); reads the census's names do not cover (ERRT-6's `String(…)` form names `error|err|e|caught|reason`, not `failure`) — src/server/legal-page.ts :24 `errorText(String(failure))`, src/routes/api/upload/photo.ts :462 `String(deleteError)`, src/routes/legal.accept.tsx :26 `String(failure)`, src/lib/signed-in-route.test.ts :24 `String(failure)`, e2e/helpers/ui.ts :541 `String(dumpError)`, src/features/admin-attributes/attribute-dialogs.tsx :81 and :583 `(error as { message?: unknown }).message`, scripts/e2e-failure-report.ts :1561 (the reviewer's grep). legal-page.ts's `errorText(String(failure))` stringifies first, so an error object would log "[object Object]". Left: outside SCOPE, or a form ERRT-6 does not name — INC-937's next turn.
- MINOR-4's class (an effect keyed on the pin object): src/features/posting/step-where.tsx :833 and :1282 — in SCOPE, but E4 named the ad page's links only; left.
- Concern 4: three on-demand load failures log in their own words, outside `logOnDemandFailure` and invisible to ODC-7 (it reads `console.error` lines starting `[client-error]` with "failed to load"): src/features/auth/auth-service.ts :48 (`[client-error] the sign-in code did not load:`), src/components/ui/overlay-loader.ts :36 (`[overlays] … failed`, a warning for a warm-up nobody asked for — SAH-2 holds it), src/lib/sign-out-landing.ts :54 (`[home-ahead] … did not download`, HA-3 holds it). Register row 67 names auth-service.ts only. Left: none is a failure said in place to a person.
- Concern 5: scripts/list-action-labels.ts — a second allowlist reader of its own (grammar of its own); src/server/ai/gateway.census.test.ts hands its findings as `rows` (allowlisted).

## 7. Allowlists and guards

- scripts/conformance/sign-out-landing-allowlist.txt (new): 0 → 2 (Part B) → 0 (ruling 1, R2); kept with a header saying no exception stands.
- scripts/conformance/error-text-allowlist.txt (new): 0 → 13 — e2e/shell.spec.ts (`page.evaluate`, until 2026-12-31); 12 src files, until INC-937 (ruling 4, R15).
- scripts/conformance/allowlist-keys-allowlist.txt (new): 0 → 1 — src/server/ai/gateway.census.test.ts (until 2026-12-31).
- holds-its-box-allowlist.txt: 11 → 11 (no line stale under the finding keys).
- Guards self-tested by plants: CF-SOL-2, ERRT-8, ODC-8, CF-KIT-8, CF-RLF-2/3. HOOK-1's list gains `src/components/ui/overlay-loader.ts: __ethioMenuAhead`.
- THE CHECKS (`bun .claude/hooks/land.ts --checks`): ✓ lint · ✓ typecheck · ✓ test:unit · ✓ i18n:usage · ✓ i18n maps committed · ✓ build · · check-migrations not needed · ✓ format:check — `CHECKS GREEN for code tree a30f2ae253ae0d9d` (the first run refused at i18n:usage until the maps moved, `c8b9975`); after the review's fixes (`f26fdf7`) the same seven ✓ and `CHECKS GREEN for code tree eeeb6c6f55bc50de (7 unlanded commit(s))`; after `9fc4138`, `CHECKS GREEN for code tree 5aa452dd4d1cf331 (8 unlanded commit(s))`; after `59fda63` (the last code commit): ✓ lint · ✓ typecheck · ✓ test:unit · ✓ i18n:usage · ✓ i18n maps committed · ✓ build · · check-migrations not needed · ✓ format:check — `CHECKS GREEN for code tree e98fad1da3dfcf8f (9 unlanded commit(s))`. `bun run lint`: 0 errors, 39 warnings — among them src/features/posting/map/map-preview.tsx :44 (react-refresh/only-export-components: `snap` exported beside the component), standing since BASE (`snap` at :44 in `git show a05e5c95:…`), not this turn's. `git diff a05e5c95 --stat -- supabase package.json bun.lock .claude .github`: empty. `node scripts/check-bundle-size.mjs`: `Bundle budget OK.`

## 8. Strings

None (FLAGS no-new-string). The i18n maps moved only in `"scanned": 600` → `602`.

## 9. Migrations

None.

## 10. Departures

- Four stops and four rulings: stop 1 (docs/governance/reports/foundations-turn-c2.stop-1.md — the menu's E2E name needed src/lib/env-flags.test.ts) → ruling 1 (R1 HOOK-1's line; R2 settings.tsx and admin.tsx onto the constant, their allowlist lines removed; R3 G1's condition met; R4 ERRT-7 taken); stop 2 (foundations-turn-c2-r1.stop-2.md — the widened fetch-ahead grew every page by 79 bytes) → ruling 2 (R5–R8: the fetch-ahead fetched on demand); stop 3 (foundations-turn-c2-r2.stop-3.md — that design was still 57 bytes over BASE) → ruling 3 (R9–R12, given in the session: option (c) — the menu's warm-up reports its arrival; createHomeAhead as at BASE; no whenPageIdle; R11 a growth of at most 0.1 KiB with its cause named is reported, not a stop; R12 row 62 not widened); stop 4 (foundations-turn-c2-r2.stop-4.md — RLZ-3 and DF-6 outside SCOPE) → ruling 4 (R13 their two edits; R14 Part E's +30 bytes accepted; R15 the src residue until INC-937; R16 go on). The report is filed under the stem of the brief in force (foundations-turn-c2-r4), as the land hook names it.
- A finding on the way (stop 2, kept by ruling 2): the two E2E state names rode in each piece's data and shipped in the production build (DEC-018); every E2E name is now written only inside `isE2E` — the production build carries none (`grep -o "__ethio[A-Za-z]*" dist/client/assets/*.js`: none).
- HOOK-1's line: ruling 1 put `__ethioMenuAhead` on app-shell's line; ruling 3 moved the report into the warm-up. With app-shell writing the name through a listener, the listener's code stayed in the production build (rolldown keeps a cross-chunk import whose only call is dead: closure 211296 against BASE's 211255), against R10's "the production build carries none of it"; so the warm-up writes the name itself and HOOK-1 lists it on `src/components/ui/overlay-loader.ts` instead (app-shell's line is BASE's).
- STEP 0 saved the brief and each ruling with the editing tool (the start-turn skill's way), not a scripted copy; each file's sha256 and byte count equal the carrying message's.
- The CI red of stop 2's landing (run 40697185212, ODE-1, desktop-1280: `route.fulfill: Fetch response has been disposed`) was classified (e), read and fixed at its root in this turn (`a60d003`); stop 3's landing ran SUCCESS (run 40702906303).
- Census widths beyond the brief's counts: ERRT-6 over all four forms and src/ outside the server found 113 reads line by line, 114 over the whole file (the brief's 40 was the `instanceof` form in e2e/scripts); the residue, 17 reads in 13 files, is allowlisted — 12 src files outside SCOPE until INC-937 (ruling 4, R15) and e2e/shell.spec.ts's in-page read. Concern 5 recounted: 18 kit callers (the brief's 20 counted grep lines); CF-KIT-7's floor is 18.
- New helpers inside SCOPE that the brief did not name: `useSteadyPin` (src/features/posting/map/use-steady-pin.ts) — E4's first form keyed the effect on three loose values and failed CF-PIN-1 ("a pin travels as one value"); the hook keeps the pin one value. `sessionsIn`'s session name is derived from the app's rule (`keyBeside`), so no storage name is written in e2e/ (CF-PROJECT-3).
- The two in-scope map tests' mocks (MOF-1/2, PMD-1) became partial so the real `logOnDemandFailure` runs; their assertions are unchanged.
- INC-966's entry was copied by script from the saved brief (sha256 of the block equal before formatting); the repository's formatter then escaped its `.github/workflows/**` as `\*\*` (format:check; the same text rendered).
- E3: docs/governance/mechanisms.md :62 (row 52) held no sentence saying MapFailedHere draws Leaflet's failures; its stale "`inPlace` … the pin map" phrase now names the maps too. docs/_changelog.md :1155 was corrected in place (one parenthesis), as E3 lists it.
- The AI gateway census (outside SCOPE) holds a line in the new allowlist-keys allowlist rather than being renamed.
- THE END-TO-END CHECK's SO-9 red is named under §12, not a stop: the two navigations that raced (app-shell.tsx :806 to `/auth?reason=deactivated`; src/routes/auth.tsx :97/:300, the auth page's own landing on its return path, "/" by default) are lines this turn did not change, and SO-9 alone passed on BASE's files and on this turn's.
- Review findings and their answers. c8b9975's review: the BLOCKER (ERRT-6 matched line by line, so a read split across lines passed) fixed in `f26fdf7` (whole-file matching; e2e/global-setup.ts's split read onto errorText; the counts 114 / 17 in row 15, INC-937's later word and the changelog); the MAJOR (`as unknown as` for the window name) fixed by a `Window` declaration; the MINORs fixed in scope (SO-13's wait on the phone only, the env stubbed in SAH, listings.md, the allowlist reason ":49 and :51", the "byte for byte BASE's" claims corrected) or named here. f26fdf7's: row 57's `routePageClosed` and roadmap.md :530's "16 reads" corrected (`9fc4138`); SAH's mock moved to the file's top level. The reviewer asked for pin equality in pin.ts (row 57's mechanism, `samePin`); done in `f26fdf7`, it took four pages past R11's 0.1 KiB over BASE (+114…+119 B), so `9fc4138` keeps the comparison inside `useSteadyPin` (the production build back to Part E's, every chunk name equal) — `samePin` in pin.ts is left for a ruling. 9fc4138's: the MAJOR (CF-KIT-7 without `TREE_SCAN_MS`) fixed in `59fda63`; SAH's "positive control" that called the mock itself removed, SAH-1/2 now run with DEV off and the E2E flag on (the stub was a no-op under vitest's DEV), and SAH-3 added; the rest under §4 (CF-KIT-7 proves by name), §6 (K2), §5 (MOF/PMD mock shapes) and here.
- 59fda63's review (the line above) — for a ruling, not changed: its MAJOR asks for SAH-2's "positive control" back (the lines that imported the reporter and called it, then saw the spy called). 9fc4138's review found that control proved nothing of the warm-up's own path (it calls the mocked reporter itself), and 59fda63 removed it — its commit title names SAH-3 and the E2E flag, not the removal. The "raises no notice" assertion holds by construction while overlay-loader.ts imports nothing that reaches on-demand-failure (§12); SAH-3 is the test of the warm-up's production branch that can fail (shown red). Restore the control, or drop the assertion, is the supervisor's call. Its MINORs: CF-KIT-7 proves by name (§4, §12); CF-RLF-3's reach (below); ERRT-6's allowlist is keyed by file, so an allowlisted file can gain reads unseen (§12); `useSteadyPin` without a consumer test (§12); the departures it lists (a60d003, the MOF/PMD mocks, `useSteadyPin`) are here; and four record errors, corrected by this report rather than by another commit after the reviewed one: INC-937's later word says "20 e2e files" — 21 e2e files now import errorText (e2e/global-setup.ts the 21st, after the review); register row 66 says CF-SOL-1 was "red on BASE with five findings" — five was its count with Part B's two allowlist lines; with the final empty allowlist BASE has seven (app-shell ×5, settings.tsx :143, admin.tsx :69); the changelog line and INC-960's later word name SAH-1/2, and SAH-3 joined them in 59fda63; roadmap.md's ticked INC-960 line still says "createHomeAhead's second consumer, register row 62", which ruling 3 replaced (the warm-up reports instead; row 62 not widened, R12) — its appended note says so, the original words stay.
- roadmap.md :530 ticks INC-937 `[x]` as G4 says, while R15 left it PARTLY FIXED (12 src files until INC-937, the supervisor queueing the next turn); no residue line was added (STEP 0 adds only the lines a brief dictates) — untick it or add a residue line, for a ruling.
- CF-RLF-3's reach: F2 says the reader follows an in-place piece's imports "within src/"; it follows the fetched module's own folder, at any depth — following every import in src/ would flag the shared plumbing every piece imports (the overlay facades, the reporter itself). A narrower reach than F2's words, for a ruling.
- `useSteadyPin` (MINOR-4's answer) is a new hook the brief did not name (above); its behaviour is proven by USP-1/2 at the hook, not by rendering the ad page (§12).
- The reviewer was asked to run in the foreground each time; the harness ran it in the background twice and the turn waited for its answer before going on each time. A container restart lost one answer; the same reviewer re-sent it unchanged.

## 11. CI

The last landed commit is stop 4's, `f18cb06` (`git rev-parse origin/dev` → f18cb06bbafc4cf383130a658a0d9c92c9907fb1). `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `f18cb06bbafc4cf383130a658a0d9c92c9907fb1` (short `f18cb06`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T15:33:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40713967683
```

Two-step: (1) SUCCESS; (2) the reported commit equals f18cb06, the commit judged — CI green on f18cb06. This landing's run (ruling 4's save, Parts E–G and the review's fixes through 59fda63, and this report) has not completed: the supervisor reads it.

## 12. Limits

- SO-9 [desktop-1280] failed once in the two-file run (the deactivated sign-in ended on "/"; §5); alone it passed on BASE's files and on this turn's. A race between the deactivated redirect and the auth page's own return is the likely class; not reproduced alone, not fixed here — CI's lanes and repeat lane judge it.
- TR-7b [desktop-1280] failed in the three-file run (the step-up dialog stayed open); it is a ledgered flake (3 lines in ci-evidence's flake-ledger.md: 2026-10-12, 10-16, 10-20), and the turn changed only its spec's caught-error reads onto errorText, not the step-up path it waits on. TR-30 [desktop-1280] is `@global-state` (J8: serial-only in the nightly) and failed in a two-worker local run beside the other specs (no pseudo summary in 240 s); the turn changed only that spec's caught-error reads. Neither is fixed here; CI's lanes judge both.
- THE END-TO-END CHECK ran 5 of the 15 changed spec files (the brief's two and the three with the most changed lines); the other ten — e2e/admin-users, legal-doors, admin-categories-images, my-listings-page, my-listings-doors, my-listings-ad, legal-certify, legal-admin, admin-listings, ad-page-doors — are CI's (its repeat lane repeats every changed spec, DEC-283).
- E4 (the links keyed on the pin's values): its hook is proven by USP-1/2 (new behaviour, no red run); the ad page's own map tests (listing-detail-map.test.tsx) are outside SCOPE, so no test renders the ad page with a re-sent equal pin and shows the links effect not running again.
- SAH-2's "raises no notice" holds by construction: overlay-loader.ts imports nothing from on-demand-failure, so the assertion guards against a future import, with no positive control in the warm-up's own path. SAH-3 proves the production branch writes no name in the unit run; the built bundle was also read (`grep -l __ethioMenuAhead dist/client/assets/*.js`: none).
- e2e/global-setup.ts changed after the three-file run; the file loads in every browser run (the last sign-out run, §5, loaded it), but its changed line runs only when the staging probe fails, which no run here provoked.
- scripts/ is not typechecked (INC-938): the six scripts that moved onto errorText were proven by `bun build` (imports resolve), the failure reporter's self-test and the preflight's self-test (10 cases).
- ODE-1's local pass does not reproduce its CI race; CI on the landings after `a60d003` is its proof (run 40702906303: SUCCESS).
- CF-KIT-7 is a naming law (§4), not a data-flow proof: `Object.keys(all)` or `const found = consumers` would pass; kit.test.ts itself is outside its scan.
- ERRT-6's allowlist is keyed by file: an allowlisted file (e2e/shell.spec.ts until 2026-12-31; the 12 src files until INC-937) can gain hand reads without failing; and its `String(…)` form names only `error|err|e|caught|reason`.
- The supabase-prod migration server failed to connect in this session (not needed: no migration).
