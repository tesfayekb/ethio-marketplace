# Phase 0 Specification — Foundation
Version: v1.1 · 2026-07-29 (post full-project review) · Status: AWAITING OPERATOR APPROVAL (nothing executes before approval)
Scope: repo structure, standing rules (Lovable Knowledge), documentation/traceability system, CI guard skeleton, first migration. NO product features.

## 0. Infrastructure state (already done)
- GitHub repo: tesfayekb/ethio-marketplace (Lovable-created; rename + public status pending operator confirmation — see §7)
- Supabase: org `ethio`, project `ethio-prod`, us-east-1, Data-API on / auto-expose OFF / auto-RLS ON
- Lovable project connected to both; secrets populated via secrets form (correct channel)

## 1. Repository structure (target)
```
/src                      # app code (Lovable's TanStack scaffold conventions)
  /routes                 # pages (public + _authenticated)
  /components             # shared UI primitives (extend via props, never copy-paste)
  /features/<name>        # feature modules: components/, hooks/, <name>-service.ts, types.ts — apex pattern
  /lib                    # pure shared utilities — THE ONLY home for formatters (currency, dates, geo)
  /i18n/locales           # one file per language (REQ-002), lazy-loaded
  /integrations/supabase  # client (publishable key only)
/supabase/migrations      # numbered SQL migrations — the only way schema changes; APPEND-ONLY
/e2e                      # Playwright smoke tests (populated once golden paths exist)
/docs
  /governance             # ethio-governance-v0.2.md, system-state.md
  /spec                   # spec ledger + ToS source + approved Pass-2 phase specs
  /decisions              # ADR-style DEC entries going forward
  /architecture           # overview.md — the "map of what lives where" (highest-value file for AI context)
  /features               # ONE file per feature: purpose, composing files, tables/functions touched
  /tracking               # action-tracker.md (ACT-###), incidental-findings.md (INC-###)
  conventions.md          # naming, file-size, folder-placement conventions (source for Knowledge ARCHITECTURE)
  _changelog.md           # append-only, one line per meaningful change (apex pattern)
  _registry.json          # feature → files map (apex ADR-002 pattern)
```

## 2. Lovable Knowledge v3 — paste-ready (three parts, per Lovable's own guidance: purpose/users → architecture → rules)
Operator pastes the block below into Project Settings → Knowledge. Rides with every prompt. Design principle unchanged: complete coverage of failure classes, one tight rule each; task detail arrives per prompt; deep spec lives in /docs; schema truth lives in /supabase/migrations (never pasted here — it would rot).

