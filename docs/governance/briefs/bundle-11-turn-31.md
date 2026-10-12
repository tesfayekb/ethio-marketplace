# Bundle 11 — Part C, turn C2: a destructive act is red: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — PART C, TURN C2 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 0386cd694b7cfba755000e7a5b2e73c411508044. This file is public: it is written as build instructions. Tier B: the colour of nine controls, the shared Button's new variant, the check and its tests, a test helper's evidence, the docs. Tier A stays untouched: every door is called exactly as before.

ANSWERS TO THE LAST TURN
- Turn C1: verified (dev 0386cd69 holds the delivered tree and the brief as sent). Its CI run is read by the supervisor while you work; a fix it needs comes in the next turn.
- Turn L4d: CI run 38203524897 on e1c251c1 (attempt 2 after the staging apply): AL-26 and AL-27 passed; one gating failure, PW-11 — INC-562, Part 0 below.

PART 0 — INC-562 (CI run 38203524897 on e1c251c1, attempt 2): PW-11 failed on mobile-360 (shard 3, both tries) — after the price step's Next, `post-step-5` never appeared within 10 s — and its desktop copy passed only on retry ("the coverage never reached the draft"). Its context file was missing, and the test reads only the next step's testid, so the failure cannot say why the step did not come. It is the third of its class: INC-533 (PW-64) and INC-430 (PW-55, flaky again on that run at the same transition). Staging was under load during the run (a statement timeout, two 429 answers, seven flaky passes).
- e2e/helpers/posting.ts — `nextToStep(page, step)` (NEW export): presses Next and waits for `post-step-<step>` exactly as `expect(…).toBeVisible()` does (its default 10 s). When the step does not come, it throws with each draft save answered meanwhile (`/api/listings/draft`: its status, how long it took, and `ok` or the refusal reasons — never the body) and the refusal lines the wizard shows. Evidence only: the wait and its timeout are unchanged, nothing is loosened.
- e2e/post-wizard-place.spec.ts — PW-11's price → details step uses it.
- e2e/post-wizard-pricing.spec.ts — `pricingToReview` (the path from the price step to review used by PW-55, PW-64 and the file's other pricing tests) uses it for each of its four Next presses.
- The class's fix stays with the next posting-area turn (the roadmap's line, with INC-526, INC-449's class, INC-533 and INC-430), which reads this evidence first.

WHAT THIS TURN BUILDS — Part C of bundle 11, the destructive-red rule (turn A3's census, G29)
- The rule (docs/features/display-primitives.md, a new section at its end): every control that performs or confirms a destructive act — delete, remove, reject, revoke, unlink, deactivate, discard — is red. The act in a list, or the button that opens its confirmation, is a red outline; the button that confirms it is filled red; a row's Delete is RowActions' red icon; a menu's destructive item is red.
- scripts/destructive-red.ts (NEW): the check, over every .tsx file under src/ (tests left out). A label whose key's last part starts with one of those words (not the past tense: "Removed" names a state), or the confirmation under such a part (`….delete.confirm`), drawn by a control must be red: a JSX control's opening tag says `destructive` or `danger` (a variant, a tone, a class, or a class constant whose name says danger); a row action object says `tone: "danger"` or sits in RowActions' `remove` slot; a dialog's submit carries `danger`; a verb bar's `verb(…)` passes its danger flag. A label no control draws is not judged. Declared exceptions, each with its reason (a stale one is refused): the attribute editor's option rows and the posting form's place rows edit the form, and nothing is removed until Save or Next. scripts/destructive-red.test.ts (NEW) runs it with the unit tests.
- src/components/ui/button.tsx: a new variant `destructiveOutline` (red words and border); every existing variant and the default are unchanged.
- The check's nine refusals on the base, now red:
  - src/features/admin/roles/permission-matrix.tsx — a granted permission's Revoke: `destructiveOutline` (Grant unchanged);
  - src/features/admin/users/user-detail.tsx — a user's role Remove: red words (still the ghost button);
  - src/features/posting/step-photos.tsx — a photo's Remove (it deletes the photo at once): a red outline (`tileDangerClass`);
  - src/features/posting/step-where.tsx — the map pin's Remove: a red outline;
  - src/routes/settings.tsx — Unlink a sign-in method, Remove password and Remove an authenticator: a red outline (`dangerOutlineClass`); their confirmations (Remove password's "yes" and the authenticator's confirm): filled red (`dangerButtonClass`).
- Every other destructive control the check reads was already red (Screening's Reject, every Delete in RowActions, the attribute and category removes, Delete role, Deactivate, the language's Delete confirmation).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A destructive act that opens its confirmation, or sits in a list, is a red outline; the confirmation is filled red. A list of many granted permissions shows red outlines, not filled red.
- The seller's photo Remove and the map pin's Remove are destructive (they delete at once) and turn red; removing a place row in the posting form edits the draft (nothing is saved until Next) and stays as it is.
- The check runs with the unit tests; no CI workflow changes.
- INC-562 gets its evidence now; its fix goes with the posting class in the next posting-area turn.

TESTS
- Unit, NEW: scripts/destructive-red.test.ts — DR-1 (a destructive control is refused unless red; a state word, a label outside a control and a plain label are not judged), DR-2 (row actions with tone danger or in the remove slot; a dialog's submit with danger; a verb's danger flag), DR-3 (a declared exception passes; a stale one is refused), DR-4 (the tree: at least 25 destructive controls, none refused).
- e2e: PW-11 and the pricing path to review (PW-55, PW-64 and the file's other tests through `pricingToReview`) wait through `nextToStep` — the same waits, with evidence on failure. No assertion changed.
- Not edited: every other test.

DOCS
- display-primitives.md (the destructive-red rule and its check), the changelog, the roadmap (line 3; the C2 line; INC-562 joins the posting-area line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C1 applied)
- typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 685 unit tests (113 files), the usage maps (unchanged), the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget (231.0 KiB): all clean.
- The check on the base tree: nine refusals, exactly the nine controls above; on this turn's tree: none.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-31.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 0386cd69…; any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage-map check, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 14 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-31.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 12 files → each equal to:
  19043c8f083e5d8410fde8c5b3a2e7fa0d6f33a5ac542b28c9e32491b303ef2c  docs/_changelog.md
  249b9edff099e03cee86721d7d0b51cad2cb622870b3751e7d3eb5971a3bd2e9  docs/features/display-primitives.md
  4a6c8bafc3f5c4c704fed8b5797f72e66e8915b0328cfcbc13bace0e4d71d0f3  e2e/helpers/posting.ts
  09e8bcd0d76fc63aefc8485ddcebb26b1a0dcbd717fe9848c79072ec79f33ad5  e2e/post-wizard-place.spec.ts
  8954235b89f1b4717ea9d5489b61757cc5522da6c587b1c2e7123d36cc05afe1  e2e/post-wizard-pricing.spec.ts
  6060773c5e5c3e30f0f2222f6fb7033b18540aea91a794bbbf689ce59df6ee55  roadmap.md
  fe9ca35d31b6a444091c4a695918bd23ae13edaa5bbbe209c37960df74c49f80  src/components/ui/button.tsx
  d30d446d93b81f99efba0722e78607cca8a7ee9f12ec84adb14995627a040012  src/features/admin/roles/permission-matrix.tsx
  b100e776b158c1a1d236bc0b9559b60ff29bef7b3eb7b72900c4564a61347e31  src/features/admin/users/user-detail.tsx
  c7dbbe07a16840b578688a094a5efd7b96468ecf55564744854bbcf7903b224b  src/features/posting/step-photos.tsx
  442f1ab914793425ef4bac6e51271232b5dc1cf63b70e2c4d168753dc823e93c  src/features/posting/step-where.tsx
  e77684c8a04da248ecb72a9f172cc915dbbc5664725f7ad161607bf4dc703693  src/routes/settings.tsx
- (c) `ls scripts/destructive-red.test.ts scripts/destructive-red.ts` → "No such file or directory" for each.

THE CARRIER — C2-TURN-CARRIER-2026-10-12.md (22,315 bytes; sha256 03a82cf33a3fcd2da96dabbbb92ce9bcc02681fb636a7dc8748071e238f93624; 27 sections)
- Its first line starts "C2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`: it must print "usage maps match the tree." the first time (this turn moves no key). If it rewrites a map instead, run it again and name the rewrite in the report.

THE HASHES — `sha256sum` each of the 14 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ab1fb508ff022889da3d6c81f86cbebfb56406b38efee9922e627da96169ae26  docs/_changelog.md
  9a4f9401ee1e5f6d6ed8d99005964b8c2df2b2f33fa3b7acdc617ba781e35afc  docs/features/display-primitives.md
  a797ab5cc7461d160a00d6f49a06d1f3fc471eeb43bceda3f881b0752579b8bc  e2e/helpers/posting.ts
  b24b7177e7f32ffde3be6f60efe0e54aba9e92e34b99545b05a519d113bcf1f6  e2e/post-wizard-place.spec.ts
  14f0e99d659ecf3101996024b76e516c5bb34f7755ad8849a60c3025902ae79d  e2e/post-wizard-pricing.spec.ts
  3c5bbd490bbefe2447e9eb2323beaed0dd462dd27aa154c1e8d496d902885904  roadmap.md
  cad2c5288a2005aead9cfaaea1decf52dce0cc618b772052a15c338e9842b291  scripts/destructive-red.test.ts
  8f1936eb1688928927c982f4c62cdbf483b4e80df7fa743f17fd0388625aef4c  scripts/destructive-red.ts
  a280c940df2954d4a8ed061290d93b5f41e264bbe09753be472473859133a9b9  src/components/ui/button.tsx
  88897edf7882e246983a5d1f44622b3f3a4df810160123c4329dc392c410ec91  src/features/admin/roles/permission-matrix.tsx
  d8b8dcf197f6daa8c5423acf3904e0bcf713116c5ea36bd0c37690f2dd9201c9  src/features/admin/users/user-detail.tsx
  d5be3fd15d284de546afa833cf565d7a997abc8ba4a90c5dad512d361388cb9c  src/features/posting/step-photos.tsx
  9496dfe96aab20719bb877c948f87c22cbd5aeabd3aa59eade560e608e4adf04  src/features/posting/step-where.tsx
  82b56c0e9a894faf35a877f36f6cfc84f93155c390308ebe1dbaf7573e311b4d  src/routes/settings.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 685 passed (113 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 14 sha256sum lines and the brief's.
- `git diff --name-only 0386cd694b7cfba755000e7a5b2e73c411508044` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 0386cd694b7cfba755000e7a5b2e73c411508044 HEAD` too. Expect the 14 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
