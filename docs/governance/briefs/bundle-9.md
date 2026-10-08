# Bundle 9 — the house style: brief, version 13 (saved unchanged, 2026-10-08)

```text
BUNDLE 9 — THE HOUSE STYLE, VERSION 13 (2026-10-08). THIS FILE REPLACES VERSION 12. Turn 12 (Part C2j) landed at 17f4e9ac and matches version 12. CI on it is RED: 18 failing results, 17 of them from three test mistakes in version 12 itself, plus one unrelated test (PW-173). This version specifies TURN 13 = THE FIX (Part C2k). No product code changes.
Line numbers are as of commit 17f4e9ac (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 12
- Verified against version 12 by the diff of 43307e70..17f4e9ac:
  - "Used before" on one line;
  - the Account page's Sign out removed;
  - the account menu at every width;
  - the two row labels by width, with the Amharic exactly as given;
  - the caption replaced by `data-area-source`;
  - the helpers, the tests and the docs.
  Accepted.
- CI run 37794083090 on 17f4e9ac (completed 15:05:54 UTC) — FAILURE, 18 gating results. Three causes are version 12's own (the supervisor's), and one is unrelated:
  - (1) e2e/shell.spec.ts :319, "the location row cascades …" (6 results, both projects): the test allows only the old hidden "Area" text outside the boxes, and now reads "Showing listings inListings in" (both labels' text, one of them hidden). The brief's census did not name this line.
  - (2) TR-27 and TR-28 in e2e/shell.spec.ts (signing out at :1946 and its sibling) and e2e/smoke-auth-i18n.spec.ts :92 (8 results, mobile-360): these tests sign out in an AMHARIC shell. `signOutViaUi` below 768 now calls `openAccountMenu`, which finds the button by its ENGLISH name "Account menu", so it never finds it. The law at e2e/helpers/ui.ts :326–331 (INC-121: a shell helper is locale-agnostic) was not applied by the brief.
  - (3) e2e/post-wizard-recent.spec.ts :92, PW-171 (2 results, mobile-360): the brief asked for every chip's TOP to equal the label's top. The row centres its items vertically, so a 44 px chip's top sits 12 px above a 20 px line of text. The measurement must compare CENTRES.
  - (4) e2e/post-wizard-where.spec.ts PW-173 (desktop-1280, shard 6, both attempts): on resume, the place step's city select (`post-where-city`) was not found in 20 s. This turn did not change the place step. It is that test's first line in the flake ledger, and its context file is missing. Not edited this turn (C2k.4).
  - The lane-only "TR-28 hreflang alternates …" (the 'changed' source) is fast-lane noise by its law; nothing to do.
- The browser rule continues: "local browser runs unavailable", and CI on the final commit is the proof.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte OVER docs/governance/briefs/bundle-9.md (it is already in its saved form: the header line and one fenced text block). On every later turn, read that file first. roadmap.md line 3 stays as it is; tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn: step 0; C2k.1 to C2k.4; the report; END THE TURN. Do not stop between steps: a clean point is not a reason to stop. Stop only for a question this brief cannot answer, or the end.
- The turn starts by reading CI for the last commit on dev: https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address (you cannot git-fetch that branch). Paste the first six lines of ci-status.md.
- Browser tests are started only with `bun run e2e:local <files>` or `bun run e2e:changed` (AGENTS.md; DEC-146). Nothing signs in to, or runs a test against, ethio-prod or the published site.
- Tests (G38): a red is fixed at its root. No assertion is loosened, no timeout raised, no retry added, no test skipped or moved to make a run pass. What each listed test asserts is kept; only the way it measures changes as written below. ANY test this brief does not name is not edited.
- No product code change, no migration, no database write, no package or dependency change, no new string.
- Scope:
  - e2e/shell.spec.ts;
  - e2e/helpers/ui.ts (C2k.2 only);
  - e2e/post-wizard-recent.spec.ts;
  - docs/_changelog.md;
  - the brief.
  Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, the migration check and e2e/global-setup.ts are not touched.
- Records: you write the changelog line; the decision and incident ledgers are the supervisor's.
- The commit that is judged by CI ends the turn: when the work is done, END THE TURN and send nothing after it (the platform pushes).

PART C2k — THE FIX AFTER TURN 12

C2k.1 — THE LOCATION ROW TEST (e2e/shell.spec.ts :312–319)
- What it asserts stays: no place name is echoed outside the boxes.
- How it measures changes. Instead of the cloned row's `textContent`, read the text of the row's elements outside the boxes that are DISPLAYED (`getComputedStyle(el).display !== "none"`, and no `display: none` ancestor inside the row), joined and trimmed.
- It must equal the label shown at this width: `en["location.rowLabelShort"]` below 768 px, `en["location.rowLabel"]` from 768 px.
- Census (G29): every other test that reads the location row's text — name each with its line; change it the same way only if it reads `location.label` or the removed caption.

C2k.2 — SIGNING OUT IN ANY LANGUAGE (e2e/helpers/ui.ts :332–336)
- `signOutViaUi` below 768 opens the menu by its test id, `page.getByTestId("account-menu").click()` after `waitForHydration`, then clicks `account-menu-sign-out`. Never by the button's name: INC-121, the law at :326–331.
- `openAccountMenu` (:171–177) keeps its name-based form for the callers that pass a label (e2e/smoke-auth-i18n.spec.ts :81). `expectSignedIn` and `signOutViaMenu` are left as they are; say in the report whether any caller reaches them in an Amharic shell (census).

C2k.3 — PW-171's ONE-LINE CHECK (e2e/post-wizard-recent.spec.ts :82–97)
- Compare vertical CENTRES:
  - each chip's centre (`top + height / 2`) equals the label's centre ± 2;
  - and the two chips' tops are equal ± 1.
- The `title` check and the no-sideways-scroll check stay as they are.

C2k.4 — PW-173, READ ONLY (e2e/post-wizard-where.spec.ts :915–975)
- Read the test and the place step's resume path. Turn 12 did not change the place step, so do not edit the test or the product in this turn.
- In the report, name the decisive lines: where the step reads the draft's market and city on resume, and what has to be true for `post-where-city` to render.
- State the cause as a HYPOTHESIS unless a line proves it.
- The supervisor decides with the next CI run: red again → it is fixed first in the next turn; green → it is watched.

C2k.5 — One changelog line.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- The operator re-checks the three walk changes after this turn's CI is green and he has published.
- Then the records turn for bundle 9 (documents only), then BUNDLE 10 — the feed engine.

REPORT. First lines:
- done or not done for step 0 and C2k.1 to C2k.5;
- the C2k.1 census;
- the C2k.2 census;
- the C2k.4 reading;
- any cited line that read differently;
- any file outside this brief's lists.
Then:
- the six ci-status lines;
- "local browser runs unavailable" (or the runs, if the browser starts);
- format:check, lint;
- the file list from `git diff --name-only 17f4e9ac`;
- "Logs read: … · unavailable: …";
- limitations.
Never "CI green" from a local run.
```
