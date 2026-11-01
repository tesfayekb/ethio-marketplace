# Turn S6-1 — the supervisor's ruling on stop 3 (saved as pasted)

```text
RULING — sage-s6-1-dialog-look, stop 3. Base: dev 04fee757.
1. Growth: (a) now, with one change. scripts/check-bundle-size.mjs joins the scope for its entry line (212 → 213, DEC-296's local form), and the 39 page ceilings move, each with its cause on its line. But the control look and the search-field look the top bar reads (ruling 4) do NOT live in dialog-look.ts: they move to the shell's shared look module beside the row constants (menu-row.ts, or a small look.ts next to it), so dialog-look.ts holds dialog parts only and rides the first paint for one reason alone, the step-up gate in the root. Correct dialog-look.ts's comment to say exactly that. Option (c), the step-up gate's dialog on demand, becomes a named part of S6-3 (the on-demand turn), where the ceilings come back down; record it in the report under "left for S6-3", with today's numbers.
2. Yes: scripts/e2e-select.ts joins the scope for the one area line (house-style). Standing for every turn: a new spec file always carries its area line, and the entry ceiling always rides the task that moves it; both files are in scope whenever that is the reason.
3. Findings, filed (your report's K2): the seven specs that clear a field with Control+A fail on macOS (Meta+A there) — a harness portability finding, not yours to fix; HM-2 and HM-3 race the language provider's direction rewrite — a flake finding; AT-12 and PP-8 fail on the base locally — name them so CI's result is compared. None blocks this turn; CI judges.
continue
```
