# HANDOFF — ethio.com — 2026-08-01 — Thread 1 (Phase 1 Identity; P1-c CLOSED; E2E harness ACCEPTED; pre-P1-d)

> HANDOFF IDENTITY (for disambiguation as more accumulate):
> - Handoff #: 1 (first handoff of the project)
> - Date/time: 2026-08-01
> - Author thread: "Thread 1" (the long founding thread — Pass 1 spec through Phase 1 email door + E2E harness)
> - Repo HEAD at handoff: e193b50 (docs-catchup commit). VERIFY with a fresh clone — this may have advanced.
> - Phase: Phase 1 (Identity), IN PROGRESS. Email door (P1-c) CLOSED. Next build: P1-d (Google door).
> - This file lives in docs/governance/handoffs/ once imported; future handoffs get their own dated file.

## 0. HOW TO USE THIS HANDOFF (successor thread, read first)
This handoff ACCELERATES orientation; it does NOT replace the §2 session-start ritual. Do the ritual FIRST:
1. `cd /tmp && rm -rf ethio && git clone https://github.com/tesfayekb/ethio-marketplace.git ethio`
2. Read: docs/governance/system-state.md → THIS handoff → tail of docs/spec/spec-ledger.md session log → docs/_changelog.md tail → `git log --oneline -10`.
3. State to the operator: HEAD SHA, current phase, last closed step, next planned step — ask for confirmation before proceeding.
The repo is authoritative. Chat memory is advisory. If this handoff and the repo disagree, the repo wins (and note the discrepancy).

