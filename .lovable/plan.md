# L21 refusal-reader — plan (no code)

Branch `lovable/refusal-reader`, base dev `a21c95595` (verified: HEAD = merge of #82). Cursor's census `scripts/conformance/refusal-readers.test.ts` is not on the base yet (rg finds no `refusal-readers` / `until L21`), so no allowlist line is removed unless the supervisor says it merged first.

## Part 1 — perks empty line (INC-1222)

Key census (`rg -o 't\("…"'`):

level-overrides-table.tsx — col.badge, col.days, col.photos, col.placement, col.scope, perks.add, perks.blankNote, perks.clear, perks.edit, perks.lead, perks.title (x2): KEEP. `empty.overridesWhy` ("No per-category perks — every category uses this level's own perks."): CHANGE to the new key.
override-dialog.tsx — col.category, col.country, col.level (x2), countryAny, admin.packages.prices.everyCategory: all KEEP (L20 wording).

`overridesWhy` readers outside locales: only level-overrides-table.tsx:188. e2e/scripts: none. Retired in en-admin.ts:1987 and am-admin.ts:1860.
New key (d): `admin.monetisation.empty.perksWhy` = "No specific perks — every market and category uses this level's own perks." (en-admin; Amharic from the supervisor). Usage maps regenerated.

## Part 2 — one reader (INC-1189), file:line, rule today -> change

1. src/lib/door-codes.ts:72,89 `CODE_SHAPE` regex -> `splitRefusal(message.trim())`; code = key when on `DOOR_CODES` (key must still be bare camelCase, kept as the list check), detail = tail or null. `CODE_SHAPE` removed. Signature and answers for real codes unchanged; door-codes.test.ts already pins them (incl. `rateLimited:<instant>`, sentences -> null).
   Note: refusal.ts imports `doorCode` and door-codes would import `splitRefusal` from refusal.ts — a cycle. To avoid it, `splitRefusal` is read through a tiny move: none. Instead I propose (i) below.
2. src/lib/door-error.ts:21,24,41 `REASON_CODE`/`CODE_HEAD` -> `splitRefusal` + known-code check (Part 3).
3. impersonation-service.ts:143-144 regex + old sentence -> `splitRefusal(text).key === "noActiveSession"`; the sentence line leaves; comment updated.
4. country-verb-dialogs.tsx:54,166 and location-verb-dialogs.tsx:253 `startsWith(code)` -> `splitRefusal(errorText(error).trim()).key === code` (stricter: `notARootX` no longer matches; no such code exists).
5. posting-service.ts:1149-1151 `includes()` -> key of `splitRefusal`. A message merely containing the word no longer counts (that is the fix).
6. use-image-failure.ts:10,38 `CODE_SHAPED` -> `doorCode`-style check via `splitRefusal` key shape. Same output for codes and sentences.
7. refusal-text.ts:17 `base()` indexOf -> `splitRefusal(reason).key`.
8. my-listing.ts:595 and legal-reader.ts:101 `split(":")[0]` -> `splitRefusal(...).key`.
9. import-dialog.tsx:203 `indexOf(":")` on the last detail segment -> `splitRefusal(last)`; same values.
10. translations-service.ts:497 — already reads through `readRefusal`; the `.message` read only shows unknown failures' text. No change (not a refusal reader); reported.
11. listings-page.tsx:317 and listing-page.tsx:216, promote-sheet.tsx:330 — through `doorCode`; follow item 1, no edit.

Other hits of the requested rg (82 filtered lines, each read): not refusal readers — field/permission/URL/phone/theme/alias/token parsing (wizard, use-edit-draft, history, calling-codes, contact-like, photo-links, phone-*, legal-markdown, theme, attributes-service:745 preset token, location-data:82 cookie, route-client:227 stream header, etc.). Cursor's: src/features/auth/mfa/mfa-service.ts:100 (text.includes on provider error), auth-service.ts:595 (via doorCode), supabase-door.ts:253. src/lib/refusal.ts:87 is the mechanism itself.

## Part 3 — a sentence is not a code (INC-1220)

Known codes: `DOOR_CODES` alone is too small — door.ts passes many codes not on it (`tooManyPhotos`, `notReady`, `notYourListing`, `illegalTransition`, `contactInNote`, posting draft reasons). Restricting all of doorRefusal to `DOOR_CODES` would turn those into `doorError` and change screens.
Proposal: keep branch 1 (bare code or `code:plainToken`, no space possible) as today; restrict branch 2 (free-text detail after the first colon) to codes on `DOOR_CODES`. "lowercaseword: some sentence" then falls to `doorError` and door.ts logs it. `rateLimited:<instant>` unchanged.
Callers of `doorRefusal`: src/server/door.ts:47 and src/routes/api/listings/identity.ts:184 (Cursor's files, unedited); posting/door-error.ts:2 re-export; e2e `doorRefusal` hits are a different helper (e2e/helpers/door-answer). Before/after for real codes: identical, except a non-listed code with free-text detail (only the hypothetical `notReady:a:b + c` in DE-test) becomes doorError; real `notReady:photos` stays.

## Tests (e)

New ids RRD-1..n (free across src/e2e/scripts):
- door-error.test.ts: RRD-1 "lowercaseword: some sentence" -> doorError; update the `notReady:a:b + c` case to a listed code.
- door-codes.test.ts: existing cases stay green (RRD-2 via splitRefusal unchanged answers).
- impersonation-service.test.ts: RRD-3 old sentence -> false.
- posting refusal-text.test.ts, legal-reader.test.ts, my-listing.test.ts, use-image-failure.test.ts: RRD-4..7 one each for the folded rule.
- monetisation-page.test.tsx: RRD-8 empty perks line draws `perksWhy`.
No compiler directives.

## e2e (f)

`noActiveSession`/`overridesWhy`: no e2e hit. `per-category`: comments and MON-6 title only, not read as text. notARoot (admin-countries.spec.ts:310-339) reads the translated words, unchanged. No spec edit needed.

## Guards (g)

test-ids (RRD free), non-null (no `!` added), forms guard (no form change), string scan (one new key), i18n usage maps (both regenerated, no file added/deleted).

## Size (h)

Source: 13 (door-codes, door-error, impersonation-service, 2 verb dialogs, posting-service, use-image-failure, refusal-text, my-listing, legal-reader, import-dialog, level-overrides-table) + 2 locale files; tests 8; maps 2. ~25 paths, 15 source — one turn.

## Different (i)

- Import cycle: door-codes.ts importing `splitRefusal` from refusal.ts, which imports door-codes. ES modules tolerate it here (functions only, called late), but I would rather inline nothing and accept the cycle only if the supervisor rules; alternative: move `splitRefusal` into a new `src/lib/refusal-split.ts` re-exported by refusal.ts (refusal.ts changes, a new file). Asking for a ruling.
- translations-service.ts left unchanged (not a reader).
