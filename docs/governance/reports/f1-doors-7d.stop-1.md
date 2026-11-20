STOP — f1-doors-7d STEP 1: the census; the cause of the 07:01:22 refresh is not provable from the code, and the one path in it that fits is the platform's storage adapter
DONE: STEP 0, STEP 1 (`docs/governance/reports/f1-doors-7d.census.md`)
LEFT: STEPS 2–7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a21c955953feb9efabb138a504a9691a491d96ce` (short `a21c955`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T12:12:33Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44730229750
FILES:
docs/governance/briefs/f1-doors-7d.md
docs/governance/reports/f1-doors-7d.census.md
roadmap.md

The brief: "If the cause is in the platform's adapter, STOP and say so. If the census cannot find it
from the code, STOP and say what would find it." Both apply (census, premises 1).

1. On a page whose session storage is plain `localStorage` (the published site, the E2E build), no
   code path in this tree sends a refresh token other than the stored session's 1.3 s after a sign-in
   that the client had already read back (`auth-service.ts:192-217`): auth-js refreshes only what it
   reads from storage, the app's two token-passing calls (`auth-service.ts:459`, `:473`) run only
   when the client holds no session, and a refused refresh keeps a stored session whose access token
   is valid (GoTrueClient.js:4224-4232).
2. In the preview frame the storage is the editor's broker
   (`src/integrations/supabase/previewAuthStorage.ts`, platform-generated, read only): `getItem`
   prefers the editor's copy over the local one (`:115-125`), `setItem` replaces the local copy with
   the editor's answer (`:130-134`), and its tombstone removes the local session with no SIGNED_OUT
   (`:116-118`). That is the one path that can hand auth-js an older session after a sign-in, and it
   explains every line of THE FACTS: one refresh with a revoked token, anon 401s, profile reads still
   carrying the new token after them, and polls that never stopped because no SIGNED_OUT reached
   `useAuth`.
3. What would find it: the Origin / Referer, User-Agent and IP of the 07:01:22.102Z refresh, the
   07:01:22.174Z 401s and the 07:00:56Z logout in ethio-prod's edge log (a preview host framed in
   `lovable.dev` → the broker; `ethio.com` → another browsing context, which IP and User-Agent name);
   or a reproduction in the preview with the network panel and the Local Storage key in view.

The questions:

- Q1 — the cause. Which reading does the supervisor rule: the broker (then (a) is not fixable in the
  app; the app's fix is (b) and (c), which end such a session once, cleanly, and let the next sign-in
  stick), or a log reading that names another context? A fix for a cause the census did not find is
  a STOP (TOLERANCES), so no (a) code is written until the ruling.
- Q2 — the global sign-out (`src/features/auth/sign-out.ts:23`, kept deliberately by U0j,
  `app-shell.tsx:664-666`) revokes every other surface's refresh token, which is INC-1218's
  precondition. Keep it, or rule a change (beyond (a)–(d))?
- Q3 — the plan and THE CUT (census, last section): the session's end, about nine source files; the
  server readers and the censuses, about twelve. Its DECIDE-AND-NAME choices: the mirror stays in
  `src/lib/reader-failure.ts`; the allowlist lines; `feed_page` / `seller_feed_page` read by
  `splitRefusal` with the function's name as the key and the code in the tail (no migration, premise
  5); the status census is CF-REFUSAL-2 (CF-STATUS-1 is taken); SO-14 (refused refresh) and SO-15
  (silent drop) as the browser tests, failing the refresh by a scratch account's own global logout
  and an expired `expires_at` in the page's stored session.
- Q4 — `src/features/admin/legal/legal-version-view.tsx:160`, a whole-message compare outside L21's
  files and this turn's scope: an allowlist line `until ACT-027`, or a scope ruling?
