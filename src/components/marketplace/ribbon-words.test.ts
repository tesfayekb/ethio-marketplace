import { describe, expect, it } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";

/**
 * RB-1 every ribbon's words fit the card: the longest words the card's band
 * shows whole at 360 px (D196). INC-670 (bundle 18 turn 1): every ribbon is
 * drawn at ONE size, so the photos-soon band's words keep the status words'
 * cap — 14 characters, no longer 18 (its own smaller letters are gone).
 */
describe("ribbon word lengths", () => {
  const ribbonKeys = [
    "feed.ribbon.sold",
    "feed.ribbon.rented",
    "feed.ribbon.filled",
    "feed.ribbon.closed",
    "feed.reserved",
    "feed.priceReduced",
  ] as const;

  for (const locale of [
    { name: "en", strings: en },
    { name: "am", strings: am },
  ] as const) {
    it(`RB-1 ${locale.name}: status ribbons are at most 14 characters`, () => {
      for (const key of ribbonKeys) {
        const value = locale.strings[key];
        expect(
          value.length,
          `${locale.name}["${key}"] = "${value}" exceeds 14 chars`,
        ).toBeLessThanOrEqual(14);
      }
    });

    it(`RB-1b ${locale.name}: listing.photosSoon is at most 14 characters (INC-670: one ribbon size)`, () => {
      const value = locale.strings["listing.photosSoon"];
      expect(
        value.length,
        `${locale.name}["listing.photosSoon"] = "${value}" exceeds 14 chars`,
      ).toBeLessThanOrEqual(14);
    });
  }
});
