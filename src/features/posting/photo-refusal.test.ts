import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import { photoRefusalKey } from "./refusal-text";

/** Bundle 16 turns S1 and S2 — the photo routes' abuse refusals, in the seller's words. */
describe("photo refusals (bundle 16 S1, S2)", () => {
  it("PRK-1 a removal past its limit and a draft past the churn rule each have their words", () => {
    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
    expect(photoRefusalKey("publishFirst")).toBe("post.photo.refusal.publishFirst");
    expect(en["post.photo.refusal.publishFirst"]).toBeTruthy();
    expect(en["auth.errorDisposableEmail"]).toBeTruthy();
  });
});

it("maps the photo certification and acceptance refusals to the wait message", () => {
  expect(photoRefusalKey("certificationRequired")).toBe("legal.certify.photosWait");
  expect(photoRefusalKey("acceptanceRequired")).toBe("legal.certify.photosWait");
});
