# Foundations — turn 27: speed S4 — the reads every page makes start with the page (D234): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 27 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at a025b400d4ff845574b1b7ed5619be1223b6151e). Tier B (the root route's head and loader; three readers' path builders). No migration. No new string. No package change. AGENTS.md: its speed line names firstReadLinks (D4). Base: dev a025b400d4ff845574b1b7ed5619be1223b6151e (Foundations turn 26's final commit; its CI run: A1). Before sending, every new line was read against every line of AGENTS.md and against the platform rules you quoted on 25 Oct: no new control; no map read by an outside key; no silent catch; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the reads every page makes start with the page; C — the proof in the browser; D — docs, register, roadmap, changelog, AGENTS.md.
BASE: a025b400d4ff845574b1b7ed5619be1223b6151e
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/lib/first-reads.ts
src/lib/first-reads.test.ts
src/routes/__root.tsx
src/components/shell/location-data.ts
src/features/categories/category-tree.ts
e2e/shell.spec.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: a read every page makes starts with the page, not after the code: the browser asks for it while the code downloads, and the page's own reader takes that answer instead of asking again.
MECHANISM: NONE YET — built in B1 as NEW src/lib/first-reads.ts, `firstReadLinks(facts)`: the server names, in the page's <head>, `<link rel="preload" as="fetch" crossorigin="anonymous">` for the category tree, the open markets, the saved market's tree and the language's approved strings — each address from its reader's own path builder (`CATEGORY_TREE_PATH`, `MARKETS_PATH`, `treePath(country)`, `bundleUrl(lang)`). The mode and credentials are the readers' own (`callRoute`'s and `fetchUiBundle`'s plain same-origin fetch), so Chrome hands the preloaded answer to the reader: one network request per read (the supervisor's Playwright check on a local build, 25 Oct: with `crossorigin="anonymous"` one request, with `cache: "no-cache"` too, five seconds later too; without it, two). The server names them from its own request only (the root loader's server branch); a client navigation names none.
CONSUMERS (every read the shell makes on every page, at BASE): src/features/categories/category-tree.ts :282 (readCategoryTree — the rail and the slug lookup; every page); src/components/shell/location-data.ts :159 (fetchMarkets — useOpenMarkets in app-shell.tsx :185; every page) and :179 (fetchTree — useCountryTree(treeCountry) in app-shell.tsx :200; every page with a saved or guessed market); src/i18n/bundle.ts :101 (fetchUiBundle — provider.tsx :545, the applied language's approved strings once sign-in state settles; every page). Not preloaded, each with its reason: the guessed market's tree (the server does not know whether the guessed country is an open market without a read — S5 answers it on the server); the publication gate list (provider.tsx fetchPublicLanguages: an apikey header to the database host, which a preload cannot carry, and INC-113's no-store); the entity bundle (an RPC POST).
COVERED HERE: all four preloadable reads. LEFT: the three above, with their reasons; S5 next.
CONFORMANCE GUARD: src/lib/first-reads.test.ts FRL-5 runs the four readers against a recording route client and fetch and requires every preloaded address to be one they asked — a preload that drifts from its read fails; FRL-1…4 pin the choice (saved market only; ?lang ▸ star ▸ base, gate-listed) and the mode. e2e/shell.spec.ts FRL-6 proves the hand-over in the browser: the head names the reads, and the markets are asked once.
EXCEPTIONS: none.
FIVE LENSES — security: the preloads are the same anonymous public reads the readers make (no session, no cookie identity in any address); the area cookie's country reaches a URL only after AREA_SHAPE (the root) and parseAreaCookie (two letters), the language only after the code shape and the gate list; no new endpoint · performance: four reads leave the chain behind the code — on the lab's phone (562.5 ms latency) the markets and the saved market's tree were asked only after hydration and the feed waited for both; now they arrive while the code downloads (ESTIMATE: the home and category feed start about one round trip sooner, the language strings before sign-in state settles); the bytes are the same answers, HTTP-cached as before; the entry 287.3 → 287.5 KiB and every page +0.2 to +0.3 KiB (the supervisor's build), under every ceiling · failure modes: a failed preload is an ordinary failed read for its reader (the readers' own F4 states, unchanged; the INC-282 test still aborts the tree); an unused preload (a last-used language that is not the star) costs one small cached read; a client navigation names none · consistency: one path builder per read, used by the preload and the reader · future growth: a read every page makes joins `firstReadLinks` with its reader's builder; S5 hands the feed's first page over in the page stream from the same root loader.
FORWARD-SCAN: S5 (next turn) — the feed's first page answered by the server inside the page stream (a deferred loader promise under Suspense, checked by the supervisor on a local node build: the shell flushes at once for a browser, the boundary streams in), its first covers preloaded, the shell's area derived once by one shared function; the roadmap's "SSR renders the star language" study. REGISTER: docs/governance/mechanisms.md — row 45 added (D2); AGENTS.md's speed line names firstReadLinks (D4).

WHY
- The baseline's home page (warm) painted its first card photo at 6.5 s: after the code ran, the shell asked for the markets, then the market's tree, then the feed, then the photos — each a round trip on a slow phone network. The four reads every page makes need nothing the server does not already know, so they start with the page now.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-27.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-27.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-27.md (Foundations turn 27: speed S4 — the reads every page makes start with the page — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 26 (docs/governance/briefs/foundations-turn-26", add `  - [ ] Turn 27 (docs/governance/briefs/foundations-turn-27.md; no migration) — speed S4: the category tree, the markets, the saved market's tree and the language's strings preloaded from the page's head by firstReadLinks, each from its reader's own path builder (D234).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn appends one test to e2e/shell.spec.ts (C1): no fixture, no write, anchored on structure.
- Run no stateful git command. Edits with your file-editing tool or a script that copies the brief's text. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-27.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/governance/mechanisms.md, AGENTS.md (D4 only), docs/governance/reports/foundations-turn-27.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (they move: the new module raises the scanned count by one — the supervisor's run of `bun run i18n:usage` on this change). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each step whole. After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so. No ceiling changes: the supervisor's build of this change holds every page under its line in scripts/route-budgets.mjs; CI's bundle-budget job judges.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-11, EXH-17 and EXH-19 time out in your sandbox (INC-890; they pass in CI), and LL-1 can hit its 5-second limit under the full suite's load (it passes alone). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's spec through `bun run e2e:local -- e2e/shell.spec.ts --grep "<pattern>"` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: every page renders exactly as it does today, on the server and in the browser; the only change is four `<link rel="preload">` lines in the server's <head> and when the browser asks for those four reads. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every reader the shell runs on every page and whether firstReadLinks names it (it must equal CONSUMERS: four named, three left with their reasons); K3 FRL-1…FRL-6 land with the mechanism; K4 no literal language or country code in src (the base language is BASE_LANGUAGE; the tests' "en", "am", "ET" are fixtures); K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened; FRL-5 is the drift guard (a reader whose address changes without its builder fails it).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on a025b400d4ff845574b1b7ed5619be1223b6151e). A red on a025b400d4ff845574b1b7ed5619be1223b6151e is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — THE READS EVERY PAGE MAKES START WITH THE PAGE.
B1. NEW src/lib/first-reads.ts (sha256 82236e2b32d4c83d5b9569b45d01b7076723965989d53aee041ce043ed880974):
FILE-BEGIN src/lib/first-reads.ts
import { MARKETS_PATH, parseAreaCookie, treePath } from "@/components/shell/location-data";
import { CATEGORY_TREE_PATH } from "@/features/categories/category-tree";
import { bundleUrl } from "@/i18n/bundle";

/**
 * D234 speed turn S4 — THE READS EVERY PAGE MAKES START WITH THE PAGE.
 *
 * Every page's shell asks for the category tree, the open markets, the saved
 * market's tree and the language's approved strings, but only once the code
 * has downloaded and run: on a slow phone network each read waited a round
 * trip behind the code. The server already knows them from the request, so the
 * page's <head> names them as `<link rel="preload" as="fetch"
 * crossorigin="anonymous">`: the browser asks while the code downloads, and the
 * reader's own request (the same address, mode and credentials) takes the
 * preloaded answer instead of asking again. Each address comes from its
 * reader's own builder (MARKETS_PATH, treePath, CATEGORY_TREE_PATH, bundleUrl),
 * so a preload cannot drift from its read (FRL-5 proves it).
 *
 * Only what the request itself names is preloaded: the SAVED market's tree
 * (never a guessed one — a closed market would be a wasted read), and the
 * language the client applies first — the address's `?lang`, else the device
 * star, when the publication gate lists it; else the base language.
 */
export interface FirstReadLink {
  rel: "preload";
  as: "fetch";
  href: string;
  crossOrigin: "anonymous";
}

/** A well-formed language code. Shape only; the gate list decides. */
const CODE_SHAPE = /^[a-z]{2,8}(-[a-z]{2,8})?$/i;

function link(href: string): FirstReadLink {
  return { rel: "preload", as: "fetch", href, crossOrigin: "anonymous" };
}

/** The language whose approved strings the client asks for first. */
function firstLanguage(
  requested: string | null,
  star: string | null,
  gate: ReadonlyArray<{ code: string }>,
  base: string,
): string {
  const listed = (code: string | null): code is string =>
    code !== null && CODE_SHAPE.test(code) && gate.some((row) => row.code === code);
  if (listed(requested)) return requested;
  if (requested === null && listed(star)) return star;
  return base;
}

export function firstReadLinks(facts: {
  /** The `ethio_area` cookie as the request carried it (shape-checked), or null. */
  areaCookie: string | null;
  /** The device star cookie (shape-checked), or null. */
  star: string | null;
  /** The address's `?lang`, or null. */
  requested: string | null;
  /** The publication gate's rows as the server read them. */
  languages: ReadonlyArray<{ code: string }>;
  /** The base language. */
  base: string;
}): FirstReadLink[] {
  const links = [link(CATEGORY_TREE_PATH), link(MARKETS_PATH)];
  const saved = parseAreaCookie(facts.areaCookie);
  if (saved !== null) links.push(link(treePath(saved.country)));
  links.push(
    link(bundleUrl(firstLanguage(facts.requested, facts.star, facts.languages, facts.base))),
  );
  return links;
}
FILE-END src/lib/first-reads.ts
NEW src/lib/first-reads.test.ts (sha256 acccdc07acded4eab89da5408b9c3ada2fcad593d8f76159d7bff4f91494f075):
FILE-BEGIN src/lib/first-reads.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useCountryTree, useOpenMarkets } from "@/components/shell/location-data";
import { readCategoryTree } from "@/features/categories/category-tree";
import { fetchUiBundle } from "@/i18n/bundle";

import { firstReadLinks } from "./first-reads";

/**
 * D234 speed turn S4 — FRL-1…FRL-5. The links the page's head names, and the
 * proof that each one is the very address its reader asks (the route client
 * and fetch are mocked; RCL-* own the transport's contract).
 */
const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute }));

