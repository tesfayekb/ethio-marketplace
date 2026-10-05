Source: supervisor thread, turn 1029, Wed 2026-09-30 22:56 New York.
Status at 2026-10-05: DEC-094 ruled by the supervisor 2026-09-30 22:56 after the operator's walk comment; Part T's engine (the {country} token, resolver, import gate, finder) was built in bundle 4 Part G (turns 1366 to 1373, dev 0fc968e4 / 24d401f5, 2026-10-05) — not as this prompt; the AGENTS.md line T2 was never added; the curator's DEC-094 census (c27-dec094-market-wording-census-2026-09-30.csv) and token rows wait for the conversion; the repo holds the {country} behaviour in docs/features/attributes.md and posting.md and the bundle-4 brief, not this text.
Related: DEC-094, Part T (T1 to T3), INC-365, PW-106 (later renumbered), bundle 4 Part G, CI-T2 (28 fast-refresh warnings parked).

CI is red only because Lovable didn't regenerate the i18n usage maps after moving the shell code into a new file (`shell-context.ts`). Its own rules already require that step on every code change. All tests passed, and no new side branches appeared. The prompt below fixes it first and then continues the queue.

**Your walk comments:**
- **Renting a shirt:** agreed, it shouldn't be offered. The curator will show Sale or Rent only for clothes people actually rent (suits, dresses, traditional wear). It will check the 9 equipment categories that offer Hire the same way.
- **Ethiopia-specific wording:** these texts live in the catalogue data, not the code, but they'd still have to be found and rewritten for each new country. I decided on a fix (DEC-094): a `{country}` placeholder that shows the listing's own country name. Your rule is now recorded:
  - in the repo file every coding agent reads (`AGENTS.md`, via the prompt below);
  - in the curator's rules;
  - in the project decisions.

  About 12 catalogue questions carry Ethiopia-specific wording; the app's own screen text is already clean.
- **«እዚሁ የተሰራ» vs «የኢትዮጵያ ምርት»:** right, it's a duplicate for Ethiopian sellers. Under DEC-094, "Made in" becomes two answers: "Made in {country}" (in Ethiopia that shows as «የኢትዮጵያ ምርት», for a Kenyan seller "Made in Kenya") and "Imported". The third answer goes away.
- **Apple Watch:** it isn't Automatic. A digital watch such as a Casio runs on a battery, so it's Quartz. An Apple Watch is a smartwatch and belongs in Electronics › Phones & Tablets › Smartwatches & Wearables. The curator will add "digital" to Quartz and point smartwatches there.

1. Send this to Lovable:

---
```
CI red on 2a466705 — "i18n used-on map is fresh" (guards-last-failure.md). Moving useShell into src/components/shell-context.ts changed which routes reach the shell keys, and the two maps were not regenerated. Knowledge A6 already requires `bun run i18n:usage` and both maps on every src-touching landing; name the miss in your report.

PART 0 — fix the red first (INC-365).
- Run `bun run i18n:usage`; commit docs/generated/i18n-usage.json and public/i18n-usage.json; confirm `bun run i18n:map-guard` passes.
- The shell-context move went outside last turn's scope; it is accepted as behaviour-neutral and recorded. Run the whole-project lint once now and report the count (expected: 0 errors, 28 warnings). The 28 older fast-refresh warnings go to CI-T2; do not touch them in this turn.

Then continue at PW-102 in the queued order. One new part joins the queue after S2/S3: PW-102/PW-103 + N1 census → N2 → S1 → D + L + M → S2/S3 → T → A → B → C → E census → full DEC-023 run.

PART T — DEC-094, market-relative catalogue text (operator walk 2026-10-01; ruled now).
T1 — census first, with file:line: where the draft holds its market on step 3, and every place catalogue text renders (definition labels, option labels, helps: form, review, preview, listing page and card, filters, admin).
T2 — add this line to AGENTS.md under the project constitution, verbatim:
"MARKET-NEUTRAL WORDING (DEC-094): UI strings and catalogue text (labels, options, helps) never name Ethiopia or any one country where the statement depends on the seller's or buyer's market; write it with the {country} token. Product and cultural facts (teff, the Ethiopian calendar, a brand's name) are not market statements."
T3 — the engine. Catalogue text may carry {country} in definition labels, option labels and helps, in every language. One resolver (B2) replaces it with the market's country name in the UI language; census its source (the market's anchor location row or the entity bundle — countries has name_en only). The market comes, in order, from the draft's or listing's market; before one is known, the seller's detected market; if none, the fallback en "the seller's country" / am "የሻጩ ሀገር" (i18n keys). Every render site from T1 goes through the resolver; the admin console and exports show the raw token. The import gate accepts {country} and refuses any other {…} token, with a self-test fixture. The finder indexes token-bearing text with the token removed.
Tests: component tests for the resolver (a known market in both languages, and the fallback); the gate self-test; PW-106 on a scratch definition (never a real row, G27) whose option label carries {country}: step 3 and Review show the market's name.

Report rules unchanged: full DEC-023 local run (typecheck, whole-project lint, format, i18n map guard, unit and component tests, the changed E2E specs on both projects); report only on green; stop at any checkpoint you judge risky.
```
---

2. Send this to the curator. It can go with the Babies & Kids delivery; don't wait for Lovable.

---
```
Clothing & Shoes walked: pass. Add these in your next batch or the one after:

1. Sale or Rent / Hire — offer it only on types people actually rent. A shirt is never rented: at Men's and Women's Clothing, show Sale or Rent only for the rented types (suits; dresses and gowns) and let every other type be a sale. Review Traditional Wear and the 9 equipment leaves that offer Hire the same way.
2. Watches — a digital watch is Quartz: add "digital" as a Quartz alias and say so in Movement's help. Smartwatches (Apple Watch, Galaxy Watch) belong in Electronics › Phones & Tablets › Smartwatches & Wearables: say so in the Watch type's help, and make "smartwatch" and "apple watch" search to that leaf.
3. DEC-094, market-neutral wording (standing rule from now): no catalogue text names Ethiopia or any one country where the statement depends on the seller's market. Lovable is adding a {country} token that shows the listing's market name. Until it lands, write no new market-specific text. When it lands (I'll tell you), convert the existing ones. Supervisor census: product_origin and origin-food (become one shared definition with two answers, "Made in {country}" / "Imported" — this also removes the «እዚሁ የተሰራ» duplicate), condition-vehicles "Used in Ethiopia", imei_registered, collectible_type, kibe_origin, shoe_size_system, voltage, and any others you find. Product and cultural facts (teff, the Ethiopian calendar, brand names, cuisine) stay.
```
---

Send me Lovable's report and the Babies & Kids files when they arrive.
