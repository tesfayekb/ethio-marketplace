Source: supervisor thread, turn 1250, 1252, Sat 2026-10-03 16:06 New York.
Status at 2026-10-04: approved by the operator on 2026-10-03 16:13 with his words "agree with your recommendations. yes next step. make sure everything is secure and doesnt cause further issues."; built as bundle 3 Part 0 (scripts/e2e-select.ts); the ten-run tally of the decision rule has not been recorded anywhere.
Related: DEC-114, DEC-115, DEC-119, G22.

Yes. From the next brief on, Lovable gets larger bundles and runs far fewer tests per turn. Nothing goes to it now, since it is mid-task.

**Where the hour goes, and what changes**

- **The long local run goes away.** Lovable was re-running all 1,022 tests on its own machine. From now on it runs only the tests for the screens it changed, which fits in one turn. CI already runs the full set on every commit, and I read that result myself.
- **Tests run once per turn, not once per step.** Lovable builds every item it can in a turn, then tests them together.
- **The "fails on the old screen first" proofs are batched.** One run at the end covers all the new tests, as Lovable did this morning.
- **You only send "continue".** Interim reports do not need to come to me unless one asks for a ruling or reports a failure.

**Fewer, larger bundles**

I am regrouping the list I gave you from about six bundles into three, by the screens each one touches:

1. **Contact and seller name.** The contact permissions fix, "Show number" for signed-in buyers, and all the seller-name rules. One database change.
2. **Wizard.** Everything in the wizard group, plus three smaller items that touch the same screens: the shop-or-office tick, the "right to sell" statement, and the pin rule. The four engine items the curator is waiting on also join it. One database change.
3. **Close-out.** Speed checks, CI housekeeping, the records turn and the final run.

The later features (several sizes, discounts, camera and photo clean-up, AI screening of typed text, admin limits, the requests inbox) follow as two feature bundles.

**The trade-off**

A larger bundle means one longer walk for you at the end instead of several short ones. A defect found late also touches more work. I think that is worth it, because the waiting has cost more than the defects have.

**What I do now**

I will write the brief for bundle 1 while Lovable finishes, so it is ready the moment bundle 2 closes. I will show you a short summary of it for a yes before you send it.

<!-- extractor: next part is from turn 1252, Sat 2026-10-03 16:09 New York -->

Agreed, and nothing I proposed drops a test. The delay comes from one place, and it is not the run that happens on every commit.

**Where tests run today**

| Run | What it covers | Time | Holds Lovable up? |
|---|---|---|---|
| Lovable's own check, inside its turn | Sometimes all 1,022 tests, on one machine | About 2 hours | Yes |
| CI, on every commit | Every test except the few that must run alone, on six machines at once | About 22 minutes | No |
| Nightly | Everything, one at a time, including the tests that change shared data | Long | No |

So the full set already runs on every commit, and it is cheap there. The waste is Lovable repeating that same full set inside its turn. A break outside the screens it changed is still caught by CI 22 minutes later, and nothing reaches main until CI is green.

**What I recommend**

1. **Lovable's own check runs only the tests for the files it changed, chosen by a script.** Today that choice is left to Lovable's judgment, and this morning it missed one: it changed the place step and did not run the older place-step tests. A small script that maps changed files to their tests removes the guesswork. A CI check would make sure every test file is on the map.
2. **CI stays exactly as it is.** Every test, every commit.
3. **New tests still have to fail on the old screen first.** That is what makes them trustworthy. Lovable does those runs together at the end instead of one by one.

**What I do not recommend: moving more tests to nightly**

I looked at it. The largest candidate is the admin console tests, about a third of all test time. But because CI runs on six machines at once, moving them would save only a few minutes per commit, and a break in those screens could then sit unnoticed for up to a day. The tests already in nightly are there because they change shared data and cannot run alongside others, not to save time.

**How we would judge the script**

The test setup is a closed area under our rules, so this needs a recorded decision with a pass rule set in advance. I propose: over the next ten CI runs that follow a local check, count the CI failures in tests the script did not pick. Zero or one, we keep it. Two or more, we widen the map or go back to naming the tests in each brief.

**For you to confirm:** shall I make the script the first step of the next bundle, under that rule?
