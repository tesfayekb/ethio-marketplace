MIGRATION — p2-fold-c2b M-3c-b: listing_caps, the product door's p_caps, admin_list_listings by the levels dictionary, the coverage resource deleted, the plan seam dropped
DONE: ruling 1 §7 part 2 steps 1–8 (step 5's editor fields excepted, ruling 2 §2); ruling 2 §1 (the three columns, the six Guide keys); M-3c-b parts (i)–(v), written and proven on `db:proof`
LEFT: after "continue" — the types patch; the product editor's three fields and `p_caps` sent (MNS-3); `e2e/helpers/pool-reset-map.ts:54` leaves; the specs run (MLA-19, PW-193, MON-18, AG-1); THE CHECKS; the budgets; the self-review; the final report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `68b5a8bcca99a1a640d29d7d91620cdd9787dd5b` (short `68b5a8b`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-09T04:54:26Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42562258710
FILES:
docs/features/admin-guide.md
docs/features/ci-local-backend.md
docs/features/coverage-console.md
docs/features/geography.md
docs/features/listings.md
docs/features/plans.md
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c2b-ruling-1.md
docs/governance/briefs/p2-fold-c2b-ruling-2.md
docs/governance/briefs/p2-fold-c2b-strings-2.json
docs/governance/briefs/p2-fold-c2b-strings.json
docs/governance/reports/p2-fold-c2b.stop-1.md
docs/governance/reports/p2-fold-c2b.stop-2.md
docs/tracking/intentional-deletions.txt
e2e/admin-guides.spec.ts
e2e/admin-monetisation.spec.ts
e2e/my-listings-ad.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-where.spec.ts
public/i18n-usage.json
scripts/acceptance-doors-allowlist.txt
scripts/conformance/admin-guides.test.ts
scripts/conformance/door-answers.test.ts
scripts/conformance/door-answers.ts
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.test.ts
scripts/conformance/perm-vocabulary.ts
scripts/conformance/plan-seam-allowlist.txt
scripts/conformance/plan-seam.test.ts
scripts/conformance/proof-readers.test.ts
scripts/conformance/proof-readers.ts
scripts/conformance/sql-writes.test.ts
scripts/conformance/sql-writes.ts
scripts/conformance/status-map.test.ts
scripts/conformance/status-map.ts
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/e2e-select.ts
scripts/public-surface-allowlist.txt
src/features/admin-monetisation/caps-editor.tsx
src/features/admin-monetisation/caps-forms.ts
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/level-overrides-table.tsx
src/features/admin-monetisation/monetisation-columns.tsx
src/features/admin-monetisation/monetisation-dialogs.tsx
src/features/admin-monetisation/monetisation-forms.test.ts
src/features/admin-monetisation/monetisation-forms.ts
src/features/admin-monetisation/monetisation-order.test.ts
src/features/admin-monetisation/monetisation-order.ts
src/features/admin-monetisation/monetisation-page.test.tsx
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/monetisation-rows.ts
src/features/admin-monetisation/monetisation-service.test.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-monetisation/override-dialog.tsx
src/features/admin-monetisation/product-editor.tsx
src/features/admin-monetisation/product-prices-table.tsx
src/features/admin-monetisation/products-section.tsx
src/features/admin-monetisation/use-monetisation-names.test.ts
src/features/admin-monetisation/use-monetisation-names.ts
src/features/admin-monetisation/use-monetisation.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/schema-shape.ts
src/features/posting/step-where.test.tsx
src/features/posting/step-where.tsx
src/features/posting/use-edit-draft.test.ts
src/features/posting/use-edit-draft.ts
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-guide.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/routes/admin.monetisation.tsx
supabase/migrations/20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql
supabase/migrations/20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql
supabase/migrations/20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql
supabase/migrations/20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql
supabase/migrations/20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql

(`scripts/conformance/plan-seam.ts` left under its rename to `migration-reader.ts`; it,
`plan-seam.test.ts`, the caps block's three files and `plan-seam-allowlist.txt` are declared in
docs/tracking/intentional-deletions.txt, each commit marked `[intentional-delete]`.)

## The apply pairing (in this order; the operator pastes every part, DEC-323)

```
apply bddc8991 → expect mark 20261109070000
apply b2f1fad4 → expect mark 20261109070100
apply 68fda306 → expect mark 20261109070200
apply 5c76824a → expect mark 20261109070300
apply 96b91fc3 → expect mark 20261109070400
```

Each part refuses to run unless the mark before it is present (part (i) requires M-3c-a part 7's
20261108130000). Until all five are applied to ethio-staging, every browser run there stops at the
preflight with `STAGING BEHIND: apply … to ethio-staging before E2E can pass` (read here at AG-1's
local attempt), and CI's staging E2E job is red for the same reason; CI's temporary-backend lanes
apply the branch's migrations themselves.

## The files

| Part | File | sha256 | Mark |
| ---- | ---- | ------ | ---- |
| (i) | `20261109044933_bddc8991-cde8-4b08-95c4-6cbdc189c52b.sql` | `5c3b6ffbe6c6937afe8daf73e5061a6268e67f07ccbad0ce2660c49b1532ade9` | 20261109070000 |
| (ii) | `20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql` | `395c2dc70cf02284aa7dfcb272d01f3049723059a947204eceb05586ab8e93da` | 20261109070100 |
| (iii) | `20261109044935_68fda306-552d-48f5-9720-35e6a79ff605.sql` | `587367c60190659145b621ec9f710d88b58c69717054688c7087c56e810a96f7` | 20261109070200 |
| (iv) | `20261109044936_5c76824a-9cfe-4353-b14f-676443a19c6d.sql` | `02aa440dbef49af89d4bbbd35fcd9cb778a3ab6143e3a3f4f5c7a24b64d85d1f` | 20261109070300 |
| (v) | `20261109044937_96b91fc3-12b4-458a-9951-4d391f96b9ab.sql` | `0447d396a156fff77e1522a56fae3901142c859f0e5b28f33716e2ebe639c06a` | 20261109070400 |

- **(i)** New `public.listing_caps(p_listing uuid, p_country character DEFAULT NULL)` (STABLE,
  service-only: `REVOKE ALL … FROM PUBLIC, anon, authenticated; GRANT ALL … TO service_role`),
  the ruling's body. `public.my_listing_private(uuid)` is redeclared whole from live (pre-check md5
  `4d2baee59c0d512d02c1133a1a031979`), adding one key, `'caps', public.listing_caps(v_row.id)`, with
  its grants restated. Proofs:
  - the header and the grants;
  - the body with that one fragment removed hashes to the old md5;
  - on scratch rows (market XZ, currency XTS, a level of 6 photos, a bought reach with caps
    NULL/3/1 on draft a), the seller's read answers
    `{plan, max_photos: 6, max_cities: null, max_regions: 3, max_countries: 1}`, equal to
    `listing_caps(a)`; the answer's keys are exactly the old eight plus `caps`;
  - draft b without a reach answers the market's included reach (2/1/1);
  - an unknown ad answers NULL; another seller is refused `not your listing`.
