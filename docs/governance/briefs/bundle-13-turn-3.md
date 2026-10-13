# Bundle 13 — photos, turn 3: turn 1's red (INC-608) and the operator's catalogue walk (INC-609, the shared Other under every parent) first; then buyers see the seller's photos — the feed names each card's cover, links for a visitor without a session, the card draws it (INC-606): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D159) — TURN 3 (2026-10-13). ONE TURN, ONE MIGRATION. One new string. No package change.
Base: dev 974744fd (turn 2's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (`feed_page` redeclared whole, its proofs); the links route's path for a visitor without a session (src/routes/api/media/photo-links.ts, src/server/media/links.ts); the console's attribute editor and its two cascade previews (INC-609).
Tier B: the posting form's parent rule (src/features/posting/reset-scope.ts, INC-609), SV-3's read order (INC-608), the feed's card parser (src/features/feed/feed-page.ts), the new hook src/features/feed/use-card-photos.ts, the feed list (src/components/marketplace/feed.tsx), the listing card (src/components/marketplace/listing-card.tsx), the tests (PP-21; LK-4, FP-11, LC-3), the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 2 verified: dev 974744fd equals the supervisor's tree with the saved brief (sha256 0950eb1e…, equal) and the migration 20261013195204_07794c11 (byte-equal to the appendix apart from its mark 20261014080000). CLEAN, pending CI on 974744fd.
- Your CI read named turn 1's red (86a43919). It is INC-608, read by the supervisor from the evidence files, and its fix is PART 0 of this turn. CI on turn 2's commit carries the same red until this turn lands; that is expected.
- The security warnings (183 → 186): listed in this turn's report, chat only (THE REPORT, last line).

WHY THIS TURN
- First, INC-608 — turn 1's CI red (run 38449595471 on 86a43919; the only failures, in both projects and the fast lane): SV-3 expected the meter's audit rows as [alert, alert, off] and read [alert, off, alert]. At 100 % one call writes the alert and the switch-off in one transaction, so both rows carry the same instant; `audit_log.id` is random and the test ordered by `created_at` alone, so equal times came back in the index's order. The meter is right; the test asserted an order the rows do not have.
- Then INC-609 — the operator's walk of the catalogue's batch 2 (2026-10-13): "I DONT SEE OTHERS OPTION" under Series (Laptops, HP and MSI). The importer keeps an Other only under the value `other` (`optionOtherValue`), so the catalogue's lists that hang under another answer (Series under Brand, Model under Brand: series-computers, series-phones, model-phones) now carry ONE Other with no parent, and their per-parent Others are switched off. The form's list keeps only the options under the chosen parent (`optionBelongsToParent`, src/features/posting/reset-scope.ts), so the shared Other is never offered, and a seller whose model is not listed cannot say so. The door already counts it under every parent (`validate_listing_draft`: "'other' counts, and is a valid answer"), as does the form's own required-model rule. The console has the same gap: its two cascade previews compare `option.parent` with the chosen parent, and the definition editor shows a dependent list's rows by parent only, so a row with no parent is hidden.
- INC-606 (the operator, 2026-10-13: "after publishing I dont see the photo in listing page after approval of the advert. It only has default category image"). No buyer sees a seller's photo anywhere yet, for three reasons:
  - the listing card draws the category's picture always (src/components/marketplace/listing-card.tsx: `photoUrl={null}`, its comment deferring photos "until the photo clean-up bundle");
  - `feed_page` returns no photo;
  - `/api/media/photo-links` refuses a caller without a session, so a visitor could not be given a link even if the card asked for one.

WHAT THIS TURN BUILDS
- PART 0 — INC-608: e2e/admin-services.spec.ts — `auditActions` orders by `created_at`, then by `action` (rows one call writes share its instant, and the alert sorts before the switch-off), with a comment saying why. The expected list is unchanged.
- PART 0b — INC-609, the shared Other under every parent:
  - src/features/posting/reset-scope.ts — `optionBelongsToParent(option, parentValue)` takes `{ value, parent }` and also answers true for the shared Other (value `other`, no parent). One rule for the form's list, the reset rules and the console;
  - src/features/admin-attributes/attribute-dialogs.tsx (the editor's cascade preview) and src/features/admin-attributes/category-attributes-dialog.tsx (the category's cascade preview) — each keeps an option when it is not switched off (`active !== false`) and `optionBelongsToParent` holds;
  - src/features/admin-attributes/components/attribute-option-rows.tsx — a dependent list gets a last group for its rows with no parent: "Options for every answer" (`admin.attributes.dependsOn.optionsForEvery`; test id `option-group-flat`, its add button `option-add-flat`). The door (`admin_upsert_attribute`) already accepts a row with no parent;
  - e2e/helpers/posting.ts — `seedFoldSet(categoryId, { sharedOther: true })` adds the shared Other last in the model list. The option is off by default, so no other caller's list changes;
  - the strings (below), the usage maps, docs/features/posting.md and docs/features/attributes.md (an INC-609 section each), and docs/features/ai-services.md (SV-3's line).
- PART 1 — the migration (the appendix; read it whole): `feed_page(uuid, uuid, jsonb, integer)`, redeclared WHOLE from its live definition (20261009060703, the one file that declares it; census (d) checks the live fingerprint first), with one change, marked in the body:
  - each card carries `coverPhotoId`: the listing's first stripped photo by `display_order` (the cover, D154), or null — `(SELECT p.id FROM listing_photos p WHERE p.listing_id = f.listing_id AND p.exif_stripped ORDER BY p.display_order LIMIT 1)`;
  - the header is unchanged (plpgsql, STABLE, SECURITY DEFINER, search_path public), and its REVOKE and GRANT are restated;
  - proofs B1–B3: the header, the grants (anon and authenticated may read), the body. PP-21 proves its answer on an active scratch listing.
- src/server/media/links.ts:
  - `variantsOf(raw)` — a request's `variants`: undefined gives every readable size; a list must name only `card`, `thumb` or `cover` (each once), and anything else is null;
  - `signPhotoRows(service, rows, variants = READ_VARIANTS)` signs only the sizes asked for.
- src/routes/api/media/photo-links.ts:
  - a request WITH a bearer is read as the caller, as before;
  - a request WITHOUT one first passes a dial per address: `consume_rate_limit('photo-links:address', <cf-connecting-ip, else the first x-forwarded-for, else "unknown">, RATE_LIMIT_PHOTO_LINKS_PER_HOUR (600), '1 hour')`. It is then read as the ANONYMOUS role (the publishable key, no session), so `listing_photos_public_read` alone decides: only an active listing's stripped photos;
  - `variants` that is not as above is the refusal `variants` / `badShape` (200, `ok: false`, as every refusal of this route).
- src/features/feed/feed-page.ts — `FeedListing.coverPhotoId: string | null`. A card without the field (a door from before this migration) is read as null; one that is neither a string nor null is refused.
- src/features/feed/use-card-photos.ts (NEW) — `useCardPhotos(cards)` asks the links route for the covers WITHOUT a bearer, `variants: ["card", "thumb"]`, in groups of 20 in the feed's order (a new page of cards adds a group). It keeps them 45 minutes and answers a photo id's card-size link, or null.
- src/components/marketplace/feed.tsx — `const coverOf = useCardPhotos(cards)`; each `ListingCard` gets `photoUrl={coverOf(listing.coverPhotoId)}`.
- src/components/marketplace/listing-card.tsx — a `photoUrl` prop (default null) passed to `ListingPicture`; its comment says what it draws now.
- Tests:
  - e2e/photo-pipeline.spec.ts — PP-21 (NEW), and `seedActiveListing` added to its `./helpers/categories` import. PP-13's no-session line changes with the contract: it expected 401, and now a request without a session is answered 200 with NO link for a draft's photo. The deny case is kept, and its comment says why (G38: the assertion follows a changed contract, it is not loosened);
  - src/server/media/links.test.ts — LK-4 (NEW);
  - src/features/feed/feed-page.test.ts — FP-11 (NEW), and `coverPhotoId: null` in its card helper;
  - src/components/marketplace/listing-card.test.tsx — LC-3 (NEW), and `coverPhotoId: null` in BASE.
- docs/features/media-pipeline.md and docs/features/feed-engine.md (a turn-3 section each), the changelog, and the roadmap (line 3 and the turn-3 line).

STRINGS
- NEW `admin.attributes.dependsOn.optionsForEvery`: "Options for every answer" · «የሁሉም መልሶች አማራጮች»

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-608: SV-3's tie is broken by the action's name. The order across calls is still asserted.
- INC-609: when the seller changes the parent, a chosen shared Other stays with its words, because it is offered under the new parent too (DEC-144 rule 4, unchanged).
- INC-609: the console's previews show what a seller is offered, so they also leave out a switched-off option. The editor's group "Options for every answer" holds a dependent list's rows with no parent.
- A visitor's links come through the same route, read as the anonymous role, not through a public bucket. The bucket stays private (D151), and only what the public rule allows is signed.
- 600 link requests an hour per address. A card page asks once per 20 cards, so a person never meets the limit; a scraper does.
- A card asks for the card and thumb sizes only (about 32 KB a card, D157). It never asks for the 1 MB cover.
- The buyer's gallery (D161: the main photo large, the thumbnails beside it on a computer and under it on a phone, a full-screen viewer) is turn 4.
- A request without a session is answered 200 with what the anonymous role may read (nothing for a draft's photo), not 401, because a visitor IS a legitimate caller now; PP-13 follows.
- The new ids: PP-21, PW-188, LK-4, FP-11, LC-3, reset-scope (xiv) and (xv).

TESTS
- E2E, first the two fixes:
  - SV-3 (edited, its read order only; INC-608);
  - PW-188 (NEW, e2e/post-wizard-specs.spec.ts, after PW-21): a fold set with the shared Other; under the first make the model list is exactly ["", md1, md2, "other"], under the second ["", md3, "other"]; choosing Other opens its box (`post-attr-other`), and the typed words are stored as `{ value: "other", text }`;
  - AT-31 (edited, e2e/admin-attributes-editor.spec.ts): the shared Other is added in the group "Options for every answer"; the cascade preview shows it under alfa and under beta; it is stored with no parent (the stored list now reads "/other", "alfa/alfa-1", "alfa/alfa-2", "beta/beta-1").
- E2E: PP-21 (NEW):
  - a seller's active scratch listing gets a photo through the upload route, and a draft gets another;
  - `/api/feed?category=<scratch leaf>` names the listing's `coverPhotoId`;
  - a request without a session for both photos (`variants: ["card", "thumb"]`) answers card and thumb links for the listing's photo, and nothing for the draft's;
  - `variants: ["original"]` is refused `variants` / `badShape`;
  - on /c/<slug> the listing card's picture is a signed `listing-photos` link.
  PP-13 (edited, its no-session line): 200 with no link for a draft's photo, where it expected 401. Not edited: every other test. The census of the tests that assert this route's answers (G37): PP-13 and PP-21 are the only ones that call it without a session. The census for INC-608: SV-3 is the only test that asserts an order of audit rows. The census for INC-609: no other test seeds a parentless `other` in a list that hangs under another answer, and `seedFoldSet`'s other callers (PW-21, PW-22 and two more in e2e/post-wizard-specs.spec.ts) keep their lists.
- Unit: reset-scope (xiv) and (xv), LK-4, FP-11, LC-3 (NEW); 756 in all.
- The migration's proofs B1–B3. The supervisor applied the migration to a local PostgreSQL 16 copy with function bodies checked: it applied, and its proofs passed.
- Red first: SV-3 is red on the base in CI (run 38449595471). reset-scope (xiv) fails on the base (the supervisor ran it); (xv) is a positive control (an Other was always kept on a move). On the base, PW-188 fails at the first list (no "other"), and AT-31 at the group "Options for every answer" (absent). PP-21 proves new behaviour (no red run needed, G38); on the base it fails at the feed's `coverPhotoId`, which is absent.
- Leases: PP-21 and PW-188 lease one seller each; AT-31 signs in as the super admin, as before.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 974744fd with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 756 unit tests (127 files);
  - the usage maps (they match);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with this migration as 20261013210000_b13t3-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK". The existing allowlist line for `feed_page` covers its restated grant.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 2's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. Until he Publishes, the published site reads the new field and ignores it.
- The expected red window (G35): CI on any commit pushed before the operator applies the migration on ethio-staging runs PP-21 against the old feed, and PP-21 fails at the feed's `coverPhotoId`. That is expected and is not fixed. Any other red in that window is NOT expected. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 30 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 29 files → each equal to:
  762a65841e38e923628e0525b1638676c7109ac86783278726889748ede62c1e  docs/_changelog.md
  6fe7b6853b5be5e1deb3e48577fe2feb7e936d33b2b647095b7d7ed03bc96e30  docs/features/ai-services.md
  c6fbd2d31d425b2808618c6029b4172a5a997f9f9a74fe7013ab0ad8251a98ee  docs/features/attributes.md
  306894285f25e183735049df125ca739269c0b0c901344e2750c5644fc2b1efe  docs/features/feed-engine.md
  47d525d30e156290002d60a81a198f4afeafe726a508c0a32a72e73860a98776  docs/features/media-pipeline.md
  834447ecdedf92bca06e0e57cb2b0a871effd66c4225e2338136d42ec04fe2b8  docs/features/posting.md
  ff4dd8756883324c5407f17cbebace6daec50896fad8b3280f6b27b5e1a229e8  docs/generated/i18n-usage.json
  7cbc8dfdb8d53d8bf761dc71d8fe48d2bf61403244b3f1b2555f188841b1f26a  e2e/admin-attributes-editor.spec.ts
  13c72fcc18a061b143e84db6177a2a0f2d6f35d7e26d0cc94211ddbc97dd65d7  e2e/admin-services.spec.ts
  d36f9e111a1c2f6f0a0ba7c9beca9ed95bc8503d6427f380e38f62d3a2a3db9d  e2e/helpers/posting.ts
  1f25b84cf130a8a2141327e0713cf86ce0ae44c338156737ef67cdccfcd536a1  e2e/photo-pipeline.spec.ts
  8690d666f538c61f29a29abd062d8f696da8f5bbf0321ad8aa173332762a02b0  e2e/post-wizard-specs.spec.ts
  ff4dd8756883324c5407f17cbebace6daec50896fad8b3280f6b27b5e1a229e8  public/i18n-usage.json
  0067d99e78ed525842dcc7009318418b8bdd4d80d1041370fe966d006264b478  roadmap.md
  7ff0af8be4dcd2798766a9395f86cf04f4b49f27e3a328c4152ff7f53d630e28  src/components/marketplace/feed.tsx
  bfd3dc986fd10c92a8f5b293771d08cfffc64034a03336cbce147af858562dff  src/components/marketplace/listing-card.test.tsx
  e1647a921397b83943d453db3c0ae1a3a2b6115880e22bf7d8a2c3f0dd3a5fb0  src/components/marketplace/listing-card.tsx
  230133a359e846cafa8ce5b1dedf641b2ede192dfb8a4aed20d6d4a401eb6571  src/features/admin-attributes/attribute-dialogs.tsx
  86d5a6995b37b5b4b7c2671f5f38063f68e54fece8087dc1ce58c48391056726  src/features/admin-attributes/category-attributes-dialog.tsx
  da65f91883bf9c726640d64cf574e56bb78aed1aeffd9c5d69cd4e7108da926d  src/features/admin-attributes/components/attribute-option-rows.tsx
  62496721b4cb0bc3fc8a0179e54f47e459f7a7455cbe8753a4828caa42ab1017  src/features/feed/feed-page.test.ts
  4e21898ae00a612102a4a085c7c27bd097ee413731cddfae76987b35f5eaf6cd  src/features/feed/feed-page.ts
  4794eeadaeaf7556abc7391c9af94e198ab4990da8fd26f00322b4c706c2c670  src/features/posting/reset-scope.test.ts
  dc78f6183352f1232be5265f99040625077f3e803d556c58ba76de0b1bed7b01  src/features/posting/reset-scope.ts
  817e980bf45fccf388d0b79c962952c1896db2685ae39b0e9cb8b9a932cda476  src/i18n/locales/am.ts
  617c88937ad8d59adaa18ce17b891591dc099d9118c04ef0e288868205234d1a  src/i18n/locales/en.ts
  a7c3d5401421ec6f0675eab795a86ecf01051c3d6a30cb95b918cfdfcee65912  src/routes/api/media/photo-links.ts
  4f87f3f23bbc706ef9a3e6fd23406e981ede88f82f298afb8011803306ffc142  src/server/media/links.test.ts
  7b56532e3b88666d3320dfe01dc8d6503f64db4308ba0e1d26882bdb54bdb152  src/server/media/links.ts
- (c) `ls src/features/feed/use-card-photos.ts` → no such file.
- On ethio-prod with your query tool (SELECT only):
- (d) `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure;` → bd092ba5498d15447e99fe974bf296bc | 5412 | s | t | {search_path=public}. Any other value is a STOP.
- (e) `select max(version) from public.migration_marks;` → 20261014080000 (turn 2's mark).

THE CARRIER — B13T3-TURN-CARRIER-2026-10-13.md (35,867 bytes; sha256 b973b54a0dd1d1b5ee188df81a37d33840f57e7e2284700d1879921b162ac2bd; 59 sections)
- Its first line starts "B13T3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 30 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  514c10c3292c55fdb57cc2d9c27efb5543b0479f79222fdd07d3d19908aa208a  docs/_changelog.md
  c98f4e22b3f2628014f3063a7b58deed16774a2cdad5a878a64b8c48c400dade  docs/features/ai-services.md
  593d98d62953105a1bd0086950b315abc266bad09846509ff5c0291140deff7e  docs/features/attributes.md
  79d5116652bd3213cf675e580b314756451bd09f90d57ec0721de4ca951abdb4  docs/features/feed-engine.md
  f982c432adc4bcfa4bf9f44595d31e2500ed17b43bd909f9b7907dd4787b94f9  docs/features/media-pipeline.md
  1cdcca08d153b4451c504efe5f05bb271460526263628e377d7a031754327e35  docs/features/posting.md
  5571f41884000d8ec7a8714d15d792ec881c5e5e925efdb90a36d82b591bb2cb  docs/generated/i18n-usage.json
  7455c79cf660281630a127f55c8bb52a2a09575200e40aab395ea9dbf572ce51  e2e/admin-attributes-editor.spec.ts
  dbad9746c1912d64d9e5c456e17b56774bcfd246e2d9b776743c2c45173659ad  e2e/admin-services.spec.ts
  275e39ea2c9c0ab4dd781cbd0d2e9c28447ab41658fd7bb00f0fc0b1add6e9f4  e2e/helpers/posting.ts
  043a50b6124ba32310c2b949a2b42a82d09af169e4f31ec74c9093e96ec6054c  e2e/photo-pipeline.spec.ts
  66b3d3d59151c8b4233239180b45e70cea6aa6c36034e9abbe4fa6f8d103f6fc  e2e/post-wizard-specs.spec.ts
  5571f41884000d8ec7a8714d15d792ec881c5e5e925efdb90a36d82b591bb2cb  public/i18n-usage.json
  a059c3d05b402923730b1388cf7dcb9cf99008c58b7f2d350613d224c93f098d  roadmap.md
  126bdcb06d463751a526c358f5f4d1135e3af2432893e829d458e08ebebe73bf  src/components/marketplace/feed.tsx
  f1bce844e0a759b66112959f352ba8cb5d908e55b474668ad625b81a486d3729  src/components/marketplace/listing-card.test.tsx
  14dbd1b62bfe797b3a927450244c0f221b30e0e82f6c2b838fed5ca69d68b6f5  src/components/marketplace/listing-card.tsx
  7a62fa58f48215ef57d24ab95b31081bfb37f7fce3f08194f3322b2f2ad91366  src/features/admin-attributes/attribute-dialogs.tsx
  3b5aaedbc5f18c09465108b3837fd82ed4f2dab0090ab074cbd1e37410081ed0  src/features/admin-attributes/category-attributes-dialog.tsx
  ee378bed1d2f6e95e2611ef9dfb892fe02cd74abe8038ef5e0dff60480ad5728  src/features/admin-attributes/components/attribute-option-rows.tsx
  0d5e6f4e2c593f0d9592b935512aa111e9638b3614a955c2e1346d154aa93b76  src/features/feed/feed-page.test.ts
  da374bc1bdd43bfb307b0cfdf36c6ff04018da3fff17eb7a96881479f1083da4  src/features/feed/feed-page.ts
  3a66bead0a7e71de26232c5e7b5fe5e33173a938abb2d5d0097aaece65d1a509  src/features/feed/use-card-photos.ts
  2235e1f520856fdb960cf80e22d17d6a7be3e21dff3d4bb886cf73ac43a6e326  src/features/posting/reset-scope.test.ts
  78278c8ebba6bfdea45eff40adfdfe91216af71e3608f1778e4b014e1e913481  src/features/posting/reset-scope.ts
  541af8e8e81a614bb64926d4a7450f4feefd220ed0a422357dde715c5192a117  src/i18n/locales/am.ts
  ee12382e08c15f1c55d6bec7d76416a6a4af76c31c48e37e19817f13910f5322  src/i18n/locales/en.ts
  c69c8402bf3570e8aa151b0d9e3fe9a7a0a24d2581c8a55df0b686b7238b65c3  src/routes/api/media/photo-links.ts
  25f9619f9c5018b124b3f290f7521cdff1491a238ddebb7237c42055e3dec17a  src/server/media/links.test.ts
  d66eb04e3bffe84c2bf1fc7fbeb82e4b541c07522e0e94a768a69375b4869d68  src/server/media/links.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t3.log` — 756 passed (127 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs SV-3, PW-188, AT-31, PP-21 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 4dd9ad9877092b9281f7116708c99fff729fe4fc25fbed2469f5177adaca1ef1 (8,961 bytes, 205 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013210000_b13t3-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014080000 (the newest mark): if the reading gives 20261014080000 or less, use 20261014090000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure;` → b4b80c65891a37e5f88c7eabe77ee53d | 5763 | s | t | {search_path=public};
- `select has_function_privilege('anon', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE'), has_function_privilege('authenticated', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE');` → t | t.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 30 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 30 carrier paths, the brief and the one migration file (and types.ts if regenerated). `git ls-files src/features/feed/use-card-photos.ts`, so the new file is shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: the new key, its English and its Amharic, as written (G43).
- Your last report counted 186 security warnings in the database tool, up from 183. In this report ONLY (never in a file — the repository is public), list each warning that names an object turn 1 or turn 2 created or changed (`ai_features`, `ai_spend_days`, `ai_feature_gate`, `ai_record_spend`, `admin_ai_features`, `admin_set_ai_feature`, `admin_sync_ui_keys`): the warning's title and the object's name. Change nothing for them.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Publish once CI is green on the final commit.
3. In Admin › Translations press "Sync keys", enter the code it asks for, and paste its message to the supervisor (turn 2's INC-603 and INC-607).
4. Then the supervisor's short walk: turn 2's photo fixes, the card's photo signed out, and Other under Series and Model.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 3 (2026-10-13). Tier A. INC-606 — a published ad's photo is shown to buyers.
-- e2e-areas: feed, posting
-- INC-606 (the operator, 2026-10-13: "after publishing I dont see the photo in listing page after approval of the
-- advert. It only has default category image"): the listing card drew the category's picture always (its comment
-- deferred photos "until the photo clean-up bundle"), feed_page returned no photo, and the photo-links route refused a
-- caller without a session. This file gives each card its photo; the route and the card follow in the same turn.
-- A. feed_page(uuid, uuid, jsonb, integer), redeclared WHOLE from its live definition (20261009060703, the one file
--    that declares it; census (d) checks its live fingerprint first) with one change, marked in the body: each card
--    carries `coverPhotoId`, the listing's first stripped photo by `display_order` (the cover, D154), or null. Header
--    unchanged: plpgsql, STABLE, SECURITY DEFINER, search_path public; its REVOKE and GRANT restated.
-- B. Proofs: the header, the grants and the body. Its answer is proven by PP-21 (e2e/photo-pipeline.spec.ts) on an
--    active scratch listing: a proof block would read real listings.

-- ===== A — the feed's read door =====
CREATE OR REPLACE FUNCTION public.feed_page(
  p_category_id uuid DEFAULT NULL,
  p_location_id uuid DEFAULT NULL,
  p_after jsonb DEFAULT NULL,
  p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  c_widen   constant integer := 8;
  v_cat     uuid;
  v_steps   uuid[];
  v_last    integer;
  v_first   integer := 1;
  v_has_cur boolean := false;
  v_c_tier  smallint;
  v_c_pub   timestamptz;
  v_c_id    uuid;
  v_s       integer;
  v_left    integer;
  v_got     integer;
  v_cards   jsonb := '[]'::jsonb;
  v_n       integer := 0;
  v_rec     record;
  v_end_s   integer;
  v_end_t   smallint;
  v_end_p   timestamptz;
  v_end_i   uuid;
  v_steps_j jsonb := '[]'::jsonb;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'feed_page: badSize';
  END IF;

  -- The category: none means all categories (the named all key); one must be a live category.
  IF p_category_id IS NULL THEN
    v_cat := c_nil;
  ELSIF EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id AND c.is_active) THEN
    v_cat := p_category_id;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownCategory';
  END IF;

  -- The ladder: the chosen place, each parent up to its country, then everywhere.
  IF p_location_id IS NULL THEN
    v_steps := ARRAY[c_nil];
  ELSIF EXISTS (SELECT 1 FROM public.locations l WHERE l.id = p_location_id AND l.is_active) THEN
    v_steps := ARRAY(
      WITH RECURSIVE up(id, depth) AS (
        SELECT p_location_id, 0
        UNION ALL
        SELECT l.parent_id, u.depth + 1
          FROM up u
          JOIN public.locations l ON l.id = u.id
         WHERE l.parent_id IS NOT NULL AND u.depth < 8
      )
      SELECT up.id FROM up ORDER BY up.depth) || c_nil;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownPlace';
  END IF;

  -- The widest step read: the first step that holds at least 8 listings, else everywhere.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
           LIMIT c_widen) x) >= c_widen THEN
      v_last := v_s;
      EXIT;
    END IF;
  END LOOP;

  -- The cursor: the step and the last card's (tier, publish time, id) of the previous page.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_first  := (p_after->>'s')::integer;
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END;
    IF v_first IS NULL OR v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL
       OR v_first < 1 OR v_first > cardinality(v_steps) THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  FOR v_s IN v_first .. v_last LOOP
    v_left := p_size - v_n;
    EXIT WHEN v_left = 0;
    v_got := 0;
    FOR v_rec IN
      SELECT f.tier_rank, f.published_at, f.listing_id,
             l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
             l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
             l.photos_soon, l.tier, l.category_id, l.location_id,
             loc.name_en AS location_name_en, loc.name_am AS location_name_am,
             -- INC-606 — the card's photo: the listing's first stripped photo (the cover, D154).
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped
               ORDER BY p.display_order
               LIMIT 1) AS cover_photo_id
        FROM public.feed_index f
        JOIN public.listings l ON l.id = f.listing_id AND l.status = 'active'
        LEFT JOIN public.locations loc ON loc.id = l.location_id
       WHERE f.category_key = v_cat
         AND f.place_key = v_steps[v_s]
         AND (NOT v_has_cur OR v_s <> v_first
              OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
         AND (v_s = 1 OR NOT EXISTS (
               SELECT 1 FROM public.feed_index g
                WHERE g.category_key = v_cat AND g.place_key = v_steps[v_s - 1]
                  AND g.tier_rank = f.tier_rank AND g.published_at = f.published_at
                  AND g.listing_id = f.listing_id))
       ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
       LIMIT v_left
    LOOP
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'title', v_rec.title,
        'priceAmount', v_rec.price_amount,
        'priceCurrency', v_rec.price_currency,
        'priceMode', v_rec.price_mode,
        'priceBp', v_rec.price_bp,
        'priceNegotiable', v_rec.price_negotiable,
        'pricePeriod', v_rec.price_period,
        'priceUnit', v_rec.price_unit,
        'priceUnitText', v_rec.price_unit_text,
        'photosSoon', v_rec.photos_soon,
        'coverPhotoId', v_rec.cover_photo_id,
        'tier', v_rec.tier,
        'publishedAt', v_rec.published_at,
        'categoryId', v_rec.category_id,
        'locationId', v_rec.location_id,
        'locationNameEn', v_rec.location_name_en,
        'locationNameAm', v_rec.location_name_am,
        'step', v_s));
      v_n := v_n + 1;
      v_got := v_got + 1;
      v_end_s := v_s;
      v_end_t := v_rec.tier_rank;
      v_end_p := v_rec.published_at;
      v_end_i := v_rec.listing_id;
    END LOOP;
    IF v_got > 0 THEN
      v_steps_j := v_steps_j || jsonb_build_array(jsonb_build_object('step', v_s, 'placeId', v_steps[v_s], 'shown', v_got));
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'cards', v_cards,
    'ladder', to_jsonb(v_steps[1:v_last]),
    'steps', v_steps_j,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', v_end_s, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;

REVOKE ALL ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) TO anon, authenticated, service_role;

-- ===== B — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_src text;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_proc
                  WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure
                    AND prosecdef AND provolatile = 's'
                    AND proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof B1 failed: feed_page is not STABLE SECURITY DEFINER with search_path public';
  END IF;
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof B2 failed: the feed is not readable by anon and authenticated';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure;
  IF v_src NOT LIKE '%JOIN public.listings l ON l.id = f.listing_id AND l.status = ''active''%'
     OR v_src NOT LIKE '%WHERE p.listing_id = f.listing_id AND p.exif_stripped%ORDER BY p.display_order%LIMIT 1) AS cover_photo_id%'
     OR v_src NOT LIKE '%''coverPhotoId'', v_rec.cover_photo_id%' THEN
    RAISE EXCEPTION 'proof B3 failed: the body of feed_page is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
