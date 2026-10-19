# Bundle 22 — Stage 1, turn 6 (v4): the publishing statement once per ad (DEC-205); a photo added to a published ad carries it; the contact reveal waits for an owed acceptance (M6): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 6, VERSION 4 (2026-10-19; replaces docs/governance/briefs/bundle-22-turn-6.md, bundle-22-turn-6-v2.md and bundle-22-turn-6-v3.md, none saved; version 3 changed how you verify the central flow end-to-end before concluding; version 4 gives the lead sentence a new key, as your rule D5 requires). Tier A (the certification rule, two service-only photo doors and the buyer's contact reveal re-declared; the photo route's legal check). ONE MIGRATION BY THE TOOL (M6, LAST). Two new strings (EN+AM, given below); one key retired. No package change. No AGENTS.md change. Base: dev ed84f925 (bundle 22 turn 5); every line cited below is as at ed84f925. Parts, IN THIS ORDER: A — CI first; B — the photo route and the photos step; C — the contact reveal; D — the string; E — the tests; F — the docs, the roadmap; the checks; G — M6 by the tool (LAST); THE STOP REPORT with the apply line; after the operator's staging apply and "continue", H — the end-to-end check, which ends with THE CI WAIT REPORT; after CI's run on your commit and the operator's second "continue", H4 — you read that run; then the final report.

