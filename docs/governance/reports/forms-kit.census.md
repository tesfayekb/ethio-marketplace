# forms-kit — STEP 1, the re-validation census

The plan (`docs/governance/reports/f2-forms.stop-1.md`, base `7c89b1f60`) read against today's tree:
`cursor/forms-kit` at `c526dd84b` (STEP 0's commit on `origin/dev` `b26e3b34f`, the merge of pull
request #41; the brief's base `50ee2e698` differs from it only by the records turn R14's files —
`docs/**`, `roadmap.md`, `scripts/conformance/briefs-allowlist.txt` — none of them code). Every
count below comes from a command run in this turn: the control walk is
`scripts/conformance/forms.ts` (this turn's census, which Part B's guard reuses; an AST walk of every
non-test `.ts`/`.tsx` under `src/`), run by a scratch runner under `/tmp/ethio-scratch/forms-kit/`;
everything else is `rg`, `git` and the base build. dev's CI at `b26e3b34f`: run 43553591107
SUCCESS (records only; the code tree is `50ee2e698`'s, run 43534468973 SUCCESS).

No STOP case holds (a / b / c of STEP 1): every decision of ruling 1 holds on today's tree except
the half of `needsLeaf` named under premises (a spec's assertion, which the GO's DECIDE-AND-NAME
clause routes to LEFT, not to a stop); no public page passes its ceiling by the kit (the kit moves
posting's field code OFF `/auth` and `/legal/accept`, below); no file outside SCOPE is needed (the
two route files that import the worder keep their import through a re-export, below).

## CENSUS-ITEM consumers

The walk's tag list is the plan's (`input|Input|PasswordInput|select|NativeSelect|textarea|Textarea|Checkbox|Switch|RadioGroupItem|InputOTP|Slider`).
Today: **246 controls in 75 consumer files** (the control primitives and the kit excluded) — 16
inside the one `Field`, 94 inside `FormField`, 106 bare, and 30 exempt by kind under DEC-338
(17 list filters, 5 file inputs, 5 table chrome, 3 search boxes). The plan's 249 counted the four
primitive definitions; leaving them out it was 245 in 74 files.

Rows changed since `7c89b1f60` (per-file totals compared by script with §1.2's table):

| file | plan | today |
| --- | --- | --- |
| `src/features/admin-listings/tier-dialog.tsx` | (did not exist) | 1 control, inside `FormField` |

Every other row's total is unchanged. What changed is the classification DEC-338 adds (ruling 1
item 3, after the plan): 17 controls the plan called "bare filters" are exempt by kind — each sits
in a `TableToolbar` / `ToolbarPanel` or is handed to a `toolbar` / `search` prop — and the three
`type="search"` boxes (`app-header.tsx` ×2, `my-listings-page.tsx`) are search boxes by kind.

Two list filters are drawn in a file apart from their toolbar, so a one-file census cannot see
their kind: `src/features/admin-locations/locations-toolbar.tsx:36` (the country filter) and
`src/features/admin-ai/ai-spend-days.tsx:55` (the feature picker of the spend report). Both are
outside SCOPE; they are CF-FORM-1 allowlist lines with that reason (wave 3), named in §10.

The mappers of CF-FORM-3, recounted by name (a function named `*ErrorKey`, `*ErrorLine`,
`use*Error`, `use*Failure`, `*RefusalKey`, or a local equivalent — a function from `error`/
`message`/`err`/`failure` to a `MessageKey` — that does not read through `readRefusal`): **36 in
33 files**. `*ErrorKey` 19 (aiErrorKey, countryErrorKey, editErrorKey, settingsErrorKey,
moveErrorKey, photoRemoveErrorKey, tierErrorKey, undoErrorKey, locationErrorKey,
monetisationErrorKey, photoChangeErrorKey, photoAllowErrorKey, legalErrorKey, roleErrorKey,
translationErrorKey, profileEditErrorKey, toErrorKey, actionErrorKey, readErrorKey); `*ErrorLine`
5 (AttributeErrorLine, `ErrorLine` in category-dialogs, CountryErrorLine, LocationErrorLine,
MonetisationErrorLine); `use*Error` 5 (useAttributeError, useSubmitError, useCountryError,
useLocationError, useMonetisationError); `use*Failure` 1 (useImageFailure,
category-image-dialog.tsx:30 — housekeeping 1's fifth reader); `*RefusalKey` 4 (posting's
draftRefusalKey, photoRefusalKey, backgroundRefusalKey; promoteRefusalKey); local equivalents 2
(`stepUpAbortKey` mfa-service.ts:139, and the two-factor service's `failure` mfa-service.ts:103 —
INC-1147's class 1). New since the plan: `promoteRefusalKey` (promote-service.ts:212),
`readErrorKey` (promote-sheet.tsx:328); `category-submit-error.ts` and `attribute-error.ts`
(housekeeping 1 moved `useSubmitError` / `useAttributeError` there).

The other laws today: CF-FORM-2 7 `<form>` in 4 files, none with `noValidate` (as the plan);
CF-FORM-4 3 (numberOrZero — now `country-dialog-state.ts:25`; `amount-scale.ts:16`, step-pricing's
`""→"0"` moved there, a branch no input reaches since `scaleAmount` returns null on a blank first;
`step-specifications.tsx:1425`, a `Number` of a typed control's value); CF-FORM-5 7 in 6 files
(the five local `fieldClass` and field-refusals.ts's `fieldControlClass` / `controlClass`).
`typedDefault`'s NaN (`attribute-link-cells.tsx:24`) is a parse of a value handed in, not a
control's own value: the census does not see it (a stated limit), and wave 3 folds it with its file.

## CENSUS-ITEM definition

The concern's definition ("every control a person types or chooses into") is wider than the tag
list. Control kinds the tags do not name, each read with `rg`: `DateField`
(`src/components/shell/date-field.tsx`, a button-driven date — inside `Field` in step-review and
step-specifications, bare in the admin filters and the price dialogs), `PhoneNumberField`
(`src/features/posting/phone-number-field.tsx` — an `<input>` and a `role="combobox"` input, both
walked as tags in its own file), the currency picker in step-pricing (`role="combobox"` on an
`<input>` — walked), `SearchablePicker` (its own input walked), `AgreeToDocument` (a `Checkbox` —
walked). The difference: `DateField` alone draws no tag the walk reads (its trigger is a button);
it is counted where it is used (9 uses in 6 files at the plan; inside `Field` on both posting
steps). The radix `RadioGroup`, `Toggle`, `ToggleGroup` and `InputOTP` primitives exist under
`src/components/ui/`; `RadioGroupItem` and `InputOTP` have no consumer today (the step-up code is an
`Input`).

## CENSUS-ITEM tests

Each wave-1 file's own tests, by their real names:
- `src/features/posting/field.tsx` — none of its own; `src/features/posting/field.test.ts` tests
  `field-refusals.ts` (summaryRefusals, summaryLabel; no ids). `src/features/posting/step-pricing.test.tsx`
  (SPR-1) reads `post-field` / `post-field-refusal`.
- `step-where.tsx` — `step-where.test.tsx` (PW-110 ×4 a case group, P6, W1, W2 ×2, SWR-1, SWR-2),
  `step-where-no-map.test.tsx`, `step-where-order.test.tsx`.
- `step-who.tsx` — `step-who.test.tsx` (D231, SWO-1, PLF-1).
- `step-category.tsx` — none of its own.
- `step-photos.tsx` — `step-photos.test.tsx` (two untitled-id tests).
- `step-review.tsx` — `step-review.test.tsx` (RV-1, D218 ×5).
- `wizard.tsx` — `wizard-guide.test.ts`, `queued-next.test.ts` (no Next-gate case).
- `agree-to-document.tsx` — `agree-to-document.test.tsx` (seven untitled-id tests, the D235
  sentence census).
- `src/lib/refusal-tail.ts` — `refusal-tail.test.ts` (nine untitled-id tests).
- `src/features/posting/door-error.ts` — `door-error.test.ts` (four).
- `src/lib/whole-number.ts` — `whole-number.test.ts` (WN-1).
- `src/lib/door-codes.ts` — `door-codes.test.ts` (DRC-1 … DRC-7).

The next id of each family the turn adds to: the four new families are free in `src/`, `e2e/` and
`scripts/` (grep of `it(`/`test(` titles): FKF-1 (the Field), FKG-1 (the gate), RFR-1 (the reader),
PIP-1 (the parser), CF-FORM-1 … CF-FORM-5 (the guard; the five laws' own ids, each with a planted
proof). No existing family is extended.

The e2e ids whose bodies read `post-field`, `post-field-refusal` or `post-refusal-summary` (a
script over every spec's test bodies): AL-21 (`admin-listings`), MLA-13 (`my-listings-ad`), PW-121
(`post-wizard-bundle2`), PW-78, PW-80 (`post-wizard-place`), PW-10, PW-66, PW-68, PW-138, PW-162,
PW-192, LY-6 (`post-wizard-pricing`), PW-72, PW-79 (`post-wizard-resets`), PW-16, PW-18, PW-70,
PW-75, PW-77, PW-191 (`post-wizard-specs`) — 20 ids in 7 specs. They read `data-field="post-title"`
and `data-field="post-attr-<key>"`: the control's anchor id, not the door's field name (premises).
The a11y ids of the wizard's steps: A11Y-1, A11Y-2 (`e2e/a11y.spec.ts`; steps 1, 3 and 5). The
legal-certify ids of the steps: LGC-1, LGC-2, LGC-5 (`e2e/legal-certify.spec.ts`), with LG-15 …
LG-33 reading the doors only. The agreement control's other consumers: `e2e/auth-signup.spec.ts`
(the sign-up tick, `data-closed` at :397) and `e2e/legal-accept.spec.ts` (:159, :170). The step
specs the moved controls live under: `post-wizard-where.spec.ts` (reads the element id
`#post-where-region` at :808 and :841), `post-wizard-place.spec.ts`, `post-wizard-category.spec.ts`
(PW-1 asserts the step-1 Next `toBeDisabled()` — premises), `post-wizard-finder.spec.ts`,
`photo-pipeline.spec.ts` (PP-11, PP-19 assert the step-2 Next `toBeDisabled` while a photo is held
or sent — DEC-337 keeps those).

## CENSUS-ITEM lists

- The guard's allowlist `scripts/conformance/forms-allowlist.txt` (new), seeded from this census:
  one line per law and file, keyed `<law> <file> (<count>)`, so a count can only fall (a smaller
  count makes the old key stale, which fails). At the seed: CF-FORM-1 57 files (200 controls),
  CF-FORM-2 4, CF-FORM-3 33, CF-FORM-4 3, CF-FORM-5 6 — 103 lines before Part C retires the wave-1
  ones. `until`: `DEC-339` on every line (the allowlist grammar takes a date or a record id; the
  wave rides in the reason: "wave 2 — …", "wave 3 — …", "wave 4 — …"), INC-1147 on the two-factor
  mapper's line.
- `scripts/conformance/wired.test.ts`: the guard is wired by being a `*.test.ts` under
  `scripts/conformance/`; its allowlist joins the kit's grammar through `readAllowlist`.
- The bundle allowlists: `scripts/route-budgets.mjs` (the ceilings), `scripts/check-bundle-size.mjs`
  (the entry), the shared-shell module list (DEC-362). The kit lands outside the entry (posting,
  legal and auth pages only); no list is expected to move — the build decides.
- `docs/tracking/intentional-deletions.txt`: `src/components/ui/form.tsx` joins it (zero importers;
  `rg` over `src`, `e2e`, `scripts`).
- `scripts/conformance/non-null-allowlist.txt:106` `src/features/posting/field.tsx (1)` — the
  `entry.owner!` in `RefusalSummary`; the line falls to nothing when the re-export lands.
- The register: rows 14, 15, 121 (whole-number) and 27 name the concern; the new rows go to §14.

## CENSUS-ITEM old-file-readers

- `src/features/posting/field.tsx` by path: `scripts/conformance/non-null-allowlist.txt:106`;
  `src/components/ui/native-select.tsx:12` (a comment naming `controlClass in features/posting/field.tsx`
  — outside SCOPE, a K2 note); `.cursor/rules/12-ui.mdc` §Forms (read only); docs
  (`docs/features/posting.md`, `docs/governance/mechanisms.md`, `docs/governance/layout-primitives.md`
  and older briefs/reports, records only). By import: the ten importers (wizard, step-details,
  step-photos, step-review, step-specifications, step-pricing, step-category, step-where,
  step-who, agree-to-document).
- `src/lib/refusal-tail.ts`: `src/lib/refusal-tail.test.ts`, `src/server/imports/route.ts`
  (`DOOR_KEY`, `splitRefusal`), `src/features/admin-categories/category-submit-error.ts`
  (`doorKeyText`), `src/features/admin-attributes/attribute-error.ts` (`fillRefusal`,
  `splitRefusal`), `src/features/admin/import-dialog.tsx` (`doorKeyText`); docs
  (`docs/features/categories.md`, `docs/features/attributes.md`). Three of the importers are outside
  SCOPE: `refusal-tail.ts` folds into the reader and stays as a re-export of it so they do not move.
- `src/components/ui/form.tsx`: no importer; docs only (records).
- `src/features/posting/door-error.ts` (the worder that moves): `src/server/door.ts` (INC-1050),
  `src/routes/api/listings/identity.ts:5`, `src/routes/api/listings/draft.ts:4`, its own test.

## CENSUS-ITEM second-readers

No dynamic `import()`, `loadOnce` or `vi.mock` names `posting/field`, `field-refusals`,
`refusal-tail`, `door-error`, `ui/form`, `refusal-text`, `whole-number`, `agree-to-document`,
`door-codes` or `form-section` (`rg` over `src`, `e2e`, `scripts`).

## CENSUS-ITEM chunk-graph

At the base (the build's own record `dist/.chunk-modules.json`, read by a scratch script):

| module | chunk (gz KiB) | pages whose first download carries it |
| --- | --- | --- |
| `src/features/posting/field.tsx`, `field-refusals.ts`, `types.ts`, `src/lib/dials.ts`, `src/features/legal/agree-to-document.tsx` | `agree-to-document-*.js` (3.6) | `/auth`, `/legal/accept`, `/post`, `/post_/$listingId`, `/my-listings`, `/my-listings_/$listingId`, `/my-listings_/$listingId_/edit`, `/admin/listings_/$listingId_/edit` |
| `src/features/posting/refusal-text.ts` | `refusal-text-*.js` (1.4) | the above and `/`, `/$name`, `/c/$slug`, `/l/$slug`, `/account_/saved`, `/dev/style`, and four admin pages — every importer of its `fill` (finding 1) |
| `src/lib/refusal-tail.ts` | `category-dialogs-*.js` (7.9) | eight admin pages |
| `src/lib/door-codes.ts` | the entry | every page |

`/auth` and `/legal/accept` (the public sign-up and the acceptance screen) download posting's
`field.tsx`, its `types.ts` (the step table) and `dials.ts` only because `AgreeToDocument` imports
`RequiredMark` from `src/features/posting/field.tsx`. After: the Field, the gate and the reader's
core land in the kit's own chunk(s) beside their importers; `AgreeToDocument` imports the kit, so
those two pages stop carrying posting's field module; each family's code map stays in its family's
chunk (posting's in `refusal-text`). The entry's closure: unchanged by design (nothing on the
first-paint path imports the kit); measured after the build in §5 of the report.

## CENSUS-ITEM environments

The reader `src/lib/refusal.ts` and the one `Refusal` shape are imported by the client (the kit,
the wizard, posting's services) and by the server (`src/server/answer.ts` re-exports the type;
`src/server/door.ts` and the two listing routes reach the worder). The reader imports only
`src/lib/door-codes.ts`, `src/lib/own-key.ts` and the i18n catalogue's types (type-only); the
worder (`src/lib/door-error.ts`, moved) imports only the `Refusal` type. No `src/server/**` and no
`*.server.ts` module is reachable from either (proven after the build by the client chunks'
module record: no `src/server/` path in any client chunk — §5).

## CENSUS-ITEM mechanisms

The plan's §1.1 at today's lines: `Field` `src/features/posting/field.tsx:42` (still no aria pair,
refusal `<p>` with no id); `RefusalSummary` field.tsx:101; `RequiredMark` field.tsx:30;
`reportMissing` `src/features/posting/wizard.tsx:264`; the mirror's `tried` :300, `triedRefusals`
:304; `focusFirstRefusal` `src/features/posting/field-refusals.ts:194`, `fieldTarget` :128 (five id
shapes), `controlClass` :113, `fieldControlClass` :99, `FIELD_LABEL_KEYS` :11, `FIELD_STEPS` :55;
`needsLeaf` wizard.tsx:527 (Next `disabled` :1384, the Enter path :1484, `triedWithoutLeaf` :558);
`photosBlockNext` :530, `photosSendingNow` :536; `certifyClosed` :904; `FormField`
`src/components/shell/form-section.tsx:26`; the dead `src/components/ui/form.tsx`; the local
read-only `Field` `src/features/admin/users/user-detail.tsx:565`; `splitRefusal`
`src/lib/refusal-tail.ts:13`, `fillRefusal` :24, `RATE_LIMITED_KEY` :43, `DOOR_KEY` :46,
`doorKeyText` :56; `doorRefusal` `src/features/posting/door-error.ts:24`, `doorErrorDetail` :11;
`refusalsOf` ×3 — `src/features/posting/posting-service.ts:38`, `src/features/my-listings/my-listing.ts:608`,
`src/features/admin-listings/use-admin-listing.ts:200`; `RouteAnswer` `src/lib/route-client.ts:6`;
posting's maps `src/features/posting/refusal-text.ts` (`draftRefusalKey` :154, `photoRefusalKey`
:159, `backgroundRefusalKey` :149, `fieldAwareRefusal` :168, `refusalFor` :176, `fill` :185);
`wholeNumber` `src/lib/whole-number.ts:5` (register row 121: "Foundations 2's form kit takes it as
the kit's number read"); `NativeSelect`'s `look="form"` (`src/components/ui/native-select.tsx`,
S6-2 ruling 1: the posting selects take the form kit's class whole); `DIALOG_FIELD`
(`src/components/ui/dialog-look.ts:71`, the dialogs' pressed-in look).

`src/lib/door-codes.ts` read whole (98 lines): `DOOR_CODES` (5 gate codes, 3 account-door codes,
12 P-2 codes, 4 reach codes — 24), `DoorCode`, `DOOR_REFUSED_KEY = "door.refused"`, `doorCode(input)`
reading a string, an error's `message`, or the shell's envelope's first `refusals[]` entry, into
`{ code, detail }` (an unknown or sentence-shaped message → `{ null, null }`). It carries no words:
each family maps a code to its key (Promote: `promoteRefusalKey`). The reader's door branch calls
`doorCode` and takes the family's map for the words.

## CENSUS-ITEM first-download

From this turn's own lock-exact build at the base (`bun install --frozen-lockfile` — no changes;
`bun run build && node scripts/check-bundle-size.mjs`, exit 0): entry JS 203.9 / 205 KiB, CSS
22.6 / 40. Every page (KiB / ceiling): `/` 225.4/227 · `/$name` 223.4/225 · `/account` 266.1/268 ·
`/account_/legal` 206.4/208 · `/account_/legal_/$versionId` 207.1/209 · `/account_/saved`
223.6/225 · `/admin` 208.3/210 · `/admin/` 209.1/211 · `/admin/ai` 322.9/324 · `/admin/attributes`
336.1/337 · `/admin/audit` 294.2/295 · `/admin/categories` 344.1/345 · `/admin/countries`
325.7/327 · `/admin/images` 208.9/210 · `/admin/impersonation_/$sessionId` 291.7/293 ·
`/admin/legal` 281.1/282 · `/admin/legal_/$versionId` 278.1/279 · `/admin/legal_/edit` 280.2/281 ·
`/admin/listings` 348.3/349 · `/admin/listings_/$listingId` 351.2/352 ·
`/admin/listings_/$listingId_/edit` 408.1/410 · `/admin/locations` 269.9/271 ·
`/admin/monetisation` 333.5/334 · `/admin/places` 327.3/328 · `/admin/roles` 292.0/293 ·
`/admin/roles_/$roleId` 272.5/273 · `/admin/screening` 368.2/369 · `/admin/translations`
303.0/304 · `/admin/translations_/$lang` 306.4/307 · `/admin/users` 292.1/293 ·
`/admin/users_/$userId` 288.3/289 · `/auth` 220.5/223 · `/auth_/callback` 207.4/209 ·
`/auth_/reset` 209.3/211 · `/c/$slug` 225.4/227 · `/dev/primitives` 225.3/226 · `/dev/style`
246.6/248 · `/dev/tall` 204.2/206 · `/l/$slug` 256.0/257 · `/legal/$kind` 208.6/210 ·
`/legal/accept` 215.5/217 · `/legal/publishing` 209.3/211 · `/my-listings` 313.0/315 ·
`/my-listings_/$listingId` 321.7/323 · `/my-listings_/$listingId_/edit` 400.3/402 · `/post`
400.3/402 · `/post_/$listingId` 400.3/402 · `/privacy` 208.6/210 · `/settings` 274.5/277 ·
`/terms` 208.6/210. Room on the pages the kit reaches: `/post` and `/post_/$listingId` 1.7 KiB,
`/my-listings_/$listingId_/edit` 1.7, `/admin/listings_/$listingId_/edit` 1.9, `/auth` 2.5,
`/legal/accept` 1.5, `/my-listings` 2.0, `/my-listings_/$listingId` 1.3. The base build is kept at
`/tmp/ethio-scratch/forms-kit/` (its logs); the tree's build is compared against it in §5.

## CENSUS-ITEM premises

1. **"The door's field name as its id."** The specs read the Field's anchor, not the door's name:
   `data-field="post-title"` (AL-21, MLA-13, PW-18, PW-75, PW-77, PW-121, PW-192) and
   `data-field="post-attr-<key>"` (PW-75), and the element id `#post-where-region`
   (`post-wizard-where.spec.ts:808`). Renaming them breaks "no test id a spec reads is renamed".
   The kit's Field therefore carries two names: `id` — the control's id and the refusal's anchor
   (kept as each step names it today; for a new form it IS the door's field name) — and `field`
   — the door's field name, which the gate registers and the refusal is matched by (defaults to
   `id`). Named in §10.
2. **`needsLeaf` drawn closed.** Ruling 1 item 2 folds it into the gate as `category_id` with Next
   drawn closed; `e2e/post-wizard-category.spec.ts` PW-1 asserts the step-1 Next `toBeDisabled()`
   ("PW-1: Next was pressable with no category chosen"). Drawing it closed changes that assertion,
   which this GO forbids. Per DECIDE-AND-NAME: the gate takes `category_id` (the caption, the Enter
   path and the group's invalid mark move onto the gate's `missing` and `tried`), and the step-1
   Next keeps `disabled` while `category_id` is missing — the drawn-closed half is LEFT for the
   supervisor's word on PW-1's assertion.
3. **"The server imports nothing from `src/features`"** (the GO's INC-1050 status words) is wider
   than INC-1050: `src/server/ad-page.ts`, `ad-photo.ts`, `first-screen.ts`, `legal-page.ts`,
   `qr.ts` and `imports/gate.ts` import feature modules (address, public-listing, photo-links,
   category-tree, feed-page, legal-page-data, io-formats), and two server routes import the worder
   (`src/routes/api/listings/identity.ts:5`, `draft.ts:4`) — outside SCOPE. INC-1050's own defect
   is `src/server/door.ts` :1; after this turn `src/server/` imports no refusal code from
   `src/features`, and the two routes keep `@/features/posting/door-error` as a one-line re-export
   of `src/lib/door-error.ts` until their turn (K2).
4. **One generic key.** The GO names `common.error` ("Something went wrong") as the one generic key;
   DEC-333's `src/lib/door-codes.ts` names `door.refused` as the door codes' generic, and Promote's
   screens render it (PMV-4, PMS-5 assert it). The reader's fallback is `common.error`; a family may
   name its own generic (the plan's §2.5) — Promote's stays `door.refused`.
5. **Three Refusal types → one.** `src/server/answer.ts:97` and `src/features/posting/types.ts:138`
   are the same shape; `src/server/imports/gate.ts:50` is a different record (an import row's
   refusal: `file`, `row`, `key`, `reason`, `detail`, `values`). The one shape is the first two's;
   the import row's record is built on it (`reason`, `detail`) and keeps its row fields.
6. **`wholeNumber` exists** (`src/lib/whole-number.ts`, register row 121) — the plan predates it.
   K1: `parseNumber` absorbs its rule and `wholeNumber` becomes its adapter for its four consumers.
7. **One new string.** The catalogue has no generic "not a number" key; it has
   `post.refusal.badType` ("This answer is not in the form this detail expects.", EN and AM in
   `*-base.ts`), whose words fit the parser's `invalid`. Rule 10 forbids Amharic of my own, so the
   parser's refusal reads that key and the turn adds no string (§8 says so; §10 names it).
8. **Rule 12 §Forms** names `Field` in `src/features/posting/field.tsx` and claims the aria pair;
   once the kit lands the mechanism is `src/components/forms/` and the claim is true (queued).

## CENSUS-ITEM findings

1. `fill` (string interpolation) lives in posting's `refusal-text.ts` and is imported by 37 files,
   among them the home page's `src/components/marketplace/listing-card.tsx:18`, `src/routes/l.$slug.tsx:19`
   and `src/features/seller/seller-page.tsx:8`: every public card page downloads posting's three
   refusal tables (the 1.4 KiB `refusal-text` chunk). Outside SCOPE (K2; a lib home for `fill`).
2. INC-857 ("the form-kit wave of the kit-adoption allowlist") is recorded OPEN, but its six files
   already walk through `scripts/conformance/kit.ts` and none is on
   `scripts/conformance/kit-adoption-allowlist.txt` — a record to close at the next records turn.
3. `src/components/ui/native-select.tsx:12` names `controlClass in features/posting/field.tsx`
   (it lives in `field-refusals.ts`, and after this turn in the kit) — a stale comment outside SCOPE.

No security hole was met.

## CENSUS-ITEM queued

- Ruling 1 of the plan lane, items 1 → 9: 1 the folder — built here; 2 needsLeaf — built here but
  the drawn-closed half LEFT (premise 2); photo rules stay (DEC-337); certifyClosed folds half —
  built here; 3 DEC-338 by kind — built here; 4 one Refusal shape, INC-1050 — built here; 5 the
  reader, dialects in §4 order, `common.error`, the door-codes branch — built here, the admin
  family mappers LEFT (wave 3); the parser — built here; 6 CF-FORM-1 … 5, aria pair, refusal id,
  density — built here; 7 weight — §5; 8 order — this is wave 1; 9 rule 12 — not edited here.
- INC-1050 — built here (premise 3 for the two routes).
- INC-1147 class 1 — left (wave 2): the two-factor service's `failure` (mfa-service.ts:103) is a
  CF-FORM-3 allowlist line until INC-1147.
- Rule 12 §Forms — true for the parts the kit carries once it lands (the one Field with the aria
  pair, `noValidate`, no local `fieldClass`, one reader, one parser), but its file pointers name
  `src/features/posting/field.tsx` / `field-refusals.ts` / `wizard.tsx`; the mechanism becomes
  `src/components/forms/` — not edited here (`.cursor/**`, rule 50).
- `p2-fold-c2b.stop-1.md:389` Q5 (the product editor's fields on posting's `Field` or K2) — left
  (wave 4, monetisation).
- `sage-s6-2-select.report.md:221` (the where step's six selects: no aria pair) — built here when
  step-where's selects sit in the Field; :222 (step-pricing's period, step-specifications) —
  built here through the Field itself (the aria pair lands in the one Field they already use);
  :224 (the five `fieldClass` locals) — step-where and step-who built here, auth, reset and
  settings left (wave 2).
- `sage-s6-1-dialog-look.report.md:289` (the five `fieldClass` locals) — as above.
- `roadmap.md:70` the form-kit Button debt (W2 ruling 3) — left: not this wave's concern (a Button
  size, not a field); `roadmap.md:761` INC-899 (raw `<button>` onto Button) — left.
- `roadmap.md:15` (INC-1147 class 1) — left, wave 2.
- `housekeeping-1.report.md:528` (the refusal readers, five copies: `useAttributeError`,
  `useCountryError`, `useLocationError`, `useImageFailure`, `useSubmitError`, "F2's form kit, wave
  1") — left: all five live in admin feature folders outside this GO's SCOPE; the reader they will
  call lands here, and each is a CF-FORM-3 allowlist line (wave 3). `useAttributeError`'s raw
  `message` read (:26–:29, :40) goes with it.
- INC-857 — finding 2 (its work is done; the record is stale).
