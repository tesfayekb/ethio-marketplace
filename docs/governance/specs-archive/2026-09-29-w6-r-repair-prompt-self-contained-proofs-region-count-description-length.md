Source: supervisor thread, turn 959, Tue 2026-09-29 16:51 New York.
Status at 2026-10-05: built: 13cb1b22 (mark 20260930001000) applied on ethio-prod by the executor and on ethio-staging by the operator; DEC-023 suite 207 passed; CI re-run passed and main promoted (turn 969); description limit ruled 5,000 server-side with the AI assist at 1,200 (INC-342) — the operator did not override; INC-343 went to W6b; not in the repo (the repo's listings.md and posting.md carry the built rules).
Related: W6-R, INC-340, INC-341, INC-342, INC-343, S73, G29, PR-18, DEC-023, G22.

**Don't load places into staging, and don't ask Lovable for a data migration.** Places only enter the database by import file, and there's no admin console connected to staging to import them into. Lovable's option 1 therefore can't be done. The real fault is that the migration's built-in tests borrowed real places, and my W6 prompt allowed that ("real places are read") — slip S73.

**The fix:** Lovable writes one corrective migration whose tests create their own throwaway places inside the check, so it runs the same on both databases with no data needed. It also records W6's migration as applied on staging, so the CI parity check passes.

**CI on dev is red right now** (`0e4adb2`, run 36626287215): the pre-check stops the browser tests because staging is behind. That's expected; this repair turns it green.

**Also decided, from Lovable's W6 report:**
- **Region limit (INC-341):** now that every place is a city, the server's region count is always 0, so the region limit is only enforced on screen. The corrective counts distinct regions, cities and countries of the chosen places. A sub-city counts as its city.
- **Description length (INC-342):** the form stops at 1,200 characters while the server allows 5,000. I've ruled that the server's 5,000 wins, and a test ties the two together. The AI writing assist stays at 1,200. Tell me if you'd rather have 1,200 everywhere.
- **The 165 database warnings:** they're the same 165 counted and ruled on in the 2026-09-28 security census. Nothing new.
- **Two place-step limits go to W6b:** the item's own place can no longer be removed, and a second-country place isn't shown again after Back (INC-343; it can't happen on the free plan). W6b's item-location marker covers both.

**Your steps:**
1. Paste W6-R (below) into Lovable and send it. Lovable applies the new file to production itself.
2. When Lovable reports its apply line, open the **staging** SQL editor and apply **only that new file**. Do not apply `a3a572bf` to staging.
3. Tell Lovable it's applied. Lovable then runs the full browser test suite and reports on green.

---
```
W6-R — repair: the W6 migration cannot apply on staging (INC-340), the door's plan counts (INC-341), the description limit (INC-342) · Tier B + migration · 2026-09-29

STATE: dev 0e4adb2 is RED. E2E preflight says "STAGING BEHIND: apply 20260929201601_a3a572bf…" (run 36626287215). a3a572bf is live on ethio-prod, but it cannot apply on ethio-staging: its proofs borrow five real places, and staging has no sub-city (0 rows; prod has 11).

RULING: no place, plan or country data is written to either database. Places land only by file, and staging has no console. Instead, the proofs stop depending on reference data: G27 applies to proofs too. A proof never depends on reference rows whose presence differs between projects. (The W6 prompt allowed reading real places; that was a supervisor slip, S73.)

PART A — one corrective migration (INC-340 + INC-341)
1. Read back the live md5 of validate_listing_draft on ethio-prod first; it must be 64539a18… (a3a572bf). Re-declare the function WHOLE from that body with ONE change, INC-341 (step-6 counts, now that every place is a city or sub-city):
   - v_cities = distinct cities, where a sub-city counts as its own city: coalesce(city_id, id).
   - v_regions = distinct region_id of the chosen places.
   - v_lands = distinct country_code.
   Before this, region-level nodes were counted, so the door never enforced max_regions. Nothing else changes.
2. Proofs: self-contained, in one rolled-back block.
   - Build scratch markets inside the block. Pick FREE ISO user-assigned country codes at runtime, never a fixed one. Market 1: its anchor; region R1 with cities C1 and C2 and a sub-city S1 under C1; region R2 with city C3. Market 2: a region and a city.
   - Read no reference place or country row. The 'free' plan row is read-only.
   - Re-run P22–P27 on this tree (same assertions as in a3a572bf).
   - P28 (INC-341): C1 + C3 (two regions, one market) under the free plan → coverageExceedsPlan:region.
   - P29: C1 + S1 (a city and its own sub-city) → counted as ONE city, no coverageExceedsPlan:city.
   - No proof skips with a notice.
3. In-file closers exactly as in a3a572bf (the REVOKE/GRANT lines). ACL read-back. Body read-back: cityRequired present, multipleMarkets absent, the three distinct counts present.
4. Marks, as TWO separate INSERT statements:
   - its own declared mark, later than the file's UTC stamp, and the newest literal in the file;
   - a3a572bf's mark 20260929235900 (ON CONFLICT DO NOTHING).
   On staging this file replaces a3a572bf, and the preflight accepts a file when its declared mark is in the ledger (scripts/e2e-migration-preflight.ts, missingAgainstLedger). Say this in the file header and in the changelog. No allowlist line is needed.
5. G29 census, report only: list every applied migration whose proof block reads reference rows (places, countries, categories, attributes, plans) and would fail on a project without them. Do not edit applied files.

PART B — INC-342: the description limit
- step-details.tsx:31 caps the description at 1200; the door allows 5000 (validate step 4; listings.md:328). The door is the authority, so the client follows it: 5000. The AI assist stays ≤ 1200 (DEC-072). TITLE_MAX 120 already matches the door.
- Pin both to the door:
  - PR-18 (posting-routes): a 5000-character description is accepted; 5001 is refused tooLong.
  - A unit test asserts the client constants are 120 and 5000.

APPLY — report these lines:
- ethio-prod: you apply the new file (a3a572bf stays as it is).
- ethio-staging: the operator applies ONLY the new file, never a3a572bf: "apply <uuid-fragment> → expect marks <new mark> and 20260929235900".

CLOSE W6: after the staging apply, run the DEC-023 suite — every post-wizard-* spec plus posting-routes and a11y, both projects, including PW-80, PW-81, PW-82, PR-17 and PR-18. Report only on green.

SCOPE: the new migration; src/features/posting/step-details.tsx; e2e/posting-routes.spec.ts; one unit test file for the constants; docs/features/listings.md, posting.md, _changelog.md. Nothing else.

ANTI-PATTERNS
- No row written outside the rolled-back proof block.
- No edit to a3a572bf or any other applied file.
- No proof that skips.
- No CI, preflight or reporter change (G22).
```
---
