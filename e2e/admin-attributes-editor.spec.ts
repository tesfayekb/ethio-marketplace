import { expect, test } from "./fixtures";
import { gotoReady, stepUpIfPrompted, switchUser } from "./helpers/ui";
import { adminClient, leaseUser } from "./helpers/users";
import { stripScratchRows } from "./helpers/exports";
import {
  rand,
  bandOnly,
  destroyCategory,
  dialogDump,
  action,
  signInAsSuperAdmin,
} from "./helpers/categories";
import {
  isCardTwin,
  librarySurface,
  openAttributeMenu,
  optionGroup,
  optionRow,
  addOptionRow,
  readAttribute,
  readLinks,
  destroyAttribute,
} from "./helpers/admin-attributes";

/**
 * C3-UI — THE ATTRIBUTE LIBRARY and the per-category LINK MANAGER (AT-1..AT-6).
 *
 * J-laws: every fixture is scratch and namespaced by `rand()`; every assertion
 * that matters reads DB TRUTH through the service client; nothing touches the
 * ratified 205-definition library except by reading it.
 */

test.describe("C3 attributes console", () => {
  /* --------------------------- IE-2: the import --------------------------- */

  /**
   * The import doors are asserted through the ROUTE with the page's bearer
   * (the same door the dialog posts to), and every verdict is confirmed
   * against DB TRUTH via the service client (J4). The UI half — the control's
   * visibility — is asserted in AT-23.
   */
  /**
   * DEC-050 L2b — the nine v2 cells sit between `depends_on` and the two
   * read-only cells. The header carries them, and `v2()` splices nine empty
   * cells into a hand-authored row at the same index, so every row below reads
   * exactly as it did before and no assertion is weakened.
   */
  const V2_CELLS = [
    "unit",
    "min",
    "max",
    "decimals",
    "format",
    "preset",
    "max_length",
    "help_text_en",
    "help_text_am",
  ] as const;
  const DEF_HEADER =
    `attribute_key,label_en,label_am,type,options,depends_on,${V2_CELLS.join(",")},` +
    "is_per_variant,direct_link_count";
  /** Splices the nine empty v2 cells after `depends_on`, quotes respected. */
  function v2(row: string): string {
    const cells: string[] = [];
    let current = "";
    let quoted = false;
    for (const ch of row) {
      if (quoted) {
        current += ch;
        if (ch === '"') quoted = false;
        continue;
      }
      if (ch === '"') {
        quoted = true;
        current += ch;
        continue;
      }
      if (ch === ",") {
        cells.push(current);
        current = "";
        continue;
      }
      current += ch;
    }
    cells.push(current);
    cells.splice(6, 0, ...V2_CELLS.map(() => ""));
    return cells.join(",");
  }
  const LINK_HEADER =
    "category_path,category_slug,attribute_key,is_required,is_filterable,card_rank,origin";

  async function bearerOf(page: import("@playwright/test").Page): Promise<string> {
    const token = await page.evaluate(async () => {
      const client = (
        window as unknown as {
          __ethioSupabase: {
            auth: {
              getSession: () => Promise<{ data: { session: { access_token: string } | null } }>;
            };
          };
        }
      ).__ethioSupabase;
      const { data } = await client.auth.getSession();
      return data.session?.access_token ?? "";
    });
    expect(token, "IE-2 the page carries no bearer").not.toBe("");
    return token;
  }

  async function importPost(
    page: import("@playwright/test").Page,
    token: string,
    body: Record<string, unknown>,
  ) {
    const response = await page.request.post("/api/admin/attributes/import", {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: body,
    });
    let payload: Record<string, unknown> = {};
    try {
      payload = (await response.json()) as Record<string, unknown>;
    } catch {
      payload = {};
    }
    return { status: response.status(), payload };
  }

  /**
   * A concurrent spec may create or destroy its own scratch fixtures between the
   * export and the preview, which would read as a phantom add. AT-20 asserts the
   * invariant over the STABLE library only — the strip itself is the ONE harness
   * helper (`stripScratchRows`, e2e/helpers/exports.ts, R-TR34/G28): EVERY record
   * naming ANY `e2e_`/`e2e-` fixture is dropped, so a worker mutating its own
   * fold set between the export and the preview never reads as a phantom change.
   */

  /** RFC 4180 cell for a hand-authored fixture file. */
  function cell(value: string): string {
    return /["\n\r,]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }

  async function attachCsv(
    page: import("@playwright/test").Page,
    testid: string,
    name: string,
    text: string,
  ) {
    await page.getByTestId(testid).setInputFiles({
      name,
      mimeType: "text/csv",
      buffer: Buffer.from(text, "utf8"),
    });
  }

  /** The six numbers the counts line renders, in template order. */
  function countsOf(text: string): number[] {
    return (text.match(/\d+/g) ?? []).map((digits) => Number(digits));
  }

  /**
   * DEC-045a — the DIRECT DOOR. The dependency laws are the SERVER's (F3), so
   * the refusal proofs address the RPC itself with the operator's own bearer,
   * never through a UI that could be hiding the control for other reasons.
   */
  async function rpcAs(token: string, name: string, args: Record<string, unknown>) {
    const base = (process.env["E2E_SUPABASE_URL"] ?? "").replace(/\/+$/, "");
    const key = process.env["E2E_SUPABASE_PUBLISHABLE_KEY"] ?? "";
    if (base === "" || key === "") throw new Error("[AT-33] E2E supabase env is not set");
    const response = await fetch(`${base}/rest/v1/rpc/${name}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    const body = (await response.json().catch(() => null)) as Record<string, unknown> | null;
    return {
      error: response.ok ? null : ((body?.["message"] as string | undefined) ?? "unknown"),
      data: response.ok ? body : null,
    };
  }

  /* --------------------- DEC-045a: dependent options ---------------------- */

  /**
   * AT-31 — THE CASCADE, AUTHORED AND PREVIEWED. A dependent definition's
   * options live under the parent's values: choosing make A shows only A's
   * models, switching to B switches the list, clearing the make empties it.
   */
  test("AT-31 a dependent definition cascades in the editor", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    try {
      await supabase.from("attributes").insert({
        attr_key: makeKey,
        name_en: makeKey,
        attr_type: "single_select",
        options: ["alfa", "beta"],
      });

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-create-open").click();
      await expect(page.getByTestId("attribute-edit-dialog")).toBeVisible();
      await page.getByTestId("attribute-key").fill(modelKey);
      await page.getByTestId("attribute-name").fill(modelKey);
      await page.getByTestId("attribute-type").selectOption("single_select");
      await page.getByTestId("attribute-depends-on").selectOption(makeKey);

      // ONE GROUP OF ROWS PER PARENT VALUE.
      await addOptionRow(page, "alfa", "alfa-1");
      await addOptionRow(page, "alfa", "alfa-2");
      await addOptionRow(page, "beta", "beta-1");

      // THE CASCADE: empty until a parent value is chosen.
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("alfa");
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toBeVisible();
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("beta");
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toBeVisible();
      await expect(page.getByTestId("attribute-cascade-option-alfa-1")).toHaveCount(0);
      await page.getByTestId("attribute-cascade-parent").selectOption("");
      await expect(page.getByTestId("attribute-cascade-option-beta-1")).toHaveCount(0);

      await page.getByTestId("attribute-edit-submit").click();
      await expect(page.getByTestId("attribute-edit-dialog")).toHaveCount(0, { timeout: 30000 });

      // DB TRUTH: every option carries the parent value it was authored under.
      const { data } = await supabase
        .from("attributes")
        .select("options, depends_on")
        .eq("attr_key", modelKey)
        .single();
      expect(data, "AT-31 the dependent definition was not created").toBeTruthy();
      expect(data!.depends_on, "AT-31 the dependency was not stored").toBeTruthy();
      const parents = (data!.options as { value: string; parent: string }[]).map(
        (option) => `${option.parent}/${option.value}`,
      );
      expect(parents.sort()).toEqual(["alfa/alfa-1", "alfa/alfa-2", "beta/beta-1"]);
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
    }
  });

  /**
   * AT-33 — THE REFUSALS, SERVER-SIDE. A parent value outside the parent's
   * list, a cycle, a dependency on a text definition and a delete of a parent
   * that has dependents are all refused, the last one NAMING its dependents.
   */
  test("AT-33 the dependency doors refuse and name what they judged", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    const textKey = `e2e_attr_${rand()}`;
    try {
      const { data: make } = await supabase
        .from("attributes")
        .insert({
          attr_key: makeKey,
          name_en: makeKey,
          attr_type: "single_select",
          options: ["alfa"],
        })
        .select("id")
        .single();
      const { data: text } = await supabase
        .from("attributes")
        .insert({ attr_key: textKey, name_en: textKey, attr_type: "text" })
        .select("id")
        .single();

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);
      const call = (name: string, args: Record<string, unknown>) => rpcAs(token, name, args);

      // A parent value that is not one of the parent's values.
      const strayParent = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "ghost", parent: "gamma" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(strayParent.error, "AT-33 a stray parent value was accepted").toContain(
        "parentNotInParent",
      );

      // A dependency on a TEXT definition.
      const notSelect = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "x", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: textKey,
      });
      expect(notSelect.error, "AT-33 a text parent was accepted").toContain("dependsNotSelect");

      // The legal write, then the CYCLE it makes possible.
      const ok = await call("admin_upsert_attribute", {
        p_id: null,
        p_attr_key: modelKey,
        p_name_en: modelKey,
        p_attr_type: "single_select",
        p_options: [{ value: "alfa-1", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(ok.error, `AT-33 the legal dependent write failed: ${ok.error}`).toBeNull();

      const cycle = await call("admin_upsert_attribute", {
        p_id: make!.id,
        p_attr_key: makeKey,
        p_name_en: makeKey,
        p_attr_type: "single_select",
        p_options: [{ value: "alfa", parent: "alfa-1" }],
        p_help_text_en: null,
        p_depends_on: modelKey,
      });
      expect(cycle.error, "AT-33 a dependency cycle was accepted").toContain("dependsCycle");

      // DELETING THE PARENT is refused, and the refusal NAMES the dependent.
      const blocked = await call("admin_delete_attribute", {
        p_id: make!.id,
        p_confirm_key: makeKey,
      });
      expect(blocked.error, "AT-33 a parent with dependents was deleted").toContain(
        "HasDependents",
      );
      expect(blocked.error, "AT-33 the refusal did not name the dependent").toContain(modelKey);

      // Nothing was written by any refused attempt (F5: a refusal leaves no trace).
      const { data: survivor } = await supabase
        .from("attributes")
        .select("id")
        .eq("attr_key", makeKey)
        .maybeSingle();
      expect(survivor, "AT-33 the refused delete still applied").toBeTruthy();
      expect(text, "AT-33 fixture missing").toBeTruthy();
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
      await destroyAttribute(textKey);
    }
  });

  /** AT-34 — no `categories:update`: no dependency control, and the RPC refuses. */
  test("AT-34 a categories:view-only operator cannot set a dependency", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const supabase = adminClient();
    const roleName = `e2e_viewonly_${rand()}`;
    const makeKey = `e2e_attr_${rand()}`;
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .insert({ name: roleName, display_name: roleName, priority: 1 })
      .select("id")
      .single();
    if (roleError || !role) throw new Error(`AT-34 scratch role failed: ${roleError?.message}`);
    try {
      await supabase.from("attributes").insert({
        attr_key: makeKey,
        name_en: makeKey,
        attr_type: "single_select",
        options: ["alfa"],
      });
      const { data: perms } = await supabase
        .from("permissions")
        .select("id, action, resources!inner(name)")
        .in("resources.name", ["admin_panel", "categories"]);
      const wanted = (perms ?? []).filter((p) => {
        const resource = (p as unknown as { resources: { name: string } }).resources.name;
        return (
          (resource === "admin_panel" && p.action === "access") ||
          (resource === "categories" && p.action === "view")
        );
      });
      expect(wanted, "AT-34 expected exactly admin_panel:access + categories:view").toHaveLength(2);
      await supabase
        .from("role_permissions")
        .insert(wanted.map((p) => ({ role_id: role.id, permission_id: p.id })));

      const viewer = await leaseUser();
      await supabase
        .from("user_roles")
        .insert({ user_id: viewer.id, role_id: role.id, scope_type: "global" });
      await switchUser(page, viewer.email, viewer.password);
      await gotoReady(page, "/admin/attributes");
      await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      // The editor is unreachable, so the control cannot be on the page.
      await expect(page.getByTestId("attribute-depends-on")).toHaveCount(0);

      // THE SERVER IS THE AUTHORITY (F3): the RPC refuses regardless.
      const denied = await rpcAs(await bearerOf(page), "admin_upsert_attribute", {
        p_id: null,
        p_attr_key: `e2e_attr_denied_${rand()}`,
        p_name_en: "denied",
        p_attr_type: "single_select",
        p_options: [{ value: "x", parent: "alfa" }],
        p_help_text_en: null,
        p_depends_on: makeKey,
      });
      expect(denied.error, "AT-34 a view-only operator wrote a dependency").toBeTruthy();
    } finally {
      await destroyAttribute(makeKey);
      await supabase.from("role_permissions").delete().eq("role_id", role.id);
      await supabase.from("user_roles").delete().eq("role_id", role.id);
      await supabase.from("roles").delete().eq("id", role.id);
    }
  });

  /**
   * AT-32 (DEC-045b) — THE DEPENDENCY TRAVELS IN THE FILE. One definitions
   * file creates a parent and a dependent child in a single pass — the child
   * written FIRST, so the plan's parent-before-dependent ordering is what makes
   * the commit possible. Re-previewing the same file is a no-op (the IE-2b
   * round-trip invariant), and Undo removes both.
   */
  test("AT-32 an import creates a parent and its dependent in one pass", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    await gotoReady(page, "/admin/attributes");
    const token = await bearerOf(page);

    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    try {
      const definitions =
        `${DEF_HEADER}\r\n` +
        // The DEPENDENT row comes first on purpose.
        `${v2(`${modelKey},${modelKey},,single_select,${cell('{"value": "corolla", "parent": "toyota"}')},${makeKey},,0`)}\r\n` +
        `${v2(`${makeKey},${makeKey},,single_select,toyota|byd,,,0`)}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      const counts = preview.payload["counts"] as Record<string, number>;
      expect(counts.adds, JSON.stringify(counts)).toBe(2);
      expect(counts.refusals, JSON.stringify(preview.payload["refusals"])).toBe(0);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;

      // DB TRUTH: the dependency edge resolved to the parent that came AFTER
      // it in the file, and the option kept the parent value it was authored
      // under.
      const parent = await readAttribute(makeKey);
      const child = await readAttribute(modelKey);
      expect(parent, "AT-32 the parent was not created").toBeTruthy();
      expect(child, "AT-32 the dependent was not created").toBeTruthy();
      expect(child!.depends_on, "AT-32 the dependency edge is wrong").toBe(parent!.id);
      expect(child!.options).toEqual([{ value: "corolla", parent: "toyota" }]);

      // THE INVARIANT: the very same file now changes nothing.
      const again = await importPost(page, token, { mode: "preview", definitions });
      expect(again.status, JSON.stringify(again.payload)).toBe(200);
      const round = again.payload["counts"] as Record<string, number>;
      expect(round.adds, JSON.stringify(round)).toBe(0);
      expect(round.changes, JSON.stringify(round)).toBe(0);
      expect(round.refusals, JSON.stringify(round)).toBe(0);
      expect(round.unchanged, JSON.stringify(round)).toBe(2);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      expect(await readAttribute(modelKey), "AT-32 undo left the dependent").toBeFalsy();
      expect(await readAttribute(makeKey), "AT-32 undo left the parent").toBeFalsy();
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
    }
  });

  /**
   * AT-35 (DEC-045b PART B) — OPTIONS READ AS LABELS, NEVER AS OBJECTS. A plain
   * select lists its labels; a dependent one groups them under the parent value
   * they hang from. `gotoReady` additionally fails the whole page on a
   * "[object Object]" leak (PART D), so this test proves both halves.
   */
  test("AT-35 the options expansion reads as labels", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const makeKey = `e2e_attr_${rand()}`;
    const modelKey = `e2e_attr_${rand()}`;
    try {
      const { data: make } = await supabase
        .from("attributes")
        .insert({
          attr_key: makeKey,
          name_en: makeKey,
          attr_type: "single_select",
          options: [
            { value: "toyota", label_en: "Toyota" },
            { value: "byd", label_en: "BYD" },
          ],
        })
        .select("id")
        .single();
      await supabase.from("attributes").insert({
        attr_key: modelKey,
        name_en: modelKey,
        attr_type: "single_select",
        depends_on: make!.id,
        options: [
          { value: "corolla", label_en: "Corolla", parent: "toyota" },
          { value: "vitz", label_en: "Vitz", parent: "toyota" },
          { value: "seagull", label_en: "Seagull", parent: "byd" },
        ],
      });

      await gotoReady(page, "/admin/attributes");

      await page.getByTestId("attribute-search").fill(makeKey);
      // J5 — the expansion exists in BOTH twins; assert the VISIBLE one.
      await expect(
        librarySurface(page).getByTestId(`attribute-optionlist-${makeKey}`),
      ).toContainText("Toyota · BYD", { timeout: 20000 });

      await page.getByTestId("attribute-search").fill(modelKey);
      const dependent = librarySurface(page).getByTestId(`attribute-optionlist-${modelKey}`);
      await expect(dependent).toContainText("toyota: Corolla · Vitz", { timeout: 20000 });
      await expect(dependent).toContainText("byd: Seagull");
      await expect(dependent).not.toContainText("[object Object]");
    } finally {
      await destroyAttribute(modelKey);
      await destroyAttribute(makeKey);
    }
  });

  /**
   * AT-47 (DEC-050 L3a) — THE EDITOR SETS THE v2 CELLS. The group belongs to the
   * type: a number definition carries unit/min/max/decimals/format, a text one
   * a preset token and a max length. DB truth through the service client (J4).
   */
  async function readV2(key: string) {
    const { data } = await adminClient()
      .from("attributes")
      .select(
        "attr_type, unit, min_bound, max_bound, decimals, format, preset, max_length, help_text_am",
      )
      .eq("attr_key", key)
      .maybeSingle();
    return data;
  }

  test("AT-47 the editor shows the Number group for a number definition and the Text group for a text one, and saves the v2 cells", async ({
    page,
  }) => {
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    const helpAm = "የእገዛ ጽሑፍ";
    try {
      await gotoReady(page, "/admin/attributes");

      await test.step("AT-47 create a number definition", async () => {
        await page.getByTestId("attribute-create-open").click();
        await expect(
          page.getByTestId("attribute-edit-dialog"),
          await dialogDump(page, "AT-47 editor never opened"),
        ).toBeVisible({ timeout: 20000 });
        await page.getByTestId("attribute-key").fill(key);
        await page.getByTestId("attribute-name").fill(key);
        await page.getByTestId("attribute-type").selectOption("number");
        await expect(page.getByTestId("attribute-number-group")).toBeVisible();
        await expect(page.getByTestId("attribute-text-group")).toHaveCount(0);
        await page.getByTestId("attribute-unit").fill("GB");
        await page.getByTestId("attribute-min").fill("1");
        await page.getByTestId("attribute-max").fill("year+1");
        await page.getByTestId("attribute-format").selectOption("year");
        // A year format pins the decimals control at 0 and disables it (L1).
        await expect(page.getByTestId("attribute-decimals")).toBeDisabled();
        await expect(page.getByTestId("attribute-decimals")).toHaveValue("0");
        await page.getByTestId("attribute-help-am").fill(helpAm);
        await page.getByTestId("attribute-edit-submit").click();
        await stepUpIfPrompted(page, secret);
      });

      await expect
        .poll(async () => (await readV2(key))?.unit, {
          timeout: 20000,
          message: await dialogDump(page, "AT-47 the number cells never landed"),
        })
        .toBe("GB");
      const number = await readV2(key);
      expect(number, `AT-47 row missing: ${JSON.stringify(number)}`).toBeTruthy();
      expect(number!.min_bound).toBe("1");
      expect(number!.max_bound).toBe("year+1");
      expect(Number(number!.decimals)).toBe(0);
      expect(number!.format).toBe("year");
      expect(number!.help_text_am).toBe(helpAm);

      await test.step("AT-47 reopen pre-filled, then switch to text", async () => {
        await page.getByTestId("attribute-search").fill(key);
        await (await openAttributeMenu(page, key)).getByTestId(`attribute-edit-${key}`).click();
        await expect(page.getByTestId("attribute-unit")).toHaveValue("GB", { timeout: 20000 });
        await expect(page.getByTestId("attribute-min")).toHaveValue("1");
        await expect(page.getByTestId("attribute-max")).toHaveValue("year+1");
        await expect(page.getByTestId("attribute-format")).toHaveValue("year");
        await expect(page.getByTestId("attribute-help-am")).toHaveValue(helpAm);

        await page.getByTestId("attribute-type").selectOption("text");
        await expect(page.getByTestId("attribute-number-group")).toHaveCount(0);
        await expect(page.getByTestId("attribute-text-group")).toBeVisible();
        await page.getByTestId("attribute-preset").selectOption("digits");
        await page.getByTestId("attribute-preset-n").fill("15");
        await page.getByTestId("attribute-max-length").fill("15");
        await page.getByTestId("attribute-edit-submit").click();
        await stepUpIfPrompted(page, secret);
      });

      await expect
        .poll(async () => (await readV2(key))?.preset, {
          timeout: 20000,
          message: await dialogDump(page, "AT-47 the preset never landed"),
        })
        .toBe("digits:15");
      const asText = await readV2(key);
      expect(Number(asText!.max_length)).toBe(15);
      expect(asText!.attr_type).toBe("text");
      // The number group's values left with the type (they are the door's to refuse).
      expect(asText!.unit).toBeNull();
      expect(asText!.format).toBeNull();
      expect(asText!.help_text_am).toBe(helpAm);
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-48 (DEC-050 L3a) — THE COVERAGE COLUMN. `detail` tier, so it lives in the
   * table twin alone (the card twin drops detail columns by contract): this
   * block asserts the desktop band.
   */
  test("AT-48 the library's coverage column reads n/N for a select definition", async ({
    page,
  }) => {
    bandOnly(page, "desktop");
    await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    try {
      const { error } = await adminClient()
        .from("attributes")
        .insert({
          attr_key: key,
          name_en: key,
          attr_type: "single_select",
          options: [
            { value: "alpha", label_en: "Alpha", label_am: "አልፋ" },
            { value: "beta", label_en: "Beta" },
          ],
        });
      if (error) throw new Error(`AT-48 seed failed: ${error.message}`);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      const cell = librarySurface(page).getByTestId(`attribute-coverage-${key}`);
      await expect(cell, await dialogDump(page, "AT-48 coverage never rendered")).toHaveText(
        "1/2",
        {
          timeout: 20000,
        },
      );
      await expect(cell).toHaveAttribute("data-incomplete", "true");
      await expect(cell).toHaveClass(/amber/);

      const { error: patchError } = await adminClient()
        .from("attributes")
        .update({
          options: [
            { value: "alpha", label_en: "Alpha", label_am: "አልፋ" },
            { value: "beta", label_en: "Beta", label_am: "ቤታ" },
          ],
        })
        .eq("attr_key", key);
      if (patchError) throw new Error(`AT-48 patch failed: ${patchError.message}`);

      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-search").fill(key);
      const healed = librarySurface(page).getByTestId(`attribute-coverage-${key}`);
      await expect(healed, await dialogDump(page, "AT-48 coverage never healed")).toHaveText(
        "2/2",
        {
          timeout: 20000,
        },
      );
      await expect(healed).not.toHaveAttribute("data-incomplete", "true");
    } finally {
      await destroyAttribute(key);
    }
  });

  /* ------------------ DEC-050 L3b — the option row editor ------------------ */

  /** The stored records a scratch select definition is seeded with. */
  const SEEDED_OPTIONS = [
    { value: "alpha", label_en: "Alpha", label_am: "አልፋ", parent: "", aliases: ["a-one"] },
    { value: "beta", label_en: "Beta", label_am: "ቤታ", parent: "", active: false },
  ];

  async function openDefinitionEditor(
    page: import("@playwright/test").Page,
    key: string,
    label: string,
  ) {
    await gotoReady(page, "/admin/attributes");
    await page.getByTestId("attribute-search").fill(key);
    await (await openAttributeMenu(page, key)).getByTestId(`attribute-edit-${key}`).click();
    await expect(
      page.getByTestId("attribute-edit-dialog"),
      await dialogDump(page, `${label} editor never opened`),
    ).toBeVisible({ timeout: 20000 });
  }

  /**
   * AT-49 (INC-188) — A SAVE WITHOUT EDITS CHANGES NOTHING. The old textarea
   * recomposed options from values alone, so every console save erased labels,
   * aliases and the `active` flag. The row editor sends the stored records back.
   */
  test("AT-49 saving a select definition without edits preserves every stored option field", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    try {
      const { error } = await adminClient().from("attributes").insert({
        attr_key: key,
        name_en: key,
        attr_type: "single_select",
        options: SEEDED_OPTIONS,
      });
      if (error) throw new Error(`AT-49 seed failed: ${error.message}`);

      await openDefinitionEditor(page, key, "AT-49");
      await expect(optionRow(page, "", "alpha").getByTestId("option-label-en")).toHaveValue(
        "Alpha",
      );
      await expect(optionRow(page, "", "beta").getByTestId("option-inactive-tag")).toBeVisible();

      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-49 the save never landed"),
      ).toHaveCount(0, { timeout: 30000 });

      expect(
        (await readAttribute(key))?.options,
        "AT-49 a no-edit save changed the options",
      ).toEqual(SEEDED_OPTIONS);
      /**
       * The Amharic coverage meter is unchanged: both labels survived. It is a
       * `detail` column, so it lives in the table twin alone.
       */
      if (!isCardTwin(page)) {
        await gotoReady(page, "/admin/attributes");
        await page.getByTestId("attribute-search").fill(key);
        await expect(librarySurface(page).getByTestId(`attribute-coverage-${key}`)).toHaveText(
          "2/2",
          { timeout: 20000 },
        );
      }
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-50 — EDITS LAND AS RECORDS. A label, an alias and a deactivation are
   * stored per option, and a stored option is switched off, never removed.
   */
  test("AT-50 per-option labels, aliases and the inactive switch land and read back", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const key = `e2e_attr_${rand()}`;
    try {
      const { error } = await adminClient().from("attributes").insert({
        attr_key: key,
        name_en: key,
        attr_type: "single_select",
        options: SEEDED_OPTIONS,
      });
      if (error) throw new Error(`AT-50 seed failed: ${error.message}`);

      await openDefinitionEditor(page, key, "AT-50");
      const alpha = optionRow(page, "", "alpha");
      await alpha.getByTestId("option-label-am").fill("አልፋ ሁለት");
      await alpha.getByTestId("option-alias-1").fill("a-two");
      await alpha.getByTestId("option-active").click();
      await addOptionRow(page, "", "gamma", { en: "Gamma", am: "ጋማ" });
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-50 the save never landed"),
      ).toHaveCount(0, { timeout: 30000 });

      await expect
        .poll(async () => (await readAttribute(key))?.options, { timeout: 20000 })
        .toEqual([
          {
            value: "alpha",
            label_en: "Alpha",
            label_am: "አልፋ ሁለት",
            parent: "",
            active: false,
            aliases: ["a-one", "a-two"],
          },
          { value: "beta", label_en: "Beta", label_am: "ቤታ", parent: "", active: false },
          { value: "gamma", label_en: "Gamma", label_am: "ጋማ", parent: "" },
        ]);

      /* The deactivation READS as a tag when the definition is reopened. */
      await openDefinitionEditor(page, key, "AT-50 reopen");
      await expect(optionRow(page, "", "alpha").getByTestId("option-inactive-tag")).toBeVisible();
      await expect(optionRow(page, "", "gamma").getByTestId("option-inactive-tag")).toHaveCount(0);
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-51 — THE PICKER OFFERS CO-LINKED TARGETS ONLY (C3-UX-9). A bound may
   * target a number linked in ONE of the owner's categories (DEC-057b), so that
   * one is on offer and saves; a number linked in none of them is withheld, so
   * the refusal can no longer be reached by hand. The DOOR still judges every
   * save (F3) — IG-2 proves `boundsTargetNotColinked` through the import route.
   */
  test("AT-51 the bounds picker offers a co-linked number and withholds one linked nowhere", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const selectKey = `e2e_attr_${rand()}`;
    const sharedNumberKey = `e2e_attr_${rand()}`;
    const loneNumberKey = `e2e_attr_${rand()}`;
    const slugA = `e2e-cat-${rand()}`;
    const slugB = `e2e-cat-${rand()}`;
    const categoryIds: string[] = [];
    try {
      const { data: seeded, error } = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: selectKey,
            name_en: selectKey,
            attr_type: "single_select",
            options: [{ value: "alpha", label_en: "Alpha", label_am: "", parent: "" }],
          },
          { attr_key: sharedNumberKey, name_en: sharedNumberKey, attr_type: "number" },
          { attr_key: loneNumberKey, name_en: loneNumberKey, attr_type: "number" },
        ])
        .select("id, attr_key");
      if (error || !seeded) throw new Error(`AT-51 seed failed: ${error?.message}`);
      const select = seeded.find((row) => row.attr_key === selectKey);
      const sharedNumber = seeded.find((row) => row.attr_key === sharedNumberKey);
      if (!select || !sharedNumber) throw new Error("AT-51 seeded attributes missing");

      const { data: categories, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: slugA, name_en: slugA, is_active: true, allow_listings: true },
          { slug: slugB, name_en: slugB, is_active: true, allow_listings: true },
        ])
        .select("id, slug");
      if (catError || !categories) throw new Error(`AT-51 category failed: ${catError?.message}`);
      categoryIds.push(...categories.map((row) => row.id));
      const categoryA = categories.find((row) => row.slug === slugA);
      if (!categoryA) throw new Error("AT-51 category A missing");
      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        ...categories.map((category) => ({
          category_id: category.id,
          attribute_id: select.id,
          display_order: 0,
        })),
        { category_id: categoryA.id, attribute_id: sharedNumber.id, display_order: 1 },
      ]);
      if (linkError) throw new Error(`AT-51 link failed: ${linkError.message}`);

      // Linked in one of the owner's two categories: accepted.
      await openDefinitionEditor(page, selectKey, "AT-51");
      const alpha = optionRow(page, "", "alpha");
      await alpha.getByTestId("option-bounds-add").selectOption(sharedNumberKey);
      await alpha.getByTestId(`option-bounds-min-${sharedNumberKey}`).fill("2010");
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-edit-dialog")).toHaveCount(0, { timeout: 30000 });
      await expect
        .poll(async () => (await readAttribute(selectKey))?.options, { timeout: 20000 })
        .toEqual([
          {
            value: "alpha",
            label_en: "Alpha",
            label_am: "",
            parent: "",
            bounds: { [sharedNumberKey]: { min: "2010" } },
          },
        ]);

      // Linked in NONE of the owner's categories: never on offer.
      await openDefinitionEditor(page, selectKey, "AT-51 withheld");
      const refusing = optionRow(page, "", "alpha");
      await expect(refusing, await dialogDump(page, "AT-51 the row never rendered")).toBeVisible({
        timeout: 30000,
      });
      /* Withheld means UNREACHABLE: no picker offers it, so no option names it. */
      await expect(
        refusing.locator(`option[value="${loneNumberKey}"]`),
        "AT-51 a target linked nowhere is still on offer",
      ).toHaveCount(0);
      await expect(
        refusing.getByTestId(`option-bounds-target-${sharedNumberKey}`),
        "AT-51 the co-linked bound never read back",
      ).toBeVisible();
      /* Nothing was chosen, so nothing changed. */
      expect((await readAttribute(selectKey))?.options).toEqual([
        {
          value: "alpha",
          label_en: "Alpha",
          label_am: "",
          parent: "",
          bounds: { [sharedNumberKey]: { min: "2010" } },
        },
      ]);
    } finally {
      if (categoryIds.length > 0) {
        await supabase.from("category_attribute_links").delete().in("category_id", categoryIds);
        await destroyCategory(slugA);
        await destroyCategory(slugB);
      }
      await destroyAttribute(selectKey);
      await destroyAttribute(sharedNumberKey);
      await destroyAttribute(loneNumberKey);
    }
  });

  /* ------------- DEC-057 — option-conditioned allowed values ------------- */

  /**
   * AT-52 (DEC-057 L2) — ONE FILE CREATES THE OWNER AND ITS TARGET. The planner
   * resolves an `allowed` target through the PLAN (L2-mig), so a file may add a
   * select target and an owner whose option points at it in the same import:
   * the preview plans two adds with no refusal, the commit stores `allowed`
   * exactly, the export echoes it, re-importing the export is a no-op, the undo
   * removes both, and a value the target does not offer is refused BY NAME.
   */
  test("AT-52 allowed values round-trip: a file creates an owner and its target together, the import accepts, the export echoes, undo removes", async ({
    page,
  }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const targetKey = `e2e_attr_${rand()}`;
    const ownerKey = `e2e_attr_${rand()}`;
    const slug = `e2e-cat-${rand()}`;
    /** Doubles the quotes so the JSON survives the CSV cell (RFC 4180). */
    const optionsCell = (json: string) => `"${json.split('"').join('""')}"`;
    try {
      const { data: category, error: catError } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
        .select("id")
        .single();
      if (catError || !category) throw new Error(`AT-52 category failed: ${catError?.message}`);

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      const targetOptions = optionsCell(
        JSON.stringify([{ value: "x" }, { value: "y" }, { value: "z" }]),
      );
      const ownerOptions = optionsCell(
        JSON.stringify([{ value: "a", allowed: { [targetKey]: ["x", "y"] } }, { value: "b" }]),
      );
      const definitions =
        `${DEF_HEADER}\r\n` +
        `${v2(`${targetKey},${targetKey},,single_select,${targetOptions},,,0`)}\r\n` +
        `${v2(`${ownerKey},${ownerKey},,single_select,${ownerOptions},,,0`)}\r\n`;
      const links =
        `${LINK_HEADER}\r\n` +
        `${slug},${slug},${targetKey},false,false,,${slug}\r\n` +
        `${slug},${slug},${ownerKey},false,false,,${slug}\r\n`;

      const preview = await importPost(page, token, { mode: "preview", definitions, links });
      expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
      expect(
        (preview.payload["refusals"] as unknown[]) ?? [],
        `AT-52 the same-file owner and target were refused: ${JSON.stringify(preview.payload)}`,
      ).toHaveLength(0);
      expect(
        (preview.payload["counts"] as Record<string, number>).adds,
        `AT-52 the plan carries no adds: ${JSON.stringify(preview.payload)}`,
      ).toBeGreaterThanOrEqual(2);

      const commit = await importPost(page, token, {
        mode: "commit",
        definitions,
        links,
        digest: preview.payload["digest"],
      });
      expect(commit.status, JSON.stringify(commit.payload)).toBe(200);
      const batchId = commit.payload["batch_id"] as string;
      expect(batchId).toBeTruthy();

      // DB TRUTH (J4) — the owner's option carries `allowed` exactly.
      await expect
        .poll(async () => (await readAttribute(ownerKey))?.options, { timeout: 20000 })
        .toEqual([{ value: "a", allowed: { [targetKey]: ["x", "y"] } }, { value: "b" }]);

      // THE EXPORT ECHOES IT, and re-importing what it wrote changes nothing.
      const exported = await page.request.get("/api/admin/attributes/export?file=definitions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(exported.status()).toBe(200);
      const text = await exported.text();
      const records = (text.charCodeAt(0) === 0xfeff ? text.slice(1) : text).split("\r\n");
      const header = records[0] ?? "";
      const mine = records.find((record) => record.startsWith(`${ownerKey},`));
      const theirs = records.find((record) => record.startsWith(`${targetKey},`));
      expect(mine, "AT-52 the export carries no row for the owner").toBeTruthy();
      expect(mine!, "AT-52 the export lost the allowed map").toContain(targetKey);
      expect(mine!, "AT-52 the export lost the allowed values").toContain("allowed");

      const echo = await importPost(page, token, {
        mode: "preview",
        definitions: `\uFEFF${header}\r\n${mine}\r\n${theirs}\r\n`,
      });
      expect(echo.status, JSON.stringify(echo.payload)).toBe(200);
      const echoCounts = echo.payload["counts"] as Record<string, number>;
      expect(
        { changes: echoCounts.changes, adds: echoCounts.adds, refusals: echoCounts.refusals },
        `AT-52 the export did not round-trip: ${JSON.stringify(echo.payload)}`,
      ).toEqual({ changes: 0, adds: 0, refusals: 0 });
      expect(echoCounts.unchanged).toBe(2);

      // A VALUE THE TARGET DOES NOT OFFER is refused, naming target and value.
      const hostile =
        `${DEF_HEADER}\r\n` +
        `${v2(
          `${ownerKey},${ownerKey},,single_select,${optionsCell(
            JSON.stringify([{ value: "a", allowed: { [targetKey]: ["q"] } }, { value: "b" }]),
          )},,,1`,
        )}\r\n`;
      const refused = await importPost(page, token, { mode: "preview", definitions: hostile });
      expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
      const refusals = (refused.payload["refusals"] as Record<string, unknown>[]) ?? [];
      const named = refusals.find((entry) => entry["reason"] === "allowedUnknownValue");
      expect(
        named,
        `AT-52 no allowedUnknownValue refusal: ${JSON.stringify(refused.payload)}`,
      ).toBeTruthy();
      expect(String(named!["detail"]), "AT-52 the refusal names no target").toContain(targetKey);
      expect(String(named!["detail"]), "AT-52 the refusal names no value").toContain("q");
      expect(Number(named!["row"]), "AT-52 the refusal names no row").toBeGreaterThan(1);
      // A refused preview leaves the stored map standing (F5).
      expect((await readAttribute(ownerKey))?.options).toEqual([
        { value: "a", allowed: { [targetKey]: ["x", "y"] } },
        { value: "b" },
      ]);

      const undo = await importPost(page, token, { mode: "undo", batchId });
      expect(undo.status, JSON.stringify(undo.payload)).toBe(200);
      await expect
        .poll(async () => (await readAttribute(ownerKey)) === null, { timeout: 20000 })
        .toBe(true);
      expect(await readAttribute(targetKey), "AT-52 the undo left the target behind").toBeNull();
    } finally {
      await destroyAttribute(ownerKey);
      await destroyAttribute(targetKey);
      await destroyCategory(slug);
    }
  });

  /**
   * AT-53 (DEC-057 L3) — THE PICKER LANDS THE MAP, THE DOOR NAMES THE REFUSAL.
   * An option's allowed values are ticked per target: the save stores the exact
   * map, reopening pre-fills the ticks, unticking narrows it, and a target that
   * is not co-linked is refused BY NAME with the stored options untouched (F5).
   */
  test("AT-53 the allowed-values picker stores the map, reads it back, and withholds a target linked nowhere", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const ownerKey = `e2e_attr_${rand()}`;
    const targetKey = `e2e_attr_${rand()}`;
    const loneKey = `e2e_attr_${rand()}`;
    const slugA = `e2e-cat-${rand()}`;
    const slugB = `e2e-cat-${rand()}`;
    const categoryIds: string[] = [];
    try {
      const { data: seeded, error } = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: ownerKey,
            name_en: ownerKey,
            attr_type: "single_select",
            options: [{ value: "a", label_en: "A", label_am: "", parent: "" }],
          },
          {
            attr_key: targetKey,
            name_en: targetKey,
            attr_type: "single_select",
            options: [
              { value: "x", label_en: "X", label_am: "ኤክስ", parent: "" },
              { value: "y", label_en: "Y", label_am: "", parent: "" },
              { value: "z", label_en: "Z", label_am: "", parent: "" },
            ],
          },
          {
            attr_key: loneKey,
            name_en: loneKey,
            attr_type: "single_select",
            options: [{ value: "p", label_en: "P", label_am: "", parent: "" }],
          },
        ])
        .select("id, attr_key");
      if (error || !seeded) throw new Error(`AT-53 seed failed: ${error?.message}`);

      const { data: categories, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: slugA, name_en: slugA, is_active: true, allow_listings: true },
          { slug: slugB, name_en: slugB, is_active: true, allow_listings: true },
        ])
        .select("id, slug");
      if (catError || !categories) throw new Error(`AT-53 category failed: ${catError?.message}`);
      categoryIds.push(...categories.map((row) => row.id));
      const categoryA = categories.find((row) => row.slug === slugA);
      const owner = seeded.find((row) => row.attr_key === ownerKey);
      const target = seeded.find((row) => row.attr_key === targetKey);
      if (!categoryA || !owner || !target) throw new Error("AT-53 seeded fixtures missing");
      /* Owner is in two categories; target shares only one; lone shares none. */
      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        ...categories.map((category) => ({
          category_id: category.id,
          attribute_id: owner.id,
          display_order: 0,
        })),
        { category_id: categoryA.id, attribute_id: target.id, display_order: 1 },
      ]);
      if (linkError) throw new Error(`AT-53 link failed: ${linkError.message}`);

      // THE PICKER TICKS TWO VALUES and the save stores the exact map.
      await openDefinitionEditor(page, ownerKey, "AT-53");
      const ownerRow = optionRow(page, "", "a");
      await ownerRow.getByTestId("option-allowed-add").selectOption(targetKey);
      await ownerRow.getByTestId(`option-allowed-value-${targetKey}-x`).click();
      await ownerRow.getByTestId(`option-allowed-value-${targetKey}-y`).click();
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-53 the save never landed"),
      ).toHaveCount(0, { timeout: 30000 });
      await expect
        .poll(async () => (await readAttribute(ownerKey))?.options, { timeout: 20000 })
        .toEqual([
          {
            value: "a",
            label_en: "A",
            label_am: "",
            parent: "",
            allowed: { [targetKey]: ["x", "y"] },
          },
        ]);

      // REOPENING PRE-FILLS THE TICKS; unticking one narrows the stored list.
      await openDefinitionEditor(page, ownerKey, "AT-53 reopen");
      const reopened = optionRow(page, "", "a");
      await expect(
        reopened.getByTestId(`option-allowed-value-${targetKey}-x`),
        await dialogDump(page, "AT-53 the tick never read back"),
      ).toBeChecked();
      await expect(reopened.getByTestId(`option-allowed-value-${targetKey}-y`)).toBeChecked();
      await expect(reopened.getByTestId(`option-allowed-value-${targetKey}-z`)).not.toBeChecked();
      await reopened.getByTestId(`option-allowed-value-${targetKey}-y`).click();
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(page.getByTestId("attribute-edit-dialog")).toHaveCount(0, { timeout: 30000 });
      await expect
        .poll(async () => (await readAttribute(ownerKey))?.options, { timeout: 20000 })
        .toEqual([
          { value: "a", label_en: "A", label_am: "", parent: "", allowed: { [targetKey]: ["x"] } },
        ]);

      /**
       * C3-UX-9 — A TARGET LINKED NOWHERE is never offered, so the refusal
       * cannot be reached by hand. The door still judges it: AT-52 proves the
       * `allowed*` vocabulary through the import route.
       */
      await openDefinitionEditor(page, ownerKey, "AT-53 withheld");
      const refusing = optionRow(page, "", "a");
      await expect(refusing, await dialogDump(page, "AT-53 the row never rendered")).toBeVisible({
        timeout: 30000,
      });
      /* Withheld means UNREACHABLE: no picker offers it, so no option names it. */
      await expect(
        refusing.locator(`option[value="${loneKey}"]`),
        "AT-53 a target linked nowhere is still on offer",
      ).toHaveCount(0);
      await expect(
        refusing.getByTestId(`option-allowed-target-${targetKey}`),
        "AT-53 the co-linked target never read back",
      ).toBeVisible();
      /* Nothing was chosen, so nothing changed. */
      expect((await readAttribute(ownerKey))?.options).toEqual([
        { value: "a", label_en: "A", label_am: "", parent: "", allowed: { [targetKey]: ["x"] } },
      ]);
    } finally {
      if (categoryIds.length > 0) {
        await supabase.from("category_attribute_links").delete().in("category_id", categoryIds);
        await destroyCategory(slugA);
        await destroyCategory(slugB);
      }
      await destroyAttribute(ownerKey);
      await destroyAttribute(targetKey);
      await destroyAttribute(loneKey);
    }
  });

  /**
   * AT-54 (C3-UX-8) — A DEFINITIONS-ONLY RUN REACHES A VERDICT. The links
   * picker is optional, so one file previews: the counts render and Discard
   * writes nothing (DB truth, J4).
   */
  test("AT-54 the import dialog previews a definitions-only run and discards it", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const key = `e2e_attr_${rand()}`;
    try {
      await gotoReady(page, "/admin/attributes");
      await page.getByTestId("attribute-import").click();
      await expect(page.getByTestId("attribute-import-dialog")).toBeVisible({ timeout: 20000 });

      await attachCsv(
        page,
        "attribute-import-definitions",
        "definitions.csv",
        `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,`)}\r\n`,
      );
      await expect(page.getByTestId("attribute-import-links-chosen")).toBeVisible();
      await expect(page.getByTestId("attribute-import-preview")).toBeEnabled();

      await page.getByTestId("attribute-import-preview").click();
      const counts = page.getByTestId("attribute-import-counts");
      await expect(counts).toBeVisible({ timeout: 120_000 });
      // One definition added, and nothing refused.
      const numbers = countsOf((await counts.textContent()) ?? "");
      expect(numbers[0], `AT-54 the plan carries no add: ${numbers.join(",")}`).toBe(1);
      expect(numbers[5], `AT-54 the plan refused a row: ${numbers.join(",")}`).toBe(0);

      await page.getByTestId("attribute-import-discard").click();
      await expect(page.getByTestId("attribute-import-dialog")).toHaveCount(0);
      expect(await readAttribute(key), "AT-54 the preview wrote a definition").toBeNull();
    } finally {
      await destroyAttribute(key);
    }
  });

  /**
   * AT-55 (C3-UX-7/8) — THE FILTERS ARE VIEW-ONLY, THE SAVE IS TOTAL. A
   * dependent definition with four records: the search narrows the rows to
   * ONE and the count reads "1 of 4"; the parent filter narrows to its two;
   * and a SAVE WITH THE FILTER STILL APPLIED writes back every stored record
   * exactly — the INC-188 law under filtering, proven by service-client
   * read-back (J4), not by the page's summary.
   */
  test("AT-55 the option search and parent filter narrow the rows, and a save after filtering keeps every stored record", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const parentKey = `e2e_attr_${rand()}`;
    const dependentKey = `e2e_attr_${rand()}`;
    const numberKey = `e2e_attr_${rand()}`;
    try {
      const { data: parent, error: parentError } = await supabase
        .from("attributes")
        .insert({
          attr_key: parentKey,
          name_en: parentKey,
          attr_type: "single_select",
          options: [
            { value: "p1", label_en: "P1", label_am: "", parent: "" },
            { value: "p2", label_en: "P2", label_am: "", parent: "" },
          ],
        })
        .select("id")
        .single();
      if (parentError || !parent)
        throw new Error(`AT-55 parent seed failed: ${parentError?.message}`);
      const { error: numberError } = await supabase
        .from("attributes")
        .insert({ attr_key: numberKey, name_en: numberKey, attr_type: "number" });
      if (numberError) throw new Error(`AT-55 number seed failed: ${numberError.message}`);
      const { error: dependentError } = await supabase.from("attributes").insert({
        attr_key: dependentKey,
        name_en: dependentKey,
        attr_type: "single_select",
        depends_on: parent.id,
        options: [
          {
            value: "alpha",
            label_en: "Alpha",
            label_am: "አልፋ",
            parent: "p1",
            aliases: ["a-one"],
            bounds: { [numberKey]: { min: "1" } },
          },
          { value: "beta", label_en: "Beta", label_am: "ቤታ", parent: "p1" },
          { value: "gamma", label_en: "Gamma", label_am: "ጋማ", parent: "p2" },
          { value: "delta", label_en: "Delta", label_am: "ዴልታ", parent: "p2" },
        ],
      });
      if (dependentError) throw new Error(`AT-55 dependent seed failed: ${dependentError.message}`);
      const stored = (await readAttribute(dependentKey))?.options;
      expect(stored, "AT-55 the stored options never read back").toBeTruthy();

      await openDefinitionEditor(page, dependentKey, "AT-55");
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-55 the rows never rendered"),
      ).toHaveText("4 of 4", { timeout: 30000 });

      /* THE SEARCH: one row visible, the count reads "1 of 4". */
      await page.getByTestId("option-search").fill("gamma");
      await expect(optionRow(page, "p2", "gamma")).toBeVisible();
      await expect(optionRow(page, "p1", "alpha")).toHaveCount(0);
      await expect(optionRow(page, "p1", "beta")).toHaveCount(0);
      await expect(optionRow(page, "p2", "delta")).toHaveCount(0);
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-55 the count never narrowed"),
      ).toHaveText("1 of 4");

      /* THE PARENT FILTER: the chosen parent's two rows, nothing else. */
      await page.getByTestId("option-search").fill("");
      await page.getByTestId("option-parent-filter").selectOption("p2");
      await expect(optionRow(page, "p2", "gamma")).toBeVisible();
      await expect(optionRow(page, "p2", "delta")).toBeVisible();
      await expect(optionRow(page, "p1", "alpha")).toHaveCount(0);
      await expect(optionRow(page, "p1", "beta")).toHaveCount(0);
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-55 the parent filter never narrowed"),
      ).toHaveText("2 of 4");

      /* FILTER STILL APPLIED, NO EDITS: the save keeps every stored record. */
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-55 the save never landed"),
      ).toHaveCount(0, { timeout: 30000 });
      await expect
        .poll(async () => (await readAttribute(dependentKey))?.options, { timeout: 20000 })
        .toEqual(stored);
    } finally {
      await destroyAttribute(dependentKey);
      await destroyAttribute(parentKey);
      await destroyAttribute(numberKey);
    }
  });

  /**
   * AT-56 (C3-UX-9) — BOTH PICKERS OFFER ONLY CO-LINKED TARGETS. The owner is
   * linked at category A: the number and the select linked at A are on offer
   * in the bounds and allowed pickers; the number and the select linked only
   * at B are withheld — unreachable by hand, with the server still the judge
   * of every save (F3). Dumps on mismatch (J4).
   */
  test("AT-56 the constraint pickers offer only co-linked targets", async ({ page }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const ownerKey = `e2e_attr_${rand()}`;
    const numAKey = `e2e_attr_${rand()}`;
    const selAKey = `e2e_attr_${rand()}`;
    const numBKey = `e2e_attr_${rand()}`;
    const selBKey = `e2e_attr_${rand()}`;
    const slugA = `e2e-cat-${rand()}`;
    const slugB = `e2e-cat-${rand()}`;
    const categoryIds: string[] = [];
    try {
      const { data: seeded, error } = await supabase
        .from("attributes")
        .insert([
          {
            attr_key: ownerKey,
            name_en: ownerKey,
            attr_type: "single_select",
            options: [{ value: "a", label_en: "A", label_am: "", parent: "" }],
          },
          { attr_key: numAKey, name_en: numAKey, attr_type: "number" },
          {
            attr_key: selAKey,
            name_en: selAKey,
            attr_type: "single_select",
            options: [{ value: "x", label_en: "X", label_am: "", parent: "" }],
          },
          { attr_key: numBKey, name_en: numBKey, attr_type: "number" },
          {
            attr_key: selBKey,
            name_en: selBKey,
            attr_type: "single_select",
            options: [{ value: "y", label_en: "Y", label_am: "", parent: "" }],
          },
        ])
        .select("id, attr_key");
      if (error || !seeded) throw new Error(`AT-56 seed failed: ${error?.message}`);
      const byKey = (key: string) => {
        const row = seeded.find((candidate) => candidate.attr_key === key);
        if (!row) throw new Error(`AT-56 seeded attribute missing: ${key}`);
        return row;
      };

      const { data: categories, error: catError } = await supabase
        .from("categories")
        .insert([
          { slug: slugA, name_en: slugA, is_active: true, allow_listings: true },
          { slug: slugB, name_en: slugB, is_active: true, allow_listings: true },
        ])
        .select("id, slug");
      if (catError || !categories) throw new Error(`AT-56 category failed: ${catError?.message}`);
      categoryIds.push(...categories.map((row) => row.id));
      const categoryA = categories.find((row) => row.slug === slugA);
      const categoryB = categories.find((row) => row.slug === slugB);
      if (!categoryA || !categoryB) throw new Error("AT-56 seeded categories missing");
      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        { category_id: categoryA.id, attribute_id: byKey(ownerKey).id, display_order: 0 },
        { category_id: categoryA.id, attribute_id: byKey(numAKey).id, display_order: 1 },
        { category_id: categoryA.id, attribute_id: byKey(selAKey).id, display_order: 2 },
        { category_id: categoryB.id, attribute_id: byKey(numBKey).id, display_order: 0 },
        { category_id: categoryB.id, attribute_id: byKey(selBKey).id, display_order: 1 },
      ]);
      if (linkError) throw new Error(`AT-56 link failed: ${linkError.message}`);

      await openDefinitionEditor(page, ownerKey, "AT-56");
      const row = optionRow(page, "", "a");
      await expect(row, await dialogDump(page, "AT-56 the row never rendered")).toBeVisible({
        timeout: 30000,
      });

      /* BOUNDS: the number at A is on offer; the number at B is withheld. */
      const bounds = row.getByTestId("option-bounds-add");
      await expect(
        bounds.locator(`option[value="${numAKey}"]`),
        await dialogDump(page, "AT-56 the co-linked number is not on offer"),
      ).toHaveCount(1);
      await expect(
        bounds.locator(`option[value="${numBKey}"]`),
        await dialogDump(page, "AT-56 a number linked only at B is still on offer"),
      ).toHaveCount(0);

      /* ALLOWED: the select at A is on offer; the select at B is withheld. */
      const allowed = row.getByTestId("option-allowed-add");
      await expect(
        allowed.locator(`option[value="${selAKey}"]`),
        await dialogDump(page, "AT-56 the co-linked select is not on offer"),
      ).toHaveCount(1);
      await expect(
        allowed.locator(`option[value="${selBKey}"]`),
        await dialogDump(page, "AT-56 a select linked only at B is still on offer"),
      ).toHaveCount(0);

      /* Nothing was chosen, so nothing changed (DB truth, J4). */
      expect((await readAttribute(ownerKey))?.options).toEqual([
        { value: "a", label_en: "A", label_am: "", parent: "" },
      ]);
    } finally {
      if (categoryIds.length > 0) {
        await supabase.from("category_attribute_links").delete().in("category_id", categoryIds);
        await destroyCategory(slugA);
        await destroyCategory(slugB);
      }
      await destroyAttribute(ownerKey);
      await destroyAttribute(numAKey);
      await destroyAttribute(selAKey);
      await destroyAttribute(numBKey);
      await destroyAttribute(selBKey);
    }
  });

  /**
   * AT-57 (INC-195) — A NEW ROW IS NEVER HIDDEN, A BLANK ROW NEVER REACHES THE
   * DOOR. With a needle narrowing the walk to one row, Add option clears the
   * needle and brings the new blank row on screen with the cursor in its value
   * cell ("4 of 4"). Saving with the row still blank is refused IN THE DIALOG,
   * naming the count, and the stored records are untouched (DB truth, J4).
   * Filling the value and saving writes all four.
   */
  test("AT-57 adding an option under an active search shows the new row, and blank rows block the save with a named count", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    bandOnly(page, "any");
    const { secret } = await signInAsSuperAdmin(page);
    const supabase = adminClient();
    const parentKey = `e2e_attr_${rand()}`;
    const dependentKey = `e2e_attr_${rand()}`;
    try {
      const { data: parent, error: parentError } = await supabase
        .from("attributes")
        .insert({
          attr_key: parentKey,
          name_en: parentKey,
          attr_type: "single_select",
          options: [
            { value: "p1", label_en: "P1", label_am: "", parent: "" },
            { value: "p2", label_en: "P2", label_am: "", parent: "" },
          ],
        })
        .select("id")
        .single();
      if (parentError || !parent)
        throw new Error(`AT-57 parent seed failed: ${parentError?.message}`);
      const { error: dependentError } = await supabase.from("attributes").insert({
        attr_key: dependentKey,
        name_en: dependentKey,
        attr_type: "single_select",
        depends_on: parent.id,
        options: [
          { value: "alpha", label_en: "Alpha", label_am: "አልፋ", parent: "p1" },
          { value: "beta", label_en: "Beta", label_am: "ቤታ", parent: "p1" },
          { value: "gamma", label_en: "Gamma", label_am: "ጋማ", parent: "p2" },
        ],
      });
      if (dependentError) throw new Error(`AT-57 dependent seed failed: ${dependentError.message}`);
      const stored = (await readAttribute(dependentKey))?.options;
      expect(stored, "AT-57 the stored options never read back").toBeTruthy();

      await openDefinitionEditor(page, dependentKey, "AT-57");
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-57 the rows never rendered"),
      ).toHaveText("3 of 3", { timeout: 30000 });

      /* A needle that matches exactly one row. */
      await page.getByTestId("option-search").fill("gamma");
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-57 the search never narrowed"),
      ).toHaveText("1 of 3");

      /* ADD under the active needle: the needle is cleared, the row is shown. */
      await optionGroup(page, "p1").getByTestId("option-add-p1").click();
      await expect(
        page.getByTestId("option-search"),
        await dialogDump(page, "AT-57 the needle was not cleared"),
      ).toHaveValue("");
      const fresh = optionGroup(page, "p1").locator('[data-testid^="option-row-new-"]').last();
      await expect(fresh, await dialogDump(page, "AT-57 the new row is hidden")).toBeVisible();
      await expect(
        fresh.getByTestId("option-value"),
        await dialogDump(page, "AT-57 the new row is not focused"),
      ).toBeFocused();
      await expect(
        page.getByTestId("option-count"),
        await dialogDump(page, "AT-57 the count never counted the new row"),
      ).toHaveText("4 of 4");

      /* SAVE WITH THE BLANK ROW: refused here, the door is never called. */
      await page.getByTestId("attribute-edit-submit").click();
      await expect(
        page.getByTestId("option-blank-message"),
        await dialogDump(page, "AT-57 the blank refusal was never named"),
      ).toContainText("1");
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-57 the dialog closed on a blank row"),
      ).toHaveCount(1);
      expect(
        (await readAttribute(dependentKey))?.options,
        "AT-57 a blank row reached the door",
      ).toEqual(stored);

      /* FILLED: the save lands with four records. */
      await fresh.getByTestId("option-value").fill("epsilon");
      await optionRow(page, "p1", "epsilon").getByTestId("option-label-en").fill("Epsilon");
      await page.getByTestId("attribute-edit-submit").click();
      await stepUpIfPrompted(page, secret);
      await expect(
        page.getByTestId("attribute-edit-dialog"),
        await dialogDump(page, "AT-57 the filled save never landed"),
      ).toHaveCount(0, { timeout: 30000 });
      await expect
        .poll(async () => (await readAttribute(dependentKey))?.options?.length, { timeout: 20000 })
        .toBe(4);
    } finally {
      await destroyAttribute(dependentKey);
      await destroyAttribute(parentKey);
    }
  });

  /**
   * AT-58 (INC-196 L1/L2) — A RANK SHIFT AND A RANK SWAP THROUGH THE ROUTE.
   *
   * Travel's import previewed clean and the commit failed: the links loop moved
   * one attribute onto a rank the next row had not yet vacated, and the
   * non-deferrable UNIQUE (category_id, card_rank) refused mid-transaction. L1
   * clears every changing rank first, applies unlinks, then writes the final
   * states. This proves both shapes end-to-end — plan, commit, DB truth, undo.
   */
  test("AT-58 a rank swap within one category imports through the route", async ({ page }) => {
    test.setTimeout(240_000);
    bandOnly(page, "any");
    await signInAsSuperAdmin(page);

    const supabase = adminClient();
    const slug = `e2e-cat-rank58-${rand()}`;
    const keyA = `e2e_attr_${rand()}`;
    const keyB = `e2e_attr_${rand()}`;
    const keyC = `e2e_attr_${rand()}`;
    try {
      // SEED BEFORE NAVIGATE (J7), service client (J5), scratch namespace (J1).
      const { data: attrs, error: attrError } = await supabase
        .from("attributes")
        .insert([
          { attr_key: keyA, name_en: keyA, attr_type: "number" },
          { attr_key: keyB, name_en: keyB, attr_type: "number" },
          { attr_key: keyC, name_en: keyC, attr_type: "number" },
        ])
        .select("id, attr_key");
      if (attrError || !attrs) throw new Error(`AT-58 attributes failed: ${attrError?.message}`);
      const attrA = attrs.find((row) => row.attr_key === keyA)!;
      const attrB = attrs.find((row) => row.attr_key === keyB)!;
      const attrC = attrs.find((row) => row.attr_key === keyC)!;

      const { data: cat, error: catError } = await supabase
        .from("categories")
        .insert({ slug, name_en: slug, is_active: true, allow_listings: true })
        .select("id, slug")
        .single();
      if (catError || !cat) throw new Error(`AT-58 category failed: ${catError?.message}`);
      const { error: pointerError } = await supabase
        .from("category_tree_pointers")
        .insert({ parent_id: null, child_id: cat.id, display_order: 958 });
      if (pointerError) throw new Error(`AT-58 pointer failed: ${pointerError.message}`);

      const { error: linkError } = await supabase.from("category_attribute_links").insert([
        { category_id: cat.id, attribute_id: attrA.id, display_order: 1, card_rank: 1 },
        { category_id: cat.id, attribute_id: attrB.id, display_order: 2, card_rank: 2 },
        { category_id: cat.id, attribute_id: attrC.id, display_order: 3, card_rank: 3 },
      ]);
      if (linkError) throw new Error(`AT-58 links failed: ${linkError.message}`);

      const ranksOf = async (): Promise<Record<string, number | null>> => {
        const rows = await readLinks(cat.id);
        const named: Record<string, number | null> = {};
        for (const row of rows) {
          const which =
            row.attribute_id === attrA.id ? keyA : row.attribute_id === attrB.id ? keyB : keyC;
          named[which] = row.card_rank === null ? null : Number(row.card_rank);
        }
        return named;
      };
      const linkRow = (key: string, rank: string) =>
        `${slug},${slug},${key},false,false,${rank},${slug}`;

      await gotoReady(page, "/admin/attributes");
      const token = await bearerOf(page);

      // (a) A SHIFT: rank 2 → 3 while rank 3 vacates. One pass would collide.
      const shift = `${LINK_HEADER}\r\n` + `${linkRow(keyB, "3")}\r\n` + `${linkRow(keyC, "")}\r\n`;
      const shiftPreview = await importPost(page, token, { mode: "preview", links: shift });
      expect(shiftPreview.status, JSON.stringify(shiftPreview.payload)).toBe(200);
      const shiftCounts = shiftPreview.payload["counts"] as Record<string, number>;
      expect(
        { changes: shiftCounts.changes, refusals: shiftCounts.refusals },
        `AT-58 the shift previewed wrong: ${JSON.stringify(shiftPreview.payload)}`,
      ).toEqual({ changes: 2, refusals: 0 });

      const shiftCommit = await importPost(page, token, {
        mode: "commit",
        links: shift,
        digest: shiftPreview.payload["digest"],
      });
      expect(
        shiftCommit.status,
        `AT-58 the shift commit failed: ${JSON.stringify(shiftCommit.payload)}`,
      ).toBe(200);
      const shiftBatch = shiftCommit.payload["batch_id"] as string;
      expect(shiftBatch, "AT-58 the shift commit named no batch").toBeTruthy();

      // DB TRUTH (J4): 1, 3, none.
      expect(await ranksOf(), "AT-58 the shift did not land").toEqual({
        [keyA]: 1,
        [keyB]: 3,
        [keyC]: null,
      });

      const shiftUndo = await importPost(page, token, { mode: "undo", batchId: shiftBatch });
      expect(shiftUndo.status, JSON.stringify(shiftUndo.payload)).toBe(200);
      expect(await ranksOf(), "AT-58 the shift undo did not restore 1, 2, 3").toEqual({
        [keyA]: 1,
        [keyB]: 2,
        [keyC]: 3,
      });

      // (b) A SWAP: 1 ↔ 3. Both directions collide under a one-pass write.
      const swap = `${LINK_HEADER}\r\n` + `${linkRow(keyA, "3")}\r\n` + `${linkRow(keyC, "1")}\r\n`;
      const swapPreview = await importPost(page, token, { mode: "preview", links: swap });
      expect(swapPreview.status, JSON.stringify(swapPreview.payload)).toBe(200);
      const swapCounts = swapPreview.payload["counts"] as Record<string, number>;
      expect(
        { changes: swapCounts.changes, refusals: swapCounts.refusals },
        `AT-58 the swap previewed wrong: ${JSON.stringify(swapPreview.payload)}`,
      ).toEqual({ changes: 2, refusals: 0 });

      const swapCommit = await importPost(page, token, {
        mode: "commit",
        links: swap,
        digest: swapPreview.payload["digest"],
      });
      expect(
        swapCommit.status,
        `AT-58 the swap commit failed: ${JSON.stringify(swapCommit.payload)}`,
      ).toBe(200);
      const swapBatch = swapCommit.payload["batch_id"] as string;

      expect(await ranksOf(), "AT-58 the swap did not land").toEqual({
        [keyA]: 3,
        [keyB]: 2,
        [keyC]: 1,
      });

      // INC-197 L2 — the undo now writes in two passes, like the commit.
      const swapUndo = await importPost(page, token, { mode: "undo", batchId: swapBatch });
      expect(
        swapUndo.status,
        `AT-58 the swap undo failed: ${JSON.stringify(swapUndo.payload)}`,
      ).toBe(200);
      expect(await ranksOf(), "AT-58 the swap undo did not restore 1, 2, 3").toEqual({
        [keyA]: 1,
        [keyB]: 2,
        [keyC]: 3,
      });

      /**
       * INC-196 L2's forwarded reason, proven on a REAL REFUSAL: a links file
       * whose end state gives two direct links rank 3. The planner refuses it
       * inside the commit RPC; the route forwards the message as data.
       */
      const clash = `${LINK_HEADER}\r\n` + `${linkRow(keyB, "3")}\r\n`;
      const clashPreview = await importPost(page, token, { mode: "preview", links: clash });
      expect(clashPreview.status, JSON.stringify(clashPreview.payload)).toBe(200);
      const clashCommit = await importPost(page, token, {
        mode: "commit",
        links: clash,
        digest: clashPreview.payload["digest"],
      });
      expect(
        clashCommit.status,
        `AT-58 the clashing commit did not fail: ${JSON.stringify(clashCommit.payload)}`,
      ).toBe(500);
      expect(
        String(clashCommit.payload["message"] ?? ""),
        "AT-58 the route forwarded no message for the refused commit (INC-196 L2)",
      ).not.toBe("");
      expect(await ranksOf(), "AT-58 the refused commit changed ranks").toEqual({
        [keyA]: 1,
        [keyB]: 2,
        [keyC]: 3,
      });
    } finally {
      await destroyCategory(slug);
      await destroyAttribute(keyA);
      await destroyAttribute(keyB);
      await destroyAttribute(keyC);
    }
  });
});
