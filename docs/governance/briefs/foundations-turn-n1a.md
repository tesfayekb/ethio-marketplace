```text
RULING — Foundations turn N1 (INC-977): the plan is approved with the changes below. BUILD N1a now. N1b waits for two operator choices. Base: dev 7e2006a7.

CI FIRST: the latest completed run is 7063a727. It is FAILURE: format:check (src/routes/__root.tsx, src/server/first-screen.test.ts), the i18n used-on map and the first-paint budget. Every E2E lane passed. The run on 31d5fb6b is still running. Read it when it lands, and fix any red first, in this turn.

RULINGS ON THE PLAN
1. The split is accepted. N1a (this turn): the state, the door, the route, the staff count. N1b (next): the catch-up core, its trigger, the queue, the heartbeat. The trigger (T1 or T2) and the imitates action (a/b/c) go to the operator; you'll get them in N1b's ruling.
2. The state table is accepted as planned: public.name_checks, PK (profile_id, subject), subject CHECK ('alias'), checked_text, state ('unchecked','clean','imitates'), since, attempts, last_attempt_at, home_country_code. It is born closed: REVOKE ALL from PUBLIC, anon and authenticated; RLS on with deny policies. The partial index stays only if the proof's EXPLAIN uses it.
3. CHANGED: no p_name_state argument on save_posting_identity. That door is granted to authenticated, so a person can call it directly over the API and skip the route's check. A state argument would let them assert "clean" (banned: a client-trusted value on an identity path). Instead:
   a. The door writes state 'unchecked' (checked_text = the lower-cased alias, since = now()) in the same transaction, on every save whose alias differs from the stored one. Its argument list is unchanged, so it is redeclared whole from live pg_get_functiondef with no DROP (G39), by computed insertion if the body is over 10 KB. A save that cannot write the state row fails whole.
   b. A new service-only function marks a name clean: name_check_mark(p_profile uuid, p_subject text, p_text text, p_state text). EXECUTE is revoked from PUBLIC, anon and authenticated, and granted to service_role only. It changes the row only when the stored checked_text equals p_text, so a name changed in between is never marked clean.
   c. The route asks the model first, as today. After the door answers ok and the answer was clean, the route calls name_check_mark through the server client (G54 a: the service-role write comes after the caller-scoped door answered ok). If the mark fails, the row stays unchecked and the failure is logged. That is the safe direction, and N1b's catch-up asks again.
   d. auditUnchecked and the `alias.unchecked` action are retired. Nothing reads them, prod has 0 rows, and the state table plus the ai_calls row are the record. Add the retirement to the INC-977 entry's fix line.
4. alias.ts and seller.ts: read both at build. Every path that saves a seller name joins the door's state write. Because the door writes the state, any path through save_posting_identity is covered. A path that writes profiles.alias any other way is either moved onto the door or named in the report.
5. A staff-assigned name (admin_update_profile → user.alias_assigned) is marked clean by that door in the same transaction, because a person chose it. It is redeclared whole as in 3a.
6. The staff count: a gated door admin_name_check_summary() returns the count of unchecked names and the oldest `since`, and nothing else. It is gated by the Screening page's own permission (listings:view, screening-page.tsx:120); in N1b, a row that shows a person's name also needs profiles:view (A2's rule). The count shows as one line in Admin › Screening, with EN+AM keys, and the Amharic is listed key by key in the report (G43).
7. Tests (ids NCU-*, grep-checked free again at build):
   - NCU-1: one transaction. A door save writes the alias and the 'unchecked' row together; a save that cannot write the state saves nothing.
   - NCU-2: no direct clean. A person calling save_posting_identity directly ends with 'unchecked'. The same person calling name_check_mark is refused (deny), and nothing changed.
   - NCU-3: the route's three cases. A clean answer leaves the row 'clean'. `unavailable` leaves it 'unchecked'. A mark that fails leaves it 'unchecked', with the failure logged.
   - NCU-4: a changed alias resets the row to 'unchecked'; the same alias saved again leaves the state as it was.
   - NCU-5: name_check_mark with a stale p_text changes nothing.
   - NCU-6: the summary door returns the count and the oldest since, and a caller without listings:view is refused (deny).
   - A staff-assigned name is clean (in NCU-1's file or its own id).
   - E2E: one assertion in the existing admin-screening spec that staff see the count line. Both projects, whole file, 0 retries.
8. Migrations: M1 is one file with name_checks, the two door redeclarations (3a, 5), name_check_mark and admin_name_check_summary. If the file passes about 25 KB, split it by concern into M1a/M1b. The proofs create every row they read (scratch users and profiles) and roll back whole (INC-970). They RAISE EXCEPTION on failure. The closers go in the file, and EXPLAIN goes in the proof. The mark is chosen at apply time. Every new GRANT gets a scripts/public-surface-allowlist.txt line with its reason. Stop after the prod apply with "apply <fragment> → expect mark <value>".

STEP 0 (before the parts)
a. Save this ruling, unchanged, as docs/governance/briefs/foundations-turn-n1a.md (one fenced block, scripted copy). Set roadmap line 3 to name it.
b. Add the roadmap line for INC-974's K2 list: the other useCategoryTree readers (breadcrumbs, ad-crumbs, the feed, listing card and page, the posting wizard, my-listings, admin listings and screening, app-shell) still wait for the browser read at first paint. That goes with the speed work, not built now.
c. Split the INC-977 roadmap line into N1a (this turn) and N1b (open: the catch-up, its trigger, the queue, waiting on the operator's two choices).

FIVE LENSES (N1a)
- Security: no person can mark a name clean. The state is written by the door that saves the name, and the clean mark is service-only, after the door answered.
- Performance: one upsert on the save path.
- Failure modes: every failure leaves 'unchecked', never 'clean'.
- Consistency: one state table, written by the doors that save names.
- Future growth: subject takes the business name (D222) by a value.

REPORT: CI line first. Then each numbered item done or not done, the migration stop with the apply line, the whole unit suite count, the K2 list, the Amharic key by key, and the files from git diff --name-only 7e2006a7.
```
