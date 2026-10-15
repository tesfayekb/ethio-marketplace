# Ahead of Jiji — the user-feature plan

Supervisor plan · 2026-10-14 (America/New_York) · D179 — the operator's directive of 2026-10-14, 21:27 local: "Please add those features in the plan with details so we can tackle it in future. We need to make sure we are ahead in all aspects that users will find very useful."

- **Base:** dev `86c2d6e8` (bundle 16 turn 3b landed).
- **What this is:** a plan, not a spec. Every item gets its spec, a peer study and the operator's questions before it is built (G49). Nothing here re-decides a DEC (G6); where an item is already decided, the decision is named.
- **Status (the operator, 2026-10-14 21:42 local):** kept as the plan; to be re-discussed after the staged implementations are complete. The supervisor reminds him then. The reminder is recorded in the roadmap's last staged line and in the project memory.
- **Where it comes from:** the comparison of Jiji's posting and listing flow with ours (this thread, 2026-10-14); the marketplace feature review of 2026-10-06 (`claude/marketplace-feature-review-2026-10.md` — its R-, L-, C- and Q-numbers are used below); the roadmap's staged order (`roadmap.md`, "After bundle 7, in this order", stages 1–8).
- **Numbers:** every turn count is an ESTIMATE with its band. Item labels are AH-nn (gaps and parity) and LF-nn (leapfrog). They are plan labels, not ledger numbers.
- **How it reaches the repository:** with the turn-3c brief, as `docs/governance/plans/ahead-of-jiji.md` plus one roadmap line per item under its stage (G41).

## 0 · The short version

- **How Jiji posts.** A free form; every ad and every edit is reviewed by automatic checks and people, "within a few hours"; a refused ad gets one of 23 reasons, each a help page; duplicates and reused photos are caught; free posting is limited per category, and an ad over the limit waits as a draft until the seller buys a package.
- **Where we already lead.** Section 1, twelve items:
  - a photo check in seconds at upload, with its reason;
  - the AI writing assistant;
  - background removal and the photo tools;
  - structured specifications;
  - contact details shown only to signed-in buyers, with every reveal logged;
  - Amharic throughout;
  - a seller history on My listings.
- **What we lack today.** Five things:
  - the AI review of the whole ad (stage 2);
  - the public ad page (stage 3);
  - search and favourites (stage 5);
  - notifications and messages (stage 6);
  - the seller page and ratings (stage 8).
- **How we pass Jiji rather than match it.** Section 3: nine leapfrog items. The theme is giving free what Jiji sells — reach aside. Jiji charges for trust signals (a profile link, the WhatsApp button, the insights report); we give them free.
- **Size.** Total ESTIMATE 90–140 executor turns across stages 1–8 (band wide). Bundle 13 alone took sixteen turns.

## 1 · Where ethio.com already leads (built — the file that proves it)

