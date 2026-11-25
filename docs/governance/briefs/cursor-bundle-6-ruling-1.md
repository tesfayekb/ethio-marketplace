RULING — cursor-bundle-6, stop 1: the census and the plan. Base: cursor/bundle-6 ff2d638d1

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat that first reads the brief, your stop-1 report and this ruling (DEC-414).**

PREVENTION (G70)
- Class 1 — the GO's premises were written from memory, not read (S774, the supervisor's). Three were wrong:
  - concern 3's "the check the notices already have" (no such check exists);
  - the template list "from bundle 5's report" (that list names the notices only);
  - concern 6 (a) as a new guard (the refusal-readers census already judges thrown failures on the client side).

  The fixes:
  - Repository — changed: CF-BRIEF-24 lands in this bundle (decision 17).
  - Instructions — changed: the supervisor reads every guard a GO calls existing before writing the GO. In force now; listed for v1.20.
  - Cursor rules and Knowledge — not needed.
- Class 2 — a second-factor rule placed at one door, while staff authority is also reached through other paths. The GO named `door_context` only. Staff authority also reaches the staff server routes and the data policies, through `has_permission`.
  - Repository — changed: the gate-reach law (CF-BRIEF-22) also asks for every path the gated authority is reachable by (decision 2), and the rule itself moves into the one function every staff check reaches.
  - Instructions — changed: the same question joins the supervisor's pre-flight (v1.20).
  - Cursor rules and Knowledge — not needed.
- Class 3 — a test of a provider refusal written with an invented message (INC-1278 b).
  - Repository — changed: decision 13.
  - Cursor rules — rule 40's line at the next rules turn (already listed).
  - Instructions and Knowledge — not needed.
- Class 4 — a user-facing action with no written list of its cases (INC-1278 a, DEC-459).
  - Repository — changed: decision 12.
  - Instructions — listed for v1.20.
  - Knowledge — v3.16 carries the same line for Lovable's screen turns.

YOUR PLAN IS APPROVED, with these decisions. Each one is binding. Where your report offered options, the chosen one is named.

1. The staff refusal's code (question 1): (i), P0009 / `stepUpRequired`, as you recommend. MF-4, CT-7, IMP-5 and the aal1 checks in `e2e/legal-doors.spec.ts` keep their subjects.

2. Where the staff-session rule lives (question 2; DEC-461). This is DEC-438's "every staff action and staff read", so it is inside the approved scope.
   - THE RULE. When the signed-in caller asks about its OWN authority (`p_user_id = auth.uid()`) for a permission the default member role does not hold, it holds that permission only if:
     - its session is aal2 (`auth.jwt() ->> 'aal'`); and
     - it has a verified totp factor.

     Today the member role holds only `account_panel:access`. Read that set from the data, never from a literal list. A super admin is held to the rule too. These answer as today: the service role, a session with no role (a migration proof), and a question about ANOTHER person.
   - ONE MORE EXCEPTION: `admin_panel:access` (`ADMIN_PANEL_PERMISSION`, `src/features/permissions/service.ts`). It only tells the app that the account is staff, so that `AdminGate` can send it to the code or the setup and the session policy can keep staff on the strict idle timer. It grants no data and no action. The census confirms that no policy, door, function or route grants anything through it; if one does, that is a STOP.
   - THE FORM (G74 law 6, cores first). The current holding logic becomes a core that answers without the session rule. `has_permission` and `has_permission_scoped` become the core AND the rule. `door_context` asks the core for the permission, so a member still reads `permissionDenied` first. Then, for the staff and staff-reader classes, it applies the session rule and refuses with P0009 (decision 1). Then step-up runs as today. A door's body is written out whole (DEC-383).
   - THE PATHS THAT INHERIT IT. The server routes need no change: `callerHasPermission` in `src/server/supabase/user-client.ts` asks `has_permission` as the caller. The data and storage policies need no edit, because they ask `has_permission`.
   - Before Part 3, your census adds every staff authority check that does NOT go through these two functions: an `is_super_admin(auth.uid())` or a role read in a policy, a function or a route. Each one moves onto the rule, or is named under Departures with its reason. That addendum goes in stop 2.
   - THE PROOFS, in the file, on scratch rows:
     - a staff self-check at aal1 answers false;
     - aal2 without a verified factor answers false;
     - aal2 with one answers true;
     - a member permission at aal1 answers true;
     - a super admin's check about another person is unchanged;
     - `door_context` at aal1 answers P0009 after the permission check;
     - a caller without the permission reads `permissionDenied`.
   - THE CARRIER. If the stop holds three files or more, or any DROP, the staging apply is the operator's paste from one message of links (DEC-384).
   - PERFORMANCE. The rule reads a claim and makes one indexed lookup, and only on a staff self-check. Stop 2 shows the plan of one hot policy read before and after (EXPLAIN on scratch rows), with no bare number.
   - THE CLIENT'S READS. The census lists every permission read a staff session makes while it is at aal1 (the rail, the bottom bar, the session policy, `AdminGate`), what each one shows then, and that each is read afresh once the factor has been used. A read that still shows the aal1 answer after the factor is a defect of this bundle.
   - TESTS. CI-2, CI-2b, CI-3, TR-scope and CI-4b move onto the staff helper. Gate-reach runs again with the policies included: a node or page caller at aal1 reading a staff table through the data API. Every test it finds moves, and each is named under Departures.

