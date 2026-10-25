# Foundations — turn 28: speed S5 — the feed's first page arrives with the page (D234): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 28 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at 7460ca061c8243bf29f56ac0a632899ef7b7afb7). Tier B (the listings pages' first read; the shell's first-place derivation; four public routes' handlers exported; one new server function with no input). No migration. No new string. No package change. AGENTS.md: its speed line names readFirstFeedPage (D4). Base: dev 7460ca061c8243bf29f56ac0a632899ef7b7afb7 (Foundations turn 27's final commit; its CI run: A1). Before sending, every new line was read against every line of AGENTS.md and against the platform rules you quoted on 25 Oct: no new control; no map read by an outside key; no silent catch (every failure is one [first-screen] line and the browser's own read); no non-null assertion (`!`) — the tests pass `baseURL` as Playwright takes it, as e2e/shell.spec.ts already does; the server function is `createServerFn().validator(NoInputSchema)`; the server asks the routes through their own `defineRoute` handlers; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — one derivation of the first place; C — the first page read by the server and handed over; D — the browser tests; E — docs, register, roadmap, changelog, AGENTS.md.
BASE: 7460ca061c8243bf29f56ac0a632899ef7b7afb7
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/components/shell/location-data.ts
src/components/shell/location-data.test.ts
src/components/app-shell.tsx
src/features/categories/category-tree.ts
src/features/categories/category-tree.test.ts
src/features/feed/feed-page.ts
src/features/feed/feed-page.test.ts
src/features/feed/use-feed.ts
src/features/feed/use-feed.test.ts
src/components/marketplace/feed.tsx
src/server/first-screen.ts
src/server/first-screen.test.ts
src/routes/__root.tsx
src/routes/api/feed.ts
src/routes/api/locations.ts
src/routes/api/locations.$country.ts
src/routes/api/categories.tree.ts
e2e/ad-page.spec.ts
e2e/shell.spec.ts
e2e/feed-screens.spec.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: the listings pages' first screen arrives with the page: the server answers the feed's first page inside the page stream, the browser's first read of that very address takes it, and the first cards' photos are asked for as the page streams — never after the code, the markets, the market's tree and the feed have each taken a round trip.
MECHANISM: NONE YET — built here as one chain: NEW src/server/first-screen.ts `readFirstFeedPage(request, areaCookie)` — on "/" and "/c/<slug>" only, it reads the request's facts (the saved-area cookie, the edge's guess, the address), asks the open markets, the market's tree and (for a category page) the category tree through their routes' own GET handlers in-process with no session, derives the first place with the shell's own functions, asks the feed route for that place's first page, and names the first cards' cover links; any refusal, failure or the 2-second deadline answers null. The root loader's server branch starts it unawaited through `getFirstFeedPage` (`createServerFn({ method: "GET" }).validator(NoInputSchema)`), so the page's shell is sent at once and the page streams in behind it (the supervisor's local node build: a deferred loader promise under Suspense flushes the shell at once for a browser and streams the boundary; a bot gets the whole page). The feed (feed.tsx) hands it to `useFeed` (`firstPage`), whose first read takes it when its address is that read's own (`feedPath`), once per page load (a WeakSet), and preloads the first covers with react-dom's `preload(…, { as: "image", fetchPriority: "high" })` under Suspense/Await. ONE DERIVATION for the shell and the server (location-data.ts): `initialCountries` (the market: the saved one, else the guessed open one unless every area was chosen) and `deriveInitialArea` (the saved place, else the guess, else the anchor — the auto-select law applied at once); ONE ADDRESS: `feedRouteOf` (category-tree.ts — the listings page and its slug; it sits where the shell already loads, so no feed code reaches every page's first download) and `feedPath` (feed-page.ts — the feed read's address); ONE PARSER per read: `parseMarkets`, `parseTree` (location-data.ts), `parseCategoryTree` (category-tree.ts), `parseFeedPage`.
CONSUMERS (at BASE): the shell's first-place effect and its market choice (src/components/app-shell.tsx :186-:193 and :265-:328 — move onto initialCountries and deriveInitialArea, B2); the shell's reading of the listings address (app-shell.tsx :550 and :556-:558 — onto feedRouteOf, B2); the feed's first read and its address (src/features/feed/use-feed.ts readPage — onto feedPath and firstRead, C3); the readers' parsing (location-data.ts fetchMarkets and fetchTree; category-tree.ts readCategoryTree — onto their exported parsers, B1, B3); the four routes' handlers (src/routes/api/locations.ts, locations.$country.ts, categories.tree.ts, feed.ts — exported as openMarketsGet, countryTreeGet, categoryTreeGet, feedGet, C1). Tests that prove the browser's own first read keep that read with the E2E-only cookie `e2e_first_screen=off` (the server skips the first page only in the E2E build — `isE2E` — and only for that cookie; a cookie, not a header, so no cross-origin read carries it): the spinner test (e2e/shell.spec.ts), FS-6 (e2e/feed-screens.spec.ts), AP-49 (e2e/ad-page.spec.ts) — D1.
COVERED HERE: every consumer above. LEFT: the cards drawn by the server itself (the next speed turn: the shell's first state from the same streamed page), and the account's place carried after sign-in, which can still change the place after the first page (the browser then reads the new place, as today).
CONFORMANCE GUARD: src/components/shell/location-data.test.ts DIA-6 runs the shell's former steps (its effect, then its auto-select walk) against deriveInitialArea over every combination of tree, saved area, guessed market and guess, and requires the same place — the refactor changes no place; DIA-1…5 pin the cases. src/server/first-screen.test.ts FSP-1…6 (the place, the category, the guess, the other pages and the E2E switch, a failed read, the deadline). src/features/feed/use-feed.test.ts UFS-1…4 (taken for the very address only, once; Retry reads). feed-page.test.ts FP-15 (the address) and category-tree.test.ts FRO-1 (the listings page). e2e/ad-page.spec.ts AP-53 the browser proof: a category page draws its cards with no browser feed read, and its first covers are high-priority image preloads at the links the cards draw.
EXCEPTIONS: the E2E-only switch above (isE2E, cookie e2e_first_screen=off; three named tests), with its reason: they prove the browser's own read, which still serves every later page, a retry and every client navigation.
FIVE LENSES — security: the server asks only the four public, anonymous routes, in-process through their own handlers (shape checks, envelopes and caches unchanged), forwarding no cookie, header or session; the area cookie passes AREA_SHAPE and parseAreaCookie / parseEverywhere first; the new server function takes no input and answers only what the public routes already answer; the switch exists only in the E2E build · performance: on the lab's phone the first cards waited for the code, then the markets and the market's tree, then the feed, then their photos (the baseline's warm home page: the first card photo at 6.5 s); now the server reads the page while the code downloads and the covers are asked for as the page streams (ESTIMATE: the first card photo about 2 s sooner on the lab's phone; measured after Publish by the lab); the shell is not held for it (streamed); the first page's answer travels inside the page instead of as a separate read; the entry 287.5 → 287.9 KiB, "/" and "/c/$slug" 300.9 → 301.5 KiB (the supervisor's build), under every ceiling · failure modes: a refusal, a failure, an unknown category or the deadline → null, one [first-screen] line, the browser's read as before; a place that differs from the browser's (a newer pick, the account's place after sign-in) → a different address → the browser reads; a second mount, a Retry or a new place → a fresh read · consistency: one derivation, one address builder and one parser per read for the shell and the server (DIA-6) · future growth: the next speed turn draws the cards on the server from this same page; the roadmap's star-language server render uses the same root loader.
FORWARD-SCAN: the cards drawn in the server's HTML (S6 — the shell's first state from the streamed page); "SSR renders the star language" (roadmap, study first); the publication gate's list read once per page load. REGISTER: docs/governance/mechanisms.md — row 46 added (E2); AGENTS.md's speed line names readFirstFeedPage (E4).

