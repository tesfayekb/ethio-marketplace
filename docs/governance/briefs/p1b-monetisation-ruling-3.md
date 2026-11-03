# P-1b — ruling 3 (M-a's proof calls into smallint parameters)

```text
RULING — P-1b, turn (a), ruling 3: M-a's proof calls into smallint parameters (CI red on the temporary backend, second run). Base: cursor/p1b-monetisation at 8baad172f.

MODEL — Claude Fable 5.1 (High), this same chat. Fix, push, END THE TURN — a third migration stop.

1. THE RED
Run 41585603042 on 8baad172f: the table changes of M-a now apply (ruling 2 took); every lane's backend start fails in M-a's proof —
   ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
Cause, read in the file: the proof passes a bare integer literal where the door declares p_max_photos smallint; Postgres does not cast integer → smallint implicitly in a function call, so no candidate matches. Seven call sites in the proof block: lines 634 (5), 673 (3), 703 (1), 708 (31), 709 (1), 710 (1), 716 (31). The doors keep smallint — M1a's admin_set_coverage_plan(… p_max_photos smallint …) is the precedent, and M-d's own proof already writes 2::smallint for p_step.

2. THE FIX (M-a only; file name kept)
a. At each of the seven sites, cast the photos literal: 5::smallint, 3::smallint, 1::smallint, 31::smallint, 1::smallint, 1::smallint, 31::smallint. No door, grant, allowlist line or mark changes; the stop report's M-a sha256 line is updated.
b. A sixth point joins the pre-stop scan, run on all four files before the push: every literal a proof passes to a function matches the declared parameter type — a smallint parameter takes n::smallint, never a bare n (unknown-typed NULLs and quoted literals are fine). State in the three-line report which sites it found in M-b, M-c and M-d (I expect none: M-d casts, M-b and M-c declare no smallint parameter).
c. bash scripts/check-migrations.sh and bun run checks as before; push; END THE TURN with the three lines — I read the run myself; the staging apply follows a green backend start.

3. RECORD (mine, for the records turn)
INC-1045: proof calls with bare integers into smallint parameters (M-a, first run on CI's backend); class rule = §2 b; no static guard this turn — a reliable check needs a SQL parser, and CI's temporary backend is the running guard (it caught both defects of this turn in one run each).
```
