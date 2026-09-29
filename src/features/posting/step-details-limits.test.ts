import { describe, expect, it } from "vitest";

import { DESCRIPTION_MAX, TITLE_MAX } from "./step-details";

// INC-342 — the form's caps are the door's caps (validate_listing_draft step 4).
describe("step-details limits follow the door", () => {
  it("caps the title at 120 and the description at 5000", () => {
    expect(TITLE_MAX).toBe(120);
    expect(DESCRIPTION_MAX).toBe(5000);
  });
});
