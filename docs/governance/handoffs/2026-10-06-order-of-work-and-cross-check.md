# The order of work from 2026-10-06, and the cross-check that nothing was dropped

What this file is. On 2026-10-06 the operator answered a staged plan for everything that remains before and after opening, and directed that whenever a new order of work is drawn up, no item identified earlier may be dropped. The plan and the cross-check were written for him as a two-tab document ("ethio.com — what to build next, and why"; "Cross-check: nothing dropped"). This file is that document, both tabs, converted to Markdown word for word (PART 1 from the first tab as he answered it; PART 2 from the second tab as it stood on 2026-10-06 10:40Z), followed by what has been added since (PART 3). It is the plan of record until a later file replaces it; the executor's task list is the root `roadmap.md`; decisions are in `docs/spec/spec-ledger.md` (block S55: DEC-144, DEC-145, the sixteen answers).

How to read it. "I" is the supervisor and "you" is the operator. Sizes are ESTIMATES in executor turns, from the marketplace research report (Project doc `claude/marketplace-feature-review-2026-10.md`) unless marked. The reference numbers in the last column of the tables of PART 2 are those of `docs/governance/handoffs/2026-10-05-open-items-master.md` (for example 4.23), of the ledgers (INC, DEC, ACT, REQ, D-rulings) and of the research report (R1–R19, C1–C6, Q1–Q13). PART 1 was written before the operator's "nothing dropped" directive; where PART 2 adds a round or an item, PART 2 governs — the complete order is in PART 2 under "The complete order".

How it stays true. Every new item is given a place the day it is found; when the order changes, or when a stage is planned, the cross-check is run again against every open list (the open-items list, both roadmaps, the action tracker, the launch gate, every open incident); an item without a place stops the plan. Each stage's plan is explained to the operator part by part before its brief, and opens with a list of the earlier decisions it was checked against.

## PART 1 — The staged plan: "ethio.com — what to build next, and why" (as answered by the operator on 2026-10-06)

Build in eight stages. After each stage something new works on the live site from start to finish. I recommend stages 1 to 7 before opening to the public, and stage 8 right after.

This is my reading of the marketplace research report (2026-10-05/06, in the Project), checked against the code as it stands today. Updated on 2026-10-06 with your answers: the AI screens every ad from the first day, so screening moved up to stage 2. Sizes are ESTIMATES in Lovable turns, taken from the research unless marked.

### The order at a glance

| Stage | What works when it is done | Main pieces | Size (ESTIMATE, turns) |
| --- | --- | --- | --- |
| 1. The rules | Every user accepts the Terms at sign-in; every seller certifies before Publish; the list of banned items is public | Legal section (already approved) · banned-items and safety pages | 5–8 |
| 2. Automatic screening | The AI screens every ad the moment it is published; a clean ad goes live at once; penalties are automatic | Screening AI in two layers · duplicate check · the exceptions page · posting limits and AI switches · admin numbers | 16–25 |
| 3. A buyer can open the ad | A buyer opens a live ad, sees the photos, contacts the seller, shares it and reports it | The ad page · photos on list cards · contact ticks | 7–11 |
| 4. Sellers manage ads | A seller sees all their ads and can edit, renew, mark sold, pause or delete | My ads · views and contacts per ad | 6–10 |
| 5. Buyers find things | Lists start from the buyer's city; search and filters work; buyers save ads and categories | Search and filters (already planned) · favourites · saved searches | 2–4, plus search (not sized yet) |
| 6. Staying in touch | The site installs like an app; it sends alerts; buyer and seller talk on the site, with every message screened | Install and data saver · notifications · messages | 15–24 |
| 7. Account and data | A user can get a copy of their data, delete the account, and see signed-in devices | Your data page · devices list | 5–8 |
| 8. The seller page | A seller has a page at ethio.com/name to share | Seller page · business badge | 8–12 |

Stages 1 to 7 add up to about 56 to 90 turns, plus search. At the recent pace of four to six turns on a good day, that is 10 to 22 good days of Lovable work (ESTIMATE). Walks, fixes and search come on top.

### Where the site stands today

A seller can post an ad today, but nobody can see it. I checked each point below in the code this morning.

**What works:** sign-in with email or Google; the eight-step posting form across 152 categories, in English and Amharic; photos, places and contact details; the admin pages for categories, questions, places, translations and users.

**Three gaps block everything else:**

1. **A published ad waits "In review" for ever.** Nothing moves it to live: no person and no AI.
2. **No page shows an ad.** A buyer cannot open one. A seller has no "My ads" page to edit, close or delete one. The database already has every action; no screen uses them.
3. **The site sends no email or alert of its own.** The posting form already tells sellers "We email you when a message arrives."

All three were already planned. The research confirms the plan and adds detail on how to build each one. None of it needs payments.

**Who we are up against (from the research):** Jiji has run in Ethiopia since 2020, in Amharic, with over one million app installs. The other real competitor is the Telegram sales channel: a photo, a price, and a direct message or call.

### Stage 1 — The rules everyone agrees to

Start here: it is already approved, and every later screen quotes these texts. Lovable can build it while we settle the decisions for stage 2.

#### Terms, Privacy and consent at sign-in (already planned)

- **What:** An admin "Legal" section holding the Terms, the Privacy Policy and the publishing statement, as numbered versions in English and Amharic. Every user ticks "I am 18 or older and I agree" at sign-in. Every seller certifies before Publish, and again on edit and renew.
- **Why:** You approved this on 2026-10-04. Publish, edit, renew and report all quote these texts, so building them first avoids touching each screen twice.
- **Size:** 4–6 turns.

#### Banned-items page and safety page (research item R14)

- **What:** A public list of what may not be sold, and a page of safety advice, both kept in the same Legal section. The footer links to them; today the footer's "Safety" is plain text.
- **Why:** 10 of the 12 marketplaces studied publish such a list. The screening AI reads the same list, so it must exist before stage 2.
- **Size:** 1–2 turns.

#### One wording change: what we promise about screening (C1)

- **What:** Wherever the site describes screening, it says "Every ad is screened automatically; some are reviewed by a person." It never says "every ad is reviewed."
- **Why:** The research found a French marketplace convicted in 2015 for promising reviews it could not prove.
- **Size:** none of its own; it goes into the legal texts.

### Stage 2 — Automatic screening, from the first ad

Every ad is screened by AI the moment it is published, and a clean ad goes live at once. People step in only for a last appeal and a weekly spot check. This is the design already on record; your directive of 2026-10-06 puts it first.

#### The screening AI (R1)

