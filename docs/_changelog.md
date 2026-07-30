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