3. The rail's `legal_review_overdue` alert (question 3): it is read only when the session the client already holds is aal2. A refused read (P0009) draws no alert and is never shown as failed. The server's refusal is the control; the client's check only saves the call. `src/features/admin/nav-alerts.ts` and its tests join SCOPE, and its INC-1266 line stays.

4. `src/lib/supabase-door.ts` and its tests join SCOPE (question 4). The storage listener hears a removal (SBD-23).

5. Concern 4 (question 5): (B), the shell writes the identity into the provider's context. The sign-in page's own subscription in `src/routes/auth.tsx` joins the same fix, and CF-SESSION-7 gets no exception. If you prove the sign-in page must hear the event before the shell exists, it gets one allowlist line with its reason and an expiry, named under Departures.

6. LAW-NUM-1's hits outside scope (question 6) are fixed here, and CF-NUM-1 lands with no allowlist line.
   - `src/features/admin/audit/audit-page.tsx`: its three tiles take the stat tile's unknown and failed states (Lovable bundle 6).
   - `src/features/admin-attributes/attributes-service.ts`: read the SQL. A count that cannot be null drops the `?? 0`. One that can is typed unknown and drawn as unknown.
   - Both join SCOPE with their tests.

7. The raw re-throw law's reach (question 7): every client file (G0.3, G55). CF-REFUSAL-5 goes into the existing census. INC-1266's three lines read `| INC-1266`. Every other site found today gets one line reading `| INC-1256`; that INC belongs to the typed-results work (ACT-027) that retires them, and the list shrinks as that work lands.

8. The step-up dialog's admin tests (question 8): as planned — sign in through the staff helper, then call `staleStepUpOnClient`.

9. INC-1277 (question 9; DEC-462, a frozen judge): the throughput probe and the apt timeouts in `scripts/ci/`, tested by IBD-1. No package cache now. THE JUDGE: if the install step is red as INFRA twice in seven days after this lands, the cache comes as its own turn.

10. AU-3 (question 10): instrumented as proposed. INC-1269 stays open.

11. The Amharic (question 11): the three templates, whole, and the three subjects travel in this package (TEMPLATES below).

12. INC-1278 (a) — the `user-cases` census item and its law.
    - `docs/governance/go-template.md` gains `<!-- CENSUS-ITEM: user-cases -->`. For every user-facing action a turn touches, it lists every case a person can produce, each mapped to a test id or NONE:
      - it works;
      - each refusal the server can give, with its real wording and file:line;
      - empty or invalid input;
      - signed out and signed in;
      - the sign-in ending, including in another tab;
      - both languages;
      - 360, 768 and 1280 px;
      - a slow or failed network.
    - CF-BRIEF-23 goes in `scripts/brief/go-laws.ts`, tested by BRIEF-23 (planted): a brief whose SCOPE names a route or component under `src/routes/`, `src/components/` or `src/features/` answers `user-cases`.
    - THIS bundle's list: your report's §12 carries the user-cases list for every account action the bundle touches: Change password, Change email, the two-factor setup and removal, Sign out other devices, remove password, the reset page and the staff gate.
      - A server-refusal row is proven by a browser test against the temporary backend. ACS-E6 is assigned to one: the same password, refused as `same_password`, read as `auth.errorSamePassword`.
      - Every other NONE row is either written here as a test (ids from the ACS-E / ACS-U series, checked free, named under §10) or named as left, with its reason.

