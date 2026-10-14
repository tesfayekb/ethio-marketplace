# Bundle 13 — photos, turn 6: D158 item 3 — photos held for staff while photo screening is off, approved with the ad: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D159) — TURN 6 (2026-10-13). ONE TURN, ONE MIGRATION. 5 new strings, 2 retired. No package change.
Base: dev ce2770e5 (turn 5's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (a column, the public read of photos, `register_listing_photo` and `feed_page` redeclared whole, a trigger on `listings`, `admin_set_ai_feature` redeclared whole, their proofs); the upload route's step 6 (src/routes/api/upload/photo.ts with the new src/server/media/hold.ts); the screening preview (an admin panel). Tier B: the photo step's note, the gallery's mark, the AI form's switch, the tests, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 5 verified: dev ce2770e5 equals the supervisor's tree with the saved brief (sha256 fd0d596e…, equal). Its CI run (38497146343): SUCCESS — every job green, promoted (main = ce2770e5); PW-12 (INC-612), SV-4 and the admin-shell spec passed. Four tests passed on retry; none is at three runs in seven days without its incident.

WHY THIS TURN
- D158, the operator's answers of 2026-10-13: when photo screening is off, photos are "saved, never shown to buyers, until staff approve"; posting keeps working. How staff approve (his answer that evening): "Approve with the ad" — every new ad already passes Admin › Screening, the preview there marks the photos not checked by AI, and approving the ad approves them.
- Until this turn the switch for photo screening could not be turned off (turn 1's door refused it, `screeningStaysOn`). This turn builds the hold and opens the switch.

WHAT THIS TURN BUILDS
- PART 1 — the code (the carrier):
  - src/server/media/hold.ts (NEW) — `photoScreenPlan(gate, status)`: switch on → `screen` (the policy pass, as before); switched off by staff, on an ad whose next step is the screening queue (`draft`, or `rejected` sent again) → `hold`; switched off by staff, on any other ad the upload accepts (`active`, `reduced`, `held`, `expired`) → `paused`; any other answer of the gate (it could not be read) → `unavailable`. A budget never switches photo screening off (turn 1).
  - src/routes/api/upload/photo.ts, step 6 — `unavailable`: `providerUnavailable` with a retry, as before; `paused`: refused `{ field: "cover", reason: "screeningPaused" }`; `hold`: no policy pass and nothing metered, and the door is called with `p_unscreened: true`; the answer of a stored photo carries `unscreened`.
  - src/integrations/supabase/types.ts — `listing_photos.unscreened`, the door's `p_unscreened`.
  - src/features/posting/posting-service.ts and src/features/admin-screening/use-screening.ts — the photo rows read `unscreened`.
  - src/features/posting/photo-links.ts — a gallery photo carries `unscreened: true` when held (no key otherwise).
  - src/features/posting/preview/photo-gallery.tsx and listing-detail.tsx — `markUnscreened`: staff's preview marks a held photo "Not checked by AI"; no other gallery shows a mark.
  - src/features/admin-screening/screening-page.tsx — Preview as buyer: when any photo is held, the line "Photos not checked by AI: {count}. Approving the ad approves them too." above Approve and Reject; the gallery marks each held photo.
  - src/features/posting/step-photos.tsx — under the photos, while any stored photo is held: "Photo checking is paused. Your photos are saved, and staff check them with your ad before any buyer sees them."
  - src/features/posting/refusal-text.ts — the refusal `screeningPaused`.
  - src/features/admin-ai/ (ai-feature-form.tsx, ai-service.ts) — photo screening's switch can be turned off; its note says what that does; the refusal `screeningStaysOn` is gone.
  - The strings (below), the usage maps, the docs (ai-services.md "Photos held for staff", media-pipeline.md, admin-screening.md, posting.md), the changelog and the roadmap (line 3 and the turn-6 line).
- PART 2 — the migration (the appendix; read it whole):
  - A. `listing_photos.unscreened boolean NOT NULL DEFAULT false`.
  - B. `listing_photos_public_read` recreated with `NOT unscreened`: no visitor, signed in or not, reads a held photo's row or gets a link to it. The seller's and staff's reads are unchanged.
  - C. `register_listing_photo` redeclared WHOLE from its live definition (20260919054044; census (d)) with `p_unscreened boolean DEFAULT false`, written into the new column. The argument list changes, so the six-argument signature is dropped and its REVOKE and GRANT are restated for the seven-argument one (service role only).
  - D. `feed_page` redeclared WHOLE from its live definition (20261013200740; census (d)): a held photo is never a card's cover.
  - E. The trigger `listing_photos_approved_with_ad` on `listings`: when a PERSON moves an ad from `screening` or `held` to `active` or `reduced`, its held photos are cleared and one audit row `listing.photos_approved` is written (`meta = {count, from, to}`, the person as actor). A move with no session leaves them held.
  - F. `admin_set_ai_feature` redeclared WHOLE from its live definition (20261013184636; census (d)) without the `screeningStaysOn` refusal.
  - G. Proofs (structure, bodies, grants; RAISE EXCEPTION on any failure). No proof touches a real row or auth.users.

STRINGS
- NEW `admin.ai.field.screeningOffNote`: "While photo screening is off, new photos on an ad being posted are saved, and no buyer sees them until staff approve the ad. A live ad cannot take new photos." · «የፎቶ ምርመራ ጠፍቶ ሳለ፣ በመለጠፍ ላይ ባለ ማስታወቂያ ላይ የሚጨመሩ አዲስ ፎቶዎች ይቀመጣሉ፤ ሠራተኞች ማስታወቂያውን እስኪያጸድቁ ድረስ ግን ማንም ገዢ አያያቸውም። በቀጥታ ያለ ማስታወቂያ አዲስ ፎቶ መቀበል አይችልም።»
- NEW `admin.screening.unscreenedNote`: "Photos not checked by AI: {count}. Approving the ad approves them too." · «በሰው ሰራሽ አስተውሎት ያልተፈተሹ ፎቶዎች፦ {count}። ማስታወቂያውን ማጽደቅ እነሱንም ያጸድቃል።»
- NEW `post.photo.refusal.screeningPaused`: "Photo checking is paused, so this ad cannot take new photos right now. Please try again later." · «የፎቶ ምርመራ ለጊዜው ቆሟል፤ ስለዚህ ይህ ማስታወቂያ አሁን አዲስ ፎቶ መቀበል አይችልም። እባክዎ ቆይተው እንደገና ይሞክሩ።»
- NEW `post.photos.heldNote`: "Photo checking is paused. Your photos are saved, and staff check them with your ad before any buyer sees them." · «የፎቶ ምርመራ ለጊዜው ቆሟል። ፎቶዎችዎ ተቀምጠዋል፤ ማንም ገዢ ከማየቱ በፊት ሠራተኞች ከማስታወቂያዎ ጋር ይፈትሿቸዋል።»
- NEW `post.gallery.unscreened`: "Not checked by AI" · «በሰው ሰራሽ አስተውሎት አልተፈተሸም»
- RETIRED `admin.ai.field.screeningStaysOn` and `admin.ai.error.screeningStaysOn` (the switch is no longer refused).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- While photo screening is off, a draft (or a rejected ad sent again) takes photos and holds them; an ad that is live, held by staff or expired takes no new photo (`screeningPaused`), because nothing would put that photo in front of staff.
- Only a person's approval clears held photos: through `transition_listing`, that is a reviewer with a fresh second factor. A move with no session (the seat of the screening gateway, REQ-021, when it is built) leaves them held, so "until staff approve" holds by construction.
- A held photo is stored without the AI pass and is not metered (no call is made).
- Reject leaves the photos held: if the seller sends the ad again, it returns to the queue with them.
- Staff see the count in the preview and a mark on each held photo; the seller sees a note on the photo step; buyers see nothing of a held photo (the ad shows the rest of its photos, or the category's picture).
- The upload's held branch is proven by unit tests (PH-1..PH-3): a browser test would have to switch the real photo screening row off, which no test may do (G27). The database side is proven on scratch rows (SC-18, SC-19).
- The new ids: PH-1..PH-3, PU-5, GAL-5, SC-18, SC-19.

TESTS
- E2E, NEW (e2e/admin-screening.spec.ts, last; `seedWaiting` also answers the scratch category's and city's ids; two scratch photo rows per test, the first held, both stripped, rows only):
  - SC-18 — the super admin opens the ad's Preview as buyer: the line says one photo was not checked by AI; Approve at the preview's foot, the confirmation and the second factor; the ad is active, the photo is no longer held, ONE audit row `listing.photos_approved` with the super admin as actor and `{count: 1, from: "screening", to: "active"}`; a visitor without a session then reads both photos.
  - SC-19 — the service client moves the ad to active (no session): the photo stays held, no audit row; a visitor reads only the screened photo, and the feed (`feed_page` for the scratch category and city) gives the screened photo as the card's cover; then the control — the same row cleared by the service client is read and becomes the cover (it is first by order), so the held flag alone kept it out.
- E2E, edited (e2e/admin-services.spec.ts): SV-2 — the line expecting `screeningStaysOn` is removed (the real row is never switched off by a test, G27); SV-4 — photo screening's switch is checked and ENABLED, its note is `admin.ai.field.screeningOffNote`.
- Reached without an edit (CI runs them): every upload (the photo pipeline specs — the door now has seven arguments), every draft read (the posting specs — the photo rows read `unscreened`), the feed specs (`feed_page`), PP-13 and PP-21 (the public read), the other screening tests (the preview reads `unscreened`). For a photo that is not held, nothing they assert changes.
- Census (G37): no test asserts the upload answer's exact keys; no test reads `screeningStaysOn` but SV-2, AIS-5 and AIF-2, which this turn edits; no other test seeds a photo row with `unscreened`.
- Unit: PH-1..PH-3 (NEW, src/server/media/hold.test.ts), PU-5 (src/features/posting/photo-links.test.ts), GAL-5 (src/features/posting/preview/photo-gallery.test.tsx), AIS-5 and AIF-2 (edited: the refusal is gone; the switch turns off and saves `enabled: false`); 776 in all.
- Red first: SC-18 and SC-19 fail on the base (no column `unscreened`). The other new tests prove new behaviour (no red run needed, G38).
- Leases: SC-18 signs in as the super admin, as SC-2 does; SC-19 signs in nobody.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev ce2770e5 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 776 unit tests (133 files), the usage maps (they match), the hardcoded-strings guard (0 findings), the selector self-test, a build.
- The migration on a local PostgreSQL 16 copy: it applied and its proofs passed; on stand-in rows a move with no session left a held photo held with no audit row, a person's move cleared it with one row naming that person, and the anonymous role did not read a held photo. Mutation: without the trigger's no-session line, proof E fails.
- `scripts/check-migrations.sh` with this migration as 20261013210000_b13t6-check.sql: "Migration guard OK". The existing allowlist line for `feed_page` covers its restated grant; the other grants are to `service_role` only.
- Every SC-18 and SC-19 line traced to the code that answers it: the preview's line (`heldCount`, `fill`), the footer's Approve (`admin-screening-preview-approve`), the trigger's audit row, the public read, `feed_page`'s cover order.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-6.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 5's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. Until he Publishes, the published site works as before: it calls `register_listing_photo` by name with six arguments, which the new door accepts (the seventh has a default).
- The expected red window (G35): CI on any commit pushed before the migration file exists runs the browser tests against a staging without the column, and every test that reads photo rows or uploads a photo fails. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 30 carrier paths and the brief. src/integrations/supabase/types.ts is in the carrier; if the platform regenerates it after the migration, name it in the report and paste `git diff src/integrations/supabase/types.ts`. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-6.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 28 files → each equal to:
  1f4aeffd6ae1d13eab9a88af776ac776deb10076526664d83a1b373fb9d58f46  docs/_changelog.md
  598a01f5ca31247f3cae6a465d1b990d2ece4e5844067ab308ed3fa78d47d7e1  docs/features/admin-screening.md
  766dbdc76e647005af60496611cfeace5deee1b6ae753325cb597a0e605c951a  docs/features/ai-services.md
  fba9cab130f5a6c884170bfbe8ea8669d25990d91394f0d619464616ddbeeaef  docs/features/media-pipeline.md
  061f9959fa19cfd7cf48d5578876a54ac130dad6332cc833b8d4485fb2669c72  docs/features/posting.md
  8bee5d857037510cfd7f193f6281b8e1a79d538c2917ffce3901ea789d09f7be  docs/generated/i18n-usage.json
  2d8ac10fd6cdad7fb8319db653a9b82018d770dc950bf406362d8cdabdcb2c56  e2e/admin-screening.spec.ts
  fa09b36fd0f4d9407c5ef15a012942ac07af4ff7a056129c66ea3bec03d18657  e2e/admin-services.spec.ts
  8bee5d857037510cfd7f193f6281b8e1a79d538c2917ffce3901ea789d09f7be  public/i18n-usage.json
  b1e1d5823a136979f0ad0fcafa2085f306f8ca8b69bf0cbdb5053e0b286e776a  roadmap.md
  15c767031e24fcd4fc1e83f37d71c000029751e6e6587633c254a6d1eb97a06c  src/features/admin-ai/ai-feature-form.test.tsx
  9fcd5adb2e8468e32e4789d1a3e5f706d191b1ceb34d53e0e64fea72b3153281  src/features/admin-ai/ai-feature-form.tsx
  1c930692e8e5fbba5d391b856f802a7ed08fd1bb01bfb11eba5e10e50a1ee3b1  src/features/admin-ai/ai-service.test.ts
  0356ad9414dbcadaf4568fc5980fffc4c9220a48b3b966217c57fcd760b19faa  src/features/admin-ai/ai-service.ts
  8db6141c7c1178b8d4b6771fdac3eaa1da8fef305d20d6526f10595ab1954d01  src/features/admin-screening/screening-page.tsx
  09d9210eeb43af8cfde92b53dc3643a44e7fe5485e208d6eaaf913fa2e283f27  src/features/admin-screening/use-screening.ts
  c55b27622695189e92a9f3e7c7f82d66fa8d2b1308739629d023e97ae7890645  src/features/posting/photo-links.test.ts
  b6be8c25423d7e0b1e2e777a464fa7edcfc108468e86426ee2d0c064b1a08071  src/features/posting/photo-links.ts
  8f022d4ecb07c04fa0b293113a3840ecb1f9d374ae243f604a968ade60de7c24  src/features/posting/posting-service.ts
  f994d2b910d263ead411852e9b732e228ba5d64c8f2f346a9f914e0964347c94  src/features/posting/preview/listing-detail.tsx
  de91a1ed051fab4c4bbbb1422304da00b258709cd61ac05ce730d49bbf3573e8  src/features/posting/preview/photo-gallery.test.tsx
  cc29907fb556d6900b7cefe0ddf33ee3a92efd7aebc3051b05592dc9c6e63e04  src/features/posting/preview/photo-gallery.tsx
  3102a8bf719b0af20eb3c5dfa5721fb4c9dc5fc1f03f8099eb64b086a14d578d  src/features/posting/refusal-text.ts
  32fc1616f07cb91783a8f1d12c9622ea64adba5e34a6eb013ea71da2d620c156  src/features/posting/step-photos.tsx
  6aae393fb4b38fafef163fd08ff6a074d42ced72be0bbb81e377d2e33467a901  src/i18n/locales/am.ts
  295baa8776e5be8b970d475642942908d2d8f64076b16a6736a8ef1139508399  src/i18n/locales/en.ts
  1816516b0e2034ef1bb006f02edc83023d480872d424521e40285d82a9190db8  src/integrations/supabase/types.ts
  100cd53b8952d46f3d324d308572e2eebee02b9c4ea1429032ff6f74a7fef525  src/routes/api/upload/photo.ts
- (c) `ls src/server/media/hold.ts src/server/media/hold.test.ts` → no such files.
- On ethio-prod with your query tool (SELECT only):
- (d) `select p.proname, md5(p.prosrc), length(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid in ('public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure, 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure, 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)'::regprocedure) order by 1;` → three rows:
  admin_set_ai_feature | f2fff58887e0392c868682a00374f70c | 2967 | v | t | {search_path=public}
  feed_page | b4b80c65891a37e5f88c7eabe77ee53d | 5763 | s | t | {search_path=public}
  register_listing_photo | ed04b810690f065ad430f5af6710ea59 | 1617 | v | t | {search_path=public}
  Any other value is a STOP.
- (e) `select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'listing_photos' and column_name = 'unscreened';` → 0.
- (f) `select max(version) from public.migration_marks;` → 20261014090000 (turn 3's mark; turns 4 and 5 added none).

THE CARRIER — B13T6-TURN-CARRIER-2026-10-13.md (44,184 bytes; sha256 b2f75ea5a0d59373051f1cdfd89bd2840976b409e684d66a58a3b2ec81dd275e; 86 sections)
- Its first line starts "B13T6 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 30 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  9bd4bd1b97a607b23a42659f375b29d0baabef0dab62a5b329d1f25441b62e81  docs/_changelog.md
  dc8a087356d6fd1132f3f9c41f62f9197a77e153e76c9627cebc1ce998bd5b58  docs/features/admin-screening.md
  01fd23467364632395f06dd65c7164f857cc2772f7458d95358969b246464307  docs/features/ai-services.md
  053d65c6bb06642af147ed9f2dd1e9ecaa1441e744dc83ac19c07257a438cd90  docs/features/media-pipeline.md
  302d048c4e164b2ac8e79d968998f4dceb6aa5533810dc946b5590d3247f2a73  docs/features/posting.md
  26a6e320fb49e000940e0fdc9a09d86ae9b03b40887bbf17280a8118818357e2  docs/generated/i18n-usage.json
  5baa9248ac4ea204286ee080c451b351e1be1f3b216d6b19742371474fa20262  e2e/admin-screening.spec.ts
  7ad6e0af9dc0c79ff34a65a86c20a289b5ed6702be07fdbae3ff0c1d5516d6ef  e2e/admin-services.spec.ts
  26a6e320fb49e000940e0fdc9a09d86ae9b03b40887bbf17280a8118818357e2  public/i18n-usage.json
  47a7aebd268831c6d4fee0c5774402394dc6a900f35353abdb7970311656919b  roadmap.md
  d23077f0c57adcf26e4321ca5c79a7ffac8aa03619e24e33337c6cbb27b8f3c5  src/features/admin-ai/ai-feature-form.test.tsx
  e1240baea129f1e9f8cc8d80692af3aa3a9098b4ce8e491c6a3e0fc9b4d2aecf  src/features/admin-ai/ai-feature-form.tsx
  ddf8054711b0e593f93478ce02ff71d8c260b9b1a4ec69a20cadd06cceb1b956  src/features/admin-ai/ai-service.test.ts
  3d069b524a5893b52987235e3d1918eafd2cdcf8388e7227a7b5cfef15a65834  src/features/admin-ai/ai-service.ts
  0407bca78195c46b22070fc89560706c8370feb899e8e6d278338d66b8d6678c  src/features/admin-screening/screening-page.tsx
  f69d992a6e033e5b443b555652480b853a0b8b9bfd63f90f31e886a17fde1186  src/features/admin-screening/use-screening.ts
  49b33390a641dcfb8fff5f166534963c698b4d9a24f1603256cd2cc7cf30c8c8  src/features/posting/photo-links.test.ts
  be93b8530434de5a013812d86dccf084954f91fd33b82b1f15269f5827df7ee4  src/features/posting/photo-links.ts
  30b813bcc268c67d40adc5dc729f8b0285dbf50a93336e55540e4ecef88a847a  src/features/posting/posting-service.ts
  b6f2d4b3d6f5567f85f2f6e977d3a4a05db495aab41ca36048cc9394bc9ab333  src/features/posting/preview/listing-detail.tsx
  a34d84b6ad42d9dda7c89cc2dca34183ace29aaa0c1d22d9863bfb675ce685d6  src/features/posting/preview/photo-gallery.test.tsx
  b5ba2e2ee61611c37f8e7fcbb86cca58996e55104950f9feff1d37ac0f2041fe  src/features/posting/preview/photo-gallery.tsx
  6cd0b492f4bedafa2bcb1a2bd0e3e42f674d06fad43c12b6529016532ed287d5  src/features/posting/refusal-text.ts
  e5e5bf180d75258ce01561bb93de2b44758c53f766e2315fd202468be4773fb2  src/features/posting/step-photos.tsx
  541f9292091cb2f192c1747bdff319116329701a9f4fa6f96dff38c5c75e1545  src/i18n/locales/am.ts
  435d6b60433cdb9800354e4340744a190cdabfa3ae15cf7314beaaa91463aa4e  src/i18n/locales/en.ts
  26ba3d4fc73cd39ae1de93494c287d04d968405ae55adc7722f893f0c460b396  src/integrations/supabase/types.ts
  8d01286f32a9123e5e4da0060677c72bf374e817d8fc7ed8d4fa25c2b987af12  src/routes/api/upload/photo.ts
  ecd82791eca313d70b4bcf1f20bfba1d1c42c68a8c1d6d8a8634f23120973a12  src/server/media/hold.test.ts
  2b27f786462f248e577fe4970ac98dcc519515d6ecb63890ac31054a44620540  src/server/media/hold.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t6.log` — 776 passed (133 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs SC-18, SC-19, SV-2, SV-4 and every other spec.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is f5114d787bd436d2f5f93c2bc61ecea47fa75d8f5cfc956db2eccd922dc59c4f (21,411 bytes, 449 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013210000_b13t6-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014090000 (the newest mark): if the reading gives 20261014090000 or less, use 20261014100000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select p.proname, md5(p.prosrc), length(p.prosrc), p.provolatile, p.prosecdef, p.proconfig from pg_proc p where p.oid in ('public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure, 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure, 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure, 'public.listing_photos_approved_with_ad()'::regprocedure) order by 1;` → four rows:
  admin_set_ai_feature | 044d7f0f13e297df7cb92f75d27be28f | 2973 | v | t | {search_path=public}
  feed_page | e300681b63d67ed4d5e4a6e1456f9479 | 5875 | s | t | {search_path=public}
  listing_photos_approved_with_ad | 57a8e5a40056c16d217c67f9f6511a7b | 650 | v | t | {search_path=public}
  register_listing_photo | a4c2954330f3c60b373979e4cc4721f3 | 1809 | v | t | {search_path=public}
- `select to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)') is null, has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE'), has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE');` → t | f | t;
- `select column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema = 'public' and table_name = 'listing_photos' and column_name = 'unscreened';` → unscreened | boolean | NO | false;
- `select tgname, tgenabled from pg_trigger where tgrelid = 'public.listings'::regclass and tgname = 'listing_photos_approved_with_ad';` → listing_photos_approved_with_ad | O;
- `select position('NOT unscreened' in pg_get_expr(polqual, polrelid)) > 0 from pg_policy where polname = 'listing_photos_public_read' and polrelid = 'public.listing_photos'::regclass;` → t;
- `select count(*) from public.listing_photos where unscreened;` → 0 (photo screening is on; nothing is held yet).

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(f).
- The 30 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 30 carrier paths, the brief and the one migration file. `git ls-files src/server/media/hold.ts src/server/media/hold.test.ts`, so the new files are shown tracked (G20).
- The checks.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- The strings: each new key, its English and its Amharic, as written, and the two retired keys (G43).
- In this report ONLY (never in a file — the repository is public): from the database tool's security warnings, each warning that names an object this turn created or changed (`listing_photos`, `listing_photos_public_read`, `register_listing_photo`, `feed_page`, `listing_photos_approved_with_ad`, `admin_set_ai_feature`): the warning's title and the object's name, and the total count. Change nothing for them.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator), in this order:
1. Apply the migration on ethio-staging (the SQL editor) and read back its mark. CI's preflight waits for it (up to 25 minutes); if the run has already failed at the preflight, use "Re-run failed jobs".
2. Send Lovable nothing until the supervisor has read CI on the final commit.
3. Publish once CI is green on the final commit.
4. Then the supervisor's walk of the turns since the last Publish.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos), turn 6 (2026-10-13). Tier A. D158 item 3 — photos held for staff while photo screening is off.
--
-- The operator's answers (D158, 2026-10-13): when photo screening is off, photos are "saved, never shown to buyers, until
-- staff approve"; posting keeps working. How staff approve (2026-10-13 21:4x local): "Approve with the ad" — every new ad
-- already passes Admin › Screening, and approving the ad approves its held photos.
--
-- A. listing_photos.unscreened (NOT NULL, default false): a photo stored while photo screening was off.
-- B. The public read (`listing_photos_public_read`) leaves a held photo out, so no buyer, signed in or not, is ever given
--    its row or a link to it. The seller's and staff's own reads are unchanged: they see it.
-- C. register_listing_photo gains `p_unscreened` (default false), redeclared whole from its live definition
--    (20260919054044; census (d)); the argument list changes, so the old signature is dropped and its REVOKE and GRANT
--    are restated for the new one.
-- D. feed_page, redeclared whole from its live definition (20261013200740; census (d)): a held photo is never a card's
--    cover.
-- E. Approving the ad approves its photos: a trigger on listings, when a PERSON moves an ad from screening (or a staff
--    hold) to live, clears `unscreened` on its photos and writes one audit row 'listing.photos_approved' with how many.
--    transition_listing lets a signed-in person make that move only as a reviewer with a fresh second factor; a service
--    caller (no session — the screening gateway of REQ-021 when it is built) leaves the photos held, because the rule is
--    "until staff approve".
-- F. admin_set_ai_feature, redeclared whole from its live definition (20261013184636; census (d)), without the
--    `screeningStaysOn` refusal: photo screening may now be switched off. Its budget still never switches it off.
-- G. Proofs (RAISE EXCEPTION on any failure; a clean apply is the pass): structure, bodies and grants. Their behaviour is
--    proven on scratch rows by SC-18 and SC-19 (e2e/admin-screening.spec.ts); no proof here touches a real row or
--    auth.users.

-- ===== A — the column =====
ALTER TABLE public.listing_photos ADD COLUMN IF NOT EXISTS unscreened boolean NOT NULL DEFAULT false;
COMMENT ON COLUMN public.listing_photos.unscreened IS
  'D158 — stored while photo screening was off: shown to no buyer until staff approve the ad (cleared by the approval).';

-- ===== B — the public read leaves a held photo out =====
DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id AND l.status = 'active'
    )
  );

-- ===== C — register_listing_photo, whole, with p_unscreened =====
DROP FUNCTION IF EXISTS public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer);

CREATE OR REPLACE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_cap smallint; v_count int;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  SELECT seller_id INTO v_seller FROM public.listings WHERE id = p_listing_id;
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  -- D22 — the plan's photo cap is the authority; the route's cap is a mirror.
  v_cap := public.plan_photo_cap(public.seller_plan(v_seller));
  SELECT count(*) INTO v_count FROM public.listing_photos WHERE listing_id = p_listing_id;
  IF v_count >= v_cap THEN
    RAISE EXCEPTION 'tooManyPhotos:%', v_cap;
  END IF;
  SELECT coalesce(max(display_order), -1) + 1 INTO v_order
    FROM public.listing_photos WHERE listing_id = p_listing_id;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean) TO service_role;

