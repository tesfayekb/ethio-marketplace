import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { MOVE_REASONS, moveErrorKey, moveProblem, movesFor, NOTE_MAX } from "./move-reasons";

/**
 * Bundle 11, turn L2b — the dialog offers only what the door accepts. The
 * reason lists are read from the migration that declares `admin_move_listing`
 * (turn L1), so a change to the door's lists that this file does not follow is
 * a red here, not a refusal in front of an admin.
 */
const L1 = "supabase/migrations/20261011085637_3c0e90be-87cd-4103-9264-d4fcdc2beb99.sql";

function doorList(sql: string, kind: string): string[] {
  const match = new RegExp(`v_kind = '${kind}' AND p_reason IN \\(([^)]*)\\)`).exec(sql);
  if (!match) throw new Error(`no reason list for ${kind}`);
  return (match[1] ?? "").split(",").map((item) => item.trim().replace(/^'|'$/g, ""));
}

describe("the listing moves (turn L2b)", () => {
  it("MR-1 each move offers exactly the door's reasons, in its order", () => {
    const sql = readFileSync(L1, "utf8");
    expect([...MOVE_REASONS.remove]).toEqual(doorList(sql, "admin_remove"));
    expect([...MOVE_REASONS.restore]).toEqual(doorList(sql, "admin_restore"));
    expect([...MOVE_REASONS.send_back]).toEqual(doorList(sql, "admin_send_back"));
  });

  it("MR-2 a listing's state decides its moves", () => {
    expect(movesFor("active")).toEqual(["send_back", "remove"]);
    expect(movesFor("reduced")).toEqual(["send_back", "remove"]);
    for (const status of ["screening", "held", "rejected", "expired", "sold"]) {
      expect(movesFor(status)).toEqual(["remove"]);
    }
    expect(movesFor("removed")).toEqual(["restore"]);
    expect(movesFor("draft")).toEqual([]);
  });

  it("MR-3 a reason is required; Other needs a note; a note holds at most 500 characters", () => {
    expect(moveProblem("", "")).toBe("admin.listings.move.pickReason");
    expect(moveProblem("other", "  ")).toBe("admin.listings.move.noteRequired");
    expect(moveProblem("other", "Seen twice on the site")).toBeNull();
    expect(moveProblem("misleading", "")).toBeNull();
    expect(moveProblem("misleading", "x".repeat(NOTE_MAX))).toBeNull();
    expect(moveProblem("misleading", "x".repeat(NOTE_MAX + 1))).toBe(
      "admin.listings.move.noteTooLong",
    );
  });

  it("MR-4 the door's refusals read as sentences", () => {
    expect(moveErrorKey("listing not found")).toBe("admin.listings.move.error.notFound");
    expect(moveErrorKey("your own listing is changed the seller's way")).toBe(
      "admin.listings.move.error.own",
    );
    expect(moveErrorKey("illegal move: removed -> removed")).toBe(
      "admin.listings.move.error.illegal",
    );
    expect(
      moveErrorKey("a listing removed for a severe reason is restored by a super admin only"),
    ).toBe("admin.listings.move.error.severe");
    expect(moveErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
    expect(moveErrorKey("permission denied")).toBe("admin.listings.move.error.denied");
    expect(moveErrorKey("something else")).toBe("common.error");
  });
});
