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

## Console read seams (U4b prerequisite, 2026-08-29)

U4a registered the mutation RPCs and the restrictive `languages` policy
(`USING (enabled_public OR is_base)`) but no matching READ, so the browser could
see only `en` and `am` — the console had no way to render the roster, the
`enabled_admin` / `enabled_public` switches, or the coverage-gate state for
`om` / `ti`. Resolved with two definer reads (never a widened table policy,
which would leak the roster row shape to the client and mix policy styles).

Migration: `supabase/migrations/20260829060103_e9f7988f-e584-4944-9c5e-f3e7fa32b07d.sql`

| Function                        | Caller              | Returns                                                                                                                                              |
| ------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin_list_languages()`        | `translations:view` | Every language row: `code, name_en, name_native, rtl, is_base, enabled_admin, enabled_public, sort, created_at, updated_at`, ordered by `sort, code` |
| `get_my_translator_languages()` | any signed-in user  | The caller's OWN assigned `lang_code` set, ordered                                                                                                   |

Neither requires step-up: reads never do (DEC-017 registered `view` as the only
non-step-up verb), and the self-read discloses only what the caller may always
know. Both are `REVOKE`d from `anon`.

`get_my_translator_languages()` upgrades the strings page from
attempt-and-toast to informed controls: the UI can state "not assigned to this
language" honestly instead of firing a write the server will refuse. Law F3 is
unchanged — every mutation still re-checks `has_permission` →
`require_step_up_if_needed` → `translation_scope_ok` server-side. Note the
manage exemption: `translations:manage` holders are scope-EXEMPT, and this list
returns their explicit rows only, so the console must consult the PERMISSION,
not this list, before concluding a manage holder is unassigned.

Proofs (in-migration, dynamic principals, scratch rows cleaned up):

- **P1** deny-case — a permissionless principal is refused `admin_list_languages`.
- **P2** a superadmin sees the WHOLE roster, `om` included with
  `enabled_admin AND NOT enabled_public`, row count equal to `languages`.
- **P3** self-read correctness — the caller gets exactly their own codes and
  never another user's.
- **P4** the self-read is per-principal, not global.

## The console (U4b, 2026-08-29)

| Surface                        | File                                                  | Gate                                        |
| ------------------------------ | ----------------------------------------------------- | ------------------------------------------- |
| `/admin/translations`          | `src/features/admin/translations/languages-page.tsx`  | `translations:view`; controls need `manage` |
| `/admin/translations/$lang`    | `src/features/admin/translations/strings-page.tsx`    | `translations:view`; save/approve per verb  |
| Translator scope (user detail) | `src/features/admin/translations/translator-card.tsx` | `translations:manage`                       |
| RPC seam / hooks               | `translations-service.ts`, `use-translations.ts`      | —                                           |

Routes: `src/routes/admin.translations.tsx` and
`src/routes/admin.translations_.$lang.tsx` (flat detail nesting; `/admin` owns
the permission gate and `AdminShellProvider`). The section is registered once
in `src/features/admin/sections.ts`, so nav, breadcrumbs, the landing grid and
the deep-link guard all derive from it.

### Laws honoured

- **F3** — every control is convenience only; each definer RPC re-checks
  `has_permission` → `require_step_up_if_needed` → `translation_scope_ok`.
  Mutations run inside `StepUpGate`.
- **F4** — refusals surface: a translated message plus the server's own text
  (`serverMessage`), never a silent no-op.
- **INC-073** — the strings list's `status`, `flagged` and `q` filters live in
  the URL (`validateSearch` is the single parse point), so a filtered view is
  shareable.
- **INC-084c** — `e2e/admin-translations.spec.ts` routes every row locator
  through one `translationsSurface(page)` twin helper.
- **C5/C1** — logical properties only; the roster and the strings list use the
  responsive `DataTable`, editor opens inline via `expandedRow`.

### D3 runtime flip

`src/i18n/bundle.ts` reads `get_ui_bundle(lang)`; `I18nProvider` applies the
compiled catalog FIRST and merges the approved DB rows over it. An empty or
failing bundle logs one line — `[i18n] bundle fallback for <lang>: <reason>` —
and keeps the compiled catalog, so a bundle can never blank the UI.

**Honest limitation (SSR):** the active language is still restored from
`localStorage` after hydration and the root route has no server-side bundle
loader, so the server renders the compiled English catalog and the DB bundle is
merged client-side. Public-page SSR of a non-English bundle is a separate
change (root loader + language in the URL or a cookie) and is NOT in U4b.

**Honest limitation (translator card):** U4a exposes a SELF read only, so the
card cannot display another user's current assignment. It is a REPLACE control
and its copy says so.
