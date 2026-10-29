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
  isTreePayload,
  parseCategoryTree,
  type CategoryTreeSeed,
  type TreePayload,
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

/**
 * INC-974 — ONE TREE READ PER REQUEST. The rail's first-paint seed and the feed's
 * /c/<slug> lookup ask the tree route once: the answer is held per Request object
 * (a WeakMap — per-request, never state shared between two visitors) and dropped
 * with the request.
 */
const treeAnswers = new WeakMap<Request, Promise<Record<string, unknown> | null>>();

function treeAnswerOf(request: Request): Promise<Record<string, unknown> | null> {
  let held = treeAnswers.get(request);
  if (held === undefined) {
    held = answerOf(categoryTreeGet, new URL(request.url).origin, CATEGORY_TREE_PATH).catch(
      (error: unknown) => {
        console.warn("[first-screen]", CATEGORY_TREE_PATH, "was not read:", errorText(error));
        return null;
      },
    );
    treeAnswers.set(request, held);
  }
  return held;
}

/**
 * INC-974 — the longest the page's HTML waits for the rail's categories (the
 * FIRST_PAGE_DEADLINE_MS family; this one is awaited, so it is shorter). Past it
 * the rail draws its skeleton and the browser reads the tree, as before.
 */
export const FIRST_TREE_DEADLINE_MS = 600;

/**
 * INC-974 — THE RAIL'S CATEGORY NAMES ARRIVE WITH THE PAGE. The tree route's
 * in-process, version-cached answer, shaped to what the first paint draws
 * (`first-rail`: the roots and the selected category's path; the full tree's
 * gzip is over the 3 KiB ruling), or null — deadline, refusal, failure, or the
 * E2E switch — with one line. Never throws. The browser's own read fills in the
 * rest; a first-rail seed is never taken for the full tree (category-tree.ts).
 */
/** The pointer a child calls home: its primary, else its first (buildTree's rule). */
function homeOf(pointers: TreePayload["pointers"], childId: string) {
  const own = pointers.filter((pointer) => pointer.child_id === childId);
  return own.find((pointer) => pointer.is_primary) ?? own[0];
}

/**
 * INC-974 — the first-rail shape: the roots, the selected category's home chain,
 * and the children of every node on that chain; image links left out (the rail
 * draws none). Null for a payload that does not parse (F4).
 */
export function firstRailPayload(payload: unknown, slug: string | null): TreePayload | null {
  if (!isTreePayload(payload)) return null;
  const keep = new Set<string>();
  const pointers = payload.pointers.filter((pointer) => pointer.parent_id === null);
  for (const pointer of pointers) keep.add(pointer.child_id);
  const selected = slug === null ? undefined : payload.nodes.find((node) => node.slug === slug);
  const chain = new Set<string>();
  for (let id = selected?.id; id !== undefined && !chain.has(id); ) {
    chain.add(id);
    keep.add(id);
    id = homeOf(payload.pointers, id)?.parent_id ?? undefined;
  }
  for (const pointer of payload.pointers) {
    if (pointer.parent_id !== null && chain.has(pointer.parent_id)) {
      pointers.push(pointer);
      keep.add(pointer.child_id);
    } else if (pointer.parent_id !== null && chain.has(pointer.child_id)) {
      pointers.push(pointer);
    }
  }
  return {
    version: payload.version,
    nodes: payload.nodes
      .filter((node) => keep.has(node.id))
      .map((node) => ({ ...node, image_url: null, image_thumb_url: null })),
    pointers: [...new Set(pointers)],
  };
}

export async function readFirstCategoryTree(request: Request): Promise<CategoryTreeSeed | null> {
  if (isE2E && /(?:^|;\s*)e2e_first_screen=off(?:;|$)/.test(request.headers.get("cookie") ?? "")) {
    return null;
  }
  const slug = feedRouteOf(new URL(request.url).pathname)?.slug ?? null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<"deadline">((resolve) => {
    timer = setTimeout(() => resolve("deadline"), FIRST_TREE_DEADLINE_MS);
  });
  try {
    const answer = await Promise.race([treeAnswerOf(request), deadline]);
    if (answer === "deadline") {
      console.warn("[first-screen] tree deadline passed; the browser reads the tree");
      return null;
    }
    if (answer === null) return null;
    const payload = firstRailPayload(answer, slug);
    if (payload === null) {
      console.warn("[first-screen]", CATEGORY_TREE_PATH, "answered a tree that does not parse");
      return null;
    }
    return { seed: "first-rail", payload };
  } finally {
    clearTimeout(timer);
  }
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
    route.slug === null ? null : treeAnswerOf(request),
  ]);
  if (markets === null) return null;
  let categoryId: string | null = null;
  if (route.slug !== null) {
    if (categories === null) return null;
    const parsed = parseCategoryTree(categories);
    if (parsed === null) {
      console.warn("[first-screen]", CATEGORY_TREE_PATH, "answered a tree that does not parse");
      return null;
    }
    // An unknown slug reads no feed: the page says the category is missing.
    const found = parsed.tree.nodes.find((node) => node.slug === route.slug);
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
  const answer = await answerOf(feedGet, url.origin, path);
  if (answer === null) return null;
  const page = parseFeedPage(answer);
  if (page === null) {
    console.warn("[first-screen]", path, "answered a page that does not parse");
    return null;
  }
  const covers = (feedSections(page.cards, page.ladder)[0]?.cards ?? [])
    .slice(0, COVERS)
    .map((card) =>
      card.coverPhotoId === null
        ? null
        : photoUrl({ id: card.coverPhotoId }, CARD_THEN_THUMB, page.coverLinks),
    )
    .filter((cover): cover is string => cover !== null);
  return { path, page, covers, places: area.kind === "place" ? area.path : [] };
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
