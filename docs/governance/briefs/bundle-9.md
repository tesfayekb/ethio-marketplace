# Bundle 9 — the house style: brief, version 1 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 1 (2026-10-08). One look for every page, as the operator agreed it on 2026-10-07 (roadmap.md, the block "Bundle 9 — the house style"). Tier B (shared look; no database change in the whole bundle; no migration in any turn). THIS VERSION SPECIFIES TURN 1 ONLY: step 0, step T0 and PART A — the tokens and their first uses. Parts B to E are NAMED at the end; the supervisor replaces this file with version 2 (Part B) while turn 1 runs — if version 2 has not arrived when turn 1 is done, END THE TURN with the report; do not start a part this file does not specify.
Line numbers are as of commit c46aa32b (dev). This file is public: it is written as build instructions.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte as docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first.
- roadmap.md line 3 becomes exactly: `Bundle 9 brief: docs/governance/briefs/bundle-9.md (read first every turn).` In the block `### Bundle 9 — the house style …` tick a line only in the turn whose report says it landed with its tests (turn 1 ticks none: the first line is finished by Part D).

HOW TO WORK
- Order of the turn: step 0; T0; Part A (A1 to A6) with its tests; push; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer or the end. If the platform ends the turn early, stop at a clean point (typecheck, format:check, lint and every spec file you touched green), report three lines — done, left, CI — and the operator sends "continue".
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md. The run on c46aa32 (a documents-only commit) may still be going or may be cancelled by your first push — say which you see and go on. A red that is not a cancelled run is named in your report's first lines and fixed first.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- Local runs (G37): every spec file you changed or added, run whole, alone, both projects where the configuration runs it in both, 2 workers, 0 retries, fake mode — and, because a token reaches every screen, these three whole as well: e2e/a11y.spec.ts, e2e/primitives-law.spec.ts, e2e/shell.spec.ts. "A file that is not fully green is not committed." CI on the turn's final commit is the full proof; a local run never writes "CI green". Unit tests (vitest) run whole.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. If a test fails because it asserts the OLD look (a colour, a corner, a shadow), do not edit it: name it in the report with its line and what it asserts, and leave that test red — the supervisor rules on it.
- No migration, no database write, no package change (name a platform bump in your first lines and leave it), no new dependency, no user-facing string: the one new page is a fixture page whose labels are fixture data, written as the existing fixture page writes them (src/routes/dev.primitives.tsx: string literals in braces; its head block). The hardcoded-string scan reads the new file: every fixture label is written as `{"…"}`, and no `title=`, `label=`, `placeholder=`, `alt=` or `aria-label=` carries a literal string — a control that needs a name takes it from a key that already exists.
- Colours: every colour this turn adds is a token of src/styles.css in oklch, with the values of the table below, copied character for character. No palette class (text-amber-600 …), no hex and no rgb() in a component. The palette classes that exist today (text-amber-…, border-amber-…, text-emerald-… in src/features/admin-attributes/attributes-page.tsx, attribute-dialogs.tsx and category-attributes-dialog.tsx, src/features/admin-categories/categories-page.tsx and src/components/shell/stat-card.tsx) are NOT touched in this turn (Part D moves them).
- Scope: only the files a step names, plus the generated files the scripts regenerate (src/routeTree.gen.ts for the new route; docs/generated/i18n-usage.json and public/i18n-usage.json if the scan rewrites them). A file you create outside a step's list is named in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter and the migration check are not touched. e2e/global-setup.ts is touched by T0 only, as written.
- Records: you write the changelog lines; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: push, END THE TURN, send nothing after it.

