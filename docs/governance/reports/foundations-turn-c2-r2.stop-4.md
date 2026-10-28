STOP — turn C2 part E: logOnDemandFailure's two consumers outside the map need two tests outside SCOPE (src/lib/resilient-lazy.test.tsx RLZ-3, src/components/shell/date-field-offline.test.tsx DF-6)
DONE: part A; STEP 0; part B (`d7129b2`); rulings 1–3 (R2 `ebbaaca`; ODE-1's route-guard fix `a60d003`); part C per ruling 3 (`71a9db3`); part D (`50005bd`); part E (E1–E6) written and run — NOT committed, held in the session (21 files)
LEFT: part E (commit), parts F, G; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `4e231633b749bc7d0024625966894af45704ad61` (short `4e23163`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T14:25:15Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40702906303
Two-step check: the reported commit equals stop 3's landing (4e23163), the last landed commit — current; it carries the ODE-1 fix (`a60d003`), so run 40697185212's red is answered green.
FILES:
docs/features/admin-shell.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-c2-r1.md
docs/governance/briefs/foundations-turn-c2-r2.md
docs/governance/briefs/foundations-turn-c2.md
docs/governance/reports/foundations-turn-c2-r1.stop-2.md
docs/governance/reports/foundations-turn-c2-r2.stop-3.md
docs/governance/reports/foundations-turn-c2-r2.stop-4.md
docs/governance/reports/foundations-turn-c2.stop-1.md
e2e/ad-page-doors.spec.ts
e2e/admin-categories-images.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-translations-console.spec.ts
e2e/admin-translations-governance.spec.ts
e2e/admin-users.spec.ts
e2e/auth-signout.spec.ts
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
roadmap.md
scripts/conformance/error-text-allowlist.txt
scripts/conformance/sign-out-landing-allowlist.txt
scripts/conformance/sign-out-landing.test.ts
scripts/deny-tests/p1f-identity-unlink.ts
scripts/e2e-failure-report.ts
scripts/e2e-migration-preflight.ts
scripts/feed-bench.ts
scripts/security-lints.ts
scripts/staging-gate.ts
src/components/app-shell.tsx
src/components/ui/overlay-loader.ts
src/lib/env-flags.test.ts
src/lib/error-text.test.ts
src/lib/sign-out-landing.test.ts
src/lib/sign-out-landing.ts
src/routes/admin.tsx
src/routes/settings.tsx
src/test/e2e-route-guard.test.ts

## The conflict

Concern 4 (the brief): "`logOnDemandFailure(label, error)` in src/lib/on-demand-failure.ts writes the `[client-error] <label> failed to load: <errorText>` line; `reportOnDemandFailure` calls it", with src/lib/resilient-lazy.ts :33 and src/components/shell/date-field.tsx :93 among its consumers, and ODC-7 refusing any other such line. Both consumers move onto it (held). Two unit tests outside SCOPE then fail, each for two reasons — its module mock of on-demand-failure lists no `logOnDemandFailure`, and it asserts the line's old words (the error as a second argument, no `: <errorText>`):

- src/lib/resilient-lazy.test.tsx :8 `vi.mock("./on-demand-failure", () => ({ reportOnDemandFailure: vi.fn() }));` and RLZ-3 :63–:66 `expect(errors).toHaveBeenCalledWith("[client-error] the piece failed to load", expect.anything());` — the run: `TestingLibraryElementError: Unable to find an element by: [data-testid="piece-fallback"]` with `Error: [vitest] No "logOnDemandFailure" export is defined on the "./on-demand-failure" mock`.
- src/components/shell/date-field-offline.test.tsx :17 `vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));` and DF-6 :33–:36 `expect(errors).toHaveBeenCalledWith("[client-error] the calendar failed to load", expect.anything());`.

`bunx vitest run scripts/conformance src/features/posting src/lib src/components` with Part E held: `Test Files  2 failed | 162 passed (164)` · `Tests  2 failed | 935 passed (937)` — RLZ-3 and DF-6 only. Neither file is in the brief's SCOPE, ruling 1's or ruling 2's. Rule: .claude/rules/00-executor-protocol.md, "A file the task needs and the brief did not name is a STOP naming the file and why"; the brief's HOW TO WORK, "A STOP is only: … a needed file outside SCOPE".

Proposed ruling: add the two files to SCOPE for exactly these changes — each mock becomes the partial mock the two in-scope map tests now use (`async (original) => ({ ...(await original<typeof import("…/on-demand-failure")>()), <its stubs> })`, so the real `logOnDemandFailure` runs), and each assertion reads the one line: RLZ-3 `expect(errors).toHaveBeenCalledWith("[client-error] the piece failed to load: offline")`, DF-6 `expect(errors).toHaveBeenCalledWith(expect.stringMatching(/^\[client-error\] the calendar failed to load: /))` (its failure is the stand-in loader's own error). Their other assertions unchanged.

## Part E as held

- E1: `logOnDemandFailure` in src/lib/on-demand-failure.ts; `reportOnDemandFailure` calls it. Its seven consumers move onto it (map-preview.tsx, map-large.tsx, listing-detail.tsx, map-pin-dropper.tsx, step-who.tsx, date-field.tsx, resilient-lazy.ts). resilient-lazy.ts logged once before too — its own `[client-error] <label> failed to load` with the error as a second argument when `inPlace`, otherwise through `reportOnDemandFailure` — never twice; now both branches write the one line. ODC-7 (scripts/conformance/on-demand-failure.test.ts) RED first on the committed tree: `[ODC-7] files read: 522; own failure lines: 7` — exactly the seven; then `own failure lines: 0`; ODC-8 planted (three shapes named, the mechanism's call, a non-"failed to load" line and a console.warn passed). The census's other `[client-error]` lines (not "failed to load") stay: src/features/auth/auth-service.ts :48 "the sign-in code did not load:" is a sibling outside SCOPE (K2).
- E2: `MAP_FAILED_IDS` moves to src/features/posting/map/still-map.ts; MapFailedHere and both maps read it; MapFailedHere in its own file, src/features/posting/map/map-failed-here.tsx, imported only by listing-detail.tsx and step-where.tsx.
- E3: map-frame.tsx's wrong doc comment leaves with MapFailedHere (the new file says what it draws); docs/_changelog.md :1155 and e2e/ad-page.spec.ts :1150 corrected; docs/tracking/incidental-findings.md — a dated later word under INC-956, the old entry untouched; docs/governance/mechanisms.md :62 (row 52) holds no sentence that MapFailedHere draws Leaflet's failures — its stale phrase "`{ inPlace: true }` when its fallback says so: the pin map" now names the maps too.
- E4: the links effect at listing-detail.tsx is keyed on `useSteadyPin(pin)` (src/features/posting/map/use-steady-pin.ts, new) — the pin as one value that keeps its identity while its point and precision stay the same. A first form keyed on three loose values (`pinLat`, `pinLng`, `pinPrecision`) failed CF-PIN-1 (scripts/conformance/pin.test.ts: "a pin travels as one value") and was replaced.
- E5: SWN-1 (src/features/posting/step-where-no-map.test.tsx, new) draws the wizard's NoMap fallback with the map's code failing: `map-failed` and `map-refresh` in the still map's box, one log line, no notice.
- The two in-scope map tests (map-offline.test.tsx, map-pin-dropper-offline.test.tsx) — their on-demand-failure mocks become partial (the real `logOnDemandFailure` runs); MOF-1/2 and PMD-1's assertions unchanged.
- E6, lock-exact against Part C's numbers (Part C = BASE, every line): `JS: 205.7 KiB / 207 KiB — ok`; the entry's closure (`gzip -6c`, every JS file check-bundle-size lists) 211255 → 211285 (+30 bytes: `logOnDemandFailure`'s own function in the entry's on-demand-failure module; the seven sites' own template strings left their chunks). Lines that differ: /admin 206.6 → 206.7, /admin/legal_/edit 281.7 → 281.8, /admin/listings 352.4 → 352.3, /admin/screening 373.5 → 373.6, /auth 218.1 → 218.2, /auth_/reset 208.7 → 208.8, /l/$slug 247.3 → 247.4, /post 393.7 → 393.8. The map pages: /l/$slug 247.4, /admin/listings_/$listingId 375.6, its edit 399.1, /admin/screening 373.6, /my-listings_/$listingId 314.9, /post 393.8. Ruling 3's R11: at most 0.1 KiB with its cause named — reported, not a stop.
- typecheck clean; eslint on the touched files: no error (listing-detail.tsx's warnings 3 → 2, both older than this turn).
