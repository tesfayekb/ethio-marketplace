import { randomBytes } from "node:crypto";

import { listingPath } from "../../src/features/ad-page/address";
import { adPageFixtures } from "./ad-page";
import { destroyLegalChain, seedLegalDocument, seedLegalVersion } from "./legal-scratch";
import { SCRATCH_PREFIXES } from "./scratch";
import { adminClient } from "./users";

/**
 * A group key of the doors' shape (32 lowercase hex) that no report holds: the staff Errors
 * page for it asks the doors for its reports on every load, and draws its empty state — no row is
 * seeded, so nothing is left to remove (INC-1331).
 */
const NO_ERROR_GROUP = "0".repeat(32);

/**
 * DEC-459 (c) — THE FAILURE CRAWL'S ADDRESSES: a route's params filled from the test's own
 * scratch rows (a seller with a public name, a category branch and a place; an ad of that seller;
 * a published version of a scratch legal kind, which no gate reads) or, for a reference row the
 * migrations seed (the base role, a staff language), the row read through the service client;
 * the legal draft editor on the global terms. The impersonation page is not crawled: no session
 * can be held (the allowlist's `page` line). Callers install `cleanup` in afterEach.
 */
export function crawlFixtures() {
  const ads = adPageFixtures();
  let seller: Awaited<ReturnType<typeof ads.scratchSeller>> | null = null;
  const listings = new Map<string, { id: string; title: string }>();
  let legal: { documentId: string; versionId: string } | null = null;

  function failed(error: { message: string } | null, phase: string) {
    if (error) throw new Error(`[e2e:crawl] ${phase}: ${error.message}`);
  }

  async function legalVersion(): Promise<string> {
    if (legal !== null) return legal.versionId;
    const kind = `${SCRATCH_PREFIXES.dash}crawl-${randomBytes(4).toString("hex")}`;
    const documentId = await seedLegalDocument("crawl", kind, null);
    try {
      const version = await seedLegalVersion("crawl", {
        document_id: documentId,
        version: 1,
        status: "published",
        label: "crawl",
        body_en: "## Crawl\nScratch text",
        body_am: "Scratch text",
        changelog: "scratch change",
        material: false,
        effective_at: new Date(Date.now() - 60_000).toISOString(),
        published_at: new Date(Date.now() - 60_000).toISOString(),
        settings_snapshot: {},
      });
      legal = { documentId, versionId: version.id };
    } catch (error) {
      await destroyLegalChain("crawl", { documentIds: [documentId] });
      throw error;
    }
    return legal.versionId;
  }

  async function destroyLegal() {
    if (legal === null) return;
    const { documentId, versionId } = legal;
    legal = null;
    await destroyLegalChain("crawl", { documentIds: [documentId], versionIds: [versionId] });
  }

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

  async function referenceId(table: "roles", column: string, value: string) {
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
        return route.replace("$versionId", await legalVersion());
      case "/admin/users/$userId":
        return `/admin/users/${(await scratchSeller()).id}`;
      case "/admin/roles/$roleId":
        return `/admin/roles/${await referenceId("roles", "name", "user")}`;
      case "/admin/legal/edit":
        return "/admin/legal/edit?kind=terms";
      case "/admin/errors/$group":
        return `/admin/errors/${NO_ERROR_GROUP}`;
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
    try {
      await destroyLegal();
    } finally {
      await ads.cleanup();
    }
  }

  return { pathOf, scratchSeller, cleanup };
}
