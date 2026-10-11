# Bundle 11 — turn V2c: the fixes from the operator's walk of Attributes — a row's expansion in its row's box, and a panel's Done waits for a change: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — TURN V2c (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string.
Base: dev 5f688c2819f4723159876389bb40f7e1505007f5. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO TURN V2b
- Verified by diff of dfbb8ec0..5f688c28: the 24 carrier and map paths and the brief, each byte-identical to the supervisor's copy. Your report matches (the maps rewritten on the first map-guard run, as expected; the platform's mid-turn save).
- The operator's walk of B3 item 5 (an inherited row on a phone) passed with Smartphones: its Condition and Warranty come from Electronics. The brief's example (Cars) was the supervisor's error: Vehicles links nothing, so Cars inherits nothing. No code change.

THE OPERATOR'S WALK OF TURN B3 (Admin › Attributes, 2026-10-11)
- Passed: the heading and the four header tiles; the category pill, the search and Columns; each attribute one card; the three-dots menu with Remove in red; the inherited row; the red Delete dialog; «ተጠናቋል»; the desktop's one card with the row's icons in the Actions column.
- To fix, in this turn:
  1. An attribute's options line sits between two attributes, on a phone and on a computer, and may be read as the next one's. The operator: "place it back in the box it belongs, may be minimize text size a bit so it can fit inside each row card."
  2. Columns' "Done" is enabled when nothing has changed. The operator: "should be disabled if not changing, and only enabled after a change."

WHAT THIS TURN BUILDS
- PART 1 — A ROW'S EXPANSION IN ITS ROW'S BOX (src/components/shell/data-table.tsx; every table with `expandedRow`: Attributes, Strings, Data scope, Audit).
  - The phone card: the expansion (`<row>-expanded`) sits inside the card, under the facts and above the footer, in the name's column (beside the lead tile, under the `-card` block, outside its link).
  - The table: a row that has an expansion draws no line under itself; its expansion row (`<row>-expanded-row`) follows it and carries the line, and the expansion's cell starts at the row's bottom (`px-3 pb-3 pt-0`). A row with no expansion keeps its line.
- PART 2 — ATTRIBUTES' OPTIONS LINE IN SMALL TEXT (src/features/admin-attributes/attributes-page.tsx): `attribute-optionlist-<key>` is `text-xs leading-5`, at most three lines (`line-clamp-3`, `break-words`). A model list runs to hundreds of names (618 in Model for cars); the whole list stays in the page, and Edit shows every option.
- PART 3 — A PANEL'S PRIMARY WAITS FOR A CHANGE (D133, the operator's walk; G29: the Columns panel and the Filters panel).
  - src/components/shell/toolbar-panel.tsx: a new required prop `state` — the panel's choices as one string. The panel keeps the string it opened with (taken when it opens), and `footer` receives `(close, changed)`: `changed` is true only while `state` differs from that string; a choice set back is no change. The close (×), Escape and a tap outside always close.
  - src/components/shell/columns-button.tsx: `state` is the hidden columns' keys, sorted and joined; "Done" (`-done`) is `disabled` until `changed`.
  - src/components/shell/filter-chips.tsx: `FiltersButton` requires `state`; its primary ("Show N results", or "Done") is `disabled` until `changed`. "Clear all" keeps its rule (enabled while a filter is on).
  - The pages pass their filter values: Categories `String(missingOnly)`, Countries `status`, Places `` `${level}|${status}` ``, Screening `country ?? ""`, the style page `` `${colour}|${size}` ``.
  - Not changed (judged in this census): the "Done" of Attributes' Assign-to-category dialog (`category-attributes-close`) stays enabled — it is that dialog's only finger-sized way out, and every change there is saved as it is made.

