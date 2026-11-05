STOP — p2-proof-caps amendment 1 E: waiting until cursor/db-proof-2 is merged into dev; the operator sends "continue".
DONE: brief (6a27fe546); item 1 (7e1edad2d); amendment 1 A (the draft pull request: `gh pr create --draft` failed — "GraphQL: Something went wrong while executing your query", the fourth GitHub API failure today; the retry after this stop's first push opened it: draft PR #25), B (5d1ab9c4d — part 2's proof comment describes the any-caps scenario; file 11's comment above its proof says "places trimmed" only and is not stale, so unchanged), C (the census below), E (the amendment saved)
LEFT: F (cursor/p2-proof-caps-2 from dev, the copied files, the two `bun run db:proof --fresh` runs), item 5 (checks, report with its Records section, PR ready)
CI: draft PR #25 opened at c3dd434aa, its run not read (amendment A: do not wait); the last completed run read is 592cdf4ac (PR #19), SUCCESS, run 42053107981
FILES:
docs/governance/briefs/p2-proof-caps-amendment-1.md
docs/governance/briefs/p2-proof-caps.md
docs/governance/reports/p2-proof-caps.stop-1.md
docs/governance/reports/p2-proof-caps.stop-2.md
roadmap.md
supabase/migrations/20261105080105_8797b9c8-6a43-4d2c-9558-6b11a881aefe.sql
supabase/migrations/20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql

## The census (item 3, G0.3, by definition)

Every `DO $proof$` block of the 17 P-2 files (one block each; marks 20261104200000 … 20261105100900), read for a read of a reference row — coverage_plans (directly or through `seller_plan`), market_settings without the proof's own scratch row (directly or through `market_settings_for` / a door that counts free slots), listing_packages' real keys or perks, level_ranks, languages, legal_versions, roles — and for the doors each proof calls (a door that reads a reference row inside its body counts). Grep: `rg -i "coverage_plans|market_settings|listing_packages|languages|legal_version|\broles\b|level_ranks|baseline_level_key|seller_plan|market_settings_for|is_baseline|currencies|package_prices"` over each block's line range, then the `public.<fn>(` calls of each block of files 12–17.

Classes: **uses-scratch** — the expectation rests on the proof's own scratch rows only; **reads-real-value-independent** — a real row is read, but the expectation holds for any value it holds (it is read and compared with itself, or any row serves); **depends-on-value** — the expectation holds only for a particular real value.

| # | File (proof block) | Site | Class |
| - | ------------------ | ---- | ----- |
| 1 | 20261104124957_71cb9d01 (:124–:269) | :170 exactly one baseline level row; :175 `baseline_level_key()` equals that row | reads-real-value-independent (the unique index's invariant; the key compared with the row read) |
| 1 | | :223, :258 scratch packages | uses-scratch |
| 2 | 20261104124958_c072fd66 (:244–:489) | :255 `languages` first code; :351 `legal_versions` | reads-real-value-independent (any language, any version) |
| 2 | | :461, :475 `baseline_level_key()` | reads-real-value-independent |
| 2 | | :356 scratch package | uses-scratch |
| 3 | 20261104153313_f5c8063d (:241–:416) | :316–:318 the seeded ranks must read `regular:0,featured:1,premium:2` | **depends-on-value** (the real keys `regular`, `featured`, `premium` and their sort order) — applied on ethio-prod (file 3 of 9); not changeable; reported |
| 3 | | :252–:253, :351, :363–:365, :384, :392, :397 ranks of the real `featured` / `premium` beside the scratch level | **depends-on-value** (the real keys exist as levels) — applied; reported |
| 3 | | :360, :382, :390, :396 scratch level | uses-scratch |
| 4 | 20261104153957_8816b4c0 (:70–:194) | :125–:130 the scratch market row (free 1) | uses-scratch |
| 4 | | :134 `market_settings_for('XY')` falls to the default (its country_code NULL) | reads-real-value-independent |
| 4 | | :140, :147 the real default row is parked on the scratch code and back (rolled back) | reads-real-value-independent, but it WRITES a real row inside the block — applied; reported |
| 5 | 20261104153958_12091168 (:126–:360) | :139 `languages`, :193 `legal_versions` | reads-real-value-independent |
| 5 | | :148 the real `featured` sort places the scratch levels around it (v_fs − 1, + 1, + 2) | reads-real-value-independent (relative; needs the key `featured` to exist — :170 raises otherwise) |
| 5 | | :187, :199–:207 scratch currency, packages, prices, market | uses-scratch |
| 6 | 20261104153959_307e79c4 (:147–:375) | :161 `languages`, :213 `legal_versions`, :250 `baseline_level_key()`, :356 the baseline's rank | reads-real-value-independent |
| 6 | | :208, :219–:226 scratch currency, packages, prices, market | uses-scratch |
| 7 | 20261104154000_fbffa284 (:120–:339) | :144 `featured`'s `extends_lifetime` — :251–:252 expect either branch | reads-real-value-independent |
| 7 | | :224 the `super_admin` role | reads-real-value-independent (any role row of that name) |
| 7 | | :246, :320 the staff door moves an ad to the real `featured` / `premium` (enabled level rows) | **depends-on-value** (the real keys exist, are enabled levels) — applied; reported |
| 8 | 20261104154001_0ce62d98 (:111–:157) | :131–:141 lie inside a quoted body the proof compares | none (text) |
| 9 | 20261105080104_4e04fad3 (:63–:149) | scratch country only | uses-scratch |
| 10 | 20261105080105_8797b9c8 (:90–:204) | :139–:149 the plan's caps read into variables; the scenario follows from C | reads-real-value-independent (fixed by this ruling; was depends-on-value at :144) |
| 11 | 20261105080106_42c3a28d (:174–:397) | :235–:245 the caps as in file 10 | reads-real-value-independent (fixed by this ruling; was depends-on-value at :307–:323) |
| 11 | | :211 `baseline_level_key()`, :292 the baseline's rank | reads-real-value-independent |
| 11 | | :257–:262 scratch packages, scratch market (free 2) | uses-scratch |
| 12 | 20261105080107_8108db2c (:55–:81) | catalog, the body's md5, `cron.job` names the door | reads-real-value-independent |
| 13 | 20261105080108_d9040574 (:275–:428) | :286 `languages`, :297 a public-enabled language, :329 `legal_versions` | reads-real-value-independent (any) |
| 13 | | `edit_my_listing` with a title only (:374, :391, :410) — no place, so no coverage cap | uses-scratch |
| 14 | 20261105080109_cef94b0d (:288–:415) | :309 `baseline_level_key()`; :352 scratch package; `my_listing(s)`, `listing_group_of` on scratch ads | reads-real-value-independent / uses-scratch |
| 15 | 20261105080110_25cc301c (:273–:388) | :319 `super_admin`; :322 scratch package; `admin_list_listings` / `admin_listing_detail` on scratch ads | reads-real-value-independent / uses-scratch |
| 16 | 20261105080111_811e9980 (:133–:293) | :145 `languages`, :205 published `legal_versions` | reads-real-value-independent |
| 16 | | :211, :270, :273 the scratch market's own row (free 1 → 2 → 1); :232, :260 `rate_limits` keyed by the scratch seller | uses-scratch |
| 17 | 20261105080112_4bb8208e (:151–:299) | :208 `super_admin`; :178 `baseline_level_key()` | reads-real-value-independent |
| 17 | | :217–:220, :258, :271 scratch packages and the scratch market's own row (free 1 → 3 → 1) | uses-scratch |

Result: after item 1, no proof among the eight files not yet on ethio-prod (10–17) depends on a reference value — nothing else to fix. Three depends-on-value sites remain in files already applied on ethio-prod (3 :316–:318 and its rank reads; 7 :246 / :320), and file 4 writes the real default market row inside its rolled-back block; applied files are not edited — reported for the guard this class owes.
