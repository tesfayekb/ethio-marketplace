# Foundations turn N1b-3 — stop 2 (CI C1–C3 fixed; N1b-3b M2 applied)

## CI line

ci-evidence (raw, read 10:3xZ): ci-status.md names **`7a95706a` FAILURE** (run 40854479197, 10:21:00Z) — First-paint bundle budget, Lane 3, Lane 8 (and the merged E2E job that follows the lanes). e2e-last-failure: 2,023 passed, 0 failed; sources without results: shard 3, shard 8. This commit is not yet judged; the run on it judges C1–C3 and M2 together.

## C1 — first-paint budget

`scripts/route-budgets.mjs`, three lines only, each to the measured value rounded up to the next whole KiB, the cause in the comment (N1b-2c's three `post.seller.*` strings in the base locale; they stay in base because the owner's notice draws on the public ad page):
- `/account` 266 → **267** (measured 266.1)
- `/admin/attributes` 347 → **348** (347.1)
- `/admin/listings` 353 → **354** (353.1)

No other line moved.

## C2 — INC-991, DEC-284: the backend's ports below the ephemeral range

Block: **31320–31329**. Census of the block first: no listener or reference (the only `3132x` hits in the tree are inside hex hashes in reports). Census of every `5432x` reference: code and config below moved; history (briefs, handoffs, reports, spec ledger, incidental-findings, changelog, roadmap) is record and stays.

Moved in this one landing:
- `.github/workflows/local-backend-proof.yml` — config `[api] port 31321`, `[db] port 31322`, `shadow_port 31320`, `[inbucket] port 31324`; the status check and its evidence line `https://127.0.0.1:31321`; the failed-start port-holder line now lists both blocks (`:(3132|5432)[0-9]`); the DEC-284 comment above the reservation.
- `e2e/global-setup.ts`, `e2e/helpers/app-target.ts` — the local fence accepts only `https://127.0.0.1:31321`.
- `src/test/app-target.test.ts`, `src/features/session/session-policy.test.ts` — the same URL.
- `scripts/fixtures/outbound-calls-bad.txt` — the planted config's `[db] port` (31322; the self-test still refuses both exposures: `SELF_TEST=1 bun scripts/check-outbound-calls.ts` → "Outbound-calls self-test OK").
- `docs/features/e2e-harness.md`, `docs/features/ci-local-backend.md` (Inbucket row; new DEC-284 section).

Kept: the 34e reservation step (`net.ipv4.ip_local_reserved_ports=54320-54329`) and its CF-CID rule, until DEC-284's rule closes.
Guard: **CF-CID-3** (every `port`/`shadow_port` in the CI-local config is in 31320–31329, and there are four) and **CF-CID-4** (a planted 54320 is named), in `scripts/conformance/ci-deadlines.test.ts`.
Rule (frozen): over the next 20 completed CI runs, zero lanes lost to a bind failure on the backend's ports → KEEP; any such loss → a new INC and a revisit. Roadmap line added.
Limit: the ports the CLI does not bind here (studio, analytics, pooler, edge inspector, Inbucket SMTP/POP3) are disabled or excluded by `-x`; they were not given ports.

## C3 — INC-992: one mechanism for every lane step's failure

- Every step of the lane job now has an id (30 added; unique — SFE-1).
- The job's run shell is `bash scripts/ci/step-shell.sh {0}`: GitHub's own `bash --noprofile --norc -eo pipefail`, its output also kept in `$RUNNER_TEMP/step-logs/<step id>.log`. The two steps before the checkout say `shell: bash` (the file is not there yet).
- **"Name failed steps (INC-992)"**, `if: always()`, immediately before "Write lane evidence": `STEPS_JSON: ${{ toJSON(steps) }}` → `node scripts/ci/step-failures.mjs` appends, for each step whose outcome is not success/skipped, `Step <id>: outcome <outcome>` and its last 20 lines to `local-backend-failure.txt`, which "Write lane evidence" carries as "- Step failure:" and the merge publishes under "## Lane N" (redacted). Plain Node, no packages, so it runs when the install failed.
- INC-984's step-specific lines **stay**: they are the outbound-calls guard's own FAIL/S5 lines, more exact than a tail (LFE-1/2 unchanged and passing).
- Proof: **SFE-2** runs a planted failing script through the real run shell (exit 3 preserved; 30 lines + stderr), then the reporter over a steps fixture (one failure with a log, one action failure without, one success, one skipped): it names exactly the two failures, the first with its last 20 lines ending in the stderr line, the second "(no log kept by step …)". **SFE-3**: nothing failed writes nothing; unreadable STEPS_JSON says so.
- Limits: a `uses:` step keeps no log (named with outcome only); the steps after the naming step (evidence, uploads, disposal) are not named. Not live-proved until the run on this commit.
- `actionlint -shellcheck= -pyflakes=` on local-backend-proof.yml and ci.yml: clean.

## C4

No change; it follows from the lanes.

## M2 — applied on ethio-prod

**apply 2673141c → expect mark 20261030033000**

File `supabase/migrations/20261029104632_2673141c-b91c-4ec9-b8c7-208f895362cf.sql`, 18,738 B (estimate ~10 KB; the proof is the excess). Identical to the guarded scratch copy except the platform dropped the final newline.

