# P-1 — ruling 3, on stop 1 round 2 (M1c only)

```text
RULING — P-1, stop 1, round 2 (M1c only). Base: dev 94249bf8; branch head 770d0c02.
**MODEL — Claude Fable 5.1 (High), unchanged.**

1. M1a and M1b are APPLIED on ethio-staging (read back by me: the three plan columns; `admin_set_coverage_plan`'s new body, prosrc md5 855f4bcc652283b1abd5b32eaf83d655 = the file's; `listing_packages` with its two seeds; `package_prices`; `package_price_for`; the `packages` resource; marks 20261102220000 and 20261102230000; no scratch row). They are not re-applied.
2. M1c FAILED at its last check, cleanly (no door, no mark, no scratch row on staging): `P0001: P-1 M1c proof (d-h): a refused call wrote` (line 438). My reading of the proof, as a hypothesis until your run confirms it: the check expects three `package.saved` audit rows for `v_pkg` (line ~433), but the proof makes exactly two successful package saves — the create (line 269) and the edit (line 298); the rate-limited call (line 287) and every refusal write none, and the check itself asserts `<> 1` after the create and the dial test. So the expectation is 2, not 3; the other five conditions (4 price rows, days 14, `v_h`'s `valid_to` = now() + 3 days, 4 `package_price.saved`, 1 `package_price.ended`) match the calls I count. Fix the number if your count agrees; if it does not, find the real cause before you change anything.
3. Whatever the cause, split that final check into one RAISE per condition, each naming the condition and the values it saw (`'P-1 M1c proof (d-h): package.saved rows % expected 2'`), so a failure names itself — INC-1033's class rule for every proof from here: no composite check with a single message.
4. Same file, same name, same mark `20261103000000`; commit `p1-packages: M1c proof — the audit count and one message per condition (INC-1033 d)`; the stop report's sha256 for M1c in a new commit; the four-check scan plus the fifth on M1c; push; stop again with M1c's pairing line only. The operator re-applies M1c alone.
```
