import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { errorText } from "@/lib/error-text";

/**
 * N1b-1 (INC-977) — NCJ: THE SCHEDULED JOBS ROUTE AND THE SELLER-NAME CATCH-UP.
 * The service client and the gateway are counted, so every refusal is proven to
 * have loaded, read, leased, spent and called nothing (G27/G38).
 */
type Answer =
  | { ok: true; value: { imitates: boolean; of?: string } }
  | { ok: false; reason: string; status?: number; gate?: true };

const state = {
  serviceLoads: 0,
  rpc: [] as Array<{ name: string; args: Record<string, unknown> }>,
  from: [] as string[],
  query: [] as string[],
  ai: [] as string[],
  answers: [] as Answer[],
  rows: [] as Array<{ profile_id: string; subject: string; checked_text: string }>,
  claim: { data: "run-1" as string | null, error: null as { message: string } | null },
  paused: { paused: false } as Record<string, unknown>,
  leaseFree: true,
  readError: null as { message: string } | null,
  logs: [] as string[],
};

vi.mock("@/server/supabase/user-client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/supabase/user-client")>()),
  logRouteError: (_path: string, error: unknown) => {
    state.logs.push(errorText(error));
  },
}));
vi.mock("@/server/ai/gateway", () => ({
  aiCall: async (_task: string, material: { alias: string }) => {
    state.ai.push(material.alias);
    return state.answers.shift() ?? { ok: true, value: { imitates: false } };
  },
}));
vi.mock("@/integrations/supabase/client.server", () => {
  state.serviceLoads += 1;
  const rpc = async (name: string, args: Record<string, unknown>) => {
    state.rpc.push({ name, args });
    if (name === "job_run_claim") return { ...state.claim, status: 200 };
    if (name === "job_pause_read") return { data: state.paused, error: null };
    if (name === "job_lease_take") return { data: state.leaseFree, error: null };
    return { data: true, error: null };
  };
  const builder = {
    select: (cols: string) => (state.query.push(`select ${cols}`), builder),
    eq: (c: string, v: string) => (state.query.push(`eq ${c}=${v}`), builder),
    order: (c: string, o: { ascending: boolean; nullsFirst?: boolean }) => (
      state.query.push(
        `order ${c} ${o.ascending ? "asc" : "desc"}${o.nullsFirst ? " nulls first" : ""}`,
      ),
      builder
    ),
    limit: async (n: number) => {
      state.query.push(`limit ${n}`);
      return { data: state.readError ? null : state.rows, error: state.readError };
    },
  };
  return {
    supabaseAdmin: {
      rpc,
      from: (table: string) => (state.from.push(table), builder),
    },
  };
});

const { Route } = await import("@/routes/api/public/jobs.$job");
const { signJob } = await import("@/server/jobs/signature");

const SECRET = "test-secret-0123456789abcdef0123456789";
const now = () => Math.floor(Date.now() / 1000);

async function post(
  headers: Record<string, string>,
  job = "name-check-catchup",
): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request(`http://local/api/public/jobs/${job}`, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: "{}",
    }),
    params: { job },
  });
}
const signed = (ts = now(), secret = SECRET, job = "name-check-catchup") => ({
  "x-job-timestamp": String(ts),
  "x-job-signature": signJob(job, ts, secret),
});
const rpcNames = () => state.rpc.map((call) => call.name);
const finish = () => state.rpc.find((call) => call.name === "job_run_finish")?.args;
const marks = () =>
  state.rpc.filter((call) => call.name === "name_check_mark").map((call) => call.args["p_state"]);

async function expectRefused(response: Response): Promise<void> {
  expect(response.status).toBe(401);
  expect(await response.json()).toEqual({ error: "unauthorized" });
}
function expectNothingTouched(): void {
  expect(rpcNames().filter((n) => n !== "job_run_claim")).toEqual([]);
  expect(state.from).toEqual([]);
  expect(state.ai).toEqual([]);
}

