import { existsSync, readFileSync, rmSync } from "node:fs";

import { netRetryLedgerFile } from "./helpers/net-retry";
import { accountLedgerFile } from "./helpers/users";

import { adminClient, processId, STATE_FILE, type E2EUser } from "./global-setup";

const NAMESPACE = "@ethio-e2e.invalid";
const STALE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

type ListedUser = { id: string; email?: string; created_at?: string };

async function listAll(supabase: ReturnType<typeof adminClient>): Promise<ListedUser[]> {
  const all: ListedUser[] = [];
  for (let page = 1; page <= 50; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`[e2e:teardown] listUsers page ${page} failed: ${error.message}`);
    const users = data?.users ?? [];
    all.push(...users.map((u) => ({ id: u.id, email: u.email, created_at: u.created_at })));
    if (users.length < 200) break;
  }
  return all;
}

function inNamespace(email: string | undefined): email is string {
  return Boolean(email && email.startsWith("e2e+") && email.endsWith(NAMESPACE));
}

/** A fixture belongs to this process iff its local part carries the process id. */
function ownedBy(email: string | undefined, id: string): email is string {
  return inNamespace(email) && email.includes(`+${id}-`);
}

/**
 * INC-080: parallel shards share GITHUB_RUN_ID, so a namespace-wide sweep here
 * deleted sibling shards' fixtures mid-run. Teardown now deletes ONLY the users
 * minted by THIS process; stale orphans are reaped by the nightly sweep below.
 *
 * DEC-059 (INC-189): teardown NEVER reds a green shard. Run 34741970648 shard 6
 * passed 75 tests, skipped 10, failed 0 — and exited 1 because one
 * `admin.deleteUser` answered `fetch failed`. A transient network fault in
 * cleanup is not a verdict on the suite, so every reap fault is reported as a
 * `[e2e:teardown]` WARNING line (the reporter's post-test band quotes them) and
 * the leftover rows are reaped by the nightly sweep. The ONE hard refusal that
 * remains is the safety rule: an out-of-namespace user is never deleted, and
 * that attempt still throws.
 */
export default async function globalTeardown() {
  const state = existsSync(STATE_FILE)
    ? (JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser)
    : null;
  const currentProcessId = state?.processId || processId();
  const supabase = adminClient();
  await reportSignIns(supabase, state);

  let users: ListedUser[] = [];
  try {
    users = await listAll(supabase);
  } catch (error) {
    console.warn(
      `[e2e:teardown] WARNING could not list users for process ${currentProcessId}: ${
        error instanceof Error ? error.message : String(error)
      } — the nightly sweep will reap them.`,
    );
    rmSync(STATE_FILE, { force: true });
    return;
  }
  const targets = users.filter((u) => ownedBy(u.email, currentProcessId));

  let deleted = 0;
  const faults: string[] = [];
  for (const user of targets) {
    // Hard rule: never delete anything outside the reserved namespace.
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:teardown] refusing to delete out-of-namespace user ${user.id}`);
    }
    try {
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw new Error(error.message);
      deleted += 1;
    } catch (error) {
      faults.push(`${user.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const fault of faults) {
    console.warn(
      `[e2e:teardown] WARNING failed to delete ${fault} — deferred to the nightly sweep`,
    );
  }

  console.log(
    `[e2e:teardown] deleted ${deleted} user(s) owned by process ${currentProcessId}` +
      (faults.length > 0 ? `, ${faults.length} deferred to the nightly sweep` : ""),
  );
  rmSync(STATE_FILE, { force: true });
}

/**
 * NIGHTLY ONLY (single-process job). The one place a namespace-wide delete is
 * allowed: reaps @ethio-e2e.invalid users older than 24h left behind by
 * crashed runs. Standing proof fixtures live on other domains and are excluded
 * by the namespace check, which is asserted per user before every delete.
 */
