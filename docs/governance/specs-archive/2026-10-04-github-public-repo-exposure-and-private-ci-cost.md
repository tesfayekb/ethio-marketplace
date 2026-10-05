Source: supervisor thread, turn 1326, 1328, 1330, Sun 2026-10-04 13:54 New York.
Status at 2026-10-04: information for the operator; his ruling stands that the repository stays public while building and goes private at launch (DEC-116); the offers to add an "all rights reserved" notice file ("add the notice") and to spec full CI only on the last push of each executor turn were not answered.
Related: DEC-116, G22 (CI is a closed surface).

**Short answer:** nothing public shows anyone copying it: the repository page shows 0 forks, 0 stars and 0 watchers right now. A plain download leaves no public trace, though, so only you can see that side, and a copy would give someone your code and design but not your data, keys or domain.

## How to see who has looked

1. Open the repository on GitHub, then **Insights → Traffic**.
2. Read **Unique visitors** and **Referring sites** for the last 14 days. Visitors other than you mean someone opened the pages; a referring site you don't recognise means it is linked from somewhere.
3. Ignore the clone counts. Every CI run, Lovable, and my own verification downloads all count as clones, so that number will be large and tells you nothing.

GitHub never tells you who a visitor or cloner was, only how many.

## What a copy gives someone

- **All the code and its full history:** 887 files, about 6,100 commits.
- **The database structure and security rules:** every migration is in there.
- **Your internal documents:** the specs, the briefs, the moderation design, the September security scan, and the reserved-names list.

## What it does not give them

- **Your data.** Users, listings and the live catalogue are in Supabase, not in the repository.
- **Your keys.** I swept the whole history for key-shaped strings and found none. The one tracked settings file holds only the publishable key, which every visitor's browser receives anyway.
- **Any control.** Nobody can change your repository, touch your database, or deploy to ethio.com.

## What they could do with it

- **Stand up their own copy** with their own database and name. There is no licence file, which by default means all rights reserved: public on GitHub lets people read it, not reuse it. I'm not a lawyer, and in practice enforcement is a takedown request, not prevention.
- **Study the security rules for a weak spot.** This is the risk that matters more. The rules are built not to rely on secrecy, but reading them makes a hole easier to find.
- **Learn how to get past moderation.** The moderation design and reserved-names list show what is screened.

## What going private later will and won't fix

Going private stops new copies. It does not recall copies already downloaded, and any fork made while public stays public (there are none today). So the exposure grows with every week it stays public, and matters most once real users exist.

## What I'd do

Keep your decision: public while building, private at launch, with the access test first. If you want, I can also have Lovable add a short "all rights reserved, no permission granted" notice file in the docs step at the end of this bundle. It changes nothing legally but removes any doubt for a reader; say "add the notice" and I'll include it.

I could not read GitHub's own fork list or API from this session, so the zero comes from the repository's public page.

<!-- extractor: next part is from turn 1328, Sun 2026-10-04 14:03 New York -->

Nothing in these numbers points to an outsider. The clone figures are your own CI, and the visitors are you and me.

- **10,040 clones:** this matches CI almost exactly. The repository had about 1,085 pushes in that window, and each push starts a run that downloads the code roughly 9 times across its jobs before finishing or being cancelled (about 20 when a run completes), which comes to about 10,000.
- **1,043 unique cloners:** about one per push. CI jobs run on GitHub's shared machines, which come from a large pool of addresses, so they are counted as many different "cloners".
- **6 unique visitors, 379 views:** every page in the popular list is a CI run page under `/actions`. That is you checking runs, plus my sessions reading run pages when I verify a result. No code page appears in the list at all.
- **Referring sites:** only github.com. Nothing links to the repository from outside, and no search engine sent anyone.

A single quiet download by a stranger would be invisible among a thousand CI machines, so this cannot prove nobody has a copy. What it shows is that nobody is browsing the code on the site, linking to it, or forking it.

While it stays public, these are the signs worth a glance every week or two:
- forks, stars or watchers above zero;
- a referring site other than github.com;
- pages starting with `/blob` or `/tree` in the popular list, which would mean someone reading the code in a browser.

<!-- extractor: next part is from turn 1330, Sun 2026-10-04 14:05 New York -->

No. On a public repository anyone can download the code, and GitHub has no setting that limits that. Forking cannot be switched off for a public repository either. The only thing that stops strangers is making the repository private.

What private would cost you, since that is why it is public today:

- **Free allowance:** a private repository on the Free plan gets 2,000 CI minutes a month (3,000 on Pro). Public repositories pay nothing.
- **Your usage:** my estimate from the commit counts is 50,000 to 100,000 minutes a month at the current push rate, so roughly $300 to $600 a month at GitHub's $0.006 per minute. This is an estimate, not a measured figure.
- **Why so high:** every small push Lovable makes mid-turn starts a full run, and most are cancelled part-way. About 1,085 pushes in two weeks produced only around 150 finished runs.

There are two ways to go private without that bill; both change the CI setup, so they are their own task, not something to slip into the current bundle:

1. **Run CI on your own machine.** GitHub does not charge for runs on a machine you provide; a planned fee for this was postponed. It needs a computer or small server that stays on.
2. **Run the full suite less often.** If CI ran only on the last push of each Lovable turn, usage would fall by a large factor, possibly close to the free allowance. I have not measured how close.

My recommendation stays as you decided: public until launch. If the exposure bothers you sooner, option 2 is the cheaper one to try, and I would spec it as its own task right after this bundle.

Sources:
- [GitHub Actions billing (GitHub Docs)](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [Update to GitHub Actions pricing (GitHub changelog)](https://github.blog/changelog/2025-12-16-coming-soon-simpler-pricing-and-a-better-experience-for-github-actions/)
