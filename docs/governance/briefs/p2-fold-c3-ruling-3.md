# RULING — P-2 (c) c3, stop 3 (the migration stop): CLEAN on ethio-staging; continue to the end of the turn. Base: cursor/p2-fold d96c341fe.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c3-ruling-3.md` (INC-1076) in your first commit after it.

## 1. The migration stop is CLEAN

ethio-staging, read by me after the operator's paste: mark `20261109110000` present and newest; `promote_options`' live body (chr(13)-stripped) md5 `a434782eefe6bce9bb16a1c2604cbd0a` = the file's declared new value; the reach filter carries `OR k.key = v_market.included_reach OR k.key = v_reach` and the old filter is gone; `authenticated` may execute, `anon` may not; no scratch row left (users, packages, countries all 0). The return type is unchanged, so there is no types patch.

## 2. CI, read

The run on 5efed5e8c (your previous push) completed FAILURE: the stale usage maps (fixed in part D) and lanes 5 and 13 — LVP-5 before M-3c-c existed on that push, as you guessed; the run on d96c341fe is the one that judges this head and is still running as I write. Read it at the three raw addresses before your final push; a red whose body touches a path this turn changed is fixed first.

## 3. Then, in order

1. The specs, each whole, alone, 0 retries, both projects, against ethio-staging now that it holds the mark: `my-listings-promote` (LVP-1…5), `my-listings-levels` (LDR-7 among them), `my-listings-ad`, `sage-ad-page`, `post-wizard-place`, `post-wizard-bundle2`, `admin-listings` and `admin-screening` (the `ControlOrMeta+A` sites), `feed-index` (FE-13), `my-listings-page`.
2. `bun run checks` whole (NH-6, actionlint's and gitleaks' downloads are the known Mac limits — name them; CI's Workflow lint job judges the edited workflow).
3. The budgets: no first download of `/my-listings`, `/my-listings_/$listingId` or `/l/$slug` grows by the lazy sheet; the four auth pages' bytes from `door-codes.ts` are the one named growth (DEC-355); a ceiling moves only by DEC-296's form with its cause; an unexplained growth is a STOP.
4. The self-review (rule 80); the report `docs/governance/reports/p2-fold-c3.report.md` with rule 60's fourteen headings — §13 Findings (the eleventh template and NCJ-13 as census corrections; the included reach not self-serve, INC-1092; anything else met), §14 Records unnumbered: DEC-358 (`promote_options` lists the ad's current reach and the market's included reach whether or not they are self-serve), DEC-359 (the seller-name law's two halves: the file census and the live judge in the smoke lane — quote the first smoke run's "live readers" line), INC-1091 (`ControlOrMeta+A`), INC-1092, the register rows (the reach surface on the Promote sheet; the select-all chord and SAC-1; the reader's `computed` marking and `COMPUTED_BY_HAND`; the seller-name law's live half), the changelog line of the GO plus "promote_options lists the ad's current reach (DEC-358); the seller-name law judged live (DEC-359)"; the K2 list (the Semgrep sites #443/#445 and the 99 interpolated RegExps; the marketName copies; the typePhone copies; catalogue.ts/judge.ts's stale bodies; `set_listing_reach`'s inline coalesce); the CI line of the last CODE commit — a report-only commit is never pushed to be judged again.
5. Push, END THE TURN. PR #30 stays a draft until the supervisor says READY.

Stop before the end only for a question none of the rulings answers.
