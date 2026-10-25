# Foundations — turn 26: speed S3 — a component fetched on demand never breaks the page (INC-897 closed); the admin crumbs off every page's first download (D234): brief (saved unchanged, 2026-10-25)

```text
FOUNDATIONS BUNDLE — TURN 26 (2026-10-25; DEC-237; D234 — the operator, 2026-10-25: "it should be the fastest, lightweight — we should do everything to make it that way … VERY IMPORTANT"; anchors located at 6eb3576ea82ddb2c926a23b29b9dc3e1737af83b). Tier B (on-demand loading; the shell's breadcrumbs; the bundle guard's ceilings). No migration. No new string. No package change. AGENTS.md: its speed line names resilientLazy (D4). Base: dev 6eb3576ea82ddb2c926a23b29b9dc3e1737af83b (Foundations turn 25's final commit; its CI run: A1). Before sending, every new line was read against every line of AGENTS.md and against the platform rules you quoted on 25 Oct: the one new control (the pin map's "Try again", B4) is the Button primitive; no map read by an outside key; no silent catch — every failure is logged as [client-error] and shown as the piece's own fallback; browser tests only through `bun run e2e:local`. ONE TURN. Parts, IN THIS ORDER: A — CI first; STEP 0; B — a component fetched on demand never breaks the page; C — the ceilings keep the saving; D — docs, register, roadmap, changelog.
BASE: 6eb3576ea82ddb2c926a23b29b9dc3e1737af83b
FLAGS: no-migration, no-new-string, no-package-change
SCOPE-BEGIN
src/lib/resilient-lazy.ts
src/lib/resilient-lazy.test.tsx
src/components/shell/breadcrumbs.tsx
src/components/shell/admin-detail-crumbs.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/step-where.tsx
src/i18n/compiled-catalog.ts
scripts/conformance/on-demand-imports.test.ts
scripts/conformance/on-demand-imports-allowlist.txt
scripts/route-budgets.mjs
scripts/check-bundle-size.mjs
SCOPE-END

THE SYSTEM (G0) — one concern, and its first-download dividend.
CONCERN: a piece of a screen fetched on demand never breaks the page — while it downloads, and if it cannot, the piece shows its own fallback, never the route's error screen ("This page didn't load") (INC-897).
MECHANISM: modules — `loadOnce` (src/lib/load-once.ts, D234 S1); components — NONE YET: built in B1 as NEW src/lib/resilient-lazy.ts, `resilientLazy(fetch, label, fallback)`: React.lazy whose failed download resolves to `fallback`, logged once as `[client-error] <label> failed to load`. React.lazy's own server render and hydration are kept (Suspense streams the piece; the browser hydrates it), so nothing changes when the download succeeds; the tab's one reload for a stale chunk (src/lib/stale-chunk.ts, INC-640) still runs first, and a failure that remains keeps the fallback for the page's life (browsers keep a failed module fetch until the page reloads).
CONSUMERS (every browser dynamic import outside loadOnce, the census of OD-1, at BASE): src/components/shell/breadcrumbs.tsx :43-:54 (four React.lazy crumbs) and its AdminUserCrumb and AdminRoleCrumb, which pulled the admin user and role reads into every page's first download — move in B2; src/features/posting/preview/listing-detail.tsx :41, :45 (React.lazy maps) and :383 (the pin snap's own import) — move in B3; src/features/posting/step-where.tsx :49-:52 (React.lazy maps in the wizard) — move in B4; src/i18n/compiled-catalog.ts :13, :22, :23 (the catalogue layers' loaders) — move onto loadOnce in B5; the three dated allowances (category-images-service.ts, legal.publishing.tsx, post_.$listingId.tsx) — unchanged.
COVERED HERE: every INC-897 site; INC-897 closes with this turn (OD-3 proves it). LEFT: none for this concern.
CONFORMANCE GUARD: scripts/conformance/on-demand-imports.test.ts — OD-1 now passes a dynamic import inside `resilientLazy(` as it passes one inside `loadOnce(`; OD-2 plants both; OD-3 becomes "INC-897 is closed: no allowance waits on it, and no React.lazy site is left in the browser's code" (red at BASE, B0). The bundle guard (route-budgets.mjs) keeps the first-download saving (C1).
EXCEPTIONS: none new; the three dated allowances stand.
FIVE LENSES — security: no data path changes; the moved admin crumbs read the same cached queries on the same pages · performance: the admin user and role crumbs leave every page's first download: the entry 289.9 → 287.3 KiB and every page about 2.7 KiB lighter (gzip 6, the supervisor's build of this change); the ceilings come down with it (C1) · failure modes: a crumb that cannot download shows "—" (an ad's crumb, its title); the ad page's still or large map shows its word "Map pin"; the wizard's pin preview shows nothing, and its pin map offers "Try again", which reloads the page (the draft is saved, as the feed's own retry does, feed.tsx :158); a catalogue layer that failed is asked again by the next load; each failure is one [client-error] line · consistency: one way to fetch a module on demand (loadOnce) and one way to fetch a component on demand (resilientLazy); no bare React.lazy remains · future growth: a new on-demand piece is one resilientLazy call with its fallback, or one loadOnce; OD-3 refuses a bare React.lazy.
FORWARD-SCAN: S4 (the login library off the first paint — a spec with Tesfaye) moves more modules behind loadOnce; the form kit (G54 c) reads no on-demand module. REGISTER: docs/governance/mechanisms.md — row 41 updated (D2); AGENTS.md's speed line names resilientLazy (D4).

WHY
- On a phone on a slow or flaky network, a lazily loaded crumb or map that fails to download threw to the route's error boundary, and the whole page became "This page didn't load" — for a piece the visitor may never have looked at. S1 gave modules a fetch that never breaks the page; this turn gives components the same, and takes the admin crumbs (and the admin reads behind them) off every visitor's first download.

STEP 0 — save this brief (the text between the BRIEF-BEGIN and BRIEF-END lines of the message that carried it, title line and fence included, ending with the closing fence and ONE newline) byte for byte as docs/governance/briefs/foundations-turn-26.md and paste its sha256sum and its byte count (the carrying message states both; a difference is a STOP). roadmap.md: line 3 names docs/governance/briefs/foundations-turn-26.md (the text after "The brief in force: " up to its closing parenthesis is replaced with `docs/governance/briefs/foundations-turn-26.md (Foundations turn 26: speed S3 — a component fetched on demand never breaks the page; the admin crumbs off every page's first download — D234)`; everything after it stays); under the Foundations bundle, directly after the line that begins "  - [x] Turn 25 (docs/governance/briefs/foundations-turn-25", add `  - [ ] Turn 26 (docs/governance/briefs/foundations-turn-26.md; no migration) — speed S3: resilientLazy for every on-demand component (INC-897 closed), the catalogue loaders on loadOnce, the admin user and role crumbs off the first download, the ceilings lowered (D234).` Tick nothing else.

HOW TO WORK
- Order: Part A (paste `git rev-parse HEAD`: this is <START>); STEP 0; Parts B–D; THE CHECKS; THE END-TO-END CHECK; THE COMPLETION REPORT; END THE TURN. Do not stop anywhere else. If the platform ends a turn early, report three lines (done, left, CI) with the done parts by letter and `git diff --name-only <START>`; the supervisor sends "continue".
- touching e2e/**: this turn changes no spec file.
- Run no stateful git command. Edits with your file-editing tool or a script that copies the brief's text. Every FILE block below is the file's whole text; every EDIT block replaces its OLD text (which occurs exactly once at BASE) with its NEW text.
- THE FILES: the SCOPE block above, plus docs/governance/briefs/foundations-turn-26.md, roadmap.md, docs/_changelog.md, docs/features/performance-strategy.md, docs/governance/mechanisms.md, AGENTS.md (D4 only), docs/governance/reports/foundations-turn-26.report.md (your completion report), docs/generated/i18n-usage.json and public/i18n-usage.json (only if they move). Anything else is a STOP naming the file and why.
- KEEP EVERY SAVE GREEN-SHAPED: the platform saves your work to dev mid-turn and every save runs CI. Land each step whole. After each part: read /tmp/observability/build-errors.log and fix every `error TS` line at its root; run the tests the part touched.
- Your platform rule stands, with no exception: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically." So the lowered ceilings (C1) are judged by CI's bundle-budget job on your final commit. At THE CHECKS, read /tmp/observability/build-errors.log: when it exists, paste every `error TS` line and fix each at its root (no `!`, cast, `any` or `@ts-expect-error`); when it does not, say so.
- Known limit, not yours: scripts/conformance/executor-hooks.test.ts EXH-17 (and at times EXH-11) times out in your sandbox (INC-890; they pass in CI). Do not change, skip or work around them; paste the failure lines under limits. Every other test must pass.
- Local runs: the unit suite whole at THE CHECKS, and the tests each part touched as you go; THE END-TO-END CHECK's specs through `bun run e2e:local -- <spec file> --grep "<pattern>"` (never plain `playwright test`), both projects, 2 workers, fake mode, 0 retries, within the 600-second sandbox ceiling (`E2E_CHROMIUM_PATH=/opt/ms-playwright/chromium-1194/chrome-linux/chrome` when the pinned browser is missing); stop any preview server a killed run left on its port before your first run; no local repeat runs (DEC-184); a run the ceiling kills is reported as such and never re-run in the background — CI on the final commit runs every test (S407).
- Behaviour contract: when every download succeeds, every page renders exactly as it does today — on the server and in the browser. A download that fails shows the piece's own fallback, as B1–B5 name. Nothing else changes.
- Knowledge K: K1 the mechanism above; K2 the report lists (file:line) every browser dynamic import outside loadOnce and resilientLazy after this turn (it must equal the three dated allowances), and every Suspense boundary left in the four files of Part B with its fallback; K3 OD-1…OD-3 land with resilientLazy; K4 no literal language or country code; K5 does not arise; K6 does not arise.
- Tests (G27, G38): no real row; no assertion loosened; red-first for OD-3 (B0's edits land first and run against the tree at <START>: paste OD-3 failing — the four INC-897 allowances waiting and the React.lazy files named — then passing after B5).
- If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.

PART A — CI FIRST.
A1. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, e2e-last-failure.md and guards-last-failure.md at the same address; paste the first six lines of the first and every failing job's evidence lines (expected: the run on 6eb3576ea82ddb2c926a23b29b9dc3e1737af83b). A red on 6eb3576ea82ddb2c926a23b29b9dc3e1737af83b is fixed first at its root (G21, G38) and named in the report; if the run has not finished, go on and read it again before Part B.

PART B — A COMPONENT FETCHED ON DEMAND NEVER BREAKS THE PAGE (INC-897).
B0. scripts/conformance/on-demand-imports.test.ts, these edits (land them first, for the red-first run of OD-3):
EDIT scripts/conformance/on-demand-imports.test.ts #1
OLD-BEGIN
 * reads every dynamic `import(` in the browser's code; one inside a `loadOnce(`
 * call passes, any other needs its allowlist line (key | reason | until).
 * Server-only imports (src/server/, server routes, *.server.ts and the server
OLD-END
NEW-BEGIN
 * reads every dynamic `import(` in the browser's code; one inside a `loadOnce(`
 * call passes, and so does a component's inside `resilientLazy(`
 * (src/lib/resilient-lazy.ts, D234 S3: React.lazy whose failure renders the
 * piece's own fallback); any other needs its allowlist line (key | reason | until).
 * Server-only imports (src/server/, server routes, *.server.ts and the server
NEW-END
EDIT scripts/conformance/on-demand-imports.test.ts #2
OLD-BEGIN

function insideLoadOnce(node: ts.Node): boolean {
OLD-END
NEW-BEGIN

/** The two ways a browser module is fetched on demand (D234 S1, S3). */
const ON_DEMAND = new Set(["loadOnce", "resilientLazy"]);

function insideLoadOnce(node: ts.Node): boolean {
NEW-END
EDIT scripts/conformance/on-demand-imports.test.ts #3
OLD-BEGIN
      ts.isIdentifier(parent.expression) &&
      parent.expression.text === "loadOnce"
    )
OLD-END
NEW-BEGIN
      ts.isIdentifier(parent.expression) &&
      ON_DEMAND.has(parent.expression.text)
    )
NEW-END
EDIT scripts/conformance/on-demand-imports.test.ts #4
OLD-BEGIN
        good,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst s = () => import("@/server/x");\n',
      );
OLD-END
NEW-BEGIN
        good,
        'import { loadOnce } from "@/lib/load-once";\nconst MAP = loadOnce(() => import("./map"));\nconst Pin = resilientLazy(() => import("./pin").then((m) => m.Pin), "the pin", NoPin);\nconst s = () => import("@/server/x");\n',
      );
