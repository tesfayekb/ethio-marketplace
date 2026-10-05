Source: supervisor thread, turn 1196, 1200, 1212, 1214, 1220, 1222, 1224, 1226, 1228, 1238, Fri 2026-10-02 19:11 to Sat 2026-10-03 14:57 New York.
Status at 2026-10-04: built: bundle 2 closed at dev = main = befaca37 (CI run 37150648979 green; migrations 7423f49a with marks 20261003000000 and 20261003005802, and the corrective 5c25e616 with mark 20261003030000, on ethio-prod and ethio-staging); walked by the operator on 2026-10-03 16:56 (nine lines, all yes).
Related: bundle 2, DEC-105, INC-387, INC-389, INC-390, INC-391, INC-392, INC-393, PW-83, PW-111 to PW-122, CT-34.

Rulings on your last three reports, then continue.

- Step 18: keep the fallback, but never silently. When the model's answer is off the allowlist, empty or not a name, the route still returns the fallback icon and adds fallback: true; a listed answer returns fallback: false. The admin editor shows a one-line note with a fallback answer ("No suggestion found; the default icon is shown"), in en and am. One route-level test for both cases. Scope for this: src/routes/api/admin/categories/suggest-icon.ts, src/server/category-images/icons.ts, the editor control that shows the suggestion in src/features/admin-categories/**, and its two keys.
- PW-98 and PW-99: the changed checks are accepted. The layout rules changed by operator ruling and you showed both red on the old layout.
- PW-110 as a screen-level test: accepted, since staging's plan allows one city and no add control shows there.
- Step 12's test: accepted without a red run; the heading landed first.
- PW-111: red-first is still owed. Show it failing once against the pre-change contact step, then passing, and paste both lines in the final report.

Continue. Do not stop after one step: work through as many steps as your turn allows, and stop only when the turn is about to end.

<!-- extractor: next part is from turn 1200, Fri 2026-10-02 19:41 New York -->

Step 15: accepted. Two tests are owed for it, with the others at the end:
(a) a draft that already has its own number is not overwritten;
(b) another seller's ACTIVE post with a shown phone is never carried into a new seller's post (the INC-330 deny case, DB truth).

NEW ORDER, to end the one-step turns. Read docs/governance/briefs/bundle-2.md first, as always.

NEXT TURN — the one migration, and nothing else. No app code and no browser test this turn.
1. Step 11 census first, read-only: how the door counts a listing's places against the plan, and whether several sub-cities of one city already count once. State it.
2. Write the one migration with every database part of the brief:
   - step 2: attr_contact_like under R1–R6, every row of the two lists an ASSERT;
   - step 3: validate_listing_attributes checks Other write-ins;
   - step 4: validate_listing_draft checks the title and the description;
   - step 5: the location details and directions keep contactInNote under the new rule;
   - step 6: the sweep every 5 minutes;
   - step 10: listings.directions, and set_listing_pin with p_directions;
   - step 11: the places door, only if the census says it must change;
   - step 14: listing_contact_refusals with phone2;
   - step 17: categories_capabilities_check and cat_import_plan with own_place (DEC-105);
   - step 19: attr_option_shape at 150.
   The brief's section THE MIGRATION governs: whole redeclarations from live with the bases named, in-file closers, the DO-block proofs, the mark last.
3. Apply it on ethio-prod and paste the read-back. Regenerate src/integrations/supabase/types.ts in the same turn. End the turn with "apply <fragment> → expect mark <value>" so the operator can apply it on staging.
4. Checks this turn: typecheck, lint, unit tests, format check. CI's migration-parity check stays red until the operator applies the migration on staging; that is expected, and say so in one line.

AFTER the operator confirms staging — the app sides and the tests, in as few turns as you can:
- steps 5, 10, 11, 14 and 16, then every owed test (steps 3, 4, 5, 10, 11, 14, 15, 16, 17);
- run the browser tests once per turn, at the end of the turn, for everything built in it; do the red-first runs together, one per test, as you did for PW-111;
- then the end-of-bundle DEC-023 run and the full report.

<!-- extractor: next part is from turn 1212, Fri 2026-10-02 20:47 New York -->

Continue, with one ruling: NO DROPS for the fix.

The 42P13 error means the new text left out argument defaults that the live
functions have. Do not drop and re-create. Re-declare with CREATE OR REPLACE
and keep every argument name, order, type and DEFAULT exactly as live:

- validate_listing_attributes(p_category_id uuid, p_attrs jsonb,
  p_prior jsonb DEFAULT NULL, p_defer_keys text[] DEFAULT NULL)
  (a35e45fa, line 94)
