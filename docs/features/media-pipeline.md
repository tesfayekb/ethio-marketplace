# Media pipeline (U6-B1, server side)

Spec: `docs/governance/u6-posting-spec.md` §2 law 8, §4 B1, §12 D15.
Decisions: DEC-069 (the strip law), DEC-075 (the storage adapter by partition),
DEC-071 (rate limits). Acceptance: REQ-036's deny-proof, `PP-1`/`PP-2`.

A photo reaches storage only through `POST /api/upload/photo`. That route is the
only writer of `listing_photos.exif_stripped = true`, and the registering door
(`register_listing_photo`) is service-role only, so no client can claim a photo
was stripped.

## The strip (`src/server/media/strip.ts`)

`stripImage(bytes)` re-writes the container to an ALLOWLIST and returns
`{ bytes, format, width, height }`. It is pure, has no dependency, and **never
re-encodes**: pixel data is copied byte for byte, so the image the seller chose
is the image that is served. There is no server image library at runtime.

The real format is decided by magic bytes, never by the filename or the browser's
content type: `FF D8 FF` (JPEG), `89 50 4E 47` (PNG), `RIFF … WEBP` (WebP).
Anything else throws `unsupportedFormat`.

| Format | Kept                                                                       | Dropped                                                                              |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| JPEG   | SOI, APP0 (JFIF only), DQT, SOF0/1/2, DHT, DRI, SOS…EOI                    | every other APPn (EXIF APP1, XMP, ICC APP2, Photoshop IRB), COM, all bytes after EOI |
| PNG    | IHDR, PLTE, tRNS, gAMA, sRGB, IDAT, IEND (chunks copied whole, CRC intact) | tEXt, zTXt, iTXt, tIME, eXIf, iCCP, pHYs and every other ancillary chunk             |
| WebP   | VP8 / VP8L / ALPH, VP8X with its EXIF/XMP/ICC flag bits cleared            | EXIF, XMP, ICCP chunks; ANIM/ANMF is refused as `unsupportedFormat` (no animation)   |

Dimensions are read from the format's own header (JPEG SOF, PNG IHDR, VP8/VP8L/
VP8X), not from a library.

`assertStripped(bytes)` is the module's self-check: it walks the JPEG segments
again and scans for the container names a camera or an editor writes
(`STRIP_MARKER_NAMES`). The route runs it after every strip and refuses
`stripFailed` if anything survived — a strip that silently leaked would otherwise
be invisible.

## The adapter (`src/server/media/storage.ts`, DEC-075)

`storageTargetFor(partition)` reads server env INSIDE the handler (F1) and
answers `{ provider, bucket, publicBase }`:

| Env                                                                                        | Meaning             | Default          |
| ------------------------------------------------------------------------------------------ | ------------------- | ---------------- |
| `MEDIA_PROVIDER`                                                                           | `supabase` or `r2`  | `supabase`       |
| `MEDIA_BUCKET`                                                                             | the Supabase bucket | `listing-photos` |
| `MEDIA_PUBLIC_BASE`                                                                        | the public URL base | the bucket's own |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `R2_PUBLIC_BASE` | the R2 target       | —                |

`putObject` / `deleteObject` have two implementations: Supabase Storage through
the service client, and R2 through its S3 API with **in-house AWS SigV4**
(WebCrypto only, no SDK — no dependency was added).

THE PARTITION KEY LAW. An object's key is

```
<partition>/<user_id>/<listing_id>/<photo_id>/<variant>.<ext>
```

and the database stores `{ partition, key }` per variant in
`listing_photos.paths` — **never a URL**. `publicUrl(partition, key)` builds the
URL from the target's base at read time, so moving a partition to another
provider is a configuration change, not a data migration. Today there is one
partition, `default`; because it is the FIRST path element, splitting it later is
a copy.

## The policy pass (`src/server/media/policy.ts`, D15)

`screenPhotoPolicy` sends EVERY size that will be stored — the cover, the card and
the thumb, in that order (turn T17) — to one Gemini image call — `GEMINI_API_KEY`, model `GEMINI_VISION_MODEL`
(default the images model the category-image route uses) — with a JSON-schema
answer over a fixed code list:

`nudity` · `violence` · `weapon` · `drugs` · `hate_symbol` ·
`personal_document` · `contact_in_image` · `stock_watermark` · `not_a_photo` ·
`variant_mismatch`

