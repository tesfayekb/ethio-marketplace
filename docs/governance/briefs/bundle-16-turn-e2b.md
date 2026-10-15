# Bundle 16 — turn E2b: the seller's Edit, complete, and two walk fixes: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN E2b (2026-10-15). ONE TURN: SCREENS, TWO STRINGS, UNIT TESTS, ONE TEST EXTENDED AND ONE NEW TEST WRITTEN BY YOU, DOCS. No migration. No package change.
Base: dev 27ff9a4c (turn E2a). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the Place and Contact boxes (they write the ad's places and contact through the seller's door). Tier B: the screens, the tests. Tier C: the strings, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn E2a is verified on dev 27ff9a4c: the 4 carrier paths and the brief equal the supervisor's copy; PR-50's seed, ML-12's twelve cases and ML-14 are as described; the migration file 20261015130915_999a293e… is in the repository and applied on ethio-prod (mark 20261016040000) and on ethio-staging (the operator's read-back). The one-space difference on line 110 of the typed migration (INC-639) is ACCEPTED as landed: the door's behaviour is the same and the stored text is what the file holds; no corrective migration. Rule from it (DEC-182): a migration over 12 KB travels as a file you write by script and the operator applies, never through the database tool's typed text; one under 12 KB goes through the tool with the md5 read-back. CI on 27ff9a4c is the supervisor's read.
- Turns 4a and 4b are published; the operator's walk passed.

WHY THIS TURN — D187 (the operator, 2026-10-15) and his walk of the published site this morning
- D187: "Now I see edit doesn't have user contact info section as well as location section edit … I think we have to be comprehensive. Also the AI generation of title and description is not added on edit, and the title and description as previous should come after specification. The layout sequence should look really good and user friendly." His decisions: the Edit page in the posting form's order; places editable and applied at once; contact editable per ad and applied at once; typed directions and street go to review; the writing helper on Edit. Turn E2a built the door. This turn puts the boxes on the page.
- Two findings of his walk, fixed first in this turn (G29 — the class, not the instance):
  - INC-640 — "The phone box could not be loaded" on a new ad's contact step, and Try again did not help. The supervisor's diagnosis, stated as a hypothesis until the console is read: the tab was open before the Publish; the Publish renamed every lazily loaded chunk (the phone library, the map, the photo editor, the routes); the page still asked for the old names, which are gone. The class fix: one reload when a chunk load fails (`vite:preloadError`), once a minute at most, in the root route — every lazy piece is covered, not only the phone box.
  - INC-641 — after publishing, "Go to My listings" opened the home page: the button still pointed at the feed from before My listings had a page. It goes to /my-listings.

