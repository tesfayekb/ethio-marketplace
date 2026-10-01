# Roadmap (queue per brief 2026-10-01)

- [x] N2-a — unit asked above a later-ordered row (PW-88)
- [ ] S1
- [ ] D + L + M (one migration, census first)
- [ ] S2 / S3
- [ ] T (with T4 / DEC-095)
- [ ] A
- [ ] B
- [ ] C
- [ ] Part O (INC-369, INC-370)
- [ ] Part P (P1–P5; P4 migration)
- [ ] E census (incl. 7 "listing not found" lines, INC-364)
- [ ] Final full DEC-023 run

## INC-373 (2026-10-01)

- [x] Revert package.json, bun.lock, routeTree.gen.ts to 2f600496 on dev; typecheck + AT-58 green locally
- [x] prettier roadmap.md (d9506a9c format:check red)
- [x] DEC-097 (b)+(c) built; adoption pending 3 green CI runs — DEC-097 E2E account pool: (a) census reported; (b) pool lanes + lease reaper; (c) per-run signed-in count line; adopt after 3 green runs
- [ ] D+L+M migration incl. S2 (rebuild after commit + pg_cron sweep with heartbeat, one round trip per search) and Part O readers via one shared helper
- [ ] S2 re-time (stop if warm p95 > 300 ms), S3, DEC-096 stranded-turn detector, T(+T4), A, B, C, Part O, Part P, INC-371, INC-374, INC-375, E census, full DEC-023

## DEC-098 (2026-10-01)

- [x] stage 1: reporters publish to ci-evidence
- [ ] stage 2 after ADOPT: remove the six evidence files from dev with their paths-ignore and .prettierignore lines; DEC-096 detector
