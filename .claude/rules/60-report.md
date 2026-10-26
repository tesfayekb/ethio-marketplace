# 60 — The completion report (a committed file)

After your last code commit, write `docs/governance/reports/<brief-stem>.report.md` (the brief's file
name with `.report.md`) with exactly these headings, in this order; commit it on its own
(`turn NN: report`) and land (`bun .claude/hooks/land.ts`). The supervisor reads it from a fresh clone
of `dev`; it is part of the project record. `land.ts` refuses to push while a heading is missing, while
the report does not name the last code commit, while a landed path is missing from section 2, or while
the review line is missing, counts a BLOCKER or names another commit than the last code commit.

```
# Turn NN — <subject>
Base: <BASE sha> · Final commit: <sha of the last code commit> · Brief: docs/governance/briefs/<file> (sha256 <value>)
Review: <the reviewer's last line, word for word — READY · <n> BLOCKER · <n> MAJOR · <n> MINOR · on <the last code commit>>

## 1. Done / not done, by part and step
## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)
## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)
## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)
## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)
## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)
## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)
## 8. Strings  (every new or changed key with EN and AM text; "none" when the brief says No new string)
## 9. Migrations  (file, sha256, mark, apply pairing line; or "none")
## 10. Departures  (every difference from the brief with its reason; every STOP and ruling in the turn)
## 11. CI  (the first six lines of ci-status.md for the last landed commit you can read, with the two-step SHA check; "this landing's run has not completed" when it has not)
## 12. Limits  (what you could not run or prove, and why — logs unavailable, no browser, no secret)
```

Rules of the report:
- Every number comes from a command you ran in this turn. Totals, counts and file lists are pasted,
  not remembered.
- A heading with nothing to say says "none" — after the check that proves it, which you name.
- A departure is anything the brief did not ask for: a changed line outside its CHANGEs, a skipped
  step, a helper added, a test loosened, a file touched by a ruling. Each one has its reason and, when
  a ruling allowed it, the ruling's words.
- Section 3 is the behaviour contract: for each touched route, door, screen or function, the answer
  table as read at `<BASE>` beside the new one; every status, word, body, header, signature and result
  is today's except the brief's numbered CHANGEs. Anything else that differs was a STOP — if it is in
  this section, it was ruled.
- Section 6 is never empty by omission: list the greps you ran.
- The report is honest about its own gaps (section 12). A report that claims a check it did not run
  is a defect of the same class as a test that cannot fail.
