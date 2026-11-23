# Bundle 7 — a failed database call reaches its reader as the typed failure (INC-1256, Lovable's families)

Base `a14f032b6` (HEAD verified equal). Branch `lovable/next`. Plan only; nothing changed.

## (a) Files touched, each with its tests
| File | Tests |
|---|---|
| src/features/admin-categories/categories-service.ts (13) | categories-service.test.ts (+RFT-U1) |
| src/features/admin-categories/category-images-service.ts (1, :229) | category-images-service.test.ts (+RFT-U2) |
| src/features/admin-attributes/attributes-service.ts (10) | attributes-service.test.ts (+RFT-U3) |
| src/features/admin-locations/locations-service.ts (6) | locations-service.test.ts (+RFT-U4) |
| src/features/admin-countries/countries-service.ts (4) | countries-service.test.ts (+RFT-U5) |
| src/features/admin-ai/ai-service.ts (3) | ai-service.test.ts (+RFT-U6) |
| src/features/admin/nav-alerts.ts (1) | new nav-alerts.test.ts (NAL-U1) |
| src/features/posting/use-price-unit-labels.ts (1, multi-line) | new use-price-unit-labels.test.ts (PUL-U1) |
| src/lib/refusal.ts — only if ruling (e) | refusal.test.ts (+REF-PV1) |
| src/features/admin-categories/categories-service.test.ts etc. — RFT-U7 census test (h) | itself |
| docs/features/<one feature doc> — one sentence, if the ruling names it | — |

No Cursor file, no e2e, no scripts. Both i18n maps regenerated only if a file is added (two new test files are added, so yes). No strings.

