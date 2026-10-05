Source: supervisor thread, turn 1345, Sun 2026-10-04 17:11 New York.
Status at 2026-10-04: approved by the operator on 2026-10-04 17:25 with his words "12 or 6 months after deletion - best to make uniform for all 12 months instead of deviding per jerusdiction to make it simple for Deleted by the seller. other recomendation agree" — so the table's 6-month period for EU, UK, Norway and Switzerland is overruled: 12 months everywhere; recorded as DEC-130; not built (to be built with the My ads screens, after L1).
Related: DEC-130, L2, REQ-022, Q-012, DEC-129.

Approved and recorded. The accepted Terms and Privacy versions, with their times, will be stored on each user's profile as well as in the full history, and shown on the admin's user page.

On retention: no country I checked requires you to keep an ad after it is sold or deleted, so "a year or so" is your choice within privacy limits, not a legal minimum. I'm not a lawyer; this is what today's reading of the sources shows.

## What the law says
- **Keeping the ad itself:** no duty found in any of your open markets.
- **Keeping logs or identity:**
  - Ethiopia requires "service providers" to keep traffic logs (who, when, from where) for one year. This is not ad content, and whether a classifieds site counts as a service provider is unclear.
  - France requires hosts to keep the identity of who posted, with account data for one year after closure.
- **Keeping on official order:** authorities can order data preserved, for 30 days to six months depending on the country.
- **Reported child-abuse material:** kept one year in the US and UK.
- **The other direction:** privacy laws in the EU, UK, Ethiopia, Kenya and South Africa say keep data no longer than necessary. Keeping it for fraud checks and legal claims is accepted, but for a limited time. Claims can be brought for 3 to 15 years depending on the country; regulators do not accept keeping everything that long.

## What other marketplaces do
- **After sold:** most remove the ad from search at once. eBay keeps sold items findable for about 90 days; Kijiji shows "no longer available".
- **After deletion:** where a period is stated it is short: 50 days (Kleinanzeigen), 90 days (OLX Pakistan), 6 months (Vinted). Kleinanzeigen keeps data three years where fraud is suspected.

## What the app does today
Sold, expired and removed exist on the server, but nothing is ever erased except drafts, a sold ad has no time limit, and there is no "My ads" screen yet for a seller to mark sold or delete.

## What I propose

| Event | Public sees | Seller sees | Kept out of sight | Then |
|---|---|---|---|---|
| Marked sold or no longer available | Page stays 30 days with a ribbon, contact hidden, out of feeds and search | In My ads, can relist | Not applicable | Leaves public view; stays in My ads 12 months |
| Expired | Gone at once | In My ads, can relist, 12 months | Not applicable | Archived as a deleted ad |
| Deleted by the seller | Gone at once | Gone at once | 12 months; 6 months for sellers whose home country is in the EU, UK, Norway or Switzerland | Erased |
| Reported, enforced, or under an official request | As enforcement decides | As enforcement decides | Until the case closes, plus 3 years | Erased |
| Account closed | All ads gone | Not applicable | Same periods; account identity 12 months | Erased; a banned account keeps a minimal record |

How it works:
- **Periods are admin settings per country,** so a country's rule can change without a rebuild.
- **A hold flag** stops erasure for any ad or account under a report, dispute or official request.
- **A scheduled job erases** when the period ends, and records each run.
- **The archive is restricted.** Only staff with a specific permission can open it, and every view is audited.
- **The publishing certification** is kept and erased with its ad.
- **The Privacy Policy states these periods.**

For Ethiopia's one-year log rule, my cautious reading is to keep sign-in and posting event logs for 12 months for Ethiopia-based users. I've put it on the Ethiopia compliance list for the counsel step, and it is not built now.

This gets built with the My ads screens (sold, relist, renew, delete), not in the current bundle.

**Decision for you:** approve the periods (30 days with the ribbon, 12 months in My ads, 12 or 6 months after deletion, 3 years after a case closes), or give me different numbers.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Sources:
- [Ethiopia Computer Crime Proclamation 958/2016](https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/103967/ETH103967.pdf)
- [Ethiopia Personal Data Protection Proclamation 1321/2024](https://www.metaappz.com/References/ethiopian_laws/federal/pr_1321_2024/en/txt)
- [France décret 2021-1362](https://www.faceaurisque.com/base-reglementaire/decret-n2021-1362-du-20-octobre-2021-relatif-a-la-conservation-des-donnees-permettant-didentifier-toute-personne-ayant-contribue-a-la-creation-dun-contenu-mis-en-ligne-pris-en/)
- [GDPR Article 17](https://gdpr-info.eu/art-17-gdpr/)
- [ICO: storage limitation](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/)
- [EU Digital Services Act, Article 30](https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-30/)
- [18 U.S.C. 2703](https://www.law.cornell.edu/uscode/text/18/2703)
- [18 U.S.C. 2258A](https://www.law.cornell.edu/uscode/text/18/2258A)
- [UK SI 2026/268](https://www.legislation.gov.uk/uksi/2026/268/made)
- [Kenya Data Protection Act 2019](https://www.odpc.go.ke/wp-content/uploads/2024/02/TheDataProtectionAct__No24of2019.pdf)
- [South Africa Cybercrimes Act s.41](https://www.acts.co.za/cybercrimes-act-2020/41__expedited_preservation_of_dat)
- [Kleinanzeigen privacy notice](https://themen.kleinanzeigen.de/datenschutzerklaerung/)
- [Vinted help: deleted data](https://www.vinted.co.uk/help/3/60)
- [Kijiji: marking sold](https://community.kijiji.ca/t/how-to-mark-kijiji-listings-as-sold/148)
- [eBay: finding sold items](https://www.ebay.ie/help/selling/listings/finding-sold-items?id=4108)
