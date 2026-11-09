QUESTION — p2-fold-c2b part 5: the reach table's three cap columns need six Guide lines no ruling gives
DONE: ruling 1 §7 part 2 steps 1–4 (the caps block retired; the edit reader's caps; step 6; the reader's move and CF-PLAN-1's retirement), step 5 in part (the product's caps read and judged, the two refusal keys)
LEFT: step 5's table columns, then (after "continue") its editor fields; steps 6–8 (the two siblings and the names hook; the renames and the retired permission key; the usage maps); M-3c-b parts (i)–(v); the MIGRATION stop
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `110853cccd472bd06199d9d2891327ecd27edf6c` (short `110853c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-09T03:37:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42555377926
FILES:
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c2b-ruling-1.md
docs/governance/briefs/p2-fold-c2b-strings.json
docs/governance/reports/p2-fold-c2b.stop-1.md
docs/tracking/intentional-deletions.txt
e2e/admin-monetisation.spec.ts
e2e/my-listings-ad.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-where.spec.ts
public/i18n-usage.json
scripts/conformance/admin-guides.test.ts
scripts/conformance/door-answers.test.ts
scripts/conformance/door-answers.ts
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/conformance/perm-vocabulary.ts
scripts/conformance/plan-seam.test.ts
scripts/conformance/proof-readers.test.ts
scripts/conformance/proof-readers.ts
scripts/conformance/sql-writes.test.ts
scripts/conformance/sql-writes.ts
scripts/conformance/status-map.test.ts
scripts/conformance/status-map.ts
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors-allowlist.txt
scripts/doors/rows.ts
scripts/e2e-select.ts
src/features/admin-monetisation/caps-editor.tsx
src/features/admin-monetisation/caps-forms.ts
src/features/admin-monetisation/caps-section.tsx
src/features/admin-monetisation/monetisation-forms.test.ts
src/features/admin-monetisation/monetisation-forms.ts
src/features/admin-monetisation/monetisation-order.test.ts
src/features/admin-monetisation/monetisation-order.ts
src/features/admin-monetisation/monetisation-page.test.tsx
src/features/admin-monetisation/monetisation-page.tsx
src/features/admin-monetisation/monetisation-rows.ts
src/features/admin-monetisation/monetisation-service.test.ts
src/features/admin-monetisation/monetisation-service.ts
src/features/admin-monetisation/product-prices-table.tsx
src/features/admin-monetisation/use-monetisation.ts
src/features/my-listings/my-listing-page.tsx
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

(`git diff --name-only d5d6796c4` lists `scripts/conformance/plan-seam.ts` under its rename to
`migration-reader.ts`; both deletions are declared in docs/tracking/intentional-deletions.txt.)

## The question

Ruling 1 Q5: "the products table shows a reach row's three caps with the same 'No limit' word
through one small helper." The products table is ONE `DataTable` in
`src/features/admin-monetisation/products-section.tsx`, its `guide` prefix a conditional of
`admin.monetisation.level` and `admin.monetisation.reach`. CF-GUIDE-1 (admin-guides.ts:26,
:173) requires `<prefix>.guide.col.<columnKey>` in en-guide.ts and am-guide.ts for EVERY literal
column key under EACH prefix; a column key that is not a literal is its own finding (:231); no
allowance covers a column (only `no guide`, :30). With the three columns `cities`, `regions`,
`countries` drawn, CFG-3 answers exactly:

```
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.level.guide.col.cities"
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.level.guide.col.countries"
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.level.guide.col.regions"
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.reach.guide.col.cities"
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.reach.guide.col.countries"
products-section.tsx:269 en-guide.ts lacks "admin.monetisation.reach.guide.col.regions"
```

The strings file (p2-fold-c2b-strings.json) names six new keys and none of these; I write no
Amharic of my own (rule 10, Strings). The same shape exists today the other way round: the reach
Guide carries `admin.monetisation.reach.guide.col.photos` "A reach has no photo limit; the level
sets it." (and `.placement`, `.badge`) for the level-only columns.

Proposed EN (the AM is yours), following that shape:

- `admin.monetisation.reach.guide.col.cities` — "How many cities an ad with this reach may name; No limit when blank."
- `admin.monetisation.reach.guide.col.regions` — "How many regions an ad with this reach may span; No limit when blank."
- `admin.monetisation.reach.guide.col.countries` — "How many countries an ad with this reach may span; No limit when blank."
- `admin.monetisation.level.guide.col.cities` — "A level has no city limit; the reach sets it."
- `admin.monetisation.level.guide.col.regions` — "A level has no region limit; the reach sets it."
- `admin.monetisation.level.guide.col.countries` — "A level has no country limit; the reach sets it."

Or another form (fewer columns, one combined "Places" column with one guide line per prefix — two
keys instead of six). The columns as built (three literal columns over one `capWord(cap, t)`
helper in monetisation-columns.tsx, reading `admin.monetisation.reach.field.unlimited`) are kept
under /tmp/ethio-scratch/p2-fold-c2b/part5-table/, out of the tree, so every commit stays green.

## Where the turn stands (for the ruling)

- Commits since the base, each green on typecheck, lint, its touched unit tests and the laws (the
  laws' one red, NH-6 in scripts/ci/nightly-hour.test.ts, is this machine's time-zone database —
  outside the diff, green in CI at 110853c):
  - c02849d4c ruling 1 and its strings saved (both sha256 equal to the message's).
  - c636cd27f part 1 — the caps block retired and declared.
  - 4f22c50b3 part 2 — the edit reader's caps (EW-7 red-first against the old reader, PSV-8,
    MLA-19).
  - a2d12e6ba part 3 — step 6's one `caps` prop, the no-limit line and caption (SWR-2 red-first
    against the old room expression alone, the rest of the component unchanged; PW-82 and PW-90
    corrected; PW-193).
  - 5affd8686 part 4 — migration-reader.ts, CF-PLAN-1 retired (MGR-1…3).
  - aac3dd71e part 5, first half — readProduct's three caps, the form's judge (blank = no limit,
    `wholeNumber` ≥ 1, else `badCaps`), `bad caps` / `caps on level` keyed (MNF-11, MNS-7).
- Departures so far, named for the ruling (each goes into the report):
  1. `product-prices-table.tsx:190` (outside ruling 1's file list): its Guide's `next` named the
     retired caps block; now names the markets block.
  2. The 60 caps keys left in part 1, not part 7: CFG-3 refused the caps Guide keys once their
     block was gone.
  3. A dated line in scripts/doors/check-doors-allowlist.txt (`grant-without-caller
     admin_set_coverage_plan(…)`, until 2026-11-30): DOORS-4/6 refused the door once its last
     caller left; M-3c-b part (v) drops the door and the line.
  4. Correction to my stop-1 census: the owner's ad page has no photo box; its schema read
     dropped the unread `plan` only, and MLA-19 asserts the Edit.
  5. `sqlCodeOf` had a fifth importer the census missed: scripts/doors/rows.ts:6, re-pointed with
     the others.
  6. plan-seam-allowlist.txt stays until part (v)'s commit, as ruling §4 (v) says, though its
     guard left in part 4; nothing reads it meanwhile.
  7. MON-15 and MNF-10 were cut by an exact-slice script, not by hand; the diff is the record.
  8. The editor's three fields and `saveProduct`'s `p_caps` wait for the types patch (the GO:
     "After 'continue' … the product editor wired"): the generated `Args` has no `p_caps`, and a
     field the door did not take would be a phantom save. `SaveProductInput.caps` is carried;
     MNS-3 sends `caps: null` until then.
  9. MLA-19, PW-193 and MON-18 need M-3c-b on ethio-staging; their runs come after "continue".
- `origin/dev` is at f2d558467 (read at this stop); this lane's base is cursor/p2-fold at
  d5d6796c4. Not merged or rebased (rule 00).
