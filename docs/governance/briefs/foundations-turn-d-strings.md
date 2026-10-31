```text
RULING — turn D1, INC-1023: your plan approved with one change of shape, then the migration built and applied. Base: dev 69c3d10d. Tier A (a migration on the translation bundle). No new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-d-strings.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-d-strings.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

THE PLAN (.lovable/plan.md at 69c3d10d) IS APPROVED: shape (b), the precedence in the app; the one predicate; two turns, D1 and D2. With these rulings (the supervisor, under G17; overridable):

1. The door stays backward-compatible. Do not change get_ui_bundle's answer.
   - The supervisor read on ethio-prod (01:30Z): `om` is a public language with 570 approved rows, all written by the machine or a person, and no compiled catalogue.
   - If get_ui_bundle's shape changed in D1, the published site and the preview would drop those rows and show English in place of Afaan Oromo until D2 is built and published.
   - So D1 adds a new function, `get_ui_bundle_parts(p_lang text) returns jsonb` = `{ "written": {...}, "copied": {...} }`. It has the same filter as get_ui_bundle (approved, value not null, not orphaned, a public or base language) and the same header attributes (STABLE, SECURITY DEFINER, search_path public).
   - get_ui_bundle and get_ui_bundle_version stay exactly as they are; they are not redeclared. The version already moves with every written or approved change.
   - D2 moves the app to the new function. A later turn retires get_ui_bundle once the published site reads only the new one: one roadmap line, written in D2.
2. The predicate `ui_text_written(p_key text, p_lang text)`.
   - It is true when a 'save' or 'machine' revision exists for that key and language (INC-603).
   - It is called only inside SECURITY DEFINER functions, so it is granted to no browser role: REVOKE ALL FROM PUBLIC, anon and authenticated. EXECUTE goes to service_role only if a test needs it.
3. Grants for the new door. `get_ui_bundle_parts` is anon-callable like get_ui_bundle, which was granted to anon and authenticated before the list began (supabase/migrations/20260831060745_… :272). Its GRANT gets a line in scripts/public-surface-allowlist.txt in the list's form, `get_ui_bundle_parts | <reason>`; the reason says the marketplace is public and the function returns only approved rows of a public or base language.
4. admin_sync_ui_keys is redeclared whole from its live definition (pg_get_functiondef on ethio-prod), with the header attributes and every byte unchanged except INC-603's inline revision test, which becomes `public.ui_text_written(t.key, 'am')`. Paste the argument list, provolatile, prosecdef and proconfig, live beside the file, before the apply (G39).
5. The proof. One DO block, as no caller, on `e2e.scratch.inc1023.*` keys only. Every failure RAISEs EXCEPTION, and the block deletes its own rows and revisions with a WHERE clause. It covers:
   - a row with no revision, which lands in `copied`;
   - a 'save' row, which lands in `written`;
   - a 'machine' row, which lands in `written`;
   - an 'approve'-only row, which lands in `copied`;
   - get_ui_bundle's answer for the same keys, unchanged (flat).
   admin_sync_ui_keys needs a caller with the permission, so its path is proven by D2's route or unit test, not in the block (G39).
6. The import premise you raised: before writing the file, read which revision action the console's import writes (src/routes/api/admin/translations/import.ts and the SQL it calls). If an import writes neither 'save' nor 'machine', STOP and report; do not guess.
7. Apply: when you save the migration, the platform applies it on ethio-prod once the operator allows the "Modify Supabase database" dialog. He is at hand. The mark is chosen at apply time (G39): above the ledger's newest mark (20261030050000 on ethio-prod) and later than now.

STOP after the apply, and END THE TURN with the stop report, saved as docs/governance/reports/foundations-turn-d1.report.md:
- step 0's sha256;
- the CI line you read first (1c7e2155), with any red classified;
- the import finding (item 6);
- the file name and its declared mark;
- the live read-back on ethio-prod:
  - the mark row;
  - pg_get_functiondef of the two new functions and of admin_sync_ui_keys;
  - proacl of all three;
  - get_ui_bundle unchanged;
- the line for the operator's staging step: "apply <uuid fragment> → expect mark <value>" (the supervisor applies it on ethio-staging);
- the K2 list;
- git diff --name-only 69c3d10d.

No app code in D1. D2 follows after the staging apply.

SCOPE (by area): supabase/migrations/<new file>, scripts/public-surface-allowlist.txt (the one line), docs/governance/briefs/foundations-turn-d-strings.md, roadmap.md, the D1 report.
```
