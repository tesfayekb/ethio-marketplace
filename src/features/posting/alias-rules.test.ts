import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { aliasRuleLocal, foldAlias, FUNCTION_WORDS, ROLE_WORDS } from "./alias-rules";

/**
 * Bundle 3 step 18 — the judge rows. Rules a–c are decided here; for d and e the
 * mirror must NOT refuse (it answers null and the door decides), so those rows
 * assert null — a mirror that guessed d or e would refuse names the door allows.
 */
const REFUSED: [string, "a" | "b" | "c" | "d" | "e"][] = [
  ["ethio_coffee", "b"],
  ["abebe_ethio", "b"],
  ["ethi0_coffee", "b"],
  ["admin_abebe", "c"],
  ["abebeadmin", "c"],
  ["abebe_support", "c"],
  ["telebirr_official", "c"],
  ["login_help", "c"],
  ["account", "d"],
  ["settings", "d"],
  ["telebirr", "d"],
  ["gmail_com", "d"],
  ["kenya", "d"],
  ["telebirr_store", "e"],
  ["store_telebirr", "e"],
  ["telebirrstore", "e"],
  ["te1ebirr_store", "e"],
  ["telebirr_agent", "e"],
  ["cbe_agent", "e"],
  ["cbe_kenya", "e"],
  ["telebirr_et", "e"],
  ["abc_1234567", "a"],
  ["abel", "a"],
  ["_abebe", "a"],
  ["abebe__shop", "a"],
  ["12345abc", "a"],
];

const M2 = "supabase/migrations/20261004011235_18556a32-8f3e-4da5-a645-e73223e74e13.sql";

/** The three space-separated lists M2 seeds into site_words, by kind. */
function seededWords(kind: "site" | "role" | "function"): string[] {
  const sql = readFileSync(M2, "utf8");
  const match = new RegExp(
    `string_to_array\\('([a-z0-9 ]+)', ' '\\)\\) w, '${kind}'|SELECT w, '${kind}' FROM unnest\\(string_to_array\\('([a-z0-9 ]+)'`,
  ).exec(sql);
  const list = match?.[1] ?? match?.[2] ?? "";
  return list.split(" ").filter((word) => word !== "");
}

const PASS = [
  "badminton_shop",
  "selam_telebirr",
  "abebe_kenya",
  "abebe_et",
  "made_by_us",
  "tiger_store",
  "awash_market",
  "abebe_phones",
  "abebephones",
  "selam2shop",
  "mekdes_boutique",
  "hana_store",
];

describe("seller-name mirror (bundle 3 step 18)", () => {
  it.each(REFUSED)("%s → rule %s", (alias, rule) => {
    const expected = rule === "d" || rule === "e" ? null : rule;
    expect(aliasRuleLocal(alias)).toBe(expected);
  });

  it.each(PASS)("%s passes the mirror", (alias) => {
    expect(aliasRuleLocal(alias)).toBeNull();
  });

  it("folds as step 15 says", () => {
    expect(foldAlias("Te1e_birr")).toBe("telebirr");
    expect(foldAlias("c0rner")).toBe("comer");
    expect(foldAlias("4b3b5")).toBe("abebs");
  });

  it("role and function words are the ones M2 seeds", () => {
    expect([...ROLE_WORDS]).toEqual(seededWords("role"));
    expect([...FUNCTION_WORDS]).toEqual(seededWords("function"));
  });
});

describe("scripts/site-words.txt (bundle 3 step 23)", () => {
  it("equals the words M2 seeds into site_words", () => {
    const file = readFileSync("scripts/site-words.txt", "utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");
    const seeded = [...seededWords("site"), ...seededWords("role"), ...seededWords("function")];
    expect(seeded.length).toBe(331);
    expect([...file].sort()).toEqual([...new Set(seeded)].sort());
  });
});
