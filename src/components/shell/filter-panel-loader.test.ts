import { expect, it, vi } from "vitest";

const report = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: report }));
vi.mock("./filter-panel-body", () => {
  throw new Error("download failed");
});

import { loadFilterPanel, readyFilterPanel } from "./filter-panel-loader";

it("FP-U31 a failed row download reports through the shared notice instead of rejecting silently", async () => {
  expect(readyFilterPanel()).toBeNull();
  expect(await loadFilterPanel()).toBeNull();
  expect(report).toHaveBeenCalledWith("table filter controls", expect.any(Error));
  expect(readyFilterPanel()).toBeNull();
});
