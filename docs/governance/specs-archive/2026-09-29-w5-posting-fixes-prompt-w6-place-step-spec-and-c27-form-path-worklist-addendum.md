Source: supervisor thread, turn 947, Tue 2026-09-29 09:33 New York.
Status at 2026-10-05: W5 built (d25b5d7, run 36585975894 green; DEC-084 made blocking); the W6 place-step spec was approved by the operator ("approve W6" on 2026-09-29) and built as W6 + W6-R (a3a572bf, 13cb1b22; marks 20260929235900 and 20260930001000), then reshaped by W6b-1, W6b-2, Part P and bundle 2 steps 7 to 12; the curator addendum was never sent in this form (replaced by the turn 949 message, which folded the worklist into counts g1 to g3); the repo holds the built place step in docs/features/posting.md and the W5 changelog line, not these texts.
Related: W5, INC-336, INC-332, INC-323, DEC-084, W6, DEC-064, INC-337, INC-338, S70, C27 form-path worklist (493 rows), G26, G27, G28, G29.

**W4 walk: accepted, with one miss.** Your walk passed d–g and settled INC-331. It failed on c:

- **Model mark (INC-336):** the phone model list has 363 options. The form only loads lists of up to 200 before they're opened (`step-specifications.tsx:63`, `:351`), so it can't tell the Model question is required until the server rejects it on Next. PW-76 and PR-16 used small lists, so they couldn't catch it. W5 fixes it with a test that uses a list over 200.
- **iPhone 13 colour and storage:** these are catalogue defects. Colour offers 11 generic colours, and storage allows 1 TB for iPhone 13 and 13 mini (only the Pro models have it). The series allows 128 GB–1 TB and the model doesn't narrow it.
- **Place step (INC-337):** your 2026-09-19 ruling ("a region alone must not pass, city required") was never enforced. The server accepts any level and the form shows no required mark on the city. I missed it when verifying the place step (slip S70).
- **Place plan limit (INC-338):** the form hardcodes one city (`step-where.tsx:78`) instead of reading the coverage plan, so a limit changed in the console never reaches the form.

**The systematic check you asked for:** I computed every product path in the catalogue, not a sample. For every brand → series → model or type choice, I checked which later questions stay generic. That gives a worklist of 493 flagged rows across all 15 sections (Electronics 79, Fashion + Babies & Kids 73, Food 25, Books 10). Three checks:
1. **Product doesn't narrow a later question.** Example: Colour stays generic for all 241 phone models.
2. **A question is asked for every type.** Example: watch material.
3. **A model inherits its series' range.** Example: iPhone 13 offered 1 TB.

A row is a flag, not a verdict: a car's colour rightly stays open. The curator must decide every row in each batch. I ran it on my rebuilt copy of the catalogue, so I'll re-run it on your fresh exports.

**Your steps:**
1. Paste W5 (below) into Lovable and send it. Nothing is needed in any other system first.
2. Reply **"approve W6"**, or correct the place-step spec below. Lovable builds it after W5.
3. Export categories, attribute definitions and links. Send them to the curator with the worklist file and the curator message below, and attach the same three exports here.

