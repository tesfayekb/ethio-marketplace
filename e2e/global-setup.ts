import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
export const STATE_FILE = join(HERE, ".state", "test-user.json");

export type E2EUser = {
  id: string;
  email: string;
  password: string;
  displayName: string;
};

/** Reserved, non-deliverable namespace — sweepable, never a real address. */
export function testEmail(runId: string, n: number): string {
  return `e2e+${runId}-${n}@ethio-e2e.invalid`;
}

export function adminClient() {
  const url = process.env["E2E_SUPABASE_URL"];
  const serviceRoleKey = process.env["E2E_SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !serviceRoleKey) {
    throw new Error(
      "E2E_SUPABASE_URL and E2E_SUPABASE_SERVICE_ROLE_KEY must be set (staging project only).",
    );
  }
  if (url.includes("zwmvxvzzvjvtdcfcwiuf")) {
    throw new Error("Refusing to run E2E against ethio-prod. Point E2E_SUPABASE_URL at staging.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function globalSetup() {
  const supabase = adminClient();
  const runId = process.env["GITHUB_RUN_ID"] ?? randomBytes(4).toString("hex");
  const email = testEmail(runId, 1);
  const password =
    process.env["E2E_USER_PASSWORD"] ?? `Pw-${randomBytes(18).toString("base64url")}`;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { country_guess: "ET" },
  });
  if (error || !data.user) {
    throw new Error(`Failed to mint pre-confirmed test user: ${error?.message ?? "no user"}`);
  }

  // handle_new_user() derives display_name from the local part of the email.
  const user: E2EUser = {
    id: data.user.id,
    email,
    password,
    displayName: email.split("@")[0]!,
  };

  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(user), "utf8");
}
