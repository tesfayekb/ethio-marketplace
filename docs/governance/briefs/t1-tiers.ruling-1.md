# T1 — ruling 1, on the plan

```text
RULING — T1, on the plan. Base: dev e5e191c6. Build now.
**MODEL — build: Claude Fable 5.1 (High)** (migrations and a staff privilege path).

The plan is accepted as written — the census, the two migrations, the screens, the tests, the growth rule — with these answers and additions.

1. Part A without a migration: yes. `tier` is in the browser roles' column grant (`20261003215007…sql:188–194`, read); `readDraft` and `SCREENING_SELECT` add the column; `my_listing` stays as declared.
2. The tier look only on the four pages (tint, frames, accents, `data-tier`); the flag and the tag stay on the buyer's page; staff's Badge stays. The report's walk lines say so, so the operator can ask for the flag on the preview later if he wants it.
3. `listings:enforce` with step-up, as the other privileged listing doors.
4. Reasons `promotion`, `promotion_ended`, `other`, with the move door's note rules.
5. No seller notice: revision and audit only.
6. Scope gains `scripts/acceptance-doors-allowlist.txt` (one `staff` line), `src/features/posting/wizard.tsx`, `use-draft.ts`, `use-edit-draft.ts`.
7. Order: C → D → E → A → B (M1, stop; M2, stop) → the control and the e2e → the checks. Marks: M1 `20261102200000`, M2 `20261102210000` (above the ledger's top and later than today's stamps); if a file's stamp ends up later than its mark, take the next full hour after the stamp plus one hour and say so in the stop report. Each stop report carries its apply-pairing line: `apply <uuid-fragment> → expect mark <value>`. The supervisor applies each file on ethio-staging from your pushed commit (sha-checked, whole) and sends `continue`; ethio-prod is the operator's, after the merge and before Publish.
8. `ListingDetailView.tier` required: yes; CF-TIER-4 as planned.
9. One more string, Part C's neighbour (D278, the operator's walk): `common.dismiss` in `src/i18n/locales/am-base.ts` becomes «ዝጋ» (U+12DD U+130B; the word `common.close` already uses). No other key changes.
10. CF-PRESS-1 rule 4 as "no switch checkbox anywhere": accepted, with INC-1032 named in the rule's comment.
11. M2's proof: before the staging apply I compare the file's body against ethio-prod's live `pg_get_functiondef` of `transition_listing` (md5 with the two named insertions stripped); if they differ, the file is redeclared from the live definition — so paste the body's md5 (insertions stripped) in the stop report.

THE AMHARIC (the supervisor's; copy each value exactly, code points checked — Ethiopic U+1200–U+137F, ASCII and the braces only):
- `admin.listings.action.tier` (en "Set tier") → «ደረጃ አስቀምጥ»
- `admin.listings.tier.title` (en "Set the tier") → «የማስታወቂያውን ደረጃ አስቀምጥ»
- `admin.listings.tier.hint` → «ፕሪሚየም ማስታወቂያዎች በዝርዝሩ መጀመሪያ ይታያሉ፣ የተለዩ ማስታወቂያዎች ይከተላሉ፤ መደበኛ ነጻው መልክ ነው። ደረጃው ሠራተኞች እስኪቀይሩት ወይም ማስታወቂያው እስኪወገድ ድረስ ይቆያል።»
- `admin.listings.tier.done` (en "Tier set to {tier}.") → «ደረጃው ወደ {tier} ተቀይሯል።»
- `admin.listings.tier.error.same` → «ማስታወቂያው አስቀድሞ ይህ ደረጃ አለው።»
- `admin.listings.tier.error.removed` → «የተወገደ ማስታወቂያ ደረጃ አይቀበልም።»
- `admin.listings.tier.error.unknown` → «ያልታወቀ ደረጃ።»
- `admin.listings.reason.promotion` (en "Promotion") → «ማስተዋወቅ»
- `admin.listings.reason.promotion_ended` (en "Promotion ended") → «ማስተዋወቁ ተጠናቋል»
- `common.dismiss` → «ዝጋ»
The report lists every one of these key by key with its English (rule 60); `am-script.test.ts` runs after the string change.

Then the checks, the browser check, the self-review, the report `docs/governance/reports/t1-tiers.report.md` with the walk lines, the pull request and its CI.
```
