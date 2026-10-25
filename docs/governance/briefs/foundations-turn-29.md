# Foundations — turn 29: speed S6 — the server draws the first cards and the browser keeps them (D234): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 29 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at e50648f1e7df5795c501247e847458f081b86415). Tier B (the listings pages' first render; the root loader's hand-over; one router serialization adapter; two siblings onto the shared address readers). No migration. No new string. No package change. AGENTS.md: its speed line names HeldFirstPage (the new module src/features/feed/held-first-page.ts) and useHeldFirstPage (E4). Base: dev e50648f1e7df5795c501247e847458f081b86415 (Foundations turn 28's final commit; its CI run: A1). Before sending, every new line was read against every line of AGENTS.md and against the platform rules you quoted on 25 Oct, and the brief was checked by script: no new control; no map read by an outside key; no silent catch (a page that never arrives is one [first-screen] line); no non-null assertion (`!`); browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — the hand-over read at once on arrival; C — the feed draws the server's page; D — the browser proof; E — docs, register, roadmap, changelog, AGENTS.md.
BASE: e50648f1e7df5795c501247e847458f081b86415
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/features/feed/held-first-page.ts
src/features/feed/held-first-page.test.ts
src/start.ts
src/routes/__root.tsx
src/features/feed/feed-page.ts
src/features/feed/feed-page.test.ts
src/server/first-screen.ts
src/server/first-screen.test.ts
src/features/feed/use-feed.ts
src/features/feed/use-feed.test.ts
src/components/marketplace/feed.tsx
src/routes/index.tsx
src/routes/c.$slug.tsx
src/features/ad-page/similar.ts
src/components/shell/app-rail.tsx
e2e/ad-page.spec.ts
SCOPE-END