- **What:** Every new or edited ad is read by AI, text and photos together, against the banned-items list. A clean ad goes live at once.
- **Two layers:** A fast model judges first. If it is unsure, or wants to block the ad, a stronger model takes a second look with a stricter brief. Only when the two disagree does a person see the ad, and no ad waits more than 24 hours.
- **What the seller sees:** live; hidden until a small problem is fixed, such as a phone number in the text; or refused, with the reason and how to fix it. A first appeal is answered by AI as well.
- **Penalties are automatic:** a strike, then a suspension of 7 or 30 days, then closure. A new seller is checked more strictly than a trusted one.
- **Why:** "Every post is screened" is the product's central promise, and you want people involved as little as possible.
- **What the research adds:** a fixed list of reasons, each with a one-line fix in both languages, and a price check for offers that are too good to be true.
- **Size:** 6–10 turns. The research's ESTIMATE is that 10–25 % of ads reach a person in the first months; the second layer and the 24-hour rule are there to bring that down.

#### Duplicate check (R5)

- **What:** A seller posting the same ad twice gets a warning. The same photo used by two different sellers is flagged to the AI, not refused outright.
- **Why:** A copied ad at a lower price is a known fraud pattern. It was already decided for the first version.
- **Size:** 2–3 turns.

#### The exceptions page (R6)

- **What:** One small admin page with two lists: ads the two AI layers disagreed on, and last-round appeals. Plus a weekly sample of 50 AI decisions for you to mark right or wrong. Ordinary reports are judged by the AI, not by a person.
- **Why:** In the EU a seller may ask for a person in the last round. The weekly sample is how the AI is tuned and how we know it still judges well, in Amharic too.
- **Your time:** about one to two hours a week at launch volumes (ESTIMATE from the design on record).
- **Size:** 4–6 turns.

#### Posting limits and the AI switches (R17)

- **What:** The admin page you asked for: how many ads and photos each plan allows, and one on/off switch per AI feature. A seller who hits a limit keeps the ad as a draft and sees why.
- **Why:** The free plan needs a shape before any paid plan can differ. The switches protect the AI budget.
- **Size:** 3–4 turns.

#### Numbers on the admin home page (R19)

- **What:** Ads by state, how long each review list is, new users, posts and contact views per day.
- **Why:** You have no counts today.
- **Size:** 1–2 turns.

### Stage 3 — A buyer can open the ad

With screening in place, this stage closes the loop: post, pass the AI, open the ad, contact the seller.

#### The ad page (R3)

- **What:** The page a buyer opens: photos, price, details, place, the seller's name and "member since". It carries Show contact, Telegram and WhatsApp buttons, Share, and Report with a fixed list of reasons.
- **Why:** No page shows an ad today. Everything that makes a buyer trust an ad lives on this page.
- **How contact works:** only a signed-in buyer sees the contact, after a tap, and each tap is counted. The Telegram and WhatsApp buttons open a chat with the ad's link already filled in.
- **Size:** 5–8 turns.

#### The safety box (C3)

- **What:** Four short lines beside the contact buttons: do not prepay; meet in a safe public place; inspect before you pay; check the documents. Its header is the line you approved: "ethio.com does not verify sellers or ads. Inspect before you pay."
- **Why:** Jiji prints four such lines on every ad in Ethiopia. The common scams all need the buyer to pay before seeing the item.
- **Size:** inside the ad page.

#### Photos on the list cards, and "load more" (R4)

- **What:** Each card in a list shows the ad's own photo, and lists load a page at a time.
- **Why:** Today a card shows the category's picture, never the ad's photo, and a list would load every live ad at once.
- **Size:** 1–2 turns.

#### "Contact verified" ticks (R15, first step)

- **What:** Small ticks on the seller's card: Email ✓ and Google ✓ now, Telegram ✓ once Telegram sign-in exists.
- **Why:** A free trust signal from what the account already proves. The site never says "verified seller" on its own.
- **Size:** 1 turn.

### Stage 4 — Sellers manage their ads

A seller gets one place to see and change everything they have posted.

#### My ads (R2)

- **What:** One page with tabs: In review, Live, Needs edits, Closed, Drafts. Each ad has a menu: Edit, Renew, Mark sold, Pause, Delete. "Needs edits" shows the reason and an Edit button right there.
- **Why:** A seller cannot see, edit, close or delete a posted ad today. Delete follows your rule: the ad leaves the seller's list and is kept for 12 months.
- **Decided on 2026-10-06:** Renew moves the ad back to the top, free once every 7 days. Pause works per ad. No "sold where?" question for now.
- **Size:** 4–7 turns.

#### Views and contacts on each ad (R16)

- **What:** Two numbers per ad in My ads: Views, and Contact views.
- **Why:** Sellers see these on 7 of the 12 marketplaces. They tell a seller the ad is working, and they show us which ads draw unusual traffic.
- **Size:** 2–3 turns.

### Stage 5 — Buyers find things

A buyer starts from their own city, searches, narrows the list, and saves what they like.

#### Lists by place, search and filters (already planned, not from the research)

- **What:** Lists that start from the buyer's city and widen outward. A working search box. Filters built from each category's own questions.
- **Why:** The search box in the header does nothing today, and lists are not yet narrowed by place.
- **Size:** not sized yet; I will size it with its spec.

#### Favourites (R7)

- **What:** A heart on every ad, and a Saved page. A saved ad shows when it is sold or its price has changed. You asked for favourite categories and subcategories as well: a buyer marks a category and reaches it in one tap.
- **Why:** 9 of the 12 marketplaces have it; it is the most common buyer feature after search. The menu already has a "Saved" entry waiting for it.
- **Size:** 1–2 turns for ads; favourite categories are not sized yet.

#### Saved searches (R8)

- **What:** A buyer saves a search under a name. Alerts for new matches come with notifications in stage 6.
- **Why:** 4 marketplaces have it. It is cheap once filters exist, and the alert is what brings a buyer back.
- **Size:** 1–2 turns.

### Stage 6 — Staying in touch

The site reaches people when they are not on it, and buyer and seller talk without leaving it.

#### Install like an app, and data saver (R18)

- **What:** "Add to home screen", with the last pages still opening when the connection drops. A data-saver mode: small photos first, tap for the full one.
- **Why:** Phone alerts need it. The research puts mobile data at about 45–50 birr per GB (ESTIMATE) and Ethiopian users on 3G more than 40 % of the time.
- **Size:** 2–4 turns.

#### Notifications (R9)

- **What:** Email and phone alerts for a new message, an ad approved or needing edits, a saved-search match, and security events. A settings page switches each one on or off.
- **Why:** The posting form already promises an email when a message arrives. Reminders, notices of changed Terms and messages all depend on it.
- **Cost note:** the email service's free plan allows 100 emails a day. Until we pay for more, low-priority email goes out as a daily summary.
- **Size:** 5–8 turns.

#### Messages on ethio.com (R10)

- **What:** Buyer and seller chat on the site, with photos, block and report. Quick replies such as "Is this still available?". A safety line at the top of every new chat.
- **Screening:** every message and photo passes the same AI check as an ad, as you directed. A message that breaks the rules is held back, and repeat offences count toward the same automatic penalties.
- **Why:** You ruled that messages on ethio.com are the default way to contact a seller. It is also the only channel where a scam report comes with evidence.
- **Bonus:** the chat data gives an honest badge for the seller's card, "usually replies within a day", with no ratings needed.
- **Size:** 8–12 turns, the largest single piece.

