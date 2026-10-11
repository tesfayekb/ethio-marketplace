# Bundle 11 — the Listings console, turn L4b: Edit — the category and the specifications (D140); the breadcrumb (INC-554); AL-3 (INC-555): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — THE LISTINGS CONSOLE, TURN L4b (2026-10-11). ONE TURN, NO MIGRATION. 3 strings (below; one changed, two new). No package change.
Base: dev dfd6555a8dbd6011d3b55f1d7bccc7765a434745. This file is public: it is written as build instructions. Tier A: the admin edit's client (what it sends to `admin_edit_listing`) and the admin breadcrumb on detail pages (what a page shows of a listing and a language). Tier B: the form's sections and the tests.

ANSWERS TO TURN L4a
- Verified: dev dfd6555a holds the delivered tree, the migration as sent (mark 20261012030000) and the brief as sent.
- CI run 38147645440 on dfd6555a: FAILURE — AL-3 ran past its 60 s budget (shard 6, desktop-1280; the fast lane, both projects): INC-555, fixed by part 0 below. Everything else passed (1,594); TR-29 passed on retry (its incident is on record). Not your defect: the test was the supervisor's.

THE OPERATOR'S CHOICE (D140, 2026-10-11): Edit in two turns — L4a the title, the description and the price (landed); L4b (this turn) the category and the specifications. Removing a photo waits until the console shows photos.

PART 0 — L4a's red first (INC-555)
- AL-3 ran past its 60 s budget on shard 6 (desktop-1280) and in the fast lane (both projects), and its afterEach then reaped the listing the abandoned body still read ("Received: undefined" at :420). It leased three accounts one after another besides the scratch seller (63–66 s already on 88c6ed8c). AL-1 and AL-16 lease three accounts each too and ran 56–59 s.
- The fix (the class: one refused person per test, at most two leased accounts — the rule of turns L1b and L2):
  - AL-3 becomes "An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written" — the plain account AL-1 and AL-16 leased moves here with its two assertions;
  - AL-24 a reviewer (listings:view and review) is refused Edit; AL-25 an enforcer without a second factor is refused Edit;
  - each of the three checks that nothing was written (audit, notices, revisions, the title);
  - AL-1 and AL-16 keep every other assertion, one leased account fewer each.
  - No assertion loosened, no timeout raised.

WHAT THIS TURN BUILDS
- src/features/admin-listings/edit-form.tsx — the form's sections, in this order: the title, the description, then:
  - the category (`listing-edit-category`): the path (`listing-edit-category-path`) and "Change category" (`listing-edit-category-change`), which opens the seller's own tree with its filter (`StepCategory`, testids `post-category-*`) and its Cancel (`listing-edit-category-cancel`); choosing a leaf closes it, and the form follows the new category (its specifications, its price rules); while another leaf is chosen the form says "Answers the new category does not ask are dropped when you save."; a refusal of the category lands under it (`listing-edit-category-refusal`);
  - the specifications (`listing-edit-specs`): the seller's own form (`StepSpecifications`) for the category in the form, without the "How it is sold" rows;
  - the price: the seller's price form (`StepPricing`), drawn inside the "How it is sold" rows when the category has them (`StepSpecifications` with `only` and `around`, as on the seller's price page), with the basis the form's answers put in force;
  - the reason now offers Wrong category first;
  - a refusal naming a question the form does not draw is listed above Save as "Specifications".