WHY
- DEC-205 (the operator, 2026-10-19 09:4x local, "Once per ad"): the publishing statement ("I certify the above") is ticked once per ad, not on every action. Publish, edit, renew and photo changes ask for the tick only while the ad holds no certification of exactly the statement versions now in force for it — at its first publish, and again only when a new version is published or the ad now shows in a country with its own statement. legal_certify returns, asking for nothing and recording nothing, when the ad holds such a certification; my_listing_certification then answers no statements, so CertifyBlock renders nothing and every screen works as before. This amends DEC-129's "required on publish, on edit and on renew". The Terms and Privacy acceptance at sign-in is a different tick and does not change.
- Turn 4's "Owed" (docs/features/legal.md, the Turn 4 section): photos do not pass through edit_my_listing. On a published ad the photos step stores each photo at once through /api/upload/photo (src/routes/api/upload/photo.ts :461-468, the service-only doors register_listing_photo and replace_listing_photo), so a seller can put new pictures on a live ad without the publishing statement that every other edit carries. From this turn a photo ADDED to or REPLACED on a published ad (any status but draft) is an edit: the door certifies it as edit_my_listing does (legal_certify, action edit), and the screen asks for the tick first. A draft's photos are certified when the draft is published. Removing, moving or choosing the cover adds no content and asks for nothing (the supervisor's ruling, G17).
- Turn 4's other "Owed": the buyer's contact reveal (reveal_listing_contact) answers a signed-in person who still owes a Terms or Privacy acceptance; the screens send him to the acceptance screen first (LegalGate), but the door does not. From this turn the door answers {ok: false, reason: acceptanceRequired} to such a viewer (never to the ad's owner), and the ad page opens the acceptance screen.
- Nothing changes today: no publishing statement, Terms or Privacy version is in force on either database.
- The E2E seams are turn 4's: e2e-pub-<listing id without dashes> is a statement for that one listing; e2e-acc-<listing id without dashes> is an owed acceptance for that one listing.

STEP 0 — save this file (the attached bundle-22-turn-6-v4.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-6-v4.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-6-v4.md (bundle 22 — Stage 1, turn 6: the publishing statement once per ad, DEC-205; a photo added to a published ad carries it; the contact reveal waits for an owed acceptance; M6). Next: Stage 1's turn 7 — the sold ad's 30 days as a listing setting that the doors read and the Terms quote; then the banned-items and safety pages;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 5 (docs/governance/briefs/bundle-22-turn-5.md", one new line:
  - [ ] Turn 6 (docs/governance/briefs/bundle-22-turn-6-v4.md; M6 mark 20261020070000; two strings) — DEC-205: the publishing statement is certified once per ad (asked again only for a new version or a country with its own statement); a photo added to or replaced on a published ad carries the certification (register_listing_photo and replace_listing_photo call legal_certify, action edit; the photo route checks first; the photos step waits for the tick when one is owed); the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; LG-19, LG-20, LG-21, LGC-5
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to F; the checks; Part G LAST; THE STOP REPORT with the apply line, and STOP; — the operator applies M6 on ethio-staging and sends "continue" —; Part H1 to H3; THE CI WAIT REPORT, and END THE TURN (you do NOT conclude here: the platform syncs your commit and CI runs on it); — CI's run finishes (about 55 minutes) and the operator sends "continue" —; H4, your own end-to-end verification from that run; THE FINAL REPORT, concluding; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- Part H runs through `bun run e2e:local` only (AGENTS.md); never the preview signed in and never production. If the browser does not start (INC-506), Part H says what to do.
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"). You verify it yourself, and you do not conclude before you have. Your sandbox cannot start a browser (INC-506: a missing system library, apt-get unavailable; no browser may be installed or substituted), and the preview signed in and production are never used for tests (AGENTS.md; INC-464, DEC-146). So the state a real user would hit is reached by CI's run of the full suite on your commit: real Chromium at 360 and 1280 px, the built app served against ethio-staging, signed-in sellers and buyers, every test — LG-19, LG-20, LG-21 and LGC-5 drive this turn's central flows. You try Part H locally first; when the browser guard stops it, you end the turn WITHOUT concluding (THE CI WAIT REPORT), CI runs on that commit, and after the operator's next "continue" you read that run yourself (H4) and conclude only when it shows those flows passing. The operator directs this (2026-10-19, after your stops at 09:37, 09:43 and 09:48). Unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component or helper never changes its default (new behaviour is an option).
- Every legal test row is a scratch one, kind `e2e-…`, created and removed by the test; a test never writes legal_settings or listing_policy and never creates a document of a real kind (terms, privacy, publishing) (G27). Find a test's own rows by kind or id, never by position on a page (G28). Leased accounts at most two per test (DEC-174).
- The string is copied from Part D by key, character for character; no Amharic of your own. No literal UI text.
- Run the usage-map guard (`bun run i18n:map-guard`) LAST among the checks, after every file of the turn is written, and regenerate the maps if it asks.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1048 on ed84f925 (turn 5's final commit), started 13:25 UTC — green, or still running (then read it again before the stop report and say which run you read). If it names any failing test or job: read its body at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md or https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38). The supervisor also reads it and may send the fix with "continue".

PART B — THE PHOTO ROUTE AND THE PHOTOS STEP.
B1. src/routes/api/upload/photo.ts — the certification fields. The multipart body gains two optional text fields: `certified`, the statement version ids separated by commas (each must match the route's UUID test, at most 20, else `refusal("certified", "badValue")`), and `language` (at most 10 characters, else `refusal("language", "badValue")`); read them beside `replaces` (:189-192).
B2. The same route, right after the status check (:210-215) and before the draft-week rule (:217): when `listing.status !== "draft"`, call the seller's own read as the caller, `supabase.rpc("my_listing_certification", { p_listing_id: listingId })` (an error: `upstreamFailed` → `upstreamUnavailable(PATH, "my_listing_certification", status)`, else `logRouteError` and 500, as the route's other reads); `acceptance_pending === true` → `routeJson({ ok: false, refusals: [{ field: "legal", reason: "acceptanceRequired" }] }, 409)`; otherwise, when the statements' `version_id`s, sorted, differ from the sent ids, sorted → `routeJson({ ok: false, refusals: [{ field: "legal", reason: "certificationRequired" }] }, 409)`. This mirror runs before the strip and the provider, so a refused photo costs no screening call. The door stays the authority: for a non-draft listing `stored` (:439-459) gains `p_certified` (the sent ids, or omitted when none were sent) and `p_language` (or omitted), and its refusal comes back through `doorRefusal` after the rollback, as today (:469-477). A draft sends neither and nothing is read.
B3. src/features/posting/posting-service.ts `uploadPhoto` (:143) gains a sixth, optional parameter `certification?: Certification` (the type from src/features/my-listings/my-listing.ts :548, imported as a type): when given, `form.set("certified", certification.certified.join(","))` and `form.set("language", certification.language)`; when absent the form is exactly today's.
B4. src/features/posting/refusal-text.ts `PHOTO_REASONS` (:105, read by `photoRefusalKey`, :155): "certificationRequired" and "acceptanceRequired" map to the new key `legal.certify.photosWait`.
B5. src/features/posting/step-photos.tsx `StepPhotos` (:82) gains two optional props: `certification?: Certification` and `waitForStatement?: boolean` (absent: today's behaviour). Every `uploadPhoto` call in the file (:217 the new photo, :439 the editor's replacement) passes `certification` as the sixth argument (`undefined` for the fifth where it has none). While `waitForStatement` is true: the add button `post-photos-add` (:937-945) is disabled, and under it, before `post-photos-helper`, a line `<p className="text-xs text-muted-foreground" data-testid="post-photos-certify-wait">` with `legal.certify.photosWait`; the editor's save (the function at :425) returns `"legal.certify.photosWait"` without uploading. An answer whose first refusal's reason is "acceptanceRequired" or "certificationRequired" also goes through `certifyRefusal(reason, navigate)` (src/features/legal/certify-refusal.ts; `useNavigate` from @tanstack/react-router): the acceptance screen, or the statements re-read with the tick cleared.
B6. src/features/posting/wizard.tsx, the `<StepPhotos` element (:1446-1471, ending `onSendingChange={setPhotosSending}`): pass `certification={sellerEdit ? certifyArgs(certify, language) : undefined}` and `waitForStatement={sellerEdit && !certifyAllows(certify)}` — the same `certify` state and helpers turn 4 added for the step's Next (`sellerEdit` and `certify` are declared near :216; `certifyArgs`, `certifyAllows` are imported). In the posting form (a draft) neither is passed.
B7. Class census (G29), in the report: (1) every `uploadPhoto(` call in src/, each named with what it passes; (2) every door or route a seller reaches that changes what a published ad shows, other than edit_my_listing and the two photo doors (the pin, the place lines, the video, photos-soon, remove, move, cover — grep src/routes/api/listings/ and the `supabase.rpc(` calls in src/features/posting/ and src/features/my-listings/), each named with whether it certifies and why. Change none of them beyond this brief; the supervisor rules on the list.

PART C — THE CONTACT REVEAL.
C1. src/features/ad-page/contact.ts: `RevealAnswer`'s refusal reasons gain "acceptanceRequired"; `revealContact` passes it through when the door's body says `reason: "acceptanceRequired"` (today any other reason becomes "failed", :41-45). `ContactState` is unchanged.
C2. src/routes/l.$slug.tsx `onReveal` (:144-159): an answer with reason "acceptanceRequired" calls `certifyRefusal("acceptanceRequired", navigate)` (`useNavigate` from @tanstack/react-router) and puts the contact block back to `{ kind: "idle" }`; every other answer is handled as today.
C3. Class census (G29), in the report: every door a signed-in buyer reaches from the ad page or the feed (`save_listing`, `unsave_listing`, `report_listing`, the view count, and any other `supabase.rpc(` in src/features/ad-page/ and src/features/feed/), each named with whether it checks an owed acceptance. Change none; the supervisor rules on the list.

PART D — THE STRINGS (two new keys; en.ts and am.ts; copied character for character; Knowledge D5, "A RENAMED STRING IS A NEW KEY"): `legal.certify.photosWait`, placed beside "legal.certify.loadError" (en.ts :3090, am.ts :2940); `legal.certify.leadOnce` (DEC-205's lead sentence), placed where `legal.certify.lead` stands today (en.ts :3085-3086, am.ts :2936). src/features/legal/certify-block.tsx :85, the only reader of `legal.certify.lead` (`grep -rn "legal.certify.lead" src e2e`), reads `legal.certify.leadOnce` instead, and `legal.certify.lead` is then removed from en.ts and am.ts (D5: the old key retired when unread; its database row becomes an orphan in Admin › Translations, the retirement path). The two new keys:
{
 "legal.certify.photosWait": {
  "en": "Tick the statement below before you add or change a photo.",
  "am": "ፎቶ ከመጨመርዎ ወይም ከመቀየርዎ በፊት ከታች ያለውን ማረጋገጫ ምልክት ያድርጉ።"
 },
 "legal.certify.leadOnce": {
  "en": "Read the statement below. You confirm it once for this ad, and again only if it changes.",
  "am": "ከታች ያለውን ማረጋገጫ ያንብቡ። ለዚህ ማስታወቂያ አንድ ጊዜ ያረጋግጡታል፤ ማረጋገጫው ከተቀየረ ብቻ እንደገና ይጠየቃሉ።"
 }
}

PART E — THE TESTS.
E1. Unit: (1) posting-service — `uploadPhoto` with a certification sends `certified` as the ids joined by commas and `language`; without one, neither field (the file's existing XHR double, if it has one; else a FormData spy); (2) refusal-text — `photoRefusalKey("certificationRequired")` and `photoRefusalKey("acceptanceRequired")` are `legal.certify.photosWait`; (3) contact — `revealContact` answers `{ ok: false, reason: "acceptanceRequired" }` for that body and still "failed" for an unknown reason; (4) step-photos — with `waitForStatement` the add button is disabled and `post-photos-certify-wait` shows; without it, neither.
E2. e2e/legal-certify.spec.ts — LG-19 "a photo added to a published ad needs the certification; a draft's photo does not", through the route with `uploadPhoto` from e2e/helpers/photos.ts (:87), which gains two optional options `certified?: string[]` and `language?: string` sent as the two multipart fields (absent: today's body exactly). One seller (`sellerOnPage`); ad A: a draft published through PUBLISH and made active (`makeState(A, "active")`), then a scratch statement `e2e-pub-${hex(A)}` seeded AFTER the publish (so A holds no certification — DEC-205); then: an upload without `certified` → status 409, a refusal `{ field: "legal", reason: "certificationRequired" }`, and no new photo row for A (read with the service client); an upload with the statement's version id and language "en" → ok, one photo row, `certificationsOf(A)` actions ["edit"]. Ad B: a draft of the same seller with its own statement `e2e-pub-${hex(B)}` takes a photo with no `certified` field. Cover the fixture images exactly as e2e/photo-pipeline.spec.ts does; `destroy(s)` in `finally` (photos go with their listings).
E3. e2e/legal-certify.spec.ts — LG-20 "the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own", modelled on e2e/ad-page-doors.spec.ts AP-20 (:492-569, the owner's and the buyer's reveal through `rpc`): a seller's published ad made active with a phone shown, its public id read back; a second leased account as the buyer; the buyer's reveal → ok; then a scratch `e2e-acc-${hex(A)}`; the buyer's reveal → `{ ok: false, reason: "acceptanceRequired" }`; the owner's reveal → ok. The buyer's day rows for A are removed in `finally` with the listing.
E4. e2e/legal-certify.spec.ts — LGC-5 "the photos step of a seller's edit waits for the statement": a published ad made active, then a scratch statement seeded AFTER the publish (the ad holds no certification); `gotoReady(page, `/my-listings/${A}/edit`)`; the Review shows (`post-review`); click `[data-testid="post-review-edit"][data-step="2"]` (the photos step — wizard.tsx :1445; e2e/my-listings-ad.spec.ts :984 opens step 4 the same way); `post-step-2` shows; `post-photos-add` is disabled and `post-photos-certify-wait` shows; tick `certify-tick`; the button is enabled and the line gone. No upload in this test (LG-19 proves the route).
E5. e2e/legal-certify.spec.ts — LG-21 "the statement is certified once per ad: edits, renewals and photos ask again only for a new version", through the doors as LG-18 does (`asPerson(seller)`, `me.rpc`): a draft published through PUBLISH with a scratch statement `e2e-pub-${hex(A)}` already in force, certified (`certified: [v1]`, language "en") → `certificationsOf(A)` actions ["publish"]; made active; `my_listing_certification(A)` answers no statements; `edit_my_listing(A, { title: … })` with no `p_certified` → ok and no new certification; a second version of the same scratch document published in force (the service client's direct write, version 2, effective a minute ago, as `seedDocument` writes version 1 — a small helper beside it); `my_listing_certification(A)` answers exactly v2; the same edit with no `p_certified` → `certificationRequired`; with `[v2]` → ok and actions ["publish", "edit"]. Version rows the test creates are added to the scratch list so `destroy(s)` removes them.
E6. Owed-test census (G37), in the report: every test that calls the upload route or `uploadPhoto`, or reads `reveal_listing_contact` or `my_listing_certification`, or certifies one ad twice for the same set (`grep -rln "upload/photo\|uploadPhoto\|reveal_listing_contact\|my_listing_certification\|p_certified\|legal.certify.lead" e2e src --include=*.ts --include=*.tsx`), each named with whether this turn changes what it sees. Turn 4's LG-15 to LG-18 and LGC-1 to LGC-4 seed each statement after the ad's publish or certify each set once, so DEC-205 should leave them as they are; any that does not is named with the line, and changed only where the rule changed (G38).

PART F — THE DOCS AND THE ROADMAP.
F1. docs/features/legal.md, "## Turn 4 — the publishing statement and the certification": the bullet that begins "- **Owed.**" becomes "- **Owed.** Nothing from turn 4 (photos and the contact reveal: turn 6)."; then, after the "- **Bulk Renew (turn 5).**" bullet, three new bullets — first "- **Once per ad (turn 6, DEC-205).** The tick is asked only while the ad holds no certification of exactly the statement versions now in force for it: at its first publish, and again only for a new version or a country with its own statement. legal_certify then asks for nothing and records nothing (legal_listing_certified); my_listing_certification answers no statements, so the screens show no block. This amends DEC-129's tick on every publish, edit and renew; the Terms and Privacy acceptance at sign-in is unchanged." — then "- **Photos (turn 6).** A photo added to or replaced on a published ad (any status but draft) is an edit: register_listing_photo and replace_listing_photo take p_certified and p_language and call legal_certify (action edit) before their first write; /api/upload/photo checks the same set first with the seller's my_listing_certification (refusals `legal` · `acceptanceRequired` or `certificationRequired`, 409) so a refused photo costs no screening call, and sends the ids in the multipart field `certified` (separated by commas) with `language`; the photos step of a seller's edit waits for the tick when one is owed ('Tick the statement below before you add or change a photo.'). Removing, moving and choosing the cover add no content and ask for nothing. A draft's photos are certified when it is published." and "- **The contact reveal (turn 6).** reveal_listing_contact answers {ok: false, reason: acceptanceRequired} to a viewer, never the owner, who owes a Terms or Privacy acceptance; the ad page opens the acceptance screen."
F2. docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 6 (one migration, M6; two strings): the publishing statement is certified once per ad (DEC-205: asked again only for a new version or a country with its own statement; LG-21); a photo added to or replaced on a published ad carries the publishing certification (the two photo doors, the photo route's check, the photos step's wait); the contact reveal answers acceptanceRequired to a viewer who owes an acceptance (LG-19, LG-20, LGC-5). apply <first eight characters of M6's uuid part> → expect mark 20261020070000."
F3. roadmap.md as STEP 0 says.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; LAST, `bun run i18n:map-guard` "usage maps match the tree".

PART G — M6, BY THE TOOL, LAST (the tool applies it on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; its first statement refuses unless M4b's mark is there). Before M6: paste, from ethio-prod's read tool, the live argument list, provolatile, prosecdef and proconfig of legal_certify, my_listing_certification, register_listing_photo, replace_listing_photo and reveal_listing_contact (expected: legal_certify (p_uid uuid, p_listing_id uuid, p_action text, p_certified uuid[], p_language text) v/true; my_listing_certification (p_listing_id uuid) s/true; register (p_listing_id uuid, p_photo_id uuid, p_paths jsonb, p_width integer, p_height integer, p_bytes integer, p_unscreened boolean DEFAULT false, p_warnings text[] DEFAULT '{}'::text[], p_review jsonb DEFAULT NULL::jsonb); replace the same with p_old_photo_id uuid second; reveal (p_public_id text); each v/true/{search_path=public}), and the sha256 of each one's live definition text compared with the repository's last declaration (legal_certify and my_listing_certification: supabase/migrations/20261019115742_844b64b2-424a-47fe-97d5-5523663fdba3.sql; register_listing_photo and replace_listing_photo: supabase/migrations/20261015113334_76db3ae0-4f91-4ab3-be63-0a6b9a5937b3.sql, sections C and D; reveal_listing_contact: supabase/migrations/20261017122742_dd874885-3f6b-47ce-bb23-893d2f2ddc31.sql) — if a live body differs from its file in anything but whitespace, STOP before M6 and quote the difference (M6 re-declares each whole from the file). legal_listing_certified must not exist yet. Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before the save. Then submit exactly this text for M6, once (the supervisor applied it to a scratch PostgreSQL 16 holding turns 1 to 4's legal files with stub listing and photo tables, ran its proofs, then with scratch rows rolled back: a live ad's photo refused certificationRequired, accepted with the set and recorded as edit; the next photo, with the ad certified for that set, asked nothing and recorded nothing, and the seller's read answered no statements; a new version asked again (both doors, the read answering it) and a refused replace kept the old photo; a draft's photo stored with no certification; a buyer's reveal ok, then acceptanceRequired with an owed acceptance, the owner's reveal ok, a caller refused by the photo door; and ran the repository's migration guard with M6 in place):
-- e2e-areas: legal, posting, ad-page
-- Bundle 22 (Stage 1) turn 6 — M6: the publishing statement is certified once per ad (DEC-205); a photo added to a
-- published ad carries that certification; the contact reveal waits for an owed acceptance. One new internal function
-- (legal_listing_certified) and five functions re-declared whole from their last declaration in the repository
-- (legal_certify and my_listing_certification: 20261019115742_844b64b2, M4a; register_listing_photo and
-- replace_listing_photo: 20261015113334_76db3ae0, sections C and D; reveal_listing_contact: 20261017122742_dd874885),
-- header, body, revoke and grants unchanged apart from these named changes:
--  0. DEC-205: legal_certify returns, asking for nothing and recording nothing, when the ad already holds a
--     certification of exactly the statement versions now in force for it; my_listing_certification then answers no
--     statements (the screens ask for no tick). A new version, or a country with its own statement, asks once again.
--  1. register_listing_photo and replace_listing_photo: two new arguments at the end, p_certified uuid[] DEFAULT NULL
--     and p_language text DEFAULT NULL (the argument list changes, so each is dropped and created again; the photo
--     route, their only caller, names its arguments); replace_listing_photo also reads the listing's seller_id in the
--     select that locks the row (a new variable v_seller);
--  2. in both, one call for a published ad (status other than draft), public.legal_certify(v_seller, p_listing_id,
--     'edit', p_certified, p_language), after the door's own checks and before its first write: acceptanceRequired
--     while a Terms or Privacy version is owed, certificationRequired unless the certified ids are exactly the
--     statements in force for the ad, badLanguage; with nothing in force nothing changes;
--  3. reveal_listing_contact (same arguments, replaced in place): after its availability check and before anything
--     is written, a viewer other than the owner who owes an acceptance (legal_acceptance_pending) is answered
--     {ok: false, reason: acceptanceRequired};
--  4. the revoke and grants name the new argument lists.
-- Gated on M4b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020060000') THEN
    RAISE EXCEPTION 'bundle 22 turn 4 M4b (mark 20261020060000) must be applied first';
  END IF;
END $$;

DROP FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb);
DROP FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb);

-- ===== 0 — once per ad (DEC-205) =====
-- DEC-205 — whether the ad holds a certification of exactly these statement versions (sorted, as legal_certify
-- stores them). Internal: called by legal_certify and my_listing_certification only.
CREATE FUNCTION public.legal_listing_certified(p_listing_id uuid, p_ids uuid[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.listing_certifications c
                  WHERE c.listing_id = p_listing_id AND c.version_ids = p_ids);
$$;
REVOKE ALL ON FUNCTION public.legal_listing_certified(uuid, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_listing_certified(uuid, uuid[]) TO service_role;

CREATE OR REPLACE FUNCTION public.legal_certify(p_uid uuid, p_listing_id uuid, p_action text, p_certified uuid[],
                                     p_language text)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_set  jsonb;
  v_ids  uuid[];
  v_sent uuid[];
BEGIN
  IF p_action IS NULL OR p_action NOT IN ('publish', 'edit', 'renew') THEN RAISE EXCEPTION 'badValue:action'; END IF;
  IF public.legal_acceptance_pending(p_uid, p_listing_id) THEN RAISE EXCEPTION 'acceptanceRequired'; END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  IF jsonb_array_length(v_set) = 0 THEN RETURN; END IF;
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  -- DEC-205 (the operator 2026-10-19: once per ad) — an ad already certified for exactly these statements asks for
  -- nothing more and records nothing; a new version, or a country with its own statement, asks once again.
  IF public.legal_listing_certified(p_listing_id, v_ids) THEN RETURN; END IF;
  SELECT array_agg(c ORDER BY c) INTO v_sent FROM unnest(p_certified) c;
  IF v_sent IS DISTINCT FROM v_ids THEN RAISE EXCEPTION 'certificationRequired'; END IF;
  IF p_language IS NULL OR NOT EXISTS (
       SELECT 1 FROM public.languages l WHERE l.code = p_language AND l.enabled_public) THEN
    RAISE EXCEPTION 'badLanguage';
  END IF;
  INSERT INTO public.listing_certifications
    (listing_id, user_id, action, version_ids, countries, language, home_country_code)
  VALUES (p_listing_id, p_uid, p_action, v_ids, public.legal_listing_countries(p_listing_id), p_language,
          (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid));
END;
$$;
REVOKE ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_certify(uuid, uuid, text, uuid[], text) TO service_role;


CREATE OR REPLACE FUNCTION public.my_listing_certification(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_set jsonb;
  v_ids uuid[];
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings x
                  WHERE x.id = p_listing_id AND x.seller_id = v_uid AND x.deleted_at IS NULL) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  v_set := public.legal_publishing_set(p_listing_id);
  SELECT array_agg((e ->> 'version_id')::uuid ORDER BY (e ->> 'version_id')::uuid) INTO v_ids
    FROM jsonb_array_elements(v_set) e;
  -- DEC-205 — an ad already certified for exactly these statements is not asked again: the screens see none.
  IF v_ids IS NOT NULL AND public.legal_listing_certified(p_listing_id, v_ids) THEN v_set := '[]'::jsonb; END IF;
  RETURN jsonb_build_object(
    'statements', v_set,
    'acceptance_pending', public.legal_acceptance_pending(v_uid, p_listing_id));
END;
$$;
REVOKE ALL ON FUNCTION public.my_listing_certification(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_certification(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_certification(uuid) TO service_role;


-- ===== 1 — register_listing_photo =====
CREATE FUNCTION public.register_listing_photo(
  p_listing_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL,
  p_certified uuid[] DEFAULT NULL,
  p_language text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_seller uuid; v_status text; v_cap smallint; v_count int; v_label text;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'register_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id;
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
  -- Bundle 22 turn 6 (L1 v2 item 4) — a photo added to a published ad is an edit: the acceptance and the
  -- publishing certification, before anything is written. A draft's photos are certified at its publish.
  IF v_status <> 'draft' THEN
    PERFORM public.legal_certify(v_seller, p_listing_id, 'edit', p_certified, p_language);
  END IF;
  -- D158 (bundle 13 turn 6) — a photo stored while photo screening is off is HELD:
  -- `unscreened`, shown to no buyer until staff approve the ad.
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (coalesce(p_photo_id, gen_random_uuid()), p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false))
  RETURNING id INTO p_photo_id;
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo added to a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, codes)
    VALUES (p_listing_id, 'added', p_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  UPDATE public.listings SET cover_photo_id = coalesce(cover_photo_id, p_photo_id),
    updated_at = now() WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order);
END $$;

REVOKE ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;


-- ===== 2 — replace_listing_photo =====
CREATE FUNCTION public.replace_listing_photo(
  p_listing_id uuid,
  p_old_photo_id uuid,
  p_photo_id uuid,
  p_paths jsonb,
  p_width integer,
  p_height integer,
  p_bytes integer,
  p_unscreened boolean DEFAULT false,
  p_warnings text[] DEFAULT '{}'::text[],
  p_review jsonb DEFAULT NULL,
  p_certified uuid[] DEFAULT NULL,
  p_language text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE v_order int; v_path text; v_cover uuid; v_status text; v_label text; v_seller uuid;
BEGIN
  -- Service-only: the strip route is the sole writer, because only it can
  -- attest that the EXIF was removed.
  IF auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'replace_listing_photo is called by the photo route only';
  END IF;
  -- Bundle 16 turn 4a (D178, D183) — a photo kept for a person's review is stored hidden.
  v_label := public.listing_photo_review_label(p_unscreened, p_review);
  IF p_photo_id IS NULL OR p_old_photo_id IS NULL THEN
    RAISE EXCEPTION 'photo ids are required';
  END IF;
  -- One edit of an ad's photos at a time: the listing row is locked.
  SELECT seller_id, status INTO v_seller, v_status FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'listing not found';
  END IF;
  v_path := p_paths->>'original';
  IF v_path IS NULL OR btrim(v_path) = '' THEN
    RAISE EXCEPTION 'paths.original is required';
  END IF;
  SELECT display_order INTO v_order FROM public.listing_photos
   WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'photoGone';
  END IF;
  -- Bundle 22 turn 6 (L1 v2 item 4) — a photo added to a published ad is an edit: the acceptance and the
  -- publishing certification, before anything is written. A draft's photos are certified at its publish.
  IF v_status <> 'draft' THEN
    PERFORM public.legal_certify(v_seller, p_listing_id, 'edit', p_certified, p_language);
  END IF;
  UPDATE public.listings SET cover_photo_id = NULL
   WHERE id = p_listing_id AND cover_photo_id = p_old_photo_id;
  DELETE FROM public.listing_photos WHERE id = p_old_photo_id AND listing_id = p_listing_id;
  -- D158 — a photo stored while photo screening is off is HELD (`unscreened`).
  INSERT INTO public.listing_photos (id, listing_id, storage_path, paths, display_order,
                                     exif_stripped, width, height, bytes, unscreened)
  VALUES (p_photo_id, p_listing_id, v_path, p_paths, v_order,
          true, p_width, p_height, p_bytes, coalesce(p_unscreened, false));
  -- D154 B3 (bundle 13 turn 10) — the screen's warnings, seen by the seller and staff only.
  IF cardinality(coalesce(p_warnings, '{}'::text[])) > 0 THEN
    INSERT INTO public.listing_photo_warnings (photo_id, listing_id, codes)
    VALUES (p_photo_id, p_listing_id, p_warnings);
  END IF;
  -- Bundle 16 turn 4a (D178) — the photo's review: why it is hidden, until a person decides.
  IF v_label IS NOT NULL THEN
    INSERT INTO public.listing_photo_reviews (photo_id, listing_id, label, code, evidence)
    VALUES (p_photo_id, p_listing_id, v_label, p_review->>'code',
            left(nullif(btrim(coalesce(p_review->>'evidence', '')), ''), 200));
  END IF;
  -- D154 B5 — a photo edited on a live ad is listed for staff.
  IF v_status IN ('active', 'reduced') THEN
    INSERT INTO public.listing_photo_changes (listing_id, kind, photo_id, replaced_photo_id, codes)
    VALUES (p_listing_id, 'edited', p_photo_id, p_old_photo_id, coalesce(p_warnings, '{}'::text[]));
  END IF;
  SELECT id INTO v_cover FROM public.listing_photos
   WHERE listing_id = p_listing_id ORDER BY display_order LIMIT 1;
  UPDATE public.listings SET cover_photo_id = v_cover, updated_at = now()
   WHERE id = p_listing_id;
  RETURN jsonb_build_object('ok', true, 'photo_id', p_photo_id, 'display_order', v_order,
                            'replaced', p_old_photo_id, 'cover_photo_id', v_cover);
END $$;

REVOKE ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text) TO service_role;


-- ===== 3 — reveal_listing_contact =====
CREATE OR REPLACE FUNCTION public.reveal_listing_contact(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid       uuid := auth.uid();
  v_row       public.listings%ROWTYPE;
  v_rate      jsonb;
  v_channels  jsonb;
  v_cap       integer;
  v_sellers   integer;
  v_today     integer;
  v_fresh     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  SELECT * INTO v_row FROM public.listings WHERE public_id = p_public_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  -- D201 rule 11 — a sold ad has no contact; a draft, a removed or an expired ad none either. The owner always sees his own.
  IF v_row.seller_id <> v_uid AND v_row.status <> 'active' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- Bundle 22 turn 6 (the operator 2026-10-19: no use of an account without accepting) — a viewer who owes a Terms
  -- or Privacy acceptance reveals nothing until he has accepted; the owner always sees his own.
  IF v_row.seller_id <> v_uid AND public.legal_acceptance_pending(v_uid, v_row.id) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'acceptanceRequired');
  END IF;

  IF v_row.seller_id <> v_uid
     AND NOT EXISTS (SELECT 1 FROM public.contact_reveals r
                      WHERE r.listing_id = v_row.id
                        AND r.viewer_id = v_uid
                        AND r.day = current_date) THEN
    -- D201 §6 (a) — DISTINCT SELLERS: ten different sellers in 24 hours is the ceiling (the dial, or the viewer's own
    -- override); this ad's seller does not count against it, so a viewer may always return to a seller he has reached.
    SELECT coalesce(o.max_count, d.max_count) INTO v_cap
      FROM public.rate_dials d
      LEFT JOIN public.rate_overrides o ON o.user_id = v_uid AND o.action = d.action
     WHERE d.action = 'contact_reveal_sellers';
    IF v_cap IS NULL THEN RAISE EXCEPTION 'unknown rate dial: contact_reveal_sellers'; END IF;
    SELECT count(DISTINCT l.seller_id) INTO v_sellers
      FROM public.contact_reveals r
      JOIN public.listings l ON l.id = r.listing_id
     WHERE r.viewer_id = v_uid
       AND r.created_at > now() - interval '24 hours'
       AND l.seller_id <> v_row.seller_id;
    IF v_sellers >= v_cap THEN
      -- INC-694 — the flag names a person: it carries his home country (Knowledge E3), from user_directory.
      INSERT INTO public.reveal_flags (viewer_id, day, sellers, home_country_code)
      VALUES (v_uid, current_date, v_sellers, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
      ON CONFLICT (viewer_id, day) DO UPDATE
        SET sellers = greatest(public.reveal_flags.sellers, EXCLUDED.sellers),
            hits = public.reveal_flags.hits + 1,
            last_at = now();
      RETURN jsonb_build_object('ok', false, 'reason', 'sellersCapReached',
                                'resets_at', (date_trunc('day', now() AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc');
    END IF;

    -- D201 §6 (b) — A NEW ACCOUNT: younger than 24 hours, with no listing and no reveal before today, is held to five
    -- reveals on its first day. Not a second dial: a ceiling computed here, under the 30-a-day gate below.
    SELECT (pr.created_at > now() - interval '24 hours')
           AND NOT EXISTS (SELECT 1 FROM public.listings l WHERE l.seller_id = v_uid)
           AND NOT EXISTS (SELECT 1 FROM public.contact_reveals r WHERE r.viewer_id = v_uid AND r.day < current_date)
      INTO v_fresh
      FROM public.profiles pr WHERE pr.user_id = v_uid;
    IF coalesce(v_fresh, false) THEN
      SELECT count(*) INTO v_today FROM public.contact_reveals r
       WHERE r.viewer_id = v_uid AND r.day = current_date;
      IF v_today >= 5 THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited',
                                  'resets_at', (date_trunc('day', now() AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc');
      END IF;
    END IF;

    v_rate := public.rate_gate('contact_reveal');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited',
                                'resets_at', v_rate->>'resets_at');
    END IF;
    -- INC-694 — the day row names the viewer: it carries his home country (Knowledge E3), from user_directory.
    INSERT INTO public.contact_reveals (listing_id, viewer_id, day, home_country_code)
    VALUES (v_row.id, v_uid, current_date, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT coalesce(jsonb_object_agg(e.key, e.value), '{}'::jsonb)
    INTO v_channels
    FROM jsonb_each(coalesce(v_row.contact_pref, '{}'::jsonb)) e
   WHERE e.key <> 'messages'
     AND coalesce((e.value->>'show')::boolean, false);

  RETURN jsonb_build_object('ok', true, 'channels', v_channels);
END $function$;
REVOKE ALL ON FUNCTION public.reveal_listing_contact(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reveal_listing_contact(text) TO authenticated;
GRANT ALL ON FUNCTION public.reveal_listing_contact(text) TO service_role;


-- Proofs, with no caller (G39): the old argument lists are gone; the photo doors refuse a missing listing and the
-- reveal and the seller's read a missing caller, as before; each body carries its named change; headers and grants as
-- declared. Once per ad, the photo certification and the reveal's refusal with a person are proven by LG-21, LG-19 and
-- LG-20.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  IF to_regprocedure('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') IS NOT NULL
     OR to_regprocedure('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: an old argument list still exists';
  END IF;
  BEGIN
    PERFORM public.register_listing_photo(gen_random_uuid(), gen_random_uuid(), '{"original": "x"}'::jsonb, 1, 1, 1);
    RAISE EXCEPTION 'proof failed: register_listing_photo answered a missing listing';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'listing not found' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.replace_listing_photo(gen_random_uuid(), gen_random_uuid(), gen_random_uuid(),
                                         '{"original": "x"}'::jsonb, 1, 1, 1);
    RAISE EXCEPTION 'proof failed: replace_listing_photo answered a missing listing';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'listing not found' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.reveal_listing_contact('abcdefghjk');
    RAISE EXCEPTION 'proof failed: reveal_listing_contact answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.my_listing_certification(gen_random_uuid());
    RAISE EXCEPTION 'proof failed: my_listing_certification answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  IF public.legal_listing_certified(gen_random_uuid(), ARRAY[gen_random_uuid()]) THEN
    RAISE EXCEPTION 'proof failed: legal_listing_certified answered true for a missing listing';
  END IF;
  FOR r IN SELECT * FROM (VALUES
      ('public.legal_listing_certified(uuid, uuid[])', 's'::"char", false,
       'c.version_ids = p_ids'),
      ('public.legal_certify(uuid, uuid, text, uuid[], text)', 'v'::"char", false,
       'IF public.legal_listing_certified(p_listing_id, v_ids) THEN RETURN; END IF;'),
      ('public.my_listing_certification(uuid)', 's'::"char", true,
       'public.legal_listing_certified(p_listing_id, v_ids)'),
      ('public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)', 'v'::"char", false,
       'PERFORM public.legal_certify(v_seller, p_listing_id, ''edit'', p_certified, p_language);'),
      ('public.replace_listing_photo(uuid, uuid, uuid, jsonb, integer, integer, integer, boolean, text[], jsonb, uuid[], text)', 'v'::"char", false,
       'PERFORM public.legal_certify(v_seller, p_listing_id, ''edit'', p_certified, p_language);'),
      ('public.reveal_listing_contact(text)', 'v'::"char", true,
       'public.legal_acceptance_pending(v_uid, v_row.id)')) AS t(sig, vol, auth_ok, needle) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position(r.needle IN v_src) = 0 THEN
      RAISE EXCEPTION 'proof failed: % does not carry its named change', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: anon may execute %', r.sig;
    END IF;
    IF has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok THEN
      RAISE EXCEPTION 'proof failed: % authenticated EXECUTE is not %', r.sig, r.auth_ok;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020070000') ON CONFLICT (version) DO NOTHING;
G2. Read back on ethio-prod: `select version from public.migration_marks where version = '20261020070000'` (one row); legal_listing_certified(p_listing_id uuid, p_ids uuid[]) s/true/{search_path=public}, executable by service_role only; the five headers as above, with the new argument lists of the two photo doors ending in p_certified uuid[] DEFAULT NULL::uuid[], p_language text DEFAULT NULL::text.

PART H — THE END-TO-END CHECK (after the operator's "continue": M6 must be on ethio-staging first).
H1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-certify.spec.ts --retries=0`, then e2e/photo-pipeline.spec.ts and e2e/ad-page-doors.spec.ts. Paste each run's summary lines.
H2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole. Name each failure and its fix in the final report.
H3. If the browser guard stops the run (INC-506), paste its message once, then write THE CI WAIT REPORT and END THE TURN: do not conclude.
H4. (After the operator's "continue", once CI's run on your commit has finished.) Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md: its Commit must be the commit your turn left (`git rev-parse HEAD`) — if it names an older commit, the run has not been published yet: say so in two lines and END THE TURN; the operator sends "continue" again later. Then read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md and https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md. SUCCESS, with none of LG-19, LG-20, LG-21, LGC-5 and none of e2e/legal-certify.spec.ts, e2e/photo-pipeline.spec.ts, e2e/ad-page-doors.spec.ts named as failed: the central flows are verified end-to-end — write THE FINAL REPORT. Any failure: read its body, fix it at its root cause (G38), and end the turn again with THE CI WAIT REPORT; the loop repeats on the new commit.

SCOPE — these files only: the brief; roadmap.md; src/routes/api/upload/photo.ts (B1, B2 only); src/features/posting/posting-service.ts (B3 only); src/features/posting/refusal-text.ts (B4 only); src/features/posting/step-photos.tsx (B5 only); src/features/posting/wizard.tsx (B6 only); src/features/ad-page/contact.ts (C1 only); src/features/legal/certify-block.tsx (Part D's key only); src/routes/l.$slug.tsx (C2 only); the unit tests of those files (E1; a new test file beside its module where none exists); src/i18n/locales/en.ts and am.ts (and the usage maps); e2e/legal-certify.spec.ts (LG-19, LG-20, LG-21, LGC-5 and LG-21's version helper only); e2e/helpers/photos.ts (E2's two options only); docs/features/legal.md; docs/_changelog.md; the migration file the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; the files of an A1 fix and of a Part H fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after Part G; then STOP): done or not done by part; A1's six lines with the run's number and commit (and A1's bodies, if any); <START>; B7's, C3's and E6's censuses; the string — `git diff <START> -- src/i18n/locales/en.ts src/i18n/locales/am.ts` whole (G43); `grep -n 'test("LG-19\|test("LG-20\|test("LG-21\|test("LGC-5' e2e/legal-certify.spec.ts`; the checks; the live headers and definition comparison pasted before M6 and its "Migration guard OK." line; the migration's file name and size in bytes; G2's read-backs; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging line: "apply <the uuid fragment of M6's file name> → expect mark 20261020070000". Then STOP: the operator applies M6 on ethio-staging, reads the mark back and sends "continue".
THE CI WAIT REPORT (after H3; not a conclusion): H3's message; the checks again if Part H changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; the line "Waiting for CI on <the commit this turn leaves> — send continue when the run has finished." Then END THE TURN.
THE FINAL REPORT (after H4): ci-status.md's first six lines and the run's number; the lines of e2e-last-failure.md that name this turn's tests or files, or its "passed" line; H1's summary lines for each file, H2's failures and fixes, or H3's message; the checks again if Part H changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen. Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores legal_certify, my_listing_certification, the two photo doors and the reveal from the files named in Part G (dropping legal_listing_certified) (dropping the new argument lists; forward only); git revert of this turn's commits.
```
