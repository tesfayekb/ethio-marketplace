RULING — cursor-bundle-7b, stop 2: applied on staging and read back; the types patch; the capture runs on every lane; the seller reads a rejection's reason. Base: cursor/bundle-7b-2 19b04865d

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat (it is stopped at the migration stop).**

Save this ruling as `docs/governance/briefs/cursor-bundle-7b-ruling-2.md` (new), and the words file beside it as `docs/governance/briefs/cursor-bundle-7b-words-2.json` (new), both by scripted copy (sha256 in the carrier). Apply the types patch from the same folder with `git apply` (decision 2).

PREVENTION (G70)

- Class 1 — a capture whose trigger the failure it hunts never meets (S801, mine). Ruling 1, decision 15 said "a failed lane". INC-1303's failures pass on Playwright's retry, so the lane stays green and `failure()` never fires.
  - Instructions, in force now: a diagnostic step names the event it must see, and its trigger is read against how that event shows up in a run (a retried pass is green).
  - Repository: decision 3.
  - Cursor rules and Knowledge: not needed.
- Class 2 — a new write whose readers the GO did not count (S802, mine). Concern 6 listed the door, its hook and its screens, but not the seller's readers of the notice it writes. `my_listing` and `my_listings` read a staff reason only for a removed ad, so a rejected ad's line says "Not approved" with no reason, unlike All listings.
  - Instructions, in force now: a GO that adds a write lists every reader of the row it writes, by the table's name, across the SQL and the client.
  - Repository: decision 4.
  - Cursor rules and Knowledge: not needed.

WHAT THE SUPERVISOR CHECKED
- The file, read whole before the apply:
  - its pre-checks;
  - the kind check: the live definition on both projects holds exactly the six earlier kinds, and every row in use is one of them;
  - the door's old → new diff (old md5 `803f3638…`, the repository's part-10 body; new md5 `9e69c9ab…`, the proof's);
  - the core: it only raises its refusals, so a refused transition writes neither row;
  - the proofs' rows: scratch only, and XZ and XY absent on both;
  - the grants.
- ethio-staging, after the operator's paste (01:2xZ):
  - mark `20261126020000` present;
  - `admin_review_listing(uuid,text)` absent;
  - the four-argument door: md5 `9e69c9abd328441324310bf9a17a7dc9`; SECURITY DEFINER, VOLATILE, `search_path=public`, returns jsonb; arguments `p_listing_id uuid, p_new_status text, p_reason text DEFAULT NULL::text, p_note text DEFAULT NULL::text`;
  - grants: anon none, authenticated and service_role yes, PUBLIC none;
  - the kind check holds `admin_reject` beside the six;
  - scratch rows `e2e-mig-b7b1%` 0, XZ and XY 0.

DECISIONS

1. Your three questions:
   - (1) `admin_reject` is confirmed.
   - (2) 26,095 bytes in one file is accepted: one concern, and the rule never splits inside a body.
   - (3) An approval or a hold with a reason or a note answers `badValue`: accepted.
2. THE TYPES PATCH: `types.patch` in this folder changes one entry of `src/integrations/supabase/types.ts`: `admin_review_listing`'s Args gain `p_note?` and `p_reason?`.
   - The generator's line rule (an Args object inline only up to 80 columns) was proven on every entry of the file first, and the patch was built by script.
   - Apply it with `git apply`; never retype it.
3. THE CAPTURE runs on every lane, not only on a failed one. In the step "Capture the auth server's failures (INC-1303)", `if: failure() && (…)` becomes `if: always() && (matrix.lane != 'repeat' || env.REPEAT_SPECS != '')`.
   - Check that the step that uploads the lane's files also runs when the lane is green, so the capture file rides the artifact.
   - THEN A DIAGNOSTIC PUSH: commit the types patch, the two saved files and this one-line change, and push once now, before Part 2. It is not the judged run. Its lanes give the first captures while you build Parts 2 and 3.
   - Part 4 reads them (a "challenge failed (500)" in the flake ledger names the run) and fixes INC-1303 at the cause they show.
   - This is the turn's one extra run, ruled here; the final push stays the one judged run.
4. THE SELLER READS A REJECTION'S REASON, as a removed ad's: ONE further migration file, in the final push. There is no second migration stop: I apply it on ethio-staging by the connector at your final report (it has no DROP).
   - `my_listing` and `my_listings` are each written out whole from their last declarations (DEC-383), with their live md5 pre-checked and their new md5 post-checked in the file.
   - Their reason field is renamed `staffReason`: the latest staff reason for an ad staff took off — a `removed` ad's from kind `admin_remove`, a `rejected` ad's from kind `admin_reject` — read only from the caller's own notices, as today.
   - The rename reaches every reader: `src/features/my-listings/` (the parser, the state line, their tests) and `e2e/my-listings-page.spec.ts` (:268 and :269 read `removedReason`). The old name is gone.
   - The state line's `rejected` case reads `myListings.notApprovedBecause`, filled with the reason's words from `REMOVAL_REASON`, when a reason exists, and `myListings.notApproved` otherwise.
   - Proofs, on scratch rows: a rejected ad's `staffReason` is its `admin_reject` reason; a removed ad's is its `admin_remove` reason; another seller's notice is never read.
   - The mark is chosen at its commit (G39's form), above `20261126020000`.
   - The final push's staging preflight is red for this one file until I apply it. That red is expected, named here, and not re-run.
5. THE WORDS: one new key, from `docs/governance/briefs/cursor-bundle-7b-words-2.json` by script; never typed. Its layer is member, beside `myListings.removedBecause`.

| Key | Layer | English | Amharic |
|---|---|---|---|
| `myListings.notApprovedBecause` (new) | member | Not approved: {reason} | አልጸደቀም፦ {reason} |

6. Then Parts 2 to 4 and STEP 5 to STEP 7 as ruling 1 and the brief say. The further file of decision 4 is written in Part 3, beside the screens it serves.

NUMBERS ASSIGNED (G66): S801, S802 (the supervisor's). No new INC or DEC. DEC-414's count: this stop is the planned migration stop, and it is not counted.
