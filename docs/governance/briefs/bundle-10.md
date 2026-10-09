# Bundle 10 — the feed engine: brief, version 6 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 6 (2026-10-09). THIS FILE REPLACES VERSION 5. Turn 5 (Part E2b) landed at d91aac66 and matches version 5. This version specifies TURN 6 = PART E3a — Admin › Screening (D109, the operator, 2026-10-09):
- a reviewer sees the ads waiting in `screening`, opens each as a buyer will see it, and approves or rejects it;
- an approved ad goes live and the feed index takes it at once (the triggers of E2a);
- one correction to /api/feed (E3a.6).
It is ONE migration (transition_listing redeclared with one change), one admin section, its tests and its words. Tier A (an admin decision surface and a door).
The supervisor ran the migration text below on a local Postgres 16 copy of the shapes it touches (with stand-ins for auth.uid, has_permission, rate_gate and the step-up helper):
- a reviewer without a fresh second factor is refused and the ad stays in screening;
- the service's approval makes the ad active and writes its feed rows;
- scripts/check-migrations.sh: every guard OK.
Line numbers are as of commit d91aac66 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 5
- Verified by the diff of 41b46aa6..d91aac66:
  - the saved brief equals version 5;
  - the migration equals the appendix of version 5 with the mark 20261009190000;
  - FR-1 to FR-8, the allowlist line, the selector lines, the docs and the changelog are as written;
  - the two regenerated i18n usage maps are accepted (A6).
- CI green on d91aac66 (promoted). Turn 5 is CLEAN.
- One correction to the route, done in this turn (E3a.6): an answer without data and without an error must be a failure, never an empty page (F4). The slow-call warning you added stays; name it in the docs.