WHY
- The baseline's home page drew its first card photo at 6.5 s even with the code cached: the browser could ask for the feed only after its code ran and it had read the markets and the market's tree, and the photos only after the feed. The server knows the place from the request, so the first page and its photos start with the page now.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-28.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-28.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-28.md (Foundations turn 28: speed S5 — the feed's first page arrives with the page — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 27 (docs/governance/briefs/foundations-turn-27", add `  - [ ] Turn 28 (docs/governance/briefs/foundations-turn-28.md; no migration) — speed S5: the listings pages' first feed page read by the server and handed over in the page stream, its first covers preloaded; one derivation of the first place for the shell and the server (D234).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–E; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds AP-53 (scratch seller and ads through the spec's own helpers, as AP-49) and gives three tests the E2E-only cookie (D1); no assertion changes.
- Run no stateful git command. Edits with your file-editing tool or a script that copies the brief's text. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-28.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/governance/mechanisms.md, AGENTS.md (E4 only), docs/governance/reports/foundations-turn-28.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (they move: the new src module raises the scanned count by one — the supervisor's run of `bun run i18n:usage` on this change). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each part whole (B, then C, then D). After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so. No ceiling changes: the supervisor's build of this change holds every page under its line in scripts/route-budgets.mjs; CI's bundle-budget job judges.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-11, EXH-17 and EXH-19 time out in your sandbox (INC-890; they pass in CI), and LL-1 can hit its 5-second limit under the full suite's load (it passes alone). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's specs through `bun run e2e:local -- <spec file> --grep "<pattern>"` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: every page shows exactly what it shows today; on "/" and "/c/<slug>" the same first cards arrive sooner, from the page itself; the place the shell shows is the place it shows today (DIA-6); every later read, a Retry and every client navigation read as today. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every place that derives the first place, reads the listings address, builds the feed read's address or parses the markets, a tree or the feed's answer after this turn (each must be on the shared function), and every e2e test that holds, fails or waits for a browser /api/feed read on a listings page's first load (each must carry the cookie: the three of D1); K3 DIA-, FSP-, UFS-, FP-15, FRO-1 and AP-53 land with the mechanism; K4 no literal language or country code in src (the tests' "ET", "SE", "KE" are fixtures); K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row (AP-53 seeds its own scratch seller, as AP-49); no assertion loosened; DIA-6 is the equivalence proof of the refactor; AP-53 the browser proof.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on 7460ca061c8243bf29f56ac0a632899ef7b7afb7). A red on 7460ca061c8243bf29f56ac0a632899ef7b7afb7 is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — ONE DERIVATION OF THE FIRST PLACE.
B1. src/components/shell/location-data.ts, these edits (the markets' and a tree's parsers exported; initialCountries and deriveInitialArea added):
EDIT src/components/shell/location-data.ts #1
OLD-BEGIN
    throw new Error(`markets ${answer.kind === "answered" ? answer.status : 0}`);
  }
  const payload = (answer.payload ?? {}) as MarketsPayload;
  return (payload.countries ?? [])
    .map((row) => ({
OLD-END
NEW-BEGIN
    throw new Error(`markets ${answer.kind === "answered" ? answer.status : 0}`);
  }
  return parseMarkets(answer.payload);
}

/**
 * The open markets as the route answered them (D234 S5: one reading for the
 * browser's read and the server's first page, src/server/first-screen.ts).
 */
export function parseMarkets(answer: Record<string, unknown> | null): OpenMarket[] {
  const payload = (answer ?? {}) as MarketsPayload;
  return (payload.countries ?? [])
    .map((row) => ({
NEW-END
EDIT src/components/shell/location-data.ts #2
OLD-BEGIN
    throw new Error(`tree ${answer.kind === "answered" ? answer.status : 0}`);
  }
  const payload = (answer.payload ?? {}) as TreePayload;
  return (payload.nodes ?? []).map((row) => ({
    id: String(row.id ?? ""),
OLD-END
NEW-BEGIN
    throw new Error(`tree ${answer.kind === "answered" ? answer.status : 0}`);
  }
  return parseTree(answer.payload);
}

/** A market's tree as the route answered it (D234 S5: one reading for the browser and the server). */
export function parseTree(answer: Record<string, unknown> | null): TreeNode[] {
  const payload = (answer ?? {}) as TreePayload;
  return (payload.nodes ?? []).map((row) => ({
    id: String(row.id ?? ""),
NEW-END
EDIT src/components/shell/location-data.ts #3
OLD-BEGIN
  return anchor;
}
OLD-END
NEW-BEGIN
  return anchor;
}

/* --------------------------- the initial area ----------------------------- */

/**
 * L4b-2 — THE MARKET THE FIRST PLACE COMES FROM: the saved area's country, else
 * the edge's guessed country when it is an open market and the person has not
 * chosen every area (D219). One function for the shell and for the server's
 * first page (D234 S5, src/server/first-screen.ts), so the two can never pick
 * different markets from the same request.
 */
export function initialCountries(input: {
  savedArea: SavedArea | null;
  everywhere: { at: number } | null;
  geoCountry: string | null;
  markets: readonly OpenMarket[];
}): { initialCountry: string | null; guessCountry: string | null } {
  const { savedArea, everywhere, geoCountry, markets } = input;
  const guessCountry =
    savedArea === null &&
    everywhere === null &&
    geoCountry !== null &&
    markets.some((market) => market.code === geoCountry)
      ? geoCountry
      : null;
  return { initialCountry: savedArea?.country ?? guessCountry, guessCountry };
}

/** The first place the shell shows, or none (no market, a failed or empty tree, no anchor). */
export type InitialArea =
  | { kind: "none" }
  | { kind: "place"; country: string; path: ShellLocationNode[]; guess: boolean };

/**
 * L4b-2 / L4b-3 — THE INITIAL AREA, DERIVED ONCE, as one pure step: the saved
 * area's path when the market's tree holds it; else the guess resolved over
 * the tree (geometry, the region's code, the city's slug, the anchor) when the
 * market came from the guess; else the market's anchor. The auto-select law
 * applies at once, so the first path is already the deepest single-option
 * place (the shell's walk then finds nothing to add). `tree` null means the
 * tree's read failed: the area settles with no place (INC-282).
 */
export function deriveInitialArea(input: {
  initialCountry: string | null;
  savedArea: SavedArea | null;
  guessCountry: string | null;
  geo: GuessFacts;
  tree: TreeNode[] | null;
}): InitialArea {
  const { initialCountry, savedArea, guessCountry, geo, tree } = input;
  if (initialCountry === null || tree === null || tree.length === 0) return { kind: "none" };
  const anchor = anchorOf(tree);
  if (anchor === null) return { kind: "none" };
  const place = (nodes: TreeNode[], country: string, guess: boolean): InitialArea => ({
    kind: "place",
    country,
    guess,
    path: autoExtendPath(tree, nodes.map(asLocationNode)),
  });
  if (savedArea !== null) {
    const path = pathToNode(tree, savedArea.id);
    if (path.length > 0) return place(path, savedArea.country, false);
  }
  if (savedArea === null && guessCountry !== null) {
    const guessed = resolveGuess(tree, geo);
    const path = guessed === null ? [] : pathToNode(tree, guessed.id);
    return place(path.length > 0 ? path : [anchor], initialCountry, true);
  }
  return place([anchor], initialCountry, false);
}
NEW-END
NEW src/components/shell/location-data.test.ts (sha256 40d0dccfd87dcfab2afc09fb43bed72688f26a55247e16bfeabc2ddfb9f4cca5):
FILE-BEGIN src/components/shell/location-data.test.ts
import { describe, expect, it } from "vitest";

import {
  anchorOf,
  asLocationNode,
  autoExtendPath,
  deriveInitialArea,
  initialCountries,
  pathToNode,
  resolveGuess,
  type GuessFacts,
  type OpenMarket,
  type SavedArea,
  type ShellLocationNode,
  type TreeNode,
} from "./location-data";

/**
 * D234 speed turn S5 — DIA-1…DIA-6. The first place the shell shows, derived
 * by one pure function for the shell and the server's first page: the saved
 * area, else the guess, else the anchor, the auto-select law applied at once.
 * DIA-6 proves the shell's former steps (its effect, then its auto-select walk)
 * land on the same place for every case.
 */
function node(
  id: string,
  parentId: string | null,
  level: string,
  extra: Partial<TreeNode> = {},
): TreeNode {
  return {
    id,
    parentId,
    level,
    slug: id,
    nameEn: id,
    centerLat: null,
    centerLng: null,
    isoCode: null,
    ...extra,
  };
}

const ID = {
  et: "11111111-1111-4111-8111-111111111111",
  oromia: "22222222-2222-4222-8222-222222222222",
  amhara: "33333333-3333-4333-8333-333333333333",
  adama: "44444444-4444-4444-8444-444444444444",
  bahirdar: "55555555-5555-4555-8555-555555555555",
  lone: "66666666-6666-4666-8666-666666666666",
  only: "77777777-7777-4777-8777-777777777777",
  gone: "88888888-8888-4888-8888-888888888888",
};

/** Two regions; Oromia holds Adama; Amhara holds one city, which holds one sub-city (auto-select). */
const TREE: TreeNode[] = [
  node(ID.et, null, "country"),
  node(ID.oromia, ID.et, "region", { isoCode: "ET-OR" }),
  node(ID.amhara, ID.et, "region", { isoCode: "ET-AM" }),
  node(ID.adama, ID.oromia, "city", { slug: "adama", centerLat: 8.54, centerLng: 39.27 }),
  node(ID.bahirdar, ID.amhara, "city", { slug: "bahir-dar" }),
  node(ID.only, ID.bahirdar, "sub_city", { slug: "only" }),
];
const MARKETS: OpenMarket[] = [
  { code: "ET", nameEn: "Ethiopia", anchorSlug: null, anchorId: ID.et, displayOrder: 0 },
];
const NO_GEO: GuessFacts = { country: null, regionCode: null, city: null, lat: null, lng: null };
const saved = (id: string, country = "ET"): SavedArea => ({ country, id, at: null });
const ids = (path: ShellLocationNode[]) => path.map((entry) => entry.id);

describe("deriveInitialArea (D234 S5)", () => {
  it("DIA-1 a saved place the tree holds is the path to it, extended through single-option levels", () => {
    const area = deriveInitialArea({
      initialCountry: "ET",
      savedArea: saved(ID.amhara),
      guessCountry: null,
      geo: NO_GEO,
      tree: TREE,
    });
    expect(area).toMatchObject({ kind: "place", country: "ET", guess: false });
    expect(area.kind === "place" ? ids(area.path) : []).toEqual([
      ID.et,
      ID.amhara,
      ID.bahirdar,
      ID.only,
    ]);
  });

  it("DIA-2 a saved place the tree no longer holds falls to the market's anchor, never the guess", () => {
    const area = deriveInitialArea({
      initialCountry: "ET",
      savedArea: saved(ID.gone),
      guessCountry: null,
      geo: { ...NO_GEO, country: "ET", regionCode: "OR" },
      tree: TREE,
    });
    expect(area).toMatchObject({ kind: "place", country: "ET", guess: false });
    expect(area.kind === "place" ? ids(area.path) : []).toEqual([ID.et]);
  });

  it("DIA-3 the guess resolves by geometry, then the region's code; nothing matching gives the anchor", () => {
    const at = (geo: GuessFacts) =>
      deriveInitialArea({
        initialCountry: "ET",
        savedArea: null,
        guessCountry: "ET",
        geo,
        tree: TREE,
      });
    const near = at({ ...NO_GEO, country: "ET", lat: 8.55, lng: 39.28 });
    expect(near).toMatchObject({ kind: "place", guess: true });
    expect(near.kind === "place" ? ids(near.path) : []).toEqual([ID.et, ID.oromia, ID.adama]);
    const region = at({ ...NO_GEO, country: "ET", regionCode: "AM" });
    expect(region.kind === "place" ? ids(region.path) : []).toEqual([
      ID.et,
      ID.amhara,
      ID.bahirdar,
      ID.only,
    ]);
    const nothing = at({ ...NO_GEO, country: "ET", city: "Nowhere" });
    expect(nothing.kind === "place" ? ids(nothing.path) : []).toEqual([ID.et]);
  });

  it("DIA-4 no market, a failed tree, an empty tree or no anchor: no place", () => {
    const base = { savedArea: null, guessCountry: null, geo: NO_GEO };
    expect(deriveInitialArea({ ...base, initialCountry: null, tree: TREE })).toEqual({
      kind: "none",
    });
    expect(deriveInitialArea({ ...base, initialCountry: "ET", tree: null })).toEqual({
      kind: "none",
    });
    expect(deriveInitialArea({ ...base, initialCountry: "ET", tree: [] })).toEqual({
      kind: "none",
    });
    expect(
      deriveInitialArea({ ...base, initialCountry: "ET", tree: [node(ID.lone, ID.et, "region")] }),
    ).toEqual({ kind: "none" });
  });

  it("DIA-5 the market: the saved one; else the guessed one only when open and not every area", () => {
    const geoCountry = "ET";
    expect(
      initialCountries({
        savedArea: saved(ID.adama, "KE"),
        everywhere: null,
        geoCountry,
        markets: MARKETS,
      }),
    ).toEqual({ initialCountry: "KE", guessCountry: null });
    expect(
      initialCountries({ savedArea: null, everywhere: null, geoCountry, markets: MARKETS }),
    ).toEqual({ initialCountry: "ET", guessCountry: "ET" });
    expect(
      initialCountries({ savedArea: null, everywhere: { at: 1 }, geoCountry, markets: MARKETS }),
    ).toEqual({ initialCountry: null, guessCountry: null });
    expect(
      initialCountries({ savedArea: null, everywhere: null, geoCountry: "SE", markets: MARKETS }),
    ).toEqual({ initialCountry: null, guessCountry: null });
  });

  it("DIA-6 every case lands where the shell's former steps (its effect, then its auto-select walk) landed", () => {
    /** The shell's derivation before S5, step for step, then its auto-select effect. */
    function former(
      initialCountry: string | null,
      savedArea: SavedArea | null,
      guessCountry: string | null,
      geo: GuessFacts,
      tree: TreeNode[] | null,
    ) {
      if (initialCountry === null || tree === null || tree.length === 0) return null;
      const anchor = anchorOf(tree);
      if (anchor === null) return null;
      let path: ShellLocationNode[];
      let guess = false;
      if (savedArea !== null && pathToNode(tree, savedArea.id).length > 0) {
        path = pathToNode(tree, savedArea.id).map(asLocationNode);
      } else if (savedArea === null && guessCountry !== null) {
        const guessed = resolveGuess(tree, geo);
        const found = guessed === null ? [] : pathToNode(tree, guessed.id);
        path = (found.length > 0 ? found : [anchor]).map(asLocationNode);
        guess = true;
      } else {
        path = [asLocationNode(anchor)];
      }
      return { path: ids(autoExtendPath(tree, path)), guess };
    }
    const geos: GuessFacts[] = [
      NO_GEO,
      { ...NO_GEO, country: "ET", lat: 8.55, lng: 39.28 },
      { ...NO_GEO, country: "ET", regionCode: "AM" },
      { ...NO_GEO, country: "ET", city: "Adama" },
    ];
    const saves = [null, ...Object.values(ID).map((id) => saved(id))];
    for (const tree of [TREE, null, [], TREE.slice(1)]) {
      for (const savedArea of saves) {
        for (const guessCountry of [null, "ET"]) {
          for (const geo of geos) {
            const initialCountry = savedArea?.country ?? guessCountry;
            const area = deriveInitialArea({ initialCountry, savedArea, guessCountry, geo, tree });
            const expected = former(initialCountry, savedArea, guessCountry, geo, tree);
            expect(
              area.kind === "place" ? { path: ids(area.path), guess: area.guess } : null,
            ).toEqual(expected);
          }
        }
      }
    }
  });
});
FILE-END src/components/shell/location-data.test.ts
B2. src/components/app-shell.tsx, these edits (the market choice and the first-place effect on the shared functions; the listings address through feedRouteOf):
EDIT src/components/app-shell.tsx #1
OLD-BEGIN
  autoExtendPath,
  parseEverywhere,
OLD-END
NEW-BEGIN
  autoExtendPath,
  deriveInitialArea,
  initialCountries,
  parseEverywhere,
NEW-END
EDIT src/components/app-shell.tsx #2
OLD-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { useCategoryTree } from "@/features/categories/category-tree";
import type { AuthUser } from "@/features/auth/types";
OLD-END
NEW-BEGIN
import { useAuth } from "@/features/auth/use-auth";
import { feedRouteOf, useCategoryTree } from "@/features/categories/category-tree";
import type { AuthUser } from "@/features/auth/types";
NEW-END
EDIT src/components/app-shell.tsx #3
OLD-BEGIN
  const { markets, isLoading: marketsLoading } = useOpenMarkets();
  const guessCountry =
    savedArea === null &&
    everywhere === null &&
    geoCountry !== null &&
    markets.some((market) => market.code === geoCountry)
      ? geoCountry
      : null;
  const initialCountry = savedArea?.country ?? guessCountry;
  /** The country whose tree the picker reads; the module cache shares the fetch. */
OLD-END
NEW-BEGIN
  const { markets, isLoading: marketsLoading } = useOpenMarkets();
  // D234 S5 — the market the first place comes from: one function for the shell and the server.
  const { initialCountry, guessCountry } = initialCountries({
    savedArea,
    everywhere,
    geoCountry,
    markets,
  });
  /** The country whose tree the picker reads; the module cache shares the fetch. */
NEW-END
EDIT src/components/app-shell.tsx #4
OLD-BEGIN
    if (marketsLoading) return;
    if (initialCountry === null) {
      appliedRef.current = true;
      setAreaSettled(true);
      return;
    }
    // INC-282 (F4) — a failed tree settles the gate: the feed runs unscoped.
    if (treeFailed) {
      appliedRef.current = true;
      setAreaSettled(true);
      return;
    }
    if (treeLoadedCountry !== initialCountry) return;
    // Loaded but empty — nothing to apply, so the gate settles too.
    if (treeNodes.length === 0) {
      appliedRef.current = true;
      setAreaSettled(true);
      return;
    }
    const anchor = anchorOf(treeNodes);
    if (anchor === null) {
      appliedRef.current = true;
      setAreaSettled(true);
      return;
    }
    appliedRef.current = true;
    setAreaSettled(true);
    if (savedArea !== null) {
      const path = pathToNode(treeNodes, savedArea.id);
      if (path.length > 0) {
        setCountryState(savedArea.country);
        setPathState(path.map(asLocationNode));
        return;
      }
    }
    setCountryState(initialCountry);
    if (savedArea === null && guessCountry !== null) {
      // L4b-2 — the guess resolved over the CACHED tree: geometry, then the
      // region's ISO code, then the city's slug, then the market anchor.
      const guessed = resolveGuess(treeNodes, geo);
      const path = guessed === null ? [] : pathToNode(treeNodes, guessed.id);
      const resolved = path.length > 0 ? path : [anchor];
      setPathState(resolved.map(asLocationNode));
      setGuessNode(asLocationNode(resolved[resolved.length - 1]!));
      setGuessInUse(true);
OLD-END
NEW-BEGIN
    if (marketsLoading) return;
    // INC-282 (F4) — a failed tree settles the gate (the feed runs unscoped);
    // otherwise the market's own tree must be in before the place is derived.
    if (initialCountry !== null && !treeFailed && treeLoadedCountry !== initialCountry) return;
    appliedRef.current = true;
    setAreaSettled(true);
    // D234 S5 — one derivation for the shell and the server's first page
    // (deriveInitialArea, location-data.ts): the saved area, else the guess, else
    // the anchor, the auto-select law applied at once.
    const area = deriveInitialArea({
      initialCountry,
      savedArea,
      guessCountry,
      geo,
      tree: treeFailed ? null : treeNodes,
    });
    if (area.kind === "none") return;
    setCountryState(area.country);
    setPathState(area.path);
    if (area.guess) {
      setGuessNode(area.path[area.path.length - 1] ?? null);
      setGuessInUse(true);
NEW-END
EDIT src/components/app-shell.tsx #5
OLD-BEGIN
    }
    setPathState([asLocationNode(anchor)]);
    setGuessInUse(false);
OLD-END
NEW-BEGIN
    }
    setGuessInUse(false);
NEW-END
EDIT src/components/app-shell.tsx #6
OLD-BEGIN
  /** The marketplace feed is "/" and every category route /c/<slug>. */
  const isFeedRoute = pathname === "/" || pathname.startsWith("/c/");

OLD-END
NEW-BEGIN
  /** The marketplace feed is "/" and every category route /c/<slug>. */
  // D234 S5 — the address read once, as the server's first page reads it (feedRouteOf).
  const feedRoute = feedRouteOf(pathname);
  const isFeedRoute = feedRoute !== null;

NEW-END
EDIT src/components/app-shell.tsx #7
OLD-BEGIN
   */
  const selectedCategorySlug = pathname.startsWith("/c/")
    ? decodeURIComponent(pathname.slice(3).split("/")[0] ?? "")
    : null;
  // INC-504 — the slug resolves through the WHOLE tree, subcategories included.
OLD-END
NEW-BEGIN
   */
  const selectedCategorySlug = feedRoute?.slug ?? null;
  // INC-504 — the slug resolves through the WHOLE tree, subcategories included.
NEW-END
B3. src/features/categories/category-tree.ts, these edits (feedRouteOf; the tree's parser exported for the server's first page):
EDIT src/features/categories/category-tree.ts #1
OLD-BEGIN
export const CATEGORY_TREE_PATH = "/api/categories/tree";

/**
 * The raw read: one public route, never the browser client, so the tree carries
OLD-END
NEW-BEGIN
export const CATEGORY_TREE_PATH = "/api/categories/tree";

/**
 * U0l (INC-073) — the listings pages are "/" and "/c/<slug>": null for any other
 * page, else the category's slug (null on "/"). The shell and the server's first
 * page (D234 S5, src/server/first-screen.ts) read the address here, the same way.
 */
export function feedRouteOf(pathname: string): { slug: string | null } | null {
  if (pathname === "/") return { slug: null };
  if (!pathname.startsWith("/c/")) return null;
  return { slug: decodeURIComponent(pathname.slice(3).split("/")[0] ?? "") };
}

/**
 * The raw read: one public route, never the browser client, so the tree carries
NEW-END
EDIT src/features/categories/category-tree.ts #2
OLD-BEGIN
    );
  }
  const payload = answer.payload;
  if (!isTreePayload(payload)) {
    throw new Error("category tree read failed (bad payload)");
  }

  const rows: CategoryNode[] = payload.nodes.map((row) => ({
    id: row.id,
OLD-END
NEW-BEGIN
    );
  }
  const parsed = parseCategoryTree(answer.payload);
  if (parsed === null) {
    throw new Error("category tree read failed (bad payload)");
  }
  return parsed;
}

/**
 * The tree as the route answered it, or null for a malformed answer (F4) — one
 * reading for the browser's read and the server's first page (D234 S5,
 * src/server/first-screen.ts: a /c/<slug> page finds its category here).
 */
export function parseCategoryTree(
  payload: unknown,
): { tree: CategoryTree; version: string } | null {
  if (!isTreePayload(payload)) return null;
  const rows: CategoryNode[] = payload.nodes.map((row) => ({
    id: row.id,
NEW-END
src/features/categories/category-tree.test.ts, these edits (FRO-1):
EDIT src/features/categories/category-tree.test.ts #1
OLD-BEGIN
import {
  buildTree,
  childrenOf,
  forgetCategoryTree,
  isPostable,
  pathOf,
OLD-END
NEW-BEGIN
import {
  buildTree,
  childrenOf,
  feedRouteOf,
  forgetCategoryTree,
  isPostable,
  pathOf,
NEW-END
EDIT src/features/categories/category-tree.test.ts #2
OLD-BEGIN
    expect(isPostable(withFolder, folder)).toBe(false);
  });
});
OLD-END
NEW-BEGIN
    expect(isPostable(withFolder, folder)).toBe(false);
  });
});

describe("feedRouteOf (D234 S5)", () => {
  it("FRO-1 the listings pages are / and /c/<slug>, the slug decoded; any other page is none", () => {
    expect(feedRouteOf("/")).toEqual({ slug: null });
    expect(feedRouteOf("/c/phones")).toEqual({ slug: "phones" });
    expect(feedRouteOf("/c/ph%C3%B6nes/extra")).toEqual({ slug: "phönes" });
    expect(feedRouteOf("/l/an-ad")).toBeNull();
    expect(feedRouteOf("/cars")).toBeNull();
  });
});
NEW-END
B4. src/features/feed/feed-page.ts, these edits (feedPath and the FirstFeedPage shape):
EDIT src/features/feed/feed-page.ts #1
OLD-BEGIN
  return sections;
}
OLD-END
NEW-BEGIN
  return sections;
}

/**
 * The feed read's address for a page: the category, then the place, then the
 * cursor — the browser's read (use-feed.ts) and the server's first page
 * (D234 S5, src/server/first-screen.ts) build it here, so the server's answer
 * is handed over only when it is the very page the browser would ask for.
 */
export function feedPath(
  categoryId: string | null,
  placeId: string | null,
  after: string | null,
): `/api/${string}` {
  const params = new URLSearchParams();
  if (categoryId !== null) params.set("category", categoryId);
  if (placeId !== null) params.set("place", placeId);
  if (after !== null) params.set("after", after);
  const query = params.toString();
  return query === "" ? "/api/feed" : `/api/feed?${query}`;
}

/**
 * D234 S5 — THE FIRST PAGE THE SERVER ANSWERED INSIDE THE PAGE: the feed read's
 * address, its answer read by parseFeedPage (as the browser reads it), and the
 * first cards' cover links the page preloads. Handed to the browser's first read of the same address
 * once per page load (use-feed.ts).
 */
export interface FirstFeedPage {
  path: string;
  page: FeedPage;
  covers: string[];
}
NEW-END
src/features/feed/feed-page.test.ts, these edits (FP-15):
EDIT src/features/feed/feed-page.test.ts #1
OLD-BEGIN

import {
  EVERYWHERE,
  feedSections,
  inviteShown,
  inviteSpot,
OLD-END
NEW-BEGIN

import {
  EVERYWHERE,
  feedPath,
  feedSections,
  inviteShown,
  inviteSpot,
NEW-END
EDIT src/features/feed/feed-page.test.ts #2
OLD-BEGIN
    expect(inviteSpot(of([1, 1]), false, true)).toBeNull();
  });
});
OLD-END
NEW-BEGIN
    expect(inviteSpot(of([1, 1]), false, true)).toBeNull();
  });
});

