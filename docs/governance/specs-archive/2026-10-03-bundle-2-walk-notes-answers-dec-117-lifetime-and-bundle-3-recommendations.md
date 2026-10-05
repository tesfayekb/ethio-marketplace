Source: supervisor thread, turn 1260, Sat 2026-10-03 16:56 New York.
Status at 2026-10-04: approved by the operator on 2026-10-03 17:34 with "yes" to each of the four recommendations (home country required at the first post; business name protected like the seller name; suggestions only from Latin letters; AI training crawlers refused); built in bundle 3 (dev 9ba4ff73); the lifetime rule (DEC-117) was built in bundle 4 (brief step 16, M5).
Related: bundle 2, bundle 3, DEC-068, DEC-106, DEC-107, DEC-117, DEC-118, INC-400.

## Your walk notes

1. **Place lists.** Each place carries an admin "display order" number that outranks its name, which is why Adama and Bahir Dar sink to the bottom. Every region, city and sub-city list will follow the name shown, in the reader's language. The admin order field for places is removed; countries keep theirs.

2. **Phone box.**
   - **Letters:** the box will accept digits only.
   - **Your two examples:** both are saved correctly today (+1 435 655 4444 and +1 455 456 4566), but the box shows what you typed. After the fix it shows them grouped ("435 655 4444").
   - **Country formats:** today the box knows only each country's number length. It will use Google's phone-number data, loaded only on the contact step (about 29 KB, once).
   - **A bug I found in the code, not yet reproduced on the site:** a number is saved wrong where the leading 0 is part of the number (Côte d'Ivoire, Congo, Gabon, Benin, Italian landlines), and when a US number is typed with a leading 1. The same change fixes both.

3. **Home country.**
   - **Can they skip it?** Today, yes. The posting spec says it is captured at the first post, so I recommend making it required. It is prefilled, so it costs one tap.
   - **Which one do we rely on?** Both, for different jobs (decided 16 September, DEC-068). The country the seller declares sets their defaults, such as currency. The country their connection comes from is recorded once by the server at the first post, cannot be edited, and is what the ad is filed under. A VPN can fake the second and a seller can declare anything in the first, so a mismatch is a signal for review, never a block.
   - **Finding:** that server-recorded country can today be set by the seller through a crafted request. It is fixed in the security part.

4. **Contact step.** It will be built as you described: "Messages on ethio.com" as a highlighted, always-on box, with phone, WhatsApp and Telegram under "Optional" and a line saying a number shows only if ticked and only to signed-in buyers. "We email you when a message arrives" is a promise that messaging, which is not built yet, must keep; I am adding it to the launch checklist.

5. **Active until.** Today every ad gets 60 days from the day it goes live. The admin's per-category expiry field is empty for all 168 categories, and empty is labelled "No expiry" but behaves as 60 days. Your rule goes into the wizard bundle, which changes the same screens and database functions: no end date by default, the seller may set one, and the admin sets how long by category now and by ad level later. With no end date, ads for sold items stay up until the seller removes them; a "still available?" reminder can cover that later.

## What bundle 3 contains

- **Security, built first:** rate limits enforced in the database, the observed-country fix, private contact details and exact pins, the catalogue lock, and the crawler rules.
- **Contact step:** your layout, the phone fix, and the home country.
- **Seller names:** the rules you agreed, the reserved list, name history, change limits, and admin assignment with a recorded reason.
- **Place lists** from A to Z.
- **The test selector**, so Lovable runs only the tests a change touches.

## Recommendations inside it

Tell me before you send if you disagree with any of these.

1. Home country is required at the first post.
2. The business name gets the same protection as the seller name (no "Awash Bank", no "Telebirr Agent"), because for a business that is the name buyers see.
3. Name suggestions are made only from a name typed in Latin letters. A fixed rule cannot spell Amharic names reliably (it writes ትግስት as "tigst"), so an Amharic name gets no suggestion for now. This changes one detail of the alias rules you agreed.
4. AI training crawlers are refused. Assistants that fetch one page to answer a person's question are not, because they bring buyers.

## Two things to know

- **A correction:** I said notes on the security gaps would enter the public repository only after the fixes are live. Lovable must save the brief in the repository to work from it, so the gaps are named there some hours earlier. The database fix is the first thing built, and the new site is not yet on ethio.com.
- **The reserved-names list** is loaded as it is. Your Amharic proofread is still wanted; corrections can be loaded later.
