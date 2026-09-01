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

### Placeholder protection in machine translation (U4g-24 / INC-115)

`/api/translate` never sends a raw `{token}` to the provider. Each token is
masked as `<span translate="no">⟦i⟧</span>` (request `format=html`) and
restored by index in the response. The restore is total-or-nothing: if any
sentinel is missing or duplicated, the provider's text is passed through
untouched and the validator above flags the row — the endpoint never guesses a
token back into place. Fake mode (`E2E_FAKE_TRANSLATE=1`) runs the identical
mask/restore path, so CI exercises the mechanism without a provider key.

On a flagged row the editor offers **Restore placeholders**: a positional
rewrite (token _i_ of the draft becomes token _i_ of the English source),
disabled until the two counts match and stating both counts when it refuses.
It only fills the editor; the subsequent Save re-runs the server validator, so
the flag clears only when the value is genuinely correct.

Provenance is the text's ORIGIN, not its review state: an approved machine row
still reads "Machine", with "Approved by …" appended.

## Coverage-gated publication (S10)

`admin_set_language_flags(code, enabled_admin, enabled_public)` refuses
`enabled_public = true` unless every key in the base catalog has an approved,
non-null row for that language:
`language not fully approved: N of M remaining`. `enabled_admin` has no gate —
that is how a language is worked on before it is published.

EMPTY-SET LAW (U4b-4, INC-095h): every completeness/totality gate defines its
behavior on the empty set explicitly. An empty source catalog is NOT vacuously
complete — when the base catalog holds zero keys the server refuses first with
`catalog empty — sync keys before publishing a language`, and the console's
public switch is disabled with the sync-first tooltip.

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

### D3 runtime flip — fallback-chain law (INC-095)

**The DB bundle is an OVERLAY on the compiled active catalog, never a
replacement; chain = DB[lang] ▸ compiled[lang] ▸ compiled.en.**

`src/i18n/bundle.ts` reads `get_ui_bundle(lang)`; `I18nProvider` builds the base
layer as `{ ...compiled.en, ...compiled[lang] }` and merges the approved DB rows
over it. An empty or failing bundle logs one line — `[i18n] bundle fallback for
<lang>: <reason>` — and is otherwise INVISIBLE: the compiled active catalog
still answers every key, so an empty staging catalog can never regress a
language to English, and a bundle can never blank the UI.

**Honest limitation (SSR):** the active language is still restored from
`localStorage` after hydration and the root route has no server-side bundle
loader, so the server renders the compiled English catalog and the DB bundle is
merged client-side. Public-page SSR of a non-English bundle is a separate
change (root loader + language in the URL or a cookie) and is NOT in U4b.

**Honest limitation (translator card):** U4a exposes a SELF read only, so the
card cannot display another user's current assignment. It is a REPLACE control
and its copy says so.

### SCRATCH-KEY LAW (INC-095e)

**Specs never mutate a real catalog key.** The `ui_translations` catalog is
SHARED RUNTIME: an edit, flag, approve or clear performed by a test changes
what every other spec — and every operator on that environment — then renders.

Every mutating case (TR-3 / TR-5 / TR-8) therefore works on a key of its own,
namespaced `e2e.scratch.<PROCESS_ID>-<worker>`: seeded before the assertion,
edited/approved/cleared, and reaped in a `finally`. Real chrome keys are
READ-ONLY to specs.

Seeding writes the exact rows `admin_sync_ui_keys` would write (base `en`
row `approved`, target-language row `untranslated`). It uses the service-role
client rather than the RPC because the RPC is
`has_permission(auth.uid(), 'translations', 'manage')` + step-up gated and the
service-role connection carries no `auth.uid()`.

### Expansion scoping (INC-095d)

The inline editor ids (`string-editor-*`, `string-input-*`, `string-save-*`,
`string-approve-*`, `string-saved-*`) exist in BOTH DataTable twins — the
desktop expansion is a full-width `<tr>`, the mobile one renders inside the
card. `expansionOf(slug)` / `expansionControl(slug, prefix)` in
`e2e/admin-translations.spec.ts` scope them to the visible twin; no expansion
locator is written inline or with `.first()`.

## AI translation (U4c, 2026-08-30)

Transport ruling (INC-096): the executor rejects NEW Supabase Edge Functions, so
the provider wrapper is a **TanStack server route** —
`src/routes/api/translate.ts` (`POST /api/translate`). The contract is exactly
the one U4c specified for the edge function; only the host moved.