R5 read: `admin_list_audit` filters by the action text it is given, and `admin_audit_facets` builds its action list from `audit_log` itself (`GROUP BY a.action`). No fixed list → no change; `name_check.cleared` appears in the filter once one is written.

Contents:
- Index `name_checks_imitates_since_idx (since, profile_id) WHERE state = 'imitates'` (no EXPLAIN assertion, per the migration-proofs rule).
- `name_check_queue_page(p_after_since, p_after_profile, p_limit, p_show_names, p_only uuid[] DEFAULT NULL)` — service-only SECURITY INVOKER core: `imitates` rows, `since` then `profile_id`, limit 1–100, cursor both-or-none; `name`, `checked_text`, `of` only when `p_show_names`; `name_hidden` always; `next` when the page is full.
- `admin_name_check_list(p_after_since, p_after_profile, p_limit DEFAULT 50)` — DEFINER door: `listings:view` before any read; `p_show_names = has_permission(profiles:view)` (R6).
- `admin_name_check_clear(p_profile, p_subject, p_text, p_reason DEFAULT NULL)` — `profiles:update` → `require_step_up_if_needed('profiles','update')` → capture `FOR UPDATE` (`imitates` and `checked_text = lower(btrim(p_text))`, else `{ok:false, reason:'stale'}` and nothing written) → `clean`, `since = now()` (M1's trigger nulls `imitates_of`) → `log_audit('name_check.cleared', 'profiles', id, {subject, text, old:{state, of}, new:{state}, reason})`.
- Closers in-file: core REVOKE from PUBLIC/anon/authenticated, service_role ALL; doors REVOKE PUBLIC/anon, EXECUTE authenticated, ALL service_role.

Proof (scratch `e2e-mig-n1b3m2-` users only; mutation and readback separate; sentinel rollback with a check that nothing survived):
- NCQ-9 core page: oldest first, keyset over three pages, end has no `next`; hidden mode nulls name/text/reason; a `clean` row is not listed; limit 101 and a half cursor refused.
- NCQ-10 deny: no `listings:view` → list refused; no `profiles:update` → Clear refused; state and audit unchanged.
- NCQ-11 step-up: `profiles:update` without a factor → P0009; nothing changed.
- NCQ-12 with a fresh scratch TOTP session: stale text → `stale`, nothing written; right text (case/space folded) → ok, `clean`, reason nulled, the other held row untouched, exactly one audit row with the exact meta; a second Clear → stale, still one audit row; `seller_public_alias` shows the cleared name and still hides the other.
- NCQ-13 ACLs and DEFINER/INVOKER headers.
- Limit: the door's allow path spans every row, so it is not run in the proof (the house form); N1b-3c's E2E proves it live.

Guard before the apply (scratch copy in the tree, removed after): first run named one proof statement (the rollback check's `auth.users` read lacked the `e2e-mig-` marker) → fixed by `AND email LIKE 'e2e-mig-%'` → **`Migration guard OK.`** After the apply, on the tree: **`Migration guard OK.`**

Prod readback: mark `20261030033000`; 3 functions; core not executable by authenticated; Clear executable by authenticated, not anon; index present; 0 held rows.
Linter: 2 new "signed-in users can execute SECURITY DEFINER" warnings — the two staff doors, gated inside (E7's form; WARN class, baseline-compared, non-failing); 234 earlier findings unchanged.

Allowlists: `scripts/public-surface-allowlist.txt` (both doors), `scripts/acceptance-doors-allowlist.txt` (`admin_name_check_clear … | staff`), `scripts/conformance/seller-names-allowlist.txt` (`name_check_queue_page`, SPA-10a found it).

Decision I made, for ruling: Clear's reason is optional (trimmed, ≤ 500, recorded null when empty). The brief names a reason in the audit but no minimum; say if it must be required.

## Checks

- Unit suite: **2,182 passed, 5 failed, 1 skipped** — NH-1/2/3 (sandbox time zone) and EXH-4/5 (5 s timeouts under full-suite load; both pass alone, with AAN-1). SFE-1…3, CF-CID-1…4, LFE-1/2, SPA-10a…c pass.
- `bun run i18n:usage`: 1,752 keys / 612 files; maps unchanged (no t() or file move under src/).
- eslint + prettier on every touched file: clean.
- No E2E run: no spec changed this stop.

## K2

- `e2e/global-setup.ts:416` and `e2e/helpers/app-target.ts:18-19` each spell the local URL; one constant would serve both (not changed; outside the brief's scope).

## Files

scripts/route-budgets.mjs · .github/workflows/local-backend-proof.yml · scripts/ci/step-shell.sh (new) · scripts/ci/step-failures.mjs (new) · scripts/ci/step-failures.test.ts (new) · scripts/conformance/ci-deadlines.test.ts · e2e/global-setup.ts · e2e/helpers/app-target.ts · src/test/app-target.test.ts · src/features/session/session-policy.test.ts · scripts/fixtures/outbound-calls-bad.txt · docs/features/e2e-harness.md · docs/features/ci-local-backend.md · docs/_changelog.md · roadmap.md · supabase/migrations/20261029104632_2673141c-b91c-4ec9-b8c7-208f895362cf.sql (new) · src/integrations/supabase/types.ts (regenerated) · scripts/public-surface-allowlist.txt · scripts/acceptance-doors-allowlist.txt · scripts/conformance/seller-names-allowlist.txt · this report.
