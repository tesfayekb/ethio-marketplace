# Bundle 22 — Stage 1, turn 8 (v2): the sold ad's shown days become a legal setting (M8a–M8d, with INC-777's correction): brief (saved unchanged, 2026-10-19)

```text
BUNDLE 22 — STAGE 1, TURN 8, VERSION 2 (2026-10-19; replaces docs/governance/briefs/bundle-22-turn-8.md, never saved: version 1 asked for one more source file in src/features/my-listings/ (sold-visible-days.ts), a new module under your AGENTS.md rule; version 2 puts its read in the existing my-listing.ts and adds no module). Tier A (three public row-level policies and fourteen functions re-declared; a legal setting). FOUR MIGRATIONS BY THE TOOL (M8a, M8b, M8c, M8d, in that order, LAST). Two new strings (EN+AM, given below); one key retired. No package change. No AGENTS.md change. Base: dev ab6f1744 (bundle 22 turn 7). Line numbers below are as at 9bc5f895; turn 7 changed only e2e/legal-certify.spec.ts, e2e/legal-doors.spec.ts and docs, so they still hold for every other file. Parts, IN THIS ORDER: A — CI first, and the conclusion of turns 6 and 7; B — the legal facts card; C — the seller's sentence on a sold ad; D — the strings; E — the tests; F — the docs, the allowlist, the roadmap; the checks; G — M8a to M8d by the tool (LAST), each checked against this brief's text; THE STOP REPORT with four apply lines; after the operator's staging applies and "continue", H — the local end-to-end try; THE CI WAIT REPORT.

WHY
- DEC-129 (the operator, 2026-10-04): no fact is typed into the legal texts — every number they quote is a setting the admin can change, frozen into each published version (operator: "SHOULD ALSO BE UPDATABLE DYNAMICALLY- A MUST FOR ALL"). A sold ad stays visible to buyers, marked Sold (Rented, Filled), for 30 days after it sold (D175 1); the Terms quote that period, and today the number 30 is typed into three public row-level policies, eleven functions and the seller's page. Turn 3 recorded this as owed.
- From this turn the number is legal_settings.sold_visible_days (default 30, 1 to 365), edited in Admin › Legal › Legal facts like the other periods and quoted by the Terms as {{sold_visible_days}} (every published version freezes it in its settings_snapshot, as the other facts). Two read functions serve it: sold_visible_days() and sold_cutoff() (now() minus that many days). Every public reader asks sold_cutoff() instead of typing 30 days. With the setting at 30, every answer is the same as today.
- A change of the setting applies at once to the ad pages, saves, reports, the counts and the policies. The feed's index keeps what it holds: a shorter period takes ads out at the next sweep (feed_index_check_sweep); a longer one shows again an ad already swept out only when that ad is next refreshed. Recorded in the docs; nothing to build for it now.
- M8d is INC-777's correction: M6 landed reveal_listing_contact with the 30-a-day gate's refusal answering the next UTC midnight instead of the gate's own reset time (`v_rate->>'resets_at'`). Today the two are the same instant (the dial's window is 86,400 seconds); M8d restores the text M6's brief carried.
- INC-777's lesson: you retype each migration into the tool, and one expression changed on the way. Every migration in this brief sits between a BEGIN line and an END line; after each save you compare the tool's file with that block (G1) and STOP on any difference.

STEP 0 — save this file (the attached bundle-22-turn-8-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-8-v2.md and paste its sha256sum. roadmap.md: (1) line 3 begins "The brief in force: docs/governance/briefs/bundle-22-turn-8-v2.md (bundle 22 — Stage 1, turn 8: the sold ad's shown days as a legal setting, sold_visible_days; M8a–M8d with INC-777's correction). Next: Stage 1's banned-items and safety pages (after the curator's research), the Terms and Privacy texts' approval and Amharic, then the bundle's Publish and walk;" keeping the rest of the line from "D199 (discount / sale)" on; (2) after the line that begins "  - [ ] Turn 7 (docs/governance/briefs/bundle-22-turn-7.md", one new line:
  - [ ] Turn 8 (docs/governance/briefs/bundle-22-turn-8-v2.md; M8a mark 20261020080000, M8b 20261020090000, M8c 20261020100000, M8d 20261020110000; two strings) — the sold ad's shown days are legal_settings.sold_visible_days (default 30, 1–365; Admin › Legal facts; the Terms' {{sold_visible_days}}); sold_visible_days() and sold_cutoff(); three public policies and eleven functions read it; the seller's sentence on a sold ad says the days; INC-777's correction of reveal_listing_contact; LG-22
Tick nothing. No report file in the repository.

HOW TO WORK
- Order of the turn: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B to F; the checks; Part G LAST; THE STOP REPORT with the four apply lines, and STOP; — the operator applies M8a to M8d on ethio-staging and sends "continue" —; Part H; THE CI WAIT REPORT; END THE TURN. Do not stop between parts — a clean point is not a reason to stop. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it"), as in turns 6 and 7: your sandbox cannot start a browser (INC-506), and the preview signed in and production are never used for tests (AGENTS.md; INC-464, DEC-146). The state a real user would hit is reached by CI's full run on your commit — real Chromium at 360 and 1280 px, the built app against ethio-staging, every test. You try Part H locally; when the browser guard stops it, you end the turn WITHOUT concluding (THE CI WAIT REPORT); the next brief's Part A reads that run and concludes this turn. The operator directs this.
- Run no stateful git command: the platform commits and syncs when the turn ends. Read-only `git diff` and `git rev-parse` are fine.
- Unit tests run locally, whole. Edit spec files by hand, never by search-and-replace (G37). No assertion loosened, no timeout raised, no retry added (G38). A shared component or helper never changes its default (new behaviour is an option).
- Every test row is a scratch one; no test writes legal_settings or listing_policy and no test creates a document of a real kind (G27); scratch cleanup in afterEach (J3). Find a test's own rows by id, never by position (G28). Leased accounts at most two per test (DEC-174).
- The strings are copied from Part D by key, character for character; no Amharic of your own. No literal UI text.
- Run the usage-map guard (`bun run i18n:map-guard`) LAST among the checks, after every file of the turn is written, and regenerate the maps if it asks.
- No new module: every change sits in files that exist today (a new unit-test file beside its module is allowed), so AGENTS.md does not change.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST, AND THE CONCLUSION OF TURNS 6 AND 7.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines with the run's number and commit (you cannot git-fetch that branch). Expected: run 1050 on ab6f1744 (turn 7's last commit), FAILURE with LG-21 only (A2, A3). If it names any other failing test or job: read its body at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md or https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md, quote it in the report's first lines and fix it first, at its root cause (G21, G38).
A2. Run 1049 on 9bc5f895 (turn 6) and run 1050 on ab6f1744 (turn 7) each failed only LG-21, four times (shards 2 and 5, the changed lane, both projects): in e2e/legal-certify.spec.ts LG-21, `expect(bare.error).toContain("certificationRequired")` (after `const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });`) received "an ad in review is edited once its review is done". The supervisor's reading of the body: LG-21's first edit (a title change with no p_certified, accepted once per ad as DEC-205 intends) sends the ad to review (a title edit is reviewed, D177), so the second edit is refused by edit_my_listing's review check before it reaches legal_certify. The door and DEC-205 behave as built; the test's flow was wrong (the supervisor's slip S324, in turn 6's E5). Turn 7 did not fix it (its Part A ran before run 1049 was published). Fix: after LG-21's first edit and its "no new certification" check (`expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["publish"]);`), return the ad to active with the file's own seam (`makeState(a, "active")`, the service client on the test's own row), then publish the new version and make the second edit — no assertion changes. Turn 6 is concluded when CI shows LG-21 passing with LG-19, LG-20 and LGC-5.
A3. The conclusion of turns 6 and 7: run 1050 on ab6f1744 (turn 7's last commit; ci-status.md: FAILURE, completed 16:24 UTC) failed only LG-21 (A2); every other test of e2e/legal-certify.spec.ts and e2e/legal-doors.spec.ts passed — LG-19 and LG-7 on a retry at desktop-1280 in shard 5 (both timeouts; the supervisor ledgers them, no change from you) — and turn 6's LG-19, LG-20 and LGC-5 passed in runs 1049 and 1050. Read e2e-last-failure.md (https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md) and guards-last-failure.md (https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/guards-last-failure.md) yourself and write "TURNS 6 AND 7 — FINAL REPORT" as the first section of this turn's stop report: ci-status.md's six lines; the lines of e2e-last-failure.md that name LG-19, LG-20, LG-21, LGC-5, e2e/legal-certify.spec.ts or e2e/legal-doors.spec.ts; your verdict — every central flow of turns 6 and 7 verified end-to-end except LG-21's, whose test fix (A2) is verified by CI on this turn's commit and concluded by the next brief's Part A. If ci-status.md names a newer commit than ab6f1744 when you read it, read that run instead and say so. Any failure other than LG-21: read its body, fix it at its root cause first (G21, G38), and name it with its fix.

PART B — THE LEGAL FACTS CARD (Admin › Legal).
B1. src/features/admin/legal/legal-service.ts `FACT_KEYS` (:34-53): "sold_visible_days" after "technical_keep_months" (:52). The LegalFacts type follows src/integrations/supabase/types.ts once the tool regenerates it (the column of M8a); if the type is written by hand in the file, add `sold_visible_days: number` beside the other periods.
B2. src/features/admin/legal/facts-validation.ts `FACT_BOUNDS` (:3-13): `sold_visible_days: [1, 365]` after technical_keep_months. The card (legal-facts-card.tsx) draws every FACT_KEYS entry, a number field for a bounded key, with the label `admin.legal.fact.<key>`, so nothing else changes in it.
B3. Class census (G29), in the report: every place in src/ that lists the legal facts by name (`grep -rn "technical_keep_months" src --include=*.ts --include=*.tsx`), each named with whether it now lists sold_visible_days.

PART C — THE SELLER'S SENTENCE ON A SOLD AD (src/features/my-listings/).
C1. A read, with no new file and no new module: src/features/my-listings/my-listing.ts gains `export async function readSoldVisibleDays(): Promise<number | null>` beside `runListAction` — `supabase.rpc("sold_visible_days")`; an error, or an answer that is not a positive integer, is null. my-listing-page.tsx reads it with its own `useQuery` (the file already imports it, :1): `const soldDaysQuery = useQuery({ queryKey: ["sold-visible-days"], queryFn: readSoldVisibleDays, staleTime: 600_000 });` and `const soldDays = soldDaysQuery.data ?? null;` (null while loading or on an error; the key is public data, NOT under AUTH_DERIVED_ROOT).
C2. src/features/my-listings/state-line.ts `visibilityOf` (:50-60) gains an optional third parameter `soldDays: number = SOLD_SHOWN_DAYS` used in place of `SOLD_SHOWN_DAYS` at :57; the default and SOLD_SHOWN_DAYS (:46) stay, so every caller that passes nothing behaves as today.
C3. src/features/my-listings/my-listing-page.tsx: C1's two lines beside the other reads (:189-249); :374 becomes `const seen = soldDays === null && row.status === "sold" ? null : visibilityOf(row, Date.now(), soldDays ?? SOLD_SHOWN_DAYS);` — for a sold ad the sentence waits for the read (the line at :560-570 is not drawn while `seen` is null), every other ad as today; the sold sentence (:566-567) becomes `fill(t("myListings.ad.soldSeenDays"), { word: t(SOLD_RIBBON[row.soldWord]), days: String(soldDays) })`. `myListings.ad.soldSeen` is then unread and is removed from en.ts (:181) and am.ts (:176) (Knowledge D5: the old key retired when unread).
C4. Class census (G29), in the report: every other place in src/ where the sold ad's 30 days is typed as a number or said in a string (`grep -rn "SOLD_SHOWN_DAYS\|30 days\|30 \* 86" src --include=*.ts --include=*.tsx`, the locale files' sold-ad strings), each named with whether this turn changes it. Comments that describe the default are kept.

PART D — THE STRINGS (two new keys; en.ts and am.ts; copied character for character): `admin.legal.fact.sold_visible_days` after "admin.legal.fact.technical_keep_months" (en.ts :3191, am.ts :3036); `myListings.ad.soldSeenDays` where `myListings.ad.soldSeen` stands today (en.ts :181, am.ts :176):
{
 "admin.legal.fact.sold_visible_days": {
  "en": "Days a sold ad stays visible to buyers",
  "am": "የተሸጠ ማስታወቂያ ለገዢዎች የሚታይበት ጊዜ፣ በቀናት"
 },
 "myListings.ad.soldSeenDays": {
  "en": "Buyers see it marked {word} for {days} days, and can't contact you.",
  "am": "ገዢዎች ለ{days} ቀናት {word} የሚል ምልክት ይዞ ያዩታል፤ ሊያገኙዎት አይችሉም።"
 }
}

PART E — THE TESTS.
E1. Unit: (1) state-line — `visibilityOf` of an ad sold 35 days ago is "hidden" with no third argument and "soldSeen" with 40; SOLD_SHOWN_DAYS stays 30 (my-listings.test.ts :126 unchanged); (2) facts-validation — sold_visible_days accepts 1 and 365 and refuses 0 and 366 (beside the other bounds, facts-validation.test.ts :31-33); (3) legal-service — FACT_KEYS lists sold_visible_days (legal-service.test.ts :44-48); (4) my-listing — `readSoldVisibleDays` answers the number, null for an error, null for 0 or a non-integer (the rpc mocked as my-listing-edit.test.ts mocks it).
E2. e2e/legal-certify.spec.ts — LG-22 "the sold ad's shown days are the legal setting: the public read follows sold_cutoff()", through the doors: read `legal_settings.sold_visible_days` with the service client (N; never written); an anonymous caller's `sold_visible_days()` answers N; a scratch seller's draft published through PUBLISH and made active, then marked sold with the service client on the test's own row (`status = 'sold'`, `sold_at` = now − (N − 1) days) — an anonymous `public_listing(<its public id>)` answers it; `sold_at` = now − (N + 1) days — the same read answers null. Cleanup in the file's afterEach (J3).
E3. Owed-test census (G37), in the report: every test that reads a sold ad through the public reads, the feed or the counts, or the facts card's fields, or `myListings.ad.soldSeen` (`grep -rln "sold_at\|soldSeen\|legal-fact-input\|FACT_KEYS\|sold" e2e src --include=*.ts --include=*.tsx`), each named with whether this turn changes what it sees (with the setting at 30, none should).

PART F — THE DOCS, THE ALLOWLIST, THE ROADMAP.
F1. docs/features/legal.md: a new section at the end, "## Turn 8 — the sold ad's shown days as a setting", with these bullets: "- **The setting.** legal_settings.sold_visible_days (default 30, 1 to 365), edited in Admin › Legal facts with the other periods; the Terms quote it as {{sold_visible_days}}; each published version freezes it (settings_snapshot)." "- **The reads.** sold_visible_days() answers the number and sold_cutoff() now() minus that many days; both stable, security definer, executable by anon, authenticated and service_role (the public policies call sold_cutoff() for every reader)." "- **Who reads it.** The policies listings_public_read, listing_photos_public_read and listing_locations_public_read; feed_index_refresh, feed_index_check, feed_index_check_sweep, feed_page, seller_feed_page, public_listing, count_listing_view, count_listing_share, save_listing, report_listing and my_saved_listings (each through `(SELECT public.sold_cutoff())`); the seller's ad page for its sentence." "- **A change of the setting.** Applies at once to the ad pages, saves, reports, counts and policies. The feed's index keeps what it holds: a shorter period takes ads out at the next sweep; a longer one shows again an ad already swept out only when that ad is next refreshed." "- **INC-777.** M8d restores reveal_listing_contact's 30-a-day refusal to answer the gate's own reset time."
F2. scripts/public-surface-allowlist.txt: two lines at the end, exactly:
sold_visible_days | the sold ad's shown days (bundle 22 turn 8, M8a): a number from legal_settings, read by the seller's ad page and quoted by the Terms; no personal data
sold_cutoff | now() minus the sold ad's shown days (bundle 22 turn 8, M8a): called by the three public row-level policies for every reader; no personal data
F3. docs/_changelog.md APPEND one line: "- 2026-10-19 — Bundle 22 (Stage 1) turn 8 (four migrations, M8a–M8d; two strings): the sold ad's shown days are the legal setting sold_visible_days (default 30; Admin › Legal facts; the Terms' {{sold_visible_days}}); sold_visible_days() and sold_cutoff(); three public policies and eleven functions read it; the seller's sentence says the days; INC-777's correction (M8d); LG-22. apply <M8a's eight characters> → expect mark 20261020080000; apply <M8b's> → 20261020090000; apply <M8c's> → 20261020100000; apply <M8d's> → 20261020110000."
F4. roadmap.md as STEP 0 says.

THE CHECKS (whole; paste the last line of each): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` (the real count); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `bash scripts/check-browse-imports.sh` OK; `bash scripts/check-migrations.sh` "Migration guard OK."; the preview harness's "build OK"; LAST, `bun run i18n:map-guard` "usage maps match the tree".

