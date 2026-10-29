import { expect, test } from "./fixtures";
import { en } from "../src/i18n/locales/en";
import { signInAsSuperAdmin } from "./helpers/categories";
import { gotoReady } from "./helpers/ui";
import { inBrowserClient } from "./helpers/browser-client";

/** A2 read-only consumer proof: no real row changes and no scratch visibility bypass. */
test("ACR-E1 staff history filters through the real door and renders its exact page", async ({
  page,
}) => {
  await signInAsSuperAdmin(page);
  await gotoReady(page, "/admin/ai");
  const section = page.getByTestId("ai-calls");
  await expect(section).toBeVisible();
  const answer = await inBrowserClient(page, (client) =>
    client.rpc<{ rows: { id: string; feature: string }[]; next: unknown }>("admin_list_ai_calls", {
      p_limit: 50,
    }),
  );
  expect(answer.error).toBeNull();
  if (!answer.data) throw new Error("ACR-E1 missing real door page");
  // The cards twin names a row `<rowTestId>-card` (DataTable's contract); the table row is `<rowTestId>`.
  const cards = (page.viewportSize()?.width ?? 1280) < 1024;
  const surface = cards ? section.getByTestId("data-table-cards") : section.getByRole("table");
  const rowId = (id: string) => (cards ? `ai-call-${id}-card` : `ai-call-${id}`);
  for (const row of answer.data.rows)
    await expect(surface.getByTestId(rowId(row.id))).toBeVisible();
  if (answer.data.rows.length === 0)
    await expect(section.getByTestId("data-table-empty")).toBeVisible();
  await section.getByTestId("ai-calls-feature").selectOption("name_check");
  await section.getByTestId("ai-calls-outcome").selectOption("timeout");
  const filtered = await inBrowserClient(page, (client) =>
    client.rpc<{ rows: { id: string; feature: string; outcome: string }[] }>(
      "admin_list_ai_calls",
      { p_feature: "name_check", p_outcome: "timeout", p_limit: 50 },
    ),
  );
  expect(filtered.error).toBeNull();
  if (!filtered.data) throw new Error("ACR-E1 missing filtered page");
  for (const row of filtered.data.rows) {
    expect(row.feature).toBe("name_check");
    expect(row.outcome).toBe("timeout");
    await expect(surface.getByTestId(rowId(row.id))).toBeVisible();
  }
  if (filtered.data.rows.length === 0)
    await expect(section.getByTestId("data-table-empty")).toBeVisible();
  await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
});
