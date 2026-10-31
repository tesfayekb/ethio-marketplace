```text
RULING — turn B2 (Sage S3): the feed heading and the listing card, with the operator's dark card (C) and place line (D269). Base: dev 9155df66. Tier B (the home page and every card). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-b2.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-b2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

F4b VERIFIED (dev 53aaccf3, fresh clone):
- step 0's sha256 d892d08c… matches; AGENTS.md untouched;
- the picker marks its list `data-settled` and LY-6 and CL-E wait for it, and LY-6's bottom-edge case accepts either side under D267 (G38, with its reason);
- turnBase() reads the brief's `Base: dev` or fails (TC-E5);
- LIST_LABEL, LIST_SEPARATOR and LIST_ICON with DropdownMenuIcon; the account menu on the facade's parts; "Profile" opens /account; CF-LIST-1 rules 8 and 9 with CL-8, CL-9 and CL-U7; CL-E10;
- nine staff-page ceilings raised with the popover as their cause (S6 takes it off their first paint).
CI on 53aaccf3 (run 41199774824): 2,384 browser tests passed and 0 failed, but the run is red on the two items below; lane 1's tests did not run. CI on 9155df66 (run 41202111497; the same code and the S6 plan): every lane green, lane 1 included, 0 flaky; red only on /dev/style's margin. The operator published F4 from it.

CI FIRST: two items from the run on 53aaccf3, fixed first:
- The first-paint budget: /dev/style 245.9 KiB sits in the NEAR band (0.3 KiB) of its 246 KiB ceiling. DEC-296: ceilingFor(245.9) = 247.
- Lane 1's backend start (INC-1028), ruled by the operator in DEC-316 (2026-10-31 08:4x New York):
  - The evidence: 20261029073342 statement 24, "ERROR: refused:replay (SQLSTATE P0001)", with cron jobs 0, appliers 1, autovacuum 0 and other sessions 0.
  - The cause, reproduced by the supervisor on PostgreSQL 16 with that file's job_runs table and job_run_claim, the proof's CL-1 to CL-3 copied verbatim:
    - the proof reads its clock once (:166, v_now); job_run_claim reads its own at each call (:41);
    - when a whole second passes between the two, CL-3's "ahead" check (:224, v_now + 61) is only 60 s ahead of the function's clock;
    - the window lets it through, the claim finds no row and raises 'refused:replay', and the handler, which expects 'refused:window', raises it again.
    - A forced 1.05 s pause after the DECLARE fails every time (CONTEXT "job_run_claim(text,bigint) line 11 at RAISE", called from `v_now + 61`). A natural gap of 10 ms fails 1 time in 100; 40 ms, 7 in 100.
    - It is not cron and not another session: DEC-313's fallback, a database-only first start, is not built. DEC-313's start stays as it is.
  - The fix: one patch_copy line in .github/workflows/local-backend-proof.yml, beside the working copy's named fixes (:346–:357; DEC-209). The landed file is never edited (docs/governance/migrations.md :4).
    - The supervisor's tested form changes line 224 only: `s/job_run_claim('name-check-catchup', v_now + 61)/job_run_claim('name-check-catchup', floor(extract(epoch FROM clock_timestamp()))::bigint + 62)/`. The ahead check reads the clock just before the call, and stays past the 60 s edge across one tick. It still expects 'refused:window'.
    - Patched, it failed 0 times in 120 (a forced 1.05 s and 2.3 s pause, and a 40 ms gap, 40 runs each).
    - Its working-copy line names INC-1028 and DEC-316.
  - The census, by definition, across supabase/migrations whole: every landed proof that judges a value at a window edge against a clock it read earlier, while the code under test reads its own. Each is patched the same way, or named safe with its reason, in the report.
  - The guard: CF-PROOF-KEY-1's allowlist line for this file (scripts/conformance/migration-proof-keys-allowlist.txt :5) states the true cause. If a guard for the census's class is not sound, say why in one line; the records turn lists it as guard debt (G0.4).
Read the run on 9155df66 at the start and AGAIN before your push (S502). Any other red that is not infrastructure is fixed first, from its failure body.

THE OPERATOR'S WORDS:
- D262's choice (2026-10-31 06:11 New York, on /dev/style): "the dark mood cards look the same to me, we can go with cardidate C anyway".
- D269 (05:52, walk line 8): "aLSO on each cards the color for example location should not just be white".

YOUR B PLAN (060d4d60), RULED in DEC-314. This is its second half:
1. Dark card C goes live:
   - `.dark`'s card, edge and tier fills take candidate C (#28342E card and #42504A edge; the tier fills of C);
   - themes.ts follows (TH-2);
   - /dev/style keeps the three columns for later judgement.
2. §5, the feed heading (feed.tsx :286):
   - 21 px on the phone, 25 px tablet, 30 px desktop; weight 800; −0.9 px tracking; the place name in `primary`;
   - ONE_LINE_SLOT (nowrap; the fixed words whole; only the place name cuts, through CutText), in src/components/layout beside CutText, registered in mechanisms.md, for E to reuse;
   - `wrap-anywhere` leaves the heading.
   - OL-1 at 360, for every public language, in both e2e projects' fonts: every market name in the e2e catalogue shows whole. If one would cut, the phone size steps down one token until it fits.
   - OL-2: a 60-character planted name cuts, and the fixed words stay whole.
   - OL-3: the census CF-ONE-LINE-1 with a planted `wrap-anywhere` slot.
3. §6, the card:
   - body padding 13/14/14 px, compact 8–9 px on tablet and 6–7 px on phone;
   - price 16 px bold, compact 13 / 12 px bold, the price slot's minimum heights kept;
   - the Negotiable pill filled `--success-soft` with a success-ink token (#17503A light, #7FC9A6 dark), 11 px semibold, no border; never a tier token;
   - the place line: a divider (`--card-rule`) above it, 9 px top padding (6 px compact);
   - the empty picture well `--photo-empty` with its bottom separator.
4. D269: the place line, the pin and the place name, takes the leaf ink (`--leaf-ink`: #3E7A62 light, #7FC9A6 dark), not the muted grey or white.
   - Its contrast on the card is at least 4.5 : 1 in both themes, on C's dark card and on the tier fills, measured in-page.
   - If the leaf ink falls short on a tier fill, that tier's place line takes the tier's own ink.
5. LL-1, the one-card-shape law and `auto-rows-fr` hold, in both themes.

TESTS
- sage-cards.spec.ts per redesign-part-2 §6: computed styles at 390, 834 and 1440, light and dark, for the heading, the body padding, the price, the Negotiable pill, the divider, the empty well, the card's background and ring, and the place line's ink and its contrast.
- OL-1…3.
- G38: every existing test reading an old card, heading, price or place value, named old and new.
- The touched specs whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses the NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- src/components/marketplace/ (feed.tsx, listing-card.tsx, listing-picture.tsx, invite-card.tsx only if the census needs it), src/components/layout/ (surface.ts, CutText's folder for ONE_LINE_SLOT), each with its tests;
- src/styles.css, src/lib/themes.ts, src/lib/schemas/theme.ts and their tests;
- src/routes/dev.style.tsx;
- scripts/conformance/ (CF-ONE-LINE-1);
- e2e/ (sage-cards.spec.ts, every spec the G38 census names), scripts/e2e-select.ts;
- scripts/route-budgets.mjs;
- .github/workflows/local-backend-proof.yml (the patch_copy line only), scripts/conformance/migration-proof-keys-allowlist.txt and their tests;
- docs/features/design-foundation.md, docs/features/ci-local-backend.md (the working-copy line), docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- The laws step first.
- Write the report, docs/governance/reports/foundations-turn-b2.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI lines;
  - INC-1028's patch and its census;
  - the parts as built with their tokens;
  - C's values and the place line's measured contrasts;
  - OL-1…3;
  - G38;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only 9155df66.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
