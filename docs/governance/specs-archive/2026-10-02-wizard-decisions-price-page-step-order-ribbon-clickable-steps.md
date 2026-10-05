Source: supervisor thread, turn 1216, 1218, Fri 2026-10-02 21:37 to 21:57 New York.
Status at 2026-10-04: approved by the operator on 2026-10-02: 21:57 "yes" to moving unit of sale, size, pieces per pack and quantity; "yes" to title and description after price; "yes" to keeping the price amount out of title and description; 22:05 "yes agree with all you mentioned, proceed" (payment terms, minimum hire, price period on rentals and hires, ribbon, default image, clickable steps). Built in bundle 4 (brief Parts A to D, migration M5); not yet walked by the operator; the curator's rent and hire price rows are still to come.
Related: DEC-109, DEC-110, DEC-111, DEC-112, DEC-113, ACT-G4, bundle 4.

Both moves make sense, and they only work well together. I recommend doing both, with no new step and no change to the catalogue rules you already built. Nothing here is built yet.

## What the form does today

- **Walk order:** category → specifications → photos → title and description → price → place → contact → review.
- **Services (27 categories):** the pricing basis (per hour, quote) is already asked on the price page.
- **Goods (38 categories):** the unit of sale is asked on Specifications. You moved it there on 30 September so that size and quantity follow it. The price page only shows a "unit chosen" note with a Change link.
- **The other 86 categories:** no unit; the price is for the one item.

## Move 1: "how it is sold" goes to the price page

I checked every category for what depends on what.

| Question | Categories | Depends on |
|---|---|---|
| Unit of sale | 38 | The product type chosen on Specifications |
| Pieces per pack | 16 | The unit of sale |
| Net weight of one unit | 13 | The product type |
| Volume of one unit | 10 | The product type |
| Quantity available | 21, plus 8 with no unit | Nothing |

Nothing on Specifications depends on any of these, so moving them breaks no relationship. The product type stays on Specifications and still limits the unit. That link across pages already exists for services.

Your 30 September rule is kept, just on the price page:

1. Sold per: bottle
2. One bottle is: 1,000 mL
3. Price type, currency, amount, labelled "Price per bottle"
4. Negotiable tick box
5. How many do you have (optional)

The gain is that the seller types the price while looking at the unit it is for. Etsy and eBay also keep price and quantity together in one section.