### Stage 7 — Your account and your data

A user controls their own data and can see who is signed in to their account.

#### The "Your data" page (R13)

- **What:** Two buttons. "Get a copy of my data" sends a download link by email. "Delete my account" asks for a second sign-in check, then follows the keeping periods you set: 12 months, or 3 years where there is a legal dispute.
- **Why:** It is a legal right in the EU, the UK, Ethiopia, Kenya and South Africa, and it is already on the launch list.
- **Size:** 3–5 turns.

#### Devices and sign-in history (R12)

- **What:** A list of the devices signed in to the account, a sign-out button for each, and an email when a new device signs in.
- **Why:** With no SMS, the main risk is someone taking over the user's Google or Telegram account. This is how a user notices and stops it.
- **Size:** 2–3 turns. It fits best alongside Telegram sign-in.

### Stage 8 — The seller page

A seller gets one address to share everywhere.

#### Seller page at ethio.com/name (R11)

- **What:** Name, logo, description, links to the seller's website and social channels, the shop or office on a map, and all the seller's ads. You have already ruled the address and that any seller may open one.
- **Why:** Businesses, in the diaspora especially, need one page to share. 8 of the 12 marketplaces have one, including Jiji and Engocha in Ethiopia.
- **Needs from you:** nothing more; you chose the first version's fields in decision 14.
- **Size:** 5–8 turns. "Follow this seller" is added once notifications exist.

#### Business badge (R15, second step)

- **What:** A business uploads its documents, an admin reviews them, and the page shows a badge.
- **Why:** It separates a registered business from a private seller, which the email and Google ticks cannot do.
- **Size:** 3–4 turns.

### Three things to do differently from other marketplaces

The research found three places where copying the others would hurt us.

1. **Promise only what we can prove about screening.** This is the wording change in stage 1.
2. **No star ratings at launch.** Without a payment on the site, we cannot tell who really bought. Poland's regulator charged OLX in 2023 over "buyer" opinions that needed only a chat. Show honest signals instead: member since, the contact ticks, and "usually replies within a day". A complaint about a seller is handled as a report.
3. **Telegram and WhatsApp buttons use the seller's saved details, never a number typed into the ad.** Only a signed-in buyer sees them, after a tap, and each tap is counted. Engocha leaves the raw phone number in the page for anyone to collect; ours stays behind the sign-in.

Two findings need no new work. Amharic needs no special numerals, and the browser already prints the birr as «ብር». For speed, I will measure the site on a 3G setting at the launch check, because its first-load limit is about twice what guidance for cheap phones suggests.

### Not now, and why

The research puts these on a "later" list. You confirmed the two that were yours to overrule: price-drop alerts stay later, and Telegram-bot alerts follow Telegram sign-in.

| Item | Why it waits | What would bring it back |
| --- | --- | --- |
| Star ratings and reviews | No honest way to know who bought without payments | Payments or bookings on the site, or your choice to accept chat-based feedback with safeguards |
| Alerts through a Telegram bot | No marketplace studied has it, though it is free and fits Ethiopia best | Telegram sign-in: the bot may then message the user at no cost |
| Price-drop alerts on saved ads | Two marketplaces have it; needs favourites and notifications first | One turn once both exist |
| Offers inside a chat | Elsewhere they are tied to checkout; a quick reply covers the informal kind | Payments |
| "Seen" ticks, online status, last seen | A privacy question we have not discussed | Your wish; "active this week" is the safe form |
| Browsing on a map, distance radius | Nearest-first lists already cover "near me"; map tiles are heavy on 3G | After stage 5, once the map cost is measured |
| ID-and-selfie verification | A fee per check; no provider found that covers Ethiopia's Fayda ID | Paid features, or a provider that covers Fayda |
| Paid boosts and featured ads | The first version is free | The payments era |
| Ethiopian calendar, Ge'ez numerals | No marketplace uses them; Amharic month names already come free | A form that needs a typed Ethiopian date |
| Right-to-left layout for Arabic | Arabic is a later language | When Arabic is scheduled |
| A directory of shops | It follows the seller page | After stage 8 |
| Translating users' ads and messages | Already planned for a later phase | As planned |
| Voice messages | Screening audio is not solved | After stage 6 |
| Alerts by WhatsApp or SMS | About $34–84 per 10,000 WhatsApp messages and $3,425 per 10,000 SMS (ESTIMATE), against free email and phone alerts | A paid plan that funds them |
| Compare ads, recently viewed, public questions under an ad | Almost no marketplace studied offers them | Nothing seen |

### Your decisions

Your answers of 2026-10-06. Decision 3 stays open. Each one is worked out in detail when its stage is planned, and checked first against everything decided before.

| # | Decision | Your answer | What happens |
| --- | --- | --- | --- |
| 1 | Build order | AI first, from the first ad; tune it as we go | Screening is stage 2. No person approves ads first. |
| 2 | Opening day | Agreed | Stages 1–7 before opening, messages included. |
| 3 | The safety box and the screening promise | Not sure yet | Open. I bring the exact words when we plan stage 3. |
| 4 | Report reasons | Agreed, and the list needs more reasons | We build the full list when we plan stage 3. |
| 5 | Renew | Agreed | Back to the top, free once every 7 days. No ad is hidden for its age. |
| 6 | Pause | Agreed | Pause per ad now. "Away" comes with the seller page. |
| 7 | "Sold where?" | No for now | Not asked. It can return when people sell on the site itself. |
| 8 | Contact ticks | Agreed | Email ✓ and Google ✓ on the seller's card. |
| 9 | The free plan's limits | Yes | Shape confirmed. The numbers are set on the admin page. |
| 10 | Favourites and saved searches | Yes, and favourite categories and subcategories too | All three in stage 5. |
| 11 | Price-drop alerts | OK, later | After stage 6. |
| 12 | Alerts through a Telegram bot | Yes | Right after Telegram sign-in is built. |
| 13 | Data saver | Yes | Stage 6. |
| 14 | Seller page, first version | Yes | Category line and hours in. Cover image later. Follow with notifications. |
| 15 | Business badge | Yes | Trade licence or TIN certificate, checked by an admin. |
| 16 | Star ratings | Yes | None at launch. |

**New from you on 2026-10-06:**

- Screening is fully automatic, with people involved as little as possible.
- The second AI layer is a stronger model. It also reviews anything the first layer wants to block, not only what it is unsure about.
- Messages between buyer and seller are screened too.
- Each stage's plan is checked against earlier decisions before it reaches you, so a new decision never fights an old one.

### How this turns into work for Lovable

Lovable keeps working while we discuss; nothing here stops it.

1. **Now:** the current round of fixes, then a small round for the posting form: your rule from today on what a changed answer may reset, previously used categories, and a number-format fix.
2. **Then stage 1**, which you have already approved.
3. **Before each later stage** I explain its plan to you part by part, and only then does Lovable receive it. Each stage ends with one short walk.

