# Bundle 10 follow-up — D119, the invite card: brief, version 1 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 FOLLOW-UP — D119, THE INVITE CARD, VERSION 1 (2026-10-09). ONE TURN. No migration, no database change.
Tier A for four files:
- src/routes/post.tsx (the /post route guard);
- src/routes/auth.tsx and src/routes/auth_.callback.tsx (the sign-in doors);
- src/lib/return-path.ts (the shared return-path rule).
Tier B for everything else (the listings pages and the posting wizard).
Line numbers are as of commit 7fc3a7a5 (dev). This file is public: it is written as build instructions.

ANSWERS TO THE RECORDS TURN
- Verified by diff of 2ab35a33..7fc3a7a5: exactly the ten paths, each byte-identical to the supervisor's result. Your split script stopped on roadmap.md (a root path); restoring the four files it had already written and re-running it was the right repair.
- CI green on 7fc3a7a5 (run 37979031139, promoted: main = dev). Bundle 10 is CLOSED. INC-529's fix passed in CI.

WHAT D119 IS (operator, 2026-10-09)
- When the chosen place has few listings, its listings come first in their own row, and other places' listings follow in separate rows. Today's page already does this: the chosen place is section 1, and each wider place is its own section with its own heading.
- What is new: a card at the end of the chosen place's row invites the visitor to be the first to advertise there. When the place has no listings, the card comes first.
- The operator's four answers:
  (1) Only the CHOSEN place gets the card. The wider places' rows never do.
  (2) The card shows when the chosen place holds FEWER THAN 4 listings of the category on screen. On the home page, all categories count. The widening threshold (8) is unchanged.
  (3) On a category page the card names the category and the place. On the home page it names the place.
  (4) Tapping it opens Post a listing with the place already filled in, and on a category page the category too. A signed-out visitor signs in first and comes back to the same address.
- No place chosen (the everywhere feed): no card.

