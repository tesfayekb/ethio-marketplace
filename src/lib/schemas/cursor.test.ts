import { describe, expect, it } from "vitest";
import { z } from "zod";

import { cursor, encodeCursor } from "@/lib/schemas/cursor";

const shape = z.object({ rank: z.number().int(), name: z.string() }).strict();

describe("the public reader cursor", () => {
  it("CUR-1 base64url JSON round trips including UTF-8", () => {
    const value = { rank: 12, name: "é" };
    const encoded = encodeCursor(value);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(cursor(shape).parse(encoded)).toEqual(value);
  });

  it("CUR-2 garbage and oversized encodings refuse without throwing", () => {
    for (const value of ["garbage", "", "=", "x".repeat(513)]) expect(cursor(shape).safeParse(value).success).toBe(false);
  });

  it("CUR-3 a valid encoding of the wrong shape refuses", () => {
    for (const value of [{ rank: "12", name: "x" }, { rank: 12 }, null, [], 12]) expect(cursor(shape).safeParse(encodeCursor(value)).success).toBe(false);
  });
});