```text
RULING — Foundations turn L-2d, close: the candidate is on dev; finish it. Base: dev 444acdf3. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2d-3.md; roadmap line 3 names it.

VERIFIED (dev 444acdf3): your turn ended, and the platform committed the candidate; it was not withdrawn. Its shape is the one ruled:
- page-head.ts (1,177 bytes) on the first paint, and page-head-client.ts loaded on demand through loadOnce in provider.tsx, with no router.invalidate;
- the 44 keys equal my strings file in both languages (all 44 checked);
- post.head.title is retired;
- the entry shrank by about 0.15 KiB;
- PGH-E1/E2 passed 4/4 with 0 retries.

/admin/translations (+1.13 KiB) is growth by right, not a defect: src/features/admin/translations/languages-page.tsx :28–:29 imports the whole compiled `am` and `en` catalogues (every key, both languages) for the strings console, so 44 new keys in two languages land there.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2d-3.md in one fenced block, prove its sha256 equals the value after END, and name it on roadmap line 3.

CI FIRST: CI on 444acdf3 is expected red on the first-paint budget (/admin/translations has no raised ceiling). That red is what this turn fixes. Any other red is fixed first.

THE CLOSE:
1. scripts/route-budgets.mjs, from your own per-page measurement of this tree:
   - /admin/translations takes the smallest whole KiB the NEAR band accepts, with the cause "the strings console bundles every compiled key in both languages (languages-page.tsx :28–:29): +44 page-head keys (INC-990)".
   - Every other page whose measured size moved goes to the NEAR band's minimum, with the cause "page heads in the reader's language: base text moved from route literals to keys, re-title on demand (INC-990)". Lower where a page shrank.
2. Write the turn report, docs/governance/reports/foundations-turn-l-2d-2.report.md, covering L-2d-2 and this close:
   - B1–B7, each done or not;
   - the per-chunk table and the per-page table (before, after, ceiling);
   - the route table (before and after English);
   - the 44 keys as committed;
   - PGH-1…6 and PGH-E1/E2;
   - K2.
3. `bun run checks` once, on the final tree. Its last line with no FAIL is pasted in the report and in your reply.

Push, and END THE TURN with:
- step 0's sha256;
- the checks' last line;
- the unit count;
- the files from git diff --name-only 444acdf3.
```
