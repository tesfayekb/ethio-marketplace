import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
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
  it("ReaderError retains the exact typed failure", () => {
    const failure = { class: "malformed" as const, message: "bad shape" };
    expect(readerFailure(new ReaderError(failure))).toBe(failure);
  });
  it("census: no bare door error returns null in features", () => {
    const found: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (
          /\.tsx?$/.test(entry.name) &&
          !/\.test\.tsx?$/.test(entry.name) &&
          /if\s*\(error\)\s*(?:\{\s*)?return null/.test(readFileSync(path, "utf8"))
        )
          found.push(relative(process.cwd(), path));
      }
    };
    walk(resolve("src/features"));
    expect(found).toEqual([]);
  });
});
