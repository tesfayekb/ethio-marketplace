# Handoff — 2026-11-02, redesign Part 2 (Sage) built, tiers and plans part 1 landed, the plans model v2 decided; records turn R10

Written by the supervisor at records turn R10. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev `af312ca2` before this records turn (the merge of pull request #11, turn P-1); main promotes to it on that merge's green run (run on `af312ca2` pending at the time of writing; the pull request's head `deb2ffb81` ran green: 41446177542).
- ethio-prod and ethio-staging both stand at the P-1 marks `20261102220000`, `20261102230000`, `20261103000000` after T1's `20261102200000`, `20261102210000`; every door's body read back equal to its file (ethio-prod's `admin_set_coverage_plan` carries CRLF from the operator's paste — INC-1043, harmless).
- The published site: the operator's Publish of 2026-11-02 10:2x New York, dev `af312ca2` (P-1); its walk passed on every line.
- Side branches: eleven lovable-* (the known set), plus `cursor/p1-packages` (deleted at the merge) and `hold/executor-kit-install` (the Claude Code kit, not merged).
- The executor is Cursor on the operator's computer (DEC-318); Lovable is the reserve and holds Publish. The supervisor applies migrations on ethio-staging through its connector or hands the operator the raw links (DEC-319); the operator applies on ethio-prod after each merge, before Publish.

## 2. What this stretch built (block S85)

- Redesign Part 2, the Sage look, whole: the token sets light and dark (S0), the shell's tokens and the Post disc with `--bar-rise` (S1), the band look, the track and one separator (S2, D261, D265, D266), the dark card C and the feed heading on ONE_LINE_SLOT (B2, D262, D269), one open-list look and the visible-area reader (F → F4b, D264, D267, D268), the raised press and the current item at once (C, D263, D270, D271, D272), dialogs, the select, the popover facade and the full-screen surfaces on one Dialog (S6-1 → S6-4), tiers and ribbons from one mechanism (S4), the ad page (S5), one-line text in every platform font (E), the `cta` size and «የኔ አድስ» (W2), the notice dock and the panel tab's early mark (W3).
- The budget instrument (turn A, DEC-296's NEAR band in scripts/budget-band.mjs), the live-copy overlay (D1, D2, DEC-308), images once per run (CI-3a, DEC-309 — KEPT), one public-surface list (CI-3b, DEC-310), the fast line and the laws step first (DEC-311, INC-1030, INC-1031), the start with nothing else running (CI-4, DEC-313) and the INC-1028 clock patch (B2, DEC-316).
- Tiers (T1): `listings.tier` on every ad view, the staff door `admin_set_listing_tier`, `transition_listing` clearing the tier on removal, the Set-tier dialog and runner (W4: from the listings row menu; the tier filter in Screening).
- Plans and packages part 1 (P-1): the plan's three dials, `listing_packages`, `package_prices`, `package_price_for`, three staff doors, Admin › Plans and Admin › Packages, CF-PERM-1 and CF-PRICE-1, 135 Amharic values (the garbled coverage block replaced, INC-1036).

## 3. Decisions to carry

- The plans model v2 — credits (the Project doc "Plans & packages — model v2 (credits)", 2026-11-02; D293 → D312): levels per ad (Regular, Featured, Premium) with perks per level and a duration matrix per main category × level (× country), reach as a per-ad add-on, bundles as one credit pool with rates and a once-only rollover, Regular free up to N live ads per country, a per-country "paid levels" switch OFF at launch with a free launch bundle when a country turns ON, a level that ends falling to Regular or pausing. It replaces spec v1's seller plans for everything after P-1; P-1's tables and doors are kept and grow (section 4 of the doc).
- The console (D286 → D290): one Monetisation page, Plans and Packages as two rosters, Add price always visible, a price editable until first use, created/updated by as staff-only names, the label key derived with names per language.
- Model per turn (the operator, 2026-11-01; for instructions v1.17): every task file opens with **MODEL — …**; plan phases of mechanism turns and every Tier A exact build on Claude Fable 5.1 (High); spec builds on Claude Opus 5.5 (High); records and exact-copy turns on Claude Sonnet 5.5 (the operator may choose Opus); Grok not used.
- Findings beyond the task (the operator, 2026-11-02; for v1.17): every task carries a FINDINGS clause; a security hole is a STOP described in chat only (G51) and ruled the same session; small in-scope findings are fixed and named; the rest are filed by the supervisor the same turn.

## 4. Operator steps owed

- None for P-1 (applied, published, walked). The weekly security review's items are filed (INC-1038 → INC-1041) and need no click.
- Google Cloud: the app's two Google keys (Gemini, Translation) and its sign-in client each live in a project of the operator's that stays; the unused old projects are shut down only after their credentials and hosting are checked (the steps of 2026-11-02 06:3x New York).

## 5. Open items with owners

- Supervisor: instructions v1.17 (the rules in docs/governance/instructions-amendments.md §"in force since v1.16"); Knowledge v3.13 for the Lovable reserve; the Cursor rules' FINDINGS clause and MODEL line (rides P-1b's pull request); the P-1b brief from the model v2 doc; the roadmap lines of this turn.
- Executor (Cursor), in order: P-1b (levels, reach, prices with credit cost, the free baseline, the switch, the Monetisation console, `docs/features/plans.md`); P-2 (the ad's level and reach doors, the sweep, Promote, the free-slot rule at publish) with the housekeeping addendum (INC-1037, INC-1038 + CF-DIAL-1, INC-1039 / DEC-321, INC-1040's linter rule, INC-1042, the scanner sites #431/#432/#434–436 and the PR #11 comment, INC-443's allowlist hygiene); P-3 (credits: bundles, the ledger, grants, rollover, Settings › Credits); P-4 (payments, when a provider is chosen per market).
- Operator: Publish after each merge; the ethio-prod applies at each migration stop; the walk of P-1b.
- Parked: the phone menu split (D255, after launch); the iPhone tick (dropped, D277); payments.

## 6. Next planned action

R10 lands (this turn); then the P-1b brief (plan first, Fable 5.1 High) from the model v2 doc, with the P-2 housekeeping items queued behind it.