| Concern  | Decision                                                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth     | Caller-context Supabase client: publishable key + the request's own `Authorization` bearer. **No service-role anywhere on this path.**                           |
| Gate     | Before ANY provider call: `translations:machine` AND (`translations:manage` OR target ∈ `get_my_translator_languages()`); refusal is a structured `403 {error}`. |
| Provider | Google Cloud Translation **v2 REST** with `?key=GOOGLE_TRANSLATE_API_KEY`; `/languages` fetched once at cold start and cached in memory.                         |
| Writer   | `admin_machine_translation` ONLY — it re-gates, placeholder-validates (flags on mismatch), sets `machine` status, provenance and audit.                          |
| Batching | ≤100 items per Google call; hard cap 600 items/request (`413` beyond).                                                                                           |
| Failures | Per item: `{key, ok:false, reason}` and **nothing is written for that key**. Response `{done, flagged, failed[]}`.                                               |

**Language census (2026-08-30, cloud.google.com/translate/docs/languages):** `am`
Amharic (listed, marked experimental), `om` Oromo, `ti` Tigrinya — all three are
supported by v2, so no provider switch was needed. A target absent from the
cached list is refused per item with a clear reason rather than sent.

### Secret access pattern

`GOOGLE_TRANSLATE_API_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` and
`E2E_FAKE_TRANSLATE` are read through one `serverEnv(name)` helper that reads
`process.env` **inside the handler**:

- **node serve** (DEC-019 Nitro node-server, used by CI): real `process.env`.
- **cloudflare serve** (workerd + `nodejs_compat`): bindings are injected into
  `process.env` per request — a module-scope read returns `undefined`, which is
  why every read is in the handler.

No `VITE_`-prefixed name is read on this path; `VITE_*` compiles into the client
bundle and would ship the key to the browser.

### FAKE MODE (CI spends nothing)

`E2E_FAKE_TRANSLATE=1` skips Google and returns a deterministic
`⟪<target>⟫ <source>` per item. The rest of the pipeline — gates, chunking,
writer RPC, validator, provenance, revisions — runs unchanged. A source
containing the literal `E2EBREAK` yields output with all `{tokens}` dropped, so
the validator's flag path is exercised (TR-13). The flag is set on the three
E2E-serving CI jobs and on nightly; **a normal build never sets it.**

### UI

`strings-page.tsx` gains a per-row **AI translate** control (inside
`StepUpGate`, hidden for the base language and without `translations:machine`)
and `ai-bulk-bar.tsx` — count-labelled bulk fill with a confirmation dialog,
live progress and an inline summary (`done / flagged / failed`, failed keys
listed). **Deviation, stated:** no `<Toaster />` is mounted and `__root.tsx` is
out of this task's scope, so the summary is an inline `role="status"` live
region rather than a toast — same information, no silent success (F4).

Machine output is **provisional**: it lands as `machine`, and the coverage gate
counts approved rows only, so a human still approves before a language ships.

## Revisions (U4c)

Migration: `supabase/migrations/20260830045700_f5a61050-8b29-4773-befc-d8200d364596.sql`
(declared mark `20260830060000`).

`ui_translation_revisions` captures the PRIOR `value`/`status`/`machine` before
every mutating write, from all three writers (`admin_save_translation`,
`admin_machine_translation`, `admin_set_translation_status`). RLS is deny-all
with no `anon`/`authenticated` SELECT grant: history is read by service-role
tooling and by the audit trail, never by the browser.

### Runbook

1. Set `GOOGLE_TRANSLATE_API_KEY` as a deploy secret (never in code, never
   `VITE_`-prefixed); publish so the server runtime picks it up.
2. Sync keys from the languages page, then open a language.
3. Bulk-fill or per-row translate; review flagged rows first (placeholder
   mismatches), then approve.
4. Publish the language only after coverage reaches 100% approved.
5. Provider outage: failures are per item and listed in the summary; nothing is
   written for a failed key, so re-running is safe and idempotent.

## Entity translations — U4d adoption (2026-08-30)

Migration: `supabase/migrations/20260830080548_da0dfee5-6066-4087-b96b-dacfbac5c2a2.sql`
(declared mark `20260830090000`).

