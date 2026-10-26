import { renderHook, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

/**
 * INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN, never signed
 * out: the state stays "loading" (the header draws neither Sign in nor the account; the shell's
 * live guard waits), and the shell's one notice offers the cure, a refresh.
 */
const door = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.read(),
  onAuthChange: () => ({ unsubscribe: () => undefined }),
  getSupabase: () => Promise.reject(new Error("not used")),
}));
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: reported }));

const { useAuth } = await import("./use-auth");

it("UA-1 a session that could not be read keeps the visitor unknown and says so, never signed out", async () => {
  const error = new Error("Failed to fetch dynamically imported module");
  door.read.mockResolvedValue({ session: null, failed: true, error });
  const { result } = renderHook(() => useAuth());
  await waitFor(() => expect(reported).toHaveBeenCalledWith("the session", error));
  expect(result.current.loading).toBe(true);
  expect(result.current.user).toBeNull();
});

it("UA-2 a read that answers no session is a signed-out visitor, as before", async () => {
  door.read.mockResolvedValue({ session: null, failed: false });
  const { result } = renderHook(() => useAuth());
  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.user).toBeNull();
});
