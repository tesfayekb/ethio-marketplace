# Bundle 10 follow-up — turn 10: D106 part 2, the shell keeps the browsing place on the account: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 10 (2026-10-10). ONE TURN. No migration, no database change, no new string, no package change.
Base: dev 8804f210. This file is public: it is written as build instructions. Tier A (the account's place, at sign-in).

ANSWERS TO TURN 9
- Verified by diff of 270ee85f..8804f210: the seven carrier paths and the brief byte-identical to the supervisor's copy; the migration file equals the appendix with <MARK> = 20261010190000, byte for byte; src/integrations/supabase/types.ts regenerated with the two columns and the two doors (allowed).
- CI on 8804f210 (run 38032736100): attempt 2 GREEN after the operator's staging apply, promoted (main = dev); VP-1..VP-5 passed. Turn 9 is CLEAN.

WHAT THIS TURN BUILDS (D106, approved by the operator on 2026-10-10)
- The rule, in his words and choices: the place picked in the location row is saved on the device for everyone and, when signed in, on the account; with nothing saved on the device or the account, the IP guess shows on the first load; a change is saved and is what shows on the next visit; when the device and the account disagree at sign-in, the NEWEST pick wins; the guess is never saved; "any area" clears.
- The cookie `ethio_area` carries the pick's time: `<CC>:<uuid>:<ms>`. A cookie written before today (`<CC>:<uuid>`) still reads, with no time — it counts as older than any account pick. location-data.ts (`SavedArea.at`, `parseAreaCookie`, `writeAreaCookie(country, id, at = now)`); the SSR shape check in src/routes/__root.tsx accepts both shapes.
- New: src/components/shell/place-carry.ts (pure: `parseAccountPlace`, `chooseCarry` — the newest-pick rule) and src/components/shell/place-carry-service.ts (the two doors: `readAccountPlace`, `saveAccountPlace`). NULL clears; the generated argument type is not nullable, so the call casts, as the language door's caller does.
- app-shell.tsx:
  - every pick (a market's anchor, a deeper place) writes the cookie and, when signed in, saves to the account; "any area" clears both; the account saves run one after another in pick order; the account's answer stamps the cookie with the account's time only while the cookie still names the same place; a refusal or a failure logs one `[location]` line and leaves the browser's pick;
  - the sign-in carry runs once per signed-in identity (keyed by the user id, released on sign-out): it reads the account's place and applies `chooseCarry` — apply (write the account's place into the cookie and derive the place again, as the sign-out reset does), align (same place: take the account's time), upload (save this browser's pick), or nothing;
  - the context gains `accountPlace` ("off" | "pending" | "done"); the location row shows it as `data-account-place`.
- e2e/helpers/users.ts: the pool reset clears `viewing_location_id` and `viewing_location_at`, so a leased account starts with no place.
- e2e/shell.spec.ts: LS-11's cookie expectation reads the time after the place (one line).
- Tests: PC-1..PC-6 (new unit tests, place-carry.test.ts); VP-6..VP-11 (new, e2e/viewing-place.spec.ts): a pick while signed in is saved on the account and "any area" clears it; another browser opens on the account's place and keeps it after sign-out; this browser's newer pick wins and is saved; the account's newer pick wins; a cookie without a time loses; with nothing saved, the guess shows and nothing is saved.
- Docs: location-scoping.md (part 2), the changelog, the roadmap.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-10.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 8804f21 SUCCESS). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the report;
  9. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-10.md`, or nothing if the platform has already committed the brief.
- (b) `sed -n '315p' e2e/helpers/users.ts | sha256sum` → bcc33409a91a36a2807593b950313023f65fdf1f99a608534121c1140694925d
- (c) `sed -n '2742p' e2e/shell.spec.ts | sha256sum` → 2a882323af3c82167546a4ed3d166b19de2b06cea6eee700c2601bfa4f02173f
- (d) `grep -c "user_set_viewing_location: { Args: { p_location: string }" src/integrations/supabase/types.ts` → 1
- (e) `grep -c "writeAreaCookie(" src/components/app-shell.tsx` → 2

THE CARRIER — D106-TURN10-CARRIER-2026-10-10.md (134,920 bytes; sha256 e4d0975d4dcd03c520beef7f5b46caacfe8feb88c421b7660468027c2d4bb1c5; 14 sections)
- Its first line starts "D106 TURN 10 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE (the whole file);
  - NEW (a file that must not exist yet);
  - APPEND (added at the end of the file);
  - REPLACE-LINES <a>-<b>: replace lines a through b of the file — both included, counted from 1 — with the section's lines. The section ends with a newline; that newline ends its last line and adds no empty line.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (two new source files are scanned), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 16 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  a8c0ad760fbd206dd6c4710cf26265b94660bc0455c16c7ad4d234d7830d5131  src/components/shell/place-carry.ts
  fbcecdef4150a640b02682770b813dfc7c5f3d04a5ffd908a716952b3d1430e9  src/components/shell/place-carry-service.ts
  08006ecee926fb91dd9711afcc9a4c83d7436e74092dd7619f777d50dcca42cb  src/components/shell/place-carry.test.ts
  a1577722d3b91f2b82c0d7e9313117a12801488b56665a3a83b4e3c3f1d2910c  src/components/shell/location-data.ts
  20ce56161f4e1ea6d0ee010ac073cbd45a898803078782b88a808739d22da663  src/components/shell-context.ts
  045020d2fec56e3c4d3369d96f91b6f67183ad6aaa83c8f2a8ed5d2036aa92a0  src/components/shell/location-selector.tsx
  beb6d8ea7f1fb141409799b6fbc46d217b065750a4a32a217761ad3f605fe6a9  src/components/app-shell.tsx
  46da9820b9d5416d3e14b47dbd4bb9bc1f86dd9f1004444a1ab109fcb3e80668  src/routes/__root.tsx
  502e78046bbb8a897b78702a913c398e45050e2eda906180231c1823d3144362  e2e/viewing-place.spec.ts
  005550846b49d2295ec9d514ccf24bae2d20873b397df28cf23c3ca95feb5937  e2e/helpers/users.ts
  2e2cef8bb570e592191f107b60e187d8dbfc9b7bc3358bc519e46cf1546ba2fd  e2e/shell.spec.ts
  76096a9c8eeed8a9f65b135eeb6181008113ef0d9877e74017b5043893e1156f  docs/features/location-scoping.md
  e7447c4d195af145dc928101c7e95ac73aef465980be137c9aa88ac8aa004c36  docs/_changelog.md
  d04d766aa9d9d5e33cd353d4182dbacf4afe10d5769ac3054d2ae2e3ad546b19  roadmap.md
  2aa93b473759927245c3c09c18188bfd13656c4ae9a0abd4e644af6f3eeb3ee4  docs/generated/i18n-usage.json
  2aa93b473759927245c3c09c18188bfd13656c4ae9a0abd4e644af6f3eeb3ee4  public/i18n-usage.json

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 601 passed (91 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/viewing-place.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(e).
- The 16 sha256sum lines and the brief's.
- `git diff --name-only 8804f210` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 8804f210 HEAD` too. Expect 17 paths.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then sign in on two devices (or two browsers) and check that the place picked on one shows on the other.
```
