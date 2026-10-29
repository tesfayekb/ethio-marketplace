# Foundations turn A2 — final report (parity blocked)

CI line read: `14045945395fa2040b7772b6b3aa0c1d9aa1156e` — **SUCCESS**, completed 2026-10-29T04:41:28Z, run 40816710648. All four raw ci-evidence files were read; no red remains in that completed run. This is not CI proof of this turn's latest changes.

## 1. Verdict

Implemented and applied on ethio-prod. **Not READY:** E2E stops at staging parity before executing tests. No browser success or visual verification is claimed. QueryState does not exist in this tree (register row 18 lists it as future); reused DataTable's loading/error/empty slots and ReaderError, with retry.

## 2. CI fixes

INC-975/976 accepted fixes remain: pinned SHA-checked gitleaks, bounded download, origin/main..HEAD including merge diffs, counts-only output, no artifact. Real-range evidence is in stop-1: 0 → 2 and 0 → 31 commits; no planted secret. CI closed-surface replacement is documented in ci-guards.md; DEC numbering awaits the records turn. The ruled pointer deletion now has its retrospective intentional-deletions manifest line. Future deletions require the same-turn line in AGENTS.md.

## 3. Applied migrations and correction

- apply `4a7e258a` → expect mark `20261029190000`.
- apply `175bb84e` → expect mark `20261029200000`.

Both marks read back on prod. The first successful SQL mistakenly filtered/returned internal tasks. It was not rewritten: the append-only correction drops/recreates the door and core with the ruled feature contract. Both applied files must travel to staging in order. First file: 8,536 bytes, SHA-256 `056c9f34111d4c0538da5f475e2506fa876d989204b6ba4bae04b74f4a2def3e`. Correction: 9,039 bytes, SHA-256 `49bb0766654c4d27b836e4fe3b9a0b3d0a713536b7bafea0a33143eb77da2890`.

## 4. Door and ACL

`admin_list_ai_calls(p_feature text, p_outcome text, p_before_at timestamptz, p_before_id uuid, p_limit integer DEFAULT 50)` returns JSON rows/next. Auth → services:view → input validation → read. Paired timestamp/id keyset; limit 1–100; feature/outcome filters; strict newer-than-90-days edge. SECURITY DEFINER, fixed search_path, PUBLIC/anon revoked, authenticated execute, service_role all. Private SECURITY INVOKER core has only owner execute. Read-back body MD5: door `1f18e0da99886c6d81f7c07171bd7007`, core `cb54d805e3f37a28d2ba02a7cd29eba4`. Existing D1 private cores are precedent; no private-core-specific census was found. Public-surface allowlist includes only the gated door.

## 5. Privacy and proofs

Existing profiles.display_name source, disclosed only with profiles:view; otherwise Hidden, null actor System. No actor UUID/hash/task/provider/units/prompt/answer in the corrected projection. Scratch e2e-a2-hex user, role, feature and five rows; rolled back via sentinel. ACL/deny, keyset disjoint pages, feature/outcome filter, 89-day inclusion and exact 90-day exclusion, hidden/system/name projection and scratch exclusion passed in the successful migration. Scratch calls read back zero. Public door's successful scratch read proves exclusion; populated read behavior is proven through the private core because production intentionally hides scratch rows. Real-row guard allowances name only own scratch profile update and rollback checks, with reasons/expiry; migration guard passes.

## 6. EXPLAIN and index decision

Live unfiltered execution: ai_calls_created_at_idx, incremental sort; execution 1.427 ms, zero visible rows. Feature+outcome execution: existing ai_calls_feature_created_at_idx, incremental sort; 0.272 ms, zero visible rows. No new index warranted. Empty live population limits performance conclusions; no planner-choice assertion.

