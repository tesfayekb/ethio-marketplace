Source: supervisor thread, turn 1308, 1310, 1316, Sun 2026-10-04 02:52 New York.
Status at 2026-10-04: built: M5 (20261004144146_923dd4cb) and M5b applied on ethio-prod and ethio-staging on 2026-10-04; timings accepted in turn 1318 (worst total 3.97 ms against the 50 ms target); step 23's save rule built in Part F.
Related: bundle 4, M5, M5b, DEC-109 to DEC-113, DEC-117, INC-424, PR-23, PR-24, PW-133.

Censuses accepted. Step 24's limitation: measuring inside M5 is accepted, with two conditions.

1. What is timed. check_seller_alias needs a signed-in caller, so time the functions it calls: alias_rule and alias_taken, for abebe_phones, telebirr1 and selam_telebirr1. Ten runs each with clock_timestamp(), the median printed by RAISE NOTICE. "Before" is timed in the same file ahead of the redeclarations, against the live functions; "after" once name_folds is built and the new functions are in place. EXPLAIN is dropped.

2. The target stands: 50 ms or less for alias_rule plus alias_taken on each of the three names, after. Paste the six before and six after medians in the M5 stop report. If "after" misses the target, do not stop for it: paste a per-function split (alias_rule alone, alias_taken alone, the name_folds lookups alone) and say where the time goes.

Step 9's census (the only path carrying the whole list) is not in the census file; it is owed in the A and B turn, before that screen is edited.

Continue: write M5, run the red-first tests of steps 16, 22 and 23 against staging, apply on ethio-prod, and stop with "apply <fragment> → expect mark <value>" and the tests you expect red.

<!-- extractor: next part is from turn 1310, Sun 2026-10-04 03:14 New York -->

Both choices accepted.

1. Name kinds: add name_latin and name_am to name_folds so business_name_rule's verdicts stay exactly as they are. The business rows of M2, M4 and M4b are among the repeated ASSERTs.

2. Edits: an unnamed seller, or one with an unconfirmed home country, is refused on editing a live ad with the same fields as on publish. Say so in docs/features/posting.md in Part H.

The three red-first tests (PR-23, PR-24, PW-133) now sit in the repository, so CI is red on them from this commit until M5 is on staging. Name them in the stop report with the other tests you expect red.

Continue: write M5, paste the "Self-marking guard OK" line before applying, apply on ethio-prod, and stop with "apply <fragment> → expect mark <value>".

<!-- extractor: next part is from turn 1316, Sun 2026-10-04 11:12 New York -->

M5 and M5b reviewed from the files: accepted. Rulings for the next turns.

1. NEXT TURN = the screens of Parts A and B, in one turn, with step 9's census first and every test that names a step by number moved in that turn (brief step 4). CI run 37210551317 is red across the wizard specs because the old screens meet the new door; that is the expected window, and this turn closes it. Do not spend the turn rerunning PW-118, PW-48 and PW-11 in isolation: CI on the A and B commit is their proof.

2. The 429s. Name one from the trace in one line: the URL and the response body. The app itself answers 429 only in /api/catalog/find and the import preview limit. If it is one of those, say which test drove it; if it is the auth service, say so. No fix until it is named.

3. Step 23, to finish in the Part F turn: leaving the contact step makes an identity call every time, and two when the name also changed; the identity dial is 20 a day. Make it: no call when neither the name nor the channels differ from what the profile holds; one call carrying both when both changed. Test: two passes through the step with nothing changed make no identity call (count the requests).

4. Timings. Paste the medians M5 stored (audit_log, action migration.m5_timing), before and after, for the three names. The target stands: 50 ms or less for alias_rule plus alias_taken, after.

5. For M6:
   - The mark. M5's mark went stale while the approval dialog waited. State the guard's rule on mark against filename stamp (scripts/check-migrations.sh) and choose M6's mark so that an approval delayed by twelve hours still passes.
   - The proof block uses no real account. M5's block borrowed the oldest account again (rolled back, nothing kept). Where M6 needs a caller, create a scratch user inside the rolled-back block.

6. Order from here: A and B → C → D → E → F (with item 3) → M6 → stop → Part G screens → Part H.
