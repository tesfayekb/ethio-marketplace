# Bundle 2 — consolidated brief (2026-10-02)

````text
BUNDLE 2 — CONSOLIDATED BRIEF (2026-10-02). This replaces the earlier brief, its addendum and the DEC-105 ruling, and contains all three.

STEP 0 — keep this brief (INC-388: a brief that arrives as an attachment is not readable on later turns)
- Before anything else, save the full text of this brief, unchanged, as docs/governance/briefs/bundle-2.md, inside one fenced text block so the formatter leaves it alone. Name that path in the bundle 2 section of roadmap.md.
- On every later turn, read that file first.

STATE, so nothing is redone
- Landed: the heading "Item / service location (Optional)". Its test is still owed (step 12).
- Nothing else is built and no SQL exists. Write the one migration from the live definitions you read (attr_contact_like, attr_option_shape, cat_import_plan, validate_listing_attributes, validate_listing_draft).

One migration. Tier A for the doors. Work through the whole bundle; if your turn must end, stop at a clean green point, say in three lines what is done and what is left, and the operator sends "continue". One full report at the end.

PART 0 — owed from the DEC-103/104 turn
1. Read the finished DEC-023 log: the totals, the "transport retries this run" line, and why CI-5 failed on desktop-1280 with GEMINI_FAKE=1 set. Fix it only if the cause is the e2e:local command; otherwise report it.

PART R — the phone rule (INC-382) and where it applies (REQ-007)
2. attr_contact_like(text), redeclared. A "run" is digits joined by at most two of these between digits: space, dot, hyphen, round bracket; a leading + belongs to the run. D is the run's digit count; a group is an unbroken string of digits. A text matches when:
   R1 a run starts with + and D is 8 or more;
   R2 a run's first digit is 0 and D is 9 to 15;
   R3 a group has 10 or more digits, or exactly 9 digits starting with 7 or 9;
   R4 D is 9, the first digit is 7 or 9, and every group has at least 2 digits;
   R5 the groups are 3-3-4, or 1-3-3-4 starting with 1;
   R6 the text holds an e-mail address, or a t.me/ or wa.me/ link.
   Nothing else matches.
   MUST MATCH: "+251 911 234 567" · "+251911234567" · "0911 23 45 67" · "0911234567" · "911234567" · "911 234 567" · "91 123 4567" · "09 11 23 45 67" · "251911234567" · "00251911234567" · "call 0911-234567" · "0911.23.45.67" · "(404) 555-1234" · "404.555.1234" · "+1 404 555 1234" · "abebe@example.com" · "t.me/abebe_shop" · "wa.me/251911234567"
   MUST NOT MATCH: "Sizes 42 43 44 45" · "Sizes 38 39 40 41 42 43" · "Sizes 90 92 94 96 98" · "Corolla 2008 1300cc" · "Bole Road, House 1234, 3rd floor" · "Model 320D" · "2015 2016 2017 models" · "was 150000 now 120000" · "150000000 birr" · "2023 12000 km" · "120 x 60 x 75 cm" · "Plot 25, Block 14, House 1234" · "1,500,000" · "ISBN 978-99944-0-000-0" · "Yeka, woreda 12, house 456" · "500 ETB per kg, minimum 10 kg"
   The two lists are the judge: every row is an ASSERT in the migration and a case in the unit test of src/features/posting/contact-like.ts, the one client mirror.
3. Other write-ins: validate_listing_attributes checks the write-in text of a single and a multi-choice Other with the same rule, reason contactInText at that attribute. The client flags it as typed.
4. Title and description: validate_listing_draft refuses either when it matches, reason contactInText, field title or description. The client flags each as typed with the door's text.
5. Location details and the new directions line (step 10) keep contactInNote under the new rule.

PART S — the sweep
6. The cron job catalog-find-sweep runs every 5 minutes ('*/5 * * * *'). The heartbeat row proves it.

PART P — the place step (operator walks, 2026-10-01 and 2026-10-02)
7. P1: each region is its own box inside its country box, and each city is its own box inside its region box.
8. P2: "Add city" sits inside the region box below its city boxes; "Add region" inside the country box below its region boxes; "Add country" below the country boxes. No add control sits inside a box it adds a sibling of.
9. P3: in a city box, the "the item or service is here" marker is on its own lower line with Remove at the end of that line. The indent steps evenly: country, region, city.
10. P4: Directions, a new optional line the seller types (suite, floor, landmark), above the location details. Column listings.directions: text, at most 200, sanitised as street_address is, refused with contactInNote. set_listing_pin is redeclared whole with p_directions; a directions line without a pin is kept, as the note is. Buyers see it above the location details in preview and detail. The reverse geocoder never writes it.
11. P5: sub-cities sit one indent further under their city, and a seller may choose several under one city. Census first, in your report: how a sub-city is chosen and how the door counts places against the plan today. After: several sub-cities of one city count as that one city. If the door counts otherwise, name the function and change it in this migration.
12. P6: the location is optional and says so. The heading is landed. Nothing in the "Item / service location" box is ever red, starred or required, with or without a carried pin, and Next never waits for it. One test.

PART Q — contact and what a new post carries over (operator walk, 2026-10-02)
13. Q1: Phone and WhatsApp get a country picker in front of the number.
   - The picker shows the country name in the UI language and its calling code. Names come from Intl.DisplayNames (fallback: the ISO code), never a hardcoded list. Codes come from one static table in src/features/posting/, loaded with this step only. No new dependency; the first-paint and weight guards stay green.
   - Order: the open markets first, then the rest A to Z by the shown name.
   - It starts on the seller's home country from the profile, else the posting market's country.
   - The number box accepts digits with spaces, dots, hyphens and brackets. Separators and leading zeros are removed, and the value saved is "+" code digits. The door's rule (^\+[0-9]{7,15}$) does not change.
   - A number typed or pasted with + or 00 moves the picker to the longest matching code. Where several countries share a code, the seller's current country is kept if it has that code.
   - A saved value reopens split the same way. The hint names no country's number.
