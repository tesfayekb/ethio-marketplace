STOP — turn 19 part C: ERRT-7 (src/lib/error-text.test.ts, outside SCOPE) pins translate.ts's own log helpers; plus one question on CHANGE (3)'s "gate unavailable"
DONE: part A, STEP 0 (brief saved, sha256 62b85803dd7cbe5a3fce4c3be2cf0f0b495f7d83f0d7e884dea651a7742846aa — equal to the carrying message's value; roadmap.md line 3, the turn-19 line and the residency-wave line as STEP 0 says); the census for parts B–E (read-only)
LEFT: parts B, C, D, E, F, THE CHECKS, THE END-TO-END CHECK, the report
CI: STALE for BASE — the newest completed run on origin/ci-evidence is not on f326ab98:
    # CI Status (auto-generated — do not edit by hand)

    - Commit: `1993fbf62b1fef0e4054d09b4528001f53f0a4c7` (short `1993fbf`)
    - Conclusion: **SUCCESS**
    - Completed (UTC): 2026-10-25T10:52:00Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40185248201
    (At Part A the newest was 22584e33, SUCCESS, run 40183382027; guards-last-failure and e2e-last-failure on that run: no failed job, E2E passed.)
FILES:
docs/governance/briefs/foundations-turn-19.md
roadmap.md

Part A: `git rev-parse HEAD origin/dev` → f326ab986b16726403da03f5378b052228e4d2f4 twice; origin/dev = BASE, so no BASE..origin/dev diff. Every CONSUMERS anchor in translate.ts re-located at BASE and still exact (GOOGLE_CHUNK :52, MAX_ITEMS :53, json :104, logRouteError :114, fail5xx :120, supportedLanguages :132, FAKE_LANGUAGES :138, loadSupportedLanguages :149, loadSupportedTargets :168, maskTokens :201, restoreTokens :217, fakeTranslate :231, decodeEntities :243, googleTranslate :252, serverEnv :307, handlePost :311, aiGate :410-:413, standInMode :422/:552, failed.push :461/:488, recordAiSpend :467, handleGet :520, wrappers :565).

## 1. The STOP — a census hit outside SCOPE (00-executor-protocol.md: "a census hit the brief did not anticipate"; "A file the task needs and the brief did not name is a STOP naming the file and why")

src/lib/error-text.test.ts:149-154, ERRT-7 (:128), ends with an exact list of every route-local log helper:

    expect(helpers.sort()).toEqual([
      "src/routes/api/translate.ts: fail5xx",
      "src/routes/api/translate.ts: logRouteError",
      "src/server/imports/gate.ts: refuse",
      "src/server/supabase/user-client.ts: logRouteError",
    ]);

CHANGE (3) puts translate.ts on defineRoute: its answers come from answer.ts and its log lines from user-client.ts's `logRouteError` (imported, not defined), so `function fail5xx` and `function logRouteError` leave translate.ts and ERRT-7 goes red. Keeping two local helpers of those names only to satisfy the list would be a second local copy of the logging mechanism (K1). The file is not in SCOPE and not in the standing allowance.
Needed: src/lib/error-text.test.ts added to SCOPE, the change being exactly the two translate.ts lines removed from ERRT-7's expected list (the census itself and the other two entries unchanged).

## 2. QUESTION — CHANGE (3): "the FIRST chunk's featureOff / budget / gate `unavailable`"

`aiCall` answers `{ ok: false, reason: "unavailable" }` for five different causes: the gate unreadable, the key missing (task without `noKey`), images refused, a throw inside the try, and a provider `network` failure. Only the first is "gate unavailable". If the route treats every first-chunk `unavailable` as switched off, a network failure on the first chunk would answer 503 "machine translation is switched off (unavailable)" with nothing written, where today it answers 200 with that chunk's keys in `failed` and the other chunks written — a behaviour difference outside the numbered CHANGEs.
Proposal (recommended), all inside SCOPE: the three answers aiCall builds from the gate (`featureOff`, `budget`, `unavailable` when `aiGate` says off) carry `gate: true` (`AiAnswer` gains an optional `gate?: true` on that variant); the route answers 409/503 only for a first-chunk answer with `gate: true`; every other non-ok marks the chunk's keys `providerUnavailable`. Other routes are unaffected (they test `reason` only). Two exact-shape assertions in src/server/ai/gateway.test.ts gain `gate: true`: AIG-1 (:255, featureOff) and AIG-13 (:368, gate throw → unavailable). No test outside SCOPE asserts an aiCall gate answer by exact shape (grep of `reason: "featureOff" | "budget" | "unavailable"` across src/, e2e/, scripts/).
Alternative: the translation adapter's `network` mapped to `providerError` (no status) — narrower in code but unlike the two other providers, and a throw would still read as switched off.

## 3. How the remaining parts will read CHANGE (1)–(5) unless ruled otherwise (stated now, before any code — law 3)

a. Missing GOOGLE_TRANSLATE_API_KEY: today POST and GET answer 503 `{ error: "internal error" }`. `translationLanguages()` answers a typed `noKey`, which the route keeps at today's 503; only its other failures answer CHANGE (3)'s 502.
b. Order (dictated by CHANGE 3): the language list now runs before the switch, so "switched off AND unsupported target" answers 422 (today 409) and "switched off AND no key" answers 503 internal error (today 409). Stated in section 3 of the report.
c. CHANGE (2)'s length check needs the material: `AiTask.validate` becomes `(value, material) => boolean` (writing_helper ignores the second argument).
d. GWC-8 treats every non-`gemini-text` provider as an image answer; the census's provider test becomes the two image providers (gateway.census.test.ts, in SCOPE), and GWC-9 is added there.
e. Byte ceiling: today the route reads any size; defineRoute's default is 64 KiB, below a legitimate 100-item chunk with 500-character notes. Proposed `limits.bodyBytes` 1 MiB (600 items × (500 + ~1,200) characters), 413 word defineRoute's default `payloadTooLarge`.
f. The callers of `failed[].reason` outside SCOPE (strings-page.tsx :927-:929, data-scope.tsx :523-:525) will throw the code as the error message; `translationErrorKey` maps it (CHANGE 5) and `serverMessage` shows the code as the detail line. ai-bulk-bar.tsx keeps keys only. No change to those files.
g. Writer RAISE table (newest definitions at BASE: admin_machine_translation in 20260830045700_f5a61050…sql :115; admin_machine_entity_translation in 20261022023137_e74aeb54…sql :118; require_step_up_if_needed in 20260817100845_ddd63395…sql) — every direct RAISE is in CHANGE (4)'s table, none missed:
   'permission denied' → permission · 'step-up required' / ': no verified factor' / ': verification expired' → stepUp · 'not assigned to this language' → scope · 'base language rows are sync-owned' → baseLocked · 'unknown translation key' (ui) / 'unknown entity field' / 'unknown entity' (entity) → unknownTarget · 'empty machine value' (entity) → emptyValue · anything else (e.g. a nested function's raise) → writerFailed.
h. The scope door: translation_scope_ok(p_lang) (20260829050332_d4f5cd34…sql :182) = has_permission(auth.uid(),'translations','manage') OR a translator_languages row — the same decision as today's two reads.
i. Owed-test census so far (src/, e2e/, scripts/): ai-bulk-bar.test.tsx mocks aiTranslate/aiTranslateEntities (:31-:32); translate.test.ts INC-829; route-client.test.ts :92-:94; error-text.test.ts ERRT-7 (above); e2e: admin-translations-console.spec.ts TR-11, TR-12, TR-13, TR-23, TR-35, TR-scope (:988, a direct POST with `{ target_lang, items:[{key,source}] }`, expects 403 "not assigned to this language" — kept) and TR-25 (the provider-language picker, GET). No exact-shape assertion on a `failed` array in any test.

Allowlist counts at BASE (non-comment lines): routes 11, has-permission 1, route-client 9, ai-gateway 1, vendor-seams 67; eslint ROUTES-BOUNDARY-IGNORES holds translate.ts (eslint.config.js:110).
