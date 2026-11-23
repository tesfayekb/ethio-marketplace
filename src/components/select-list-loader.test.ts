import { expect, it, vi } from "vitest";
const report = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: report }));
vi.mock("./select-list-body", () => {
  throw new Error("choices download failed");
});
import { loadSelectList, readySelectList } from "./select-list-loader";
it("LSP-U9 a failed list module reports through the shared notice and stays unloaded", async () => {
  expect(readySelectList()).toBeNull();
  expect(await loadSelectList()).toBeNull();
  expect(report).toHaveBeenCalledWith("select list choices", expect.any(Error));
  expect(readySelectList()).toBeNull();
});
