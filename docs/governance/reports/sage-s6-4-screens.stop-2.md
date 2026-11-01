STOP — sage-s6-4-screens part 4: the place step moves the page when the pin map opens (a file outside scope)
DONE: parts 1, 2, 3; part 4's DLG-E8 written (held uncommitted, below)
LEFT: part 4 (DLG-E8's pin-map pass, the G38 specs), part 5; then THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT, the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `0ca681c0ab215776629404f59693482d52cc95a0` (short `0ca681c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T08:34:34Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41287917217
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s6-4-screens.md
docs/governance/briefs/sage-s6-4-screens.ruling-1.md
docs/governance/reports/sage-s6-4-screens.stop-1.md
docs/governance/reports/sage-s6-4-screens.stop-2.md
public/i18n-usage.json
roadmap.md
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
src/components/layout/layers.ts
src/components/ui/dialog-look.test.tsx
src/components/ui/dialog-look.ts
src/components/ui/dialog.tsx
src/features/posting/map/map-pin-dropper-offline.test.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/preview/photo-gallery.test.tsx
src/features/posting/preview/photo-gallery.tsx
src/features/posting/preview/preview-sheet.test.tsx
src/features/posting/preview/preview-sheet.tsx
(e2e/dialogs.spec.ts: changed in the working tree, not committed)

## What DLG-E8 found

The task's step 4 asks that, for the pin dropper, "the page does not move". The page does move, and
the cause is in `src/features/posting/step-where.tsx`, which is outside this task's scope.

- **The cause.** `step-where.tsx:1768` draws the step's own pin line ("No pin yet." / the pin's
  place, test id `post-pin-position`) only `{!pinOpen && …}`.
  - The line sits above the "Drop a pin" opener. It is removed while the pin sheet is open, because
    the sheet draws its own line under the same test id.
  - The content above the opener therefore shrinks when the sheet opens and grows back when it
    closes.
- **The measurements.** DLG-E8 ran on both projects with 0 retries, with a probe in the test that
  has since been removed.
  - Before the opening, every case waited until the opener's box, the document's height and the
    scroll had read the same twice, 500 ms apart.

  | Surface | Width | Step's line (before → open) | Opener's document y | `scrollY` |
  | --- | --- | --- | --- | --- |
  | the pin map | 390 | 1 → 0 | 1152 → 1124 | 693 → 693 |
  | the pin map | 1440 | 1 → 0 | 1132 → 1104 | 234 → 276 (the browser's scroll anchoring) |
  | the viewer, the preview, the viewer over the preview | both | none | unchanged | unchanged |

- **Why it shows now.** The old sheet covered the step at every width (`bg-background/80`). The
  ruled 32rem card from md shows the page through the scrim, and the window really scrolls there.
- **The result.** At 390 the mobile project passes, because the line comes back on close and the
  opener lands where it was. At 1440 DLG-E8 fails "the page scrolled" on opening. An earlier run
  failed "the opener moved" on closing, by 384 px.
- **Ruling 3 is unaffected.** This is not Leaflet: the map is ready (`data-ready="1"`), and Escape
  and the focus return pass at both widths.

## Why I cannot fix it in scope

- The step's line must stay drawn while the sheet is open, which means editing `step-where.tsx`.
- Two elements would then carry `post-pin-position` while the sheet is open, so the sheet's line
  needs its own test id.
- Every reader reads the bare id, and each of these would be read again:
  - `post-wizard-where.spec.ts:633, 885, 911`
  - `post-wizard-place.spec.ts:1228, 1278, 1351, 1384`
  - `post-wizard-bundle2.spec.ts:196, 417, 1321`
- `map-pin-dropper.tsx` and the G38 specs are in scope; `step-where.tsx` is not.

## The question — which do you rule?

1. **Widen scope to `src/features/posting/step-where.tsx`.**
   - Change: drop `!pinOpen &&` at :1768, so the step's line stays drawn under the sheet.
   - The sheet's own line takes the test id `post-pin-sheet-position`.
   - Each of the ten reads above is re-pointed to the line it means (the step's or the sheet's),
     named old → new, by reading each test.
   - DLG-E8 then asserts "the page does not move" for all three surfaces. (My recommendation: it
     fixes the move the task names, at its root.)
2. **Keep scope.**
   - DLG-E8 asserts "the page does not move" for the viewer and the preview, and for the pin map
     only Escape, the focus return and reduced motion.
   - The move is registered as an INC for a later turn (K2: `step-where.tsx:1768`).

## The state of the tree

- **Committed and pushed:** parts 1–3 (unchanged since stop 1), and this report with ruling 1
  (`docs/governance/briefs/sage-s6-4-screens.ruling-1.md`).
- **`e2e/dialogs.spec.ts` (held uncommitted).** It holds DLG-E8 and its two helpers: `opens` / `closesBack`, and `stillPage`,
  the wait described above, which polls through `expect.poll`'s intervals with no sleep and is
  local to the spec (the harness's `settled` waits for animations only, `layoutBoxes` for two
  frames).
  - Mobile project: all three surfaces pass in light and dark at 390.
  - Desktop project: the viewer and the preview pass; the pin map fails at 1440 as above.
  - It is held uncommitted because a commit is never red; it lands in part 4's commit once the
    ruling decides its pin pass.
- **Typecheck, lint and the touched unit tests are green.** The laws suite's only red is NH-6, the
  known macOS-only failure.
