# D201 — The product detail page: study (2026-10-16)

The operator's request (2026-10-16, 13:30 local): plan the product detail page — list what it needs, what is built and what is not; placeholders for what comes later (like, rating, reviews); "contact user" behind sign-in with a reveal log and bot protection; review ethio.com's existing page and peers; tabbed sections; the two required attributes under the title and price; discuss first, then the look at large, medium and small screens. Then (13:31): "product detail page will replace all pages that say 'view as users see it / as buyers see it'."

This study is step (a)–(d): the page as built, the peers, the feature table and my questions. The drawings at 1280 / 768 / 360 follow the operator's rulings on the questions (§6); rough sketches for the discussion are in §5. Nothing here is built or sent to the executor.

Where it sits in the plan: Stage 3 of the order of work ("a buyer can open the ad: the ad page with Show contact, Report, Share and the safety box — researched with peers and agreed with the operator before it is built", roadmap.md :338), with D130 (the detail and list layouts redesigned, with the previews that share their components), D131 (staff see who viewed a contact), AH-09…AH-14 of the ahead-of-Jiji plan and R3 of the marketplace feature review (2026-10, Project doc claude/marketplace-feature-review-2026-10.md, with its sources). D201 is the number for this page's spec.

## 1. The page as built today — read from the code at dev 64767df2

There is NO public listing page. No route under src/routes renders an ad to a buyer (the public routes are `/`, `/c/<slug>`, `/auth…`, `/account`, `/settings`); the feed card is a plain `<article>` with no link (src/components/marketplace/listing-card.tsx :127 — a visitor cannot open an ad). What exists is the PREVIEW component and the doors behind it:

**`ListingDetail`** (src/features/posting/preview/listing-detail.tsx, 415 lines; its header: "THE LISTING DETAIL, AS A BUYER SEES IT … the public listing page does not exist yet … U7 will mount the very same file with a published listing's values"). It never fetches; every value is a prop. Its blocks, in order (:197–395):

1. The photo gallery (`PhotoGallery`: the large photo with the status ribbon, thumbnails; the category's illustration when there is no photo; "Photos soon" band).
2. Title (`listing-detail-title`, an `h2`).
3. Price (`listing-detail-price`: the price line — fixed / per period / per unit / commission / "Contact for price") with the "Price is negotiable" badge (DEC-081).
4. The deal lines under the price: size and terms (`listing-detail-deal-size`, `-deal-term`; bundle 4 step 10).
5. The places line (`listing-detail-places`: the coverage cities, named from the shared place tree).
6. Specifications (`listing-detail-specs`: "Details" heading, one row per answered attribute, options by label, ranges, yes/no, the EC year suffix).
7. Description (`listing-detail-description`).
8. The seller block (`listing-detail-seller`: `SellerLine` — business name or alias, the alias under a business name, "Previously <name>" within 365 days, "Member since <date>") and the contact channels (`listing-detail-contact`: Messages, Phone, Phone 2, Telegram, WhatsApp — the channels the seller ticked, each a row; NO reveal: the preview lists the channel names, never a number).
9. The place text (`listing-detail-place-text`: Directions, Location details — D-era bundle 2 step 10).
10. The map (`listing-detail-map`: `MapPreview` lazily when a pin exists — the exact pin, or an approximate 500 m circle; the placeholder text when none).

Where it is mounted — the four "as buyers see it" surfaces the operator wants replaced by the one page:
- the posting wizard's Review: the side preview and the full-screen sheet "As buyers see it" (`post.preview.title`, en.ts :2882; `PreviewSheet`, preview-sheet.tsx :92);
- the seller's ad page `/my-listings/<id>` (my-listing-page.tsx :570, D169's "the ad as buyers see it" with the status ribbon);
- the admin's listing page `/admin/listings/<id>` (admin-listings/listing-page.tsx :472, `listing-as-seen`, D169);
- Admin › Screening's preview (screening-page.tsx :673, the same `PreviewSheet`; D120 adds the reviewer-only number reveal there).