describe("the feed read's address (D234 S5)", () => {
  it("FP-15 the category, then the place, then the cursor; none of them is the bare read", () => {
    expect(feedPath(null, null, null)).toBe("/api/feed");
    expect(feedPath("c-1", null, null)).toBe("/api/feed?category=c-1");
    expect(feedPath(null, "p-1", null)).toBe("/api/feed?place=p-1");
    expect(feedPath("c-1", "p-1", "x y")).toBe("/api/feed?category=c-1&place=p-1&after=x+y");
  });
});
NEW-END

PART C — THE FIRST PAGE READ BY THE SERVER AND HANDED OVER.
C1. The four routes' GET handlers exported (each route keeps the very handler it had):
EDIT src/routes/api/locations.ts #1
OLD-BEGIN

export const Route = createFileRoute("/api/locations")({
  server: { handlers: { GET: defineRoute({ path: PATH, auth: "anon", handler }) } },
});
OLD-END
NEW-BEGIN

/** D234 S5 — the GET handler, also asked in-process by the server's first page (src/server/first-screen.ts). */
export const openMarketsGet = defineRoute({ path: PATH, auth: "anon", handler });

export const Route = createFileRoute("/api/locations")({
  server: { handlers: { GET: openMarketsGet } },
});
NEW-END
EDIT src/routes/api/locations.$country.ts #1
OLD-BEGIN

