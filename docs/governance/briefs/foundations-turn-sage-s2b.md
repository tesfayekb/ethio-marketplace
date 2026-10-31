```text
RULING — turn S2b: the lint baseline (INC-1025) first, then the operator's two bar notes, D265 and D266. Base: dev 0a16eed0. Tier B (the shell on every page). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-sage-s2b.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-sage-s2b.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

D2 VERIFIED (dev 0a16eed0, fresh clone): step 0's sha256 9ce7fed0… matches; the route, the rpc fallback and the console read get_ui_bundle_parts; overlayBundle is the one merge, with CF-I18N-OVERLAY and its planted cases; the ETag carries `parts1.`; OVB-1…11, I18B-5 and TRS-B1; IB-1 and IB-2 changed under G38; TR-40 covers the sync path; the roadmap retire line; checks 34 PASS · 0 FAIL; unit 2,373. CLEAN pending CI on 0a16eed0. One correction to your CI line: on b3e8dba2 the smoke lane's backend did start; its database-security-lints step failed (item 1).

CI FIRST: read the run on 0a16eed0 (it may still be running; read it again before your push). Any red is fixed first, from its failure body. A lane whose backend did not start on the registry's rate limit is infrastructure, and the CI turn fixes it.

1. INC-1025, first. On b3e8dba2 the smoke lane failed "function_executable_by_anon 20 is above its baseline 19" (DEC-240), because D1's get_ui_bundle_parts is anon-callable by ruling.
   - scripts/security-lints-baseline.json moves 19 → 20.
   - Its reason (get_ui_bundle_parts, INC-1023, turn D1) goes where the baseline's changes are recorded, in docs/features/security-scanning.md.
   - The class fix, one list for the public surface, comes in the CI turn, not here.

2. D265, the operator's words (2026-10-30 21:52 New York): "the panel selection once logged in in large screen top has differnt style than the location selection and it should have the same. like the location selection with active selection showing same as the active location selected, should be same for breadcrumb."
   - CONCERN: one item look for the three band rows. The panel tabs, the breadcrumb and the location row show their items as the location row does: in one pressed-in track, with the active or current item raised.
   - MECHANISM: band-row.ts gains the shared constants, read by all three:
     - the track: `bg-track`, `rounded-track`, its padding and `shadow-track`, today at location-selector.tsx :275;
     - the segment: `rounded-segment`, its padding and text, today at :83;
     - the raised segment: `bg-card shadow-segment font-semibold text-nav-ink`, today at :86.
   - CONSUMERS (census first, by definition, file:line):
     - location-selector.tsx;
     - panel-tabs.tsx: the current tab becomes the raised segment;
     - breadcrumbs.tsx's `CURRENT`, the current page's crumb, and every crumb trail that renders in the breadcrumb row (ad-crumbs, seller-crumbs, admin-detail-crumbs and any other the census finds): the crumbs sit in the track as segments, the current page's crumb raised, the separators kept.
   - Nothing else moves. CURRENT_PILL stays for the phone's bottom bar only.
   - Truncation and the labels' room (D105) hold. At 360 px, in English and Amharic, a deep crumb trail stays on one line within the 40 px row.

3. D266, the operator's words (21:52): "you made "marketplace that has [anel switcher at top of the left menu in large screen look like its part of the bar after top bar. I am glad the height is same, but it should look and feel as if its part of the left side bar with the line dividing that and the main body items".
   - This reverses the supervisor's P-S7 ruling of S1; the operator's later decision governs.
   - CONCERN: the panel header belongs to the left menu. It takes the rail's surface (`bg-sidebar`, as the rail and its side panels) and keeps BAND_ROW's 40 px, so it still lines up with the band rows across from it (D258). One divider, the groove (`--lift-groove`, as D261), separates it from the menu items below.
   - Its label style (§2: 12 px, bold, uppercase, 1.2 px) and its switch are unchanged. This holds in its compact form too.
   - The mechanism: one rail-header constant beside the rail's own look (menu-row.ts or band-row.ts, your call, one place). CF-BAND-1's census treats the panel header as the rail's header by definition: it reads BAND_ROW for its height and the rail-header constant for its look, with no allowlist line.

TESTS
- SGB cases at 834 and 1440 px, light and dark, signed in:
  - the current panel tab's and the current crumb's computed background, shadow and colour equal the location row's chosen segment;
  - each sits in a track that equals the location track;
  - the panel header's surface equals the rail's;
  - the groove sits at its bottom edge;
  - its height equals the band rows'.
- The 360 px one-line case for crumbs in both languages.
- G38, each named with its old and new assertion:
  - SGB-1 (the panel header leaves the band look, D266);
  - SGB-5 (the current tab's pill becomes the raised segment, D265);
  - any breadcrumb or tab test asserting the old look.
- The touched spec files whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses turn A's NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- src/components/shell/band-row.ts, location-selector.tsx, panel-tabs.tsx, panel-header.tsx, menu-row.ts (the rail-header constant only), breadcrumbs.tsx and every crumb file the census finds, each with its tests;
- scripts/conformance/shell-bands.test.ts and the menu-rows census for the rail header;
- scripts/security-lints-baseline.json and docs/features/security-scanning.md (item 1);
- e2e/sage-bands.spec.ts and any spec asserting a changed tab or crumb look;
- scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings;
- the standing docs allowance.

`bun run checks` once on the final tree, run whole, with its last line pasted (no FAIL), and the unit count.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-sage-s2b.report.md:
- step 0's sha256;
- the CI line, with any red classified;
- item 1;
- the census as built (each consumer before and after);
- the rail header and CF-BAND-1's definition;
- every test changed under G38, with its old and new value;
- the growth table (JS per page and the stylesheet) with causes;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 0a16eed0.
```
