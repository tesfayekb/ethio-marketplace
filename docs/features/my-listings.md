# My listings

The seller's page of his own ads (D138), with the states and the rules the operator decided on 2026-10-14: D172 (the category of a posted ad never changes; edits in boxes), D173 (Sold, Reserved, No longer available; "Price reduced"), D174 (what applies at once and what is reviewed; close and reopen; renew), D175 (a sold ad for 30 days; the renew days an admin setting; both dates shown), D176 (renewals live at once until the screening gateway exists), D177 (free text is reviewed, picked answers and amounts are not), D178 (every photo labelled by the AI; only a pass is shown). The supervisor's spec, approved with D175: Project doc `claude/my-listings-spec-v2.md`.

Built in bundle 16, one turn at a time: (1) the doors; (2) the list page and the Account overview's six groups; (3) one ad's page and its actions, and a sold ad visible for 30 days in the feed with its ribbons on the card; (4) the photo review of D178; (5) the edit in boxes. (Turn 2 first planned the sold ad's 30 days too; they move to turn 3, with the actions that make an ad sold and the ribbons that say so — no screen marks an ad sold before turn 3.) Later word (turn 3, 2026-10-14): turn 3 is split — turn 3, one ad's page and its actions; turn 3b, a sold ad in the feed for 30 days, the Reserved, Sold and Price reduced ribbons on the card, Rented and Filled (call H) and Delete (call F).

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

- **The page** — the group selector with each group's count, then the rows: the cover photo (with the seller's session: a photo of an ad that is not live is still the seller's own), the title (or "Untitled draft"), the price and the line above. A table from 1280 px, cards below it. A refused or malformed answer shows an error with Retry, never an empty list. One ad's page and its actions come in turn 3; until then only a draft's row does something (Continue). Later word (turn 3): every other row has **Open**, its page.
- **The Account overview** reads the same door's counts and shows the groups that hold ads, with the same words, and **Open My listings**. The seven status-by-status words (`account.overview.status.*`) are gone, with the "Paused" no ad could have (INC-469 closed).

Proven by MLP-1…MLP-4 (e2e/my-listings-page.spec.ts) and ML-U1…ML-U4 (src/features/my-listings/my-listings.test.ts).

## Turn 2b — the fixes of turn 2 (bundle 16)

- **INC-627** — a fresh signed-out visit to `/my-listings` (and to `/account`) landed on the marketplace: the shell's live guard won the race against the page's own sign-in redirect. The guard now evacuates these two only after a sign-out in this tab; a signed-out visitor goes to sign in and comes back. Proven by MLP-3 (`/my-listings` and `/account` signed out; a sign-out on `/my-listings` still leaves for the marketplace).
- **MLP-2 at 360 px** looked for a draft's Continue inside the card's body; the table primitive puts a card's actions in the card's foot, beside the body (`my-listing-<id>-actions` holds both). The test looks in the card's box.

## One ad's page (bundle 16 turn 3)

- **`/my-listings/<id>`** — signed-in only, like `/my-listings` (a signed-out visitor goes to sign in and comes back to the same ad). Every row of the list that is not a draft has **Open**.
- **The door, `my_listing(id)`** (STABLE definer; one migration): the caller's own ad — the same row object as `my_listings` (proof P5 holds the two byte for byte, so the list and the page cannot word an ad differently), its group, the live status a closed ad reopens to, its country, and the admin's renew setting (allowed, days). One answer, "not your listing", for another seller's ad and for one that does not exist. `listing_history` is redeclared with one more key: a Reserved change's new value.
- **The page**, from the top: the way back to My listings; the title; **the status** — the group, the Reserved and "Price reduced" marks, the state in the list's own words (`stateLine`, shared), and the dates: first posted, renewed (D175 3), ends (a live ad), sold; **What you can do** — the actions below, or why there are none; **As buyers see it** — the same `ListingDetail` the posting preview and Admin › Listings draw; **History** — each change, newest first: when, who (You, Staff or System — never a staff member's name), what (created; a status change; renewed; marked reserved or the mark removed; the fields an edit changed), and staff's reason and note. A change only of reach (active and reduced) or of review queue (screening and held) is staff's and is not listed.
- **The actions** (the doors of turn 1; each re-checks everything, so a button is a convenience, never the rule):

| The ad                      | Its actions                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Live (active, reduced)      | Mark as reserved (or Remove the reserved mark), Mark as sold, No longer available                                   |
| Closed                      | Reopen (to the live status it was closed from, with its days), Mark as sold                                         |
| Expired                     | Renew for N days (the admin's days per renewal), when the admin allows it; else "Renewing is switched off for now." |
| Draft                       | Continue (the posting form)                                                                                         |
| In review                   | none — "It is waiting for review. You can change it once the review is done." (call G)                              |
| Not approved, removed, sold | none — "Nothing to change here right now."                                                                          |

Mark as sold asks first ("You cannot undo this."). After any action, whatever the answer, the ad, its history and the list are read again; a refusal is said in words ("This ad has changed…", "Too many changes…").

- Rented and Filled (call H) come with turn 3b: until then every category's button says "Mark as sold". Later word (turn 3b): they came — below.

Proven by MLA-1…MLA-6 (e2e/my-listings-ad.spec.ts) and ML-U5…ML-U9 (src/features/my-listings/my-listing.test.ts).

## Turn 3b — Delete and the sold words (bundle 16)

Turn 3 was split again (2026-10-14): turn 3b is the seller's side; turn 3c brings a sold ad into the feed for 30 days and the ribbons on the card.

- **Delete (call F).** Every ad but a removed one has **Delete**, last, behind a confirm ("You cannot undo this."). The door is `transition_listing` to `removed` as the owner: a seller who also holds a staff role deletes his own ad as its owner (no staff second factor); the ad is stamped `deleted_at`, leaves My listings (`my_listings` counts and lists it nowhere, `my_listing` answers "not your listing") and is never restored, not even by staff ("a listing its owner deleted is not restored"). Its record and history stay, as the retention rules say. An ad refused for a severe reason is still removed by staff only. After a delete the page returns to My listings.
- **Rented and Filled (call H).** Two category capability words, `rented` and `filled`, beside `bookable`, `map_pin` and `own_place`; the categories import accepts them. A sold ad of a leaf holding `rented` is "Rented" (Mark as rented, its confirm, "Rented <date>"), of one holding `filled` "Filled"; any other is "Sold". The doors return the word with each row (`soldWord`). The words are set on the leaves through the curator's categories file.
- **The actions card** shows why an action is not there in its own line (`my-listing-info`: an ad in review waits for its answer; renewing switched off); "Nothing to change here right now." is left for a removed ad.

Proven by MLA-7…MLA-10 (e2e/my-listings-ad.spec.ts), CT-46 (e2e/admin-categories-lifecycle.spec.ts) and ML-U10.
