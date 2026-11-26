MIGRATION — cursor-bundle-7b part 1: the review door asks a reason on a rejection (DEC-469)
DONE: STEP 0 (re-landed, decision 1), STEP 2 (part 1: the migration, its door lines, the proof database) and decision 15 (the auth log capture step, with its test and its `wired.test.ts` line)
LEFT: STEP 3 (parts 2 and 3), STEP 4 (part 4), STEP 5, STEP 6, STEP 7
CI: not yet run for this branch. Dev's last completed run (`ci-evidence` ci-status.md): `87aa8bfc32a3cd9c1f9343b7418a8b1d6d20bb14`, SUCCESS (run 45727250754; its lanes were skipped, the code tree proven by run 45720941766). `guards-last-failure.md` names the same run and commit (attempt 1).
FILES:
.github/workflows/local-backend-proof.yml
docs/governance/briefs/cursor-bundle-7b-ruling-1.md
docs/governance/briefs/cursor-bundle-7b-words.json
docs/governance/briefs/cursor-bundle-7b.md
docs/governance/reports/cursor-bundle-7b.stop-1.md
docs/governance/reports/cursor-bundle-7b.stop-2.md
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/ci/auth-log-capture.py
scripts/ci/auth-log-capture.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql

## The re-land (decision 1)

- `git switch -c cursor/bundle-7b-2 origin/dev`, with `origin/dev` at `87aa8bfc32a3cd9c1f9343b7418a8b1d6d20bb14` (unmoved when I started).
- The four paths were copied by `git show cursor/bundle-7b:<path> > <path>`; after staging them, `git diff --cached --stat cursor/bundle-7b -- <the four paths>` printed nothing.
- The ruling and its words file were copied by script from the folder; `sha256sum`: ruling `ae0800bcd86da70bdf3d8ab465317d40eaba1ff3d472dbee91b7d1274acd8c33`, words `b92f77b919f852448aad922ad9e9e4daa781bec993ddb93944bc223342cd90af`, both equal to the carrier's values. The brief is `30ecb2103b7c9660408c101419d88787875a089fd1445930b4dbebf0aed6e53f`, as in stop 1.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7b.md --at 996b9b2e3`: `[check-go] no finding`. Run on the re-landed tree: one finding, as the ruling says it would be — `CF-BRIEF-6 docs/governance/briefs/cursor-bundle-7b.md:83 src/components/shell/failure-notice.census.test.ts :90 holds "}", not census / UNTIL_10B` (10c moved the line). It goes in §11 of the report. The brief is not edited.
- `bunx vitest run scripts/conformance/briefs.test.ts`: 20 passed. `bunx prettier --check roadmap.md`: passed.
- The seven census lines (`failure-notice.census.test.ts` `ALLOW`) are NOT removed in this part: each file still trips the census, so removing a line now would leave a red commit. They go with the files in Part 3, from the list as dev holds it.

## The file