NEW-END
EDIT scripts/conformance/on-demand-imports.test.ts #5
OLD-BEGIN

  it("OD-3 the bypasses still to move are the ones INC-897 names, and their number only falls", () => {
    const toMove = [...allowances.values()].filter((allowance) => allowance.until === "INC-897");
    expect(toMove.length).toBeLessThanOrEqual(4);
    expect(readFileSync(ALLOWLIST, "utf8")).toContain("INC-897");
  });
OLD-END
NEW-BEGIN

  it("OD-3 INC-897 is closed: no allowance waits on it, and no React.lazy site is left in the browser's code", () => {
    const waiting = [...allowances.values()].filter((allowance) => allowance.until === "INC-897");
    expect(waiting).toEqual([]);
    const lazySites = domain.filter((file) =>
      /\blazy\(\s*\(\)\s*=>\s*import\(/.test(readFileSync(file, "utf8")),
    );
    expect(lazySites).toEqual([]);
  });
NEW-END
B1. NEW src/lib/resilient-lazy.ts (sha256 882302a9b5ff84a9b5a25ab8ada9aa59a83dafcc8629bfae8c6b6a432e4d2c0d):
FILE-BEGIN src/lib/resilient-lazy.ts
import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * D234 speed turn S3 (INC-897) — A COMPONENT FETCHED ON DEMAND NEVER BREAKS THE PAGE.
 *
 * React.lazy throws a failed chunk download to the route's error boundary, so on a
 * flaky phone network one late map or crumb turned a whole page into "This page
 * didn't load". `resilientLazy(fetch, label, fallback)` is React.lazy whose failed
 * download resolves to `fallback` — what the piece shows in place of itself (a
 * crumb's "—", the map's own word) — logged once as `[client-error] <label> failed
 * to load`. The server render and the hydration stay React.lazy's own (Suspense
 * streams the piece, the browser hydrates it), so nothing changes when the download
 * succeeds. The tab's one reload for a stale chunk (src/lib/stale-chunk.ts, INC-640)
 * runs first; a failure that remains keeps the fallback for the page's life, since
 * browsers keep a failed module fetch until the page reloads.
 */
export function resilientLazy<P extends object>(
  fetchComponent: () => Promise<ComponentType<P>>,
  label: string,
  fallback: ComponentType<P>,
): LazyExoticComponent<ComponentType<P>> {
  return lazy(() =>
    fetchComponent().then(
      (component) => ({ default: component }),
      (error: unknown) => {
        console.error(`[client-error] ${label} failed to load`, error);
        return { default: fallback };
      },
    ),
  );
}
FILE-END src/lib/resilient-lazy.ts
NEW src/lib/resilient-lazy.test.tsx (sha256 2286950b971471b1bbbbf19a02c967e9064140c002c18edc20d76479de748f3d):
FILE-BEGIN src/lib/resilient-lazy.test.tsx
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

import { resilientLazy } from "./resilient-lazy";

/** D234 speed turn S3 (INC-897) — a component fetched on demand never breaks the page. */
function Piece({ name }: { name: string }) {
  return <p data-testid="piece">{name}</p>;
}
function Fallback() {
  return <p data-testid="piece-fallback">—</p>;
}

describe("resilientLazy (D234)", () => {
  it("RLZ-1 a downloaded component renders with its props, as React.lazy does", async () => {
    const Lazy = resilientLazy(async () => Piece, "the piece", Fallback);
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect((await screen.findByTestId("piece")).textContent).toBe("hello");
  });

  it("RLZ-2 a failed download renders the fallback and logs once — never the error boundary", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(new Error("offline")),
      "the piece",
      Fallback,
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(screen.queryByTestId("piece")).toBeNull();
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the piece failed to load",
      expect.anything(),
    );
    errors.mockRestore();
  });
});
FILE-END src/lib/resilient-lazy.test.tsx
B2. src/components/shell/breadcrumbs.tsx, these edits (every on-demand crumb is resilientLazy; the user and role crumbs move to the admin crumbs module, so the admin user and role reads leave every page's first download; the ad's Suspense fallback and its failure fallback are one AdTitleCrumb):
EDIT src/components/shell/breadcrumbs.tsx #1
OLD-BEGIN
import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

