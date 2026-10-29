# Foundations turn A1 — the AI gateway's follow-ups (plan only)

CI line read at turn start: run 40809236156, commit c7bb093a, **FAILURE** (Component tests only; migration linter, Semgrep, browse-path guard green; all E2E lanes started, 365/365 migrations, 0 failed). The fix for that red is 4819f7cc; its run has not completed. It is read first when the build turn opens; any red is fixed first.

D1 follow-up (build phase, first item): delete `docs/tracking/local-backend-proof.md`; AGENTS.md's CI line names it as a ci-evidence address. AGL-1 (`scripts/conformance/agents-lines.test.ts`) resolves names through `existsSync` plus `agents-lines-allowlist.txt`. I will check whether AGL-1 already skips names under the raw ci-evidence URL (how the other three files resolve). If it does, the line is rewritten to that form. If it does not, an allowlist line is added: `local-backend-proof.md | written only on the ci-evidence branch by CI | until a frozen copy exists on dev`.

## 1. Files and tests per part

**Part A: person-mark (INC-952, DEC-280)**
- `src/server/ai/tasks.ts`: an `AiTask.judgesPerson: boolean`, required with no default, on all seven tasks.
- `src/server/ai/audit.ts`: `recordAiCall` returns `{ written: boolean }` and keeps its F4 log line. The doc comment "audit failure never changes a billed answer" is reworded.
- `src/server/ai/gateway.ts` :390: when `!written && task.judgesPerson`, the answer becomes `{ ok:false, reason:"unavailable" }` and the billed spend stands (the G38 addendum: spending order unchanged).
- Callers of marked tasks keep their existing `unavailable` branches. No new strings:
  - `src/routes/api/listings/identity.ts:69`: no alias stored.
  - `src/routes/api/listings/assist.ts:298`: `providerUnavailable` verdict, no draft change.
  - `src/server/media/policy.ts:189` and `hold.ts` (if photo_screen is marked): no listing state change.
- Tests: `gateway.test.ts` (AIV-1 for the unmarked best-effort path) and the route tests beside identity, assist and policy (AIV-2…n, one per marked task: audit forced to fail → `unavailable`, no row/verdict/listing write, spend count only as the gateway order spends).
- Census: `gateway.census.test.ts` gains GWC-10 (every task declares `judgesPerson`; planted task without it is reported).
- Docs: register row 11 (mechanisms.md) extended; `docs/features/ai-gateway.md`; INC-952 closed in incidental-findings; `_changelog.md`.

**Part B: worded refusals (INC-886)**
- `src/server/answer.ts`: worded refusals for 422, 502 and 503 (`unprocessable`, `upstreamFailed`, `upstreamUnavailable`), reusing the existing `upstreamFailed`/`upstreamUnavailable` (re-exported at :199) if their shape already fits, before adding anything new.
- Census of `ok({ error … }, { status })` across src/routes (found at 4819f7cc):
  - `api/translate.ts` :82, :84, :97, :110 (500), :113 (403), :137
  - `api/admin/categories/generate-image.ts` :37, :39, :52, :55 (404)
  - `api/admin/categories/suggest-icon.ts` :81
- A full census by the concern's definition (any non-2xx through `ok`) is rerun with ast-grep at build time. The 403/404/500 sites map to `clientError` / `serverError`.
- Browser readers of those error bodies (`src/features/admin-translations`, `admin-categories` services) are censused and their tests updated.
- Guard: RFL-1 in the routes census (`routes.test.ts`). `ok(...)` with a status ≥400 is refused; a planted file is reported.

**Part C: failed read (INC-885)**
- `api/translate.ts:216`: `{ data: rows }` drops `error`. It goes through `readFailure`.
- Census targets: `?? 0`, `|| 0` and `.length` after an unchecked `{ data }` in src/server and src/routes/api. Every hit is listed in the report.
- Test: RFL-2 in translate's route test.

**Part D: hash and deadline (INC-887, INC-888)**
- `gateway.ts` `hashMaterial`: covers the canonical JSON of the task's material, plus the rendered text and images. For translation the texts are hashed, not empty text.
- `upstream.ts`: exports `isDeadline(error)`. It is used by its own catch (:42) and by the four copies:
  - `providers/gemini.ts:98`
  - `providers/photoroom.ts:75` and `:83`
  - `providers/google-translate.ts:60` (local `isDeadline`, removed)
- Tests: `upstream.test.ts` (AIA-1); gateway hash test (AIA-2: two translation inputs give different hashes). AIG tests that pin a hash value are recomputed by script, never retyped.
- Guard: AIA-3 census: no `"TimeoutError"`/`"AbortError"` literal outside upstream.ts.