const SAVED = "ET:3f2c1a9e-8b7d-4c6e-9a1b-2d3e4f5a6b7c:1761400000000";
const GATE = [{ code: "en" }, { code: "am" }];

function hrefs(links: ReturnType<typeof firstReadLinks>): string[] {
  return links.map((entry) => entry.href);
}

afterEach(() => {
  callRoute.mockReset();
  vi.unstubAllGlobals();
});

describe("firstReadLinks (D234 S4)", () => {
  it("FRL-1 a saved market and a listed star: the tree, the markets, that market's tree, the star's strings", () => {
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    expect(hrefs(links)).toEqual([
      "/api/categories/tree",
      "/api/locations",
      "/api/locations/ET",
      "/api/i18n/am",
    ]);
  });

  it("FRL-2 no saved market (none, or every area): no market tree; no star: the base language", () => {
    for (const areaCookie of [null, "everywhere:1761400000000"]) {
      const links = firstReadLinks({
        areaCookie,
        star: null,
        requested: null,
        languages: GATE,
        base: "en",
      });
      expect(hrefs(links)).toEqual(["/api/categories/tree", "/api/locations", "/api/i18n/en"]);
    }
  });

  it("FRL-3 the address's ?lang wins when the gate lists it; an unlisted one, or an unlisted star, gives the base", () => {
    const at = (requested: string | null, star: string | null) =>
      hrefs(firstReadLinks({ areaCookie: null, star, requested, languages: GATE, base: "en" })).at(
        -1,
      );
    expect(at("am", null)).toBe("/api/i18n/am");
    expect(at("en", "am")).toBe("/api/i18n/en");
    expect(at("om", "am")).toBe("/api/i18n/en");
    expect(at("x!", "am")).toBe("/api/i18n/en");
    expect(at(null, "om")).toBe("/api/i18n/en");
  });

  it("FRL-4 every link is a fetch preload in the readers' own mode (anonymous, same-origin credentials)", () => {
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    for (const entry of links) {
      expect(entry).toMatchObject({ rel: "preload", as: "fetch", crossOrigin: "anonymous" });
    }
  });

  it("FRL-5 each link is the very address its reader asks, so the preloaded answer is the one it takes", async () => {
    callRoute.mockResolvedValue({ kind: "unreachable", reason: "network" });
    const fetched: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        fetched.push(String(input));
        return new Response(JSON.stringify({ bundle: { "app.name": "x" } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }),
    );

    await expect(readCategoryTree()).rejects.toThrow("category tree read failed");
    const markets = renderHook(() => useOpenMarkets());
    const tree = renderHook(() => useCountryTree("ET"));
    await waitFor(() => expect(markets.result.current.isLoading).toBe(false));
    await waitFor(() => expect(tree.result.current.isLoading).toBe(false));
    await fetchUiBundle("am");

    const asked = [...callRoute.mock.calls.map((call) => String(call[0])), ...fetched];
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    for (const href of hrefs(links)) expect(asked).toContain(href);
  });
});
FILE-END src/lib/first-reads.test.ts
B2. src/components/shell/location-data.ts, these edits (the markets' and a market tree's addresses get one builder each, used by the reader and by firstReadLinks):
EDIT src/components/shell/location-data.ts #1
OLD-BEGIN

