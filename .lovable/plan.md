# Lovable Bundle 1 — plan (base 37b62562a897439c07db20e6c7a26bb8431491cf)

Branch `lovable/bundle-1`. The sandbox HEAD is the base sha itself (verified with `git rev-parse HEAD`, and `git cat-file -t 37b62562a` = commit). No code changes in this turn.

## Limits I state up front (A3)
- I did not run `bun run build` in plan mode, because plan mode forbids builds. So the census in (c) has not been taken yet. It becomes **Part 0, run before any change in build turn 1**: build at the base, read `dist/.chunk-modules.json`, then record each changed module's chunk and each page's first download, chunk by chunk. If a module I change sits in `index` or `shared-shell` and its imports change, that is a STOP and I report it before editing.
- I have not yet read the full 42-file dialog census row by row. Part E opens with that census as a written table, before any fix.
- Browser checks of staff pages have not worked against the external backend in earlier turns. I will say so wherever that applies.

## Part A — one press opens one overlay (INC-1226)
(a) Where it happens: `row-actions.tsx:109-122` nests `TooltipTrigger asChild > DropdownMenuTrigger asChild`, so both `OverlayTrigger`s sit on one node. The tooltip facade's `onPointerDown` only marks `pressed`. Its `onFocus` (overlay-facade.tsx ~:325) then fires on the focus the press causes. The menu stops focus with preventDefault on pointerdown, but a later or programmatic focus still records `{kind:"focus"}`. When the code loads, the effect at :279-290 replays each root's intent separately: the menu gets `pointerdown` and opens, and the tooltip's replayed `focusin` opens the tooltip over the menu. On live Radix, the tooltip closes on pointerdown and does not reopen on a focus that came from a press.
Fix, in the facade only: while code loads, a press on a trigger cancels any focus or hover intent already recorded or recorded later for the tooltip root on the same node, and replayed `press`/`key` intents mark the node so the tooltip replay is skipped. This matches Radix's own rule that a tooltip trigger's pointerdown closes it. Hover with no press still replays. No import changes; only the logic inside `OverlayTrigger` and the `replay` path.
Consumers (nested tooltip+menu or tooltip+popover triggers): `row-actions.tsx:109`. I will run `rg -n "TooltipTrigger asChild" -A2 src | rg "DropdownMenuTrigger|PopoverTrigger"` in build and list every hit.
(d) Tests in `overlay-facade.test.tsx`, ids OF-NEST-1..4 (I will check these ids are free with rg across src, e2e and scripts):
1. Code held, press the nested trigger, release: menu open, tooltip absent, Escape closes the menu. Shown red at base.
2. Control on live code: same assertions.
3. Code held, hover alone, release: tooltip opens.
4. Code held, keyboard Enter on the nested trigger: menu opens, no tooltip.
(e) `e2e/choice-lists.spec.ts:389` (CL-E10) reads the menu staying open after Escape. The fix is what it expects. Not edited.

## Part B — posting pages say when to try again
(a) Each reader keeps its current return value, and a reader of the instant is added beside it, following the L22c `rateUntilOf` pattern:
- Draft family: `DRAFT_REFUSALS` (refusal-text.ts:149) gains `when: { rateLimited: "post.refusal.rateLimitedWhen" }`. `draftRefusalKey` (:170) is unchanged. A new `draftRefusalRead(reason)` returns the `RefusalRead`. Callers `step-who.tsx:755`, `:1012` and `step-where.tsx:1720` draw `refusalText(read, t, undefined, language)`.
- Photo family: `PHOTO_REFUSALS` (:154) gains `when`. `photoRefusalKey` (:184) is unchanged. A new `photoRefusalRead(refusal)` reads `reason` and `detail` (the route puts the instant in `detail`). It is used at the 8 places in `step-photos.tsx` (:278, :331, :345, :365, :391, :416, :484, :589). `BACKGROUND_REFUSALS` and `photo-reviews.tsx:161` stay plain.
- Pin answer: `pinAnswer` (posting-service.ts:1147) keeps its union. The answer gains an optional `until` only when the message carries an instant. `step-where.tsx:2129-2137` and `:2223-2231` draw the When text.
- Details step: `isRateRefusal` (:846-853 area, refusal-text.ts) is unchanged. `readPostingSchemaAnswer` gains an optional `until`, and `step-specifications.tsx:244`, `:1194` and `:1207` draw `post.specs.rateLimitedWhen`. `:1756` stays plain.
- Out of scope, as the ruling says: `use-draft.ts` and `post.pin.geocodeRateLimited`.
(b) New keys:
  - `post.refusal.rateLimitedWhen` (base): "You have saved many times in a short while. Try again {when}."
  - `post.photo.refusal.rateLimitedWhen` (base): "You have sent many photos in a short time. Try again {when}."
  - `post.specs.rateLimitedWhen` (member): "You have opened many categories in a short while. Try again {when}."
  The Amharic will be pasted from the supervisor and its sha256 checked. Kept unchanged: `post.refusal.rateLimited`, `post.photo.refusal.rateLimited`, and the details step's existing rate key. These stay as the fallback for an absent, malformed or past instant. Retired: none.
