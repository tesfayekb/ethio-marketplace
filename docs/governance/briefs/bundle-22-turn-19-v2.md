# Bundle 22 — turn 19 v2 (after the close): the periods the approved Terms and Privacy still typed become legal facts; the acceptance screen's new liability line (DEC-221): brief (saved unchanged, 2026-10-21)

```text
BUNDLE 22 — TURN 19 v2 (2026-10-21; after the close). THIS BRIEF REPLACES bundle-22-turn-19.md, stopped before STEP 0 on your rule "D5 A RENAMED STRING IS A NEW KEY: a UI string whose wording changes gets a NEW key (old key retired when unread); editing an existing key's compiled value never reaches production: an approved DB row outranks the file (D3).": save nothing from it. Its one change: the liability line is a NEW key, legal.accept.liabilityLimits, and legal.accept.liability is retired (C3, C4, D4), as you asked. Tier A. ONE MIGRATION BY THE TOOL (M15), FIRST — before any other change; then the STOP for the operator's staging apply; then the rest after his "continue". SIX NEW KEYS (one of them replaces legal.accept.liability, which is retired — Knowledge D5; exact English and Amharic below). No package change. No AGENTS.md change: its rule "Legal (bundle 22): texts render only via `LegalText` (src/features/legal), never as HTML; facts are {{setting}} tokens from the version's frozen settings." already records the decision — the four are more facts of the same kind; if your rule asks for an AGENTS.md rule, STOP before saving and quote it. Base: dev efb378f9 (bundle 22 turn 18). Parts, IN THIS ORDER: A — CI first; STEP 0; B — M15 by the tool, its read-backs, THE STOP REPORT and STOP; (after "continue") C — the facts in the app and the strings; D — the tests; E — the docs, the roadmap, the launch gate, the changelog; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT. Write the reports in English.

WHY
- DEC-221 (THE OPERATOR, 2026-10-21 02:41 New York): "Terms and Privacy draft- approved" — the redline "Terms and Privacy v2 — pre-counsel redline" at revision 108; and (02:4x, the question card) they are published as soon as they are ready, not held for launch. The approved redline lists, under "Steps outside the text": "With the legal texts' turn: the 6-month appeal window, the one-year claims limit and the 30 days to talk first become facts, like the others." (DEC-129: no fact is typed into a legal text; each published version freezes its facts.) The supervisor's census of the approved texts found one more of the same class: Privacy §10's "We confirm that we received your complaint within 30 days".
- So four facts join legal_settings: appeal_months (6; Terms §5 and Privacy §5 "appeal within … months"), claims_limit_months (12; the Terms' main points and §14 "within … months after it arises"), talk_first_days (30; Terms §14 "give us … days to resolve it") and complaint_ack_days (30; Privacy §10). The approved redline's item 2 also says the proof of acceptance is kept with the account's identity "which covers the one-year time limit for claims": a closed account's identity is therefore kept at least as long as the claims limit (account_keep_months >= claims_limit_months), refused before saving.
- Every token the approved texts use is a column of legal_settings once M15 lands (the publish door freezes `to_jsonb(legal_settings)` and refuses a token that is not a fact or whose fact is empty — M3); the operator imports the texts and publishes after this turn.
- The acceptance screen's liability line changes as the approved redline's table says, without a typed period — as a NEW key, legal.accept.liabilityLimits (Knowledge D5; legal.accept.liability is retired once nothing reads it): "The Terms limit our liability, set a time limit for claims, and make you responsible for your ads and deals, including claims they cause against us. The main points are at the top of the Terms."
- The supervisor ran M15 on a scratch PostgreSQL 16 with the real legal_settings definition before writing this brief: it applies, its proofs pass; the door refuses appeal_months 0, talk_first_days 91, a non-number, an unknown key, a claims limit longer than the identity period (alone, and with the identity lowered) as badValue:<key>; a valid save of all four writes and audits; a direct UPDATE that breaks the rule is refused by the CHECK.

STEP 0 — save this file (the attached bundle-22-turn-19-v2.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-22-turn-19-v2.md and paste its sha256sum. Tick nothing. No report file in the repository.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Part B (M15, FIRST); THE STOP REPORT; STOP. After the operator's "continue": Parts C to E; the checks; THE END-TO-END CHECK; THE CI WAIT REPORT; END THE TURN. Do not stop anywhere else. If the platform ends the turn early, report three lines (done, left, CI) with the done parts and `git diff --name-only <START>`; the operator sends "continue".
- The migration (G39): written ONCE, by your database tool, as the final literal text of the block below — never a stub, a comment-only apply or a draft; the tool applies it on ethio-prod the moment it is saved (the operator allows the "Modify Supabase database" dialog). You cannot write or copy files under supabase/migrations/ yourself: the tool writes that file. ethio-staging is the operator's (his SQL editor).
- The strings (G43): the twelve values below are copied from the saved brief by a script into en.ts and am.ts — never retyped.
- Run no stateful git command. Edits with your file-editing tool, in whatever form it takes; no authored scripts that rewrite files (the string copy excepted). Spec files are edited by hand (G37); shared helpers keep their defaults.
- Tests (G27, G38): no test writes legal_settings (a real row) — the facts are proven by the card's read-back and by refusals that send nothing; no assertion loosened.
- Production reads are SELECT only, counts and definitions only — no row of a person.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Expected: the run on efb378f9 (turn 18). Paste the lines of guards-last-failure.md that name a failed job and of e2e-last-failure.md that name a failed or retried test (both at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/). Any gating failure: read its body and fix it at its root cause first (G21, G38), named with its fix.
A2. Paste the first 24 lines of https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/local-backend-proof.md and its "- Teardown:" list (expected: fourteen lanes, the email lane's four tests; each lane's teardown line).

PART B — M15, BY THE TOOL, FIRST.
B0. Before M15, from ethio-prod's read tool (SELECT only), paste: (1) `select pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);` — its body must equal M15's section 2 apart from its four named changes and the identity rule (say so, or paste the difference and STOP); (2) `select account_keep_months from public.legal_settings;` (one number — it must be 12 or more, or M15's rule refuses the apply: then STOP and report it); (3) `select max(version) from public.migration_marks;` (expected 20261021200000).
B1. The mark 20261021210000 must be later than the stamp the tool gives the file: if the UTC time is past 2026-10-21 19:00 when you reach B1, STOP and ask for a new mark. Run `bash scripts/check-migrations.sh` after the file exists and paste its last lines ("Self-marking guard OK" and "Migration guard OK.").
B2. THE TEXT CHECK: write M15's block below — from its first line (the comment naming its e2e areas, the first line after "M15 — the text the tool writes, exactly:") through its last line (the INSERT of the mark, the line before the empty line that precedes PART C) — from the saved docs/governance/briefs/bundle-22-turn-19-v2.md to a scratch file outside the repository with a script (never by hand), and run `diff -w <scratch file> <the saved migration file>`; paste the result (expected: no difference).
B3. Read back on ethio-prod: `select version from public.migration_marks where version = '20261021210000';` (one row); `select appeal_months, claims_limit_months, talk_first_days, complaint_ack_days from public.legal_settings;` (6, 12, 30, 30); `select conname from pg_constraint where conrelid = 'public.legal_settings'::regclass and conname in ('legal_settings_appeal_months_check','legal_settings_claims_limit_months_check','legal_settings_talk_first_days_check','legal_settings_complaint_ack_days_check','legal_settings_proof_outlives_claims_check') order by 1;` (five rows); `select position('complaint_ack_days = CASE' in pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure)) > 0;` (t).
THE STOP REPORT (then STOP): <START>; A1's and A2's lines; the sha256sum; B0's three outputs; the migration file's path; B1's lines; B2's diff; B3's four read-backs; and the operator's line: "apply <the uuid fragment of the migration file's name> → expect mark 20261021210000".

M15 — the text the tool writes, exactly:
-- e2e-areas: legal
-- Bundle 22 turn 19 — M15 (mark 20261021210000): the periods the approved v2 texts still typed become legal facts
-- (DEC-221; the approved redline rev 108, "Steps outside the text": "the 6-month appeal window, the one-year claims
-- limit and the 30 days to talk first become facts, like the others"; DEC-129 "no fact is typed into the legal text").
--  1. legal_settings gains appeal_months (default 6, 1 to 24), claims_limit_months (default 12, 1 to 60),
--     talk_first_days (default 30, 1 to 90) and complaint_ack_days (default 30, 1 to 90), and a rule that a closed
--     account's identity is kept at least as long as the claims limit (account_keep_months >= claims_limit_months —
--     the proof of acceptance must outlive the window for claims, rev 108 item 2). The texts quote them as
--     {{appeal_months}}, {{claims_limit_months}}, {{talk_first_days}} and {{complaint_ack_days}}; each published
--     version freezes them in its settings_snapshot like every other fact.
--  2. admin_set_legal_settings, re-declared whole from M9 (20261019232513 :16-:143), takes the four with the other
--     numbers (four named changes: the key list, the number list with its bounds, the assignments) and refuses an
--     identity period shorter than the claims limit as badValue:account_keep_months before anything is written.
-- Proofs: the columns, their defaults and checks, the cross rule, the door's header, grants and keys (catalogue only).

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.migration_marks WHERE version = '20261021200000') THEN
    RAISE EXCEPTION 'bundle 22 turn 17c M14 (mark 20261021200000) must be applied first';
  END IF;
END $$;

-- ===== 1 — the four facts and the rule =====
ALTER TABLE public.legal_settings
  ADD COLUMN appeal_months integer NOT NULL DEFAULT 6
    CONSTRAINT legal_settings_appeal_months_check CHECK (appeal_months BETWEEN 1 AND 24),
  ADD COLUMN claims_limit_months integer NOT NULL DEFAULT 12
    CONSTRAINT legal_settings_claims_limit_months_check CHECK (claims_limit_months BETWEEN 1 AND 60),
  ADD COLUMN talk_first_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_talk_first_days_check CHECK (talk_first_days BETWEEN 1 AND 90),
  ADD COLUMN complaint_ack_days integer NOT NULL DEFAULT 30
    CONSTRAINT legal_settings_complaint_ack_days_check CHECK (complaint_ack_days BETWEEN 1 AND 90),
  ADD CONSTRAINT legal_settings_proof_outlives_claims_check CHECK (account_keep_months >= claims_limit_months);

-- ===== 2 — the settings door (re-declared whole; four keys added, the identity rule) =====
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
                     'account_keep_months','technical_keep_months','sold_visible_days',
                     'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days') THEN
      RAISE EXCEPTION 'badValue:%', v_key;
    END IF;
  END LOOP;
  -- Every number is checked before anything is written, so a bad value is refused as badValue:<key>
  -- and never reaches the table's CHECK constraints (INC-762).
  FOR v_key IN SELECT k FROM jsonb_object_keys(p_settings) AS k LOOP
    IF v_key IN ('liability_limit_usd','notice_days','response_days','response_extra_days',
                 'deleted_ad_keep_months','dispute_keep_years','listed_ad_keep_months',
                 'account_keep_months','technical_keep_months','sold_visible_days',
                 'appeal_months','claims_limit_months','talk_first_days','complaint_ack_days') THEN
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
         OR (v_key = 'sold_visible_days' AND (v_num < 1 OR v_num > 365))
         OR (v_key = 'appeal_months' AND (v_num < 1 OR v_num > 24))
         OR (v_key = 'claims_limit_months' AND (v_num < 1 OR v_num > 60))
         OR (v_key IN ('talk_first_days','complaint_ack_days') AND (v_num < 1 OR v_num > 90)) THEN
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
  -- The proof of acceptance must outlive the window for claims (rev 108 item 2): a closed account's identity is
  -- kept at least as long as the claims limit, checked here so it is refused as badValue:<key>, never by the CHECK.
  IF (CASE WHEN p_settings ? 'account_keep_months' THEN (p_settings ->> 'account_keep_months')::integer
           ELSE (v_before ->> 'account_keep_months')::integer END)
     < (CASE WHEN p_settings ? 'claims_limit_months' THEN (p_settings ->> 'claims_limit_months')::integer
             ELSE (v_before ->> 'claims_limit_months')::integer END) THEN
    RAISE EXCEPTION 'badValue:account_keep_months';
  END IF;
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
    appeal_months = CASE WHEN p_settings ? 'appeal_months'
                         THEN (p_settings ->> 'appeal_months')::integer ELSE appeal_months END,
    claims_limit_months = CASE WHEN p_settings ? 'claims_limit_months'
                               THEN (p_settings ->> 'claims_limit_months')::integer ELSE claims_limit_months END,
    talk_first_days = CASE WHEN p_settings ? 'talk_first_days'
                           THEN (p_settings ->> 'talk_first_days')::integer ELSE talk_first_days END,
    complaint_ack_days = CASE WHEN p_settings ? 'complaint_ack_days'
                              THEN (p_settings ->> 'complaint_ack_days')::integer ELSE complaint_ack_days END,
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

-- ===== 3 — proofs (a failure raises; a clean apply is the pass; the catalogue only — no row is read) =====
DO $$
DECLARE
  v_def text := pg_get_functiondef('public.admin_set_legal_settings(jsonb)'::regprocedure);
  v_key text;
BEGIN
  FOREACH v_key IN ARRAY ARRAY['appeal_months', 'claims_limit_months', 'talk_first_days', 'complaint_ack_days'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_attribute a
                    WHERE a.attrelid = 'public.legal_settings'::regclass AND a.attname = v_key
                      AND a.attnotnull AND NOT a.attisdropped AND a.atttypid = 'integer'::regtype) THEN
      RAISE EXCEPTION 'proof: legal_settings.% is not an integer NOT NULL column', v_key;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                    WHERE c.conrelid = 'public.legal_settings'::regclass AND c.contype = 'c'
                      AND c.conname = 'legal_settings_' || v_key || '_check') THEN
      RAISE EXCEPTION 'proof: legal_settings.% has no bound', v_key;
    END IF;
    IF position('''' || v_key || '''' IN v_def) = 0 OR position(v_key || ' = CASE' IN v_def) = 0 THEN
      RAISE EXCEPTION 'proof: admin_set_legal_settings does not take %', v_key;
    END IF;
  END LOOP;
  IF (SELECT string_agg(a.attname || '=' || pg_get_expr(d.adbin, d.adrelid), ',' ORDER BY a.attname)
        FROM pg_attrdef d JOIN pg_attribute a ON a.attrelid = d.adrelid AND a.attnum = d.adnum
       WHERE d.adrelid = 'public.legal_settings'::regclass
         AND a.attname IN ('appeal_months', 'claims_limit_months', 'talk_first_days', 'complaint_ack_days'))
     IS DISTINCT FROM 'appeal_months=6,claims_limit_months=12,complaint_ack_days=30,talk_first_days=30' THEN
    RAISE EXCEPTION 'proof: the four defaults are not 6, 12, 30 and 30';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint c
                  WHERE c.conrelid = 'public.legal_settings'::regclass
                    AND c.conname = 'legal_settings_proof_outlives_claims_check') THEN
    RAISE EXCEPTION 'proof: the identity-outlives-claims rule is missing';
  END IF;
  IF position('badValue:account_keep_months' IN v_def) = 0 THEN
    RAISE EXCEPTION 'proof: the door does not refuse a short identity period';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.admin_set_legal_settings(jsonb)'::regprocedure
                    AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig @> ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings header changed';
  END IF;
  IF has_function_privilege('anon', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_legal_settings(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof: admin_set_legal_settings grants changed';
  END IF;
END $$;

INSERT INTO public.migration_marks (version) VALUES ('20261021210000') ON CONFLICT DO NOTHING;

PART C — THE FACTS IN THE APP AND THE STRINGS.
C1. src/features/admin/legal/legal-service.ts: FACT_KEYS (:35-:55 at efb378f9) gains, after "sold_visible_days", in this order: "appeal_months", "claims_limit_months", "talk_first_days", "complaint_ack_days".
C2. src/features/admin/legal/facts-validation.ts: FACT_BOUNDS gains appeal_months [1, 24], claims_limit_months [1, 60], talk_first_days [1, 90], complaint_ack_days [1, 90]; FactError's type gains "shorterThanClaims"; after the loop, when account_keep_months and claims_limit_months both passed and the first is smaller, account_keep_months gets { type: "shorterThanClaims", min: <the claims limit> } (the card already prints `admin.legal.facts.<type>` with {min} replaced).
C3. src/features/legal/legal-accept-screen.tsx :85 — the liability paragraph reads the new key `legal.accept.liabilityLimits` instead of `legal.accept.liability` and gains data-testid="legal-accept-liability". It is that key's only reader (`grep -rnw "legal.accept.liability" src e2e scripts` at efb378f9 lists legal-accept-screen.tsx :85 and the two catalogues alone), so `legal.accept.liability` is then removed from en.ts (:3068-:3069) and am.ts (:2921-:2922) — Knowledge D5: the old key retired when unread; its database row becomes an orphan in Admin › Translations, the retirement path.
C4. The strings — six new keys: the four admin.legal.fact.* after "admin.legal.fact.sold_visible_days" (en.ts :3200, am.ts :3044), admin.legal.facts.shorterThanClaims after "admin.legal.facts.badPhone" (en.ts :3179, am.ts :3025), and legal.accept.liabilityLimits where legal.accept.liability stands today (en.ts :3068-:3069, am.ts :2921-:2922 — C3 removes the old key); copied by a script from these lines of the saved brief (the text after "en: " and after "am: ", to the end of the line):
  key: admin.legal.fact.appeal_months
  en: Appeal a decision within, months
  am: በውሳኔ ላይ ይግባኝ የሚባልበት ጊዜ፣ በወራት
  key: admin.legal.fact.claims_limit_months
  en: Bring a claim within, months
  am: የይገባኛል ጥያቄ የሚቀርብበት ጊዜ፣ በወራት
  key: admin.legal.fact.talk_first_days
  en: Time to settle before a claim, days
  am: የይገባኛል ጥያቄ ከመቅረቡ በፊት ለመፍታት የሚሰጥ ጊዜ፣ በቀናት
  key: admin.legal.fact.complaint_ack_days
  en: Confirm a privacy complaint within, days
  am: የግላዊነት ቅሬታ መድረሱን የምናረጋግጥበት ጊዜ፣ በቀናት
  key: admin.legal.facts.shorterThanClaims
  en: At least the claims limit: {min} months.
  am: ከይገባኛል ጥያቄ የጊዜ ገደቡ ያላነሰ፦ ቢያንስ {min} ወራት።
  key: legal.accept.liabilityLimits
  en: The Terms limit our liability, set a time limit for claims, and make you responsible for your ads and deals, including claims they cause against us. The main points are at the top of the Terms.
  am: ውሎቹ የእኛን ተጠያቂነት ይገድባሉ፤ የይገባኛል ጥያቄዎች የሚቀርቡበትን የጊዜ ገደብ ያስቀምጣሉ፤ ለማስታወቂያዎችዎ እና ለስምምነቶችዎ፣ በእኛ ላይ ለሚያስነሷቸው የይገባኛል ጥያቄዎችም ጭምር፣ ኃላፊነቱ የእርስዎ እንደሆነ ይገልጻሉ። ዋና ዋና ነጥቦቹ በውሎቹ መጀመሪያ ላይ ይገኛሉ።
  Paste each Amharic value's code points as written to am.ts; expected:
  admin.legal.fact.appeal_months: 0x1260 0x12cd 0x1233 0x1294 0x20 0x120b 0x12ed 0x20 0x12ed 0x130d 0x1263 0x129d 0x20 0x12e8 0x121a 0x1263 0x120d 0x1260 0x1275 0x20 0x130a 0x12dc 0x1363 0x20 0x1260 0x12c8 0x122b 0x1275
  admin.legal.fact.claims_limit_months: 0x12e8 0x12ed 0x1308 0x1263 0x129b 0x120d 0x20 0x1325 0x12eb 0x1244 0x20 0x12e8 0x121a 0x1240 0x122d 0x1265 0x1260 0x1275 0x20 0x130a 0x12dc 0x1363 0x20 0x1260 0x12c8 0x122b 0x1275
  admin.legal.fact.talk_first_days: 0x12e8 0x12ed 0x1308 0x1263 0x129b 0x120d 0x20 0x1325 0x12eb 0x1244 0x20 0x12a8 0x1218 0x1245 0x1228 0x1261 0x20 0x1260 0x134a 0x1275 0x20 0x1208 0x1218 0x134d 0x1273 0x1275 0x20 0x12e8 0x121a 0x1230 0x1325 0x20 0x130a 0x12dc 0x1363 0x20 0x1260 0x1240 0x1293 0x1275
  admin.legal.fact.complaint_ack_days: 0x12e8 0x130d 0x120b 0x12ca 0x1290 0x1275 0x20 0x1245 0x122c 0x1273 0x20 0x1218 0x12f5 0x1228 0x1231 0x1295 0x20 0x12e8 0x121d 0x1293 0x1228 0x130b 0x130d 0x1325 0x1260 0x1275 0x20 0x130a 0x12dc 0x1363 0x20 0x1260 0x1240 0x1293 0x1275
  admin.legal.facts.shorterThanClaims: 0x12a8 0x12ed 0x1308 0x1263 0x129b 0x120d 0x20 0x1325 0x12eb 0x1244 0x20 0x12e8 0x130a 0x12dc 0x20 0x1308 0x12f0 0x1261 0x20 0x12eb 0x120b 0x1290 0x1230 0x1366 0x20 0x1262 0x12eb 0x1295 0x1235 0x20 0x7b 0x6d 0x69 0x6e 0x7d 0x20 0x12c8 0x122b 0x1275 0x1362
  legal.accept.liabilityLimits: 0x12cd 0x120e 0x1279 0x20 0x12e8 0x12a5 0x129b 0x1295 0x20 0x1270 0x1320 0x12eb 0x1242 0x1290 0x1275 0x20 0x12ed 0x1308 0x12f5 0x1263 0x1209 0x1364 0x20 0x12e8 0x12ed 0x1308 0x1263 0x129b 0x120d 0x20 0x1325 0x12eb 0x1244 0x12ce 0x127d 0x20 0x12e8 0x121a 0x1240 0x122d 0x1261 0x1260 0x1275 0x1295 0x20 0x12e8 0x130a 0x12dc 0x20 0x1308 0x12f0 0x1265 0x20 0x12eb 0x1235 0x1240 0x121d 0x1323 0x1209 0x1364 0x20 0x1208 0x121b 0x1235 0x1273 0x12c8 0x1242 0x12eb 0x12ce 0x127d 0x12ce 0x20 0x12a5 0x1293 0x20 0x1208 0x1235 0x121d 0x121d 0x1290 0x1276 0x127d 0x12ce 0x1363 0x20 0x1260 0x12a5 0x129b 0x20 0x120b 0x12ed 0x20 0x1208 0x121a 0x12eb 0x1235 0x1290 0x1237 0x1278 0x12cd 0x20 0x12e8 0x12ed 0x1308 0x1263 0x129b 0x120d 0x20 0x1325 0x12eb 0x1244 0x12ce 0x127d 0x121d 0x20 0x132d 0x121d 0x122d 0x1363 0x20 0x1283 0x120b 0x134a 0x1290 0x1271 0x20 0x12e8 0x12a5 0x122d 0x1235 0x12ce 0x20 0x12a5 0x1295 0x12f0 0x1206 0x1290 0x20 0x12ed 0x1308 0x120d 0x133b 0x1209 0x1362 0x20 0x12cb 0x1293 0x20 0x12cb 0x1293 0x20 0x1290 0x1325 0x1266 0x1279 0x20 0x1260 0x12cd 0x120e 0x1279 0x20 0x1218 0x1300 0x1218 0x122a 0x12eb 0x20 0x120b 0x12ed 0x20 0x12ed 0x1308 0x129b 0x1209 0x1362
  Add them however this project adds a key (the usage maps are written by the map guard at the end of the checks).

PART D — THE TESTS.
D1. src/features/admin/legal/facts-validation.test.ts: the shared `valid` fixture gains the four facts with claims_limit_months "1" and the others at their defaults ("6", "30", "30"), and its account_keep_months becomes "120", so no bounds case meets the new rule; the bounds table gains the four rows (appeal_months 1–24, claims_limit_months 1–60, talk_first_days 1–90, complaint_ack_days 1–90); one new case: account_keep_months "12" with claims_limit_months "24" → account_keep_months is { type: "shorterThanClaims", min: 24 }, and "24" with "24" → no error.
D2. src/features/admin/legal/legal-service.test.ts: "lists the 19 facts in order" becomes the 23 facts in order (the four after sold_visible_days).
D3. e2e/legal-admin.spec.ts: LGA-1's key list becomes all 23 facts in FACT_KEYS' order — sold_visible_days included (turn 8 added it to the card but not to this list: G29) — with its message "the facts card shows the 23 facts"; LGA-4 also fills appeal_months "0" and, separately, claims_limit_months "24" with account_keep_months "12", and sees legal-fact-error-appeal_months and legal-fact-error-account_keep_months (the latter's text "At least the claims limit: 24 months.") — still before any request (updated_at unchanged).
D4. e2e/legal-accept.spec.ts, LAC-1: where it first sees legal-accept-screen, `legal-accept-liability` has the text of the new English key legal.accept.liabilityLimits.

PART E — THE DOCS, THE ROADMAP, THE LAUNCH GATE, THE CHANGELOG.
E1. docs/features/legal.md, a new section at its end, "## Turn 19 — the approved texts' periods become facts (DEC-221)": the operator's approval word for word and that the texts are published as soon as they are ready; the four facts with their defaults and bounds, the identity rule and why; the liability line; D1–D4.
E2. roadmap.md: line 3 is replaced whole by: "The brief in force: docs/governance/briefs/bundle-22-turn-19.md (bundle 22 — turn 19, after the close: the four periods the approved Terms and Privacy still typed become legal facts; the acceptance screen's new liability line; DEC-221). Next: the Amharic of the approved texts (the supervisor), then the operator fills the legal phone, the company's registration number and the copyright agent in Admin › Legal, imports the three texts and publishes them (DEC-221: published as soon as ready); turn 20 — each legal document's review date (DEC-219); the privacy-request inbox before launch (D229, spec owed); the Publish and the one walk of bundle 22; the banned-items and safety pages after the curator's research; the flake-and-cleanup turn; bundle 23 — the business-name rule (D222) after reserved-names v5.2; D199 (discount / sale) after the peer research and the operator's rulings; D200's state." The line that begins "  - [ ] Turn 18 (docs/governance/briefs/bundle-22-turn-18.md" gets [x] and, at its end, " — CI: <the run of A1, its conclusion and the email lane's four tests>" (as A1 reads it); right after it, three new lines:
  - [ ] Turn 19 (docs/governance/briefs/bundle-22-turn-19.md; one migration M15, mark 20261021210000; six strings) — the approved texts' periods become legal facts: appeal_months, claims_limit_months, talk_first_days, complaint_ack_days; a closed account's identity kept at least as long as the claims limit; the acceptance screen's new liability line (DEC-221)
  - [ ] Turn 20 (owed; one migration, Tier A; strings) — each legal document shows its last review and the next one due (every {{review_months}} months, default 6, a setting); "Reviewed — no change" recorded with who, when and a note; a publish counts as a review; an overdue review shows on the admin menu (DEC-219, the operator 2026-10-21)
  - [ ] Before launch (owed; spec first, after peer research) — the privacy-request inbox: a signed-in "Your data" request form and staff logging the requests that reach privacy@ethio.com; each request shows its due date (the response-time facts), is flagged as it nears and when overdue, and is marked answered or not with who, when and a note (D229, the operator 2026-10-21)
E3. docs/governance/launch-gate.md APPEND at its end:

## Added 2026-10-21 (bundle 22 turn 19)

- [ ] The privacy-request inbox (D229: the in-app request form and the logged e-mails, due dates, flags, answered or not) — NOT DONE; before launch (the operator, 2026-10-21).
- [ ] A one-page breach plan: who decides, the clocks (72 hours to the authority under the EU, Ethiopian and Kenyan rules; "without unreasonable delay" under US state laws), message templates and contacts — NOT DONE; drafted by the supervisor, approved by the operator.
- [ ] Every sentence of the published Terms and Privacy Policy is true on launch day (in-app messages and blocking, promoted-ad labels, the logs of staff help and of access to hidden copies, the idle session timeout are described as built): build each, or change its wording in a new version before opening — NOT DONE (DEC-221: published before launch at the operator's choice).
- [ ] Each legal document's review date (DEC-219) and the six-monthly legal watch (DEC-220, a scheduled task from 2027-04-15) — the review dates NOT DONE (turn 20); the watch scheduled 2026-10-21.

E4. docs/_changelog.md APPEND one line: "- 2026-10-21 — Bundle 22 turn 19, after the close (one migration, M15; six strings): the appeal window, the claims time limit, the days to talk first and the days to confirm a privacy complaint become legal facts the approved Terms and Privacy Policy quote; a closed account's identity is kept at least as long as the claims limit; the acceptance screen's liability line follows the approved text (DEC-221)."

THE CHECKS (whole; paste the last line of each; when a check fails, paste its whole failure block): `bun run format:check` clean; `bun run lint` 0 errors; `bun run test:unit` alone, not while a browser run overlaps it (expected 1290 passed: 1285, the four bounds rows and the new case — paste the count either way); `bash scripts/check-migrations.sh` "Migration guard OK."; `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `SELF_TEST=1 bun scripts/check-acceptance-doors.ts` refusing all three fixture names; the guard on the live production list (turn 17's B1 query, run again after M15) → its OK line unchanged (116 write doors; owed 0, guarded 10, takedown 2); `grep -rnw "legal.accept.liability" src e2e scripts` prints nothing (C3); the code points (C4); the preview harness's "build OK"; at the end, `bun run i18n:map-guard` "usage maps match the tree".

THE END-TO-END CHECK (your rule: "Verify the request's central flow once end-to-end before concluding, in the state a real user would hit it: sign in when it needs a session, run the flow with real input, and confirm the result reads back through the UI."). Where: ethio-staging, after the operator has applied M15 there (his "continue" says so), with your three staging credentials — never production. The flows: a staff member signed in reads all 23 facts on Admin › Legal and is refused a bad appeal window and a claims limit longer than the identity period before anything is sent (LGA-1, LGA-4 — no test saves the facts: legal_settings is a real row); a person who owes meets the acceptance screen with its new liability line (LAC-1). Run `bun run e2e:local -- e2e/legal-admin.spec.ts --retries=0` and `bun run e2e:local -- e2e/legal-accept.spec.ts --retries=0` (each file whole, both projects). Paste each summary line and every failure body; a failure is read at its root cause and fixed in this turn (G21, G38). Nothing in this check is deferred; if a test cannot run, STOP and report why.

SCOPE — these files only: the brief; the migration file the tool writes (M15); src/integrations/supabase/types.ts if the tool regenerates it; src/features/admin/legal/legal-service.ts (C1), src/features/admin/legal/facts-validation.ts (C2), src/features/legal/legal-accept-screen.tsx (C3); src/i18n/locales/en.ts and am.ts (C4) and the two usage maps the map guard writes; src/features/admin/legal/facts-validation.test.ts, src/features/admin/legal/legal-service.test.ts (D1, D2); e2e/legal-admin.spec.ts, e2e/legal-accept.spec.ts (D3, D4); docs/features/legal.md (E1); roadmap.md (E2); docs/governance/launch-gate.md (E3); docs/_changelog.md (E4); the files of an A1 fix (each named with the failure it fixes). Name any other file in the report's first lines with its reason. Delete no file. No package change. No AGENTS.md change.
THE CI WAIT REPORT: done or not done by part; C's diffs; the code points; D's tests in full; the checks; the end-to-end check's outputs; `git diff --stat <START>`; `git diff --name-only <START>` (count the files from this list); anything not foreseen; the line "The project's own check follows on GitHub: the CI run on <the commit this turn leaves> — the lanes replay M15 from scratch and run LGA-1, LGA-4 and LAC-1; the next brief's Part A reads it." Then END THE TURN; send nothing after the report.
REVERT: a later migration that drops the five constraints and the four columns and restores admin_set_legal_settings from M9's file (20261019232513 :16-:143) — never an edit of M15 — with git revert of this turn's other commits.
```