THE SYSTEM (G0) — one concern.
CONCERN: the listings pages' first cards are drawn by the server and kept by the browser: the page's HTML carries them, the browser's first render draws the very same cards so React keeps the server's nodes, and the live feed takes over without a second read or a second drawing.
MECHANISM: turn 28's chain (readFirstFeedPage → getFirstFeedPage → useFeed's first read), extended here. HeldFirstPage (NEW src/features/feed/held-first-page.ts) is what the root loader hands over: the server's read, sent as its promise by a router serialization adapter (`createSerializationAdapter`, registered in src/start.ts's `createStart`) and wrapped again on arrival, noting the page when it lands (`settled`). useHeldFirstPage (use-feed.ts) is the page the feed draws until its own first read lands: only by the page load's first feed (decided at mount; a feed mounted after a navigation never draws it), never after that read has landed (useFeed's new `firstReadDone`), and, once the read's inputs are known, only for the very address; it reads `settled` at once and asks React to wait (`use`) only while the page travels. feed.tsx draws the held cards, their ladder and cover links, the more-marker and the server's place path (FirstFeedPage.places); index.tsx and c.$slug.tsx render the feed under Suspense with the spinner as its fallback. Why the adapter — the supervisor's local node build of this change against a stand-in backend: with `use(promise)` alone React met a promise it had not seen settle, waited while the page hydrated, and drew the feed again from scratch (the server's card nodes replaced; a text mismatch planted inside the feed went unreported, the same planted in the page shell raised React #418); with the page read at once on arrival, the nodes are kept on "/", on "/c/<slug>" and with a saved area, and a mismatch planted inside the feed raises #418.
CONSUMERS (at BASE): the root loader's hand-over (src/routes/__root.tsx :120 RootData.firstFeed, :124 startFirstFeedPage, :292 — onto HeldFirstPage, B4); useFeed's first read (src/features/feed/use-feed.ts :26 :41 :48-:57 — awaits the HeldFirstPage's page, C3); the feed's draw and its covers' preload (src/components/marketplace/feed.tsx :85-:91 :104-:108 :177 :311-:314 — the held page drawn, C4); the listings routes (src/routes/index.tsx :25, src/routes/c.$slug.tsx :30 — Suspense, C5); readFirstFeedPage (src/server/first-screen.ts :93 :121 :131 — the place path; INC-901, C2). Turn 28's K2 siblings, moved here: src/components/shell/app-rail.tsx :837 reads the listings address itself (onto feedRouteOf, C6); src/features/ad-page/similar.ts :25-:27 builds its own /api/feed address (onto feedPath, which gains an optional page size, C1 and C6). Tests: UFS-1…4 (fixtures become HeldFirstPage), UFS-5…7 new; HFP-1…3 new; FSP-1 (the place path) and FSP-7 new; FP-16 new; AP-54 new. The spinner test, FS-6 and AP-49 keep turn 28's cookie: with it firstFeed answers null and the feed reads as before.
COVERED HERE: every consumer above. LEFT: the shell's own first state from the server (the location row and the rail still settle in the browser; meanwhile the feed's heading carries the server's place, which the shell then shows too — turn 28's DIA-6); a category page's invitation card waits for the category tree in the browser and joins the grid then.
CONFORMANCE GUARD: e2e/ad-page.spec.ts AP-54 — the page's HTML holds the cards; the first card node at DOMContentLoaded is the first card node once the page is ready (a feed drawn again from scratch fails it — the supervisor's lab, on the build with `use(promise)` alone); no uncaught React error. src/features/feed/held-first-page.test.ts HFP-1…3 (read at once after arrival; a page that never arrives is no page; the adapter claims only a HeldFirstPage and wraps it again). src/features/feed/use-feed.test.ts UFS-5…7 (only the first feed draws it, until its read lands; only the very address once the inputs are known; firstReadDone). src/server/first-screen.test.ts FSP-7 (red on BASE: INC-901). src/features/feed/feed-page.test.ts FP-16 (the page size).
EXCEPTIONS: none new; turn 28's E2E-only cookie stands.
FIVE LENSES — security: no new input — the hand-over carries only what the public feed route answered (turn 28); the adapter claims only a HeldFirstPage (HFP-3) and sends nothing a page did not already send · performance: the first cards and their photos are in the page's HTML, so they show and their photos start before the page's code has run (ESTIMATE: on the lab's phone the first card photo arrives with the HTML rather than after the code — measured after Publish by the lab), and React keeps the server's nodes (no second drawing); the entry 287.9 → 288.1 KiB, "/" and "/c/$slug" 301.5 → 302.1 KiB, "/l/$slug" 325.1 KiB (the supervisor's build), under every ceiling · failure modes: the page still travelling when the code runs → React waits under the route's Suspense (the spinner) and the feed is drawn when it lands; a page that never arrives → no first page, one [first-screen] line, the browser reads (HFP-2); another address once the inputs are known → the spinner and the live read; a malformed server answer → one [first-screen] line naming it (INC-901) · consistency: one hand-over type on the server and in the browser; one address builder (feedPath, now with the similar ads) and one listings-address reader (feedRouteOf, now with the rail) · future growth: the shell's first state from the same streamed data; the similar ads or any list that asks another page size passes it to feedPath.
FORWARD-SCAN: the shell's own first state from the server; "SSR renders the star language" (roadmap, study first). REGISTER: docs/governance/mechanisms.md — row 47 added (E2); AGENTS.md's speed line names HeldFirstPage and useHeldFirstPage (E4).

WHY
- Turn 28 hands the first page over, but the browser still draws the cards only once its code has run — on a slow phone, seconds after the HTML. Drawn by the server they show with the HTML and their photos start at once; kept by React there is no second drawing.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-29.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-29.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-29.md (Foundations turn 29: speed S6 — the server draws the first cards and the browser keeps them — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 28 (docs/governance/briefs/foundations-turn-28", add `  - [ ] Turn 29 (docs/governance/briefs/foundations-turn-29.md; no migration) — speed S6: the server draws the listings pages' first cards and the browser keeps them (the hand-over read at once on arrival: HeldFirstPage); turn 28's two siblings onto feedPath and feedRouteOf; INC-901 (D234).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–E; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: read docs/features/e2e-harness.md §Authoring laws (J1–J9) first. This turn adds AP-54 (scratch seller and ads through the spec's own helpers, as AP-53); no assertion changes.
- Run no stateful git command. Edits with your file-editing tool or a script that copies the brief's text. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-29.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/governance/mechanisms.md, AGENTS.md (E4 only), docs/governance/reports/foundations-turn-29.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (they move: the new src module raises the scanned count — the supervisor's run of `bun run i18n:usage` on this change). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each part whole (B, then C, then D). After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so. No ceiling changes: the supervisor's build of this change holds every page under its line in scripts/route-budgets.mjs; CI's bundle-budget job judges.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-11, EXH-12, EXH-17 and EXH-19 time out in your sandbox (INC-890; they pass in CI), and LL-1 can hit its 5-second limit under the full suite's load (it passes alone). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's specs through `bun run e2e:local -- <spec file> --grep "<pattern>"` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: every page shows exactly what it shows today; on "/" and "/c/<slug>" the first cards are in the page's HTML, appear before the page's code has run, and stay as they are once the page is ready (the same cards, the same nodes); the similar ads and the rail's peek behave as today; every later read, a Retry and every client navigation read as today. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every place that reads the root loader's firstFeed (each must take a HeldFirstPage), every place that builds a /api/feed address (each on feedPath) or tells the listings pages by their address (each on feedRouteOf) after this turn, and every e2e test that holds, fails or waits for a browser /api/feed read on a listings page's first load (each with turn 28's cookie); K3 HFP-, UFS-5…7, FSP-7, FP-16 and AP-54 land with the mechanism; K4 no literal language or country code in src; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row (AP-54 seeds its own scratch seller, as AP-53); no assertion loosened; FSP-7 is shown red against BASE's src/server/first-screen.ts before C2 lands (restore the file locally, run `-t "FSP-7"`, put the new file back — never committed red); AP-54 is the browser proof.
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on e50648f1e7df5795c501247e847458f081b86415). A red on e50648f1e7df5795c501247e847458f081b86415 is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — THE HAND-OVER READ AT ONCE ON ARRIVAL.
B1. NEW src/features/feed/held-first-page.ts (sha256 c2a168150d351f645ef7912e047651102b424c24a774423ce90d32aa7f320310):
FILE-BEGIN src/features/feed/held-first-page.ts
import { createSerializationAdapter } from "@tanstack/react-router";

import { errorText } from "@/lib/error-text";

import type { FirstFeedPage } from "./feed-page";

/**
 * D234 S6 — THE FEED'S FIRST PAGE AS THE ROOT LOADER HANDS IT OVER: the
 * server's read (src/server/first-screen.ts), unawaited so the page's shell is
 * sent at once, and — once it has arrived — the page itself, read without
 * waiting.
 *
 * Why the wrapper: the browser must draw the server's cards in its very first
 * render, or React cannot keep the server's HTML (a feed that waits for a
 * promise while the page hydrates is drawn again from scratch). The router
 * hands a promise over as a promise; this adapter (registered in src/start.ts)
 * wraps it the moment the browser reads the page's data, and notes the page
 * when it arrives — the stream delivers it before the page's code runs — so
 * the feed reads `settled` at once and asks React to wait only when it has not
 * arrived yet.
 */
export class HeldFirstPage {
  /** The page once it has arrived (null: no first page); undefined while it travels. */
  settled: { page: FirstFeedPage | null } | undefined = undefined;

  constructor(readonly page: Promise<FirstFeedPage | null>) {
    page.then(
      (value) => {
        this.settled = { page: value };
      },
      (error: unknown) => {
        console.warn("[first-screen] the first page did not arrive:", errorText(error));
        this.settled = { page: null };
      },
    );
  }
}

/** The router's adapter: a HeldFirstPage travels as its promise and is wrapped again on arrival. */
export const heldFirstPageAdapter = createSerializationAdapter({
  key: "ethio-held-first-page",
  test: (value: unknown): value is HeldFirstPage => value instanceof HeldFirstPage,
  toSerializable: (held: HeldFirstPage) => held.page,
  fromSerializable: (page: Promise<FirstFeedPage | null>) => new HeldFirstPage(page),
});
FILE-END src/features/feed/held-first-page.ts
B2. NEW src/features/feed/held-first-page.test.ts (sha256 d2b54052a3dfe5ba26f16bf02b91a0dc150095f7f4bc9b465300ef622e0f86ba):
FILE-BEGIN src/features/feed/held-first-page.test.ts
import { describe, expect, it } from "vitest";

import { feedPath, type FirstFeedPage } from "./feed-page";
import { HeldFirstPage, heldFirstPageAdapter } from "./held-first-page";

/**
 * D234 S6 — HFP-1…HFP-3. The feed's first page as the root loader hands it
 * over: travelling as its promise, wrapped again on arrival, and readable at
 * once once it has arrived (the browser's first render then draws the server's
 * cards and React keeps them).
 */
const PAGE: FirstFeedPage = {
  path: feedPath(null, null, null),
  page: { cards: [], ladder: ["00000000-0000-0000-0000-000000000000"], next: null },
  covers: [],
  places: [],
};

describe("HeldFirstPage (D234 S6)", () => {
  it("HFP-1 the page is read at once after it arrives; nothing while it travels", async () => {
    let arrive: (value: FirstFeedPage | null) => void = () => undefined;
    const held = new HeldFirstPage(new Promise((resolve) => (arrive = resolve)));
    expect(held.settled).toBeUndefined();
    arrive(PAGE);
    await held.page;
    expect(held.settled).toEqual({ page: PAGE });
  });

  it("HFP-2 a page that never arrives reads as no first page", async () => {
    const held = new HeldFirstPage(Promise.reject(new Error("lost")));
    await held.page.catch(() => undefined);
    await Promise.resolve();
    expect(held.settled).toEqual({ page: null });
  });

  it("HFP-3 the router's adapter: it claims only a HeldFirstPage, sends its promise, wraps it again", async () => {
    const held = new HeldFirstPage(Promise.resolve(PAGE));
    expect(heldFirstPageAdapter.test(held)).toBe(true);
    expect(heldFirstPageAdapter.test(held.page)).toBe(false);
    expect(heldFirstPageAdapter.test({ page: held.page })).toBe(false);
    expect(heldFirstPageAdapter.toSerializable(held)).toBe(held.page);
    const arrived = heldFirstPageAdapter.fromSerializable(Promise.resolve(PAGE));
    expect(arrived).toBeInstanceOf(HeldFirstPage);
    await arrived.page;
    expect(arrived.settled).toEqual({ page: PAGE });
  });
});
FILE-END src/features/feed/held-first-page.test.ts
B3. src/start.ts, these edits (the adapter registered for the server and the browser alike):
EDIT src/start.ts #1
OLD-BEGIN
import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
OLD-END
NEW-BEGIN
import { renderErrorPage } from "./lib/error-page";
import { heldFirstPageAdapter } from "@/features/feed/held-first-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
NEW-END
EDIT src/start.ts #2
OLD-BEGIN
export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
OLD-END
NEW-BEGIN
export const startInstance = createStart(() => ({
  // D234 S6 — the feed's first page travels in the page stream and is read at once on arrival.
  serializationAdapters: [heldFirstPageAdapter],
  functionMiddleware: [attachSupabaseAuth],
NEW-END
B4. src/routes/__root.tsx, these edits (the loader hands over a HeldFirstPage):
EDIT src/routes/__root.tsx #1
OLD-BEGIN
import type { FirstFeedPage } from "@/features/feed/feed-page";
import { NoInputSchema } from "@/lib/schemas/server-fns";
OLD-END
NEW-BEGIN
import type { FirstFeedPage } from "@/features/feed/feed-page";
import { HeldFirstPage } from "@/features/feed/held-first-page";
import { NoInputSchema } from "@/lib/schemas/server-fns";
NEW-END
EDIT src/routes/__root.tsx #2
OLD-BEGIN
  /** D234 S5 — the server's own document only; a client navigation carries none. */
  firstFeed: Promise<FirstFeedPage | null> | null;
};
OLD-END
NEW-BEGIN
  /** D234 S5 — the server's own document only; a client navigation carries none. */
  firstFeed: HeldFirstPage | null;
};
NEW-END
EDIT src/routes/__root.tsx #3
OLD-BEGIN
/** Never a rejection: a failed hand-over is one [first-screen] line and the browser reads the feed. */
function startFirstFeedPage(): Promise<FirstFeedPage | null> {
  return getFirstFeedPage().catch((error: unknown) => {
    console.warn("[first-screen] the first page was not handed over:", errorText(error));
    return null;
  });
}
OLD-END
NEW-BEGIN
/** Never a rejection: a failed hand-over is one [first-screen] line and the browser reads the feed. */
function startFirstFeedPage(): HeldFirstPage {
  return new HeldFirstPage(
    getFirstFeedPage().catch((error: unknown) => {
      console.warn("[first-screen] the first page was not handed over:", errorText(error));
      return null;
    }),
  );
}
NEW-END

PART C — THE FEED DRAWS THE SERVER'S PAGE.
C1. src/features/feed/feed-page.ts, these edits (the place path on FirstFeedPage; feedPath's optional page size):
EDIT src/features/feed/feed-page.ts #1
OLD-BEGIN
import { linksOf, type PhotoLinks } from "@/features/posting/photo-links";

OLD-END
NEW-BEGIN
import { linksOf, type PhotoLinks } from "@/features/posting/photo-links";
import type { ShellLocationNode } from "@/components/shell/location-data";

NEW-END
EDIT src/features/feed/feed-page.ts #2
OLD-BEGIN
  after: string | null,
): `/api/${string}` {
OLD-END
NEW-BEGIN
  after: string | null,
  size: number | null = null,
): `/api/${string}` {
NEW-END
EDIT src/features/feed/feed-page.ts #3
OLD-BEGIN
  if (after !== null) params.set("after", after);
  const query = params.toString();
OLD-END
NEW-BEGIN
  if (after !== null) params.set("after", after);
  // D234 S6 — a list that asks another page size (the similar ads, ad-page/similar.ts) says so.
  if (size !== null) params.set("size", String(size));
  const query = params.toString();
NEW-END
EDIT src/features/feed/feed-page.ts #4
OLD-BEGIN
  covers: string[];
}
OLD-END
NEW-BEGIN
  covers: string[];
  /** D234 S6 — the place path the server derived, so the page it draws is headed as the shell will head it. */
  places: ShellLocationNode[];
}
NEW-END
src/features/feed/feed-page.test.ts, these edits (FP-16):
EDIT src/features/feed/feed-page.test.ts #1
OLD-BEGIN
    expect(feedPath("c-1", "p-1", "x y")).toBe("/api/feed?category=c-1&place=p-1&after=x+y");
  });
});
OLD-END
NEW-BEGIN
    expect(feedPath("c-1", "p-1", "x y")).toBe("/api/feed?category=c-1&place=p-1&after=x+y");
  });

  it("FP-16 a page size is asked only when given, after the cursor", () => {
    expect(feedPath("c-1", "p-1", null, 11)).toBe("/api/feed?category=c-1&place=p-1&size=11");
    expect(feedPath("c-1", null, null, 11)).toBe("/api/feed?category=c-1&size=11");
    expect(feedPath("c-1", null, null, null)).toBe("/api/feed?category=c-1");
  });
});
NEW-END
C2. src/server/first-screen.ts, these edits (the place path handed over; INC-901 — a malformed answer is named in one line):
EDIT src/server/first-screen.ts #1
OLD-BEGIN
    const found = parseCategoryTree(categories)?.tree.nodes.find(
      (node) => node.slug === route.slug,
    );
