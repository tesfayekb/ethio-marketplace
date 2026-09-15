# Curation era close-out review — 2026-09-15 (G19 four-lens)

Scope: the catalog curation programme 2026-09-10 → 2026-09-15 — attribute definition v2 (DEC-050), option-conditioned allowed values (DEC-057/057b), eleven curation passes plus three backfills and the Food & Beverages root, the library sweep, and the import-planner defects fixed on the way (INC-187, 188, 196, 197, 198, 199, 200).

## Security

Every catalog write still passes one gate (registry column classes, shape checks, digest, scope, step-up, revisions, batch-tagged undo). New surfaces added this era — allowed values, the manifest door for deletions, statusNeedsAction, type-change clearing — each shipped with hostile-row probes (IG-2) and proofs in-file; no new path bypasses the doors. Policies DEC-060 and DEC-061 are enforced by the option lists (nothing in the catalog can name a forbidden product or animal) and inherited by the REQ-021 gateway. Seller attestations never assert a fact the platform has not verified.

## Functionality

Proven working, not asserted: every planner rule has a probe; every commit and undo path with rank moves, type changes and action rows has a proof and an E2E test through the route (AT-44..58, CT-30..32). Fifteen roots, 142 listing categories with two or three cards, 327 definitions with zero unlinked, every dependent's parent co-linked, every secondary parent resolving. Four defects were found by the operator's walks after green tests (the co-linkage rule, the all-attributes picker, the silent reactivation, the retired Electronics leaves) — G26 held each time.

## Performance

No cost added to hot paths: the catalog is read once per page; option lists remain lazy and cached; the sweep removed 31 categories, 12 definitions and 23 stale links; the rail is one ordered list. Import batches of 380 rows commit in one transaction; the two-pass link writes add one UPDATE per changing rank.

## Usability

For the poster (once posting opens): every category asks two or three questions on its card, units are on the field not the label, help text exists in both languages, manufacturer facts narrow the pickers, attestations make no claim when unticked. For the operator: search and parent filters on long lists, pickers that offer only legal targets, the import dialog naming every refusal and every commit failure. Recorded for later eras: the rail flyout, per-country root order and visibility, Amharic names in the admin roster, the attestation control class, storefront-level attestations, the assets badge.

Verdict: the curation era closes CLEAN. Next: the Locations era spec.
