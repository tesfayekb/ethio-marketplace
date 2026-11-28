RULING — cursor-bundle-8c-3a, stop 1: STOP-1's nine branches and STOP-2's sentences. Base: cursor/bundle-8c-3a f21739278

**MODEL — Claude Sonnet 5.5, in the SAME Cursor chat.**

Save this ruling as `docs/governance/briefs/cursor-bundle-8c-3a-ruling-1.md` (new), by scripted copy (sha256 in `expected.txt`).

PREVENTION (G70)

- Class 1 (S837, mine): I wrote the GO's guards, FNC-5 and RT-23, without running their rules on the GO's base first, so its census listed only the hits I already knew. Your census found nine more branches and fifteen more sentences. Both stops come from that.
  - Instructions: changed, in force now. A GO that lands or widens a guard lists every hit the guard's rule finds on the GO's base. I run a prototype of the rule on my worktree to get that list, and route each hit in the GO: fixed in the lane, a permanent line with its decision, or an owner lane with its INC.
  - Repository: a GO-template census item `guard-hits` with its check-go law. Listed for the next rules turn.
  - Cursor rules, Knowledge: not needed.
- Class 2 (S838, mine): the GO asked red-first of RCL-27, but RCL-27 pins the client's reading, which was already right. The defect lives in the server's body, and RT-23's plant shows it red.
  - Instructions: changed, in force now. A GO asks red-first only of the test that reproduces the defect on its own side of the wire. A pin carries a positive control.
  - Repository, Cursor rules, Knowledge: not needed (rule 20 already says it).
- Class 3 (S839, mine): two open lanes changed the same lines. Lovable UF-2 (`lovable/next`) and this lane both rewrite `src/features/admin/roles/roles-list.tsx` line 239 and `src/features/admin-categories/categories-page.tsx` line 1103, with different text.
  - Instructions: changed, in force now. While two lanes are open, a GO names every file the other lane changes and says whose text stands.
  - Repository, Cursor rules, Knowledge: not needed.

DECISIONS

1. The two shared lines. UF-2's text stands: write `error={error}` on both lines, exactly as UF-2's branch has them. Two identical changes merge with no conflict, in either order.
   - My check: I merged this lane's `f21739278` onto UF-2 merged with dev, resolved with UF-2's lines, and ran `bunx vitest run` over the overlapping folders: every test passed. `bun run typecheck` on that tree: exit 0.
   - UF-2 is now pull request #125.

2. STOP-1, branch by branch.
   - (1) `src/components/shell/stat-card.tsx` line 76. The tile's own fallback stays, under DEC-464. Every app caller already hands its error, so the line becomes permanent, naming DEC-464.
     - The class behind it is INC-1347's: a failure handed over without its class. The case "a `<StatCard>` handed `failed` with no `error`" joins FNC-6. Plant it and show it red first.
     - `src/routes/dev.primitives.tsx`'s failed tile is the one caller left. Either it hands an error, or it keeps a line under the board's existing reason (`INC-1279 permanent`). DECIDE-AND-NAME.
   - (2) `src/features/account/saved-page.tsx` line 144: permanent, naming INC-1280 and DEC-503. The Remove's words come from its door family through `savedRemoveKey`, read in the handler.
   - (3) `src/features/ad-page/share-ad-dialog.tsx` line 128: permanent, naming DEC-503. A clipboard failure is a device's failure, not an answer from our server.
   - (4) `src/features/admin-attributes/components/attribute-link-cells.tsx` line 170: permanent, naming DEC-333 and DEC-503. Each cell's words come from `ATTRIBUTE_REFUSALS` through `useAttributeRefusal().fail`, read in the dialog's `runCell`.
   - (5) `src/features/admin-listings/tier-dialog.tsx` line 158 moves onto `FailureNotice`.
     - Give the notice `levels.error`, size `line`, testid `listings-tier-levels-error`, and `onRetry` from a new `retry` that `useLevelRows` returns (`src/features/levels/use-level-rows.ts`).
     - `retry` runs the read again. `oneTableRead` already clears a failed read, so a second run reads.
     - TD-8 is re-pointed, by this ruling. The refused read (`42501`) draws the notice's refused words with no Retry, and Confirm stays disabled.
     - Add one case: a network failure offers Retry, and Retry reads again.
     - `src/features/levels/use-level-rows.test.ts` gains a `retry` case.
   - (6) `src/features/posting/step-photos.tsx` line 969, (8) `src/features/posting/step-where.tsx` line 2026, and (9) `src/features/posting/step-who.tsx` line 1273 are INC-1351's class. Each action's answer is cut to a boolean, so a refusal (the draft dial included) draws the generic line. End each the way this lane ended the pin line:
     - `savePhotosSoon`, `saveSellerPlace` and `clearSellerPlace` (`src/features/posting/posting-service.ts`) answer `ok`, or the refusal `code[:detail]`, or none (the `clearPinAnswer` form). The wizard's `onPhotosSoon` (`src/features/posting/wizard.tsx`, that handler only) passes the answer through.
     - Step-who keeps the first refusal its fields do not show.
     - Each branch draws `draftRefusalText` for a refusal, and its own words when there is none.
     - `clear_seller_place` joins `DRAFT_REFUSALS`' doors in `src/features/posting/refusal-text.ts`. Its one code is the draft dial's.
     - Tests: for each branch, a refusal draws the family's words, and a rate refusal draws the dial's words with its when. Show each red first against the old code. A failure with no refusal keeps the branch's words.
     - PW-149 (`e2e/post-wizard-bundle2.spec.ts`) asserts visibility only and stays as it is.
     - Once a branch draws the family's words, the census's existing rule ends it; it needs no line.
   - (7) `src/features/posting/step-review.tsx` line 841: permanent, naming DEC-503. Its flag is set only by the unreachable class (line 956). Refusals are drawn through `draftRefusalKey` at line 847, and signed-out has its own branch.
   - Your departure on the seven old lines is accepted under DEC-503: the pin, directions and details lines draw their own words when there is no refusal, not the notice.
   - Scope widened by this ruling, each file for the change named above and its tests:
     - `src/features/levels/use-level-rows.ts`
     - `src/features/admin-listings/tier-dialog.tsx`
     - `src/features/posting/step-who.tsx`
     - `src/features/posting/wizard.tsx`
     - `src/features/posting/refusal-text.ts`
     - `src/routes/dev.primitives.tsx`

