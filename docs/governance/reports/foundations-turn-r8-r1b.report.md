# Records turn R8, then turn R1b — report (split after Part A)

Done: step 0, the records (step 4), Part A (A1–A4). Left: Part B (R1b, foundations-turn-r1a.md items 5–11), not started. CI: last completed run 9d3e46d6 SUCCESS; 8e7feb84 and this push not yet seen.

## 1. Step 0
- docs/governance/briefs/foundations-turn-r8-r1b.md, fenced body sha256 `6e6fe976accd82494d439eece4dd780afea17caf0fc5f7290670d7426c9dfefb` (equals the brief's value).
- Step 3: all twelve data files matched their FILE lines (sha256 and bytes) on the first write; none rewritten.

## 2. CI line
- `9d3e46d617c2206dc8527a693ced63d402e61a2d`: run 40984475820, **SUCCESS** (completed 2026-10-30T01:41:45Z). E2E passed. No completed run for 8e7feb84 was in the evidence files at read time.

## 3. The eight printed sha256 lines (each equals EXPECTED)
```
6c0a80d8af380084dd560aa99790e08275bdbc9dc1369fbf5e34a8fd65e302e8 docs/tracking/incidental-findings.md
fdc2bea192bab2ac750e8d7314f8f899348996024f373e0ad78cd49230f60792 docs/spec/spec-ledger.md
d145afd02505a1d351fb09d2a1c2e305b48549445206ff2428333c0bfb6e90bd docs/governance/instructions-amendments.md
e08ff8a4b2e703f5fd7b4cfc3ab3a638c0719c3b0bcc05ca00700b8a59ef1bf8 docs/governance/lovable-knowledge.md
dddddc707094087465095c7693e7292bb536bb53c969a836338af747ca81e4f1 docs/governance/system-state.md
15aae672a070bbcf036ca7d090ad80eddd6d233a3cb33ae396d8eb1c41971346 docs/governance/handoffs/2026-10-30-foundations-j1-handover.md
28eac2d6b8190ccf3a0b747b87c74fef433a966904285444c882d3c45f4fa830 roadmap.md
f0f7edf956a329c94ed0542f81b81c4dab68ad99f8be32e5ce8831d054345f0a docs/_changelog.md
```
- Departure: format:check refused docs/tracking/incidental-findings.md once the records were appended. Prettier would escape `_` and `*` inside the imported INC-1000, INC-1003 and INC-1005 text. The record's text was not edited. Instead, `.prettierignore` gained that one file under the verbatim-record class (INC-007), the same class as docs/spec/ and docs/governance/.

## 4. Part A
- **A1 (CF-E2E-WAIT-1)** in scripts/conformance/e2e-waits.test.ts. It refuses `getByRole("menu")` … `toHaveCount(0)` within three lines of a `switchLanguage(` call in any spec outside e2e/helpers/. The tree is clean. Other menu waits are not near a switch and are not refused: overlay-shift :62, overlays :59, smoke-auth-i18n :83 (account menu, 10 lines from the switch), on-demand-failure :34. Planted copy refused (`e2e/planted-menu.spec.ts:2`).
- **A2 (CF-E2E-PLACE-1)**, same file. It refuses a bare `count()` on the city picker's options, and a `post-where-region` picker selected by a loop variable within three lines of a `for (`. The tree is clean. The planted old walk is refused at both lines (`planted-walk:3`, `:5`), and a planted pick by id passes. Allowlist scripts/conformance/e2e-waits-allowlist.txt is empty; its header names the `key | reason | until` form.
- **A3 (INC-1006 census)** — e2e sites that round a stored value and compare it with page text:

| Site | Verdict |
| --- | --- |
| e2e/ad-page.spec.ts :1303 (AP-41 maps link) | correct. The test uses the app's own expression on the same input: listing-detail.tsx :449–:450 `snap(lat).toFixed(2)`, where `snap` = `Math.round(v / SNAP) * SNAP` and SNAP = 0.01 (map-preview.tsx :42–:45). The test computes `(Math.round(pin_show_lat / 0.01) * 0.01).toFixed(2)`. Same figure in, same rounding. |
| e2e/post-wizard-place.spec.ts PW-37 | fixed in R1a-2: within the screen's half-step |
| every other toFixed / Math.round in e2e (shell, admin-*, primitives-law, my-listings-ad :943, photo-pipeline, phone-frame, i18n-sign-in-language, shell :2903, global-setup) | not of the class. They round layout boxes, timings or message text on both sides from the same measurement; none rounds a stored figure against page text. |

- **A4**: docs/governance/mechanisms.md rows 77 (overlay shift: src/styles.css, CF-SHIFT-1, OVS-1/2) and 78 (pickCity, CF-E2E-PLACE-1, sibling CF-E2E-WAIT-1).
- The new census passes CF-KIT-7 (its keys are named) and CF-WIRED-1.

## 5. Part B (R1b), foundations-turn-r1a.md items 5–11
- Items 5 (D98 read), 6 (on-demand through overlay-loader), 7 (row heights), 8 (touch tests), 9 (‹ Main menu row), 10 (first-download growth) and 11 (docs, register row): **not started**. I split at the clean point after Part A, as the SPLIT clause allows. No app code changed this turn, so there is no per-page growth table.

## 6. Unit count
- 2,267 / 2,267 tests, 381 files.

## 7. Checks' last line
- `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 947s`. The first run had two FAILs: format (the record, §3) and CF-KIT-7 (the census's keys were not a named array). Both were fixed and the checks rerun whole. NOT RUN: dependency installs ×3, SARIF upload ×2, dependency audit ×2, staging parity preflight ×4, E2E merge/verdict ×6, promote ×4.

## 8. K2
- Non-modal overlays predating INC-1005: src/components/shell/app-rail.tsx:963, src/components/shell/row-actions.tsx:111.
- Still open: tooling localeCompare sites; other menus' waits (account menu in smoke-auth-i18n :83 is a by-hand close wait outside the language switch, not of A1's class).

## 9. git diff --name-only 8e7feb84
```
.prettierignore
docs/_changelog.md
docs/governance/briefs/foundations-turn-r8-r1b.md
docs/governance/handoffs/2026-10-30-foundations-j1-handover.md
docs/governance/instructions-amendments.md
docs/governance/lovable-knowledge.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-r8-r1b.report.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
scripts/conformance/e2e-waits-allowlist.txt
scripts/conformance/e2e-waits.test.ts
```

J-audit: no spec file changed this turn; the census reads e2e/ and writes nothing.
