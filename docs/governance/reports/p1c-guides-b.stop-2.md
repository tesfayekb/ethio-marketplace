STOP — p1c-guides-b after ruling 2: `e2e/user-guides.spec.ts` is reachable from no area of `scripts/e2e-select.ts` (outside SCOPE); CI's selector self-test is red on every commit of this branch
DONE: ruling 2 whole — (a) `src/components/shell/guide-spec.ts`, the contract both forms import
and neither imports the other (BG-7); the 24 DataTable pages back to +1.9…2.0 (stop 1's number
less the predicted 1.3); (b), (c) 48 page ceilings and the entry's moved by `ceilingForLocal`,
each with its cause (`check-bundle-size` green, "0 NEAR, none grew"); the docs part
(`admin-guide.md` for both forms and §Turn (b), register row 107, row 104 grown, the changelog
line, roadmap line 3); the usage maps; `bun run checks` whole; the browser check (the two guide
specs and the changed screens' specs — its count lines in the report); the self-review; the report
`docs/governance/reports/p1c-guides-b.report.md`
LEFT: the pull request marked ready and its CI green; the "every check green" comment
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `724fc819cefa3031dc680541f54d3117e1e615c9` (short `724fc81`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-04T02:13:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41756986789
(the stop-1 commit's run: the budget job — fixed since — and the two jobs that carry the
selector self-test below; every E2E lane, the smoke, repeat and email lanes green)
FILES: 50 (`git diff --name-only eb72f3bdf`; the report's §2 lists them, plus this file and
the report)

## The question

`scripts/e2e-select.ts` (DEC-115) holds the area table that maps source files to the specs
`e2e:changed` runs, and its self-test — CI's "e2e selector self-test" step in `Build, typecheck,
lint`, and `scripts/e2e-select.test.ts › every spec is reachable` in the laws and the component
tests — refuses a spec no area names:

```
e2e-select self-test FAILED:
  - spec not reachable from any area: e2e/user-guides.spec.ts
```

The plan's §8 SCOPE and both rulings do not name `scripts/e2e-select.ts`; rule 00 makes a file I
need outside SCOPE a STOP. Turn (a) added its `admin-guides` area in the same way when it wrote
`e2e/admin-guides.spec.ts`; the plan missed the sibling for this turn's spec (my census miss: I
ran the laws after the spec landed and read NH-6 as the only red; the selector's test sits in the
same run and I did not read its second failure until THE CHECKS).

What I ask: SCOPE + `scripts/e2e-select.ts`, for one change — either widen the `admin-guides`
area (lines 176–184) to

```
src: [
  "src/components/shell/block-guide*.tsx",
  "src/components/shell/page-guide.tsx",
  "src/components/shell/guide-sheet.tsx",
  "src/components/shell/guide-spec.ts",
  "src/components/shell/order-strip.tsx",
  "src/features/admin/guide-next.ts",
  "src/features/posting/wizard-guide.ts",
  "src/i18n/locales/*-guide.ts",
],
specs: ["e2e/admin-guides.spec.ts", "e2e/user-guides.spec.ts"],
```

(one area for the one mechanism; both specs run when any Guide file changes), or add a
`user-guides` area of its own with the page files and the new spec. I recommend the first. With
it, `bun scripts/e2e-select.ts --self-test` passes, the two vitest copies pass, and the pull
request's remaining reds are gone (the budget red was fixed by ruling 2 (b)).

Until then the pull request stays a draft. Nothing else is open: the report is written and
committed; the self-review's line is `NOT READY · 1 BLOCKER · 0 MAJOR · 2 MINOR · on 081a8f7fa`,
the BLOCKER being this file's subject.
