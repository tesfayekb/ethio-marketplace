# Handoff — 2026-10-30, redesign Part 1 (the left menu) closed; records turn R9

Written by the supervisor at records turn R9. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev `8c48bb2a` before this records turn (turn R1d-c ended at `aed7904b`, 2,274 passed and 0 failed with lane 5 not started — INC-1018; then turn P0, its run pending); main `60287c03`.
- Both databases, ethio-prod and ethio-staging, stand at mark `20261030050000` (J-1's migration); redesign Part 1 changed no schema.
- The published site: the operator's Publish of 2026-10-29 23:02 New York (dev `8e7feb84`: J-1 and R1a). The Lovable preview carries everything since; the next Publish follows the walk of Part 1.
- Side branches: eleven lovable-* (the known set).

## 2. What this stretch built (block S84)

- The sub-menu mechanism (R1b-2; CF-SUB-1): the category rail's sub-categories open in side panels from 768 px, on hover and by tap; the admin, account and seller groups too (R1d-c).
- One menu look (D248; src/components/shell/menu-row.ts, CF-ROWS-1): a panel's rows are the main menu's rows — surface, text, icons, one-line names, rows level with the main menu's; a panel never compacts and scrolls past the menu's height (D254).
- Fit before scroll (D247): rows share the height, 32–40 px below 768 px and 32–48 px from 768 px; below 768 px more than 16 items scroll; from 768 px no item limit.
- The footer in the middle column and compact (D252, D253); the menu's width in one place (menu-width.ts, CF-WIDTH-1).
- "Home" at the top of the category list (D259); the phone strip follows the menu's level (D255); every band row 40 px (D258); the top bar's spacing (D256); the footer's columns evenly spaced (D257) — R1d-c, with its first-download growth trimmed and the rest accepted (DEC-302).
- The phone split (DEC-288's 1/4–3/4 columns, D241, D249, D251) is POSTPONED by D255 — revisited after launch on usage.

## 3. State of each agent

- Lovable: this records turn; then turn P1 (the Sage spec imported, Part 2's plan) while the operator is away — the supervisor's call of 2026-10-30, overridable; one executor on dev at a time.
- Cursor (the pilot, DEC-303; the operator's decision of 2026-10-30 10:03 New York): its rules and cloud environment landed in turn P0 (.cursor/), the designer's files are in docs/governance/sage/ (P0), and the spec joins them in turn P1. Cursor's turns are build turns of Part 2 from P1's plan, run as a cloud agent on Cursor's Linux machines (the operator's PC runs Windows; the repository's scripts need bash): it works on a cursor/… branch and opens a pull request into dev, which the operator merges after the supervisor's check (the setup guide: the Claude doc "Cursor setup for ethio.com"). Cloud agents ask no approvals; the rules are the guard, and the supervisor's check after each turn covers the pull request and every branch.
- Curator: idle, as block S76 left it.

## 4. Operator steps owed

1. The walk of redesign Part 1 on the preview (one walk, written by the supervisor at Part 1's close).
2. Publish when the supervisor reports the walk's fixes green and asks for it.
3. Knowledge v3.13 (C2's exception, D247): paste the text the supervisor delivers.
4. The migrations that wait for him: D242's tier control; N1b-1 M3's proof fix (INC-999); the locale work's SQL part.

## 5. Open questions and owners

- INC-1013 (proof by the flake ledger over the ten runs after `aed7904b`), INC-1014 (a watch, one run in ten) and INC-1018 (a watch on Docker Hub's pull limit) — supervisor.
- The ruling-scope class rule (S493 → S495): in force since 2026-10-30, owed to instructions v1.17 — supervisor.
- INC-1006's class census and the guard debts of blocks S82 → S84 — roadmap.

## 6. Next planned action

- Turn P1: the Sage spec imported and redesign Part 2's plan, ruled by the supervisor (G60); then Part 2's build in ordered parts (tokens, theme data and resolver first — D250), one walk at its end, Cursor's pilot turns among them. After two Cursor turns the pilot is judged by DEC-303's rule.
- Then the speed work and the rest of the Foundations bundle; then bundle 23.
