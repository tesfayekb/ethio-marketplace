# Bundle 11 — turn V2b: the fixes from the operator's phone walk of V2, and every listing card one size: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — TURN V2b (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev dfbb8ec03160d6309d8bee4970b9b803be2e554c. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO TURN B3
- Verified by diff of ebaccefd..dfbb8ec0: the 17 carrier and map paths and the brief, each byte-identical to the supervisor's copy.
- CI on dfbb8ec0 (run 38109538933) is GREEN on attempt 1, with no flaky test, and promoted (main = dfbb8ec0).
- "Done" reads «ተጠናቋል» in both places, as listed in your report.

THE OPERATOR'S WALK OF TURN V2 (on a phone, 2026-10-11)
- Passed: the heading and the icon tiles with their held-finger names; the market pill; the search with the Filters and Columns tiles; the Filters sheet and its pills; the Places card; the Columns switches; the pager; the desktop's one card.
- To fix, in this turn:
  1. Coverage's and Categories' cards spend a line on every column. Facts should sit side by side, on as few lines as fit — on every table.
  2. On a large screen, hovering on Download shows a browser tooltip (a long hint); the other header buttons show none.
  3. Places' Level filter: choosing Country finds nothing.
  4. The rail's Catalog group and its Categories section share one icon, which confuses on a phone.
- Also asked (the operator, 2026-10-11): "make sure that cards on user facing product advertisement have consistent same size and no size difference between the different cards in all screens" — part 6.
- Recorded for later, not in this turn: the admin groups' summary pages (Catalog's first) come last in the admin work; the roadmap gets that line.

WHAT THIS TURN BUILDS
- PART 1 — THE CARD'S FACTS SIDE BY SIDE (src/components/shell/data-table.tsx): a `meta` fact is its label and its value on one line (label muted, value set off); the facts flow on one line and wrap only when they must; a value that does not fit beside its label moves under it whole; the state pills end the same line and move under the facts when they do not fit. Each fact carries `data-card-fact="<column key>"`. This is the shared block, so every table's card follows (the default places every non-title column as a fact).
- PART 2 — CATEGORIES' PARENT AS A FACT (src/features/admin-categories/categories-page.tsx): the parent column's card place is `meta` ("Parent —" for a root; "Parent Vehicles" with its Primary chip for a child), beside Listings. CT-9b still reads the root card's "—" and the child card's parent chips.
- PART 3 — NO BROWSER TOOLTIP ON A HEADER ACTION (src/components/shell/table-actions.tsx): `TableActionButton` takes no `title`; a `hint` shows in the house tooltip (TooltipProvider › Tooltip › TooltipTrigger asChild › the button) on hover or keyboard focus. Categories' Generate missing passes its spend-cap text as `hint` (DEC-032: the cap is stated where it is spent). Places' and Countries' Download drop their `title` hints (src/features/admin-locations/locations-page.tsx, src/features/admin-countries/countries-page.tsx); the scope beside the buttons already says what the file holds.
- PART 4 — PLACES' LEVEL FILTER WITHOUT COUNTRY (src/features/admin-locations/locations-service.ts, locations-toolbar.tsx): `LISTED_LEVELS` is every level but the country, whose anchor row never lists in Places (Admin › Countries holds it), so the Country choice always found nothing. The Level filter offers All, Region, City and Sub-city.
- PART 5 — THE CATALOG GROUP'S OWN GLYPH (src/features/admin/rail-items.ts): the Catalog group is `LibraryBig`; Categories keeps `FolderTree`.
- PART 6 — EVERY LISTING CARD ONE SIZE (src/components/marketplace/listing-card.tsx, invite-card.tsx, feed.tsx). Measured before, on a local build with eight mixed cards: heights 138–198 px at 360 and 212–284 px at 1280 (a tier pill wrapping under the title, a price on one to three lines, the Negotiable pill, a card with no place).
  - feed.tsx: the grids' rows are equal (`auto-rows-fr`, all three grids).
  - listing-card.tsx: the card fills its cell (`h-full`); the Premium / Featured pill moves onto the picture's top corner (`listing-card-tier`, `data-tier`); the title alone on its line; the price slot is sized for its longest common case — `min-h-[3.625rem]` on a compact card (two lines of price and the Negotiable pill), `@min-[11rem]:min-h-[2.75rem]` on a wider one; the place line (`listing-card-place`) is always drawn, empty when the card has none, and sits last (`mt-auto`).
  - invite-card.tsx: no `min-h-56`; the card clips to its cell (`overflow-hidden`); a smaller star; the sentence `line-clamp-6` on a compact card and `line-clamp-4` from 11rem (the whole sentence stays in the page).
  - After: every card within 1 px at 360, 400, 640, 768, 1024, 1280 and 1440, across two sections and with the invitation.

