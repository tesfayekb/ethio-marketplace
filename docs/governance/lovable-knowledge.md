# Lovable Project Knowledge — canonical record. Version v3.8 · 2026-09-10. The LIVE copy is in Lovable Project Settings → Knowledge; this file mirrors it. STANDING RULE: any change to the settings box updates this file in the same session.

ETHIO.COM — PROJECT KNOWLEDGE · v3.8 (2026-09-10; supersedes v3.7). These rules override any conflicting request phrasing.

1. WHAT THIS APP IS
ethio.com: production, mobile-first, multilingual classifieds PWA for Ethiopians at home and in the diaspora. Users post into admin-managed categories; buyers browse geo-scoped feeds and contact sellers (in-app messaging + seller's channel). No payments in v1. Sign-in: email+password, Google, Telegram. Users: low-cost Android, expensive data; Amharic (Ge'ez), Afaan Oromo, Tigrinya, English.

2. ARCHITECTURE
TanStack Start (SSR React) + Tailwind. Backend: the CONNECTED EXTERNAL Supabase (Postgres+RLS+Auth+Storage); publishable key only in the browser; schema truth = /supabase/migrations (append-only). DEC-020: commits land on dev; main advances only via CI's fast-forward promote on green.
Pages /src/routes (server endpoints /src/routes/api via the installed Start primitive); features /src/features/<name> (components/, hooks/, <name>-service.ts); primitives /src/components; pure utilities ONLY /src/lib; translations /src/i18n/locales (one lazy file per language); docs /docs (features/<name>.md, _changelog.md append-only). kebab-case files, PascalCase components, use-* hooks; split files over ~300 lines.

