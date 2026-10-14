# My listings

The seller's page of his own ads (D138), with the states and the rules the operator decided on 2026-10-14: D172 (the category of a posted ad never changes; edits in boxes), D173 (Sold, Reserved, No longer available; "Price reduced"), D174 (what applies at once and what is reviewed; close and reopen; renew), D175 (a sold ad for 30 days; the renew days an admin setting; both dates shown), D176 (renewals live at once until the screening gateway exists), D177 (free text is reviewed, picked answers and amounts are not), D178 (every photo labelled by the AI; only a pass is shown). The supervisor's spec, approved with D175: Project doc `claude/my-listings-spec-v2.md`.

Built in bundle 16, one turn at a time: (1) the doors; (2) the list page and the Account overview's six groups; (3) one ad's page and its actions, and a sold ad visible for 30 days in the feed with its ribbons on the card; (4) the photo review of D178; (5) the edit in boxes. (Turn 2 first planned the sold ad's 30 days too; they move to turn 3, with the actions that make an ad sold and the ribbons that say so — no screen marks an ad sold before turn 3.)

## The rules

| What the seller does                                                       | What happens                                                                                                                                               | On the site                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Changes the price (mode, amount, currency, period, commission, negotiable) | Applies at once, judged as staff's edit is judged (the ad's end date and places are not); no review (D174 1, D177)                                         | Stays live                                                                                   |
| Changes the title, the description, a typed price note or a typed answer   | Goes to review: a person in Admin › Screening until the gateway exists, then the AI (D177)                                                                 | Out of search until approved; then live again with the days it had left (call A)             |
| Changes a photo                                                            | Reviewed photo by photo (D178): a pass is shown at once; anything else is kept hidden for review                                                           | The ad stays live with its approved photos                                                   |
| Marks it Reserved                                                          | A ribbon; buyers still see it and contact the seller (D173 1)                                                                                              | Stays live; its days keep counting                                                           |
| Marks it Sold (Rented, Filled)                                             | A ribbon; the contact is closed to everyone (D175 1)                                                                                                       | In search and the feed for 30 days with the ribbon, then out; the seller keeps it under Sold |
| Marks it No longer available                                               | The ad closes; the days it had left are kept (D174 2)                                                                                                      | Out of search                                                                                |
| Reopens a closed ad                                                        | Back to the status it had, with the days it had left, without a new review                                                                                 | Live again                                                                                   |
| Renews an expired ad                                                       | A new run of the admin's renew days (30 at launch), a fresh posting date, the first posting date kept (D174 3, D175 2–3, D176)                             | Live at once                                                                                 |
| Deletes it                                                                 | Removed; it leaves My listings                                                                                                                             | Gone                                                                                         |
| "Price reduced"                                                            | Automatic: a drop of at least 5% on a price that stood at least 7 days after the ad was first posted, shown 14 days, the old price struck through (D173 2) | On the card                                                                                  |

The category of a posted ad is never changed (D172). An ad in review cannot be edited until the answer comes (call G). An expired ad is renewed before it is edited.

## The admin's setting

`listing_policy` (one row): `renew_allowed` (on) and `renew_days` (30). Signed-in users read the two values; `admin_set_listing_policy(renew_allowed, renew_days)` writes them — `listings:enforce` with a fresh second factor, days 1 to 365, audited `listing.policy_set`. The Settings box in Admin › Listings comes in turn 5.

## The doors (bundle 16 turn 1)

