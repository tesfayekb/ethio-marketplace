# Handoff — 2026-11-16, the door turn F1-5a (the seller's posting doors on the door mechanism), instructions v1.19; records turn R16

Written by the supervisor at records turn R16. The repository is the record (G53); this file only speeds up the next session's §2 ritual.

## 1. Heads

- dev = main `32d824580` before this records turn (the merge of pull request #50, F1-5a).
- The published site is `32d824580` (the operator's Publish of 2026-11-15 23:48 New York after pull request #50; walked 4 of 4 at 23:53).
- Migrations: fifteen files landed in block S91 (F1-5a: `20261115203000` → `20261115204400`, marks `20261115220000` and `20261116030000` → `20261116031300`); ethio-prod and ethio-staging both stand at mark `20261116031300`, read back by the supervisor's connector (26 of 26 bodies at their declared md5; the two restored service-role grants true; scratch rows at zero).
- No lane is open. The branch `cursor/f1-doors-5a` is deleted. Lovable's project points at `dev`.

## 2. What closed since the last handoff

Block S91 of docs/spec/spec-ledger.md: records turn R15 (#49, 2026-11-15 14:33) and F1-5a (#50, 2026-11-15 23:13). F1-5a ran in two chats (DEC-387: Opus 5.5 for the census and the fifteen files, Sonnet 5.5 for the client, the routes and the tests), with three unplanned stops (S636, S637, the TR-14/`doorCall` question) and the planned migration stop; four rulings (the first three as files on the lane, the fourth as the option D text in the executor's dialog — `docs/governance/briefs/f1-doors-5a-ruling-1.md` → `-3.md`; the fourth in the report's §10 and §14); Cursor's provider outage of ~2 h between the first chat's `db:proof` pass and its push. The staging apply by the operator's paste from fifteen links pinned to `588c1d6df` after the supervisor had read every file (G75); the production apply by his paste from fifteen links on dev after the merge (the first message carried a wrong commit id — S642 — and was replaced before anything ran). Instructions v1.19 installed 2026-11-15; Knowledge v3.14 built and delivered, not yet pasted.

## 3. Decisions to know first

- DEC-391 — every owner door answers `notYourListing` for a row the caller does not own, whether or not it exists; `listingNotFound` only for the caller's own row gone.
- DEC-392 — the two lost service-role grants restored by F1-5a's first file; `grant-dropped` judges the result over the whole history and the file from floor `20261115000000`, no allowlist line.
- DEC-387 — the two-chat split: PASS twice (F1-4b, F1-5a); it stays for F1-5b.
- DEC-377 and DEC-386 — Lovable's judge stands at L1 MISS, L2 PASS; its third turn waits for the operator's paste of Knowledge v3.14 (`/home/claude/out/hk/lovable-knowledge-v3.14.txt` in the supervisor's records; 9,996 characters; sha256 `584cccd1ef41ef52f964d80929e2b6ee10c8ba9bcf1e814d583f4903d9546d03`).
- DEC-389 — the supervisor reads pull requests, runs and logs and opens Lovable's pull requests through its own GitHub connection; never a push, a merge, a close, a re-run or a setting (G76).
- DEC-384 — the staging carrier (three files or more, or any DROP: the operator's paste from one message of links); DEC-379 — findings never make a detour.
- Ruling 4 of F1-5a — `doorCall` answers a door's own machine code without a log line; a sentence no `translate` mapped is logged and answers `doorError` (`src/server/door.ts`; `docs/features/routes.md`).

## 4. Open incidents of this block and their owners

- INC-1170 (open; F1-7) — the posting doors' `rateLimited` lost its reset time; PR-7's `detail` assertion removed with this number, restored when `door_context`'s refusal carries the time.
- INC-1171 (closed; DEC-392) — the two lost service-role grants.
- INC-1172 (open; the rules turn) — a migration stop pushed without `bun run checks` whole; rule 30 and rule 60 gain the `checks:` line for every report that precedes a push; rule 10 widens to any source file added, deleted or moved.
- INC-1173 (open; the tests and CI turn) — the nightly's A-3 red of 2026-11-15 16:35Z and the two nightly entries that both fire.
- INC-1169 (open; the tests and CI turn, first item) — the Feed bench red since 2026-11-08.

## 5. Operator steps owed

- Paste Knowledge v3.14 into Lovable's Project Settings → Instructions (before Lovable's third turn); the supervisor reads it back through the connector and the mirror `docs/governance/lovable-knowledge.md` follows at the next records turn.
- His Cursor cost figures for 2026-11-15 and 2026-11-16 (DEC-387's measure).

## 6. Next, in order (DEC-379; block S91)

1. The tests and CI turn (Cursor, Opus 5.5): INC-1169 first; INC-1173 (the two nightly entries; the Flake check on A-3); INC-1165; INC-1168's guard on `lovable/*` pull requests with its DEC under G22; CF-BRIEF-21; DOORS-4 once; INC-1155; INC-1161.
2. Lovable's third judged turn (screen-only; the dialogs or the next wave-3 console), after the v3.14 paste.
3. F1-5b, F1-6, F1-7 (Cursor; the split stays).
4. The form kit's wave 2 (Cursor).
5. The rules turn: rule 30 (a door's body written out; the order law; the stop report's `checks:` line), rule 60 (the gate's last line in every report that precedes a push), rule 10 (the usage maps after any source file added, deleted or moved), rule 00 (the guard-demanded edit); migrations.md law 15; the GO template (`callee-codes`, BASELINE, the shape-key readers of `old-file-readers`, the readers-by-definition SCOPE sentence).
6. Instructions v1.20 (the rules in force since v1.19) when the next class closes or the operator asks.

## 7. The session ritual's reading order

docs/governance/handoffs/ (this file) → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (block S91) → /roadmap.md line 3 → the brief it names → branch ci-evidence (`ci-status.md`, `e2e-last-failure.md`, `guards-last-failure.md`, `flake-ledger.md`, and every scheduled workflow's status and failure files — G77) → the tail of docs/tracking/incidental-findings.md → `git log --oneline -15 origin/dev`.
