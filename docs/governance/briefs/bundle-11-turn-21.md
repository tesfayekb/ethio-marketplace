# Bundle 11 — the Listings console, turn L4a: Edit — the title, the description and the price (D140): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L4a (2026-10-11). ONE TURN, ONE MIGRATION. 8 new strings (below). No package change.
Base: dev 88c6ed8cc56b99fc6ad762962a2532e4ada0239a. This file is public: it is written as build instructions. Tier A: an admin's edit door redeclared (the rules it judges by), the All listings door redeclared (its columns), the migration and its proofs. Tier B: the edit form and the price's unit on the console's screens.

ANSWERS TO TURN L3
- Verified: dev 88c6ed8c holds the delivered tree, the migration as sent and the brief as sent. Nothing to fix.
- CI run 38140549121 on 88c6ed8c: the first attempt stopped at the preflight ("STAGING BEHIND") until the operator applied the migration on ethio-staging; the re-run after the apply: SUCCESS, every shard green, main promoted to 88c6ed8c.

THE OPERATOR'S CHOICE (D140, 2026-10-11): Edit in two turns — L4a (this turn) the title, the description and the price, each edit with a reason and a note for the seller; L4b the category and the specifications. Removing a photo waits until the console shows photos.

WHAT THIS TURN BUILDS
- The migration (the appendix; read it whole):
  - A. `admin_edit_listing`, redeclared whole from 20261011085637 with ONE change: the seller's content rules are judged through step 5 (`validate_listing_draft(v_prev.seller_id, 5::smallint, …)` — the category, the specifications, the price, the title and the description), and the seller's own end date and places are not sent (`NULL, NULL` in their places; the now-unused read of the places goes with them). INC-552: the door judged through the contact step (7) with the listing's end date and places, so a listing whose seller had set an end date less than a day away (or already past), whose place was later switched off, or whose contact settings fail today's rules could not be corrected by an admin at all. Every other line stands byte for byte.
  - B. `admin_list_listings`, redeclared whole from 20261011085637 with ONE change: each row also carries the price's unit (`price_unit`, `price_unit_text`). Its result columns change, so it is dropped and created again with the same arguments, attributes, body and grants (INC-553).
  - C. The proofs C1–C5.
  - src/integrations/supabase/types.ts: admin_list_listings' Returns gain `price_unit: string` and `price_unit_text: string` (after price_period, where the generator puts them). If the platform regenerates the file after the migration, that is allowed: name it in the report.
  - scripts/public-surface-allowlist.txt already names both doors; no new grant.
