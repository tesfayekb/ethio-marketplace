import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The posting doors' transport is the route client (Foundations turn 14); the
// tests mock IT, not fetch/XHR — the request bytes are route-client's own
// contract (RCL-1…15). Assertions on RESULTS stay byte for byte.
const { callRoute, uploadRoute } = vi.hoisted(() => ({
  callRoute: vi.fn(),
  uploadRoute: vi.fn(),
}));
vi.mock("@/lib/route-client", () => ({ callRoute, uploadRoute }));

import {
  call,
  mayResumePosting,
  publishListing,
  removeBackground,
  SAVE_TIMEOUT_MS,
  saveDraft,
  shapePostingSchema,
  uploadPhoto,
} from "./posting-service";

const UNREACHABLE = { status: 0, ok: false, refusals: [], payload: {}, unreachable: true };
const answered = (status: number, payload: Record<string, unknown> | null, headers?: Headers) => ({
  kind: "answered" as const,
  status,
  ok: status >= 200 && status < 300,
  payload,
  error: null,
  detail: null,
  headers: headers ?? new Headers(),
  bytes: null,
});

beforeEach(() => {
  callRoute.mockReset().mockResolvedValue(answered(200, { ok: true }));
  uploadRoute.mockReset().mockResolvedValue(answered(200, { ok: true }));
});
afterEach(() => {
  vi.unstubAllGlobals();
});

it("INC-824 only a draft resumes posting", () => {
  expect(mayResumePosting("draft")).toBe(true);
  for (const status of ["screening", "active", "sold", "expired", "removed", "rejected", ""]) {
    expect(mayResumePosting(status)).toBe(false);
  }
});

describe("the door adapter (PSV)", () => {
  it("PSV-1 signedOut is today's no-token answer", async () => {
    callRoute.mockResolvedValue({ kind: "signedOut" });
    expect(await saveDraft({ listingId: null, step: 1 })).toEqual({
      ...UNREACHABLE,
      status: 401,
    });
  });
  it("PSV-2 a 200 refusal keeps its refusals, attr_key resolving to field", async () => {
    callRoute.mockResolvedValue(
      answered(200, { ok: false, refusals: [{ attr_key: "x", reason: "y" }] }),
    );
    const answer = await saveDraft({ listingId: null, step: 1 });
    expect(answer.ok).toBe(false);
    expect(answer.unreachable).toBe(false);
    expect(answer.refusals).toEqual([{ field: "x", reason: "y" }]);
  });
  it("PSV-3 a 503 is unreachable, never a verdict", async () => {
    callRoute.mockResolvedValue(answered(503, null));
    const answer = await saveDraft({ listingId: null, step: 1 });
    expect(answer).toEqual({ ...UNREACHABLE, status: 503 });
  });
  it("PSV-4 uploadPhoto reports Math.min(99, …) percents and a dropped upload is UNREACHABLE", async () => {
    const image = new Blob(["photo"]);
    const variants = { cover: image, mid: image, card: image, thumb: image };
    const percents: number[] = [];
    uploadRoute.mockImplementation(async (_path, _form, init) => {
      init?.onProgress?.(1, 4);
      init?.onProgress?.(4, 4);
      return answered(200, { ok: true });
    });
    const answer = await uploadPhoto("listing", variants, "jpg", (p) => percents.push(p));
    expect(percents).toEqual([25, 99]);
    expect(answer.ok).toBe(true);
    uploadRoute.mockResolvedValue({ kind: "unreachable", reason: "network" });
    expect(await uploadPhoto("listing", variants, "jpg")).toEqual(UNREACHABLE);
  });
  it("PSV-5 removeBackground returns the image Blob and triesLeft, or the refusal's first reason", async () => {
    const picture = new Blob(["cutout"], { type: "image/png" });
    callRoute.mockResolvedValue({
      ...answered(200, null, new Headers({ "content-type": "image/png", "x-tries-left": "2" })),
      bytes: picture,
    });
    const cut = await removeBackground("l-1", "p-1");
    expect(cut).toEqual({ ok: true, picture, triesLeft: 2 });
    callRoute.mockResolvedValue(
      answered(200, { ok: false, refusals: [{ attr_key: "photo", reason: "noTriesLeft" }] }),
    );
    expect(await removeBackground("l-1", "p-1")).toEqual({
      ok: false,
      reason: "noTriesLeft",
      unreachable: false,
    });
  });
  it("PSV-6 saveDraft passes SAVE_TIMEOUT_MS as timeoutMs", async () => {
    await saveDraft({ listingId: null, step: 1 });
    expect(callRoute).toHaveBeenCalledWith("/api/listings/draft", {
      json: { listingId: null, step: 1 },
      timeoutMs: SAVE_TIMEOUT_MS,
    });
  });
});

