# Claude supervisor instructions — amendment records

## Claude supervisor instructions v1.9 — amendments (append to §12)

G23 — Read before ruling, in full: no fix prompt without reading the decisive code path; trivial-query timeouts are read as queueing, not slowness; which queries fail matters more than how slow they are.
G24 — Every migration prompt carries the closers line; every landing prompt carries the DEC-023 local-run requirement and "commit only on green"; "commit" is never asked of the operator.
G25 — Executor capability questions are answered by the executor's own evidence (a census), never by a settings path the supervisor has not verified.
G26 — Walk findings outrank green tests: when the operator's walk contradicts a passing test, the test is fixed to see what the walk saw before anything else lands.


## Claude supervisor instructions v1.10 — amendment (2026-09-11; recorded here 2026-10-05)

Installed by the operator on 2026-09-11; not recorded in this file at the time. The header note of the installed text reads: "v1.10 amendment (2026-09-11): §12 G16 gains the anchor-execution addendum (third occurrence of the partial-read class: S35, DEC-049 step 5a, INC-187 part 2); §11's slip record gains the INC-187 truncated-grep ruling (G3-addendum class, first recurrence since the addendum)."

## Claude supervisor instructions v1.11 — amendment (2026-09-16; recorded here 2026-10-05)

Installed by the operator on 2026-09-16 (proposed in spec-ledger S38). The header note of the installed text reads: "v1.11 amendment (2026-09-16): §8 gains the GUARDS EVIDENCE ADDENDUM (DEC-066 — every failed job's evidence lands in docs/tracking/*-last-failure.md; a request for a log paste is a supervisor slip; the reading order; run pages read by the supervisor through the repository's Actions index); §11's slip record gains the S37/S38 slips (the INC-204 row-verb specification, the CV-3 real-row acceptance, the 2026-09-15 log-paste request); §12 gains G27 (real rows are never test fixtures, in any project — J3 as a supervisor gate). Knowledge references advance to v3.9."

## Claude supervisor instructions v1.12 — amendment (2026-09-17; recorded here 2026-10-05)

Installed by the operator on 2026-09-17 (proposed in spec-ledger S40); the live text from that date until v1.13 is installed. The header note of the installed text reads: "v1.12 amendment (2026-09-17): §12 gains G28 (no page-position assertion on a real row in a shared roster — the CV-4 / INC-214 / INC-216 class at three occurrences); §11's slip record gains the S39/S40 slips (the shallow-seed miscount, the charter's activate-under-closed promise (INC-209), the A1 census off-by-one, the D2 exception the i18n guard overturned, the LT-13 page-1 assumption). Knowledge references advance to v3.10."

## Claude supervisor instructions v1.13 — amendment (2026-10-05; delivered for installation)

The full v1.13 document lands in this repository at `docs/governance/claude-supervisor-instructions-v1.13.md` (107,056 bytes; sha256 `9299c26cfc196a615093efc6b9e9cfb6d28fa4615af3b2aa477623bbc2c8629e`); the operator installs it whole in the Project (§14 as amended: rulebooks are delivered whole, never as excerpts). Until he does, v1.12 governs. Method: no v1.12 sentence is rewritten in place — every sentence that later decisions falsified is kept verbatim and followed by an "ADDENDUM (v1.13)" that states the rule now in force; the only non-verbatim change is the version line. The header note of the delivered text reads:

"v1.13 amendment (2026-10-05): the executor's unit of work and the places truth lives have changed since v1.12, and every line this falsifies is KEPT VERBATIM and followed by an ADDENDUM (v1.13) that states the rule now in force — where the two differ, the addendum governs. LIVE since v1.12: DEC-098 (CI evidence on branch ci-evidence; no workflow commits to dev; the copies on dev frozen), DEC-114/DEC-115/DEC-119 (the executor's local run is the touched spec files; CI on the final commit is the full-suite proof), DEC-116 (the repository is public while building, private at launch), the bundle brief saved in the repository (docs/governance/briefs/) in place of one prompt per step, and the curator as a third agent. Changes: the Project line gains the visibility and one-organisation addenda and the canonical list gains /roadmap.md, docs/governance/briefs/, branch ci-evidence and the two rulebook records; §1's four lines gain addenda and a curator line; §2 gains the ritual as of v1.13 (clone, fetch ci-evidence, heads, side branches, the reading order, the stale-record check, the short statement); §3 gains the BUNDLE LOOP, THE PASTE AS APPROVAL, the per-agent reading of SERIAL DISCIPLINE, the single-threaded addendum and the OVERRIDE RULE with seven new precedents; §4 gains the brief-delivery, completion-report (the platform commits), WHO APPLIES WHERE, revert and KNOWLEDGE VERSION addenda; §5 gains the Tier A elevation list, WHERE THE READ-BACK COMES FROM and STAGING BEHIND; §7 gains five rows (weakened proof, real rows in a proof, hand-written state, unnamed package change, open hole in the public repository); §8 gains the PRIMARY CHECK and PROMOTE STATE addenda, RED-BOARD READING, the EVIDENCE BRANCH ADDENDUM (the executor reads by raw address, the supervisor by git) and the FLAKE LEDGER ADDENDUM (the §8 line proposed in ledger block S41); §9 gains the dependency-audit and PUBLIC REPOSITORY addenda; §10 one walk per bundle; §11's running-record line gains the every-bundle-close rule (the 2026-09-28 → 2026-10-04 records debt), INC-BEFORE-FIX its registration addendum, and the slip record S41–S92 with the unnumbered slips of 2026-10-01 → 2026-10-04; §12 gains G3 ADDENDUM 2 (the door-prediction addendum of ledger block S43), addenda to G4, G14, G18, G22, G24 and G27, and G29–G53: G29 fix the class, not the instance (operator directive 2026-09-29); G30 verified on dev, every step (S84, S86, INC-432); G31 walk lines (the walk slips S49–S85, INC-422, S92; operator directives 2026-10-01); G32 one prompt per agent, never mid-task (operator directive 2026-10-02); G33 bundles and briefs (operator directives 2026-09-15, 2026-10-01, 2026-10-03; INC-388); G34 a brief is self-contained and performable (S57, S65, S76, S82, S87); G35 turn structure and the door-and-screen split (S60); G36 one full, uncancelled CI run per judged commit; G37 local runs and sizing by the tests reached (DEC-114/115/119, INC-426); G38 no weakened proof (INC-437); G39 migrations — who applies what, marks, proofs, redeclarations (S66, S73, S91, INC-391, INC-405, INC-432, INC-433); G40 read the record before asking, answering or re-deciding (operator directive 2026-10-02; S89); G41 records land at every bundle close, a number is assigned once; G42 package and framework changes are their own turn (INC-372, INC-418, DEC-126); G43 exact text is read before it lands and travels as a file (INC-431, S88); G44 what the operator reads; G45 operator steps; G46 rulebooks are delivered whole (operator directive 2026-09-16); G47 curator handling (S90, INC-434); G48 legal work; G49 research peers, ask before proposing; G50 helper agents and scheduled check-ins; G51 secrets and the public repository (DEC-116); G52 estimates and cost; G53 the handover ritual (operator directive 2026-10-04). §13 gains the handover addendum; §14 gains the full-document delivery rule and the route for product rules. NUMBERING: "G29" was used for two proposals (2026-09-29 the class rule; 2026-09-30 the walk rule) and "G30" for one withdrawn the same evening; v1.13 assigns G29 = the class rule (the meaning executor prompts and repository code comments already carry), G30 = verification on dev, G31 = walk lines. Knowledge references stay at v3.10, the live version (its text in Claude's hands since 2026-10-05); the Knowledge amendment proposals of ledger blocks S41 and S43 are not installed."

Earlier proposals folded into v1.13 rather than installed on their own: the §8 flake-ledger line of spec-ledger S41 (proposed there as "instructions v1.13"; now the FLAKE LEDGER ADDENDUM), the §12 G3 second addendum of S43 (the door-prediction rule) and the S43 line "a prompt that numbers incidents maps each number to its defect inside the prompt" (S57; now a clause of G34); the two texts that both carried the label "G29" (2026-09-29 and 2026-09-30) and the "G30" of 2026-09-30, numbered once each as the header note states.


## Claude supervisor instructions v1.14 — amendment (2026-10-23; installed by the operator the same day, 07:55Z)

The full v1.14 document lands in this repository at `docs/governance/claude-supervisor-instructions-v1.14.md` (114,289 bytes with its final newline; sha256 `7cc05b120992ff8a55ae76770b12c08af5ef43ed45ea27006a12182ab78bd7ae`; the Project copy of 114,288 bytes has sha256 1177c687…); the operator pasted it whole into the Project on 2026-10-23 (§14 as amended: rulebooks are delivered whole). Its header note:

"v1.14 amendment (2026-10-23): the systems audit of 2026-10-23 (seven read-only studies at a413f952) and the operator's directive of the same day — "we should not just patch small fix, we should rather look at the bigger picture … a centralized system that will be much easier to maintain … even if that will take extra effort" — install §12's G0 SYSTEMS, NOT PATCHES as the overriding rule (G0.1–G0.10 and THE SYSTEM header every brief opens with), G54 (the route boundary, the AI gateway and the form kit — the first three mechanisms — and their interim laws), G55 (allowlists, censuses and guard wiring); §3's forward-scan gains the mechanism register; §4's scope, completion-report and pre-flight lines gain the K2 sibling list and the header checks; §6 DRIFT and §7 gain the rows "unrecorded bypass", "side effect before the authority", "hand-rolled boundary", "stand-in on a production path" and "model answer unparsed"; §1's canonical list gains docs/governance/mechanisms.md and docs/features/e2e-harness.md §Authoring laws; §8 gains the sixteen-lane addendum; §10 gains the harness-runs-builds addendum and "design them there"; §11's INC entries name the concern and the mechanism, and the slip record S1–S92 moves to the amendments record with a pointer; G19, G27 (afterEach), G29, G30, G38, G41, G52 gain addenda. Knowledge references advance to v3.11 (2026-10-23; A1, A6, A7 corrected; section J bound from docs/features/e2e-harness.md; section K ONE MECHANISM PER CONCERN added). Every rule of v1.13 stands; G0 governs where it differs."

Method: every v1.13 line kept verbatim or moved here (DEC-239); the moved text follows. Knowledge v3.11 (9,969 characters) was pasted by the operator the same day; its mirror is docs/governance/lovable-knowledge.md (this records turn).

## Moved from the instructions at v1.14 (DEC-239) — verbatim

### version-history-v1.13-note

