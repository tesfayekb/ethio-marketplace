QUESTION — p2-fold-c3 part B6 (INC-1083, ruling 1 Q6): an eleventh template takes validate_listing_draft out of the seller-name census
DONE: part A (the Reach section); housekeeping B1–B5; B6's reader half (1fdbe43fe)
LEFT: B6's seller-names half; B7 (FE-13); the siblings C1–C3; the usage maps; M-3c-c and its MIGRATION stop
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `fde97fa9cf5b6c32e50966a10d2e6252511225d0` (short `fde97fa`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T08:33:44Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42584027580
FILES (git diff --name-only 588690676..HEAD, c3's own; origin/dev is still f2d558467, the merge base):
docs/features/ci-guards.md
docs/features/my-listings.md
docs/governance/briefs/p2-fold-c3-ruling-1.md
docs/governance/briefs/p2-fold-c3-strings.json
docs/governance/reports/p2-fold-c3.stop-1.md
docs/governance/reports/p2-fold-c3.stop-2.md
e2e/helpers/reach-rows.ts
e2e/my-listings-levels.spec.ts
e2e/my-listings-promote.spec.ts
scripts/admin-tables.test.ts
scripts/check-migrations.sh
scripts/check-outbound-calls.ts
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.ts
scripts/fixtures/bad-real-pick-proof-example.sql
scripts/migration-real-row-allowlist.txt
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/routes/api/public/jobs.test.ts
src/server/jobs/route.ts

## The premise the census proves wrong

Ruling 1 Q6 rests on my stop-1 simulation: ten template-built functions, and "the simulation
showed no finding changes". The simulation counted wrong. My census grepped
`CREATE OR REPLACE FUNCTION` inside `format(` and missed a plain `CREATE FUNCTION` template:

- `supabase/migrations/20261107125358_704f04ac-89c6-4b05-b247-5788ad7463e4.sql:78` —
  `EXECUTE format('CREATE FUNCTION public.%I(%s, p_listing_id uuid DEFAULT NULL::uuid) …',
  'validate_listing_draft', …)`. That is `%I` with a literal argument, so ruling 1's rule marks it
  computed.

The reader as built (committed at 1fdbe43fe) marks eleven template functions plus `attr_import_plan`
by hand. MGR-7 pins the exact twelve:
admin_commit_attribute_import, admin_commit_category_import, admin_commit_location_import,
admin_import_translations, admin_undo_attribute_import, admin_undo_category_import,
admin_undo_import, admin_undo_location_import, attr_import_plan, edit_my_listing,
public_listing_json, validate_listing_draft.

## What changes and what does not

- The reader's five other consumers (door-answers, listing-designation, proof-readers, sql-writes,
  status-map) pass unchanged with all twelve: 22 of 22 tests. For them the simulation's conclusion
  holds.
- The laws: `bunx vitest run scripts --maxWorkers=2` gives 501 passed and 1 failed. The failure is
  NH-6, this Mac's known limit (its `date` ignores TZDIR), which CI judges.
- **The seller-name census changes.** With seller-names.test.ts moved onto the reader and computed
  names skipped (the move is written and set aside, not committed), SPA-10a fails:
  `scripts/conformance/seller-names-allowlist.txt:14 stale allowance: validate_listing_draft | owner door; reads the caller's own name only to refuse a missing one | 2027-04-30`.
  Today's `latestBodies` reads the declared text in 20261103040808 for validate_listing_draft, a
  finding the allowlist excuses. 20261107125358's own comment (lines 76–77) says the name went
  through `%I` precisely so that census would keep reading that declared text.
- The live function still reads the name. Its body is 20261103040808's, with two fragments replaced
  (`v_f1a`→`v_f1b` and `v_f2a`→`v_f2b`, both about the reach row), and neither fragment touches the
  `seller_alias` read. So following the rule as written takes a live name reader out of the census:
  judged readers go from 17 to 16. No other guard judges the law: `rg -ln "seller_alias|alias_history" scripts .github`
  finds only seller-names.test.ts and five list files (four allowlists and the door manifest).

None of the other ten changes a seller-name finding. The eight import doors and edit_my_listing
already read as a `%s` body under `latestBodies`. public_listing_json's earlier declaration reads no
name column.

## The question

How should seller-names.test.ts treat validate_listing_draft once it is computed?

1. As ruled: skip it and print its reason (`built by a format() template in 20261107125358_…`), and
   remove its allowlist line as stale. The census then judges 16 readers, and this one is unjudged
   until it is next declared whole.
2. The seller-name census, alone among the consumers, judges a computed function by the last body
   the reader CAN read, which is the declaration before the template, and prints that it does so.
   The allowlist line stays, and the reader exposes that earlier declaration beside the computed
   mark.
3. Another ruling.

Until the ruling, the tree is green: the reader's half is committed (MGR-6 and MGR-7 green),
seller-names.test.ts is unchanged from 7fd1922ba, and no other part has begun. The set-aside move is
/tmp/ethio-scratch/p2-fold-c3/seller-names.test.ts.on-reader (the operator's to remove).

## Corrections

- My stop-1 census named NCJ-10 as free; it was taken. The jobs test is NCJ-13 (B4, 9da5fd601).
- My stop-1 census counted ten template functions; there are eleven, as above.
