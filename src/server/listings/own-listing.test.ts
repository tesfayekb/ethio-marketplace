import { describe, expect, it } from "vitest";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { ownListing } from "@/server/listings/own-listing";

/**
 * Foundations turn 3 (DEC-237) — ONE OWNERSHIP READ (OL-1, OL-2).
 */

function fakeClient(answer: { data: unknown; error: unknown }) {
  const chain: string[] = [];
  const builder = {
    select(columns: string) {
      chain.push(`select ${columns}`);
      return builder;
    },
    eq(column: string, value: string) {
      chain.push(`eq ${column}=${value}`);
      return builder;
    },
    async maybeSingle() {
      chain.push("maybeSingle");
      return answer;
    },
  };
  const client = {
    from(table: string) {
      chain.push(`from ${table}`);
      return builder;
    },
  } as unknown as SupabaseClient<Database>;
  return { client, chain };
}

describe("ownListing — the caller's listing", () => {
  it("OL-1 the read carries the id AND the seller condition", async () => {
    const { client, chain } = fakeClient({ data: { id: "l-1", status: "draft" }, error: null });
    const outcome = await ownListing(client, "seller-1", "l-1", "id, status");
    expect(outcome).toEqual({ row: { id: "l-1", status: "draft" } });
    expect(chain).toEqual([
      "from listings",
      "select id, status",
      "eq id=l-1",
      "eq seller_id=seller-1",
      "maybeSingle",
    ]);
  });

  it("OL-2 a read error and a missing row are distinct outcomes", async () => {
    const failed = await ownListing(
      fakeClient({ data: null, error: { message: "down" } }).client,
      "seller-1",
      "l-1",
      "id",
    );
    expect(failed).toEqual({ error: { message: "down" } });
    const missing = await ownListing(
      fakeClient({ data: null, error: null }).client,
      "seller-1",
      "l-1",
      "id",
    );
    expect(missing).toEqual({ row: null });
  });
});