One exception: on four beauty categories with no unit of sale (fragrances, makeup, skincare, men's grooming), volume describes the product and stays on Specifications.

## Move 2: title and description after price

No major site does this. Etsy, eBay, IndiaMART and Jiji ask for the title and description before the price. Facebook asks title, then price, then description. They ask the title early because it is the seller's first input. Ours is category-first, and the title is to be built from the seller's answers.

It still fits us, for one concrete reason. The writing assistant drafts from the answers given so far. If the unit and size move to the price page and the title stays before it, the assistant loses them. Today it already writes service ads without knowing "per hour".

**The price amount should not be written into the title or description.** The assistant is already forbidden to do it, and I would keep that:
- **It goes stale:** the title says 5,000 after the seller changes the price to 4,500.
- **It conflicts with structured prices:** price filters, sorting, currencies and the discount feature you want all read the price field.
- **The page can add it live:** the page title and share text can append the current price, which is how search engines should see it.

The assistant can mention the unit and "negotiable".

## Other moves I checked

- **Move to the price page:**
  - Quantity available, everywhere it is asked.
  - On real estate (6–7 categories): minimum term, payment frequency and payment plan.
  - On car hire: minimum hire days.
- **Stay on Specifications:**
  - Offer type (sale, rent, lease), because other questions depend on it.
  - Condition, warranty, delivery, exchange and "included" items, which describe the item and are filters.
- **Clean up:** the services pricing list has "Negotiable" as an option, which duplicates the tick box. I would remove it.
- **No change needed:** the video link is already on the photos step.

## Cost

- **Steps:** still eight; Specifications gets shorter.
- **App:** the walk order is one list, and the price page can already draw chosen questions from the specifications form.
- **Server:** it checks steps in number order, so the title and price checks swap places.
- **Tests:** the browser tests that walk the wizard need updating.
- **Catalogue:** no re-import.

I would run it as its own bundle right after the contact-permissions fix. It would take the title-from-answers task and the "per kg" on cards with it, since they touch the same screens.

## For you to confirm

1. Move the unit of sale, size of one unit, pieces per pack and quantity to the price page?
2. Put title and description after price?
3. Move the real-estate payment terms and minimum hire days as well?
4. Keep the price amount out of the title and description?

Sources:
- [Etsy: listing a physical item](https://help.etsy.com/hc/en-us/articles/115015628707-Listing-a-Physical-Item)
- [eBay: how to create a listing](https://export.ebay.com/in/first-steps/how-to-create-listing/)
- [Facebook Marketplace: create a listing (Dummies)](https://www.dummies.com/article/create-listing-facebook-marketplace-252563)
- [IndiaMART: add products](https://help.indiamart.com/knowledge-base/add-products-on-indiamart)
- [Jiji: how to sell](https://jiji.ng/faq/how-to-sell)

<!-- extractor: next part is from turn 1218, Fri 2026-10-02 21:57 New York -->

Items 1, 2 and 4 are recorded. Here are item 3 and your three new points; nothing here is built yet.

## 3. Payment terms and minimum hire

The test I use: does the answer describe the thing, or the deal? The thing stays on Specifications; the deal goes on the price page.

- **Payment terms are the deal.** How often rent is paid, and whether a sale can be by instalment or bank loan, say how the price is paid.
- **Minimum hire is also the deal.** "2,500 ETB per day, minimum 3 days" is a condition on the price. It says nothing about the vehicle. The same goes for a minimum rental term and the shortest stay.

So all of these move, and I am treating that as agreed. A rental would read: "15,000 ETB per month · paid quarterly · minimum 12 months".

**A gap I found while checking.** On 18 categories that can be rented or hired, the price has no period at all:
- 6 real estate categories
- 8 equipment categories
- 3 clothing categories
- short-term rentals

A house for rent shows "15,000 ETB" with no "per month". Only vehicle hire asks the period today. The fix: when the seller chooses rent, lease or hire on Specifications, the price page asks per day, week, month or year. The sale-or-rent question itself stays on Specifications, because other questions depend on it.

## "Photos coming soon" ribbon

I read the Apex code. It works like this:
- **When it is offered:** only while the ad uses the category's default image. A line says "Don't have photos ready yet?" beside a button.
- **What it looks like:** a text band, not a picture, so it translates. It uses the theme's main colour with white bold capitals, across the bottom-right corner at −30°.
- **When it goes:** as soon as a real photo is added, or when the seller taps Remove.

For ethio.com I would keep that with two changes:
- **Colour and angle:** our main green is the same colour as the "ethio.com" watermark, and −30° is the watermark's angle, so the band matches it.
- **Size:** Apex uses fixed pixel sizes made for one tile. Ours would be sized as a share of the image, so it fits the small card, the preview and the full ad page alike.

**You are right about the missing default image.** The photos step and the full preview show it, but the small card preview on the review step prints "No photo yet" instead. I would fix this with one shared picture component, so the default image and the ribbon look the same on every screen.

## Jumping between steps

- **Today:** on a phone, the strip at the top already lets you tap any step you have visited. On a big screen, the left list and the top bar are not clickable.
- **Proposal:** make both clickable the same way. Any visited step opens directly; steps not yet reached stay locked, because the server checks them in order.
- **Answers:** nothing is lost by jumping. The draft keeps every answer as you move.
- **Changing the category:** this is already built. A real change resets specifications, title, description, video link and price in one go, keeps photos, place and contact, and offers Undo for ten seconds.
- **Published ads:** the wizard only edits drafts today, so a published ad cannot be changed this way.

## Where this goes

All of it joins the wizard bundle after the contact-permissions fix: price page, new step order, default image and ribbon, clickable steps.

**For you to confirm:** on rentals and hires, should the price page ask the period (per day, week, month, year)?
