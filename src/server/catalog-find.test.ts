import { describe, expect, it } from "vitest";

import {
  CATALOG_FIND_MAX_BYTES,
  CATALOG_FIND_MAX_ROWS,
  clientAddress,
  hashAddress,
  withinBudget,
} from "./catalog-find.server";

const capturedRebuild = [
  {
    leaf_id: "cars",
    slug: "cars",
    path: ["Vehicles", "Cars"],
    icon: "Car",
    matches: [
      { key: "make", value: "toyota" },
      { key: "transmission", value: "automatic" },
    ],
    score: 6475,
  },
  {
    leaf_id: "fitness",
    slug: "fitness",
    path: ["Sports", "Fitness"],
    icon: "Dumbbell",
    matches: [],
    score: 3150,
  },
];

describe("catalog finder route budgets", () => {
  it("keeps a captured real-rebuild response inside the row and byte budgets", () => {
    expect(capturedRebuild).toHaveLength(2);
    expect(capturedRebuild.length).toBeLessThanOrEqual(CATALOG_FIND_MAX_ROWS);
    expect(
      new TextEncoder().encode(JSON.stringify(capturedRebuild)).byteLength,
    ).toBeLessThanOrEqual(CATALOG_FIND_MAX_BYTES);
  });

  it("trims the lowest-ranked rows until an oversized answer fits the budget", () => {
    const wide = Array.from({ length: 8 }, (_, i) => ({
      ...capturedRebuild[0]!,
      leaf_id: `leaf-${i}`,
      path: ["Vehicles", "Cars", "Passenger cars and light commercial vehicles".repeat(6)],
    }));
    const kept = withinBudget(wide);
    expect(kept.length).toBeGreaterThanOrEqual(1);
    expect(kept.length).toBeLessThan(wide.length);
    expect(new TextEncoder().encode(JSON.stringify(kept)).byteLength).toBeLessThanOrEqual(
      CATALOG_FIND_MAX_BYTES,
    );
  });

  it("uses the edge address before a forwarded address and hashes it", () => {
    const request = new Request("https://ethio.com/api/catalog/find", {
      headers: { "cf-connecting-ip": "192.0.2.4", "x-forwarded-for": "198.51.100.8, 10.0.0.1" },
    });
    expect(clientAddress(request)).toBe("192.0.2.4");
    expect(hashAddress(clientAddress(request))).toMatch(/^[a-f0-9]{64}$/);
  });

  it("falls back to the first forwarded address", () => {
    const request = new Request("https://ethio.com/api/catalog/find", {
      headers: { "x-forwarded-for": "198.51.100.8, 10.0.0.1" },
    });
    expect(clientAddress(request)).toBe("198.51.100.8");
  });

  it("uses the isolated key in a local test build", () => {
    const request = new Request("https://ethio.com/api/catalog/find", {
      headers: {
        "x-e2e-catalog-find-key": "finder-unit",
        "x-forwarded-for": "198.51.100.8",
      },
    });
    expect(clientAddress(request)).toBe("e2e:finder-unit");
  });
});
