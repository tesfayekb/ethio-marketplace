# Turn S6-3 — the supervisor's ruling on stop 1

```text
RULING — sage-s6-3-popover, stop 1. Base: dev cc77e93e.
1. Yes: scripts/conformance/visible-area.test.ts joins the scope; its allowed reader becomes popover-impl.tsx.
2. Yes: scripts/conformance/notice-outlet.test.ts joins the scope; the floor 4 → 3, with the reason on the line (the toolbar panel's content now comes from Sheet).
3. (a): src/features/auth/mfa/step-up-dialog.tsx joins the scope, fetched through resilientLazy; the 19 mounting pages stay untouched. A failed download ends the guarded action as "unavailable", as you say, and reports through reportOnDemandFailure (row 52).
4. All three readings confirmed: the popover package on CF-OV-1's watched list with popover-impl.tsx its one reader and a planted case; DLG-E4 / OVE-4 as one test in e2e/overlays.spec.ts; the step-up test in e2e/mfa-stepup.spec.ts beside MF-3.
5. The toolbar panel's link-and-Done row in the shared footer on phones: accepted; name the two out-of-scope files in K2.
Standing for S6-4: a guard whose list or floor a move changes is in scope by that reason; name it in the report.
continue
```
