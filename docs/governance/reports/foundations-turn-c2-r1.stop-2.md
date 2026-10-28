STOP — turn C2 part C: the widened fetch-ahead grows every page's first download by 79 bytes gzipped (205.7 → 205.8 KiB)
DONE: part A; STEP 0 (`2980ef4`); part B (`d7129b2`); ruling 1 saved (`328801b`, sha256 ef01bd2c25bc0e37d57861a845cf35ff23279c11ebf996eb45e3baf41b8ff779, 3793 bytes); R2 (`ebbaaca`); R1 applied with Part C — NOT committed, held in the session
LEFT: part C (commit), parts D, E, F, G; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a05e5c9594b077ec41fb3ffecc129ea98195eb70` (short `a05e5c9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T13:01:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40689208427
Two-step check: the reported commit is BASE (a05e5c95), not stop 1's landing e987da41 — that landing's run has not reported yet (STALE for e987da41).
FILES:
docs/features/admin-shell.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-c2-r1.md
docs/governance/briefs/foundations-turn-c2.md
docs/governance/reports/foundations-turn-c2-r1.stop-2.md
docs/governance/reports/foundations-turn-c2.stop-1.md
e2e/auth-signout.spec.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
roadmap.md
scripts/conformance/sign-out-landing-allowlist.txt
scripts/conformance/sign-out-landing.test.ts
src/components/app-shell.tsx
src/lib/sign-out-landing.ts
src/routes/admin.tsx
src/routes/settings.tsx
src/test/e2e-route-guard.test.ts

## The conflict

The brief, Part C4: "build and check-bundle-size — no page's first download grows (the fetch is after load); paste", and HOW TO WORK: "A STOP is only: … a page's first download that grows (Parts B, C, E — paste the table)". Ruling 1 (R1) re-applied Part C as it was held, with HOOK-1's line; the build then measured every page's first download 0.1 KiB larger than Part B's.

What grows is not the fetched code (that arrives after load) but the mechanism's own code, which sits in the entry chunk because app-shell.tsx imports it statically: the per-piece loop and state map in `createHomeAhead`, the account menu's piece (`{ what: "the account menu's code", load: loadOverlays }`) and its report branch. The entry chunk, `gzip -6c dist/client/assets/index-*.js | wc -c`: Part B 125302 bytes; Part C as held at stop 1 125389 (+87); Part C now 125381 (+79).

The +87 → +79 is one change made while measuring, kept in the held diff because DEC-018 requires it: at stop 1 the E2E flag names rode in each piece's data (`flag: "__ethioHomeAhead"`), so both names shipped in the production build (`grep -o "__ethio[A-Za-z]*" dist/client/assets/*.js` found them); now the pieces carry `{ what, load }` only and the shell maps a piece to its flag inside `if (!isE2E) return;`, so neither name is in the production build (the same grep: none). SAH-4 reads each piece's state as its own (`piece.what`), no longer by a flag. Nothing else was shaved: making the code smaller only to move the rounding would be measuring the guard, not the page.

