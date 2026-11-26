RULING — cursor-bundle-7b, stop 1: the plan approved; the lane re-lands on dev first; Q1 to Q14. Base: cursor/bundle-7b 9c381c8d1; dev 87aa8bfc3

**MODEL — Claude Sonnet 5.5, in a NEW Cursor chat (the build). The new chat first reads the brief, the stop-1 report and this ruling (rule 00).**

Your census is thorough and right on every fact I checked. P1 to P5 are accepted: each was a premise I wrote from the records, not from the code.

PREVENTION (G70)

- Class 1 — two lanes side by side on one list (S799, mine; the class of S792, its second occurrence). The brief let Lovable and this lane each remove only their own lines from the census `ALLOW` list. Lovable's 10c is now on dev (`87aa8bfc3`). It removed five lines next to two of yours (step-photos, photo-editor) and changed `trips`. Adjacent deletions conflict in a merge.
  - Instructions, in force now: when another lane has changed a file this lane will edit since its base, the lane re-lands on the new dev while it still holds no code. A SIDE BY SIDE line names shared files only after the supervisor has simulated both lanes' edits in one merge.
  - Repository: decision 1 here; INC-1295 (bundle 8) owns the generated maps' half of the class.
  - Cursor rules and Knowledge: not needed.
- Class 2 — a GO's premise written from a record, not from the code (S800, mine). P1 came from 7a's F2, P2 from bundle 6's report, and P4 from my own paraphrase of DEC-469. The operator's words were "Yes, same as listings"; the ledger's "both required" is mine.
  - Instructions, in force now: every incident premise a GO restates is read in the code at the base before it is written, or it goes to the census as OPEN.
  - Repository: DEC-469's later word is set below, for the next records turn.
  - Cursor rules and Knowledge: not needed.

DECISIONS

1. RE-LAND FIRST, by rule 00 §Git's own steps.
   - Run `git switch -c cursor/bundle-7b-2 origin/dev`, with origin/dev at `87aa8bfc3`. If dev has moved, stop and say so.
   - Copy by script (`git show cursor/bundle-7b:<path> > <path>`) the four paths of your stop: the brief, `docs/governance/reports/cursor-bundle-7b.stop-1.md`, `roadmap.md` and `scripts/conformance/briefs-allowlist.txt` (read by `scripts/conformance/briefs.test.ts`). Dev changed none of them since `996b9b2e3` (`git diff --stat 996b9b2e3 87aa8bfc3 --` over the four prints nothing).
   - Prove the copy: `git diff --stat cursor/bundle-7b -- <the four paths>` prints nothing.
   - Save this ruling as `docs/governance/briefs/cursor-bundle-7b-ruling-1.md` (new), and the words file beside it as `docs/governance/briefs/cursor-bundle-7b-words.json` (new). Both by scripted copy; their sha256 are in the carrier.
   - Open a new draft pull request into dev, with #110's title plus "(re-land of #110)". The operator closes #110 unmerged; you delete nothing.
   - STEP 5's `check-go --at` names `996b9b2e3`, the brief's base: there it reports no finding. Run on the re-landed tree, it reports one citation, the census file's `UNTIL_10B` line, which 10c moved down by one line. That finding is expected; name it in §11. The brief is never edited.
   - The brief's SIDE BY SIDE paragraph is now history: 10c is merged and no Lovable lane is open. In the census file, remove your seven lines from the list as it stands on dev.
2. Q1 — DEC-477 (assigned here): the deadline lives at the one fetch every Supabase call shares. `createSupabaseFetch` in `src/integrations/supabase/client.ts` (:10 `createSupabaseFetch`) gains one import from the deadline module and passes its call through it. Not a signal at each of the 178 call sites: one mechanism per concern (G0.2).
   - The class is read from the request: `/auth/v1/` is auth; `/storage/v1/` is upload or download by method; a `/rest/v1/` GET is a read; any other `/rest/v1/` call is a write.
   - A caller's own signal is combined with the deadline (`AbortSignal.any`, with a fallback where the browser lacks it). A deadline's abort reads as the network kind (the reader learns it); a caller's own abort stays an abort.
   - Rule 10's "never hand-edited" gains this one named exception, DEC-477. CF-DEADLINE-1 fails when `client.ts` no longer passes through the module, so a regeneration that drops it fails CI. If `scripts/conformance/vendor-seams.test.ts` pins the file, it gets an allowlist line with the reason DEC-477. The next Cursor rules turn writes the exception into rule 10; that is not this lane's job.
   - The anonymous call, the route client (its default per class from the module), the two `src/i18n/` fetches, the photo editor's fetch and the verifier's own `createClient` (`src/features/auth/auth-service.ts`) take the module too.
   - CENSUS-ITEM environments: `client.ts` also runs on the server render. The wrapper must work in both; name it under §10.
3. Q14: the values as you proposed. Read 15 s; write 30 s; auth 20 s; upload: a 30 s stall with no progress, inside a 300 s cap; download 60 s; the model tool 60 s.
4. Q2 — DEC-469, the operator's words "Yes, same as listings": Reject behaves exactly as All listings' remove.
   - The reasons are `MOVE_REASONS.remove`.
   - The note is required only for `other`, at most 500 characters (`noteRequired`, `noteTooLong`). The brief's "both required" is withdrawn.
   - The seller is told as a move tells them: a `seller_notices` row with the reason, written the way `admin_move_listing_core` writes it, and one `audit_log` row `listing.rejected` with `{from, to, reason, note}`. If `transition_listing_core` or a trigger already tells the seller of a rejection, the door puts the reason on that notice and writes no second one. Name which in stop 2.
   - Approve and Hold ask nothing.
