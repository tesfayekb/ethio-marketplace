import { describe, expect, it } from "vitest";

import type { RouteAnswer } from "@/lib/route-client";
import { readRefusal } from "@/lib/refusal";

import { CATEGORY_REFUSALS } from "../admin-categories/category-refusals";
import { COUNTRY_REFUSALS } from "../admin-countries/country-refusals";
import { LOCATION_REFUSALS } from "./location-refusals";

const refused = (status: number, error: string): RouteAnswer => ({
  kind: "answered",
  status,
  ok: false,
  payload: { error },
  error,
  detail: null,
  headers: new Headers(),
  bytes: null,
});

/** INC-1280 (10a-2, D55) — the export routes' codes, read as each page reads them. */
describe("export words (INC-1280)", () => {
  it("RWE-U1 Places: forbidden and unknownCountry", () => {
    expect(readRefusal(refused(403, "forbidden"), LOCATION_REFUSALS).key).toBe(
      "admin.locations.error.denied",
    );
    expect(readRefusal(refused(404, "unknownCountry"), LOCATION_REFUSALS).key).toBe(
      "admin.locations.error.unknownCountry",
    );
  });
  it("RWE-U2 Countries: forbidden and unknownCountry", () => {
    expect(readRefusal(refused(403, "forbidden"), COUNTRY_REFUSALS).key).toBe(
      "admin.countries.error.denied",
    );
    expect(readRefusal(refused(404, "unknownCountry"), COUNTRY_REFUSALS).key).toBe(
      "admin.countries.error.unknownCountry",
    );
  });
  it("RWE-U3 Categories: forbidden and unknownCategory; an unplaced code is not a family line", () => {
    expect(readRefusal(refused(403, "forbidden"), CATEGORY_REFUSALS).key).toBe(
      "admin.ai.error.denied",
    );
    expect(readRefusal(refused(404, "unknownCategory"), CATEGORY_REFUSALS).key).toBe(
      "admin.categories.error.unknownCategory",
    );
    expect(readRefusal(refused(500, "boom"), CATEGORY_REFUSALS).branch).not.toBe("family");
  });
});
