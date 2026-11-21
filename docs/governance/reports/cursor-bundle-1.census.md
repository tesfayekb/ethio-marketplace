# cursor-bundle-1 — the census (STEP 1)

Brief: `docs/governance/briefs/cursor-bundle-1.md` (sha256 513ffcc4bbc1beb701eacd5e3b98b5d100527ce4dd413e3314cd8fa0118d73d2,
equal to the value the operator's message states; the brief names "the value after END BRIEF", and the
file holds no END BRIEF line — the chat's value is the one compared). Package file:
`docs/governance/briefs/cursor-bundle-1-guide.json` (sha256
8da556b18357d21ed54d844cb279dd78799731b696915bda0df8647ec8304e79, equal; each of its four values'
own sha256 checked by script: all four equal).

Base `358c691ab` = `origin/dev` at the census's read (`git rev-parse --short=9 origin/dev`:
358c691ab): no file moved under the anchors. Branch `cursor/bundle-1`, one commit
`88551ad76 cursor-bundle-1: the task saved` (not pushed alone).

CI for the base (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `358c691ab112446f68b804c5f02848beda36dff0` (short `358c691`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T12:43:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44904897718
```

`e2e-last-failure.md` and `guards-last-failure.md` name the same run and commit;
`local-backend-proof.md` names an older commit (`8df5d28db`, run 44756753510): it is non-gating and
was not republished for the base. No red to fix first.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-1.md`:

```
[check-go] no finding
```

How the census was read. Every number below comes from a command run in this chat. The first
downloads are from a lock-exact local build of the base (`bun run build`, then the bundle check's own
closure helpers `readRouteManifest`, `routePreloads` and `staticClosure` over `dist/client/assets`,
gzipped as the check gzips). Two trial builds measure item 3's and item 2's moves. Their edits were
temporary, uncommitted, and written back from `git show HEAD:<path>` afterwards; the one new trial
file was deleted, and `git status --short` was empty after the restore. Scratch copies (the
operator's to remove): `/tmp/ethio-scratch/cursor-bundle-1/` (base, trial A and trial B page
tables and chunk records, the item-6 policy census script and its output, the item-7 reproduction
spec and its three logs).

Limits stated before anything changes: no Supabase MCP server is configured in this Cursor, so
no live body or live grant was read (item 5's pre-check compares md5s at apply time; item 6's grants
come from the migrations here and from the live catalogue in the plan). The E2E values are set
(`E2E_SUPABASE_URL`, `E2E_SUPABASE_PUBLISHABLE_KEY` and `E2E_SUPABASE_SERVICE_ROLE_KEY`, tested by
name only); item 7's reproduction ran on ethio-staging through `bun run e2e:local`.

---

## Item 1 — INC-1232, INC-1231, INC-1233 (the serial line's readers; two guard readers)

- **consumers** — every reader of the repeat lane's report file `local-backend-repeat.txt`, by its
  line prefixes (`- Repeat: `, `- Repeat in WebKit`, `- Repeat serially`, `- Not repeated`), across
  `scripts/`, `.github/` and `e2e/`:
  - `.github/workflows/local-backend-proof.yml`
    - Writers: :251, :253, :313, :319, :323, :324, :325 (`- Repeat serially (DEC-415): …`) and
      :830 (the serial cap line).
    - :845 and :870 hand the file to `repeat-cap.ts`.
    - :1001-1003 append the whole file to the repeat lane's fragment.
    - :1061 uploads it.
    - :1222 is the published summary's filter. It keeps only the prefixes `('- Repeat: ', '- Repeat
      in WebKit', '- Not repeated')`, so it BYPASSES the serial line: `- Repeat serially` is dropped
      from `local-backend-proof.md` (INC-1232 confirmed).
  - `scripts/ci/repeat-cap.ts`: :156-157 `SERIAL_CAP_LINE` (one line for the whole serial pass);
    :179 appends it; :203 appends one `- Not repeated (time cap): <title>` line per capped test run.
  - `scripts/e2e-failure-report.ts`
    - :1582 `REPEAT_SELECTION_FILE` and :1584 `TIME_CAP_LINE = "- Not repeated (time cap): "`.
    - :1602 reads the last `- Repeat: ` line.
    - :1609 counts every line opening with `TIME_CAP_LINE`. `SERIAL_CAP_LINE` opens with the same
      words, so the serial pass's cap is counted as ONE "test run" (INC-1232's second half confirmed).
    - :3144-3220 hold the self-test's checks of these lines (INC-1107), and :3353 reads the file from
      the lane's logs.
  - `.github/workflows/flake-check.yml` :185 writes its own `- Repeat: …` line to a different file
    (the flake check's summary), not this file. It is not a reader.
  - `e2e/`: no reader.
  - `scripts/fixtures/local-backend-repeat.43144538685.txt` is a captured file (J-law fixture) with no
    serial line, read by the self-test.
  - INC-1231: `scripts/conformance/shared-values.ts` :126 `STATEMENT_TRIGGER`; :134 `triggerFindings`
    blanks comments at :145 with its own pattern `text.replace(/--[^\n]*/g, …)` (BYPASSES the
    migration reader, register row 125). It is called by CF-LANES-4 (`scripts/conformance/lanes.test.ts`
    :496).
  - INC-1233: `scripts/conformance/shared-values.ts` :106 `` fail(`a reader is not <file>::<test id> (${entry.trim()})`) ``.
- **definition** — as read above; the migration reader's `sqlCodeOf` is at
  `scripts/conformance/migration-reader.ts` :52 (comments blanked, positions kept, string literals
  kept: a `--` inside a quoted literal survives as code).
- **tests**
  - `scripts/ci/lane-failure-evidence.test.ts` (LFE-1..3; its `heredoc(step)` helper runs a step's
    Python with `python3 -c`).
  - `scripts/e2e-failure-report.test.ts` (EFR-1..4; EFR-1 runs the reporter's `SELF_TEST`).
  - `scripts/ci/repeat-cap.test.ts`.
  - `scripts/conformance/lanes.test.ts` (CF-LANES-1..5; the planted triggers' exact list at :613-631).
  - Next free ids: LFE-4, EFR-5, CF-LANES-6.
  - Planted cases: a summary built from a repeat file holding the serial line; a selection with one
    `SERIAL_CAP_LINE` and two per-test cap lines; a migration holding `'--'` inside a literal ahead
    of a statement-level trigger.
- **lists** — CF-LANES-4's planted exact list (`lanes.test.ts` :613-631) gains the planted literal
  case. `scripts/conformance/wired.test.ts`: no new guard, so no new caller line. No allowlist, usage
  map, strings layer, doors manifest or register row changes.
- **old-file-readers** — not applicable: nothing moves.
- **second-readers** — none: no `import()`, `loadOnce` or `vi.mock` of `shared-values.ts`,
  `e2e-failure-report.ts` or `repeat-cap.ts` (grep).
- **chunk-graph** — not applicable: no client module changes.
- **environments**
  - `local-backend-proof.yml` runs on GitHub's ubuntu runners: the repeat lane writes the file, and the
    `summary` job (:1084) writes `local-backend-proof.md` (:1222).
  - `scripts/e2e-failure-report.ts` runs in `ci.yml` :715 (SELF_TEST), :721 and :729, in
    `local-backend-proof.yml` :1148, and in `flake-check.yml` :147.
  - `shared-values.ts` runs in the laws (`bunx vitest run scripts`) locally and in CI's guard job.
- **mechanisms** — the migration reader (register row 125), read whole: `sqlCodeOf`,
  `functionCodeOf`, `doBlocksOf`, `lastDeclarations`. The INC-1107 self-test checks in the reporter.
- **first-download** — not applicable (no client code).
- **premises** — all three confirmed in the tree as the brief words them.
- **callee-codes** — not applicable (no door, no provider).
- **cell-meaning** — not applicable: no door in scope.
- **findings** — none beyond the item.

## Item 2 — the form kit, wave 2, its last lines (INC-1147 class 1)

- **consumers**
  - `scripts/conformance/forms-allowlist.txt`, its three lines at the base:
    - `CF-FORM-1 src/features/auth/mfa/step-up-dialog.tsx (1) | wave 2 — … | DEC-339`
    - `CF-FORM-3 src/features/auth/auth-error-key.ts (1) | … | DEC-339`
    - `CF-FORM-3 src/features/auth/mfa/mfa-service.ts (2) | wave 2 — the two-factor service's own mappers (INC-1147 class 1) | INC-1147`
  - The auth mapper `toErrorKey` (`src/features/auth/auth-error-key.ts` :35):
    - Called by `src/features/auth/auth-result.ts` :20 (`failure`) and by `auth-service.ts` at its
      direct calls :276 and :571.
    - `failure` is called by `auth-service.ts` (12 call sites) and by `src/features/auth/sign-out.ts`
      :30.
    - It BYPASSES the reader (its own words table).
  - The two-factor mappers, `src/features/auth/mfa/mfa-service.ts`:
    - `invalidCode` and `failure` (:98-108) read only the message's words (`invalid`, `expired`,
      `code`) and drop the provider's `code`. They are called by `enrollTotp`, `verifyFactor` (twice)
      and `unenrollFactor`.
    - `stepUpAbortKey` (:139) reads `instanceof StepUpCancelled / StepUpUnavailable`. It has about 20
      callers across the admin features (unchanged by the plan: the function keeps its name and
      answer).
    - Both BYPASS the reader.
  - `src/features/auth/mfa/step-up-dialog.tsx`:
    - :90-96 is a bare `<label htmlFor="step-up-code">` plus `Input id="step-up-code"`.
    - :104-106 is its own `<p role="alert" data-testid="step-up-error">`.
    - It BYPASSES `Field`.
    - Its `errorKey` comes from `use-step-up.ts` (`submitCode` :132-155: `stepUpWithCode` →
      `verifyFactor` → `failure`), drawn through `step-up-gate.tsx`.
- **definition** — the one reader `src/lib/refusal.ts`:
  - `Refusal` :38 and `RefusalFamily` :41.
  - Dialect 7, "an auth provider's own error `code`, by the family's words" (:30, :255-257, `hear`
    :171 reads `code` as `provider` at :201).
  - The step-up branch: `StepUpCancelled` → silent and `StepUpUnavailable` →
    `mfa.stepUpUnavailableHint` (:235-236).
  - The Field: `src/components/forms/field.tsx`, which takes `refusal: Refusal | null` and `family`,
    reads them by `readRefusal` / `refusalText`, and draws the line with `refusalTestId` and
    `role="alert"`.
- **tests**
  - `src/features/auth/auth-error-key.test.ts` (unnamed `it`s (i)–(vii) plus the INC-822 block).
  - `src/features/auth/mfa/step-up-gate.test.tsx` and `step-up-gate-offline.test.tsx`.
  - `src/features/auth/auth-client.test.ts` (:55 holds the service's answer per export, an exact
    map; :210-213 `completeEmailVerification`).
  - `scripts/conformance/forms.test.ts` (CF-FORM-1..5, 5b).
  - e2e: `e2e/mfa-stepup.spec.ts` MF-1..MF-8 (MF-2 reads `step-up-code` and `step-up-error`).
  - `mfa-service.ts` has NO unit test file. The plan adds `src/features/auth/mfa/mfa-service.test.ts`
    (next free id family proposed: MSV-1..; MSV is free across `src`, `e2e` and `scripts`).
  - Next free ids: CF-FORM-6, MF-9.
- **lists**
  - `forms-allowlist.txt` ends empty. CF-FORM's test asserts the allowlist holds no line (the brief's
    COVERED).
  - `scripts/route-budgets.mjs` `SHARED_SHELL_MODULES` :145-147 names `auth-error-key.ts`. The
    bundle check's module census (`scripts/bundle-closure.mjs` `moduleCensus`) fails on a listed
    module that leaves the group, so the line leaves with the move (a mechanical consequence).
  - `scripts/conformance/vendor-seams-allowlist.txt` (:26 `auth-service.ts`, :50 `sign-out.ts`): a new
    module holding a `supabase.auth.*` call needs its own line (only under option B below).
  - `scripts/conformance/auth-answers.test.ts` reads `auth-service.ts`'s exports (:20). A function
    moved out of it leaves that guard's reach unless the guard reads the new module too (option B).
  - Usage maps: new `mfa.*` keys → `bun run i18n:usage`.
  - Strings layer: the `mfa.*` keys live in `en-member.ts` / `am-member.ts` (:165-187).
- **old-file-readers**
  - `SHARED_SHELL_MODULES`' line for `auth-error-key.ts` (above).
  - `docs/features/forms.md` (wave 2's lines).
  - The e2e testids `step-up-code` and `step-up-error` stay: `Field`'s `refusalTestId` carries
    `step-up-error`, and the control keeps `data-testid="step-up-code"`.
- **second-readers**
  - `use-auth.ts` :10 imports `./sign-out` as a namespace (static).
  - `auth-service.ts` is reached by `src/routes/auth_.callback.tsx` :7 (static) and by the auth
    screens.
  - `mfa-service.ts` is mocked by `vi.mock` in the step-up gate tests and in the three import-dialog
    tests named in the earlier census note (country, location, attributes). Their mock factories
    return `stepUpAbortKey` and `isStepUpFresh`. The plan keeps both names and their answers, so the
    mocks stay valid.
  - No `loadOnce` of these modules.
- **chunk-graph** (measured; full tables in the scratch folder):
  - `auth-error-key.ts` and `auth-result.ts` sit in `shared-shell-*.js` (every page);
    `sign-out.ts` sits in the entry.
  - `refusal.ts` with `relative-time.ts` is `refusal-CoBT2p5E.js` (1395 B gzipped at -9). At the base
    it rides 36 of the 50 pages' first downloads. The 14 that do not carry it: `/account`,
    `/account_/legal`, `/account_/legal_/$versionId`, `/admin`, `/admin/`, `/admin/audit`,
    `/admin/images`, `/admin/impersonation_/$sessionId`, `/admin/locations`, `/auth_/callback`,
    `/dev/tall`, `/legal/$kind`, `/legal/publishing`, `/privacy`, `/terms`.
  - If the auth mapper read through `readRefusal` where it stands (in the shared shell), the reader
    and `DOOR_CODES` (which the reader imports) would join every page's first download. That
    contradicts item 3's COVERED.
  - THE SHELL DOES NOT NEED THE MAPPER: the shell's only caller, `app-shell.tsx` :709-710, reads
    `answer.ok` from `signOut()` and never its `errorKey` (DEC-268's reload). Trial B measured the
    shape where `failure` moves beside the mapper, `sign-out.ts` answers its failure without it, and
    `auth-error-key.ts` leaves the shared shell (item 3's numbers below).
- **environments** — client only (the auth folder is browser code; `auth-error-key.ts` is not
  imported by the server bundles: grep).
- **mechanisms** — the Field (register row 160, `field.tsx` read whole) and the one reader
  (`refusal.ts`, read whole). `use-form-gate.ts`: the step-up dialog has one control and no gate
  today (`gate` stays absent; the code is required, so `blank` is reported if the gate is used —
  see the plan).
- **first-download** — see chunk-graph and item 3.
- **premises**
  - CORRECTED: `toErrorKey` is not only an auth-screen concern. It rides every page through
    `auth-result.ts` and `sign-out.ts` (the shared shell), so moving it onto the reader is also a
    first-download change.
  - CORRECTED: `settings.tsx` (outside this brief's scope) draws `use-mfa`'s `errorKey` beside its
    fields (:629-631). The two-factor outcome keeps its `errorKey` for it.
- **callee-codes** — every refusal the two-factor service's callees can answer. They are the codes
  auth-js 2.110.9 lists (`node_modules/@supabase/auth-js/dist/module/lib/error-codes.d.ts`) that the
  callees `mfa.enroll`, `mfa.challenge`, `mfa.verify`, `mfa.unenroll` and `mfa.listFactors` reach.
  What the screen draws today comes from the words test at :98-101, because the code is dropped:
  `mfa.errorInvalidCode` when the provider's message holds "invalid", "expired" or "code", otherwise
  `mfa.errorGeneric`. GoTrue's message texts are not in the repository, so the drawn key per code is
  the words test's answer on the message, which the tree cannot pin:
  - `mfa_verification_failed` (verify: wrong code) — today by words, most likely
    `mfa.errorInvalidCode`.
  - `mfa_challenge_expired` (verify) — by words.
  - `mfa_factor_name_conflict` (enroll under the one fixed name while a pending setup stands:
    INC-1147's case) — `mfa.errorGeneric` (the operator's walk read the generic line).
  - `too_many_enrolled_mfa_factors`, `mfa_verified_factor_exists` (enroll) — by words.
  - `mfa_totp_enroll_not_enabled`, `mfa_totp_verify_not_enabled` (the method switched off) — by words.
  - `insufficient_aal` (unenroll a verified factor below aal2; the screen re-verifies first, MF-5) —
    by words.
  - `mfa_factor_not_found`, `mfa_ip_address_mismatch` — by words.
  - `over_request_rate_limit` (429) — by words.
  - `session_not_found`, `session_expired`, `bad_jwt` — by words.
  - `request_timeout`, `unexpected_failure` — by words.
  - `listFactors` failing → `mfa.errorGeneric` (:206). No factor → `mfa.errorNoFactor` (:241).
- **cell-meaning** — not applicable: no door in scope.
- **findings** — see the stop report's findings.

## Item 3 — INC-1153, INC-1229 (the code list off the entry; one instant reader)

- **consumers**
  - Every importer of `src/lib/door-codes.ts`:
    - `src/lib/refusal.ts` :2 (`DOOR_REFUSED_KEY`, `doorCode`)
    - `src/lib/door-codes.test.ts` :3
    - `src/lib/door-error.ts` :1 (`DOOR_CODES`; server)
    - `src/server/imports/csv.ts` :1 (`doorCode`; server)
    - `src/components/shell/impersonation-notice.tsx` :6 (`DOOR_REFUSED_KEY` only; THE one entry
      importer)
    - `src/features/auth/auth-service.ts` :5
    - `src/features/my-listings/promote-service.ts` :2
    - `src/features/admin-listings/listings-page.tsx` :8
    - `src/features/admin-listings/listing-page.tsx` :55
  - "The gate's words" read as the five gate codes at the list's head (`door-codes.ts` :25-30:
    `notSignedIn`, `accountDeactivated`, `permissionDenied`, `stepUpRequired`, `rateLimited`;
    INC-1153's record names "the gate words" beside the list). Every drawer of a gate word by its
    code literal:
    - `src/lib/refusal.ts` :176
    - `src/lib/reader-failure.ts` :49-68 (its own three sets of gate codes; see findings)
    - `src/lib/refusal-tail.ts` :46
    - `src/features/auth/session-end.ts` :32-38
    - `src/components/app-shell.tsx` :878
    - the posting family (`refusal-text.ts` :189-229, `posting-service.ts` :1151-1156,
      `step-where.tsx` :2137-2245, `use-draft.ts` :425, `listing-detail.tsx` :796, :1523)
    - the ad page family (`ad-page-refusals.ts` :58-127, `save.ts` :13, `report.ts` :34,
      `contact.ts` :35, `report-ad-dialog.tsx` :74, `l.$slug.tsx` :146-169)
    - `admin-screening/use-screening.ts` :362-422 and `screening-page.tsx` :331
    - `admin-listings/listings-page.tsx` :317
    - `admin-locations/location-import-dialog.tsx` :35 and `admin-countries/country-import-dialog.tsx`
      :23
    - server routes (`src/server/route.ts`, `src/server/imports/route.ts`, `src/routes/api/**`), which
      are server code, not the entry.
  - The words drawn for a refusal with no words of its own: `door.refused` (`en-base.ts` :757,
    `am-base.ts` :698), drawn on every page by the shell's impersonation notice (`:79`), so it stays
    in the base layer.
  - `doorKeyText` (`src/lib/refusal-tail.ts` :41): its only callers are `refusal-tail.test.ts`
    :54-75, plus a mention in `docs/features/forms.md` :49-50 ("since F1-4a no screen calls
    `doorKeyText`").
  - `rateUntilOf`, two readers:
    - `src/features/ad-page/ad-page-refusals.ts` :98 (reads a string, `message` or `reason`). Callers:
      `save.ts` :27, `report.ts` :34, `contact.ts` :35; test `ad-page-refusals.test.ts` :115-121.
    - `src/features/posting/refusal-text.ts` :197 (`Refusal | string | undefined`, falls back to
      `detail`). Callers: `step-photos.tsx` :166, `posting-service.ts` :854 and :1269,
      `refusal-text.ts` :230; test `refusal-text.test.ts` :74-84 (with `expectTypeOf` :84).
- **definition** — `door-codes.ts` :24-53 `DOOR_CODES`, :59 `DOOR_REFUSED_KEY`, `doorCode` below.
  `refusal-tail.ts` :41 `doorKeyText`.
- **tests**
  - `src/lib/door-codes.test.ts`, `src/lib/refusal.test.ts`, `src/lib/refusal-tail.test.ts`,
    `src/features/ad-page/ad-page-refusals.test.ts`, `src/features/posting/refusal-text.test.ts`.
  - The bundle check (`scripts/check-bundle-size.mjs` with `scripts/bundle-closure.mjs`):
    `ENTRY_CLOSURE` (`route-budgets.mjs` :254) — no chunk joins or leaves the entry's closure in
    either trial.
  - Next free ids: DC-5 (door-codes), RTW-22 (the instant).
- **lists** — `ENTRY_CLOSURE` unchanged (trial B); `SHARED_SHELL_MODULES` (item 2's line);
  `scripts/route-budgets.mjs` ceilings (every page falls except `/auth_/callback` under option A,
  below).
- **old-file-readers**
  - The four family files that cite "`src/lib/door-codes.ts` does not grow (INC-1153)" stay true
    (each family keeps its words in its own file): `ad-page-refusals.ts` :8,
    `monetisation-refusals.ts` :63-64, `listing-refusals.ts` :11-13, `ai-refusals.ts` :14.
  - `docs/features/forms.md` :49-50 (`doorKeyText`).
  - No guard reads `door-codes.ts` by path (grep of `scripts/`).
- **second-readers** — no dynamic `import()`, `loadOnce` or `vi.mock` of `door-codes.ts`,
  `refusal-tail.ts`, `ad-page-refusals.ts` or `refusal-text.ts` (grep); `refusal.ts` is imported
  statically everywhere.
- **chunk-graph** — measured (base, then two trials; KiB gzipped, as the check measures):
  - Base: `door-codes.ts` is in the entry `index-CAIvulkG.js` because `impersonation-notice.tsx`
    (in the entry) imports `DOOR_REFUSED_KEY` from it. The entry's closure: JS 201.8 / 203 KiB.
  - Trial A (item 3 alone): `DOOR_REFUSED_KEY` in a one-line leaf
    (`src/lib/door-refused-key.ts`, re-exported by `door-codes.ts`), with the notice importing the
    leaf.
    - `door-codes.ts` becomes a chunk of its own, `door-codes-*.js` (564 B gzipped), downloaded beside
      the reader.
    - The entry falls 0.35 KiB, and the 14 pages without the reader fall 0.33–0.37.
    - The 36 pages that carry the reader GROW 0.17–0.29 KiB: chunk overhead, and the list leaves
      the entry's compression context. Eight pages are then left inside their 0.3 KiB band:
      - `/admin/attributes` (room 0.30)
      - `/admin/listings_/$listingId` (0.32)
      - `/admin/roles_/$roleId` (0.33)
      - `/admin/screening` (0.28)
      - `/dev/primitives` (0.29)
      - `/admin/places` (0.38)
      - `/admin/legal` (0.39)
      - `/settings` (0.41)
    - THE CUT's condition is met for item 3 alone: its move reaches a chunk of its own on 36 pages'
      first download.
  - Trial B (item 3 with item 2's move: `failure` beside the mapper in `auth-error-key.ts`, the
    mapper reading `readRefusal`, `sign-out.ts` answering without it, `auth-error-key.ts` off
    `SHARED_SHELL_MODULES`):
    - `door-codes.ts` JOINS the reader's chunk (`refusal-*.js`: `door-codes.ts`, `refusal.ts`,
      `relative-time.ts`; 1737 B gzipped at -6), and `auth-error-key.ts` joins `auth-service-*.js`.
    - The entry's closure: JS 201.0 / 203 KiB (from 201.8).
    - Every page falls 0.06–0.83 KiB except `/auth_/callback`: 205.36 → 207.31 KiB (+1.95, over its
      ceiling of 206).
    - `/auth_/callback` imports only `completeEmailVerification` from `auth-service.ts`
      (`src/routes/auth_.callback.tsx` :7) and draws none of the mapper's words (its screen draws
      `auth.checking`, `auth.confirmed*`, `auth.noSession*`, :88-127), so carrying the reader there
      is code it never draws.
  - Per page, base → trial B (KiB, ceiling):

    | page | base | trial B | ceiling |
    | --- | --- | --- | --- |
    | `/` | 222.94 | 222.46 | 224 |
    | `/$name` | 220.98 | 220.51 | 222 |
    | `/account` | 264.19 | 263.38 | 265 |
    | `/account_/legal` | 204.41 | 203.59 | 205 |
    | `/account_/legal_/$versionId` | 205.09 | 204.26 | 206 |
    | `/account_/saved` | 221.86 | 221.39 | 223 |
    | `/admin` | 206.23 | 205.41 | 207 |
    | `/admin/` | 207.04 | 206.22 | 208 |
    | `/admin/ai` | 300.76 | 300.31 | 302 |
    | `/admin/attributes` | 315.46 | 315.01 | 316 |
    | `/admin/audit` | 291.60 | 290.79 | 293 |
    | `/admin/categories` | 345.21 | 344.78 | 346 |
    | `/admin/countries` | 304.81 | 304.35 | 306 |
    | `/admin/images` | 206.87 | 206.05 | 208 |
    | `/admin/impersonation_/$sessionId` | 289.54 | 288.73 | 290 |
    | `/admin/legal` | 282.39 | 281.92 | 283 |
    | `/admin/legal_/$versionId` | 279.07 | 278.59 | 280 |
    | `/admin/legal_/edit` | 281.81 | 281.34 | 283 |
    | `/admin/listings` | 326.59 | 326.14 | 328 |
    | `/admin/listings_/$listingId` | 327.42 | 327.01 | 328 |
    | `/admin/listings_/$listingId_/edit` | 408.68 | 408.26 | 410 |
    | `/admin/locations` | 267.42 | 266.59 | 268 |
    | `/admin/monetisation` | 311.70 | 311.25 | 313 |
    | `/admin/places` | 305.39 | 304.93 | 306 |
    | `/admin/roles` | 293.28 | 292.82 | 294 |
    | `/admin/roles_/$roleId` | 273.46 | 273.00 | 274 |
    | `/admin/screening` | 343.47 | 343.03 | 344 |
    | `/admin/translations` | 304.62 | 304.17 | 306 |
    | `/admin/translations_/$lang` | 306.25 | 305.79 | 307 |
    | `/admin/users` | 289.93 | 289.47 | 291 |
    | `/admin/users_/$userId` | 289.97 | 289.51 | 291 |
    | `/auth` | 219.25 | 219.17 | 220 |
    | `/auth_/callback` | 205.36 | 207.31 | 206 |
    | `/auth_/reset` | 212.35 | 212.27 | 213 |
    | `/c/$slug` | 222.94 | 222.46 | 224 |
    | `/dev/primitives` | 226.49 | 226.03 | 227 |
    | `/dev/style` | 245.33 | 244.87 | 246 |
    | `/dev/tall` | 202.16 | 201.33 | 203 |
    | `/l/$slug` | 248.87 | 248.43 | 250 |
    | `/legal/$kind` | 206.55 | 205.73 | 207 |
    | `/legal/accept` | 213.75 | 213.28 | 215 |
    | `/legal/publishing` | 207.61 | 206.80 | 209 |
    | `/my-listings` | 309.32 | 308.87 | 310 |
    | `/my-listings_/$listingId` | 319.87 | 319.43 | 321 |
    | `/my-listings_/$listingId_/edit` | 400.80 | 400.38 | 402 |
    | `/post` | 400.78 | 400.36 | 402 |
    | `/post_/$listingId` | 400.75 | 400.32 | 402 |
    | `/privacy` | 206.54 | 205.73 | 207 |
    | `/settings` | 276.37 | 276.31 | 277 |
    | `/terms` | 206.54 | 205.72 | 207 |

    (The bundle check prints these one decimal lower: it subtracts `judgedSize(0)`; e.g. its own
    line for `/auth_/callback` in trial B read `207.3 / 206 KiB`.)
- **environments**
  - `door-codes.ts` is also imported by server code (`door-error.ts`, `server/imports/csv.ts`), so it
    is in the ssr and nitro bundles too.
  - The move (a leaf re-exported by `door-codes.ts`) changes no export name, so the server imports
    read the same values.
  - The client group rule (`vite.config.ts`, DEC-362) is `environments.client` only.
- **mechanisms**
  - The reader (`refusal.ts`), `refusal-split.ts` (in the shared shell), `door-codes.ts` and DEC-362's
    group (`SHARED_SHELL_MODULES`), all read.
  - `src/lib/load-once.ts` is not needed: nothing becomes on-demand that was static.
- **first-download** — as chunk-graph. Under the plan's option B (below), `/auth_/callback` stops
  carrying `auth-service.ts` and falls too; that number is measured at the build step.
- **premises**
  - CORRECTED: "the list leaves the entry" cannot be done by item 3 alone without growing 36 pages.
    With item 2's move it joins the reader's chunk and every page but one falls.
  - CONFIRMED: `doorKeyText` has no production caller.
- **callee-codes** — not applicable (no door changes).
- **cell-meaning** — not applicable.
- **findings** — `src/lib/reader-failure.ts` :49-68 holds a second copy of the gate codes (with
  other codes) for its own classing. It is a K2 sibling and is reported, not touched.

## Item 4 — ACT-029 (the level block's Guide)

- **consumers**
  - `src/features/admin-monetisation/products-section.tsx` :328
    `prefix: isLevel ? "admin.monetisation.level" : "admin.monetisation.reach"` (the one composer of
    the key).
  - `src/i18n/locales/en-guide.ts` :33-61 and `am-guide.ts` :24-49 hold 20 keys each under
    `admin.monetisation.level.guide.`: `what`, `col.name`, `col.price`, `col.key`, `col.days`,
    `col.photos`, `col.placement`, `col.badge`, `col.cities`, `col.regions`, `col.countries`,
    `col.enabled`, `col.selfServe`, `col.extends`, `col.sort`, `col.createdBy`, `col.updatedBy`,
    `col.updated`, `how`, `next`.
- **definition** — as above. The package's keys are `admin.monetisation.levels.guide.what` and
  `…levels.guide.how` (both languages), and each value's sha256 matches.
- **tests**
  - `scripts/conformance/admin-guides.test.ts` :330, the exact sorted list of guide prefixes. The new
    prefix sorts after `admin.monetisation.levelOverrides`.
  - `e2e/admin-guides.spec.ts` (AG-1..7) reads guides by their drawing, not by this prefix (grep).
  - `src/i18n/am-script.test.ts` covers the Amharic values.
- **lists**
  - `admin-guides.test.ts` :330.
  - The usage maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) do not name the
    composed guide keys (grep: no hit), so `bun run i18n:usage` runs and its maps are committed as
    produced.
  - The strings layer: the guide files are their own layer (`en-guide.ts` / `am-guide.ts`).
- **old-file-readers**
  - `products-section.tsx` :328 and `admin-guides.test.ts` :330.
  - The older briefs and reports that cite the prefix are records, not changed:
    `docs/governance/briefs/p2-level-reach-plan.md`, `p2-fold-c2b-strings-2.json`,
    `docs/governance/reports/p2-fold-c2b.report.md`, `p1c-admin-guide.report.md`,
    `p2-fold-c2b.stop-2.md`.
  - `product-editor.tsx` :169 `admin.monetisation.level.edit` is not a guide key and stays.
- **second-readers** — none (no dynamic import of the guide files beyond the guide layer's own loader,
  which loads by file, not by key).
- **chunk-graph** — not applicable: the guide layer loads on demand and the key count is unchanged
  (20 retire, 20 arrive).
- **environments** — client (the guide layer).
- **mechanisms**
  - The admin guide mechanism (`admin-guides.test.ts`, the guide layer).
  - "A renamed string is a NEW key": the 18 moved keys are new keys with byte-identical values, and
    the two new sentences are copied from the package.
  - The database's `ui_translations` rows for the old keys (if any) are runtime truth and are not
    written by this lane.
- **first-download** — not applicable.
- **premises** — confirmed. `admin.monetisation.levels.title` already exists (a non-guide key under
  the new prefix's stem); there is no collision with `.guide.*`.
- **callee-codes** — not applicable.
- **cell-meaning** — not applicable.
- **findings** — none.

## Item 5 — INC-1187 (the feed enqueuers hold their listing)

- **consumers** — the three functions' callers are triggers in `20261009052418`, `20261105080106`,
  `20261108070501`, `20261115203200` and `20261104153313` (grep of their names).
- **definition** — the last declarations, md5 of the body (prosrc, CR-stripped) as the tree holds
  it:
  - `feed_reindex_enqueue_listings(uuid[])`: `20261104153313_f5c8063d-…`, md5
    28b6ccb09d0736cf826f3274fe6ba8b9 (365 bytes).
  - `feed_reindex_enqueue_categories(uuid[])`: `20261015023155_3600a562-…` :162, md5
    55d421a866e45ac0066ec541631b9ae0 (600 bytes).
  - `feed_reindex_enqueue_places(uuid[])`: the same file :193, md5 6c3e807ef39e8dbf290fe768127ab49f
    (779 bytes).
  - All three are `plpgsql`, `VOLATILE SECURITY DEFINER`, `SET search_path TO 'public'`, `$fn$`.
  - Their grants: `REVOKE ALL … FROM PUBLIC, anon, authenticated; GRANT EXECUTE … TO service_role`.
  - Each is one `INSERT INTO public.feed_reindex_queue (listing_id) SELECT l.id FROM public.listings l
    WHERE l.status IN ('active','sold') AND … ON CONFLICT (listing_id) DO NOTHING`. Categories and
    places add a `WITH RECURSIVE sub` tree walk, and places adds a top-level `UNION` with a
    `listing_locations` arm.
  - The newest migration mark in the tree: `20261120120300`.
- **tests** — the migration's own proofs (rule 30); no unit test. Next free proof ids are named in the
  migration stop.
- **lists**
  - `scripts/doors/manifest.txt`: the three are service-role functions (no browser grant), so no door
    line (confirmed by their grants).
  - `scripts/public-surface-allowlist.txt`: no change.
  - `check-migrations.sh`: the file's MARK and ledger lines.
- **old-file-readers** — not applicable.
- **second-readers** — not applicable.
- **chunk-graph** — not applicable.
- **environments** — the database only; `bun run db:proof --fresh` is the local proof.
- **mechanisms** — F1-5b's law (INC-786; register row 168): the listing read is held `FOR KEY
  SHARE` before the keyed insert, read in F1-5b's migration as written there.
- **first-download** — not applicable.
- **premises**
  - CONFIRMED by the tree's bodies. The LIVE bodies were not read (no MCP); the migration's md5
    pre-check is what compares them at apply time.
  - A locking clause is not allowed on a query level that holds `UNION`, so the places enqueuer's two
    arms each take the lock in a CTE.
- **callee-codes** — not applicable: no door changes.
- **cell-meaning** — not applicable.
- **findings** — none.

## Item 6 — INC-1166, its second half (a census guard for every open read rule)

- **consumers / definition** — the standing policies by the catalogue's end state, computed with the
  doors' own policy reader (`scripts/doors/policies.ts` `policiesOf`, over `sqlCodeOf`; all
  migrations in apply order): 150 standing policies, of which 8 hold `USING (true)` (or `WITH CHECK
  (true)`):

  | table | policy | command | roles |
  | --- | --- | --- | --- |
  | `category_tree_pointers` | `category_tree_pointers_public_read` | SELECT | anon, authenticated |
  | `countries` | `countries_public_read` | SELECT | anon, authenticated |
  | `coverage_plans` | `coverage_plans_public_read` | SELECT | anon, authenticated |
  | `currencies` | `currencies_public_read` | SELECT | anon, authenticated |
  | `level_overrides` | `level_overrides_public_read` | SELECT | anon, authenticated |
  | `listing_policy` | `listing_policy_read` | SELECT | authenticated |
  | `market_settings` | `market_settings_public_read` | SELECT | anon, authenticated |
  | `migration_text_parts` | `migration_text_parts_service_only` | ALL (USING + CHECK) | service_role |

  - Cross-check: the raw text holds 11 such statements, 3 of them dropped later (INC-1166's first
    half, `20261120030700`), so 8 stand, as the reader says.
  - `policies.ts` does not read a policy built by `EXECUTE format('CREATE POLICY …')`. Three
    migrations build policies so (`20261004144146` :105-108, `20261018142444` :45-46,
    `20261019063500` :128-131), and every one of them is `USING (false)` / `WITH CHECK (false)`. The
    guard must still refuse a computed open rule it cannot name (the plan's `open-rule-computed`).
  - No migration writes `ALTER POLICY`.
  - Browser grants on each table, as the migrations state them:
    - `category_tree_pointers`: SELECT to anon and authenticated (`20260804152522` :102); its
      INSERT/UPDATE/DELETE to authenticated granted `20260809014125` :49 and revoked
      `20261007033719` :399.
    - `countries`: SELECT to anon and authenticated (`20260729110912` :18); I/U/D to authenticated
      granted `20260809014125` :51 and revoked `20260915162505` :138.
    - `coverage_plans`: SELECT granted (`20260915162131` :309), revoked (`20261013142425` :16), then
      a column grant of SELECT (`default_days`, `max_active_ads`, `label_key`) to anon and
      authenticated (`20261102081500` :41).
    - `currencies`: REVOKE ALL, then SELECT to anon and authenticated (`20260917112956` :31-32).
    - `level_overrides`: REVOKE ALL FROM PUBLIC, anon, authenticated (`20261103040805` :116); no
      browser grant after.
    - `listing_policy`: REVOKE ALL; a column grant of SELECT (`renew_allowed`, `renew_days`) to
      authenticated (`20261014194317` :87-88).
    - `market_settings`: REVOKE ALL FROM PUBLIC, anon, authenticated (`20261103040807` :49); no
      browser grant after.
    - `migration_text_parts`: REVOKE ALL; service role only (`20261017092635` :42-43).
  - LIMIT on reading grants from migrations: Supabase's platform default privileges gave every table
    created before `20261007222234` (`ALTER DEFAULT PRIVILEGES … REVOKE ALL ON TABLES FROM anon,
    authenticated`, :425) to the browser roles at birth (INC-212's note, `20260917112956` :29), and
    that default is not written in any migration. So a static reading cannot state a pre-October
    table's grants exactly. The live catalogue (`has_table_privilege`) can.
- **tests**
  - `scripts/doors/check-doors.test.ts` (CF-DOORS; DOORS-1..15, next free DOORS-16).
  - The self-test `plantedCases()` (`check-doors.ts` :145), which the static and live runs prove
    before they judge (DEC-334).
  - The existing planted policies `PLANTED_POLICIES` (:122-134) already include one `USING (true)`
    policy (`e2e_planted_other`) for the helper-reason judge: the new kind needs its own planted pair
    (a standing open rule with no line; a line whose rule is gone).
- **lists**
  - The new declared file (DECIDE-AND-NAME, below).
  - `scripts/doors/check-doors-allowlist.txt` (finding allowances, unchanged).
  - `scripts/conformance/wired.test.ts`: `check-doors.ts` is already wired (`ci.yml` :144 static;
    `local-backend-proof.yml` :689-691 live), so a new kind inside it needs no new caller line. A new
    query file read by `--live` is named in the plan.
  - The register: a register row text goes to §14 Records.
- **old-file-readers** — not applicable.
- **second-readers** — `scripts/doors/once.ts` `readOnce` caches the policy read per root
  (DOORS-9); the new reader goes through it.
- **chunk-graph** — not applicable.
- **environments**
  - The static mode runs in `ci.yml`'s "Door guard" step (:144) and in `bun run checks`.
  - The live mode runs on the smoke lane in `local-backend-proof.yml` :689-691 (psql into CI's own
    temporary backend, inside the workflow; never run by this executor).
- **mechanisms** — the migration reader (`sqlCodeOf`), the doors' policy reader (`policies.ts`), the
  doors' catalogue (`catalogue.ts`: function grants only — `WHOLE_GRANT` / `FORMAT_GRANT` :168-173
  read `ON FUNCTION`, never `ON TABLE`), the judge and the live query (`live-query.sql`), all read.
- **first-download** — not applicable.
- **premises**
  - CORRECTED: "the doors' catalogue (`check-doors.ts` builds one)" holds no TABLE grants: it would
    need a table-grant reader, and the static grant is not exact (the platform default above).
  - The plan proposes the open rules from the policy reader (static) and the grants from the live
    catalogue (smoke lane).
- **callee-codes** — not applicable.
- **cell-meaning** — not applicable.
- **findings** — `level_overrides_public_read` and `market_settings_public_read` are open rules on
  tables no browser role holds a grant on: the class INC-1166's first half dropped (rules that admit
  nothing today and would open the table the day a grant reached it). This lane writes no drop (item
  5 is the one migration). The guard's lines name them as such.

## Item 7 — the second step-up prompt (the operator's walk of 2026-11-15)

- **consumers**
  - The create flow `src/features/admin-categories/category-dialogs.tsx`: `submitCreate` is guarded
    (:196-233); after it, the SAME dialog draws `<CategoryImagePanel categoryId={createdId}
    guard={guard} />` (:313-314).
  - `category-image-dialog.tsx`: Generate (`run`, :106) is not guarded; Accept is guarded (:225-228).
  - `category-images-service.ts`: `generateCategoryImage` calls the route (`callRoute`, :50), then
    `rpc("admin_set_category_images")` (:154-162). The door is `door_context('staff','categories',
    'assets','staff_config',NULL,'global')` in `20261115022200_…`.
  - The gate: `use-step-up.ts` `guard` (:107-130). It asks when `isStepUpFresh()` answers false
    (`mfa-service.ts` :173-186), or when the action throws step-up-required (`isStepUpRequiredError`,
    P0009) and is parked again (:120-125).
- **definition** — `isStepUpFresh`: the token's `aal` is `aal2`, its newest `totp` `amr` timestamp is
  inside `stepUpWindowMs()` (10 min; the E2E instrument `window.__ethioStepUp` may shorten it), and
  `listFactors()` answers at least one factor. The server's `require_step_up_if_needed` is the
  authority (law F3).
- **tests** — the reproduction `SU-R1` / `SU-R2` (scratch, NOT committed:
  `/tmp/ethio-scratch/cursor-bundle-1/step-up-once.spec.ts`, sha256
  5e8e8c38023b18edaecbd5a7bc4a226529d19fb1117c6aee96cc0c5451178a1d). It counts every
  `step-up-modal` that opens, by a `MutationObserver` installed before the first paint:
  - SU-R1: a private super admin (`@private-identity`), then a fresh password sign-in (`switchUser`,
    aal1), the create flow (one code), Generate, Accept. Run in `desktop-1280` and `mobile-360`,
    0 retries: both PASSED, with modals before=0, after create=1, after generate=1, after accept=1.
  - SU-R2: a session stepped up at mint, its `totp` stamp aged past a 30 s client window (the E2E
    instrument), then the create flow (one code), Generate, Accept. Run in `desktop-1280`: PASSED,
    one modal. The token's `amr` `totp` timestamp moved from 1795269772 to 1795269809 at the
    create's code, and the client clock read within a second of it.
  - Logs: `su-r1-desktop.log`, `su-r1-mobile.log`, `su-r2-desktop.log` in the scratch folder.
  - Commands: `bun run e2e:local -- e2e/step-up-once.spec.ts --grep "SU-R1" --project desktop-1280
    --retries 0`, the same with `mobile-360`, and with `--grep "SU-R2"`.
- **lists** — none touched (the spec was removed from the tree before any commit).
- **old-file-readers** — not applicable.
- **second-readers** — not applicable.
- **chunk-graph** — not applicable.
- **environments** — ethio-staging through the E2E build (`bun run e2e:local`).
- **mechanisms** — the step-up gate (`use-step-up.ts`, `mfa-service.ts`), read whole for the parts
  named.
- **first-download** — not applicable.
- **premises** — NOT REPRODUCED. The reading "`isStepUpFresh` may see the session as not stepped up
  right after the code" is false on both paths tried: right after the code the token is aal2 with a
  fresh `totp` stamp, and Accept runs without a second modal.
  - Untested causes the tree allows:
    - a device clock more than the window ahead of the server's (`Date.now() - verifiedAt` at
      :183), which would ask on EVERY guarded action;
    - `listFactors()` failing at that moment (:185-186);
    - a door answering P0009 inside the parked action (:123).
  - Each needs a trace from the walk: the token's `aal` / `amr` and `Date.now()` at the second prompt,
    and the network answer that preceded it.
- **callee-codes** — not applicable.
- **cell-meaning** — not applicable.
- **findings** — the existing image specs (CI-4, CI-5) inject an aal2 session and answer the modal
  through `stepUpIfPrompted`, which passes silently when no modal opens (`e2e/helpers/ui.ts`
  :1105-1113). So no committed test can see a second prompt; the reproduction's counter is the form
  that can.

## queued

`rg -n "wave 2|INC-1153|INC-1187|INC-1166|ACT-029" roadmap.md docs/governance/reports`, each line
marked:

- `roadmap.md:10` — the order of work from 2026-11-15 (an older block's line naming F1-5a's parts):
  left (a records line; not this bundle's).
- `roadmap.md:12` — F1-7's line (INC-1166's drop, INC-1179): its INC-1166 part was built in F1-7b
  (`20261120030700`); left (records turn).
- `roadmap.md:13` — the form kit's wave 2. Built here: `DOOR_CODES` and the gate words off the
  entry (item 3), `doorKeyText` (item 3), the two-factor mapper (item 2). Left: INC-1150 (the two
  "(optional)" labels), which is not in this bundle's items. The line's sign-in, reset and Settings
  forms were done by Lovable's L11 (the line says so).
- `roadmap.md:17` — the census guard for every `USING (true)` rule (INC-1166): built here (item 6).
- `roadmap.md:33` — the feed enqueuers' race (INC-1187): built here (item 5).
- `roadmap.md:59` — the forms-kit turn's waves line: wave 2 built here (items 2 and 3); waves 3 and 4
  left.
- `docs/governance/reports/forms-kit.chat-ruling-1.md:4` — a ruling record; nothing to build.
- `docs/governance/reports/f2-forms.stop-1.md:221` — the plan record's lens line; nothing to build.
- `docs/governance/reports/f1-doors-5b.report.md:243`, `f1-doors-6a.report.md:156`,
  `f1-doors-5b.census.md:538` — "`door-codes.ts` not grown (INC-1153)": the stopgap these turns
  kept; superseded by item 3.
- `docs/governance/reports/f1-doors-7b.stop-1.md:297`, `f1-doors-7b.census.md:378` and :394,
  `f1-doors-7a.census.md:396`, `f1-doors-7b.report.md:325` and :334 — INC-1166's first half (built
  in F1-7b) and the guard left for the before-launch list: built here (item 6).
- `docs/governance/reports/forms-kit.census.md:131`, :318, :330, :334 and
  `forms-kit.report.md:216`, :356, :362 — wave 2's lines (INC-1147 class 1, the two-factor mapper,
  settings): the mapper built here (item 2); settings was done by L11.

The brief's G70 grep in force (each INC number in `supabase/migrations/`, `src/` and `scripts/`):

- INC-1232, INC-1231, INC-1233, INC-1229, INC-1187 and ACT-029: no hit.
- INC-1147: `scripts/conformance/forms-allowlist.txt` (the line item 2 removes).
- INC-1153: the four family files' comments (item 3, old-file-readers).
- INC-1166: `supabase/migrations/20261120030700_…` (the first half, built).

No item was already built.
