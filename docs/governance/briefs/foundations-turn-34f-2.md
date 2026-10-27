# Foundations — turn 34f-2: turn 34f continued after its stop 1 — the ad page's place names come with the page (INC-947): brief (saved unchanged, 2026-10-27)

```text
FOUNDATIONS — TURN 34f-2 (2026-10-27; G0; INC-940, INC-947; anchors located at 0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d). The ruling on turn 34f's stop 1 (docs/governance/reports/foundations-turn-34f.stop-1.md), as a full brief that replaces turn 34f's remaining steps. The stop's finding is accepted: ALS-1's 32 px on mobile-360 is a second late part in the Location box — the place line (src/features/posting/preview/listing-detail.tsx :1137; and the title box's place link :782–:796, `min-h-11`) is drawn from the country tree (`useCountryTree(view.country)`, :265), which the browser reads after the page has painted. Neither of the stop's two options is taken: (a) would reserve a line whose length is unknown, (b) would make the proof wait for the defect. The server's document already carries the places' names — `places.list`, built by public_listing_json (supabase/migrations/20261017105751_e6d71c12-f4b2-4cda-a556-79b0432c369f.sql :157–:166, `ORDER BY ll.position`, the coverage's own order) and typed in src/features/ad-page/public-listing.ts :69 — and nothing reads them. So the ad page's view carries them (`placeList`), and both place lines are in the first paint: the place line stops being a late part at all. The views built from a draft (the owner's, staff's and the wizard's) keep the tree — LEFT, INC-947. PW-30's red is accepted as not this turn's: INC-948, registered here, its trace read first in the turn that next runs that file. ALS-1 is unchanged: it is the proof. Tier B. No migration. No new string. No package change. AGENTS.md unchanged. No file deleted. Base: dev 0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d (turn 34f's stop-1 landing; SUCCESS on 0026bd30 (run 40560297547, completed 18:54:35Z; main promoted; no failing job, no flaky test — ALS-1 passed on both projects there)). The executor is Claude Code (DEC-257). ONE TURN. Parts, IN THIS ORDER: A — orient and CI; STEP 0; B — the tests, red first (not committed); C — the place names from the document, green; D — the records; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW (of turn 34f whole); THE COMPLETION REPORT (of turn 34f whole); the landing (bun .claude/hooks/land.ts); END THE TURN.
BASE: 0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
docs/tracking/incidental-findings.md
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.tsx
SCOPE-END

THE SYSTEM (G0)
CONCERN: a part of the page that arrives after the first paint holds its box (register row 60) — here its data half: text drawn from data the browser reads after the paint.
MECHANISM: for the ad page, the server's own document — public_listing_json's `places.list`, read by `adPageView` (src/features/ad-page/public-listing.ts) into the view's new optional `placeList`; ListingDetail names the places from `placeList` when it is given and from the country tree otherwise. For data in general: NONE YET — the QueryState mechanism (INC-945, INC-947).
CONSUMERS (grep of 0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d: `places` in src/features/posting/preview/listing-detail.tsx, and every builder of a ListingDetail view — `grep -rn "<ListingDetail\b" src`): the title box's place link (:782–:796) and the Location box's line (:1137) — both from `places` (:273), the tree; the Maps query (:399) reads the tree's ancestors for an address only (no box); the view builders: src/routes/l.$slug.tsx :197 (adPageView — the document; covered), src/features/my-listings/my-listing-page.tsx :632, src/features/admin-listings/listing-page.tsx :491, src/features/posting/preview/preview-sheet.tsx :92 (draft-built — the tree; LEFT).
COVERED HERE: the ad page (Part C). LEFT: the three draft-built views — INC-947 (the QueryState mechanism, with a census of client reads that draw text without holding its place).
CONFORMANCE GUARD: AV-9 (src/features/ad-page/public-listing.test.ts: the document's names reach the view, in its order) and LDM-2 (src/features/posting/preview/listing-detail-map.test.tsx: with the names and no tree, both place lines show at the first render); ALS-1 (e2e/ad-page-layout.spec.ts, unchanged) on the built page. HB-1 does not see data (its comment and register row 60 say so); the data census is INC-947's.
EXCEPTIONS: none.
FIVE LENSES — security: the names are the document's public columns already sent (name_en), shown as text as before · performance: the place lines no longer wait for the country tree's download on the ad page (the tree is still read for the Maps address) · failure modes: a tree that fails or is slow no longer blanks the ad page's place lines · consistency: the same text as before (entityName over the same English names, nameAm null as before), in the coverage's order · future growth: a builder that has the names passes them; the rest keep the tree.
FORWARD-SCAN: the QueryState mechanism takes the draft-built views (INC-947). REGISTER: row 60's note (Part D).

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-34f-2.md and paste its sha256sum and byte count (the carrying message states both; a difference is a STOP). Then roadmap.md, with your editing tool: on line 3, the text after "The brief in force: " up to and including `(Foundations turn 34f: a late part holds its box and a test reads a layout whole — INC-940; register rows 60 and 61)` becomes `docs/governance/briefs/foundations-turn-34f-2.md (Foundations turn 34f, continued after its stop 1: the ad page's place names come with the page — INC-947; then turn 34f's review, report and landing)` (everything after it stays, as it is). The roadmap's other lines change in Part D, by the applier — none of its blocks touches line 3. Commit `turn 34f-2: step 0 — brief saved`.

HOW TO WORK
- Order: Part A (.claude/rules/00-executor-protocol.md step 1; <START> below means the BASE line); STEP 0; Parts B, C, D; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT; the landing (`bun .claude/hooks/land.ts`). Do not stop anywhere else.
- EXACT TEXT: every block is applied ONLY by `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f-2.md <paths>` with the paths each part names — never retyped, never edited or reflowed by hand. Every file a block writes is already in Prettier's form. A refusal from the applier is a STOP that pastes its line. Before applying, check that no block's OLD or NEW text touches roadmap line 3 (S454). If your context is compacted mid-turn, re-read the saved brief before the next part.
- THE FILES: the SCOPE block above, plus from the standing allowance only docs/governance/briefs/foundations-turn-34f-2.md, roadmap.md, docs/_changelog.md, docs/features/ad-page.md, docs/governance/mechanisms.md and docs/governance/reports/foundations-turn-34f-2.report.md. Anything else is a STOP naming the file and why.
- EVERY COMMIT GREEN-SHAPED: before each commit `bun run typecheck`, `bun run lint` and the tests the part touched pass. Commits, with titles that claim only what happened: STEP 0; Parts B and C together (`turn 34f-2 parts B-C: the ad page's place names come from the server's document`); Part D (`turn 34f-2 part D: INC-947, INC-948, INC-940's later word, the docs`); the report. Red first is shown, never committed.
- touching e2e/**: nothing under e2e/ changes in this turn (ALS-1 is the proof, as written).
- Local runs: the touched unit tests as you go and the unit suite whole at THE CHECKS; browser tests only at THE END-TO-END CHECK. CI runs every test on every commit.
- Behaviour contract: the ad page's title-box place link and Location-box place line show the same names as before, in the same order, from the first paint instead of after the country tree; the owner's, staff's and the wizard's views are unchanged; nothing else changes.
- Knowledge K: K1 the census above is the supervisor's, at 0026bd30ec38cd7e85bc3ef66c6ab86ce36dcb3d — re-run `grep -rn "<ListingDetail\b" src --include=*.tsx | grep -v test` (expected: 4 lines) and `grep -n "places\.join\|const places" src/features/posting/preview/listing-detail.tsx` (expected: 6 lines) and paste them. K2 the report lists every sibling the greps or your reading find outside these lists (expected: none). K3–K6 do not arise.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — ORIENT AND CI.
A1. Part A exactly as .claude/rules/00-executor-protocol.md step 1 says; paste `git rev-parse HEAD origin/dev` — HEAD must equal origin/dev. If origin/dev is not BASE, paste `git diff --name-only BASE..origin/dev`; a path in SCOPE or named in a part is a STOP. CI on BASE: SUCCESS on 0026bd30 (run 40560297547, completed 18:54:35Z; main promoted; no failing job, no flaky test — ALS-1 passed on both projects there). Paste `git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (the two-step check). A red on BASE other than ALS-1 at mobile-360 (stop 1's finding, fixed here) and PW-30 (INC-948) is read first in e2e-last-failure.md and guards-last-failure.md, fixed first at its root (G21, G38) and named in the report; ALS-1's and PW-30's bodies are pasted in the report either way.

PART B — THE TESTS, RED FIRST (applied, shown red, NOT committed).
B1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f-2.md src/features/ad-page/public-listing.test.ts src/features/posting/preview/listing-detail-map.test.tsx`.
B2. RED against BASE's code (shown, not committed): `bunx vitest run src/features/ad-page/public-listing.test.ts src/features/posting/preview/listing-detail-map.test.tsx` — paste the totals and the failing ids (the supervisor's run: `Tests  2 failed | 10 passed (12)` — AV-9 (`placeList` undefined) and LDM-2 (`Unable to find an element by: [data-testid="listing-detail-places"]`)).

PART C — THE PLACE NAMES FROM THE DOCUMENT, GREEN.
C1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f-2.md src/features/posting/preview/listing-detail.tsx src/features/ad-page/public-listing.ts`.
C2. `bunx vitest run src/features/ad-page/public-listing.test.ts src/features/posting/preview` — all passed (the supervisor's run: 6 files, 67 tests); `bun run typecheck`, `bun run lint`. Commit Parts B and C.

PART D — THE RECORDS.
D1. `bash scripts/brief/apply-blocks.sh docs/governance/briefs/foundations-turn-34f-2.md --dry docs/tracking/incidental-findings.md docs/governance/mechanisms.md docs/features/ad-page.md roadmap.md docs/_changelog.md`, then the same without `--dry`; paste the output (expected: `EDIT docs/tracking/incidental-findings.md #1` · `EDIT docs/governance/mechanisms.md #1` · `EDIT docs/features/ad-page.md #1` · `EDIT docs/features/ad-page.md #2` · `EDIT roadmap.md #1` · `EDIT roadmap.md #2` · `EDIT docs/_changelog.md #1` · `applied 7 block(s) to 5 file(s)`). `grep -n '^## INC-947 \|^## INC-948 \|^Numbering: next free INC-949' docs/tracking/incidental-findings.md | cut -c1-40` — three lines, in that order; `sed -n 3p roadmap.md | cut -c1-80` — names foundations-turn-34f-2.md; paste both. Commit Part D.

THE CHECKS (in this order; `bun .claude/hooks/land.ts` runs them again before it pushes): `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-34f-2.md | sha256sum -c` — every line prints OK; `git diff <START> --stat -- supabase e2e package.json bun.lock AGENTS.md .claude .github` (empty); `bun run lint` (expected 0 errors, 39 warnings); `bun run typecheck`; `bun run test:unit` (totals: two tests more than BASE's 2016 — 2018, all passed); `bun run i18n:usage` (no change); `bun run build`; `node scripts/check-bundle-size.mjs` (paste both lines; the first paint unchanged); `bun run format:check` last.
The hash list (the files as they stand at the end of the turn; roadmap.md is checked by Part D's line):
5e66b7438a999472e10f2c7decafeacb71a86ce396445bc19dcf6bf1935005c8  docs/_changelog.md
117802d202706a6a79d12e74de2321b94f02b45b746430b9a2bc43db4a0dcfdb  docs/features/ad-page.md
012c776d4d63ed60ef57e0f0867f42dc1db6e1af6fe8dfd8e55bf5db6422e0d5  docs/governance/mechanisms.md
7e49a9866abd220f5f5e60891c5aa29f557866bb12403a1687b730672d3cc00f  docs/tracking/incidental-findings.md
5fa80048ea23b05c214e2b171c2c6d46d6f11ebd944e012008c4b9960d9e7ba7  src/features/ad-page/public-listing.test.ts
a6d80215e732c5b498e06d3fbf11f12eeff4645d390ddca47f2a5332c7d73aa5  src/features/ad-page/public-listing.ts
bbc68d21807eef6a5153646950b389ca818f4c2e700b00d6d25ed9ac49506363  src/features/posting/preview/listing-detail-map.test.tsx
881342dd556706b4a61e5f986680d488e8f9f7d8145ae0a1bcd5ff72595e1857  src/features/posting/preview/listing-detail.tsx

THE END-TO-END CHECK: `bun run e2e:local -- e2e/ad-page-layout.spec.ts e2e/ad-page.spec.ts e2e/post-wizard-where.spec.ts e2e/post-wizard-place.spec.ts` — turn 34f's four files, whole, both projects, 0 retries, fake mode; paste every count line and the server log's `[ssr-error]` count by path. ALS-1 must pass on both projects; then `bun run e2e:local -- e2e/ad-page-layout.spec.ts` twice more, alone, and paste both count lines (stop 1 saw ALS-1 pass alone and fail in the full run: three green runs of the proof, one inside the full run). PW-30 (INC-948) is expected red when its file runs whole: paste its count and first failure line and go on — it is not this turn's, and nothing in e2e/ changes for it. Any OTHER red is a STOP with its body. When the environment cannot run browsers, say so with the reason; CI on the landing is the full proof.

THE INDEPENDENT REVIEW: the `reviewer` subagent runs on the last code commit, in the FOREGROUND, over turn 34f WHOLE — `git diff 0586d7f28089e02d75d6b896a4661edd836df284..HEAD` (turn 34f's four commits, its stop and this turn) — and the turn waits for its answer (00-executor-protocol.md step 7); a BLOCKER is fixed in a new commit and reviewed again; a MAJOR or MINOR inside SCOPE is fixed only when this brief's exact text allows it, otherwise listed under Departures for a ruling; the imported record text (Part D, and turn 34f's Part E) is never changed here. Its last line goes into the report word for word.

THE COMPLETION REPORT: docs/governance/reports/foundations-turn-34f-2.report.md — the completion report of turn 34f WHOLE (both briefs; turn 34f's own report was not written: its stop 1 waited for this ruling), with the twelve headings of .claude/rules/60-report.md, each kept short. Base: 0586d7f28089e02d75d6b896a4661edd836df284 (turn 34f's BASE). (1) done or not done by brief, part and step — turn 34f's parts as its stop 1 recorded them, this turn's in full; (2) the file list from `git diff --name-only 0586d7f28089e02d75d6b896a4661edd836df284`; (3) the behaviour contract of both briefs; (4) turn 34f's K1 lines (from its stop report) and this turn's; (5) every red-first and green line of both briefs, the unit totals and the browser count lines; (6) the K2 lines; (7) HB-1, BX-1 and both allowlists' counts; (8) "none" for strings with the check that proves it; (9) "none" for migrations; (10) every departure of both briefs — stop 1 and this ruling named; (11) the first six lines of ci-status.md for the last commit you can read; (12) every limit. Commit it (`turn 34f-2: report`), then land: `bun .claude/hooks/land.ts`. When it prints `LANDED <sha>`, END THE TURN; the supervisor reads the run.

Decisions made here (the supervisor's, under G17; listed for the operator as overridable): the place line is cured by not being late (the document's names) rather than by reserving a line of unknown length or by waiting in the test; the draft-built views keep the tree until the QueryState mechanism (INC-947); the view's `placeList` carries the English names and `entityName` names them exactly as before (no Amharic name from the document — the shown text does not change); PW-30 is registered (INC-948) and left untouched; ALS-1 runs three times locally because stop 1 saw it pass alone and fail in the full run; the completion report covers turn 34f whole.

THE BLOCKS (applied by the parts above; each part names its paths).

EDIT src/features/ad-page/public-listing.test.ts #1
OLD-BEGIN

it("AV-8 a definition's fact_rank and is_filterable travel into the view", () => {
OLD-END
NEW-BEGIN

it("AV-9 the coverage places' names travel into the view in the document's order (INC-940)", () => {
  const doc = document();
  doc.places.coverage = ["b", "a"];
  doc.places.list = [
    {
      id: "b",
      name_en: "Bole",
      name_am: null,
      level: "subcity",
      slug: "bole",
      country_code: "ET",
      position: 0,
      map_visible: true,
    },
    {
      id: "a",
      name_en: "Addis Ababa",
      name_am: null,
      level: "city",
      slug: "addis-ababa",
      country_code: "ET",
      position: 1,
      map_visible: true,
    },
  ];
  expect(adPageView(doc, "en").placeList).toEqual([
    { id: "b", nameEn: "Bole" },
    { id: "a", nameEn: "Addis Ababa" },
  ]);
});

it("AV-8 a definition's fact_rank and is_filterable travel into the view", () => {
NEW-END

EDIT src/features/posting/preview/listing-detail-map.test.tsx #1
OLD-BEGIN
  });
});
OLD-END
NEW-BEGIN
  });
});

/**
 * INC-940 (turn 34f stop 1) — ALS-1 on mobile-360: the Location box grew 32 px when the place line
 * arrived with the country tree after the page had painted. The ad page's view carries the places'
 * names from the server's document, so both place lines are in the first paint.
 */