- src/features/admin-listings/use-admin-listing.ts: the listing's `priceUnit` and `priceUnitText`; `editAdminListing` (one call of the door; a refusal list is an answer, every other error is thrown as it came, so the second-factor guard can read it), `editAnswerOf`, `refusalsOf` (a specification's refusal is named by its key).
- src/features/admin-listings/edit-listing.ts (NEW): the reasons this edit offers (Misleading details, Contact details in the text, The site's rules, Other — the door's edit list without Wrong category, which comes with the category in L4b, and A photo, which comes with photo removal); the form's starting values (a price with none opens on the listing's market money, never the admin's); what is sent — only what changed, a price whole as the door stores it; what is missing before Save ("Nothing has changed." first, then the move's reason and note rules); the door's errors in words.
- src/features/admin-listings/reason-note.tsx (NEW): the reason and the note for the seller as one block; move-dialog.tsx now uses it (its testids are unchanged: `listings-move-reason-<reason>`, `listings-move-note`, `listings-move-note-field`).
- src/features/admin-listings/edit-form.tsx (NEW), the form (`listing-edit-form`): the title (`listing-edit-title`, at most 120 characters) and the description (`listing-edit-description`, at most 5,000), each with its count; the price — the seller's own price form (`StepPricing`, testids `post-price-*`), drawn only once the category's price rules (`get_posting_schema`) and the market money are read, with the basis the listing's specifications put in force; a failed read says so (`listing-edit-price-failed`) and leaves the price as it is; the reason (`listing-edit-reason-<reason>`) and the note (`listing-edit-note`); refusals under their fields, and a refusal naming a field the form does not draw (the category, a specification) listed above Save (`listing-edit-other-refusals`); the problem line (`listing-edit-problem`); Cancel (`listing-edit-cancel`) and Save changes (`listing-edit-save`).
- src/features/admin-listings/listing-page.tsx: Edit (`listing-edit`) for listings:enforce, never on the admin's own listing or a removed one; it opens the form in place of Details and History (the action buttons hide while it is open); Save goes through the second factor; saved — the form closes and the line above says "Saved. The seller is told what changed: Price, Title." (the door's fields); a refusal keeps the form open. INC-553: Details' price, History's price values (each with its own unit) and Preview as buyer print the unit.
- src/features/admin-listings/listings-page.tsx and use-admin-listings.ts: All listings' price prints with its unit (INC-553).
- src/features/admin-screening/use-screening.ts and screening-page.tsx: the queue reads `price_unit` and `price_unit_text` (granted columns) and the preview prints the price with its unit (INC-553).
- .github/workflows/ci.yml: DEC-172's re-tune — `PWTEST_SHARD_WEIGHTS: "148:174:195:235:148:157:195:231"` and its comment (both green runs since DEC-172 ran their slowest shard more than 4 minutes longer than their quickest; the sizes come from run 38140549121's timing and the test list with this turn's tests). docs/features/ci-guards.md records it. Every test still runs on every commit.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- DEC-173: an admin's edit is judged by the seller's content rules for what an admin can change (through step 5); the seller's own end date, places and contact settings are the seller's choices and never block an admin's correction. The spec's line is amended in the same turn.
- The form opens on the listing's own page, in place of Details and History; Cancel returns.
- The price is the seller's own price form, with the same rules and words (its one help line is written for sellers; it stays).
- This turn's reasons: Misleading details, Contact details in the text, The site's rules, Other.
- INC-553 is fixed on every console screen that prints a price: All listings (its door), the listing's page and the Screening queue's preview.
- The reason and note block is shared by the moves and the edit.
- DEC-172's re-tune, under its own rule (its five-run count goes on).

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts, after `admin.listings.history.field.other`)
- admin.listings.action.edit — en "Edit" · am "አርትዕ"
- admin.listings.edit.title — en "Edit this listing" · am "ይህን ማስታወቂያ ያርትዑ"
- admin.listings.edit.hint — en "Change the title, the description or the price. The seller is told what you changed, with your reason and note." · am "አርዕስቱን፣ መግለጫውን ወይም ዋጋውን ይቀይሩ። የቀየሩት ነገር ከምክንያትዎና ከማስታወሻዎ ጋር ለሻጩ ይነገራል።"
- admin.listings.edit.save — en "Save changes" · am "ለውጦችን አስቀምጥ"
- admin.listings.edit.nothing — en "Nothing has changed." · am "ምንም አልተቀየረም።"
- admin.listings.edit.error.removed — en "A removed listing is not edited. Restore it first." · am "የተወገደ ማስታወቂያ አይታረምም። መጀመሪያ ይመልሱት።"
- admin.listings.edit.priceFailed — en "This category's price rules did not load, so the price cannot be changed now. The title and the description can." · am "የዚህ ምድብ የዋጋ ደንቦች አልተጫኑም፤ ስለዚህ ዋጋው አሁን ሊቀየር አይችልም። አርዕስቱና መግለጫው ግን ይቀየራሉ።"
- admin.listings.edit.done — en "Saved. The seller is told what changed: {fields}." · am "ተቀምጧል። የተቀየረው ለሻጩ ይነገራል፦ {fields}።"
- Reused, unchanged: post.details.titleLabel, post.details.descriptionLabel, post.details.count, common.loading, common.cancel, the post.price.* and post.refusal.* words of the seller's form.

