# Turn 19 — machine translation onto aiCall and defineRoute (brief v2): Google Translate adapter, units by characters, fixed per-item reason codes, the client onto callRoute — INC-861 and INC-876 closed
Base: 7b3633cb777afb1b9f79c94a410bcf7698d301a6 · Final commit: da1aa9c (the review fixes; the roadmap line, written in Part F, names eb0a9a9 — the last code commit before the review) · Brief: docs/governance/briefs/foundations-turn-19-v2.md (sha256 b61d1a8c99182514b849732dc4a68845a40eab5817499b9b5d05a34c1cf7aaea)

## 1. Done / not done, by part and step

- Part A — done. `git rev-parse HEAD origin/dev` → `7b3633cb777afb1b9f79c94a410bcf7698d301a6` twice (= BASE; no BASE..origin/dev diff). CI was read at Part A (newest run on 1993fbf6, SUCCESS; e2e-last-failure: run 40186261499 on f326ab98 passed; guards: no failed job) and again before Part C (newest on f326ab98, SUCCESS). BASE's own run reported SUCCESS later (section 11). No red to fix.
- STEP 0 — done (2be9ba9). Brief saved; `sha256sum` = `b61d1a8c99182514b849732dc4a68845a40eab5817499b9b5d05a34c1cf7aaea`, equal to the carrying message. roadmap.md line 3 replaced exactly as dictated; the Turn 19 line now names the v2 brief; the residency-wave line from stop 1 kept (one copy).
- Part B — done (a3ba676): providers/google-translate.ts, translate-tokens.ts (moved by script), the `translation` task, `units`, `validate(value, material)`, `translationLanguages()`, the gate mark `gate: true` (R2), GWC-8 narrowed to the image providers and GWC-9 (R3 d).
- Part C — done (bdd8dd6): translate.ts on defineRoute (POST/GET), src/lib/schemas/translate.ts, ERRT-7's two lines (R1), the allowlist and eslint lines.
- Part D — done (4c10ffb): translations-service.ts on callRoute, the code table and R4's `serverMessage`; route-client allowlist line and RCG INC set.
- Part E — done (eb0a9a9; parts B–C also updated AIG-1, AIG-13, AIG-14 and re-pointed INC-829 so each commit stayed green): AIG-37…44, GWC-9, TRR-1…9, TRS-1 and TRS-2, plus the extra TRR-6b and TRS-3 (section 10, item 8).
- Part F — done (151ae93): ai-gateway.md, translations.md, routes.md, mechanisms.md (rows 11 and 13), _changelog.md, roadmap.md (Turn 19 `[x]`).
- THE CHECKS — done; the i18n maps moved (scanned 559 → 562) and were committed (1de068e).
- THE END-TO-END CHECK — done (section 5).
- The independent review (the `reviewer` subagent, turn-report step 3) — BLOCKER 0, MAJOR 1, MINOR 19. The MAJOR (BC-1, a failed scope read answered differently from today) and the substantive MINORs were fixed in da1aa9c. THE CHECKS and THE END-TO-END CHECK ran again on da1aa9c; the rest is answered in section 10.
- `src/features/admin/translations/ai-bulk-bar.test.tsx` (named in SCOPE) was not changed: it mocks `aiTranslate`/`aiTranslateEntities`, whose signatures did not change, and it passes as it is.

## 2. Files changed

