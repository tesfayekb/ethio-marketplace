import { act, renderHook, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

/** DEC-464 — a draft that failed to open keeps its error, and reload() opens it again. */
const readDraft = vi.hoisted(() => vi.fn());
vi.mock("./posting-service", () => ({ readDraft, saveDraft: vi.fn() }));

const { useDraft } = await import("./use-draft");

it("UDR-U1 reload runs the load again; the kept error is the read's own", async () => {
  const down = new TypeError("Failed to fetch");
  readDraft.mockRejectedValueOnce(down).mockResolvedValueOnce(null);
  const { result } = renderHook(() => useDraft("l-1"));
  await waitFor(() => expect(result.current.loadError).toBe("failed"));
  expect(result.current.loadFailure).toBe(down);
  act(() => result.current.reload());
  await waitFor(() => expect(result.current.loadError).toBe("notFound"));
  expect(readDraft).toHaveBeenCalledTimes(2);
  expect(result.current.loadFailure).toBeNull();
});