TESTS
- Unit, NEW src/features/admin-listings/edit-listing.test.ts: LE-1 (the form opens on the listing as it stands; nothing changed sends nothing; spaces around the title are no change), LE-2 (only what changed travels; a price travels whole), LE-3 (a price as the door stores it; a free listing's market money is no change), LE-4 (the reasons; the note's rules), LE-5 (the door's answers: done, refusals under their fields, errors in words).
- e2e/admin-listings.spec.ts:
  - AL-19 (the door, INC-552): a scratch listing whose seller's end date is two hours away takes an admin's title edit; after this test's own scratch city is switched off, another of its listings takes a description edit; a phone number in the title is still refused (contactInText) and nothing is written. Red against the door before this migration.
  - AL-20 (the page, the super admin): a scratch listing priced "per bag" (`price_unit` other, `price_unit_text` bag) shows "100 ETB per bag" in All listings and on its page; Edit opens the form; Save without a reason asks for one; the title and the amount (120) are saved with Misleading details and a note; the line above names Price and Title; the heading and the price ("120 ETB") change; History's newest line is "Edited: Title, Price" with the reason and the note; the seller's notice; the stored unit is released (null) with the new price.
  - AL-21 (the page): Save with nothing changed says "Nothing has changed."; a phone number in the title is refused under the title and nothing is written; Cancel closes the form.
  - AL-17: a removed listing shows no Edit. AL-18: no Edit for listings:view alone.
  - Every listing, place and role is a scratch row of the test (G27).
- Not edited: every other test.

DOCS
- admin-listings.md (Edit; INC-552; INC-553; the tests), the spec's content-rules line (amended, DEC-173), ci-guards.md (DEC-172's re-tune), the changelog, the roadmap (line 3).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L3 applied)
- typecheck, format, lint (0 errors, 33 warnings), 665 unit tests (107 files; the action-label and test-id checks), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget: all clean. `MIGRATIONS_DIR=<a copy with the migration as 20261011000000_l4a-check.sql> bash scripts/check-migrations.sh`: "Migration guard OK".
- The migration on a local PostgreSQL 16 copy (empty stand-ins for the tables it reads, turn L1's migration applied first): it applies and its proofs pass; on the door before it, proof C2 fails; with part B left out, proof C3 fails.
- A local render (Chromium, a node build, mocked answers, nothing sent to a database) at 360, 768 and 1280 px: the price "per bag" on the page; Edit opens the form; Save with nothing changed says so; no sideways scroll.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-21.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 88c6ed8c… with Conclusion SUCCESS (run 38140549121)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35): CI on any commit the platform pushes before the migration file exists runs AL-19 and AL-20 against a staging database without the change, so they fail there (AL-19's red is INC-552's red-first). That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- Between the migration and the next Publish, the published All listings page reads a door with two more columns; it ignores them, so nothing changes for anyone until the Publish.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 23 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-21.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 17 files → each equal to:
  87571a4eee30a39f6107ee47a251bdaf44b2acbff224bbd15cbbc6f76c131915  .github/workflows/ci.yml
  338640ed2ad88f87a80bb29c7fa5adac8c150ff126e541f2acc0296a0754087a  docs/_changelog.md
  d6d5264211d3193fdd3e434cca5347bdb3633801796a862b22c7de98284ce41a  docs/features/admin-listings.md
  e87e420dab3d541d679d9b83e12218a37b3467de50a618d790980de688f66541  docs/features/ci-guards.md
  66d7c5c659aaec902eda2689f3ec5ad83ce57c06aa6cb9d3e4648b2a8e08dd09  docs/governance/listings-console-spec.md
  4c5b2687ae2e82d5a30126e4402918258680c771f2e6938626112b2892efde2c  e2e/admin-listings.spec.ts
  fa335614e94ed4b6b107b628232e613413947add3e75e48c430a0ced8cd38e7f  roadmap.md
  3749b1bf7581724999d51859676858fae5147a16110170e267ede8bcfdf7d131  src/features/admin-listings/listing-page.tsx
  e196960b943c47079e2ae8e933b45fc577aa0575c3b37d67bc87527a65ecbe93  src/features/admin-listings/listings-page.tsx
  c4cb0a774390f13fa9e4c872b24354bd1c04fb3abe479cf4ebf975722abfa1f6  src/features/admin-listings/move-dialog.tsx
  4d35ae10c2aa0be65c70116cfc6f081606ff7d843130b75c662a04d0c90f281a  src/features/admin-listings/use-admin-listing.ts
  7732ab60d13e93f18ce2d4e123547a8927d0f54a666f58875ee790ff27c9cd8c  src/features/admin-listings/use-admin-listings.ts
  be6a3e82e1a98a3e3f2370de76c3efb033cf6c82a01b9f7293a312178e145791  src/features/admin-screening/screening-page.tsx
  148de9cd4f4f7c8edfd590a1876a6471dd1c57473b4f147f6969ebce7c8e0d1c  src/features/admin-screening/use-screening.ts
  39b32317c05af9cada9354032f721b09429efe79ad1f495434edc5d07a3c65da  src/i18n/locales/am.ts
  22a3ba3d1e58f273fa470977d7600bbc4e85325ae9341fba64b965b52074cbc3  src/i18n/locales/en.ts
  793832fe989c9c62dd8a3ef1d947530de684f83aedf19d66bcce519afa32a467  src/integrations/supabase/types.ts
