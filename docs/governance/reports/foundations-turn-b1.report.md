# Foundations turn B1 — report

**CI:** d04eb489 (run 41187423575, 09:29Z) **FAILURE** — Component tests only (TI-1, CF-ADOPT-1, both CI-4's own); fixed below. 060d4d60: no completed run at the last read before push; CI judges.

## 1. Step 0
docs/governance/briefs/foundations-turn-b1.md, one fenced block; sha256 of the text between the fences = `69324df8ffb6cb9a9ac75bccd883118f6386038412acaaa2201a5ead111ab1cb` (matches). Roadmap line 3 names it; prettier --check clean.

## 2. CI's two reds
- TI-1: CI-4's ids renamed — `SF-1…5` → `CSF-1…5` (scripts/ci/classify-start-failure.test.ts), `PK-1` → `MPK-1` (scripts/conformance/migration-proof-keys.test.ts), with the references in the CI-4 report.
- CF-ADOPT-1: migration-proof-keys.test.ts no longer imports `readdirSync`; its census walks `supabase/migrations` through `walkFiles` (kit.ts). Allowlist keys unchanged (file basenames), so no allowlist line moved.
- Proof: scripts/test-ids.test.ts, kit-adoption.test.ts, migration-proof-keys.test.ts, classify-start-failure.test.ts — 4 files, 15 tests passed.

## 3. Item 1 (INC-1030): the laws first
scripts/ci/turn-checks.ts: `LAWS_STEP` (`bunx vitest run scripts --maxWorkers=2`, its own job `laws-first`) runs before every other step, inside the fast line. Being its own job, a FAIL there never skips CI's component-test step, which still runs the whole suite: no step dropped, final verdict unchanged. TC-E3 (turn-checks.test.ts): first step, before any other vitest step, separate job, its FAIL counted in the fast line. 9 tests passed.

## 4. The dark-card choice (D262, DEC-314)
Candidates in src/styles.css as `.dark [data-card-candidate="a|b|c"]` (each re-resolves `--shadow-card`, which the theme maps at :root); `.dark` and THEMES' dark set take B; dark `--photo-empty` → #303C35. /dev/style "Dark cards: pick one": A, B, C × plain (photo stand-in `bg-secondary`), Premium, Featured, no-photo. Off every public path (dev route only).

Measured in-page by e2e/dark-cards.spec.ts DC-1 (both projects, identical):

| Set | `--card` | edge | Premium | Featured | plain surface / edge / text | Premium surface / text | Featured surface / text |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | #232E28 oklch(0.289 0.019 161.1) | #3A4740 | #33291A | #1F3329 | 1.28 / 1.85 / 11.58 | 1.26 / 11.74 | 1.34 / 11.05 |
| B | #25302A oklch(0.297 0.019 161.2) | #3E4B44 | #382D1C | #22362C | 1.32 / 1.97 / 11.26 | 1.34 / 11.08 | 1.40 / 10.59 |
| C | #28342E oklch(0.312 0.019 163.4) | #42504A | #3A2F1D | #243A2F | 1.39 / 2.12 / 10.67 | 1.37 / 10.78 | 1.47 / 10.04 |

The edge target is judged on the plain and no-photo cards; tier cards keep their own frames (shadow-premium / shadow-featured). DC-2: a dark page's own card computes equal to candidate B.

## 5. G38
No test read an old dark card literal (search for each old value across src, e2e, scripts: only src/lib/themes.ts). themes.test.ts (styles.css ⇔ THEMES) passes with new values: `card` #1A221E → #25302A, `photo-empty` #26302B → #303C35, `tier-premium` #2B2314 → #382D1C, `tier-featured` #1A2C23 → #22362C, `lift-card` ring #26302B → #3E4B44. styles.tokens.test.ts, look-law.test.ts, look-values.test.ts, schemas — pass.

## 6. Tests run
- e2e: `bun run e2e:local -- e2e/dark-cards.spec.ts e2e/house-style.spec.ts` — **16 passed**, both projects, retries 0 (E2E_CHROMIUM_PATH set to a Nix Chromium: the managed browser lacks libglib here).
- e2e-select.ts: dark-cards.spec.ts added to the house-style area.

## 7. Growth
Public pages: no class added to any public component; tokens only change values, so no public page grows. /dev/style (public: false) grows by the choice grid; the checks' budget step decides whether it enters its NEAR band (see §10).

## 8. Unit count
See §10 (from `bun run checks` if it finishes).

## 9. K2
- `--shadow-card` is mapped once at :root, so any scoped override of `--lift-card` (as on /dev/style's Sage grid) does not reach `shadow-card` users without re-resolving it; the older SageGrid's inline theme scope has the same blind spot for shadows. Reported, not edited.
- Dark `--lift-card-md`/`-lg` are light-only by design (`:root:not(.dark)`); the dark ring is one value at every width.

## 10. Checks
(appended below after `bun run checks`)

## 11. Files (git diff --name-only 060d4d60)
docs/_changelog.md, docs/features/design-foundation.md, docs/governance/briefs/foundations-turn-b1.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-b1.report.md, docs/governance/reports/foundations-turn-ci-4.report.md, e2e/dark-cards.spec.ts, roadmap.md, scripts/ci/classify-start-failure.test.ts, scripts/ci/turn-checks.test.ts, scripts/ci/turn-checks.ts, scripts/conformance/migration-proof-keys.test.ts, scripts/e2e-select.ts, src/lib/themes.ts, src/routes/dev.style.tsx, src/styles.css.

## 12. Limits
The operator's pick is outstanding (after Publish, on /dev/style). AGENTS.md untouched.
