# Bundle 13 — photos, turn 7: turn 6's red first (INC-614, SC-18/SC-19's seed); INC-613 (the gallery's photo meets the thumbnails' top); then D162, a middle size for the gallery's photo, and D163, the cover's ribbon in gold: brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D163) — TURN 7 (2026-10-13). ONE TURN, NO MIGRATION. No new string. No package change.
Base: dev d76a27f1 (turn 6's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the upload route (src/routes/api/upload/photo.ts — a fourth size, its caps), the policy pass (src/server/media/policy.ts — the fourth image in the same call), the photo links (src/server/media/links.ts). Tier B: SC-18/SC-19's seed (INC-614), the device encoder and the upload sender (photo-encode.ts, posting-service.ts, step-photos.tsx), the gallery (photo-links.ts, preview/photo-gallery.tsx), the cover's ribbon (step-photos.tsx, a comment in src/styles.css), the tests and their colour helper, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn 6 verified: dev d76a27f1 equals the supervisor's tree with the saved brief (sha256 3719de06…, equal) and the migration file equals the brief's text with mark 20261014100000; your read-back matched every line. Its CI run (38501197463): 1,664 passed, 9 failed — SC-18 and SC-19 at their seed (this turn's PART 0, INC-614) and RP-5 under staging 504s (read again on this run). The operator's walk of turns 2–5 passed every line; D163 is his request from it.

WHY THIS TURN
- First, INC-614 — CI run 38501197463 on d76a27f1 (turn 6): 1,664 passed, 9 failed. SC-18 and SC-19 failed on both projects before their first assertion: "seeding photos failed: null value in column "unscreened" of relation "listing_photos" violates not-null constraint". Their seed inserts two photo rows in one call and only the first names `unscreened`; in a many-row insert the server sends NULL, not the column's default, for a key a row leaves out. The one other failure, RP-5 (mobile), timed out after Delete while the shard's log shows the staging auth server answering 504; it is not this turn's to fix and is read again on this turn's run.
- Then INC-613 — the operator's walk (2026-10-13, the published site): on a computer the gallery's thumbnails sat "above the top border of the top of the main image". The main frame is 4:3 and the photo is contained in it; a photo wider than 4:3 is centred in the frame, so its visible top sits below the first thumbnail (about 50 px for a 16:9 photo). 4:3 and taller photos meet the top, which is why PP-22 (4:3 fixtures) could not see it.
- Then D162 — the operator's question "does the image size is it appropriate size? i dont want to large size images to clog out our system", and his answer "Add a middle size". Each photo is stored at 1,600 / 480 / 160 px; the gallery's photo offers the card (480w) and the cover (1600w), and nearly every computer and phone needs more than 480 px, so the page fetched the full size (his largest: 333 KB). A 960-px middle size serves the page; the full size is fetched only for the full-screen viewer.
- And D163 — the operator's walk of turns 2–5 (2026-10-13, every line passed): "RED GENERALLY SIGNALS DANGER, CAN WE MAKE IT THE GOLD COLOR FO THE SYSTEM COLOR WE ALREADY HAVE, BUT REMOVE REMAINS RED. BOARDER ALSO GOLD COLOR WE HAVE" — the cover's ribbon and outline on the photo step (D160) were the destructive red.

