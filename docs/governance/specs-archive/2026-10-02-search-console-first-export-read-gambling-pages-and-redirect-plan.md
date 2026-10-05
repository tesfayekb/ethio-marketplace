Source: supervisor thread, turn 1154, 1156, 1158 (turn 1154 gives the export steps; 1156 the reading; 1158 the close-out and reminder), Fri 2026-10-02 08:21 to Fri 2026-10-02 08:35 New York.
Status at 2026-10-05: the operator removed the four gambling-spam pages on 2026-10-02 and Search Console reported no security issue; the figures and launch-gate items were landed in docs/governance/visibility-plan.md section 3 and R9 (8fa761d4); the second export was scheduled for Monday 2026-10-05 08:36 New York (reminder set in the thread) and its comparison is still owed; the advice to change or delete the old site's former developer account is not confirmed done.
Related: visibility plan section 3, R9 redirects, launch gate, DEC-003 (invite old users), Search Console.

Click **Done**. You don't need Settings or a second verification method.

1. Click Done.
2. Leave the DNS record it added in Cloudflare where it is. Deleting it would remove the verification.
3. Open **Performance** in the left menu.
   - If it shows numbers: set the date range to the longest available, click **Export**, and send me the file.
   - If it says the data is still being processed: nothing more to do today. Check again in two or three days and export then.

Because ethio.com was only just added, the report may be empty or show very little. Google starts collecting for a property when it is first added, and its help page does not say whether earlier history appears. If it stays thin after a few days, tell me and we'll get the old site's top pages from Cloudflare's traffic report instead.

Do not submit a sitemap there yet; the new site doesn't have one until the browse phase.

Sources:
- [Add a website property to Search Console — Search Console Help](https://support.google.com/webmasters/answer/34592?hl=en)

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The old site gets very little from Google: about 15 visits a day, almost all from people typing the name. There is little search traffic to lose at the switch-over, but the file shows a problem on the old site that should be cleaned up now.

**What the file shows**
- **Period:** only 30 May to 18 June 2025 (20 days), with 306 visits and 25,230 appearances in results. Either Google is still filling in the rest for a property added minutes ago, or it stopped collecting after June 2025. A second export in a few days will tell.
- **Who:** 76% of visits from Ethiopia, 14% from the United States; 87% on phones.
- **What they typed:** the name. "ethio", "ethio com", "ethiopia com" and similar account for 97 of the 125 visits whose search term is recorded. The home page took 219 of the 306 visits.
- **What else got found:** business pages, not categories. Six of them (Qulubi International Mart, Selam Photo Studio, Ahadu Kitchen Appliance, Meskel Restaurant and Mart, Lion Insurance Tax Services, traditional cloth to order) drew 55 visits and 19,196 appearances, on searches like "ethiopian store near me". The 256 category pages together drew 16 visits.
- **Amharic:** searches such as «የመኪና ኢንሹራንስ» and «የግንባታ እቃዎች ለሽያጭ» already put the old site on Google's first or second page with almost no competition.

**The problem:** the old site carries four gambling pages (1xBet, 1win and two casino pages, in French, Spanish and English). That is the usual sign that someone else got into a WordPress site. I can't open the old site from here, so treat it as likely rather than proven. It matters because Google can mark the whole domain as spam, which would follow ethio.com to the new app.

**What this changes in the plan**
- **Shop pages move up.** They are what Google actually sent people to, so each business page needs the business type and city in its title. Those six businesses should be the first invited back.
- **Amharic category titles are worth doing**, as already planned.
- **Redirects at launch:**
  - The home page and its Amharic address carry over unchanged.
  - Old category and business pages get mapped to new ones.
  - Gambling and test pages are marked as gone, never redirected.

I've added this to the visibility notes going into the repo.

**Your steps**

In the old site's WordPress admin:
1. Posts → search "1xbet", then "1win", "jackpot", "gambling". Move what you find to Trash. Do the same under Pages.
2. Users → filter by Administrator → remove any you don't recognise.
3. Change your own admin password.

In Search Console:

4. Left menu → Security & Manual Actions → open both reports. Tell me if either shows anything other than "No issues detected".
5. In three days, export Performance again and send it.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

The reminder is set for Monday 5 October at 8:36 am your time, and it will arrive in this conversation.

With the gambling pages gone, that account unable to post, and Google reporting no issues, the old site needs nothing more from me.

One more step is worth doing on the old site, since a pending vendor can still log in: change that former developer account's password, or delete the account if nobody needs it.
