# Bundle 11 — turn B3: Admin › Attributes on the agreed blocks and the V2 look, and "Done" in the operator's Amharic: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — TURN B3 (2026-10-11). ONE TURN. No migration, no database change, no package change, no new string (two Amharic values change, below).
Base: dev ebaccefd. This file is public: it is written as build instructions. Tier B (admin screens), on the Tier A doors that already exist.

ANSWERS TO TURN V2
- Verified by diff of e6ef28be..ebaccefd: the 53 carrier and map paths and the brief, each byte-identical to the supervisor's copy (ebaccefd has the same tree as 37880e06).
- Your note on `INSERT-AFTER 378`: your reading was the intended one. The builder counted the empty piece after the file's last newline as a line. From this turn on, an insertion at a file's end travels as APPEND, and every line number below counts the pieces you get by splitting the file on newline characters (S160).
- CI on ebaccefd (run 38106720513) is GREEN on attempt 1, with no flaky test, and promoted (main = ebaccefd).
- "Done" will read «ተጠናቋል» (the operator's word, 2026-10-11): part 3 below.

WHAT THIS TURN BUILDS — PART 1, ADMIN › ATTRIBUTES ON THE AGREED BLOCKS (D118, D128, DEC-170; Part B, group 1, the last turn)
- src/features/admin-attributes/attributes-page.tsx:
  - the header (TableActions, `attribute-header`): the page's heading "Attributes"; then Merge, the transfer pair (`attribute-transfer`: Export, Import), then New attribute — each a TableActionButton (icon tiles on a phone; icon and words from md). An export failure is said under them (`attribute-header-status`). The old create card is gone;
  - the toolbar (TableToolbar, `attribute-toolbar`): the category, with Clear filter when one is chosen, as the table's scope (it decides what is read, exported and imported; a tinted pill on a phone); then search; then Columns (the name locked). This table has no filter, so it has no Filters button;
  - the row (RowActions, `attribute-actions-<key>`):
    - Edit;
    - Delete in red, always offered: its dialog states the blast radius, and the door refuses while a category links the attribute (C3e);
    - the three-dots menu with Assign to category and, in red, Remove from category;
    - an inherited row has no Edit and no Delete, and its menu holds only Open origin category;
  - one card per attribute below lg (the V2 card): the name (with its key and the inherited pill) and the three-dots in the corner; the type under it; Used by as a fact; Edit and Delete in the footer; a tags tile leads the card;
  - the footer: the range, rows per page (10, 25, 50, 100, kept in this browser) and the page numbers;
  - `actionsWidth="w-44"` (three icons, INC-542).
- src/components/shell/data-table.tsx: `cardLabel: false` on a column drops the card's label above a fact whose cell names itself (Used by: "Used by 3 categories").

PART 2 — THE CATALOGUE'S CUT NAMES (D104) AND THE RED MERGE (G29)
- Names cut with "…" keep their first five characters (CutText): Attributes' name, key, inherited badge and Used by chips; the merge dialog's duplicate lines (attribute-dialogs.tsx) and the category editor's attribute names (category-attributes-dialog.tsx).
- The merge button is red (`danger`), because a merge removes definitions.
- The option editor's inline removes stay outline: they edit the form, and nothing is removed until Save.

PART 3 — "DONE" IN THE OPERATOR'S AMHARIC (G43; two existing keys, one word)
- src/i18n/locales/am.ts:
  - prim.table.done — "Done" — «ተጠናቋል» (was «ተጨርሷል»);
  - admin.attributes.links.done — "Done" — «ተጠናቋል» (was «ተጨርሷል»; the same word for "Done" everywhere).

TESTS
- e2e/helpers/admin-attributes.ts: `openAttributeMenu` opens `-more`; new `attributeEdit` and `attributeDelete`.
- e2e/admin-attributes-library.spec.ts:
  - AT-79 new: the heading; the header's order and the toolbar's order (read by id); the locked name in Columns; the row's Edit and red Delete inside their region; the menu's two items, with Remove red; the cut name's floor; the page size kept across a reload;
  - AT-6: the merge button is red;
  - AT-9: the three-dots is reachable at every width;
  - AT-14: a reader sees no row action at all;
  - AT-19: an inherited row has no Edit, no Delete and one menu item;
  - AT-2, AT-5, AT-8 and AT-11 open the verbs by the new ids.
- The verbs by the new ids, nothing else changed: AT-47 and AT-48 (e2e/admin-attributes-editor.spec.ts), AT-72 (e2e/admin-attributes-import.spec.ts), AT-73 and AT-73b (e2e/admin-attributes-safety.spec.ts).
- Unit: HS-21 (src/components/shell/data-table.test.tsx) — `cardLabel: false` draws no label.

DOCS
- attributes.md: the turn B3 section with the V2 card; display-primitives.md: "A fact that names itself".
- The changelog. The roadmap: line 3, and the B3 line.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy)
- typecheck, format, lint (0 errors, 33 warnings), 627 unit tests (98 files), the usage maps, the hardcoded-string scan and the DataTable min-width guard: all clean.
- A local render (Chromium, a node build, the real Attributes page with mocked rows) at 360, 768, 1024 and 1280 px: no sideways scroll; the heading and the four header tiles on a phone (they move under the heading); one card per attribute with Edit and a red Delete in its footer; from lg one card holding the toolbar, the table and the footer, the row's three icons inside their cell.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-9.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect Commit `ebaccefd5d81a9ba6a1362157fed5e6005892fbc`, Conclusion **SUCCESS**). If it shows another commit, or FAILURE, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-9.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 15 files → each equal to:
  7581123a61183e5f813b839c3c6f7c44cb7098903ac184b9a5cd336c4c294c32  docs/_changelog.md
  2f3a7fbd649669d7c82ca77c3fb67456be7a8a21de88e48b165e12e21ca27ffa  docs/features/attributes.md
  08e281f13d28181edd97a84164e84d6724201c758064ce3a4685e56c7bab93e9  docs/features/display-primitives.md
  a99dbb5c6cafd819d47a7f4ff5fa84c24a56970f344dc09374531f227a9fd7f9  e2e/admin-attributes-editor.spec.ts
  783239b57d3d936ae5cb5a1261dd9fa5cbe1f09ed3740a137b4fb5bf2b9e7169  e2e/admin-attributes-import.spec.ts
  9b39707e630a161c8bfa807ad15159fb89c5a7e2f14f3ad1307b8e0f153aae2d  e2e/admin-attributes-library.spec.ts
  411cc7077d3a7177fed05a2d181f0a022193b1ebdb59444148992546ea75ae74  e2e/admin-attributes-safety.spec.ts
  1c41a7fd7c25f03881d95c8f7cdc7591b47801c30d506224524c252ed6272083  e2e/helpers/admin-attributes.ts
  129b2eff02addeeba89f7725d6b1e981bb7c77c751fd72c2452a6d2ab108d37e  roadmap.md
  5260cd89db0394b69d0aa4595dfed42c88dd6d6e2b162fb8c00b68075c9a687f  src/components/shell/data-table.test.tsx
  30ed589d409f8f7bdfbb09a41e79cc9d2288132c4daf6c5a309299259f32c758  src/components/shell/data-table.tsx
  a0a1824bd2d21c5572b71b9a1edb92b3c382a487d5e362ae5da5502f9b401ec0  src/features/admin-attributes/attribute-dialogs.tsx
  6eef56a8db19ae8819bb79c0c2b3dad8ccd542f2844deab6676ff57a73369039  src/features/admin-attributes/attributes-page.tsx
  41c2d56c96b478079a7aed634c8b529db1fd01a1046b262ebdb2847e4bbb7e3d  src/features/admin-attributes/category-attributes-dialog.tsx
  e13979a604f1cfb847e3217dc55c78a0859bee6052bf150fa2fcea0dde902bf8  src/i18n/locales/am.ts

