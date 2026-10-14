import { afterEach, describe, expect, it, vi } from "vitest";

import { PHOTO_POLICY_INSTRUCTION, POLICY_CODES, screenPhotoPolicy } from "./policy";

/**
 * INC-584 / D148 — the policy pass's instruction. A business card passes with
 * everything on it; any other printed item photographed is a photograph, its
 * print judged by the other codes; `not_a_photo` keeps its four kinds.
 */
describe("the photo policy instruction (INC-584)", () => {
  it("PPOL-1 allows a business card with everything on it (D148)", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A business card is allowed with everything printed on it, its phone numbers, email addresses and handles included: never refuse a business card as contact_in_image or not_a_photo.",
    );
  });

  it("PPOL-4 allows a logo, or a graphic a business designed for itself, like a business card (D153)", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A logo, or another graphic a business designed for itself, is allowed with everything on it, like a business card: never refuse one as not_a_photo or contact_in_image.",
    );
  });

  it("PPOL-3 names any other printed item photographed as a photograph", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "A photograph of another printed item, such as a flyer, a label, a menu or a price list, is a photograph and is never not_a_photo; judge what is printed on it by the other codes.",
    );
  });

  it("PPOL-2 keeps not_a_photo's four kinds and every refusal code", () => {
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "not_a_photo covers a screenshot, a drawing, a blank frame or a test pattern.",
    );
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      `The only refusal codes are: ${POLICY_CODES.join(", ")}.`,
    );
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "contact_in_image covers a phone number, email address or messaging handle printed on the image.",
    );
  });
});

/**
 * INC-601 — every size that will be stored is screened, in ONE call: the cover,
 * the card and the thumb go to the provider together, in that order, and a
 * smaller copy that shows a different picture is refused `variant_mismatch`.
 */
