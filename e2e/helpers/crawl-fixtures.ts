import { listingPath } from "../../src/features/ad-page/address";
import { adPageFixtures } from "./ad-page";
import { adminClient } from "./users";

/**
 * DEC-459 (c) — THE FAILURE CRAWL'S ADDRESSES: a route's params filled from the test's own
 * scratch rows (a seller with a public name, a category branch and a place; an ad of that seller)
 * or, for a reference row the crawl only reads (a published legal version, the base role, a staff
 * language), the row read through the service client; the legal draft editor on the global
 * terms. The impersonation page is not crawled: no session can be held (the allowlist's `page`
 * line). Callers install `cleanup` in afterEach.
 */
export function crawlFixtures() {
  const ads = adPageFixtures();
  let seller: Awaited<ReturnType<typeof ads.scratchSeller>> | null = null;
  const listings = new Map<string, { id: string; title: string }>();

  async function scratchSeller() {
    seller ??= await ads.scratchSeller();
    return seller;
  }

  async function listing(status: "active" | "draft") {
    const known = listings.get(status);
    if (known !== undefined) return known;
    const made = await ads.seed(await scratchSeller(), status);
    listings.set(status, made);
    return made;
  }

  async function referenceId(table: "legal_versions" | "roles", column: string, value: string) {
    const { data, error } = await adminClient()
      .from(table)
      .select("id")
      .eq(column, value)
      .order("id")
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`[e2e:crawl] reading ${table}: ${error.message}`);
    if (data === null) throw new Error(`[e2e:crawl] no ${table} row where ${column} = ${value}`);
    return data.id as string;
  }

  async function staffLanguage(): Promise<string> {
    const { data, error } = await adminClient()
      .from("languages")
      .select("code")
      .eq("enabled_admin", true)
      .eq("enabled_public", true)
      .order("code")
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(`[e2e:crawl] reading languages: ${error.message}`);
    if (data === null) throw new Error("[e2e:crawl] no language open to staff and public");
    return data.code as string;
  }

  /** The route's address with its params filled. */
  async function pathOf(route: string): Promise<string> {
    switch (route) {
      case "/$name":
        return `/${(await scratchSeller()).alias}`;
      case "/c/$slug":
        return `/c/${(await scratchSeller()).leafSlug}`;
      case "/l/$slug": {
        const ad = await listing("active");
        return listingPath(ad.title, await ads.publicIdOf(ad.id));
      }
      case "/legal/$kind":
        return "/legal/terms";
      case "/my-listings/$listingId":
      case "/admin/listings/$listingId":
        return route.replace("$listingId", (await listing("active")).id);
      case "/my-listings/$listingId/edit":
      case "/admin/listings/$listingId/edit":
        return route.replace("$listingId", (await listing("active")).id);
      case "/post/$listingId":
        return `/post/${(await listing("draft")).id}`;
      case "/account/legal/$versionId":
      case "/admin/legal/$versionId":
        return route.replace(
          "$versionId",
          await referenceId("legal_versions", "status", "published"),
        );
      case "/admin/users/$userId":
        return `/admin/users/${(await scratchSeller()).id}`;
      case "/admin/roles/$roleId":
        return `/admin/roles/${await referenceId("roles", "name", "user")}`;
      case "/admin/legal/edit":
        return "/admin/legal/edit?kind=terms";
      case "/admin/translations/$lang":
        return `/admin/translations/${await staffLanguage()}`;
      default:
        if (route.includes("$")) throw new Error(`[e2e:crawl] no address for ${route}`);
        return route;
    }
  }

  async function cleanup() {
    seller = null;
    listings.clear();
    await ads.cleanup();
  }

  return { pathOf, scratchSeller, cleanup };
}
