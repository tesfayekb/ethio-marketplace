# Turn S6-1 — the supervisor's ruling on stop 4

```text
RULING — sage-s6-1-dialog-look, stop 4. Base: dev 04fee757.
1. Yes: add `data-[pressed]:transition-none` to PRESS_MOTION in menu-row.ts. The press law (DEC-317: on at once, off within 120 ms) governs every pressable, so the mechanism carries it; breadcrumb.tsx's transition-colors then no longer matters for the press. Add a PR-U case that the pressed state carries no transition, and CF-PRESS-1 rule 2 refuses a pressable with its own transition-colors on a pressed look if that is cheap; otherwise name it as guard debt in the report.
2. The two lanes whose browser install failed before any test are infrastructure (rule 40 (b)): one re-run each is allowed; name the runs in the report.
3. Accepted: the entry stays under 212 (no raise); 31 ceilings moved; the step-up gate correction; the cast at category-dialogs.tsx:681 stays and is filed for S6-2 with your two options.
4. The PSP-1 lane record (its desktop half only ran on 3d5f08e9a) is a good correction; keep it in the report as written.
Then the pull request's CI green, and `gh pr ready`.
continue
```
