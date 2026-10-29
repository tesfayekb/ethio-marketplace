# Foundations turn L-1 — report (L-1 and its continuation, L-1b)

**CI line.** Newest completed run 40914761197 on `fb0fa384` (the mid-turn push, PLATFORM-ORIGIN): **FAILURE** — fixture missing, i18n map stale, first-paint budget. All three fixed below; this push's own CI not yet read.

**Step 0.** `docs/governance/briefs/foundations-turn-l-1.md` sha256 `bc1fde080afabda57c71da5e9681ac1ef7491737dd84e1b5de20e82e1d095bce` (verified at fb0fa384). `docs/governance/briefs/foundations-turn-l-1b.md` sha256 of the saved block `ace907a679c4c1c3eae89a27bd270824958b17fba656e9b2ad5e0a7c93c85025` — matches. Roadmap line 3 names L-1b. `.lovable/plan.md` untouched.

## Items

| Item | State |
| --- | --- |
| A1 excerpt script, both outputs | done (L-1) |
| A2 SXC-1…4, shape-from-source sample | done; the sample was never committed: root `.gitignore` `*.log` hid it. Added `!scripts/ci/fixtures/*.log`; `git ls-files scripts/ci/fixtures` → `scripts/ci/fixtures/start-failure-cli.log`. SXC-1…4 4/4 pass. |
| A3 migration-proof fix | LEFT (operator) |
| B1–B4, B6 | done (L-1) |
| Ruling 1 (three e2e oracles) | accepted, unchanged |
| Ruling 2 (2099-12-31 → 2027-04-30) | done: 9 lines in `scripts/conformance/format-allowlist.txt` |
| Ruling 3 (CF-FMT-2) | accepted |
| Ruling 4 (Collator/DisplayNames) | not in this turn — opens L-2 |
| i18n maps | regenerated (619 files scanned), both committed |
| First-paint budget | measured: `legal-kinds.ts` (every page's gate rules) pulled format.ts onto pages that draw no date (`/auth_/reset`, `/admin/roles`, `/admin/translations`, `/admin/legal_/edit`). `legalDate`/`legalMoment` moved to `src/features/legal/legal-dates.ts` (INC-864 form) — those four fell back under. The other pages reach format.ts through code that draws a date or number (path traced per page from the built closure): 11 over-ceiling lines +1 KiB, and 12 NEAR lines +1 KiB, each with its cause in `scripts/route-budgets.mjs`. No unexplained growth. |
| B5 LF-E1 | done: `e2e/locale-format.spec.ts`, area `locale-format` in `scripts/e2e-select.ts`; `bun run e2e:local -- e2e/locale-format.spec.ts --retries=0` → **2 passed** (desktop-1280, mobile-360). First run failed on a locator (`main` matched 2), fixed to the `my-listing-first-posted` testid; not red-first against the old formatter. |
| e2e/i18n-coverage.spec.ts | `--retries=0` → **11 passed, 3 skipped** (both projects) |
| Unit suite | **2,233 passed / 2,233, 372 files** (in the final checks run). A prior run had 1 load timeout (AAN-1, 5 s), passed alone 2/2 and in the final run. |
| `bun run checks` | `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 926s` |

NOT RUN (21): the four sandbox installs; Semgrep's SARIF upload and its warning (GitHub only); dependency audit ×2 (advisory service unreachable); e2e preflight ×4 (staging parity via CI); e2e merge ×6 (CI artifacts); promote ×4 (CI only). Local browser runs used `E2E_CHROMIUM_PATH` pointing at the sandbox's installed Chromium 1194 (the resolved 1208 path was absent).

English strings changed: none. New strings: none. Migrations: none.

## K2
- Ruling 4's sites (DisplayNames ×6, collators) — L-2.
- `chart.tsx:225` bare `toLocaleString()` — allowlisted UI kit.

## Files (`git diff --name-only e65a78e7`)
```text
.github/workflows/local-backend-proof.yml
.gitignore
.lovable/plan.md
docs/_changelog.md
docs/features/i18n-runtime.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-l-1.md
docs/governance/briefs/foundations-turn-l-1b.md
docs/governance/mechanisms.md
e2e/locale-format.spec.ts
public/i18n-usage.json
roadmap.md
scripts/ci/fixtures/start-failure-cli.log
scripts/ci/start-failure-excerpt.mjs
scripts/ci/start-failure-excerpt.test.ts
scripts/conformance/format-allowlist.txt
scripts/conformance/format.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/shell/date-field.tsx
src/features/account/account-overview.tsx
src/features/ad-page/posted.ts
src/features/admin-ai/ai-calls.tsx
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-screening/job-line.tsx
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/audit/audit-page.tsx
src/features/admin/impersonation/impersonation-view.tsx
src/features/admin/legal/legal-page.tsx
src/features/admin/legal/legal-service.ts
src/features/admin/legal/legal-version-view.tsx
src/features/admin/legal/user-legal-card.tsx
src/features/admin/users/user-detail.tsx
src/features/admin/users/users-list.tsx
src/features/legal/legal-dates.ts
src/features/legal/legal-document-page.tsx
src/features/legal/legal-kinds.test.ts
src/features/legal/legal-kinds.ts
src/features/legal/my-legal-page.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/attribute-display.ts
src/features/posting/calling-codes.ts
src/features/posting/price-line.ts
src/features/posting/pricing-data.ts
src/features/posting/seller-line.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-who.tsx
src/lib/format-locale.ts
src/lib/format.test.ts
src/lib/format.ts
src/lib/locale.test.ts
src/lib/locale.ts
src/lib/relative-time.ts
src/routes/settings.tsx
docs/governance/reports/foundations-turn-l-1.report.md
```
