import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readPhotoLinks, usePhotoLinks } from "./use-photo-links";

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

/** D234 S2 — links a server read already signed seed the hook: no second request. */
describe("photo links preset by the page's server read", () => {
  const wrapper = () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return ({ children }: { children: ReactNode }) =>
      createElement(QueryClientProvider, { client }, children);
  };

  it("UPL-4 preset links are the answer at once, and nothing is asked", async () => {
    const preset = { photo: { card: "https://example.com/signed.jpg" } };
    const { result } = renderHook(() => usePhotoLinks([{ id: "photo" }], preset), {
      wrapper: wrapper(),
    });
    expect(result.current).toEqual(preset);
    await new Promise((done) => setTimeout(done, 20));
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UPL-5 without a preset the links are asked for, as before", async () => {
    const { result } = renderHook(() => usePhotoLinks([{ id: "photo" }]), { wrapper: wrapper() });
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toEqual(links));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});
