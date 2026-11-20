RULING — f1-doors-7d, stop 2: re-land on dev with L21, then one shared-shell line for the refusal cut. Base: cursor/f1-doors-7d 20f274cb8.

PREVENTION (G70)
- Class (the supervisor's, S697): two lanes built one shared mechanism at the same time, and each met the first-paint law (DEC-362) on its own. Lovable's L21 met it through `src/features/legal/legal-reader.ts`, which ships in `shared-shell`, and was ruled to leave that file alone (ACT-028). You met it through the session's end. Changed here: one turn, this one, carries the first-paint half of the refusal cut for both. In force now: a turn that adds a reader of a shared module to a first-paint module names the chunk in its plan, and the supervisor reads the closure before ruling.
- Class: the allowlist grammar (`scripts/conformance/kit.ts` `readAllowlist`: a date, `INC-<n>` or `DEC-<n>`) is the law, and a ruling's `until <turn>` must be written in it. Changed here: decision B.
Repository: decision A lands here. Cursor rules, Knowledge: not needed.

THE STATE OF DEV (the supervisor's read): Lovable's L21 merged into dev as `8df5d28db` (pull request #84). It moves `splitRefusal` and `RefusalParts` into `src/lib/refusal-split.ts`, re-exported by `src/lib/refusal.ts`, and folds 11 of the client parsers your allowlist names. It leaves `src/features/legal/legal-reader.ts` and `src/features/admin/legal/legal-version-view.tsx` as they were. Your pull request #83 now conflicts with dev, in the two usage maps only (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`), so it cannot be updated from GitHub.

THE RULINGS
1. RE-LAND (rule 00: a lane that needs dev re-lands on a fresh branch).
   - `git fetch origin && git switch -c cursor/f1-doors-7d-2 origin/dev`. Print the head; it must contain `8df5d28db`.
   - Copy every path the old lane changed, except the two usage maps: `git checkout origin/cursor/f1-doors-7d -- <path>` for each path of `git diff --name-only a21c95595 origin/cursor/f1-doors-7d`. This is a file copy, not a merge.
   - Regenerate the maps with `bun run i18n:usage`.
   - Save this ruling as `docs/governance/briefs/f1-doors-7d-ruling-2.md` (new), by scripted copy, checked by sha256.
   - Commit `f1-doors-7d: re-landed on dev with L21`, then push and open a NEW draft pull request into dev with the same title. The operator closes #83 unmerged. Your report names both pull requests.
   - If a copied path differs from dev in a way the old lane did not make (L21 changed it), STOP and name it. The supervisor read only the two maps as shared.
2. A — THE FIRST DOWNLOAD, choice (2) narrowed. `src/features/auth/session-end.ts` (new on the lane) and `src/features/legal/legal-reader.ts` import `splitRefusal` from `@/lib/refusal-split` directly, the small module with no imports. `SHARED_SHELL_MODULES` (`scripts/route-budgets.mjs`) gains ONE line for `src/lib/refusal-split.ts`, with its reason in G55's form: "the one reader's cut of a refusal (INC-1189): the session's end and the legal reader on every page, and the lazy screens". `ENTRY_CLOSURE` does not change.
   - Build and run the budget check. If `door-codes` or `refusal` still joins the entry's closure, name the importer chain, add that module's `SHARED_SHELL_MODULES` line by the same rule, and name it under §10.
   - Your report gives the first-download table before (dev `8df5d28db`) and after, chunk by chunk (DEC-355).
   - SCOPE widens by `src/features/legal/legal-reader.ts` with `src/features/legal/legal-reader.test.ts`, and by `scripts/route-budgets.mjs` (`SHARED_SHELL_MODULES` lines only). This closes ACT-028: `legal-reader.ts:101` (`split(":")[0]`) reads through `splitRefusal`, with one unit test.
3. B — THE ALLOWLIST FORM: `until INC-1189` is accepted, with the reason naming the turn that removes the line. On the re-landed tree, run CF-REFUSAL-1. Every line whose file L21 folded is stale and leaves. What stays:
   - `src/features/admin/legal/legal-version-view.tsx:160`: `until INC-1189`, reason "Lovable's L22 folds it".
   - `src/lib/door-error.ts` (`REASON_CODE`, the plain-token branch that L21's INC-1220 rule kept): fold it if `splitRefusal` plus the existing head pattern gives the same answers for every case in `src/lib/door-error.test.ts`, and name it under §10. Otherwise keep its line, `until INC-1189`, with the reason.
   - Any other line the census still needs, each with its reason.
4. The rest of STEP 5, then STEPS 6 and 7, as the brief says, on the new lane. Before the push, also run: SO-16 by id, and the L21 ids `RRD-1` to `RRD-8` by `bunx vitest run` on their files, so the copied session changes are proven beside L21.
5. SO-16's base result is recorded as you wrote it: green on the unchanged code in Chromium and WebKit; the cause unproven; the test stays as a guard.

RECORDS (word for word into §14)
ACT-028 — CLOSED in F1-7d: `src/lib/refusal-split.ts` joins `SHARED_SHELL_MODULES`; `legal-reader.ts` and the session's end read `splitRefusal` from it; the entry's closure unchanged ([the table's one line]).
