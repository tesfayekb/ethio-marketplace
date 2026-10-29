# Foundations turn A2 — stop 1 (the migration's scratch feature)

CI line read: run 40812371557, commit 5f2c5396, **FAILURE**. The only red was the Gitleaks secrets scan, which found no leaks and then failed on its own artifact upload. Fixed in this turn as INC-975 and INC-976, below.

## Done

- **INC-975 / INC-976 (CI).** `.github/workflows/ci.yml` secrets-scan: gitleaks-action@v3 is replaced by pinned gitleaks 8.24.3 (SHA-256 `9991e0b2…e29c`, from the release's checksums file).
  - The download runs through `scripts/ci/with-deadline.sh 120 2`.
  - The scan covers `origin/main..HEAD` with `--diff-merges=first-parent`, or the whole history when there is no main.
  - The exit code is the verdict. There is no artifact, and the log carries counts only.
  - The action takes no range of its own, so `GITLEAKS_ENABLE_UPLOAD_ARTIFACT` has nothing to set; the action is gone.
  - actionlint (`-shellcheck= -pyflakes=`) passes on every workflow, and CF-CID (ci-deadlines.test.ts) passes 2/2.
- **Proof (local, gitleaks 8.24.3, real ranges):**

  | Range | Old walk (`--no-merges --first-parent`) | New walk |
  | --- | --- | --- |
  | 10e4ec10^..5f2c5396 (the failed run's own range) | 0 commits | — |
  | 4819f7cc..5f2c5396 | — | 2 commits, no leaks |
  | c7bb093a..14045945 | 0 commits | 31 commits (`git rev-list --count` = 31), no leaks |

- **Finding:** history already on main, never scanned before, holds 39 generic-api-key hits in 16 places. The replay over 81bd4625..HEAD (6,617 commits) found them. All are key names, not secrets:
  - the `attribute_key`/`location_key` values in migrations 20260829…, 20260913… (two), 20260915… and 20260924… (two);
  - the changelog line 88;
  - two e2e-last-failure.md lines.

  They sit outside the new range. They are not ignored, and they are listed here for the record.
- INC-975, INC-976 and INC-977 are registered in docs/tracking/incidental-findings.md, after INC-974. The roadmap ticks the row-13 line ("— Foundations turn C2 (row 65)") and INC-952's line.

## The stop

The migration (`admin_list_ai_calls`, mark 20261029190000) failed on ethio-prod, and nothing was applied (function absent, mark absent; read back). Error, verbatim:

> ERROR: 23514: new row for relation "ai_features" violates check constraint "ai_features_feature_check"

`ai_features.feature` accepts only the seven features or `^e2e-[a-z0-9-]{1,40}$`. So ruling 7's `proof-a2-<uuid>` feature cannot exist, and the door hides `e2e-` features by design (as the spend door does). Options:

- **(a)** The proof's scratch rows use a real feature (`name_check`). Their times are chosen so that every assertion reads only them:
  - the keyset pages run over rows dated in the future, so they are newer than any real row;
  - the 89-day and 91-day rows are read through a cursor one microsecond after each row.

  It reads no real row's value, but a real row could share the cursor's microsecond.
- **(b)** The door's body moves to a service-only core `admin_list_ai_calls_core(…, p_hide_e2e boolean)`. The proof calls the core on an `e2e-a2-<hex>` feature, and the public door passes true. That is one more function, closed to the browser.
- **(c)** The constraint gains `^proof-[a-z0-9-]{1,40}$`. That widens a table rule for a proof, so I advise against it.

I recommend (b). The proof then owns every row it reads.

## Departure to rule on

There is no `users:view` permission. The resources are listed below, and the staff users console (admin_list_users / admin_get_user) gates on `profiles:view`. The door uses `profiles:view` for the name. I created no new permission.

Resources: account_panel, admin_panel, audit_logs, categories, countries, coverage, impersonation, legal, listings, locations, permissions, profiles, roles, services, translations, user_roles.

## Strings (G43)

Census of existing keys with the same meaning (reused, Knowledge B1):

| Key | English |
| --- | --- |
| admin.audit.col.time | Time |
| admin.ai.col.feature | Feature |
| admin.ai.days.all | All features (the feature filter) |
| admin.audit.system | System |
| admin.ai.days.empty | No AI calls in the last {days} days. (with 90) |
| prim.table.previous / prim.table.next | Previous / Next (the primitive's keyset mode) |
| common.retry | Retry |

New keys. They need Amharic from the ruling; none will land without it.

| Key | English |
| --- | --- |
| admin.ai.log.title | Recent AI calls |
| admin.ai.log.hint | The last 90 days, newest first. Prompts and answers are never kept. |
| admin.ai.log.loading | Loading the AI calls… |
| admin.ai.log.error | The AI calls could not be loaded. |
| admin.ai.log.col.model | Model |
| admin.ai.log.col.outcome | Outcome |
| admin.ai.log.col.latency | Time taken |
| admin.ai.log.col.person | Person |
| admin.ai.log.allOutcomes | All outcomes |
| admin.ai.log.latencyMs | {ms} ms |
| admin.ai.log.personHidden | Hidden |
| admin.ai.log.standIn | Stand-in |
| admin.ai.log.outcome.ok | Answered |
| admin.ai.log.outcome.featureOff | Switched off |
| admin.ai.log.outcome.budget | Over budget |
| admin.ai.log.outcome.unavailable | Unavailable |
| admin.ai.log.outcome.timeout | Timed out |
| admin.ai.log.outcome.providerError | Provider error |
| admin.ai.log.outcome.unusableAnswer | Unusable answer |

## Next, after the ruling

I write the migration on the ruled option and apply it on ethio-prod. Then I report "apply <fragment> → expect mark 20261029190000", the EXPLAIN (ANALYZE) and the read-back, and stop.

## Ruling continuation

Superseded by the final A2 report: core/door approved, applied 4a7e258a then append-only feature-only correction 175bb84e, exact EN/AM landed. Full unit suite passed; E2E blocked by staging parity, not another migration proof failure.
