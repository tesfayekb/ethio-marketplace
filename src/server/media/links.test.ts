import { describe, expect, it, vi } from "vitest";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

import {
  MAX_LINK_PHOTOS,
  photoIdsOf,
  signPhotoRows,
  signPublicPhotos,
  variantRefs,
  variantsOf,
} from "./links";

// D234 S2 — the service client signPublicPhotos signs with: storage only, no table reads.
const admin = vi.hoisted(() => ({ asked: [] as string[][] }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        createSignedUrls: async (keys: string[]) => {
          admin.asked.push(keys);
          return {
            data: keys.map((key) => ({
              path: key,
              signedUrl: `https://signed/${key}`,
              error: null,
            })),
            error: null,
          };
        },
      }),
    },
  },
}));

/**
 * INC-588 / D151 — what may be signed. The stored shape is the upload route's
 * own (`{ partition, key }` per variant, `original` a bare key).
 */
describe("photo links (INC-588)", () => {
  const paths = {
    card: { partition: "default", key: "default/u/l/p/card.webp" },
    thumb: { partition: "default", key: "default/u/l/p/thumb.webp" },
    cover: { partition: "default", key: "default/u/l/p/cover.webp" },
    original: "default/u/l/p/cover.webp",
  };

  it("LK-1 every drawable variant of a stored photo is signable, in the reader's order", () => {
    expect(variantRefs(paths)).toEqual([
      { variant: "card", partition: "default", key: "default/u/l/p/card.webp" },
      { variant: "thumb", partition: "default", key: "default/u/l/p/thumb.webp" },
      { variant: "cover", partition: "default", key: "default/u/l/p/cover.webp" },
    ]);
  });

  it("LK-2 a bare key, an unknown partition, an empty key and a non-object give nothing", () => {
    expect(variantRefs({ card: "default/u/l/p/card.webp" })).toEqual([]);
    expect(variantRefs({ card: { partition: "eu", key: "k" } })).toEqual([]);
    expect(variantRefs({ card: { partition: "default", key: "" } })).toEqual([]);
    expect(variantRefs(null)).toEqual([]);
    expect(variantRefs(["card"])).toEqual([]);
  });

  it("LK-3 a request names one to thirty photos, each once", () => {
    expect(photoIdsOf(["a", "a", "b", 3, ""])).toEqual(["a", "b"]);
    expect(photoIdsOf([])).toBeNull();
    expect(photoIdsOf("a")).toBeNull();
    expect(
      photoIdsOf(Array.from({ length: MAX_LINK_PHOTOS + 1 }, (_, index) => `p${index}`)),
    ).toBeNull();
  });

  it("LK-4 a request may name the sizes it needs; only those are signed (INC-606)", async () => {
    expect(variantsOf(undefined)).toEqual(["card", "thumb", "mid", "cover"]);
    expect(variantsOf(["card", "thumb", "card"])).toEqual(["card", "thumb"]);
    expect(variantsOf([])).toBeNull();
    expect(variantsOf(["original"])).toBeNull();
    expect(variantsOf("card")).toBeNull();

    const asked: string[][] = [];
    const service = {
      storage: {
        from: () => ({
          createSignedUrls: async (keys: string[]) => {
            asked.push(keys);
            return {
              data: keys.map((key) => ({
                path: key,
                signedUrl: `https://signed/${key}`,
                error: null,
              })),
              error: null,
            };
          },
        }),
      },
    } as unknown as SupabaseClient<Database>;
    const rows = [{ id: "p", paths, exif_stripped: true }];
    expect(await signPhotoRows(service, rows, ["card", "thumb"])).toEqual({
      p: {
        card: "https://signed/default/u/l/p/card.webp",
        thumb: "https://signed/default/u/l/p/thumb.webp",
      },
    });
    expect(asked).toEqual([["default/u/l/p/card.webp", "default/u/l/p/thumb.webp"]]);
  });

  it("LK-5 a stored middle size is signable and may be asked for alone (D162)", () => {
    const withMid = { ...paths, mid: { partition: "default", key: "default/u/l/p/mid.webp" } };
    expect(variantRefs(withMid).map((ref) => ref.variant)).toEqual([
      "card",
      "thumb",
      "mid",
      "cover",
    ]);
    expect(variantsOf(["mid"])).toEqual(["mid"]);
  });

  it("LK-6 a public document's photos are signed as they stand, with no row read, at most thirty (D234)", async () => {
    const photos = Array.from({ length: MAX_LINK_PHOTOS + 1 }, (_, index) => ({
      id: `p${index}`,
      paths: { card: { partition: "default", key: `default/u/l/p${index}/card.webp` } },
    }));
    const links = await signPublicPhotos(photos, ["card"]);
    expect(Object.keys(links)).toHaveLength(MAX_LINK_PHOTOS);
    expect(links).toMatchObject({ p0: { card: "https://signed/default/u/l/p0/card.webp" } });
    expect(admin.asked).toHaveLength(1);
    expect(admin.asked[0]).toHaveLength(MAX_LINK_PHOTOS);
    expect(await signPublicPhotos([], ["card"])).toEqual({});
    expect(admin.asked).toHaveLength(1);
  });
});
