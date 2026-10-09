# Admin › Screening

Bundle 10 E3a (D109). Path `/admin/screening`.

## What the page shows

The ads whose status is `screening`, oldest first (the order they were sent: `updated_at`, then id), 25 per page, with a title search that runs in the query. Columns: title, category, place, sent. Each row has Preview as buyer (the posting wizard's buyer preview, built from the row and its photos), Approve and Reject. A failed read shows an error with Retry, never an empty table.

## Who may use it

`listings:view` opens the section (RLS `listings_admin_read`, `listing_photos_admin_read`). Approve and Reject render only with `listings:review`. No role holds `listings:review` or `listings:enforce` today; a super admin passes `has_permission`. Granting them is the operator's choice in Admin › Roles.

## What Approve and Reject do

Each asks for confirmation, then for a fresh second factor through the step-up gate, then calls `transition_listing` as the signed-in reviewer. Approve moves the ad to `active` (published now; the feed triggers index it at once); Reject moves it to `rejected`. The outcome is an inline status line (no toast host is mounted in this app).

## The door's step-up rule

`transition_listing` requires a recent second-factor step-up (`require_step_up_if_needed`) for a reviewer's decision (to active, reduced, rejected or held) and for an enforcer's removal. The seller's own paths and the service's are unchanged.

## Not yet (stage 2)

Reasons for a rejection shown to the seller, and the exceptions page this section becomes part of.