| Surface                                    | Caller                 | Notes                                                                                              |
| ------------------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------- |
| `get_entity_bundle(p_lang)`                | anon + authenticated   | Approved rows only, `{type:{id:{field:value}}}`; `{}` for a non-public language                    |
| `admin_save_entity_translation(...)`       | `translations:update`  | step-up + scope, audited (`entity_translation.save`)                                               |
| `admin_set_entity_translation_status(...)` | `translations:approve` | `approve` \| `clear`, step-up + scope, audited                                                     |
| `admin_list_entity_translations(...)`      | `translations:view`    | Category+location universe LEFT JOINed onto the language, so untranslated names have a denominator |

**Machine translation for entities is DEFERRED** — no `admin_machine_entity_*`
writer exists; entity machine fill rides the REQ-004 engine. The console says
so in helper text rather than hiding the absence.

### Fallback chain (the overlay law, entity flavour)

**DB[lang] ▸ the row's own `name_am` column ▸ `name_en`.** One resolver,
`entityName(type, row, bundle)` in `src/i18n/entity.ts`, is called by EVERY
read site (law B2); `src/i18n/bundle.ts` fetches the bundle and
`I18nProvider` exposes it as `entities`. A failing or empty bundle logs
`[i18n] entity bundle fallback for <lang>: <reason>` and is otherwise
invisible.

Read sites adopted (census): `src/components/marketplace/listing-card.tsx`
(listing location), `src/components/shell/app-rail.tsx` (category label),
`src/components/shell/breadcrumbs.tsx` (category crumb),
`src/components/shell/location-selector.tsx` (cascade picker).
`src/features/feed/use-feed.ts` is the data layer: it now selects
`locations(id,…)` so the bundle can be keyed. `name_am` columns are RETAINED —
they are the middle tier of the chain; dropping them is a later, explicitly
instructed migration (law E2).

**Honest limitation (SSR):** unchanged from U4b — the bundle merges
client-side, so the server still renders the base/column names.

### Backfill

97 `('category', id, 'name', 'am', name_am, 'approved')` rows, asserted equal
to the censused non-null `categories.name_am` count inside the migration
(PROOF P5). The 17 location rows from U4a are untouched.

### Console — the Data scope

`/admin/translations/$lang?scope=data` (URL-derived per INC-073; the route's
`validateSearch` parses `scope`). `src/features/admin/translations/data-scope.tsx`
renders the entity rows through the responsive `DataTable` with the same
inline editor contract as the Interface scope (`entity-*` testids keyed by the
entity UUID), and no AI control.

**THE S10 PUBLIC GATE REMAINS UI-KEYS-ONLY.** Content completeness is a METER,
not a publish blocker, until the REQ-004 era — stated in the console itself
(`admin.translations.data.gateNote`).

### Proofs (in-migration)

P1 gating denies (list/save/status) · P2 scope gate denies an unassigned
principal · P3 a non-approved row never reaches the bundle · P4 `ti` (not
public) returns `{}` · P5 backfill = 97 = census · P6 the `am` bundle carries
the category names · P7 grants read back (anon: bundle only).

### E2E

TR-14 edits and approves the real "Addis Ababa" Amharic name through the Data
scope, asserting DB truth at each step, and TR-15 (inside TR-14, after the
approve) reads `get_entity_bundle` from the browser: `am` carries the new
value, `om` answers `{}`. The prior row is restored verbatim in a `finally`.

## U4e — History drawer and one-click restore

`admin_list_translation_revisions(p_key, p_lang, p_limit)` (migration
`20260830113828_8cf6ff4a-74a2-4294-a8d9-497b76f7ef28.sql`, declared mark
`20260830120000`) is a gated `SECURITY DEFINER` read over the append-only
`ui_translation_revisions` table, which stays deny-all to client roles. It is
gated on `translations:view`, revoked from PUBLIC/anon, granted to
`authenticated`, and returns each revision's action, prior value/status/machine
flag, actor id, a joined actor display name (profile name falling back to the
auth email) and timestamp — newest first.

A string row's expansion carries a **History** control opening the drawer.
Each revision shows relative time, actor, an action chip, the prior
status/provenance chips, and the prior value (wrapped, dir-aware).

