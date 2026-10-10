# Bundle 10 follow-up — turn 7: the listings pages' headings, "in" and "near" (D125); the invite card without "too": brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 10 FOLLOW-UP — TURN 7 (2026-10-10). ONE TURN. No migration, no database change, no package change.
Strings: one new key and two renamed keys (English and Amharic).
Base: dev 7f87fd30. This file is public: it is written as build instructions. Tier B.

ANSWERS TO TURN 6
- Verified by diff of d099ccc1..7f87fd30: exactly the 13 paths, each byte-identical to the supervisor's copy.
- CI on 7f87fd30 (run 38020947805) is GREEN and promoted: main = dev.

THE OPERATOR'S WALK AND RULINGS (2026-10-10), built in this turn
- No "too" on the invite card. When the place has some listings, the card reads:
  - feed.invite.placeMore — en "Advertise in {place}." · am "በ{place} ውስጥ ማስታወቂያ ይለጥፉ።"
  - feed.invite.placeCategoryMore — en "Advertise {category} in {place}." · am "በ{place} ውስጥ እና በ{category} ምድብ ስር ማስታወቂያ ይለጥፉ።"
  These two keys replace feed.invite.placeToo and feed.invite.placeCategoryToo, which are removed.
  The Amharic is the operator-approved text without «እርስዎም».
- The headings (D125; INC-534 — "Listings near Ethiopia" stood over listings inside Ethiopia):
  - The page title over the chosen place's own listings: feed.headingIn (new) — en "Listings in {location}" · am "በ{location} ውስጥ ያሉ ማስታወቂያዎች".
  - Every wider place lies inside the chosen place's own country, so all of them share ONE heading.
    It is feed.heading, naming the CHOSEN place ("Listings near Afar"). It is drawn once, on the first wider section; the sections after it carry none.
  - Everywhere beyond the country keeps nav.allListings ("All listings").
  - With no place chosen, the title stays "Listings near you".
  Code: feed-page.ts (the label kind "near"; feedSections names it once) and feed.tsx.
  Tests: FS-3, FS-4 and FS-11 (the new words), FS-13 (new: a city, another city of its region, another region — one heading), FP-5, FP-10 (new).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-10-d119-turn-7.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK — the same as turn 1's brief (docs/governance/briefs/bundle-10-d119.md, HOW TO WORK). In order:
- the CI read (paste the six lines; expect 7f87fd3 SUCCESS);
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-10-d119-turn-7.md`.
- (b) `sed -n '252,264p' src/i18n/locales/en.ts | sha256sum` → 4f3692507edee0c7bc33fca6906c10148b9dbbfbfcde867d113174ead08f683e
- (c) `sed -n '246,258p' src/i18n/locales/am.ts | sha256sum` → 8fb7b8bc1d5be7521c1b50097436fce4bdda0575ae59de49e392628c3bd1a2a0

THE CARRIER — D125-TURN7-CARRIER-2026-10-10.md (85,089 bytes; sha256 0c839274066742740cb271136d6ccc2d904ebdf8997b243e8286db72fa092971; 10 sections)
- Its first line starts "D125 TURN 7 CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE (the whole file);
  - REPLACE-LINES <a>-<b> (NEW in this turn): replace lines a through b of the file — both included, counted from 1 — with the section's lines. The section ends with a newline; that newline ends its last line and adds no empty line.
  - APPEND.
- Check the carrier's sha256 first.
- Write every section by script.
- The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`. It rewrites docs/generated/i18n-usage.json and public/i18n-usage.json, then exits 1. Run it again: it must print "usage maps match the tree."

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  0f4fafa1103c66640f37f4a42aeb0ead0f815348b786af3da92b9d3c4bc286d7  src/features/feed/feed-page.ts
  5d511a284b1807c142073e49d07336094f61275c9f1f20584c4a291c2be89a76  src/features/feed/feed-page.test.ts
  67f568dc7791ef5e85fa0d22a039ee34d85af0f810c336503b042d350e56c737  src/components/marketplace/feed.tsx
  da293b9d4e3e157b5ad035699d07b3d17faec9770fa3257861468f414dc1689a  src/components/marketplace/invite-card.tsx
  4dd29edf33219fd2b0c22650bb7459ccb8b561066943da7d7348d5d774468d55  src/i18n/locales/en.ts
  223ba4e0d9e5e882c49eb25fc3029f73a433a84ea5829926f049c6da047e3706  src/i18n/locales/am.ts
  333258ecbe3fb4f073b635946ef5e35d345b73dfcb6470f88591089cf4fd12ec  e2e/feed-screens.spec.ts
  7ddef4a9582d8a2c52228643abe4b05ab9c199d3e18dcf3796dbf626e268e577  docs/features/feed-engine.md
  9ec00c077f192f1dfecccf0a8191b7e509c95d4db673bcab7953ccd4db10adc6  roadmap.md
  0f9176c302d83fce164896718704d79b98423ae82bbe99f9ad49849503d2c632  docs/_changelog.md
  e8339e203d8f0ee869cccba52bd20e0fc323ce607b11da22d7f4cbe32210e807  docs/generated/i18n-usage.json
  e8339e203d8f0ee869cccba52bd20e0fc323ce607b11da22d7f4cbe32210e807  public/i18n-usage.json

THE CHECKS — the same seven as turn 1. The supervisor's results on its own copy (not lock-exact, INC-420):
- typecheck clean;
- format:check clean;
- lint 0 errors / 33 warnings;
- test:unit 595 passed;
- i18n:map-guard as above;
- e2e-select self-test OK;
- build clean.
In the report, list the three Amharic values key by key with their English (G43).

THE BROWSER RUN — try once: `bun run e2e:local e2e/feed-screens.spec.ts`. If it does not start, write "local browser runs unavailable".

THE REPORT
- Done or not done, by part.
- The six ci-status lines.
- The census.
- The 12 sha256sum lines and the brief's.
- `git diff --name-only 7f87fd30` plus `git ls-files --others --exclude-standard`: exactly 13 paths. If the platform committed mid-turn, give `git diff --name-only 7f87fd30 HEAD` too.
- The checks.
- The browser run.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then look at the headings ("Listings in <your place>", one "Listings near <your place>") and the card's words.
```
