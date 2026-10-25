import { afterEach, describe, expect, it, vi } from "vitest";

import { FAKE_CUTOUT_SIZE, MAX_SOURCE_BYTES, readSource } from "./background";
import { MAX_CUTOUT_BYTES, photoroomSegment } from "@/server/ai/providers/photoroom";
import { taskOf } from "@/server/ai/tasks";
import { aiCall } from "@/server/ai/gateway";

vi.mock("@/lib/env-flags", () => ({ isE2E: true }));
vi.mock("@/server/ai/meter", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/ai/meter")>()),
  aiGate: vi.fn(async () => ({ on: true })),
  recordAiSpend: vi.fn(async () => undefined),
}));
vi.mock("@/server/ai/audit", () => ({ recordAiCall: vi.fn(async () => undefined) }));

/**
 * Bundle 13 turn 12 — D155b / D159, on the AI gateway since Foundations turn
 * 17: the provider call is the `background_removal` task through the Photoroom
 * adapter. Only the image goes out; the answer is checked before it is used;
 * fake mode's cut-out is a real PNG with a transparent ground.
 */

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function answer(body: BodyInit | null, init: { status?: number; type?: string } = {}): Response {
  return new Response(body, {
    status: init.status ?? 200,
    headers: init.type === undefined ? {} : { "content-type": init.type },
  });
}