13. INC-1278 (b) — the provider's real errors.
    - `src/test/provider-errors.ts` (new) is the one fixture: the auth server's codes and messages this app reads, each with the source file:line from your premises (a).
    - CF-PROVERR-1 goes in `scripts/conformance/`, through the kit, and is wired. Every mocked error object in a unit test carries a real message: a provider message from the fixture, a code the reader knows (`DOOR_CODES` or a family's words), or a raised exception's text quoted with its SQL file:line. Planted: `message: "refused"` fails.
    - Its three findings move onto real messages: ACS-U2 in `src/features/auth/auth-client.test.ts`, `src/features/admin/translations/translator-card.test.tsx` and `src/server/ad-share.test.ts`. The last two join SCOPE.

14. The base's red (finding 2): the `/admin/roles_/$roleId` line moves in DEC-296's form, with the cause named chunk by chunk (the chunks that grew since the line was set). First download: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.

15. DLG-E12 on your Mac's WebKit (finding 1): INC-1273 is OPEN again, because Lovable bundle 8's change did not cure it there. In Part 2, run it once more by id on `webkit-1280` with `--trace on`. Paste into §13 the error context of its failing assertion (the size list's visibility, in `e2e/dialogs.spec.ts`) and the trace's last ten actions. No fix in this bundle; the supervisor rules on it from your evidence.

16. Side by side (DEC-459): Lovable's bundle 9 is a read-only census. It writes only `.lovable/plan.md` on `lovable/next` and touches no file of yours.

17. CF-BRIEF-24 goes in `scripts/brief/go-laws.ts`, tested by BRIEF-24 (planted): a GO's CONFORMANCE GUARD line names a path that exists at the base, or a path marked (new). A guard named without a path is a finding.

TEMPLATES (decision 11) — copy by script, prove by sha256.
- The folder holds `confirmation.html`, `recovery.html` and `email_change.html`, which go to `supabase/templates/`. It also holds `subjects-add.json`, whose three keys are merged into `supabase/templates/subjects.json` with the existing keys unchanged, and `expected.txt`.
- Run `shasum -a 256 -c expected.txt` in the folder first.
- Each template holds `{{ .ConfirmationURL }}` once in EACH language half, so twice in all, and no other link. CF-TPL-1 says so, not "exactly once".
- The English in these files is the text. It follows your proposal, with one sentence added to `email_change.html`: "The address changes only after the links sent to both addresses are opened."

SCOPE WIDENED by this ruling, each path with its tests:
- `src/lib/supabase-door.ts` with `src/lib/supabase-door.test.ts`
- `src/features/admin/nav-alerts.ts` with `src/features/admin/nav-alerts.test.ts` (new)
- `src/features/admin/audit/`
- `src/features/admin-attributes/attributes-service.ts` with `src/features/admin-attributes/attributes-service.test.ts`
- `src/test/provider-errors.ts` (new) with `src/test/provider-errors.test.ts` (new; every entry carries its code, message and source line), and CF-PROVERR-1's census in `scripts/conformance/` (new)
- `src/features/admin/translations/translator-card.test.tsx`
- `src/server/ad-share.test.ts`

`.github/` is not widened.

NUMBERS:
- DEC-461 (decision 2), DEC-462 (decision 9);
- S774 (the supervisor's);
- CF-BRIEF-22, CF-BRIEF-23 with BRIEF-23, CF-BRIEF-24 with BRIEF-24, CF-PROVERR-1, ACS-E6;
- your proposed ids, each checked free.

The record text goes in §14 word for word.

THEN: build Part 1, Part 2 and Part 3, as your plan orders them and with these decisions, up to the migration stop (stop 2). Stop 2 carries decision 2's addendum and its EXPLAIN plans.
