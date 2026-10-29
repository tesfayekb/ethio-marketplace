# Foundations turn CI-2 — report

## CI line

The newest completed run on ci-evidence is `a7c3639c`: **FAILURE**. Only the first-paint budget job was red, which is INC-997, fixed in CI-1. The run on `f9569298` had not landed when I read it, so this turn applied R4 straight away, before CI had judged `f9569298`.

## Step 0

`docs/governance/briefs/foundations-turn-ci-2.md` holds the text inside one fenced block. Its sha256 was read back from the saved file:
`caea75e35a5bbe9be6307609f5f2254127bbd6618c5fb15cb925799b123478f8`. This equals the ruling's value.

Limit: no tool here reads a chat message from a script. The text was written out through the file tool as received, and the hash read back from the saved file proves it is byte-identical.

Roadmap line 3 names the brief. Three lines were added: INC-997 (closed), INC-998 (closed this turn), and the D239 session-gated loading note (open, not built).

## Rulings

- **CI first and R4 (NEAR): done.**
  - CI-1's six raises were rewritten as "measured (cause); was …". No `);/` join is left.
  - Eleven pages sat within 0.3 KiB of their lines on a local build of `f9569298`. Each was raised by 1 KiB, with the cause D239/CI-1 (the root language provider's account rule, tab-follow listener and on-demand loader, on every page):

    | Page | Measured | New line |
    |---|---|---|
    | / | 219.9 | 221 |
    | /account_/legal_/$versionId | 209.7 | 211 |
    | /admin/coverage | 329.7 | 331 |
    | /admin/impersonation_/$sessionId | 307.9 | 309 |
    | /admin/legal | 276.9 | 278 |
    | /admin/roles_/$roleId | 306.8 | 308 |
    | /admin/screening | 378.8 | 380 |
    | /admin/users | 303.8 | 305 |
    | /c/$slug | 219.9 | 221 |
    | /dev/tall | 206.7 | 208 |
    | /legal/accept | 217.9 | 219 |

  - Limit: no page grew against `f9569298`. The D239 share of each page's growth is inferred (the provider is on every page), not measured page by page. CI-1 measured +0.4 to +0.7 KiB on the pages it built.
  - After the raises, the NEAR band holds 0 pages.

- **R1: done.**
  - The build runs inside the script. Typecheck is read from `/tmp/observability/build-errors.log`, as in R1. It is PASS only when the log is newer than every file under src/, e2e/ and scripts/ that git tracks, or untracked and not ignored, and its last entry is "build OK".
  - A missing or older log gives NOT RUN. TCK-3 proves this.

- **R2: done.** Steps run in ci.yml's order and the run never stops at a FAIL. Inside a job, a failed step makes that job's later steps NOT RUN, as CI does.
  - I ran the script whole three times. The last run came after the last code change.
  - After that run only the report and the roadmap ticks were written, and both were format-checked on their own afterwards.

- **R3: done.**
  - The script runs ci.yml's own step text, so the actionlint 1.7.7 and gitleaks 8.24.3 versions and SHA-256 sums come from ci.yml itself. Semgrep 1.179.0 and its rules commit come from ci.yml too; their install and fetch are pinned by version and commit, with no checksum in ci.yml.
  - Downloads are cached under `~/.cache/ethio-checks` (outside the repository). Semgrep installs into a venv there.
  - A failed fetch or checksum gives NOT RUN, and there is no unpinned stand-in. TCK-3 proves this.
  - The secrets scan has one local form. The sandbox's origin/main is far behind (no fetch here), so CI's `origin/main..HEAD` would walk thousands of old commits. The local walk is `<base>..HEAD`, with the base read from this brief's "Base: dev", plus the work not yet committed (`gitleaks git --pre-commit`). Result: 21 commits scanned, no leaks; uncommitted work, no leaks.

- **R5: done.** The unit step runs `bun run test:unit` itself.

- **R6: done.**
  - TCK-1…5 are in `scripts/ci/turn-checks.test.ts`, all green. The ids were grep-checked free.
  - TCK-1 shows a planted new job joining the plan, and a planted `uses:` step needing a line.
  - TCK-2 proves stale, expired and reasonless allowlist lines are refused.
  - The allowlist is `scripts/ci/turn-checks-allowlist.txt` (9 reasoned lines).
  - The guard is wired: package.json `"checks": "bash scripts/ci/turn-checks.sh"`, and wired.test.ts is green.

- **R7: done.** AGENTS.md has the one line as ruled, 20 bytes shorter than the line it replaced. The AGL allowance key was moved to the new byte count, 10200.
  - `docs/features/ci-status-reporter.md` has a new section, "Before the push: `bun run checks`".
  - Register row 75 is "A CI check runs before the push" → `scripts/ci/turn-checks.sh` → TCK-1.

- **INC-995 follow-up: done.**
  - The new mechanism is `useSectionNotice()` and `<SectionNotice>` (`src/components/ui/section-notice.tsx`, over ActionMessage).
  - PhotoReviews, PhotoChanges and NameChecks now use it. Their test ids and behaviour are unchanged.
  - SNC-3 refuses a section that holds `tone` state of its own. It is green on src/, and the planted CI-1 shape is caught at exactly its line.
  - Register row 76.

- **INC-998: done, fixed at the root.** There is no worker-count change.
  - **NH-1/2/3.** The tests pass New York's rule written out (`EST5EDT,M3.2.0,M11.1.0`) through `NIGHTLY_ZONE`. CI keeps the named zone. NH-6 drops the rule and still proves the missing-zone refusal.
  - **LL-1.** It parsed every .tsx file. It now reads each file's text and parses only the files that hold both `bg-card` and `border-border`.
  - **EXH-4/5/7/21.** Each command is judged by a real `bun` process: about 30–60 per test, as Claude Code runs the hook. The hook is the executor kit's pinned file, so it is not split into an importable function here. The suite states `HOOK_PROCESS_MS` = 60 s, with that cause in its comment.

## The script

```
checks: 34 PASS · 0 FAIL · 21 NOT RUN · 649s
```

That is 649 s measured, about 11 minutes. The unit suite took 343 s and the semgrep scan about 176 s. The build took 13 s here, because the Vite cache was warm.

The 21 NOT RUN steps are the allowlist's lines (installs, SARIF upload and its warning, dependency audit, staging preflight, E2E merge, promote), each printed with its reason.

## Counts

- **Unit:** whole suite in this sandbox, through the script: **2,216 passed of 2,216**, in 368 files.
- **E2E:** `e2e/i18n-coverage.spec.ts` whole, both projects, 0 retries: **11 passed, 3 skipped** (the file's existing phone-only skips), 0 failed.

## K2

1. The local origin/main is far behind, so a scan of CI's own range over that history reported a nonzero leak count across old history. The count stays in the local log and is not repeated here (Knowledge: scanner output, counts only). CI's real range is origin/main..HEAD; this needs checking against `.gitleaksignore` in the records turn.
2. The executor-kit bash guard can be tested only through a process per command. An exported `judge()` would let EXH run in-process, but that is a kit change.
3. Each NEAR raise rests on D239's growth being on every page; there was no per-page measurement for the eleven pages.
4. `e2e:local` needs `E2E_CHROMIUM_PATH` in this sandbox (the resolved browser path is absent). The script does not run E2E.
5. D239's account rule weighs every page for signed-out visitors (roadmap, not built).

## Files (`git diff --name-only f9569298`)

- AGENTS.md
- docs/\_changelog.md
- docs/features/ci-status-reporter.md
- docs/generated/i18n-usage.json
- docs/governance/briefs/foundations-turn-ci-2.md
- docs/governance/mechanisms.md
- docs/governance/reports/foundations-turn-ci-2.report.md
- package.json
- public/i18n-usage.json
- roadmap.md
- scripts/ci/nightly-hour.sh
- scripts/ci/nightly-hour.test.ts
- scripts/ci/turn-checks-allowlist.txt
- scripts/ci/turn-checks.sh
- scripts/ci/turn-checks.test.ts
- scripts/ci/turn-checks.ts
- scripts/conformance/agents-lines-allowlist.txt
- scripts/conformance/allowlist-keys-allowlist.txt
- scripts/conformance/executor-hooks.test.ts
- scripts/conformance/section-notices.test.ts
- scripts/route-budgets.mjs
- src/components/ui/section-notice.tsx
- src/features/admin-screening/name-checks.tsx
- src/features/admin-screening/photo-changes.tsx
- src/features/admin-screening/photo-reviews.tsx
- src/look-law.test.ts
