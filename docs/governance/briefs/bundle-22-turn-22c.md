# Bundle 22 — turn 22c (after the close): the CI tests split over 16 lanes of one worker (DEC-232); a scratch market can no longer be picked by two workers at once (INC-817): brief (saved unchanged, 2026-10-21)

```text
BUNDLE 22 — TURN 22c (2026-10-21; after the close). Tier B (the CI lanes; a test helper). NO MIGRATION. NO NEW STRING. No package change. ONE AGENTS.md CHANGE (E1). Base: dev 8cdb5963 (bundle 22 turn 22b). Parts, IN THIS ORDER: A — CI first; STEP 0; B — the lanes (DEC-232); C — the scratch market's code (INC-817); D — the docs, the roadmap, the changelog; E — AGENTS.md; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT. Write the reports in English.

WHY
- DEC-232 (THE OPERATOR, 2026-10-21 10:3x New York, by question card: "16 lanes, 1 worker each (Recommended)"): with one worker a lane (DEC-230) a run takes about 22 minutes (run 39598287446: the slowest lane, 8, took 1,226 s; lanes 2, 1 and 7 1,017–1,159 s). The numbered lanes go from 12 to 16, each still one worker, so each lane holds about three quarters of today's tests and no two tests share a backend at once. Its rule, frozen before any number: KEEP when each of the first two CI runs after this turn has (1) its slowest numbered lane's job at most 1,000 s (local-backend-proof.md's table), (2) no lane failed by the layout itself (a lane that never starts, a missing source, a job timeout), and (3) the whole run, from its commit to ci-status's Completed time, at most 18 minutes; REVERT to 12 lanes when either run misses (1) or (3). The places that know the lane count (grep at 0f7df463): .github/workflows/local-backend-proof.yml :21 (the matrix), :491 (--shard N/12), :708 and .github/workflows/ci.yml :526 (E2E_EXPECTED_SOURCES).
- INC-817 (registered 2026-10-21; found by your turn-22b end-to-end check): with two workers, CO-7 failed in both projects — both used the scratch market XR. scratchCountryCode (e2e/helpers/countries.ts :41-:50) reads which user-assigned codes are taken and picks a free one at random, with no claim, so two workers running at the same moment can pick the same code; CO-7 then creates the market by its import (no seed), so nothing refuses the second. CI runs one worker a lane, so CI is not affected; local runs (e2e:local defaults to two workers) are. seedSingleOptionMarket (e2e/helpers/locations.ts :653-:670) already retries a countries_pkey collision for the same reason. Fix: two tests running at the same moment never draw from the same codes — Playwright gives every concurrently running worker its own TEST_PARALLEL_INDEX.

STEP 0 — save this file (the attached bundle-22-turn-22c.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-22c.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to E; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT; END THE TURN. Do not stop anywhere else. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- Run no stateful git command. Edits with your file-editing tool. Spec files are not edited in this turn.
- Your sandbox's browser: e2e:local resolves chromium-1208, which your sandbox does not have; run the end-to-end check with `E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` (as in turns 22 and 22b).
- Tests (G27, G38): no real row is written; no assertion loosened.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expected: the run on 8cdb5963, SUCCESS). Paste the flaky lines of e2e-last-failure.md, if any, and the lane table of local-backend-proof.md (DEC-232's baseline). Any gating failure: read its body and fix it at its root cause first (G21, G38), named with its fix.

PART B — THE LANES (DEC-232).
B1. .github/workflows/local-backend-proof.yml: the matrix (:21) becomes `lane: [smoke, email, "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]`; the numbered lanes' command (:491) shards with `--shard="$PROOF_LANE/16"` in place of `/12`; E2E_EXPECTED_SOURCES (:708) becomes `smoke,email,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16`. .github/workflows/ci.yml: E2E_EXPECTED_SOURCES (:526) becomes the same list. Nothing else changes (E2E_WORKERS stays "1").
B2. Census before the edit: `grep -rnE 'smoke,email,1,2|/12"|"12"\]' .github scripts e2e/helpers` — paste the output (expected: exactly the four lines named in WHY); any other place that knows the lane count is changed with it and named. Then run `actionlint -shellcheck= -pyflakes=` on both workflow files and paste the result.

PART C — THE SCRATCH MARKET'S CODE (INC-817).
C1. e2e/helpers/countries.ts, scratchCountryCode (:41-:50): it draws only from its own slot's codes — the codes of userAssignedCodes() whose position modulo 8 equals `Number(process.env["TEST_PARALLEL_INDEX"] ?? "0") % 8` (40 codes, five a slot; two workers running at the same moment never share a slot) — and among those keeps today's rule (free ones only, one at random). Its error when the slot has no free code names the slot. The header comment says why (INC-817). seedSingleOptionMarket's retry (e2e/helpers/locations.ts) stays as it is. Shared helpers keep their defaults (G37): every caller keeps its call.
C2. Census of the class: grep e2e/helpers for any other helper that picks a scratch key from a shared pool by first reading which keys are taken (for example `grep -rn "taken\|free.length\|filter((code) => !" e2e/helpers`); paste the output and name each with what it does. Change only scratchCountryCode in this turn; any other member is named for the next turn.

PART D — THE DOCS, THE ROADMAP, THE CHANGELOG.
D1. docs/features/ci-local-backend.md: APPEND a section "## Turn 22c — 16 lanes of one worker (DEC-232)": "With one worker a lane (DEC-230) a run took about 22 minutes (run 39598287446: lane 8 1,226 s). The numbered lanes go from 12 to 16 (local-backend-proof.yml's matrix and --shard, and E2E_EXPECTED_SOURCES in both workflows), each still one worker. DEC-232's rule, frozen before any number: KEEP when each of the first two CI runs has its slowest numbered lane at most 1,000 s, no lane failed by the layout itself, and the whole run at most 18 minutes from its commit; REVERT to 12 lanes when either run misses the first or the third."
D2. docs/features/e2e-harness.md: APPEND a section "## INC-817 — a scratch market's code comes from the worker's own slot": "scratchCountryCode draws from the user-assigned codes whose position modulo 8 equals the worker's TEST_PARALLEL_INDEX, so two workers running at the same moment never pick the same market (CO-7 collided on XR with two workers, bundle 22 turn 22b). CI runs one worker a lane; local runs default to two."
D3. roadmap.md:
  - line 3: "docs/governance/briefs/bundle-22-turn-22b.md (bundle 22 — turn 22b, after the close: a caught error is read with errorText everywhere and lint refuses `instanceof Error` (INC-815); the force-close choice appears again)" becomes "docs/governance/briefs/bundle-22-turn-22c.md (bundle 22 — turn 22c, after the close: the CI tests split over 16 lanes of one worker (DEC-232); a scratch market's code comes from the worker's own slot (INC-817))" — the rest of the line unchanged;
  - the line that begins "  - [ ] Turn 22b (docs/governance/briefs/bundle-22-turn-22b.md;" gets [x] and, at its end, " — CI: the run on 8cdb5963 (A1's), <its conclusion>";
  - a new line right after it: "  - [ ] Turn 22c (docs/governance/briefs/bundle-22-turn-22c.md; no migration; no string) — the CI tests split over 16 lanes of one worker, kept only if its first two runs prove it (DEC-232); a scratch market's code comes from the worker's own slot, so two workers never share one (INC-817)".
D4. docs/_changelog.md APPEND one line: "- 2026-10-21 — Bundle 22 turn 22c, after the close (no migration; no string): the CI tests split over 16 lanes of one worker each (DEC-232); a scratch market's code comes from the worker's own slot (INC-817)."

PART E — AGENTS.md.
E1. Replace the whole file with the block below (from the line "<!-- LOVABLE:BEGIN -->" through the line that begins "- Draft saves:"), copied from the saved brief by a script, ending with one newline. Its one change of rule — your rule "Record each technical or architecture decision in the project's root AGENTS.md as one rule with a one-line why": the CI-lanes rule reads "- CI: 16 test lanes, 1 worker each (DEC-232; DEC-230: workers collided)."; to stay within the 5,120-byte budget the Legal rule's facts clause is worded shorter with its meaning kept ("facts are {{setting}} tokens frozen with each version"). Paste `sha256sum AGENTS.md` (expected 12a13dc35070755c99156f9137dcb58eaa491475de022646281a7543eeb0a109), `tail -n +13 AGENTS.md | wc -c` (expected 5110) and the format check's line for it.

AGENTS.md — the whole file, exactly:
<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project constitution (all agents)

Follow Lovable Project Knowledge and /docs/conventions.md. Task-named files only; no extras; honesty first: disclose limits; search before creating; no duplicates. 360px-first, logical RTL CSS; no literal UI text (EN+AM keys). Tables: RLS/policies/GRANTs in the same append-only migration; personal data: home_country_code. UTC timestamps; integer money; no secrets in code/commits. Server/RLS alone authorizes. No silent catch-and-continue. Public pages: SSR, absolute canonical/og URLs. Structural edits update /docs/features/<name>.md + \_changelog.md together.

- New tables, sequences and functions in schema public are born closed to browser roles: the migration names each GRANT (a browser grant needs its line in scripts/public-surface-allowlist.txt); each new function restates REVOKE … FROM PUBLIC (bundle 8). A finality trigger lets its own ON DELETE SET NULL keys through (INC-812). Owner writes to ads, photos and seller names pass the acceptance_guard trigger (DEC-216; takedowns pass); other signed-in write doors check acceptance or are in scripts/acceptance-doors-allowlist.txt (D227).
- The database tool applies its input at once: check a scratch copy, then submit FINAL text once (never a stub, comment or draft); remove scratch drafts.
- Text attributes are validated by preset allowlist (`attr_preset_ok`), never free regex; option records use the strict shape `value, label_en, label_am, parent, active, bounds, aliases` — unknown keys refused, defaults omitted (DEC-050).
- A console save never drops a field it does not show: editors round-trip every stored field (INC-188).
- E2E tests needing only a signed-in account use `leaseUser()` (lane pool, reaped at lease); `createUser()` only for a new identity or a target account. Why: deleted users count as MAU (DEC-097).
- CI evidence: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ — ci-status.md, then e2e-last-failure.md and guards-last-failure.md; never dev/main copies or a git fetch of it (DEC-098, S87).
- Market-neutral wording (DEC-094): where a statement depends on the market, name no single country; use {country}. Cultural facts (teff, the Ethiopian calendar, brands) are not market statements.
- Data-API lists use `readAllPages` (src/lib/read-all-pages.ts): keyset paging, never positional (INC-452).
- Lint workflows with `actionlint -shellcheck= -pyflakes=`, as CI does (INC-457, INC-460).
- Browser tests start only with `bun run e2e:local` or `bun run e2e:changed`, never plain `playwright test` (production `.env`, INC-464); targets: ethio-staging or CI's temporary backend (`E2E_LOCAL_BACKEND=1`: https, hosted-like auth and mail), CI's only gate (local-backend-proof.yml, DEC-218); never supabase/config.toml (D228).
- CI: 16 test lanes, 1 worker each (DEC-232; DEC-230: workers collided).
- Scanner output in CI logs and ci-evidence is counts only; details in the Security tab (DEC-132).
- Action labels: two or three words, no article or bracketed remark, every language; explanations go in help text, never a button (D81). A label list-action-labels.test.ts flags takes the brief's shorter text; its allowlist needs a reason.
- A brief's string text is copied by key, character for character; no Amharic of your own (bundle 7 turn 5).
- When a door gains a refusal, the census names every caller and the order each reaches it (INC-481).
- A map indexed by an outside key is read through `ownValue` (src/lib/own-key.ts), never `map[key]` (INC-485).
- Cut names use CutText; crowded-row captions use useLabelRoom on their own row; action-focus modality installs once at hydration (grapheme floors kept, no resize loops or duplicate listeners).
- Flake-fix proofs use manual Flake check, separate from CI/promotion: no local browsers (DEC-184).
- Import previews in tests use `withinPreviewBudget` (e2e/helpers/rate-window.ts); only IG-3 drives the limit, never raised (INC-792).
- QR encoding stays in `src/server/qr.ts`; public QR routes check the id's shape without database reads; a guard keeps the encoder off first paint.
- Shell (bundle 21): cards take `CARD_SURFACE` (src/components/layout/surface.ts): no 1-px border, state borders on top; one ☰ per width, top-left (rail-menu below 768, folds the menu from 768); md tables use `tbl-md:` (D135, D115, D204).
- Legal (bundle 22): texts render only via `LegalText`, never as HTML; facts are {{setting}} tokens frozen with each version; reviews are legal_reviews rows (DEC-219).
- Admin menu alerts (DEC-219): a section's `alert` (sections.ts) is read by `useNavAlerts` (nav-alerts.ts) as one server boolean; the rail draws a dot.
- Strings (DEC-231): keys only admin-only files use go in en-admin.ts/am-admin.ts (the admin gate loads them), others in en-base.ts/am-base.ts; en.ts/am.ts join them; admin-layer.test.ts judges.
- Page-wide data (the category tree) is one subscribed store (`useSyncExternalStore`), never a per-mount copy (INC-788).
- Draft saves: a run armed before a Next never carries it; a follow-up is sent by the run that got the answer (INC-791).

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): B2's census and actionlint; C2's census; E1's three outputs; `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` alone (paste the count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it: sign in when it needs a session, run the flow with real input, and confirm the result reads back through the UI."). Where: ethio-staging, with your three staging credentials — never production. The flow: a staff member creates, reads and takes back a market through the countries console while another worker does the same. Run, with E2E_CHROMIUM_PATH as in HOW TO WORK, at e2e:local's default of two workers (the condition in which turn 22b's run of this file failed CO-7 in both projects), both projects, --retries=0:
  1. `bun run e2e:local -- e2e/admin-countries.spec.ts --retries=0` (the file whole);
  2. `bun run e2e:local -- e2e/shell.spec.ts --grep "LS-11|LS-12|LS-13" --retries=0` (the tests that seed scratch markets through seedSingleOptionMarket).
Paste each summary line and every failure body; a failure is read at its root cause and fixed in this turn (G21, G38). If a test cannot run, STOP and report why.

SCOPE — these files only: the brief; .github/workflows/local-backend-proof.yml, .github/workflows/ci.yml and any other file B2's census names (B); e2e/helpers/countries.ts (C1); docs/features/ci-local-backend.md, docs/features/e2e-harness.md, roadmap.md, docs/_changelog.md (D); AGENTS.md (E1); the files of an A1 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No package change.
THE CI WAIT REPORT: done or not done by part; B1's diffs and B2's census; C1's diff and C2's census; E1's three outputs; the checks; the end-to-end check's outputs; `git diff --stat <START>`; `git diff --name-only <START>` (count the files from this list); anything not foreseen; the line "The project's own check follows on GitHub: the CI run on <the commit this turn leaves> — sixteen numbered lanes, DEC-232's first run; the next brief's Part A reads it." Then END THE TURN; send nothing after the report.
REVERT: git revert of this turn's commits (no migration).
```
