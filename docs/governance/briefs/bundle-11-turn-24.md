# Bundle 11 — group 3, turn G3c: INC-558's class census (G29): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 3, TURN G3c (2026-10-11). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev ea8c54d9. This file is public: it is written as build instructions. Tier A: what the admin consoles' writes send (categories, attributes, countries, coverage, places, translations). Tier B: the controls' waiting states and the tests.

ANSWERS TO TURN L4c
- Verified: dev ea8c54d9 holds the delivered tree and the brief as sent.
- CI run 38180273767 on ea8c54d9: SUCCESS (AL-23, AL-21 and A-5 green; main promoted). One flaky pass in the fast lane: AL-16 (mobile-360). Its check that the door never shows a pin searched the door's answer for the text "8.9", which a timestamp's seconds can contain (…:38.9…). That is INC-559, the test's own defect (the supervisor's), fixed below. Not your defect.

PART 0 — L4c's flaky pass first (INC-559)
- AL-16 checks that the listing door names a pin and an address but never shows them, by searching the door's answer for the seeded values. The pin values were 8.9 and 9.01, short enough to occur by chance in the answer's timestamps (seconds like …:38.9…): the fast lane's mobile copy failed once, then passed on retry.
- The fix (e2e/admin-listings.spec.ts, AL-16 only): the seeded pins carry nine decimals (8.912345678, 9.087654321; a timestamp carries six), and the history's before and after values are checked to carry neither `pin_lat` nor `street_address` (the door keeps only the listed keys). No assertion loosened.
- The census of the class (an absence check on serialized text whose probe can occur by chance): the e2e suite's other absence checks probe long, distinctive values (phone numbers, ids, slugs, names); AL-16 was the only short number.

WHAT THIS TURN BUILDS — INC-558's class (G29)
- The class rule: an admin control that sends values computed from a read (a whole record, an ordered list, a set), or opens a form seeded from it, waits while that read is re-reading or a write keyed to it is in flight. Otherwise a second press, or a form opened before the re-read arrived, computes from the old read and writes it back. INC-558 was the listing's Edit (fixed in L4c); this turn is the census of every other admin console.
- src/lib/use-settling.ts (NEW): `useSettling(key)` — true while a read under the key is fetching, or a write whose mutation key is that key is in flight.
- src/lib/use-following-draft.ts (NEW): `useFollowingDraft(stored)` — an editor's draft that follows the stored value until the admin types in it.
- The writes name their read as their mutation key:
  - use-categories.ts: Update and Reorder;
  - use-attributes.ts: Upsert, the cards and the link order;
  - use-countries.ts: Upsert and the rail order;
  - use-coverage.ts: the plan;
  - use-locations.ts: Upsert, Reorder and Move;
  - use-translations.ts: a string's Save and AI, an entity's Save and AI, under the two row reads (`TRANSLATION_ROWS_KEY`, `ENTITY_ROWS_KEY`; the two row queries now use them).
- What waits (greyed out while its read settles):
  - categories: Move up and Move down (the row's menu and the editor's verb bar), Edit, the editor's Save; a category's attributes dialog: the card boxes, Up and Down;
  - attributes, countries, coverage, places: Edit; countries: Rail order; places: Move and Reorder (the row's menu and the editor's verb bar — the two bars gain a `settling` option);
  - Strings and the Data scope: the editor's Save.
- Strings and the Data scope: the editor's box follows the stored text. After the AI wrote a translation, or History restored one, the box kept the old text and Save wrote it back.
- Checked and unaffected (no change): languages (the order and the switches already wait for their re-read; Add language starts empty); users and roles (inline forms seeded once on a settled read; their other controls send one change each); attribute links' Required, Filterable and cells (one change each).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- A control waits (greyed out for a moment) rather than sending values from an old read.
- A translation box the admin has typed in keeps the typed text when the stored text changes; an untouched box follows it.
- The Languages roster's rows and cards and the Strings and Data scope house style move to the next turn, G3d.

