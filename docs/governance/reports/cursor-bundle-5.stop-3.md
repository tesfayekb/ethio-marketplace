STOP — cursor-bundle-5 part 4: the staff gate's harness census (about 106 sign-in sites in 33 specs, not the 20 the ruling counted)
DONE: parts 1, 2, 3 (pushed earlier, stop 2 was the migration, applied on staging); part 4 coded and committed locally: account security concerns 1–4, the staff gate (DEC-434) wired in src/routes/admin.tsx, the nine useShell callers, the status read (INC-1264), CF-AUTH-1, CF-SESSION-5, the six notices and the CI backend settings. Steps 1–5 of rule 00 for parts 1–4; step 6 (the gate, `bun run checks`) NOT run; steps 7–10 not reached.
LEFT: the staff specs' aal2 answer (this stop's question), the docs under docs/features/, the first-download check and DEC-296 ceilings, step 6 whole, the browser check by --grep, step 8 self-review, the one final push, the report.
CI: (adb10b7, the last commit pushed; branches/cursor/bundle-5/ci-status.md)
- Commit: `adb10b7c35a4e21e3488acbd565a3d3daa388ec5` (short `adb10b7`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-23T14:09:46Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45187492568
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a579f106ddf3… (0 read)
CI read now (gh pr checks 100): red = Lane 10, Lane webkit (each its "Run proof lane" step, exit 1) and the merged "E2E (Playwright, ethio-staging)"; every other check green, repeat and Lane 13 included. NOT CLASSIFIED: the logs I read name no failing test for Lane 10 or webkit (e2e-last-failure.md lists only the repeat lane's two errors outside any test, INC-589, the time cap, "Failed: 2"). Part 4 is not in that run (it is local and unpushed), so no path of part 4 can have caused it; whether part 1–3 paths did I cannot show. It is named under Limits, not claimed as infrastructure.
dev: origin/dev is now 92fee7d1a (Lovable's bundle 7, PR #101, 15 files vs my base a14f032b6). None of them is among the 103 files of this branch (checked by comm over both name lists). One is a file I will edit at the ceilings step: scripts/route-budgets.mjs. I do not merge or rebase; the supervisor rules.
FILES: (git diff --name-only a14f032b6 HEAD before this report; 103)
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/doors.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/cursor-bundle-5-ruling-1.md
docs/governance/briefs/cursor-bundle-5-ruling-2.md
docs/governance/briefs/cursor-bundle-5.md
docs/governance/reports/cursor-bundle-5.stop-1.md
docs/governance/reports/cursor-bundle-5.stop-2.md
e2e/admin-categories-console.spec.ts
e2e/admin-categories-lifecycle.spec.ts
e2e/admin-translations-console.spec.ts
e2e/helpers/filters.ts
e2e/helpers/mail-sink.ts
e2e/helpers/staff-factor.ts
e2e/house-style.spec.ts
e2e/mfa-stepup.spec.ts
e2e/settings.spec.ts
public/i18n-usage.json
roadmap.md
scripts/brief/check-go.ts
scripts/brief/go-laws.ts
scripts/check-migrations.sh
scripts/ci/backend-config.py
scripts/ci/backend-config.test.ts
scripts/ci/local-backend-config.toml
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/ci/prepare-local-backend.sh
scripts/conformance/auth-credentials-allowlist.txt
scripts/conformance/auth-credentials.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/on-demand-failure-allowlist.txt
scripts/conformance/session-reads-allowlist.txt
scripts/conformance/session-reads.test.ts
scripts/conformance/stale-reload-allowlist.txt
scripts/conformance/stale-reload.test.ts
scripts/conformance/wired.test.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/live-staff-rules.sql
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/doors/staff-rules.ts
scripts/fixtures/public-grant-revoked-example.sql
scripts/public-surface-allowlist.txt
scripts/public-surface.test.ts
scripts/public-surface.ts
src/components/marketplace/feed.test.tsx
src/components/marketplace/feed.tsx
src/features/account/account-overview.tsx
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.test.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin/translations/ai-bulk-bar.test.tsx
src/features/admin/translations/ai-bulk-bar.tsx
src/features/admin/translations/bulk-collect.ts
src/features/admin/translations/translations-service.ts
src/features/admin/users/staff-form-gates.test.tsx
src/features/admin/users/user-detail.tsx
src/features/auth/account-status.ts
src/features/auth/auth-client.test.ts
src/features/auth/auth-error-key.ts
src/features/auth/auth-service.ts
src/features/auth/mfa/mfa-service.ts
src/features/auth/mfa/staff-factor-gate.test.tsx
src/features/auth/mfa/staff-factor-gate.tsx
src/features/auth/mfa/staff-factor.ts
src/features/auth/mfa/use-mfa.ts
src/features/auth/types.ts
src/features/auth/use-auth.test.tsx
src/features/auth/use-auth.ts
src/features/legal/my-legal-page.tsx
src/features/legal/my-legal-version.tsx
src/features/posting/wizard.tsx
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/routes/admin.tsx
src/routes/auth-forms.test.tsx
src/routes/auth_.reset.tsx
src/routes/dev.style.tsx
src/routes/l.$slug.tsx
src/routes/settings.tsx
src/test/settings-messages.test.tsx
supabase/migrations/20261123131500_ee2c7dee-14da-4f27-8122-068afc226a75.sql
supabase/templates/email_changed.html
supabase/templates/identity_linked.html
supabase/templates/identity_unlinked.html
supabase/templates/mfa_factor_enrolled.html
supabase/templates/mfa_factor_unenrolled.html
supabase/templates/password_changed.html
supabase/templates/subjects.json

THE CENSUS THE RULING DID NOT HAVE
Ruling 1 counted "20 harness sites": the explicit `admin_panel` scratch grants. The staff gate (a staff user at aal1 sees the set-up or code panel, not the screen) also meets every spec that makes a staff account by `grantRole(admin | moderator | super_admin)` and signs it in at aal1 through `switchUser`, `signInViaSession` or the UI. Counted from the tree at HEAD:
- 86 `grantRole(` sites naming admin, moderator or super_admin, in 25 spec files;
- 20 explicit `admin_panel` scratch grants, in 8 spec files;
- about 106 sign-in sites in all (the two sets overlap; I did not de-duplicate them).
Evidence it is real, on ethio-staging, `mobile-360` and `desktop-1280`, 0 retries: rbac R-8, admin-users AU-1 and AU-2 FAIL with the gate's panel where the screen was expected. STAFF-E1/E2 (the gate's own tests), ACS-E1/E2, S-2, S-3, S-4 pass. The other 22 specs are not run locally (rule 00 step 7: no whole specs); CI would turn most of the staff lanes red on the push.
The gate itself is as the brief words it: a missing, failed or unverified factor never reads as ready (`readStaffFactor`: failed | setupNeeded | codeNeeded | ready; AG-U1..U4).

THE QUESTION — which way (the supervisor rules; I build nothing else of part 4 until then)
(a) A helper-level answer, one place: the sign-in helpers (`signInViaSession`, `switchUser`, the pool's staff lease) give a staff account an aal2 session when the gate would ask for one: enrol a verified TOTP once per account (`enrolVerifiedTotp`, cached by email + password, friendly_name "staff-gate-check"), mint the aal2 session in node (`totp`, `totpStep`, a code is accepted once per 30 s step; the pool super admin already has `freshAal2Session`). Touches e2e/helpers/** only; the 25 + 8 specs stay as they are. Risks I name: the pool reap deletes MFA factors at lease (the cache must key on the leased account's state, not only its email); two workers must not use one TOTP step; the helper change reaches every importer, so the repeat lane re-runs a wide set.
(b) Per-site edits in the 33 specs: each site names its aal2 sign-in. Scope: 33 spec files plus their helpers, a large diff, and CF-LANES weights and the repeat lane move with it. I do not recommend it.
(c) Split: the gate (src/routes/admin.tsx, staff-factor.ts, staff-factor-gate.tsx, AG-U1..U4, STAFF-E1/E2) leaves this bundle and lands with bundle 6's server half (DEC-438), where a gate and its harness answer land together; bundle 5 then ships concerns 1–4, the status read and the two censuses without it. Cost: DEC-434 stays "built, not wired" in §14 and the staff gate is not live after bundle 5.
My recommendation: (a), because it is one mechanism in one folder and the rule is "a second local version of a mechanism is a defect"; if the supervisor sees the TOTP-step or reap risk as too wide for this bundle, (c).

Other limits already known, for the report: ACS-E3/E4 need the local mail sink (Mailpit, temporary backend only; CI is their proof, staging has none); the six notices go through the shared `email_sent` limiter (30), which I have not exercised; scratch copies under /tmp/ethio-scratch/cursor-bundle-5/ are the operator's to remove.
