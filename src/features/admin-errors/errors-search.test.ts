import { expect, it } from "vitest";

import { knownKind } from "./error-labels";
import { errorsSearch } from "./errors-search";

it("ERP-9 the address keeps an offered window (else 7) and a kind-shaped word; knownKind narrows it", () => {
  expect(errorsSearch({ days: "30" })).toEqual({ days: 30 });
  expect(errorsSearch({ days: 90, kind: "crash" })).toEqual({ days: 90, kind: "crash" });
  expect(errorsSearch({ days: "14" })).toEqual({ days: 7 });
  expect(errorsSearch({})).toEqual({ days: 7 });
  expect(errorsSearch({ days: "abc" })).toEqual({ days: 7 });
  expect(errorsSearch({ kind: "bogus" })).toEqual({ days: 7, kind: "bogus" });
  expect(errorsSearch({ kind: "Crash" })).toEqual({ days: 7 });
  expect(errorsSearch({ kind: "a/b" })).toEqual({ days: 7 });
  expect(errorsSearch({ kind: 3 })).toEqual({ days: 7 });
  expect(knownKind("crash")).toBe("crash");
  expect(knownKind("bogus")).toBeNull();
  expect(knownKind(null)).toBeNull();
  expect(knownKind(undefined)).toBeNull();
});
