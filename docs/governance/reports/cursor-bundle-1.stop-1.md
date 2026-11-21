STOP — cursor-bundle-1 STEP 1: the census and the plan (PLAN FIRST); THE CUT's condition met for item 3 alone
DONE: STEP 0 (the brief and the package saved, sha256 equal, roadmap line 3), STEP 1 (the census: docs/governance/reports/cursor-bundle-1.census.md)
LEFT: STEPS 2–8 (items 1–7)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `358c691ab112446f68b804c5f02848beda36dff0` (short `358c691`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T12:43:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44904897718
FILES:
docs/governance/briefs/cursor-bundle-1-guide.json
docs/governance/briefs/cursor-bundle-1.md
docs/governance/reports/cursor-bundle-1.census.md
docs/governance/reports/cursor-bundle-1.stop-1.md
roadmap.md

The plan by item follows: the files, the tests, the new sentences with their English, the
migration's shape, and item 7's reproduction. Then the questions the supervisor's ruling answers.
Every measured number is in the census, with its command.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-1.md`: `[check-go] no finding`.

## Why this is also THE CUT's stop

THE CUT (G37) reads: "item 3's move reaches a chunk the plan cannot keep off a first download,
propose the cut and STOP." Measured (census, item 3, trial A):

- Moving `DOOR_REFUSED_KEY` to a leaf alone takes `door-codes.ts` out of the entry, but into a chunk
  of its own (564 B gzipped) that the 36 pages carrying the reader download beside it.
- Those 36 pages grow 0.17–0.29 KiB each, and eight of them are left inside their 0.3 KiB band.
- With item 2's move (the auth mapper off the shared shell, onto the reader), trial B: the list
  JOINS the reader's own chunk, the entry falls 201.8 → 201.0 KiB, and every page falls 0.06–0.83
  KiB except `/auth_/callback` (+1.95 KiB, which option B below removes).

The proposed cut is therefore not a removal. Items 2 and 3 land together as one move (STEP 4's and
STEP 5's commits keep their order, and the first-download check runs on the joined tree). Item 3
does not land without item 2's move. No item is larger than about fifteen source files (the counts
are below).

## Item 5 — INC-1187 (STEP 2, the one migration stop)

The form (DECIDE-AND-NAME, "the enqueuers' form"): THE HELD READ. Each enqueuer's listing read takes
`FOR KEY SHARE OF l`, F1-5b's law (INC-786). The insert cannot meet a missing row by its form alone:
a row deleted after the snapshot still reaches the foreign-key check. Under READ COMMITTED, a
locking read skips a row whose delete has committed and holds one it reads, so a delete waits for
the enqueue.

One new migration, `supabase/migrations/<stamp>_<uuid>.sql` (new), rule 30 whole:

- e2e-areas header; MARK above the ledger.
- A pre-check per function: the live body's md5 (prosrc, CR-stripped) must equal the tree's last
  declaration:
  - `feed_reindex_enqueue_listings(uuid[])` 28b6ccb09d0736cf826f3274fe6ba8b9
  - `feed_reindex_enqueue_categories(uuid[])` 55d421a866e45ac0066ec541631b9ae0
  - `feed_reindex_enqueue_places(uuid[])` 6c3e807ef39e8dbf290fe768127ab49f
- Each function redeclared whole, from its last declaration, signature, language, volatility,
  `SECURITY DEFINER`, `SET search_path TO 'public'` and its grants restated (`REVOKE ALL … FROM
  PUBLIC, anon, authenticated; GRANT EXECUTE … TO service_role`). The one change in each:
  - listings: `SELECT l.id FROM public.listings l WHERE l.status IN ('active','sold') AND l.id = ANY
    (p_listing_ids) FOR KEY SHARE OF l`;
  - categories: the same lock on its one listing read (its `UNION` sits inside the `WITH RECURSIVE
    sub` CTE, not on the locked level);
  - places: a locking clause is refused on a level holding `UNION`, so the two arms become two CTEs,
    `held_here AS (SELECT l.id … FOR KEY SHARE OF l)` and `held_listed AS (SELECT l.id FROM
    public.listing_locations ll JOIN public.listings l … FOR KEY SHARE OF l)`. The insert reads
    `SELECT id FROM held_here UNION SELECT id FROM held_listed` (the same rows, the same `ON
    CONFLICT DO NOTHING`, the same count and wake).
- Proofs on scratch rows, inside the migration (rule 30):
  - (P1) A scratch listing is deleted in the transaction beside the enqueue; each enqueuer answers no
    error and no queue row for it.
  - (P2) A live scratch listing is enqueued once by each enqueuer (the count and the row as before).
  - (P3) The catalogue: each redeclared body holds `FOR KEY SHARE OF l` on every listing read
    (prosrc), and the grants read back.
  - Every proof row is removed.
- LIMIT stated in the migration stop: a single-session proof cannot interleave two transactions. P1
  proves the form's answer to a row already gone; the lock's wait is PostgreSQL's documented
  behaviour (not proven by a second session here).
- Then `bash scripts/check-migrations.sh`, the pre-stop scan, `bun run db:proof --fresh` (its last
  line pasted), and the MIGRATION stop with "apply <fragment> → expect mark <value>" and every
  body's new md5.

Files: the one migration. Tests: its proofs. Source files: 0.

## Item 1 — INC-1232, INC-1231, INC-1233 (STEP 3)

- `.github/workflows/local-backend-proof.yml` :1222 — the summary's prefix tuple gains `'- Repeat
  serially'`, so `local-backend-proof.md` carries the serial line.
- `scripts/e2e-failure-report.ts` :1609:
  - The count reads per-test cap lines only, excluding `SERIAL_CAP_LINE` (imported from
    `scripts/ci/repeat-cap.ts`, the one definition; no second literal).
  - The serial pass's cap is its own clause: `; the time cap stopped the serial pass` (proposed
    English; a CI line, not a user-visible string).
  - Self-test checks are added beside the INC-1107 ones (:3144-3220).