async function fetchMarkets(): Promise<OpenMarket[]> {
  const answer = await callRoute("/api/locations", { auth: "none" });
  if (answer.kind !== "answered" || !answer.ok) {
OLD-END
NEW-BEGIN

/** The open markets' read (D234 S4: the page's head preloads this same address, src/lib/first-reads.ts). */
export const MARKETS_PATH = "/api/locations";

/** A market's tree read (D234 S4: the page's head preloads this same address for the saved market). */
export function treePath(country: string): `/api/${string}` {
  return `/api/locations/${encodeURIComponent(country)}`;
}

async function fetchMarkets(): Promise<OpenMarket[]> {
  const answer = await callRoute(MARKETS_PATH, { auth: "none" });
  if (answer.kind !== "answered" || !answer.ok) {
NEW-END
EDIT src/components/shell/location-data.ts #2
OLD-BEGIN
async function fetchTree(country: string): Promise<TreeNode[]> {
  const answer = await callRoute(`/api/locations/${encodeURIComponent(country)}`, {
    auth: "none",
  });
  if (answer.kind !== "answered" || !answer.ok) {
OLD-END
NEW-BEGIN
async function fetchTree(country: string): Promise<TreeNode[]> {
  const answer = await callRoute(treePath(country), { auth: "none" });
  if (answer.kind !== "answered" || !answer.ok) {
NEW-END
B3. src/features/categories/category-tree.ts, these edits (the tree's address, one constant for the reader and firstReadLinks):
EDIT src/features/categories/category-tree.ts #1
OLD-BEGIN
}

/**
 * The raw read: one public route, never the browser client, so the tree carries
OLD-END
NEW-BEGIN
}

/** The tree's read (D234 S4: the page's head preloads this same address, src/lib/first-reads.ts). */
export const CATEGORY_TREE_PATH = "/api/categories/tree";

/**
 * The raw read: one public route, never the browser client, so the tree carries
NEW-END
EDIT src/features/categories/category-tree.ts #2
OLD-BEGIN
 */
export async function readCategoryTree(): Promise<{ tree: CategoryTree; version: string }> {
  const answer = await callRoute("/api/categories/tree", { auth: "none", cache: "no-cache" });
  // Law F4 — a failed read is a failure, never an empty tree that reads as
  // "there are no categories". The caller renders the error state.
OLD-END
NEW-BEGIN
 */
export async function readCategoryTree(): Promise<{ tree: CategoryTree; version: string }> {
  const answer = await callRoute(CATEGORY_TREE_PATH, { auth: "none", cache: "no-cache" });
  // Law F4 — a failed read is a failure, never an empty tree that reads as
  // "there are no categories". The caller renders the error state.
NEW-END
B4. src/routes/__root.tsx, these edits (the root's server read names the first reads from its own request; the loader's client branch names none; the head places them after the stylesheet):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
import { AppShell } from "../components/app-shell";
import { I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { serverShellLanguage } from "../i18n/server-shell-language";
OLD-END
NEW-BEGIN
import { AppShell } from "../components/app-shell";
import { BASE_LANGUAGE, I18nProvider, useI18n, LANGUAGE_STAR_COOKIE } from "../i18n";
import { serverShellLanguage } from "../i18n/server-shell-language";
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
import { errorText } from "@/lib/error-text";
import { NoInputSchema } from "@/lib/schemas/server-fns";
OLD-END
NEW-BEGIN
import { errorText } from "@/lib/error-text";
import { firstReadLinks, type FirstReadLink } from "@/lib/first-reads";
import { NoInputSchema } from "@/lib/schemas/server-fns";
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN
  geo: GeoAnswer;
};
OLD-END
NEW-BEGIN
  geo: GeoAnswer;
  /**
   * D234 S4 — the reads every page makes, preloaded from the page's <head>
   * (src/lib/first-reads.ts). Named by the server for its own document only;
   * a client navigation carries none.
   */
  firstReads: FirstReadLink[];
};
NEW-END
EDIT src/routes/__root.tsx #4
OLD-BEGIN

    return { star, languages, origin: url.origin, path: url.pathname, areaCookie, geo };
  });
OLD-END
NEW-BEGIN

    const firstReads = firstReadLinks({
      areaCookie,
      star,
      requested: url.searchParams.get("lang"),
      languages,
      base: BASE_LANGUAGE,
    });
    return { star, languages, origin: url.origin, path: url.pathname, areaCookie, geo, firstReads };
  });
NEW-END
EDIT src/routes/__root.tsx #5
OLD-BEGIN
    if (typeof window === "undefined") return data;
    return { ...data, origin: window.location.origin, path: window.location.pathname };
  },
  head: () => ({
    meta: [
OLD-END
NEW-BEGIN
    if (typeof window === "undefined") return data;
    return {
      ...data,
      origin: window.location.origin,
      path: window.location.pathname,
      firstReads: [],
    };
  },
  head: ({ loaderData }) => ({
    meta: [
NEW-END
EDIT src/routes/__root.tsx #6
OLD-BEGIN
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
OLD-END
NEW-BEGIN
      },
      // D234 S4 — the reads every page makes start with the page (src/lib/first-reads.ts).
      ...(loaderData?.firstReads ?? []),
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
NEW-END

PART C — THE PROOF IN THE BROWSER.
C1. e2e/shell.spec.ts, this edit (FRL-6 appended at the end of the file):
EDIT e2e/shell.spec.ts #1
OLD-BEGIN
      await page.evaluate(() => document.getElementById("ov2-wide")?.remove());
    }
  });
});
OLD-END
NEW-BEGIN
      await page.evaluate(() => document.getElementById("ov2-wide")?.remove());
    }
  });
});

