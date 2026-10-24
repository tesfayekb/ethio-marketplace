import { describe, expect, it } from "vitest";

import { importBody } from "./imports";

/** Foundations turn 12 — the staff import body (IMB-1…4). */

const files = importBody({
  modes: ["preview", "commit", "undo"],
  defaultMode: "preview",
  scopeKey: "scope",
  fileKeys: ["countries", "locations"],
});
const strings = importBody({
  modes: ["commit", "undo"],
  defaultMode: "commit",
  scopeKey: "lang",
  fileKeys: ["strings"],
});

describe("importBody", () => {
  it("IMB-1 an absent file key parses to the empty string", () => {
    const parsed = files.safeParse({ countries: "a,b" });
    expect(parsed.success).toBe(true);
    expect(parsed.data?.["countries"]).toBe("a,b");
    expect(parsed.data?.["locations"]).toBe("");
  });

  it("IMB-2 a key outside the set is refused (digest: true too)", () => {
    expect(files.safeParse({ countries: "x", extra: 1 }).success).toBe(false);
    expect(files.safeParse({ countries: "x", lang: "am" }).success).toBe(false);
    expect(strings.safeParse({ strings: "x", scope: "a" }).success).toBe(false);
    expect(files.safeParse({ countries: "x", digest: true }).success).toBe(false);
  });

  it("IMB-3 the default mode is the spec's", () => {
    expect(files.safeParse({}).data?.mode).toBe("preview");
    expect(strings.safeParse({}).data?.mode).toBe("commit");
    expect(strings.safeParse({ mode: "preview" }).success).toBe(false);
  });

  it("IMB-4 scope: null parses", () => {
    const parsed = files.safeParse({ scope: null, locations: "x" });
    expect(parsed.success).toBe(true);
    expect(parsed.data?.scope).toBeNull();
  });
});