Each of the three images is judged by the codes, and the upload is refused if any
must be. `variant_mismatch` covers a smaller copy that shows a different picture
from the cover; a smaller copy is less sharp, and that alone is never a reason
(PPOL-5..PPOL-8). The seller sees the generic "This photo was not accepted." for
it: the app's own uploads always send three copies of one photo.

D148 (the operator, 2026-10-12; INC-584): a business card passes with everything
printed on it, its phone numbers, e-mail addresses and handles included, and the photo
step says that everything in a photo is public. Any other printed item photographed is a
photograph (never `not_a_photo`); its print is judged by the other codes.

D153 (the operator, 2026-10-13): a logo, or another graphic a business designed for itself,
passes like a business card, with everything on it (PPOL-4). No logo is recognised and no
list of banned logos exists; a mark used without right is removed on report (Terms 3, 4
and 15).

Two rules make it safe: an unusable answer is the provider's own failure, never a
silent accept; and a provider failure answers `providerUnavailable`, which
REFUSES the upload with a retry hint. **No photo is ever stored unscreened.**

FAKE MODE. With `E2E_FAKE_PHOTO_POLICY=1` — or the harness's standing
`E2E_FAKE_TRANSLATE=1`, which every e2e job exports and the assist route reads
the same way — the pass is deterministic: a cover exactly 13 px wide (the fixture
marker) is refused `not_a_photo`, everything else passes. A test run never
reaches the provider.

## The routes

### `POST /api/upload/photo` (multipart: `listingId`, `cover`, `card`, `thumb`)

The body is read with the Start primitive's own `request.formData()` (A7
first-of-kind; `PP-1` is the smoke proof). In order:

1. `consume_rate_limit('upload', userId, RATE_LIMIT_UPLOAD_PER_HOUR, '1 hour')`
   → `{ field: 'rate', reason: 'rateLimited', detail: resets_at }`.
2. OWNERSHIP AS THE CALLER: the listing is read through `listings_seller_read`,
   so "not there" is `403 notYourListing`; a status that may not gain photos is
   `409 listingNotOpenForPhotos` (`draft`, `active`, `reduced`, `rejected`,
   `held`, `expired` may).
3. The cap, counted from DB truth → `{ field: 'photos', reason: 'tooManyPhotos' }`.
4. Per variant: the size dial, `stripImage`, the dimension cap, `assertStripped`.
5. The policy pass on all three sizes, in one call.
6. Three `putObject`s, then `register_listing_photo` as the service role, then
   `set_cover_photo` when it is the listing's first photo.

ANY failure after a put deletes what was put, so a refusal never leaves an orphan
object. Every throw and every deliberate 5xx writes one `[ssr-error] <path>` line
(I4). Refusals are the door's own JSON at status 200 with `ok:false` (F4), never
HTML.

### `DELETE /api/listings/photos/$id` · `POST /api/listings/photos/$id`

Owner-only, through the owner-scoped doors. DELETE removes the objects FIRST and
then `remove_listing_photo`, so a partial failure leaves a row pointing at
nothing rather than an unreachable object. `POST { action: 'cover' }` calls
`set_cover_photo`.

## The dials

| Dial                        | Env                          | Default |
| --------------------------- | ---------------------------- | ------- |
| photos per listing          | `MAX_PHOTOS_PER_LISTING`     | 10      |
| cover bytes                 | `MAX_COVER_BYTES`            | 1 MB    |
| card bytes                  | `MAX_CARD_BYTES`             | 150 KB  |
| thumb bytes                 | `MAX_THUMB_BYTES`            | 30 KB   |
| cover long edge             | `MAX_COVER_EDGE`             | 2000 px |
| card long edge              | `MAX_CARD_EDGE`              | 640 px  |
| thumb long edge             | `MAX_THUMB_EDGE`             | 240 px  |
| uploads per seller per hour | `RATE_LIMIT_UPLOAD_PER_HOUR` | 60      |

Every dial has a floor of 1, so a misconfigured dial can never mean "off".

## The fixtures and the deny-proof

`scripts/fixtures/photos/make.ts` (committed, I1) produces the fixtures with REAL
encoders — `jpeg-js` and `pngjs` for pixels, `ffmpeg`'s libwebp for WebP — and
then injects the metadata containers programmatically: `gps.jpg` (EXIF with GPS,
an XMP APP1, an ICC APP2 and a COM), `meta.png` (tEXt + eXIf + iCCP),
`meta.webp` (EXIF + XMP), `marker-13px.jpg` (the policy marker) and
`notimage.pdf`. No fixture bytes are hand-authored.