**What this changes in the plan on record:**

- Automatic screening is built right after the rules, before the ad page and My ads.
- The screening AI gets a named place, stage 2. The recorded plan listed it as open but gave it no slot.
- Notifications come before messages, because messages depend on them.

**What keeps its place:** several prices in one ad, sharing an ad to the seller's own channels (the Share button in stage 3 is its first part), and the launch checklist.

The research also found twelve small issues in the code. I am registering those myself; there is nothing in them for you to decide.

**Sources:** the marketplace research report of 2026-10-05/06 (Project doc "marketplace-feature-review-2026-10") for every count and comparison with other marketplaces; the code and the plan on record, read on 2026-10-06.

## PART 2 — "Cross-check: nothing dropped" (2026-10-06)

Nothing identified earlier is dropped by the new order. All 350 lines of the open-items list of 5 October, and about 95 newer ones, now have a named place. Twenty of them had no place in the eight stages; the second table shows where I put each one.

I checked five lists against the code and the records as they stand this morning: the open-items list of 5 October; the two plan files and the action list in the repository; the launch checklist; every defect still marked open; and everything recorded since 5 October, including the research report. The numbers in the last column of each table are the references in those lists.

### The count

Of the 350 lines on the list of 5 October, 84 are done and 255 are still open. Every open line has a place below.

| Where it lands | Lines from the 5 Oct list |
| --- | --- |
| Done since 5 October | 84 |
| Closing the current round, and the posting-form round | 11 |
| Tidy-up round | 47 |
| Stages 1 to 8 | 67 |
| Posting-form extras, after stage 4 | 17 |
| Launch round | 12 |
| Your launch checklist | 22 |
| Yours, any time | 22 |
| Curator | 12 |
| My own duties and watches | 22 |
| Later, with a named trigger | 23 |
| Recorded, no action needed | 11 |
| Total | 350 |

A line that touches two places is counted once, at its first place.

Newer than that list, and placed the same way: 26 defects (18 fixed, 8 open), 14 decisions (11 built, 3 placed), the research report's 19 recommendations, 6 wording changes and 12 code notes, your 16 answers of 6 October, and 2 curator deliveries. The last section lists them.

### Items that had no place in the eight stages

These twenty were on the earlier lists and the staged plan did not name them. Each now sits in a stage or in one of three added rounds. The placements are mine; tell me if you want any moved, and each is discussed again when its stage is planned.

| # | Item | Where it sits now | Ref. |
| --- | --- | --- | --- |
| 1 | The tidy-up work: security checks, flaky tests, CI report fixes, the full test run that closes the posting era, the review through four lenses | New tidy-up round, after stage 1 | 2.13, ACT-009 |
| 2 | Several prices in one ad (you agreed on 4 Oct) | Posting-form extras, after stage 4, first in line | DEC-131 |
| 3 | Several sizes on one ad; price drops with a ribbon | Posting-form extras | D68 |
| 4 | Photo tools: take a photo in the form, automatic clean-up, AI improvement | Posting-form extras. The AI check of photos is in stage 2 and photos on cards in stage 3 | D65 |
| 5 | Six smaller form-engine items: locked yes/no facts, a "not in" condition, guest-category order, collapsed facts, two questions in one card slot, rent per m² per month | Posting-form extras | W4b, D63, D53 |
| 6 | The Services page: health and cost of every outside service, and a warning before a key expires (you approved it on 30 Sep) | Stage 2, beside the AI switches | DEC-091 |
| 7 | An alert when one account opens an unusual number of categories in a day | Stage 2, with the admin numbers | 9.18 |
| 8 | The rest of your publishing-statement ruling: the policy version stored with each certification; a rule for digital copies of creative works | Stage 1 and stage 2 | D66 |
| 9 | "Request a missing place", a Contact us page, and one admin inbox for both | Stage 3 | 2.20 |
| 10 | One share-size picture per ad; search-engine basics for the ad page | Stage 3 | 5.27, 5.28 |
| 11 | A real "paused" state; the expiry job following the same state rules as every other change | Stage 4 | research notes 2, 3 |
| 12 | Rate limits on reports, search and messages | Stages 3, 5 and 6 | research note 6 |
| 13 | Notices before an ad expires and "still available?"; the email announcing changed Terms | Stage 6, by name | 2.14, 2.21 |
| 14 | Approved ads posted on ethio.com's own Telegram channels | Stage 6 | ACT-007 |
| 15 | Settings: edit profile, contact channels and home country outside an ad | Stage 7 | 2.18 |
| 16 | Telegram sign-in. The plan leaned on it three times and no stage built it | Stage 7 | DEC-012 |
| 17 | Before opening: backups with a restore drill, watchdogs, error monitoring, the sign-up security check, speed on 3G, redirects from the old site | New launch round, after stage 7 | 3.2, 3.22, 3.25, 3.30 |
| 18 | A check of the legal texts: every feature they describe is built by opening day, or its sentence comes out | Stage 1 | 3.42 |
| 19 | An approximate price in the buyer's currency. The Terms mention it and nothing builds it | Your decision at the launch round: build it or remove the sentence | REQ-018 |
| 20 | Seller-name leftovers: "This is my organisation, request it"; AI name suggestions; loading corrections to the reserved names | Stage 8 | 5.6 |

### The complete order

The eight stages keep their order. Four rounds are added around them so that the carried items have a slot.

1. **Now: finish the current round (bundle 6).** Lovable's turn 7, then the records.
2. **Posting-form round (bundle 7).** Your reset rule of 6 October, previously used categories, one number format, and six smaller items. I explain it part by part before Lovable gets it.
3. **Stage 1: the rules.**
4. **Tidy-up round (added).** Security checks, test health and the close of the posting era. Lovable does it while you and I go through stage 2's plan. It needs no decisions from you.
5. **Stage 2: automatic screening.**
6. **Stage 3: a buyer can open the ad.**
7. **Stage 4: sellers manage their ads.**
8. **Posting-form extras (added).** Several prices in one ad first; then sizes, price drops, photo tools and the smaller engine items. You may move any of these to after opening.
9. **Stage 5: buyers find things.**
10. **Stage 6: staying in touch.**
11. **Stage 7: account and data.**
12. **Launch round (added) and your launch checklist.** Then the site opens.
13. **Stage 8: the seller page.**

Running beside all of it: the curator's catalogue work, and my dated duties.

Sizes: the tidy-up round was estimated at 6 to 8 turns on 3 October, before later additions (ESTIMATE). The posting-form round, the extras and the launch round are not sized yet; I size each with its plan. The items added to stages 2, 3, 6, 7 and 8 will raise those stages' sizes as well.

### Now and next

Three rounds sit around stage 1. Only the posting-form round needs your word, and I explain it first.

#### Closing the current round (bundle 6)

