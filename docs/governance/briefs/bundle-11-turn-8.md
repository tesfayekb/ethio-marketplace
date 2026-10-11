# Bundle 11 — turn V2: the agreed look for every admin table (D132), the phone's Filters panel (INC-543) and turn B3's fixes for the built pages: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — TURN V2 (2026-10-11). ONE TURN. No migration, no database change, no package change. Three new strings (below).
Base: dev e6ef28be. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO TURN B2
- Verified by diff of 7c3953ae..e6ef28be: the 16 carrier and map paths and the brief, each byte-identical to the supervisor's copy.
- CI on e6ef28be (run 38097283598) is GREEN on attempt 1, and promoted.
  - CO-9 and CT-43 passed, so INC-539 and INC-541 are fixed.
  - One flaky line: LS-7, "seeding region failed: duplicate key … locations_iso_3166_2_unique". The scratch region's code had only 676 values, so two runs could draw the same one; part 6 below widens it.

THE OPERATOR'S WALK OF TURNS B1 AND B2 (on a phone, 2026-10-11) — "fix those first and re-walk"
- On a phone, Filters opened, but the Status dropdown inside it would not open (INC-543). On a wide screen it worked.
- A card put each column on its own line; nothing sat left or right, so a row took several lines.
- Few icons: Filters, Export, Import and the rest took a lot of room; the Columns choice was hard to find.
- The agreed Filament boards were not followed; the styling (depth, shadows, borders, brightness) needs to be appealing and uncluttered, on every table and every page.
- The operator then approved the v2 boards "as drawn, for all": Edit and Delete in the card's footer, depth Soft, page tone Cool grey (D132). This turn builds them, in the shared blocks, so every table gets them.

WHAT THIS TURN BUILDS — PART 1, ONE CARD PER TABLE, ONE CARD PER ROW (src/components/shell/data-table.tsx)
- From the table's breakpoint (`cardUntil`) up, the toolbar, the selection bar, the table and the footer sit inside ONE card. Below it, the toolbar and the footer sit on the page and every row is its own card; between md and lg/xl the cards are two to a row.
- The phone card, as drawn:
  - the name on top, the three-dots in the card's top corner;
  - a muted line under the name;
  - labelled facts (label above value) in a grid, with the state pills at the end of that line (pills that do not fit move under the facts);
  - a footer: a labelled note at its start, Edit and Delete at its end.
- A column says where it sits in the card: `card: "title" | "sub" | "meta" | "badge" | "foot" | "hide"`. Unset, the old priority rule holds (detail out; wide only at xl), the first column is the title and the others are facts.
- `cardCell` gives the card its own value (null leaves the fact out); `cardLead` draws a tinted 36 px icon tile before the name.
- RowActions splits in the card: the three-dots in the corner, Edit and Delete in the footer. Each control keeps its one testid, and the whole card is the row's actions region (`<row>-actions`), so the twin-aware helpers find every control there. Any other actions node sits in the footer as it is. The table keeps all three in its actions cell.
- A cell's tree indent (`data-indent`) is the table's alone; a cell that draws a group of pills in its own flex span joins the card's pill row.
- The table's head is smaller and semibold; row lines are lighter.

PART 2 — THE HEADER AND THE TOOLBAR (table-actions.tsx, table-toolbar.tsx, press-label.tsx NEW)
- `TableActions` takes `title`: the page's one heading leads the header row; the actions follow at its end and move under it when they do not fit.
- `TableActionButton`: one header action — a 44 px icon tile on a phone, icon and words from md. The words stay for screen readers and show under the tile while a finger holds it (`PressLabel`, about half a second; that press does nothing else; a short tap acts as before; a mouse never sees it).
- `TableToolbar` on a phone: the scope (Places' market, Categories' subtree) is a tinted pill on its own line; then the search, a 44 px white box with its magnifier, shares one line with the Filters and Columns tiles. From md, one row inside the table's card.

