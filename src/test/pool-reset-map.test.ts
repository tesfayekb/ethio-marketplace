import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";

import { POOL_EXEMPT_TABLES, POOL_RESET_TABLES } from "../../e2e/helpers/pool-reset-map";

/** DEC-099 — every table holding a user id is declared RESET or EXEMPT. */
const USER_COLUMN = /^(user_id|seller_id|actor_id|target_id|actor|reviewer|\w+_by)$/;

function tablesWithUserColumn(): string[] {
  const source = readFileSync(resolve(process.cwd(), "src/integrations/supabase/types.ts"), "utf8");
  const tables = source.slice(source.indexOf("Tables: {"), source.indexOf("Views: {"));
  const found: string[] = [];
  for (const match of tables.matchAll(/\n {6}(\w+): \{\n {8}Row: \{([\s\S]*?)\n {8}\}/g)) {
    const columns = [...match[2]!.matchAll(/\n {10}(\w+)\??:/g)].map((c) => c[1]!);
    if (columns.some((column) => USER_COLUMN.test(column))) found.push(match[1]!);
  }
  return found.sort();
}

describe("DEC-099 pool reset map", () => {
  it("finds the census tables", () => {
    expect(tablesWithUserColumn().length).toBeGreaterThan(0);
  });

  it("declares every user-id table as RESET or EXEMPT, never both", () => {
    const reset = new Set(Object.keys(POOL_RESET_TABLES));
    const exempt = new Set(Object.keys(POOL_EXEMPT_TABLES));
    const undeclared = tablesWithUserColumn().filter((t) => !reset.has(t) && !exempt.has(t));
    const both = [...reset].filter((t) => exempt.has(t));
    expect(undeclared).toEqual([]);
    expect(both).toEqual([]);
  });
});