```text
Limit (cost=2.39..2.43 rows=2 width=24) (actual time=0.111..0.113 rows=0 loops=1)
  Buffers: shared hit=10
  -> Incremental Sort (cost=2.39..2.43 rows=2 width=24) (actual time=0.110..0.110 rows=0 loops=1)
       Sort Key: created_at DESC, id DESC
       Presorted Key: created_at
       Full-sort Groups: 1 Sort Method: quicksort Average Memory: 25kB Peak Memory: 25kB
       -> Index Scan using ai_calls_feature_created_at_idx on ai_calls
            Index Cond: feature = 'name_check' AND created_at > now() - '90 days'::interval
            Filter: feature !~ '^e2e-' AND outcome = 'ok'
Planning Time: 3.432 ms
Execution Time: 0.272 ms
```

## 7. Page and primitive

Six columns: time, feature, model, outcome, latency, person. Existing featureLabelKey with raw-ID fallback, translated feature/outcome toolbar filters, Columns picker, CutText names. DataTable keyset mode preserves all server rows, no local slicing/total/page-number invention; Next/Previous availability/busy state and cursor history; filter resets cursor. Other consumers retain their current path. Table census accepts keyset only when the prop exists, planted deletion fails T6; section inherits existing AI page heading.

## 8. Tests and checks

Final whole suite: **354 files passed; 2,139 passed, one existing skip, 2,140 total**, 262.66 seconds. Command was `TZDIR=<installed tzdata>/share/zoneinfo bun run test:unit`. First run: 2,133 passed, five failures: table census, selector reachability, three missing-zone-data tests. Shared census/selector fixed; installed timezone data supplied without test changes/raised deadlines. ACR-1…6 cover projection/cursor, feature fallback, consumer navigation/reset, failed-read retry, primitive mode and planted census. Existing primitive consumers still pass. AM guard 2/2. Touched-file ESLint zero errors (generated types ignored by existing configuration), actionlint passes, migration guards pass, i18n usage maps regenerated. Harness latest preview signal: build OK. No standalone build/typecheck was run; e2e:local's built harness ran as prescribed.

## 9. E2E and blocker

`E2E_WORKERS=1 bun run e2e:local -- e2e/admin-ai-calls.spec.ts` (installed Chromium path provided). Both configured viewport projects, retries unchanged at zero. **Zero tests executed:** preflight refuses staging missing the two applied files. No parity bypass or prod browser fixtures. After staging receives both apply lines above, rerun the complete spec; repeatability belongs to CI repeat lane. The page test uses actual signed-in door responses, no row writes; an empty live page cannot prove populated rendering, so that remains a validation limit.

## 10. Security review and K2 census

Linter: 233 warnings, 232 pre-existing; new 0029 is intended authenticated EXECUTE on the required gated SECURITY DEFINER door, like existing staff RPCs. Remediation link fetched, ACL and gates reviewed, linter rerun: 214 authenticated-definer, 18 anon-definer, one extension warning. It is not reported cleared. Revoking the required grant or using invoker would break the approved reader, so no such workaround. Other warnings are outside scope.

K2 siblings unchanged: src/features/admin-ai/ai-spend-days.tsx:51 label above picker; src/features/admin/audit/audit-service.ts:62 p_offset and audit-page.tsx:120/474 offset paging; existing audit display-name access remains the ruled sibling (not changed). INC-977 alias.unchecked follow-up and INC-974 rail draw remain separate turns. QueryState absent is explicitly documented, not re-created locally. New refusal callers: fetchAiCalls is the only browser reader, after existing admin gate; door order is auth, services:view, limit, feature, outcome, cursor, read.

## 11. Exact EN/AM (G43)

Approved AM JSON copied by script, verified SHA-256 `deb0d422fdf0456a903a9d033485e9d8ee7f1bc005cbc0d8daab5f6361d0796c`. All 19 keys landed together. Stand-in key retained from supplied set, not displayed as an extra column.

