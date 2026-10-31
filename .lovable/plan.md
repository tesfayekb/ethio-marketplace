# Turn D — INC-1023: shipped strings reach the live site (plan)

## CI first
The run on e195034e failed only in lane 3, where the image registry rate-limited the temporary backend. That is outside this turn, as ruled. The build turn reads the run on 1c7e2155 first and fixes any red that is not infrastructure.

## 1. Where the precedence lives: shape (b), in the app
Only the app knows which keys the build ships, so SQL cannot decide "the build's text wins" alone. Shape (a) in SQL would drop every unwritten row. That breaks IB-1, IB-2 and the admin-translations specs, whose scratch rows are seeded without revisions on keys the build does not ship.

The bundle therefore carries authorship, and the merge decides.

- New answer shape of `get_ui_bundle(lang)`: `{ "written": { key: text }, "copied": { key: text } }`. These are the same approved rows as today, split by the one authorship predicate.
- Merge rule, one pure function `overlayBundle(base, bundle, shipped)` in src/i18n/bundle.ts:
  - written rows always win;
  - a copied row applies only where the build has no text for that key.
- An old client holding the old code reads the new shape as two non-string entries. It drops them and keeps the compiled text, so it degrades safely; no blank UI.
- Consumers, all updated:
  - src/i18n/bundle.ts :74 `shapeBundle`, which parses both maps, and :99/:115, the route read and the database fallback;
  - src/i18n/provider.tsx :647, where `{ ...base, ...bundle }` becomes `overlayBundle(base, bundle, compiledKeys)`, the compiled keys taken from the layers the provider has already merged;
  - src/routes/api/i18n.$lang.ts :54, which passes the body through unchanged (no edit beyond its comment);
  - src/features/admin/translations/translations-service.ts :365 `fetchUiBundle`, the console's "shipped" view, which reads `written` plus `copied` as one map, so the console's meaning stays "approved rows";
  - the provider test mocks (provider.test.tsx :33, provider-layers.test.tsx :36, provider-d239.test.tsx :32), unchanged because they answer `bundle: null`.
- `get_ui_bundle_version` is unchanged in meaning. A save or machine revision updates its row, so the version and ETag move. It is still redeclared, because it shares the predicate's file and its read-back.

## 2. Migration (one file, Tier A)
- **The one predicate:** `public.ui_text_written(p_key text, p_lang text) returns boolean`, SQL, STABLE, SECURITY DEFINER, `search_path = public`. It answers whether a revision exists with action in ('save', 'machine') for that key and language, which rides the (key, lang_code, changed_at DESC) index.
  - Closers: REVOKE ALL FROM PUBLIC and anon; GRANT EXECUTE to authenticated and service_role.
  - No browser grant is needed, because it is called only inside SECURITY DEFINER functions. So no public-surface-allowlist line is needed.
- **Redeclared whole from the live definitions, read first on ethio-prod (G39):**
  - `get_ui_bundle`: the new two-map shape, with the same filter (approved, value not null, not orphaned, a public or base language);
  - `get_ui_bundle_version`: same body;
  - `admin_sync_ui_keys`: INC-603's inline revision test is replaced by `ui_text_written(...)`, one predicate and never two copies.
  - The existing grants of each function are restated in the file.
- **Proof:** one DO block, run as no caller, on scratch keys `e2e.scratch.inc1023.*` with a scratch revision batch. It inserts:
  - a copied row with no revision, which must land in `copied`;
  - a row with a 'save' revision, which must land in `written`;
  - a row with a 'machine' revision, which must land in `written`;
  - an 'approve'-only revision, which must land in `copied`;
  - the sync function's own path, proven to keep a written row and to follow the code for a copied row.

  Each failed expectation RAISEs EXCEPTION. The block deletes its own rows by `WHERE key LIKE 'e2e.scratch.inc1023.%'` and restates the self-mark. The mark value is chosen at apply time (G39).
- **Premise to verify at build:** which revision action the staff import writes. The live actions are only approve, machine, save and undo-import. If an import writes no 'save', imported text would read as copied. That would be a STOP for a ruling, not a guess.

## 3. Tests
- **Unit**, a new src/i18n/bundle-overlay.test.ts:
  - a stale copied row loses to the build's text;
  - a saved row wins over the build;
  - a copied row for an unshipped key shows;
  - a DB-only language, with no compiled layer, shows its copied rows;
  - an old-shape or malformed answer keeps the compiled text.
- **Route:** src/routes/api/i18n.lang.test.ts gains a case that the two-map body passes through with the ETag unchanged in form.
- **Console:** a unit case that `fetchUiBundle` joins both maps.
- **Browser:**
  - IB-1 and IB-2 in i18n-bundle.spec.ts are expected green unchanged: scratch keys on a scratch language are unshipped, so their copied rows still show.
  - The admin-translations specs are expected unchanged, run whole on both projects with retries 0. Any change is named under G38.
- **Conformance:** a census inside an existing guard file shows that only `overlayBundle` merges the UI bundle (provider.tsx carries no spread of `bundle`). A planted spread must fail.

## 4. Growth (estimate)
About +0.1 KiB of JavaScript on every page (the merge function and the shape parse), all pages inside the NEAR band rule from turn A. The stylesheet does not change. The bundle payload is the same rows plus two wrapper keys.

## 5. Operator's steps
1. The build turn saves the migration through the database tool. The operator allows the "Modify Supabase database" dialog, the file applies on ethio-prod, and the stop report follows with the read-back: the definitions, the grants and the mark.
2. The supervisor applies the same file on ethio-staging from dev, before the browser specs that read the new shape run on staging.
3. "Sync keys" is no longer needed for the live site to show a new build's text. It is still needed to create rows so translators see new keys and so the approval-coverage gate (D3/D5) counts them.

## 6. Turns
Two parts, one turn each (S500):
- **D1:** the census, the migration and its proof, saved and applied on prod. Then STOP with the read-back, as ruled.
- **D2:** after staging is applied, the app merge, the tests, the browser runs, `bun run checks` and the report.

The split keeps D1's apply and stop report clear of the full checks.

## Technical details
- Files D1: supabase/migrations/<new>.sql; docs/governance/briefs/foundations-turn-d-strings.md; roadmap.md; stop report.
- Files D2: src/i18n/bundle.ts, src/i18n/provider.tsx, src/i18n/bundle-overlay.test.ts, src/routes/api/i18n.$lang.ts (the comment only), src/routes/api/i18n.lang.test.ts, src/features/admin/translations/translations-service.ts with its test, the census case, src/integrations/supabase/types.ts (regenerated, never by hand), docs/features/i18n doc, the mechanisms.md row, one changelog line, the report.
- No new dependency, no new string, no new route.