-- ===== D — feed_page, whole: a held photo is never a cover =====
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
             -- D158 (bundle 13 turn 6) — a photo held for staff is never a buyer's cover.
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped AND NOT p.unscreened
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

-- ===== E — approving the ad approves its photos =====
CREATE OR REPLACE FUNCTION public.listing_photos_approved_with_ad()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE v_n integer;
BEGIN
  -- D158 — staff approve held photos with the ad: a person's decision only. A move with no
  -- session (a service caller) leaves them held.
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  UPDATE public.listing_photos SET unscreened = false
   WHERE listing_id = NEW.id AND unscreened;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (auth.uid(), 'listing.photos_approved', 'listing', NEW.id::text,
            jsonb_build_object('count', v_n, 'from', OLD.status, 'to', NEW.status));
  END IF;
  RETURN NULL;
END $fn$;

REVOKE ALL ON FUNCTION public.listing_photos_approved_with_ad() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS listing_photos_approved_with_ad ON public.listings;
CREATE TRIGGER listing_photos_approved_with_ad
  AFTER UPDATE OF status ON public.listings
  FOR EACH ROW
  WHEN (OLD.status IN ('screening', 'held') AND NEW.status IN ('active', 'reduced'))
  EXECUTE FUNCTION public.listing_photos_approved_with_ad();

