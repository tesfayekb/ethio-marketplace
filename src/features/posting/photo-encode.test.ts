import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * INC-599 / D157 — the device's encoder. Every variant is drawn with the
 * canvas's high-quality filter (the default aliases a large downscale) and
 * encoded at the quality D157's judge chose: WebP cover 0.82, card 0.84,
 * thumb 0.82, and the middle size of D162 (960 px) at the cover's 0.82; JPEG
 * 0.82 where the canvas makes no WebP. The canvas is a stub:
 * jsdom has none, and what is checked is what the encoder ASKS of it.
 */

interface Draw {
  smoothingEnabled: boolean | null;
  smoothingQuality: string | null;
  width: number;
  height: number;
}

interface Encode {
  mime: string;
  quality: number | undefined;
  width: number;
  height: number;
}

function stubCanvas(webp: boolean) {
  const draws: Draw[] = [];
  const encodes: Encode[] = [];
  const create = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
    if (tag !== "canvas") return create(tag);
    const canvas = {
      width: 0,
      height: 0,
      getContext: () => {
        const context = {
          imageSmoothingEnabled: null as boolean | null,
          imageSmoothingQuality: null as string | null,
          drawImage: (_source: unknown, _x: number, _y: number, w: number, h: number) => {
            draws.push({
              smoothingEnabled: context.imageSmoothingEnabled,
              smoothingQuality: context.imageSmoothingQuality,
              width: w,
              height: h,
            });
          },
        };
        return context;
      },
      toBlob: (callback: (blob: Blob | null) => void, mime: string, quality?: number) => {
        encodes.push({ mime, quality, width: canvas.width, height: canvas.height });
        const type = mime === "image/webp" && !webp ? "image/png" : mime;
        callback(new Blob([new Uint8Array([1])], { type }));
      },
    };
    return canvas as unknown as HTMLElement;
  });
  vi.stubGlobal(
    "createImageBitmap",
    vi.fn(async () => ({ width: 4000, height: 3000, close: () => {} })),
  );
  return { draws, encodes };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("the device's photo encoder (INC-599, D157)", () => {
  it("PE-1 draws every variant with the high-quality filter and encodes WebP at 0.82 / 0.82 / 0.84 / 0.82", async () => {
    const { draws, encodes } = stubCanvas(true);
    const { encodeVariants } = await import("./photo-encode");
    const out = await encodeVariants(
      new File([new Uint8Array([1])], "a.jpg", { type: "image/jpeg" }),
    );
    expect(out.extension).toBe("webp");
    expect(draws).toEqual([
      { smoothingEnabled: true, smoothingQuality: "high", width: 1600, height: 1200 },
      { smoothingEnabled: true, smoothingQuality: "high", width: 960, height: 720 },
      { smoothingEnabled: true, smoothingQuality: "high", width: 480, height: 360 },
      { smoothingEnabled: true, smoothingQuality: "high", width: 160, height: 120 },
    ]);
    // The first toBlob is the 1-px WebP probe; the four after it are the variants.
    expect(encodes.slice(1)).toEqual([
      { mime: "image/webp", quality: 0.82, width: 1600, height: 1200 },
      { mime: "image/webp", quality: 0.82, width: 960, height: 720 },
      { mime: "image/webp", quality: 0.84, width: 480, height: 360 },
      { mime: "image/webp", quality: 0.82, width: 160, height: 120 },
    ]);
  });

  it("PE-2 falls back to JPEG at 0.82 for every variant where the canvas makes no WebP", async () => {
    const { draws, encodes } = stubCanvas(false);
    const { encodeVariants } = await import("./photo-encode");
    const out = await encodeVariants(
      new File([new Uint8Array([1])], "a.jpg", { type: "image/jpeg" }),
    );
    expect(out.extension).toBe("jpg");
    expect(draws.every((draw) => draw.smoothingQuality === "high")).toBe(true);
    expect(encodes.slice(1).map((encode) => [encode.mime, encode.quality])).toEqual([
      ["image/jpeg", 0.82],
      ["image/jpeg", 0.82],
      ["image/jpeg", 0.82],
      ["image/jpeg", 0.82],
    ]);
  });

  it("PE-3 names a decoder's plain-object refusal by its message, never [object Object] (INC-815)", async () => {
    stubCanvas(true);
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn(async () => {
        throw { message: "decode refused", code: "P0001", details: null, hint: null };
      }),
    );
    const { encodeVariants } = await import("./photo-encode");
    await expect(
      encodeVariants(new File([new Uint8Array([1])], "a.jpg", { type: "image/jpeg" })),
    ).rejects.toThrow("the device could not decode this file: decode refused");
  });
});
