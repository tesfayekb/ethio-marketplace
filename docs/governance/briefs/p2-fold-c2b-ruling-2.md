# RULING — P-2 (c) c2b, stop 2 (the reach table's Guide lines): three columns, six keys, the Amharic attached; the nine departures ruled. Base: cursor/p2-fold 68b5a8bcc.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2b-ruling-2.md` (INC-1076) and the attached `p2-fold-c2b-strings-2.json` as `docs/governance/briefs/p2-fold-c2b-strings-2.json` in your first commit after it (both sha256 in the chat line). The six strings are read from that file by script, never retyped (G43).

## 1. Three columns, not a combined one; six keys

The landed shape is kept: `perkColumns` renders the three level-only columns under `isLevel` only, and the reach prefix still carries their Guide lines ("A reach has no photo limit; the level sets it.") because CF-GUIDE-1 reads literal column keys under each prefix. The cap columns mirror it exactly — `capColumns` rendered under `!isLevel` only (the level table never shows them), literal keys `cities`, `regions`, `countries`, headers `admin.monetisation.reach.field.cities|regions|countries` (the editor's words, no new header keys), cells through your one `capWord(cap, t)` helper (`admin.monetisation.reach.field.unlimited` for null, the number otherwise, `tabular-nums`, test id `${idOf(row)}-cities` etc.), `priority: "secondary"`, `card: "meta"`. A combined "Places" column is refused: it needs a compound string in two languages and hides the three dials staff actually set. The six Guide keys are in the attached file (your EN kept in substance — "blank means no limit" is the one wording, so the hint, the field word and the Guide say the same thing; the level lines are your form). CFG-3's six lines must be gone with them. The owed-test census first: every test that pins the products table's column keys, headers or rows (`monetisation-page.test.tsx`, the MON-* `toEqual` lists over the table's headers and cells, `${idOf(row)}-*` test ids) is listed in your report §2 and corrected with the columns.

## 2. The nine departures — accepted, with these notes for the report

1. `product-prices-table.tsx:190` — accepted; the file joins the scope (§2 of ruling 1 gains it).
2. The 60 keys in part 1 — accepted; the guard's refusal is the right order.
3. The dated `check-doors-allowlist.txt` line (reason + expiry 2026-11-30) — accepted; part (v) removes it with the door, so it never reaches its date.
4. The owner's ad page has no photo box — accepted as a correction of the census and of my ruling: INC-1080 stays a single-instance defect (the seller's edit); the owner page's `plan` read was dead data, removed. Your report says so under Findings; my record is corrected.
5. `scripts/doors/rows.ts:6` — accepted; the reader's importer list is twelve plus the five of `sqlCodeOf`; the register row counts them.
6. `plan-seam-allowlist.txt` until part (v) — accepted.
7. MON-15 and MNF-10 cut by an exact-slice script — accepted: a whole block removed by its line range is not the search-and-replace G37 forbids; the diff is the record. Say so in one line.
8. The editor's fields and `p_caps` after the types patch — correct, the GO's order; `SaveProductInput.caps` carried now, MNS-3 `caps: null` until then.
9. MLA-19, PW-193, MON-18 after "continue" — correct; name them under Limits in the migration stop report.

## 3. Then

Finish part 5 (the three columns from your scratch copy, the six keys by script from the attached file, the usage maps when the strings land), parts 6–8 in ruling 1's order, then M-3c-b's five parts (ruling 1 §4), `bun run db:proof --fresh` PASS, push, END THE TURN at the MIGRATION stop. Stop before that only for a reader of a dropped object still in src/ or e2e/, a live definition that differs from the file the census read, or a question none of the rulings answers.