REQ-036's acceptance is `e2e/photo-pipeline.spec.ts`:

- **PP-1 / PP-2 — THE DENY-PROOF.** The fixture goes in; the object is pulled
  back OUT OF STORAGE through the service client and scanned twice: by
  `assertStripped`, and by the test's own scan written from the format
  specifications (so the proof cannot pass by agreeing with the code it tests).
  Both must find nothing, the row must carry `exif_stripped = true`, and the test
  also proves the fixture DID carry metadata, so the proof is not vacuous.
- PP-3 a PDF renamed `.jpg` → `unsupportedFormat`. PP-4 a variant over its dial →
  `tooLarge` by variant name, nothing stored. PP-5 the policy marker →
  `not_a_photo`, nothing registered and nothing stored. PP-6 another seller's
  listing → 403. PP-7 the eleventh photo → `tooManyPhotos`. PP-8 DELETE removes
  the row AND the objects; POST makes a photo the cover. PP-9 the seller's hourly
  ceiling → `rateLimited` with `resets_at`.

## INC-220 — the storage policies key on the segment AFTER the partition

The object key is `<partition>/<uid>/<listing>/<photo>/<variant>` (DEC-075), so
the owner segment is the SECOND, not the first. `listing_photos_object_insert`,
`listing_photos_object_owner_read` and `listing_photos_object_owner_delete` now
test `(storage.foldername(name))[2] = auth.uid()::text`. The bucket held no
objects when the policies moved, so no compatibility branch on segment 1 was
kept. `listing_photos_object_public_read` is untouched and remains
partition-agnostic: it joins `listing_photos.storage_path` and stays gated on
`exif_stripped` AND an active listing.

## Read links that expire (INC-588, D151 — the tidy-up round, turn T6)

The operator's choice of 2026-10-13: the `listing-photos` bucket stays private, and a screen draws a stored photo through a link that expires (D151). The other choice, a public bucket, was declined: anyone holding a photo's address would see it, drafts and removed ads included, for as long as the address exists. Turn T4's measurement read the bucket as private on both projects and no media setting set.

- **The route.** `POST /api/media/photo-links` (signed in; `{ photoIds }`, one to thirty) answers `{ ok, links: { [photoId]: { card?, thumb?, cover? } }, expiresIn: 3600 }`. It reads the photo rows **as the caller**, so the `listing_photos` policies decide which rows come back: the seller's own, staff who may view listings, and an active listing's stripped photos for anyone. Only those rows are signed, by the service client, for one hour, and only rows with `exif_stripped`. A photo the caller may not read is absent from `links`, the same answer as a photo that does not exist. No session is a 401. A failed read or signature is a 503, never an empty success.
- **The server pieces.** `readLinks(service, partition, keys, seconds)` in storage.ts signs through the provider (`createSignedUrls` for `supabase`; R2's public base when it is set, else nothing). `variantRefs`, `photoIdsOf` and `signPhotoRows` in links.ts decide what may be signed. Unit tests: LK-1..LK-3.
- **The readers.** `usePhotoLinks(photos)` (use-photo-links.ts) asks once per set of photos and keeps the answer 45 minutes. `photoUrl(row, order, links)` (photo-links.ts) draws the first variant of the reader's order that came back, https only, and otherwise null (the category's picture, never a broken image). Unit tests: PU-1..PU-3. Every reader uses them: the photo step's stored tiles (card, thumb, cover), the side preview, and the listing's preview page (card, cover, thumb). The preview page is the review's preview, the admin's preview as buyer and the screening preview.
- **The writing helper.** The posting form sends the first three stored photos' ids. `/api/listings/assist` reads their rows as the seller, signs their card images and fetches only links it signed itself.
- **E2E.** PP-12: a draft holding a photo opens on the price page (D39); Back leads to the photo step, where the stored tile carries a signed link and the image draws (INC-591). PP-13: the owner and staff get links, the owner's link serves the image, another seller gets none and no session is a 401.

## Bundle 13, turn 3 — buyers see the seller's photos (INC-606)