test.describe("the reads every page makes start with the page (D234 S4)", () => {
  test("FRL-6 the head preloads the first reads, and the markets are asked once", async ({
    page,
  }) => {
    const markets: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === "/api/locations") markets.push(request.url());
    });
    await gotoReady(page, "/");
    const preloads = await page
      .locator('link[rel="preload"][as="fetch"]')
      .evaluateAll((nodes) =>
        nodes.map((node) => `${node.getAttribute("href")} ${node.getAttribute("crossorigin")}`),
      );
    expect(preloads).toEqual(
      expect.arrayContaining([
        "/api/categories/tree anonymous",
        "/api/locations anonymous",
        "/api/i18n/en anonymous",
      ]),
    );
    // No saved market on a fresh browser: no market's tree is named.
    expect(preloads.filter((entry) => entry.startsWith("/api/locations/"))).toEqual([]);
    // The feed waits for the markets, so once it is ready the shell has read them:
    // one request in all — the preload is the read.
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached({
      timeout: 20000,
    });
    expect(markets).toHaveLength(1);
  });
});
NEW-END

PART D — DOCS.
D1. docs/features/performance-strategy.md: a new section at the end, "## 10. The reads every page makes start with the page (D234, Foundations turn 27)": firstReadLinks (the four reads, each from its reader's own path builder; `as="fetch"`, `crossorigin="anonymous"` — the readers' own mode, so the reader takes the preloaded answer: the supervisor's Playwright check, one request with, two without); what the server can and cannot name (the saved market only; ?lang ▸ star ▸ base, gate-listed; the gate list, the entity bundle and the guessed market's tree left, with their reasons); a client navigation names none; FRL-5 the drift guard and FRL-6 the browser proof; next: S5, the feed's first page in the page stream.
D2. docs/governance/mechanisms.md: add this line directly after the row-44 line (the line that begins "| 44 |"):
   | 45 | A read every page makes starts with the page: the server's head preloads it, and its reader takes the preloaded answer (D234) | `firstReadLinks` (`src/lib/first-reads.ts`) from the readers' own builders: `CATEGORY_TREE_PATH` (category-tree.ts), `MARKETS_PATH` and `treePath` (location-data.ts), `bundleUrl` (i18n/bundle.ts); placed by the root route's head (`__root.tsx`, the server's own request only) | `src/lib/first-reads.test.ts` (FRL-1…FRL-5; FRL-5 the drift guard) and `e2e/shell.spec.ts` FRL-6 | none (left, with reasons: the gate list, the entity bundle, the guessed market's tree) | any read every page makes; the feed's first page next (S5) | Foundations turn 27 |
D3. docs/_changelog.md one entry "Foundations turn 27 (2026-10-25)"; roadmap.md the turn-27 line `[x]` with the final HEAD and the unit totals.
D4. AGENTS.md: replace the line that begins "- Speed (D234): each page's first-download ceiling" with exactly this one line (AGENTS.md then counts 6440 bytes by `wc -c AGENTS.md`):
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
338185b3493fc4318c73f730b6df37a80d220e2bb57eb154c4cc97c12a70d218  src/components/shell/location-data.ts
ab039c636a5c6f5090b9ce34798d3cdfab537b99b8f3236585e19f06f16acad2  src/features/categories/category-tree.ts
8f9635807c982fd3d5cd396a488e8dcd97d0fb558204fab2b464cc7c96b7b845  src/routes/__root.tsx
f417f03a766d30ead144c09530c02c6df14b5a323cdd18fd067c18da7955cbb8  e2e/shell.spec.ts
f01185f8131838a92fd789e62229915bb2b2bf6c24079084ac002e575c051910  AGENTS.md
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — unchanged); `bun run test:unit` (paste totals and the FRL- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: both maps' "scanned" 570 → 571, nothing else); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- e2e/shell.spec.ts --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): `--grep "FRL-6 |market tree cannot be fetched|TR-27 |TR-28 |TR-41 "` (the browser proof; the aborted tree read, INC-282; the device star and the hreflang alternates the root's head and loader also carry); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-27.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; the K2 list (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
