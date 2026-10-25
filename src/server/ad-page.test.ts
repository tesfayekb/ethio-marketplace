import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * D234 S2 — the ad page's server read signs the ad's photo links from its own public
 * document (signPublicPhotos: no second read); a failed signing never fails the page.
 */
const { rpc, signPublicPhotos } = vi.hoisted(() => ({
  rpc: vi.fn(),
  signPublicPhotos: vi.fn(),
}));
vi.mock("@/server/supabase/user-client", () => ({ anonymousClient: () => ({ rpc }) }));
vi.mock("@/server/dials", () => ({ spend: async () => ({ allowed: true }) }));
vi.mock("@/server/catalog-find.server", () => ({ clientAddress: () => "203.0.113.9" }));
vi.mock("@/server/media/links", () => ({ signPublicPhotos }));

const { readAdPage } = await import("./ad-page");

const doc = (photos: string[]) => ({
  public_id: "abc2345678",
  title: "A bicycle",
  photos: photos.map((id, index) => ({
    id,
    display_order: index,
    paths: null,
    width: null,
    height: null,
  })),
});
const request = new Request("https://example.test/l/a-bicycle-abc2345678");

afterEach(() => vi.resetAllMocks());

describe("the ad page's server read (D234)", () => {
  it("ADP-1 an ad with photos answers with their signed links", async () => {
    rpc.mockResolvedValue({ data: doc(["p1", "p2"]), error: null });
    const links = { p1: { card: "https://example.test/signed-1" } };
    signPublicPhotos.mockResolvedValue(links);
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind).toBe("ad");
    expect(answer.kind === "ad" ? answer.photoLinks : undefined).toEqual(links);
    expect(signPublicPhotos).toHaveBeenCalledWith(doc(["p1", "p2"]).photos);
  });

  it("ADP-2 a failed signing answers the ad without links and one [ad-links] line", async () => {
    rpc.mockResolvedValue({ data: doc(["p1"]), error: null });
    signPublicPhotos.mockRejectedValue(new Error("sign failed"));
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind === "ad" ? answer.photoLinks : "not an ad").toBeNull();
    expect(errors).toHaveBeenCalledWith("[ad-links] /l", "sign failed");
    errors.mockRestore();
  });

  it("ADP-3 an ad without photos asks for no signing", async () => {
    rpc.mockResolvedValue({ data: doc([]), error: null });
    const answer = await readAdPage(request, "a-bicycle-abc2345678");
    expect(answer.kind === "ad" ? answer.photoLinks : "not an ad").toBeNull();
    expect(signPublicPhotos).not.toHaveBeenCalled();
  });
});
