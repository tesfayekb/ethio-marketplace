import { test } from "../fixtures";
import { RUN } from "./posting";
import { SCRATCH_PREFIXES } from "./scratch";
import { adminClient } from "./users";

/**
 * P-2 (c) — SCRATCH REACH ROWS for the reach specs (LDR-7, LVP-5): three
 * enabled reach rows above every real one, their keys from ONE draw (INC-1082),
 * and the scratch market's included reach set to the middle one — `low` sorts
 * under it, `unpriced` over it with no price in the market. Every key is
 * recorded in the caller's `keep` list as soon as it is written, and
 * `destroyScratchReaches` removes them after the market that names one (J3).
 * `includedSelfServe: false` gives the included row the real catalogue's shape
 * (`city`: enabled, not self-serve — INC-1092, DEC-358).
 */

const TAG = "[e2e:reach-rows]";
/** The scratch reach rows' key prefix (letters first, the key check's form). */
export const REACH_PREFIX = `${SCRATCH_PREFIXES.underscore}lvl_r`;

/** Letters and digits from one draw. */
function draw(): string {
  return Math.random().toString(36).slice(2, 8);
}

export async function seedScratchReaches(
  marketCode: string,
  keep: string[],
  { includedSelfServe = true }: { includedSelfServe?: boolean } = {},
) {
  const client = adminClient();
  const top = await client
    .from("listing_packages")
    .select("sort")
    .eq("kind", "reach")
    .order("sort", { ascending: false })
    .limit(1)
    .single();
  if (top.error || !top.data) throw new Error(`${TAG} reach sort: ${top.error?.message}`);
  // J1 — run × worker × project × the test's draw, inside the key check's 32 characters.
  const clean = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const worker = clean(process.env["TEST_WORKER_INDEX"] ?? "0").slice(0, 2);
  const twin = clean(test.info().project.name).slice(0, 1) || "x";
  const stem = `${REACH_PREFIX}_${clean(RUN).slice(0, 6)}_${worker}_${twin}_${draw()}`;
  const sort = Number(top.data.sort) + 100;
  const rows = {
    low: { key: `${stem}_lo`, sort, days: 10, selfServe: true },
    included: { key: `${stem}_in`, sort: sort + 1, days: 30, selfServe: includedSelfServe },
    unpriced: { key: `${stem}_up`, sort: sort + 2, days: 40, selfServe: true },
  };
  const inserted = await client.from("listing_packages").insert(
    Object.values(rows).map((row) => ({
      key: row.key,
      kind: "reach",
      name_en: `E2E reach ${row.key}`,
      days: row.days,
      enabled: true,
      self_serve: row.selfServe,
      extends_lifetime: false,
      sort: row.sort,
    })),
  );
  if (inserted.error) throw new Error(`${TAG} reach rows seed: ${inserted.error.message}`);
  keep.push(...Object.values(rows).map((row) => row.key));
  const included = await client
    .from("market_settings")
    .update({ included_reach: rows.included.key })
    .eq("country_code", marketCode);
  if (included.error) throw new Error(`${TAG} included reach: ${included.error.message}`);
  return rows;
}

/** Removes the scratch reach rows; a failure's words, or null. Never a key outside the prefix. */
export async function destroyScratchReaches(keys: string[]): Promise<string | null> {
  if (keys.length === 0) return null;
  if (keys.some((key) => !key.startsWith(REACH_PREFIX)))
    return `refusing to delete ${keys.join(", ")}`;
  const { error } = await adminClient().from("listing_packages").delete().in("key", keys);
  return error ? error.message : null;
}
