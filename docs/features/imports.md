# Imports — the one security gate

Every operator-supplied file enters the platform through **one** door:
`src/server/imports/gate.ts`, driven by the family declarations in
`src/server/imports/registry.ts`. A route owns HTTP and the RPC contract; it
owns no judgement about a file.

## Order of judgement

A file never gets past a step it failed.

1. **Ingress** — the route reads raw bytes: a body over 4 MiB and any invalid
   UTF-8 are refused before JSON parsing.
2. **Bearer** — caller-context publishable client, never the service role.
   No bearer, no door (401).
3. **Family** — registry lookup: permission, step-up policy, scope kind, files,
   columns, column classes and caps.
4. **File identity** — the first header names the file. A header belonging to
   another registered family is `wrongFile`; a header belonging to nothing is
   `badHeader`.
5. **Shape** — exact declared column order, no duplicate and no unknown column,
   optional trailing `action` column, ≤ 1 MiB per file, ≤ 5 000 data rows.
6. **Hygiene, per cell** — NFC, strip control/bidi-override/zero-width, trim,
   refuse NUL (whole file), refuse raw formula-leading cells (`= + - @`) while
   letting the export's neutralising apostrophe round-trip.
7. **Format law, per column** — slug, bool, int, date, pipe list, option list
   and enum/action vocabularies, plus length caps.
8. **Duplicate identity** — judged at the gate, or deferred to the planner when
   the family's law is lifecycle- or inheritance-aware (declared per file).
9. **Rate limit** — one preview/commit in flight per operator, 30 previews a
   minute.
10. **Payload** — the planner RPC receives typed rows, never raw CSV text. The
    RPC remains the only authority on meaning and on permission (F3, E7).
11. **Audit** — one `import.preview` / `import.commit` / `import.undo` row per
    door through `import_gate_audit`; every failure logs `[ssr-error] <path>`.

A refused file is never stored anywhere. Preview writes nothing.

## Database library

Migration `20260909054432_…` ships `import_norm_text`, `import_norm_bool`,
`import_norm_date`, `import_norm_pipe`, `import_is_slug`, `import_sanitize` and
`import_gate_audit`, each with in-file `REVOKE ALL FROM PUBLIC, anon` ·
`GRANT EXECUTE TO authenticated` · `GRANT ALL TO service_role` and an ACL
read-back. NUL rejection lives in the gate because PostgreSQL text cannot hold
a NUL byte.

## Adding a family

1. Declare it in `registry.ts`: permission, step-up, scope kind, and for each
   file its identity header, ordered columns with a class per column
   (`identity` · `editable` · `read-only` · `action`), identity columns and the
   duplicate policy.
2. Call `openImportGate` from the route (`openExportGate` for the matching
   export) and hand `rows[fileId]` to the gated planner RPC. Release the slot in
   a `finally`, and call `audit(...)` on each door.
3. Add the family to `e2e/import-security.spec.ts`'s `FAMILIES` list — the
   hostile catalogue is parameterised, so a family gets no private test.
4. `scripts/check-import-gate.sh` fails the build if any import/export route
   authenticates by hand, builds its own client, or skips the gate, and if any
   registered column lacks a class.

## Families today

| Family       | Files              | Permission            | Step-up | Scope         |
| ------------ | ------------------ | --------------------- | ------- | ------------- |
| attributes   | definitions, links | `categories:import`   | commit  | category slug |
| categories   | categories         | `categories:import`   | commit  | category slug |
| translations | strings            | `translations:manage` | write   | language code |

## The UI-string door (Part C)

`POST /api/admin/translations/import` is the only way a translation file
reaches the database. The browser no longer parses anything: the console reads
the file as text, posts it with the target language, and renders the counts the
server returns.

- **Two dialects, one law.** CSV (`key,source,translation` with `context`
  optional) and XLIFF 1.2 arrive at the same route; the reader is chosen by
  content, and XLIFF units become the family's own columns before a single
  refusal is spoken. A unit with no id or no target yields an EMPTY row rather
  than being dropped, so an operator's row numbers stay the file's own.
- **Keys are identities.** A key must match `[A-Za-z0-9][A-Za-z0-9._:-]*` and
  200 characters; a value is capped at 4000. Duplicate keys in one file are
  refused by name.
- **Formulas.** A `=`/`+`/`-`/`@` cell is a live formula in a spreadsheet, so
  the EXPORT neutralises it with a leading apostrophe and the gate
  un-neutralises on the way in — `+ Add` survives a round trip, while a raw
  formula in a hand-made file is refused in the key column.
- **One step, so the WRITE is metered.** This family has no preview door and no
  digest: the commit itself carries the one-in-flight and per-minute budget.
  `undo` takes the same route, so a taken-back run is audited like the run it
  undoes.
- **Meaning still belongs to the writer.** `admin_import_translations` keeps
  EXECUTE for `authenticated` and remains the sole authority on permission,
  step-up, unknown keys, placeholder validation and revision capture; the gate
  only decides what is allowed to reach it. `scripts/check-import-gate.sh`
  fails the build if a console calls that RPC (or a category/attribute import
  RPC) directly.
