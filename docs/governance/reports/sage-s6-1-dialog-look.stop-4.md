QUESTION — sage-s6-1-dialog-look, the pull request's CI: PSP-1's band-segment press fades in, and this tree loses the race in CI
DONE: parts A–L; THE CHECKS; THE BROWSER CHECK; THE SELF-REVIEW; THE REPORT (docs/governance/reports/sage-s6-1-dialog-look.report.md)
LEFT: the pull request's CI green
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `1bcf3e3a2c0f4d073f8fe600f6cfc9f48bd2f1e4` (short `1bcf3e3`)
- Conclusion: **FAILURE** (read from the pull request's checks: 39 pass, 2 fail — E2E Lane 7 and the ethio-staging Verdict)
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41258218083
FILES: as the report's section 2 (85 paths), plus this file and the report

Rule 00: "a behaviour change beyond the task's numbered changes" is a STOP. The fix below changes how
a press draws, which no part of S6-1 names.

THE RED
- e2e/press.spec.ts:115 PSP-1, "band segment: pressed ink": contrast 1.3276 against ≥ 4.5, light mode.
- It failed on ba7edaa4f (desktop-1280, both tries) and on 1bcf3e3a2 (mobile-360, both tries).
- On 3d5f08e9a, only the desktop half ran (it passed); the mobile half sat in Lane 7, which failed
  installing Chromium's system libraries before any test.
- The base (04fee757, run 41230127440) was green.
- Locally it passes on the tree (press.spec.ts whole: 15 passed, 1 skipped) and failed once earlier.

THE CAUSE (present at the base)
- The press law (D263, menu-row.ts:7–13): "It comes on with no transition."
- The band segment breaks it. Its class is BAND_CRUMB (band-row.ts:24, 29), which carries PRESSED.segment
  (fill bg-card, ink nav-ink, shadow-segment). BreadcrumbLink (src/components/ui/breadcrumb.tsx:58)
  adds `transition-colors`, so the fill and the ink fade in over 0.15 s while the shadow comes at once.
- One requestAnimationFrame after pointer-down, the fill read `oklab(1 0 0 / 0.033)` on the tree and
  between `/ 0.0065` and `/ 0.031` on the base: mid-fade in both.
- The test reads that colour through a 1-pixel canvas. When the frame lands before the fade has
  advanced, the alpha rounds to 0, and the fill reads as black. The dark ink against black is
  exactly 1.3276.
- Whether a frame passes between the press and the read is timing. Something in this tree's page
  makes CI lose it more often; I have not found what, and the cause above does not depend on it.
- Census (`rg` for a PRESSED/PRESS_MOTION class beside a transition of its own): button.tsx:9 also
  carries `transition-colors`, but its press changes only the shadow, which that transition doesn't
  cover. The band segment is the only press whose fill and ink fade.

THE EXPERIMENT (not committed, reverted; `git status` clean)
- `data-[pressed]:transition-none` added to PRESS_MOTION (menu-row.ts:17).
- The first frame after pointer-down then read the full card fill `oklch(1 0 89.9)` and the nav ink
  `oklch(0.388 0.07 163.8)`, the same at every read.
- The release keeps its 120 ms fade, because `data-[released]` replaces `data-[pressed]` on release.

QUESTION — which do you rule?
1. (recommended) PRESS_MOTION in src/components/shell/menu-row.ts (in S6-1's scope, already
   touched) gains `data-[pressed]:transition-none`. Every press then comes on at once, whatever
   transition its element carries for hover: the law's own words, held in the one mechanism.
   scripts/conformance/press.test.ts does not pin PRESS_MOTION's text (rg), so no guard changes.
2. Or src/components/ui/breadcrumb.tsx joins the scope and BreadcrumbLink drops `transition-colors`
   (the band segment alone).
3. Or neither in S6-1: the red stands, and PSP-1's fix becomes its own turn.
