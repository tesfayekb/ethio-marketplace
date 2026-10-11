# Admin › Listings (the Listings console)

Bundle 11, the Listings console (D134, D136, D137; spec: docs/governance/listings-console-spec.md). Turn L1 built the doors and the seller's notices; the pages (All listings with the Screening queue under one Listings group, then the Edit form) come in the next turns.

## The doors (turn L1)

- **`admin_list_listings(view, search, country, category, seller, from, to, tier, limit, offset)`** — STABLE definer, `listings:view`. Drafts never. Views: `live` (active, reduced), `waiting` (screening, held), `ended` (expired, sold), `removed` (rejected, removed), `all`. Search: a title's words, or a listing's id. Filters: the country of the listing's place, a category and everything under it, the seller (public name, a business's name; the e-mail too for `profiles:view` holders), the date posted (from, to), the tier. Newest first; at most 100 a page; each row carries the total. A row: the listing, its status and tier, whether it carries the severe screening flag, the seller's public name (and business name), the e-mail only for `profiles:view` holders, the category and place names in both languages, the price fields, the cover photo's paths, the photo count and the dates. Refusals: "not signed in", "permission denied", "unknown view", "unknown tier".
- **`admin_edit_listing(listing, changes, reason, note)`** — VOLATILE definer, `listings:enforce` with a fresh second factor. `changes` holds any of title, description, category_id, attributes, the price fields (price_mode, price_amount, price_currency, price_period, price_bp, price_negotiable) and `remove_photos` (photo ids); anything else is refused ("not editable: <key>"). It refuses a draft ("listing not found"), a removed listing and the admin's own listing. The seller's content rules decide (the validator through step 7): a refusal answers `{ok: false, refusals}`, the seller's own shape, and writes nothing. A live listing stays live. One edit writes one `listing_revisions` row (kind `edit`, before and after, the admin as actor; a removed photo's whole row is kept in `before.photos_removed`), one `audit_log` row (`listing.admin_edit`: the fields, the reason, the note) and one seller notice. The same values again answer "nothing changed" and write nothing.
- **`admin_move_listing(listing, to, reason, note)`** — VOLATILE definer, `listings:enforce` with a fresh second factor. Remove (any status but draft and removed → removed), Restore (removed → screening; a listing with the severe screening flag by a super admin only) and Send back to review (active or reduced → screening). Any other move: "illegal move: <from> -> <to>". Through `transition_listing`, which writes the state revision; then one `audit_log` row (`listing.admin_remove`, `listing.admin_restore` or `listing.admin_send_back`: from, to, reason, note) and one seller notice.
- **`transition_listing`** gains Restore: removed → screening, enforcement only, with a fresh second factor; a severe removal by a super admin only (REQ-022 as amended by D137). The seller cannot restore a removed listing.

## Reasons

- Edit: `wrong_category`, `misleading`, `contact_in_text`, `photo`, `rules`, `other`.
- Remove: `prohibited`, `misleading`, `duplicate`, `contact_in_text`, `photo`, `rules`, `other`.
- Restore: `removed_in_error`, `appeal_accepted`, `other`.
- Send back: `wrong_category`, `misleading`, `contact_in_text`, `photo`, `rules`, `other`.
- `other` needs a note; a note is at most 500 characters.

## The seller's notices

`seller_notices`: the seller, the listing, the kind (`admin_edit`, `admin_remove`, `admin_restore`, `admin_send_back`), the fields as the seller reads them (title, description, category, specs, price, photos; status for a move), the reason, the note, when, and when read. Row security: the seller reads only their own; no browser role writes. Nothing shows them yet: My ads (stage 4, D138) and notifications (stage 6) will.

## Tests

AL-1..AL-9 (e2e/admin-listings.spec.ts): who reads All listings and what (drafts never, the e-mail only with `profiles:view`); the views, the filters and the order; every refusal of Edit and that a refused edit writes nothing; an edit's change and its three records; a refusal that equals the seller's own; a photo's removal; Remove then Restore; Restore's rules (the owner, the second factor, the severe flag); Send back, and the notices' row security. The migration's proofs F1–F5 check the table's security, the doors' headers and grants, the gates in order, and the refusals with no session and with an identity that holds nothing.

## Turn L1b (CI on 63f6b687)

- The notices table is on the pool reset map (e2e/helpers/pool-reset-map.ts) and the reset deletes a pooled account's notices (src/test/pool-reset-map.test.ts went red when the regenerated types named `seller_notices`).
- AL-1, AL-3, AL-5, AL-8 and AL-9 sign ONE person into the browser — the super admin, whose fresh second factor the doors require; every other person calls the door from node with a password grant and the same REST request the browser client sends. AL-3 had signed four people into the browser, ran past its 60 s budget in the fast lane, and its afterEach reaped the rows its abandoned body was still using ("listing not found", then a place still in use).
