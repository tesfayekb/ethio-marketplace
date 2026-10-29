# Foundations turn N1b-2 — stop 2 (N1b-2b: M2, INC-986 fixed forward)

## CI line

ci-evidence (raw, read 09:0x UTC): ci-status.md names `c0e006ee` FAILURE (i18n map, Gitleaks, Lane smoke, staging E2E: the three reds stop 1 fixed); guards-last-failure.md and e2e-last-failure.md the same run (gating E2E failures 0); local-backend-proof.md `c0e006ee`, smoke "not run". The run on 7583664d (the first real run of C3's fix) was not yet in the evidence.

## A red of my own, found and fixed before M2

At stop 1 I did not run `bash scripts/check-migrations.sh`. It refuses M1's file (709fb25b): two proof statements read `profiles`/`alias_history` by `v_u`, the proof's own scratch user, without the `e2e-mig-` mark. The file is applied and not editable, so the two heads are now lines in `scripts/migration-real-row-allowlist.txt`, each with its reason and `until INC-977 closed` (the cba46fd4 / a58307eb precedent). M2 needed three such lines. The guard now passes: "Real-row proof guard OK", "Migration guard OK".

## M2 — applied on ethio-prod

**apply 2c2b5ef0 → expect mark 20261030013000** (read back: present).

- `seller_public_alias(uuid, text)` redeclared whole: it hides whenever the name's check row is `imitates`, **with no text condition** (INC-986, fail-closed). The read-back shows no `checked_text` in its body; EXECUTE still service_role only.
- `public_listing_json(listings, uuid)` redeclared whole from the live `pg_get_functiondef` (12,782 bytes; argument list unchanged; no DROP). Only the seller block changes: `seller_public_alias(pr.user_id)` for the name, `seller_public_previous_alias(l.seller_id)` for the previous name. The body no longer reads `pr.seller_alias` or `alias_history`. Closers restated (REVOKE PUBLIC, anon, authenticated; EXECUTE service_role — the live ACL it had). Read back: anon false.
- File 20,145 bytes (under ~25 KB, so not split).
- No trial copy ran on ethio-prod. The apply was the only run there (new rule). Before the apply, the guard ran over the draft file locally; no database was involved.
- Proof (scratch only, rolled back whole, raising on failure; no Vault, no job_call):
  - One scratch `e2e-n1b2-` seller, its alias then set mixed-case on its own profile (the legacy shape). The ad is an in-memory `listings` row, never written.
  - SPA-2a: unchecked, name shown.
  - SPA-2b: clean, name shown.
  - SPA-2c: imitates, no name for a visitor or for the owner, and the alias is absent from the answer's bytes.
  - SPA-1f: the mixed-case alias with an `imitates` row on the lower-cased text answers NULL.
  - SPA-2d: the ad's public read gives the same result for that case.
  - SPA-5f: a legacy NULL release is withheld; a clean release is shown.
  - SPA-2e: the definitions read back; SPA-1g: no text condition; SPA-2f: ACLs.
  - This replaces M1's stale-text expectation: an `imitates` row now hides whatever its text.

## INC-986 census — every comparison between checked_text and a name

SQL, live definitions on prod (`pg_get_functiondef … like '%checked_text%'`):
- `seller_public_alias` — **removed** in M2 (was `c.checked_text = pr.seller_alias`).
- `name_check_mark` — `WHERE profile_id = p_profile AND subject = p_subject AND checked_text = p_text` (two statements). **Kept as ruled:** it stops a verdict landing on a name that changed while the model was answering. Its callers pass the stored lower-cased text: `src/server/jobs/name-check-catchup.ts:124` (`p_text: row.checked_text`) and the save route's clean mark after `ok`.
- `save_posting_identity` — writes `checked_text = EXCLUDED.checked_text` (the door's `lower(btrim(...))` alias) and resets to `unchecked`. It writes; it does not compare.
- `admin_update_profile` — writes `checked_text` and sets `clean`. It writes; it does not compare.

App:
- `src/server/jobs/name-check-catchup.ts:76` selects `checked_text`, `:97` sends it to the model, `:124` marks with it. The model judges and the mark matches on the same stored text, so there is no comparison with the alias column.
- `src/routes/api/public/jobs.test.ts:22,127-128,183` are fixtures. There is no other match under `src/` or `scripts/` besides the real-row allowlist's quoted heads.

The one fold for "a seller name compared across tables" is `lower()`. From now on, every proof's scratch names include the legacy mixed-case shape.

## Next

M3: `seller_feed_page`, `my_seller_line` (review flag), and release stamping (`released_state`) in `save_posting_identity` and `admin_update_profile`, each redeclared whole, with its own stop.
