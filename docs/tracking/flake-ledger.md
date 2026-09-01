# Flake ledger (DEC-030 — auto-appended by scripts/e2e-failure-report.ts)

One line per test that FAILED then PASSED on retry. Law (docs/features/ci-guards.md):
a test flaky 3× in 7 days gets an INC and root-cause work — retries are evidence,
not concealment.

Format: `- <date> · \`<project>\` · <title> · source \`<lane>\` · run <url> · commit \`<sha>\` · <first error line>`

<!-- entries below; append-only, written by CI with [skip ci] -->