OLD-END
NEW-BEGIN
    if (categories === null) return null;
    const parsed = parseCategoryTree(categories);
    if (parsed === null) {
      console.warn("[first-screen]", CATEGORY_TREE_PATH, "answered a tree that does not parse");
      return null;
    }
    // An unknown slug reads no feed: the page says the category is missing.
    const found = parsed.tree.nodes.find((node) => node.slug === route.slug);
NEW-END
EDIT src/server/first-screen.ts #2
OLD-BEGIN
  const page = parseFeedPage(await answerOf(feedGet, url.origin, path));
  if (page === null) return null;
OLD-END
NEW-BEGIN
  const answer = await answerOf(feedGet, url.origin, path);
  if (answer === null) return null;
  const page = parseFeedPage(answer);
  if (page === null) {
    console.warn("[first-screen]", path, "answered a page that does not parse");
    return null;
  }
NEW-END
EDIT src/server/first-screen.ts #3
OLD-BEGIN
  return { path, page, covers };
OLD-END
NEW-BEGIN
  return { path, page, covers, places: area.kind === "place" ? area.path : [] };
NEW-END
src/server/first-screen.test.ts, these edits (FSP-1's place path; FSP-7 — show it red against BASE's first-screen.ts first, see HOW TO WORK):
EDIT src/server/first-screen.test.ts #1
OLD-BEGIN