3. RULES
A. PROCESS
A1 SCOPE: modify only files named in the task; if others seem needed, STOP and say which/why; end by listing every file modified.
A2 NO UNSPECIFIED WORK: no demo data, extra pages, refactors; ambiguous → ask.
A3 HONESTY: if you cannot fully do the task or a platform limit applies, say so BEFORE changing anything.
A4 CONFLICTS: if a request conflicts with these rules, point it out and wait.
A5 COMMITS: descriptive, scoped; never secrets; the platform commits when the turn ends. A migration and its files land in the same turn; a lost tree after an apply is reported first.
A6 CI-CLEAN: before committing run prettier format:check on EVERY touched file (docs too), eslint, typecheck; fix first. New files: git ls-files proof. Migration reports state "apply <uuid-fragment> → expect mark <declared value>" (DEC-022: marks monotonic, ≥ filename stamp). Any src-touching landing runs i18n:usage and commits both maps. Reports touching e2e/** end with the J-audit line (identity ✓ fences ✓ single-project ✓ seed-before-navigate ✓ dump ✓).
A7 FIRST-OF-KIND + LOCAL PROOF: a category with no precedent censuses the installed package's export (paste it) and lands a minimal smoke proof. DEC-023 LIVE: staging E2E credentials arrive only via the secret dialog; every landing touching e2e/** or a gated surface runs `bun run e2e:local -- <specs>` on both projects and pastes the summary; blocked by staging parity = NO commit. Prod credentials never enter the executor.

B. REUSE
B1 Search before creating any component/hook/utility/key/table; state what you searched.
B2 One utility per concern, in /src/lib.
B3 Primitives in /src/components, feature pieces in /src/features; extend via props, never copy-paste.
B4 One component per file.

C. MOBILE-FIRST UI
C1 Design at 360px first; verify 360/768/1024/1280.
C2 Touch targets ≥44px (Button size="touch"); primary actions near the bottom; nothing relies on hover.
C3 Design-system tokens only.
C4 Every screen has translated loading/empty/error states; an empty state is a caption beside the controls, never a replacement.
C5 RTL-safe: logical properties only (ms-/me-/ps-/pe-/text-start).
C6 Accessibility basics; screen-reader-only text counts as user-visible (D1).
C7 Data tables render ONLY through the DataTable primitive: priority tiers (primary/secondary/detail/wide) + width utilities, cardUntil='lg' when dense; the primitive owns pagination and overflow; minWidth only for unwrappable dense data with a same-line `// C7-dense:` justification (guarded); no per-page width hacks; nothing renders "[object Object]", undefined or NaN (guarded).

D. TRANSLATION
D1 No user-visible literal strings; every string uses a key from /src/i18n/locales.
D2 Every new key ships EN+AM in the same change. A migration registering a permission resource/action ships its admin.roles.perm.* keys in the same landing.
D3 The DATABASE is runtime truth for UI strings (ui_translations) and entity strings (entity_translations); compiled files are seed + fallback. Overlay: DB[lang] ▸ compiled[lang] ▸ compiled.en; an empty catalog is invisible; a DB-only language is legitimate. Keys are born in code (Sync keys). Publishing is coverage-gated on approved UI keys and refuses an empty catalog.

E. DATABASE
E1 Every new table ships RLS ENABLED + explicit per-operation policies + explicit GRANTs incl. GRANT ALL TO service_role.
E2 Migrations append-only; corrections are new migrations; destructive only when the task says so. A8: never patch a function body by text anchor (INC-183) — re-declare it WHOLE (CREATE OR REPLACE; DROP+CREATE if the return shape changes), restating REVOKE ALL FROM PUBLIC, anon · GRANT EXECUTE TO authenticated · GRANT ALL TO service_role in-file, with definition+ACL read-back.
E3 Personal-data tables carry home_country_code; timestamps timestamptz UTC.
E4 Money: never floats.
E5 GENERATED/EXEMPT (per-file, never a widened glob): routeTree.gen.ts, supabase/types.ts (never hand-edit), tracking failure/flake files, scripts/fixtures/, platform-injected files.
E6 Totality gates define the empty set explicitly (empty ≠ complete; partial ≠ granted).
E7 Client reads only via gated SECURITY DEFINER RPCs; rpc() argument and column names are copied from the SQL declaration. List RPCs ship their index and an EXPLAIN in the migration proof.

F. SECURITY
F1 Secrets never in code/comments/commits; service-role never client-side; server-route secrets read from server env inside the handler, never VITE_-prefixed.
F2 Validate all input server-side; render user content as data, never HTML.
F3 The server (RLS/has_permission) is the ONLY authority; UI hiding is convenience.
F4 No phantom success: failures surface as translated messages and are logged; an errored permission check renders as an error, never as "no permission"; a guarded action reports its result even after a step-up round-trip.
F5 Writer order in every mutating RPC: gates (permission → step-up → scope) → capture (old→new) → mutate; a refused attempt leaves no trace. Imports: server-side parse, size cap, cells are data (formula-leading refused), identities never renamed, read-only columns never applied (edits reported), removals only by explicit action, preview writes nothing, commit idempotent, step-up gated, batch-tagged, undoable; refusals name the values judged and the fix.

G. PERFORMANCE/SEO
G1 Public pages SSR with correct title/meta/og (absolute URLs), declared language, hreflang from the publication gate; per-request DB work on public paths is version-cached.
G2 No new dependency unless named; images lazy with dimensions; no autoplay; no prefetch beyond viewport.

H. DOCUMENTATION
H1 Structural changes update /docs/features/<name>.md and append one _changelog.md line in the same change; never renumber/delete.
H2 No known-error debt: every violation a check surfaces, even pre-existing, is reported and fixed as its own tracked task before the phase closes.

I. RUNTIME STABILITY
I1 Fixtures are captured from real tool output (every shape it emits), never authored.
I2 Ref contract: a Slot/asChild child holds the ref (never a wrapper); no inline state-writing refs on mapped children; ref-fed state uses stable callbacks + equality-guarded writes.
I3 Identity stability: hooks never return fresh []/{} into dependency arrays; mirrored writers are equality-guarded; measuring hooks never observe what they mutate.
I4 Server routes use the installed Start primitive; handlers log every throw AND deliberate 5xx as "[ssr-error] <path> <message>"; Supabase calls over 5s log "[slow-rpc]".
I5 Auth-state callbacks never call Supabase (the auth lock is held) — hop a macrotask; first-frame Supabase reads belong to the auth flow alone; core auth code changes only by DEC. Step-up freshness derives from the token (aal2 + totp amr in the DB window), never a client hint.
I6 Gate-list reads use a plain keyed anon fetch with cache:"no-store"; never cache-bust with query params; a failed gate fetch is logged and retried, never silently defaulted. Root providers render immediately, reconcile async. Step-up dialogs render on the top layer.

J. TEST AUTHORING
J1 Every mutable fixture is namespaced run × job (E2E_SHARD) × worker × project × test tag; every scratch slug/key starts with e2e-.
J2 Global-sweep tests run in a fence language per project (zxx-mo/-de MT, zxy-mo/-de approval); real catalog keys are read-only to specs.
J3 Never edit real reference rows; per-axes scratch entities, deleted in finally; the shard-1 setup alone reaps hour-old residue and heals staging's EN rows to compiled (staging is automation-only).
J4 Bulk/count assertions read per-key DB truth via the service client; summaries asserted for visibility only; mismatches throw with the page/query-cache/audit dump.
J5 Locators via the viewport-aware twin helpers (rows suffixed, cells row-scoped, actionsOf per twin), never bare prefix + .first(); fixtures via service-client TABLE operations; bulk tests carry a budget and named phases; anchor on structure, never English text.
J6 Tests mutating a global list run in ONE project; invariants and public-surface anchors exclude transient fixtures and other tests' rows (filter by actor and the scratch prefix).
J7 Seed before navigate; assert seeded rows rendered before acting; polls shorter than the test budget so failures assert with values.
J8 @global-state tests run serial-only in the nightly (DEC-028), quarantined non-gating until DEC-026 coverage; flaky passes are ledgered (DEC-030), 3-in-7-days → INC.
J9 Identity: the pool (one super admin per worker, a session per test in node) for consumers; tests mutating their own auth state (impersonation, enrol/unenrol, language) carry @private-identity and take the real door.
