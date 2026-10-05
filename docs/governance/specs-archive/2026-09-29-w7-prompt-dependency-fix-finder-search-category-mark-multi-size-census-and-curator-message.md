Source: supervisor thread, turn 975, Tue 2026-09-29 19:41 New York.
Status at 2026-10-05: built: W7 Part A alone (c7ae8d7) then Parts B to D (825a779, run 36657436473 green; PW-85 to PW-87; the multi-size census reported, decision still open); INC-323 closed; the curator message (Fashion follow-up: several sizes, electronic watches) was sent — no curator reply on the two proposals is recorded; the repo holds the built behaviour in docs/features/posting.md (W7 entry), not this text.
Related: W7, INC-344, D37-2, INC-346, INC-345 (TR-29), INC-323 closed, multi-size census, C27 Fashion follow-up.

**W6b-1 is done, and the CI red isn't caused by it.** Its browser tests all passed. What failed is the dependency check: three high-severity security notices published today against `undici`, a package pulled in only by a test-only tool (jsdom). The fix follows our earlier fixes of this kind: pin undici to its patched release (8.10.2 or later; 8.11.2 is current). It's the first part of W7 below, as you asked, together with the next build.

**Also verified and decided:**
- W6b-1 stays within its scope, has no secrets, and the last-post fill reads only your own listings (the INC-330 rule).
- Filling in only 1 city from the last post (the free plan's limit) is accepted.
- **INC-323 ("listing not found") is closed:** 3 CI runs in a row at 5 or fewer (4, 5, 4).
- **TR-29** (a translations test) has now flaked 5 times in 7 days. That's INC-345; it goes to the flaky-test turn.

**Your Batch 2 walk:** all passed. Two new items:
- **Several sizes on one post (for shop stock):** clothing and shoe size is a single choice today. Making it a multi-choice affects shared fields and the form's parent/child logic, so W7 first checks what that change would touch (read-only), and the curator proposes the catalogue side.
- **"Electronic" watches:** the movement list has no digital option. The curator researches whether this should be a display question (analog / digital / both) or a movement option.

**The category required mark** disappearing when you go back to change category is INC-346, and W7 fixes it. While you're looking at a branch that doesn't contain your current choice, the asterisk and red border show, plus a line: "Current choice: … — Keep it".

**W7 contents:**
1. The dependency fix.
2. The wizard's category search uses the full server search, so "sugar", "salt", brand names and Amharic words find the right category. A match also fills in that option on the Specifications step. The quick name search stays as the fallback.
3. The category mark fix.
4. The read-only check on multiple sizes.

**Your steps:**
1. **Paste W7** (below) into Lovable and send it.
2. **Publish**, then walk W6b-1 on the published site:
   1. Start a post and reach the place step. The heading reads "Where should this ad be shown?"; the intro asks you to tick where the item or service is.
   2. The city box appears only after you choose a region, and it shows "Item or service is here" ticked.
   3. Choose a sub-city, go on to Price, then Back: everything is still there.
   4. Start another new post: your last post's places are filled in with the tick in place, and there's no red mark.
3. **Send the curator** the short message below. It adds your two walk items to the follow-up they're working on.
4. **Still open:**
   - Re-check Shola milk after a reload.
   - Answer the map plan: "agree" (free OpenStreetMap now, your own Cloudflare-hosted maps before launch) or "Mapbox". W6b-2, the map, waits on this.

---
```
W7 — dependency audit fix (INC-344); the wizard's category search uses the catalog finder (D37-2); category mark while changing (INC-346); read-only census for multi-size · Tier B · 2026-09-29

BASE: dev eda023d. Run 36642555497 is RED only on "Dependency vulnerability audit": bun audit reports undici >=8.0.0 <8.10.2 (3 high: GHSA-rfgv-xxqx-mfg5, GHSA-w293-vg96-wgc3, GHSA-vp8m-p9jh-q5pm) via jsdom › undici (devDependency). E2E passed.

PART A — INC-344 (the red)
- Add "undici": "^8.10.2" to package.json "overrides". This follows the INC-025 precedent in docs/features/dependency-audit.md; jsdom@30 asks for ^8.9.0, so this stays compatible. Regenerate bun.lock.
- Record a "2026-09-29 Audit — undici via jsdom, REMEDIATED (INC-344)" entry in docs/features/dependency-audit.md, in the format of the earlier entries.
- Unit and component tests (jsdom) must stay green. CI's audit job is the authoritative check.

PART B — D37-2: the wizard's category search uses the finder
Today step-category.tsx:103 calls searchLeaves (src/features/categories/category-tree.ts:365), which matches category NAMES only. So "sugar", "salt", brand names and aliases never find a leaf.
The server finder already exists: GET /api/catalog/find?q=&lang= (src/routes/api/catalog.find.ts). It indexes option labels, aliases and units in every published language, is fuzzy, returns at most 8 leaves with matches [{key, value}], stays under 2 KB, is rate-limited per IP and cached for 60 s. See docs/features/catalog-finder.md.
1. While filtering (2+ characters, debounced about 250 ms, the previous request aborted), the results are the finder's leaves in its order.
   - Each shows its path. When the hit came from an option, it also shows one line naming the match (e.g. "Type: Sugar").
   - The local name match renders instantly first and is the fallback when the finder errors or rate-limits. A small notice then says the results are name matches only (F4: never a silent downgrade).
2. Choosing a finder result selects the leaf AND carries its matches as answers into the draft's specifications.
   - Each pair is revalidated against the leaf's effective links and current options (the forward-scan rule in catalog-finder.md). A pair that does not fit is dropped; the finder is a hint, never authority.
   - The answers are prefills: editable, and judged by the door as usual.
3. Amharic queries work (lang = the active language).
4. No new dependency, and nothing heavier on the first paint.

PART C — INC-346: the category mark while changing (operator walk)
After Back, a seller who browses into a different branch to change category sees no required mark and no border, although nothing on that level is chosen.
- Rule: while a leaf is chosen and the level on screen is on its path, there is no mark and no border, and the chosen item or its ancestor wears the selected treatment (D40).
- When the level on screen is OFF the chosen leaf's path, the heading's required mark and the soft border show. A line reads "Current choice: <path>" with a "Keep it" link that returns to it.
- Next still accepts the current choice until a new leaf is chosen.
- New strings (EN / AM):
  - "Current choice:" / "አሁን የተመረጠው፦"
  - "Keep it" / "ይህንኑ ያቆዩ"
  - "Showing name matches only." / "የስም ተዛማጆች ብቻ እየታዩ ነው።"
  - the match line uses the attribute's and option's own labels.

PART D — census, report only (no code): can size and shoe_size become multi-select ("sizes available", for sellers with stock in several sizes)?
Both are single_select lists that depend on size_system / shoe_size_system, and gender-fashion's allowed rules narrow shoe_size. With file:line, say what a single → multi change would touch:
- the fold (a multi-select child of a single-select parent);
- DEC-085/086 and D44;
- the allowed narrowing;
- the door's value checks;
- the card display (card 3);
- the review page;
- the importer's type-change path (INC-200 precedent).
Then list what would have to change. Do not change anything.

TESTS (each red before its fix, pasted). Put them in a NEW e2e/post-wizard-finder.spec.ts; its afterEach uses stopPageBeforePurge; scratch rows only (G27); no page-position assertions (G28).
- PW-85: a scratch leaf with a scratch attribute whose option label and alias are unique scratch words.
  - Typing the label, and separately the alias, lists the scratch leaf with the match line.
  - Choosing it lands on step 3 with that option prefilled. DB truth after the step-3 save.
  - An Amharic scratch alias works too.
- PW-86: the finder route answers 503 (page.route). The local name results still appear, with the notice.
- PW-87 (360 and 1280): choose a leaf, go Back, browse into a different branch → the mark, the border and "Current choice" show; "Keep it" returns; choosing a new leaf clears them.
Component tests where they are cheaper.

SCOPE — you may touch only:
- package.json, bun.lock
- src/features/posting/step-category.tsx, wizard.tsx, posting-service.ts; src/features/categories/category-tree.ts (only if needed)
- a small new client module for the finder call, in src/features/posting
- src/i18n/locales/en.ts and am.ts, plus the two regenerated usage maps
- e2e/post-wizard-finder.spec.ts (new); e2e/helpers/posting.ts
- docs/features/dependency-audit.md, posting.md, catalog-finder.md, _changelog.md

ANTI-PATTERNS
- No change to the finder SQL, route or rate limits.
- No real rows (G27).
- No reporter or CI change (G22).
- No hardcoded user-visible string.
- No request per keystroke without the debounce and abort.

COMPLETION REPORT
- The census for B and C (current code, line-cited), the Part D report, and each red before its fix.
- DEC-023: every post-wizard-* spec (including where and finder) plus posting-routes and a11y, both projects, locally, green. Report only on green.
- Typecheck, lint (0 errors), unit and component tests, and the whole-tree format check last.
- Every file changed, git ls-files proof for every new file, and confirmation that nothing outside scope was touched.
- W7 entries in docs/features/posting.md and docs/_changelog.md.
```
---

**Curator message:**

---
```
C27 — two more walk items for the Fashion follow-up (2026-09-29). Propose in a short note (no files yet):
1. Several sizes on one post. Shops with stock want to list the sizes they have (e.g. EU 38–42). Research how Jiji and diaspora shops list sizes available, and propose where a multi-size answer fits: which leaves, and for new items only or for all. Engineering is checking what switching size and shoe_size to multi-select would touch; the decision waits for both.
2. "Electronic" watches. The operator did not find an electronic/digital choice. Research Jiji's watch filters, then propose either a display question (Analog · Digital · Analog-Digital) or a movement option, and how G-Shock and the Casio digital lines fit it.
```
---
