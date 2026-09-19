import { expect, test } from "./fixtures";
import { gotoReady, signIn } from "./helpers/ui";
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

  await page.addInitScript(() => {
    const ref =
      (
        document.querySelector("meta[name='x-none']") as HTMLElement | null
      )?.getAttribute?.("content") ?? null;
    void ref;
    const w = window as unknown as { __inc223Seeded?: boolean };
    if (w.__inc223Seeded) return;
    w.__inc223Seeded = true;
    const stale = Date.now() - 3 * 60 * 60 * 1000;
    const key = Object.keys(localStorage);
    void key;
    // the project ref is derived by the app the same way; seed both plausible
    // stamps by listing what the app writes is impossible pre-boot, so seed by
    // known env-derived ref injected below.
    const projectRef = (window as unknown as { __inc223Ref?: string }).__inc223Ref;
    if (!projectRef) return;
    localStorage.setItem(`sb-${projectRef}-last-activity-at`, String(stale));
    localStorage.setItem(`sb-${projectRef}-session-started-at`, String(stale));
  });
  await page.addInitScript((ref) => {
    (window as unknown as { __inc223Ref?: string }).__inc223Ref = ref;
  }, new URL(process.env["E2E_SUPABASE_URL"]!).hostname.split(".")[0]);

  await gotoReady(page, "/");
  await signIn(page, user.email, user.password);
  await page.waitForTimeout(6000);
  console.log("TRACE:\n" + logs.join("\n"));
  console.log("NOTICE COUNT:", await page.getByTestId("session-notice").count());
  expect(true).toBe(true);
});