```
ETHIO.COM — PROJECT KNOWLEDGE. These rules override any conflicting request phrasing.

== 1. WHAT THIS APP IS ==
ethio.com is a production, mobile-first, multilingual classifieds marketplace (PWA) for Ethiopians in-country and in the diaspora worldwide, expanding across Africa. Users post products or services into admin-managed categories; buyers browse geo-scoped feeds (city → region → country → world, auto-widening) and contact sellers directly — in-app messaging always available, plus the seller's preferred channel. NO payments, cart, or checkout in v1; everything is free. Sellers get public storefront pages at /@handle. Sign-in: email+password, Google, or Telegram. Content is AI-screened at posting (no manual pre-approval). Typical user: low-cost Android phone, expensive mobile data, may read Amharic (Ge'ez script), Afaan Oromo, Tigrinya, or English. Everything favors: light pages, translation-ready text, database-enforced security, traceable changes.

== 2. ARCHITECTURE ==
Stack: TanStack Start (server-rendered React) + Tailwind. Backend: the CONNECTED EXTERNAL Supabase project (Postgres + RLS + Auth + Storage + Edge Functions) — publishable key only in the browser; schema truth = /supabase/migrations (append-only), never assumptions.
Layout: pages in /src/routes (public + _authenticated); feature modules in /src/features/<name> (components/, hooks/, <name>-service.ts, types.ts); shared UI primitives in /src/components; pure utilities ONLY in /src/lib (currency, date, geo formatters live here and nowhere else); translations in /src/i18n/locales, one lazy-loaded file per language; docs map in /docs (features/<name>.md per feature, _changelog.md append-only).
Naming: kebab-case files; PascalCase components; use-* hooks; *-service.ts services. Components over ~300 lines must be split.

== 3. RULES ==
A. PROCESS
A1 SCOPE: Modify only files named in the current task. If the task seems to require touching others, STOP and say which and why. Always end by listing every file you modified.
A2 NO UNSPECIFIED WORK: Build only what the task specifies — no demo content, sample data, extra pages, refactors, or "improvements." Ambiguous → ask, don't guess.
A3 HONESTY: If you cannot fully do the task or a platform limit applies, say so BEFORE changing anything. Honest partial beats silent approximation.
A4 CONFLICTS: If a request conflicts with these rules, point out the conflict and wait — never resolve it yourself.
A5 COMMITS: Descriptive, scoped commit messages; never include secrets or sensitive details in them.

B. REUSE / ANTI-DUPLICATION
B1 Before creating ANY new component, hook, utility, translation key, or table: search for an existing one and use/extend it. State what you searched and found.
B2 One source of truth per concern: currency/price, date/time, and location formatting each have exactly ONE utility in /src/lib — never inline reimplementations.
B3 Shared primitives in /src/components; feature-specific pieces in /src/features/<name>. Never copy-paste a component to make a variant — extend via props.
B4 Keep files small: split components over ~300 lines; one component per file.

C. MOBILE-FIRST UI
C1 Design at 360px width FIRST; wider screens adapt. Verify 360/768/1280 don't break.
C2 Touch targets ≥ 44px; primary actions reachable near the bottom on phones; nothing depends on hover.
C3 Design-system tokens only (colors, spacing, type) — no ad-hoc hex values or one-off spacing.
C4 Every screen defines loading, empty, and error states — with translated text.
C5 RTL-SAFE CSS: logical properties/utilities only (ms-*/me-*, ps-*/pe-*, text-start) — never left/right; the site must survive right-to-left languages without rework.
C6 Accessibility basics always: labeled inputs, alt text on images, semantic headings.

D. TRANSLATION LAW
D1 No user-visible literal strings in components — every label, message, error, empty state, and notification uses a translation key from /src/i18n/locales.
D2 Every new key ships with English AND Amharic values in the same change; structure supports plural rules; only the active language's file loads.

E. DATABASE LAW
E1 Every new table ships in the same migration with RLS ENABLED + explicit per-operation policies + explicit GRANTs (auto-expose is OFF). No exceptions.
E2 Migrations are APPEND-ONLY: never edit, rename, or delete an existing migration — corrections are new migrations. Destructive changes only when the task explicitly says so.
E3 Every table holding personal data includes home_country_code. All timestamps stored UTC (timestamptz).
E4 Money/prices: never floats — integer minor units or numeric.

F. SECURITY LAW
F1 Secrets/service-role keys/credentials: never in code, comments, or commit messages — only the secrets/env system. Service-role key never client-side.
F2 All user input validated server-side; render user content as data, never as HTML/code.
F3 AUTHORIZATION DOCTRINE: the server (RLS / has_permission) is the ONLY authority. UI hiding is convenience — never make an authorization decision client-side.
F4 NO PHANTOM SUCCESS: never catch-and-continue silently. Failures surface to the user as translated messages and are logged; success-shaped output must mean actual success.

G. PERFORMANCE / SEO LAW
G1 Public pages are server-rendered with correct title/meta/og using ABSOLUTE URLs for canonical/og:url, declared language, hreflang alternates.
G2 No new dependency unless the task names it. Images lazy-load with explicit dimensions; nothing autoplays; no prefetch beyond viewport.

H. DOCUMENTATION LAW
H1 When a task changes a feature's structure (new files/tables/functions), update /docs/features/<name>.md and append one line to /docs/_changelog.md IN THE SAME change. Never renumber or delete existing doc entries.
```

