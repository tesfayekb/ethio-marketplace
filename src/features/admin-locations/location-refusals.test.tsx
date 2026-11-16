import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";
import { readRefusal, refusalText } from "@/lib/refusal";

const catalogue = new Set(["admin.attributes.error.parentAfterChild"]);
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => `T(${key})`,
    has: (key: string) => catalogue.has(key),
  }),
}));

import { LOCATION_REFUSALS, useLocationRefusal } from "./location-refusals";

/** A shell's refusal as the browser client surfaces it: `code[:detail]` in `message`. */
const refused = (message: string) => ({ message, code: "P0D01", details: "", hint: "" });
/** The trigger's plain raise: the sentence is the message, the SQLSTATE is not a door's. */
const raised = (message: string) => ({ message, code: "P0001", details: null, hint: null });

/** Every id the console's mapper spoke before the doors moved to codes (F1-4b, ruling 1 item 4). */
const IDS = [
  "locationMissing",
  "parentMissing",
  "parentInactive",
  "levelMismatch",
  "crossCountry",
  "badSlug",
  "missingCoordinates",
  "rootMustBeCountry",
  "badLevel",
  "isoOnRegionsOnly",
  "nameRequired",
  "unknownCountry",
  "useMoveDoor",
  "cannotMoveCountry",
  "orderCountriesInProfile",
  "notAChild",
  "slugMismatch",
  "retireInstead",
] as const;

/** The seven plain sentences the ancestry trigger raises. */
const TRIGGER_IDS = [
  "rootMustBeCountry",
  "badSlug",
  "missingCoordinates",
  "parentMissing",
  "levelMismatch",
  "crossCountry",
  "parentInactive",
] as const;

describe("the places console's refusals (F1-4b, DEC-333)", () => {
  it("LRF-1 every id the console spoke keeps its own line; the words hold those and the two shared codes", () => {
    expect(Object.keys(LOCATION_REFUSALS.words).sort()).toEqual(
      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
    );
    for (const id of IDS) {
      const read = readRefusal(refused(id), LOCATION_REFUSALS);
      expect([id, read.branch, read.key]).toEqual([id, "family", `admin.locations.error.${id}`]);
    }
    for (const message of ["permissionDenied", "permissionDenied:scope"]) {
      const read = readRefusal(refused(message), LOCATION_REFUSALS);
      expect([message, read.branch, read.key]).toEqual([
        message,
        "family",
        "admin.locations.error.denied",
      ]);
    }
    expect(readRefusal(refused("rateLimited"), LOCATION_REFUSALS).key).toBe(
      "admin.error.rateLimited",
    );
  });

  it("LRF-2 the ancestry trigger's plain sentences read their words by the error's own message", () => {
    for (const id of TRIGGER_IDS) {
      const read = readRefusal(raised(id), LOCATION_REFUSALS);
      expect([id, read.branch, read.key]).toEqual([id, "family", `admin.locations.error.${id}`]);
    }
    const { result } = renderHook(() => useLocationRefusal());
    act(() => result.current.fail(raised("parentInactive")));
    expect(result.current.message).toBe("T(admin.locations.error.parentInactive)");
  });

  it("LRF-3 a refused delete names what still holds the place, one of four details", () => {
    const { result } = renderHook(() => useLocationRefusal());
    for (const detail of ["hasChildren", "hasListings", "hasCoverage", "hasProfileDefaults"]) {
      act(() => result.current.fail(refused(`retireInstead:${detail}`)));
      expect([detail, result.current.message]).toEqual([
        detail,
        `T(admin.locations.error.retireInstead) — T(admin.locations.error.detail.${detail})`,
      ]);
    }
    act(() => result.current.fail(refused("retireInstead:somethingNew")));
    expect(result.current.message).toBe("T(admin.locations.error.retireInstead)");
    act(() => result.current.fail(refused("retireInstead")));
    expect(result.current.message).toBe("T(admin.locations.error.retireInstead)");
  });

  it("LRF-4 a code without words, a sentence and a failed fetch draw the console's generic line, never the raw text", () => {
    const generic = "admin.locations.error.unknown";
    for (const message of [
      "notSignedIn",
      "accountDeactivated",
      "unknownBatch",
      "undoBlocked:hasRows",
      "something new",
      "TypeError: Failed to fetch",
    ]) {
      expect([message, readRefusal(refused(message), LOCATION_REFUSALS).key]).toEqual([
        message,
        generic,
      ]);
    }
    expect(readRefusal(undefined, LOCATION_REFUSALS).key).toBe(generic);
    const { result } = renderHook(() => useLocationRefusal());
    act(() => result.current.fail({ message: "something new", code: "P0001" }));
    expect(result.current.message).toBe(`T(${generic})`);
  });

  it("LRF-5 the gate's step-up sentence reads its own line; a cancelled step-up says nothing; no factor says so", () => {
    for (const message of ["step-up required", "step-up required: verification expired"]) {
      const read = readRefusal(raised(message), LOCATION_REFUSALS);
      expect([message, read.branch, read.key]).toEqual([
        message,
        "sentence",
        "admin.locations.error.stepUp",
      ]);
    }
    expect(
      refusalText(readRefusal(refused("permissionDenied:scope"), LOCATION_REFUSALS), String),
    ).toBe("admin.locations.error.denied");
    const { result } = renderHook(() => useLocationRefusal());
    act(() => result.current.fail(refused("badLevel")));
    expect(result.current.message).toBe("T(admin.locations.error.badLevel)");
    act(() => result.current.fail(new StepUpCancelled()));
    expect(result.current.message).toBeNull();
    act(() => result.current.fail(new StepUpUnavailable()));
    expect(result.current.message).toBe("T(mfa.stepUpUnavailableHint)");
    act(() => result.current.render("admin.locations.error.nameRequired"));
    expect(result.current.message).toBe("T(admin.locations.error.nameRequired)");
    act(() => result.current.clear());
    expect(result.current.message).toBeNull();
  });
});
