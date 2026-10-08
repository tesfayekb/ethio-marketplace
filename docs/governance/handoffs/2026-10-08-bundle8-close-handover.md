# HANDOVER — 2026-10-08 — bundle 8 closed; its tables; the house style agreed and not built; what is next and what is in flight

Written by the supervisor thread that wrote the handovers of 2026-10-05, 2026-10-06 and 2026-10-07, at the close of bundle 8. It SUPPLEMENTS `docs/governance/handoffs/2026-10-07-bundle7-close-handover.md` and, through it, the earlier ones (who is who; what the operator has ruled; the curator): those sections still hold and are not repeated. Everything that changed between 2026-10-07 10:45Z and 2026-10-08 00:40Z is here, and spec-ledger block S57 carries the full narrative. The successor reads, in this order: this file; `docs/governance/system-state.md`; the tail of `docs/spec/spec-ledger.md` (block S57; its last paragraph is the numbering); the root `roadmap.md` (its line 3 says no brief is in force; the "Bundle 9" block is the agreed house style); `docs/governance/briefs/bundle-9-census.md` with its "Not read" section; the `ci-evidence` branch; the tail of `docs/tracking/incidental-findings.md`.

## 1. STATE AT HANDOVER

### 1.1 Repository

- dev = `40d99978` (the prep turn's last commit, 2026-10-08 00:15:19Z) and main = `858b2137` when this record was built at 00:40Z: CI run 37706785180 on `40d99978` was still running — every guard, the build, the preflight, the fast lane, the email lane, the smoke tier and shards 2, 3, 5 and 6 green, shards 1 and 4 in progress; a green end promotes main to `40d99978`, and this records turn's own run judges the same code again. Eleven `lovable-*` side branches on the remote, the known set (a twelfth is a stranded turn, G30).
- Bundle 8 (`docs/governance/briefs/bundle-8.md`; the saved copy is version 3, 33,035 bytes, sha256 `d4b904271f534fbcb5e224be1c4a732605081fd824e007f4ec4fae1df734b532`) CLOSED: three executor turns, 2026-10-07 12:5xZ → 22:26Z, the third in three sittings; its last code commit is `858b2137`. Every step verified against the diff (G30).
- Published site: `858b2137` (the operator's Publish at the close, 2026-10-07 between 22:26Z and 22:59Z).
- The close's walk (four lines, on the published site): all yes.
- After the bundle, one turn from `docs/governance/briefs/bundle-9-prep.md` (10,986 bytes, sha256 `c42794ef89dbaef0cb96ddf330b620f65b8de25332356150d51f3926838ddced`): the harness change of DEC-160 and `docs/governance/briefs/bundle-9-census.md`. Seven files, none outside its list.
- No brief is in force until bundle 9's step 0.
- Highest test ids: PW-177, PR-42, AT-77 (with AT-73b and AT-76b), CT-42, IB-3, LT-15, TR-35, IG-5, CO-8, LS-13, AU-12.

### 1.2 Databases

- ethio-prod and ethio-staging both hold M13 and M14 (§2.2). ethio-prod also holds a comment-only placeholder applied in error (INC-491); M14 writes its ledger row on both, and the file itself is not applied on staging. The newest mark by value is `20261008050000`: the next migration's mark is chosen above it and above the current time (G39).
- Production reads of the period (counts and names of roles only): before M14 — 239 functions of schema public executable by a browser role (159 definer, 80 caller's-rights), 58 by anon, 31 of those the text-search extension's, so 27 outside extensions, 15 of them open only through PUBLIC; postgres's default privileges handed new tables to both browser roles. After M14 — the third lint's count 12; default privileges in public: tables postgres and service_role only, sequences and functions postgres only; marks `20261007150540` and `20261008050000` present; the answer door's header unchanged. 88 attribute definitions hold options with an `allowed` list (1,162 of 5,781 options); eight of 136 listings with answers held a combination outside one — kept by the door's stored-combination rule.
- Leaked-password protection: ON on ethio-prod (seen working by the operator at the walk); OFF on ethio-staging by decision (DEC-155).
- The live text store after the close: the seven Amharic rows of `docs/governance/briefs/bundle-8-am-import.csv` imported and approved (the operator's report); "Sync keys" not confirmed — before the Publish the store held 579 keys per language against 2,070 in the code, and a press adds the rest and brings eleven English texts level.

### 1.3 Catalogue

- 169 categories · 570 definitions; nothing imported in the period.
- The curator's "seen, not built" note on C35 was answered on 2026-10-07 22:35Z in one message (rule R1 as enforced — page, order number, key; `imei_registered` stays unlinked; WAITING unchanged) and ONE plan is asked: "C36 — phone locks and SIMs", research and plan only, no rows — an account-lock tick-box, eSIM and the SIM question, the help of `sim_unlocked`. The message is the operator's to paste. Rows follow only after the supervisor's corrections and the operator's rulings (the Amharic labels are his).
- Held until the form changes: `product_origin` and `origin-food` (D75). Waiting: the Tigrinya finder words; the two cubic-metre wordings; the rent and hire periods.

### 1.4 Security (DEC-132)

- Layer A on; push protection OFF until the supervisor's call of 2026-10-09.
- Layer B: the database lints' baseline is 0 / 0 / 12 / 0 / 0 (`scripts/security-lints-baseline.json`); the migration check's born-closed rule (`FUNCTION_REVOKE_FLOOR="20261007143529"`) asks every new function for an in-file REVOKE that names PUBLIC; the public-surface allowlist is unchanged. The Semgrep job's "Upload SARIF" step turns the job red when the host's upload fails (INC-492) — a tidy-up item.
- Layer C: the weekly reviewer's first scheduled run is 2026-10-12.
- Nothing is held back from the repository at this close: INC-477, INC-480, INC-482 and INC-490 are fixed on ethio-prod and their texts are in the incident ledger.
- The platform linter's remaining lines are ruled: "Extension in Public" (pg_trgm stays — DEC-157); the definer-function lines are the named doors.

### 1.5 CI and platform

- Run 37696163167 on `858b2137`: attempt 1 red in the email lane only (INC-493), attempt 2 green and promoted. Run 37706785180 on `40d99978` (the prep turn) was still running when this handover was built: every finished job green (the guards, the build, the preflight, the fast lane, the email lane, the smoke tier, shards 2, 3, 5 and 6); shards 1 and 4 in progress.
- DEC-160's five CI runs are counted from run 37706785180: no lane red in its setup, and the email lane's whole job inside 40–65 s (it was 61, 46, 42 and 42 s before the change and 56 s on the first run with it). The supervisor cannot read a setup's log line or its timing; bundle 9's first code turn owes the setup's duration with and without the block.
- The nightly of 2026-10-08 (06:00Z) is not yet read: it judges INC-487's rule for PW-153, DEC-153's nightly half and the second of DEC-148's seven runs.
- GitHub had an incident with Actions on 2026-10-07 15:06–15:16Z (and 16:52–17:01Z): uploads failed and the status-report run sat queued; such a run is read through the public Actions API (jobs and annotations).
- The package `@lovable.dev/vite-tanstack-config` is at 2.25.3. A platform bump is read by comparing the two public tarballs (`npm pack`) before it is ruled; a 2.26.x brings DEC-158's walk rule back.
- The server-error census carries one standing message off the allowlist: "listing not found" (INC-398, 6 lines on the last run) → the tidy-up round.

### 1.6 Records

- This landing: spec-ledger block S57 (DEC-155–160; D82–D86; slips S118–S122; the class rules), incidental-findings INC-488–494 and the status amendments, `system-state.md`, `docs/tracking/action-tracker.md`, the root `roadmap.md`, `docs/governance/launch-gate.md` (three lines), the running record of the period, this handover and its manifest, one changelog line.
- Numbering after this landing: next free INC-495; DEC-161; D-rulings D87; slips S123.
- Project docs (private, the supervisor's): `claude/running-record-2026-10-05-thread2-part3.md` (the source of block S57); the plan document "ethio.com — what to build next, and why" (its main tab carries the house style's eight lines and bundle 9's place since 2026-10-07); the design canvas "ethio.com house style — proposal" (five boards with levers; the drawing the operator approved — it exists only in his account, and the roadmap's bundle 9 block is its written form).

## 2. BUNDLE 8 IN TABLES (compiled by the supervisor from the repository)

### 2.1 The turns

| Turn | What | Commits | Last commit (UTC) | CI on the last commit |
| --- | --- | ---: | --- | --- |
| 1 | Brief v1 saved; the four censuses (privileges, the answer door, the auth client, labels and live texts); Part C (the leaked-password message); Part E (PW-147, PW-130) | 17 | `5a8c4df1` 10-07 13:13 | 37626895782 SUCCESS, promoted |
| 2 | Brief v2 saved; Part B with M13; PR-41; the migration check's born-closed rule; Part A's statements not written (the brief's own guard: fifteen functions, not fourteen — S118) | 11 | `bd9a7032` 10-07 14:37 | 37638282428 FAILURE — the preflight only (staging behind until the operator's apply) |
| 3, first sitting | Brief v3 saved; Part D (the strings, the label check, the import file); PR-42; Part F's documents; stopped before M14 — a placeholder migration applied in error (INC-491) | 5 | `6c2cd603` 10-07 15:06 | 37642304891 FAILURE — the migration linter and the preflight (the placeholder), and the scan's upload during the host's incident (INC-492) |
| 3, second sitting | Ruling 1 could not be performed (the draft was gone — S119); nothing changed; the platform set its package back to 2.25.3 | 3 | `181b8db8` 10-07 22:05 | 37693892001 FAILURE — the linter and the preflight only |
| 3, third sitting | Ruling 2: M14 rebuilt from the brief and applied (Part A, step B7, the placeholder's ledger row); the allowlist line; the lint baseline 12; one AGENTS.md line; R-4's three reads (INC-493) | 7 | `858b2137` 10-07 22:26 | 37696163167 — attempt 1 FAILURE, the email lane only (INC-493); attempt 2 SUCCESS at 10-08 00:09, promoted |
| after the bundle | `bundle-9-prep.md`: the English reset in every setup (DEC-160); the census for bundle 9 | 6 | `40d99978` 10-08 00:15 | 37706785180 — running when this was built; every finished job green |

Forty-three commits from `205681a8` to `858b2137`; most are the platform's own "Changes" and "Work in progress" pushes. The estimate of three turns held as turns; the third needed two rulings and seven hours of wall time, one for the executor's placeholder (INC-491) and one for a ruling step that leaned on a scratch file (S119).

### 2.2 The migrations

| Name | File | Lines | Mark | What |
| --- | --- | ---: | --- | --- |
| M13 | `supabase/migrations/20261007143529_3d265632-76e8-43c6-98f4-a673378d2cfd.sql` | 492 | `20261008040000` | `validate_listing_attributes` redeclared whole from the live definition: the fold of an option's `allowed` list and a fourth refusal case (`optionNotAllowed`), a stored combination kept; proofs on scratch rows |
| (placeholder) | `supabase/migrations/20261007150540_e41a9cb4-6d28-4fd3-9757-82a8a35777ca.sql` | 1 | none of its own — ledger row `20261007150540` written by M14 | a comment only, applied on ethio-prod in error (INC-491); named in `scripts/migration-mark-allowlist.txt`; not applied on ethio-staging |
| M14 | `supabase/migrations/20261007222234_fc6110fd-d52f-4aae-803b-576741e9288f.sql` | 699 | `20261008050000` | the door's entry trim (one block after BEGIN); the three per-schema default-privilege revokes; EXECUTE revoked from PUBLIC, anon and authenticated on fifteen functions, twelve of them granted to service_role; proofs; the placeholder's ledger row |

Each was applied on ethio-prod by the executor's tool on save and read back there by the specific mark, and on ethio-staging by the operator; the E2E preflight's pass on the next run proves the staging mark.

### 2.3 The files

`git diff --stat 205681a8..858b2137`: 37 files, +3,119 −123 — 14 added, 23 changed. Added:

- Briefs: `docs/governance/briefs/bundle-8.md`, `bundle-8-ruling-turn-3.md`, `bundle-8-strings.json`, `bundle-8-labels.csv`, `bundle-8-live-text.csv`, `bundle-8-am-import.csv`.
- Migrations: the three files of §2.2.
- App: `src/features/auth/auth-error-key.ts` with its test.
- Scripts: `scripts/list-action-labels.ts` with its test, `scripts/action-label-allowlist.txt`.

Changed (23): `src/features/auth/auth-service.ts`, `src/routes/auth.tsx`, `src/features/posting/step-specifications.tsx` (one comment), the two catalogs `src/i18n/locales/en.ts` and `am.ts`; five spec files under `e2e/` (`auth-callback`, `auth-signup`, the nightly's `auth-resend-exhaustion`, `post-wizard-bundle2`, `posting-routes-catalog` — PR-41, PR-42); `scripts/check-migrations.sh`, `scripts/migration-mark-allowlist.txt`, `scripts/security-lints-baseline.json`; three feature documents (`attributes.md`, `ci-guards.md`, `translations.md`); `AGENTS.md`, the changelog, the root roadmap; the two generated i18n-usage files; `package.json` and `bun.lock` (the platform's bump to 2.25.3).

The prep turn after it (`858b2137`..`40d99978`): seven files — `e2e/global-setup.ts`, `scripts/en-baseline-heal.ts` with its test, `docs/features/e2e-harness.md`, the changelog, and the two files under `docs/governance/briefs/` (`bundle-9-prep.md`, `bundle-9-census.md`).

### 2.4 The strings (each equal on dev to the brief's text, compared by script on `40d99978`)

Thirty-three keys set — the leaked-password message of turn 1 and the thirty-two of the table `docs/governance/briefs/bundle-8-strings.json` — and three removed (`auth.alreadyConfirmedSignIn`, `auth.toggleToSignIn`, `auth.toggleToSignUp`).

| Key | English | Amharic |
| --- | --- | --- |
| `auth.errorLeakedPassword` | This password appeared in a known data leak. Choose a different one. | ይህ የይለፍ ቃል ሾልከው ከወጡ የይለፍ ቃሎች መካከል ነው። ሌላ ይምረጡ። |
| `admin.attributes.export.busy` | Exporting… | በመላክ ላይ… |
| `admin.categories.export.busy` | Exporting… | በመላክ ላይ… |
| `admin.locations.export.busy` | Preparing file… | ፋይሉ እየተዘጋጀ ነው… |
| `admin.categories.bulk.generateMissing` | Generate missing | የጎደሉትን አመንጭ |
| `admin.countries.close.forceConfirm` | Close anyway | ቢሆንም ዝጋ |
| `admin.countries.rail.reset` | Reset order | ቅደም ተከተሉን መልስ |
| `admin.coverage.create.open` | Add plan | እቅድ አክል |
| `admin.locations.create.open` | Add place | ቦታ ጨምር |
| `admin.locations.action.createChild` | Add place inside | ውስጡ ቦታ ጨምር |
| `admin.translations.add.fromList` | Choose from list | ከዝርዝሩ ይምረጡ |
| `admin.translations.add.manual` | Enter manually | በእጅ ያስገቡ |
| `auth.backToSignIn` | Back to sign-in | ወደ መግቢያ ተመለስ |
| `auth.resendCooldown` | Resend in {s}s | በ{s} ሰከንድ እንደገና ላክ |
| `auth.telegramSlot` | Telegram coming soon | Telegram በቅርቡ ይመጣል |
| `mfa.enroll` | Set up two-factor | ማረጋገጫውን ያዋቅሩ |
| `mfa.verifyActivate` | Verify and enable | አረጋግጠው ያብሩ |
| `nav.postListing` | Post listing | ማስታወቂያ ይለጥፉ |
| `post.assist.action` | Write for me | ለእኔ ይጻፍልኝ |
| `post.pin.remove` | Remove pin | ምልክቱን አስወግድ |
| `post.review.fixStep` | Open step {step} | ደረጃ {step} ይክፈቱ |
| `post.review.previewAsBuyer` | Preview as buyer | ገዢዎች እንደሚያዩት ይመልከቱ |
| `post.specs.optionsLoading` | Loading choices… | ምርጫዎቹ በመጫን ላይ… |
| `post.specs.useModelValue` | Use model's value | የሞዴሉን ዋጋ ይጠቀሙ |
| `post.where.addCity` | Add city | ከተማ ጨምር |
| `post.where.addCountry` | Add country | አገር ጨምር |
| `post.where.addRegion` | Add region | ክልል ጨምር |
| `settings.removePasswordConfirmYes` | Yes, remove | አዎ፣ አስወግድ |
| `settings.signOutOthers` | Sign out others | ከሌሎች መሣሪያዎች ይውጡ |
| `settings.signOutOthersConfirmYes` | Yes, sign out | አዎ፣ ያስወጣቸው |
| `auth.alreadyConfirmedPrompt` | Already confirmed? | አስቀድሞ ተረጋግጧል? |
| `auth.toggleToSignInPrompt` | Already have an account? | አካውንት አለዎት? |
| `auth.toggleToSignUpPrompt` | New here? | አዲስ ነዎት? |

## 3. IN FLIGHT AT HANDOVER

- Executor: idle after this records turn. Nothing is addressed to it until this turn is verified and bundle 9's brief is delivered — and that brief is written only after the supervisor has explained the bundle to the operator part by part (his standing directive).
- Curator: one message waits with the operator (§1.3); its answer is a plan, not rows.
- Operator steps owed (none blocks the executor): paste the curator message; press "Sync keys" once if it was not pressed after the Publish; at his next look at GitHub's Security tab, say whether the code-scanning list is empty; optional, as before — the Claude GitHub App install, a usage budget or alert at the map provider, the mailboxes legal@ and privacy@ and a native reader of the Amharic legal text before stage 1's texts go live, the sending domain for e-mail before stage 6.
- Supervisor's dated duties: 2026-10-08 after 06:00Z read the nightly; 2026-10-09 the push-protection call; 2026-10-12 the weekly reviewer's first scheduled run and DEC-083's date; DEC-160's five runs; the E2E account pool before 2026-11-01.

## 4. THE PLAN AHEAD, IN ORDER

1. This records turn (documents only) → verified by sha256 against the manifest → CI green.
2. Bundle 9, the house style — explained to the operator part by part (with the bottom bar's five items, and 36 px menu rows for mouse devices against 44 px for touch), then one brief. Its parts as they stand: (a) tokens by meaning, corners, borders, shadows; (b) the shared blocks — row actions, the icon button with a required name and tooltip, one field, one switch — and the table's toolbar, chips, selection bar and three-zone footer, cards on a phone; (c) the shell — bars that stay, the icon strip, Sign out at the menu's foot, the phone's bottom bar, one page padding; (d) one written rule and one automatic check per element with a baseline that only shrinks, and Knowledge C8's row rule changed; (e) the existing screens moved. The brief names every test and written law that pins today's look (census section J) and is written from the supervisor's own read of the code at the census's addresses. ESTIMATE five to nine executor turns.
3. Stage 1, the rules — the Pass-2 spec of L1 with its "checked against" list; the banned-items and safety pages (with a line on devices locked to another person's account — the operator's rule); the three answers the operator owes at that stage.
4. The tidy-up round (ACT-009), with what bundles 7 and 8 named and did not build (blocks S56 and S57 list them).
5. Stage 2, automatic screening (DEC-145) with translation of every ad (DEC-149); stages 3 to 7; the launch round; opening; stage 8 with reviews and ratings (DEC-150). The public marketplace pages (cards in two columns) are designed under the house style when their stage comes.
6. Beside the executor's turns: the rulebooks (instructions v1.14 and Knowledge v3.11, delivered whole — they carry §5 below and the rules of blocks S55 and S56); the plan document brought level with this close.

## 5. RULES ADOPTED IN THIS PERIOD, NOT YET IN THE INSTRUCTIONS (in force from the day adopted; carried to the next version — G46)

- The stop report of a migration that says the production apply succeeded is the operator's cue to apply on staging and re-run the failed jobs; he does not wait for the supervisor. He does not apply when the report says the apply failed or ends in a question. "Wait for my go" is written only with its reason, for a migration that removes or rewrites existing rows (D86; S121).
- The database tool is handed a migration's final text once; a scratch draft does not outlive the turn (INC-491; in AGENTS.md).
- A ruling or brief step never depends on a file in the executor's scratch space surviving a turn boundary (S119).
- A database expectation in a brief comes from live rows the executor pasted; where only a static reading exists, the brief says so and has the statement shaped from the rows read (S118).
- A function that judges an answer normalises it once, at its entry (INC-490).
- Every bundle-close CI read includes `nightly-status.md`'s conclusion line.
- A platform package bump is read by comparing the two public tarballs; a change only the platform's own build makes is judged on the published site (DEC-156, DEC-158).
- A rule restated to an agent carries the term that decides its edge cases, quoted from the code that enforces it (S120).
- A line-by-line census is its own turn or the supervisor's own reading; a proof asked of the executor must be able to fail on the day it is run (S122).
- The close of a bundle that changes an existing string carries three numbered operator steps: "Sync keys", the Amharic import, "Approve all reviewed" after checking its count (INC-488).
- A changed English label is found in a test by test id; where a test must find it by its words, the pattern is built from the compiled catalog, and the setup resets the store's English texts before the tests in every lane (DEC-160).

## 6. WHAT THE OPERATOR SAID IN THIS PERIOD (his words; block S57 and the running record have each at its time)

- On working beside a running turn: "why dont you continue working on next task on the background?"
- On the plan: "Lovable is working, Is this an additional bundle that was not there in previous plan?"
- On rules for the look: "can we make rules how the other looks like, such as tables, etc etc so we have uniformity and lovable doesnt make mistakes? … suggest more improvemnts that need to go into tests so we dont have to fix aFTERWARDS"
- On the look he wants: "OK i WANT TO HAVE A PHP FILAMENT LIKE DESIGN … COLOR JUST SAME COLOR BUT MAY BE MORE SHARPER … uniformity of 3 dots, uniformity of edit delete etc buttons, making icons instead of long text buttons esp small screens with the color to suggest each action … I dont want each and everything there, just with out color, but clean, feel and look consistent and same"
- On the whole page: "agree with all as designed … Top bar should not scroll up on mobiles, the left menue bar instea dof being hidden on small screens, should remain with small tiny bar with icons on left side that when clicked can become large … in mobile i think we need to have the bottom bar with commonly used nuttons we need to find out. The middle screen need to fill the space with only small padding … the left side menu items should have less padding on top and bottom so that they can fit the screen height … breadcrambs remain as well"
- On the last additions: "yes, looks great, proceed with this design. also making a 2d or 3 d looking shadows may also makes some standowut. page number may be at center as in this image with pignation on rt end, also signout on left bottom as in past … we will design the public advertizment marketplace view in future with two colums of cards with consistent presentation. the panel bar in small and large screens should also be fixed and should not scroll bar."
- On waiting before a staging apply: "do i realli need to wait several mins for your review or apply and tell lovable its applied. - that is what i have been doing all along"
- At the walk: "yes" · "correct" · "correct" · "correct".