export async function sweepStaleUsers(): Promise<number> {
  const supabase = adminClient();
  const users = await listAll(supabase);
  const cutoff = Date.now() - STALE_MAX_AGE_MS;
  const targets = users.filter((u) => {
    if (!inNamespace(u.email)) return false;
    const createdAt = u.created_at ? Date.parse(u.created_at) : Number.NaN;
    return Number.isFinite(createdAt) && createdAt < cutoff;
  });

  let deleted = 0;
  for (const user of targets) {
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:sweep] refusing to delete out-of-namespace user ${user.id}`);
    }
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw new Error(`[e2e:sweep] failed to delete ${user.id}: ${error.message}`);
    deleted += 1;
  }

  console.log(`[e2e:sweep] deleted ${deleted} stale user(s) in ${NAMESPACE} older than 24h`);
  return deleted;
}

/**
 * DEC-097 (c) — one line per run: accounts that signed in inside this
 * process's window, split pool vs fresh. Ids come from the lease ledger and the
 * setup's own mints; last_sign_in_at is read per id (never a full user list).
 * A counting fault is a WARNING, never a red shard (DEC-059).
 */
async function reportSignIns(
  supabase: ReturnType<typeof adminClient>,
  state: E2EUser | null,
): Promise<void> {
  try {
    const startedAt = state?.startedAt ? Date.parse(state.startedAt) : Number.NaN;
    const pool = new Set<string>();
    const fresh = new Set<string>();
    if (state?.id) fresh.add(state.id);
    for (const admin of state?.superAdmins ?? []) fresh.add(admin.id);
    const ledger = accountLedgerFile();
    if (existsSync(ledger)) {
      for (const line of readFileSync(ledger, "utf8").split("\n")) {
        const [kind, id] = line.trim().split(" ");
        if (!id) continue;
        (kind === "pool" ? pool : fresh).add(id);
      }
      rmSync(ledger, { force: true });
    }
    const signedIn = async (ids: Set<string>) => {
      let n = 0;
      for (const id of ids) {
        const { data, error } = await supabase.auth.admin.getUserById(id);
        if (error || !data?.user) continue;
        const at = data.user.last_sign_in_at ? Date.parse(data.user.last_sign_in_at) : Number.NaN;
        if (Number.isFinite(at) && (!Number.isFinite(startedAt) || at >= startedAt)) n += 1;
      }
      return n;
    };
    const p = await signedIn(pool);
    const f = await signedIn(fresh);
    console.log(`[e2e:teardown] accounts signed in this run: ${p + f} (pool ${p}, fresh ${f})`);
  } catch (error) {
    console.warn(
      `[e2e:teardown] WARNING could not count sign-ins: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  reportTransportRetries();
}

/** DEC-104 — the transport-retry summary; printed even when the count is 0. */
function reportTransportRetries(): void {
  const byMethod = new Map<string, number>();
  const byCode = new Map<string, number>();
  let retries = 0;
  let exhausted = 0;
  try {
    const file = netRetryLedgerFile();
    if (existsSync(file)) {
      for (const line of readFileSync(file, "utf8").split("\n")) {
        const [kind, method, , code] = line.trim().split(" ");
        if (!kind || !method || !code) continue;
        if (kind === "exhausted") {
          exhausted += 1;
          continue;
        }
        retries += 1;
        byMethod.set(method, (byMethod.get(method) ?? 0) + 1);
        byCode.set(code, (byCode.get(code) ?? 0) + 1);
      }
      rmSync(file, { force: true });
    }
  } catch (error) {
    console.warn(
      `[e2e:teardown] WARNING could not read transport retries: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  const fmt = (m: Map<string, number>) =>
    m.size === 0 ? "none" : [...m].map(([k, v]) => `${k} ${v}`).join(", ");
  console.log(
    `[e2e:teardown] transport retries this run: ${retries} (by method: ${fmt(byMethod)}; by code: ${fmt(byCode)}; ran out: ${exhausted})`,
  );
}
