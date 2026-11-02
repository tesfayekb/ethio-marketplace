# P-1 — ruling 1, on the plan

```text
RULING — P-1, on the plan. Base: dev 94249bf8. Build now.
**MODEL — build: Claude Fable 5.1 (High)** (two migrations, a new permission resource, staff doors).

The plan is accepted as written — the census, the two migrations, the screens, the strings, the tests, the growth rule, the build order A → E — with these answers.

0. Stay on `cursor/p1-packages` with your STEP 0 commit; push it now (`git push -u origin cursor/p1-packages`) so the record is on the remote, then build. The records turn lands after this task, so `roadmap.md` and the ledgers are yours to edit as the task says; nothing moved on dev since your base.
1. Scope gains `scripts/e2e-select.ts` (the `admin-packages` area), `e2e/helpers/pool-reset-map.ts` (the two EXEMPT lines) and `src/features/admin/rail-items.ts` (the icon). Nothing else outside SCOPE.
2. `admin_set_coverage_plan`: the body in `20261029015441…sql:198–247` IS ethio-prod's live definition — I read it back today: `prosrc` md5 c45aa8a3edbc9b45cb4df01273bdaf3b, 2405 bytes, args `(p_plan text, p_max_cities integer, p_max_regions integer, p_max_countries integer, p_allow_everywhere boolean, p_max_photos smallint)`, SECURITY DEFINER, VOLATILE, search_path=public. Redeclare from it: DROP the old signature, CREATE with the four trailing defaults as planned, REVOKE/GRANT restated, the acceptance-doors line replaced; the proof pastes the stripped-body md5 as M2's did.
3. A third door `admin_end_package_price(p_id uuid, p_valid_to timestamptz DEFAULT now())` — one verb, one audit action (`package_price.ended`); the save door inserts only (no `p_id`, no "fixed fields" refusal). Three doors, three allowlist lines.
4. The overlap rule lives in the door under `FOR UPDATE` on the package row, proven (d). No extension (G42).
5. The ad's market for the resolver is `locations.country_code` of `listings.location_id`; the primary place prices the ad; `home_country_code` never.
6. `label_key` is stored and edited only; no compiled `plan.*` / `package.*` key lands now; P-3's one reader resolves it with the plan key as the typed fallback. The field's default on create is `plan.<key>` / `package.<key>`.
7. `plan_caps` unchanged; P-3's migration adds the two dials to it with the publish door's `plan_quota`.
8. CF-PERM-1 (`scripts/conformance/perm-vocabulary.test.ts`, planted bypass, named in `wired.test.ts`): yes, in this PR.
9. W4 last (Part D), as planned.
10. `numberOrZero` (`coverage-dialogs.tsx:157`): replace it in this turn — it is the sentinel parse the form law names (a blank or non-number answer is a typed refusal, never 0), for the old fields and the new; census every other reader of `numberOrZero` across `src/` and list them under K2 (fix only the coverage form here). Name it under Departures as the one behaviour change beyond the numbered ones (a blank limit now refuses instead of saving 0 — which the door refused anyway as "belowMinimum").
11. Recorded on my side, not yours: INC-1034 — `validate_listing_draft` (`20261028224333…sql:371`) and the proof at `20260929201601…sql:445` read `coverage_plans WHERE plan = 'free'` instead of `seller_plan(p_uid)`: harmless while every seller is on `free`, a defect the day plans become per-seller; fixed in P-3 with the quota door and CF-PLAN-1 (every SQL reader of `coverage_plans` resolves the plan through `seller_plan()`). The matrix-vocabulary gap is closed by CF-PERM-1 (8).
12. Amharic for every key in your §4 comes in the ruling that follows your first MIGRATION stop (the key list is final only when the doors' refusals are): build the screens with the English and leave the `am-admin.ts` / `am-base.ts` entries for the strings commit after that ruling; `am-script.test.ts` and `strings-layers` then judge them.
13. Marks: M1a `20261102220000` and M1b `20261102230000` as planned, or the next full hour plus one after your file stamps if later; one MIGRATION stop with both pairing lines; the four-check scan run on both files before the stop.

Then the parts, the stops, the checks, the browser check, the self-review, the report `docs/governance/reports/p1-packages.report.md` with the operator's walk lines, the pull request and its CI.
```
