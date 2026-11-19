STOP — f1-doors-6b step 3: ruling 1 decision 6 (`badValueWords` to `src/lib/refusal-tail.ts`) cannot hold as ruled
DONE: step 3 except decision 6 (commit 592ffeba4); ruling 1 saved (ab797931c); decisions 7 and 10
LEFT: decision 6 (placement); step 4 (the e2e assertions, AL-8 / INC-1197); steps 5, 6, 7
CI: the first six lines of dev's `ci-status.md` (ci-evidence, read 2026-11-19; `origin/dev` = `a35d9dc31`):
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `a35d9dc31e35bcdc91b30c7287d200942d117b9d` (short `a35d9dc`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-19T03:35:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44451337701
```
The lane's own newest completed run is on `296bab8` (before the merge of dev and before staging held the marks): FAILURE, the reds
the first stop named (E2E preflight "STAGING BEHIND"; lanes 1 and 10: MON and SV ids). No run exists yet for the lane's later commits.
FILES: `git diff --name-only origin/dev HEAD` (this lane against `a35d9dc31`)
```
docs/features/ai-services.md
docs/features/doors.md
docs/features/hidden-seller-name.md
docs/features/packages.md
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-6b-ruling-1.md
docs/governance/briefs/f1-doors-6b.md
docs/governance/reports/f1-doors-6b.census.md
docs/governance/reports/f1-doors-6b.stop-1.md
public/i18n-usage.json
roadmap.md
scripts/conformance/forms-allowlist.txt
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
src/features/admin-ai/ai-editor.tsx
src/features/admin-ai/ai-feature-form.test.tsx
src/features/admin-ai/ai-feature-form.tsx
src/features/admin-ai/ai-refusals.ts
src/features/admin-ai/ai-service.test.ts
src/features/admin-ai/ai-service.ts
src/features/admin-monetisation/market-dialog.tsx
src/features/admin-monetisation/monetisation-dialogs.tsx
src/features/admin-monetisation/monetisation-refusals.ts
src/features/admin-monetisation/monetisation-service.test.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/price-dialog.tsx
src/features/admin-monetisation/price-end-dialog.tsx
src/features/admin-monetisation/product-editor.tsx
src/features/admin-monetisation/use-monetisation-error.test.ts
src/features/admin-monetisation/use-monetisation-error.ts
supabase/migrations/20261119030500_302ae04a-edb0-4e52-95fd-98f8f7184799.sql
supabase/migrations/20261119030600_5cdaa8d4-b7f3-44b4-983f-e621b954d059.sql
supabase/migrations/20261119030700_eacb4fad-dd6e-41ad-908a-6412ceca2a87.sql
supabase/migrations/20261119030800_cccdea6a-654a-4df4-8ec9-a595a9aff987.sql
supabase/migrations/20261119030900_3c8a0147-71d2-4acb-9337-8a1f7285ea91.sql
supabase/migrations/20261119031000_857229c6-49d4-404b-8d84-df0671d55333.sql
supabase/migrations/20261119031100_ec3bd191-d4ad-4aac-8a7d-233618b93a86.sql
```

## What I did first (the ruling's own order)

- Saved the ruling by scripted copy as `docs/governance/briefs/f1-doors-6b-ruling-1.md`; its sha256 is
  `c02bf81fd2ebff2764590d93f507545aff7e61f0492db7bdee2bb0a699109e72`, equal to the value the message states.
- `git log -1 --merges` at the head showed `39e3207dc Merge origin/dev into cursor/f1-doors-6b` (parents `296bab8b1` and
  `a35d9dc31`), so decision 10's condition holds. The usage maps were regenerated from the merged tree
  (`bun run i18n:usage`: 1848 keys across 737 files).

## The conflict

Decision 6 moves `badValueWords` into `src/lib/refusal-tail.ts` on the premise that this file is "the consoles' dialect, which
never rides a member or a public page (DEC-258)", and asks for the chunk graph to confirm it. I built the move as ruled
(the function and its unit test in `refusal-tail`, the five readers importing from it, `listing-refusals.ts` defining nothing),
and the laws refused it:

```
scripts/conformance/strings-layers.test.ts — CF-SL-1 (DEC-258), run on the moved tree
  admin.error.rateLimited — in en-admin.ts, belongs in en-member.ts (shown on: admin.ai, admin.attributes, admin.categories,
  admin.countries, admin.listings, admin.listings_.$listingId, admin.listings_.$listingId_.edit, admin.places, admin.screening,
  my-listings_.$listingId_.edit, post, post_.$listingId)
```

Cause, read from the tree: `src/features/admin-listings/edit-listing.ts` is one of the five readers, and the posting wizard
imports it on member routes:

- `src/features/posting/use-edit-draft.ts:4` — `editErrorKey`
- `src/features/posting/step-review.tsx:41` — `EDIT_REASONS`
- `src/features/posting/edit-step-changes.ts:1` — `priceSent`, `sameAnswers`, `samePlaces`

So once `edit-listing.ts` imports `refusal-tail`, that module (and with it the admin key `admin.error.rateLimited`, which
`RATE_LIMITED_KEY` names) rides `post`, `post_.$listingId` and `my-listings_.$listingId_.edit`. The ruling's check ("refusal-tail
is in no member or public page's first download") cannot be met by this placement. The census did not read this importer: it
named five readers "in `src/features/admin-listings/`" and not who imports them.

The tree I committed does NOT carry the move. I put the seven files (`refusal-tail.ts`, its test, `listing-refusals.ts` and the
five readers) back to their last committed text by `git show HEAD:<path>`, so every commit is green. The AI console's reader,
`src/features/admin-ai/ai-refusals.ts`, imports `badValueWords` from `@/features/admin-listings/listing-refusals` (the census's
original proposal) until the ruling places it. That import is the only trace.

## The question for the supervisor (one ruling)

Where does `badValueWords` live, now that `refusal-tail.ts` is ruled out? It uses only `splitRefusal`, `errorText` and `ownValue`
and holds no string of its own. The candidates I can see, with what each costs; I chose none:

1. `src/lib/refusal.ts` beside `splitRefusal` (the reader's file, no admin key). The cost is a few hundred bytes in every page's
   closure that carries the reader (its chunk, `refusal-*.js`, is 1,131 B gzip in the three consoles' closures today), so a
   ceiling may move under DEC-296's form; SCOPE names `refusal.ts` only where the census names a change.
2. A new `src/lib/bad-value-words.ts` with its test beside it (a new file in `src/lib/`, outside the widening the ruling gave,
   which names the six files).
3. Leave it in `listing-refusals.ts` and let the AI console import it from there (what is committed now). No scope change, no
   weight change; the cost is the cross-feature import the ruling set aside.

Whichever is ruled, the follow-up is: the function and the unit test (the null cases and a mapped field) move there, the five
readers and `ai-refusals.ts` change one import line each, `docs/features/admin-listings.md:192` names the new home, and the
usage maps are regenerated.

## What step 3 holds (commit `592ffeba4`)

- Monetisation: `MONETISATION_DOOR_REFUSALS` (`monetisation-refusals.ts`) holds the console's words by code, the same keys the
  sentence map held, with the gates sharing `admin.packages.error.denied`, a deactivated person included, `P0009` and
  `stepUpRequired` on the step-up line, and the generic `admin.packages.error.unknown`. `useMonetisationError` reads through
  `readRefusal`; a code with no words draws the generic line with the code beneath it (the reason line it drew before).
  `monetisationErrorKey` and `DOOR_MESSAGE_KEYS` are gone from `monetisation-service.ts`.
- `MonetisationErrorLine` is renamed `MonetisationProblemLine` (it draws a key and maps nothing; its name matched CF-FORM-3's
  mapper pattern). Its five users and `docs/features/plans.md` follow. Test ids on the line are unchanged.
- AI: `ai-refusals.ts` is new (`AI_DOOR_REFUSALS`, `AI_BAD_VALUES`, `aiRefusalOf`); `aiErrorKey` and `AI_REFUSAL_IDS` are gone
  from `ai-service.ts`. `rateLimited` draws the consoles' shared `admin.error.rateLimited`; the gates draw `admin.ai.error.denied`.
  `screeningStaysOn` stays unknown, as AIS-5 had it.
- The four CF-FORM-3 lines left `scripts/conformance/forms-allowlist.txt`; `bunx vitest run scripts/conformance/forms.test.ts` passes.
- The job line and `use-name-checks.ts` are unchanged, as decision 11 and the census's `tests` item say: the resume reads a typed
  answer, the returned `notPaused` stays a state, and a refused resume draws `common.error`.
- Tests: MNS-6 now reads the four migration files of this turn, collects every `door_refuse` code of the seven doors (more than
  thirty) and requires words for each, plus the gates; MNS-8, MNS-9 and MNS-10 (the hook: codes, the step-up line, the generic
  line) are new in `use-monetisation-error.test.ts`; AIS-5 and AIF-4 read codes.
- Checks on `592ffeba4`: `bunx tsc --noEmit` clean; `bun run lint` exit 0; `bunx vitest run scripts --maxWorkers=2` — 124 files,
  665 passed, 1 skipped; the touched folders' unit tests pass.

## Decision 7 (finding 1) — a departure from the ruling's sentence, named

Decision 7 says: "Write the body's truth (read it): photo screening cannot be switched off, and asking for it answers
`unknownFeature` (AIS-5's `screeningStaysOn`)." I read the body (`supabase/migrations/20261119030900_3c8a0147-…sql`, lines 60–61
and 71). The body does the opposite of that sentence: its comment (D158, bundle 13 turn 6) says "photo screening may be switched
off: new photos are then held for staff", it refuses no feature switched off, and `unknownFeature` answers only a feature that is
not in `ai_features`. `docs/features/ai-services.md:36` says the same ("turn 6 removed that refusal"), and AIS-5's
`screeningStaysOn` case asserts that the old code now falls to the generic line. I followed the ruling's instruction (write the
body's truth) and not its parenthesis. The line in `scripts/public-surface-allowlist.txt` (`admin_set_ai_feature`) now reads: "…
switches an AI feature on or off (photo screening included: switched off, new photos are held for staff) and sets its budget and
price; refuses switching a feature on past its month's budget (overBudget); writes an audit row". Named for §10.

## Limits

- The chunk-graph check the ruling asks for was not run on a build: the strings-layers law answered the question from the
  import graph first, and I stopped there.
- Nothing from step 4 on has run: the e2e assertions, AL-8 (INC-1197), the gate, the build table, the browser run, the
  self-review, the report.