- **The feed names each card's cover.** `feed_page` (redeclared whole) gives every card `coverPhotoId`: the listing's first stripped photo by `display_order` (the cover, D154), or null. A client that meets an answer without the field reads it as no photo.
- **Links for a visitor without a session.** `POST /api/media/photo-links` with no bearer reads the photo rows as the anonymous role, so `listing_photos_public_read` alone decides: only an active listing's stripped photos are signed. Each address may ask 600 times an hour (`RATE_LIMIT_PHOTO_LINKS_PER_HOUR`; the address is Cloudflare's `cf-connecting-ip`). A signed-in request is read as the caller, as before.
- **Only the sizes asked for.** A request may name `variants` (`card`, `thumb`, `cover`); a listing card asks for `["card", "thumb"]` and the server signs only those (`variantsOf`, `signPhotoRows`). A request that names none gets every readable size.
- **The card draws it.** `useCardPhotos` (src/features/feed/use-card-photos.ts) asks for the feed's covers in groups of 20 in the feed's order, so a new page of cards adds a group and never re-asks the earlier ones; links last an hour and are kept 45 minutes. `ListingCard` draws the link it is given, else the category's picture.
- Tests: PP-21 (the feed names the cover; an anonymous request gets card and thumb of an active listing's photo and nothing of a draft's; a size not offered is refused; the card's picture is the signed link), LK-4, FP-11, LC-3.

## Bundle 13, turn 4 — the listing's photo gallery (D161)

The operator's decisions of 2026-10-13 (after the gallery peer study): on a computer the photo shown large with the thumbnails in a column beside it, a thumbnail showing its photo there ("just like in amazon"); on a phone a swipe with a "2 / 7" counter and a row of thumbnails under the photo; a tap opening a full-screen viewer with pinch zoom; built into the preview pages now (the review's preview, the admin's preview as buyer, the screening preview), and mounted by the buyer's ad page when it is built.

- **What each photo draws.** `galleryPhotos(rows, links)` (photo-links.ts): the card size in the page (the cover, then the thumb, when it is missing), the cover size for a dense screen (`srcSet` 480w / 1600w) and for the viewer, the thumb size for the thumbnails (about 5 KB each). Every link passes `photoUrl`, so a photo with no https link is left out, never drawn broken. The viewer draws the cover only when it is opened.
- **The gallery** (`src/features/posting/preview/photo-gallery.tsx`) — the layout, the swipe, the viewer and its keys: docs/features/posting.md, "THE GALLERY".
- Tests: GAL-1..GAL-4 (one photo; the counter, thumbnails and arrows; the swipe against a tap and a scroll; the viewer's keys, arrows, zoom, and Escape closing the viewer only), PU-4 (the links of a gallery photo), PP-22 (on staging: the three sizes in their places, the thumbnails beside the photo on a computer and under it on a phone, a thumbnail, the arrows, a swipe, the viewer at the cover size, Escape closing the viewer and leaving the preview open).

## Bundle 13, turn 6 — photos held while photo screening is off (D158)

- **The upload's step 6** asks `photoScreenPlan(gate, status)` (src/server/media/hold.ts): `screen` (the pass, as before), `hold` (switched off by staff, on a draft or a rejected ad: stored with `unscreened = true`, no pass, nothing metered), `paused` (switched off by staff, on a live or held or expired ad: refused `screeningPaused`) or `unavailable` (the switch could not be read: `providerUnavailable` with a retry). The answer of a stored photo carries `unscreened`.
- **`listing_photos.unscreened`** — a held photo. `register_listing_photo(…, p_unscreened)` writes it; the public read and the feed's cover leave it out; approving the ad clears it (the trigger `listing_photos_approved_with_ad`, a person's decision only). The whole rule: docs/features/ai-services.md, "Photos held for staff".

## Bundle 13, turn 7 — the middle size (D162) and the photo's top in the gallery (INC-613)

This section is the later word on the counts of sizes above.

- **D162 (the operator, 2026-10-13: "Add a middle size").** The device now encodes FOUR sizes: cover 1,600 px, **mid 960 px**, card 480 px, thumb 160 px (`EDGES`, src/features/posting/photo-encode.ts; WebP 0.82 for the middle size, the cover's quality — the judge of D157 did not measure it). The upload sends `mid` beside the other three; the route takes it when it is sent (`MAX_MID_BYTES` 450 KB, ESTIMATE ×3 over the largest cover scaled to 960 px; `MAX_MID_EDGE` 1,200 px) and stores it as `paths.mid`. A request without it — a page loaded before D162 — stores three sizes as before. Photos stored before D162 have no middle size and are not back-filled (the operator's choice).
- **Every stored size is still screened in one call** (INC-601): the instruction now names "the photo, then smaller copies of it, each smaller than the one before", and the call carries the cover, the middle size when sent, the card and the thumb, in that order (`imagesOf`, src/server/media/policy.ts). ESTIMATE: the fourth image adds about a quarter to the call's image tokens.
- **What a reader downloads.** `READ_VARIANTS` gains `mid` (links.ts), so a request that names no size is also signed the middle size. The gallery's photo offers the card (480w) and the middle size (960w) in `srcSet`, never the cover, so a computer or a phone fetches at most the middle size for the page; the full-screen viewer alone draws the cover. A photo without a middle size keeps offering the cover (480w / 1600w), as before. Feed cards still ask for the card and the thumb only.
- **INC-613 — the photo's top.** The operator's walk (2026-10-13): on a computer the thumbnails sat above the top of the main photo. The frame is 4:3 and the photo is contained in it; a photo wider than 4:3 was centred, so it began below the first thumbnail. On a computer the photo now sits at the top of its frame (`@min-[32rem]:object-top`); on a phone it stays centred.
- Tests: PE-1, PE-2 (four sizes), PPOL-7, PPOL-9 (the middle size second in the call), LK-4, LK-5, PU-4..PU-6, GAL-1, GAL-6; E2E PP-23 (two wide photos picked on the step store four sizes; the preview offers the middle size and not the cover; on a computer the drawn photo's top meets the first thumbnail; the viewer draws the cover), PP-24 (a middle size over its cap is refused `tooLarge` by name and nothing is stored).

## Bundle 13, turn 9 — an edited photo takes the old one's place (D154 B2); the smaller copies at low detail (D165)

- **D154 B2 — turn and crop.** On the photo step every stored photo has Edit (src/features/posting/photo-editor.tsx). The editor opens on the photo's own stored cover through its signed link, turns it in quarter turns and crops it with a box (moved and sized with a finger or a mouse, or with the keyboard: an arrow key moves the box, Shift with an arrow key moves its bottom-right corner; the arithmetic is src/features/posting/photo-edit.ts). Save draws the result on the device and sends it the whole way as a new photo — the four sizes made on the device (`encodeBitmap`, photo-encode.ts), the strip, the AI screen — with `replaces` naming the old photo.
- **`POST /api/upload/photo` with `replaces`.** The photo it names must be on this listing, read as the caller (else `photoGone`, 409); an id that is not a UUID is `badValue`. An edit adds no photo, so the plan's cap is not counted. After the checks and the screen, the new door `replace_listing_photo` (service-only, like `register_listing_photo`) locks the listing, deletes the old row and inserts the new photo at the old one's `display_order` in one transaction, and sets `cover_photo_id` to the first photo in the order. The old photo's objects are deleted after the door answers; a failure there is logged by name and does not undo the edit. A refusal at any step leaves the old photo, its row and its objects as they were, and the editor says why.
- **D165 (the operator, 2026-10-14: "Phone sizes, cheap check").** D164's plan to make the sizes on our server is replaced: DEC-082 and INC-308 keep image work off the Worker (it died at 130–180 ms of CPU an image; making the sizes measured about 550–680 ms). The phone keeps making the sizes, and the one call still shows the provider every stored size: the photo at the default detail (1,120 tokens for Gemini 3), every smaller copy at low detail (280 tokens; `mediaResolution: { level: "MEDIA_RESOLUTION_LOW" }` on its part, `policyParts`, src/server/media/policy.ts). ESTIMATE: a four-image call falls from about 4,480 to about 1,960 image tokens (band 40–50 % of before). A model that refuses the per-image setting (a 400 naming it) is asked once more with every image at the default detail, and the log says so; every other failure is `providerUnavailable`, as before.
- `listings.cover_photo_id` follows the order after an edit; `objectRefsOf` (src/server/media/storage.ts) is the one list of a photo's objects, shared by Remove and the edit.
- Tests: PED-1..PED-5 (photo-edit.test.ts), PED-6..PED-9 (photo-editor.test.tsx), PPOL-10..PPOL-12; E2E PP-25 (an edit takes the second place and then the cover's, its old objects go, and at the cap an edit is still taken), PP-26 (an edit naming a photo of another listing is `photoGone`, a bad id `badValue`, a screen refusal leaves the old photo with its objects), PP-27 (the seller turns a photo right and crops the cover with the keyboard; each is stored in its place, the cover stays the cover), PP-28 (a refused edit keeps the editor open with the reason, the photo as it was; on a computer the crop box's corner is dragged).
