Source: supervisor thread, turn 1248, Sat 2026-10-03 15:56 New York.
Status at 2026-10-04: list given on the operator's request ("please list as done earlier the tasks remaining in listing wizard"); regrouped into three bundles in turn 1250 and superseded by the lists of turns 1276, 1314 and 1368; groups 5 (decided earlier, not yet scheduled) and the items outside the wizard are still not built, except the shop-or-office tick and the publish statement (bundle 4).
Related: bundle 2, bundle 3, bundle 4, DEC-106 to DEC-113.

Here is everything still open on the listing wizard, in the order I plan to run it. Only the first group is in progress; the rest are decided but not yet built.

**1. Finishing now (bundle 2)**
- Lovable: fix the stray Remove button on a lone sub-city (CI is red on that one test), run the end-of-bundle tests in four parts, send the report.
- You: publish, then walk line 7 again, lines 10 to 12, the Real Estate pin check, and the two new lines (example number, "Post another ad").

**2. Contact permissions fix (next, before anything else)**
- Contact details and exact pins must stop being readable by someone not signed in.
- "Show number" for signed-in buyers, with each view recorded and limited.
- Switch wording becomes "Show to signed-in buyers".

**3. The wizard bundle**
- *Step order:* title and description move after price.
- *Navigation:* steps become clickable on big screens (left list and top bar).
- *Price page:*
  - Unit of sale, size of one unit, pieces per pack and quantity move here.
  - A price period is asked when the offer is rent, lease or hire.
  - Minimum term is asked as a number with a unit.
  - Payment terms move here.
- *Title and description:* the title is built from the seller's answers; the writing helper sees the unit and size; the price amount is never written into either.
- *Photos:* the default image shows on the review card; an optional "Photos coming soon" ribbon.
- *Place:* a seller's own pin is cleared or flagged when the item city changes.
- *Cards and preview:* the price shows its unit ("per kg").
- *Shared picker:* one component for the currency and phone-country lists.

**4. Seller name bundle (contact step)**
- Suggestions from the seller's name, never numbers or the email.
- Reserved names: site words, category names, brands, the 435-name list, anything containing "ethio".
- One change per 30 days; previous name shown for a year.
- Store address at ethio.com/name.

**5. Decided earlier, not yet scheduled**
- "This is also my shop or office" tick, saved to the profile.
- Several sizes on one ad (clothing, shoes).
- Discount pricing with a duration and a ribbon.
- Photo step: take a picture with the camera, automatic clean-up, AI improvement.
- AI screening of every typed field.
- A "I have the right to sell this" statement at publish.
- Admin page for posting limits per plan, with on/off switches for the AI features.
- Request a missing place, with the admin inbox for structured messages.
- Notices before an ad expires.

**6. Engine items the curator is waiting on (bundle 3)**
- The country word in catalogue text.
- Category links in catalogue text.
- A question shown only when two answers both match.
- Number limits that follow an earlier answer.

**7. Close-out (bundle 4)**
- Wizard load time on a slow phone connection.
- Category search speed, which is just over target.
- Test-account pool adoption and the leftover CI housekeeping.
- The records turn: every decision and incident from these weeks into the repo ledger.
- One final full test run.

**Outside the wizard, but needed before a posted ad is usable**
- The screening step that moves an ad from "In review" to live. Today nothing does.
- A "My listings" page, and editing an ad after it is published.
- The public ad page, and real photos on feed cards.
