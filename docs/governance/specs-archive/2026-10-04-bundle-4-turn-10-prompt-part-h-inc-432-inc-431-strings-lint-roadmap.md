Source: supervisor thread, after turn 1376 (the turn is not in the raw turn files; text taken from the supervisor's scratch file turn10-prompt.txt, delivered to the operator as a file because inline typing had corrupted an Amharic character), Sun 2026-10-04 21:04 New York.
Status at 2026-10-05: built as dev a17b227c (2026-10-05 02:38Z push): item A widened to INC-432 (routes never called name_folds_rebuild; the door could not run from the app connection) and fixed with migration M7 20261005021121_9347e038 (mark 20261005040000, applied on ethio-prod by the executor and on ethio-staging by the operator; INC-433: the mark sits below M6's), CT-35/AT-69/LT-15; item B the 25 Amharic strings with the am-script unit guard (which also caught two more garbled values); item C lint back to 32; item D roadmap; Part H five feature docs and seven changelog lines; published 2026-10-05 03:35Z; CI on a17b227c red on LT-13 only (fixed in turn 11). Known defect in this text: step 1 says "git fetch origin ci-evidence" — the executor cannot reach that branch from its sandbox; the raw.githubusercontent.com URLs of DEC-098 are the working form (ruled 2026-10-05 01:50Z).
Related: bundle 4 Part H (steps 31, 32), INC-431, INC-432, INC-433, M7, DEC-098, CT-35, AT-69, LT-15, migrations b9aa66a4, 18556a32, 2f361c07, 756bcd49, e44f20e5.

BUNDLE 4 — TURN 10: the end (Part H) and three fixes. Tier A. No migration, no door change.

Scope: brief steps 31 and 32, and items A to D below with their tests, the i18n usage map, the changelog lines and the roadmap ticks. The brief's standing rules (lines 12–25) hold. The decision and incident ledgers are still not written here; they come in their own turn after this one.

1. Before any edit: read CI for 0fc968e4 — git fetch origin ci-evidence, then git show origin/ci-evidence:docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md. A red is fixed first and named at the top of your report.

2. Fixes

A. INC-432 — the third way of step 24 was not built. The brief (line 156) says the name table is kept fresh three ways; the third is "every import route that commits or undoes calls the rebuild beside refreshCatalogFindAfterCommit". At 0fc968e4 nothing under src calls name_folds_rebuild (the only hit is types.ts:3378).
   - One server-only helper with the contract of refreshCatalogFindAfterCommit (src/server/catalog-find.server.ts:85): called once after the commit or the undo has returned, never inside it; a failure is logged and never fails the import.
   - Call it beside refreshCatalogFindAfterCommit at src/routes/api/admin/attributes/import.ts:139 and :181 and categories/import.ts:131 and :171, and in src/routes/api/admin/locations/import.ts after its undo and after its commit. Census the call sites and paste them.
   - Red first, one test per route: a scratch name that route creates is in name_folds right after the commit and gone right after the undo (DB truth through the service client). Scratch rows only, removed in finally.
   - If one rebuild takes more than a second on staging, say so in the report.

B. INC-431 — the Amharic of the map-pin tool is garbled (am.ts lines 1978–1997 and 2002–2016, from 4b7f2174). Replace these 25 values with the words below, exactly as written. Do not change post.pin.layerStreet, save, saved, removed, at, or the later keys; they are correct.
  "post.pin.open": "የካርታ ምልክት ያክሉ (አማራጭ)",
  "post.pin.close": "ካርታውን ደብቅ",
  "post.pin.title": "የካርታ ምልክት",
  "post.pin.why": "ምልክት ካለ ገዢዎች በቀላሉ ያገኙዎታል። አማራጭ ነው፤ ምን ያህል ትክክለኛ እንደሚሆን እርስዎ ይወስናሉ።",
  "post.pin.searchLabel": "ቦታ ይፈልጉ",
  "post.pin.searchPlaceholder": "መንገድ፣ የታወቀ ምልክት፣ አካባቢ",
  "post.pin.searching": "በመፈለግ ላይ…",
  "post.pin.noResults": "በዚህ ስም ቦታ አልተገኘም።",
  "post.pin.locate": "አካባቢዬን ተጠቀም",
  "post.pin.locating": "አካባቢዎ በመፈለግ ላይ…",
  "post.pin.locateRefused": "አሳሽዎ አካባቢዎን አላጋራም። ካርታውን መንካት ይችላሉ።",
  "post.pin.locateUnavailable": "ይህ መሣሪያ አካባቢ ማጋራት አይችልም። በምትኩ ካርታውን ይንኩ።",
  "post.pin.layerSatellite": "ሳተላይት",
  "post.pin.tapHint": "ምልክቱን ለማስቀመጥ ካርታውን ይንኩ ወይም ምልክቱን ይጎትቱ።",
  "post.pin.streetLabel": "መንገድ ወይም የታወቀ ምልክት",
  "post.pin.streetHint": "ከካርታው የተሞላ ነው — ገዢ ወደሚያውቀው ስም ይቀይሩት።",
  "post.pin.saving": "በማስቀመጥ ላይ…",
  "post.pin.remove": "ምልክቱን አስወግድ",
  "post.pin.saveFailed": "ምልክቱ አልተቀመጠም። እንደገና ይሞክሩ።",
  "post.pin.none": "እስካሁን ምልክት የለም።",
  "post.pin.geocodeRateLimited": "ለአሁኑ ፍለጋው በዝቷል። በምትኩ ካርታውን ይንኩ፣ ወይም ቆይተው እንደገና ይሞክሩ።",
  "post.pin.geocodeUnavailable": "የቦታ ፍለጋው አይሠራም። በምትኩ ካርታውን ይንኩ።",
  "post.pin.geocodeSignedOut": "ቦታ ለመፈለግ እንደገና ይግቡ።",
  "post.pin.previewExact": "ገዢ የሚያየው ትክክለኛ ምልክት።",
  "post.pin.previewApprox": "ገዢ የሚያየው ይህን አካባቢ ነው፣ 500 ሜትር ገደማ ስፋት ያለው — ትክክለኛ ቦታዎን አይደለም።",
   - A unit guard over every value of am.ts, red first: no unassigned code point, and every letter is Ethiopic or Latin. Today it fails on U+12B1 (lines 1989, 1992, 2012, 2013) and U+1720 (line 1991). Show it red before the replacement.
   - From now on: Amharic you write yourself is listed in your report, key by key, so it can be read before it ships.

C. Lint back to 32 warnings: catalog-scope.tsx exports a hook and a helper beside its component. Move them so the two new fast-refresh warnings go.

D. roadmap.md tells the truth about bundle 4: the lines "Censuses", "M5 (step 25)" and "Parts C → D → E → F" are ticked with the file, fragment and mark, or test that proves each; a line with no proof stays unticked and says what is missing.

3. Part H, as the brief says (steps 31 and 32), and also:
   - docs/features covers Part G as built: the two-pair condition and its file text, the settled range, {country} and where its country comes from, {category:<slug>} (help text only, the move question, a gone category draws nothing).
   - The sentence step 24 asks for is now true in both halves: a name imported is protected at once; a name edited by hand in the admin console within the hour.
   - docs/_changelog.md names every migration of bundles 3 and 4 by fragment and mark. My grep finds no line naming b9aa66a4, 18556a32, 2f361c07, 756bcd49 or e44f20e5; add one line for each that is missing, saying when it landed.

4. Runs: single tests by id while building. Before the turn ends: each spec file you touched, alone, both projects, 2 workers, 0 retries, with the pass count per file; then typecheck, lint, unit tests, the whole-tree format check and the usage map regenerated.

5. The final report (step 32), only when the runs of 4 are green: limitations first; the CI line of 1; the censuses; for M5, M5b and M6 the attribute table and the read-back; files changed; tests added by id; the run counts; "nothing outside scope was touched". No walk list. Then end the turn so CI runs on the final commit, and make no further push.