TESTS (unit)
- HS-24 new (src/components/shell/toolbar-panel.test.tsx): `changed` is false when the panel opens, true after a choice, false again when the choice is set back; the panel reopened starts from its new choices; the close always closes.
- HS-25 new (src/components/shell/data-table.test.tsx): the expansion inside the card box, after the `-card` block and before the footer's Edit; none for a row without one; in the table the row has no line, its expansion row follows it with the line and a `pt-0` cell, and a row without an expansion keeps its line.
- HS-19 (src/components/shell/columns-button.test.tsx): Done disabled on opening, enabled after a switch, disabled when the switch is set back; Show all still brings back every hidden column, then Done closes.
- HS-20 (src/components/shell/filter-chips.test.tsx): the primary disabled on opening; Clear all clears and enables it; it closes.
- Two fixtures gain the new prop and nothing else: HS-16's panel (`state="a"`) and the count-mark test's FiltersButton (`state=""`).
- The browser specs close their panels with Escape (HS-5, the countries and places `chooseFilter` helpers) and read the options line by text (AT-47, AT-48); they are not edited.

DOCS
- display-primitives.md: "The Attributes walk's fixes"; attributes.md: one line; the changelog; the roadmap (line 3, and the V2c line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn V2b applied)
- typecheck, format, lint (0 errors, 33 warnings), 634 unit tests (99 files), the usage maps (unchanged), the hardcoded-string scan, the DataTable min-width guard, the import, browse and listing-write guards, the selector self-test, the build and the bundle budget: all clean.
- HS-19, HS-20, HS-24 and HS-25 shown failing against the V2b files, then passing.
- A local render (Chromium, a node build, mocked rows) of Attributes at 360, 768, 1024 and 1280 px: no sideways scroll; the options line inside its card on a phone and joined to its row on a computer, a 120-option list held to three lines; Columns' Done greyed on opening, enabled after a switch, greyed again when it is set back, at every width; Places' Filters sheet: "Show 0 results" greyed on opening, green after City.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-11.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `5f688c2819f4723159876389bb40f7e1505007f5`, Conclusion **SUCCESS**). If it shows another commit, or FAILURE, STOP and report. You cannot git-fetch that branch;
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
- Scope — these files only: the carrier's paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-11.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 18 files → each equal to:
  df6643b50073cf6245b2671f14913b875720b5baec8a02b0452042720d44dd9a  docs/_changelog.md
  f6283cd5f99d6b3337bad1005546d99aafd1ea8f4c66f50b18052d450a7aadb1  docs/features/attributes.md
  03e44391d7b8489a46c32433cc0c91495affc1078d8f1a5b904cc2845288e317  docs/features/display-primitives.md
  0af1c354be3ee5637e818559964003c5984169621396fa4d15b216caf3530b12  roadmap.md
  137e63e17c9effab7f00914394622a438de7e7cec301bcfc693558b78df8eaa3  src/components/shell/columns-button.test.tsx
  7b1b41ecbcaea3c52a290e6fe59945be11ad93d92613feedeffdfa8da3f62795  src/components/shell/columns-button.tsx
  e6765e43a139c2fd81376f6a447dd7ddef55f0eb8cb3a4e012232a7030ab2da9  src/components/shell/data-table.test.tsx
  bfee989ad064ce78f605d484f4f5a59b00fbe78c438ab4bfb8e9716c4bc7356b  src/components/shell/data-table.tsx
  b191198c314ca9cb4f0c46a142b28c5b334dcd719419960f8d9136f214196a69  src/components/shell/filter-chips.test.tsx
  e6446de202016d482ecaaf6f082b790fc18d3841e3a5609075c7a96b503ca40f  src/components/shell/filter-chips.tsx
  1053176ee411bd36e9d6d6166d0bf4432a693bb85aec0912a0b122e04766bc71  src/components/shell/toolbar-panel.test.tsx
  08077e94691694479aaf868466d429036e9dba48a47e057d8dc7203f241fdb6e  src/components/shell/toolbar-panel.tsx
  2e4b208fe737731525169a4b7231beb2ec5b0825acfd3b7d20b0afbb760b9e66  src/features/admin-attributes/attributes-page.tsx
  9d6872df8569547e9664fd221c4c2ab170b68fbb40fac6c0f3b8ff4287604554  src/features/admin-categories/categories-page.tsx
  32df5a3fa310454c799ddf5c8174d54e7424fba98c5ac6ccc4765a7f1e913da4  src/features/admin-countries/countries-page.tsx
  fc0b078b509f1b48fd5c9341aae8e27afc04d56c37aa8294815e598dc4b1b514  src/features/admin-locations/locations-page.tsx
  2871b55e9b4bb5feff41ddef050104100a6a37d5880088f10c92bf63d6ca7839  src/features/admin-screening/screening-page.tsx
  63511686d53faedd54a9c4bd7a9ce659e5986a44a0c88ffc1f6b8912d120624e  src/routes/dev.style.tsx

