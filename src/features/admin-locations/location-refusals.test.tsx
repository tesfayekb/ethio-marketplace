import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";
import { readRefusal, refusalText } from "@/lib/refusal";

const catalogue = new Set(["admin.attributes.error.parentAfterChild"]);
const language = vi.hoisted(() => ({ current: undefined as string | undefined }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    language: language.current,
    t: (key: string) => `T(${key})`,
    has: (key: string) => catalogue.has(key),
  }),
}));

import { LOCATION_REFUSALS, useLocationRefusal } from "./location-refusals";

/** A shell's refusal as the browser client surfaces it: `code[:detail]` in `message`. */
const refused = (message: string) => ({ message, code: "P0D01", details: "", hint: "" });
/** The trigger's plain raise: the sentence is the message, the SQLSTATE is not a door's. */
const raised = (message: string) => ({ message, code: "P0001", details: null, hint: null });
/** A door shell's returned envelope for a code (`door_refused`): the code and its first refusal. */
const shellEnvelope = (reason: string) => ({
  ok: false,
  code: "P0D01",
  message: reason,
  refusals: [{ reason }],
});

/** Every id the console's mapper spoke before the doors moved to codes (F1-4b, ruling 1 item 4). */
const IDS = [
  "locationMissing",
  "parentMissing",
  "parentInactive",
  "levelMismatch",
  "crossCountry",
  "badSlug",
  "missingCoordinates",
  "badCoordinates",
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

/** The eight codes the ancestry trigger refuses by (F1-7b: the seven it raised as sentences, and `badCoordinates`). */
const TRIGGER_IDS = [
  "rootMustBeCountry",
  "badSlug",
  "missingCoordinates",
  "badCoordinates",
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

  it("LRF-2 the ancestry trigger's eight codes read their words by the error's own message, raised or answered by a shell", () => {
    expect(TRIGGER_IDS).toHaveLength(8);
    for (const id of TRIGGER_IDS) {
      for (const error of [raised(id), refused(id), shellEnvelope(id)]) {
        const read = readRefusal(error, LOCATION_REFUSALS);
        expect([id, read.branch, read.key]).toEqual([id, "family", `admin.locations.error.${id}`]);
      }
    }
    const { result } = renderHook(() => useLocationRefusal());
    act(() => result.current.fail(raised("parentInactive")));
    expect(result.current.message).toBe("T(admin.locations.error.parentInactive)");
    act(() => result.current.fail(shellEnvelope("parentInactive")));
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

  it("LRF-6 a coordinate out of range (F1-7b) reads its own line, through the screen's state, never the generic one", () => {
    const own = "admin.locations.error.badCoordinates";
    expect(LOCATION_REFUSALS.words.badCoordinates).toBe(own);
    expect(LOCATION_REFUSALS.words.badCoordinates).not.toBe(LOCATION_REFUSALS.generic);
    const { result } = renderHook(() => useLocationRefusal());
    for (const error of [
      refused("badCoordinates"),
      raised("badCoordinates"),
      shellEnvelope("badCoordinates"),
    ]) {
      act(() => result.current.fail(error));
      expect(result.current.message).toBe(`T(${own})`);
    }
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

describe("the console's rate sentence says when (L22)", () => {
  it("RTW-5 a rate refusal with a future instant and a language draws the when words", () => {
    language.current = "en";
    try {
      const { result } = renderHook(() => useLocationRefusal());
      const at = new Date(Date.now() + 3_600_000).toISOString();
      act(() => result.current.fail({ message: `rateLimited:${at}`, code: "P0D01" }));
      expect(result.current.message).toContain("T(admin.error.rateLimitedWhen)");
    } finally {
      language.current = undefined;
    }
  });
});
