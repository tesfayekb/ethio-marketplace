# Bundle 11 — the Listings console, turn L1b: L1's red, the house date field (INC-549) and faster CI (DEC-171): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L1b (2026-10-11). ONE TURN. No migration, no database change, no package change. Four new strings (below).
Base: dev 63f6b687bce2b38600161b0fd1042457c10bf441. This file is public: it is written as build instructions. Tier A tests (the console's doors) and CI workflow changes; Tier B screens (Audit's filters, the posting form's date fields).

ANSWERS TO TURN L1
- Verified by diff of 232bfc02..63f6b687 (with the platform's three intermediate pushes): the 7 carrier paths and the brief byte-identical to the supervisor's copy; the migration file equals the brief's text with <MARK> = 20261011210000; types.ts regenerated (allowed). The production read-back matched.
- CI on 63f6b687 (run 38126648954, after the operator's staging apply and "Re-run failed jobs"): FAILURE — one gating failure, the component test src/test/pool-reset-map.test.ts (part 0). The E2E matrix passed on every shard; the fast lane (signal only) failed AL-3 on both projects (part 0).
- Your scratch check's first name (20261011120000_l1-check.sql) was stamped later than your test mark, so the self-marking guard refused it: the brief's example name was the supervisor's slip. Your rename was right.

PART 0 — L1'S RED (run 38126648954 on 63f6b687)
- Component tests: src/test/pool-reset-map.test.ts — "expected [ 'seller_notices' ] to deeply equal []". The regenerated src/integrations/supabase/types.ts names the new table, which holds a seller_id, so DEC-099 asks it to be declared RESET or EXEMPT. The supervisor's census missed it.
  Fix: e2e/helpers/pool-reset-map.ts declares `seller_notices` RESET; e2e/helpers/users.ts (reapPoolAccount) deletes a pooled account's notices beside its revisions.
- The fast lane (signal only), AL-3 on both projects: "a removed listing is not edited" expected, "listing not found" received, then the afterEach could not remove the scratch place ("violates foreign key constraint listings_location_id_fkey"); its retry failed seeding on the same constraint. Read: AL-3 signed four people into the browser and ran past its 60 s budget; at the timeout the afterEach removed the test's listings and place while the abandoned test body went on — the removed listing was gone ("listing not found"), and the body's late listing then held the place (the retry: the place was already gone). The matrix shards passed AL-3 inside the budget.
  Fix (e2e/admin-listings.spec.ts): every test signs ONE person into the browser — the super admin, whose fresh second factor the doors require; every other person (a plain account, a viewer, a reviewer, an enforcer without a second factor, the seller, another account) calls the door from node: a password grant (e2e/helpers/session.ts `passwordGrant`) and the same REST request the browser client sends. AL-1, AL-3, AL-5, AL-8 and AL-9 change that way; what each test proves is unchanged.

PART 1 — INC-549: EVERY DATE FIELD OPENS THE APP'S OWN CALENDAR (the operator's walk of G3b, line 4: "the calendar should also show future dates disabled, should also not go foreward date")
- The cause: the date fields are native date inputs; a phone's own picker ignores their min and max, so it offers days the field then refuses and its month moves past the bounds.
- src/components/shell/date-field.tsx (NEW) — `DateField`: a field that opens the app's own calendar (src/components/ui/calendar.tsx, react-day-picker 9, already in the app) inline under it, the same on every device: days outside min/max are greyed and cannot be chosen; the month arrows stop at the bounds; it opens on the chosen day, else today kept inside the bounds; the month and weekday names follow the page's language; a clear button. The value is "YYYY-MM-DD" in the person's own calendar — src/components/shell/date-day.ts (NEW; never through UTC; a day the calendar lacks, such as 2026-02-31, is refused).
- Census (G29) and every use: Admin › Audit's From and To (src/features/admin/audit/audit-page.tsx; the two now stack, so each calendar has the panel's width); the seller's end date (src/features/posting/step-review.tsx; its bounds are now the seller's own calendar days — they were UTC days); a date question in the posting form (src/features/posting/step-specifications.tsx). The category window (a date and a time, no bounds; category-dialogs.tsx, category-form-fields.tsx) keeps the browser's field.

