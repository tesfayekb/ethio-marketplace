MIGRATION — t1-tiers part B: the tier is cleared on removal (M2)
DONE: parts C, D, E, A; part B M1 (applied on ethio-staging, round 3) and M2 (file written, not
applied)
LEFT: part B (the control, its strings and e2e), THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW,
THE REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `e5e191c638b1cc0aa11faeb7c7577680e752503f` (short `e5e191c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T04:21:14Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41386156268
FILES: the 37 of stop 1, plus
supabase/migrations/20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql

## The file

- `supabase/migrations/20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql` — 18015 bytes,
  sha256 `a5f81f5aacb491b3b6d3c689b630bce09d80e06dc6e0571a36e2a9f66d9ccb38` (commit 9ac910c4).
- Mark `20261102210000` (ruling 1, answer 7; the stamp 20261102052535 is earlier than the mark).
  Self-mark in the file, last statement.
- `origin/dev` is still `e5e191c6` (the base).

## What it changes

- `public.transition_listing(uuid, text)` redeclared whole from its last declaration
  (`20261015012743_a5300c28…sql:570–744`, section D; no later file redeclares it —
  `20261017060602` and `20261028233839` only mention or call it). Header (VOLATILE, SECURITY
  DEFINER, `search_path = public`) and the three grant lines restated. Argument list unchanged, no
  DROP.
- Two insertions, nothing else:
  1. the owner's delete (`ELSIF p_new_status = 'removed' AND v_owner`): `tier = 'regular', `
     added to its UPDATE;
  2. the shared last UPDATE (`ELSE … SET status = p_new_status`):
     `tier = CASE WHEN p_new_status = 'removed' THEN 'regular' ELSE tier END, ` added.
- **Census hit, named:** the plan called the final `ELSE` "the second removed UPDATE". It is not
  removed-only: it is the UPDATE for every status change without its own branch — `screening`,
  `rejected`, `held`, `sold`, `draft`, and staff's or the service's `removed`. An unconditional
  `tier = 'regular'` there would have cleared the tier on a sale, against the brief's reading
  (sold, expired, held keep it). The insertion is therefore conditional on `p_new_status =
  'removed'` inside that one statement; the two-insertion form and its md5 check still hold.
- **Question for the ruling (not done):** the plan also said the state revision's before/after
  would carry `tier` when it changed. That is a third insertion, outside ruling 1's "two named
  insertions" and its md5 form, so this file does not make it: a removal's revision row stays
  `{status: old} → {status: removed}`, and the tier's clearing is visible on the listing itself
  (and in the feed). Say `continue` to keep it so, or rule a third insertion and I redeclare.

## The md5 (ruling 1, answer 11)

- Body md5 with the two insertions stripped: **`f2b4a89cedf83e4dce63d17be85e1ce8`** — computed
  here from the exact `prosrc` text of `20261015012743` section D (the characters between
  `AS $function$` and `$function$;`, LF line ends, 7887 bytes). The file's body was produced by
  applying the two insertions to that text, and stripping them gives it back byte for byte
  (asserted when the file was written).
- The proof's (b) repeats it on the live row: `md5(replace(replace(replace(prosrc, chr(13), ''),
  '<insertion 1>', ''), '<insertion 2>', ''))` must equal that value, or the apply raises.
  If ethio-prod's live `pg_get_functiondef` differs, the file is to be redeclared from the live
  definition (answer 11).

## The proof (one sentinel block, scratch rows only, rolled back whole)

- Where it ran: proofs not yet executed (no SQL runner here); the staging apply is their first
  run (INC-1033 class line).
- (a) header and grants as the door had them (SECURITY DEFINER, VOLATILE, `{search_path=public}`,
  no PUBLIC grantee, anon cannot execute, authenticated and service_role can).
- (b) the md5 above.
- (c) the service path (no caller) removes an active Premium ad: status `removed`, tier
  `regular`, `deleted_at` null, exactly one `state` revision `{status: active} → {status:
  removed}`, no `feed_index` rows left (it had rank-2 rows before).
- (d) the owner deletes his own active Premium ad: status `removed`, `deleted_at` set, tier
  `regular`, no feed rows.
- (e) sold keeps `premium`; expired keeps `premium`; a screening ad held keeps `premium` — the
  shared UPDATE clears for `removed` only.
- Scratch rows: a market `XZ` named `e2e-mig-t1-m2` (country, its anchor read and switched on by
  that name, a region, a city — the INC-949 way, as M1 round 3), one seller, a category, five
  Premium listings placed in the city (four active, one in screening). The proof reads no real
  row (G27).
- Checked before committing (as stop 1 round 3): `listings_place_unless_draft` (every scratch ad
  carries the city), the other `listings_*` CHECKs and NOT NULLs (defaults; `public_id` by
  `new_public_id()`), `acceptance_guard` (no caller on the inserts; the owner's removal is a
  takedown it never holds — DEC-216), `listings_state_marks` (touches `reserved_at`/`sold_at`
  only), `feed_index_on_listing_insert`/`_update` (rows at rank 2 while active, deleted on
  removal), `rate_gate('revise')` for the owner (the dial exists; a fresh user has no count), the
  reviewer branch for `held` (the service path passes it without step-up).
- Every IF / ELSIF / WHILE / EXIT WHEN condition in the file was scanned for a CASE expression
  (INC-1033): none. The body's two CASEs are an assignment and a SET expression.

## The guards (`bash scripts/check-migrations.sh`, this tree)

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

- No allowlist change: `transition_listing | authenticated` is already a restated-grant line in
  `scripts/public-surface-allowlist.txt`; its acceptance-doors standing is unchanged by a
  redeclaration. The guards do not parse plpgsql (INC-1033).
- Expected after the merge until the file is applied: STAGING BEHIND for this file's mark.

apply 4fb5d636 → expect mark 20261102210000

Next after `continue`: the control (`tier-dialog.tsx`, `tier-reasons.ts`, `setAdminListingTier`,
the Set tier button), the strings (EN + the ruling's AM), `am-script`, `i18n:usage`, the e2e
`admin-listing-tier.spec.ts`, docs, budgets, then THE CHECKS.
