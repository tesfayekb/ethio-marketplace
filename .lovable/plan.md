# Foundations turn D1 — PLAN FIRST answers (nothing changed)

I read the tree at the current commit and ran read-only queries against the connected database (ethio-prod). Each full `pg_get_functiondef` text will be read again and pasted into its migration's stop report when that migration is built. Below are the header facts I read today.

## (1) Live definitions, files and consumers

| Concern | Function (live args) | Volatility | Definer | search_path | Execute grants |
|---|---|---|---|---|---|
| 2 | `get_location_tree(p_country_code text)` | STABLE | DEFINER | public | anon, authenticated, service_role |
| 2 | `public_listing_json(l listings, p_viewer uuid)` | STABLE | DEFINER | public | service_role only |
| 3 | `import_gate_audit(p_family text, p_event text, p_batch uuid, p_counts jsonb)` | VOLATILE | DEFINER | public | authenticated, service_role |
| 3 | `rate_gate(p_action text)` (the mechanism) | VOLATILE | DEFINER | public | service_role only (called from inside doors) |
| 4 | `set_listing_pin(p_listing_id uuid, p_lat numeric, p_lng numeric, p_precision text, p_street text, p_zoom smallint, p_directions text)`, all DEFAULT NULL except id | VOLATILE | DEFINER | public | authenticated, service_role |
| 5 | `validate_listing_draft(p_uid uuid, p_step smallint, … p_price_amount numeric, p_price_currency character, … p_price_bp integer, p_price_negotiable boolean)` (17 args) | VOLATILE | DEFINER | public | service_role only |

Live facts the plan depends on:
- **Concern 4:** the live body has `v_prec := lower(btrim(coalesce(p_precision, 'exact')));`. That is the line to replace. The argument list stays the same, so it can use CREATE OR REPLACE without a DROP.
- **Concern 5:** `listings_price_pair_check` reads: commission means amount and currency are both NULL; otherwise `price_bp` is NULL and `(price_amount IS NULL) = (price_currency IS NULL)`. The other price checks are `free_has_no_price`, `price_bp` 1–10000, the `price_mode` enum and the `price_period` enum.
- **Concern 1:** in `storage.buckets`, `listing-photos` is private with no mime list and no size limit. `category-assets` is public with a 10 MiB limit (10,485,760) and no mime list.