/**
 * D234 speed turn S5 — FSP-1…FSP-6. The server's first page for a listings
 * page: the place derived from the request with the shell's own functions, the
 * page read from the feed route in-process, its first covers named; null for
OLD-END
NEW-BEGIN

/**
 * D234 speed turns S5 and S6 — FSP-1…FSP-7. The server's first page for a listings
 * page: the place derived from the request with the shell's own functions, the
 * page read from the feed route in-process, its first covers named; null for
NEW-END
EDIT src/server/first-screen.test.ts #2
OLD-BEGIN
  feedStatus: 200,
  feedDelayMs: 0,
}));

OLD-END
NEW-BEGIN
  feedStatus: 200,
  feedDelayMs: 0,
  feedBody: null as unknown,
  treeBody: null as unknown,
}));

NEW-END
EDIT src/server/first-screen.test.ts #3
OLD-BEGIN
  categoryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({
      version: "v1",
OLD-END
NEW-BEGIN
  categoryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    if (state.treeBody !== null) return json(state.treeBody);
    return json({
      version: "v1",
NEW-END
EDIT src/server/first-screen.test.ts #4
OLD-BEGIN
      await new Promise((resolve) => setTimeout(resolve, state.feedDelayMs));
    if (state.feedStatus !== 200) return json({ error: "internal error" }, state.feedStatus);
    return json({
      cards: [
OLD-END
NEW-BEGIN
      await new Promise((resolve) => setTimeout(resolve, state.feedDelayMs));
    if (state.feedStatus !== 200) return json({ error: "internal error" }, state.feedStatus);
    if (state.feedBody !== null) return json(state.feedBody);
    return json({
      cards: [
NEW-END
EDIT src/server/first-screen.test.ts #5
OLD-BEGIN
  state.feedStatus = 200;
  state.feedDelayMs = 0;
});

OLD-END
NEW-BEGIN
  state.feedStatus = 200;
  state.feedDelayMs = 0;
  state.feedBody = null;
  state.treeBody = null;
});

NEW-END
EDIT src/server/first-screen.test.ts #6
OLD-BEGIN
    expect(held?.page.cards.map((entry) => entry.id)).toEqual(["a"]);
    expect(held?.covers).toEqual(["https://photos.example/a-card"]);
    expect(state.asked).toEqual([
      "/api/locations",
OLD-END
NEW-BEGIN
    expect(held?.page.cards.map((entry) => entry.id)).toEqual(["a"]);
    expect(held?.covers).toEqual(["https://photos.example/a-card"]);
    expect(held?.places.map((node) => node.id)).toEqual([ET, OROMIA, ADAMA]);
    expect(state.asked).toEqual([
      "/api/locations",
NEW-END
EDIT src/server/first-screen.test.ts #7
OLD-BEGIN
    warn.mockRestore();
  });
});
OLD-END
NEW-BEGIN
    warn.mockRestore();
  });

  it("FSP-7 a feed or category tree answered whole but malformed: no first page, one [first-screen] line naming it", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    state.feedBody = { cards: "not a list" };
    expect(await readFirstFeedPage(at("/"), null)).toBeNull();
    expect(warn).toHaveBeenCalledWith(
      "[first-screen]",
      "/api/feed",
      "answered a page that does not parse",
    );
    state.feedBody = null;
    state.treeBody = { nodes: "not a list" };
    expect(await readFirstFeedPage(at("/c/phones"), null)).toBeNull();
    expect(warn).toHaveBeenCalledWith(
      "[first-screen]",
      "/api/categories/tree",
      "answered a tree that does not parse",
    );
    warn.mockRestore();
  });
});
NEW-END
C3. src/features/feed/use-feed.ts, these edits (the first read takes a HeldFirstPage; firstReadDone; useHeldFirstPage):
EDIT src/features/feed/use-feed.ts #1
OLD-BEGIN
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { callRoute } from "@/lib/route-client";
OLD-END
NEW-BEGIN
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { callRoute } from "@/lib/route-client";
NEW-END
EDIT src/features/feed/use-feed.ts #2
OLD-BEGIN
import type { PhotoLinks } from "@/features/posting/photo-links";
import { feedPath, parseFeedPage, type FeedListing, type FirstFeedPage } from "./feed-page";

export type { FeedListing } from "./feed-page";
OLD-END
NEW-BEGIN
import type { PhotoLinks } from "@/features/posting/photo-links";
import { feedPath, parseFeedPage, type FeedListing, type FirstFeedPage } from "./feed-page";
import type { HeldFirstPage } from "./held-first-page";

export type { FeedListing } from "./feed-page";
NEW-END
EDIT src/features/feed/use-feed.ts #3
OLD-BEGIN
   * address that read asks, once per page load; otherwise the read goes out.
   */
  firstPage?: Promise<FirstFeedPage | null> | null;
}

OLD-END
NEW-BEGIN
   * address that read asks, once per page load; otherwise the read goes out.
   */
  firstPage?: HeldFirstPage | null;
}

NEW-END
EDIT src/features/feed/use-feed.ts #4
OLD-BEGIN

/** D234 S5 — a server's first page is taken at most once (a later mount reads afresh). */
const takenFirstPages = new WeakSet<Promise<FirstFeedPage | null>>();

/**
OLD-END
NEW-BEGIN

/** D234 S5 — a server's first page is taken at most once (a later mount reads afresh). */
const takenFirstPages = new WeakSet<HeldFirstPage>();

