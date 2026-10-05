Source: supervisor thread, turn 1202, 1204, 1206, 1208, 1210, Fri 2026-10-02 19:51 to 20:45 New York.
Status at 2026-10-04: approved by the operator in steps on 2026-10-02: 20:12 "yes agree" (direct channels for signed-in buyers only), "yes" (no email channel), "yes, but I dont want a user to use ethio anywhere even if its ethio_coffee"; 20:25 "i guess 1 year is ok", "store page for everyone - yes optional if they want", the ethio rule covers the business name and its Amharic spelling "yes"; 20:33 "on Sharing out and links in - agree with your decision earlier"; 20:45 "I agree with the above ... lets save it as agreed rule then. same aliases cant take ethio name." (store address ethio.com/name). Later changes: 2026-10-03 17:34 suggestions only from Latin letters and the business name protected like the seller name. Built in bundle 3 (contact visibility, name rules, name history, page-name guard); store pages, public links, the verified badge and the Show contact button on a public ad page are not built.
Related: DEC-106, DEC-107, DEC-108, REQ-007, REQ-008, Q-008, INC-389, ACT-G1.

I recommend keeping phone, WhatsApp, Telegram handle and email for signed-in buyers only, letting business sellers show a website publicly, and tightening the alias rules before launch. Nothing below is built or sent to Lovable; it is for you to decide.

## Contact details

**What other marketplaces do**

| Marketplace | Practice |
|---|---|
| OLX Poland | Since 14 May 2021, phone numbers are shown only to signed-in users. Stated reasons: data safety, and making it harder for scammers to contact people outside OLX. |
| Avito | Since February 2022 every private seller's number is replaced by a temporary substitute that forwards the call. Stated reason: number harvesting and spam. |
| OLX India | The seller can hide the number, and buyers start by chat. |
| Kijiji | A buyer's real email is replaced by a relay address in replies, to protect against spam and phishing. |
| Jiji | A ready-made scraper sold online collects seller phone numbers from five Jiji country sites, described as publicly available data. |

OWASP's guidance is that no single control stops harvesting. Sign-in is the most reliable one, and it needs rate limits and monitoring on top.

**Proposal per channel**

| Channel | Who sees it | What we can honestly tell the seller |
|---|---|---|
| Messages on ethio.com | Signed-in buyers | "Buyers write to you here. They never see your number." |
| Phone, second phone | Signed-in buyers who tap "Show number" | "Not visible to visitors or search engines. Every view is recorded, and one account can open only a limited number per day." |
| WhatsApp | Same as phone, because a WhatsApp link contains the number | Same as phone. |
| Telegram handle | Signed-in buyers who tap to show it | "Telegram hides your phone number if your Telegram privacy setting says so." This is the safest direct channel. |
| Email | Not offered as a channel | Messages reach the seller by email notification, so the address is never shown. |
| Website, Telegram channel, social page | Everyone, for business sellers | "This is public. Anyone can open it." |

- **The seller's switch stays.** Its label becomes "Show to signed-in buyers", so the seller knows exactly who will see the number.
- **A public phone option is not worth it yet.** "Business" is self-declared today, a harvested number cannot be taken back, and sign-in is one tap. I would revisit it when verified businesses exist.
- **The cost is real.** Some buyers leave at a sign-in wall, and Jiji appears to be less strict than this.
- **The limits are real too.** Someone with many accounts can still collect numbers slowly. Only substitute numbers, as Avito uses, fully hide a number, and that needs a telecom partner.
- **Website links need their own checks.** Each link is screened when saved, link shorteners are refused, and links are marked so search engines give them no credit.
- **This changes REQ-007.** Public links are an amendment and need a recorded decision. Ethiopia's data protection law (Proclamation 1321/2024) requires informed consent; the switch wording should get a legal check before launch.

## Aliases

**What the code does today**

- **Shape:** 3 to 30 characters of small letters, digits and underscore. "12345" passes, and so does a phone number.
- **Suggestion:** it comes from the business name or the account name. When sign-in gave no name, the account name is the part of the email before the @. That is why you saw numbers, and it also exposes part of the seller's email.
- **Amharic names:** they produce no suggestion at all.
- **Reserved words:** 32, matched exactly, so "ethio_support" passes. No category or brand names are protected.
- **Brand imitation:** one AI check, and if the AI is unavailable the alias passes.
- **Changes:** unlimited, with no history kept. The old alias is free for anyone at once, and checking a name also claims it.

