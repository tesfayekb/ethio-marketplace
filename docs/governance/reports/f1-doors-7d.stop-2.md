QUESTION — f1-doors-7d STEP 5: the session's end reads `notSignedIn` on every page, so `refusal` and `door-codes` join the entry's closure (DEC-362), whose list lives in `scripts/route-budgets.mjs`, outside the scope
DONE: STEPS 0–4 (ruling 1: STEP 2 `8e70f9a4f`, STEP 3 `ef58d8bce`, STEP 4 `bddc1ae94`, and `141c75fa6` the query client in its own module); STEP 5 up to the first-download check
LEFT: STEP 5 from the first-download check (then `bun run checks`, e2e by `--grep`, check-go, the self-review), STEPS 6–7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `bfe3a2033427669029922375897ff8c2a4cb0437` (short `bfe3a20`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T13:24:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44743267054
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/f1-doors-7d-ruling-1.md
docs/governance/briefs/f1-doors-7d.md
docs/governance/reports/f1-doors-7d.census.md
docs/governance/reports/f1-doors-7d.stop-1.md
docs/governance/reports/f1-doors-7d.stop-2.md
e2e/auth-signout.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/refusal-readers-allowlist.txt
scripts/conformance/refusal-readers.test.ts
scripts/conformance/refusal-readers.ts
src/components/app-shell.tsx
src/features/admin/impersonation/use-impersonation.test.tsx
src/features/admin/impersonation/use-impersonation.ts
src/features/auth/auth-client.test.ts
src/features/auth/session-end.test.ts
src/features/auth/session-end.ts
src/features/auth/session-query-client.ts
src/features/auth/sign-out.ts
src/features/auth/use-auth.ts
src/lib/reader-failure.test.ts
src/lib/reader-failure.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/router.test.ts
src/router.tsx
src/routes/api/attributes.$id.options.ts
src/routes/api/attributes.options.test.ts
src/routes/api/feed.test.ts
src/routes/api/feed.ts
src/routes/api/public/jobs.test.ts
src/routes/api/seller.test.ts
src/routes/api/seller.ts
src/routes/api/translate.route.test.ts
src/routes/api/translate.ts
src/server/answer.test.ts
src/server/answer.ts
src/server/function-refusal.test.ts
src/server/function-refusal.ts
src/server/imports/route.test.ts
src/server/imports/route.ts
src/server/jobs/route.ts
src/server/seller-page.ts

## What the check says

`bun run build && node scripts/check-bundle-size.mjs` on `141c75fa6` fails DEC-362's closure law:

```
Bundle budget: the first-paint closure of index-BYWEvKHd.js no longer matches ENTRY_CLOSURE (scripts/route-budgets.mjs, DEC-362):
  door-codes: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (a chunk joined the first download, DEC-362)
  refusal: 1 in the entry's closure, ENTRY_CLOSURE lists 0 (a chunk joined the first download, DEC-362)
```

The cause: the brief's (b) ends the session on "any reader or door answering 401 or `notSignedIn`".
`endsSession` (src/features/auth/session-end.ts) reads the code through `splitRefusal`
(src/lib/refusal.ts, which imports src/lib/door-codes.ts), and the shell (app-shell.tsx) and the
query client (router.tsx) call it on every page. The status alone does not do: a feature reader
that calls the client's `.rpc()` or `.from()` gets an error with no HTTP status, so `notSignedIn`
is known by its code only. CF-REFUSAL-1 forbids reading that code by hand, and `refusal-split.ts`
is L21's file.

The first build also showed `query` and `mutation` joining. That was mine: `session-end.ts`, which a
lazy poll also imports, built the query client. The client moved to
`src/features/auth/session-query-client.ts`, which only the router imports (`141c75fa6`), and those
two chunks left.

## The measured choices (local builds, gzipped KiB, scratch copies under /tmp/ethio-scratch/f1-doors-7d/opt1 and opt2)

Both builds pass `check-bundle-size.mjs` once `scripts/route-budgets.mjs` carries the change. The
entry's JS is 200.8 at base, 203.0 under (1) and 202.5 under (2). index.js grows +0.4 in both (the
session's end itself).

1. `ENTRY_CLOSURE` gains two lines: `refusal` (1.1) and `door-codes` (0.5) become first-download
   chunks. Every page grows +1.0 to +1.3 where it already carried `refusal`, and +2.1 to +2.2
   elsewhere.
2. `SHARED_SHELL_MODULES` gains `src/lib/refusal.ts` and `src/lib/door-codes.ts`. DEC-362's own
   rule covers them: "the repository's own modules every page needs and a lazy chunk also imports".
   `shared-shell.js` grows 29.2 → 30.4, and `ENTRY_CLOSURE` is unchanged. Every page grows +0.5 to
   +0.7 where it already carried `refusal`, and +1.6 to +1.7 elsewhere. When L21 moves
   `splitRefusal` into `src/lib/refusal-split.ts`, the line would follow it.

No page crosses its ceiling or sits within the 0.3 KiB band under either choice. The least room is
`/admin/monetisation`: 1.3 under (1), 1.9 under (2), 2.6 at base. No ceiling moves.

## The questions

A. May this turn change `scripts/route-budgets.mjs`, and by which choice: (1) `ENTRY_CLOSURE`, or
   (2) `SHARED_SHELL_MODULES`? (2) costs about 0.5 KiB less on every page.

B. Ruling 1 asks for allowlist lines `until L21` and `until L22`. `scripts/conformance/kit.ts`
   `readAllowlist` accepts only a date or `INC-`/`DEC-<n>` as `until` and throws "invalid until"
   otherwise. `scripts/conformance/refusal-readers-allowlist.txt` therefore holds 14 lines
   `until INC-1189` (13 in L21's files, and `legal-version-view.tsx:160`), each reason naming the turn
   that removes it (L21, or L22 for the legal screen). Is that form accepted, or should the kit's
   grammar take a turn name (`kit.ts` is outside the scope)?
