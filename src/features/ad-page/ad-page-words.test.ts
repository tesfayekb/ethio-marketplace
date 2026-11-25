import { describe, expect, it } from "vitest";

import { savedRemoveKey } from "@/features/account/saved-remove-refusals";

import { contactRefusal, reportRefusal } from "./ad-page-refusals";

const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

/** INC-1280 (10a-2) — the ad page's and Saved's codes have words (D27). */
describe("ad page and Saved words (INC-1280)", () => {
  it("RWD-U1 a report on a gone ad, and a note over the limit", () => {
    expect(reportRefusal(coded("listingNotAvailable"))).toBe("gone");
    expect(reportRefusal(coded("noteTooLong"))).toBe("noteTooLong");
    expect(reportRefusal(coded("noSuchCode"))).toBe("failed");
  });
  it("RWD-U2 a contact on a gone ad keeps its own state", () => {
    expect(contactRefusal(coded("listingNotAvailable"))).toBe("listingNotAvailable");
  });
  it("RWD-U3 Remove on Saved: its own words, and its generic for anything else (D27)", () => {
    expect(savedRemoveKey("listingNotAvailable")).toBe("account.saved.unavailable");
    expect(savedRemoveKey("failed")).toBe("account.saved.removeFailed");
    expect(savedRemoveKey("rateLimited")).toBe("account.saved.removeFailed");
    expect(savedRemoveKey(null)).toBe("account.saved.removeFailed");
  });
});