(d) Tests RTW-18..21 in `refusal-text.test.ts`, `posting-service` and step tests. Red first: a future instant shows the plain line at base. `until` types are checked with `expectTypeOf`.
(e) Specs that read `draftRefusalKey`, `photoRefusalKey` or `pinAnswer` values: I will census them in build with `rg -n "refusal|rateLimited" e2e/*post*`. Their return values do not change.

## Part C — the form kit's last screen lines
- `admin-locations/locations-toolbar.tsx` (allowlist :5): move the list filter into the DataTable toolbar slot as a filter control, exempt by kind under DEC-338.
- `posting/map/map-pin-dropper.tsx` (:7): the two precision radios go onto the Field radio group.
- `my-listings/promote-sheet.tsx` (:10, CF-FORM-3) and `ad-page/report-ad-dialog.tsx`: forward-scan consumers onto the Field and its gate.
- `admin-categories/use-image-failure.ts`: the picture dialog gets its own message key (English to be proposed in build).
- `admin-locations/location-refusals.ts:17-18`: words for `notSignedIn`, `accountDeactivated`, `unknownBatch` and `undoBlocked`, reusing the console's existing keys where one exists, otherwise new keys listed for Amharic.
- Second sign-in dialog during create-category: investigate first. If the cause is under `src/features/auth/**`, I report it to Cursor and do not touch it.
- Removing the 3 allowlist lines in `scripts/conformance/forms-allowlist.txt` is a pure removal, done at the end of the bundle.

## Part D — "(optional)" said twice (INC-1150)
- New keys `post.where.directionsLabel2`, English "Directions" (used at step-where.tsx:2057), and `post.price.expiryLabel2`, English "Take it down on" (used at field-refusals.ts:55 and the price step). Final names to be ruled; the Amharic comes from the supervisor.
- The old keys retire once nothing reads them. Today their only readers outside the locales are the two lines above.
- Census of other label values that say optional (EN `(optional)` / AM `(አማራጭ)`): `post.pin.open` "Add a map pin (optional)" is a button, not a Field label, so it is kept. `post.where.itemBoxTitleOptional` (AM :550) is a box title, so I will check in build whether a Field draws it. Hints that say "Optional." (`post.details.videoHint`, `post.who.optionalHeading`) are not labels and are kept.

## Part E — dialogs off the house design (INC-1146)
42 files mention the dialog contents. Of those, primitives and tests are 10 (sheet, dialog, dialog-primitive, alert-dialog(-primitive), category-modal, layers, and 4 tests). The remaining 32 are consumers, listed in `rg` output. Build turn E1 writes a table for each: file, uses or bypasses, and what differs (close button, padding, title/description slots, footer verb bar, width, top layer). Then one fix at `dialog.tsx`/`sheet.tsx` plus the bypassing consumers. Excluded and only reported: `src/features/auth/mfa/step-up-dialog.tsx` (Cursor's lane) and the `src/routes/dev.style.tsx` route.

## (c) First download
Part 0, as stated above. Modules likely on first paint: `overlay-facade.tsx` (shared-shell). Its imports stay unchanged and only its logic changes, which I will declare. `refusal-text.ts` and the posting steps are on posting pages. Report-ad is on the ad page. Each page's before/after is measured at the end; ceilings are not touched until the supervisor supplies a line (DEC-390).

## (f) Guards touched
String scan; strings-layers (new base and member keys); both usage maps (Parts B–E change sources); test-ids (OF-NEST, RTW ids); non-null (no new `!`); refusal-readers (new reads go through `readRefusal`); forms (three allowlist lines fall); admin-tables (locations toolbar); admin-guides (none expected).

## (g) Build order
0 census → A (overlay-facade.tsx, its test) → D (en/am-member, step-where, field-refusals, the price step) → B (refusal-text.ts, posting-service.ts, step-who, step-where, step-photos, step-specifications, en/am-base, en/am-member, tests) → C (the 6 files above, tests) → E (census table, then the primitive and consumers) → end checks, allowlist removals, write-back from 37b62562a.

## (h) What I would do differently
- Part D key names: I would prefer `post.where.directionsLabelPlain` and `post.price.expiryLabelPlain` over a numeric suffix. Please rule on the names.
- Part E is the largest part. I would land it as its own sub-ruling once the census table is in, so the census does not hold up A–D.