/**
NEW-END
EDIT src/features/feed/use-feed.ts #5
OLD-BEGIN
  categoryId: string | null,
  placeId: string | null,
  firstPage: Promise<FirstFeedPage | null> | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  if (firstPage === null || takenFirstPages.has(firstPage)) {
OLD-END
NEW-BEGIN
  categoryId: string | null,
  placeId: string | null,
  firstPage: HeldFirstPage | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  if (firstPage === null || takenFirstPages.has(firstPage)) {
NEW-END
EDIT src/features/feed/use-feed.ts #6
OLD-BEGIN
  }
  takenFirstPages.add(firstPage);
  const held = await firstPage;
  if (held !== null && held.path === feedPath(categoryId, placeId, null)) return held.page;
  return readPage(categoryId, placeId, null);
}

/**
 * Bundle 10 E3b — the listings pages' read: /api/feed, one page of 20 at a
OLD-END
NEW-BEGIN
  }
  takenFirstPages.add(firstPage);
  const held = await firstPage.page;
  if (held !== null && held.path === feedPath(categoryId, placeId, null)) return held.page;
  return readPage(categoryId, placeId, null);
}

/** D234 S6 — a server's first page is drawn only by the feed first mounted with it. */
const drawnFirstPages = new WeakSet<HeldFirstPage>();

export interface HeldFirstPageOptions {
  /** The server's first page as the root loader handed it over (null after a navigation). */
  firstPage: HeldFirstPage | null;
  /** The feed read's inputs are known (useFeed's `enabled`). */
  inputsKnown: boolean;
  categoryId: string | null;
  placeId: string | null;
  /** useFeed's `firstReadDone`: this feed's own first read has landed. */
  firstReadDone: boolean;
}

/**
 * D234 S6 — the server's first page this feed draws until its own first read
 * lands, so the server draws the first cards and the browser hydrates them as
 * they are. Only the page load's first feed draws it (decided at mount: a feed
 * mounted after a navigation never does); never once that read has landed (a
 * later place, category or Retry shows its own loading); and, once the read's
 * inputs are known, only when they ask the very address the server read.
 * The decision is the same on the server and in the browser's first render.
 * It suspends until the page arrives: its caller renders under Suspense.
 */
export function useHeldFirstPage({
  firstPage,
  inputsKnown,
  categoryId,
  placeId,
  firstReadDone,
}: HeldFirstPageOptions): FirstFeedPage | null {
  const [draws] = useState(() => firstPage !== null && !drawnFirstPages.has(firstPage));
  useEffect(() => {
    if (firstPage !== null) drawnFirstPages.add(firstPage);
  }, [firstPage]);
  // Arrived: read at once, so the first render draws the very cards the server drew
  // and React keeps them; still travelling: React waits (the route's Suspense).
  const held =
    draws && firstPage !== null
      ? firstPage.settled !== undefined
        ? firstPage.settled.page
        : use(firstPage.page)
      : null;
  if (held === null || firstReadDone) return null;
  if (inputsKnown && held.path !== feedPath(categoryId, placeId, null)) return null;
  return held;
}

/**
 * Bundle 10 E3b — the listings pages' read: /api/feed, one page of 20 at a
NEW-END
EDIT src/features/feed/use-feed.ts #7
OLD-BEGIN
  const [moreError, setMoreError] = useState(false);
  const [firstToken, setFirstToken] = useState(0);
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);
OLD-END
NEW-BEGIN
  const [moreError, setMoreError] = useState(false);
  const [firstToken, setFirstToken] = useState(0);
  /** D234 S6 — this mount's first read has landed (a page or a failure). */
  const [firstReadDone, setFirstReadDone] = useState(false);
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);
NEW-END
EDIT src/features/feed/use-feed.ts #8
OLD-BEGIN
      .then((page) => {
        if (generation.current !== mine) return;
        if (page === null) {
          setError(true);
OLD-END
NEW-BEGIN
      .then((page) => {
        if (generation.current !== mine) return;
        setFirstReadDone(true);
        if (page === null) {
          setError(true);
NEW-END
EDIT src/features/feed/use-feed.ts #9
OLD-BEGIN
        if (generation.current !== mine) return;
        console.error("[feed] first page failed", cause);
        setError(true);
        setIsLoading(false);
OLD-END
NEW-BEGIN
        if (generation.current !== mine) return;
        console.error("[feed] first page failed", cause);
        setFirstReadDone(true);
        setError(true);
        setIsLoading(false);
NEW-END
EDIT src/features/feed/use-feed.ts #10
OLD-BEGIN
    retry,
    coverLinks,
  };
}
OLD-END
NEW-BEGIN
    retry,
    coverLinks,
    firstReadDone,
  };
}
NEW-END
src/features/feed/use-feed.test.ts, replaced whole by this text (sha256 b22ba8eb3bd208a7e48c7da6324d7259c080ff535fe1c2e60b08ff56db34127c):
FILE-BEGIN src/features/feed/use-feed.test.ts
import { act, renderHook, waitFor } from "@testing-library/react";
import { createElement, Suspense, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { feedPath, parseFeedPage, type FeedPage, type FirstFeedPage } from "./feed-page";
import { HeldFirstPage } from "./held-first-page";
import { useFeed, useHeldFirstPage, type HeldFirstPageOptions } from "./use-feed";

/**
 * D234 speed turns S5 and S6 — UFS-1…UFS-7. The feed's first read takes the
 * page the server answered inside the page when it is the very address that
 * read asks, once per page load; anything else reads as before (the route
 * client is mocked; RCL-* own the transport's contract). Until that read lands,
 * the page load's first feed draws the server's page (useHeldFirstPage).
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
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["a", "b"]),
        covers: [],
        places: [],
      }),
    );
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cards.map((entry) => entry.id)).toEqual(["a", "b"]);
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UFS-2 a page for another address, none at all, or a failed hand-over: the read goes out", async () => {
    callRoute.mockResolvedValue(answered(["read"]));
    for (const held of [
      new HeldFirstPage(
        Promise.resolve<FirstFeedPage | null>({
          path: feedPath("other", PLACE, null),
          page: served(["stale"]),
          covers: [],
          places: [],
        }),
      ),
      new HeldFirstPage(Promise.resolve<FirstFeedPage | null>(null)),
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
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
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
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});

/** useHeldFirstPage suspends until the page arrives: its caller renders under Suspense. */
function suspended({ children }: { children: ReactNode }) {
  return createElement(Suspense, { fallback: null }, children);
}

/** Rendered inside an awaited act, so the suspension resolves (React 19's act contract). */
async function heldOf(firstPage: HeldFirstPage) {
  return act(async () =>
    renderHook(
      (props: Partial<HeldFirstPageOptions>) =>
        useHeldFirstPage({
          firstPage,
          inputsKnown: false,
          categoryId: null,
          placeId: null,
          firstReadDone: false,
          ...props,
        }),
      { wrapper: suspended, initialProps: {} },
    ),
  );
}

describe("the server's first page drawn until the feed's own read lands (D234 S6)", () => {
  it("UFS-5 the first feed draws it until its read lands; a feed mounted after it never draws it", async () => {
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const first = await heldOf(firstPage);
    expect(first.result.current?.page.cards.map((entry) => entry.id)).toEqual(["held"]);
    first.rerender({ firstReadDone: true });
    expect(first.result.current).toBeNull();
    const later = await heldOf(firstPage);
    expect(later.result.current).toBeNull();
  });

  it("UFS-6 once the read's inputs are known, only a page for the very address is drawn", async () => {
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const held = await heldOf(firstPage);
    expect(held.result.current).not.toBeNull();
    held.rerender({ inputsKnown: true, placeId: PLACE });
    expect(held.result.current?.path).toBe(feedPath(null, PLACE, null));
    held.rerender({ inputsKnown: true, placeId: "another-place" });
    expect(held.result.current).toBeNull();
    held.rerender({ inputsKnown: true, categoryId: "c-leaf", placeId: PLACE });
    expect(held.result.current).toBeNull();
  });

  it("UFS-7 useFeed's first read landing, a page or a failure, is firstReadDone", async () => {
    callRoute.mockResolvedValueOnce(answered(["read"]));
    const landed = renderHook(() => useFeed({ placeId: PLACE }));
    expect(landed.result.current.firstReadDone).toBe(false);
    await waitFor(() => expect(landed.result.current.firstReadDone).toBe(true));
    expect(landed.result.current.cards.map((entry) => entry.id)).toEqual(["read"]);
    callRoute.mockResolvedValueOnce({ ...answered([]), status: 500, ok: false });
    const failed = renderHook(() => useFeed({ placeId: PLACE }));
    await waitFor(() => expect(failed.result.current.firstReadDone).toBe(true));
    expect(failed.result.current.error).toBe(true);
  });
});
FILE-END src/features/feed/use-feed.test.ts
C4. src/components/marketplace/feed.tsx, these edits (the held page drawn until the feed's own read lands):
EDIT src/components/marketplace/feed.tsx #1
OLD-BEGIN
import { useCategoryTree } from "@/features/categories/category-tree";
import {
  feedSections,
  inviteSpot,
  placeCount,
  type FirstFeedPage,
  type InviteSpot,
} from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { useFeed } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
OLD-END
NEW-BEGIN
import { useCategoryTree } from "@/features/categories/category-tree";
import { feedSections, inviteSpot, placeCount, type InviteSpot } from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import type { HeldFirstPage } from "@/features/feed/held-first-page";
import { useFeed, useHeldFirstPage } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
NEW-END
EDIT src/components/marketplace/feed.tsx #2
OLD-BEGIN
  const placeId = place?.id ?? null;
  // D234 S5 — the feed's first page as the server answered it inside the page (the root loader).
OLD-END
NEW-BEGIN
  const placeId = place?.id ?? null;
  const inputsKnown = feedInputsReady && (categoryLookup === "none" || categoryLookup === "found");
  // D234 S5 — the feed's first page as the server answered it inside the page (the root loader).
NEW-END
EDIT src/components/marketplace/feed.tsx #3
OLD-BEGIN
    select: (state) =>
      (
        state.matches[0]?.loaderData as
          | { firstFeed?: Promise<FirstFeedPage | null> | null }
          | undefined
      )?.firstFeed ?? null,
  });
OLD-END
NEW-BEGIN
    select: (state) =>
      (state.matches[0]?.loaderData as { firstFeed?: HeldFirstPage | null } | undefined)
        ?.firstFeed ?? null,
  });