-- ===== F — admin_set_ai_feature, whole: photo screening may be switched off =====
CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(
  p_feature text,
  p_enabled boolean,
  p_monthly_budget_cents integer,
  p_unit_cost_microusd integer
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- D158 (bundle 13 turn 6) — photo screening may be switched off: new photos are then held
  -- for staff (listing_photos.unscreened) and shown to no buyer until the ad is approved.
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  IF p_enabled AND v_level = 100 AND v.feature <> 'photo_screen' THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO service_role;

-- ===== G — proofs =====
DO $proof$
DECLARE
  v_src   text;
  v_qual  text;
  v_n     integer;
BEGIN
  -- A
  SELECT count(*) INTO v_n FROM information_schema.columns
   WHERE table_schema = 'public' AND table_name = 'listing_photos' AND column_name = 'unscreened'
     AND data_type = 'boolean' AND is_nullable = 'NO' AND column_default = 'false';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof A failed: listing_photos.unscreened is not boolean NOT NULL DEFAULT false'; END IF;
  -- B
  SELECT pg_get_expr(p.polqual, p.polrelid) INTO v_qual
    FROM pg_policy p WHERE p.polname = 'listing_photos_public_read'
     AND p.polrelid = 'public.listing_photos'::regclass;
  IF v_qual IS NULL OR v_qual NOT LIKE '%NOT unscreened%' OR v_qual NOT LIKE '%exif_stripped%'
     OR v_qual NOT LIKE '%''active''%' THEN
    RAISE EXCEPTION 'proof B failed: the public read is %', coalesce(v_qual, '(missing)');
  END IF;
  -- C
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)') IS NOT NULL
     AND EXISTS (SELECT 1 FROM pg_proc WHERE oid = to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer)')
                   AND pronargs = 6) THEN
    RAISE EXCEPTION 'proof C failed: the six-argument register_listing_photo is still there';
  END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)'::regprocedure
     AND prosecdef AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%coalesce(p_unscreened, false)%'
     OR v_src NOT LIKE '%register_listing_photo is called by the photo route only%' THEN
    RAISE EXCEPTION 'proof C failed: the body of register_listing_photo is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof C failed: register_listing_photo is not the service role''s alone';
  END IF;
  -- D
  SELECT prosrc INTO v_src FROM pg_proc WHERE oid = 'public.feed_page(uuid, uuid, jsonb, integer)'::regprocedure
     AND prosecdef AND provolatile = 's';
  IF v_src IS NULL OR v_src NOT LIKE '%AND p.exif_stripped AND NOT p.unscreened%'
     OR v_src NOT LIKE '%''coverPhotoId'', v_rec.cover_photo_id%' THEN
    RAISE EXCEPTION 'proof D failed: the body of feed_page is not as written';
  END IF;
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid, uuid, jsonb, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof D failed: feed_page is not readable without a session';
  END IF;
  -- E
  SELECT count(*) INTO v_n FROM pg_trigger t
   WHERE t.tgrelid = 'public.listings'::regclass AND t.tgname = 'listing_photos_approved_with_ad'
     AND NOT t.tgisinternal AND t.tgenabled = 'O'
     AND pg_get_triggerdef(t.oid) LIKE '%AFTER UPDATE OF status ON public.listings FOR EACH ROW WHEN%';
  IF v_n <> 1 THEN RAISE EXCEPTION 'proof E failed: the approval trigger is missing'; END IF;
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.listing_photos_approved_with_ad()'::regprocedure AND prosecdef
     AND proconfig = ARRAY['search_path=public'];
  IF v_src IS NULL OR v_src NOT LIKE '%IF auth.uid() IS NULL THEN%'
     OR v_src NOT LIKE '%''listing.photos_approved''%' THEN
    RAISE EXCEPTION 'proof E failed: the body of the approval trigger function is not as written';
  END IF;
  IF has_function_privilege('authenticated', 'public.listing_photos_approved_with_ad()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.listing_photos_approved_with_ad()', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E failed: the trigger function is callable by a browser role';
  END IF;
  -- F
  SELECT prosrc INTO v_src FROM pg_proc
   WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure AND prosecdef;
  IF v_src IS NULL OR v_src LIKE '%screeningStaysOn%' OR v_src NOT LIKE '%overBudget%'
     OR v_src NOT LIKE '%require_step_up_if_needed(''services'', ''manage'')%' THEN
    RAISE EXCEPTION 'proof F failed: the body of admin_set_ai_feature is not as written';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