Files and consumers:
- **Concern 1:** `src/routes/api/upload/photo.ts` (the server writes listing photos) and `src/features/admin-categories/category-images-service.ts:78–145` (the browser uploads three category pictures into `category-assets`). Specs: `e2e/post-wizard-*` photo steps and the admin category-image specs. I will list them by `rg` at build.
- **Concern 2:** `public_listing_json` is reached through `src/server/media/links.ts` and the listing page reader. The Maps address (34f-2 MAJOR 3) reads `places.list`. `get_location_tree` is read by the location reader. The specs that read the ad page and the tree are named at build.
- **Concern 3:** `src/server/imports/gate.ts` (it calls `import_gate_audit` with the user's own client) and `src/server/imports/route.test.ts`. The spec is `e2e/import-security.spec.ts`. Dials go in `src/lib/dials.ts`.
- **Concern 4:** `src/features/posting/map/pin.ts`, `step-where.tsx`, `posting-service.ts` and `door-queue.ts`. Specs: `e2e/post-wizard-place.spec.ts`, `e2e/helpers/posting.ts`, `e2e/posting-routes-dials.spec.ts` and `e2e/legal-certify.spec.ts`.
- **Concern 5:** `src/routes/api/listings/draft.ts`, `use-draft.ts`, `validate.ts` and `step-pricing.tsx`. Specs: `e2e/post-wizard-bundle2.spec.ts` and `e2e/posting-routes-dials.spec.ts`.

## (2) Concern 3 census

Live catalogue: SECURITY DEFINER, executable by authenticated, with an INSERT in the body. The 21 member doors are already gated (copy/edit/publish/relist/renew/mark_sold/report/reveal/save/pin/price/photos_soon/reserved/seller place/identity/home country, plus admin reveal). These are the ungated ones:

| Door | Inserts per call | Gate | Proposed fix |
|---|---|---|---|
| import_gate_audit | 1 audit_log | none | rate_gate + dial `import_gate_audit` (INC-951 named) |
| accept_legal | 1 legal_acceptances (per document) | none | rate_gate + dial (member door) |
| remove_listing_photo | 1 listing_photo_changes | none | rate_gate + dial (member door) |
| begin_impersonation | 1 impersonation_sessions | none | rate_gate + dial |
| admin_export_legal_acceptances | 1 audit_log | none | rate_gate + dial |
| admin_allow_listing_photo, admin_review_photo_change, admin_edit_listing, admin_move_listing | audit_log (+ revisions/notices) | none | rate_gate, one shared staff-moderation dial |
| admin_save_translation, admin_save_entity_translation, admin_machine_translation, admin_machine_entity_translation | 1 row (+ revision) | none | rate_gate, one shared staff-translation dial |
| admin_commit_* / admin_undo_* imports (6) | N rows per batch | none | gated by the import route's step-up; propose rate_gate per commit |
| admin_* config writers (≈25: categories, pointers, roles, role_permission, assign_role, legal draft/publish/review/translation, settings, ai feature, policy, countries, locations, languages, attributes, coverage, exclusions, root order, translator languages, sync keys, update_profile) | 1 row or a small set | none | rate_gate, one shared staff-config dial |

I recommend `rate_gate` everywhere, including `import_gate_audit`. Its caller is the user's own client (`gate.ts` through `user-client.ts`), so moving the write to the server's admin client would add a privileged path. The full per-door list with its exact INSERT count will be written into the migration's proof header.

## (3) Concern 1 numbers

- **listing-photos:**
  - Mime types: `image/jpeg`, `image/png`, `image/webp`, from `src/routes/api/upload/photo.ts:124–128` (CONTENT_TYPE).
  - Size: the largest variant dial is the cover's 1 MiB (1,048,576 bytes) at `photo.ts:109`. The others are mid 450 KiB at :110, card 150 KiB at :111 and thumb 30 KiB at :112.
- **category-assets:**
  - Mime types: `image/png` and `image/webp`, from `src/features/admin-categories/category-image-variants.ts:179, :201, :211`.
  - Size: **no byte cap exists in the code.** The only number is the bucket's live 10 MiB. See conflict C2.

## (4) Order, marks, proofs

At the time of reading, now() was 2026-10-28 22:20 UTC and the ledger's newest mark is 20261025150000. Each mark is re-derived when its migration is written (now() rounded up to the next hour, plus one hour, and above the previous mark).

1. **INC-963 pin** (smallest change, member door).
   - Proposed mark: 20261029000000.
   - Proof: a call with a NULL precision raises the typed refusal, and the listing's pin columns are unchanged.
2. **INC-793 draft price pair.**
   - Proof: for steps 1–3, an amount without a currency is either refused with the typed refusal or stored as a pair. A scratch insert of the door's output never raises 23514.
3. **INC-949 shared place predicate.** This adds `public.place_is_shown(uuid)` (STABLE, INVOKER, with an index on `locations(parent_id)` / `active` confirmed), redeclares `get_location_tree` and redeclares `public_listing_json` whole with an ancestor path.
   - Proof: a switched-off place, and a place under a switched-off ancestor, are absent from both doors.
4. **INC-951 rate gates.** One migration redeclares each listed door whole and adds the dials to `src/lib/dials.ts`.
   - Proof: call n+1 is refused and no row is written.
5. **INC-939 buckets.** Mime lists and size limits are set through the storage-bucket tool, not SQL.
   - Mark: a marks-only migration.
   - Proof: an upload of the wrong type and an upload over the limit are both refused (a route test plus a staging upload).

## (5) Conflicts

- **C1, no-new-string:** the typed refusals for pin and price need wording. I propose existing keys only. If none fit, that is a STOP for a ruling.
- **C2, concern 1, category-assets:** no code constant gives a byte cap. Options:
  - (a) keep 10 MiB and add only the mime list;
  - (b) add a byte constant in `category-image-variants.ts` with its own refusal and use it.
  
  Ruling needed.
- **C3, listing-photos cap:** the dials can be raised by environment variables (`MAX_COVER_BYTES`), so a fixed bucket limit could refuse what the door allows. I propose 1 MiB with a note, or the bucket's own larger ceiling. Ruling needed.
- **C4, bucket changes:** the platform forbids SQL on `storage.buckets`, so these go through the bucket tool. The migration only carries the mark and a proof that RAISEs if the settings differ.
- **C5, concern 3 scope:** about 45 doors in one migration is large. I propose one migration with three shared staff dials (moderation, translation, config) plus per-door dials for the member doors. Ruling needed.
- No conflict with AGENTS.md was found. A new function needs REVOKE PUBLIC and named grants, and `place_is_shown` gets no browser grant.

## (6) File list

- `supabase/migrations/` — five new files, one per concern, written by the migration tool.
- `src/lib/dials.ts` and its test.
- `src/server/imports/gate.ts`, `src/server/imports/route.test.ts`.
- `src/features/posting/map/pin.ts`, `posting-service.ts`, `use-draft.ts`, `validate.ts` (only if the client must send currency or precision), and their tests.
- `src/server/media/links.ts` / the listing reader (ancestor path in `places.list`).
- `src/features/admin-categories/category-image-variants.ts` (only under C2 option b).
- `e2e/import-security.spec.ts`, `e2e/post-wizard-place.spec.ts` (only where a door's answer changes).
- `scripts/public-surface-allowlist.txt` (no new browser grant is expected).
- `docs/features/` — the posting, locations, media and imports feature docs, plus `_changelog.md`.
- `docs/tracking/incidental-findings.md`.
- `docs/governance/reports/foundations-turn-d1.report.md` and the stop reports.
