Source: supervisor thread, turn 1351, Sun 2026-10-04 17:51 New York.
Status at 2026-10-04: advice and L1 additions reported to the operator in answer to his message of 2026-10-04 17:51; he replied at 18:02 with the registered address and answers to the five proposals (not a ruling on the L1 additions as such); folded into the legal drafts v1 and into spec L1 (DEC-129); the social-channel posting feature is not specified; not built.
Related: DEC-129, L1, REQ-035, social-channel posting (spec not started).

The drafts are updated with your answers. Here is where each point stands, and my advice on the Georgia and Ethiopia questions. I'm not a lawyer.

**1. Legal name and address.** I could not open the current ethio.com from here (the connection timed out), so the drafts now say "Ethio.com LLC, a limited liability company organized in the State of Georgia, United States". I still need the registered address and the exact spelling of the name as registered.

On making it changeable: the operator's name, address and contact emails become settings in the admin's Legal section. Each published version freezes the values it went out with. Changing a setting creates a new version, so text that people already accepted never changes silently.

**2. Georgia, other states, and Ethiopia.**
- **Keep Georgia.** A company formed in Delaware or Wyoming but run from Georgia still has to register in Georgia as a foreign company, so you would pay and file in two states for no gain. Delaware mainly matters when you raise venture capital, and you can convert then.
- **Governing law.** The Terms now say Georgia law and courts in Georgia. Using the home state is the norm: Craigslist uses California, eBay uses Utah. eBay also requires arbitration; I have not added that, and it is one for the lawyer.
- **Ethiopia.** As far as I know, you do not need an Ethiopian company for people in Ethiopia to post on a free site run from the US. Jiji Ethiopia's own terms name a foreign company, Jiji Online Limited, under the law of Gibraltar.
- **When a local company is needed.** Doing business on the ground would require one: taking payments in Ethiopia, hiring staff or agents, opening an office, or registering with the data regulator to store data in the country. Your plan already places that at the Ethiopia-entity step, with a lawyer's review.
- **One risk to know.** Ethiopia's data law says data collected there should be stored there, and it can reach foreign operators. Your earlier ruling accepted launching on one database and adding the Ethiopia database later.

**3. The Ethiopia storage wording, clarified.** Your July notes say "Ethiopian users' data is stored in Ethiopia". That is the future design, and a privacy policy must describe what is true on the day it is published. So the launch version says data is stored in the United States, and that the policy will be updated before in-country storage starts. When the Ethiopia database goes live, you publish a new version.

**4. No sale, no advertiser sharing, no marketing email.** Confirmed in the draft.

**5. The three clauses, and social posting.** All three stay. The Terms now also give permission to show ads on ethio.com's own channels and pages on Telegram, Facebook, WhatsApp, Instagram and TikTok, as a condition of posting with no switch per ad. The Privacy Policy says the same.
- **Opt-out:** not required for the permission itself. In the EU and UK a person can still object or delete their ad, and you must act on that, so the draft says copies are removed when an ad ends where the other service allows.
- **My reading:** this means ethio.com's own channels, not the sellers' accounts. Your earlier ruling that sellers share to their own accounts themselves still stands. Correct me if you meant otherwise.
- **The feature itself** is not specified yet. Each service has its own rules on automated posting, which I'll check when we spec it.

**6. Automatic translation.** Added to the spec: each version is machine-translated into every site language, a translator can correct a translation without creating a new version, English is the binding text, and the page says when a translation is automatic. I'd still have you read the Amharic, since it is a primary language.

**Still needed from you:**
- The registered address and exact name spelling.
- A yes, or a different answer, on five proposals in the doc's table:
  - contact mailboxes legal@ethio.com and privacy@ethio.com;
  - Resend and Lovable as the named email and hosting providers;
  - a 100 US dollar liability limit;
  - messages kept as long as their ad;
  - 30 days to answer a data request.

Sources:
- [Craigslist terms of use](https://www.craigslist.org/about/terms.of.use.html)
- [eBay User Agreement](https://www.ebay.com/help/policies/member-behaviour-policies/user-agreement?id=4259)
- [Jiji Ethiopia rules](https://jiji.com.et/rules.html)
