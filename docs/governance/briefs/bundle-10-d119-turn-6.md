# Bundle 10 follow-up — turn 6: the invite card the size of a card; "Be the first" only where nobody has advertised: brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 6 (2026-10-10). ONE TURN. No migration, no database change, no package change. Two new strings (English and Amharic).
Base: dev d099ccc1. This file is public: it is written as build instructions. Tier B.

ANSWERS TO TURN 5
- Verified by diff of 25221580..d099ccc1: exactly the 14 paths, each byte-identical to the supervisor's copy.
- 25221580's run was cancelled by your push, so the run on d099ccc1 judges turns 4 and 5 together. It is read at the start of this turn.

THE OPERATOR'S WALK AND RULINGS (2026-10-10), built in this turn
- The invitation is one card among the others:
  - the same size as a listing card, never a wider one (it took a whole row on a phone);
  - below 11rem it is compact, as the listing card is: smaller star, type and padding, and a button whose words may wrap.
  - Its test id stays on its outer box. FS-12 now expects the size of a card.
- "Be the first" only where nobody has advertised yet. When the place has some listings, the card reads:
  - feed.invite.placeToo — en "Advertise in {place} too." · am "እርስዎም በ{place} ውስጥ ማስታወቂያ ይለጥፉ።"
  - feed.invite.placeCategoryToo — en "Advertise {category} in {place} too." · am "እርስዎም በ{place} ውስጥ እና በ{category} ምድብ ስር ማስታወቂያ ይለጥፉ።"
  The operator checks this Amharic. The new `placeCount` (feed-page.ts) decides which sentence shows.
  Tests: FS-3 and FS-8 (two listings: the "too" words), FS-4 and FS-10 (none: "Be the first"), FP-9.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-6.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (paste the six lines; a red there is reported, not fixed);
- step 0;
- the census;
- the carrier;
- the usage maps;
- the hashes;
- the checks;
- the browser run;
- the report;
- END THE TURN.
Do not stop between parts. Do not use a patch tool. No database change.

CENSUS (paste each result; any difference → STOP and report)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-6.md`.
- (b) `sed -n 262p src/i18n/locales/en.ts` → `  "feed.invite.placeCategory": "Be the first to advertise {category} in {place}.",`
- (c) `sed -n 256p src/i18n/locales/am.ts` → the line holding "feed.invite.placeCategory".
- (d) `grep -c 'col-span-3 sm:col-span-1' src/components/marketplace/feed.tsx` → 2.

THE CARRIER — D119-TURN6-CARRIER-2026-10-10.md (79,175 bytes; sha256 1d986bfef4af9fff97287d73e09f59c947e2c9a693405cbee864c640b1632790; 10 sections)
- Modes:
  - REPLACE (the whole file);
  - INSERT-AFTER-LINE <n> (insert the section's lines directly after line n);
  - APPEND.
- Check the carrier's sha256 first.
- Write every section by script.
- The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json, then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  08d1f870e234ca1b00c0413d5e114dce50c8f5db7095e698f8d30faf59025b20  src/features/feed/feed-page.ts
  30fc99937d04e43fa9347e2aaad7e58713293fd3bd657d56e0fd40535a3c4324  src/features/feed/feed-page.test.ts
  71871696997dde6663aeedf820ad6f79bd97ae995f98ce9bd8b2ad1faa9801ed  src/components/marketplace/invite-card.tsx
  40bf5c1b45ca2c9928a6a6ed4716ea58dd41bc27d2db0a3be9ab3d303cd65fc0  src/components/marketplace/feed.tsx
  2fdd770f21bd5537f7fc5b05ac319c5e543720d0967cf02e8c3d1455e5b097fe  src/i18n/locales/en.ts
  03ec65610316dc5235ae38dae67518e02375d0a45564accab155bfe7ff61d53d  src/i18n/locales/am.ts
  9f889ec3a0ec0a2efba911ea7dc51fe9a61f3dcba2183fa9a71ae69b1845818c  e2e/feed-screens.spec.ts
  e3b1832467de8953c594b953320cad22b026ce9fa3bc71a2c8f65c6d96867ac2  docs/features/feed-engine.md
  5949a7411dc809e6ca24f8eefd023b0a4652d15c5c774e39e6e3c6ca83473892  roadmap.md
  b934dc726dfda16dc1ad1660389c2f2b213a390a6fc72076c645b35770b019dc  docs/_changelog.md
  ef455817ec2c500c40f4bcc62b76f6c9f068dbeeb483325963b7231ecd1fc570  docs/generated/i18n-usage.json
  ef455817ec2c500c40f4bcc62b76f6c9f068dbeeb483325963b7231ecd1fc570  public/i18n-usage.json

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 594 passed;
- i18n:map-guard as above;
- e2e-select self-test OK;
- build clean.
In the report, list the two new Amharic values key by key with their English (G43).

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census.
- The 12 sha256sum lines and the brief's.
- `git diff --name-only d099ccc1` plus `git ls-files --others --exclude-standard`: exactly 13 paths. If the platform committed mid-turn, give `git diff --name-only d099ccc1 HEAD` too.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then look at the invite card on a phone (the size of a card; "too" where the place has ads).
```
