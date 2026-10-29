# The hidden seller name (INC-977, Foundations N1b-2)

When the seller-name re-check (row 72's catch-up) finds a name that imitates another, buyers stop seeing it until staff decide. The ads stay up. The owner still sees their own name, with a short notice. Staff still see the name. Only `imitates` hides; `unchecked` and `clean` names show as before. Register row 73.

## The one mechanism

- `public.seller_public_alias(p_profile, p_subject DEFAULT 'alias')` (STABLE, SECURITY DEFINER, service-only EXECUTE) gives the stored alias, or NULL while the name subject's `name_checks` row is `imitates`. There is no text condition (INC-986): the doors reset the row to `unchecked` whenever the name changes, so an `imitates` row belongs to the current name, and any leftover hides — the safe direction. An unknown subject (the business name, D222, later) answers NULL.
- `public.seller_public_previous_alias(p_profile)` gives the latest release within 365 days only when it was released `clean` (R1). `unchecked`, `imitates` and a pre-N1b-2 NULL are withheld.
- `alias_history.released_state` is stamped by `save_posting_identity` and `admin_update_profile` with the outgoing name's check state, read before the check row is reset, in the same transaction. No row reads as `unchecked`.

## Who reads what

| Surface | Reads | While held |
| --- | --- | --- |
| Ad page (`public_listing_json`) | both helpers | no name, no previous name, no "All ads" link |
| Seller page `/<name>` (`seller_feed_page`) | the helper | `unknownSeller`: the same 404 page and head as an unknown name, for everyone, the owner included (R5) |
| `/<name>` head (`src/features/seller/seller-head.ts`) | the loader's answer only | no name; the root title |
| Owner: `my_seller_line` | the column + `under_review` | own name, and the notice |
| Staff doors (`admin_*`) | the column | the name |

In the browser, `SellerLine` draws a missing name as `post.seller.neutral` ("Seller"), never `post.review.notGiven`. `SellerReviewNotice` (`src/features/seller/seller-review-notice.tsx`) shows `post.seller.underReview` and its help on the account overview, the posting review step, my listing page and the owner's own ad page. On the public ad page the owner's flag is read through `readSellerReview` (the supabase door, DEC-261). A failed read is a typed ReaderError: the account overview shows its error, and the ad page logs it and draws no notice — it never says "not held".

## Caches

`/api/seller` answers `public, max-age=60, stale-while-revalidate=300`, so a name can be visible for about 6 minutes after it is held. No purge (R2): the re-check runs every 15 minutes, so the window sits inside the time it takes to find the name.

## The guard

`scripts/conformance/seller-names.test.ts`:

- **SPA-10a:** every public function whose latest body reads `profiles.seller_alias` or `alias_history` is one of the two helpers or a line in `seller-names-allowlist.txt` (an owner, staff or internal door, with its reason and until).
- **SPA-10b:** no file under `src/server` or `src/routes` names either column.
- **SPA-10c:** the census is shown red on a planted public reader and a planted server read.

## Tests

- SQL proofs (in the migrations): SPA-1, SPA-2, SPA-3, SPA-5, SPA-6.
- Unit: SPA-6d/e (`readSellerReview`), SPA-8a (`SellerLine`), SPA-8b (`ListingDetail`), SPA-9a/b (`sellerHead`).
- E2E: `e2e/seller-name-hidden.spec.ts` SPA-E2E-1. The hold is made through `name_check_mark` on the test's own seller and restored in afterEach (R7).

## Not covered here

- The business name (D222) is not re-checked. The helper takes it by its `p_subject` parameter when it is.
- The staff queue, Clear and Rename are N1b-3.