TESTS (unit)
- HS-22 (src/components/shell/data-table.test.tsx): the card's facts — each label beside its value, all facts and the pills on one wrapping line.
- HS-23 (src/components/shell/columns-button.test.tsx): a header action never carries a `title`; its name is its words.
- PL-2 (src/features/admin-locations/locations-service.test.ts): the listed levels leave out the country and keep the others in order.
- LC-1 and LC-2 (src/components/marketplace/listing-card.test.tsx, NEW): the card fills its cell, the tier pill on the picture, the place line kept, the price slot reserved; the invitation fills its cell and holds its sentence.
- e2e/feed-screens.spec.ts: FS-12 also compares the invitation's height with a card's; FS-3 reads every card's height on the page (within 1 px).
- The admin specs read facts by text and testid (CT-9b, CV-2, CO-9, LT-2), which this turn keeps; they are not edited.

DOCS
- display-primitives.md: "The re-walk's fixes"; locations-console.md and categories.md: one line each; feed-engine.md: "One card size"; the changelog; the roadmap (line 3, the V2b line, and the summary pages' line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn B3 applied)
- typecheck, format, lint (0 errors, 33 warnings), 632 unit tests (99 files), the usage maps, the hardcoded-string scan and the DataTable min-width guard: all clean.
- A local render (Chromium, a node build, mocked rows) of Coverage, Categories, Places, Countries, Screening and Attributes at 360 and 1280 px: no sideways scroll; Coverage's free plan reads "Cities 1 Regions 0 Countries 0" then "Photos at most 8" with its pill, Categories' card "Parent — Listings 104" then its pills.
- The home page with eight mixed cards (mocked /api/feed) and a grid of cards with the invitation, at 360–1440 px: the heights above.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-10.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `dfbb8ec03160d6309d8bee4970b9b803be2e554c`, Conclusion **SUCCESS**). If it shows another commit, or FAILURE, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-10.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 21 files → each equal to:
  3eccc0854f08104f58de3dfb914d6bca37d9b4d6866d64bb4cff658efca9c589  docs/_changelog.md
  6eaafd433f9e79d06c38ddb6b907539865a113a66588c5d5b81a97874fdd3c54  docs/features/categories.md
  d2cb4019218fae16e95d3d1578a7c7f9aad7152cf45de139ad80b6bd9a76d602  docs/features/display-primitives.md
  6cc220f756a771822f67d7a56b9f899c2cf3b51da05743ba5f84ee7e9a832340  docs/features/feed-engine.md
  bbd0b831ee5d280c6b07b9ac545bad6690f731446b6dbbcd898817cfb40596aa  docs/features/locations-console.md
  fd073ec19ce59aaafea1add444906beab64a143d476ba4472d65b304c8a82ebf  e2e/feed-screens.spec.ts
  bfaab8c26aa4ec0bd23a6b0f0bdc62bc4ba885442677584d78eb030f529c4fbc  roadmap.md
  ed3048be575200195552c846123448eaeee0c70383cfb531085810c928db58b9  src/components/marketplace/feed.tsx
  da293b9d4e3e157b5ad035699d07b3d17faec9770fa3257861468f414dc1689a  src/components/marketplace/invite-card.tsx
  99bf8bbc6a9d43b034db0b4704ba2f46d85f68772ec8d526fae9ddb80806e526  src/components/marketplace/listing-card.tsx
  477f10c520d44bb5dcf042f7a53caeb08fbe87930ceb9c694fcecc9219e2218f  src/components/shell/columns-button.test.tsx
  3a33179b9e57d26ab4ed4496b14326f7365b38f2b884993c11e230ec17e8e0b0  src/components/shell/data-table.test.tsx
  701abd97d8897561d8fb5d2b6e6c1b2f950e8046b1d010a893c38e3d5824f911  src/components/shell/data-table.tsx
  cdf308f53fc179e52cc05dd4c86b919107b5feca0059e123e4684d529fe98b0e  src/components/shell/table-actions.tsx
  09d56470687576925ff491c90847f9c5c5f580696901465a0986f352ce93bab6  src/features/admin-categories/categories-page.tsx
  c26b8a2a743efe0d65b860dd9ba57917bbfb9d370e5e3dffc5bc45d2abfb37cd  src/features/admin-countries/countries-page.tsx
  f22072430090ce383e18c7222798497c6d2abf60726efc80be67f11492e65caa  src/features/admin-locations/locations-page.tsx
  2de8776ca15873a7cabf5a93be33a464479fd8a17fca44f570ab98a48b2aba49  src/features/admin-locations/locations-service.test.ts
  119b2c8b3984e21ea6ee89358f045c5dd58cbeca85fd87ebbdbcb64a3ec1cb2c  src/features/admin-locations/locations-service.ts
  1407c9613a32eaaa7bd0306ac0afe8b2f1140a135dd28d97bb26ecf1e04cd247  src/features/admin-locations/locations-toolbar.tsx
  72492a2e462420b6ea6212591c4d89be4349b8e7f2e1ba9f99ed194c45a74440  src/features/admin/rail-items.ts
