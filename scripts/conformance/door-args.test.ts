import { describe, expect, it } from "vitest";

import { doorArgsCensus } from "./door-args";
import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

const ALLOWLIST = "scripts/conformance/door-args-allowlist.txt";
const PLANTED = "src/features/planted/planted-service.ts";

describe("a door's null argument is typed, never cast (INC-942, CF-DOOR-ARGS)", () => {
  it("DARGS-1 the census finds a planted cast of null in each form and passes every other assertion", () => {
    const text = [
      'await rpc("admin_link_attribute", {',
      "  p_display_order: null as unknown as number,",
      "  p_allowed_options: (null) as unknown as string,",
      "  p_default_value: <string>(<unknown>null),",
      "  p_visible_when: null,",
      "  level: level as unknown as string,",
      "  p_note: null as unknown as null,",
      "  p_hint: null as unknown,",
      "});",
      "",
    ].join("\n");
    const { keys, findings } = doorArgsCensus([PLANTED], { file: PLANTED, text });
    expect(findings.map((hit) => [hit.line, hit.what])).toEqual([
      [2, "casts null to number; call the door through rpc() with DoorArgs"],
      [3, "casts null to string; call the door through rpc() with DoorArgs"],
      [4, "casts null to string; call the door through rpc() with DoorArgs"],
    ]);
    expect(keys).toEqual([`${PLANTED}:2`, `${PLANTED}:3`, `${PLANTED}:4`]);
  });

  it("DARGS-3 the census finds a planted door argument cast through unknown, in a property and in a whole object, and passes the rest", () => {
    const text = [
      'await client.rpc("import_gate_audit", {',
      "  p_batch: entry.batch as unknown as string,",
      "  p_counts: (entry.counts ?? {}) as never,",
      "  p_actor: entry.actor,",
      "});",
      "const args = {",
      "  p_first: first,",
      '  "p_last": last,',
      "} as unknown as SaveArgs;",
      "const shape = { first, last } as unknown as Shape;",
      "const other = { label: batch as unknown as string };",
      "const typed = (window as unknown as { p_x?: string }).p_x;",
      "const asNull = { p_a: null as unknown as string };",
      "",
    ].join("\n");
    const { findings } = doorArgsCensus([PLANTED], { file: PLANTED, text });
    expect(findings.map((hit) => [hit.line, hit.what])).toEqual([
      [
        2,
        "casts a door argument to string through unknown; call the door through rpc() with DoorArgs",
      ],
      [
        6,
        "casts a door argument to SaveArgs through unknown; call the door through rpc() with DoorArgs",
      ],
      [13, "casts null to string; call the door through rpc() with DoorArgs"],
    ]);
  });

  it(
    "DARGS-2 no file under src/ casts null or a door argument through unknown beyond its allowance; no allowance is a line of a family already on the shell (F1-4b)",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skip: /src\/integrations\// });
      const { keys, findings } = doorArgsCensus(files);
      const allowances = readAllowlist(ALLOWLIST, keys);
      console.log(`[DARGS-2] casts of null: ${findings.length}; allowlist: ${allowances.size}`);
      expect(report(findings.filter((hit) => !allowances.has(`${hit.file}:${hit.line}`)))).toBe("");
      expect(
        [...allowances.keys()].some((key) =>
          /^src\/features\/admin-(locations|countries|categories|attributes)\//.test(key),
        ),
      ).toBe(false);
    },
    TREE_SCAN_MS,
  );
});
