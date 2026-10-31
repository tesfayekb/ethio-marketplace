# Foundations turn F3 report

## CI first

d7a47425 — run 41182266183 was in progress at the start (08:01 UTC); completed jobs had no red when read. The last completed CI evidence was fc918fbb FAILURE, run 41178779969: budget/BX-1/PPF-1 corrected in F2; lane 12 backend migration failure belongs to INC-1028, not registry refusal. Re-read before turn closes is recorded below.

## Step 0

The fenced ruling's exact payload, including final newline, hashes to `41113c7d4aa8c7a8d300df652446e44384f38c056763ab3612e7e066a64c55d1`, equal to the supplied hash. Roadmap line 3 names foundations-turn-f3.md. Prettier check passed.

## Items 1–4

- Searchable picker's existing placement hook owns the horizontal geometry: logical start first, end if start would cross the 16px gutter, anchor-width minimum, viewport-minus-32px maximum tightened to available room on the chosen edge. It reads the actual content width and remeasures on resize and row changes. Phone's anchor remains the whole grouped phone field, preserving the existing vertical contract. The consumer width/side classes are removed from phone-number-field and step-pricing.
- The picker hook applies OPEN_CONTROL to the input or the phone-country button it owns and exposes data-state open/closed. RowActions' more trigger reads OPEN_CONTROL directly. CL-E4…6 no longer bypass the open-state assertion.
- INC-1029: judgedSize adds LOCAL_ALLOWANCE_KIB (0.1) off CI, before entry, stylesheet and page ceiling and band checks. CI uses the measured size. nearFindings recommends ceilingForLocal off CI, ceilingFor on CI. Page measurement adds allowance for the existing judgeRouteBudgets comparison, then removes it for measured-size reporting and avoids double addition in the band.
- design-foundation.md now documents the current radio row's checked-state look and aria-checked, with aria-selected retained for picker options.

## Census and K2

Only two runtime picker consumers found by pickerPopClass/usePickerPlacement census: step-pricing.tsx (currency; removed w-full) and phone-number-field.tsx (phone code; removed start-0, w-72 and local max-width). Both use the same placement hook. RowActions is the shared more-trigger owner. No remaining picker width/side override found. Native-select and location-height exceptions remain unchanged. No new dependency, string, migration or AGENTS.md edit.

## Guards and focused tests

CF-LIST-1 now enumerates pickerPopClass panels as well as its prior facade/list-role domain and refuses consumer width/side classes. CL-7 plants w-72, w-full, max-w, start-0 and end-0 and proves the shared-only panel passes. No allowlist addition. NB-6: local 398.7/399 fails the band and recommends 400; NB-7: identical CI measurement is outside the band; NB-8: local 399.05/399 fails the ceiling, and 398.95/399 fails locally but passes CI's ceiling. Horizontal geometry tests cover start, end, RTL, width and owned open/closed state. Focused run: 36 passed in 5 files, including nearby choice-list contract tests. Initial CL-7 failed because class extraction split parentheses inside calc(); extraction now preserves parentheses, and the same case passes.

## CL-E

The whole e2e/choice-lists.spec.ts is running on both projects, retries 0. CL-E6's mobile fixme is removed; CL-E4…6 assert OPEN_CONTROL; existing row, edge, width, gutter, theme and no-scale tolerances remain. First two attempts stopped at the browser guard (missing project Chromium, then an obsolete installed-browser path); installed the required test browser without changing project dependencies. Results will be appended after the run.

## Growth and ceilings

No ceilings raised before the check. The check's final-tree build and growth report will supply actual per-page sizes; no manually run app build or typecheck. No growth figures claimed before measurement.

## Full checks

Report written before bun run checks. Whole final-tree run will be recorded below, including fast line, last line, unit count and every NOT RUN.

## Scope evidence

`git diff --name-only d7a47425` is appended at close. AGENTS.md remains untouched. Source changes stay within the ruling's scope; no new mechanism or architecture file.

## Limits

Published-site operator walk remains after CI and publication, neither requested nor performed here. No claim of completed CI while the run is in progress. No manual Git commit or push: the platform lands changes when this turn ends.