| # | ethio.com today | Evidence on dev `86c2d6e8` | Jiji |
|---|---|---|---|
| 1 | Photos screened at upload, in seconds, with the reason named (nine refusal codes; warnings such as "not relevant" that never refuse) | `src/server/media/policy.ts` (D154, D165) | the ad is reviewed after posting, "within a few hours" ([moderation](https://jiji.ng/faq/moderation-duration)) |
| 2 | AI writing assistant: title and description from the seller's own facts and photos, never inventing; each retry a new angle | `src/routes/api/listings/assist.ts` (DEC-072) | not found in Jiji's help pages (research of 2026-10-06) |
| 3 | Photo tools: background removal, order and edit tools, lighter photos made automatically, a middle size for the gallery | `src/server/media/background.ts`; D155, D162, D168 | photo requirements only ([image rules](https://jiji.ng/faq/image-requirements)) |
| 4 | Photo privacy: location and camera data stripped | `src/server/media/strip.ts` (DEC-069) | not documented |
| 5 | Contact details only for signed-in buyers, after a tap, 30 a day, every reveal logged | door `reveal_listing_contact` | "Show contact" tap; sign-in not documented ([chat vs call](https://jiji.ng/faq/chat-vs-call)) |
| 6 | Phone numbers, e-mail addresses and Telegram/WhatsApp links in ad text refused at the field, before posting | `src/features/posting/contact-like.ts`; door `attr_contact_like` | rule enforced at review ([posting rules](https://jiji.ng/faq/posting-rules)) |
| 7 | Structured catalogue: specifications per category, brands → series → models, the category finder, curated in EN and AM | `src/routes/api/catalog.find.ts`; the curator's batches | facets on some categories ([Jiji ET phones](https://jiji.com.et/bole/mobile-phones)) |
| 8 | English and Amharic everywhere; help and legal pages planned in both (stage 1) | `src/i18n/locales/am.ts`; the i18n coverage guard | Jiji ET's help, terms and privacy pages are English only (review, appendix A) |
| 9 | Drafts saved as you type and resumed at `/post/<id>` | `src/features/posting/use-draft.ts` | Drafts tab — parity |
| 10 | My listings: every state and every admin change in the ad's history; close and reopen keeping the days left; Reserved; Rented and Filled words; an honest "Price reduced" (only when the old price stood ≥ 7 days and the drop is ≥ 5 %, shown 14 days — lands in turn 3c) | `src/features/my-listings/*` (D138, D172–D175) | Close with a survey; no history; no honesty rule published |
| 11 | Seller names protected: reserved names and an imitation check | protected-names tables; `src/routes/api/listings/identity.ts` | not documented |
| 12 | Admin AI switches and monthly budgets per feature, so the free site stays affordable | Admin › Services › AI (D158) | internal; not comparable |

## 2 · Gaps and parity items, by user journey

Each item states:

- what Jiji does, and what we have today;
- the plan — a design summary, finalised at the stage's spec;
- the stage, the references and the ESTIMATE.

Tier A items (screening, contact, reports, limits, messages, ratings, verification) follow the instructions' §5 elevation list.

### 2.1 Posting and review — stage 2, "automatic screening from the first ad" (DEC-145)

**AH-01 · AI review of the whole ad, live in seconds**

- **Jiji:** every ad and every edit reviewed, by automatic checks plus "Support Managers", "within a few hours".
- **Today:**
  - every published ad waits In review until staff approve it in Admin › Screening (approve, reject, bulk approve);
  - only the photos are AI-checked.
- **Plan — DEC-145's two layers:**
  - Layer 1 is a fast model that reads text, photos, specifications and price on every publish and every edit.
  - A confident pass goes live at once. A confident refusal goes to "Needs edits" with its reasons (AH-02).
  - When layer 1 is unsure, a stronger model (layer 2) decides. Only layer 2's unsure cases reach a person; Admin › Screening becomes the exceptions page.
  - DEC-149: the ad's free text is translated into every site language at posting and screened in every language; screening never switches off.
  - The trust tiers and the strike ladder follow `docs/governance/moderation-design.md`. The D158 meter counts the spend.
- **Ahead because:**
  - seconds, not hours;
  - reasons inline;
  - any language screened, not just EN/AM.
- **Refs:** R1, R6, C1; DEC-070, DEC-074, DEC-145, DEC-149.
- **ESTIMATE:** 8–12 turns, 2–3 migrations (band 6–14).

**AH-02 · Refusal reasons with "how to fix it" and a Fix button**

- **Jiji:** 23 decline reasons, each a help page; the seller edits and resubmits ([reasons](https://jiji.ng/faq)).
- **Plan:**
  - A fixed reason list, EN/AM, each reason with a one-line fix text.
  - Shown on the ad's page in My listings, with a **Fix it** button that opens the edit form at the exact box (title, a specification, a photo).
  - Two outcomes:
    - **Needs edits** — the seller fixes it and it comes back; no appeal needed.
    - **Removed** — carries the decision notice (reason, rule, automated or human, how to appeal) and one appeal, as the review's R1(5) and DSA Art. 17/20.
  - A public page, **"Why an ad is refused"**, lists every reason, photo codes included.
- **Ahead because:** Jiji sends the seller to a help page; we take him to the box.
- **Stage:** 2 (the page with stage 1's pages if it is ready first).
- **Refs:** R1, R14, L11, T13.
- **ESTIMATE:** inside AH-01, plus 1 turn for the page.

**AH-03 · Published photo rules**

- **Jiji:** an image-requirements page: up to 20 photos, at least 480 px, up to 25 MB, JPG/PNG/HEIC.
- **Today:** our rules are enforced but not published: 10 photos per ad, formats by magic bytes, the nine codes.
- **Plan:**
  - A **Photo rules** page, EN/AM, generated from the same constants and codes the upload uses; a unit test compares them, so the page cannot drift.
  - Linked from the photo step and from every photo refusal.
- **Stage:** 1, with the banned-items and safety pages.
- **Refs:** R14.
- **ESTIMATE:** 1 turn.

**AH-04 · Duplicate and reused-photo detection**

- **Jiji:** automatic; "1 product = 1 ad"; photos used in earlier ads are caught ([duplicates](https://jiji.ng/faq/duplicate-already-exists)).
- **Plan (R5, D10, D15):**
  - **Fingerprints:** a perceptual fingerprint of every stored photo.
  - **Same seller:** the same title and category within 24 h gives a warning at posting.
  - **Another seller's photo:** shown to the AI judge as context, never an automatic refusal. Jiji's checker draws false-positive complaints from honest sellers.
  - **A photo from an ad we removed:** refused.
  - **Staff:** see "similar ads" on the screening page.
- **Stage:** 2.
- **ESTIMATE:** 2–3 turns, 1 migration.

**AH-05 · Free posting limits that park the ad as a draft**

- **Jiji:** free slots per category; over the limit the ad waits as a draft — "Category limit reached" ([limit](https://jiji.ng/faq/category-limit-reached)) — until the seller buys a package. OLX does the same per 30/60 days.
- **Today:** one rate dial, 10 ads a day.
- **Plan (R17):**
  - Limits the admin sets: live ads per category and per account, photos per ad, lifetime days — by trust tier.
  - Over a limit, the ad stays a draft with the reason and the date a slot frees. It is never refused.
  - In the payments era a plan can raise the limits.
- **Note:** the operator's priority is many products posted (DEC-117's rationale), so the free limits must be generous.
- **Stage:** 2 ("posting limits and AI switches").
- **Refs:** R17, Q7, DEC-117.
- **ESTIMATE:** 3–4 turns, 1 migration.

### 2.2 After posting — My listings (stage 4; bundle 16)

Built in bundle 16, turns 1–3b:

- the list page with its groups, and one ad's page with its history;
- close and reopen; Sold, Reserved, Rented and Filled;
- renew under the admin's setting; Delete.

Still in bundle 16:

- turn 3c — sold ads 30 days in the feed with ribbons, Reserved and "Price reduced" on the card;
- turn 4 — the photo review on edit (D178);
- turn 5 — edit in boxes, and the renew Settings box.

**AH-06 · Views and contacts per ad**

- **Jiji:** "Views · Contact views" per ad. Leboncoin shows four counters.
- **Today:** the card prints 0; `contact_reveals` rows exist and nothing adds them up.
- **Plan (R16):**
  - Daily counts per ad: views, contact reveals, and later messages and favourites.
  - Shown on each ad in My listings and on the seller page.
  - A light write path; no per-viewer rows beyond the existing reveal log.
- **Stage:** 3 (the ad page creates views) with its display in stage 4.
- **ESTIMATE:** 2–3 turns, 1 migration.

**AH-07 · "Still available?" check-ins and expiry reminders**

- **Jiji:** ads deactivate 1–3 months after the last renewal, with no reminder.
- **Today:** DEC-117 gives no end date by default and names this reminder as the cover for stale ads.
- **Plan:**
  - After N days live (ESTIMATE 30), ask the seller "Still available?" — a notification plus a banner in My listings.
  - **Yes** keeps the ad. **Sold** closes it. No answer in M days lowers its reach; it is not removed.
  - Notices before a dated ad expires.
- **Stage:** 6, after notifications (AH-22).
- **Refs:** DEC-117, Q1.
- **ESTIMATE:** 1–2 turns.

**AH-08 · The mark-sold question**

- **Jiji:** asks at Close: "Sold on Jiji / sold elsewhere / not selling / other".
- **Plan:** one optional question when the seller marks an ad Sold. It is the cheapest honest measure of whether ethio.com works for sellers.
- **Stage:** 4.
- **Refs:** Q9 (open).
- **ESTIMATE:** under 1 turn.

### 2.3 The ad page and contact — stage 3

The stage's own order: researched with peers and agreed with the operator before it is built (his review of 2026-10-09). Paging and photos on cards are already built.

**AH-09 · The public ad page**

- **Jiji:** every ad has a page with photos, details, the seller and similar ads.
- **Today:** no route shows an ad to a buyer.
- **Plan (R3, D130):**
  - Server-rendered and light on 3G, with a stable address.
  - A share image: photo, price and title.
  - Structured data for search engines.
  - Similar ads, by category and place.
  - The detail and list layouts redesigned, with the previews that share their components.
- **ESTIMATE:** 5–8 turns, 1–2 migrations.

**AH-10 · Show contact, call, and WhatsApp / Telegram links — free for every seller**

- **Jiji:** "Show contact", then call. The WhatsApp button is a paid perk, with a pre-filled message naming the ad ([WhatsApp](https://jiji.ng/faq/whatsapp-contact)). No Telegram.
- **Plan (C4):**
  - The existing reveal door; a call button.
  - A WhatsApp link pre-filled "I'm interested in your ethio.com ad: <link>".
  - A Telegram link to the seller's username, never `t.me/+phone`.
  - All shown only after the reveal tap, all counted.
  - D131: staff see who viewed a contact.
- **ESTIMATE:** 1–2 turns.

**AH-11 · The safety box**

- **Jiji ET:** four lines on every ad. Engocha: eight.
- **Plan (C3, Q8):** four lines, EN/AM, under DEC-129's header: "meet, inspect, then pay — no deposit, no payment link, no code".
- **ESTIMATE:** under 1 turn.

**AH-12 · Report an ad, with reasons**

- **Jiji:** "Report abuse", then a reason, then a comment.
- **Plan (Q10):**
  - Reasons: spam, scam, prohibited item, wrong category, duplicate, already sold, appears under 18, copyright, other.
  - The reporter is anonymous to the seller and told the outcome (Vinted).
  - A `report` rate dial (DEC-071).
  - Reports feed the AI judge and the exceptions page.
- **Note:** a launch-gate item.
- **ESTIMATE:** 2 turns, 1 migration.

**AH-13 · Share — Telegram first**

- **Jiji:** Facebook, Twitter, WhatsApp, e-mail; no Telegram ([share](https://jiji.ng/faq/share-ads-social)).
- **Plan:** Telegram, WhatsApp, Facebook, copy link — each with the share image.
- **The operator (his walk of bundle 16, 2026-10-14):** the seller shares his ad to his OWN Instagram, Facebook and other accounts from inside the site — a feature of its own, developed with the ad page after the peer study.
- **ESTIMATE:** 1 turn.

**AH-14 · Seller card with free trust ticks**

- **Plan (R15, rung 1):**
  - The seller's name and "Member since".
  - "Email ✓ · Google ✓ · Telegram ✓", read from the account — a Telegram account is phone-anchored.
  - Never the words "verified seller" alone.
  - The seller's saved shop or office on a map.
- **Later:** a response-time line (LF-07).
- **ESTIMATE:** 1 turn.

### 2.4 Finding things — stage 5

**AH-15 · Search in English and Amharic**

- **Today:** `listings.search_tsv` and `pg_trgm` exist; the header's search box submits nowhere.
- **Plan:**
  - Typo tolerance and suggestions.
  - Results from the buyer's city first, then wider (DEC-065, the REQ-005 ladder).
  - Search words logged in aggregate, so the curator learns what buyers type.
- **ESTIMATE:** 3–5 turns.

**AH-16 · Filters from the catalogue, and sort**

- **Jiji ET:** facets with counts on some categories.
- **Today:** `is_filterable` is set per attribute.
- **Plan:**
  - Filters with counts drawn from our specifications. The catalogue's depth makes this a lead.
  - Sort: newest, price low to high and high to low, nearest.
- **ESTIMATE:** 2–4 turns.

**AH-17 · Favourites**

- **Jiji:** up to 500, with a "price changed" mark.
- **Plan (R7):**
  - A heart on the card; the Saved page.
  - Sold and closed ads marked; a passive "price changed" mark.
- **ESTIMATE:** 1–2 turns, 1 migration.

**AH-18 · Saved searches with alerts**

- **Jiji:** push and in-app.
- **Plan (R8):** save the search and its area under a name; alerts arrive with stage 6 (AH-22, LF-08).
- **ESTIMATE:** 1–2 turns, plus 1 for alerts.

**AH-19 · Recently viewed**

- **Jiji:** none found.
- **Plan:** kept on the device only, so there is no server row and no privacy cost.
- **ESTIMATE:** under 1 turn.

**AH-20 · Price-drop alerts on favourites**

- **Jiji:** passive mark only. Vinted and Mercari alert.
- **Plan:** rides D68 (open — a proposal, spec not written) and the honest "Price reduced" rule of D173.
- **ESTIMATE:** 1 turn after AH-17 and AH-22.

**AH-21 · Prices for the diaspora: "≈ in your currency"**

- **Jiji:** ETB only.
- **Plan:** DEC-056, display only — the original price first, with a dated rate. The rate source is the operator's choice, still open.
- **ESTIMATE:** 2 turns, 1 migration.

### 2.5 Staying in touch — stage 6

**AH-22 · Notifications**

- **Jiji:** push, e-mail, and SMS "sparingly".
- **Plan (R9, REQ-031):**
  - Channels: a bell in the app, e-mail and web push.
  - Settings per type × channel — new message, ad approved / needs edits / expiring, saved-search match, followed seller; security always on.
  - Digests instead of floods.
  - The contact step's promise "We email you when a message arrives" becomes true.
- **ESTIMATE:** 5–8 turns, 2 migrations.

**AH-23 · Telegram bot notifications**

- **Jiji:** none.
- **Plan:**
  - Free to send, and the best local fit.
  - The Telegram sign-in door gives the bot the right to message the user from the first sign-in.
  - Until that door exists, the user starts the bot himself.
- **Refs:** L-2, Q4 (open: before or with the Telegram door).
- **ESTIMATE:** 2 turns.

**AH-24 · Messages**

- **Plan — REQ-026, plus DEC-145 (every message screened):**
  - A one-tap "Is this still available?" for buyers.
  - Quick replies for sellers.
  - A standing safety line in each new conversation.
  - A spam folder kept apart from Report.
  - Photos; blocking.
  - Links and phone numbers held back for new accounts.
  - Translation on a tap.
- **ESTIMATE:** 8–12 turns, 2–3 migrations.

**AH-25 · Install as an app, and low data**

- **Jiji:** a native Android app, 1M+ installs in Ethiopia.
- **Plan (R18, REQ-039):**
  - An installable web app with an offline shell.
  - A low-data mode: honour the browser's Save-Data signal and a toggle; tap to load large photos.
  - An "Open in Chrome" nudge from the Telegram and Facebook in-app browsers.
- **ESTIMATE:** 2–4 turns.

**AH-26 · The site's own Telegram channels**

- **Jiji:** auto-share to Facebook.
- **Plan (ACT-007):** approved ads posted automatically to category channels. This meets the Telegram-channel shopping habit where it already lives.
- **ESTIMATE:** 2 turns.

### 2.6 Seller page and trust — stages 7–8

**AH-27 · Seller page at ethio.com/name, with Follow**

- **Jiji:** a shop page for any seller. Its trust signals are paid perks: the website link on the profile from VIP Gold up ([packages](https://jiji.ng/faq/22)).
- **Plan (R11, DEC-108):**
  - Free and optional for every seller: name, logo, description, links, the map, and the ad grid.
  - Follow a seller to hear of new ads, once AH-22 exists.
- **ESTIMATE:** 5–8 turns, 2 migrations.

**AH-28 · Verification ladder**

- **Jiji:** paid ID check and a store visit for paid sellers.
- **Plan (R15):**
  - Rung 1: the ticks of AH-14.
  - Rung 2: a business badge from documents reviewed by staff — free.
  - Rung 3: ID with a selfie, later (L-9).
- **ESTIMATE:** rung 2 3–4 turns, 1 migration.

**AH-29 · Reviews and ratings**

- **Decided:** DEC-150, after opening — signed-in users review and rate sellers; sellers reply; patterns of bad-faith reviewers are flagged.
- **Jiji:** anyone who interacted may rate, moderated.
- **Plan:** worked out at the stage 8 spec against earlier decisions.
- **ESTIMATE:** 5–8 turns.

**AH-30 · Seller insights**

- **Jiji:** the "Jiji Insights Report" and a feedback tool are sold in its Diamond tiers.
- **Plan:** the basics free — views and contacts over time (AH-06) and the ads that do best.
- **ESTIMATE:** 2 turns.

**AH-31 · Devices list and "Your data"**

- **Plan (R12, R13):** stage 7 as planned — the devices list with sign-out per device; data copy and deletion with the DEC-130 periods.
- **ESTIMATE:** 5–8 turns.

## 3 · Leapfrog — what Jiji does not offer

Each is new to the record. Each goes to a peer study and the operator's questions at its stage (G49), and its AI cost sits under its own D158 switch.

| # | Item | What the user gets | Stage | ESTIMATE |
|---|---|---|---|---|
| LF-01 | **Photo-first posting** — the AI proposes the category, title and specifications from the first photo; the seller confirms | posting in under a minute. Facebook Marketplace added AI drafting in 2026 ([Meta](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)); Jiji has none found. Reuses the assistant and the finder | posting-form extras (after stage 2) | 2–3 turns |
| LF-02 | **Ad quality meter** while posting — a short checklist: "add 3 more photos", "add the model", "add a price" | better ads, more contacts. Later backed by our own numbers (contacts by photo count, AH-06) | posting-form extras | 1–2 turns |
| LF-03 | **Price guidance from similar ads** — "Similar ads in Addis Ababa: 18,000–24,000 birr", shown only when there are enough comparable live ads (threshold set at spec) | sellers price right; buyers trust prices. The same numbers give the AI judge its "too good to be true" signal (R1(3)) | stage 2 (judge signal), then posting | 2–3 turns, 1 migration |
| LF-04 | **Buyer "Report as sold"** — a buyer who called and found it gone taps it; it counts toward the seller's "Still available?" check (AH-07) | fewer dead ads — the trust-killer REQ-022 names | stage 3 | under 1 turn |
| LF-05 | **Speak the description** — Amharic and English speech-to-text on the description box | helps sellers who type slowly on a phone. **Research first:** Amharic recognition quality and cost | research, then posting extras | research 1 turn; build 2 turns (ESTIMATE) |
| LF-06 | **Scam warnings inside messages** — the message screen (DEC-145) spots "send a deposit", payment links and code requests, and shows the buyer a warning | stops the deposit-then-vanish fraud documented in Ethiopia; no studied peer fully does it (review T11) | stage 6 | inside AH-24, +1 turn |
| LF-07 | **Response-time badge** from message data ("Usually replies within an hour") | an honest, free trust signal instead of a paid "top seller" (R10(5)) | stage 6 | 1 turn |
| LF-08 | **Saved-search alerts by Telegram** | free, instant, where Ethiopians already are | stage 6 | 1 turn after AH-18 and AH-23 |
| LF-09 | **Ethiopian calendar beside Gregorian dates** under Amharic ("posted", "ends") | dates read the way people count them | stage 5 or 6 | under 1 turn |

## 4 · How Jiji makes money — and what it means for us

### Jiji's revenue streams

| Stream | What it is | Source |
|---|---|---|
| Premium / Boost packages (the main one) | Seller subscriptions for 1, 3, 6 or 12 months. The tiers run Basic → Premium → VIP → VIP Gold → Diamond → Enterprise. Each gives more "TOP" placements and auto-renews ads to the top more often — from every 48 h down to every 2 h. Higher tiers add a profile website link, e-mail and social promotion, a personal manager, an insights report, a feedback tool, the WhatsApp button, SMS alerts and an extra phone number. Claims run "up to 2×" to "up to 500× more clients" | [jiji.ng/faq/22](https://jiji.ng/faq/22) |
| TOP ads | Pay per ad to sit at the top of its category for 7 or 30 days | [productmint](https://productmint.com/how-does-jiji-make-money/) |
| Pro Sales (pay per click) | Businesses bid per click with a daily budget. Launched in Ethiopia with the Boost packages in June 2024 | [africa.com](https://africa.com/headlines/jiji-launches-premium-services-in-ethiopia-pledges-to-boost-sme-growth), [Capital Ethiopia](https://www.capitalethiopia.com/2024/06/17/jiji-expands-premium-services-to-ethiopia-2/), [Wikipedia](https://en.wikipedia.org/wiki/Jiji_Africa) |
| Free-posting limits | Per-category free slots; extra ads wait as drafts, which pushes regular sellers into packages | [jiji.ng](https://jiji.ng/faq/category-limit-reached) |
| Paid trust | The ID-verified badge and store visits for paid sellers | [ID badge](https://jiji.ng/faq/verified-id-badge), [store visit](https://jiji.ng/faq/offline-store-verification) |
| Banner advertising | Ad slots on its pages | [TechCabal](https://techcabal.com/?p=147531) |
| Cars45 | A verified car buy-and-sell and inspection business (Nigeria) | [TechCabal](https://techcabal.com/?p=147531), [productmint](https://productmint.com/how-does-jiji-make-money/) |

Background:

- Posting is free and there is no listing fee.
- Revenue is not disclosed. About US$50 million was raised by 2019, including a US$21M Series C ([Wikipedia](https://en.wikipedia.org/wiki/Jiji_Africa)).
- The company reports about US$70 billion in annual listing value and 90 million or more annual users (2026, company-reported).
- Ethiopian prices are not published: the premium pages answer 403 to our reader.

### What it means for us

Payments are out of v1 (DEC-001). This section decides nothing.

- **The shape of Jiji's model:** it sells two things — **reach** (TOP, Boost, auto-renew, pay per click) and **trust signals** (badges, the profile link, the WhatsApp button, insights).
- **Our position:** we give trust away free (AH-10, AH-14, AH-27, AH-28, AH-30). That is how we win sellers. Reach is what we could sell later, without making the free site worse.
- **The seams we keep now so the paid era needs no rebuild:**
  - promotion as separate records, never a flag (REQ-024; review observation 5 — `listings.tier` is a flag today);
  - limits with a shape a plan can raise (AH-05);
  - honest view and contact counts (AH-06), the numbers any paid product must show.
- **Not advised:** banner advertising. It costs page weight on 3G (REQ-029) and the trust we sell on. House promotion of our own features is the alternative.
- **Options for the paid era.** Each needs its own spec, a pre-committed judge, and the archived v0.1 payment governance restored:
  1. a per-ad "Top of category" placement;
  2. seller plans — more live ads, automatic renewal, shop branding;
  3. pay-per-click promotion for businesses;
  4. featured shops;
  5. inspection and verification for cars and property through partners.
- **The Ethiopian payment provider:** researched at that time; not named here.

## 5 · Where each item lands — the order of work

This plan does not reorder the roadmap. Each item becomes one roadmap line under its stage when the turn-3c brief lands.

| Roadmap position | Items from this plan |
|---|---|
| Bundle 16 (now) | turns 3c, 4, 5 as planned; AH-08 if approved |
| Stage 1 — the rules | AH-03 photo rules page; AH-02's "Why an ad is refused" page (or stage 2); the banned-items and safety pages already planned |
| Stage 2 — automatic screening | AH-01, AH-02, AH-04, AH-05, LF-03 (the judge's price signal); DEC-149 translation |
| Stage 3 — a buyer can open the ad | AH-09 to AH-14, AH-06 (counting), LF-04, D131 |
| Stage 4 — sellers manage ads | AH-06's display in My listings; AH-08 |
| Posting-form extras | LF-01, LF-02, LF-05 (research first), D68 |
| Stage 5 — buyers find things | AH-15 to AH-21, LF-09 |
| Stage 6 — staying in touch | AH-22 to AH-26, AH-07, LF-06, LF-07, LF-08 |
| Stage 7 — account and data | AH-31 |
| Stage 8 — seller page and trust | AH-27 to AH-30 |
| Payments era | section 4's options |

## 6 · Questions for the operator — asked at each stage's spec (G49), not now

1. **Stage 2:**
   - the speed promise and its wording — C1: "screened automatically; some reviewed by a person";
   - the free-limit numbers per category and per account (AH-05).
2. **Stage 3:** the safety-box text (Q8) and the report reasons (Q10).
3. **Stage 4:** the mark-sold question (AH-08, Q9).
4. **Posting extras:**
   - photo-first posting and its cost per ad under the AI budget (LF-01);
   - whether to research speech-to-text (LF-05).
5. **Stage 6:** a Telegram bot before or with the Telegram sign-in door (AH-23, Q4).
6. **Stage 5:** the exchange-rate source for "≈ in your currency" (AH-21).
7. **Payments era:** which paid product comes first.

## Sources

- Jiji help pages:
  - [premium services](https://jiji.ng/faq/22)
  - [moderation time](https://jiji.ng/faq/moderation-duration)
  - [decline reasons](https://jiji.ng/faq)
  - [duplicates](https://jiji.ng/faq/duplicate-already-exists)
  - [category limit](https://jiji.ng/faq/category-limit-reached)
  - [image rules](https://jiji.ng/faq/image-requirements)
  - [WhatsApp contact](https://jiji.ng/faq/whatsapp-contact)
  - [share](https://jiji.ng/faq/share-ads-social)
  - [chat vs call](https://jiji.ng/faq/chat-vs-call)
  - [posting rules](https://jiji.ng/faq/posting-rules)
  - [ID badge](https://jiji.ng/faq/verified-id-badge)
  - [store visit](https://jiji.ng/faq/offline-store-verification)
- Revenue and company:
  - [Wikipedia — Jiji Africa](https://en.wikipedia.org/wiki/Jiji_Africa)
  - [productmint — how Jiji makes money](https://productmint.com/how-does-jiji-make-money/)
  - [TechCabal](https://techcabal.com/?p=147531)
  - [africa.com — premium services in Ethiopia](https://africa.com/headlines/jiji-launches-premium-services-in-ethiopia-pledges-to-boost-sme-growth)
  - [Capital Ethiopia, June 2024](https://www.capitalethiopia.com/2024/06/17/jiji-expands-premium-services-to-ethiopia-2/)
- Other:
  - [Meta — Marketplace AI tools, 2026](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)
  - The marketplace feature review of 2026-10-06 (`claude/marketplace-feature-review-2026-10.md`), for every other peer fact.
