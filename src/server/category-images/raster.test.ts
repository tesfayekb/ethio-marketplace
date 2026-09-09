import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { fakeGeneratedPng } from "./fixture";
import { processGeneratedPng } from "./pipeline";
import { decodeImage, sniffImageMime } from "./raster";

/**
 * FIX-SCAN-1 ISSUE 5 — THE PNG CLAIM, TESTED.
 *
 * The scanner reported "admin category image generation always fails (PNG
 * processing crash)". The census found the opposite: `raster.ts` imports
 * `pngjs` and `decodeImage` dispatches on the SNIFFED magic bytes, so PNG is a
 * first-class decode path. These tests are the standing proof, so the claim
 * cannot go stale silently again.
 *
 * `scripts/fixtures/category-image-provider.png` is a byte stream emitted by a
 * FOREIGN PNG encoder (Pillow), not by this codebase's own `encodePng` — the
 * RGB-without-alpha colour type the provider returns, which is precisely the
 * case a naive RGBA-only reader crashes on. Its bytes are tool output, never
 * hand-authored (I1).
 */
describe("category image raster", () => {
  it("sniffs and decodes the pipeline's own PNG", () => {
    const bytes = fakeGeneratedPng(256);
    expect(sniffImageMime(bytes)).toBe("image/png");
    const decoded = decodeImage(bytes);
    expect(decoded.width).toBe(256);
    expect(decoded.height).toBe(256);
    expect(decoded.data.length).toBe(256 * 256 * 4);
  });

  it("decodes a PNG produced by a foreign encoder (no alpha channel)", () => {
    const bytes = new Uint8Array(
      readFileSync(join(process.cwd(), "scripts/fixtures/category-image-provider.png")),
    );
    expect(sniffImageMime(bytes)).toBe("image/png");
    const decoded = decodeImage(bytes);
    expect(decoded.width).toBeGreaterThan(0);
    expect(decoded.height).toBeGreaterThan(0);
    expect(decoded.data.length).toBe(decoded.width * decoded.height * 4);
    // Opaque: the decoder must synthesise alpha rather than read past the row.
    expect(decoded.data[3]).toBe(255);
  });

  it("runs the whole generation pipeline over PNG bytes", () => {
    const output = processGeneratedPng(fakeGeneratedPng(512), 1);
    expect(sniffImageMime(output.card)).toBe("image/png");
    expect(sniffImageMime(output.thumb)).toBe("image/png");
    expect(sniffImageMime(output.og)).toBe("image/png");
  });
});
