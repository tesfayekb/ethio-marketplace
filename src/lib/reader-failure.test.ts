import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../../scripts/conformance/kit";
import { readerFailure, ReaderError } from "./reader-failure";

describe("INC-847 reader failure classes", () => {
  it("auth preserves status and code", () =>
    expect(readerFailure({ status: 401, code: "PGRST301", message: "JWT expired" })).toEqual({
      class: "auth",
      status: 401,
      code: "PGRST301",
      message: "JWT expired",
    }));
  it("network names a failed fetch", () =>
    expect(readerFailure(new TypeError("Failed to fetch")).class).toBe("network"));
  it("refused names a raised door refusal", () =>
    expect(readerFailure({ code: "P0001", message: "rateLimited" }).class).toBe("refused"));
  it("server names a 503", () =>
    expect(readerFailure({ status: 503, message: "Unavailable" }).class).toBe("server"));
  it("malformed names a parse failure", () =>
    expect(readerFailure(new SyntaxError("invalid answer")).class).toBe("malformed"));
  // F1-7a (ruling 2, decision 11) — a reader's gate refusal reaches the browser through PostgREST as
  // SQLSTATE P0D01 at HTTP 500 (INC-1213): its code is read before the status, so none of these is a `server` failure.
  it.each([
    ["notSignedIn", "auth"],
    ["accountDeactivated", "auth"],
    ["notYourListing", "refused"],
    ["notYours", "refused"],
    ["badValue:group", "refused"],
    ["badValue:page", "refused"],
    ["badValue:search", "refused"],
    ["badValue:mark", "refused"],
    ["badValue:cursor", "refused"],
    ["badSize", "refused"],
  ] as const)("RF-1 the gate's code %s at HTTP 500 is %s, not server", (message, expected) => {
    const failure = readerFailure({ status: 500, code: "P0D01", message });
    expect(failure.class).toBe(expected);
    expect(failure).toMatchObject({ status: 500, code: "P0D01", message });
  });
  it("RF-2 a gate code is read by its first colon: a detail may hold any character", () => {
    expect(readerFailure({ status: 500, code: "P0D01", message: "badValue:a:b+c" }).class).toBe(
      "refused",
    );
  });
  it("RF-3 a code that is not the gate's, or only starts like one, keeps its old class", () => {
    expect(readerFailure({ status: 500, code: "P0D01", message: "notSignedInAgain" }).class).toBe(
      "server",
    );
    expect(readerFailure({ status: 500, code: "P0D01", message: "something else" }).class).toBe(
      "server",
    );
    expect(readerFailure({ code: "P0001", message: "something else" }).class).toBe("refused");
    expect(readerFailure({ status: 401, message: "unknown" }).class).toBe("auth");
    expect(
      readerFailure({ status: 429, message: "rateLimited:2026-11-19T20:00:00+00:00" }).class,
    ).toBe("refused");
    expect(readerFailure({ status: 503, message: "Unavailable" }).class).toBe("server");
  });
  it("ReaderError retains the exact typed failure", () => {
    const failure = { class: "malformed" as const, message: "bad shape" };
    expect(readerFailure(new ReaderError(failure))).toBe(failure);
  });
  it("census: no bare door error returns null in features", () => {
    // DEC-244: the walk is the conformance kit's; the census assertion is unchanged.
    const found = walkFiles([resolve("src/features")], { ext: ["ts", "tsx"], skipTests: true })
      .filter((path) => /if\s*\(error\)\s*(?:\{\s*)?return null/.test(readFileSync(path, "utf8")))
      .map((path) => relative(process.cwd(), path));
    expect(found).toEqual([]);
  });
});
