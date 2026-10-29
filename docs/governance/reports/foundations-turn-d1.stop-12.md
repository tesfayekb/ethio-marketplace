# Foundations turn D1 — stop 12 (ruling on stop 11; M6b-legal)

## 1. INC-968 — fingerprint proofs normalise CR

- **M6a's own proof uses a raw comparison.** `20261029001111_b124ab89…sql` compares `md5(prosrc)` for its
  three cores, its three doors (`md5(v_src)`) and its two bulk callers. On a CRLF hand-apply it would fail
  for unchanged code. The file was not edited (ruling). The supervisor's connector apply keeps LF.
- The rule is written in `docs/features/ci-guards.md` (migration guards). It names INC-968: a proof that
  fingerprints a body compares `md5(replace(prosrc, E'\r', ''))`, and its expected hashes are computed the
  same way. One `_changelog.md` line was added.
- **No proof-linting conformance test exists** in `scripts/conformance/`. `planted-proofs.test.ts` checks
  where census tests write files, not migration proofs. `scripts/check-migrations.sh` lints proofs (scratch
  tables, real rows) but is a shell guard, not a conformance census. No planted test was added.

## 2. One staff refusal sentence: `admin.error.rateLimited`

- Key added to `en-admin.ts` and `am-admin.ts` by script.
  - en: `Too many changes in the last hour. Try again later.`
  - am: copied by script from `am-member.ts` `admin.listings.move.error.rateLimited`. Verified:
    **45 characters, sha256 prefix `04110da98269e43e`**.
- **The shared reader:** `doorKeyText` in `src/lib/refusal-tail.ts`. It now reads the bare code
  `rateLimited` (the database gate's RAISE) as `RATE_LIMITED_KEY = "admin.error.rateLimited"`. Callers:
  the categories console (`useSubmitError`, category-dialogs.tsx:111, shared with the verb bar) and the
  import dialog shell (import-dialog.tsx:230). Screens with their own specific key never reach it and keep
  that key.
- **Test CDR-1** (`src/features/admin-categories/category-dialogs.test.tsx`): a category save refused with
  `{message: "rateLimited"}` shows `admin.error.rateLimited`. Red first (DOOR_KEY did not match the
  family-less key), then green. `refusal-tail.test.ts` 9 / 9 still pass.
- **K2 — per-screen mappers that M6b's doors reach and that do not use the shared reader** (rateLimited
  shows their generic text today; not touched, as ruled):
  - `src/features/admin/legal/legal-service.ts:131` `legalErrorKey` (legal doors, M6b-legal)
  - `src/features/admin/roles/roles-service.ts:143` `roleErrorKey` (roles doors)
  - `src/features/admin/users/admin-users-service.ts:244` `profileEditErrorKey` (admin_update_profile)
  - `src/features/admin/translations/translations-service.ts:396` `translationErrorKey` (sync_ui_keys,
    translator languages)
  - `src/features/admin-attributes/attribute-dialogs.tsx:73` `fail` (upsert/link attribute)
  - `src/features/admin-countries/countries-service.ts:129` `countryErrorKey`
  - `src/features/admin-locations/locations-service.ts:400` `locationErrorKey`
  - `src/features/admin-coverage/coverage-service.ts:85` `coverageErrorKey`
  - `src/features/admin-ai/ai-service.ts:345` `aiErrorKey`
  - `src/features/admin-listings/listing-policy.ts:37` `settingsErrorKey`

## 3. M6b split, and M6b-legal

The 22 live bodies total about 70 KB (pg_get_functiondef lengths), so M6b is split by concern:
- **M6b-legal (this stop):** the six legal doors, about 34 KB.
- **M6b-catalogue (next):** link_attribute, upsert_attribute, upsert_location, upsert_country,
  upsert_language, set_country_active, set_country_root_order, set_coverage_plan, set_listing_policy,
  set_ai_feature, sync_ui_keys.
- **M6b-roles (after):** create_role, set_role_permission, set_translator_languages, update_profile,
  assign_role.

Census on ethio-prod: no public function calls any of the 22.

**File:** `supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql`, mark
`20261029080000`. Applied on ethio-prod. Same text as the scratch copy (CR stripped).