- `scripts/conformance/shared-values.ts` :134-145 — `triggerFindings` reads SQL through
  `sqlCodeOf` (`scripts/conformance/migration-reader.ts` :52), not its own comment pattern.
- `scripts/conformance/shared-values.ts` :106 — the message reworded without angle brackets:
  `` `a reader line is not "file::test id" (${entry.trim()})` `` (proposed; no suppression comment).
- Tests:
  - LFE-4 in `scripts/ci/lane-failure-evidence.test.ts`: the summary step's Python, run by the
    file's `heredoc` helper, keeps a `- Repeat serially` line.
  - EFR-5 in `scripts/e2e-failure-report.test.ts`: a selection with one `SERIAL_CAP_LINE` and two
    per-test cap lines reads "left 2 test runs" plus the serial clause.
  - CF-LANES-6 in `scripts/conformance/lanes.test.ts`: a planted migration whose `'--'` sits inside
    a literal before a statement-level trigger is still found (the planted list at :613-631 gains
    the case).
- Source files: 4 (two scripts, one workflow, one guard). Tests: 3.

## Item 6 — INC-1166, its second half (STEP 3)

DECIDE-AND-NAME — the open-rules file and its line form: `scripts/doors/open-rules.txt` (new),
beside the doors' manifest. One line per standing open rule:

```
<table> <policy> | <command> to <roles> | grants <role>:<privilege>[(<columns>)],… or none | <reason>
```

For example: `countries countries_public_read | SELECT to anon,authenticated | grants anon:SELECT
authenticated:SELECT | every visitor's country picker reads the list`. A `|`-free reason, and
`#` comments allowed, as in `manifest.txt`.

The judge, in `scripts/doors/check-doors.ts`, three finding kinds through the existing `allow()` and
allowlist:

- `open-rule-undeclared` — a standing policy whose text holds `USING (true)` or `WITH CHECK (true)`
  (read by `policies.ts` `policiesOf` over `sqlCodeOf`) without its line.
- `open-rule-gone` — a line whose policy no longer stands.
- `open-rule-computed` — a DO block's `EXECUTE format('CREATE POLICY … (true)…')`, which the reader
  cannot name, unless its line names the table.

