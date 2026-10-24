import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readPhotoLinks } from "./use-photo-links";

// The transport is the route client (Foundations turn 14); the tests mock IT —
// the request bytes are route-client's own contract (RCL-1…15). The reader's
// RESULTS stay byte for byte.
const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute }));

const links = { photo: { card: "https://example.com/photo.jpg" } };
const answered = (status: number, payload: Record<string, unknown> | null) => ({
  kind: "answered" as const,
  status,
  ok: status >= 200 && status < 300,
  payload,
  error: null,
  detail: null,
  headers: new Headers(),
  bytes: null,
});

beforeEach(() => {
  callRoute.mockReset().mockResolvedValue(answered(200, { links }));
});
afterEach(() => {
  vi.resetAllMocks();
});

describe("photo link reader", () => {
  it("UPL-1 the request goes out with optional auth and the links come back", async () => {
    expect(await readPhotoLinks(["photo"])).toEqual(links);
    expect(callRoute).toHaveBeenCalledExactlyOnceWith("/api/media/photo-links", {
      auth: "optional",
      json: { photoIds: ["photo"] },
    });
  });
  it("UPL-2 a refused answer throws with its status and gives no links", async () => {
    callRoute.mockResolvedValue(answered(403, null));
    await expect(readPhotoLinks(["photo"])).rejects.toThrow("photo links: 403");
  });
  it("UPL-3 an unreachable route throws and gives no links", async () => {
    callRoute.mockResolvedValue({ kind: "unreachable", reason: "network" });
    await expect(readPhotoLinks(["photo"])).rejects.toThrow("photo links: 0");
  });
});