14. Q2: an optional second phone. "Add another phone" reveals it; it is stored as contact_pref.phone2 {show, value} under the phone rule. listing_contact_refusals is redeclared whole with phone2 allowed; any other unknown key is still refused. It shows wherever the phone shows, behind the same wall.
15. Q3: a new post's contact step opens with the channels of the seller's last post, values and show switches, editable, with a line saying where they came from. "Last post" is read as readLastListingPlaces reads it: the seller's own, past the draft stage (INC-330). The carried values are written to the draft when the step first opens, so a seller who changes nothing still publishes with them.
16. Q4: the pin carries over, per category.
   - When the place step prefills the last post's places and the draft has no pin, directions or details of its own, it also carries the last post's pin (lat, lng, precision, zoom), directions and location details, while the item place equals the last post's item place.
   - It carries them only when the new post's category does NOT hold the capability own_place. A category with own_place never carries them: each of its listings has its own place (a house, a plot).
   - A line says "From your last post", with Change and Remove.
   - If the seller ticks a different item place, removes the place, or changes the category to one with own_place, the carried pin, directions and details are cleared from the draft. A pin the seller set on this draft stays.
   - A draft with its own pin is never overwritten. A last post with no pin carries none.
   - This supersedes the 2026-09-29 line "the next post prefills the places, no pin".
17. Q5: the capability own_place (DEC-105, approved).
   - Replace the table rule in the one migration: DROP CONSTRAINT IF EXISTS categories_capabilities_check, then ADD CONSTRAINT categories_capabilities_check CHECK (capabilities <@ ARRAY['bookable','map_pin','own_place']::text[]). It only widens the allowed set: every existing row stays valid and no row is changed.
   - cat_import_plan is redeclared whole from live with own_place in its list; badCapability still refuses anything else. Its run rights are restated in the same file.
   - Your census stands: the admin editor has no capability control, and the export and the import cell carry the token as text. No change there.
   - The migration changes no category row. The curator sets own_place on the property leaves through a categories file after this bundle is live.
   - Tests: with a scratch category holding own_place the pin is not carried; without it, it is; an unknown token is still refused by the import.

PART U — two small fixes
18. INC-387: suggest icon sends the allowlist in a form the model accepts (the names in the prompt text, not a schema list of 136). The server still validates the answer against the allowlist and refuses anything else. Proof, pasted: with the stand-in off, one real call returns an allowlisted name. CI-3 is unchanged.
19. attr_option_shape: the ceiling on an option's allowed list rises from 50 to 150 (migration ff92c5b8:147). Proof in the migration: 150 accepted, 151 refused as allowedTooMany.

THE MIGRATION
- One file. Every function is redeclared whole from the live definition, with its base named in the header: attr_contact_like, validate_listing_attributes, validate_listing_draft, set_listing_pin, listing_contact_refusals, attr_option_shape, cat_import_plan, and the places door if step 11 needs it.
- In-file closers: each function's REVOKE and GRANT beside it; the proofs in one DO block that removes its own rows; the mark as the last statement.
- Proofs in the DO block, beside those named above: a scratch category saved with own_place is accepted by the table; 'bookable|fly' is still refused by the planner as badCapability; a direct write of an unknown token is still refused by the table rule.
- Additive only, apart from replacing the set_listing_pin signature as a35e45fa did and widening the capability rule (DEC-105).
- Apply it on ethio-prod and paste the read-back. Your report states the staging step as "apply <fragment> → expect mark <value>".

RULES FOR EVERY ITEM
- Census before editing. Each new test is shown red before its fix. Tests take the next free PW numbers; state them.
- DB truth for every saved value. Scratch rows only (G27); no page-position assertion (G28); a helper that opens an overlay ends with settled(page).
- No hardcoded user-visible string; new keys in en and am; bun run i18n:usage, both maps, i18n:map-guard.
- No workflow or package change beyond step 1. e2e/helpers/users.ts and the account pool are not touched. Decline the framework update as before.

SCOPE: docs/governance/briefs/bundle-2.md · the one new file in supabase/migrations/ · src/integrations/supabase/types.ts · src/features/posting/** · src/routes/api/listings/** · src/routes/api/admin/categories/suggest-icon.ts and src/server/category-images/** · src/i18n/locales/en.ts and am.ts and the two usage maps · component and unit tests beside the code · e2e/post-wizard-*.spec.ts, e2e/posting-routes.spec.ts, e2e/category-image-routes.spec.ts, e2e/admin-categories-lifecycle.spec.ts (only for the capability import test), e2e/helpers/posting.ts · docs/features/posting.md, listings.md, attributes.md, categories.md · docs/_changelog.md · roadmap.md · package.json only if step 1 names it. Everything else is forbidden.

END OF BUNDLE: the DEC-023 local run with 2 workers (every post-wizard-* spec, posting-routes, category-image-routes and a11y on both projects), plus typecheck, whole-project lint, unit and component tests, and the whole-tree format check last. Report only on green: done · verified · next; the censuses; each red-then-green line; the migration read-back and the staging pairing; the step 18 proof; every file changed; nothing outside scope; any limitation named before the turn ends.
````
