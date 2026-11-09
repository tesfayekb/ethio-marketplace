import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { parseLevelRows } from "@/features/levels/levels-store";

import {
  levelLabel,
  TIER_REASONS,
  TIER_DAYS_MAX,
  mayTier,
  tierDays,
  tierErrorKey,
  tierProblem,
} from "./tier-reasons";

/** P-2 (c) c2a — the enabled level rows as the store holds them (fixture keys, no level by name). */
const LEVELS =
  parseLevelRows([
    { key: "lvl-base", sort: 0, name_en: "Base", name_am: "መሠረት", is_baseline: true },
    { key: "lvl-a", sort: 10, name_en: "Level A", name_am: null, is_baseline: false },
    { key: "lvl-b", sort: 20, name_en: "Level B", name_am: null, is_baseline: false },
  ]) ?? [];

/**
 * Turn T1 part B — the dialog offers only what the door accepts. The tier and
 * reason lists are read from the migration that declares
 * `admin_set_listing_tier` (T1 M1), so a change to the door's lists that this
 * file does not follow is a red here, not a refusal in front of an admin.
 */
const M1 = "supabase/migrations/20261102045918_cf2b45c5-71eb-40b1-80e1-3012befdfe99.sql";
/** P-2 M-1c part 9 — the door's last declaration, with `p_days`. */
const LAST = "supabase/migrations/20261105080112_4bb8208e-a951-4014-9c42-93d005a2f289.sql";

function doorList(sql: string, column: string): string[] {
  const match = new RegExp(`${column} NOT IN \\(([^)]*)\\)`).exec(sql);
  if (!match) throw new Error(`no list for ${column}`);
  return (match[1] ?? "").split(",").map((item) => item.trim().replace(/^'|'$/g, ""));
}

describe("the listing tier (turn T1)", () => {
  it("TIR-1 the reasons are exactly the door's, in its order; the levels are the door's rows (any enabled level, the baseline by its flag)", () => {
    const sql = readFileSync(M1, "utf8");
    expect([...TIER_REASONS]).toEqual(doorList(sql, "p_reason"));
    const last = readFileSync(LAST, "utf8");
    expect(last).toContain("WHERE key = p_tier AND kind = 'level' AND enabled");
    expect(last).toContain("v_level.is_baseline");
    expect(last).not.toMatch(/p_tier NOT IN \(/);
    expect(LEVELS.map((row) => row.key)).toEqual(["lvl-base", "lvl-a", "lvl-b"]);
  });

  it("TIR-8 a console line names the level by its row, in the reader's language; a key no enabled row holds is null (INC-1077)", () => {
    expect(levelLabel(LEVELS, "lvl-base", "am")).toBe("መሠረት");
    expect(levelLabel(LEVELS, "lvl-a", "am")).toBe("Level A");
    expect(levelLabel(LEVELS, "lvl-fourth", "en")).toBeNull();
    expect(levelLabel(LEVELS, null, "en")).toBeNull();
  });

  it("TIR-2 a removed listing and a draft take no tier; the others do", () => {
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

  it("TIR-3 the level must be a row and must change; a reason is required; Other needs a note; 500 characters at most", () => {
    expect(tierProblem("gold", "lvl-base", "promotion", "", "", LEVELS)).toBe(
      "admin.listings.level.error.unknown",
    );
    expect(tierProblem("lvl-base", "lvl-base", "promotion", "", "", LEVELS)).toBe(
      "admin.listings.level.error.same",
    );
    expect(tierProblem("lvl-a", "lvl-base", "", "", "", LEVELS)).toBe(
      "admin.listings.move.pickReason",
    );
    expect(tierProblem("lvl-a", "lvl-base", "other", "  ", "", LEVELS)).toBe(
      "admin.listings.move.noteRequired",
    );
    expect(tierProblem("lvl-a", "lvl-base", "promotion", "x".repeat(501), "", LEVELS)).toBe(
      "admin.listings.move.noteTooLong",
    );
    expect(tierProblem("lvl-a", "lvl-base", "promotion", "", "", LEVELS)).toBeNull();
    expect(tierProblem("lvl-base", "lvl-a", "promotion_ended", "", "", LEVELS)).toBeNull();
    expect(tierProblem("lvl-a", "lvl-base", "promotion", "", "", [])).toBe(
      "admin.listings.level.error.unknown",
    );
  });

  it("TIR-4 each refusal of the door has its own words; an unknown one is the common error", () => {
    expect(tierErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
    expect(tierErrorKey("your own listing is changed the seller's way")).toBe(
      "admin.listings.move.error.own",
    );
    expect(tierErrorKey("a removed listing takes no tier")).toBe(
      "admin.listings.level.error.removed",
    );
    expect(tierErrorKey("nothing changed")).toBe("admin.listings.level.error.same");
    expect(tierErrorKey("unknown tier")).toBe("admin.listings.level.error.unknown");
    expect(tierErrorKey("unknown reason")).toBe("admin.listings.move.pickReason");
    expect(tierErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
    expect(tierErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
    expect(tierErrorKey("a note is required")).toBe("admin.listings.move.noteRequired");
    expect(tierErrorKey("the note is too long")).toBe("admin.listings.move.noteTooLong");
    expect(tierErrorKey("step-up required: listings:enforce")).toBe("common.error");
  });

  it("TIR-6 a move to the baseline the free-slot law refuses (noFreeSlot) reads as the seller's slots being in use", () => {
    expect(tierErrorKey("noFreeSlot")).toBe("admin.listings.error.noFreeSlot");
  });

  it("TIR-5 the door's messages in M1 are the ones this file knows", () => {
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

  it("TIR-7 Days: blank is open-ended, 1…3650 whole days, none on the baseline; the door's last declaration raises nothing this file does not know (P-2 (b))", () => {
    expect(tierDays("")).toBeNull();
    expect(tierDays("  ")).toBeNull();
    expect(tierDays("30")).toBe(30);
    expect(tierDays(String(TIER_DAYS_MAX))).toBe(TIER_DAYS_MAX);
    for (const raw of ["0", "-3", "3651", "1.5", "ten"]) expect(tierDays(raw), raw).toBeUndefined();
    expect(tierProblem("lvl-a", "lvl-base", "promotion", "", "30", LEVELS)).toBeNull();
    expect(tierProblem("lvl-a", "lvl-base", "promotion", "", "0", LEVELS)).toBe(
      "admin.listings.level.error.days",
    );
    // INC-1077 — the baseline is the row the door flags, whatever its key.
    expect(tierProblem("lvl-base", "lvl-a", "promotion_ended", "", "30", LEVELS)).toBe(
      "admin.listings.level.error.baselineDays",
    );
    expect(tierProblem("lvl-a", null, "promotion", "", "", LEVELS)).toBeNull();
    const sql = readFileSync(LAST, "utf8");
    expect(sql).toContain(`p_days > ${TIER_DAYS_MAX}`);
    const body = sql.slice(sql.indexOf("AS $function$"), sql.indexOf("$function$;"));
    const raised = [...body.matchAll(/RAISE EXCEPTION '((?:[^']|'')*)'/g)].map((m) =>
      (m[1] ?? "").replace(/''/g, "'"),
    );
    expect(raised).toContain("badDays");
    const known = raised.filter(
      (message) => message !== "not signed in" && message !== "account is deactivated",
    );
    for (const message of known) expect(tierErrorKey(message), message).not.toBe("common.error");
  });
});
