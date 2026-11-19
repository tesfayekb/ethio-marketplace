# Records turn R17 — report
Base: dev 7e7630f90 · Final commit: 4deeb04bd (the last code/records commit) · Brief: docs/governance/briefs/records-turn-r17.md (sha256 9472417764ea84fb41388b814da8e64065790d15dbfc4383b0d8fe6e00fe9991)

## Step 2 — the brief's fenced text

sha256 of the fenced text in docs/governance/briefs/records-turn-r17.md (extracted by script, compared with the operator's value): `9472417764ea84fb41388b814da8e64065790d15dbfc4383b0d8fe6e00fe9991` — equal. `git rev-parse --short=9 HEAD` on `origin/dev` printed `7e7630f90`; `shasum -a 256 -c data-shas.txt` read OK on all 16 lines.

## The nine sha256 lines (r17_apply.py's output; `shasum -a 256 -c expected.txt` read OK on all nine, before and after the gate)

```
72d74614bf9fd7fa2961ce7111f633c3e0ad60339f082644d0060cead05afae4 docs/tracking/incidental-findings.md
82e14f505c033c1ee1c6da64fe33e05e991a0bb6fad52b37aa3133eddd3b2cc3 docs/spec/spec-ledger.md
e4976e05eb19eb30f4f155d57934f3890ed6d5ca34ba007b2a729bd91b2ac598 docs/governance/instructions-amendments.md
64ab5d819360bc9e725c01391a94caed95c6c2e68b7e8ca45547c3fac0ca7a99 docs/governance/system-state.md
6c06c911123d1016148eb8187894a6b7516484e8efd756c913fb9ac39c64894f docs/governance/handoffs/2026-11-19-f1-6-close-handover.md
58c6f3e13b691a2f792816d3c6bddded717599506ece7a8d7d4620e8b123635b docs/governance/mechanisms.md
ba9056e5ca7f4260af2ac50f31740813f6d133bcd0195ffb28c0aa7d69805289 docs/governance/lovable-knowledge.md
d219d2fbf5a0b35c30d2ad5f86e7ca77e8ad1387c8e80d78e468726e678955c5 roadmap.md
d5ae0e54f4b85d47bcb37eb8178b973225aa75b5f609152e28a2040431d4834b docs/_changelog.md
```

## The gate (rule 00 step 6)

```
checks (fast): 26 PASS · 0 FAIL · 401s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 35 PASS · 0 FAIL · 26 NOT RUN · 460s
```

NOT RUN (26 steps, each with the tool's own reason): scope — Lovable branch guard, Decide whether the lanes run, Index the code tree (they need the Actions API's artifacts, DEC-375 a); build-and-check — Workflow lint (the pinned actionlint is linux/x64, this machine is darwin/arm64); secrets-scan — Secrets scan (the pinned gitleaks is linux/x64; CI's Gitleaks job judged it, pass); dependency-audit — Install dependencies, Audit (the advisory service is not reachable from the sandbox; CI's job judged it, pass); e2e-preflight — four steps (staging credentials are never held; CI's job judged it, pass); e2e — six steps (the lanes' artifacts live on GitHub); promote — four steps (only CI promotes, DEC-020); semgrep — Upload SARIF and its warning (GitHub only); Install dependencies in build-and-check, component-tests and bundle-budget (already installed; no package change). Also run: `bunx prettier --check` over the nine record files — "All matched files use Prettier code style!"; `bunx vitest run scripts/conformance/briefs.test.ts` — 1 file, 16 tests passed.

## `git diff --name-only 7e7630f90` (eleven with this report)

```
docs/_changelog.md
docs/governance/briefs/records-turn-r17.md
docs/governance/handoffs/2026-11-19-f1-6-close-handover.md
docs/governance/instructions-amendments.md
docs/governance/lovable-knowledge.md
docs/governance/mechanisms.md
docs/governance/system-state.md
docs/spec/spec-ledger.md
docs/tracking/incidental-findings.md
roadmap.md
docs/governance/reports/records-turn-r17.report.md
```

No file under `src/`, `supabase/`, `e2e/`, `.github/` or `scripts/` changed. `docs/governance/handoffs/2026-11-19-f1-6-close-handover.md` is the one new record file (listed by `git status` as untracked before the commit, tracked by `4deeb04bd`).

## Pull request and CI

Pull request: https://github.com/tesfayekb/ethio-marketplace/pull/73 (base `dev`, title "Records turn R17"). Base CI before the turn: `7e7630f` SUCCESS (ci-status.md, run 44511211420). CI line for `4deeb04bd`: run https://github.com/tesfayekb/ethio-marketplace/actions/runs/44519232322 — every check passed (Build, typecheck, lint; Component tests; Gitleaks; Semgrep; Scope (docs-only push, DEC-365); the guards; CodeQL analyses); E2E lanes, the first-paint bundle budget and Promote to main skipped by the docs-only scope. No red, no re-run.

## FINDINGS

none. Checks after the apply: no duplicate `## INC-<n>` heading in docs/tracking/incidental-findings.md; INC-1174 → INC-1211 are 38 headings and the file ends `Numbering: next free INC-1212.`; `## S92` once in docs/spec/spec-ledger.md (line 5402) with its `NUMBERING after this block: next free DEC-408, INC-1212, S672, ACT-026, D323; the register's next row 171.`; DEC-393 → DEC-407 each appear in the block; 29 slips S643 → S671 in docs/governance/instructions-amendments.md. I read the supervisor's files for numbering, path and sha defects only by those counts, not line by line.

## K2

none — records only.