describe("the ad page's place lines come with the page (INC-940)", () => {
  it("LDM-2 with the document's names and no country tree, the title box and the Location box show the places at once", () => {
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        country="ET"
        coverage={["scratch-b", "scratch-a"]}
        placeList={[
          { id: "scratch-b", nameEn: "Scratch Subcity" },
          { id: "scratch-a", nameEn: "Scratch City" },
        ]}
        directions="scratch directions"
      />,
    );
    expect(screen.getByTestId("listing-detail-places")).toHaveTextContent(
      "Scratch Subcity, Scratch City",
    );
    expect(screen.getByTestId("listing-detail-location")).toHaveTextContent(
      "Scratch Subcity, Scratch City",
    );
  });
});
NEW-END

EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
  coverage: string[];
  country: string | null;
OLD-END
NEW-BEGIN
  coverage: string[];
  /**
   * INC-940 — the coverage places' names as the server's document sends them (the ad page), so the
   * place lines are in the first paint; absent (the seller's and staff's views, built from a draft),
   * the names come from the country tree once it has loaded.
   */
  placeList?: ReadonlyArray<{ id: string; nameEn: string }>;
  country: string | null;
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN

  const places = view.coverage
    .map((id) => nodes.find((node) => node.id === id) ?? null)
    .filter((node): node is TreeNode => node !== null)
    .map((node) =>
      entityName(
        "location",
        { id: node.id, nameEn: node.nameEn ?? node.slug, nameAm: null },
        entities,
      ),
    );

