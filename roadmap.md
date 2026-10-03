# Roadmap (queue per brief 2026-10-01)

- [x] N2-a — unit asked above a later-ordered row (PW-88)
- [ ] S1
- [x] DEC-099 / INC-380 — pool resets by census (map + guard)
- [x] INC-379 — reference-row helpers exclude scratch rows, fixed order
- [x] INC-383 — PR-19 scratch-category leak; loud reaps; scratch roots ≥ 2,000,000; G28 roster search
- [x] INC-384 — CT-8 read a box mid-zoom; `settled(page)` after every overlay opener
- [x] INC-385 — fixed by DEC-104
- [ ] Bundle 1 (D+L+M app side, S2/S3, A, B, Part O, INC-371, INC-375) — items 1–8 done (PW-93..PW-109); S2 timing over target (edge p95 306 ms, DB p95 10.7 ms), stopped for ruling
- [ ] S2 / S3
- [ ] T (with T4 / DEC-095)
- [ ] A
- [ ] B
- [ ] C
- [ ] Part O (INC-369, INC-370)
- [ ] Part P (P1–P5; P4 migration)
- [ ] E census (incl. 7 "listing not found" lines, INC-364)
- [ ] Final full DEC-023 run

## Bundle 2 (2026-10-02, one migration)

Brief: docs/governance/briefs/bundle-2.md (read first every turn; steps 1–19).

- [x] Step 0 — brief saved to docs/governance/briefs/bundle-2.md
- [x] Step 1 (Part 0) — accepted as reported; totals, retries line and CI-5 cause reported at end-of-bundle run
- [x] Step 2 client half — contact-like.ts R1–R6, 34-row test (door half rides the migration)
- [ ] Step 3 — Other write-ins: client flags as typed (done); door rides the migration
- [ ] Step 4 — title/description: client flags as typed and on blur (done); door rides the migration
- [x] Steps 7–9 (P1–P3) — boxes nested, add controls below their boxes, marker line with Remove, even indent; PW-98/PW-99 amended, PW-110
- [x] Step 18 — INC-387: allowlist in the prompt text, no schema enum; server still validates; real call returned Sofa
- [ ] Part R — attr_contact_like (INC-382 R1–R6); Other write-ins; title/description; notes keep contactInNote
- [ ] Part S — sweep every 5 minutes
- [ ] Part P — P1–P3 done; P6 (step 12) done, one test; P4 directions and P5 left; step 9a: location box headed "Optional", never required (one test)
- [ ] Part Q — Q1 country picker (done, PW-111); Q2 phone2; Q3 last post's contact (done, PW-112); Q4 carry pin/directions/details only when the category lacks own_place; clear carried values on a switch to own_place (seller's own pin stays)
- [ ] Step 15a (DEC-105 approved; SQL drafted, rides the one migration) — own_place capability: cat_import_plan (8d182773) and categories_capabilities_check (fd11c7ab); no category row changed; tests: own_place blocks carry, without it carries, unknown token still refused
- [ ] Part U — INC-387 suggest icon (done; fallback flag + editor note ruled and landed); attr_option_shape ceiling 150
- [ ] Step 10 app side — Directions line, every set_listing_pin call restates street and directions, preview shows both (done; test owed: directions survive a pin move)
- [ ] Step 14 app side — phone2 behind "Add another phone", shown with the phone (done; test owed)
- [ ] Step 16 app side — pin/directions/details carry from the last post unless the leaf holds own_place; cleared on item-place change, Remove, or an own_place leaf (done; tests owed)
- [ ] Step 11 app side — sub-city indented under its city; "Add sub-city" adds another under the same city; city room counts distinct cities (done; test owed)
- [x] Browser proofs PW-113 (directions + step 5 + pin move), PW-114 (phone2), PW-115/116 (carry / own_place), PW-117 (two sub-cities) — 10 passed on both projects; red-first runs against the pre-change screens still owed
- [ ] Owed tests 3, 4, 17 (import refuses an unknown token); step 15 owed tests done (PW-118 draft-owned, PW-119 other seller)
- [ ] End-of-bundle DEC-023 run

## INC-373 (2026-10-01)

- [x] Revert package.json, bun.lock, routeTree.gen.ts to 2f600496 on dev; typecheck + AT-58 green locally
- [x] prettier roadmap.md (d9506a9c format:check red)
- [x] DEC-097 (b)+(c) built; adoption pending 3 green CI runs — DEC-097 E2E account pool: (a) census reported; (b) pool lanes + lease reaper; (c) per-run signed-in count line; adopt after 3 green runs
- [ ] D+L+M migration incl. S2 (rebuild after commit + pg_cron sweep with heartbeat, one round trip per search) and Part O readers via one shared helper
- [ ] S2 re-time (stop if warm p95 > 300 ms), S3, DEC-096 stranded-turn detector, T(+T4), A, B, C, Part O, Part P, INC-371, INC-374, INC-375, INC-381 — a second visibility key (a row shown only when two answers both match, e.g. pet = dog|cat AND product = food|treats); spec arrives with its prompt, E census, full DEC-023

## DEC-098 (2026-10-01)

- [x] stage 1: reporters publish to ci-evidence
- [ ] stage 2 after ADOPT: remove the six evidence files from dev with their paths-ignore and .prettierignore lines; DEC-096 detector