| Door | Live md5 (normalised) | Gate inserted at body line | New md5 (normalised) |
|---|---|---|---|
| admin_add_legal_translation | 97b996345eba02109957e236d6de9b99 | 16 | dcc64aace95421a2ee96b27af948b744 |
| admin_discard_legal_draft | fc8a0e85da924b6b9821148d400ac4b3 | 14 | d2e79240e6784b25781c9c6cdc6dfd99 |
| admin_mark_legal_reviewed | 6fa71a02a30774c87ecf2c744e9bdd5d | 15 | 390bb8aaa7135d8808845d562c9fa0fe |
| admin_publish_legal_version | c46e44df17f1592e45dbe7528174a920 | 18 | 61baef330e15b4f8fc829e0f519a22e0 |
| admin_save_legal_draft | a092f71816a95880683767643cd4d6ad | 17 | baf0a1bb63062668a0335b1f9647db0f |
| admin_set_legal_settings | 8d08a9c42d29bc074a5a36fc13c12c2b | 18 | cf9f949f3122bb41efec8a8993a9a8b4 |

Each gate is the line right after the door's step-up line and before its first write. Grants are
restated as live (authenticated, service_role). None were added.

**Proofs (in-file; clean apply = pass):**
1. Each door: normalised md5 equals the new hash. With the gate block removed it equals the live hash, so
   the gate is the only change. Step-up comes before the gate, and the gate comes before the first
   INSERT/UPDATE/DELETE. Header (DEFINER, search_path) and EXECUTE for anon / authenticated / service_role
   are unchanged.
2. Behaviour. Setup: a scratch super admin at aal2 with `staff_config` overridden to 1. Each door's first
   call passes the gate (it answers its own refusal for a scratch id). After the window is spent, each
   door's next call is refused `rateLimited`. A fingerprint of the legal tables, the caller's audit rows and
   the window count is identical before and after the refused calls.

**Read-back (ethio-prod):** mark `20261029080000` present. All six normalised md5s equal the new column above.

apply 5a30bc87 → expect mark 20261029080000

## 4. Guard debt found and fixed (H2)

`bash scripts/check-migrations.sh` failed on files from earlier D1 stops. These are not M6b-legal findings:
- **Public-surface guard:** grants restated by M3, M3b, M4, M5a, M5b and M6a had no allowlist line.
  M4b's removal of the `import_gate_audit` line also made the pre-D1 files that granted it fail. Ten lines
  were added to `scripts/public-surface-allowlist.txt`. **Now OK.**
- **Real-row proof guard:** proofs of M1, M2, M3, M3b and M4 read rows keyed by the proof's own scratch
  user or country. The guard is lexical. Eleven lines were added to `scripts/migration-real-row-allowlist.txt`.
- **Still failing — needs a ruling:** two statements of M6a's proof (scratch `e2e-d1-m6a-` slugs read
  through `v_tag`). They cannot be allowlisted, because their heads contain `||` and the allowlist format
  splits fields on `|`. Options:
  - (a) teach the guard an escaped pipe (a change to check-migrations.sh);
  - (b) a corrective-free exception mechanism, for example matching by line number;
  - (c) accept a red guard until a guard change lands.
  M6b-legal itself is not flagged.

## 5. Other fix

CF-SL-1 (strings-layers) failed. `admin.translations.ai.rateLimited` (stop 9) sat in `en-admin` and
`am-admin`, but it is shown on pages outside the admin layer. It was moved by script to `en-base` and
`am-base`. The Amharic value was re-verified: 51 characters, prefix `d2b92bcb0486c2b2`. strings-layers,
translations and i18n tests: 85 / 85.

## 6. Checks

- vitest: `src/lib`, `src/features/admin-categories`: 186 / 186. strings-layers + translations + i18n:
  85 / 85.
- eslint clean and prettier `--check` clean on the touched TS and MD files. `i18n:usage` has 1736 keys.
  Build log: `build OK`.
- check-migrations: every guard OK except the real-row guard's two M6a lines above.
- IG-6 was not run. Staging still waits for the supervisor's M5a / M5b / M6a apply.

## Files

- src/lib/refusal-tail.ts
- src/features/admin-categories/category-dialogs.test.tsx (new)
- src/i18n/locales/en-admin.ts
- src/i18n/locales/am-admin.ts
- src/i18n/locales/en-base.ts
- src/i18n/locales/am-base.ts
- docs/features/ci-guards.md
- docs/_changelog.md
- scripts/public-surface-allowlist.txt
- scripts/migration-real-row-allowlist.txt
- supabase/migrations/20261029002140_5a30bc87-f056-4c92-bc22-14656fdceeb8.sql
- this report
