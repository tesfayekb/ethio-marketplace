# sage-s6-4-screens — the supervisor's ruling on stop 2 (as pasted by the operator)

```text
RULING — sage-s6-4-screens, stop 2. Base: dev 0ca681c0.
1. Option 1: step-where.tsx joins the scope. The step keeps its "No pin yet" line drawn while the sheet is open; the sheet's line takes its own id, post-pin-sheet-position; the ten reads in the where, place and bundle2 specs are re-pointed and named old → new; DLG-E8 proves "the page does not move" for all three surfaces. Row 77's law (opening never moves the page) governs; the old sheet only hid the move.
2. The stillPage wait: keep it, but as a helper in e2e/helpers/ui.ts beside settled(page), named and documented (content that arrives late over the network), so the next spec reuses it; a bounded wait, never a fixed sleep.
continue
```
