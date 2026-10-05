Source: supervisor thread, turn 943, Tue 2026-09-29 07:13 New York.
Status at 2026-10-05: proposal explained to the operator on 2026-09-29 07:13; he answered "LATER" (turn 944) — recorded as the DEC-089 proposal, not approved; its two habits (keep Ethiopia out of code; watch shared wording) led to DEC-094 market-neutral wording and the {country} token built in bundle 4 Part G; the two data layers (per-choice country tags, per-question country visibility and prefill) are not built; not in the repo.
Related: DEC-089, DEC-094, DEC-095, pricing-data.ts:196 ETB fallback, 11 help texts naming Ethiopia, excluded_country_codes.

I'll check what the repo and ledger already provide for per-country scoping before answering.

<!-- extractor: lines of the same turn omitted here (chat text or tool calls, not part of the document) -->

**Yes, it can be done, and it doesn't need a redesign later.** The parts that would be expensive to add years from now are already country-aware. What's missing is two small layers of data rules, and they can be added whenever we need them without changing today's catalogue.

**Already per country in the repo:**
- Every listing records its country. This is the one thing that's nearly impossible to add later, and it's done.
- Each country has its own currency, unit system and order of top-level categories. Measurements are stored in metric and shown in each viewer's units.
- A category can be hidden in chosen countries.
- Keys are the same everywhere: Toyota is `toyota` in every country. That keeps search, filters and cross-border browsing working as one marketplace.

**Missing (the two layers):**
1. **Per choice: "offered only in these countries."** Anbessa, shemma and Sheno butter would be tagged for Ethiopia's markets; Kenyan brands for Kenya. A choice with no tag is offered everywhere, so nothing in today's catalogue needs to change.
2. **Per question: "ask only in these countries" and "prefill differently by country."** IMEI registration is an Ethiopian question. The shoe-size system would prefill EU in Ethiopia, US in the USA, and UK in Kenya and South Africa.

**How it would work:**
- The country the item is posted in decides what's offered, not the seller's nationality.
- Old listings never break. A tag only changes what new posts are offered; values already saved stay valid.
- "Other" with typed-in answers stays everywhere, and those answers are collected per country, so a new country's lists grow from what its sellers actually type.
- There is always one list per question, never a copy per country (no "Kenya brands" list). Copies would split search and filters.

**The trap specific to ethio.com:** "Ethiopian items only in Ethiopia" would break the diaspora. A mart in Atlanta sells Zelalem injera and berbere. So a tag has to mean "markets where this is sold", and Ethiopian products get tagged for the diaspora countries too. That's why the curator should set the tags as catalogue data rather than it being a code rule.

**When to build it:** not now, but not years out either, because it already matters a little. The USA, Canada and South Africa are open markets, and a US seller's shoes are labelled in US sizes. My recommendation: make it its own decision (DEC-089, a proposal only; I've logged it as a proposal, not a decision). Build it before the first market outside the Ethiopian and Eritrean community opens (Kenya or Somalia), or sooner if a walk finds a wrong default in a diaspora country. My rough estimate is 4–7 Lovable prompts for both layers with tests, more if browse filters also need country scoping. Nothing existing has to be rewritten.

**Two habits to keep from now:**
- **Keep Ethiopia out of code.** I searched the code and found only one case: the currency falls back to ETB when the country can't be detected (`pricing-data.ts:196`). That's fine for now and goes into the DEC.
- **Watch shared wording.** 11 fields' help text mentions Ethiopia, for example "Ethiopian shops use EU" on shoe size. That's correct while Ethiopia is the main market, so I'm not changing it now. The list goes into the DEC to become per-country help text when the layers are built.
