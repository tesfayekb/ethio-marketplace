# Bundle 11 — the Listings console, turn L2b: the row's moves, View as seller and the tick-boxes: brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L2b (2026-10-11). ONE TURN. No migration, no database change, no package change. 38 new strings and three changed Amharic values (below).
Base: dev fe7ebe2b. This file is public: it is written as build instructions. Tier A: who may move a listing and how (the door `admin_move_listing` from L1 decides: listings:enforce with a fresh second factor — F3), the step-up flow for a set, View as seller (the existing impersonation). Tier B: the page's layout.

ANSWERS TO TURN L2
- Verified by diff of cf7187ab..fe7ebe2b (with the platform's two intermediate pushes, dae815f3 and dc58166a): the tree equals the supervisor's copy byte for byte — the 18 hashed paths and the brief (sha256 eeba1956…a2bf94). CLEAN as to the brief.
- CI on fe7ebe2b (run 38134773102): FAILURE — AL-11 on both projects (part 0); every other test passed, AL-10 and AL-12 among them. The fast lane failed AL-11 too. DEC-172's weights held: the shards ran 26.1 to 29.2 minutes (equal slices had run 21 to 32); the run took 31 minutes. Flaky on retry: PW-173 (shard 8) — part 0.
- Your report: as expected, browser run unavailable (INC-506).

PART 0 — FROM CI ON fe7ebe2b (run 38134773102)
- INC-550 — AL-11 (e2e/admin-listings.spec.ts), both projects, both attempts: `listings-search` never appeared. The test's scratch role held listings:view alone; the admin shell opens only for admin_panel:access (src/routes/admin.tsx reads ADMIN_PANEL_PERMISSION), as admin-screening.spec.ts's scratch holder already grants. The supervisor's test, not the page.
  Fix: AL-11's scratch role holds admin_panel:access and listings:view; its title says "listings:view and no other listing right". What it proves is unchanged; turn L2b adds its no-moves checks (below).
- INC-551 — PW-173 (e2e/post-wizard-where.spec.ts), flaky three times in seven days (2026-10-08, and twice on 2026-10-11: "[e2e:l2a] no anchor in QX: no row", "no anchor in QU: no row"). It picks "another open market" from every open market, and another test's scratch market (a user-assigned code such as QX) is open for a moment, may have no anchor yet, and is reaped by its own test (G28). INC-507 (PW-173 red on 2026-10-08) may share this cause.
  Fix: e2e/helpers/locations.ts — `openMarketCodes({ realOnly: true })` leaves out user-assigned codes (`isUserAssigned`, e2e/helpers/countries.ts); without the option it reads as before. PW-173 and, by the same class (G29), LT-11 (e2e/admin-locations.spec.ts) use it.

WHAT THIS TURN BUILDS (the approved spec, docs/governance/listings-console-spec.md: "The row" and "Remove and Restore"; the doors exist since L1)
- src/features/admin-listings/move-reasons.ts (NEW) — what a move asks for:
  - the moves and where each takes a listing: Remove → removed; Restore (a removed listing) → screening; Send back to review (active or reduced) → screening;
  - each move's reasons, exactly the door's lists in its order (Remove: prohibited, misleading, duplicate, contact_in_text, photo, rules, other; Restore: removed_in_error, appeal_accepted, other; Send back: wrong_category, misleading, contact_in_text, photo, rules, other);
  - the note: required for other, at most 500 characters;
  - the door's refusals as sentences (listing not found; your own listing; illegal move; the severe flag; rateLimited; permission denied).
- src/features/admin-listings/use-admin-listings.ts — `moveAdminListing(listing, to, reason, note)` calls `admin_move_listing` and throws the door's error as it came (the step-up guard reads it).
- src/features/admin-listings/move-dialog.tsx (NEW) — `MoveDialog` (testid `listings-move-dialog`, in the house modal of the consoles): the move's title (one listing, or "{count} listings"); what the move does; the reasons as pills (`listings-move-reason-<reason>`); the note (`listings-move-note`, at most 500 characters); a problem line (`listings-move-problem`) — no reason chosen, or Other without a note, or the door's refusal; Cancel and the move's button (`listings-move-confirm`, red for Remove). Nothing is sent until both are as the door wants them; nothing closes on a refusal (F4).
- src/features/admin-listings/listings-page.tsx:
  - the row's three-dots (`listing-actions-<id>`): Send back to review (active, reduced), Restore (removed), View as seller (holders of impersonation:use; the existing impersonation form in a dialog, `listings-view-as-dialog`, with its reason and second factor) and, last and red, Remove (any listing not removed). Moves are offered to holders of listings:enforce, and never on the admin's own listings (the door changes those the seller's way);
  - tick-boxes for holders of listings:enforce; the selection bar's Remove (`listings-bulk-remove`, the ticked listings that can be removed) and Restore (`listings-bulk-restore`, the ticked removed ones); the ticks clear when the view, the search, a filter or the page changes;
  - one dialog and one second factor for a set (the page sits inside the step-up gate), then the door once per listing, each logged on its own; a listing already moved is not sent again if the second factor is asked half-way; a refusal of one listing does not stop the others, the rate dial's refusal stops the set;
  - when nothing moved, the dialog stays open with the refusal; otherwise a line above the table (`listings-notice`) counts what moved and names the first refusal;
  - cards up to 1280 px and the table from there (`cardUntil="xl"`; L2 had 1024 px): with the tick-boxes and the three-dots the table needs a wide desktop. Column widths retuned.
- The operator's Amharic (2026-10-11): admin.listings.view.live and admin.listings.status.active «በቀጥታ» (they were «በገጹ ላይ ያሉ» and «በገጹ ላይ»); admin.listings.col.posted «የተለጠፈ» (was «የተለጠፈበት»).
- Open and Edit come with turn L3.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Restore shows on a removed listing in any view, not only in the Removed view: a removed listing found in All has its way back in the same place.
- The admin's own listings show no move: the door refuses them, so the menu does not offer them.
- In a set, one refused listing does not stop the others; the line above the table says how many moved and why the first one did not.
- View as seller opens the existing impersonation form (its reason, its second factor, its read-only session) in a dialog: one way into impersonation stays the only way.
- The note is labelled "Note for the seller": the seller's notice keeps it, and My ads (stage 4) will show it.
- Cards up to 1280 px; the table from 1280 px.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `admin.listings.empty`)
- admin.listings.action.sendBack — en "Send back to review" · am "ለግምገማ መልስ"
- admin.listings.action.remove — en "Remove" · am "አስወግድ"
- admin.listings.action.restore — en "Restore" · am "ወደነበረበት መልስ"
- admin.listings.action.viewAsSeller — en "View as seller" · am "እንደ ሻጩ ይመልከቱ"
- admin.listings.move.remove.title — en "Remove this listing?" · am "ይህ ማስታወቂያ ይወገድ?"
- admin.listings.move.remove.titleMany — en "Remove {count} listings?" · am "{count} ማስታወቂያዎች ይወገዱ?"
- admin.listings.move.remove.hint — en "It leaves the site at once. The seller is told the reason and your note." · am "ወዲያውኑ ከገጹ ይወርዳል። ለሻጩ ምክንያቱና ማስታወሻዎ ይነገራል።"
- admin.listings.move.restore.title — en "Restore this listing?" · am "ይህ ማስታወቂያ ወደነበረበት ይመለስ?"
- admin.listings.move.restore.titleMany — en "Restore {count} listings?" · am "{count} ማስታወቂያዎች ወደነበሩበት ይመለሱ?"
- admin.listings.move.restore.hint — en "It goes back to Waiting for review, never straight to the site. The seller is told." · am "ወደ ግምገማ መጠበቂያ ይመለሳል እንጂ በቀጥታ ወደ ገጹ አይወጣም። ለሻጩ ይነገራል።"
- admin.listings.move.sendBack.title — en "Send this listing back to review?" · am "ይህ ማስታወቂያ ለግምገማ ይመለስ?"
- admin.listings.move.sendBack.hint — en "It leaves the site until a reviewer approves it again. The seller is told." · am "ገምጋሚ እንደገና እስኪያጸድቀው ድረስ ከገጹ ይወርዳል። ለሻጩ ይነገራል።"
- admin.listings.move.reason — en "Reason" · am "ምክንያት"
- admin.listings.move.note — en "Note for the seller" · am "ለሻጩ ማስታወሻ"
- admin.listings.move.noteHint — en "Required when the reason is Other; at most 500 characters." · am "ምክንያቱ ሌላ ከሆነ ግዴታ ነው፤ ቢበዛ 500 ፊደላት።"
- admin.listings.move.pickReason — en "Choose a reason." · am "ምክንያት ይምረጡ።"
- admin.listings.move.noteRequired — en "Write a note: the reason is Other." · am "ማስታወሻ ይጻፉ፦ ምክንያቱ ሌላ ነው።"
- admin.listings.move.noteTooLong — en "The note is longer than 500 characters." · am "ማስታወሻው ከ500 ፊደላት ይረዝማል።"
- admin.listings.reason.prohibited — en "Prohibited item" · am "የተከለከለ ዕቃ"
- admin.listings.reason.misleading — en "Misleading details" · am "አሳሳች መረጃ"
- admin.listings.reason.duplicate — en "Duplicate ad" · am "የተደገመ ማስታወቂያ"
- admin.listings.reason.contact_in_text — en "Contact details in the text" · am "በጽሑፉ ውስጥ የመገናኛ መረጃ"
- admin.listings.reason.photo — en "A photo" · am "ፎቶ"
- admin.listings.reason.rules — en "The site's rules" · am "የጣቢያው ደንቦች"
- admin.listings.reason.other — en "Other" · am "ሌላ"
- admin.listings.reason.wrong_category — en "Wrong category" · am "የተሳሳተ ምድብ"
- admin.listings.reason.removed_in_error — en "Removed in error" · am "በስህተት የተወገደ"
- admin.listings.reason.appeal_accepted — en "Appeal accepted" · am "ይግባኝ ተቀባይነት አግኝቷል"
- admin.listings.move.error.notFound — en "This listing no longer exists." · am "ይህ ማስታወቂያ ከእንግዲህ የለም።"
- admin.listings.move.error.own — en "Your own listing is changed the seller's way." · am "የራስዎ ማስታወቂያ የሚቀየረው እንደ ሻጭ ነው።"
- admin.listings.move.error.illegal — en "This listing's state changed after the list loaded. Reload the page." · am "ዝርዝሩ ከተጫነ በኋላ የዚህ ማስታወቂያ ሁኔታ ተቀይሯል። ገጹን እንደገና ይጫኑ።"
- admin.listings.move.error.severe — en "A listing removed for a severe reason is restored by a super admin only." · am "በከባድ ምክንያት የተወገደ ማስታወቂያ የሚመለሰው በዋና አስተዳዳሪ ብቻ ነው።"
- admin.listings.move.error.rateLimited — en "Too many changes in the last hour. Try again later." · am "ባለፈው ሰዓት ውስጥ ብዙ ለውጦች ተደርገዋል። ቆይተው እንደገና ይሞክሩ።"
- admin.listings.move.error.denied — en "You do not hold the right to do this." · am "ይህን ለማድረግ ፈቃድ የለዎትም።"
- admin.listings.move.done.remove — en "Removed: {count}." · am "የተወገዱ፦ {count}።"
- admin.listings.move.done.restore — en "Back in Waiting for review: {count}." · am "ወደ ግምገማ መጠበቂያ የተመለሱ፦ {count}።"
- admin.listings.move.done.send_back — en "Sent back to review." · am "ለግምገማ ተመልሷል።"
- admin.listings.move.refused — en "Not changed: {count}. {reason}" · am "ያልተቀየሩ፦ {count}። {reason}"
Changed (Amharic only, the operator's words):
- admin.listings.view.live — am "በቀጥታ"
- admin.listings.status.active — am "በቀጥታ"
- admin.listings.col.posted — am "የተለጠፈ"

TESTS
- Unit, NEW src/features/admin-listings/move-reasons.test.ts: MR-1 (each move's reasons equal the door's lists, read from the L1 migration file), MR-2 (the moves per state), MR-3 (a reason first; Other needs a note; at most 500 characters), MR-4 (the refusals' sentences).
- Unit, NEW src/features/admin-listings/move-dialog.test.tsx: MD-1 (nothing sent without a reason), MD-2 (Other needs a note; then the reason and the trimmed note are sent), MD-3 (each move offers its own reasons; the note holds 500 characters), MD-4 (the door's refusal is shown in the dialog).
- e2e/admin-listings.spec.ts (the card twin below 1280 px now):
  - AL-11 also: listings:view alone shows no three-dots and no tick-box;
  - AL-13 (the super admin): Remove from the row — the dialog asks for a reason first; then the pill "Removed", one `listing.admin_remove` audit row (from active, to removed, reason misleading); then Restore — the pill "Waiting for review", one `listing.admin_restore` row; the seller's two notices;
  - AL-14 (the super admin): Send back to review with Other — the note is asked for, then the status is screening, and the note is in the audit row and the seller's notice;
  - AL-15 (the super admin): two ticked listings removed with one dialog ("Remove 2 listings?"), two audit rows; in the Removed view both ticked and restored, two `listing.admin_restore` rows; the view is then empty.
  - Every listing is a scratch row of the file (G27); every row is found by its id or its own seller (G28).
- Part 0: AL-11's role (INC-550); PW-173 (e2e/post-wizard-where.spec.ts) and LT-11 (e2e/admin-locations.spec.ts) read `openMarketCodes({ realOnly: true })` (INC-551). The helper's default is unchanged, and those two are its only callers.
- Not edited: every other test.

DOCS
- admin-listings.md (the moves and the tick-boxes; INC-550; INC-551), the changelog, the roadmap (line 3; the L2b line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L2 applied)
- typecheck, format, lint (0 errors, 33 warnings), 656 unit tests (105 files; the action-label check), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget: all clean.
- A local render (Chromium, a node build, mocked rows, nothing sent to a database) at 360, 768, 1024 and 1280 px with every permission: the three-dots of a live listing hold Send back to review, View as seller and Remove; two ticked rows show Restore and Remove in the selection bar; the dialog for Remove shows the seven reasons, and Other without a note says so; no sideways scroll at any width, dialog open or closed.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-19.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit fe7ebe2bd2ab8e1eac573e8516529105d8746c0a, conclusion FAILURE (part 0)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-19.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 11 files → each equal to:
  44e77d5804db3213737edcfffa7cc5181b72d6a4f397a7d807278af29b99c08a  docs/_changelog.md
  c430b2d7e6bd4f7ad2fd84a71019586278b1e34e9711f5926c90e9a7b71e5dab  docs/features/admin-listings.md
  b7c71a36b9d54502490a122fbd5d517be0c92f5043588bfcff9a44f9ec2d1416  e2e/admin-listings.spec.ts
  9fc3fe603f026a1738df78e6c24bfc440a2e9f29f28a9509d182074d8f81fccf  e2e/admin-locations.spec.ts
  a53b5d6dd2918e231d9997fc04d722424839c1b21e30f3fea5376252d4516b02  e2e/helpers/locations.ts
  103c291f74f5709d0b28994535054b5be54640586b90dbb66e776df8105a5187  e2e/post-wizard-where.spec.ts
  003ca36eb9a4ce7272b522ab60a2d28aa4bde0137c6d4490cad9ecc89663d6c9  roadmap.md
  1c79ca4a6077862e193969a121ad161dc5b6face5fb5743e21d046824b159a18  src/features/admin-listings/listings-page.tsx
  de6c4e560241ab42ffc77805205600dc03f133cc36475200633e2184b8fadca5  src/features/admin-listings/use-admin-listings.ts
  d1fb74fb149499e927ce6ca66cad2660fe87fe257f0ead813bb8383ef016b663  src/i18n/locales/am.ts
  7b6c3695e9c650a59e0f52277acbba8cefe7f8a3d20ccf0bfb099aa6183d4143  src/i18n/locales/en.ts
- (c) `ls src/features/admin-listings/move-dialog.test.tsx src/features/admin-listings/move-dialog.tsx src/features/admin-listings/move-reasons.test.ts src/features/admin-listings/move-reasons.ts` → "No such file or directory" for each.

THE CARRIER — L2B-TURN-CARRIER-2026-10-11.md (67,246 bytes; sha256 fe7a34f7807e44a1d7622cb3b773533e1f2617f29810f4b6c2bfc9a7ee09a7dd; 27 sections)
- Its first line starts "L2B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 17 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  f29515113d1a684a9bfbeb4041c28565e909a61a427def96ea0ecfca69510966  docs/_changelog.md
  5b64148cfddfe8ac73c8cd46031311612bf3badb47d5b790241e5bf7dd006c1a  docs/features/admin-listings.md
  a309b8e7fb063f7b8860e353b62b8b8128aa5f3fbd3235f84cebe1bdf7d50b2a  docs/generated/i18n-usage.json
  66148148a4661a3761ffd3e1986d5dd1752852037b21afda155913d2cd9e0d61  e2e/admin-listings.spec.ts
  38ba15ed71ec17cdb16afb41bca33f1f5c348f146906bba5ff6e1a7ea24e0cfd  e2e/admin-locations.spec.ts
  1aa3cfcd5ff5b97fcc62b734560f046fbbb2a458306e6f7a5ae733c1b2ea924a  e2e/helpers/locations.ts
  7f7f7a378882c55b64ed81e00b3c415ae9c7403c2b7f3ec6dd27e862ee9cd88e  e2e/post-wizard-where.spec.ts
  a309b8e7fb063f7b8860e353b62b8b8128aa5f3fbd3235f84cebe1bdf7d50b2a  public/i18n-usage.json
  45a9bab449a75f714a1f66d4797cb94acaaa97f80c46b39a9438a05d44ec42a3  roadmap.md
  89aac7e6d06c27d7e101cf2ae6544fda1bb5c109dece3e3ea2193fd357e55135  src/features/admin-listings/listings-page.tsx
  7dd3fd6e6b24b6b5c2255fd07f8ef8b7ec14b7430c5e198f26c89d73e0d82b52  src/features/admin-listings/move-dialog.test.tsx
  c4cb0a774390f13fa9e4c872b24354bd1c04fb3abe479cf4ebf975722abfa1f6  src/features/admin-listings/move-dialog.tsx
  cc09719eb1cfda0241ec2aa46ab95b7d85cd41cd1cd5303486237aa25a08b356  src/features/admin-listings/move-reasons.test.ts
  46ce36243f88639f95885f0ad4b3af5111cba09802440c1859395848c8b16ee6  src/features/admin-listings/move-reasons.ts
  7732ab60d13e93f18ce2d4e123547a8927d0f54a666f58875ee790ff27c9cd8c  src/features/admin-listings/use-admin-listings.ts
  003ad0645ded2c22edd8c17b1fa54c474b3f4901c1c576ce258285cf2de076f4  src/i18n/locales/am.ts
  08f9cd355ce75c08cbf53d32388496058579c53e770ec348821b90f8c180634b  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 656 passed (105 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — try once: `bun run e2e:local e2e/admin-listings.spec.ts`, then `bun run e2e:local e2e/post-wizard-where.spec.ts -g PW-173` and `bun run e2e:local e2e/admin-locations.spec.ts -g LT-11`. If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506).

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only fe7ebe2b` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only fe7ebe2b HEAD` too. Expect 18 paths: the hashed paths and the brief.
- The 38 new strings and the three changed Amharic values, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing while CI runs (with eight shards, ESTIMATE about 25 to 30 minutes); then Publish after the supervisor reads CI green; then the supervisor's walk lines.
```