NEW-END
EDIT src/components/marketplace/feed.tsx #4
OLD-BEGIN
    coverLinks,
  } = useFeed({
OLD-END
NEW-BEGIN
    coverLinks,
    firstReadDone,
  } = useFeed({
NEW-END
EDIT src/components/marketplace/feed.tsx #5
OLD-BEGIN
    placeId,
    enabled: feedInputsReady && (categoryLookup === "none" || categoryLookup === "found"),
    firstPage: firstFeed,
  });

OLD-END
NEW-BEGIN
    placeId,
    enabled: inputsKnown,
    firstPage: firstFeed,
  });
  // D234 S6 — until this feed's own first read lands, it draws the page the server
  // read inside the page (the very page that read then takes), headed by the place
  // the server derived: the server draws the first cards and the browser hydrates
  // them as they are. The route renders this under Suspense (useHeldFirstPage).
  const held = useHeldFirstPage({
    firstPage: firstFeed,
    inputsKnown,
    categoryId: selectedCategoryId,
    placeId,
    firstReadDone,
  });
  const showHeld = held !== null;
  const shownPath = held !== null ? held.places : locationPath;
  const shownPlace: LocationNode | null = shownPath[shownPath.length - 1] ?? null;
  const shownCards = held !== null ? held.page.cards : cards;
  const shownLadder = held !== null ? held.page.ladder : ladder;
  const shownLinks = held !== null ? (held.page.coverLinks ?? {}) : coverLinks;
  const shownHasMore = held !== null ? held.page.next !== null : hasMore;

NEW-END
EDIT src/components/marketplace/feed.tsx #6
OLD-BEGIN

  const sections = feedSections(cards, ladder);
  // INC-606 — each card's cover photo, at card size. DEC-195 — the links the
  // feed's answer already signed are the preset; only the rest are asked for.
  const coverOf = useCardPhotos(cards, coverLinks);

OLD-END
NEW-BEGIN

  const sections = feedSections(shownCards, shownLadder);
  // INC-606 — each card's cover photo, at card size. DEC-195 — the links the
  // feed's answer already signed are the preset; only the rest are asked for.
  const coverOf = useCardPhotos(shownCards, shownLinks);

NEW-END
EDIT src/components/marketplace/feed.tsx #7
OLD-BEGIN
  // page it waits for the category's name rather than drawing a sentence without it.
  const spot = inviteSpot(cards, place !== null, hasMore);
  const invite: Invite | null =
    selectedCategoryId === null || categoryNode !== null
      ? {
          placeId: place?.id ?? null,
          placeName: place ? nameOf(place) : null,
          categoryId: selectedCategoryId,
OLD-END
NEW-BEGIN
  // page it waits for the category's name rather than drawing a sentence without it.
  const spot = inviteSpot(shownCards, shownPlace !== null, shownHasMore);
  // D234 S6 — a category page's invitation waits for the category itself (its lookup
  // "none" is the listings page with no category), so the server never draws one without it.
  const invite: Invite | null =
    categoryLookup === "none" || categoryNode !== null
      ? {
          placeId: shownPlace?.id ?? null,
          placeName: shownPlace ? nameOf(shownPlace) : null,
          categoryId: selectedCategoryId,
NEW-END
EDIT src/components/marketplace/feed.tsx #8
OLD-BEGIN
            categoryNode === null ? null : entityName("category", categoryNode, entities),
          placeCount: place ? placeCount(cards) : cards.length,
        }
OLD-END
NEW-BEGIN
            categoryNode === null ? null : entityName("category", categoryNode, entities),
          placeCount: shownPlace ? placeCount(shownCards) : shownCards.length,
        }