- **(ii)** `admin_save_listing_package` DROP + CREATE (pre-check md5
  `11d4e1b1b79202d395134f2cb6cfed40`) with a trailing `p_caps jsonb DEFAULT NULL`; new body md5
  `61aa36df2245ba685201bb0dc33e28ca`; `REVOKE … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated, service_role`. A level refuses caps (`caps on level`). On a reach row, a NULL
  `p_caps` keeps the stored caps, and a new reach row without caps is refused `bad caps`. Otherwise
  the value must be an object with exactly `max_cities`, `max_countries` and `max_regions`, each a
  JSON null or a whole number from 1 to 999999999, else `bad caps`. Proofs, as a scratch super admin
  on a fresh second factor:
  - the header has 13 arguments, 6 defaults, the 13th named `p_caps`; the old signature is gone;
  - the new md5, and the fragments reversed give the old md5;
  - a reach row is born with caps, and an audit row; NULL keeps; a partial set is stored exactly;
    a level saves without caps;
  - every refusal (zero, a missing key, an extra key, a string, 1.5, an array, JSON null,
    caps on a level, a new reach row without caps) writes nothing: the audit count holds.
- **(iii)** `admin_list_listings` CREATE OR REPLACE whole from live (pre-check md5
  `901086604a4975acd5073b63a5dccea6`, header from 20261105080110); its tier literal set becomes
  `EXISTS (… listing_packages k WHERE k.key = p_tier AND k.kind = 'level')` (Q11); new md5
  `05a60d67383ba629298d497c65afe6ab`; grants restated. Proofs:
  - a scratch level filters to its ad;
  - a switched-off level answers no rows and no refusal;
  - a made-up key and a reach key are refused `unknown tier`.
