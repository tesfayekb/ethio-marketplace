# W2 — the walk of turn E (the task)

```text
Task W2 — the walk of turn E: the bar's seller label and Show contact's full form. Base: dev e83999cc. PLAN FIRST.

Builds on: docs/governance/briefs/sage-e-one-line.md (turn E, landed as PR #7) and docs/governance/briefs/sage-s5-ad-page.ruling-1.md answer 4(b) (Show contact's full-width 48 px form was filed as a D-item; the operator has now ruled: follow the design).
FLAGS: no-migration, no-package-change, no-agents-change.

SCOPE (by area; your plan names the files): the phone bottom bar and its label (`src/components/shell/`, the two string files `src/i18n/locales/en-base.ts` and `am-base.ts`, `e2e/one-line-slots*.spec.ts`, `e2e/my-listings-page.spec.ts`); the ad page's Show contact and the Button primitive (`src/components/ui/button.tsx`, `src/features/posting/preview/`, `src/components/marketplace/card-tier.ts`, `e2e/sage-ad-page.spec.ts`, `e2e/ad-page.spec.ts`); `docs/features/design-foundation.md` (the "Not drawn" line at :605) and the standing allowance.

THE SYSTEM (G0)
CONCERN A: the phone bar's My-listings item names the seller's page in one word the person understands, whole on one line at 360 px in every public language (INC-957's class; turn E's law).
MECHANISM A: `panel.myListingsShort` rendered through `CutText` inside `ItemBody` (`src/components/shell/bottom-bar.tsx:135`), measured by `e2e/helpers/one-line.ts` (`bottom-bar:` readings, the Ge'ez factor) in OLS-2 and OLS-3. No new mechanism.
CONCERN B: the ad page's one primary action (Show contact) has the design's form — full width of its box, 48 px tall — as a PRIMITIVE size, never a per-instance class.
MECHANISM B: `Button`'s `size` variants (`src/components/ui/button.tsx:25-33`; `touch` is the 44 px primitive, the C2 law L6). NONE YET for the 48 px full form: add it there (one size, e.g. `cta`), and Show contact takes it; `adPageLookOf(tier).contact` keeps colouring it (card-tier.ts:107,144).
CONSUMERS B (grep of e83999cc): `listing-detail.tsx:1467-1478` (Show contact — moves onto the size); `listing-detail.tsx:1440` ("All ads by this seller", outline, `size="touch" className="w-full"` — a sibling with its own full width; REPORT it under K2, do not change it: the design gives it no 48 px form). Your plan lists every other `w-full` on a `Button` across `src/` with file:line (K2), changed by nobody this task.
GUARD: none new — CF-LOOK-1 (`scripts/conformance/look-values.test.ts`) already refuses a hand-written height or colour on a screen; `listing-detail-tier.test.tsx:130` pins Show contact's classes (G38: name old → new in the report).
FIVE LENSES — security: none (strings and classes) · performance: the bar's label is in the first download of every page; a change to `en-base.ts` / `am-base.ts` moves every page's size by the word's bytes — report each page's growth in DEC-296's form, cause named · failure modes: a label wider than its room is cut by `CutText` and OLS-2/OLS-3 go red — the measure decides, never the eye · consistency: the one word appears in the bar only; the panel's name `panel.myListings` is untouched · future growth: a fifth language joins by a key, nothing literal.

THE PLAN (change nothing; report in the chat, then wait for the ruling):
1. The label's room. In the bar at 360 px, read the room per item (`itemRoom` in `e2e/helpers/one-line.ts:218`) for the signed-in four-item bar and the admin five-item bar, and the measured width of each candidate in the bar's face at the current item's weight (`font-bold`, 12 px), with the Ge'ez factor applied as `e2e/helpers/one-line.ts` applies it:
   - en: `My listing` (replaces `Sell`);
   - am: `ማስታወቂያዬ` (U+121B U+1235 U+1273 U+12C8 U+1242 U+12EB U+12EC; replaces `ሽያጭ`).
   Report four numbers per candidate: width on this machine's Ethiopic face, the factor, the corrected width, the room (four items / five items). A candidate whose corrected width exceeds the five-item room does not fit; say so and stop at the plan (the supervisor rules the word; you write no Amharic of your own).
2. The Show contact form. Read `Button`'s sizes and name the new size's classes (height 48 px, full width of its box, the touch law kept: `min-h-12`), where Show contact's `className={contactLook}` meets it, and what `listing-detail-tier.test.tsx:130` and `e2e/sage-ad-page.spec.ts` SAP-1 assert today about that button (old → new).
3. The K2 list: every `Button` with `w-full` across `src/` (file:line), and every other full-width primary action hand-rolled outside `Button` (a `<button>` or `<a>` with `w-full` and a height class).
4. The tests you will write or change: OLS-2 / OLS-3 (they read the key — say whether any change is needed beyond the strings); `e2e/my-listings-page.spec.ts:446` (reads the key — same); a new `SAP-2` in `e2e/sage-ad-page.spec.ts` — at 390 and 1440, light, the free tier: Show contact's box is 48 px tall and as wide as its parent box (`layoutBoxes`), both projects; `listing-detail-tier.test.tsx` updated to the new classes. Ids: `SAP-2` is free (grep-checked at e83999cc).
5. The pages whose first download the strings change (the bar is on every page): the ceiling check's numbers from your build for `/`, `/c/$slug`, `/l/$slug` and `/my-listings`, before the change (DEC-296's form: a growth at or under `ceilingFor` with its cause named is reported; more, or unexplained, is a STOP).

AFTER THE RULING (the build, in the task's order): the strings (the two keys only; the Amharic exactly as given, code points checked by `bunx vitest run src/i18n/locales/am-script.test.ts`); the Button size and Show contact on it; the tests; design-foundation.md:605 reworded to say Show contact now takes the primitive's full 48 px form (D274) and the bar's seller label is "My listing" / «ማስታወቂያዬ» (D273) — one sentence each, under their turn; the report `docs/governance/reports/walk-e-w2.report.md` with the four numbers of step 1 as measured, every page's growth and the K2 list.

DONE means: both strings landed and shown whole in OLS-2 and OLS-3 at 360 in every public language on both projects; Show contact 48 px and full width on the primitive's size with SAP-2 green and the tier test updated; no other screen changed; every check green on the pull request's last commit.
```

