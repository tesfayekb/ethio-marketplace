# Bundle 15 — turn 1: INC-625 — one rule for what a caught error says in a server log line; block S66's next free slip number amended: brief, version 1 (saved unchanged, 2026-10-14)

```text
BUNDLE 15 — TURN 1 (2026-10-14). ONE TURN. No migration. No string. No package change. No database work.
Base: dev b104068f (bundle 14's records turn). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: the server's log lines (the API routes, src/server/, src/server.ts, the root route) and their unit tests. Tier C: the docs, the usage maps, the spec-ledger's amendment, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Bundle 14's records turn landed as `b104068f`: exactly its nine paths, each equal to the hash in the manifest it carried. CLEAN; its CI run is queued behind turn 3's.
- One line in it is the supervisor's slip (S209). The NUMBERING line at the end of block S66 in the spec-ledger, and the handover's section 1.6, give S208 as the next free slip number. S208 is block S66's own slip. This turn appends the later word: the next free slip is S210. Block S66 stays as written.
- Bundle 14 turn 3's CI (run 38593255281 on `6e12f379`) is still running, and the supervisor reads it. Turn 2's run (38590378235 on `cf750bc6`) was green and promoted.

WHY THIS TURN
- INC-625 (bundle 14's CI, run 38590378235, shard 6, in the server-error census): two log lines named no cause.
  - "[ssr-error] /api/i18n <html>": an upstream HTML error page was written into the log.
  - "[ssr-error] /api/categories/tree undefined": an error object with no message was printed as the word "undefined".
- INC-328 and INC-574 had fixed the first kind in the shared user-client helper. Other routes kept their own copies of that rule, or had none.
- G29 (fix the class): the supervisor's census of server code found the same conversion in 33 source files. This turn gives them one rule.

WHAT THIS TURN BUILDS
- New src/lib/error-text.ts, with two functions:
  - `errorText(error)` gives the error's text:
    - an Error gives its message, or its name when the message is empty;
    - an object gives its message, else its code, else its status;
    - a string or a number is given as it is;
    - nothing (undefined, null, an empty string, an empty object) gives "no message (<type>)", never the word "undefined";
    - an HTML error page, from its first `<!doctype` or `<html` tag to the end, is named "upstream returned an HTML error page (<status>)", and what came before it is kept.
  - `errorWithStack(error)` gives the same text, plus the first stack line of an Error.
  - The file imports nothing, so the root route can use it too.
- Every server log line takes a caught error's text through one of the two. The log helpers do the same:
  - `logRouteError` in src/server/supabase/user-client.ts, which now imports its HTML pattern from the new file;
  - the public routes' own `logRouteError` (feed, category tree, i18n bundle, locations, attribute options, translate);
  - the two `fail5xx` helpers (translate, category images);
  - the import gate's `refuse`.
- The other places in the census, by group:
  - the admin import and export routes;
  - the AI meter, the category image and icon routes;
  - the map, geo and catalogue-search paths;
  - the photo, assist, identity and media paths;
  - src/server.ts and the root route.
  The category tree's `errorOf` (the "undefined" line) is among them.
- What a route answers is unchanged, with one exception. Where an admin route's answer already carried the error's own text, the same rule now applies there too:
  - Admin › Translations' machine translation: its error, and each failed key's reason;
  - the category image's error.
  A plain message reads as before, so the server-error census's allowlist entries still match.
- New src/lib/error-text.test.ts:
  - ERRT-1 to ERRT-5 test the rule;
  - ERRT-6 and ERRT-7 are the census. ERRT-6 refuses, in server code, `instanceof Error ? x.message`, `String(error)`, `(error as Error).message` and `(error as { message }).message`. ERRT-7 refuses a raw `.message` printed on the `[ssr-error]` channel, and lists the log helpers.
- UP-2 (src/server/supabase/upstream.test.ts) now expects the page's status: "remove: upstream returned an HTML error page (502)".
- The usage maps (docs/generated/i18n-usage.json, public/i18n-usage.json) are regenerated: one more file is scanned (435), and no key changes.
- docs/features/listings.md and e2e-harness.md (INC-625).
- The spec-ledger: the amendment to block S66 (APPEND).
- The roadmap: line 3, bundle 15's lines, and the carried line.
- The changelog.

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The words "upstream returned an HTML error page (<status>)" and "no message (<type>)".
- One rule, in one file, for the whole server.
- The census is a unit test, so it runs in the unit job on every commit.
- Block S66's numbering is corrected by a later-word paragraph, and the block stays as written.

TESTS
- New: ERRT-1 to ERRT-7 (unit).
- Changed: UP-2's expected line.
- No browser test changes, and no test is loosened (G38).
- 852 unit tests (149 files); there were 845 (148) before.
- Red first (G38): the supervisor ran ERRT-6 and ERRT-7 against the base's server files, and both failed. With this turn's files, both pass.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev b104068f with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 852 unit tests (149 files);
  - the usage maps (they match once regenerated);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test;
  - a production build, and the bundle budget (JS 312.6 KiB of 320).
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-15-turn-1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. The CI read. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines.
     - It may name bundle 14's turn 2, turn 3 or records commit, with any conclusion. Whatever it shows, go on.
     - The CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it.
     - You cannot git-fetch that branch.
     - Paste `git rev-parse HEAD`: this is <START>.
  2. Step 0.
  3. The census (below). If any result differs from what it expects, STOP and report: write nothing else.
  4. The carrier, then the hashes.
  5. The checks.
  6. The report.
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections each end with a newline, blank lines included. Write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope:
  - Files: these only — the 43 carrier paths and the brief. Name any other file in the report's first lines, with its reason.
  - Database: none. No query, no migration.
  - Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-15-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 41 files → each equal to:
  a884438dea9cc1aa81eba67a850958bde243411b7502c689a3e56b2d180350c8  docs/_changelog.md
  bb404cd126fc5496f4d09f44fef10956dcd462e06dc890fda8f3017d533c2e54  docs/features/e2e-harness.md
  c8baf069a4a7ef707a6668963e4ed04d44de9bdef074665bdda3df0eb8b86b7a  docs/features/listings.md
  d8ccb42b62b5431effb47008027b2d7022880d3854f1bcd44d0593d0df316380  docs/generated/i18n-usage.json
  32a5ee32f48668b247363dd76de1d973d20a966a62b47faf39a36e16ec180a84  docs/spec/spec-ledger.md
  d8ccb42b62b5431effb47008027b2d7022880d3854f1bcd44d0593d0df316380  public/i18n-usage.json
  d1a305c5865ee41d068284173dcb65d8eb21720f22b0c5762e1f65196d5fd1e5  roadmap.md
  46da9820b9d5416d3e14b47dbd4bb9bc1f86dd9f1004444a1ab109fcb3e80668  src/routes/__root.tsx
  721f32b57e69ab7a8360498671ff98d56d0af8fad2b976da14728d4617a12b16  src/routes/api/admin/attributes/export.ts
  909f93ceaf8279ef1ff8875921a592d2938a4c937cba1901c904c24a3e810b73  src/routes/api/admin/attributes/import.ts
  6f7d3c0f62a42e82cbefa8cfbe0e21fb919aeda0eb48ede0f6a4f8a2328f39a6  src/routes/api/admin/categories/export.ts
  c0088aa455676f20f3dff31402f29235e36f507b3a874ca6eab8749ff3317740  src/routes/api/admin/categories/generate-image.ts
  1ec29bf016fd61f4a3fbabadbf1399b8c0f16e638b1348c7abc1b3efff29847b  src/routes/api/admin/categories/import.ts
  039f385e64299304aa6ef58762533aa61cc3681eb3353f5bc7cabc8757ab7fa7  src/routes/api/admin/categories/suggest-icon.ts
  588985434e8bcb686836099a1f03be603d6bbd3df6fc1ee53d33f96f6cf35b1e  src/routes/api/admin/locations/export.ts
  7dd19164bf3a4cbb731f4eab853856f36d1bb17ae7d256538da0aec77c57d3b4  src/routes/api/admin/locations/import.ts
  92e2414e13b9b01d2326f85a78988039cdba05e3702f96461bea5fce32ffdd42  src/routes/api/admin/translations/import.ts
  189d51f76f5a55ce04130c0d44355d805b39f3744395436547744bab4a0ce790  src/routes/api/attributes.$id.options.ts
  a212de7265fa8262d49d83e27d5193c7707a97639e5ec67fd8357da476b30514  src/routes/api/categories.tree.ts
  0cd7ee9ce2f9f613bf60581dbe97f418886a05aa8bbe4e2fa5c2208647f2dc63  src/routes/api/feed.ts
  ae4b06d39705a238b9c9fc69074426b426bd6ba6de9a2944fd381f47e9c0a2e9  src/routes/api/geo.ts
  8139e331274c7df138f989a5e8a7ef95ddbb83eb7292456de633864a1a5b453a  src/routes/api/i18n.$lang.ts
  7f70732f0c0eb53af54caafced3deb581ca26f6b0a7675f7335141727659ca51  src/routes/api/listings/assist.ts
  c49d76afc93e04375fef78715da797b3fa3cd25231208d70909386b1245629b9  src/routes/api/listings/identity.ts
  ae3dff299ed7e037a3694d5b3da364208ecd991ca5e56ee318ebc6f4f6d27167  src/routes/api/listings/photos.$id.ts
  c5dde246d5d9617cfdadd1681aaec0ff041d96387ab071e3b7022248c36534e4  src/routes/api/locations.$country.ts
  e756c6f588d88be3aa971b3c85ea188bc69e5a61d6e99910f84436675783594f  src/routes/api/locations.ts
  be4ffd174b8477c61264af998b2d2273dfd95ccd057982e4e8bc9b5a7e5e746d  src/routes/api/map/tiles.ts
  fbc06a80d76f68556c9b34ed5b68035e8d34ffff436e12b6272aab87a90fd7c6  src/routes/api/translate.ts
  0eb7559c46594ebcc554c303ebffdaf6998027bf62792e7118b4ec6d858ea138  src/routes/api/upload/photo.ts
  52660f3d5c1e40d5e997d12a60bfac9618fd58dc0519ffd64b209f4329367622  src/server.ts
  8de1c6fd7df2195fd697975d32047c26b8aa81a16934d34ad8db74169306d38c  src/server/ai/meter.ts
  152f5930853e6538a9e29019613837c417aa11d112c73dd1155bd538cde95cf7  src/server/catalog-find.server.ts
  f58acc34122e4df18a469abc10acaed41fa8be46fdc60ce79294032bf482202f  src/server/category-images/gate.ts
  8661f99e27e2f350959f70cb4ebdd397e8d870248d557317c2e8787fd5402161  src/server/geo/geocode.ts
  69f2002a4d385fe9ca6df9e9e19324cdb2841a97d219db03bd00d6bdbfc5733f  src/server/geo/guess.ts
  a99fa6724a5fa4d42e17325720917c81001861a12d3dfa4a5e5425b1a7322bd7  src/server/imports/gate.ts
  bb2090314912995e68a68dad3aee6b22e9f21559fd8c087ae4b87ed818e1472c  src/server/media/background.ts
  cdb8a072e0f254ddb40dbbff9bbfb550d2f474d52e072f7502bfe18144f62bb4  src/server/media/policy.ts
  1ac9714887d34812e001fba019e3617c5e40463145135e6b091acd44e3bea9ee  src/server/supabase/upstream.test.ts
  59a90d1798f498041f99490cab8c74f87cdfedf7700830f6946ad51f6bd81e70  src/server/supabase/user-client.ts
- (c) `ls src/lib/error-text.ts src/lib/error-text.test.ts` → "No such file or directory" for both.
- (d) `ls supabase/migrations | tail -1` → 20261014155221_b3376fd8-31ea-48f3-af04-b516032081ce.sql (bundle 14 turn 3's). This turn adds none.

THE CARRIER — B15T1-TURN-CARRIER-2026-10-14.md (29,129 bytes; sha256 73cbaec8a282f30c9d250215888a47549b9f30ba97e1f2d71490abd795399cba; 107 sections)
- Its first line starts "B15T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
- Line numbers:
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters.
  - A section ends with a newline. That newline ends its last line and adds no empty line.
  - A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file. Take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 43 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  d8e114120a19158472ba3d4be9e4bd1448e633d45f1537b2fdcc304f40eda324  docs/_changelog.md
  e43c12fd3db391675fdb83b567cdcc2a6350a5e5cd488ea7985536d229dd1cc6  docs/features/e2e-harness.md
  f6f2d90e5666a057c5b2fca050329352241bc6232992c3471d85396c8b443f69  docs/features/listings.md
  bfea4b41e31177d890cbf0aab30bb3a20b6d5e634981a152e7f8f1033fd09889  docs/generated/i18n-usage.json
  3c9028dfee6a53f77d0b44270b1cb0378e93a4b4d402f6c8159f53a5d05355a4  docs/spec/spec-ledger.md
  bfea4b41e31177d890cbf0aab30bb3a20b6d5e634981a152e7f8f1033fd09889  public/i18n-usage.json
  276bd020afc0ca83a57b8e4de3081aa54a9e16fb6d72c4008a0efd532d5701db  roadmap.md
  a76fa8e29b18e5710c9f0b2062f2a578b0d1dbcebda6c94e3e8776d92865b5ed  src/lib/error-text.test.ts
  df76ead9d054cac2dc35919f7cfa22e7065c7d7ec7bc27c608228b19bf279fd1  src/lib/error-text.ts
  56a82cad338d04f20fdf9cebc927285e0f4b9151fe89e325b18a59ac9d7e3d70  src/routes/__root.tsx
  20e2447a29c50b688cca75cff548c5d1abed55d2217fceffcccf41aad857225f  src/routes/api/admin/attributes/export.ts
  cc3f546deafade365c27b996edc18199d6d6bda4c05e73d7a4c79004332f5f9c  src/routes/api/admin/attributes/import.ts
  84d7ea557824b008a017ca3d3f7dda3d394c4e2b35b4307e1ab9243b83a4d284  src/routes/api/admin/categories/export.ts
  66d52895acbf31f9fed75a8fe61b97c54a1d8dae8fd9f4b828b812908dfae3f6  src/routes/api/admin/categories/generate-image.ts
  9f1b9a001c8d2924d0d18924a368d7742d85f0fb21f4deff921064c01ebc11fe  src/routes/api/admin/categories/import.ts
  b99b7292f165a5ecdbd0568796dc776c2ed487ab79a532a530d70c40ce5d62a8  src/routes/api/admin/categories/suggest-icon.ts
  ca92b5e9888deb22f81104df716a82aac9e25ee2b69c7339e5cb72141e528242  src/routes/api/admin/locations/export.ts
  7d2c9e9793856c85d8676013fe1c4e6d980e8894afd815cb116b3b45cf91af67  src/routes/api/admin/locations/import.ts
  f0233146af98b77e94c2fe9ab3fb04c2b70f8c47511c1c807307dc4964ee3d3d  src/routes/api/admin/translations/import.ts
  475d398741574d1c8bd7535cc4381e3e823948a6db1be3490bceefaea40dfc01  src/routes/api/attributes.$id.options.ts
  07fd4acc50a0ceba4ce72b79f77f4825a454b5111991800f7d9880e207e2265a  src/routes/api/categories.tree.ts
  04b7686e5d5b6b81dfec151d64b2ce5e4986377766a7c967bae2a90c3d089c86  src/routes/api/feed.ts
  a75536adc88fe4b40c5ad4ba8616bf5c4d7637552c36f5d49747d1e2971920a8  src/routes/api/geo.ts
  435cb2dbdf6e545a72babe61f15f6aa194701dc7dfe0e71acddb0a1a1e8e4246  src/routes/api/i18n.$lang.ts
  3cdbec741985b18f39b05be1bc5c98824678d96b403d8b4fc2ff84612722b1f6  src/routes/api/listings/assist.ts
  0eea4ce55e69b825cdd0633f08d1908b616944e23c071246cd2ce9ae0523edc1  src/routes/api/listings/identity.ts
  1a8bfc7bdf771220a9f3e83c4aebe0e6be2331711f638cc10c510ed5bc877d8c  src/routes/api/listings/photos.$id.ts
  b2fc4d48ec250e70d26b9b7c925a69b18bccf8cf4065af1d70fbbb6da28b8c66  src/routes/api/locations.$country.ts
  e20b4043520ee32edf315de38272550c848d4f652104fb55cfc22e7d1aebe25d  src/routes/api/locations.ts
  6324f2a9b6b5699ad2e0dc0d935019f25e6738fb7ef90e874d9dc051db216879  src/routes/api/map/tiles.ts
  e447ea920b3e8e256d2d8eae94c8ee407567a28ab6afd6091c2c649fe530d2c2  src/routes/api/translate.ts
  338c3fbbae2309c6809fb0002f2b9e34276a4021ca3c8cdb1fab064ad04903db  src/routes/api/upload/photo.ts
  9a88e721178ed655cd9b7e82ef9f1c5caacf1fe54e39235c782f850e109d4851  src/server.ts
  7c02218528e35056590e3c676969ac320f732ed9b06bc3295c00d666b452fb71  src/server/ai/meter.ts
  eb22955d8696dc3b98df30e9fd58f3be2644d10c08e06f9728b93fa19099fb2a  src/server/catalog-find.server.ts
  543cb77de47bd418f3bce9688d05dc03b5024ed70856e60a08c6d7a19295d889  src/server/category-images/gate.ts
  4f75d0cc6ad782b41b33ddfd3cedbb495d90846870e82a98d256cf27e03d145b  src/server/geo/geocode.ts
  fb3146f2a8ce5eab884c4199cb66f5149c08d41c674331a329c6b077146ced93  src/server/geo/guess.ts
  23d7656443906b3e0fa127ddc84a04aa3a23cce37d41da94ad9a08ff3257295e  src/server/imports/gate.ts
  db6964393c396ee26308836bdbc4ed1ddea3fc793c5d1ac9825ac9e609fb1f95  src/server/media/background.ts
  47ec6315374f882b2199bba01c0722ae8266c9591070d4440357bb306a733b6c  src/server/media/policy.ts
  02ddd8a6752f899b41b34fd05ee93615cbf1ada70f6b52fbecdd8b62b02d12dc  src/server/supabase/upstream.test.ts
  539a0cb977c0b883ae43d4f9791e94e1040db4a81d89f3d2b866911283cdab4a  src/server/supabase/user-client.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. Below each is the supervisor's result on its own copy (not lock-exact, INC-420).
- `bun run format:check` → clean.
- `bun run lint` → 0 errors / 33 warnings.
- `bun run test:unit 2>&1 | tee /tmp/unit-b15t1.log` → 852 passed (149 files). Keep the whole output. If any test fails, paste its name and its first error line.
- `bun run i18n:map-guard` → "usage maps match the tree." (the carrier already holds the regenerated maps).
- `bash scripts/check-hardcoded-strings.sh` → "findings: 0".
- `bun run scripts/e2e-select.ts --self-test` → OK.
- Not run by you: the typecheck, the build and the bundle budget. Your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." CI's jobs judge them; the supervisor ran all three on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs every spec.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(d).
- The 43 sha256sum lines, and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`.
  - If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too.
  - Expect the 43 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. Bring the supervisor Lovable's report. The next prompt comes back at once (DEC-181).
2. Publish only when the supervisor says the newest commit is green and Lovable is idle.
3. Then press "Sync keys" in Admin › Translations (bundle 14's words).
4. Then the supervisor's short walk of bundle 14.
```