- **(iv)** `DELETE FROM public.resources WHERE name = 'coverage'` after a pre-check that no core
  role holds a coverage permission; an `$after$` check that the resource, its permissions and their
  role grants are gone. Proof: a scratch role holding `locations:manage` holds `locations:view`
  (the control) and neither `coverage:view` nor `coverage:update`.
- **(v)** A comment-stripped scan of every live body in `public` (`regexp_replace(prosrc,
  '--[^\n]*', '', 'g')`, the four functions themselves excepted) raises if any names one of the
  five objects; then `DROP FUNCTION` `admin_set_coverage_plan(text, integer, integer, integer,
  boolean, smallint, integer, integer, boolean, text)`, `plan_caps(text)`, `plan_photo_cap(text)`
  and `seller_plan(uuid)`, and `DROP TABLE public.coverage_plans`. Proof: the five objects and
  the policy `coverage_plans_public_read` are gone and no live body names them.

Every proof runs in a `DO $proof$` block that ends with its sentinel RAISE (`…-proof-ok`); every
rollback check finds no scratch row left (`email LIKE 'e2e-mig-%'`).

## The pre-stop scan (6 of 6)

1. The statement order holds: readers move first (parts (i)–(iii)), then the resource delete
   (part (iv)), then the drops (part (v)); each file's proof follows its change.
2. Every scratch key fits its CHECK `^[a-z][a-z0-9_]{1,31}$` (the longest, `e2e_mig_rbuy_` plus
   eight characters, is 21).
3. The literals are typed: `5::smallint` where the door takes a smallint; bare integers are only
   assigned into columns.
4. No proof expects a real row's value; the scratch sorts are derived (`max(sort) + 100`).
5. Every random draw is its own `gen_random_uuid()`; the fixed codes XZ and XTS are ISO's
   user-assigned and test codes, named as the K4 exception inline.
6. The pre-checks chain the marks (20261108130000, then 070000 to 070300) and the live md5s.

## The checks run at this stop

- `bash scripts/check-migrations.sh`: `Migration guard OK.`
- `bun scripts/doors/check-doors.ts`: `check-doors static OK: 265 manifest lines reconcile with the
  migrations' catalogue`
- `SELF_TEST=1 bun scripts/check-acceptance-doors.ts`: `Acceptance-doors self-test OK: the real
  allowance is well formed`
- `bunx vitest run scripts --maxWorkers=2`: 496 passed, 1 failed of 497 (98 files). The one red
  is NH-6 (scripts/ci/nightly-hour.test.ts), this machine's time-zone database, outside the diff;
  green in CI at 110853c (stop-2).
- `bun run format:check`, `bun run typecheck`, `bun run lint`: clean, 0 lint errors.
- `bun run db:proof --fresh` on this tree (436 = the 430 migration files plus the working copy's
  fixtures, `scripts/ci/local-backend-db.sh:87`):

```
db:proof PASS — applied 436/436, CLI 2.120.0, cold, 50 s
```

## CI at 68b5a8b, read and answered

The last completed run is this branch's previous push (68b5a8b, the draft at stop-2), so its reds
are this turn's own, from code that was not finished yet:

- **Build, typecheck, lint:** `format:check` on `src/i18n/locales/en-admin.ts`. The tree now
  passes `bun run format:check` whole.