PART G — M8a, M8b, M8c, M8d, BY THE TOOL, LAST, IN THAT ORDER (the tool applies each on ethio-prod the moment it is saved, after the operator allows the "Modify Supabase database" dialog; each gates on the mark before it: M8a on M6's 20261020070000).
G0. Before M8a, from ethio-prod's read tool, paste for each function the parts re-declare — admin_set_legal_settings, feed_index_refresh, feed_index_check, feed_index_check_sweep, public_listing, count_listing_view, count_listing_share, save_listing, report_listing, feed_page, seller_feed_page, my_saved_listings, reveal_listing_contact — its live argument list, provolatile, prosecdef, proconfig, whether anon and authenticated may EXECUTE it, and the sha256 of its live definition text compared with the repository's last declaration ignoring whitespace (admin_set_legal_settings: 20261019103756_2bd8e360; feed_index_refresh, feed_index_check, feed_index_check_sweep: 20261015023155_3600a562; public_listing, count_listing_view, count_listing_share: 20261017044823_6a61a7ca; save_listing: 20261017122742_dd874885; report_listing: 20261017115807_1c740888; feed_page: 20261017060602_19df1767; seller_feed_page: 20261017135824_7d6dcee1; my_saved_listings: 20261017132201_423af801; reveal_listing_contact: 20261019140533_709c3922, turn 6's M6 as landed); and the USING clause of the policies listings_public_read, listing_photos_public_read and listing_locations_public_read (pg_policies.qual). Expected: every body equal to its file, the grants as each file restates them, the policies as in 20261015023155_3600a562 section G. Any difference: STOP before M8a and quote it (each part re-declares whole from the file). legal_settings.sold_visible_days, sold_visible_days() and sold_cutoff() must not exist yet.
G1. THE TEXT CHECK, after EACH save and before the next: write the block between that migration's BEGIN and END lines below (the two lines themselves excluded) from the saved docs/governance/briefs/bundle-22-turn-8.md to a scratch file outside the repository with a script (never by hand), run `diff <scratch file> <the saved migration file>` and paste its output. Expected: nothing, or only "\ No newline at end of file". Any other line: STOP — say so first in the stop report, save no further migration, and quote the diff (INC-777).
G2. Run `bash scripts/check-migrations.sh` and paste its last line ("Migration guard OK.") before the first save and after the last. Then submit exactly these texts, in order, each once, each followed by G1 and by the read-back of its mark (`select version from public.migration_marks where version = '<its mark>'`, one row). The supervisor applied all four, in order, to a scratch PostgreSQL 16 holding bundle 22's legal files, turn 6's M6 as landed and stub listing tables (the sql-language feed_index_check with function bodies unchecked), ran their proofs, then with scratch rows rolled back: as anon at 30 days an active ad and an ad sold 29 days ago are read and one sold 31 days ago is not; at 40 days the third is read too; sold_visible_days() answers the setting; the setting's bounds refuse 0 and 366; the settings snapshot carries sold_visible_days; admin_set_legal_settings sets 45 and refuses 0 and 366 as badValue:sold_visible_days; and the repository's migration guard passed with the four files and F2's two allowlist lines in place.
=== M8a BEGIN ===
-- e2e-areas: legal, feed, ad-page
-- Bundle 22 (Stage 1) turn 8 — M8a (part 1 of 4): the sold ad's shown window becomes a legal setting. A sold ad is seen
-- by buyers, marked with its word, for a number of days after it sold (D175 1); until now every public door, the feed's
-- index and three row-level policies carried the number 30 typed into their text. From this part the number lives in
-- legal_settings.sold_visible_days (default 30, 1 to 365), the setting the Terms quote as {{sold_visible_days}} (each
-- published version freezes it in its settings_snapshot, DEC-129), and two read functions serve it:
--  1. legal_settings gains sold_visible_days integer NOT NULL DEFAULT 30, checked 1 to 365;
--  2. public.sold_visible_days() (the number) and public.sold_cutoff() (now() minus that many days), stable, security
--     definer, executable by anon, authenticated and service_role — the row-level policies of M8b call sold_cutoff()
--     for every reader, and the seller's ad page reads sold_visible_days() for its sentence;
--  3. admin_set_legal_settings, re-declared whole from 20261019103756_2bd8e360 (M3b), takes sold_visible_days with the
--     other numbers (four named changes: the key list, the number list, the bound 1 to 365, the assignment).
-- Parts 2 and 3 (M8b, M8c) move every reader to sold_cutoff(); part 4 (M8d) is INC-777's correction.
-- Gated on M6's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020070000') THEN
    RAISE EXCEPTION 'bundle 22 turn 6 M6 (mark 20261020070000) must be applied first';
  END IF;
END $$;

ALTER TABLE public.legal_settings
  ADD COLUMN sold_visible_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_sold_visible_days_check CHECK (sold_visible_days BETWEEN 1 AND 365);

CREATE FUNCTION public.sold_visible_days()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT s.sold_visible_days FROM public.legal_settings s WHERE s.id;
$$;
REVOKE ALL ON FUNCTION public.sold_visible_days() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sold_visible_days() TO anon, authenticated, service_role;

CREATE FUNCTION public.sold_cutoff()
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT now() - make_interval(days => public.sold_visible_days());
$$;
REVOKE ALL ON FUNCTION public.sold_cutoff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.sold_cutoff() TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.admin_set_legal_settings(p_settings jsonb)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_before jsonb;
  v_after  public.legal_settings%ROWTYPE;
  v_key    text;
  v_text   text;
  v_num    integer;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'legal', 'edit') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('legal', 'edit');
  IF p_settings IS NULL OR jsonb_typeof(p_settings) <> 'object' THEN RAISE EXCEPTION 'badValue:settings'; END IF;
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key NOT IN ('operator_name','operator_address','legal_email','privacy_email','governing_law',
                     'providers','copyright_agent','liability_limit_usd','notice_days','response_days',
                     'response_extra_days','deleted_ad_keep_months','dispute_keep_years',
                     'operator_details','legal_phone','security_email','listed_ad_keep_months',
                     'account_keep_months','technical_keep_months','sold_visible_days') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days') THEN
      v_text := p_settings ->> v_key;
      IF v_text IS NULL OR v_text !~ '^[0-9]{1,7}$' THEN RAISE EXCEPTION 'badValue:%', v_key; END IF;
      v_num := v_text::integer;
      IF (v_key = 'liability_limit_usd' AND v_num > 1000000)
         OR (v_key = 'notice_days' AND v_num > 365)
         OR (v_key = 'response_days' AND (v_num < 1 OR v_num > 90))
         OR (v_key = 'response_extra_days' AND v_num > 90)
         OR (v_key = 'deleted_ad_keep_months' AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'dispute_keep_years' AND v_num > 20)
         OR (v_key IN ('listed_ad_keep_months','account_keep_months','technical_keep_months')
             AND (v_num < 1 OR v_num > 120))
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365)) THEN
        RAISE EXCEPTION 'badValue:%', v_key;
      END IF;
    END IF;
  END LOOP;
  -- The new texts are checked before anything is written as well (M3).
  IF p_settings ? 'operator_details' AND length(coalesce(p_settings ->> 'operator_details', '')) > 2000 THEN
    RAISE EXCEPTION 'badValue:operator_details';
  END IF;
  IF p_settings ? 'legal_phone' AND coalesce(p_settings ->> 'legal_phone', '') <> ''
     AND (p_settings ->> 'legal_phone') !~ '^\+?[0-9][0-9 ()-]{4,37}[0-9]$' THEN
    RAISE EXCEPTION 'badValue:legal_phone';
  END IF;
  IF p_settings ? 'security_email'
     AND coalesce(p_settings ->> 'security_email', '') !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  IF p_settings ? 'security_email' AND length(p_settings ->> 'security_email') > 320 THEN
    RAISE EXCEPTION 'badValue:security_email';
  END IF;
  SELECT to_jsonb(s) - 'id' - 'updated_by' INTO v_before FROM public.legal_settings s WHERE s.id FOR UPDATE;
  UPDATE public.legal_settings SET
    operator_name = CASE WHEN p_settings ? 'operator_name' THEN p_settings ->> 'operator_name' ELSE operator_name END,
    operator_address = CASE WHEN p_settings ? 'operator_address' THEN p_settings ->> 'operator_address' ELSE operator_address END,
    legal_email = CASE WHEN p_settings ? 'legal_email' THEN p_settings ->> 'legal_email' ELSE legal_email END,
    privacy_email = CASE WHEN p_settings ? 'privacy_email' THEN p_settings ->> 'privacy_email' ELSE privacy_email END,
    governing_law = CASE WHEN p_settings ? 'governing_law' THEN p_settings ->> 'governing_law' ELSE governing_law END,
    providers = CASE WHEN p_settings ? 'providers' THEN p_settings ->> 'providers' ELSE providers END,
    copyright_agent = CASE WHEN p_settings ? 'copyright_agent'
                           THEN NULLIF(p_settings ->> 'copyright_agent', '') ELSE copyright_agent END,
    liability_limit_usd = CASE WHEN p_settings ? 'liability_limit_usd'
                               THEN (p_settings ->> 'liability_limit_usd')::integer ELSE liability_limit_usd END,
    notice_days = CASE WHEN p_settings ? 'notice_days'
                       THEN (p_settings ->> 'notice_days')::integer ELSE notice_days END,
    response_days = CASE WHEN p_settings ? 'response_days'
                         THEN (p_settings ->> 'response_days')::integer ELSE response_days END,
    response_extra_days = CASE WHEN p_settings ? 'response_extra_days'
                               THEN (p_settings ->> 'response_extra_days')::integer ELSE response_extra_days END,
    deleted_ad_keep_months = CASE WHEN p_settings ? 'deleted_ad_keep_months'
                                  THEN (p_settings ->> 'deleted_ad_keep_months')::integer ELSE deleted_ad_keep_months END,
    dispute_keep_years = CASE WHEN p_settings ? 'dispute_keep_years'
                              THEN (p_settings ->> 'dispute_keep_years')::integer ELSE dispute_keep_years END,
    operator_details = CASE WHEN p_settings ? 'operator_details'
                            THEN NULLIF(btrim(coalesce(p_settings ->> 'operator_details', '')), '') ELSE operator_details END,
    legal_phone = CASE WHEN p_settings ? 'legal_phone'
                       THEN NULLIF(btrim(coalesce(p_settings ->> 'legal_phone', '')), '') ELSE legal_phone END,
    security_email = CASE WHEN p_settings ? 'security_email' THEN p_settings ->> 'security_email' ELSE security_email END,
    listed_ad_keep_months = CASE WHEN p_settings ? 'listed_ad_keep_months'
                                 THEN (p_settings ->> 'listed_ad_keep_months')::integer ELSE listed_ad_keep_months END,
    account_keep_months = CASE WHEN p_settings ? 'account_keep_months'
                               THEN (p_settings ->> 'account_keep_months')::integer ELSE account_keep_months END,
    technical_keep_months = CASE WHEN p_settings ? 'technical_keep_months'
                                 THEN (p_settings ->> 'technical_keep_months')::integer ELSE technical_keep_months END,
    sold_visible_days = CASE WHEN p_settings ? 'sold_visible_days'
                             THEN (p_settings ->> 'sold_visible_days')::integer ELSE sold_visible_days END,
    updated_at = now(),
    updated_by = v_uid
   WHERE id
  RETURNING * INTO v_after;
  -- Per-field validation after assignment so the CHECK bounds and the text rules share one refusal shape.
  FOREACH v_text IN ARRAY ARRAY[v_after.legal_email, v_after.privacy_email] LOOP
    IF v_text IS NULL OR v_text !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN RAISE EXCEPTION 'badValue:email'; END IF;
  END LOOP;
  IF v_after.operator_name IS NULL OR length(btrim(v_after.operator_name)) = 0
     OR length(v_after.operator_name) > 2000 THEN RAISE EXCEPTION 'badValue:operator_name'; END IF;
  IF v_after.operator_address IS NULL OR length(btrim(v_after.operator_address)) = 0
     OR length(v_after.operator_address) > 2000 THEN RAISE EXCEPTION 'badValue:operator_address'; END IF;
  IF v_after.governing_law IS NULL OR length(btrim(v_after.governing_law)) = 0
     OR length(v_after.governing_law) > 2000 THEN RAISE EXCEPTION 'badValue:governing_law'; END IF;
  IF v_after.providers IS NULL OR length(btrim(v_after.providers)) = 0
     OR length(v_after.providers) > 2000 THEN RAISE EXCEPTION 'badValue:providers'; END IF;
  IF v_after.copyright_agent IS NOT NULL AND length(v_after.copyright_agent) > 2000 THEN
    RAISE EXCEPTION 'badValue:copyright_agent';
  END IF;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'legal.settings_set', 'legal_settings', 'settings',
          jsonb_build_object('before', v_before, 'after', to_jsonb(v_after) - 'id' - 'updated_by'));
  RETURN jsonb_build_object('ok', true);
