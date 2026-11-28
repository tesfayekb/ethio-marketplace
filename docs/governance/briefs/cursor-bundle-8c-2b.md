CURSOR BUNDLE 8c-2b — the red board first (KAU-6, TR-14, CO-6); a refusal or failure as the screen reads it (INC-1340, INC-1341, INC-1313, INC-1338, INC-1339); the harness's small debts (INC-1336, INC-1320, S830's law, DEC-498 in the list's document). Base: dev b355cbe00

Stem: `cursor-bundle-8c-2b` (brief `docs/governance/briefs/cursor-bundle-8c-2b.md` (new); report `docs/governance/reports/cursor-bundle-8c-2b.report.md` (new)). Tier A (the shared form gate decides every submit; the route client carries every refusal to the screen; the browser-test harness holds the service role). FLAGS: no-migration, no-new-string, no-package-change, no-agents-change. NO PLANNING STOP (DEC-492 (4)): the supervisor ran the census on its own clone of b355cbe00 and it is written into STEP 1 below. You check the facts STEP 1 names, write what you find into the report's §2, and build straight on. You stop only when one of STEP 1's premises is wrong.

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat.**

THE ORDER (DEC-500, the supervisor's, G17, overridable; it amends DEC-499): this lane carries three fixes, and nothing joins it after this GO. Fix A is the red board: three tests that failed on the last runs of dev and of Cursor 8c-2a, fixed first (§8's red-board exception). WebKit (INC-1328, SAP-1 at webkit-390; DEC-483, DLG-E12's trace) moves to Cursor 8c-3, the lane of browser tests, with INC-1310's class guard, INC-1335, INC-1337 and the list's remaining rows. INC-1325's removal of `afterTotpStep` waits for DEC-488's judge (ten completed dev runs after the CI-speed merge; two had completed at this GO).

PREVENTION (G70 — four classes recurred):
- (1) A test acts on a state that is not yet settled, or that another test changes (KAU-6, INC-1199's class; TR-14, INC-1342; CO-6, INC-1343).
- (2) A refusal reaches the screen without its code or its class (INC-1340, INC-1341), and a test's mock of the route client hides how a failure is built (INC-1313).
- (3) A guard judges a file, not each branch of it (INC-1338), or lets a gone answer fall to a family's generic words (INC-1339, the second occurrence of INC-1279's "gone shown as temporary").
- (4) A second body for one act of the harness (INC-1336, after INC-1326).
- Repository: Part A lands KAU-13 and the two specs' fixes; Part B lands RCL-26, CF-MOCK-1, FNC-4 and DOORS-23; Part C lands CF-HELPERS-15, PEF-6 and CF-BRIEF-27.
- Instructions: not needed — S830's law has been in force since 2026-11-27 and lands here as CF-BRIEF-27.
- Cursor rules: changed at the next rules turn, not here — rule 40 gains a class for a red outside the turn's paths (ruling 1 of 8c-2a).
- Knowledge: not needed (no Lovable path).

THE SYSTEM (G0) — fix A: the red board
CONCERN: a test acts only on a state that is settled, and that no other test running beside it changes.
MECHANISM: three, one per test. The form gate (`src/components/forms/use-form-gate.ts` with the Field's report effect in `src/components/forms/field.tsx`, the effect at line 81). The serial pass for tests that read a global list (`@global-state`, run at one worker in the smoke lane: `.github/workflows/local-backend-proof.yml` line 798, INC-1135). The harness's seed-before-navigate and polling helpers (J7, `e2e/helpers/ui.ts`).
CONSUMERS:
  - KAU-6 (`src/routes/auth-forms.test.tsx` line 169) on the reset form (`src/routes/auth_.reset.tsx`: the gate at line 86, `gate.try()` at line 117, the two Fields at lines 211 and 240). Run 46100047891 on dev b6a2945c5, Component tests: its `waitFor` gave up at 1024 ms on `reset-password-confirm`'s `aria-invalid`; the DOM at the failure shows the first field refused and the confirm field not.
  - TR-14 (`e2e/admin-translations-data.spec.ts` line 188): run 46097467153 (8c-2a, lane 12, desktop-1280) failed both attempts at line 199, `entity-row-location-<id>-name` not found in 20 s after `data-search` was filled. The Data scope's search is debounced into the address (`src/features/admin/translations/strings-page.tsx` lines 231 to 246) and read again from it (line 212).
  - CO-6 (`e2e/admin-countries.spec.ts`, the rail-order test): run 46099916733 (8c-2a, lane 14, desktop-1280) failed both attempts at line 340, "the rail save refused notARoot twice"; run 46098160058 (lovable/next) and run 46097467153 retried it with the same error. The door refuses the whole list when any id in it is not an active root (`supabase/migrations/20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql` line 233), and the test saves the whole list of active roots, other tests' scratch roots included.
COVERED HERE:
  - KAU-6 (INC-1227's instance; INC-1199's class): HYPOTHESIS (G3) to prove or refute first — the submit ran before the two Fields' report effects, so `gate.try()` judged nothing missing (`listsRef` empty), the handler went on to the length check, and only the first field was refused, as too short. If that holds, the fix is in the mechanism: the gate never passes a submit before every Field it holds has reported. The way is yours (DECIDE-AND-NAME), in `src/components/forms/` only, with every form's behaviour otherwise unchanged. If the hypothesis is refuted, the cause you find decides, and you name it in §10.
  - TR-14 (INC-1342): HYPOTHESIS (G3) — the fill and the debounced write to the address race with the address being read back into the search box, or the read lands before the scratch row is in what the Data scope reads. Find the cause in the page's code and the test's order, then fix it at its cause, in the test or in the page. A page change must keep every other test of the console unchanged.
  - CO-6 (INC-1343): HYPOTHESIS (G3) — a scratch root of another test in the same lane goes between the dialog's read and the save. If that holds, CO-6 joins the serial pass by the `@global-state` tag (the existing mechanism; J6, J8). If it is refuted, the cause you find decides.
  - LEFT: the other tests of INC-1227 (CF-LANES-4 and CFRR-3 at their 5 s limits; the before-launch list).
CONFORMANCE GUARD: KAU-13 (`src/routes/auth-forms.test.tsx`, new): a submit dispatched before the Fields' report effects have run is not passed by the gate. RED-FIRST against the base's gate. TR-14 and CO-6 keep their assertions byte for byte. Their proof is CI's repeat lane, which repeats a changed spec (DEC-283).
EXCEPTIONS: none.
FIVE LENSES — security: the reset form never sends a blank or unchecked password · performance: none · failure modes: a gate that has not heard from its Fields stays closed, never open · consistency: one gate for every form · future growth: a new Field reports through the same path.
FORWARD-SCAN: every later form, and every later test that reads a global list. REGISTER: the form gate's row (DEC-339), amended.

THE SYSTEM (G0) — fix B: a refusal or a failure as the screen reads it
CONCERN: a route's refusal reaches the screen with its code and its class, a screen reads the code through one place, and a failure is shown by the shared notice in every branch.
MECHANISM: `routeFailure` (`src/lib/route-client.ts` lines 90 to 105) building a `ReaderError` with `readFailed` from the reader that loads on demand (`src/lib/reader-failure.ts`; `classify`, `FALLBACK_REFUSED_CODES` at line 146); the typed refusal families (`src/lib/door-family.ts`, `src/lib/refusal.ts`) judged by `scripts/conformance/door-words.test.ts`; `FailureNotice` (`src/components/shell/failure-notice.tsx`) judged by `src/components/shell/failure-notice.census.test.ts`.
CONSUMERS:
  - INC-1340 (a): the feed reads a code from a field the failure does not carry: `src/components/marketplace/feed.tsx` line 161 (`(error as { code?: unknown }).code`), so a saved place that no longer exists is never cleared (D1). Same shape: `src/features/admin/users/access-refusals.ts` line 36.
  - INC-1340 (b): a route's own 400 codes are read as malformed and offered a Retry that cannot succeed: the feed route's `badCursor`, `badCategory` and `badPlace`, which no door raises; `classify` knows the doors' codes only.
  - INC-1341: `savePin` (`src/features/posting/posting-service.ts` line 1257) answers a boolean and logs the code through `pinAnswer` (line 1225). Its callers are `src/features/posting/step-where.tsx` lines 1262 and 2040. So the pin sheet (`src/features/posting/map/map-pin-dropper.tsx`) never draws the posting family's words for `badLatitude`, `badLongitude`, `badPrecision`, `badZoom` and `directionsTooLong`.
  - INC-1313: eight unit tests mock `@/lib/route-client` without its own exports, so `routeFailure` is absent and a failure is built by no real path. Their files: `src/features/seller/use-seller-feed.test.ts`, `src/features/posting/map/geocode.test.ts`, `src/features/posting/posting-service.test.ts`, `src/features/admin-attributes/attributes-page.test.tsx`, `src/features/admin-countries/country-import-dialog.test.tsx`, `src/features/feed/use-feed.test.ts` (line 18), `src/features/admin-locations/location-import-dialog.test.tsx`, `src/lib/error-report-send.test.ts`. COUNT: 8 := rg -o --no-filename -e 'vi.mock\("@/lib/route-client", \(\)' src scripts | rg -c -e mock
  - INC-1338: the failure-notice census passes a file once it draws any notice, and `\.failed\s*&&` is not a branch to it. The census must judge each branch that draws a failure.
  - INC-1339: a family whose doors answer a gone code (a code whose status is 404 in the client's table, `refusalStatus` in `src/lib/reader-failure.ts` line 103) may let it fall to its generic words. Save's family now words `listingNotAvailable` as `failure.gone` (`src/features/ad-page/ad-page-refusals.ts` line 16, Lovable UF-1); no guard keeps it so.
COVERED HERE:
  - A route's refusal carries its code as data that the screen reads through one accessor in `src/lib` (the feature-local `refusalCode`, `src/features/ad-page/ad-page-refusals.ts` line 68, moves there and its callers follow). A route's own 400 code with a body code is read as a refusal, never as malformed, so it gets no Retry. The census lists every route's 400 codes.
  - The feed clears a saved place that is gone, as D1 asked (S1.10's row), and offers no Retry for its own 400 codes (S1.12).
  - The pin door's refusal reaches the pin sheet and is drawn through the posting family (S7s6.11's row).
  - The eight mocks keep the module's own exports, so `routeFailure` is the real one.
  - The failure-notice census judges each branch; every new hit moves onto `FailureNotice` in this lane. A hit that needs more than the drop-in is listed in §13 with file and line, for the supervisor to number, under an allowlist line with its reason and a date no later than 2026-12-31.
  - The refusal families' judge refuses a gone code (status 404) that a family's doors answer and that its words leave to `generic`.
  - S1.10's and S7s6.11's lines leave `scripts/conformance/user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`) when tests answer them by `uf:S1.10` and `uf:S7s6.11`.
CONFORMANCE GUARD: `src/lib/route-client.test.ts`, `scripts/conformance/route-client.test.ts`, `src/components/shell/failure-notice.census.test.ts` and `scripts/conformance/door-words.test.ts`:
  - `src/lib/route-client.test.ts` — RCL-26 (new): a route answer of 400 with a body code becomes a failure whose code the accessor reads and whose class is a refusal; a 400 with no code stays malformed.
  - `scripts/conformance/route-client.test.ts` — CF-MOCK-1 (new): no test file mocks `@/lib/route-client` without its own exports. Planted: the base text of `src/features/feed/use-feed.test.ts` line 18.
  - `src/components/shell/failure-notice.census.test.ts` — FNC-4 (new): a branch that draws a failure without the notice fails, even in a file that draws the notice elsewhere. Planted: the base's `step-where.tsx` lines 1572 and 1629 as they stood before UF-1 (`git show 3c9086dc0:src/features/posting/step-where.tsx`).
  - `scripts/conformance/door-words.test.ts` — DOORS-23 (new): planted, Save's family at 3c9086dc0 (its `listingNotAvailable` in `generic`).
  - `scripts/conformance/wired.test.ts` names CF-MOCK-1, FNC-4 and DOORS-23.
EXCEPTIONS: none.
FIVE LENSES — security: a refusal's detail travels as data, never as a sentence or HTML · performance: the reader stays on demand; a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number · failure modes: a code the accessor cannot read is a typed absence, never a default · consistency: one accessor for every screen that reads a code · future growth: a new route's 400 code joins the census and its class by its status.
FORWARD-SCAN: Stage 2's queue screens read refusals through the accessor. REGISTER: the route client's row and the failure reader's row, amended; the failure notice's row and the refusal families' row, amended (their guards).

THE SYSTEM (G0) — fix C: the harness's small debts
CONCERN: one body for each act of the harness; a fixture names code by what it is, not by its line; a GO's user cases cite the line that answers them; the list's document says how a link row is tested.
MECHANISM: the shared helpers under `e2e/helpers/` judged by `scripts/conformance/e2e-helpers.test.ts` (`COPIED_NAMES` at line 85, `copyFindings`); the provider-errors fixture `src/test/provider-errors.ts` judged by `src/test/provider-errors.test.ts`; the GO checker's laws `scripts/brief/go-laws.ts` (CF-BRIEF-25 at line 705) judged by `scripts/conformance/briefs.test.ts`.
CONSUMERS:
  - INC-1336: `isCardTwin` is defined eight times. COUNT: 8 := rg -o --no-filename -e 'function isCardTwin' -e 'const isCardTwin =' e2e | rg -c -e isCardTwin
    - `e2e/helpers/countries.ts` line 73, `e2e/helpers/admin-attributes.ts` line 14, `e2e/helpers/locations.ts` line 52, `e2e/admin-screening.spec.ts` line 89, `e2e/admin-guides.spec.ts` line 68, `e2e/admin-monetisation.spec.ts` line 56 — each at a boundary of 1024 px.
    - `e2e/helpers/categories.ts` line 58 at 928 px; `e2e/admin-listings.spec.ts` line 713 at 1280 px.
    - Each boundary is that table's own `cardUntil`; every caller keeps its boundary.
  - INC-1320: `src/test/provider-errors.ts` quotes `src/server` by file and line, so PEF-5 (`src/test/provider-errors.test.ts` line 66) reddens when the line moves (INC-1293's class, line-keyed).
  - S830: CF-BRIEF-25 judges STEP 1's premises item; the `user-cases` item's case bullets carry no SOURCE: or OPEN: yet.
  - DEC-498: `docs/features/user-facing-list.md` does not yet say how a link row is tested.
COVERED HERE:
  - One `isCardTwin` export, the boundary a parameter, every caller onto it with its own boundary. The names it replaces join `COPIED_NAMES`.
  - The provider-errors fixture names our own route's answer by its symbol or a marker, never by its line. PEF-6 (new) is planted on a moved line, and the existing PEF-5 is re-pointed.
  - CF-BRIEF-25 extends to the `user-cases` item: each case bullet carries `SOURCE:` (the file and line that produces its answer) or `OPEN:`. CF-BRIEF-27 (new) is its planted test.
  - DEC-498's sentence, word for word, enters `docs/features/user-facing-list.md` (RECORDS below).
CONFORMANCE GUARD: `scripts/conformance/e2e-helpers.test.ts` — CF-HELPERS-15 (new): no e2e file but the helper defines `isCardTwin`; planted, the base's `e2e/admin-guides.spec.ts` lines 67 to 70. PEF-6 in `src/test/provider-errors.test.ts`. CF-BRIEF-27 in `scripts/conformance/briefs.test.ts`. `scripts/conformance/wired.test.ts` names CF-HELPERS-15.
EXCEPTIONS: none.
FIVE LENSES — security: none · performance: none · failure modes: a boundary missing from a call is a type error, never a default · consistency: one twin rule for every table's test · future growth: a new table's test passes its own boundary.
FORWARD-SCAN: Cursor 8c-3's browser tests use the one twin export. REGISTER: a new row — "a table's card twin in tests" → the helper → CF-HELPERS-15 → exceptions: none.

SCOPE, by area (each source file's own tests included):
- Fix A: `src/components/forms/` (`use-form-gate.ts`, `field.tsx`, and their tests); `src/routes/` (`auth_.reset.tsx` and its tests in `auth-forms.test.tsx`); `src/features/admin/translations/` (`strings-page.tsx` and its tests, only if TR-14's cause is there); `e2e/admin-translations-data.spec.ts`; `e2e/admin-countries.spec.ts`.
- Fix B: `src/lib/` (`route-client.ts`, `reader-failure.ts`, `refusal.ts`, `door-family.ts`, the accessor's file (new, if one is born), and their tests); `src/components/marketplace/feed.tsx` with `src/components/marketplace/feed.test.tsx`; `src/features/feed/` (`use-feed.ts` and its tests); `src/features/admin/users/access-refusals.ts` with `src/features/admin/users/access-refusals.test.ts`; `src/features/ad-page/` (`ad-page-refusals.ts` and its tests); `src/features/posting/` (`posting-service.ts`, `step-where.tsx`, `map/map-pin-dropper.tsx`, and their tests); the eight test files INC-1313 names; the files FNC-4's census finds, for the drop-in only; `src/components/shell/failure-notice.census.test.ts`; `scripts/conformance/` (`route-client.test.ts`, `route-client-allowlist.txt`, `door-words.ts`, `door-words.test.ts`, `door-words-allowlist.txt`, `refusal-readers.ts`, `refusal-readers.test.ts`, `refusal-classes.txt` (read by `scripts/conformance/refusal-readers.test.ts`), `user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`), `wired.test.ts`).
- Fix C: `e2e/helpers/` (the twin's home, and `countries.ts`, `admin-attributes.ts`, `locations.ts`, `categories.ts`); `e2e/admin-screening.spec.ts`, `e2e/admin-guides.spec.ts`, `e2e/admin-monetisation.spec.ts`, `e2e/admin-listings.spec.ts`, and every other spec that imports `isCardTwin`; `scripts/conformance/e2e-helpers.test.ts` with `e2e-helpers-allowlist.txt`; `src/test/provider-errors.ts` with `src/test/provider-errors.test.ts`; `scripts/brief/` (`go-laws.ts`), with its tests in `scripts/conformance/briefs.test.ts`; `docs/governance/go-template.md` (the GO checker's template, read by `scripts/conformance/briefs.test.ts`), for the `user-cases` item's one sentence.
- `docs/features/` (`user-facing-list.md`, `e2e-harness.md`, `ci-guards.md`, `forms.md`); the records files.
- Never anything else under `src/`, nor the locale files, `supabase/`, `.github/`, `.claude/`, `CLAUDE.md`, `AGENTS.md`, package files.

THE TURN, IN THIS ORDER
STEP 0 — on the lane:
- Fetch, then `git switch -c cursor/bundle-8c-2b origin/dev` with origin/dev at `b355cbe00`. If dev has moved, say so in the report and build on the new dev, unless the move touches a file in SCOPE: that is a STOP.
- `git status --short` must be empty.
- Save this brief byte for byte as `docs/governance/briefs/cursor-bundle-8c-2b.md` (new; scripted copy, saved bare; sha256 equal to the carrier's). Write roadmap line 3 as rule 00 writes it.
- Remove from `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`) every line keyed to a brief other than this one.
- Run `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2b.md --root .` and paste its output into the report.
- Commit `cursor-bundle-8c-2b: task saved`; it is not pushed alone.
STEP 1 — THE CENSUS, run by the supervisor on b355cbe00. Check each fact a line names, and write what you find into the report's §2. A wrong premise is the turn's one STOP:
- CENSUS-ITEM consumers: covered — the consumer lists in THE SYSTEM A, B and C, by `rg -n "useFormGate|gate=\{gate\}" src`, `rg -n "routeFailure|readFailed|\.code\b" src --glob '!**/*.test.*'`, `rg -n "savePin|pinAnswer" src` and the two COUNT lines.
- CENSUS-ITEM definition: covered — fix B is defined by the answer, not by the files first named: every route that answers `clientError` at 400 with a body code (the routes under `src/routes/api/`), every screen that reads a failure's code, and every branch that draws a failure.
- CENSUS-ITEM tests:
  - Fix A: every test of `src/components/forms/` and `src/routes/auth-forms.test.tsx`, which keep their assertions byte for byte; the forms guard `scripts/conformance/forms.test.ts`; every test of the two spec files.
  - Fix B: `src/lib/route-client.test.ts`, `src/lib/reader-failure.test.ts`, `scripts/conformance/route-client.test.ts` (RCG-1 to 6), `scripts/conformance/refusal-readers.test.ts` (CFRR-1 to 12), `scripts/conformance/door-words.test.ts` (DOORS-1 to 22), FNC-1 to 3, the feed's, the pin sheet's and the place step's tests, and the eight files INC-1313 names.
  - Fix C: every spec that calls `isCardTwin`, PEF-1 to 5, and the GO checker's tests.
- CENSUS-ITEM lists: covered — `scripts/conformance/wired.test.ts` (the new laws' lines); `COPIED_NAMES` (`scripts/conformance/e2e-helpers.test.ts` line 85); `scripts/conformance/user-facing-allowlist.txt` (read by `scripts/conformance/user-facing.test.ts`); `scripts/conformance/refusal-classes.txt` (read by `scripts/conformance/refusal-readers.test.ts`); the guards' register `docs/features/ci-guards.md`.
- CENSUS-ITEM old-file-readers: covered — `refusalCode` moves from `src/features/ad-page/ad-page-refusals.ts` line 68 to `src/lib`; every importer follows (`rg -n "refusalCode" src e2e scripts`).
- CENSUS-ITEM second-readers: covered — the readers of a failure's message that the accessor replaces: `rg -n "message\.split|\.message\.startsWith|failureCode" src --glob '!**/*.test.*'`, each listed in §2 with what it reads.
- CENSUS-ITEM chunk-graph: covered — `src/lib/reader-failure.ts` stays on demand (`readerModule.load()` in `src/lib/route-client.ts`; the on-demand census `scripts/conformance/on-demand-failure.test.ts`); the accessor imports nothing that pulls the reader onto first paint (`dist/.chunk-modules.json` after the build).
- CENSUS-ITEM environments: covered — the gate runs in the browser and in SSR; the route client in the browser; the specs on CI's temporary backends and on ethio-staging.
- CENSUS-ITEM mechanisms: covered — the form gate and the Field (fix A); `@global-state` and the smoke lane's serial pass (fix A); `routeFailure`, `readFailed`, `classify`, `refusalStatus`, the typed families, `FailureNotice` (fix B); `copyFindings`, `COPIED_NAMES`, CF-BRIEF-25 (fix C).
- CENSUS-ITEM first-download: covered — a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number. The pages that carry the route client and the form gate are named in §2 from `scripts/route-budgets.mjs`.
- CENSUS-ITEM premises:
  - KAU-6, INC-1227 (INC-1199's class) — SOURCE: run 46100047891's Component tests evidence (`docs/tracking/guards-last-failure.md` on ci-evidence at that run) and `src/components/forms/field.tsx` line 81 (the report effect) with `src/components/forms/use-form-gate.ts`'s `tryGate`. RED-FIRST: KAU-13 against the base's gate.
  - TR-14, INC-1342 — SOURCE: run 46097467153, lane 12, as quoted in `docs/governance/reports/cursor-bundle-8c-2a.report.md` §11, and the flake ledger's TR-14 lines since 2026-11-17 (on ci-evidence). CONTROL: the cause named in §10 from the page's code and the test's order, before the fix; CI's repeat lane on the push repeats the spec.
  - CO-6, INC-1343 — SOURCE: run 46099916733, lane 14, and the door's clause at `supabase/migrations/20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql` line 233. CONTROL: the lane's co-scheduled files that create or remove a root category, named from that run's plan, before the fix.
  - INC-1340 — SOURCE: `src/components/marketplace/feed.tsx` line 161 and `src/lib/route-client.ts` lines 90 to 105. RED-FIRST: RCL-26 and the feed's clearing test against the base.
  - INC-1341 — SOURCE: `src/features/posting/posting-service.ts` lines 1225 and 1257. RED-FIRST: the pin sheet's refusal test against the base.
  - INC-1313 — SOURCE: `src/features/feed/use-feed.test.ts` line 18, and dev's run 46100047891 stderr: "No "routeFailure" export is defined on the "@/lib/route-client" mock". RED-FIRST: CF-MOCK-1 on the base text.
  - INC-1338 — SOURCE: `src/components/shell/failure-notice.census.test.ts` (FNC-2's whole-file judgement). RED-FIRST: FNC-4 on the base step-where branches.
  - INC-1339 — SOURCE: `src/features/ad-page/ad-page-refusals.ts` at 3c9086dc0 (its `listingNotAvailable` in `generic`). RED-FIRST: DOORS-23 on that text.
  - INC-1336 — SOURCE: the eight definitions listed in THE SYSTEM C. RED-FIRST: CF-HELPERS-15 on the base's `e2e/admin-guides.spec.ts`.
  - INC-1320 — SOURCE: `src/test/provider-errors.ts` and PEF-5. RED-FIRST: PEF-6 on a moved line.
  - S830 — SOURCE: `scripts/brief/go-laws.ts` line 705 (CF-BRIEF-25 reads the premises item only). RED-FIRST: CF-BRIEF-27 on a case bullet without SOURCE: or OPEN:.
- CENSUS-ITEM callee-codes: covered — every refusal code the pin door answers and what the sheet does with each (`set_listing_pin`, called at `src/features/posting/posting-service.ts` line 1266, its codes from its newest migration), listed in §2.
- CENSUS-ITEM whole-app-calls: covered — the form gate and the Field are used by every form: `rg -l "useFormGate" src` and `rg -l "<Field" src`, each form listed in §2 with what it passes; the gate's change is judged by every form's tests unchanged.
- CENSUS-ITEM findings: write what you find beyond the task, with file and line, in §13. A security hole is a STOP at once, described in the chat only.
- CENSUS-ITEM gate-reach: covered — the gate change reaches every form that holds a gate; a submit that the gate held open before by an unreported Field is now held closed until the Fields report. §2 lists each form and whether any of its submits could arrive before its Fields reported.
- CENSUS-ITEM user-cases: covered — the cases this turn changes, each with the line that answers it:
  - A saved place that no longer exists is cleared from the feed's filter. SOURCE: `src/components/marketplace/feed.tsx` line 163 (the clearing, which today never runs).
  - The feed's own 400 codes show no Retry. OPEN: the census of the feed route's codes decides which words they show.
  - A refused pin shows the posting family's words for its code. SOURCE: `src/features/posting/posting-service.ts` line 1257 (today a boolean).
  - The reset form refuses a blank pair per field before any length check. SOURCE: `src/routes/auth_.reset.tsx` line 117.
- CENSUS-ITEM queued: covered — `rg -n "8c-2b|INC-1313|INC-1320|INC-1336|INC-1338|INC-1339|INC-1340|INC-1341|INC-1342|INC-1343|S830|DEC-498"` across `docs/governance/briefs`, `docs/governance/reports`, `docs/features` and `roadmap.md`.
  - Built here: all of them but the moved and the waiting ones.
  - Left: INC-1328 and DEC-483 (Cursor 8c-3); INC-1325's removal (DEC-488's judge).
STEP 2 — PART A: KAU-6 (the cause proven; KAU-13 red-first; the fix), then TR-14, then CO-6, each at its cause, the two specs' assertions unchanged. Run each spec file whole and alone, both Chromium projects, 0 retries. Commit `cursor-bundle-8c-2b part A: the gate waits for its fields; two specs`.
STEP 3 — PART B: the accessor and the route's 400 class (RCL-26 red-first); the feed's clearing and no Retry (red-first); the pin sheet's refusal (red-first); the eight mocks and CF-MOCK-1; FNC-4 and every hit; DOORS-23; the two allowlist lines out of `scripts/conformance/user-facing-allowlist.txt` with tests that answer `uf:S1.10` and `uf:S7s6.11`. Commit `cursor-bundle-8c-2b part B: a refusal carries its code and class`.
STEP 4 — PART C: the twin export and its callers, CF-HELPERS-15; the fixture by symbol, PEF-5 re-pointed, PEF-6; CF-BRIEF-25 widened, CF-BRIEF-27, and the template's `user-cases` sentence. Commit `cursor-bundle-8c-2b part C: one twin rule; fixture by name; cases`.
STEP 5 — the docs lines: `docs/features/user-facing-list.md` (DEC-498's sentence); `docs/features/e2e-harness.md` (the twin export; CO-6 in the serial pass if so); `docs/features/ci-guards.md` (the new guards); the form gate's sentence in `docs/features/forms.md`. Commit.
STEP 6 — the checks:
- `bun run typecheck`; `bun run lint`; `bunx vitest run scripts --maxWorkers=2`; `bun run checks`.
- Each test file the turn changed, run alone (INC-1306).
- KAU-6 and KAU-13 run alone and with the whole `src/routes` folder at once, to show the fix holds under load.
- Browser runs (`bun run e2e:local`): `e2e/admin-translations-data.spec.ts` and `e2e/admin-countries.spec.ts` whole; every spec that calls `isCardTwin` whole; both Chromium projects, 0 retries.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2b.md --at <the commit STEP 0 began from>`, its output pasted.
- Then the self-review (rule 80), before the push.
STEP 7 — ONE push; `gh pr ready <number>`; `gh pr checks <number> --watch --interval 60`; green on the last code commit → the comment per rule 00.
STEP 8 — the report, written while CI runs:
- Rule 60's fourteen headings, with the census in §2.
- §3: each touched screen's answer before and after (the feed's gone place and its 400 codes; the pin sheet's refusal; the reset form's blank submit).
- §14 Records, word for word.
- Its push changes records only.

DECIDE-AND-NAME: how the gate stays closed until its Fields report; where the accessor lives in `src/lib` and its name; whether a route's 400 class is marked in `routeFailure` or read by `classify`; the twin export's home and signature; the fixture's marker. A mechanical edit a standing guard demands as a consequence of your own change is in scope wherever it falls, byte for byte, named under §10, unless the file is on SCOPE's never-list (then it is a STOP).

RECORDS (§14), word for word:
- "DEC-500 (the supervisor's, G17; it amends DEC-499) — Cursor 8c-2b carries three fixes: the red board first (KAU-6, TR-14, CO-6), a refusal or failure as the screen reads it (INC-1340, INC-1341, INC-1313, INC-1338, INC-1339), and the harness's small debts (INC-1336, INC-1320, S830's law, DEC-498 in the list's document). WebKit (INC-1328, DEC-483) moves to Cursor 8c-3, the lane of browser tests. Why: a Cursor lane carries at most three fixes, and the red board goes first (§8)."
- "DEC-498 (the supervisor's, G17) — a link is tested on its own screen. A row whose control is a plain link is answered by a component test that checks its role, its name (taken from the catalogue) and where it points; the test never follows the link. A row is Cursor's only when its proof needs the browser past the screen: a server write, a navigation done by code, a sign-in that ends, a download, or a return to the page you came from." (this text also enters `docs/features/user-facing-list.md`)
- INC-1227 (KAU-6's instance), INC-1342, INC-1343, INC-1340, INC-1341, INC-1313, INC-1338, INC-1339, INC-1336, INC-1320: fixed (what was built), each with its cause as found; S830's law landed as CF-BRIEF-27.
- The register rows named in THE SYSTEM blocks; one changelog line.

TOLERANCES (G60), by defect:
- A red whose failure or server log names a path this lane changed is a STOP; any other is named under §11 and CI judges.
- A local failure is fixed at its cause, never retried or loosened; no dial and no timeout is raised; no `retries` is added to a test.
- A test outside fix B's census whose assertion would have to change is a STOP.
- A form whose behaviour changes beyond "a submit before its Fields reported is held" is a STOP.
- A hypothesis refuted by what you read is not a STOP: the cause you find decides, named under §10.

FINDINGS (G64): anything major beyond this task goes in §13 with file and line; a security hole is a STOP at once, described in the chat only.

LIMITS TO STATE: WebKit, the repeat lane's real time and the merged tree are CI's and the supervisor's.
