# Admin › Screening

Bundle 10 E3a (D109). Path `/admin/screening`.

## What the page shows

The ads whose status is `screening`, oldest first (the order they were sent: `updated_at`, then id), 25 per page, with a title search that runs in the query. Columns: title, category, place, sent. Each row has Preview as buyer (the posting wizard's buyer preview, built from the row and its photos), Approve and Reject. A failed read shows an error with Retry, never an empty table.

## Who may use it

`listings:review` opens the section (DEC-163) and renders Approve and Reject. The queue's read also needs `listings:view` (RLS `listings_admin_read`, `listing_photos_admin_read`), so a role given review should hold view too. No role holds `listings:review` or `listings:enforce` today; a super admin passes `has_permission`. Granting them is the operator's choice in Admin › Roles.

## What Approve and Reject do

Each asks for confirmation, then for a fresh second factor through the step-up gate, then calls `transition_listing` as the signed-in reviewer. Approve moves the ad to `active` (published now; the feed triggers index it at once); Reject moves it to `rejected`. The outcome is an inline status line (no toast host is mounted in this app).

## The door's step-up rule

`transition_listing` requires a recent second-factor step-up (`require_step_up_if_needed`) for a reviewer's decision (to active, reduced, rejected or held) and for an enforcer's removal. The seller's own paths and the service's are unchanged.

## Not yet (stage 2)

Reasons for a rejection shown to the seller, and the exceptions page this section becomes part of.

## The preview's facts and "Show number" (bundle 11, turn A1; D120, D128)

Two doors, both for an ad waiting for review (status `screening`; any other ad answers "listing not found"), both refusing a person who does not hold `listings:review` ("permission denied") and a call with no session ("not signed in"):

- `admin_screening_facts(p_listing_id)` — what "Preview as buyer" needs and the reviewer may read: the ad's country (its place's market, else the listing's home country), which contact methods the seller chose to show (`phone`, `phone2`, `telegram`, `whatsapp`: true or false — never a value), and the seller's public name (the public name, and the business name when the seller posts as a business). No legal name, e-mail or number leaves it.
- `admin_reveal_listing_contact(p_listing_id, p_channel)` — "Show number": a fresh second factor (`require_step_up_if_needed('listings','review')`), the dial `review_reveal` (60 an hour per reviewer; `{ok:false, reason:"rateLimited"}`), a channel of `phone`, `phone2` or `whatsapp` ("unknown channel" otherwise) that the seller chose to show (`{ok:false, reason:"notShown"}` otherwise). It returns `{ok:true, channel, value}` and writes one `audit_log` row: action `listing.contact_revealed`, the listing, `meta = {channel}` — never the number. The row is read in Admin › Audit by holders of audit access; it is an internal moderation record and nothing shows it to the seller (D128).

Migration: bundle 11 turn A1 (the dial and the two doors; proofs D1–D4). Tests: SC-7 (the facts, never a value), SC-8 (a non-reviewer reads nothing; a reviewer without a fresh second factor reveals nothing), SC-9 (a reveal returns the number and writes one row with the channel alone; a hidden channel and Telegram are refused and write nothing), SC-10 (an ad not waiting for review answers neither door). The screen uses them in turn A2.