| Item | Ref. |
| --- | --- |
| Turn 7 (Lovable is on it): the scratch clean-up rule also catches the 24 keys it missed; three pastes owed from turn 6 | INC-463 |
| One more green run for the attributes console tests before I close their defect | INC-452 |
| Records turn for bundle 6: today's decisions and defects, your rulings of 6 Oct (reset rule, AI-first screening, the 16 answers), the bundle-6 walk result, a new handover | DEC-136..145, INC-450..463 |
| In the same records turn: the plan file in the repository rewritten to this new order (it shows the order of 5 Oct: legal, My ads, Report… with screening unplaced) | 4.51, 6.34 |
| In the same records turn: three requirement lines still owed - gambling on the banned list, the store address without @, the search-landing-page question | 6.33 |
| In the same records turn: the research report's twelve code observations registered as defects; two stale feature documents corrected | 4.54 |

#### Posting-form round (bundle 7)

| Item | Ref. |
| --- | --- |
| Your rule of 6 Oct: a changed answer resets only what depends on it; the parent question comes first; an earlier answer narrows a later one | DEC-144 |
| Previously used categories on the first step of the posting form (your request of 5 Oct; the seller half of ruling D56) | 6.10 |
| One number format everywhere: answers and ranges print with thousands separators, like prices | INC-451 |
| Admin categories: deleting a category with children is refused; the "Home" badge and "Make home" button | 4.23 |
| Nightly database security check, with a count of the older checker warnings | 4.3 |
| Every list that could silently stop at 1,000 rows: found, then paged or capped on purpose | INC-459 |
| Tests that leave scratch questions behind on staging: fixed at the source | INC-463 |
| Three checks I do in the code first; any that fails gets a fix line here: a saved extra place in another country after Back; the chosen currency stays visible while searching; the built title on "Other" categories | 4.10, 4.13, 4.15, INC-343 |
| A test that Unit of Sale is asked before Quantity (promised 1 Oct; not found in the tests today) | 9.20 |
| ADDED 6 Oct - an ad that holds a switched-off answer prints the answer's internal key instead of its label | INC-466 |
| ADDED 6 Oct - the admin console's Merge refuses while any ad holds an answer under the list being removed; the same check on the other delete actions | INC-467 |
| ADDED 6 Oct - the built title leaves out a label that names the country, because the title is written before the place is chosen | C33 fact 7 |

#### Tidy-up round

| Item | Ref. |
| --- | --- |
| Security: a permission check that answers about other accounts; helper functions callable by signed-in users; the promised audit of privileged database functions | 3.11, 4.1, 4.2, 9.4, INC-409 |
| Flaky tests: one turn for every test that failed and passed on retry three times in a week, plus an automatic list of them in each CI report | 4.30, 4.31, 4.32, 4.33, 4.34, 4.63, 10.3, INC-285, INC-322, INC-333, INC-335, INC-339, INC-345, INC-440, INC-441, INC-449, INC-218, INC-286, INC-287 |
| CI report fixes: lint errors shown; error context found; the accessibility heading still says "non-gating" | 4.27, 4.28, 4.29, INC-419, INC-429 |
| "Listing not found" server lines above target | 4.26, 10.4, 12.25, INC-398 |
| Truth pass of the old one-letter roadmap lines and the open list of 25 Sep: each marked built or still open | 2.13, 6.6, 12.20, 12.43, 2.24, ACT-009 |
| The full local test run that closes the posting era; the two test files over the size rule split | 4.35, 4.38, 10.13, 4.37, 4.40 |
| Posting form load time on a slow phone connection: measure the five biggest costs | 4.11, INC-351 |
| Small read-only checks never answered: raw field names in the refusal summary; rows with an empty Amharic name; the "Suggest icon" note; three help-text censuses; two numbers from bundle 4 | 4.12, 4.17, 4.18, 4.19, 4.39 |
| Old defect lines whose status was never settled: four importer numbers; a duplicate database helper queued in August for a gate that never ran; three status lines that still say open after their fix | 4.24, INC-261, INC-262, INC-267, INC-203, INC-028, INC-016 |
| CI evidence files removed from the working branch; a detector for work stranded on side branches | 5.13, 5.18, 6.17, 12.22, DEC-096, DEC-098 |
| The test-account pool formally adopted - before Supabase's fair-use date, 1 Nov 2026; the tallies of the other running trial rules | 9.10, 10.6, DEC-097, DEC-099, DEC-104, DEC-115, DEC-119 |
| Staging log volume trimmed (41.8 GB against 20 GB included; billed from 2027) | 4.44, 9.9 |
| Platform checks: the private package cache behind the lockfile; one fix never probed on the live hosting build; old staging warnings | 4.4, 4.41, 9.11, INC-420, INC-421 |
| The security proofs of August brought onto today's test harness | INC-186, INC-117, ACT-C3-1, 10.18 |
| The close-out review of the posting era through four lenses (security, function, speed, ease of use) - owed for bundles 1 to 6 | 6.35 |

### Stages 1 to 4, and the posting-form extras

Lines marked ADDED were not in the staged plan before this cross-check.

#### Stage 1: the rules

| Item | Ref. |
| --- | --- |
| Legal section: Terms, Privacy, publishing statement as numbered versions; the 18+ tick at sign-in; the seller's certification on publish, edit and renew | 2.8, 3.35, 5.1, 6.1, ACT-002, DEC-128, DEC-129 |
| Banned-items page and safety page; gambling, betting and lotteries on the banned list | 3.46, 5.4, R14 |
| Wording: "every ad is screened automatically; some are reviewed by a person" | C1 |
| Check of the legal texts before they go live: every feature they describe is built by opening day, or its sentence comes out (converted prices, promoted ads, translated ads, staff help inside an account…) | 3.42 |
| The policy version stored with each certification (rest of ruling D66) | 5.16, 6.14 |
| Two answers I need from you when we plan this stage: store the IP address with each acceptance? 14 or 30 days' notice of a change? | 8.24, 8.26 |
| One more answer at this stage: publish the banned-items page before a lawyer has read it, as with the Terms ("version 1, before counsel")? | 8.20 |

#### Stage 2: automatic screening

| Item | Ref. |
| --- | --- |
| The screening AI in two layers, automatic penalties, first appeal by AI (your directive of 6 Oct) | 2.23, 5.25, 6.21, 3.14, DEC-145, R1 |
| What it must screen: every typed field and write-in, phone numbers in text, photos, gambling, the alcohol word list, khat, the kept-out catalogue lines | 9.17, 7.6 |
| Duplicate check | R5 |
| The exceptions page and the weekly sample of 50 decisions, with labelled Amharic examples from day one | R6 |
| Posting limits and one switch per AI feature (rulings D69 and D64), with ad lifetime by plan | 2.16, 5.10, 5.22, 6.11, R17 |
| Numbers on the admin home page | R19 |
| ADDED - the Services page: health and cost of every outside service, and a warning before a key expires (you approved it 30 Sep; it had no place) | 5.17, 6.16, 3.45, DEC-091 |
| ADDED - an alert when one account opens an unusual number of categories in a day (promised 3 Oct) | 9.18 |
| ADDED - the door rule for digital copies of creative works (rest of ruling D66) | 5.16 |
| A question for this stage: must any business category prove identity before posting? | Q-007 |