PART 3 — THE PANELS AND THE FILTERS (toolbar-panel.tsx NEW, filter-choices.tsx NEW, filter-chips.tsx, columns-button.tsx; INC-543)
- `ToolbarPanel`: Filters and Columns open a popover from md and a modal bottom sheet on a phone (a grabber, the panel's name with a 44 px close, the content, a footer). Content testid `<testid>-panel` in both; Escape closes both. A focus change never closes the sheet.
- INC-543 (the Status dropdown on a phone): the native list opened inside the old popover; the hypothesis is that the list took the focus and the popover, which closes when focus leaves it, closed under it. Neither part of that remains: every filter is now a row of pills, and the phone's panel is the modal sheet.
- `FilterChoices`: a labelled row of pills, the chosen one filled with a tick; one tap applies it. Testids `<testid>-<value>`, the empty value `<testid>-all`. Used by Places (level, status), Countries (status), Screening (market) and the /dev/style fixture. Categories' Missing assets is the same one-tap pill.
- `FiltersButton`: a 44 px tile on a phone (its count a small badge on the tile's corner), icon and word from md. Its footer: Clear all (`onClearAll`) and "Show N results" (`resultCount`; without it, "Done").
- `ColumnsButton`: a tile on a phone; one switch per column (the locked one on and greyed); footer Show all and Done.

PART 4 — THE PAGER (DataTablePagination)
- A phone: the count, the page size and two 44 px arrow tiles on one line. The arrows are icons named "Previous" / "Next" (RTL mirrors them). The page run waits for md, where it joins the arrows into one group.

PART 5 — THE LOOK (styles.css, button.tsx, badge.tsx, native-select.tsx, tip-badge.tsx; D132)
- The page tone: `--background` #F3F5F8 (oklch(0.969 0.005 258.3)); foreground on it 14.48:1, muted text 7.35:1.
- Depth Soft: `shadow-card` (a hairline and a short soft drop); new `shadow-tile` (white tiles: outline buttons, toolbar icons, the pager's arrows); `shadow-button` firmer; new `shadow-sheet` (the bottom sheet).
- An outline button and a native select are white (`bg-card`). A badge is a pill (`rounded-full`). TipBadge's tones are drawn soft: a live state green, a stopping state red, a classification grey; `data-tone` unchanged.
- src/hooks/use-mobile.tsx: a page without matchMedia (a unit render) reads the width once.

PART 6 — THE PAGES, AND TURN B3's FIXES FOR THEM
- Screening, Countries, Coverage, Places, Categories: the heading in the header (`admin.section.*.title`), the header's actions as TableActionButton with icons, each column's card place, a lead icon (Screening an image, Countries a globe, Coverage layers, Places a map pin; Categories keeps its own glyph), Filters with Clear all and the result count, the filters as pills.
- From turn B3 (built, not yet sent), for these pages only — Attributes waits for turn B3, on this look:
  - the actions column fits its icons (INC-542): DataTable `actionsWidth` — `w-24` (one icon, the default), `w-32` (two; Countries), `w-44` (three; Places and Categories; `w-36` where a mouse draws the icons at 36 px). Categories' name keeps 22 % of the table;
  - Categories' name and slug cut with CutText, so a cut name keeps its first five characters (D104);
  - Categories' "Remove path" is red (variant destructive), because it removes at once;
  - LS-7's fixture: e2e/helpers/locations.ts `seedGuessFixture` — the scratch region's code becomes "Z" plus five letters or digits, instead of two letters. The guess judge takes up to eight characters of [A-Za-z0-9-] (src/server/geo/guess.ts).

THE THREE NEW STRINGS (G43 — the Amharic below is what ships; list each in the report with its English)
- prim.table.done — "Done" — «ተጨርሷል»
- prim.table.showAll — "Show all" — «ሁሉንም አሳይ»
- prim.table.showResults — "Show {n} results" — «{n} ውጤቶችን አሳይ»

TESTS
- Unit (src/components/shell): HS-11 a column's card place; HS-12 RowActions' split in the card; HS-13 one card frame from the breakpoint up; HS-14 `cardCell`; HS-15 the pills (filter-choices.test.tsx, NEW); HS-16 the panel's two forms (toolbar-panel.test.tsx, NEW); HS-17 the held-finger label (press-label.test.tsx, NEW); HS-18 the pager's arrows; HS-19 the header's heading and Show all; HS-20 the Filters footer; and turn B3's "sizes the actions column for the icons it holds" (red on e6ef28be).
- e2e/house-style.spec.ts: HS-4 — on a phone the pager pages with its 44 px arrows and the run is hidden; HS-5 — the filters are pills.
- e2e/admin-screening.spec.ts: SC-11 taps the market pills.
- e2e/helpers/countries.ts and e2e/helpers/locations.ts: `chooseFilter` taps the pill `<testid>-<value>`.
- From turn B3: e2e/helpers/row-actions.ts NEW (`expectActionsInsideCell`), added to CO-9, LT-16 and CT-43; CT-39 reads Remove path red; LS-7's fixture.

DOCS
- display-primitives.md: turn B3's actions-column section and "The agreed tables".
- design-foundation.md: the page tone and "The agreed look".
- categories.md (with turn B3's section), countries-console.md, locations-console.md, coverage-console.md, admin-screening.md: a V2 section each.
- The changelog. The roadmap: line 3, and the V2 line.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy)
- typecheck, format, lint (0 errors, 33 warnings), 626 unit tests (98 files), the usage maps, the e2e selector's self-test, the hardcoded-string scan, the DataTable min-width guard, the import gate, the browse-path and marketplace guards, the build and the bundle budget: all clean.
- A local render (Chromium, a node build, the real pages with mocked rows) of Screening, Countries, Coverage, Places and Categories at 360, 768, 1024 and 1280 px, against the boards: no sideways scroll at any width; the Filters and Columns sheets opened by a touch tap at 360.
- e2e/house-style.spec.ts and e2e/primitives-law.spec.ts against that build, both projects: 36 passed.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-8.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `e6ef28be4f1f0b28cc0faf097d14d0ac48c3cf9a`, Conclusion **SUCCESS**). If it shows another commit, or FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the browser run;
  9. the report;
  10. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-8.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 44 files → each equal to:
  569a53da374fea8082ae7eb70c31a451f04af8aa4927ca77ad2bf88feeb62ab0  docs/_changelog.md
  651f9bc92d3d0741e49e77fe3998ebc3b018f4c9115f239fe67d0e953de6f850  docs/features/admin-screening.md
  a64314e0630a5e87a920178bcc33edccd435881913ffedba4365f02070a78af5  docs/features/categories.md
  faada196d229366f7e985515e9cd96ac6780773cbffc7f74e5666271497e53aa  docs/features/countries-console.md
  55c4ef1b296b72c59b363145c2bdad7d8a038b7d03ad2a84a88e1b02bc23a213  docs/features/coverage-console.md
  052a0eafcb1ef031f002a3c8c4dbd1c064909a542c576890b226e43e12345afa  docs/features/design-foundation.md
  aa9b63b5ef3f8f478fbbf2ffa21a535bfbb8373c84f831b1083abb2123c6b189  docs/features/display-primitives.md
  eb926160b489c9179a4317f74c223a4eba8b77a0254127e6bf2c1181a026ffb1  docs/features/locations-console.md
  b84603096fe1d4b96601cda5bc9ae2f571bd699c8223f8a10a62f64fa8cfadae  e2e/admin-categories-console.spec.ts
  156cb5bc51ae267f1cf7056858aecbbef4ba1bc95cd5ab287fdd9d046edd09d4  e2e/admin-categories-home.spec.ts
  1d6cd65d5f3c8d2ca13e7db8ee22f9de865a3f528b5a34cf57ad53bfbe4e231c  e2e/admin-countries.spec.ts
  562f55e0d399ab26c0e47c35c971fb81b2a6b79aed1c6c570059a20c3a5b3872  e2e/admin-locations.spec.ts
  7fc11a19637001a72d0e6b20287dfd3ff19e0420aee80a4cfd7357f3eb09a46a  e2e/admin-screening.spec.ts
  4babe8f6143a9170548a0d9511fd2c800e8e254c1e6523de1072e6ba3e6a15bb  e2e/helpers/countries.ts
  fb67090685e15a182e7de454a22dbe8fabb468266722f305a7d3a410bcbd85a5  e2e/helpers/locations.ts
  0220e06331131ef09671c68bc21e7b66a1307e9664af66192d4ef4d899cace12  e2e/house-style.spec.ts
  b6013957b1e56be4ac104acfa85f1aa48dbb4510fb14dbfd69f3d9000c5722b8  roadmap.md
  fb087ccea43c553b107f62e7ae7fc0aaf605ac8befd6d600feb2de598ce8ef66  src/components/shell/columns-button.test.tsx
  f1f5a914ac91cf0269f6609a352f1fe6272db96e8d0f9c3cd974a58aba07df5b  src/components/shell/columns-button.tsx
  8f4fc234c9fa467d02f207922f3f03172a6a552ae08a15a951e60d76dd295996  src/components/shell/data-table-pagination.test.tsx
  50b70278b6e8a1ba68338c7ec7d440f2f547ca14086607ff94fcc1ee370a9e24  src/components/shell/data-table.test.tsx
  e078f1d47f54a87faa2fde0dfa08446744be2891e5eee24ee21e37ffeaf14c01  src/components/shell/data-table.tsx
  aaf6c33ddf260bbf07ec3ff0c1c668761bcba8d92e0a27c80403a88cf01a77e0  src/components/shell/filter-chips.test.tsx
  67b02cfeb773b550ea306fede185b8770045ca0e1da46f78a115d6e9906e28d1  src/components/shell/filter-chips.tsx
  a90e3c4da92e582438d9885ad36a30778fe0ed693e9c996b598310545b90f313  src/components/shell/row-actions.tsx
  ff0eff7852e8e1f5d8143db3ddfa2c75fe98d3b96a904165caa465848ea0dd12  src/components/shell/table-actions.tsx
  81a85ca0a55208046ee4d99a4a69302291fdfb3115e5c510bdf0d41572c815f5  src/components/shell/table-toolbar.tsx
  029540358421f53e5980411bc6f7eb586cfc74dfb0725163b65b2821e348956f  src/components/shell/tip-badge.tsx
  a2aa71da3447052db6f93fec14a0e7b45d2161e9eff5f99560ab485aa503b3bf  src/components/ui/badge.tsx
  170d9e06ce652f88894a09b00229afc3768fc2471f327d28cd18c80c00865232  src/components/ui/button.tsx
  c12025e88641f75d830b0d92c294019a54b01f951d368738a8591a4ed0ed80f7  src/components/ui/native-select.tsx
  689fd94f019580a87e131d9f561736bd2d3a1653c7d326b739532c06fd780b30  src/features/admin-categories/categories-page.tsx
  dec32feeb6df24bda2f0824d2ba0de683886db6875624904e81a03593e06fa75  src/features/admin-categories/category-dialogs.tsx
  d21ed43b905e98a448dfc4edaeacd47c524c609f360d0c18770acc6a6172c458  src/features/admin-countries/countries-page.tsx
  bab8c04a831e1ab49c3476a710ac84c33461c48f1d8f6ff249aa5422a1956521  src/features/admin-countries/countries-toolbar.tsx
  f9eebbabf93ce197117ec8e0c4222af191f438edccede4ea70c88d6c707e3b6e  src/features/admin-coverage/coverage-page.tsx
  0f0b8c2afb2ee9df269d9ea9ab4aff4a81b7ee00ce483fce7d18d28c149cb603  src/features/admin-locations/locations-page.tsx
  8c429dac8b211b5e4f660bdaf938a2298eb12311bfb1b777c2b82bc3c3d74dfd  src/features/admin-locations/locations-toolbar.tsx
  8f9114bb735d18ff80e89655f14bfba86e5514e55dd48a6b976bb3995b41746c  src/features/admin-screening/screening-page.tsx
  21eff740f9e5c965c7f0782925a7e8f67ddfcdf0f58b6613550f99c3e1c454e9  src/hooks/use-mobile.tsx
  df0ff40c721f5aa3f623720a5f89a9068454be0c18248f10b4ca590e7bdf78e5  src/i18n/locales/am.ts
  bc3fbb5c25c6e2eea5d331bf1878b5985af24a6142345d4aa46e77527999f6f0  src/i18n/locales/en.ts
  26ef884dd1fc0435b777d4a0186b248985229671a44cb0a45d825c71be41a017  src/routes/dev.style.tsx
  a9ba349056e985d42566f2bf9eccb8ffb9540f959d95513cdbf544cf8759119b  src/styles.css
- (c) `ls e2e/helpers/row-actions.ts src/components/shell/filter-choices.test.tsx src/components/shell/filter-choices.tsx src/components/shell/press-label.test.tsx src/components/shell/press-label.tsx src/components/shell/toolbar-panel.test.tsx src/components/shell/toolbar-panel.tsx` → "No such file or directory" for each.

THE CARRIER — V2-TURN-CARRIER-2026-10-11.md (132,195 bytes; sha256 c61e838eb4d292a1b95d9065bf29553b425212e46f58d2386196a3c6800cf116; 168 sections)
- Its first line starts "V2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (counted from 1);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (counted from 1, both included) by the section's lines.
  - In both, the section ends with a newline; that newline ends its last line and adds no empty line. A file with several such sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (new keys, keys moved between files), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 53 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  7581123a61183e5f813b839c3c6f7c44cb7098903ac184b9a5cd336c4c294c32  docs/_changelog.md
  89698240d3205269dbd68edf0929213286f181f01418aaeb5bc6c966279fcb64  docs/features/admin-screening.md
  6eaafd433f9e79d06c38ddb6b907539865a113a66588c5d5b81a97874fdd3c54  docs/features/categories.md
  a0f6bea57454be44c3b2dc1fbf0230a128fcc85990cbd12aaeb0d4bd63915dd6  docs/features/countries-console.md
  ab517d5b9d74206e55cb9c837adea63ddbec7fbac93ed6d25112bc8216ee87b8  docs/features/coverage-console.md
  bee5c8ae3b80ded594e81a1ed0dfd64fd0874fb5df3d529a9a582565b2069ffa  docs/features/design-foundation.md
  08e281f13d28181edd97a84164e84d6724201c758064ce3a4685e56c7bab93e9  docs/features/display-primitives.md
  bbd0b831ee5d280c6b07b9ac545bad6690f731446b6dbbcd898817cfb40596aa  docs/features/locations-console.md
  cd958cf1d3a4d70c8cad157e4cbad43e9c753ffa70d637d0b839636820549f38  docs/generated/i18n-usage.json
  44d5bbc87d1a104739d6d17af004e93a57b0a56b9f7bf95bb5a68985b979ed6e  e2e/admin-categories-console.spec.ts
  9c7a6e40cd1ba9aaa4c42f95c50a7ed1dc1bc2912f015888c755ee72edb919bd  e2e/admin-categories-home.spec.ts
  a7b337fce746ca31bba17d2d540b2692c55e4773dddc93ee2e164e9d71ce8081  e2e/admin-countries.spec.ts
  9fc3fe603f026a1738df78e6c24bfc440a2e9f29f28a9509d182074d8f81fccf  e2e/admin-locations.spec.ts
  4971b657d67f428199f33f1b4e21f4a1ffbc39f119b5085cea2726f13dc09970  e2e/admin-screening.spec.ts
  eaa369da1707ac2a9251d3f69123f5077f1d6245377c524edfd35225f9503830  e2e/helpers/countries.ts
  a53b5d6dd2918e231d9997fc04d722424839c1b21e30f3fea5376252d4516b02  e2e/helpers/locations.ts
  9bbea2f6418216907558b95ff453023581c34dbfcc91bdce72fd4c5b22f130c2  e2e/helpers/row-actions.ts
  b19d2968bdc07a2bf3b556b222307c538029196431834c1b8512dcb51a962cbf  e2e/house-style.spec.ts
  cd958cf1d3a4d70c8cad157e4cbad43e9c753ffa70d637d0b839636820549f38  public/i18n-usage.json
  129b2eff02addeeba89f7725d6b1e981bb7c77c751fd72c2452a6d2ab108d37e  roadmap.md
  477f10c520d44bb5dcf042f7a53caeb08fbe87930ceb9c694fcecc9219e2218f  src/components/shell/columns-button.test.tsx
  7b1b41ecbcaea3c52a290e6fe59945be11ad93d92613feedeffdfa8da3f62795  src/components/shell/columns-button.tsx
  0df9550824dc357de3707707b63c1e63be1db237fb3bfaea3752939123de3719  src/components/shell/data-table-pagination.test.tsx
  5260cd89db0394b69d0aa4595dfed42c88dd6d6e2b162fb8c00b68075c9a687f  src/components/shell/data-table.test.tsx
  30ed589d409f8f7bdfbb09a41e79cc9d2288132c4daf6c5a309299259f32c758  src/components/shell/data-table.tsx
  b191198c314ca9cb4f0c46a142b28c5b334dcd719419960f8d9136f214196a69  src/components/shell/filter-chips.test.tsx
  e6446de202016d482ecaaf6f082b790fc18d3841e3a5609075c7a96b503ca40f  src/components/shell/filter-chips.tsx
  c4ad51eb3f99c02a299acee7585d5b89cff2350a2bcdb3f6d1bf353d0f1578d6  src/components/shell/filter-choices.test.tsx
  4aa2620ec332913c058c0ae517b7ee1fae022126380cfaf5003ba2bba6afb872  src/components/shell/filter-choices.tsx
  c683d968d22327f171f787cfc4fabc714389b6383c039dfdb428d67bd5ff1e15  src/components/shell/press-label.test.tsx
  33386aa81eafbbfa4e0169ea772af31abc3d8f124a339ed1ce32db5a46398b28  src/components/shell/press-label.tsx
  ce38daa3ea0f333518dfb95c0de823c13703e0313ee37bbcf8de40735248d6f1  src/components/shell/row-actions.tsx
  cdf308f53fc179e52cc05dd4c86b919107b5feca0059e123e4684d529fe98b0e  src/components/shell/table-actions.tsx
  9fcebcc66389dceb50a261313c84a1d62f198e5f047c1a83af50bd7bb2d56d15  src/components/shell/table-toolbar.tsx
  42af71e49bf6ef23c7376d0bc1e461158c1ec52d5a103ef112c09f5943af3ddb  src/components/shell/tip-badge.tsx
  1053176ee411bd36e9d6d6166d0bf4432a693bb85aec0912a0b122e04766bc71  src/components/shell/toolbar-panel.test.tsx
  08077e94691694479aaf868466d429036e9dba48a47e057d8dc7203f241fdb6e  src/components/shell/toolbar-panel.tsx
  12ebfbe777b5e4df2907a8b112a2622c337c350a0aae795143e6826d2dd6368d  src/components/ui/badge.tsx
  fe9ca35d31b6a444091c4a695918bd23ae13edaa5bbbe209c37960df74c49f80  src/components/ui/button.tsx
  0b9d0e13901331fb265104f4cccc59439e83cd66ae1f76f16d87914f8829dc9e  src/components/ui/native-select.tsx
  09d56470687576925ff491c90847f9c5c5f580696901465a0986f352ce93bab6  src/features/admin-categories/categories-page.tsx
  20da9dbe8ebf62d7f021ef73c8e0cf8182f3fe268de18a0f9084d52d388aef7d  src/features/admin-categories/category-dialogs.tsx
  c26b8a2a743efe0d65b860dd9ba57917bbfb9d370e5e3dffc5bc45d2abfb37cd  src/features/admin-countries/countries-page.tsx
  afe284db69ccc689c74fa721a85f48b36c84e2df8eab31e020c070fb8d02564e  src/features/admin-countries/countries-toolbar.tsx
  c3e0ee042461a9ce4fce712bdb2d669cf3d3c8ec0b81801d4a3b02df569b6b81  src/features/admin-coverage/coverage-page.tsx
  f22072430090ce383e18c7222798497c6d2abf60726efc80be67f11492e65caa  src/features/admin-locations/locations-page.tsx
  1407c9613a32eaaa7bd0306ac0afe8b2f1140a135dd28d97bb26ecf1e04cd247  src/features/admin-locations/locations-toolbar.tsx
  2871b55e9b4bb5feff41ddef050104100a6a37d5880088f10c92bf63d6ca7839  src/features/admin-screening/screening-page.tsx
  ce8b3f8598fa380a169f04b2274d4120726d86ec3122a268ef6722151713df1a  src/hooks/use-mobile.tsx
  e13979a604f1cfb847e3217dc55c78a0859bee6052bf150fa2fcea0dde902bf8  src/i18n/locales/am.ts
  12c9fed8fe3d70e175336b5ac33e122ce681e1a70ebc0f33e4f6c7ec03fad552  src/i18n/locales/en.ts
  63511686d53faedd54a9c4bd7a9ce659e5986a44a0c88ffc1f6b8912d120624e  src/routes/dev.style.tsx
  351d0322e7fe15543d6d5a8fa728a208e25b3e7b3ce4fb71c13bb5e5f8c85d81  src/styles.css

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 626 passed (98 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/house-style.spec.ts e2e/admin-countries.spec.ts e2e/admin-locations.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 53 sha256sum lines and the brief's.
- `git diff --name-only e6ef28be` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only e6ef28be HEAD` too. Expect 54 paths: the hashed paths and the brief.
- The three strings, key by key, English and Amharic.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's re-walk lines, on a phone first.
```
