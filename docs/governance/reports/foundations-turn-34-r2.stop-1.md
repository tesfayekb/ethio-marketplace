STOP — turn 34 ruling 2, R2-9: the reviewer's BLOCKER needs a test file outside SCOPE
DONE: STEP 0 of the r2 brief (56dbc29); R2-1 (counts in foundations-turn-34.stop-3.md); R2-2 … R2-8 (8cea0c1 … 6d54095); R2-9's THE CHECKS and THE END-TO-END CHECK (all green); R2-9's reviewer, run once (NOT READY)
LEFT: the reviewer's BLOCKER 1 fixed red-first in a new commit and the reviewer run again; the completion report; the final landing
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `b5240baa61860dcc510d8e751766359e06b6e170` (short `b5240ba`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T06:46:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40280123430
FILES (`git diff --name-only b5240baa`, the r2 brief's BASE):
docs/_changelog.md
docs/features/e2e-harness.md
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34-r2.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-34-r2.stop-1.md
e2e/supabase-door.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-marketplace-imports.mjs
scripts/conformance/vendor-seams-scan.ts
scripts/conformance/vendor-seams.test.ts
src/client.tsx
src/features/auth/auth-client.test.ts
src/features/auth/auth-service.ts
src/features/legal/use-legal-gate.test.tsx
src/i18n/server-shell-language.test.ts
src/lib/hydrate-when-placed.test.ts
src/lib/hydrate-when-placed.ts
src/lib/session-bearer.test.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/auth.tsx
src/routes/settings.tsx

## The stop

R2-9: "Then the reviewer in the FOREGROUND on the last code commit; wait for its verdict line; a BLOCKER is
fixed in a new commit and the reviewer runs again." The reviewer (read-only `reviewer` agent; it started in
the background although the call asked for the foreground, and I waited for its answer before anything else)
read b5240baa..6d54095 against the r2 brief, ruling 2, the original brief and the rules. Its verdict line:

VERDICT: NOT READY — BLOCKER 1, MAJOR 2, MINOR 8

BLOCKER 1 (F4, a phantom success, which I confirmed in the code): R2-3 makes `requestPasswordReset` answer
`{ ok: false, errorKey: "auth.errorGeneric" }` when the client did not load (auth-service.ts :611-:612), but
`handleForgotSubmit` (src/routes/auth.tsx :391-:397) ignores the answer and always shows "auth.resetNeutral"
("If an account exists for that address, a password reset link is on its way.") — though no request left the
browser — and spends one of the visit's capped tries and the cooldown. The function's comment
(auth-service.ts :603-:608, "true in every branch") is false for that branch. The fix is small and in SCOPE:
on `!result.ok`, show its errorKey and do not set `resetRequested` (B-3 holds: a failed download says nothing
about whether an account exists), and correct the comment.

Why it is a STOP and not that fix: it is a defect, so its test must be shown red against the code as it stands
(.claude/rules/20-tests.md: "Red-first: a test that reproduces a defect is shown failing against the previous
code"). No test the SCOPE allows reaches the forgot view: no unit test renders src/routes/auth.tsx (grep for
an import of routes/auth in src/ and e2e/: none), the one browser spec that drives the forgot view is
e2e/auth-reset.spec.ts (outside SCOPE), and e2e/supabase-door.spec.ts is BLOCK D, fixed by its sha256
(819ed1bf…). 00-executor-protocol.md: "A file the task needs and the brief did not name is a STOP naming the
file and why"; and "anything you cannot prove" is a STOP. Nothing was changed for the blocker.

## The reviewer's majors and minors (for the ruling; nothing changed for them)

- MAJOR 1 — on the sign-in screen a failed client download first reloads the page: the door's import goes
  through Vite's preload helper, a failed import fires `vite:preloadError`, and src/lib/stale-chunk.ts :44-:56
  (INC-640, installed at src/routes/__root.tsx :418) answers the tab's first one with `preventDefault()` and
  `location.reload()` — the typed email and password are lost, the prevented import resolves `undefined`
  (the door then rejects with "Cannot read properties of undefined (reading 'supabase')", which authClient
  logs as the cause), and "the form says so" holds only for a second failure within 60 s. SBE-4 races that
  reload (the warm-up at auth.tsx :127-:131 fails near the fill and the click), against ruling 2 §3.1's judge.
  I saw the reload myself in R2-2's run (desktop SBE-4: "Execution context was destroyed, most likely because
  of a navigation"; `[client-error] pageerror: TypeError: Cannot read properties of undefined (reading
  'supabase') at …/supabase-door-….js:27`); R2-3's run and the final run were 8 of 8 green. The INC-915 census
  in the r2 brief does not name stale-chunk.ts, and auth.tsx :126's comment ("the submit asks again") is not
  what happens. Options it names: exempt the client chunk from the one reload, or make SBE-4 wait for the
  reload and assert on the second failure; and name stale-chunk.ts as a consumer.
- MAJOR 2 — DEC-266's stated cost understates the wait: `streamPlaced` needs `readyState !== "loading"`, so
  hydration waits for the stream's end and then React's reveal; on a listings page the first page may stream
  for up to FIRST_PAGE_DEADLINE_MS = 2000 (src/server/first-screen.ts :55), so the whole shell can stay inert
  for up to about 2.3 s on a slow read, where before only the feed boundary waited. performance-strategy.md
  :337 and mechanisms.md row 51 ("at most 300 ms after the first paint where a late boundary exists") are
  true only when the stream ends at first paint (ruling 2's own wording, which R2-8 asked me to record). The
  1.5 s deadline starts after the document is read, so it does not bound this. For the supervisor: the wording,
  and whether DEC-266's KEEP/REVISIT judge needs a time-to-interactive number.
- MINOR 1: roadmap.md :512 carries `\_\_ethioSupabase` (Prettier's markdown escape; format:check gates the
  landing), not the ruling's `__ethioSupabase` — a departure I record. MINOR 2: `verifyCurrentPassword`
  (auth-service.ts :380-:389) also takes the client now, a fourth helper beyond R2-3's three, needed to hand
  the client to `currentPasswordProof`. MINOR 3: src/lib/supabase-door.ts :34's comment still says "the
  anonymous PostgREST call the client itself sends" (R2-8 corrected only the doc). MINOR 4: SBE-4 filters on
  `en["auth.errorGeneric"]` (J5: anchor on structure, never English) — BLOCK D's text. MINOR 5: each door import
  in supabase-door.test.ts adds a window `storage` listener; SBD-9 relies on `state.listeners.at(-1)`, and
  SBD-17 could pass an older listener's import (it passed 5 shuffled seeds). MINOR 6: src/client.tsx :15
  hard-codes "1.5 s" beside PLACED_DEADLINE_MS, and AP-54's console filter (`/hydrat/i`) would count that line
  as a failure — probably intended. MINOR 7 (K2): src/routes/auth_.reset.tsx :99-:101 submits without a
  `finally` (safe now that no action rejects); settings, use-auth, app-shell and legal.publishing handle
  their own failure. MINOR 8 (pre-existing): src/components/app-shell.tsx :645 ignores signOut()'s `{ ok:false }`.

## What was done and proven (for the report that follows the ruling)

- STEP 0: docs/governance/briefs/foundations-turn-34-r2.md sha256 762a86c4df3287b9f091bb7537ce4426f3a310add44a5cc9137770be1a03af37,
  10677 bytes (the carrying message's); roadmap.md line 3 names it; the guard's scopeVerdict then answered OK
  for all 17 files ruling 2 names.
- R2-2: BLOCKS A, B, C byte-exact (ed297461…, a07dd5c1…, f4f0295e…); check-marketplace-imports.mjs 757056a9…;
  HWP-1…6 6 passed; TI-1 (scripts/test-ids.test.ts) 5 passed; weight guard `modules walked: 110`,
  `findings: 0`; check-bundle-size `JS: 203.9 KiB / 207 KiB — ok`, "/" and "/c/$slug" 217.4 / 220; the built
  entry chunk carries the wait (grep of dist/client/assets); planted proof: HWP-6 red with the wait removed
  (`AssertionError: expected -1 to be greater than -1`), the file restored (f4f0295e…). Browser, both
  projects: door spec `2 failed`, `6 passed (49.8s)` (SBE-4, expected until R2-3); AP-54 `2 passed`, PP-21
  `2 passed`, PW-94 `2 passed`; `[ssr-error]` 0. Maps "1736 keys across 590 files".
- R2-3: ASC-1 and ASC-2 red first against the pre-change auth-service.ts (`signUp: expected { Object (rejected) }`;
  `expected [ 'getSupabase()', …(21) ] to have a length of 1 but got 22`), then green; `getSupabase()` once in
  auth-service.ts; door spec whole `8 passed (38.1s)`; src/features/auth + src/routes + src/i18n 41 files,
  173 tests passed.
- R2-4: SBD-1…17 17 passed; SBD-9 shown able to fail (a planted stored session: `expected 1 to be +0`),
  reverted. A race of my own first form (two vi.doMock calls for one path, which vitest resolves concurrently)
  made SBD-15 fail once in 12 runs made in parallel pairs (and one earlier run of 16 single runs failed on a
  test I did not capture); replaced by one factory with a flag, then 20 of 20 runs in parallel pairs green.
- R2-5: SBB-1…3 3 passed against the real export (`attachSessionBearer.options.client`), no framework needed.
- R2-6: VS-1…5 5 passed; the census's dynamic-import finds: src/lib/supabase-door.ts (the seam) and
  src/features/auth/auth-service.ts (already allowlisted) — no file outside the allowlist.
- R2-7: server-shell-language.test.ts's client mock removed (its subject reaches none); ILA-5 shown able to
  fail (a flipped expectation: `expected { lang: 'en', … } to deeply equal { lang: 'am', … }`), reverted;
  use-legal-gate.test.tsx's hoisted session and door mock at the top level, 13 passed. Census (b58aa884: twelve
  client mocks, three supabase-js mocks): use-photo-reviews.test.ts :8, use-screening.test.ts :8,
  legal-service.test.ts :2, alias-reason.test.ts :3 (admin-users-service.ts), my-listing-edit.test.ts :4,
  pricing-data.test.ts :25, use-edit-draft.test.ts :19, list-pages.test.ts :11 (locations-service.ts,
  categories-service.ts), supabase-door.test.ts — its subject reaches it; facts-validation.test.ts :2 — kept
  for a transitive import (legal-service.ts); settings-messages.test.tsx :72 — kept for a transitive import
  (mfa-service.ts through use-mfa.ts) and the door's dynamic import; server-shell-language.test.ts :3 —
  re-pointed (removed); exports.test.ts :17, feed.test.ts :25, seller.test.ts :7 (supabase-js) — their server
  routes reach it. None other needs re-pointing (change (b)).
- R2-8: the records committed (6d54095).
- THE CHECKS: the hash list with the 12 released files' lines skipped — 40 OK (skipped:
  vendor-seams-scan.ts, auth-service.ts, auth.tsx, settings.tsx, use-legal-gate.test.tsx,
  check-marketplace-imports.mjs, performance-strategy.md, _changelog.md, supabase-door.ts,
  supabase-door.test.ts, supabase-door.spec.ts, mechanisms.md); src/integrations untouched; lint 0 errors,
  39 warnings; typecheck clean; unit 310 files, 1935 tests passed; map-guard "match the tree"; build 0;
  check-bundle-size `JS: 204.1 KiB / 207 KiB — ok`, `Bundle budget OK.`; weight guard `findings: 0`;
  hard-coded strings `findings: 0`; format:check clean.
- THE END-TO-END CHECK (staging, both projects, 2 workers, fake mode, 0 retries; `[ssr-error]` 0 in every
  run): supabase-door `8 passed (38.2s)`; smoke-auth-i18n `2 passed (14.9s)`; auth-signout `28 passed (2.1m)`;
  auth-callback `4 passed (15.2s)`; auth-reset `6 passed (27.3s)`; auth-signin-errors `5 passed (17.9s)`;
  legal-accept `12 passed (46.0s)`; i18n-bundle `6 passed (26.6s)`; ad-page AP-23/26/29/54 `8 passed (1.2m)`;
  PP-21 `2 passed (24.5s)`; PW-94 `2 passed (13.7s)`.
- The frozen rule (DEC-261): (1) the entry 254.0 → 204.1 KiB, 49.9 KiB off (floor 45); (2) every sign-in,
  sign-up, callback and session test green locally and in CI runs 40275257775 (b58aa88) and 40280123430
  (b5240ba); this landing's run is not yet read; (3) AP-54 green in CI on both those runs and locally after
  DEC-266 (it raced locally before).
- sha256 of every released or new file at e8091d7: src/client.tsx f4f0295e…0c15; src/lib/hydrate-when-placed.ts
  ed297461…828f; src/lib/hydrate-when-placed.test.ts a07dd5c1…ee9a; src/features/auth/auth-client.test.ts
  4bcad6cd…c577; src/lib/session-bearer.test.ts 0f8ff4fe…704b; src/i18n/server-shell-language.test.ts
  974cd0c9…1051; scripts/conformance/vendor-seams.test.ts 3ce34a9b…2b49; src/features/auth/auth-service.ts
  d5991700…6bd0; src/routes/auth.tsx 45a6d372…509f; src/routes/settings.tsx c1fd335f…53d7;
  src/lib/supabase-door.ts dbc1d814…7813; src/lib/supabase-door.test.ts 5ace1c50…ba98b;
  e2e/supabase-door.spec.ts 819ed1bf…67c4; scripts/check-marketplace-imports.mjs 757056a9…d248;
  scripts/conformance/vendor-seams-scan.ts 36a764e3…5bc9; src/features/legal/use-legal-gate.test.tsx
  973ac875…ebf1.

## The question

A ruling on BLOCKER 1's proof, for example: SCOPE gains src/routes/auth.test.tsx (a new unit test that
renders the forgot view with the door failing — red against auth.tsx as it stands, then green), or
e2e/auth-reset.spec.ts (a new id there), or a BLOCK D v2 with an SBE-5 and its sha256; with that, I fix
handleForgotSubmit and the comment as above in a new commit and run the reviewer again. And a ruling on
MAJOR 1 (the stale-chunk reload on the sign-in screen and SBE-4) and MAJOR 2 (DEC-266's wording and judge),
which touch src/lib/stale-chunk.ts (outside SCOPE) and the records.