#### Stage 3: a buyer can open the ad

| Item | Ref. |
| --- | --- |
| The ad page with Show contact, Telegram and WhatsApp buttons, Share with a preview card, and Report | 2.10, 2.23, 5.5, 5.26, 6.3, 6.20, 3.43, ACT-G1, ACT-004, R3, C4 |
| The safety box beside the contact buttons (your decision 3 is open: I bring the exact words) | C3 |
| The ad's own photo on list cards (the "Photos coming soon" ribbon then hides by itself); lists load a page at a time | R4 |
| Contact ticks on the seller's card | R15 |
| ADDED - one share-size picture per ad, with the title as its text for screen readers | 5.27 |
| ADDED - "Request a missing place", a Contact us page, and the admin inbox both land in | 2.20, 6.18 |
| ADDED - search-engine basics for the ad page: real titles, structured data, a sold ad keeps its page for a while | 5.28, ACT-G3 |
| ADDED - a rate limit on reports; the accessibility check covers the new page | 5.29 |
| ADDED 6 Oct - on an ad page a country named in a label is always the ad's own country, never the reader's | C33 fact 3 |

#### Stage 4: sellers manage their ads

| Item | Ref. |
| --- | --- |
| My ads: edit, renew, mark sold, pause, delete; the keeping periods you set (12 months; 3 years for disputes) with the clean-up job | 2.9, 5.2, 6.2, ACT-003, DEC-130, R2 |
| Views and contact views per ad | R16 |
| ADDED from the research's code notes: a real "paused" state (the label exists, the state does not); the expiry job goes through the same state rules as every other change | research notes 2, 3 |

#### Posting-form extras, after stage 4

| Item | Ref. |
| --- | --- |
| Several prices in one ad (the price table you agreed on 4 Oct) | 2.11, 5.3, 6.5, ACT-006, DEC-131 |
| Several sizes on one ad; price drops with a ribbon (ruling D68) | 2.19, 6.12, 6.24, 7.7 |
| Photo tools: take a photo in the form, automatic clean-up, optional AI improvement (ruling D65) | 2.17, 6.13 |
| Smaller form-engine items: locked yes/no facts and lighter model lists (W4b); a "not in" condition; guest-category order (D63); facts shown collapsed (D53); two questions sharing a card slot; rent "per m² per month" | 5.20, 5.21, 5.15, 6.9, 4.25, 5.23, 6.29, 7.4 |
| ADDED 6 Oct - an answer offered only in some countries, so that "Ethiopian-made" stays available outside Ethiopia; the two "Made in" lists wait for it (your answer of 6 Oct) | D75 |

### Stages 5 to 8, and the launch round

#### Stage 5: buyers find things

| Item | Ref. |
| --- | --- |
| Lists that start from the buyer's city; search; filters from each category's questions; category pages that search engines can land on | 6.26, 6.27, 5.14, 5.28, Q-020 |
| Favourites, favourite categories (the buyer half of ruling D56), saved searches | R7, R8 |
| Carried into this stage: the "negotiable only" filter; the search-speed target missed by 6 ms; tags; the fasting filter reads Food Type; a rate limit on search; how far a list widens when a city has few ads | 4.14, 9.2, 12.21, INC-363, Q-005 |

#### Stage 6: staying in touch

| Item | Ref. |
| --- | --- |
| Install like an app, data saver | 3.27, 5.19, 6.15, R18 |
| Notifications by email and phone alert | R9 |
| Messages on ethio.com, every message screened, with a rate limit | 2.23, 6.22, 3.28, R10 |
| ADDED by name - notices before an ad expires and "still available?"; the email announcing changed Terms | 2.14, 2.21, 3.36, 6.25 |
| ADDED - approved ads posted on ethio.com's own Telegram channels by a bot (the Terms already carry the permission). One answer needed then: did you mean our own channels, as I read it? | 2.12, 6.4, 8.27, 12.35, ACT-G2, ACT-007 |

#### Stage 7: account and data

| Item | Ref. |
| --- | --- |
| Your data page: a copy, or deletion | 2.10, 6.3, ACT-005, R13 |
| Devices and sign-in history | R12 |
| ADDED - Settings: edit profile, contact channels and home country outside an ad | 2.18, 5.9, 6.23 |
| ADDED - Telegram sign-in and managing several sign-in methods. The plan leaned on it three times (ticks, bot alerts, devices) and no stage built it | 11.11, DEC-012 |

#### Launch round, after stage 7

| Item | Ref. |
| --- | --- |
| Backups with a restore drill; watchdogs; error monitoring | 3.25 |
| The sign-up security check (CAPTCHA) | 3.2 |
| Speed measured on a 3G phone setting, with a budget per page type; screenshot baselines | 3.22, 3.23, 9.3, C5 |
| Redirects from the old site; the report on a bot filter in front of the site | 3.30, 9.13 |
| Rehearsal of moving Ethiopian data to its own store; the dev-versus-live database story confirmed | 3.5, 3.13 |
| Staff help inside a user's account (full version) - or its sentence leaves the Terms; your call then | 3.9, ACT-U3-1 |
| Checks re-run at launch: two sign-in proofs by hand, the unlink check, the guard proofs | 3.17 |
| Translation-era leftovers handed forward (four small items) | 3.24, ACT-U4-3, ACT-U4-4, ACT-U4-5, ACT-U4-8 |
| The outside security scan of the running site (layer D; paid or open-source - your choice then) | DEC-132 |
| ADDED for your decision then - an approximate price in the buyer's currency: build it, or take the sentence out of the Terms | REQ-018 |

#### Stage 8: the seller page

| Item | Ref. |
| --- | --- |
| The seller page at ethio.com/name; the business badge | 2.23, 5.7, 6.19, R11, R15 |
| ADDED - seller-name leftovers: "This is my organisation, request it"; AI name suggestions; a way to load corrections to the reserved-names list | 5.6 |
| Two answers needed then: real flag pictures on Windows? "ethiopia" allowed inside a seller name? | 8.28 |

### Yours

None of these blocks Lovable today. Two are tied to a stage: the mailboxes and the Amharic reader before stage 1's texts go live, and the email sending domain before stage 6.

#### Your launch checklist

| Item | Ref. |
| --- | --- |
| A sending domain for email - needed earlier than launch: before stage 6 can send anything to anyone but you | 3.1 |
| Google sign-in out of test mode; Supabase addresses switched to ethio.com; leaked-password protection confirmed; Lovable project settings | 3.3, 3.4, 3.6, 3.7 |
| On the Supabase Pro upgrade: session limits on both projects; keep the spend cap on | 3.8, 8.15, ACT-U0-1 |
| The DNS switch of ethio.com to the new site; the two 2020 legal pages come down that day; bot block and rate rule in Cloudflare | 3.12, 3.34, 3.44, 8.18 |
| Rotate the service keys | 3.16 |
| Trademark clearance of the logo | 3.21 |
| The repository goes private (I test my access first); with it, your answer on the cheaper CI set-up | 3.26, 5.8, 2.15, 6.30, 8.29 |
| Register the copyright agent in the US (I guide you step by step) | 3.38, 8.7, 9.14 |
| A legal check of two points: the consent wording under Ethiopia's data law; showing a seller's previous name | 3.32 |

