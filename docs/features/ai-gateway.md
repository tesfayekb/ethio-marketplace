# AI gateway — Foundations turn 15

This project's "AI gateway" is its own module over its own provider key (DEC-248), distinct from the Lovable AI Gateway SDK.

## One call

`src/server/ai/gateway.ts` orchestrates `aiCall`: registry lookup, D158 gate, E2E-only stand-in, provider key, deadline-bound adapter, JSON parsing and strict output validation, spend for every 2xx answer (including unusable answers), then the awaited content-free audit write. It returns success with `{ value, fake }` or `featureOff`, `budget`, `unavailable`, `timeout`, `providerError` (with HTTP status), or `unusableAnswer`.

`tasks.ts` registers `name_check` and `category_icon`, both version 1 and bounded at 15 seconds. Output objects refuse unknown keys; seller-name `of` is trimmed and capped at 80 characters, icon names at 60. The registry checks unique IDs, known features and deadlines no longer than 120 seconds. `template.ts` renders fields in declared order through `untrustedText`, omits empty fields and closes the instruction with `withUntrustedRule` exactly once. No person's words become instructions.

The existing own-key Gemini text adapter lives in `providers/gemini.ts`, calls `upstream` and sends the secret only in `x-goog-api-key`. Models and existing fake rules are unchanged. The seller-name route spends its existing imitation dial before `aiCall`; every non-success remains pass-unchecked and keeps the existing `alias.unchecked` audit. An imitating answer with empty `of` falls back to the alias. Staff icon suggestions use `defineRoute`, `categories:assets`, the strict body and `checkIcon`'s allowlist/fallback.

## Audit and retention

`audit.ts` awaits service-only `ai_record_call` before returning. `ai_calls` records feature, task/version, model, actor UUID or NULL, SHA-256 of `task.id + "\n" + task.version + "\n" + rendered.user`, outcome, provider status or NULL, latency and fake status. No prompt, material, provider body or key is stored. An audit failure logs once without changing the answer. Actor and provider-status RPC parameters are omitted by conditional spreads when null, using M2's trailing `DEFAULT NULL` arguments; generated types are not hand-edited.

DEC-247 retention is enforced in `public.ai_calls_prune()`: rows older than 90 days are purged daily at `17 4 * * *` UTC. Every run writes `ai_calls_prune_runs`, including zero deletions; heartbeats older than 14 days are purged. Both tables and functions are closed to browser roles. An admin last-calls reader remains a later task.

M1 `f5f6c8fb` declares mark `20261025140000`; operator-ruled M2 `71ad0a58` declares `20261025150000`, replaces the unused audit signature with nullable trailing defaults and keeps the same INSERT body and service-only ACL. Both projects hold both marks per operator read-back.

## Census and next wave

`gateway.census.test.ts` uses the conformance kit: GWC-1 provider hosts only in adapters; GWC-2 provider key/model/stand-in reads only under AI; GWC-3 feature list matches the newest migration; GWC-4 bounded deadlines, strict outputs and the quoting rule; GWC-5 planted violations bite. `wired.test.ts` names the caller. AIG-1…10 cover orchestration, material isolation and audit failures; AIM-6 shares the feature-census helper with GWC-3. UNT-4 remains during the transition.

`scripts/conformance/ai-gateway-allowlist.txt` contains five expiring exceptions, all until INC-876: writing helper, photo screening, background removal, category image generation and translation. Foundations turns 16–17 move these calls and the remaining staff routes. No package or provider change is part of this turn.