Verification step after pasting: ask Lovable "Summarize the project rules you have been given for this project" — confirms the Knowledge is active before any prompt relies on it.

## 3. Documentation & traceability system (operator's requirement, honest mechanism)
- Dates & authorship: derived from git history (incorruptible) — never hand-maintained.
- Feature grain: /docs/features/<name>.md lists purpose, composing files, tables, edge functions, and notable consumers. Updated same-commit as structural changes (Knowledge rule 8; supervisor verifies on review).
- Machine grain: _registry.json (feature→files) + _changelog.md (append-only). 
- Function-level tracing: via code imports + grep at review time (supervisor's anchoring ritual), not hand-registry — hand-maintained function cross-refs rot into false documentation.
- CI check (Phase 0 skeleton): commit touching /src/features/X without touching docs/features/X.md OR _changelog.md → warning surfaced in supervisor review (hard-fail once stable).

## 4. CI guard skeleton (GitHub Actions, day-one feasible set)
- typecheck + lint + build on every push to main
- secrets scan (gitleaks or equivalent)
- hardcoded-string scan on /src/routes + /src/features (REQ-002 guard; warn-mode first 2 weeks, then fail)
- migration linter: any CREATE TABLE without ENABLE ROW LEVEL SECURITY + ≥1 CREATE POLICY in same file → FAIL
- bundle-size report on build (fail threshold wired to REQ-029 lines once real pages exist)
Deferred (need features to exist): route↔permission matrix; gateway-bypass scan; partition-key checker (activates with first personal-data table).

## 5. First migration — 0001_countries.sql (establishes the full workflow end-to-end, zero feature risk)
- Table `countries`: code (PK, ISO-3166 alpha-2), name_en, is_active, created_at. Global reference data (REQ-005/012 root of the geography tree).
- RLS enabled; policy: SELECT for anon+authenticated (public reference data); NO insert/update/delete policies (admin writes come later via REQ-030 machinery — deny-by-default until then).
- Explicit GRANT SELECT to anon, authenticated (auto-expose is OFF).
- Seed rows: ET, US, CA, GB, DE, KE (inactive except ET, US — activation is an admin act later).
- Purpose: proves migration→apply→verify loop, RLS pattern, seed pattern, and the supervisor read-back protocol (§12.3) on a harmless table before any feature table exists.
- Future-consistency note: name_en is bootstrap-only; country display names are UI strings and will translate via i18n keys (country.ET etc.) once the language system lands — name_en is never the display authority.

## 6. Execution plan after approval (order)
1. Operator pastes Knowledge rules (§2).
2. Supervisor drafts Lovable prompt A: create /docs tree (incl. architecture/overview.md map + conventions.md) + move governance/spec/ToS docs in + _changelog/_registry seeds. (Operator uploads the four project documents to the repo via prompt-attached content or manual commit — decided at execution.)
3. Supervisor drafts prompt B: CI workflow files (§4).
4. Supervisor drafts prompt C: migration 0001 (§5) + apply + read-back evidence.
5. Supervisor anchoring clone verifies each landing; ledger updated; Phase 0 gate review → Phase 1 spec session opens (identity).

## 7. Open items blocking gate closure (operator)
- Rename test result: after renaming repo to ethio-marketplace, did a trivial Lovable change land as a commit? (If sync broke: rename back, keep suffix, note it.)
- Repo visibility set to Public? (Required for supervisor anchoring clones per visibility DEC.)

## 8. Acceptance criteria for Phase 0 gate
- Knowledge rules installed (operator confirms screenshot/text).
- /docs tree exists in repo with the four project documents inside; _changelog seeded.
- CI runs green on main with the §4 set; migration linter demonstrably FAILS a test-branch table-without-RLS (guard proven, not assumed).
- Migration 0001 applied; supervisor read-back shows table+policies+seeds in live DB; anchoring clone hash matches Lovable's claim.
```
