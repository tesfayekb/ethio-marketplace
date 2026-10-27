# Spec — the stored category pictures converted to WebP (DEC-265, INC-900; Tier A)

Status: spec v1, 2026-10-26, the supervisor's design under DEC-265 (Tesfaye, 2026-10-25: "all as recommended" — option (a), a staff conversion, the same pictures; not regenerated). Read at the turn-32 prototype. Nothing here is built.

## Why

Turn 23's lab: the ad page's largest element, the one the page waits on (LCP 6.0 s on the lab's phone over slow 4G), was a category picture, `card-*.png`. Since D234 S2 every new picture is cut as WebP (`PICTURE_WEBP_QUALITY` 0.82, `src/features/admin-categories/category-image-variants.ts` :186-:212) under a versioned name cached for a year (`PICTURE_CACHE_SECONDS`); the 171 pictures made before it are PNG (≈ 127.5 KiB each on average) under the old one-hour cache.

## The concern and the mechanism

CONCERN: a category's picture reaches a buyer's phone as WebP at card size under a versioned name cached for a year — whether it was cut before or after D234 S2.
MECHANISM: the cutter's own encoder (`category-image-variants.ts`) and naming (`pictureExtension`, `card-<ts>.<ext>`), reused; a new staff door that swaps the card and thumb links only.

1. **The door (a migration, Mxx):** `public.admin_convert_category_pictures(p_id uuid, p_old_image_url text, p_image_url text, p_old_thumb_url text, p_image_thumb_url text) RETURNS boolean` — `SECURITY DEFINER`, `search_path public`; `has_permission(auth.uid(), 'categories', 'assets')` and `require_step_up_if_needed('categories', 'assets')`, as `admin_set_category_images`; a compare-and-swap: it updates `image_url` and `image_thumb_url` only while they still equal the old links (a regeneration in between wins: the function answers false and changes nothing); it keeps `og_image_url`, `image_generation_prompt` and `image_accepted_at` (the existing door resets acceptance — "a NEW generation is not the accepted one" — which a format change is not); one audit row `category.convert_pictures` with old and new links. REVOKE from PUBLIC and anon; GRANT to authenticated, with its line in `scripts/public-surface-allowlist.txt`. Proofs in one DO block on a scratch category, RAISE EXCEPTION on failure: the swap; the refusal without the permission; the compare-and-swap refusal; acceptance, prompt and OG unchanged; the audit row.
2. **The service:** `convertCategoryPictures(categoryId)` in `category-images-service.ts` — reads the row (staff read), fetches the card and thumb PNGs from their public links, draws each on a canvas of its own size and encodes it with the cutter's encoder (the same pixels; a 512-square picture from before D122 stays 512 square), uploads `card-<now>.webp` and `thumb-<now>.webp` with `PICTURE_CACHE_SECONDS`, calls the door, and on `true` prunes the two old PNGs (best effort, logged, as the generator prunes); on `false` it removes the two new files and reports "changed meanwhile". A browser that cannot encode WebP stops the run with a message (no PNG is re-uploaded).
3. **The screen:** Admin › Images (`/admin/images`, today a placeholder section page) becomes the pictures tool: "N category pictures are still PNG" with Convert; one category at a time with progress (done, skipped, failed, each failure's category and stage); gated by `categories:assets`. New strings, EN and AM, listed key by key in the brief (G43).
4. **The census guard:** a unit census that every upload under `category-assets` passes `PICTURE_CACHE_SECONDS` and a versioned name (the generator and the converter — two consumers).

## Tests

Unit: the service's order and its `false` path (mocked storage and door); the encoder keeps the size. E2E (new `e2e/admin-category-pictures.spec.ts`): a scratch category with PNG pictures (its own rows and storage objects, removed in afterEach — G27) is converted; its links end `.webp` and are served `image/webp`; acceptance and the OG link are unchanged; the audit row exists; a staff member without `categories:assets` sees no Convert and the door refuses (deny proof, no file written).

## Size and order

ESTIMATE one turn with a migration stop (apply on ethio-prod through the executor's tool behind the operator's approval; ethio-staging first). After DEC-261's turn 34; the operator presses Convert once after Publish (an operator step, listed in the closing message).