**What others do**

| Site | Rules |
|---|---|
| eBay | Not all digits; no phone numbers, email or web address parts; no double underscore; nothing confusable with a trademark. One change per 30 days. The old name is held 30 days and an icon marks the change for 30 days. |
| Etsy | Five changes, then support must approve. An icon marks the change for 45 days. A used name is never given to anyone else. |
| X | Letters, digits and underscore. Names containing "Admin" or the platform's name cannot be claimed. |
| Instagram | Letters, digits, periods and underscores, up to 30. The old name is held 14 days. |

**Proposed rules**

1. **Shape:** 5 to 30 characters, Latin only, starting with a letter. At least three letters, no run of seven or more digits, no double or edge underscores.
2. **Suggestions:** three to tap, built from the business name or first and last name, never from the email. Amharic names are converted to Latin letters by a fixed table. If a name is taken, at most two digits are added at the end.
3. **Platform words:** any alias containing admin, support, official, verified, moderator or staff is refused. "ethio" alone is refused, but "ethio_coffee" is allowed.
4. **Category and attribute names:** refused on exact match ("cars", "phones"). "abebe_cars" is allowed.
5. **Brands:** refused on exact match against the catalogue's brand lists (640 names today) plus a seeded list of banks, telecoms, airlines and government bodies.
   - A brand plus only a claim word ("samsung_official", "toyota_ethiopia", "telebirr_agent") is refused.
   - A brand plus the seller's own name ("selam_samsung") is allowed.
   - Lookalikes are folded before comparing: 0/o, 1/l, rn/m.
   - Twenty-one brands are also ordinary words or names (Lincoln, Hero, Habesha), which is why only exact matches are refused.
6. **AI check:** it stays as a second layer. When it is unavailable, the alias is accepted but queued for review.
7. **Changes:** one per 30 days. Checking a name no longer claims it. An old alias stays bound to its account and is never given to another seller.
8. **Tracing:** listings, reports and bans attach to the account, never the alias. Every listing shows "Member since". After a change, "previously <old name>" shows for 90 days (my estimate; eBay and Etsy use 30 and 45 days with an icon only).

Renaming is the smaller risk: the Telegram scam pattern reported in Ethiopia is sellers who take a deposit and vanish, and they would simply open a new account. "Member since" and limits on new accounts address that.

## Decisions for you

1. Direct channels for signed-in buyers only, with no public phone option for now?
2. No email channel?
3. Public website and channel links for business sellers only, or for all sellers?
4. Alias changes once per 30 days, old alias never reissued, previous name shown for 90 days?
5. The brand rule as in point 5?

Decisions 1 and 2 feed the contact-permissions fix (INC-389) that follows bundle 2, so they add no extra bundle. The alias rules would be one small bundle after that.

