Source: supervisor thread, turn 1152, Fri 2026-10-02 07:54 New York.
Status at 2026-10-05: answered 2026-10-02 08:11 on the operator's request ("document in repo"; review other visibility ideas; SEO timing); the rules R1 to R9 and the seven candidates were landed as docs/governance/visibility-plan.md sections 2 and 4 (8fa761d4); this text carries the fuller reasoning and the 'what the code has today' census that the plan summarises in one paragraph.
Related: visibility plan, R1 to R9, ACT-G3, ACT-G4, U7 browse phase, DEC-003, Q-020.

SEO does not need its own project now, but a few rules should be fixed now so they get built in rather than retrofitted. The pages Google would index (a public listing page, "Cars in Addis Ababa" pages, search) do not exist yet; they come in the browse phase after the listing wizard.

**Documented:** the sharing plan and everything below go into the repo as future tasks. I'll attach that to the next Lovable prompt so it doesn't interrupt the fix in flight.

**What the code has today**
- **Already right:** pages are built on the server, each language has its own address that Google is told about, every category has its own URL, and nothing blocks search engines.
- **Missing:**
  - Every category page has the same title ("Category — ethio.com").
  - Listings load in the browser after the page arrives, so Google sees an empty list.
  - The chosen place is not in the URL, so there is no page for "Cars in Addis Ababa".
  - There is no sitemap and no preferred-address tag.
  - Price, make and model are not marked up in the form Google reads.

**What changes while we build**

| When | Area | Rule |
|---|---|---|
| Now | Catalogue | Category addresses and option codes never change once live. This is already the practice; it becomes a rule. |
| Now | Catalogue | No hand-written SEO text per category. Titles come from a template ("Toyota Vitz for sale in Addis Ababa"), and the aliases the curator already collects become the search synonyms. |
| Now | Listing wizard | The title is built from the seller's answers ("Toyota Vitz 2015 Automatic"). You already decided this; I'll move it into the wizard's remaining work. |
| Now | Photo step | Save one share-size image per listing and describe each picture with the listing title. Optionally add a small ethio.com mark on photos. |
| Browse phase | URLs | Place goes in the URL (category × city pages). Each listing gets a permanent number plus readable words. |
| Browse phase | Pages | Lists and listings are built on the server, with real titles, marked-up price/make/model, and a sitemap. |
| Browse phase | Filters | Only make, model and brand filter pages are indexable; other combinations are not, to avoid thousands of thin pages. |
| Browse phase | Sold items | A sold listing keeps its page for a while and shows similar items, instead of a dead link. |
| Launch | Old site | Old ethio.com addresses redirect to the new ones, and Lovable's address tells Google that ethio.com is the real one. |

**Other ways to raise visibility, best first**
1. **Price pages** ("Toyota Vitz price in Ethiopia"), generated from our own listings. These are very common searches there, but need listing volume first.
2. **Bulk upload for dealers.** The census shows dealers post in bulk (342,982 laptop ads on Jiji), and every listing is a page Google can find.
3. **Saved-search alerts** by Telegram, email or phone notification ("tell me when a Corolla under X is posted"). This brings people back.
4. **Shop pages with a printable QR code**, so shops put their ethio.com link in their Telegram bio and on the counter.
5. **Share results for the seller** ("your share brought 34 visitors"), which rewards sharing without us posting anywhere.
6. **A Play Store listing** that wraps the existing app, since most in-country users are on Android.
7. **Invite emails to old ethio.com users**, already planned for launch.

These seven are recorded as candidates, not decisions.

**One step for you, not urgent**
1. Open Google Search Console for ethio.com → Performance → set the date range to 16 months → Export.
2. Send me the file.

It shows which searches and pages bring people to the old site today, which sets the redirects and which categories matter most. This was already on your list for before the old site is switched off. If ethio.com is not in Search Console yet, tell me and I'll give you the steps to add it.
