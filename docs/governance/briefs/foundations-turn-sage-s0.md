```text
RULING — redesign Part 2, turn SAGE-S0: the plan approved with six rulings, then its first part built — the tokens (light and dark), themes as data, the resolver, the pre-paint script, CF-LOOK-1 and the /dev/style grid. Base: dev 50eb7468. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s0.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s0.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

P1 VERIFIED (dev 50eb7468, fresh clone): step 0's sha256 44dd8d9a… matches; the four files equal EXPECTED; BND-E1 waits for the panel tabs and no assertion changed (8 passed, 8 skipped by project); checks 34 PASS · 0 FAIL; the side branches are the known eleven; CI on 50eb7468 SUCCESS (run 41106419359, 0 flaky) and main promoted. The plan (docs/governance/plans/redesign-part-2.md) is sound, and its four premises P-1 to P-4 are right. CLEAN.

THE PLAN'S RULINGS (the supervisor, under G17; overridable)
1. The walk's tiers: no SQL on any database for the walk. The Lovable preview and the published site read ethio-prod, so rows marked on ethio-staging would not show there, and real listings stay untiered until D242's control. The operator sees the three card types on /dev/style's fixture grid (theme × mode × tier, fixture data only), which S0 starts and S4 completes.
2. S7 folds into S0: the light and the dark Sage sets land together (one token module, one contrast run per theme and mode), and every later part proves its surfaces in both modes. The parts are S0 to S6.
3. The shared ribbon and flag drawing (S4) is rendered by the pages that show cards (the feed, the ad page, similar ads), once per page; the shell does not carry it, and a page without cards carries none of its bytes.
4. CF-LOOK-1 enumerates by definition across src/ (.ts and .tsx, tests excluded): every Tailwind arbitrary value for colour, shadow, radius or font (`bg-[`, `text-[#`, `border-[`, `ring-[`, `fill-[`, `stroke-[`, `shadow-[`, `rounded-…[`, `font-[`) and every raw hex, rgb(), hsl() or oklch() literal outside src/styles.css. Where an existing guard already covers part of this (styles.tokens.test.ts :102, look-law.test.ts), CF-LOOK-1 extends it, never a second copy (K1). My grep at 50eb7468 found, beside the plan's P-4 pair: src/components/ui/sidebar.tsx:510 (`shadow-[0_0_0_1px_var(--sidebar-border)]`), src/components/shell/bottom-bar.tsx:81 (`rounded-t-[1rem]`, §11's 18 px becomes a token in S1), src/components/shell/app-rail.tsx:1135 (`rounded-e-[1rem]`), src/components/ui/drawer.tsx:42 (`rounded-t-[10px]`), src/components/ui/chart.tsx:193 and :283 (`rounded-[2px]`). The census reads code, not comments (`#185` in a comment is React's error number). Widths and sizes (`ring-[3px]`, `border-[1.5px]`) are not looks and are not covered; `rounded-[inherit]` is not a value. Values that never reach the stylesheet are allowlist lines with their reason — the product colour swatches a seller picks (colour-swatches.ts), the static error page served without the stylesheet (error-page.ts), colours burned into raster files (brand-mark.ts's watermark, category-image-variants.ts's background, photo-background.ts), the AI picture prompt's palette (server/ai/tasks.ts), the map's and the chart's drawing colours, the crop mask; where the same brand value repeats across them (#1E5A43 in brand-mark.ts and tasks.ts), name it under K2. Your census is the authority; each site it finds is either fixed here or an allowlist line `key | reason | until`, its until the part or INC that fixes it, or a review date for a lasting exception (the house's form, as in ai-gateway-allowlist.txt).
5. S1 and S2 (the shell and the band rows) may be one turn: your call at S1's plan check; stop at a clean point if the platform's time nears.
6. The executor of each later part is chosen when it is sent: Cursor's pilot turns start with the first part after the operator's cloud setup; until then you build.

THE SYSTEM (G0) — part S0
- CONCERN: one look — every colour, shadow, radius and type value comes from tokens, and a theme is data.
- MECHANISM: src/styles.css's tokens (:root, .dark) with src/styles.tokens.test.ts; src/providers/theme-provider.tsx (THEME_INIT_SCRIPT, applyMode, the `ethio.theme` key), extended — never a second script or key (P-1). NEW: src/lib/themes.ts (the built-in themes as data), src/lib/schemas/theme.ts (its strict shape), src/lib/theme-resolver.ts (the order shop → account → device → system).
- CONSUMERS: every surface that reads a token (unchanged in this part, except the values); the pre-paint script and its one caller (src/routes/__root.tsx :26 import, :380 inline); the tests that assert a token's value (plan §1, §7: e2e/helpers/colors.ts, house-style, layout and others — grep them for each value you change).
- CONFORMANCE GUARDS: the contrast test per theme and mode; a unit test that every THEMES.sage value equals its :root or .dark value; CF-LOOK-1 (ruling 4), proven on a planted bypass, wired in scripts/conformance/wired.test.ts.
- FIVE LENSES — security: a theme is validated token data, never raw CSS; an unknown or malformed stored value is ignored. Performance: tokens and a few lines of script only, no new download; growth per page named. Failure: an unknown, removed or malformed stored value falls through the order to the next source — the designed path, not an error, so no `[client-error]` line; a failed account read is unknown, never "system" (D239's rule), and the device's value stands. Consistency: one source per value, light and dark. Growth: account, shop and staff themes later take the resolver by data and by `[data-theme]` scope.

PART S0 — what is true at the end
- src/styles.css holds the spec's light set (§ Design tokens: colours, the green-tinted shadows of R1, the radii) and the Sage dark set (§13), in oklch as the file requires, each registered where the file registers tokens; the tier tokens (§7, §12, §13) and the band set D260 needs are defined, though no component reads them yet.
- THEMES = { sage: { light, dark } } in src/lib/themes.ts, validated by the strict schema; DEFAULT_THEME = "sage"; a unit test proves every value equals the CSS.
- The resolver: shop → account → device → system; an unknown name falls through; tests for the order, an unknown name, a removed name and a failed account read.
- THEME_INIT_SCRIPT and the provider store `{name, mode}` under `ethio.theme`; a legacy bare "light" or "dark" reads as `{sage, <mode>}`; the script sets `data-theme` and `data-mode` and toggles `.dark`, before the first paint. A test covers the legacy value and a malformed one.
- The contrast test runs today's pairs and the spec's acceptance pairs (its last section) for every theme × mode in THEMES; WCAG 2.2 AA, 4.5 : 1 for text.
- /dev/style shows a grid per mode of fixture cards — regular, Featured, Premium — and the token swatches, with fixture data only (ruling 1); S4 completes the cards.
- CF-LOOK-1 per ruling 4.
- Every existing test that asserts a token value this part changes is updated to the new value and named in the report with its old and new value (G38); no assertion is loosened.

TESTS: the new unit tests; styles.tokens.test.ts; the touched spec files whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges. The growth per page is reported with its cause; a page that grows by more than 1 KiB, or grows without a named cause, is a STOP.

SCOPE (by area): src/styles.css and src/styles.tokens.test.ts; src/lib/themes.ts, src/lib/schemas/theme.ts, src/lib/theme-resolver.ts and their tests; src/providers/theme-provider.tsx and its tests; src/routes/__root.tsx (the script's caller only); src/routes/dev.style.tsx; scripts/conformance/** (CF-LOOK-1, its allowlist, wired.test.ts); the specs and e2e helpers that assert a changed token value; scripts/route-budgets.mjs only for a named cause; the standing docs allowance (docs/features/, the register row in docs/governance/mechanisms.md, one docs/_changelog.md line).

CI FIRST: the run on 50eb7468 is SUCCESS (41106419359) and main is promoted; P1 fixed d5b48d71's format red (INC-1019). Read CI as usual at the raw addresses in HOW TO WORK; a red that appears is fixed first, from its failure body.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, run whole, with its last line pasted (no FAIL), and the unit suite's full count. CI is read at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-sage-s0.report.md:
- step 0's sha256;
- the CI line you read first, with any red classified;
- the census (files and tests per item; the sites CF-LOOK-1 found and what became of each);
- what is true at the end, item by item, with its tests;
- every test changed under G38, with its old and new value;
- the growth table per page, with causes;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 50eb7468.
```