THE CARRIER — B3-TURN-CARRIER-2026-10-11.md (47,043 bytes; sha256 ade88c4b14facaf02406c930b6c214ca2124a65579ce14e3ea8125e632e09115; 42 sections)
- Its first line starts "B3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  3eccc0854f08104f58de3dfb914d6bca37d9b4d6866d64bb4cff658efca9c589  docs/_changelog.md
  f6283cd5f99d6b3337bad1005546d99aafd1ea8f4c66f50b18052d450a7aadb1  docs/features/attributes.md
  d2cb4019218fae16e95d3d1578a7c7f9aad7152cf45de139ad80b6bd9a76d602  docs/features/display-primitives.md
  45f432839961acacf9edc03c6ad9e908fe5811d552481833619df21bd9101c12  docs/generated/i18n-usage.json
  7cbc8dfdb8d53d8bf761dc71d8fe48d2bf61403244b3f1b2555f188841b1f26a  e2e/admin-attributes-editor.spec.ts
  3abc0767f6a6aa069f44bae0ef7f59c73dd42cfed5b1f9cdb1b3d5e318e84d11  e2e/admin-attributes-import.spec.ts
  d2784bbc7988fd1cc4fc72745ed8afe744706985163287e4de687fb62f54e6e4  e2e/admin-attributes-library.spec.ts
  b99c7f09f15ce7cc032160db564423fd3f747f09c36a1379afcdd5fa6d11b5a8  e2e/admin-attributes-safety.spec.ts
  4fc70ee08abfc616b51f6d7ba26eddd0824525eb4ddf0fe0099f1535038b131f  e2e/helpers/admin-attributes.ts
  45f432839961acacf9edc03c6ad9e908fe5811d552481833619df21bd9101c12  public/i18n-usage.json
  bfaab8c26aa4ec0bd23a6b0f0bdc62bc4ba885442677584d78eb030f529c4fbc  roadmap.md
  3a33179b9e57d26ab4ed4496b14326f7365b38f2b884993c11e230ec17e8e0b0  src/components/shell/data-table.test.tsx
  701abd97d8897561d8fb5d2b6e6c1b2f950e8046b1d010a893c38e3d5824f911  src/components/shell/data-table.tsx
  fd2e3a047c229f18cd5e14c7f02f341829edb49f9e4b434b2a7c67dbe7d3512b  src/features/admin-attributes/attribute-dialogs.tsx
  2e4b208fe737731525169a4b7231beb2ec5b0825acfd3b7d20b0afbb760b9e66  src/features/admin-attributes/attributes-page.tsx
  bddfbaeea91cbffd6e4f75a96d274f0143c4e90bad051a164ff2d26ff63289ec  src/features/admin-attributes/category-attributes-dialog.tsx
  81c06b78135b921da4f8978b42fbacdcc98a4310b9b35c2090d2dd80e09e533e  src/i18n/locales/am.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 627 passed (98 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-attributes-library.spec.ts`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a) and (b).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only ebaccefd` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only ebaccefd HEAD` too. Expect 18 paths: the hashed paths and the brief.
- The two Amharic values, key by key, English and Amharic.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines for Attributes.
```
