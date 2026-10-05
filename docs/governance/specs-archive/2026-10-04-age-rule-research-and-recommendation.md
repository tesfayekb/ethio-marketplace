Source: supervisor thread, turn 1339, Sun 2026-10-04 16:40 New York.
Status at 2026-10-04: approved by the operator on 2026-10-04 16:50 with his words "agree with your recommendations. please proceed as suggested"; recorded as DEC-128; item 6 (a lawyer's read before launch) was withdrawn by the supervisor in turn 1341 in favour of the standing ruling (counsel review waits for the Ethiopia-entity milestone and does not block launch); not built.
Related: DEC-128, Q-018, REQ-034, REQ-035, REQ-026, REQ-028.

No, nothing in the system restricts age today, and you don't need to ask for a date of birth to let someone post. The normal practice is an "18 or older" rule in the terms plus a confirmation at sign-up. I'm not a lawyer; this is what the code and today's reading of the sources show.

## What the app has today
- No age rule, no date-of-birth field, and no confirmation at sign-up.
- No Terms or Privacy page. The footer shows the two words, but there are no pages behind them.
- Nothing about terms, privacy or age is on the launch checklist.

## How other marketplaces handle it
From the terms pages of eleven marketplaces, read today:
- **Minimum age:** eight set 18 (eBay, Facebook Marketplace, Gumtree, Etsy, Vinted, OLX, Jiji, Dubizzle). OfferUp sets 16. Craigslist and Kijiji state no number.
- **Minors:** five allow under-18s only under a parent's account or supervision. Jiji Ethiopia is one of them.
- **Date of birth:** none of the pages read shows it at basic sign-up. It appears only for payment onboarding (eBay, Gumtree) or optional or triggered checks (Vinted, Dubizzle's badge).
- **Checking:** only Vinted describes a document-based age check; the rest rely on the user's own declaration.

Facebook's help pages could not be read, so its sign-up details are unverified.

## The legal picture
Two separate things are in play.

**Contracts.** Someone under 18 generally cannot be bound by your terms; in Ethiopia a minor is under 18 and cannot perform legal acts alone. This is why sites say 18+.

**Children's data.**

| Market | What the rule says |
|---|---|
| US | The children's privacy law applies only if a site is aimed at children or actually knows a user is under 13. A general site need not investigate ages. |
| EU | The platform rules do not oblige you to collect extra data to find out who is a minor, and small companies are exempt from those sections. Age checks are expected for alcohol, tobacco, adult content and gambling, all of which you ban. |
| UK | A listings site with messaging is covered by the Online Safety Act. You must write a "children's access assessment" within three months of launch. An 18+ line in the terms does not settle it. |
| Ethiopia | The 2024 data law treats under-16s as minors, needs a parent's consent for their data, and asks for "reasonable efforts to verify the age". |
| Kenya | Under-18 data needs a parent's consent and "appropriate mechanisms for age verification", scaled to risk. |
| South Africa | Under-18 data needs consent from a parent or guardian. |
| UAE | A child digital safety law came into force in January 2026 with a one-year grace period. It names online marketplaces and asks for "effective and reasonable" age verification by risk class. I could not confirm the risk classes have been issued. |
| Australia | The under-16 social media rule is not aimed at marketplaces. |

No law found in any of your open markets requires collecting a date of birth as such.

## What I recommend
1. **Rule:** you must be 18 or older to hold an account, post or message.
2. **At sign-up:** one required tick, "I am 18 or older and agree to the Terms and Privacy Policy", stored with its time. Existing accounts confirm once at their next sign-in.
3. **No date of birth.** It is personal data you would have to protect, no peer asks for it at sign-up, and once you collect it you know which users are minors and must act on each one. Ask for it only if paid features bring identity checks later.
4. **Underage reports:** a report reason for "appears to be under 18", and an admin action that closes the account.
5. **Terms and Privacy pages:** they have to exist anyway; the new publish line already refers to "the rules of ethio.com".
6. **Before launch:** a lawyer's read, especially on the UAE law and on whether a self-declaration meets Ethiopia's and Kenya's "reasonable efforts" wording. For the UK, I can draft the access assessment.

This is not part of the current bundle. If you say "go 18+", I'll put items 1 to 6 on the launch checklist in this bundle's docs step and spec the sign-up tick and the two pages as a small task right after it.

Sources:
- [eBay User Agreement](https://www.ebay.com/help/policies/member-behaviour-policies/user-agreement?id=4259)
- [Gumtree terms of use](https://www.gumtree.com/termsofuse)
- [Jiji Ethiopia rules](https://jiji.com.et/rules.html)
- [Vinted age verification](https://www.vinted.co.uk/help/1057)
- [OfferUp terms](https://offerup.com/terms)
- [FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)
- [Ofcom: children's access assessments](https://www.ofcom.org.uk/online-safety/information-for-industry/guide-for-services/quick-guide-to-childrens-access-assessments)
- [EU Digital Services Act, Article 28](https://www.eu-digital-services-act.com/Digital_Services_Act_Article_28.html)
- [EU guidelines on protection of minors (2025)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:C_202505519)
- [Ethiopia Personal Data Protection Proclamation 1321/2024](https://www.metaappz.com/References/ethiopian_laws/federal/pr_1321_2024/en/txt)
- [Kenya Data Protection Act 2019](https://www.odpc.go.ke/wp-content/uploads/2024/02/TheDataProtectionAct__No24of2019.pdf)
- [South Africa POPIA, section 34](https://popia.co.za/section-34-prohibition-on-processing-personal-information-of-children/)
- [UAE Child Digital Safety Law (Hogan Lovells)](https://hlc.com/en/publications/uae-introduces-new-child-digital-safety-law-what-online-platforms-need-to-know)
- [Australia eSafety: social media age restrictions](https://esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions/assessment)
