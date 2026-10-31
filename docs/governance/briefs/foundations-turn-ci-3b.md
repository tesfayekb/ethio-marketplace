```text
RULING — turn CI-3b: one public surface (B, DEC-310). Base: dev d7981076. Tier A by §5 (every GRANT to anon, authenticated or PUBLIC is the public-surface allowlist). No migration, no new dependency, no new string, no app code. Lovable. Saved as docs/governance/briefs/foundations-turn-ci-3b.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-ci-3b.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI-3a VERIFIED (dev d7981076, fresh clone): step 0's sha256 111b7a08… matches; AGENTS.md untouched; one `supabase start` job (proof, 19 lanes) needs `backend-images`, restores the exact key, loads and inspects before its one start; the images come from the CLI's own start on an empty copy; pull-images.sh and PIM-1…4; CF-CI-IMG-1…4 by definition with the mechanism exempt by reason; the fast line with TC-E1 and TC-E2; the report written before the checks. CLEAN pending CI on d7981076, the first run with DEC-309 (a cache miss).

A CORRECTION TO THE FACTS OF CI-3 (the supervisor's slip): "refused:replay" is not a second run of the migrations. It is job_run_claim's own refusal (20261029073342 :49), raised at the proof's first claim (CL-1, :212, `v_got := public.job_run_claim(...)`), where the proof expects a claim to succeed. The four failed starts share one shape: the image pulls failed during the start, and a migration then failed while they ran — the INC-970 proof three times (aed7904b, e195034e, b3e8dba2) and a deadlock on DROP POLICY at statement 48 of 20261007033719 against another session (d2e9bb36). So the migrations and the CLI's pulls overlap, and the cause is that overlap, not a retry. DEC-309 removes it by making every image local before the start, and its rule is restated so:
- a registry refusal at a pull or a start counts against the rule, as ruled;
- a migration that fails during a start while every image was local is not counted against the rule. It is its own finding, investigated from its body.
Fix in this turn: the comment at scripts/conformance/ci-images.test.ts (its header, rule 3) says the start is never retried "into migrations that already ran (\"refused:replay\")"; it says instead that a start is never retried. Add one line to the CI-3a report under "The replay's cause" pointing to this correction.

CI FIRST: read the run on d7981076 (the first with DEC-309, a cache miss). Any red that is not infrastructure is fixed first, from its failure body.

THE SYSTEM (G0)
- CONCERN: what a browser role (anon, authenticated, PUBLIC) may run or read in the database. One list says it, and every guard reads that list.
- MECHANISM: scripts/public-surface-allowlist.txt (154 lines at bc2e2ba5; format `<name> | <reason>`), read today by scripts/check-migrations.sh for grants made after M1. The second reader to join it: the smoke lane's database lint, scripts/security-lints.ts, whose function_executable_by_anon count sits in scripts/security-lints-baseline.json (20, DEC-240). Two lists for one surface: INC-1025.
- CONSUMERS: your census, by definition: every reader of the allowlist and every count or list of browser-role grants in scripts/, .github/ and supabase/, file:line.

THE RULINGS (fixed in CI-3a; G17, overridable)
1. Each line becomes `<name> | <roles> | <reason>`, roles a comma list from anon, authenticated, public.
   - Every existing line gets its roles, read from the migration that grants it (the newest grant wins).
   - A line you cannot place says so in the report; it is never guessed.
2. The 20 functions anon may run today (read on ethio-prod by you and on ethio-staging by the supervisor; equal), each with its reason, as in your plan:
   - feed_page, seller_feed_page, public_listing;
   - get_browse_tree, get_category_tree_version, get_category_attributes, catalog_find_version;
   - get_location_tree, get_location_tree_version, get_open_countries;
   - get_ui_bundle, get_ui_bundle_version, get_ui_bundle_parts;
   - get_entity_bundle;
   - legal_in_force, legal_scheduled;
   - price_unit_labels, price_shape_for_basis;
   - sold_cutoff, sold_visible_days.
   Each reason is checked against the function's body as it stands. A line already on the list gains its roles and is not duplicated.
3. One parser module reads the list, for both guards. check-migrations.sh calls it, or reads the same fields by the same rule, and a planted line proves both readers agree on it.
4. The smoke lane's lint reads the anon-executable function names on the temporary backend: public schema, not extension-owned, by the query text in the script, through the existing DB_URL `--tsv` path (DEC-240). No database function, no migration.
5. The comparison is a pure function in scripts/security-lints.ts:
   - an anon-executable function with no line whose roles include anon → FAIL. The log gets the count only (DEC-132 rule 2 stands: no name, no hash, no artifact) and the read-only query that names it;
   - a line naming a function that no longer exists → FAIL as stale, printing its name (the list is already public);
   - table and column lines (for example `listings`) are told apart from functions by the live catalogue, never judged as functions.
6. function_executable_by_anon leaves security-lints-baseline.json. docs/features/security-scanning.md records why, beside the 19 → 20 line of S2b.
7. K2 and a roadmap line: the same comparison for authenticated. Not this turn.

TESTS
- Planted cases:
  - SLB-1: an unlisted anon function fails;
  - SLB-2: a stale line fails with its name;
  - SLB-3: the exact set passes;
  - SLB-4: no function name appears in the output for an unlisted one;
  - SLB-5: an authenticated-only line does not cover an anon-executable function of the same name;
  - SLB-6: both readers parse the planted roles line the same way.
- wired.test.ts names the lint's caller.
- check-migrations.sh's self-test passes on the new format.

SCOPE (by area):
- scripts/public-surface-allowlist.txt;
- scripts/check-migrations.sh and the new parser module with its tests;
- scripts/security-lints.ts, its test and scripts/security-lints-baseline.json;
- the smoke lane's lint step in .github/workflows/local-backend-proof.yml;
- scripts/conformance/wired.test.ts, and the one comment in scripts/conformance/ci-images.test.ts;
- docs/governance/reports/foundations-turn-ci-3a.report.md (the one correction line);
- docs/features/security-scanning.md;
- docs/governance/mechanisms.md (the register row);
- docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope, nor the spec ledger.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-ci-3b.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI line for d7981076, with any red classified;
  - the census;
  - the list before and after (line count, and each line's roles with where they were read);
  - the comparison's rules;
  - SLB-1…6;
  - the unit count;
  - K2;
  - git diff --name-only d7981076.
- Then `bun run checks` once, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
