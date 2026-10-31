```text
RULING — the next-five plan approved with rulings, then turn A built: the budget instrument (INC-1003 and INC-1021's class, third occurrence). Base: dev e195034e. Tier B. No migration, no new dependency, no new string, no app code. Lovable. Saved as docs/governance/briefs/foundations-turn-a-budget.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-a-budget.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

THE PLAN (.lovable/plan.md at e195034e) IS APPROVED, with these rulings (the supervisor, under G17; overridable):
- Premise 1 accepted: turn C opens with the full census of the current-item consumers.
- Premise 2 corrected: the dark card's edge is not `--border`. It is the 1 px ring at the head of the dark `--lift-card` (src/styles.css :510, `0 0 0 1px oklch(0.298 0.016 163.6)` = #26302B), so 1.32 : 1 against the page is its measure. Turn B still measures every pair live before setting values.
- Premise 3 ruled: the NEAR band is 0.3 KiB (DEC-296), held in one constant. A ceiling is floor(size + 0.3) + 1 from CI's own size. From a local size, first add 0.1 KiB (DEC-296's local allowance), then apply the same form. The two comments that state the form differently are corrected to this.
- Order approved: A → D → B → C → E, with one condition for D.
  - D's migration is applied on ethio-prod by your tool when you save it, once the operator allows the "Modify Supabase database" dialog. So D's stop report follows that apply and carries its read-back (G39). The supervisor applies the same file on ethio-staging from dev.
  - D needs the operator at hand for that dialog. If he is away when D comes up, B goes first and D follows.
- Every turn of this plan stays small enough that its full checks and its report fit inside the turn (S500).

TURN A — what is true at the end
- One constant NEAR_KIB = 0.3 and one function ceilingFor(size) = floor(size + NEAR_KIB) + 1, in one module read by scripts/check-bundle-size.mjs (the entry and the stylesheet) and scripts/route-budgets.mjs (the pages).
- The guard: the budget check fails when any measured size is less than NEAR_KIB below its ceiling. That covers every page, the entry and the stylesheet. Its message names the page, its size and ceilingFor(size) (DEC-296). A unit test proves it on planted cases: a ceiling 0.1 KiB over its size fails, one 0.3 KiB over passes, and the entry and the stylesheet are judged like the pages. It is wired in scripts/conformance/wired.test.ts.
- The census: every page ceiling and the entry ceiling that sits inside the NEAR band rises to ceilingFor(size). Use CI's sizes where the evidence prints them (398a5859's failure body, or d2e9bb36's if it has published); otherwise use your production build's size + 0.1. Each line keeps its causes and names "DEC-296 (turn A)". A ceiling already outside the band stays as it is (no lowering in this turn), and the stylesheet keeps its 40 KiB cap, still judged by the guard.
- No browser code changes, so no page grows.

CI FIRST: read the run on d2e9bb36 (it may still be running; read it again before your push). Any red is fixed first, from its failure body.

TESTS: the new unit test; the budget check itself, run on your production build (`env -u VITE_E2E`, as in S2-3); `bun run checks` once on the final tree, run whole, with its last line pasted (no FAIL), and the unit suite's full count.

SCOPE (by area): scripts/check-bundle-size.mjs, scripts/route-budgets.mjs, the shared module for NEAR_KIB and ceilingFor, scripts/conformance/** (the guard's test, wired.test.ts); the standing docs allowance (the register row in docs/governance/mechanisms.md, one docs/_changelog.md line).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-a-budget.report.md:
- step 0's sha256;
- the CI line for d2e9bb36, with any red classified;
- the guard and its planted cases;
- the census table: page, size, its source (CI or local + 0.1), and old → new ceiling;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only e195034e.
```
