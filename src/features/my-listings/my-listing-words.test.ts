import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc: vi.fn() } }));

import { actionErrorKey } from "./my-listing";

/** INC-1280 (10a-2) — the seller's doors' codes have words (D24, D25). */
describe("seller door words (INC-1280)", () => {
  it("RWM-U1 Post similar refused, and refused for a draft (D24)", () => {
    expect(actionErrorKey("notCopied")).toBe("myListings.refusal.notCopied");
    expect(actionErrorKey("notCopied:draft")).toBe("myListings.refusal.notCopiedDraft");
  });
  it("RWM-U2 a value the door does not take (D24)", () => {
    expect(actionErrorKey("badValue:reserved")).toBe("post.refusal.badValue");
  });
  it("RWM-U3 the edit's locks (D25)", () => {
    expect(actionErrorKey("notEditable")).toBe("myListings.refusal.notEditable");
    expect(actionErrorKey("listingNotEditable")).toBe("myListings.refusal.notEditable");
    expect(actionErrorKey("draftNotEdited")).toBe("myListings.refusal.draftNotEdited");
    expect(actionErrorKey("renewFirst")).toBe("myListings.refusal.renewFirst");
  });
  it("RWM-U4 the edit's shape and length codes (D25)", () => {
    expect(actionErrorKey("badShape:coverage")).toBe("post.refusal.badShape");
    expect(actionErrorKey("streetTooLong")).toBe("post.refusal.streetTooLong");
    expect(actionErrorKey("directionsTooLong")).toBe("post.refusal.directionsTooLong");
    expect(actionErrorKey("contactInNote")).toBe("post.refusal.contactInNote");
  });
  it("RWM-U5 a code with no line still draws the family's generic", () => {
    expect(actionErrorKey("noSuchCode")).toBe("myListings.error.failed");
  });
});