describe("call() — DEC-135 save timeout", () => {
  it("an unreachable transport answer is UNREACHABLE, never a refusal", async () => {
    callRoute.mockResolvedValue({ kind: "unreachable", reason: "timeout" });
    const answer = await call("/api/listings/draft", "{}", {});
    expect(answer.unreachable).toBe(true);
    expect(answer.ok).toBe(false);
    expect(answer.refusals).toEqual([]);
  });
});

describe("shapePostingSchema — K5 failed read", () => {
  it("a payload without an attributes array is a failed read", () => {
    expect(shapePostingSchema({ category: {} })).toBeNull();
    expect(shapePostingSchema({ attributes: "x" })).toBeNull();
  });
  it("an empty attributes array is an empty list", () => {
    const schema = shapePostingSchema({ attributes: [] });
    expect(schema).not.toBeNull();
    expect(schema?.details).toBe(0);
  });
});

describe("the publish route's certification (bundle 22 turn 4; the schema is the rule, Foundations turn 2)", () => {
  const ID = "0b9a6c1e-2f3d-4e5a-8b7c-9d0e1f2a3b4c";
  it("passes certified and language only when sent", async () => {
    const { PublishBody } = await import("@/routes/api/listings/publish");
    expect(PublishBody.safeParse({ listingId: ID }).success).toBe(true);
    const full = PublishBody.safeParse({ listingId: ID, certified: [ID], language: "am" });
    expect(full.success).toBe(true);
    if (full.success) {
      expect(full.data).toEqual({ listingId: ID, certified: [ID], language: "am" });
    }
  });
  it("refuses a non-uuid entry, more than 20 entries and a long language, by field", async () => {
    const { PublishBody } = await import("@/routes/api/listings/publish");
    const fieldOf = (body: Record<string, unknown>) => {
      const parsed = PublishBody.safeParse({ listingId: ID, ...body });
      // The refusal's field is the path's first segment ("certified.1" → "certified").
      return parsed.success ? null : String(parsed.error.issues[0]?.path[0]);
    };
    expect(fieldOf({ certified: [ID, "not-a-uuid"] })).toBe("certified");
    expect(fieldOf({ certified: Array.from({ length: 21 }, () => ID) })).toBe("certified");
    expect(fieldOf({ certified: Array.from({ length: 20 }, () => ID) })).toBeNull();
    expect(fieldOf({ language: "x".repeat(11) })).toBe("language");
    const missing = PublishBody.safeParse({ certified: [ID] });
    expect(missing.success).toBe(false);
    if (!missing.success) expect(missing.error.issues[0]?.path.join(".")).toBe("listingId");
  });
  it("publishListing sends certified and language only when given", async () => {
    await publishListing("l-1");
    await publishListing("l-1", { certified: [ID], language: "en" });
    expect(callRoute.mock.calls[0][1].json).toEqual({ listingId: "l-1" });
    expect(callRoute.mock.calls[1][1].json).toEqual({
      listingId: "l-1",
      certified: [ID],
      language: "en",
    });
  });
});

describe("photo upload certification (bundle 22 turn 6)", () => {
  const ids = ["0b9a6c1e-2f3d-4e5a-8b7c-9d0e1f2a3b4c", "1b9a6c1e-2f3d-4e5a-8b7c-9d0e1f2a3b4c"];
  async function sent(certification?: { certified: string[]; language: string }) {
    const image = new Blob(["photo"]);
    await uploadPhoto(
      "listing",
      { cover: image, mid: image, card: image, thumb: image },
      "jpg",
      undefined,
      undefined,
      certification,
    );
    return uploadRoute.mock.calls[0][1] as FormData;
  }
  it("sends the exact version ids joined by commas and language when given", async () => {
    const form = await sent({ certified: ids, language: "en" });
    expect(form.get("certified")).toBe(ids.join(","));
    expect(form.get("language")).toBe("en");
  });
  it("omits both fields without certification", async () => {
    const form = await sent();
    expect(form.has("certified")).toBe(false);
    expect(form.has("language")).toBe(false);
  });
});
