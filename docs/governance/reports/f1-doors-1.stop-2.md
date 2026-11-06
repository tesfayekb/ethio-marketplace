STOP — f1-doors-1 ruling 4 §1: the leaf module is built, and the first download did not fall — the auth service rides every page through the shell, not the provider (the import graph below); and QUESTION — ruling 4 §4: the local apply log carries no NOTICE lines, so the cost reading is not here
DONE: ruling 4 saved (`docs/governance/briefs/f1-doors-ruling-4.md`, byte-equal to the attachment); §0 the types patch (`git apply` clean, sha256 e1ce7d87…, typecheck green); the legal editor onto `base_languages` (part E: `listBaseLanguages` + shape guard, `useBaseLanguages`, LBL-1…3; `useLanguages` and the PSEUDO_LANG filter leave the editor); §8 (part F: `scripts/doors/live-query.sql` read verbatim, `--live-query` prints its bytes, DOORS-5 proven red on a planted join, wired); §9 (part G: the pooled super admin's `rate_limits` rows deleted in `resetLanguageBaseline`, logged; the census of fixed identities in `docs/features/e2e-harness.md`); §1 built (part H: `src/features/auth/preferred-language.ts`, `src/features/auth/auth-client.ts`, the provider and its three tests re-pointed, ASC-1/ASC-2 carried, PRL-1…2, the on-demand allowance line) and MEASURED — the measurement fails §1's expectation (below); §3 (part I: the Amharic of `door.refused` copied by script from `f1-1-am-strings.json`, sha256 4964882a…; am-script and strings-layers green); §2 (part I: the three RETIRED public-surface lines name `until F1-7 (DEC-347 …)` inside their reason — the allowlist's parser takes exactly three fields, so a fourth `| until` field would be a malformed line; a departure, below).
LEFT: §4's reading (question below); the browser check of every touched spec against staging; THE CHECKS whole; the self-review; the report with its Records; the pull request ready and its CI.
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `3dbd6d31dd2d9d8eded4c4a85bfcef3143d55424` (short `3dbd6d3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-06T05:13:32Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42164369112
(ruling 4 §0 names the run on 1ec4ea6ae, 42185001386, FAILURE — preflight, bundle budget, the smoke lane's door guard; the evidence branch's ci-status.md was not re-read for it at this stop)
FILES: the 52 of stop 1 (`docs/governance/reports/f1-doors-1.stop-1.md`), plus since 1ec4ea6ae (`git diff --name-only 1ec4ea6ae..HEAD`; 72 files in `git diff --name-only 596345a4c..HEAD`):
docs/features/doors.md
docs/features/e2e-harness.md
docs/features/legal.md
docs/governance/briefs/f1-doors-ruling-4.md
e2e/helpers/ui.ts
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/live-query.sql
scripts/doors/rows.ts
scripts/public-surface-allowlist.txt
src/features/admin/legal/legal-editor-form.tsx
src/features/admin/legal/legal-service.test.ts
src/features/admin/legal/legal-service.ts
src/features/admin/legal/use-legal.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-client.ts
src/features/auth/auth-service.ts
src/features/auth/preferred-language.test.ts
src/features/auth/preferred-language.ts
src/i18n/locales/am-base.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/integrations/supabase/types.ts

## The STOP (ruling 4 §1): the premise — "the auth service rides in the provider chunk" — was half the graph

§1 read the growth as the i18n provider importing the auth service. The provider did import it, and the leaf move takes that import away: the provider chunk falls from 19.9 KiB to 16.4 KiB gzipped. But the service does not leave the first download — it moves into the entry chunk (`index-*.js`: 126.1 → 129.6 KiB), because the shell imports it too, on every page, through the one auth hook:

```
src/routes/__root.tsx
  → src/components/app-shell.tsx:46        import { useAuth } from "@/features/auth/use-auth"
    → src/features/auth/use-auth.ts:7      import * as authService from "./auth-service"
      (uses signOut, signUp, signInWithPassword, resendConfirmation — the hook returns them to every screen)
      → src/features/auth/auth-service.ts:5  import { doorCode } from "@/lib/door-codes"
```

`rg -n "auth-service|door-codes" src/i18n src/components/shell src/routes/__root.tsx` (the ruling's command) finds nothing but a comment in `place-carry-service.ts:37` and the key's comment in `en-base.ts:778` — the service's path into every page is `src/components/app-shell.tsx`, which the command does not scan. The module is one chunk: `settings.tsx` uses `removeOwnPassword`, so its code (and `doorCode`) stays in the service's chunk, and the service's chunk is in the entry closure through `use-auth`. Nothing the provider imports changes that.

The measurement (`bun run build && node scripts/check-bundle-size.mjs` on this tree, local; the base column is CI's reading of 596345a4c, run 42162789510; a local build reads about 0.1 KiB under CI):

| page | base (CI) | stop 1 (local) | now (local) | ceiling |
|---|---|---|---|---|
| `/` | 233.8 | 234.0 | 234.2 | 235 |
| `/$name`, `/account_/saved` | 231.7 | 232.0 | 232.1 | 233 |
| `/account` | 276.2 | 276.4 | 276.6 | 277 |
| `/post` | 407.5 | 407.8 | 407.9 | 408 |
| `/post_/$listingId` | 407.4 | 407.7 | 407.9 | 408 |
| `/my-listings_/$listingId_/edit` | 407.5 | 407.8 | **408.0** | 408 |
| `/admin/listings` | 350.5 | 350.8 | 351.0 | 351 |
| `/admin/legal_/edit` | 290.8 | 291.1 | **286.1** | 292 |
| every other page (41) | — | +0.2…+0.3 | **+0.4…+0.5** | — |

Every page but one reads +0.4 to +0.5 KiB over its CI base (so about +0.5 to +0.6 CI-to-CI); the move added 0.1–0.2 KiB on top of stop 1 (a `return-path-*.js` chunk of 0.2 KiB now splits out, shared by the entry and the leaf's neighbours). The check FAILS: `/my-listings_/$listingId_/edit: 408.0 KiB, over its ceiling of 408 KiB` and ten more pages inside the 0.3 KiB band. The one drop is `/admin/legal_/edit` (−4.7 KiB): part E took `useLanguages` and the translations hooks out of the legal editor's chunk — the door's own list replaced the whole languages console. The full table is `/tmp/f1-pages.txt` on this computer (50 lines, from the two logs).

The leaf module is kept as built (commit `60c3d9cc5`, the allowance line `7242c7063`): the class rule stands on its own (a module every page loads imports leaf modules, never a feature's service), its tests are green (`src` 2291/2291, `scripts` 488/490 — NH-6 as before, machine zone files), and `ASC-2` now judges the one `getSupabase()` call in `auth-client.ts`. If the ruling prefers it reverted, it is one commit pair.

What would make the first download fall, for the ruling (none is mine to pick):
- (a) the shell's hook stops importing the whole service: `use-auth.ts` loads `auth-service` on demand (`loadOnce`) inside the four actions it returns (sign-out is a click; sign-up, sign-in and resend are the auth screen's submits) — the service leaves every page's first download; ESTIMATE −3 to −4 KiB per page; a change to a core auth file (rule 10 Runtime stability: core auth code changes only by DEC).
- (b) `removeOwnPassword` and `hasPassword` (the two readers of `doorCode` / the password-method block) move to their own module imported by `settings.tsx` only — `door-codes.ts` leaves the entry closure; ESTIMATE −0.3 KiB per page, back to the base; touches `auth-client.test.ts` (ASC-1's census) and `src/test/settings-messages.test.tsx`'s mock (stop 1's option a).
- (c) the ceilings rise by DEC-296's form for the eleven pages, each line naming INC-1069.

## The QUESTION (ruling 4 §4): the apply log holds no NOTICE

`grep -h 'door_context cost' ~/.cache/ethio-db-proof/apply.log` answers nothing: the log (419 lines, the last `db:proof PASS — applied 415/415, CLI 2.120.0, cold, 50 s` run of the final six files) carries 0 lines matching `NOTICE`, `WARNING` or `door_context` — CLI 2.120.0's `migration up --local` writes `Applying migration <mark>` lines and no server notices on this computer. The proof's threshold (over 10 ms fails the apply) held, so the median is under 10 ms per class; the ≤ 0.1 ms reading cannot be taken from this log. Where it can be read: the smoke lane's job log on the next push (`gh run view <run-id> --log --job <id>`, a read) if CI's CLI prints notices — the ruling says it does; if that log is bare too, the proof itself would have to write the medians somewhere the operator can read (a NOTICE is lost; a row in a scratch table is removed by the block; the one durable place is a RAISE with the numbers in an EXCEPTION's text — a failing apply — or the migration's own `COMMENT ON FUNCTION` text), which is a new migration and a ruling.

## Departures and findings since stop 1

1. §2's grammar: `scripts/public-surface.ts` `parseSurface` takes exactly three fields (`name | roles | reason`; a fourth fails the migration guard as a malformed line), so `until F1-7 (DEC-347 …)` sits at the end of each RETIRED line's reason, not as a kit field. Making the public-surface allowlist a four-field kit grammar is a parser change (F1-7's absorption).
2. The ruling's §1 command (`rg … src/i18n src/components/shell src/routes/__root.tsx`) does not scan `src/components/app-shell.tsx`, where the shell's import of the auth service lives; named so the next census reads the whole first-paint path (`node scripts/check-bundle-size.mjs`'s closure listing names the chunks; the graph is the rg above).
3. The sibling of INC-1070 (K2): `scripts/security-lints.ts:41` `SURFACE_QUERY` is a query assembled in code (one template literal, newlines kept, so it runs); by the class rule a query is a file read verbatim — out of this task's files, reported.
4. `src/features/auth/auth-client.ts` is a new file next to the existing `auth-client.test.ts`, which tests `auth-service.ts`'s actions (INC-915); the test's docblock and ASC-2 now name both files. The test file was not renamed (A2).
5. §9's census of fixed identities: the pooled super admin (reset by the helper now); the state file's base test user (`layout`, `shell`, `auth-callback`, `phone-frame`, `auth-signin-errors` sign it in themselves; no acquire helper to carry a reset; its preference, once saved, is not saved again) and `legal-doors.spec.ts`'s password sign-in of pool slot 0 (an aal1 proof, no page load through the language save) — named in `docs/features/e2e-harness.md`, not reset (K2).
6. `src/integrations/supabase/types.ts` changed by `git apply` of the supervisor's patch only (+87/−3; the six files' Functions, `door_refusals`, `door_ctx`); the PostgREST version line is as it was (the ruling's finding).
7. Test ids added since stop 1: LBL-1, LBL-2 (a case group in one `it.each`), LBL-3 (`src/features/admin/legal/legal-service.test.ts`); DOORS-5 (`scripts/doors/check-doors.test.ts`); PRL-1, PRL-2 (`src/features/auth/preferred-language.test.ts`); ASC-1's two entries and ASC-2's subject moved (`auth-client.test.ts`). None retired.
8. The browser check (ruling §5 (16)) is not yet run: §6 orders it after §1, and §1 stopped; the E2E names in this environment are not tested yet.