- validate_listing_draft(... p_price_bp integer DEFAULT NULL,
  p_price_negotiable boolean DEFAULT false)   (13cb1b22, lines 19-37)

Why: callers depend on those defaults (validate_listing_draft calls the
attribute check at 13cb1b22:101; the a35e45fa proofs call it with two
arguments), and a dropped SECURITY DEFINER function comes back executable by
PUBLIC until its REVOKE runs. CREATE OR REPLACE keeps the existing grants.

DROP is used only where the argument list really changes: set_listing_pin
(new p_directions with DEFAULT NULL, old signature dropped, REVOKE/GRANT
restated beside it), as you already do.

Before applying:
1. For each of the seven functions, read pg_get_function_arguments on
   ethio-prod and compare it with your new header. Paste the seven pairs.
   Any difference other than set_listing_pin's new argument is fixed first.

In the proofs DO block, add:
2. validate_listing_attributes called with two arguments still works.
3. validate_listing_draft called without its last two arguments still works.
4. The grants of all seven functions read back: no EXECUTE for PUBLIC or
   anon where there was none before.

Step 11: accepted, no database change (13cb1b22:321 already counts
coalesce(city_id, id)).

Then, as planned: apply on ethio-prod, paste the read-back, regenerate
types.ts, run typecheck, lint, unit tests and the format check, and end with
"apply <fragment> -> expect mark 20261003000000".

<!-- extractor: next part is from turn 1214, Fri 2026-10-02 21:19 New York -->

BUNDLE 2 — CORRECTIVE for migration 7423f49a. Do only this, then report.
Read docs/governance/briefs/bundle-2.md first, as every turn.

SCOPE: one new migration; scripts/migration-mark-allowlist.txt (one line added);
docs/_changelog.md (one line). No function is redeclared. 7423f49a is not edited.
No app code, no tests, no other docs this turn.

DEFECT A — 7423f49a declares mark 20261003000000, which precedes its filename
stamp 20261003005802. The self-marking guard is red on 47f96141.

DEFECT B — the redeclarations in 7423f49a changed the volatility of six functions
without saying so. Last declaration before it -> 7423f49a:
  attr_contact_like            IMMUTABLE (a35e45fa:38)  -> STABLE
  validate_listing_attributes  STABLE    (a35e45fa:97)  -> none, so VOLATILE
  validate_listing_draft       STABLE    (13cb1b22:40)  -> none, so VOLATILE
  listing_contact_refusals     IMMUTABLE (9add760c:263) -> STABLE
  attr_option_shape            IMMUTABLE (ff92c5b8:40)  -> STABLE
  cat_import_plan              STABLE    (8d182773:9)   -> none, so VOLATILE
If any of the six was changed on purpose, say which and why BEFORE applying and
leave that one out. Otherwise restore all six.

1. CENSUS (read-only, paste it), on ethio-prod:
   SELECT proname, provolatile FROM pg_proc
    WHERE pronamespace = 'public'::regnamespace
      AND proname IN ('attr_contact_like','validate_listing_attributes',
          'validate_listing_draft','set_listing_pin','listing_contact_refusals',
          'attr_option_shape','cat_import_plan') ORDER BY 1;

2. ONE migration, in this order:
   a. Six ALTER FUNCTION ... IMMUTABLE / STABLE statements restoring the values
      above. ALTER only, so no grant changes.
   b. INSERT INTO public.migration_marks (version) VALUES ('20261003005802')
      ON CONFLICT DO NOTHING;   -- the INC-321 healer pattern (20260928140742)
   c. One DO block that RAISEs EXCEPTION (not ASSERT) unless all of these hold:
      - provolatile reads i, s, s, i, i, s for the six, in the order listed
        above, and v for set_listing_pin;
      - ledger rows 20261003000000 and 20261003005802 both exist;
      - current_setting('plpgsql.check_asserts', true) is not 'off'.
   d. Last statement: this migration's own mark. Choose it when you apply: read
      SELECT now() AT TIME ZONE 'utc' on prod, round UP to the next full hour,
      add one hour. State the time you read and the mark you chose.

3. Add one line to scripts/migration-mark-allowlist.txt, in the file's format:
   20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql | bundle 2 declared
   mark 20261003000000, which precedes its filename stamp; the ledger row
   20261003005802 is recorded by the corrective | <this migration's filename stamp>

4. Apply on ethio-prod. Paste the provolatile read-back and the two ledger rows.

5. Run: bash scripts/check-migrations.sh, typecheck, lint, unit tests and the
   format check. Report only when all pass.