describe("the photo policy pass screens every stored size (INC-601)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const variants = {
    cover: { bytes: new Uint8Array([1, 2, 3]), format: "jpeg" as const, width: 1600 },
    card: { bytes: new Uint8Array([4, 5]), format: "webp" as const, width: 480 },
    thumb: { bytes: new Uint8Array([6]), format: "png" as const, width: 160 },
  };

  /** The real call path: no fake mode, a key, and the provider answering `verdict`. */
  function provider(verdict: Record<string, unknown>) {
    vi.stubEnv("E2E_FAKE_PHOTO_POLICY", "");
    vi.stubEnv("E2E_FAKE_TRANSLATE", "");
    vi.stubEnv("GEMINI_API_KEY", "stub-key");
    const calls: { url: string; body: Record<string, unknown> }[] = [];
    vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      calls.push({ url, body: JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown> });
      const envelope = {
        candidates: [{ content: { parts: [{ text: JSON.stringify(verdict) }] } }],
      };
      return new Response(JSON.stringify(envelope), { status: 200 });
    });
    return calls;
  }

  it("PPOL-5 sends the cover, the card and the thumb in one call, in that order, with their types", async () => {
    const calls = provider({ allowed: true, code: "", evidence: "" });
    const verdict = await screenPhotoPolicy(variants, () => {});
    expect(verdict).toEqual({ ok: true });
    expect(calls).toHaveLength(1);
    const contents = calls[0]!.body["contents"] as { parts: { inlineData: unknown }[] }[];
    expect(contents[0]!.parts.map((part) => part.inlineData)).toEqual([
      { mimeType: "image/jpeg", data: btoa(String.fromCharCode(1, 2, 3)) },
      { mimeType: "image/webp", data: btoa(String.fromCharCode(4, 5)) },
      { mimeType: "image/png", data: btoa(String.fromCharCode(6)) },
    ]);
  });

  it("PPOL-6 refuses an upload whose smaller copy shows a different picture", async () => {
    provider({ allowed: false, code: "variant_mismatch", evidence: "second image differs" });
    const verdict = await screenPhotoPolicy(variants, () => {});
    expect(verdict).toEqual({
      ok: false,
      code: "variant_mismatch",
      evidence: "second image differs",
    });
  });

  it("PPOL-7 tells the provider to judge every image, and that less sharp is not a reason", () => {
    expect(POLICY_CODES).toContain("variant_mismatch");
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "You are shown the images of one upload: first the photo, then smaller copies of it, each smaller than the one before.",
    );
    expect(PHOTO_POLICY_INSTRUCTION).toContain("judge every one of the images by the codes below");
    expect(PHOTO_POLICY_INSTRUCTION).toContain(
      "variant_mismatch covers a smaller copy that shows a different picture from the first image; a smaller copy is less sharp, and that alone is never a reason to refuse.",
    );
  });

  it("PPOL-9 sends the middle size second when it is stored: cover, middle, card, thumb (D162)", async () => {
    const calls = provider({ allowed: true, code: "", evidence: "" });
    const mid = { bytes: new Uint8Array([7, 8]), format: "webp" as const, width: 960 };
    expect(await screenPhotoPolicy({ ...variants, mid }, () => {})).toEqual({ ok: true });
    expect(calls).toHaveLength(1);
    const contents = calls[0]!.body["contents"] as { parts: { inlineData: unknown }[] }[];
    expect(contents[0]!.parts.map((part) => part.inlineData)).toEqual([
      { mimeType: "image/jpeg", data: btoa(String.fromCharCode(1, 2, 3)) },
      { mimeType: "image/webp", data: btoa(String.fromCharCode(7, 8)) },
      { mimeType: "image/webp", data: btoa(String.fromCharCode(4, 5)) },
      { mimeType: "image/png", data: btoa(String.fromCharCode(6)) },
    ]);
  });

  it("PPOL-10 shows the photo at the default detail and every smaller copy at low detail (D165)", async () => {
    const calls = provider({ allowed: true, code: "", evidence: "" });
    const mid = { bytes: new Uint8Array([7, 8]), format: "webp" as const, width: 960 };
    expect(await screenPhotoPolicy({ ...variants, mid }, () => {})).toEqual({ ok: true });
    expect(calls).toHaveLength(1);
    const contents = calls[0]!.body["contents"] as { parts: Record<string, unknown>[] }[];
    expect(contents[0]!.parts.map((part) => part["mediaResolution"])).toEqual([
      undefined,
      { level: "MEDIA_RESOLUTION_LOW" },
      { level: "MEDIA_RESOLUTION_LOW" },
      { level: "MEDIA_RESOLUTION_LOW" },
    ]);
  });

  /** The provider answers `first` to the first call, then the verdict. */
  function refusingFirst(first: { status: number; body: string }) {
    vi.stubEnv("E2E_FAKE_PHOTO_POLICY", "");
    vi.stubEnv("E2E_FAKE_TRANSLATE", "");
    vi.stubEnv("GEMINI_API_KEY", "stub-key");
    const bodies: Record<string, unknown>[] = [];
    vi.stubGlobal("fetch", async (_input: RequestInfo | URL, init?: RequestInit) => {
      bodies.push(JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>);
      if (bodies.length === 1) return new Response(first.body, { status: first.status });
      const envelope = {
        candidates: [
          {
            content: {
              parts: [{ text: JSON.stringify({ allowed: true, code: "", evidence: "" }) }],
            },
          },
        ],
      };
      return new Response(JSON.stringify(envelope), { status: 200 });
    });
    return bodies;
  }

  it("PPOL-11 a model that refuses the low detail is asked once more with every image at the default detail, and the log says so (D165)", async () => {
    const bodies = refusingFirst({
      status: 400,
      body: '{"error":{"code":400,"message":"Invalid JSON payload received. Unknown name \\"mediaResolution\\" at \'contents[0].parts[1]\': Cannot find field."}}',
    });
    const lines: string[] = [];
    expect(await screenPhotoPolicy(variants, (line) => lines.push(line))).toEqual({ ok: true });
    expect(bodies).toHaveLength(2);
    const second = bodies[1]!["contents"] as { parts: Record<string, unknown>[] }[];
    expect(second[0]!.parts.every((part) => !("mediaResolution" in part))).toBe(true);
    expect(lines).toEqual([
      "photo policy: the model refused the low detail for smaller copies; every image sent at the default detail",
    ]);
  });

  it("PPOL-12 any other provider failure is not asked again: the upload is refused providerUnavailable (D165)", async () => {
    const bodies = refusingFirst({
      status: 400,
      body: '{"error":{"message":"API key not valid"}}',
    });
    expect(await screenPhotoPolicy(variants, () => {})).toEqual({
      ok: false,
      code: "providerUnavailable",
      evidence: "screening is unavailable",
    });
    expect(bodies).toHaveLength(1);
  });
  it("PPOL-8 keeps fake mode on the cover's width, so no test run reaches the provider", async () => {
    vi.stubEnv("E2E_FAKE_PHOTO_POLICY", "1");
    const fetched = vi.fn();
    vi.stubGlobal("fetch", fetched);
    expect(await screenPhotoPolicy(variants, () => {})).toEqual({ ok: true });
    const marked = { ...variants, cover: { ...variants.cover, width: 13 } };
    expect(await screenPhotoPolicy(marked, () => {})).toMatchObject({
      ok: false,
      code: "not_a_photo",
    });
    expect(fetched).not.toHaveBeenCalled();
  });
});
