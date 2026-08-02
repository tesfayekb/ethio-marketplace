import { existsSync, readFileSync, rmSync } from "node:fs";

import { adminClient, STATE_FILE, type E2EUser } from "./global-setup";

const NAMESPACE = "@ethio-e2e.invalid";
const ORPHAN_MAX_AGE_MS = 24 * 60 * 60 * 1000;

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

export default async function globalTeardown() {
  const currentRunId = existsSync(STATE_FILE)
    ? ((JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser).runId ?? "")
    : "";
  const supabase = adminClient();

  const users = await listAll(supabase);
  const targets = users.filter((u) => {
    if (!inNamespace(u.email)) return false;
    if (currentRunId && u.email.includes(currentRunId)) return true;
    const age = u.created_at ? Date.now() - Date.parse(u.created_at) : 0;
    return age > ORPHAN_MAX_AGE_MS;
  });

  let deleted = 0;
  for (const user of targets) {
    // Hard rule: never delete anything outside the reserved namespace.
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:teardown] refusing to delete out-of-namespace user ${user.id}`);
    }
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw new Error(`[e2e:teardown] failed to delete ${user.id}: ${error.message}`);
    deleted += 1;
  }

  if (currentRunId) {
    const remaining = (await listAll(supabase)).filter(
      (u) => inNamespace(u.email) && u.email.includes(currentRunId),
    );
    if (remaining.length > 0) {
      throw new Error(
        `[e2e:teardown] ${remaining.length} user(s) from run ${currentRunId} survived teardown.`,
      );
    }
  }

  console.log(`[e2e:teardown] deleted ${deleted} user(s) in ${NAMESPACE}`);
  rmSync(STATE_FILE, { force: true });
}
