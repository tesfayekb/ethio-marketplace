```text
RULING — turn D2, INC-1023: the app reads the bundle's parts and lets the build's own text beat a copy. Base: dev b3e8dba2. Tier A (the translation bundle). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-d2-strings.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-d2-strings.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

D1 VERIFIED:
- Step 0's sha256 965d697a… matches.
- The import finding holds: admin_save_translation_core writes 'save'.
- The migration (sha256 502856eb…) is applied on both databases.
  - ethio-prod: mark 20261031014000; the three functions' ACLs as reported; get_ui_bundle byte-identical; no scratch rows left.
  - ethio-staging: the operator applied it, and the same mark reads back. The three definitions equal ethio-prod's once the carriage returns his browser editor added are removed: ui_text_written 8cfacfa4…, get_ui_bundle_parts 930f4e91…, admin_sync_ui_keys 8ac3b1ed…. The ACLs are the same.
- CLEAN.

CI FIRST: read the last completed run. The run on b3e8dba2 may show "STAGING BEHIND" if it started before the operator's staging apply. That is no defect (§5); the next run clears it. Any other red is fixed first, from its failure body. Lane failures to start the temporary backend on a registry rate limit are infrastructure, and the CI turn after D2 fixes them.

WHAT IS TRUE AT THE END (your plan's §1 and §3, moved to the new function):
- **The reads.**
  - src/i18n/bundle.ts reads `get_ui_bundle_parts` and parses `{written, copied}`.
  - The route src/routes/api/i18n.$lang.ts serves that shape.
  - translations-service.ts :365 (the console) reads the parts and joins them.
  - get_ui_bundle is no longer read by the app.
- **The one merge, `overlayBundle(base, parts, shipped)`:**
  - a written row always wins;
  - a copied row applies only where the build ships no text for that key;
  - a language the build does not ship shows its copied rows.
  - The provider uses it, and a census case refuses any other spread of the bundle, proven on a planted spread.
- **The cache.** The ETag carries the answer's shape (for example a `parts1.` prefix in bundleEtag), so a cached flat answer from before this build is never read as the new shape. A flat or malformed answer keeps the compiled text (D3).
- **The tests:**
  - the merge unit cases of your plan;
  - the route case;
  - the console case;
  - a case that a flat cached answer keeps the compiled text;
  - admin_sync_ui_keys' path through the predicate, proven by its existing route or unit tests or a new one: a copied am row follows the code, a written am row is kept;
  - IB-1, IB-2 and the admin-translations specs, run whole on both projects with retries 0. Each change, if any, is named under G38.
- **The roadmap.** One line: retire get_ui_bundle (and its version function, if nothing else reads it) by a later migration, once the published site reads only the parts. It names this turn and INC-1023.
- **The docs.** The i18n feature doc says the console's "Sync keys" is still needed to create keys for translators and the approval count, and is no longer needed for the live site to show a new build's text.

TESTS: as above; `bun run checks` once on the final tree, run whole, with its last line pasted (no FAIL), and the unit suite's full count. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges. A page whose JS first download grows past its ceiling's NEAR band follows DEC-296's form (turn A's guard), with its cause.

SCOPE (by area): src/i18n/ (bundle.ts, provider.tsx, the new overlay test), src/routes/api/i18n.$lang.ts with its test, src/features/admin/translations/translations-service.ts with its test, the census case in scripts/conformance/**, the e2e specs and helpers that read the bundle's shape, scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings, the standing docs allowance (the i18n feature doc, the register row in docs/governance/mechanisms.md, one docs/_changelog.md line).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-d2-strings.report.md:
- step 0's sha256;
- the CI line, with any red classified;
- every consumer moved, file:line;
- the merge rule and its census;
- the cache-shape answer;
- every test added or changed under G38;
- the growth table (JS per page and the stylesheet) with causes;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only b3e8dba2.
```