A new reader `openRulesOf` goes in `scripts/doors/policies.ts` (beside `policiesOf`), read once per
root through `once.ts`.

The grants: the static run checks that the line's grants field is well-formed only. The live run
(smoke lane, `local-backend-proof.yml` :689-691) checks each line's grants against the live
catalogue: `has_table_privilege` / `has_column_privilege` for anon and authenticated. They come from a
second query file `scripts/doors/live-open-rules.sql` (new), printed by `--live-open-rules-query`
and handed to `--live` as a second TSV. The finding is `open-rule-grants`.

Why live: the migrations cannot state a pre-October table's grants exactly, because the platform's
default grant is in no migration (census, item 6).

ALTERNATIVE, smaller: static only, the grants field as the migrations state them. The supervisor
chooses (question 4).

- Planted case (DEC-334's self-test): a planted `USING (true)` policy with no line
  (`open-rule-undeclared`), a line for a policy dropped in the planted files (`open-rule-gone`), and
  a planted `format('CREATE POLICY %I ON public.%I FOR SELECT USING (true)', …)`
  (`open-rule-computed`), each in `plantedCases()`.
- Test: DOORS-16 in `scripts/doors/check-doors.test.ts` (every new kind fires on its plant; the
  clean tree fires none). DOORS-17 covers the live reader's TSV for the grants (only if question 4
  takes the live form).