export const Route = createFileRoute("/api/locations/$country")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        params,
        badShape: () => clientError("badCountry", 400),
        handler,
      }),
    },
  },
});
OLD-END
NEW-BEGIN

/** D234 S5 — the GET handler, also asked in-process by the server's first page (src/server/first-screen.ts). */
export const countryTreeGet = defineRoute({
  path: PATH,
  auth: "anon",
  params,
  badShape: () => clientError("badCountry", 400),
  handler,
});

export const Route = createFileRoute("/api/locations/$country")({
  server: { handlers: { GET: countryTreeGet } },
});
NEW-END
EDIT src/routes/api/categories.tree.ts #1
OLD-BEGIN

export const Route = createFileRoute("/api/categories/tree")({
  server: { handlers: { GET: defineRoute({ path: PATH, auth: "anon", handler }) } },
});
OLD-END
NEW-BEGIN

/** D234 S5 — the GET handler, also asked in-process by the server's first page (src/server/first-screen.ts). */
export const categoryTreeGet = defineRoute({ path: PATH, auth: "anon", handler });

export const Route = createFileRoute("/api/categories/tree")({
  server: { handlers: { GET: categoryTreeGet } },
});
NEW-END
EDIT src/routes/api/feed.ts #1
OLD-BEGIN

export const Route = createFileRoute("/api/feed")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        query: FeedQuery,
        badShape: (issue) =>
          clientError(
            issue.path === "category"
              ? "badCategory"
              : issue.path === "place"
                ? "badPlace"
                : issue.path === "size"
                  ? "badSize"
                  : "badCursor",
            400,
          ),
        handler,
      }),
    },
  },
});
OLD-END
NEW-BEGIN