PART 2 — DEC-171: FASTER RUNS (the operator: "its difficult to move faster with ci runs taking so long")
- Measured over the last 40 green runs: a run lasts as long as its slowest E2E shard plus about a minute; the median grew from about 26 minutes (2026-10-08) to 31–33 (today); the slowest shard 32 minutes, the quickest 23.
- .github/workflows/ci.yml:
  - eight shards (was six): the matrix 1–8, `--shard=N/8`, the job name "E2E shard N/8", `E2E_EXPECTED_SOURCES` names 1–8;
  - the preflight waits for a staging apply: on "STAGING BEHIND" it retries every 30 seconds for up to 25 minutes, so a migration turn's run continues once the operator has applied the file on ethio-staging instead of needing "Re-run failed jobs". Any other preflight failure fails at once; still behind after 25 minutes fails as before.
- .github/workflows/nightly-e2e.yml: the nightly (about three hours, serial, with the @global-state specs) moves from 06:00 to 18:00 UTC. .github/workflows/feed-bench.yml: the Sunday bench from 05:10 to 16:10 UTC, before it. Both shared ethio-staging with the operator's CI runs (the nightly of 2026-10-10 failed SC-4 on a statement timeout — INC-545 class).
- The decision rule, frozen now: over the next five green runs on dev, a median wall time above 29 minutes, or two reds from staging load (statement timeouts, transport), returns the matrix to six; a median of 26 minutes or less keeps it.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `prim.state.error`)
- prim.date.pick — en "Choose date" · am "ቀን ይምረጡ"
- prim.date.clear — en "Clear date" · am "ቀኑን አጽዳ"
- prim.date.next — en "Next month" · am "የሚቀጥለው ወር"
- prim.date.previous — en "Previous month" · am "ቀዳሚው ወር"

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The calendar opens inline under its field (never a second layer over a Filters sheet or a form).
- The category window keeps the browser's field: it carries a time and has no bounds.
- The nightly at 18:00 UTC and the bench at 16:10 UTC on Sundays (the operator may name other hours).

