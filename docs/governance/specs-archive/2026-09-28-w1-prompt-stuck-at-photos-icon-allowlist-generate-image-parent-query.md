Source: supervisor thread, turn 879, Mon 2026-09-28 03:50 New York.
Status at 2026-10-05: built as 8e0c2ecf (run 36398155321 attempt 3 SUCCESS after the staging outage INC-318; 14 files; icon allowlist 136 names); the repo holds the built rules (docs/features/posting.md INC-315 note; categories.md icon rule) and the changelog line, not this prompt.
Related: W1, INC-315, INC-316, INC-310, INC-317 (PW-61 flake), DEC-082, PW-68.

D62-1d verified — **CLEAN.** Run 36391560866 attempt 2 is SUCCESS on `1f7e0869` (25/25 jobs; preflight green = staging carries mark 20260928090000), main promoted to it. Migration tracked; constraint text exactly as briefed, comment set, P11/P12a/P12b/P13 + read-back exception-gated (a failure would have aborted both applies, so "completed" is the proof), mark last; PW-67 and PR-13 as specified; docs. No Publish needed for this one (no client change). INC-312 closes.

One new record: PW-61 flaked again (mobile-360, shard 2) — third time in 24 h → **INC-317**, root-cause work queued after W1.

## Lovable — paste this now (W1: the two walk findings + three small closures)

---
```
W1 — wizard pinned claim (INC-315), category icons off the allowlist (INC-316), plus INC-310 and one stale doc line. Tier B. No migration.

SCOPE — you may touch only:
  src/features/posting/use-draft.ts                      (PART A, one branch)
  e2e/post-wizard.spec.ts                                (PART A, ONE new test PW-68 after PW-67)
  src/lib/category-icon-names.ts                         (PART B)
  src/components/shell/category-glyphs.ts                (PART B)
  src/server/imports/registry.ts, src/server/imports/gate.ts, src/server/imports/gate.test.ts   (PART B guard)
  src/features/admin-categories/category-import-dialog.tsx, src/i18n/locales/en.ts, src/i18n/locales/am.ts   (PART B reason words)
  src/routes/api/admin/categories/generate-image.ts      (PART C, one query)
  docs/features/posting.md, docs/features/categories.md, docs/_changelog.md, the i18n usage maps if the guard requires them
Nothing else. Census first: cite the lines you change.

PART A — INC-315: a refused Next pins the claim.
WHY: Next on step 4 with an empty title runs saveAt(4) → pendingStepRef = 4; the refusal branch (use-draft.ts:349–354) clears strictRef only, so pendingStepRef stays 4. Back → Next on photos runs saveAt(2) → max(pending, 2) = 4 (use-draft.ts:438–447, the pass sends pendingStepRef at :250) → the door re-judges step 4 from the photos page every time; the seller cannot advance except through the summary chip.
FIX: in the refusal branch, when the refused pass was strict, drop the pinned claim as well:
  if (strict) { setRefusals(answer.refusals); strictRef.current = null; pendingStepRef.current = null; }
with a two-line comment: a judged-and-refused claim is answered; nothing stays queued, the next Next names its own step. Change nothing else in the queue.
PW-68 (after PW-67): "a Next refused on details does not pin the claim: Back then Next from photos reopens details (INC-315)": seller + leaf(); reachStep3 → nextThroughPhotos (helper :767) → post-step-4 visible → Next with the title empty → post-refusal-summary visible and contains "Title" → Back → post-step-2 visible → Next → post-step-4 visible (this is the line that fails today) and post-refusal-summary count 0; then fill title + description → Next → post-step-5 visible.

PART B — INC-316: 22 categories carry Lucide names outside CATEGORY_ICON_NAMES, so the picker draws nothing (categoryGlyphOrNull, category-glyphs.ts:283–296, logs "[category-icon] unknown icon name").
B1 — extend the allowlist with these 21 names, alphabetical, in src/lib/category-icon-names.ts, and add the matching imports + CATEGORY_GLYPHS entries in category-glyphs.ts (the Record type makes a missing glyph a type error): Armchair, Brush, Church, CircleDot, Cookie, CupSoda, Flame, Gauge, Grid3x3, Leaf, Milk, PaintBucket, Plug, Power, Puzzle, ShieldCheck, Snowflake, SprayCan, Sun, Warehouse, Wifi. All exist in lucide-react 0.575.0 (verified). No data change: the stored names light up by themselves.
B2 — the import guard, so a name off the list can never land silently: gate.ts checkCell (:483) gains a column type "icon" → CATEGORY_ICON_NAMES.includes(value) ? null : "unknownIcon" (CASE-SENSITIVE — the glyph map is; do not reuse "enum", which lower-cases); registry.ts ColumnRule type union (:89–103) gains "icon"; the categories column (:336) becomes { name: "icon", klass: "editable", type: "icon" }; a blank cell still passes (blank = no change). gate.test.ts: three cases — a listed name passes, "NotAnIcon" → unknownIcon, "" → null.
B3 — words: category-import-dialog.tsx REASON_KEYS (:19–44) gains "unknownIcon"; locales gain admin.categories.import.reason.unknownIcon — EN "The icon “{icon}” is not on the icon list; pick one of the console's icons or leave the cell blank." / AM your rendering — the row's cells are available to the message by column name.
Anti-pattern: no per-category art here; no change to the suggester beyond what the shared list gives it.

PART C — INC-310: generate-image.ts:77–85 picks the prompt-context parent by lowest display_order; since DEC-080 the home is the flagged pointer. Change the query to order by is_primary descending first, then display_order, limit 1; update the comment. No other change in that file.

DOCS: posting.md — a D62 note for INC-315; categories.md — (a) the icon rule (allowlist + import refusal + how a new category gets an icon: file cell from the list, or blank and the console's picker / Suggest icon), (b) replace the stale sentence at :276 ("Generation is not a draft: the gated route writes the three objects … in one call") with the DEC-082 wording (the service cuts the variants in the browser and writes them under the admin's session); one changelog line.

INVARIANTS: DEC-023 local run of post-wizard.spec.ts + the component tests before reporting; report only on green; hardcoded-string scan and i18n usage map must pass; first-paint budget guard must pass (21 glyphs enter the shell — say the measured delta if the guard reports one). No secrets, nothing outside scope; limitations before the end of the turn.

COMPLETION REPORT: files; the use-draft branch as landed; PW-68 local result; the 21 names as added; the guard test result; the generate-image query as landed; git ls-files for any new file.
```
---

Nothing to attach. After its report and green CI: **Publish**, then a two-minute walk — (1) Admin → Categories: Generators & Power, Games & Hobbies, Solar & Backup Power, Religious & Cultural Items, Motorbikes & Bicycles now show their small icons (and the picker on Post → step 1 too); (2) Post → any leaf → skip to details → Next with the title empty → Back → Next → the details step opens.

Queue after W1: INC-317 (PW-61 flake root cause) → importer sweep (INC-314 create-row guests, INC-307) → records turn (DEC-081/082, INC-308–317, S60–S62, D63–D69, C25/C26) → handoff → D66 spec.
