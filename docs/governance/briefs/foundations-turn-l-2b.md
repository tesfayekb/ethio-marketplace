````text
RULING — Foundations turn L-2, stop 1 answered: Part A re-laid and Part B on the base-first rule. Base: dev b4250ca0. Tier B. No migration. Lovable. Saved as docs/governance/briefs/foundations-turn-l-2b.md; roadmap line 3 names it. Everything in foundations-turn-l-2.md not changed here stands, the STRINGS block included.

VERIFIED (dev b4250ca0): step 0's sha256 064bedab… and the STRINGS sha256 d41a33d0… match. Part 0 landed: 0.1 (the area is removed, SHARED_SELECTS_ALL is in the self-test, format.ts prints ALL), 0.2 (the prior value is restored) and 0.3 (red on e65a78e7's code, "15 ሴፕቴ 2026"; green on the fix, 2 passed, 0 retries). Both stops were right to stop: each was caused by my ruling.

STEP 0: save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-2b.md, in one fenced block, and prove its sha256 equals the value after END. Roadmap line 3 names it.

CI FIRST:
- Read the run on b4250ca0, and fix any red first.
- Your stopped turn's second `bun run checks` did not finish (the stop came from the operator, on my word). Run it first, and paste its last line.

STOP A — answered: one shared module, and the layout is yours.
- A1 fixed the file layout from my reading, and each new shared chunk carries its own overhead. That was my error (G60: file lists belong to the plan). A1's layout is withdrawn.
- Your option (a) is approved:
  - collatorFor and formatCountryName live in ONE module of your choosing (for example src/lib/reader-locale.ts), taking their locale from formatLocale.
  - compareCodes joins that module if doing so saves a chunk. Otherwise it keeps its own file.
- Your option (b) is approved: location-data.ts :191 breaks display_order ties on nameEn with compareCodes, so name-collator stays off the shell.
- name-collator.ts joins the mechanism set as the fixed-order mechanism. Register row 16 lists it, it takes its locale from FIXED_ORDER_LOCALE, and it needs no allowlist line. Your departure is accepted in this form.
- Restore Part A from your report's appendix by script (`git apply`), then re-lay it. Remove from docs/tracking/intentional-deletions.txt every line whose file comes back in this turn: a file listed as deleted must not exist.
- Tolerance: Part A's first-paint growth, measured on your build, with the cause "the reader-order and country-name mechanism in one shared module, replacing inline copies".
  - Up to 0.4 KiB on any page: raise each affected ceiling to its next whole KiB with that cause.
  - More than 0.4 KiB is a STOP with the per-chunk table.

STOP B — answered: your option (2).
- The head follows the rule the page body already follows. INC-872 (src/i18n/server-shell-language.ts) has the server render the base catalogue for every visitor, and the first byte declares the base language. The reader's catalogue (D3) is applied in the browser.
- B4's laws (a) and (b) were written without reading that file. They are replaced by:
  (a) The server's head is in the base language, the same as the body and `<html lang>` on the first byte. PGH-E1 reads the raw HTML of `/`, a J1 scratch ad and an admin page (admin pool lease, J9) and finds each page's base title.
  (b) Once the reader's catalogue is applied, the one client effect owned by page-head.ts sets the title, description, og:title and og:description in the applied language. PGH-E1 continues with the am star cookie on the same three pages: after hydration and the catalogue's application, document.title is the Amharic text and `<html lang>` is "am". After a client-side navigation to a second page, its title is Amharic too, with no flip back to the base language.
  (c) Unchanged: a pick re-titles with the URL unchanged, and no request goes to a route's server function (PGH-E2).
- B5 stands: the base keys are the client's re-title text, so they belong to the catalogue by right.
- Add a roadmap line: "Later — a page in the reader's language for crawlers (the language in the URL, with hreflang per language); the head stays base-first until then."
- Part B is now built as ruled in foundations-turn-l-2.md B1–B3 and B5–B7, with B4 as above.

HOW TO WORK (unchanged):
- CI FIRST; K1–K6.
- `bun run checks` before every push, with its last line pasted. NEAR lines are raised in the same turn with their cause.
- Each touched spec file is run whole, both projects, 0 retries.
- Run the i18n maps.
- If the platform's time limit nears, stop at a clean point with Part A landed green, then report the three lines.

Push, and END THE TURN with the report:
- the CI line;
- step 0's sha256;
- STOP A's measurement (per-chunk table and per-page growth);
- A1–A5 and B1–B7, each done or not;
- the route table (before and after English);
- the 44 keys as committed (en and am read back from the files);
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only 5d61def7.
````