- (c) `ls src/components/marketplace/listing-card.test.tsx` → "No such file or directory".

THE CARRIER — V2B-TURN-CARRIER-2026-10-11.md (25,282 bytes; sha256 5e07c43b18a907298dc23bea08113b953c67f3175e0f51d9728ad371f257620d; 43 sections)
- Its first line starts "V2B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 24 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  df6643b50073cf6245b2671f14913b875720b5baec8a02b0452042720d44dd9a  docs/_changelog.md
  c1e7bbd1ed9899a203e3b1d4dff698d2492097767bb6e4853e30c7878063e130  docs/features/categories.md
  03e44391d7b8489a46c32433cc0c91495affc1078d8f1a5b904cc2845288e317  docs/features/display-primitives.md
  a8e10af332d1fb7fec0747e624b3e95a23f43fcf72e4d002bbe59e4bcf535044  docs/features/feed-engine.md
  069a1926d79b8e22a97b90d0eb664347fbcd032b218e4ff0350df439b099a921  docs/features/locations-console.md
  60481702006066c62e57fb36dff1a3c1d0aae5a0f051ff0d4aabba9a8c7c1de5  docs/generated/i18n-usage.json
  3a3e720bcf48ddaecad2ef3187e38acec4334c4462fc3e0d4e6d58e0da11eddd  e2e/feed-screens.spec.ts
  60481702006066c62e57fb36dff1a3c1d0aae5a0f051ff0d4aabba9a8c7c1de5  public/i18n-usage.json
  0af1c354be3ee5637e818559964003c5984169621396fa4d15b216caf3530b12  roadmap.md
  7ff0af8be4dcd2798766a9395f86cf04f4b49f27e3a328c4152ff7f53d630e28  src/components/marketplace/feed.tsx
  5f813fe3dc89ffd30f071214e2ef6a05422bf9018f89b9db23a3a3c4eae5ca9f  src/components/marketplace/invite-card.tsx
  bfd3dc986fd10c92a8f5b293771d08cfffc64034a03336cbce147af858562dff  src/components/marketplace/listing-card.test.tsx
  e1647a921397b83943d453db3c0ae1a3a2b6115880e22bf7d8a2c3f0dd3a5fb0  src/components/marketplace/listing-card.tsx
  137e63e17c9effab7f00914394622a438de7e7cec301bcfc693558b78df8eaa3  src/components/shell/columns-button.test.tsx
  e6765e43a139c2fd81376f6a447dd7ddef55f0eb8cb3a4e012232a7030ab2da9  src/components/shell/data-table.test.tsx
  bfee989ad064ce78f605d484f4f5a59b00fbe78c438ab4bfb8e9716c4bc7356b  src/components/shell/data-table.tsx
  0d37e9d361f1dbcf33c7a50d9d8f1c9359ecdde46ffb8fa37a5c75724c7c1b2a  src/components/shell/table-actions.tsx
  9d6872df8569547e9664fd221c4c2ab170b68fbb40fac6c0f3b8ff4287604554  src/features/admin-categories/categories-page.tsx
  32df5a3fa310454c799ddf5c8174d54e7424fba98c5ac6ccc4765a7f1e913da4  src/features/admin-countries/countries-page.tsx
  fc0b078b509f1b48fd5c9341aae8e27afc04d56c37aa8294815e598dc4b1b514  src/features/admin-locations/locations-page.tsx
  572d12228490cd424b927857d1bcb8c466f95a7d3613f2eec2d32d1db79e3180  src/features/admin-locations/locations-service.test.ts
  4d76ece708d1d1f546843b0016954661483311443ddd9f04691d6a77be5a1afd  src/features/admin-locations/locations-service.ts
  ad7692ae20ee4017f8e1f131c2354a36350bcd83966dd8dfb7269e51038d8b4c  src/features/admin-locations/locations-toolbar.tsx
  3b09aac55e8bcadb352f28ba9e63a38ba4bcffe25e15c72a760a76358010aa3c  src/features/admin/rail-items.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 632 passed (99 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts e2e/admin-coverage.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 24 sha256sum lines and the brief's.
- `git diff --name-only dfbb8ec03160d6309d8bee4970b9b803be2e554c` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only dfbb8ec03160d6309d8bee4970b9b803be2e554c HEAD` too. Expect 25 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines.
```
