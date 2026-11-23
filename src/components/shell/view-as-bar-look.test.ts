import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

import { VIEW_AS_BAR_CLASS } from "./view-as-bar-look";

const BARS = [
  "src/components/shell/impersonation-notice.tsx",
  "src/features/admin/impersonation/impersonation-banner.tsx",
];

it("VAB-U1 both view-as bars draw their outer bar from the one class list, never a copy", () => {
  for (const file of BARS) {
    const source = readFileSync(file, "utf8");
    expect(source).toContain("className={VIEW_AS_BAR_CLASS}");
    expect(source).not.toContain(VIEW_AS_BAR_CLASS);
  }
  expect(VIEW_AS_BAR_CLASS).toContain("bg-destructive");
});
