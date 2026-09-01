# Flake ledger (DEC-030 — auto-appended by scripts/e2e-failure-report.ts)

One line per test that FAILED then PASSED on retry. Law (docs/features/ci-guards.md):
a test flaky 3× in 7 days gets an INC and root-cause work — retries are evidence,
not concealment.

Format: `- <date> · \`<project>\` · <title> · source \`<lane>\` · run <url> · commit \`<sha>\` · <first error line>`

<!-- entries below; append-only, written by CI with [skip ci] -->
- 2026-09-01 · `desktop-1280` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key · source `shard 3` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/33540115350 · commit `36bc9b75a2795b21fdcb4db578881e0c25791778` · Test timeout of 120000ms exceeded.
