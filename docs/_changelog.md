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
2026-08-03 — test: A-3 uses clock.runFor, not fastForward, so the cooldown countdown completes (INC-019)
2026-08-03 — test: A-3 resend exhaustion moves to a nightly real-time E2E job with heartbeat (INC-020)
2026-08-03 — test: guard-proof workflow proves B-3 and C-4 bite against mutation fixtures
2026-08-03 — test: guard-proof now proves both directions per guard via JSON-parsed A/B (INC-021)
2026-08-03 — fix: guard-proof writes JSON report via PLAYWRIGHT_JSON_OUTPUT_NAME (INC-021 follow-up)
2026-08-03 — docs: guard proof recorded as passed; thread 2 handoff imported
2026-08-03 — governance: DEC-012 re-scopes the phase ladder; Telegram door moves to a later named phase
2026-08-03 — feat: Google door (P1-d) — minimal scopes, enumeration-safe link refusal, Turnstile seam, scope-creep E2E guard
2026-08-03 — fix: country_source gains 'unknown'; remove US sentinel from handle_new_user; correct fabricated rows (INC-022)
2026-08-03 — fix: G-1 intercepts our first-hop authorize request, fulfilled not aborted (INC-023); Google spec mobile-only
2026-08-03 — docs: P1-d closed — D-8/D-10 deny evidence recorded, D-9 deferred-named, launch-gate re-run item added
2026-08-03 — feat: P1-f settings surface — identity read-only, sign-in methods with server-enforced last-method guard, password/email change, sign out other devices
2026-08-03 — fix: anchor sign-out locators (S-3); settings nav entry; relative-time formatter to lib
2026-08-03 — test: U-1..U-3 identity-unlink deny evidence via admin script (P1-f)
2026-08-03 — fix: unlinking the email identity now kills its password; existing ghost credentials corrected (INC-024)
2026-08-03 — docs: P1-f closed — settings surface deny-proven; INC-024 fix verified on both databases
2026-08-03 — feat: P1-g truth model — has_password()/remove_own_password(), password as its own sign-in method, neutral-always reset request
2026-08-03 — feat: P1-g password recovery — /auth forgot view, /auth/reset landing, R-2/R-3/S-4 E2E
2026-08-03 — test: A-1+A-2 merged to one sign-up; nightly A-3 gated on E2E_EMAIL_SINK; remove_own_password deny proof added
2026-08-03 — ci: enforcing dependency-audit job (fails on high/critical, and separately on an unreachable advisory service)
2026-08-03 — fix: P1-g probe workflow re-raises a failing phase-2 verdict instead of masking it (Step P)
2026-08-04 — chore: same-major overrides clear the 8 high dependency-audit findings (INC-025)
2026-08-04 — chore: recovery-identity probe retired (superseded by ruling R2; guarded by E2E R-2/S-4)
2026-08-04 — test: b3 guard-proof fixture regenerated against the moved auth surface
2026-08-04 — governance: PHASE 1 CLOSED — gate evidence recorded; handoff #3 imported; launch-gate swept
2026-08-04 — fix: forgot-password resubmit gains the INC-017 cooldown + per-visit cap (INC-026a); nightly E2E sink flag reconciled with ci.yml (INC-026b)
2026-08-04 — ci: nightly heartbeat push regenerates after fetch and retries; test outcome alone decides the job (INC-027)
2026-08-04 — feat: P2-a geography — locations tree (active-only RLS, ET+US shallow seed); Phase 2 opened
2026-08-04 — feat: P2-b categories + attribute schema (three-concept model, starter ethio.com seed)
2026-08-04 — docs: INC-029 — reported staging locations drift dismissed (prod is 32 rows: 2/12/18; "18" was the city count); no cleanup, re-runnability lesson recorded
2026-08-04 — feat: P2-c listings core — state machine, screening seam + bypass guard, private photo bucket (strip-gated), per-category expiry
2026-08-04 — feat: listings.tier column (LIVE v1 ranking lever) + partial feed-order index (P2-c-tier)
2026-08-04 — feat: design foundation — unified AppShell, config-driven permission-gated panels, coffee-on-cool-slate oklch tokens, Inter/Bricolage/Noto Sans Ethiopic, brand mark + spinner, Marketplace feed shape
2026-08-04 — fix: gitleaks prose false positive fingerprinted (INC-030); feed fails soft and contained so no feature outage cascades through the shell (INC-031)
2026-08-04 — fix: E2E specs repointed at the AppShell's real structure + hydration-aware navigation helpers (INC-032, INC-033); 44px tap-target floor enforced on header/footer chrome (INC-034); mobile/perf/security assertions added to shell.spec; marketplace weight guard added to CI
2026-08-04 — feat: layout revision — warm/cream purge to cool slate (gold restricted to logo dot + Featured badge), corner-block grid, exact logo lockup FIT, minimal top bar with expandable search, 3-column centered footer, recursive rail submenus, pre-paint dark-mode toggle
2026-08-04 — ci: first-paint bundle budget guard (gzipped JS/CSS ceiling, ratcheted)
2026-08-04 — feat: final layout refinement — corrected vertical stack (top bar → panel tabs → location row → clickable breadcrumbs → body), minimized top bar with full-width mobile search row, panel tabs replacing the bar dropdown (signed-in only), built-visible cascading location row (filtering stubbed), clickable category breadcrumbs, self-drawing spinner, compact centred footer, tighter rail rows, tightened logo lockup
2026-08-05 — fix: layout correction pass — top bar fills grid row 1 (aligned with the logo cell), responsive breakpoint lg→md so tablets get the persistent rail + full controls (real search field, language name, labelled account) and only phones minimize, footer as equal 3-column grid with halved row spacing, location row shows the resolved area once, breadcrumb root Home returns to the Marketplace feed + panel (tab still "Marketplace")
2026-08-05 — fix: shell stabilization — rail-collapse state unified on the `data-rail` attribute (INC-036), search-row logical-position utilities corrected so 360px no longer overflows (INC-037), E2E locators repointed at the moved identity and rail surfaces (INC-038); local pw config gitignored
2026-08-05 — fix: layout polish — descriptive per-category rail icons (INC-039), rail-collapse toggle moved to the top bar (INC-040), location selector rebuilt as a strict Country → Region → City → Sub-city cascade with no duplicated area label (INC-041), sidebar hover states moved onto the sidebar token family (INC-042)
2026-08-05 — fix: layout polish round 2 — breadcrumb root no longer repeats "Marketplace" (INC-043), feed body centred with equal gutters (INC-044), wordmark relocates to the top bar when the desktop rail collapses (INC-045), single sidebar affordance per breakpoint confirmed (INC-046), tighter footer rows with intact 44px tap boxes (INC-047)
2026-08-05 — fix: CI red + render-walk pass — footer tap-target assertion repointed at the real footer link (INC-051), collapsed-rail bar brand unified as the mark-less two-line lockup (INC-048), bar search width capped so the language control is never crowded at tablet width (INC-049), category tree cached with skeleton rows while loading (INC-050)
2026-08-05 — fix: shell panel-scoped chrome — location row gated to the Marketplace panel; category-rail purity and mobile collapse-toggle absence locked by E2E (INC-052 – INC-054).
2026-08-05 — fix: CI red + render-walk — collapse toggle genuinely hidden below md via cn()/twMerge display-conflict resolution (INC-055), panel-tabs row fits instead of scrolling (INC-056), category-tree caching re-confirmed (INC-057), marketplace-rail purity re-asserted incl. the mobile drawer (INC-053).
2026-08-05 — fix: shell panel/route sync — /settings now renders inside the Account panel context, not the marketplace rail (INC-058); top-bar controls right-aligned at md+ (INC-059); admin gating re-confirmed unchanged.
2026-08-05 — docs: thread-3 handoff + performance strategy + posting-flow spec + posting foundations build plan imported.
2026-08-05 — ci: CI Status Reporter regenerate-after-fetch + retry (staleness class, third strike; mirrors nightly INC-027 fix)
2026-08-07 — docs: DEC-013 resequencing ratified (Phase R RBAC-first; F/G named); REQ-039/040 adopted; gap register created; S25 + INC-060/061 recorded
2026-08-08 — feat(rbac): Phase R1 — RBAC core schema/functions/triggers/seeds + superadmin bootstrap (DEC-013, REQ-030)
2026-08-09 — fix(rbac): R1a — lock down log_audit/helper EXECUTE grants (INC-062); cascade-aware base-role guard (INC-063)
2026-08-09 — feat(rbac): R2 — admin policies retrofit across catalog/listings/profiles via has_permission (Phase R, DEC-013)
2026-08-09 — feat(rbac): R2b — append-only audit trigger; audit perms pruned to view/export; per-command RBAC policies; INC-064 probe portability; definer-grant CI guard

