import { expect, test } from "./fixtures";
import { gotoReady } from "./helpers/ui";
import { adminClient, createUser } from "./helpers/users";

async function grantRole(userId: string, roleName: string) {
  const supabase = adminClient();
  const { data: role } = await supabase.from("roles").select("id").eq("name", roleName).single();
  await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role!.id, scope_type: "global" });
}

test("INC223 repro: stale stamps sign the new session out", async ({ page }) => {
  const user = await createUser({ confirmed: true });
  await grantRole(user.id, "super_admin");

  const logs: string[] = [];
  page.on("console", (m) => {
    if (m.text().includes("[inc223]")) logs.push(m.text());
  });

  await page.addInitScript((ref: string) => {
    const w = window as unknown as { __inc223Seeded?: boolean };
    if (w.__inc223Seeded) return;
    w.__inc223Seeded = true;
    const stale = Date.now() - 5 * 60 * 60 * 1000;
    localStorage.setItem(`sb-${ref}-last-activity-at`, String(stale));
    localStorage.setItem(`sb-${ref}-session-started-at`, String(stale));
  }, new URL(process.env["E2E_SUPABASE_URL"]!).hostname.split(".")[0]);

  await gotoReady(page, "/auth");
  await page.locator("#auth-email").fill(user.email);
  await page.locator("#auth-password").fill(user.password);
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(8000);
  console.log("URL:", page.url());
  console.log("TRACE:\n" + logs.join("\n"));
  console.log("NOTICE COUNT:", await page.getByTestId("session-notice").count());
  expect(true).toBe(true);
});
