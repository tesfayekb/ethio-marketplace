# Bundle 11 — turn A3: Admin › Screening's walk fixes — the market filter, every Reject red, "Show number" with no second factor, the seller box in rows: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN A3 (2026-10-10). ONE TURN, ONE MIGRATION. Tier A (an admin door's second-factor gate, the audit log, an admin screen).
Base: dev 6f3d3bfe. This file is public: it is written as build instructions.
Strings: three new keys in English and Amharic (listed below). The supervisor drafted the Amharic and sent it to the operator to check before he Publishes.
No package change.

ANSWERS TO TURN A2
- Verified by diff of f194d5cd..6f3d3bfe: the 18 carrier paths and the brief, each byte-identical to the supervisor's copy.
- CI on 6f3d3bfe (run 38048479148) is GREEN and promoted: main = dev. Turn A2 is CLEAN.
- The operator walked Admin › Screening on the published site (2026-10-10). Three findings:
  - Filters → Country showed "Something went wrong";
  - Reject was red only in the three-dots menu;
  - "Show number" asked for the authenticator code.
  He also asked that the seller box be organised now. The detail and list pages, and with them their previews, are redesigned later.

WHAT THIS TURN BUILDS (INC-537, INC-538, D129, D130 — the operator's rulings of 2026-10-10)
- INC-537 — the market filter reads the ad's place (src/features/admin-screening/use-screening.ts).
  - Today the read adds `.eq("home_country_code", …)`. That column is outside the signed-in role's column grant on listings (migration 20261003215007, lines 187–193), so every filtered read is refused.
  - The filter now goes through the embedded place: `.eq("place.country_code", code).not("place", "is", null)`. It keeps the ads whose place is in that market — the market admin_screening_facts reports. The select is unchanged.
  - Unit test SF-2: the read never names home_country_code, and "All" sends no place filter.
- INC-538 — SC-11 proves a settled result.
  - The page keeps the previous rows on screen while a failed read is retried, so SC-11 passed on the old rows.
  - SC-11 now filters to US (an open market, as LS-5 proves) and expects the empty message with no error state, then filters to ET and expects the row with no error state.
- Every Reject is red (G29 — the class, not the instance):
  - the selection bar's Reject and the preview's Reject: variant destructive;
  - the confirmation's button: destructive when it rejects, default when it approves;
  - Translations › Languages' "Delete language" confirmation: destructive (src/features/admin/translations/delete-language-dialog.tsx).
  The tests read the colour as a person sees it, through a new helper e2e/helpers/colors.ts (fillOf, isRedFill): SC-12 (the bar), SC-14 (the preview and the confirmation), TR-31 (Delete language). The other inline removes are judged in Part B.
- D129 — "Show number" asks for no second factor.
  - The migration (appendix) redeclares admin_reveal_listing_contact whole from turn A1's text, with one line removed: PERFORM public.require_step_up_if_needed('listings', 'review').
  - Everything else stands byte for byte: listings:review, the review_reveal dial (60 an hour), ads in 'screening' only, the channel list, notShown, and one audit_log row per reveal.
  - Approve and Reject keep their second factor: transition_listing is not touched, and proof P4 checks it.
  - The page calls the door directly, with no step-up gate. An answer that arrives after the preview has closed, or has moved to another ad, is dropped.
  - A refusal is said under that method's own row: the hour's limit, a method the seller does not show (without the button), or a failed call (common.error). Unit test SF-3.
- D130 — the seller box in rows (src/features/posting/preview/listing-detail.tsx; seller-line.tsx).
  - "Seller" and the seller line come first (the name in medium weight). Then a rule, then "Contact the seller", with one method per row.
  - Each row starts with the method's name. Any control ends the row, and a refusal sits on its own line under it.
  - The seller's own preview gets the same box, with no controls.
- Strings (G43 — the Amharic below is what ships):
  - admin.screening.revealLimited — en "You have shown many numbers in the last hour. Try again later." · am "ባለፈው አንድ ሰዓት ውስጥ ብዙ ቁጥሮችን አሳይተዋል። ቆይተው እንደገና ይሞክሩ።"
  - admin.screening.revealNotShown — en "The seller does not show this number." · am "ሻጩ ይህን ቁጥር አያሳይም።"
  - post.preview.contactLabel — en "Contact the seller" · am "ሻጩን ያግኙ"
- Tests (e2e/admin-screening.spec.ts):
  - a local helper scratchHolder — a pool user holding exactly the named permissions through a scratch role, reaped in afterEach;
  - SC-8 — a reviewer with no second factor reads the facts and reveals a shown number; exactly one audit row, with that reviewer as actor;
  - SC-11 — as above;
  - SC-12 — the bar's Reject is red and Approve is not;
  - SC-13 — the box's heading. The rows run messages, phone, telegram, whatsapp from top to bottom, measured in one frame, and each Show number sits inside its own row after the name. The number appears in the phone row with no code asked, and exactly one audit row is written;
  - SC-14 — the preview's Reject and the confirmation's Reject are red;
  - SC-15 (new) — a reviewer with no second factor (admin_panel:access, listings:view, listings:review) opens the preview in the page and reveals WhatsApp; the number appears in its row, no code is asked, and exactly one audit row is written.
  Also:
  - TR-31 (e2e/admin-translations-governance.spec.ts) reads the confirmation's colour;
  - SF-2 and SF-3 (src/features/admin-screening/use-screening.test.ts).
- Docs: admin-screening.md (a turn A3 section), posting.md (the seller box), translations.md (the red confirmation), the changelog, the roadmap (line 3; a turn A3 line ticked; an open line for Part B and Part C on the red class; stage 3 names the detail and list pages' redesign, D130).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (local copies only — never production, never staging)
- PostgREST 12.2.3 over Postgres 16, with listings column-granted as in the repository:
  - turn A2's filtered read → 403, code 42501 ("permission denied for table listings");
  - the new read → ET only for ET, KE only for KE, and [] with total 0 for a market with no ads.
- The migration text on the local Postgres mirror of turn A1, with mark 20261011030000. Every proof passes, and the trials match SC-8/SC-9:
  - a reviewer with no second factor gets the phone number and one row {channel: phone} naming the reviewer;
  - a hidden phone → notShown; Telegram → unknown channel; an active ad → listing not found; a non-reviewer → permission denied;
  - the dial refuses the 61st reveal in its hour;
  - the Approve door still asks for the second factor.
- Eight variants each fail their proof:
  - the step-up line kept (P2);
  - the dial removed (P2);
  - the number written into the audit row (P2);
  - STABLE (P1);
  - anon allowed (P1);
  - transition_listing without its step-up (P4);
  - the permission check removed (P2);
  - the status check removed (P2).
- scripts/check-migrations.sh on the repository's migrations plus this text (with a mark): every guard OK.
- In Chromium on a local build:
  - isRedFill → true for the destructive fill in light and dark, and false for the default, outline and secondary fills;
  - SC-13's one-frame measurement passes on the new box at 360, 393 and 1280 px.
- SF-2 fails against turn A2's filter and passes on the fix.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-4.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 6f3d3bf SUCCESS). If it shows FAILURE, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the usage maps;
  6. the hashes;
  7. the checks;
  8. the migration LAST, then its read-back;
  9. the report;
  10. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The expected red window (G35):
  - CI on any commit the platform pushes during this turn runs SC-8, SC-13 and SC-15 against an ethio-staging whose reveal door still asks for a second factor, so they fail there. That is expected, and is not fixed.
  - CI on the final commit stops at its preflight until the operator applies the migration on ethio-staging. Then "Re-run failed jobs" judges the turn.
  - Until the operator Publishes, the published screen keeps turn A2's behaviour.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans, checksums and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps, the brief and the one new migration file (the database tool names it). The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-4.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 15 files → each equal to:
  506ba67ea2611062a67eaab01133c7320b256236c66216848b192487579832d9  docs/_changelog.md
  bbd54388a3efbc5c87b25625213f244c6f878f5ad4f080375175a175662b3011  docs/features/admin-screening.md
  46a1e0d12c7abb1e5be3b611f6ff6c850b8c83198ad1a57f6126bd6716bc19ed  docs/features/posting.md
  3ab6cb84c36cbe8ca2bde85ec56cadb4e09c72357db506005bfac1f9323ce1cd  docs/features/translations.md
  91a183a2349f1cf565ddf477e11cc482563a4a74acbaeec8e2dd96dd04efc0be  e2e/admin-screening.spec.ts
  07e27c4fea3f02d2985d34fa269d2eb1456e2b3028e976885427454c1213e843  e2e/admin-translations-governance.spec.ts
  807a9f69e0d8ae80dc26c90490ce4da636e2297ee677f97d33af0f849920d36d  roadmap.md
  cec2c7521c5922a5c31fcde681fe7d2ae606cae4fe15f30d20c43440573f2069  src/features/admin-screening/screening-page.tsx
  ec2cbae6c7791d41e731297e4dd7364a13cf0b3dc7d9ec099b26c87e3840fe2e  src/features/admin-screening/use-screening.test.ts
  c9598038130e389677ef1be8c09e7e261f98adb5ab713f7d384a9571081d58bc  src/features/admin-screening/use-screening.ts
  37ea931a2fbd31a2d12d074982e25b0124f39c15e8865706dc0519e6427532e6  src/features/admin/translations/delete-language-dialog.tsx
  4c1cae5c7c95f17dad1a1f1faf5ca18e09da283fc36dfeac2e4d25d86842e17b  src/features/posting/preview/listing-detail.tsx
  3e7685381af30d4ffbaef588d2f4a407fae9ac4a887bb2256e0ac3a9ed559b46  src/features/posting/seller-line.tsx
  af80f0a7aecf3a5d2a6ae4ec6cfd1dca6649d6a461e069563d12d964b04310dc  src/i18n/locales/am.ts
  ae9d8a60b8cf7e09665c38c577329cb27e6952eda2dec939148424a1a20b59e0  src/i18n/locales/en.ts
- (c) `ls e2e/helpers/colors.ts` → "No such file or directory".
- On ethio-prod with your query tool (SELECT only):
- (d) `select prosecdef, provolatile, proconfig, pg_get_function_identity_arguments(oid), md5(prosrc), length(prosrc) from pg_proc where oid = 'public.admin_reveal_listing_contact(uuid,text)'::regprocedure;` → t | v | {search_path=public} | p_listing_id uuid, p_channel text | cf7ab2046e1fae028eb1b6f278cb123d | 1492 (the live body equals turn A1's text: the redeclaration is made from it, G39);
- (e) `select has_function_privilege('anon', 'public.admin_reveal_listing_contact(uuid,text)', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_reveal_listing_contact(uuid,text)', 'EXECUTE');` → f | t
- (f) `select max_count, window_seconds from public.rate_dials where action = 'review_reveal';` → 60 | 3600
- (g) `select position('require_step_up_if_needed' in pg_get_functiondef('public.transition_listing(uuid,text)'::regprocedure)) > 0;` → t
- (h) `select max(version) from public.migration_marks;` → 20261010230000

THE CARRIER — A3-TURN-CARRIER-2026-10-10.md (130,813 bytes; sha256 d89357f52bd030e41c4a49474c953f7c454fe21261fa868fd5250ea80c5c2638; 19 sections)
- Its first line starts "A3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE (the whole file);
  - NEW (a file that must not exist yet);
  - APPEND (added at the end of the file);
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (counted from 1). The section ends with a newline; that newline ends its last line and adds no empty line. A file with several INSERT-AFTER sections lists them from the bottom of the file up, so every n is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (new keys), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 18 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  539852cace530365c8567b4f42a5a93ed1fa360a8b05b11d62c127bc071b9d54  docs/_changelog.md
  651f9bc92d3d0741e49e77fe3998ebc3b018f4c9115f239fe67d0e953de6f850  docs/features/admin-screening.md
  28b7aa7d44f3c2a8ccea582edc7b97a02a0d07896506139cda9c6cebf1a8d4b9  docs/features/posting.md
  fa5ffc52daa7b0348df87d892081c8c6a34e9a374f9347b1b9358ec18945d8c4  docs/features/translations.md
  81fc2687cadded5ffc98fee24b54db70be69d719d99dda9062d9681b11de9e0a  docs/generated/i18n-usage.json
  7fc11a19637001a72d0e6b20287dfd3ff19e0420aee80a4cfd7357f3eb09a46a  e2e/admin-screening.spec.ts
  e90acc2648e2011de48bed645140c999006852e80165657d51c7fba8c6f37efa  e2e/admin-translations-governance.spec.ts
  15ba3a27206b67ea7d3336f5e4e360f3f716499ca6a37bddc75eb99a72a07899  e2e/helpers/colors.ts
  81fc2687cadded5ffc98fee24b54db70be69d719d99dda9062d9681b11de9e0a  public/i18n-usage.json
  a2178f808f7acecc5f77567877849b12cd3786cf4bf01bb0a0e752d8374ca7b0  roadmap.md
  8f9114bb735d18ff80e89655f14bfba86e5514e55dd48a6b976bb3995b41746c  src/features/admin-screening/screening-page.tsx
  fd6e1a3bb359c113f4099989580b46123154b7fe7d82625dc34e4282e8e4ae32  src/features/admin-screening/use-screening.test.ts
  148de9cd4f4f7c8edfd590a1876a6471dd1c57473b4f147f6969ebce7c8e0d1c  src/features/admin-screening/use-screening.ts
  ac45e5841a75d2b497426ed5f47b4295b7b038523a3cc430ac6404eaa4c4ecf5  src/features/admin/translations/delete-language-dialog.tsx
  42331feb1ec2aa0c6d57e4957e47e499d16395a839d8ff45a8532b87953841d8  src/features/posting/preview/listing-detail.tsx
  e9110e296718dd03120dda959faef6e62a937f678892e7c94a82fe84d8549438  src/features/posting/seller-line.tsx
  df0ff40c721f5aa3f623720a5f89a9068454be0c18248f10b4ca590e7bdf78e5  src/i18n/locales/am.ts
  bc3fbb5c25c6e2eea5d331bf1878b5985af24a6142345d4aa46e77527999f6f0  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 611 passed (94 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.
In the report, list the three Amharic values key by key with their English (G43).

THE BROWSER RUN — not this turn. SC-8, SC-13 and SC-15 need the redeclared door on ethio-staging, which the operator applies after the turn. CI on the final commit is the proof (the local browser does not start either, INC-506).

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is b6d09f3e94b11acb40c55cb01b0e81a32b81a8c829c866c3a85734100827453d (5,814 bytes, 122 lines, ending with a newline).
- `<MARK>` is chosen first:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add twelve hours (the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261010230000 (the newest mark). If the time rule gives a mark at or below 20261010230000, use 20261011000000.
- Then check the text, with the mark written in, in a scratch folder:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text under a name of the form 20261010150000_a3-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- census (d) again → t | v | {search_path=public} | p_listing_id uuid, p_channel text | 5b65091cbf005c3e825f233d10bcf983 | 1426;
- census (e), (f) and (g) again → unchanged: f | t; 60 | 3600; t;
- `select position('require_step_up_if_needed' in pg_get_functiondef('public.admin_reveal_listing_contact(uuid,text)'::regprocedure)) > 0;` → f.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(h).
- The 18 sha256sum lines and the brief's.
- `git diff --name-only 6f3d3bfe` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 6f3d3bfe HEAD` too. Expect 20 paths: the hashed paths, the brief and the one migration file (and types.ts if regenerated).
- The checks, and the three Amharic values with their English.
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor), read back its mark, then "Re-run failed jobs" on the CI run (its E2E preflight waits for staging); send the executor nothing until CI on the final commit is read; then Publish; then the supervisor's walk lines.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 11 Part A, turn A3 (2026-10-10). Tier A. "Show number" in Admin › Screening asks for no second factor (D129).
-- e2e-areas: admin-screening
-- A. admin_reveal_listing_contact(p_listing_id uuid, p_channel text) is redeclared whole from turn A1's definition
--    (20261010103356) with one change: the line PERFORM public.require_step_up_if_needed('listings', 'review') is
--    removed (D129, the operator, 2026-10-10). Everything else stands, byte for byte: VOLATILE, SECURITY DEFINER,
--    search_path public; listings:review; the channel is phone, phone2 or whatsapp; the dial review_reveal (60 an
--    hour per reviewer); ads in 'screening' only; a channel the seller does not show answers notShown; each reveal
--    writes one audit_log row (action listing.contact_revealed, the listing, the channel — never the number), read
--    in Admin › Audit and never shown to the seller (D128). Approve and Reject keep their second factor
--    (transition_listing is not touched). admin_screening_facts is not touched.
-- B. Proofs: catalogue reads and a call with no session only; the behaviour is proven by SC-8, SC-9, SC-13, SC-15.

-- ===== A — "Show number", logged, no second factor =====
CREATE OR REPLACE FUNCTION public.admin_reveal_listing_contact(p_listing_id uuid, p_channel text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_rate  jsonb;
  v_row   public.listings%ROWTYPE;
  v_entry jsonb;
  v_value text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not signed in';
  END IF;
  IF NOT public.has_permission(v_uid, 'listings', 'review') THEN
    RAISE EXCEPTION 'permission denied';
  END IF;
  IF p_channel IS NULL OR p_channel NOT IN ('phone', 'phone2', 'whatsapp') THEN
    RAISE EXCEPTION 'unknown channel';
  END IF;

  v_rate := public.rate_gate('review_reveal');
  IF NOT coalesce((v_rate->>'allowed')::boolean, false) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'rateLimited', 'resets_at', v_rate->>'resets_at');
  END IF;

  SELECT * INTO v_row FROM public.listings l WHERE l.id = p_listing_id;
  IF NOT FOUND OR v_row.status <> 'screening' THEN
    RAISE EXCEPTION 'listing not found';
  END IF;

  v_entry := coalesce(v_row.contact_pref, '{}'::jsonb) -> p_channel;
  v_value := btrim(coalesce(v_entry->>'value', ''));
  IF coalesce((v_entry->>'show')::boolean, false) IS NOT TRUE OR v_value = '' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'notShown');
  END IF;

  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (v_uid, 'listing.contact_revealed', 'listing', p_listing_id::text,
            jsonb_build_object('channel', p_channel));

  RETURN jsonb_build_object('ok', true, 'channel', p_channel, 'value', v_value);
END $$;

REVOKE ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.admin_reveal_listing_contact(uuid, text) TO service_role;

-- ===== B — proofs =====
DO $proof$
DECLARE
  v_fn  text := 'public.admin_reveal_listing_contact(uuid,text)';
  v_def text;
  v_ok  boolean;
BEGIN
  v_def := pg_get_functiondef(v_fn::regprocedure);

  -- P1: a definer with a fixed search path, VOLATILE; the signed-in role runs it, anon and PUBLIC do not.
  IF NOT (SELECT p.prosecdef FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure)
     OR (SELECT p.provolatile FROM pg_catalog.pg_proc p WHERE p.oid = v_fn::regprocedure) <> 'v'
     OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, unnest(p.proconfig) cfg
                     WHERE p.oid = v_fn::regprocedure AND cfg = 'search_path=public') THEN
    RAISE EXCEPTION 'A3 P1: the reveal door is not a VOLATILE definer with a search path';
  END IF;
  IF pg_catalog.has_function_privilege('anon', v_fn, 'EXECUTE')
     OR NOT pg_catalog.has_function_privilege('authenticated', v_fn, 'EXECUTE')
     OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p, aclexplode(p.proacl) x
                 WHERE p.oid = v_fn::regprocedure AND x.grantee = 0) THEN
    RAISE EXCEPTION 'A3 P1: the reveal door privileges';
  END IF;

  -- P2: no second-factor gate; the remaining gates in order; the log row carries the channel alone.
  IF v_def LIKE '%require_step_up_if_needed%' THEN
    RAISE EXCEPTION 'A3 P2: the reveal door still asks for a second factor';
  END IF;
  IF v_def NOT LIKE '%has_permission(v_uid, ''listings'', ''review'')%rate_gate(''review_reveal'')%v_row.status <> ''screening''%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'A3 P2: a gate is missing or out of order';
  END IF;
  IF v_def NOT LIKE '%jsonb_build_object(''channel'', p_channel));%' THEN
    RAISE EXCEPTION 'A3 P2: the audit row must carry the channel alone';
  END IF;

  -- P3: the dial is unchanged.
  IF NOT EXISTS (SELECT 1 FROM public.rate_dials
                  WHERE action = 'review_reveal' AND max_count = 60 AND window_seconds = 3600) THEN
    RAISE EXCEPTION 'A3 P3: the dial';
  END IF;

  -- P4: Approve and Reject keep their second factor.
  IF pg_get_functiondef('public.transition_listing(uuid,text)'::regprocedure) NOT LIKE '%require_step_up_if_needed%' THEN
    RAISE EXCEPTION 'A3 P4: transition_listing lost its second factor';
  END IF;

  -- P5: with no session, the door refuses before reading anything.
  v_ok := false;
  BEGIN
    PERFORM public.admin_reveal_listing_contact(NULL, 'phone');
  EXCEPTION WHEN OTHERS THEN
    v_ok := (SQLERRM = 'not signed in');
  END;
  IF NOT v_ok THEN
    RAISE EXCEPTION 'A3 P5: the reveal door did not refuse a call with no session';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
