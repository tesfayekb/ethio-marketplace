import { describe, expect, it } from "vitest";
import { saveIntentStep } from "./save-intent";

const base = { hash: "", pending: false, viewer: "signedIn" as const, saved: false, busy: false };

describe("saveIntentStep", () => {
  it("SAI-1 a signed-in arrival with #save clears the hash first", () => {
    expect(saveIntentStep({ ...base, hash: "#save", saved: null })).toBe("clear");
  });
  it("SAI-2 after the clear, an unsaved ad is saved", () => {
    expect(saveIntentStep({ ...base, pending: true })).toBe("save");
  });
  it("SAI-3 an ad already saved calls nothing", () => {
    expect(saveIntentStep({ ...base, pending: true, saved: true })).toBe("none");
  });
  it("SAI-4 waits while the saved state loads or a call is in flight", () => {
    expect(saveIntentStep({ ...base, pending: true, saved: null })).toBe("wait");
    expect(saveIntentStep({ ...base, pending: true, busy: true })).toBe("wait");
  });
  it("SAI-5 waits while the session is unknown", () => {
    expect(saveIntentStep({ ...base, viewer: "unknown", hash: "#save" })).toBe("wait");
    expect(saveIntentStep({ ...base, viewer: "unknown" })).toBe("none");
  });
  it("SAI-6 a signed-out arrival with #save does nothing", () => {
    expect(saveIntentStep({ ...base, viewer: "signedOut", hash: "#save" })).toBe("none");
  });
  it("SAI-7 any other hash does nothing", () => {
    expect(saveIntentStep({ ...base, hash: "#report" })).toBe("none");
    expect(saveIntentStep({ ...base, hash: "#contact" })).toBe("none");
  });
  it("SAI-8 a reload (hash cleared, nothing pending) does nothing", () => {
    expect(saveIntentStep(base)).toBe("none");
  });
  it("SAI-9 the owner: the save the intent sends is the only call; later renders send none", () => {
    // The ownListing answer hides Save; the intent was consumed before the call.
    expect(saveIntentStep({ ...base, pending: true })).toBe("save");
    expect(saveIntentStep({ ...base, pending: false })).toBe("none");
  });
});
