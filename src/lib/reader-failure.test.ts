import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../../scripts/conformance/kit";
import {
  gateRefusal,
  readerFailure,
  ReaderError,
  readFailed,
  refusalStatus,
} from "./reader-failure";

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
  // F1-7c (INC-1213) — a reader's refusal reaches the browser at its code's status (the database's
  // one table, `door_refusal_status`), never 500. The code decides the class first (F1-7a); the
  // status must agree with it. Every code the table names, with the status it arrives at:
  it.each([
    ["notSignedIn", 401, "auth"],
    ["accountDeactivated", 403, "auth"],
    ["permissionDenied", 403, "refused"],
    ["permissionDenied:language", 403, "refused"],
    ["stepUpRequired", 428, "refused"],
    ["rateLimited", 429, "refused"],
    ["rateLimited:2026-11-19T20:00:00+00:00", 429, "refused"],
    ["notYourListing", 400, "refused"],
    ["notYours", 400, "refused"],
    ["badValue:group", 400, "refused"],
    ["badValue:page", 400, "refused"],
    ["badValue:search", 400, "refused"],
    ["badValue:mark", 400, "refused"],
    ["badValue:cursor", 400, "refused"],
    ["badSize", 400, "refused"],
    ["notInForce", 400, "refused"],
  ] as const)("RF-1 the code %s arrives at HTTP %i and is %s", (message, status, expected) => {
    const failure = readerFailure({ status, code: "P0D01", message });
    expect(failure.class).toBe(expected);
    expect(failure).toMatchObject({ status, code: "P0D01", message });
    // The same refusal with no status (the browser's `rpc()` drops it) is read by its code alone.
    expect(readerFailure({ code: "P0D01", message }).class).toBe(expected);
  });
  it("RF-2 a gate code is read by its first colon: a detail may hold any character", () => {
    expect(readerFailure({ status: 400, code: "P0D01", message: "badValue:a:b+c" }).class).toBe(
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
  it("RF-4 a refusal that arrives at 500, or at a status its code does not carry, is not the database's answer: server for 500", () => {
    for (const message of [
      "notSignedIn",
      "accountDeactivated",
      "permissionDenied",
      "stepUpRequired",
      "rateLimited:2026-11-19T20:00:00+00:00",
      "notYourListing",
      "notYours",
      "badValue:group",
      "badSize",
      "notInForce",
    ]) {
      expect(readerFailure({ status: 500, code: "P0D01", message }).class, message).toBe("server");
    }
    // A status the code does not carry (and not a server one) falls to the status's own reading.
    expect(readerFailure({ status: 400, code: "P0D01", message: "notSignedIn" }).class).toBe(
      "malformed",
    );
    expect(readerFailure({ status: 403, code: "P0D01", message: "rateLimited" }).class).toBe(
      "auth",
    );
  });
  it("RF-5 refusalStatus answers a code's own row, and 400 for any other code (CF-REFUSAL-2 holds the rows to door_refusal_status)", () => {
    expect(refusalStatus("notSignedIn")).toBe(401);
    expect(refusalStatus("rateLimited")).toBe(429);
    expect(refusalStatus("anyOtherCode")).toBe(400);
    expect(refusalStatus("constructor")).toBe(400);
  });
  it("RF-6 F1-7d (INC-1221) — a reader's refusal is its gate code at the one table's status, with a short detail", () => {
    expect(gateRefusal({ message: "notSignedIn", code: "P0D01" })).toEqual({
      code: "notSignedIn",
      status: 401,
    });
    expect(gateRefusal(readFailed({ message: "rateLimited:60" }, 429))).toEqual({
      code: "rateLimited",
      status: 429,
      detail: "60",
    });
    expect(gateRefusal({ message: " badValue: field " })).toEqual({
      code: "badValue",
      status: 400,
      detail: "field",
    });
    // A detail that is a sentence is not answered; the refusal still is.
    expect(gateRefusal({ message: `badValue:${"x".repeat(65)}` })).toEqual({
      code: "badValue",
      status: 400,
    });
    // A status that disagrees, a code that is not the gate's, a sentence: not a refusal.
    expect(gateRefusal(readFailed({ message: "rateLimited" }, 500))).toBeNull();
    expect(gateRefusal({ message: "permissionDenied", status: 401 })).toBeNull();
    expect(gateRefusal({ message: "unknownCategory" })).toBeNull();
    expect(gateRefusal({ message: "JWT expired", status: 401 })).toBeNull();
    expect(gateRefusal(new Error("the reader said notSignedIn"))).toBeNull();
  });
  it("RF-7 DEC-429 — a MARKED refusal is a refusal by its mark: any code the database raises, the two session codes apart", () => {
    // `listingNotFound` is on no client list: the mark classes it.
    for (const message of ["listingNotFound", "badOption:x", "levelNotAvailable", "boom"]) {
      expect(readerFailure({ status: 400, code: "P0D01", message }).class, message).toBe("refused");
      expect(readerFailure({ code: "P0D01", message }).class, message).toBe("refused");
    }
    expect(readerFailure({ code: "P0D01", message: "notSignedIn" }).class).toBe("auth");
    expect(readerFailure({ status: 403, code: "P0D01", message: "accountDeactivated" }).class).toBe(
      "auth",
    );
    // A marked failure at 500 is still the server's; one that is not code-shaped is not marked.
    expect(readerFailure({ status: 500, code: "P0D01", message: "listingNotFound" }).class).toBe(
      "server",
    );
    for (const message of ["Not A Code", "9lives", "with space:detail", ""]) {
      expect(readerFailure({ code: "P0D01", message }).class, message).not.toBe("refused");
    }
    // The same text with no mark is no refusal (a name the client holds apart): a sentence is malformed.
    expect(readerFailure({ status: 400, message: "listingNotFound" }).class).toBe("malformed");
    expect(readerFailure({ code: "XX000", message: "listingNotFound" }).class).toBe("malformed");
  });
  it("RF-8 DEC-429 — a marked refusal is a gate refusal at its code's status, as a named one is", () => {
    expect(gateRefusal({ code: "P0D01", message: "listingNotFound" })).toEqual({
      code: "listingNotFound",
      status: 400,
    });
    expect(gateRefusal({ code: "P0D01", status: 400, message: "badOption:price" })).toEqual({
      code: "badOption",
      status: 400,
      detail: "price",
    });
    expect(gateRefusal({ code: "P0D01", status: 403, message: "accountDeactivated" })).toEqual({
      code: "accountDeactivated",
      status: 403,
    });
    // A status its code does not carry, or no mark, or a head that is no code: not a refusal.
    expect(gateRefusal({ code: "P0D01", status: 500, message: "listingNotFound" })).toBeNull();
    expect(gateRefusal({ code: "P0D01", status: 401, message: "listingNotFound" })).toBeNull();
    expect(gateRefusal({ message: "listingNotFound" })).toBeNull();
    expect(gateRefusal({ code: "P0D01", message: "a sentence here" })).toBeNull();
  });
  it("RF-9 DEC-429 — the named sets serve an answer with no code; acceptancePending and legalAcceptancePending are no names", () => {
    expect(readerFailure({ message: "rateLimited" }).class).toBe("refused");
    expect(readerFailure({ message: "notYours" }).class).toBe("refused");
    expect(readerFailure({ message: "acceptancePending" }).class).toBe("malformed");
    expect(readerFailure({ message: "legalAcceptancePending" }).class).toBe("malformed");
  });
  it("RF-10 DEC-429 — readFailed: a ReaderError passes through; otherwise readerFailure's reading, the given status the error's own", () => {
    const typed = new ReaderError({ class: "malformed", message: "bad shape" });
    expect(readFailed(typed)).toBe(typed);
    expect(readFailed(typed, 500)).toBe(typed);
    // A marked family code with no status: refused, its code kept, no status invented.
    const marked = readFailed({ code: "P0D01", message: "listingNotFound" });
    expect(marked).toBeInstanceOf(ReaderError);
    expect(marked.failure).toEqual({
      class: "refused",
      code: "P0D01",
      message: "listingNotFound",
    });
    // The given status is the error's own: at its code's status it is a refusal, at 500 the server's.
    expect(readFailed({ code: "P0D01", message: "permissionDenied" }, 403).failure).toMatchObject({
      class: "refused",
      status: 403,
    });
    expect(readFailed({ code: "P0D01", message: "permissionDenied" }, 500).failure).toMatchObject({
      class: "server",
      status: 500,
    });
    // An error that is no refusal keeps the reading it always had: a network failure, a server one.
    expect(readFailed(new TypeError("Failed to fetch")).failure.class).toBe("network");
    expect(readFailed({ message: "Unavailable" }, 503).failure).toEqual({
      class: "server",
      status: 503,
      message: "Unavailable",
    });
    expect(readFailed(new Error("boom")).failure.class).toBe("malformed");
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
