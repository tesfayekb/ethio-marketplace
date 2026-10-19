# Bundle 22 — Stage 1, turn 4: the publishing statement and its one tick on publish, edit and renew; the server's acceptance check (M4a, M4b): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 4 (2026-10-19). Tier A (the three seller doors re-declared; a new record of every certification). TWO MIGRATIONS BY THE TOOL (M4a, then M4b, LAST). New strings (12 keys, EN+AM, given below). No package change. No AGENTS.md change. Base: dev f570fa6d (bundle 22 turn 3). Parts, IN THIS ORDER: A — CI first and two fixes to turn 3 (INC-769, INC-770); B — the reader and the statement block; C — Publish; D — Edit; E — Renew; F — the staff card; G — the strings; H — the tests; I — the docs, the allowlist, the roadmap; J — M4a then M4b (LAST); the stop report with the apply lines; after the operator's staging applies and "continue", K — the end-to-end check; then the final report.

WHY
- The approved L1 v2 spec of 2026-10-04, item 4, and D149, D150, D152: before an ad is published, edited or renewed, the seller sees the statements that apply to it — the publishing statement for all countries, plus one for each country where the ad is shown and for his home country, where such a statement exists — and certifies them with ONE tick, "I certify the above." The server decides which statements apply and refuses when the screen certified a different set; every certification is recorded with the ad: the seller, publish, edit or renew, the statement versions, the countries, the time and the language. Staff can prepare an ad but never certify for the seller (the doors are the seller's own).
- The same three doors now refuse while the seller owes a Terms or Privacy acceptance (the operator, 2026-10-19: "can not signin without accepting … hard stop"; turn 3 built the screen, this is the server's half for publishing).
- Nothing changes today: no publishing statement, Terms or Privacy version is in force on either database, so the doors behave exactly as before and the screens show the old line above Publish. The statements are written and published by the operator in Admin › Legal (kind "Publishing statement") after the texts are approved.
- The E2E seam (as turn 3's): a scratch document of kind e2e-pub-<the listing id without dashes> applies to that one listing, and e2e-acc-<the listing id without dashes> counts as an owed acceptance for that one listing; neither exists on production. Tests never create a document of a real kind (G27).

STEP 0 — save this file (the attached bundle-22-turn-4.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-4.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-4.md (bundle 22 — Stage 1, turn 4: the publishing statement with one tick on publish, edit and renew, the certification record, the server's acceptance check; M4a, M4b). Next: Stage 1's turn 5 — the banned-items and safety pages;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 3 (docs/governance/briefs/bundle-22-turn-3.md", one new line:
  - [ ] Turn 4 (docs/governance/briefs/bundle-22-turn-4.md; M4a mark 20261020050000, M4b mark 20261020060000) — the publishing statement shown above Publish, in the edit save and in Renew, one tick, refused by the doors unless the certified versions are exactly those in force for the ad (all countries, the ad's countries, the seller's home country); listing_certifications records each; the doors refuse while a Terms or Privacy acceptance is owed; the staff card on the ad's page; owed: photo-only edits (they do not pass through edit_my_listing) and the contact reveal's acceptance check
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to I; the checks; Part J LAST; THE STOP REPORT with the two apply lines, and STOP; — the operator applies M4a and M4b on ethio-staging and sends "continue" —; Part K; THE FINAL REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- Part K is your rule's end-to-end check of the central flow, through `bun run e2e:local` only (AGENTS.md); never the preview signed in and never production. If the browser does not start (INC-506), Part K says what to do. Unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component or helper never changes its default (new behaviour is an option).
- Every legal test row is a scratch one, kind `e2e-…`, created and removed by the test; a test never writes legal_settings and never creates a document of a real kind (terms, privacy, publishing) (G27). Find a test's own rows by kind or id, never by position on a page (G28). Leased accounts at most two per test (DEC-174).
- A string is copied from Part G by key, character for character; no Amharic of your own. No literal UI text.
- Run the usage-map guard (`bun run i18n:map-guard`) LAST among the checks, after every file of the turn is written, and regenerate the maps if it asks (turn 3's final run found them stale).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND TWO FIXES TO TURN 3 (both read by the supervisor in run 1045's evidence, 95d49a70; run 1046 on f570fa6d carries the same code).
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1046 on f570fa6d (turn 3's final commit), FAILURE with the failures A2 and A3 fix (SO-4 in e2e/auth-signout.spec.ts; LAC-1, LAC-2 and LAC-4 in e2e/legal-accept.spec.ts), or still running (then read it again before the stop report and say which run you read); run 1045 on 95d49a70 is superseded. If it names any OTHER failing test or job: read its body at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md or https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38).
A2. INC-769 — the gate's query outlives a sign-out. SO-4 (e2e/auth-signout.spec.ts :186, "auth-derived queries survived the hard reset") found ["auth-derived","legal","status","",["terms","privacy"]] in the cache after sign-out: useLegalGate is called from AppShell on every page, so its useQuery observer stays mounted while signed out and keeps a disabled entry with an empty user id under AUTH_DERIVED_ROOT. Fix: the gate's query is observed only while a person is signed in — move the hook's body into a component (src/features/legal/legal-gate.tsx, `LegalGate`, rendering nothing) that AppShell renders only while `user !== null && !signingOut`, and give the query `gcTime: 0` (the rule src/features/admin/impersonation/use-impersonation.ts states for its own auth-derived probe: the entry evaporates the moment its last observer unmounts). Class census (G29), in the report: every query under AUTH_DERIVED_ROOT observed by a component that stays mounted while signed out (app-shell.tsx and the shell's children), each named with how it is kept out of the cache when signed out.
A3. INC-770 — the gate's `next` grows without end. LAC-1, LAC-2 and LAC-4 (e2e/legal-accept.spec.ts) ended on "/account?next=%2Faccount%3Fnext%3D%252Faccount…": AppShell gave the gate the SHOWN pathname (useShownPathname, the committed match, still "/account" while the navigation runs) and the router's NEW search string (state.location.searchStr, already "?next=%2Faccount"), so each re-run of the effect redirected again with the previous search folded into `next`. Fix: the gate takes the pathname and the search string from ONE location, the router's `state.location` (both selected from it), so during the navigation to /legal/accept the pathname is already exempt; `next` is that location's pathname plus its search string. Unit test (use-legal-gate.test.tsx): at /account with nothing in its search, the gate navigates once with next "/account"; at /legal/accept?next=%2Faccount it does not navigate; a change of search alone on an exempt path never navigates. Class census (G29), in the report: every navigate in src/ that builds a return path from a pathname and a search string, each named with whether both come from one location.
A4. INC-771 (no change from you; recorded): shard 1 of run 1045 never ran a test — global setup's e2e audit prune (e2e/global-setup.ts :1185, maintenance_prune_e2e_audit, 20,000 rows a call) hit staging's statement timeout. A harness surface (closed, G22); the supervisor watches it.

PART B — THE READER AND THE STATEMENT BLOCK (src/features/legal/).
B1. legal-reader.ts gains `myListingCertification(listingId)` → my_listing_certification(p_listing_id): { statements: [{ version_id, kind, country_code, version, label, body_en, body_am, settings_snapshot }], acceptance_pending: boolean }, the shape checked as the other readers check theirs.
B2. src/features/legal/certify-block.tsx — `CertifyBlock({ listingId, onChange })`, used by Parts C, D and E. It reads myListingCertification (react-query under [AUTH_DERIVED_ROOT, "legal", "certify", listingId], staleTime 0, gcTime 0 — A2's rule) and reports through onChange `{ state: "loading" | "none" | "ready" | "error", versionIds: string[], ticked: boolean, acceptancePending: boolean }`:
  - No statement applies: renders nothing and reports "none" (the screens then work as today).
  - Statements apply (data-testid="certify-block"): legal.certify.title as a heading; legal.certify.lead; each statement in order (all countries first, then by country), each in its own box (data-testid="certify-statement", data-kind=<kind>, data-country=<country code or "global">), a country statement headed legal.certify.forCountry with the country's name from `new Intl.DisplayNames([language], { type: "region" })`; its text through LegalText without toc, in the UI language (body_am for Amharic, otherwise body_en), its facts the version's settings_snapshot; then ONE checkbox with its label legal.certify.tick (data-testid="certify-tick"), unticked at first, never ticked by anything but the seller's own tap. Reports "ready" with the version ids in the order received and the tick's state.
  - A failed read: legal.certify.loadError with common.tryAgain (data-testid="certify-load-error"); reports "error" (the action stays disabled).
  - `refreshCertify()` (exported) invalidates the query and clears the tick — for a certificationRequired refusal.
B3. src/features/legal/certify-refusal.ts — `certifyRefusal(reason)`: "acceptanceRequired" → navigate (replace) to /legal/accept with next = the current path and search; "certificationRequired" → refreshCertify() and the sentence legal.certify.changed under the block (data-testid="certify-changed"); any other reason → the screen's own existing error handling. Unit tests for both.
B4. Unit tests (React Testing Library, the reader mocked): "none" renders nothing; two statements render in order with the country heading; the tick starts unticked and its state is reported; Amharic shows body_am; the load error.

PART C — PUBLISH (the posting form's review step).
C1. src/features/posting/step-review.tsx (:844-:855 at the base): CertifyBlock for the draft's listing id above the Publish button. When the block reports "none", the existing statement line (data-testid="post-publish-statement", post.review.statement) shows as today; when "ready", the line is not shown and Publish (data-testid="post-publish") is disabled until the tick; while "loading" or "error", Publish is disabled.
C2. publishListing (src/features/posting/posting-service.ts:1251) gains an optional second argument `{ certified: string[]; language: string }`, sent in the request body as `certified` and `language` only when given; src/routes/api/listings/publish.ts reads them (certified: an array of at most 20 strings each matching the uuid shape, otherwise refused as a bad request the way the route refuses a missing listingId; language: a string of at most 10 characters) and passes `p_certified` and `p_language` to publish_listing only when present. The review step passes them when the block is "ready" (the block's version ids and the UI language).
C3. A refusal certificationRequired or acceptanceRequired goes through certifyRefusal (B3); the others as today.

PART D — EDIT.
D1. editMyListing (src/features/my-listings/my-listing.ts:537) gains an optional third argument `{ certified: string[]; language: string }`, passed to edit_my_listing as p_certified and p_language only when given. Census, in the report: every caller of editMyListing — at the base, src/features/posting/use-edit-draft.ts:414 (the edit form's save) and src/features/my-listings/my-listing-page.tsx (its import :53 and every call) — and the screen each call is made from.
D2. Each of those screens shows CertifyBlock for the ad above its save button, with the same rule as C1 (the save disabled while "loading", "error", or "ready" and unticked) and passes the certification when "ready". A refusal goes through certifyRefusal.

PART E — RENEW.
E1. The renew action (src/features/my-listings/my-listing.ts:303-:305, case "renew") passes p_certified and p_language when given (the same optional argument as D1, carried by the action's caller). The screen that confirms Renew in My listings (census its file and line in the report) shows CertifyBlock above its confirm button with the rule of C1; a refusal goes through certifyRefusal.

PART F — THE STAFF CARD (the ad's admin page, src/features/admin-listings/listing-page.tsx).
F1. A PageCard "admin.listings.cert.title" (testid "listing-certifications") after the History card (:676-:798 at the base), from admin_listing_certifications(p_listing_id) through use-admin-listing.ts's pattern: one row per certification, newest first (data-testid="listing-certification", data-action=<publish|edit|renew>): admin.listings.cert.action.<action>; admin.listings.cert.meta with the date (dateStyle medium, timeStyle short, UTC), the language (admin.legal.lang.en / .am) and the countries joined with ", "; then each certified statement as "<kind name> · <scope> · Version n · <name>" (legal.kind.* or the raw kind; admin.legal.scope.global or the country's name; admin.legal.version), a link to /admin/legal/<version id> only for a viewer holding legal:view. Empty: admin.listings.cert.none (data-testid="listing-certifications-none").

PART G — THE STRINGS (12 keys; en.ts and am.ts, each key beside its neighbours of the same prefix; copied character for character).
{
 "legal.certify.title": {
  "en": "Your statement",
  "am": "የእርስዎ ማረጋገጫ"
 },
 "legal.certify.lead": {
  "en": "Read the statement below. You confirm it each time you publish, edit or renew an ad.",
  "am": "ከታች ያለውን ማረጋገጫ ያንብቡ። ማስታወቂያ ባተሙ፣ ባስተካከሉ ወይም ባደሱ ቁጥር ያረጋግጡታል።"
 },
 "legal.certify.forCountry": {
  "en": "For {country}",
  "am": "ለ{country}"
 },
 "legal.certify.tick": {
  "en": "I certify the above.",
  "am": "ከላይ ያለውን አረጋግጣለሁ።"
 },
 "legal.certify.changed": {
  "en": "The statement has just changed. Read it and tick again.",
  "am": "ማረጋገጫው አሁን ተለውጧል። ያንብቡት፤ እንደገና ምልክት ያድርጉ።"
 },
 "legal.certify.loadError": {
  "en": "The statement could not be loaded. Try again.",
  "am": "ማረጋገጫውን መጫን አልተቻለም። እንደገና ይሞክሩ።"
 },
 "admin.listings.cert.title": {
  "en": "Certifications",
  "am": "ማረጋገጫዎች"
 },
 "admin.listings.cert.none": {
  "en": "No certification yet.",
  "am": "እስካሁን ምንም ማረጋገጫ የለም።"
 },
 "admin.listings.cert.action.publish": {
  "en": "Publish",
  "am": "ማተም"
 },
 "admin.listings.cert.action.edit": {
  "en": "Edit",
  "am": "ማስተካከል"
 },
 "admin.listings.cert.action.renew": {
  "en": "Renew",
  "am": "ማደስ"
 },
 "admin.listings.cert.meta": {
  "en": "{date} · shown in {language} · countries: {countries}",
  "am": "{date} · በ{language} ታይቷል · አገሮች፦ {countries}"
 }
}

PART H — THE TESTS.
H1. Unit: B2, B3, B4; C2's route reading of certified and language (a non-uuid entry and more than 20 entries refused); D1's and E1's arguments sent only when given.
H2. e2e/legal-certify.spec.ts (NEW; area legal). The seller, his category and his listings come from the posting fixtures that e2e/my-listings-doors.spec.ts uses (`leaseSeller`, `seedPostableCategory`, `completeDraft`, `postRoute`, `statusOf`, `destroyListingsOf` in e2e/helpers/posting.ts — name the ones you use in the report); a statement for a listing is a scratch document of kind `e2e-pub-${listingId.replaceAll("-", "")}` (global, or with a country) whose v1 is in force, created and removed by the service client; an owed acceptance is a scratch document of kind `e2e-acc-${listingId.replaceAll("-", "")}`. Cleanup in finally: certifications, acceptances, versions, documents, then the seller's listings.
  - LG-15 my_listing_certification: for the seller's draft, a global statement and a statement for one of the ad's countries are listed, all countries first; a statement for a country the ad is not shown in and that is not the seller's home country is not; acceptance_pending false; another leased seller's call is refused "not your listing".
  - LG-16 publish: publish_listing without p_certified → refused certificationRequired and the listing stays a draft; with a set missing one version → the same; with exactly the versions and p_language en → screening; through the service client, one listing_certifications row: action publish, version_ids the two versions, countries the ad's countries, language en, the seller's home country; a second draft of the same seller with no statement publishes through the route as today (no certification row).
  - LG-17 acceptance: with an owed scratch acceptance for the listing, publish_listing with the right certification → refused acceptanceRequired; after accept_legal on that scratch version (as LG-4 calls it) → screening.
  - LG-18 edit and renew: an active listing of the seller (published, then made active by the service client as the my-listings specs do): edit_my_listing with a title change and no certification → refused certificationRequired; with it → ok and a row with action edit; an expired listing (made expired by the service client): renew_listing without → refused; with → ok and a row with action renew.
  - LGC-1 the review step (both projects): the seller's draft with a global statement → /post/<id> at the review step shows certify-block with the statement's text and the tick; post-publish-statement is absent; Publish is disabled; tick → Publish → in review; the certification row exists. A draft with no statement shows post-publish-statement and no certify-block (today's step).
  - LGC-2 renew in My listings: an expired listing with a global statement → the Renew confirmation shows certify-block; confirm disabled until the tick; tick → renewed; a row with action renew.
  - LGC-3 the staff card: the super admin (useJobSuperAdmin) opens /admin/listings/<id> of LGC-1's listing (or a listing certified through the door in this test) → one listing-certification row reading Publish and the statement's name; a listing with none shows listing-certifications-none.
H3. Census, in the report: every e2e test or unit test that calls publish_listing, edit_my_listing or renew_listing, the publish route or editMyListing, or asserts post-publish-statement — each named with "unchanged (no statement applies on ethio-staging)" or its change.

PART I — THE DOCS, THE ALLOWLIST, THE ROADMAP.
I1. docs/features/legal.md: a section "Turn 4 — the publishing statement and the certification" — the rule (which statements apply; one tick; the server's exact-set check; the record; staff never certify), the acceptance check in the three doors, the screens (C, D, E, F), the E2E seams (e2e-pub-, e2e-acc-, per listing), and the line: "Publish no version of the Publishing statement before turn 4 is on production: the doors refuse every publish, edit and renew that does not carry the certification." docs/features/listings.md: one line that publish_listing, edit_my_listing and renew_listing take p_certified and p_language (bundle 22 turn 4). docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 4 (two migrations, M4a and M4b): the publishing statement — the statements that apply to an ad (all countries, its countries, the seller's home country) shown above Publish, in the edit save and in Renew with one tick, 'I certify the above.'; the doors refuse unless the certified versions are exactly those in force and while a Terms or Privacy acceptance is owed; listing_certifications records each certification; the staff card on the ad's page; LG-15…LG-18, LGC-1…LGC-3; the legal gate observed only while signed in (INC-769) and fed one location (INC-770)."
I2. scripts/public-surface-allowlist.txt: after the line that begins "admin_user_legal_history |", two new lines, exactly:
my_listing_certification | the seller's own ad: the publishing statements that apply and whether an acceptance is owed; signed in, owner only (B22 Stage 1 turn 4)
admin_listing_certifications | an ad's certification record for staff; checks listings:view inside (B22 Stage 1 turn 4)
I3. roadmap.md as STEP 0 says.

PART J — M4a THEN M4B, BY THE TOOL, LAST (the tool applies each on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; M4b's first statement refuses unless M4a's mark is there). Before M4b: paste, from ethio-prod's read tool, the live argument list, provolatile, prosecdef and proconfig of publish_listing, edit_my_listing and renew_listing (expected: (p_listing_id uuid) v/true; (p_listing_id uuid, p_changes jsonb) v/true; (p_listing_id uuid) v/true; each {search_path=public}), and the sha256 of each one's live definition text compared with the repository's last declaration (publish_listing: supabase/migrations/20261004144146_923dd4cb-91bb-43a1-9c0d-e4b418c23c23.sql; edit_my_listing: 20261015130915_999a293e-b101-44fe-8262-c65d53b38d01.sql; renew_listing: 20261014194317_840e5db2-b7c8-417b-ae45-0e9f4f4f8e0e.sql) — if the live body differs from the file in anything but whitespace, STOP before M4b and quote the difference (M4b re-declares each whole from the file). Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before each save. Then submit exactly this text for M4a, once (the supervisor applied both parts to a scratch PostgreSQL 16 holding turn 1's to turn 3's legal files with stub listing tables, ran the proofs and the answers with a caller — the set for an ad in ET and KE, certificationRequired, badLanguage, the record, the staff read, finality, acceptanceRequired, renew — and ran the repository's guards with both in place):
-- e2e-areas: legal
-- Bundle 22 (Stage 1) turn 4 — M4a (part 1 of 2): the publishing certification's record and its rules (the approved
-- L1 v2 spec of 2026-10-04, item 4; D149, D150, D152). Additive; no existing function is touched. Part 2 (M4b) adds the
-- certification and the acceptance check to the three seller doors.
--  1. listing_certifications — one row per certification: the ad, the seller, the action (publish, edit, renew), the
--     statement versions certified, the ad's countries, the language shown, the time, the seller's home country. Closed
--     to the browser roles; final (no update); erased with its ad.
--  2. legal_listing_countries(listing) — the countries an ad is shown in (its places and its main place).
--  3. legal_publishing_set(listing) — the statements that apply to an ad: the version in force of every publishing
--     statement for all countries, for each country the ad is shown in, and for the seller's home country. The E2E
--     seam: a scratch document of kind e2e-pub-<the listing id without dashes> applies to that listing only (none
--     exists on production).
--  4. legal_acceptance_pending(user, listing) — true while the user has a Terms or Privacy document in force to
--     accept (the rule of my_legal_status). The E2E seam: a scratch kind e2e-acc-<the listing id without dashes>
--     counts for that listing only.
--  5. legal_certify(user, listing, action, certified, language) — refuses acceptanceRequired while an acceptance is
--     pending; when statements apply, refuses certificationRequired unless the certified ids are exactly their
--     versions, badLanguage unless the language is a public one; then records the certification. Nothing applies,
--     nothing is recorded: today's publishing is unchanged until a publishing statement is published.
--  6. my_listing_certification(listing) — the seller's read for the screens: the statements and whether an
--     acceptance is pending. admin_listing_certifications(listing) — staff with listings:view read an ad's record.
-- Gated on M3b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020030000') THEN
    RAISE EXCEPTION 'bundle 22 turn 3 M3b (mark 20261020030000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the record =====
CREATE TABLE public.listing_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  action text NOT NULL CONSTRAINT listing_certifications_action_check CHECK (action IN ('publish', 'edit', 'renew')),
  version_ids uuid[] NOT NULL CONSTRAINT listing_certifications_versions_check CHECK (cardinality(version_ids) >= 1),
  countries char(2)[] NOT NULL DEFAULT '{}',
  language text NOT NULL REFERENCES public.languages(code),
  certified_at timestamptz NOT NULL DEFAULT now(),
  home_country_code char(2) NULL REFERENCES public.countries(code)
);
CREATE INDEX listing_certifications_listing ON public.listing_certifications (listing_id, certified_at DESC);
CREATE INDEX listing_certifications_user ON public.listing_certifications (user_id);
REVOKE ALL ON public.listing_certifications FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.listing_certifications TO service_role;
ALTER TABLE public.listing_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY listing_certifications_deny_select ON public.listing_certifications
  FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY listing_certifications_deny_insert ON public.listing_certifications
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY listing_certifications_deny_update ON public.listing_certifications
  FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY listing_certifications_deny_delete ON public.listing_certifications
  FOR DELETE TO anon, authenticated USING (false);

-- A certification is final: it never changes (it is deleted only with its ad or its account).
CREATE FUNCTION public.listing_certifications_finality()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  RAISE EXCEPTION 'certificationIsFinal';
END;
$$;
REVOKE ALL ON FUNCTION public.listing_certifications_finality() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER listing_certifications_final BEFORE UPDATE ON public.listing_certifications
FOR EACH ROW EXECUTE FUNCTION public.listing_certifications_finality();

-- ===== 2 — the ad's countries =====
CREATE FUNCTION public.legal_listing_countries(p_listing_id uuid)
RETURNS char(2)[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT coalesce(array_agg(DISTINCT s.c ORDER BY s.c), '{}'::char(2)[])
    FROM (SELECT l.country_code AS c
            FROM public.listing_locations ll
            JOIN public.locations l ON l.id = ll.location_id
           WHERE ll.listing_id = p_listing_id
          UNION
          SELECT l.country_code
            FROM public.listings x
            JOIN public.locations l ON l.id = x.location_id
           WHERE x.id = p_listing_id) s;
$$;
REVOKE ALL ON FUNCTION public.legal_listing_countries(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_listing_countries(uuid) TO service_role;

-- ===== 3 — the statements that apply to an ad =====
CREATE FUNCTION public.legal_publishing_set(p_listing_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT coalesce(jsonb_agg(jsonb_build_object(
           'version_id', x.version_id,
           'kind', x.kind,
           'country_code', x.country_code,
           'version', x.version,
           'label', x.label,
           'body_en', x.body_en,
           'body_am', x.body_am,
           'settings_snapshot', x.settings_snapshot)
         ORDER BY x.country_code NULLS FIRST, x.kind), '[]'::jsonb)
    FROM (
      SELECT DISTINCT ON (d.id)
             d.kind, d.country_code, v.id AS version_id, v.version, v.label, v.body_en, v.body_am,
             v.settings_snapshot
        FROM public.legal_documents d
        JOIN public.legal_versions v ON v.document_id = d.id
       WHERE (d.kind = 'publishing' OR d.kind = 'e2e-pub-' || replace(p_listing_id::text, '-', ''))
         AND v.status = 'published'
         AND v.effective_at <= now()
         AND (d.country_code IS NULL
              OR d.country_code = ANY (public.legal_listing_countries(p_listing_id))
              OR d.country_code = (SELECT p.home_country_code
                                     FROM public.listings x
                                     JOIN public.profiles p ON p.user_id = x.seller_id
                                    WHERE x.id = p_listing_id))
       ORDER BY d.id, v.version DESC
    ) x;
$$;
REVOKE ALL ON FUNCTION public.legal_publishing_set(uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_publishing_set(uuid) TO service_role;

-- ===== 4 — an acceptance still owed =====
-- The rule of my_legal_status: a document applies while the user has accepted no version at or above the newest
-- material version in force (or version 1).
CREATE FUNCTION public.legal_acceptance_pending(p_uid uuid, p_listing_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
      FROM (
        SELECT DISTINCT ON (d.id) d.id AS document_id
          FROM public.legal_documents d
          JOIN public.legal_versions v ON v.document_id = d.id
         WHERE d.kind = ANY (ARRAY['terms', 'privacy', 'e2e-acc-' || replace(p_listing_id::text, '-', '')])
           AND v.status = 'published'
           AND v.effective_at <= now()
           AND (d.country_code IS NULL
                OR d.country_code = (SELECT p.home_country_code FROM public.profiles p WHERE p.user_id = p_uid))
         ORDER BY d.id, v.version DESC
      ) x
     WHERE NOT EXISTS (
       SELECT 1
         FROM public.legal_acceptances a
         JOIN public.legal_versions va ON va.id = a.version_id
        WHERE a.user_id = p_uid
          AND va.document_id = x.document_id
          AND va.version >= (
                SELECT max(v3.version) FROM public.legal_versions v3
                 WHERE v3.document_id = x.document_id
                   AND v3.status = 'published'
                   AND v3.effective_at <= now()
                   AND (v3.material OR v3.version = 1))));
$$;
REVOKE ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT ALL ON FUNCTION public.legal_acceptance_pending(uuid, uuid) TO service_role;

-- ===== 5 — the check and the record, for the seller doors =====
CREATE FUNCTION public.legal_certify(p_uid uuid, p_listing_id uuid, p_action text, p_certified uuid[],
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

-- ===== 6 — the reads =====
-- The seller's read for the publish, edit and renew screens: the statements that apply to his ad, and whether an
-- acceptance is still owed. Another seller's ad is refused.
CREATE FUNCTION public.my_listing_certification(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.listings x
                  WHERE x.id = p_listing_id AND x.seller_id = v_uid AND x.deleted_at IS NULL) THEN
    RAISE EXCEPTION 'not your listing';
  END IF;
  RETURN jsonb_build_object(
    'statements', public.legal_publishing_set(p_listing_id),
    'acceptance_pending', public.legal_acceptance_pending(v_uid, p_listing_id));
END;
$$;
REVOKE ALL ON FUNCTION public.my_listing_certification(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_listing_certification(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.my_listing_certification(uuid) TO service_role;

-- An ad's certifications for staff with listings:view, newest first, each with the versions certified.
CREATE FUNCTION public.admin_listing_certifications(p_listing_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'id', c.id,
             'action', c.action,
             'certified_at', c.certified_at,
             'language', c.language,
             'countries', to_jsonb(c.countries),
             'versions', coalesce((
               SELECT jsonb_agg(jsonb_build_object(
                        'version_id', v.id, 'kind', d.kind, 'country_code', d.country_code,
                        'version', v.version, 'label', v.label)
                      ORDER BY d.country_code NULLS FIRST, d.kind)
                 FROM public.legal_versions v
                 JOIN public.legal_documents d ON d.id = v.document_id
                WHERE v.id = ANY (c.version_ids)), '[]'::jsonb))
           ORDER BY c.certified_at DESC)
      FROM public.listing_certifications c
     WHERE c.listing_id = p_listing_id), '[]'::jsonb);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_listing_certifications(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_listing_certifications(uuid) TO authenticated;
GRANT ALL ON FUNCTION public.admin_listing_certifications(uuid) TO service_role;

-- Proofs, with no caller and on scratch rows only (G39; the scratch kinds are created and rolled back here): the
-- statement set and the pending acceptance answer a scratch document tied to a listing id and nothing else; the
-- certify rule refuses as declared before it writes; the two reads refuse a missing caller; the table is closed and
-- final; headers and grants as declared. The record written with a person is proven by LG-15 to LG-18. The certify
-- refusals below take the order acceptance, statements, language; they hold while no Terms or Privacy version is in
-- force (2026-10-19: nothing is published on either database).
DO $$
DECLARE
  v_lid  uuid := gen_random_uuid();
  v_hex  text;
  v_doc  uuid;
  v_set  jsonb;
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  v_hex := replace(v_lid::text, '-', '');
  BEGIN
    IF jsonb_array_length(public.legal_publishing_set(v_lid)) <> 0
       OR public.legal_acceptance_pending(gen_random_uuid(), v_lid) THEN
      RAISE EXCEPTION 'proof failed: a listing with no scratch document has statements or a pending acceptance';
    END IF;
    PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish', NULL, NULL);
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-pub-' || v_hex) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '1 day', now(), '{}'::jsonb),
           (v_doc, 2, 'published', 'v2', 'e', 'a', 'c', true, now() + interval '30 days', now(), '{}'::jsonb);
    v_set := public.legal_publishing_set(v_lid);
    IF jsonb_array_length(v_set) <> 1 OR (v_set -> 0 ->> 'version')::int <> 1
       OR v_set -> 0 ? 'changelog' THEN
      RAISE EXCEPTION 'proof failed: legal_publishing_set answered %', v_set;
    END IF;
    IF jsonb_array_length(public.legal_publishing_set(gen_random_uuid())) <> 0 THEN
      RAISE EXCEPTION 'proof failed: a scratch statement applied to another listing';
    END IF;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish', NULL, 'en');
      RAISE EXCEPTION 'proof failed: certify passed without the certified versions';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'certificationRequired' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid, gen_random_uuid()], 'en');
      RAISE EXCEPTION 'proof failed: certify passed with a different set';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'certificationRequired' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid], 'zz');
      RAISE EXCEPTION 'proof failed: certify passed with an unknown language';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'badLanguage' THEN RAISE; END IF;
    END;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'delete', NULL, 'en');
      RAISE EXCEPTION 'proof failed: certify passed an unknown action';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'badValue:action' THEN RAISE; END IF;
    END;
    INSERT INTO public.legal_documents (kind) VALUES ('e2e-acc-' || v_hex) RETURNING id INTO v_doc;
    INSERT INTO public.legal_versions (document_id, version, status, label, body_en, body_am, changelog,
                                       material, effective_at, published_at, settings_snapshot)
    VALUES (v_doc, 1, 'published', 'v1', 'e', 'a', 'c', false, now() - interval '1 day', now(), '{}'::jsonb);
    IF NOT public.legal_acceptance_pending(gen_random_uuid(), v_lid)
       OR public.legal_acceptance_pending(gen_random_uuid(), gen_random_uuid()) THEN
      RAISE EXCEPTION 'proof failed: legal_acceptance_pending did not answer the scratch document alone';
    END IF;
    BEGIN
      PERFORM public.legal_certify(gen_random_uuid(), v_lid, 'publish',
                                   ARRAY[(v_set -> 0 ->> 'version_id')::uuid], 'en');
      RAISE EXCEPTION 'proof failed: certify passed with an acceptance pending';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'acceptanceRequired' THEN RAISE; END IF;
    END;
    RAISE EXCEPTION '__m4a_proof_rollback__';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> '__m4a_proof_rollback__' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.legal_documents WHERE kind LIKE 'e2e-pub-' || v_hex OR kind LIKE 'e2e-acc-' || v_hex) THEN
    RAISE EXCEPTION 'proof failed: the scratch documents survived the rollback';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('mine'), ('staff')) AS t(door) LOOP
    BEGIN
      IF r.door = 'mine' THEN PERFORM public.my_listing_certification(gen_random_uuid());
      ELSE PERFORM public.admin_listing_certifications(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  IF has_table_privilege('anon', 'public.listing_certifications', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_certifications', 'SELECT')
     OR has_table_privilege('authenticated', 'public.listing_certifications', 'INSERT')
     OR NOT (SELECT relrowsecurity FROM pg_class WHERE oid = 'public.listing_certifications'::regclass) THEN
    RAISE EXCEPTION 'proof failed: listing_certifications is not closed to the browser roles';
  END IF;
  FOR r IN SELECT * FROM (VALUES
      ('public.legal_listing_countries(uuid)', 's'::"char", false),
      ('public.legal_publishing_set(uuid)', 's'::"char", false),
      ('public.legal_acceptance_pending(uuid, uuid)', 's'::"char", false),
      ('public.legal_certify(uuid, uuid, text, uuid[], text)', 'v'::"char", false),
      ('public.my_listing_certification(uuid)', 's'::"char", true),
      ('public.admin_listing_certifications(uuid)', 's'::"char", true)) AS t(sig, vol, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: anon may execute %', r.sig;
    END IF;
    IF has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok THEN
      RAISE EXCEPTION 'proof failed: % authenticated EXECUTE is not %', r.sig, r.auth_ok;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020050000') ON CONFLICT (version) DO NOTHING;
J1. Then submit exactly this text for M4b, once:
-- e2e-areas: legal, posting, my-listings
-- Bundle 22 (Stage 1) turn 4 — M4b (part 2 of 2): the three seller doors take the certification. Each is re-declared
-- whole from its last declaration in the repository (publish_listing: 20261004144146 M5; edit_my_listing: 20261015130915;
-- renew_listing: 20261014194317), its header, body, revoke and grants unchanged apart from three named changes:
--  1. two new arguments at the end, p_certified uuid[] DEFAULT NULL and p_language text DEFAULT NULL (the argument
--     list changes, so each door is dropped and created again; every existing call, which names only the old
--     arguments, still resolves);
--  2. one call, public.legal_certify(v_uid, p_listing_id, '<publish|edit|renew>', p_certified, p_language), placed
--     after the door's own checks and validation and before its first write: acceptanceRequired while a Terms or
--     Privacy version is owed, certificationRequired unless the certified ids are exactly the statements in force for
--     the ad, badLanguage; with nothing in force nothing changes;
--  3. the revoke and grants name the new argument list.
-- Gated on M4a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020050000') THEN
    RAISE EXCEPTION 'bundle 22 turn 4 M4a (mark 20261020050000) must be applied first';
  END IF;
END $$;

DROP FUNCTION public.publish_listing(uuid);
DROP FUNCTION public.edit_my_listing(uuid, jsonb);
DROP FUNCTION public.renew_listing(uuid);

CREATE FUNCTION public.publish_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_row public.listings%ROWTYPE;
  v_cov uuid[];
  v_val jsonb;
  v_rate jsonb;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_rate := public.rate_gate('post');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'refusals', jsonb_build_array(
      jsonb_build_object('field', 'rate', 'reason', 'rateLimited',
                         'resets_at', v_rate->>'resets_at')));
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_row.status NOT IN ('draft','rejected') THEN
    RAISE EXCEPTION 'illegal transition: % -> screening', v_row.status;
  END IF;

  -- M5 step 20 — the home-country check (bundle 3 step 12) and the naming
  -- check (step 22) live in the judge at step 8, so their refusals arrive
  -- with any others.
  SELECT array_agg(ll.location_id) INTO v_cov
    FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;

  v_val := public.validate_listing_draft(v_uid, 8::smallint, v_row.category_id, v_row.title,
             v_row.description, v_row.video_url, v_row.attributes, v_row.price_mode,
             v_row.price_amount, v_row.price_currency, v_row.price_period,
             v_row.poster_expires_at, v_cov, v_row.contact_pref, v_row.attributes,
             v_row.price_bp, v_row.price_negotiable);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'publish', p_certified, p_language);

  UPDATE public.listings SET
    status = 'screening',
    published_first_at = coalesce(published_first_at, now()),
    draft_step = 8,
    attested_at = now(),  -- M5 step 19 — the seller's statement, stamped on every publish
    updated_at = now()
  WHERE id = p_listing_id;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', 'screening'), v_uid);

  RETURN jsonb_build_object('ok', true, 'status', 'screening');
END $function$;
REVOKE ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.publish_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.publish_listing(uuid, uuid[], text) TO service_role;

CREATE FUNCTION public.edit_my_listing(p_listing_id uuid, p_changes jsonb, p_certified uuid[] DEFAULT NULL,
                                       p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_prev   public.listings%ROWTYPE;
  v_row    public.listings%ROWTYPE;
  v_val    jsonb;
  v_key    text;
  v_attrs  jsonb;
  v_video  text;
  v_review boolean;
  v_before jsonb;
  v_after  jsonb;
  v_diff_a jsonb := '{}'::jsonb;
  v_diff_b jsonb := '{}'::jsonb;
  -- Bundle 16 turn E2a (D187) — the places, the contact and the place text a box may change.
  v_step     smallint := 5;
  v_cov_prev uuid[];
  v_cov      uuid[];
  v_contact  jsonb;
  v_street   text;
  v_dirs     text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  -- What a seller's box may change (D172, D187): never the category or the end date.
  IF p_changes IS NULL OR jsonb_typeof(p_changes) <> 'object' OR p_changes = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing to change';
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_changes) k LOOP
    IF v_key NOT IN ('title','description','video_url','attributes','price_mode','price_amount',
                     'price_currency','price_period','price_bp','price_negotiable',
                     'coverage','contact_pref','street_address','directions') THEN
      RAISE EXCEPTION 'not editable: %', v_key;
    END IF;
  END LOOP;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;

  SELECT * INTO v_prev FROM public.listings WHERE id = p_listing_id FOR UPDATE;
  IF NOT FOUND OR v_prev.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_prev.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF v_prev.status = 'draft' THEN RAISE EXCEPTION 'a draft is written in the posting form'; END IF;
  -- Call G — an ad in review waits for its answer.
  IF v_prev.status IN ('screening','held') THEN
    RAISE EXCEPTION 'an ad in review is edited once its review is done';
  END IF;
  -- D174 3 — an expired ad is renewed before it is edited; an edit never renews it.
  IF v_prev.status = 'expired' THEN
    RAISE EXCEPTION 'an expired listing is renewed before it is edited';
  END IF;
  IF v_prev.status NOT IN ('active','reduced','closed','rejected') THEN
    RAISE EXCEPTION 'this listing is not edited';
  END IF;

  -- The seller's content rules for what a box changes (staff's edit is judged the same way, INC-552):
  -- validate_listing_draft through step 5, every field the seller does not change read from the ad as it stands;
  -- the end date is not sent — a box does not change it. Bundle 16 turn E2a (D187): the places are judged at step 6
  -- when sent (the plan's caps, a city or sub-city each), the contact at step 7 when sent; what is not sent is
  -- read from the ad as it stands.
  v_video := CASE WHEN p_changes ? 'video_url' THEN nullif(btrim(coalesce(p_changes->>'video_url', '')), '')
                  ELSE v_prev.video_url END;
  SELECT coalesce(array_agg(ll.location_id ORDER BY ll.position, ll.location_id), ARRAY[]::uuid[])
    INTO v_cov_prev FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id;
  IF p_changes ? 'coverage' THEN
    IF jsonb_typeof(p_changes->'coverage') <> 'array' THEN RAISE EXCEPTION 'coverage must be a list'; END IF;
    BEGIN
      SELECT coalesce(array_agg(x.value::uuid ORDER BY x.ordinality), ARRAY[]::uuid[]) INTO v_cov
        FROM jsonb_array_elements_text(p_changes->'coverage') WITH ORDINALITY x(value, ordinality);
    EXCEPTION WHEN invalid_text_representation THEN
      RAISE EXCEPTION 'coverage must be a list of place ids';
    END;
    v_step := 6;
  ELSE
    v_cov := v_cov_prev;
  END IF;
  IF p_changes ? 'contact_pref' THEN
    IF jsonb_typeof(p_changes->'contact_pref') <> 'object' THEN RAISE EXCEPTION 'contact_pref must be an object'; END IF;
    v_contact := p_changes->'contact_pref';
    v_step := 7;
  ELSE
    v_contact := v_prev.contact_pref;
  END IF;
  -- The place text, sanitised as set_listing_pin sanitises it (bundle 2 step 10): a line the seller does not send is
  -- kept as it stands; a sent empty line clears it.
  v_street := CASE WHEN p_changes ? 'street_address'
                   THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'street_address', ''),
                                                                     '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                   ELSE v_prev.street_address END;
  IF v_street IS NOT NULL AND char_length(v_street) > 200 THEN RAISE EXCEPTION 'streetTooLong:%', char_length(v_street); END IF;
  IF v_street IS NOT NULL AND v_street IS DISTINCT FROM v_prev.street_address AND public.attr_contact_like(v_street) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_dirs := CASE WHEN p_changes ? 'directions'
                 THEN nullif(btrim(regexp_replace(regexp_replace(coalesce(p_changes->>'directions', ''),
                                                                  '[[:cntrl:]<>]', ' ', 'g'), '\s+', ' ', 'g')), '')
                 ELSE v_prev.directions END;
  IF v_dirs IS NOT NULL AND char_length(v_dirs) > 200 THEN RAISE EXCEPTION 'directionsTooLong:%', char_length(v_dirs); END IF;
  IF v_dirs IS NOT NULL AND v_dirs IS DISTINCT FROM v_prev.directions AND public.attr_contact_like(v_dirs) THEN
    RAISE EXCEPTION 'contactInNote';
  END IF;
  v_val := public.validate_listing_draft(v_uid, v_step, v_prev.category_id,
    CASE WHEN p_changes ? 'title' THEN p_changes->>'title' ELSE v_prev.title END,
    CASE WHEN p_changes ? 'description' THEN p_changes->>'description' ELSE v_prev.description END,
    v_video,
    CASE WHEN p_changes ? 'attributes' THEN p_changes->'attributes' ELSE v_prev.attributes END,
    CASE WHEN p_changes ? 'price_mode' THEN p_changes->>'price_mode' ELSE v_prev.price_mode END,
    CASE WHEN p_changes ? 'price_amount' THEN (p_changes->>'price_amount')::numeric ELSE v_prev.price_amount END,
    CASE WHEN p_changes ? 'price_currency' THEN (p_changes->>'price_currency')::char(3) ELSE v_prev.price_currency END,
    CASE WHEN p_changes ? 'price_period' THEN p_changes->>'price_period' ELSE v_prev.price_period END,
    NULL, CASE WHEN cardinality(v_cov) = 0 THEN NULL ELSE v_cov END, v_contact, v_prev.attributes,
    CASE WHEN p_changes ? 'price_bp' THEN (p_changes->>'price_bp')::integer ELSE v_prev.price_bp END,
    CASE WHEN p_changes ? 'price_negotiable' THEN coalesce((p_changes->>'price_negotiable')::boolean, false)
         ELSE v_prev.price_negotiable END);
  IF NOT coalesce((v_val->>'ok')::boolean, false) THEN
    RETURN v_val;
  END IF;
  v_attrs := coalesce(v_val->'attrs', '{}'::jsonb);

  -- D177 (the operator, 2026-10-14) — what goes to review: free text — the title, the description, the video link,
  -- a typed price note, a typed answer (a text question, or the words of an "Other"); a refused ad's edit is its
  -- resubmission. Amounts and answers picked from a list apply at once and the ad stays as it is.
  -- Bundle 16 turn E2a (D187): a place or a contact change applies at once; a changed street or directions line is
  -- typed text and goes to review like the title.
  v_review := v_prev.status = 'rejected'
    OR v_street IS DISTINCT FROM v_prev.street_address
    OR v_dirs IS DISTINCT FROM v_prev.directions
    OR (v_val->>'title') IS DISTINCT FROM v_prev.title
    OR (v_val->>'description') IS DISTINCT FROM v_prev.description
    OR v_video IS DISTINCT FROM v_prev.video_url
    OR (v_val->>'price_unit_text') IS DISTINCT FROM v_prev.price_unit_text
    OR EXISTS (
      SELECT 1
        FROM (SELECT k FROM jsonb_object_keys(v_attrs) k
              UNION
              SELECT k FROM jsonb_object_keys(coalesce(v_prev.attributes, '{}'::jsonb)) k) ak(k)
       WHERE (v_attrs -> ak.k) IS DISTINCT FROM (v_prev.attributes -> ak.k)
         AND (public.attr_answer_other_text(v_attrs -> ak.k)
                IS DISTINCT FROM public.attr_answer_other_text(v_prev.attributes -> ak.k)
              OR NOT EXISTS (SELECT 1
                               FROM public.effective_category_links(v_prev.category_id) e
                               JOIN public.attributes a ON a.id = e.attribute_id
                              WHERE a.attr_key = ak.k AND a.attr_type <> 'text')));

  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'edit', p_certified, p_language);

  UPDATE public.listings SET
    title            = v_val->>'title',
    description      = v_val->>'description',
    video_url        = v_video,
    attributes       = v_attrs,
    price_amount     = (v_val->>'price_amount')::numeric,
    price_currency   = (v_val->>'price_currency')::char(3),
    price_mode       = v_val->>'price_mode',
    price_period     = v_val->>'price_period',
    price_bp         = (v_val->>'price_bp')::integer,
    price_negotiable = coalesce((v_val->>'price_negotiable')::boolean, false),
    price_unit       = v_val->>'price_unit',
    price_unit_text  = v_val->>'price_unit_text',
    -- D187 — the first place is the ad's own; the contact and the place text as sent.
    location_id      = CASE WHEN p_changes ? 'coverage' AND cardinality(v_cov) > 0 THEN v_cov[1] ELSE location_id END,
    contact_pref     = v_contact,
    street_address   = v_street,
    directions       = v_dirs,
    status           = CASE WHEN v_review THEN 'screening' ELSE v_prev.status END,
    -- Bundle 16 call A, as edit_listing — an ad that goes to review keeps the time it had left until its answer.
    clock_kept       = CASE WHEN v_review AND v_prev.status IN ('active','reduced','closed') THEN true
                            ELSE v_prev.clock_kept END,
    kept_remaining   = CASE WHEN v_review AND v_prev.status IN ('active','reduced') THEN
                              CASE WHEN v_prev.expires_at IS NULL THEN NULL
                                   ELSE greatest(v_prev.expires_at - now(), interval '0') END
                            ELSE v_prev.kept_remaining END,
    resume_status    = CASE WHEN v_review THEN NULL ELSE v_prev.resume_status END,
    updated_at       = now()
  WHERE id = p_listing_id
  RETURNING * INTO v_row;

  -- D187 — the places, rewritten in the sent order; the feed index follows (its listing_locations triggers).
  IF p_changes ? 'coverage' AND v_cov IS DISTINCT FROM v_cov_prev THEN
    DELETE FROM public.listing_locations WHERE listing_id = p_listing_id;
    INSERT INTO public.listing_locations (listing_id, location_id, position)
      SELECT p_listing_id, u.id, u.ordinality
        FROM unnest(v_cov) WITH ORDINALITY u(id, ordinality);
  END IF;

  v_after  := to_jsonb(v_row) - 'search_tsv' - 'updated_at';
  v_before := to_jsonb(v_prev) - 'search_tsv' - 'updated_at';
  IF v_cov IS DISTINCT FROM v_cov_prev THEN
    v_after  := v_after  || jsonb_build_object('coverage', to_jsonb(v_cov));
    v_before := v_before || jsonb_build_object('coverage', to_jsonb(v_cov_prev));
  END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(v_after) k LOOP
    IF (v_after->v_key) IS DISTINCT FROM (v_before->v_key) THEN
      v_diff_a := v_diff_a || jsonb_build_object(v_key, v_after->v_key);
      v_diff_b := v_diff_b || jsonb_build_object(v_key, v_before->v_key);
    END IF;
  END LOOP;
  IF v_diff_a = '{}'::jsonb THEN
    RAISE EXCEPTION 'nothing changed';
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'edit', v_diff_b, v_diff_a, v_uid);

  RETURN jsonb_build_object('ok', true, 'status', v_row.status, 'review', v_review);
END $function$;
REVOKE ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.edit_my_listing(uuid, jsonb, uuid[], text) TO service_role;

CREATE FUNCTION public.renew_listing(p_listing_id uuid, p_certified uuid[] DEFAULT NULL,
                                     p_language text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid    uuid := auth.uid();
  v_row    public.listings%ROWTYPE;
  v_policy public.listing_policy%ROWTYPE;
  v_poster timestamptz;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;
  IF v_row.seller_id <> v_uid THEN RAISE EXCEPTION 'not your listing'; END IF;
  IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
    RAISE EXCEPTION 'account is deactivated';
  END IF;
  -- D174 3, D175 2 (bundle 16) — an EXPIRED ad is renewed (a live one is not renewed early), when the admin allows it,
  -- for the admin's number of days; there is no waiting time between renewals.
  IF v_row.status <> 'expired' THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','status','reason','renewNeedsExpired')));
  END IF;
  SELECT * INTO v_policy FROM public.listing_policy WHERE id;
  IF NOT FOUND OR NOT v_policy.renew_allowed THEN
    RETURN jsonb_build_object('ok', false, 'refusals',
      jsonb_build_array(jsonb_build_object('field','renew','reason','renewOff')));
  END IF;
  -- D176 (the operator, 2026-10-14) — until the REQ-021 screening gateway exists, a renewed ad goes live at once: its
  -- content was approved and has not changed (an expired ad cannot be edited — edit_listing). It returns to the live
  -- status it expired from, with a fresh posting date (call D) and renewed_at; published_first_at is kept (D175 3).
  -- When the gateway is built, renewals pass through it.
  v_poster := CASE WHEN v_row.poster_expires_at <= now() THEN NULL ELSE v_row.poster_expires_at END;
  -- Bundle 22 turn 4 (L1 v2 item 4) — the acceptance and the publishing certification, before anything is written.
  PERFORM public.legal_certify(v_uid, p_listing_id, 'renew', p_certified, p_language);

  UPDATE public.listings SET
    status = coalesce(v_row.resume_status, 'active'),
    poster_expires_at = v_poster,
    expires_at = LEAST(v_poster, now() + make_interval(days => v_policy.renew_days)),
    published_at = now(),
    renewed_at = now(),
    renewed_count = renewed_count + 1,
    clock_kept = false, kept_remaining = NULL, resume_status = NULL,
    updated_at = now()
  WHERE id = p_listing_id;
  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_uid, 'state',
            jsonb_build_object('status', v_row.status, 'renewed_count', v_row.renewed_count,
                               'expires_at', v_row.expires_at, 'poster_expires_at', v_row.poster_expires_at),
            jsonb_build_object('status', coalesce(v_row.resume_status, 'active'),
                               'renewed_count', v_row.renewed_count + 1), v_uid);
  RETURN jsonb_build_object('ok', true, 'renewed_count', v_row.renewed_count + 1,
                            'status', coalesce(v_row.resume_status, 'active'));
END $function$;
REVOKE ALL ON FUNCTION public.renew_listing(uuid, uuid[], text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.renew_listing(uuid, uuid[], text) TO authenticated;
GRANT ALL ON FUNCTION public.renew_listing(uuid, uuid[], text) TO service_role;

-- Proofs, with no caller (G39): the old argument lists are gone; each door refuses a missing caller first, as before;
-- headers and grants as declared. The certification with a person is proven by LG-16 to LG-18.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  r      record;
BEGIN
  IF to_regprocedure('public.publish_listing(uuid)') IS NOT NULL
     OR to_regprocedure('public.edit_my_listing(uuid, jsonb)') IS NOT NULL
     OR to_regprocedure('public.renew_listing(uuid)') IS NOT NULL THEN
    RAISE EXCEPTION 'proof failed: an old argument list still exists';
  END IF;
  FOR r IN SELECT * FROM (VALUES ('publish'), ('edit'), ('renew')) AS t(door) LOOP
    BEGIN
      IF r.door = 'publish' THEN PERFORM public.publish_listing(gen_random_uuid());
      ELSIF r.door = 'edit' THEN PERFORM public.edit_my_listing(gen_random_uuid(), '{"title": "x"}'::jsonb);
      ELSE PERFORM public.renew_listing(gen_random_uuid());
      END IF;
      RAISE EXCEPTION 'proof failed: % answered a missing caller', r.door;
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
    END;
  END LOOP;
  FOR r IN SELECT * FROM (VALUES
      ('public.publish_listing(uuid, uuid[], text)'),
      ('public.edit_my_listing(uuid, jsonb, uuid[], text)'),
      ('public.renew_listing(uuid, uuid[], text)')) AS t(sig) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig INTO v_vol, v_def, v_conf
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM 'v' OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE')
       OR NOT has_function_privilege('authenticated', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020060000') ON CONFLICT (version) DO NOTHING;
J2. After each apply, paste the read-back on ethio-prod: `select version from public.migration_marks where version = '<its mark>';` (20261020050000, then 20261020060000); after M4b, one aggregated select of the argument list, provolatile, prosecdef and proconfig of publish_listing, edit_my_listing and renew_listing (each now ending "p_certified uuid[] DEFAULT NULL::uuid[], p_language text DEFAULT NULL::text"; v, true, {search_path=public}). Regenerate src/integrations/supabase/types.ts if the tool changes it.

PART K — THE END-TO-END CHECK (after the operator's "continue": M4a and M4b must be on ethio-staging first).
K1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-certify.spec.ts --retries=0`, then e2e/legal-accept.spec.ts, e2e/auth-signout.spec.ts, e2e/my-listings-doors.spec.ts and e2e/posting-routes-dials.spec.ts. Paste each run's summary lines.
K2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole. Name each failure and its fix in the final report.
K3. If the browser guard stops the run (INC-506), paste its message once and go on to the final report: CI on the final commit is then the proof.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; LAST, `bun run i18n:map-guard` "usage maps match the tree".
SCOPE — these files only: the brief; src/components/app-shell.tsx (A2 and A3 only); src/features/legal/ (use-legal-gate.ts, legal-gate.tsx, legal-reader.ts, certify-block.tsx, certify-refusal.ts and their unit tests); src/features/posting/step-review.tsx and posting-service.ts (and their unit tests); src/routes/api/listings/publish.ts; src/features/my-listings/my-listing.ts, my-listing-page.tsx and the screens D1's and E1's censuses name (and their unit tests); src/features/posting/use-edit-draft.ts; src/features/admin-listings/listing-page.tsx and use-admin-listing.ts; src/i18n/locales/en.ts and am.ts (and the usage maps); e2e/legal-certify.spec.ts (new); any test H3's census must change (named with its reason); docs/features/legal.md; docs/features/listings.md; docs/_changelog.md; scripts/public-surface-allowlist.txt; roadmap.md; the two migration files the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; the files of an A1 fix and of a Part K fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after Part J; then STOP): done or not done by part; A1's six lines with the run's number and commit (and A1's bodies, if any); <START>; A2's and A3's fixes and censuses; D1's, E1's and H3's censuses; the strings — `git diff <START> -- src/i18n/locales/en.ts src/i18n/locales/am.ts` whole (every key with its English and Amharic, G43); `grep -n 'test("' e2e/legal-certify.spec.ts` (describe the tests by those titles only); the checks; the live headers and definition comparison pasted before M4b and each "Migration guard OK." line; each migration's file name and size in bytes; J2's read-backs; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging lines, in this order: "apply <the uuid fragment of M4a's file name> → expect mark 20261020050000", then "apply <the uuid fragment of M4b's file name> → expect mark 20261020060000". Then STOP: the operator applies both on ethio-staging, reads each mark back and sends "continue".
THE FINAL REPORT (after Part K): K1's summary lines for each file, K2's failures and fixes, or K3's message; the checks again if Part K changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; anything not foreseen. Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores the three doors from their files named in Part J (dropping the new argument lists) and drops listing_certifications and the turn's functions (forward only); git revert of this turn's commits.
```