- Name: `supabase/migrations/20261126003400_97e8761d-647e-41cc-baab-ae64a424e85c.sql`
- `sha256sum`: `3d07df111e0e5025bce6954a29a111cb66eb008cf52e86081e50e1846eb48128`
- Size: 26,095 bytes — about 1 KB over rule 30's 25 KB line for splitting. It is one concern (the review door) and the ruling says "Part 1 is one migration file"; about 60 % of it is the proof. Say so if you want it split.
- Declared mark: `20261126020000` (commit at 00:33 UTC; the hour rounded up is 01:00, plus one hour; above the ledger's newest mark `20261125170400`, read by grep over the migrations' `migration_marks` inserts).
- Header: `-- e2e-areas: admin-listings, admin-screening`.
- What it does, in file order:
  1. a pre-check: the ledger's newest mark is applied; the live `admin_review_listing(uuid,text)` body md5 is `803f3638b72b982befe4c58181d523d3` (part 10's, the value its own proof holds; I recomputed it from the file's text and it matches); the four-argument door does not exist; `seller_notices_kind_check` exists.
  2. `seller_notices_kind_check` is dropped and added again with one more kind, `admin_reject` (see Decision for the supervisor 1).
  3. `DROP FUNCTION public.admin_review_listing(uuid, text)` (DEC-384: the operator's paste), then `CREATE FUNCTION public.admin_review_listing(p_listing_id uuid, p_new_status text, p_reason text DEFAULT NULL, p_note text DEFAULT NULL)`, written whole from part 10's body with only DEC-469's lines added; `REVOKE ALL … FROM PUBLIC, anon`; `GRANT EXECUTE … TO authenticated, service_role`.
  4. the proof block and the mark.
- Body change in words: for `rejected`, the reason must be one of the remove list (`badValue:reason` otherwise), the note is required only for `other` (`noteRequired`) and at most 500 characters (`noteTooLong`); the row is read `FOR UPDATE` for `{from, seller}`; after `transition_listing_core` has moved the ad, one `audit_log` row `listing.rejected` with `{from, to, reason, note}` (nulls stripped, as the move writes it) and one `seller_notices` row (`kind admin_reject`, `fields {status}`, the reason, the note). For `active`, `reduced` and `held`, a reason or a note given is `badValue:reason` / `badValue:note`. A refused call writes neither row: the writes come after the core and the refusal handler is part 10's.
- Which tells the seller, as the ruling asks (decision 4): neither `transition_listing_core` nor a trigger tells the seller of a rejection (the core writes `listing_revisions` only; the `seller_notices` inserts in the migrations are `admin_move_listing_core`, `admin_edit_listing_core` and the level sweep, and no trigger file names the table). So the door writes the notice itself, as the move core writes its own. `listing_history` joins a notice to a revision by `created_at`, so the reason shows on the seller's history row of the rejection (one transaction, one `now()`).

| body | before (md5) | after (md5) |
| --- | --- | --- |
| `admin_review_listing(uuid,text)` | `803f3638b72b982befe4c58181d523d3` | dropped |
| `admin_review_listing(uuid,text,text,text)` | — (new) | `9e69c9abd328441324310bf9a17a7dc9` |

No other function body changes.

## The proofs the file carries (one `DO` block; scratch rows only; a clean apply is the pass)

(a) the two-argument door is gone; the four-argument door is `VOLATILE SECURITY DEFINER`, `search_path=public`, `jsonb`, no PUBLIC or anon EXECUTE, authenticated and service role may; its body md5 is the file's; the reason and the note are the two trailing defaults; the kind check holds `admin_reject` and `level_paused`.
(b) refusals, each at its code and status, each metered once (8 in all), nothing written: no reason, a reason off the list (`removed_in_error`), `other` with a blank note, a 501-character note, an approval with a reason, a hold with a note, the reviewer's own ad with a valid reason (`ownListing`), a country reviewer outside their country with a valid reason (`permissionDenied:scope`, 403). Status, revisions, audit rows and notices of those ads are unchanged.
(c) a rejection with a reason and a trimmed note: `{ok, status rejected}`, one state revision by the caller, one audit row `listing.rejected` with `{from: screening, to: rejected, reason: other, note}`, one `admin_reject` notice for the seller with the same reason and note.
(d) a held ad rejected by a country reviewer with a reason and no note: `from` is `held`, no note key in the audit row, a NULL note in the notice.
(e) the service role rejects with a reason: the audit row has no actor, the notice is written.
(f) an approval asks nothing: `{ok, status active}`, no audit row, no notice.

pre-stop scan: 7 of 7, 97e8761d (1: the kind check is changed before the function that writes the kind and before the proof reads it; 2: scratch keys are `e2e-mig-b7b1-…` and the `XZ`/`XY` codes of part 10, none against a CHECK of its own; 3: no bare literal into a typed parameter; 4: the proof reads no real row's value; 5: no random code is drawn twice; 6: the pre-check reads the live md5 of the one body it drops and the previous mark; 7: every compared literal and the live body are `replace(…, chr(13), '')`-stripped, none spans a line break).

## Guard lines

- `bash scripts/check-migrations.sh` ends: `Spanning-literal guard OK (floor 20261109000000).`, `Random-text guard self-test OK …`, `Random-text guard OK (floor 20261118160000).`, `Migration guard OK.` (its self-marking and real-row lines passed above them).
- `bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 21 finding kinds fired on their planted fixtures, the clean pair fired nothing`; `check-doors static OK: 227 manifest lines reconcile with the migrations' catalogue`.
- `bun run db:proof --fresh`: `db:proof PASS — applied 562/562, CLI 2.120.0, cold, 56 s` (the stack was stopped afterwards with `--stop`).
- `bunx vitest run scripts --maxWorkers=2`: on a loaded machine (a second vitest run and the proof stack in the same minutes) nine tests timed out at their 5 s default (CFG-3, CF-PIN-1, CF-DIALOG-1, CF-NN-1, CF-DOCS-2, CF-DOCS-10, SLB-6, CF-LANES-4, AAN-1 — each a walk of the whole tree, 8 to 34 s under load). Their files, run again alone with `--testTimeout=120000`: 5 files / 28 tests passed, then 3 files / 23 tests passed (and `dialogs.test.ts`: 14 passed). I did not run the whole `scripts` project in one clean pass; `bun run checks` (the gate) is for the final push (decision 15 says this push is a stop's own). `bun run typecheck` and `bun run lint` were not run on the whole tree: this stop changes no `src/` file; the three new/changed `.ts` files passed `eslint` and `prettier`.
- `bun scripts/check-acceptance-doors.ts` needs the live catalogue (`path` argument): NOT RUN here; the smoke lane runs it.

## Decisions for the supervisor (each one is the reviewing reader's to change before the apply)

1. A rejection's notice kind. `seller_notices.kind` allows `admin_edit, admin_remove, admin_restore, admin_send_back, level_ending, level_paused` (`20261105080104` :46). The ruling says to write the notice "the way `admin_move_listing_core` writes it" and there is no rejection kind. Writing `admin_remove` would read as a removal: `my_listing` reads the latest `admin_remove` notice as the removed ad's reason. So this file adds `admin_reject` to the check (the `reason_by_kind` check already requires a reason for every `admin_%` kind, and every remove-list reason is in the reason check). The ruling did not name this change; it is one `ALTER TABLE` pair inside the same file. If you rule otherwise, the door's INSERT is the one line.
2. An approval or a hold given a reason or a note is refused (`badValue`), as the plan said. If a later caller sends a reason with an approval, this is where it fails.
3. The service role must also give a reason to reject (the same rule for every caller). No current service caller rejects; the three callers in `e2e/admin-screening.spec.ts` (:289, :308, :887) approve (`active`), so none changes.
4. The manifest's `audit` column stays `-` for this door, as `admin_move_listing`'s does (its audit row is written, the column is for a door-shell audit action).

## Lines moved with the door

- `scripts/doors/manifest.txt`: the key becomes `admin_review_listing(uuid,text,text,text)`; codes `badValue,noteRequired,noteTooLong`; the reason text names DEC-469.
- `scripts/public-surface-allowlist.txt` (the `admin_review_listing` line, by name) and `scripts/acceptance-doors-allowlist.txt` (key `admin_review_listing(uuid,text,text,text)`): the new key / reason.
- `scripts/conformance/refusal-classes.txt`: unchanged (`noteRequired`, `noteTooLong` are in it).
- `src/integrations/supabase/types.ts` is the supervisor's patch (the door's `Args` gain `p_reason?: string; p_note?: string`); I did not touch it, so `src/` still calls the two-argument form, which the defaults keep working.

## Decision 15 (the auth log capture), landed in its own commit

- `.github/workflows/local-backend-proof.yml`: a step "Capture the auth server's failures (INC-1303)", `if: failure()` (repeat lane only when it ran), before the failed-steps step and the evidence writer. It finds the one `supabase_auth_*` container (as the database's is found), reads its log, and runs `scripts/ci/auth-log-capture.py`, which prints counts by method, path (ids made `:id`, query cut) and status, plus each answer at 500 or above's `error_code` and `msg` cut at 120 characters, every line through `scripts/ci/redact.py` (DEC-368). Never a header, a token or a body. Its file `local-backend-auth-capture.txt` joins the `e2e-log-<lane>` artifact.
- `scripts/ci/auth-log-capture.test.ts`: CF-AUTHLOG-1 (counts and the cut message), CF-AUTHLOG-2 (a planted token, e-mail address, bearer, referer and body never reach the output; the secrets are made at run time), CF-AUTHLOG-3 (the workflow runs it on a failed lane before the evidence and keeps its file). `scripts/conformance/wired.test.ts` names the script's caller and test. `bunx vitest run scripts/ci scripts/conformance/ci-images.test.ts scripts/conformance/wired.test.ts`: 19 files, 128 passed, 1 skipped (the skip is a pre-existing one in that set).
- `actionlint` is not on this machine; `bun run checks` runs it by checksum at the gate.
- Part 4 fixes INC-1303 at the cause the capture shows; if no failed lane has been captured by the final push, INC-1303 stays open with the step in place, and the report says so (decision 15).

## The pull request and the expected red

- A new draft pull request into `dev`, titled with #110's title plus "(re-land of #110)"; the operator closes #110 unmerged. Nothing is deleted.
- The pull request's preflight reports "STAGING BEHIND" until ethio-staging holds mark `20261126020000` — expected.

## The apply

The file holds a `DROP FUNCTION`, so it is applied on ethio-staging by the operator's paste (DEC-384).

apply 97e8761d → expect mark 20261126020000
