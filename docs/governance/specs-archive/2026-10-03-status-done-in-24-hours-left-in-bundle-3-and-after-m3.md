Source: supervisor thread, turn 1276, Sat 2026-10-03 21:42 New York.
Status at 2026-10-04: plan given on the operator's request ("please list task remaining and turns you plan to use for lovable"); turn counts are the supervisor's ESTIMATES; superseded as a status list by turns 1314 and 1368; bundle 5 (close-out) and the items "decided but not yet specified" are not built.
Related: bundle 2, bundle 3, bundle 4, bundle 5 (close-out), DEC-106 to DEC-117, INC-409.

Here is where things stand. Turn counts are my estimates, based on bundle 3 so far: about 10 Lovable turns in 4 hours.

## Done in the last 24 hours

**Bundle 2 (place and contact) closed and on main**
- Sub-city boxes, pickers that hide places already chosen, and Remove only when there is more than one place.
- The phone box with country picker, example number and length hint, plus a second phone.
- Contact and pin carried over from the last post, and "Post another ad".
- Your nine-line walk passed.

**Catalogue**
- Batches 18 and 19 imported: 168 categories, 555 definitions, 1,468 links.
- Reserved-names list finished: 435 organisations, 2,427 name forms.

**Decisions recorded**
- Contact visibility, seller-name rules, the store address ethio.com/name.
- Price page redesign, step order, default image and ribbon, clickable steps.
- Listing lifetime, catalogue lock, repository private at launch, the faster test approach.

**Bundle 3 (started about 5:35 pm)**
- The test selector.
- The security part, live and on main: database-enforced limits, private contact details and exact pins, the catalogue lock, crawler rules.
- The contact step: Messages box, optional channels, the phone library, required home country.
- The seller-name rules in the database, on prod and staging.
- 157 commits and 5 fully green CI runs; the last complete run had about 1,260 tests.

## Left in bundle 3

| Item | Lovable turns (estimate) | You |
|---|---|---|
| Seller-name screens: check as you type, suggestions, name history line, admin reason field, root-address guard | 2–3 | none |
| Place lists from A to Z | 1 | none |
| M3 (one access fix) and the final report | 1 | one staging apply |
| My verification, then Publish and your walk | none | about 10 walk lines |
| Walk fixes | 1–2 | re-walk the failed lines |

## After M3

**Bundle 4: the wizard** (10–14 turns, 1–2 staging applies, one walk)

| Turn group | Work |
|---|---|
| 1 | Census and the migration; you apply on staging |
| 2–3 | Price page: unit of sale, size, pieces per pack and quantity move here; price period for rent and hire; minimum term; payment terms |
| 4 | Step order (title and description after price); steps clickable on big screens |
| 5 | Title built from the answers; price never written into title or description |
| 6 | Default image on the review card; "Photos coming soon" ribbon |
| 7 | Seller's own pin when the item city changes; "this is also my shop" tick; right-to-sell statement |
| 8 | Listing lifetime: no end date by default, seller's own date, admin setting |
| 9 | Unit shown on cards ("per kg"); one shared picker |
| 10 | The four catalogue-engine items the curator is waiting on |
| 11–12 | CI fixes and the final report |

**Bundle 5: close-out** (6–8 turns, one staging apply, no walk)
- Wizard load time on a slow connection, and category search speed.
- The permission-function fix and the 161 older database warnings.
- CI housekeeping and the test-account pool.
- The records turn: every decision and incident from these weeks into the repo.

**Decided but not yet specified** (each needs a short spec session with you first, so no turn estimate yet)
- Several sizes on one ad, and discount pricing with a ribbon.
- Camera capture and photo clean-up; AI screening of every typed field.
- Admin page for posting limits and AI switches.
- Request a missing place, with the admin inbox.
- Notices before an ad expires.

**Outside the wizard, needed before a posted ad is usable**
- The screening step that moves an ad from "In review" to live.
- "My listings" and editing a published ad.
- The public ad page, with "Show contact".
- Messaging with email notices.
- Store pages.
- Launch items: private repository, Cloudflare bot rules, the domain switch.
