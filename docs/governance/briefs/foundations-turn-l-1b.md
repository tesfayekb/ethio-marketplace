# Foundations turn L-1, continued — ruling (saved exactly; sha256 ace907a679c4c1c3eae89a27bd270824958b17fba656e9b2ad5e0a7c93c85025)

````text
RULING — Foundations turn L-1, continued: finish what the platform's time limit cut, and fix the red the mid-turn push left. Base: dev fb0fa384. Saved as docs/governance/briefs/foundations-turn-l-1b.md.

VERIFIED SO FAR (dev fb0fa384): step 0's sha256 matches (bc1fde08…). A1 and A2 are done (the excerpt script, SXC-1…4, the "shape from source" sample). B1–B4 and B6 are done. FMT-1…8 and LCL-1…3 pass. No English text changed. Not yet judged: CI is red on this push (below).

RULINGS ON YOUR REPORT
1. B3's departure is ACCEPTED: the three e2e tests that check a country or currency code's shape (my-listings-ad, post-wizard-resets, posting-routes) are allowlisted as independent oracles.
2. "until: never" is not written as 2099-12-31: a date that never comes defeats the expiry. Each never-ending line takes the review date 2027-04-30, the same review horizon as the seller-names allowlist. On that date it is read again, and renewed with its reason or removed.
3. CF-FMT-2, the separate id for the planted proof, is accepted.
4. Your K2 on Intl.Collator and Intl.DisplayNames, and name-collator.ts's literal "en", is the same concern: a locale-sensitive Intl API takes its locale from formatLocale.
   - It is NOT in this continuation. It opens turn L-2, before the page heads.
   - The six DisplayNames region-name sites (legal-kinds.ts :64, legal-document-page.tsx :41 and :130, listing-page.tsx :884, wizard.tsx :423, calling-codes.ts :120) go onto one country-name formatter.
   - The reader-order collators (place-order.ts, name-collator.ts, the localeCompare(…, language) sites) go onto one collator.
   - CF-FMT-1 widens to them.
   - Machine-order sorts of ids and codes stay as they are.

CI FIRST — run 40914761197 on fb0fa384 (your mid-turn push; PLATFORM-ORIGIN), FAILURE:
- Component tests: scripts/ci/start-failure-excerpt.test.ts cannot open scripts/ci/fixtures/start-failure-cli.log (ENOENT on CI). The fixture is not on dev. Commit it, and paste `git ls-files scripts/ci/fixtures` (G20).
- The i18n used-on map is stale ("scanned" 616 → 618): run i18n:usage and commit both maps.
- The first-paint budget is red. A new chunk, format-*.js (0.8 KiB), is in the first-paint closure, and the evidence's tail did not name the page lines.
  - Measure with `bun run checks`.
  - If a first-paint screen formats a date or a number, the formatter is on the first paint by right. Raise each affected line to its next whole KiB, with that cause.
  - Otherwise keep format.ts off the first paint the way INC-864 keeps reader-failure lazy.
  - A page whose growth you cannot explain is a STOP (G60).

THEN FINISH L-1
- B5: LF-E1 (e2e/locale-format.spec.ts), an Amharic account sees a full Amharic month on My listings. Run it whole, both projects, 0 retries.
- The whole unit suite, with its count.
- `bun run checks`, its last line pasted, with the NEAR band raised in this turn with its cause.
- Run e2e/i18n-coverage.spec.ts whole again, both projects, 0 retries (still owed from CI-2).
- The turn report, docs/governance/reports/foundations-turn-l-1.report.md.

Push, and END THE TURN with the report:
- the CI line;
- step 0's sha256 for this file;
- each item above, done or not;
- the unit count;
- the checks' last line;
- the files from git diff --name-only e65a78e7.
````
