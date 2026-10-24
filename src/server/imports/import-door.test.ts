import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 11 (DEC-237, INC-860 part 1) — THE IMPORT DOOR (IMA-1…6).
 * The Supabase client is mocked under the REAL user-client.ts, so the counts
 * below are the request's true `getUser`, profile and rpc calls; the request's
 * body readers are spies, so a refusal proves the body was never touched.
 */

const state = {
  getUser: 0,
  profileReads: 0,
  rpc: [] as { name: string; args: unknown }[],
  user: "user-1" as string | null,
  status: "active",
  allowed: true,
};

vi.mock("@supabase/supabase-js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@supabase/supabase-js")>();
  return {
    ...actual,
    createClient: () => ({
      auth: {
        getUser: async () => {
          state.getUser += 1;
          return state.user === null
            ? { data: { user: null }, error: { message: "bad jwt", status: 401 } }
            : { data: { user: { id: state.user } }, error: null };
        },
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: async () => {
              state.profileReads += 1;
              return { data: { account_status: state.status }, error: null };
            },
          }),
        }),
      }),
      rpc: async (name: string, args: unknown) => {
        state.rpc.push({ name, args });
        return { data: name === "has_permission" ? state.allowed : {}, error: null };
      },
    }),
  };
});

const { authorizeImport, hasBucket, openImportGate, releaseSlot } = await import("./gate");

const PATH = "/api/admin/categories/import";

function spiedRequest(headers: Record<string, string>) {
  const request = new Request(`http://local${PATH}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({ mode: "preview", categories: "category_path\n" }),
  });
  const reads = { body: 0, arrayBuffer: 0, json: 0, text: 0 };
  Object.defineProperty(request, "body", {
    get() {
      reads.body += 1;
      return null;
    },
  });
  for (const method of ["arrayBuffer", "json", "text"] as const) {
    Object.defineProperty(request, method, {
      value: () => {
        reads[method] += 1;
        return Promise.resolve(null);
      },
    });
  }
  const untouched = () => reads.body + reads.arrayBuffer + reads.json + reads.text === 0;
  return { request, untouched };
}

const BEARER = { Authorization: "Bearer token" };

beforeEach(() => {
  process.env["SUPABASE_URL"] = "https://example.supabase.co";
  process.env["SUPABASE_PUBLISHABLE_KEY"] = "sb_publishable_test";
  state.getUser = 0;
  state.profileReads = 0;
  state.rpc = [];
  state.user = "user-1";
  state.status = "active";
  state.allowed = true;
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
  releaseSlot("user-1");
  vi.restoreAllMocks();
});

describe("authorizeImport", () => {
  it("IMA-1 a declared Content-Length over 4 MiB is 413 before the caller and the body", async () => {
    const { request, untouched } = spiedRequest({ ...BEARER, "Content-Length": "5000000" });
    const door = await authorizeImport(request, PATH, "categories");
    expect(door.ok).toBe(false);
    if (door.ok) return;
    expect(door.response.status).toBe(413);
    expect(await door.response.json()).toEqual({ error: "fileTooLarge" });
    expect(state.getUser).toBe(0);
    expect(state.rpc).toEqual([]);
    expect(untouched()).toBe(true);
  });

  it("IMA-2 no bearer is 401 and the body is not read", async () => {
    const { request, untouched } = spiedRequest({});
    const door = await authorizeImport(request, PATH, "categories");
    expect(door.ok).toBe(false);
    if (door.ok) return;
    expect(door.response.status).toBe(401);
    expect(await door.response.json()).toEqual({ error: "missing bearer token" });
    expect(state.getUser).toBe(0);
    expect(untouched()).toBe(true);
  });

  it("IMA-3 a caller without the permission is 403 forbidden: no body, no meter slot, no other rpc", async () => {
    state.allowed = false;
    const { request, untouched } = spiedRequest(BEARER);
    const door = await authorizeImport(request, PATH, "categories");
    expect(door.ok).toBe(false);
    if (door.ok) return;
    expect(door.response.status).toBe(403);
    expect(await door.response.json()).toEqual({ error: "forbidden" });
    expect(untouched()).toBe(true);
    expect(hasBucket("user-1")).toBe(false);
    expect(state.rpc).toEqual([
      {
        name: "has_permission",
        args: { p_user_id: "user-1", p_resource: "categories", p_action: "import" },
      },
    ]);
  });

  it("IMA-4 a deactivated caller answers the shared 403", async () => {
    state.status = "deactivated";
    const { request, untouched } = spiedRequest(BEARER);
    const door = await authorizeImport(request, PATH, "categories");
    expect(door.ok).toBe(false);
    if (door.ok) return;
    expect(door.response.status).toBe(403);
    expect(await door.response.json()).toEqual({ error: "account is deactivated" });
    expect(state.rpc).toEqual([]);
    expect(untouched()).toBe(true);
  });

  it("IMA-5 the translations family checks translations:update", async () => {
    const { request } = spiedRequest(BEARER);
    const door = await authorizeImport(request, "/api/admin/translations/import", "translations");
    expect(door.ok).toBe(true);
    expect(state.rpc).toEqual([
      {
        name: "has_permission",
        args: { p_user_id: "user-1", p_resource: "translations", p_action: "update" },
      },
    ]);
  });

  it("IMA-6 a permitted caller passes with one getUser for the whole request", async () => {
    const { request, untouched } = spiedRequest(BEARER);
    const door = await authorizeImport(request, PATH, "categories");
    expect(door.ok).toBe(true);
    if (!door.ok) return;
    expect(door.userId).toBe("user-1");
    expect(untouched()).toBe(true);
    const gate = await openImportGate({
      caller: { supabase: door.supabase, userId: door.userId },
      path: PATH,
      familyId: "categories",
      texts: {},
      mode: "undo",
      scope: null,
    });
    expect(gate.ok).toBe(true);
    expect(state.getUser).toBe(1);
    expect(state.profileReads).toBe(1);
  });
});