**The doors and tables that exist for the page** (supabase/migrations):
- The public read: RLS `listings_public_read` — `status = 'active' OR (status = 'sold' AND sold_at > now() − 30 days)` (20261015023155 :453–455), with column grants for the public fields; `listing_photos_public_read` (stripped, screened photos of such ads); `listing_locations_public_read`. No single-ad read function exists (no `public_listing(id)`): the page's one read is to be written.
- `reveal_listing_contact(p_listing_id)` (20261003215007 :270–314): signed-in callers only ("not authenticated"); an ad that is not active is refused ("listingNotAvailable" — a sold ad's contact is closed, D175); one row per viewer per ad per day in `contact_reveals(listing_id, viewer_id, day)` (RLS on; nothing readable by clients); the `contact_reveal` rate dial through `rate_gate` (30 a day per viewer — DEC-071's table); the answer is the ticked channels with their values. `listing_reveal_count(p_listing_id)` gives the owner the count (no screen uses it yet — src has no caller). Staff lists of who revealed (D131) are NOT built.
- The seller's public line: `SellerLine` reads alias, business name, previous alias (365 days), member since (bundle 3 step 20). Contact-verification ticks (R15: "Email ✓ · Google ✓ · Telegram ✓") are NOT built.
- Card attributes: `category_attribute_links.card_rank` 1..3 — "a listing card shows at most three attributes" (docs/features/attributes.md :59) — curated per category by the catalogue (the roster flags a category with fewer than two). NOT yet served by the feed read (`feed_page` returns no attributes; `FeedListing` has none) and NOT drawn on the card.
- Not built, with no table: views (view_count — "separate pre-launch view-tracking feature", 20260804213701 :24), favourites / saves, reports (`listing_reports` — the moderation design), ratings and reviews (DEC-150: of SELLERS, stage 8), similar ads, the share image (R4; no route sets `og:image`), a stable address (listings have no slug column; the id is the only key), structured data for search engines.

**The old ethio.com** (the WordPress site live at ethio.com today): a category directory (15 menu sections — Real Estate, Auto & Parts, Jobs & Vacancies …) on WooCommerce with WPML; its category pages served no individual ad links to a visitor from here, and its product pages (`/product/<slug>/`) could not be fetched without your say — if you want its ad page compared block by block, send me one ad's URL or a screenshot. Nothing on it changes this plan: it has no contact gate, no safety box and no reveal log to carry over.

## 2. What peers put on an ad page (and what makes a buyer act)

From the feature review of 2026-10 (claude/marketplace-feature-review-2026-10.md, rows T7, T9, T10, R3 and their sources) plus today's reads. Each line says where it comes from; lines marked (memory) are from my knowledge of these sites, not re-read today.