- (c) `ls src/features/admin-listings/edit-form.tsx src/features/admin-listings/edit-listing.test.ts src/features/admin-listings/edit-listing.ts src/features/admin-listings/reason-note.tsx` → "No such file or directory" for each.
- On ethio-prod with your query tool (SELECT only):
- (d) `select p.proname, pg_get_function_identity_arguments(p.oid), p.provolatile, p.prosecdef, p.proconfig, md5(p.prosrc) from pg_proc p where p.pronamespace = 'public'::regnamespace and p.proname in ('admin_edit_listing', 'admin_list_listings') order by 1;` → two rows:
  - admin_edit_listing | p_listing_id uuid, p_changes jsonb, p_reason text, p_note text | v | t | {search_path=public} | de8faed40b41d2f768ba7bb247266a49
  - admin_list_listings | p_view text, p_search text, p_country text, p_category uuid, p_seller text, p_from date, p_to date, p_tier text, p_limit integer, p_offset integer | s | t | {search_path=public} | 46c077d129d13a39c5c207553612a19c
  (the md5 is the body of 20261011085637 as applied: the redeclarations start from it.)
- (e) `select position('7::smallint' in pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure)) > 0, position('price_unit' in pg_get_function_result('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure)) > 0;` → t | f
- (f) `select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'listings' and column_name in ('price_unit', 'price_unit_text', 'poster_expires_at', 'video_url', 'contact_pref');` → 5
- (g) `select max(version) from public.migration_marks;` → 20261012010000

