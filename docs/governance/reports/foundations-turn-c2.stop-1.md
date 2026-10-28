STOP — turn C2 part C: the account menu's E2E state needs src/lib/env-flags.test.ts (HOOK-1's census list), outside SCOPE
DONE: part A; STEP 0 (`2980ef4`); part B (B1–B4, `d7129b2`); part C (C1 census; C2/C3 written and run green but for HOOK-1 — NOT committed, held in the session)
LEFT: part C (commit), parts D, E, F, G; THE CHECKS; THE END-TO-END CHECK; THE INDEPENDENT REVIEW; THE COMPLETION REPORT
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a05e5c9594b077ec41fb3ffecc129ea98195eb70` (short `a05e5c9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T13:01:00Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40689208427
Two-step check: the reported commit equals BASE (a05e5c95) — current for BASE, the last landed commit. local-backend-proof.md for a05e5c95: `| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |` and "Repeat lane (DEC-283): Repeat: nothing to repeat" (turn K4 changed no spec file). Part G1 says "if turn K4's repeat lane did NOT run on its landing, STOP before this line": the lane's job ran and found nothing to repeat — the ruling on whether that counts as having run is asked below (Q2).
FILES:
docs/features/admin-shell.md
docs/features/e2e-harness.md
docs/governance/briefs/foundations-turn-c2.md
docs/governance/reports/foundations-turn-c2.stop-1.md
e2e/auth-signout.spec.ts
e2e/helpers/route-guard.ts
e2e/helpers/session.ts
roadmap.md
scripts/conformance/sign-out-landing-allowlist.txt
scripts/conformance/sign-out-landing.test.ts
src/components/app-shell.tsx
src/lib/sign-out-landing.ts
src/test/e2e-route-guard.test.ts

## The conflict (Q1)

The brief, Part C2: "one state per piece reported to the E2E build (`__ethioHomeAhead` stays for the landing; name the menu's)". The menu's new window instrument (`__ethioMenuAhead`, written by app-shell.tsx, gated on `isE2E`) fails HOOK-1 (src/lib/env-flags.test.ts :21–:48, INC-621): "The census below names every hook the app code holds; each file that holds one takes the flag. A new hook fails here until it is listed and gated." The run:

```
- Expected
+ Received
-   "src/components/app-shell.tsx: __ethioClientOff, __ethioHomeAhead, __ethioQueryClient, __ethioSupabase",
+   "src/components/app-shell.tsx: __ethioClientOff, __ethioHomeAhead, __ethioMenuAhead, __ethioQueryClient, __ethioSupabase",
```

src/lib/env-flags.test.ts is not in the brief's SCOPE nor in the standing allowance. Rule: .claude/rules/00-executor-protocol.md, "A file the task needs and the brief did not name is a STOP naming the file and why"; the brief's HOW TO WORK: "A STOP is only: … a needed file outside SCOPE". Writing the state without a new `__ethio…` name (or the name built so the census cannot see it) would work around the census, so I did neither.

Proposed ruling: add `src/lib/env-flags.test.ts` to SCOPE for one change — HOOK-1's app-shell line becomes `"src/components/app-shell.tsx: __ethioClientOff, __ethioHomeAhead, __ethioMenuAhead, __ethioQueryClient, __ethioSupabase",` (nothing else in that file).

## Part C as written (held, not committed)

C1 — the census of concern 2, at a05e5c95:
- app-header.tsx :204–:249 — the header's account menu (`data-testid="account-menu"`) is a `DropdownMenu` drawn whenever the visitor is signed in, on every width; its `account-menu-sign-out` item (:241–:247) is the phone's only Sign out (the desktop also has the rail's foot).
- `DropdownMenu` is a facade over overlay-facade.tsx's `OverlayRoot`; its real menu is the Radix code in overlays-impl.ts (`menu` = dropdown-menu-impl), fetched through overlay-loader.ts `loadOverlays()` (:27, `loadOnce`) on the trigger's first hover, focus or press (overlay-facade.tsx :125–:143), or by `warmOverlaysWhenIdle()` (overlay-loader.ts :63–:76), which each facade calls on mount (overlay-facade.tsx :117 and :445): once per visit, after the page's `load` event and then the browser's idle callback (timeout 4 s), its failure swallowed (`.catch(() => undefined)`).
- Why SO-13's phone leg opened the menu online: nothing tells the shell (or a test) that the warm-up has arrived — it is scheduled for "idle", reports no state, and runs for every visitor, not as part of the sign-out path's fetch-ahead; the first opening is the only point at which the code is known to be on the device. So the test opened the menu once online (e2e/auth-signout.spec.ts :303–:309 at a05e5c95), and a person who had not done so could not open the menu offline (INC-960).

C2/C3 as written (the diff is held in the session; on `continue` it is re-applied unchanged, plus the HOOK-1 line):
- src/lib/sign-out-landing.ts — `createHomeAhead(pieces, report)`: a list of `AheadPiece { what, flag, load }`; each piece's fetch starts once for a signed-in visitor while online, its failure logged (`[home-ahead] <what> did not download: <errorText>`) and never retried, `state(piece)` and `report(piece, state)` per piece; the doc comment names INC-960.
- src/components/app-shell.tsx — two pieces: the Home page's code (`router.loadRouteChunk(router.routesById[SIGN_OUT_LANDING])`, `__ethioHomeAhead`) and the account menu's (`loadOverlays`, `__ethioMenuAhead`); overlay-loader.ts is already in every page's first download (overlay-facade's closure), so the import adds nothing to it.
- src/lib/sign-out-landing.test.ts — HA-1…4 re-pointed to the list form (their mocks change shape: one piece in a list; assertions unchanged); SAH-1…5 new.
- e2e/auth-signout.spec.ts SO-13 — the phone leg's online opening removed; the test polls `__ethioMenuAhead` to "ready" first (its comment says why).
- The run: `bunx vitest run src/lib src/components scripts/conformance` → `Tests  1 failed | 473 passed (474)`; the one red is HOOK-1 above.

## Q2 — G1's condition

local-backend-proof.md for turn K4's landing (a05e5c95) shows the repeat lane as "not run … Repeat: nothing to repeat": the lane's selection ran and found no changed spec, so no browser test was repeated. Does that satisfy G1's "turn K4's repeat lane … run on its landing", or is G1 a STOP until a landing with a changed spec shows the lane repeating one (this turn's own landing would be the first)?

## Noted for the report (no ruling needed)

- Concern 1's grep found two landings the brief did not list, both outside SCOPE: src/routes/settings.tsx :143 (`SettingsScreen`, the U0j live guard) and src/routes/admin.tsx :69 (`AdminGate`). Each holds a line in scripts/conformance/sign-out-landing-allowlist.txt (`<file> <function> | reason | 2026-12-31`), reported under K2.
- CF-SOL-1 red first on a05e5c95's app-shell.tsx: five findings — :136 `routesById["/"]`, :681 and :688 `location.replace("/")`, :705 and :807 `{ to: "/", replace: true }`.
- ERRT-7 already exists (src/lib/error-text.test.ts :128); Part D's planted test takes the next free id.
- Part B's bundle: `JS: 205.7 KiB / 207 KiB — ok`; no page's first download differs from a05e5c95's (diff of the two check-bundle-size outputs: empty).
