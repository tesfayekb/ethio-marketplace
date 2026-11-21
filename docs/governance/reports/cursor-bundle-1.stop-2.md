MIGRATION — cursor-bundle-1 STEP 2: the feed enqueuers (file 1 of 2); file 2 (the two drops) NOT WRITTEN, its pre-check's STOP condition is met
DONE: STEP 0 (the ruling and its package saved, sha256 equal), STEP 2 file 1 (item 5)
LEFT: STEP 2 file 2 (item 6's two drops, ruled by answer 4), STEPS 3–8 (items 1, 2, 3, 4, 6, 7, 8)
CI: SUCCESS on 358c691 (the base), completed 2026-11-21T12:43:53Z, run 44904897718 (ci-evidence, `ci-status.md`'s first six lines); not yet run on this branch's new commit
FILES:
docs/governance/briefs/cursor-bundle-1-guide.json
docs/governance/briefs/cursor-bundle-1-ruling-1-am.json
docs/governance/briefs/cursor-bundle-1-ruling-1.md
docs/governance/briefs/cursor-bundle-1.md
docs/governance/reports/cursor-bundle-1.census.md
docs/governance/reports/cursor-bundle-1.stop-1.md
docs/governance/reports/cursor-bundle-1.stop-2.md
roadmap.md
supabase/migrations/20261121145000_656c7e66-210f-412a-98fd-655df4c9e9fd.sql

## Base and records

- Ruling 1 saved by scripted copy: `docs/governance/briefs/cursor-bundle-1-ruling-1.md` sha256
  `91a2c00c3910413acb261eed16efe8e8ec32ff32eb5095a0cb7a104786573ee8` (equal to the message's) and
  `docs/governance/briefs/cursor-bundle-1-ruling-1-am.json` sha256
  `08dd5cb075aa56eb83da298dc48f28661735350f53aa998a1c124f1addd7f178` (equal). Both checked before the
  copy (in Downloads) and after it (in the tree).
- `origin/dev` is still `358c691ab`; the brief's base. No file of the scope moved.

## File 1 — the feed enqueuers hold their listing (INC-1187)

- Name: `supabase/migrations/20261121145000_656c7e66-210f-412a-98fd-655df4c9e9fd.sql`
- sha256: `51365a1e36387fae24beb760fd2ecd5521cbdb2b69178354e27bd8884f3e7290`
- Declared mark: `20261121160000` (commit at 14:5x UTC: the hour rounded up is 15:00, plus one hour; above the
  ledger's newest, `20261120120300`, which the pre-check requires applied).
- Header: `-- e2e-areas: feed, admin-categories, admin-listings` (all three are names in `scripts/e2e-select.ts`;
  its 19 tests pass).
- Redeclared whole, each byte for byte its last declaration apart from the named change (diffed by script;
  `CREATE OR REPLACE`, header and closers as they stand):

  | function | last declaration | pre-check md5 (prosrc, CR-stripped) | new md5 |
  | --- | --- | --- | --- |
  | `feed_reindex_enqueue_listings(uuid[])` | `20261104153313_f5c8063d-…` :40 | `28b6ccb09d0736cf826f3274fe6ba8b9` | `bb34f140e16803d5f2fb62eeb283908f` |
  | `feed_reindex_enqueue_categories(uuid[])` | `20261015023155_3600a562-…` :162 | `55d421a866e45ac0066ec541631b9ae0` | `6a9604372d2f1b3f6374a0bbdf4e27b7` |
  | `feed_reindex_enqueue_places(uuid[])` | `20261015023155_3600a562-…` :193 | `6c3e807ef39e8dbf290fe768127ab49f` | `49b86d1bc95feec03c3658472a096462` |

  The old md5s are the ones the tree's last declarations compute (recomputed by script this turn: equal to
  the census's). They are the tree's, not the live database's: the pre-check reads the live body and RAISES
  on any difference, so staging answers it.
- The change: `FOR KEY SHARE OF l` on each read of `public.listings` that feeds the keyed insert. Places
  holds a `UNION` at its top level, where a locking clause is refused: its two arms become two CTEs
  (`held_here`, `held_listed`) that take the lock, and the insert reads `held_here UNION held_listed` (the
  same rows).
- A cost the supervisor should weigh, not a defect: the lock writes a row lock on every listing a call
  queues (the category and place enqueuers can queue every live ad under a moved category or place), where
  the read wrote nothing. The sweep that drains the queue is unchanged.
- Proofs (one `DO` block, scratch rows under a sentinel rollback, keys from `gen_random_uuid()` and one
  `v_hex` draw):
  - (a) catalogue: header, return type, grants (no PUBLIC, anon or authenticated; service_role holds
    EXECUTE), the body's md5 equal to this file's, and the count of `FOR KEY SHARE OF l` equal to the
    number of listing reads (1, 1, 2).
  - (b) a live scratch ad is queued once by each enqueuer (by id, by category, by place, by listed place;
    both place arms in one call queue it once; a second call queues nothing new).
  - (c) the ad deleted: each enqueuer answers 0, raises nothing, and no queue row stands for it.
  - The concurrent DELETE itself is not staged (one session): the held read is proven by the body's lock
    count, a gone ad by its answer (as F1-5b's proof did).
- pre-stop scan: 7 of 7, `20261121145000_656c7e66`.
- `bash scripts/check-migrations.sh`: "Self-marking guard OK (floor 20260817054246).", "Born-closed guard OK
  (floor 20261007143529).", "Definer guard OK.", "Public-surface guard OK (floor 20261003215043).", "Real-row
  proof guard OK (floor 20261007000000).", "Spanning-literal guard OK (floor 20261109000000).", "Random-text
  guard OK (floor 20261118160000).", "Migration guard OK."
- `bun run db:proof --fresh`, on the final tree: `db:proof PASS — applied 545/545, CLI 2.120.0, cold, 58 s`.
- Preflight on the pull request will say "STAGING BEHIND" until staging holds the mark: expected.

apply 656c7e66-210f-412a-98fd-655df4c9e9fd → expect mark 20261121160000

## File 2 — NOT WRITTEN: the pre-check's own condition is met (answer 4's STOP)

Answer 4 says the file's pre-check RAISES if anon or authenticated holds any privilege on either table, and
that this is "a STOP with the catalogue's answer". Both browser roles hold privileges on both tables, so I
stopped before writing the file.

The catalogue's answer, from the local proof stack (a throwaway copy of every migration, `bun run db:proof`;
read by a scratch file I deleted and never committed, whose RAISE printed the grants; the stack was rebuilt
after it, and the PASS line above is from the rebuilt stack):

- table-level SELECT for anon: no; for authenticated: no, on both tables;
- COLUMN-level SELECT, for BOTH anon and authenticated:
  - `level_overrides`: `id, level_key, category_id, country_code, days, max_photos, placement, badge,
    created_at, updated_at` (everything but `created_by`, `updated_by`);
  - `market_settings`: `id, country_code, free_regular_ads, included_reach, paid_levels,
    paid_levels_since, launch_credits, launch_days, created_at, updated_at` (everything but `created_by`,
    `updated_by`);
- eight policies stand on the two tables (the public read, and the three deny rules, on each).

The tree says the same: `20261103040805` :116-118 (`REVOKE ALL … FROM PUBLIC, anon, authenticated;` then
`GRANT SELECT (…) ON public.level_overrides TO anon, authenticated;`) and `20261103040807` :49-53 (the same
for `market_settings`), and `scripts/public-surface-allowlist.txt` lines 161 and 167 name the grants ("browser
roles read every column except created_by and updated_by"). No later migration revokes them.

CORRECTION TO MY CENSUS AND STOP 1 (A3): both said these two tables "hold no browser grant" and called their
read rules dead. I read the `REVOKE ALL` line and stopped before the `GRANT SELECT (…)` two lines below it
(census, the "grants" paragraph on `level_overrides` and `market_settings`; stop-1 finding 2). The error is
mine; the rules are not dead. They are what lets the column grants answer a row: dropping them, with the
grants kept, would make both tables unreadable to the browser roles without a stated reason, and revoking
the grants too changes what the allowlist declares.

What I found about use (data for the ruling, not a decision):

- No file under `src/` reads either table through a browser role; the console writes through
  `admin_save_market_settings` and `admin_clear_level_override` (`monetisation-service.ts` :231), and the
  price and level logic reads `market_settings_for(character)` and `level_perks_for` (service-role readers).
  So the grants look unused by code; but they are declared in the allowlist as a public surface (the ad
  page and Promote "read the baseline"), and a landed proof (`20261103040805` :490) asserts them.

QUESTION — what shall file 2 be? The options, each small:

1. Keep both rules as standing open rules. `scripts/doors/open-rules.txt` then holds ten lines, not eight,
   with `grants anon:SELECT(<cols>),authenticated:SELECT(<cols>)` on these two (the live form checks it).
   No migration file 2. INC-1166 closes with ten standing rules and no drops.
2. Drop the grants and the rules together (a migration that REVOKEs the column SELECT from anon and
   authenticated and drops both read rules), after a census names every browser reader (none found in
   `src/`; `e2e/` uses the service client) and the two allowlist lines are removed with it. This is a
   grant change, which answer 4 did not rule and the brief's SCOPE does not name
   (`scripts/public-surface-allowlist.txt` is not in the standing allowance).
3. Anything else the supervisor rules.

My recommendation is option 1 (no behaviour change, no new grant decision, INC-1166 closes whole).

## What happens on `continue`

On `continue` (with the file-2 ruling, after the supervisor's apply of file 1), I build STEPS 3 onward: items 1, 6 (with `open-rules.txt` as the ruling on file 2 says) and 8 in STEP 3's
commit; items 2 and 7 (MF-9) in STEP 4; items 3 and 4 in STEP 5; the gate, the browser ids, the
self-review, the push, the report. Named for the report's §10: `git reset -q <path>` used once earlier in
this lane (accepted this once by ruling 1); the scratch folder `/tmp/ethio-scratch/cursor-bundle-1/` (the
operator's to remove); the trial file above, never committed.
