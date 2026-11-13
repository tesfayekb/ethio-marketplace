STOP — app-fixes part F: INC-1135's re-entry needs two files neither the brief nor ruling 1 names
DONE: parts A, B, C, D, E; part F's generator, its bar, its unit test, the go-template's two sentences and its docs (steps 2–5 but the re-entry); five ceilings by their named causes
LEFT: part F's re-entry of the `@global-state` tests into the serial lane; steps 6–8
CI: lane — branches/cursor/app-fixes/ci-status.md: Commit `0bea41a` (stop 1), Conclusion: **SUCCESS**, completed 2026-11-13T17:55:08Z, run 43475544434. dev — ci-status.md at the root: Commit `3e3a51a`, Conclusion: **SUCCESS**, completed 2026-11-13T17:32:45Z, run 43472354920. `origin/dev` is still 3e3a51a89. Commits 9eedabf63 → 2917a170b are not pushed yet; this stop's push is their first CI.
FILES (git diff --name-only 3e3a51a89, with this report):
docs/features/admin-audit-security.md
docs/features/admin-shell.md
docs/features/design-foundation.md
docs/features/my-listings.md
docs/features/performance-strategy.md
docs/features/routes.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/app-fixes-ruling-1.md
docs/governance/briefs/app-fixes.md
docs/governance/go-template.md
docs/governance/reports/app-fixes.stop-1.md
docs/governance/reports/app-fixes.stop-2.md
e2e/admin-audit.spec.ts
e2e/dialogs.spec.ts
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/entry-admin-allowlist.txt
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/stale-reload-allowlist.txt
scripts/conformance/stale-reload.test.ts
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/impersonation-gate.test.ts
src/components/shell/impersonation-gate.ts
src/components/shell/impersonation-notice.test.tsx
src/components/shell/impersonation-notice.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/dialog-opener.test.tsx
src/components/ui/dialog-opener.ts
src/components/ui/dialog.tsx
src/components/ui/picture.test.tsx
src/components/ui/picture.tsx
src/components/ui/sheet.tsx
src/features/admin/impersonation/impersonation-banner.tsx
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/pseudo-bar.tsx
src/features/admin/translations/pseudo-generate.test.tsx
src/features/admin/translations/use-translations.ts
src/i18n/locales/am-base.ts
src/i18n/locales/en-base.ts
src/routes/api/listings/view.test.ts
src/server/ad-view.ts

## The question

The brief's re-entry rule (concern 6): the serial lane's command
(`.github/workflows/local-backend-proof.yml:795`, `--grep "@a11y" --workers=1`) regains the
`@global-state` tag, and `scripts/conformance/lanes-allowlist.txt` loses its line. The scope names
those two files. CF-LANES-1 judges them, and it reads two more files that pin today's split:

- `scripts/ci/lane-plan.ts:27` `export const SERIAL_TAGS = ["a11y"] as const;`, `:29`
  `SERIAL_GREP` (derived from it) and `:35` `export const NIGHTLY_TAGS = ["global-state"] as const;`
  (its comment `:30–34` names INC-1135). `scripts/conformance/lanes.test.ts:223`
  `expect(serialArg).toBe(SERIAL_GREP)` fails the moment the workflow says
  `--grep "@a11y|@global-state"` while `SERIAL_TAGS` says `a11y` alone.
- `scripts/conformance/lanes.test.ts:244` `expect([...allowed.keys()]).toEqual(["@global-state"]);`
  and `:245–246` `expect(found.length).toBeGreaterThan(0);` / every finding "runs in 0 lanes". With
  the tag in the serial lane, the real findings are none: `:244` fails, and `:245` fails. (The
  allowlist line, if kept, fails as stale.)

Neither file is in the brief's SCOPE nor in ruling 1 item 5's additions, so this is the ruling's
item 9 stop ("a file neither the brief nor this ruling names"). The stop-1 census did not list
these exact-list assertions keyed to INC-1135. That is the class ruling 1's prevention (2) names,
and the go-template sentence this turn adds would have caught it.

