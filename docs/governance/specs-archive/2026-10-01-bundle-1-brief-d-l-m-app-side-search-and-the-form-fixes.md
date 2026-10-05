Source: supervisor thread, turn 1134, Thu 2026-10-01 22:15 New York.
Status at 2026-10-05: built across d42f4223 … 9f80e7e4 (items 1 to 8) and finished in 8fa761d4 (2026-10-02, verified CLEAN; red-first proofs for PW-94 and PW-106 to PW-109 pasted); search timing recorded p95 306 ms against the 300 ms target (hop-bound, no tuning; the hop went to bundle 4); the four-bundle plan stated here was carried out as bundles 2 to 4 (briefs in docs/governance/briefs/); the repo holds no bundle-1 brief file — docs/features/posting.md and _changelog.md record its items.
Related: bundle 1, D + L + M, L (saved zoom), D (contactInText/contactInNote), C/S2 (catalog_search, PR-19), S3 (INC-362), A (E1, PW-93), B (E2, PW-94), Part O (INC-369, INC-370), INC-371, INC-375, INC-382, bundles 2 to 4.

**The migration turn is clean, and I've regrouped the rest of Lovable's queue into four bundles to save turns.** CI is green on the re-run with no flaky test, main is promoted, and there is no new side branch. I read the migration itself and it matches the brief.

**My rulings on Lovable's report**
- **"Other" write-ins:** yes, they get the phone-number check too. It needs the database again, so it goes in the next migration.
- **Hourly sweep:** fine as built.
- **One defect I found reading the migration (INC-382):** the phone rule is too broad. It would refuse "Sizes 42 43 44 45" or "Corolla 2008 1300" as a phone number. The next migration tightens it.
- **One addition I decided:** the title and description get the same check in that migration. Your spec keeps contact details behind the sign-up wall (REQ-007), and a phone number typed into a description would bypass it.

**The four bundles**
1. Now: eight items with no database change (zoom on the map, phone refusals on screen, search speed and "Searching…", numbers red as typed, prices "per", the "Other" write-in fixes, two price-step fixes).
2. One migration: the phone-rule fixes, the place-step rework, the two-answer hide rule, known-model facts.
3. Market-neutral wording and category links in help.
4. Load-time measurement, housekeeping, final full run.

That leaves you at most two more staging applies and one walk per bundle.

1. Paste this into Lovable, attach nothing, and send it.

