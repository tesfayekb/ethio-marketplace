# Visibility plan — future tasks and rules

Recorded 2026-10-02 at the operator's direction. Nothing here is built or scheduled. Every item needs its own approved spec before a build. Candidates are ideas, not decisions.

## 1. Sharing and our own channels (operator decision, 2026-10-02)

- Sellers share their own listing. Buttons for Telegram, WhatsApp, Facebook and copy link appear at the end of posting and on every public listing page. The seller picks where it goes and removes it themselves.
- We post automatically only on accounts ethio.com owns: our own Telegram channels by category and city, fed by our bot with every approved listing. The bot marks or removes its post when the listing sells or is taken down.
- Never: posting into anyone else's account, channel or group. Never: publishing lists of other people's groups to post in.
- A shared link shows a preview card: photo, title, price, city.
- Only listings that passed screening (REQ-021) are shareable or posted by the bot.
- Later, after Meta's app review: posting to a seller's own Facebook Page or Instagram business account.
- Candidate: a seller forwards a post from their own Telegram channel to our bot and it becomes a draft listing.

## 2. Search-engine rules

Decided now, because they are cheap to build in and costly to retrofit:

- R1. Category slugs and option values never change once public. A change needs a redirect.
- R2. No hand-written search text per category. Titles and descriptions come from templates filled from data, in the page's language. Catalogue aliases are the search synonyms.
- R3. The listing title is built from the seller's answers. This joins the wizard's remaining work.
- R4. The photo step saves one share-size image per listing and uses the listing title as each picture's text alternative. A small ethio.com mark on photos is a candidate.

For the browse phase (U7) spec:

- R5. The place is in the URL: category × city pages. A listing URL carries a permanent id plus readable words. Each page names one preferred address.
- R6. Lists, listing pages and shop pages are rendered on the server with real titles; a shop page's title carries the business type and the city. Price, make, model and similar are marked up as structured data. A sitemap is generated.
- R7. Only make, model and brand filter pages are indexable. Other filter combinations are not.
- R8. A sold or removed listing keeps its page for a period and shows similar listings.

For launch:

- R9. Old ethio.com addresses redirect to their new homes. The home page and ?lang=am carry over. Old category and business pages are mapped. Gambling-spam and test pages answer "gone" and are never redirected. Lovable's published address names ethio.com as the preferred address.

State of the code on 2026-10-02: server rendering and per-language alternates exist (src/routes/__root.tsx). /c/$slug exists, but every category shares one static title. The feed is fetched in the browser. The place is shell state, not part of the URL. There is no preferred-address link, no sitemap, no structured data and no public listing page.

## 3. What Google sent to the old site (Search Console export, 2026-10-02)

- Data exists for 2025-05-30 to 2025-06-18 only (20 days): 306 clicks and 25,230 impressions. 76% of clicks came from Ethiopia and 14% from the United States; 87% were on phones.
- 219 of the 306 clicks landed on the home page. The searches were the site's name.
- Six business pages drew 55 clicks and 19,196 impressions. The 256 category pages drew 16 clicks.
- Four gambling-spam pages were on the old site. The operator removed them on 2026-10-02. Search Console reported no security issue and no manual action.
- A second export is due on 2026-10-05.

## 4. Other candidates (not decided)

1. Price pages built from our own listings.
2. Bulk upload for dealers.
3. Saved-search alerts by Telegram, email or push.
4. Shop pages with a printable QR code.
5. Share results shown to the seller.
6. A Play Store listing that wraps the app.
7. Invite emails to old ethio.com users (DEC-003).