THE CARRIER — V2C-TURN-CARRIER-2026-10-11.md (18,347 bytes; sha256 551d12670635da7bfb8ab648ce07f445e0660b012866958994f88a5faf5ab372; 50 sections)
- Its first line starts "V2C TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. No key moves in this turn: it must print "usage maps match the tree." on the first run, and docs/generated/i18n-usage.json and public/i18n-usage.json stay unchanged. If it rewrites them instead, STOP and report.

THE HASHES — `sha256sum` each of the 18 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  7866a9d04d24b6bb459ddcbc23d1cc97894f36ef2a599e1b1049aa8185cd96e5  docs/_changelog.md
  7e702384ddcdbb502748b4af515713a830bfc080af7c519b5412f48e7e041b3d  docs/features/attributes.md
  7b994aba3c2874802ef0d784baaace91c0b224c66d9731b7dd2b5a2b8e518d60  docs/features/display-primitives.md
  38c755868db4a1b51c521e85f3711035cf684441138d0f56b391a988cfa05d98  roadmap.md
  608fe018c15661e50e85b199cd47770da1ad89151dc583813ed08d1a49cd254e  src/components/shell/columns-button.test.tsx
  cbc66751184ef5d64c21e8fa30519761611f2cacc96794184bb4e0ffb509d248  src/components/shell/columns-button.tsx
  8fdea5b4dbfad684894d683f1e8dc18aff712d1db68dcf3b717aeb40b8d79525  src/components/shell/data-table.test.tsx
  6a43502e669d3415ad693aebeb14d429f863bd9c302052542f9b9f8753bc72e0  src/components/shell/data-table.tsx
  d9826fae9844e80719c86c936bd2f25cf1302a67954eb8d46d2a09a1977c2d3c  src/components/shell/filter-chips.test.tsx
  9bc663f01efb576e6068c5dbe92d958f1147cc4fcdd43fcbc0e3b39d2a79747d  src/components/shell/filter-chips.tsx
  e321be6b428ddd32b4efb0c986b3b6f111ec396b8aaa0ff5a75d691d556823dc  src/components/shell/toolbar-panel.test.tsx
  c7dff0011a26b878f7aa3ebbd604a69eb9371602d016d559ef410a98e0b80509  src/components/shell/toolbar-panel.tsx
  6c2c353ff6f18d83e52f803959db38f7e4bd5bc65fb1cb107c5f1069802cd8eb  src/features/admin-attributes/attributes-page.tsx
  02766f4a61843de1669b99e62125f87b6cf0bd642fc4da03e4634c3c8de54946  src/features/admin-categories/categories-page.tsx
  2dd2d876afa85596b460f90ad481d30e741d33f4430a0e0c608cbd81f4d1b124  src/features/admin-countries/countries-page.tsx
  20e075e7088d2b12b270e8e0a1a55516c8ecb00a377fa2c99dd3a618809e888f  src/features/admin-locations/locations-page.tsx
  be6a3e82e1a98a3e3f2370de76c3efb033cf6c82a01b9f7293a312178e145791  src/features/admin-screening/screening-page.tsx
  28fc709c22ea33bf5c20c8560f09d91f7851209d34d4d08b700e75ee0f3e3851  src/routes/dev.style.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 634 passed (99 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-attributes-editor.spec.ts e2e/house-style.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a) and (b).
- The 18 sha256sum lines and the brief's.
- `git diff --name-only 5f688c2819f4723159876389bb40f7e1505007f5` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 5f688c2819f4723159876389bb40f7e1505007f5 HEAD` too. Expect 19 paths: the hashed paths and the brief.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines.
```
