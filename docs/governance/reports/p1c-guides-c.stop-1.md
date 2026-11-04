STOP — p1c-guides-c ruling 1 item 7: the texts enter three first downloads (the whole-catalogue importers)
DONE: step 0 (sha256), items 1–6 (the texts, the sixteen `guide` props, the empty allowlist, CFG-3,
TBL-6, the no-brace assertion, AG-1 over every section, AG-6, `docs/features/admin-guide.md`), item 8
(the local runs: `e2e/admin-guides.spec.ts` 14 passed; the toolbar tests by id 32 passed)
LEFT: item 7 (the ceilings), the roadmap's P-1c line, THE CHECKS, the self-review, the report, the
pull request made ready, its CI
CI:
# CI Status (auto-generated — do not edit by hand)

- Commit: `484b6bb3ffb8d81cdf45905b3de202ddb2ea53f6` (short `484b6bb`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-04T05:28:52Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41777385628
FILES:
docs/features/admin-guide.md
docs/governance/briefs/p1c-guides-c-ruling-1.md
docs/governance/briefs/p1c-guides-c.md
e2e/admin-guides.spec.ts
roadmap.md
scripts/admin-tables.test.ts
scripts/conformance/admin-guides-allowlist.txt
scripts/conformance/admin-guides.test.ts
src/features/admin-ai/ai-calls.tsx
src/features/admin-ai/ai-page.tsx
src/features/admin-attributes/attributes-page.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-countries/countries-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-locations/locations-page.tsx
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/audit/audit-page.tsx
src/features/admin/impersonation/impersonation-view.tsx
src/features/admin/roles/roles-list.tsx
src/features/admin/translations/data-scope.tsx
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/strings-page.tsx
src/features/admin/users/users-list.tsx
src/i18n/locales/am-guide.ts
src/i18n/locales/am-script.test.ts
src/i18n/locales/en-guide.ts

## The conflict

Ruling 1, item 7: "each guided page grows by its guide spec only — reported per page with the
measured number and the cause `guide spec` … Growth from anything else, or beyond the band without a
named cause, is a STOP. The texts themselves ride the on-demand guide layer and must not enter any
first download (AG-7 proves it)."

Measured (a fresh `git archive` of base `484b6bb3f` built at `/tmp/p1c-c-base`, then this tree at
`8412127ae`; `bun run build && node scripts/check-bundle-size.mjs` on each; the per-chunk closures
through `scripts/bundle-closure.mjs`):

- Every one of the sixteen guided pages grows by **0.0 KiB** gz: `/admin/ai` 328.1 → 328.1,
  `/admin/attributes` 341.4 → 341.4, `/admin/categories` 349.5 → 349.5, `/admin/countries` 330.9 →
  330.9, `/admin/listings` 350.4 → 350.4, `/admin/locations` 275.4 → 275.4, `/admin/screening`
  371.6 → 371.6, `/admin/audit` 301.1 → 301.1, `/admin/users` 297.6 → 297.6, `/admin/users_/$userId`
  (impersonation) 292.8 → 292.8, `/admin/roles` 297.9 → 297.9 — cause `guide spec`, below the
  check's tenth of a KiB. No ceiling needs to move for them.
- Three pages grow by the texts themselves, none of it a guide spec:
  - `/admin/listings_/$listingId` 394.7 → 400.2 (+5.5; `en-guide.js` +5.5), ceiling 396 — OVER;
  - `/admin/roles_/$roleId` 321.3 → 326.8 (+5.5; `en-guide.js` +5.5), ceiling 322 — OVER;
  - `/admin/translations` 419.2 → 431.7 (+12.5; `en-guide.js` +5.5, `am-guide.js` +7.0), ceiling
    420 — OVER (`/admin/translations` is also one of the sixteen guided pages: its three tables'
    specs weigh 0.0; the whole growth is the catalogues).
  The cause is the standing debt on roadmap line 7 (K2 of turns (a) and (b)):
  `src/features/admin-listings/listing-page.tsx:28`, `src/features/admin/roles/permission-matrix.tsx:7`
  and `src/features/admin/translations/languages-page.tsx:28–29` import `en` (and `am`) whole from
  `src/i18n/locales/en.ts` / `am.ts`, which join `en-guide` / `am-guide` into the catalogue; so every
  key the guide layer gains rides those three first downloads. `node scripts/check-bundle-size.mjs`
  on this tree exits 1: `/admin/translations: 431.8 KiB, over its ceiling of 420 KiB` (and the two
  others over theirs). The entry is unchanged (its closure 126.3 KiB `index` on both builds).
- Noise, not growth: `/l/$slug` 263.7 → 263.6 and `/my-listings_/$listingId_/edit` 407.3 → 407.2
  (−0.1 each, the bundler's chunk split; nothing this turn touched them).

Item 7 anticipates growth from the guide spec alone and rules anything else a STOP; the ruling also
says the texts must not enter any first download, and on these three pages they do, by the debt's
mechanism and not by this turn's code. I have not moved a ceiling. The paths I see, for the
supervisor to rule between:

1. Carry it as turns (a) and (b) did: raise the three ceilings by DEC-296's form with the cause on
   the line (`ceilingForLocal`: 396 → 401, 322 → 328, 420 → 433), the fold staying roadmap line 7's
   debt; or
2. fold the three imports now (out of this turn's SCOPE for `listing-page.tsx` and
   `permission-matrix.tsx`; `languages-page.tsx` is in scope but the fold is not a numbered change),
   so the guide layer leaves the three pages — its own turn by rule 00 (A2); or
3. something else the supervisor prefers.

Until the answer the tree is green-shaped: `bun run typecheck` and `bun run lint` green at
`8412127ae`, the touched unit tests and the laws green but NH-6 (Mac-only, green in CI), both specs
green locally; only `check-bundle-size` is red, on the three pages above.

## Also done under item 8, for the record

The sixteen toolbars' testids (`ai-calls-toolbar`, `ai-toolbar`, `attribute-toolbar`,
`category-toolbar`, `country-toolbar`, `listings-toolbar`, `location-toolbar`,
`admin-name-checks-toolbar`, `admin-screening-toolbar`, `audit-toolbar`,
`impersonation-listings-toolbar`, `role-toolbar`, `data-toolbar`, `lang-toolbar`, `strings-toolbar`,
`users-toolbar`) are asserted on by AT-79, AS-3, CO-1, CO-2, AL-10, LT-1, RP-16, AU-13 and, through
the table's shared `data-table-toolbar`, SC-11. Run by `bun run e2e:local -- <their eight specs>
--retries=0 --grep "AT-79|AS-3|CO-1|CO-2|AL-10|LT-1|RP-16|AU-13|SC-11"` (the `LT-1` pattern also took
LT-10…LT-16): **32 passed (1.7m)**, both projects, 0 retries; log `/tmp/p1c-c-e2e-toolbars.log`.

`bun run i18n:usage` leaves both maps unchanged (the guide keys are built by grammar, not `t(`
literals): `1856 keys across 673 files (440 dynamic call sites)`.

## Limits

This chat runs Claude Fable 5.1, not the ruling's named Claude Opus 5.5 (High); the executor cannot
switch models from inside the chat. Said in the chat before the build began.