/** D234 S5 — the GET handler, also asked in-process by the server's first page (src/server/first-screen.ts). */
export const feedGet = defineRoute({
  path: PATH,
  auth: "anon",
  query: FeedQuery,
  badShape: (issue) =>
    clientError(
      issue.path === "category"
        ? "badCategory"
        : issue.path === "place"
          ? "badPlace"
          : issue.path === "size"
            ? "badSize"
            : "badCursor",
      400,
    ),
  handler,
});

export const Route = createFileRoute("/api/feed")({
  server: { handlers: { GET: feedGet } },
});
NEW-END
C2. NEW src/server/first-screen.ts (sha256 bf4977f824f59b72cb1cf6eb3dc7822380342a0fb862b942787d7b723deb926b):
FILE-BEGIN src/server/first-screen.ts
import {
  MARKETS_PATH,
  deriveInitialArea,
  initialCountries,
  parseAreaCookie,
  parseEverywhere,
  parseMarkets,
  parseTree,
  treePath,
} from "@/components/shell/location-data";
import {
  CATEGORY_TREE_PATH,
  feedRouteOf,
  parseCategoryTree,
} from "@/features/categories/category-tree";
import {
  feedPath,
  feedSections,
  parseFeedPage,
  type FirstFeedPage,
} from "@/features/feed/feed-page";
import { CARD_THEN_THUMB, photoUrl } from "@/features/posting/photo-links";
import { isE2E } from "@/lib/env-flags";
import { errorText } from "@/lib/error-text";
import { categoryTreeGet } from "@/routes/api/categories.tree";
import { feedGet } from "@/routes/api/feed";
import { openMarketsGet } from "@/routes/api/locations";
import { countryTreeGet } from "@/routes/api/locations.$country";
import { geoGuess } from "@/server/geo/guess";

/**
 * D234 speed turn S5 — THE FEED'S FIRST PAGE ARRIVES WITH THE PAGE.
 *
 * On the listings pages ("/" and "/c/<slug>") the browser used to ask for the
 * feed only after its code ran and the shell had read the markets and the
 * market's tree: on a slow phone network the first cards came a few round trips
 * after the code. The server already holds the request's facts (the saved-area
 * cookie, the edge's guess, the address), so it derives the first place with
 * the shell's own functions (initialCountries, deriveInitialArea, feedRouteOf,
 * feedPath) over the same route answers the browser reads — each route's own
 * GET handler, asked in-process with no session — and reads the first page.
 * The root loader hands it over unawaited, so the page's shell is sent at once
 * and this streams in behind it; the browser's first read of the same address
 * takes it (use-feed.ts), once per page load, and the first cards' covers are
 * preloaded meanwhile (feed.tsx).
 *
 * Never a failure of the page: any refusal, failure or the deadline answers
 * null (one [first-screen] line), and the browser reads the feed as before.
 * The E2E build skips it when the request carries the cookie
 * `e2e_first_screen=off`, so the tests of the browser's own read keep that read
 * (a cookie, not a header: it reaches only this site, never a cross-origin read).
 */

/** The longest the server waits for the first page; past it the browser reads as before. */
export const FIRST_PAGE_DEADLINE_MS = 2000;
/** The covers preloaded: a grid's first six cards load at once (DEC-195, feed.tsx). */
const COVERS = 6;

type Get = (args: { request: Request; params: unknown }) => Promise<Response>;

/** One public route asked in-process with no session; its 200 answer, or null with one line. */
async function answerOf(
  get: Get,
  origin: string,
  path: string,
  params: Record<string, string> = {},
): Promise<Record<string, unknown> | null> {
  const response = await get({ request: new Request(new URL(path, origin)), params });
  if (response.status !== 200) {
    console.warn("[first-screen]", path, "answered", response.status);
    return null;
  }
  const value: unknown = await response.json();
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

async function read(request: Request, areaCookie: string | null): Promise<FirstFeedPage | null> {
  const url = new URL(request.url);
  const route = feedRouteOf(url.pathname);
  if (route === null) return null;
  const savedArea = parseAreaCookie(areaCookie);
  const everywhere = parseEverywhere(areaCookie);
  const geo = geoGuess(request);
  const [markets, categories] = await Promise.all([
    answerOf(openMarketsGet, url.origin, MARKETS_PATH),
    route.slug === null ? null : answerOf(categoryTreeGet, url.origin, CATEGORY_TREE_PATH),
  ]);
  if (markets === null) return null;
  let categoryId: string | null = null;
  if (route.slug !== null) {
    const found = parseCategoryTree(categories)?.tree.nodes.find(
      (node) => node.slug === route.slug,
    );
    if (found === undefined) return null;
    categoryId = found.id;
  }
  const { initialCountry, guessCountry } = initialCountries({
    savedArea,
    everywhere,
    geoCountry: geo.country,
    markets: parseMarkets(markets),
  });
  // The market's tree only when the shell will read it too (both are cached per market).
  const tree =
    initialCountry === null
      ? null
      : await answerOf(countryTreeGet, url.origin, treePath(initialCountry), {
          country: initialCountry,
        });
  const area = deriveInitialArea({
    initialCountry,
    savedArea,
    guessCountry,
    geo,
    tree: tree === null ? null : parseTree(tree),
  });
  const placeId = area.kind === "place" ? (area.path[area.path.length - 1]?.id ?? null) : null;
  const path = feedPath(categoryId, placeId, null);
  const page = parseFeedPage(await answerOf(feedGet, url.origin, path));
  if (page === null) return null;
  const covers = (feedSections(page.cards, page.ladder)[0]?.cards ?? [])
    .slice(0, COVERS)
    .map((card) =>
      card.coverPhotoId === null
        ? null
        : photoUrl({ id: card.coverPhotoId }, CARD_THEN_THUMB, page.coverLinks),
    )
    .filter((cover): cover is string => cover !== null);
  return { path, page, covers };
}

/** The first page for this request, or null; never throws and never waits past the deadline. */
export async function readFirstFeedPage(
  request: Request,
  areaCookie: string | null,
): Promise<FirstFeedPage | null> {
  if (isE2E && /(?:^|;\s*)e2e_first_screen=off(?:;|$)/.test(request.headers.get("cookie") ?? "")) {
    return null;
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<null>((resolve) => {
    timer = setTimeout(() => {
      console.warn("[first-screen] deadline passed; the browser reads the feed");
      resolve(null);
    }, FIRST_PAGE_DEADLINE_MS);
  });
  // The read's own failure is caught on the read itself, so a read that fails after
  // the deadline has answered is still one logged line, never an unhandled rejection.
  const reading = read(request, areaCookie).catch((error: unknown) => {
    console.warn("[first-screen] the first page was not read:", errorText(error));
    return null;
  });
  try {
    return await Promise.race([reading, deadline]);
  } finally {
    clearTimeout(timer);
  }
}
FILE-END src/server/first-screen.ts
NEW src/server/first-screen.test.ts (sha256 1d51c002fe538275f8ce77c9e40c8ee98d6857fad8981aae1ce30416c8745794):
FILE-BEGIN src/server/first-screen.test.ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * D234 speed turn S5 — FSP-1…FSP-6. The server's first page for a listings
 * page: the place derived from the request with the shell's own functions, the
 * page read from the feed route in-process, its first covers named; null for
 * any other page, the E2E switch, a refusal, a failure or the deadline. The four
 * routes' handlers and the edge's guess are stubbed.
 */
interface Geo {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
}
const state = vi.hoisted(() => ({
  e2e: false,
  geo: { country: null, regionCode: null, city: null, lat: null, lng: null } as Geo,
  asked: [] as string[],
  feedStatus: 200,
  feedDelayMs: 0,
}));

vi.mock("@/lib/env-flags", () => ({
  get isE2E() {
    return state.e2e;
  },
}));
vi.mock("@/server/geo/guess", () => ({
  geoGuess: () => ({ ...state.geo, source: "none" }),
}));

const ET = "11111111-1111-4111-8111-111111111111";
const OROMIA = "22222222-2222-4222-8222-222222222222";
const ADAMA = "33333333-3333-4333-8333-333333333333";
const LEAF = "44444444-4444-4444-8444-444444444444";
const PHOTO = "55555555-5555-4555-8555-555555555555";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function record(request: Request): string {
  const url = new URL(request.url);
  const path = `${url.pathname}${url.search}`;
  state.asked.push(path);
  return path;
}

vi.mock("@/routes/api/locations", () => ({
  openMarketsGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({ countries: [{ code: "ET", name_en: "Ethiopia", display_order: 0 }] });
  },
}));
vi.mock("@/routes/api/locations.$country", () => ({
  countryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({
      nodes: [
        { id: ET, parent_id: null, level: "country", slug: "et", name_en: "Ethiopia" },
        { id: OROMIA, parent_id: ET, level: "region", slug: "oromia", name_en: "Oromia" },
        { id: ADAMA, parent_id: OROMIA, level: "city", slug: "adama", name_en: "Adama" },
      ],
    });
  },
}));
vi.mock("@/routes/api/categories.tree", () => ({
  categoryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({
      version: "v1",
      nodes: [
        {
          id: LEAF,
          name_en: "Phones",
          name_am: null,
          slug: "phones",
          icon: null,
          allow_listings: true,
          is_catchall: false,
          image_url: null,
          image_thumb_url: null,
          display_order: 0,
        },
      ],
      pointers: [],
    });
  },
}));
vi.mock("@/routes/api/feed", () => ({
  feedGet: async ({ request }: { request: Request }) => {
    record(request);
    if (state.feedDelayMs > 0)
      await new Promise((resolve) => setTimeout(resolve, state.feedDelayMs));
    if (state.feedStatus !== 200) return json({ error: "internal error" }, state.feedStatus);
    return json({
      cards: [
        {
          id: "a",
          publicId: "pub-a",
          title: "Ad a",
          tier: "regular",
          priceAmount: null,
          priceCurrency: null,
          priceMode: "contact",
          priceBp: null,
          priceNegotiable: false,
          pricePeriod: "once",
          priceUnit: null,
          priceUnitText: null,
          photosSoon: false,
          coverPhotoId: PHOTO,
          soldWord: null,
          reserved: false,
          priceWas: null,
          publishedAt: "2026-10-17T00:00:00Z",
          categoryId: LEAF,
          locationId: ADAMA,
          locationNameEn: "Adama",
          locationNameAm: null,
          step: 1,
        },
      ],
      ladder: [ADAMA],
      steps: [1],
      next: null,
      coverLinks: {
        [PHOTO]: { card: "https://photos.example/a-card", thumb: "https://photos.example/a-thumb" },
      },
    });
  },
}));