| Block | Jiji (NG/ET) | OLX / Dubizzle | Leboncoin / Kleinanzeigen / Avito | Facebook Marketplace / Craigslist | What it does for the buyer |
|---|---|---|---|---|---|
| Photos first, full width on a phone; thumbnails / swipe | ● | ● | ● | ● | The photo decides whether the page is read at all |
| Title, then price, then 2–3 KEY FACTS right under them (year · mileage · transmission for a car; bedrooms · m² for a flat) | ● (Jiji ET car ad: "2018 · Automatic · 4WD" style chips) (memory) | ● (OLX: parameter chips) (memory) | ● (Kleinanzeigen: "Details" list; Avito: key specs block) (memory) | ◐ (FB: condition, brand) | The two or three numbers that qualify the ad before the buyer scrolls |
| Place and "posted <when>" | ● | ● | ● | ● | Freshness and distance |
| "Show contact" / "Chat" / WhatsApp, pinned at the bottom on a phone | ● (login to see the number; WhatsApp with a pre-filled message is a paid perk — jiji.ng/faq/whatsapp-contact) | ● (OLX PL/IN: login required to see numbers) | ● (Leboncoin: login, counted; Avito: masked number) | ◐ (FB: message only; Craigslist: relay e-mail, phone optional) | The one action the page exists for; gating it is the norm, not the exception |
| Safety tips on the ad | ● (Jiji ET: 4 lines on every ad — "Avoid sending any prepayments · Meet with the seller at a safe public place · Inspect what you're going to buy to make sure it's what you need · Check all the docs and only pay if you're satisfied") | ● (help pages) | ● (Engocha ET: 8 lines on every ad) | ● (Craigslist help) | Every payment scam needs the buyer to break "meet, inspect, then pay" |
| Seller card: name, member since, badges/ticks, ad count, "last seen", feedback | ● (feedback with smileys; "Leave feedback" on the ad page and the profile; products are not rated separately — jiji.ng/faq/54, read today) | ● (OLX: member since, response time) (memory) | ● (Kleinanzeigen: member ratings since 2023 — "Zuverlässig / Freundlich"; Leboncoin: ratings after a transaction) (memory) | ● (FB: seller ratings after a conversation; Craigslist: none) | Trust before the tap; the ad's trust lives on the SELLER, not the item |
| Description (free text, "read more") | ● | ● | ● | ● | — |
| Details table (every attribute) | ● | ● | ● | ◐ | The long tail for the buyer who is already interested |
| Save / favourite (heart), with the count shown to the seller | ● | ● ("Observed") | ● (Kleinanzeigen "Merken"; Avito shows favourites to the seller) (memory) | ● (FB "Save") | A second visit; a signal of demand for the seller |
| Report ad, with a reason list | ● ("Report abuse" → reason → comment) | ● | ● | ● | Cheap moderation signal; a launch-gate item (DEC-128 reasons) |
| Share (WhatsApp, Facebook, copy link; Telegram rarely) | ● (no Telegram — jiji.ng/faq/share-ads-social) | ● | ● | ● | Telegram is the local gap (AH-13) |
| Views count on the ad | ● | ● | ◐ | ○ | Social proof; cheap once a counter exists |
| Similar ads under the page | ● | ● | ● | ● | Keeps the buyer on the site after a "no" |
| Tabs | ○ (sections, one long scroll) | ○ | ○ | ○ | Classifieds peers do not tab the ad page on a phone; retail stores do (the attached duffel-bag page: Description · Details · Shipping · Returns). Reason: tabs hide content from search engines and from a thumb that scrolls |
| Breadcrumbs (Home › category › … › ad) | ● | ● | ● | ○ | Orientation and search-engine structure |
| Structured data (schema.org Product / Offer), a stable address, a share image | ● | ● | ● | ● | Search traffic and clean WhatsApp/Telegram previews |

What makes a page convert, in the order the reviewed sites agree on: the first photo → the price → two or three key facts → the place → one big contact button that is never more than a thumb away → trust (the seller card and the safety lines) → the rest.

## 3. The feature table — built / not built / placeholder now

"v1" = the first slice of the page (the stage-3 build); "placeholder" = the control is drawn, inert or counted, so the layout does not move when the feature lands.