---
```
D + L + M database part: CLEAN. Mark 20261002030000 is on prod and staging; CI on 8e96a6a4 is green (attempt 2, no flaky test) and main is promoted. Rulings on your report:
- Other write-ins: yes, they get the phone check (single and multi), reason contactInText. It needs the door again, so it rides the next migration (bundle 2). Nothing to do for it now.
- INC-382 (new): attr_contact_like is too broad. "Sizes 42 43 44 45" and "Corolla 2008 1300" are refused as phone numbers. Bundle 2's migration tightens it. Until then keep ONE client helper that mirrors the door, so it changes in one place.
- The hourly sweep is accepted; the rebuild after each catalogue change is the main path.
- The one new database-lint warning is accepted (same class as the reviewed ones).

FROM NOW: BUNDLES, NOT SINGLE ITEMS (operator directive). Work through the whole bundle without stopping between items. If your turn must end, stop at a clean green point (typecheck, lint, format:check, i18n map guard, unit tests, touched specs), say in three lines what is done and what is left, and the operator sends "continue". One full report at the end of the bundle.

BUNDLE 1 — D + L + M's app side, search, and the form fixes. Tier B. NO database change in this bundle: if an item needs one, skip that item and name it for bundle 2.

1. L — the saved zoom. The pin dropper opens at the saved pin_zoom and sends the zoom the seller leaves it at (posting-service.ts:694 already passes p_zoom). The buyer's map and the preview open at the saved zoom (map-preview.tsx:64 today: fixed 13 / 16). PW-96, red before the fix.
2. D — the refusals on screen. contactInText and contactInNote show at their own field with the door's text, and the client helper flags the same input as it is typed (the door stays the authority). PW-101: "+251 911 234 567" in a scratch free-text answer is refused; "Bole Road, House 1234, 3rd floor" in the location note is saved. Red before the fix.
3. C / S2 — search never waits and makes one round trip.
   - Census every path that commits a catalogue change (the admin import routes under src/routes/api/admin/*/import.ts, the admin category and attribute saves, translation approvals that move the version). Each server path calls catalog_find_refresh(false) once after its commit, through the service client. For a path that is a browser RPC: say so and leave it to the sweep.
   - src/server/catalog-find.server.ts:95 switches from catalog_find to catalog_search (one call: rate check, version, rows).
   - PR-19 (DB truth): after a scratch catalogue write through a server path, catalog_find_index holds the current version before any search.
   - Timing, as briefed in S1/S2: Server-Timing on the find route; 20 terms on staging (10 English, 10 Amharic, alias-only terms included), warm. Target fixed earlier: warm server p95 ≤ 300 ms. Report p50 and p95. If p95 is over 300 ms, stop this item and report the numbers; do not tune blind.
4. S3 — INC-362. While the finder is waiting on the current term (catalog-finder.ts states idle / waiting / ready / failed), step-category.tsx never shows post.category.noHits (:286); it shows the searching row as briefed. Component test + PW-105.
5. A — a number outside its effective range turns red as it is typed, with the door's refusal text (today only the hint at step-specifications.tsx:1773). Every wizard field with a number limit; list them. PW-93.
6. B — a price shows what it is per wherever it is printed: card (listing-card.tsx:8 priceLabel), preview, detail, review. Reuse basisNoun and the period keys. The feed read (use-feed.ts:116–119) must not add one query per listing; if it cannot be done without a database change, skip B and name what it needs. PW-94.
7. Part O — as briefed: INC-369 (an empty Other write-in is red and gets focus on Next, for every attribute) and INC-370 (multi-choice questions with an Other option get the write-in box; the door already accepts and requires its text — proofs P8 and P9 in a35e45fa). Tests as briefed; if the brief named none, one per behaviour, next free PW numbers, stated.
8. INC-371 — the price step never prints "Sold per other" (wizard.tsx:200 and :816, basisLabel): with unit = Other it names the seller's written unit. INC-375 — a price type forced to Contact by a basis is released when the basis changes, as commission already is (step-pricing.tsx:178–195). One test each.

RULES FOR EVERY ITEM
- Census before editing; each new test shown red before its fix.
- Scratch rows only (G27); no page-position assertion (G28); afterEach uses stopPageBeforePurge.
- No hardcoded user-visible string; new keys in en and am; bun run i18n:usage, commit both maps, i18n:map-guard.
- No CI, workflow or package change; e2e/helpers/users.ts and the account pool are not touched. Decline the framework update as before.

SCOPE: src/features/posting/** · src/components/marketplace/listing-card.tsx · src/features/feed/use-feed.ts · src/server/catalog-find.server.ts and the catalogue-commit server files your census names · src/i18n/locales/en.ts and am.ts + the two usage maps · component tests beside the code · e2e/post-wizard-*.spec.ts, e2e/posting-routes.spec.ts, e2e/helpers/posting.ts · docs/features/posting.md, catalog-finder.md, listings.md · docs/_changelog.md · roadmap.md. Everything else is forbidden.

END OF BUNDLE: DEC-023 local run — every post-wizard-* spec, posting-routes and a11y on both projects, plus typecheck, whole-project lint, unit and component tests, whole-tree format check last. Report only on green: done · verified · next, the census results, the timing numbers, each red-then-green, every file changed. Read CI from branch ci-evidence.

NEXT BUNDLES (for your planning; do not start them): 2 — one migration: the phone check on Other write-ins, title and description with the tightened rule; Part P; INC-381; INC-374. 3 — Part T. 4 — E census, harness housekeeping, final full run.
```
---

2. If Lovable stops partway with a short note, send it "continue". Send me its full report when the bundle ends; I'll then ask you to Publish and give you one short walk.
3. Import batch 15 and send the curator message from my last reply, if you haven't yet.