5. Q3: reuse All listings' pieces and keys: `ReasonNote`, `MOVE_REASONS`, the reason labels, `pickReason`, `noteRequired`, `noteTooLong`. Screening keeps its own confirm keys (`admin.screening.confirm.titleReject`, `descriptionReject` and the Many forms). No new key for the dialog.
6. Q4: the shell says it once, with the key below. A screen that draws a failure while its read is paused draws the network words.
7. Q5: approved. `useRetryFailed` re-reads only a read whose kind is retryable, plus `rateLimited` once its time has passed.
8. Q6: approved. Concern 7 needs no door file: the doors already answer a missing row and a stranger's alike (DEC-391). The three routes answer the table's statuses (404). The three strings keep their keys and take the new words below. INC-1297 closes as "premise corrected; the routes' statuses and three strings fixed".
9. Q7: the route-status guard covers table codes only. A route-only code answers its own status, and the client reads the status first.
10. Q8: allowlist lines, each with its expiry.
    - `src/features/admin/translations/translations-service.ts`: `until INC-1304`. INC-1304 is assigned here: that file builds a route failure by hand in three places; owner, Lovable's next translations bundle.
    - `src/features/admin/import-dialog.tsx`: `until INC-1280` (bundle 7c).
    - Their two test mocks stay as they are.
11. Q9: one reason and one note for every ad selected; the door is called once per ad with them.
12. Q10: the census stays where it is (`src/components/shell/failure-notice.census.test.ts`); moving it would fight 10c's merged change. The register (`docs/features/ci-guards.md`) names it, and `scripts/conformance/wired.test.ts` does not change for it.
13. Q11: narrow the RAW rule so that `${errorText(` inside a template string is not words. Add two planted cases to FNC-1: a `console.warn` template passes, and `<p>{errorText(e)}</p>` trips. The four warn lines do not change. A guard that misreads correct code is fixed in the guard (S798).
14. Q12: yes. `src/features/admin/nav-alerts.ts` with `src/features/admin/nav-alerts.test.tsx` are in scope. It reads the session level through the light read, and its hand-built `Error` becomes the typed failure.
    - Security lens: the light read decodes the token's `aal` only to choose what to draw. Every staff door re-checks (`door_context`), so a forged value draws a screen whose doors refuse.
15. Q13: the capture step lands with the migration stop's push. That push is a stop's own, not the judged run, so a failed lane's auth log can be read before Part 4.
    - It records counts by path and status, plus each 500's `error_code` and `msg` (at most 120 characters), passed through the one redaction rule set (`scripts/ci/redaction-rules.json`, DEC-368). Never a header, a token or a body.
    - Its `wired.test.ts` line lands in the same commit.
    - Part 4 fixes INC-1303 at the cause the capture shows. If no failed lane has been captured by the final push, INC-1303 stays open with the step in place, and the report says so. Never a retry around the challenge (G38).
16. FINDINGS:
    - F1 is covered by decision 14, F2 by decision 13, F4 by Part 4's docs, F5 by the light read, and F6 by the upload class.
    - F3, the silent fallbacks on a route answer that is not ok, is INC-1305 (assigned here), owner Cursor bundle 8: its failure crawl forces each one. Name each file in §6.
    - INC-1298 stays on the before-launch list, not this lane.
17. THE WORDS: exactly these, from `docs/governance/briefs/cursor-bundle-7b-words.json` by script; never typed. One key is new (`shell.offline`, layer base); three keep their keys and take new values.

| Key | Layer | English | Amharic |
|---|---|---|---|
| `shell.offline` (new) | base | You're offline. What you open will load when you're back online. | ከኢንተርኔት ጋር አልተገናኙም። የሚከፍቱት ነገር ግንኙነትዎ ሲመለስ ይጫናል። |
| `post.photo.refusal.notYourListing` | base | This listing could not be found. | ይህ ማስታወቂያ አልተገኘም። |
| `post.refusal.notYourListing` | base | This listing could not be found. | ይህ ማስታወቂያ አልተገኘም። |
| `post.error.notYours` | member | This draft could not be found. | ይህ ረቂቅ አልተገኘም። |

18. Your test ids and guard ids are accepted as planned. CDL's browser case is NONE: no spec waits out a 15 s deadline. `e2e/admin-screening-reject.spec.ts` (new) joins the admin-screening area of `scripts/e2e-select.ts`; `e2e/offline.spec.ts` (new) joins the shell's area.
19. Then STEP 2 to STEP 7 as the brief says. Part 1 is one migration file, a DROP, so it is applied on ethio-staging by the operator's paste (DEC-384).

DEC-469's later word (for the records turn): rejecting asks for a reason from the remove list and a note only for `other`, exactly as All listings; the seller is told the reason as a move tells them.

NUMBERS ASSIGNED (G66): DEC-477; INC-1304, INC-1305; S799, S800 (the supervisor's). DEC-414's count: this stop is the planned census, and it is not counted.
