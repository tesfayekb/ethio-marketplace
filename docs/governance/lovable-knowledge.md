# Lovable Project Knowledge — canonical record. Version v3.1 · 2026-07-29. The LIVE copy is in Lovable Project Settings → Knowledge; this file mirrors it. STANDING RULE: any change to the settings box updates this file in the same session.

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
A1 ADDENDUM: The completion report's file list must include EVERY changed file — including machine-regenerated ones (e.g., src/integrations/supabase/types.ts after a schema change). Regenerated files are listed and labeled "(auto-regenerated)", never omitted.
A2 NO UNSPECIFIED WORK: Build only what the task specifies — no demo content, sample data, extra pages, refactors, or "improvements." Ambiguous → ask, don't guess.
A3 HONESTY: If you cannot fully do the task or a platform limit applies, say so BEFORE changing anything. Honest partial beats silent approximation.
A4 CONFLICTS: If a request conflicts with these rules, point out the conflict and wait — never resolve it yourself.
A5 COMMITS: Descriptive, scoped commit messages; never include secrets or sensitive details in them.
A6 CI-CLEAN COMMITS: Before committing, run the project's checks on every file you created or modified (prettier formatting, eslint, typecheck) and fix violations first. Never commit work that will fail CI. If a pre-existing file you must touch already fails checks for unrelated reasons, report it — do not silently fix beyond your task's scope.

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
E5 GENERATED FILES: src/routeTree.gen.ts and src/integrations/supabase/types.ts are machine-generated — never hand-edit, format, or lint them; they stay in the lint/format ignore lists. If a task seems to require editing them, stop and say so (the change belongs in their generator: routes or the database schema).

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