**Part E: admin read of ai_calls (DEC-247)**
- New door `admin_list_ai_calls(p_task, p_outcome, p_before timestamptz, p_before_id uuid, p_limit)`: keyset paging (Knowledge: `readAllPages`, never offset).
- Files:
  - `src/features/admin-ai/ai-service.ts` + test
  - new `ai-calls-table.tsx` + test (DataTable, toolbar filters task/outcome, C8)
  - `ai-page.tsx` + test
  - EN/AM keys in `en-admin`/`am-admin`
  - i18n maps
  - `scripts/public-surface-allowlist.txt` line
  - new e2e spec `e2e/admin-ai-calls.spec.ts`
- Person shown via the existing admin identity reader (censused first; no new name lookup).

## 2. Task list, proposed marks

| Task | Mark | Reason |
| --- | --- | --- |
| name_check | **judges** | DEC-280 names it: refuses a person's chosen name |
| writing_helper | **judges** | DEC-280's "assist's screening": the assist call that answers for the seller's listing |
| photo_screen | **judges (proposed, ruling asked)** | refuses or holds a person's ad (allowed/code/evidence); a verdict acted on against the seller. DEC-280 does not name it, so this goes beyond the decision |
| background_removal | best-effort | image transform, no verdict |
| category_icon | best-effort | staff catalogue glyph; DEC-280 names it unmarked |
| category_image | best-effort | staff catalogue image |
| translation | best-effort | DEC-280 names it unmarked |

The registry ids are `category_icon` (singular), not "category_icons" as in the brief and register row 11.

## 3. Part E migration

Yes, one migration. **Recommended: split E into its own turn (A2).** It carries a migration, a new page section, keys and an E2E spec. A–D need no migration.

What the migration carries:
- **Door:** `SECURITY DEFINER`, `STABLE`, `SET search_path = public`.
- **Permission:** `has_permission(auth.uid(),'services','view')` is checked first and raises `permission denied` (the precedent is 20261014103719).
- **Inputs:** limit bounded 1–100; task and outcome optional.
- **Retention:** rows older than 90 days are not returned.
- **Columns:** created_at, task, feature, model, outcome, provider_status, latency_ms, units if stored (otherwise cost units come from the meter: to verify against the ai_calls columns), fake, actor_id. Never input_hash.
- **Index:** `ai_calls_created_at_idx` exists. Add `(task, created_at DESC, id DESC)` and `(outcome, created_at DESC, id DESC)` only if the proof's EXPLAIN demands it. The EXPLAIN is pasted in the report, with no planner assertion (memory rule).
- **Closers:** REVOKE ALL FROM PUBLIC, anon; GRANT EXECUTE TO authenticated; GRANT ALL TO service_role; ACL read-back; allowlist line.
- **Proof:** scratch staff user and scratch rows only, rolled back on the sentinel (INC-970). It covers deny, allow, keyset order, the filter, and the 90-day edge.
- **Mark:** chosen at apply time; reported as "apply <fragment> → expect mark <value>".

## 4. Conflicts and existing mechanisms

- Existing mechanisms reused:
  - `aiCall`/`recordAiCall` (A)
  - `answer.ts` `clientError`/`serverError`/`upstreamFailed`/`upstreamUnavailable`/`readFailure` (B, C)
  - `UpstreamTimeout` in upstream.ts (D)
  - DataTable and the admin-ai page, the `services:view` precedent (E)
- Nothing new except `judgesPerson`, `isDeadline`, and the door with its table.
- Conflicts:
  - A marked call keeps its billed spend while the caller gets `unavailable`. This follows the gateway order, as the brief allows; stated for the ruling.
  - Part C: translate's writes are done before the read-back. A whole `readFailure` 5xx would hide `done`/`failed`. Proposed: `flagged: null` plus a typed `flagRead: "failed"` in the 200 body, logged. The alternative is `readFailure` as the brief says. Ruling asked.
  - Knowledge cites v3.12; the project knowledge in context is v3.11. No rule I read conflicts.
  - `local-backend-proof.md` is an AGENTS.md name; handled above.

## 5. Test ids

AIV-, AIA- and RFL- are free (`rg "\b(AIV|AIA|RFL)-[0-9]"` over src, e2e, scripts and docs: 0). GWC-10 is the next GWC id, after GWC-1…9. Part E would use AIV-E… unless A2 gets its own prefix (AIC-, checked at A2).

## 6. Estimate

- A–D: 1 turn (band 1–2). A migration-free build plus the full unit suite.
- E: 1 turn (band 1–2). One migration stop plus the page and E2E.
- Total 2, band 2–4.
