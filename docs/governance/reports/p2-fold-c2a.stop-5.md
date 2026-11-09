QUESTION — p2-fold-c2a INC-1085: PW-141 does not reproduce, and the `alias_check` dial cannot be its cause
DONE: ruling 4 §3 items 1 (CI read) and 2 (INC-1086); ruling 4 saved and the types patch applied (0a78d6a51); INC-1085's reading and reproduction (no code changed)
LEFT: ruling 4 §3 items 3 (INC-1085's fix, waiting on this answer), 4 (the GO's steps 3–7), 5 (local runs, THE CHECKS, budgets), 6 (the report, push, CI)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `9c2671ce10103b7743ef0c85953671d1ff2e3634` (short `9c2671c`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-08T07:44:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42458299530
FILES:
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/briefs/p2-fold-c2a-ruling-3.md
docs/governance/briefs/p2-fold-c2a-ruling-4.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
docs/governance/reports/p2-fold-c2a.stop-5.md
e2e/feed-route.spec.ts
src/integrations/supabase/types.ts
supabase/migrations/20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql
supabase/migrations/20261108070501_6da335da-6663-4037-94a5-428169504eef.sql
supabase/migrations/20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql
supabase/migrations/20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql
supabase/migrations/20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql
supabase/migrations/20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql

(The list is `git diff --name-only 5bd54705d`, c1's last commit, as the earlier stops took it. `origin/dev`
is `af50ca802`, and `git log HEAD..origin/dev` is empty: dev holds nothing this branch lacks.)

## Where the turn stands

- **INC-1086, done** (`1004c1b6a`). Whole-tree census of exact-list assertions over the four doors'
  answers (`e2e/`, `src/**/*.test.ts`, `scripts/`). One exact list exists: FR-6,
  `e2e/feed-route.spec.ts:229–262`. It gains `"level"` and stays exact: `Object.keys(card).sort()` with
  `toEqual`, and no seller key. Every other line read is not an exact list over these answers:
  - `toMatchObject` lines (it checks a subset);
  - other doors' rows (`ad-page-doors.spec.ts:1088`, `:1158`, `my-listings-doors.spec.ts:792`,
    `legal-doors.spec.ts:1429`, `locations-tree.spec.ts:250,256`, `photo-pipeline.spec.ts:1189–1190`).
  No test enumerates the answer keys of `feed_page`, `seller_feed_page` or `my_saved_listings`, so no
  list gains `levels`. The report will carry the full file:line list.
- Proof: `bun run e2e:local -- e2e/feed-route.spec.ts` against ethio-staging gave 22 passed (45.6 s,
  both projects, 0 retries). Typecheck and lint were green (0 errors). `bunx vitest run scripts
  --maxWorkers=2` gave 491/492; the one red is NH-6, this computer's known time-zone limit, as at stop 4.

## INC-1085 — what was read

Ruling 2 §4's premise: every repetition of a named-seller test spends that caller's `alias_check` dial
(60 per 3600 s), so the repeat lane exhausts it. Reading the code shows the count cannot pile up across
tests:

1. **The dial counts by user id.** `rate_gate` keys its meter row by the caller's id
   (`20261023100132`, `rate_gate` body: `INSERT INTO public.rate_limits (key, …) VALUES (v_uid::text,
   …)`).
2. **Every lease deletes those rows before the test starts.** `leaseUser` calls `reapPoolAccount`
   (`e2e/helpers/users.ts:405`), and the reap deletes every `rate_limits` row keyed by the account's id
   (`users.ts:257`) and every `rate_overrides` row (`users.ts:259`). `POOL_RESET_TABLES.rate_limits` in
   `e2e/helpers/pool-reset-map.ts` records the same reset. Each test that types an alias therefore
   starts at zero. One such test spends a handful of checks: the 350 ms debounced check per name typed
   (`step-who.tsx:458–473`) and at most one suggestions call on opening the step (`:417–422`). That is
   far under 60.
3. **Seats are never shared.** A seat is `parallelIndex × POOL_SEATS_PER_SLOT + n` (`users.ts:180–199`),
   so two workers never lease one account. Lanes never share a pool (`poolLane`, `:147–157`). No
   sibling's lease can revoke the session of a running test (`users.ts:386–393`).
4. **The step-load race is closed.** One candidate was the identity load writing `""` over a name
   already typed (`step-who.tsx:253–255`), which would leave the check at "checking" for good
   (`:464`). That cannot happen: the alias box renders only once `editing` is set from the loaded
   identity (`:272`, `:729`).

## INC-1085 — reproduction (ruling 2 §4: "--repeat-each on PW-141 alone, and the sibling tests that type an alias, one worker, mobile-360")

| Run | Command | Result |
| --- | --- | --- |
| PW-141 alone | `E2E_WORKERS=1 bun run e2e:local -- e2e/post-wizard-category.spec.ts --grep "PW-141" --repeat-each 12 --project mobile-360` | 12 passed (3.0 m), 0 retries |
| PW-141 and the two siblings that type an alias (PW-27 `:1028`, PW-48 `:1582`) | the same with `--grep "PW-141 \|PW-27 \|PW-48 "` | 36 passed (6.8 m), 0 retries |

Both runs went against ethio-staging. Nothing failed, so there is no failing tick whose route answer can
be read. Ruling 2 §4 also orders red first ("the repeat run failing before the fixture change"). That
cannot be shown, so the `rate_overrides` fixture change would have no red. By the reading above, it
would also change nothing.

## The question

Ruling 4 §3.3 says: "if the cause is not the dial, STOP with the log lines". The dial is ruled out by
the code, and there are no failing log lines: no local failure, and CI uploaded no context file for the
2026-11-08 failure (stop 2). One hypothesis is open and NOT proven. The three tests type
`e2e_${rand()}`, six random base-36 characters, while the fixture's own generator strips digits
(`e2e/helpers/posting.ts:104–106`). The door's rules d and e (reserved names, one letter off a protected
handle, claim words, the second reading with edge digits stripped: `alias_rule`, `20261018142627`
:86–188) could now and then refuse a random name. That would show `post-who-alias-refusal` instead of
`post-who-alias-ok`. Nothing here shows it happening.

The paths I can see, for the supervisor to choose:

1. **Record and continue.** Record INC-1085's cause as "not the dial (read); not reproduced in 48 local
   repetitions; cause unread", make no fixture change, and go on to ruling 4 §3.4. The repeat lane
   judges again on this pull request.
2. **Make the next failure carry its cause.** In the three alias-typing tests of
   `e2e/post-wizard-category.spec.ts` (outside c2a's file list, so it needs the ruling): on the tick
   missing, the failure message carries the alias route's answer, read through the page's response.
   The next red then names `rate`, a refusal reason, or an error.
3. **Take the hypothesis as the fix.** The three tests type a fixed-shape scratch name the door cannot
   refuse (letters only, like `leaseSeller`'s `eseller_…`). Again outside c2a's file list, and red
   first is still not possible.
4. **Reproduce wider first.** Run the whole spec file repeated on both projects with 8 workers, as the
   repeat lane does, before choosing. That is about an hour of local runs against staging.

The tree is green-shaped: typecheck and lint are green, and the touched spec passes whole on both
projects. Nothing is half-written. The pull request stays a draft.
