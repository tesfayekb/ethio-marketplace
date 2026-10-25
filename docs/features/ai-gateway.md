# AI gateway — Foundations turns 15–16

This project's "AI gateway" is its own module over its own provider key (DEC-248), distinct from the Lovable AI Gateway SDK.

## One call

`src/server/ai/gateway.ts` orchestrates `aiCall(taskId, material, ctx, images?)`. The task lookup is the only step outside the audited try; everything after it — rendering, the model name, the input hash, the D158 gate, the caller's reservation, the stand-in or the provider, the parse, the spend — runs inside one try whose every exit writes the content-free audit row, and a rejection anywhere is `unavailable` with its row. It returns success with `{ value, fake }`, or `featureOff`, `budget`, `unavailable`, `timeout`, `providerError` (with HTTP status), `unusableAnswer`, or `reserved` (the caller's reservation refused: no model was asked, no spend, no audit row — the one exit without one). Spend is recorded only for a billed answer (a 2xx, including an unusable one, or a stand-in).

`tasks.ts` registers `name_check`, `category_icon` and `writing_helper`, each with a literal id — `TaskId` is the registry's union and `OutputOf<T>` the task's inferred schema type, so an unknown id is a compile error (AIG-14) and `taskOf`'s one cast sits at that trust boundary. Output objects refuse unknown keys; seller-name `of` is trimmed and capped at 80 characters, icon names at 60, the writing helper's title and description clamp to 120/1200 before their bounds. The registry checks unique ids, known features and deadlines no longer than 120 seconds.

`template.ts` renders the declared fields in order by kind (turn 16): `text` and `lines` are a person's words, always one quoted string (`lines` keeps single line breaks); `list` quotes each item on its own `- ` line under the label, capped at `maxItems`; `code` is a value the field's own `allow` (a RegExp or a literal list) accepts, written unquoted, otherwise the field's `fallback`. An empty optional field with `none` writes `<label>: (none)`. The instruction closes with `withUntrustedRule` exactly once. No person's words become instructions; no String.replace filling.

Image material rides beside the text: a task declares `images: { max, maxBytes }`, the gateway type-allowlists (JPEG/PNG/WebP), drops oversize and over-count images before the call, and the adapter sends them as inlineData after the text part, one chunked base64 pass per image. The audit hash covers the rendered text and each sent image's byte length and SHA-256. A caller may hand a lazy supplier; the gateway resolves it only once a real call will happen, so a stand-in never touches the network.

## The stand-in switch

`standInMode(flag)` in `src/server/stand-in.ts` (DEC-249) is the one stand-in switch: a stand-in exists only in the E2E build, and only when its own flag or the harness-wide `E2E_FAKE_TRANSLATE` is set; a normal build answers false whatever the environment says (INC-828). Every stand-in reader calls it — the AI tasks through the gateway, the photo policy, the background removal, the category images, the translations. The geocoder's `E2E_FAKE_GEOCODE` is not an AI call and stays outside the AI census by design. SIN-1…3 hold the census and the build gate (INC-828/INC-839, ids unchanged).

## Consumers

The seller-name route spends its existing imitation dial before `aiCall`; every non-success remains pass-unchecked and keeps the `alias.unchecked` audit. Staff icon suggestions use `defineRoute`, `categories:assets`, the strict body from `src/lib/schemas/category-icon.ts` and `checkIcon`'s allowlist/fallback. The writing helper (src/routes/api/listings/assist.ts) reserves its assist dial through `aiCall`'s reserve callback after the gate answers on, fetches up to three photos lazily, and maps the gateway's reasons onto today's refusal payload; its validator refuses an answer carrying an e-mail, a web address or a run of nine or more digits. The earlier-suggestions list travels as quoted items, one per line.

The existing own-key Gemini text adapter lives in `providers/gemini.ts`, calls `upstream` and sends the secret only in `x-goog-api-key`. One deadline spans the headers and the body read: a deadline passed during the body read is `timeout`; any other thrown read is an answered-but-unusable provider (billed).

## Audit and retention

`audit.ts` awaits service-only `ai_record_call` before returning. `ai_calls` records feature, task/version, model, actor UUID or NULL, the SHA-256 input hash, outcome, provider status or NULL, latency and fake status. No prompt, material, provider body or key is stored. An audit failure logs once without changing the answer. Actor and provider-status RPC parameters are omitted by conditional spreads when null, using M2's trailing `DEFAULT NULL` arguments; generated types are not hand-edited.

DEC-247 retention is enforced in `public.ai_calls_prune()`: rows older than 90 days are purged daily at `17 4 * * *` UTC. Every run writes `ai_calls_prune_runs`, including zero deletions; heartbeats older than 14 days are purged. Both tables and functions are closed to browser roles. An admin last-calls reader remains a later task.

M1 `f5f6c8fb` declares mark `20261025140000`; operator-ruled M2 `71ad0a58` declares `20261025150000`, replaces the unused audit signature with nullable trailing defaults and keeps the same INSERT body and service-only ACL. Both projects hold both marks per operator read-back.

## Census and next wave

`gateway.census.test.ts` uses the conformance kit: GWC-1 provider hosts only in adapters; GWC-2 provider key/model/stand-in env reads only under AI (every spelling: `process.env.X`, bracket and destructured forms, `import.meta.env`, `serverEnv(`, `stubEnv(`, `standInMode(`); GWC-3 feature list matches the newest migration; GWC-4 bounded deadlines, strict or clamped-bounded outputs and the quoting rule; GWC-5 planted violations bite; GWC-6 every `standInMode(` with an AI flag outside the gateway is allowlisted; GWC-7 a planted file holding each env-read form is reported once per form. `wired.test.ts` names the caller. AIG-1…20 cover orchestration, the audited-throw order, typed ids, body-read deadlines, reservations, field kinds, images, the contact-detail validator and the stand-in pair. AIM-6 shares the feature-census helper with GWC-3. UNT-4/UNT-5 hold the quoting census and the writing helper's rendered prompt.

`scripts/conformance/ai-gateway-allowlist.txt` holds four expiring exceptions, all until INC-876: photo screening, background removal, category image generation and translation. Foundations turns 17–18 move these calls and the remaining staff routes. No package or provider change is part of this turn.
