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

## Turn 3c — a sold ad in the feed for 30 days, and the ribbons (bundle 16)

- **A sold ad stays in the feed for 30 days (D175 1).** From the moment it is sold (or rented, or filled) it stays in the feed and in every public read — its row, its photos (so its cover keeps its link) and its places — for 30 days after `sold_at`, then leaves them; its contact stays closed (`reveal_listing_contact` answers only a live ad). In a place's feed a sold ad comes after every live ad (its rank is -1), the newest sale first among them, and it never counts toward the feed's widening. The rule is written once per reader (the feed index's refresh and check, `feed_page`, the three public reads); `feed_page` leaves an ad out the moment its 30 days end, and the daily feed check removes its rows (`sold_left_feed`).
- **The ribbons (D173, D180).** An ad's status shows as a ribbon in the site's second colour (the gold), the most important first: Sold (Rented, Filled), No longer available (the seller's own views only — buyers never see a closed ad), Reserved, Price reduced (never on a sold ad). On the feed card and on the ad's page it is one ribbon across the picture's corner (it replaces the photos-soon band); in the rows of My listings and in the ad page's status the marks are gold tags. While "Price reduced" stands (14 days), the card prints the old price struck through before the price (a screen reader hears "Was <price>").
- **What buyers see (D180).** The ad's page says it in one line: "Buyers can see this ad." (live), "Buyers see it marked Sold for 30 days, and can't contact you." (sold, with its own word), or "Buyers can't see this ad right now." (every other state). A reduced ad reads as live: reach is staff's lever and is not shown.
- **The card's answer** (`feed_page`) gains `soldWord`, `reserved` and `priceWas`; a page cached from before them reads as a live ad with no mark.

Proven by FR-9…FR-11 (e2e/feed-route.spec.ts), FE-15 (e2e/feed-index.spec.ts), FS-15 (e2e/feed-screens.spec.ts), MLA-11 (e2e/my-listings-ad.spec.ts), FP-12, FP-13, LC-4, LC-5 and ML-U11.

## Turn R1 — My listings on the site's table blocks (bundle 16; D181, D182, INC-630)

The operator's walk of turns 2–3b (2026-10-14) found the list unlike the site's other tables — no Filters, no Columns, no menu on a row, no Edit — its actions not laid out for every width, and the panel and its item both called My listings (D181; the study: claude/my-listings-rethink-study-2026-10-15.md in the Project). His answers (D182): the panel is **Seller Centre** («የሻጭ ማዕከል») and its item stays **My listings**; several ads at once on computers; the items not built yet stay visible; Post a similar ad in each ad's menu, with the edit turn.

- **The list on the blocks** (T1–T9, docs/features/display-primitives.md). The header: "My listings" and **Post listing**. The status groups with their counts above the table, as before. The toolbar: a search by title (case and spaces ignored, at most 100 characters); **Filters** — a top category with everything under it, Reserved, Price reduced — shown as chips with Clear all; **Columns** — Photo, Title (locked), Price, Status, Posted, Ends; the choice kept in this browser. The door filters: `my_listings` takes `p_search`, `p_category` and `p_mark`, and the six counts follow the search and the filters, as the rows do.
- **Each row's actions** (`RowActions`). A draft: **Edit** (the posting form) and a red **Delete**. Any other ad: a red **Delete** when it can be deleted, and the three-dots with **Open** and what the ad offers — the same rule as its own page (`offerFor`): Mark as reserved or Remove the reserved mark, Mark as sold (rented, filled), No longer available, Reopen, Renew for N days when the admin allows it. The ad's name opens it too. Mark as sold and Delete ask first. An action taken from the list reads the ad again first (its status may have changed; a closed ad's reopening status comes with it) and runs only when the ad still offers it; whatever the answer the list is read again, and the outcome shows above the table and comes into view. A published ad's **Edit** comes with the edit turn (D172), in its menu and on its page.
- **Several ads at once** (D182 2). From tablet width up each row has a tick-box, and the bar over the list offers **Mark as sold** (by the ads' word; "Mark as sold, rented or filled" for a mix), **No longer available**, **Renew for N days** and a red **Delete**, each for the ticked ads that offer it. Each asks first with the count ("3 ads selected") and runs ad by ad; the line says how many changed and, when some did not, why the first did not; the rate limit stops the set. A phone acts one ad at a time: its cards have no tick-box. The ticks clear after an action and when the group, the search, a filter or the page changes.
- **On a phone** one card per ad: its photo (80 px) on the left; the title with its gold marks, the price and the status beside it; the three-dots in the card's corner; Edit and Delete in its foot. From 768 px the cards are two to a row; from 1280 px it is the table.
- **The renew setting.** `my_listings` answers the admin's renew setting with the rows (`renewAllowed`, `renewDays` — the values `my_listing` gives), so a row offers Renew only when it is on.
- **One ad's page.** The actions are one bar under the title, as on the admin's listing page: the ad's main next step filled (Reopen on a closed ad, Renew on an expired one, Mark as sold on a live one, Continue on a draft), the others outlined, Delete red and last; each button full width on a phone; no heading. The status card, the ad as buyers see it and its history follow. Delete's confirm button is red.
- **The names.** The panel is "Seller Centre" (`panel.myListings`) on its tab and on the phone's bottom bar; its list stays "My listings" (`nav.myListings`).
- **The check** (INC-630). `scripts/admin-tables.ts` reads every file under src/features that draws a `DataTable`, not only the admin's: each table a user sees — My listings now; favourites, saved searches, messages and the seller's page as they come — is held to T1–T9.

Proven by MLP-5…MLP-7 and MLP-3's names (e2e/my-listings-page.spec.ts), MLA-12 (e2e/my-listings-ad.spec.ts), ML-U12…ML-U16, TBL-5, HS-26 and HS-27.

## Turn R2 — the seller's edit in boxes, Post a similar ad, the renew settings (bundle 16; D172, D177, D182 4; INC-631)

The operator's walk of turn R1 (2026-10-15): "I don't see where a user can do edit of own listing … User needs to be able to edit an advert."

- **Edit** is on every live, closed or refused ad (`EDITABLE_STATUSES`): first in the ad page's bar (`my-listing-edit`, outlined) and as the row's Edit in My listings, which opens the ad's page with its boxes open (`/my-listings/<id>?edit=1`). An ad in review waits for its answer (call G), an expired ad is renewed first (D174 3), a draft continues in the posting form (its row's Edit), a sold or removed ad is not edited.
- **The boxes** are the admin's edit form in its seller form (`ListingEditForm variant="seller"`), in the place of the ad as buyers see it, under the heading "Edit your ad": the **photos and the video link** first — the posting form's own photo tools; a photo is added, moved or removed at once, as in the posting form (a photo changed on a live ad is recorded for staff in Admin › Screening, D154 B5; the photo review of every change is turn 4, D178) — then the **title and description**, the **specifications** (the category shown, never changed — D172), the **price**, and **Save changes**. The seller gives no reason. Nothing changed: "Nothing has changed yet."
- **What Save does** (`edit_my_listing`, D177): only the changed fields travel; the door judges them as the posting form does (`validate_listing_draft` through step 5, every field not changed read from the ad). A new amount or an answer picked from a list applies at once and the ad keeps its status ("Your changes are saved."). Words — the title, the description, the video link, a typed price note, a typed answer (a text question or an "Other"'s words) — and any edit of a refused ad send the ad to review, with the days it had left kept until the answer (call A); the line says so. A refusal lands under its field and the boxes stay open (F4). One `edit` revision with the fields that changed.
- **Post similar** (D182 4's "Post a similar ad"; the house's action labels are at most three words with no article): in the ad page's bar (`my-listing-copy`, before Delete) and last in the row's three-dots (`-more-copy`), on any ad but a draft, a removed or a refused one (`copyable`). `copy_my_listing` makes a new draft with the ad's category, words, answers, price, video link, places, pin and contact choice — none of its photos, dates or marks — counted against the posting dial, its home country the server's residency fact (DEC-068); the posting form opens on it.
- **A closed ad's photos** (INC-631): the photo routes take a closed ad's photos like a live one's (`PHOTO_OPEN_STATUSES` gains `closed`, which predated it).
- **The renew settings** (D174 3, D175 2): Admin › Listings › All listings has **Settings** in its header (`listings-settings`, listings:enforce): whether sellers may renew an expired ad and the days a renewal gives (1–365; 30 at launch), saved with a fresh second factor through `admin_set_listing_policy`; the saved line is the page's notice.

Proven by ML-11…ML-13 (e2e/my-listings-doors.spec.ts), MLA-13 and MLA-14 (e2e/my-listings-ad.spec.ts), MLP-6's Edit and Post a similar ad, AL-30 (e2e/admin-listings.spec.ts), ML-U17…ML-U20, LE-7, RS-1…RS-3.

## Turn E2a — the seller's edit door takes places, contact and the place text (bundle 16; D187)

D187 (the operator, 2026-10-15): the seller's Edit is complete — the places the ad covers and the way buyers reach the seller are edited in the same boxes as the rest. This turn is the door; turn E2b puts the boxes on the page in the posting form's order.

- **`edit_my_listing`** (redeclared whole) takes four more keys: `coverage` (a list of place ids — judged at step 6 as when posting: each a city or a sub-city, within the plan's caps; the first becomes the ad's own place; `listing_locations` is rewritten in the sent order and the feed index follows), `contact_pref` (judged at step 7, the contact shape), `street_address` and `directions` (sanitised as the pin door sanitises them, 200 characters, a phone number or address refused `contactInNote`).
- **What applies at once:** a place or a contact change (picked from lists, D177): the ad keeps its status. **What goes to review:** a changed street or directions line, like the title (the ad keeps its time, as before). The category and the end date stay as posted (D172).
- **The revision** carries `coverage` (the place ids in order) when the places changed.
- **`set_listing_pin`** takes a closed ad (INC-631's rule: a closed ad is edited like a live one).
- Proven by ML-12's new cases and ML-14 (e2e/my-listings-doors.spec.ts). Spec: docs/governance/seller-edit-spec.md.

## Turn E2b — the seller's Edit, complete (bundle 16; D187; INC-640, INC-641)

The boxes are now the posting form's steps in the posting form's order: **Specifications → Photos → Title and description → Price → Place → Contact → Save changes.** The ad's page hands the form the ad's places, channels, text lines and pin (the same read the posting form resumes from), its id and its first three photo ids.

- **Title and description** is the posting form's own box (`StepDetails`): the title, the description and the writing helper ("Write it for me", the ad's own five tries, `/api/listings/assist` — the first three photos, the answers and the category path as facts). Its text goes to review as free text (D177).
- **Place** is the posting form's place step (`StepWhere`) inside the box `listing-edit-place-box`: the places (the plan's caps, the first the ad's own), the map pin, the directions line and the location details. **Places and the pin apply at once** — the pin through its own door the moment it is set, the places on Save. **A typed directions or street line goes to review**: in the Edit the two lines are not saved on blur; they ride Save (`textMode "form"`, `onTextChange`) and the door reviews them like the title. The box says so (`myListings.editBox.placeHint`). A street typed inside the map sheet rides with the pin, as when posting (known limit).
- **Contact** is the posting form's contact step whole (`StepWho`) inside `listing-edit-contact-box`: the channels (the phones shown, WhatsApp, Telegram, messages) travel to the ad's own `contact_pref` on Save and **apply at once** (`myListings.editBox.contactHint`); the identity block (the public name, the person or business, the home country) commits to the profile as it does when posting — on Save, when the seller worked in the box, through the step's own claim (a refused name holds Save at its control).
- **What travels** (`editChanges`): the places when the list differs and the seller worked in the Place box; the channels when they differ (`sameChannels`) and the seller worked in the Contact box — a box only looked at never sends the step's own tidying (the place step settles its rows; the contact step carries the profile's channels into an ad that has none); the street and directions lines whenever they differ, trimmed, an emptied line removed.
- **The admin's form** keeps its order and boxes (D171) and gains nothing: staff change places and contact only through the seller's own account.
- **INC-640** (the walk of 2026-10-15: "The phone box could not be loaded" on the contact step): a tab opened before a Publish still asks for the old chunk names, which the Publish replaced; the first lazily loaded piece then fails and Try again cannot help. `reloadOnStaleChunk` (src/lib/stale-chunk.ts, installed by the root route) answers `vite:preloadError` with one reload, once a minute at most (sessionStorage mark), so the browser fetches the new names; a real network failure is left to surface.
- **INC-641** (the same walk): "Go to My listings" after publish pointed at the feed from before My listings had a page; it goes to /my-listings.

Proven by MLA-13 (extended) and MLA-15 (e2e/my-listings-ad.spec.ts), LE-8…LE-11 (edit-listing.test.ts) and SC-1…SC-5 (stale-chunk.test.ts). Spec: docs/governance/seller-edit-spec.md.

## Bundle 17 turn 2 — the Edit is the wizard (D194, D192; INC-659, INC-660, INC-665)

The operator (2026-10-16): "edit should have exact features and step and look as post a listing wizard, except the first category and subcategory selection disabled for edit, first showing the preview for edit with easy navigating to different parts by clicking the edit except category and subcategory … save each step as in add listing wizard … cant we just use the same built wizard with fewer modifications?" Spec: docs/governance/edit-wizard-spec.md.

- **The entry.** Edit (the ad page's bar, `my-listing-edit`; the row's Edit in My listings) opens `/my-listings/<id>/edit` — the posting wizard in edit mode (`EditWizard`, src/features/posting/wizard.tsx), opened on its **Review**. The ad page's panel of turns R2 and E2b (`my-listing-edit-panel`, `ListingEditForm`) and `?edit=1` are gone; the ad page shows the ad as buyers see it in every state. Which ads: as before (`EDITABLE_STATUSES` — live, closed, refused); a draft's Edit opens the posting form as before; the sign-in standard of /post holds (a signed-out visitor comes back to the edit).
- **The Review in edit mode** ("Edit your ad"; `post.edit.why`, "Your ad"): every section with its saved value and its Edit link (`post-review-edit`, `data-step`) **except the Category** (locked: no link, the step strip's step 1 not a link, `goTo(1)` refused); no "In review" box, no publish statement or button; **Done** (`post-edit-done`) returns to the ad's page. The preview under the sections is the ad as it stands after the saves.
- **The steps** are the wizard's own, unchanged (`useEditDraft` has `useDraft`'s shape): Photos (a photo is added, moved or removed at once through the photo routes; the video link rides the step's save), Specifications, Price, Title and description (with the writing helper), Place (the two text lines in form mode, as E2b — they ride the step's save, never the pin door; the pin itself through its own door at once), Contact. **Nothing autosaves** (C3): `change` updates the screen only. **Save changes** (the step's Next) sends only **that step's changed fields** (`stepChanges`, edit-step-changes.ts — the door's names, compared with the ad as the door last confirmed it) through `edit_my_listing`, then returns to the Review ("Edit comes back", always, in edit mode; Back is also the way back). A step with nothing changed saves nothing (C4). The door's rules are D177's: amounts, picked answers, places and the contact apply at once; words go to review. **The notice** (D192): "Your changes are saved." / "Your changes are saved and sent for review…" shows for a few seconds under the step strip and fades (`FadingNotice`, `post-edit-notice`); a door error is said in words (`post-edit-problem`).
- **Refusals** land under their fields as the wizard draws them, the page scrolling to the first; **a refusal clears the moment its field changes** (INC-660). **INC-665:** a specification's refusal from `edit_my_listing` names its `attr_key` (the validator's shape); the seller's reader (`my-listing.ts refusalsOf`) read `field` only and said "failed" instead — it now resolves `attr_key` and keeps the detail, as the posting routes and the staff's door do.
- **INC-659** (the pin map after a place change) is covered by the Place step's own rule (a changed city clears the pin and the map opens on the ticked place) and proven by the E2E of this turn.
- Tests: ES-1…ES-6 (edit-step-changes.test.ts), EW-1…EW-5 (use-edit-draft.test.ts), FN-1, FN-2 (fading-notice.test.tsx), ML-U18 extended; E2E MLA-13…MLA-15 and MLP-6 rewritten for the wizard-edit, per the turn's brief.
