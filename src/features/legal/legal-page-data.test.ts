import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../../../scripts/conformance/kit";
import { shapedCountries, signedInOnlyKind } from "./legal-page-data";

describe("signedInOnlyKind (D236)", () => {
  it("LK-mirror the TypeScript answer equals the migration's predicate (M24)", () => {
    const text = walkFiles([resolve("supabase/migrations")], { ext: ["sql"] })
      .map((file) => readFileSync(file, "utf8"))
      .filter((migration) => migration.includes("FUNCTION public.legal_kind_signed_in_only"))
      .at(-1)!;
    const predicate = text.split("AS $function$")[1]!.split("$function$")[0]!;
    expect(predicate).toContain("'publishing'");
    expect(predicate).toContain("'^e2e-pub-'");
    expect(predicate.match(/'[^']*'/g)).toEqual(["'publishing'", "'^e2e-pub-'"]);
    expect(signedInOnlyKind("publishing")).toBe(true);
    expect(signedInOnlyKind("e2e-pub-x")).toBe(true);
    expect(signedInOnlyKind("terms")).toBe(false);
    expect(signedInOnlyKind("privacy")).toBe(false);
    expect(signedInOnlyKind("e2e-x-privacy")).toBe(false);
    expect(signedInOnlyKind("e2e-pub")).toBe(false);
  });
});
describe("shapedCountries", () => {
  it("keeps distinct uppercase codes only, at most five", () => {
    expect(shapedCountries("ET,US,zz,et,ET")).toEqual(["ET", "US"]);
    expect(shapedCountries(["ET", "US", "DE", "FR", "GB", "NL"])).toEqual([
      "ET",
      "US",
      "DE",
      "FR",
      "GB",
    ]);
    expect(shapedCountries(undefined)).toEqual([]);
  });
});