## (b) One form
`if (error) throw readFailed(error);`, imported `import { readFailed } from "@/lib/reader-failure";`. The multi-line form keeps its console line: `if (error) { console.error(...); throw readFailed(error); }`.
Why: `readFailed` is the one factory (DEC-429); it passes a `ReaderError` through, classes once by `classify` (door mark, SQLSTATE, status), keeps `failure.code` = the raw `code`, and `message` = `errorText(raw)` — identical to the raw `message`, or the raw `code` when the message is empty (errorText's own fallback). Already the form of category-images-service.ts:252 and ai-service.ts:409. No status argument: none of these callers knows one beyond the error's own.

## (c) Census (definition, re-read at base)
Census method: `rg 'throw error'` with -B3 across the eight files; multi-line form found only in use-price-unit-labels.ts:18–20. No `.catch` re-throw in these files. Totals: 39 lines, 8 files — matches the task.

| File:line | Function | Readers (hook → screen) | What the reader reads | Result |
|---|---|---|---|---|
| categories-service :127 :152 :165 :176 :187 :198 :236 :242 :249 :260 :343 :351 | create/update/setCategoryWindow/setCountryExclusions/retire/addPointer/movePointer/setPrimary/removePointer/reorder/reactivate/delete | use-categories.ts → categories-page.tsx, category-dialogs.tsx; refusal via category-refusals.ts:41 `readRefusal(err, CATEGORY_REFUSALS, has)`; categories-page.tsx:791 `errorText` | message (code head via splitRefusal), name | unchanged — no provider key in family |
| categories-service :217 | listCategoryPointers | category-dialogs.tsx paths dialog (query error state) | failed flag only | unchanged |
| category-images-service :229 | acceptCategoryImage | category-image-dialog.tsx → use-image-failure.ts:26 readRefusal(CATEGORY_REFUSALS) | message (`acceptNoImage`) | unchanged |
| attributes-service :314 :323 :340 :441 :471 :486 :504 :515 :526 :559 | upsert/delete/merge/link/updateLink/readHolders/unlink/setFact/setCard/setLinkOrder | use-attributes.ts → attributes-page.tsx, attribute-dialogs.tsx:646, category-attributes-dialog.tsx; attribute-refusals.ts:67 | message | unchanged |
| locations-service :173 :182 :190 :198 :206 | upsert/setActive/move/reorder/delete | use-locations.ts → location-verb-dialogs.tsx (:258 `splitRefusal(errorText(e)).key === "notAChild"`), location-dialogs.tsx, location-editor.tsx; location-refusals.ts:77 | message; sentence `/step[ -]?up/` | unchanged |
| locations-service :228 | listAllCountries | locations-page.tsx markets query | failed flag | unchanged |
| countries-service :47 | listCountries | use-countries.ts → countries-page.tsx | failed flag | unchanged |
| countries-service :81 :100 :112 | upsert/setActive/setRootOrder | country-verb-dialogs.tsx :57 (`scopedRolesExist`), :175 (`notARoot`) via errorText; country-refusals.ts:45 | message; sentence step-up | unchanged |
| ai-service :166 :211 | listAiFeatures/listAiSpendDays | use-ai-features.ts → ai-page.tsx, ai-spend-days.tsx | failed flag / ai-refusals.ts:51 | unchanged |
| ai-service :252 | setAiFeature | ai-editor.tsx / ai-feature-form.tsx → ai-refusals.ts:51 readRefusal(AI_DOOR_REFUSALS), :57 errorText | message, sentence, **provider `P0009`** | see (d) |
| nav-alerts :28 | useNavAlerts query (legal_review_overdue) | nav-layer.ts → admin rail alert | `isError` only | unchanged |
| use-price-unit-labels :20 | usePriceUnitLabels query | listing-card.tsx, step-review.tsx, my-listings-page.tsx, my-listing-page.tsx, screening-page.tsx, Cursor's listings-page.tsx / listing-page.tsx | data null on error; no error read | unchanged |

`errorText` on a `ReaderError` returns its message (= errorText(raw)) — identical string for every reader above. No reader in these families uses `.details`, `.hint`, `instanceof`, `.code ===` on the thrown error (searched). Step-up: `StepUpCancelled`/`StepUpUnavailable` are thrown by the step-up guard, not by these calls; `gateRefusal`/`readerFailure` pass a ReaderError through. No reader of mine also reads a LEFT file except: use-price-unit-labels is read by Cursor's listings-page.tsx/listing-page.tsx (named; they read only data).

## (d) Provider-code words
Families: CATEGORY, ATTRIBUTE, LOCATION, COUNTRY, AI, ai-feature-form. Only **AI_DOOR_REFUSALS has one: `P0009` → admin.ai.error.stepUp** (ai-refusals.ts:25).
- Raw today: message empty → errorText → code head "P0009" hits words (family branch). Message "...step up..." → sentence. Any other message → provider branch → stepUp.
- Converted: empty message → ReaderError.message = "P0009" → same family branch (unchanged). Step-up sentence → unchanged. **Other message with code P0009 → hear sees no top-level `code` → generic** (difference).

## (e) Mechanism change proposed (rule before build)
`src/lib/refusal.ts` `hear` (:200–204): when the record is a `ReaderError`-shaped value (has `failure` record), `provider` = `failure.code` when the top-level `code` is absent. Read structurally (`recordOf(record["failure"])`), no import of reader-failure into refusal.ts (avoids a cycle — reader-failure imports refusal). Test REF-PV1: a `readFailed({ message: "mfa please", code: "P0009" })` read with AI_DOOR_REFUSALS answers `admin.ai.error.stepUp`, branch `provider`; and raw/typed answer the same key for each of three shapes. Every other family unaffected (no provider keys). Cursor families that may hold provider keys benefit identically.

## (f) Chunks
Already carry reader-failure: admin AI page (ai-service.ts), admin categories page (category-images-service.ts); posting wizard (posting-service, pricing-data, step-review). Would gain it (supervisor measures): admin attributes, admin locations, admin countries pages; the admin nav layer (nav-layer.ts); and **listing-card.tsx — public feed/seller pages — via use-price-unit-labels.ts**. Cost: reader-failure.ts + error-text.ts + own-key.ts (+ refusal.ts if not already present). If the public growth is unwanted, alternative: rule that use-price-unit-labels is left raw-free by other means — I await the ruling rather than choose.

## (g) Exported types
None changed. Service signatures unchanged (Promise types identical; the thrown value's type is not part of TS signatures).

## (h) Laws and guard
Base laws reading this: CF-REFUSAL-3 (no hand-built typed failure — satisfied, readFailed only); Project Knowledge "No silent catch-and-continue: a reader's door error is a typed ReaderError"; E3 refusal through refusal.ts.
Guard law for Cursor: "No client file outside src/server, src/routes/api, src/integrations re-throws a database call's raw error (`throw error` where `error` came from a `{ data, error }` call); each throws `readFailed(error)`." Meanwhile RFT-U7 (unit, in admin-categories tests folder) reads the eight files' source and fails on `throw error` / passes on `throw readFailed(error)`.

## (i) New test ids (each searched in src, e2e, scripts: 0 hits)
RFT-U1 … RFT-U7, NAL-U1, PUL-U1, REF-PV1 (only if (e) ruled). Each service test: a mocked failed call `{ message: "notARoot", code: "P0001" }` → rejects with ReaderError, `failure.code === "P0001"`, `message === "notARoot"`.

## (j) Browser specs reading these words
e2e/admin-countries.spec.ts:310–336 (`admin.countries.error.notARoot`, CO-6). Supervisor to re-check others by key: scopedRolesExist, notAChild, locations/categories/attributes refusal keys, admin.ai.error.stepUp (none found by my search for P0009/stepUp).

## (k) Open points
1. The P0009 difference in (d) needs (e) or an accepted change.
2. Public listing-card chunk growth (f) is a named cause the supervisor must accept.
3. use-price-unit-labels is in posting/, read by two Cursor files — touching it is within my 8 but its readers include Cursor's; no edit to theirs.
4. Whole scripts suite: expected sandbox reds as listed; any other red stops me.

## Build sequence (one turn)
1. (e) if ruled, with REF-PV1. 2. Convert 39 lines. 3. Tests RFT/NAL/PUL. 4. Run touched src folders + src/lib, maps, Prettier, ESLint, whole scripts suite. 5. Write-back platform paths from `a14f032b6`, two empty proofs, commit, stop.
