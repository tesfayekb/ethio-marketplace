# The hidden seller name (INC-977, Foundations N1b-2)

When the seller-name re-check (row 72's catch-up) finds a name that imitates another, buyers stop seeing it until staff decide. The ads stay up. The owner still sees their own name, with a short notice. Staff still see the name. Only `imitates` hides; `unchecked` and `clean` names show as before. Register row 73.

## The one mechanism

- `public.seller_public_alias(p_profile, p_subject DEFAULT 'alias')` (STABLE, SECURITY DEFINER, service-only EXECUTE) gives the stored alias, or NULL while the name subject's `name_checks` row is `imitates`. There is no text condition (INC-986): the doors reset the row to `unchecked` whenever the name changes, so an `imitates` row belongs to the current name, and any leftover hides — the safe direction. An unknown subject (the business name, D222, later) answers NULL.
- `public.seller_public_previous_alias(p_profile)` gives the latest release within 365 days only when it was released `clean` (R1). `unchecked`, `imitates` and a pre-N1b-2 NULL are withheld.
- `alias_history.released_state` is stamped by `save_posting_identity` and `admin_update_profile` with the outgoing name's check state, read before the check row is reset, in the same transaction. No row reads as `unchecked`.

## Who reads what

| Surface                                               | Reads                       | While held                                                                                            |
| ----------------------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Ad page (`public_listing_json`)                       | both helpers                | no name, no previous name, no "All ads" link                                                          |
| Seller page `/<name>` (`seller_feed_page`)            | the helper                  | `unknownSeller`: the same 404 page and head as an unknown name, for everyone, the owner included (R5) |
| `/<name>` head (`src/features/seller/seller-head.ts`) | the loader's answer only    | no name; the root title                                                                               |
| Owner: `my_seller_line`                               | the column + `under_review` | own name, and the notice                                                                              |
| Staff doors (`admin_*`)                               | the column                  | the name                                                                                              |

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

## The staff queue and the re-check's line (N1b-3)

Admin › Screening draws two pieces for this concern (register row 74).

**The seller names held for review** (`src/features/admin-screening/name-checks.tsx`). Every `imitates` row, oldest hold first (`since`, then `profile_id`), in keyset pages of 50 through `admin_name_check_list` (listings:view). The name, its checked text and the model's `of` come only with profiles:view; without it the row says "Name hidden". `of` is drawn as text ("The AI says it imitates: …"), never HTML or a link; a hold without one says "No reason recorded". A failed or out-of-shape read is the table's error state, never "No seller names are held for review."

- **Allow this name** (`admin_name_check_clear`): profiles:update, then the second factor, then the row locked FOR UPDATE. The reason is optional (trimmed, at most 500, null when empty), the same as Rename's. A name that changed after the list loaded answers `stale`: nothing is written, and staff are told to reload.
- **Rename** opens the user's page at its editor (`/admin/users/<id>#edit-seller-alias`); `admin_update_profile` lands a staff-assigned name clean and stamps the outgoing name's state (M3b).

**The seller-name re-check** (`src/features/admin-screening/job-line.tsx`, services:view, `admin_job_health`). One line: the last run's outcome and time; "The site did not answer" for a run sent over two minutes ago that never arrived; "Paused since …: <reason>" with **Resume** for services:manage (`admin_job_resume`, under the second factor); "Not set up yet" before the Vault entries exist. A failed read says "The re-check's status could not be loaded." — never a healthy line, never a count.

**Why neither door spends a rate dial (INC-951, ruled at N1b-3 stop 3).** INC-951's concern is a staff door writing an unbounded row per call. Allow writes its audit row only on a real hold (a stale text writes nothing), and Resume only on a real pause (`notPaused` writes nothing). Each write is bounded by a state change, which is the safe shape, so neither door spends a dial.

**What the model said** (`name_checks.imitates_of`, ≤ 80 characters): kept only on an `imitates` row (CHECK, and a BEFORE UPDATE trigger that nulls it when the state moves away); written only by `name_check_mark`, which the catch-up calls with the answer's `of`, trimmed, on a hold only (NCJ-12).

Tests: SQL proofs NCQ-7…13 (M1, M2) and NJH-1…5 (M3); unit NCQ-U1…5 (`use-name-checks.test.ts`, `name-checks.test.tsx`), JHL-U1…4, NCJ-12; E2E `e2e/name-check-queue.spec.ts` — NCQ-E2E-1 Allow and NCQ-E2E-2 Rename in both projects; NCQ-E2E-3 Resume in desktop-1280 only, because `job_pauses` holds one row per job for the whole backend and two projects would undo each other (J6). Holds are made only through `name_check_mark`, the pause only through `job_pause_set`; afterEach releases both.

## A name the AI cannot check (J-1, INC-1002)

After 5 unusable answers in a row (`name_checks.unusable_streak`) an unchecked name moves to `needs_review`. It stays public exactly as `unchecked` does: only `imitates` hides a name (DEC-286). Admin › Screening lists it with "The AI could not check this name" and allows it with Clear. `unavailable` (provider down) does not count. `clean` or `imitates` resets the streak, and a new name resets the row.
