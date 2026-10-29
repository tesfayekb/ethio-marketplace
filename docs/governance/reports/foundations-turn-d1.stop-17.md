# Foundations turn D1 — stop 17 (M6c-1 APPLIED; M6c-2…6 and M7 pending)

## 1. What this stop covers

Ruling of stop 16: IG-6 first (staging level through cat2b), then the M6c series by
computed insertion (option a), then M7, then THE CHECKS and the final report, without
stopping between parts. A time warning ends the turn after M6c-1; the rest continues
next turn.

## 2. IG-6 — GREEN

`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome bun run e2e:local -- e2e/import-security.spec.ts`:
**36 passed (18 tests × desktop-1280 + mobile-360), 0 retries, 5.6 min**, including
IG-6 itself (the import audit row is written only by a caller who may run that family's
import). Log: /tmp/ig6-run.log.

## 3. M6c-1 — APPLIED on ethio-prod

- File: `supabase/migrations/20261029*_*.sql` (written by the migration tool this turn;
  the scratch it was submitted from is /tmp/m6c/m6c-1.sql, sha256
  8d224f93c09d9be116d23034812fa923513dc402a8f5210eb835c665e81186e5, 10,157 bytes).
- Mark `20261029120000` read back on ethio-prod.
- rate_dials rows born: `import_commit=120/3600`, `import_undo=120/3600` (read back).
- admin_commit_category_import: applied body md5 `c94a815cb615b4fe32270642423c6815`
  (read back; equals the expected new md5), gate after the step-up line, header and ACL
  unchanged (asserted in-migration).
- Behavioural proof passed in-migration: first call (scalar p_rows) refused by the
  door's own validation before any write; with import_commit overridden to 1 and the
  window spent, the next call is refused `rateLimited` and writes nothing (revision,
  category, audit and rate-limit fingerprints unchanged).

## 4. Method notes for the series (ruling 3 conditions, all enforced by RAISE)

- Old md5, anchor uniqueness (exactly 1), new md5, live-header CREATE OR REPLACE via
  EXECUTE, post-apply asserts on prosecdef/provolatile/proconfig/proargdefaults/ACL and
  the applied md5 — all in the DO block.
- Two drift lessons, both caught by the in-migration proof with full rollback
  (verified: no mark, no dial rows, old body md5 after each failed attempt):
  1. The proof's gate text must ride in the VALUES row as ONE E-literal; rebuilding it
     by plpgsql concatenation is not byte-equal to the applied gate.
  2. The insertion leaves a blank line after the gate (the gate text ends with \n and
     the anchor's own terminator follows), so the proof's strip is
     `replace(v_src, v_gate || E'\n', '')`.
- The md5 pairs are the database's own, computed with the single-literal gate form
  (verified byte-exact against the builder: gate md5 42a6d556194add422e721eac341cde23,
  anchor md5 06677866388d542b6aaeb7c71d95ba00, em-dash md5 26aeabd0c99c77002e55825fbcd435af).

## 5. Remaining (next turn, same builder output, already generated)

| part | door(s) | mark | old md5 | new md5 |
|---|---|---|---|---|
| M6c-2 | admin_undo_category_import | 20261029130000 | 47e09d29028884df55c32f4d5ccc48cf | 9a2f2192ba818430a5b979c2ae94dd84 |
| M6c-3 | admin_commit_attribute_import | 20261029140000 | d5d95e418ce4cec746a1bf10a0d33b2b | 2872c54d63664ce53df08c44183be3b1 |
| M6c-4 | admin_undo_attribute_import | 20261029150000 | 19cf152970e46977e09ebcd004c33a7e | 301fb4da41a13aff94df86ba2739b5c2 |
| M6c-5 | admin_commit_location_import + admin_undo_location_import | 20261029160000 | ff6537cbe59100921b3bc263a783db46 / b531317ca36fab5b060c1008ecec8e8d | 01365b40f7c61055d5389d267da9a09f / c4168e1ff2402a72509cb643441f97dc |
| M6c-6 | admin_import_translations + admin_undo_import | 20261029170000 | d9480129cde6ed8ccf23a4b8fb249d77 / ee0e979fa9b96654b5329ede136d0711 | 1a043985654770be62cdf12358c7b269 / 9f49201faa7c3284707c3e51a41b9f40 |

Scratch files: /tmp/m6c/m6c-2.sql … m6c-6.sql (builder: /tmp/m6c/build-series.py).
Then M7 (INC-939 bucket size via the bucket tool + INC-969 storage-policy narrowing,
census of storage.list / from('category-assets') callers first), THE CHECKS (including
the ci-guards.md line for the computed-insertion rule), the reviewer, the final report.

## 6. Limits

- The linter notes 232 pre-existing findings (extension in public; SECURITY DEFINER
  execute grants) — predating this migration, unchanged by it.
- M6c-1 took three submissions: attempt 1 (proof gate rebuilt by concatenation — not
  byte-equal) and attempt 2 (strip missed the blank line) both rolled back whole; the
  drift guard worked as designed.
