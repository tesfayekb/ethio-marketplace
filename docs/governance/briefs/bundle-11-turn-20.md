# Bundle 11 — the Listings console, turn L3: one listing's page with its full history (D139): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L3 (2026-10-11). ONE TURN, ONE MIGRATION. 40 new strings (below). No package change.
Base: dev f7638ec8. This file is public: it is written as build instructions. Tier A: a new read door over every listing and its history (who reads what — the e-mail, staff names, a pin, an address), its migration and proofs. Tier B: the page.

ANSWERS TO TURN L2b
- Verified by diff of fe7ebe2b..f7638ec8 (with the platform's three intermediate pushes): the tree equals the supervisor's copy byte for byte — the 17 hashed paths and the brief (sha256 b26c4443…acd27b). CLEAN.
- CI on f7638ec8 (run 38137596774): SUCCESS; main promoted to f7638ec8; no flaky test. INC-550 and INC-551 close with this run. DEC-172, first green run: 32 minutes from start to report, shards 24.7 to 30.1 minutes.

THE OPERATOR'S CHOICE (D139, 2026-10-11): a page per listing with the full history of its changes — the seller's and the admins', with the reasons. Edit follows in turn L4.

WHAT THIS TURN BUILDS
- The door (the migration in the appendix; read it whole): `admin_listing_detail(listing)` — STABLE definer, listings:view; a draft answers "listing not found". One answer:
  - the listing: content (title, description, category, specs, price), status, tier, the severe screening flag, place and country, the photo count, and its dates (created, first posted, last posted, ends, the seller's own end date, renewals, last changed);
  - the seller: public name, a business's name, member since, the account's state; the e-mail only for holders of profiles:view;
  - the contact methods the seller shows, as true or false (never a number);
  - the history: the listing's revisions, newest first (at most 200, with the total) — when, the kind, who acted (the seller, a staff member or the system; a staff member's name only for holders of audit_logs:view), the columns changed, the values before and after for the content, price, status, place, tier and dates only (an exact pin, an address and the contact settings are named, never shown), a removed photo counted (never its storage path), and the reason and note an admin gave, from the seller's notice written in the same transaction.
  - scripts/public-surface-allowlist.txt names it (the guard requires every new grant to the signed-in role to be named).
  - src/integrations/supabase/types.ts: the door's line, where the generator puts it (between admin_list_users and admin_machine_entity_translation). If the platform regenerates the file after the migration, that is allowed: name it in the report.
- src/features/admin-listings/use-admin-listing.ts (NEW): `readAdminListing` — one call of the door; its refusal is thrown (F4); `detailOf` maps the answer.
- src/features/admin-listings/history.ts (NEW): the columns as the groups people read (title, description, category, specs, price, photos, place, map pin and address, contact settings, video, tier, the dates, other details); one line per revision (created, a status change, a renewal, an edit of named groups); the values kept, in reading order.
- src/features/admin-listings/listing-page.tsx (NEW) and its route src/routes/admin.listings_.$listingId.tsx (NEW; `/admin/listings/<id>`, inside the listings section's gate):
  - back to All listings (`listing-back`);
  - the heading (`listing-title`) with the status pill (`listing-status`), the tier when not Regular, the severe flag;
  - Preview as buyer (`listing-buyer-view`: the buyer's view, as Screening shows it); the moves the person holds (`listing-move-<move>`: Send back to review, Restore, Remove — the same dialog as the list, listings:enforce, never on the admin's own listing); View as seller (`listing-view-as`, impersonation:use); the line after a move (`listing-notice`);
  - Details (`listing-details`; each fact `listing-fact-<fact>`): the seller (the e-mail when the door gives it; "Open the seller's account" for profiles:view holders, `listing-open-seller`), member since, place · country, category, price, photos, first posted, last posted, ends, the seller's end date, renewals, tier, created, last changed, the listing id;
  - History (`listing-history`; each line `listing-history-entry-<n>`, newest first): when · who (`listing-history-who`), what (`listing-history-what`: "Status: Live → Removed", "Edited: Title, Price", "Created", "Renewed"), the reason and the note (`listing-history-reason`, `listing-history-note`), and for an edit "Show changes" (`listing-history-toggle`) with each value before and after; "The latest N of M changes" when there are more;
  - Details and History side by side from 1024 px; the page shows "This listing does not exist, or it is a seller's draft." for a draft's address (`listing-error`).
- src/features/admin-listings/listings-page.tsx: the title opens the page (`listing-row-<id>-open`); Open is first in every row's three-dots, so a holder of listings:view alone now sees the three-dots with Open alone.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The page is its own address, `/admin/listings/<id>`, so it can be opened, shared with a colleague and reloaded.
- A staff member's name in the history is shown to holders of audit_logs:view only, the audit log's own rule; others read "Staff".
- The history shows values for the content, price, status, place, tier and dates; an exact pin, an address and contact settings are named only ("Edited: Map pin and address"), and a removed photo is counted.
- The buyer's view opens over the page (as in Screening), rather than sitting on the page.
- Photos are counted, not shown: no page renders a stored photo before photo serving.

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `admin.listings.move.refused`)
- admin.listings.action.open — en "Open" · am "ክፈት"
- admin.listings.detail.back — en "All listings" · am "ሁሉም ማስታወቂያዎች"
- admin.listings.detail.notFound — en "This listing does not exist, or it is a seller's draft." · am "ይህ ማስታወቂያ የለም፣ ወይም የሻጭ ረቂቅ ነው።"
- admin.listings.detail.buyerView — en "Preview as buyer" · am "ገዢዎች እንደሚያዩት ይመልከቱ"
- admin.listings.detail.details — en "Details" · am "ዝርዝሮች"
- admin.listings.detail.history — en "History" · am "ታሪክ"
- admin.listings.detail.id — en "Listing id" · am "የማስታወቂያ መለያ"
- admin.listings.detail.memberSince — en "Member since" · am "አባል የሆነበት"
- admin.listings.detail.firstPosted — en "First posted" · am "መጀመሪያ የተለጠፈበት"
- admin.listings.detail.lastPosted — en "Last posted" · am "መጨረሻ የተለጠፈበት"
- admin.listings.detail.sellerEnd — en "Seller's end date" · am "ሻጩ የመረጠው ማብቂያ ቀን"
- admin.listings.detail.created — en "Created" · am "የተፈጠረበት"
- admin.listings.detail.changed — en "Last changed" · am "መጨረሻ የተቀየረበት"
- admin.listings.detail.photos — en "Photos" · am "ፎቶዎች"
- admin.listings.detail.severe — en "Removed for a severe reason" · am "በከባድ ምክንያት የተወገደ"
- admin.listings.detail.deactivated — en "The seller's account is deactivated" · am "የሻጩ መለያ ተቋርጧል"
- admin.listings.detail.openSeller — en "Open the seller's account" · am "የሻጩን መለያ ይክፈቱ"
- admin.listings.history.by.seller — en "Seller" · am "ሻጭ"
- admin.listings.history.by.staff — en "Staff" · am "ሠራተኛ"
- admin.listings.history.by.system — en "System" · am "ሲስተም"
- admin.listings.history.created — en "Created" · am "ተፈጠረ"
- admin.listings.history.status — en "Status: {from} → {to}" · am "ሁኔታ፦ {from} → {to}"
- admin.listings.history.renewed — en "Renewed" · am "ታድሷል"
- admin.listings.history.edited — en "Edited: {fields}" · am "ተስተካክሏል፦ {fields}"
- admin.listings.history.reason — en "Reason: {reason}" · am "ምክንያት፦ {reason}"
- admin.listings.history.note — en "Note: {note}" · am "ማስታወሻ፦ {note}"
- admin.listings.history.show — en "Show changes" · am "ለውጦቹን አሳይ"
- admin.listings.history.hide — en "Hide changes" · am "ለውጦቹን ደብቅ"
- admin.listings.history.before — en "Before" · am "በፊት"
- admin.listings.history.after — en "After" · am "በኋላ"
- admin.listings.history.empty — en "No changes are recorded yet." · am "እስካሁን የተመዘገበ ለውጥ የለም።"
- admin.listings.history.more — en "The latest {shown} of {total} changes." · am "ከ{total} ለውጦች የቅርብ {shown}።"
- admin.listings.history.photosRemoved — en "{count} removed" · am "{count} ተወግደዋል"
- admin.listings.history.field.description — en "Description" · am "መግለጫ"
- admin.listings.history.field.specs — en "Specifications" · am "ዝርዝሮች"
- admin.listings.history.field.pin — en "Map pin and address" · am "የካርታ ምልክትና አድራሻ"
- admin.listings.history.field.contact — en "Contact settings" · am "የመገናኛ ቅንብሮች"
- admin.listings.history.field.video — en "Video" · am "ቪዲዮ"
- admin.listings.history.field.renewals — en "Renewals" · am "እድሳቶች"
- admin.listings.history.field.other — en "Other details" · am "ሌሎች ዝርዝሮች"

TESTS
- Unit, NEW src/features/admin-listings/history.test.ts: LH-1 (the columns' groups; a pin, an address and contact settings named), LH-2 (a revision as created, a status change, a renewal or an edit), LH-3 (the values kept, in reading order), LH-4 (the door's answer mapped; an unknown actor is the system).
- e2e/admin-listings.spec.ts:
  - AL-16 (the door): a plain account refused; a viewer (listings:view alone) gets "listing not found" for a draft, the listing without the e-mail, the channels as false, a scratch seller's edit with the title's values and the pin and address named but never shown; after the super admin's removal (reason misleading), the newest line is the staff's, with the name for the super admin and without it for the viewer, and the reason;
  - AL-17 (the page, the super admin): opened from the title in All listings; the heading, the pill, the seller with the e-mail and the account link; Remove from the page with a reason — the line above, the pill, the history's newest line with its reason and "Staff"; Restore offered; Preview as buyer opens and closes; back to All listings;
  - AL-18 (the page, admin_panel:access and listings:view only): the facts without the e-mail or the account link, no move and no View as seller, a staff line without a name; a draft's address shows "not found";
  - AL-11: the three-dots holds Open alone.
  - The revisions AL-16 and AL-18 seed are scratch rows of their own scratch listings (G27).
- Not edited: every other test.

DOCS
- admin-listings.md (one listing's page), the changelog, the roadmap (line 3; the L3 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L2b applied)
- typecheck, format, lint (0 errors, 33 warnings), 660 unit tests (106 files; the action-label and test-id checks), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget: all clean. `MIGRATIONS_DIR=<a copy with the migration as 20261011000000_l3-check.sql> bash scripts/check-migrations.sh`: "Migration guard OK".
- The migration on a local PostgreSQL 16 copy (stand-ins for the tables it reads, turn L1's migration applied first): it applies and its proofs pass; six altered copies (a pin kept, the draft gate gone, the e-mail or the staff names ungated, anon granted, the door volatile) each fail on their proof. A trial: an admin's removal and restore, a seller's edit with a pin and an address, a system line; the admin reads the e-mail, the names, the reasons; a viewer reads none of those; the pin and the address appear only as column names; a draft is "listing not found".
- A local render (Chromium, a node build, mocked answers, nothing sent to a database) at 360, 768 and 1280 px, with every right and with listings:view alone: no sideways scroll; the history's "Show changes" with the price, title and description before and after.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-20.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit f7638ec8f6bfb07a703d5c1c4fb3c3baa4049575, conclusion SUCCESS). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs AL-16..AL-18 against a staging database without the door, so they fail there. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 17 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-20.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  f29515113d1a684a9bfbeb4041c28565e909a61a427def96ea0ecfca69510966  docs/_changelog.md
  5b64148cfddfe8ac73c8cd46031311612bf3badb47d5b790241e5bf7dd006c1a  docs/features/admin-listings.md
  66148148a4661a3761ffd3e1986d5dd1752852037b21afda155913d2cd9e0d61  e2e/admin-listings.spec.ts
  45a9bab449a75f714a1f66d4797cb94acaaa97f80c46b39a9438a05d44ec42a3  roadmap.md
  9a0aaef5469301b791dc5ba716e1d91822c08c5b31d28dde741c6bf301d9d0ec  scripts/public-surface-allowlist.txt
  89aac7e6d06c27d7e101cf2ae6544fda1bb5c109dece3e3ea2193fd357e55135  src/features/admin-listings/listings-page.tsx
  003ad0645ded2c22edd8c17b1fa54c474b3f4901c1c576ce258285cf2de076f4  src/i18n/locales/am.ts
  08f9cd355ce75c08cbf53d32388496058579c53e770ec348821b90f8c180634b  src/i18n/locales/en.ts
  f23e4ea65e403eec0eea9c263baccd598ee9b8123e654274bfbdef4a97c03e2c  src/integrations/supabase/types.ts
  1d5646075187672c3b186c39910bc52891e04302fae4996867167d9a4c6c3799  src/routeTree.gen.ts
- (c) `ls src/features/admin-listings/history.test.ts src/features/admin-listings/history.ts src/features/admin-listings/listing-page.tsx src/features/admin-listings/use-admin-listing.ts src/routes/admin.listings_.$listingId.tsx` → "No such file or directory" for each.
- On ethio-prod with your query tool (SELECT only):
- (d) `select count(*) from pg_proc where pronamespace = 'public'::regnamespace and proname = 'admin_listing_detail';` → 0
- (e) `select proname, pg_get_function_identity_arguments(oid) from pg_proc where pronamespace = 'public'::regnamespace and proname in ('has_permission', 'admin_move_listing') order by 1;` → admin_move_listing | p_listing_id uuid, p_to text, p_reason text, p_note text; has_permission | p_user_id uuid, p_resource text, p_action text
- (f) `select count(*) from information_schema.columns where table_schema = 'public' and ((table_name = 'listings' and column_name in ('id', 'title', 'description', 'status', 'tier', 'screening', 'category_id', 'location_id', 'home_country_code', 'price_mode', 'price_amount', 'price_currency', 'price_period', 'price_bp', 'price_negotiable', 'price_unit', 'price_unit_text', 'attributes', 'photos_soon', 'created_at', 'published_first_at', 'published_at', 'expires_at', 'poster_expires_at', 'renewed_count', 'updated_at', 'contact_pref', 'seller_id')) or (table_name = 'listing_photos' and column_name in ('listing_id')) or (table_name = 'locations' and column_name in ('id', 'name_en', 'name_am', 'country_code')) or (table_name = 'categories' and column_name in ('id', 'name_en', 'name_am')) or (table_name = 'profiles' and column_name in ('user_id', 'seller_alias', 'seller_type', 'business_name', 'created_at', 'account_status', 'display_name')) or (table_name = 'listing_revisions' and column_name in ('id', 'listing_id', 'seller_id', 'kind', 'before', 'after', 'actor', 'created_at')) or (table_name = 'seller_notices' and column_name in ('id', 'listing_id', 'reason', 'note', 'created_at')));` → 56
- (g) `select max(version) from public.migration_marks;` → 20261011210000

THE CARRIER — L3-TURN-CARRIER-2026-10-11.md (64,699 bytes; sha256 604420aed2e87e390c0bd571948082f20e9d6aeae6584c3c9ade7676727f469d; 35 sections)
- Its first line starts "L3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
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
  338640ed2ad88f87a80bb29c7fa5adac8c150ff126e541f2acc0296a0754087a  docs/_changelog.md
  d6d5264211d3193fdd3e434cca5347bdb3633801796a862b22c7de98284ce41a  docs/features/admin-listings.md
  45b381843a8458134a5573f7da84e4add6f47d1021bf460ebd8499cfaa23f0d5  docs/generated/i18n-usage.json
  4c5b2687ae2e82d5a30126e4402918258680c771f2e6938626112b2892efde2c  e2e/admin-listings.spec.ts
  45b381843a8458134a5573f7da84e4add6f47d1021bf460ebd8499cfaa23f0d5  public/i18n-usage.json
  fa335614e94ed4b6b107b628232e613413947add3e75e48c430a0ced8cd38e7f  roadmap.md
  3460cb8c9a7b22be334d29e6cf15d13b3644f461cf28a9c53673623c03cb459f  scripts/public-surface-allowlist.txt
  cd2f0fe28786022b2029a6d1fbe0460718850b1cfe2647802261d70cfd36cb1a  src/features/admin-listings/history.test.ts
  99c833234f44fd02e83648304045297b9479dadc9c6a6310c150e63fa5d9607d  src/features/admin-listings/history.ts
  3749b1bf7581724999d51859676858fae5147a16110170e267ede8bcfdf7d131  src/features/admin-listings/listing-page.tsx
  e196960b943c47079e2ae8e933b45fc577aa0575c3b37d67bc87527a65ecbe93  src/features/admin-listings/listings-page.tsx
  4d35ae10c2aa0be65c70116cfc6f081606ff7d843130b75c662a04d0c90f281a  src/features/admin-listings/use-admin-listing.ts
  39b32317c05af9cada9354032f721b09429efe79ad1f495434edc5d07a3c65da  src/i18n/locales/am.ts
  22a3ba3d1e58f273fa470977d7600bbc4e85325ae9341fba64b965b52074cbc3  src/i18n/locales/en.ts
  793832fe989c9c62dd8a3ef1d947530de684f83aedf19d66bcce519afa32a467  src/integrations/supabase/types.ts
  02c53392b1b49452c8c110fdf1224172203804e7adc607e1ff37992035d0716c  src/routeTree.gen.ts
  fb86fbd57fdbbfd445351f62e891c2c9b68891f7f70bde17d81f300eb95224fa  src/routes/admin.listings_.$listingId.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 660 passed (106 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn. AL-16..AL-18 need the door on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 1be60949815dd968f0148b2cb9c4b2c0e451b17e696bedcbc0dfa2ce5f878d80 (11,600 bytes, 210 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist holds its line):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under the name 20261011000000_l3-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261011210000 (the newest mark).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select proname, prosecdef, provolatile, proconfig, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where oid = 'public.admin_listing_detail(uuid)'::regprocedure;` → admin_listing_detail | t | s | {search_path=public} | f | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(g).
- The 17 sha256sum lines and the brief's.
- `git diff --name-only f7638ec8` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only f7638ec8 HEAD` too. Expect the 17 carrier paths, the brief and the one migration file (and types.ts again if regenerated).
- The 40 new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Send the executor nothing until the supervisor reads CI on the final commit.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11, the Listings console, turn L3 (2026-10-11). Tier A. One listing for the console: its page and its history
-- (D134, D138, D139; the operator's choice of 2026-10-11: a page per listing with the full history of its changes).
-- e2e-areas: admin-listings
-- A. admin_listing_detail(listing) — STABLE definer, listings:view; a draft answers "listing not found" (the seller's
--    private work, D136). One answer for the page:
--    - the listing: its content (title, description, category, specs, price), status, tier, the severe screening flag,
--      place and country, the photo count and its dates (created, first posted, last posted, ends, the seller's own
--      end date, renewed, last changed);
--    - the seller: the public name, a business's name, member since, the account's state; the e-mail only for holders
--      of profiles:view (the Users console's own rule);
--    - the contact methods the seller shows, as true or false (never a number);
--    - the history: the listing's revisions, newest first (at most 200, with the total): when, the kind (create, edit,
--      state), who acted — the seller, a staff member or the system — and the staff member's name only for holders of
--      audit_logs:view (the audit log's own rule); the fields changed; the values before and after for the listing's
--      content, price, status, place, tier and dates only (an exact pin, an address or contact settings are named,
--      never shown); a removed photo counted, never its storage path; the reason and note an admin gave, from the
--      seller's notice written in the same transaction.
-- B. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the door's behaviour
--    is proven by AL-16 and AL-17.

-- ===== A — one listing for the console =====
CREATE OR REPLACE FUNCTION public.admin_listing_detail(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid     uuid := auth.uid();
  v_row     public.listings%ROWTYPE;
  v_email   boolean;
  v_names   boolean;
  v_pref    jsonb;
  v_listing jsonb;
  v_seller  jsonb;
  v_history jsonb;
  v_total   integer;
  -- The values the history shows; every other changed column is named only.
  v_keep    text[] := ARRAY['title','description','category_id','attributes','price_mode','price_amount',
                            'price_currency','price_period','price_bp','price_negotiable','price_unit',
                            'price_unit_text','status','tier','location_id','expires_at','poster_expires_at',
                            'renewed_count','photos_soon','published_at','published_first_at'];
  v_noise   text[] := ARRAY['search_tsv','updated_at','draft_updated_at','draft_step'];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  v_names := public.has_permission(v_uid, 'audit_logs', 'view');
  v_pref := coalesce(v_row.contact_pref, '{}'::jsonb);

  SELECT jsonb_build_object(
           'id', v_row.id, 'title', v_row.title, 'description', v_row.description,
           'status', v_row.status, 'tier', v_row.tier,
           'severe', coalesce(v_row.screening->>'severe', 'false') = 'true',
           'category_id', v_row.category_id, 'category_name_en', c.name_en, 'category_name_am', c.name_am,
           'location_id', v_row.location_id, 'place_name_en', loc.name_en, 'place_name_am', loc.name_am,
           'country_code', coalesce(loc.country_code, v_row.home_country_code),
           'price_mode', v_row.price_mode, 'price_amount', v_row.price_amount,
           'price_currency', v_row.price_currency, 'price_period', v_row.price_period,
           'price_bp', v_row.price_bp, 'price_negotiable', v_row.price_negotiable,
           'price_unit', v_row.price_unit, 'price_unit_text', v_row.price_unit_text,
           'attributes', v_row.attributes, 'photos_soon', v_row.photos_soon,
           'photo_count', (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = v_row.id),
           'created_at', v_row.created_at, 'published_first_at', v_row.published_first_at,
           'published_at', v_row.published_at, 'expires_at', v_row.expires_at,
           'poster_expires_at', v_row.poster_expires_at, 'renewed_count', v_row.renewed_count,
           'updated_at', v_row.updated_at)
    INTO v_listing
    FROM (SELECT 1) one
    LEFT JOIN public.categories c ON c.id = v_row.category_id
    LEFT JOIN public.locations loc ON loc.id = v_row.location_id;

  SELECT jsonb_build_object(
           'id', v_row.seller_id,
           'alias', p.seller_alias,
           'business_name', CASE WHEN p.seller_type = 'business' THEN p.business_name END,
           'email', CASE WHEN v_email THEN u.email::text END,
           'member_since', p.created_at,
           'account_status', p.account_status)
    INTO v_seller
    FROM (SELECT 1) one
    LEFT JOIN public.profiles p ON p.user_id = v_row.seller_id
    LEFT JOIN auth.users u ON u.id = v_row.seller_id;

  SELECT count(*)::integer INTO v_total FROM public.listing_revisions r WHERE r.listing_id = v_row.id;

  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'at', h.created_at,
           'kind', h.kind,
           'by', CASE WHEN h.actor IS NULL THEN 'system' WHEN h.actor = h.seller_id THEN 'seller' ELSE 'staff' END,
           'by_name', CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END,
           'fields', (SELECT coalesce(jsonb_agg(k.key ORDER BY k.key), '[]'::jsonb)
                        FROM (SELECT jsonb_object_keys(h.b) AS key
                              UNION
                              SELECT jsonb_object_keys(h.a)) k
                       WHERE k.key <> ALL (v_noise)),
           'before', (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.b) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.b->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.b->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'after',  (SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
                        FROM jsonb_each(h.a) e WHERE e.key = ANY (v_keep))
                     || CASE WHEN jsonb_typeof(h.a->'photos_removed') = 'array'
                             THEN jsonb_build_object('photos_removed', jsonb_array_length(h.a->'photos_removed'))
                             ELSE '{}'::jsonb END,
           'reason', n.reason,
           'note', n.note)
         ORDER BY h.created_at DESC, h.id DESC), '[]'::jsonb)
    INTO v_history
    FROM (SELECT r.id, r.kind, r.actor, r.seller_id, r.created_at, r.listing_id,
                 CASE WHEN jsonb_typeof(r.before) = 'object' THEN r.before ELSE '{}'::jsonb END AS b,
                 CASE WHEN jsonb_typeof(r.after) = 'object' THEN r.after ELSE '{}'::jsonb END AS a
            FROM public.listing_revisions r
           WHERE r.listing_id = v_row.id
           ORDER BY r.created_at DESC, r.id DESC
           LIMIT 200) h
    LEFT JOIN public.profiles p ON p.user_id = h.actor
    LEFT JOIN LATERAL (
      SELECT sn.reason, sn.note
        FROM public.seller_notices sn
       WHERE sn.listing_id = h.listing_id AND sn.created_at = h.created_at
       ORDER BY sn.id
       LIMIT 1) n ON true;

  RETURN jsonb_build_object(
    'listing', v_listing,
    'seller', v_seller,
    'channels', jsonb_build_object(
      'phone',    coalesce((v_pref->'phone'->>'show')::boolean, false),
      'phone2',   coalesce((v_pref->'phone2'->>'show')::boolean, false),
      'telegram', coalesce((v_pref->'telegram'->>'show')::boolean, false),
      'whatsapp', coalesce((v_pref->'whatsapp'->>'show')::boolean, false)),
    'history', v_history,
    'history_total', v_total);
END $$;

REVOKE ALL ON FUNCTION public.admin_listing_detail(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_detail(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_detail(uuid) TO service_role;

-- ===== B — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_listing_detail(uuid)';
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- B1: a definer with a fixed search path, read-only; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public']
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'L3 B1: % is not a stable definer with its search path', v_fn;
  END IF;
  IF has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'L3 B1: % privileges', v_fn;
  END IF;

  -- B2: the gates in order, the e-mail and the staff names behind their own permissions, drafts never, values only
  -- for the kept columns, a removed photo counted.
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%v_row.status = ''draft''%has_permission(v_uid, ''profiles'', ''view'')%has_permission(v_uid, ''audit_logs'', ''view'')%CASE WHEN v_email THEN u.email::text END%CASE WHEN v_names AND h.actor IS NOT NULL AND h.actor <> h.seller_id THEN p.display_name END%e.key = ANY (v_keep)%jsonb_array_length(h.b->''photos_removed'')%' THEN
    RAISE EXCEPTION 'L3 B2: the door''s gates';
  END IF;
  IF v_def LIKE '%''pin_lat''%' OR v_def LIKE '%''street_address''%' OR v_def LIKE '%''contact_pref''%' THEN
    RAISE EXCEPTION 'L3 B2: the history must not keep the pin, the address or the contact settings';
  END IF;

  -- B3: no session is refused.
  PERFORM set_config('request.jwt.claims', '', true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_listing_detail(gen_random_uuid());
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'not signed in' THEN
    RAISE EXCEPTION 'L3 B3: a call with no session answered %', coalesce(v_err, 'nothing');
  END IF;

  -- B4: a scratch identity that holds no permission (no account row is written) is refused.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  v_err := NULL;
  BEGIN
    PERFORM public.admin_listing_detail(gen_random_uuid());
  EXCEPTION WHEN OTHERS THEN
    v_err := SQLERRM;
  END;
  IF v_err IS DISTINCT FROM 'permission denied' THEN
    RAISE EXCEPTION 'L3 B4: an identity with no permission got %', coalesce(v_err, 'nothing');
  END IF;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
