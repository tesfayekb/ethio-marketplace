# Flake ledger (DEC-030 — auto-appended by scripts/e2e-failure-report.ts)

One line per test that FAILED then PASSED on retry. Law (docs/features/ci-guards.md):
a test flaky 3× in 7 days gets an INC and root-cause work — retries are evidence,
not concealment.

Format: `- <date> · \`<project>\` · <title> · source \`<lane>\` · run <url> · commit \`<sha>\` · <first error line>`

<!-- entries below; append-only, written by CI with [skip ci] -->
- 2026-09-01 · `desktop-1280` · admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key · source `shard 3` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/33540115350 · commit `36bc9b75a2795b21fdcb4db578881e0c25791778` · Test timeout of 120000ms exceeded.
- 2026-09-01 · `desktop-1280` · admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded · source `changed` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/33543828406 · commit `6f6ddf5c9ee2d6f2684c0efa7a16199ca0b4e36b` · Error: the sync never marked the absent key orphaned
- 2026-09-01 · `mobile-360` · admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status · source `shard 1` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/33548811882 · commit `45e4567ddb5b09f2e6f10dbf095954ce911a5b51` · Error: expect(locator).toHaveText(expected) failed
- 2026-09-01 · `desktop-1280` · admin-roles.spec.ts › U2 roles console › RP-10 members link preselects the role filter via the URL · source `shard 3` · run https://github.com/tesfayekb/ethio-marketplace/actions/runs/33548811882 · commit `45e4567ddb5b09f2e6f10dbf095954ce911a5b51` · Error: expect(locator).toHaveText(expected) failed
