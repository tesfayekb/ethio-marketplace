# Handover — bundle 22 closed (Stage 1, the legal section built; nothing published yet) (2026-10-20)

Written by the supervisor after bundle 22's close and imported word for word by its turn 11 (the records turn, docs only — G41). The successor reads, in this order, before anything else (instructions §2 addendum): this file → docs/governance/system-state.md → the tail of docs/spec/spec-ledger.md (blocks S74 and S75) → the root /roadmap.md → the brief it names → the ci-evidence branch (ci-status.md, e2e-last-failure.md, guards-last-failure.md, flake-ledger.md whole) → the tail of docs/tracking/incidental-findings.md → docs/features/legal.md. Chat memory and the previous thread's notes are advisory; the repository is the record (G53).

## Heads and CI

- dev = `522e0ed5` (bundle 22 turn 10) before this records turn; main = `6be5671a` (bundle 22 turn 9; run 1054 SUCCESS at 2026-10-20T01:44:41Z, promoted; run 1056 on `522e0ed5` judges turn 10).
- Runs queue; a newer push replaces only a run still QUEUED (DEC-181; ci.yml `cancel-in-progress: false`). A full run alone took 58 and 51 minutes (runs 1047 and 1048); queued behind another, longer.
- Pipelining stands (the operator, 2026-10-19 10:12 local): each brief's Part A concludes the previous turn from CI; a turn ends with THE CI WAIT REPORT, and the operator sends the next brief at once. The next brief goes out once the judged run has started (S317).
- The newest migration mark on ethio-prod and ethio-staging: `20261020120000` (M9, 20261019232513_2240482e).
- The platform's side branches: eleven, the known set.

## Bundle and turn state

- Bundle 21: CLOSED (block S74); its turn 18's run (1039) is block S75's first line.
- Bundle 22 (Stage 1, the legal section): CLOSED — turns 1, 1b and 2–10, and turn 11 (these records); its one walk is owed after the Publish (operator step 1). Block S75 lists each turn, its migrations, its run and its findings; docs/features/legal.md describes the model, the doors, the screens and the rules.
- NOTHING IS PUBLISHED. With no version in force nobody meets the acceptance screen or the publishing statement, and /terms and /privacy say the document will be published there soon. Never publish a version of a real kind (terms, privacy, publishing) on ethio-staging: every E2E account would meet it.
- Bundle 23 (D222, the business-name rule, with its mitigations): DECIDED, not briefed; its frozen check passes on reserved-names v5.1's model; it waits for v5.2. ESTIMATE: one migration turn and one screens turn.

## Operator steps owed

1. When CI is green on turn 11's commit: Publish, then the one walk of bundle 22 (six lines, sent by the supervisor: the footer's © line; /terms and /privacy; Account › Legal documents; Admin › Legal, look only; a sold ad's days line; the ad page's Seller tab holding on the phone). Its result opens block S76; a finding becomes the next turn.
2. The Terms and Privacy v2 texts: read and approve the pre-counsel redline (Claude Docs "Terms and Privacy v2 — pre-counsel redline", revision 23), or mark what to change. Then the supervisor builds the Amharic (by script), the docs import and the publish turn; the facts to fill in Admin › Legal first: operator_details, legal_phone, security_email, the copyright agent.
3. The curator: one message — v5.2 (R11 over single-word names) and the research and plan, no rows, for the banned-items and safety pages (if not yet sent — the record does not say).
4. The speaker's read of the v4 list's Amharic names on the "Amharic Names Read" page (not yet read back).

## Executor and curator

- The executor (Lovable): idle after this records turn until the next brief.
- The curator: the legal peer review, reserved-names v5 and v5.1 delivered and audited (block S75); next, v5.2 and the banned-items research (step 3 above).

## Open questions with owners

- The operator: the v2 texts' approval; the four facts to fill; whether a copyright page or the contact page carries the copyright agent's phone (17 U.S.C. §512(c)(2), the peer review's one conflict with README row 15).
- Counsel (at the Ethiopia-entity milestone; not a launch blocker): Proclamation 1205/2020 (sellers' identity — DEC-204 (a)), Proclamation 1321/2024 (storage in Ethiopia — DEC-204 (b)), the redline's points for the lawyer.
- The supervisor: the legal texts' turn after the approval; the banned-items and safety pages' brief after the curator's plan; bundle 23's brief after v5.2; the flake-and-cleanup turn (INC-758, INC-765…INC-768, INC-772…INC-776, PW-30 (INC-780), the 23 spec files with finally-only cleanup, LG-19's and LG-7's 60-second timeouts); INC-771 (watched); INC-703's next reading; the instructions v1.14 (blocks S72–S75's rules in force, not yet installed).

## Next planned action

The operator's approval of the Terms and Privacy v2 texts; meanwhile the flake-and-cleanup turn may run (no migration), and the curator's research for the banned-items and safety pages.

Numbering: next free DEC-206, D226, INC-781, S331, ACT-021.