- 2026-08-09 — Phase R3: RBAC client seam (`src/features/permissions`), `/admin` route with redirect gate, permission-driven Admin panel tab, browse-path CI guard with self-test, RBAC E2E (`e2e/rbac.spec.ts`), and the function-matrix proof migration applied to ethio-prod. Docs: `docs/features/rbac-client-seam.md`.
- 2026-08-09 — test(rbac): R3a — assign/revoke success-path + audit write proofs (closes the Phase R function matrix)
- 2026-08-09 — fix(ci): changelog list-prefix red-main repair; pin bun 1.3.14 (INC-009 determinism; INC-065)
- 2026-08-09 — docs: Phase R gate record — S26, four-lens close-out review, system-state updated (DEC-013 Phase R complete)
- 2026-08-09 — feat(catalog): A1 — 96-category taxonomy (15 roots) + 54 attribute definitions with pointer-walking inheritance (get_category_attributes), icons + image seats (DEC-013, REQ-017/020; Apex donor, metric adaptations)
- 2026-08-10 — fix(catalog): A1b — operator-directed restructure: Vehicles intermediate under Automotive carries vehicle attrs (parts no longer inherit them); Computers + Phones under Electronics; 6 legacy dupe roots retired; 13 roots / 97 categories (INC-066)
- 2026-08-10 — feat(catalog): A2 — listing_locations with single-country trigger law, owner-managed RLS + admin read, cascade + deny proofs (DEC-013, F2)
- 2026-08-10 — feat(catalog): A2b — exact-pin columns (lat/lng/map_visible) with pair/visibility/range laws + owner UPDATE; INC-067 policy split (anon path free of has_permission)
- 2026-08-10 — feat(profile): A3 — seller alias (unique, validated), contact methods (phone/telegram/whatsapp + visibility laws), default post location for prefill; column-grant extension proven (F12/F13, personal-only v1)
- 2026-08-10 — docs: Phase A gate record — S27, four-lens close-out, system-state updated; Phase R gate stamped (staging addenda)
- 2026-08-10 — docs: DEC-014 ratified — foundations-first admin epoch (U0–U8) before the wizard; REQ-041 (tags) adopted; current target U0
- 2026-08-10 — Phase U0: admin shell & navigation — /admin converted to a layout route with permission-gated section nav (7 sections), breadcrumbs, deep-link guard with a translated refusal notice, and i18n'd empty-state pages; new src/features/admin/\*\*, admin child routes, EN+AM strings (AM provisional), e2e/admin-shell.spec.ts. No migrations.
- 2026-08-10 — fix(e2e): admin-shell setup aligned to user_roles 4-col constraint + assertions matched to real component semantics; docs: admin-shell feature doc (H1)
- 2026-08-10 — fix(e2e): signIn helper waits for established+persisted session (INC-068 root cause of U0 A-1 red); class rules recorded
- 2026-08-10 — fix(e2e): attemptSignIn split for expected-failure paths (INC-068 addendum) — six mobile-360 auth-negative tests re-anchored; signIn keeps the session contract
- 2026-08-12 — fix(admin): U0b — admin sections integrate the shell panel rail/drawer like sibling panels; internal sidebar removed; E2E extended (INC-069)
- 2026-08-12 — fix(shell): U0c — single functional breadcrumb with current-segment emphasis; Back-button removed; drawer redesigned to active-panel + switcher (operator render-walk)
- 2026-08-12 — fix(shell): U0d — admin landing cards restored (INC-070); panel-header band (name + switcher) below the logo on all screens; corner-block geometry untouched