**RESTORE IS A SAVE — there is no new writer.** "Restore this value"
(`translations:update`, behind `StepUpGate`, with the line _"Restores this text
as an EDITED value — history keeps everything"_) calls the existing
`admin_save_translation`, so the server re-checks permission, step-up, scope
and placeholders, the value lands as **edited**, and the restore itself is
captured as a revision. A revision whose prior value is NULL cannot be saved —
that row offers **Clear instead**, routing to the existing clear action
(`translations:approve`).

States: loading, error, and the empty state _"No history yet — changes will
appear here."_ The drawer refetches (and the row invalidates) after any
mutation.

TR-16 seeds a scratch key, machine-translates it, edits it by hand, opens
History, asserts both rows and their actors, restores the machine value, and
proves the row is `edited` with the `⟪am⟫` marker while the revision count
reaches **three** — the restore is history too.

## U4f — the publication gate governs CHOICE (2026-08-31, INC-098)

Publication used to gate DATA only: the console could unpublish a language while
the header still offered it, because the switcher carried a static list born in
U0 (before the `languages` table existed).

Now:

- **Switcher options come from the gate's own source** — `languages` under its
  public RLS SELECT (`enabled_public OR is_base`, anon-readable by design),
  ordered by `sort`, labelled with the native name. English and Amharic keep
  their compiled labels; any further published language shows `name_native`.
- **Activation is validated** against that same list, whatever the source
  (switcher click, persisted `ethio.lang`, `?lang=` override). A non-public code
  falls back to the base language with exactly one `console.warn` — an unblessed
  catalog is never rendered. Compiled catalogs remain the fallback layer INSIDE
  a public language (law D3: `compiled.en ▸ compiled[lang] ▸ DB[lang]`).
- **Approve refuses flagged rows.** `admin_set_translation_status(..., 'approve')`
  raises `flagged rows cannot be approved — fix the placeholder first`; `clear`
  is unchanged (clearing is how a flagged row is retired).

CLASS RULE: every consumer of a gated list reads the gate's source.

## U4g — bulk approval, roster order, orphaned keys

- **Approve all reviewed** (`admin_approve_all_translations(p_lang)`) — gated
  `translations:approve` + step-up + language scope. It walks the rows whose
  status is `machine` or `edited`, unflagged and not orphaned, captures one
  `approve` revision per row before writing, then stamps
  `approved/approved_by/approved_at`. Flagged rows are SKIPPED (U4f law) and the
  base language is refused. One audit entry records `{lang, approved,
skipped_flagged}`; the RPC returns those same counts, which the console shows
  verbatim as its summary. The bar's count is the server's own `reviewable`
  statistic, never a client tally.
- **Roster order** (`admin_set_language_order(p_codes)`) — gated
  `translations:manage`, audited old→new. It rewrites `languages.sort` by array
  position; codes outside the array keep their relative order after it. The
  public language switcher reads the same column, so the console's move-up /
  move-down controls ARE the visitor-facing order. The base language stays
  first.
- **Orphaned keys** — `ui_translations.orphaned` is set by
  `admin_sync_ui_keys` for every SYNC-ORIGIN key absent from the ingested
  catalog, and cleared when the key returns. Orphaned rows are excluded from
  `admin_translation_stats`, from the coverage/publication gate and from
  `get_ui_bundle`: a key the code no longer ships can neither block publication
  nor reach a visitor. `admin_list_translations` gains `p_orphaned`, which the
  strings page exposes as an "Orphaned · N" chip.
- **Key ownership (U4g-12, INC-105)** — `ui_translations.origin` is
  `'sync' | 'manual'`, NOT NULL, defaulting to `manual`. Every row
  `admin_sync_ui_keys` inserts or upserts is stamped `sync`; orphan marking
  applies ONLY to `origin = 'sync'` rows. Rows written directly (fixtures,
  manual authoring) are invisible to the catalog payload and are never swept.
  Existing non-scratch keys (`key NOT LIKE 'e2e.%'`) were backfilled to `sync`.
  Migration proofs: a direct-inserted `manual` key survives a shrunken sync
  un-orphaned, a `sync` key absent from the payload is orphaned, and a re-sync
  clears it.

E2E: TR-19 (approve-all counts, statuses, revisions, flagged skip), TR-20
(order moves and is restored in `finally`), TR-21 (sync orphans an absent key,
stats exclude it, the chip lists it). All three work inside the `zxx` fence
language (INC-097d).

## DB-only languages (INC-107)

A published language NEVER requires a compiled file. `src/i18n/locales/*.ts`
is a SEED and a fallback, not the language registry: the operator creates and
publishes languages in the console, so a code may exist in the database alone.
The compiled loader registry is therefore a PARTIAL map — a lookup miss means
"the compiled layer for this language is `{}`", and the chain collapses to

    compiled.en  ▸  {}  ▸  DB[lang]

with exactly one `console.warn("[i18n] no compiled catalog for <lang>; DB-only")`
per language. A missing compiled layer is EMPTY, NOT FATAL. The persisted
preference and the `?lang=` override are validated by code SHAPE only; whether
a code may activate is the publication gate's call (`enabled_public OR
is_base`), never the compiled registry's.

E2E: TR-22 publishes the `zxx` fence, selects it from the switcher and asserts
the page renders (`data-app-ready="1"`, no `pageerror`), that seeded keys show
their fence values and that an unseeded key still shows English. The fence is
returned to admin-only in `finally`.

## U4j — data-layer AI and guided language creation

**Data-layer AI.** The Data scope is no longer AI-less. Per-row and bulk
machine fill run through the SAME `/api/translate` route as the interface
scope (`scope: 'entity'`, items carrying `type/id/field`) and land through ONE
writer, `admin_machine_entity_translation`: same gates (`translations:machine`
→ step-up → language scope), same status machine (`untranslated|machine →
machine`, an `edited`/`approved` row is never overwritten), same audit
old→new. The placeholder validator does not apply — content names carry no
tokens. Everything the provider returns is PROVISIONAL: it lands `machine` and
still needs a human approval.

The bulk bar is one component with a `scope` prop (law B3), so the confirm,
chunking, progress and summary are identical in both scopes; only the collector
and the writer differ.

**Two meters, one gate.** The roster shows an INTERFACE coverage meter and a
CONTENT coverage meter per language (`admin_entity_translation_stats` over
category and location names). Publication stays gated on interface coverage
alone — the page says so under the table (`translations-meter-note`); the
content meter is a meter, never a blocker.

**Guided language creation.** `GET /api/translate` (manage-gated, caller
context, fake list in CI) returns the provider's supported target languages, so
a language the console offers is one the AI can actually fill. Picking an entry
fills the code and English name, derives the native name with
`Intl.DisplayNames` and the RTL flag from the script list — both editable.
Countries come from the `countries` reference table into
`languages.country_codes`, validated against `public.countries` by trigger.
Fence codes (`zx*`) are never offered. "Not listed — enter manually" reveals
the original free-text form: the guide is help, never a wall. A failed provider
list is SAID (F4), with the manual form as the way through.

E2E: TR-24 (fence language, two axes-namespaced scratch locations) asserts a
per-row machine write and a bulk sweep reaching the second row, plus the data
meter's presence; TR-25 (desktop-only, `@global-state`) creates `sw` through
the picker with a derived native name and one country, and deletes it in
`finally`.

## U4j-3 — the Data scope enumerates the entity UNIVERSE

**Walk finding.** A language with no `entity_translations` rows showed an empty
Data scope: nothing to translate, so nothing could ever be translated. The law
is now explicit and proved in-migration:

- `admin_list_entity_translations(p_lang, …)` returns the UNIVERSE — every
  active category and every active location, field `name`, with the English
  source — LEFT JOINed to `entity_translations` for `p_lang`. A missing row is
  `status = 'untranslated'`, `value = NULL`. `p_status`, `p_search`, `p_limit`
  and `p_offset` all apply to the JOINED result, so filters and pagination see
  the same universe the meter counts.
- Ordering is `etype, elabel, eid`. The entity id is a UNIQUE tiebreak: two
  locations may share a name, and without it LIMIT/OFFSET paging — which the
  bulk collector walks page by page — could skip or repeat a row.
- `admin_entity_translation_stats(p_lang)` counts the same universe:
  `total = active categories + active locations`, and `untranslated = total −
the existing rows whose status is not 'untranslated'`.
- The writers (`admin_save_entity_translation`,
  `admin_machine_entity_translation`) are UPSERTs, so the FIRST write on a
  universe row CREATES it. Bodies unchanged; grants restated (INC-074),
  including `service_role`.

**UI unchanged.** `data-scope.tsx` and `ai-bulk-bar.tsx` already render from
these RPCs; the empty state now appears only when the universe itself is empty.

**Proofs (in-migration).** The gated RPCs cannot be CALLED during a migration
(`auth.uid()` is NULL, so `has_permission` refuses), so the proof runs the
universe SQL against a fresh scratch language (`zxx-pf`, reaped in the same
block) and asserts `total = untranslated = count(active categories) +
count(active locations)`; one machine row then moves `untranslated` to
`total − 1`. It then asserts the SHIPPED bodies contain that same universe join
and the unique `ORDER BY` tiebreak, so the counted SQL is the deployed SQL, and
reads the grants back (anon: none; authenticated + service_role: EXECUTE).

**E2E.** TR-24 asserts the scratch location has NO row in the fence language,
that the Data scope nonetheless lists it as `untranslated`, that the bulk bar's
work count is non-zero before any write, and that the count drops after the
sweep. Both scratch locations are reaped in `finally`.

## U4k — Data-scope approval, status chips and dual meters

Walk findings (om/ti): content names could be machine-filled but never approved
in bulk, so the entity bundle stayed empty for a language whose Data scope was
full of `machine` rows.

- Writer: `admin_approve_all_entity_translations(p_lang)` — gates
  `translations:approve` → step-up → language scope, then moves every
  `machine`/`edited` row of that language to `approved` with `approved_by/at`,
  writes ONE audit entry `{lang, approved}` and returns `{approved}`. The base
  language is refused. The entity layer has no flag or revision machinery, so
  there is no skipped-flagged count and no per-row revision capture (the UI
  layer keeps both). Law E6: zero rows approves zero and SAYS so.
- UI: `ApproveAllBar` takes `scope: 'ui' | 'entity'`; the entity confirmation
  states that content names will go live for the language. The Data scope also
  renders the Interface scope's status chips (All / Untranslated / Machine /
  Edited / Approved) with counts from `admin_entity_translation_stats`, wired to
  the existing `p_status` filter.
- The language page header shows BOTH meters side by side
  ("Interface X/Y · Content A/B"), so untranslated content work is visible the
  moment a language is opened.
- TR-26 walks it in the approval fence: bulk AI → approve-all through step-up →
  DB truth per key is `approved`, chips move, summary carries the count.

## U4h — the device ★ (default language) and dynamic hreflang

### The star is a DEVICE choice

A visitor's default language belongs to the DEVICE, not the session: it must
survive sign-out, session expiry and a cleared auth cookie. It is therefore
stored twice:

- `localStorage["ethio.lang.star"]` — the durable client record, read first;
- cookie `ethio_lang_star` — the only channel SSR can read (`SameSite=Lax`,
  one year, path `/`). It carries a language CODE and nothing else.

The switcher renders one ★ toggle per gated language (≥44px, `aria-pressed`,
labelled by `language.star` / `language.starred` in EN+AM). Starring also
SELECTS the language — a default you cannot see is not a default — and the
setter REPLACES rather than appends, so the one-favourite invariant is
structural rather than policed.

### Precedence at boot

```text
URL ?lang= override  ▸  device ★  ▸  last used language  ▸  base (en)
```

The ACCOUNT's `profiles.preferred_language` is not in that chain. It is a
CARRY, applied at most once per load and only onto a device that has never
starred anything: it then writes the device star, which is what makes it
outlive the session. A device that already starred a language is never
overwritten by an account.

Starring while signed in syncs UP fire-and-forget through
`user_set_preferred_language(p_code)` — a `SECURITY DEFINER`, own-row-only,
audited RPC that refuses any code that is neither the base nor
`enabled_public`. Direct column UPDATE is revoked for `authenticated`, so the
RPC is the only entry point. Signed out is the ordinary case, not a failure.

The publication gate still has the last word: a starred language that is later
unpublished falls back to the base with exactly one warning, and the star is
cleared so the next load cannot resurrect it.

### SSR: `lang`, `dir` and hreflang

Head-composition census: `<html lang|dir>` is composed in exactly one place —
`RootShell` in `src/routes/__root.tsx`. Every `<meta>`/`<link>` is composed by
a route's `head()` and printed by `<HeadContent />` in that same shell; there
is no other head surface. Per-page titles/descriptions stay in their leaf
routes; the root owns the app-wide tags and the hreflang alternates.

The root loader reads the star cookie (validated by SHAPE only — the client
reconciles against the gate) and the anon publication list, so the first byte
already carries the right `lang` and `dir`. Public pages emit one
`rel="alternate"` per published language plus `x-default`, with absolute URLs
(law G1); admin/settings/auth/dev paths emit none. Publishing a language in the
console changes the emitted set with no code change.

### Coverage

- Unit (`src/components/language-switcher-star.test.tsx`): pressed state, the
  one-favourite invariant, and a DB-only language being starrable.
- E2E (`e2e/shell.spec.ts`): TR-27 (a signed-out star survives reload, sign-in
  and sign-out), TR-28 (the account carries onto a starless device and writes
  the star; a device star beats the account), and the hreflang set equalling
  the anon gate list.
