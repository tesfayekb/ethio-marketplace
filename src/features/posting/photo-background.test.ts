import { readFileSync } from "node:fs";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { onBackdrop, PHOTO_BACKDROP } from "./photo-background";
import { backgroundRefusalKey } from "./refusal-text";

/**
 * Bundle 13 turn 12 — D155: one background for every removed photo, laid by the
 * device; the background tool's refusals in words.
 */

afterEach(() => {
  vi.restoreAllMocks();
});

describe("the house background (D155)", () => {
  it("PBG-1 the background is the site's page tone, #F3F5F8 (D132), as the stylesheet names it", () => {
    expect(PHOTO_BACKDROP).toBe("#F3F5F8");
    const css = readFileSync(join(process.cwd(), "src/styles.css"), "utf8");
    const light = css.indexOf("--background: oklch(0.969 0.005 258.3);");
    expect(light).toBeGreaterThan(-1);
    const named = css.lastIndexOf("/* #F3F5F8 cool grey", light);
    expect(named, "the page tone's comment no longer names #F3F5F8").toBeGreaterThan(-1);
    expect(light - named).toBeLessThan(120);
  });

  it("PBG-2 the cut-out is laid on the background: the whole canvas filled first, then the cut-out at its own size", () => {
    const calls: unknown[][] = [];
    const context = {
      fillStyle: "",
      fillRect: (...args: unknown[]) => calls.push(["fillRect", context.fillStyle, ...args]),
      drawImage: (...args: unknown[]) => calls.push(["drawImage", ...args]),
    };
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => context as unknown as CanvasRenderingContext2D,
    );
    const cutout = { width: 400, height: 300 } as ImageBitmap;
    const canvas = onBackdrop(cutout);
    expect([canvas.width, canvas.height]).toEqual([400, 300]);
    expect(calls).toEqual([
      ["fillRect", "#F3F5F8", 0, 0, 400, 300],
      ["drawImage", cutout, 0, 0],
    ]);
  });

  it("PBG-3 the tool's refusals read in its own words; any other reason reads as the upload's", () => {
    expect(backgroundRefusalKey("featureOff")).toBe("post.photos.background.off");
    expect(backgroundRefusalKey("providerUnavailable")).toBe("post.photos.background.failed");
    expect(backgroundRefusalKey("backgroundSpent")).toBe("post.photos.background.spent");
    expect(backgroundRefusalKey("notCover")).toBe("post.photos.background.notCover");
    expect(backgroundRefusalKey("notYourListing")).toBe("post.photo.refusal.notYourListing");
    expect(backgroundRefusalKey("photoGone")).toBe("post.photo.refusal.photoGone");
    expect(backgroundRefusalKey("rateLimited:2026-10-15T00:00:00Z")).toBe(
      "post.photo.refusal.rateLimited",
    );
    expect(backgroundRefusalKey("toString")).toBe("post.photo.refusal.unknown");
  });
});
