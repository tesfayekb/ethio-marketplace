Source: supervisor thread, turn 907, Mon 2026-09-28 19:09 New York.
Status at 2026-10-05: built as 611e1094 (all 25 jobs green; PW-69 to PW-71; allowlist attributions tied to tests; focusFirstRefusal); D70 (auto-scroll to the first refused field) and D71 (red border on the category list) are design rulings not recorded in the repo ledger (D-rulings next free D64 there); the repo holds the built behaviour (docs/features/posting.md W2 entry) and the allowlist, not this prompt.
Related: W2, INC-320, D70, D71, INC-325, INC-327, DEC-083 census attribution, ssr-error-allowlist.txt.

R1 is verified and clean. The run you saw as red finished green at 23:09 UTC (run 36494534782), and main was promoted to `4e2a9aad`.

- **The only red job was the fast lane.** It only signals and never blocks promotion, and the full test set passed. Its report shows no failure behind the red, so I'm watching it: if the fast lane goes red again with nothing to show why, it gets an incident number.
- **The server-error census now reads every log.** It says "Logs read: all 9 · unavailable: none".
- **On its first real run it found six messages not on the allowlist:**
  - "listing not found" came up 102 times (INC-323).
  - One is a database error on a green run: `duplicate key … category_attribute_links_card_rank_unique` during an attributes import. The DEC-083 rule says that gets an incident number the same day, so it's **INC-327**.
  - The other four are refusals that are probably deliberate test cases: two "permission denied", "step-up required" and "strings emptyFile". They join the allowlist only once they're matched to the tests that cause them.
- **Accessibility shows 20 checks.** That's 10 checks run twice, because the fast lane re-ran the changed accessibility test file; that's expected, not a defect. The one real problem is still wizard step 1 on a phone. Likely cause, not yet confirmed: the mobile step strip scrolls sideways but has no tappable steps on step 1, so a keyboard can't reach it.

## Now, in order

1. **Supabase → ethio-staging → Authentication → Email provider settings → turn on "Prevent use of leaked passwords" → Save.** It's a Pro-plan feature; if the switch is greyed out, tell me. The next CI run is the check: if a sign-up test is refused over its password, I'll fix the test.
2. **Paste this into Lovable:**

---
```
W2 — model shows "Choose" after Back (INC-320), focus the first refused field (D70), soft border on the category picker (D71), the step-1 mobile a11y finding (INC-325), plus a read-only census attribution. Tier B. No migration.

SCOPE — you may touch only:
  src/features/posting/step-specifications.tsx   (PART A)
  src/features/posting/field.tsx, src/features/posting/wizard.tsx   (PART B)
  src/features/posting/step-category.tsx   (PART C)
  src/features/posting/mobile-step-strip.tsx   (PART D; or the element axe actually names — say which)
  e2e/post-wizard.spec.ts   (PW-69, PW-70, PW-71 after PW-73)
  docs/tracking/ssr-error-allowlist.txt   (PART E, attributed additions only)
  docs/features/posting.md, docs/features/e2e-harness.md, docs/_changelog.md
Census first: cite the lines you change.

PART A — INC-320. A big list (model, > EAGER_OPTION_LIMIT, step-specifications.tsx:63) stays lazy (DEC-053; openOptions :315–327 fires on focus/pointer-down, :1336–1337), so on re-entry a select mounts with a stored answer and no matching <option>, and the browser shows the placeholder while the draft still holds the value. Fix: beside the eager effect (:357–359), request the list of every select that mounts WITH a stored answer — once per key per mount (hold requested keys in a ref), keyed on the list of answered select keys, never on every value change. Comment: DEC-053 amended — an answered list is read up front so its answer can be shown. PW-69: seller; a leaf with a make→model cascade seeded as scratch definitions (G27 — never the real Vehicles rows); choose make and model → Next through to step 5 → Back to step 3 → the model select shows its chosen option's label with no tap (toHaveValue on the select, data-options "ready").

PART B — D70. After a strict refusal, the first refused control on the current step scrolls into view (block center) and takes focus. Export a helper from field.tsx built on focusField (:176–185) that takes the refusals, the current step and the spec fields, keeps summaryRefusals' control-bearing entries owned by this step (stepOfField), and focuses the one that comes first in document order (compareDocumentPosition), not array order. Call it from one effect in wizard.tsx keyed on draft.refusals. No change to the summary. PW-70: reach step 4, clear the title, Next → post-title is focused (toBeFocused) and in the viewport.

PART C — D71. The step-1 group (step-category.tsx:147–154) wears the soft required border (border-destructive/40, the U6-C1-R2 soft state) while no leaf is chosen and nothing has been refused; full destructive only after a refusal (unchanged); no border once a leaf is chosen. Add data-empty="1"/"0" on post-category-group. At every drill-down level the same rule holds. PW-71: /post → group data-empty="1" with the soft class; choose a leaf → data-empty="0".

PART D — INC-325. axe reports scrollable-region-focusable (serious) on wizard step 1 at mobile-360 only. Hypothesis (G3 — confirm from axe's node target before fixing): the mobile step strip (mobile-step-strip.tsx:33–36, overflow-x-auto, lg:hidden) has no focusable child on step 1. Fix the element axe names: tabIndex={0} on the scroll container (it already carries an aria-label). The a11y spec must then read wizard-1 mobile-360 serious=0.

PART E — census attribution (read-only except the allowlist). From run 36494534782's census, attribute each off-allowlist message to the test that provokes it, with the step: `listing not found` ×102 (smoke, shard 2, 5, changed — which tests, and does the save arrive after the test's cleanup deleted the draft?); `export_failed permission denied`, `preview_failed permission denied`, `commit_failed step-up required`, `strings emptyFile` (deny/negative tests?); `commit_failed duplicate key … category_attribute_links_card_rank_unique` (INC-327 — a deliberate conflict test, or a planner gap letting a rank collision reach the commit?). Add to the allowlist only the messages a named test deliberately provokes, each with its test id. Change no code for INC-323 or INC-327; report mechanism with lines.

DOCS: posting.md — INC-320/D70/D71 notes; e2e-harness.md — the allowlist additions; changelog line.
INVARIANTS: DEC-023 local run of post-wizard.spec.ts and a11y.spec.ts on both projects; whole-tree format:check; report only on green; nothing outside scope; limitations before the end.
COMPLETION REPORT: the PART A effect as landed; the focus helper; the element axe named and its fix; PW-69/70/71 results; the attribution table (message · test · mechanism · allowlisted or not).
```
---

3. After Lovable reports, I verify. Then you **Publish** and do a two-minute walk at phone width:
   - Car make and model → go forward → Back → the model still shows.
   - Leave a required field empty → Next → the page scrolls to it and puts the cursor in it.
   - Step 1 has a soft red border until you pick a category.
4. Then turn on the same leaked-password switch on **ethio-prod**.

Next in the queue: the draft-save locking fix (INC-324) together with the "listing not found" and card-rank incidents, depending on what Part E finds.
