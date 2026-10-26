STOP — turn 34 ruling 2, R2-2: the scope guard cannot see the ruling's new files
DONE: ruling 2 saved (a5f1732; sha256 6f55ba63c9078f5ef9fd52f4518996fe12ceac1218775a413ca8f7efe61f18d0, 32926 bytes — equal to the ruling's); R2-1 (red first, nothing committed)
LEFT: R2-2 … R2-9
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `b58aa884d55ef784bd5ba574cdfac7f0765b5b32` (short `b58aa88`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T05:55:07Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40275257775
FILES:
AGENTS.md
docs/_changelog.md
docs/features/ci-guards.md
docs/features/performance-strategy.md
docs/features/route-client.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-34-ruling-2.md
docs/governance/briefs/foundations-turn-34.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-34.stop-1.md
docs/governance/reports/foundations-turn-34.stop-2.md
docs/governance/reports/foundations-turn-34.stop-3.md
e2e/supabase-door.spec.ts
public/i18n-usage.json
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/conformance/route-client-allowlist.txt
scripts/conformance/vendor-seams-allowlist.txt
scripts/conformance/vendor-seams-scan.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/app-shell.tsx
src/components/shell/place-carry-service.ts
src/features/ad-page/contact.test.ts
src/features/ad-page/contact.ts
src/features/ad-page/count-view.test.ts
src/features/ad-page/report.test.ts
src/features/ad-page/report.ts
src/features/ad-page/save.test.ts
src/features/ad-page/save.ts
src/features/admin/impersonation/impersonation-service.ts
src/features/admin/nav-alerts.ts
src/features/auth/auth-service.ts
src/features/auth/use-auth.ts
src/features/legal/legal-reader.test.ts
src/features/legal/legal-reader.ts
src/features/legal/use-legal-gate.test.tsx
src/features/legal/use-legal-gate.ts
src/features/permissions/service.ts
src/features/posting/attribute-options.test.ts
src/features/posting/use-price-unit-labels.ts
src/i18n/bundle.ts
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/lib/env-flags.test.ts
src/lib/route-client.test.ts
src/lib/route-client.ts
src/lib/session-bearer.ts
src/lib/signed-in-route.test.ts
src/lib/signed-in-route.ts
src/lib/supabase-door.test.ts
src/lib/supabase-door.ts
src/routes/auth.tsx
src/routes/legal.publishing.tsx
src/routes/settings.tsx
src/start.ts

## The conflict

Ruling 2 §1 widens SCOPE in prose ("SCOPE gains those files and these new or touched ones: src/client.tsx,
src/lib/hydrate-when-placed.ts, …"). The executor's tooling reads SCOPE from one place only: the
`SCOPE-BEGIN … SCOPE-END` block of the brief that roadmap.md line 3 names (.claude/hooks/lib.ts `readScope`,
:168-:179). Line 3 names docs/governance/briefs/foundations-turn-34.md, whose block is the brief's, and the
ruling has no block of its own (turn 32b's ruling, docs/governance/briefs/foundations-turn-32b-r1.md :5-:14,
carried BASE, FLAGS and its own SCOPE block and became the brief in force). I asked the guard's own decision,
`scopeVerdict` (lib.ts :626), from a read-only scratch script, for every file the ruling names:

```
REFUSED src/client.tsx
REFUSED src/lib/hydrate-when-placed.ts
REFUSED src/lib/hydrate-when-placed.test.ts
REFUSED src/features/auth/auth-client.test.ts
REFUSED src/lib/session-bearer.test.ts
REFUSED src/i18n/server-shell-language.test.ts
REFUSED scripts/conformance/vendor-seams.test.ts
OK      src/features/auth/auth-service.ts (SCOPE src/features/auth/auth-service.ts)
OK      src/routes/auth.tsx (SCOPE src/routes/auth.tsx)
OK      src/routes/settings.tsx (SCOPE src/routes/settings.tsx)
OK      src/lib/supabase-door.ts (SCOPE src/lib/supabase-door.ts)
OK      src/lib/supabase-door.test.ts (SCOPE src/lib/supabase-door.test.ts)
OK      e2e/supabase-door.spec.ts (SCOPE e2e/supabase-door.spec.ts)
OK      scripts/check-marketplace-imports.mjs (SCOPE scripts/check-marketplace-imports.mjs)
OK      scripts/conformance/vendor-seams-scan.ts (SCOPE scripts/conformance/vendor-seams-scan.ts)
OK      src/features/legal/use-legal-gate.test.tsx (SCOPE src/features/legal/use-legal-gate.test.tsx)
OK      docs/features/e2e-harness.md (standing allowance docs/features/**)
```

R2-2 writes two of the refused files (BLOCKS A and C), and R2-3, R2-5, R2-6 and R2-7 each write one more.
land.ts checks the whole landed diff against the same SCOPE (land.ts :150-:158, "3. Scope of the whole landing"), so even a file the editing
guard let through could not land. 00-executor-protocol.md: "Do not work around a refusal (no shell
redirection, no `git apply`, no inline scripts)"; the brief in force is never edited after STEP 0, and
ruling 1 said "change nothing in it". So no file outside the brief's block was written; nothing was attempted
past R2-1.

## R2-1 — red first (on b58aa884's code + the saved ruling; nothing committed)

BLOCK D was written as e2e/supabase-door.spec.ts (sha256
`819ed1bf556c42369090fc97b8e6b5eac57442e3db56c761ec29502936da67c4`, 8368 bytes — the ruling's), each run once,
both projects, 2 workers, fake mode, 0 retries, `[ssr-error]` 0 in both server logs:

- `bun run e2e:local -- e2e/supabase-door.spec.ts`: `2 failed`, `6 passed (52.9s)` — the two reds are SBE-4 on
  both projects, as expected (`locator('p[role="alert"]').filter({ hasText: 'Something went wrong. Please try
  again.' })` — `element(s) not found` within 10 s: the screen stays busy and says nothing); SBE-1 (with its
  two corrections), SBE-2 and SBE-3 passed on both projects (SBE-3 is timing-dependent; recorded, as the
  ruling says).
- `bun run e2e:local -- e2e/ad-page.spec.ts --grep "AP-54 "`: `1 failed`, `1 passed (15.7s)` — AP-54 red on
  mobile-360 (`ad-page.spec.ts:1708`), green on desktop-1280.

The spec was then put back to its landed text (`git restore --source=HEAD`, sha256
`63e1fad154a78285651ef6f016aec6b4fdcc502725759919b0d6940be6aaa008`), since a spec file not fully green is not
committed; the tree is clean.

## CI on the stop-2 landing

Run 40275257775 on b58aa884 (the door's code as the brief wrote it) completed SUCCESS (the two-step read: the
reported commit is b58aa884, the conclusion SUCCESS): e2e-last-failure.md "last E2E run 40275257775 passed",
flaky 0. On CI's temporary backend AP-54, PP-21 and every sign-in, sign-up, callback and session test passed
that run; the local staging runs above still show AP-54's race (INC-913), which ruling 2 explains.

## The question

A ruling that the tooling can read: for example ruling 2's SCOPE as a `SCOPE-BEGIN … SCOPE-END` block (with
BASE and FLAGS lines) in a brief file that roadmap.md line 3 then names — as turn 32b's ruling 1 did — or any
other form the supervisor chooses. With it, I continue from R2-2 exactly as ruling 2 orders (R2-1's counts
above stand; the code they ran on is unchanged).
