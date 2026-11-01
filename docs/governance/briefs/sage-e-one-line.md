# Turn E — one line at 360 (the task)

```text
Task: sage-e-one-line. Base: dev c21ec7552. PLAN FIRST: read, census and plan; change nothing until the operator pastes the supervisor's ruling on your plan.

Turn E: every line that must stay on one line fits at 360 px in every public language, in every platform's own font (INC-957's class). Tier B (every screen with a one-line slot). No migration, no new dependency. New strings only if the plan shows a text must be shortened; the supervisor then gives the text.

THE SOURCES (read whole before planning):
- docs/tracking/incidental-findings.md INC-957 and its later words: since DEC-262 (no page downloads a font) Ge'ez text falls to the device's own face — Kefa on Apple devices (about 10 % wider), Noto Sans Ethiopic on Android and in CI's Linux Chromium — so a line that fits in CI can wrap on an iPhone; the instance (the Home heading) was fixed in turn C1 (DEC-281); the CLASS is open: "a census of the single-line slots at 360 in every language and platform font, and/or a wider Ethiopic test font in CI".
- roadmap.md line 626 (the open line).
- docs/governance/mechanisms.md: ONE_LINE_SLOT / OneLineSlot (src/components/ui/one-line-slot.tsx, CF-ONE-LINE-1: a sentence with one slot stays on one line, only the slot cuts); CutText (cut names); useLabelRoom (a crowded row measures its room); the action-label law (AGENTS.md: two or three words in every language).
- docs/features/design-foundation.md (Sage S3's heading; the bands; the bottom bar's labels; the tier word of S4).
- e2e/sage-cards.spec.ts OL-1 (the heading checked for every public language, read from the app) — the pattern a class-wide check extends.

THE SYSTEM (G0) your plan must answer:
- CONCERN: a one-line slot (a heading, a band label, a bottom-bar label, a tab, a button label, a tier word, a place line, a chip) never wraps or overflows at 360 px in any public language, on the widest platform font the site meets. Name every one-line slot by DEFINITION (nowrap, truncate, a fixed single-line height, a CutText or OneLineSlot, an action label), file:line, across src/ — marked "measured by a test" or "not measured".
- MECHANISM: how a slot declares itself one-line (the existing primitives; a shared class or attribute if the census shows bare `whitespace-nowrap` / `truncate` scattered in screens), and how the widest font is represented in CI: the plan weighs (a) a wider Ethiopic test font installed in the E2E build only (its licence and size; which font approximates Kefa; never downloaded by the site), (b) a measured width margin (every slot proven with room to spare at Noto's widths), or (c) a per-language longest-string census at build time. Recommend one, with its cost.
- GUARD: a test that reads every public language's text for every one-line slot at 360 and fails on a wrap or an overflow; planted red. The census guard for scattered nowrap/truncate if the plan introduces a shared declaration.

PLAN WITH: the census (every slot, file:line, measured or not); the mechanism and the font choice; the guard; the tests (the class-wide spec at 360, both themes, every public language read from the app; G38 named old → new; no assertion loosened); the strings the plan finds too long in any language (file:key, the language, the measured overflow), for the supervisor to rule on — never shortened by you; growth per page (DEC-296's form); one pull request or two.

SCOPE (by area; your plan names the files): src/components/ui/ (one-line-slot.tsx, cut-text.tsx, use-label-room.ts) and their tests; the screens the census names, each with its tests; src/i18n/locales/ only for strings the supervisor rules on; e2e/ (the new spec, OL-1's spec, the G38 specs) and e2e/helpers/; playwright.config.ts and the E2E build only if a test font is chosen (never src/styles.css's font stack — DEC-262 holds); scripts/conformance/ and allowlists; scripts/e2e-select.ts; scripts/route-budgets.mjs, scripts/check-bundle-size.mjs; docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope. .github/workflows/** is not in scope: if a test font needs a CI install step, STOP with the exact step; it goes to Lovable or the supervisor.
```

# Ruling on the plan (as pasted by the operator)

```text
RULING on the E plan. Base: dev c21ec755. Approved as one pull request.
1. The Ge'ez factor is 1.22, not 1.20: the judge covers the measured maximum (1.212), and the one string 1.22 would false-fail is the one ruling 2 replaces. No test font. Latin measured in the runner's own font, as you propose. Record the measured ratios in the report, so the factor can be re-judged when a new string arrives.
2. "Seller Centre" stays the panel's name (panel.myListings, every other place). The bottom bar takes its own short label, as the Post button does (nav.postShort): a new key panel.myListingsShort — en "Sell", am "ሽያጭ" — used by the bottom bar only. Copy both by key, character for character; list them in the report's strings section. The operator may override the words; say so in the report.
3. Confirmed: the admin tables in the second spec, one line with the ellipsis allowed; the everywhere heading declared one line; bare truncate cells reported (K2), not moved.
K2 filed from your census: the bare truncate cells (33 places) and the unmeasured phone slots that fit today (tier word at 360, Sold badge, place line); the evidence files' commit field naming a commit not in the clone (612469b7) is a reporter finding for the supervisor.
```
