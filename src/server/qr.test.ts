import { describe, expect, it } from "vitest";

import { isPublicId, qrSvg } from "./qr";

describe("QR encoder (D201 §2)", () => {
  it("QR-1 public ids use ten characters of the approved alphabet", () => {
    expect(isPublicId("abcdefghjk")).toBe(true);
    expect(isPublicId("23456789ab")).toBe(true);
    expect(isPublicId("abcdefghj")).toBe(false);
    expect(isPublicId("abcdefghjkm")).toBe(false);
    expect(isPublicId("ABCDEFGHJK")).toBe(false);
    for (const excluded of ["0", "1", "i", "l", "o"]) {
      expect(isPublicId(`abcdefghj${excluded}`)).toBe(false);
    }
  });

  it("QR-2 the short address produces an SVG without scripts", () => {
    const svg = qrSvg("https://ethio.com/l/abcdefghjk");
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("viewBox");
    expect(svg).not.toContain("<script");
  });

  it("QR-3 the same input gives byte-equal output", () => {
    const text = "https://ethio.com/l/abcdefghjk";
    expect(qrSvg(text)).toBe(qrSvg(text));
  });
});