T0 — THE ENGLISH RESET PRINTS HOW LONG IT TOOK (owed from the last turn; DEC-160's rule reads it)
- e2e/global-setup.ts, the block `EN BASELINE HEAL, IN EVERY SETUP` (:502–560): measure the block with performance.now() from its first statement to just before its console.log, and print the duration inside the same line, which becomes `[e2e:setup] healed <n> stale EN rows (INC-175; probe complete; <ms> ms)` — and `(INC-175; probe INCOMPLETE: <message>; <ms> ms)`. Nothing else in the block changes. docs/features/e2e-harness.md: the line's new form, where the line is quoted.
- Report the line as each of your local runs of this turn printed it (every run, with its file name). That number is what the rule judges: more than 5,000 ms in any run is reported in your first lines.

PART A — THE TOKENS AND THEIR FIRST USES
A1 — src/styles.css. The values (light hex = oklch · dark hex = oklch; the hex is for the comment, the oklch is the value):
  --border                   light #D3D8DF = oklch(0.88 0.011 256.7)        dark #343B43 = oklch(0.349 0.017 251.8)       lines of cards, tables, bars (was #E8EBEF / #262C32)
  --input                    light #C3C9D1 = oklch(0.834 0.013 255.5)       dark #3F4750 = oklch(0.394 0.019 251.4)       the edge of a field or an outline button (was the border value)
  --rule                     light #E4E8ED = oklch(0.929 0.008 253.9)       dark #262C32 = oklch(0.29 0.014 248.3)        NEW — the fine line between two rows of a table or list
  --muted-foreground         light #4A515A = oklch(0.432 0.017 254.7)       dark #A3ABB3 = oklch(0.737 0.015 248)         secondary text (was #686F78 / #8A9299)
  --destructive              light #B42318 = oklch(0.5 0.182 29.5)          dark #FF6467 = oklch(0.702 0.189 22.2)        danger: delete, remove, a refusal (light was a brighter red; dark unchanged)
  --destructive-foreground   light #FFFFFF = oklch(1 0 89.9)                dark #1F0A08 = oklch(0.178 0.037 27.4)        text on a solid danger fill (dark was #E6E8EB — 2.35:1 on the fill; INC-496)
  --destructive-soft         light #FDECEA = oklch(0.956 0.019 25.6)        dark #3A1C1A = oklch(0.268 0.048 24.7)        NEW — tinted danger surface
  --destructive-line         light #F3C1BC = oklch(0.854 0.058 25)          dark #5E2B27 = oklch(0.358 0.075 26.1)        NEW — tinted danger edge
  --success                  light #17503A = oklch(0.388 0.07 163.8)        dark #7FC9A6 = oklch(0.777 0.09 162.9)        NEW — done, active, approved
  --success-soft             light #E3F1EA = oklch(0.946 0.017 164.7)       dark #1C2B24 = oklch(0.273 0.024 164.2)       NEW
  --success-line             light #B9DCCB = oklch(0.864 0.044 164.5)       dark #2E4A3C = oklch(0.382 0.042 161.8)       NEW
  --warning                  light #7A4E00 = oklch(0.462 0.099 72.2)        dark #E6B655 = oklch(0.801 0.127 82.7)        NEW — paused, needs attention
  --warning-soft             light #FFF3D6 = oklch(0.966 0.04 88.2)         dark #2D2513 = oklch(0.268 0.032 86.3)        NEW
  --warning-line             light #EDD49A = oklch(0.877 0.08 87.3)         dark #4F4020 = oklch(0.379 0.052 84.8)        NEW
  --info                     light #1D4E89 = oklch(0.423 0.111 255.1)       dark #8DB8EA = oklch(0.77 0.086 252.6)        NEW — information, a link-like action
  --info-soft                light #E6F0FB = oklch(0.951 0.018 250.6)       dark #17253A = oklch(0.263 0.044 258.3)       NEW
  --info-line                light #BBD3EF = oklch(0.858 0.047 252.4)       dark #2A4366 = oklch(0.38 0.068 257)          NEW
  --neutral                  light #3B424A = oklch(0.376 0.017 251.8)       dark #C5CBD1 = oklch(0.839 0.011 248)         NEW — draft, off, nothing to say
  --neutral-soft             light #EEF1F4 = oklch(0.957 0.005 247.9)       dark #262C32 = oklch(0.29 0.014 248.3)        NEW
(a) `:root` (from :105) and `.dark` (from :146): set the lines that exist and add the lines marked NEW, each `--name: oklch(…); /* #HEX */` in the file's own style. `--sidebar-border` takes the same value as `--border` in both blocks. `.dark`'s `--destructive` line is left exactly as it is.
(b) `:root`: `--radius: 0.375rem;` (it is 0.625rem).
(c) `@theme inline` (from :52): the first five radius lines become
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 2px);
  --radius-2xl: calc(var(--radius) + 6px);