NEW-END
EDIT src/components/marketplace/feed.tsx #9
OLD-BEGIN
  const hintId = useId();
  const firstStep = cards[0]?.step ?? 1;

OLD-END
NEW-BEGIN
  const hintId = useId();
  const firstStep = shownCards[0]?.step ?? 1;

NEW-END
EDIT src/components/marketplace/feed.tsx #10
OLD-BEGIN
    body = <FeedError testid="feed-category-failed" onRetry={() => window.location.reload()} />;
  } else if (isLoading) {
    body = (
OLD-END
NEW-BEGIN
    body = <FeedError testid="feed-category-failed" onRetry={() => window.location.reload()} />;
  } else if (isLoading && !showHeld) {
    body = (
NEW-END
EDIT src/components/marketplace/feed.tsx #11
OLD-BEGIN
    body = <FeedError testid="feed-error" retryTestid="feed-retry" onRetry={retry} />;
  } else if (cards.length === 0 && invite !== null) {
    // D215 — an empty list shows the invitation alone; the old empty box is retired.
    body = <InviteFirst invite={invite} at="alone" />;
  } else if (cards.length === 0) {
    // The category's name is still loading: the card waits for it.
OLD-END
NEW-BEGIN
    body = <FeedError testid="feed-error" retryTestid="feed-retry" onRetry={retry} />;
  } else if (shownCards.length === 0 && invite !== null) {
    // D215 — an empty list shows the invitation alone; the old empty box is retired.
    body = <InviteFirst invite={invite} at="alone" />;
  } else if (shownCards.length === 0) {
    // The category's name is still loading: the card waits for it.
NEW-END
EDIT src/components/marketplace/feed.tsx #12
OLD-BEGIN
            const id = section.label.placeId;
            const node = locationPath.find((n) => n.id === id);
            label = node ? inHeading(node) : null;
OLD-END
NEW-BEGIN
            const id = section.label.placeId;
            const node = shownPath.find((n) => n.id === id);
            label = node ? inHeading(node) : null;
NEW-END
EDIT src/components/marketplace/feed.tsx #13
OLD-BEGIN
        })}
        {hasMore ? (
          <div ref={moreRef} data-testid="feed-more" className="mt-6 flex min-h-11 justify-center">
OLD-END
NEW-BEGIN
        })}
        {shownHasMore ? (
          <div ref={moreRef} data-testid="feed-more" className="mt-6 flex min-h-11 justify-center">
NEW-END
EDIT src/components/marketplace/feed.tsx #14
OLD-BEGIN
          {/* D127 — no place chosen: the everywhere feed is "All listings", not "near you". */}
          {place ? inHeading(place) : t("nav.allListings")}
        </h1>
OLD-END
NEW-BEGIN
          {/* D127 — no place chosen: the everywhere feed is "All listings", not "near you". */}
          {shownPlace ? inHeading(shownPlace) : t("nav.allListings")}
        </h1>
NEW-END
EDIT src/components/marketplace/feed.tsx #15
OLD-BEGIN
        <Suspense fallback={null}>
          <Await promise={firstFeed}>
            {(held) => {
OLD-END
NEW-BEGIN
        <Suspense fallback={null}>
          <Await promise={firstFeed.page}>
            {(held) => {
NEW-END
C5. src/routes/index.tsx and src/routes/c.$slug.tsx, these edits (the feed under Suspense, the spinner its fallback):
EDIT src/routes/index.tsx #1
OLD-BEGIN

import { Feed } from "@/components/marketplace/feed";

OLD-END
NEW-BEGIN

import { Suspense } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Feed } from "@/components/marketplace/feed";
import { useI18n } from "@/i18n";

NEW-END
EDIT src/routes/index.tsx #2
OLD-BEGIN
function Index() {
  return <Feed />;
}
OLD-END
NEW-BEGIN
function Index() {
  const { t } = useI18n();
  // D234 S6 — the feed reads the server's first page as the page streams: the shell
  // is sent at once, the feed's cards follow in the same response.
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <Spinner label={t("feed.loading")} />
        </div>
      }
    >
      <Feed />
    </Suspense>
  );
}
NEW-END
EDIT src/routes/c.$slug.tsx #1
OLD-BEGIN

import { Feed } from "@/components/marketplace/feed";

OLD-END
NEW-BEGIN

import { Suspense } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Feed } from "@/components/marketplace/feed";
import { useI18n } from "@/i18n";

NEW-END
EDIT src/routes/c.$slug.tsx #2
OLD-BEGIN
function CategoryFeed() {
  return <Feed />;
}
OLD-END
NEW-BEGIN
function CategoryFeed() {
  const { t } = useI18n();
  // D234 S6 — the feed reads the server's first page as the page streams: the shell
  // is sent at once, the feed's cards follow in the same response.
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <Spinner label={t("feed.loading")} />
        </div>
      }
    >
      <Feed />
    </Suspense>
  );
}
NEW-END
C6. Turn 28's two siblings onto the shared readers:
EDIT src/features/ad-page/similar.ts #1
OLD-BEGIN
import { parseFeedPage, type FeedListing } from "@/features/feed/feed-page";
OLD-END
NEW-BEGIN
import { feedPath, parseFeedPage, type FeedListing } from "@/features/feed/feed-page";
NEW-END
EDIT src/features/ad-page/similar.ts #2
OLD-BEGIN
  const params = new URLSearchParams({ category: categoryId, size: "11" });
  if (placeId !== null) params.set("place", placeId);
  const answer = await callRoute(`/api/feed?${params.toString()}`, { auth: "none" });
OLD-END
NEW-BEGIN
  // D234 S6 — the feed read's one address builder (feedPath): eleven, so ten remain without the ad.
  const answer = await callRoute(feedPath(categoryId, placeId, null, 11), { auth: "none" });
NEW-END
EDIT src/components/shell/app-rail.tsx #1
OLD-BEGIN
  childrenOf,
  pathOf,
OLD-END
NEW-BEGIN
  childrenOf,
  feedRouteOf,
  pathOf,
NEW-END
EDIT src/components/shell/app-rail.tsx #2
OLD-BEGIN
      activePanel !== "marketplace" ||
      !(pathname === "/" || pathname.startsWith("/c/"))
    )
OLD-END
NEW-BEGIN
      activePanel !== "marketplace" ||
      // D234 S6 — the listings pages, read as everywhere else (feedRouteOf).
      feedRouteOf(pathname) === null
    )
NEW-END

