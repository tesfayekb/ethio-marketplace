# RULING — P-2 (c) c2a, stop 7 (the part-7 migration stop): staging holds mark 20261108130000 — continue with ruling 6 §3–§6; the owner's ad-page budget. Base: cursor/p2-fold e2e0f7365.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c2a-ruling-7.md` (INC-1076) in your first commit after it.

## 1. The migration stop is CLEAN

ethio-staging: newest mark `20261108130000`; `public_listing_json`'s live body md5 `26f176eb3ebc0c711ee4f868656a3f42` (your new value); still service-only (anon and authenticated refused); no scratch row left (XZ 0, e2e-mig- users 0, e2e_mig_ levels 0). The function's return type is unchanged (`jsonb`), so the generated client types do not change: no types patch this time. Prod gets part 7 with parts 1–6 after the merge, in order.

Recorded beside this stop (DEC-354, mine): a stop whose pushed migration files carry `bun run db:proof --fresh` PASS satisfies the staging-apply gate; CI's backend start remains the proof before the prod apply. Nothing changes for you.

## 2. The owner's ad page budget — the ceiling moves with its cause

`/my-listings_/$listingId` at 329.3 KiB against a 329 KiB ceiling: the growth is the levels store, which that page needs for its preview's look and for the Promote sheet's names (it is a signed-in page; DEC-261 is not touched). Ruled: the ceiling moves to the measured size by DEC-296's ratchet form, with the cause named in the budgets file's comment and in the report ("the levels store on the owner's ad page, P-2 (c) c2a"); no trim turn. Any other page whose first download grows is reported with its cause under ruling 1's tolerance; the public ad page must not grow by the store (ruling 6 §3: the server path no longer imports it) — state its number.

## 3. Continue — ruling 6 §3, §4, §5, §6, in that order

The ad page's reader takes the flag's word from the document through the one name chooser shared with the store (a unit test for both languages and the typed absence; SBE-1 and the ad-page specs whole, both projects, 0 retries); W1's row carries `aria-current="true"` and the permanent allowance goes (STOP with the guard's rule quoted if CF-LIST-1 refuses by place); one e2e level-name helper and the four copies go; then `bun run checks` whole, the budgets, the self-review, the final report (`docs/governance/reports/p2-fold-c2a.report.md`: FINDINGS — SBE-1's cause, the W1 attribute, the helper, the budget move; the K2 list; the Records section with DEC-352, DEC-353, DEC-354, INC-1085, INC-1086, the register row 118 as landed and S557 named as the supervisor's; the CI line of the last commit once its run completes). Push, END THE TURN; PR #30 stays a draft. Stop only for a question none of the rulings answers.
