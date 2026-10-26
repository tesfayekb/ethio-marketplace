# Foundations turn 31 — completion report

Speed S8 (D234), DEC-259: the tooltip's and the dropdown menu's code arrives on demand. Brief: docs/governance/briefs/foundations-turn-31.md (sha256 9a45e7d947e3d7430e6b082b7c28500ae88a23bfd9242fcdb195c5b9866b5957, 81,247 bytes). Base: 25542561. No migration, no new strings, no package change.

## 1. Files

`git diff --name-only 25542561`:

- AGENTS.md
- docs/_changelog.md
- docs/features/ci-guards.md
- docs/features/display-primitives.md
- docs/features/performance-strategy.md
- docs/generated/i18n-usage.json
- docs/governance/briefs/foundations-turn-31.md
- docs/governance/mechanisms.md
- docs/tracking/intentional-deletions.txt
- e2e/overlays.spec.ts (new; `git ls-files` tracked)
- public/i18n-usage.json
- roadmap.md
- scripts/bundle-closure.mjs
- scripts/bundle-closure.test.ts
- scripts/check-bundle-size.mjs
- scripts/check-marketplace-imports.mjs
- scripts/conformance/overlays.test.ts (new; tracked)
- scripts/e2e-select.ts
- scripts/route-budgets.mjs
- src/components/shell/row-actions.test.tsx
- src/components/ui/dropdown-menu-impl.tsx (new; tracked)
- src/components/ui/dropdown-menu.tsx
- src/components/ui/overlay-facade-failure.test.tsx (new; tracked)
- src/components/ui/overlay-facade.test.tsx (new; tracked)
- src/components/ui/overlay-facade.tsx (new; tracked)
- src/components/ui/overlay-loader.ts (new; tracked)
- src/components/ui/overlays-impl.ts (new; tracked)
- src/components/ui/tooltip-impl.tsx (new; tracked)
- src/components/ui/tooltip.tsx
- src/test/setup.ts
- docs/governance/reports/foundations-turn-31.report.md (this report, replacing the stop report)

## 2. Done, by part

- Part A — done. HEAD 25542561 (BASE); CI run 40241386426 on 1990ac5d read as FAILURE with only "Build, typecheck, lint" red: the deletion guard named src/i18n/locales/admin-layer.test.ts and src/i18n/compiled-admin-loader.test.ts (INC-905); every other lane and E2E passed.
- STEP 0 — done. Brief saved byte-for-byte; sha256 and size verified; roadmap line added.
- Part B — done. The two retired turn-30 tests declared in docs/tracking/intentional-deletions.txt (INC-905); hash a17824b5… verified.
- Part C — done, in one batch. tooltip-impl.tsx and dropdown-menu-impl.tsx are byte copies of the originals; overlays-impl.ts, overlay-loader.ts, overlay-facade.tsx created; tooltip.tsx and dropdown-menu.tsx replaced by the facades. All five sha256 verified. Build log read after C6: build OK.
- Part D — done. setup.ts awaits loadOverlays(); OVF-1…8/10 (overlay-facade.test.tsx), OVF-9 (overlay-facade-failure.test.tsx), CF-OV-1…3 (scripts/conformance/overlays.test.ts, MAY_REACH read through ownValue); row-actions.test.tsx comment pointed at the impl file. All hashes verified.
- Part E — done. Weight guard: HEAVY_MODULES gained the two Radix packages, IMPORT_FROM gained side-effect imports; bundle-closure MUST_STAY_LAZY and PUBLIC_MUST_STAY_LAZY gained overlays-impl; entry ceiling 284 → 263 KiB; scripts/route-budgets.mjs replaced whole with the supervisor's measurements. All hashes verified.
- Part F — done. e2e/overlays.spec.ts (OVE-1/2, read-only) added; scripts/e2e-select.ts house-style group gained it.
- Part G — done. performance-strategy §14, mechanisms row 48 + the weight guard-debt line, ci-guards DEC-259 section, display-primitives DEC-259 note, changelog turn-31 entry, AGENTS.md Overlays line, usage maps regenerated (1,736 keys across 582 files, 395 dynamic call sites; i18n:map-guard: usage maps match the tree).

## 3. The brief's hash list (14 lines, all OK)