(3xl and 4xl stay). So one corner — 6 px — for controls (rounded-md, 177 uses) and for cards and tables (rounded-lg), 4 px for small marks, 8 px for the two large surfaces.
(d) `@theme inline`: register every NEW token as a colour, in the block's own form — `--color-rule: var(--rule);`, `--color-destructive-soft: var(--destructive-soft);`, `--color-destructive-line: var(--destructive-line);`, and the same three lines for success, warning and info (`--color-success`, `--color-success-soft`, `--color-success-line` …), and `--color-neutral`, `--color-neutral-soft`.
(e) `@theme inline`: the shadow scale, so that every existing shadow class follows at once —
  --shadow-2xs: 0 1px rgb(30 35 41 / 0.05);
  --shadow-xs: 0 1px 2px rgb(30 35 41 / 0.06);
  --shadow-sm: 0 1px 2px rgb(30 35 41 / 0.07), 0 1px 1px rgb(30 35 41 / 0.04);
  --shadow: 0 1px 2px rgb(30 35 41 / 0.07), 0 1px 1px rgb(30 35 41 / 0.04);
  --shadow-md: 0 8px 20px rgb(30 35 41 / 0.14);
  --shadow-lg: 0 12px 28px rgb(30 35 41 / 0.18);
  --shadow-card: 0 1px 2px rgb(30 35 41 / 0.07), 0 1px 1px rgb(30 35 41 / 0.04);
  --shadow-button: inset 0 -1px 0 rgb(0 0 0 / 0.18), 0 1px 2px rgb(30 35 41 / 0.14);
  --shadow-bar: 0 1px 2px rgb(30 35 41 / 0.06);
  --shadow-bar-up: 0 -1px 2px rgb(30 35 41 / 0.06);