THE CARRIER — L4A-TURN-CARRIER-2026-10-11.md (79,211 bytes; sha256 a2ffa792cadcbad6b72703c5055a8e83638b04dbb3b675af11b936501edc0d84; 41 sections)
- Its first line starts "L4a TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 23 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  18351e46ddadedc64c2ac74cb83a7ef4a1c908b8719c2e5a61f46868a03ca098  .github/workflows/ci.yml
  9524b5d47faa7ecc31e631a58fe31f40c83e21306c945ec846fbfe8a90b0eba4  docs/_changelog.md
  22bd179e7747b69380eafefeb000a2db3ebcae239d7c77fa4a1c613d1caedeee  docs/features/admin-listings.md
  55557f17e2e7d89719478f9a8c598b26890f2e73f38988a76d20ece68ea6a7ce  docs/features/ci-guards.md
  59b4be4608200e0ffe09e13fee4d9563fb4fd2cf75ff3b25f5ee83940301d6c2  docs/generated/i18n-usage.json
  ab2f67d82a7219654bb7de79dac37407f08011a838e6c3b44dc305db13651b12  docs/governance/listings-console-spec.md
  3ed055b6c6440ea9f91996d144c75d47ce57159596e4a26649ec117c77326272  e2e/admin-listings.spec.ts
  59b4be4608200e0ffe09e13fee4d9563fb4fd2cf75ff3b25f5ee83940301d6c2  public/i18n-usage.json
  2db562372085bb0c29fcc6ec2d20a704a5333f715a90711b47ab1bcb135b9a4f  roadmap.md
  09752bd7caa9fdbef403f060503c1335e6489c6ea56f356873caa1b4e3d11197  src/features/admin-listings/edit-form.tsx
  ce5a8460a6bd0116fa9bc474d4d1ed0ff7974901af9f6dbb5f9a539ca02402fc  src/features/admin-listings/edit-listing.test.ts
  e380486068f3e8119d7d9a10b07d7c7187761a553c62fa9ac533dc9ca5cad9f0  src/features/admin-listings/edit-listing.ts
  b1a9c03e5eae9983bacbe99bceb1db583e498076821dd1e19997df26622f4e46  src/features/admin-listings/listing-page.tsx
  94ce0e16334045e8db5954c67cbd43ebcbfe1f8b7be57bc03c11c5de5fff2ea9  src/features/admin-listings/listings-page.tsx
  525b09bdce1e25d446ecf5cbcc3849e9e9fa7af4a21455d97b253488cb0aa437  src/features/admin-listings/move-dialog.tsx
  92e279d28c89d7bdeb52273d00ef7529390f8f84624e028c184b3ca33837f313  src/features/admin-listings/reason-note.tsx
  254d0d4a700ac3bf001dbfd1899efd2c00a6084cd301773bbfc3f899a207e031  src/features/admin-listings/use-admin-listing.ts
  4a7908ffaa156738d3e226de3358601b7755a940f66aff99cd7af710835934ac  src/features/admin-listings/use-admin-listings.ts
  93c507bff5315843f8d2a2fb56b921043aaa4b30f3eb1f873d29cc604b78f5d1  src/features/admin-screening/screening-page.tsx
  09d9210eeb43af8cfde92b53dc3643a44e7fe5485e208d6eaaf913fa2e283f27  src/features/admin-screening/use-screening.ts
  94d6337aa20a0534ba988c3b4fa682d506e62ad14b251513fa9378faefdf047b  src/i18n/locales/am.ts
  15d2af1fb0fbff9a92997489095587a4f69a063ce45cac1d8514eb7686e44cf0  src/i18n/locales/en.ts
  b1085f8fbd7160edc8187f94aa44e7d281e95a93c2552015976b45ddf80437ff  src/integrations/supabase/types.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 665 passed (107 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn. AL-19 and AL-20 need the migration on ethio-staging, which the operator applies after the turn; CI on the final commit is the proof (and the local browser does not start, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is d00773cbff25537d0ba8e97c817bf79584ae8ddf67bc6b0b4a549e3ab82ca4cf (20,944 bytes, 387 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under the name 20261011000000_l4a-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261012010000 (the newest mark).
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select proname, prosecdef, provolatile, proconfig, has_function_privilege('anon', oid, 'EXECUTE'), has_function_privilege('authenticated', oid, 'EXECUTE') from pg_proc where oid in ('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure, 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure) order by 1;` → admin_edit_listing | t | v | {search_path=public} | f | t; admin_list_listings | t | s | {search_path=public} | f | t;
- `select position('5::smallint' in pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure)) > 0, position('price_unit_text' in pg_get_function_result('public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure)) > 0;` → t | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(g).
- The 23 sha256sum lines and the brief's.
- `git diff --name-only 88c6ed8cc56b99fc6ad762962a2532e4ada0239a` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 88c6ed8cc56b99fc6ad762962a2532e4ada0239a HEAD` too. Expect the 23 carrier paths, the brief and the one migration file (and types.ts again if regenerated).
- The 8 new strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Send the executor nothing until the supervisor reads CI on the final commit.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11, the Listings console, turn L4a (2026-10-11). Tier A. An admin's edit is judged on what an admin can
-- change, and the console prints a price with its unit (D140, DEC-173; INC-552, INC-553).
-- e2e-areas: admin-listings
-- A. admin_edit_listing, redeclared whole from 20261011085637 with one change: the seller's content rules are judged
--    through step 5 (the category, the specifications, the price, the title and the description), and the seller's
--    own end date and places are not sent. Before, the door judged through the contact step (7) with the listing's
--    end date and places, so a listing whose seller set an end date within a day (or one already past), whose place
--    was later switched off, or whose contact settings fail today's rules could not be corrected by an admin at all
--    (INC-552). Every other line stands byte for byte (the unused read of the places goes with the change).
-- B. admin_list_listings, redeclared whole from 20261011085637 with one change: each row also carries the price's
--    unit (price_unit, price_unit_text), so All listings prints "per kg" as the card does (INC-553). The result
--    columns change, so the function is dropped and created again with the same arguments, attributes and grants.
-- C. Proofs: catalogue reads and calls with no session or a scratch identity that holds nothing; the doors' behaviour
--    is proven by AL-19 (red against the door before this file), AL-20 and AL-4, AL-5, AL-12.

-- ===== A — an admin's content edit =====
CREATE OR REPLACE FUNCTION public.admin_edit_listing(
  p_listing_id uuid, p_changes jsonb, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_prev     public.listings%ROWTYPE;
  v_row      public.listings%ROWTYPE;
  v_key      text;
  v_note     text := nullif(btrim(coalesce(p_note, '')), '');
  v_val      jsonb;
  v_photos   uuid[] := ARRAY[]::uuid[];
  v_removed  jsonb := '[]'::jsonb;
  v_next     uuid;
  v_before   jsonb;
  v_after    jsonb;
  v_diff_a   jsonb := '{}'::jsonb;
  v_diff_b   jsonb := '{}'::jsonb;
  v_fields   text[];
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'enforce') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  PERFORM public.require_step_up_if_needed('listings', 'enforce');
  IF p_reason IS NULL OR p_reason NOT IN ('wrong_category','misleading','contact_in_text','photo','rules','other') THEN
    RAISE EXCEPTION 'unknown reason';
  END IF;
  IF p_reason = 'other' AND v_note IS NULL THEN
    RAISE EXCEPTION 'a note is required';
  END IF;
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RAISE EXCEPTION 'the note is too long';
  END IF;
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','category_id','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable','remove_photos') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  -- A draft is the seller's private work: it is not found here (D136).
  IF NOT FOUND OR v_prev.status = 'draft' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  IF v_prev.status = 'removed' THEN
    RAISE EXCEPTION 'a removed listing is not edited';
  END IF;
  IF v_prev.seller_id = v_uid THEN
    RAISE EXCEPTION 'your own listing is edited the seller''s way';
  END IF;

  IF p_changes ? 'remove_photos' THEN
    IF jsonb_typeof(p_changes->'remove_photos') <> 'array' THEN
      RAISE EXCEPTION 'remove_photos must be a list';
    END IF;
    SELECT coalesce(array_agg(DISTINCT x::uuid), ARRAY[]::uuid[]) INTO v_photos
      FROM jsonb_array_elements_text(p_changes->'remove_photos') x;
    IF EXISTS (SELECT 1 FROM unnest(v_photos) r(id)
                WHERE NOT EXISTS (SELECT 1 FROM public.listing_photos ph
                                   WHERE ph.id = r.id AND ph.listing_id = p_listing_id)) THEN
      RAISE EXCEPTION 'photo not found on this listing';
    END IF;
  END IF;

  -- The seller's content rules for what an admin can change (D140, DEC-173; INC-552): the category, the
  -- specifications, the price, the title and the description — validate_listing_draft through step 5, with every
  -- field the admin does not change read from the listing as it stands. The seller's own end date and places are not
  -- sent, and the contact step (7) is not reached: they are the seller's choices, judged when the seller saves.
  v_val := public.validate_listing_draft(v_prev.seller_id, 5::smallint,
    CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE v_prev.category_id END,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_prev.video_url,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, NULL, v_prev.contact_pref, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- ==== REQ-021 SCREENING GATEWAY (stage 2, DEC-145) ====
  -- The automatic screening call judges an admin's edit at this point, as it judges the seller's. Until stage 2
  -- nothing is called: the enforcer's edit is itself a human judgment, and a live listing stays live (D136).

  IF cardinality(v_photos) > 0 THEN
    SELECT coalesce(jsonb_agg(to_jsonb(ph) ORDER BY ph.display_order), '[]'::jsonb) INTO v_removed
      FROM public.listing_photos ph WHERE ph.listing_id = p_listing_id AND ph.id = ANY (v_photos);
    UPDATE public.listings SET cover_photo_id = NULL
     WHERE id = p_listing_id AND cover_photo_id = ANY (v_photos);
    -- The row goes; the file stays in storage until the listing's retention ends (the revision keeps its paths).
    DELETE FROM public.listing_photos WHERE listing_id = p_listing_id AND id = ANY (v_photos);
    SELECT ph.id INTO v_next FROM public.listing_photos ph
     WHERE ph.listing_id = p_listing_id ORDER BY ph.display_order LIMIT 1;
  END IF;

  UPDATE public.listings SET
    category_id      = CASE WHEN p_changes ? 'category_id' THEN (p_changes->>'category_id')::uuid ELSE category_id END,
    title            = v_val->>'title',
    description      = v_val->>'description',
    attributes       = v_val->'attrs',
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    cover_photo_id   = CASE WHEN cardinality(v_photos) > 0 THEN coalesce(cover_photo_id, v_next) ELSE cover_photo_id END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF jsonb_array_length(v_removed) > 0 THEN
    v_diff_b := v_diff_b || jsonb_build_object('photos_removed', v_removed);
    v_diff_a := v_diff_a || jsonb_build_object('photos_removed', to_jsonb(v_photos));
  END IF;

  -- The fields as the seller will read them.
  SELECT coalesce(array_agg(DISTINCT f ORDER BY f), ARRAY[]::text[]) INTO v_fields
    FROM (SELECT CASE
                   WHEN k = 'title' THEN 'title'
                   WHEN k = 'description' THEN 'description'
                   WHEN k = 'category_id' THEN 'category'
                   WHEN k = 'attributes' THEN 'specs'
                   WHEN k LIKE 'price%' THEN 'price'
                   WHEN k IN ('photos_removed','cover_photo_id') THEN 'photos'
                 END AS f
            FROM jsonb_object_keys(v_diff_a) k) g
   WHERE f IS NOT NULL;
  IF cardinality(v_fields) = 0 THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_prev.seller_id, 'edit', v_diff_b, v_diff_a, v_uid);
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.admin_edit', 'listing', p_listing_id::text,
            jsonb_strip_nulls(jsonb_build_object('fields', to_jsonb(v_fields), 'reason', p_reason, 'note', v_note)));
  INSERT INTO public.seller_notices (seller_id, listing_id, kind, fields, reason, note)
    VALUES (v_prev.seller_id, p_listing_id, 'admin_edit', v_fields, p_reason, v_note);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'fields', to_jsonb(v_fields));
END $$;

REVOKE ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_edit_listing(uuid, jsonb, text, text) TO service_role;

-- ===== B — All listings, with the price's unit =====
DROP FUNCTION IF EXISTS public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer);
CREATE OR REPLACE FUNCTION public.admin_list_listings(
  p_view text DEFAULT 'all', p_search text DEFAULT NULL, p_country text DEFAULT NULL,
  p_category uuid DEFAULT NULL, p_seller text DEFAULT NULL, p_from date DEFAULT NULL,
  p_to date DEFAULT NULL, p_tier text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT 0)
RETURNS TABLE (
  id uuid, title text, status text, tier text, severe boolean,
  seller_id uuid, seller_alias text, seller_business_name text, seller_email text,
  category_id uuid, category_name_en text, category_name_am text,
  place_name_en text, place_name_am text, country_code text,
  price_mode text, price_amount numeric, price_currency text, price_period text,
  price_bp integer, price_negotiable boolean, price_unit text, price_unit_text text,
  cover_paths jsonb, cover_storage_path text, photo_count integer,
  created_at timestamptz, published_at timestamptz, expires_at timestamptz, updated_at timestamptz,
  total_count bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_email    boolean;
  v_statuses text[];
  v_term     text := lower(btrim(coalesce(p_search, '')));
  v_id       uuid;
  v_seller   text := lower(btrim(coalesce(p_seller, '')));
  v_country  text := upper(btrim(coalesce(p_country, '')));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  v_statuses := CASE coalesce(p_view, 'all')
    WHEN 'live'    THEN ARRAY['active','reduced']
    WHEN 'waiting' THEN ARRAY['screening','held']
    WHEN 'ended'   THEN ARRAY['expired','sold']
    WHEN 'removed' THEN ARRAY['rejected','removed']
    WHEN 'all'     THEN ARRAY['screening','active','reduced','rejected','held','expired','sold','removed']
  END;
  IF v_statuses IS NULL THEN
    RAISE EXCEPTION 'unknown view';
  END IF;
  IF p_tier IS NOT NULL AND p_tier NOT IN ('premium','featured','regular') THEN
    RAISE EXCEPTION 'unknown tier';
  END IF;
  -- The seller's e-mail is read only by holders of profiles:view (the Users console's own rule).
  v_email := public.has_permission(v_uid, 'profiles', 'view');
  IF v_term ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    v_id := v_term::uuid;
  END IF;

  RETURN QUERY
  SELECT l.id, l.title, l.status, l.tier,
         coalesce(l.screening->>'severe', 'false') = 'true',
         l.seller_id, p.seller_alias,
         CASE WHEN p.seller_type = 'business' THEN p.business_name END,
         CASE WHEN v_email THEN u.email::text END,
         l.category_id, c.name_en, c.name_am,
         loc.name_en, loc.name_am, coalesce(loc.country_code, l.home_country_code)::text,
         l.price_mode, l.price_amount, l.price_currency::text, l.price_period,
         l.price_bp, l.price_negotiable, l.price_unit, l.price_unit_text,
         cover.paths, cover.storage_path,
         (SELECT count(*)::integer FROM public.listing_photos ph WHERE ph.listing_id = l.id),
         l.created_at, l.published_at, l.expires_at, l.updated_at,
         count(*) OVER ()
    FROM public.listings l
    LEFT JOIN public.profiles p ON p.user_id = l.seller_id
    LEFT JOIN auth.users u ON u.id = l.seller_id
    LEFT JOIN public.categories c ON c.id = l.category_id
    LEFT JOIN public.locations loc ON loc.id = l.location_id
    LEFT JOIN LATERAL (
      SELECT ph.paths, ph.storage_path
        FROM public.listing_photos ph
       WHERE ph.listing_id = l.id
       ORDER BY (ph.id = l.cover_photo_id) DESC, ph.display_order
       LIMIT 1) cover ON true
   WHERE l.status = ANY (v_statuses)
     AND l.status <> 'draft'
     AND (v_term = ''
          OR (v_id IS NOT NULL AND l.id = v_id)
          OR (v_id IS NULL AND position(v_term IN lower(l.title)) > 0))
     AND (v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country)
     AND (p_category IS NULL OR l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d))
     AND (v_seller = ''
          OR position(v_seller IN lower(coalesce(p.seller_alias, ''))) > 0
          OR (p.seller_type = 'business' AND position(v_seller IN lower(coalesce(p.business_name, ''))) > 0)
          OR (v_email AND position(v_seller IN lower(coalesce(u.email::text, ''))) > 0))
     AND (p_from IS NULL OR coalesce(l.published_first_at, l.created_at)::date >= p_from)
     AND (p_to IS NULL OR coalesce(l.published_first_at, l.created_at)::date <= p_to)
     AND (p_tier IS NULL OR l.tier = p_tier)
   ORDER BY coalesce(l.published_at, l.created_at) DESC, l.id DESC
   LIMIT LEAST(GREATEST(coalesce(p_limit, 25), 1), 100)
  OFFSET GREATEST(coalesce(p_offset, 0), 0);
END $$;

REVOKE ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_list_listings(text, text, text, uuid, text, date, date, text, integer, integer) TO service_role;

-- ===== C — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) =====
DO $proof$
DECLARE
  v_fn  text;
  v_def text;
  v_err text;
  v_who uuid := gen_random_uuid();
BEGIN
  -- C1: definers with a fixed search path (the edit volatile, the list stable); the signed-in role runs them, anon
  -- and PUBLIC do not.
  FOREACH v_fn IN ARRAY ARRAY[
      'public.admin_edit_listing(uuid,jsonb,text,text)',
      'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'] LOOP
    IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
       OR (SELECT p.proconfig FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'L4a C1: % is not a definer with its search path', v_fn;
    END IF;
    IF has_function_privilege('anon', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', v_fn, 'EXECUTE')
       OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE')
       OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                   WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
      RAISE EXCEPTION 'L4a C1: % privileges', v_fn;
    END IF;
  END LOOP;
  IF (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure) <> 'v'
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)'::regprocedure) <> 's' THEN
    RAISE EXCEPTION 'L4a C1: volatility';
  END IF;

  -- C2: the edit's gates in order as before; the content rules through step 5 with no end date and no places.
  v_def := pg_get_functiondef('public.admin_edit_listing(uuid,jsonb,text,text)'::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''enforce'')%require_step_up_if_needed(''listings'', ''enforce'')%v_prev.status = ''draft''%v_prev.status = ''removed''%v_prev.seller_id = v_uid%validate_listing_draft(v_prev.seller_id, 5::smallint,%v_prev.video_url,%NULL, NULL, v_prev.contact_pref, v_prev.attributes,%INSERT INTO public.listing_revisions%INSERT INTO public.audit_log%INSERT INTO public.seller_notices%' THEN
    RAISE EXCEPTION 'L4a C2: admin_edit_listing''s gates or its content rules';
  END IF;
  IF v_def LIKE '%7::smallint%' OR v_def LIKE '%v_prev.poster_expires_at%' OR v_def LIKE '%listing_locations%' THEN
    RAISE EXCEPTION 'L4a C2: the edit still judges the contact step, the seller''s end date or the places';
  END IF;
  IF v_def LIKE '%status%=%''screening''%' THEN
    RAISE EXCEPTION 'L4a C2: an admin''s edit must not move the listing';
  END IF;

  -- C3: the list's gates as before, and the unit in each row.
  v_fn := 'public.admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)';
  v_def := pg_get_functiondef(v_fn::regprocedure);
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''view'')%has_permission(v_uid, ''profiles'', ''view'')%CASE WHEN v_email THEN u.email::text END%l.price_unit, l.price_unit_text,%l.status <> ''draft''%' THEN
    RAISE EXCEPTION 'L4a C3: admin_list_listings''s gates or its unit';
  END IF;
  IF pg_get_function_result(v_fn::regprocedure) NOT LIKE '%price_negotiable boolean, price_unit text, price_unit_text text, cover_paths jsonb%' THEN
    RAISE EXCEPTION 'L4a C3: admin_list_listings''s columns';
  END IF;

  -- C4: with no session, both doors refuse before reading anything.
  PERFORM set_config('request.jwt.claims', '', true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSE
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'not signed in' THEN
      RAISE EXCEPTION 'L4a C4: the % door answered % to a call with no session', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;

  -- C5: a scratch identity that holds no permission (no account row is written) is refused by both.
  PERFORM set_config('request.jwt.claims', json_build_object('sub', v_who, 'role', 'authenticated')::text, true);
  FOREACH v_fn IN ARRAY ARRAY['list', 'edit'] LOOP
    v_err := NULL;
    BEGIN
      IF v_fn = 'list' THEN
        PERFORM * FROM public.admin_list_listings();
      ELSE
        PERFORM public.admin_edit_listing(NULL, '{"title":"x"}'::jsonb, 'misleading');
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_err := SQLERRM;
    END;
    IF v_err IS DISTINCT FROM 'permission denied' THEN
      RAISE EXCEPTION 'L4a C5: the % door answered % to an identity with no permission', v_fn, coalesce(v_err, 'nothing');
    END IF;
  END LOOP;
  PERFORM set_config('request.jwt.claims', '', true);
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