beforeEach(() => {
  vi.stubEnv("JOB_SECRET", SECRET);
  state.rpc = [];
  state.from = [];
  state.query = [];
  state.ai = [];
  state.answers = [];
  state.rows = [
    { profile_id: "p1", subject: "alias", checked_text: "abebe" },
    { profile_id: "p2", subject: "alias", checked_text: "cocacolashop" },
  ];
  state.claim = { data: "run-1", error: null };
  state.paused = { paused: false };
  state.leaseFree = true;
  state.readError = null;
  state.logs = [];
});
afterEach(() => vi.unstubAllEnvs());

describe("NCJ — the scheduled jobs route (INC-977)", () => {
  it("NCJ-1 no signature, or a person's session alone, is refused: nothing read, spent or called", async () => {
    await expectRefused(await post({}));
    await expectRefused(await post({ Authorization: "Bearer a-person" }));
    expect(state.rpc).toEqual([]);
    expectNothingTouched();
  });

  it("NCJ-2 a wrong signature, a wrong job's signature, or a missing server secret refuses alike", async () => {
    await expectRefused(await post(signed(now(), "another-secret-of-the-same-size-00000")));
    await expectRefused(await post(signed(now(), SECRET, "other-job")));
    vi.stubEnv("JOB_SECRET", "");
    await expectRefused(await post(signed()));
    expect(state.rpc).toEqual([]);
    expectNothingTouched();
    // The secret's value is never logged.
    expect(state.logs.join("\n")).not.toContain(SECRET);
  });

  it("NCJ-3 a timestamp over 300 s old or over 60 s ahead is refused before the claim", async () => {
    await expectRefused(await post(signed(now() - 301)));
    await expectRefused(await post(signed(now() + 61)));
    expect(state.rpc).toEqual([]);
    const ok = await post(signed(now() - 290));
    expect(ok.status).toBe(200);
  });

  it("NCJ-4 a replayed (job, ts) is refused by job_run_claim before the lease; an unknown job answers the same 401", async () => {
    state.claim = { data: null, error: { message: "refused:replay" } };
    await expectRefused(await post(signed()));
    expect(rpcNames()).toEqual(["job_run_claim"]);
    expectNothingTouched();
    state.rpc = [];
    await expectRefused(await post(signed(now(), SECRET, "drop-tables"), "drop-tables"));
    expect(state.rpc).toEqual([]);
  });

  it("NCJ-5 a run asks at most 20 unchecked names, least recently tried first (never tried first), then the oldest since", async () => {
    state.answers = [
      { ok: true, value: { imitates: false } },
      { ok: true, value: { imitates: true, of: "Coca-Cola" } },
    ];
    const response = await post(signed());
    expect(response.status).toBe(200);
    expect(state.query).toEqual([
      "select profile_id, subject, checked_text",
      "eq state=unchecked",
      "order last_attempt_at asc nulls first",
      "order since asc",
      "limit 20",
    ]);
    expect(rpcNames().slice(0, 3)).toEqual(["job_run_claim", "job_pause_read", "job_lease_take"]);
    expect(state.rpc.find((c) => c.name === "job_lease_take")?.args["p_seconds"]).toBe(120);
  });

  it("NCJ-6 each answer is marked for the exact text asked; the answer holds counts only", async () => {
    state.answers = [
      { ok: true, value: { imitates: false } },
      { ok: true, value: { imitates: true, of: "Coca-Cola" } },
    ];
    const response = await post(signed());
    const body = await response.json();
    expect(body).toEqual({ outcome: "ok", asked: 2, clean: 1, imitates: 1, unavailable: 0 });
    expect(JSON.stringify(body)).not.toMatch(/abebe|cocacola|Coca-Cola/i);
    expect(state.rpc.filter((c) => c.name === "name_check_mark").map((c) => c.args)).toEqual([
      { p_profile: "p1", p_subject: "alias", p_text: "abebe", p_state: "clean" },
      { p_profile: "p2", p_subject: "alias", p_text: "cocacolashop", p_state: "imitates" },
    ]);
    expect(finish()).toEqual({
      p_run: "run-1",
      p_outcome: "ok",
      p_reason: null,
      p_asked: 2,
      p_clean: 1,
      p_imitates: 1,
      p_unavailable: 0,
    });
    expect(rpcNames().at(-2)).toBe("job_lease_release");
  });

  it("NCJ-7 a failed model call is 'unavailable' (state unchanged by the door), never clean", async () => {
    state.answers = [
      { ok: false, reason: "timeout" },
      { ok: false, reason: "unavailable" },
    ];
    await post(signed());
    expect(marks()).toEqual(["unavailable", "unavailable"]);
    expect(finish()?.["p_unavailable"]).toBe(2);
    expect(finish()?.["p_clean"]).toBe(0);
  });

  it("NCJ-8 the switch off or the budget spent ends the run with its reason and marks nothing", async () => {
    state.answers = [{ ok: false, reason: "featureOff", gate: true }];
    expect((await (await post(signed())).json()).outcome).toBe("switch_off");
    expect(marks()).toEqual([]);
    expect(finish()?.["p_outcome"]).toBe("switch_off");
    state.rpc = [];
    state.answers = [{ ok: false, reason: "budget", gate: true }];
    expect((await (await post(signed(now() - 1))).json()).outcome).toBe("budget_spent");
    expect(marks()).toEqual([]);
  });

  it("NCJ-9 402 pauses 'credits', 403 'policy', a second 429 'rate_limit'; a paused job asks nothing and leases nothing", async () => {
    for (const [answers, reason] of [
      [[{ ok: false, reason: "providerError", status: 402 }], "credits"],
      [[{ ok: false, reason: "providerError", status: 403 }], "policy"],
      [
        [
          { ok: false, reason: "providerError", status: 429 },
          { ok: false, reason: "providerError", status: 429 },
        ],
        "rate_limit",
      ],
    ] as Array<[Answer[], string]>) {
      state.rpc = [];
      state.answers = answers;
      await post(signed());
      expect(state.rpc.find((c) => c.name === "job_pause_set")?.args).toEqual({
        p_job: "name-check-catchup",
        p_reason: reason,
      });
      expect(finish()?.["p_outcome"]).toBe("paused");
    }
    state.rpc = [];
    state.ai = [];
    state.paused = { paused: true, reason: "credits" };
    const body = await (await post(signed())).json();
    expect(body).toEqual({ outcome: "paused", asked: 0, clean: 0, imitates: 0, unavailable: 0 });
    expect(rpcNames()).toEqual(["job_run_claim", "job_pause_read", "job_run_finish"]);
    expect(state.ai).toEqual([]);
    expect(finish()?.["p_reason"]).toBe("credits");
  });

  it("NCJ-10 an empty run and a busy lease still write their heartbeat; a failed read is 'failed', never 'ok'", async () => {
    state.rows = [];
    expect(await (await post(signed())).json()).toEqual({
      outcome: "ok",
      asked: 0,
      clean: 0,
      imitates: 0,
      unavailable: 0,
    });
    expect(finish()?.["p_outcome"]).toBe("ok");
    state.rpc = [];
    state.leaseFree = false;
    expect((await (await post(signed())).json()).outcome).toBe("busy");
    expect(state.from).toEqual(["name_checks"]);
    expect(rpcNames()).not.toContain("job_lease_release");
    expect(finish()?.["p_outcome"]).toBe("busy");
    state.rpc = [];
    state.leaseFree = true;
    state.readError = { message: "connection reset" };
    expect((await (await post(signed())).json()).outcome).toBe("failed");
    expect(finish()?.["p_reason"]).toBe("read_failed");
    expect(rpcNames()).toContain("job_lease_release");
  });

  it("NCJ-11 no new name starts after 40 s of the run", async () => {
    const { runNameCheckCatchup } = await import("@/server/jobs/name-check-catchup");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let clock = 0;
    state.rpc = [];
    const result = await runNameCheckCatchup(supabaseAdmin as never, "run-9", {
      now: () => {
        const t = clock;
        clock += 25_000;
        return t;
      },
    });
    expect(state.ai).toEqual(["abebe"]);
    expect(result).toMatchObject({ outcome: "ok", reason: "time_cap", asked: 1 });
  });
});
