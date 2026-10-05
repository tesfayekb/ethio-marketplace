Source: supervisor thread, turn 1021, Wed 2026-09-30 21:53 New York.
Status at 2026-10-05: the round was built (f2422adf, 2026-10-01, CLEAN: INC-360 fixed, INC-361 staging Amharic filled, the My Listings fix restored, PW-99 proved); INC-359's class (executor work stranded on a lovable-sync branch) recurred as INC-373 and INC-376 and led to DEC-096 (detector, not built) and DEC-098; the proposed instruction amendment G30 (list the platform's lovable-* branches on every verification; confirm a key line of each claimed change on a fresh dev clone) was never answered by the operator and is not installed; not in the repo.
Related: INC-359, INC-360, INC-361, S84, G30 (proposed), DEC-096, DEC-098, PW-99, PW-15.

CI on b960ae3 is red for two reasons, and while tracing it I found more lost work than Lovable reported.

**Why CI is red**
- **Component test (caused by the restore):** the test at `step-where.test.tsx:215` still checks the older layout from your first place-step walk (W6b-1 R2), where each "add" button sits in its own box. The staircase layout you asked for (J) puts "+ Add region" at the bottom of the last region box. That test never ran while the staircase work sat off dev, so it was never updated. I decided the test follows the staircase layout, since your walk ruling overrides the old test (INC-360).
- **Amharic rail test (a known repeat failure, now gating):** in Amharic, the category rail on staging showed "Construction Material" and "Travel & Accommodation" in English. This test has failed intermittently more than 10 times since 9/14. Every recorded failure names exactly those two categories, so the cause is in the staging data, not timing. This time it failed on the retry too, so it now blocks the build (INC-361).

**What actually happened to the place-step work (INC-359)**
- Dev's history wasn't rewritten. The Lovable turn from 21:54 to 22:12 UTC (G–K) was pushed to a side branch, `lovable-sync-1790806349`. The 22:38 framework revert went to another side branch the same way, which is why that revert "didn't stick" the first time.
- Lovable's restore checks out: the restored files match that branch except for the PW-99 lines, and dev hadn't changed them since.
- I checked all nine side branches the platform has made. One more fix never reached dev: your 9/18 walk fix that keeps My Listings active while posting (6fea44fd). Everything else was either redone on dev or replaced by later work.
- Lovable was right to decline the framework update again; the earlier revert of it (DEC-092) stands.

1. Send this to Lovable:

