# Bundle 19 — turn 3: the ad's address helper (D201 §2): brief, version 1 (saved unchanged, 2026-10-17)

```text
BUNDLE 19 — TURN 3 (2026-10-17). THE AD'S ADDRESS HELPER (D201 §2) — a short turn placed before the M1 migration so that no turn is idle while M1's proofs are written: the pure module that builds and reads the address `/l/<words>-<public_id>` (the words from the title, the 60-character cut, the short form `/l/<id>`, the parse that finds the id at the end), its unit tests, the QR module taking the id rule from it, and the docs. M1 becomes turn 4 and every later turn moves by one (the roadmap lines below). No migration. No new string (no UI). No new dependency. No change to any existing test. Base: dev a82fa205 (bundle 19 turn 2; CI run 971 on it may still be queued or running — note what ci-status.md says and go on). Tier B (pure code; no identity, no database).

STEP 0 — save this file (the attached bundle-19-turn-3.md, title line and fence included) byte for byte as docs/governance/briefs/bundle-19-turn-3.md and paste its sha256sum; set roadmap.md line 3 to begin "The brief in force: docs/governance/briefs/bundle-19-turn-3.md (bundle 19 — turn 3: the ad's address helper of D201 §2 — `/l/<words>-<id>` built and parsed, with its unit tests; no migration, no new string). Next: turn 4 — M1 (public_id, public_listing, the counters, the listing_read dial), then the page's turns per the bundle-19 block below;" keeping the rest of the line from "D199 (discount / sale)" on; and in roadmap.md replace the ten lines 331–340 (`  - [ ] Turn 3 (docs/governance/briefs/bundle-19-turn-3.md) — M1: …` through `  - [ ] Turn 12 (…) — similar ads, seller link, safety box, sold page and sharing`) with these eleven lines, exactly:
  - [ ] Turn 3 (docs/governance/briefs/bundle-19-turn-3.md; no migration; no new string) — the address helper: `/l/<words>-<id>` built and parsed (src/features/ad-page/address.ts, LA-1…LA-6); placed before M1 so the executor works while M1's proofs are written
  - [ ] Turn 4 (docs/governance/briefs/bundle-19-turn-4.md) — M1: public_id, public_listing, listing counters and listing_read
  - [ ] Turn 5 (docs/governance/briefs/bundle-19-turn-5.md) — the buyer page, address, breadcrumbs and linked feed cards
  - [ ] Turn 6 (docs/governance/briefs/bundle-19-turn-6.md) — three actors, buyer previews and owner counters
  - [ ] Turn 7 (docs/governance/briefs/bundle-19-turn-7.md) — M2: fact_rank and the key-facts strip
  - [ ] Turn 8 (docs/governance/briefs/bundle-19-turn-8.md) — the contact block and sign-in return
  - [ ] Turn 9 (docs/governance/briefs/bundle-19-turn-9.md) — M5: reveal rules
  - [ ] Turn 10 (docs/governance/briefs/bundle-19-turn-10.md) — M3: Save and Account › Saved
  - [ ] Turn 11 (docs/governance/briefs/bundle-19-turn-11.md) — M4: Report and the admin count
  - [ ] Turn 12 (docs/governance/briefs/bundle-19-turn-12.md) — Share, counters, og/JSON-LD and photo redirect
  - [ ] Turn 13 (docs/governance/briefs/bundle-19-turn-13.md) — similar ads, seller link, safety box, sold page and sharing
(Lines 329 and 330 — turns 1 and 2 — stay as they are; the line numbers refer to a82fa205.)

HOW TO WORK: read CI at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md (first six lines pasted; a red is fixed first — the supervisor rules on it; you cannot git-fetch that branch), `git rev-parse HEAD` = <START>; do not stop between parts; the local browser does not start (INC-506) — say so once; CI runs the one spec the selector names; unit tests run whole (`bun run test:unit`); a shared helper never changes its default (G37) — this turn adds one and changes none; no assertion loosened (G38); no scratch rows (G27) — this turn touches no database; the package rule: no package change of any kind (G42); the two attached files are saved byte for byte (their sha256 below) — never retyped, never reformatted by hand (they are already in Prettier style); add no line to AGENTS.md (INC-677); the file list of the report comes from `git diff --name-only <START>`; one report at the end, then END THE TURN.

PART A — THE MODULE (two attached files; save, then check). A1. Save the attached `address.ts` as `src/features/ad-page/address.ts` (3,822 bytes; sha256 d54bc78e705224207337f2f0b155d5f6dd863358d699b05053ab6464c7964d6b) and the attached `address.test.ts` as `src/features/ad-page/address.test.ts` (4,207 bytes; sha256 7e019af6b6e7f2e72300f77b646f1fa5774d3bab63f2bcd1cef6e72a87b42b7f); paste `sha256sum` of both — a mismatch is a STOP (report it; change nothing else). What the module is, so you can read it with its purpose in mind: `PUBLIC_ID_ALPHABET`, `PUBLIC_ID_LENGTH`, `PUBLIC_ID_RE`, `isPublicId` (the rule turn 1 put in src/server/qr.ts, moved here because the feed card, the share sheet and the route all need it and this file must stay client-safe — no import, no database, no browser API); `ADDRESS_WORDS_MAX` = 60; `addressWords(title)` — NFKD with the combining marks removed (é → e; the app's slug derivation of deriveSlugPreview / deriveLocationSlug plus the NFKD of location-data.ts's slugifyName), lower case, every run of characters other than a–z 0–9 becomes one `-`, no `-` at either end, cut at 60 on a `-` boundary (a single word longer than 60 is cut at 60); `canonicalSegment(title, id)` → `<words>-<id>` or `<id>` when the words are empty (an Amharic title); `listingPath` → `/l/` + that; `shortListingPath(id)` → `/l/<id>` (what the QR carries); `listingUrl(origin, title, id)` (a trailing `/` on the origin is dropped); `parseAddressSegment(segment)` → `{ publicId, words }` — the whole segment when it is exactly an id, else the characters after the LAST `-` must be an id and the rest is the words part — or `null` for anything else (the route's 404; a wrong-words segment parses and the route answers a 301 to the canonical, in turn 5). The tests LA-1…LA-6 cover the alphabet, the fold, the cut, the paths, the parse and the round trip; their expected values were run against this exact file. The `src/features/ad-page/**` glob of the `ad-page` test area (scripts/e2e-select.ts :218) already covers the new path. A2. Replace `src/server/qr.ts` whole with exactly this text (17 lines; the id rule now comes from the module and is re-exported, so src/routes/l.$id.qr[.]svg.ts and QR-1 keep their import unchanged):
import qrcode from "qrcode-generator";

import { isPublicId } from "@/features/ad-page/address";

/**
 * D201 §2 / DEC-187 — server-only QR encoding; this module reads no database.
 * The public id's shape lives in src/features/ad-page/address.ts (client-safe);
 * it is re-exported here so the route and QR-1 keep one import.
 */
