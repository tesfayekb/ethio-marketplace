RULING — ci-time, stop 1: the instance table and its guard, two workers, Part C builds nothing (the rule decides), CF-BRIEF-19. Base: cursor/ci-time 5a969c237.

The census is accepted whole, and its corrections of the brief stand (the base, `LANE_WORKERS`'s line, the reserved id, the three numbers of PREVENTION). Parts A and D as built are accepted for the verification at the close. Build Part B by this ruling; the brief is not rebuilt. Save this ruling by scripted copy, BARE, as `docs/governance/briefs/ci-time-ruling-1.md` (sha256 as the operator's line gives it) in this ruling's first commit, with the first full run's numbers added to the census file, and name it in §10.

PREVENTION (G70). Root causes, as classes:
(1) Part C's rule admits nothing. The supervisor expected a cut from a number it had not read lane by lane: "226 seconds a lane" is the slowest lane's time (the median is 185), and the two large parts of it — the image load and the backend's start — are work each machine must do for itself, so no hand-over removes them. Class: an expectation written before its measurement (G5, G68 MAGNITUDE). The frozen rule did its work: it refused eight cuts without a ruling. Nothing changes in the rule.
(2) CF-BRIEF-19 was queued for this turn by the app-fixes turn's ruling 2 and is not in the GO. The supervisor wrote the GO from its notes and did not read the earlier rulings and reports for the items they queued for "the CI turn" (G40). Class: a queued item that lives only in the ruling that queued it. Fix as code: the template's census line of item 6, which the next GO must answer.
Repository: item 5 (CF-BRIEF-19) and item 6 (the census line). Instructions: v1.18 — the GO's pre-flight reads what earlier rulings, reports and roadmap lines queued for the turn. Cursor rules, Knowledge: not needed. Stops this turn: one, the planned one.

1. PART B — THE INSTANCE TABLE, as your table has it, with one condition.
   - B1 (MON-16, MON-17): the root fix as proposed — `seedProduct` places a scratch level after every real level; both tests lose their fixed first position.
   - B2 (LG-33): the root fix, keyed — NOT the tag. Condition: the snapshot keeps every real level AND every row LG-33 itself made; only OTHER tests' scratch rows are left out. Positive control (G38), run once locally and restored, named in §5: with a real level's rank moved by hand inside the test's window, LG-33 fails.
   - B3, B4, B5 (IB-1, IB-2, LG-32, NCQ-E2E-3): `@global-state`, as proposed, each with its reason in the annotation.
   - A new instance met while building is handled by the brief's law (root fix when the moved value is not the thing under test, otherwise the tag) and named in §10. Not a stop.

2. THE GUARD — CF-LANES-4, as planned.
   - The manifest `scripts/conformance/shared-value-tables.txt` (new) in the form you propose (table | why shared | doors | sanctioned helpers); the allowlist `scripts/conformance/shared-values-allowlist.txt` (new), each line with its reason and an expiry (a date or an INC).
   - Recognition as you propose; the helper is the unit. Proven on a planted untagged writer, and on a planted stale allowlist line.
   - Growth, by rule: if the migrations' statement-level triggers can be listed by one authored pattern, the guard also asserts that every table carrying one is on the manifest or on a line "read, not shared | why". If they cannot be listed reliably, write one roadmap line in §14 and go on. Not a stop.

3. TWO WORKERS — commit 2 as planned: two on the lanes the plan splits, one on the smoke, e-mail, WebKit and repeat lanes; every text in your old-file-readers list in the same commit; CF-LANES-3 pins both numbers.
   DEC-378 (a)'s time judge is measured as you measured the base: from the run's creation to its last job's end. The base is 1,137 seconds (run 43463527584). The judged run must take 957 seconds or less; otherwise the knob returns to one in one further commit, by the rule, and the turn ends there.

4. PART C BUILDS NOTHING. The four-clause rule refuses all eight cuts, and a frozen rule is not set aside by a ruling. Record in §10 the table as it stands, and in §14:
   - DEC-378 (c): "no cut met the rule".
   - One roadmap line each, with its measured saving, for the three cuts that have one: the image load overlapped with the other start-up steps (C5); Component tests split (C8) — both in the before-launch list's tests-and-CI group; twelve split lanes instead of sixteen (C7) — attached to the decision "CI's cost once the repository is private", to be read after DEC-378 (a)'s five runs.
   - This push's own full run: its numbers go into the census file in this ruling's first commit, as the brief says.

5. CF-BRIEF-19 — built here, in Part B's first commit (`scripts/brief/go-laws.ts`, its self-test, `wired.test.ts`). The law, as the app-fixes turn's ruling 2 words it: for every INC or DEC a brief's RECORDS say it fixes or changes, each file under `scripts/` that names that id lies inside the brief's SCOPE, or the brief says why not. Self-tested on a planted brief (one violation, one clean). How an id "fixed or changed" is recognised in a brief's text is yours to decide and name. A finding it makes against this brief is expected output: name it in §11 and allowlist it with that reason.

6. THE TEMPLATE — one new census line in `docs/governance/go-template.md`, after the `findings` item, in the same commit:
   `<!-- CENSUS-ITEM: queued -->`
   `- queued — every item an earlier ruling, a report's §13 or a roadmap line queued for this turn (rg the turn's name across docs/governance/briefs, docs/governance/reports and roadmap.md), each marked built here | left (where).`
   This brief's answer, for CF-BRIEF-15:
   CENSUS-ITEM queued: covered — CF-BRIEF-19 (the app-fixes turn's ruling 2), built by item 5; rule 20's J8 line (the app-fixes report §13), built in Part A; the roadmap's three open "CI turn —" lines (one redaction module, the CLI pin read once, the backend-images job's derived config) are read at their files in the report's §13 and marked done (by which turn) or still open — not built here.

7. THE CHECKER'S OUTPUT. At `--at 4dd6cad55` the list law's finding against this brief (the brief allowlist, no cited reader at that commit) is the expected output of a law this turn adds: name it in §11 and allowlist it with that reason, as the template says. The two findings on the lane's own tree come from Part A's edits and are not the gate's command; nothing is done for them.

8. RECORDS (changes to the brief's §14 text; the rest stands, the executor fills the brackets):
   - DEC-378 (a): the time judge reads "from the run's creation to its last job's end: 957 seconds or less against 1,137 (run 43463527584)". (b): "yes — its one CI reader runs in Component tests, which a proven tree still runs". (c): "no cut met the rule; three are kept as roadmap lines with their measurements".
   - INC-1136: the five rows of your table and what the build did to each.
   - The brief's PREVENTION (3) is corrected in the record: 226 seconds is the slowest lane's time before its first test, the median lane's is 185; the waits are 66 to 151 seconds on the last lanes; the cause is the limit of twenty concurrent jobs, read from the jobs' times.
   - register rows and the changelog line as the brief has them, without "the cuts kept".

9. ORDER. This ruling's first commit (the ruling saved bare, the run's numbers in the census file) → Part B commit 1 (the fixes, the tags, the manifest and CF-LANES-4, CF-BRIEF-19, the template line) → Part B commit 2 (two workers) → the gate (step 6 as Part A leaves it) → the self-review → ONE push → the report while CI runs.
   The run on 5a969c237 may still be running: read it again before your push. A red in it that names a path Parts A or D changed is fixed at its cause in Part B's first commit; any other red is named under Limits.
   A stop is only for a security finding, a cut or fix that needs a file outside the brief's SCOPE, or a change to what a job proves.
