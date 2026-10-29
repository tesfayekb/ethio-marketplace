# Foundations turn N1b-2 — stop 3 (N1b-2b: M3a, the seller page and the owner's line)

## CI line

ci-evidence (raw, read 09:1x UTC): ci-status.md names `37ff1f04` (the plan commit) FAILURE — Gitleaks, i18n used-on map, Lane smoke: the three reds stop 1 fixed, as the ruling foresaw; guards-last-failure.md the same run (Gitleaks); e2e-last-failure.md the same run (Passed 2051 · Failed 0; "Sources without results: smoke"); local-backend-proof.md `37ff1f04`, smoke "not run". The runs on 7583664d and bff53069 were not yet in the evidence. No other red.

## Why M3 is two migrations

Built whole, M3 was 30,018 bytes — over the ~25 KB line — so it is split by concern:
- **M3a** (13,515 B): the reads — `seller_feed_page` and `my_seller_line`. Applied at this stop.
- **M3b** (19,230 B draft): the writers — the release stamp in `save_posting_identity` and `admin_update_profile`. Built and guard-checked, **not applied**; it is the next stop, because each migration stops after its prod apply.

All four live definitions were read by `pg_get_functiondef` as base64 with their md5 (each matched); all are under 10 KB (seller_feed_page 5,271 · my_seller_line 1,209 · save_posting_identity 6,822 · admin_update_profile 4,389). Each change is a computed insertion that asserts its anchor occurs exactly once.

## The migration guard, before the apply

Run over a copy of the migrations plus both drafts (`MIGRATIONS_DIR=/tmp/mg`), with the drafts' four real-row lines in a scratch copy of the allowlist:

```text
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

After the apply, M3a's two lines are in `scripts/migration-real-row-allowlist.txt` under the file's real name, and the guard over the project's own directory says `Migration guard OK.`

## M3a — applied on ethio-prod

**apply 85de2619 → expect mark 20261030020000** (read back: present).

File `supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql`, 13,515 bytes, sha256 `8824f4a9…c32374a`.

- `seller_feed_page(text, jsonb, integer)` redeclared whole; argument list unchanged; no DROP. The lookup by the lower-cased key is unchanged; the SELECT no longer reads `p.seller_alias`; the shown name is `seller_public_alias(v_seller)`, and when that is NULL (a held name) the door raises `seller_feed_page: unknownSeller` — the same message and SQLSTATE as an unknown name, for every caller, the owner included (R5). Closers: REVOKE PUBLIC; EXECUTE anon, authenticated (its live ACL); ALL service_role.
- `my_seller_line()` redeclared whole; adds `under_review` — any `imitates` row on the name subject, with no text condition (the same fail-closed test as the helper, INC-986). The owner keeps `alias` as stored and their own `previous_alias`. Closers: REVOKE PUBLIC, anon; EXECUTE authenticated; ALL service_role.
- Read back on prod: the feed's definition calls the helper; the line's carries `under_review`; anon can run `seller_feed_page` and cannot run `my_seller_line`; 0 names held today.
- No trial ran on ethio-prod; the apply was the only run there.

### Proof (scratch only, rolled back whole, raising on failure; no Vault, no job_call)

One scratch `e2e-n1b2-` seller, its name saved through `save_posting_identity`, its states set only through `name_check_mark`:
- The unknown-name answer is captured first (message and SQLSTATE) and is `seller_feed_page: unknownSeller`.
- SPA-3a: `unchecked` — found, with its name.
- SPA-3b: `clean` — found. SPA-6b: the owner's line has `under_review` false.
- SPA-3c: `imitates` — the door answers the unknown name's exact message and SQLSTATE, by the lower-case and the upper-case key.
- SPA-6a: the owner's line keeps the name and gives `under_review` true.
- SPA-3d / SPA-6c: the legacy mixed-case alias (set on the scratch profile itself), held on the lower-cased text — not found; the owner's line shows the alias as stored, `under_review` true.
- SPA-3e: the definitions read back (helper present, `p.seller_alias,` absent, `under_review` present). SPA-3f: the ACLs, and the helper still not executable by anon.
- The rollback check: no scratch user and no scratch history row remain.

## M3b — ready, not applied

`save_posting_identity` and `admin_update_profile`: before the check row is reset (or removed), the outgoing name's state is read and written as `released_state` on its release, in the same transaction; no row reads as `unchecked` (withheld, the safe direction). Its proof covers SPA-5g (an owner rename stamps `clean`), SPA-5h (a staff rename of a held name stamps `imitates`, the new staff name is `clean` and found), SPA-5i (the held name, now previous, is never the public previous name) and SPA-5k (definitions, ACLs), on its own scratch seller, scratch staff, scratch role and scratch TOTP session, the legacy mixed-case shape included. Its mark at apply: 20261030021500.

## Departures

- M3 split into M3a and M3b by size (30,018 B), as the ruling allows; this stop holds M3a only.

## Files

- `supabase/migrations/20261029091909_85de2619-cec0-459c-b6c0-4e58f4e906b8.sql` (by the migration tool)
- `scripts/migration-real-row-allowlist.txt` (two lines)
- `roadmap.md`
- `docs/governance/reports/foundations-turn-n1b-2.stop-3.md`
