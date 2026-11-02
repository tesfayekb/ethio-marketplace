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

- `supabase/migrations/20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql` — 18021 bytes,
  sha256 `2f4f4846a0e9bda7f158d9c270224b9029f1c2b066dc8eb866b5c8e6a9bdb50e` (commit bee11812).
- Round 1 (sha256 `a5f81f5a…cb38`, 18015 bytes) was NOT applied, INC-1033 c: proof (b)'s two
  insertion literals held single quotes inside single-quoted SQL literals (`'tier = 'regular', '`),
  which Postgres reads as `'tier = '` then the identifier `regular` (`ERROR 42601`). Both inner
  quotes are now doubled (`'tier = ''regular'', '`; `'… = ''removed'' THEN ''regular'' …'`). The
  function body itself is untouched (proven byte-equal to the old one, answer 1). Name and mark
  unchanged.
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
- The conditional second insertion is ACCEPTED (stop-2 ruling, answer 2); the final report names
  it under Departures with the reason.
- The third insertion the plan had (the state revision carrying `tier` when it changed) is ruled
  NOT now (stop-2 ruling, answer 4): the owner's and staff's history already show the tier change
  through M1's revision row, and the state revision's shape is shared by every transition. The
  file stays two insertions; the final report lists it under "left", with a roadmap line at the
  records turn.

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
  run (INC-1033 class line). Round 1 was refused before the apply (answer 3); this is the second
  attempt.
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
- The pre-commit scan (stop-2 ruling, answer 6), run on this file and on M1, each 0 findings,
  and proven on the three earlier failures planted (M1 round 1: the CASE, the placeless active
  listing, the real-country read; M2 round 1: the three quoted literals):
  (i) a CASE expression inside an IF / ELSIF / WHILE / EXIT WHEN condition is parenthesised — the
  body's two CASEs are an assignment and a SET expression, outside any condition;
  (ii) every string literal with a quote inside is doubled or dollar-quoted — the walk tokenises
  `--` comments, `$tag$` bodies and `'…'` literals with `''` escapes, and flags a literal whose
  closing quote runs straight into an identifier character;
  (iii) every non-draft scratch listing has a place — every `INSERT INTO public.listings` that
  names a `status` also names `location_id`;
  (iv) the proof reads no real row — every SELECT / UPDATE / DELETE on a reference table carries
  the `e2e-mig-` namespace or is keyed by a scratch variable (and the real-row guard judges again).
  The scan lives outside the repository (a `/tmp` script); the four checks are named here as the
  ruling asks.

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