WHAT THIS TURN BUILDS
- PART 0 — INC-614: e2e/admin-screening.spec.ts, `seedHeldPhotos` — the second row names `unscreened: false`, so both rows carry the same keys; the comment says why. Nothing else in SC-18 or SC-19 changes. The census of the class (every many-row insert in e2e/ and src/ — 91, all in e2e/): 29 others give their rows different keys, and every column they leave out is nullable with no default, so NULL is what leaving it out means; only this seed was wrong.
- PART 0b — INC-613: src/features/posting/preview/photo-gallery.tsx — on a computer (`@min-[32rem]`) the photo sits at the top of its frame (`object-top`); on a phone it stays centred.
- PART 1 — D162:
  - src/features/posting/photo-encode.ts — `EDGES.mid = 960`, WebP 0.82 (the cover's quality); the encoder draws four sizes (cover, mid, card, thumb); `EncodedVariants.mid`.
  - src/features/posting/posting-service.ts and step-photos.tsx — the upload sends `mid` beside the other three.
  - src/routes/api/upload/photo.ts — the size `mid`, OPTIONAL: taken when sent, with its caps (`MAX_MID_BYTES` 450 KB, `MAX_MID_EDGE` 1,200 px, each refused by name `tooLarge`), stored as `paths.mid`; a request without it stores three sizes as before. Cover, card and thumb stay required.
  - src/server/media/policy.ts — the call carries every stored size, largest first: cover, mid (when sent), card, thumb (`imagesOf`); the instruction says "the photo, then smaller copies of it, each smaller than the one before" and the evidence names the first to the fourth image.
  - src/server/media/links.ts — `READ_VARIANTS` gains `mid`, so it may be asked for and is signed with the others.
  - src/features/posting/photo-links.ts — a gallery photo carries `middle` (null for a photo stored before D162).
  - photo-gallery.tsx — the page's photo is offered from the card (480w) and the middle size (960w), never the cover; a photo without a middle size keeps offering the cover (480w / 1600w); the full-screen viewer draws the cover, as before.
- PART 2 — D163: src/features/posting/step-photos.tsx — the cover's ribbon is `bg-gold` with `text-gold-foreground` and the cover's tile outline `border-gold` (the system's gold token, 4.67:1 in light); Remove keeps its red. src/styles.css — the token's comments name its fourth placement (comments only). The census of red used for anything but danger (G29): every other red in the app is an error, a removal, a deactivation or the impersonation banner; the ribbon was the one place.
- The docs (media-pipeline.md "Bundle 13, turn 7", posting.md, ai-services.md's table row), the changelog and the roadmap (line 3 and the turn-7 line).

STRINGS
- None new, none changed.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The middle size is 960 px at WebP 0.82, the cover's quality (D157's judge measured the other three, not this one).
- Its caps are ESTIMATE: 450 KB (×3 over the largest cover scaled to 960 px, about 146 KB) and 1,200 px; the measured value replaces the estimate when the operator's photos are measured again.
- The route takes the middle size when it is sent and does not require it, so a page loaded before the next Publish keeps uploading.
- The screening call carries the middle size too (every stored size is screened, INC-601): ESTIMATE about a quarter more image tokens a photo checked.
- Photos stored before D162 are not given a middle size (the operator's choice); they keep offering the cover.
- The photo sits at the top of its frame on a computer only; on a phone it stays centred, as peers show it.
- D163 uses the existing gold token as it is (no new colour), on the ribbon and the outline both, as the operator asked.
- The new ids: PPOL-9, LK-5, PU-6, GAL-6, PP-23, PP-24; the new helper `isGoldFill`.

TESTS
- E2E, NEW (e2e/photo-pipeline.spec.ts, last; wide photos made in memory by the fixture generator's own encoder, `jpeg-js`, I1 — every committed fixture is 4:3):
  - PP-23 — two 1600×900 photos picked on the photo step: both stored with `paths.mid`; the cover row 1600×900; at review, Preview as buyer: the photo offers the middle size and not the cover; on a computer the photo's drawn top (from its box, its natural size and its object-position) is within 1 px of the first thumbnail's top; the full-screen viewer draws the cover.
  - PP-24 — a hand-made upload whose middle size is 1300 px wide is refused `{ field: "mid", reason: "tooLarge" }` and no row is stored.
- E2E, edited: PP-19 (D163) — after its ribbon text, the ribbon's fill and the tile's outline are read as a person sees them and are the gold; Remove's text is red (`isGoldFill`, NEW in e2e/helpers/colors.ts beside `isRedFill`; the browser reports the gold as oklch(0.681 0.13 72.5) in light).
- E2E, edited: SC-18 and SC-19 (INC-614) — their seed only; every assertion unchanged.
- Not edited: PP-22 (its uploads send three sizes, so it keeps proving the cover fallback) and every other test. Reached without an edit (CI runs them): every upload through the helper (three sizes — stored as before) and every upload through the photo step (four sizes now: PP-10..PP-20).
- Unit, edited: PE-1, PE-2 (four sizes), PPOL-7 (the instruction's words), LK-4 (the readable sizes), PU-4, PU-5 (`middle: null`), GAL-1 (unchanged expectations, `middle: null` in its fixture). NEW: PPOL-9, LK-5, PU-6, GAL-6. 780 in all.
- Red first: SC-18 and SC-19 are red on the base in CI (run 38501197463), at their seed. PP-23's alignment measure, run on a replica of the gallery drawn with the built stylesheets at 1280 px: 53.3 px on the base's styles, 0.0 on this turn's. On the base, PP-23 also fails at `paths.mid`, PP-24 at its refusal (the base route ignores a `mid` part and stores the photo), and PP-19 at the ribbon's colour (the base's ribbon is the destructive red).
- Leases: PP-23 and PP-24 lease one seller each, as PP-22 does; PP-19 is unchanged in its leases.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d76a27f1 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 780 unit tests (133 files), the usage maps (unchanged, they match), the hardcoded-strings guard (0 findings), the selector self-test, a build.
- Every PP-23 line traced to the code that answers it: the photo step's `post-photos-input` (multiple) and tile states, the encoder's four draws, the route's optional `mid`, the paths it stores, `photoRowsOf`, the review step's preview, `srcSetOf`, the thumbnail button, the viewer's cover.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-7.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn 6's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration: write no file under supabase/migrations and use no database tool this turn, apart from the census's one read.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 22 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-7.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 22 files → each equal to:
  9bd4bd1b97a607b23a42659f375b29d0baabef0dab62a5b329d1f25441b62e81  docs/_changelog.md
  01fd23467364632395f06dd65c7164f857cc2772f7458d95358969b246464307  docs/features/ai-services.md
  053d65c6bb06642af147ed9f2dd1e9ecaa1441e744dc83ac19c07257a438cd90  docs/features/media-pipeline.md
  302d048c4e164b2ac8e79d968998f4dceb6aa5533810dc946b5590d3247f2a73  docs/features/posting.md
  5baa9248ac4ea204286ee080c451b351e1be1f3b216d6b19742371474fa20262  e2e/admin-screening.spec.ts
  15ba3a27206b67ea7d3336f5e4e360f3f716499ca6a37bddc75eb99a72a07899  e2e/helpers/colors.ts
  161bf3981c045367e0de921aa0f2171b0d4f831d2a93db59923c7df126f1af0e  e2e/photo-pipeline.spec.ts
  47a7aebd268831c6d4fee0c5774402394dc6a900f35353abdb7970311656919b  roadmap.md
  14503fabccc160c815ebab76ffd247b3ea532348a8cab123a4246e4d74b1c2e4  src/features/posting/photo-encode.test.ts
  0c1e9e30d7705a10fc6219f4cc65cff876550e08b62d9e9d067345c5d794524b  src/features/posting/photo-encode.ts
  49b33390a641dcfb8fff5f166534963c698b4d9a24f1603256cd2cc7cf30c8c8  src/features/posting/photo-links.test.ts
  be93b8530434de5a013812d86dccf084954f91fd33b82b1f15269f5827df7ee4  src/features/posting/photo-links.ts
  30b813bcc268c67d40adc5dc729f8b0285dbf50a93336e55540e4ecef88a847a  src/features/posting/posting-service.ts
  a34d84b6ad42d9dda7c89cc2dca34183ace29aaa0c1d22d9863bfb675ce685d6  src/features/posting/preview/photo-gallery.test.tsx
  b5ba2e2ee61611c37f8e7fcbb86cca58996e55104950f9feff1d37ac0f2041fe  src/features/posting/preview/photo-gallery.tsx
  e5e5bf180d75258ce01561bb93de2b44758c53f766e2315fd202468be4773fb2  src/features/posting/step-photos.tsx
  8d01286f32a9123e5e4da0060677c72bf374e817d8fc7ed8d4fa25c2b987af12  src/routes/api/upload/photo.ts
  25f9619f9c5018b124b3f290f7521cdff1491a238ddebb7237c42055e3dec17a  src/server/media/links.test.ts
  d66eb04e3bffe84c2bf1fc7fbeb82e4b541c07522e0e94a768a69375b4869d68  src/server/media/links.ts
  8540a02f0b64ec1b72f647c6966563e6eeebc63b654824d69917f339a91a4297  src/server/media/policy.test.ts
  39745421dc18c6d70d9c2b7f1db8591c94a861f5ab70892f7fc42bcae990dd27  src/server/media/policy.ts
  351d0322e7fe15543d6d5a8fa728a208e25b3e7b3ce4fb71c13bb5e5f8c85d81  src/styles.css
- (c) On ethio-prod with your query tool (SELECT only): `select max(version) from public.migration_marks;` → 20261014100000 (turn 6's mark; this turn adds none).

THE CARRIER — B13T7-TURN-CARRIER-2026-10-13.md (33,399 bytes; sha256 551866730ee7fab63b3f53e6d11b9852bcf80371314249fe06b78d630400ab7f; 81 sections)
- Its first line starts "B13T7 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 22 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ad2a2c0aefcc012a88bcf3594f03182905fd49aaeb00c0b0548e5ceedb75941a  docs/_changelog.md
  e13933b171fbdaf73bc4bf0e8147f4c5d823baa91713e8d87dc0ce6adf5cbdc4  docs/features/ai-services.md
  06605d4f2e6d2bb5d86da5cf6acef02e18987fe1e9d483e951a16c8cfd312da3  docs/features/media-pipeline.md
  258877bf60df650ded323b4db22960958995ca290b7c7ab0a482c17e85063d3a  docs/features/posting.md
  d3836cbe56e7210ba3df7735f2735d957a905b29d08546761aae8496e56abe4f  e2e/admin-screening.spec.ts
  922b13fbb8c16762101808a6d4a721a02700a8a1d902f3f671e733bd0cdb3084  e2e/helpers/colors.ts
  a9712f4800909a58bd3a05bc0893d139c8b70ec9ea68726dcee23acaa9322e8d  e2e/photo-pipeline.spec.ts
  1da903d443908ffc1dcada7b7c290f0be6c1a8d92335d2dee7d42599051cb3b6  roadmap.md
  cb7d21503bf84231d852a1f480899b2978777d1ee6dbfaf1bfbd6c70fcc7f965  src/features/posting/photo-encode.test.ts
  56cb0cc98ec9705943b40c3b7f026468c124c4bbea6159317d6af48a44bbf372  src/features/posting/photo-encode.ts
  25fdeede83edcdabd40483b878a71d8f2c198aeabe20bcbf3c85d28cf6a8c68b  src/features/posting/photo-links.test.ts
  211cc177e3b72a21b5750964ed3c6c198de749ffdbb18a1d8d99d15d9c34449b  src/features/posting/photo-links.ts
  94231268072dbd6db9f6d7637e03427f6816be708cc2d1f4b3c36b511ad47b08  src/features/posting/posting-service.ts
  cccf806edc399b81d18c1c9b552a71725e9f9309bd5985302ab3ce5c78b7a669  src/features/posting/preview/photo-gallery.test.tsx
  a87c47e9c54432473361b687344e4e05d0555cb68ab83247550cc38c3eaee05d  src/features/posting/preview/photo-gallery.tsx
  c61f1e1425e76433d8ccb4274ac7647aa5443140f2e9b25cc933e819a0ed9588  src/features/posting/step-photos.tsx
  0457feb82f89eba8923c92d6c819cdd472b58d2512fb604cc5369e46a2bd1d45  src/routes/api/upload/photo.ts
  6ae59f5741a7e4cab6cf5c46ac35ee1aaf2fbe633384b873d77d06a95a01627e  src/server/media/links.test.ts
  f393e831164caed4e9df751fb0829336aa30714b5ddf322b7f2705ccd804c04c  src/server/media/links.ts
  a144dd1b6594acaf7aaf8706cfddfd09d8ce1df10b47258b51e622e98b766e58  src/server/media/policy.test.ts
  8f8d8d69a3199eb9bbb653d76c3dd804db7f843c410697aecf5f5b0a60b5a45a  src/server/media/policy.ts
  1fa2eda469d0180adcfc4bc0768b715bfcbe2619cde12399e8dc08e6bacf9d7d  src/styles.css

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t7.log` — 780 passed (133 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and a build on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs PP-23, PP-24 and every other spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 22 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 22 carrier paths and the brief, and no migration file.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Send Lovable nothing for about 25 minutes, so CI on the final commit runs to the end; the supervisor reads it.
2. Publish once CI is green on the final commit.
3. Then the supervisor's walk: the gallery on a computer (a wide photo level with the thumbnails) and the cover's gold ribbon.
```