Sources:
- [OLX Poland: numbers only for signed-in users](https://android.com.pl/news/404331-nie-jestes-zalogowany-nie-zobaczysz-na-olx-numerow-telefonow-w-ogloszeniach/)
- [Avito number protection (new-retail.ru)](https://new-retail.ru/novosti/retail/avito_bolshe_ne_pokazyvaet_nomera_telefonov_chastnykh_prodavtsov_na_platforme8332/)
- [Avito number protection (T—Ж)](https://t-j.ru/news/avito-anonymous/)
- [OLX India hidden numbers](https://www.medianama.com/2016/10/223-olx-hide-user-info/)
- [Kijiji masked email addresses](https://help.kijiji.ca/safety/masked-email-addresses)
- [Jiji Listings Scraper](https://apify.com/piotrv1001/jiji-listings-scraper?fpr=ewv9tm)
- [OWASP Bot Management and Anti-Automation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Bot_Management_and_Anti-Automation_Cheat_Sheet.html)
- [eBay username policy](https://www.ebay.co.uk/help/policies/identity-policies/username-policy?id=4235)
- [eBay: changing your username](https://www.ebay.com/help/Account/Settings/Changing_your_username?id=4198)
- [Etsy: how to change your shop name](https://help.etsy.com/hc/en-gb/articles/115015710568-How-to-Change-Your-Shop-Name)
- [X username rules](https://help.x.com/en/managing-your-account/twitter-username-rules)
- [Instagram username changes (SlashGear)](https://www.slashgear.com/1192072/how-to-change-your-username-on-instagram-in-2023/)
- [Telegram phone number privacy (Bitdefender)](https://www.bitdefender.com/en-us/blog/hotforsecurity/control-your-privacy-series-how-to-hide-your-phone-number-on-telegram)
- [Telegram shopping scams in Ethiopia (The Reporter)](https://www.thereporterethiopia.com/26781/)
- [Ethiopia Personal Data Protection Proclamation 1321/2024 (Dablo Law Firm)](https://dablolawfirm.com/ethiopia-enacts-personal-data-protection-proclamation-no-1321-2024/)
- [Google: qualify outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links?hl=en)

<!-- extractor: next part is from turn 1204, Fri 2026-10-02 20:12 New York -->

Items 1, 2 and 5 are settled as you answered them. My recommendations on the two open ones: a store page for every seller with public links for business sellers only, and previous names shown for one year.

## 3. Store page and public links

The ledger already says every seller gets a public page (REQ-008), at ethio.com/@xyz. The @ stops a shop name from colliding with site pages such as /post. I would keep the page for everyone, because it is what lets a buyer see a seller's other ads and how long they have been a member.

What differs by seller type is what the page carries:

| | Person | Business |
|---|---|---|
| Public page at ethio.com/@name | Yes | Yes |
| Shows | Alias, member since, their ads | The same, plus business name, logo, cover and description |
| Public links (website, Telegram channel, social pages) | No | Yes |
| Phone, WhatsApp, Telegram handle | Signed-in buyers only | Signed-in buyers only |

**Links for all sellers**
- **For:** one rule for everyone, and the many people who sell through a Telegram channel or Instagram page can show it.
- **Against:**
  - Every link has to be screened, so the screening load grows with every seller.
  - A link to a personal profile exposes a private seller's real name and photos to anyone, without sign-in.
  - A link to a personal Telegram account is a contact channel that bypasses the sign-in rule you just agreed.
  - Spam accounts post ads only to carry links, which is what happened on the old site.

**Links for business sellers only**
- **For:** a business is public by nature, and a person stays private by default.
- **Against:** it excludes nobody, but it is also not a security barrier. "Business" is self-declared and free, so a person who wants to show their channel switches to business and gives a business name. What it adds is one clear choice between private and public.

One thing is not confirmed yet: how to tell a Telegram channel from a personal account when a link is entered. That goes into the storefront spec.

## 4. How long to show the previous name

| Shown for | Benefit | Risk |
|---|---|---|
| 90 days | Covers a quick rename after a bad deal | A seller can wait it out within one season |
| 1 year | Covers the period in which disputes and repeat buyers come back | Small: an old name stays public for a year after an honest rebrand or a typo fix |
| Indefinitely | A name can never be shed | See below |

The risks of showing it indefinitely:
- **Safety:** a seller who renames because of harassment, or because the old alias gave away their real name, stays tied to it in public for good.
- **Honest changes:** a rebrand, a sold business or an embarrassing first choice follows the seller forever.
- **The law:** Ethiopia's data protection law gives people a right to have data erased or corrected, and permanent display of a name someone asked to remove is hard to square with that. I am not a lawyer, so this belongs in the pre-launch legal check.
- **Little extra protection:** after a year, the cheaper move for a scammer is a new account, which no alias rule stops.

I could confirm only eBay (an icon for 30 days) and Etsy (an icon for 45 days). I found no marketplace that shows old names permanently.

My recommendation is one year in public, with three things permanent:
- **The record:** ethio.com keeps the full name history for reports and bans.
- **The old address:** ethio.com/@oldname keeps redirecting to the seller.
- **Member since:** it shows on every ad and cannot be reset by renaming.

An admin can hide a previous name early in a safety case.

## 5. "ethio" anywhere

Agreed: any alias containing "ethio" is refused, including lookalike spellings such as "ethi0" and letters split by underscores. Taken literally, this also refuses "ethiopia" and "ethiopian" (for example "abebe_ethiopia"). I have applied it that way; say so if you want those two allowed.

## For you to confirm

1. Public links for business sellers only, with a store page for everyone?
2. Previous name shown for one year?
3. Does the "ethio" rule also cover the business name buyers see, including the Amharic spelling? If it covers only the alias, a shop can still display "Ethio Coffee" in large type. My recommendation is to apply it to both now, and later let a verified business show its registered name. The cost is that honest businesses with "Ethio" in their name cannot show it until verification exists.

<!-- extractor: next part is from turn 1206, Fri 2026-10-02 20:25 New York -->

They are two different things, and nothing I proposed restricts the one you mean.

## Sharing out and links in

| | What it is | Who gets it |
|---|---|---|
| **Sharing out** | At the finish step and on the ad page, a button opens the seller's own Telegram, WhatsApp, Facebook or Instagram with the ad's text, image and a link back to ethio.com. The seller posts it themselves. | Every seller. Already recorded as a future task (ACT-G1). |
| **Links in** | The seller's page on ethio.com shows a link to their own website, Telegram channel or Instagram page. | This was my "No / Yes" row. |

"Business" in that row meant our own person/business choice on the contact step. It never meant an Instagram business account or a licence.

Since you made the store page optional for every seller, I am changing my recommendation on links. They belong to the store page, so any seller who opens a store may add them, person or business. Opening a store is the seller's choice to be public, which is what I wanted the business switch to do.

Two limits stay:
- **Channel or page only:** a link to a personal chat, or a WhatsApp link, is a contact detail and stays behind sign-in.
- **Screening:** every link is screened when saved.

A seller without a store still has their ads listed under their alias, so a buyer can check them.

## Alias and web address

In the ledger they are the same name: the alias is the store address (REQ-008). I would keep one name. With two, a seller could be "abebe" on ads and "samsung_official" in the address, and both would need protecting.

So the one year applies to the alias shown on ads and the store page. When the alias changes, the address changes with it and the old address forwards to the new one.

## The @ in the address

"ethio.com/@gmail.com" cannot happen, because an alias cannot contain a dot. I am adding two rules so nothing close to it can either:
- **Email provider names** (gmail, yahoo, hotmail, outlook) go on the protected list.
- **Domain endings** such as _com, _net and _et are refused at the end of an alias.

Your other worry stands: the address will be printed on signs and said aloud, and "ethio.com/@abebe" can be read as an email address.

| Shape | For | Against |
|---|---|---|
| ethio.com/@abebe (decided in July) | Short; cannot collide with site pages; YouTube, TikTok and Medium use it | Reads like an email; awkward to say and type |
| ethio.com/abebe | Shortest and clearest | Every page name we ever add (help, deals, about) must be reserved in advance; a seller may already hold one |
| ethio.com/shop/abebe | Cannot collide with site pages; clear in print and speech | Five characters longer |

I recommend ethio.com/shop/abebe. It amends REQ-008, so it needs your yes.

## Recorded from your answers

- Previous alias shown for one year.
- Store page optional, for any seller.
- "ethio" refused in the alias and in the business name, including the Amharic spelling. Since you did not ask to allow "ethiopia", it is refused too, and so is ኢትዮጵያ in a business name.

**For you to confirm:** is the store address ethio.com/shop/abebe?

<!-- extractor: next part is from turn 1208, Fri 2026-10-02 20:33 New York -->

Yes, ethio.com/abebe can be made safe, and I now recommend it over both /shop/ and @. Telegram runs its names this way: t.me/name, with a fixed list of words kept for its own links.

## What can go wrong at the root

1. **A seller takes a word the site needs.** GitLab had this: "users" was a valid username and clashed with its own /users pages. A published security report shows the worse case, where a username equal to a page name made the real sign-in page unreachable.
2. **A seller name reads like a site function.** "ethio.com/login_verify" would look like our own page.
3. **Our own lists want the root.** The visibility plan calls for category-and-city pages, and a city such as "adama" could match a seller's name.

In our code today a seller can already take "account" or "settings". Neither is on the 32-word reserved list.

## The workaround

It separates seller names from site pages by shape, so nobody has to remember a list.

1. **Seller names:** 5 to 30 characters, letters, digits and underscore, starting with a letter. This is the rule you already agreed.
2. **Our own pages:** every page at the root is either shorter than 5 characters (/c, /api, /post), contains a hyphen (/help-center, /about-us), or is on the reserved list. A seller name can never be short or hyphenated, so the first two kinds need no reservation.
3. **Reserved list:** seeded now with a few hundred common site words (about, account, help, login, search, settings, terms and the like), kept in a table an admin can extend.
4. **Automatic check:** the build fails if anyone adds a root page that could also be a seller name and is not on the list. A nightly check confirms no seller holds a reserved word.
5. **Our pages win:** if a clash ever slipped through, the site's page shows, not the seller's. Lovable has to confirm how the router orders this when it is built.
6. **Function words refused:** login, verify, password, payment and similar cannot be used in a seller name.
7. **Lists stay under /c/:** category-and-city pages become ethio.com/c/cars/addis-ababa, never ethio.com/adama. Place names are also refused as a whole seller name, like category names.

The one lasting cost is that if we later want a single-word page and a seller already holds that word, we name the page with a hyphen instead of taking the seller's name.

Other sites: GitHub uses root names with a reserved list. YouTube's @ was introduced to make mentioning channels easier, per its announcement.

## Country endings as we expand

Nothing to maintain by hand, and I am narrowing the rule I gave earlier.

- **Endings:** country codes come from the site's own country list, which grows as markets are added. Two-letter codes are also everyday words (me, us, it, my), so an ending is refused only after a protected name. "telebirr_et" and "gmail_com" are refused; "abebe_et" and "made_by_us" are allowed.
- **Country names:** refused as a whole seller name ("kenya") and allowed inside a longer one ("abebe_kenya"). Anything containing "ethio" remains the exception, as you ruled.

## For you to confirm

Is the store address ethio.com/abebe, with the rules above? It replaces the July decision for ethio.com/@abebe in REQ-008.

Sources:
- [GitLab: "users" is a valid username and conflicts with a route](https://gitlab.com/gitlab-org/gitlab-foss/-/issues/29126)
- [Logical flaw resulting in path hijacking](https://infosecwriteups.com/logical-flaw-resulting-path-hijacking-dd4d1e1e832f)
- [Telegram deep links: reserved path words](https://core.telegram.org/api/links)
- [GitHub: about reserved usernames](https://docs.github.com/en/enterprise-server@3.18/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/about-reserved-usernames-for-github-enterprise-server)
- [YouTube handles announcement (Variety)](https://au.variety.com/2022/digital/news/youtube-handles-rollout-creators-6273/)
- [Disallowed usernames list](https://github.com/abaron/disallowed-usernames)

<!-- extractor: next part is from turn 1210, Fri 2026-10-02 20:45 New York -->

It does not affect performance in any way that matters, and the usability costs are small, so it is saved as the agreed rule. Aliases cannot contain "ethio", as you restated. None of this is built or measured yet; the points below are from reading the code and the design.

## Performance

- **Opening a seller page:** one lookup by name, and the index for it already exists. The cost is the same whichever address shape we had chosen.
- **Wrong addresses:** anything with a dot, hyphen or slash is rejected by its shape with no database work. That covers what bots probe for. An unknown name-shaped address costs one or two lookups.
- **Checking a name:** a handful of lookups, and only when a seller sets or changes the name. The existing brand-imitation check remains the slowest part.
- **Showing a number:** one small server call per tap. The ad page gets lighter, because contact details are no longer sent with it.

## Usability

1. **Buyers:** sign-in plus one tap to see a number. You accepted this cost.
2. **More names refused:** the "ethio" rule will be the most common refusal, since Ethio-something is a popular shop name. The refusal message must say why, and three suggestions to tap must follow. Today's message is generic.
3. **Typos:** with one change per 30 days, a typo would stick. I am adding one free correction within 24 hours of a change.
4. **False refusals:** words like "admin" are matched as whole words or at the start or end of a name, not inside another word. Otherwise "badminton_shop" would be refused.
5. **Underscore:** it is hard to say aloud and disappears under a link's underline. Suggestions will prefer names without it ("abebephones"), though it remains allowed.
6. **Short names:** names under five letters (Abel, Sara) are refused, and the suggestions cover it.

One convenience: the name shape is the same one our code accepts for a Telegram handle, so a seller can use the same name in both places.

## Where it is saved

It is saved in the project memory now. It enters the repo ledger with the next brief Lovable receives after bundle 2, as three decisions that amend REQ-007 and REQ-008: contact visibility, alias rules, and the store page and address. Nothing goes to Lovable while it is mid-task.
