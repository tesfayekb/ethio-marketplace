import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../../../scripts/conformance/kit";
import {
  NoInputSchema,
  AdPageInputSchema,
  SellerPageInputSchema,
  LegalScratchInputSchema,
} from "./server-fns";

describe("server-function input shapes", () => {
  it("SFN-1 accepts today's loader inputs", () => {
    expect(NoInputSchema.parse(undefined)).toBeUndefined();
    expect(AdPageInputSchema.parse({ slug: "x" })).toEqual({ slug: "x" });
    for (const name of ["", "addis"])
      expect(SellerPageInputSchema.parse({ name })).toEqual({ name });
    for (const countries of [[], ["ET", "ER"]])
      expect(LegalScratchInputSchema.parse({ kind: "e2e-a1", countries })).toEqual({
        kind: "e2e-a1",
        countries,
      });
  });

  it("SFN-2 refuses malformed inputs and unknown object keys", () => {
    expect(NoInputSchema.safeParse({}).success).toBe(false);
    for (const input of [{ slug: "" }, { slug: 1 }, { slug: "x", extra: true }])
      expect(AdPageInputSchema.safeParse(input).success).toBe(false);
    for (const input of [{ name: 1 }, { name: "", extra: true }])
      expect(SellerPageInputSchema.safeParse(input).success).toBe(false);
    for (const input of [
      { kind: "terms", countries: [] },
      { kind: `e2e-${"a".repeat(41)}`, countries: [] },
      { kind: "e2e-a1", countries: Array.from({ length: 6 }, () => "ET") },
      { kind: "e2e-a1", countries: [], extra: true },
    ])
      expect(LegalScratchInputSchema.safeParse(input).success).toBe(false);
  });

  it("SFN-3 the scratch-kind pattern has one production definition", () => {
    const pattern = "/^e2e-[a-z0-9-]{1,40}$/";
    const hits = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).flatMap(
      (file) => [...readFileSync(file, "utf8").matchAll(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"))].map(() => file),
    );
    expect(hits).toEqual(["src/features/legal/legal-kinds.ts"]);
  });
});