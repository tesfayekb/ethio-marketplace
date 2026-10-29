# Foundations turn L-1 — ruling (saved exactly; sha256 bc1fde080afabda57c71da5e9681ac1ef7491737dd84e1b5de20e82e1d095bce)

````text
RULING — Foundations turn L-1: BUILD Part A (INC-999's evidence) and Part B (dates, times and numbers, INC-985; INC-954's app copies) of your plan. Base: dev e65a78e7. Tier B. No migration, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-l-1.md.

Your plan is approved with the rulings below. To save a turn, your sizing's L-1, L-2 and L-3 land together, mechanism and guard first: the guard's allowlist ends this turn holding only the named exceptions, never a consumer left to move. Part C (page heads) is turn L-2, which starts with its own census of routes and keys. Part D (messages with values) is turn L-5, as you sized it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-l-1.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.
- Add the roadmap lines L-2 (page heads, INC-990) and L-5 (messages with values: 226 `.replace("{` sites), both open.
- The plan file .lovable/plan.md stays as the platform left it (as in K5).

CI FIRST: the newest completed run, e65a78e7, is SUCCESS. If a newer completed run is red, fix it first.

PART A — INC-999's EVIDENCE
A1. As planned: the excerpt moves out of the inline Python at .github/workflows/local-backend-proof.yml :825 (and the ERROR/FATAL filter at :828) into one script with one function, called from both places.
  - Keep, in order: the last migration line; the Cause block, every ERROR, FATAL, PANIC, SQLSTATE, DETAIL, HINT, CONTEXT, LINE n and QUERY line, whole, never cut by the tail; the statement echo cut to its first 10 and last 10 lines with "N lines omitted"; the last 20 lines.
  - Redaction runs first, unchanged.
  - Python or TypeScript is your choice. Its tests run in the unit suite (CI's component-tests job), and wired.test.ts names their caller.
A2. Test ids: SFE- is taken (scripts/ci/step-failures.test.ts, INC-992). Use SXC-1…4 (grep-checked free at e65a78e7) for your SFE-1…4.
  - The fixture is captured from the pinned CLI if a local backend starts in your sandbox. Otherwise it is built from the CLI's own error-printing source at the pinned version, cited file:line and marked "shape from source" in its header.
  - SXC-4, the class guard, refuses an inline `splitlines()[-N:]` or `tail -n` excerpt of a failure log in .github/workflows/*.yml that does not go through the excerpt script or the lane-step excerpt (INC-992). It is proven on a planted workflow line. The existing lane-failure-evidence test (LFE-1/2) stays green.
A3. LEFT for the operator: once this evidence exists, read N1b-1 M3's proof failure on its next occurrence; its fix is a migration-file change.

PART B — ONE FORMATTER PER INTENT (register row 16)
B1. src/lib/locale.ts and src/lib/format.ts as planned: your intent table is approved. In Amharic a month is always long, and `dateStyle` "medium" or "short" is never used for am.
  - There is one cached instance per (intent, resolved locale).
  - An unknown language formats in English through formatLocale, which reads its tags from locale.ts.
  - relative-time.ts and posted.ts become callers of formatRelative or are retired; a deleted file is named in docs/tracking/intentional-deletions.txt in the same range (INC-076).
B2. Every consumer in your verdict list moves to its named intent in this turn. Where an English string changes (for example dateStyle "medium" for an old explicit format), name it in the report with before and after, and the tests that pin it.
  - A pinned English value that changes is updated in its test with that reason, never loosened (G38).
  - Amharic values in tests change to the full month.
B3. Exceptions, each an allowlist line `key | reason | until`:
  - the AI service's three en-US USD formatters (register row 16; until: never — reviewed);
  - the UI kit's calendar and chart (row 16), with your K2 on chart.tsx :225's bare toLocaleString recorded as its reason;
  - format-locale.ts's supportedLocalesOf;
  - the e2e oracles, ad-page.spec.ts :1325 and legal-pages.spec.ts :204. RULED: accepted, because a test computes its expected value independently of the code under test (reason "independent oracle").
  The Ethiopian-calendar line is NOT added while nothing uses it. A line for a site that does not exist is stale, and the guard fails it (G55).
B4. The guard is CF-FMT-1 (AST-based, as planned, free at e65a78e7), proven on a planted bypass and wired.
  - It also refuses the country-code shape `/^[A-Z]{2}$/` outside locale.ts.
  - The four app copies of INC-954 (legal-kinds.ts :101, legal-service.ts :107, calling-codes.ts :131, pricing-data.ts :277) move to isCountryCode.
  - pricing-data.ts's currency shape `/^[A-Z]{3}$/` moves to locale.ts as the currency-code shape in the same turn: it is the same concern (a code's shape checked in one place), and leaving it would make a second local copy.
B5. Test ids: LOC- is taken (src/routes/api/locations.test.ts). Use LCL-1…3 for your LOC-1…3. FMT-1…8, CF-FMT-1 and LF-E1 are free.
  - FMT-3 asserts "ኦክቶበር" and the absence of "ኦክቶ " for an October date in am.
  - LF-E1 (e2e/locale-format.spec.ts) runs whole on both projects with 0 retries: an Amharic account sees a full Amharic month on My listings.
B6. Register row 16: format.ts and locale.ts with CF-FMT-1 as its guard, and the exceptions as allowlist lines. docs/features/i18n-runtime.md gains a section on the formatter intents.

NOT IN THIS TURN: Part C (page heads; L-2 starts with its census), Part D (L-5), and anything that needs a migration (the 23 SQL functions' language literals, INC-954's database copies, INC-999's proof fix).

FIVE LENSES (from the request, unchanged): one cached formatter per intent and language; no page grows beyond G60's tolerance without its cause; an unknown language formats in English; no literal language or locale tag outside locale.ts (K4).

HOW TO WORK: CI FIRST; K1–K6; `bun run checks` before every push, with its last line pasted; the NEAR band raised in the same turn with its cause; each touched spec file run whole, both projects, 0 retries; the i18n maps. Push, and END THE TURN with the report:
- the CI line;
- the step 0 sha256;
- A1–A3 and B1–B6, each done or not;
- the English strings that changed;
- the unit count;
- the checks' last line;
- K2;
- the files from git diff --name-only e65a78e7.
````