#### Any time

| Item | Ref. |
| --- | --- |
| Create legal@ and privacy@ethio.com (and decide security@) - before stage 1's texts go live | 3.37, 8.6 |
| A native reader for the Amharic legal text; the spelling of "Ethio.com LLC" - before stage 1's texts go live | 3.41, 8.8, 8.9 |
| Native readers for the rest of the Amharic: site copy, the reserved-names list, catalogue labels; a Tigrinya speaker for six catering words | 3.18, 3.33, 8.11, 8.12, 8.13 |
| Esri (maps): confirm business use on the free plan; set a usage alert | 8.16 |
| Small ones: the robots.txt report in Search Console; the old WordPress developer account's password; the hosting ticket for the outage of 27 Sep | 8.10, 8.14, 8.17, 4.42, INC-298 |
| Optional: the Claude GitHub App (lets the weekly security review read the alerts); a "no permission granted" notice file in the repository; the data clean-ups offered in September | 8.21, 8.25 |
| The Project's description still shows the v0.1 text of July, and three old documents are still attached - I give you the replacement in one step | 4.57 |
| The working loop (unchanged): paste, "continue", staging apply with the mark read back | 8.1, 8.2 |
| Questions never answered, each running on its default - say if any default is wrong: a business gives no first and last name; the nine small catalogue checks of September | 8.23, 8.30 |

### The curator's track, and my own duties

#### Curator

| Item | Ref. |
| --- | --- |
| In flight: C33 (Smartwatches question order, from your reset rule) and the plan for country-neutral wording | 5.12 |
| Next engine rows: rent and hire periods on 17 or 18 categories, short-term rentals, minimum term, advance and deposit | 5.11, 7.3, 12.26, ACT-008 |
| Waiting on the form: 12 yes/no locks (need W4b); several sizes; rent per m² | 7.4 |
| Standing rules in every curator message, including the limit of 150 and the new order rule | 7.2, 12.29 |
| Side products: the alcohol word list goes to screening (stage 2); Tigrinya words wait for a speaker | 7.6 |
| Backlog, none scheduled: research rows (block machines, gravel, sizes…), small catalogue items, the icon list for the curator, the unused battery key | 7.9, 7.10, 9.6 |
| The standing iPhone 13 check after every cycle (in my audit script) | 9.7 |
| The curator's approval prompts on jiji.com.et - no report since 2 Oct; closed unless it comes back | 4.49, 7.11 |

#### Mine

| Item | Ref. |
| --- | --- |
| Specs, each discussed with you before its stage; and the original requirement list, mapped one by one in the last table of this tab | 5.30 |
| Rulebooks: Lovable's Knowledge v3.11 and my instructions v1.14, delivered whole with the bundle-6 records | 4.56, 6.32 |
| Dated duties: 9 Oct push protection; 12 Oct first weekly security review; 12 Oct the server-error gate date; UK children's assessment after the UK opens; UAE law re-check before Jan 2027 | 3.39, 3.40, 9.15, 9.16, 10.17 |
| Watches: nightly runs, staging health and mail, side branches, GitHub traffic while public, package updates, the flake ledger | 4.43, 4.45, 4.48, 8.19, 9.12, 10.5, 10.8, 10.10, 10.14, 10.15, 10.19, INC-439 |
| Standing practices I bound myself to (brief saved in the repository, CI read first, Amharic by script…) | 9.21 |
| Walk cautions for your own account (the 30-day home-country clock; your eight drafts) | 1.6, 10.12 |

### Later, and recorded with no action

Each of these waits for the trigger named in the plan's "Not now" table or in the list of 5 October. None is forgotten; none is scheduled.

| Item | Ref. |
| --- | --- |
| Jobs and Tenders (your ruling of 19 Jul: version 2) | 11.1 |
| Per-country presets and units; Ethiopia-only fields; the catalogue in two country layers - wait for a second country | 2.22, 7.8, 11.2, 11.5, 6.28, DEC-089 |
| "Everywhere" coverage as a paid option; a map radius for service areas; map hosting of our own | 11.3, 11.4, 11.6 |
| App-store versions (after the installable site) | 11.7 |
| Posting to a seller's own Facebook or Instagram; forwarding a Telegram post to make a draft; forwarding phone numbers | 11.8 |
| Points for the lawyer at the Ethiopia-entity milestone, incl. the EU marketplace question and Ethiopian registration | 11.9, 11.15, 3.15, 3.20 |
| Scale items: a database extension moved; edge caching; ten CI shards | 11.10, 4.5, 9.5 |
| Translation of names by machine and faster language loading (deferred by design); translating users' ads and messages; a bookings era | 3.10, ACT-U4-1, ACT-U4-2 |
| Catalogue scope closed by your rulings (Pets, Kirkland, alcohol and others kept out) | 11.12 |
| Ethiopian-calendar date entry | 5.24, 11.13 |
| Growth ideas recorded as candidates: price pages, bulk upload, QR codes, invite emails to old users | 11.14 |
| Paid promotion as its own record (the payments era); star ratings (your decision 16: none at launch) | research note 5, C2 |

#### Recorded, no action needed

| Item | Ref. |
| --- | --- |
| Recorded facts that need no action: how migrations are applied; material nobody could read; counts that differed between reports; date conventions | 4.16, 4.47, 4.59, 12.27, 12.28, 12.30, 12.34, 12.36, 12.39, 12.42, 2.25 |

### Done since the list of 5 October

