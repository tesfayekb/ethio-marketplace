# Handoff — 2026-11-09, Foundations 1's first build (F1-1) landed; the seller's Promote (P-2 (b)) and the fold (P-2 (c)) landed, applied, published and walked; the Cursor rules turn 2 landed; records turn R13

Written by the supervisor at records turn R13. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev = main `68347c94c` before this records turn (the merge of pull request #30, P-2 (c); run 42605215902 SUCCESS, main promoted).
- ethio-prod and ethio-staging both hold every mark of the chain: F1-1 `20261106120100` → `120600`; P-2 (b) `20261107001000`; P-2 (c) `20261107120000`, `120100` (M-3a), `20261107140000` → `140500` (M-3b), `20261108090000` → `090500` and `130000` (M-3c-a), `20261109070000` → `070400` (M-3c-b), `20261109110000` (M-3c-c) — read back by version on both; every redeclared body's CR-stripped md5 equals its file's declared value on both; the five plan-seam objects (`coverage_plans`, `plan_caps`, `plan_photo_cap`, `seller_plan`, `admin_set_coverage_plan`) and the `coverage` resource are gone on both.
- ethio-prod's last seventeen P-2 (c) files were applied by the supervisor's Supabase connector at the operator's instruction of 2026-11-09 06:10 New York (DEC-360, one-time; INC-1093 — the SQL editor's paste carries CRLF and M-3b parts 3–4 normalise one side only). DEC-246 otherwise stands.
- The published site: the operator's Publish of 2026-11-09 06:49 New York, dev `68347c94c`; its walk passed 5 of 5 at 07:00 (the Promote sheet's Reach section; the reach table's cap cells; the reach editor's three fields; the roles matrix without Coverage; the optional reach purchase on a throwaway test ad).
- Branches: `cursor/p2-fold` merged, not auto-deleted (the operator deletes it when convenient); `cursor/f1-doors-plan` and `cursor/f2-forms-plan` are the plan records (pull requests #20 and #21 — closed unmerged if not yet); `cursor/f1-doors-1`, `cursor/p2-promote`, `cursor/rules-2` merged.
- The executor is Cursor on the operator's computer (DEC-318): Fable 5.1 (High) only for a new mechanism's first build or an undiagnosable red; Opus 5.5 (High) for plan phases and builds to an approved plan; Sonnet 5.5 for records and exact-copy turns; every build turn in a NEW chat. ONE lane at a time (the operator, 2026-11-08 21:26 — a parallel lane "may not be worth the risk"); DEC-346's lane rules stand for the day two lanes are open again. Rulings travel as attached files saved by scripted copy and checked by sha256 (INC-1076). Lovable is the reserve and holds Publish.

## 2. What this stretch built (block S88)

- F1-1 (pull request #28): the door mechanism's first build — `door_context`, `door_refuse`, `door_refused`, `door_audit`, `has_permission_scoped`, `base_languages()`; `scripts/doors/` (the manifest, `check-doors` static and `--live`, the planted self-test) replacing `check-caller-gates`; `src/lib/door-codes.ts`; the account doors on the shell; three browser doors retired by REVOKE (DEC-347); the sign-out leaf and the entry closure without feature services (DEC-348); INC-1068 → INC-1073.
- P-2 (b) (pull request #29): `promote_options` the one reader door (DEC-349, DEC-350), the Promote sheet on the row menu and the ad page, staff Days on both Set tier dialogs, `moneyText` and `wholeNumber`; INC-1074 → INC-1078.
- The Cursor rules turn 2 (pull request #31): the five `.mdc` rule files level with DEC-346 and the rulings since.
- P-2 (c) (pull request #30, one lane, four turns): c1 the SQL side of the fold (M-3a, M-3b; the migration reader; DEC-351; INC-1079 → INC-1083); c2a the card look in `feed_index`, the `levels` dictionary and the one levels store, the twelve `tier:` consumers folded, the level's names on the ad page's document (M-3c-a; DEC-352 → DEC-355; INC-1084 → INC-1086; register row 118); c2b `listing_caps` and the one caps shape, `p_caps jsonb`, the plan seam and the coverage permission dropped, the carrier law's guard, the drop-aware public-surface judge (M-3c-b; DEC-356, DEC-357; INC-1087 → INC-1090); c3 the Promote sheet's Reach section, `promote_options` listing the ad's current and the included reach, the seller-name law judged live, `ControlOrMeta+A`, the alias helpers, the housekeeping of INC-1037, INC-1040, #431, #432, PR #11, INC-1083, FE-13 (M-3c-c; DEC-358, DEC-359; INC-1091, INC-1092).
- The production apply of P-2 (c): four files by the operator's paste, part 3 refused (INC-1093), seventeen by the supervisor's connector (DEC-360), every one read back.

## 3. Decisions to carry

- DEC-347 (retirement grammar; the DROPs in F1-7), DEC-348 (the entry closure imports no feature service), DEC-349 (one reader door for Promote), DEC-350 (the park rule), DEC-351 (the fold), DEC-352 (the look in the feed index), DEC-353 (the feed doors' timing tolerance), DEC-354 (db:proof PASS satisfies the staging-apply gate), DEC-355 (growth only by a named cause), DEC-356 (`p_caps`, `listing_caps`, the one caps shape), DEC-357 (the drop-aware file judge), DEC-358 (the current and included reach listed), DEC-359 (the seller-name law's two halves), DEC-360 (the one-time prod write) — block S88 carries each text.
- THE CARRIER LAW (INC-1056, INC-1089, INC-1093): both sides chr(13)-stripped; no compared literal spans a raw line break; `check-migrations.sh`'s spanning-literal guard for new files; a landed one-sided file is carried by an LF carrier (the connector, psql), never by the SQL editor's paste (DEC-323 addendum); rule 30 point 7 at the Cursor rules turn 3.
- The report's CI line is the last CODE commit's completed run; no report-only re-push (c2b, c3 cost two full runs with transport reds).
- The MAGNITUDE and EXISTING-ROWS checks on every supervisor ruling that carries a number or a schema change; tolerances name a defect, never a bare number (DEC-353, DEC-355).
- The operator's standing directives of 2026-11-08: the honest scorecard; the fundamentals (security, performance, multilingual, localisation beyond language by CLDR); "all that needs to be done should be done, esp. security, performance" — every known item is on the tracker and nothing is postponed to a later question.

## 4. Operator steps owed

- None for P-2 (c) (applied, published, walked).
- Delete the merged branch `cursor/p2-fold`; close pull requests #20 and #21 unmerged if still open (the plan records stay on their branches).
- Publish after each later merge; the ethio-prod applies after each migration-bearing merge — by his paste from dev's raw links (both-sided or one-line files) or by the connector on his explicit word (DEC-360 was one-time).
- Instructions v1.17: paste the full document into the Project's instructions when the supervisor hands it over (G46).

## 5. Open items with owners

- Executor (Cursor), in order: the Cursor rules turn 3 (Sonnet 5.5 — rule 30 point 7, the CI-line rule, `merge --ff-only origin/<own branch>`, "outside the sandbox", check-brief.py's Cursor mode as a conformance test, line 3 names the FEATURE brief in force, rule 80 reads "names a brief in force", the floor line, the glued lines of 00-protocol.mdc); the housekeeping turn (Opus 5.5 — docs-only pushes skip the lanes, a per-branch CI status file, INC-446, the local NEAR band a note (D320), the 46 lint warnings, INC-1065, INC-1073, INC-1049's copies, INC-1067's varied-profile guard with its DEC and frozen rule); F2 wave 1 (the Refusal shape, INC-1050); F1-2 → F1-7 with F2 waves 2 → 4, one build at a time; P-3 (credits), P-4 (payments) after the Foundations bundle.
- Supervisor: Instructions v1.17 as the full document; Knowledge v3.13 and its mirror; the Foundation fixes tracker after every verified turn; "everywhere as a place kind" (INC-1081) put to the operator as a product question; the weekly GitHub → Insights → Traffic glance (G51).
- Roadmap debts still named: db-proof's four (one redaction module, the CLI pin once, the backend-images job's derived config, a no-tests form of `bun run checks`); proof-caps' two (an explicit-caps core for the trim — c1 gave the trim the reach row's caps; the varied reference profile); F1-7's DROPs of the three retired doors (DEC-347) and `SURFACE_QUERY` (INC-1070's class).
- Parked: the phone menu split (D255, after launch); payments (P-4).

## 6. Next planned action

R13 lands (this turn); then the Cursor rules turn 3 in a new Cursor chat on Sonnet 5.5, then the housekeeping turn on Opus 5.5.
