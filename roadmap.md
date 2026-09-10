# Roadmap

## UX-2 item 7 — Data-scope roster identifiers

- [ ] Migration: whole re-declaration of `admin_list_entity_translations` returning a secondary identifier (category slug, attribute key); closers + read-back in-file; apply-pairing stated in the report.
- [ ] Service + `DataScope` render the identifier as secondary text under the name.
- [ ] E2E: shared entity-row twin helper; TR-24/TR-26 keep structural anchors; new coverage for duplicate labels and category slugs.
- [ ] Round-trip invariants: `get_entity_bundle` and the attributes export byte-identical before/after.
- [ ] Docs: `docs/features/translations.md` + one `docs/_changelog.md` line.
- [ ] Required run: `e2e/admin-translations-data.spec.ts` on both projects; report only on green.
