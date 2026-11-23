import { beforeEach, expect, it, vi } from "vitest";

/**
 * INC-1264 / INC-1266 — the status read answers `failed` with the error as it arrived (it sits on the
 * first download, so it carries no typed failure), and sends nothing without a session.
 */
const door = vi.hoisted(() => ({ read: vi.fn(), client: vi.fn(), profile: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.read(),
  getSupabase: () => door.client(),
}));

const { readAccountStatus } = await import("./account-status");

const SESSION = { user: { id: "user-1" } };

beforeEach(() => {
  door.read.mockReset();
  door.client.mockReset();
  door.profile.mockReset();
  door.client.mockResolvedValue({
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: () => door.profile() }) }) }),
  });
});

it("ACS-U7 a failed session read, a failed client and a failed query each answer failed with their own error, and nothing goes out without a session", async () => {
  const sessionError = new Error("storage unreadable");
  door.read.mockResolvedValue({ session: null, failed: true, error: sessionError });
  const first = await readAccountStatus("user-1");
  expect(first.kind).toBe("failed");
  expect(first.kind === "failed" && first.error).toBe(sessionError);
  expect(door.client).not.toHaveBeenCalled();

  const clientError = new Error("Failed to fetch dynamically imported module");
  door.read.mockResolvedValue({ session: SESSION, failed: false });
  door.client.mockRejectedValueOnce(clientError);
  const second = await readAccountStatus("user-1");
  expect(second.kind === "failed" && second.error).toBe(clientError);
  expect(door.profile).not.toHaveBeenCalled();

  const queryError = { message: "JWT expired", code: "401" };
  door.profile.mockResolvedValue({ data: null, error: queryError });
  const third = await readAccountStatus("user-1");
  expect(third.kind === "failed" && third.error).toBe(queryError);

  // No session, or another person's: nothing is sent and the answer is not a failure.
  door.client.mockClear();
  door.profile.mockClear();
  door.read.mockResolvedValue({ session: null, failed: false });
  expect((await readAccountStatus("user-1")).kind).toBe("noSession");
  door.read.mockResolvedValue({ session: { user: { id: "other" } }, failed: false });
  expect((await readAccountStatus("user-1")).kind).toBe("noSession");
  expect(door.client).not.toHaveBeenCalled();
  expect(door.profile).not.toHaveBeenCalled();
});
