/**
 * DEC-459 (c) — THE FAILURE CRAWL'S PAGES: every page route of src/routeTree.gen.ts, each with
 * the audiences that open it, in the spec file of its area (a file holds at most about 25 tests,
 * so the lanes share the crawl). A route here or a `page …` line of e2e/failure-crawl-allowlist.txt
 * — scripts/conformance/failure-crawl.ts fails a page route that is neither. No import: the
 * census reads this list too (a type is all it imports).
 *
 * `via: "client"` — the page's first read comes from the server in the page stream (its loader);
 * the crawl reaches that read by a client navigation, where the loader's read is the browser's.
 */
import type { Audience } from "./failure-crawl-judge";

export type CrawlArea =
  | "public"
  | "member-public"
  | "member-account"
  | "member-listings"
  | "admin-catalog"
  | "admin-people"
  | "admin-content";

export type CrawlPage = {
  /** The test's id. */
  id: string;
  /** The route's full path, as src/routeTree.gen.ts names it. */
  route: string;
  audience: Audience;
  area: CrawlArea;
  via?: "client";
};

export const CRAWL_PAGES: readonly CrawlPage[] = [
  { id: "FCR-1", route: "/", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-2", route: "/$name", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-3", route: "/c/$slug", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-4", route: "/l/$slug", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-5", route: "/legal/$kind", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-6", route: "/terms", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-7", route: "/privacy", audience: "visitor", area: "public", via: "client" },
  { id: "FCR-8", route: "/auth", audience: "visitor", area: "public" },
  { id: "FCR-9", route: "/auth/callback", audience: "visitor", area: "public" },
  { id: "FCR-10", route: "/auth/reset", audience: "visitor", area: "public" },
  { id: "FCR-11", route: "/dev/primitives", audience: "visitor", area: "public" },
  { id: "FCR-12", route: "/dev/style", audience: "visitor", area: "public" },
  { id: "FCR-13", route: "/dev/tall", audience: "visitor", area: "public" },

  { id: "FCR-20", route: "/", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-21", route: "/$name", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-22", route: "/c/$slug", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-23", route: "/l/$slug", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-24", route: "/legal/$kind", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-25", route: "/terms", audience: "member", area: "member-public", via: "client" },
  { id: "FCR-26", route: "/privacy", audience: "member", area: "member-public", via: "client" },

  { id: "FCR-30", route: "/account", audience: "member", area: "member-account" },
  { id: "FCR-31", route: "/account/legal", audience: "member", area: "member-account" },
  {
    id: "FCR-32",
    route: "/account/legal/$versionId",
    audience: "member",
    area: "member-account",
  },
  { id: "FCR-33", route: "/account/saved", audience: "member", area: "member-account" },
  { id: "FCR-34", route: "/settings", audience: "member", area: "member-account" },
  { id: "FCR-35", route: "/legal/accept", audience: "member", area: "member-account" },
  { id: "FCR-36", route: "/legal/publishing", audience: "member", area: "member-account" },
  // The member's start page: its reads are the signed-in shell's, crawled here once.
  { id: "FCR-37", route: "/dev/tall", audience: "member", area: "member-account" },

  { id: "FCR-40", route: "/my-listings", audience: "member", area: "member-listings" },
  {
    id: "FCR-41",
    route: "/my-listings/$listingId",
    audience: "member",
    area: "member-listings",
  },
  {
    id: "FCR-42",
    route: "/my-listings/$listingId/edit",
    audience: "member",
    area: "member-listings",
  },
  { id: "FCR-43", route: "/post", audience: "member", area: "member-listings" },
  { id: "FCR-44", route: "/post/$listingId", audience: "member", area: "member-listings" },

  { id: "FCR-50", route: "/admin/categories", audience: "staff", area: "admin-catalog" },
  { id: "FCR-51", route: "/admin/attributes", audience: "staff", area: "admin-catalog" },
  { id: "FCR-52", route: "/admin/images", audience: "staff", area: "admin-catalog" },
  { id: "FCR-53", route: "/admin/countries", audience: "staff", area: "admin-catalog" },
  { id: "FCR-54", route: "/admin/coverage", audience: "staff", area: "admin-catalog" },
  { id: "FCR-55", route: "/admin/locations", audience: "staff", area: "admin-catalog" },
  { id: "FCR-56", route: "/admin/places", audience: "staff", area: "admin-catalog" },
  { id: "FCR-57", route: "/admin/packages", audience: "staff", area: "admin-catalog" },
  { id: "FCR-58", route: "/admin/monetisation", audience: "staff", area: "admin-catalog" },

  { id: "FCR-60", route: "/admin/users", audience: "staff", area: "admin-people" },
  { id: "FCR-61", route: "/admin/users/$userId", audience: "staff", area: "admin-people" },
  { id: "FCR-62", route: "/admin/roles", audience: "staff", area: "admin-people" },
  { id: "FCR-63", route: "/admin/roles/$roleId", audience: "staff", area: "admin-people" },
  { id: "FCR-65", route: "/admin/audit", audience: "staff", area: "admin-people" },
  { id: "FCR-66", route: "/admin/screening", audience: "staff", area: "admin-people" },
  { id: "FCR-67", route: "/admin/ai", audience: "staff", area: "admin-people" },

  { id: "FCR-70", route: "/admin/", audience: "staff", area: "admin-content" },
  { id: "FCR-71", route: "/admin/listings", audience: "staff", area: "admin-content" },
  {
    id: "FCR-72",
    route: "/admin/listings/$listingId",
    audience: "staff",
    area: "admin-content",
  },
  {
    id: "FCR-73",
    route: "/admin/listings/$listingId/edit",
    audience: "staff",
    area: "admin-content",
  },
  { id: "FCR-74", route: "/admin/legal", audience: "staff", area: "admin-content" },
  {
    id: "FCR-75",
    route: "/admin/legal/$versionId",
    audience: "staff",
    area: "admin-content",
  },
  { id: "FCR-76", route: "/admin/legal/edit", audience: "staff", area: "admin-content" },
  { id: "FCR-77", route: "/admin/translations", audience: "staff", area: "admin-content" },
  {
    id: "FCR-78",
    route: "/admin/translations/$lang",
    audience: "staff",
    area: "admin-content",
  },
];

/** The rows of one area's spec file. */
export function pagesOf(area: CrawlArea): CrawlPage[] {
  return CRAWL_PAGES.filter((page) => page.area === area);
}