## 1. WHAT THIS PROJECT IS
ethio.com — a greenfield rebuild of a classifieds marketplace: mobile-first, multilingual PWA for Ethiopians in-country and diaspora, expanding across Africa. Model: post → browse → contact seller. FREE in v1 (no payments/cart/checkout — DEC-001 defers all payments). Replaces an old WordPress site, no data migration.
Non-negotiable pillars: user-friendliness, lightweight (kilobytes = the user's money), security (trust is the product), multilingual (languages as equals), mobile-first (360px primary).

## 2. THE THREE-ROLE MODEL (unchanged, critical)
- OPERATOR (Tesfaye, tesfayekb): approves specs/scope; pastes prompts into Lovable; reports executor output; holds ALL secrets; final authority.
- CLAUDE (supervisor — you): author Pass-2 specs + execution prompts; VERIFY every executor result by FRESH CLONE (read-only; you never edit/commit the repo); maintain ledgers; monitor CI + security; ask, never assume.
- LOVABLE (executor): the ONLY agent that writes to repo/DB, always via operator-pasted prompts. Governed by in-repo AGENTS.md + Project Knowledge v3.1.
Every repo change flows: Claude prompt → operator paste → Lovable commit → Claude fresh-clone verification. You have READ-ONLY clone access and no other repo access.

## 3. GOVERNING DOCUMENTS (all in the repo — read them)
- Claude Project instructions v1.3 — in the PROJECT SETTINGS BOX (not the repo). Governs YOUR conduct. Key sections: §2 ritual, §3 pipelined workflow, §5 tiers, §6 dispositions (CLEAN/DRIFT/AMBIGUITY/ESCALATION), §7 banned patterns, §8 CI, §9 security, §12 guardrails G1–G15.
- /docs/spec/spec-ledger.md — ALL decisions (DEC), requirements (REQ), open questions (Q), + session log. THE single source of truth.
- /docs/governance/governance.md — engineering constitution + phase ladder.
- /docs/governance/phase0-spec.md, phase1-spec (if present) — approved Pass-2 specs.
- /docs/governance/system-state.md — current phase + closed gates (READ THIS FIRST).
- /docs/governance/launch-gate.md — pre-launch checklist.
- /docs/governance/lovable-knowledge.md — mirror of Lovable's Knowledge v3.1 (the LIVE copy is in Lovable's settings box).
- /docs/tracking/incidental-findings.md (INC-###), action-tracker.md (ACT-###).
- /docs/features/*.md — per-feature docs (auth-email-door, auth-security-tests, identity-schema, e2e-harness, i18n-runtime, etc.).
- /docs/decisions/*.md — e2e-testing-investigation, gold-standard-gap-analysis.

## 4. KEY DECISIONS ALREADY MADE (reference; do not re-derive — G6)
- DEC-001: free classifieds v1; no payments (archived, return later). DEC-002: diaspora + Ethiopia at launch. DEC-003: greenfield on ethio.com. DEC-004: PWA + Supabase + React, mobile-first 360px. DEC-005: soft launch. DEC-006: executor census → Lovable-led on its SSR stack (TanStack Start), standard supervision; Cursor reserve. DEC-007: own GitHub + own Supabase; Lovable Cloud banned from real project. DEC-008: single US DB at launch serving all incl. Ethiopia; physical Ethiopia partition + ECA registration deferred to Ethiopia-entity milestone (~yr 1) — operator accepted extraterritorial-reach risk; seams retained.
- DEC-009 (2026-08-01): mandatory server-side EXIF/GPS strip on ALL user image uploads (phase-gate for the image feature). DEC-010: CAPTCHA-ready auth (Cloudflare Turnstile, invisible) — seam threaded now, enabled at launch. DEC-011: reputation/ratings seam — listing/messaging MUST leave a rateable-interaction reference (rating off contact/marked-complete, not purchase).
- REQ highlights: REQ-002 i18n (keys only, dynamic language registry, EN+AM at launch, RTL-ready); REQ-005 geo-scoped feed; REQ-009 two-track enforcement (severe=freeze); REQ-012/033 partition seams + directory/profile split; REQ-014 three doors (email+Google+Telegram, no SMS); REQ-015 account linking (verified↔verified auto-link only); REQ-016 sessions 60d + step-up; REQ-021 centralized screening gateway; REQ-029 perf budgets (<500KB first visit); REQ-030 RBAC+ABAC; REQ-035 Ethiopia compliance; REQ-036 EXIF strip; REQ-037 CAPTCHA-ready; REQ-038 search-indexability + per-action rate-limiting (standing principles). Tier-2 TRACKED: generic notification pipeline, user-reporting, a11y (axe in E2E later).
- GEO pre-decision (Phase 3): ONE canonical locations tree table with is_active + RLS active-only visibility (apex supported_regions pattern) + partial index; the comprehensive world list is an ADMIN-SIDE picking source, never a DB table; listings FK locations.id regardless of activation.

## 5. WHAT'S BEEN BUILT (repo state)
- PHASE 0 (Foundation) — CLOSED. Docs foundation; 6 governance/spec docs imported; CI guards (build/typecheck/lint, gitleaks, migration-linter w/ self-test, hardcoded-string scan ENFORCING, prettier format:check PINNED to 3.8.3, bundle report); migration 0001 countries (ET/US active + others inactive; RLS public-read, deny-by-default writes).
- PHASE 1 (Identity) — IN PROGRESS.
  - Schema (P1-a) CLOSED: user_directory (global directory: home_country_code, country_source, handle slot, account_status) + profiles (partitioned personal) + handle_new_user trigger + confirm_home_country fn. Column-grant trick blocks user country writes. Deny-proofs D1–D7 recorded (scripts/deny-tests/phase1-identity.md). Functions hardened (PUBLIC/anon EXECUTE revoked).
  - i18n runtime (P1-b) CLOSED: /src/i18n (provider, useI18n, en.ts/am.ts lazy-loaded, typed Messages = compile-time key parity), language switcher, app-header.
  - EMAIL DOOR (P1-c) CLOSED — this was the bulk of Thread 1. /src/routes/auth.tsx (combined sign-in/sign-up, email fields top, URL-driven view+mode state), auth_.callback.tsx (implicit-flow verification handling), /src/features/auth (auth-service, use-auth, types). Supabase Auth config: Resend SMTP (test domain onboarding@resend.dev — delivers ONLY to operator's own gmail; custom domain = launch-gate); implicit flow (NOT PKCE — see §7 reversal); URL redirect config set; hardening toggles (secure email/password change, require-current-password, min-length 8). App PUBLISHED at https://ethio-market-dawn.lovable.app.
  - E2E HARNESS — ACCEPTED. See §6.

## 6. THE E2E HARNESS (accepted 2026-08-01 — you MUST maintain it; G15)
- Playwright, EXACT-pinned, chromium, two viewports (mobile-360 / desktop-1280). Runs as a separate CI job on every push.
- Targets the OWN ethio-staging Supabase project (NOT prod). An in-code prod-guard in e2e/global-setup.ts THROWS if pointed at the prod ref (zwmvxvzzvjvtdcfcwiuf) — never remove it.
- Serve mode = vite dev (Option B), chosen on EVIDENCE: the Cloudflare/Nitro production bundle (dist/server/wrangler.json) does NOT reproduce in the GitHub runner. Production-bundle behavior is a separate post-deploy manual/staging check.
- Pre-confirmed test users via Supabase Admin API (sb_secret_ key in GitHub Actions secret E2E_SUPABASE_SERVICE_ROLE_KEY; staging URL + publishable key also configured). Namespaced emails e2e+<runid>@ethio-e2e.invalid, deleted in global-teardown (verified zero residual).
- First spec e2e/smoke-auth-i18n.spec.ts: home renders → /auth opens sign-in mode → real-form sign-in (hydration-safe 5-attempt retry-fill with toHaveValue re-checks — REQUIRED because cold-start pre-hydration discards early fills) → header identity → Amharic string + <html lang="am"> → no 360px overflow → sign out. Passed both viewports, 3 green runs, zero flakes.
- STANDING RULE (G15): every feature ships with its own E2E test in /e2e, green in CI, before its phase closes. A red E2E job is a DRIFT-class event.
- Bring-up was hard (7 defects, all diagnosed from evidence): if E2E flakes, the retry-fill/hydration timing is the usual suspect; the app itself is proven correct.

## 7. SUPERVISOR REVERSALS / SLIPS LOGGED (learn from these; be honest like this — G8/G10)
- PKCE reversal: Claude set flowType:pkce for the email door; WRONG — PKCE can't exchange an email-link code cross-browser. Reverted to implicit flow. (INC-004.)
- Publish-before-retest omission: Claude repeatedly sent UI re-test instructions without "Publish first," causing tests against stale builds. Now G14.
- Class rules earned this thread: detected-error = fix-on-detect (§11); deterministic tooling / pin versions (INC-009, §8); arbitrary-recipient send = banned (INC-010a, §7).

## 8. WHAT'S LEFT / IMMEDIATE NEXT WORK (in order)
1. BACKFILL auth-door E2E tests: sign-up flow, check-email states (throttle 60s/max3, session-smart already-confirmed, cross-device forward guidance), sign-in errors (wrong password, unconfirmed) — so P1-c's hardening is regression-guarded. (Per G15, arguably should have shipped with P1-c; do it before P1-d.)
2. P1-d — GOOGLE DOOR (Tier A): Supabase Google provider, minimal scopes (email, profile); the REQ-015 auto-link rule (Google onto a VERIFIED existing email account = same user; UNVERIFIED = no auto-link); its deny test; thread the DEC-010 Turnstile token SEAM during this work. Should be FAST vs email (no confirmation-link machinery). Ships with its E2E test (G15).
3. P1-e Telegram door (custom Tier A: Login Widget, edge-function HMAC verify, freshness window, deny-tests for tampered/stale/replayed; NO phone in v1 — the widget provides no phone). P1-f settings surface (linked methods, sessions list, last-used pill, step-up, last-method-unremovable server guard). P1-g Phase-1 gate.
4. Then Phase 2+ per the ladder (RBAC, listings/categories, geography — see GEO pre-decision, feed, messaging, storefronts, T&S, notifications, backups). EXIF strip (DEC-009) must ship with the first image-upload feature.

## 9. LAUNCH-GATE ITEMS (not blocking dev; see docs/governance/launch-gate.md)
Custom SMTP domain (Resend); dev/preview DB (partly = staging); leaked-password toggle (Supabase Pro); Cloudflare Turnstile account + CAPTCHA enable; ROTATE the ethio-staging service-role key (it transited a chat during E2E setup); redirect URLs → ethio.com at cutover; Lovable badge-hide ON + visitor-analytics OFF (analytics currently ON — fix before launch) + auto-fix-security OFF (keep); EXIF strip live before images; ECA registration (Ethiopia-entity milestone).

## 10. OPERATOR WORKING STYLE (so the successor matches the relationship)
- Exhaustive, feature-by-feature; corrects bundling/rushing. Approves explicitly (silence ≠ approval).
- His pushback has repeatedly produced STRONGER architecture (enforcement two-track, linking security, dynamic languages, backend ownership, staging isolation, the "harden+test+document before advancing" phase-gate rule, and the E2E harness itself). Treat his challenges as signal.
- Wants gold-standard: never compromise the five pillars. Correctly refuses password prompts in unexpected places (Proofpoint isolation on his work computer — do email-link tests on his PHONE or a personal machine, never the work box).
- Prompts delivered INLINE between horizontal rules (his directive). Operator-facing turns are numbered checklists (G12).

## 11. HALF-FINISHED / WATCH ITEMS
- Instructions v1.3 just installed in the settings box; Lovable Knowledge v3.1 + H2 live. Docs-catchup just landed (this handoff written right after). No execution prompt is in-flight at handoff.
- api.github.com rate-limits the supervisor's shared-IP CI checks; the operator can glance the green checkmark when that happens.
- Deferred tracked tasks: eslint 9→10 toolchain upgrade; add a CI dependency-audit gate on GitHub's runner (INC-008).

## 12. THE NORTH STAR (why any of this matters)
Trust is the product: identities that can't be spoofed, screening that never sleeps silently, data where the law and user expect it, languages as equals, kilobytes as the user's money — a supervisor whose every "done" is backed by a fresh clone, and a machine that tests itself on every commit so regressions are caught by evidence, not by the operator's hand.

--- END HANDOFF #1 (2026-08-01) ---
