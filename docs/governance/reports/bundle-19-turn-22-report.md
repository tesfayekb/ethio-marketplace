# Bundle 19 turn 22 — report (DEC-192, drawings v13, option A)

No migration, no package change. Two strings (adPage.save.saved, adPage.directions), EN+AM from the attached JSON.

## STEP 0
- Brief saved byte for byte at docs/governance/briefs/bundle-19-turn-22.md; SHA-256 `c890bd56ee39a2333b9fef099911deb0c6c7a716d3c8be6d5901cd88ced5953e`.
- strings_4-3.json SHA-256 `381f9467c3e5c858201f19c6ce3cc1ed9acbd8b006e57fc56e9dff5d022bb533`.
- Drawings (SHA-256): laptop `6a292d5a…`, phone `f1c52e80…`, wide-a `371c69c2…`; saved under docs/design/d201/v13/.
- `<START>` = `2b7b3805d77153a4d477022b572431b149858ace`. Roadmap line 3 updated; unchecked turn-22 entry added.
- CI evidence: newest finished run 996 on `77b2480`, FAILURE — AP-36 both projects (strict-mode duplicate `listing-detail-gallery`), AP-41 both projects flaky, post-test errors. No newer evidence.

## What changed
- `src/features/posting/preview/listing-detail.tsx` — the article is a `@container`; top row = gallery card + title box (3fr/2fr from @2xl, one height, no sticky column); Save and Share as text links at the title box's foot (`listing-detail-actions`); the in-page bar across the full width in the boxes' order (details, description, seller, location) with the DEC-192 current-tab rule (candidates = visible tops within 8 px of the smallest; a current candidate stays); the boxes in a six-column grid placed by `box-layout.ts`; Directions label `adPage.directions` (INC-716).
- `src/features/posting/preview/box-layout.ts` + `box-layout.test.ts` — new; LD-19 pins all 8 presence combinations as whole class literals.
- `src/features/posting/preview/safety-box.tsx` — takes a className, `order-4` removed.
- `src/features/ad-page/share-ad.tsx` — the trigger is the text link with `adPage.share.open` (the dialog itself untouched).
- `src/i18n/locales/en.ts`, `am.ts` — the two keys, copied character for character from the attached JSON.
- `listing-detail.test.tsx` — LD-18 extended (top/boxes/actions once; aside/main absent), LD-20 new (actions in the headline only; Save/Saved wording; Directions label; no "(optional)"). LD-11 and LD-17 updated for the new DOM order (Location and the safety box now lie between the seller card and Report; bar order swapped to seller,location) — beyond the brief's foreseen edits, named here per the report rule.
- `e2e/ad-page.spec.ts` — AP-36 rewritten per the three width bands; AP-37 bar order (live ad's order asserted; sold ad's `["description","seller","location"]`); AP-42 rewritten as "a missing box gives its room to its row"; AP-45, AP-46 new. Census: seed()'s default description is the one-sentence literal "e2e scratch listing for the ad page's doors" (helpers/ad-page.ts), so AP-42's empty-description case overwrites it and the one-sentence case keeps it.
- Docs: spec paragraph after the Staff line; ad-page.md tests line + Turn 22 paragraph; _changelog.md line appended; .prettierignore gains `docs/design/d201/v13/*.png`.

## Checks
- format:check clean (all files, docs included); eslint on the touched files: 0 errors, 1 pre-existing warning (share-ad.tsx line 25 react-refresh, from turn 16).
- typecheck clean.
- Unit suite: 1,053 tests / 182 files, all passing (first full run showed 2 transient failures; the repeat run passed everything — flakiness ledgered for the watch list).
- i18n:usage regenerated; both maps byte-identical; map-guard passes. Diff vs dev: `adPage.directions` and `adPage.save.add` added; `post.where.directionsLabel` loses the ad-page paths (the key no longer serves the buyer); `adPage.save.saved` sits in a dynamic ternary call site, so it is one of the 351 unscanned dynamic sites, not a map entry; scanned/dynamicCallSites counts updated.
- check-hardcoded-strings: findings 0. marketplace-imports: findings 0. e2e-select self-test: 12/12.
- New-file tracking proof: `box-layout.ts`, `box-layout.test.ts`, the three v13 PNGs and this report are new files in the tree (git ls-files proof unavailable — sandbox git state is platform-managed and reports no diff; the platform's commit at turn end carries them).

## Not done here
- No local browser run (INC-506). AP-36/AP-37/AP-42/AP-45/AP-46 verdicts await staging CI on this landing.
- The one-sentence description census is stated above; the `post.*` key census found only `post.where.directionsLabel` posting-directed (now retired from the buyer's page); the rest serve posting screens and stay.
