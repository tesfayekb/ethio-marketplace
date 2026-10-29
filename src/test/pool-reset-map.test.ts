import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";

import { POOL_EXEMPT_TABLES, POOL_RESET_TABLES } from "../../e2e/helpers/pool-reset-map";

/** DEC-099 — every table holding a user id is declared RESET or EXEMPT. */
const USER_COLUMN =
  /^(user_id|profile_id|seller_id|viewer_id|actor_id|target_id|actor|reviewer|\w+_by)$/;

/**
 * N1b-3a (INC-989) — by definition: a column named for a person, or a foreign key
 * to profiles (or users) under any column name, read from the table's Relationships.
 */
export function tablesWithUserColumn(
  source = readFileSync(resolve(process.cwd(), "src/integrations/supabase/types.ts"), "utf8"),
): string[] {
  const tables = source.slice(source.indexOf("Tables: {"), source.indexOf("Views: {"));
  const found: string[] = [];
  for (const match of tables.matchAll(/\n {6}(\w+): \{\n {8}Row: \{([\s\S]*?)\n {8}\}/g)) {
    const columns = [...match[2]!.matchAll(/\n {10}(\w+)\??:/g)].map((c) => c[1]!);
    const rest = tables.slice((match.index ?? 0) + match[0].length);
    const end = rest.search(/\n {6}\}/);
    const relationships = rest.slice(rest.indexOf("Relationships:"), end === -1 ? undefined : end);
    const personKey = /referencedRelation: "(?:profiles|users)"/.test(relationships);
    if (personKey || columns.some((column) => USER_COLUMN.test(column))) found.push(match[1]!);
  }
  return found.sort();
}

describe("DEC-099 pool reset map", () => {
  it("the AI attribution history is present in generated types and exempt", () => {
    expect(tablesWithUserColumn()).toContain("ai_calls");
    expect(POOL_EXEMPT_TABLES.ai_calls).toBe(
      "EXEMPT — attribution history; actor_id goes null with the account",
    );
  });
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

  it("PRR-1 the census finds name_checks, and it is RESET", () => {
    expect(tablesWithUserColumn()).toContain("name_checks");
    expect(Object.keys(POOL_RESET_TABLES)).toContain("name_checks");
  });

  it("PRR-2 a planted profile_id column and a planted foreign key to profiles under another name are found", () => {
    const planted = `Tables: {
      e2e_planted_by_column: {
        Row: {
          profile_id: string
          note: string
        }
        Insert: {}
        Relationships: []
      }
      e2e_planted_by_key: {
        Row: {
          owner: string
        }
        Insert: {}
        Relationships: [
          {
            foreignKeyName: "e2e_planted_by_key_owner_fkey"
            columns: ["owner"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      e2e_planted_quiet: {
        Row: {
          note: string
        }
        Insert: {}
        Relationships: []
      }
    }
    Views: {`;
    expect(tablesWithUserColumn(planted)).toEqual(["e2e_planted_by_column", "e2e_planted_by_key"]);
  });

  it("PRR-3 the reap names every RESET table it deletes from by hand, name_checks by profile_id", () => {
    const users = readFileSync(resolve(process.cwd(), "e2e/helpers/users.ts"), "utf8");
    const start = users.indexOf("async function reapPoolAccount(");
    const body = users.slice(start, users.indexOf("\n}\n", start));
    expect(body).toContain('.from("name_checks").delete().eq("profile_id", id)');
    const handled = Object.entries(POOL_RESET_TABLES).filter(
      ([table, how]) =>
        !/cascade|returned to|removed|ended/.test(how) && !body.includes(`"${table}"`),
    );
    expect(handled).toEqual([]);
  });
});