| # | Feature | Today | Proposal | Who / where |
|---|---|---|---|---|
| 1 | The page itself: `/l/<id>` (a stable address; the title slug added later for search engines — `/l/<slug>-<id>` with the id the key) | NOT built | v1: server-rendered, light on 3G (D-era rule: kilobytes are the user's money); one read function `public_listing(p_id)` returning the ad, its photos, places, specs with labels, the seller's public line; the feed card becomes a link | one migration (the read); one route; the card |
| 2 | One component for every surface: the public page, the wizard's "As buyers see it", the seller's ad page, the admin's listing page, Screening's preview | `ListingDetail` already shared by the four previews | v1: the page is built FROM `ListingDetail` (redesigned per D130), so the previews change with it for free; each surface passes its own `actor` (buyer / owner / staff) — the owner sees "This is how buyers see your ad" and no contact gate; staff see the reviewer's number reveal (D120) | — |
| 3 | Breadcrumbs Home › category path › ad title | the shell's category trail exists for `/c/<slug>` | v1: the ad's category path, the title as the current crumb (truncated) | breadcrumbs.tsx (D198's pattern) |
| 4 | Gallery: full-width photo, swipe on a phone, thumbnails on a desktop, the status ribbon, pinch-zoom / full-screen | `PhotoGallery` (thumbnails + large; the ribbon) | v1: as built, plus full-screen on tap; swipe | — |
| 5 | Title · price (+ negotiable, + the old price struck through when reduced) · the deal lines | built in the preview; "was" price on the card only | v1: the "was" price on the page too (D199 ties in) | — |
| 6 | **The two key facts under title and price** — your "two required attributes" | `card_rank` 1–2 exist in the catalogue; not served, not drawn anywhere | v1: the catalogue's card-rank 1 and 2 (the facts the card is meant to show — Make · Model, Bedrooms · Size …) as two chips right under the price, and the same two on the feed card; rank 3 when the category has it | the read; the card; **Q1** |
| 7 | Place line (city · sub-city), "Posted <relative time>", "Renewed" | places line built; dates on the seller's page only | v1 | — |
| 8 | **Contact** — "Show contact" behind sign-in; after the tap: the phone (tap-to-call), WhatsApp deep link pre-filled "I'm interested in your ethio.com ad: <link>", Telegram link to the username (never `t.me/+phone`), Messages (later) | the door `reveal_listing_contact` (signed in; active ads only; one row per viewer per day; 30/day dial); the preview lists channel NAMES only | v1: the button pinned at the bottom on a phone, in the right column on a desktop; a signed-out tap → the sign-in page with `return=/l/<id>` then the reveal; the number appears only after the door answers (never in the served HTML); the seller's own ad shows no gate | — |
| 9 | **The reveal log and bot protection** ("on backside we list who is revealing user contact, prevent bots") | `contact_reveals(listing_id, viewer_id, day)` written by the door; `listing_reveal_count` for the owner; the dial | v1 server side is done. Add in the stage: (a) D131 staff lists — per listing who revealed (name, day), per user profile the contacts they viewed and who viewed theirs; (b) the seller's "Contacts: N" on his ad page (the door exists); (c) the velocity rules: the 30/day dial stands, plus a per-day cap on DISTINCT sellers revealed by one account (a scraper reveals many sellers; a buyer reveals a few) and a flag to the admin at the cap; (d) new accounts (< 24 h, no listing, no previous reveal) get a lower dial for the first day; (e) the number is never rendered server-side and never in the feed read; (f) Cloudflare's bot rules and Turnstile on the sign-up door, not on the reveal tap (a signed-in human must not be challenged twice); (g) the audit row carries the viewer's user id only — no IP in the table (PII minimal), the IP stays in the edge logs | **Q2** (the distinct-sellers cap's number; whether a brand-new account may reveal at all on day one) |
| 10 | Safety box: four lines, EN/AM, under DEC-129's header ("meet, inspect, then pay — no deposit, no payment link, no code") | not built | v1: right under the contact block; the lines from AH-11 | strings; **Q3** (the four lines' wording) |
| 11 | Seller card: name / business, member since, "previously", the business badge later, the free ticks (Email ✓ Google ✓ Telegram ✓ — R15), "See all ads by this seller" (the seller page, stage 8) | `SellerLine` built; ticks not; seller page not | v1: the card with what exists; the ticks when the account read serves them; the "all ads" link as a placeholder → the feed filtered by seller (cheap) | — |
| 12 | Specifications table (every answered attribute) | built | v1: as built, grouped by the catalogue's order; the two chips of #6 not repeated | — |
| 13 | Description with "Read more" past ~8 lines; the seller's language, translation on a tap later (DEC-149) | text built; no fold | v1: the fold; the translate tap as a placeholder (hidden until DEC-149's switch is on) | — |
| 14 | Map: the pin or the approximate circle; "Get directions" | `MapPreview` built | v1: as built + the directions link to Google Maps / OSM | — |
| 15 | **Save (heart / "like")** | nothing | v1 PLACEHOLDER: the heart drawn in the gallery's corner and in the action row; a tap → sign-in if signed out, then a `saved_listings(user_id, listing_id)` row; the count ("12 people saved this") shown to the SELLER on his ad page and, your call, publicly. One migration (table, RLS, the two doors, the count in the owner's read). Cheap enough to build in v1 rather than stub; stage 5 has "favourites and saved searches" | **Q4** |
| 16 | **Rating and reviews** | nothing; DEC-150 plans reviews and ratings OF SELLERS at stage 8 | PLACEHOLDER in v1: a "★ Seller rating — coming" line in the seller card and a "Reviews (0)" section anchor that renders nothing until the feature exists. The design question is WHOSE rating: every classifieds peer rates the seller after a contact (Jiji: feedback on the seller, "products aren't rated separately" — jiji.ng/faq/54); a product rating belongs to a store that sells many of one item. My recommendation: rate the seller; show it on the ad ("4.8 ★ · 12 reviews"); a review names the ad it came from. A buyer may rate only after a reveal of that seller's contact (the reveal row is the proof of an interaction) | **Q5** |
| 17 | Report this ad (reason list: spam · scam · prohibited item · wrong category · duplicate · already sold · appears under 18 · copyright · other), anonymous to the seller, outcome told | not built | v1 or the stage's second turn: `listing_reports`, the `report` dial, the admin queue hook (AH-12; a launch-gate item) | one migration |
| 18 | Share: Telegram · WhatsApp · Facebook · copy link, with the share image (photo · price · title); the seller sharing his own ad from the site (the operator, 2026-10-14) | nothing; no `og:image` route | v1: the buttons (Web Share API on a phone, the four links on a desktop); the OG image route in the same turn (R4) | — |
| 19 | Views ("Seen 120 times") | no counter | PLACEHOLDER: the line is drawn only when a count exists; the counter is a stage-4 item (write-cheap: a daily bucket, not a row per view) | — |
| 20 | Similar ads (same category, same place, up to 6 cards) | the feed query exists | v1: one `feed_page` call with the ad's category and place, the ad itself excluded | — |
| 21 | A sold ad's page (30 days): the Sold ribbon, "This ad is sold — see similar", contact closed | the RLS and the door already behave so | v1: the words | — |
| 22 | Structured data (schema.org Product/Offer), canonical, `noindex` for sold/expired, the title slug | nothing | v1: the JSON-LD block in the route's head; the slug in the stage's second turn | — |
| 23 | **Tabs** | — | My recommendation: NOT tabs that hide content — a sticky in-page bar (Overview · Details · Seller · Reviews) whose items SCROLL to the sections, so the page stays one document (search engines read it whole; a thumb never finds an empty tab; the retail tab pattern of the attached page fits a store with returns and shipping, which we do not have). On a desktop the same bar sits at the top of the content column | **Q6** |
| 24 | "Open in app" / install prompt, data-saver photo sizes | the PWA exists | later (stage 6) | — |