Version: v1.13 · 2026-10-05 · SUPERSEDES v1.12 (2026-09-17), v1.11 (2026-09-16), v1.10 (2026-09-11), v1.9 (2026-09-08), v1.8 (2026-08-31), v1.7 (2026-08-29), v1.6 (2026-08-09), v1.5 (2026-08-07), v1.4 (2026-08-02), v1.3 (2026-08-01), v1.2 (2026-07-30), v1.1, v1.0, and v0.1. Additive versioning: prior sections preserved verbatim across bumps; amendments append. v1.13 amendment (2026-10-05): the executor's unit of work and the places truth lives have changed since v1.12, and every line this falsifies is KEPT VERBATIM and followed by an ADDENDUM (v1.13) that states the rule now in force — where the two differ, the addendum governs. LIVE since v1.12: DEC-098 (CI evidence on branch ci-evidence; no workflow commits to dev; the copies on dev frozen), DEC-114/DEC-115/DEC-119 (the executor's local run is the touched spec files; CI on the final commit is the full-suite proof), DEC-116 (the repository is public while building, private at launch), the bundle brief saved in the repository (docs/governance/briefs/) in place of one prompt per step, and the curator as a third agent. Changes: the Project line gains the visibility and one-organisation addenda and the canonical list gains /roadmap.md, docs/governance/briefs/, branch ci-evidence and the two rulebook records; §1's four lines gain addenda and a curator line; §2 gains the ritual as of v1.13 (clone, fetch ci-evidence, heads, side branches, the reading order, the stale-record check, the short statement); §3 gains the BUNDLE LOOP, THE PASTE AS APPROVAL, the per-agent reading of SERIAL DISCIPLINE, the single-threaded addendum and the OVERRIDE RULE with seven new precedents; §4 gains the brief-delivery, completion-report (the platform commits), WHO APPLIES WHERE, revert and KNOWLEDGE VERSION addenda; §5 gains the Tier A elevation list, WHERE THE READ-BACK COMES FROM and STAGING BEHIND; §7 gains five rows (weakened proof, real rows in a proof, hand-written state, unnamed package change, open hole in the public repository); §8 gains the PRIMARY CHECK and PROMOTE STATE addenda, RED-BOARD READING, the EVIDENCE BRANCH ADDENDUM (the executor reads by raw address, the supervisor by git) and the FLAKE LEDGER ADDENDUM (the §8 line proposed in ledger block S41); §9 gains the dependency-audit and PUBLIC REPOSITORY addenda; §10 one walk per bundle; §11's running-record line gains the every-bundle-close rule (the 2026-09-28 → 2026-10-04 records debt), INC-BEFORE-FIX its registration addendum, and the slip record S41–S92 with the unnumbered slips of 2026-10-01 → 2026-10-04; §12 gains G3 ADDENDUM 2 (the door-prediction addendum of ledger block S43), addenda to G4, G14, G18, G22, G24 and G27, and G29–G53: G29 fix the class, not the instance (operator directive 2026-09-29); G30 verified on dev, every step (S84, S86, INC-432); G31 walk lines (the walk slips S49–S85, INC-422, S92; operator directives 2026-10-01); G32 one prompt per agent, never mid-task (operator directive 2026-10-02); G33 bundles and briefs (operator directives 2026-09-15, 2026-10-01, 2026-10-03; INC-388); G34 a brief is self-contained and performable (S57, S65, S76, S82, S87); G35 turn structure and the door-and-screen split (S60); G36 one full, uncancelled CI run per judged commit; G37 local runs and sizing by the tests reached (DEC-114/115/119, INC-426); G38 no weakened proof (INC-437); G39 migrations — who applies what, marks, proofs, redeclarations (S66, S73, S91, INC-391, INC-405, INC-432, INC-433); G40 read the record before asking, answering or re-deciding (operator directive 2026-10-02; S89); G41 records land at every bundle close, a number is assigned once; G42 package and framework changes are their own turn (INC-372, INC-418, DEC-126); G43 exact text is read before it lands and travels as a file (INC-431, S88); G44 what the operator reads; G45 operator steps; G46 rulebooks are delivered whole (operator directive 2026-09-16); G47 curator handling (S90, INC-434); G48 legal work; G49 research peers, ask before proposing; G50 helper agents and scheduled check-ins; G51 secrets and the public repository (DEC-116); G52 estimates and cost; G53 the handover ritual (operator directive 2026-10-04). §13 gains the handover addendum; §14 gains the full-document delivery rule and the route for product rules. NUMBERING: "G29" was used for two proposals (2026-09-29 the class rule; 2026-09-30 the walk rule) and "G30" for one withdrawn the same evening; v1.13 assigns G29 = the class rule (the meaning executor prompts and repository code comments already carry), G30 = verification on dev, G31 = walk lines. Knowledge references stay at v3.10, the live version (its text in Claude's hands since 2026-10-05); the Knowledge amendment proposals of ledger blocks S41 and S43 are not installed. v1.12 amendment (2026-09-17): §12 gains G28 (no page-position assertion on a real row in a shared roster — the CV-4 / INC-214 / INC-216 class at three occurrences); §11's slip record gains the S39/S40 slips (the shallow-seed miscount, the charter's activate-under-closed promise (INC-209), the A1 census off-by-one, the D2 exception the i18n guard overturned, the LT-13 page-1 assumption). Knowledge references advance to v3.10. v1.11 amendment (2026-09-16): §8 gains the GUARDS EVIDENCE ADDENDUM (DEC-066 — every failed job's evidence lands in docs/tracking/*-last-failure.md; a request for a log paste is a supervisor slip; the reading order; run pages read by the supervisor through the repository's Actions index); §11's slip record gains the S37/S38 slips (the INC-204 row-verb specification, the CV-3 real-row acceptance, the 2026-09-15 log-paste request); §12 gains G27 (real rows are never test fixtures, in any project — J3 as a supervisor gate). Knowledge references advance to v3.9. v1.10 amendment (2026-09-11): §12 G16 gains the anchor-execution addendum (third occurrence of the partial-read class: S35, DEC-049 step 5a, INC-187 part 2); §11's slip record gains the INC-187 truncated-grep ruling (G3-addendum class, first recurrence since the addendum). v1.8 amendment (2026-08-31): DEC-020 is RATIFIED and LIVE — the v1.7 conditional installs: §1's executor line reads "direct-to-dev; main is promote-on-green only," §2 clones the dev branch, and §8 reads CI truth from dev (main is the certified-green record, advanced only by the fast-forward promote job; sync-main is the sole sanctioned repair). §4 gains the apply-pairing law (DEC-022): migration-bearing completion reports state "apply <uuid-fragment> → expect mark <value>". §8's evidence addendum gains the fast-lane source (DEC-023-B: 'changed', signal-only, non-gating). §11's slip record gains the U4 executor-overturned diagnoses. §12 gains the G3 addendum (hypotheses stated as hypotheses until the decisive line is read). Knowledge references advance to v3.4. v1.7 amendment (2026-08-29): §8 gains the E2E evidence-file addendum (merged failure reporter as primary evidence source; reporter self-report law; PLATFORM-ORIGIN labeling); §12 gains G20 (evidence fidelity), G21 (artifact-first diagnosis), G22 (harness-epoch closure, closed green at run 33228828535). Header consolidates the v1.5/v1.6 amendments that were installed inline (G18, G19). v1.4 amendment (2026-08-02): §12 gains G16 (prompt-integrity self-check — third occurrence of the duplicated-block class) and G17 (operator-bandwidth discipline — operator directive). v1.3 amendment (2026-08-01): three standing rules forged during Phase 1 identity + E2E harness bring-up — §12 gains G13 (phase-gate completeness), G14 (publish-before-retest), G15 (E2E-per-feature). v1.2 amendment (2026-07-30): §12 G9 extended with a numbered-checklist addendum + guardrail G12 (operator-action clarity). Version note: v0.1's payment/cart/checkout/payout machinery is ARCHIVED, not lost — it returns as a dedicated section when paid features arrive (DEC-001 defers all payments past v1).

### slip-record-§11

Supervisor slips are logged with the same honesty as executor slips (record includes: S3 header clobber, S22 duplicate block, the PKCE-flow reversal, the publish-before-retest omission, the 2026-08-02 duplicated prompt block, the Mailtrap stale-memory instruction, the assumption-authored reporter fixtures, and the U4 executor-overturned diagnoses — the client-route-factory conviction, the invoker-blindness ruling from a truncated grep, the fixture-client assertion, the 2026-09-11 INC-187 truncated-grep ruling (G3-addendum class, first recurrence since the addendum) and the partial-read family at three occurrences (S35, DEC-049 step 5a, INC-187 part 2) that forged the G16 addendum — and the S37/S38 slips: the INC-204 row-verb specification (a console prompt re-described a convention the donor already embodied instead of naming it by its test), the CV-3 real-row acceptance ("runs in one project" accepted as isolation for a real row — the CV-4 red), and the 2026-09-15 log-paste request (stopping at the sandbox's rate limit instead of exhausting the supervisor's own channels), and the S39/S40 slips: the shallow-seed miscount (6+8 stated as 12+18), the curator charter's "activate under closed countries" promise the importer refused (INC-209), the A1 census off-by-one (215 for 216), the D2 exception that the i18n coverage guard overturned, and the LT-13 page-1 assumption (INC-216) — all caught and corrected; post-edit verification is mandatory on every Claude file edit).

### slip-record-addendum-v1.13

SLIP RECORD ADDENDUM (v1.13) — the record further includes S41 (the LY-6 DEC-030 threshold missed on 09-21), S42 (the flake ledger not read whole 09-19 → 09-25), S43–S45 (the wizard turn-3 prompt rounds), S46 (INC-282's test accepted vacuous), S47 (the D31-M census named the wrong file for submit_listing), S48 ("expected 0" censuses stated unrun), S49 (alias-search walk steps for a finder the wizard does not consume), S50 (walk lines written as "locked row" for settled models), S51 (import checklists without the IE-4b approval step), S52 (a door statement from an incomplete API log), S53 (posting-routes omitted after a contract change — INC-302), S54 (the INC-303 model predicted from an assumption about pointer numbers), S55 ("any move → Undo" without reading the undo path), S56 (a brief contradicting its own walk), S57 (incidents listed without mapping), S58 (a flip direction reversed), S59 (a version formula that would have blanked every root pointer's stamp), S60 (the D62 split without an interim alias — INC-309), S61 (the PW-66 price-pair hypothesis chased before the decisive asEdge line), S62 (co-dependent definitions and links as separate import passes), S63 (the first INC-317 fix that broke Undo), S64 ("the three PW-61 tests" — two exist), S65 (verbatim texts outside the prompt block), S66 (a dictated mark earlier than the file's stamp), S67 (the INC-320 fix that made the INC-329 erasure fire on every Back), S68 ("only the two card rows" for at least two), S69 (each run's flaky list read instead of the seven-day ledger — INC-333/334/335), S70 (the city-required ruling missed — INC-337), S71 (a stricter co-link rule than DEC-057b), S72 (a prefill order written from a 2026-09-15 ruling without checking the code), S73 (proofs allowed to read real places — INC-340), S74 (the alias-spelling rule in neither audit), S75 (a Settings prefill that does not exist), S76 (a step needing a production sign-in), S77 (search words typed into in-form lists), S78 (a curator miscount reported as a live defect), S79 (the map gated on a capability no category carried), S80 ("How it's sold" placed on the wrong step), S81 (the otherNeedsText rule never audited — INC-357), S82 (W6b-1 R2 misquoted), S83 (walk steps without their preconditions), S84 (place-step work recorded as landed without a check on dev), S85 (a settled field described as filled); the unnumbered slips of 2026-10-01 → 2026-10-04 — a walk line repeating a walked check; the dog-size over-detail; a housekeeping approval put to the operator; three scope-list omissions (bundle 1's catalog route; INC-383's two helpers; the search route); prompts drafted while both agents were mid-task; the batch-14 note count unreconciled; the CT-8 flake with no incident at the third occurrence; the importer's option limit missing from the checker; INC-385 recorded without a fix; the batch-15 question asked before the record was read; three wrong walk examples; the brief delivered only as a paste (INC-388); the 7423f49a pre-apply comparison of argument lists only (INC-391); the "cells are empty" statement from an older catalogue copy; "its Remove" without its rule (the PW-83 red); the CSV under docs/ without its ignore line (INC-406); the security gaps named in the public repository before the fix; the ci-evidence fetch asked of the executor (first occurrence, 2026-10-03); the name rules without digits (INC-412); the missing-countries assumption (INC-413); the framework patch declined by its label (INC-418); the re-walk line of behaviour the code never had (INC-422); the name_folds kinds list without the protected names' folds; "bundle2 needs no renumbering"; the untouched-specs check of screen test ids only (PR-18); the three-file local cap that hid the breakage and the 140-test turn; the whole-file runs ordered and not enforced; the age answer given without the ledger; the Privacy draft's position sentence; and S86–S92: S86 (bundle 4 turn 7 verified without checking step 24's third way against the diff — INC-432, found by the records compile), S87 (two prompts told the executor to git fetch origin ci-evidence, which its remote does not carry — second occurrence), S88 (a prompt retyped inline corrupted one Amharic character, caught by a script check before sending), S89 (a helper run spent searching the transcript for the live Knowledge text the operator could hand over in one step), S90 ("a prefill can tick a list" told to the curator from the docs without reading the form — INC-434), S91 ("stop at the apply line" written although the executor's tool applies on save), S92 ("Dishes opens with Doro Wot ticked" written from the catalogue file, not the form — the second walk-expectation slip after INC-422) — all caught and corrected; G29–G53 are the class rules these forged.

## Claude supervisor instructions v1.15 — amendment (2026-10-27; delivered for installation)

The full v1.15 document lands in this repository at `docs/governance/claude-supervisor-instructions-v1.15.md` (108,681 bytes with its final newline; sha256 `99081e8a1d1ceed5c701143af9451604dec7a3ca81f203375007f9afd8c39172`); the operator installs it whole in the Project (§14: rulebooks are delivered whole). Until he does, v1.14 governs. Its header note:

"Version: v1.15 · 2026-10-27 · SUPERSEDES v1.14 (2026-10-23). v1.15 carries every rule of v1.14 and drops what is not a rule: wording a later addendum superseded, precedents, dated quotes and slip lists — each removed span is recorded word for word in docs/governance/instructions-amendments.md (§ v1.15, the moved text) and the Project keeps v1.14 whole (claude/claude-supervisor-instructions-v1.14.md). It installs the rules adopted since v1.14 as G56–G59 (the executors and their channels; checks and waits; briefs landed by the block applier; cost and quality) and corrects three facts: two executors write the repository (Lovable and the Claude Code executor), CI runs queue (DEC-181), and the live Knowledge is v3.11. Where v1.15 and v1.14 differ on a rule, v1.15 governs; G0 governs both."

Method (the operator's approval of 2026-10-27 07:43 local — the supervisor's proposal 5, "v1.15 instructions with a rule-by-rule proof"): v1.15 is v1.14 with 57 recorded moves — wording a later addendum superseded, precedents, dated quotes and slip lists taken out; three facts corrected (two executors; Knowledge v3.11; CI runs queue — DEC-181); the rules adopted since v1.14 installed as G56–G59 — each move listed below word for word, the v1.14 text and what stands in its place. The proof (the supervisor's script, in the Project doc claude/supervisor-tools-2026-10-27.md): every § and G header of v1.14 is in v1.15; every banned-pattern row is kept; and v1.14 with the 57 moves applied, each OLD text found exactly once, equals v1.15 byte for byte. v1.15 is 5% shorter than v1.14 (113,363 → 107,820 characters).

## Moved from the instructions at v1.15 — verbatim

Each entry: why it moved, then the v1.14 text, then what stands in its place in v1.15 ("—" when nothing).

### 1. header

v1.14:

> Version: v1.14 · 2026-10-23 · SUPERSEDES v1.13 (2026-10-05). Additive versioning: prior sections preserved verbatim across bumps; amendments append. The version history and header notes of v0.1 → v1.13 live in docs/governance/instructions-amendments.md and in the Project doc claude/claude-supervisor-instructions-v1.13.md; nothing of them is lost. v1.14 amendment (2026-10-23): the systems audit of 2026-10-23 (seven read-only studies at a413f952) and the operator's directive of the same day — "we should not just patch small fix, we should rather look at the bigger picture … a centralized system that will be much easier to maintain … even if that will take extra effort" — install §12's G0 SYSTEMS, NOT PATCHES as the overriding rule (G0.1–G0.10 and THE SYSTEM header every brief opens with), G54 (the route boundary, the AI gateway and the form kit — the first three mechanisms — and their interim laws), G55 (allowlists, censuses and guard wiring); §3's forward-scan gains the mechanism register; §4's scope, completion-report and pre-flight lines gain the K2 sibling list and the header checks; §6 DRIFT and §7 gain the rows "unrecorded bypass", "side effect before the authority", "hand-rolled boundary", "stand-in on a production path" and "model answer unparsed"; §1's canonical list gains docs/governance/mechanisms.md and docs/features/e2e-harness.md §Authoring laws; §8 gains the sixteen-lane addendum; §10 gains the harness-runs-builds addendum and "design them there"; §11's INC entries name the concern and the mechanism, and the slip record S1–S92 moves to the amendments record with a pointer; G19, G27 (afterEach), G29, G30, G38, G41, G52 gain addenda. Knowledge references advance to v3.11 (2026-10-23; A1, A6, A7 corrected; section J bound from docs/features/e2e-harness.md; section K ONE MECHANISM PER CONCERN added). Every rule of v1.13 stands; G0 governs where it differs.

v1.15: Version: v1.15 · 2026-10-27 · SUPERSEDES v1.14 (2026-10-23). v1.15 carries every rule of v1.14 and drops what is not a rule: wording a later addendum superseded, precedents, dated quotes and slip lists — each removed span is recorded word for word in docs/governance/instructions-amendments.md (§ v1.15, the moved text) and the Project keeps v1.14 whole (claude/claude-supervisor-instructions-v1.14.md). It installs the rules adopted since v1.14 as G56–G59 (the executors and their channels; checks and waits; briefs landed by the block applier; cost and quality) and corrects three facts: two executors write the repository (Lovable and the Claude Code executor), CI runs queue (DEC-181), and the live Knowledge is v3.11. Where v1.15 and v1.14 differ on a rule, v1.15 governs; G0 governs both.

### 2. fact: two executors

v1.14:

> Executor: Lovable (DEC-006; direct-to-dev per DEC-020 — main is promote-on-green only). Cursor: reserve executor.

v1.15: Executors: Lovable (DEC-006; direct-to-dev per DEC-020 — main is promote-on-green only) and the Claude Code executor (DEC-255–DEC-257; G56). Cursor: reserve executor.

### 3. fact: Knowledge v3.11

v1.14:

> additionally governed by in-repo AGENTS.md and Project Knowledge v3.10.

v1.15: additionally governed by in-repo AGENTS.md and Project Knowledge v3.11.

### 4. fact: Knowledge v3.11

v1.14:

> conflicts with Knowledge v3.10 or approved specs?

v1.15: conflicts with Knowledge v3.11 or approved specs?

### 5. fact: Knowledge v3.11

v1.14:

> KNOWLEDGE VERSION ADDENDUM (v1.13): the live Knowledge is v3.10 (2026-09-17); its text has been in Claude's hands since 2026-10-05, when the operator attached it (S89 — ask for a document he holds before searching for it), and the in-repo mirror docs/governance/lovable-knowledge.md (v3.8 until the records turn brings it level) is read as the mirror only once it says v3.10. The Knowledge amendment proposals of ledger blocks S41 and S43 are not installed.

v1.15: KNOWLEDGE VERSION: the live Knowledge is v3.11 (2026-10-23; the Project doc claude/lovable-knowledge-v3.11.md); the in-repo mirror docs/governance/lovable-knowledge.md is read as the mirror only once it names the live version (G46).

### 6. fact: runs queue (DEC-181)

v1.14:

> and because every push to dev cancels the run in flight (ci.yml: cancel-in-progress) main can trail for hours while pushes keep arriving — eight runs cancelled in a row and main 61 commits behind on 2026-10-04.

v1.15: and because runs queue — a newer push replaces only a QUEUED run (DEC-181) — main can trail while pushes keep arriving.

### 7. fact: runs queue (DEC-181)

v1.14:

> the operator's steps say to send the executor nothing for about 25 minutes (any message can cause a push, and a push cancels the run in flight — eight runs in a row on 2026-10-04);

v1.15: the operator's steps say to send the executor nothing until the run has completed (a newer push replaces a queued run — DEC-181);

### 8. superseded: §2 steps 1–4 (the addendum A–E governs)

v1.14:

> 1. Fresh clone of the dev branch (DEC-020): cd /tmp && rm -rf ethio && git clone --branch dev https://github.com/tesfayekb/ethio-marketplace.git ethio — then git fetch origin main and note whether main trails dev by tracking-only ([skip ci]) commits (steady state) or by substantive ones (a promote that has not yet run, or a guard-stopped divergence — reconcile via the sync-main dispatch only after confirming main's extra commits are tracking-only).
2. Read in order: docs/governance/system-state.md → the latest file in docs/governance/handoffs/ → tail of docs/spec/spec-ledger.md session log → tail of docs/_changelog.md → git log --oneline -10.
3. State to the operator: HEAD SHA, current phase, last closed step, next planned step — and ask for confirmation before proceeding. Chat memory/summaries are advisory; the repo is the record. Unexplained HEAD movement ⇒ pause and reconcile before new work.
4. If the operator opens with a task, run the ritual first anyway (30 seconds), then the task, grounded.

v1.15: —

### 9. superseded: §2 heading

v1.14:

> §2 ADDENDUM (v1.13) — THE RITUAL AS OF DEC-098 AND THE BUNDLE ERA (where a step below differs from steps 1–4, the step below governs):

v1.15: THE RITUAL (DEC-098 and the bundle era):

### 10. superseded: no fast lane (LANES)

v1.14:

> (d) A lane-only 'changed' red with a green matrix = noise (fast-lane law).

v1.15: —

### 11. superseded: no fast lane (LANES)

v1.14:

> FAST-LANE LAW (v1.8, DEC-023-B): the 'changed' source is signal-only — it never gates the merged verdict or promote; a lane-only failure with a green full matrix is contention noise by definition, while a deterministic lane failure is read as the early copy of a matrix failure.

v1.15: —

### 12. superseded: no fast lane (LANES)

v1.14:

> and, when present, the DEC-023-B fast lane 'changed'

v1.15: —

### 13. history: slip record pointer (stated in §11 already)

v1.14:

> SLIP RECORD ADDENDUM (v1.13) — moved verbatim to docs/governance/instructions-amendments.md §Slips (v1.14); the rules it forged are G29–G53.

v1.15: —

### 14. history

v1.14:

> The operator never stated this rule; it is the supervisor's practice, accepted by use since 2026-10-01 ("Pasting it is your approval").

v1.15: —

### 15. precedents

v1.14:

> (Precedents: the executor capability census → DEC-006; the E2E harness pass bar → acceptance 2026-08-01; the DEC-019 serve-stack branch rule → 2026-08-28; the DEC-024 worker-knob revert rule → 2026-08-30.) ADDENDUM (v1.13): further precedents — DEC-087 (timing census and spec split), DEC-092 (the framework update, reverted by its own rule), DEC-097 (the E2E account pool), DEC-098 (the evidence branch), DEC-104 (transport retry), DEC-115 (the test selector), DEC-119 (the speed rules).

v1.15: —

### 16. precedent

v1.14:

> The precedent: from 2026-09-28 to 2026-10-04 the ledgers stood at DEC-080 / INC-307 while the running record reached DEC-130 / INC-431 — 50 decisions and 124 defects outside the repository, the newest handoff six days old, system-state.md nine — after five deferrals and two briefs that said "the decision and incident ledgers are not written in this bundle" with no records turn behind them.

v1.15: —

### 17. evidence (the audit)

v1.14:

> The systems audit of 2026-10-23 (seven read-only studies at a413f952; /home/claude/audit/*/report.md, summarised in the Project doc claude/systems-audit-2026-10-23.md) is its evidence: in every area a good shared mechanism existed, screens and routes built after it adopted it, and nothing enumerated the ones that must — the posting form's required-answer mirror (built per step, the contact step exempted by a comment), four field primitives and thirteen hand-rolled forms, six AI calls wiring the shared meter and the one D166 rule by hand, 36 server endpoints with nine response envelopes and no shared parser (zod installed, unused), four copies of the auth chain, 22 defect classes of which 13 had no guard, and a route that acted with the service role before its door answered (INC-830).

v1.15: —

### 18. history

v1.14:

> Three executor-overturned rulings in U4 forged this addendum.

v1.15: —

### 19. slip list

v1.14:

> (S54, S55, S59 — three in one day)

v1.15: —

### 20. slip list

v1.14:

> (S70, S72, S75, S79, S81, S90, S92; the batch-18 "cells are empty" statement; INC-412; INC-413; the Privacy draft's position sentence; the age answer of 2026-10-04)

v1.15: —

### 21. history

v1.14:

> Third logged occurrence of the duplicated-block class (S3, S22, 2026-08-02) — the class has outlived two corrections and now gets a standing check.

v1.15: —

### 22. precedent

v1.14:

> Precedent for the step check: bundle 4 step 24's third way was never built, the turn's verification did not see it, and INC-432 was found by the records compile a week later (S86).

v1.15: —

### 23. slip list

v1.14:

> The class behind it: S49, S50, S77, S80, S83, S85, the three wrong examples of 2026-10-02, INC-422 ("I wrote that walk line without checking when suggestions appear") and S92 ("Dishes opens with Doro Wot ticked", written from the catalogue file — INC-434).

v1.15: —

### 24. quote

v1.14:

> (Operator: "it increases confusion to add more propts on work they do. let those finish and i will give you each of their work. once you verify all then you give me the above propmt with the necessary addendums"; earlier forms 2026-09-29 and 2026-10-01; three "which is final" questions.)

v1.15: —

### 25. precedent

v1.14:

> Claude's running record is never the only copy for longer than one bundle: the week of 2026-09-28 → 2026-10-04, when the ledgers stood at DEC-080 / INC-307 while the running record reached DEC-130 / INC-431 (§11), is the precedent.

v1.15: Claude's running record is never the only copy for longer than one bundle.

### 26. history

v1.14:

> A blanket "decline the framework update" kept a critical reflected-XSS patch out of the repository from 2026-10-01 to 2026-10-04 (INC-418; "declining it was my mistake"); the earlier update applied against the ruling and called "routine" (INC-372; DEC-092, reverted by its own rule) is the other face of the class.

v1.15: —

### 27. history

v1.14:

> (on 2026-10-04 the record stood at v1.9 against v1.12 live, the mirror at v3.8 against v3.10)

v1.15: —

### 28. history

v1.14:

> — five such proposals ran uninstalled from 2026-09-25 to this version

v1.15: —

### 29. history

v1.14:

> (two batches on 2026-10-04)

v1.15: —

### 30. precedent

v1.14:

> The precedent: the handover of 2026-10-04 was planned when the records were a week behind, so the compile ran beside executor turns 9–12 and the stop point moved from "turn 10 green" to "every record in the repository".

v1.15: —

### 31. slip list

v1.14:

> (S41, S42, S69, and the CT-8 flake of 2026-10-02 — ten retried passes since 2026-09-05 with no incident: the fourth occurrence)

v1.15: —

### 32. quote

v1.14:

> (operator, 2026-09-29: "CI red, can give fix prompt together with the next step prompt next so we dont kill time"; twice more on 2026-09-30)

v1.15: —

### 33. quote

v1.14:

> ("CI red, all need to be fixed before we move", 2026-09-30)

v1.15: —

### 34. quote

v1.14:

> (commitment of 2026-10-01, restated 2026-10-04: "no more stops just to wait for CI")

v1.15: —

### 35. quote

v1.14:

> (2026-10-01; 2026-10-04 "no more stops just to wait for CI")

v1.15: —

### 36. quote

v1.14:

> ("please be selective of inportant walks to do from now on"; "why do we have to repeat these walks again?")

v1.15: —

### 37. quote

v1.14:

> ("IF WE CAN DO MORE OF THOSE ITEMS PERTURN, IT WILL BE GREAT TO SAVE TIME"; "give lovable to fix multiple of those issues at a time")

v1.15: —

### 38. quote

v1.14:

> (operator: "I am not saying we have to do fewer tests … I dont want to make it less secure less comprehensive in terms of testing")

v1.15: —

### 39. quote

v1.14:

> (operator: "please review converstatio first and let me know the steps")

v1.15: —

### 40. quote

v1.14:

> (S89: a helper run spent searching the transcript for a text he handed over in one step; "you could have asked for a copy of current lovable knowledge base instead of spending so much time")

v1.15: —

### 41. quote

v1.14:

> ("list form short", five times)

v1.15: —

### 42. quote

v1.14:

> ("should i just send the above or say continue", three times on 2026-10-02)

v1.15: —

### 43. quote

v1.14:

> ("fix it . i dont understand your porposal, just continue to fix appropriately. if there is any i have to do tell me explicetly", 2026-09-30)

v1.15: —

### 44. quote

v1.14:

> (G5; 2026-10-04: "Its turning out to be much more turns than initially anticipated")

v1.15: —

### 45. quote

v1.14:

> ("can you ask lovable to do that instead?")

v1.15: —

### 46. quote

v1.14:

> (S90: "a prefill can tick a list", said from the docs while the form skipped list facts — INC-434; the two C28 corrections of 2026-10-05)

v1.15: —

### 47. quote

v1.14:

> ("please review how other websites implement that"; "need to do a detailed reaserch on this firt and need to discuss first"; "NEED TO REVIEW WHAT OTHER MARKELPLACE LIKE CRIAGELIST OR OTHERS SAY OR DO")

v1.15: —

### 48. quote

v1.14:

> ("ASK ME IF YOUY GAVE QUESTIONS FOR CLARIFICATIONS SO WE GET IT CORRECT")

v1.15: —

### 49. quote

v1.14:

> ("lets save it as agreed rule then")

v1.15: —

### 50. quote

v1.14:

> ("your work is taking too long", 2026-10-05: the reply was two lines and the executor's next turn)

v1.15: —

### 51. quote

v1.14:

> ("i dont want other to access the data we worked so hard")

v1.15: —

### 52. quote

v1.14:

> ("EVERYTHING THAT YOU PLAN AND KNOW OF GOES IN REPO SO WHEN WE PLAN A HANDOVER WE WONT HAVE SOMETHING LEFT … EXTENSIVE AND COVER EVERYTHING PLANNED ABOUT PROJECT, EVERYTHING DONE, SO FAR, AND PLANS AND STEPS")

v1.15: —

### 53. quote

v1.14:

> ("fix it . i dont understand your porposal, just continue to fix appropriately. if there is any i have to do tell me explicetly")

v1.15: —

### 54. quote (G0)

v1.14:

> G0 SYSTEMS, NOT PATCHES (v1.14, the operator's directive of 2026-10-23: "when we design or when we fix an issue, we should not just patch small fix, we should rather look at the bigger picture … ready for bigger expansion in future … never fail in future … similar issues are identified and fixed as well, security holes and vulnerabilities are addressed and we have a centralized system that will be much easier to maintain … even if that will take extra effort").

v1.15: G0 SYSTEMS, NOT PATCHES (v1.14, the operator's directive of 2026-10-23).

### 55. quote (G29)

v1.14:

> The operator's words: "when such issue identified, make sure not just fix one issue but reaserch wider issue and fix with detail review if similar problems exist other places" (2026-09-29; repeated 2026-09-30 twice and 2026-10-01: "same comment for all other boxes everywhere, not just for brands but everything, every attribute").

v1.15: —

### 56. quote (§13)

v1.14:

> ADDENDUM (v1.13, operator directive 2026-10-04): a handoff is a PACKAGE, not a block — "EVERYTHING THAT YOU PLAN AND KNOW OF GOES IN REPO SO WHEN WE PLAN A HANDOVER WE WONT HAVE SOMETHING LEFT … EXTENSIVE AND COVER EVERYTHING PLANNED ABOUT PROJECT, EVERYTHING DONE, SO FAR, AND PLANS AND STEPS".

v1.15: ADDENDUM (v1.13, operator directive 2026-10-04): a handoff is a PACKAGE, not a block.

### 57. new rules G56–G59

v1.14:

> §13 Continuity & handoff

v1.15: G56 Executors and channels (v1.15; DEC-245, DEC-246, DEC-255–DEC-257) — Two executors write the repository: Lovable (its platform, its Knowledge, AGENTS.md) and the Claude Code executor (the kit — CLAUDE.md, .claude/rules, the hooks, land.ts the one landing door, the reviewer subagent; .github/workflows/** and .claude/** are closed to it, so workflow and kit changes go to Lovable). One executor works at a time: each landing rewrites roadmap line 3, which the other's scope reads. Claude Code: every brief starts a NEW session (a session sends its whole context again on every request); the operator starts it, pastes the carrier and brings the final report; the supervisor never answers its permission prompts; one message per executor turn — a brief, a numbered ruling, "continue", or "apply <fragment> on ethio-prod" after the staging read-back and the operator's yes. Lovable: the supervisor may send briefs, rulings and "continue" through the Lovable connector (DEC-245) — only what the operator would otherwise paste, one message per Lovable turn, never while it works; never query_database, enable_database, deploy_project, knowledge set, visibility, project create, remix or move, skills, add_connector or Project progress; a "Modify Supabase database" pause is answered only on the operator's yes; Publish stays the operator's; when the operator is present he pastes the file himself (it costs the supervisor's plan nothing). Supabase connector (DEC-246): write calls only on ethio-staging, only migration files already on dev, sha-checked and applied whole, the specific mark read back; ethio-prod read-only at most; execute_sql reads only; no project, branch, edge-function or secret calls.
G57 Checks and waits (v1.15, operator 2026-10-27) — A Claude Code turn gets no scheduled check: the operator brings its final report. A Lovable turn gets scheduled checks only when the operator says he is away. A CI wait is a background command that polls the Actions API at no model cost and wakes the supervisor once, when the run completes; nothing polls on a schedule while nothing runs (a wake after a long idle reads the whole context again at full price). CI runs queue — a newer push replaces only a QUEUED run, never the running one (DEC-181). The Foundation fixes tracker (a Claude Doc) is updated after every verified turn and opened for the operator when he asks (operator 2026-10-24).
G58 Briefs land by the block applier (v1.15; register row 58; S453, S454) — Every FILE and EDIT block a brief carries is applied by `bash scripts/brief/apply-blocks.sh <saved brief> [--dry] [<path> …]`, never retyped (the kit refuses inline programs; the applier's scope is the kit's scopeVerdict, which reads roadmap line 3 — so a brief that uses it makes the line-3 change at STEP 0 and writes every block marker at the start of its line — and refuses .github/workflows/** and .claude/**, whose blocks go to Lovable, which copies them by its own script, each OLD text checked to be found exactly once, the brief's hash list proving every file — turn 34e, 2026-10-27); the executor saves a long brief by a scripted copy, never by retyping it. Before a brief is sent, Claude simulates the whole turn on its base — STEP 0's hand edits made by hand, every block applied by the applier — and compares every file with a prototype that includes STEP 0's hand edits; every generator asserts that roadmap line 3 names the brief in force at the end of the turn and that no roadmap block touches line 3. Every brief's new code is checked against AGENTS.md and the kit's rules (.claude/rules/10-code-laws.md included) by check-brief.py (--cc for Claude Code) before it is sent, and every hit is read: a hit inside imported record text is record, not instruction. Red first is shown on the base, never committed.
G59 Cost and quality (v1.15, operator 2026-10-27) — Quality is never traded for cost. The supervisor's own requests are the main cost of the operator's plan: one script per landing (verify it, read CI, cut and rehearse the next brief), filtered output, no helper agent or study unless asked; an exact-copy turn is verified by hash equality, its new tests and CI. Briefs are prototype-exact by default; while the Claude Code cloud credit lasts (to 2026-11-05) a lower-risk turn (tests, tooling, screens) may be spec-built — exact tests, the full consumer census, the executor's reviewer, CI and the supervisor's full diff review — never a turn that touches sign-in, permissions, migrations or personal data; when the credit ends, executor turns return to Lovable. Records-only and exact-copy turns may run on Sonnet (the operator picks the model when he starts a session). Every number about spend is an ESTIMATE until measured (G52).

§13 Continuity & handoff

## Slips

The supervisor's slips, each with the guardrail it names (§11: logged with the same honesty as executor slips; the earlier record S3 → S92 is the §11 text moved above). Bundle 22 after the close (2026-10-20 → 2026-10-23):

SLIPS (the supervisor's, with the guardrail each names) — S331 … S375, bundle 22 after the close (2026-10-20 04:3xZ → 2026-10-22 11:5xZ)
- S331 (G30, G32) — "Lovable hasn't started turn 12 yet, so nothing needs undoing", said at ~04:19Z from `git log origin/dev` showing 42c88cdf, while the executor had been working on turn 12 VERSION 1 since 04:15Z (the platform pushes some minutes after it commits). Corrective: dev's head is not proof that an agent is idle — ask the operator whether a brief was pasted before calling it unstarted; v2 withheld, v1 let reach its stop, the wording change sent as one ruling after the staging apply.
- S332 (G40) — the 12-shard proposal was made before reading DEC-171/DEC-172 (on 2026-10-11 eight shards ran no faster than six: staging's database is the limit). Corrective: corrected to the operator the same turn; turn 14 became the settle step and the timing report, then D228's temporary backends.
- S333 (G34) — turn 13 v1 asked for in-app explanatory text (a how-it-works card) against the executor's platform rule "Do not use visible, in-app text to describe the application's features…"; it stopped before STEP 0. Corrective: the card and the export's explanatory sentence removed (v2); the rule added to the list of Lovable's own rules briefs must respect — explanations go to the docs.
- S334 (G34; Lovable's structural-decision rule) — turn 14 v1 briefed a new workflow and its backend config with "No AGENTS.md change"; it stopped. Corrective: v2 replaced AGENTS.md whole with the browser-tests rule naming the temporary backend; the class "a new module requires a verbatim AGENTS.md line" extends to workflows and other structural files.
- S335 (G16 addendum) — turn 13 v2's C4 told the executor "its first line is exactly …" while its own carrier set the export's lines to end in "\r\n", without saying how the test reads lines; LGA-13 split on "\n" and failed in CI (INC-785). Corrective: a brief that prescribes a file format and a test of it names the format's separator in the test's text.
- S336 (tooling) — a `cat >>` with no input hung a record append for two minutes; stopped, the stray file removed, the entry written by script. Rule: never run `cat >>` without input.
- S337 (G34) — turn 14b's HOW TO WORK told the executor to use its file-editing tool while its SCOPE line kept the old "No patch tool"; the executor's only editing tool is patch-based, so the two lines conflicted. Corrective: turn 14c says the tool in whatever form is right and that the old words meant the `patch` / `git apply` commands.
- S338 (G16 addendum, G29) — turn 14c's C1 described rowPair's row query with a hand-built "rail-category-" prefix while INC-170's law (unit guard CMR-3) gives rail-row selectors only from e2e/helpers/category-menu.ts; the executor caught it with the guard and used ANY_MENU_ROW. Corrective: a brief that names a selector checks the selector laws first.
- S339 (G3) — the container name supabase_db_ethio-ci-local was prescribed in turn 14 (D2's ledger check) from the CLI's naming convention, unread — proof run #3's first diagnosable failure (the CLI named the stack after ethio-prod's ref from the root .env). Corrective: turn 14d finds the single supabase_db_ container by `docker ps`; a name another tool assigns is discovered at run time, never written from convention.
- S340 (G16 addendum) — turn 14d's checks expected `git grep` to find nothing although the saved briefs hold the name, and its roadmap and changelog lines carried bare underscore identifiers that Prettier rewrites as emphasis — two unexecuted expectations, the second a known class (identifiers in record lines go in backticks). Corrective: the executor's `<!-- prettier-ignore -->` accepted; the class restated.
- S341 (G34; S334's class, second occurrence) — turn 15 v1 briefed the shared subscribed category-tree store (a structural decision) with "No AGENTS.md change"; it stopped. Corrective (class rule, in force from 2026-10-20): every brief that adds a module or changes how shared state, a workflow or a module is structured carries the exact AGENTS.md replacement within the 5,120-byte budget; a third occurrence makes it a brief-checker rule.
- S342 (G3 addendum 2) — turn 15's brief said "fifteen" useCategoryTree call sites from the grep's line count without reading its lines (the fifteenth line is the declaration); the executor corrected it to fourteen. Corrective: a count stated from a grep is read line by line first.
- S343 (G3) — turn 15b's brief said "23 tests in nine causes" for proof #6; the list holds 24 ids in eight groups; the executor flagged it. Corrective: counts in a brief are recomputed from the list they describe.
- S344 (G3 addendum 2) — turn 15b's brief made the lane's masked results file the reporter's input without checking that a regex mask keeps a JSON file valid; redact's e-mail rule broke a JSON escape and lane 3's failure body was lost (INC-794). Corrective: turn 15d masks the results file as data (json.dumps) with a self-check; first occurrence of the class.
- S345 (G37) — turn 15g's Part C prescribed the route wait for every scratch-chain call whose page reads the tree, without sizing what the wait costs across the tests it reaches (about 115 calls × 2 projects × up to 15 s; proof #12's slowest lane 1,771 s); the census's criterion was "the page consumes the tree", where J7's purpose is "the test's outcome depends on the served place". Corrective: turn 15h — the factories take the wait as an option, the three tests that need it opt in; the rule for a route wait written.
- S346 (G34, G25) — the END-TO-END CHECK paragraph named only GitHub runs and the next brief as the check, so the executor's rule about concluding read it as deferral (turn 15i stopped; 15j and 15j v2 stopped on the same rule and on "no Playwright run in your sandbox"). Corrective (class rule, in force): the END-TO-END CHECK is something the executor does IN ITS OWN TURN against its preview; a brief never forbids a verification means the executor's own rules call for — it states limits instead; the report pastes the browser's launch line or its exact error (turn 15j v3: Chromium started — INC-506's limitation gone by evidence).
- S347 (G25, G34) — turn 15k reinstated local browser runs (`bun run e2e:local`) from "the sandbox starts a browser" without checking the executor holds the staging E2E credentials in that environment (it reported they arrive only through the secret box). Corrective: local runs not prescribed again on that basis; the executor's in-turn check is its preview, the full suite CI's (the credentials were later confirmed present, turn 17 v2).
- S348 (G3, G4) — turn 15j's report named "admin leaves without their own head metadata"; recorded as "a claim to read before any ruling" and not read until it stopped turn 16 (21 admin pages without head()). Corrective: a finding an executor report names is read and dispositioned in the same verification, never parked.
- S349 (G29; S348's class) — turn 16 v2 copied admin.tsx's head shape without checking it against the executor's full head rule set (og:type and twitter:card missing; $name.tsx incomplete); it stopped. Corrective: a brief that writes a head runs the six-tag census first (turn 16 v3).
- S350 (G16 addendum) — turn 16 v3's B6 quoted an AGENTS.md line's "old" text short of its tail " Why: plain launches use production `.env` (INC-464, DEC-146, D228)."; the brief said "replaced whole", so the executor rightly dropped the Why and the sha differed. Corrective: restored in turn 17's AGENTS.md replacement; old texts quoted whole.
- S351 (G34; S346's class at its fourth occurrence — 15i, 15j, 15j v2, 16, 16 v2, 17, 17 v2 stopped on the executor's own rules in one night) — each brief was written to the executor's previous wording of its rules. Class rule, in force: a brief's END-TO-END CHECK covers EVERY flow the turn adds or changes, each run by the executor in its turn — signed in when the flow needs a session, with real input, read back through the UI — against ethio-staging (`bun run e2e:local`) or an isolated temporary backend, never production; a flow that cannot run in either is named with the reason BEFORE the brief is sent; every brief restates the executor's page-head and verification rules it will meet. To be installed in the Knowledge/AGENTS at the next records turn (G46).
- S352 (G34; the S334/S341 class again) — turn 17b v1 briefed a new database mechanism (the acceptance_guard trigger, M13) with "No AGENTS.md change"; it stopped. Corrective: v2 replaced the born-closed line's acceptance sentence with the trigger's rule.
- S353 (G3) — turn 17b's D3 named set_listing_price for a draft without reading the door's status gate (20261014194317 :702-:768, `v_prev.status NOT IN ('active','reduced','closed')`); D2's "read back" left the reader unnamed; LG-29 and LG-30 red on run 1079 (the expected-red window). Corrective: the ruling — the draft doors that accept drafts (set_listing_pin, set_listing_photos_soon, set_cover_photo, submit_listing); LG-29's owed state proven by the service client.
- S354 (G34; Lovable's technical-decision rule — the second occurrence of "a brief contradicts one of Lovable's AGENTS.md rules", S352 → S354) — turn 17c v1 carried DEC-217 (CI worker concurrency with keep/revert criteria) with "No AGENTS.md change"; it stopped. Class rule (in force, not yet installed): every change in a brief is classed against BOTH of Lovable's AGENTS.md rules — a structural decision and a technical or architecture decision — and each that is one gets its AGENTS.md line, with the byte budget computed.
- S355 (process) — five record appends since 06:3xZ (2026-10-21) were written as `cat >> file <<'EOF' </dev/null` — the later stdin redirect replaced the here-document, so they wrote nothing; found at 06:5xZ and rewritten from the conversation. Class rule: one stdin per append; the record's line count is checked after every append.
- S356 (Knowledge D5; S322's class, second occurrence) — turn 19's C4 changed legal.accept.liability's wording in place ("A RENAMED STRING IS A NEW KEY"); the brief checker, which carries S322's rule, was not run on turns 17c, 18 or 19, and its regex would not have caught this wording. Correctives: the checker gains "changed-key-wording" and "existing-key-given-text" (proven on the stopped brief); every brief and ruling is run through the checker before it is sent, as a numbered step of the pre-flight; v2 used the NEW key legal.accept.liabilityLimits.
- S357 (G16 addendum — an anchor not re-located) — turn 19 v2's E2 roadmap wording still named docs/governance/briefs/bundle-22-turn-19.md, not the -v2 file STEP 0 saved; the executor kept the dictated words and flagged it. Corrective: fixed in turn 20's roadmap step; every -v2 brief's roadmap lines name the -v2 path.
- S358 (G34; Knowledge B4 "One component per file" — the third brief-vs-executor-rule conflict after S354 and S356) — turn 20 v1's C5 put a second component (LegalReviewDialog) inside legal-page.tsx to avoid the new-module rule (S295); it stopped. Corrective: promoted to the checker ("second-component-in-file", proven on the brief); v2 — the dialog is JSX inside the LegalPage component, its state in LegalPage.
- S359 (G34 — a brief's scope missing a file its own steps require) — turn 20's new table legal_reviews, which has a person column, owed its line in e2e/helpers/pool-reset-map.ts (DEC-099; the census is src/test/pool-reset-map.test.ts); the brief did not name it; run 1086 found it and the executor fixed it in the same turn. Class rule → check-brief.py.
- S360 (§8 reading order) — run 1087 was ruled on from the lanes' failure files without reading guards-last-failure.md's first-paint budget failure ("JS: 321.9 KiB / 320 KiB — OVER BUDGET"; turn 20's nav-alerts.ts pulling the admin legal service into every page's first paint). Corrective: the reading order read whole before a ruling; turn 21 v2's B5 cut the import.
- S361 (G34; the fourth brief-vs-executor-rule conflict) — DEC-230 changed a rule written in AGENTS.md (DEC-217's CI-lanes line) without the brief changing that line; turn 21 stopped. Corrective: a decision that alters an AGENTS.md rule carries the rule's new text (turn 21 v2's E1).
- S362 (G34; the fifth conflict) — turn 21 v2's B5 and THE CHECKS required `bun run build` against the platform rule "Do not run the Lovable project's builds or typechecks manually"; it stopped. Corrective: promoted to the checker at once ("manual-build": bun run build|typecheck, vite build, tsc --noEmit); v3's evidence is the import cut by grep and CI's first-paint job.
- S363 (G16 addendum — an expectation not executed) — turn 21 v3's B5 promised "the first paint back under its 320 KiB budget" without a measurement, although the supervisor could build in its own clone; B5 cut 1.9 KiB and left 37 bytes over (run 1088). Corrective: a brief that predicts the budget states the supervisor's measured build of the change (done for DEC-231: 296.8 KiB).
- S364 (G3 addendum 2) — DEC-230's question said CO-6 "tolerates that interference by design through its notARoot retry, which INC-813's message defect disabled"; the retry also depended on the dialog's root list, which a 60-s cache kept stale (INC-814) — unread when written. Corrective: a claim that a retry recovers names the data the retry re-reads, read in the code.
- S365 (G29 — a class census by one spelling) — turn 21's census grepped one form of the class (`? … .message : String(`) and missed the `&&` form; the live instance country-verb-dialogs.tsx :52 (the force-close choice never appearing) was found a turn later (INC-815). Corrective: a class census greps the operator or construct (`instanceof Error`), not one sentence shape — now a lint rule (turn 22b).
- S366 (G34; the sixth conflict — Lovable's "add or update a small test for it next to the project's existing tests") — turn 22c changed a rule (C1's slot rule) with "Spec files are not edited in this turn" and no test file in scope; it stopped. Corrective: the brief template's HOW TO WORK says "spec files" means e2e/*.spec.ts and every changed rule names its unit test; ruling r1 permitted e2e/helpers/country-slot.ts and src/test/country-slot.test.ts.
- S367 (G29; S365's class, second occurrence in one day → the class rule) — the lane-count census grepped two spellings of the number ("smoke,email,1,2" and "/12") and stated "no other place"; the executor found four more inside the summary step — the bound one past it (range end 13), the total (14 = 12 + 2), a regex range (1[0-2]) and the word ("fourteen"). Rule: a census of a constant greps every form it can take — the literal, the bound one past it, the total it feeds, a regex range, and the word — before a brief says "no other place".
- S368 (the operator's standing "don't leave Lovable idle") — "I'll give you turn 23 as soon as it's ready" was written and the turn ended without writing it; the executor idled from 15:37Z to 22:0xZ (2026-10-21). Corrective: a brief promised "next" is written in the same turn as the promise, or the reply gives its ETA and the work continues before the reply ends.
- S369 (G34; the seventh conflict — the migration tool's instruction "add created_at/updated_at timestamps (with an update trigger)") — turn 23's B3.1 built legal_version_texts with created_at only; it stopped. Corrective: promoted to the checker at once ("new-table-timestamps"); ruling r1 — updated_at and the finality trigger as the update trigger (legal_versions_finality's own precedent).
- S370 (G34 — a brief's scope missing a file its own steps require; the census of grants not run) — turn 25 listed five redeclared functions with browser grants without grepping scripts/public-surface-allowlist.txt for them (turn 23's brief did, for its doors); the scratch migration guard refused the five grants. Corrective: ruling r1 — the five lines in the restated-grant form; a brief that redeclares a function with a browser grant greps the allowlist and carries its line.
- S371 (G16 addendum) — the turn-25 brief's B2.2/B2.3 wrote M18's option universe and field rule for every non-base language while its own F1 said "other than English and Amharic" — the two halves of one brief disagreeing, unread side by side (INC-820). Corrective: a brief that adds rows to a per-language universe names the languages it excludes in the SQL step itself, and the doc step's wording is checked against the SQL step before sending.
- S372 (S368's class, second occurrence) — the turn after 26 was not drafted while turn 26 ran (02:28Z → 02:40Z, 2026-10-22), so Lovable idled while the flake-and-cleanup brief was written; told the operator with an ESTIMATE (45 min). Class rule at two: the moment a brief is delivered, the next turn's brief is started in Claude's files — the operator's directive of 2026-10-11 ("have the next turn ready by the time each turn finishes") is the rule.
- S373 (the operator's 2026-10-17 directive — a brief asking what the executor's rules forbid) — turn 27 wrote G38's repeat run as a local `--repeat-each 12 --workers 8` command although DEC-184 (2026-10-16) moved every flake proof to the operator-dispatched Flake check workflow, and the line sat in the AGENTS.md written into turn 25's brief; it stopped. Corrective: ruling r1 — DEC-184 stands, the before-evidence from a Flake check the operator dispatches; check-brief.py refuses a brief that writes `--repeat-each` as a command for the executor.
- S374 (G31, G40; S178's class, second occurrence — a walk line written without the record's known limit) — walk line 1 asked for a brand-new account's sign-up on the published site although launch-gate.md line 5 says only the Resend account owner's address can complete sign-up until the sending domain is verified; the operator saw "Something went wrong" (INC-822). Corrective: every walk line that sends an e-mail on production is checked against launch-gate.md's mail line first; DEC-235 brought the sending domain forward.
- S375 (G3 addendum 2, G31) — walk line 3 said "Open ethio.com/terms" although the project's own record puts the new app on its Lovable published URL until the DNS cutover (ethio.com serves the old build). Corrective: corrected to https://my-market-dawn.lovable.app/terms; a walk's address is read from the record.
- Also logged, not numbered: the executor's end-to-end rule and its other platform rules stopped turns 15i, 15j, 15j v2, 16, 16 v2, 17, 17 v2, 17 v3, 17b, 17c, 19, 20, 21, 21 v2, 22c, 23 (three times), 25 and 27 before or during STEP 0 — each stop is recorded against its slip above; a stray `cat >>` with no input hung a command a second time on 2026-10-22 (no record harm); the two deviations filed under G10 and not as slips: review_months built as a FACT rather than DEC-219's "operational, not frozen" setting (2026-10-21 08:2xZ), and Knowledge v3.11 pasted by the operator before the records turn landed e2e-harness.md §Authoring laws (2026-10-23 07:55Z; the J1–J9 text moves to turn 30's Part A).
- S376 (G0.3, G16) — turn 30's D2 census of `| grep -q` sites named four shell guards and missed scripts/publish-evidence.selftest.sh :73, although the supervisor's own grep had listed it. Corrective: ruling 2 added the site and the file to scope; check-shell-pipes.sh now refuses the whole class.
- S377 (G34) — the J1–J9 block for docs/features/e2e-harness.md was written verbatim with `e2e/**` under Prettier's Markdown glob, which escapes it; the brief named no formatter. Corrective: ruling 2 accepted the one escape; a brief that lands text under a formatted glob names the formatter's effect (G34, INC-406's clause).
- S378 (G16 addendum) — two expectations in one brief were never executed: B8 expected service_role EXECUTE on all three revoked doors (two never had it), and CG-5 assumed refused calls count toward a dial (rate_gate's increment rolls back with the door's RAISE — INC-844). Corrective: ruling 3 withdrew CG-5 and registered the class; a brief's proof lines about grants are read from the live catalogue before they are written.

SLIPS (the supervisor's, with the guardrail each names) — S379 … S452, the Foundations bundle (2026-10-23 12:0xZ → 2026-10-26 22:5xZ)
- S379 (G23; 2026-10-23 13:0xZ) — the turn-28 brief took the executor's attributed sequence as PW-153's cause without reading the debounce (use-draft.ts `DEBOUNCE_MS = 2000`); turn 28's producer fix stands as a real improvement but was not PW-153's cause; INC-809 reclassified back to TEST. Corrective: bundle 22 turn 32 Part A carries the test's wait (awaitDraftSaved — `post-save-state` data-state="saved") with its G29 census.
- S380 (G16 — a draft brief written with inline self-corrections; 2026-10-23 13:5xZ) — the first draft of the turn-32 brief (09:03) carried "No — …" and "STOP: do not invent one" inside D3, C1 and F1 — thinking left in the executor's text; caught on the re-read after compaction and rewritten whole. Corrective: a brief is composed from a settled design, never drafted while deciding (G16's scan now also greps for "No —", "STOP:" and "?" inside a step).
- S381 (G3 — INC-846's cause asserted from one run; 2026-10-23 13:5xZ) — the 12:4xZ entry wrote the PUBLIC-default cause as decided; attempt 2's green lint step on the same code showed it was a hypothesis. Corrective: a CI number is a cause only after two runs agree or the names are read. (Confirmed later: the turn-32 PUBLIC line "was aimed at the wrong grantee (S381's lesson: the names decide)", 2026-10-24 02:3xZ.)
- S382 (G37 — the owed-test census after a contract change; 2026-10-23 18:3xZ) — the turn-32 brief named SU-3 and the new SU-4/SU-5 but not the file's other form drivers (A-1+A-2 via signUpFresh, SU-1, SU-2) nor the nightly's own copy of signUpFresh (e2e/nightly/auth-resend-exhaustion.spec.ts :15-:27 — a duplicated helper, K2); run 39980672474 on `53191533` red by the email lane only (class (c), named late). Corrective: a contract change on a form lists every test that drives that form by grep of its test ids/buttons across e2e/ AND e2e/nightly/, and a duplicated helper moves onto one (ruling turn 3: e2e/helpers/auth-form.ts signUpThroughForm).
- S383 (G49/D235; 2026-10-24 02:3xZ) — turn 32's brief chose links UNDER the sentence to dodge Amharic's inflected names instead of the standard rich-text link-token pattern (a translator-controlled `[text](role)` token per language — react-intl's `<link>` tags, GOV.UK's inline links); the operator had to flag it. Corrective: the component takes link tokens in the sentence; the existing sentences get NEW keys with tokens (D5 — the Translations store's approved rows outrank the file, so the old keys cannot be edited in place), the old keys retired (bundle 22 turn 33).
- S384 (G34 — second occurrence of the class, turn 30's M20 stop the first; 2026-10-24 03:1xZ) — a brief that lands a mechanism (a token renderer, readerFailure) said "No AGENTS.md change"; the executor's rule ("record or replace its rule in AGENTS.md before finishing") stops the turn every time — turn 33 stopped before STEP 0. Corrective: class rule → check-brief.py "agents-line-missing" (a brief with "No AGENTS.md change" that also carries MECHANISM: NONE YET / a new shared export is a hit; proven on the turn-33 brief); ruling: AGENTS.md replaced byte for byte from AGENTS-turn-33.md (sha256 5556c6ae…). (The rule caught the same class before sending on 34b-2, 2026-10-26 14:2xZ — "no slip".)
- S385 (G3 addendum 2 — a partial read; 2026-10-24 04:1xZ) — bundle 22 turn 33's C2 said "the admin documents list carries each version's `texts` — legal-service.ts :13"; that line belongs to the version-detail type; admin_legal_documents() omits texts; the executor stopped correctly (G34). Corrective: a field claimed on a door's answer is read in the door's SQL (the jsonb_build_object), never in a client type by line number (M22 added `'languages'`).
- S386 (G0.6 PERFORMANCE lens; 2026-10-24 04:1xZ) — turn 33's Part D placed readerFailure in error-text.ts, which is in the entry's closure, so ~0.5 KiB rode the first paint (run 40057679164: JS 305.5/305 KiB); the lens named "one regex" and forgot the module's position. Corrective: a new shared helper names its chunk — entry or lazy — in THE SYSTEM header (the split into reader-failure.ts; the ceiling to 306).
- S387 (G0.3 — a partial census of the callers at ruling time; 2026-10-24 04:4xZ) — the ruling named readSellerIdentity's "caller" in the singular; wizard.tsx :386 and step-review.tsx :271 call it with `void …then(...)` and no catch (INC-849). Corrective: class rule — null→throw lists every caller by grep and each lands its catch; both callers catch in the same turn.
- S388 (G3/G16 addendum; 2026-10-24 07:1xZ) — the Foundations turn-1 enumerator census counted e2e/post-wizard-where.spec.ts :83 on the word `glob` (`for (const glob of ["**/api/listings/**", …])`) without reading the line — an unexecuted expectation; the executor stopped at C4 (the seventh non-guard allowance would be stale). Corrective: a census line in a brief is read at the cited line, never matched by word (21 allowances).
- S389 (G36/G44 and the operator's standing rule of 2026-10-11; 2026-10-24 07:4xZ) — the first connector-era check-in was set at 30 minutes, so Lovable sat idle after finishing (the operator, 03:38 local: "i see lovable is done but you seems to have stoped giving it a prompt …"). Corrective, in force: while Lovable works, a poll every 3 minutes (get_message), the next ruling sent in the minute it finishes, the next brief prepared between polls; the stale 30-minute check-in could not be deleted (the harness denies the delete) and fires harmlessly.
- S390 (G16 addendum / G3; 2026-10-24 07:5xZ) — the continuation-2 ruling stated "HTTP 403 … PostgREST's mapping" as an expectation without executing it; the executor's probe showed 401 with body `{"code":"42501",…}` for the anonymous role and corrected it in the same breath (G3 addendum) — the second unexecuted expectation of the Foundations turn-1 brief (S388 the first). Corrective: LGC-6 asserts 401 + body.code "42501" with a comment naming the mapping (the observed contract, not a loosening).
- S391 (G0.6 performance lens — S386's class, second occurrence; 2026-10-24 08:2xZ) — the Foundations turn-1 brief (D4, D5) put page-only code into two first-paint modules (legal-reader.ts, legal-kinds.ts; both imported by use-legal-gate.ts :6-:7) without checking their place in the closure; run 40075831535 red on the budget (306.2/306) — INC-864. Corrective: THE SYSTEM header's performance lens names, for every file the brief touches, whether it is in the first-paint closure (bundle-closure.mjs's entry closure), and a page-only export never enters a first-paint module (MUST_STAY_LAZY).
- S392 (G37; 2026-10-24 08:2xZ) — the Foundations turn-1 owed-test census after a role/contract change (E5) listed TR-41/27/37 and the unit tests but not shell.spec.ts :300, whose locator `getByRole("menuitem", { name })` names the role a plain menu item has (a DropdownMenuRadioItem is role menuitemradio). Corrective: the owed-test census after a role/contract change greps e2e/ for the role name, not only the test ids.
- S393 (G16 addendum — an unlocated anchor; second occurrence with S392 = anchors in test files; 2026-10-24 09:32Z) — Foundations turn 2's B3 gave the new upstream tests the ids UP-1…UP-3, which src/server/supabase/upstream.test.ts :89/:123/:136 (INC-574) already carries — not grepped before the brief was sent (the test-ids guard TI-1 exists for exactly this). Corrective: every test id a brief assigns is grepped against the repository before delivery; check-brief.py rule new-test-ids-free; corrected in the ruling: UPS-1…3.
- S394 (G0.6 lenses vs the order; 2026-10-24 09:55Z) — the turn-2 brief's B4 placed the counting reader in step (2), before the caller — the brief's own order put a read before the authority while its security lens claimed the opposite; the executor built what was written (INC-865). Corrective: a mechanism brief's ORDER is checked against its own five lenses line by line before delivery (each lens sentence must be true of the order as written) — added to the pre-flight.
- S395 (the INC-076 deletion guard; 2026-10-24 10:2xZ) — the 09:32Z ruling moved legal-page-data.test.ts's tests to legal-kinds.test.ts without naming the deletion manifest (docs/tracking/intentional-deletions.txt); CI on `eefd1141` (run 40084153912) failed the deletion guard; the executor cannot write a commit marker (the platform commits). Corrective: class rule — a brief, ruling or prompt that removes, empties or moves a file whole names the manifest line in the same sentence; check-brief.py rule deletion-without-manifest; turn 3 A1(a) adds the path line.
- S396 (G16; 2026-10-24 10:5xZ) — Foundations turn 3's range "RT-1…RT-14" kept an id (RT-13) whose test was removed in editing. Corrective: class rule — after any edit that removes a test, the brief's id ranges are re-derived from the test list; check-brief to gain a range-vs-definitions rule.
- S397 (INC-388 — a "risk noted", numbered as such; 2026-10-24 10:5xZ) — the turn-3 continue did not re-carry the AGENTS.md text inline (an attachment is readable only in the turn it arrives); "if F1 stops for it, resend". The record does not show F1 stopping for it: turn 3 closed on `9aaf7db3` with AGENTS.md sha b4711479… equal.
- S398 (the schema from one caller; 2026-10-24 11:1xZ) — Foundations turn 3's C1 stated "sent by use-draft.ts bodyFor :234-:269 with EVERY key present" and wrote `listingId` without `.optional()`; the e2e helpers were not grepped; the executor's local Part-C run covered unit tests only (the brief put the E2E check at the END of the turn), so the defect reached CI (run 40087352763: 129 gating E2E failures, one cause — INC-868). Corrective: class rule for briefs — a schema's required keys are derived from EVERY caller found by grep of the path string (src/** and e2e/**).
- S399 (S398's class, two in one brief; 2026-10-24 12:2xZ) — Foundations turn 3's assist schema (`period` enum, `listingId` non-null) and photos.$id (`position` int schema answering badShape where PP-17 pins badValue) were written from reading the handlers, not the callers and the tests. Corrective: class rule in turn 4's HOW TO WORK — every schema begins from a caller census of src/** and e2e/**; the brief's schemas are drafts.
- S400 (CHANGE lines vs their pins — the third such class rule in one session with S398/S399; 2026-10-24 13:1xZ) — Foundations turn 4's D1 CHANGE (background malformed id → badShape) contradicted PP-31's pinned `badValue`; the brief did not grep the E2E pins for the answers it changed. Corrective: a brief's CHANGE line is written only after grepping e2e/** and src/**/*.test.ts for the answer it changes; the pinning tests are named on the CHANGE line (done by hand at drafting; check-brief gains no rule).
- S401 (G3 addendum 2 — a claim about code written without the decisive lines read verbatim; 2026-10-24 15:50Z) — turn 7's CHANGE (4) said the options route served a fresh cache hit before the caller check (:128-:129); the executor read :118-:129 and showed the caller check already ran first (the security property held before and after). Corrective: a CHANGE line that asserts today's order quotes the lines it relies on.
- S402 ("a repeat of an earlier one"; 2026-10-24 16:52Z) — a `cat >> file` with no stdin hung a shell for 2 minutes again. Corrective: record appends go through the Write tool and a single cat of that file.
- S403 (G3 addendum 2; 2026-10-24 18:00Z) — turn 9's CHANGE (2) said geocode entries would live "until the next UTC bucket"; versionCache skips the version read within ttlMs (version-cache.ts :33-:34), so with ttlMs = 24 h and a 24-hour bucket the lifetime stays exactly 24 h from insertion; the executor caught it before writing code. Corrective: a cache CHANGE line is derived from version-cache.ts's read path, quoted, not from the version function alone (ruling: CHANGE (2) corrected to the bound only; GEC-4 added).
- S404 (an unexecuted schema; 2026-10-24 18:50Z) — the `coordinate` schema was written into turn 9's brief and never typechecked (in zod 4, z.coerce.number() has unknown input); the executor's local checks don't typecheck (the platform rule leaves that to the harness), so CI was the first typecheck (run 40120074214: primitives.ts(50,33) TS2345). Corrective, standing: every schema a brief spells is compiled by the supervisor first (tsc --strict against zod 4.6.7 in the scratchpad).
- S405 (G3 addendum 2 / G16 addendum — an anchor read by grep hit; 2026-10-24 21:45Z) — turn 12's CHANGE (6) called e2e/import-security.spec.ts :121/:181/:234/:250 request bodies; they are the `Family` table's `digest: true` configuration flags (read at :819 `if (family.digest === true)`); the executor correctly removed only the two body keys (IG-5/IG-6). Corrective: brief anchors that name a line's role are read with ±5 lines before the role is stated.
- S406 (G36 / §8 PROMOTE STATE — a stale rule source; 2026-10-24 23:16Z) — the supervisor told the operator a push cancels the CI run in progress; ci.yml :31-:33 at `eb5ae864` reads `cancel-in-progress: false` — a running run always finishes and the next waits (a newer push replaces a waiting run, never the running one); the operator had said so repeatedly. Corrective: the next prompt goes out as soon as the turn is verified on dev; the previous run is read when it lands and a red is fixed first in the next prompt; amendment owed to G36 at the next instructions version.
- S407 (G37 — local E2E sizing; 2026-10-25 00:27Z) — turn 14's THE END-TO-END CHECK asked two whole spec files plus up to five more — beyond G37 (at most three spec files locally) and the 600 s sandbox ceiling; it cost two continuation segments. Corrective: briefs size local E2E to the moved surface within the ceiling (≤ 3 files), and allow one `bunx tsgo --noEmit` at THE CHECKS (applied in turn 15; that allowance is the first half of S409 — the replacement brief: harness log only + CI judges types).
- S408 (caught before sending; 2026-10-25 00:42Z) — compose.py replaced the placeholder DATE inside "UPDATE" (UP2026-10-25 ×3 in turn 15). Corrective: the composer replaces whole words only; turns 11–14 checked clean.
- S409 (the executor's platform rules; 2026-10-25 00:45Z) — (1) the supervisor turned a one-off accepted departure (`bunx tsgo`) into a standing exception against a platform rule; (2) wrote an auth.users FK (ai_calls.actor_id) without reading the repository precedent (public.profiles(user_id) ON DELETE SET NULL ×5); turn 15 stopped on both. Corrective: replacement brief — harness log only + CI judges types; actor_id → public.profiles(user_id) ON DELETE SET NULL; check-brief.py should gain a rule: no "auth.users" reference in a new table (follow-up).
- S410 (the generated types; 2026-10-25 01:15Z) — ai_record_call's parameter list was specified without checking how the generated client types render nullable SQL parameters (they are optional only when defaulted and trailing); turn 15's fourth STOP (TS2322). Corrective: M2 redeclares ai_record_call with p_actor and p_provider_status trailing DEFAULT NULL (mark 20261025150000).
- S411 (G34 — the scope list must contain every file its steps require; 2026-10-25 04:17Z) — turn 18's brief named the rule's shape requirement (src/lib/schemas, .strict()) but not its file; the executor stopped on scope. Corrective: ruling — NEW src/lib/schemas/category-image.ts authorized (turn-16 precedent).
- S412 (G16 addendum — every expected value located in the clone; 2026-10-25 04:38Z) — turn 18's Part D expected route-client.test.ts's INC set to be INC-861 only, written without reading the allowlist's third line (the tile-host probe, leaflet.ts, INC-875, stays); the executor's second STOP. Corrective: ruling — the set stays [INC-861, INC-875].
- S413 (G34/G0.3; 2026-10-25 04:53Z) — turn 18's retirement census missed the third copy of the route allowlist (eslint.config.js :111–113 ROUTES-BOUNDARY-IGNORES) — the brief named two allowlists and the census grep did not cover eslint.config.js; the executor's third STOP. Corrective: ruling authorizing the three ESLint lines; vendor count corrected 71 → 69; owed: one source (the allowlist) feeding the lint ignores, or a test that the two agree (CF-RT-5 later named in turn 20's brief).
- S414 (the INC-076 deletion guard — S395's class; 2026-10-25 05:10Z) — turn 18's brief named the four retired files' deletions but not the declaration in docs/tracking/intentional-deletions.txt (the interim runs on `36c6b9fa`, `57d0fe58` red on the deletion guard; the executor's fourth STOP: the manifest out of scope). Corrective: ruling 4 — declare the four paths; owed in turn 19's HOW TO WORK: a deleted file's declaration line goes in the same edit as the deletion; check-brief's rule "exists but did not fire — check it".
- S415 (minor — brief wording; 2026-10-25 05:10Z) — turn 18's brief called callRoute's option `body`; it is `json` (a disclosed departure, accepted).
- S416 (G16 addendum; 2026-10-25 09:37Z) — turn 19's draft anchors were not re-executed when it was written; at `37f691b4` two had moved by one line (postTranslate :440, listProviderLanguages :504). Corrective: anchors re-located when the brief was rewritten for Claude Code.
- S417 (G7/G3; 2026-10-25 09:4xZ) — the supervisor told the operator "I start it from here" (the smoke question) without having tested `claude --cloud` from this workspace; the plan marked the channel "to test"; it needs a TTY and the workspace proxy refuses platform.claude.com. Rule: a capability promised to the operator is tested first, or labelled untested in the promise. (The channel deviation, G10: the operator starts the sessions.)
- S418 (G16 addendum / G0.4; 2026-10-25 09:4xZ) — kit v1 shipped with a permission list never checked against the protocol it serves; the dev-landing rewrite changed the protocol and the hooks but not settings.json's PR-era denies (INC-882). Corrective: EXH-16 is the guard (every protocol command through the permission rules and the guard).
- S419 (SECOND occurrence of S389's class — G36/G44 and the operator's rule of 2026-10-24 03:38 local; 2026-10-25 13:19Z) — after sending turn 20 the supervisor scheduled a 25-minute check-in, so Lovable's two quick STEP 0 stops sat until the operator relayed them (09:19 ET: "lovable gives a quick response but you schedule your check for very long time and miss the lovable stopes sitting for long time"). Corrective, in force, mechanical: after EVERY send_message to Lovable, a 3-minute timer (background sleep 180 → re-invoke) and get_message on each wake until the turn ends; the next ruling within the minute it finishes; the next brief prepared between polls. Class rule: the operator-rule list carries "Lovable poll = 3 minutes", checked before any connector send (to be installed in instructions v1.15 as a G-rule addendum).
- S420 (G0.3 — "a census enumerates by the concern's definition, never by the name"; 2026-10-25 13:3xZ) — the turn-20 pre-flight grepped `SCRATCH_KIND` (the name) and found two copies; the pattern literal had a third (legal-service.ts :105); the brief's own SFN-3 (a pattern grep) caught it before landing. Corrective: a pattern census greps the literal, not its local name (ruling R1: legal-service.ts joins the files).
- S421 (polling the branch head instead of the message; 2026-10-25 16:12Z) — dev's head moved at 15:57:34 and the supervisor did not read the executor's message then; the executor sat idle about 14 minutes until 16:11 (turn 23). Rule in force: every 3-minute poll reads get_message (the first poll of a brief turn reads only `.response` by jq from the saved file), and a moved head is read at once.
- S422 (G0.2 / G54 c at brief time — a new control written without reading how its siblings render; 2026-10-25 16:54Z) — turn 24's NEW calendar retry was a raw `<button>` while the shared Button primitive (src/components/ui/button.tsx) was in reach and the repository's own "Try again" controls (legal-accept-screen.tsx :108, certify-block.tsx :81) already use `<Button variant="outline">`; turn 24 stopped before STEP 0. Rule: the pre-flight reads the sibling census of every new UI element by its concern (here every `common.tryAgain` control) before the brief is generated; the form kit's Button census guard (INC-899) makes it mechanical.
- S423 (the S422 class twice in one hour; 2026-10-25 17:10Z) — turn 24's new code was not checked line by line against AGENTS.md before sending (B1's `routes[id]` / `budgets[id]` against "A map indexed by an outside key is read through `ownValue`, never `map[key]`"); two executor stops (5.7 credits, ~35 minutes). Rule in force: before any brief is generated, the prototype's whole diff is read against every line of AGENTS.md and the platform rules the executor has quoted (raw <button> → Button; map[key] → ownValue or a Map; no silent catch; e2e only through e2e:local), and the brief's header names the check.
- S424 (G16 addendum — an expected-output clause not executed against the prototype; 2026-10-25 19:05Z) — turn 26's brief said `bun run i18n:usage` "expected: no change" without running it; a new src module moves the map's scanned count (569 → 570); the executor reported it as a departure. Rule in force: every "expected" line of THE CHECKS is produced by running the command on the prototype, i18n:usage included.
- S425 (the S422/S423 class, third occurrence that day; 2026-10-25 20:10Z) — the S423 line-by-line read listed the rules quoted so far and missed one the platform has always had (no TypeScript non-null assertions); the repository's own e2e files carry `baseURL!` (shell.spec.ts :553, feed-screens.spec.ts :430/:503, post-wizard-where.spec.ts :1007), which made the copy look precedented; turn 28 stopped before STEP 0. Class rule, now a script: check-brief.py gains `non-null-assertion` (proven on the 20:09 brief: 3 hits, exactly the three); fix: `url: baseURL`.
- S426 (second occurrence of the raw-control class after turn 24's stop; 2026-10-25 22:14:41Z) — a raw `<button>` in a test FILE block (turn 30's C6 provider-layers.test.tsx Asker); the brief checker covered `!` but not raw buttons, and the supervisor's reading treated tests as outside the control rule; turn 30 stopped before STEP 0. Corrective: the Asker uses the shared Button; check-brief.py gains [raw-button] for every .tsx FILE block and EDIT NEW text, tests included.
- S427 (the S395 class, second occurrence; 2026-10-25 23:15Z) — the turn-30 brief (B8, "Delete src/i18n/locales/admin-layer.test.ts … and src/i18n/compiled-admin-loader.test.ts") deleted two files without the declaration line the deletion guard requires (run 40241386426 red — INC-905); check-brief.py's [deletion-without-manifest] existed but matched only "delete the file / is deleted / are removed …", not the imperative "Delete <path>"; sim30 did not model the guard. Fixed: the rule's pattern also matches delete/remove/git rm/rm followed by a repository path (backup check-brief.py.bak-s427); proven red on the turn-30 brief (line 1218).
- S428 (a header claim nothing checked; 2026-10-25 23:45Z) — turn 31's brief header said "Checked by script … no map read by an outside key", but nothing checked the new code for it (CF-OV-1's MAY_REACH[key] with an outside key); turn 31 stopped before STEP 0. Fix: overlays.test.ts reads `ownValue(MAY_REACH, key)`; check-brief.py gains WARN [own-key] (backup check-brief.py.bak-s428). (Promoted to a hit by S449.)
- S429 (G0.6 failure-modes lens; 2026-10-26 01:45Z) — the turn-32 brief's ModalRoot carried a failure path for uncontrolled roots only — the lens named OVF-16 (uncontrolled) and stopped; the prototype was never tried with a controlled root whose download fails, though 22 of 23 consumers are controlled (INC-908). Rule in force: a mechanism's failure-mode lens enumerates the consumer KINDS the census found (controlled, owner-opened, uncontrolled) and the brief carries a failure test per kind.
- S430 (G6 and G40 — read the record before stating CI behaviour; S406's class; 2026-10-26 02:40Z) — the supervisor told the operator that 32b would not push until turn 33's CI had finished, "so pasting it won't cancel that run"; DEC-181 already settles this: runs queue (cancel-in-progress: false; .claude/rules/40-ci-evidence.md), and a landing never cancels a running run. The operator: "I kept telling you even if pushed, it will be queued, not cancel earlier ci run". Corrective: the records turn and v1.15 correct G36 and §8's PROMOTE STATE line (G36's "a push cancels the run in flight" predates DEC-181).
- S431 (G34 — every step performable within its scope; 2026-10-26 03:25Z) — (1) the turn-32b brief planted its proof (`import "vaul"`) in src/components/app-shell.tsx, outside its own SCOPE, so the scope guard refused it; (2) it said vaul and cmdk have "no importer today", but drawer.tsx :2 and command.tsx :5 import them. The executor's correction accepted. Class rule: a planted proof goes in a SCOPE file; check-brief should flag a plant path outside SCOPE (guard debt for check-brief.py). Ruling 1 as a brief: the plant in overlay-facade.tsx.
- S432 (G33/G34 and G0; 2026-10-26 06:3xZ) — turn 34's ruling 2 widened SCOPE in prose instead of the brief form the kit reads (BASE, FLAGS, SCOPE block, roadmap line 3 — the form of foundations-turn-32b-r1.md, the supervisor's own precedent of the same night), and it carried no THE SYSTEM header; turn 34 STOP 3 (seven new files refused). Class: a ruling that changes SCOPE is a brief. Corrective: every ruling that adds a file is written as a brief in that form and its scope is checked with the kit's own scopeVerdict on a simulated STEP 0 before it is sent.
- S433 (G0.3 at brief time; 2026-10-26 08:2xZ) — ruling 2's R2-3 changed what requestPasswordReset answers without the census of the screens that read the answer (the reviewer's BLOCKER: auth.tsx :391-:397 → "a reset link is on its way" for a request that never left the browser). Corrective: a contract change carries the census of its callers, and now a guard (AAN — scripts/conformance/auth-answers.test.ts).
- S434 (G16 addendum — an expectation written, not executed; 2026-10-26 09:3xZ) — ruling 3's R3-1 said SBE-1…4 pass before R3-2, but BLOCK D's SBE-4 already looked for the `auth-error` test id that R3-2 adds (e2e cannot run in the supervisor's workspace, and the block was not read against the BASE screen). Corrective: a red-first line for a browser test names, for each test it says passes, the test ids it reads and where they exist at BASE. Addendum: 34b's stale-chunk test was first named SC-6, an id e2e/admin-screening.spec.ts :416 already uses — TI-1 caught it in the supervisor's full run; renamed STC-1 before the brief went out.
- S435 (minor — G16 addendum; 2026-10-26 10:3xZ) — K1's brief stated 23 hook tests where its exact blocks give 22 (EXH-0…21) — a count written, not run.
- S436 (G0.3; 2026-10-26 11:0xZ) — K1 ruling 1's substitution matcher counted parentheses without reading quotes, and the delimiter reading it relied on was never checked against the shell's quote removal — a fix written for the four spellings in hand, not for the concern's definition (the reviewer's two findings, reproduced). Corrective: ruling 2 (quote- and escape-aware substitution end; the delimiter after the shell's quote removal).
- S437 (a change that weakened what it was meant to tighten; 2026-10-26 11:4xZ) — ruling 2's fallback discarded the expanding-body read it replaced (`cat <<EOF\n'$(at now)'` went 2 → 0), missed because the supervisor tested the new spellings, not the old ones against the new code. Corrective: DEC-269 (two readers) in ruling 3; later the before/after corpus (123 cases) at ruling 5.
- S438 (the executor's no-non-null-assertion rule — S425's class; 2026-10-26 11:5xZ) — rulings 1–2 had already added two non-null assertions (`cur += cmd[i]!`, `heredocs.shift()!`), which Lovable applied without flagging, and ruling 3's R2 added three more (`cmd[i]!`, `cmd[k]!`, `pending.shift()!`); Lovable stopped before ruling 3's STEP 0. The supervisor wrote new code in the surrounding file's style instead of the executor's rule. Corrective: ruling 3 rebuilt — all five replaced (`cmd.charAt(…)`; `shift()` narrowed by an early-return guard); the 27 older assertion lines in lib.ts/land.ts left for a kit turn (named in K2; later INC-932 and turn K2).
- S439 (a second reader of one concern; 2026-10-26 12:1xZ) — ruling 3 wrote a second delimiter reader in blankInertData beside the tokenizer's, and it split a quoted word at its space (`cat <<'A B'\nfix at root\nA B` refused — a refusal of inert data ruling 3 introduced). Corrective: ruling 4 — ONE word reader `wordEnd` for both delimiter readers.
- S440 (minor — recorded after S441/S442 in the same entry; 2026-10-26 12:3xZ) — ruling 2's roadmap title held `")"`, so the next step 0's "up to its closing parenthesis" left a residue on roadmap line 3 (still there at r4; 34b-1's roadmap edit removes it).
- S441 (found by the supervisor's 123-case corpus; 2026-10-26 12:3xZ) — ruling 4's one word reader kept ruling 2's quote removal (every quote and backslash stripped), so `<<'A\ B'` ended at "A B" — later than the shell's `A\ B` — and `cat <<'A\ B' > /tmp/x\nhi\nA\ B\nat now\nA B` hid `at now` (refused before K1, allowed at r4). Corrective: DEC-270 — heredocDelimiter (POSIX 2.7.4 quote removal, measured against bash for nine spellings) as the one delimiter reading.
- S442 (guardrail not named in the record; 2026-10-26 12:3xZ) — DEC-269 called data "provably inert" without asking who consumes it — `bash <<'EOF'\nat now\nEOF` and `cat <<'EOF' | bash\nat now\nEOF` allowed from ruling 3 to ruling 4 (refused before K1). Corrective: DEC-270 — data is inert only where its consumer never runs it (DATA_ONLY).
- S443 (minor — G16 addendum; 2026-10-26 13:4xZ) — the 34b-1 brief expected S-1 and SO-11/R-9 "2 passed" on both projects; playwright.config.ts :66-:73 keeps settings, auth-signin-errors and auth-reset off the desktop project, so S-1 runs once — a count written, not read from the config.
- S444 (AGENTS.md's UI lines; 2026-10-26 14:2xZ) — the 34b-2 brief's new shell notice was drawn `rounded-md border border-neutral-soft bg-card … shadow-bar` against AGENTS.md :37 "Shell: cards take `CARD_SURFACE` (no 1-px border; state borders on top)"; 34b-2 stopped before STEP 0. Corrective: check-brief.py gains [card-border] (proven: hits the 10:20 brief, passes the corrected one; backup check-brief.py.bak-s444); the notice = `cn(CARD_SURFACE, …)`.
- S445 (G0.3 and G38; 2026-10-26 15:0xZ) — INC-923's census enumerated the routes' code, not every consumer of the concern — the shell's list (`ownSignIn`, app-shell.tsx :739-:773) is a second copy of "which pages send to sign in" (INC-925); and S-1 (e2e/settings.spec.ts :21) is a weak proof: waitForURL(/auth) passes on the transient /auth and expectSignedOut passes on Home (it must prove the page stays). Corrective: requireSignedIn gains one exported list of its pages (SIGNED_IN_PAGES), read by the shell, with a census both ways and a browser test over every page (turn 34w).
- S446 (G0.3 / owed-test census; 2026-10-26 15:3xZ) — 34b-2 added a page-wide element with a generic ARIA role to the shell (the OnDemandNotice wrapper `<div role="status" aria-live="polite">`, always drawn, empty) without a census of the tests that query that role (auth-reset.spec.ts :47, :144; settings.spec.ts :127 scoped to its form; legal-admin.spec.ts :989 filtered); run 40345497360 red on R-2 and R-4. Corrective (first part of turn 34w): the always-present live region keeps aria-live="polite" and drops role="status"; ODN-2. (Its class's second and third consumers: INC-929.)
- S447 (G50 / "executor turns come first"; 2026-10-26 15:5xZ) — Lovable sat idle from 34b-2's end (~15:03Z) to 34w's sending (~15:5xZ) — about 50 minutes — while the supervisor diagnosed the walk and CI, built 34w and re-ran units serially; 34b-3 was ready and could have gone at once with the red's one-line fix folded in, and 34w built beside it. The operator, 11:46 local: "WHY IS IT TAKING SO LONG AND WHY DID WE NOT DO THIS INBETWEEN WHILE LOVABLE IS WORKING … Its been almost 30 mins with lovable not doing anything". Corrective: when an executor turn ends, the next prepared brief goes within minutes (folding any red's fix in first); new work is built beside the running turn, never in front of an idle executor.
- S448 (G3 — the decisive line unread; 2026-10-26 16:21Z, recorded with the diagnosis at 16:5xZ) — turn 34w's brief changed hardReset's offline branch to keep the in-app `navigate({ to: "/" })` without reading what that navigation asks of the network (the root loader's server read on a same-href navigation — router-core's reload rule); the supervisor could not run SO-12 locally (no backend) and said so, but did not read the router's reload rule; 34w ended NOT READY (INC-927). Corrective: an offline-path change reads every loader the navigation runs (router-core's reload rule) before it is briefed; DEC-272.
- S449 (a WARN judged away; 2026-10-26 17:1xZ) — check-brief's own-key rule WARNed on 34b-3's `DEFINERS[definer] ?? []` and the supervisor "judged it" safe (the key comes from Object.keys) — the executor's rule has no such exception; 34b-3's first sending stopped before STEP 0 (16:34Z). Corrective: the own-key WARN is promoted to a hit in check-brief (Lovable mode): a WARN the executor's own rule would STOP on is a hit.
- S450 (S447's class again; 2026-10-26 17:1xZ) — the supervisor sent 34b-3 with wait=false and did not poll; the STOP sat unseen 16:34Z→17:10Z (~36 min idle executor). Corrective: after every send, poll at ~2 min and then at least every 10 min until it finishes.
- S451 (G43's class — S88's sibling; 2026-10-26 20:00Z) — turn 34c-2's message was NOT byte-equal: its last FILE-END line named scripts/conformance/project-reads.test.ts instead of src/features/session/session-policy.test.ts (one line; a long brief retyped into the send call); the read-back by list_messages caught it; the executor's STEP 0 sha check stopped it (saved 9cbbb95e…, 55,766 B vs d058f2b5…, 55,768 B; STOP 1 at `cd3e00dd`, 20:05Z). Corrective: the exact text resent at 20:08Z, byte-equal by list_messages.
- S452 (§8 — the nightly is read when it is the red; 2026-10-26 22:4xZ) — from 2026-10-19 to 10-26 no nightly evidence was read; seven red nights passed without a disposition, found only while sizing INC-935's job deadlines (INC-936). Corrective: the ritual and every CI read include nightly-status.md's date and conclusion (a red or a date older than a day is read the same turn); proposed as a check in the CI read tool (claude/ci-read-tool.md).
- S453 (G0.3 and G55 — the S422 class: a brief's new code checked against the rules before sending; 2026-10-27 02:1xZ) — turn 34d's brief wrote a new e2e helper (e2e/helpers/route-guard.ts :13) that read a caught error's text by hand, against .claude/rules/10-code-laws.md F4 ("A caught error's text is read through `errorText` / `errorWithStack`"); the brief's census covered the route concern but not "a caught error's text", which the new code also carried; found by the executor's reviewer (MINOR 3) and widened into INC-937. Corrective: check-brief.py --cc refuses a brief whose new code reads a caught error's text by hand ([error-text], proven on 34d's brief); the helper's site moves onto errorText in turn 34c-4.
- S454 (G16 addendum — an expected result is produced by running it, never by agreeing with itself; 2026-10-27 11:0xZ) — records turn R2's brief carried `EDIT roadmap.md #1` backwards: its OLD was line 3 as STEP 0 leaves it (naming R2), its NEW BASE's line 3 (naming R1), so applying it would have undone STEP 0 and made land.ts judge the landing against R1's brief. The cause: the roadmap script of the prototype left line 3 unchanged ("STEP 0's hand edit") while the generator diffed from a base with line 3 already changed, and the supervisor's simulation compared the turn's result with that same wrong prototype and passed. The executor dry-ran Part B, saw it and stopped (stop 1, 6bc50221) — the right call. R3's scripts carried the same defect. Corrective (mechanism, in the supervisor's tooling): every generator asserts that the prototype's roadmap line 3 names the brief being generated, and the roadmap scripts make STEP 0's line-3 edit themselves; R2 went out as v2 in a new session, and R3's scripts were fixed the same hour.
- Also logged, not numbered: records turn R3's step C2 expected the ledger's last numbering line to end "S454" while block S77's own text, updated when S454 was registered, ends "S455" (the block was brought level, its expectation line was not — the executor reported it as a departure and left the record as the block wrote it, which is right; 2026-10-27 12:5xZ); the supervisor's "pkill slip again (minor)" (2026-10-26 15:5xZ — `pkill -f "node dist/server/index.mjs"` matched its own shell's command line and killed it; servers since stopped by their saved pids); a full unit run edited mid-run and a second overlapping it in the same log (15:5xZ — both discarded: a full run starts after the last edit, one at a time, its own log); the generator lessons of 2026-10-25 16:50Z (a placeholder alternation matched AGENTSLINE before AGENTSLINEBYTES; a `printf "<the line>"` instruction would have run the line's backticks — both caught before sending, no repository harm); "caught before sending (not a slip)" — 34c-2's provider-test mocks (19:4xZ) and 34b-2's agents-line-missing (14:2xZ); the G5 record of a wrong prediction (2026-10-25 21:0xZ: the root loader does NOT re-run on a client navigation — the planned 'root-loader-no-rerun' item dropped); the supervisor's "04:10 answer" that credited B-3 for sign-up (2026-10-26 08:2xZ — corrected to the operator; a sign-up-with-a-taken-e-mail case queued); "My smoke estimate ($3–10 for the whole turn) had no data behind it" (2026-10-25; first measurement $2 for a ten-call stopped session); turn 34c-2's expected roadmap not run through Prettier, so the executor's formatter escaped `sb-\*-auth-token` (2026-10-26 20:36Z — a formatting-only difference it reported as a departure); the container restart of 2026-10-26 22:06–22:10Z lost the CI watcher and stopped a records helper (both restarted; no record harm).
- S455 (G16 — a brief's own sentences agree with its blocks; 2026-10-27 13:2xZ, found by records turn R4's reviewer) — records turn R4's brief contradicted itself in three places: STEP 0 said the roadmap's other lines change "in Part B" (its blocks changed them in Part C); the behaviour contract said the ledger's numbering line "becomes INC-940" (the blocks wrote INC-941, which landed); THE SYSTEM said "REGISTER: none (no mechanism changes)" while `EDIT docs/governance/mechanisms.md #1` amended row 58. The executor followed the blocks and listed the three for a ruling; nothing wrong landed. R3's step C2 (the "also logged" line above) was the first of the class. Corrective: every sentence of a brief that names a part, a number or a file is generated from the same data as the blocks, or checked against them by the generator, and the template's prose is re-read against the generated blocks before sending.
- S456 (G5 and G16's addendum — a number in a brief is measured or labelled ESTIMATE; 2026-10-27 14:4xZ, found on turn 34e's first run) — turn 34e's brief set every install's deadline at 300 s a try and the certificate tools' at 180 s without measuring a single step's times, and its decisions line called the deadlines "generous multiples of the measured times" (true of the job deadlines, measured on run 40406394089; not of the install deadlines). The Chromium install's measured tail (66 of 371 lane runs past 300 s, 895 s at most) was readable from the Actions API the same day. The first run lost lanes 3, 5 and 12 (INC-943) and with them the turn's green: the fix rides records turn R5. Its sibling: a retry was put on package installs, which cannot be repeated after a cut-off. Corrective (DEC-276): every deadline, ceiling or size a brief sets is computed from CI's own history (the step's median, 99th percentile and maximum over at least 300 runs, shown in the brief), with at least half again as margin; a retry only where re-running is safe.
- S457 (G53 — a handover is loss-free; 2026-10-27 21:0xZ, found by the operator) — the handoff of 2026-10-27 (docs/governance/handoffs/2026-10-27-foundations-handover.md) left out what the outgoing thread held outside the repository: the Foundation fixes tracker's address and the operator's rules for it, the two reminders bound to the outgoing session, the security review of 2026-10-26's unregistered findings, the standing directives in the project memory newer than v1.15, and the kit decision put to the operator on 2026-10-26 and never answered. The operator: "this is exactly what should have been avoided". The outgoing thread wrote the supplement (docs/governance/handoffs/2026-10-27-foundations-handover-supplement.md). Corrective: before any handoff is written, a checklist runs and its results appear in the handoff — (1) the scheduled tasks listed; (2) the Project docs and memory files changed since the last handoff listed; (3) the tracker read whole and compared with the roadmap; (4) every decision put to the operator and not answered listed; (5) the latest security review read and its findings confirmed registered. In force from 2026-10-27; installed in G53 at v1.16.
- S458 (G41 — a records turn's own line is ticked after its CI; 2026-10-27 22:2xZ, found by records turn R6's reviewer) — R6 wrote its own roadmap line ticked before its run had completed (R5 did the same). Corrective: a records turn's own line lands unticked and the next records turn ticks it with its run's result. With it, the 34f-2 review ruling "the rest accepted as written" (block S79) was too broad: a MINOR it covered (the pin's precision default) was a §7 pattern — INC-958. Every finding of a review is ruled by name.
- S459 (G31 — a walk line's expected result is read against the code; 2026-10-27 23:2xZ, found by the operator's walk) — walk line 8 step 5 said the map opens once the connection returns, without a refresh; the code keeps a failed download for the page's life and only a refresh cures it (src/components/shell/on-demand-notice.tsx :11–:13, INC-918). The operator saw the designed behaviour. Corrective: every walk line about a failure path is read against the mechanism's own comment and tests before it is sent.
- S460 (G3 addendum 2 and G5 — a figure is measured, not quoted from the record; 2026-10-27 23:4xZ, found by the outgoing thread) — answer 15 of the new thread's answers repeated launch-gate :98's October CI estimate ($300–600 a month for a private repository); the outgoing thread measured 244 job-minutes a run and about 540 runs a week (ESTIMATE $900–1,500 a month). Corrective: a cost figure is re-measured when it is quoted, and wears its ESTIMATE label.
- S461 (G16 addendum — an expected result is produced by running it; 2026-10-28 00:4xZ, found by turn 34c-4's executor) — the brief said the i18n maps would not change; its two new source files moved the maps' `scanned` count (595 → 597), so the executor committed them as a departure. Corrective: a brief that adds a source file under src/ or e2e/ runs `bun run i18n:usage` in the prototype and carries the maps' result.
- S462 (G16 addendum and G58 — a brief's own blocks are checked against its FLAGS; 2026-10-28 08:1xZ, found by land.ts in turn C1) — the brief carried `no-new-string` in FLAGS while its DEC-281 block changed src/i18n/locales/am-base.ts; land.ts refused the landing, and the executor reverted the value to land the stop. The supervisor's check had demanded the flag from the words "No new string" without reading what the flag forbids (any change under src/i18n/locales/). Corrective, in force: check-brief.py --cc refuses a flag that a block's path contradicts (proven on turn C1's brief), and "No new string" is written only when no locale file changes.
- S463 (G16 addendum and §4 — a rehearsal reads every budget the CI reads; 2026-10-28 08:3xZ, found by CI on `24815c46`) — the supervisor's rehearsal ran check-bundle-size.mjs in an install that is not lock-exact; it stopped at the entry's over-budget line and never reached the per-page ceilings (scripts/route-budgets.mjs), so the three posting pages' 0.1–0.2 KiB over 393 KiB went unseen. Corrective: the rehearsal runs the per-page judgement whatever the entry line says and compares each page's change with its last CI value; a page within 0.5 KiB of its ceiling is named in the brief.
- S464 (G0.3 — a census reads the concern by its definition; 2026-10-28 08:1xZ, found by turn C1's executor at mobile-360) — concern 3 ("a piece that cannot download says so once, in its place") was censused as the resilientLazy fallbacks only; the maps' own later downloads (Leaflet, the tile plan) were consumers of the same concern and still raised the shell's notice, so AP-55 saw two messages at 360 px. Corrective: CF-RLF-1 reads the module an in-place call fetches and refuses its shell notices; the census of a "says so in place" concern lists every download the piece makes, not only its own chunk.
- S465 (G16 — an expectation is measured where it can be measured; 2026-10-28, found by turn C1-2's executor at THE CHECKS) — the supervisor rehearsed turn C1-2's first download in its own sandbox, whose install is not lock-exact (INC-420): its build put map-frame.tsx in no chunk of its own and showed no page moving, while the lock-exact build gave map-frame.tsx a chunk on five pages (+0.8 KiB each). Corrective: the supervisor never states a per-page byte expectation from its own build; every brief's product-code part ends with the executor's lock-exact `check-bundle-size` run against the previous part's numbers, and a piece fetched on demand imports only what the entry carries or what it already shares with the other pieces fetched on demand — never a module its pages load first.
- Also logged, not numbered (2026-10-27): the supervisor estimated instructions v1.15 at about 40% shorter than v1.14; it is 5% shorter, because v1.14 is mostly rules (G5 — the measured value recorded).