- **AG-1** (`e2e/admin-guides.spec.ts`, both projects): it counted four Guides on Monetisation,
  where part 1's retired caps block took its Guide with it. Fixed in 7d5caa5c3: three on the page,
  five with a product row open. Correction to my stop-1 census: it did not list this count. A local run stopped at
  the preflight (STAGING BEHIND), so CI's temporary-backend lane is its proof.
- **MLA-19, PW-193** (and the staging E2E job): they read `caps`, which M-3c-b part (i) answers.
  That migration was not written at 68b5a8b. Their runs come after "continue" (ruling 2 §2).
- The six red lanes (2, 4, 6, 10, 12, 14) hold the e2e failure file's six gating failures: AG-1,
  MLA-19 and PW-193, each on both projects.

## QUESTION — public-surface-allowlist.txt :61 and :144

Ruling 1 §4 (v) says `coverage_plans` (:61) and `admin_set_coverage_plan` (:144) leave the
public-surface allowlist. Removing them fails the guard: `scripts/public-surface.ts` judges every
post-floor migration file's grants as written. It has no drop awareness, so the landed grants in
20261013142425, 20261029015441 and 20261102081500 still need their lines after part (v) drops
the objects. I kept both lines unchanged. Either keep them (each would gain the words "dropped in
P-2 (c) M-3c-b part 5"), or teach `scripts/public-surface.ts` about drops. The second is outside
this turn's scope (a guard change), so it needs a ruling.

The other allowlist edits of part (v) are made as ruled:

- acceptance :55, manifest :120 and the check-doors line left;
- `plan-seam-allowlist.txt` deleted and declared;
- the nine INC-443 lines added;
- :52's "with a fresh second factor" removed;
- the `transition_listing` lines kept.

**Correction to the ruling's :166 wording:** the reach row's caps columns are not
browser-readable (M-3a granted them to no browser role; staff read them through
`admin_list_monetisation`, a seller through `listing_caps`), and the line now says so.

## Departures (ruled acceptable in ruling 2 §2, each for the final report)

1. `product-prices-table.tsx` joined the scope (its Guide's `next` named the retired block).
2. The 60 caps keys left in part 1, not part 7 (CFG-3).
3. The check-doors-allowlist line was removed in part (v).
4. INC-1080 stays single-instance. Finding: the owner page's `plan` read was dead data.
5. The reader's importers were 12, plus the 5 of `sqlCodeOf`.
6. `plan-seam-allowlist.txt` stayed until part (v).
7. MON-15 and MNF-10 were cut by an exact-slice script; a whole block removed by its line range
   is not G37.
8. The editor fields and `p_caps` come after the types patch.
9. MLA-19, PW-193 and MON-18 run after "continue".

Departures made at this stop:

- `listing_caps` is called with `v_row.id`, the live body's own variable.
- CF-PERM-1 reads resource deletes only (PV-5…7).
- The proof's factor secret `'PROOFSECRET'` follows M-a's landed proof.
- AG-1's count is corrected (above).
- The feature docs mark the dropped objects' passages as superseded records rather than rewrite
  them (listings.md, geography.md, coverage-console.md, posting.md, plans.md's door table,
  ci-local-backend.md).

## Limits

- MLA-19, PW-193, MON-18 and AG-1 were not run here: ethio-staging is behind until the five parts
  are applied, so the preflight stops every local browser run.
- The live acceptance-doors check needs CI's catalogue; only its self-test ran.
- NH-6 fails on this machine only.

## K2 (reported, not touched)

- `marketName` in `use-monetisation-names.ts` still answers a market's raw code when its name is
  missing.
- docs/features/coverage-console.md is a superseded record, kept as history with a note; it is
  not rewritten.

## Records owed (for the final report §14, unnumbered)

DEC-356; INC-1087 (the names hook); INC-1088 (promote-sheet:165); INC-1080's second instance;
register rows for `listing_caps`, the migration reader and the names hook; ruling 1 §6's
changelog line.

`origin/dev` is at f2d558467; this lane's base is cursor/p2-fold at d5d6796c4, not merged or
rebased (rule 00). PR #30 stays a draft.