## 4. The owner's and staff's views of the same page (replacing "as buyers see it")

One route, one component, three actors:
- **Buyer** (`/l/<id>`, signed out or in): everything in §3 as described; the contact gate; the report and share controls.
- **Owner** (the seller's ad page and the wizard's preview mount the SAME component with `actor: "owner"`): a top bar "This is how buyers see your ad" with the status ribbon, the Edit button, "Contacts: N · Saved by: N · Views: N" (the counters as they exist); the contact block shows HIS channels without a gate; no Report, no "similar ads" (they would be competitors'). The wizard's preview sheet is the same component with the draft's values, as today.
- **Staff** (the admin's listing page and Screening's preview): `actor: "staff"` — the reviewer's number reveal (D120) in the contact block, the unscreened-photo mark, the moves and history around it, as D169 has them.

The four surfaces listed in §1 then show one truth: a change to the page is a change to every preview (F4: a preview that disagrees with the page is worse than none).

## 5. Layout — the block order at each width (sketches for the discussion; the drawings follow the rulings)

**Small (360, the primary):** one column. Gallery (full width, 4:3, swipe, the ribbon, the heart and share in its corners) → title → price (+ negotiable / was-price) → the two key-fact chips → place · posted → the sticky bar **[Show contact]** [♡] [Share] at the bottom of the screen → the in-page bar (Overview · Details · Seller · Reviews, sticky under the top bar once scrolled) → safety box (four lines, collapsible after the first read) → specifications → description (Read more) → map → seller card (name, since, ticks, rating placeholder, "All ads by") → report link → similar ads (2-column cards) → the breadcrumb lives in the shell's band above, as everywhere.

```
┌──────────────────────────┐
│ ‹ Home › Cars › Toyota   │  (shell breadcrumb)
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │  photo 1 / 6   [♡][⇪]│ │
│ │           ▟SOLD▙ rib │ │
│ └──────────────────────┘ │
│ ● ○ ○ ○ ○ ○              │
│ Toyota Corolla 2012      │
│ ETB 1,450,000  (was …)   │
│ [2012] [Automatic]       │  ← the two key facts
│ Bole, Addis Ababa · 2 d  │
│ Overview·Details·Seller  │  ← sticky in-page bar
│ ┌ Safety ──────────────┐ │
│ │ Meet · inspect · pay │ │
│ └──────────────────────┘ │
│ Details                  │
│  Make        Toyota      │
│  Mileage     98,000 km   │
│ Description … Read more  │
│ [map]                    │
│ Seller: Abebe G. ✓✓      │
│ ★ rating — coming        │
│ Report this ad           │
│ Similar ads ▢ ▢          │
├──────────────────────────┤
│ [  Show contact  ] ♡  ⇪  │  ← sticky bottom bar
└──────────────────────────┘
```

**Medium (768):** two columns from the price down — the gallery full width on top; left: key facts, safety box, details, description, map; right (a sticky card): price, the contact button, the seller card, share, report. The in-page bar is not needed (everything is in view within one scroll).

**Large (1280):** the gallery (two thirds) with the price/contact/seller card beside it (one third, sticky); under the gallery: the in-page bar, the key facts, details, description, map, similar ads; the right column keeps the contact card in view the whole way down.

```
┌───────────────────────────────────────┬──────────────────┐
│ photo 1/6                  [thumbs ▸] │ ETB 1,450,000    │
│                                       │ (was 1,600,000)  │
│                                       │ [2012][Automatic]│
│                                       │ [ Show contact ] │
│                                       │ ♡ Save   ⇪ Share │
│───────────────────────────────────────│ Seller: Abebe G. │
│ Overview · Details · Seller · Reviews │ member since …   │
│ Safety: meet, inspect, then pay …     │ ✓ Email ✓ Telegram│
│ Details table                         │ ★ rating — coming│
│ Description                           │ Report this ad   │
│ Map                                   │                  │
│ Similar ads ▢ ▢ ▢ ▢ ▢ ▢               │                  │
└───────────────────────────────────────┴──────────────────┘
```

## 6. Questions before the spec (G49) — one line each is enough

- **Q1 — The two facts under the price:** the catalogue's card-rank 1 and 2 (curated per category: the facts a card shows; e.g. Make · Model for cars, Bedrooms · Size for flats), or the first two REQUIRED questions in form order? My recommendation: card rank — it is already curated for exactly this, and the feed card should show the same two.
- **Q2 — The reveal's bot rules:** keep 30 reveals a day per account (built) and add a cap on DISTINCT sellers per day (my proposal: 10) with an admin flag at the cap; a brand-new account (first 24 h) at 5. Yes, or other numbers?
- **Q3 — The safety box wording** (four lines, under "meet, inspect, then pay — no deposit, no payment link, no code"): take Jiji ET's four lines in our words, or do you want to write them?
- **Q4 — Save (heart):** build it in v1 (one small migration) rather than stub it? And is the saved count public ("12 people saved this") or the seller's only?
- **Q5 — Rating and reviews:** of the SELLER (shown on every ad, after a contact; DEC-150's design), not of the product — agree? If you want product-level reviews as well, say what a "product" is on a classifieds site (one ad = one item, sold once).
- **Q6 — Tabs:** the in-page bar that scrolls to sections (one document) rather than tabs that hide sections — agree?
- **Q7 — The address:** `/l/<id>` now and `/l/<slug>-<id>` when the slug column lands, or the category in the path (`/cars/toyota-corolla-2012-<id>`, Jiji's shape)? The second reads better in a WhatsApp preview and for search; it costs the slug column and a redirect rule on a category change.
- **Q8 — Messages:** the contact block says "Messages" today when the seller ticked it; messaging is stage 6. In v1 the tap can only say "Messaging is coming — call or WhatsApp meanwhile", or the channel is hidden until stage 6. Which?
- **Q9 — Scope of the first slice (ESTIMATE, band given):** page + read + card link + contact + safety box + seller card + share + similar + structured data: 4–6 executor turns, 1–2 migrations; add Save (+1 turn, +1 migration) and Report (+2 turns, +1 migration). Build Save and Report in the same bundle, or after?

## 7. Forward scan

- D199 (discount / sale): the "was" price and the Price-reduced ribbon are drawn on this page from the same fields the card uses; the spec of D199 names what the page shows (the old price struck through, the percentage, how long).
- D131 (staff reveal lists) consumes `contact_reveals` as built; D201 adds the seller's own count.
- DEC-150 (stage 8, seller reviews): the placeholder anchors (#16) are its landing spots; the reveal row is the proof-of-interaction a review needs.
- Stage 6 (messages): the Messages channel's tap (#8, Q8).
- DEC-116 (private at launch) does not touch the public page; the page is public by design.
- Retention: `contact_reveals` rows are personal data (viewer × seller × day) — the Privacy text names them and the purge rule (90 days? — a retention question for the legal section, not for v1's code).

## Sources

- claude/marketplace-feature-review-2026-10.md (Project doc; rows T7, T9, T10, R3, R4, R15, R16 and their links — Jiji ET ad page, Jiji FAQ WhatsApp contact and share, OLX PL/PK/IN help, Leboncoin help, Avito, Craigslist help, Engocha, Dubizzle, Mercari, Vinted).
- claude/ahead-of-jiji-plan-2026-10-14.md (AH-09…AH-14; the operator's 2026-10-14 share note).
- [Jiji — How to leave feedback about the seller? (faq/54)](https://jiji.ng/faq/54) — read 2026-10-16: feedback is about the seller; "products aren't rated separately".
- [Jiji — WhatsApp contact](https://jiji.ng/faq/whatsapp-contact) · [Jiji — share ads](https://jiji.ng/faq/share-ads-social) (from the review).
- The repository at dev 64767df2: src/features/posting/preview/listing-detail.tsx; src/components/marketplace/listing-card.tsx; supabase/migrations/20261003215007 (:270–335), 20261015023155 (:448–470), 20260804213701 (:23–24); docs/features/attributes.md :59; roadmap.md :338, :345.
- ethio.com (the old site), read 2026-10-16: category directory only from here.