- The file's eight lines, from the census's table. The two dead rules, `level_overrides` and
  `market_settings` (`grants none`), carry the reason "admits nothing: no browser grant
  (INC-1166's class); its drop waits for a ruling".
- `wired.test.ts`: a caller line for the new query flag (live form only).
- `docs/features/` (the doors' guide) gains the file's section.
- Source files: 3 (`check-doors.ts`, `policies.ts`, the new `.txt`), plus 1 query file and 1
  workflow line in the live form. Tests: 1–2.

## Items 2 and 7 (STEP 4)

### Item 2 — the form kit's last lines

The auth mapper (`src/features/auth/auth-error-key.ts`):

- `AUTH_REFUSALS: RefusalFamily`. Its `words` are by provider code:
  - `email_not_confirmed` → `auth.errorEmailNotConfirmed`
  - `invalid_credentials` → `auth.errorInvalidCredentials`
  - `user_already_exists` → `auth.errorEmailInUse`
  - `single_identity_not_deletable` → `auth.errorLastMethod`
  - `weak_password` → `auth.errorWeakPassword`
  - `email_address_not_authorized` → `auth.errorMailSend`
  - `validation_failed` → `auth.errorInvalidEmail`
  - `over_request_rate_limit`, `over_email_send_rate_limit` → `auth.errorRateLimited`
- Its `sentences` are today's message tests, in today's order. `generic` is `auth.errorGeneric`.
- `toErrorKey(error)` = `readRefusal(heard, AUTH_REFUSALS).key`. `heard` is the error, with three
  reads the family cannot express kept before it:
  - the leaked-password reason (`reasons` all `pwned` → the word `leakedPassword`);
  - the 429 status → `over_request_rate_limit`;
  - the 500 mail-send messages → `email_address_not_authorized`'s word.
- Every answer of `auth-error-key.test.ts` stays equal. It is the regression proof: every existing
  case keeps its key.
- `failure` moves from `auth-result.ts` into `auth-error-key.ts`; `auth-result.ts` keeps
  `CLIENT_FAILED`.
- `sign-out.ts` answers a failed sign-out as `{ ok: false, errorKey: "auth.errorGeneric" }`. The
  shell reads only `ok` (`app-shell.tsx` :709-710, DEC-268), so nothing drawn changes.
- `scripts/route-budgets.mjs` `SHARED_SHELL_MODULES` loses `auth-error-key.ts`'s line (the module
  census demands it).

The `/auth_/callback` question (trial B: +1.95 KiB, over its ceiling, for code it never draws):

- OPTION B (recommended): `completeEmailVerification` moves byte for byte into
  `src/features/auth/email-verification.ts` (new), the precedent DEC-348 set for `sign-out.ts`.
  `auth-service.ts` re-exports it for its neighbours, and `auth_.callback.tsx` imports the new
  module.
  - The lists it meets: one `scripts/conformance/vendor-seams-allowlist.txt` line (as `sign-out.ts`'s
    :50), `scripts/conformance/auth-answers.test.ts` reading the new module, and
    `auth-client.test.ts` :55 / :210-213.
  - `src/routes/auth_.callback.tsx` is outside the brief's areas: question 2.
- OPTION A: keep it, and raise `/auth_/callback`'s ceiling 206 → 208 (`ceilingForLocal(207.31)`)
  with the cause on its line.

The two-factor mappers (`src/features/auth/mfa/mfa-service.ts`):

- `MFA_REFUSALS: RefusalFamily`; `failure(error)` = `{ ok: false, errorKey: readRefusal(error,
  MFA_REFUSALS).key, refusal }`.
- `refusal` is `{ field: "code", reason: <the heard provider code or "unknown"> }`. Its type,
  `MfaOutcome`, gains `refusal`; settings keeps reading `errorKey`.
- The four callers pass the whole error object, not `error.message`.
- `stepUpAbortKey(error)` reads through the reader's step-up branch: `const read =
  readRefusal(error); return read.branch !== "stepUp" ? undefined : read.silent ? null : read.key;`.
  Its name, its answers and its ~20 callers are unchanged, so the `vi.mock`s stay valid.
- `invalidCode` is removed.

The family's words by provider code. Existing keys where they fit:

- `mfa_verification_failed`, `mfa_challenge_expired` → `mfa.errorInvalidCode`
- `over_request_rate_limit` → `auth.errorRateLimited`
- no factor → `mfa.errorNoFactor`
- everything else → `generic: mfa.errorGeneric`

NEW SENTENCES (English proposed; the Amharic comes in ruling 1; layer `en-member.ts` /
`am-member.ts`, beside the `mfa.*` keys at :165-187):

- `mfa.errorSetupPending` (`mfa_factor_name_conflict`, INC-1147 class 1): "Two-factor setup has
  already been started for this account. Finish it where you started it, or try again later."
- `mfa.errorFactorExists` (`too_many_enrolled_mfa_factors`, `mfa_verified_factor_exists`): "This
  account already has an authenticator app. Remove it before adding another."
- `mfa.errorMethodOff` (`mfa_totp_enroll_not_enabled`, `mfa_totp_verify_not_enabled`): "Two-factor
  codes are switched off for now. Please try again later."

The step-up dialog (`src/features/auth/mfa/step-up-dialog.tsx`):

- The code control sits in `Field` (`id="step-up-code"`, `label={t("mfa.codeLabel")}`, `required`,
  `refusal` and `family={MFA_REFUSALS}`, `refusalTestId="step-up-error"`).
- The control keeps `data-testid="step-up-code"`; the dialog's own `<p role="alert">` goes.
- `use-step-up.ts` holds `refusal: Refusal | null` beside `errorKey`, set from the outcome (and
  `{ reason: "noFactor" }` / the list failure for its own two answers). `step-up-gate.tsx` passes it
  through.
- No gate: the dialog's submit is already its own button (unchanged).

The guard and the docs:

- `scripts/conformance/forms-allowlist.txt` ends with no line.
- CF-FORM-6 in `scripts/conformance/forms.test.ts` asserts the file holds no line.
- `docs/features/forms.md` records wave 2 done.

Tests:

- `src/features/auth/mfa/mfa-service.test.ts` (new):
  - MSV-1: each provider code reads its words, and an unknown one the generic.
  - MSV-2: `stepUpAbortKey` keeps its three answers.
  - MSV-3: the outcome's `refusal` carries the code.
- `auth-error-key.test.ts`: every existing case unchanged, plus one per provider code the family
  names.
- `step-up-gate.test.tsx`: the refusal drawn under the control, with `aria-invalid` and
  `aria-describedby`.
- MF-2's e2e ids (`step-up-code`, `step-up-error`) keep working, proven by `--grep "MF-2"` in both
  projects.

Source files: `auth-error-key.ts`, `auth-result.ts`, `sign-out.ts`, `auth-service.ts`,
`mfa-service.ts`, `use-step-up.ts`, `step-up-gate.tsx`, `step-up-dialog.tsx`, and with option B
`email-verification.ts` plus `auth_.callback.tsx`. That makes 8–10, plus the two locale files,
`route-budgets.mjs` and the allowlists; tests 4–5.

### Item 7 — the second prompt

- NOT REPRODUCED. SU-R1 passed in `desktop-1280` and `mobile-360`, and SU-R2 in `desktop-1280`,
  0 retries, on ethio-staging. In each run the modal opened once.
- The reading in the brief (`isStepUpFresh` stale right after the code) is false on both paths:
  the token carries aal2 and a `totp` stamp of the code's second.
- By the brief, the item waits for a trace: "no speculative change in the sign-in folder".
- The trace that would name the cause, taken at the second prompt on the walk:
  - the access token's `aal` and `amr`, and the device's `Date.now()`;
  - the network answer just before the modal (a P0009 from a door would show the parked path,
    `use-step-up.ts` :123);
  - whether `listFactors` answered (`mfa-service.ts` :185).
- Proposed for the plan (question 5): commit SU-R1 as `MF-9`, the regression test. With its
  `MutationObserver` counter, it is the one test form that can see a second prompt (the CI-4 /
  CI-5 path answers prompts silently). The spec is at
  `/tmp/ethio-scratch/cursor-bundle-1/step-up-once.spec.ts`, sha256
  5e8e8c38023b18edaecbd5a7bc4a226529d19fb1117c6aee96cc0c5451178a1d. It would be committed with the
  eslint-clean form (SU-R2's wall-clock wait dropped).

## Items 3 and 4 (STEP 5)

### Item 3 — the list off the entry; one instant reader

DECIDE-AND-NAME — where the code list and the gate words live:

- `DOOR_REFUSED_KEY` moves to `src/lib/door-refused-key.ts` (new, one export), which
  `door-codes.ts` re-exports so its other importers are unchanged.
- `src/components/shell/impersonation-notice.tsx` :6 imports the leaf.
- `DOOR_CODES`, with its gate words, then lives in the reader's chunk (`refusal-*.js`, measured in
  trial B), and no page downloads it unless it downloads the reader.
- `door.refused` stays in the base layer: the shell's notice draws it on every page.

DECIDE-AND-NAME — the instant reader's module: `src/lib/refusal.ts`, `rateUntilOf(input: unknown):
string | undefined`.

- It reads through `hear()`: the tail of a `rateLimited:<instant>` reason or message, or a
  `rateLimited` refusal's `detail`. A blank detail is `undefined`.
- Both features call it. Their two readers and their exports retire, and callers import from
  `@/lib/refusal`: `save.ts`, `report.ts`, `contact.ts`, `step-photos.tsx`, `posting-service.ts`
  :854 and :1269, `refusal-text.ts` :230.
- One edge to keep, named here: the ad page's reader prefers `message` to `reason`, while `hear`
  prefers `reason`. No caller passes both (the census read every call site), so the answers stay
  equal; RTW-22 pins it.

`doorKeyText` is removed, with its test block (`refusal-tail.test.ts` :54-75) and its mention in
`docs/features/forms.md` :49-50 (no production caller).

Tests:

- DC-5: `DOOR_REFUSED_KEY` is the same value through both modules.
- RTW-22 in `src/lib/refusal.test.ts`: every shape both old tests read gives the same instant, and
  `expectTypeOf` holds.
- The two feature tests' `rateUntilOf` cases move to RTW-22 or call the one reader.
- The bundle check on the joined tree (items 2 and 3), every page before → after in the report.

Source files: `door-codes.ts`, `door-refused-key.ts`, `impersonation-notice.tsx`, `refusal.ts`,
`refusal-tail.ts`, `ad-page-refusals.ts`, `save.ts`, `report.ts`, `contact.ts`, `refusal-text.ts`,
`step-photos.tsx`, `posting-service.ts`. That is 12; tests 5.

### Item 4 — ACT-029

- By script: the 18 keys other than `what` and `how` move from `admin.monetisation.level.guide.*`
  to `admin.monetisation.levels.guide.*` in `en-guide.ts` and `am-guide.ts`, each value
  byte-identical (a sha256 list of the 36 values, before and after, in the report).
- `what` and `how` take the package's four values, copied by script, with each sha256 checked.
- The 20 old keys retire in both files.
- `products-section.tsx` :328's level branch takes `"admin.monetisation.levels"`.
- `admin-guides.test.ts` :330's list takes the new prefix, in sort order after
  `admin.monetisation.levelOverrides`.
- `bun run i18n:usage`; `am-script.test.ts` runs.
- Source files: 3 (`products-section.tsx`, `en-guide.ts`, `am-guide.ts`) plus the guard's list.

## DECIDE-AND-NAME (for §10)

- The code list and the gate words: the reader's chunk (via `src/lib/door-refused-key.ts`).
- The instant reader: `src/lib/refusal.ts` `rateUntilOf`.
- The enqueuers' form: the held read, `FOR KEY SHARE OF l` (places: two CTEs).
- The open-rules file: `scripts/doors/open-rules.txt`, the line form above.
- The new test ids, each free across `src`, `e2e` and `scripts`:
  - item 1: LFE-4, EFR-5, CF-LANES-6;
  - item 2: CF-FORM-6, MSV-1..3;
  - item 3: DC-5, RTW-22;
  - item 6: DOORS-16 (and DOORS-17 in the live form);
  - item 7: MF-9 if question 5 says so.

## Findings (beyond the task)

1. `src/lib/reader-failure.ts` :49-68 holds its own sets of the gate codes (a second list beside
   `DOOR_CODES` for its classing): a K2 sibling, reported, not touched.
2. Two open read rules admit nothing: `level_overrides_public_read` (`20261103040805`) and
   `market_settings_public_read` (`20261103040807`). Their tables hold no browser grant, which is
   INC-1166's class. Their drop is a migration this brief does not name.
3. `policies.ts` does not read a policy built by dynamic SQL. Every such policy in the tree today is
   `USING (false)`; the plan's `open-rule-computed` closes the gap for open rules.
4. The committed image specs (CI-4, CI-5) cannot see a second step-up prompt: they inject an aal2
   session, and `stepUpIfPrompted` passes silently when no modal opens (`e2e/helpers/ui.ts`
   :1105-1113).
5. The brief points to "the value after END BRIEF" for its sha256; the file has no such line, so
   the chat's stated value was compared (equal).
6. INC-1229, INC-1231, INC-1232 and INC-1233 are not yet in `docs/tracking/incidental-findings.md`
   (grep): the records turn's.
7. `local-backend-proof.md` on ci-evidence names commit `8df5d28db` (run 44756753510), not the base.
   It is non-gating and was not republished for `358c691ab`.
8. SMN-E13's flake (`e2e/submenu-look.spec.ts` :213) has five ledger lines from 2026-11-17 to 11-19.
   It is already tracked (INC-1015, open) and not this bundle's.

## Questions (the ruling answers by number)

1. THE CUT: may items 2 and 3 land as one move (item 3 never without item 2's auth move), as
   measured?
2. `/auth_/callback`: option B (`completeEmailVerification` into
   `src/features/auth/email-verification.ts`, with `src/routes/auth_.callback.tsx` :7 importing it:
   a file outside the brief's areas), or option A (keep it, ceiling 206 → 208 with its cause)?
3. Item 2's new sentences: the three keys and English above (or other words); their Amharic.
4. Item 6's grants: the live form (a second query on the smoke lane, `open-rule-grants`) or the
   static form (the grants as the migrations state them, with the platform default's limit
   written in the file's header)?
5. Item 7: commit the reproduction as MF-9 (a regression test that counts prompts), or leave the
   item wholly to the trace?
6. Item 2: does a failed sign-out answering `auth.errorGeneric` without the mapper (its key is
   never drawn) stand, or should `sign-out.ts` keep the provider's mapped key (which keeps the
   mapper, and the reader, on every page's first download)?
