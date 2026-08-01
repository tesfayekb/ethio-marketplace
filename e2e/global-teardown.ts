import { existsSync, readFileSync, rmSync } from "node:fs";

import { adminClient, STATE_FILE, type E2EUser } from "./global-setup";

export default async function globalTeardown() {
  if (!existsSync(STATE_FILE)) return;
  const user = JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser;
  const supabase = adminClient();

  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) throw new Error(`Failed to delete test user ${user.id}: ${error.message}`);

  // Confirm deletion — profiles/user_directory cascade from auth.users.
  const { data } = await supabase.auth.admin.getUserById(user.id);
  if (data?.user) throw new Error(`Test user ${user.id} still exists after teardown.`);

  rmSync(STATE_FILE, { force: true });
}
