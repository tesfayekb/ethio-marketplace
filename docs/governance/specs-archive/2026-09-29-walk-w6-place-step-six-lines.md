Source: supervisor thread, turn 967, Tue 2026-09-29 17:26 New York.
Status at 2026-10-05: walked by the operator on 2026-09-29 (turn 968/969: 'Walk steps 1–6 all passed'); CI re-run passed on d662a91 and main was promoted; W6 closed; the place step has since been rebuilt (W6b-1, W6b-2, bundle 2), so these lines describe a superseded screen.
Related: W6, W6-R, INC-342 (5,000 description limit), coverage plan 1/1/1.

**W6 passes on my side, but the CI record on dev is still red.** CI last ran on `d662a91` before you applied the file to staging, so its pre-check failed. Lovable's green run was local and made no new commit, so CI hasn't re-run. W6 closes when a CI re-run passes and your walk passes.

**What I checked on the new code:**
- Every file is within W6's scope.
- The fixed one-city limit is gone; the step reads the plan's limits now.
- The server's "all places in one market" rule is retired.
- The description limit is 5,000 in the form and the server, tied together by a test.
- The six new texts exist in English and Amharic.
- Both migrations are recorded, and there are no secrets in the diff.
- Loose end: the old "All the places must be in one market" text is still in the translation files, unused. W6b removes it.

**"Listing not found" count:** that rule is judged on CI runs, not local ones, and CI's last count was 4. The re-run will show whether it's back above 5. If it is, the tracing work goes into the CI turn after W6b.

**Your steps:**
1. **Re-run CI:** open [run 36630568746](https://github.com/tesfayekb/ethio-marketplace/actions/runs/36630568746), click **Re-run all jobs**, and wait about 15 minutes. No log pasting needed; I read the result from the repo.
2. **Publish** in Lovable.
3. **Walk the place step** on the published site, at 360 width first, then 1280:
   1. Start a post and reach the place step. If a city is already filled in, there's no asterisk or red border, and Next goes through.
   2. Clear the city so only a region is chosen. The asterisk and light red border appear. Press Next: the page scrolls up to the place box, label visible, and says "Choose a city."
   3. Choose a city. The mark and border disappear. For Addis Ababa, "All of Addis Ababa" and its sub-cities are offered; the sub-city is optional.
   4. There are **no** "Add a city / Add a region / Add a country" buttons, because the free plan allows 1 city, 1 region and 1 country.
   5. Go on to the price step, then Back to the place step. Your city is still there.
   6. On the Details step, the description counter shows a maximum of **5,000**.
4. **Tell me** the walk results. I'll confirm CI from the repo and then send the W6b prompt (item-location marker, map, shop/office location).

Optional, and your decision: if you want sellers to show a post in more than one city or region for free now, raise the free plan's numbers in Admin › Locations › Coverage. That's also how you'd see the nested "Add" buttons. Otherwise leave it at 1/1/1.

The Batch 1 import is still waiting for the curator's corrected definitions file. When it comes, import it with the same links file.