WHAT THE PAGE IS (D109)
- Admin › Screening, path /admin/screening, opened with `listings:view`.
- A table of the ads whose status is `screening`, oldest first (the order they were sent), 25 per page, with a search by title.
- Columns: title, category, place, sent (the listing's updated_at).
- Each row: Open (the ad as a buyer will see it), Approve and Reject.
- Approve moves the ad to `active`; Reject moves it to `rejected`. Each asks for confirmation, then for a fresh second factor through the step-up gate, then calls `transition_listing` as the signed-in reviewer.
- Reasons shown to the seller come with stage 2's exceptions page; not in this turn.

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-10.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E3a.0, the read-only census. If any result differs from what it expects, STOP and report: write nothing else;
  3. E3a.1 to E3a.7: the words, the section, the page, the tests, the route correction, the selector, the docs and changelog;
  4. E3a.8 LAST: the migration;
  5. the unit tests;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- The turn starts by reading CI for the last commit on dev at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. You cannot git-fetch that branch. Paste the first six lines of ci-status.md.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and permissions. Never an e-mail address, a user id, a token or a row of user data.
- Browser tests: try once (`bun run e2e:local e2e/admin-screening.spec.ts`). If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- No package or dependency change. The only new strings are those of E3a.1, exactly as written there.
- Scope:
  - one new migration file under supabase/migrations/ (the database tool names it);
  - src/features/admin/sections.ts (one entry);
  - src/routes/admin.screening.tsx (new);
  - src/features/admin-screening/ (new folder: the page, its data hook);
  - src/i18n/locales/en.ts and src/i18n/locales/am.ts (the keys of E3a.1 only);
  - src/routes/api/feed.ts (E3a.6 only);
  - e2e/admin-screening.spec.ts (new);
  - scripts/e2e-select.ts (one new area);
  - docs/features/admin-screening.md (new), docs/features/feed-engine.md (one line), docs/_changelog.md;
  - the brief.
  The platform may regenerate src/integrations/supabase/types.ts and src/routeTree.gen.ts, and the i18n map guard the two usage maps (A6); that is allowed and named in the report. Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched. Shared UI blocks are used as they are; none changes its default.

THE MIGRATION RULES (G39 — every one applies)
- The migration text is in the appendix at the end of this brief. Its function body is the live transition_listing (supabase/migrations/20261006010039_22ac0b2a-158a-4a38-b651-60a69e259f11.sql :301–395) with exactly two inserted blocks:
  - after the "reviewer only" refusal: when the caller is not the service, `PERFORM public.require_step_up_if_needed('listings', 'review');`
  - after the "enforcement only" refusal: when the caller is not the service, `PERFORM public.require_step_up_if_needed('listings', 'enforce');`
  Every other line, the header attributes, the REVOKE and the two GRANTs are the live function's.
- Write it EXACTLY, changing only `<MARK>`. If E3a.0 (a) shows that the live definition differs from that file, STOP before saving and paste the live definition.
- Write the file in a scratch folder first and run the migration check there:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the new text under a name of the form 20261009000000_screening-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - take now() at time zone 'utc' on ethio-prod, round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - it must be later than the saved file's own stamp and above 20261009190000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- What the text does: transition_listing redeclared whole with the two step-up calls; proofs (the two calls are present; header facts; EXECUTE for authenticated and service_role, not anon); the self-mark.

PART E3a — ADMIN › SCREENING

E3a.0 — CENSUS (read-only, before writing anything). Paste each result:
- (a) on ethio-prod: `select md5(prosrc) from pg_proc where oid = 'public.transition_listing(uuid,text)'::regprocedure;` and the md5 of the body between `AS $function$` and `END $function$;` in the 20261006010039 file (:301–392), computed the same way (`md5` of the text between the two dollar quotes, which is what prosrc holds). They must be equal; the file's value is 49402bc72dbd96c8b139b037bcc755ba. Also paste `select prosecdef, provolatile, proconfig from pg_proc where oid = 'public.transition_listing(uuid,text)'::regprocedure;` (expected true, v, {search_path=public}).
- (b) on ethio-prod: `select r.name, p.action from public.role_permissions rp join public.roles r on r.id = rp.role_id join public.permissions p on p.id = rp.permission_id join public.resources res on res.id = p.resource_id where res.name = 'listings' order by 1, 2;` — the roles that hold listings view, review and enforce (names only).
- (c) on ethio-prod: `select count(*) from public.listings where status = 'screening';`
- (d) in the repository: src/routes/admin.screening.tsx and src/features/admin-screening/ do not exist; no key in en.ts begins with `admin.screening.` or `admin.section.screening.`.
- (e) on ethio-prod: `select version from public.migration_marks where version = '20261009190000';` (one row), `select max(version) from public.migration_marks;`, `select now() at time zone 'utc';`.

E3a.1 — THE WORDS. Add exactly these keys, English to en.ts and Amharic to am.ts, each value copied from the block below (never retyped). The Amharic comes from the operator (2026-10-09, his own words for the six new phrases) or is copied from a key the app already has. The bracket after each Amharic value names its source and is not part of the value:
- admin.section.screening.title
  en: Screening queue
  am: የምርመራ ወረፋ   [copied from nav.screeningQueue]
- admin.section.screening.body
  en: Ads waiting for review. Approve puts an ad on the site; Reject keeps it off.
  am: ግምገማ የሚጠብቁ ማስታወቂያዎች። 'አጽድቅ' ማስታወቂያውን በገጹ ላይ ይጭናል፤ 'ውድቅ አድርግ' ደግሞ ከገጹ ውጪ ያደርገዋል።   [the operator]
- admin.screening.search
  en: Search
  am: ፍለጋ   [copied from admin.users.searchLabel]
- admin.screening.col.title
  en: Title
  am: አርዕስት   [copied from post.details.titleLabel]
- admin.screening.col.category
  en: Category
  am: ምድብ   [copied from post.step.category]
- admin.screening.col.place
  en: Place
  am: ቦታ   [copied from post.step.place]
- admin.screening.col.sent
  en: Sent
  am: ተልኳል   [copied from post.photos.done]
- admin.screening.open
  en: Preview as buyer
  am: ገዢዎች እንደሚያዩት ይመልከቱ   [copied from post.review.previewAsBuyer]
- admin.screening.approve
  en: Approve
  am: አጽድቅ   [copied from admin.translations.editor.approve]
- admin.screening.reject
  en: Reject
  am: ውድቅ አድርግ   [the operator]
- admin.screening.approved
  en: Approved
  am: የጸደቀ   [copied from admin.translations.status.approved]
- admin.screening.rejected
  en: Rejected
  am: ውድቅ ተደርጓል   [the operator]
- admin.screening.empty
  en: Nothing is waiting for review.
  am: ለግምገማ የቀረበ ምንም ነገር የለም።   [the operator]
- admin.screening.confirmApprove
  en: Approve this ad? It goes on the site now.
  am: ይህ ማስታወቂያ ይጽደቅ? አሁን በገጹ ላይ ይጫናል።   [the operator]
- admin.screening.confirmReject
  en: Reject this ad? It stays off the site.
  am: ይህ ማስታወቂያ ውድቅ ይደረግ? ከገጹ ውጪ ሆኖ ይቆያል።   [the operator]
The page also uses, as they are: common.loading, common.error, common.retry, common.cancel. Report every new key with its English and Amharic, as you wrote them.

E3a.2 — THE SECTION. src/features/admin/sections.ts: one entry after "translations":
  { id: "screening", path: "/admin/screening", permission: "listings:view", titleKey: "admin.section.screening.title", bodyKey: "admin.section.screening.body" }
src/routes/admin.screening.tsx: the pattern of src/routes/admin.countries.tsx (createFileRoute("/admin/screening"), the page component, a comment naming the gate).

E3a.3 — THE PAGE: src/features/admin-screening/ (screening-page.tsx and use-screening.ts), built from the shared blocks as src/features/admin-countries/countries-page.tsx builds its table (DataTable, DataTablePagination, the toolbar's search), wrapped in StepUpGate (src/features/auth/mfa/step-up-gate.tsx):
- The root has `data-testid="admin-section-screening"`; an h1 with the section title and the section body as its note.
- The read, with the signed-in session (RLS `listings_admin_read`, `listings:view`):
  - listings where status = 'screening';
  - columns id, title, description, category_id, location_id, price fields, attributes, updated_at;
  - the category's and the place's names embedded (name_en, name_am), shown in the page's language;
  - ordered by updated_at ascending, then id;
  - 25 per page, with the page's own range;
  - the search a case-insensitive match on the title, applied in the query (so a row is found whatever page it would sit on).
  A failed read shows common.error with common.retry (F4), never an empty table.
- Each row (`data-testid="admin-screening-row-<id>"`): title, category, place, sent (a short date and time); then:
  - Preview as buyer (`admin-screening-open-<id>`, admin.screening.open): the ad as a buyer will see it, through the existing PreviewSheet and ListingDetail (src/features/posting/preview/), built from the row and its photos (`listing_photos`, read with the same session — policy `listing_photos_admin_read`). If a field of ListingDetailView cannot be filled from what the page can read, leave that part out and name it in the report;
  - Approve (`admin-screening-approve-<id>`);
  - Reject (`admin-screening-reject-<id>`).
- Approve and Reject:
  - open a confirmation (the shared alert dialog; `admin-screening-confirm`) with the phrase of E3a.1 and the buttons Approve or Reject and common.cancel;
  - on confirm: `guard(...)` of the step-up gate around `rpc("transition_listing", { p_listing_id, p_new_status: "active" | "rejected" })`;
  - on success: a toast (admin.screening.approved or admin.screening.rejected) and the list reloads;
  - on an error: a toast with common.error and the row stays.
- Buttons are shown only when the reviewer holds `listings:review` (`useAdminShell().permissions`); the door decides anyway (F3).
- No rows: admin.screening.empty (`admin-screening-empty`).
- Phones: the shared table's card layout, as the countries page shows it.

E3a.4 — THE TESTS: e2e/admin-screening.spec.ts (new; ids SC-1 to SC-5).
- Seeding: as e2e/feed-route.spec.ts seeds (a leased seller; a scratch category branch; `seedScratchChain("ET")`), with one listing inserted by the service client with status "screening", published_at null, the leaf category, the scratch city, and a unique title `e2e-screen-${RUN}-${rand()}`. Cleanup in afterEach in the same order (listings, region, branch).
- The admin: `useJobSuperAdmin(page)` (e2e/helpers/ui.ts :881) and `stepUpIfPrompted(page, secret)` (:915).
- `rpcFromBrowser`: a local function in the spec, as e2e/mfa-stepup.spec.ts :45 writes it.
- Every row is found by searching its unique title in the page's search box, never by its place in the list (G28).
- SC-1 "the queue lists an ad waiting for review": open /admin/screening, search the title; the row shows the title, the scratch category's name and the scratch city's name.
- SC-2 "Approve puts the ad on the site": the row's Approve, confirm, `stepUpIfPrompted`; the "Approved" toast; then DB truth through the service client:
  - status "active" and published_at set;
  - at least one feed_index row for the listing;
  - the row has left the queue.
- SC-3 "Reject keeps the ad off": the same with Reject → status "rejected", no feed_index row, the "Rejected" toast.
- SC-4 "only a reviewer with a fresh second factor decides", each with DB truth that the status stays "screening":
  - (a) a leased pool user with no role: `rpcFromBrowser(page, "transition_listing", { p_listing_id, p_new_status: "active" })` returns an error;
  - (b) a user given the role that E3a.0 (b) shows holding `listings:review`, with no second factor (`createUser` and `grantRole`, as e2e/mfa-stepup.spec.ts MF-4 does): the same call returns an error matching /no verified factor|step-up required/i.
- SC-5 "an empty search shows the empty message": search a title nobody has (`e2e-none-${rand()}`) → `admin-screening-empty` is visible with the English of admin.screening.empty.
- e2e/admin-shell.spec.ts reads the sections list itself, so it covers the new section without an edit.

E3a.5 — scripts/e2e-select.ts: a new area after "admin-audit":
  { name: "admin-screening", src: ["src/routes/admin.screening.tsx", "src/features/admin-screening/**"], specs: ["e2e/admin-screening.spec.ts"] }
Run `bun run scripts/e2e-select.ts --self-test`.

E3a.6 — THE ROUTE CORRECTION: src/routes/api/feed.ts. When the call returns no error, the data must be an object whose `cards`, `ladder` and `steps` are arrays; otherwise answer 502 through `fail()` (it logs one [ssr-error] line). Remove the `?? {}` and `?? []` defaults that turn a missing answer into an empty page. Nothing else in the route changes.

E3a.7 — docs/features/admin-screening.md (new): what the page shows, who may use it, what Approve and Reject do, the step-up rule of the door, what comes with stage 2. docs/features/feed-engine.md: one line under E2b naming the route's slow-call warning (over 5 s, `[slow-rpc]`). One changelog line.

E3a.8 — THE MIGRATION (last). Write the appendix's text; run the check as above; choose the mark; hand the final text to the database tool once. Then the read-back with your query tool. Paste each result; a read refused to your tool's role is reported as refused:
- `select version from public.migration_marks where version = '<MARK>';` — one row;
- `select prosecdef, provolatile, proconfig from pg_proc where oid = 'public.transition_listing(uuid,text)'::regprocedure;`
- `select position('require_step_up_if_needed' in prosrc) > 0 from pg_proc where oid = 'public.transition_listing(uuid,text)'::regprocedure;` — true.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- E3 — the feed screens on /api/feed: 20 per page, the next page as the last card comes into view; the step labels; subcategory addresses resolved through the whole tree; the breadcrumbs; the performance job. Its walk uses ads the operator approves on this page.
- Then (agreed, D106 and D107): the chosen place kept on the account, and the amber "different place" notice.
- Stage 2: reasons for a rejection shown to the seller; the exceptions page this section becomes part of.

REPORT (one, at the end). First lines:
- done or not done for step 0 and E3a.0 to E3a.8;
- the E3a.0 results;
- whether the browser started;
- any cited line that read differently;
- any part of ListingDetailView left out, and why;
- any file outside the lists.
Then:
- every new key with its English and Amharic;
- the check-migrations "guard OK" lines;
- the mark and the now() reading it came from;
- the apply outcome;
- the read-back;
- the line "apply <uuid-fragment of the filename> → expect mark <MARK>" for the operator's staging apply;
- the six ci-status lines;
- unit tests, format:check, lint, typecheck;
- the file list from `git diff --name-only d91aac66` (untracked new files listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)

-- E3a (bundle 10, before the feed screens): Admin > Screening. transition_listing is redeclared WHOLE from its live definition (20261006010039, M9b) with one change: a reviewer's decision (to active, reduced, rejected or held) and an enforcer's removal require a recent second-factor step-up, as the listings:review and listings:enforce permissions say (require_step_up_if_needed, the helper every admin door calls). The seller's own paths and the service's are unchanged.
-- e2e-areas: admin-screening, posting

CREATE OR REPLACE FUNCTION public.transition_listing(p_listing_id uuid, p_new_status text)
 RETURNS void
 LANGUAGE plpgsql
 VOLATILE
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_uid      uuid := auth.uid();
  v_row      public.listings%ROWTYPE;
  v_service  boolean := (v_uid IS NULL AND current_setting('role', true) IS DISTINCT FROM 'anon');
  v_reviewer boolean := false;
  v_enforcer boolean := false;
  v_owner    boolean := false;
  v_ok       boolean := false;
BEGIN
  IF p_new_status NOT IN ('draft','screening','active','reduced','rejected','held','expired','sold','removed') THEN
    RAISE EXCEPTION 'unknown status: %', p_new_status;
  END IF;

  SELECT * INTO v_row FROM public.listings WHERE id = p_listing_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'listing not found'; END IF;

  IF v_uid IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE user_id = v_uid AND account_status = 'deactivated') THEN
      RAISE EXCEPTION 'account is deactivated';
    END IF;
    IF NOT coalesce((public.rate_gate('revise')->>'allowed')::boolean, false) THEN RAISE EXCEPTION 'rateLimited'; END IF;
    v_owner    := (v_row.seller_id = v_uid);
    v_reviewer := public.has_permission(v_uid, 'listings', 'review');
    v_enforcer := public.has_permission(v_uid, 'listings', 'enforce');
    IF NOT (v_owner OR v_reviewer OR v_enforcer) THEN
      RAISE EXCEPTION 'not your listing';
    END IF;
  END IF;

  -- The gateway/reviewer branch: only these roles may put a listing in front of
  -- a visitor. No owner door reaches 'active'.
  IF p_new_status IN ('active','reduced','rejected','held') THEN
    IF NOT (v_service OR v_reviewer) THEN
      RAISE EXCEPTION 'reviewer only: % -> %', v_row.status, p_new_status;
    END IF;
    IF NOT v_service THEN
      PERFORM public.require_step_up_if_needed('listings', 'review');
    END IF;
    v_ok := CASE v_row.status
      WHEN 'screening' THEN p_new_status IN ('active','reduced','rejected','held')
      WHEN 'held'      THEN p_new_status IN ('active','reduced','rejected')
      ELSE false
    END;
  ELSIF p_new_status = 'screening' THEN
    v_ok := v_row.status IN ('draft','active','reduced','rejected','expired','sold');
  ELSIF p_new_status IN ('sold','expired') THEN
    v_ok := v_row.status IN ('active','reduced');
  ELSIF p_new_status = 'removed' THEN
    IF v_owner AND NOT (v_service OR v_enforcer) THEN
      IF v_row.status = 'rejected' AND coalesce(v_row.screening->>'severe','false') = 'true' THEN
        RAISE EXCEPTION 'a listing rejected for a severe reason is removed by enforcement only';
      END IF;
      v_ok := true;
    ELSE
      v_ok := (v_service OR v_enforcer);
      IF NOT v_ok THEN
        RAISE EXCEPTION 'enforcement only: % -> removed', v_row.status;
      END IF;
      IF NOT v_service THEN
        PERFORM public.require_step_up_if_needed('listings', 'enforce');
      END IF;
    END IF;
  ELSE
    v_ok := false;
  END IF;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'illegal transition: % -> %', v_row.status, p_new_status;
  END IF;

  IF p_new_status IN ('active','reduced') THEN
    UPDATE public.listings SET
      status = p_new_status,
      published_at = coalesce(published_at, now()),
      published_first_at = coalesce(published_first_at, now()),
      -- M5 / DEC-117 — LEAST(the seller's date, now() + the category's days);
      -- each side is left out when absent (LEAST skips NULL); NULL when both are.
      expires_at = LEAST(v_row.poster_expires_at,
        now() + make_interval(days => (SELECT c.expiry_days FROM public.categories c WHERE c.id = v_row.category_id))),
      updated_at = now()
    WHERE id = p_listing_id;
  ELSE
    UPDATE public.listings SET status = p_new_status, updated_at = now()
     WHERE id = p_listing_id;
  END IF;

  INSERT INTO public.listing_revisions (listing_id, seller_id, kind, before, after, actor)
    VALUES (p_listing_id, v_row.seller_id, 'state',
            jsonb_build_object('status', v_row.status),
            jsonb_build_object('status', p_new_status), v_uid);
END $function$;
REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated;
GRANT ALL ON FUNCTION public.transition_listing(uuid, text) TO service_role;

-- Proofs: the header facts and grants stay those of the live function, and the two step-up calls are in place.
DO $proof$
DECLARE
  v_src text;
BEGIN
  SELECT p.prosrc INTO STRICT v_src FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure;
  IF position('require_step_up_if_needed(''listings'', ''review'')' IN v_src) = 0
     OR position('require_step_up_if_needed(''listings'', ''enforce'')' IN v_src) = 0 THEN
    RAISE EXCEPTION 'E3a P1: a step-up call is missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.transition_listing(uuid,text)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E3a P2: transition_listing header facts differ';
  END IF;
  IF has_function_privilege('anon', 'public.transition_listing(uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.transition_listing(uuid,text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.transition_listing(uuid,text)', 'EXECUTE') THEN
    RAISE EXCEPTION 'E3a P3: transition_listing privileges differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
```
