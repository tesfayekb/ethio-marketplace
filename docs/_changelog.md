# Changelog (append-only)

2026-07-29 — docs: documentation foundation created (Phase 0 prompt A)
2026-07-29 — docs: imported Pass 1 specification set (6 documents, verbatim)
2026-07-29 — ci: guard skeleton (build/typecheck/lint, gitleaks, migration linter with self-test, string scan warn-mode, bundle report)
2026-07-29 — fix: lint-clean scaffold files; exclude generated files from lint/format (INC-001)
2026-07-29 — db: countries reference table (migration 0001, applied + verified); migrations rulebook added
2026-07-29 — governance: Phase 0 gate CLOSED; Knowledge v3.1 mirrored to repo; Phase 1 spec session open
2026-07-30 — db: identity function hardening; deny-proofs D1–D7 executed and recorded
2026-07-30 — i18n: runtime + en/am locales + language switcher (Phase 1 P1-b)
2026-07-30 — i18n: keyed scaffold error/not-found strings (INC-002); string-scanner promoted to fail-mode
2026-07-30 — auth: email sign-in door (signup, signin, email verification, callback) — Phase 1 P1-c
2026-07-30 — auth: browser client set to PKCE flow (detectSessionInUrl) for reliable email-link session exchange (INC-004 follow-up)
2026-07-30 — auth: revert to implicit flow; fix callback success/session logic (INC-004) and check-email sign-in navigation (BUG 2)
2026-07-30 — auth: resend throttle + honest states (INC-005), URL-driven auth views (BUG 2b), DEBUG panel removed
2026-07-30 — auth: remove editable resend-to input (D-004 drift, abuse vector); URL-driven sign-in/sign-up mode (BUG 2c)
2026-07-30 — auth: check-email view live-detects confirmation (same-browser) + forward guidance (cross-device); no more dead-end (INC-005 completion)
2026-07-30 — auth: consolidate check-email actions (D-005)
2026-07-30 — auth: iOS same-browser confirmation detection via storage rehydration (INC-005 final)
2026-07-30 — auth: session-smart already-confirmed path; INC-005 closed with best-effort auto-flip ruling
2026-07-30 — security: scan rulings documented in-schema; function grants re-verified (INC-006)
2026-07-30 — docs: formatting debt resolved; records exempted from tooling, living docs CI-covered (INC-007)
2026-07-30 — fix: format-check red main (CI-exact command) — INC-007 final
2026-07-30 — deps: audit ruled dev-only-accepted; no change (Bun override not scopeable); eslint upgrade + audit-gate tracked (INC-008)
2026-07-30 — docs: format slip fixed (INC-008 follow-up)
2026-07-30 — ci: pin prettier exact + deterministic format:check script (INC-009)
2026-07-30 — security: adversarial auth test pass documented (P1-c capstone)
2026-07-30 — security: remove arbitrary-email resend abuse vector from /auth/callback (INC-010a)
2026-07-30 — security: auth adversarial capstone finalized — all pass or ruled; INC-010a fixed, INC-010b ruled (P1-c capstone)
2026-08-01 — test: add Playwright E2E harness (staging-targeted) + CI e2e job; frozen first spec
2026-08-01 — ci: fix E2E webServer — serve the built Worker with wrangler instead of `vite preview`
2026-08-01 — ci: point E2E wrangler serve at dist/server/wrangler.json (fixes fresh-checkout startup failure)
2026-08-01 — ci: E2E webServer switched to dev-server mode (Option B); e2e job no longer builds; debug step removed
2026-08-01 — test: E2E spec waits for signed-in state (Sign out button) before identity assertions (mobile-360 race)
2026-08-01 — test: E2E global-setup made self-verifying and fail-fast (preflight log, create/read-back/profile-trigger proofs)
2026-08-01 — test: E2E global-setup removes RLS-protected profiles-row check; trigger correctness covered by P1-a deny-tests
2026-08-01 — test: E2E sign-in fills are self-checking (toHaveValue guards, anchored locators) — empty-email submit fixed
2026-08-01 — test: E2E cold-start sign-in waits for hydration and retry-fills both controlled fields until stable
2026-08-01 — docs: catch-up — P1-c closure + INCs, DEC-009/010/011 + REQ-036/037/038, gap analysis, E2E harness acceptance, launch-gate checklist, system-state to current, v1.3 recorded
2026-08-01 — governance: Thread 1 handoff imported to handoffs/ (Phase 1, P1-c closed, E2E harness accepted, pre-P1-d)
2026-08-02 — ci: add CI status reporter workflow (workflow_run of CI → writes docs/tracking/ci-status.md, [skip ci]); CI push trigger ignores the status file
2026-08-02 — ci: exempt machine-generated docs/tracking/ci-status.md from prettier (INC-011); document CI status reporter capability
2026-08-02 — test: auth-door E2E backfill (A-1..A-3, B-1..B-4, C-1..C-4); shared e2e helpers; namespace-sweep teardown
2026-08-02 — test: gate sign-up E2E cases behind E2E_EMAIL_SINK (INC-013); restore routeTree SSR types; drop orphan i18n key (INC-012)
2026-08-02 — fix: relocate SSR Register type augmentation out of generated routeTree (INC-014)
2026-08-02 — ci: enable sign-up E2E cases via E2E_EMAIL_SINK; staging SMTP now a Mailtrap sandbox (INC-013 resolved)
2026-08-02 — test: fix A-3 virtual-clock mechanism (INC-015); add sign-up error diagnostics (INC-016)
2026-08-02 — fix: resend cooldown engages on click, not on success (INC-017); pace E2E sign-up sends (INC-018)
