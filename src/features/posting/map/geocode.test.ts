import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1274 (GEO-1) — the map's geocode maps an ended sign-in to its signed-out reason: the route
 * client's no-session answer and the route's 401 both, never "unavailable" (which reads as a
 * place that cannot be found). Seam (DEC-026): the route client.
 */
const route = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/route-client")>()),
  callRoute: route.callRoute,
}));

const { searchPlaces } = await import("./geocode");

const answered = (status: number, payload: Record<string, unknown>) => ({
  kind: "answered",
  status,
  ok: status >= 200 && status < 300,
  payload,
  error: null,
  detail: null,
  headers: new Headers(),
  bytes: null,
});

beforeEach(() => route.callRoute.mockReset());

describe("the geocode's ended sign-in (INC-1274)", () => {
  it("GEO-1 the no-session answer and a 401 are the signed-out reason; a 500 and an offline call are not", async () => {
    route.callRoute.mockResolvedValueOnce({ kind: "signedOut" });
    expect(await searchPlaces("bole")).toEqual({ results: [], reason: "signedOut" });
    route.callRoute.mockResolvedValueOnce(answered(401, { error: "notSignedIn" }));
    expect(await searchPlaces("bole")).toEqual({ results: [], reason: "signedOut" });
    route.callRoute.mockResolvedValueOnce(answered(500, {}));
    expect(await searchPlaces("bole")).toEqual({ results: [], reason: "unavailable" });
    route.callRoute.mockResolvedValueOnce({ kind: "unreachable", reason: "network" });
    expect(await searchPlaces("bole")).toEqual({ results: [], reason: "unavailable" });
  });
});