3. STOP-2: owned by a new lane, Cursor 8c-3d (DEC-504, INC-1354).
   - This lane changes no route's sentence beyond the brief's four.
   - RT-23 lands with its fifteen lines. Each line's reason names INC-1354 and Cursor 8c-3d, and its `until` is `INC-1354`. RT-23's line parser takes an `INC-n` until, as `scripts/conformance/kit.ts` does.
   - Of the four refusals passed by name, two carry sentences and go into INC-1354: `modeSentence` and `word.error` (from `issueWord`, `src/lib/schemas/translate.ts`). The two `bad` names in `src/routes/api/feed.ts` and `src/routes/api/seller.ts` are typed by a local `ClientCode` union of codes, so they are not sentences. RT-23 does not read names; 8c-3d decides how the boundary does.
   - Part B's "EXCEPTIONS: none" reads, by this ruling: "the fifteen lines until INC-1354".

4. RCL-27 stays as a pin. It gains its positive control: the base's body `{ error: "bad request" }` from a route reads as malformed, with a Retry. Name it under §5. The defect's red-first is RT-23's plant, which you already showed.

5. Accepted:
   - The `/admin/legal` ceiling, 296 → 297, with its cause on its line, as the mechanical edit a standing guard demands (§10).
   - Any further growth from this ruling is listed chunk by chunk, and any further ceiling move takes the same form.
   - The red part A commit (`c5f43b082`), named in §10. It is landed history and cannot be rewritten.

6. Pushes and runs.
   - One push, after every decision above, `bun run checks` and your self-review. The judged commit is your final code commit (G67).
   - CI on `f21739278`: run 46124419001, success.
   - Write the report with §14 holding the records below. Its push is records only.

RECORDS (§14), word for word:
- "DEC-503 (the supervisor's, G17, overridable; Cursor 8c-3a ruling 1) — An action's failure is drawn by what it kept. A refusal is drawn through its door family's words, and a rate refusal through the family's dial words with its when. A failure with no refusal (the network, an answer with no code) is drawn in the action's own words beside its control, which is the retry. The failure notice draws a failed read, refused or failed. A device's failure (the clipboard, the share sheet, location, the camera) is no answer from our server and keeps its own words. A failure-census line for such a branch is permanent and names this DEC."
- "DEC-504 (the supervisor's, G17, overridable; it amends DEC-502) — Cursor 8c-3 is four lanes. 8c-3d carries INC-1354: every route refusal answered as a sentence beyond the boundary's own becomes a code, with its client readers, and the boundary judges a refusal passed by name as well as by literal. Order: 8c-3b, then 8c-3d, then 8c-3c. Why: RT-23 found sentences the GO's census had not listed, and their readers include three browser specs and the translations console's sentence map, more room than one fix has in 8c-3a."
- "INC-1354 — Route refusals answered as sentences beyond the boundary's own. Evidence: RT-23 (Cursor 8c-3a) found sentence literals in `src/routes/api/admin/attributes/export.ts` line 71, `src/routes/api/admin/locations/export.ts` line 68, `src/routes/api/admin/categories/generate-image.ts` lines 46, 94 and 102, `src/routes/api/admin/categories/suggest-icon.ts` lines 34 to 37, `src/routes/api/attributes.$id.options.ts` lines 53 and 71, `src/routes/api/i18n.$lang.ts` line 81, `src/routes/api/translate.ts` line 122, and `src/server/imports/route.ts` lines 216, 218 and 349. Two more pass a sentence by name, which RT-23 cannot read: `modeSentence` in `src/server/imports/route.ts` line 348, and `word.error` in `src/routes/api/translate.ts` line 102 (from `issueWord` in `src/lib/schemas/translate.ts`). The names in `src/routes/api/feed.ts` line 84 and `src/routes/api/seller.ts` line 63 are typed by a local union of codes. The client reads each sentence as malformed and offers a Retry that cannot succeed; the translations console reads two by sentence (`src/features/admin/translations/translations-service.ts` lines 473 and 474). Class: a route refusal carries a code (mechanism `defineRoute` / `clientError`; guard RT-23). Owner: Cursor 8c-3d (DEC-504). Status: open; RT-23's allowlist lines name it."
- "INC-1355 — A failed level-rows read drawn as an absence on three staff pages. Evidence: `src/features/admin-listings/listing-page.tsx` line 168, `src/features/admin-listings/listings-page.tsx` line 136 and `src/features/admin-screening/screening-page.tsx` line 160 call `useLevelRows` and never read its `error`; a failed read leaves the rows empty, so an ad's level reads as unknown and the level filter offers no choice, with no notice. Class: a failed read drawn as an absence (F4; mechanism `FailureNotice` with the read's `retry`, Cursor 8c-3a ruling 1). Owner: Lovable UF-3 (screens only). Status: open."
- INC-1349, INC-1351, INC-1352: fixed (what was built), each with its cause as found; INC-1347's guard landed (FNC-6, with the StatCard case). INC-1352's fix covers the brief's four; the rest is INC-1354.
