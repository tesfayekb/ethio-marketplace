import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  TIER_LABEL,
  TIER_REASONS,
  TIERS,
  mayTier,
  tierErrorKey,
  tierProblem,
} from "./tier-reasons";

/**
 * Turn T1 part B — the dialog offers only what the door accepts. The tier and
 * reason lists are read from the migration that declares
 * `admin_set_listing_tier` (T1 M1), so a change to the door's lists that this
 * file does not follow is a red here, not a refusal in front of an admin.
 */
const M1 = "supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql";

function doorList(sql: string, column: string): string[] {
  const match = new RegExp(`${column} NOT IN \\(([^)]*)\\)`).exec(sql);
  if (!match) throw new Error(`no list for ${column}`);
  return (match[1] ?? "").split(",").map((item) => item.trim().replace(/^'|'$/g, ""));
}

describe("the listing tier (turn T1)", () => {
  it("TR-1 the tiers and the reasons are exactly the door's, in its order", () => {
    const sql = readFileSync(M1, "utf8");
    expect([...TIERS]).toEqual(doorList(sql, "p_tier"));
    expect([...TIER_REASONS]).toEqual(doorList(sql, "p_reason"));
    for (const tier of TIERS) expect(TIER_LABEL[tier]).toBeTruthy();
  });

  it("TR-2 a removed listing and a draft take no tier; the others do", () => {
    expect(mayTier("removed")).toBe(false);
    expect(mayTier("draft")).toBe(false);
    for (const status of [
      "active",
      "reduced",
      "screening",
      "held",
      "rejected",
      "expired",
      "sold",
      "closed",
    ]) {
      expect(mayTier(status)).toBe(true);
    }
  });

  it("TR-3 the tier must change; a reason is required; Other needs a note; 500 characters at most", () => {
    expect(tierProblem("gold", "regular", "promotion", "")).toBe(
      "admin.listings.tier.error.unknown",
    );
    expect(tierProblem("regular", "regular", "promotion", "")).toBe(
      "admin.listings.tier.error.same",
    );
    expect(tierProblem("premium", "regular", "", "")).toBe("admin.listings.move.pickReason");
    expect(tierProblem("premium", "regular", "other", "  ")).toBe(
      "admin.listings.move.noteRequired",
    );
    expect(tierProblem("premium", "regular", "promotion", "x".repeat(501))).toBe(
      "admin.listings.move.noteTooLong",
    );
    expect(tierProblem("premium", "regular", "promotion", "")).toBeNull();
    expect(tierProblem("regular", "premium", "promotion_ended", "")).toBeNull();
  });

  it("TR-4 each refusal of the door has its own words; an unknown one is the common error", () => {
    expect(tierErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
    expect(tierErrorKey("your own listing is changed the seller's way")).toBe(
      "admin.listings.move.error.own",
    );
    expect(tierErrorKey("a removed listing takes no tier")).toBe(
      "admin.listings.tier.error.removed",
    );
    expect(tierErrorKey("nothing changed")).toBe("admin.listings.tier.error.same");
    expect(tierErrorKey("unknown tier")).toBe("admin.listings.tier.error.unknown");
    expect(tierErrorKey("unknown reason")).toBe("admin.listings.move.pickReason");
    expect(tierErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
    expect(tierErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
    expect(tierErrorKey("a note is required")).toBe("admin.listings.move.noteRequired");
    expect(tierErrorKey("the note is too long")).toBe("admin.listings.move.noteTooLong");
    expect(tierErrorKey("step-up required: listings:enforce")).toBe("common.error");
  });

  it("TR-5 the door's messages in M1 are the ones this file knows", () => {
    const sql = readFileSync(M1, "utf8");
    const body = sql.slice(sql.indexOf("AS $function$"), sql.indexOf("$function$;"));
    const raised = [...body.matchAll(/RAISE EXCEPTION '((?:[^']|'')*)'/g)].map((m) =>
      (m[1] ?? "").replace(/''/g, "'"),
    );
    const known = raised.filter(
      (message) => message !== "not signed in" && message !== "account is deactivated",
    );
    for (const message of known) expect(tierErrorKey(message)).not.toBe("common.error");
  });
});
