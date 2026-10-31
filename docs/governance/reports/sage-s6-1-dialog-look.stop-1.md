STOP — sage-s6-1-dialog-look part A (the dialog tokens): a file outside scope, src/lib/schemas/theme.ts
DONE: steps 1 (orient) and 2 (record: the brief saved, roadmap line 3, task 0's nine rule files unchanged — commit b22aa0a03); no part started, no source file changed
LEFT: parts A (tokens in styles.css and themes.ts), B (dialog-look.ts; CONTROL_LOOK and SEARCH_FIELD out of app-header.tsx), C (LIST_CHOICE_ON and the wrapping row in menu-row.ts), D (dialog.tsx, alert-dialog.tsx and sheet.tsx rebuilt; the layer prop through layers.ts), E (the field look on Input, Textarea and NativeSelect), F (the census consumers moved; category-dialogs.tsx's `as unknown as`), G (the eight files retired), H (CF-DIALOG-1 and CF-OV-4), I (/dev/style specimens and e2e/dialogs.spec.ts), J (docs); then THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT, the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `04fee7576e6146644bfc2a1059a063aefae5a41a` (short `04fee75`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-31T18:57:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41230127440
FILES:
.cursor/rules/00-protocol.mdc
.cursor/rules/10-code-laws.mdc
.cursor/rules/12-ui.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/40-ci-evidence.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
docs/governance/briefs/sage-s6-1-dialog-look.md
roadmap.md
docs/governance/reports/sage-s6-1-dialog-look.stop-1.md

Rule 00, Scope (A1): "A file you need that your scope does not cover is a STOP naming the file and why."

The file: src/lib/schemas/theme.ts. The scope names "src/styles.css, src/lib/themes.ts and their tests"; it does not name the theme's shape, and my plan did not name it either (my census missed it).

Why it is needed: part A adds four moded tokens to :root and .dark — --scrim, --lift-dialog, --lift-rule-top and --lift-choice-on (their light and dark values differ: the light drops are tinted with the page green, the dark ones are black, D262). themes.test.ts TH-2 requires every :root and .dark token to appear in THEMES.sage, name by name, both ways; THEMES.sage is typed and parsed by ThemeSet, which is `.strict()` over MODED_TOKENS (src/lib/schemas/theme.ts:12–110), so each new name must be added to that list or TH-3 fails. The change is four lines in MODED_TOKENS and nothing else: the existing grammars already accept the values (scrim is an oklch() colour with an alpha; the three lifts are shadow lists, the choice ring a `var(--primary)` layer). --radius-dialog needs no theme line: it sits in @theme beside --radius-menu and --radius-list-row.

QUESTION: may src/lib/schemas/theme.ts join S6-1's scope for those four MODED_TOKENS names?
The alternative inside scope, which I do not recommend: write the dialog's light and dark values in @theme as fixed pairs read with `dark:` variants. That keeps them out of the theme data (D250's one source per value, which a later theme reads), so a second theme could not set them.

Everything else S6-1 touches is inside its scope as ruled: press.test.ts (which names sidebar.tsx) and look-values-allowlist.txt are under scripts/conformance/; check-marketplace-imports.mjs already lists vaul and cmdk and needs no change; notice-outlet.test.ts's vaul branch stays as a guard.

origin/dev is 04fee757, equal to the base.