# Ruling on the plan (as pasted by the operator)

```text
RULING — W2, on the plan. Base: dev e83999cc. Build now.

1. The Amharic word is the operator's: `የኔ አድስ` (U+12E8 U+1294 U+0020 U+12A0 U+12F5 U+1235 — five letters and a space; measure it as you measured the others and put the four numbers in the report; at your per-letter reading it is about 55 px against the 64 px room). English: `My listing`. Only `panel.myListingsShort` changes in the two files. If `የኔ አድስ` measures over 64 px at weight 700, STOP again with the number.
2. Show contact: as planned — `cta: "h-12 min-h-12 w-full px-4 py-2"` in `button.tsx`, Show contact on `size="cta"`, the tier test extended with `h-12 min-h-12 w-full` on free and Premium (old `h-11 min-h-11` → new, named in the report), SAP-2 as planned.
3. Your correction of my K2 line is accepted: line 1440 is `listing-contact-sign-in`, not "All ads by this seller" (my slip, logged). Neither it nor the Link at :1072 changes. The hand-rolled full-width buttons you listed (auth, settings, the posting steps, panel-header, strip-arrows) are the Button-primitive debt of the form kit; they go into the records as a roadmap line, not into this task. Put the whole K2 list in the report as you gave it.
4. Pages: the two words ride every page's catalogs. The ceiling check is the judge — a judged size at or under its ceiling is reported with the growth and its cause (DEC-296's form), including `/l/$slug` whose room is 0.340 KiB; a page over its ceiling is a STOP (`scripts/route-budgets.mjs` is not in your scope; I rule then). Do not widen a ceiling.
5. Tests as planned (OLS-2, OLS-3 and my-listings-page.spec.ts:446 need no edit; run them whole, both projects); `bunx vitest run src/i18n/locales/am-script.test.ts` after the string change; design-foundation.md:605 reworded as the task says (D273 the words, D274 the 48 px form).
6. Then the checks, the browser check, the self-review, the report `docs/governance/reports/walk-e-w2.report.md`, the pull request, and wait for its CI.
```
