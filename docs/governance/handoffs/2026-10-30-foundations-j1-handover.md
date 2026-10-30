# Handoff — 2026-10-30, the Foundations bundle after the locale work (L-1, L-2) and J-1; records turn R8

Written by the supervisor at records turn R8. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev `8e7feb84` before this records turn (turn R1a-2; its run pending); main `9d3e46d6`. J-1's final commit `f66ca04c` is green (run 40981493608, 0 flaky).
- Both databases, ethio-prod and ethio-staging, stand at mark `20261030050000` (J-1's migration 20261029233828_4aaa2474, sha256 ebf20266…61c9): ethio-prod by Lovable's tool after the operator's Allow, ethio-staging by the supervisor's Supabase connector (DEC-246); the five redeclared functions and four constraints are equal on both by hash.
- The published site: `444acdf3` (2026-10-29 22:52Z) until the operator's Publish of J-1, asked for at 01:06Z; the Lovable preview carries everything since.
- Side branches: eleven lovable-* (the known set).

## 2. What this stretch built (block S83)

- Turns L-1 and L-1b: src/lib/locale.ts and src/lib/format.ts, one formatter per intent (register row 16); an Amharic month is always written in full (INC-985); CF-FMT-1/2; LF-E1.
- Turns L-2 → L-2d-3: src/lib/reader-locale.ts (collatorFor, formatCountryName, compareCodes); page heads through src/lib/page-head.ts, base-first on the server and re-titled in the browser by page-head-client.ts loaded on demand (INC-990, DEC-300); 44 head keys in EN and AM; CF-HEAD-1, PGH-1…6, PGH-E1/E2.
- Turn J-1: DEC-296 (ceilings on CI's size), DEC-297 (needs_review after five unusable answers, still public), DEC-298 (the provider's schema derived from the task's output), DEC-299 (refusal lines; lost calls closed); switchLanguage waits for a closed menu before and after a pick (INC-1004; DEC-301 retires INC-715's avoidance rule).
- Turn R1a: one shared place pick for the tests (INC-948); an open menu no longer moves the page (INC-1005: src/styles.css, CF-SHIFT-1, OVS-1/OVS-2).
- Knowledge v3.12 live; mirrored by this records turn.
- The walk of L-1 and L-2 on the published site passed (2026-10-30 00:34Z); its one finding is INC-1005.

## 3. State of each agent

- Lovable: this records turn, then R1b in the same turn (the sub-menu mechanism, foundations-turn-r1a.md items 5–11). R1a's two parts landed: the shared place pick (INC-948) and the overlay-shift fix (INC-1005).
- Curator: idle, as block S76 left it.

## 4. Operator steps owed

1. Publish when the supervisor reports a landing green and asks for it.
2. The walks of redesign Part 1 as its turns land (on the preview).
3. The migrations that wait for him: D242's tier control; N1b-1 M3's proof fix (INC-999); the locale work's SQL part (23 functions onto base_languages(), INC-954's database copies).

## 5. Open questions and owners

- INC-715's avoidance rule ("a test never switches the language back"): retired by DEC-301 after PGH-E2 passed --repeat-each 12 on both projects (24 passed).
- INC-1006's class census (a test that compares a rounded figure with a second rounding) — the next turn.
- DEC-284 KEEP: the old port reservation's release — a roadmap line.
- The job's separate 'unusable' count on the run and the health line (INC-1002 follow-up; a migration) — roadmap.
- The D239 flash after sign-in: a plan and a DEC — supervisor (unchanged from block S82).

## 6. Next planned action

- R1b (the sub-menu mechanism and its guard), then R1c (the marketplace tree and the folded rail) and R1d (the admin groups, the account and seller panels, the phone split); the operator walks each on the preview.
- Then redesign Part 2 (the Sage 3D look, DEC-289) without D242's control, the speed work, the rest of the Foundations bundle.
