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
    for (const status of ["screening", "held", "rejected", "expired", "sold", "closed"]) {
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

  it("MR-4 the door's refusals read as codes", () => {
    expect(moveErrorKey("listingNotFound")).toBe("admin.listings.move.error.notFound");
    expect(moveErrorKey("ownListing")).toBe("admin.listings.move.error.own");
    expect(moveErrorKey("illegalTransition:removed-removed")).toBe(
      "admin.listings.move.error.illegal",
    );
    expect(moveErrorKey("severeRestore")).toBe("admin.listings.move.error.severe");
    expect(moveErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
    expect(moveErrorKey("permissionDenied")).toBe("admin.listings.move.error.denied");
    expect(moveErrorKey("permissionDenied:scope")).toBe("admin.listings.move.error.denied");
    expect(moveErrorKey("noteRequired")).toBe("admin.listings.move.noteRequired");
    expect(moveErrorKey("noteTooLong")).toBe("admin.listings.move.noteTooLong");
    // The gate codes with no words of their own, a bad value, a step-up and a sentence: the generic.
    expect(moveErrorKey("notSignedIn")).toBe("common.error");
    expect(moveErrorKey("accountDeactivated")).toBe("common.error");
    expect(moveErrorKey("badValue:to")).toBe("common.error");
    expect(moveErrorKey("step-up required: listings:enforce")).toBe("common.error");
    expect(moveErrorKey("something else")).toBe("common.error");
    expect(moveErrorKey({ message: "severeRestore", code: "P0D01" })).toBe(
      "admin.listings.move.error.severe",
    );
  });

  it("MR-5 a restore the free-slot law refuses (noFreeSlot) reads as the seller's slots being in use", () => {
    expect(moveErrorKey("noFreeSlot")).toBe("admin.listings.error.noFreeSlot");
  });
});