END;
$$;
REVOKE ALL ON FUNCTION public.admin_set_legal_settings(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_legal_settings(jsonb) TO service_role;

-- Proofs, with no caller (G39): the column and its bounds; the two reads answer the setting; the settings door refuses
-- a missing caller and carries the new key; headers and grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                  WHERE table_schema = 'public' AND table_name = 'legal_settings' AND column_name = 'sold_visible_days'
                    AND data_type = 'integer' AND is_nullable = 'NO' AND column_default = '30') THEN
    RAISE EXCEPTION 'proof failed: legal_settings.sold_visible_days is not integer NOT NULL DEFAULT 30';
  END IF;
  IF (SELECT pg_get_constraintdef(c.oid) FROM pg_constraint c
       WHERE c.conname = 'legal_settings_sold_visible_days_check') IS DISTINCT FROM
     'CHECK (((sold_visible_days >= 1) AND (sold_visible_days <= 365)))' THEN
    RAISE EXCEPTION 'proof failed: the bound of sold_visible_days';
  END IF;
  IF public.sold_visible_days() IS DISTINCT FROM (SELECT s.sold_visible_days FROM public.legal_settings s WHERE s.id) THEN
    RAISE EXCEPTION 'proof failed: sold_visible_days() does not answer the setting';
  END IF;
  IF public.sold_cutoff() IS DISTINCT FROM now() - make_interval(days => public.sold_visible_days()) THEN
    RAISE EXCEPTION 'proof failed: sold_cutoff() is not now() minus the setting';
  END IF;
  BEGIN
    PERFORM public.admin_set_legal_settings('{"sold_visible_days": "30"}'::jsonb);
    RAISE EXCEPTION 'proof failed: admin_set_legal_settings answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  FOR r IN SELECT * FROM (VALUES
      ('public.sold_visible_days()', 's'::"char", true, true, 'sold_visible_days'),
      ('public.sold_cutoff()', 's'::"char", true, true, 'public.sold_visible_days()'),
      ('public.admin_set_legal_settings(jsonb)', 'v'::"char", false, true,
       'OR (v_key = ''sold_visible_days'' AND (v_num < 1 OR v_num > 365))')) AS t(sig, vol, anon_ok, auth_ok, needle) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position(r.needle IN v_src) = 0 THEN
      RAISE EXCEPTION 'proof failed: % does not carry its named change', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok
       OR has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok
       OR NOT has_function_privilege('service_role', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020080000') ON CONFLICT (version) DO NOTHING;
=== M8a END ===
=== M8b BEGIN ===
-- e2e-areas: feed, ad-page, legal
-- Bundle 22 (Stage 1) turn 8 — M8b (part 2 of 4): the three public row-level policies and eight functions read the sold
-- window from the setting. Each policy is re-created whole from 20261015023155_3600a562 (section G) and each function
-- re-declared whole from its last declaration in the repository (feed_index_refresh, feed_index_check and
-- feed_index_check_sweep: 20261015023155_3600a562; public_listing, count_listing_view and count_listing_share:
-- 20261017044823_6a61a7ca; save_listing: 20261017122742_dd874885; report_listing: 20261017115807_1c740888), header,
-- body, revoke and grants unchanged apart from one named change in each: the expression now() - interval '30 days'
-- becomes (SELECT public.sold_cutoff()) (a scalar subquery, read once per statement). Comments that say "30 days" are
-- kept: 30 is the setting's default. With the setting at 30, every answer is the same as before.
-- Gated on M8a's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020080000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8a (mark 20261020080000) must be applied first';
  END IF;
END $$;

DROP POLICY IF EXISTS listings_public_read ON public.listings;
CREATE POLICY listings_public_read ON public.listings
  FOR SELECT TO anon, authenticated
  USING (status = 'active' OR (status = 'sold' AND sold_at > (SELECT public.sold_cutoff())));

DROP POLICY IF EXISTS listing_photos_public_read ON public.listing_photos;
CREATE POLICY listing_photos_public_read ON public.listing_photos
  FOR SELECT TO anon, authenticated
  USING (
    exif_stripped
    AND NOT unscreened
    AND EXISTS (
      SELECT 1 FROM public.listings l
       WHERE l.id = listing_photos.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
    )
  );

DROP POLICY IF EXISTS listing_locations_public_read ON public.listing_locations;
CREATE POLICY listing_locations_public_read
  ON public.listing_locations FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.listings l
     WHERE l.id = listing_id
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))));

CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_tier        text;
  v_sold_at     timestamptz;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
    INTO v_status, v_published, v_category_id, v_location_id, v_tier, v_sold_at
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
  IF v_published IS NULL
     OR NOT (v_status = 'active' OR (v_status = 'sold' AND v_sold_at > (SELECT public.sold_cutoff()))) THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key,
         CASE WHEN v_status = 'sold' THEN -1 ELSE public.feed_tier_rank(v_tier) END, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier, l.sold_at
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    -- Bundle 16 turn 3c (D175 1) — a sold ad stays in the feed for 30 days after it sold, read after the live ones.
    SELECT * FROM scope
     WHERE published_at IS NOT NULL
       AND (status = 'active' OR (status = 'sold' AND sold_at > (SELECT public.sold_cutoff())))
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'sold_shown',
      (SELECT count(*) FROM live WHERE status = 'sold'),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE NOT EXISTS (SELECT 1 FROM live v WHERE v.id = s.id)),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, CASE WHEN v.status = 'sold' THEN -1 ELSE public.feed_tier_rank(v.tier) END, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.feed_index_check_sweep()
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_result jsonb;
  v_id     uuid;
  v_gone   integer := 0;
BEGIN
  -- Bundle 16 turn 3c (D175 1) — a sold ad whose 30 days are over leaves the feed: its rows go (feed_page already
  -- reads only the ads it shows).
  FOR v_id IN
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
      JOIN public.listings l ON l.id = f.listing_id
     WHERE l.status = 'sold' AND (l.sold_at IS NULL OR l.sold_at <= (SELECT public.sold_cutoff()))
  LOOP
    PERFORM public.feed_index_refresh(v_id);
    v_gone := v_gone + 1;
  END LOOP;
  v_result := public.feed_index_check(NULL)
              || jsonb_build_object('queued', (SELECT count(*) FROM public.feed_reindex_queue),
                                    'sold_left_feed', v_gone);
  INSERT INTO public.feed_index_check_runs (result) VALUES (v_result);
  DELETE FROM public.feed_index_check_runs WHERE ran_at < now() - interval '60 days';
  -- A queue that still holds rows is woken again (its drain stops only when the queue is empty).
  IF (v_result->>'queued')::int > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_result;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_check_sweep() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check_sweep() TO service_role;

