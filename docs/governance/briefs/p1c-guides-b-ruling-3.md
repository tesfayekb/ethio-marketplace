# P-1c turn (b) — ruling 3 (stop 2)

```text
RULING — P-1c, turn (b), ruling 3: stop 2. Base: cursor/p1c-guides-b at 85f7453f6.

SCOPE + scripts/e2e-select.ts, one change: the area that holds the guides is renamed `guides` (one area for the one concern — it now covers the people's pages, so `admin-guides` would mislabel it) and widened exactly as your stop report's block proposes — src: page-guide.tsx, guide-sheet.tsx, guide-spec.ts, wizard-guide.ts beside the admin guide files already there; specs: e2e/admin-guides.spec.ts and e2e/user-guides.spec.ts. Every other reference to the old area name in the tree follows (grep it: the selector's own tests, any `-- e2e-areas:` header — I expect none — and the docs). The self-test green is the proof.

Then: `bun run checks` (the Mac reds under Limits), push, mark the pull request ready, `gh pr checks --watch`, the green comment, END THE TURN with the full report (its self-review line updated; the stop-2 note under Departures).
```
