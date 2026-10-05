Source: supervisor thread, turn 1118, Thu 2026-10-01 19:19 New York.
Status at 2026-10-05: DEC-099 approved by the operator and built (fb1063cb, 2026-10-01, green with no flaky test; INC-380 TR-10); the three-green pool count was restarted and later tracked to 2 of 3 with adoption held on a reset-timing question (turn 1124); the repo holds DEC-099 lines in docs/features/e2e-harness.md, not this text.
Related: DEC-099, DEC-097, DEC-098, INC-379, INC-380 (TR-10), 19 tables with a user-id column.

**The INC-379 turn is clean, and the evidence move (DEC-098) passes on both CI runs. One finding needs your approval: this run showed a flaky test that the account pool caused.**

- **INC-379:** on dev (`9a648c5c`), inside scope, CI green, main promoted, no new side branch. The city flake did not recur.
- **DEC-098:** both runs put the evidence on `ci-evidence`, dev got no bot commit, and main was promoted. That is an ADOPT for the CI part. The two nightly files are judged after tonight's 06:00 UTC nightly, and stage 2 follows that.
- **Account pool (DEC-097):** test TR-10 failed once and passed on retry, in both phone and desktop, for the first time ever. TR-10 ticks the Amharic translator box on a pooled account and never unticks it, and the pool's reset does not clear that table. The next run opens the same account with the box already ticked, so the click unticks it and the check fails. I logged it as INC-380.

**Decision for you:** the rule I froze says a pool-caused flake after the first green run means reverting the pool. I recommend not reverting, because that brings back about 4,000 new staging users a day. The block below (DEC-099) instead makes the reset cover every per-account table, adds a test that fails if a new one is missed, and restarts the three-green count at zero. The next pool-caused flake reverts the pool with no further exception.

1. If you agree, paste the block below into Lovable, attach nothing, and send it. Pasting it is your approval. If you prefer the revert, tell me "revert the pool" instead.

---
```
DEC-099 first, then continue the roadmap (D + L + M).

DEC-099 / INC-380 — the account pool resets by census, not by a hand-written list. Tier A (E2E harness helper holding the service role). No database change, no app code, no workflow file.

WHY: run 36938569694 (commit 9a648c5c, green) recorded TR-10 flaky in both projects — its first ledger lines ever. Cause read in code: TR-10 leases its target (e2e/admin-translations-console.spec.ts:410), assigns `am`, and its finally removes only the scratch role. reapPoolAccount() (e2e/helpers/users.ts) resets listings, rate_limits, user_roles, profiles, user_directory, factors and the auth user — not public.translator_languages. On the next lease the card opens with `am` already ticked, the click unticks it, and "aria-checked true" fails; the failed attempt saves the empty set, so the retry passes. Second occurrence of the class "the reset list is incomplete" (first: INC-377).

DECISION RULE (frozen now; it replaces DEC-097's count, which this flake broke): the count restarts at zero after this landing. Three consecutive green runs with no pool-traceable flake ADOPT. Any pool-traceable red or flake REVERTS the pool to per-test accounts, with no further bring-up.

TASK
1. Census (state it in your report) of every place per-account state can live:
   a. every table in src/integrations/supabase/types.ts with a column holding a user id. I count 19: attribute_import_revisions, audit_log, category_country_exclusions, category_import_revisions, country_root_order, coverage_plans, entity_translations, impersonation_sessions, languages, listing_revisions, listings, location_import_revisions, profiles, screening_verdicts, translator_languages, ui_translation_revisions, ui_translations, user_directory, user_roles — plus rate_limits (keyed by id in `key`). Correct my count if yours differs.
   b. auth-side state: identities, factors, sessions, metadata, a pending email or phone change.
   c. storage objects stored under a user's id.
2. One declared map in a pure-data module, e2e/helpers/pool-reset-map.ts (no imports): every census item is either RESET (the reaper returns it to what handle_new_user() leaves) or EXEMPT with a one-line reason (attribution or history columns such as created_by, updated_by, approved_by, assigned_by, audit_log). reapPoolAccount() resets everything marked RESET. translator_languages is RESET. Decide impersonation_sessions and the rest from the code, and say why.
3. A unit test under src/ (vitest's include covers src/** only — vitest.config.ts:29; no config change): it reads types.ts, finds every table with a user-id column by the same rule, and fails when a table is in neither list. Prove it: paste it failing with one table removed from the map, then passing.
4. Test hygiene, class-wide: a test undoes what it writes on a leased account. TR-10's finally also deletes its translator_languages rows for the target. Sweep every spec that calls leaseUser() for writes to a RESET table that its finally does not undo; fix each the same way and list them.
5. TR-10: before the STATE B click, assert the am box is unticked, so a dirty account fails with a clear message instead of flaking.
6. Docs: docs/features/e2e-harness.md pool section (the map, the guard, the new decision rule); docs/_changelog.md; roadmap.md (add and tick DEC-099 / INC-380).

SCOPE: e2e/helpers/users.ts; e2e/helpers/pool-reset-map.ts (new); e2e/*.spec.ts only for steps 4 and 5 (no assertion weakened or removed); one new unit test file under src/; the three docs above. Everything else is forbidden for this item.

DO NOT
- catch-and-continue in the reaper: a failed reset still fails loudly;
- mutate a real reference row; reset only rows keyed to the pooled account;
- touch the lane or seat logic.

VERIFY: typecheck, lint, format:check, unit tests (the new guard with its failing proof); run admin-translations-console.spec.ts twice in a row locally on the same lane — TR-10 must pass first time on the second run — plus every spec you touched. Report only on green (done · verified · next), every file listed.

THEN continue with the roadmap's next item, D + L + M, under the rules of its brief: census first, one migration, and the report states "apply <uuid-fragment> → expect mark <value>". End the turn at a clean point.
```
---

2. When the curator delivers batch 13, send me the files.