Part B's numbers against the held Part C's (every line of check-bundle-size that differs — 33 lines; CSS and the other pages' printed numbers did not move at the tool's 0.1 KiB rounding, though every page carries the entry's +79 bytes):

| Part B (`d7129b2`, = R2 `ebbaaca`) | Part C (held) |
| --- | --- |
| JS: 205.7 KiB / 207 KiB — ok | JS: 205.8 KiB / 207 KiB — ok |
| 265.0 / 266 KiB  /account | 265.1 / 266 KiB  /account |
| 207.5 / 209 KiB  /account_/legal | 207.6 / 209 KiB  /account_/legal |
| 217.9 / 219 KiB  /account_/saved | 218.0 / 219 KiB  /account_/saved |
| 206.6 / 208 KiB  /admin | 206.7 / 208 KiB  /admin |
| 207.5 / 209 KiB  /admin/ | 207.6 / 209 KiB  /admin/ |
| 330.2 / 331 KiB  /admin/ai | 330.3 / 331 KiB  /admin/ai |
| 346.5 / 347 KiB  /admin/attributes | 346.6 / 347 KiB  /admin/attributes |
| 306.5 / 308 KiB  /admin/audit | 306.6 / 308 KiB  /admin/audit |
| 336.2 / 337 KiB  /admin/countries | 336.3 / 337 KiB  /admin/countries |
| 328.8 / 330 KiB  /admin/coverage | 328.9 / 330 KiB  /admin/coverage |
| 207.3 / 209 KiB  /admin/images | 207.4 / 209 KiB  /admin/images |
| 307.1 / 308 KiB  /admin/impersonation_/$sessionId | 307.2 / 308 KiB  /admin/impersonation_/$sessionId |
| 276.3 / 277 KiB  /admin/legal | 276.4 / 277 KiB  /admin/legal |
| 275.6 / 277 KiB  /admin/legal_/$versionId | 275.7 / 277 KiB  /admin/legal_/$versionId |
| 281.7 / 283 KiB  /admin/legal_/edit | 281.8 / 283 KiB  /admin/legal_/edit |
| 268.2 / 270 KiB  /admin/locations | 268.3 / 270 KiB  /admin/locations |
| 337.5 / 338 KiB  /admin/places | 337.6 / 338 KiB  /admin/places |
| 373.5 / 377 KiB  /admin/screening | 373.6 / 377 KiB  /admin/screening |
| 407.0 / 408 KiB  /admin/translations | 407.1 / 408 KiB  /admin/translations |
| 319.2 / 320 KiB  /admin/translations_/$lang | 319.3 / 320 KiB  /admin/translations_/$lang |
| 283.5 / 285 KiB  /admin/users_/$userId | 283.6 / 285 KiB  /admin/users_/$userId |
| 218.1 / 219 KiB  /auth | 218.2 / 219 KiB  /auth |
| 208.7 / 210 KiB  /auth_/reset | 208.8 / 210 KiB  /auth_/reset |
| 221.4 / 223 KiB  /dev/primitives | 221.5 / 223 KiB  /dev/primitives |
| 206.0 / 207 KiB  /dev/tall | 206.1 / 207 KiB  /dev/tall |
| 247.3 / 251 KiB  /l/$slug | 247.4 / 251 KiB  /l/$slug |
| 209.6 / 211 KiB  /legal/$kind | 209.7 / 211 KiB  /legal/$kind |
| 393.7 / 397 KiB  /post | 393.8 / 397 KiB  /post |
| 393.7 / 397 KiB  /post_/$listingId | 393.8 / 397 KiB  /post_/$listingId |
| 209.6 / 211 KiB  /privacy | 209.7 / 211 KiB  /privacy |
| 269.4 / 271 KiB  /settings | 269.5 / 271 KiB  /settings |
| 209.6 / 211 KiB  /terms | 209.7 / 211 KiB  /terms |

The ceilings still hold (`Bundle budget OK.`; JS 205.8 / 207 KiB; the closest page, /admin/attributes, 346.6 / 347 KiB).

## The question

Which way does Part C go?

(a) Accept the growth: +79 bytes gzipped on every page (205.7 → 205.8 KiB), the cost of fetching the account menu's code ahead in the entry's own code; Part C lands as held.

(b) Take the fetch-ahead off the first download: `createHomeAhead` moves to a module of its own, fetched with `loadOnce` once the page is idle for a signed-in visitor, while `SIGN_OUT_LANDING` stays in src/lib/sign-out-landing.ts (every landing imports the constant statically, so the module that holds it is always in the entry). Today's single-piece `createHomeAhead` is in the entry too, so this would shrink every page's first download below BASE's. It needs a new file outside SCOPE (e.g. src/lib/home-ahead.ts and its test), its line in the on-demand census (ODC, scripts/conformance/on-demand-failure.test.ts — in SCOPE), and a register row 62 that says so.

(c) Another way the supervisor names.

## Part C as held (re-applied on the ruling)

- C1's census is stop 1's (docs/governance/reports/foundations-turn-c2.stop-1.md, "Part C as written").
- src/lib/sign-out-landing.ts — `createHomeAhead(pieces: AheadPiece[], report)`, `AheadPiece { what, load }`; each piece's fetch once for a signed-in visitor online, its failure logged (`[home-ahead] <what> did not download: <errorText>`) and never retried, `state(piece)` / `report(piece, state)` per piece.
- src/components/app-shell.tsx — the Home page's piece and the account menu's (`loadOverlays`); the E2E build writes `__ethioHomeAhead` / `__ethioMenuAhead` inside `isE2E`.
- src/lib/env-flags.test.ts — R1's line only.
- src/lib/sign-out-landing.test.ts — HA-1…4 re-pointed to the list form (one piece in a list; their assertions unchanged); SAH-1…5 new.
- e2e/auth-signout.spec.ts SO-13 — the phone leg's online opening removed; it polls `__ethioMenuAhead` to "ready" first.
- The run: `bunx vitest run src/lib/sign-out-landing.test.ts src/lib/env-flags.test.ts` → `Tests  10 passed (10)`; `bun run typecheck` clean.

## R2 (done, `ebbaaca`)

src/routes/settings.tsx :144 and src/routes/admin.tsx :73 navigate to `SIGN_OUT_LANDING` (admin's with the comment R2 asks for); their allowlist lines are removed, and scripts/conformance/sign-out-landing-allowlist.txt is kept with a header line saying no exception stands — kept rather than dropped so a future exception is one line under the kit's grammar, the census's read unchanged. CF-SOL-1, `bunx vitest run scripts/conformance/sign-out-landing.test.ts --disableConsoleIntercept`: `[sign-out-landing] files read: 519; literal landings: 0; allowed: 0` · `Tests  2 passed (2)`. `bunx vitest run src/routes`: `Tests  126 passed (126)`. check-bundle-size after R2: no line differs from Part B's.