import { FIRST_PAGE_DEADLINE_MS, readFirstFeedPage } from "./first-screen";

const ORIGIN = "https://ethio.example";
const at = (path: string, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}${path}`, { headers });

beforeEach(() => {
  state.e2e = false;
  state.geo = { country: null, regionCode: null, city: null, lat: null, lng: null };
  state.asked = [];
  state.feedStatus = 200;
  state.feedDelayMs = 0;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("readFirstFeedPage (D234 S5)", () => {
  it("FSP-1 a saved place on /: the feed read for that place, its first cover named", async () => {
    const held = await readFirstFeedPage(at("/"), `ET:${ADAMA}:1761400000000`);
    expect(held?.path).toBe(`/api/feed?place=${ADAMA}`);
    expect(held?.page.cards.map((entry) => entry.id)).toEqual(["a"]);
    expect(held?.covers).toEqual(["https://photos.example/a-card"]);
    expect(state.asked).toEqual([
      "/api/locations",
      "/api/locations/ET",
      `/api/feed?place=${ADAMA}`,
    ]);
  });

  it("FSP-2 /c/<slug>: the category's id from the tree; an unknown slug reads no feed", async () => {
    const held = await readFirstFeedPage(at("/c/phones"), null);
    expect(held?.path).toBe(`/api/feed?category=${LEAF}`);
    state.asked = [];
    expect(await readFirstFeedPage(at("/c/no-such-slug"), null)).toBeNull();
    expect(state.asked.some((path) => path.startsWith("/api/feed"))).toBe(false);
  });

  it("FSP-3 the guess, when its country is an open market: the market's place, as the shell derives it", async () => {
    state.geo = { country: "ET", regionCode: null, city: "Adama", lat: null, lng: null };
    const held = await readFirstFeedPage(at("/"), null);
    expect(held?.path).toBe(`/api/feed?place=${ADAMA}`);
    state.geo = { country: "SE", regionCode: null, city: null, lat: null, lng: null };
    state.asked = [];
    expect((await readFirstFeedPage(at("/"), null))?.path).toBe("/api/feed");
    // A closed market's tree is never asked: the shell would not ask it either.
    expect(state.asked).toEqual(["/api/locations", "/api/feed"]);
    expect((await readFirstFeedPage(at("/"), "everywhere:1761400000000"))?.path).toBe("/api/feed");
  });

  it("FSP-4 any other page, and the E2E build's switch: no first page, nothing read", async () => {
    expect(await readFirstFeedPage(at("/l/an-ad"), null)).toBeNull();
    state.e2e = true;
    expect(
      await readFirstFeedPage(
        at("/", { cookie: "ethio_lang_star=am; e2e_first_screen=off" }),
        null,
      ),
    ).toBeNull();
    expect(state.asked).toEqual([]);
    state.e2e = false;
    expect(
      await readFirstFeedPage(
        at("/", { cookie: "ethio_lang_star=am; e2e_first_screen=off" }),
        null,
      ),
    ).not.toBeNull();
  });

  it("FSP-5 a refused or failed feed read: no first page (the browser reads as before)", async () => {
    state.feedStatus = 500;
    expect(await readFirstFeedPage(at("/"), null)).toBeNull();
  });

  it("FSP-6 the deadline: past it, no first page, one [first-screen] line", async () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    state.feedDelayMs = FIRST_PAGE_DEADLINE_MS * 2;
    const held = readFirstFeedPage(at("/"), null);
    await vi.advanceTimersByTimeAsync(FIRST_PAGE_DEADLINE_MS + 1);
    expect(await held).toBeNull();
    expect(warn).toHaveBeenCalledWith("[first-screen] deadline passed; the browser reads the feed");
    warn.mockRestore();
  });
});
FILE-END src/server/first-screen.test.ts
C3. src/features/feed/use-feed.ts, these edits (the first read takes the server's page for its very address, once):
EDIT src/features/feed/use-feed.ts #1
OLD-BEGIN

import type { PhotoLinks } from "@/features/posting/photo-links";
import { parseFeedPage, type FeedListing } from "./feed-page";

export type { FeedListing } from "./feed-page";
OLD-END
NEW-BEGIN

import type { PhotoLinks } from "@/features/posting/photo-links";
import { feedPath, parseFeedPage, type FeedListing, type FirstFeedPage } from "./feed-page";

export type { FeedListing } from "./feed-page";
NEW-END
EDIT src/features/feed/use-feed.ts #2
OLD-BEGIN
   */
  enabled?: boolean;
}

OLD-END
NEW-BEGIN
   */
  enabled?: boolean;
  /**
   * D234 S5 — the first page the server answered inside the page (root loader,
   * src/server/first-screen.ts): the first read takes it when it is the very
   * address that read asks, once per page load; otherwise the read goes out.
   */
  firstPage?: Promise<FirstFeedPage | null> | null;
}

NEW-END
EDIT src/features/feed/use-feed.ts #3
OLD-BEGIN
  after: string | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  const params = new URLSearchParams();
  if (categoryId !== null) params.set("category", categoryId);
  if (placeId !== null) params.set("place", placeId);
  if (after !== null) params.set("after", after);
  const query = params.toString();
  const answer = await callRoute(query === "" ? "/api/feed" : `/api/feed?${query}`, {
    auth: "none",
  });
  if (answer.kind !== "answered" || answer.status !== 200) return null;
  return parseFeedPage(answer.payload);
}

/**
 * Bundle 10 E3b — the listings pages' read: /api/feed, one page of 20 at a
OLD-END
NEW-BEGIN
  after: string | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  const answer = await callRoute(feedPath(categoryId, placeId, after), { auth: "none" });
  if (answer.kind !== "answered" || answer.status !== 200) return null;
  return parseFeedPage(answer.payload);
}

/** D234 S5 — a server's first page is taken at most once (a later mount reads afresh). */
const takenFirstPages = new WeakSet<Promise<FirstFeedPage | null>>();

/**
 * D234 S5 — the first read: the server's first page when it answers this very
 * address, once; any other address, a page already taken, none at all, or a
 * failed hand-over reads as before.
 */
async function firstRead(
  categoryId: string | null,
  placeId: string | null,
  firstPage: Promise<FirstFeedPage | null> | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  if (firstPage === null || takenFirstPages.has(firstPage)) {
    return readPage(categoryId, placeId, null);
  }
  takenFirstPages.add(firstPage);
  const held = await firstPage;
  if (held !== null && held.path === feedPath(categoryId, placeId, null)) return held.page;
  return readPage(categoryId, placeId, null);
}

/**
 * Bundle 10 E3b — the listings pages' read: /api/feed, one page of 20 at a
NEW-END
EDIT src/features/feed/use-feed.ts #4
OLD-BEGIN
  placeId = null,
  enabled = true,
}: UseFeedOptions = {}) {
  const [cards, setCards] = useState<FeedListing[]>([]);
OLD-END
NEW-BEGIN
  placeId = null,
  enabled = true,
  firstPage = null,
}: UseFeedOptions = {}) {
  const [cards, setCards] = useState<FeedListing[]>([]);
NEW-END
EDIT src/features/feed/use-feed.ts #5
OLD-BEGIN
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);

  // The first page: a change of category, place or enabled starts over.
OLD-END
NEW-BEGIN
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);
  /** D234 S5 — the server's first page as this mount received it (a later loader run never restarts the feed). */
  const [heldFirstPage] = useState(firstPage);

  // The first page: a change of category, place or enabled starts over.
NEW-END
EDIT src/features/feed/use-feed.ts #6
OLD-BEGIN
    setMoreError(false);
    if (!enabled) return;
    readPage(categoryId, placeId, null)
      .then((page) => {
        if (generation.current !== mine) return;
OLD-END
NEW-BEGIN
    setMoreError(false);
    if (!enabled) return;
    firstRead(categoryId, placeId, heldFirstPage)
      .then((page) => {
        if (generation.current !== mine) return;
NEW-END
EDIT src/features/feed/use-feed.ts #7
OLD-BEGIN
        setIsLoading(false);
      });
  }, [categoryId, placeId, enabled, firstToken]);

  const hasMore = next !== null;
OLD-END
NEW-BEGIN
        setIsLoading(false);
      });
  }, [categoryId, placeId, enabled, firstToken, heldFirstPage]);

  const hasMore = next !== null;
NEW-END
NEW src/features/feed/use-feed.test.ts (sha256 a0ab9aa389b14d6d92108c4cf3018e58b6d7262541c9f20f1307dd4442cb07a1):
FILE-BEGIN src/features/feed/use-feed.test.ts
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { feedPath, parseFeedPage, type FeedPage, type FirstFeedPage } from "./feed-page";
import { useFeed } from "./use-feed";

/**
 * D234 speed turn S5 — UFS-1…UFS-4. The feed's first read takes the page the
 * server answered inside the page when it is the very address that read asks,
 * once per page load; anything else reads as before (the route client is
 * mocked; RCL-* own the transport's contract).
 */
const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute }));

const PLACE = "11111111-1111-4111-8111-111111111111";

function card(id: string) {
  return {
    id,
    publicId: `pub-${id}`,
    title: `Ad ${id}`,
    tier: "regular",
    priceAmount: null,
    priceCurrency: null,
    priceMode: "contact",
    priceBp: null,
    priceNegotiable: false,
    pricePeriod: "once",
    priceUnit: null,
    priceUnitText: null,
    photosSoon: false,
    coverPhotoId: null,
    soldWord: null,
    reserved: false,
    priceWas: null,
    publishedAt: "2026-10-17T00:00:00Z",
    categoryId: "c-leaf",
    locationId: PLACE,
    locationNameEn: "Place",
    locationNameAm: null,
    step: 1,
  };
}

/** The page as the server hands it over: the route's answer read by parseFeedPage. */
function served(ids: string[]): FeedPage {
  const page = parseFeedPage({ cards: ids.map(card), ladder: [PLACE], steps: [1], next: null });
  if (page === null) throw new Error("UFS: the fixture page does not parse");
  return page;
}

function answered(ids: string[]) {
  return {
    kind: "answered",
    status: 200,
    ok: true,
    payload: { cards: ids.map(card), ladder: [PLACE], steps: [1], next: null },
    error: null,
    detail: null,
    headers: new Headers(),
    bytes: null,
  };
}

afterEach(() => {
  callRoute.mockReset();
});

describe("useFeed's first page from the server (D234 S5)", () => {
  it("UFS-1 the server's page for the very address is the first page; nothing is asked", async () => {
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["a", "b"]),
      covers: [],
    });
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cards.map((entry) => entry.id)).toEqual(["a", "b"]);
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UFS-2 a page for another address, none at all, or a failed hand-over: the read goes out", async () => {
    callRoute.mockResolvedValue(answered(["read"]));
    for (const held of [
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath("other", PLACE, null),
        page: served(["stale"]),
        covers: [],
      }),
      Promise.resolve<FirstFeedPage | null>(null),
    ]) {
      callRoute.mockClear();
      const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage: held }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.cards.map((entry) => entry.id)).toEqual(["read"]);
      expect(callRoute).toHaveBeenCalledWith(feedPath(null, PLACE, null), { auth: "none" });
    }
  });

  it("UFS-3 the server's page is taken once: a second mount with the same page reads afresh", async () => {
    callRoute.mockResolvedValue(answered(["fresh"]));
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["held"]),
      covers: [],
    });
    const first = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(first.result.current.isLoading).toBe(false));
    expect(first.result.current.cards.map((entry) => entry.id)).toEqual(["held"]);
    first.unmount();
    const second = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(second.result.current.isLoading).toBe(false));
    expect(second.result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]);
  });

  it("UFS-4 Retry reads afresh, never the server's page again", async () => {
    callRoute.mockResolvedValue(answered(["fresh"]));
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["held"]),
      covers: [],
    });
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});
FILE-END src/features/feed/use-feed.test.ts
C4. src/routes/__root.tsx, these edits (the server function, started unawaited by the loader's server branch; the client branch carries none):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
import { NoInputSchema } from "@/lib/schemas/server-fns";
OLD-END
NEW-BEGIN
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
import type { FirstFeedPage } from "@/features/feed/feed-page";
import { NoInputSchema } from "@/lib/schemas/server-fns";
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
const LANGUAGE_GATE_TIMEOUT_MS = 1500;
const getSsrLangContext = createServerFn({ method: "GET" })
OLD-END
NEW-BEGIN
const LANGUAGE_GATE_TIMEOUT_MS = 1500;
/**
 * D234 S5 — the feed's first page for a listings page, read by the server
 * (src/server/first-screen.ts); null for any other page and on any failure.
 */
const getFirstFeedPage = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async (): Promise<FirstFeedPage | null> => {
    const rawArea = getCookie(AREA_COOKIE) ?? null;
    const { readFirstFeedPage } = await import("../server/first-screen");
    return readFirstFeedPage(getRequest(), rawArea && AREA_SHAPE.test(rawArea) ? rawArea : null);
  });

/** The root's loader data: the request's language and area facts, and the feed's first page. */
type RootData = SsrLangContext & {
  /** D234 S5 — the server's own document only; a client navigation carries none. */
  firstFeed: Promise<FirstFeedPage | null> | null;
};

/** Never a rejection: a failed hand-over is one [first-screen] line and the browser reads the feed. */
function startFirstFeedPage(): Promise<FirstFeedPage | null> {
  return getFirstFeedPage().catch((error: unknown) => {
    console.warn("[first-screen] the first page was not handed over:", errorText(error));
    return null;
  });
}

const getSsrLangContext = createServerFn({ method: "GET" })
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN
  // server-function URL the RPC was issued against.
  loader: async (): Promise<SsrLangContext> => {
    const data = await getSsrLangContext();
    if (typeof window === "undefined") return data;
    return {
OLD-END
NEW-BEGIN
  // server-function URL the RPC was issued against.
  loader: async (): Promise<RootData> => {
    // D234 S5 — the server starts the feed's first page at once and hands it over
    // unawaited: the page's shell is sent without waiting, the page streams in.
    const firstFeed = typeof window === "undefined" ? startFirstFeedPage() : null;
    const data = await getSsrLangContext();
    if (typeof window === "undefined") return { ...data, firstFeed };
    return {
NEW-END
EDIT src/routes/__root.tsx #4
OLD-BEGIN
      firstReads: [],
    };
OLD-END
NEW-BEGIN
      firstReads: [],
      firstFeed: null,
    };
NEW-END
C5. src/components/marketplace/feed.tsx, these edits (the root loader's first page handed to useFeed; its covers preloaded under Suspense/Await):
EDIT src/components/marketplace/feed.tsx #1
OLD-BEGIN
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, type ReactNode } from "react";

OLD-END
NEW-BEGIN
import { cn } from "@/lib/utils";
import { Suspense, useEffect, useId, useRef, type ReactNode } from "react";
import { preload } from "react-dom";
import { Await, useRouterState } from "@tanstack/react-router";

NEW-END
EDIT src/components/marketplace/feed.tsx #2
OLD-BEGIN
import { useCategoryTree } from "@/features/categories/category-tree";
import { feedSections, inviteSpot, placeCount, type InviteSpot } from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
OLD-END
NEW-BEGIN
import { useCategoryTree } from "@/features/categories/category-tree";
import {
  feedSections,
  inviteSpot,
  placeCount,
  type FirstFeedPage,
  type InviteSpot,
} from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
NEW-END
EDIT src/components/marketplace/feed.tsx #3
OLD-BEGIN
  const placeId = place?.id ?? null;
  const {
OLD-END
NEW-BEGIN
  const placeId = place?.id ?? null;
  // D234 S5 — the feed's first page as the server answered it inside the page (the root loader).
  const firstFeed = useRouterState({
    select: (state) =>
      (
        state.matches[0]?.loaderData as
          | { firstFeed?: Promise<FirstFeedPage | null> | null }
          | undefined
      )?.firstFeed ?? null,
  });
  const {
NEW-END
EDIT src/components/marketplace/feed.tsx #4
OLD-BEGIN
    enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found"),
  });
OLD-END
NEW-BEGIN
    enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found"),
    firstPage: firstFeed,
  });
NEW-END
EDIT src/components/marketplace/feed.tsx #5
OLD-BEGIN
      <div className="mt-4">{body}</div>
    </section>
OLD-END
NEW-BEGIN
      <div className="mt-4">{body}</div>
      {firstFeed !== null ? (
        // D234 S5 — the first cards' covers are asked for as the server's page streams in.
        <Suspense fallback={null}>
          <Await promise={firstFeed}>
            {(held) => {
              for (const cover of held?.covers ?? []) {
                preload(cover, { as: "image", fetchPriority: "high" });
              }
              return null;
            }}
          </Await>
        </Suspense>
      ) : null}
    </section>
NEW-END

PART D — THE BROWSER TESTS.
D1. e2e/shell.spec.ts, e2e/feed-screens.spec.ts and e2e/ad-page.spec.ts, these edits (the three tests of the browser's own first read carry the E2E-only cookie; AP-53 added after AP-49):
EDIT e2e/shell.spec.ts #1
OLD-BEGIN
  test("the self-drawing spinner renders while the feed loads", async ({ page }) => {
OLD-END
NEW-BEGIN
  test("the self-drawing spinner renders while the feed loads", async ({ page, baseURL }) => {
    // D234 S5 — the browser's own feed read is what this test holds open: the server's first page is off.
    await page.context().addCookies([{ name: "e2e_first_screen", value: "off", url: baseURL }]);
NEW-END
EDIT e2e/feed-screens.spec.ts #1
OLD-BEGIN

  test("FS-6 a failed read is shown, and Retry recovers", async ({ page }) => {
    const user = await seller();
OLD-END
NEW-BEGIN

  test("FS-6 a failed read is shown, and Retry recovers", async ({ page, baseURL }) => {
    const user = await seller();
NEW-END
EDIT e2e/feed-screens.spec.ts #2
OLD-BEGIN
    const id = await addListing(leaf.id, user.id, c.city.id, "regular", 1);
    let n = 0;
OLD-END
NEW-BEGIN
    const id = await addListing(leaf.id, user.id, c.city.id, "regular", 1);
    // D234 S5 — the browser's own feed read is what fails here: the server's first page is off.
    await page.context().addCookies([{ name: "e2e_first_screen", value: "off", url: baseURL }]);
    let n = 0;
NEW-END
EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN
  test("AP-49 the feed's first page asks no second request for its photos (DEC-195)", async ({
    page,
  }) => {
    // One scratch seller's three live ads with photos in a scratch leaf: the
OLD-END
NEW-BEGIN
  test("AP-49 the feed's first page asks no second request for its photos (DEC-195)", async ({
    page,
    baseURL,
  }) => {
    // One scratch seller's three live ads with photos in a scratch leaf: the
NEW-END
EDIT e2e/ad-page.spec.ts #2
OLD-BEGIN
        photoLinkPosts.push(request.url());
    });
    const feedAnswer = page.waitForResponse(
      (response) => response.url().includes("/api/feed") && response.status() === 200,
OLD-END
NEW-BEGIN
        photoLinkPosts.push(request.url());
    });
    // D234 S5 — this test proves the browser's own feed read: the server's first page is off.
    await page.context().addCookies([{ name: "e2e_first_screen", value: "off", url: baseURL }]);
    const feedAnswer = page.waitForResponse(
      (response) => response.url().includes("/api/feed") && response.status() === 200,
NEW-END
EDIT e2e/ad-page.spec.ts #3
OLD-BEGIN
  });

  test("AP-46 Save and Share sit in the title box", async ({ page }) => {
    const seller = await scratchSeller();
OLD-END
NEW-BEGIN
  });

  test("AP-53 the feed's first page arrives with the page: no browser read, its first cover asked for at once (D234 S5)", async ({
    page,
  }) => {
    // One scratch seller's three live ads with photos in a scratch leaf: the
    // leaf's feed holds only the seeded cards.
    const seller = await scratchSeller();
    const ads = [await seed(seller), await seed(seller), await seed(seller)];
    for (const ad of ads) await seedPhotos(ad.id);
    const feedReads: string[] = [];
    const photoLinkPosts: string[] = [];
    page.on("request", (request) => {
      const { pathname } = new URL(request.url());
      if (pathname === "/api/feed") feedReads.push(request.url());
      if (pathname === "/api/media/photo-links" && request.method() === "POST")
        photoLinkPosts.push(request.url());
    });
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.getByTestId("listing-card")).toHaveCount(3);
    // The server read the first page inside the page; the browser asked none.
    expect(feedReads).toEqual([]);
    expect(photoLinkPosts).toEqual([]);
    // The first cards' covers were named in the page as high-priority image preloads,
    // and the first card draws the very link the server preloaded.
    const preloaded = await page
      .locator('link[rel="preload"][as="image"]')
      .evaluateAll((nodes) =>
        nodes
          .filter((node) => node.getAttribute("fetchpriority") === "high")
          .map((node) => node.getAttribute("href")),
      );
    expect(preloaded).toHaveLength(3);
    const src = await page
      .getByTestId("listing-card-picture")
      .locator("img")
      .nth(0)
      .getAttribute("src");
    expect(src !== null && preloaded.includes(src)).toBe(true);
  });

  test("AP-46 Save and Share sit in the title box", async ({ page }) => {
    const seller = await scratchSeller();
NEW-END

PART E — DOCS.
E1. docs/features/performance-strategy.md: a new section at the end, "## 11. The feed's first page arrives with the page (D234, Foundations turn 28)": readFirstFeedPage (the request's facts, the four routes asked in-process with no session, the shared derivation, the 2-second deadline, null on anything else); started unawaited by the root loader's server branch, so the shell is sent at once and the page streams in (a bot gets the whole page); taken once by useFeed's first read for its very address; the first covers preloaded at high priority; the E2E-only cookie and the three tests that keep the browser's own read; DIA-6 the equivalence proof, AP-53 the browser proof; next: the cards drawn by the server.
E2. docs/governance/mechanisms.md: add this line directly after the row-45 line (the line that begins "| 45 |"):
   | 46 | The listings pages' first screen arrives with the page: the server reads the feed's first page and hands it over in the page stream; the browser's first read of that address takes it once (D234) | `readFirstFeedPage` (`src/server/first-screen.ts`) started by the root loader (`getFirstFeedPage`, `__root.tsx`); taken by `useFeed` (`firstPage`); covers preloaded in `feed.tsx`; one derivation `initialCountries` + `deriveInitialArea` (`location-data.ts`), one address `feedRouteOf` + `feedPath` (`feed-page.ts`), one parser per read | `src/components/shell/location-data.test.ts` (DIA-1…6; DIA-6 the equivalence proof), `src/server/first-screen.test.ts` (FSP-1…6), `src/features/feed/use-feed.test.ts` (UFS-1…4), `e2e/ad-page.spec.ts` AP-53 | the E2E-only cookie `e2e_first_screen=off` (isE2E; the spinner test, FS-6, AP-49 — they prove the browser's own read) | any listings page; the cards drawn by the server next | Foundations turn 28 |
E3. docs/_changelog.md one entry "Foundations turn 28 (2026-10-25)"; roadmap.md the turn-28 line `[x]` with the final HEAD and the unit totals.
E4. AGENTS.md: replace the line that begins "- Speed (D234): each page's first-download ceiling" with exactly this one line (AGENTS.md then counts 6594 bytes by `wc -c AGENTS.md`):
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; the listings pages' first feed page comes from the server in the page stream (`readFirstFeedPage`, src/server/first-screen.ts) and useFeed takes it once; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
c0a4cdcb9176e32616e6ec608e43080fdf2a30af7be58f492636fffde8e49ec4  src/components/shell/location-data.ts
e012aa149cee50292b97c1d70144f67824fb41036c9cefec0dcd894d9d8cab16  src/components/app-shell.tsx
7838e5c5c95361e4a2f9760b486e2369552be063785e4393a3c0f3d2749e965d  src/features/categories/category-tree.ts
e58f7003d8909391ed0a5fcf629a0dfb169d535d09bed495c15cc610a1ef6c2f  src/features/categories/category-tree.test.ts
9b8ed69243dc1cad067a7d27d6ff27536230455eff84477e9fcf6542753aaa84  src/features/feed/feed-page.ts
68f0544105938b6ab8e8c4ca98741a87b0fc5a5b234e26a2ee1d814c31bd4377  src/features/feed/feed-page.test.ts
2230af7224a67e99357a9706d961dd12c7fd306bebf2546570c57bf29e13eb15  src/routes/api/locations.ts
49761528bf0caa381fe8927cd00ba6a11ab1895eb5d6d504e700ad67d9927c2b  src/routes/api/locations.$country.ts
10c11cecaff9e06828ce0a4741c13a1e073c8af814ff7c3c1012b5ec311de668  src/routes/api/categories.tree.ts
d851086779d4a43b9023a76d755255294585566345c0894dfa45be671700a2e2  src/routes/api/feed.ts
b286de4fedf7843791ea538e284723721d853530cace9d44faf0968382dab336  src/features/feed/use-feed.ts
de214a68b4baddefad56143b47002743d2a8d76353602fb87b3f7cb4af63b49e  src/routes/__root.tsx
79398387751850b891f8d1ba99a9432e8eb2adafad034ae9363b9ba92f5bf645  src/components/marketplace/feed.tsx
71546304b79316f83161a47e7a6ba138388be62169739d05ddf276915c9c5536  e2e/shell.spec.ts
5491887a5c3b276de0b6c6b649f4ff2824f4b13968189e2bc5e319e155ea0690  e2e/feed-screens.spec.ts
647cc90a646e9ece41ed3aa6dfae8588314ea99987470d98776db6682dfd9fbd  e2e/ad-page.spec.ts
837b1056fa4637fc01bafcd27eeb441f7e5875b5f3a785ea8c13d6471c6ce0c5  AGENTS.md
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — unchanged); `bun run test:unit` (paste totals and the DIA-, FSP-, UFS-, FP-15 and FRO-1 lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: both maps' "scanned" 571 → 572, nothing else); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- <spec file> --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/ad-page.spec.ts by `--grep "AP-49 |AP-53 "` (the browser's own read with the cookie; the first page from the page); e2e/feed-screens.spec.ts by `--grep "FS-6 "` (a failed browser read and Retry); e2e/shell.spec.ts by `--grep "spinner renders|LS-3 |LS-6 |LS-10 |LS-12 |EV-1 |FRL-6 "` (the spinner; the guess, geometry, a saved area over the guess, the auto-select law, every area — the shared derivation in the browser); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-28.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