---
```
W5 — posting fixes: model mark on big lists (INC-336), no lost taps (INC-332), "listing not found" regression (INC-323), accessibility check becomes blocking (DEC-084) · Tier B · 2026-09-29

BASE: dev 4de0e33 (run 36561472744 green). No migration is expected; if your census shows one is needed, stop and report before writing it.

SCOPE — you may touch only:
- src/features/posting/step-specifications.tsx, field.tsx, wizard.tsx, posting-service.ts, attribute-options.ts
- e2e/post-wizard-place.spec.ts, e2e/post-wizard-resets.spec.ts, e2e/a11y.spec.ts, e2e/helpers/posting.ts
- the afterEach hooks of e2e/post-wizard-*.spec.ts and e2e/posting-routes.spec.ts (Part C only)
- docs/features/posting.md, docs/features/e2e-harness.md, docs/_changelog.md
Everything else is out of scope. e2e/post-wizard-specs.spec.ts is at the ~25-tests-per-project limit (e2e-harness.md:333): add no test to it.

PRE-EDIT CENSUS (in your report, line-cited):
- How the form learns a dependent list's parent: `folds`, step-specifications.tsx:455–486, built from LOADED options.
- Which lists load before a tap: `eager`, :346–357; EAGER_OPTION_LIMIT = 200 at :63.
- What `get_posting_schema` (posting-service.ts:440) returns per definition.
- Where Next and Back are laid out on mobile and desktop (wizard.tsx).

PART A — INC-336: the DEC-086 mark is missing on big lists.
Evidence (operator walk, published site): Electronics › Smartphones → Apple → iPhone 13 series. The Model question shows no asterisk and no soft border; only Next reveals it (the door's refusal). The phone model list has 363 options, above EAGER_OPTION_LIMIT, so it is not loaded: `folds` has no entry for it, and `requiredByModel` (:536) returns false at its first check. PW-76 and PR-16 used small lists and could not see this.
1. Test first (G26): add PW-78 to post-wizard-place.spec.ts.
   - Set-up: a scratch brand → model pair whose model list has MORE than 200 options (scratch keys, reaped in afterEach). One brand has 2+ models, and the options carry facts.
   - Assert: after choosing the brand and BEFORE any Next, the model field shows the required mark and the soft border.
   - Run it before the fix and paste the red.
2. Fix: the mark appears as soon as the DEC-086 rule applies, whatever the list's size.
   - At most one read per list per mount (the INC-320 precedent), and no read while the parent is unanswered.
   - The census chooses the mechanism (e.g. read the big list once its parent is answered, or have the schema carry what the form needs). State the choice and why.
3. G29 class census: list every other form behaviour that reasons over a dependent list's options without holding them. Examples: the one-option fill-and-hide (DEC-085/INC-244) for a big list whose parent leaves one child; `lockedByModel`; the narrowing.
   - For each: works on a big list / broken / not applicable, with the line.
   - Fix every broken one in this turn, each with an assertion on a >200-option list (PW-78 may carry several checks).

PART B — INC-332: a tap on Next or Back is never lost.
Evidence (your W4 report, PW-77): when a field's refusal message appears under the seller's tap, it moves Next and the tap is silently lost.
1. Test first: PW-79 in post-wizard-resets.spec.ts, on both projects.
   - On step 4, clear the title and tap Next at once: no blur wait, no waiting for the message.
   - Assert: the step's refusal summary appears and the page scrolls to the title.
   - Paste the red before the fix.
2. Fix at the shared level (the Field refusal slot, the action bar or the blur handling; the census decides), not per field. The judgement still shows, and a tap on Next or Back always registers.
3. Class census: every field with an on-blur judgement on every step (details, price, where, who, specifications), and every layout that can move the buttons. List them with lines; the fix covers all of them.
4. Keep PW-70 and PW-77 exactly as they are.

PART C — INC-323 regression: "listing not found" went from 5 to 21.
Evidence: docs/tracking/e2e-last-failure.md (run 36561472744), the census line `[ssr-error] /api/listings/draft listing not found` ×21, sources shard 3, shard 6 and changed. The previous two runs had 5, of which PR-15 provokes 2 on purpose. The rise came with W4's new tests.
1. Read-only first: run the posting specs locally with the server log visible. Attribute every "listing not found" line to the test that provoked it, and paste the table: test → lines → cause.
2. Then fix the provoking tests by the INC-323 afterEach rule (e2e-harness.md:324: page to about:blank before any purge), or the equivalent for a purge in the middle of a test. If a line comes from a product path rather than a test's own teardown, stop and report it instead of fixing it.
3. Target: a local run of the posting specs produces no such line except PR-15's two.

PART D — DEC-084: the accessibility check becomes blocking.
The pre-committed rule (e2e-harness.md:320) is met: seven consecutive CI runs with zero serious and zero critical violations (611e109 → 4de0e33).
1. Make e2e/a11y.spec.ts fail on any serious or critical violation. Keep the `[a11y]` line exactly as it is, so the report still reads it.
2. Rename the describe from "non-gating" to gating.
3. In e2e-harness.md §DEC-084, update the implementation line and record the flip date, 2026-09-29.

ANTI-PATTERNS
- No real row is written (G27): scratch keys only, reaped in afterEach.
- No page-position assertion on a shared roster (G28).
- No per-field patch for Part B.
- Raising EAGER_OPTION_LIMIT is not the Part A fix: the read budget stays.
- No reporter or CI workflow change (G22).
- Do not hide a real "listing not found" by editing the allowlist.

COMPLETION REPORT
- The census for all four parts, the red before each fix, and the Part C attribution table.
- DEC-023: every post-wizard-* spec plus posting-routes and a11y, both projects, locally, green. Report only on green.
- Typecheck, lint (0 errors), unit tests, and the whole-tree format check last.
- Every file changed, git ls-files proof for any new file, and confirmation that nothing outside scope was touched.
- W5 entries in docs/features/posting.md and docs/_changelog.md.
```
---