| Key | EN | AM |
| --- | --- | --- |
| admin.ai.log.title | Recent AI calls | የቅርብ ጊዜ የሰው ሰራሽ አስተውሎት ጥሪዎች |
| admin.ai.log.hint | The last 90 days, newest first. Prompts and answers are never kept. | ያለፉት 90 ቀናት፣ አዲሱ መጀመሪያ። የተላኩ ጥያቄዎችና የተገኙ መልሶች ፈጽሞ አይቀመጡም። |
| admin.ai.log.loading | Loading the AI calls… | የሰው ሰራሽ አስተውሎት ጥሪዎች በመጫን ላይ… |
| admin.ai.log.error | The AI calls could not be loaded. | የሰው ሰራሽ አስተውሎት ጥሪዎችን መጫን አልተቻለም። |
| admin.ai.log.col.model | Model | ሞዴል |
| admin.ai.log.col.outcome | Outcome | ውጤት |
| admin.ai.log.col.latency | Time taken | የፈጀው ጊዜ |
| admin.ai.log.col.person | Person | ሰው |
| admin.ai.log.allOutcomes | All outcomes | ሁሉም ውጤቶች |
| admin.ai.log.latencyMs | {ms} ms | {ms} ሚሊሰከንድ |
| admin.ai.log.personHidden | Hidden | የተደበቀ |
| admin.ai.log.standIn | Stand-in | ምትክ |
| admin.ai.log.outcome.ok | Answered | መልስ ተሰጥቷል |
| admin.ai.log.outcome.featureOff | Switched off | ጠፍቷል |
| admin.ai.log.outcome.budget | Over budget | ከበጀት በላይ |
| admin.ai.log.outcome.unavailable | Unavailable | አይገኝም |
| admin.ai.log.outcome.timeout | Timed out | ጊዜው አልፏል |
| admin.ai.log.outcome.providerError | Provider error | የአቅራቢው ስህተት |
| admin.ai.log.outcome.unusableAnswer | Unusable answer | ጥቅም ላይ የማይውል መልስ |

## 12. Files and commit

Base range: git diff --name-only 14045945. New file git-ls-files proof names the new page/test/hook. Current observed HEAD before this report: dcf54458974e3c2b819ca78f73f58c21c15bcb6a; platform owns subsequent commits, no final SHA invented.

- `.github/workflows/ci.yml`
- `AGENTS.md`
- `docs/_changelog.md`
- `docs/features/ai-gateway.md`
- `docs/features/ci-guards.md`
- `docs/generated/i18n-usage.json`
- `docs/governance/mechanisms.md`
- `docs/governance/reports/foundations-turn-a2.stop-1.md`
- `docs/tracking/incidental-findings.md`
- `docs/tracking/intentional-deletions.txt`
- `e2e/admin-ai-calls.spec.ts`
- `public/i18n-usage.json`
- `roadmap.md`
- `scripts/admin-tables.test.ts`
- `scripts/admin-tables.ts`
- `scripts/conformance/agents-lines-allowlist.txt`
- `scripts/e2e-select.ts`
- `scripts/migration-real-row-allowlist.txt`
- `scripts/public-surface-allowlist.txt`
- `src/components/shell/data-table.test.tsx`
- `src/components/shell/data-table.tsx`
- `src/features/admin-ai/ai-calls.test.tsx`
- `src/features/admin-ai/ai-calls.tsx`
- `src/features/admin-ai/ai-page.test.tsx`
- `src/features/admin-ai/ai-page.tsx`
- `src/features/admin-ai/ai-service.test.ts`
- `src/features/admin-ai/ai-service.ts`
- `src/features/admin-ai/use-ai-calls.ts`
- `src/i18n/locales/am-admin.ts`
- `src/i18n/locales/en-admin.ts`
- `src/integrations/supabase/types.ts`
- `supabase/migrations/20261029043847_4a7e258a-9b47-419b-8d1b-7910ab9cd56e.sql`
- `supabase/migrations/20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql`
- `docs/governance/reports/foundations-turn-a2.report.md`

J-audit: read-only spec, pool identity, browser-client seam, structure/twin locators, no real-row writes; cleanup-survives-timeout: no fixture writes to clean. Not READY until staging parity and whole E2E file pass.
