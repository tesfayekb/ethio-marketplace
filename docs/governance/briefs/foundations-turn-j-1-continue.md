```text
RULING — Foundations turn J-1, continue: ethio-staging is applied; finish J-1 and fix INC-1004. Base: dev b2940a61. Tier A. No new migration. Lovable. Saved as docs/governance/briefs/foundations-turn-j-1-continue.md; roadmap line 3 names it beside foundations-turn-j-1.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-j-1-continue.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names both J-1 files.

ETHIO-STAGING IS APPLIED (my Supabase connector, the file 20261029233828_4aaa2474… applied whole):
- mark 20261030050000 is present on ethio-staging;
- its proofs NCAP-1…7 and JLOST-1…3 ran clean there;
- its five functions (with their ACLs) and its four constraints equal ethio-prod's, by hash.

VERIFIED SO FAR (fresh clone of dev b2940a61):
- step 0: the brief's sha256 is 0d6d6196…2733, and roadmap line 3 names it;
- the three keys equal the STRINGS block in EN and AM;
- the 16 named ceilings equal the ruling, and the other 8 use local + 0.1;
- the five redeclarations equal ethio-staging's live definitions before the apply, apart from the named changes;
- the prod read-back is the same as yours.

YOUR THREE DEPARTURES ARE ACCEPTED, each recorded as a deviation:
1. The INC-1003 ceilings rode the platform's commit, not one of their own. The platform commits; you cannot.
2. photo_screen's `warnings` takes strings only. The derived shape now equals the literal byte for byte, and the provider is held to strings.
3. "Name hidden" stays for a reader who may not see names. That key is about the reader's permission, not about buyers.

CI FIRST — run 40971107823 on 9a262ea3: FAILURE, for two reasons.
(a) The first-paint budget. Your INC-1003 ceilings fix it, and CI on this turn's last commit judges it.
(b) INC-1004: PGH-E2 (e2e/page-head.spec.ts:104) failed on both projects. It also failed once on 444acdf3 (flake ledger).
  - The body: the second pick, switchLanguage(page, "en") at :124, clicked the switcher, then waited 60 s for language-option-en (e2e/helpers/ui.ts:1227). The menu never showed it.
  - Two specs already guard this class by hand. legal-history.spec.ts:177–178 and legal-pages.spec.ts:189–190 say "a click while it closes is lost" and wait for getByRole("menu") to reach 0 before the second pick. PGH-E2 has no such wait.
  - THE SYSTEM. CONCERN: a language pick in a test sees what a person sees, so the menu is closed before the switcher is opened and after a pick. MECHANISM: switchLanguage (e2e/helpers/ui.ts:1224).
  - The fix:
    1. switchLanguage waits until no menu is open before it clicks the switcher.
    2. It asserts that the menu is closed once the pick has applied.
    3. Every hand-written copy of that wait that guards a switchLanguage call moves onto the helper. Census by definition, across every caller of switchLanguage (15 spec files today); waits for other menus stay.
  - This does not change the helper's default under G37. Its contract (pick, return with the language applied) is the same; it only waits for the state a person sees.
  - If the menu stays open after the first pick, the new assertion fails there. That is an app defect in the switcher: fix the switcher, not the test, and say so.
  - No timeout raised, no retry added.
  - Tests:
    - page-head.spec.ts, whole, both projects, retries 0;
    - each spec whose copy you remove, whole;
    - by-id runs of the other switchLanguage tests (G37).
    - CI's repeat lane is the flake proof.

THEN FINISH J-1:
1. The job maps an unusable answer to 'unusable'. In src/server/jobs/name-check-catchup.ts :111–:121, `answer.reason === "unusableAnswer"` marks p_state 'unusable'. Every other failure stays 'unavailable', with its pause rules unchanged.
   - The run's counts keep their four figures this turn; an unusable answer counts under `unavailable` there. A separate count needs SQL, so add the roadmap line "job health: a separate 'unusable' count on the run and the health line (INC-1002 follow-up; needs a migration)".
   - Census of every caller of name_check_mark. The save-time path, src/routes/api/listings/identity.ts :82–:97, records only a clean answer, so it stays as it is. If your census finds another caller, map it the same way and name it.
   - Unit tests: 'unusable' on unusableAnswer; 'unavailable' on timeout, providerError and unavailable.
2. The admin-screening E2E gains its needs_review row: scratch (J1/J3), five 'unusable' marks through the service client, the row's text and its Clear. Run that spec whole.
3. Then `bun run checks` once on the final tree, with its last line pasted (no FAIL). Push, and END THE TURN with the report:
   - step 0's sha256;
   - INC-1004: the cause the evidence showed, the helper change, the copies moved, the tests;
   - J-1 items 1–2, each done or not;
   - the unit count;
   - the checks' last line;
   - K2;
   - the files from git diff --name-only 9a262ea3.
   Save it as docs/governance/reports/foundations-turn-j-1.report.md.
```
