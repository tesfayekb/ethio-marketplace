import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

/**
 * INC-914 (Foundations turn 34c) — a session the browser could not read is UNKNOWN, never signed
 * out: the state stays "loading" (the header draws neither Sign in nor the account; the shell's
 * live guard waits), and the shell's one notice offers the cure, a refresh.
 */
const door = vi.hoisted(() => ({ read: vi.fn(), profile: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.read(),
  onAuthChange: () => ({ unsubscribe: () => undefined }),
  // The client's profile read: `from(...).select(...).eq(...).maybeSingle()`, answered by `door.profile`.
  getSupabase: async () => ({
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: () => door.profile() }) }) }),
  }),
}));
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ reportOnDemandFailure: reported }));

const { useAuth } = await import("./use-auth");

const SESSION = { user: { id: "user-1", email: "person@example.test" } };

beforeEach(() => {
  door.read.mockReset();
  door.profile.mockReset();
  reported.mockReset();
});

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

it("ACS-U5 the status read goes out only with the session attached, and not at all without one", async () => {
  door.profile.mockResolvedValue({
    data: { display_name: "Person", account_status: "active" },
    error: null,
  });
  door.read.mockResolvedValue({ session: SESSION, failed: false });
  const signedIn = renderHook(() => useAuth());
  await waitFor(() => expect(signedIn.result.current.user?.displayName).toBe("Person"));
  expect(door.profile).toHaveBeenCalledTimes(1);
  signedIn.unmount();

  door.profile.mockClear();
  // The first read (the hook's own) sees the session; the session has ended by the status read.
  door.read
    .mockResolvedValueOnce({ session: SESSION, failed: false })
    .mockResolvedValue({ session: null, failed: false });
  const ended = renderHook(() => useAuth());
  await waitFor(() => expect(ended.result.current.loading).toBe(false));
  expect(ended.result.current.user).toBeNull();
  expect(door.profile).not.toHaveBeenCalled();
});

it("ACS-U6 a status read that fails is typed and reported, and the person stays signed in", async () => {
  door.read.mockResolvedValue({ session: SESSION, failed: false });
  const error = { message: "JWT expired", code: "401" };
  door.profile.mockResolvedValue({ data: null, error });
  const { result } = renderHook(() => useAuth());
  await waitFor(() => expect(result.current.user?.id).toBe("user-1"));
  expect(result.current.user?.displayName).toBeNull();
  expect(reported).toHaveBeenCalledTimes(1);
  expect(reported.mock.calls[0]?.[0]).toBe("the account's status");
});
