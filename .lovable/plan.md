# L1 import-reason-words — plan

## HEAD
`ece9eae77491d6ed641e3a7f956b1ae96347bbb4`. Nothing has changed yet.

## FILES (each with its test)
- `src/features/admin/import-dialog.tsx`: the one change. Its test is new, `src/features/admin/import-dialog.test.tsx`; there is no test beside the dialog today.
- `src/i18n/locales/en-admin.ts`: four new keys. These are covered by the dialog test and by `bun run i18n:usage`.
- `src/i18n/locales/am-admin.ts`: the same four keys, with the supervisor's Amharic pasted byte for byte.
- The two generated usage maps, only if `bun run i18n:usage` rewrites them.
- Last step of the build: `git checkout ece9eae77 -- .lovable/plan.md`.

## MECHANISM FOUND
- The search for `ImportDialog` finds the shared dialog and exactly the four consumers in the brief: categories, attributes, locations and countries. There is no other renderer.
- `reasonOf` (import-dialog.tsx:231–238) reads the code through `readRefusal` with `refusals`. Only the `family` and `doorKey` branches draw words; every other code draws as `code` or `code — detail`.
- `refusals` defaults to `ADMIN_REFUSALS` (line 143). That holds only `rateLimited` (src/lib/refusal-tail.ts:23), so the four codes in the brief draw bare.
- The change adds one shared set, `IMPORT_REFUSAL_WORDS`, in the dialog. It maps `planHasRefusals`, `batchAlreadyUndone`, `undoBlocked` and `unknownBatch` to the new keys.
- The dialog then reads through one family. Its words, in rising priority, are: `ADMIN_REFUSALS.words`, then the shared import words, then the words in the dialog's own `refusals`. Its `generic` and `sentences` come from the dialog's own `refusals`.
- A dialog's own words therefore win for their codes (behaviour 4). The reader stays the same and no mapper is added.
- `undoBlocked:hasRows` resolves by its code. The key's English has no `{detail}`, so the detail is not drawn.

## THE CODES WITH THEIR OWN ERROR LINE (`failed`, import-dialog.tsx:240–254)
| Line | Condition | Error line |
|---|---|---|
| 243 | status 403 | error.denied |
| 244 | status 428 | error.stepUp |
| 245 | `wrongFile` | error.wrongFile |
| 246 | 409 + `fileChanged` | error.fileChanged |
| 247–248 | `importRunning`, or 409 + `import already running` | error.busy |
| 249 | 413, or `fileTooLarge` | error.tooLarge |
| 250 | `tooManyRows` | error.tooManyRows |
| 251 | `badHeader` | error.badHeader |
| 252 | `emptyFile` | error.emptyFile |

- Each of these conditions now clears the reason line: `setReason(null)`.
- The reason is set only on the fall-through to `error.failed` (line 253).
- `failed({}, 0)` at line 259 already draws no reason, and that does not change.

## NEW KEYS (admin layer, `en-admin.ts`; the `admin.import.` prefix is free by search)
- `admin.import.reason.planHasRefusals`: "The file still has refused rows. Fix them and preview again."
- `admin.import.reason.batchAlreadyUndone`: "That import has already been undone."
- `admin.import.reason.undoBlocked`: "This import can no longer be undone: something added since depends on what it created."
- `admin.import.reason.unknownBatch`: "That import is no longer on record."

The Amharic comes from the supervisor. The `admin.locations.import.reason.*` keys that the preview's row list reads (en-admin.ts:1696, 1698) are not edited.

## TESTS (`IRW-` is free by search in src, scripts and e2e)
- IRW-1…4: each of the four codes draws its English on the reason line. IRW-3 uses `undoBlocked` with detail `hasRows`, and the detail is not drawn.
- IRW-5: each code or status in the table above draws its own error line and no reason line.
- IRW-6: an unknown code draws as `code — detail`.
- IRW-7: a dialog's own `refusals` that names `planHasRefusals` wins over the shared words.

Every test drives the commit or undo answer through a mocked `callRoute`. No real row is used.

## CONFLICTS with Knowledge or AGENTS.md
- None for the code change.
- `roadmap.md` is a ledger I may not touch, so this task is not recorded there. The supervisor holds that record.
- First download: only the admin pages that load the dialog's chunk grow, by four strings and a few lines of code. Each size goes in the build report. No public page changes.

## SIBLINGS (K2, reported only)
- `src/features/admin-locations/location-refusals.ts:15–16` says that `unknownBatch` and `undoBlocked` have no words and draw the generic line. That comment goes stale after this change, but the file is out of scope.
- `src/features/admin-locations/location-import-dialog.tsx:57` lists `planHasRefusals` among its preview reason keys, under its own family. It is left as it is.