| Item | Ref. |
| --- | --- |
| Bundle 4 closed on a green run; every record of 28 Sep – 5 Oct imported; handover written | 1.1, 1.4, 1.5, 2.1, 2.2, 2.3, 2.7, 4.50, 4.58, 4.61, 4.62, 6.8, 9.1, 10.1, 10.16, 12.1 to 12.19, 12.32, 12.33 |
| Cooked Food redesign (C30) imported and walked; the new category's second parent is in place | 1.3, 2.4, 2.6, 5.31, 7.1, 7.13, 8.3, 9.22, 10.11, 12.40 |
| The out-of-order migration mark is healed (bundle 5) | 1.2, 4.60, 10.7, 12.41, INC-433 |
| Importer fixes: a new category keeps its second parent; undo restores its questions; the preview refuses a card clash (bundle 5) | 4.20, 4.21, 4.22, INC-314, INC-307, INC-327, INC-438 |
| Amharic unit words («ኪ.ግ», «ሰው»…) - built in bundle 5, words imported with C32 and walked | 6.7 |
| Curator told the new engine features are live; first engine batch (C31) imported and walked, with the Net Weight / Volume hides | 2.5, 7.5, 7.12 |
| Amharic map-pin words; seller-name table refreshed by imports; the "And when" label | 4.7, 4.8, 4.9, INC-431, INC-432 |
| Migration proofs that borrowed a real account - now refused by a CI check (bundle 6) | 4.6, INC-445 |
| Lovable's rulebook line on where to read CI | 4.46, 12.31 |
| Stale tracker lines closed; undefined numbers and double labels recorded as such | 4.52, 4.53, 4.55, 10.20, 12.23, 12.24 |
| Supervisor instructions v1.13 installed; the repository copies of both rulebooks are level | 6.31, 8.22, 9.19, 12.37, 12.38 |
| Red-before-fix runs for five bundle-1 tests - were delivered | 4.36 |
| The red nightly of 4 Oct - explained (staging was one migration behind for that hour) | 4.64, 10.2 |
| Launch-list lines already met: photo location data stripped; contact-permission defect fixed; seller-name rules tightened | 3.19, 3.29, 3.31, INC-389 |
| Second Search Console export - not owed (your correction of 5 Oct: optional) | 8.4, 9.8, 10.9 |
| No Publish or walk was owed after bundle 4's last turn | 8.5 |
| Security review of 5 Oct: all seven findings fixed (bundle 5 and bundle 6) | INC-442 to INC-448 |
| Bundle 6 so far: runner pinned; a limit on how often an ad is revised; scanners in our own CI; every CI job now gates promotion; batched service reads; workflow file linted; Next judged at its own step; first identity answer keeps the details; keyed paging; scratch clean-up on staging; fuller failure reports | DEC-133 to DEC-143, INC-450, INC-453 to INC-458, INC-460 to INC-462 |
| Two small follow-ups: the PW-26 test title; the import-bucket prune (bundle 6) | 4.23 in part |

### Newer items, and the original requirements

#### Recorded since 5 October

| Group | Where each sits |
| --- | --- |
| 26 defects, INC-438 to INC-463 | 18 fixed. INC-451 and INC-459: posting-form round. INC-463: turn 7, then the posting-form round. INC-452: one more green run. INC-440, INC-441, INC-449: tidy-up round (flaky tests). INC-439: nightly watch |
| 14 decisions, DEC-132 to DEC-145 | DEC-133 to DEC-143 built. DEC-132, the security programme: three layers running, the fourth at the launch round. DEC-144: posting-form round. DEC-145: stage 2 |
| 19 research recommendations, R1 to R19 | R14: stage 1. R1, R5, R6, R17, R19: stage 2. R3, R4, R15 first step: stage 3. R2, R16: stage 4. R7, R8: stage 5. R9, R10, R18: stage 6. R12, R13: stage 7. R11, R15 second step: stage 8 |
| 6 research wording changes, C1 to C6 | C1: stage 1. C2: no star ratings (your decision 16). C3: stage 3, your decision 3 still open. C4: stage 3. C5: launch round. C6: nothing to build |
| 12 research code notes | 1: answered by this order. 2, 3: stage 4. 4: bundle-6 records. 5: later, with payments. 6: stages 3, 5 and 6. 7: stage 6. 8: launch round. 10: stage 7. 12: stage 2. 9, 11: no change needed |
| Your 16 answers of 6 October | Each is in the plan's "Your decisions" table with its stage. Decision 3 is open, for stage 3 |
| Curator deliveries | C32 imported and walked. C33 and the country-wording plan are in flight |

#### The original requirements not yet built, one by one

| Requirement | Where it sits |
| --- | --- |
| Screening, penalties and appeals (REQ-021, 009, 010, 011) | Stage 2 |
| Duplicate detection (REQ-024) | Stage 2. Paid promotion records: later |
| An identity check before posting for some business categories (Q-007) | A question for stage 2 |
| Messaging, block and report (REQ-026) | Report in stage 3; the rest in stage 6 |
| How a seller is shown; store states (REQ-027) | Stages 3 and 8 |
| The life of an ad: My ads and the clean-up job (REQ-022) | Stage 4 |
| Home ranking; widening by place (REQ-023, REQ-005) | Stage 5 |
| Search across languages, tolerant of typos (REQ-025) | Stage 5 |
| Notifications (REQ-031) | Stage 6 |
| The installable site (REQ-039) | Stage 6 |
| Data rights: copy and deletion (REQ-012.4) | Stage 7 |
| Telegram sign-in, devices list, several sign-in methods (DEC-012) | Stage 7 |
| Store pages (REQ-008) | Stage 8 |
| Legal pages (REQ-034) | Stage 1. The Ethiopia compliance table (REQ-035): later, with the Ethiopia entity |
| Backups, restore drill, watchdogs (REQ-032); error monitoring (REQ-040) | Launch round |
| Rehearsal of the Ethiopia data split (REQ-033) | Launch round |
| The sign-up security check (REQ-037) | Launch round |
| Staff help inside an account, full version (DEC-021); the full two-step check for staff (REQ-016) | Launch round |
| Converted prices (REQ-018) | Your decision at the launch round |
| Translation of users' ads and messages (REQ-004) | Later |

### How this stays true

From now on I run this cross-check again whenever the order changes or a stage is planned, and I update this tab. A line with no place stops the plan until it has one.

## PART 3 — Added since the two tabs were written (2026-10-06, after 10:40Z)

| Item | Where it sits | Ref. |
| --- | --- | --- |
| A queued save is never sent below step 1 | DONE — bundle 6 turn 9 | INC-465 |
| The workflow-lint download retries | DONE — bundle 6 turn 10 | INC-468, DEC-147 |
| The phone question "IMEI Registered (Works on Ethiopian Networks)" becomes "Unlocked (works with any SIM card)" — a new question, not a relabel | The curator proposes the wording with the C34 result; the rows after INC-467's fix in bundle 7 (one production draft holds the old answer) | D76, INC-467 |
| The unlink of a question whose answers ads may hold: the door refuses an answer under an unlinked key | Bundle 7, with the Merge and delete doors | INC-467 |
| An autosave refused by the door is not dropped without a word | Bundle 7 | seen at INC-465 |
| A real "paused" state; every state has its label | Stage 4 | INC-469 |
| The expiry sweep goes through the state machine and writes its revision row; whether a reduced ad expires | Stage 4 | INC-470 |
| `docs/features/listings.md` rewritten from the migrations | The tidy-up round | INC-471 |
| `listings.tier` reconciled with REQ-024 before any paid tier | Later — the payments era | INC-472 |
| The lines owed in `docs/spec/tos-privacy-source.md` (A13, A15, A16, B9, B13, the B2 correction) | Stage 1 | open-items 6.33 |
| Category pages as search landing pages | Stage 5, with the search-engine rules R5–R8 | Q-020 |

The three requirement amendments the cross-check listed for the bundle 6 records turn (the store address without "@", gambling on the banned list, the search-landing-page question) are in spec-ledger block S55. The research report's twelve code notes are placed there one by one.