describe("background removal — the provider (D155b / D159)", () => {
  it("BGR-13 the E2E gateway stand-in preserves the captured PNG bytes and every chunk CRC", async () => {
    vi.stubEnv("E2E_FAKE_BACKGROUND", "1");
    const fetched = vi.fn();
    vi.stubGlobal("fetch", fetched);
    const result = await aiCall(
      "background_removal",
      {},
      { actorId: null, path: "/api/listings/background" },
    );
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("stand-in refused");
    const { bytes, mime } = result.value;
    expect(mime).toBe("image/png");
    expect(bytes.byteLength).toBe(1013);
    const digest = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
    expect(
      Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(""),
    ).toBe("ad185c1a829172945925d40f29febc64403d88a02d4f40fcf54adf0abff5ea7c");
    expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    expect([view.getUint32(16), view.getUint32(20)]).toEqual([400, 300]);
    let offset = 8;
    while (offset < bytes.byteLength) {
      const length = view.getUint32(offset);
      expect(offset + length + 12).toBeLessThanOrEqual(bytes.byteLength);
      let crc = 0xffffffff;
      for (const byte of bytes.subarray(offset + 4, offset + 8 + length)) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) === 1 ? 0xedb88320 : 0);
      }
      expect((crc ^ 0xffffffff) >>> 0).toBe(view.getUint32(offset + 8 + length));
      offset += length + 12;
    }
    expect(offset).toBe(1013);
    expect(fetched).not.toHaveBeenCalled();
  });

  it("BGR-1 fake mode's cut-out is a 400 x 300 PNG with an alpha channel, behind its one flag", () => {
    const task = taskOf("background_removal");
    expect(task.fakeFlag).toBe("E2E_FAKE_BACKGROUND");
    const { bytes, mime } = task.fake({}) as { bytes: Uint8Array; mime: string };
    expect(mime).toBe("image/png");
    expect([...bytes.subarray(0, 8)]).toEqual([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    // IHDR: width, height, bit depth 8, colour type 6 (red, green, blue and alpha).
    expect(String.fromCharCode(...bytes.subarray(12, 16))).toBe("IHDR");
    expect([view.getUint32(16), view.getUint32(20)]).toEqual([
      FAKE_CUTOUT_SIZE.width,
      FAKE_CUTOUT_SIZE.height,
    ]);
    expect([bytes[24], bytes[25]]).toEqual([8, 6]);
    // The task's schema accepts the stand-in's answer.
    expect(task.output.safeParse({ bytes, mime }).success).toBe(true);
  });

  it("BGR-2 Photoroom gets the image only, with the key in its header, asked for a WebP cut-out on a transparent ground", async () => {
    vi.stubEnv("PHOTOROOM_API_KEY", "key-1");
    const sent: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init: RequestInit) => {
        sent.push({ url, init });
        return answer(new Uint8Array([1, 2, 3]), { type: "image/webp" });
      }),
    );
    const result = await photoroomSegment({
      image: { bytes: new Uint8Array([9, 9]), mime: "image/webp" },
      timeoutMs: 30_000,
      label: "photoroom test",
    });

    expect(result).toEqual({
      kind: "image",
      status: 200,
      bytes: new Uint8Array([1, 2, 3]),
      mime: "image/webp",
    });
    expect(sent).toHaveLength(1);
    expect(sent[0]!.url).toBe("https://sdk.photoroom.com/v1/segment");
    expect(sent[0]!.init.method).toBe("POST");
    expect(sent[0]!.init.headers).toEqual({ "x-api-key": "key-1" });
    const form = sent[0]!.init.body as FormData;
    expect([...form.keys()].sort()).toEqual(["channels", "format", "image_file", "size"]);
    expect([form.get("format"), form.get("channels"), form.get("size")]).toEqual([
      "webp",
      "rgba",
      "hd",
    ]);
    const file = form.get("image_file") as File;
    expect(file.name).toBe("photo.webp");
    expect(new Uint8Array(await file.arrayBuffer())).toEqual(new Uint8Array([9, 9]));
  });

  it("BGR-3 a refusal, an answer that is not an image, an empty or oversized answer, or no network is no cut-out", async () => {
    vi.stubEnv("PHOTOROOM_API_KEY", "k");
    const cases: [Response | Error, string][] = [
      [answer("payment required", { status: 402, type: "application/json" }), "status"],
      [answer("{}", { type: "application/json" }), "unusable"],
      [answer(new Uint8Array(0), { type: "image/webp" }), "unusable"],
      [answer(new Uint8Array(MAX_CUTOUT_BYTES + 1), { type: "image/webp" }), "unusable"],
      [new Error("offline"), "network"],
    ];
    for (const [reply, kind] of cases) {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => {
          if (reply instanceof Error) throw reply;
          return reply;
        }),
      );
      const result = await photoroomSegment({
        image: { bytes: new Uint8Array([1]), mime: "image/jpeg" },
        timeoutMs: 30_000,
        label: "photoroom test",
      });
      expect(result.kind).toBe(kind);
    }
    // A keyless adapter answers noKey and asks nothing.
    vi.stubEnv("PHOTOROOM_API_KEY", "");
    const fetched = vi.fn();
    vi.stubGlobal("fetch", fetched);
    expect(
      await photoroomSegment({
        image: { bytes: new Uint8Array([1]), mime: "image/jpeg" },
        timeoutMs: 30_000,
        label: "photoroom test",
      }),
    ).toEqual({ kind: "noKey" });
    expect(fetched).not.toHaveBeenCalled();
  });

  it("BGR-4 the stored cover is read through its link; a refusal, a non-image or an oversized file is not sent", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => answer(new Uint8Array([7, 7, 7]), { type: "image/webp" })),
    );
    const read = await readSource("https://storage.example/cover", vi.fn());
    expect(read?.type).toBe("image/webp");
    expect(new Uint8Array(await read!.arrayBuffer())).toEqual(new Uint8Array([7, 7, 7]));

    for (const reply of [
      answer("gone", { status: 404, type: "text/plain" }),
      answer("<html>", { type: "text/html" }),
      answer(new Uint8Array(MAX_SOURCE_BYTES + 1), { type: "image/jpeg" }),
    ]) {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => reply),
      );
      const log = vi.fn();
      expect(await readSource("https://storage.example/cover", log)).toBe(null);
      expect(log).toHaveBeenCalledTimes(1);
    }
  });
});
