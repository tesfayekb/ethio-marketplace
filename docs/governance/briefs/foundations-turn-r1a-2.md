# Foundations turn R1a-2 (ruling, saved byte for byte)

````text
RULING — Foundations turn R1a, continue (after stop 1, the time limit): finish R1a, then R1b if the turn allows. Base: dev 9d3e46d6. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1a-2.md; roadmap line 3 names it beside foundations-turn-r1a.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1a-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names both R1a files.

VERIFIED (dev 9d3e46d6, fresh clone): step 0's sha256 d63f27c2… matches; pickCity reads the city's own region from its row and awaits each option before choosing it, with no retry and no raised wait. CI on f66ca04c (J-1's final commit) is SUCCESS with 0 flaky; main is promoted.

CI FIRST: read the last completed run before the push. If it is red, fix it first.

1. PGH-E2 and INC-715 — a correction to my R1a ruling. A single green pass is not the flake proof, and CI's repeat lane on f66ca04c did not run page-head.spec.ts: the spec was unchanged, and the helper change did not select it. So INC-715's rule is NOT retired yet.
   - Run PGH-E2 with --repeat-each 12, both projects, retries 0, and paste the count.
   - All green ⇒ I retire INC-715's rule by a decision.
   - Any failure ⇒ reshape PGH-E2 by INC-715's rule (one language switch per test), and read the failure body first.
2. INC-948 — the class, not the instance (G0). Your K2 found the same racy walk in post-wizard-pricing.spec.ts :1039 and post-wizard-category.spec.ts :977. Each selects a region and then reads the city options with a bare `count()`, which never waits.
   - THE SYSTEM. CONCERN: a test that chooses a city in the posting form's place step waits for what a person sees. MECHANISM: one shared helper in e2e/helpers/ (your pickCity, moved out of post-wizard-place.spec.ts), never a copy in a spec file.
   - Census by definition: every e2e site that chooses a city in that step (post-where-region, post-where-city). Today that is post-wizard-place, post-wizard-pricing, post-wizard-category, post-wizard-where, post-wizard-bundle2 and my-listings-ad. Each moves onto the helper or is listed with why it waits already (selectOption waits for its option).
   - The three walks are replaced by the helper. Each keeps its INC-235 refusal text, which says what it saw.
   - Proof: each touched spec file whole, both projects, retries 0; then PW-30 with --repeat-each 12.
3. Part 0 — INC-1005, as ruled in foundations-turn-r1a.md items 1–4: the measurement without --hide-scrollbars, the gutter rule, the neutralisation in src/styles.css only if the measurement shows a doubled gutter, CF-SHIFT-1, OVS-1/OVS-2 red on the base and then green.
4. Then R1b, as ruled in foundations-turn-r1a.md items 5–11, if the turn allows.

SPLIT: if the platform's time limit nears, stop at a clean point with the checks green, after item 3 or inside R1b. Push and report three lines (done, left, CI).

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted.

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1a.report.md:
- step 0's sha256;
- the CI line;
- PGH-E2 ×12 (both projects);
- INC-948: the helper, the census table, the proofs (files whole, PW-30 ×12);
- Part 0: the numbers before, during and after; the mechanism; CF-SHIFT-1; OVS red then green;
- R1b, item by item, done or not, and the per-page growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 51cae041.
````
