# RULING — P-2 (c) c3, stop 2 (the seller-name census and the computed body): option 3 — the law gets a live judge in the smoke lane; the file census skips computed bodies and says so. Base: cursor/p2-fold 5efed5e8c.

Save this file by scripted copy as `docs/governance/briefs/p2-fold-c3-ruling-2.md` (INC-1076) in your first commit after it. It names one file outside c3's list for rule 50: `.github/workflows/local-backend-proof.yml` (one step in the smoke lane, nothing else in it).

## 1. The finding is right; option 2 is refused; option 1 alone leaves a hole

`validate_listing_draft`'s last event is a computed insertion (20261107125358:78) and its live body reads the seller's name — the file census can neither see that body nor judge it. Option 2 (judge the last readable text) is INC-1083's defect kept on purpose: a stale body judged as if current, blind to a name read a later insertion adds. Option 1 alone leaves the one function the law most needs judged unjudged "until it is next written in full". The class is "a file reader cannot see a computed body"; the system that already answers it is the door guard's live half (`check-doors.ts --live-query` / `--live`, the smoke lane, DEC-333): the live catalogue is the authority for what the files cannot show.

## 2. Ruled (DEC-359)

- **The file census as option 1:** `seller-names.test.ts` moves onto the reader (your saved copy), skips every `computed` function with its reason printed, and treats a computed function's allowlist line as JUDGED LIVE — never stale on the file side (`validate_listing_draft`'s line stays).
- **The live judge:** `scripts/conformance/seller-names.ts` (new) holds `nameReaders` and the allowlist reading, shared with the test, and takes `--live-query` (prints the SQL: every `public` function's name and `prosrc`, comments stripped on the TS side, the pattern of `scripts/doors/live-query.sql`) and `--live <tsv>` (judges every live body against `HELPERS` and the same allowlist: an unexcused reader fails; a line whose function is not live is stale and fails; the self-test on planted rows runs first and judges nothing until it passes — the check-doors form). The smoke lane runs it as one step after the door guard, in `.github/workflows/local-backend-proof.yml`, `if: matrix.lane == 'smoke'`, feeding the psql TSV from `RUNNER_TEMP` (DEC-310's form); `wired.test.ts` names the caller; `actionlint -shellcheck= -pyflakes=` on the workflow.
- Proof: the planted rows (a live body that reads `seller_alias` with no line → one finding; the same with a line → none; a line for a name not live → stale); and the first CI run of this lane shows the step judging 17 live readers with the existing allowlist (your report quotes its line).
- Records: DEC-359 — the seller-name law has two halves: the file census for readable bodies, the live judge in the smoke lane for every body, computed ones included; INC-1083's register row gains it. The two census corrections (NCJ-13; eleven templates) go into §13.

## 3. Then

The rest of ruling 1 §4 in its order: FE-13, the three siblings, the usage maps, then M-3c-c last, push, END THE TURN at the MIGRATION stop. Stop before that only for a question none of the rulings answers.