---
```
ROUND — CI red on b960ae3c + stranded work (Tier B; no schema). Do not start PW-102 in this turn.

Correction to the record: dev was not rewritten. Your 21:54–22:12 UTC turn (G, H asterisks, I, J, K) was pushed to the side branch lovable-sync-1790806349 (forked at e765c012, tip 9f36b11b), and the 22:38 framework revert to lovable-sync-1790807903, while dev moved on. Your restore is verified: the restored files equal 9f36b11b except your PW-99 lines, and dev had no edits to them since the fork. The supervisor censused all nine lovable-* side branches; one more turn never reached dev: lovable-sync-1789741128 (6fea44fd, 2026-09-18, "Added /post to My Listings"). Every other branch's work is on dev or superseded. You were right not to install the TanStack packages; DEC-092's revert stands.

Scope — you may touch only:
src/features/posting/step-where.test.tsx · src/components/app-shell.tsx · e2e/post-wizard-category.spec.ts · e2e/i18n-coverage.spec.ts (failure message only) · the one spec file Part 2 names as the writer (name it before editing) · docs/features/posting.md · docs/_changelog.md · staging data only as Part 2 allows (no prod writes, no migration).

PART 1 — INC-360, the red component test (step-where.test.tsx:215).
Census: quote the test "puts each add button in its own box (R2)" and the J placement lines in step-where.tsx (the "+ Add city" wrapper and `{index === groups.length - 1 && addRegionButton}`).
The test encodes W6b-1 R2; the operator's staircase ruling (J) superseded it. Rewrite it to J's law and rename it "(J)":
- "+ Add city" is inside its region box, after every city row of that box;
- "+ Add region" is the last child of the LAST region box and is inside no other region box;
- with no region box yet, "+ Add region" is the country box's last child (assert it if the fixture can mount that state; otherwise say so);
- "+ Add country" is outside the primary country box.
Prove it: the new test is red against step-where.tsx from e765c012 (the W6b-1 layout) and green on HEAD; restore the file. Then list every other test in the file that asserts a W6b-1 placement J changed (expected: none).

PART 2 — INC-361, the Amharic rail shows "Construction Material" and "Travel & Accommodation" (i18n-coverage, shard 5, failed on retry, now gating; the mobile-drawer variant is the same defect). The flake ledger has 10+ entries since 2026-09-14 and every recorded body names exactly these two roots, so the cause is data-specific.
Investigate, read-only on staging, and paste each result:
a) categories rows for slugs construction and travel: id, is_active, name_en, name_am;
b) entity_translations for those two ids (entity_type 'category', field 'name', lang_code 'am'): value, status, updated_at, plus any revision rows for them;
c) a census with file:line of every e2e spec or helper that writes: categories.name_am; entity_translations rows not scoped to e2e- slugs or a fence language; country_root_order; or is_active / pointers of non-scratch categories.
Rule, fixed now:
- If name_am is empty for either row, fill it on staging only with the production value — construction "የግንባታ እቃዎችና መሳርያዎች", travel "የጉዞ እና ማረፊያ አገልግሎቶች" — and paste the read-back.
- If (c) finds a test that can change what these two rows show in Amharic (an approved 'am' row turned English, un-approved or deleted; or the roots surfaced while their Amharic is missing), re-fence it to scratch rows (G27, Knowledge J3) and name the run window it overlapped.
- If neither applies, stop Part 2 and report a)–c) as found. Do not guess, and do not loosen the check.
In i18n-coverage.spec.ts change only the failure message, so it names the slug of each English label.

PART 3 — INC-359, restore the 2026-09-18 My Listings fix from 6fea44fd.
Census: quote dev's routePanel derivation in app-shell.tsx (about lines 396–401) and confirm nothing on dev derives a panel for /post.
Restore: /post and /post/<id> derive the "my-listings" panel (6fea44fd's lines, adapted to today's code). Add 6fea44fd's two PW-15 assertions (the My Listings tab is selected and the menu's post-entry is visible while on /post, then Escape) to PW-15 in e2e/post-wizard-category.spec.ts, after the URL check. Restore the posting.md PW-15 sentence. Prove PW-15 red without the app-shell line and green with it.

PART 4 — PW-99 proof. Run PW-99's 360 px half against 9f36b11b's step-where.tsx (J without the PW-99 change): it must be red; report the innermost select width measured. Then green on HEAD; restore the file.

PART 5 — changelog, one line each: the restored place-step work (INC-359, from lovable-sync-1790806349); N1 (INC-357, c3761f92) if it has no line yet; PW-99; INC-360; INC-361; the restored My Listings fix.

Completion report:
- every file touched and confirmation nothing else changed; git ls-files proof for any new file;
- the Part 1, 3 and 4 red-then-green runs and the Part 2 read-backs;
- DEC-023 local run: typecheck, lint, format, i18n map guard, bun run test:unit (the whole component suite — it was missing from your last report), and post-wizard-where, post-wizard-category and i18n-coverage on staging in both projects. Report only on green.
Then stop; the supervisor confirms CI before PW-102.
```
---

2. Send it. Nothing needs attaching. Once CI is green I'll ask you to publish, then walk the place step on the published site. The live site doesn't have the place-step work (G–K) yet, so there's nothing to walk before that.

**Staging data:** Part 2 may fill in the Amharic names of those two categories on staging only. Production already has them, so production isn't touched. Say so if you'd rather approve that write separately.

**My slip (S84):** I recorded the place-step work (G–K) as landed from Lovable's reports without checking that it was actually on dev. Then I reported the green run on 9d56f39 as if it covered that work. When the framework revert first failed to stick, I didn't look for where it had gone. Here is the instruction amendment I'm proposing (G30) for you to install: *every verification lists the platform's `lovable-*` branches against the nine already checked, and before calling a change done, confirms on a fresh dev clone a key line of each change the executor claims.*

INC-359 to 361 are in my running record and go into the repo with the records update.