CREATE OR REPLACE FUNCTION public.public_listing(p_public_id text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row  public.listings%ROWTYPE;
  v_rate jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RETURN NULL;
  END IF;
  -- A signed-in caller is counted here; an anonymous caller is counted by the route, by hashed address.
  v_rate := public.rate_gate('listing_read');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RAISE EXCEPTION 'rateLimited';
  END IF;
  -- listings_public_read (20261015023155), restated: live, or sold within 30 days. Anything else is "not there".
  SELECT * INTO v_row FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  RETURN public.public_listing_json(v_row, auth.uid());
END $$;
REVOKE ALL ON FUNCTION public.public_listing(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.public_listing(text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.count_listing_view(p_public_id text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id     uuid;
  v_seller uuid;
  v_gate   jsonb;
BEGIN
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN RETURN false; END IF;
  -- The owner's own view is not a view.
  IF p_viewer IS NOT NULL AND p_viewer = v_seller THEN RETURN false; END IF;
  -- One count per address and ad per hour: the first call in the window counts, the rest do not.
  v_gate := public.consume_rate_limit('listing_view', p_rate_key || ':' || p_public_id, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, views) VALUES (v_id, current_date, 1)
  ON CONFLICT (listing_id, day) DO UPDATE SET views = public.listing_counters.views + 1;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_view(text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_view(text, text, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.count_listing_share(p_public_id text, p_channel text, p_rate_key text, p_viewer uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id   uuid;
  v_gate jsonb;
BEGIN
  IF p_channel IS NULL OR p_channel NOT IN ('telegram', 'whatsapp', 'facebook', 'copy', 'qr') THEN
    RAISE EXCEPTION 'unknown share channel';
  END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN RETURN false; END IF;
  IF p_rate_key IS NULL OR btrim(p_rate_key) = '' THEN RAISE EXCEPTION 'rate key required'; END IF;
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF NOT FOUND THEN RETURN false; END IF;
  v_gate := public.consume_rate_limit('listing_share', p_rate_key || ':' || p_public_id || ':' || p_channel, 1, interval '1 hour');
  IF NOT coalesce((v_gate->>'allowed')::boolean, false) THEN RETURN false; END IF;
  INSERT INTO public.listing_counters (listing_id, day, shares_telegram, shares_whatsapp, shares_facebook, shares_copy, shares_qr)
  VALUES (v_id, current_date,
          (p_channel = 'telegram')::integer, (p_channel = 'whatsapp')::integer, (p_channel = 'facebook')::integer,
          (p_channel = 'copy')::integer, (p_channel = 'qr')::integer)
  ON CONFLICT (listing_id, day) DO UPDATE SET
    shares_telegram = public.listing_counters.shares_telegram + EXCLUDED.shares_telegram,
    shares_whatsapp = public.listing_counters.shares_whatsapp + EXCLUDED.shares_whatsapp,
    shares_facebook = public.listing_counters.shares_facebook + EXCLUDED.shares_facebook,
    shares_copy     = public.listing_counters.shares_copy     + EXCLUDED.shares_copy,
    shares_qr       = public.listing_counters.shares_qr       + EXCLUDED.shares_qr;
  RETURN true;
END $$;
REVOKE ALL ON FUNCTION public.count_listing_share(text, text, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.count_listing_share(text, text, text, uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.save_listing(p_public_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_id    uuid;
  v_rate  jsonb;
  v_count bigint;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days. Anything else is not there.
  SELECT l.id INTO v_id FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  -- The owner does not save his own ad (D201 §5: no Save for the owner), so "Saved by N" counts buyers only.
  IF EXISTS (SELECT 1 FROM public.listings l WHERE l.id = v_id AND l.seller_id = v_uid) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'ownListing');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.saved_listings s WHERE s.user_id = v_uid AND s.listing_id = v_id) THEN
    v_rate := public.rate_gate('save');
    IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
    END IF;
    -- INC-694 — personal data carries the saver's home country (Knowledge E3), from user_directory.
    INSERT INTO public.saved_listings (user_id, listing_id, home_country_code)
    VALUES (v_uid, v_id, (SELECT d.home_country_code FROM public.user_directory d WHERE d.user_id = v_uid))
    ON CONFLICT DO NOTHING;
  END IF;
  SELECT count(*) INTO v_count FROM public.saved_listings s WHERE s.listing_id = v_id;
  RETURN jsonb_build_object('ok', true, 'saved', true, 'count', v_count);
END $function$;
REVOKE ALL ON FUNCTION public.save_listing(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_listing(text) TO authenticated;
GRANT ALL ON FUNCTION public.save_listing(text) TO service_role;

CREATE OR REPLACE FUNCTION public.report_listing(p_public_id text, p_reason text, p_note text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_id     uuid;
  v_seller uuid;
  v_note   text;
  v_rate   jsonb;
  v_home   character(2);
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_public_id IS NULL OR p_public_id !~ '^[23456789abcdefghjkmnpqrstuvwxyz]{10}$' THEN
    RAISE EXCEPTION 'listingNotAvailable';
  END IF;
  IF p_reason IS NULL OR p_reason NOT IN ('spam', 'scam', 'prohibited', 'wrongCategory', 'duplicate', 'alreadySold', 'under18', 'copyright', 'other') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'badReason');
  END IF;
  v_note := nullif(btrim(coalesce(p_note, '')), '');
  IF v_note IS NOT NULL AND char_length(v_note) > 500 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'noteTooLong');
  END IF;
  -- The public predicate (listings_public_read): a live ad, or a sold one within its 30 days.
  SELECT l.id, l.seller_id INTO v_id, v_seller FROM public.listings l
   WHERE l.public_id = p_public_id
     AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())));
  IF v_id IS NULL THEN RAISE EXCEPTION 'listingNotAvailable'; END IF;
  IF v_seller = v_uid THEN RETURN jsonb_build_object('ok', false, 'reason', 'ownListing'); END IF;
  IF EXISTS (SELECT 1 FROM public.listing_reports r
              WHERE r.listing_id = v_id AND r.reporter_id = v_uid AND r.status = 'open') THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'alreadyReported');
  END IF;
  v_rate := public.rate_gate('report');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;
  SELECT d.home_country_code INTO v_home FROM public.user_directory d WHERE d.user_id = v_uid;
  INSERT INTO public.listing_reports (listing_id, reporter_id, home_country_code, reason, note)
  VALUES (v_id, v_uid, v_home, p_reason, v_note);
  RETURN jsonb_build_object('ok', true);
END $$;
REVOKE ALL ON FUNCTION public.report_listing(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.report_listing(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.report_listing(text, text, text) TO service_role;

-- Proofs, with no caller (G39): the policies and the functions read the window from the setting and carry no typed 30
-- days; headers and grants as declared. The answers with a buyer and a seller are proven by the public-read, feed and
-- ad-page tests and LG-22.
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT * FROM (VALUES ('listings', 'listings_public_read'), ('listing_photos', 'listing_photos_public_read'),
                                 ('listing_locations', 'listing_locations_public_read')) AS t(tbl, pol) LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_policies p
                    WHERE p.schemaname = 'public' AND p.tablename = r.tbl AND p.policyname = r.pol
                      AND p.cmd = 'SELECT' AND p.roles @> ARRAY['anon', 'authenticated']::name[]
                      AND position('sold_cutoff()' IN p.qual) > 0 AND position('30 days' IN p.qual) = 0) THEN
      RAISE EXCEPTION 'proof failed: policy % on % does not read the sold window from the setting', r.pol, r.tbl;
    END IF;
  END LOOP;
END $$;
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  FOR r IN SELECT * FROM (VALUES
      ('public.feed_index_refresh(uuid)', 'v'::"char", false, false),
      ('public.feed_index_check(uuid)', 's'::"char", false, false),
      ('public.feed_index_check_sweep()', 'v'::"char", false, false),
      ('public.public_listing(text)', 'v'::"char", true, true),
      ('public.count_listing_view(text, text, uuid)', 'v'::"char", false, false),
      ('public.count_listing_share(text, text, text, uuid)', 'v'::"char", false, false),
      ('public.save_listing(text)', 'v'::"char", false, true),
      ('public.report_listing(text, text, text)', 'v'::"char", false, true)) AS t(sig, vol, anon_ok, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position('(SELECT public.sold_cutoff())' IN v_src) = 0 OR position('interval ''30 days''' IN v_src) > 0 THEN
      RAISE EXCEPTION 'proof failed: % does not read the sold window from the setting', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok
       OR has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok
       OR NOT has_function_privilege('service_role', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020090000') ON CONFLICT (version) DO NOTHING;
=== M8b END ===
=== M8c BEGIN ===
-- e2e-areas: feed, ad-page, account
-- Bundle 22 (Stage 1) turn 8 — M8c (part 3 of 4): the three page reads read the sold window from the setting. Each is
-- re-declared whole from its last declaration in the repository (feed_page: 20261017060602_19df1767; seller_feed_page:
-- 20261017135824_7d6dcee1; my_saved_listings: 20261017132201_423af801), header, body, revoke and grants unchanged
-- apart from one named change in each: now() - interval '30 days' becomes (SELECT public.sold_cutoff()).
-- Gated on M8b's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020090000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8b (mark 20261020090000) must be applied first';
  END IF;
END $$;

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

  -- The widest step read: the first step that holds at least 8 listings, else everywhere. Bundle 16 turn 3c — only live
  -- listings count: a sold ad (rank -1) never stops the widening.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
             AND f.tier_rank >= 0
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
             l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
             l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
             l.photos_soon, l.tier, l.category_id, l.location_id,
             -- Bundle 16 turn 3c (D173, D175 1) — the card's marks: the sold word, Reserved, the old price.
             CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                                 WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                       FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
             l.reserved_at IS NOT NULL AS reserved,
             CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
             loc.name_en AS location_name_en, loc.name_am AS location_name_am,
             -- INC-606 — the card's photo: the listing's first stripped photo (the cover, D154).
             -- D158 (bundle 13 turn 6) — a photo held for staff is never a buyer's cover.
             (SELECT p.id FROM public.listing_photos p
               WHERE p.listing_id = f.listing_id AND p.exif_stripped AND NOT p.unscreened
               ORDER BY p.display_order
               LIMIT 1) AS cover_photo_id
        FROM public.feed_index f
        -- Bundle 16 turn 3c (D175 1) — the live ads and the sold ones for 30 days after they sold.
        JOIN public.listings l ON l.id = f.listing_id
         AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
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
        'publicId', v_rec.public_id,
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
        'soldWord', v_rec.sold_word,
        'reserved', v_rec.reserved,
        'priceWas', v_rec.price_was,
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

CREATE OR REPLACE FUNCTION public.seller_feed_page(p_seller_key text, p_after jsonb DEFAULT NULL, p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil      constant uuid := '00000000-0000-0000-0000-000000000000';
  v_key      text := lower(btrim(coalesce(p_seller_key, '')));
  v_seller   uuid;
  v_alias    text;
  v_business text;
  v_type     text;
  v_since    timestamptz;
  v_has_cur  boolean := false;
  v_c_tier   smallint;
  v_c_pub    timestamptz;
  v_c_id     uuid;
  v_cards    jsonb := '[]'::jsonb;
  v_n        integer := 0;
  v_rec      record;
  v_end_t    smallint;
  v_end_p    timestamptz;
  v_end_i    uuid;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'seller_feed_page: badSize';
  END IF;
  -- D201 §12 — the public seller key is the seller's alias, lower-cased (the alias is unique on lower(); never an id).
  IF v_key !~ '^[a-z0-9_]{1,60}$' THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;
  SELECT p.user_id, p.seller_alias, p.business_name, p.seller_type, p.created_at
    INTO v_seller, v_alias, v_business, v_type, v_since
    FROM public.profiles p
   WHERE lower(p.seller_alias) = v_key
     AND p.account_status = 'active';
  IF v_seller IS NULL THEN
    RAISE EXCEPTION 'seller_feed_page: unknownSeller';
  END IF;

  -- The cursor: the last card's (tier, publish time, id) of the previous page — feed_page's shape, one step.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END;
    IF v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL THEN
      RAISE EXCEPTION 'seller_feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  -- The seller's ads in the feed's own order and public predicate: the feed index's "all categories, everywhere"
  -- row of each listing (one per ad), live or sold within 30 days, by the listings' seller index.
  FOR v_rec IN
    SELECT f.tier_rank, f.published_at, f.listing_id,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.listings l
      JOIN public.feed_index f
        ON f.listing_id = l.id AND f.category_key = c_nil AND f.place_key = c_nil
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE l.seller_id = v_seller
       AND (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff())))
       AND (NOT v_has_cur OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
     ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
     LIMIT p_size
  LOOP
    v_cards := v_cards || jsonb_build_array(jsonb_build_object(
      'id', v_rec.listing_id,
      'publicId', v_rec.public_id,
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
      'soldWord', v_rec.sold_word,
      'reserved', v_rec.reserved,
      'priceWas', v_rec.price_was,
      'tier', v_rec.tier,
      'publishedAt', v_rec.published_at,
      'categoryId', v_rec.category_id,
      'locationId', v_rec.location_id,
      'locationNameEn', v_rec.location_name_en,
      'locationNameAm', v_rec.location_name_am,
      'step', 1));
    v_n := v_n + 1;
    v_end_t := v_rec.tier_rank;
    v_end_p := v_rec.published_at;
    v_end_i := v_rec.listing_id;
  END LOOP;

  RETURN jsonb_build_object(
    'seller', jsonb_build_object(
      'alias', v_alias,
      'businessName', CASE WHEN v_type = 'business' THEN v_business END,
      'memberSince', v_since),
    'cards', v_cards,
    'ladder', '[]'::jsonb,
    'steps', '[]'::jsonb,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', 1, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;
REVOKE ALL ON FUNCTION public.seller_feed_page(text, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.seller_feed_page(text, jsonb, integer) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.my_saved_listings(p_after jsonb DEFAULT NULL::jsonb, p_size integer DEFAULT 20)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid   uuid := auth.uid();
  v_c_at  timestamptz;
  v_c_id  uuid;
  v_cards jsonb := '[]'::jsonb;
  v_rec   record;
  v_n     integer := 0;
  v_next  jsonb := NULL;
  v_last_at timestamptz;
  v_last_id uuid;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN RAISE EXCEPTION 'my_saved_listings: badSize'; END IF;
  IF p_after IS NOT NULL THEN
    BEGIN
      v_c_at := (p_after->>'a')::timestamptz;
      v_c_id := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'my_saved_listings: badCursor';
    END;
    IF v_c_at IS NULL OR v_c_id IS NULL THEN RAISE EXCEPTION 'my_saved_listings: badCursor'; END IF;
  END IF;
  FOR v_rec IN
    SELECT s.created_at AS saved_at, s.listing_id,
           l.public_id, l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
           l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
           l.photos_soon, l.tier, l.category_id, l.location_id, l.published_at,
           (l.status = 'active' OR (l.status = 'sold' AND l.sold_at > (SELECT public.sold_cutoff()))) AS available,
           CASE WHEN l.status = 'sold' THEN coalesce((SELECT CASE WHEN 'rented' = ANY (c.capabilities) THEN 'rented'
                                               WHEN 'filled' = ANY (c.capabilities) THEN 'filled' END
                                     FROM public.categories c WHERE c.id = l.category_id), 'sold') END AS sold_word,
           l.reserved_at IS NOT NULL AS reserved,
           CASE WHEN l.price_drop_at > now() - interval '14 days' THEN l.price_was END AS price_was,
           loc.name_en AS location_name_en, loc.name_am AS location_name_am,
           (SELECT p.id FROM public.listing_photos p
             WHERE p.listing_id = l.id AND p.exif_stripped AND NOT p.unscreened
             ORDER BY p.display_order
             LIMIT 1) AS cover_photo_id
      FROM public.saved_listings s
      JOIN public.listings l ON l.id = s.listing_id
      LEFT JOIN public.locations loc ON loc.id = l.location_id
     WHERE s.user_id = v_uid
       AND (v_c_at IS NULL OR (s.created_at, s.listing_id) < (v_c_at, v_c_id))
     ORDER BY s.created_at DESC, s.listing_id DESC
     LIMIT p_size + 1
  LOOP
    -- INC-701 — the cursor names the LAST card of this page (the next page reads the rows below it); the extra row
    -- fetched only says that a next page exists.
    IF v_n = p_size THEN
      v_next := jsonb_build_object('a', v_last_at, 'i', v_last_id);
      EXIT;
    END IF;
    v_last_at := v_rec.saved_at;
    v_last_id := v_rec.listing_id;
    -- An ad no longer public travels as a grey card only: its ids (for Remove), when it was saved, and available false —
    -- no title, price, place, mark or photo, so nothing written after it left the public (an edit under review, an ad
    -- removed by staff) reaches a buyer through his list.
    IF NOT v_rec.available THEN
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'publicId', v_rec.public_id,
        'savedAt', v_rec.saved_at,
        'available', false));
      v_n := v_n + 1;
      CONTINUE;
    END IF;
    v_cards := v_cards || jsonb_build_array(jsonb_build_object(
      'id', v_rec.listing_id,
      'publicId', v_rec.public_id,
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
      'soldWord', v_rec.sold_word,
      'reserved', v_rec.reserved,
      'priceWas', v_rec.price_was,
      'tier', v_rec.tier,
      'publishedAt', v_rec.published_at,
      'categoryId', v_rec.category_id,
      'locationId', v_rec.location_id,
      'locationNameEn', v_rec.location_name_en,
      'locationNameAm', v_rec.location_name_am,
      'step', 1,
      'savedAt', v_rec.saved_at,
      'available', v_rec.available));
    v_n := v_n + 1;
  END LOOP;
  RETURN jsonb_build_object('cards', v_cards, 'next', v_next);
END $function$;
REVOKE ALL ON FUNCTION public.my_saved_listings(jsonb, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_saved_listings(jsonb, integer) TO authenticated;
GRANT ALL ON FUNCTION public.my_saved_listings(jsonb, integer) TO service_role;

-- Proofs, with no caller (G39): each reads the window from the setting and carries no typed 30 days; headers and
-- grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
  r      record;
BEGIN
  FOR r IN SELECT * FROM (VALUES
      ('public.feed_page(uuid, uuid, jsonb, integer)', 's'::"char", true, true),
      ('public.seller_feed_page(text, jsonb, integer)', 's'::"char", true, true),
      ('public.my_saved_listings(jsonb, integer)', 's'::"char", false, true)) AS t(sig, vol, anon_ok, auth_ok) LOOP
    SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
      FROM pg_proc p WHERE p.oid = r.sig::regprocedure;
    IF v_vol IS DISTINCT FROM r.vol OR v_def IS DISTINCT FROM true
       OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
      RAISE EXCEPTION 'proof failed: % header (%, %, %)', r.sig, v_vol, v_def, v_conf;
    END IF;
    IF position('(SELECT public.sold_cutoff())' IN v_src) = 0 OR position('interval ''30 days''' IN v_src) > 0 THEN
      RAISE EXCEPTION 'proof failed: % does not read the sold window from the setting', r.sig;
    END IF;
    IF has_function_privilege('anon', r.sig, 'EXECUTE') IS DISTINCT FROM r.anon_ok
       OR has_function_privilege('authenticated', r.sig, 'EXECUTE') IS DISTINCT FROM r.auth_ok
       OR NOT has_function_privilege('service_role', r.sig, 'EXECUTE') THEN
      RAISE EXCEPTION 'proof failed: % grants', r.sig;
    END IF;
  END LOOP;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020100000') ON CONFLICT (version) DO NOTHING;
=== M8c END ===
=== M8d BEGIN ===
-- e2e-areas: ad-page, legal
-- Bundle 22 (Stage 1) turn 8 — M8d (part 4 of 4): INC-777's correction. M6 landed reveal_listing_contact with one expression its
-- brief did not carry (the 30-a-day gate's refusal answered resets_at as the next UTC midnight); this file re-declares
-- the function whole from M6's supplied text (the brief bundle-22-turn-6-v4.md, section 3 of M6): the gate's refusal
-- answers the gate's own reset time, v_rate->>'resets_at'. Arguments, header, revoke and grants unchanged; nothing
-- else in the body differs from the function as it stands after M6 (the acceptance check of turn 6 kept).
-- Gated on M8c's mark; a migration is not DONE until its mark is read back.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261020100000') THEN
    RAISE EXCEPTION 'bundle 22 turn 8 M8c (mark 20261020100000) must be applied first';
  END IF;
END $$;

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


-- Proofs, with no caller (G39): a missing caller is refused as before; the body answers the gate's own reset time and
-- keeps exactly the two next-midnight answers of the sellers cap and the new-account five, and turn 6's acceptance
-- check; header and grants as declared.
DO $$
DECLARE
  v_vol  "char";
  v_def  boolean;
  v_conf text[];
  v_src  text;
BEGIN
  BEGIN
    PERFORM public.reveal_listing_contact('abcdefghjk');
    RAISE EXCEPTION 'proof failed: reveal_listing_contact answered a missing caller';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'not authenticated' THEN RAISE; END IF;
  END;
  SELECT p.provolatile, p.prosecdef, p.proconfig, p.prosrc INTO v_vol, v_def, v_conf, v_src
    FROM pg_proc p WHERE p.oid = 'public.reveal_listing_contact(text)'::regprocedure;
  IF v_vol IS DISTINCT FROM 'v' OR v_def IS DISTINCT FROM true OR v_conf IS DISTINCT FROM ARRAY['search_path=public'] THEN
    RAISE EXCEPTION 'proof failed: reveal_listing_contact header (%, %, %)', v_vol, v_def, v_conf;
  END IF;
  IF position('''resets_at'', v_rate->>''resets_at'')' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: the gate''s refusal does not answer the gate''s own reset time';
  END IF;
  IF (length(v_src) - length(replace(v_src, 'date_trunc(', ''))) / length('date_trunc(') <> 2 THEN
    RAISE EXCEPTION 'proof failed: the body does not carry exactly two next-midnight answers';
  END IF;
  IF position('public.legal_acceptance_pending(v_uid, v_row.id)' IN v_src) = 0 THEN
    RAISE EXCEPTION 'proof failed: turn 6''s acceptance check is missing';
  END IF;
  IF has_function_privilege('anon', 'public.reveal_listing_contact(text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.reveal_listing_contact(text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof failed: reveal_listing_contact grants';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261020110000') ON CONFLICT (version) DO NOTHING;
=== M8d END ===
G3. Read back on ethio-prod after the four: the four marks (one row each); legal_settings.sold_visible_days = 30; `select public.sold_visible_days()` = 30; the three policies' qual each contains sold_cutoff() and no "30 days"; every re-declared function's header and grants as in G0, with no "interval '30 days'" in its prosrc; reveal_listing_contact's prosrc contains `'resets_at', v_rate->>'resets_at')`.

PART H — THE LOCAL END-TO-END TRY (after the operator's "continue": M8a to M8d must be on ethio-staging first).
H1. Run one file at a time, each whole, both projects, 0 retries: `bun run e2e:local -- e2e/legal-certify.spec.ts --retries=0`, then e2e/ad-page-doors.spec.ts, e2e/legal-admin.spec.ts and e2e/feed-route.spec.ts. Paste each run's summary lines.
H2. A failure: read its error and its context, fix it at its root cause (G38), and run that file again whole.
H3. If the browser guard stops the run (INC-506), paste its message once and go on to THE CI WAIT REPORT.

SCOPE — these files only: the brief; roadmap.md; src/features/admin/legal/legal-service.ts and facts-validation.ts (B1, B2 only); src/features/my-listings/my-listing.ts, state-line.ts and my-listing-page.tsx (C1–C3 only); the unit tests of those files (E1); src/i18n/locales/en.ts and am.ts (and the usage maps); e2e/legal-certify.spec.ts (LG-22, and A2's LG-21 fix if turn 7 left it); docs/features/legal.md; scripts/public-surface-allowlist.txt (F2 only); docs/_changelog.md; the four migration files the tool writes; src/integrations/supabase/types.ts if the tool regenerates it; the files of an A2 or A3 fix and of a Part H fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No package change.
THE STOP REPORT (after Part G; then STOP): "TURNS 6 AND 7 — FINAL REPORT" first, when A3 could write it; done or not done by part; A1's six lines with the run's number and commit (and A2's or A3's fix, if any); <START>; B3's, C4's and E3's censuses; the strings — `git diff <START> -- src/i18n/locales/en.ts src/i18n/locales/am.ts` whole (G43); `grep -n 'test("LG-22' e2e/legal-certify.spec.ts`; the checks; G0's table; each G1 diff; each "Migration guard OK." line; each migration's file name and size in bytes; G3's read-backs; `git diff --name-only <START>`; anything not foreseen; and, last, the operator's staging lines, in this order: "apply <the uuid fragment of M8a's file name> → expect mark 20261020080000", "apply <M8b's> → expect mark 20261020090000", "apply <M8c's> → expect mark 20261020100000", "apply <M8d's> → expect mark 20261020110000". Then STOP: the operator applies the four on ethio-staging in that order, reads each mark back and sends "continue".
THE CI WAIT REPORT (after Part H; not a conclusion): H3's message, or H1's summary lines and H2's fixes; the checks again if Part H changed a file; `git diff --stat <START>`; `git diff --name-only <START>`; the line "Waiting for CI on <the commit this turn leaves> — the next brief's Part A concludes this turn." Then END THE TURN (the platform commits and syncs); send nothing after the report.
REVERT: a later migration that restores the policies and functions from the files named in G0 (dropping sold_visible_days(), sold_cutoff() and the column; forward only); git revert of this turn's commits.
```
