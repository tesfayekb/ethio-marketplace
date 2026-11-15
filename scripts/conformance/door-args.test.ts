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
      "  p_level: level as unknown as string,",
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

  it(
    "DARGS-2 no file under src/ casts null through unknown beyond its allowance; the allowances are the locations console's two (F1-4b)",
    () => {
      const files = walkFiles(["src"], { ext: ["ts", "tsx"], skip: /src\/integrations\// });
      const { keys, findings } = doorArgsCensus(files);
      const allowances = readAllowlist(ALLOWLIST, keys);
      console.log(`[DARGS-2] casts of null: ${findings.length}; allowlist: ${allowances.size}`);
      expect(report(findings.filter((hit) => !allowances.has(`${hit.file}:${hit.line}`)))).toBe("");
      expect(
        [...allowances.keys()].every((key) => key.startsWith("src/features/admin-locations/")),
      ).toBe(true);
    },
    TREE_SCAN_MS,
  );
});