RULE for the rest of this bundle: a whole redeclaration keeps every header
attribute of the live function (volatility, SECURITY DEFINER or INVOKER,
search_path), and the pre-apply comparison reads provolatile, prosecdef and
proconfig beside the argument list.

REPORT: the census, the migration filename, the read-back, the checks, every
file changed, and end with: apply <fragment> -> expect mark <value>

<!-- extractor: next part is from turn 1220, Fri 2026-10-02 22:05 New York -->

Verified: 7423f49a and 5c25e616 are clean and staging has both. Continue with
the brief (docs/governance/briefs/bundle-2.md): the app side of steps 5, 10,
11, 14 and 16, then the owed tests for steps 3, 4, 5, 10, 11, 14, 15, 16 and
17, then the end-of-bundle run and the items owed under step 1.

One addition, from reading set_listing_pin in 7423f49a: a call that leaves out
p_directions clears listings.directions. So every call of set_listing_pin
passes the draft's current directions, and one test proves it: save
directions, then move the pin, and the directions are still there.

Do not stop after one step: work through as many steps as your turn allows,
and stop only when the turn is about to end. Run the browser tests once per
turn, not after every step. Report only on green.

<!-- extractor: next part is from turn 1222, Fri 2026-10-02 22:48 New York -->

Continue. One correction: the bundle 2 database change IS applied on ethio-prod
and ethio-staging (marks 20261003000000, 20261003005802 and 20261003030000), so
write step 17's test now.

Then, in this order: the test that directions survive a pin move, step 5 in the
browser, the failing-first runs for PW-113 to PW-121, the end-of-bundle run and
the items owed under step 1. Work through as many as your turn allows and
report only on green.

<!-- extractor: next part is from turn 1224, Sat 2026-10-03 10:35 New York -->

Ruling on CI-5: fix it in the test, as you propose.
Scope: e2e/admin-categories-images.spec.ts only.

- Cause: the poll at lines 269-283 reads category-bulk-progress with
  textContent() (lines 273-276). No actionTimeout is set, so it waits without
  limit for an element that is already gone when generation is fast. The dump
  at line 180 has the same unbounded read.
- Read the progress line without waiting: only when its locator count is above
  zero, and with a short timeout. Record what was seen in the trail. Remove the
  "progress-peak" assert (lines 285-287). Bound the read at line 180 as well.
- Assert what lasts: the summary shows "3 generated" and "0 failed", and each
  of the three rows has an image in the database.
- Update the test's header comment so it no longer says the caption is proven.
- Prove it: run CI-5 ten times in a row with e2e:local at 2 workers and paste
  the 10/10 line.

Then send the END OF BUNDLE report in the brief's form, with the full run's
totals after this fix. Use 2 workers for every run.

<!-- extractor: next part is from turn 1226, Sat 2026-10-03 12:09 New York -->

Two things before the END OF BUNDLE report. Read docs/governance/briefs/bundle-2.md first.

A. THE BACKGROUND RUN. When /tmp/bundle2-final-run.log finishes, name the two
   early failures and their cause. Do not write the END OF BUNDLE report yet:
   part B changes app code, so the final run comes after it.