OLD-END
NEW-BEGIN
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";

NEW-END
EDIT src/components/shell/breadcrumbs.tsx #2
OLD-BEGIN
import { groupForPath, groupForSection, sectionForPath } from "@/features/admin/sections";
import { useAdminRole } from "@/features/admin/roles/use-admin-roles";
import { useAdminUser } from "@/features/admin/users/use-admin-users";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
OLD-END
NEW-BEGIN
import { groupForPath, groupForSection, sectionForPath } from "@/features/admin/sections";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
NEW-END
EDIT src/components/shell/breadcrumbs.tsx #3
OLD-BEGIN
import type { PublicListingDoc } from "@/features/ad-page/public-listing";

OLD-END
NEW-BEGIN
import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { resilientLazy } from "@/lib/resilient-lazy";

NEW-END
EDIT src/components/shell/breadcrumbs.tsx #4
OLD-BEGIN

/** INC-554 — the listing and language crumbs load only on their pages (never in the first paint). */
const AdminListingCrumb = lazy(() =>
  import("./admin-detail-crumbs").then((module) => ({ default: module.AdminListingCrumb })),
);
const AdminLanguageCrumb = lazy(() =>
  import("./admin-detail-crumbs").then((module) => ({ default: module.AdminLanguageCrumb })),
);
/** Bundle 18 turn 1 (D198) — the ad's crumb on the seller's pages, loaded only there. */
const MyListingCrumb = lazy(() =>
  import("./seller-crumbs").then((module) => ({ default: module.MyListingCrumb })),
);

