STOP — f1-doors-7a STEP 1: more than about forty bodies would be redeclared (stop (e)); the cut by class proposed
DONE: STEP 0, STEP 1 (the census, `docs/governance/reports/f1-doors-7a.census.md`)
LEFT: STEP 2 (the migration and its stop); STEPS 3–7 (the next chat)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `470135181dc85182ef3df38a40ed47422093d438` (short `4701351`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-19T12:18:15Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44521459021
FILES:
docs/governance/briefs/f1-doors-7a.md
docs/governance/reports/f1-doors-7a.census.md
docs/governance/reports/f1-doors-7a.stop-1.md
roadmap.md

## Why this stops

The brief's STEP 1, stop (e): "more than about forty bodies would be redeclared — then propose the cut by class and stop
for the ruling." A full build of the family as the census classifies it redeclares 43 existing bodies:

| group | bodies |
|---|---|
| the shell: `door_context`, `door_refused` | 2 |
| (a) signed-in readers: `impersonated_get_profile`, `impersonated_list_listings`, `listing_counts`, `listing_history`, `my_last_listing_private`, `my_legal_history`, `my_legal_status`, `my_legal_version`, `my_listing`, `my_listing_certification`, `my_listing_private`, `my_listings`, `my_recent_categories`, `my_saved_listings`, `my_seller_line`, `my_seller_place`, `my_viewing_location` | 17 |
| (a) public readers: `get_entity_bundle`, `get_ui_bundle_parts`, `legal_in_force`, `legal_scheduled` | 4 |
| (b) readers onto the gate: `get_attribute_options_version`, `sold_visible_days`, `listing_contact_refusals`, `price_unit_labels`, `translation_scope_ok` | 5 |
| (b) SQL callers moved onto the cores: `get_attribute_options`; `sold_cutoff`; `save_posting_identity`, `validate_listing_draft` (22,679 B, computed); `public_listing_json` (13,479 B, computed); the ten translation callers (about 22 KB together) | 15 |
| **total** | **43** |

Besides those, a full build adds 6 new functions (5 cores and the viewer's-state reader), drops `listing_saved(text)`,
and changes grants only for 47 functions (2 helpers keep theirs by policy, 7 readers are narrowed to `anon`, 38 are
closed to the browser roles). No other stop applies; the census's last section says why for (a) to (d).

The three heavy (b) readers alone make 16 of the 43 bodies (3 readers + 13 callers). Two of those callers are the
computed giants (`validate_listing_draft`, `public_listing_json`), each a whole-body redeclaration with its own md5
guard, for a one-word change (the callee's name).

## The cut by class, proposed (Decision 1)

- **A (proposed).** F1-7a builds the shell (2), every (a) reader (21), the viewer's-state reader (new, replacing
  `listing_saved`), and the two light (b) readers with their one caller each: `get_attribute_options_version`
  (+ `get_attribute_options`) and `sold_visible_days` (+ `sold_cutoff`). That is **27 redeclared, 3 new**. It also does
  every grant-only class: (c) `has_permission` and `sold_cutoff` become `helper` lines with their policies, the 7 (d)
  readers lose `authenticated`, and the 38 (e) functions (7 readers and all 31 helpers) are closed by DEC-407's form.
  The three heavy (b) readers (`listing_contact_refusals` with `save_posting_identity` and `validate_listing_draft`;
  `price_unit_labels` with `public_listing_json`; `translation_scope_ok` with its ten callers: 16 bodies) go to their own
  part, F1-7a2, before F1-7b. F1-7b already meets the translation doors (the translation right named by a refused
  commit), so `translation_scope_ok` could instead ride with F1-7b.
- **B.** F1-7a builds the shell, the (a) readers, the viewer's state and every grant-only class; all five (b) readers
  go to the next part. That is **23 redeclared, 1 new**.
- **C.** The whole family in this turn: 43 redeclared. The ruling would have to lift the bar.

Under A or B, the (b) readers left behind keep their manifest lines off the gate with the reason word of Decision 9
(`deferred F1-7a2`), so check-doors stays green between the parts.

## Decisions for the supervisor (numbered)

1. The cut: A, B or C (above).
2. `translation_scope_ok`'s cell. The manifest says `staff-reader`, `translations:manage`, `global`. The body answers
   `has_permission(…, 'translations', 'manage')` OR "the caller holds a `translator_languages` row for the language".
   Its one browser caller is `src/routes/api/translate.ts:105`, which is gated on `translations:machine`. A gate that
   demands `translations:manage` would refuse a translator who has only the machine right and the language, and that
   person passes today. Proposed: `signed-in-reader`, cell `-`, `door_context('reader')`, the body's own check kept byte
   for byte.
3. `listing_contact_refusals` is SECURITY INVOKER, and `door_context` is closed to `authenticated`, so an INVOKER reader
   cannot call the gate. Proposed: the new closed core keeps the INVOKER body and header; the reader that keeps the name
   becomes SECURITY DEFINER (a header change the brief's "every header attribute kept" would otherwise forbid).
4. The four public (a) readers (`get_entity_bundle`, `get_ui_bundle_parts`, `legal_in_force`, `legal_scheduled`) are
   called with the person's token whenever a session exists (`src/lib/supabase-door.ts:309`). `door_context('public')`
   refuses a signed-in deactivated caller with `accountDeactivated`, so that session's UI-string bundle and legal texts
   would be refused until `useAuth` signs it out (`src/features/auth/use-auth.ts:92-99`). Proposed: accept it, as the
   brief's lens asks for every (a) reader. Or rule the public form of these four to skip the deactivation check (a
   change to `door_context` this brief does not name).
5. `legal_in_force` / `legal_scheduled` raise `'permission denied'` with SQLSTATE 42501 for a signed-in-only kind when
   the caller is signed out. Proposed: `door_refuse('notSignedIn')`. `src/lib/reader-failure.ts` must then class
   `notSignedIn` (and SQLSTATE `P0D01`) as `auth`, as it classes 42501 today. AP-20's pattern becomes `notSignedIn`.
6. `impersonation_target` is class (e), so its body is not touched and its sentence `'impersonation session expired'`
   still reaches the two impersonation readers' callers (`impersonation-service.ts:138` reads it). Proposed: leave that
   sentence for F1-7b.
7. Every one of the 31 helpers is class (e). No policy, view, default, index or cron job names any of them. Every caller
   is a DEFINER body, an INVOKER core with no browser grant, or a trigger or CHECK on a table no browser role may write.
   The two quoted calls under `e2e/` use the service client, which keeps its grant. INC-1162's class is the whole list.
   Proposed: close all 31 in this turn (grant-only; 14 of them hold a public-surface line, which becomes RETIRED, and 17 hold none).
8. The (d) readers (`feed_page`, `get_category_tree_version`, `get_location_tree`, `get_location_tree_version`,
   `get_open_countries`, `get_ui_bundle_version`, `seller_feed_page`): `authenticated` is revoked, while `anon` and
   `service_role` stay as each holds them today. No route uses `authenticated` for them: an `anon` route always uses
   `anonymousClient()` (`src/server/route.ts:211-212`), and the screening spec's `buyer()` has no session.
9. The manifest's mark for a reader that keeps its body off the gate: a reason word the checker reads, with its planted
   case in `scripts/doors/check-doors.test.ts`. Proposed: `anonymous-route <route file>` for (d), and
   `deferred <part>` for a (b) reader the cut leaves behind (expiring with that part).
10. The codes the sentences become, from codes that already exist (`door-codes.ts` does not grow):
    - `'not authenticated'` and `'not signed in'` become the gate's `notSignedIn`.
    - `'not your listing'` becomes `notYourListing`.
    - `'notYours'` stays `notYours`.
    - `'unknown group'`, `'bad page'`, `'bad search'`, `'unknown mark'` and `my_saved_listings`'s `badCursor` become
      `badValue:group`, `badValue:page`, `badValue:search`, `badValue:mark` and `badValue:cursor`.
    - `my_saved_listings: badSize` becomes `badSize`.
11. The cost bar. Ruling 1 says 0.1 ms; DEC-345 (F1-1 ruling 7 §1) made it a 5 ms tripwire. Measured medians on the
    local stack: reader 0.008 ms, public 0.004 to 0.008 ms, staff-reader 0.080 ms. Every class is under both bars, so
    no ruling is needed unless the supervisor wants the bar restated.
12. The viewer's-state reader. Proposed: `listing_viewer_state(p_public_id text)` returns
    `jsonb {saved: boolean, owner: boolean}`, class `signed-in-reader`, STABLE DEFINER, `door_context('reader')` first.
    `listing_saved(text)` is dropped in the same file, with the grants restated on the new function, and the types patch
    comes from the supervisor. The census confirms the callers: `src/features/ad-page/save.ts:47` and
    `src/routes/l.$slug.tsx`.

## New English strings

None proposed. Every code above already has its words, or draws the generic line, in the screens that read it today.
