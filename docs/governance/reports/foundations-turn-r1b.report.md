# Foundations turn R1b — report (stopped at the split, after item 1)

1. **Step 0.** `docs/governance/briefs/foundations-turn-r1b.md` saved in one fenced block; sha256 of the text between BEGIN and END = `22cdbba1ed945afc509cd1db31c859624704024298c3852782fcb4e84e87f89c` (equals the value in the ruling). Roadmap line 3 names it.

2. **CI line.** Last completed run read at the raw ci-evidence address: `8e7feb84` · run 40992012460 · **FAILURE** — the nine failures of INC-1007 (FT-1, SR-1, L1/L2, L3, PW-99), fixed in item 1 below.

3. **INC-1007.**
   - CSS diff (`src/styles.css`): the `html { scrollbar-gutter: stable; }` block is removed; `html body[data-scroll-locked] { margin-right: 0 !important; }` stays as the one mechanism; the comment above it now says why no gutter is used (INC-1007: headless Chromium reserves it with hidden scrollbars; desktop browsers leave an empty strip on pages that do not scroll).
   - CF-SHIFT-1 (`scripts/conformance/overlay-shift.test.ts`): requires the neutralisation; refuses `scrollbar-gutter` on any non-comment line under src/, `src/styles.css` included, with the reason INC-1007; still refuses the lock attribute or variable outside src/styles.css. Planted proofs, each refused: (a) a missing neutralisation; (b) a gutter put back in src/styles.css; (c) a second mechanism elsewhere (a planted `body[data-scroll-locked]` rule and a planted `[scrollbar-gutter:stable]` class). 2/2 passed.
   - Register row 77 now says the mechanism is the neutralised margin alone and names INC-1007.
   - Browser proof: `bun run e2e:local -- e2e/overlay-shift.spec.ts e2e/shell.spec.ts e2e/post-wizard-where.spec.ts`, both projects, each file whole, retries 0 (no retry line in the log): **192 passed, 62 skipped, 0 failed (13.8 m)**. FT-1, SR-1, PW-99, OVS-1 and OVS-2 passed in desktop-1280 and mobile-360; L1/L2 and L3 passed in desktop-1280 (skipped by design in mobile-360). No assertion changed. Local runs need `E2E_CHROMIUM_PATH` set to the sandbox's Playwright Chromium (the browser guard named it).

4. **R1b (foundations-turn-r1a.md items 5–11): not started.** Stopped at the ruling's split point after item 1 with checks green; items 5–11 (the shared sub-menu mechanism, overlay-loader loading, row heights, touch tests, the ‹ Main menu row, per-page growth table, docs and register row, the OVS panel case) remain whole for the next turn. No per-page growth table: no app code beyond the CSS rule changed.

5. **Unit count.** 2,267 / 2,267.

6. **Checks' last line.** `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 619s` (one earlier run failed lint on the guard's formatting; fixed and the whole run repeated). NOT RUN: dependency installs (sandbox has them), SARIF upload, dependency audit (advisory service unreachable), e2e preflight/merge steps and promote (GitHub-only).

7. **K2.** Unchanged from R1a-2: two non-modal overlays predating the rule (app-rail.tsx's menu sheet, row-actions.tsx's menu) — reported, not touched.

8. **`git diff --name-only 0786626d`.**
   - docs/governance/briefs/foundations-turn-r1b.md
   - docs/governance/mechanisms.md
   - docs/governance/reports/foundations-turn-r1b.report.md
   - roadmap.md
   - scripts/conformance/overlay-shift.test.ts
   - src/styles.css

Done: step 0, INC-1007 fix, guard, register row, nine tests and OVS green. Left: R1b items 5–11. CI: 8e7feb84 FAILURE (INC-1007); final-commit CI not yet seen.
