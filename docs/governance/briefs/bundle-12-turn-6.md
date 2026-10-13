# Bundle 12 — the tidy-up round, turn T6: a stored photo shows on the photo step, in the side preview and on the preview page, through links that expire (INC-588, D151): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T6 (2026-10-13). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: the commit that lands turn T5 on dev (send this brief after T5's turn has ended); the census below proves every file by content. This file is public: it is written as build instructions. Tier A: a route that signs storage links with the service client after the caller's own read of the photo rows, and the writing helper's photo input. Also: the posting form's photo readers, unit tests, two E2E tests, docs. No door, no database change, no policy change.

ANSWERS TO THE LAST TURN
- CI on turn T4's commit 4959bbc4 (run 38343868418) is green and moved main to it: turns T2, T3 and T4 are closed. The fast lane failed again with every test green (INC-589's shape, its second time); turn T5's reporter change names such an error from its own run on. Nothing for you to fix.
- Turn T5 is read against the supervisor's own copy when it lands. A fix it needs comes in turn T7, not here.

WHY THIS TURN
- INC-588 (the operator's walk of turn T1, 2026-10-13): a stored photo never shows in the side preview, the review or the admin's preview as buyer.
  - The upload route stores each variant as `{ partition, key }`, never a URL (src/routes/api/upload/photo.ts).
  - Every reader kept a variant only when it was a string, so every stored photo read as "no photo".
  - Turn T4's measurement: the 'listing-photos' bucket is private on both projects, and no media setting is set.
- D151 (the operator, 2026-10-13): the bucket stays private, and a screen draws a stored photo through a link that expires. The other choice, a public bucket, was declined: anyone holding a photo's address would see it, drafts and removed ads included.
- Who may see a photo is already decided by the `listing_photos` policies:
  - the seller's own (`listing_photos_seller_read`);
  - staff who may view listings (`listing_photos_admin_read`);
  - an active listing's stripped photos, for anyone (`listing_photos_public_read`).
  This turn signs exactly the rows the caller can read, and nothing else.

WHAT THIS TURN BUILDS
- src/server/media/storage.ts — `readLinks(service, partition, keys, seconds)`: signs keys through the provider (`createSignedUrls` for the `supabase` provider; R2's public base when it is set, else nothing). A key the provider could not sign is left out.
- src/server/media/links.ts (NEW):
  - `PHOTO_LINK_SECONDS` (3600), `READ_VARIANTS` (card, thumb, cover), `MAX_LINK_PHOTOS` (30);
  - `variantRefs(paths)` — the signable variants of one stored photo;
  - `photoIdsOf(raw)` — one to thirty ids, each once;
  - `signPhotoRows(service, rows)` — `{ [photoId]: { [variant]: link } }`, for rows with `exif_stripped` only.
- src/routes/api/media/photo-links.ts (NEW) — `POST /api/media/photo-links`, signed in, `{ photoIds }`:
  - it reads the rows through the CALLER's client, then signs those rows with the service client for one hour;
  - it answers `{ ok: true, links, expiresIn: 3600 }`;
  - a photo the caller may not read is absent from `links`;
  - no session is a 401; bad ids are the refusal `badShape`; a failed read or signature is a 503.
- src/routeTree.gen.ts — the generated route tree with the new route (machine-generated; if your platform regenerates it, it must still equal the table).
- src/routes/api/listings/assist.ts — the writing helper takes `photoIds` (at most three), reads those rows as the caller, signs their card images and fetches only links it signed itself. If signing fails, it writes without the photos.
- src/features/posting/photo-links.ts (NEW) — `CARD_FIRST`, `CARD_THEN_THUMB`, `photoUrl(row, order, links)` (https only, else null) and `linksOf(payload)`.
- src/features/posting/use-photo-links.ts (NEW) — `usePhotoLinks(photos)`: one request per set of photos, kept 45 minutes.
- The readers:
  - listing-preview.tsx (the side preview, first photo);
  - preview/listing-detail.tsx (the preview page: the review's preview, the admin's preview as buyer, screening);
  - step-photos.tsx (the stored tiles).
- wizard.tsx, step-details.tsx, posting-service.ts — the helper's request carries `photoIds` in place of `photoUrls`.
- Tests: src/server/media/links.test.ts LK-1..LK-3 (NEW); src/features/posting/photo-links.test.ts PU-1..PU-3 (NEW); e2e/photo-pipeline.spec.ts PP-12 and PP-13.
- Docs: media-pipeline.md ("Read links that expire"), posting.md (INC-588), the changelog, the roadmap (line 3; the T6 line; D149's line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- Links last one hour, and a screen asks again after 45 minutes.
- Until the links arrive, and when none comes back, the category's picture shows (the default picture), never a broken image.
- No rate limit on the links route. It signs only rows the caller can already read, at most thirty per request, and each screen asks once per set of photos.
- The writing helper signs its own links. If signing fails, it writes without the photos rather than refusing.
- The new ids are LK-1..LK-3, PU-1..PU-3, PP-12 and PP-13.

TESTS
- Unit: LK-1..LK-3 and PU-1..PU-3 (NEW).
- E2E (e2e/photo-pipeline.spec.ts, NEW tests):
  - PP-12: the photo step's stored tile carries a signed link (`…/storage/v1/object/sign/listing-photos/…token=…`), and the image draws (naturalWidth above 0, after it is scrolled into view, because it loads lazily);
  - PP-13: the owner gets card, thumb and cover links, `expiresIn` 3600, and the card link serves an image; no session is a 401; another seller (a second context) gets `links` equal to {}; the job super admin (a third context) gets a card link.
  - Leases: two pooled accounts at most (DEC-174); the job super admin is not a pooled lease.
- Red first: PP-12 fails on the base, where the stored tile has no image (it showed "Photo added"). LK and PU fail on the base, which has neither module.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn T5 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 737 unit tests (125 files), the build (it regenerated the route tree), the usage maps (they match after the guard rewrote them), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-6.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T5's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the usage maps;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths, the two usage maps and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-6.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 14 files → each equal to:
  7ad262c943c712001fb0f195e4d68866b2c74049f4f3fc4fdfc055679dba867d  docs/_changelog.md
  c6324c7c41e757696b93134a50d7458bdea6b69dd75a3bb39caabcc7a015aaa7  docs/features/media-pipeline.md
  40e8712ea2c70b18cdb717817fc921b051c50075bf0d760cd4e3b0fd9b8840cf  docs/features/posting.md
  9c192069aa32924eb63e2aaccd8f7fce2ad48653863f6bf5d0a670b9fac76067  e2e/photo-pipeline.spec.ts
  3e19da42a67f21733ecbc8b4a4f4b4d482b54f87734e3b92ccec4614a8c7e0db  roadmap.md
  a59992b4fe672ba507f6704e017164f254105b609315959b47bb66194141b9f0  src/features/posting/listing-preview.tsx
  1ecf53462738f679c62cb976289cc07a98a1a950b7a9153d238cb64a76be3ec1  src/features/posting/posting-service.ts
  7e0bac3956c0c590ec120da080dd70b1a53f6bc96e35ee4058eef9bf6ca16c8f  src/features/posting/preview/listing-detail.tsx
  39a73633f1561cf044b0a7d401a584cfaf3187a5cedba364e08341069b6aca6a  src/features/posting/step-details.tsx
  0e1438c40b1a1fca740b1fbace82b85ecad18b72972092836cc30d67b7e927e7  src/features/posting/step-photos.tsx
  7e21d44afe9a285bf4fbd76cc421e9d218a3c7ab6abfd857bc2c6d39e702b80a  src/features/posting/wizard.tsx
  02c53392b1b49452c8c110fdf1224172203804e7adc607e1ff37992035d0716c  src/routeTree.gen.ts
  260657c88b8cc299464a96caf8904593095ffa967bd8c3f77fed8d45c57e4bf2  src/routes/api/listings/assist.ts
  88be5970e34f5eac953078397c12d736195bb953bd46006936444e64e715387a  src/server/media/storage.ts
- (c) `ls src/routes/api/media src/server/media/links.ts src/features/posting/photo-links.ts` → "No such file or directory" for each.

THE CARRIER — T6-TURN-CARRIER-2026-10-13.md (31,367 bytes; sha256 e521988fc9a5a5dbe62bb8488b2426e3127ad42bb3ad2765c5785286cfedf38b; 48 sections)
- Its first line starts "T6 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet (create its directory);
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 22 paths below; each must equal the table. On any mismatch, STOP. The two usage maps are among them; they are hashed after step 5. Also paste the saved brief's sha256sum.
  8db97251dedb8253202400bc0326ffc8686ec1c36df620afe107d5b88ae579e5  docs/_changelog.md
  67f9aff61ed3e72ff04e050e9bed59c386fde3f749d9ce9c2d7ff8e23736feb1  docs/features/media-pipeline.md
  263761b527183017ae7c797d7e2c53043caf2bf5866268d7fc6f7b55cd0bc15e  docs/features/posting.md
  18d23cbb8254273770435444b3460d88dc3665b4b7a93209417cbffa1dc02ebb  docs/generated/i18n-usage.json
  33ce1ef4729bbdd5bd559466c36986211379b51b6d06ae18ec4b50f74927d63a  e2e/photo-pipeline.spec.ts
  18d23cbb8254273770435444b3460d88dc3665b4b7a93209417cbffa1dc02ebb  public/i18n-usage.json
  f898ae40c3015d055035c1f7550d25be3931f1259b1e4af83d527664d73a5d3c  roadmap.md
  67288fb63388d52200fb99a1724bb371c9a37647d9b178e28cc0f4f76e76720a  src/features/posting/listing-preview.tsx
  08b9625a1844d2b520c0ec1a088037d766b864a4e5c78d470f262842ac0aba11  src/features/posting/photo-links.test.ts
  aff2a83a9d62fc61a0e485267bf2b15d7801ce2e5f9b29eab4891fc8672fdaae  src/features/posting/photo-links.ts
  7627ba0f1bc1fe274491df5312ffaec35e307c38f075774459ec34597f6356f6  src/features/posting/posting-service.ts
  83b898a5325bec4cdc7013b380fae1322b1bd3b89d33b7c31ca3a65d634ba6df  src/features/posting/preview/listing-detail.tsx
  9cef8280bf73231a7e5102581626cdb186fcfb3fc1e3c314299fb8aecae3fd83  src/features/posting/step-details.tsx
  bff8c73b62c11c000b1322fc1a6e639f6ebd7b170b1fddab305ba7098e0ef5e6  src/features/posting/step-photos.tsx
  8bd99171e41da93d753c25ca9cb6eeca96a1fbbee7daa903c938c88b92c5dbb1  src/features/posting/use-photo-links.ts
  1a266658b141a9ee67c16c513fc405ec327fc67976eba5fa86a593eac746c594  src/features/posting/wizard.tsx
  b655bdd9c57c4d82c36b3a09d0fc0a5f67a821e530efe4a3a660be773fd3aa00  src/routeTree.gen.ts
  f02b1676590a192d58a823b36df4cb57611dce3af3c10c8cafcd052628669528  src/routes/api/listings/assist.ts
  a7c3d5401421ec6f0675eab795a86ecf01051c3d6a30cb95b918cfdfcee65912  src/routes/api/media/photo-links.ts
  4f87f3f23bbc706ef9a3e6fd23406e981ede88f82f298afb8011803306ffc142  src/server/media/links.test.ts
  7b56532e3b88666d3320dfe01dc8d6503f64db4308ba0e1d26882bdb54bdb152  src/server/media/links.ts
  046d1208f9e86d0b3f31f17d0c356a2fe45fb4c93f7e3d3401dea102ef374a93  src/server/media/storage.ts

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json (no new key; four new files are scanned), then exits 1. Run it again: it must print "usage maps match the tree." Then hash the two maps (the table above).

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 737 passed (125 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck and the build on its own copy.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 22 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 22 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit; the supervisor then sends a short walk (the photo in the side preview, the review and the admin's preview as buyer).
```