TESTS
- Part 0: AL-16 (e2e/admin-listings.spec.ts).
- Unit: src/lib/use-settling.test.tsx US-1, US-2 (NEW); src/lib/use-following-draft.test.ts FD-1..FD-3 (NEW).
- e2e/admin-categories-lifecycle.spec.ts — CT-44 NEW: three scratch siblings under a scratch parent; with the reorder door held, Move up, Move down and the editor's Save are greyed out mid-move; the second Move up lands from the new order.
- e2e/admin-attributes-links.spec.ts — AT-80 NEW: two scratch attributes linked to a scratch category; with the cards door held, the other card box and its Up are greyed out; both end on the card.
- e2e/admin-translations-console.spec.ts TR-16 and e2e/admin-translations-data.spec.ts TR-24: the box shows the AI's text, and in TR-16 the restored text after the restore.
- CT-44 and AT-80 lease one account each (the super admin). Not edited: every other test.
- On the base's code these four fail (the controls stay live; the box keeps the old text): they are the class's red. The supervisor cannot run them (no staging browser in its sandbox): CI on the final commit is the proof.

DOCS
- admin-listings.md (INC-559), categories.md, attributes.md, countries-console.md, coverage-console.md, locations-console.md, translations.md; the changelog; the roadmap (line 3; the G3c line; the G3d line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L4c applied)
- typecheck, format, lint (0 errors, 33 warnings), 671 unit tests (109 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check, the build and the bundle budget (231.1 KiB): all clean.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-24.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit ea8c54d9…, conclusion SUCCESS). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 37 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-24.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 31 files → each equal to:
  bedd953ffe783d1f3a24b726b403b6529e4ec650f110ea7e81280b6bcc371046  docs/_changelog.md
  3b19b81e2db163cb9e65d5729a2320a66a8aeba7c5230c3366b6e688527ae488  docs/features/admin-listings.md
  7e702384ddcdbb502748b4af515713a830bfc080af7c519b5412f48e7e041b3d  docs/features/attributes.md
  c1e7bbd1ed9899a203e3b1d4dff698d2492097767bb6e4853e30c7878063e130  docs/features/categories.md
  a0f6bea57454be44c3b2dc1fbf0230a128fcc85990cbd12aaeb0d4bd63915dd6  docs/features/countries-console.md
  ab517d5b9d74206e55cb9c837adea63ddbec7fbac93ed6d25112bc8216ee87b8  docs/features/coverage-console.md
  069a1926d79b8e22a97b90d0eb664347fbcd032b218e4ff0350df439b099a921  docs/features/locations-console.md
  1ddbcbd80a2953faf2a0bd2878f26506e7274d6bf3dd34e24f1dc5249812c583  docs/features/translations.md
  be91b1892c7098b2e057b48f9a97b7902dd14d15ea7e182a4d55f269a006041d  e2e/admin-attributes-links.spec.ts
  b7742a1c2f8e586becb01167ae445acac7e755d77b765eef9fc76b5519daf488  e2e/admin-categories-lifecycle.spec.ts
  85d8076029992bf3a501927f1eb82a7f965a25720be214e177277fef69c2093f  e2e/admin-listings.spec.ts
  01709679ad558dbc3fde184bbc66c80cab51d6313fac088b9d146b599218c477  e2e/admin-translations-console.spec.ts
  fbd6ff136681d451573e5adeefbf16227ca2285599020994b488e4d80b70d44b  e2e/admin-translations-data.spec.ts
  53204aeac084662cf733f6fa8ce65393f4faa4e3b6cd6b3128f91b376dba95a6  roadmap.md
  6c2c353ff6f18d83e52f803959db38f7e4bd5bc65fb1cb107c5f1069802cd8eb  src/features/admin-attributes/attributes-page.tsx
  bddfbaeea91cbffd6e4f75a96d274f0143c4e90bad051a164ff2d26ff63289ec  src/features/admin-attributes/category-attributes-dialog.tsx
  9024f665ce90c4b458d07d9dc0724739d222f3f83a1870b39823b6373e596c52  src/features/admin-attributes/use-attributes.ts
  02766f4a61843de1669b99e62125f87b6cf0bd642fc4da03e4634c3c8de54946  src/features/admin-categories/categories-page.tsx
  20da9dbe8ebf62d7f021ef73c8e0cf8182f3fe268de18a0f9084d52d388aef7d  src/features/admin-categories/category-dialogs.tsx
  430e6a152d5f76cc309f2bfd3c6d504c3e9a0a6421d2baade8895a89dfea3327  src/features/admin-categories/use-categories.ts
  2dd2d876afa85596b460f90ad481d30e741d33f4430a0e0c608cbd81f4d1b124  src/features/admin-countries/countries-page.tsx
  b3739b9ba41f9c8562712a2dfc716efe93115b90edcc524ea28fd06582a17178  src/features/admin-countries/country-verb-bar.tsx
  b81f8f565306ad8cce029099abc651a47dd1ec48ef5e7eb4608c7bbce9c1becd  src/features/admin-countries/use-countries.ts
  c3e0ee042461a9ce4fce712bdb2d669cf3d3c8ec0b81801d4a3b02df569b6b81  src/features/admin-coverage/coverage-page.tsx
  3e0bc83d08b096c252d7426c29224cf94f0415be81f857812d3fc54cf3bd6486  src/features/admin-coverage/use-coverage.ts
  0096852d35af32a670f0046bc5c859fa3688ac1c908f232b6871d08f3a26b758  src/features/admin-locations/location-verb-bar.tsx
  20e075e7088d2b12b270e8e0a1a55516c8ecb00a377fa2c99dd3a618809e888f  src/features/admin-locations/locations-page.tsx
  96a20789e1aafdad178f28e7cebf817466b459f49306130d0fb9daaf43a17f72  src/features/admin-locations/use-locations.ts
  08e7af6166cfe6c2fbdc5469ec557ebe25236c0336876f64df5fed48e4c8977b  src/features/admin/translations/data-scope.tsx
  208d84460662f5c49a532ba309fbffaf8839446befe3f59053c081fe5916ccc9  src/features/admin/translations/strings-page.tsx
  987165bb999c811812dcf98be1640199c170213c945c95a83cffe57d1f7f5a75  src/features/admin/translations/use-translations.ts
