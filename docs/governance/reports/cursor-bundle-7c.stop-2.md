STOP — cursor-bundle-7c part 4: the auth server writes a 500's cause on the request line, and the capture does not read it
DONE: STEP 0, the census, ruling 1 saved; part 1 (e30ebddd6, 88ed321cd), part 2 (ea5494dee), part 3 (885bb5bf8)
LEFT: part 4; STEP 6 onward (the gate, the self-review, the push, the report)
CI: this branch's last completed run, read from ci-evidence (branches/cursor/bundle-7c/ci-status.md) —
# CI Status (auto-generated — do not edit by hand)

- Commit: `f7ede957a0b852a4d0ba1be5413ee1907ee08d8b` (short `f7ede95`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-26T07:38:54Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45772935453
(that run is stop 1's commit: 0 gating failures, the smoke source without results — the live red that part 1's second commit, 88ed321cd, fixes at its root; its four flaky tests include three `POST /factors/[account id]/challenge failed (500)` setups, INC-1303 itself. No run since: nothing was pushed after stop 1.)
FILES:
docs/features/ci-guards.md
docs/features/doors.md
docs/features/rbac-client-seam.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-7c-ruling-1.md
docs/governance/briefs/cursor-bundle-7c.md
docs/governance/reports/cursor-bundle-7c.stop-1.md
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/conformance/door-permissions-allowlist.txt
scripts/conformance/door-permissions.test.ts
scripts/conformance/door-permissions.ts
scripts/conformance/door-words-allowlist.txt
scripts/conformance/door-words.test.ts
scripts/conformance/door-words.ts
scripts/conformance/kit.test.ts
scripts/conformance/kit.ts
scripts/conformance/package-price.ts
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/wired.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/door-types.ts
scripts/doors/judge.ts
scripts/doors/live-query.sql
scripts/doors/manifest.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
src/components/shell/failure-notice.census.test.ts
src/features/account/saved-remove-refusals.ts
src/features/ad-page/ad-page-refusals.ts
src/features/admin-ai/ai-feature-form.tsx
src/features/admin-ai/ai-refusals.ts
src/features/admin-attributes/attribute-refusals.ts
src/features/admin-categories/category-refusals.ts
src/features/admin-countries/country-refusals.ts
src/features/admin-listings/listing-policy.ts
src/features/admin-listings/listing-refusals.ts
src/features/admin-listings/photo-remove.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/undo-edit.ts
src/features/admin-locations/location-refusals.test.tsx
src/features/admin-locations/location-refusals.ts
src/features/admin-monetisation/monetisation-refusals.ts
src/features/admin-screening/use-photo-changes.ts
src/features/admin-screening/use-photo-reviews.ts
src/features/admin-screening/use-screening.ts
src/features/admin/impersonation/impersonation-end-refusals.ts
src/features/admin/impersonation/impersonation-refusals.ts
src/features/admin/impersonation/impersonation-starter.tsx
src/features/admin/import-dialog.test.tsx
src/features/admin/import-dialog.tsx
src/features/admin/legal/legal-service.ts
src/features/admin/roles/roles-service.ts
src/features/admin/translations/languages-page.tsx
src/features/admin/translations/translations-service.ts
src/features/admin/users/access-refusals.ts
src/features/admin/users/admin-users-service.ts
src/features/legal/legal-accept-refusals.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/permissions/door-permissions.generated.ts
src/features/permissions/use-may-call.test.ts
src/features/permissions/use-may-call.ts
src/features/posting/field-refusals.ts
src/features/posting/refusal-text.ts
src/features/posting/step-where.tsx
src/lib/door-codes.generated.ts
src/lib/door-family.ts
src/lib/refusal-tail.ts
src/routes/auth.tsx
src/routes/auth_.reset.tsx
src/routes/settings.tsx

THE PREMISE THE CENSUS PROVES WRONG (brief, THE SYSTEM fix 3, MECHANISM): "the server logged no cause
beyond 'request completed'". The server writes the cause on that very line; the capture does not read
the field it is in.

What the source shows, for the version CI runs:
- The CLI pin `SUPABASE_CLI_VERSION: 2.120.0` (`.github/workflows/local-backend-proof.yml:13`) runs
  `supabase/gotrue:v2.197.0` (supabase/cli tag v2.120.0, `apps/cli-go/pkg/config/templates/Dockerfile`).
- The challenge handler's 500 branches (supabase/auth tag v2.197.0, `internal/api/mfa.go`):
  `challengeTOTPFactor` :428–459 returns an error only from its one transaction (:439–451) — the
  challenge's insert and the factor's `last_challenged_at` update (`internal/models/factor.go`
  `WriteChallengeToDatabase` :392–405) and the audit-log insert. Any database error there answers
  500 `unexpected_failure`. No branch names a cause of its own.
- Where a 500's cause is logged (`internal/api/errors.go`): `handleResponseErrorDefault` :231 sets the
  request's log entry field `error` to `Unhandled server error: <the error>`; `handleResponseErrorHTTP`
  :160 sets it to the HTTP error's cause. That entry is the request line, the one whose msg is
  "request completed".
- `scripts/ci/auth-log-capture.py` reads, for a line with a status, only `error_code` and `msg`
  (:63–65); the `error` field of a status line is never read, and the docstring's "the request line of
  a 500 says only 'request completed', the reason is its own entry" does not hold for v2.197.0. The 7b
  report's lines `error 500 POST /factors/:id/challenge: -: request completed` (§15) are the capture's
  reading, so the server's cause for those four 500s is unread, not absent.
- The log level: the CLI's auth environment builder (supabase/cli v2.120.0,
  `apps/cli/src/commands/start/services/gotrue.service.ts` `buildGotrueEnv` :337) sets no log level, and
  the config template (`apps/cli-go/pkg/config/templates/config.toml`) has no auth log key: the CLI does
  not let the lane run the auth server more verbosely. `local-backend-proof.yml` is unchanged.
- The harness's own causes the rule names: two challenges for one factor at once would update one row,
  which Postgres serialises by its row lock (a wait, not an error); and each worker has its own pool
  slot and factor (7b stop 1, P3: `parallelIndex % pool.length`, pool size = the lane's workers). The
  source names no cause the harness controls, so rule (A)'s fix has nothing to fix today — but the
  cause the rule asks for is one field away in the log CI already keeps.

QUESTION — which way Part 4 lands (the frozen rule's branch is the supervisor's to confirm, since its
premise moved):
- (a) Rule (B) as frozen (a challenge 500 joins the attempt loop with a fresh challenge, printed
  `[e2e:setup] challenge 500 on attempt <n> for <label>`, DEC-480 word for word in the Records), AND the
  capture prints a 500 request line's `error` field beside its code and msg (cut at 120 characters, ids
  made `:id`, through the one redaction), with its case in `scripts/ci/auth-log-capture.test.ts` — so the
  next CI names the cause and rule (A) can be judged then. Both files are in SCOPE.
- (b) The capture change only; no retry this turn. INC-1303 stays open until the next CI's capture names
  the cause, and the retry or the harness fix is decided on it.
- (c) Rule (B) only, the capture unchanged.
My recommendation is (a): the retry is exactly DEC-480's ("the cause stays open and is read when a log
names it"), and the capture's one field is what makes "when a log names it" reachable on this CLI.