- **The status `closed`** ("No longer available"). `transition_listing(id, 'closed')`: the owner closes his live ad (active or reduced); the time it had left is kept (`clock_kept`, `kept_remaining`) with the status it returns to (`resume_status`). `transition_listing(id, 'active' | 'reduced')` on a closed ad: the owner reopens it to that status only, with the time it had left; staff never reopen a seller's closed ad ("owner only: closed -> active").
- **After the review of an edit**, an ad gets back the time it had when it was edited; an edit never renews an ad (call A). The first move to live after posting is unchanged.
- **`edit_listing`** takes a live, closed, rejected or held ad; an expired ad is refused ("an expired listing is renewed before it is edited"). A closed ad that is edited goes to review like a live one and comes back live, with the days it had left.
- **`mark_sold`** takes a live or closed ad; `sold_at` is set (and cleared if the ad leaves sold); the seller's contact choice is kept — the contact door (`reveal_listing_contact`) answers only an active ad.
- **`relist_listing`** takes a sold ad only, back to review; an expired ad is renewed.
- **`renew_listing`** takes an expired ad (`renewNeedsExpired` otherwise; `renewOff` when the admin has switched renewal off) and puts it live at once with a run of `renew_days`, `published_at` and `renewed_at` now, `published_first_at` kept.
- **`set_listing_reserved(id, reserved)`**: the owner's live ad only ("only a live listing is reserved"); leaving live clears the mark.
- **`set_listing_price(id, mode, amount, currency, period, bp, negotiable)`**: the owner's live or closed ad; an ad in review, a draft or an ended ad is refused ("the price of this listing is changed through its edit"). It is judged as staff's edit is judged (INC-552's rule): the posting judge through step 5, with the ad's other fields as they stand and without its end date and places, which a price box cannot answer. A refusal comes back as the posting form's refusals and changes nothing; otherwise one `edit` revision with the price fields that changed.
- **The price record** (`listings_price_marks`, a trigger on every door that changes a price): `price_was` and `price_drop_at` for the "Price reduced" ribbon; a further drop under a standing ribbon keeps it; a rise or any change of currency, mode or period clears it.
- **`listing_history(id)`**: the owner reads his ad's history — when, what kind, by you, staff or the system (never a staff member's name), the status before and after, the names of the fields an edit changed, and a staff change's reason and note. Another person's ad and a missing ad give the same answer ("not your listing").
- **The expiry sweep** (`expire_stale_listings`, hourly) expires each due ad — with full or reduced reach — through `transition_listing`, which writes its revision and keeps the status a renewal returns it to (INC-470, INC-626: an ad with reduced reach was never swept).
- **Admin › Listings**: a closed ad shows in Ended and in All ("Closed").

Every seller door counts against the `revise` dial before it reads the listing (PR-45, PR-46). The migration's proofs check structure, privileges and that every redeclared body is its earlier body apart from the named changes; the doors' behaviour is proven by e2e/my-listings-doors.spec.ts:

- ML-1 close and reopen keep the days; Reserved goes on close; a closed ad in Admin › Listings' Ended and All;
- ML-2 nobody else moves a seller's ad, and a refused call writes nothing;
- ML-3 Reserved on and off, on a live ad only;
- ML-4 Sold from live and from closed; the contact closed to others; relist for a sold ad only;
- ML-5 the price at once and the "Price reduced" record;
- ML-6 an edit's review gives back the days; an expired ad is not edited;
- ML-7 renew an expired ad only, for the admin's days, with its dates;
- ML-8 the expiry sweep, full and reduced reach, with the system's revision;
- ML-9 the seller's history: you, staff, system — never a name;
- ML-10 the renew setting: who reads it, who may not change it.

No test writes the global `listing_policy` row: the off switch (`renewOff`) and a change of days are proven on the supervisor's local stand-in only, and turn 5's Settings box is tested without saving.

## The list page (bundle 16 turn 2)

- **`/my-listings`** — the My Listings panel's home (`homePath`, and its "My listings" item); signed-in only, like `/account` (a signed-out visitor goes to sign-in and comes back). The shell derives the panel from the path, as it does from `/post`, and leaves it on sign-out like `/account`.
- **The door, `my_listings(group, limit, offset)`** (STABLE definer; the caller's own ads only — its only key is `auth.uid()`): one group at a time, newest change first, at most 100 a page, with the counts of all six groups. The groups:

| Group           | Statuses                                                  | The row's line                                                                        |
| --------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Live            | active, reduced (reach is staff's lever and is not shown) | "Days left: N", "Ends today" or "No end date"; the Reserved and "Price reduced" marks |
| In review       | screening, held                                           | "Waiting for review"                                                                  |
| Needs attention | rejected, removed                                         | "Not approved"; "Removed by staff: <reason>" (the latest staff notice's reason)       |
| Closed          | closed, expired                                           | "No longer available · Days kept: N"; "Expired <date>"                                |
| Sold            | sold                                                      | "Sold <date>"                                                                         |
| Drafts          | draft                                                     | "Last saved <date>" and **Continue** (the posting form)                               |

- **The page** — the group selector with each group's count, then the rows: the cover photo (with the seller's session: a photo of an ad that is not live is still the seller's own), the title (or "Untitled draft"), the price and the line above. A table from 1280 px, cards below it. A refused or malformed answer shows an error with Retry, never an empty list. One ad's page and its actions come in turn 3; until then only a draft's row does something (Continue).
- **The Account overview** reads the same door's counts and shows the groups that hold ads, with the same words, and **Open My listings**. The seven status-by-status words (`account.overview.status.*`) are gone, with the "Paused" no ad could have (INC-469 closed).

Proven by MLP-1…MLP-4 (e2e/my-listings-page.spec.ts) and ML-U1…ML-U4 (src/features/my-listings/my-listings.test.ts).