export { isPublicId };

export function qrSvg(text: string): string {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
}
(The file ends with a newline after the closing brace. Do not change the route file or qr.test.ts.)

PART B — DOCS. B1. docs/features/ad-page.md: in "## The address", change the sentence "The public id is ten characters of `23456789abcdefghjkmnpqrstuvwxyz`, generated by the database at insert; this lands with M1 in turn 3." to end "…; this lands with M1 in turn 4." (one word), and append after that section's last paragraph (the one beginning "`/l/<id>/qr.svg` lands this turn") a new section, exactly:

## The address helper (turn 3)

`src/features/ad-page/address.ts` is the one place the address is built and read, pure and client-safe (no import, no database, no browser API): `isPublicId` and the alphabet (moved from `src/server/qr.ts`, which re-exports it); `addressWords(title)` — NFKD with the combining marks removed, lower case, runs of characters other than a–z 0–9 become one `-`, no `-` at either end, at most 60 characters cut on a `-` boundary; `canonicalSegment` / `listingPath` → `/l/<words>-<id>`, or `/l/<id>` when the words are empty (an Amharic title); `shortListingPath` → `/l/<id>`; `listingUrl(origin, …)`; `parseAddressSegment(segment)` → the id at the end of the segment and the words before it, or `null`. The route (turn 5) parses, reads by the id, and answers a 301 to the canonical when the words differ.

Then in "## Tests" add the line `- LA-1…LA-6: `src/features/ad-page/address.test.ts` — the alphabet, the fold, the 60-character cut, the paths, the parse and the round trip.` before the QR line. B2. docs/_changelog.md APPEND one line: "- 2026-10-17 — Bundle 19 turn 3 (no migration; no new string; D201 §2): the ad's address helper `src/features/ad-page/address.ts` — `/l/<words>-<id>` built from the title's ASCII fold (60 characters, cut on a word) and parsed by the id at its end; the short form `/l/<id>`; `isPublicId` moved there and re-exported by `src/server/qr.ts`; LA-1…LA-6; placed before M1 (now turn 4) so the executor works while M1's proofs are written."

THE CHECKS (whole; paste the last line): `bun run format:check` clean; `bun run lint` 0 errors / 33 warnings; `bun run test:unit` — 942 passed (163 files); `bun run i18n:map-guard` — the new module raises the scanned-file count (456 → 457; no key change), so the FIRST run rewrites docs/generated/i18n-usage.json and public/i18n-usage.json and exits 1; run it again: "usage maps match the tree" (the two regenerated files are in scope, as in turn 1); `bash scripts/check-hardcoded-strings.sh` "findings: 0"; `bun run scripts/e2e-select.ts --self-test` OK; `node scripts/check-marketplace-imports.mjs` "findings: 0"; `bun run scripts/e2e-select.ts --base a82fa205` prints `e2e/ad-page-routes.spec.ts` alone (the browser does not start here — INC-506 — so CI runs it on this commit). The typecheck is CI's "Build, typecheck, lint" job (the supervisor ran tsc on these files: clean).
SCOPE — these files only: the brief, roadmap.md (line 3 and the eleven turn lines), src/features/ad-page/address.ts (NEW), src/features/ad-page/address.test.ts (NEW), src/server/qr.ts, docs/features/ad-page.md, docs/_changelog.md, docs/generated/i18n-usage.json and public/i18n-usage.json (regenerated by the map guard; the `scanned` line only). Name any other file in the report's first lines with its reason. Delete no file. No patch tool. No database change. No package change. No AGENTS.md change.
THE REPORT: done or not done by part; the six ci-status lines and <START>; the two sha256 lines; `git diff <START> -- src/ docs/ roadmap.md` whole and `git ls-files src/features/ad-page/address.ts src/features/ad-page/address.test.ts` (G20); `git diff --name-only <START>`; the checks; anything not foreseen. Then END THE TURN.
REVERT: `git revert <commit>` (forward only).
```