B. WALK DEFECT (operator, published site). On the contact step the phone box
   is one dropdown showing the country name and code, with no way to type a
   number. PW-111, PW-112 and PW-114 passed anyway.
   Likely cause, to confirm on the rendered page before fixing: fieldClass
   carries w-full (step-who.tsx:68-70) and the picker adds w-28 beside it
   (phone-number-field.tsx, the select's className), so the select takes the
   whole row. Paste the computed widths of the picker and the number box at
   360 and at 1280.

   B1. Tests first: the walk outranks the green tests. Extend the phone tests
       so they see what the walk saw, and show them red on today's screen:
       - the number box is inside the viewport and at least 160 px wide, at
         360 and at 1280;
       - the picker is no wider than 120 px;
       - the number is entered by clicking the box and typing on the keyboard,
         not by fill().
   B2. The field, as the operator specified. One bordered group:
       [flag +code v] | [number].
       - Closed, the picker shows only the flag and the calling code. The flag
         is the emoji built from the ISO code; no image files.
       - Open, it is a searchable list in the pattern of the currency control
         (step-pricing.tsx:455-515): flag, country name in the UI language,
         code; open markets first; search by name or code; the same keyboard
         and screen-reader behaviour.
       - A thin divider, then the number box with its present validation and
         its reading of + and 00.
       - At 360, if the row cannot give the number box 160 px, the "show"
         switch moves to its own line.
       - It applies to Phone, the second phone and WhatsApp: one component.
   B3. Default country, for an empty box only: the country of the place marked
       "the item or service is here" on the place step; if none, the seller's
       home country; if none, the posting market. A typed, picked or carried
       number keeps its own country. Census first how the contact step learns
       that country, and state it.
   B4. "Add another phone" opens on the first phone's country.
   B5. Do not change what is saved (E.164), the door, or the price step.
       Extracting one shared picker for currency and country waits for the
       wizard bundle; say so in the report.

   Scope for B: src/features/posting/phone-number-field.tsx, step-who.tsx,
   wizard.tsx (only to pass the item place's country), calling-codes.ts and
   its test, the en and am locale files, e2e/post-wizard-place.spec.ts,
   e2e/post-wizard-bundle2.spec.ts, docs/features/posting.md,
   docs/_changelog.md, roadmap.md. Anything else: say why before touching it.

C. Then the END OF BUNDLE run at 2 workers and the report in the brief's form.
   Report only on green.

<!-- extractor: next part is from turn 1228, Sat 2026-10-03 12:26 New York -->

**Compared with the standard**

The most used phone-input component (intl-tel-input) and the usual design advice agree on this pattern:

| Standard practice | Ours now |
|---|---|
| Flag and code picker, separate from the number | Yes |
| Country chosen automatically, changeable | Yes |
| Any typed format accepted, international format saved | Yes |
| Example number shown for the chosen country | No |
| Per-country check of the number | No |
| Number grouped automatically as typed | No |

I am adding the example number and a length hint. That library's checking script is about 260 KB, which is too heavy for us, so ours will read a small built-in table instead. I am leaving automatic grouping out for now, because it adds complexity for little gain.

**Your other points**

- **Sub-cities:** today "Add sub-city" opens a second city box for the same city. The fix draws one city box with a sub-city box for each sub-city inside it.
- **Already-chosen places:** pickers will leave them out, and each Add button disappears when nothing is left. This applies at every level, countries included.
- **Post another ad:** a second button on the "In review" screen, opening a fresh first step.
- **Requesting a new place, and structured messages to admin:** I have recorded this as a future task with its own short spec. It takes typed text from users into an admin page, so it needs limits and screening. I would build it after the wizard bundle; the Contact us page would use the same inbox.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

BUNDLE 2 — WALK ROUND 2. Do these before the END OF BUNDLE run.
Read docs/governance/briefs/bundle-2.md first.

Accepted from your last turn: the phone field (B1-B5), PW-122, and
readPlaceCountry in posting-service.ts (a read of the public locations table;
it stays). The lost background log is accepted; the final run stands in for it.

Census first, one line each, before editing: how rows become city boxes today
(step-where.tsx:356-500), where each picker's option list is built, and what
the in-review screen offers (step-review.tsx:300-320).

W1. SUB-CITIES LIVE INSIDE ONE CITY BOX (walk line 7).
    Today "Add sub-city" adds a second city box with the same city. The rule:
    one city box per city. Inside it: the city picker, then ONE SUB-CITY BOX
    per chosen sub-city (its picker, its "the item or service is here" tick,
    its Remove), then "Add sub-city" inside the city box and outside the
    sub-city boxes.
    - The saved data does not change: one place per row, the same order rules,
      the same door. Only the drawing groups rows that share a city.
    - A city with no sub-cities, or with "All of <city>" chosen, keeps its
      tick and Remove on the city box as today.
    - At 360 every picker keeps the 200 px rule.

W2. A PICKER NEVER OFFERS WHAT IS ALREADY CHOSEN, AND "ADD" HIDES WHEN NOTHING
    IS LEFT (walk line 7). One rule at every level:
    - Region pickers leave out regions chosen in the country's other region
      boxes; city pickers leave out cities chosen in the region's other city
      boxes; sub-city pickers leave out sub-cities chosen in the same city.
      Country pickers already do this (takenCountries). A box's own current
      value always stays in its list.
    - "Add region", "Add city", "Add sub-city" and "Add country" are not drawn
      when nothing is left to add at that level, as well as when the plan has
      no room.

W3. "POST ANOTHER AD" (walk line 12). The in-review screen (data-testid
    post-in-review) gains a second button, "Post another ad", which opens a
    fresh post at step 1 with no draft carried. The existing button stays.

W4. PHONE FIELD, two additions from the common standard:
    - An example number for the chosen country as the number box's
      placeholder.
    - A length hint: when the digits typed are outside the usual national
      length for the chosen country, a line under the box says so. It is a
      hint: it blocks nothing, and the door and the saved format do not change.
    - Both read one small static table (per country: shortest and longest
      national number, one example), committed with its source and version in
      the header. Do not ship a phone library and do not add a package to
      package.json. If you cannot build the table without that, stop and say so.

TESTS, failing first on today's screen, then passing, at 360 and 1280:
    - W1: two sub-cities of one city draw ONE city box holding two sub-city
      boxes; both save; the tick can sit on either. PW-117 is updated to this
      drawing.
    - W2: in a scratch region holding two cities, the second city box's picker
      does not list the first city, and once both are chosen "Add city" is
      gone; the same for regions and for sub-cities. Scratch places only (J3).
    - W3: after Publish, "Post another ad" opens step 1 with an empty draft.
    - W4: unit tests for the table reader; one browser test that the
      placeholder changes with the country, and that the hint shows for a
      short number and clears for a full one.

SCOPE: src/features/posting/step-where.tsx and its test, step-review.tsx,
phone-number-field.tsx, calling-codes.ts and its test (or one new table file
beside it), step-who.tsx, the en and am locale files and the two usage maps,
e2e/post-wizard-bundle2.spec.ts, e2e/post-wizard-place.spec.ts,
e2e/post-wizard-where.spec.ts, docs/features/posting.md, docs/_changelog.md,
roadmap.md. Anything else: say why BEFORE touching it.

THEN the END OF BUNDLE run at 2 workers and the report in the brief's form.
If the run cannot finish inside one turn, start it, say so, and finish it on
"continue". Report only on green.

<!-- extractor: next part is from turn 1238, Sat 2026-10-03 14:57 New York -->

Three rulings. Read docs/governance/briefs/bundle-2.md first.

1. CI IS RED on e866aad1 (run 37139084952). PW-83 fails on mobile-360 (shard 3)
   and desktop-1280 (shard 6): "PW-83: a lone city offered Remove", one
   post-where-remove where none is expected. Everything else passed (1,142).
   Cause: in sub mode every sub-city box passes a Remove to tickLine
   (step-where.tsx:553-557, the `single ? ... : ...` argument), so a post with
   ONE place now offers Remove. The W6b-1 R3 rule stands: Remove shows only
   while the step holds more than one place. My W1 text said "its Remove"
   without restating that; the older rule wins.
   Fix: in a sub-city box, Remove is drawn only when canRemove is true, and it
   removes that place (onRemove(row.key)), as Remove does everywhere else. A
   lone sub-city is undone through its picker's "All of <city>" option.
   Tests: PW-83 stays as written and passes. PW-117 gains two checks: with two
   sub-city boxes, Remove on one leaves the other saved; with one place, no
   Remove is drawn.

2. AFTER CHANGING A SCREEN, RUN EVERY SPEC THAT EXERCISES IT, not only the new
   tests. For the place step that is post-wizard-where, post-wizard-place and
   post-wizard-bundle2. PW-83 would have shown red locally.

3. THE END-OF-BUNDLE RUN IS THE BRIEF'S LIST, NOT ALL 50 SPEC FILES. Stop the
   1,022-test run. The brief names: every post-wizard-* spec, posting-routes,
   category-image-routes and a11y, on both projects, 2 workers. Run it in
   parts that each finish inside one turn, for example:
     part 1: post-wizard-where, post-wizard-place, post-wizard-bundle2
     part 2: post-wizard-specs, post-wizard-details, post-wizard-resets,
             post-wizard-finder
     part 3: post-wizard-category, post-wizard-pricing
     part 4: posting-routes, category-image-routes, a11y
   Paste each part's totals line and its "transport retries" line in your
   reply BEFORE the turn ends; results do not survive the turn. A part cut off
   by the turn is rerun, not guessed.
   The full-suite proof is CI on the final commit; the supervisor reads it.
   The three early failures you saw locally (A11Y-2, AT-14, CT-1 at 360) all
   passed in CI on e866aad1, so do not chase them unless a part repeats them.

Accepted from your last report: W1-W4 as built; the phone table
(phone-plans.ts, source and version in its header); W2 proved in the browser
at the sub-city level and by screen-level tests for city and region.

Order: fix 1 with its tests, then part 1, then parts 2-4, then typecheck,
whole-project lint, unit and component tests and the whole-tree format check,
then the END OF BUNDLE report in the brief's form. Report only on green.
Scope for the fix: src/features/posting/step-where.tsx and its test,
e2e/post-wizard-bundle2.spec.ts, docs/_changelog.md, roadmap.md.
