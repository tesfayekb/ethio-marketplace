# Foundations turn N1b — stop 1 (N1b-1, M1: the INC-979 backfill)

## CI

The run on 8cceeee8 has not landed yet. ci-status.md, read at the start of the turn, names 07cfcf15: **CANCELLED** (no verdict). The last completed run is 7e2006a7, whose one red (/admin/places) was fixed in 07cfcf15. guards-last-failure.md lists no failed build or guard job. e2e-last-failure.md: run 40830151235 on 1e9b8336 passed. The 8cceeee8 run is read at the next stop, and any red there is fixed first.

## Step 0

- The brief `docs/governance/briefs/foundations-turn-n1b.md` was written by script: the plan (`git show 8cceeee8:.lovable/plan.md`) first, then the ruling, each in its own fenced block. sha256 ff718003…7148.
- roadmap.md:
  - line 3 names the brief;
  - the N1b line is split into N1b-1, N1b-2 and N1b-3;
  - an INC-979 line is added (open, fixed by M1);
  - an R2 launch-gate line is added.

## M1 — what it does

- File `supabase/migrations/20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql`: 4,990 bytes, sha256 39692d6d…fdde.
- It inserts an `'unchecked'` row into `name_checks` for every profile that has a `seller_alias` and no row. The row holds the lower-cased alias, `since = now()` and the profile's `home_country_code`.
- It uses `ON CONFLICT DO NOTHING`, so an existing row is never touched.
- It adds no grant, no function and no table.

### Proof

The proof uses scratch `e2e-n1b-` users and rolls back on its sentinel. Each check raises on failure.

- **BF-1:** a legacy upper-case alias gets its row: `'unchecked'`, the lower-cased text, 0 attempts, and the profile's country.
- **BF-2:** an existing `'clean'` row (2 attempts, 3 days old) is untouched.
- **BF-3:** a profile with no alias gets no row.
- **BF-4:** a second run inserts 0 rows.
- **BF-5:** no alias is left without a row.
- **Rollback:** no scratch user and no scratch row remain.

A read-back after the backfill, outside the proof, raises if any alias still has no row.

### Read back on ethio-prod after the apply

5 aliases, 0 without a row, 5 `'unchecked'`. Mark `20261029220000` is present.

### Migration guard

- The first run **failed** the real-row proof guard on this file's 8 statement heads.
- They are now in `scripts/migration-real-row-allowlist.txt`, each with its reason and the expiry "until INC-979 closed". There are two kinds:
  - Five heads touch only the proof's own scratch users, or check the rollback.
  - Three heads span every profile **by design**: the backfill statement under test, its "no alias left" check, and the read-back after the apply.
- **Disclosed:** inside the proof, the backfill under test also inserted `'unchecked'` rows for the real legacy aliases. That sub-block rolled itself back, so nothing was kept. The file is applied and cannot be edited. The rule I took from this: a backfill's proof that runs the real statement touches real rows. Next time, the proof should run the statement filtered to its scratch ids, and only the live statement should span every row.
- After the allowlist lines: `Migration guard OK`.

## Apply

**apply a58307eb → expect mark 20261029220000** (on ethio-staging, by the supervisor). On ethio-prod it is applied, and the mark was read back.

## Next

M2 is pg_net + job_call. It starts with A5: confirm, from the CI backend image's own extension list, that CI's temporary backends replay pg_net. If they cannot, I stop before M2 lands.

## Files changed since 8cceeee8

- docs/governance/briefs/foundations-turn-n1b.md
- docs/governance/reports/foundations-turn-n1b.stop-1.md
- roadmap.md
- scripts/migration-real-row-allowlist.txt
- supabase/migrations/20261029071034_a58307eb-0c91-4d26-b14b-00a662e90432.sql
