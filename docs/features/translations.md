# Feature: Translations (Phase U4a — foundation)

Tier A surface. Schema, permissions and definer RPCs for the translation
dashboard. The console UI ships in U4b with its E2E suite; U4a's proofs are
in-migration (G15 phase-internal sequencing).

Migration: `supabase/migrations/20260829050332_d4f5cd34-655c-4781-9a7b-e70bbc268142.sql`

## Architecture — the DB is the runtime truth (D3, ratified 2026-08-29)

- `src/i18n/locales/en.ts` and `am.ts` remain the **developer seed** and the
  **offline fallback**. They are never the live source once a bundle exists.
- The shipped bundle for a language is its **approved rows only**, served by
  `get_ui_bundle(p_lang)` — anon-callable, because the marketplace is public.
- A language that is neither `enabled_public` nor `is_base` returns `{}`, and
  an empty base table returns `{}`: the client falls back to the compiled
  catalog (D3 fallback law). A missing bundle can never blank the UI.
- Sync flow: a `manage` holder calls `admin_sync_ui_keys(p_en, p_am)` with the
  compiled catalogs. `en` rows are upserted `approved` (en is **sync-owned** —
  the console refuses direct base-language edits); every `enabled_admin`
  non-base language gains the missing keys as `untranslated`; where `p_am`
  carries a value and the `am` row is still empty it is seeded `approved`
  (the shipped human catalog, not machine output).

## Status machine

```text
untranslated ──save──► edited ──approve──► approved
     ▲          ──machine──► machine ──approve──► approved
     └────────────────── clear ◄──────────────────┘
```

`clear` returns a row to `untranslated`, nulls the value, and drops the
machine/flag/approval provenance. `approve` stamps `approved_by/approved_at`.

## Scope model — roles are VERBS, `translator_languages` is SCOPE

| Layer                  | Answers                                      |
| ---------------------- | -------------------------------------------- |
| `translations:*` perms | _may this person edit/approve/manage at all_ |
| `translator_languages` | _which languages may they touch_             |

Every mutation runs `has_permission` → `require_step_up_if_needed` →
`translation_scope_ok(lang)`, in that order. Holders of `translations:manage`
are **exempt** from the scope check (they administer the roster). Everyone
else gets `not assigned to this language`.

Permissions (DEC-017 pattern): `view`, `update`, `machine`, `approve`,
`manage` — all five `assignable = true`, all but `view` `requires_step_up`,
granted to **no role**. Superadmin short-circuits the verb (never the step-up
gate); Translator custom roles are the intended consumption path.

## Provenance

`status`, `machine`, `flagged`, `flag_note`, `updated_by/at`,
`approved_by/at` on every `ui_translations` and `entity_translations` row.
Every mutation writes `log_audit` with `{key/entity, lang, action, machine}`.

## Placeholder-validator law

`translation_placeholders(text)` extracts the `{token}` set. On save and on
machine write, the candidate's token set is compared with the **en source
row's** set. A mismatch does not refuse the write — it stores it with
`flagged = true` and `flag_note = 'placeholder mismatch: expected {…}'`, so
the console can surface it and an approver can decide. Values are **DATA**:
stored and rendered as text, never HTML.

## Coverage-gated publication (S10)

`admin_set_language_flags(code, enabled_admin, enabled_public)` refuses
`enabled_public = true` unless every key in the base catalog has an approved,
non-null row for that language:
`language not fully approved: N of M remaining`. `enabled_admin` has no gate —
that is how a language is worked on before it is published.

## Machine translation (U4c)

Provider decision: **Google Cloud Translation v3**, wrapped in an edge
function; the API key lives in Supabase secrets and never reaches the browser.
The DB path exists first: the function calls `admin_machine_translation`,
which re-checks `translations:machine`, step-up and scope exactly like a human
edit and marks the row `machine`.

## Seed languages

| Code | Native       | Admin | Public | Note                      |
| ---- | ------------ | ----- | ------ | ------------------------- |
| en   | English      | yes   | yes    | base, sync-owned          |
| am   | አማርኛ         | yes   | yes    | live                      |
| om   | Afaan Oromoo | yes   | no     | admin-only until approved |
| ti   | ትግርኛ         | yes   | no     | admin-only until approved |

`rtl` exists on the row for the day an RTL language lands; the UI is already
logical-property-only (law C5).

## entity_translations + the U4d adoption plan

Content copy (place names, category names, later listing fields) keyed by
`(entity_type, entity_id, field, lang_code)`. U4a backfilled one
`('location', id, 'name', 'am', name_am, 'approved')` row per non-null
`locations.name_am` — **17 rows**, matching the censused source count. The
`name_am` columns are RETAINED: nothing reads the new table yet. U4d switches
readers to `entity_translations` with a `name_am` fallback, and only a later,
explicitly-instructed migration may drop the columns (law E2, additive-first).
`categories.name_am` (97 non-null) is deliberately **not** backfilled here;
it joins in U4d with the category reader change.

## Future consumer

REQ-004 (translation dashboard) is this schema's product surface: U4b builds
the console on `admin_list_translations` / `admin_translation_stats` and the
mutation RPCs; nothing in the runtime changes shape when it lands, because
components only ever call `t(key)`.