- 2026-08-12 — fix(shell): U0e — panel switching navigates (INC-058/071); dead admin state-placeholder removed; drawer logo block divider + top-bar-height restored
- 2026-08-12 — feat(shell): U0f — fixed panel header with scrollable item region (drawer + rail, short-viewport E2E); testids on all rail items; drawer-scoped switcher selectors (two red tests repaired)
- 2026-08-12 — fix(ci): nanoid override >=3.3.18 (GHSA-2v37-7h3g-55p8, audit clean); md+ rail scroll test given a guaranteed-overflow premise (Admin panel at 1280×360)
- 2026-08-12 — fix(shell): desktop rail sized to viewport minus the 4rem logo row (sticky top-16, calc(100dvh-4rem)) — pinned Sign out back in view; U0f complete
- 2026-08-12 — test(e2e): U0f rail invariant corrected to viewport-minus-row-1 geometry (top 64px, height 296px at 1280×360)
- 2026-08-16 — feat(shell): U0g — desktop layout laws: fixed top band + fixed rail, footer full-width beneath the rail, content-only scrolling; E2E invariants L1–L3
- 2026-08-16 — fix(shell): U0g-2 — fixed top band + fixed rail (never move; inner list scrolls), footer full-width beneath the rail with readable inset content; L1/L2 test premise repaired
- 2026-08-16 — fix(shell): U0g-3 — the document is the only page scroller at md+ (content stack unbounded; band/rail fixed out of flow); L1/L2 precondition now satisfied
- 2026-08-16 — test(e2e): U0g layout laws on a real tall fixture route (injection harness retired after three flaky rounds); shell layout unchanged
- 2026-08-16 — fix(shell): U0h — footer paints over the fixed rail at desktop bottom (rail ends at footer top, both modes); test(e2e): i18n chrome-coverage guard (Amharic shell, zero fallbacks) with am.ts gaps filled
- 2026-08-16 — feat(catalog): provisional name_am for all 97 categories (pre-native-review); fix(shell): rail clamps above the in-view footer (last items + scrollbar always reachable); test(e2e): i18n-coverage repairs (brand allowlist, dialog locator, category-label coverage)
  2026-08-16 — test(e2e): rail geometry tests re-anchored to the footer-clamp law (top 64, bottom = min(viewport, footerTop)); i18n reds await the name_am staging apply
