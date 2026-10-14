import { describe, expect, it } from "vitest";

import { CARD_FIRST, CARD_THEN_THUMB, galleryPhotos, linksOf, photoUrl } from "./photo-links";

/** INC-588 / D151 — which link a reader draws, and what the route's answer may carry. */
describe("a stored photo's link (INC-588)", () => {
  const links = {
    p1: {
      card: "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p1/card.webp?token=a",
      thumb:
        "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p1/thumb.webp?token=b",
      cover:
        "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p1/cover.webp?token=c",
    },
    p2: {
      thumb:
        "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p2/thumb.webp?token=d",
      cover:
        "https://staging.example/storage/v1/object/sign/listing-photos/default/u/l/p2/cover.webp?token=e",
    },
  };

  it("PU-1 draws the first variant of the reader's own order", () => {
    expect(photoUrl({ id: "p1" }, CARD_FIRST, links)).toBe(links.p1.card);
    expect(photoUrl({ id: "p2" }, CARD_FIRST, links)).toBe(links.p2.cover);
    expect(photoUrl({ id: "p2" }, CARD_THEN_THUMB, links)).toBe(links.p2.thumb);
  });

  it("PU-2 no links yet, or none for this photo, is no photo", () => {
    expect(photoUrl({ id: "p1" }, CARD_FIRST, undefined)).toBeNull();
    expect(photoUrl({ id: "p3" }, CARD_FIRST, links)).toBeNull();
    expect(photoUrl({ id: "p1" }, CARD_FIRST, { p1: { card: "javascript:alert(1)" } })).toBeNull();
  });

  it("PU-3 the route's answer keeps https links only, at every level", () => {
    expect(
      linksOf({
        links: {
          p1: { card: links.p1.card, thumb: "http://plain.example/x", cover: 7 },
          p2: "https://not-an-object.example",
          p3: { card: "data:image/png;base64,AAAA" },
        },
      }),
    ).toEqual({ p1: { card: links.p1.card } });
    expect(linksOf({})).toEqual({});
    expect(linksOf({ links: ["x"] })).toEqual({});
  });

  it("PU-4 a gallery photo carries its card, cover and thumb links; a photo with no https link is left out (D161)", () => {
    expect(galleryPhotos([{ id: "p1" }, { id: "p2" }, { id: "p3" }], links)).toEqual([
      { id: "p1", main: links.p1.card, large: links.p1.cover, thumb: links.p1.thumb },
      { id: "p2", main: links.p2.cover, large: links.p2.cover, thumb: links.p2.thumb },
    ]);
    expect(
      galleryPhotos([{ id: "p1" }], {
        p1: { card: links.p1.card, cover: "javascript:alert(1)" },
      }),
    ).toEqual([{ id: "p1", main: links.p1.card, large: null, thumb: links.p1.card }]);
    expect(galleryPhotos([{ id: "p1" }], undefined)).toEqual([]);
  });

  it("PU-5 a held photo carries its mark; a screened one carries none (D158)", () => {
    expect(
      galleryPhotos(
        [
          { id: "p1", unscreened: true },
          { id: "p2", unscreened: false },
        ],
        links,
      ),
    ).toEqual([
      {
        id: "p1",
        main: links.p1.card,
        large: links.p1.cover,
        thumb: links.p1.thumb,
        unscreened: true,
      },
      { id: "p2", main: links.p2.cover, large: links.p2.cover, thumb: links.p2.thumb },
    ]);
  });
});