WHAT THIS TURN BUILDS (the carrier)
- src/features/admin-listings/edit-form.tsx — the seller's form in the posting form's order: Specifications → Photos → Title and description → Price → Place → Contact → Save changes. The title box is the posting form's own (`StepDetails`, with "Write it for me": the ad's id and its first three photo ids — new props `listingId`, `photoIds`). The Place box (`listing-edit-place-box`) is the posting form's place step (`StepWhere`): the places into the form's values, the pin through its own door at once (new prop `pin`; the form keeps what the door writes), the two text lines into the form's values (`textMode "form"`, below). The Contact box (`listing-edit-contact-box`) is the posting form's contact step whole (`StepWho`): the channels into the form's values; on Save, when the seller worked in the box, the step's own claim runs first (the checked name, the profile's channels — as the posting form's Next does); a refused name holds Save at its control. Save sends `coverage` and `contact_pref` only when the seller worked in their box and they differ (the place step settles its rows on its own; the contact step carries the profile's channels into an ad that has none). The admin's form keeps its order and boxes (D171) and gains nothing.
- src/features/admin-listings/edit-listing.ts — `EditableListing` and `EditValues` gain the places, the channels and the two text lines; `editChanges` emits `coverage` (the list differs AND the Place box was worked in), `contact_pref` (the channels differ by `sameChannels` AND the Contact box was worked in), `street_address` and `directions` (whenever they differ, trimmed; an emptied line sends null). `FORM_FIELDS` gains `coverage`, `street_address`, `directions`; the contact step's refusals (`contact_pref.<channel>`) are drawn by the step.
- src/features/posting/step-where.tsx — two new props, `textMode?: "door" | "form"` (default "door": as today) and `onTextChange?`. In form mode the directions and the location details are not saved on blur: the typed line goes to `onTextChange` (raw on each keystroke, tidied on blur), no "saved" line is shown, the length and phone checks stay. Nothing else in the step changes; the posting form passes nothing new and behaves as before.
- src/features/my-listings/my-listing-page.tsx — the page hands the form the ad's places, channels, street and directions (`readDraft`, the read the posting form resumes from), its pin (the four columns, as the posting form reads them), its id and its first three photo ids.
- src/lib/stale-chunk.ts (NEW; INC-640) — `reloadOnStaleChunk(window)`: on `vite:preloadError`, one reload; a second failure within a minute is left to surface (a real network failure never loops the page); the mark in sessionStorage, best-effort. src/routes/__root.tsx installs it beside the input-modality hook.
- src/features/posting/step-review.tsx (INC-641) — "Go to My listings" links to /my-listings.
- The two strings (below; the usage maps regenerated by you), the unit tests (LE-8…LE-11 in edit-listing.test.ts; SC-1…SC-5 in stale-chunk.test.ts NEW), the docs (my-listings.md: the turn's section), the roadmap and the changelog.
- THE TESTS (below): you extend MLA-13 and write MLA-15.

THE STRINGS (English / Amharic; the supervisor's, read before they ship — G43; they travel in the carrier).
New, 2:
  - `myListings.editBox.placeHint`: "Places and the pin apply at once. A change to the written directions or street is reviewed first." / «ቦታዎችና የካርታ ምልክቱ ወዲያውኑ ይተገበራሉ። የተጻፈ አቅጣጫ ወይም የቦታ ዝርዝር ለውጥ መጀመሪያ ይገመገማል።»
  - `myListings.editBox.contactHint`: "Applies at once." / «ወዲያውኑ ይተገበራል።»

DECIDED BY THE OPERATOR (D187)
- The order of the boxes; places and contact editable on Edit and applied at once; typed directions and street go to review; the writing helper on Edit.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The places and the channels travel only when the seller worked in their box: a seller who edits the price alone never sends the place step's own settling or the contact step's profile carry as a change.
- The identity block (the public name, person or business, the home country) commits to the profile exactly as when posting, and only when the seller worked in the Contact box.
- A street typed inside the map sheet rides with the pin, as when posting (the spec's known limit; docs/governance/seller-edit-spec.md).
- INC-640's fix is one reload per failed chunk load, once a minute at most; the phone box's own Try again stays.

THE TESTS — you write them this turn, from the descriptions below (Tier B).
General rules:
- MLA-15 goes in e2e/my-listings-ad.spec.ts's own `test.describe`, after MLA-14, titled exactly as below; reuse the file's own helpers (`scratchSeller`, `seed`, `openAd`, `signInViaSession`, `listingTruth`, `adminClient`, `seedScratchChain`, `destroyLocation`, the reaping) and, for the phone box, the wizard specs' own way of picking a country and typing a number (e2e/post-wizard-bundle2.spec.ts, PW-124's helpers) or the file's own. At most two leased accounts per test (DEC-174).
- Every row a test makes is its own and is removed in its `finally` (J3, G27). No real row is changed; no real place is picked (`seedScratchChain` makes scratch ones; the seller's own chain comes from `scratchSeller`).
- Tests see what a person sees: typed by keyboard, nothing read while an animation runs (INC-384).
- G38: no assertion loosened, no timeout raised, no retry added, no dial raised.

MLA-13 (e2e/my-listings-ad.spec.ts) — CHANGED for the new order and boxes:
- After the heading check, the boxes' order inside `listing-edit-form` is read by `evaluateAll` on the direct children with a `data-testid` ending in "-box" or equal to "listing-edit-text", and equals ["listing-edit-specs-box", "listing-edit-photos-box", "listing-edit-text", "listing-edit-price-box", "listing-edit-place-box", "listing-edit-contact-box", "listing-edit-save-box"].
- The title is now the posting form's box: every `listing-edit-title` becomes `post-title` (inside `listing-edit-text`), and the required refusal is read from the step's own refusal line: inside `listing-edit-text`, the `[data-testid="post-field"][data-field="post-title"]` block's `[role="alert"]` (src/features/posting/field.tsx lines 177–196 draw it; read them before you write the locator, and name the locator you used in the report). The writing helper's button `post-assist` is visible inside `listing-edit-text`.
- Everything else in MLA-13 stays: the photos box, the "nothing changed" line, the price at once, the new words to review, the refusal that keeps the panel open.

MLA-15 "MLA-15 Edit, complete: a second city and a channel apply at once; typed directions go to review; the boxes in the posting form's order (D187)" (e2e/my-listings-ad.spec.ts)
- `scratchSeller()` → A (its chain's city C1 is X's place). A second scratch chain `seedScratchChain("ET")` → C2; push its region to the reaping (destroy it in `finally` as the file destroys A's). `seed(A, "active")` → X.
- Sign in as A, `openAd(page, X)`, Edit. In `listing-edit-place-box`: the step shows C1 (`post-where-city` has value C1); add a city through the step's own control (`post-where-add-city`, then the new row's `post-where-row-region` and `post-where-row-city` set to C2's region and C2; read src/features/posting/step-where.tsx lines 370–610 for the rows' controls before you write it). In `listing-edit-contact-box`: `post-who-show-phone` checked (as PW-125 does at e2e/post-wizard-bundle2.spec.ts line 960) and a number typed in `post-who-value-phone` with the wizard specs' `expectPhoneRowUsable`, `pickPhoneCountry` and `typePhone` (lines 829–831 show the three calls; they are file-local functions at lines 60, 80 and 88: copy them into e2e/my-listings-ad.spec.ts unchanged), an ET number.
- `listing-edit-save` → `my-listing-notice` has text en["myListings.editBox.done"] (not the review line); the panel is gone; `listing-detail-places` in `my-listing-as-seen` names both cities (their names in the page's language; `listing-detail-contact` lists the phone channel). Through the service client: `listing_locations` of X ordered by position = [C1, C2]; `listings.location_id` = C1; `status` "active"; `contact_pref.phone.show` true.
- Edit again. In the Place box type "Behind the church" into `post-where-directions` and press Tab; no `post-where-directions-saved` line appears (form mode writes nothing on blur). `listing-edit-save` → `my-listing-notice` has text en["myListings.editBox.doneReview"]; `listingTruth(X)` status "screening" and `directions` "Behind the church".
- `finally`: the file's own reaping, and the second chain destroyed.

After writing them: `node_modules/.bin/prettier --write e2e/my-listings-ad.spec.ts`. No other test is edited.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 27ff9a4c with this turn's carrier files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 907 unit tests (156 files), the usage maps regenerated (they match), the hardcoded-strings guard (0 findings), the build and the bundle budget (JS 315.7 / 320 KiB).
- The Amharic strings were checked by script: Ethiopic letters and punctuation only.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-e2b.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts or src/integrations/supabase/types.ts since turn E2a, name the difference and go on (neither is in this turn's carrier);
  4. the carrier, then `bun run i18n:usage`, then the hashes;
  5. THE TESTS (MLA-13, then MLA-15);
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 16 paths of the hash table, the brief and e2e/my-listings-ad.spec.ts. The database: none (no migration; SELECT only if you need to look). Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-e2b.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  4fa03dbb84a5c33a76e06b16f4f0b6bc44750c7f2eaf363cddc440de22c4e3e7  docs/_changelog.md
  0306176c8d5fedb20135c1ccbac0db34c6d310a70462b1e3496594baa366b8fd  docs/features/my-listings.md
  0ac55fa78004fe9c3012c5453cf87284123a86a73e26ecdadda851192dc23359  docs/generated/i18n-usage.json
  0ac55fa78004fe9c3012c5453cf87284123a86a73e26ecdadda851192dc23359  public/i18n-usage.json
  c4a18ebef84497fbc531535a07f8baccf2125f408e5c8d60afeeaa2c938f6a29  roadmap.md
  b5c4e70bb38683d44232df2765d7614123dc915ba14239f553884bb39d1d4fa1  src/features/admin-listings/edit-form.tsx
  61a07f26a6315d0aa84c3d1322d7f417750672c51fe1cd2460841776ed52c4ad  src/features/admin-listings/edit-listing.test.ts
  bf9d42bcd4238ce78b2370b27deabe8589e2aabc4d00218eb7dff4753775db56  src/features/admin-listings/edit-listing.ts
  9e48079569cbf518e910f063648ece40d8df4851c1d55cd86dd780fff915b171  src/features/my-listings/my-listing-page.tsx
  e7716f0596e35674887ec0da05500b453ea4ef85fddae5f832eba492ec9f6c24  src/features/posting/step-review.tsx
  d5744cc9e3c13e1b5f5f896023c6dad855ca2dfe3c46f4df339d0c37110392d9  src/features/posting/step-where.tsx
  6cf0184e1820eadf78ff45971a865e351323e2eca5ad47f4d7bdeef83f77fbbc  src/i18n/locales/am.ts
  e2d52751a51f8b138ed2f8a446d822e4c5c29427c870a006acdbfe632aaa8394  src/i18n/locales/en.ts
  56a82cad338d04f20fdf9cebc927285e0f4b9151fe89e325b18a59ac9d7e3d70  src/routes/__root.tsx
  and `ls src/lib/stale-chunk.ts src/lib/stale-chunk.test.ts 2>/dev/null` → nothing.
- (c) `sha256sum e2e/my-listings-ad.spec.ts` → b218555c7e9d3154afdfdd8e34994e995878e90c7eae1155a23ae7f1e64b1f86 (as turn R2 left it); `ls supabase/migrations | tail -1` → 20261015130915_999a293e-b101-44fe-8262-c65d53b38d01.sql (turn E2a's; no migration this turn).

THE CARRIER — B16E2B-TURN-CARRIER-2026-10-15.md (51,071 bytes; sha256 5f3f8803a5a304d19908c64463f07ce9f71bbb3e6236899674cb6e906dc4b439; 33 sections)
- Its first line starts "B16E2B TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.
- The two usage maps are not in the carrier: after the carrier, run `bun run i18n:usage`; it writes them from the tree, and their hashes are in the table.

THE HASHES — `sha256sum` each of the 16 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  2a7ba3c39380c731ed68fc8e25acc8112c20650eb9d2bd6637813073f7177038  docs/_changelog.md
  5998d5a72be356f3fe5b146112a4406ec3c49a56fa3d424917344303db324b94  docs/features/my-listings.md
  f73120684396ed6c34ecf89ec4a4539081dec76e24648b211764b02161f50684  docs/generated/i18n-usage.json
  f73120684396ed6c34ecf89ec4a4539081dec76e24648b211764b02161f50684  public/i18n-usage.json
  d5a87d2b3a7e34c0157432466453421f4f2061f4885da4c742f09042b1118bdb  roadmap.md
  3b75d3390e552668da205a72ebdf7e41ede3e711470bf8314a3fde89c683fd1e  src/features/admin-listings/edit-form.tsx
  5c006a37b1faf9ba28850ff42c17b33de4cd50e04c08886de633996331826103  src/features/admin-listings/edit-listing.test.ts
  beafb3e82819d78eb54080b583475ed2a0b644e754c0319c382dd4ee4c981749  src/features/admin-listings/edit-listing.ts
  7ae310a66b37e9133d1a9bff7c165bc277d77011899a3878cc51ef83759264e2  src/features/my-listings/my-listing-page.tsx
  9e22acd66bce16f9dc8894e1bab02b2af3f8f455b53ebf60823001e99e17d181  src/features/posting/step-review.tsx
  a7b12491b2840620769ac2ec46a93b65b1915afdb7b0e2e092a7265b476c607f  src/features/posting/step-where.tsx
  28e6d72ba9439f8863bfcb5ab72bbb27ddbb8b612d6e05356f4c06142ab73256  src/i18n/locales/am.ts
  1ad6c848d1fa2ca81b91a33619639e6fa14ea04ec26985a553ead038831f717b  src/i18n/locales/en.ts
  b747b40b4f877b41496f77b3f1b789b919ba013f2f36daa48c994266caeea4cd  src/lib/stale-chunk.test.ts
  57dc8744abdaebbb3df8d8446096f6de4a81c79c0e460dac15411301eae519c4  src/lib/stale-chunk.ts
  c5551d78cad04231c426bf167c80c23df5dee122baabb6725436abd7f2fdb0a8  src/routes/__root.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings — a warning in your tests is fixed, not left;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16e2b.log` — 907 passed (156 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `grep -n 'test("MLA-15' e2e/my-listings-ad.spec.ts` → one line; `grep -c 'listing-edit-title"' e2e/my-listings-ad.spec.ts` → 0;
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec, yours included.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 16 sha256sum lines and the brief's; the sha256sum and line count of e2e/my-listings-ad.spec.ts, and `git diff <START> -- e2e/`.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 16 paths, the brief and the one test file.
- The checks.
- The locator you used for the title's required refusal in MLA-13 (above).
- Every new or changed Amharic string, key by key with its English (G43).
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
2. Publish when the supervisor says the newest commit is green and Lovable is idle (turns E2a and E2b go out together). Then press "Sync keys" in Admin › Translations (this turn's two words).
3. The walk the supervisor sends after Publish (five lines: the boxes' order, a second city, a channel, a directions line to review, "Go to My listings").
```