THE WORDS (G43 — the Amharic is the operator's own, carried exactly in the carrier)
- `feed.invite.place`:
  en: Be the first to advertise in {place}.
  am: በ{place} ውስጥ ማስታወቂያ በመለጠፍ የመጀመሪያው ይሁኑ።
- `feed.invite.placeCategory`:
  en: Be the first to advertise {category} in {place}.
  am: በ{place} ውስጥ እና በ{category} ምድብ ስር ማስታወቂያ በመለጠፍ የመጀመሪያው ይሁኑ።
- The button reuses `nav.postListing`. No other key changes.

DECISIONS THE SUPERVISOR MADE (G17; the operator may change any of them)
- D1. When the chosen place has no listings, the card leads section 1 and REPLACES the note "Nothing here yet in your area" (feed-step-none). The note stays only as a fallback, for when no card can be drawn.
- D2. When nothing exists anywhere and a place is chosen, the empty-state box keeps its title, takes the card's sentence and gains the Post listing button. With no place chosen, the box is unchanged.
- D3. A category in the address opens step 1 at that category's level. A leaf opens on its parent's level and the seller taps it. Nothing is chosen, and no draft is made, from the address alone.
- D4. On the place step, the invite's place comes after the draft's own places and BEFORE the seller's last post's places. A country-level place only picks the market. The step still requires a city.
- D5. The card: a dashed green border, a megaphone icon in a soft green circle, the sentence, and one button. It is the same width as a listing card in the grid.
- D6 (INC-530, Tier A). The sign-in doors move to the checked return path by its full address (`href`), so the path's query string survives. The shared rule also refuses control characters.

INC-530 (registered 2026-10-09) — the sign-in doors put a return path's query string into the route's path
- The defect: src/routes/auth.tsx :125, :139, :232 and src/routes/auth_.callback.tsx :60, :84 call `navigate({ to: <return path> })`.
- With @tanstack/react-router 1.170.41 (checked in the supervisor's workspace):
  - `buildLocation({ to: "/post?category=a&place=b" })` gives the pathname "/post?category=a&place=b" and an empty search;
  - `buildLocation({ href: "/post?category=a&place=b" })` gives the pathname "/post" and the search {category: "a", place: "b"}.
- Latent until now: no return path carries a query before D119.
- Census (G29): these five calls are every navigation to a checked return path. `oauthRedirectUrl` (auth-service.ts :33–37) encodes the path into the callback's own query, which is correct.
- Class rule: a checked return path is navigated by `href`, never by `to`.

STEP 0 — keep this brief
- Save this file byte for byte as docs/governance/briefs/bundle-10-d119.md.
- Replace roadmap.md line 3 with exactly this line:
  The brief in force: docs/governance/briefs/bundle-10-d119.md (D119, the invite card; one turn). Then bundle 11 — every admin table in the agreed house style, Admin › Screening first (D118); its brief is named on this line when it is saved.
- Tick no roadmap line.
- Read this brief first on every later turn.

HOW TO WORK
- Order of the turn:
  1. the CI read;
  2. step 0;
  3. part 0 (the census);
  4. part 1 (the carrier);
  5. part 2 (the one edit by hand);
  6. part 3 (the usage maps);
  7. part 4 (the hashes);
  8. the checks;
  9. the browser run;
  10. the report;
  11. END THE TURN.
  Do not stop between parts: a clean point is not a reason to stop. Stop only where this brief says STOP.
- The CI read:
  - read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md;
  - then e2e-last-failure.md and guards-last-failure.md at the same address;
  - paste the first six lines of ci-status.md (expected: commit 7fc3a7a, SUCCESS).
  You cannot git-fetch that branch. A red there is fixed first.
- If any rule of yours conflicts with this text, STOP before writing and quote that rule's exact words in the report.
- No database change, and no query to ethio-prod in this turn.
- No package or dependency change. lucide-react, @tanstack/react-router and the Button are already in the repository.
- No patch tool. `git apply`, `patch` and the like are not used. Files are written from the carrier by your own script, and checked by sha256 (S147).
- Tests (G38): no assertion loosened, no timeout raised, no retry added. Nothing in a test file changes beyond what the carrier holds.
- Scope — exactly 26 paths:
  - the brief;
  - the 25 paths of the table in part 4 (roadmap.md among them).
  The platform may regenerate src/routeTree.gen.ts. That is allowed; name it in the report. Name any other changed file in the report's first lines, with its reason. Delete no file.

PART 0 — THE CENSUS (read-only; paste each result; any difference → STOP and report, writing nothing)
- (a) `git status --porcelain` → exactly step 0's two paths: `?? docs/governance/briefs/bundle-10-d119.md` and ` M roadmap.md` (if the platform has already committed them, `git diff --name-only 7fc3a7a5` names the same two).
- (b) `grep -n "navigate({ to: afterSignIn })" src/routes/auth.tsx` → :125, :139, :232.
- (c) `grep -n "navigate({ to: target" src/routes/auth_.callback.tsx` → :60, :84.
- (d) `grep -rn "navigate({ to: afterSignIn\|navigate({ to: target" src --include=*.tsx | wc -l` → 5.
- (e) `sed -n 260p src/i18n/locales/en.ts` → `  "feed.noPhoto": "No photo yet",`
- (f) `sed -n 254p src/i18n/locales/am.ts` → `  "feed.noPhoto": "እስካሁን ፎቶ የለም",`
- (g) `sed -n 353p e2e/helpers/ui.ts` → `function authFields(page: Page) {`
- (h) `grep -rhoE 'test\("PW-[0-9]+' e2e | sort -t- -k2 -n | tail -1` → test("PW-179. `grep -rhoE 'test\("FS-[0-9]+' e2e | sort | tail -1` → test("FS-7.

PART 1 — THE CARRIER
- The attached file D119-CARRIER-2026-10-09.md (352,601 bytes; sha256 c8844641f1ce6c61b27f51592e9a9c144f550cc37c703a73d785405c3ff0f068) holds 21 sections.
- Check its sha256 first. If it differs, STOP: a cut attachment must not be written.
- Each section starts with one line of the form `===== <path> ===== <mode>`. A section's bytes are everything after that line, up to the next separator line or the end of the file.
- The carrier's first line and the separator lines are never written anywhere. The carrier is NOT committed and is never copied into the repository tree.
- Split it with a script (not by hand), and write each section by its mode:
  - NEW or REPLACE: the section is the whole file. Write it byte for byte: UTF-8, LF, with the section's own final newline.
  - INSERT-AFTER-LINE <n>: insert the section's lines directly after line <n> of the existing file. Nothing else in the file changes.
  - APPEND: append the section byte for byte to the end of the existing file, adding nothing. docs/features/posting.md's section begins with a blank line that separates it from the file's last line. The changelog's section is one list line.

PART 2 — ONE EDIT BY HAND
- e2e/helpers/ui.ts :353: `function authFields(page: Page) {` becomes `export function authFields(page: Page) {`. Nothing else in the file changes.
- (roadmap.md line 3 was written in step 0.)

PART 3 — THE USAGE MAPS
- Run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json, then stops with an exit code of 1.
- Run it again. It must print "[i18n:map-guard] usage maps match the tree."

PART 4 — THE HASHES
- Run `sha256sum` on each of the 25 paths below and paste the lines. Each one must equal the table.
- Also paste the sha256sum of the saved brief. It carries no hash of itself.
- On any mismatch: STOP, write nothing more, and report the path and the two values.
  08f6febac2e406bb264a9622218f63c8bef8f44f1b9c6355f4f859ae194bf6fc  src/lib/return-path.ts
  bd2d79641a9d0f27b8974e1779c0fc42c2012244d4f6911948aecaabf0136723  src/lib/return-path.test.ts
  657ea1ede4bdbe55d6913c4ffba915749a71fa0cdc5515811091c4fe0a49db72  src/routes/post.tsx
  d854bd81c5deb3b6668813426b2dfc69007ed97dce732bab8a9f01542f904758  src/routes/auth.tsx
  e8cad0a622aaa45843dda429f3aa80e17514b559665b17f40995ced921522404  src/routes/auth_.callback.tsx
  b7f9f7561b354e9dc040c211da4215389682f16399054e187d9120e7f3b73aff  src/features/posting/post-prefill.ts
  ebf898966e9a2e8e14ade087871ab29d0d048253d1194633a33def25d87b0abb  src/features/posting/post-prefill.test.ts
  f9bb20ce93c58e559e358a0af70a4ba984d5fc3129eced6b0a19cbab798ea2a7  src/features/posting/wizard.tsx
  442f1ab914793425ef4bac6e51271232b5dc1cf63b70e2c4d168753dc823e93c  src/features/posting/step-where.tsx
  796080d15a1d925f71096d17f37a79c3200488c166a536df12222299e879c7a0  src/features/feed/feed-page.ts
  81c0254cd0e7030db3dbf27711feb5c739cc697f4f71c68b50db0a7c5372adf0  src/features/feed/feed-page.test.ts
  0f15233a9090bc2b45df9c65561704cb0eeef968c198c17abf1666cbdff94b3e  src/components/marketplace/invite-card.tsx
  e7c3683b1e6c23114f28aeda39c6b2ff5a20c5a1d75307e06ed46c9f11de8280  src/components/marketplace/feed.tsx
  9ac8e4c260728764f47f0475c58938ada1ab0d7ad052854439201938f7fd220a  src/i18n/locales/en.ts
  d2adb2b0a918afed0a9481d2cf77279414615213e78d5347666a0ab1c8fc8d23  src/i18n/locales/am.ts
  c6fff4d7880a47c0f19d37516b24aed55497c35ee8827482bd51d6e5adbe43e4  e2e/feed-screens.spec.ts
  054a1e183b68c2899c17c1293dd205116151b345b8e8aad44486e5bf665653f8  e2e/post-wizard-category.spec.ts
  0798fd71aa11d0073cb19749683f4e21cf69ba622b4d7cf9ae31f7a2049605da  e2e/post-wizard-where.spec.ts
  21377342915014c39a0b7d72eb79cb1a2dc07760b28dc6a7aaa3b288b4d30002  docs/features/feed-engine.md
  c500f7b1ca8dcab0594d8bd84a848bf1a869174622c229dfc5db2c5bba00aaff  docs/features/posting.md
  c4ec00054274e7e9c008e646150022cd6bf6b63dd12839d7c8a38a6f5e5c60df  docs/_changelog.md
  ee51bae0e0d717f16abd8c1328ad4a06450ecb8e399b138c9e2c0123be91efc6  e2e/helpers/ui.ts
  44031097da3b6c11bcc221afc20b402393e6c3772ad6f41b89e86dd960c4557e  roadmap.md
  32f8b0059777bf0064d43af792905454a2e16278da091c64a9f5f581912e48ff  docs/generated/i18n-usage.json
  32f8b0059777bf0064d43af792905454a2e16278da091c64a9f5f581912e48ff  public/i18n-usage.json

WHAT THE CHANGES DO (read them in the files; the carrier's text is the authority)
- A. The address and the sign-in doors (Tier A):
  - src/routes/post.tsx gains `validateSearch` (postSearchOf: `category` and `place`, each kept only as a lowercase uuid) and redirects a signed-out visitor with `return: postReturnPath(search)`. Its PostNewScreen passes `prefill` to the wizard.
  - The five door calls navigate by `href` (INC-530).
  - safeReturnPath refuses control characters.
  - Tests: RP-1..RP-3 (src/lib/return-path.test.ts, new). RP-3 fails on the old rule: the supervisor ran it red first.
- B. The wizard (Tier B):
  - src/features/posting/post-prefill.ts (new) holds postSearchOf, postReturnPath and prefillCursor. Tests: PF-1..PF-3.
  - wizard.tsx takes `prefill` and opens step 1 at the category's level, once, on a new post with no category.
  - step-where.tsx takes `invitePlaceId`, reads that place's facts once, and puts it after the draft's own places and before the last post's.
- C. The listings pages (Tier B):
  - feed-page.ts: `INVITE_BELOW = 4` and `inviteShown` (FP-8).
  - src/components/marketplace/invite-card.tsx (new): InviteText, InvitePostButton, InviteCard.
  - feed.tsx draws the card at the end of the chosen place's row, or leading section 1 when the place has none, and inside the empty box (D1, D2).
  - The two keys are added to en.ts and am.ts.
- D. The browser tests:
  - FS-3 and FS-4 are extended or changed; FS-8, FS-9 and FS-10 are new (e2e/feed-screens.spec.ts);
  - PW-181 and PW-182 are new (e2e/post-wizard-category.spec.ts), after PW-14;
  - PW-180 is new (e2e/post-wizard-where.spec.ts), after PW-84.
  PW-14 still proves an off-site return is ignored. Each test uses scratch rows only and cleans up through its file's existing afterEach (J3).
- Docs: docs/features/feed-engine.md, docs/features/posting.md, docs/_changelog.md.
- How far the change reaches (G37): every test that signs in through the form, and every test that opens /post. Their behaviour is unchanged: `href` for "/" and "/post" gives the same location as `to`. CI on the final commit is the full proof.

THE CHECKS (run each one whole, as CI runs it, and paste the last line of each). The supervisor ran them on its own copy, which was installed from package.json because the lockfile resolves to the platform's cache (INC-420), so its versions are not lock-exact. Its results:
- `bun run typecheck` — clean;
- `bun run format:check` — "All matched files use Prettier code style!";
- `bun run lint` — 0 errors, 33 warnings (the same as at 7fc3a7a5);
- `bun run test:unit` — 592 tests in 90 files (585 in 88 before);
- `bun run i18n:map-guard` — the line in part 3;
- `bun run scripts/e2e-select.ts --self-test` — OK;
- `bun run build` — clean.
Report a difference; do not "fix" a carrier file to make a check pass. Report it instead.

THE BROWSER RUN (DEC-146, INC-506)
- Try once: `bun run e2e:local e2e/feed-screens.spec.ts e2e/post-wizard-category.spec.ts e2e/post-wizard-where.spec.ts`.
- If it does not start, write "local browser runs unavailable": CI on the final commit is the proof.
- Nothing runs against ethio-prod or the published site.

THE REPORT
- Done or not done, by part, in the first lines.
- The six ci-status lines.
- Part 0's results.
- The 25 sha256sum lines and the brief's.
- `git diff --name-only 7fc3a7a5` and `git ls-files --others --exclude-standard` together: exactly the 26 paths, plus src/routeTree.gen.ts if the platform touched it.
- The checks' last lines.
- The browser run's result.
- Anything this brief did not foresee.
Nothing is paraphrased, and nothing is "corrected" inside a carrier section. A section that cannot be written as given is reported and left unwritten.

REVERT: `git revert <commit>` (forward only). Never rewrite history.

THE OPERATOR'S STEPS AFTER THIS TURN (for the supervisor's ruling; nothing for you to do): send the executor nothing for about 25 minutes while CI runs; then Publish; then the walk.
```
