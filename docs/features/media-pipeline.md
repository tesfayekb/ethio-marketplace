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

`screenPhotoPolicy` sends the COVER ONLY (the card and thumb are derived from it)
to one Gemini image call — `GEMINI_API_KEY`, model `GEMINI_VISION_MODEL`
(default the images model the category-image route uses) — with a JSON-schema
answer over a fixed code list:

`nudity` · `violence` · `weapon` · `drugs` · `hate_symbol` ·
`personal_document` · `contact_in_image` · `stock_watermark` · `not_a_photo`

D148 (the operator, 2026-10-12; INC-584): a business card passes with everything
printed on it, its phone numbers, e-mail addresses and handles included, and the photo
step says that everything in a photo is public. Any other printed item photographed is a
photograph (never `not_a_photo`); its print is judged by the other codes.

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
5. The policy pass on the cover.
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
| cover bytes                 | `MAX_COVER_BYTES`            | 6 MB    |
| card bytes                  | `MAX_CARD_BYTES`             | 600 KB  |
| thumb bytes                 | `MAX_THUMB_BYTES`            | 120 KB  |
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
