````text
RULING — Foundations turn J-1: BUILD your plan (INC-1002, INC-1000), with INC-1003's red fixed first. Base: dev 9a262ea3. Tier A. ONE migration. Lovable. Saved as docs/governance/briefs/foundations-turn-j-1.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-j-1.md, in one fenced block opened and closed with four backticks (it contains a ```json block), and prove its sha256 equals the value after END. Roadmap line 3 names it.
- The STRINGS block is extracted by script, never retyped. Its sha256 (the bytes between its ```json line and its closing ``` line) is d33412143ce04b792cb047339ff4c72b429eb80b220353fcc9543d3491520796, 663 bytes. Prove it.

CI FIRST — run 40969787998 on 5dfe5234, FAILURE, first-paint budget (INC-1003). My L-2d ruling set the ceilings from the sandbox's measurement, and CI measures a little more.
- The rule from now on: every page's ceiling is at least the NEAR band (0.3 KiB) above CI's measured size, the smallest whole KiB that satisfies floor(size + 0.3) + 1.
- CI's sizes from the run's evidence, with the ceiling each takes:
  - /account_/legal_/$versionId 210.1 → 211;
  - /admin/legal 278.0 → 279;
  - /dev/tall 207.1 → 208;
  - /my-listings 328.1 → 329;
  - /my-listings_/$listingId_/edit 396.2 → 397;
  - /post 396.1 → 397;
  - /post_/$listingId 396.1 → 397;
  - /settings 271.1 → 272;
  - /admin/roles 306.0 → 307;
  - /admin/users 305.0 → 306;
  - /admin/screening 379.8 → 381;
  - /admin/listings_/$listingId_/edit 401.7 → 403;
  - /auth_/callback 207.8 → 209;
  - /auth_/reset 209.8 → 211;
  - /c/$slug 220.9 → 222;
  - /dev/style 241.8 → 243.
- For pages the evidence's tail does not print, use your local size + 0.1 as CI's size.
- Each changed line keeps its causes and adds "CI's size + the NEAR band (INC-1003)".
- This lands first, in its own commit, before anything else.

YOUR PLAN IS APPROVED, with these rulings.
1. A name the AI cannot check stays VISIBLE.
   - `'unchecked'` shows the name today (SPA-1a), and DEC-286 hides a name only on an 'imitates' verdict. A failure on our side never hides a seller's name.
   - So `'needs_review'` is public exactly as `'unchecked'` is: seller_public_alias, the previous-alias rule and the seller line treat it as 'unchecked', never as under_review.
   - It goes to Admin › Screening's queue for staff.
   - Prove it in a proof (NCAP-7: a needs_review name is still shown by seller_public_alias).
2. N = 5, and the new state 'needs_review', are approved. Reusing 'imitates' would accuse a seller, as you said. 'unavailable' does not count; clean and imitates reset the streak; a new name resets the row.
3. The queue row for needs_review:
   - shows "admin.screening.names.unusable" instead of the "imitates: {of}" line, and never the "Name hidden" mark;
   - its Clear shows "admin.screening.names.clear.doneVisible" instead of the "Buyers see it again" text.
   - The health line gets "admin.screening.job.outcome.lost".
   These three keys are the STRINGS block, EN and AM.
4. The response schema is derived from the output (providerSchemaOf), and the derived category_icon and photo_screen schemas equal today's literals byte for byte.
   - writing_helper: if its output cannot be derived, derive from its input-side object shape. If even that is impossible, STOP and name it. Never fall back silently.
5. The content-free sub-reason `parse | shape` on the gateway's log line is approved, with no text, alias or answer in it.
6. The migration, as planned, under Knowledge E2: every function redeclared whole from its live definition (computed insertion over ~10 KB), the closers and the ACL read-back, proofs NCAP-1…7 and JLOST-1…3 on scratch rows only, RAISE EXCEPTION on failure.
   - The mark is chosen at apply time (G39), and you run scripts/check-migrations.sh first.

THE MIGRATION'S ORDER (Lovable applies it on ethio-prod when it saves the file)
- Write the migration as the LAST code change of the turn.
- The platform will show the "Modify Supabase database" dialog. The operator allows it; he has been told to expect it.
- After it applies, STOP with "apply <fragment> → expect mark <value>" and the prod read-back.
- I apply ethio-staging through my Supabase connector, read the mark back, and send "continue".
- Your app code that depends on the new state may land before the migration only if it tolerates the old state. Otherwise it lands in the same turn after the apply.

TESTS: as planned. Add NCAP-7, and keep the ids grep-checked free. The admin-screening spec gains a needs_review row (scratch, J1/J3) if a migration-applied staging is needed for it; run it after "continue".

THEN `bun run checks` once on the final tree, its last line with no FAIL pasted. Push, and END THE TURN with the report:
- step 0's sha256 and the STRINGS sha256;
- the INC-1003 ceilings;
- Parts A and B, each done or not;
- the migration's apply line and its prod read-back;
- the tests;
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only 9a262ea3.

STRINGS (layer → key → en, am):
```json
{
  "admin": {
    "admin.screening.job.outcome.lost": {
      "en": "Not taken: the site never answered",
      "am": "አልተወሰደም፦ ድረ-ገጹ መልስ አልሰጠም"
    },
    "admin.screening.names.unusable": {
      "en": "The AI could not check this name. Buyers still see it.",
      "am": "ሰው ሰራሽ አስተውሎቱ ይህን ስም ማረጋገጥ አልቻለም። ገዢዎች አሁንም ያዩታል።"
    },
    "admin.screening.names.clear.doneVisible": {
      "en": "The name is allowed. Buyers already saw it.",
      "am": "ስሙ ተፈቅዷል። ገዢዎች ቀድሞም ያዩት ነበር።"
    }
  }
}
```
````