PART D — THE BROWSER PROOF.
D1. e2e/ad-page.spec.ts, this edit (AP-54 after AP-53):
EDIT e2e/ad-page.spec.ts #1
OLD-BEGIN

  test("AP-46 Save and Share sit in the title box", async ({ page }) => {
OLD-END
NEW-BEGIN

  test("AP-54 the server draws the first cards and the browser keeps them: in the page's HTML, the very nodes once it is ready, no hydration error (D234 S6)", async ({
    page,
    request,
  }) => {
    const seller = await scratchSeller();
    const ads = [await seed(seller), await seed(seller)];
    for (const ad of ads) await seedPhotos(ad.id);
    // The page as the server sends it: the two cards are in its HTML.
    const html = await (await request.get(`/c/${seller.leafSlug}`)).text();
    expect(html.match(/data-testid="listing-card"/g) ?? []).toHaveLength(2);
    // A hydration failure is an uncaught error (React's #418-#425 in a production build).
    const failures: string[] = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && /hydrat|#41[89]|#42[1-5]/i.test(message.text()))
        failures.push(message.text());
    });
    // The first card as the server drew it, held when the document has been parsed.
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        Reflect.set(window, "__firstCard", document.querySelector('[data-testid="listing-card"]'));
      });
    });
    await gotoReady(page, `/c/${seller.leafSlug}`);
    await expect(page.locator('[data-testid="feed-container"][data-ready="1"]')).toBeAttached();
    await expect(page.getByTestId("listing-card")).toHaveCount(2);
    // React kept the server's nodes: a feed drawn again from scratch would have replaced them.
    const kept = await page.evaluate(() => {
      const first: unknown = Reflect.get(window, "__firstCard");
      return (
        first instanceof Element && first === document.querySelector('[data-testid="listing-card"]')
      );
    });
    expect(kept).toBe(true);
    expect(failures).toEqual([]);
  });

  test("AP-46 Save and Share sit in the title box", async ({ page }) => {
NEW-END

PART E — DOCS.
E1. docs/features/performance-strategy.md: a new section at the end, "## 12. The server draws the first cards and the browser keeps them (D234, Foundations turn 29)": the held page drawn by the page load's first feed until its own read lands, for its very address once the inputs are known; HeldFirstPage and its adapter, and why (the lab: a promise React has not seen settle makes it draw the feed again from scratch; read at once on arrival, React keeps the server's nodes); the route-level Suspense; the place path on FirstFeedPage; INC-901; AP-54 the browser proof; next: the shell's own first state from the server.
E2. docs/governance/mechanisms.md: add this line directly after the row-46 line (the line that begins "| 46 |"):
   | 47 | The listings pages' first cards are drawn by the server and kept by the browser (D234) | `HeldFirstPage` + `heldFirstPageAdapter` (`src/features/feed/held-first-page.ts`, registered in `src/start.ts`) — the root loader's hand-over, read at once on arrival; `useHeldFirstPage` (`src/features/feed/use-feed.ts`) — the page the feed draws until its own read lands; the route-level Suspense in `index.tsx` and `c.$slug.tsx` | `e2e/ad-page.spec.ts` AP-54 (the server's card nodes kept), `src/features/feed/held-first-page.test.ts` (HFP-1…3), `src/features/feed/use-feed.test.ts` (UFS-5…7) | none | any listings page; the shell's own first state next | Foundations turn 29 |
E3. docs/_changelog.md one entry "Foundations turn 29 (2026-10-25)"; roadmap.md the turn-29 line `[x]` with the final HEAD and the unit totals.
E4. AGENTS.md: replace the line that begins "- Speed (D234): each page's first-download ceiling" with exactly this one line (AGENTS.md then counts 6776 bytes by `wc -c AGENTS.md`):
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; a read every page makes is preloaded by `firstReadLinks` (src/lib/first-reads.ts) from its reader's own path builder; the listings pages' first feed page comes from the server in the page stream (`readFirstFeedPage`, src/server/first-screen.ts) as a `HeldFirstPage` (src/features/feed/held-first-page.ts, read at once on arrival): useFeed takes it once and the feed draws it until that read lands (`useHeldFirstPage`), so React keeps the server's cards; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
2b8cb870ab375d159c5d20a388588a977613f27a2df2c41315de0e0673e8894c  src/start.ts
a1d6e36ce975bf115f061e91297f18eb11ac2b20d25b906d4e9faaf71b4adb5f  src/routes/__root.tsx
8c57086c1615c197f46dc3a7fe556f73339f55c7ccb556d38d86cace603482cf  src/features/feed/feed-page.ts
784800e08561761b551ee3578546bee615ae6cc9b7fad89919df2e82432ec326  src/features/feed/feed-page.test.ts
8eca888c0457315b834bcf8c2855bbc0b4096c9ed242211b64c8d8da45cc05a7  src/server/first-screen.ts
085a385c85c2041e236db30492c439734863889e335f3de95b9d3abda67d1e5d  src/server/first-screen.test.ts
ca7a3b49537b0f860bf20f5b4aa5ef0b570bfec8be639908f78fda39a121c4f8  src/features/feed/use-feed.ts
80395c4123014d85af0a2d3f05f01018362b613588f9dd2425de5be1ef69f22a  src/components/marketplace/feed.tsx
5ad13ea27c618c81cc41bfea19a0ac73499bcfa11014e2cb8447fadaa8cb85b5  src/routes/index.tsx
8791ed0cda93ce217f3eee4b8a0869f554bed1d0105fd707e37745efa2bd7917  src/routes/c.$slug.tsx
7d9a6aef9376b8e6d06a545b344cb12ee1c6ac3e193a8eced1b2190e32285d61  src/features/ad-page/similar.ts
00e174d8fcc5c8c8c229b19fd1d09f217506e3814c37ce4f61ce5cacfa5a41d8  src/components/shell/app-rail.tsx
00bf926c0f9ae2faa2fd00bab5a0d0671613f1efce2b53d050b30fc33db1dc39  e2e/ad-page.spec.ts
55088272b7a6f60a64fd0a5904fdcfe175cc2d4386535733bda4f73bd6926f43  AGENTS.md
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — unchanged); `bun run test:unit` (paste totals and the HFP-, UFS-, FSP-7 and FP-16 lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: both maps' "scanned" 572 → 573, nothing else); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- <spec file> --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/ad-page.spec.ts by `--grep "AP-32 |AP-49 |AP-53 |AP-54 "` (the similar ads; the browser's own read with the cookie; the first page from the page; the server's cards kept); e2e/feed-screens.spec.ts by `--grep "FS-1 |FS-2 |FS-6 "` (a category page and a client navigation to its parent; the next page; a failed browser read and Retry); e2e/shell.spec.ts by `--grep "spinner renders|LS-3 |LS-6 |LS-10 |LS-12 |EV-1 |FRL-6 |PK-1 "` (the spinner; the place the shell shows; the rail's peek); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-29.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; FSP-7's red line against BASE; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run.
```