`git diff --name-only 7b3633cb777afb1b9f79c94a410bcf7698d301a6` (before this report's commit):

```
docs/_changelog.md
docs/features/ai-gateway.md
docs/features/routes.md
docs/features/translations.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-19-v2.md
docs/governance/mechanisms.md
eslint.config.js
public/i18n-usage.json
roadmap.md
scripts/conformance/ai-gateway-allowlist.txt
scripts/conformance/has-permission-allowlist.txt
scripts/conformance/route-client-allowlist.txt
scripts/conformance/route-client.test.ts
scripts/conformance/routes-allowlist.txt
scripts/conformance/vendor-seams-allowlist.txt
src/features/admin/translations/translations-service.test.ts
src/features/admin/translations/translations-service.ts
src/lib/error-text.test.ts
src/lib/schemas/translate.ts
src/routes/api/translate.route.test.ts
src/routes/api/translate.test.ts
src/routes/api/translate.ts
src/server/ai/gateway.census.test.ts
src/server/ai/gateway.test.ts
src/server/ai/gateway.ts
src/server/ai/providers/google-translate.ts
src/server/ai/tasks.ts
src/server/ai/translate-tokens.ts
```

plus this report, docs/governance/reports/foundations-turn-19-v2.report.md. New files, `git ls-files` proof (each printed): docs/governance/briefs/foundations-turn-19-v2.md, src/features/admin/translations/translations-service.test.ts, src/lib/schemas/translate.ts, src/routes/api/translate.route.test.ts, src/server/ai/providers/google-translate.ts, src/server/ai/translate-tokens.ts. No file deleted.

## 3. Behaviour contract — answer tables before → after

POST /api/translate (BASE = translate.ts at 7b3633cb, read in full at stop 1; after = this turn). "Same" means status and body unchanged.

| Case | Before (BASE) | After |
| --- | --- | --- |
| No bearer | 401 `{error:"missing bearer token"}` | same (defineRoute → refuseUserClient) |
| Server env missing | 500 `{error:"internal error"}` | 500 `{error:"server error"}` (defineRoute's) |
| Auth server down | 503 `{error:"internal error"}` | 503 `{error:"upstream unavailable"}` (defineRoute's) |
| Not signed in | 401 `{error:"not signed in"}` | same |
| Deactivated account | not checked (went on) | 403 `{error:"account is deactivated"}` (defineRoute's) |
| No translations:machine | 403 `{error:"permission denied"}` — after the body checks | 403 `{error:"forbidden"}` — before the body is read (defineRoute's order) |
| has_permission read error | 500 `{error:"internal error"}` | 500 `{error:"server error", incident}` (defineRoute's) |
| Content type not JSON | parsed anyway | 415 `{error:"unsupportedMediaType"}` (boundary law) |
| Body over 1 MiB | read whole | 413 `{error:"payloadTooLarge"}` (R3 e) |
| Invalid UTF-8 | replacement characters | 400 `{error:"invalidEncoding"}` (boundary law) |
| Not JSON | 400 `invalid json body` | same |
| Unknown top-level key | ignored | 400 `invalid json body` (strict keys) |
| scope ∉ ui/entity (null included) | 400 `invalid scope` | same |
| target_lang bad / missing | 400 `invalid target_lang` (non-string → a TypeError → 500) | 400 `invalid target_lang` (non-string included); trim + lower-case kept |
| items empty / missing / not a list | 400 `no items` | same |
| 601+ items | 413 `too many items (max 600)` | same |
| context not a string / null | 400 `context must be a string` | same |
| context > 500 | 400 `context too long (max 500)` | same |
| key/source not strings, item not an object | 400 `invalid item shape` | same |
| Unknown item key | ignored | 400 `invalid item shape` (strict keys) |
| Entity item without type/uuid id/non-empty field | 400 `invalid entity item shape` | same; items checked one by one in today's order (TRR-8) |
| 601+ items where an early item is also bad | 413 `too many items (max 600)` (the count first) | same (TRR-8; the count is checked before any item since da1aa9c) |
| UI item carrying type/id/field | ignored | ignored |
| Outside the translator's languages | 403 `not assigned to this language` (manage read + translator list read) | same, from `translation_scope_ok` as the caller |
| Scope read error | 500 `{error:"internal error"}` | same; the text logged (TRR-2). A first version answered through readFailure; the review's BC-1 found it, and da1aa9c fixed it |
| Switched off / budget / unreadable switch | 409/409/503 `machine translation is switched off (staff|budget|unavailable)` — checked before the key and the list | same words and statuses on the FIRST chunk's gate answer (`gate: true`), after the list (R3 b). Combined with an unsupported target → 422; with a missing key → 503; with a failed language list → 502 (this third case follows from the same order, though R3 b does not name it) |
| Missing provider key (not stand-in) | 503 `{error:"internal error"}` | same (R3 a) |
| Language list fails | 502 `{error:"internal error"}` | same |
| Unsupported target (not stand-in) | 422 `target language <t> is not supported by the provider` | same |
| Stand-in | no target check, one gate read, one spend of all characters | no target check; one aiCall per chunk of 100 (gate, audit row and spend per chunk) |
| A chunk's provider call fails | 200; its keys in `failed` with the provider's text (`provider error 503: …` or the network error) | 200; its keys `providerUnavailable`, nothing written for them; a FIRST-chunk gate answer is the 409/503 row above (R2) |
| Provider answers fewer/more texts than sent | per item `provider returned no text` for the missing ones | the whole chunk `unusable` (metered) → its keys `providerUnavailable` (CHANGE 1) |
| Provider gives no text for one item | `provider returned no text` | `providerNoText` |
| Writer refuses one item | the Postgres message | its code (table below); the message logged with the key |
| Success | 200 `{done, flagged, failed}` | same; flags read back as today |
| Undeclared throw (e.g. a writer RPC that throws instead of answering) | 500 `{error:"internal error"}` | 500 `{error:"server error", incident}` (defineRoute's outer catch, the boundary — section 10 item 1) |
| Meter | after all chunks, once: the characters of the chunks that answered | per chunk on every billed call (texts or unusable): that chunk's characters (`units`) |
| Headers | `application/json`, no-store | `application/json; charset=utf-8`, no-store |

GET /api/translate:

| Case | Before (BASE) | After |
| --- | --- | --- |
| No bearer / env / auth down / not signed in | as POST above | as POST above (defineRoute's) |
| No translations:manage | 403 `{error:"permission denied"}` | 403 `{error:"forbidden"}` |
| Stand-in | 200 `{languages: FAKE_LANGUAGES}` | same (the list moved byte for byte) |
| Missing key | 503 `{error:"internal error"}` | same |
| List fails | 502 `{error:"internal error"}` | same; the list call now has a deadline (20 s) |
| Success | 200 `{languages:[{code,name}]}`, cached per process | same |

The writer RAISE table (newest definitions at BASE; read at stop 1, unchanged since): admin_machine_translation — supabase/migrations/20260830045700_f5a61050-8b29-4773-befc-d8200d364596.sql :115; admin_machine_entity_translation — supabase/migrations/20261022023137_e74aeb54-2bcb-4488-a137-67c8898c12ca.sql :118; require_step_up_if_needed — supabase/migrations/20260817100845_ddd63395-e314-45df-b816-47fd75510ec7.sql.

| RAISE text | Raised by | Code |
| --- | --- | --- |
| `permission denied` | both writers | `permission` |
| `step-up required` | require_step_up_if_needed | `stepUp` |
| `step-up required: no verified factor` | require_step_up_if_needed | `stepUp` |
| `step-up required: verification expired` | require_step_up_if_needed | `stepUp` |
| `not assigned to this language` | both writers | `scope` |
| `base language rows are sync-owned` | both writers | `baseLocked` |
| `unknown translation key` | admin_machine_translation | `unknownTarget` |
| `unknown entity field` | admin_machine_entity_translation | `unknownTarget` |
| `unknown entity` | admin_machine_entity_translation | `unknownTarget` |
| `empty machine value` | admin_machine_entity_translation | `emptyValue` |
| anything else (a nested function's raise, a transport failure) | — | `writerFailed` |

No direct RAISE of either writer is missing from the table. The client (translations-service.ts): `postTranslate`/`listProviderLanguages` before — their own session read, bearer and `fetch`; a refusal threw the route's `error` or `translation request failed (<status>)` / `language list failed (<status>)`; a fetch failure threw the browser's own error; signed out threw `not signed in`. After — `callRoute(…, { auth: "required" })`; the same refusal words; signed out `not signed in`; unreachable `translation request failed (0)` / `language list failed (0)` (CHANGE 5); 2xx payloads narrowed by shape guards (an entry of `failed` or `languages` of the wrong shape is dropped; before, `failed` was taken as sent). `translationErrorKey`: a code → its key (CHANGE 5) before the unchanged text matches. `serverMessage`: a code → null (R4); any other message unchanged.

## 4. Censuses

The census of stop 1 stands (R5): docs/governance/reports/foundations-turn-19.stop-1.md — every CONSUMERS anchor re-located and exact at f326ab98 (the same app code as BASE: `git diff --name-only f326ab98..7b3633cb` touches no src/, e2e/, scripts/ or supabase/ path), the writer RAISE table, the scope door, the callers of `failed[].reason`, the owed-test census. What changed after it:

- ERRT-7 (src/lib/error-text.test.ts :149-:154), the unanticipated hit of stop 1 — resolved by R1 (its two translate.ts lines removed; the census green, section 5).
- The bodies each caller sends (before every schema): translations-service.ts `aiTranslate` → `{ scope: "ui", target_lang, items: [{ key, source, context? }] }` (strings-page.tsx always sends `context` as a string — `row.context ?? ""` at translations-service.ts :173 at BASE), `aiTranslateEntities` → `{ scope: "entity", target_lang, items: [{ key, source, type, id, field }] }`, `listProviderLanguages` → GET, no body; e2e/admin-translations-console.spec.ts TR-scope (:988) → `{ target_lang: "om", items: [{ key: "e2e.u4c.scope", source: "Scope probe" }] }` with `Content-Type: application/json`; e2e/helpers/*.ts send none (`grep -rn "api/translate" e2e/helpers` → only a comment in translations.ts :173). Every body passes `TranslateBody`.
- The owed-test census re-run after the change (`grep -rlnE "/api/translate|aiTranslate|aiTranslateEntities|listProviderLanguages|failed\[|googleTranslate|fakeTranslate|maskTokens|restoreTokens|FAKE_LANGUAGES"` over test and spec files): e2e/admin-attributes-links.spec.ts (`failed[0]` of its own unrelated array — not a translation test), e2e/admin-translations-console.spec.ts (unchanged; run in section 5), scripts/conformance/executor-hooks.test.ts (a planted brief naming translate.ts — unaffected), src/features/admin/translations/ai-bulk-bar.test.tsx (mocks aiTranslate/aiTranslateEntities — unchanged, passes), and the three files this turn added or extended. `.reason` readers of `failed[]`: strings-page.tsx :927-:929, data-scope.tsx :523-:525 (throw it; R4 keeps the code off the detail line), ai-bulk-bar.tsx :183-:209 (keys only) — unchanged.
- Exact-shape assertions on an aiCall answer that changed: AIG-1 and AIG-13 gain `gate: true` (R2); AIG-14's TaskId union gains `"translation"`. Exact-shape assertions on a `failed` array: none at BASE; new ones in TRR-5, TRR-6, TRR-9.
- INC-829 (src/routes/api/translate.test.ts) re-pointed at the adapter: both provider calls (`providerLanguages`, `translateBatch`) — URL without `key=` or the key, the key in `x-goog-api-key`; its assertion kept.

## 5. Tests

Added: AIG-37…44 (gateway.test.ts), GWC-9 (gateway.census.test.ts), TRR-1…9 (src/routes/api/translate.route.test.ts), TRS-1, TRS-2 (src/features/admin/translations/translations-service.test.ts). Added beyond the brief's list (section 10): TRR-6b (the flag read-back), TRS-3 (the client's shape guards). Changed: AIG-1, AIG-13 (`gate: true`, R2), AIG-14 (`"translation"` in the TaskId union), GWC-8 (image checks on the two image providers, R3 d), ERRT-7 (R1), RCG-4's INC set `["INC-875"]`, INC-829 (re-pointed, assertion kept). The gateway test's meter mock now also records units (`state.spendUnits`), and its `beforeEach` clears `GOOGLE_TRANSLATE_API_KEY` beside the other provider keys (AIG-36's rule).

Each CHANGE line, by its test: (1) the adapter — AIG-37 (one form body, `source=en`, `format=html`, a `q` per masked text, the key in the header only, a deadline signal), AIG-38 (count mismatch and unparsable 2xx `unusableAnswer`, metered; non-2xx `providerError` not metered; a body-read deadline and an upstream deadline `timeout`), AIG-39 (span kept, span stripped, duplicated sentinel handed back; empty text → null), INC-829, AIG-43/44 (the list cached, with a deadline). The masking blocks and `FAKE_LANGUAGES` moved by script (sha256 of each block before → after: T1 masking rules `9cf5c6e63b9678c16a93e5ef5eac1b55f917b6c0eb7519afdf0b70de7b79c2aa` → same; T2 fakeTranslate `57763132523395feb5ca03c768d16d650d4f06fd765b8a3d44885e2bc2a5ac91` → same; T3 decodeEntities `58d38224da2d354ac5095ed559e601e16dd943a2d9dcbad1f7e9d51f0a7a2c59` → same; FAKE_LANGUAGES `32430240ccae12b9b5dd840b40de1a32dde18978b5fa2fc0e3959f25bd3d1e05` → same). (2) the task — AIG-40 (stand-in, E2EBREAK), AIG-41 (units 18 fake and real; name_check 1), AIG-42 (length mismatch `unusableAnswer`), AIG-43 (stand-in list, no audit row, no spend), GWC-9. (3) the route — TRR-1, 2, 3, 4, 7, 8, 9. (4) the codes — TRR-5, TRR-6, TRR-9. (5) the client — TRS-1 (with R4), TRS-2.

Red-first: no defect in BASE was fixed, so all of this is new behaviour. The review fixes in da1aa9c corrected this turn's own unlanded code. Their new assertions — TRR-2's failed scope read, and TRR-8's two order cases (601 items with a bad first item → 413; an entity request whose first item has a bad address and whose second item has a bad key → `invalid entity item shape`) — were not run red against the pre-fix code; that the earlier code got them wrong is the reviewer's reasoning, not a run (section 12). Positive controls: GWC-9's planted task (four findings), TRR-8's planted refusals, and TRR-1/2/4's recorded lists showing that nothing happened.

Unit (THE CHECKS on da1aa9c, `bun run test:unit -- --reporter=verbose`): `Test Files  281 passed (281)` · `Tests  1790 passed (1790)`; 30 ✓ lines for AIG-37…44, GWC-1…9, TRR-1…9 + TRR-6b and TRS-1…3 (`grep -cE`). The earlier run, on 1de068e, gave the same totals. Lines read from that run: AIG-1, AIG-13, AIG-14, AIG-37…44 ✓; GWC-1…9 ✓; TRR-1…9 and TRR-6b ✓; TRS-1…3 ✓; INC-829 ✓; ERRT-7 ✓; RCG-1 `[RCG-1] fetch sites: 5; allowlist: 8`, RCG-2 `[RCG-2] credential sites: 17; allowlist: 8`, RCG-3, RCG-4 ✓; routes census `[routes-allowlist] 10 allowances`, CF-RT-1…7 ✓; has-permission census IMD-3 ✓; vendor seams VS-1…3 ✓.

THE END-TO-END CHECK — `bun run e2e:local -- e2e/admin-translations-console.spec.ts --grep "TR-11|TR-12|TR-13|TR-23|TR-35|TR-scope|TR-25"` (the brief's five ids plus the two the census names: TR-scope posts to the route, TR-25 reads the GET list), ethio-staging, both projects, 2 workers, fake mode (`E2E_FAKE_TRANSLATE=1`), 0 retries:

On da1aa9c (the final code):

```
Running 14 tests using 2 workers
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
  1 skipped
  13 passed (1.5m)
```

(The first run, on 1de068e, gave `13 passed (1.7m)`, `1 skipped`, with 0 `[ssr-error]` lines.) TR-11, TR-12, TR-13, TR-35, TR-23 and TR-scope passed on mobile-360 and desktop-1280. TR-25 passed on desktop-1280 and was skipped on mobile-360 by its own `test.skip`, because one project mutates the global roster. Server log (the webServer's piped output, the `[WebServer]` lines in the run log): `[ssr-error]` — 0 lines on any path. The log also holds two `[client-aborted]` lines (`GET /api/feed`, `GET /api/i18n/en`: page navigations that left a request behind), each with framework stack lines; they are not the translation route and not `[ssr-error]`. No spec file changed this turn, so no J-audit is owed.

## 6. K2 — siblings that bypass the mechanism

Greps over src/** (non-test), after the change:

- Provider hosts (`grep -rnE "generativelanguage\.googleapis\.com|translation\.googleapis\.com|sdk\.photoroom\.com|api\.openai\.com|api\.anthropic\.com|api\.deepl\.com"`): only src/server/ai/providers/google-translate.ts :19, :21, photoroom.ts :21, gemini.ts :67, :157 — all adapters. None outside.
- Provider key reads (`GEMINI_API_KEY|PHOTOROOM_API_KEY|GOOGLE_TRANSLATE_API_KEY`): google-translate.ts :55, photoroom.ts :46, gemini.ts :63, :152, gateway.ts :60-:63 (the key-check table). None outside src/server/ai/.
- Stand-in reads (`standInMode(`): gateway.ts :195, :415; stand-in.ts :12 (the definition); src/server/geo/geocode.ts :72 (`E2E_FAKE_GEOCODE` — not an AI call, outside the census by DEC-249).
- `has_permission` read in a route by `.rpc`: none; only user-client.ts :154 (`callerHasPermission`, the one staff check).
- Hand-rolled bearer / Authorization reads: user-client.ts :72 (the boundary's), route-client.ts :105, :219 (the client's), src/integrations/supabase/{auth-attacher.ts :12, client.ts :23, auth-middleware.ts :24, :78, client.server.ts :50} (the vendor seams). None in a route.
- Hand-rolled answer parses (`.json()` outside the adapters and route-client.ts): user-client.ts :247 (`readJsonBody`, the boundary's), src/server/geo/geocode.ts :115 (the geocoder seam), src/features/admin/translations/use-translations.ts :387 (a cast parse of a same-origin JSON file — outside SCOPE, reported), src/i18n/bundle.ts :105 and src/i18n/provider.tsx :199 (cast parses — outside SCOPE, reported), src/routes/__root.tsx :128 (INC-863's server function, allowlisted), src/routes/api/admin/categories/suggest-icon.ts :85 (re-reads the boundary's own serverError envelope).
- Raw `error.message` or provider text placed in a reply: src/routes/api/listings/identity.ts :179 and src/server/door.ts :46 pass a door message through `doorRefusal` (which answers the door's code, not the text) — no raw text reaches a body. translate.ts places none (TRR-5, TRR-6 assert the provider's and Postgres's texts are absent).
- Inside SCOPE, left as today by the behaviour contract: translate.ts's flag read-back ignores an `admin_list_translations` error, so a failed read reports `flagged: 0` as a success. This is F4 phantom success; it is today's code, kept, and owed its own tracked item (H — no known-error debt).
- From the review's greps: provider hosts outside src/server/ai/ — only fonts.googleapis.com in src/routes/__root.tsx :271/:284/:288 (not a provider). Key or stand-in flag names outside ai/ — stand-in.ts :13 (the mechanism) and comments in media/background.ts :24, listings/assist.ts :52, listings/identity.ts :59. Raw `error.message` near replies — seller.ts :58 and feed.ts :78, read only to classify; every other hit is logged, not echoed. Deadline detection copied locally — gemini.ts :96/:210, photoroom.ts :73, the new google-translate.ts `isDeadline` (section 10, item 14 a).

## 7. Allowlists and guards

Non-comment, non-blank lines, BASE → now (`git show 7b3633cb:<file>` vs the file; eslint: the quoted lines between the ROUTES-BOUNDARY-IGNORES markers):

| Allowlist | Before | After | Line removed |
| --- | --- | --- | --- |
| scripts/conformance/routes-allowlist.txt | 11 | 10 | translate.ts (INC-861), with its `# INC-861` section comment |
| scripts/conformance/has-permission-allowlist.txt | 1 | 0 | translate.ts (INC-861) |
| scripts/conformance/route-client-allowlist.txt | 9 | 8 | translations-service.ts (INC-861); RCG-4's INC set `["INC-875"]` |
| scripts/conformance/ai-gateway-allowlist.txt | 1 | 0 | translate.ts (INC-876); its header comment now says the file is empty |
| scripts/conformance/vendor-seams-allowlist.txt | 67 | 66 | translate.ts (INC-877) — translate.ts no longer imports the vendor (translations-service.ts keeps its line: it still reads Supabase RPCs directly) |
| eslint.config.js ROUTES-BOUNDARY-IGNORES | 11 | 10 | `"src/routes/api/translate.ts", // until INC-861` |

No new allowlist line. Guard self-tests run in the unit suite: GWC-5/7/8/9 planted, CF-RT-4/6/7 planted, RCG-3 planted, VS-3 planted — all green. CF-RT-5 (the lint ignore list equals the allowlist) green.

## 8. Strings

None (FLAGS no-new-string). `git diff --name-only 7b3633cb -- src/i18n supabase | wc -l` → 0; the console's codes map to existing keys (admin.translations.error.permission, .stepUp, .scope, .baseLocked, .generic). The i18n usage maps moved only their `scanned` count (559 → 562, the three new source files) and were committed (1de068e).

## 9. Migrations

None (FLAGS no-migration). `git diff --name-only 7b3633cb -- supabase` → nothing; check-migrations.sh not needed (land.ts runs it only when supabase/migrations/ changes).

## 10. Departures

Each difference from the brief, with its reason (rulings R1–R5 are the brief's own text; stop 1 is their record):

1. **Undeclared throws** inside the handler now get defineRoute's 500 `{error:"server error", incident}` (the boundary's outer catch) instead of today's 500 `internal error`. Every other staff route behaves this way since turn 15. The review counted it inside BC-1. The reachable case (a failed scope read) was brought back to today's answer; this outer-catch case is the boundary's and stays — for the supervisor to rule if it is not covered by "the caller answers … and the shared boundary's laws".
2. **`gate: true` on a gate read that throws** (gateway.ts): R2 names AIG-13 (the gate read throws) as a gate answer, so aiCall now catches a throw from `aiGate` itself, logs `gate unreadable: <text>` and answers off/unavailable with the mark. Before, a throw fell to the outer catch (unavailable, no mark).
3. **The gateway checks a translation's material** (`translationMaterial`, gateway.ts): a target code, at most 100 texts and every text a string; anything else is `unavailable` with one log line. The brief states the shape (CHANGE 2) but not where it is checked. The review called the first version incomplete (no element check) and its read a sentinel default; both were fixed in da1aa9c. The review notes this provider-specific check sits in the generic gateway (MINOR), not as a per-task material guard.
4. **`translationLanguages()` returns `fake`**, so the route can skip the target check "unless the stand-in" without reading a stand-in flag itself (GWC-2/6 forbid that outside src/server/ai/).
5. **Shared definitions:** `TRANSLATION_TARGET` (tasks.ts) is the schema's `TRANSLATE_TARGET` (one regex), and `TranslateReason` lives in src/lib/schemas/translate.ts (the route uses it; the client imports it as a type only).
6. **Words for strict keys:** an unknown top-level key answers `invalid json body`, an unknown item key `invalid item shape` (the brief accepts strict keys but names no word).
7. **New log lines:** a writer refusal logs `writer <key>: <text>` as the brief requires, and a failed chunk logs `translation chunk <n>: <reason> [status]`. Both are `[ssr-error]` lines the CI census will read (non-gating, DEC-083); the seven E2E tests produced none.
8. **Extra tests** beyond the brief's ids: TRR-6b (the flag read-back of the behaviour contract) and TRS-3 (CHANGE 5's shape guards). The changelog names TRS-1…3 and not TRR-6b, which is covered here.
9. **INC-829** (translate.test.ts): re-pointed at the adapter. Its URL and header assertions are kept; the old route-level `{done:1,…}` answer and the GET-then-POST through the route are now proven in translate.route.test.ts. The first wording of its comment ("the assertion is unchanged") overstated this and was corrected in da1aa9c.
10. **The i18n maps** were committed at THE CHECKS (1de068e), not with Part B or C where the three new source files moved their `scanned` count — against HOW TO WORK's "commit both maps with that change" (review MINOR).
11. **The roadmap tick** was written in Part F as the brief orders, before the review. Its "last code commit eb0a9a9" is the last code commit before the review fixes (da1aa9c); its unit totals equal the final run's.
12. **Tool use:**
    - STEP 0's roadmap edits (both turns) and Part B's block move ran as bun scripts from the scratchpad. The move had to be by script; the roadmap edits should have used the editing tool.
    - The Bash guard refused three commands: a heredoc and a grep, on the word "at" read as scheduling (false positives — the same edits were then made with the editing tool), and an empty inline-interpreter stub I typed by mistake (nothing ran). No refusal was worked around for the same action.
    - The reviewer reports the guard refused its own scratch probe of zod's issue order.
13. **Casts left in tests:** `Route.options as unknown as …` in translate.route.test.ts follows every route test's pattern (the route's typed options do not expose `server.handlers`). The AIG-38 cast and the adapter's `(error as …)` cast were removed in da1aa9c.
14. **Review MINORs left as they are, reported:**
    - (a) The adapter's `isDeadline` is one more local copy of deadline detection (siblings: gemini.ts :96/:210, photoroom.ts :73, upstream.ts :37) — K2, for the gateway's next item.
    - (b) Worded refusals go out as `ok({error}, {status})`, because `clientError` types neither 422/502/503 nor sentences; suggest-icon and generate-image do the same — a mechanism gap.
    - (c) The language list's `?target=en` (the English names) is today's URL, moved. It is a literal language code beyond K4's named exception (`source=en`); the supervisor may record it.
    - (d) The model output is `z.array(z.string().nullable())` with no per-string bound (as today; the writer validates placeholders).
    - (e) TRR-8's language-request half cannot fail once the adapter's process cache is warm; the scope-read assertion carries the proof. TRR-2's no-provider-call proof depends on running before the cache fills.
    - (f) RCG-4's title still says "the known two" while its INC set is now one (title untouched).
    - (g) The flag read-back ignores its error (today's code, kept by the contract) — section 6.
    - (h) The audit hash for a translation call covers an empty rendered text (CHANGE 2 gives the task no fields) — section 12.
15. **No other departure.** Every STOP and ruling in the turn: stop 1 (v1 brief) → rulings R1–R5 in this v2 brief.

## 11. CI

`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6` (fetched just before this report's commit):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `7b3633cb777afb1b9f79c94a410bcf7698d301a6` (short `7b3633c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-25T11:28:51Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40187325610
```

Two-step check: (1) SUCCESS; (2) the reported commit is 7b3633cb = BASE (stop 1's landing) — CI green on BASE. When read at Part A and again before Part C, the newest runs were on 1993fbf6 and f326ab98 (both SUCCESS), so BASE's run had not yet reported. This landing's run has not completed.

## 12. Limits

- CI on BASE and on this landing not yet read (section 11); the supervisor judges the run.
- No real Google Translate call was made (no provider key in this environment, by rule): the adapter is proven against stubbed responses (AIG-37…44, INC-829) and fake mode end to end; the real v2 service's behaviour with the masked spans is as documented at U4c, not re-observed.
- The `[ssr-error]` count is from the local run's webServer output for the seven test ids only; CI's server-error census covers every lane.
- TR-25 ran on desktop-1280 only (its own skip on mobile-360).
- The review fixes' new assertions (TRR-2's failed scope read; TRR-8's two order cases) were not run red against the pre-fix code; only the reviewer's reasoning says that code got them wrong.
- The reviewer's two zod issue-order edge cases were reasoned from zod's behaviour, not run (its scratch probe was refused by the guard). Since da1aa9c the items are checked by hand, so the order no longer depends on zod's.
- The audit row's input hash for a `translation` call covers the task's rendered text, which is empty (no fields, by CHANGE 2) — every translation call records the same hash; the texts are not hashed. Reported for a later gateway item, not changed here.