OLD-END
NEW-BEGIN

  const places = (
    view.placeList ??
    view.coverage
      .map((id) => nodes.find((node) => node.id === id) ?? null)
      .filter((node): node is TreeNode => node !== null)
      .map((node) => ({ id: node.id, nameEn: node.nameEn ?? node.slug }))
  ).map((place) =>
    entityName("location", { id: place.id, nameEn: place.nameEn, nameAm: null }, entities),
  );

NEW-END

EDIT src/features/ad-page/public-listing.ts #1
OLD-BEGIN
    coverage: doc.places.coverage,
    country: doc.country,
OLD-END
NEW-BEGIN
    coverage: doc.places.coverage,
    // INC-940 — the place lines come with the page, never after the country tree.
    placeList: doc.places.list.map((place) => ({ id: place.id, nameEn: place.name_en })),
    country: doc.country,
NEW-END

EDIT docs/tracking/incidental-findings.md #1
OLD-BEGIN
Numbering: next free INC-947.
OLD-END
NEW-BEGIN
## INC-947 — text a page draws from data read after the first paint takes no room until it arrives (2026-10-27; Foundations turn 34f stop 1 — ALS-1 red on mobile-360)

Defect: ALS-1 (e2e/ad-page-layout.spec.ts :56) measured the Location box 32 px taller after the still map arrived: the ad page's place line (src/features/posting/preview/listing-detail.tsx :1137, and the title box's place link :782) was drawn from the country tree (`useCountryTree(view.country)`, :265), which the browser reads after the page has painted — 20 px of text and the card's 12 px gap. The server's document already carried the names (`places.list`, public_listing_json, 20261017105751), unread. The census of turn 34f (scripts/conformance/holds-its-box.test.ts) sees code that arrives late (lazy components, Suspense), not data. Fix: the ad page's view carries the places' names from the document (`placeList`, turn 34f-2: AV-9, LDM-2), so both place lines are in the first paint; LEFT — the views built from a draft, which still read the names from the tree (src/features/my-listings/my-listing-page.tsx :632, src/features/admin-listings/listing-page.tsx :491, src/features/posting/preview/preview-sheet.tsx :92), and the census of client reads that render text without holding its place, both with the QueryState mechanism (INC-945's). Class: concern "a part that arrives after the first paint holds its box" (register row 60) — its data half; mechanism NONE YET (the QueryState mechanism). Status (2026-10-27): OPEN — the ad page fixed in turn 34f-2.

## INC-948 — PW-30 fails whenever e2e/post-wizard-place.spec.ts runs whole against ethio-staging, BASE included (2026-10-27; Foundations turn 34f stop 1)

Defect: PW-30 ("review and buyer preview render option labels, units, multi-values and booleans") fails at e2e/post-wizard-place.spec.ts :782 "PW-30: no place was chosen" (`post-where-chosen` data-count 0) when the file runs whole locally against ethio-staging — this tree on both projects, BASE (`0586d7f2`, a git archive) on mobile-360, the same body — and passes alone (`--grep "PW-30 "`, both projects) and in CI on the temporary backends (one retried pass on 2026-10-27, run 40519893778, shard 6). The executor's evidence: the stop report docs/governance/reports/foundations-turn-34f.stop-1.md. Cause not read (G3: a hypothesis only — a test earlier in the file leaves the step's region or city picker on a place PW-30 does not pick, or staging's place rows differ from the temporary backend's). Fix: the next turn that runs the file reads PW-30's trace and the step's DOM (G21) before any change; no retry, no wait raised (G38). Class: concern "a test chooses its place from its own scratch state" (J1, J6) — mechanism unknown until the cause is read. Status (2026-10-27): OPEN.

