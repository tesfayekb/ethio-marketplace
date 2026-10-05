Source: supervisor thread, turn 1148, 1150 (turn 1148 is the research answer; turn 1150 the model agreed after the operator narrowed it), Fri 2026-10-02 07:43 to Fri 2026-10-02 07:50 New York.
Status at 2026-10-05: the operator narrowed the model on 2026-10-02 07:50 (sellers share their own listings; ethio.com posts automatically only on its own channels; never into anyone else's account); recorded in the repo as docs/governance/visibility-plan.md section 1 (landed 8fa761d4) and as ACT-G1/ACT-G2 in docs/tracking/action-tracker.md; nothing built — the share buttons wait for the public listing page (U7), the bot channels after that.
Related: visibility plan, ACT-G1, ACT-G2, REQ-021, U7, Meta app review, market census (Telegram channel counts).

Yes, this can be built, and the census supports it: sellers are already advertising on Telegram at scale (60 general-store channels with 1.3 million subscribers, 65 clothing channels with 1.1 million). What each platform allows differs a lot, though.

| Platform | Share button (seller taps, picks where it goes) | Automatic posting by us |
|---|---|---|
| Telegram | Yes, easy | Yes: a channel owner adds our bot as an admin, and the bot posts each listing with photo, price and a "View on ethio.com" button |
| WhatsApp | Yes, easy (chats, groups, Status) | No |
| Facebook | Yes, easy (timeline, groups, Messenger) | Only to a Facebook Page the seller manages, and only after Meta reviews and approves our app. Posting to personal profiles and to groups is closed to outside apps |
| Instagram | No link sharing worth having | Business accounts only, after the same Meta review |
| YouTube / TikTok | No | Video only, so not a fit for listings now |

**The order I would build it in**
1. **A share step at the end of posting**, and a share button on every listing: Telegram, WhatsApp, Facebook, copy link. The shared link shows the photo, title, price and city as a preview card. This needs no approval from anyone.
2. **ethio.com's own Telegram channels**, by category and city (Cars, Houses, Phones in Addis). Our bot posts every approved listing automatically, so we build our own audience there.
3. **"Connect my Telegram channel"** for sellers who have one. Their listings then post to their own channel automatically, each linking back to us.
4. **Facebook Page and Instagram auto-posting**, later, because Meta's review takes time.

**Three things to know**
- **The public listing page comes first.** Today the app has the posting form and its preview, but no public page for a finished listing, so there is nothing to link to yet. The same page is what Google will land on.
- **Only screened listings go out.** A listing is shared after it passes screening. When it sells or is removed, the bot should mark the Telegram post as sold.
- **Other people's channels need their owner's consent.** We cannot post into a third-party channel unless its owner adds our bot. That makes channel owners possible partners rather than something we can do unilaterally.

**The reverse direction may be worth more at launch:** a seller forwards a post from their existing Telegram channel to our bot, and it becomes a draft listing with the photos and text already filled in. That brings in inventory from people who already sell on Telegram.

None of this is in the current queue. I have noted it as a growth item to spec once the listing wizard is finished; step 1 fits naturally with the public listing page.

Sources:
- [Meta removes Facebook Groups API, disrupts social media scheduling](https://techpoint.africa/2024/02/06/meta-facebook-disrupts-scheduling)
- [Meta suddenly abolishes third-party access to Facebook groups](https://www.gigazine.net/gsc_news/en/20240206-meta-cuts-third-party-access-facebook-groups)

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

Agreed, and that is the simpler model: sellers post and remove their own shares, and we post automatically only on accounts we own. I've dropped the two parts that touched anyone else's account (posting into a seller's connected channel, and partnering with channel owners).

**What the seller does**
- At the end of posting, and on every listing, there are share buttons for Telegram, WhatsApp and Facebook, plus copy link.
- The seller taps, picks the chat or group, and sends it. It goes out under their own name, and they delete it themselves whenever they want.
- If the listing later sells, an old share still works for us: the link lands on our page, which says it is sold and shows similar listings.

**What we do on our own accounts**
- ethio.com runs its own Telegram channels by product and city (Cars, Houses, Phones and so on).
- Our bot posts every approved listing to the matching channel, and marks or removes the post when the listing sells or is taken down.

**One limit on "guide them to the right channel"**
- On Telegram, only a channel's admins can post in it. A seller can post in groups, in their own channel and to their contacts, but not in someone else's channel.
- So the guidance we can honestly give is: "Your ad is also in our ethio.com Cars channel — join it and forward it to your groups."
- I would not publish a list of other people's groups to post in. Each has its own rules, and sending our sellers there would look like spam to their admins.

This stays noted as a growth item for after the listing wizard; the share buttons come with the public listing page, then our own channels.
