# Foundations — turn 34, ruling 2 in brief form: DEC-266 (the first screen hydrated where React placed it), INC-913, INC-915, INC-916, INC-917: brief (saved unchanged, 2026-10-26)

```text
RULING 2 IN BRIEF FORM — FOUNDATIONS TURN 34, STOP 3 (2026-10-26; DEC-266; INC-913, INC-915, INC-916, INC-917; S432, the supervisor's slip: ruling 2 widened SCOPE in prose, without the BASE, FLAGS and SCOPE-BEGIN … SCOPE-END block the scope guard and land.ts read from the brief roadmap.md line 3 names — the form turn 32b's ruling 1 already used; your stop was right). Tier A. No migration. No new string. No package change. No AGENTS.md change. No file deleted. Base: dev b5240baa (your stop-3 landing). This brief replaces docs/governance/briefs/foundations-turn-34.md as the brief in force for the rest of the turn. The changes are ruling 2's, saved at docs/governance/briefs/foundations-turn-34-ruling-2.md (sha256 6f55ba63c9078f5ef9fd52f4518996fe12ceac1218775a413ca8f7efe61f18d0): carry out R2-2 … R2-9 from that file exactly as written, with the four changes below. Every part of foundations-turn-34.md not yet done — THE CHECKS, THE END-TO-END CHECK, THE COMPLETION REPORT — is done from that saved file as written, with change (c). R2-1's counts stand (the code they ran on is unchanged). Order: STEP 0; R2-2 … R2-9; the landing.
BASE: b5240baa
FLAGS: no-migration, no-new-string, no-package-change, no-agents-change
SCOPE-BEGIN
src/lib/supabase-door.ts
src/lib/supabase-door.test.ts
src/lib/session-bearer.ts
src/start.ts
src/lib/route-client.ts
src/lib/route-client.test.ts
src/lib/signed-in-route.ts
src/lib/signed-in-route.test.ts
src/lib/env-flags.test.ts
src/components/app-shell.tsx
src/components/shell/place-carry-service.ts
src/features/auth/auth-service.ts
src/features/auth/use-auth.ts
src/features/legal/legal-reader.ts
src/features/legal/legal-reader.test.ts
src/features/legal/use-legal-gate.ts
src/features/legal/use-legal-gate.test.tsx
src/features/permissions/service.ts
src/features/admin/nav-alerts.ts
src/features/admin/impersonation/impersonation-service.ts
src/features/posting/use-price-unit-labels.ts
src/features/posting/attribute-options.test.ts
src/features/ad-page/save.ts
src/features/ad-page/save.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/report.ts
src/features/ad-page/report.test.ts
src/features/ad-page/count-view.test.ts
src/i18n/bundle.ts
src/i18n/provider.tsx
src/i18n/provider.test.tsx
src/i18n/provider-layers.test.tsx
src/routes/auth.tsx
src/routes/settings.tsx
src/routes/legal.publishing.tsx
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/route-budgets.mjs
scripts/conformance/vendor-seams-scan.ts
scripts/e2e-select.ts
e2e/supabase-door.spec.ts
src/client.tsx
src/lib/hydrate-when-placed.ts
src/lib/hydrate-when-placed.test.ts
src/features/auth/auth-client.test.ts
src/lib/session-bearer.test.ts
src/i18n/server-shell-language.test.ts
scripts/conformance/vendor-seams.test.ts
SCOPE-END

THE SYSTEM (G0) — DEC-266, INC-913 (ruling 2 R2-2).
CONCERN: the browser hydrates the server's first screen as it was drawn — no state change makes React draw a streamed part again, and the page never holds two copies of anything.
MECHANISM: NONE YET at BASE — the browser's entry is TanStack Start's default (@tanstack/react-start/dist/plugin/default-entry/client.tsx), which hydrates at once from an `async` script (start-plugin-core manifestBuilder.js :68), so a boundary still streaming or queued for React 19.2's timed reveal is redrawn by the first state change above it (react-dom-client updateDehydratedSuspenseComponent). Built in R2-2 as src/lib/hydrate-when-placed.ts + src/client.tsx (ruling 2 BLOCKS A–C), to React's own streaming contract: the segment `<div hidden id="S:n">` and `$RC`, pinned by HWP-5.
CONSUMERS (grep of b5240baa: every Suspense boundary the server can stream, every provider that settles after hydration): src/routes/c.$slug.tsx :39 and src/routes/index.tsx :34 (the feed, under its held first page); src/components/marketplace/feed.tsx :327 (the covers' Await); src/components/shell/breadcrumbs.tsx :147, :311, :315, :319, :323, :411 (on-demand crumbs); src/features/posting/step-where.tsx :1833, :1903 and src/features/posting/preview/listing-detail.tsx :1143, :1182 (the maps) — each bypassed at BASE by the entry, each covered by the one wait with no change of its own; the providers whose first answers arrive after hydration — the shell's context (src/components/app-shell.tsx :783-:842), the i18n provider (src/i18n/provider.tsx :267-:288), use-auth (src/features/auth/use-auth.ts :110-:116) — covered: their updates now reach hydrated boundaries only.
COVERED HERE: every consumer above. LEFT: none (the speed study of R2-8 — the first page inline in the first flush — is a measurement, not a consumer).
CONFORMANCE GUARD: src/lib/hydrate-when-placed.test.ts HWP-1…6 — HWP-5 pins react-dom's streamed-segment marker and `$RC` (a React upgrade that renames them fails there, never as a flake); HWP-6 the entry calls the wait before its one hydrateRoot; the weight guard walks src/client.tsx (ENTRIES); in the browser SBE-3 (one copy, the server's node kept, signed in) and AP-54 (signed out). Planted proof: HWP-6 red with the wait removed from a scratch copy of src/client.tsx (never committed).
EXCEPTIONS: none.
FIVE LENSES — security: none (the wait reads the document only; no data path) · performance: hydration waits for the stream's end and React's reveal — at most 300 ms after the first paint where a late part exists, nothing where none does; the entry closure +0.3 KiB (203.9 / 207) · failure modes: a segment React never places → hydration proceeds 1.5 s after the document was read, with a `[client-error]` line; a background tab whose frames do not run → the same deadline · consistency: one entry for every page and every provider · future growth: a new streamed part, a new provider or a new language needs nothing.
FORWARD-SCAN: turns 35–37 (cached reference reads) and the Sage redesign render through the same entry. REGISTER: a new row "The first screen's hydration" (R2-8).

THE SYSTEM (G0) — INC-915 (ruling 2 R2-3, R2-4).
CONCERN: an action that needs the Supabase client answers a failed download of it as a failed action (F4) — never a rejection, a hang or a silent nothing.
MECHANISM: the door's contract (src/lib/supabase-door.ts: currentSession() and onAuthChange() never reject; rpc() rejects at BASE :243 — fixed in R2-4) and, for the auth actions, ONE helper `authClient()` in src/features/auth/auth-service.ts (R2-3).
CONSUMERS (grep of b5240baa, every `getSupabase()` and every door call that can wait on it): src/features/auth/auth-service.ts — 22 sites (:71 … :638) — bypass (each awaits and can reject) → covered by authClient(); src/routes/auth.tsx :128 (warms it, logs a failure — uses) and the four submits :269-:278, :318-:320, :340-:345, :376-:378 (no `finally`) → covered; src/routes/settings.tsx :169 (unhandled) → covered; src/features/auth/use-auth.ts :71 (handled, fail-open — uses); src/routes/legal.publishing.tsx :51 (the loader's rejection reaches the route's error page, which says the page did not load and offers to try again — uses, F4 holds); src/components/app-shell.tsx :773 (E2E hand-off, logged — uses); src/lib/supabase-door.ts rpc() → covered, so src/i18n/provider.tsx :391 and :577 end in their own `[i18n]` path.
COVERED HERE: every bypass above. LEFT: a failed session read treated as signed out — INC-914, the turn-34b roadmap line R2-8 adds.
CONFORMANCE GUARD: src/features/auth/auth-client.test.ts ASC-1 (every exported action of auth-service.ts, enumerated from its exports, resolves to its failure answer when the download fails) and ASC-2 (one `getSupabase()` in auth-service.ts); SBD-14, SBD-15; SBE-4 in the browser.
EXCEPTIONS: none.
FIVE LENSES — security: none (a failure shows less, never more) · performance: none · failure modes: the subject of the change · consistency: one helper, one answer per result shape · future growth: a new auth action is enumerated by ASC-1 by itself.
FORWARD-SCAN: INC-911's mechanism (turn 34b) will give "the client did not load" its own words; this turn uses the existing "auth.errorGeneric". REGISTER: the door's row (row 50) gains "never rejects; auth-service's authClient()" (R2-8, the mechanisms.md entry).

INC-916 (R2-6): concern "a guard sees every way to reach the client"; mechanism scripts/conformance/vendor-seams-scan.ts; consumers: every source file (the census); guard VS-4, VS-5. INC-917 (R2-7): concern "a test's stand-in intercepts what its subject reaches"; mechanism: the door's mock (`vi.mock("@/lib/supabase-door")`), as Part C re-pointed eleven tests; consumers: every test that mocks @/integrations/supabase/client or @supabase/supabase-js (the census of R2-7).

THE FOUR CHANGES TO RULING 2
(a) STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included) byte for byte as docs/governance/briefs/foundations-turn-34-r2.md and paste its sha256sum (the carrying message states the expected value; a difference is a STOP). roadmap.md: on line 3, the text after "The brief in force: " up to its closing parenthesis becomes `docs/governance/briefs/foundations-turn-34-r2.md (Foundations turn 34, ruling 2 in brief form: DEC-266 — the first screen hydrated where React placed it; INC-913, INC-915, INC-916, INC-917)` (everything after it stays). Tick nothing. Commit: `turn 34: ruling 2's brief saved`. Then ask the guard's scopeVerdict again for every file ruling 2 names and paste the verdicts: all allowed.
(b) R2-7's census: a test file other than src/i18n/server-shell-language.test.ts that would need re-pointing is listed in the report (file:line, what it mocks, what its subject reaches), not edited — turn 34b takes it. src/features/legal/use-legal-gate.test.tsx is edited as R2-7 says (it is in SCOPE).
(c) THE CHECKS' hash list (foundations-turn-34.md): run it with the lines of the files ruling 2 releases skipped, and say how many lines were skipped and which; those files are judged by ruling 2's BLOCKS and by the report's sha256 lines.
(d) The mechanisms.md entry of R2-8 also adds to the door's row (row 50): "never rejects where the client's own call did not; auth-service's authClient() (INC-915)", and to row 47 (the listings pages' first cards kept by the browser): "hydrated only once React has placed them — the new row (DEC-266)".
```