- 2026-08-16 — fix(shell): footer-inset hook flushes on scrollend (no one-frame lag); test(e2e): L3 asserts the clamp law by geometry with a settled measurement (compositor hit-test retired)
- 2026-08-16 — fix(auth): U0j — sign-out hard reset with confirmation, live auth guard on gated routes, permission cache purge, replace-navigate to marketplace; E2E SO-1..SO-4 (INC-072, Tier A)
- 2026-08-16 — test(e2e): U0j-2 — shared signOutViaUi with confirm; live-guard proof via same-tab client signOut (test hook under DEV) + reload path; strict-mode scoping; legacy sign-out sites re-anchored
- 2026-08-16 — fix(shell): footer clamp inset rounds up + re-clamps on content resize (locale switch); Sign out always clickable (hit-test law); test(e2e): locale-agnostic openRailScope
- 2026-08-16 — feat(auth): U0k — one-click sign-out (confirm removed); role-tiered idle/absolute session policy with warning + hard reset; cross-tab enforcement; sign-out-others on password change; E2E SP-1..SP-4 (Tier A, INC-072 addendum)
- 2026-08-16 — feat(shell): U0l — category selection navigates to /c/<slug> (rail Links, URL-derived highlight + breadcrumb, INC-073); /auth is a proper page; page-card standard (PageCard/PAGE_MAIN_CLASS); E2E C-1..C-4
- 2026-08-16 — fix(shell): U0l-2 — breadcrumb Home navigates via Link; header reads signingOut to prevent stale account-menu (SO-2); settings.tsx migrated to multi-card PageCard standard
- 2026-08-16 — docs: U0 gate record — S28, four-lens close-out, system-state updated
- 2026-08-16 — feat(admin): U1 Users — account_status rider + status guard trigger + seam enforcement; admin_list_users/get/set_status/activity RPCs (profiles:view/update gated); list + detail UI with role assignment via audited RPCs; E2E AU-1..AU-6 (Tier A, DEC-014)
- 2026-08-16 — fix(db): grant restatement for re-declared seams (definer-guard law); ci: migration-parity preflight before E2E (names the missing file); docs: INC-074 + guard law
- 2026-08-17 — fix(db): U1 migration self-describing (four seam grant lines restated in-file, definer guard green); docs: INC-074 addendum — admin-users AU-1/2/3/5 diagnosis DEFERRED, CI artifact and staging E2E credentials unreachable from the executor environment
- 2026-08-17 — fix(e2e/ui): admin-users AU-1/2/3/5 — switchUser helper (sign out before second sign-in; /auth is guarded when authenticated), distinct responsive testids in users-list; INC-074 addendum
- 2026-08-17 — feat(admin): U1b — DataTable primitive (priority-responsive, no-overflow law) + users list migrated; admin role gains profiles:update (seed); E2E table law; INC-075
- 2026-08-17 — test(e2e): switchUser settles auth state before branching (INC-074 addendum)
- 2026-08-17 — feat(ui): U1c — display primitives (DEC-015): StatCard/StatGrid, ChartFrame, FormSection, DetailPanel, DataTable slots; /dev/primitives fixture; primitives law suite (test-once responsiveness); preflight ledger-first (seed-only migrations detected)
- 2026-08-17 — fix(repo): INC-076 — U1c primitives/fixture/law-suite/preflight restored verbatim from f62f2f8 after a stale-checkout push overwrote main; base-SHA rule adopted
- 2026-08-17 — fix(ui): U1d — DataTable rows clickable on desktop (+law L8); own-row status controls hidden; settings deactivation banner; Users > <name> crumb; INC-077
- 2026-08-17 — ci: E2E failure reporter (docs/tracking/e2e-last-failure.md) + no-unexplained-deletions guard (INC-076); fix(auth): sign-out purges all auth-derived queries (SO-2/SO-4 after settings banner, INC-078)
- 2026-08-17 — feat(auth): U1f — TOTP MFA enrollment + step-up gate (AAL2) for requires_step_up permissions; server-side enforcement in mutation RPCs; E2E MF-1..MF-5 (Tier A)
- 2026-08-17 — ci: parity preflight — ledger via definer RPC (service_role only), loud degraded mode, object-probe verified against U1f; migration_marks law if no ledger (INC-074 follow-up)
- 2026-08-17 — ci: parity ledger via public.migration_marks (self-marking migrations; SQL-editor applies have no tool ledger); backfill; guard + law; preflight reads marks
- 2026-08-17 — feat(admin): U1g — edit user (admin_update_profile, step-up gated, audited) + parity table; test(e2e): AU-3/4/5 re-anchored to step-up (enrollAndStepUp), AU-9..11
- 2026-08-17 — fix(e2e): expectAal2 reads data.currentLevel; fix(auth): auth-derived query root + cancel-then-remove purge (SO-4 after U1g; INC-078 addendum)
- 2026-08-17 — fix(shell): neutral query-keys module (browse-path guard green); no permissions query registered when signed out (SO-4 purge assertion); header settles to Sign in after reset
- 2026-08-17 — fix(auth): hard reset unmounts the permissions loader before purge + gcTime 0 (SO-4 strict assertion); test(e2e): shared switchLanguage helper (selector drift)
- 2026-08-17 — ci: E2E sharded ×4 + merged report, cancel superseded runs, @smoke fail-fast tier, cache checks (≈11 min → ≈3–4 min); test(e2e): smoke re-anchored to Amharic labels
- 2026-08-17 — ci: per-process E2E fixture scoping (setup/teardown by run+shard id); namespace sweep moved to nightly; INC-080
- 2026-08-17 — ci: smoke tier uploads results + log tail on failure; merged report labels sources and quotes non-test crashes (reporter blind spot closed)
- 2026-08-17 — fix(e2e): minted fixture emails unique per worker (TEST_WORKER_INDEX + random suffix) — smoke tier no longer collides across projects (INC-080 addendum)
- 2026-08-17 — test(e2e): openRailScope hydration-gated + single bounded retry (mobile drawer flake under parallel load); drawer-open helpers unified
- U1f-4 — step-up gate verifies factor presence + verification freshness server-side (INC-081); client mirrors the 10-minute window; MF-6/MF-7 added.
- 2026-08-17 — test(e2e): testEmail delegates to mintEmail (unique per worker) — auth-signup collision under parallel workers; INC-080 closed
- 2026-08-17 — test(e2e): email-sending specs isolated (serial project/job) + rate-limit-aware assertion (INC-082); switcher tests routed through openRailScope
- 2026-08-19 — test(e2e): 429 watcher scoped to sign-up phase (resend 429 is the throttle under test); openRailScope waits out slow drawer animation (retry only on no-mount); drawer opens unified; ci: actions runtime bumps
- 2026-08-19 — ci: reporter names timeout-without-step deaths (last-steps block); test(e2e): helper waits throw named errors on exhaustion; drawer opens fully unified
- 2026-08-19 — docs: U1 gate record — DEC-015/DEC-016, S29, four-lens close-out, system-state + launch-gate updated
- 2026-08-22 — feat(admin): U2 Roles & Permissions console — matrix with system/is_core locks, custom-role lifecycle, DEC-016 permission registration, roles:view→admin; step-up on every mutation; E2E RP-1..8 (Tier A)
- 2026-08-22 — fix(admin): U2a — delete-confirm shows the role key adjacent (testid split); matrix vocabulary i18n EN+AM (+coverage guard); members link via ?role= URL param; test(e2e): roleRow twin helper, RP-9/RP-10; ci: reporter quotes error-context.md (JSON-steps retired)
- 2026-08-22 — ci: failure reporter — artifact-layout fix from local repro, never-silent wrapper (a reporter crash writes its own report), download resilience, layout fixtures (INC-084e)
- 2026-08-22 — ci: root-anchor test-results ignore; context fixtures actually committed (git-tracked, proven); self-test names its searched paths on 0-found (INC-084f)
- 2026-08-22 — ci: reporter matches error-context by full titlePath (describe-nested slugs) + real describe fixture in the self-test; test(e2e): expectSignedIn/signOutViaMenu anchor on account-menu-sign-out testid (INC-084g)
- 2026-08-22 — docs: U2 gate record — S30, four-lens close-out, INC-084 reconciled, system-state updated
- 2026-08-22 — feat(rbac): U2b DEC-017 — assignable-scope flag server-enforced; matrix locks escalation-vector permissions and badges user-baseline rows (derived live)
- 2026-08-22 — feat(admin): U3 Audit & Security — audit viewer (stats + 14-day chart + filters/pagination) and impersonation v1 (super-admin only, step-up, 15-minute box, dual-actor audit, global banner, READ-ONLY; auth-level act-as deferred)
- 2026-08-22 — style(docs): prettier admin-audit-security.md (format:check was omitted from the U3 pre-flight — checklist reminder)
- 2026-08-22 — fix(shell): impersonation banner unmounts on sign-out + gcTime 0 (SO-4 guard catch, INC-085); test(e2e): A-2 re-anchored to moderators' audit section
- 2026-08-22 — ci: reporter output prettier-exempt (E5 class); fix(ssr): error page logs + DEV-embeds its cause; test(e2e): gotoReady retries the SSR error page once then fails named (INC-085c — flake family unmasked)
- 2026-08-22 — ci(e2e): DEC-018 — CI builds and serves the PRODUCTION bundle (wrangler) in E2E mode; isE2E flag gates test instruments; central document-response guard in e2e/fixtures.ts; reporter quotes [ssr-error] and matches contexts by containment (INC-085d)
- 2026-08-22 — ci: reporter treats zero-test results from failed sources as no-results (webServer deaths now quote their own logs)
- 2026-08-22 — ci(DEC-018): nitro target pinned explicit for the e2e build + build-output verify step (ENOENT wipeout root-caused; INC-085e)
- 2026-08-22 — test(e2e): explicit data-app-ready hydration contract + client-error capture ([client-error] tag, reporter-grepped) — prod-build divergence made self-naming (INC-085f)
- 2026-08-22 — ci: e2e build unminified + full console-arg capture — React #185 will name its component (INC-085g)
- 2026-08-22 — fix(build): e2e build pins cssMinify so the SSR and client graphs hash styles.css identically (404 stylesheet → unstyled e2e pages → strict-mode/#185 failures); fix(shell): useFooterInset stops observing document.body (self-feeding inset loop); test(e2e): console capture reads Error stacks instead of jsonValue (INC-085h)
- 2026-08-22 — fix(shell): name and eliminate useFooterInset's remaining footer-observer feedback loop; test(e2e): retain full pageerror stacks, raise console capture to 2,000 characters, and collapse repeated Client/Server evidence as ×N (INC-085i)
- 2026-08-28 — ci: platform-injected previewAuthStorage.ts takes the Knowledge E5 machine-generated exemption (path-scoped eslint + prettier ignore) — red main from commit 857f049 cleared with no gate weakening (INC-087)
- 2026-08-28 — ci(DEC-019): e2e serve migrated to nitro node-server (workerd refused the build-day compatibility_date); nightly cloudflare parity smoke added; reporter quotes error lines from the full log + final 10 for zero-test sources and flags PLATFORM-ORIGIN? commits (INC-088)
- 2026-08-28 — fix(shell): kill the React #185 ref-callback loop at root — the rail's `CollapsibleTrigger asChild` was handed `WithTooltip` (Fragment/Tooltip Root, neither holds a ref), so Radix's composed state-setter re-dispatched on every render across every mapped row; tooltip now wraps the trigger and returns children unwrapped. Corrects INC-085i's attribution; the shard-1 400 is GoTrue's by-design `invalid_credentials` (INC-089)
- 2026-08-28 — fix(rbac/shell): kill the signed-in React #185 loop at root — `usePermissions` minted a new empty array every render and the shell stored every report as a new object, so the PermissionsLoader effect re-entered forever and the root boundary painted "This page didn't load" (11 of 12 failures in run 33166409697); fix(shell): corrected footer-clamp law — pull-based footer read plus mount/fonts settle passes, scroll/scrollend/resize and the `#main` observer only (INC-090, INC-089 addendum)
  2026-08-28 — fix: track e2e boot-crash fixture by renaming to .log.txt and pinning reporter path (INC-091); add INC-090 addendum
- 2026-08-29 — fix(admin): audit detail expands inline beneath its row (INC-092); impersonation copy states the read-only model; docs: impersonation model & roadmap (DEC-021)
- 2026-08-29 — fix(admin): audit trend as bounded sparkline (≤160px, normalized, sparse labels); test(e2e): audit-expand locators scoped to the visible surface (INC-093)
- 2026-08-29 — test(e2e): auditSurface twin helper — audit locators viewport-correct both ways (INC-084c sixth, INC-093b)
- 2026-08-29 — docs: S31 gate — DEC-017..021 rows, U2b+U3 close-out, harness epoch closed, roadmap reorder (U4 Translations), ACT-U3-1
- 2026-08-29 — ci(DEC-020): CI on dev + fast-forward promote to main on full green; main is the certified record
- 2026-08-29 — ci(DEC-020): all tracking commits target dev; sync-main dispatch = sanctioned divergence repair
- 2026-08-29 — feat(i18n): U4a translations foundation — languages/ui_translations/translator_languages/entity_translations, DEC-017-pattern permissions (step-up, assignable), scoped definer RPCs with placeholder validator + coverage gate, locations name_am backfill (Tier A)
- 2026-08-29 — fix(i18n): matrix vocabulary for the translations registration (coverage guard catch)
- 2026-08-29 — feat(i18n): U4b read seams — `admin_list_languages()` (definer, translations:view) exposes the full roster incl. admin-only languages the RLS policy hides; `get_my_translator_languages()` (auth-callable self-read) makes the strings page honest about scope; proofs P1-P4
- 2026-08-29 — fix(ci): INC-094 declared-mark law — migration marks are read from the file, not assumed equal to the tool-assigned filename stamp; ledger reconciled
- 2026-08-29 — feat(i18n): U4b translations console — languages roster (coverage, admin/public switches, key sync, add-language), per-language strings editor with URL-derived filters and provenance, manage-gated translator scope card on user detail, D3 runtime flip (approved DB bundle merged over the compiled catalog with a logged fallback), TR-1..10 (Tier A)
- 2026-08-29 — fix(i18n): DB bundle overlays the compiled active catalog (chain restored; empty catalog is invisible); test(e2e): TR helper re-anchored to the primitive's real testids (INC-095)
- 2026-08-29 — fix(i18n): am pair for translations.collapse (+parity); test(e2e): expansion scoped via twin helper, scratch-key law, TR-9 anchored (INC-095c-e)
- 2026-08-29 — fix(i18n): publish gate refuses an empty catalog (vacuous-complete hole, TR-6 catch); sheet/dialog close labels i18n'd (D1 on a11y text); sync-first tooltip
- 2026-08-29 — test(e2e): TR-9 verify-or-sync, sized 120s budget, named phases (INC-095i)
- 2026-08-30 — polish(admin): translator card compact empty state + manage-only scope note
- 2026-08-30 — feat(admin): translator card renders only when the target holds a translations:\* permission (effective read via has_permission RPC); no-role targets get one muted line, no controls
- 2026-08-30 — test(e2e): TR-10 proves the conditional translator card, both states (INC-095j)
- 2026-08-30 — fix(rbac): gated definer read for the translator card (invoker-blind probe replaced); errored checks surface, never impersonate absence (INC-095k)
- 2026-08-30 — fix(rbac): translator card reads existing scope (wipe-footgun closed), controls render for eligible targets (streak root), scope RPC + persistence proof (INC-095 l–n)

- 2026-08-30 — feat(translations): AI machine translation via the app-server route (per-row + bulk), revision capture on every writer, CI fake mode (U4c, INC-096)
- 2026-08-30 — fix(api): translate endpoint censused against the installed Start server-route primitive (no separate factory exists; the CI 500s were handler-issued, not SSR renders); every 5xx now logs into [ssr-error] before the structured body (INC-096 b–c)
- 2026-08-30 — fix(api): `has_permission` argument names in `/api/translate` match the SQL declaration (`p_user_id`, `p_resource`, `p_action`); first lit-seam catch (INC-096d)
- 2026-08-30 — test(e2e): TR-11 asserts the full revision pair (capture law); DEC-023 env census reported
- 2026-08-30 — test(e2e): TR-11 orders revisions by the declared changed_at
- 2026-08-30 — fix(i18n): writer order canonicalized — gates before capture before mutate; refused attempts leave no revisions (INC-096f); ci(DEC-023-B): changed-spec fast lane
- 2026-08-30 — test(e2e): scratch keys job-axis complete (run×shard×worker×project) — cross-job collision closed (INC-096f-b)
- 2026-08-30 — test(e2e): per-test scratch identity + self-describing revision dump (INC-096f-c)
- 2026-08-30 — test(e2e): TR-12 asserts per-key DB truth; global-setup reaps stale scratch rows (INC-096g)
- 2026-08-30 — feat(i18n): U4d — entity translations live (categories 97 backfilled, locations adopted, Data console scope, anon bundle + fallback chain); public gate stays ui-scoped (Tier A)
- 2026-08-30 — test(e2e): TR-14 fixture via service client (INC-097b); ci(DEC-024): shards at 2 workers under the identity law, revert-rule armed
- 2026-08-30 — fix(db): U4d-3b — the two service_role grant-sweep migrations recreated after they went missing from the tree; declared marks 20260830100000/20260830110000 preserved (idempotent, ON CONFLICT DO NOTHING)
- 2026-08-30 — ci(DEC-023-B): fast lane made non-gating as ratified
- 2026-08-30 — feat(i18n): U4e — translation History drawer with one-click restore (restore-as-save; every restore is itself history)
- 2026-08-30 — test(e2e): TR-16 joins the self-describing dump law (INC-096f-c)
- 2026-08-30 — test(e2e): fence language for the global bulk + scratch-location fixture for TR-14 — sweep-class collisions closed (INC-097d)
- 2026-08-31 — docs: S32 gate — U4 Translations complete; DEC-022/023/023-B/024; U4 close-out; ACT-U4-1..3; next U5 Locations
- 2026-08-31 — fix(i18n): switcher + runtime honor the publication gate; approve refuses flagged rows (INC-098)
- 2026-08-31 — fix(i18n): non-blocking provider; gated activation reconciles once (INC-098b)
- 2026-08-31 — test(e2e): shell drawer and rail-scroll geometry wait for skeleton count 0 before reading scroll/rects (INC-098c)
- 2026-08-31 — feat(i18n): U4g — approve-all-reviewed (flag-safe, revision-captured), language ordering (switcher follows), orphaned keys excluded from coverage
- 2026-08-31 — fix(db): authenticated EXECUTE restored on translation wrappers with totality proof; TR-21 reads truth from tables (INC-099)
- 2026-08-31 — fix(i18n): deterministic language order (normalized sort, append-on-insert, (sort, code) everywhere); TR-20 self-describing; gitleaks proof-literal allowlisted (INC-099b)
- 2026-08-31 — fix(db): languages_append_sort as INVOKER; migration guard gains a reasoned, printed allowlist (DEC-022-B, INC-099c)
- 2026-08-31 — ci: overwrite artifacts on re-run; report names its attempt (INC-100)
- 2026-08-31 — fix(auth): auth-derived state settles independently of the i18n language read (no Supabase call inside the auth callback); TR-19 gets its own fence, TR-20 names its phases (INC-101)
- 2026-08-31 — fix(auth): session identity applied synchronously from the auth payload; only the profile read hops the auth lock (INC-101 addendum)
- 2026-08-31 — fix(auth/i18n): use-auth restored to last-known-good; provider reads start after auth settles (INC-101b)
- 2026-08-31 — fix(admin): strings page renders from admin sources, never awaits the public gate (INC-102)
- 2026-08-31 — fix(db/admin): admin_list_translations honours an absent orphan filter; roster move controls read one sorted source (INC-103)
- 2026-08-31 — fix(admin): saved marker is page-level state so it survives the approve refetch on both twins; user detail renders its shell before its queries (INC-104)
- 2026-08-31 — fix(i18n): sync orphans only sync-origin keys; TR-20 parks via table write; restore feedback page-level (INC-105)
- 2026-08-31 — fix(admin): reorder controls on mobile; role filter honors URL before options load; test(e2e): TR-21 seeds sync-origin (INC-106)
- 2026-08-31 — fix(admin): one reorder control per twin, in its own twin (INC-106b)
- 2026-08-31 — test(e2e): TR-20 locates row actions per twin and names click/step-up/poll phases (INC-106c)
- 2026-08-31 — fix(ui): roster actions no longer overlap; scroll padding for the fixed band (INC-106d)
- 2026-09-01 — fix(i18n): DB-only languages render (missing compiled layer is empty, not fatal — INC-107); ci: nightly writes its failure evidence (INC-108)
- 2026-09-01 — test(e2e): 5xx URL capture; AU-3 self-describing failure dump (INC-109)
- 2026-09-01 — fix(admin): activity list refreshes on mobile; redirect never awaits i18n (INC-110)
- 2026-09-01 — ci(DEC-019-B): worker compatibility date pinned; nightly cloudflare parity runs for real (INC-111)
- 2026-09-01 — test(e2e): TR-19 phased + strings-page failure dump (INC-112)
- 2026-09-01 — fix(translations): one shared reviewable predicate; gate list never cached (INC-113)
- 2026-09-01 — fix(i18n): gate fetch without filter-shaped busting; failures surface and retry (INC-113b)
- 2026-09-01 — test(e2e): scratch-role reaper; AU-3 audit-row dump (INC-114)
- 2026-09-01 — feat(translations): placeholder-safe MT, one-click restore, honest provenance (INC-115)
- 2026-09-01 — test(e2e): per-project fence languages (INC-115b)
- 2026-09-01 — fix: route-legal fence subtags; profile-edit invalidates activity (INC-115c)
- 2026-09-01 — test(e2e): every user-detail activity assertion dumps detail + audit truth (INC-115d)
- 2026-09-01 — test(e2e): TR-20 desktop-only relative order, TR-20m mobile controls, TR-17 set equality (INC-115e)
- 2026-09-01 — fix(db): audit activity index + sargable predicate (statement timeout, INC-116); test(e2e): TR-22 mobile-visible anchor
- 2026-09-01 — test(e2e): fence-filtered TR-17 set equality, TR-19 seed-before-navigate poll, @global-state quarantine label (INC-117)
- 2026-09-01 — ci(DEC-028): global-state specs serial-only; quarantined failures reported, non-gating. format:check + reporter self-test; CI proves.
- 2026-09-01 — chore(deps): browserslist 4.28.8 + update-browserslist-db 1.3.2 via overrides (whole tree, no nested copy); audit ruling recorded
- 2026-09-01 — ci(DEC-030): retries:1 in the parallel matrix (nightly stays 0); flake ledger rendered, appended and self-tested (INC-118)
- 2026-09-02 — feat(i18n): U4j — data-layer AI (per-row + bulk), data coverage meters, guided language creation from the provider's list with native names, RTL and countries
- 2026-09-02 — fix(ci/e2e): exempt machine-generated flake ledger from prettier (INC-118); TR-24 scopes data-meter locator to language row cell; TR-21 quarantined as @global-state (DEC-028)
- 2026-09-02 — fix(i18n): Data scope enumerates the entity universe — missing translations are untranslated rows, bulk-translatable (walk finding)
- 2026-09-02 — fix(i18n): Data bulk count reads the entity stats correctly (INC-119); TR-24 self-describing
- 2026-09-02 — fix(i18n): Data scope renders untranslated universe rows (composite entity keys); TR-24 waits for a ready count (INC-119b)
- 2026-09-02 — test(e2e): TR-24 anchors its own scratch row via the twin helper; fence entity residue reaped (INC-119c)
- 2026-09-02 — feat(i18n): U4k — Data-scope approve-all + status chips + dual meters (walk findings)
- 2026-09-02 — ci(DEC-029): session injection for non-auth specs, single shared build, six shards — wall-clock roughly halved (revert knob E2E_UI_LOGIN)
- 2026-09-02 — ci(DEC-029-B): revert knob engaged; injection/step-up seam under diagnosis (INC-120); build-artifact + 6 shards retained
- 2026-09-02 — ci(DEC-029-C): session injection live (write-once sentinel, INC-120 closed); credential-lifecycle tests pinned to UI login
- 2026-09-02 — test(e2e): per-user injection sentinel; switchUser clears and asserts identity (INC-120b)
- 2026-09-02 — ci(DEC-029-E): injection parked per pre-committed rule; build-once + six shards retained (INC-120c)
- 2026-09-02 — chore(quality): DEC-025 typed clients + lint · DEC-026 component tests (seed suite + CI job) · DEC-027 spec lint — the pre-push floor
- 2026-09-02 — feat(i18n): U4h — per-device ★ default language with account sync (device wins), dynamic hreflang from the publication gate
- 2026-09-02 — fix(i18n/e2e): U4h star flows converge (INC-121)
- 2026-09-02 — feat(i18n): U4i Tier B — context notes (v2 limitation stated), used-on map + CI freshness guard, advisory length warnings, ETag-cached /api/i18n/:lang, CSV/XLIFF transfer, pseudo-localization in the never-publishable zxa\n
- 2026-09-02 — test(e2e): TR-26 per-key approval truth (J4).
- 2026-09-02 — fix(i18n): U4i walk findings — note render, route-based used-on, amber length chip, idempotent import (no-op on unchanged), pseudo button surfaced (INC-122)
- 2026-09-02 — feat(i18n): U4i-4 — export-all (paged), delete-language (typed confirm, cascading counts, base/public refused), compact switcher (INC-123)
- 2026-09-02 — fix: delete control once per twin; usage map regenerated (guard catch); ACT-U4-7 registered
- 2026-09-02 — fix(i18n): server-side import idempotency (approved never demoted by no-op), step-up always on top, compact switcher rows (INC-124)
- 2026-09-02 — feat(i18n): U4i-7 — undoable imports (batch-tagged, conflict-safe) + final switcher density (INC-125)
- 2026-09-02 — polish(i18n): compact switcher (selection by tint, no check), proportional roster columns, Interface/Content naming with tooltips, one-line actions (walk polish)
- 2026-09-02 — fix(ui): languages roster card twin at mobile, scroll-not-cramp at mid-widths, 360 guard (INC-126)
- 2026-09-02 — docs: S33 gate — translation era closed (U4f–U4k); DEC-019-B..030 recorded; roadmap.md + era handoff imported; next U5 Categories & Locations
  2026-09-02 · S34/D0 · Category Era spec + taxonomy artifacts imported; roadmap, categories.md, system-state, ledger (REQ-017 a–e, DEC-031..033), build-plan banner, ACT backfill.
- 2026-09-03 — feat(db): C1 category era taxonomy migration applied (20260903022519) — 113 active nodes (14 roots, 14 catch-alls), pointer tree rebuilt, jobs retired, am names into entity layer, offer_type at 9 leaves; mark 20260903030000
- 2026-09-03 · C2-mig · category console machinery: exclusions table, cycle trigger, granular categories permissions (manage retired), visibility-law browse RPC + admin RPC set.
- 2026-09-03 · C2-fix · permission-string consumers migrated (sections gate → categories:view) + D2 keys for restructure/assets (EN+AM); usage map regenerated.
- 2026-09-03 · C2-audit-rewrite · INC-129 closed: admin_list_audit bounded (capped total_count, page-scoped profiles join, trigram entity_id search); contract unchanged.
- 2026-09-03 · C2-UI · categories console shipped (roster, create/edit, visibility window, country exclusions, reorder, pointer, retire) + CT-1..CT-7; INC-130 re-land: C7 DataTable contract (cardUntil, min-width, totalLabel) with unit + law L9 proofs; DEC-031 scratch-category reaper.
- 2026-09-03 · C2-UI-FIX · C2b migration (admin_list_categories gains excluded_country_codes; new admin_list_category_pointers) + INC-132 primitive scroller chain + console UX (datetime-local window, icon action row, slug under name, Parent column, root filter, 25/page, pre-ticked exclusions, Browse paths move/remove/add); CT-7b/CT-8/CT-9 and law L10.
- 2026-09-03 — C2-UI-FIX-2. INC-133: the hardcoded-string guard's JSX-text anchor became a closing tag (`</`), ending the `Promise<unknown>` false positive; a two-direction guard-proof fixture pair (`scripts/fixtures/string-scan-{bad,good}`) and CI self-test steps prove it bites and does not over-bite. INC-134: the shared admin content region in `app-shell.tsx` gained `min-w-0 max-w-full` — the first ancestor still at `min-width:auto` above every DataTable scroller (1240×800 census); CT-8 now covers the 1240 band. INC-135: DataTable gained the `wide` column tier (xl-only, card-excluded) and `stickyFirstColumn` (logical `start-0`, `bg-card`), with unit tests and E2E L11. C2c console UX: server-derived slug with read-only preview, `has_image` missing-assets flag + filter, tooltipped badges, active-only parent pickers with paths, parent-aware search, root counts, and a device-persisted page size (CT-10, CT-11). EN+AM keys and usage maps regenerated.
- 2026-09-04 — C2-UI-FIX-3 + C2d. Workflow refrozen (`ci.yml` reverted verbatim to 2ffbaa8) and the hardcoded-string guard now self-tests IN-SCRIPT against its fixture pair (bad ≥1, good 0; mismatch exits 2 with SELF-TEST FAILED). Primitive: `cardUntil` gains `"xl"`, the card twin carries the `wide` tier there, and INC-136's sticky drift is fixed by pinning header AND body cells (selection at `start-0`, first data column at `start-10`). Roster moves to `cardUntil="xl"` without sticky, hides listings/price flags on retired rows, and gains Reactivate (step-up) plus a typed-slug Delete on retired rows only. C2d migration (mark 20260904010000): `expiry_days` optional, `admin_reactivate_category`, `admin_delete_category` with cascade + audit, in-file deny/refusal/cascade proofs. Spec viewport law: every block in `admin-categories.spec.ts` declares its band; CT-8 rewritten (cards at 1024/1240, table at 1440), CT-9 split into 9a/9b, CT-12 reactivate and CT-13 delete walks added; L11 extended to the body cell.
- 2026-09-04 — C2e + UI-FIX-4. C2e migration (mark 20260904020000, INC-137): the definer ACL for `admin_create_category(text, text, text, uuid, boolean)` is restated in one self-describing file (REVOKE FROM PUBLIC, anon; GRANT EXECUTE TO authenticated, service_role) with an in-file privilege proof — no behaviour change. Console converges on the Roles interaction model: the roster row carries exactly ONE verb (Edit, `category-edit-<slug>`), and Visibility · Countries · Browse paths · Move up · Move down · Retire/Reactivate · Delete move into a wrapping full-text verb bar at the top of the editor, testids and gates unchanged. E2E re-anchored: `action()` resolves non-edit verbs inside the open editor, CT-8 becomes the reachability law (360/768/1024/1240 editor verbs reachable with no page or dialog horizontal scroll; 1440 table with an inert scroller), CT-6/CT-12/CT-13 drive their verbs from the bar.
- 2026-09-04 — C2-UI-FIX-5 + C2f + TR-29. Allowlist closes INC-137 (C2c file cites C2e closer 63df0b68; guard green). Roster conforms to the audit table (INC-139): no consumer min-widths, no `cardUntil`, no sticky/wide leftovers — priorities only, Name truncates, and `ROSTER_COLUMN_PRIORITIES` is machine-checked by a unit test. C2f migration (mark 20260904030000, INC-138): pointer edges under retired parents deleted and `admin_list_categories` prefers the root pointer, else the lowest-order ACTIVE parent, contract and ACL restated. TR-29/INC-141: the CSV export reader drops its `orphaned = false` filter (`orphaned: null` = no predicate), so the export row count equals the catalog count. Specs self-diagnose: geometry dumps on CT-8/CT-9a, a lifecycle dump on CT-12, and L10 scrolls the last cell into view before asserting horizontal reachability.
- 2026-09-04 — C2g + UI-FIX-6: catch-all parent law (assert_parent_not_catchall; create/add/move refuse, reorder pins last; mark 20260904040000), live-row editor (INC-142), NULL-honest listing expiry (INC-143), translated server refusals, CT-14.
- 2026-09-04 — UI-FIX-7 (INC-144): the categories verb bar routes every guarded verb (Move up/down, Reactivate) through ONE `runVerb(guard, action)` runner that conforms to the working translations consumers — `guard(...).catch(fail)` — so a step-up refusal or RPC error renders translated in the bar (`category-verb-error`) instead of rejecting an un-awaited promise (F4); the shared post-verification replay in `use-step-up.submitCode` was already correct and is unchanged. Move up/down remain wired to `admin_reorder_categories` (never the pointer RPC); their step-up prompt is server law (`categories:restructure` carries `requires_step_up`) and removing it would need a migration, which this landing does not have. CT-12 rewritten so every wait is a bounded ≤15s poll whose failure carries a freshly computed lifecycle dump; CT-14 resolves the catch-all row through the twin helpers (row + actions region + editor verbs), assertions unchanged.
- 2026-09-04 — C2h + CT-12-TRUTH: `admin_reorder_categories` re-stated on `categories:update` with the step-up call removed; `admin_list_categories.display_order` now reports the resolved parent POINTER edge (the order `get_browse_tree` reads), contract byte-identical; retire dialog hides the reassign picker at zero listings and counts them otherwise (EN+AM keys); CT-12's closing assertion corrected to Active badge + Retire present / Reactivate absent; CT-15 covers reorder with the step-up modal's absence asserted. Migration mark 20260904050000.
- 2026-09-03 · C2i · admin_list_categories row-completeness corrective (board-wide roster regression from C2h read-switch).
- 2026-09-03 · C2j · orphan-visible roster (INC-146): `admin_list_categories` walks only categories that hold a pointer edge and appends every edge-less category as an explicit orphan tail (slug order, NULL parent fields) after the walk; 17-column contract, gate and ACL byte-identical; in-file proofs create and delete a scratch edge-less row to prove the class. Mark 20260904070000.
- 2026-09-03 · DEC-034 · E2E fixture invariant: the categories spec's scratch seeding helper now creates the pointer edge alongside the row (scratch parent or root, next free display_order), so no fixture is an orphan by construction. No spec assertions changed.
- 2026-09-03 · C2k · roster order pinned (INC-147): pointer-edge `display_order` renumbered from a pinned source (roots take the ratified 14-slug sequence, other root edges by slug after 14; every child sibling group dense-renumbered by (display_order, slug) with catch-alls forced last), and `admin_list_categories` now orders by the NUMERIC order-path (root edge order, then each child edge order), ties by slug, orphan tail unchanged. P0 asserts zero colliding sibling groups; P6 STRICT asserts `vehicles` first and the walked root sequence equal to the ratified sequence and to the root-edge display_order. Contract, gate and ACL byte-identical. Mark 20260904080000.
- 2026-09-03 · INC-148 · the categories Move verbs no longer carry a client-side step-up pre-check: reorder is not step-up gated on the server (C2h), so Move calls the mutation directly and the shared `use-step-up` defence-in-depth path still handles any server `step-up required`. Specs gained one `findRow(page, slug)` helper (roster search → twin row) adopted wherever a freshly created or edited scratch row was previously expected on an unsearched page.
- 2026-09-03 · C2-CLOSE · four finals, then the console freezes: (A) CT-12's closing check is search-anchored — the editor is dismissed, `findRow` narrows the roster, and the row reads Active with Retire offered and Reactivate absent; (B) CT-6 seeds one `status:'active'` listing (every required column, service client) BEFORE navigation (J7) and asserts the reassign picker with its "Move 1 listing…" count, the completed reassignment and the listing's new home; (C) the editor's Display-order field is READ-ONLY and bound to the LIVE roster row (Move up/down updates it immediately), leaves the typed update payload, and carries the translated caption "Managed by Move up/down." (EN+AM); (D) INC-150 — the dialog state machine keeps `kind:'edit'` with the secondary surface as its own `sub` axis, so closing Countries/Visibility/Browse paths/Retire/Delete returns to the OPEN editor and only closing the editor returns to the table (CT-16). No migration; step-up top-layer behaviour untouched.
