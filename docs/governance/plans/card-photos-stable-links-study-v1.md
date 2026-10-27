# Study — stable links for live ads' card photos (DEC-264; Tier A; spec owed)

Status: study v1, 2026-10-26, the supervisor. DEC-264 is approved (Tesfaye, 2026-10-25, "all as recommended"): card-size copies of a LIVE ad's photos at stable public addresses, cached for good; originals, drafts and every non-live ad stay private; when an ad stops being live its public copies are deleted and purged at once. This note records what the code holds and the shape of the build; the spec follows before its turn.

## What the code holds (read at the turn-32 prototype)

- One storage seam (DEC-075): `src/server/media/storage.ts` — keys `<partition>/<user>/<listing>/<photo>/<variant>.<ext>`; the database stores `{ partition, key }` per variant, never a URL; two providers, `supabase` (today: the private `listing-photos` bucket, written by the service role) and `r2` (Cloudflare R2 over its S3 API, SigV4 in-house, a `publicBase`).
- Read links expire (D151, INC-588): `src/server/media/links.ts` — `PHOTO_LINK_SECONDS = 3600`, variants `card`, `thumb`, `mid`, `cover`; one reader-and-signer for every door (DEC-195: `readAndSignPhotoLinks`, `signPublicPhotos`, `signPhotoRows`); callers `src/server/ad-page.ts`, `src/routes/l.$slug.tsx`, `src/routes/api/media/photo-links.ts`, the feed's first page (D234 S4) and `listing-detail.tsx`.
- Why repeat views re-download: each load signs a fresh token, so the URL differs and neither the browser nor Supabase's CDN can reuse the bytes (turn 23's lab; ESTIMATE 0.4–0.8 MB per repeat feed view).
- The bucket already has an anonymous read policy on `exif_stripped AND status = 'active'` (storage.ts's note), but a private bucket's public path cannot be read by an `<img>` without a token.

## The shape of the build (recommended)

1. **Where the copies live:** a public R2 bucket behind the ethio.com Cloudflare zone (`img.ethio.com`), made at the DNS cutover with DEC-263 — one origin, Cloudflare's CDN in front, purge by URL through the zone's API. Fallback if R2 is not wanted: a second, public Supabase bucket `listing-cards`.
2. **What is copied:** the `card` variant only (the feed and the ad page's first picture; `thumb` too if the feed uses it), under a name that never changes (`<listing public id>/<photo id>/card.<ext>`, the photo id being new on every edit — D154 B2 replaces a photo's objects when it is edited).
3. **When:** an outbox, not a trigger calling storage: the listing state machine's doors (publish, sold, expire, remove, suspend, the seller's deactivation, delete) write one row per change to `public.public_photo_outbox` in the same transaction; a scheduled job (heartbeat row, G9 ops invariant) copies on `live` and deletes plus purges on leaving it, idempotent and retried; the readers serve the public link only for a photo whose copy is confirmed, and the signed link otherwise (so a missed run degrades to today, never to a broken picture).
4. **The readers:** `links.ts` answers the public link for `card` of a live, copied photo and a signed link for everything else (`mid`, `cover`, drafts, the owner's own non-live ads).
5. **Privacy, as approved:** a public card link works while the ad is live and stops when it leaves (deleted and purged within the job's interval — the spec fixes the interval and the purge); it is unguessable (photo ids are random) and carries no seller data; originals and EXIF never leave the private bucket.

## Proofs the spec will require

A live ad's card link is stable across loads and served with `Cache-Control: public, max-age=31536000, immutable`; leaving live deletes the object and purges it (the link answers 404 at the CDN within the interval); a draft, a suspended or a removed ad never has a public copy (deny proofs); the outbox job's heartbeat and its retry; the readers fall back to signed links when a copy is missing; the photo editor's replace (D154 B2) deletes the old public copy.

## Order

After DEC-261's turns and DEC-265; built with the Cloudflare cutover (DEC-263), because the public origin and the purge live in the same zone.