INC-940 (AP-36): turn 34f's stop 1 — its own proof ALS-1 found a second late part in the Location box, the place line drawn from the country tree after the page paints (INC-947); turn 34f-2 draws both of the ad page's place lines from the server's document. The judge stands as written.

Numbering: next free INC-949.
NEW-END

EDIT docs/governance/mechanisms.md #1
OLD-BEGIN
| 60 | A part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals CLS) — AP-36's four retried passes, the Location box growing as the still map arrived (INC-940) | `src/features/posting/map/map-frame.tsx` `MapFrame` (the reserver) over `src/features/posting/map/still-map.ts` (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey`), which the still map (`map-preview.tsx`) draws from; the provider's credit lies on the box at its foot | `scripts/conformance/holds-its-box.test.ts` — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (13 at turn 34f), HB-2 plants a text place, an empty place and a silent download; `src/features/posting/map/map-frame.test.tsx` MFR-1/2 (the frame and the map draw the same box and caption); `src/features/posting/preview/listing-detail-map.test.tsx` LDM-1; `e2e/ad-page-layout.spec.ts` ALS-1 (the built page: the Location box keeps its height when the map's three downloads are let go) | `scripts/conformance/holds-its-box-allowlist.txt` (`<file>#<name> | reason | until`): the crumbs (one line of the crumb bar), the large map and the pin map (fixed overlays), the feed's cover preload (renders nothing), the home and category feeds' spinner (INC-945 — the QueryState mechanism) | a new reserver is a name in RESERVERS; a late part is a census key | turn 34f; the images' boxes are the Picture mechanism's (roadmap) |
OLD-END
NEW-BEGIN
| 60 | A part of the page that arrives after the first paint (a `resilientLazy` or `lazy` component, anything behind `<Suspense>`) holds its box from the first paint: its place while it loads and when it cannot download is the size of what it will show, so nothing around it moves when it arrives (WCAG 2.2 predictable layout; Core Web Vitals CLS) — AP-36's four retried passes, the Location box growing as the still map arrived (INC-940) | `src/features/posting/map/map-frame.tsx` `MapFrame` (the reserver) over `src/features/posting/map/still-map.ts` (`STILL_MAP_BOX`, `STILL_MAP_CREDIT`, `stillMapCaptionKey`), which the still map (`map-preview.tsx`) draws from; the provider's credit lies on the box at its foot | `scripts/conformance/holds-its-box.test.ts` — HB-1 enumerates every resilientLazy/lazy binding and every Suspense in src/ (13 at turn 34f), HB-2 plants a text place, an empty place and a silent download; `src/features/posting/map/map-frame.test.tsx` MFR-1/2 (the frame and the map draw the same box and caption); `src/features/posting/preview/listing-detail-map.test.tsx` LDM-1; `e2e/ad-page-layout.spec.ts` ALS-1 (the built page: the Location box keeps its height when the map's three downloads are let go) | `scripts/conformance/holds-its-box-allowlist.txt` (`<file>#<name> | reason | until`): the crumbs (one line of the crumb bar), the large map and the pin map (fixed overlays), the feed's cover preload (renders nothing), the home and category feeds' spinner (INC-945 — the QueryState mechanism) | a new reserver is a name in RESERVERS; a late part is a census key | turn 34f; the images' boxes are the Picture mechanism's (roadmap); data read after the paint is this row's data half — the ad page's place names come with the page in turn 34f-2 (INC-947), the rest with the QueryState mechanism |
NEW-END

EDIT docs/features/ad-page.md #1
OLD-BEGIN

Foundations turn 34f (INC-940): ALS-1 (e2e/ad-page-layout.spec.ts), LDM-1, MFR-1, MFR-2; AP-36, AP-37, AP-41, AP-42, AP-44, AP-45, AP-46, AP-47, AP-48 and AP-50 changed (their boxes read through layoutBoxes).
OLD-END
NEW-BEGIN

Foundations turn 34f-2 (INC-940, INC-947): LDM-2, AV-9.
Foundations turn 34f (INC-940): ALS-1 (e2e/ad-page-layout.spec.ts), LDM-1, MFR-1, MFR-2; AP-36, AP-37, AP-41, AP-42, AP-44, AP-45, AP-46, AP-47, AP-48 and AP-50 changed (their boxes read through layoutBoxes).
NEW-END
EDIT docs/features/ad-page.md #2
OLD-BEGIN
Foundations turn 34f (INC-940): the still map holds its box from the first paint. Its place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx) — the still map's box with its word and its caption, drawn from the same module the map draws from (still-map.ts) — and the provider's credit lies on the box at its foot, so the Details | Description | Location row keeps its height when the map, its library and its credit arrive (AP-36 retried four times while the Location box grew between two reads). The census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or on its allowlist.
OLD-END
NEW-BEGIN
Foundations turn 34f (INC-940): the still map holds its box from the first paint. Its place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx) — the still map's box with its word and its caption, drawn from the same module the map draws from (still-map.ts) — and the provider's credit lies on the box at its foot, so the Details | Description | Location row keeps its height when the map, its library and its credit arrive (AP-36 retried four times while the Location box grew between two reads). The census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or on its allowlist.

