# Foundations turn N1b-2 — stop 4 (N1b-2b: M3b, the release stamp)

## CI line

ci-evidence (raw, read 09:2x UTC): ci-status.md still names `37ff1f04` FAILURE (Completed 09:00:34Z) — only the three reds stop 1 fixed; 2,051 E2E passed. No newer run has a verdict yet. No other red.

## Before the apply

- The two live definitions were read again: md5 `9b4bfa97…` (save_posting_identity) and `c9ea5a33…` (admin_update_profile), the same as at the build. The draft was built from them, so it was not stale.
- The migration guard over the migrations plus the draft:

```text
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

## The first apply was refused by its own proof (nothing landed)

The first submission failed with `ERROR: P0001: SPA-5i previous shown`. A read-back showed mark 20261030021500 absent and neither function changed, so the whole migration rolled back.

- **Cause:** a proof defect, not a defect in the stamp. Both renames ran in the proof's one transaction, so both releases have the same `now()`. `seller_public_previous_alias` orders by `released_at DESC`, so it saw a tie and picked the earlier 'clean' name rather than the held one. Real renames are separate saves, so their release times differ.
- **Fix:** after SPA-5g, the proof ages its own scratch first-name row by an hour (`taken_at` −2 h, `released_at` −1 h), as two separate saves would leave it. No assertion changed or was removed.
- **Before the retry:** the guard ran again, with that statement's real-row line added, and printed `Migration guard OK.` The retry was submitted as a patch on the failed text.
- **K2 (reported, not changed):** if one transaction ever released two names, `seller_public_previous_alias` and `my_seller_line` would break the tie arbitrarily. No door releases twice in one transaction today. A tie-break on `h.id` or `taken_at` would make the order total. That is for the supervisor to rule; it is not built here.

## M3b — applied on ethio-prod

**apply 0cd49f0d → expect mark 20261030021500** (read back: present).

File `supabase/migrations/20261029092611_0cd49f0d-bdbc-4c3d-b789-f1fbe20db2c7.sql`, 19,577 bytes, sha256 `4dba018d…b39331a`.

- `save_posting_identity` and `admin_update_profile` are redeclared whole from their live definitions. Argument lists are unchanged and there is no DROP.
- Before the check row is reset (owner rename) or reset or removed (staff), the outgoing name's state is read and written as `released_state` on its release, in the same transaction. If there is no row, it is written as 'unchecked' (withheld, the safe direction).
- Closers are restated from the live ACL: REVOKE PUBLIC, anon; EXECUTE authenticated; ALL service_role.
- Read back on prod: both bodies carry `released_state = v_out_state`; anon can run neither; 0 names are held.
- No trial ran on ethio-prod. The refused first submission was the apply itself, rolled back by its proof.

### Proof

The proof ran on its own scratch rows only and was rolled back whole. It raises on any failure, uses no Vault entry and calls no job_call.

**Scratch rows:**
- one `e2e-n1b2-` seller, whose names are saved through `save_posting_identity` and whose states are set only through `name_check_mark`;
- one scratch staff member, with a scratch role holding `profiles:update` and a scratch aal2/TOTP session;
- the legacy mixed-case alias, set on the scratch seller's own profile.

**Checks:**
- **SPA-5g:** an owner rename stamps the outgoing 'clean' name `clean` and sets its `released_at`. The new name's row stays open and its check is 'unchecked'.
- **SPA-5h:** a staff rename of the held name (mixed-case shape) stamps it `imitates`. The new staff name is 'clean' and the seller page finds it.
- **SPA-5i:** the held name, now previous, is never the public previous name.
- **SPA-5k:** both definitions carry the stamp; anon cannot run either function and authenticated can.
- **Rollback check:** no scratch user, role or history row remains.

## Files

- `supabase/migrations/20261029092611_0cd49f0d-bdbc-4c3d-b789-f1fbe20db2c7.sql` (written by the migration tool)
- `scripts/migration-real-row-allowlist.txt` (three lines for M3b)
- `roadmap.md`
- `docs/governance/reports/foundations-turn-n1b-2.stop-4.md`