TESTS
- Unit, NEW src/components/shell/date-field.test.tsx: DF-1 (a day after the latest bound is disabled and the month cannot move past it), DF-2 (the same before the earliest bound), DF-3 (a chosen day is written as YYYY-MM-DD, shown, and the calendar closes; clear empties it), DF-4 (the month named in the page's language), DF-5 (a day survives the round trip; a day the calendar lacks is refused).
- src/test/pool-reset-map.test.ts: not edited (part 0 makes it pass).
- e2e/admin-audit.spec.ts — AS-3: the dates are picked through the calendar (From's next-month arrow disabled and tomorrow disabled when it is in this month; today chosen; To's previous- and next-month arrows disabled and yesterday disabled when it is in this month; the chip as before).
- e2e/admin-listings.spec.ts — AL-1, AL-3, AL-5, AL-8, AL-9 as in part 0.
- Not edited: every other test.

DOCS
- display-primitives.md (the house date field), admin-audit-security.md, admin-listings.md, posting.md, ci-guards.md (DEC-171), nightly-e2e.md and feed-engine.md (the new hours), the changelog, the roadmap (line 3; the L1b line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L1 applied)
- typecheck, format, lint (0 errors, 33 warnings), 648 unit tests (103 files; the pool-reset-map test red without part 0's map line and green with it; the action-label check), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the selector self-test, the build and the bundle budget: all clean; actionlint on the three workflows: clean.
- A local render (Chromium, a node build, mocked rows) of Audit's Filters at 360 and 1280 px: the From calendar opens under its field inside the sheet; tomorrow and the next-month arrow are greyed; choosing today closes the calendar and keeps the sheet open; To's arrows are both greyed; Escape closes the sheet and the "From …" chip shows; no sideways scroll.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-17.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 63f6b687…, conclusion FAILURE (run 38126648954) — part 0 is its red). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the browser run;
  9. the report;
  10. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-17.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 21 files → each equal to:
  282487a7ee13336e115f61e34585b40b81a9696e4cfb0ba28608efe7ed6b9843  .github/workflows/ci.yml
  42bdec7e9ba6032020c934b836cb400a96e297126f2d974617578ee73888b00e  .github/workflows/feed-bench.yml
  5c84b409710c87bc567f66af324da0bf878ca8a048caf1a0e8a47c860d661e07  .github/workflows/nightly-e2e.yml
  630f84e2e75b84469bc01d37b38ced03fb101a83b49c020ccd7eab864b9aee84  docs/_changelog.md
  3ddbf8bea41a884b1ef71163ab875eed3dd6e7a87343f1848d0ff2e7bfab015a  docs/features/admin-audit-security.md
  fcc896d86f55ac275d28b671f4f75f858064552dc69e2fa53dde792595f5acaf  docs/features/admin-listings.md
  48325e79a9612e687cb84241e6c2e2e249a738c17c2c04ea9adc2377d76ffbcd  docs/features/ci-guards.md
  86e48cdd1d4fa86ce6fe47992ea1076370e3786eee7ac6d7609b607d46f5a16c  docs/features/display-primitives.md
  a8e10af332d1fb7fec0747e624b3e95a23f43fcf72e4d002bbe59e4bcf535044  docs/features/feed-engine.md
  931248c62a0dd4717a6e841f61198e6ff2d8272f3589da790f46bf3040277259  docs/features/nightly-e2e.md
  787c11022e96607b6bacd416893a61c52176153c5f99a361d7fe81e2cef5f70f  docs/features/posting.md
  560c286941c8369f13613bfbd14b001b58492cfb68a43c59fccd852657bf88cf  e2e/admin-audit.spec.ts
  1bef04c6a9b927c3b294558faf4c819d1310f24876594a2846fb81687223f546  e2e/admin-listings.spec.ts
  a7ad3b85fa7452c1211036be1ed144037383e3c1ae9b677bda3c8180531fee37  e2e/helpers/pool-reset-map.ts
  005550846b49d2295ec9d514ccf24bae2d20873b397df28cf23c3ca95feb5937  e2e/helpers/users.ts
  3042f94af69c52141bbd53f65549e8ec933eb1f367a8de654829b1d161667398  roadmap.md
  6baf77b1a74ec9872f81fa0dbf0dd4960393c907a30df8b8da18e9d0be5dd3f5  src/features/admin/audit/audit-page.tsx
  ae9740dc1450a3cc8e687eb8a384faafd4739cf5883c0f64fa89aa0cf90f412f  src/features/posting/step-review.tsx
  221d4b375a884e677c64bec8839d9b860aab8d408425ef1e7de522ac3049f8e2  src/features/posting/step-specifications.tsx
  899cc3db87dfad1295ac2284c76afa88b32e29b3f48f6820924e20a1da794c86  src/i18n/locales/am.ts
  d9c1ab299317a0587ee4bd244ed2acbae61923ff17395cbd20ca4e5e12bda963  src/i18n/locales/en.ts
- (c) `ls src/components/shell/date-day.ts src/components/shell/date-field.test.tsx src/components/shell/date-field.tsx` → "No such file or directory" for each.

THE CARRIER — L1B-TURN-CARRIER-2026-10-11.md (33,353 bytes; sha256 06487ba7e55b0b2f8bdf94733462a21019e53198a10d6ebd96de8147f7e774c8; 63 sections)
- Its first line starts "L1B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the four new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 26 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  5b81d956bbc6a9a2707126d05a6b3b3b7658e1f6c8cabe760956a2a31cd37c1a  .github/workflows/ci.yml
  c57b7a51b4714ae11c073aaadb7f0115c72bceca3a5a3f0672e9e67adba2e0a5  .github/workflows/feed-bench.yml
  69a53e9347e18774c3a07d2a6f2c1c9b43eebc7c5379316c36c0286d70b4df99  .github/workflows/nightly-e2e.yml
  72e8f8115d3bb347c3886a0ed23c887ebe09b02f80ec667398689848689381c1  docs/_changelog.md
  2a5560b3a0fbd7ee753923582d693f13c265f6273cf6cbe91604bd6751e3db46  docs/features/admin-audit-security.md
  b722489d59a5cadeedc996fa06caea0dd5efc73957db2013f23730cca6d1cd76  docs/features/admin-listings.md
  b5c762f9ebb1ee44345e9e8f73a067bc13f355a2fa4e84345f48ff93fc30e45c  docs/features/ci-guards.md
  bede384f13c16e2993648639379998dccee1699c5b03c0649dad2f5f80fb157c  docs/features/display-primitives.md
  306894285f25e183735049df125ca739269c0b0c901344e2750c5644fc2b1efe  docs/features/feed-engine.md
  ebec31a77c1ca98a798c5a7d37481baac8e822f3148cfeea8b8c53096cc8a365  docs/features/nightly-e2e.md
  2ef9fa786bc682646d85b38cd8866f28163861753d771155c0e7419ae2ad95e9  docs/features/posting.md
  87449a67c3a95de72e6c889582df05518efc7236ecd92ea296fbe12575f657ca  docs/generated/i18n-usage.json
  b82dd25641071c5429fa88f9f19679a5591284cb5907be69f887617fc8dcb434  e2e/admin-audit.spec.ts
  dce5ce42d75e2bc5fc4fae9914b1db42fd802395ba11ed634d9bc1281bb589bb  e2e/admin-listings.spec.ts
  6f0303d10a87d6c0c3b4b431e6f082483ade861daac1f14b03b79ad1d17b93b5  e2e/helpers/pool-reset-map.ts
  448ec65e439546382953f5d7207ad7c45f3d98d4d2f25d8e6b1a636fc05734ff  e2e/helpers/users.ts
  87449a67c3a95de72e6c889582df05518efc7236ecd92ea296fbe12575f657ca  public/i18n-usage.json
  763f6be1fcad77321ef6b2481fe8981fc317b3673ea7f034e48cf7501081b214  roadmap.md
  33a79bec01524c7db61aba906df92a5d36704242a32c6f94cd3047eb56a1da4e  src/components/shell/date-day.ts
  a6c42757f81222065ceeae31e99fa69dc2d05b284695ce96f4a8fa2f39f41117  src/components/shell/date-field.test.tsx
  fc3b4122f2849a64b6b77517105dff18c6e253d359e49110cb90402257f3ede3  src/components/shell/date-field.tsx
  cc87d0ceba64df1ce9b23a2791e53608073b42c24027b3e8a8f9c77706936ea0  src/features/admin/audit/audit-page.tsx
  8aa4258487b12e39d5ab370f473c96d6dd8999018cd2dcc651abb55a76444387  src/features/posting/step-review.tsx
  73fd50cfe84f982656f7cb7877a7125891dd36acc6ff2c8221cab11375609d9b  src/features/posting/step-specifications.tsx
  c2c5343db575cd706dd859f69acb7a1e615c91b687438d87aff22b02573d3d45  src/i18n/locales/am.ts
  32198398859a1aeb01c09ee8d225e8771ce5b483dd32442a64f1a427dfd16a1e  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 648 passed (103 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-audit.spec.ts e2e/admin-listings.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 26 sha256sum lines and the brief's.
- `git diff --name-only 63f6b687bce2b38600161b0fd1042457c10bf441` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 63f6b687bce2b38600161b0fd1042457c10bf441 HEAD` too. Expect 27 paths: the hashed paths and the brief.
- The four new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing while CI runs (with eight shards, ESTIMATE about 25 minutes); then the supervisor's walk lines; Publish after the supervisor reads CI green (L1 and L1b go out together).
```