Proposed change, if the two files join the scope (one commit, then CI's serial lane is the proof):

```ts
// scripts/ci/lane-plan.ts
/** The serial lane's tags (`--grep "@a11y|@global-state"`); lanes 1 → 16 leave them out. */
export const SERIAL_TAGS = ["a11y", "global-state"] as const;
/** Tags no per-push lane runs (none since INC-1135's re-entry, the app-fixes turn). */
export const NIGHTLY_TAGS: readonly string[] = [];
```

```ts
// scripts/conformance/lanes.test.ts :244–246
expect([...allowed.keys()]).toEqual([]);
expect(found).toEqual([]);
```

The planted cases at `:247–268` stay unchanged. The "an @a11y test in none" case (`:260–263`)
keeps the census's proof that a test running in no lane is found. The workflow's `:794` comment and
`:795` grep become `@a11y|@global-state`. The four `--grep-invert "@global-state|@a11y"` lines
(`:260`, `:798`, `:801`, `:809`) and CF-LANES-1's `:224` assertion (`SERIAL_TAGS` + `NIGHTLY_TAGS`,
sorted) are unchanged. `docs/features/ci-local-backend.md` gains the re-entry line.

The other path: the re-entry waits for a later turn. INC-1135 then stays open, and `TR-30`'s proof
of INC-1137 in CI is the nightly's serial run, not this pull request's.

## What the supervisor should also know (for the report's §10, named here first)

- `d7b458e80` (parts C, D) and `314d1a881` (parts E, F) fail the first-download check on their own
  trees: five admin pages reached or crossed their ceilings. I did not build between those commits;
  the build after part F found it, and `2917a170b` raises the five by their causes. The causes,
  measured against part B's tree, built in place from `git show 7ea280e59:<path>` and written back
  from HEAD (`git status` clean after), chunk by chunk:
  - the opener hook (`dialog-opener.ts`, INC-1130) joined the notice-outlet chunk that every panel
    imports: 0.2 → 0.7 KiB;
  - `dialog.js` fell 1.2 → 0.9 KiB as its press code moved into the hook;
  - `sheet` rose 1.6 → 1.7 KiB and `alert-dialog` 0.8 → 0.9 KiB;
  - the pseudo bar's failed-keys line grew `admin.translations` 5.8 → 5.9 KiB.

  The entry is unchanged by parts C–F (`index.js` 128.3 KiB in both builds). Pages that draw a
  panel moved +0.1 to +0.7 KiB. The budget check is OK on `2917a170b`, with no page in the NEAR
  band.
- Red-first: PIC-6 and PIC-8 fail on 3e3a51a89's `picture.tsx`. PIC-7 (failed and decorative)
  passes on it, because the old primitive already hid that state. VWR-3 fails on the old route;
  VWR-4 (another error, as before) passes on both. PSG-1 through PSG-5 all fail on the old
  generator, PSG-1 because a target with no rows wrote nothing.
- Part E: the door answers `false` for an ad it cannot find
  (`supabase/migrations/20261019223105_fee22f72-e321-4aa2-9f6a-9c2a066e9e7a.sql:225`). The logged
  error is the race one step later: the counter's insert (`:231`) fails its link to the ad,
  Postgres `23503`. The route reads that code and answers `clientError("listingNotFound", 404)`,
  an existing door code, with an `[ad-view]` information line. No migration was needed.
- Part F: the base language's rows are read through `admin_export_translations`. Its matching and
  ordering line is `WHERE t.lang_code = p_lang AND (p_after IS NULL OR t.key > p_after) ORDER BY
  t.key` (`supabase/migrations/20261012101642_241cc49a-39e5-4fa0-843d-db74955dcbcb.sql:43–45`).
  With zero or several `isBase` rows, the generator throws `noSingleBase: <n>`, which
  `translationErrorKey` speaks as `admin.translations.error.generic`, with the code as the detail
  line. Generate stays disabled until the roster is read, so a roster that has not loaded is never
  read as "no base".
- K2 finding, outside this concern and not touched: `src/features/admin/translations/languages-page.tsx:104`
  reads the base total as `statsByLang.get("en")`, a literal language code (K4) where the roster's
  `isBase` row is the truth.
