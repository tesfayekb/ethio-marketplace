# Foundations turn D1 — stop 16 (M6c-1: BLOCKED on transcription drift, nothing applied)

## 1. What this stop covers

Ruling of stop 15, item 4: M6c (INC-951 3c, the import commit/undo doors gated with
import_commit / import_undo in the database), at or under 25 KB from the start. M6c-1 is
admin_commit_category_import plus the two rate_dials rows. It is BUILT and verified but
NOT applied: two inline submissions drifted in transcription and the in-migration proof
rolled both back whole. ethio-prod is unchanged (verified after each attempt).

## 2. M6c census findings (before any writing)

- The route calls EIGHT commit/undo doors, not seven: commits admin_commit_category_import,
  admin_commit_attribute_import, admin_commit_location_import, admin_import_translations;
  undos admin_undo_category_import, admin_undo_attribute_import, admin_undo_location_import,
  and admin_undo_import (the translations undo —
  src/routes/api/admin/translations/import.ts:17). The stop-10 ruling's "seven" is a
  miscount; the ruling's principle (every import family's commit AND undo) covers all eight.
  M6c gates all eight unless ruled otherwise.
- rate_dials has NO import_commit or import_undo row (the route dials are app-side only so
  far). M6c-1 adds both at 120/3600 (the stop-10 ruling named import_undo's row; the
  import_commit row is its twin and the database gate needs it).
- Door sizes (prosrc bytes): category commit 15,126 / undo 11,411; attribute commit 18,742 /
  undo 12,918; location commit 12,966 / undo 8,158; translations commit 3,877 / undo 2,694.
  Split by door under the 25 KB standing rule: M6c-1 category commit, M6c-2 category undo,
  M6c-3 attribute commit, M6c-4 attribute undo, M6c-5 location commit + undo,
  M6c-6 translations commit + undo.
- Stop-15 ruling 2 (a proof's first call is refused before any write) shaped M6c-1's proof:
  the commit door never validates p_digest (it only lands in the audit meta) and even an
  empty plan ends in a log_audit write, so the first call uses a SCALAR p_rows — the plan
  phase (all reads, cat_import_plan runs before the door's first write) raises on it before
  anything is written. Never a real commit.

## 3. M6c-1 built and verified (script /tmp/m6c/build-m6c1.py)

- /tmp/m6c/m6c-1.sql: 23,689 bytes, sha256 e7e04107d502b0b30a2dd5d4a1fdf5308bee9bf1b337a80ae9314a044195ac56,
  mark 20261029120000.
- The script re-verified against the live body fetched base64: stripping the gate returns
  the live body exactly (old md5 7c2eb7f578e6563202030ef98395edbc, new
  408a218fcb132983ffd06a1d2db32dc0); the gate sits after the step-up line and before the
  first write; header and ACL restated unchanged. check-migrations.sh: real-row guard OK,
  migration guard OK.

## 4. Two apply attempts — both rolled back whole by the drift guard

1. Applied md5 7ca2d30bc93748dc07382bc513f0c203 ≠ expected 408a218f…. Diagnosis: a
   write-then-diff rehearsal found three transcription errors in my typed text (a lost `>`
   in `->>'display_order'`, two one-space indent shifts). Fixed and resubmitted.
2. Applied md5 9590d5c6bd56f588774ef8eb8e46cc73 ≠ expected — drifted ELSEWHERE. The drift
   is non-deterministic across generations of a 15 KB body.

After each: mark 0, no rate_dials rows, live body md5 still 7c2eb7f5…, no gate. Nothing was
written; the proof — the drift guard — caught both.

## 5. The blocker and the proposal (needs a ruling)

The migration tool takes inline SQL only; a 15 KB function body transits my typing, and my
typing of a body this size drifts by a character or two per attempt. The proof makes this
safe (every drift rolls back whole) but not convergent.

Proposed (a): compute the new body IN SQL inside the migration — capture the live prosrc,
verify its md5 (7c2eb7f5…), insert the gate line after the step-up line with replace(),
verify the computed md5 (408a218f…), then CREATE OR REPLACE … AS $function$ via EXECUTE of
the computed text, and verify the applied md5 after. The body never transits my typing, so
the apply is drift-proof by construction; the file still carries the header, both md5s, the
gate text and the anchor line. TENSION WITH E2: the file would not contain the literal
whole body — the definition is re-declared whole at runtime, but the file shows the anchor,
not the 15 KB text. E2's "re-declare it WHOLE … in-file" exists so the file is reviewable;
here reviewability would come from the two md5s plus the supervisor's live diff (the M5b
pattern).

Alternative (b): the supervisor applies the verified scratch file through a channel that
takes files (the connector is read-only on ethio-prod per DEC-246, so this needs another
path).

Alternative (c): more transcription retries. Each is transactional and harmless, but the
per-attempt drift rate on a 15 KB body makes this a lottery.

The remaining M6c parts (attribute commit is 18.7 KB) have the same exposure, so the ruling
should cover the series.

## 6. IG-6

Not run. Still waiting on the supervisor's confirmation that staging is level through cat2b
(expected in this ruling at the latest — not seen).

## 7. Files modified this turn

- docs/governance/reports/foundations-turn-d1.stop-16.md (this report)

Scratch (not landed): /tmp/m6c/build-m6c1.py, /tmp/m6c/m6c-1.sql, /tmp/m6c/submit-test.sql.
No migration file was created; ethio-prod is byte-identical to the stop-15 state.
