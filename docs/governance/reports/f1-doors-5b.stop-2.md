STOP — f1-doors-5b part STEP 6: origin/dev moved under two files this lane changed (a Lovable merge), so the push waits for the supervisor
DONE: parts STEP 3, STEP 4, STEP 5 (the client, the tests, the gate) and the self-review; STEPS 0-2 by the first chat
LEFT: STEP 6 (the one push of the final code and the CI read), STEP 7 (the report with its section 14, written while CI runs)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `b82f575c7e94fe36d216d1dbaa69acc0140eab8f` (short `b82f575`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-17T04:45:27Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44017605815
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-f3aa1dc2677a… (0 read)
FILES:
docs/features/doors.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-5b-ruling-1.md
docs/governance/briefs/f1-doors-5b.md
docs/governance/reports/f1-doors-5b.census.md
docs/governance/reports/f1-doors-5b.stop-1.md
e2e/ad-page-doors.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/legal-certify.spec.ts
e2e/viewing-place.spec.ts
public/i18n-usage.json
roadmap.md
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/ad-page/ad-page-refusals.test.ts
src/features/ad-page/ad-page-refusals.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/report.test.ts
src/features/ad-page/report.ts
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/legal/legal-accept-refusals.test.ts
src/features/legal/legal-accept-refusals.ts
src/features/legal/legal-accept-screen.test.tsx
src/features/legal/legal-accept-screen.tsx
supabase/migrations/20261117040300_e79b19f6-6059-4f30-93e5-7040e78f536e.sql
supabase/migrations/20261117040400_afb3c699-a591-44c9-b00e-607ae6e200f4.sql
supabase/migrations/20261117040500_b9545ea9-7eab-4e41-9565-4ea9369b0610.sql
supabase/migrations/20261117040600_5c1c0ca4-9f92-409d-b923-be63f247144c.sql
supabase/migrations/20261117040700_6ea62fd4-0a6d-4c6d-a753-f11eee0195c7.sql
supabase/migrations/20261117040800_ffe4d0a8-1079-418d-ae51-f4bf552fd0e9.sql

Base `157d28bbd` (Ruling A). `origin/dev` was `157d28bbd` when this chat began and is now `0e51207b8` (the merge of pull request #58, `lovable/forms-consoles`; `git rev-list --count 157d28bbd..origin/dev` = 23). Its files, against this lane's `git diff --name-only 157d28bbd`: two overlap.

- `scripts/route-budgets.mjs`: #58 changed the `/admin/translations` and `/admin/translations_/$lang` lines (305 → 306, 308 → 309); this lane changed the `/post`, `/post_/$listingId` and `/my-listings_/$listingId_/edit` lines (404 → 405). Different lines.
- `docs/generated/i18n-usage.json` and `public/i18n-usage.json`: generated maps both sides regenerated (this lane's change is the scanned-files count, 728 → 730).

`git merge-tree --write-tree HEAD origin/dev` (a read) answers a tree with no conflict. The maps still have to be regenerated on the merged tree (`bun run i18n:usage`), and this lane's three ceilings were measured on the old base: #58 moves chunks the form kit shares, so they need one read on the merged tree.

The rules in force are two: rule 00 §Git ("when origin/dev moves during your task, you do not merge or rebase: finish, push, and say so") and rule 00 §One executor at a time ("if you see a new Lovable commit on origin/dev that touches your scope, STOP"). A file of this lane's scope (`scripts/route-budgets.mjs`) is touched by a Lovable commit, so I take the stricter and stop. Nothing is pushed by this chat except this stop's own push of the lane's commits.

What is done, in the lane's tree (head `256cce723`, the last code commit):

- STEP 3 `df234a957`: the services read the shell's codes through `readRefusal` (`src/features/ad-page/ad-page-refusals.ts`: `SAVE_REFUSALS`, `REPORT_REFUSALS`, `CONTACT_REFUSALS`, `refusalCode`; `src/features/legal/legal-accept-refusals.ts`: `LEGAL_ACCEPT_REFUSALS`, `acceptRefusalKey`); no `error.message.includes` is left in the family; the ruling is saved (sha256 `776aac13bdc0d4139ea8c0f533413db56d4cade0772c10f70c8c8603f421f95c`, equal to the carrier's).
- STEP 4 `3e2a5c870`: AP-24, AP-25, AP-27, LG-20, CG-1, VP-2 and VP-4 read the codes as the transport's error; AP-29 and AP-26 need no spec change (they turn green with `report.ts` and `save.ts` on the reader); the `listing_reveal_count` public-surface line leaves (ruling 1 item 2).
- STEP 5: `256cce723` (three ceilings, below).

The gate on `256cce723`:

- `bun run typecheck`, `bun run lint`: pass (inside `bun run checks`).
- `bunx vitest run scripts --maxWorkers=2`: 123 test files, 648 tests passed (read in the gate's run).
- touched unit tests (`src/features/ad-page`, `src/features/legal`, `src/features/account`, `src/components/shell`, `src/lib/refusal`): `Test Files 56 passed (56)`, `Tests 425 passed (425)`.
- `bash scripts/check-migrations.sh`: `Migration guard OK.`; `bun scripts/doors/check-doors.ts`: `check-doors static OK: 259 manifest lines reconcile with the migrations' catalogue`.
- `bun run checks` fast line `PASS     laws-first › scripts/ tests first (INC-1030)  (91s)`; last line `checks: 35 PASS · 0 FAIL · 26 NOT RUN · 473s`. The NOT RUNs are the GitHub-only jobs, the linux binaries (actionlint, gitleaks), the install steps, the advisory service, the staging-credentials preflight and the GitHub-only artifact steps, each named with its reason in the log.
- `bun scripts/brief/check-go.ts docs/governance/briefs/f1-doors-5b.md --at 157d28bbd`: `[check-go] no finding`.
- the e2e ids the lane adds or changes (22 ids plus CG-1), in mobile-360 and desktop-1280, 0 retries, `bun run e2e:local` with `--grep`: `46 passed (3.1m)`, no `[ssr-error]` line; the exact id list is in `/tmp/ethio-scratch/f1-doors-5b-5c/e2e-2.log`'s command, to be copied into the report's section 5. No spec file ran whole.
- `/post` family: first download by chunk, from my lock-exact builds of the base `b82f575c7` and of this tree (`/tmp/ethio-scratch/f1-doors-5b-5c/`, the operator's to remove): the new chunk `ad-page-refusals.js` +463 B gzip, the entry's dependency map naming it (`index.js` +29 B), `refusal.js` +4 B, `listing-detail.js` −32 B, `save.js` −40 B, `report.js` −22 B, the rest the chunk names' hashes (±1 to ±7 B). Pages (bundle logs of both builds): `/l/$slug` 255.6 → 256.0 of 257; `/account_/saved` 223.2 → 223.6 of 225; `/legal/accept` 214.7 → 214.8 of 217; `/admin/listings_/$listingId_/edit` 411.1 → 411.6 of 412 (the check does not flag it; its cause is not read, to name in the report); `/post` 403.3 → 403.7, `/post_/$listingId` 403.2 → 403.7 and `/my-listings_/$listingId_/edit` 403.3 → 403.8, all three of ceiling 404, so within the band: raised 404 → 405 by DEC-296's form in `256cce723`, the cause by chunk on each line. The cause of the new chunk's carriage by those three pages is the preview's import of `contact.ts`, which now reads the codes.

The self-review (rule 80), read on `git diff 157d28bbd..HEAD`:

- SCOPE: every changed file is in SCOPE or the standing allowance; `scripts/public-surface-allowlist.txt` is the ruling's widening; `docs/features/doors.md` is the allowance.
- BEHAVIOUR: only the brief's numbered changes (D2: the dials count in the gate; D4: the refusals as codes; D5: no reset time on the gate's `rateLimited`); the services' answers keep their shapes, so no screen outside SCOPE changes.
- BANNED: typecheck, lint and the laws pass on the tree; I did not run a separate grep sweep for banned forms.
- ONE MECHANISM: the two words files use `readRefusal`; `refusalCode` reads the code with the reader's own `splitRefusal`, a sibling of `legalReasonOf` (`src/features/my-listings/my-listing.ts:593`, read at `:347`) and `legalRefusal` (`src/features/legal/legal-reader.ts:98`, still read by `src/features/legal/my-legal-version.tsx:31`): three readings of a code's head; one `refusalCode` in `src/lib/refusal.ts` would serve them all, outside this scope.
- TESTS: the new files carry unit tests (`ad-page-refusals.test.ts` ARF-1…5, `legal-accept-refusals.test.ts` LAR-1); the e2e assertions that changed shape are listed in `3e2a5c870`'s message.
- MIGRATIONS: none written by this chat.
- DOCS: `docs/features/doors.md` gains the F1-5b paragraph; the generated i18n maps regenerated (scanned count only); the Records go to the report's section 14.
- SECURITY: nothing the public repository should not carry; the client reads a code, never the server's sentence.

Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 256cce7

The two MINOR, both Departures for the report:

1. `src/components/shell/place-carry-service.ts:24` and `:41` and the server's ad read (`src/server/ad-page.ts:30`, `src/server/ad-photo.ts:28`) are NOT moved onto the reader. The place carry's `reason` is read by `src/components/app-shell.tsx` (`readAccountPlace`, `saveAccountPlace`), which only logs it; the shell's message is already the bare code, and I did not read a unit test of it. A visitor is never refused by `public_listing` (the public class passes a call with no uid and spends nothing), so no refusal reaches the server's read; an error there is already logged by its text and answered 503 / thrown. A reader there would be a branch no call can reach. The brief's STEP 3 words ("the server's ad read reads `public_listing`'s refusal as data") are not built for that reason.
2. The words of the acceptance screen live in `src/features/legal/legal-accept-refusals.ts`, not in `legal-reader.ts`: `legal-reader.ts` is imported by `use-legal-gate.ts` and `auth.tsx` (the shell's first download), and `refusal.ts` is not in the entry's closure.

QUESTION for the supervisor, numbered:

1. How do you want the push made: (a) the operator merges `dev` into pull request #59 on GitHub, I `git merge --ff-only origin/cursor/f1-doors-5b`, regenerate the two maps, read the three ceilings on the merged tree, push once and go on with STEPS 6-7; or (b) I push as it stands and the report names the move (rule 00 §Git), the conflict resolution being the operator's merge.
2. The lane's last CI run (`b82f575c7`) also lists AP-26 and AP-29 red: both passed in my local run on the new client with no spec change, so I name them as turned green by STEP 3 in the report; say if you read it otherwise.