**W6 — place step spec (for your approval):**
1. **A city is required.** The item's location must be a city; sub-city is optional. Until a city is chosen, the place heading has the asterisk and the place box has the light red border, as on the category step. Pressing Next without a city scrolls to it and says "Choose a city".
2. **Every added place is a city.** Adding a region or a country is only the way to reach a city in it; a region or country alone never counts. The server rejects a draft without a city, so none can get past. This changes DEC-064, which allowed any level; "everywhere" stays a later paid option.
3. **Prefill stays.** The previous posting's city (or your saved area, or the IP guess) fills the place in and counts as chosen.
4. **Nested layout, as in apex:**
   - The country is a box. Inside it, each region is a box, and inside each region box its cities are rows.
   - "Add a city" sits inside the region box, so the new city joins that region.
   - "Add a region" sits inside the country box, below its regions, and the new region needs a city.
   - "Add a country" sits below the country box, and the new country needs a region and a city.
   - A box without a city keeps the red border. The first city is labelled "Item's location"; the others "Also shown in".
5. **Plan limits come from the coverage plan (INC-338).** The form reads the limits from the coverage plan instead of a constant, and shows only the add buttons the plan allows. The free plan is 1 city / 1 region / 1 country today, so to see the add buttons on your walk you'll raise it in Admin › Locations › Coverage. A check for any other hardcoded copy of an admin setting (photo caps, for example) is part of W6.
6. **Tests and walk:** a test for each rule, then a walk at 360, 768 and 1280.

**Curator message** (send with the worklist file):

---
```
C27 addendum — the form-path worklist, for every batch · 2026-09-29

The operator's walk found two more defects of one kind on Smartphones. After choosing iPhone 13:
- Colour still offers the 11 generic colours, not the colours the iPhone 13 comes in.
- Storage offers 1 TB, which only the 13 Pro and Pro Max have. The series allows 128 GB–1 TB and the model does not narrow it.

The operator wants this found systematically, not by accident: for every category, choose each product the form knows (brand → series → model, or the type) and check that every following question, and every choice in its list, fits that product.

The attached worklist (form-path-audit-2026-09-29.csv, 493 rows) does the mechanical part for the whole catalogue: every product path is computed, not sampled. Three checks:
1. "identity leaves question open" — after the leaf's product chain, a question is neither narrowed (allowed) nor filled (facts) for N of the products. Example: Smartphones colour is open for 241 of 241 models.
2. "asked for every type" — the leaf's type question (card 1) neither hides (visible_when) nor narrows (allowed) a question for any type. Example: Jewelry & Watches material, asked for watches.
3. "model inherits series range" — a model under a series that narrows a question to 2+ values does not narrow it further. Example: iPhone 13 and 13 mini offered 1 TB.

A row is a flag, not a verdict; many are correct (a car's colour rightly stays open for every model). In each batch's review note, every row in that batch's roots gets a disposition: narrow (allowed), fill (facts), hide (visible_when) or keep, with a one-line reason. Beyond the rows, keep walking each path yourself for wrong choices inside a list (the watch-karat kind), which the mechanics cannot see.

Base: a reconstruction of the post-C26 state (167 categories · 514 definitions · 1,412 links, against your 1,419), so counts may differ slightly. I will regenerate the worklist from the operator's fresh exports and attach it with each batch.

- Batch 1: deliver as planned, plus dispositions for its rows (Food & Beverages 25, Books 10).
- Batch 2 (Fashion + Babies & Kids): 73 rows.
- Electronics: 79 rows. Also propose how model colours should work: the maker's names (Midnight, Starlight) versus the generic colour list the filters use.
```
---

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The worklist file is attached above. After W5 comes W6 (the place step, once you approve it). Then a CI turn: the flaky tests at or over the 3-in-7-days limit, plus an automatic check that lists them in every CI report, since missing them has now happened three times.