Foundations turn 34f-2 (INC-947): the ad page's two place lines — the title box's place link and the Location box's line — take the places' names from the server's document (`places.list` → the view's `placeList`), so they are in the first paint; the owner's, staff's and the wizard's views, built from a draft, still name the places from the country tree (INC-947, with the QueryState mechanism).
NEW-END

EDIT roadmap.md #1
OLD-BEGIN
  - [ ] INC-946 — the 68 tests and helpers in 18 files that read boxes one by one move onto layoutBoxes (e2e/helpers/ui.ts), file by file or with the turn that next edits the file; each leaves scripts/conformance/layout-reads-allowlist.txt (40 of them in e2e/shell.spec.ts)
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
OLD-END
NEW-BEGIN
  - [ ] INC-946 — the 68 tests and helpers in 18 files that read boxes one by one move onto layoutBoxes (e2e/helpers/ui.ts), file by file or with the turn that next edits the file; each leaves scripts/conformance/layout-reads-allowlist.txt (40 of them in e2e/shell.spec.ts)
  - [ ] INC-947 — the owner's, staff's and the wizard's ad views (src/features/my-listings/my-listing-page.tsx :632, src/features/admin-listings/listing-page.tsx :491, src/features/posting/preview/preview-sheet.tsx :92) name their places from the country tree after the paint; with the QueryState mechanism, and a census of client reads that draw text without holding its place
  - [ ] INC-948 — PW-30 fails whenever e2e/post-wizard-place.spec.ts runs whole against ethio-staging (BASE too): its trace and the step's DOM read first (G21), then the cause fixed
  - [ ] Records owed by turn 34f (a Lovable turn — .claude/\*\* is closed to the Claude Code executor): .claude/rules/20-tests.md's "Harness helpers you must use" gains `layoutBoxes(targets)` beside `settled(page)` (the binding text, docs/features/e2e-harness.md, has it from turn 34f)