- src/features/admin-listings/edit-listing.ts: `EditValues` holds the category and the answers; `editChanges(listing, values, specsEdited)` sends the category when another leaf was chosen, and the answers when they differ from the listing's (`sameAnswers`, any key order) AND the admin moved the category or worked in the specifications (any tap or keystroke inside them). The seller's form fills a question's default and tidies hidden answers on its own; an admin who only looked sends none of that.
- src/features/admin-listings/use-admin-listing.ts: `refusalsOf` reads a specification's refusal under its `attr_key` (the key its control is drawn under — the seller's routes read it the same way).
- src/features/posting/step-category.tsx: a new option `showRecent` (default true — the wizard is unchanged); the admin form passes false, so the admin's own recent categories are not offered.
- INC-554 — the breadcrumb (src/components/shell/breadcrumbs.tsx): on every admin page below a section's own page the section is a link back to it (before, only the user and the role pages linked back); the listing's page ends with the listing's title (`breadcrumb-admin-listing`, cut with "…" past 16 rem) and a language's strings page with the language's own name (`breadcrumb-admin-language`). The two crumbs live in src/components/shell/admin-detail-crumbs.tsx (NEW), loaded only on those pages (React.lazy), and read the page's own cached query.
- The first-paint figure: the bundle job's number moves from 173 KiB to about 231 KiB with this turn. That is the bundler naming the shared Supabase chunk "client-…", which the job's entry-name rule counts; the entry's real static import closure grows 1.1 KiB (307.0 → 308.1). The guard's measurement is INC-556, queued with its own DEC (roadmap). Under 320 KiB: the job stays green.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The form's order: the title, the description, the category, the specifications, the price.
- "Change category" opens the seller's tree inside the form; the admin's own recent categories are not offered.
- A moved listing keeps the answers its new category also asks (the door's rule); the form says the others are dropped on save.
- The answers travel only when the admin moved the category or worked in the specifications.
- The breadcrumb fix covers every admin detail page (the census: users, roles, listings, a language's strings); the new crumbs load only on their pages.
- INC-555 fixed by splitting, not by a longer timeout; the lease-speed study and a lease-count guard are queued (the class's third occurrence).

STRINGS (G43 — the Amharic below is what ships; English in en.ts, Amharic in am.ts; the two new keys after `admin.listings.edit.done`, the hint changed in place)
- admin.listings.edit.changeCategory — en "Change category" · am "ምድብ ቀይር"
- admin.listings.edit.categoryHint — en "Answers the new category does not ask are dropped when you save." · am "አዲሱ ምድብ የማይጠይቃቸው መልሶች ሲያስቀምጡ ይወገዳሉ።"
- admin.listings.edit.hint — en "Change the title, the description, the category, the specifications or the price. The seller is told what you changed, with your reason and note." · am "አርዕስቱን፣ መግለጫውን፣ ምድቡን፣ ዝርዝሮቹን ወይም ዋጋውን ይቀይሩ። የቀየሩት ነገር ከምክንያትዎና ከማስታወሻዎ ጋር ለሻጩ ይነገራል።"

TESTS
- Part 0: AL-3, AL-24, AL-25 (e2e/admin-listings.spec.ts), AL-1 and AL-16 as above.
- Unit, src/features/admin-listings/edit-listing.test.ts: LE-4 (Wrong category first), LE-5 (a specification's refusal under its key), LE-6 NEW (a category change sends the leaf and the answers; the form's own tidying is not sent until the admin works in the specifications; the same answers in another key order are the same).
- e2e/admin-listings.spec.ts:
  - AL-22 NEW: a listing moved to another scratch leaf through "Change category" (the filter finds it by its name) with Wrong category — the line above names Category, History's newest line "Edited: Category", the stored leaf, the seller's notice;
  - AL-23 NEW: a scratch leaf with a scratch specification set (`seedSpecSet`, reaped with `destroySpecSet`); a title-only edit sends no specifications; the required answer emptied is refused under its own control (`post-attr-refusal`) with nothing written; a new answer is saved, and the seller is told "Specifications";
  - AL-21: the breadcrumb ends with the listing's title, and its All listings segment leads back.
  - `seed` gains an `attributes` option.
- e2e/admin-translations-console.spec.ts: TR-39 NEW — a language's page: the breadcrumb names the language as the heading does, and Translations leads back to the roster.
- Not edited: every other test.

DOCS
- admin-listings.md (Edit: the category and the specifications; INC-554; the tests; INC-555), the changelog, the roadmap (line 3; the L4a and L4b lines; two queued lines: the lease study and guard, INC-556).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn L4a applied)
- typecheck, format, lint (0 errors, 33 warnings), 666 unit tests (107 files; the action-label and test-id checks), the usage maps, the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget (about 231 KiB, explained above): all clean.
- A local render (Chromium, a node build, mocked answers, nothing sent to a database) at 360 and 1280 px: the category's path; "Change category" opens the tree with no recent row; a filter finds the other leaf; choosing it closes the tree and shows the new path; a specification's answer shown in its control; Save with a moved category asks for a reason; no sideways scroll.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-22.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect dfd6555a… with Conclusion FAILURE (run 38147645440 — AL-3's timeout; part 0 fixes it)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage maps, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 16 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-22.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 13 files → each equal to:
  9524b5d47faa7ecc31e631a58fe31f40c83e21306c945ec846fbfe8a90b0eba4  docs/_changelog.md
  22bd179e7747b69380eafefeb000a2db3ebcae239d7c77fa4a1c613d1caedeee  docs/features/admin-listings.md
  3ed055b6c6440ea9f91996d144c75d47ce57159596e4a26649ec117c77326272  e2e/admin-listings.spec.ts
  f89a181c3aa0edf730c68a5c7b5feedaddc88e0b02bd7816592a315db370f365  e2e/admin-translations-console.spec.ts
  2db562372085bb0c29fcc6ec2d20a704a5333f715a90711b47ab1bcb135b9a4f  roadmap.md
  cdbee14064c4e635e8ce28ddc89d2f43eedcedf9e43fdf2cc09d4a8ec508b31f  src/components/shell/breadcrumbs.tsx
  09752bd7caa9fdbef403f060503c1335e6489c6ea56f356873caa1b4e3d11197  src/features/admin-listings/edit-form.tsx
  ce5a8460a6bd0116fa9bc474d4d1ed0ff7974901af9f6dbb5f9a539ca02402fc  src/features/admin-listings/edit-listing.test.ts
  e380486068f3e8119d7d9a10b07d7c7187761a553c62fa9ac533dc9ca5cad9f0  src/features/admin-listings/edit-listing.ts
  254d0d4a700ac3bf001dbfd1899efd2c00a6084cd301773bbfc3f899a207e031  src/features/admin-listings/use-admin-listing.ts
  c25c746b672fd459567c7107e153b1f6b8e01dd060b07729d57d7074a2696430  src/features/posting/step-category.tsx
  94d6337aa20a0534ba988c3b4fa682d506e62ad14b251513fa9378faefdf047b  src/i18n/locales/am.ts
  15d2af1fb0fbff9a92997489095587a4f69a063ce45cac1d8514eb7686e44cf0  src/i18n/locales/en.ts
- (c) `ls src/components/shell/admin-detail-crumbs.tsx` → "No such file or directory".

THE CARRIER — L4B-TURN-CARRIER-2026-10-11.md (52,245 bytes; sha256 aecabfb049dc004849883bbe2803ea6528ca0020693418c085284eaca03c90a5; 49 sections)
- Its first line starts "L4b TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (the new keys; keys moved between lines), then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 16 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  80ff6c150f544373757fabb76f8f8cab9bc4fbfea361c91be988304e47e98871  docs/_changelog.md
  674efe6ee4f87fe7371dc1b921e84ed5b1fcfe5d0a1de5289ea25aa590be7b33  docs/features/admin-listings.md
  46947f875f416dae98213363f28273fd58611901433a39d23e75af546282ebf5  docs/generated/i18n-usage.json
  7234550fc08579e5729ca5092b02fc03e7b7b053f6dca7e0c186c83af3d78811  e2e/admin-listings.spec.ts
  01709679ad558dbc3fde184bbc66c80cab51d6313fac088b9d146b599218c477  e2e/admin-translations-console.spec.ts
  46947f875f416dae98213363f28273fd58611901433a39d23e75af546282ebf5  public/i18n-usage.json
  b5230a81eb3c32baf77ffbf530a942054fe46cad21c6944d8ed11c2db766c659  roadmap.md
  42d333b60e2a0312418b687e3fe5574a47c7c328d2296d6a860a444b3317df05  src/components/shell/admin-detail-crumbs.tsx
  f851201d1acf936c390298d869a041134b918b04ee401f4aca2e247e9b2ce335  src/components/shell/breadcrumbs.tsx
  47d276f23ea248e803a2769ea8d5eddd8e12e607076a345ae4546d251082d0b4  src/features/admin-listings/edit-form.tsx
  af8ebca42ccb7ce60c182d96590899a54569779f5a0245c06bf0f6dee0484d74  src/features/admin-listings/edit-listing.test.ts
  5fe19eaa0a5dc2890a87ff8b337b8a487920555df4300c36c5480fce5b1dd601  src/features/admin-listings/edit-listing.ts
  0e71cced8d71a37b8c34f7ef49627fc01b609e962fe9f957a93e2ab56cb8da5d  src/features/admin-listings/use-admin-listing.ts
  3d2e2ae432da787cd479eaaa553670bb8e82565f1da7594876bbd5d23d7983e4  src/features/posting/step-category.tsx
  b4c2992a0e399a60a0b51952b8212e9036f4218cce7235e72ea44adf2c3593cf  src/i18n/locales/am.ts
  d8e4cff063f1838327cd2c367a3a196ec5e3b00a62c2f81108258991e269b75d  src/i18n/locales/en.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 666 passed (107 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step (part 0 included).
- The six ci-status lines.
- The census results (a)–(c).
- The 16 sha256sum lines and the brief's.
- `git diff --name-only dfd6555a8dbd6011d3b55f1d7bccc7765a434745` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only dfd6555a8dbd6011d3b55f1d7bccc7765a434745 HEAD` too. Expect the 16 carrier paths and the brief.
- The 3 strings, key by key, English and Amharic, as written in en.ts and am.ts (G43).
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk L4a and L4b together.
```
