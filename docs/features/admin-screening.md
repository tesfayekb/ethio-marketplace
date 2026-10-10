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

## The page on the agreed blocks (bundle 11, turn A2; D118, D128)

This section is the later word on "What the page shows" above.

- **The toolbar** (`TableToolbar`): the title search; Filters with one filter, the ad's market (`home_country_code`, the open markets by name, "All" by default), shown as a chip with "Clear all"; Columns (title locked; category, place and sent may be hidden, remembered in this browser).
- **Tick-boxes** (D128 — a bulk action exists here): ticking ads shows the selection bar with Approve and Reject; one confirmation counts them (`admin.screening.confirmApproveMany` / `confirmRejectMany`), one step-up covers the set, and `transition_listing` judges each ad in turn. Changing the page, the search, the filter or the page size clears the ticks.
- **The row's actions** (`RowActions`): the three-dots menu holds Preview as buyer, Approve and Reject (danger) — a queued ad has no Edit or Delete.
- **The footer**: the range, rows per page (25, 50, 100) and the page numbers.
- **Preview as buyer** now reads, besides the row and its photos: the questions and their options (`get_posting_schema`, the options route — as the posting form reads them), and `admin_screening_facts` — the ad's country (to name its place), the contact methods the seller shows and the seller's public name (the business name first when the seller posts as a business). Phone, second phone and WhatsApp carry "Show number" (`admin.screening.showNumber`); a press calls `admin_reveal_listing_contact` through the step-up gate and shows the number in its place; the door writes the audit row. Telegram is listed without a number. Approve and Reject sit at the foot of the preview (`post-preview-footer`): each closes the preview and asks for confirmation.
- Tests: SC-2, SC-3 and SC-6 open the row's menu; SC-11 (Columns and Filters), SC-12 (two ticked ads approved together), SC-13 (the preview's public name and methods; Show number reveals one number and logs it), SC-14 (Reject at the preview's foot); SF-1 (the facts parser); HS-7..HS-9 (the blocks).

## Screening's walk fixes (bundle 11, turn A3; INC-537, INC-538, D129, D130)

The operator's walk of turn A2 (2026-10-10) found three faults; this section is the later word on the two above where they differ.

- **The market filter reads the ad's place (INC-537).** Filters → Country keeps the ads whose place is in that market: `place.country_code` through the embedded place, with `place=not.is.null` — the market `admin_screening_facts` reports. It never filters on `home_country_code`: that column is outside the signed-in role's column grant on `listings`, so the filtered read was refused and the page showed "Something went wrong". An ad whose place has been switched off is listed under "All" only.
- **SC-11 proves a settled result (INC-538).** The page keeps the previous rows on screen while a failed read is retried, so a test that only looks for a row under a filter can pass on the old rows. SC-11 filters to another open market (US) and expects the empty message with no error, then to the ad's own market (ET) and expects the row with no error. SF-2 checks that the read never names `home_country_code`.
- **Every Reject is red.** The selection bar's Reject, the preview's Reject and the confirmation's button when it rejects are drawn `destructive`, as the menu's Reject already was (SC-12, SC-14; the colour is read as a person sees it, `e2e/helpers/colors.ts`). The census of the class across the app (G29): Translations › Languages' "Delete language" confirmation is red too (TR-31); the inline removes — a user's role, a permission's Revoke toggle, the attribute editor's and Categories' removes — are judged when Part B moves those tables onto the blocks.
- **"Show number" asks for no second factor (D129).** `admin_reveal_listing_contact` is redeclared without `require_step_up_if_needed` (turn A3's migration, proofs P1–P5). `listings:review`, the dial (60 an hour), ads in `screening` only, the channel list, `notShown` and the one audit row per reveal stand; Approve and Reject keep their second factor. The page calls the door directly, and an answer that arrives after the preview closed or moved to another ad is dropped. A refusal is said under that method's own row: the hour's limit (`admin.screening.revealLimited`), a method the seller does not show (`admin.screening.revealNotShown`, without the button), or a failed call (`common.error`).
- **The seller box (D130)** — docs/features/posting.md: the name first, then "Contact the seller" with one method per row and its control at the row's end.
- Tests: SC-8 (a reviewer with no second factor reveals, one row), SC-11, SC-12, SC-13 (the rows top to bottom, each Show number in its own row, the number in its row, no code asked), SC-14, SC-15 (a reviewer with no second factor, in the page); SF-2, SF-3; TR-31.