```
docs/tracking/intentional-deletions.txt: OK
src/test/setup.ts: OK
src/components/shell/row-actions.test.tsx: OK
scripts/check-marketplace-imports.mjs: OK
scripts/bundle-closure.mjs: OK
scripts/bundle-closure.test.ts: OK
scripts/check-bundle-size.mjs: OK
scripts/e2e-select.ts: OK
docs/features/performance-strategy.md: OK
docs/features/ci-guards.md: OK
docs/features/display-primitives.md: OK
docs/_changelog.md: OK
AGENTS.md: OK
docs/governance/mechanisms.md: OK
```

## 4. The red proofs

- D5 (planted `import { Tooltip as PlantedTooltip } from "@/components/ui/tooltip-impl";` at src/components/shell/table-actions.tsx:1): CF-OV-1 failed with exactly `src/components/shell/table-actions.tsx:1 reaches @/components/ui/tooltip-impl by value; only src/components/ui/overlays-impl.ts may (DEC-259)`. Restored; BASE hash 0d37e9d3… verified after.
- E1 (planted `import "@/components/ui/tooltip-impl";` at src/components/app-shell.tsx:1): the weight guard printed `findings: 1` and `  src/components/ui/tooltip-impl.tsx imports @radix-ui/react-tooltip`. Restored; BASE hash e012aa14… verified after; guard back to `findings: 0`.

## 5. K2 — the same concern elsewhere

- No TooltipTrigger or DropdownMenuTrigger without `asChild` remains under src/ (census empty; the facades' types refuse one).
- Radix value imports that still draw overlays on a page's first download — the next speed turn's list, not touched here: src/components/shell/app-rail.tsx:2 (dialog), src/components/shell/toolbar-panel.tsx:1 (dialog), src/components/ui/alert-dialog.tsx:2, src/components/ui/context-menu.tsx:2, src/components/ui/dialog.tsx:4, src/components/ui/hover-card.tsx:2, src/components/ui/menubar.tsx:2, src/components/ui/navigation-menu.tsx:2, src/components/ui/popover.tsx:2, src/components/ui/select.tsx:4, src/components/ui/sheet.tsx:4 (dialog). src/components/ui/command.tsx:4 is a type-only import of DialogProps.

## 6. Checks

- Unit: 303 files, 1,886 passed, 1 skipped, 1 failed — EXH-11 timed out at 5,000 ms (the named sandbox limit, INC-890); every other test passed.
- Lint: 0 errors, 39 warnings.
- Format: `bun run format:check` clean (run last).
- Build: /tmp/observability/build-errors.log ends `build OK`; no `error TS` lines.
- i18n: 1,736 keys across 582 files (395 dynamic call sites); usage maps match the tree.
- E2E (`bun run e2e:local -- e2e/overlays.spec.ts e2e/house-style.spec.ts e2e/shell.spec.ts`, both projects, 2 workers, fake mode, 0 retries, chromium-1194 override): 170 passed, 60 project skips, 0 failed. No `[ssr-error]` lines in the run.

## 7. Limits

- EXH-11's 5-second timeout in this sandbox (INC-890), named by the brief; not changed, not worked around.
- The pinned Playwright Chromium is absent in this sandbox; the E2E run used the permitted E2E_CHROMIUM_PATH override (chromium-1194).

## 8. Departures

(a) The five docs (performance-strategy.md, ci-guards.md, display-primitives.md, _changelog.md, mechanisms.md) were first written from a summary of the brief, and their hashes were compared with remembered values; this reconciliation restored them by script from BASE 25542561 and the saved brief's own G1–G5 blocks (INC-907). (b) The chat summary's AGENTS.md discrepancy was a misreading: AGENTS.md matches the brief's line 1504 (52277dc3…), and the hash list prints AGENTS.md: OK.

## 9. What I could not verify

- The bundle ceilings are the supervisor's build measurements; CI's bundle-budget job judges them on the final commit.
- CI on the final commit is the supervisor's to read.

## 10. CI handoff

The run on d0ba6c1b had not finished when the reconciliation ruling was written; this turn's commit replaces it. The supervisor reads the run on the final commit of this turn.

## 11. J-audit

e2e/overlays.spec.ts: J1 no fixtures (read-only, no rows written); J2 real keys read-only; J3 no real row; J4 no counts; J5 twin locators via getByTestId/getByRole; J6 no global list; J7 nothing to seed; J8 no @global-state; J9 no pool identity. Cleanup-survives-timeout: nothing to clean up.

## 12. End of turn

The platform commits; final CI awaits the supervisor.