- (c) `ls src/lib/use-following-draft.test.ts src/lib/use-following-draft.ts src/lib/use-settling.test.tsx src/lib/use-settling.ts` → "No such file or directory" for each.

THE CARRIER — G3C-TURN-CARRIER-2026-10-11.md (38,370 bytes; sha256 8829b58691bcd5dc5522f138f42bf782fee18ce1996614604c1a54d9b25b8577; 96 sections)
- Its first line starts "G3c TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 37 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  455bb1fca53c4e16157270b3f1913025e91bcdb928d29b496ca64de7f460e145  docs/_changelog.md
  2bed79bca060d08dbe341e8e0dab3a84cac15fe1c53ae1fc80d581fe16fb3ecc  docs/features/admin-listings.md
  bbaf8de5d47dc38bf8b85df0b217ac844f41c4fdbc34a3bb4651f09c1d8d4a52  docs/features/attributes.md
  dfd9dae7cc758633a7ebbe59b8fe6060631843517d9906eaf795f02381379fd3  docs/features/categories.md
  35202506e59371f678d3218598ed21bda161292411e638dc3cda3288c190c33f  docs/features/countries-console.md
  72d461a09acec81ef5e133c0ea094c2d231fb3892c6bf915bbeec2f5e0c51881  docs/features/coverage-console.md
  75d9ac3f69da6e2cf2d441e0d6f3e096d70c4d938a67ec0d6d45bdc846075697  docs/features/locations-console.md
  faa28e29cac511b5e030a8d6cff0678962c77ab03de4ca9a4961d1dd34fefe27  docs/features/translations.md
  1161f431fdbb508247d9262d162fa21ef43da75ce3575b8e341b6ff8805ff68a  docs/generated/i18n-usage.json
  98b7b16aa021c79aaed9277230b253e5ec724cf463ce99502b46476acd90d236  e2e/admin-attributes-links.spec.ts
  e62d30da6769b03b9ae2560610a977bc19ded612d224cdb9d83fda0a4845c23e  e2e/admin-categories-lifecycle.spec.ts
  30ccb9de8ccb9fa87dfe34d4ac325f5deb10f2890b197c8103ebd62e296c5ead  e2e/admin-listings.spec.ts
  e9e3d9cf4fe87977d9701e0dd368f4cf7dfc0c6b5382797d6cf619edad4e39aa  e2e/admin-translations-console.spec.ts
  973bd380a660dba94e168023298c53532f505ea756271d3301e0e366543c9bc5  e2e/admin-translations-data.spec.ts
  1161f431fdbb508247d9262d162fa21ef43da75ce3575b8e341b6ff8805ff68a  public/i18n-usage.json
  55f863aa9d695139bc4a8920df1f25c1d63016079784307a35b842eada45d567  roadmap.md
  b8e2f594afb840118b3015dee784ce481f778cce5aeef27b9c186abfa664e054  src/features/admin-attributes/attributes-page.tsx
  86d5a6995b37b5b4b7c2671f5f38063f68e54fece8087dc1ce58c48391056726  src/features/admin-attributes/category-attributes-dialog.tsx
  54fa463f83299b0688cc058777297e9120f01c96a81b5ef7c4b0bbf5e3ac9092  src/features/admin-attributes/use-attributes.ts
  a5144067c316e01470556b3c1bc5cc38d9fd938f9d11faa09ecfb2724e826d68  src/features/admin-categories/categories-page.tsx
  afbee77ed8762eb1879fea7a4a19fb8186ec73e3e5d172d967fa59ffbda77274  src/features/admin-categories/category-dialogs.tsx
  3abf4e3ec1bdf66bcc1bd1ec7a71b13e7df5587b1c1625a6edbea2c196536588  src/features/admin-categories/use-categories.ts
  fe69485a1e9e50189b9e01a1f8fc74bfad0b6de325819ea5fa2d7f9c966cf6e2  src/features/admin-countries/countries-page.tsx
  658747189d2f65e56b1a42566caa101e6ed87b2520a47f68bd3b5a24d247584c  src/features/admin-countries/country-verb-bar.tsx
  cba1e38d7b6af021924beb7fa5f3f95831591a0c60cacac77441fcf9c0332c90  src/features/admin-countries/use-countries.ts
  95743448edc91c8ce4ba5b124f6c4d1603b607700630887015cbc8df3c25e232  src/features/admin-coverage/coverage-page.tsx
  14ab2b26d76706d92c842f2e601d3c685695a864cb17191d48eb1a8378647e66  src/features/admin-coverage/use-coverage.ts
  acef898f274065f938aa0117cd2795fc36c8a4749cf48a81972b880f82647337  src/features/admin-locations/location-verb-bar.tsx
  2155f4f2df8d34af00f07b99282692c4a328e88cae6565c8b45dc421ffb57e29  src/features/admin-locations/locations-page.tsx
  98e5957617add20f84e47effea3d15bb9208c275da081968a33295cde1bcbe0c  src/features/admin-locations/use-locations.ts
  78193dccffac1caf10cba7702a357bee4350f6ec6038db15cad149e4360a689b  src/features/admin/translations/data-scope.tsx
  af394bc8702e4d3c1d1e23464d2e128856d306210d1841bfea59453c1b389ca2  src/features/admin/translations/strings-page.tsx
  72c767772a6693e6ccab7c93eccc66dc89facc265c855f46bc5dee8737521dc0  src/features/admin/translations/use-translations.ts
  ecae6633c0b1693d18358a9bdaf87bb634cf55c0cecb3be68d0d9c020fa97233  src/lib/use-following-draft.test.ts
  26afe47a141c9acc9b3e855b6918d387d6622fa35be9b013fd5a1c23f1938f94  src/lib/use-following-draft.ts
  f8f34cab35eae7f179fb62dbb8bd4c4673ef1f04aa4b2cb7041a4225b152161a  src/lib/use-settling.test.tsx
  ba1005f212692c5996fd4679d86345d19f22e8dd764c4371b92518bba8148a8b  src/lib/use-settling.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 671 passed (109 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 37 sha256sum lines and the brief's.
- `git diff --name-only ea8c54d9` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only ea8c54d9 HEAD` too. Expect the 37 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
