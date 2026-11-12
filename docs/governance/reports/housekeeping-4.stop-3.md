QUESTION — housekeeping-4 part C: the menu alert's label and the strings layers (CF-SL-1)
DONE: parts A, B (commits 3eaa176a8, 5ff719dcb); part C built as ruling 2 says, measured, every check but one green — NOT committed (a commit is never red)
LEFT: parts C (its commit), D, E; STEPS 6–8
CI: the pull request's checks on a12ad4d5c (stop report 2), read with `gh pr checks 35`: 30 pass, 10 pending, 0 failing. origin/dev: db13e13b7 (unchanged since the task's base).
FILES: committed since db13e13b7 — as stop report 2 lists them, plus this file. In the working tree, uncommitted (part C):
docs/features/admin-shell.md
docs/features/panels.md
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-4-ruling-2.md
public/i18n-usage.json
scripts/bundle-closure.d.mts
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/conformance/entry-admin-allowlist.txt
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/components/shell/admin-nav-layer.ts
src/components/shell/app-rail.tsx
src/components/shell/breadcrumbs.test.tsx
src/components/shell/breadcrumbs.tsx
src/config/panels.ts
src/features/admin/nav-layer.ts
src/features/admin/sections.ts
src/routes/admin.tsx

## Where part C stands (ruling 2 applied)

- Ruling 2 saved by `cp` from the attachment as `docs/governance/briefs/housekeeping-4-ruling-2.md`; `sha256sum` = d868c225838aeab49107caf2121229160da3e815819a24b25904cfc59b216aee, equal to the operator's line. It joins part C's commit.
- Shape 2 as built; BC-16 in the budget step (`entryAdminModules` / `entryAdminViolations`, `scripts/bundle-closure.mjs`; the allowlist `scripts/conformance/entry-admin-allowlist.txt`, the impersonation three until INC-1116), proven on planted records (`scripts/bundle-closure.test.ts` BC-16) and on the real build (the banner's line removed: the step fails by the module's path, exit 1; restored: "Admin code in the entry's closure: 3 module(s), each allowlisted (BC-16) — ok"). `wired.test.ts` names it.
- `src/components/shell/breadcrumbs.test.tsx` BRC-1…3 (new): the layer absent, the home trail and Home › Admin; present, the section, group-page and detail crumbs, and the server's HTML carrying the admin trail. Red when the layer provides no sections (BRC-2, BRC-3 fail), green restored. `rail-first-paint.test.tsx`: 8 passed.
- Ceilings set by script from the build's own output (`node scripts/check-bundle-size.mjs`: "Bundle budget OK."): the entry's JS 206.5 → 204.4 KiB, 207 → 205; the 25 admin pages to `ceilingForLocal(measured)` (+1.2 to +1.5 on part B), every other page ratcheted down (−2.1 to −2.3; the three posting pages −1.4 to −1.5).
- `bun run typecheck` and `bun run lint`: green. `bunx vitest run src/components/shell src/features/admin src/config`: 76 files, 457 tests passed. `bunx vitest run scripts --maxWorkers=2`: 111 files passed, 1 failed — CF-SL-1, below.

## The question

`scripts/conformance/strings-layers.test.ts` CF-SL-1 now fails with one line:

    admin.nav.alert.legalReview — in en-base.ts, belongs in en-admin.ts (shown on: admin)

The key's one reference is `NAV_ALERT_LABELS` in `src/features/admin/nav-alerts.ts`. Before part C the rail imported that module, so it was on every page; now only the admin layout's chunk carries it (through `nav-layer.ts`), and the census places the key in the admin layer. Moving it means editing `src/i18n/locales/en-base.ts`, `am-base.ts`, `en-admin.ts` and `am-admin.ts`, which the brief's scope does not name (rule 00: a file outside scope is a STOP). No ruling names them either.

A fact that bears on the choice: `StringsLayerGate` wraps only the routes' outlet (`src/routes/__root.tsx` :459–462); the rail is drawn by `AppShell`, outside it. A string the rail draws from the admin layer is therefore drawn without the gate's wait. The alert itself appears only after its own server read, so the label is probably in by then, but that order is not proven by any test.

1. **Move the key** (the scope gains the four locale files): the EN and AM values copied by script, character for character, from the base files into the admin files; no new key, no new text; the usage maps regenerated. Cost: the label leaves every page's base catalogue. Risk: the order above, unproven.
2. **Keep the key in the base layer** (the scope gains `src/features/admin/nav-alerts.ts`): the one-line label map moves from `nav-alerts.ts` into the shell's `src/components/shell/admin-nav-layer.ts`, which the rail reads directly. The layer's `alertLabels` field goes; the census then sees the key on every page, which matches where the rail draws it. Cost: the map in the entry, ESTIMATE +0.0 to +0.1 KiB on every page (not measured).

My recommendation is 2: the rail draws outside the gate, and a string the shell draws belongs to the layer every page holds, as the section titles do (their keys stay in the base layer through the admin routes' page heads).

## Corrections and notes

- Correction to stop report 2: the build has 25 admin pages, not 26 (`check-bundle-size` lists 25 route ids under `/admin`, in part B's log and in shape 2's). Ruling 2 carries "26" twice, once inside the INC-1042 record text; I copy the record word for word into §14 unless the supervisor rules otherwise, and the report names the difference.
- The INC-1042 record reads "every non-admin page's first download falls by [2.0 → 2.3] KiB": three non-admin pages (`/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit`) fall by 1.4 to 1.5 (they already carried part of the admin-shell code). The report names it the same way.
- `scripts/ci/redact.test.ts` CF-REDACT-1 failed once in a full `bunx vitest run scripts --maxWorkers=2` run, then passed alone and in the next full run. I did not capture its message; it is reported as an intermittent finding.
- Scratch under `/tmp/ethio-scratch/housekeeping-4/`: `ratchet-c.mjs` (the ceiling script), `ceilings-c.json`, `size-c4.log` / `size-c5.log` (before and after the ceilings), `scripts-c.log`, `nav-layer.keep.ts`, `allow.keep`.