NEW-END
EDIT roadmap.md #2
OLD-BEGIN
  - [ ] Turn 34f (docs/governance/briefs/foundations-turn-34f.md; no migration; the Claude Code executor; G0) — INC-940 (AP-36's four retried passes): a part of the page that arrives after the first paint holds its box — MapFrame (src/features/posting/map/map-frame.tsx) over still-map.ts, the still map's places on the ad page and in the wizard, the provider's credit on the box at its foot; the census scripts/conformance/holds-its-box.test.ts (HB-1…HB-3, register row 60); a test reads a layout whole — layoutBoxes (e2e/helpers/ui.ts), the ad page's ten layout tests moved onto it, the census scripts/conformance/layout-reads.test.ts (BX-1, BX-2, register row 61); MFR-1, MFR-2, LDM-1, ALS-1 (e2e/ad-page-layout.spec.ts). Its judge: the operator's Flake check (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8) with no failure, and no AP-36 flake line in the next 20 CI runs.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
OLD-END
NEW-BEGIN
  - [ ] Turn 34f (docs/governance/briefs/foundations-turn-34f.md; no migration; the Claude Code executor; G0) — INC-940 (AP-36's four retried passes): a part of the page that arrives after the first paint holds its box — MapFrame (src/features/posting/map/map-frame.tsx) over still-map.ts, the still map's places on the ad page and in the wizard, the provider's credit on the box at its foot; the census scripts/conformance/holds-its-box.test.ts (HB-1…HB-3, register row 60); a test reads a layout whole — layoutBoxes (e2e/helpers/ui.ts), the ad page's ten layout tests moved onto it, the census scripts/conformance/layout-reads.test.ts (BX-1, BX-2, register row 61); MFR-1, MFR-2, LDM-1, ALS-1 (e2e/ad-page-layout.spec.ts). Its judge: the operator's Flake check (specs e2e/ad-page.spec.ts e2e/ad-page-layout.spec.ts, grep `AP-36 |AP-37 |AP-42 |AP-45 |AP-46 |ALS-1 `, repeat 12, workers 8) with no failure, and no AP-36 flake line in the next 20 CI runs.
  - [ ] Turn 34f-2 (docs/governance/briefs/foundations-turn-34f-2.md; no migration; the Claude Code executor; G0) — turn 34f's stop 1 (docs/governance/reports/foundations-turn-34f.stop-1.md; ALS-1 red on mobile-360, the place line drawn from the country tree after the paint — INC-947): the ad page's view carries the places' names from the server's document (`placeList`; AV-9, LDM-2), so both of its place lines are in the first paint; INC-948 (PW-30) registered; then turn 34f's end-to-end check, review, report and landing.
  - [ ] Turns 35–37 — speed S11 continued (DEC-261): the anonymous reference reads (the language bundles, the price units, a public legal text) behind cached GET routes — DEC-263's groundwork; the signed-in and staff modules still frozen in the vendor-seams allowlist (INC-877) onto the door.
NEW-END

EDIT docs/_changelog.md #1
OLD-BEGIN
- Foundations turn 34f (2026-10-27; INC-940; register rows 60 and 61) — a part of the page that arrives after the first paint holds its box: the still map's place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx), the still map's box and caption drawn from the module the map draws from (still-map.ts), and the provider's credit lies on the box at its foot; the ad page and the wizard's pin preview use it; the census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or its allowlist (the feeds' spinners: INC-945). A test reads a layout whole: layoutBoxes (e2e/helpers/ui.ts) reads every compared box in one frame once it has stopped moving; the ad page's ten layout tests use it; the census scripts/conformance/layout-reads.test.ts lists the rest until they move (INC-946). New tests: MFR-1, MFR-2, LDM-1, ALS-1, HB-1…HB-3, BX-1, BX-2.
OLD-END
NEW-BEGIN
- Foundations turn 34f (2026-10-27; INC-940; register rows 60 and 61) — a part of the page that arrives after the first paint holds its box: the still map's place while its code downloads and when it cannot download is MapFrame (src/features/posting/map/map-frame.tsx), the still map's box and caption drawn from the module the map draws from (still-map.ts), and the provider's credit lies on the box at its foot; the ad page and the wizard's pin preview use it; the census scripts/conformance/holds-its-box.test.ts keeps every late part on a reserver or its allowlist (the feeds' spinners: INC-945). A test reads a layout whole: layoutBoxes (e2e/helpers/ui.ts) reads every compared box in one frame once it has stopped moving; the ad page's ten layout tests use it; the census scripts/conformance/layout-reads.test.ts lists the rest until they move (INC-946). New tests: MFR-1, MFR-2, LDM-1, ALS-1, HB-1…HB-3, BX-1, BX-2.

- Foundations turn 34f-2 (2026-10-27; INC-947) — turn 34f's own proof (ALS-1) found a second late part on the ad page: the place line, named from the country tree after the paint. The ad page's view now carries the places' names from the server's document (`places.list` → `placeList`), so the title box's place link and the Location box's line are in the first paint; the draft-built views keep the tree (INC-947). INC-948 (PW-30 red when its file runs whole against ethio-staging) registered. New tests: AV-9, LDM-2.
NEW-END
```
