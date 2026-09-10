# UX-2 Item 7 — Distinguishable Data-scope rows

## Build
- Add an append-only migration that re-declares `admin_list_entity_translations` in full and returns a stable secondary identifier: category slug for categories, attribute key for attributes, and no added identifier for locations.
- Preserve the function’s existing permission gate, filtering, ordering, pagination, grants, and in-file definition/ACL read-back. Do not patch the function body by text anchor.
- Map the identifier through the translation service and render it beneath the entity name in both DataTable twins, matching the attribute library’s secondary-text treatment.

## Proof
- Extend the shared translation twin helper with an entity-row helper so row selection remains viewport-aware and structural.
- Update TR-24 and TR-26 to use that helper, and add coverage proving duplicate attribute labels such as “Make” remain distinguishable by key and categories show their slug.
- Run formatting, TypeScript, ESLint, migration guards, i18n usage checks, and the required translation Data-scope spec on both configured projects/viewports.

## Documentation
- Update the translations feature document and append one changelog line.

## Files expected
- `supabase/migrations/<new>_data_scope_entity_identifiers.sql`
- `src/features/admin/translations/translations-service.ts`
- `src/features/admin/translations/data-scope.tsx`
- `e2e/helpers/translations.ts`
- `e2e/admin-translations-data.spec.ts`
- `docs/features/translations.md`
- `docs/_changelog.md`