(shadows are an exception to "oklch only": they are black or the foreground at an alpha; say so in the file's comment.) Meaning: xs, sm and the bare shadow are the soft shadow of a card or a field; md is a menu or a popover; lg is a dialog or a sheet; `shadow-card`, `shadow-button`, `shadow-bar` and `shadow-bar-up` are the named ones the shared blocks use. If the build shows that a bare `shadow` class does not follow `--shadow`, say so in the report with the compiled rule you saw, and leave it.
(f) The header comment of the file: its WCAG list gains the pairs of the table "CONTRAST" below (light and dark), the stance line "Flat surfaces only" gains "soft shadows are allowed; images and gradients are not", and "To add a new semantic color" gains: a meaning has three tokens — the strong colour (text, icon, solid fill), `-soft` (a tinted surface) and `-line` (a tinted edge).
CONTRAST (computed from the hexes; the unit test of A4 recomputes them from the file):
  muted-foreground on background               light  7.49:1   dark  7.67:1
  muted-foreground on card                     light  8.03:1   dark  7.14:1
  destructive on card                          light  6.57:1   dark  5.75:1
  destructive on destructive-soft              light  5.75:1   dark  5.34:1
  destructive-foreground on destructive        light  6.57:1   dark  6.58:1
  success on card                              light  9.35:1   dark  8.54:1
  success on success-soft                      light  8.03:1   dark  7.61:1
  warning on card                              light  7.20:1   dark  8.84:1
  warning on warning-soft                      light  6.53:1   dark  8.07:1
  info on card                                 light  8.39:1   dark  8.04:1
  info on info-soft                            light  7.28:1   dark  7.47:1
  neutral on card                              light 10.17:1   dark 10.14:1
  neutral on neutral-soft                      light  8.97:1   dark  8.62:1
A2 — THE FIRST USES (four files, class changes only):
- src/components/shell/page-card.tsx :5 — PAGE_CARD_CLASS gains `shadow-card`.
- src/components/layout/section.tsx :27 — the section's class gains `shadow-card`.
- src/components/ui/button.tsx :12–13 — variant `default`: `shadow` becomes `shadow-button`; variant `destructive`: `shadow-sm` becomes `shadow-button`. Nothing else in the file.
- src/components/ui/badge.tsx — FIVE variants are added beside the four that exist (none is removed or changed): `success: "border-success-line bg-success-soft text-success"`, `warning: "border-warning-line bg-warning-soft text-warning"`, `info: "border-info-line bg-info-soft text-info"`, `danger: "border-destructive-line bg-destructive-soft text-destructive"`, `neutral: "border-border bg-neutral-soft text-neutral"`.
A3 — THE STYLE FIXTURE PAGE, src/routes/dev.style.tsx (new; route /dev/style; modelled on src/routes/dev.primitives.tsx: production-safe, no data access, no writes, noindex; its strings are fixture data). It shows, inside PageShell and Section, each under a heading: (1) for each of the five meanings a row of three swatches — the soft surface with its line as a border and a word in the strong colour on it; the strong colour as a solid fill with white or `destructive-foreground` text where a foreground exists (primary and destructive only); the strong colour as text on the card; (2) the five new Badge variants and the four old ones; (3) the six Button variants at sizes default and touch; (4) one Section (the card shadow), one open DropdownMenu trigger and one Dialog trigger (the menu and dialog shadows); (5) four boxes with rounded-sm, rounded-md, rounded-lg, rounded-xl; (6) one line of secondary text (`text-muted-foreground`) on the page and one on a card. Test ids: `style-meaning-<name>`, `style-badge-<variant>`, `style-radius-<size>`. The existing page /dev/primitives is NOT changed.
A4 — THE CHECKS.
- src/styles.tokens.test.ts (new, vitest): reads src/styles.css as text; parses the custom properties of `:root` and of `.dark`; converts oklch to sRGB (the standard OKLab matrices) and computes WCAG contrast; asserts, in BOTH modes, at least 4.5:1 for every pair of the CONTRAST table above (a value a mode does not declare is taken from `:root` only if the file itself does so — it does not: every token of the table is declared in both); asserts that every `--color-<name>: var(--<name>)` of `@theme inline` has `--<name>` declared in `:root` AND in `.dark`; asserts that no colour value in the two blocks is written as hex or rgb (comments are not values). A pair that fails prints its two colours and the ratio.
- e2e/house-style.spec.ts (new; both projects): HS-1 — /dev/style at this project's width has no horizontal overflow (the page's scroll width is not greater than its client width) and shows the five `style-badge-` test ids of the new variants; HS-2 — axe-core on /dev/style (the builder as e2e/a11y.spec.ts :1–40 uses it) finds no serious and no critical violation in light mode, then after the theme toggle (`en["shell.themeToggle"]`, as e2e/shell.spec.ts :786–794) none in dark mode. No account, no seeded row.
A5 — DOCS. docs/features/design-foundation.md: the palette section gains the token table (name, light, dark, meaning), the three-tokens-per-meaning rule, the corner rule (6 px for controls, cards and tables; 4 px small marks; 8 px large surfaces), the shadow rule (soft on cards, tables and figures; `shadow-button` on a primary or danger button; md on menus, lg on dialogs; the bar shadows are used by the frame in a later part) and "secondary text is `text-muted-foreground`". One changelog line.
A6 — WHAT IS NOT DONE IN THIS TURN (so that nothing is half-moved): no screen is moved to the new badges or tokens; the table, the row actions, the frame, paddings and heights are untouched; no existing class is renamed.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- PART B — the shared blocks: row actions (Edit and Delete icons, a three-dots menu), the icon button with a required name and tooltip, the table's toolbar, chips, selection bar and three-zone footer, cards on a phone, the field and the switch.
- PART C — the frame: bars that stay on every screen size, the phone's icon strip and bottom bar, one page padding, row heights.
- PART D — the pattern console (Admin › Categories), then every other screen.
- PART E — one written rule and one automatic check per element, with a baseline that only shrinks.

REPORT. First lines: done or not done for step 0, T0, A1 (a) to (f), A2, A3, A4, A5; any platform bump; any file outside this brief's lists; any test left red because it asserts the old look (file, line, what it asserts). Then: the six ci-status lines; T0's printed lines; the unit suite (count) with the token test's pairs as it printed them; each local browser run (file, project, passed/failed, retries); typecheck, format:check, lint; whether a bare `shadow` class follows `--shadow` in the built CSS; the file list from `git diff --name-only c46aa32b`; "Logs read: … · unavailable: …"; limitations. Never "CI green" from a local run.
```