const AdCrumbs = lazy(() => import("./ad-crumbs").then((module) => ({ default: module.AdCrumbs })));

/** What a lazy crumb shows while its module loads: the page's place, not a blank. */
function PendingCrumb() {
OLD-END
NEW-BEGIN

/**
 * INC-554 — the admin detail crumbs load only on their pages (never in the first
 * paint); D234 S3 adds the user and role crumbs to that module, so the admin user
 * and role reads leave every page's first download. Bundle 18 turn 1 (D198) — the
 * ad's crumb on the seller's pages, loaded only there. D234 S3 (INC-897) — each
 * is resilientLazy: a crumb that cannot download shows its place, never the
 * route's error screen.
 */
const AdminListingCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminListingCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminLanguageCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminLanguageCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminUserCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminUserCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminRoleCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminRoleCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const MyListingCrumb = resilientLazy(
  () => import("./seller-crumbs").then((module) => module.MyListingCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdCrumbs = resilientLazy(
  () => import("./ad-crumbs").then((module) => module.AdCrumbs),
  "a breadcrumb",
  AdTitleCrumb,
);

/** What an on-demand crumb shows while its module loads, or in its place: the page's place, not a blank. */
function PendingCrumb() {
NEW-END
EDIT src/components/shell/breadcrumbs.tsx #5
OLD-BEGIN

export function Breadcrumbs() {
OLD-END
NEW-BEGIN

/** The ad's own title as its last crumb: what the ad's trail shows until (or instead of) its category path. */
function AdTitleCrumb({ title }: { title: string; categoryId: string | null }) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage data-testid="breadcrumb-ad" className={CURRENT} title={title}>
          {title}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

export function Breadcrumbs() {
NEW-END
EDIT src/components/shell/breadcrumbs.tsx #6
OLD-BEGIN
            <Suspense
              fallback={
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage
                      data-testid="breadcrumb-ad"
                      className={CURRENT}
                      title={publicAd.title}
                    >
                      {publicAd.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              }
            >
OLD-END
NEW-BEGIN
            <Suspense
              fallback={<AdTitleCrumb title={publicAd.title} categoryId={publicAd.categoryId} />}
            >
NEW-END
EDIT src/components/shell/breadcrumbs.tsx #7
OLD-BEGIN
                {userDetailId ? (
                  <AdminUserCrumb userId={userDetailId} />
                ) : roleDetailId ? (
                  <AdminRoleCrumb roleId={roleDetailId} />
                ) : listingDetailId ? (
OLD-END
NEW-BEGIN
                {userDetailId ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminUserCrumb userId={userDetailId} />
                  </Suspense>
                ) : roleDetailId ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminRoleCrumb roleId={roleDetailId} />
                  </Suspense>
                ) : listingDetailId ? (
NEW-END
EDIT src/components/shell/breadcrumbs.tsx #8
OLD-BEGIN

/** U1d — the 4th admin crumb; reads the detail page's cached row. */
function AdminUserCrumb({ userId }: { userId: string }) {
  const { data } = useAdminUser(userId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-user" className={CURRENT}>
      {data?.displayName ?? "—"}
    </BreadcrumbPage>
  );
}

/** U2 — the 4th admin crumb for a role; reads the detail page's cached row. */
function AdminRoleCrumb({ roleId }: { roleId: string }) {
  const { data } = useAdminRole(roleId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-role" className={CURRENT}>
      {data?.displayName ?? data?.name ?? "—"}
    </BreadcrumbPage>
  );
}

export default Breadcrumbs;
OLD-END
NEW-BEGIN

export default Breadcrumbs;
NEW-END
src/components/shell/admin-detail-crumbs.tsx, these edits (the user and role crumbs, moved unchanged apart from their export; the shell's cut style kept):
EDIT src/components/shell/admin-detail-crumbs.tsx #1
OLD-BEGIN

import { BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLanguages } from "@/features/admin/translations/use-translations";
import { useAdminListing } from "@/features/admin-listings/use-admin-listing";

/**
 * Bundle 11, turn L4b (INC-554) — THE LAST CRUMB of two admin detail pages,
 * kept out of the first paint: the shell's breadcrumb loads this module only
 * on those pages (React.lazy), so a marketplace visitor never downloads the
 * admin reads behind it. Each reads the page's own cached query (the same
 * keys the page fills), so no second request is made.
 */

OLD-END
NEW-BEGIN

import { BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLanguages } from "@/features/admin/translations/use-translations";
import { useAdminListing } from "@/features/admin-listings/use-admin-listing";
import { useAdminRole } from "@/features/admin/roles/use-admin-roles";
import { useAdminUser } from "@/features/admin/users/use-admin-users";

/**
 * Bundle 11, turn L4b (INC-554) — THE LAST CRUMB of two admin detail pages,
 * kept out of the first paint: the shell's breadcrumb loads this module only
 * on those pages (resilientLazy, D234 S3), so a marketplace visitor never downloads the
 * admin reads behind it. Each reads the page's own cached query (the same
 * keys the page fills), so no second request is made.
 */

NEW-END
EDIT src/components/shell/admin-detail-crumbs.tsx #2
OLD-BEGIN
      {row?.nameNative ?? code}
    </BreadcrumbPage>
  );
}
OLD-END
NEW-BEGIN
      {row?.nameNative ?? code}
    </BreadcrumbPage>
  );
}

/**
 * D234 S3 — the user and role crumbs moved here from the shell's breadcrumbs, so
 * the admin user and role reads (and the step-up service behind them) leave every
 * page's first download. The cut style is the shell's own current segment.
 */
const CURRENT_CUT = "min-w-0 truncate font-semibold text-foreground underline underline-offset-4";

/** U1d — the 4th admin crumb; reads the detail page's cached row. */
export function AdminUserCrumb({ userId }: { userId: string }) {
  const { data } = useAdminUser(userId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-user" className={CURRENT_CUT}>
      {data?.displayName ?? "—"}
    </BreadcrumbPage>
  );
}

/** U2 — the 4th admin crumb for a role; reads the detail page's cached row. */
export function AdminRoleCrumb({ roleId }: { roleId: string }) {
  const { data } = useAdminRole(roleId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-role" className={CURRENT_CUT}>
      {data?.displayName ?? data?.name ?? "—"}
    </BreadcrumbPage>
  );
}
NEW-END
B3. src/features/posting/preview/listing-detail.tsx, these edits (the still map's module fetched once for its component and the pin snap; both maps resilientLazy):
EDIT src/features/posting/preview/listing-detail.tsx #1
OLD-BEGIN
import { CARD_SURFACE } from "@/components/layout/surface";
import { cn } from "@/lib/utils";
OLD-END
NEW-BEGIN
import { CARD_SURFACE } from "@/components/layout/surface";
import { loadOnce } from "@/lib/load-once";
import { resilientLazy } from "@/lib/resilient-lazy";
import { cn } from "@/lib/utils";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #2
OLD-BEGIN
import { keyFacts } from "../key-facts";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { SellerLine } from "../seller-line";
OLD-END
NEW-BEGIN
import { keyFacts } from "../key-facts";
import { Suspense, useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { SellerLine } from "../seller-line";
NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #3
OLD-BEGIN
 * U6-C1-R3b-4 — the still map is its own lazy chunk, shared with U7: a listing
 * with no pin never downloads Leaflet, and neither does the first paint.
 */
const MapPreview = lazy(() =>
  import("../map/map-preview").then((mod) => ({ default: mod.MapPreview })),
);

const MapLarge = lazy(() => import("../map/map-large").then((mod) => ({ default: mod.MapLarge })));

OLD-END
NEW-BEGIN
 * U6-C1-R3b-4 — the still map is its own lazy chunk, shared with U7: a listing
 * with no pin never downloads Leaflet, and neither does the first paint. D234 S3
 * (INC-897) — the still map's module is fetched once per visit (its component and
 * the pin snap share the one download, src/lib/load-once.ts), and both maps are
 * resilientLazy: a map that cannot download shows its word, never the route's
 * error screen.
 */
const MAP_PREVIEW = loadOnce(() => import("../map/map-preview"));
const MapPreview = resilientLazy(
  () => MAP_PREVIEW.load().then((mod) => mod.MapPreview),
  "the map",
  MapUnavailable,
);
const MapLarge = resilientLazy(
  () => import("../map/map-large").then((mod) => mod.MapLarge),
  "the large map",
  MapUnavailable,
);

/** What a map's place shows while it loads, or in its place: the map's own word. */
function MapUnavailable() {
  const { t } = useI18n();
  return <p className="text-xs text-muted-foreground">{t("post.pin.title")}</p>;
}

NEW-END
EDIT src/features/posting/preview/listing-detail.tsx #4
OLD-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    void import("../map/map-preview")
      .then(({ snap }) => {
OLD-END
NEW-BEGIN
    // Keep the still-map module off the marketplace's first-paint graph.
    MAP_PREVIEW.load()
      .then(({ snap }) => {
NEW-END
B4. src/features/posting/step-where.tsx, these edits (both wizard maps resilientLazy; the pin map's fallback is "Try again", the Button primitive, which reloads the page):
EDIT src/features/posting/step-where.tsx #1
OLD-BEGIN
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sortPlacesByName } from "@/lib/place-order";
import { callRoute } from "@/lib/route-client";
import type { ReactNode } from "react";
OLD-END
NEW-BEGIN
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sortPlacesByName } from "@/lib/place-order";
import { callRoute } from "@/lib/route-client";
import { resilientLazy } from "@/lib/resilient-lazy";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
NEW-END
EDIT src/features/posting/step-where.tsx #2
OLD-BEGIN
 * never carries a mapping library (the weight and budget guards prove it), and a
 * seller who never asks for a pin never downloads one.
 */
const MapPreview = lazy(() => import("./map/map-preview"));
const MapPinDropper = lazy(() =>
  import("./map/map-pin-dropper").then((mod) => ({ default: mod.MapPinDropper })),
);

OLD-END
NEW-BEGIN
 * never carries a mapping library (the weight and budget guards prove it), and a
 * seller who never asks for a pin never downloads one. D234 S3 (INC-897) — both
 * are resilientLazy: a preview that cannot download shows nothing, and the pin
 * map offers "Try again", which reloads the page (the draft is saved).
 */
const MapPreview = resilientLazy(
  () => import("./map/map-preview").then((mod) => mod.MapPreview),
  "the map",
  NoMap,
);
const MapPinDropper = resilientLazy(
  () => import("./map/map-pin-dropper").then((mod) => mod.MapPinDropper),
  "the pin map",
  PinMapUnavailable,
);

/** The pin preview's place when its map cannot download: nothing, as while it loads. */
function NoMap() {
  return null;
}

/** The pin map's place when it cannot download: "Try again" reloads the page; the draft is saved. */
function PinMapUnavailable() {
  const { t } = useI18n();
  return (
    <Button
      type="button"
      variant="outline"
      size="touch"
      data-testid="post-pin-map-retry"
      onClick={() => window.location.reload()}
    >
      {t("common.tryAgain")}
    </Button>
  );
}

NEW-END
B5. src/i18n/compiled-catalog.ts, these edits (each compiled layer fetched once per visit; the provider answers a failure as it always has):
EDIT src/i18n/compiled-catalog.ts #1
OLD-BEGIN
import type { Messages } from "./types";
OLD-END
NEW-BEGIN
import { loadOnce } from "@/lib/load-once";

import type { Messages } from "./types";
NEW-END
EDIT src/i18n/compiled-catalog.ts #2
OLD-BEGIN
/**
 * INC-107 — A MISSING COMPILED LAYER IS EMPTY, NOT FATAL.
OLD-END
NEW-BEGIN
/**
 * D234 S3 (INC-897) — each compiled layer is fetched once per visit
 * (src/lib/load-once.ts); a failed download is forgotten so the next load asks
 * again, and the provider answers it as it always has (INC-107, INC-816).
 *
 * INC-107 — A MISSING COMPILED LAYER IS EMPTY, NOT FATAL.
NEW-END
EDIT src/i18n/compiled-catalog.ts #3
OLD-BEGIN
 */
const loaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  am: () => import("./locales/am-base").then((m) => m.amBase),
};
OLD-END
NEW-BEGIN
 */
const AM_BASE = loadOnce(() => import("./locales/am-base").then((m) => m.amBase));
const loaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  am: () => AM_BASE.load(),
};
NEW-END
EDIT src/i18n/compiled-catalog.ts #4
OLD-BEGIN
 */
const adminLoaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  en: () => import("./locales/en-admin").then((m) => m.enAdmin),
  am: () => import("./locales/am-admin").then((m) => m.amAdmin),
};
OLD-END
NEW-BEGIN
 */
const EN_ADMIN = loadOnce(() => import("./locales/en-admin").then((m) => m.enAdmin));
const AM_ADMIN = loadOnce(() => import("./locales/am-admin").then((m) => m.amAdmin));
const adminLoaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  en: () => EN_ADMIN.load(),
  am: () => AM_ADMIN.load(),
};
NEW-END
B6. scripts/conformance/on-demand-imports-allowlist.txt becomes exactly (sha256 9f344d6a8ae5ab69202f922c8db3d314beeb20d8ec93a6f1cfb6d4ab1a641088; the four INC-897 lines leave with the sites they named):
FILE-BEGIN scripts/conformance/on-demand-imports-allowlist.txt
# D234 speed turns S1 and S3: a browser module fetched on demand outside loadOnce (src/lib/load-once.ts); INC-897's React.lazy sites and catalogue loaders moved onto it in S3. <path> | <reason> | <until>
src/features/admin-categories/category-images-service.ts | staff-only image variants, awaited inside the upload that reports its own failure | 2027-04-25
src/routes/legal.publishing.tsx | a route loader's data module: a failed download is the route's own error screen | 2027-04-25
src/routes/post_.$listingId.tsx | a route guard's door module: a failed download is the route's own error screen | 2027-04-25
FILE-END scripts/conformance/on-demand-imports-allowlist.txt

PART C — THE CEILINGS KEEP THE SAVING.
C1. scripts/route-budgets.mjs becomes exactly (sha256 2d002c44ce0d6c9c3a87746f6ba06ffd03c51d4e8921e063b8ed5ff59c26fb6b; every ceiling re-measured on the supervisor's build of this change, each the page's measured download plus 3 KiB, rounded up):
FILE-BEGIN scripts/route-budgets.mjs
/**
 * D234 speed turn S1 — THE PER-PAGE FIRST-DOWNLOAD CEILINGS (KiB, gzip level 6),
 * read by scripts/check-bundle-size.mjs. Every page route the build's route
 * manifest names has one line here (server routes under /api/ have no page and
 * are left out by rule); a page with no line fails the guard, and so does a line
 * whose page is gone. `public` marks a page a visitor opens signed out: its
 * first download must also hold none of PUBLIC_MUST_STAY_LAZY
 * (scripts/bundle-closure.mjs).
 *
 * A RATCHET: each ceiling is the page's measured download plus 3 KiB of
 * build-to-build room, rounded up. A page that grows past its ceiling fails; a page that
 * shrinks 8 KiB or more below it fails too, until its ceiling is lowered in the
 * same commit — so every saving is kept. Raising a ceiling is a commit that says
 * why. Measured 2026-10-25 on the S3 build (the comment after each line).
 */
export const ROUTE_BUDGETS_KIB = {
  "/": { ceiling: 304, public: true }, // 300.6
  "/$name": { ceiling: 303, public: true }, // 299.3
  "/account": { ceiling: 296, public: false }, // 292.2
  "/account_/legal": { ceiling: 293, public: false }, // 289.1
  "/account_/legal_/$versionId": { ceiling: 294, public: false }, // 290.6
  "/account_/saved": { ceiling: 303, public: false }, // 299.4
  "/admin": { ceiling: 292, public: false }, // 288.4
  "/admin/": { ceiling: 293, public: false }, // 289.2
  "/admin/ai": { ceiling: 344, public: false }, // 340.7
  "/admin/attributes": { ceiling: 360, public: false }, // 356.9
  "/admin/audit": { ceiling: 320, public: false }, // 317.0
  "/admin/categories": { ceiling: 369, public: false }, // 365.1
  "/admin/countries": { ceiling: 350, public: false }, // 346.7
  "/admin/coverage": { ceiling: 343, public: false }, // 339.3
  "/admin/images": { ceiling: 292, public: false }, // 289.0
  "/admin/impersonation_/$sessionId": { ceiling: 321, public: false }, // 317.5
  "/admin/legal": { ceiling: 307, public: false }, // 303.4
  "/admin/legal_/$versionId": { ceiling: 306, public: false }, // 302.7
  "/admin/legal_/edit": { ceiling: 313, public: false }, // 309.7
  "/admin/listings": { ceiling: 366, public: false }, // 362.4
  "/admin/listings_/$listingId": { ceiling: 394, public: false }, // 390.2
  "/admin/listings_/$listingId_/edit": { ceiling: 429, public: false }, // 425.5
  "/admin/locations": { ceiling: 299, public: false }, // 295.6
  "/admin/places": { ceiling: 351, public: false }, // 347.9
  "/admin/roles": { ceiling: 319, public: false }, // 315.1
  "/admin/roles_/$roleId": { ceiling: 325, public: false }, // 321.7
  "/admin/screening": { ceiling: 387, public: false }, // 383.2
  "/admin/translations": { ceiling: 409, public: false }, // 405.7
  "/admin/translations_/$lang": { ceiling: 334, public: false }, // 330.5
  "/admin/users": { ceiling: 317, public: false }, // 313.6
  "/admin/users_/$userId": { ceiling: 314, public: false }, // 310.2
  "/auth": { ceiling: 303, public: true }, // 299.2
  "/auth_/callback": { ceiling: 292, public: true }, // 288.1
  "/auth_/reset": { ceiling: 294, public: true }, // 290.2
  "/c/$slug": { ceiling: 304, public: true }, // 300.6
  "/dev/primitives": { ceiling: 306, public: false }, // 302.6
  "/dev/style": { ceiling: 308, public: false }, // 304.8
  "/dev/tall": { ceiling: 291, public: false }, // 287.6
  "/l/$slug": { ceiling: 328, public: true }, // 324.2
  "/legal/$kind": { ceiling: 295, public: true }, // 291.2
  "/legal/accept": { ceiling: 302, public: false }, // 298.3
  "/legal/publishing": { ceiling: 295, public: true }, // 291.9
  "/my-listings": { ceiling: 341, public: false }, // 337.1
  "/my-listings_/$listingId": { ceiling: 344, public: false }, // 340.8
  "/my-listings_/$listingId_/edit": { ceiling: 424, public: false }, // 420.1
  "/post": { ceiling: 424, public: false }, // 420.1
  "/post_/$listingId": { ceiling: 424, public: false }, // 420.1
  "/privacy": { ceiling: 295, public: true }, // 291.2
  "/settings": { ceiling: 300, public: false }, // 296.6
  "/terms": { ceiling: 295, public: true }, // 291.2
};

/** A page this far under its ceiling (KiB) fails until the ceiling is lowered. */
export const RATCHET_SLACK_KIB = 8;
FILE-END scripts/route-budgets.mjs
C2. scripts/check-bundle-size.mjs, this edit (the entry's ceiling follows):
EDIT scripts/check-bundle-size.mjs #1
OLD-BEGIN
  js: 293,
OLD-END
NEW-BEGIN
  // D234 speed turn S3 (2026-10-25): the admin user and role crumbs left it too (289.9 → 287.3 measured).
  js: 291,
NEW-END

PART D — DOCS.
D1. docs/features/performance-strategy.md: a new section at the end, "## 9. A component fetched on demand never breaks the page (D234, Foundations turn 26)": resilientLazy (React.lazy whose failure renders the piece's own fallback; the server render and hydration unchanged; the stale-chunk reload first), the four sites and each fallback, the catalogue loaders on loadOnce, the admin user and role crumbs off the first download (289.9 → 287.3 KiB), and INC-897 closed (OD-3).
D2. docs/governance/mechanisms.md: replace row 41's line, the line that begins "| 41 | A module a page fetches on demand is fetched once per visit", with exactly this line:
   | 41 | A module or a component a page fetches on demand is fetched once per visit, and a failed download never breaks the page (INC-897, closed in Foundations turn 26) | `loadOnce` (`src/lib/load-once.ts`) for modules; `resilientLazy` (`src/lib/resilient-lazy.ts`) for components; consumers: `useCategoryGlyphs`, the date field's calendar, `loadLeaflet`, `loadPhoneLib`, the catalogue layers, the on-demand crumbs, the ad page's and the wizard's maps | `scripts/conformance/on-demand-imports.test.ts` (OD-1…OD-3; OD-3 refuses a bare React.lazy) | `scripts/conformance/on-demand-imports-allowlist.txt` (three dated) | any module, any screen | Foundations turns 24 and 26 |
D3. docs/_changelog.md one entry "Foundations turn 26 (2026-10-25)"; roadmap.md the turn-26 line `[x]` with the final HEAD and the unit totals.
D4. AGENTS.md: replace the line that begins "- Speed (D234): each page's first-download ceiling" with exactly this one line (AGENTS.md then counts 6322 bytes by `wc -c AGENTS.md`):
- Speed (D234): each page's first-download ceiling lives in scripts/route-budgets.mjs; on-demand modules via `loadOnce` (src/lib/load-once.ts) and on-demand components via `resilientLazy` (src/lib/resilient-lazy.ts), never a bare React.lazy; below-the-fold work via `useNearViewport` (src/lib/use-near-viewport.ts); glyphs via `useCategoryGlyphs`; the calendar (date-calendar.tsx) and schema shapers (posting/schema-shape.ts) stay off public pages.

THE CHECKS (in this order): paste the sha256sum of every file this brief gives a sha256 for, and of these edited files, which then print exactly:
0d231b962fb54a0752f6c4abeb68e3fd17f39f0a314a0e8e28cca5349635bbcf  scripts/conformance/on-demand-imports.test.ts
a4c1bb730ec7fecedd89be59d2cf32338d37fc7317ba54cfec54cbe5a8ab0140  src/components/shell/breadcrumbs.tsx
a279848d6fc493a7ce1162ecbad38df3052ed6b5022aec1ac8bc8d5b2ff71795  src/components/shell/admin-detail-crumbs.tsx
de675ab64a7881f3589eccfb7358d0e8f5a976595a711160c3f10193d625179c  src/features/posting/preview/listing-detail.tsx
27758a94ff288cd72be4555dcb214685a107a6e3c6d2f24c9287512ff971d862  src/features/posting/step-where.tsx
2e090311ab749429b3959ea73b1ba91aea058fb2a9a8015ddb70b615c5430d79  src/i18n/compiled-catalog.ts
9863825662b67b8bbdd9502ef521924f4dea76aa3b4945e5840287745e2f6d9d  scripts/check-bundle-size.mjs
150288e8b6056ed0813990ae9a81aaa38d73963f97fb412082a70001652efe1d  AGENTS.md
(each must equal the brief's; a difference is fixed by re-copying, never by editing the expectation); `bun run lint` (paste the error and warning counts; expected 0 errors, 39 warnings — unchanged); `bun run test:unit` (paste totals and the OD- and RLZ- lines); /tmp/observability/build-errors.log read; `bun run i18n:usage` (expected: no change); `bun run format:check` last.

THE END-TO-END CHECK (through `bun run e2e:local -- <spec file> --grep "<pattern>"`, never plain `playwright test`; both projects, 0 retries, fake mode, within the ceiling — CI runs every test): e2e/breadcrumbs.spec.ts by `--grep "BR-1 |BR-3 "` (the seller's and the admin's listing crumbs); e2e/admin-users.spec.ts by `--grep "AU-7 "` (the user crumb, moved); e2e/ad-page.spec.ts by `--grep "AP-9 |AP-39 |AP-43 "` (the ad's crumb and its maps); e2e/post-wizard-where.spec.ts by `--grep "PW-100 |PW-96 "` (the wizard's pin preview and pin map); paste every count line.

THE COMPLETION REPORT (docs/governance/reports/foundations-turn-26.report.md, and its summary in chat): the file list from `git diff --name-only <START>` (plus `git ls-files` for each new file); done or not done by part and step; every sha256 line of THE CHECKS; the red-first lines for OD-3; the K2 lists (file:line); the first six lines of ci-status.md for the last commit you can read; every departure with its reason. THE CI WAIT REPORT: after the final commit, END THE TURN; the supervisor reads the run (its bundle-budget job judges the lowered ceilings).
```
