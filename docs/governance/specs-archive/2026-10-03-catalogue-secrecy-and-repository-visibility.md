Source: supervisor thread, turn 1256, 1258, Sat 2026-10-03 16:22 New York.
Status at 2026-10-04: ruled by the operator on 2026-10-03 16:34: "I dont want cost to rise while we are still building ... best to hold on that until launch" — recorded as DEC-116 (repository private at launch; attach the repository to the supervisor's session and test access first); the catalogue lock, the signed-in posting form, the public-surface CI guard and robots.txt were built in bundle 3; the alert on unusual reading and the executor's report on a bot filter were promised and not delivered.
Related: DEC-116, INC-397, INC-398, bundle 3 Part A.

Yes, we can make it hard. Today the catalogue is wide open, and the biggest leak is the GitHub repository, which is public.

## What is open today

1. **The GitHub repository is public.** Anyone can read all the code, 218 database files (82 of them insert category and attribute rows), every spec, every brief and every incident note, including notes on security holes not yet fixed. GitHub shows 0 forks and 0 stars, but anonymous copies are not counted.
2. **The database hands out the catalogue.** With the public key that sits in the site's own code, anyone can download the full attribute and link tables in a few requests, with no account. The app itself never reads those two tables directly, so closing them costs the product nothing.
3. **The posting form for any category is served without sign-in**, although posting itself requires sign-in.
4. **robots.txt invites every crawler**, AI crawlers included.

## What I will add to the next bundle's security part

- Close direct reading of the attribute and link tables, and serve the category list through one door that returns only what the menu shows.
- Give the posting form to signed-in accounts only, with a per-account limit and an alert when one account opens an unusual number of categories in a day.
- Add a CI guard so that any new table or function opened to the public fails unless it is on an approved list.
- Change robots.txt to refuse AI crawlers and all crawling of the data routes; Google and Bing stay allowed.
- Have Lovable report whether a bot filter can sit in front of the published site.

## The limit

What the site shows cannot be fully secret. Category names, filters and the specification table on a listing must be visible to buyers and to Google, and a patient person with an account can copy a form one category at a time, as we did with Jiji. These steps stop the quick, complete download and make slow copying visible. The finder words, the reserved names, the screening rules, the specs and the code are never shown and can stay fully private.

## Your decision: make the repository private?

I recommend yes, before the next brief goes to Lovable, because that brief describes two open security holes and Lovable saves it into the repository.

- **Cost:** CI stops being free. My estimate is $300–600 a month at the current pace (about 160 machine-minutes per run at $0.006, and 36 completed runs in the last three days). The first real bill replaces this estimate. A machine of our own would cut this later; that is a separate decision.
- **My access:** I read the repository as a public visitor today. Once it is private, this session needs access through its GitHub connection.

If yes, after CI on the current commit finishes and while Lovable is idle:

1. Give this Claude session access to `tesfayekb/ethio-marketplace` through its GitHub connection.
2. In GitHub: Settings → General → Danger Zone → Change visibility → Private.
3. Tell me. I test my access at once; if it fails, switch back to Public (it is reversible) and we sort out access first.

CI on the last commit (`befaca37`, pushed 20:11 UTC) was still running when I checked at 20:26 UTC.

Sources:
- [Actions runner pricing — GitHub Docs](https://docs.github.com/en/billing/reference/actions-runner-pricing)
- [GitHub Actions billing — GitHub Docs](https://docs.github.com/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
- [Update to GitHub Actions pricing — GitHub Changelog](https://github.blog/changelog/2025-12-16-coming-soon-simpler-pricing-and-a-better-experience-for-github-actions/)

<!-- extractor: next part is from turn 1258, Sat 2026-10-03 16:34 New York -->

**Do not switch GitHub to private now.** I tested: the connection is signed in to your GitHub account and is not rate limited (15,000 calls available, 0 used), but this repository is not attached to this session, so every request for it is refused. I can read it today only because it is public. If you switch it to private now, I lose all reading of code and CI.

I cannot attach the repository from inside this session. Before launch we attach it first, I test, and only then you switch.

## Recorded: public while building, private at launch

Agreed, and it goes on the launch checklist. The CI cost question (GitHub's machines or one of our own) is decided then.

## What makes it difficult now, at no cost

These go into the next bundle's security part, built first:

- The attribute and link tables close to outsiders; today anyone can download them whole.
- The posting form is served to signed-in accounts only, with a per-account limit and an alert on unusual reading.
- A CI guard fails any new table or function opened to the public without approval.
- robots.txt refuses AI crawlers and all crawling of the data routes; Google and Bing stay allowed.
- For launch: ethio.com sits in your Cloudflare account, and Cloudflare can refuse AI bots once the domain points at the new app. Lovable will report whether the published site can sit behind it.

Because the repository stays public, notes on the open security holes go into it only after the fixes are live.

As far as I can tell, the curator's 19 batches were loaded through the admin screen and are not in the repository; I found no batch files in it. It holds the early seed rows and the rules, so after the lock an outsider cannot get the current catalogue from either place.
